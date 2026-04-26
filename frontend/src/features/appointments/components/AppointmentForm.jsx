import React, { useEffect, useMemo, useState } from "react";
import { AutocompleteInput, InputField } from "../../../components/ui";
import { useGetAvailableSlotsQuery } from "../appointmentApiSlice";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFullName } from "../../../utils/userHelpers";
import { appointmentFormSchema } from "../../../validator/appointmentFormValidator";
import { useSearchDoctorQuery } from "../../dashboard/doctors/doctorsApiSlice";

const AppointmentForm = ({
  setSlots,
  selectedDoctorId,
  setSelectedDoctorId,
  selectedDate,
  setSelectedDate,
}) => {
  // const [date, setDate] = useState("");
  // const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [search, setSearch] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const { data: doctors = [] } = useSearchDoctorQuery(search, {
    refetchOnMountOrArgChange: false,
    skip: search.length < 2,
  });

  const { data, isLoading } = useGetAvailableSlotsQuery(
    {
      doctorId: selectedDoctorId?._id,
      date: selectedDate,
    },
    {
      skip: !selectedDoctorId?._id || !selectedDate,
    }
  );

  // console.log(data, "Available slots data...");

  useEffect(() => {
    if (data) {
      setSlots(data);
    }
  }, [data, setSlots]);

  const {
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: { name: "" },
  });

  return (
    <div className="bg-white px-5 py-5 rounded w-full">
      <h1 className="font-semibold text-lg uppercase">Select Doctor & Time</h1>

      <div className="flex flex-col sm:flex-row justify-between py-5">
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
          name="doctorName"
          control={control}
          render={({ field }) => (
            <AutocompleteInput
              label="Doctor"
              value={field.value ?? ""}
              placeholder="Enter doctor name"
              onChange={(val) => {
                field.onChange(val);
                setSearch(val);
                setSelectedDoctorId(null);
              }}
              onSelect={(doctor) => {
                const fullName = getFullName(doctor);

                field.onChange(fullName);
                setSearch(fullName);
                setSelectedDoctorId(doctor);
              }}
              fetchItems={async () => doctors}
              renderItem={(doctor) => {
                const fullName = getFullName(doctor);

                return (
                  <div className="text-sm border-b py-2">
                    <p>{fullName}</p>
                    <p className="text-gray-500 text-xs">{doctor.email}</p>
                    <p className="text-gray-500 text-xs">{doctor.mobile}</p>
                  </div>
                );
              }}
              error={errors?.doctorName}
            />
          )}
        />
      </div>

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
            onChange={(e) => {
              field.onChange(e);
              setSelectedDate(e.target.value);
            }}
            error={errors.date}
            className="focus:ring focus:border-primary"
          />
        )}
      />
    </div>
  );
};

export default AppointmentForm;
