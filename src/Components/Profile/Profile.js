import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Divider, Button } from 'antd';
import { useAuth } from '../Routes/Context';
import {FormChangePassword} from './ChangePassword/FormChangePassword';
import { getInfoUser } from './action';

function Profile() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState();
  const { authTokens } = useAuth();
  const { userData } = authTokens;
    // handle open form modal change password
    const handleCreate = () => {
      setVisible(false);
    };
    const handleCancel = () => {
      setVisible(false);
    };
    useEffect(() => {
      getInfoUser(authTokens.accessToken, userData.email, (res)=>{
        console.log(res);
        setInfo(res);
      });
    }, []);

  return (
    <Card title={
      <div
        style={{
          color: '#333',
          fontWeight: 800,
          textTransform: 'uppercase',
          marginTop: 4
        }}
      >
        Hồ Sơ
          </div>
    } style={{width : '50%', marginLeft: '25%'}}>
      <Form form={form}>
        <Row gutter={[8, 8]}>
          <Col flex="175px">
            <h4>Họ và Tên</h4>
          </Col>
          <Col flex="auto">
            <p>
             {userData?.name}
            </p>
          </Col>
          <Divider style={{ color: '#333', fontWeight: 'normal' }} />
        </Row>

        <Row gutter={[8, 8]}>
          <Col flex="175px" style={{ alignSelf: 'center' }}>
            <h4>Email</h4>
          </Col>
          <Col flex="auto">
          <p>
             {userData?.email}
            </p>
          </Col>
          <Divider
            orientation="center"
            style={{ color: '#333', fontWeight: 'normal' }}
          />
        </Row>
        <Row gutter={[8, 8]}>
          <Col flex="175px" style={{ alignSelf: 'center' }}>
            <h4>Số Điện thoại</h4>
          </Col>
          <Col flex="auto">
          <p>
             {info?.phonenumber}
            </p>
          </Col>
          <Divider
            orientation="center"
            style={{ color: '#333', fontWeight: 'normal' }}
          />
        </Row>
        <Row gutter={[8, 8]}>
          <Col flex="175px">
            <h4>Địa chỉ</h4>
          </Col>
          <Col flex="auto">
          <p>
             {info?.address}
            </p>
          </Col>
          <Divider
            orientation="center"
            style={{ color: '#333', fontWeight: 'normal' }}
          />
        </Row>
      </Form>
      <Row style={{ float: 'right' }}>
        <Col>
          <Button
            onClick={() => setVisible(true)}
            htmlType="submit"
            style={{
              float: 'right',
              background: '#F55D3E',
              border: '#F55D3E',
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            Đổi mật khẩu
            </Button>
          <FormChangePassword
            visible={visible}
            onCreate={handleCreate}
            onCancel={handleCancel}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default Profile;
