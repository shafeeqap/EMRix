import React from "react";

const InputField = ({ label, type = "text", error, ...props }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input {...props} type={type} />
      {error?.message && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default InputField;
