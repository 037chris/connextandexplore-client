import { useState } from "react";
import Heading from "../Heading";
import { SettingsNav } from "../settingsNavBar/SettingsNav";
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import Autocomplete from "react-google-autocomplete";

interface UserSettingsProps {
    activeTab: 'profile' | 'info' | 'account';
}

const UserSettings: React.FC<UserSettingsProps> = ({ activeTab }) => {
    // calender
    const [selected, setSelected] = useState<Date>();
    // selected date calender
    let footer = <p>Wann hast du Geburtstag?</p>
    if (selected) {
        footer = <p>{format(selected, 'PP')}</p>
    }

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
                    <div className="grid">
                        {/* {activeTab}
                        {activeTab === 'profile' && <div>Profil Seite hier rendern</div>}
                        {activeTab === 'info' && <div>Info Seite hier rendern</div>}
                        {activeTab === 'account' && <div>Account Seite hier rendern</div>} */}

                        <div>
                            <p>Profile Settings</p>
                            <form>
                                {/* hier fehlt das ausgelesene Profilbild */}
                                <input type="submit" value="Neuer upload" />
                                <input type="submit" value="Foto löschen" />
                            </form>
                            <form>
                                <label htmlFor="vorname">Vorname</label>
                                <input id="vorname" className="border-slim" type="text" placeholder="Vorname"></input>
                                <label htmlFor="name">Name</label>
                                <input id="name" className="border-slim" type="text" placeholder="Name"></input>
                                <span>Social Media Links</span>
                                <label htmlFor="instagram">Instagram</label>
                                <input id="instagram" className="border-slim" type="text" placeholder="Instagram Profil URL"></input>
                                <label htmlFor="facebook">Facebook</label>
                                <input id="facebook" className="border-slim" type="text" placeholder="Facbook Profil URL"></input>
                                <input type="submit" value="speichern" />
                            </form>
                        </div>
                    </div>
                    <div className="grid pt-6">
                        <p>Personal Info Settings</p>
                        <form>
                            {/* noch in der bearbeitung */}
                            {/* <DayPicker 
                                mode='single'
                                ISOWeek
                                defaultMonth={new Date(1979, 8)} // falls datum bereits eingegeben
                                selected={selected}
                                onSelect={setSelected}
                                footer={footer}
                            /> */}
                            <label htmlFor="gender">Geschlecht</label>
                            <select name="gender" id="gender">
                                <option value="male">männlich</option>
                                <option value="female">weiblich</option>
                                <option value="diverse">divers</option>
                                <option value="noinfo">ohne Angabe</option>
                            </select>
                            {/* https://www.npmjs.com/package/react-google-autocomplete?activeTab=readme */}
                            <Autocomplete
                                apiKey={process.env.REACT_APP_GOOGLE}
                                defaultValue={'Berlin'} //Adresse aus User
                                onPlaceSelected={(place) => {
                                    console.log(place);
                                }}
                            />


                            <input type="submit" value="speichern" />
                        </form>
                    </div>
                    <div className="grid pt-6">
                        <p>Account Setting</p>
                        <form>
                            <label htmlFor="email">Vorname</label>
                            <input id="email" className="border-slim" type="text" placeholder="E-Mail"></input>
                            {/* Passwortabfrage beim speichern */}
                            <label htmlFor="language">Sprache</label>
                            <select name="language" id="language">
                                <option value="german">deutsch</option>
                                <option value="english">english</option>    
                            </select>
                            <input type="submit" value="speichern" />
                        </form>

                        <div>
                            <p>Passwort ändern</p>
                            <p>Wenn du dein Passwort änderst, wirst du automatisch ausgeloggt.</p>
                            <button className="settings-btn">Passwort ändern</button>
                        </div>
                        <div>
                            <p>Account deaktivieren</p>
                            <p>Du kannst deinen Account vorübergehend deaktivieren. Meld dich einfach erneut an für eine Reaktivierung. </p>
                            <button className="settings-btn">Account deaktivieren</button>
                        </div>
                        <hr />
                        <div>
                            <p>Account löschen</p>
                            <p>Wenn du Connect and Explore erneut verwenden möchtest, musst du einen neuen Account erstellen.</p>
                            <button className="settings-btn">Account löschen</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSettings

