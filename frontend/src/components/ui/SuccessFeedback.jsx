import React from "react";

const SuccessFeedback = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
        <svg
          className="w-8 h-8 text-green-600 animate-draw"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default SuccessFeedback;
