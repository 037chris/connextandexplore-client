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
                <p className="strong mb-5 mt-7">Passwort ändern</p>
                <p>Wenn du dein Passwort änderst, wirst du automatisch ausgeloggt.</p>
                <button className="settings-btn btn-primary">Passwort ändern</button>
            </div>
            <div>
                <p className="strong mb-5 mt-7">Account deaktivieren</p>
                <p>Du kannst deinen Account vorübergehend deaktivieren. Meld dich einfach erneut an für eine Reaktivierung. </p>
                <button className="settings-btn btn-primary">Account deaktivieren</button>
            </div>
            <hr />
            <div>
                <p className="strong mb-5 mt-7">Account löschen</p>
                <p>Wenn du Connect and Explore erneut verwenden möchtest, musst du einen neuen Account erstellen.</p>
                <button className="settings-btn btn-alert">Account löschen</button>
            </div>
        </div>
    );
};

export default AccountSettingsComponent;