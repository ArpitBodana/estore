import React from "react";
import { Helmet } from "react-helmet-async";

function PageNotFound() {
  return (
    <div className="text-center d-flex flex-grow-1">
      <Helmet>
        <title>404 Not found</title>
      </Helmet>
      <h1 className="my-4"> 404 Page Not Found</h1>
    </div>
  );
}

export default PageNotFound;
