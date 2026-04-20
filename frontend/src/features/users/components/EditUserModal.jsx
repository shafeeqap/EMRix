import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editUserSchema } from "../../../validator/editUserValidator";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../userApiSlice";
import { Button, InputField, Loader } from "../../../components/ui";
import { closeModal } from "../../../components/modal/modalSlice";


const EditUserModal = () => {
  const { userId } = useSelector((state) => state.modal.modalProps || {});
  const { data: userData, isLoading } = useGetUserByIdQuery(userId);
  console.log(userId, "user id...");
  console.log(userData, "user data...");

  const [updateUser] = useUpdateUserMutation();

  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobile: "",
      role: "",
    },
  });

  useEffect(() => {
    if (!userData?.user) return;

    const user = userData.user;

    form.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  }, [userData, form]);

  const onSubmit = async (data) => {};

  return (
    <div className="bg-white rounded-lg p-6 sm:w-96 md:w-[700px]">
      <h2 className="text-xl font-semibold mb-4">Update User</h2>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-5">
          <div className="mb-4">
            <InputField
              label="First Name"
              type="text"
              {...form.register("firstName")}
              error={form.formState.errors.firstName?.message}
              placeholder="Enter first name"
              className="focus:ring focus:border-primary mb-4"
            />

            <InputField
              label="Last Name"
              type="text"
              {...form.register("lastName")}
              error={form.formState.errors.lastName?.message}
              placeholder="Enter last name"
              className="focus:ring focus:border-primary mb-4"
            />

            <InputField
              label="Mobile"
              type="text"
              {...form.register("mobile")}
              maxLength={10}
              error={form.formState.errors.mobile?.message}
              placeholder="Enter mobile"
              className="focus:ring focus:border-primary"
            />
          </div>

          <div className="mb-4">
            <InputField
              label="Email"
              type="email"
              {...form.register("email")}
              error={form.formState.errors.email?.message}
              placeholder="Enter email"
              className="focus:ring focus:border-primary mb-4"
            />

            <InputField
              label="Password"
              type="password"
              {...form.register("password")}
              error={form.formState.errors.password?.message}
              placeholder="Enter email"
              className="focus:ring focus:border-primary mb-4"
            />
            <div className="flex flex-col">
              <label htmlFor="" className="mb-2">
                Select Role
              </label>
              <select
                value={form.role}
                {...form.register("role")}
                onChange={(e) => form.setRole(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none bg-white"
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="receptionist">Receptionist</option>
              </select>
              {form.errors?.role && (
                <p className="text-red-500 text-sm">{form.errors?.role}</p>
              )}
            </div>
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

export default EditUserModal;
