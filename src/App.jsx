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
    const [locationFilter, setLocationFilter] = useState(null);

    useEffect(() => {
        const bootTimer = setTimeout(() => {
            setBootSequence(false);
        }, 2500);

        return () => clearTimeout(bootTimer);
    }, []);

    if (bootSequence) {
        return <BootSequence />;
    }

    const navigate = (tab) => {
        setLocationFilter(null);
        setActiveTab(tab);
    };

    const navigateToProjectsWithState = (stateCode) => {
        setLocationFilter(stateCode);
        setActiveTab(TABS.PROJECTS);
    };

    const renderContent = () => {
        switch (activeTab) {
            case TABS.SYSTEM: return <MissionStatus onNavigate={navigate} />;
            case TABS.SERVICES: return <Services onNavigate={navigate} />;
            case TABS.PROJECTS: return <Projects locationFilter={locationFilter} clearLocationFilter={() => setLocationFilter(null)} />;
            case TABS.LICENSES: return <Licenses onStateSelect={navigateToProjectsWithState} />;
            case TABS.HISTORY: return <History onNavigate={navigate} />;
            case TABS.CONTACT: return <Contact />;
            default: return <MissionStatus onNavigate={navigate} />;
        }
    };

    return (
        <Layout activeTab={activeTab} setActiveTab={navigate}>
            {renderContent()}
        </Layout>
    );
};

export default App;
