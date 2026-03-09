const ConstructionTape = () => {
    return (
        <div className="absolute z-20 pointer-events-none select-none top-[42px] -right-[50px] w-[300px] rotate-[32deg] origin-center">
            <div
                className="py-2.5 text-center font-black text-xs tracking-[0.25em] uppercase text-white"
                style={{
                    background: 'repeating-linear-gradient(-45deg, #f59e0b, #f59e0b 10px, #111111 10px, #111111 20px)',
                    boxShadow: '0 3px 15px rgba(245,158,11,0.4)',
                    textShadow: '0 0 3px rgba(0,0,0,1), 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
                }}
            >
                UNDER CONSTRUCTION
            </div>
        </div>
    );
};

export default ConstructionTape;
