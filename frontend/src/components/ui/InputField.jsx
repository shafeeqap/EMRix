import React from "react";
import clsx from "clsx";

const InputField = ({
  className,
  label,
  type = "text",
  placeholder,
  error,
  ...props
}) => {
  const baseStyles =
    "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none";

  return (
    <div>
      {label && <label className="block text-gray-700 mb-2">{label}</label>}
      <input
        type={type}
        className={clsx(baseStyles, className)}
        placeholder={placeholder}
        {...props}
      />
      {error?.message && (
        <p className="text-red-500 text-sm">{error?.message}</p>
      )}
    </div>
  );
};

export default InputField;
