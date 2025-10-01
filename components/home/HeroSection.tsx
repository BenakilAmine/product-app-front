'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Typography, Space, Row, Col } from 'antd';

const { Title, Text } = Typography;

export default function HeroSection() {
  return (
    <div style={{
      background: 'linear-gradient(to bottom, #f7f8fa, #ffffff)',
      padding: '20px 0'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12}>
            <Space direction="vertical" size={16}>
              <Title level={1} style={{ margin: 0, color: '#131921', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
                Trouvez tout ce dont vous avez besoin
              </Title>
              <Text style={{ fontSize: '1.1rem', color: '#565959' }}>
                Des milliers de produits professionnels à portée de clic. 
                Livraison rapide et service client de qualité.
              </Text>
              <Space wrap>
                <Link href="/products">
                  <Button type="primary" size="large" style={{ background: '#ff9900', borderColor: '#ff9900', height: 40 }}>
                    Parcourir les produits
                  </Button>
                </Link>
              </Space>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ textAlign: 'center' }}>
              <img
                src="https://picsum.photos/seed/hero/600/300"
                alt="Produits professionnels"
                style={{ width: '100%', maxWidth: 500, borderRadius: 8 }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}