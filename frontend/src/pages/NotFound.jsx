import React from "react";
import { SmilePlus } from "lucide-react";
import { Button } from "../components/ui";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="min-h-[400px] w-[70%] flex flex-col justify-center items-center sm:items-start gap-5 py-10 px-14 bg-primary">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between w-full">
          <div className="text-white space-y-5 sm:space-y-0">
            <h1 className="text-5xl">ERROR</h1>
            <h1 className="font-bold text-3xl sm:text-7xl">404</h1>
            <p className="font-semibold text-xl">
              Change the path if the destination is not found!
            </p>
          </div>
          <SmilePlus size={150} className="text-white" />
        </div>

        <Button
          onClick={() => navigate("/")}
          variant="secondary"
          className="w-40"
        >
          Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
