import React, { useState } from "react";
import { AppointmentForm, PatientInfo, SlotGrid } from "./components";
import { handleApiError } from "../../utils/handleApiError";
import {
  useCreateAppointmentMutation,
  useGetAvailableSlotsQuery,
} from "./appointmentApiSlice";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentFormSchema } from "../../validator/appointmentFormValidator";
import { Button, Loader } from "../../components/ui";

const Scheduler = () => {
  // const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  // const [selectedPatientId, setSelectedPatientId] = useState(null);
  // const [selectedDate, setSelectedDate] = useState("");
  // const [notes, setNotes] = useState("");
  // const [resetKey, setResetKey] = useState(0);

  const methods = useForm({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      doctor: null,
      date: "",
      patient: null,
      notes: "",
    },
  });

  const { watch, handleSubmit, setError, reset } = methods;

  const [selectedSlot, setSelectedSlot] = useState(null);

  const doctor = watch("doctor");
  const date = watch("date");

  // console.log(doctor, "DOCTOR");
  // console.log(date, "DATE");

  const { data, isLoading, refetch } = useGetAvailableSlotsQuery(
    {
      doctorId: doctor?._id,
      date: date,
    },
    {
      skip: !doctor || !doctor._id || !date,
    }
  );

  // console.log(data, "AVAILABLE SLOTS DATA");

  const [createAppointment] = useCreateAppointmentMutation();

  const onSubmit = async (formData) => {
    console.log(formData, "FORM DATA");

    if (!selectedSlot) {
      setError("slot", {
        type: "manual",
        message: "Please select a time slot",
      });
      return;
    }

    const payload = {
      doctorId: formData.doctor?._id,
      patientId: formData.patient?._id,
      date: formData.date,
      slotTime: selectedSlot,
      notes: formData.notes,
    };

    try {
      const res = await createAppointment(payload).unwrap();
      console.log(res, "APPOINTMENT CREATED");
      toast.success(res.message || "Appointment created successfully");

      // Reset form and state
      reset();
      setSelectedSlot(null);
      refetch();
    } catch (error) {
      handleApiError(error, setError);
      console.log(error, "ERROR CREATING APPOINTMENT");
    }
  };



  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AppointmentForm />
          <PatientInfo />

          {/* Available Slots */}
          {doctor && date && (
            <SlotGrid
              availableSlots={data?.availableSlots || []}
              bookedSlots={data?.bookedSlots || []}
              isLoading={isLoading}
              setSelectedSlot={setSelectedSlot}
              selectedSlot={selectedSlot}
            />
          )}
        </div>

        <Button
          type="submit"
          variant="danger"
          className="uppercase w-full mt-5"
        >
          {isLoading ? <Loader /> : "Book Appointment"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default Scheduler;
