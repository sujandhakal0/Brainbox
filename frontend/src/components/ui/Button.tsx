import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "outline";
  size: "sm" | "md" | "lg";
  text: string;
  type?: "button" | "submit" | "reset";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (e: React.FormEvent) => void;
}

const variantClasses = {

  primary: "bg-[#FF847C] text-[#374151]border-[#FF847C] hover:bg-[#E5736E]", // Sky Blue with a slightly darker hover effect
  secondary: "bg-[#75CFE3] text-[#374151] border-[#75CFE3] hover:bg-[#5AB5C8]", // Peach Pink with a slightly darker hover effect
  outline: "bg-transparent text-[#75CFE3] border-[#75CFE3] hover:bg-[#E1F5F9]", // Transparent with Sky Blue text and a soft blue hover background
};

const sizeClasses = {
  sm: "h-8 px-3 text-sm",  // Compact for less prominent actions, small cards, or modal footers
  md: "h-10 px-4 text-base", // Default size, suitable for most buttons
  lg: "h-12 px-6 text-lg",   // Larger buttons for primary actions, like "Add Content"
};

const Button = ({ variant, size, text, type, startIcon, endIcon, onClick }: ButtonProps) => {
  const buttonClasses = `
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    flex items-center justify-center 
    py-2 px-4 
    border 
    focus:outline-none 
    transition duration-300 
    shadow-[4px_4px_0px_rgba(0,0,0,0.1)] 
    hover:shadow-[2px_2px_0px_rgba(0,0,0,0.15)] 
    hover:translate-y-[-2px] 
    w-full
  `;
  return (
    <button className={buttonClasses} type={type} onClick={onClick} >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {text}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;