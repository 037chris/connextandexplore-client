// Select.tsx (or Select.js)

import React from 'react';




function getCustomErrorText(id: string, error: any): string {
    switch (id) {

      case "gender":
        return error.message || "Accepted values are 'Male', 'Female', or 'Other'.";
 // more cases for other input fields are needed
 default:
    return "This field is required";
}
}
interface SelectProps {
  label: string;
  id: string;
  options: string[];
  register: any; // Adjust the type based on your needs
  errors: any; // Adjust the type based on your needs
  required: boolean;
  disabled: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  options,
  register,
  errors,
  required,
  disabled,
}) => (
  <div className="w-full relative">
    <select
      id={id}
      disabled={disabled}
      {...register(id, { required })}
      className={`
        peer
        w-full
        p-4
        pt-6
        font-light
        bg-white
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        pl-4
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
      `}
    >
      <option value="" disabled selected>
        {label}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {errors[id] && (
      <span className="text-rose-500 text-sm mt-2">
        {getCustomErrorText(id, errors[id])}
      </span>
    )}
  </div>
);

export default Select;
