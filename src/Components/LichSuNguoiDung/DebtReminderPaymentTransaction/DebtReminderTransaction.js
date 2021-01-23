import React, { useState, useEffect } from 'react';
import { Table, Input, Button, DatePicker, Descriptions } from 'antd';
import Highlighter from 'react-highlight-words';
import {
    SearchOutlined,
} from '@ant-design/icons';
import './DebtReminderPaymentTransaction.css';

const DebtReminderPaymentTransaction = props => {
    const [isFetching, setIsFetching] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const { debtReminderPaymentTransactionArray } = props;

    useEffect(() => {
        setIsFetching(false);
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
            title: 'Số tài khoản',
            dataIndex: 'accountNumber',
            key: 'accountNumber',
            ...getColumnSearchProps('accountNumber'),
        },
        {
            title: 'Chuyển đến',
            dataIndex: 'receiverNumber',
            key: 'receiverNumber',
            ...getColumnSearchProps('receiverNumber'),
        },
        {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'amount',
            render: text => formatCurrencyValue(text)
        },
        {
            title: 'Nội dung',
            dataIndex: 'description',
            key: 'description',
            ...getColumnSearchProps('description'),
        },
        {
            title: 'Loại giao dịch',
            dataIndex: 'type',
            key: 'type',
            ...getColumnSearchProps('type'),
        },
        {
            title: 'Ngày tạo giao dịch',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            sorter: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
            defaultSortOrder: 'descend',
            render: text => {
                const d = new Date(text);
                return d.toLocaleString('en-GB');
            },
            ...getColumnSearchCreatedDateProps('createdAt'),
        }
    ];

    const onShowSizeChange = (current, pageSizeProp) => {
        setPageSize(pageSizeProp);
        setCurrentPage(1);
    };

    const formatCurrencyValue = (val) => {
        return typeof (val) === "undefined" ? "n/a" : val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); // 5,000 ; 23,000; 130,000 ; 2,400,000
    }

    return (
        <Table
            columns={columns}
            rowKey="id"
            dataSource={debtReminderPaymentTransactionArray}
            loading={isFetching}
            scroll={{ x: true }}
            expandable={{
                expandedRowRender: record => (
                    <Descriptions title="Chi tiết">
                        <Descriptions.Item label="ID">{record.id}</Descriptions.Item>
                        <Descriptions.Item label="Số tài khoản">{record.accountNumber}</Descriptions.Item>
                        <Descriptions.Item label="Chuyển đến">{record.receiverNumber}</Descriptions.Item>
                        <Descriptions.Item label="Số tiền">{formatCurrencyValue(record.amount)} VNĐ</Descriptions.Item>
                        <Descriptions.Item label="Nội dung">{record.description}</Descriptions.Item>
                        <Descriptions.Item label="Loại giao dịch">{record.type}</Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo giao dịch">{new Date(record.createdAt).toLocaleString('en-GB')}</Descriptions.Item>
                    </Descriptions>
                ),
                rowExpandable: record => record.name !== 'Not Expandable',
            }}
            pagination={{
                hideOnSinglePage: true,
                total: debtReminderPaymentTransactionArray.length,
                pageSize,
                onShowSizeChange,
                current: currentPage,
                showQuickJumper: true,
                onChange: value => setCurrentPage(value),
            }}
        />
    );
};

export default DebtReminderPaymentTransaction;