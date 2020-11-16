import React, { useEffect, useState } from 'react';
import { Layout, Col, Typography, Row, Tabs } from 'antd';
import {
    WindowsFilled,
} from '@ant-design/icons';
import { getAllCustomerTransactionSelf } from './action';
import './UserHistory.css';
import { useAuth } from '../Routes/Context';
import ReceiverTransaction from './ReceiverTransaction/ReceiverTransaction';
import PaymentTransaction from './PaymentTransaction/PaymentTransaction';
import DebtReminderPaymentTransaction from './DebtReminderPaymentTransaction/DebtReminderTransaction';
import BeDebtReminderPaymentTransaction from './BeDebtReminderPaymentTransaction/BeDebtReminderPaymentTransaction';

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

const UserHistory = () => {
    const [receiverTransaction, setReceiverTransaction] = useState([]);
    const [paymentTransaction, setPaymentTransaction] = useState([]);
    const [debtReminderPaymentTransaction, setDebtReminderPaymentTransaction] = useState([]);
    const [beDebtReminderPaymentTransaction, setBeDebtReminderPaymentTransaction] = useState([]);
    const { authTokens } = useAuth();

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
        getAllCustomerTransactionSelf(authTokens.accessToken, getComplete);
    }, [authTokens.accessToken]);

    return (
        <Content
            className="payment-management"
            style={{
                padding: 20,
                borderRadius: 10
            }}
        >
            <Row>
                <Col span={18}>
                    <Title level={3}>
                        <WindowsFilled /> QUẢN LÝ LỊCH SỬ GIAO DỊCH (CÁ NHÂN)
                    </Title>
                </Col>
            </Row>
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
        </Content>
    );
};

export default UserHistory;