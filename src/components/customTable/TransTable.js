import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import { deleteTrans } from "../../utils/axiosHelper";

const TransTable = ({ trans }) => {
  const [itemToDelete, setItemToDelete] = useState([]);

  const handleOnAllSelect = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setItemToDelete(
        trans.map(({ _id }) => {
          return _id;
        })
      );
    } else {
      setItemToDelete([]);
    }

    console.log(checked);
  };

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);

    // if checked is true, then add item to itemToDelete, if check is false then remove it from itemToDelete
    checked
      ? setItemToDelete([...itemToDelete, value])
      : setItemToDelete(itemToDelete.filter((_id) => _id !== value));
  };
  console.log(itemToDelete);
  //tabel total
  const total = trans.reduce(
    (acc, { type, amount }) =>
      type === "income" ? acc + amount : acc - amount,
    0
  );

  const handleOnDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${itemToDelete.length} transaction(s)`
      )
    ) {
      const result = await deleteTrans(itemToDelete);
      console.log(result);
    }
  };

  return (
    <div className="transTable">
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={handleOnAllSelect}
                checked={trans.length === itemToDelete.length}
              />
            </th>
            <th>Date</th>
            <th>Transaction</th>
            <th>Income</th>
            <th>Expenses</th>
          </tr>
        </thead>
        <tbody>
          {trans?.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <Form.Check
                    onChange={handleOnSelect}
                    type="checkbox"
                    value={item._id}
                    checked={itemToDelete.includes(item._id)}
                  />
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString()},</td>
                <td>{item.name}</td>
                {item.type === "income" ? (
                  <>
                    <td className="text-info">$ {item.amount}</td>
                    <td></td>
                  </>
                ) : (
                  <>
                    <td></td>
                    <td className="text-warning">-$ {item.amount}</td>
                  </>
                )}
              </tr>
            );
          })}

          <tr className="fw-bolder">
            <td colSpan={3}>Total Balance</td>
            <td colSpan={2} className="text-dark">
              $ {total}
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="d-grid  ">
        {itemToDelete.length ? (
          <Button
            className="fw-bolder text-danger"
            variant="info"
            onClick={handleOnDelete}
          >
            Delete {itemToDelete.length} items(s)
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default TransTable;
