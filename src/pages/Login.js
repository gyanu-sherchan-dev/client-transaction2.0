import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Layout from "../components/layout/Layout";
import { CustomInput } from "../components/customInput/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../utils/axiosHelper";

export const Login = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState({});
  const [form, setForm] = useState({
    email: "",
    pin: "",
  });

  // useEffect(() => {
  //   navigate("/dashboard");
  // }, []);
  const inputFields = [
    {
      label: "Email",
      placeholder: "your@gmail.com",
      required: true,
      name: "email",
      type: "email",
      value: form.email,
    },
    {
      label: "Pin",
      placeholder: "****",
      required: true,
      name: "pin",
      type: "number",
      value: form.pin,
      min: 1000,
      max: 9999,
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    const { data } = await loginUser(form);
    setResponse(data);
    if (data.status === "success") {
      sessionStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    }
  };

  return (
    <Layout>
      <Form className="login-form" onSubmit={handleSubmit}>
        <h3 className="mb-4">Welcome Back !!</h3>

        {response.status === "error" && (
          <Alert variant={response.status === "error" && "danger"}>
            {response.message}
          </Alert>
        )}

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
