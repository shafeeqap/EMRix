import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../components/modal/modalSlice";
import { OctagonX, Trash2 } from "lucide-react";

const DeleteDoctorModal = ({ userId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log("Deleting user:", userId);
    dispatch(closeModal());
  };

  return (
    <div className="flex flex-col items-center px-5 py-5 space-y-3 w-64 sm:w-fit max-w-sm">

      <Trash2 strokeWidth={1.25} size={60} className="text-red-600" />
      {/* <h2 className="text-lg font-semibold">Delete User</h2> */}
      <h1 className="text-2xl">Are you sure?</h1>
      <p className="text-textSecondary text-center">
        Do you really want to delete these records? This process cannot be
        undone.
      </p>

      <div className="flex justify-between w-full gap-2 mt-5">
        <button
          onClick={() => dispatch(closeModal())}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteDoctorModal;
