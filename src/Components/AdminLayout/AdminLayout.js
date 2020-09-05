/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Layout, Avatar, Menu, Dropdown } from 'antd';
import { useDispatch } from 'react-redux';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import './AdminLayout.css';
import { MenuLeft } from './MenuLeft';
import { useAuth } from '../Routes/Context';
import { logoutX } from '../../Reducers/Actions/authAction';

const { Header, Sider } = Layout;

const AdminLayout = props => {
  const { Child } = props;
  const { setAuthTokens } = useAuth();
  const dispatch = useDispatch();
  const logOut = () => {
    setAuthTokens(false);
    localStorage.removeItem('tokens');
    const action = logoutX();
    dispatch(action); 
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={logOut}>Đăng xuất</Menu.Item>
    </Menu>
  );

  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
  const [collapsed, setCollapsed] = useState(isSmallScreen);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="body-layout">
      <Sider
        className="sider"
        trigger={null}
        collapsible
        style={{height:'100vh'}}
        collapsed={collapsed || isSmallScreen}
      >
        <div style={{ display: 'flex' }} onClick={toggle}>
          <img
            id="sm-logo"
            className="logo1"
            src="/bankicon.png"
            alt="logo"
            style={{
              objectFit: 'cover',
              objectPosition: '0 0',
              width: collapsed ? 58 : 140,
              height: 60,
              transition: 'width 0.2s'
            }}
          />
        </div>

        <MenuLeft />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: 'right' }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
              style: { float: 'left' }
            }
          )}

          {/* <LoginOutlined style={{  float:'right', }} onClick={logOut} /> */}
          <Dropdown overlay={menu}>
            <Avatar
              style={{ backgroundColor: '#f55d3e', marginRight: '40px' }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </Header>

        <div
          className="site-layout-background"
          style={{
            margin: 24,
            padding: 24
          }}
        >
          {Child}
        </div>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;