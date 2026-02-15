import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import BootSequence from './components/BootSequence';

// Pages
import MissionStatus from './pages/MissionStatus';
import Services from './pages/Services';
import Licenses from './pages/Licenses';
import History from './pages/History';
import Contact from './pages/Contact';

// Styles
import './index.css';

const App = () => {
    const [activeTab, setActiveTab] = useState('SYSTEM');
    const [bootSequence, setBootSequence] = useState(true);

    // Handle Boot Sequence
    useEffect(() => {
        const bootTimer = setTimeout(() => {
            setBootSequence(false);
        }, 2500);

        return () => clearTimeout(bootTimer);
    }, []);

    // Show boot screen if loading
    if (bootSequence) {
        return <BootSequence />;
    }

    // Router Logic - NOW PASSING onNavigate PROP
    const renderContent = () => {
        switch (activeTab) {
            case 'SYSTEM': return <MissionStatus onNavigate={setActiveTab} />;
            case 'SERVICES': return <Services onNavigate={setActiveTab} />;
            case 'LICENSES': return <Licenses onNavigate={setActiveTab} />;
            case 'HISTORY': return <History onNavigate={setActiveTab} />;
            case 'CONTACT': return <Contact />;
            default: return <MissionStatus onNavigate={setActiveTab} />;
        }
    };

    return (
        <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
            {renderContent()}
        </Layout>
    );
};

export default App;