import React, { useState } from "react";
import { AutocompleteInput, Button, InputField } from "../../../components/ui";
import { useDispatch } from "react-redux";
import { openModal } from "../../../components/modal/modalSlice";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentSchema } from "../../../validator/appointmentValidator";
import { useSearchPatientQuery } from "../../patients/patientsApiSlice";

const PatientInfo = () => {
  const [existingPatient, setExistingPatient] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const { data: patients = [] } = useSearchPatientQuery(search, {
    refetchOnMountOrArgChange: false,
    skip: search.length < 2,
  });

  const handleAddModalOpen = (row) => {
    dispatch(openModal({ modalType: "ADD_PATIENT", modalProps: {} }));
    console.log("ADD PATIENT CLICKED", row);
  };

  const handlePatient = () => {
    setExistingPatient(!existingPatient);
  };

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
    <div className="bg-white border border-gray-300 px-5 py-5 rounded w-full">
      <h1 className="font-semibold text-lg uppercase">Patient Information</h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-between py-5">
        <Button onClick={handleAddModalOpen}>New Patient</Button>

        <Button onClick={handlePatient} variant="secondary">
          Existing Patient
        </Button>
      </div>

      {existingPatient && (
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <AutocompleteInput
              value={field.value}
              placeholder="Type patient name"
              onChange={(val) => {
                field.onChange(val);
                setSearch(val);
                setSelectedPatient(null);
              }}
              onSelect={(patients) => {
                field.onChange(patients.name);
                setSearch(patients.name);
                setSelectedPatient(patients);
              }}
              fetchItems={async () => patients}
              renderItem={(patients) => {
                return (
                  <div className="text-sm border-b py-2">
                    <p>Name: {patients.name}</p>
                    <p className="text-gray-500 text-xs">Age: {patients.age}</p>
                    <p className="text-gray-500 text-xs">
                      Mobile: {patients.mobile}
                    </p>
                  </div>
                );
              }}
              error={errors?.name}
            />
          )}
        />
      )}

      <Button variant="danger" className="uppercase w-full mt-5">
        Book Appointment
      </Button>
    </div>
  );
};

export default PatientInfo;
