import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
} from "bizcharts";
import AnalyticsCard from './AnalyticsCard/AnalyticsCard';
import {
    countSucceededPayments,
    countFailedPayments,
    countTodayPayments,
    statisticTypePayment
} from '../action';
import './AnalyticsBar.css';

const data = [
    {
        year: "1991",
        value: 3
    },
    {
        year: "1992",
        value: 4
    },
    {
        year: "1993",
        value: 3.5
    },
    {
        year: "1994",
        value: 5
    },
    {
        year: "1995",
        value: 0
    },
    {
        year: "1996",
        value: 0
    },
    {
        year: "1997",
        value: 7
    }
];
const cols = {
    value: {
        min: 0
    },
    year: {
        range: [0, 1]
    }
};

const AnalyticsBar = (props) => {
    const { countPayments, paymentReportList } = props;
    const [amountOfPayments, setAmountOfPayments] = useState(0);
    const [succeededPayment, setSucceededPayment] = useState(0);
    const [failedPayment, setFailedPayment] = useState(0);
    const [todayPayment, setTodayPayment] = useState(0);

    const [typePaymentStatistic, setTypePaymentStatistic] = useState([]);
    const [mostDigitalWallet, setMostDigitalWallet] = useState('');

    const [amountOfPaymentReport, setAmountOfPaymentReport] = useState(0);
    const [resolvedPaymentReport, setResolvedPaymentReport] = useState(0);
    const [unresolvedPaymentReport, setUnresolvedPaymentReport] = useState(0);
    const [todayPaymentReport, setTodayPaymentReport] = useState(0);

    useEffect(() => {
        setAmountOfPaymentReport(paymentReportList.length);
        console.log("1: ", paymentReportList.filter(payment => payment.adminResolved === true).length);
        setResolvedPaymentReport(paymentReportList.filter(payment => payment.adminResolved === true).length);
        setUnresolvedPaymentReport(paymentReportList.filter(payment => payment.adminResolved === false).length);
        setTodayPaymentReport(paymentReportList.filter(payment => new Date(payment.createdDate).getDate() === new Date().getDate()).length);
    }, [paymentReportList]);

    useEffect(() => {
        setAmountOfPayments(countPayments);
    }, [countPayments]);

    useEffect(() => {
        countSucceededPayments(res => {
            if (Number.isInteger(res)) {
                setSucceededPayment(res);
            }
        });
        countFailedPayments((res) => {
            if (Number.isInteger(res))
                setFailedPayment(res);
        });
        countTodayPayments((res) => {
            if (Number.isInteger(res))
                setTodayPayment(res);
        });
        statisticTypePayment((res) => {
            if (res.status) {
                setTypePaymentStatistic(res.data);

                let index = 0;
                let currentCount = res.data[0].count;
                const { length } = res.data;
                for (let i = 1; i < length; i += 1) {
                    if (res.data[i].count > currentCount) {
                        currentCount = res.data[i].count;
                        index = i;
                    }
                }
                setMostDigitalWallet(res.data[index].name);
            }
        });
    }, []);


    return (
        <Row gutter={[32, 32]} style={{ backgroundColor: '#F1F2F5', margin: "10px 0px" }} justify="center">
            <Col xs={24} sm={24} md={12} xl={6} xxl={6} className="hvr-grow">
                <AnalyticsCard
                    title="Tổng số giao dịch"
                    summaryData={amountOfPayments}
                    footer={`Giao dịch trong ngày: ${todayPayment}`}
                    content={
                        <>
                            <span style={{ width: '100%' }}>Thành công: {succeededPayment}</span>
                            <span style={{ width: '100%' }}>Thất bại: {failedPayment}</span>
                        </>
                    }
                />
            </Col>
            <Col xs={24} sm={24} md={12} xl={6} xxl={6} className="hvr-grow">
                <AnalyticsCard
                    title="Doanh thu"
                    summaryData="123411"
                    footer="Doanh thu trong ngày: 179"
                    content={
                        <div style={{ width: '100%' }}>
                            <Chart
                                height={46}
                                padding={[5, 5, 0]}
                                data={data}
                                scale={cols}
                                forceFit
                            >
                                <Axis name="year" />
                                <Axis name="value" />
                                {/* <Tooltip
                                    crosshairs={{
                                        type: "y"
                                    }}
                                /> */}
                                <Tooltip
                                    containerTpl='<div class="g2-tooltip"><p class="g2-tooltip-title"></p><table class="g2-tooltip-list"></table></div>'
                                    itemTpl='<tr class="g2-tooltip-list-item"><td style="color:{color}">Doanh thu: </td><td>{value} VND</td></tr>'
                                    offset={50}
                                    g2-tooltip={{
                                        position: 'absolute',
                                        visibility: 'hidden',
                                        border: '1px solid #efefef',
                                        backgroundColor: 'white',
                                        color: '#000',
                                        opacity: "0.8",
                                        padding: '5px 15px',
                                        'transition': 'top 200ms,left 200ms'
                                    }}
                                    g2-tooltip-list={{
                                        margin: '10px'
                                    }}
                                />
                                <Geom type="line" position="year*value" size={2} />
                                <Geom
                                    type="point"
                                    position="year*value"
                                    size={4}
                                    shape="circle"
                                    style={{
                                        stroke: "#fff",
                                        lineWidth: 1
                                    }}
                                />
                            </Chart>
                        </div>
                    }
                />
            </Col>
            <Col xs={24} sm={24} md={12} xl={6} xxl={6} className="hvr-grow">
                <AnalyticsCard
                    title="Cổng thanh toán"
                    summaryData={typePaymentStatistic.length}
                    footer={`Sử dụng nhiều nhất: ${mostDigitalWallet}`}
                    content={
                        <div style={{ width: '100%' }}>
                            <Chart
                                data={typePaymentStatistic}
                                forceFit
                                height={46}
                                padding={[5, 0, 0]}
                            >
                                <Coord transpose />
                                <Axis name="name" label={{ offset: 12 }} />
                                <Axis name="count" />
                                <Tooltip
                                    containerTpl='<div class="g2-tooltip"><p class="g2-tooltip-title"></p><table class="g2-tooltip-list"></table></div>'
                                    itemTpl='<tr class="g2-tooltip-list-item"><td style="color:{color}">Lượt giao dịch: </td><td>{value}</td></tr>'
                                    offset={50}
                                    g2-tooltip={{
                                        position: 'absolute',
                                        visibility: 'hidden',
                                        border: '1px solid #efefef',
                                        backgroundColor: 'white',
                                        color: '#000',
                                        opacity: "0.8",
                                        padding: '5px 15px',
                                        'transition': 'top 200ms,left 200ms'
                                    }}
                                    g2-tooltip-list={{
                                        margin: '10px'
                                    }}
                                />
                                <Geom type="interval" position="name*count" />
                            </Chart>
                        </div>
                    }
                />
            </Col>
            <Col xs={24} sm={24} md={12} xl={6} xxl={6} className="hvr-grow">
                <AnalyticsCard
                    title="Khiếu nại"
                    summaryData={amountOfPaymentReport}
                    footer={`Khiếu nại trong ngày: ${todayPaymentReport}`}
                    content={
                        <>
                            <span style={{ width: '100%' }}>Đã giải quyết: {resolvedPaymentReport}</span>
                            <span style={{ width: '100%', color: 'red' }}>Chưa giải quyết: {unresolvedPaymentReport}</span>
                        </>
                    }
                />
            </Col>
        </Row>
    );
};
export default AnalyticsBar;