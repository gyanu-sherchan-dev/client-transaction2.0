import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Layout from "../components/layout/Layout";
import { CustomInput } from "../components/CustomInput";

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

  return (
    <Layout>
      <Form className="login-page">
        <h3 className="mb-4">Welcome Back !!</h3>

        {inputFields.map((item, i) => {
          return <CustomInput key={i} {...item} />;
        })}

        <Button variant="warning" type="submit">
          Submit
        </Button>

        <div className="mt-4 d-flex justify-content-start">
          <p className="me-4">New here</p>
          <a href="/register"> Register here !!</a>
        </div>
      </Form>
    </Layout>
  );
};
