import { Trash2, PenLine, Eye } from "lucide-react";

export const getColumns = ({ onEdit, onDelete, onUpdateStatus, onDetails }) => [
  {
    header: "SL",
    render: (_, index) => index + 1,
  },
  {
    header: "Name",
    render: (row) => row.patient.name,
  },
  {
    header: "Age",
    render: (row) => row.patient.age,
  },
  {
    header: "Mobile",
    render: (row) => row.patient.mobile,
  },
  {
    header: "PatientID",
    render: (row) => row.patient.patientId,
  },
  {
    header: "Appointment Date",
    render: (row) => new Date(row.date).toISOString().split("T")[0],
  },
  {
    header: "Appointment Time",
    accessor: "slotTime",
  },
  {
    header: "Token Number",
    accessor: "tokenNumber",
  },
  {
    header: "Appointment Type",
    render: (row) => (
      <div onClick={() => onUpdateStatus(row)}>
        {row.status === "booked" ? (
          <span className="px-2 py-1 text-xs font-medium cursor-pointer text-white bg-green-700">
            Booked
          </span>
        ) : row.status === "arrived" ? (
          <span className="px-2 py-1 text-xs font-medium cursor-pointer text-white bg-blue-700">
            Arrived
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-medium cursor-pointer text-white bg-red-700">
            Cancelled
          </span>
        )}
      </div>
    ),
  },
  {
    header: "Actions",
    render: (row) => (
      <div className="flex gap-5">
        <PenLine onClick={() => onEdit(row)} className="cursor-pointer" />

        <Trash2
          onClick={() => onDelete(row)}
          className="text-red-700 cursor-pointer"
        />
      </div>
    ),
  },
  {
    header: "Details",
    render: (row) => (
      <div className="flex gap-5">
        <Eye onClick={() => onDetails(row)} className="cursor-pointer" />
      </div>
    ),
  },
];
