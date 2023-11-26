import { useState } from "react";
import Heading from "../Heading";
import Autocomplete from "react-google-autocomplete";
import Container from "../Container";
import ProfileSettingsComponent from "./settings/ProfileSettingsComponent";
import AccountSettingsComponent from "./settings/AccountSettingsComponent";
import PersonalInfoSettingsComponent from "./settings/PersonalInfoSettingsComponent";
import Footer from "../web/Footer";

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
                <div className='p-3'>
                    <h1 className='text-center font-semibold mt-20'>Settings</h1>
                </div>
                <div className="max-grid">
                    <div className='grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1'>
                        <div className="col-span-1 bg-blue-200">
                            <div className='border-box'>
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
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-2 bg-red-100 min-h-screen">


                        </div>
                    </div>
                </div>

                {/*
                <div className='grid grid-cols-1 grid-rows-2 lg:grid-cols-3 lg:grid-rows-1'>
                    <div className="col-span-1">
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
                    <div className="col-span-1 lg:col-span-2">
                        <div className="">
                            {activeTab === 'profile' && <ProfileSettingsComponent />}
                            {activeTab === 'info' && <PersonalInfoSettingsComponent />}
                            {activeTab === 'account' && <AccountSettingsComponent />}
                        </div>
                    </div>
                </div>*/}

            </div>
            <Footer />
        </>
    )
}

export default UserSettings

