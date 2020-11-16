import React, { useEffect, useState } from 'react';
import {
  Table,
  Input,
  Popconfirm,
  Form,
  Layout,
  Col,
  Row,
  Typography,
  Button,
  Modal,
  Radio,
  Result
} from 'antd';
import { WindowsFilled } from '@ant-design/icons';
import { useAuth } from '../Routes/Context';
import {
  getAllReceiver,
  editReceiver,
  deleteReceiver,
  addReceiver
} from './action';
import './Receivers.css';

const { Content } = Layout;
const { Title } = Typography;

export default function Receivers() {
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0
            }}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const { authTokens } = useAuth();
  const [receivers, setReceivers] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [modelFormVisible, setModelFormVisible] = useState();
  const [errorModelVisible, setErrorModelVisible] = useState();
  const [err, setErr] = useState();
  const [status, setStatus] = useState();
  const [isLoading, setLoading] = useState();
  const [dataAdd, setDataAdd] = useState();
  const [name, setName] = useState('');

  const addButtonClick = () => {
    setModelFormVisible(true);
  };

  const onCancleModel = () => {
    setModelFormVisible(false);
  };

  const onErrorModel = () => {
    setErrorModelVisible(false);
  };
  const onFinish = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const data = [...receivers];
      data.push(values);
      setDataAdd(data);
      setName(values.memorizeName || '');
      addReceiver(
        authTokens.accessToken,
        values.accountNumber,
        values.memorizeName || '',
        values.type
      )
        .then(respone => respone.json())
        .then(res => setStatus(res))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    } catch (errorInfo) {
      console.log(errorInfo);
    }
  };

  useEffect(() => {
    if (isLoading === false) {
      if (status.status === 'fail') {
        setErr(
          status.err === 'account number is existed.'
            ? 'Tài khoản đã tồn tại trong danh sách.'
            : status.err === 'account number does not exists.'
            ? 'Không tìm thấy tài khoản.'
            : status.err
        );
        setErrorModelVisible(true);
      }
      if (status.status === 'success') {
        setModelFormVisible(false);
        console.log(name);
        if (name === '') {
          getAllReceiver(authTokens.accessToken)
            .then(respone => respone.json())
            .then(res => {
              setReceivers(res.data);
            });
        } else {
          setReceivers(dataAdd);
        }
      }
    }
  }, [isLoading]);

  useEffect(() => {
    getAllReceiver(authTokens.accessToken)
      .then(respone => respone.json())
      .then(res => {
        setReceivers(res.data);
      });
  }, []);

  const isEditing = record => record.accountNumber === editingKey;

  const edit = record => {
    form.setFieldsValue({
      accountNumber: '',
      memorizeName: '',
      title: '',
      ...record
    });
    setEditingKey(record.accountNumber);
  };

  const handleDelete = accountNumber => {
    const data = [...receivers];
    const newData = data.filter(item => item.accountNumber !== accountNumber);
    setReceivers(newData);
    deleteReceiver(authTokens.accessToken, accountNumber);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async accountNumber => {
    try {
      const row = await form.validateFields();
      const newData = [...receivers];
      const index = newData.findIndex(
        item => accountNumber === item.accountNumber
      );

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey('');
      } else {
        newData.push(row);
        setEditingKey('');
      }

      if (newData[index].memorizeName === '' || newData[index].memorizeName === undefined) {
        await editReceiver(
          authTokens.accessToken,
          newData[index].accountNumber,
          newData[index].type,
          newData[index].memorizeName
        ); 
        getAllReceiver(authTokens.accessToken)
          .then(respone => respone.json())
          .then(res => {
            setReceivers(res.data);
          });
      } else {
        setReceivers(newData);
        editReceiver(
          authTokens.accessToken,
          newData[index].accountNumber,
          newData[index].type,
          newData[index].memorizeName
        );
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Số tài khoản',
      dataIndex: 'accountNumber',
      width: '20%',
      editable: false
    },
    {
      title: 'Tên gợi nhớ',
      dataIndex: 'memorizeName',
      width: '20%',
      editable: true
    },
    {
      title: 'Tên ngân hàng',
      dataIndex: 'bankName',
      width: '20%',
      editable: false
    },
    {
      title: 'Loại ngân hàng',
      dataIndex: 'type',
      width: '20%',
      editable: false
    },
    {
      title: 'Hành động',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.accountNumber)}
              style={{
                marginRight: 8
              }}
            >
              Lưu
            </a>
            <Popconfirm title="Bạn muốn hủy?" onConfirm={cancel}>
              <a>Hủy</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <a disabled={editingKey !== ''} onClick={() => edit(record)}>
              Sửa
            </a>
            <Popconfirm
              title="Chắc chắn xóa?"
              onConfirm={() => handleDelete(record.accountNumber)}
            >
              <a className="action-delete">Xóa</a>
            </Popconfirm>
          </>
        );
      }
    }
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });

  return (
    <Content
      className="receivers"
      style={{
        padding: 20,
        borderRadius: 10
      }}
    >
      <Row>
        <Col span={18}>
          <Title level={3}>
            <WindowsFilled /> QUẢN LÝ DANH SÁCH NGƯỜI NHẬN
          </Title>
        </Col>
      </Row>
      <Button
        type="primary"
        danger
        style={{ backgroundColor: '#F55D3E', fontWeight: 'bold', marginBottom: 10 }}
        onClick={addButtonClick}
      >
        Thêm mới
      </Button>
      <Modal
        title="Thêm tài khoản mới"
        visible={modelFormVisible}
        footer={[
          <Button onClick={onCancleModel}>Hủy bỏ</Button>,
          <Button type="primary" danger onClick={onFinish} loading={isLoading}         style={{ backgroundColor: '#F55D3E', fontWeight: 'bold' }}
          >
            Thêm mới
          </Button>
        ]}
      >
        <Form
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 14
          }}
          layout="horizontal"
          form={form}
        >
          <Form.Item
            label="Số tài khoản"
            name="accountNumber"
            rules={[{ required: true, message: 'Vui lòng nhập số tài khoản' }]}
          >
            <Input style={{ marginTop: 10, marginLeft: 5 }} />
          </Form.Item>
          <Form.Item
            style={{ marginLeft: 10 }}
            label={
              <p style={{ fontWeight: 'bold', fontSize: 14, marginTop: 14 }}>
                Tên gợi nhớ
              </p>
            }
            name="memorizeName"
          >
            <Input style={{marginTop: 15}}/>
          </Form.Item>
          <Form.Item
            label="Tài khoản thuộc"
            name="type"
            rules={[{ required: true, message: 'Vui lòng chọn một' }]}
          >
            <Radio.Group style={{ marginTop: 20 }} name="type">
              <Radio.Button value="NOI BO">Nội bộ</Radio.Button>
              <Radio.Button value="LIEN NGAN HANG">Liên ngân hàng</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title=""
        visible={errorModelVisible}
        footer={[
          <Button key="danger" onClick={onErrorModel}>
            Xác nhận
          </Button>
        ]}
      >
        <Result
          status="error"
          title="Thêm tài khoản thất bại."
          subTitle={err}
        />
        ,
      </Modal>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell
            }
          }}
          bordered
          dataSource={receivers}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            pageSize: 10
          }}
        />
      </Form>
    </Content>
  );
}
