import React from "react";
import Table from "../../components/table/Table";
// import { getColumns } from "../dashboard/doctors/TableColumns";
import { useDispatch } from "react-redux";
import { openModal } from "../../components/modal/modalSlice";
import { useGetUserQuery } from "./userApiSlice";
import { getColumns } from "./TableColumns";
import { Loader } from "../../components/ui";

const Users = () => {
  const { data, isLoading, error } = useGetUserQuery();
  const dispatch = useDispatch();

  const users = data?.users || [];

  console.log(users, "Users...");
  console.log(isLoading, "Loading...");

  const handleEditModalOpen = (row) => {
    dispatch(
      openModal({ modalType: "EDIT_USER", modalProps: { usersData: row } })
    );
    console.log("EDIT CLICKED", row);
  };

  const handleDeleteModalOpen = (row) => {
    dispatch(
      openModal({ modalType: "DELETE_USER", modalProps: { usersData: row } })
    );
    console.log("DELETE CLICKED", row);
  };

  const columns = getColumns({
    onEdit: handleEditModalOpen,
    onDelete: handleDeleteModalOpen,
  });

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error) return <p>Something went wrong</p>;

  return (
    <>
      <Table columns={columns} data={users} />
    </>
  );
};

export default Users;
