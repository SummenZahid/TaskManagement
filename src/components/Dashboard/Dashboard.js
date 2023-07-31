import React, { useEffect } from 'react';
import Form from '../TaskForm/Form';
import List from '../TaskList/List';
import FixedNavbar from '../NavBar/NavBar';
const Dashboard = (props) => {
  return (
   <>
    <FixedNavbar />
    <Form />
    <List />
   </>
  );
};

export default Dashboard;
