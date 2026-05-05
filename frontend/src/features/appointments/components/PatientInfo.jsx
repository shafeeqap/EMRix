import React, { useState } from "react";
import { AutocompleteInput, Button } from "../../../components/ui";
import { useDispatch } from "react-redux";
import { openModal } from "../../../components/modal/modalSlice";
import { Controller, useFormContext } from "react-hook-form";
import { useSearchPatientQuery } from "../../patients/patientsApiSlice";

const PatientInfo = ({ existingPatient, handlePatient }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

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
        <>
          <Controller
            name="patient"
            control={control}
            render={({ field }) => (
              <AutocompleteInput
                label="Patient Name"
                placeholder="Type patient name"
                value={field.value ? field.value.name : search}
                onChange={(val) => {
                  setSearch(val);
                  field.onChange(null);
                }}
                onSelect={(patient) => {
                  field.onChange(patient);
                  setSearch("");
                }}
                fetchItems={async () => patients}
                renderItem={(patients) => {
                  return (
                    <div className="text-sm border-b py-2">
                      <p>Name: {patients.name}</p>
                      <p className="text-gray-500 text-xs">
                        Age: {patients.age}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Mobile: {patients.mobile}
                      </p>
                    </div>
                  );
                }}
                error={errors.patient}
              />
            )}
          />
          <div className="flex flex-col mt-4">
            <label className="block text-gray-700 mb-2">
              Notes about disease:
            </label>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows="3"
                  cols="50"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-primary"
                />
              )}
            />
            {errors?.notes && (
              <p className="text-red-500 text-sm mt-1">
                {errors.notes.message}
              </p>
            )}
          </div>
        </>
      )}

    </div>
  );
};

export default PatientInfo;
