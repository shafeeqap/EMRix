import React from "react";
import { AppointmentForm, PatientInfo, SlotGrid } from "./components";

const Scheduler = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AppointmentForm />

        <PatientInfo />

        {/* Available Slots */}
        <SlotGrid />
      </div>
    </>
  );
};

export default Scheduler;
