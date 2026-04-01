import React from "react";
import { Stethoscope } from "lucide-react";

const ProfileCard = ({ fullName }) => {
  return (
    <div className="min-w-md min-h-28 flex justify-between items-center shadow px-4 py-2 border">
      <div className="flex flex-col px-2">
        <h2 className="text-lg font-bold">Hello, {fullName}</h2>
        <p className="text-sm sm:text-lg text-textPrimary">
          Welcome to your dashboard
        </p>
      </div>
      {/* Icon */}
      <div>
        <Stethoscope size={50} className="text-icon" />
      </div>
    </div>
  );
};

export default ProfileCard;
