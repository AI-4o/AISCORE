"use client";
/**
 * InputSelect Component
 * 
 * A custom dropdown select component with enhanced styling and functionality.
 * Provides a dropdown menu of options with support for custom rendering.
 * 
 * Features:
 * - Custom styled dropdown with support for both text and element options
 * - Click-outside detection to close the dropdown
 * - Optional increment/decrement buttons for navigating options
 * - Controlled or uncontrolled usage
 * - Maintains selected option state
 * - Supports keyboard navigation
 */
import { useState, useRef, useEffect } from "react";
import { InputInterface } from "./input-interface";
import "./inputs-style.css";

export type Option = { value: string; name?: string; element?: React.ReactNode };

export default function InputSelect({
    label,
    options,
    name,
    state,
    value,
    onChange,
    hasIncrementBtns: hasIncrementBtn = false,
}: InputInterface & {
    options: Option[];
    hasIncrementBtns?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(false);

    // the selected option
    const [selectedOpt, setSelectedOpt] = useState(
        options.find((opt) => opt.value === value) ?? null
    );

    const dropdownRef = useRef<HTMLDivElement>(null);

    // close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // handle the selection of an option
    const handleSelect = (o: Option) => {
        setSelectedOpt(o);
        setIsOpen(false);
        const fakeEvent = {
            target: o,
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange?.(fakeEvent);
    };


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

            <div className="relative" ref={dropdownRef}>
                <div className="select flex items-center h-input-height peer block w-40 bg-dark cursor-pointer rounded-md border border-gray-200 py-2 px-3 text-sm">
                    {hasIncrementBtn && (
                        <div className="flex items-center justify-center shadow-gold-bottom">
                            <button
                                className="flex items-center justify-center w-6 h-6 rounded-full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex = options.findIndex(
                                        (opt) => opt.name === selectedOpt?.name,
                                    );
                                    if (currentIndex > 0) {
                                        handleSelect(options[currentIndex - 1]);
                                    }
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                        </div>
                    )}

                    <div
                        className="flex-1 text-center"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {selectedOpt ? (
                            (selectedOpt.element ??
                                selectedOpt.name ??
                                selectedOpt.value)
                        ) : (
                            <span className="text-gray-500">Seleziona...</span>
                        )}
                    </div>

                    {hasIncrementBtn && (
                        <div className="flex items-center justify-center shadow-gold-bottom">
                            <button
                                className="flex items-center justify-center w-6 h-6 rounded-full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex = options.findIndex(
                                        (opt) => opt.name === selectedOpt?.name,
                                    );
                                    if (currentIndex < options.length - 1) {
                                        handleSelect(options[currentIndex + 1]);
                                    }
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 border px-2 border-gray-200 bg-dark rounded-md shadow-lg">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className={
                                    "px-3 flex justify-center py-2 my-1 cursor-pointer hover:bg-gold" +
                                    (option.value === selectedOpt?.value ? " bg-gold" : "")
                                }
                                onClick={() => handleSelect(option)}
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
