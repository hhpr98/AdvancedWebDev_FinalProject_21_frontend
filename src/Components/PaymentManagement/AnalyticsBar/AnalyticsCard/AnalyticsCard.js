import React from 'react';
import { Row, Card } from 'antd';
import './AnalyticsCard.css';

const AnalyticsCard = ({ title, summaryData, footer, content }) => {
    return (
        <Card style={{ maxWidth: 400 }}>
            <Row className="title-card">
                <Row style={{ width: '100%', color: 'rgba(0,0,0,.45)', height: 22 }}>
                    <span>{title}</span>
                </Row>
                <Row style={{ width: '100%' }}>
                    <div className="summary-data">
                        {summaryData}
                    </div>
                </Row>
            </Row>
            <Row className="content-card">
                {content}
            </Row>
            <Row className="footer-card">
                <span>{footer}</span>
            </Row>
        </Card>
    );
};

export default AnalyticsCard;