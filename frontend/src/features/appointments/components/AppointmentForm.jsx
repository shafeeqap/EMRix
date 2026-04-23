import React from "react";
import { InputField } from "../../../components/ui";

const AppointmentForm = () => {
  return (
    <div className="bg-white px-5 py-5 rounded w-full">
      <h1 className="font-bold text-xl">Select Doctor & Time</h1>

      <div className="flex flex-col sm:flex-row justify-between py-5">
        <InputField label="Department" placeholder="Enter department" />
        <InputField label="Doctor" placeholder="Enter doctor name" />
      </div>
      <InputField label="Appointment Date" type="date" />
    </div>
  );
};

export default AppointmentForm;
