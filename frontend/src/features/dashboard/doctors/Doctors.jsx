import React from "react";
import Table from "../../../components/table/Table";
import { Columns } from "./config/columns";
import { useGetDoctorsQuery } from "./doctorsApiSlice";

const Doctors = () => {
  const { data, isLoading, error } = useGetDoctorsQuery();
  console.log(data, "doctorsData");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      <Table columns={Columns} data={data || []} />
    </div>
  );
};

export default Doctors;
