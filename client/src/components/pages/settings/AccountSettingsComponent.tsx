const AccountSettingsComponent = () => {
    return (
        <div className="grid pt-6">
            <p>Account Setting</p>
            <form>
                <label htmlFor="email">E-Mail</label>
                <input id="email" type="text" placeholder="E-Mail"></input>
                {/* Passwortabfrage beim speichern */}
                <label htmlFor="language">Sprache</label>
                <select name="language" id="language">
                    <option value="german">deutsch</option>
                    <option value="english">english</option>
                </select>

                {/* <Select
                                options={["deutsch", "english"]}
                                label='Sprache'
                                id='gender'
                                register={register}
                                errors={errors}
                                required
                                disabled={loading}
                            /> */}
                <input type="submit" className="save" value="speichern" />
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
    );
};

export default AccountSettingsComponent;