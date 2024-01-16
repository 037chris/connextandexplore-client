import { useState, useEffect } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { userResource, uAddressResource } from "../../../../Resources";
import { getUserIDFromJWT, getUser, updateUser } from "../../../../backend/boardapi";
import Input from "../../../html/inputs/Input";
import Button from "../../../html/Button";
import profilepicture from "../../../../img/placeholder.jpg";

const ProfilSettingsComponent = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState<userResource | null>(null);

    const load = async () => {
        try {
            const id = await getUserIDFromJWT();
            const u: userResource = await getUser(id);
            console.log(u);
            setUser(u);
            setValue("firstname", u.name.first, { shouldValidate: true })
            setValue("lastname", u.name.last, { shouldValidate: true })
            setValue("email", u.email, { shouldValidate: true })
            setValue("socialMediaUrls.facebook", u.socialMediaUrls?.facebook, { shouldValidate: true })
            setValue("socialMediaUrls.instagram", u.socialMediaUrls?.instagram, { shouldValidate: true })
        } catch (err) {
            setUser(null);
        }
    }

    useEffect(() => { 
        document.title = 'Profil Einstellungen - Connect & Explore"';
        load(); 
    }, []);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
        setValue,
        reset
    } = useForm<FieldValues>({})

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        try {
            const userData = user;
            if (data.username)
                console.log(userData?.address);
            userData!.gender = data.gender;
            console.log("fetch");
            const res = await updateUser(userData!);
            console.log("res:", res);
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="setting-form">
                <div className="profile-img md:flex items-center">
                    <div className="user-picture">
                        <img src={profilepicture} alt="" />
                    </div>
                    <input type="submit" value="Neuer upload" className="new-upload" />
                    <input type="submit" value="Foto löschen" className="delete-profile-img" />
                </div>

                <Input
                    id="firstname"
                    label='Vorname'
                    disabled={loading}
                    register={register}
                    errors={errors}
                    required
                    defaultValue={user?.name.first}
                />
                <Input
                    id="lastname"
                    label='Name'
                    disabled={loading}
                    register={register}
                    errors={errors}
                    required
                    defaultValue={user?.name.last}
                />
                <Input
                    id="email"
                    label="E-Mail"
                    disabled={loading}
                    register={register}
                    errors={errors}
                    pattern={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/}
                    required
                    defaultValue={user?.email}
                />
                <span className="sm-headline">Social-Media Link</span>
                <Input
                    type='text'
                    label='Facebook Url'
                    id='socialMediaUrls.facebook'
                    register={register}
                    errors={errors}
                    disabled={loading}
                    defaultValue={user?.socialMediaUrls?.facebook}
                />
                <Input
                    type='text'
                    label='Instagram Url'
                    id='socialMediaUrls.instagram'
                    register={register}
                    errors={errors}
                    disabled={loading}
                    defaultValue={user?.socialMediaUrls?.instagram}
                />
                {/* <Button
                    disabled={loading}
                    label={loading ? 'Loading...' : 'Save'}
                    onClick={() => { handleSubmit(onSubmit) }}
                /> */}
                <button
                    className='btn save font-sans'
                    type='button'
                    onClick={() => {
                        handleSubmit(onSubmit)
                    }}>
                    Speichern
                </button>
            </form>
        </div>
    );
};

export default ProfilSettingsComponent;