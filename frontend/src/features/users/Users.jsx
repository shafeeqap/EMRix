import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { openModal } from "../../components/modal/modalSlice";
import { useGetUserQuery } from "./userApiSlice";
import { getColumns } from "./TableColumns";
import {
  Button,
  FilterOption,
  FilterSearch,
  Loader,
  Pagination,
} from "../../components/ui";
import { Plus } from "lucide-react";
import ErrorMessage from "../../components/ErrorMessage";

const Users = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, error } = useGetUserQuery({
    page,
    limit: 5,
    search,
    status,
  });

  const dispatch = useDispatch();

  console.log(data, "User data...");

  const users = data?.users || [];

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const handleAddModalOpen = (row) => {
    dispatch(openModal({ modalType: "ADD_USER", modalProps: {} }));
    console.log("ADD USER CLICKED", row);
  };

  const handleEditModalOpen = (row) => {
    dispatch(
      openModal({ modalType: "EDIT_USER", modalProps: { userId: row._id } })
    );
    console.log("EDIT CLICKED", row);
  };

  const handleDeleteModalOpen = (row) => {
    dispatch(
      openModal({ modalType: "DELETE_USER", modalProps: { userData: row } })
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

      {users.length === 0 ? (
        <div className="flex justify-center items-center bg-gray-100 mt-5 rounded min-h-20">
          <p>{search ? "No results found" : "No users available"}</p>
        </div>
      ) : (
        <Table columns={columns} data={users} />
      )}

      {data.totalPages > 1 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={data?.totalPages || 1}
        />
      )}
    </>
  );
};

export default Users;
