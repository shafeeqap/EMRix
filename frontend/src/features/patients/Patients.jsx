import React, { useEffect, useState } from "react";
import { useGetPatientQuery } from "./patientsApiSlice";
import {
  Button,
  FilterOption,
  FilterSearch,
  Loader,
} from "../../components/ui";
import ErrorMessage from "../../components/ErrorMessage";
import Table from "../../components/table/Table";
import { getColumns } from "./TableColumns";
import { useDispatch } from "react-redux";
import { openModal } from "../../components/modal/modalSlice";
import { Plus } from "lucide-react";

const Patients = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, error } = useGetPatientQuery({
    page,
    limit: 5,
    search,
    status,
  });

  const dispatch = useDispatch();

  const patients = data?.patients || [];

  console.log(patients, "Patients...");

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const handleAddModalOpen = (row) => {
    dispatch(openModal({ modalType: "ADD_PATIENT", modalProps: {} }));
    console.log("ADD PATIENT CLICKED", row);
  };

  const handleEditModalOpen = (row) => {
    dispatch(
      openModal({ modalType: "EDIT_PATIENT", modalProps: { patientData: row } })
    );
    console.log("EDIT CLICKED", row);
  };

  const handleDeleteModalOpen = (row) => {
    dispatch(
      openModal({ modalType: "DELETE_PATIENT", modalProps: { patientData: row } })
    );
    console.log("DELETE CLICKED", row);
  };
  const handleDetailsModalOpen = (row) => {
    dispatch(
      openModal({ modalType: "DETAILS_PATIENT", modalProps: { usersData: row } })
    );
    console.log("DETAILS CLICKED", row);
  };

  const columns = getColumns({
    onEdit: handleEditModalOpen,
    onDelete: handleDeleteModalOpen,
    onDetails: handleDetailsModalOpen,
  });

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error) return <ErrorMessage />;

  return (
    <>
      <div className="flex justify-between">
        <FilterSearch value={search} onChange={setSearch} />
        <Button onClick={handleAddModalOpen}>
          <Plus size={20} />
        </Button>
      </div>

      <FilterOption status={status} setStatus={setStatus} />

      <Table columns={columns} data={patients} />
    </>
  );
};

export default Patients;
