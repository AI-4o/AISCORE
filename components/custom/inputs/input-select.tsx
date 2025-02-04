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
    onChange
}: InputInterface & { options: { value: string, name?: string, element?: React.ReactNode}[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value ?? '');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Chiudi il dropdown quando si clicca fuori
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
        // Simula l'evento change per mantenere la compatibilità
        const fakeEvent = {
            target: { value, name },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange?.(fakeEvent);
    };

    const selectedOption = options.find(opt => opt.value === selectedValue);

    return (
        <div className="select flex items-center justify-center">
            <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor={name}
            >
                {label}
            </label>
            <div className="relative" ref={dropdownRef}>
                 {/* trigger */}
                <div
                    className="select h-input-height peer block w-full bg-dark cursor-pointer rounded-md border border-gray-200 py-2 px-3 text-sm"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedOption ? (
                        selectedOption.element ?? selectedOption.name ?? selectedOption.value
                    ) : (
                        <span className="text-gray-500">Seleziona...</span>
                    )}
                </div>
                 {/* options */}
                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 border px-2 border-gray-200 bg-dark rounded-md shadow-lg">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="px-3 py-2 my-1 cursor-pointer hover:bg-gold"
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.element ?? option.name ?? option.value}
                            </div>
                        ))}
                    </div>
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