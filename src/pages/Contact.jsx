import React, { useState } from 'react';
import { Radio, Zap, CheckCircle, Loader } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState('IDLE'); // IDLE, SENDING, SENT

    const handleTransmit = (e) => {
        e.preventDefault();
        setFormState('SENDING');

        // Simulate network delay for the "spaceship" effect
        setTimeout(() => {
            setFormState('SENT');
            // Reset after a few seconds so they can send another
            setTimeout(() => setFormState('IDLE'), 3000);
        }, 2000);
    };

    return (
        <div className="max-w-xl mx-auto animate-in zoom-in-95 duration-300 h-full flex items-center justify-center">
            <div className="bg-slate-900 border border-slate-700 p-2 w-full shadow-2xl relative">
                <div className="bg-slate-950 p-8 border border-slate-800 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent h-4 animate-scan pointer-events-none"></div>

                    {formState === 'SENT' ? (
                        <div className="text-center animate-in zoom-in duration-300">
                            <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-widest mb-2">TRANSMISSION COMPLETE</h2>
                            <p className="text-slate-500 text-xs tracking-wider">PAYLOAD DELIVERED TO HQ.</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-8 relative z-10">
                                <div className={`w-16 h-16 mx-auto mb-4 bg-orange-500/10 rounded-full flex items-center justify-center border border-orange-500/50 transition-all ${formState === 'SENDING' ? 'animate-pulse border-orange-500 bg-orange-500/20' : ''}`}>
                                    {formState === 'SENDING' ? (
                                        <Loader className="w-8 h-8 text-orange-500 animate-spin" />
                                    ) : (
                                        <Radio className="w-8 h-8 text-orange-500" />
                                    )}
                                </div>
                                <h2 className="text-xl font-bold text-white tracking-[0.2em]">
                                    {formState === 'SENDING' ? 'ESTABLISHING UPLINK...' : 'TRANSMIT PRIORITY MESSAGE'}
                                </h2>
                            </div>

                            <form onSubmit={handleTransmit} className={`space-y-6 relative z-10 transition-opacity duration-300 ${formState === 'SENDING' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                                <div className="group">
                                    <label className="block text-[10px] text-cyan-500 mb-2 font-bold tracking-wider">IDENTIFIER (NAME)</label>
                                    <div className="flex items-center">
                                        <span className="bg-slate-900 border-b border-slate-700 text-slate-500 p-2 text-xs font-mono select-none">&gt;</span>
                                        <input required type="text" className="w-full bg-slate-900 border-b border-slate-700 text-white p-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors" placeholder="ENTER_NAME" />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] text-cyan-500 mb-2 font-bold tracking-wider">FREQUENCY (EMAIL)</label>
                                    <div className="flex items-center">
                                        <span className="bg-slate-900 border-b border-slate-700 text-slate-500 p-2 text-xs font-mono select-none">&gt;</span>
                                        <input required type="email" className="w-full bg-slate-900 border-b border-slate-700 text-white p-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors" placeholder="ENTER_EMAIL_ADDRESS" />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] text-cyan-500 mb-2 font-bold tracking-wider">PAYLOAD (MESSAGE)</label>
                                    <textarea required rows="4" className="w-full bg-slate-900 border border-slate-700 text-white p-3 text-sm focus:outline-none focus:border-cyan-500 focus:bg-slate-800 transition-colors rounded-none placeholder-slate-700 resize-none font-mono" placeholder="ENTER_TRANSMISSION_DATA..."></textarea>
                                </div>

                                <button disabled={formState === 'SENDING'} className="w-full bg-orange-600 hover:bg-orange-500 text-black font-bold py-4 mt-4 text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
                                    <Zap className={`w-4 h-4 ${formState === 'SENDING' ? 'animate-none' : 'group-hover:animate-pulse'}`} />
                                    {formState === 'SENDING' ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                                </button>
                            </form>

                            <div className="mt-8 text-center border-t border-slate-900 pt-6">
                                <p className="text-sm text-cyan-500 font-bold tracking-wide">INFO@ACD-ENGINEERS.COM</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;