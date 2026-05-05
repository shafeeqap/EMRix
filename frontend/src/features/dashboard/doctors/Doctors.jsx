import React, { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { useGetDoctorsQuery } from "./doctorsApiSlice";
import {
  Button,
  Loader,
  Pagination,
  FilterSearch,
  FilterOption,
} from "../../../components/ui";
import { getColumns } from "./TableColumns";
import { useDispatch } from "react-redux";
import { openModal } from "../../../components/modal/modalSlice";
import { Plus } from "lucide-react";
import ErrorMessage from "../../../components/ErrorMessage";

const Doctors = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, error } = useGetDoctorsQuery({
    page,
    limit: 5,
    search,
    status,
  });

  const dispatch = useDispatch();

  console.log(data, "Doctors data...");

  const doctors = data?.doctors || [];

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const handleAddModalOpen = () => {
    dispatch(openModal({ modalType: "ADD_DOCTOR", modalProps: {} }));
  };

  const handleEditModalOpen = (row) => {
    dispatch(
      openModal({ modalType: "EDIT_DOCTOR", modalProps: { doctorId: row._id } })
    );
  };

  const handleDeleteModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "DELETE_DOCTOR",
        modalProps: { doctorData: row },
      })
    );
  };

  const handleStatusModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "UPDATE_DOCTOR_STATUS",
        modalProps: { doctorData: row },
      })
    );
  };

  const columns = getColumns({
    onEdit: handleEditModalOpen,
    onDelete: handleDeleteModalOpen,
    onUpdateStatus: handleStatusModalOpen,
  });

  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );

  if (error) return <ErrorMessage />;

  const statusOptions = [
    { label: "All", value: "" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  return (
    <>
      <div className="flex justify-between">
        <FilterSearch value={search} onChange={setSearch}  />

        <Button onClick={handleAddModalOpen}>
          <Plus size={20} />
        </Button>
      </div>

      <FilterOption
        status={status}
        onChange={setStatus}
        options={statusOptions}
        className="w-52"
      />

      {doctors.length === 0 ? (
        <div className="flex justify-center items-center bg-gray-100 mt-5 rounded min-h-20">
          <p>{search ? "No results found" : "No doctors available"}</p>
        </div>
      ) : (
        <Table columns={columns} data={doctors} />
      )}

      {data.totalPages > 1 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={data.totalPages || 1}
        />
      )}
    </>
  );
};

export default Doctors;
