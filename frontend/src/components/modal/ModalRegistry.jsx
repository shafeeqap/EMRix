import {
  AddDoctorModal,
  DeleteDoctorModal,
  EditDoctorModal,
  UpdateDoctorStatusModal,
} from "../../features/dashboard/doctors/components";
import AddPatientModal from "../../features/patients/components/AddPatientModal";
import DeletePatientModal from "../../features/patients/components/DeletePatientModal";
import DetailsPatientModal from "../../features/patients/components/DetailsPatientModal";
import EditPatientModal from "../../features/patients/components/EditPatientModal";
import {
  AddUserModal,
  DeleteUserModal,
  EditUserModal,
  UpdateUserStatusModal
} from "../../features/users/components";

export const MODAL_COMPONENTS = {
  // Doctor Modals
  ADD_DOCTOR: AddDoctorModal,
  EDIT_DOCTOR: EditDoctorModal,
  DELETE_DOCTOR: DeleteDoctorModal,
  UPDATE_DOCTOR_STATUS: UpdateDoctorStatusModal,

  // Patient Modals
  ADD_PATIENT: AddPatientModal,
  EDIT_PATIENT: EditPatientModal,
  DELETE_PATIENT: DeletePatientModal,
  DETAILS_PATIENT: DetailsPatientModal,

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
  UPDATE_USER_STATUS: UpdateUserStatusModal,
};
