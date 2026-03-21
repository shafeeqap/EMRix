import {
  createPatientRepo,
  findPatient,
  findPatientById,
  findPatientByIdAndDelete,
  findPatientByIdAndUpdate,
} from "../repositories/patientRepository.js";
import { logAction } from "../utils/auditLogger.js";

// ===========> Create Patient Service <===========
export const createPatientService = async (data, user) => {
  const { name, mobile, patientId } = data;

  const existPatient = await findPatient({ mobile });

  if (existPatient) {
    throw new Error("Patient already exists");
  }

  const patient = await createPatientRepo({
    name,
    mobile,
    patientId,
  });

  await logAction({
    userId: user.id,
    role: user.role,
    action: "CREATE_PATIENT",
    entity: "Patient",
    entityId: patient._id,
    metadata: {
      patientId,
    },
  });

  return patient;
};

// ===========> Search Patient Service <===========
export const searchPatientService = async (query) => {
  const { mobile } = query;
  if (!mobile) {
    throw new Error("Mobile number is required");
  }

  const patient = await findPatient({ mobile });
  if (!patient) {
    throw new Error("Patien not found");
  }

  return patient;
};

// ===========> Get Patient By ID Service <===========
export const getPatientByIdService = async (params) => {
  const patientId = params.id;

  const patient = await findPatientById(patientId);

  if (!patient) {
    throw new Error("Patien not found");
  }

  return patient;
};

// ===========> Update Patient Service <===========
export const updatePatientService = async (params, data, user) => {
  const id = params.id;
  const { name, mobile } = data;

  // if (!name || !mobile) {
  //   throw new Error("Missing required fields");
  // }

  const patient = await findPatientById(id);
  if (!patient) {
    throw new Error("Patient not found");
  }

  const updatedPatient = await findPatientByIdAndUpdate(
    id,
    { name, mobile },
    { new: true }
  );

  await logAction({
    userId: user.id,
    role: user.role,
    action: "UPDATE_PATIENT",
    entity: "Patient",
    entityId: patient._id,
    metadata: {
      patientId: patient._id,
      previousData: {
        name: patient.name,
        mobile: patient.mobile,
      },
      updatedData: {
        name,
        mobile,
      },
    },
  });

  return updatedPatient;
};

// ===========> Delete Patient Service <===========
export const deletePatientService = async (params, user) => {
  const patientId = params.id;

  const patient = await findPatientById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  await findPatientByIdAndDelete(patientId);

  await logAction({
    userId: user.id,
    role: user.role,
    action: "DELETE_PATIENT",
    entity: "patient",
    entityId: patient._id,
    metadata: {
      name: patient.name,
      mobile: patient.mobile,
    },
  });
};
