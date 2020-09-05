import React, { useState } from 'react';
import { Modal, Form, Input, Result, Button, message } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import '../profile.css';
import { useAuth } from '../../Routes/Context';
import { changePassword } from '../action';

export const FormChangePassword = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [isOK, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleFooter, setVisibleFooter] = useState(false);
  const { authTokens } = useAuth();

  const cbChangePassword = (status, messages) => {
    if (status === false) {
      setLoading(false);
      message.error(messages);
    } else {
      setOk(true);
      setLoading(false);
      setVisibleFooter(true);
    }
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        setLoading(true);
        changePassword(authTokens.accessToken,values.password,values.newPassword,  cbChangePassword);
      })
      // eslint-disable-next-line
      .catch(info => {});
  };

  const onFinishFailed = () => {
    form.resetFields();
  };
  return (
    <Modal
      visible={visible}
      className="modal-change-password"
      title="ĐỔI MẬT KHẨU"
      closable={false}
      footer={
        !visibleFooter
          ? [
              <Button className="cancel-btn" key="back" onClick={onCancel}>
                Thoát
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={handleOk}
                style={{
                  float: 'right',
                  background: '#F55D3E',
                  border: '#F55D3E',
                  fontWeight: 'bold',
                  color: 'white'
                }}
              >
                Cập nhật
              </Button>
            ]
          : null
      }
    >
      <Form
        form={form}
        onFinish={handleOk}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
      >
        {!isOK ? (
          <div>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
            >
              <Input
                prefix={<StarOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Nhập mật khẩu cũ"
                type="password"
                size='small'
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu'
                },
                {
                  min: 6,
                  message: 'Mật khẩu có độ dài ít nhất 6 kí tự'
                }
              ]}
            >
              <Input.Password
               size='small'
                prefix={<StarOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Nhập mật khẩu mới"
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="confirm"
              dependencies={['newPassword']}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng xác nhận mật khẩu'
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp'));
                  }
                })
              ]}
            >
              <Input.Password
               size='small'
                prefix={<StarOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Xác nhận mật khẩu mới"
              />
            </Form.Item>
          </div>
        ) : (
          <Result
            status="success"
            title="Thành công"
            extra={[
              <Button
                key="back"
                style={{
                  background: '#F55D3E',
                  border: '#F55D3E',
                  fontWeight: 'bold',
                  color: 'white'
                }}
                onClick={onCancel}
              >
                {' '}
                {'    OK    '}
              </Button>
            ]}
          />
        )}
      </Form>
    </Modal>
  );
};
export default FormChangePassword;