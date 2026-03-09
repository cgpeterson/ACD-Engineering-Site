import { useState, useRef, useEffect } from 'react';
import { Shield } from 'lucide-react';
import stateNames from '../data/stateNames';
import licenseData from '../data/licenseData';
import statePaths from '../data/statePaths';

const licensedStates = Object.entries(licenseData)
    .sort((a, b) => a[1].year - b[1].year);
const licensedCount = licensedStates.length;
const isLicensed = (code) => !!licenseData[code];

const Licenses = () => {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const crosshairRef = useRef(null);
    const hLineRef = useRef(null);
    const vLineRef = useRef(null);
    const reticleRef = useRef(null);
    const coordTextRef = useRef(null);
    const tooltipRef = useRef(null);

    const [hoveredState, setHoveredState] = useState(null);
    const [selectedState, setSelectedState] = useState(null);

    const activeState = hoveredState || selectedState;

    // Position tooltip over a state element (for keyboard/touch without pointer)
    const positionTooltipAtState = (code) => {
        if (!tooltipRef.current || !containerRef.current || !svgRef.current) return;
        const pathEl = svgRef.current.querySelector(`[data-state="${code}"]`);
        if (!pathEl) return;
        const pathRect = pathEl.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        tooltipRef.current.style.left = `${pathRect.left - containerRect.left + pathRect.width / 2}px`;
        tooltipRef.current.style.top = `${pathRect.top - containerRect.top - 10}px`;
    };

    // Direct DOM manipulation for 60fps crosshair tracking
    useEffect(() => {
        const container = containerRef.current;
        const svg = svgRef.current;
        if (!container || !svg) return;

        // Reuse a single SVGPoint and cache the inverse CTM to avoid
        // per-event allocations that create GC pressure at ~60 Hz.
        const pt = svg.createSVGPoint();
        let inverseCtm = null;

        const updateInverseCtm = () => {
            const ctm = svg.getScreenCTM();
            inverseCtm = ctm ? ctm.inverse() : null;
        };
        updateInverseCtm();

        const onPointerMove = (e) => {
            // Only show crosshair for mouse/pen, not touch
            if (e.pointerType === 'touch') return;

            if (!inverseCtm) return;
            pt.x = e.clientX;
            pt.y = e.clientY;
            const p = pt.matrixTransform(inverseCtm);

            if (crosshairRef.current) crosshairRef.current.style.opacity = '1';
            if (hLineRef.current) {
                hLineRef.current.setAttribute('y1', p.y);
                hLineRef.current.setAttribute('y2', p.y);
            }
            if (vLineRef.current) {
                vLineRef.current.setAttribute('x1', p.x);
                vLineRef.current.setAttribute('x2', p.x);
            }
            if (reticleRef.current) {
                reticleRef.current.setAttribute('transform', `translate(${p.x},${p.y})`);
            }
            if (coordTextRef.current) {
                coordTextRef.current.textContent = `${Math.round(p.x)}.${Math.round(p.y)}`;
            }
            if (tooltipRef.current) {
                const rect = container.getBoundingClientRect();
                tooltipRef.current.style.left = `${e.clientX - rect.left + 12}px`;
                tooltipRef.current.style.top = `${e.clientY - rect.top + 12}px`;
            }
        };

        const onPointerLeave = () => {
            if (crosshairRef.current) crosshairRef.current.style.opacity = '0';
        };

        // Invalidate cached CTM on resize/scroll (layout changes the screen transform)
        window.addEventListener('resize', updateInverseCtm);
        window.addEventListener('scroll', updateInverseCtm, true);
        container.addEventListener('pointermove', onPointerMove);
        container.addEventListener('pointerleave', onPointerLeave);
        return () => {
            window.removeEventListener('resize', updateInverseCtm);
            window.removeEventListener('scroll', updateInverseCtm, true);
            container.removeEventListener('pointermove', onPointerMove);
            container.removeEventListener('pointerleave', onPointerLeave);
        };
    }, []);

    return (
        <div className="h-full flex flex-col">
            {/* Page Header */}
            <div className="mb-4 flex justify-between items-end border-b border-slate-800 pb-4">
                <div>
                    <h2 className="text-2xl text-white tracking-widest mb-2">TACTICAL AUTHORIZATION MAP</h2>
                    <p className="text-sm text-slate-400 max-w-md">
                        Professional engineering licensure across operational sectors.
                    </p>
                </div>
                <Shield className="w-12 h-12 text-slate-800" />
            </div>

            {/* CRT Monitor Container */}
            <div
                ref={containerRef}
                className="relative rounded-lg overflow-hidden min-h-[500px]"
                style={{
                    background: 'var(--crt-bg)',
                    cursor: 'none',
                    border: '1px solid var(--crt-green-border)',
                    boxShadow: 'inset 0 0 100px rgba(0,255,65,0.03), 0 0 20px rgba(0,255,65,0.05)'
                }}
            >
                {/* CRT Scanlines */}
                <div className="absolute inset-0 pointer-events-none z-30 crt-scanlines" />
                {/* CRT Vignette */}
                <div className="absolute inset-0 pointer-events-none z-20 crt-vignette" />
                {/* CRT Sweep Line */}
                <div className="crt-sweep z-20" />

                {/* HUD Top-Left */}
                <div className="absolute top-3 left-4 z-10 text-[10px] tracking-[0.3em]"
                     style={{ color: 'var(--crt-green)', textShadow: '0 0 8px rgba(0,255,65,0.5)' }}>
                    WOPR TACTICAL DISPLAY // PE AUTHORIZATION
                </div>
                {/* HUD Top-Right */}
                <div className="absolute top-3 right-4 z-10 text-[10px] tracking-[0.2em] text-right"
                     style={{ color: 'var(--crt-green-dim)' }}>
                    GRID REF: US-CONUS<br />
                    MODE: TRACKING
                </div>

                {/* SVG Map */}
                <div className="absolute inset-0 flex items-center justify-center p-6 pt-8 pb-10">
                    <svg
                        ref={svgRef}
                        viewBox="-20 -10 1000 616"
                        className="w-full h-full"
                        preserveAspectRatio="xMidYMid meet"
                        style={{ filter: 'drop-shadow(0 0 1px rgba(0,255,65,0.2))' }}
                    >
                        <defs>
                            <pattern id="wg-grid" width="48.5" height="52" patternUnits="userSpaceOnUse">
                                <path d="M 48.5 0 L 0 0 0 52" fill="none" stroke="#061a06" strokeWidth="0.5" />
                            </pattern>
                        </defs>

                        {/* Background grid */}
                        <rect x="-20" y="-10" width="1000" height="616" fill="url(#wg-grid)"
                              onClick={() => setSelectedState(null)} />

                        {/* Corner brackets */}
                        <g stroke="var(--crt-green)" strokeWidth="1" opacity="0.2" fill="none"
                           style={{ vectorEffect: 'non-scaling-stroke' }}>
                            <polyline points="-10,0 -20,0 -20,10" />
                            <polyline points="970,0 980,0 980,10" />
                            <polyline points="-20,596 -20,606 -10,606" />
                            <polyline points="980,596 980,606 970,606" />
                        </g>

                        {/* State paths */}
                        {Object.entries(statePaths).map(([code, path]) => {
                            const licensed = isLicensed(code);
                            const active = activeState === code;
                            return (
                                <path
                                    key={code}
                                    d={path}
                                    data-state={code}
                                    tabIndex={licensed ? 0 : -1}
                                    role="button"
                                    aria-label={`${stateNames[code] || code}, ${licensed ? `Licensed since ${licenseData[code].year}` : 'Not licensed'}`}
                                    fill={licensed
                                        ? (active ? 'rgba(249,115,22,0.35)' : 'rgba(0,255,65,0.3)')
                                        : (active ? 'rgba(0,40,0,0.4)' : 'rgba(0,20,0,0.3)')}
                                    stroke={licensed
                                        ? (active ? '#f97316' : 'var(--crt-green)')
                                        : (active ? 'var(--crt-green-dim)' : 'var(--crt-green-inactive)')}
                                    strokeWidth={active ? '1.5' : '0.7'}
                                    style={{
                                        transition: 'fill 0.2s, stroke 0.2s, stroke-width 0.2s',
                                        vectorEffect: 'non-scaling-stroke',
                                        cursor: 'none',
                                        outline: 'none'
                                    }}
                                    onPointerEnter={() => setHoveredState(code)}
                                    onPointerLeave={() => setHoveredState(null)}
                                    onClick={(e) => {
                                        setSelectedState(prev => prev === code ? null : code);
                                        if (tooltipRef.current && containerRef.current) {
                                            const rect = containerRef.current.getBoundingClientRect();
                                            tooltipRef.current.style.left = `${e.clientX - rect.left + 12}px`;
                                            tooltipRef.current.style.top = `${e.clientY - rect.top + 12}px`;
                                        }
                                    }}
                                    onFocus={() => {
                                        setSelectedState(code);
                                        positionTooltipAtState(code);
                                    }}
                                    onBlur={() => setSelectedState(null)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') {
                                            e.target.blur();
                                            setSelectedState(null);
                                        } else if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            if (selectedState === code) {
                                                setSelectedState(null);
                                            } else {
                                                setSelectedState(code);
                                                positionTooltipAtState(code);
                                            }
                                        } else if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            if (selectedState === code) {
                                                setSelectedState(null);
                                            } else {
                                                setSelectedState(code);
                                                positionTooltipAtState(code);
                                            }
                                        }
                                    }}
                                />
                            );
                        })}

                        {/* Crosshair targeting system */}
                        <g ref={crosshairRef} style={{ opacity: 0, transition: 'opacity 0.1s' }}
                           pointerEvents="none">
                            <line ref={hLineRef} x1={-20} y1={0} x2={980} y2={0}
                                  stroke="var(--crt-green)" strokeWidth="0.5" opacity="0.3"
                                  style={{ vectorEffect: 'non-scaling-stroke' }} />
                            <line ref={vLineRef} x1={0} y1={-10} x2={0} y2={606}
                                  stroke="var(--crt-green)" strokeWidth="0.5" opacity="0.3"
                                  style={{ vectorEffect: 'non-scaling-stroke' }} />

                            <g ref={reticleRef} transform="translate(0,0)">
                                <circle r="12" fill="none" stroke="var(--crt-green)"
                                        strokeWidth="0.6" opacity="0.5"
                                        style={{ vectorEffect: 'non-scaling-stroke' }} />
                                <circle r="1.5" fill="var(--crt-green)" opacity="0.8" />
                                <line x1="-18" y1="0" x2="-8" y2="0" stroke="var(--crt-green)"
                                      strokeWidth="0.6" opacity="0.5"
                                      style={{ vectorEffect: 'non-scaling-stroke' }} />
                                <line x1="8" y1="0" x2="18" y2="0" stroke="var(--crt-green)"
                                      strokeWidth="0.6" opacity="0.5"
                                      style={{ vectorEffect: 'non-scaling-stroke' }} />
                                <line x1="0" y1="-18" x2="0" y2="-8" stroke="var(--crt-green)"
                                      strokeWidth="0.6" opacity="0.5"
                                      style={{ vectorEffect: 'non-scaling-stroke' }} />
                                <line x1="0" y1="8" x2="0" y2="18" stroke="var(--crt-green)"
                                      strokeWidth="0.6" opacity="0.5"
                                      style={{ vectorEffect: 'non-scaling-stroke' }} />
                                <text ref={coordTextRef} x="16" y="-16"
                                      fill="var(--crt-green)" fontSize="9" fontFamily="monospace"
                                      opacity="0.5" />
                            </g>
                        </g>
                    </svg>
                </div>

                {/* Tooltip */}
                <div
                    ref={tooltipRef}
                    className="absolute z-50 pointer-events-none"
                    style={{
                        display: activeState ? 'block' : 'none',
                        background: 'rgba(0,8,0,0.92)',
                        border: `1px solid ${isLicensed(activeState) ? 'var(--crt-green)' : 'var(--crt-green-border)'}`,
                        padding: '8px 12px',
                        boxShadow: isLicensed(activeState)
                            ? '0 0 15px rgba(0,255,65,0.15), inset 0 0 20px rgba(0,255,65,0.05)'
                            : 'none',
                        minWidth: '180px',
                    }}
                >
                    {activeState && (
                        <>
                            <div className="text-[11px] font-bold tracking-[0.2em] mb-1"
                                 style={{
                                     color: isLicensed(activeState) ? 'var(--crt-green)' : '#0a5a0a',
                                     textShadow: isLicensed(activeState) ? '0 0 5px rgba(0,255,65,0.5)' : 'none'
                                 }}>
                                {(stateNames[activeState] || activeState).toUpperCase()}
                            </div>
                            <div className="text-[10px] flex justify-between pb-1 mb-1"
                                 style={{ color: 'var(--crt-green-mid)', borderBottom: '1px solid var(--crt-green-inactive)' }}>
                                <span>STATUS</span>
                                <span style={{ color: isLicensed(activeState) ? 'var(--crt-green)' : '#661a00' }}>
                                    {isLicensed(activeState) ? 'AUTHORIZED' : 'NO DATA'}
                                </span>
                            </div>
                            {isLicensed(activeState) && licenseData[activeState] && (
                                <div className="text-[10px] flex justify-between"
                                     style={{ color: 'var(--crt-green-mid)' }}>
                                    <span>ACQUIRED</span>
                                    <span style={{ color: 'var(--crt-green)' }}>{licenseData[activeState].year}</span>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* HUD Bottom */}
                <div className="absolute bottom-3 left-4 z-10 flex gap-6 text-[10px] tracking-[0.2em]"
                     style={{ color: 'var(--crt-green-mid)' }}>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full"
                             style={{ background: 'var(--crt-green)', boxShadow: '0 0 6px var(--crt-green)' }} />
                        <span style={{ color: 'var(--crt-green)' }}>AUTHORIZED ({licensedCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2" style={{ background: 'var(--crt-green-inactive)' }} />
                        <span>INACTIVE</span>
                    </div>
                </div>
                <div className="absolute bottom-3 right-4 z-10 text-[10px] tracking-[0.2em]"
                     style={{ color: 'var(--crt-green-dim)' }}>
                    ALL SYSTEMS NOMINAL
                </div>
            </div>

            {/* Licensed States List */}
            <div className="mt-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                    <div>
                        <h3 className="text-2xl text-white tracking-widest mb-1">AUTHORIZED ZONES</h3>
                        <p className="text-xs text-slate-500">PROFESSIONAL ENGINEERING LICENSES BY ACQUISITION DATE</p>
                    </div>
                    <span className="text-xs font-bold text-cyan-500 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded">
                        {licensedCount} ACTIVE
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {licensedStates.map(([code, data], idx) => (
                        <div
                            key={code}
                            className="relative group p-4 border border-slate-800 bg-slate-950/40 hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                <Shield className="w-4 h-4 text-cyan-500" />
                            </div>
                            <div className="text-[10px] text-slate-600 mb-2 font-bold tracking-widest group-hover:text-cyan-500 transition-colors">PE_{String(idx + 1).padStart(2, '0')} // {code}</div>
                            <h3 className="text-slate-200 text-sm font-semibold group-hover:text-cyan-400 transition-colors">{data.name}</h3>
                            <div className="text-[10px] text-slate-500 mt-1 tracking-wider">LICENSED SINCE {data.year}</div>

                            <div className="absolute bottom-0 left-0 w-1 h-0 bg-cyan-500 group-hover:h-full transition-all duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Licenses;
