import React from "react";
import FadeLoader from "./../../../node_modules/react-spinners/esm/FadeLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#295F98",
  height: "50px",
  width: "20px",
};
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <FadeLoader
        color="#295F98"
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
