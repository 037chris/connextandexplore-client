import {
  ErrorOption,
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormSetError,
} from "react-hook-form";
import Input from "../../../html/inputs/Input";
import { SetStateAction, useEffect, useState } from "react";
import Button from "../../../html/Button";
import {
  getUser,
  getUserIDFromJWT,
  updateUser,
} from "../../../../backend/boardapi";
import { uAddressResource, userResource } from "../../../../Resources";
import toast from "react-hot-toast";
import {
  ErrorFromValidation,
  ValidationError,
} from "../../../../backend/validation";

const PersonalInfoSettingsComponent = () => {
  const [errorBackend, setErrorBackend] = useState<ValidationError[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  //const [streetErr, setStreetErr] = useState<F|null>(null);
  const [user, setUser] = useState<userResource | null>(null);

  const load = async () => {
    try {
      const id = await getUserIDFromJWT();
      const u: userResource = await getUser(id);
      console.log(u);
      setUser(u);
      setValue("address.city", u.address.city, { shouldValidate: true });
      setValue("address.postalCode", u.address.postalCode, {
        shouldValidate: true,
      });
      setValue("gender", u.gender, {
        shouldValidate: true,
      });
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    document.title = 'Persönliche Einstellungen - Connect & Explore"';
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
  } = useForm<FieldValues>({
    //setValue()
    // defaultValues: {
    //    "address.street":""
    //}
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const userData = user;
      const formData = new FormData();
      if (data.address.postalCode) {
        formData.append("address[postalCode]", data.address.postalCode);
      } else if (userData?.address.postalCode) {
        formData.append("address[postalCode]", userData.address.postalCode);
      }
      if (data.address.city) {
        formData.append("address[city]", data.address.city);
      } else if (userData?.address.postalCode) {
        formData.append("address[city]", userData.address.city);
      }

      if (data.gender) {
        formData.append("gender", data.gender);
      } else if (userData?.gender) {
        formData.append("gender", userData.gender);
      }
      if (userData?.id) {
        formData.append("id", userData?.id);
      }

      const res = await updateUser(formData!);
      console.log("res:", res);
      //toast.success("Your profile has been successfully updated");
      toast.success("Dein Profil wurde aktualisiert.");
      reset();
      const id = await getUserIDFromJWT();
      const updatedUserData = await getUser(id);
      // Update the form inputs with the updated data
      setValue("address.city", updatedUserData?.address?.city ?? "");
      setValue(
        "address.postalCode",
        updatedUserData?.address?.postalCode ?? ""
      );
      setValue("gender", updatedUserData?.gender ?? "");
    } catch (error) {
      //toast.error("Please enter a valid data");
      toast.error("Bitte gebe gültige Daten ein!");
      console.error(error);
      //todo: map backend validation error to inputfield
      //toast.error('Something went wrong...');

      if (error instanceof ErrorFromValidation) {
        toast.error(error.message);
        error.validationErrors.forEach((err) => {
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
  };

  return (
    <div className="grid pt-6">
      <form onSubmit={handleSubmit(onSubmit)} className="setting-form">
        <p>
          Hier haben Sie die Kontrolle über Ihr Nutzerkonto und können
          individuelle Einstellungen vornehmen.
        </p>
        <p className="strong pt-6"> Persönliche Angaben</p>
        <label htmlFor="gender">Geschlecht</label>
        <select {...register("gender")} required name="gender" id="gender">
          <option value="male">männlich</option>
          <option value="female">weiblich</option>
          <option value="diverse">divers</option>
          <option value="noinfo">ohne Angabe</option>
        </select>

        <p className="strong pt-6"> Adress-Daten</p>
        <Input
          type="text"
          label={!user?.address.city ? "City *" : ""}
          id="address.city"
          register={register}
          errors={errors}
          required
          disabled={loading}
          defaultValue={user?.address.city}
        />

        <Input
          type="text"
          label={!user?.address.postalCode ? "ZIP *" : ""}
          id="address.postalCode"
          register={register}
          errors={errors}
          required
          disabled={loading}
          defaultValue={user?.address.postalCode}
        />

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

export default PersonalInfoSettingsComponent;
