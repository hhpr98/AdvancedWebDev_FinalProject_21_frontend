import React, { useState } from 'react';
import {MailOutlined, LockOutlined, StarOutlined  } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {  Col, Form, Input, Button, message } from 'antd';
import { sendMail, verifyOTP, resetPassword } from './action';

const ForgotPassword=()=> {
  const [isNext, setNext] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState(''); 
  const history = useHistory();

  const completeSendMail =(status, messages)=>{
    setLoading(false);
    if(status){
      setNext(true);
      message.success(messages);
    }
    else {
      message.error(messages);
    } 
  };
  // const completeVerifyOTP = (status, messages) =>{
  //   if(status){
  //     setTrue(true);
  //     message.success(messages);
  //   }
  //   else {
  //     message.error(messages);
  //   } 
  // };
  const completeReset =(status, messages)=>{
    setLoading(false);
    if(status){
      message.success(messages);
      history.push('/login');
    }
    else {
      message.error(messages);
    } 
  };
  const forgotClick =(val)=>{
    setLoading(true);
    if(!isNext){
      setEmail(val.username);
      sendMail(val.username, completeSendMail);
    }
    else {
      verifyOTP(val.otp, email)
      .then(response => response.json())
      .then(res => {
        if(res.status === "success"){
          resetPassword(email, val.password, completeReset);
        }
        else {
          message.error(res.err);
        } 
      });
    }
  };
  return (
    <div className="layout-login">
          <Col className="col-login" span={24} style={{ display: 'flex' }}>
            <Form className="login-form" name="basic" onFinish={forgotClick}>
            <div style={{ textAlign: 'center', marginBottom: 50}}>
                <h3
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 5, 
                    color: 'rgba(0, 0, 0, 0.8)'
                  }}
                > {!isNext ? "Nhập email để xác nhận" : "Thay đổi mật khẩu"}
                </h3>
              </div>
              {
                !isNext ? (
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
                ):(
                  <>
                  <Form.Item
                    name="otp"
                    rules={[{ required: true, message: 'Vui lòng nhập mã OTP' }]}
                  >
                    <Input
                      size='small'
                      name="otp"
                      placeholder="Mã OTP"
                      maxLength={10}
                      type='number'
                      style={{
                          borderRadius: 25,
                          borderWidth: 2,
                      }}
                      prefix={
                        <StarOutlined 
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                  />
                  </Form.Item>
                  <Form.Item
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' },  {
                  min: 6,
                  message: 'Mật khẩu có độ dài ít nhất 6 kí tự'
                }]}
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
                  <Form.Item
                name="checkPassword"
                dependencies={['password']}
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp'));
                  }
                })]}
              >
                <Input.Password
                  size='small'
                  name="password"
                  placeholder="Xác nhận lại password"
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
                  </>
                )
              }
                  <Form.Item>
                    <Button
                      className="custom-button"
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                      style={{ float: 'right'}}
                    >
                      Tiếp Tục
                    </Button>
                </Form.Item>
            </Form>
          </Col>
        </div>
  );
};

export default ForgotPassword;
