import {
  createDoctorService,
  deleteDoctorService,
  getDoctorByIdServices,
  getDoctorsServices,
  searchDoctorService,
  updateDoctorService,
  updateDoctorStatusService,
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
    const { doctors, page, totalPages } = await getDoctorsServices(req.query);
    
    res.status(200).json({ doctors, page, totalPages });
  } catch (error) {
    next(error);
  }
};

// =============> Search doctors by search query <=============
export const searchDoctors = async (req, res, next) => {
  try {
    const data = await searchDoctorService(req.query);

    res.status(200).json({ doctors: data });
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

    res
      .status(200)
      .json({ message: "Doctor updated successfully", doctor: updatedData });
  } catch (error) {
    next(error);
  }
};

// =============> Update doctor status <=============
export const updateDoctorStatus = async (req, res, next) => {
  try {
    const updatedData = await updateDoctorStatusService(
      req.params,
      req.body,
      req.user
    );

    res.status(200).json({
      message: "Doctor status updated successfully",
      updatedData,
    });
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
