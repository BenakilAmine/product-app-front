'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Typography, Space, Card, Row, Col, Skeleton } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { ProductGridProps } from '../../types';
import { formatters, colors } from '../../shared';

const { Title, Text } = Typography;

export default function ProductGrid({ products, loading }: ProductGridProps) {
  const router = useRouter();

  return (
    <div style={{ padding: '20px 16px', background: '#ffffff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 20 }}>
          <Title level={2} style={{ margin: 0, color: '#131921' }}>Produits recommandés</Title>
          <Link href="/products">
            <Button type="link" style={{ color: '#007185' }}>Voir tout</Button>
          </Link>
        </Space>

        <Row gutter={[16, 16]}>
          {products.map((p, idx) => (
            <Col xs={24} sm={12} md={8} lg={6} key={p ? p.id : idx}>
              <Card 
                hoverable 
                onClick={() => p && router.push(`/products/${p.id}`)}
                style={{ 
                  borderRadius: 12,
                  border: '1px solid #e7e7e7',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                styles={{ body: { padding: 0 } }}
                cover={
                  !p ? (
                    <Skeleton.Image active style={{ width: '100%', height: 260 }} />
                  ) : (
                    <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                      <img
                        src={`https://picsum.photos/seed/p-${p.id}/600/400`}
                        alt={p.name}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}>
                        <HeartOutlined style={{ color: '#ff4d4f', fontSize: 16 }} />
                      </div>
                    </div>
                  )
                }
              >
                {!p ? (
                  <div style={{ padding: 16 }}>
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </div>
                ) : (
                  <div style={{ padding: 16 }}>
                    <Space direction="vertical" size={12} style={{ width: '100%' }}>
                      <div>
                        <Text strong style={{ 
                          fontSize: 16, 
                          lineHeight: 1.4, 
                          color: '#131921',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {p.name}
                        </Text>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                              <Text style={{ 
                                color: colors.amazon.red, 
                                fontWeight: 'bold', 
                                fontSize: 18,
                                lineHeight: 1
                              }}>
                                {formatters.currency(p.price)}
                              </Text>
                          <div style={{ fontSize: 12, color: '#8a8a8a', marginTop: 2 }}>
                            Livraison gratuite
                          </div>
                        </div>
                        <div style={{ 
                          background: colors.info[50], 
                          color: colors.info[500], 
                          padding: '4px 8px', 
                          borderRadius: 4,
                          fontSize: 12,
                          fontWeight: 500
                        }}>
                          ★ 4.5
                        </div>
                      </div>
                      
                      <Button 
                        type="primary" 
                        size="middle" 
                        style={{ 
                          width: '100%', 
                          height: 40,
                          background: colors.amazon.orange, 
                          borderColor: colors.amazon.orange,
                          borderRadius: 8,
                          fontWeight: 500,
                          fontSize: 14
                        }}
                        onClick={(e) => {
                          e.stopPropagation(); // Empêcher la navigation de la carte
                          // TODO: Implémenter l'ajout au panier
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = colors.amazon.darkOrange;
                          e.currentTarget.style.borderColor = colors.amazon.darkOrange;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = colors.amazon.orange;
                          e.currentTarget.style.borderColor = colors.amazon.orange;
                        }}
                      >
                        Ajouter au panier
                      </Button>
                    </Space>
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}