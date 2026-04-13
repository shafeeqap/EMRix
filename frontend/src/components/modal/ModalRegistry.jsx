import {
  AddDoctorModal,
  DeleteDoctorModal,
  EditDoctorModal,
  UpdateDoctorStatusModal,
} from "../../features/dashboard/doctors/components";
import {
  AddUserModal,
  DeleteUserModal,
  EditUserModal,
} from "../../features/users/components";

export const MODAL_COMPONENTS = {
  // Doctor Modals
  ADD_DOCTOR: AddDoctorModal,
  EDIT_DOCTOR: EditDoctorModal,
  DELETE_DOCTOR: DeleteDoctorModal,
  UPDATE_DOCTOR_STATUS: UpdateDoctorStatusModal,

  // Patient Modals
  ADD_PATIENT: "ADD_PATIENT",
  EDIT_PATIENT: "EDIT_PATIENT",
  DELETE_PATIENT: "DELETE_PATIENT",

  // Appointment Modals
  ADD_APPOINTMENT: "ADD_APPOINTMENT",
  EDIT_APPOINTMENT: "EDIT_APPOINTMENT",
  DELETE_APPOINTMENT: "DELETE_APPOINTMENT",

  // Prescription Modals
  ADD_PRESCRIPTION: "ADD_PRESCRIPTION",
  EDIT_PRESCRIPTION: "EDIT_PRESCRIPTION",
  DELETE_PRESCRIPTION: "DELETE_PRESCRIPTION",

  // User Modals
  ADD_USER: AddUserModal,
  EDIT_USER: EditUserModal,
  DELETE_USER: DeleteUserModal,
};
