import React from 'react';
import { Cpu, Globe, Aperture, Terminal, Zap, ChevronRight } from 'lucide-react';

const MissionStatus = ({ onNavigate }) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Main Banner */}
            <div className="relative overflow-hidden group border border-slate-700 bg-slate-900/80 p-8 shadow-lg">
                <div className="absolute top-0 right-0 p-2 text-[10px] text-slate-600 border-l border-b border-slate-800 font-bold">
                    REF: MSD-2026 // PUBLIC
                </div>

                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
                    ENGINEERING <span className="text-orange-500">EXCELLENCE</span><br />
                    FOR THE MODERN AGE
                </h2>

                <div className="flex flex-col md:flex-row gap-6">
                    <p className="flex-1 text-slate-400 leading-relaxed text-sm md:text-base border-l-2 border-cyan-900 pl-4">
                        At Associated Consulting and Design (ACD) Engineers, our key to happiness and success lies in fostering lasting relationships with our clients and partners. We are dedicated to engineering excellence, professionalism, and a long-term commitment to continuous learning.
                    </p>
                </div>
            </div>

            {/* Interactive Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* History Link */}
                <div
                    onClick={() => onNavigate('HISTORY')}
                    className="border border-slate-800 bg-slate-950/50 p-4 hover:border-orange-500/50 hover:bg-slate-900 transition-all group cursor-pointer relative overflow-hidden"
                >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-orange-500"><ChevronRight size={16} /></div>
                    <div className="text-orange-500 mb-3 transform group-hover:scale-110 transition-transform origin-left"><Cpu className="w-8 h-8" /></div>
                    <div className="text-xs text-slate-500 mb-1 tracking-widest group-hover:text-orange-400">EST. 2013</div>
                    <div className="font-bold text-slate-200 text-lg">LEGACY SYSTEM</div>
                </div>

                {/* Licenses Link */}
                <div
                    onClick={() => onNavigate('LICENSES')}
                    className="border border-slate-800 bg-slate-950/50 p-4 hover:border-cyan-500/50 hover:bg-slate-900 transition-all group cursor-pointer relative overflow-hidden"
                >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-500"><ChevronRight size={16} /></div>
                    <div className="text-cyan-500 mb-3 transform group-hover:scale-110 transition-transform origin-left"><Globe className="w-8 h-8" /></div>
                    <div className="text-xs text-slate-500 mb-1 tracking-widest group-hover:text-cyan-400">COVERAGE</div>
                    <div className="font-bold text-slate-200 text-lg">30 STATES</div>
                </div>

                {/* Services Link */}
                <div
                    onClick={() => onNavigate('SERVICES')}
                    className="border border-slate-800 bg-slate-950/50 p-4 hover:border-green-500/50 hover:bg-slate-900 transition-all group cursor-pointer relative overflow-hidden"
                >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-green-500"><ChevronRight size={16} /></div>
                    <div className="text-green-500 mb-3 transform group-hover:scale-110 transition-transform origin-left"><Aperture className="w-8 h-8" /></div>
                    <div className="text-xs text-slate-500 mb-1 tracking-widest group-hover:text-green-400">CERTIFIED</div>
                    <div className="font-bold text-slate-200 text-lg">LEED AP</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Services Link List */}
                <div
                    onClick={() => onNavigate('SERVICES')}
                    className="border-t-2 border-orange-500 bg-slate-900/30 p-6 relative group cursor-pointer hover:bg-slate-900/50 transition-colors"
                >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-orange-500 text-xs tracking-widest">VIEW ALL MODULES &gt;</div>
                    <h3 className="text-sm font-bold text-orange-500 mb-4 flex items-center gap-2 tracking-wider">
                        <Terminal className="w-4 h-4" /> RECENT DIRECTIVES
                    </h3>
                    <ul className="space-y-4 text-sm text-slate-400">
                        <li className="flex items-start gap-3 group/item">
                            <span className="text-cyan-500 mt-1 group-hover/item:translate-x-1 transition-transform">&gt;</span>
                            <span>Integrated design with owner representatives during all processes of due diligence.</span>
                        </li>
                        <li className="flex items-start gap-3 group/item">
                            <span className="text-cyan-500 mt-1 group-hover/item:translate-x-1 transition-transform">&gt;</span>
                            <span>Energy use estimation for building designs and utility costs.</span>
                        </li>
                    </ul>
                </div>

                {/* Contact Link */}
                <div
                    onClick={() => onNavigate('CONTACT')}
                    className="border border-dashed border-slate-700 p-6 flex items-center justify-center flex-col text-center bg-slate-950/30 cursor-pointer hover:border-slate-500 hover:bg-slate-900/60 transition-all group"
                >
                    <div className="w-24 h-24 rounded-full border-4 border-slate-800 flex items-center justify-center mb-4 relative z-10 group-hover:border-slate-700 transition-colors">
                        <Zap className="w-10 h-10 text-white group-hover:text-yellow-400 transition-colors" />
                    </div>
                    <div className="text-xs tracking-[0.2em] text-slate-500 mb-2 group-hover:text-slate-400">SYSTEM LOAD</div>
                    <div className="text-3xl font-bold text-white tracking-widest group-hover:text-green-400 transition-colors">OPTIMAL</div>
                    {/* UPDATED TEXT BELOW */}
                    <div className="mt-4 text-[10px] text-cyan-500 font-bold uppercase tracking-widest group-hover:text-cyan-400 group-hover:underline decoration-cyan-500/50 underline-offset-4 transition-all">
                        Establish Contact &gt;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MissionStatus;