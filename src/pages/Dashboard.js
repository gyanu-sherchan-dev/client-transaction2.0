import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import TransForm from "../components/customForm/TransForm";
import TransTable from "../components/customTable/TransTable";

import { getTrans } from "../utils/axiosHelper";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [trans, setTrans] = useState([]);
  const [itemToDelete, setItemToDelete] = useState([]);
  const [checkbox, setCheckBox] = useState(false);

  useEffect(() => {
    fetchTrans();
    const user = JSON.parse(sessionStorage.getItem("user"));
    !user && navigate("/");
  }, []); //we leave this square bracket dependency empty, so that we can run this code only once.

  const fetchTrans = async () => {
    const { trans } = (await getTrans()) || [];
    // trans?.length && setTrans(trans) - this code says if there is no trans coming from server then no update, then what if you browser has to render, even if there is no trasaction, eg: incase of delete, if you delete all transaction and it still have to update the transdata in transtabel, hence if no trans update empty array.
    setTrans(trans);
  };

  return (
    <Layout>
      <TransForm
        fetchTrans={fetchTrans}
        itemToDelete={itemToDelete}
        setItemToDelete={setItemToDelete}
        checkbox={checkbox}
        setCheckBox={setCheckBox}
      />
      <div className="text-info fw-bold mb-1">
        {trans.length} transactions found
      </div>
      <TransTable
        trans={trans}
        fetchTrans={fetchTrans}
        itemToDelete={itemToDelete}
        setItemToDelete={setItemToDelete}
        checkbox={checkbox}
        setCheckBox={setCheckBox}
      />
    </Layout>
  );
};

export default Dashboard;
