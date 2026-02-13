import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const baseStyles = "px-6 py-3 rounded-full font-bold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-accent text-primary hover:opacity-90 hover:scale-105 shadow-lg shadow-accent/20",
        secondary: "bg-surface text-primary border border-gray-200 hover:border-accent hover:text-accent",
        outline: "border-2 border-white text-white hover:bg-white hover:text-primary hover:scale-105",
        ghost: "text-primary hover:bg-gray-100",
        danger: "bg-red-500 text-white hover:bg-red-600"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
