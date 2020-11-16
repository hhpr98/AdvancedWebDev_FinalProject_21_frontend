import React, { useState, useEffect } from 'react';
import { getAllPartners } from '../action';
import { useAuth } from '../../Routes/Context';
import { Layout, Select } from 'antd';

const { Content } = Layout;
const { Option } = Select;

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
