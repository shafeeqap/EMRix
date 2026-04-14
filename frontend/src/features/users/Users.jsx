import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { openModal } from "../../components/modal/modalSlice";
import { useGetUserQuery } from "./userApiSlice";
import { getColumns } from "./TableColumns";
import { Button, FilterSearch, Loader, Pagination } from "../../components/ui";
import { Plus } from "lucide-react";

const Users = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  console.log(search, "Search...");

  const { data, isLoading, error } = useGetUserQuery({
    page,
    limit: 5,
    search,
    status,
  });
  const dispatch = useDispatch();

  const users = data?.users || [];

  // console.log(users, "Users...");
  console.log(isLoading, "Loading...");

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const handleAddModalOpen = (row) => {
    dispatch(openModal({ modalType: "ADD_USER", modalProps: {} }));
    console.log("ADD USER CLICKED", row);
  };

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
      <div className="flex justify-between">
        <FilterSearch value={search} onChange={setSearch} />

        <Button onClick={handleAddModalOpen}>
          <Plus size={20} />
        </Button>
      </div>

      <div className="py-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 rounded w-52 bg-gray-100"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <Table columns={columns} data={users} />

      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data?.totalPages || 1}
      />
    </>
  );
};

export default Users;
