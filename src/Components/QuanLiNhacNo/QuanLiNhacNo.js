import React, { useState, useEffect } from 'react';
import {
  Table,
  Input,
  Button,
  Popconfirm,
  message,
  Layout,
  Typography,
  Row,
  Col
} from 'antd';
import Highlighter from 'react-highlight-words';
import { DeleteFilled, SearchOutlined } from '@ant-design/icons';
import { AddNewDebtReminder } from './AddNewDebReminder';
import { getListDebt, deleteReminder } from './action';
import './QuanLiNhacNo.css';
import { useAuth } from '../Routes/Context';
import Swal from 'sweetalert2';
import { WindowsFilled } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;

const DebtReminder = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setsearchedColumn] = useState('');
  const [debtData, setDebtData] = useState(false);
  const [modal, setModal] = useState(false);
  const { authTokens } = useAuth();

  const deleteComplete = res => {
    if (res) {
      if (res.status === 'success') {
        const temp = [...debtData];
        const findID = elementId => elementId.id === res.data.id;
        temp.splice(temp.findIndex(findID), 1);
        setDebtData(temp);
        message.success('Xóa thành công');
      } else {
        Swal.fire('Lỗi', res.err, 'error');
      }
    } else message.error('Chưa xóa được');
  };

  const handleDelete = record => {
    deleteReminder(authTokens.accessToken, record, deleteComplete);
  };

  const loadSucceed = res => {
    if (res) {
      setDebtData(res.data.listDebt);
    }
  };

  useEffect(() => {
    getListDebt(authTokens.accessToken, loadSucceed);
  }, []);

  let searchInput = '';
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setsearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
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
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
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
      )
  });
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      fixed: 'left',
      ...getColumnSearchProps('id')
    },
    {
      title: 'Chủ nợ',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
      width: '15%',
      ...getColumnSearchProps('accountNumber')
    },
    {
      title: 'Người nợ',
      dataIndex: 'debtReminderAccountNumber',
      key: 'debtReminderAccountNumber',
      width: '15%',
      ...getColumnSearchProps('debtReminderAccountNumber')
    },
    {
      title: 'Số tiền nợ',
      dataIndex: 'amount',
      key: 'amount',
      align: 'left',
      width: '10%',
      ...getColumnSearchProps('amount')
    },
    {
      title: 'Lời nhắn',
      dataIndex: 'description',
      key: 'description',
      align: 'left',
      ...getColumnSearchProps('description')
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '20%',
      ...getColumnSearchProps('status')
    },
    {
      title: 'Xóa',
      key: 'delete',
      render: record => (
        <span>
          <Popconfirm
            title="Bạn chắc chắn muôn xóa?"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteFilled />
          </Popconfirm>
        </span>
      ),
      width: '5%'
    }
  ];
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
            <WindowsFilled /> QUẢN LÍ NHẮC NỢ
          </Title>
        </Col>
      </Row>

      <Button
        type="primary"
        onClick={() => setModal(!modal)}
        danger
        style={{ backgroundColor: '#F55D3E', fontWeight: 'bold' }}
      >
        Thêm mới
      </Button>
      <AddNewDebtReminder
        visible={modal}
        setVisible={setModal}
        dataControll={[debtData, setDebtData]}
      />
      <Table
        rowKey={i => i.id}
        columns={columns}
        dataSource={debtData}
        scroll={{ x: true }}
      />
    </Content>
  );
};

export default DebtReminder;
