import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Layout from "../components/layout/Layout";
import { CustomInput } from "../components/customInput/CustomInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import { postUser } from "../utils/axiosHelper";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    //now formData is the data we want to send to backend when we click submit. hence we going to call the axios function on handleOnSubmit.
    const { data } = await postUser(formData); // this one will receive the promise pending, lets say we going to pass the result into result variable and we going to wait.
    console.log(data); // now if we check in the network tab, use Fetch/XHR, input data in the frontend and submit, when you submit, you may get Cors issue, it says your application is serving from PORT 3000, and you making API to PORT 8000, there is something going on and it doesnot like it. to fix the issue you need to go to server.js and use Cors, it will allow to access cross orgin request
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
