import { useState, useMemo, useRef, useEffect } from 'react';
import {
    ChevronDown,
    MapPin,
    Maximize2,
    Building2,
    Calendar,
    Wrench,
    User,
    ImageOff,
    Search,
    Filter,
    X,
    ArrowUpDown,
} from 'lucide-react';
import projectsData from '../data/projectsData';
import stateNames from '../data/stateNames';
import ConstructionTape from '../components/ConstructionTape';

const categoryColors = {
    INDUSTRIAL: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    COMMERCIAL: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    GOVERNMENT: 'text-red-400 bg-red-500/10 border-red-500/30',
    MILITARY: 'text-red-400 bg-red-500/10 border-red-500/30',
    RETAIL: 'text-green-400 bg-green-500/10 border-green-500/30',
    ENTERTAINMENT: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    EDUCATION: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    RECREATION: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
};

// Column definitions
const columns = [
    { key: 'name', label: 'PROJECT', filterable: false, width: 'flex-[2] min-w-[180px]', cellClass: '' },
    { key: 'location', label: 'LOCATION', filterable: true, width: 'flex-1 min-w-[120px]', cellClass: 'text-xs text-slate-400 truncate' },
    { key: 'category', label: 'SECTOR', filterable: true, width: 'flex-1 min-w-[110px]', cellClass: '' },
    { key: 'services', label: 'SERVICES', filterable: true, width: 'flex-1 min-w-[130px] hidden lg:flex', cellClass: 'text-xs text-slate-400 truncate' },
    { key: 'size', label: 'SIZE', filterable: false, width: 'flex-1 min-w-[100px] hidden md:flex', cellClass: 'text-xs text-slate-400 truncate' },
    { key: 'year', label: 'YEAR', filterable: false, width: 'w-[70px] hidden md:flex', cellClass: 'text-xs text-slate-400' },
];

// Precomputed, immutable filter options per filterable column
const filterOptions = Object.freeze(
    Object.fromEntries(
        columns
            .filter((c) => c.filterable)
            .map((col) => [
                col.key,
                [...new Set(projectsData.map((p) => p[col.key]).filter(Boolean))].sort(),
            ])
    )
);

const renderCell = (project, colKey, isOpen) => {
    const value = project[colKey];

    if (colKey === 'name') {
        return (
            <span className={`text-sm font-bold tracking-wide transition-colors ${isOpen ? 'text-cyan-400' : 'text-slate-200 group-hover:text-white'}`}>
                {value}
            </span>
        );
    }

    if (colKey === 'category') {
        const colorClass = categoryColors[value] || 'text-slate-400 bg-slate-500/10 border-slate-500/30';
        return (
            <span className={`text-[10px] font-bold tracking-widest px-2 py-0.5 border ${colorClass}`}>
                {value}
            </span>
        );
    }

    return value || '—';
};

const DetailRow = ({ icon, label, value }) => {
    if (!value) return null;
    const IconComponent = icon;
    return (
        <div className="flex items-start gap-3">
            <IconComponent className="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0" />
            <div>
                <div className="text-[10px] text-slate-600 tracking-widest uppercase">{label}</div>
                <div className="text-sm text-slate-300">{value}</div>
            </div>
        </div>
    );
};

