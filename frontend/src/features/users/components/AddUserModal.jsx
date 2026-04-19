import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserSchema } from "../../../validator/addUserValidator.js";
import { Button, InputField, Loader } from "../../../components/ui";
import { useCreateUserMutation } from "../userApiSlice.js";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../components/modal/modalSlice.js";

const AddUserModal = () => {
  const [createdUser, { isLoading }] = useCreateUserMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addUserSchema),
    defaultValues: { name: "" },
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {};

  return (
    <div className="bg-white rounded-lg p-6 sm:w-96 md:w-[700px]">
      <h2 className="text-xl font-semibold mb-4">Add Patient</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-5">
          <div className="mb-4">
            <InputField
              label="First Name"
              type="text"
              {...register("firstName")}
              error={errors.firstName}
              placeholder="Enter first name"
              className="focus:ring focus:border-primary mb-4"
            />

            <InputField
              label="Last Name"
              type="text"
              {...register("lastName")}
              error={errors.lastName}
              placeholder="Enter last name"
              className="focus:ring focus:border-primary"
            />
          </div>

          <div className="mb-4">
            <InputField
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email}
              placeholder="Enter email"
              className="focus:ring focus:border-primary mb-4"
            />

            <InputField
              label="Password"
              type="password"
              {...register("password")}
              error={errors.password}
              placeholder="Enter email"
              className="focus:ring focus:border-primary mb-4"
            />
          </div>

          <div className="mb-4">
            <InputField
              label="Mobile"
              type="text"
              {...register("mobile")}
              maxLength={10}
              error={errors.mobile}
              placeholder="Enter mobile"
              className="focus:ring focus:border-primary"
            />
          </div>
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
            {isLoading ? <Loader /> : "Add"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUserModal;
