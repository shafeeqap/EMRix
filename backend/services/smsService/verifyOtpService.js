import { User } from "../../models/User.js";
import { logAction } from "../../utils/auditLogger.js";
import { hashOTP } from "../../utils/otp.js";

export const verifyOtpService = async (mobile, otp) => {
  const user = await User.findOne({ mobile });

  if (!user || !user.resetOtp) {
    throw new Error("Invalid request");
  }

  // expiry check
  if (!user.resetOtpExpire || user.resetOtpExpire < Date.now()) {
    throw new Error("OTP expired");
  }

  // max attempts check
  if (user.resetOtpAttempts >= 5) {
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;
    user.resetOtpAttempts = 0;

    await user.save();

    throw new Error("Too many attempts. Request new OTP");
  }

  const hashedOtp = hashOTP(otp);

  if (hashedOtp !== user.resetOtp) {
    user.resetOtpAttempts += 1;
    await user.save();

    await logAction({
      userId: user?._id,
      action: "OTP_VERIFICATION_FAILED",
      metadata: { mobile },
    });

    throw new Error("Invalid OTP");
  }

  // invalidate OTP
  user.resetOtp = undefined;
  user.resetOtpExpire = undefined;
  user.resetOtpAttempts = 0;

  await user.save();

  return user;
};
