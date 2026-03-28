import React, { useState } from "react";
import Button from "../../components/Button";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validator/authValidator";
import { handleApiError } from "../../utils/handleApiError";
import InputField from "../../components/InputField";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(
        setCredentials({
          user: res.user,
          accessToken: res.accessToken,
        })
      );

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      handleApiError(error, setError);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-10">
      <div className="bg-white w-full sm:w-[70%] md:w-80 px-5 py-10">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-10">
          <div>
            <InputField
              label="Email"
              type="email"
              error={errors.email}
              {...register("email")}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none"
            />
          </div>

          <div className="relative">
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              error={errors.password}
              {...register("password")}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none"
            />
            <div
              onClick={handleShowPassword}
              className="absolute top-10 right-2 cursor-pointer"
            >
              {showPassword ? <VscEye size={20} /> : <VscEyeClosed size={20} />}
            </div>
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
