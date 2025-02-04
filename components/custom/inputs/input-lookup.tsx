'use client';

import React, { useState, ChangeEvent, MouseEvent } from 'react';

type InputLookupProps = {
  label?: string;
  name?: string;
  options: string[];
  defaultValue?: string;
  onChange?: (e:any) => void;
};

export function InputLookup({ label, defaultValue, name, options, onChange }: InputLookupProps) {
  const [inputValue, setInputValue] = useState(defaultValue ?? "");
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter the options based on current input value
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowDropdown(true);
  };

  const handleOptionClick = (event: MouseEvent<HTMLLIElement>, selected: string) => {
    setInputValue(selected);
    setShowDropdown(false);
    if(onChange) onChange({target: {value: selected}});
  };

  const handleBlur = () => {
    // Delay blur handling so onClick can fire first
    setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  return (
    <div className="mb-3 mt-5 w-36">
      {/* Optional label to match the style in input-text */}
      {label && (
        <label
          className="mb-3 block text-xs font-medium text-gray-900"
          htmlFor={label}
        >
          {label}
        </label>
      )}

      <div className="relative inline-block w-full">
        <input
          id={label}
          name={name}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={handleBlur}
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          placeholder="Search"
        />

        {showDropdown && filteredOptions.length > 0 && (
          <ul
            className="absolute left-0 top-full z-10 mt-1 w-full max-h-40
                       overflow-auto rounded-md border border-gray-200
                       bg-white p-0 shadow-md"
          >
            {filteredOptions.map((option) => (
              <li
                key={option}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => handleOptionClick(e, option)}
                className="cursor-pointer border-b border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
