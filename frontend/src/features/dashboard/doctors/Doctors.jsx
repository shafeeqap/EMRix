import React from "react";
import Table from "../../../components/table/Table";
import { useGetDoctorsQuery } from "./doctorsApiSlice";
import { Loader } from "../../../components/ui";
import { getColumns } from "./TableColumns";
import SearchField from "../../../components/search/Search";
import { useDispatch } from "react-redux";
import { openModal } from "../../../components/modal/modalSlice";

const Doctors = () => {
  const { data, isLoading, error } = useGetDoctorsQuery();
  const dispatch = useDispatch();

  const handleEditModalOpen = (row) => {
    dispatch(openModal({modalType: "EDIT_DOCTOR", modalProps: { doctorData: row }}));
    console.log("Edit", row);
  };

  const handleDeleteModalOpen = (row) => {
    dispatch(openModal({modalType: "DELETE_DOCTOR", modalProps: { doctorData: row }}));
    console.log("Delete", row);
  };

  const columns = getColumns({
    onEdit: handleEditModalOpen,
    onDelete: handleDeleteModalOpen,
  });

  const handleAddModalOpen = () => {
    dispatch(openModal({ modalType: "ADD_DOCTOR", modalProps: {} }));
  };

  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );
  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      <SearchField handleAdd={handleAddModalOpen} />
      <Table columns={columns} data={data || []} />
    </div>
  );
};

export default Doctors;
