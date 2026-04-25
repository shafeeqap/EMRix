import React, { useState } from "react";
import { AppointmentForm, PatientInfo, SlotGrid } from "./components";

const Scheduler = () => {
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AppointmentForm setSlots={setSlots} />

        <PatientInfo />

        {/* Available Slots */}
        <SlotGrid
          availableSlots={slots?.availableSlots || []}
          bookedSlots={slots?.bookedSlots || []}
          isLoading={!slots}
        />
      </div>
    </>
  );
};

export default Scheduler;
