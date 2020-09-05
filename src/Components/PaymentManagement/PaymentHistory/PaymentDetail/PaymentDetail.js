import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Descriptions, AutoComplete } from 'antd';
// import { DownOutlined, UserOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { updateStatusPayment } from './action';
import ReturnCodeMomo from '../../ResponseCode/returnCodeMomo';
import ReturnCodeVNPAY from '../../ResponseCode/returnCodeVNPAY';
import './PaymentDetail.css';

const PaymentDetail = (props) => {
    const { visible, setVisible, currentRecord, updateStatusPaymentsList } = props;

    // const [dataFromPaymentSerivce, setDataFromPaymentSerivce] = useState(false);
    // const [isFetching, setIsFetching] = useState(false);

    const [keyCode, setKeyCode] = useState([]);
    const [dataCode, setDataCode] = useState([]);
    const [currentIndexCode, setCurrentIndexCode] = useState(false);

    const cbHandleOk = (res) => {
        if (res.status) {
            Swal.fire({
                title: 'Thành công!',
                text: 'Cập nhật thành công',
                icon: 'success',
                allowOutsideClick: false,
                confirmButtonText: 'OK'
            });
            updateStatusPaymentsList(currentRecord.id, currentIndexCode);
        }
        else {
            Swal.fire({
                title: 'Thất bại!',
                text: res.error,
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText: 'OK'
            });
        }
        setVisible(false);
    };
    const handleOk = e => {
        updateStatusPayment({ id: currentRecord.id, status: currentIndexCode, type: currentRecord.type }, cbHandleOk);

    };

    const handleCancel = e => {
        setVisible(false);
    };

    // const cbHadnleButtonSendRequest = () => {
    //     setIsFetching(false);
    // };
    // const handleButtonSendRequest = () => {
    //     setIsFetching(true);
    //     // send rq
    // };



    useEffect(() => {
        const codeList = currentRecord.type.toLowerCase() === 'momo' ? Object.entries(ReturnCodeMomo) : Object.entries(ReturnCodeVNPAY);
        const { length } = codeList;
        const keyCodeClone = [];
        const dataCodeClone = [];
        for (let i = 0; i < length; i += 1) {
            keyCodeClone.push(codeList[i][0]);
            dataCodeClone.push({ value: codeList[i][1] });
        }
        setKeyCode(keyCodeClone);
        setDataCode(dataCodeClone);

        const currentStatus = currentRecord.status;
        const currentIndexCodeClone = keyCodeClone.indexOf(currentStatus);
        setCurrentIndexCode(currentIndexCodeClone);

    }, [currentRecord.status, currentRecord.type]);

    return (
        <Modal
            title={`Giao dịch ${currentRecord.id}`}
            style={{ top: 20 }}
            visible={visible}
            onOk={handleOk}
            closable={false}
            maskClosable={false}
            destroyOnClose
            onCancel={handleCancel}
        >
            <Row align="middle" style={{ margin: '10px 0px' }}>
                <Col flex="160px">Trạng thái giao dịch</Col>
                <Col flex="auto">
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={dataCode}
                        defaultValue={dataCode[currentIndexCode] && dataCode[currentIndexCode].value}
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        onSelect={(value, option) => {
                            const { length } = dataCode;
                            let selectedIndex;
                            for (let i = 0; i < length; i += 1) {
                                if (dataCode[i].value === value) {
                                    selectedIndex = i;
                                    break;
                                }
                            }
                            setCurrentIndexCode(keyCode[selectedIndex]);
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Descriptions title="Thông tin chi tiết giao dịch" layout="vertical" bordered>
                    <Descriptions.Item label="ID">{currentRecord.id}</Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">{currentRecord.amount}</Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">{new Date(currentRecord.createdDate).toLocaleString('en-GB')}</Descriptions.Item>
                    <Descriptions.Item label="Mô tả">{currentRecord.decription}</Descriptions.Item>
                    <Descriptions.Item label="Loại thanh toán">{currentRecord.type}</Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">{(currentRecord.type.toUpperCase() !== 'MOMO') ? ReturnCodeVNPAY[currentRecord.status] : ReturnCodeMomo[currentRecord.status]}</Descriptions.Item>
                </Descriptions>
            </Row>
            {/* <Row align="middle" style={{ margin: '10px 0px' }}>
                <Col span={12}>Xem thông tin giao dịch từ {currentRecord.type.toLowerCase() === 'momo' ? 'Momo' : 'VNPay'}</Col>
                <Col span={12}>
                    <Button onClick={handleButtonSendRequest}
                    >
                        Gửi yêu cầu
                    </Button>
                </Col>
            </Row> */}
            {/* <Row justify="center">
                <Spin tip="Loading..." spinning={isFetching}>
                    {dataFromPaymentSerivce ?
                        <Descriptions title={`Thông tin từ ${currentRecord.type.toLowerCase() === 'momo' ? 'Momo' : 'VNPay'}`} layout="vertical" bordered>
                            <Descriptions.Item label="ID">{currentRecord.id}</Descriptions.Item>
                            <Descriptions.Item label="Tổng tiền">{currentRecord.amount}</Descriptions.Item>
                            <Descriptions.Item label="Ngày tạo">{new Date(currentRecord.createdDate).toLocaleString('en-GB')}</Descriptions.Item>
                            <Descriptions.Item label="Mô tả">{currentRecord.decription}</Descriptions.Item>
                            <Descriptions.Item label="Loại thanh toán">{currentRecord.type}</Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">{currentRecord.status}</Descriptions.Item>
                        </Descriptions> :
                        <Empty description="Không có dữ liệu" />
                    }
                </Spin>
            </Row> */}
        </Modal>
    );
};
export default PaymentDetail;