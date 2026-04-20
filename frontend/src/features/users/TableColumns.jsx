import { Trash2, PenLine } from "lucide-react";

export const getColumns = ({ onEdit, onDelete, onUpdateStatus }) => [
  {
    header: "SL",
    render: (_, index) => index + 1,
  },
  {
    header: "First Name",
    accessor: "firstName",
  },
  {
    header: "Last Name",
    accessor: "lastName",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Mobile",
    accessor: "mobile",
  },
  {
    header: "Role",
    accessor: "role",
  },
  //   {
  //     header: "Working Hours",
  //     render: (row) => formatWorkingHours(row.workingHours),
  //   },
  //   {
  //     header: "Slot Duration",
  //     accessor: "slotDuration",
  //   },
  {
    header: "Status",
    render: (row) => (
      <>
        {row.role !== "super_admin" && (
          <span
            onClick={() => onUpdateStatus(row)}
            className={`px-2 py-1 text-xs font-medium cursor-pointer text-white ${
              row.isActive ? "bg-green-700" : "bg-red-700"
            }`}
          >
            {row.isActive ? "Active" : "Inactive"}
          </span>
        )}
      </>
    ),
  },
  {
    header: "Actions",
    render: (row) => (
      <div className="flex gap-5 ">
        {row.role !== "super_admin" && (
          <>
            <PenLine onClick={() => onEdit(row)} className="cursor-pointer" />
            <Trash2
              onClick={() => onDelete(row)}
              className="text-red-700 cursor-pointer"
            />
          </>
        )}
      </div>
    ),
  },
];
