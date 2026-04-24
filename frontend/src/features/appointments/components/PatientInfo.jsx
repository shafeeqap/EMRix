import React from "react";
import { Button, InputField } from "../../../components/ui";

const PatientInfo = () => {
  return (
    <div className="bg-white border border-gray-300 px-5 py-5 rounded w-full">
      <h1 className="font-semibold text-lg uppercase">Patient Information</h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-between py-5">
        <Button>New Patient</Button>
        <Button variant="secondary">Existing Patient</Button>
      </div>

      <InputField placeholder="Type patient name" />

      <Button variant="danger" className="uppercase w-full mt-5">
        Book Appointment
      </Button>
    </div>
  );
};

export default PatientInfo;
