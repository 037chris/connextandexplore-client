import React, { useEffect, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister, get } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { ValidationError } from "../../../backend/validation";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  pattern?: RegExp;
  onChange?: (file: File | null) => void; // Add a callback for file input change
  onChangeFn?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string; //set a default value for changing userSettings e.g. only the last name changes and the user does not want to set all values again.
  //setErrors: (param:string, message:string) => void
  //bError:ValidationError[];
  customInputClassNames?:string; //verwende diese classnames um das input feld zu stylen, error handling styling ist bereits gesetzt.
  customLabelClassNames?:string;
}

const Input: React.FC<InputProps> = ({
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
  customInputClassNames,
  customLabelClassNames
  //setErrors
  //bError
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
        return true; // No error for other fields
      }

      const acceptedValues = ["male", "female", "other"];
      return acceptedValues.includes(value.toLowerCase());
    };

    register(id, {
      validate: id === "birthDate" ? validateAge : validateGender,
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
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}

{isFileInput ? (
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
              />
            </svg>
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor={id}
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id={id}
                 
                  type="file"
                  className="sr-only"
                  {...register(id, { required })}
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">{uploadedFileName ? uploadedFileName : "or drag and drop"}</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 10MB</p>
          </div>
        </div>
      ) : (
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required, pattern })}
          placeholder=" "
          type={type}
          defaultValue={defaultValue}
          onChange={onChangeFn}
          //className={
            // peer
            // w-full
            // p-4
            // pt-6
            // font-light
            // font-sans
            // bg-white
            // border-2
            // rounded-md
            // outline-none
            // transition
            // disabled:opacity-70
            // disabled:cursor-not-allowed
           // `}
          className={
            customInputClassNames?customInputClassNames+`${formatPrice ? 'pl-9' : 'pl-4'}
            ${error ? 'border-rose-500' : 'border-neutral-300'}
            ${error ? 'focus:border-rose-500' : 'focus:border-black'}`:
            `
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
      )}

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
          z-0
          origin-[0]
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown-translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-2
          ${error ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>

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
    switch (id) {
      case "email":
        return error.message || "Please enter a valid email address";
      case "password":
        return error.message || "Please enter a valid password";
      case "name.first":
        return error.message || "Please enter a valid first name";
      case "name.last":
        return error.message || "Please enter a valid last name";
      case "address.street":
        return "Please enter a valid street name";
      case "address.houseNumber":
        return error.message || "Please enter a valid street number";
      case "address.city":
        return error.message || "Please enter a valid city name.";
      case "address.country":
        return error.message || "Please enter a valid country name.";
      case "address.postalCode":
        return error.message || "Please enter a valid ZIP.";
      case "birthDate":
        return error.message || "You must be 18 years or older to register.";
      case "gender":
        return error.message || "Accepted values are 'Male', 'Female', or 'Other'.";
      
      // more cases for other input fields are needed
      default:
        return "This field is required";
    }
  }