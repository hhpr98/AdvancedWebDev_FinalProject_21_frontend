import React, { useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { createAdmin } from './api';
import { useAuth } from '../Routes/Context';

const { Option } = Select;

export const AddNewAccount = props => {
  const { visible, setVisible, dataControll } = props;
  const [confirmLoading, setConfirm] = useState(false);
  const data = dataControll[0];
  const setData = dataControll[1];
  const [form] = Form.useForm();
  const { authTokens } = useAuth();

  const addComplete = res => {
    setConfirm(false);
    if (res.data.email !== undefined) {
      const temp = [...data];
      temp.push(res.data);
      setData(temp);
      message.success('Thêm thành công', 1, setVisible(false));
    } else {
      message.error('Chưa thêm được');
    }
  };
  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      setConfirm(true);
      createAdmin(authTokens.accessToken, values, addComplete);
    } catch (errorInfo) {
      console.log(errorInfo);
    }
  };
  const handleCancel = () => {
    setConfirm(false);
    setVisible(false);
  };

  return (
    <div>
      <Modal
        getContainer={false}
        title="Thêm admin mới"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onOk={onFinish}
      >
        <Form
          form={form}
          className="login-form"
          name="AddForm"
          initialValues={{ remember: true }}
          style={{ border: 'none' }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Email không hợp lệ!'
              }
            ]}
          >
            <Input
              placeholder="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ min: 6, required: true, message: 'Tên không hợp lệ!' }]}
          >
            <Input
              placeholder="Tên admin"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { min: 6, required: true, message: 'Password không hợp lệ' }
            ]}
          >
            <Input.Password
              placeholder="Mật khẩu"
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
