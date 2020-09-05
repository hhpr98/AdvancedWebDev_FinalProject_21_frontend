import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { resetPassword } from './api';
import { useAuth } from '../Routes/Context';

export const ResetPasswordModal = props => {
  const { visible, setVisible, id, oldData } = props;
  const [confirmLoading, setConfirm] = useState(false);
  const [form] = Form.useForm();
  const { authTokens } = useAuth();

  const resetComplete = res => {
    if (res) {
      message.success('Cấp lại thành công', 1, setVisible(false));
    } else {
      message.error('Cấp lại thất bại');
    }
    setConfirm(false);
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      setConfirm(true);
      resetPassword(authTokens.accessToken, oldData.email, values.password, resetComplete);
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
      id: params
    });
  };

  useEffect(() => {
    onFill(id);
  });

  return (
    <div>
      <Modal
        getContainer={false}
        title="Cấp lại password"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onOk={onFinish}
      >
        <Form
          form={form}
          name="ResetPassword"
          className="login-form"
          initialValues={{ remember: true }}
          style={{ border: 'none' }}
        >
          <Form.Item name="id" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { min: 6, required: true, message: 'Password phải nhiều hơn 6 kí tự!' }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
