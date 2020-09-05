import React from 'react';
import { Layout, Col, Typography, Row, Tabs } from 'antd';
import { WindowsFilled } from '@ant-design/icons';
import { ForeignBanks } from './ForeignBanks';
import { InputForm } from './InputForm';



const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

export default function Transfers() {
  return (
    <div>
      <Content
        className="transfers"
        style={{
          padding: 20,
          borderRadius: 10
        }}
      >
        <Row>
          <Col span={18}>
            <Title level={3}>
              <WindowsFilled /> CHUYỂN TIỀN
            </Title>
          </Col>
        </Row>
        <Tabs
          style={{ width: '100%', backgroundColor: '#FFFFFF', padding: '16px' }}
          defaultActiveKey="1"
          size = "large"
        >
          <TabPane tab="Nội bộ" key="1">
            <InputForm bank = "1"/>
          </TabPane>
          <TabPane tab="Liên ngân hàng" key="2">
            <InputForm bank = "2"/>
          </TabPane>
        </Tabs>
      </Content>
    </div>
  );
}
