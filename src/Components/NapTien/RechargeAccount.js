/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Layout, Col, Typography, Row, Form, Button, Input, InputNumber } from 'antd';
import {
    WindowsFilled,
} from '@ant-design/icons';
import Swal from 'sweetalert2';
import { useAuth } from '../Routes/Context';
import { addMoneyForCustomer } from "./action";

const { Content } = Layout;
const { Title } = Typography;

const RechargeAccount = () => {

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
        if (inp === "need information: email or accountnumber of customer.") {
            return "Thiếu tên tài khoản cần nạp.";
        }
        if (inp === "account number does not exists.") {
            return "Tài khoản không tồn tại.";
        }
        if (inp === "update fail.") {
            return "Nạp tiền thất bại (Lỗi: update database)";
        }

        return inp;
    };

    const addMoneyClick = values => {
        // Swal.fire("Thông báo", "Value = " + values.account, "info");
        setIsLoading(true);

        addMoneyForCustomer(authTokens.accessToken, values.account, values.amount)
            .then(res => res.json())
            .then(res => {
                // console.log("STATUSSSSSSSSSS: ", res.status, res.err);
                res.status === "success" ? Swal.fire("Thông báo", "Nạp tiền thành công", "success") : Swal.fire("Lỗi", transErrorMessage(res.err), "error");
            })
            .catch(err => console.log("addMoneyForCustomer Err: ", err.message))
            .finally(
                setIsLoading(false)
            );

    };

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
                        <WindowsFilled /> NẠP TIỀN VÀO TÀI KHOẢN KHÁCH HÀNG
                    </Title>
                </Col>
            </Row>

            <Form onFinish={addMoneyClick}
                {...layout}
                name="basic"
            >
                <Form.Item
                    label="Chọn số tài khoản cần nạp tiền: "
                    name="account"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng không để trống!',
                        },
                    ]}
                >
                    <Input style={{ marginTop: 15, width: '50%', borderColor: '#fb2609' }} />
                </Form.Item>
                <Form.Item
                    label="Chọn số tiền: "
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
                        defaultValue={100000}
                        min={50000}
                        max={10000000000}
                        formatter={value => `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} // https://blog.abelotech.com/posts/number-currency-formatting-javascript/
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Nạp tiền
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    );
};

export default RechargeAccount;