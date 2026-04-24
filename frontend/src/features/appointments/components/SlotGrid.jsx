import React from "react";
import { Button } from "../../../components/ui";

const SlotGrid = ({ slots }) => {
  return (
    <>
      {slots?.length > 0 ? (
        <div className="flex flex-col">
          <h2 className="font-semibold text-lg mb-3 uppercase">
            Available Time Slots
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4 py-5 px-5 bg-white border border-gray-300 rounded h-52 overflow-y-auto">
            {slots?.map((slot, index) => (
              <Button className="text-xs" key={index}>
                <p className="">01</p>
                {slot}
              </Button>
            ))}
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
