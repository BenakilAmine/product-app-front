import React from 'react';
import { Row, Col, Statistic } from 'antd';
import { CalendarOutlined, DollarOutlined } from '@ant-design/icons';
import { Order } from '../data/ordersData';

interface OrderStatsProps {
  orders: Order[];
}

export const OrderStats: React.FC<OrderStatsProps> = ({ orders }) => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const deliveredOrders = orders.filter(order => order.status.name === 'Delivered').length;
  const pendingOrders = orders.filter(order => order.status.name === 'Pending').length;

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Statistic
          title="Total Orders"
          value={totalOrders}
          prefix={<CalendarOutlined style={{ color: '#f97316' }} />}
          valueStyle={{ color: '#111827', fontSize: 18, fontWeight: 600 }}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="Total Revenue"
          value={totalRevenue}
          prefix={<DollarOutlined style={{ color: '#10b981' }} />}
          precision={2}
          valueStyle={{ color: '#111827', fontSize: 18, fontWeight: 600 }}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="Delivered"
          value={deliveredOrders}
          valueStyle={{ color: '#10b981', fontSize: 18, fontWeight: 600 }}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="Pending"
          value={pendingOrders}
          valueStyle={{ color: '#ef4444', fontSize: 18, fontWeight: 600 }}
        />
      </Col>
    </Row>
  );
};