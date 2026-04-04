import React, { useState } from "react";
import Table from "../../../components/table/Table";
import { useGetDoctorsQuery } from "./doctorsApiSlice";
import { Loader } from "../../../components/ui";
import { Columns } from "./TableColumns";
import SearchField from "../../../components/search/Search";
// import ModalBase from "../../../components/modal/GlobalModal";
import { useDispatch } from "react-redux";
import { openModal } from "../../../components/modal/modalSlice";

const Doctors = () => {
  // const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetDoctorsQuery();
  // console.log(data, "doctorsData");

  const handleModalOpen = () => {
    dispatch(openModal({ modalType: "ADD_DOCTOR", modalProps: {doctorId: 123} }));
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

      {/* {openModal && (
        <ModalBase isOpen={openModal} onClose={() => setOpenModal(false)}  />
      )} */}
    </div>
  );
};

export default Doctors;
