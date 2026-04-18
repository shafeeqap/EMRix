import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPatientDetailsQuery } from "../patientsApiSlice";
import { Button, Loader } from "../../../components/ui";
import ErrorMessage from "../../../components/ErrorMessage";
import { getFullName } from "../../../utils/userHelpers";
import { closeModal } from "../../../components/modal/modalSlice";

const DetailsPatientModal = () => {
  const { patientId } = useSelector((state) => state.modal.modalProps || {});

  const {
    data: patientData,
    isLoading,
    error,
  } = useGetPatientDetailsQuery(patientId);

  const dispatch = useDispatch();

  const patient = patientData?.patient || [];
  const appointment = patientData?.appointments || [];

  console.log(appointment);
  console.log(patientData, "patientData...");

  if (isLoading) {
    <Loader />;
  }

  if (error) {
    <ErrorMessage />;
  }

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
        <fieldset className="mb-4 border border-gray-300 rounded p-4">
          <legend className="px-2 text-sm">Patient Info</legend>
          <p className="font-semibold">Name: {patient.name}</p>
          <div className="text-[#383838]">
            <p>Age: {patient.age}</p>
            <p>Mobile: {patient.mobile}</p>
            <p>ID No: {patient.patientId}</p>
          </div>
        </fieldset>

        {appointment.length === 0 ? (
          <div className="mb-5 flex justify-center items-center py-5 px-5 border rounded">
            <p className="capitalize">Appointment not found</p>
          </div>
        ) : (
          <fieldset className="mb-4 border border-gray-300 rounded p-4">
            <legend className="px-2 text-sm">Appointments</legend>
            {appointment.map((appt) => {
              const fullName = getFullName(appt.doctorId);

              return (
                <>
                  <p className="font-semibold">Doctor Name: {fullName}</p>
                  <div className="text-[#383838]">
                    <p>Department: Cardiology</p>
                    <p>Date: {appt.date}</p>
                    <p>Time: {appt.slotTime}</p>
                    <p>Slot: 13</p>
                    <p className="capitalize">Visit Type: {appt.notes}</p>
                  </div>
                </>
              );
            })}
          </fieldset>
        )}

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
            {isLoading ? <Loader size="small" /> : "OK"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default DetailsPatientModal;
