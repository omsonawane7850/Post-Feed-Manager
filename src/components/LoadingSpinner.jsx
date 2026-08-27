import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border text-primary spinner "
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
