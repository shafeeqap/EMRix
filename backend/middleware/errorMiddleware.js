import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || res.statusCode || 500;

  if (err instanceof ZodError) {
    const issues = err.errors || err.issues || [];

    return res.status(400).json({
      success: false,
      errors: issues.map((e) => ({
        field: e.path?.join("."),
        message: e.message,
      })),
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
