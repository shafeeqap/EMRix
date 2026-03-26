import React from "react";
import Button from "../../components/Button";

const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center px-10">
      <div className="bg-white w-full sm:w-[70%] md:w-80 px-5 py-10">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <form onSubmit={"handleSubmit"} className="space-y-5 mt-10">
          <div>
            <label className="block mt-4">Email</label>
            <input
              type="email"
              // value={formData.email}
              name="email"
              // onChange={(e) =>
              //   setFormData({ ...formData, email: e.target.value })
              // }
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mt-4">Password</label>
            <input
              type="password"
              // value={formData.password}
              name="password"
              // onChange={(e) =>
              //   setFormData({ ...formData, password: e.target.value })
              // }
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none"
            />
            <div className="text-end mt-1">
              <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-400">forgot password?</p>
            </div>
          </div>

          <Button varient="primary" calssName="w-full" size="md">
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
