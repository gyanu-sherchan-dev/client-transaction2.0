import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import TransForm from "../components/customForm/TransForm";
import TransTable from "../components/customTable/TransTable";

import { getTrans } from "../utils/axiosHelper";

const Dashboard = () => {
  const [trans, setTrans] = useState([]);

  useEffect(() => {
    fetchTrans();
  }, []); //we leave this square bracket dependency empty, so that we can run this code only once.

  const fetchTrans = async () => {
    const { trans } = (await getTrans()) || [];
    // trans?.length && setTrans(trans) - this code says if there is no trans coming from server then no update, then what if you browser has to render, even if there is no trasaction, eg: incase of delete, if you delete all transaction and it still have to update the transdata in transtabel, hence if no trans update empty array.
    setTrans(trans);
  };

  return (
    <Layout>
      <TransForm fetchTrans={fetchTrans} />
      <div className="text-info fw-bold mb-1">
        {trans.length} transactions found
      </div>
      <TransTable trans={trans} fetchTrans={fetchTrans} />
    </Layout>
  );
};

export default Dashboard;
