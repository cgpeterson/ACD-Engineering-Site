import React, { useState, useEffect } from 'react';
import {
    Zap,
    Activity,
    Globe,
    Terminal,
    Shield,
    Radio,
    LayoutGrid
} from 'lucide-react';
// IMPORT THE LOGO HERE
import logo from '../assets/logo.png';

const Layout = ({ children, activeTab, setActiveTab }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        return date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
    };

    const navItems = [
        { id: 'SYSTEM', icon: Activity, label: 'HOME' },
        { id: 'SERVICES', icon: LayoutGrid, label: 'SERVICES' },
        { id: 'LICENSES', icon: Shield, label: 'LICENSES' },
        { id: 'HISTORY', icon: Terminal, label: 'HISTORY' },
        { id: 'CONTACT', icon: Radio, label: 'CONTACT' }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 selection:bg-cyan-900 selection:text-cyan-100 overflow-x-hidden relative flex flex-col">
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-grid-pattern"></div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800 h-16 flex items-center justify-between px-4 lg:px-8 shadow-lg shadow-black/50">
                <div className="flex items-center gap-4">
                    {/* LOGO IMAGE REPLACEMENT */}
                    <div className="w-13 h-12 flex items-center justify-center rounded-sm">
                        <img
                            src={logo}
                            alt="ACD Logo"
                            className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(234,88,12,0.5)]"
                        />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-[0.2em] text-cyan-400" style={{ textShadow: '0 0 5px rgba(34,211,238,0.5)' }}>ACD ENGINEERS</h1>
                        <p className="text-[10px] text-slate-500 tracking-widest uppercase">Assoc. Consulting & Design</p>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-8 text-[10px] tracking-widest text-slate-500 font-bold">
                    <div className="flex items-center gap-2 border border-slate-800 px-3 py-1 rounded bg-slate-900/50">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]"></div>
                        <span>SYS.ONLINE</span>
                    </div>
                    <div className="border border-slate-800 px-3 py-1 rounded bg-slate-900/50 text-cyan-500">
                        {formatDate(currentTime)}
                    </div>
                </div>
            </header>

            {/* Main Container */}
            <div className="pt-24 pb-12 px-4 lg:px-8 max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-8">

                {/* Navigation Sidebar */}
                <nav className="lg:w-64 flex-shrink-0">
                    <div className="sticky top-24 border border-slate-800 bg-slate-900/80 p-1 relative shadow-2xl backdrop-blur-sm">
                        {/* Decor Corners */}
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-500"></div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-500"></div>

                        <div className="p-4 border-b border-slate-800 mb-2 bg-slate-950/50">
                            <div className="text-[10px] text-orange-500 mb-1 tracking-widest">USER_ID</div>
                            <div className="font-bold text-xl text-white tracking-wide">MINT PETERSON</div>
                            <div className="text-xs text-slate-400 mt-1">P.E., LEED AP, CEO</div>
                        </div>

                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-4 text-xs tracking-wider transition-all border-l-2 relative overflow-hidden group ${activeTab === item.id
                                            ? 'bg-cyan-950/40 text-cyan-400 border-cyan-500'
                                            : 'text-slate-500 border-transparent hover:bg-slate-900 hover:text-slate-300 hover:border-slate-700'
                                        }`}
                                >
                                    <item.icon className={`w-4 h-4 relative z-10 ${activeTab === item.id ? 'text-cyan-400' : 'text-slate-600 group-hover:text-cyan-400'}`} />
                                    <span className="relative z-10 font-bold">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* Content Area */}
                <main className="flex-1 min-h-[600px] relative">
                    <div className="bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm p-1 min-h-full">
                        <div className="h-full border border-slate-800/50 p-6 lg:p-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 h-8 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-8 text-[10px] text-slate-600 z-50 uppercase tracking-wider font-bold">
                <div className="flex gap-6">
                    <span>SYS_STATUS: NOMINAL</span>
                    <span className="hidden md:inline">MEM_USAGE: 14%</span>
                </div>
                <div className="flex gap-6">
                    <span>© 2026 ACD ENGINEERS</span>
                </div>
            </footer>
        </div>
    );
};

export default Layout;