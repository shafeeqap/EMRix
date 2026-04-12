import {
  createDoctorRepo,
  findDoctorByEmail,
  findDoctorById,
  findDoctorByIdAndDelete,
  findDoctorByIdAndUpdate,
  findDoctors,
} from "../repositories/doctorRepository.js";
import { findUserById } from "../repositories/userRepository.js";
import { AppError } from "../utils/AppError.js";
import { logAction } from "../utils/auditLogger.js";

// =============> create doctor service <=============
export const createDoctorService = async (data, user) => {
  const {
    userId,
    // firstName,
    // lastName,
    // email,
    department,
    workingHours,
    slotDuration,
    breakTimes,
  } = data;
  console.log(data, "Doctor data");

  const userData = await findUserById(userId);
  console.log(userData, "User data");

  if (!userData) {
    throw new AppError("User not found", 404);
  }

  if (userData.role !== "doctor") {
    throw new AppError("Assigned user must have doctor role", 400);
  }

  const existingDoctor = await findDoctorByEmail(email);

  if (existingDoctor) {
    throw new AppError("Doctor already exists", 409);
  }

  const doctor = await createDoctorRepo({
    userId,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    department,
    workingHours,
    slotDuration,
    breakTimes,
    createdBy: user.id,
  });

  await logAction({
    userId: user.id,
    role: user.role,
    action: "CREATE_DOCTOR",
    entity: "Doctor",
    entityId: doctor._id,
    metadata: {
      doctorId: doctor._id,
      firstName,
      lastName,
    },
  });

  return doctor;
};

// =============> get all doctors service <=============
export const getDoctorsServices = async () => {
  const doctors = await findDoctors().populate("userId", "firstName lastName");

  return doctors;
};

// =============> get doctor by id service <=============
export const getDoctorByIdServices = async (doctorId) => {
  if (!doctorId) {
    throw new AppError("Doctor id is required", 400);
  }

  const doctor = await findDoctorById(doctorId).populate(
    "userId",
    "firstName lastName"
  );
  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  return doctor;
};

// =============> update doctor service <=============
export const updateDoctorService = async (params, data, user) => {
  const doctorId = params.id;
  const {
    firstName,
    lastName,
    email,
    department,
    workingHours,
    slotDuration,
    breakTimes,
  } = data;

  const doctor = await findDoctorById(doctorId);
  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  const updatedData = await findDoctorByIdAndUpdate(
    doctorId,
    {
      firstName,
      lastName,
      email,
      department,
      workingHours,
      slotDuration,
      breakTimes,
    },
    { returnDocument: "after" }
  );

  await logAction({
    userId: user.id,
    role: user.role,
    action: "UPDATE_DOCTOR",
    entity: "Doctor",
    entityId: doctor._id,
    metadata: {
      doctorId: doctor._id,
      previousData: {
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        email: doctor.email,
        department: doctor.department,
        workingHours: doctor.workingHours,
        slotDuration: doctor.slotDuration,
        breakTime: doctor.breakTimes,
      },
      updatedData: {
        firstName,
        lastName,
        email,
        department,
        workingHours,
        slotDuration,
        breakTimes,
      },
    },
  });

  return updatedData;
};

// =============> Delete doctor service <=============
export const deleteDoctorService = async (params, user) => {
  const doctorId = params.id;

  const doctor = await findDoctorById(doctorId);
  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  await findDoctorByIdAndDelete(doctorId);

  await logAction({
    userId: user.id,
    role: user.role,
    action: "DELETE_DOCTOR",
    entity: "Doctor",
    entityId: doctor._id,
    metadata: {
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      department: doctor.department,
      workingHours: doctor.workingHours,
      slotDuration: doctor.slotDuration,
      breakTimes: doctor.breakTimes,
    },
  });
};
