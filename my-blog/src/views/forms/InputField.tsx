import React, { useState } from 'react';
import LoginConnector from '../../connectors/LoginConnector';
import InputSanitizer from '../../utils/InputSanitizer';


interface InputFieldProps {
    id: string;
    type: string;
    value: string;
    placeholder: string;
    onChange: (sanitizedValue: string) => void; // Expect a sanitized value in the onChange handler
    className?: string; // Optional custom className prop

}


export const InputField: React.FC<InputFieldProps> = ({ id, type, value, placeholder, onChange, className }) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = InputSanitizer.sanitizeInput(e.target.value); // Sanitize the input
        onChange(sanitizedValue); // Pass sanitized value to the parent component
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700" htmlFor={id}>
                {placeholder}
            </label>
            <input
                id={id}
                type={type}
                value={value} // Controlled input using value prop
                onChange={handleInputChange} // Use the handleInputChange for sanitization
                className={`${className}`} // Add custom className
                placeholder={placeholder}
            />
        </div>
    );
};
