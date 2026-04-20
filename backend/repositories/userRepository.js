import { User } from "../models/User.js";

export const createUserRepo = async (data) => {
  return User.create(data);
};

export const findUserById = (id) => {
  return User.findById(id);
};

export const findUserOne = async (filter) => {
  return User.findOne(filter);
};

export const findUsers = async (filter, skip, limit) => {
  return User.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
};

export const findUsersBySearchQuery = (query) => {
  return User.find(query);
};

export const findUserByIdAndUpdate = async (id, updates, option) => {
  return User.findByIdAndUpdate(id, updates, option);
};

export const findUserByIdAndDelete = async (id) => {
  return User.findByIdAndDelete(id);
};

export const countUserDocuments = async(filter) => {
  return User.countDocuments(filter);
};
