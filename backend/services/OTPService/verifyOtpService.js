import { User } from "../../models/User.js";
import { hashOTP } from "../../utils/otp.js";

export const verifyOtpService = async (mobile, otp) => {
  const user = await User.findOne({ mobile });

  if (!user || !user.resetOtp) {
    throw new Error("Invalid request");
  }

  if (user.resetOtpExpire < Date.now()) {
    throw new Error("OTP expired");
  }

  if (user.resetOtpAttempts >= 5) {
    throw new Error("Too many attempts");
  }

  const hashedOtp = hashOTP(otp);

  if (hashedOtp !== user.resetOtp) {
    user.resetOtpAttempts += 1;
    await user.save();
    throw new Error("Invalid OTP");
  }

  // invalidate OTP
  user.resetOtp = undefined;
  user.resetOtpExpire = undefined;
  user.resetOtpAttempts = 0;

  await user.save();

  return user;
};
