import React from 'react';
import { Row, Col } from 'antd';
import { UserOutlined, CrownOutlined, TeamOutlined, FilterOutlined } from '@ant-design/icons';
import KpiCard from '../KpiCard';

interface UsersMetricsProps {
  totalUsers?: number;
  adminsCount?: number;
  activeUsers?: number;
  currentPage?: number;
}

export default function UsersMetrics({ 
  totalUsers = 0, 
  adminsCount = 0, 
  activeUsers = 0, 
  currentPage = 1 
}: UsersMetricsProps) {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard 
          icon={<UserOutlined />} 
          label="Total Utilisateurs" 
          value={totalUsers} 
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard 
          icon={<CrownOutlined />} 
          label="Administrateurs" 
          value={adminsCount} 
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard 
          icon={<TeamOutlined />} 
          label="Utilisateurs Actifs" 
          value={activeUsers} 
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard 
          icon={<FilterOutlined />} 
          label="Page Actuelle" 
          value={currentPage} 
        />
      </Col>
    </Row>
  );
}