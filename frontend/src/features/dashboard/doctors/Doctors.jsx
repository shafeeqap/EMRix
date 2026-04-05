import React from "react";
import Table from "../../../components/table/Table";
import { useGetDoctorsQuery } from "./doctorsApiSlice";
import { Loader } from "../../../components/ui";
import { Columns } from "./TableColumns";
import SearchField from "../../../components/search/Search";
import { useDispatch } from "react-redux";
import { openModal } from "../../../components/modal/modalSlice";

const Doctors = () => {
  const { data, isLoading, error } = useGetDoctorsQuery();
  const dispatch = useDispatch();

  const handleModalOpen = () => {
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
      <SearchField handleAdd={handleModalOpen} />
      <Table columns={Columns} data={data || []} />
    </div>
  );
};

export default Doctors;
