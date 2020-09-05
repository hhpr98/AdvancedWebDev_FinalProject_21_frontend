import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { updateAdmin } from './api';
import { useAuth } from '../Routes/Context';

export const UpdateAdmin = props => {
  const { visible, setVisible, dataControll, oldData } = props;
  const [confirmLoading, setConfirm] = useState(false);
  const data = dataControll[0];
  const setData = dataControll[1];
  const [form] = Form.useForm();
  const { authTokens } = useAuth();

  const updateComplete = res => {
    setConfirm(false);
    if (res) {
      const temp = [...data];
      const findID = element => element.email === res.data.email;
      temp[temp.findIndex(findID)] = res.data;
      setData(temp);
      message.success('Sửa thành công', 1, setVisible(false));
    } else {
      message.error('Không thể sửa');
    }
  };
  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      setConfirm(true);
      updateAdmin(authTokens.accessToken, values, updateComplete);
    } catch (errorInfo) {
      console.log(errorInfo);
    }
  };
  const handleCancel = () => {
    setConfirm(false);
    setVisible(false);
  };

  const onFill = params => {
    form.setFieldsValue({
      id: params.id,
      name: params.name,
      email: params.email,
      ruleAccess: params.ruleAccess
    });
  };

  useEffect(() => {
    onFill(oldData);
  });

  return (
    <div>
      <Modal
        getContainer={false}
        title="Cập nhật"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onOk={onFinish}
      >
        <Form
          form={form}
          name="UpdateForm"
          className="login-form"
          initialValues={{ remember: true }}
          style={{ border: 'none' }}
        >
          <Form.Item name="id" style={{ display: 'none' }}>
            <Input />
          </Form.Item>

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
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={oldData.email}
              disabled
            />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ min: 6, required: true, message: 'Họ tên phải hơn 6 kí tự!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={oldData.name} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
