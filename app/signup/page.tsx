'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, Typography, Space, Divider, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, UserAddOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAuth } from '../../lib/auth-context';
import AmazonLayout from '../../components/AmazonLayout';
import { LoadingState } from '../../shared';

const { Title, Text } = Typography;

export default function SignupPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { signup, isAuthenticated } = useAuth();
  const router = useRouter();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (values: { email: string; password: string; confirmPassword: string }) => {
    setLoading(true);
    try {
      const success = await signup(values.email, values.password);
      if (success) {
        router.push('/');
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <LoadingState type="spinner" message="Redirection en cours..." />;
  }

  return (
    <AmazonLayout>
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: 'calc(100vh - 300px)',
        padding: '40px 16px'
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Row gutter={[32, 32]} align="middle">
            {/* Section gauche - Branding */}
            <Col xs={24} lg={12}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <Space direction="vertical" size={20} style={{ width: '100%' }}>
                  <div>
                    <UserAddOutlined style={{ 
                      fontSize: '80px', 
                      color: '#ffffff',
                      marginBottom: '16px'
                    }} />
                    <Title level={1} style={{ 
                      color: '#ffffff', 
                      margin: 0,
                      fontSize: '2.5rem',
                      fontWeight: 'bold'
                    }}>
                      Rejoignez ProductManager
                    </Title>
                    <Text style={{ 
                      fontSize: '18px', 
                      color: 'rgba(255,255,255,0.9)',
                      display: 'block',
                      marginTop: '16px'
                    }}>
                      Commencez votre aventure avec nous dès aujourd&apos;hui
                    </Text>
                  </div>
                  
                  <div style={{ 
                    background: 'rgba(255,255,255,0.15)',
                    padding: '24px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Space direction="vertical" size={16} style={{ width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '8px', 
                          height: '8px', 
                          background: '#00ff88', 
                          borderRadius: '50%' 
                        }} />
                        <Text style={{ color: '#ffffff', fontSize: '16px' }}>
                          Accès immédiat à toutes les fonctionnalités
                        </Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '8px', 
                          height: '8px', 
                          background: '#00ff88', 
                          borderRadius: '50%' 
                        }} />
                        <Text style={{ color: '#ffffff', fontSize: '16px' }}>
                          Support client 24/7
                        </Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '8px', 
                          height: '8px', 
                          background: '#00ff88', 
                          borderRadius: '50%' 
                        }} />
                        <Text style={{ color: '#ffffff', fontSize: '16px' }}>
                          Mises à jour régulières et nouvelles fonctionnalités
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
                <Space direction="vertical" size={20} style={{ width: '100%' }}>
                  <div style={{ textAlign: 'center' }}>
                    <Title level={2} style={{ 
                      margin: 0, 
                      color: '#131921',
                      fontSize: '1.8rem',
                      fontWeight: 'bold'
                    }}>
                      Créer un compte
                    </Title>
                    <Text style={{ 
                      fontSize: '14px', 
                      color: '#565959',
                      marginTop: '4px',
                      display: 'block'
                    }}>
                      Remplissez le formulaire pour commencer
                    </Text>
                  </div>

                  <Form
                    form={form}
                    name="signup"
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
                        autoComplete="new-password"
                        style={{ 
                          height: '48px',
                          borderRadius: '8px',
                          border: '2px solid #e7e7e7',
                          fontSize: '16px'
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="confirmPassword"
                      label={<Text strong style={{ color: '#131921', fontSize: '16px' }}>Confirmer le mot de passe</Text>}
                      dependencies={['password']}
                      rules={[
                        { required: true, message: 'Veuillez confirmer votre mot de passe !' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('Les mots de passe ne correspondent pas !'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined style={{ color: '#8c8c8c' }} />}
                        placeholder="Confirmez votre mot de passe"
                        autoComplete="new-password"
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
                        icon={<UserAddOutlined />}
                        style={{
                          height: '52px',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          borderRadius: '8px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none',
                          boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)'
                        }}
                      >
                        Créer un compte
                      </Button>
                    </Form.Item>
                  </Form>

                  <Divider style={{ margin: '24px 0' }} />

                  <div style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#565959', fontSize: '16px' }}>
                      Déjà un compte ?{' '}
                      <Link href="/login" style={{ 
                        color: '#667eea', 
                        fontWeight: 'bold',
                        fontSize: '16px',
                        textDecoration: 'none'
                      }}>
                        Se connecter
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
    </AmazonLayout>
  );
}