import React from "react";
import Form from "react-bootstrap/form";

export const CustomInput = ({ label, ...rest }) => {
  return (
    <div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{label}</Form.Label>
        <Form.Control {...rest} />
        {label === "Email" ? (
          <Form.Text className="text-dark">
            We'll never share your email with anyone else.
          </Form.Text>
        ) : (
          " "
        )}
      </Form.Group>
    </div>
  );
};
