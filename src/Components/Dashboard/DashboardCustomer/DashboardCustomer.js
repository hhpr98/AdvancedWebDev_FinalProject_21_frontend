import React, { useEffect, useState } from 'react';
import { Typography, Card, Row, Col } from 'antd';
import {
  BankOutlined
} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
// import { useSelector } from 'react-redux';
import CardInfobox from '../../Infobox/CardInfobox';
import { getAllAccount } from './action';
import { useAuth } from '../../Routes/Context';

const DashboardCustomer = () => {
  const { authTokens } = useAuth();
  const [paymentAccount, setPaymentAccount] = useState({});
  const [saveAccount, setSaveAccount] = useState([]);
  const [name, setName ] = useState("");
  const { Title } = Typography;
  // const loggingIn = useSelector(state => state.auth.isLogin);
  // const userData =useSelector(state => state.auth.user);
  const getComplete = (res)=>{
    if(res){
      setName(res.name);
      setPaymentAccount(res.paymentaccount[0]);
      setSaveAccount(res.saveaccount);
    }
    else {
      setPaymentAccount({});
      setSaveAccount([]);
    }
  };
  useEffect(() => {
    getAllAccount(authTokens.accessToken, getComplete);
  }, [authTokens.accessToken]);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });

  return (
    <div>
      <Row style={{ minHeight: 200 }} gutter={20}>
        <Col span={isSmallScreen ? 24 : 12}>
        <Card bordered style={{ verticalAlign: 'center', minHeight: 170 }}>
            <Title level={4}>
              <BankOutlined />
              {` Tài khoản thanh toán`}
            </Title>
        <CardInfobox number = {paymentAccount?.accountNumber} 
                    name = {name}
                    balance={paymentAccount?.balance} 
                    expiresMonth={paymentAccount.createdAt}
                    accountName="Tài khoản thanh toán"  
                    />
        </Card>
        </Col>
        <Col span={isSmallScreen ? 24 : 12}>
          <Card bordered style={{ verticalAlign: 'center', minHeight: 170 }}>
            <Title level={4}>
              <BankOutlined />
              {` Tài khoản tiết kiệm`}
            </Title>
            {
              saveAccount?.length === 0 ? (
                <Title level={4}>
                  {` Chưa có tài khoản tiết kiệm`}
                </Title>
              ):(
              saveAccount.map((item)=>{
                return (
                  <CardInfobox key= {item.accountNumber}  
                      name = {name}
                      number = {item.accountNumber}  
                      balance={item?.balance} 
                      expiresMonth={item.createdAt}
                      accountName="Tài khoản tiết kiệm"  
                  />
                );
              }))
            }
          </Card>
        </Col>
      </Row>

    </div>
  );
};
export default DashboardCustomer;
