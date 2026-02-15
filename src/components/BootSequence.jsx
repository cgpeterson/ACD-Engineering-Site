import React from 'react';

const BootSequence = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-cyan-500 font-mono flex items-center justify-center p-8 relative overflow-hidden">
            <div className="w-full max-w-md relative z-10">
                <div className="flex justify-between text-xs mb-2 tracking-widest">
                    <span>BOOT_SEQ_INIT</span>
                    <span>V.2026.1</span>
                </div>
                <div className="w-full bg-slate-900 h-1 mb-4 overflow-hidden">
                    <div className="h-full bg-orange-500 animate-progress w-full origin-left"></div>
                </div>
                <div className="space-y-1 text-xs opacity-70 tracking-wider">
                    <p className="animate-pulse">&gt; LOADING CORE MODULES...</p>
                    <p className="delay-100">&gt; INITIALIZING ACD PROTOCOLS...</p>
                    <p className="delay-200">&gt; ESTABLISHING SECURE CONNECTION...</p>
                    <p className="delay-300">&gt; VERIFYING LICENSES (30 STATES)...</p>
                    <p className="text-orange-500 delay-500">&gt; SYSTEM READY.</p>
                </div>
            </div>

            {/* Grid Background */}
            <div className="fixed inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(8, 145, 178, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(8, 145, 178, 0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}>
            </div>
        </div>
    );
};

export default BootSequence;