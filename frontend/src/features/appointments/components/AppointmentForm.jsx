import React, { useState } from "react";
import { AutocompleteInput, InputField } from "../../../components/ui";
import { Controller, useFormContext } from "react-hook-form";
import { getFullName } from "../../../utils/userHelpers";
import { useSearchDoctorQuery } from "../../dashboard/doctors/doctorsApiSlice";

const AppointmentForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const [search, setSearch] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const { data: doctors = [] } = useSearchDoctorQuery(search, {
    refetchOnMountOrArgChange: false,
    skip: search.length < 2,
  });

  return (
    <div className="bg-white border border-gray-300 px-5 py-5 rounded w-full">
      <h1 className="font-semibold text-lg uppercase">Select Doctor & Time</h1>

      <div className="flex flex-col gap-3 sm:flex-row justify-between py-5">
        {/* Department */}
        <InputField
          label="Department"
          type="text"
          {...register("department")}
          error={errors.department}
          placeholder="Enter department"
          className="focus:ring focus:border-primary"
        />

        {/* Search doctor Input */}
        <Controller
          name="doctor"
          control={control}
          render={({ field }) => (
            <AutocompleteInput
              label="Doctor"
              placeholder="Enter doctor name"
              value={
                field.value
                  ? `${field.value.firstName} ${field.value.lastName}`
                  : search
              }
              onChange={(val) => {
                setSearch(val);
                field.onChange(null);
              }}
              onSelect={(doctor) => {
                field.onChange(doctor);
                setSearch("");
              }}
              fetchItems={async () => doctors}
              renderItem={(doctor) => {
                const fullName = getFullName(doctor);

                return (
                  <div className="text-sm border-b py-2">
                    <p>{fullName}</p>
                    <p className="text-gray-500 text-xs">{doctor.department}</p>
                  </div>
                );
              }}
              error={errors?.doctor}
            />
          )}
        />
      </div>

      {/*Appointment Date Field */}
      <Controller
        name="date"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputField
            label="Appointment Date"
            type="date"
            min={today}
            {...field}
            error={errors.date}
            className="focus:ring focus:border-primary"
          />
        )}
      />
    </div>
  );
};

export default AppointmentForm;
