import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import BootSequence from './components/BootSequence';
import { TABS } from './constants/tabs';

// Pages
import MissionStatus from './pages/MissionStatus';
import Services from './pages/Services';
import Licenses from './pages/Licenses';
import Projects from './pages/Projects';
import History from './pages/History';
import Contact from './pages/Contact';

// Styles
import './index.css';

const App = () => {
    const [activeTab, setActiveTab] = useState(TABS.SYSTEM);
    const [bootSequence, setBootSequence] = useState(true);

    useEffect(() => {
        const bootTimer = setTimeout(() => {
            setBootSequence(false);
        }, 2500);

        return () => clearTimeout(bootTimer);
    }, []);

    if (bootSequence) {
        return <BootSequence />;
    }

    const renderContent = () => {
        switch (activeTab) {
            case TABS.SYSTEM: return <MissionStatus onNavigate={setActiveTab} />;
            case TABS.SERVICES: return <Services onNavigate={setActiveTab} />;
            case TABS.PROJECTS: return <Projects />;
            case TABS.LICENSES: return <Licenses />;
            case TABS.HISTORY: return <History onNavigate={setActiveTab} />;
            case TABS.CONTACT: return <Contact />;
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
