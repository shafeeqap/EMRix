import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../components/modal/modalSlice";

const AddDoctorModal = ({ doctorId }) => {
  const dispatch = useDispatch();

  console.log("Doctor added!", doctorId);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor added!", doctorId);

    dispatch(closeModal());
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Add Doctor</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:border-primary"
            placeholder="Enter doctor's name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Specialization</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:border-primary"
            placeholder="Enter specialization"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => dispatch(closeModal())}
            type="button"
            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primaryHover transition duration-200"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorModal;
