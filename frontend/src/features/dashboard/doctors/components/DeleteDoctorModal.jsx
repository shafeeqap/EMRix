import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../components/modal/modalSlice";

const DeleteDoctorModal = ({ userId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log("Deleting user:", userId);
    dispatch(closeModal());
  };

  return (
    <>
      <h2 className="text-lg font-semibold">Delete User</h2>
      <p>Are you sure?</p>

      <div className="flex gap-2 mt-4">
        <button onClick={() => dispatch(closeModal())}>Cancel</button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default DeleteDoctorModal;
