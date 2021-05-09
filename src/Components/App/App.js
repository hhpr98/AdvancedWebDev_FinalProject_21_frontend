/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import { Provider as StoreProvider } from 'react-redux';
import { Login } from '../Login';
import { AuthContext } from '../Routes/Context';
import { AdminLayout } from '../AdminLayout';
import { Dashboard } from '../Dashboard';
import { AdminManagement } from '../AdminManagement';
import { PrivateRoute } from '../Routes/PrivateRoute';
import { Transfers } from '../Transfers';
import './App.css';
import './app.scss';
import { PublicRoute } from '../Routes/PublicRoute';
import Welcome from '../WelCome/Welcome';
import { UserHistory } from '../LichSuNguoiDung';
import { TransactionHistory } from '../LichSuGiaoDich';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import { RechargeAccount } from "../NapTien";
import { CreateSaveAccount } from "../TaoTaiKhoanTietKiem";
import { CreateNewCustomer } from "../TaoTaiKhoanNguoiDung";
import { Receivers } from '../Receivers';
import { TransactionList } from '../DanhSachGiaoDich';
import DebtReminder from '../QuanLiNhacNo/QuanLiNhacNo';
import ViewDebtBeReminder from '../XemDanhSachBiNhacNo/ViewDebtBeReminder';
import Profile from '../Profile/Profile';
import store from '../../Store/store';

function App() {
  const [authTokens, setAuthTokens] = useState('');
  if (localStorage.getItem('tokens') && authTokens === '') {
    try {
      setAuthTokens(JSON.parse(localStorage.getItem('tokens')));
    } catch {
      console.log('err');
    }
  }
  const setTokens = data => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  useEffect(() => {
    const validateAccessToken = () => {
      console.log('validateAccessToken');
      const accessTokenX = authTokens?.accessToken;
      if (accessTokenX && jwtDecode(accessTokenX).exp < Date.now() / 1000) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi rồi ...',
          text: 'Hết phiên đăng nhập, vui lòng đăng nhập lại để tiếp tục',
          confirmButtonColor: '#eb5757',
          confirmButtonText: 'Đồng Ý'
        }).then(() => {
          setAuthTokens(false);
          localStorage.removeItem('tokens');
        });
      }
    };
    validateAccessToken();
  }, []);
  return (
    <StoreProvider store={store}>
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Router>
          <Switch>
            <Route exact path="/">
              {!authTokens ? <Welcome /> : <Redirect to="/dashboard" />}
            </Route>
            <Route
              exact
              path="/welcome"
              render={() => <Welcome />}
            />
            <PublicRoute
              exact
              path="/login"
              render={() => <Login />}
            />
            <PublicRoute
              exact
              path="/forgot"
              render={() => <ForgotPassword />}
            />
            <PublicRoute
              exact
              path="/login-employee"
              render={() => <Login isEmployee />}
            />
            {/* <PrivateRoute
            exact
            path="/"
            render={() => <AdminLayout Child={<Dashboard />} />}
          /> */}
            <PrivateRoute
              exact
              path="/dashboard"
              render={() => <AdminLayout Child={<Dashboard />} />}
            />
            <PrivateRoute
              exact
              path="/chuyen-tien"
              render={() => <AdminLayout Child={<Transfers />} />}
            />
            <PrivateRoute
              exact
              path="/danh-sach-nguoi-nhan"
              render={() => <AdminLayout Child={<Receivers />} />}
            />
            <PrivateRoute
              exact
              path="/lich-su-nguoi-dung"
              render={() => <AdminLayout Child={<UserHistory />} />}
            />
            <PrivateRoute
              exact
              path="/nhac-no"
              render={() => <AdminLayout Child={<DebtReminder />} />}
            />
            <PrivateRoute
              exact
              path="/xem-danh-sach-bi-nhac-no"
              render={() => <AdminLayout Child={<ViewDebtBeReminder />} />}
            />
            <PrivateRoute
              exact
              path="/ho-so"
              render={() => <AdminLayout Child={<Profile />} />}
            />
            <PrivateRoute
              exact
              path="/nap-tien"
              render={() => <AdminLayout Child={<RechargeAccount />} />}
            />
            <PrivateRoute
              exact
              path="/lich-su-giao-dich"
              render={() => <AdminLayout Child={<TransactionHistory />} />}
            />
            <PrivateRoute
              exact
              path="/danh-sach-giao-dich"
              render={() => <AdminLayout Child={<TransactionList />} />}
            />
            <PrivateRoute
              exact
              path="/quan-ly-admin"
              render={() => <AdminLayout Child={<AdminManagement />} />}
            />
            <PrivateRoute
              exact
              path="/tao-tai-khoan-nguoi-dung"
              render={() => <AdminLayout Child={<CreateNewCustomer />} />}
            />
            <PrivateRoute
              exact
              path="/tao-tai-khoan-tiet-kiem"
              render={() => <AdminLayout Child={<CreateSaveAccount />} />}
            />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </StoreProvider>
  );
}

export default App;