import Appointment from "../models/Appointment.js";

export const createAppointmentRepo = async (data) => {
  return Appointment.create(data);
};

export const findAppointmentById = async (id) => {
  return Appointment.findById(id);
};

export const findAppointment = (filter) => {
  return Appointment.find(filter)
    .populate("doctorId", "firstName lastName")
    .populate("patientId", "name")
    .sort({ createdAt: -1 });
};

export const getAppointment = async ({ search, status, skip, limit }) => {
  const isNumeric = /^\d+$/.test(search);

  const pipeline = [
    // Join Patient
    {
      $lookup: {
        from: "patients",
        localField: "patientId",
        foreignField: "_id",
        as: "patient",
      },
    },
    { $unwind: "$patient" },

    // Join Doctor
    {
      $lookup: {
        from: "doctors",
        localField: "doctorId",
        foreignField: "_id",
        as: "doctor",
      },
    },
    { $unwind: "$doctor" },

    {
      $match: { status: { $in: ["booked", "arrived", "cancelled"] } },
    },

    {
      $project: {
        _id: 1,
        status: 1,
        date: 1,
        slotTime: 1,
        tokenNumber: 1,
        notes: 1,
        createdAt: 1,
        "patient.name": 1,
        "patient.mobile": 1,
        "patient.age": 1,
        "patient.patientId": 1,
        doctor: { firstName: 1, lastName: 1 },
        "doctor.department": 1,
      },
    },
  ];

  const matchConditions = [];

  if (search) {
    matchConditions.push({
      $or: [
        { "patient.name": { $regex: search, $options: "i" } },
        { "patient.patientId": { $regex: search, $options: "i" } },
        ...(isNumeric
          ? [
              { "patient.mobile": { $regex: search } },
              { "patient.age": { $regex: search } },
            ]
          : []),
      ],
    });
  }

  if (status) {
    matchConditions.push({ status });
  }

  if (matchConditions.length) {
    pipeline.push({ $match: { $and: matchConditions } });
  }

  pipeline.push(
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit }
  );

  const appointments = await Appointment.aggregate(pipeline);

  const countPipeline = [...pipeline.filter((p) => !p.$skip && !p.$limit)];
  countPipeline.push({ $count: "total" });

  const countResult = await Appointment.aggregate(countPipeline);
  const total = countResult[0]?.total || 0;

  return { appointments, total };
};

export const findAppointmentDetails = (patientId) => {
  return Appointment.find({ patientId })
    .populate("doctorId", "firstName lastName")
    .populate("patientId", "name")
    .sort({ createdAt: -1 });
};

export const findAppointmentByIdAndUpdate = (id, update, options) => {
  return Appointment.findByIdAndUpdate(id, update, options);
};

export const findAppointmentByIdAndDelete = async (id) => {
  return Appointment.findByIdAndDelete(id);
};

export const findAppointmentOne = async (filter) => {
  return Appointment.findOne(filter);
};

export const countAppointmentDocuments = async (filter) => {
  return Appointment.countDocuments(filter);
};
