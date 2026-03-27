import { hashValue } from "../../utils/hashUtils.js";

export const resetPasswordService = async (
  user,
  newPassword,
  ip,
  deviceInfo
) => {
  const hashedPassword = await hashValue(newPassword);

  user.password = hashedPassword;

  // invalidate OTP
  user.resetOtp = undefined;
  user.resetOtpExpire = undefined;
  user.resetOtpAttempts = 0;

  const browser = deviceInfo?.browser?.name || "Unknown Browser";
  const os = deviceInfo?.os?.name || "Unknown OS";
  const deviceType = deviceInfo?.device?.type || "desktop";

  user.lastLoginIP = ip;
  user.lastDevice = `${browser} on ${os} (${deviceType})`;
  await user.save();
};
