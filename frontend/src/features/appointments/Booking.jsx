import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { getColumns } from "./TableColumns";
import { useDispatch } from "react-redux";
import { openModal } from "../../components/modal/modalSlice";
import { useGetAppointmentsQuery } from "./appointmentApiSlice";
import {
  Button,
  FilterOption,
  FilterSearch,
  Loader,
  Pagination,
} from "../../components/ui";
import { Plus } from "lucide-react";
import ErrorMessage from "../../components/ErrorMessage";
import { appointmentOptions } from "./appointmentOptions";

const Booking = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const { data, isLoading, error } = useGetAppointmentsQuery({
    page,
    limit: 5,
    search,
    status: filter,
  });

  const appointments = data?.appointments || [];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!search && !filter) return;

    setPage(1);
  }, [search, filter]);

  const handleAddModalOpen = (row) => {
    dispatch(openModal({ modalType: "ADD_APPOINTMENT", modalProps: {} }));
    console.log("ADD APPOINTMENT CLICKED", row);
  };

  const handleEditModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "EDIT_APPOINTMENT",
        modalProps: { appointmentId: row._id },
      })
    );
    console.log("EDIT CLICKED", row);
  };

  const handleDeleteModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "DELETE_APPOINTMENT",
        modalProps: { appointmentData: row },
      })
    );
    console.log("DELETE CLICKED", row);
  };

  const handleDetailsModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "DETAILS_APPOINTMENT",
        modalProps: { appointmentId: row._id },
      })
    );
    console.log("DETAILS CLICKED", row);
  };

  const handleStatusModalOpen = (row) => {
    dispatch(
      openModal({
        modalType: "UPDATE_APPOINTMENT_STATUS",
        modalProps: { appointment: row },
      })
    );
    console.log("UPDATE APPOINTMENT STATUS CLICKED", row);
  };

  const columns = getColumns({
    onEdit: handleEditModalOpen,
    onDelete: handleDeleteModalOpen,
    onDetails: handleDetailsModalOpen,
    onUpdateStatus: handleStatusModalOpen,
  });

  if (isLoading)
    return (
      <>
        <Loader />
      </>
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

      <FilterOption
        status={filter}
        onChange={setFilter}
        options={appointmentOptions}
        className="w-52"
      />

      {appointments.length === 0 ? (
        <div className="flex justify-center items-center bg-gray-100 mt-5 rounded min-h-20">
          <p>{search ? "No results found" : "No doctors available"}</p>
        </div>
      ) : (
        <Table columns={columns} data={appointments} />
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

export default Booking;
