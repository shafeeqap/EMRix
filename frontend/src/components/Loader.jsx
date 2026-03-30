import React from "react";
import clsx from "clsx";

const Loader = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "w-5 h-5",
    medium: "w-10 h-10",
  };

  return (
    <div
      className={`flex justify-center items-center ${
        size === "small" ? "py-1" : "py-8"
      }`}
    >
      <div
        className={clsx(
          sizeClasses[size],
          "border-4 border-[#3B7A99] border-t-transparent rounded-full animate-spin"
        )}
      ></div>
    </div>
  );
};

export default Loader;
