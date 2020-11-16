import React, { useState, useEffect } from 'react';
import { Layout, Col, Typography, Row, Form, Button, Input, InputNumber, Radio } from 'antd';
import {
    WindowsFilled,
} from '@ant-design/icons';
import { useAuth } from '../Routes/Context';
import { createNewSaveAccount } from "./action";
import Swal from 'sweetalert2';

const { Content } = Layout;
const { Title } = Typography;

const CreateSaveAccount = () => {

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
        if (inp === "email not found.") {
            return "Email không tồn tại (người dùng hiện không có hoặc đã bị vô hiệu).";
        }

        return inp;
    }

    const openSaveAccountClick = values => {
        // Swal.fire("Thông báo", "Value = " + values.rate, "info");
        setIsLoading(true);

        createNewSaveAccount(authTokens.accessToken, values.email, values.amount, values.expired, values.rate)
            .then(res => res.json())
            .then(res => {
                // console.log("STATUSSSSSSSSSS: ", res.status, res.err);
                res.status === "success" ? Swal.fire("Thông báo", "Tạo tài khoản thành công. STK: " + res.data.accountNumber, "success") : Swal.fire("Lỗi", transErrorMessage(res.err), "error");
            })
            .catch(err => console.log("createNewSaveAccount Err: ", err.message))
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
                        <WindowsFilled /> MỞ TÀI KHOẢN TIẾT KIỆM
                    </Title>
                </Col>
            </Row>

            <Form onFinish={openSaveAccountClick}
                {...layout}
                name="basic"
            >
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
                    label="Nhập số tiền gửi tiết kiệm : "
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng không để trống! Số tiền chỉ bao gồm kí tự số.',
                        },
                    ]}
                >
                    <InputNumber
                        style={{ marginTop: 15, width: '50%', borderColor: '#fb2609' }}
                        min={1000000}
                        max={10000000000}
                        formatter={value => `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} //https://blog.abelotech.com/posts/number-currency-formatting-javascript/
                    />
                </Form.Item>
                <Form.Item
                    label="Nhập kì hạn : "
                    name="expired"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn 1 phương thức.',
                        },
                    ]}
                >
                    <Radio.Group style={{ marginTop: 20 }} name="expired">
                        <Radio.Button value="3">3 tháng</Radio.Button>
                        <Radio.Button value="6">6 tháng</Radio.Button>
                        <Radio.Button value="9">9 tháng</Radio.Button>
                        <Radio.Button value="12">12 tháng</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="Nhập lãi suất : "
                    name="rate"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn 1 phương thức.',
                        },
                    ]}
                >
                    <Radio.Group style={{ marginTop: 20 }} name="rate">
                        <Radio.Button value="1">0.1%/năm</Radio.Button>
                        <Radio.Button value="2">0.2%/năm</Radio.Button>
                        <Radio.Button value="3">0.3%/năm</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Mở sổ tiết kiệm
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    )
}

export default CreateSaveAccount;