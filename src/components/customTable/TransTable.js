import React from "react";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import { deleteTrans } from "../../utils/axiosHelper";
import { toast } from "react-toastify";

const TransTable = ({
  trans,
  fetchTrans,
  itemToDelete,
  setItemToDelete,
  setCheckBox,
  checkbox,
}) => {
  // const [itemToDelete, setItemToDelete] = useState([]);
  // const [checkbox, setCheckBox] = useState(false);

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;
    // console.log({ checked });
    // if checked is true, then add item to itemToDelete, if check is false then remove it from itemToDelete

    if (checked) {
      // console.log([...itemToDelete, value], value, trans.length);
      setItemToDelete([...itemToDelete, value]);

      setCheckBox(trans.length === itemToDelete.length + 1);
    } else {
      setItemToDelete(itemToDelete.filter((_id) => _id !== value));
      setCheckBox(false);
    }
  };
  const handleOnAllSelect = (e) => {
    setCheckBox(!checkbox);
    if (!checkbox) {
      //  console.log(itemToDelete);
      setItemToDelete(trans.map(({ _id }) => _id));
    } else {
      setItemToDelete([]);
      setCheckBox(false);
    }
  };
  console.log(itemToDelete.length);

  //tabel total
  const total = trans.reduce(
    (acc, { type, amount }) =>
      type === "income" ? acc + amount : acc - amount,
    0
  );

  const handleOnDelete = async (e) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${itemToDelete.length} transaction(s )`
      )
    ) {
      const result = await deleteTrans(itemToDelete);
      const { status, message } = result;
      if (status === "success") {
        setItemToDelete([]);
        await fetchTrans();
        console.log(trans);
        setCheckBox(false);
        // trans.length === 0 && setCheckBox(false);
      }
      toast[status](message);
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
                checked={checkbox}
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
            <td colSpan={2} className="fw-bolder">
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
