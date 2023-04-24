import React from "react";
import Layout from "../components/layout/Layout";
import TransForm from "../components/customForm/TransForm";
import TransTable from "../components/customTable/TransTable";

const Dashboard = () => {
  return (
    <Layout>
      <TransForm />
      <TransTable />
    </Layout>
  );
};

export default Dashboard;
