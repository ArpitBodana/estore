import React from "react";
import { Alert } from "react-bootstrap";
import { ErrorPropsTypes } from "../Types/Error";

function Error(props: ErrorPropsTypes) {
  return (
    <section className="m-3">
      <Alert className="" variant={props.variant}>
        {props.message}
      </Alert>
    </section>
  );
}

export default Error;
