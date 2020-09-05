import React, { useState, useEffect } from 'react';
import { Table, Input, Button, DatePicker, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import {
    SearchOutlined,
    EditFilled
} from '@ant-design/icons';
import { PaymentDetail } from './PaymentDetail';
import { getAllPayments } from '../action';
import ReturnCodeMomo from '../ResponseCode/returnCodeMomo';
import ReturnCodeVNPAY from '../ResponseCode/returnCodeVNPAY';
import './PaymentHistory.css';

const PaymentHistory = () => {
    const [paymentsList, setPaymentsList] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');


    const [visiblePaymentDetail, setVisiblePaymentDetail] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({});

    const updateStatusPaymentsList = (id, status) => {
        const { length } = paymentsList;
        for (let i = 0; i < length; i += 1) {
            if (paymentsList[i].id === id) {
                paymentsList[i].status = status;
                break;
            }
        }
    };

    const cbGetAllPayments = (res) => {
        if (res) {
            const resClone = res;
            const { length } = resClone;
            for (let i = 0; i < length; i += 1) {
                let textStatus = 'Đang cập nhật';
                if (resClone[i].type.toUpperCase() !== 'MOMO') {
                    textStatus = ReturnCodeVNPAY[resClone[i].status];
                } else textStatus = ReturnCodeMomo[resClone[i].status];
                resClone[i].statusDetail = textStatus || 'Chưa thanh toán';
            }
            console.log("list: ", resClone);
            setPaymentsList(resClone);
        }
        setIsFetching(false);
    };
    useEffect(() => {
        getAllPayments(cbGetAllPayments);
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();

        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };
    let searchInput = '';
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => {
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                    }}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    });

    const getColumnSearchCreatedDateProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <DatePicker
                    ref={node => {
                        searchInput = node;
                    }}
                    value={selectedKeys[0]}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                    showTime
                    onChange={value => setSelectedKeys(value ? [value] : [])}
                    onOk={() => handleSearch(selectedKeys, confirm, dataIndex)}

                />
                {/* <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                /> */}
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => {
            return new Date(record.createdDate).toLocaleString('en-GB') === new Date(value).toLocaleString('en-GB');
        },
        onFilterDropdownVisibleChange: visible => {
            // if (visible) {
            //     setTimeout(() => searchInput.select());
            // }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={new Date(text).toLocaleString('en-GB')}
                />
            ) : (
                    new Date(text).toLocaleString('en-GB')
                ),

    });

    const onShowSizeChange = (current, pageSizeProp) => {
        console.log(current, pageSizeProp);
        setPageSize(pageSizeProp);
        setCurrentPage(1);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'amount',
            key: 'amount',
            ...getColumnSearchProps('amount'),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            width: 150,
            sorter: (a, b) => Date.parse(a.createdDate) - Date.parse(b.createdDate),
            defaultSortOrder: 'descend',
            render: text => {
                const d = new Date(text);
                return d.toLocaleString('en-GB');
            },
            ...getColumnSearchCreatedDateProps('createdDate'),
        },
        {
            title: 'Mô tả',
            dataIndex: 'decription',
            key: 'decription',
            ...getColumnSearchProps('decription'),
        },
        {
            title: 'Loại thanh toán',
            dataIndex: 'type',
            key: 'type',
            ...getColumnSearchProps('type'),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'statusDetail',
            key: 'statusDetail',
            ...getColumnSearchProps('statusDetail'),
            render: (text, record) => {
                let color = 'geekblue';
                // let textStatus = 'Đang cập nhật';
                // if (record.type.toUpperCase() !== 'MOMO') {
                //     textStatus = ReturnCodeVNPAY[record.status];
                // } else textStatus = ReturnCodeMomo[record.status];
                console.log("text: ", text);
                if (record.statusDetail === 'Thành công' || record.statusDetail === 'Giao dịch thành công') color = 'green';
                else color = 'volcano';
                return (
                    <span>
                        <Tag color={color}>
                            {text === undefined ? 'Chưa thanh toán' : text}
                        </Tag>
                    </span>
                );
            }
        },
        {
            title: 'Cập Nhật',
            dataIndex: 'update',
            align: 'center',
            render: (text, record) => (
                <EditFilled
                    style={{ verticalAlign: 'center' }}
                    onClick={() => {
                        setCurrentRecord(record);
                        setVisiblePaymentDetail(true);
                    }}
                />
            )
        },
    ];

    return (
        <>
            {
                visiblePaymentDetail &&
                <PaymentDetail
                    visible={visiblePaymentDetail}
                    setVisible={setVisiblePaymentDetail}
                    currentRecord={currentRecord}
                    updateStatusPaymentsList={updateStatusPaymentsList}
                />
            }
            <Table
                columns={columns}
                rowKey={i => i.id}
                dataSource={paymentsList}
                loading={isFetching}
                scroll={{ x: true }}
                pagination={{
                    hideOnSinglePage: true,
                    total: paymentsList.length,
                    pageSize,
                    onShowSizeChange,
                    current: currentPage,
                    showQuickJumper: true,
                    onChange: value => setCurrentPage(value),
                }}
            />
        </>
    );
};
export default PaymentHistory;