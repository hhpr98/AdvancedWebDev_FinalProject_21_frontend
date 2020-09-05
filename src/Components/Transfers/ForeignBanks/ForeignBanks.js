import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getAllPartners } from '../action';
import { useAuth } from '../../Routes/Context';
import { Layout, Col, Typography, Row, Tabs, Select } from 'antd';
import { WindowsFilled } from '@ant-design/icons';

const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

export default function ForeignBanks() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { authTokens } = useAuth();
  useEffect(() => {
    getAllPartners(authTokens.accessToken)
      .then(response => response.json())
      .then(res => {
        setData(res.payload);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading === false) {
    return (
      <Content>
        <Select defaultValue="1" style={{ width: 200 }}>
          {data.map(item => {
            return <Option value={item.id}>{item.bankingName}</Option>;
          })}
        </Select>
      </Content>
    );
  } else {
    return (
      <Content>
        <Select defaultValue="Chọn ngân hàng" style={{ width: 200 }}></Select>
      </Content>
    );
  }
}
