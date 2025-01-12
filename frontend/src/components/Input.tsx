import React, { forwardRef } from 'react';

interface InputBoxProps {
    label?: string;
    type: string;
    placeholder: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputBoxProps>(({ label, type, placeholder, value, onChange }: InputBoxProps, ref) => {
    return (
        <div className="">
            {label && (
                <label className="text-gray-700 font-semibold mb-2 block">
                    {label}
                </label>
            )}
            <input
                ref={ref} 
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="input-field p-2 border-2 border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
            />
        </div>
    );
});

export default Input;