import React, { useState, useEffect } from 'react';
import { Table, Input, Button, DatePicker, Descriptions, Checkbox } from 'antd';
import Highlighter from 'react-highlight-words';
import {
    SearchOutlined,
} from '@ant-design/icons';
import { setAdminResolved } from '../action';
import './PaymentReport.css';

const PaymentReport = props => {
    const { paymentReportList, getPaymentReport } = props;
    const [isFetching, setIsFetching] = useState(true);
    const [paymentsReportList, setPaymentsReportList] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const [filteredInfo, setFilteredInfo] = useState(null);

    useEffect(() => {
        setPaymentsReportList(paymentReportList);
    }, [paymentReportList]);

    useEffect(() => {
        setIsFetching(false);
    }, []);
    // useEffect(() => {

    //     getAllPaymentReport().then((result) => {
    //         setIsFetching(false);
    //         if (result) {
    //             setPaymentsReportList(result);
    //         }
    //     }).catch((err) => {
    //         Swal.fire('Thông báo', err, 'error');
    //     });
    // }, []);

    const handleAdminResolved = record => {
        setIsFetching(true);
        setAdminResolved(record.id, !record.adminResolved).then((result) => {
            if (result) {
                getPaymentReport();

                // getAllPaymentReport().then((result1) => {
                //     setIsFetching(false);
                //     if (result1) {
                //         setPaymentsReportList(result1);
                //     }
                // }).catch((err) => {
                //     Swal.fire('Thông báo', err, 'error');
                // });

                // const listClone = paymentsReportList;
                // const { length } = listClone;
                // for (let i = 0; i < length; i += 1) {
                //     if (listClone[i].id === result.id) {
                //         listClone[i].adminResolved = result.adminResolved;
                //         break;
                //     }
                // }
                // setPaymentsReportList(listClone);
            }
        }).catch((err) => {
            console.log("err: ", err);
        }).finally(() => {
            setIsFetching(false);
        });
    };

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    };

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
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Chủ đề',
            dataIndex: 'title',
            key: 'title',
            ...getColumnSearchProps('title'),
        },
        {
            title: 'Chi tiết',
            dataIndex: 'detail',
            key: 'detail',
            ...getColumnSearchProps('title'),
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
            title: 'Người dùng',
            dataIndex: 'authorUsername',
            key: 'authorUsername',
            ...getColumnSearchProps('authorUsername'),
        },
        {
            title: 'ID giao dịch',
            dataIndex: 'paymentReportedId',
            key: 'paymentReportedId',
            ...getColumnSearchProps('paymentReportedId'),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'adminResolved',
            fixed: 'right',
            width: 170,
            align: 'center',
            filters: [
                { text: 'Đã giải quyết', value: true },
                { text: 'Chưa giải quyết', value: false },
            ],
            filteredValue: filteredInfo ? filteredInfo.name : null,
            onFilter: (value, record) => record.adminResolved === value,
            render: (text, record) => (
                record.adminResolved ?
                    <Checkbox checked onClick={() => handleAdminResolved(record)}>Đã giải quyết</Checkbox>
                    :
                    <Checkbox checked={false} onClick={() => handleAdminResolved(record)}>Chưa giải quyết</Checkbox>
            )
        },
    ];

    const onShowSizeChange = (current, pageSizeProp) => {
        setPageSize(pageSizeProp);
        setCurrentPage(1);
    };

    return (
        <Table
            columns={columns}
            rowKey="id"
            dataSource={paymentsReportList}
            loading={isFetching}
            scroll={{ x: true }}
            onChange={handleChange}
            expandable={{
                expandedRowRender: record => (
                    <Descriptions title="Chi tiết">
                        <Descriptions.Item label="ID">{record.id}</Descriptions.Item>
                        <Descriptions.Item label="Chủ đề">{record.title}</Descriptions.Item>
                        <Descriptions.Item label="Chi tiết">{record.detail}</Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">{new Date(record.createdDate).toLocaleString('en-GB')}</Descriptions.Item>
                        <Descriptions.Item label="Người khiếu nại">{record.authorUsername}</Descriptions.Item>
                        <Descriptions.Item label="ID giao dịch">{record.paymentReportedId}</Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">{record.adminResolved ? "Đã giải quyết" : "Chưa giải quyết"}</Descriptions.Item>
                    </Descriptions>
                ),
                rowExpandable: record => record.name !== 'Not Expandable',
            }}
            pagination={{
                hideOnSinglePage: true,
                total: paymentsReportList.length,
                pageSize,
                onShowSizeChange,
                current: currentPage,
                showQuickJumper: true,
                onChange: value => setCurrentPage(value),
            }}
        />
    );
};

export default PaymentReport;