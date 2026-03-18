import Session from "../models/Session.js";

export const createSessionRepo = async (data) => {
  return Session.create(data);
};

export const findSession = (id) => {
  return Session.find(id);
};

export const deleteSessionRepo = async (id) => {
  return Session.deleteOne(id);
};
