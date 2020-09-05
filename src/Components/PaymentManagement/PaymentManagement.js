import React, { useEffect, useState } from 'react';
import { Layout, Col, Typography, Row, Tabs } from 'antd';
import {
    WindowsFilled,
} from '@ant-design/icons';
import Swal from 'sweetalert2';
import AnalyticsBar from './AnalyticsBar/AnalyticsBar';
import { PaymentHistory } from './PaymentHistory';
import { PaymentReport } from './PaymentReport';
import { countAllPayments, getAllPaymentReport } from './action';
import './PaymentManagement.css';

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

const PaymentManagement = () => {
    const [countPayments, setCountPayments] = useState(0);
    const [paymentReportList, setPaymentReportList] = useState([]);
    const cbCountAllPayments = (res) => {
        if (res) {
            setCountPayments(res);
        }
    };

    const getPaymentReport = () => {
        getAllPaymentReport().then((result) => {
            if (result) {
                const cloneResult = result;
                const { length } = result;
                for (let i = 0; i < length; i += 1) {
                    cloneResult[i].authorUsername = cloneResult[i].author.username;
                    cloneResult[i].paymentReportedId = cloneResult[i].paymentReported.id;
                }
                setPaymentReportList(cloneResult);
            }
        }).catch((err) => {
            Swal.fire('Thông báo', err, 'error');
        });
    };
    useEffect(() => {
        countAllPayments(cbCountAllPayments);
        getPaymentReport();

    }, []);

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
                        <WindowsFilled /> QUẢN LÝ THANH TOÁN
                </Title>
                </Col>
            </Row>
            <AnalyticsBar countPayments={countPayments} paymentReportList={paymentReportList} />
            <Tabs style={{ width: '100%', backgroundColor: '#FFFFFF', padding: '16px' }} defaultActiveKey="1">
                <TabPane tab="Giao dịch" key="1">
                    <PaymentHistory />
                </TabPane>
                <TabPane tab="Khiếu nại" key="2">
                    <PaymentReport paymentReportList={paymentReportList} getPaymentReport={getPaymentReport} />
                </TabPane>
            </Tabs>
        </Content>
    );
};

export default PaymentManagement;