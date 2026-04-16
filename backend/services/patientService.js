import {
  countPatientDocuments,
  createPatientRepo,
  findOnePatient,
  findPatient,
  findPatientById,
  findPatientByIdAndDelete,
  findPatientByIdAndUpdate,
} from "../repositories/patientRepository.js";
import { AppError } from "../utils/AppError.js";
import { logAction } from "../utils/auditLogger.js";
import { generatePatientID } from "../utils/generatePatientID.js";

// ===========> Create Patient Service <===========
export const createPatientService = async (data, user) => {
  const { name, age, mobile } = data;
  console.log(data, "Data...");

  const existPatient = await findOnePatient({ mobile });

  if (existPatient) {
    throw new AppError("Patient already exists", 400);
  }

  const patientId = await generatePatientID();

  const patient = await createPatientRepo({
    name,
    age,
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
export const getPatientService = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;
  const skip = (page - 1) * limit;
  const search = query.search?.trim();

  const filter = {};

  if (search) {
    const isNumeric = /^\d+$/.test(search);

    filter.$or = [
      { name: { $regex: `^${search}`, $options: "i" } },
      { patientId: { $regex: search, $options: "i" } },
    ];

    if (isNumeric) {
      filter.$or.push({ mobile: { $regex: search } });
    }
  }

  const total = await countPatientDocuments(filter);
  const patients = await findPatient(filter, skip, limit);

  const totalPages = Math.ceil(total / limit);

  return { patients, page, totalPages };
};

// ===========> Search Patient Service <===========
export const searchPatientService = async (query) => {
  const { mobile } = query;
  console.log(mobile);

  const patient = await findOnePatient({ mobile });
  if (!patient) {
    throw new AppError("Patien not found", 404);
  }

  return patient;
};

// ===========> Get Patient By ID Service <===========
export const getPatientByIdService = async (params) => {
  const patientId = params.id;

  const patient = await findPatientById(patientId);

  if (!patient) {
    throw new AppError("Patien not found", 404);
  }

  return patient;
};

// ===========> Update Patient Service <===========
export const updatePatientService = async (params, data, user) => {
  const id = params.id;
  const { name, mobile } = data;

  const patient = await findPatientById(id);
  if (!patient) {
    throw new AppError("Patient not found", 404);
  }

  const updatedPatient = await findPatientByIdAndUpdate(
    id,
    { name, mobile },
    { returnDocument: "after" }
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
    throw new AppError("Patient not found", 404);
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
