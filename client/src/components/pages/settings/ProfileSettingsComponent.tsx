const ProfilSettingsComponent = () => {
    return (
        <div>
            <p>Profile Settings</p>
            <form>
                {/* hier fehlt das ausgelesene Profilbild */}
                <input type="submit" value="Neuer upload" />
                <input type="submit" value="Foto löschen" />
            </form>
            <form>
                <label htmlFor="vorname">Vorname</label>
                <input id="vorname" type="text" placeholder="Vorname"></input>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Name"></input>
                <span>Social Media Links</span>
                <label htmlFor="instagram">Instagram</label>
                <input id="instagram" type="text" placeholder="Instagram Profil URL"></input>
                <label htmlFor="facebook">Facebook</label>
                <input id="facebook" type="text" placeholder="Facbook Profil URL"></input>
                <input type="submit" className="save" value="speichern" />
            </form>
        </div>
    );
};

export default ProfilSettingsComponent;