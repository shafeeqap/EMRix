import React from "react";
import { Stethoscope } from "lucide-react";
import { useSelector } from "react-redux";
import { getFullName } from "../../../utils/userHelpers";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.auth);

  const fullName = getFullName(user);

  return (
    <div className="min-w-md min-h-28 flex justify-between items-center shadow px-4 py-2 border">
      <div className="flex flex-col px-2 border">
        <h2 className="text-lg font-bold">Hello, {fullName}</h2>
        <p className="text-sm sm:text-lg text-gray-600">
          Welcome to your dashboard
        </p>
      </div>
      {/* Icon */}
      <div>
        <Stethoscope size={50} className="text-[#3B7A99]" />
      </div>
    </div>
  );
};

export default ProfileCard;
