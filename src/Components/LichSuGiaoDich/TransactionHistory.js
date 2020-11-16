import React, { useEffect, useState } from 'react';
import { Layout, Col, Typography, Row, Tabs, Form, Button, Input } from 'antd';
import {
    WindowsFilled,
} from '@ant-design/icons';
import { getCustomerTransactionForEmployee } from './action';
import './TransactionHistory.css';
import { useAuth } from '../Routes/Context';
import ReceiverTransaction from '../LichSuNguoiDung/ReceiverTransaction/ReceiverTransaction';
import PaymentTransaction from '../LichSuNguoiDung/PaymentTransaction/PaymentTransaction';
import DebtReminderPaymentTransaction from '../LichSuNguoiDung/DebtReminderPaymentTransaction/DebtReminderTransaction';
import BeDebtReminderPaymentTransaction from '../LichSuNguoiDung/BeDebtReminderPaymentTransaction/BeDebtReminderPaymentTransaction';

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

const TransactionHistory = () => {
    const [receiverTransaction, setReceiverTransaction] = useState([]);
    const [paymentTransaction, setPaymentTransaction] = useState([]);
    const [debtReminderPaymentTransaction, setDebtReminderPaymentTransaction] = useState([]);
    const [beDebtReminderPaymentTransaction, setBeDebtReminderPaymentTransaction] = useState([]);
    const { authTokens } = useAuth();
    const [accountNumber, setAccountNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const getComplete = (res) => {
        if (res) {
            // console.log("RESSSSS",res);
            setReceiverTransaction(res.receiverTransaction);
            setPaymentTransaction(res.paymentTransaction);
            setDebtReminderPaymentTransaction(res.debtReminderPaymentTransaction);
            setBeDebtReminderPaymentTransaction(res.beDebtReminderPaymentTransaction);
        }
        else {
            // console.log("NOOOOOOOOO");
            setReceiverTransaction([]);
            setPaymentTransaction([]);
            setDebtReminderPaymentTransaction([]);
            setBeDebtReminderPaymentTransaction([]);
        }
    };

    useEffect(() => {
        if (accountNumber !== "") {
            getCustomerTransactionForEmployee(authTokens.accessToken, accountNumber, getComplete);
        }
    }, [authTokens.accessToken]);

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

    const findTransactionClick = values => {
        // Swal.fire("Thông báo", "Value = " + values.account, "info");
        setIsLoading(true);
        setAccountNumber(values.account);
        getCustomerTransactionForEmployee(authTokens.accessToken, values.account, getComplete);
        setIsLoading(false);
    };

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
                        <WindowsFilled /> QUẢN LÝ LỊCH SỬ GIAO DỊCH (NHÂN VIÊN)
                    </Title>
                </Col>
            </Row>

            <Form onFinish={findTransactionClick}
                {...layout}
                name="basic"
            >
                <Form.Item
                    label="Vui lòng chọn số tài khoản cần tra cứu: "
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
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Tra cứu
                    </Button>
                </Form.Item>
            </Form>


            <Tabs style={{ width: '100%', backgroundColor: '#FFFFFF', padding: '16px' }} defaultActiveKey="1">
                <TabPane tab="Giao dịch chuyển tiền" key="1">
                    {<PaymentTransaction paymentTransactionArray={paymentTransaction} />}
                </TabPane>
                <TabPane tab="Giao dịch nhận tiền" key="2">
                    {<ReceiverTransaction receiverTransactionArray={receiverTransaction} />}
                </TabPane>
                <TabPane tab="Giao dịch thanh toán nhắc nợ" key="3">
                    {<DebtReminderPaymentTransaction debtReminderPaymentTransactionArray={debtReminderPaymentTransaction} />}
                </TabPane>
                <TabPane tab="Giao dịch được thanh toán nhắc nợ" key="4">
                    {<BeDebtReminderPaymentTransaction beDebtReminderPaymentTransactionArray={beDebtReminderPaymentTransaction} />}
                </TabPane>
            </Tabs>
        </Content >
    );
};

export default TransactionHistory;