import React, { useState } from 'react';
import { Modal, Form, Input, message, InputNumber } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { createDebtReminder } from './action';
import { useAuth } from '../Routes/Context';

export const AddNewDebtReminder = props => {
  const { visible, setVisible, dataControll } = props;
  const [confirmLoading, setConfirm] = useState(false);
  const data = dataControll[0];
  const setData = dataControll[1];
  const [form] = Form.useForm();
  const { authTokens } = useAuth();

  const transErrorMessage = inp => {
    if (inp === "debt account not found.") {
      return "Thông tìm thấy tài khoản ghi nợ. Chắc chắn rằng bạn nhập đúng STK.";
    }

    if (inp === "an unknown error occurred when create debt reminder.") {
      return "Một lỗi bất ngờ đã xảy ra khi thêm mới người nhắc nợ. Có thể do mạng internet bị chậm hoặc mất. Vui lòng thử lại sau ít phút! (Lỗi do kết nối đến cơ sở dữ liệu)";
    }

    if (inp === "you have reminder this person.") {
      return "Người này đã có trong danh sách nợ.";
    }

    return inp;
  };

  const addComplete = res => {
    setConfirm(false);
    if (res) {
      if (res.status === "success") {
        const temp = [...data];
        temp.push(res.data);
        setData(temp);
        message.success('Thêm thành công', 1, setVisible(false));
      }
      else {
        message.error(transErrorMessage(res.err));
      }
    } else {
      message.error('Chưa thêm được');
    }
  };
  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      setConfirm(true);
      createDebtReminder(authTokens.accessToken, values, addComplete);
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
        title="Thêm người mới"
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
            name="debtaccount"
            rules={[
              {
                required: true,
                message: 'STK không được bỏ trống!'
              }
            ]}
          >
            <Input
              placeholder="số tài khoản"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item
            name="amount"
            rules={[
              {
                required: true,
                message: 'Số tiền không được bỏ trống!'
              }
            ]}
          >
            <InputNumber
              min={0}
              placeholder="số tiền"
            />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: 'Không được bỏ trống!'
              }
            ]}
          >
            <Input
              placeholder="mô tả"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
