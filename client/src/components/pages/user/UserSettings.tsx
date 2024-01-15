import { useState } from "react";
import Heading from "../../Heading";
import Autocomplete from "react-google-autocomplete";
import Container from "../../Container";
import ProfileSettingsComponent from "./settings/ProfileSettingsComponent";
import AccountSettingsComponent from "./settings/AccountSettingsComponent";
import PersonalInfoSettingsComponent from "./settings/PersonalInfoSettingsComponent";
import Footer from "../../html/Footer";
import StickyBox, { useStickyBox } from "react-sticky-box";
import { Header } from "../../html/Header";

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
            <div>
                <Header homeRoute={'page'} headline={activeTab + "\nEinstellungen"} />
                <div className="max-grid content content-pt">
                    <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
                        <div className="col-span-1 min-h-fit">
                            <StickyBox offsetTop={100} offsetBottom={0}>
                                <div className='border-box setting-box box-shadow'>
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
                                    <a href="/help" className="help-link">Hilfe</a>
                                </div>
                            </StickyBox>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            {activeTab === 'profile' && <ProfileSettingsComponent />}
                            {activeTab === 'info' && <PersonalInfoSettingsComponent />}
                            {activeTab === 'account' && <AccountSettingsComponent />}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserSettings

