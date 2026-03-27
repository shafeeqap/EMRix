import React, { useState } from "react";
import Button from "../../components/Button";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "formdata");

    try {
      const res = await login(formData).unwrap();
      console.log(res, "res...");
      dispatch(
        setCredentials({
          user: res.user,
          accessToken: res.accessToken,
        })
      );

      navigate("/dashboard");
    } catch (error) {
      if (error?.status === 400 && error?.data?.errors) {
        const fieldErrors = {};

        error.data.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });

        setErrors(fieldErrors);
      } else {
        console.error(error);
      }
    }
  };

  console.log(formData, "formdata...");

  return (
    <div className="min-h-screen flex justify-center items-center px-10">
      <div className="bg-white w-full sm:w-[70%] md:w-80 px-5 py-10">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-5 mt-10">
          <div>
            <label className="block mt-4">Email</label>
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors((prev) => ({ ...prev, email: null }));
              }}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mt-4">Password</label>
            <input
              type="password"
              value={formData.password}
              name="password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });

                setErrors((prev) => ({ ...prev, password: null }));
              }}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            <div className="text-end mt-1">
              <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-400">
                forgot password?
              </p>
            </div>
          </div>

          <Button
            type="submit"
            varient="primary"
            calssName="w-full"
            size="md"
            isLoading={isLoading}
          >
            Login
          </Button>
        </form>
        {/* <p className="text-sm text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="link link-primary">
          <span className="text-blue-500">Sign up</span>
        </Link>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
