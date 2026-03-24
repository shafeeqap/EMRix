import { forgotPasswordService } from "../services/passwordService/forgotPasswordService.js";

export const forgotPassword = async (req, res, next) => {
  try {
    const { mobile } = req.validatedData;

    console.log(mobile, 'Mobile number');
    
    await forgotPasswordService(mobile);

    res.json({
      success: true,
      message: "If account exists, OTP sent",
    });
  } catch (error) {
    next(error);
  }
};
