import React, { useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import {  Col, Form, Input, Button, message, Row } from 'antd';
import { useDispatch } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAuth } from '../Routes/Context';

import './Login.css';
import { login, loginEmployee } from './action';
import {loginX} from '../../Reducers/Actions/authAction';


// eslint-disable-next-line no-unused-vars
const Login = (props) => {
  const [isLoading, setLoading] = useState(false);
  const {isEmployee} = props;
  const { authTokens,setAuthTokens } = useAuth();

  const dispatch = useDispatch();

  const loginFinish = res => {
    if (res.accessToken) {
      setAuthTokens(res);
      const action = loginX(res.userData);
      dispatch(action); 
    } else {
      message.error('Sai mật khẩu');
      setLoading(false);
    }
  };
  const loginClick = val => {
    setLoading(!isLoading);
    if(isEmployee){
      loginEmployee(val.username, val.password, loginFinish);
    } else {
      login(val.username, val.password, loginFinish);
    }
   
  };

  if (authTokens.accessToken) return <Redirect to="/dashboard" />;
  return (
        <div className="layout-login">
          <Col className="col-login" span={24} style={{ display: 'flex' }}>
            <Form className="login-form" name="basic" onFinish={loginClick}>
              <div style={{ textAlign: 'center', marginBottom: 50}}>
                <img alt="" src="bankicon.png" style={{ width: '100px' }} />
                <h3
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 5, 
                    color: 'rgba(0, 0, 0, 0.8)'
                  }}
                > {!isEmployee? "Đăng nhập vào Hệ thống Monca Banking" : "Đăng nhập dành cho nhân viên"}
                </h3>
              </div>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Vui lòng nhập email' }]}
              >
                <Input
                  size='small'
                  name="username"
                  placeholder="Email"
                  style={{
                      borderRadius: 25,
                      borderWidth: 2,
                  }}
                  prefix={
                    <MailOutlined
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
              >
                <Input.Password
                  size='small'
                  name="password"
                  placeholder="Password"
                  style={{
                      borderRadius: 25,
                      borderWidth: 2,
                  }}
                  prefix={
                    <LockOutlined
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                />
              </Form.Item>
              <Form.Item  name="recaptcha"
                rules={[{ required: true, message: 'Captcha không đúng' }]}
              >
                <ReCAPTCHA
                      sitekey="6LefHbUZAAAAALh8oMYUOqZbSjSHAugla1527pN0"
                      locale="en"
                  />
              </Form.Item>
                  <Row justify = "space-between" align="middle">
                  <Col style={{height: '40px'}}>
                    {!isEmployee ? (
                        <Link
                          to="/forgot"
                          style={{
                            fontSize: '15px',
                            color: '#F55D3E',
                            fontWeight: 'bold', 
                          }}
                        >
                          Quên mật khẩu ?
                        </Link>
                      
                      ) : (' ')}
                    </Col>
                    <Col>
                        <Form.Item>
                          <Button
                          className="custom-button"
                          type="primary"
                          htmlType="submit"
                          loading={isLoading}
                          style={{ float: 'right'}}
                        >
                          Đăng nhập
                          </Button>
                        </Form.Item>
                      </Col>
                  </Row>
            </Form>
          </Col>
        </div>
  );
};

export default Login;
