import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../components/modal/modalSlice";
import useUserSearch from "../../../../hooks/useUserSearch";
import { Button, InputField } from "../../../../components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoctorSchema } from "../../../../validator/addDoctorValidator";
import { useCreateDoctorMutation } from "../doctorsApiSlice";
import { handleApiError } from "../../../../utils/handleApiError";
import { toast } from "react-toastify";

const AddDoctorModal = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { search, setSearch, users } = useUserSearch();
  const [createDoctor, { isLoading }] = useCreateDoctorMutation();

  const dispatch = useDispatch();

  // console.log("Users...", users);
  // console.log("selectedUser", selectedUser);
  console.log("search...", search);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(addDoctorSchema) });

  const onSubmit = async (data) => {
    if (!selectedUser) {
      setError("name", { message: "Please select a user" });
      return;
    }

    const payload = {
      userId: selectedUser._id,

      // optional (if backend needs)
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      email: selectedUser.email,

      department: data.department,

      workingHours: {
        start: data.workingStart,
        end: data.workingEnd,
      },

      slotDuration: Number(data.slotDuration),

      breakTimes:
        data.breakStart && data.breakEnd
          ? [
              {
                start: data.breakStart,
                end: data.breakEnd,
              },
            ]
          : [],
    };

    console.log("Final Payload:", payload);

    try {
      const res = await createDoctor(payload).unwrap();
      console.log(res, "Doctor created successfully");
      toast.success(res.message || "Doctor created successfully");

      dispatch(closeModal());
    } catch (error) {
      console.error("Error creating doctor:", error);
      handleApiError(error, setError);
    }
  };

  const nameField = register("name");

  return (
    <div className="bg-white rounded-lg p-6 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Add Doctor</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Search Input */}
        <div className="mb-4 relative">
          <InputField
            label="Search User"
            type="text"
            {...nameField}
            error={errors.name}
            placeholder="Type to search for users..."
            className="focus:ring focus:border-primary"
            onChange={(e) => {
              nameField.onChange(e); // Update react-hook-form state
              setSearch(e.target.value);
              setSelectedUser(null);
            }}
          />

          {/* Dropdown */}
          {search && !selectedUser && (
            <ul className="absolute w-full bg-white border mt-1 max-h-40 overflow-y-auto shadow rounded z-10">
              {users.map((user) => (
                <li
                  key={user._id}
                  onClick={() => {
                    setSelectedUser(user);

                    const fullName = user.firstName + " " + user.lastName;
                    setSearch(fullName);
                    setValue("name", fullName);
                  }}
                  className="px-3 py-2 border-b hover:bg-gray-100 cursor-pointer"
                >
                  <p className="flex flex-col p-1 text-sm">
                    {user.firstName} {user.lastName}
                    <span className="text-textSecondary">
                      Email: {user.email}
                    </span>
                    <span className="text-textSecondary">
                      Mobile: {user.mobile}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Selected User */}
        {selectedUser && (
          <div className="mb-4 p-2 bg-gray-200 rounded">
            <p className="text-sm">
              <strong>Name:</strong> {selectedUser.firstName}{" "}
              {selectedUser.lastName}
            </p>
            <p className="text-sm">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p className="text-sm">
              <strong>Mobile:</strong> {selectedUser.mobile}
            </p>
          </div>
        )}

        <div className="mb-4">
          <InputField
            label="Specialization/Department"
            type="text"
            {...register("department")}
            error={errors.department}
            placeholder="Enter specialization or department"
            className="focus:ring focus:border-primary"
          />
        </div>

        {/* Working Hours */}
        <div className="flex flex-col mb-4 gap-5 ">
          <InputField
            label="Working Hours Start"
            type="time"
            error={errors.workingStart}
            {...register("workingStart")}
            className="w-full border p-1 border-gray-300 rounded focus:outline-none focus:ring focus:border-primary"
          />

          <InputField
            label="Working Hours End"
            type="time"
            error={errors.workingEnd}
            {...register("workingEnd")}
            className=" w-full border p-1 border-gray-300 rounded focus:outline-none focus:ring focus:border-primary"
          />
        </div>

        {/* Break Time */}
        <div className="flex flex-col mb-4 ">
          <InputField
            label="Break Time Start"
            type="time"
            error={errors.breakStart}
            {...register("breakStart")}
            className="w-full border p-1 border-gray-300 rounded focus:outline-none focus:ring focus:border-primary"
          />

          <InputField
            label="Break Time End"
            type="time"
            {...register("breakEnd")}
            error={errors.breakEnd}
            className="w-full border p-1 border-gray-300 rounded focus:outline-none focus:ring focus:border-primary"
          />
        </div>

        {/* Slot Duration */}
        <div className="mb-4">
          <InputField
            label="Slot Duration (minutes)"
            type="number"
            {...register("slotDuration")}
            error={errors.slotDuration}
            placeholder="Enter slot duration in minutes"
            className="focus:ring focus:border-primary"
          />
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
            {isLoading} Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorModal;
