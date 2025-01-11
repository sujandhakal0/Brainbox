import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "outline"; 
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick: () => void;
}

const variantClasses = { 
  primary: "bg-blue-500 text-white border-blue-500 hover:bg-blue-600",
  secondary: "bg-gray-500 text-white border-gray-500 hover:bg-gray-600",
  outline: "bg-transparent text-blue-500 border-blue-500 hover:bg-blue-100",
};

const sizeClasses = {
  sm: "h-8 text-sm",
  md: "h-10 text-base",
  lg: "h-12 text-lg",
};

const Button = (props: ButtonProps) => {
  const buttonClasses = `
    ${variantClasses[props.variant]} 
    ${sizeClasses[props.size]} 
    flex items-center justify-center 
    py-2 px-4 
    border 
    rounded 
    focus:outline-none 
    transition duration-300
  `;
  return (
    <button className={buttonClasses} onClick={props.onClick}>
      {props.startIcon && <span className="mr-2">{props.startIcon}</span>}
      {props.text}
      {props.endIcon && <span className="ml-2">{props.endIcon}</span>}
    </button>
  );
};

export default Button;