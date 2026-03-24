import { hashValue } from "../../utils/hashUtils.js";

export const resetPasswordService = async (
  user,
  newPassword,
  ip,
  deviceInfo
) => {
  // const user = await verifyOTP(mobile, otp);

  const hashedPassword = await hashValue(newPassword);

  user.password = hashedPassword;

  // invalidate OTP
  user.resetOtp = undefined;
  user.resetOtpExpire = undefined;
  user.resetOtpAttempts = 0;

  user.lastLoginIP = ip;
  user.lastDevice = deviceInfo.browser.name;

  await user.save();
};
