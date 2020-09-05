import React from 'react';
import DashboardCustomer from './DashboardCustomer/DashboardCustomer';
import { useAuth } from '../Routes/Context';
import DashboardEmployee from './DashboardEmployee/DashboardEmployee';


const Dashboard = () => {
  const { authTokens } = useAuth();
  return (
    <div>
      {authTokens.type === "user" ? <DashboardCustomer /> : <DashboardEmployee />}
    </div>
  );
};
export default Dashboard;
