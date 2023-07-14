import React from "react";
import { useEffect } from "react";
import { PageColor } from "../../../components/AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";

const Pomotions = () => {
  useEffect(() => {
    PageColor("rgb(31 41 55)");
  }, []);

  return <div>Pomotions</div>;
};

export default Pomotions;
