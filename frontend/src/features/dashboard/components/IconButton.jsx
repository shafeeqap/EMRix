import React from "react";
import clsx from "clsx";

const IconButton = ({ children, onClick, className }) => {
  const baseStyles = `rounded-md border w-12 h-12 ${className}`;
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex justify-center items-center",
        baseStyles,
        "cursor-pointer hover:bg-slate-100 duration-300"
      )}
    >
      {children}
    </div>
  );
};

export default IconButton;
