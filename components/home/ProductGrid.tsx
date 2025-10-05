'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Typography, Space, Card, Row, Col, Skeleton } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { Product } from '../../types';
import { formatters, colors } from '../../shared';

const { Title, Text } = Typography;

export default function ProductGrid({ products, loading }: { products: Product[]; loading: boolean }) {
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
          {loading ? (
            Array.from({ length: 8 }).map((_, idx) => (
              <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                <Card 
                  style={{ 
                    borderRadius: 12,
                    border: '1px solid #e7e7e7',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    overflow: 'hidden'
                  }}
                  styles={{ body: { padding: 0 } }}
                  cover={
                    <div style={{ height: 260, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Skeleton.Image active style={{ width: '100%', height: 260 }} />
                    </div>
                  }
                >
                  <div style={{ padding: 16 }}>
                    <Skeleton active paragraph={{ rows: 1 }} style={{ marginBottom: 12 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <Skeleton.Button active size="small" style={{ width: 80 }} />
                      <Skeleton.Button active size="small" style={{ width: 50 }} />
                    </div>
                    <Skeleton.Button active size="large" style={{ width: '100%', height: 40 }} />
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            products.map((p: Product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={p.id}>
              <Card 
                hoverable 
                onClick={() => router.push(`/products/${p.id}`)}
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
                  <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                    <Image
                      src={`https://picsum.photos/seed/p-${p.id}/600/400`}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      style={{ 
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
                }
              >
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
                                color: colors.customColors.red, 
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
                          background: colors.customColors.orange, 
                          borderColor: colors.customColors.orange,
                          borderRadius: 8,
                          fontWeight: 500,
                          fontSize: 14
                        }}
                        onClick={(e) => {
                          e.stopPropagation(); // Empêcher la navigation de la carte
                          // TODO: Implémenter l'ajout au panier
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = colors.customColors.darkOrange;
                          e.currentTarget.style.borderColor = colors.customColors.darkOrange;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = colors.customColors.orange;
                          e.currentTarget.style.borderColor = colors.customColors.orange;
                        }}
                      >
                        Ajouter au panier
                      </Button>
                    </Space>
                </div>
              </Card>
            </Col>
            ))
          )}
        </Row>
      </div>
    </div>
  );
}