// Filter dropdown component
const ColumnFilter = ({ column, activeFilters, setActiveFilters }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const options = filterOptions[column.key] || [];
    const current = activeFilters[column.key] || [];
    const isFiltered = current.length > 0;

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        if (open) document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);

    const toggle = (val) => {
        const next = current.includes(val)
            ? current.filter((v) => v !== val)
            : [...current, val];
        setActiveFilters((prev) => ({ ...prev, [column.key]: next }));
    };

    const clear = (e) => {
        e.stopPropagation();
        setActiveFilters((prev) => ({ ...prev, [column.key]: [] }));
    };

    return (
        <div ref={ref} className="relative">
            <button
                onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                className={`p-0.5 rounded transition-colors cursor-pointer ${isFiltered ? 'text-cyan-400' : 'text-slate-600 hover:text-slate-400'}`}
                aria-label={`Filter by ${column.label.toLowerCase()}`}
            >
                <Filter className="w-3 h-3" />
            </button>
            {open && (
                <div className="absolute top-6 left-0 z-30 bg-slate-900 border border-slate-700 shadow-xl min-w-[180px] max-h-[240px] overflow-y-auto" role="listbox" aria-label={`${column.label} filter options`}>
                    <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 tracking-widest font-bold">{column.label}</span>
                        {isFiltered && (
                            <button onClick={clear} className="text-[10px] text-cyan-500 hover:text-cyan-300 cursor-pointer">CLEAR</button>
                        )}
                    </div>
                    {options.map((opt) => (
                        <button
                            key={opt}
                            onClick={(e) => { e.stopPropagation(); toggle(opt); }}
                            role="option"
                            aria-selected={current.includes(opt)}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                            <div className={`w-3 h-3 border flex-shrink-0 flex items-center justify-center ${current.includes(opt) ? 'border-cyan-500 bg-cyan-500/20' : 'border-slate-600'}`}>
                                {current.includes(opt) && <div className="w-1.5 h-1.5 bg-cyan-400" />}
                            </div>
                            <span className="text-xs text-slate-300 truncate">{opt}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// Sortable column header
const ColumnHeader = ({ column, sortKey, sortDir, onSort, activeFilters, setActiveFilters }) => {
    const isSorted = sortKey === column.key;

    return (
        <div className={`flex items-center gap-1.5 ${column.width}`}>
            <button
                onClick={() => onSort(column.key)}
                className="flex items-center gap-1 cursor-pointer group"
            >
                <span className={`text-[10px] font-bold tracking-widest transition-colors ${isSorted ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                    {column.label}
                </span>
                {isSorted ? (
                    sortDir === 'asc'
                        ? <ChevronDown className="w-3 h-3 text-cyan-400 rotate-180" />
                        : <ChevronDown className="w-3 h-3 text-cyan-400" />
                ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-700 group-hover:text-slate-500" />
                )}
            </button>
            {column.filterable && (
                <ColumnFilter column={column} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
            )}
        </div>
    );
};

// Expanded detail panel
const ExpandedDetail = ({ project }) => {
    const colorClass = categoryColors[project.category] || 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    const hasImages = project.images && project.images.length > 0;

    return (
        <div className="px-4 pb-5 pt-3 border-t border-slate-800/60 bg-slate-950/30">
            {/* Mobile category */}
            <div className="lg:hidden mb-3">
                <span className={`text-[10px] font-bold tracking-widest px-2 py-1 border ${colorClass}`}>
                    {project.category}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 space-y-5">
                    <p className="text-sm text-slate-400 leading-relaxed border-l-2 border-cyan-900 pl-4">
                        {project.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <DetailRow icon={User} label="Client" value={project.client} />
                        <DetailRow icon={MapPin} label="Location" value={project.location} />
                        <DetailRow icon={Maximize2} label="Size" value={project.size} />
                        <DetailRow icon={Calendar} label="Completed" value={project.year} />
                        <DetailRow icon={Wrench} label="Services" value={project.services} />
                        <DetailRow icon={Building2} label="Sector" value={project.category} />
                    </div>
                </div>
                <div className="lg:col-span-1">
                    {hasImages ? (
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                            {project.images.map((img, i) => (
                                <div key={i} className="aspect-video bg-slate-900 border border-slate-800 overflow-hidden">
                                    <img src={img} alt={`${project.name} ${i + 1}`} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="aspect-video bg-slate-900/60 border border-dashed border-slate-700 flex flex-col items-center justify-center gap-2">
                            <ImageOff className="w-8 h-8 text-slate-700" />
                            <span className="text-[10px] text-slate-600 tracking-widest">IMG_CLASSIFIED</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Projects = ({ locationFilter, clearLocationFilter }) => {
    const [openId, setOpenId] = useState(null);
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState('asc');
    const [activeFilters, setActiveFilters] = useState({});

    const handleSort = (key) => {
        if (sortKey === key) {
            if (sortDir === 'asc') setSortDir('desc');
            else { setSortKey(null); setSortDir('asc'); }
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    const clearAll = () => {
        setSearch('');
        setSortKey(null);
        setSortDir('asc');
        setActiveFilters({});
        if (clearLocationFilter) clearLocationFilter();
    };

    const hasActiveFilters = Object.values(activeFilters).some((v) => v.length > 0);
    const hasAnyFilter = search || sortKey || hasActiveFilters || locationFilter;

    const filtered = useMemo(() => {
        let data = [...projectsData];

        // State filter from Licenses map
        if (locationFilter) {
            data = data.filter((p) =>
                p.location && p.location.split(/[\s,&]+/).includes(locationFilter)
            );
        }

        // Search
        if (search) {
            const q = search.toLowerCase();
            data = data.filter((p) =>
                (p.name && p.name.toLowerCase().includes(q)) ||
                (p.location && p.location.toLowerCase().includes(q)) ||
                (p.category && p.category.toLowerCase().includes(q)) ||
                (p.services && p.services.toLowerCase().includes(q)) ||
                (p.client && p.client.toLowerCase().includes(q))
            );
        }

        // Column filters
        Object.entries(activeFilters).forEach(([key, vals]) => {
            if (vals.length > 0) {
                data = data.filter((p) => p[key] && vals.includes(p[key]));
            }
        });

        // Sort
        if (sortKey) {
            data.sort((a, b) => {
                const aVal = (a[sortKey] || '').toString().toLowerCase();
                const bVal = (b[sortKey] || '').toString().toLowerCase();
                if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return data;
    }, [search, sortKey, sortDir, activeFilters, locationFilter]);

    return (
        <div className="relative overflow-hidden -m-6 p-6 lg:-m-8 lg:p-8">
            <ConstructionTape />

            {/* Header */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-800">
                <div>
                    <h2 className="text-2xl text-white tracking-widest mb-1">PROJECT ARCHIVES</h2>
                    <p className="text-xs text-slate-500">SELECT AN ENTRY TO VIEW DOSSIER</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search projects, locations, sectors, services..."
                        aria-label="Search projects"
                        className="w-full bg-slate-950/60 border border-slate-800 text-sm text-slate-300 placeholder-slate-600 pl-10 pr-4 py-2.5 focus:outline-none focus:border-cyan-500/50 transition-colors tracking-wide"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                {hasAnyFilter && (
                    <button
                        onClick={clearAll}
                        className="text-[10px] font-bold tracking-widest text-cyan-500 hover:text-cyan-300 border border-cyan-500/30 px-3 py-2.5 bg-cyan-500/5 transition-colors cursor-pointer whitespace-nowrap"
                    >
                        CLEAR ALL
                    </button>
                )}
            </div>

            {/* State filter pill */}
            {locationFilter && (
                <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <span className="text-[10px] text-slate-600 tracking-widest font-bold">STATE:</span>
                    <button
                        onClick={() => clearLocationFilter && clearLocationFilter()}
                        className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-1 hover:bg-orange-500/20 transition-colors cursor-pointer"
                    >
                        {stateNames[locationFilter] || locationFilter}
                        <X className="w-3 h-3" />
                    </button>
                </div>
            )}

            {/* Active filter pills */}
            {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[10px] text-slate-600 tracking-widest font-bold">FILTERS:</span>
                    {Object.entries(activeFilters).map(([key, vals]) =>
                        vals.map((val) => (
                            <button
                                key={`${key}-${val}`}
                                onClick={() => setActiveFilters((prev) => ({
                                    ...prev,
                                    [key]: prev[key].filter((v) => v !== val),
                                }))}
                                className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 hover:bg-cyan-500/20 transition-colors cursor-pointer"
                            >
                                {val}
                                <X className="w-3 h-3" />
                            </button>
                        ))
                    )}
                </div>
            )}

            {/* Record count */}
            <div className="text-[10px] text-slate-600 tracking-widest mb-3 font-bold">
                DISPLAYING {filtered.length} OF {projectsData.length} RECORDS
            </div>

            {/* Column Headers */}
            <div className="flex items-center gap-4 px-4 py-2.5 border border-slate-800 bg-slate-900/60 mb-px">
                <div className="w-8 flex-shrink-0" />
                {columns.map((col) => (
                    <ColumnHeader
                        key={col.key}
                        column={col}
                        sortKey={sortKey}
                        sortDir={sortDir}
                        onSort={handleSort}
                        activeFilters={activeFilters}
                        setActiveFilters={setActiveFilters}
                    />
                ))}
                <div className="w-4 flex-shrink-0" />
            </div>

            {/* Data Rows */}
            <div className="space-y-px">
                {filtered.map((project, idx) => {
                    const isOpen = openId === project.id;

                    return (
                        <div key={project.id} className="border border-slate-800/60 bg-slate-950/40 transition-all hover:border-slate-700">
                            <button
                                onClick={() => setOpenId(isOpen ? null : project.id)}
                                aria-expanded={isOpen}
                                className="w-full flex items-center gap-4 px-4 py-3 text-left group cursor-pointer"
                            >
                                {/* Row number */}
                                <div className="text-[10px] text-slate-600 font-bold tracking-widest w-8 flex-shrink-0">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>

                                {/* Data cells — driven by column config */}
                                {columns.map((col) => (
                                    <div key={col.key} className={`${col.cellClass} ${col.width}`}>
                                        {renderCell(project, col.key, isOpen)}
                                    </div>
                                ))}

                                {/* Expand chevron */}
                                <ChevronDown
                                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'}`}
                                />
                            </button>

                            {/* Expanded detail — grid-rows animation for natural content height */}
                            <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <ExpandedDetail project={project} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
                <div className="border border-dashed border-slate-800 py-12 flex flex-col items-center gap-3">
                    <Search className="w-8 h-8 text-slate-700" />
                    <span className="text-sm text-slate-500">NO RECORDS MATCH CURRENT QUERY</span>
                    <button
                        onClick={clearAll}
                        className="text-[10px] font-bold tracking-widest text-cyan-500 hover:text-cyan-300 cursor-pointer"
                    >
                        RESET FILTERS
                    </button>
                </div>
            )}
        </div>
    );
};

export default Projects;
