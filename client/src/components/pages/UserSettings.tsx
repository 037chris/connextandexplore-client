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
                    {activeTab}
                    {activeTab === 'profile' && <div>Profil Seite hier rendern</div>}
                    {activeTab === 'info' && <div>Info Seite hier rendern</div>}
                    {activeTab === 'account' && <div>Account Seite hier rendern</div>}
                </div>
            </div>
        </>
    )
}

export default UserSettings

// <div>
                        //     <form>
                        //         <input type="submit" value="Neuer upload" />
                        //         <input type="submit" value="Foto löschen" />
                        //     </form>
                        //     <form>
                        //         <label id="vorname"></label>
                        //         <input id="vorname" className="border-slim" type="text" placeholder="Name"></input>
                        //         <label id="name"></label>
                        //         <input id="name" className="border-slim" type="text" placeholder="Name"></input>
                        //         <span>Social Media Links</span>
                        //         <label id="instagram"></label>
                        //         <input id="instagram" className="border-slim" type="text" placeholder="Instagram Profil URL"></input>
                        //         <label id="facebook"></label>
                        //         <input id="facebook" className="border-slim" type="text" placeholder="Facbook Profil URL"></input>
                        //         <input type="submit" value="speichern" />
                        //     </form>
                        // </div>