import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Layout from "../components/layout/Layout";
import { CustomInput } from "../components/customInput/CustomInput";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Register = ({ registerbg }) => {
  const inputFields = [
    {
      label: "Name",
      placeholder: "John Doe",
      required: true,
      name: "name",
      type: "text",
    },
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

  const [formData, setFormData] = useState({});
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <Layout registerbg={registerbg}>
      <Form className="register-page" onSubmit={handleSubmit}>
        <h2>Register</h2>

        {inputFields.map((item, i) => {
          return <CustomInput key={i} {...item} onChange={handleChange} />;
        })}

        <Button variant="warning" type="submit">
          Submit
        </Button>
        <div className="mt-4 d-flex justify-content-start">
          <p className="me-4">Already have Account !</p>
          <Link to="/"> Login here.</Link>
        </div>
      </Form>
    </Layout>
  );
};
