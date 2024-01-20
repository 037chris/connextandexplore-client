import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  getUser,
  getUserIDFromJWT,
  updateUser,
  deleteUser,
  logout,
} from "../../../../backend/boardapi";
import toast from "react-hot-toast";
import { userResource } from "../../../../Resources";
import { useEffect, useState } from "react";
import Input from "../../../html/inputs/Input";
import Button from "../../../html/Button";
import { useNavigate } from "react-router-dom";

const AccountSettingsComponent = () => {
  const [user, setUser] = useState<userResource | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const load = async () => {
    try {
      const id = await getUserIDFromJWT();
      const u: userResource = await getUser(id);
      setUser(u);
      //setValue("email", u.email, { shouldValidate: true });
      setValue("password", u.address.city, { shouldValidate: true });
      //setValue("firstname", u.name.first, { shouldValidate: true })
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    document.title = 'Account Einstellungen - Connect & Explore"';
    load();
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    //setError,
    setValue,
    reset,
  } = useForm<FieldValues>({});

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const userData = user;
      const formData = new FormData();
      console.log(data.email);

      if (data.email) {
        formData.append("email", data.email);
        if (userData?.id) {
          formData.append("id", userData?.id);
        }
        const res = await updateUser(formData!);
        console.log("res:", res);
        toast.success("Your E-Mail has been successfully updated");
      } else {
        toast.error("Please enter your new email");
      }

      reset();
    } catch (error) {
      console.error(error);
      toast.error("Please enter a valid data!");
    } finally {
      setLoading(false);
    }
  };
  const onSubmitPW: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const userData = user;
      const formData = new FormData();
      console.log(data.oldPassword);
      console.log(data.password);
      if (data.password && data.oldPassword) {
        formData.append("password", data.password);
        formData.append("oldPassword", data.oldPassword);
        if (userData?.id) {
          formData.append("id", userData?.id);
        }
      } else {
        toast.error("Please enter your new password and old password");
      }

      const res = await updateUser(formData!);
      console.log("res:", res);
      toast.success("Your Password has been successfully updated");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Please enter a valid Password");
    } finally {
      setLoading(false);
    }
  };
  const onSubmitAccOff: SubmitHandler<FieldValues> = async () => {
    setLoading(true);
    try {
      const userData = user;
      if (userData?.id) {
        const res = await deleteUser(userData.id);
        console.log("res:", res);
        toast.success("Your Account has been successfully deactivated");
        logout();
        navigate(0);
      }
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Error while deactivation of your account");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid pt-6">
      <form onSubmit={handleSubmit(onSubmit)} className="setting-form">
        <p>
          Hier haben Sie die Kontrolle über Ihr Nutzerkonto und können
          individuelle Einstellungen vornehmen.
        </p>
        <p className="strong mb-5 mt-7">E-Mail ändern</p>
        <p>Bitte neue E-Mail Adresse eingeben.</p>
        <label htmlFor="email">E-Mail (neu)</label>
        <Input
          type="text"
          label={""}
          id="email"
          register={register}
          errors={errors}
          disabled={loading}
        />
        <Button
          disabled={loading}
          label={loading ? "Loading..." : "speichern"}
          onClick={() => {}}
          primary
        />
      </form>

      <div>
        <p className="strong mb-5 mt-7">Passwort ändern</p>
        <p>Wenn du dein Passwort änderst, wirst du automatisch ausgeloggt.</p>

        <form onSubmit={handleSubmit(onSubmitPW)} className="setting-form">
          <label htmlFor="oldPassword">Altes Passwort</label>
          <Input
            type="password"
            label={""}
            id="oldPassword"
            register={register}
            errors={errors}
            disabled={loading}
          />
          <label htmlFor="password">Neues Passwort</label>
          <Input
            type="password"
            label={""}
            id="password"
            register={register}
            errors={errors} 
            disabled={loading}
          />
          <Button
            disabled={loading}
            label={loading ? "Loading..." : "speichern"}
            onClick={() => {}}
            primary
          />
        </form>
      </div>

      <div>
        <p className="strong mb-5 mt-7">Account deaktivieren</p>
        <p>
          Du kannst deinen Account vorübergehend deaktivieren. Meld dich einfach
          erneut an für eine Reaktivierung.{" "}
        </p>
        <form onSubmit={handleSubmit(onSubmitAccOff)} className="setting-form">
          <Button
            disabled={loading}
            label={loading ? "Loading..." : "deaktivieren"}
            onClick={() => {}}
            secondary
          />
        </form>
      </div>
    </div>
  );
};

export default AccountSettingsComponent;
