import React, { useState } from 'react';
import Container from "../Container";

interface SettingProps {}

export const SettingsNav: React.FC<SettingProps> = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'info' | 'account'>('profile');

    // to handle active setting tab
    const handleTabClick = (tab: 'profile' | 'info' | 'account') => {
        setActiveTab(tab);
    };

    return (
        <div className='border-solid rounded-md border-neutral-300'>
            <Container>
                <ul>
                    <li>
                        <a href="#" className={activeTab === 'profile' ? 'active': ''} onClick={() => handleTabClick('profile')}>
                            C&E Profil
                        </a>
                    </li>
                    <li>
                        <a href="#" className={activeTab === 'info' ? 'active': ''} onClick={() => handleTabClick('info')}>
                            Personal Info
                        </a>
                    </li>
                    <li>
                        <a href="#" className={activeTab === 'account' ? 'active': ''} onClick={() => handleTabClick('account')}>
                            Account
                        </a>
                    </li>
                </ul>
                <a href="#">Help</a>
            </Container>
        </div>
    );
};
