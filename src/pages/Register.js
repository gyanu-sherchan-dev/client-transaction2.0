import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Layout from "../components/layout/Layout";
import { CustomInput } from "../components/CustomInput";

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
  return (
    <Layout registerbg={registerbg}>
      <Form className="register-page">
        <h2>Register</h2>

        {inputFields.map((item, i) => {
          return <CustomInput key={i} {...item} />;
        })}

        <Button variant="warning" type="submit">
          Submit
        </Button>
      </Form>
    </Layout>
  );
};
