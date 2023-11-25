const PersonalInfoSettingsComponent = () => {
    return (
        <div className="grid pt-6">
            <p>Personal Info Settings</p>
            <form>
                <label htmlFor="gender">Geschlecht</label>
                <select name="gender" id="gender">
                    <option value="male">männlich</option>
                    <option value="female">weiblich</option>
                    <option value="diverse">divers</option>
                    <option value="noinfo">ohne Angabe</option>
                </select>
                {/* https://www.npmjs.com/package/react-google-autocomplete?activeTab=readme */}
                {/* <Autocomplete
                                apiKey={process.env.REACT_APP_GOOGLE}
                                defaultValue={'Berlin'} //Adresse aus User
                                onPlaceSelected={(place) => {
                                    console.log(place);
                                }}
                            /> */}
                <label htmlFor="street">Straße</label>
                <input id="street" type="text" placeholder="Straße"></input>
                <label htmlFor="str-numb">Nummer</label>
                <input id="str-num" type="text" placeholder="Nr."></input>
                <label htmlFor="plz">PLZ</label>
                <input id="plz" type="text" placeholder="PLZ"></input>
                <label htmlFor="city">Stadt</label>
                <input id="city" type="text" placeholder="Stadt"></input>


                <input type="submit" className="save" value="speichern" />
            </form>
        </div>
    );
};

export default PersonalInfoSettingsComponent;