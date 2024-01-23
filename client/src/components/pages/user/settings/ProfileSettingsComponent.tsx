import { useState, useEffect, useContext } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { userResource, uAddressResource } from "../../../../Resources";
import {
  getUserIDFromJWT,
  getUser,
  updateUser,
} from "../../../../backend/boardapi";
import Input from "../../../html/inputs/Input";
import Button from "../../../html/Button";
import profilepicturedefault from "../../../../img/placeholder.jpg";
import Avatar from "../Avatar";
import toast from "react-hot-toast";
import { HOST } from "../../../../backend/getHostApi";
import { useNavigate } from "react-router-dom";
import { AvatarContext } from "../../../../actions/AvatarContext";

const ProfilSettingsComponent = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AvatarContext) as any;

  const [user, setUser] = useState<userResource | null>(null);
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();
  const load = async () => {
    try {
      const id = await getUserIDFromJWT();
      const u: userResource = await getUser(id);
      setProfilePicture(u?.profilePicture || "");
      console.log(u);
      setUser(u);
      setValue("firstname", u.name.first, { shouldValidate: true });
      setValue("lastname", u.name.last, { shouldValidate: true });
      setValue("email", u.email, { shouldValidate: true });
      setValue("socialMediaUrls.facebook", u.socialMediaUrls?.facebook, {
        shouldValidate: true,
      });
      setValue("socialMediaUrls.instagram", u.socialMediaUrls?.instagram, {
        shouldValidate: true,
      });
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    document.title = 'Profil Einstellungen - Connect & Explore"';
    load();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FieldValues>({});

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const userData = user;
      console.log("Data:", data);
      console.log("userData:", userData);

      const formData = new FormData();
      if (data.firstname) {
        formData.append("name[first]", data.firstname);
      } else if (userData?.name.first) {
        formData.append("name[first]", userData.name.first);
      }
      if (data.lastname) {
        formData.append("name[last]", data.lastname);
      } else if (userData?.name.last) {
        formData.append("name[last]", userData.name.last);
      }
      if (userData?.id) {
        formData.append("id", userData?.id);
      }
      if (data.socialMediaUrls?.facebook) {
        formData.append(
          "socialMediaUrls[facebook]",
          data.socialMediaUrls?.facebook
        );
      } else if (userData?.socialMediaUrls?.facebook) {
        formData.append(
          "socialMediaUrls[facebook]",
          userData?.socialMediaUrls?.facebook
        );
      }
      if (data.socialMediaUrls?.instagram) {
        formData.append(
          "socialMediaUrls[instagram]",
          data.socialMediaUrls?.instagram
        );
      } else if (userData?.socialMediaUrls?.instagram) {
        formData.append(
          "socialMediaUrls[instagram]",
          userData?.socialMediaUrls?.instagram
        );
      }

      if (data.profilePicture.length > 0) {
        formData.append("profilePicture", data.profilePicture[0]);
      }
      console.log("profilePicture", data.profilePicture[0]);
      const updatedUserData = await updateUser(formData!);
      console.log("res:", updatedUserData);
      if (updatedUserData.profilePicture) {
        dispatch({
          type: "SET_AVATAR",
          payload: updatedUserData.profilePicture,
        });
        setProfilePicture(updatedUserData.profilePicture);
      }
      //toast.success("Your profile has been successfully updated");
      toast.success("Dein Profil wurde aktualisiert.");
      reset();

      // Update the form inputs with the updated data
      setValue("firstname", updatedUserData?.name?.first ?? "");
      setValue("lastname", updatedUserData?.name?.last ?? "");
      setValue(
        "socialMediaUrls.facebook",
        updatedUserData?.socialMediaUrls?.facebook ?? ""
      );
      setValue(
        "socialMediaUrls.instagram",
        updatedUserData?.socialMediaUrls?.instagram ?? ""
      );
      //navigate(0);
    } catch (error) {
      //toast.error("Please enter a valid data!");
      toast.error("Bitte gebe gültige Daten ein!");
      console.error(error);
      //todo: map backend validation error to inputfield
      //toast.error('Something went wrong...');
    } finally {
      setLoading(false);
    }
    //window.location.reload();
  };
  const onSubmitDeletePicture: SubmitHandler<FieldValues> = async () => {
    setLoading(true);
    try {
      const userData = user;
      const formData = new FormData();
      formData.append("deletePicture", "true");
      if (userData?.id) {
        formData.append("id", userData?.id);
      }
      const updatedUserData = await updateUser(formData!);
      console.log("res:", updatedUserData);
      if (updatedUserData.profilePicture === "") {
        setProfilePicture("");
        dispatch({
          type: "SET_AVATAR",
          payload: null,
        });
      }
      //toast.success("Your profile picture has been successfully deleted");
      toast.success("Dein Profilbild wurde gelöscht.");
      reset();
      //navigate(0);
    } catch (error) {
      //toast.error("Your profile picture can not be deleted");
      toast.error("Dein Profilbild konnte nicht gelöscht werden.");
      console.error(error);
      //todo: map backend validation error to inputfield
      //toast.error('Something went wrong...');
    } finally {
      setLoading(false);
    }
    //window.location.reload();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="setting-form"
        encType="multipart/form-data"
      >
        {/* <div className="profile-img flex flex-col items-center md:flex-row md:items-center md:gap-4"> */}
        <div className="profile-img grid grid-cols-1 sm:grid-cols-3 items-center sm:flex-row md:items-center md:gap-4">
          <div className="user-picture mb-2 sm:mb-0">
            <div>
              <Avatar
                src={
                  profilePicture
                    ? `${HOST}/images/users/${profilePicture}`
                    : "/images/placeholder.jpg"
                }
              />
            </div>
          </div>

          <div className="mt-2 md:mt-0 flex flex-col items-center">
            <Input
              type="file"
              label=""
              id="profilePicture"
              register={register}
              errors={errors}
              disabled={loading}
            />
          </div>

          <div className="profile-actions md:flex md:items-center md:gap-4">
            <input
              type="button"
              value="Foto löschen"
              className="delete-profile-img"
              onClick={onSubmitDeletePicture}
            />
          </div>
        </div>

        <Input
          id="firstname"
          label={!user?.name.first ? "Vorname" : ""}
          disabled={loading}
          register={register}
          errors={errors}
          required
          defaultValue={user?.name.first}
        />
        <Input
          id="lastname"
          label={!user?.name.last ? "Name" : ""}
          disabled={loading}
          register={register}
          errors={errors}
          required
          defaultValue={user?.name.last}
        />

        <span className="sm-headline">Social-Media Link</span>
        <Input
          type="text"
          label={!user?.socialMediaUrls?.facebook ? "Facebook Url" : ""}
          id="socialMediaUrls.facebook"
          register={register}
          errors={errors}
          disabled={loading}
          defaultValue={user?.socialMediaUrls?.facebook}
        />
        <Input
          type="text"
          label={!user?.socialMediaUrls?.instagram ? "Instagram Url" : ""}
          id="socialMediaUrls.instagram"
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
        <Button
          disabled={loading}
          label={loading ? "Loading..." : "Speichern"}
          onClick={() => {}}
          primary
          className="save"
        />
      </form>
    </div>
  );
};

export default ProfilSettingsComponent;
