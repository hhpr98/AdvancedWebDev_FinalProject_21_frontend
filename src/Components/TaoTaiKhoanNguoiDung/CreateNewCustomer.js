import React, { useState, useEffect } from 'react';
import { Layout, Col, Typography, Row, Form, Button, Input } from 'antd';
import {
    WindowsFilled,
} from '@ant-design/icons';
import { useAuth } from '../Routes/Context';
import { createANewCustomer } from "./action";
import Swal from 'sweetalert2';

const { Content } = Layout;
const { Title } = Typography;

const CreateNewCustomer = () => {

    const { authTokens } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const transErrorMessage = inp => {
        if (inp === "email already exists.") {
            return "Email đã tồn tại. Chọn quên mật khẩu nếu bạn không nhớ mật khẩu đăng nhập.";
        }
        if (inp === "password must be at least 6 characters.") {
            return "Mật khẩu phải chứa ít nhất 6 kí tự."
        }

        return inp;
    }

    const createACustomerClick = values => {
        // Swal.fire("Thông báo", "Value = " + values.rate, "info");
        setIsLoading(true);

        createANewCustomer(authTokens.accessToken, values.name, values.email, values.phonenumber, values.address, "123456")
            .then(res => res.json())
            .then(res => {
                // console.log("STATUSSSSSSSSSS: ", res.status, res.err);
                res.status === "success" ? (
                    Swal.fire({
                        icon: "success",
                        title: "Tạo tài khoản thành công!",
                        html: `<div><b>Tài khoản : </b> ${res.data.name}</div>` +
                            `<div><b>Mật khẩu : </b> 123456</div>` +
                            `<div><b>Số tài khoản : </b> ${res.data.accountnumber}</div>` +
                            `<div style='color:red;'><b>Vui lòng đổi mật khẩu mặc định trong lần sử dụng đầu tiên.</b></div>`
                    })
                ) : Swal.fire("Lỗi", transErrorMessage(res.err), "error");
            })
            .catch(err => console.log("createANewCustomer Err: ", err.message))
            .finally(
                setIsLoading(false)
            )

    }

    useEffect(() => {

    }, []);

    return (
        <Content
            className="payment-management"
            style={{
                padding: 20,
                borderRadius: 10,
            }}
        >
            <Row>
                <Col span={18}>
                    <Title level={3}>
                        <WindowsFilled /> TẠO TÀI KHOẢN NGƯỜI DÙNG
                    </Title>
                </Col>
            </Row>

            <Form onFinish={createACustomerClick}
                {...layout}
                name="basic"
            >
                <Form.Item
                    label="Họ tên : "
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập họ tên của chủ tài khoản.',
                        },
                    ]}
                >
                    <Input style={{ marginTop: 15, width: '50%', borderColor: '#fb2609' }} />
                </Form.Item>
                <Form.Item
                    label="Nhập email của bạn : "
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Email vui lòng không để trống!',
                        },
                    ]}
                >
                    <Input style={{ marginTop: 15, width: '50%', borderColor: '#fb2609' }} />
                </Form.Item>
                <Form.Item
                    label="Nhập địa chỉ của bạn : "
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập địa chỉ!',
                        },
                    ]}
                >
                    <Input style={{ marginTop: 15, width: '50%', borderColor: '#fb2609' }} />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại : "
                    name="phonenumber"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập SĐT!',
                        },
                    ]}
                >
                    <Input
                        style={{ marginTop: 15, width: '50%', borderColor: '#fb2609' }}
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Tạo tài khoản
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    )
}

export default CreateNewCustomer;