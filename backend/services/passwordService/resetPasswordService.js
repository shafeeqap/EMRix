import { hashValue } from "../../utils/hashUtils.js";


export const resetPasswordService = async (user, newPassword) => {
  // const user = await verifyOTP(mobile, otp);
  

  const hashedPassword = await hashValue(newPassword);

  user.password = hashedPassword;

  // invalidate OTP
  user.resetOtp = undefined;
  user.resetOtpExpire = undefined;
  user.resetOtpAttempts = 0;

  await user.save();
};
