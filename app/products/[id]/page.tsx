'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { Product, ProductPageResponse } from '../../../types/product';
import { 
  Card, 
  Typography, 
  Space, 
  Tag, 
  Button, 
  Spin, 
  Result, 
  Row, 
  Col, 
  Divider, 
  Rate, 
  Badge, 
  Avatar,
  InputNumber,
  message
} from 'antd';
import Link from 'next/link';
import { 
  ArrowLeftOutlined, 
  HeartOutlined, 
  ShareAltOutlined, 
  ShoppingCartOutlined,
  StarOutlined,
  UserOutlined,
  CalendarOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { useAuth } from '../../../lib/auth-context';
import AmazonLayout from '../../../components/AmazonLayout';

const { Title, Text } = Typography;


const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      price
      createdAt
      updatedAt
      user { 
        id 
        email 
      }
    }
  }
`;

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const { data, loading, error } = useQuery<ProductPageResponse>(GET_PRODUCT, {
    variables: { id: params?.id },
    skip: !params?.id,
    fetchPolicy: 'cache-and-network'
  });

  const handleAddToCart = () => {
    message.success(`${quantity} produit(s) ajouté(s) au panier`);
    // TODO: Implémenter l'ajout au panier
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    message.success(isFavorite ? 'Retiré des favoris' : 'Ajouté aux favoris');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data?.product?.name,
        text: `Découvrez ce produit: ${data?.product?.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      message.success('Lien copié dans le presse-papiers');
    }
  };

  if (loading) {
    return (
      <AmazonLayout>
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin size="large" />
        </div>
      </AmazonLayout>
    );
  }

  if (error) {
    return (
      <AmazonLayout>
        <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
          <Result
            status="error"
            title="Erreur lors du chargement du produit"
            subTitle={error.message}
            extra={<Link href="/products"><Button icon={<ArrowLeftOutlined />}>Retour aux produits</Button></Link>}
          />
        </div>
      </AmazonLayout>
    );
  }

  const product = data?.product ?? null;

  if (!product) {
    return (
      <AmazonLayout>
        <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
          <Result
            status="404"
            title="Produit introuvable"
            extra={<Link href="/products"><Button icon={<ArrowLeftOutlined />}>Retour aux produits</Button></Link>}
          />
        </div>
      </AmazonLayout>
    );
  }

  const imageUrl = `https://picsum.photos/seed/product-${product.id}/800/600`;
  const isOwner = isAuthenticated && user?.id === product.user.id;

  return (
    <AmazonLayout>
      <div style={{ padding: '24px 16px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Navigation */}
        <div style={{ marginBottom: 24 }}>
          <Link href="/products">
            <Button icon={<ArrowLeftOutlined />} type="text">
              Retour aux produits
            </Button>
          </Link>
        </div>

        <Row gutter={[32, 32]}>
          {/* Image principale */}
          <Col xs={24} lg={12}>
            <Card 
              style={{ 
                borderRadius: 16,
                border: '1px solid #e7e7e7',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}
              styles={{ body: { padding: 0 } }}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={imageUrl}
                  alt={product.name}
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    display: 'block'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  display: 'flex',
                  gap: 8
                }}>
                  <Button
                    type="text"
                    shape="circle"
                    icon={<HeartOutlined />}
                    onClick={handleToggleFavorite}
                    style={{
                      background: 'rgba(255,255,255,0.9)',
                      color: isFavorite ? '#ff4d4f' : '#8c8c8c',
                      border: 'none'
                    }}
                  />
                  <Button
                    type="text"
                    shape="circle"
                    icon={<ShareAltOutlined />}
                    onClick={handleShare}
                    style={{
                      background: 'rgba(255,255,255,0.9)',
                      color: '#8c8c8c',
                      border: 'none'
                    }}
                  />
                </div>
              </div>
            </Card>
          </Col>

          {/* Informations produit */}
          <Col xs={24} lg={12}>
            <Space direction="vertical" size={24} style={{ width: '100%' }}>
              {/* Titre et prix */}
              <div>
                <Title level={1} style={{ margin: 0, color: '#131921', fontSize: '2rem' }}>
                  {product.name}
                </Title>
                <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Text style={{ 
                    color: '#B12704', 
                    fontWeight: 'bold', 
                    fontSize: '2rem',
                    lineHeight: 1
                  }}>
                    {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </Text>
                  <Badge count="Livraison gratuite" style={{ background: '#52c41a' }} />
                </div>
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Rate disabled defaultValue={4.5} style={{ fontSize: 16 }} />
                  <Text type="secondary">(4.5) • 128 avis</Text>
                </div>
              </div>

              {/* Quantité et actions */}
              <div>
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  <div>
                    <Text strong style={{ display: 'block', marginBottom: 8 }}>Quantité :</Text>
                    <InputNumber
                      min={1}
                      max={10}
                      value={quantity}
                      onChange={(value) => setQuantity(value || 1)}
                      style={{ width: 120 }}
                    />
                  </div>
                  
                  <Space wrap>
                    <Button
                      type="primary"
                      size="large"
                      icon={<ShoppingCartOutlined />}
                      onClick={handleAddToCart}
                      style={{
                        background: '#ff9900',
                        borderColor: '#ff9900',
                        height: 48,
                        fontSize: 16,
                        fontWeight: 500
                      }}
                    >
                      Ajouter au panier
                    </Button>
                    <Button
                      size="large"
                      icon={<HeartOutlined />}
                      onClick={handleToggleFavorite}
                      style={{
                        height: 48,
                        color: isFavorite ? '#ff4d4f' : '#8c8c8c'
                      }}
                    >
                      {isFavorite ? 'Retiré des favoris' : 'Ajouter aux favoris'}
                    </Button>
                  </Space>
                </Space>
              </div>

              {/* Informations vendeur */}
              <Card style={{ background: '#f8f9fa', border: '1px solid #e7e7e7' }}>
                <Space direction="vertical" size={12} style={{ width: '100%' }}>
                  <Text strong style={{ color: '#131921' }}>Vendu par :</Text>
                  <Space>
                    <Avatar icon={<UserOutlined />} style={{ background: '#1890ff' }} />
                    <div>
                      <Text strong>{product.user.email}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Vendeur vérifié
                      </Text>
                    </div>
                  </Space>
                </Space>
              </Card>

              {/* Actions propriétaire */}
              {isOwner && (
                <Card style={{ background: '#e6f7ff', border: '1px solid #91d5ff' }}>
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <Text strong style={{ color: '#1890ff' }}>Vous êtes le propriétaire de ce produit</Text>
                    <Space>
                      <Button 
                        type="primary" 
                        onClick={() => router.push(`/products/${product.id}/edit`)}
                      >
                        Modifier le produit
                      </Button>
                      <Button onClick={() => router.push('/admin/products')}>
                        Gérer mes produits
                      </Button>
                    </Space>
                  </Space>
                </Card>
              )}
            </Space>
          </Col>
        </Row>

        {/* Informations détaillées */}
        <Row gutter={[32, 32]} style={{ marginTop: 48 }}>
          <Col xs={24} lg={16}>
            <Card title="Description du produit" style={{ borderRadius: 16 }}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Text>
                  Découvrez ce produit exceptionnel qui allie qualité et design. 
                  Parfait pour tous vos besoins, il vous accompagnera dans votre quotidien.
                </Text>
                <Divider />
                <div>
                  <Text strong style={{ display: 'block', marginBottom: 8 }}>Caractéristiques :</Text>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    <li>Matériau de haute qualité</li>
                    <li>Design moderne et élégant</li>
                    <li>Facile à utiliser</li>
                    <li>Garantie 2 ans</li>
                  </ul>
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Informations produit" style={{ borderRadius: 16 }}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">ID du produit :</Text>
                  <Text code>{product.id}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Date de création :</Text>
                  <Text>{new Date(product.createdAt).toLocaleDateString('fr-FR')}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">Dernière mise à jour :</Text>
                  <Text>{new Date(product.updatedAt).toLocaleDateString('fr-FR')}</Text>
                </div>
                <Divider />
                <div style={{ textAlign: 'center' }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Produit créé le {new Date(product.createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </AmazonLayout>
  );
}

