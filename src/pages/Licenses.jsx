import React from 'react';
import { Shield, Globe } from 'lucide-react';

const Licenses = () => {
    const states = [
        "Alabama", "Arizona", "California", "Colorado", "Connecticut", "Florida",
        "Hawaii", "Idaho", "Illinois", "Iowa", "Kansas", "Louisiana",
        "Massachusetts", "Michigan", "Minnesota", "Montana", "Nevada", "New Jersey",
        "New Mexico", "New York", "North Dakota", "Oklahoma", "Oregon",
        "South Dakota", "Texas", "Utah", "Washington", "Wisconsin", "Wyoming"
    ];

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col">
            <div className="mb-6 flex justify-between items-end border-b border-slate-800 pb-4">
                <div>
                    <h2 className="text-2xl text-white tracking-widest mb-2">AUTHORIZATION ZONES</h2>
                    <p className="text-sm text-slate-400 max-w-md">Mint Peterson is a registered Professional Engineer in the following jurisdictions.</p>
                </div>
                <Shield className="w-12 h-12 text-slate-800" />
            </div>

            <div className="flex-1 border border-cyan-900/50 bg-cyan-950/10 p-6 rounded relative overflow-hidden">
                {/* Background Map Graphic Placeholder */}
                <div className="absolute -right-20 -bottom-20 text-cyan-900/20 rotate-12">
                    <Globe className="w-96 h-96" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-4 gap-x-2 relative z-10">
                    {states.sort().map((state) => (
                        <div key={state} className="flex items-center gap-2 group cursor-default">
                            <div className="w-1.5 h-1.5 bg-slate-600 group-hover:bg-orange-500 transition-all rounded-sm"></div>
                            <span className="text-xs text-cyan-100/70 group-hover:text-cyan-100 uppercase">{state}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-cyan-900/30 flex flex-col sm:flex-row justify-between items-end gap-4">
                    <div className="text-[10px] text-cyan-600 font-mono">
                        LICENSE_DB_VER: 2026.1<br />
                        STATUS: <span className="text-green-500 animate-pulse">ACTIVE</span>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-bold text-cyan-500/80">30</div>
                        <div className="text-[10px] text-cyan-700 tracking-[0.3em] uppercase">Jurisdictions</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Licenses;