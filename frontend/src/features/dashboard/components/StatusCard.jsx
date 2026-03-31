import React from "react";
import clsx from "clsx";
import { statusCardItems } from "../statusCard.config";

const StatusCard = () => {
  return (
    <div className="min-w-md min-h-28 grid grid-cols-1 sm:grid-cols-3 gap-3 shadow px-4 py-2 border">
      {statusCardItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className={clsx(
              "flex flex-col justify-center items-center px-2 py-2 sm:border-b-0 cursor-pointer",
              index !== statusCardItems.length - 1 && "sm:border-r-2 border-b-2"
            )}
          >
            {/* Icon */}
            <Icon size={30} className="text-icon" />
            <p className="text-gray-600">{item.title}</p>
            <h2 className="text-lg font-bold">{item.total}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default StatusCard;
