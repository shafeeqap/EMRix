import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../components/modal/modalSlice";
import { useCreateDoctorMutation } from "../../dashboard/doctors/doctorsApiSlice";
import { addPatientSchema } from "../../../validator/addPatientValidator";
import { Button, InputField } from "../../../components/ui";
import { handleApiError } from "../../../utils/handleApiError";
import { toast } from "react-toastify";

const AddPatientModal = () => {
  const [createPatient, { isLoading }] = useCreateDoctorMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addPatientSchema),
    defaultValues: { name: "" },
  });

  console.log(errors, "Errors...");


  const onSubmit = async (data) => {
    console.log(data, "Patient data...");

    try {
      const res = await createPatient(data).unwrap();
      console.log(res, "Response...");
      toast.success(res.message || "Patient created successfully");
    } catch (error) {
      console.error("Error creating patient:", error);
      handleApiError(error, setError);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Add Patient</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <InputField
            label="Patient name"
            type="text"
            {...register("name")}
            error={errors.name}
            placeholder="Enter patient name"
            className="focus:ring focus:border-primary"
          />
        </div>
        <div className="mb-4">
          <InputField
            label="Age"
            type="number"
            {...register("age")}
            error={errors.age}
            placeholder="Enter patient age"
            className="focus:ring focus:border-primary"
          />
        </div>
        <div className="mb-4">
          <InputField
            label="Mobile"
            type="text"
            {...register("mobile")}
            error={errors.mobile}
            placeholder="Enter mobile number"
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

export default AddPatientModal;
