// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import FormWrapper from './FormWrapper';
import { FaCaretDown } from 'react-icons/fa6';
import { MdOutlineClose } from 'react-icons/md';
export type SelectOption = {
  id?: undefined;
  name: string;
  description?: undefined;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false
  value?: SelectOption
  onChange: (value: SelectOption | undefined) => void
}

type EventCategoryFormProps = {
  options: SelectOption[];
  errors?: Record<string, string>; // Add errors prop
} & (SingleSelectProps | MultipleSelectProps)

export default function EventSelectCategoryForm({
  multiple,
  options,
  value,
  onChange,
  errors,
}: EventCategoryFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function onClearOptions() {
    multiple ? onChange([] as SelectOption[]) : onChange(undefined);
  }

  function onSelectOption(option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o: SelectOption) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      onChange(option);
    }
  }

  function onIsOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  const isCategorySelected = multiple ? value.length > 0 : !!value;

  return (
    <FormWrapper title="Wähle Kategorie deiner Veranstaltung">
      <div
        tabIndex={0}
        className={`relative tabber min-h-1.5 border border-solid ${errors?.value || !isCategorySelected ? 'border-red-500' : 'border-gray-700'} flex items-center p-2 rounded-md outline-none`}
        onClick={() => setIsOpen((prev) => !prev)}
        onBlur={() => setIsOpen(false)}
        ref={containerRef}
      >
        <span className="flex-grow flex gap-2 flex-wrap">
          {
            multiple
              ? value.map((v: SelectOption) => (
                <button
                  key={v.value}
                  className="flex items-center border border-gray-700 rounded px-2 py-1 cursor-pointer bg-transparent outline-none"
                  onClick={() => onSelectOption(v)}
                >
                  {v.name}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(value.filter((o: SelectOption) => o !== v));
                    }}
                  >
                    &times;
                  </span>
                </button>
              ))
              : value?.name
          }
        </span>
        <MdOutlineClose
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onClearOptions();
          }}
        />
        <div className="bg-gray-700 self-stretch w-0.5"></div>
        <div className="transform -translate-y-1/4 border-solid border-transparent border-t-2 border-gray-700 cursor-pointer">
          <FaCaretDown />
        </div>
        <ul
          className={`
            absolute 
            m-0 
            p-0 
            list-none 
            max-h-40 
            overflow-y-auto 
            border
            ${errors?.value ? 'border-red-500' : 'border-gray-700'} 

            border-gray-700 
            rounded-md 
            w-full l
            eft-0 
            top-full 
            mt-1 
            bg-white 
            z-10 
            ${isOpen ? '' : 'hidden'}
          `}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              onClick={(e) => {
                e.stopPropagation();
                onSelectOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`
                    py-1 
                    px-2 
                    cursor-pointer 
                    ${onIsOptionSelected(option) ? ' selectedTabber' : ''}
                    ${index === highlightedIndex ? ' highlightTabber  ' : ''
                }
                  `}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </div>
      {/* {!isCategorySelected && <p className="error text-red-500"></p>} */}
      {errors?.value && <p className="error text-red-500">{errors.value}</p>}
    </FormWrapper>
  );
}
