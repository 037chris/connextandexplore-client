import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../inputs/Input";
import { useEffect, useState } from "react";
import Button from "../../Button";
import { getUser, getUserIDFromJWT, updateUser } from "../../../backend/boardapi";
import { addressResource, userResource } from "../../../Resources";

const PersonalInfoSettingsComponent = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState<userResource | null>(null);

    const load = async () => {
        try {
            const id = await getUserIDFromJWT();
            const u:userResource = await getUser(id);
            console.log(u);
            setUser(u);
        } catch (err) {
            setUser(null);
        }
    }

    useEffect(() => { load(); }, []);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({})

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        try {
            const userData = user;
            const address:addressResource =  {
                street: data.address.street ? data.address.street : userData?.address.street,
                houseNumber: data.address.houseNumber ? data.address.houseNumber : userData?.address.houseNumber,
                postalCode: data.address.postalCode ? data.address.postalCode : userData?.address.postalCode,
                city: data.address.city ? data.address.city : userData?.address.city,
                country: data.address.country ? data.address.country : userData?.address.country,
                stateOrRegion: (data.address.stateOrRegion || userData?.address.stateOrRegion) || "",
                apartmentNumber: (data.address.apartmentNumber || userData?.address.apartmentNumber) || "", 
            }
            userData!.address = address;
            console.log(userData?.address);
            userData!.gender=data.gender;
            console.log("fetch");
            const res = await updateUser(userData!);
            console.log("res:",res);
            reset();
        } catch (error) {
            console.error(error);
            //todo: map backend validation error to inputfield
            //toast.error('Something went wrong...');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="grid pt-6">
            <p>Personal Info Settings</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="gender">Geschlecht</label>
                <select {...register('gender')} required name="gender" id="gender">
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
                {/*
                <label htmlFor="street">Straße</label>
                <input  id="street" type="text" placeholder="Straße"></input>
                <label htmlFor="str-numb">Nummer</label>
                <input id="str-num" type="text" placeholder="Nr."></input>
                <label htmlFor="plz">PLZ</label>
                <input id="plz" type="text" placeholder="PLZ"></input>
                <label htmlFor="city">Stadt</label>
                <input id="city" type="text" placeholder="Stadt"></input>
                        */}
                <Input
                    type='text'
                    label='Street *'
                    id='address.street'
                    register={register}
                    errors={errors}
                    required
                    disabled={loading}
                    pattern={/^[A-Za-z0-9\s\-.]+$/}
                    defaultValue={user?.address.street}
                />
                <Input
                    type='text'
                    label='Number *'
                    id='address.houseNumber'
                    register={register}
                    errors={errors}
                    required
                    disabled={loading}
                    pattern={/^[A-Za-z0-9\s\-/]+$/}
                    defaultValue={user?.address.houseNumber}
                />
                <Input
                    type='text'
                    label='City *'
                    id='address.city'
                    register={register}
                    errors={errors}
                    required
                    disabled={loading}
                    pattern={/^[A-Za-z\s-]+$/}
                    defaultValue={user?.address.city}
                />
                <Input
                    type='text'
                    label='Country *'
                    id='address.country'
                    register={register}
                    errors={errors}
                    required
                    disabled={loading}
                    pattern={/^[A-Za-z\s-]+$/}
                    defaultValue={user?.address.country}
                />
                <Input
                    type='text'
                    label='ZIP *'
                    id='address.postalCode'
                    register={register}
                    errors={errors}
                    required
                    disabled={loading}
                    defaultValue={user?.address.postalCode}
                />
                <Input
                    type='text'
                    label='State'
                    id='address.stateOrRegion'
                    register={register}
                    errors={errors}
                    disabled={loading}
                    defaultValue={user?.address.stateOrRegion}
                />
                <Input
                    type='text'
                    label='Apartment Number'
                    id='address.apartmentNumber'
                    register={register}
                    errors={errors}
                    disabled={loading}
                    defaultValue={user?.address.apartmentNumber}
                />
                <Button 
                    disabled={loading}
                    label={loading ? 'Loading...' : 'Continue'}
                    onClick={() => {handleSubmit(onSubmit)}}
                />
                {/*<input type="submit" className="save" value="speichern" />*/}
            </form>
        </div>
    );
};

export default PersonalInfoSettingsComponent;