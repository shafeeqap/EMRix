import { resetPasswordService } from "../services/passwordService/resetPasswordService.js";
import { getClientIP } from "../utils/getClientIP.js";
import { getDeviceInfo } from "../utils/getDeviceInfo.js";

export const resetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.validatedData;

    const ip = getClientIP(req);
    const deviceInfo = getDeviceInfo(req);

    await resetPasswordService(req.user, newPassword, ip, deviceInfo);

    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};
