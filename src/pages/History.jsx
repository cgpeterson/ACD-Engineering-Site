import React from 'react';
import { ChevronRight } from 'lucide-react';

const History = ({ onNavigate }) => {
    return (
        <div className="space-y-12 animate-in fade-in duration-500 px-4">
            <div className="relative border-l border-slate-700 ml-4 pl-12 pb-2">
                {/* Timeline Node */}
                <div className="absolute -left-[17px] top-0 w-9 h-9 bg-slate-950 border border-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                </div>

                <div className="text-xs text-cyan-500 font-bold mb-2 tracking-widest border-b border-slate-800 inline-block pb-1">2013 - PRESENT</div>
                <h3 className="text-2xl text-white mb-4 font-bold">ACD ENGINEERS ESTABLISHED</h3>
                <div className="bg-slate-900/50 p-6 border-l-4 border-cyan-500">
                    <p className="text-slate-300 text-sm leading-relaxed">
                        Mint Peterson established ACD Engineers as principal to better serve customers, adding owner and operator to his skill set while continuing to provide design, drafting, and construction administration excellence.
                    </p>
                </div>
            </div>

            <div className="relative border-l border-slate-800 ml-4 pl-12 pb-2">
                <div className="absolute -left-[13px] top-0 w-7 h-7 bg-slate-950 border border-slate-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                </div>
                <div className="text-xs text-slate-500 font-bold mb-2 tracking-widest">2014 - 2020</div>
                <h3 className="text-xl text-slate-300 mb-4">SIMPLOT AGRIBUSINESS</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                    Project and plant management of electrical engineering. Establishing design, bidding, and contracting process for a 75-year-old industrial plant.
                </p>
            </div>

            {/* Clickable Licensure Section */}
            <div
                onClick={() => onNavigate('LICENSES')}
                className="relative border-l border-slate-800 ml-4 pl-12 group cursor-pointer"
            >
                <div className="absolute -left-[13px] top-0 w-7 h-7 bg-slate-950 border border-slate-600 group-hover:border-orange-500 rounded-full flex items-center justify-center transition-colors">
                    <div className="w-2 h-2 bg-slate-600 group-hover:bg-orange-500 rounded-full transition-colors"></div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <div className="text-xs text-slate-500 font-bold tracking-widest group-hover:text-orange-500 transition-colors">1999</div>
                    <div className="opacity-0 group-hover:opacity-100 text-orange-500 transition-opacity"><ChevronRight size={14} /></div>
                </div>

                <h3 className="text-xl text-slate-300 mb-4 group-hover:text-white transition-colors">PROFESSIONAL LICENSURE</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl group-hover:text-slate-300 transition-colors">
                    Mint obtained his first Professional Engineering license, marking the beginning of a multi-state certified career.
                </p>

                <div className="mt-4 text-[10px] text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    View Active Zones &gt;
                </div>
            </div>
        </div>
    );
};

export default History;