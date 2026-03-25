import bcrypt from "bcryptjs";

export const hashValue = async (value) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(value, salt);
};

export const compareHash = async (plainValue, hashedValue) => {
  return await bcrypt.compare(plainValue, hashedValue);
};
