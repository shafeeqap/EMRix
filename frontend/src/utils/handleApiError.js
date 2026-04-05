import { toast } from "react-toastify";

export const handleApiError = (error, setError) => {
  if (error?.status === 400 && error?.data?.errors) {
    error.data.errors.forEach((err) => {
      setError(err.feild, {
        type: "server",
        message: err.message,
      });
    });
  } else if (error?.status === 401) {
    const message = error?.data?.message || "Invalid credentials";

    setError("root", {
      type: "server",
      message,
    });
    toast.error(message);
  } else {
    toast.error("Something went wrong");
    console.error(error);
  }
};
