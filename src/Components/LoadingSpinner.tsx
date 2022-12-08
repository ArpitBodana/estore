import React from "react";
import { Spinner } from "react-bootstrap";

function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center p-5">
      <Spinner animation="border" className="">
        <span className="visually-hidden">Loading....</span>
      </Spinner>
    </div>
  );
}

export default LoadingSpinner;
