import React from "react";
import { useEffect } from "react";
import { PageColor } from "../../../components/AnotherComponentsAndFunctions";

const Dashboard = () => {
  useEffect(() => {
    PageColor("rgb(31 41 55)");
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
