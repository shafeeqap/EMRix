import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAppointmentByIdQuery,
  useGetAvailableSlotsQuery,
} from "../appointmentApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { editAppointmentSchema } from "../../../validator/editAppointmentValidator";
import { useForm } from "react-hook-form";
import { Button, InputField } from "../../../components/ui";
import { closeModal } from "../../../components/modal/modalSlice";
import { getFullName } from "../../../utils/userHelpers";
import { useGetDoctorsQuery } from "../../dashboard/doctors/doctorsApiSlice";

const EditAppointmentModal = () => {
  const { appointmentId } = useSelector(
    (state) => state.modal.modalProps || {}
  );

  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(editAppointmentSchema),
    defaultValues: {
      patient: "",
      doctorId: "",
      slotTime: "",
      date: "",
      notes: "",
    },
  });

  const [doctorId, date] = form.watch(["doctorId", "date"]);
  // const date = form.watch("date");

  const { data: slotData, isLoading: slotsLoading } = useGetAvailableSlotsQuery(
    { doctorId, date },
    { skip: !doctorId || !date }
  );

  console.log(slotData, "Available Slots in Edit Modal...");

  const {
    data: appointments,
    isLoading,
    error,
  } = useGetAppointmentByIdQuery({
    id: appointmentId,
  });

  const appointment = appointments?.appointments;
  console.log(appointments, "Appointments in Edit Modal...");

  const { data } = useGetDoctorsQuery({ page: 1, limit: 100 });
  const doctors = data?.doctors || [];
  // console.log(doctors, "Doctors in Edit Modal...");

  useEffect(() => {
    form.setValue("slotTime", "");
  }, [doctorId, date, form]);

  useEffect(() => {
    if (!appointment) return;

    const doctor = appointment.doctor;

    form.reset({
      patient: appointment.patient?.name || "",
      doctorId: doctor?._id,
      slotTime: appointment.slotTime,
      date: appointment?.date
        ? new Date(appointment?.date).toISOString().split("T")[0]
        : "",
      notes: appointment.notes,
    });
  }, [appointment, form]);

  const onSubmit = (values) => {
    console.log(values, "Updated Values");
  };

  /* {isLoading && <p>Loading...</p>}

  {error && <p>Error loading appointment data.</p>} */

  return (
    <div className="bg-white rounded-lg p-6 sm:w-96 md:w-[700px]">
      <h2 className="text-xl font-semibold mb-4">Edit Appointment</h2>

      {appointments && (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4">
            <InputField
              label="Patient Name"
              type="text"
              {...form.register("patient")}
              className="focus:ring focus:border-primary"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Doctor Name</label>
            <select
              {...form.register("doctorId")}
              className="border border-gray-300 px-3 py-2 rounded bg-white w-full focus:ring focus:border-primary"
            >
              {/* <option value="">Select Doctor</option> */}
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {getFullName(doc)} - {doc.department}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <InputField
              label="Slot Time"
              type="text"
              {...form.register("slotTime")}
              className="focus:ring focus:border-primary"
              error={form.formState.errors.slotTime}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="block text-gray-700 mb-2">Notes</label>
            <textarea
              {...form.register("notes")}
              error={form.formState.errors.notes}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-primary"
            />
          </div>

          <div className="mb-4">
            <InputField
              label="Date"
              type="date"
              {...form.register("date")}
              error={form.formState.errors.date}
              className="focus:ring focus:border-primary"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Slot</label>
            <div className="grid grid-cols-3 gap-2">
              {slotData?.availableSlots?.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => form.setValue("slotTime", slot)}
                  className={`px-3 py-2 border rounded ${
                    form.watch("slotTime") === slot
                      ? "bg-primary text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            {form.formState.errors.slotTime && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.slotTime.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => dispatch(closeModal())}
              type="button"
              variant="secondary"
              className="mr-2 px-4 py-2 transition duration-200"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isLoading ? "Updating..." : "Update Appointment"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditAppointmentModal;
