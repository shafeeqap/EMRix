import { verifyOtpService } from "../services/smsService/verifyOtpService.js";
import { resetCookieOptions } from "../utils/cookieOptions.js";
import jwt from "jsonwebtoken";

export const verifyOTP = async (req, res, next) => {
  try {
    const { mobile, otp } = req.validatedData;

    const user = await verifyOtpService(mobile, otp);

    const resetToken = jwt.sign(
      { id: user._id, type: "reset" },
      process.env.JWT_RESET_SECRET,
      { expiresIn: "10m" }
    );

    res.cookie("resetToken", resetToken, resetCookieOptions);

    res.json({
      success: true,
      resetToken: resetToken, // to test in Postman.
      message: "OTP verified",
    });
  } catch (error) {
    next(error);
  }
};
