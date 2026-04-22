import { toast } from "react-toastify";

export const handleApiError = (error, setError) => {
  const status = error?.status;
  const message =
    error?.data?.message || error?.error || "Something went wrong";

  // 1. Validation errors (field-level)
  if (status === 400 && error?.data?.errors) {
    error.data.errors.forEach((err) => {
      setError(err.field, {
        type: "server",
        message: err.message,
      });
    });
    return;
  }

  // 2. Auth errors
  if (status === 401) {
    setError("root", {
      type: "server",
      message,
    });
    toast.error(message);
    return;
  }

  // 3. Business logic errors
  if (status === 409) {
    toast.error(message);
    return;
  }

  toast.error(message);
  console.error(error);
};
