import React from "react";
import Table from "../../../components/table/Table";
import { useGetDoctorsQuery } from "./doctorsApiSlice";
import { Button, Loader } from "../../../components/ui";
import { getColumns } from "./TableColumns";
import SearchField from "../../../components/search/Search";
import { useDispatch } from "react-redux";
import { openModal } from "../../../components/modal/modalSlice";
import { Plus } from "lucide-react";

const Doctors = () => {
  const { data, isLoading, error } = useGetDoctorsQuery();
  const dispatch = useDispatch();

  console.log(data, 'Doctor data...');
  

  const handleEditModalOpen = (row) => {
    dispatch(
      openModal({ modalType: "EDIT_DOCTOR", modalProps: { doctorId: row } })
    );
    console.log("EDIT CLICKED", row);
  };

  const handleDeleteModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "DELETE_DOCTOR",
        modalProps: { doctorData: row },
      })
    );
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
    <>
      <div className="flex justify-between">
        <SearchField />
        <Button onClick={handleAddModalOpen} >
          <Plus size={20} />
        </Button>
      </div>
      <Table columns={columns} data={data.doctors || []} />
    </>
  );
};

export default Doctors;
