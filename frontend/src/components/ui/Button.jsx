import React from "react";
import clsx from "clsx";
import Loader from "./Loader";


const Button = ({
  children,
  varient = "primary",
  size = "md",
  isLoading = false,
  didabled = false,
  type = "button",
  onClick,
  calssName,
  ...props
}) => {
  const baseStyles = `rounded-lg font-medium transition duration-200 focus:outline-none ${calssName}`;

  const variants = {
    primary: "bg-primary text-white hover:bg-primaryHover",
    secondary: "bg-[#6FA3D8] text-black hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <div>
      <button
        type={type}
        className={clsx(
          baseStyles,
          variants[varient],
          sizes[size],
          (didabled || isLoading) && "opacity-50 cursor-not-allowed"
        )}
        disabled={didabled || isLoading}
        onClick={onClick}
        {...props}
      >
        {isLoading ? <Loader size="small" /> : children}
      </button>
    </div>
  );
};

export default Button;
