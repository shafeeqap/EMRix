import React from "react";
import { Button, Loader } from "../../../components/ui";
import { formatTime } from "../../../utils/formatHours";
import StatusColors from "./StatusColors";


const SlotGrid = ({ availableSlots = [], bookedSlots = [], isLoading }) => {
  const allSlots = [...availableSlots, ...bookedSlots].sort((a, b) =>
    a.localeCompare(b)
  );

  if (isLoading) {
    return (
      <p className="text-center py-5">
        <Loader />
      </p>
    );
  }

  return (
    <>
      {allSlots?.length > 0 ? (
        <div className="flex flex-col">
          <h2 className="font-semibold text-lg mb-3 uppercase">
            Available Time Slots
          </h2>

          {/* Status Colors */}
          <StatusColors />

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4 py-5 px-5 bg-white border border-gray-300 rounded h-52 overflow-y-auto">
            {allSlots?.map((slot) => {
              const isBooked = bookedSlots.includes(slot);

              return (
                <Button
                  key={slot}
                  disabled={isBooked}
                  variant={isBooked ? "slotBooked" : "slotAvailable"}
                  className="text-xs"
                >
                  {formatTime(slot)}
                </Button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="py-5">
          <p className="text-gray-500 col-span-full text-center">
            Please select department, doctor and date to view available slots
          </p>
        </div>
      )}
    </>
  );
};

export default SlotGrid;
