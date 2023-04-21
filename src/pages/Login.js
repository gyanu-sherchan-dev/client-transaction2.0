import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Layout from "../components/layout/Layout";
import { CustomInput } from "../components/customInput/CustomInput";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const inputFields = [
    {
      label: "Email",
      placeholder: "your@gmail.com",
      required: true,
      name: "email",
      type: "email",
    },
    {
      label: "Pin",
      placeholder: "1234",
      required: true,
      name: "pin",
      type: "number",
      min: 1000,
      max: 9999,
    },
  ];

  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...value,
      [name]: value,
    });
  };

  return (
    <Layout>
      <Form className="login-page">
        <h3 className="mb-4">Welcome Back !!</h3>

        {inputFields.map((item, i) => {
          return <CustomInput key={i} {...item} onChange={handleOnChange} />;
        })}

        <Button variant="warning" type="submit">
          Submit
        </Button>

        <div className="mt-4 d-flex justify-content-start">
          <p className="me-4">New here</p>
          <Link to="/register"> Register here !!</Link>
        </div>
      </Form>
    </Layout>
  );
};
