'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, Typography, Space, Divider, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined, ArrowLeftOutlined, ShoppingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAuth } from '../../lib/contexts/auth-context';
import Layout from '../../components/layouts/MarketLayout';
import { LoadingState } from '../../shared';

const { Title, Text } = Typography;

export default function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, user } = useAuth();
  const router = useRouter();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'SUPER_ADMIN') {
        router.push('/admin');
      } else {
        router.push('/products');
      }
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const success = await login(values.email, values.password);
      if (success) {
        if (user?.role === 'SUPER_ADMIN') {
          router.push('/admin');
        } else {
          router.push('/products');
        }
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <LoadingState type="spinner" message="Redirection en cours..." />;
  }

  return (
    <Layout>
      <div style={{ 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: 'calc(100vh - 300px)',
        padding: '40px 16px'
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Row gutter={[34, 34]} align="middle">
            {/* Section gauche - Branding */}
            <Col xs={24} lg={12}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <Space direction="vertical" size={20} style={{ width: '100%' }}>
                  <div>
                    <ShoppingOutlined style={{ 
                      fontSize: '80px', 
                      color: '#ff9900',
                      marginBottom: '16px'
                    }} />
                    <Title level={1} style={{ 
                      color: '#131921', 
                      margin: 0,
                      fontSize: '2.5rem',
                      fontWeight: 'bold'
                    }}>
                      Bienvenue sur ProductManager
                    </Title>
                    <Text style={{ 
                      fontSize: '18px', 
                      color: '#565959',
                      display: 'block',
                      marginTop: '16px'
                    }}>
                      La plateforme de gestion de produits la plus intuitive
                    </Text>
                  </div>
                  
                  <div style={{ 
                    background: 'rgba(255,255,255,0.8)',
                    padding: '24px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <Space direction="vertical" size={6} style={{ width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '8px', 
                          height: '8px', 
                          background: '#52c41a', 
                          borderRadius: '50%' 
                        }} />
                        <Text style={{ color: '#131921', fontSize: '16px' }}>
                          Gestion complète de vos produits
                        </Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '8px', 
                          height: '8px', 
                          background: '#52c41a', 
                          borderRadius: '50%' 
                        }} />
                        <Text style={{ color: '#131921', fontSize: '16px' }}>
                          Interface moderne et intuitive
                        </Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '8px', 
                          height: '8px', 
                          background: '#52c41a', 
                          borderRadius: '50%' 
                        }} />
                        <Text style={{ color: '#131921', fontSize: '16px' }}>
                          Sécurité et fiabilité garanties
                        </Text>
                      </div>
                    </Space>
                  </div>
                </Space>
              </div>
            </Col>

            {/* Section droite - Formulaire */}
            <Col xs={24} lg={12}>
              <Card
                style={{
                  borderRadius: 16,
                  border: '1px solid #e7e7e7',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)'
                }}
                styles={{ body: { padding: '32px' } }}
              >
                <Space direction="vertical" size={2} style={{ width: '100%' }}>
                  <div style={{ textAlign: 'center' }}>
                    <Title level={2} style={{ 
                      margin: 0, 
                      color: '#131921',
                      fontSize: '1.8rem',
                      fontWeight: 'bold'
                    }}>
                      Connexion
                    </Title>
                    <Text style={{ 
                      fontSize: '14px', 
                      color: '#565959',
                      marginTop: '4px',
                      display: 'block'
                    }}>
                      Accédez à votre espace personnel
                    </Text>
                  </div>

                  <Form
                    form={form}
                    name="login"
                    onFinish={handleSubmit}
                    layout="vertical"
                    size="middle"
                  >
                    <Form.Item
                      name="email"
                      label={<Text strong style={{ color: '#131921', fontSize: '16px' }}>Email</Text>}
                      rules={[
                        { required: true, message: 'Veuillez saisir votre email !' },
                        { type: 'email', message: 'Email invalide !' }
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined style={{ color: '#8c8c8c' }} />}
                        placeholder="votre@email.com"
                        autoComplete="email"
                        style={{ 
                          height: '48px',
                          borderRadius: '8px',
                          border: '2px solid #e7e7e7',
                          fontSize: '16px'
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label={<Text strong style={{ color: '#131921', fontSize: '16px' }}>Mot de passe</Text>}
                      rules={[
                        { required: true, message: 'Veuillez saisir votre mot de passe !' },
                        { min: 6, message: 'Le mot de passe doit contenir au moins 6 caractères !' }
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined style={{ color: '#8c8c8c' }} />}
                        placeholder="Votre mot de passe"
                        autoComplete="current-password"
                        style={{ 
                          height: '48px',
                          borderRadius: '8px',
                          border: '2px solid #e7e7e7',
                          fontSize: '16px'
                        }}
                      />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: '12px' }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                        size="large"
                        icon={<LoginOutlined />}
                        style={{
                          height: '52px',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          borderRadius: '8px',
                          background: 'linear-gradient(135deg, #ff9900 0%, #ffb84d 100%)',
                          border: 'none',
                          boxShadow: '0 4px 16px rgba(255, 153, 0, 0.3)'
                        }}
                      >
                        Se connecter
                      </Button>
                    </Form.Item>
                  </Form>

                  <Divider style={{ margin: '24px 0' }} />

                  <div style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#565959', fontSize: '16px' }}>
                      Pas encore de compte ?{' '}
                      <Link href="/signup" style={{ 
                        color: '#ff9900', 
                        fontWeight: 'bold',
                        fontSize: '16px',
                        textDecoration: 'none'
                      }}>
                        Créer un compte
                      </Link>
                    </Text>
                  </div>

                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <Link href="/products">
                      <Button 
                        type="text" 
                        icon={<ArrowLeftOutlined />}
                        style={{ 
                          color: '#565959',
                          fontSize: '16px'
                        }}
                      >
                        Retour aux produits
                      </Button>
                    </Link>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
}