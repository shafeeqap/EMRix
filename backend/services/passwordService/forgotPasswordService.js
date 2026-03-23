import { User } from "../../models/User.js";
import { logAction } from "../../utils/auditLogger.js";
import { getClientIP } from "../../utils/getClientIP.js";
import { getDeviceInfo } from "../../utils/getDeviceInfo.js";
import { generateOTP, hashOTP } from "../../utils/otp.js";
import { sendOTP } from "../OTPService/smsService.js";

export const forgotPasswordService = async (mobile) => {
  const user = await User.findOne({ mobile });

  if (!user) return;

  const otp = generateOTP();
  const hashedOtp = hashOTP(otp);

  const ip = getClientIP(req);
  const deviceInfo = getDeviceInfo();

  user.resetOtp = hashedOtp;
  user.resetOtpExpire = Date.now() + 10 * 60 * 1000; // 10 mins
  user.resetOtpAttempts = 0;

  user.lastLoginIP = ip;
  user.lastDevice = deviceInfo.browser.name;
  await user.save();

  await sendOTP(mobile, otp);

  await logAction({
    userId: user._id,
    action: "PASSWORD_RESET_REQUEST",
    ip,
    device: deviceInfo,
  });
};
