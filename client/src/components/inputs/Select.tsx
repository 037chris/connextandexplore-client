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
  formatPrice?: boolean;
  options: string[];
  register: any; // Adjust the type based on your needs
  errors: any; // Adjust the type based on your needs
  required: boolean;
  disabled: boolean;
  onChange?: (selectedOptions: string | string[]) => void; // Correct the type

}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  formatPrice,
  options,
  register,
  errors,
  required,
  disabled,
  onChange
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return (
    <div className={`w-full relative ${formatPrice ? 'col-span-full' : ''}`}>
      <label
        htmlFor={id}
        className={`
          absolute
          text-md 
          font-sans
          duration-150
          transform
          -translate-y-3
          top-5
          z-0
          origin-[0]
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown-translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>

      <select
        id={id}
        disabled={disabled}
        defaultValue=" "
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
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      >
        <option value="" disabled selected>
          Select Gender
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
};

export default Select;
