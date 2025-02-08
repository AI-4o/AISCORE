'use client'
import { useState, useRef, useEffect } from "react";
import { InputInterface } from "./input-interface";
import './inputs-style.css';

export default function InputSelect({
    label,
    options,
    name,
    state,
    value,
    onChange,
    hasIncrementBtns: hasIncrementBtn = false
}: InputInterface & { options: { value: string, name?: string, element?: React.ReactNode }[], hasIncrementBtns?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value ?? '');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        setIsOpen(false);
        const fakeEvent = {
            target: options.find(opt => opt.value === value),
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange?.(fakeEvent);
    };

    const selectedOption = options.find(opt => opt.value === selectedValue);

    return (
        <div className="select flex items-center justify-center">
            {label && (
                <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor={name}
                >
                    {label}
                </label>
            )}
            
            <div className="flex items-center gap-2" ref={dropdownRef}>
                {hasIncrementBtn && (
                    <button 
                        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gold transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            const currentIndex = options.findIndex(opt => opt.value === selectedValue);
                            if (currentIndex > 0) {
                                handleSelect(options[currentIndex - 1].value);
                            }
                        }}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6"/>
                        </svg>
                    </button>
                )}

                <div className="relative">
                    <div
                        className="select flex justify-center h-input-height peer block w-36 bg-dark cursor-pointer rounded-md border border-gray-200 py-2 px-3 text-sm"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {selectedOption ? (
                            selectedOption.element ?? selectedOption.name ?? selectedOption.value
                        ) : (
                            <span className="text-gray-500">Seleziona...</span>
                        )}
                    </div>

                    {isOpen && (
                        <div className="absolute z-10 w-full mt-1 border px-2 border-gray-200 bg-dark rounded-md shadow-lg">
                            {options.map((option, index) => (
                                <div
                                    key={index}
                                    className={"px-3 flex justify-center py-2 my-1 cursor-pointer hover:bg-gold" + (option.value === selectedOption?.value ? ' bg-gold' : '')}
                                    onClick={() => handleSelect(option.value)}
                                >
                                    {option.element ?? option.name ?? option.value}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {hasIncrementBtn && (
                    <button
                        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gold transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            const currentIndex = options.findIndex(opt => opt.value === selectedValue);
                            if (currentIndex < options.length - 1) {
                                handleSelect(options[currentIndex + 1].value);
                            }
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24" 
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m9 18 6-6-6-6"/>
                        </svg>
                    </button>
                )}
            </div>

            {name && (
                <div id={`${name}-error`} aria-live="polite" aria-atomic="true">
                    {state?.errors?.[name] &&
                        state?.errors[name].map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                </div>
            )}
        </div>
    );
}