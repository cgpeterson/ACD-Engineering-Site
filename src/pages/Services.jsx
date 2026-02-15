import React from 'react';
import { Crosshair } from 'lucide-react';

const Services = ({ onNavigate }) => {
    const serviceList = [
        "Integrated design with owner reps",
        "Complete 'design build' planning",
        "Energy use estimation & utility costs",
        "Detailed engineering fee proposals",
        "Bid and construction cost estimates",
        "Field investigation with reports",
        "Complete contract documents",
        "Construction observation & punch lists",
        "Bid and Contractor assistance",
        "Energy code documentation (HVAC/Elec)",
        "LEED consulting and documentation",
        "Direct advertising & project management"
    ];

    return (
        <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                <div>
                    <h2 className="text-2xl text-white tracking-widest mb-1">ACTIVE MODULES</h2>
                    <p className="text-xs text-slate-500">SELECT A SERVICE PROTOCOL TO INQUIRE</p>
                </div>
                <span className="text-xs font-bold text-orange-500 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded">
                    CLASS: ENGINEERING
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceList.map((service, idx) => (
                    <div
                        key={idx}
                        onClick={() => onNavigate('CONTACT')}
                        className="relative group p-4 border border-slate-800 bg-slate-950/40 hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all overflow-hidden cursor-pointer"
                    >
                        <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
                            <Crosshair className="w-4 h-4 text-cyan-500" />
                        </div>
                        <div className="text-[10px] text-slate-600 mb-2 font-bold tracking-widest group-hover:text-cyan-500 transition-colors">MOD_0{idx + 1}</div>
                        <h3 className="text-slate-200 text-sm font-semibold group-hover:text-cyan-400 transition-colors">{service}</h3>

                        {/* Decorative lines */}
                        <div className="absolute bottom-0 left-0 w-1 h-0 bg-orange-500 group-hover:h-full transition-all duration-300"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;