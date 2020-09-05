import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Popconfirm, message } from 'antd';
import Highlighter from 'react-highlight-words';
import {
  DeleteFilled,
  SearchOutlined,
  EditFilled,
  SyncOutlined
} from '@ant-design/icons';

import { AddNewAccount } from './AddNewAccount';
import { UpdateAdmin } from './UpdateAdmin';
import { ResetPasswordModal } from './ResetPasswordModal';

import { getListAdmins, deleteAdmin } from './api';
import './AdminManagement.css';
import { useAuth } from '../Routes/Context';

const AdminManagement = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setsearchedColumn] = useState('');
  const [userData, setUserData] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const [oldData, setOldData] = useState(false);
  const [idForPassword, setIdForPassword] = useState(false);
  const { authTokens } = useAuth();


  const deleteComplete = res => {
    if (res) {
      const temp = [...userData];
      const findID = elementId => elementId.email === res.data.email;
      temp.splice(temp.findIndex(findID), 1);
      setUserData(temp);
      message.success('Xóa thành công');
    } else message.error('Chưa xóa được');
  };
  const handleDelete = record => {
    deleteAdmin(authTokens.accessToken, record, deleteComplete);
  };
  const handleEdit = record => {
    setOldData(record);
    setModalEdit(true);
  };

  const handleResetPassword = record => {
    setOldData(record);
    setModalPassword(true);
    setIdForPassword(record);
  };
  const loadSucceed = res => {
    if (res) {
      setUserData(res.data);
    }
  };

  useEffect(() => {
    getListAdmins(authTokens.accessToken, loadSucceed);
  }, [authTokens.accessToken]);

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
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   key: 'id',
    //   width: '10%',
    //   fixed: 'left',
    //   ...getColumnSearchProps('id')
    // },
    {
      title: 'Admin Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email')
    },
    {
      title: 'Phụ trách',
      dataIndex: 'ruleAccess',
      key: 'ruleAccess',
      align: 'center',
      ...getColumnSearchProps('ruleAccess')
    },
    {
      title: 'Chỉnh sửa',
      key: 'update',
      align: 'center',
      render: record => (
        <span>
          <EditFilled
            onClick={() => {
              handleEdit(record);
            }}
          />
        </span>
      )
    },
    {
      title: 'Cấp lại mật khẩu',
      align: 'center',
      key: 'password',
      render: record => (
        <SyncOutlined onClick={() => handleResetPassword(record)} />
      )
    },
    {
      title: 'Xóa',
      key: 'delete',
      render: record => (
        <span>
          <Popconfirm
            title="Bạn chắc chắn muôn xóa?"
            onConfirm={() => handleDelete(record.email)}
          >
            <DeleteFilled />
          </Popconfirm>
        </span>
      )
    }
  ];
  return (
    <div className="AdminManagement">
      <Button type="primary" onClick={() => setModal(!modal)}>
        Thêm mới
      </Button>
      <ResetPasswordModal
        id={idForPassword}
        visible={modalPassword}
        setVisible={setModalPassword}
        oldData={oldData}
      />
      <AddNewAccount
        visible={modal}
        setVisible={setModal}
        dataControll={[userData, setUserData]}
      />
      <UpdateAdmin
        visible={modalEdit}
        setVisible={setModalEdit}
        dataControll={[userData, setUserData]}
        oldData={oldData}
      />
      <Table
        rowKey={i => i.email}
        columns={columns}
        dataSource={userData}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default AdminManagement;
