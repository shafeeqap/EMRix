import React, { useEffect, useMemo, useState } from "react";
import { AutocompleteInput, InputField } from "../../../components/ui";
import {
  useGetAvailableSlotsQuery,
  useSearchDoctorQuery,
} from "../appointmentApiSlice";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFullName } from "../../../utils/userHelpers";
import { appointmentSchema } from "../../../validator/appointmentValidator";
import { formatTime } from "../../../utils/formatHours";

const AppointmentForm = ({ setSlots }) => {
  const [date, setDate] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [search, setSearch] = useState("");

  const { data: doctors = [], isLoading } = useSearchDoctorQuery(search, {
    refetchOnMountOrArgChange: false,
    skip: search.length < 2,
  });

  const { data: slots } = useGetAvailableSlotsQuery(
    {
      doctorId: selectedDoctor?._id,
      date,
    },
    {
      skip: !selectedDoctor?._id || !date,
    }
  );

  const formattedSlots = useMemo(() => {
    if (!slots?.slots) return [];

    return slots.slots.map((slot) => formatTime(slot));
  }, [slots]);

  console.log(formattedSlots, "Formatted Slots");

  useEffect(() => {
    setSlots(formattedSlots);
  }, [formattedSlots, setSlots]);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { name: "" },
  });

  return (
    <div className="bg-white px-5 py-5 rounded w-full">
      <h1 className="font-semibold text-lg uppercase">Select Doctor & Time</h1>

      <form>
        <div className="flex flex-col sm:flex-row justify-between py-5">
          <InputField
            label="Department"
            placeholder="Enter department"
            className="focus:ring focus:border-primary"
          />

          {/* Search doctor Input */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <AutocompleteInput
                label="Doctor"
                value={field.value ?? ""}
                placeholder="Enter doctor name"
                onChange={(val) => {
                  field.onChange(val);
                  setSearch(val);
                  setSelectedDoctor(null);
                }}
                onSelect={(doctor) => {
                  const fullName = getFullName(doctor);

                  field.onChange(fullName);
                  setSearch(fullName);
                  setSelectedDoctor(doctor);
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
                error={errors?.name}
              />
            )}
          />
        </div>

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <InputField
              label="Appointment Date"
              type="date"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setDate(e.target.value);
              }}
              error={errors.date}
              className="focus:ring focus:border-primary"
            />
          )}
        />
      </form>
    </div>
  );
};

export default AppointmentForm;
