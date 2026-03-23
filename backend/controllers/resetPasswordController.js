import { resetPasswordService } from "../services/passwordService/resetPasswordService.js";

export const resetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.validatedData;

    await resetPasswordService(req.user, newPassword);

    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};
