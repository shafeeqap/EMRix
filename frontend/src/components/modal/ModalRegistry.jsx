import {
  AddDoctorModal,
  DeleteDoctorModal,
  EditDoctorModal,
} from "../../features/dashboard/doctors/components";

export const MODAL_COMPONENTS = {
  // Doctor Modals
  ADD_DOCTOR: AddDoctorModal,
  EDIT_DOCTOR: EditDoctorModal,
  DELETE_DOCTOR: DeleteDoctorModal,

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
};
