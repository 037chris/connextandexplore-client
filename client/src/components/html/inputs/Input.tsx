import React, { useEffect, useState } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  get,
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  className?: string;
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  pattern?: RegExp;
  onChange?: (file: File | null) => void;
  onChangeFn?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({
  className,
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
  pattern,
  onChange,
  onChangeFn,
  defaultValue,
  minLength,
  maxLength
}) => {
  const error = get(errors, id);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  useEffect(() => {
    const validateAge = (value: any) => {
      const selectedYear = new Date(value).getFullYear();
      const currentYear = new Date().getFullYear();
      return currentYear - selectedYear >= 18;
    };

    const validateGender = (value: any) => {
      if (id !== "gender") {
        return true;
      }

      const acceptedValues = ["male", "female", "other"];
      return acceptedValues.includes(value.toLowerCase());
    };

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
      // mindestens 8 Zeichen, mindestens 1 Großbuchstabe, mindestens 1 Zahl, mindestens 1 Sonderzeichen
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&§/()=#+-.,:;])[A-Za-z\d@$!%*?&§/()=#+-.,:;]{8,}$/;
      return passwordRegex.test(password);
    };

    const validateInput = (value: any) => {
      if (id === 'birthDate') {
        return validateAge(value);
      } else if (id === 'gender') {
        return validateGender(value);
      } else if (id === 'email') {
        return validateEmail(value);
      } else if (id === 'password') {
        return validatePassword(value);
      }

      return true;
    };

    register(id, {
      //validate: id === "birthDate" ? validateAge : validateGender,
      validate: validateInput,
    });
  }, [register, id]);

  const isFileInput = type === "file";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadedFileName(file ? file.name : null);
  };

  return (
    <div className={`w-full relative ${isFileInput ? "col-span-full" : ""}`}>
      {formatPrice && (
        <BiDollar size={24} className="text-neutral-700 absolute top-5 left-2" />
      )}

      {isFileInput ? (
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
          <div className="text-center">
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor={id}
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Bildupload</span>
                <input
                  id={id}
                  type="file"
                  className="sr-only"
                  {...register(id, { required })}
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">
                {uploadedFileName ? uploadedFileName : "or drag and drop"}
              </p>
            </div>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG bis zu 10MB</p>
          </div>
        </div>
      ) : (
        <div className="relative w-full">
          <input
            id={id}
            disabled={disabled}
            {...register(id, {
              required,
              minLength: minLength || undefined,
              maxLength: maxLength || undefined,
            })}
            placeholder=" "
            type={type}
            defaultValue={defaultValue}
            onChange={onChangeFn}
            className={className + ` 
              peer
              w-full
              p-4
              pt-6
              font-light
              font-sans
              bg-white
              border-2
              rounded-md
              outline-none
              transition
              disabled:opacity-70
              disabled:cursor-not-allowed
              ${formatPrice ? 'pl-9' : 'pl-4'}
              ${error ? 'border-rose-500' : 'border-neutral-300'}
              ${error ? 'focus:border-rose-500' : 'focus:border-black'}
            `}
          />
          <label
            htmlFor={id}
            className={`
              absolute
              text-md 
              font-sans
              duration-150
              transform
              -translate-y-2
              top-5
              left-4
              peer-placeholder-shown:scale-100
              peer-placeholder-shown-translate-y-0
              peer-focus:scale-75
              peer-focus:-translate-y-2
              ${error ? 'text-rose-500' : 'text-zinc-400'}
            `}
          >
            {label}
          </label>
        </div>
      )}

      {error && (
         <span className="text-rose-500 text-sm mt-2">
         {getCustomErrorText(id, error)}
       </span>
      )}
    </div>
  );
};

export default Input;

function getCustomErrorText(id: string, error: any): string {
  const minLength = 3; // Minimum length requirement for name fields
  const maxLength = 20; // Maximum length requirement for name fields
  const minLengthPass = 8; // Minimum length requirement for the password field
  

  switch (id) {
    case "email":
      return error.message || "Bitte geben Sie eine gültige E-Mail-Adresse ein";
      case "password":
        if (error.type === "minLength" || error.type === "maxLength") {
          return `Das Passwort muss zwischen ${minLengthPass} und ${maxLength} Zeichen lang sein`;
        } else if (error.type === "validate") return "Das Passwort muss mindestens 1 Großbuchstaben, Zahl und Sonderzeichen enthalten";
        return error.message || "Bitte geben Sie ein gültiges Passwort ein";
    case "name.first":
      return error.message || (error.type === "minLength" ? `Der Vorname muss mindestens ${minLength} Zeichen lang sein` : (error.type === "maxLength" ? `Der Vorname darf maximal ${maxLength} Zeichen lang sein` : "Bitte geben Sie einen gültigen Vornamen ein"));
    case "name.last":
      return error.message || (error.type === "minLength" ? `Der Nachname muss mindestens ${minLength} Zeichen lang sein` : (error.type === "maxLength" ? `Der Nachname darf maximal ${maxLength} Zeichen lang sein` : "Bitte geben Sie einen gültigen Nachnamen ein"));
    case "address.city":
      return error.message || (error.type === "minLength" ? "Der Stadtnamen muss mindestens 3 Zeichen lang sein" : "Bitte geben Sie einen gültigen Stadtnamen ein");
    case "address.postalCode":
      return error.message || "Bitte geben Sie eine gültige Postleitzahl ein";
    case "birthDate":
      return error.message || "Bitte geben Sie ein gültiges Geburtsdatum ein";
    case "gender":
      return error.message || "Bitte wählen Sie ein Geschlecht aus";
    case "title":
      return error.message || (error.type === "minLength" ? `Der Titel muss mindestens ${minLength} Zeichen lang sein` : (error.type === "maxLength" ? `Der Titel darf maximal ${maxLength} Zeichen lang sein` : "Bitte geben Sie einen gültigen Titel ein"));
    case "content":
      return error.message || (error.type === "minLength" ? `Der Inhalt muss mindestens ${minLength} Zeichen lang sein` : (error.type === "maxLength" ? `Der Inhalt darf maximal ${maxLength} Zeichen lang sein` : "Bitte geben Sie einen gültigen Inhalt ein"));
    default:
      return "Dieses Feld ist erforderlich";
  }
}

