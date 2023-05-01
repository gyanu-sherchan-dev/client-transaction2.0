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
    const { trans } = await getTrans();
    trans?.length && setTrans(trans);
  };
  console.log(trans);
  return (
    <Layout>
      <TransForm />
      <TransTable trans={trans} />
    </Layout>
  );
};

export default Dashboard;
