import React from "react";
import { Square } from "lucide-react";

const StatusColors = () => {
  return (
    <div className="flex justify-end items-center gap-2 mb-4 text-sm">
      <p>Available</p>
      <Square strokeWidth={1} size={14} className="text-primary bg-primary" />
      <p>Booked</p>
      <Square strokeWidth={1} size={14} className="text-gray-300 bg-gray-300" />
      <p>Selected</p>
      <Square
        strokeWidth={1}
        size={14}
        className="text-green-600 bg-green-600"
      />
    </div>
  );
};

export default StatusColors;
