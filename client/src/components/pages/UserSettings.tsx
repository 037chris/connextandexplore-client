import { useState } from "react";
import Heading from "../Heading";
import { SettingsNav } from "../settingsNavBar/SettingsNav";

interface UserSettingsProps {
    activeTab: 'profile' | 'info' | 'account';
}

const UserSettings: React.FC<UserSettingsProps> = ({ activeTab }) => {

    return (
        <>
            <div className='p-3 max-w-lg mx-auto '>
                <h1 className='text-3xl text-center font-semibold mt-20 '>Settings</h1>
                <Heading title='Profil bearbeiten' subtitle="Diese Informationen erscheinen in deinem öffentlichen Profil" />
            </div>
            <div className='grid lg:grid-cols-3 gap-6'>
                <div className="cols-span-1">
                    <SettingsNav />
                </div>
                <div className="cols-span-2">
                    {activeTab === 'profile' && <div>Profil Seite hier rendern</div>}
                    {activeTab === 'info' && <div>Info Seite hier rendern</div>}
                    {activeTab === 'account' && <div>Account Seite hier rendern</div>}
                </div>
            </div>
        </>
    )
}

export default UserSettings