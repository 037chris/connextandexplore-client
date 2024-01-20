"use client";

import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e:  React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    primary?: boolean;
    outline?: boolean;
    secondary?: boolean;
    small?: boolean;
    icon?: IconType;
    del?: boolean;
    className?: string;
}
const Button: React.FC<ButtonProps> = ({
    className,
    label,
    onClick,
    disabled,
    primary,
    outline,
    secondary,
    small,
    icon: Icon,
    del
}) => {
  return (
    <button 
      
      onClick={onClick}
      disabled={disabled}
      className={className + `
        // relative
        // disabled:opacity-70
        // disabled:cursor-not-allowed
        // rounded-lg
        // hover:opacity-80
        // transition
        // w-full
        // font-sans
        ${outline && 'bg-white' }
        ${outline && 'border-blue-500' }
        ${outline && 'text-blue-500'}

        ${primary && 'bg-blue-500'}
        ${primary &&'border-blue-500'}
        ${primary && 'text-white'}

        ${secondary && 'bg-red-400'}
        ${secondary && 'border-red-400'}
        ${secondary &&'text-white'}
        
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
    `}>
        {Icon && (
            <Icon size={24} className="absolute left-4 top-3" />
        )}
        {label}
    </button>
  )
}

export default Button