import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (err instanceof ZodError) {
    const issues = err.errors || err.issues || [];

    return res.status(400).json({
      success: false,
      errors: issues.map((e) => ({
        field: e.path?.[0] || "unknown",
        message: e.message,
      })),
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Intrnal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
