import { useState, useEffect } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { userResource, uAddressResource } from "../../../Resources";
import { getUserIDFromJWT, getUser, updateUser } from "../../../backend/boardapi";
import Input from "../../inputs/Input";
import Button from "../../Button";

const ProfilSettingsComponent = () => {

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
            if (data.username)
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
        <div>
            <p>Profile Settings</p>
            <form>
                {/* hier fehlt das ausgelesene Profilbild */}
                <input type="submit" value="Neuer upload" />
                <input type="submit" value="Foto löschen" />
            </form>
            <form>
            {/*
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
            */}
            <Input
                id="firstname"
                label='Firstname *'
                disabled={loading}
                register={register}
                errors={errors}
                required
                defaultValue={user?.name.first}
            />
            <Input
                id="lastname"
                label='Name *'
                disabled={loading}
                register={register}
                errors={errors}
                required
                defaultValue={user?.name.last}
            />
            <Input
                id="email"
                label="Email *"
                disabled={loading} 
                register={register}
                errors={errors}
                pattern={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/}
                required
                defaultValue={user?.email}
            />
            <Input
                type='text'
                label='Facebook URL'
                id='socialMediaUrls.facebook'
                register={register}
                errors={errors}
                disabled={loading}
                defaultValue={user?.socialMediaUrls?.facebook}
            />
            <Input
                type='text'
                label='Instagram URL'
                id='socialMediaUrls.instagram'
                register={register}
                errors={errors}
                disabled={loading}
                defaultValue={user?.socialMediaUrls?.instagram}
            />
            <Button 
                disabled={loading}
                label={loading ? 'Loading...' : 'Continue'}
                onClick={() => {handleSubmit(onSubmit)}}
            />
            </form>
        </div>
    );
};

export default ProfilSettingsComponent;