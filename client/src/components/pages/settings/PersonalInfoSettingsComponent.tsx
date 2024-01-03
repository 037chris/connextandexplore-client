import { ErrorOption, FieldErrors, FieldValues, SubmitHandler, useForm,UseFormSetError } from "react-hook-form";
import Input from "../../inputs/Input";
import { SetStateAction, useEffect, useState } from "react";
import Button from "../../Button";
import { getUser, getUserIDFromJWT, updateUser } from "../../../backend/boardapi";
import { uAddressResource, userResource } from "../../../Resources";
import toast from "react-hot-toast";
import { ErrorFromValidation, ValidationError } from "../../../backend/validation";

const PersonalInfoSettingsComponent = () => {

    const [errorBackend, setErrorBackend] = useState<ValidationError[]|null>(null);
    const [loading, setLoading] = useState(false);

    //const [streetErr, setStreetErr] = useState<F|null>(null);
    const [user, setUser] = useState<userResource | null>(null);

    const load = async () => {
        try {
            const id = await getUserIDFromJWT();
            const u:userResource = await getUser(id);
            console.log(u);
            setUser(u);
            setValue("address.city", u.address.city, {shouldValidate:true})
            // setValue("address.country", u.address.country, {shouldValidate:true})
            setValue("address.postalCode", u.address.postalCode, {shouldValidate:true})
        } catch (err) {
            setUser(null);
        }
    }

    useEffect(() => { load(); }, []);

    const {
        register,
        handleSubmit,
        setError,
        formState: {
            errors,
        },
        //setError,
        setValue,
        reset
    } = useForm<FieldValues>({
        //setValue()
        // defaultValues: {
        //    "address.street":""
        //}
    })
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        try {
            const userData = user;
            const address:uAddressResource =  {    
                postalCode: data.address.postalCode ? data.address.postalCode : userData?.address.postalCode,
                city: data.address.city ? data.address.city : userData?.address.city,
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

            if (error instanceof ErrorFromValidation) {
                toast.error(error.message)
                error.validationErrors.forEach(err => {
                    // Setzen der Backend-Fehler für die entsprechenden Felder
                   /*  setError("street", { 
                        type: "custom",
                        message: err.msg,
                     });*/
                     //const e:ErrorOption = {type:"manual", message:err.msg};
                    //setError("address.street", e)
                });
                setErrorBackend(error.validationErrors);
                //const err:FieldErrors<any> = error.validationErrors 
            }
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
                    label='ZIP *'
                    id='address.postalCode'
                    register={register}
                    errors={errors}
                    required
                    disabled={loading}
                    defaultValue={user?.address.postalCode}
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