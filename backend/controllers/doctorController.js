import {
  createDoctorService,
  deleteDoctorService,
  getDoctorByIdServices,
  getDoctorsServices,
  updateDoctorService,
} from "../services/doctorService.js";

// =============> Create a new doctor <=============
export const createDoctor = async (req, res, next) => {
  try {
    const doctor = await createDoctorService(req.validatedData, req.user);

    res.status(201).json({ message: "Doctor created successfully", doctor });
  } catch (error) {
    next(error);
  }
};

// =============> Get all doctors <=============
export const getDoctors = async (req, res, next) => {
  try {
    const doctors = await getDoctorsServices();
    res.status(200).json({ doctors });
  } catch (error) {
    next(error);
  }
};

// =============> Get doctor by ID <=============
export const getDoctorById = async (req, res, next) => {
  try {
    const doctorId = req.params.id;

    const doctor = await getDoctorByIdServices(doctorId);

    res.status(200).json({ doctor });
  } catch (error) {
    next(error);
  }
};

// =============> Update doctor details <=============
export const updateDoctor = async (req, res, next) => {
  try {
    const updatedData = await updateDoctorService(
      req.params,
      req.body,
      req.user
    );
    console.log(req.body, "Doctor data...");

    res
      .status(200)
      .json({ message: "Doctor updated successfully", doctor: updatedData });
  } catch (error) {
    next(error);
  }
};

// =============> Delete doctor <=============
export const deleteDoctor = async (req, res, next) => {
  try {
    await deleteDoctorService(req.params, req.user);

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    next(error);
  }
};
