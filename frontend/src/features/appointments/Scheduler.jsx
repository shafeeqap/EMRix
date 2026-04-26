import React, { useEffect, useState } from "react";
import { AppointmentForm, PatientInfo, SlotGrid } from "./components";
import { handleApiError } from "../../utils/handleApiError";
import { useCreateAppointmentMutation } from "./appointmentApiSlice";

const Scheduler = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedPatientId, setselectedPatientId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [notes, setNotes] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  // console.log(selectedDoctorId?._id, "SELECTED DOCTOR ID");
  // console.log(selectedPatientId?._id, "SELECTED PATIENT ID");
  // console.log(selectedDate, "SELECTED DATE");
  // console.log(notes, "NOTES");
  console.log(selectedSlot, "SELECTED SLOT");

  const onSubmit = async() =>{
    const payload ={
      doctorId: selectedDoctorId?._id,
      patientId: selectedPatientId?._id,
      date: selectedDate,
      slotTime: selectedSlot,
      notes,
    }
    try {
      const res = await createAppointment(payload).unwrap();
      console.log(res, "APPOINTMENT CREATED");

    } catch (error) {
      // handleApiError(error);
      console.log(error, "ERROR CREATING APPOINTMENT");
      
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Appointment Form */}
        <AppointmentForm
          setSlots={setSlots}
          selectedDoctorId={selectedDoctorId}
          setSelectedDoctorId={setSelectedDoctorId}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        {/* Patient Information */}
        <PatientInfo
          setselectedPatientId={setselectedPatientId}
          notes={notes}
          setNotes={setNotes}
          onSubmit={onSubmit}
        />

        {/* Available Slots */}
        <SlotGrid
          availableSlots={slots?.availableSlots || []}
          bookedSlots={slots?.bookedSlots || []}
          isLoading={!slots}
          setSelectedSlot={setSelectedSlot}
          selectedSlot={selectedSlot}
        />
      </div>
    </>
  );
};

export default Scheduler;
