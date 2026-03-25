import { User } from "../../models/User.js";
import { logAction } from "../../utils/auditLogger.js";
import { generateOTP, hashOTP } from "../../utils/otp.js";
import { sendSMS } from "../smsService/smsService.js";

export const forgotPasswordService = async (mobile, ip, deviceInfo) => {
  const user = await User.findOne({ mobile });

  if (!user) return;

  // ===== suspicious check =====
  const isNewIP = user.lastLoginIP && user.lastLoginIP !== ip;
  const isNewDevice =
    user.lastDevice && user.lastDevice !== deviceInfo?.browser?.name;

  const isSuspicious = isNewIP || isNewDevice;

  await logAction({
    userId: user._id,
    action: isSuspicious
      ? "SUSPICIOUS_PASSWORD_RESET"
      : "PASSWORD_RESET_REQUEST",
    entity: "User",
    entityId: user._id,
    ip,
    device: deviceInfo?.browser?.name,
  });

  // ===== generate OTP =====
  const otp = generateOTP();

  const hashedOtp = hashOTP(otp);

  const message = isSuspicious
    ? `OTP: ${otp}. Request from new device/location.`
    : `Your OTP is ${otp}`;

  try {
    await sendSMS(mobile, message);
  } catch (error) {
    console.error("SMS failed:", error.message);

    throw new Error("Failed to send OTP. Try again.");
  }

  user.resetOtp = hashedOtp;
  user.resetOtpExpire = Date.now() + 10 * 60 * 1000;
  user.resetOtpAttempts = 0;

  await user.save();
};
