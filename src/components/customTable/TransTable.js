import React from "react";
import Table from "react-bootstrap/Table";

const TransTable = ({ trans }) => {
  //tabel total
  const total = trans.reduce(
    (acc, { type, amount }) =>
      type === "income" ? acc + amount : acc - amount,
    0
  );

  return (
    <div className="transTable">
      <Table striped bordered hover>
        <thead>
          <tr>
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
                <td>{item.createdAt}</td>
                <td>{item.name}</td>
                {item.type === "income" ? (
                  <>
                    <td className="text-info">{item.amount}</td>
                    <td></td>
                  </>
                ) : (
                  <>
                    <td></td>
                    <td className="text-warning">- {item.amount}</td>
                  </>
                )}
              </tr>
            );
          })}

          <tr className="fw-bolder">
            <td colSpan={3}>Total Balance</td>
            <td className="text-dark">$ {total}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TransTable;
