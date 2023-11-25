import { useState } from "react";
import Heading from "../Heading";
import { SettingsNav } from "../settingsNavBar/SettingsNav";
import Autocomplete from "react-google-autocomplete";
import Container from "../Container";
import ProfileSettingsComponent from "./settings/ProfileSettingsComponent";
import AccountSettingsComponent from "./settings/AccountSettingsComponent";
import PersonalInfoSettingsComponent from "./settings/PersonalInfoSettingsComponent";

interface SettingsNavProps {
    activeTab: 'profile' | 'info' | 'account';
}

const UserSettings: React.FC<SettingsNavProps> = ({ }) => {
    const [activeTab, setActiveTab] = useState<'profile' | 'info' | 'account'>('profile');

    // to handle active setting tab
    const handleTabClick = (tab: 'profile' | 'info' | 'account') => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className='p-3 max-w-lg mx-auto '>
                <h1 className='text-3xl text-center font-semibold mt-20 '>Settings</h1>
                <Heading title='Profil bearbeiten' subtitle="Diese Informationen erscheinen in deinem öffentlichen Profil" />
            </div>
            <div className='grid lg:grid-cols-3 gap-6'>
                <div className="cols-span-1">
                    <div className='border-box'>
                        <Container>
                            <ul>
                                <li>
                                    <a href="#" className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabClick('profile')}>
                                        C&E Profil
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={activeTab === 'info' ? 'active' : ''} onClick={() => handleTabClick('info')}>
                                        Personal Info
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={activeTab === 'account' ? 'active' : ''} onClick={() => handleTabClick('account')}>
                                        Account
                                    </a>
                                </li>
                            </ul>
                            <a href="#" className="help-link">Help</a>
                        </Container>
                    </div>
                </div>
                <div className="cols-span-2">
                    <div className="grid">
                        {activeTab === 'profile' && <ProfileSettingsComponent />}
                        {activeTab === 'info' && <PersonalInfoSettingsComponent />}
                        {activeTab === 'account' && <AccountSettingsComponent />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSettings

