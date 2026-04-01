import React from "react";
import clsx from "clsx";

const IconButton = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex justify-center items-center rounded-md border w-12 h-12",
        "cursor-pointer hover:bg-slate-100 duration-300"
      )}
    >
      {children}
    </div>
  );
};

export default IconButton;
