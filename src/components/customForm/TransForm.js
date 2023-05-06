import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { postTrans } from "../../utils/axiosHelper";

import { toast } from "react-toastify";

const intialState = {
  type: "",
  name: "",
  amount: "", // the data type you record in the form below is number and here you are passing string, conflict, hense null
};

const TransForm = ({
  fetchTrans,
  itemToDelete,
  setItemToDelete,
  checkbox,
  setCheckBox,
}) => {
  const [form, setForm] = useState(intialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { status, message } = await postTrans(form);
    // status === "success" ? toast.success(message) : toast.error(message);

    toast[status](message); // passing dynamically, same as above line
    status === "success" && fetchTrans();
    setCheckBox(false);
    setItemToDelete([]);

    //why we need initialState data.
    //let say we have done the call api to send data to database
    //after that reset the form
    //to reset call setform and pass the intialState and pass value in the form input field.
    setForm(intialState);
  };

  return (
    <div className="transForm">
      <Form onSubmit={handleOnSubmit}>
        <Row className="mt-3  gap-2">
          <Col md="2">
            <Form.Select
              name="type"
              value={form.type}
              required
              onChange={handleOnChange}
            >
              <option>Choose...</option>
              <option value="income">Income</option>
              <option value="expenses">Expenses</option>
            </Form.Select>
          </Col>
          <Col md="5">
            <Form.Control
              name="name"
              placeholder="Transaction Name"
              required
              onChange={handleOnChange}
              value={form.name}
            />
          </Col>
          <Col md="2">
            <Form.Control
              onChange={handleOnChange}
              name="amount"
              type="number"
              placeholder="Amount"
              required
              value={form.amount}
            />
          </Col>
          <Col md="2">
            <div className="d-grid">
              <Button type="submit">Add</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TransForm;
