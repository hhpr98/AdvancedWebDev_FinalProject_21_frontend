import React, { useState, useEffect } from 'react';
import { Layout, Col, Typography, Row, Form, Button, DatePicker, Select } from 'antd';
import {
    WindowsFilled,
} from '@ant-design/icons';
import { useAuth } from '../Routes/Context';
import { getForeignTransactionOne, getForeignTransactionAll } from "./action";
import Swal from 'sweetalert2';
import "./TransactionList.css";
import ForeignTransactionListDetail from "./ForeignTransactionListDetail/ForeignTransactionListDetail";

const { Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const TransactionList = () => {

    const { authTokens } = useAuth();
    const [type, setType] = useState("0");
    const [isLoading, setIsLoading] = useState(false);
    const [bankid, setBankId] = useState("2");
    const [total, setTotal] = useState(0);
    const [transArr, setTransArr] = useState([]);

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

    const getComplete = res => {
        if (res.status === "success") {
            Swal.fire("Thông báo", "Tra cứu thành công!", "success")
            setTransArr(res.data.transactions);
            setTotal(res.data.total);
        } else {
            Swal.fire("Lỗi", res.err, "error");
            setTransArr([]);
            setTotal(0);
        }
    }

    const researchForeginBankClick = values => {
        setIsLoading(true);
        // const from = values.datepicker[0].format("YYYY-MM-DD HH:mm:ss").toString();
        // const to = values.datepicker[1].format("YYYY-MM-DD HH:mm:ss").toString();
        const from = values.datepicker[0].format("YYYY-MM-DD").toString();
        const to = values.datepicker[1].format("YYYY-MM-DD").toString();
        type === "0" ?
            getForeignTransactionAll(authTokens.accessToken, from, to)
                .then(res => res.json())
                .then(res => getComplete(res))
                .catch(err => console.log("getForeignTransactionAll Err: ", err.message))
                .finally(setIsLoading(false)) :
            getForeignTransactionOne(authTokens.accessToken, from, to, bankid)
                .then(res => res.json())
                .then(res => getComplete(res))
                .catch(err => console.log("getForeignTransactionOne Err: ", err.message))
                .finally(setIsLoading(false))
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
                        <WindowsFilled /> DANH SÁCH GIAO DỊCH (NGÂN HÀNG LIÊN KẾT)
                    </Title>
                </Col>
            </Row>

            <Form onFinish={researchForeginBankClick}
                {...layout}
                name="basic"
            >
                <Form.Item
                    label="Chọn khoảng thời gian cần tra cứu"
                    name="datepicker"
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống',
                        },
                    ]}
                    allowclear="true" // clear sau khi chọn
                >
                    <RangePicker style={{ marginTop: 15, width: '50%', borderColor: '#fb2609' }} />
                </Form.Item>
                <Form.Item
                    label="Tra cứu theo :"
                    name="type_research"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Vui lòng chọn một'
                //     }
                // ]}
                >
                    <Select
                        name="type_research"
                        defaultValue="0"
                        onChange={value => setType(value)}
                        style={{ marginTop: 15, width: '50%', borderColor: '#fb2609' }}
                    >
                        <Option value="0">Xem tất cả ngân hàng liên kết</Option>
                        <Option value="1">Xem theo từng ngân hàng liên kết</Option>
                    </Select>
                </Form.Item>
                {
                    type === "0" ?
                        (
                            <></>
                        ) :
                        (
                            <Form.Item
                                label="Chọn ngân hàng "
                                name="bank"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Vui lòng không để trống!',
                            //     },
                            // ]}
                            >
                                <Select
                                    name="bank"
                                    defaultValue="2"
                                    onChange={value => setBankId(value)}
                                    style={{ marginTop: 15, width: '50%', borderColor: '#fb2609' }}
                                >
                                    <Option value="2">HD Bank</Option>
                                    <Option value="3">HK Bank</Option>
                                    <Option value="4">HL Bank</Option>
                                </Select>
                            </Form.Item>
                        )
                }
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Tra cứu
                    </Button>
                </Form.Item>
            </Form>
            {<ForeignTransactionListDetail transactionList={transArr} total={total} />}
        </Content>
    )
}

export default TransactionList;