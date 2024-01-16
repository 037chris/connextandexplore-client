import { FieldValues, SubmitHandler } from "react-hook-form";
import { getUser, getUserIDFromJWT } from "../../../../backend/boardapi";
import { userResource } from "../../../../Resources";
import { useEffect, useState } from "react";
import Input from "../../../html/inputs/Input";

const AccountSettingsComponent = () => {
    const [user, setUser] = useState<userResource | null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const load = async () => {
        try {
            const id = await getUserIDFromJWT();
            const u: userResource = await getUser(id);
            setUser(u);
            //setValue("firstname", u.name.first, { shouldValidate: true })
        } catch (err) {
            setUser(null);
        }
    }

    useEffect(() => { 
        document.title = 'Account Einstellungen - Connect & Explore"';
        load(); 
    }, []);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        try {

        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="grid pt-6">
            <form onSubmit={() => { }} className="setting-form">
                <p>Hier haben Sie die Kontrolle über Ihr Nutzerkonto und können individuelle Einstellungen vornehmen.</p>
                <p className="strong mb-5 mt-7">E-Mail ändern</p>
                <p>Bitte neue E-Mail Adresse eingeben.</p>
                <label htmlFor="email">E-Mail (neu)</label>
                <input id="email" type="text" placeholder="E-Mail"></input>
                <input type="submit" className="save" value="speichern" />
            </form>

            <div>
                <p className="strong mb-5 mt-7">Passwort ändern</p>
                <p>Wenn du dein Passwort änderst, wirst du automatisch ausgeloggt.</p>

                <form onSubmit={() => { }} className="setting-form">
                    <label htmlFor="email">Neues Passwort</label>
                    <input id="password" type="text" placeholder="*****"></input>

                    <input type="submit" className="save password" value="speichern" />
                </form>
            </div>


            <div>
                <p className="strong mb-5 mt-7">Account deaktivieren</p>
                <p>Du kannst deinen Account vorübergehend deaktivieren. Meld dich einfach erneut an für eine Reaktivierung. </p>
                <form onSubmit={() => { }} className="setting-form">
                    <label htmlFor="password">Passwort</label>
                    <input id="password" type="text" placeholder="Password"></input>

                    <input type="submit" className="save password" value="deaktivieren" />
                </form>
            </div>
        </div>
    );
};

export default AccountSettingsComponent;

