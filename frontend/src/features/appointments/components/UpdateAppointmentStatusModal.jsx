import { OctagonAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterOption } from "../../../components/ui";
import { appointmentUpdateStatus } from "../appointmentOptions";
import { closeModal } from "../../../components/modal/modalSlice";
import { useUpdateAppointmentStatusMutation } from "../appointmentApiSlice";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/handleApiError";

const UpdateAppointmentStatusModal = () => {
  const { appointment } = useSelector((state) => state.modal.modalProps || {});
  const dispatch = useDispatch();

  const [status, setStatus] = useState(appointment?.status || "");

  const [updateAppointmentStatus, { isLoading }] =
    useUpdateAppointmentStatusMutation();

    useEffect(() => {
      if (appointment?.status) {
        setStatus(appointment.status);
      }
    }, [appointment]);

  const handleUpdateStatus = async () => {
    if (status === appointment.status) {
      toast.info("No changes made");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const date = new Date(appointment.date).toISOString().split("T")[0];

    if(date < today ){
      toast.info("Cannot update status of past appointments");
      return;
    }

    try {
      const res = await updateAppointmentStatus({
        id: appointment._id,
        status: status,
      }).unwrap();

      toast.success(res.message || "Appointment status updated successfully");

      dispatch(closeModal());
    } catch (error) {
      console.error(error);
      handleApiError(error);
    }
  };

  return (
    <div className="flex flex-col items-center px-5 py-5 space-y-3 w-64 sm:w-fit max-w-sm">
      <OctagonAlert strokeWidth={1.25} size={72} className="text-red-600" />
      <h1 className="text-2xl">Are you sure?</h1>

      <p className="text-textSecondary text-center">
        Do you really want to update{" "}
        <span className="text-red-600">{"fullName"}'s</span> status? It will be{" "}
        {status === "booked" ? (
          <span className="text-green-600">Booked</span>
        ) : status === "arrived" ? (
          <span className="text-blue-600">Arrived</span>
        ) : status === "cancelled" ? (
          <span className="text-red-600">Cancelled</span>
        ) : null}{" "}
        after the update.
      </p>

      <FilterOption
        status={status}
        onChange={setStatus}
        options={appointmentUpdateStatus}
      />

      <div className="flex justify-between w-full gap-2 mt-5">
        <button
          onClick={() => dispatch(closeModal())}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateStatus}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default UpdateAppointmentStatusModal;
