import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAppointmentByIdQuery } from "../appointmentApiSlice";
import { getFullName } from "../../../utils/userHelpers";
import { closeModal } from "../../../components/modal/modalSlice";
import { Loader } from "../../../components/ui";
import ErrorMessage from "../../../components/ErrorMessage";

const AppointmentDetailsModal = () => {
  const { appointmentId } = useSelector(
    (state) => state.modal.modalProps || {}
  );

  // console.log(appointmentId, "Appointment ID in Details Modal...");

  const dispatch = useDispatch();

  const {
    data: appointments,
    isLoading,
    error,
  } = useGetAppointmentByIdQuery({
    id: appointmentId,
  });

  // console.log(appointments, "Appointment Details Data...");

  const appointment = appointments?.appointments;
  const patient = appointments?.appointments?.patient;
  const doctor = appointments?.appointments?.doctor;

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) return <ErrorMessage />;

  return (
    <div className="w-64 sm:w-96 md:w-[700px]">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Appointment Details</h2>
          {/* <button onClick={"onClose"} className="text-gray-500">
            ✕
          </button> */}
        </div>

        {/* Patient Info */}
        <fieldset className="mb-4 border border-gray-300 rounded p-4">
          <legend className="px-2 text-sm text-gray-500 mb-2">
            Patient Info
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <p>
              <strong>Name:</strong> {patient?.name}
            </p>
            <p>
              <strong>UHID:</strong> {patient?.patientId}
            </p>
            <p>
              <strong>Age:</strong> {patient?.age}
            </p>
            <p>
              <strong>Mobile:</strong> {patient?.mobile}
            </p>
          </div>
        </fieldset>

        {/* Appointment Info */}
        <fieldset className="mb-4 border border-gray-300 rounded p-4">
          <legend className="px-2 text-sm text-gray-500 mb-2">
            Appointment Info
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <p>
              <strong>Date:</strong> {appointment?.date.split("T")[0]}
            </p>
            <p>
              <strong>Slot:</strong> {appointment?.slotTime}
            </p>
            <p>
              <strong>Token:</strong> {appointment?.tokenNumber}
            </p>
          </div>
        </fieldset>

        {/* Doctor Info */}
        <fieldset className="mb-4 border border-gray-300 rounded p-4">
          <legend className="px-2 text-sm text-gray-500 mb-2">
            Doctor Info
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <p>
              <strong>Doctor:</strong> {getFullName(doctor)}
            </p>
            <p>
              <strong>Department:</strong> {doctor?.department}
            </p>
          </div>
        </fieldset>

        {/* Notes */}
        <fieldset className="mb-4 border border-gray-300 rounded p-4">
          <legend className="px-2 text-sm text-gray-500">Notes</legend>
          <p className="text-sm bg-gray-50 p-3 rounded-lg capitalize">
            {appointment?.notes || "No notes available"}
          </p>
        </fieldset>

        {/* Status */}
        <fieldset className="mb-4 border border-gray-300 rounded p-4">
          <legend className="px-2 text-sm text-gray-500 ">Status</legend>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Status</span>
            <span
              className={`px-3 py-1 rounded text-xs font-medium uppercase
    ${
      appointment?.status === "booked"
        ? "bg-green-100 text-green-600"
        : appointment?.status === "arrived"
        ? "bg-blue-100 text-blue-600"
        : "bg-red-100 text-red-600"
    }`}
            >
              {appointment?.status}
            </span>
          </div>
        </fieldset>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t pt-3">
          <button
            onClick={() => dispatch(closeModal())}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Close
          </button>
          {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Edit
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;
