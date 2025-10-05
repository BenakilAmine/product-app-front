import React from 'react';
import { Modal, Typography, Row, Col, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Order } from '../data/ordersData';

const { Title, Text } = Typography;

interface OrderDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  order: Order | null;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  visible,
  onClose,
  order
}) => {
  if (!order) return null;

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: order.product.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20
          }}>
            {order.product.icon}
          </div>
          <div>
            <Title level={4} style={{ margin: 0, color: '#111827' }}>
              Détails de la commande {order.orderId}
            </Title>
            <Text style={{ color: '#6b7280', fontSize: 14 }}>
              {order.customer} • {order.date}
            </Text>
          </div>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <button key="close" onClick={onClose}>
          Fermer
        </button>,
        <button key="edit" type="button" style={{
          background: '#f97316',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: 6,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <EditOutlined />
          Modifier
        </button>
      ]}
      width={800}
      style={{ top: 20 }}
    >
      <div style={{ padding: '16px 0' }}>
        <Row gutter={[24, 16]}>
          <Col span={12}>
            <Title level={5} style={{ color: '#111827', marginBottom: 8 }}>Informations client</Title>
            <div style={{ background: '#f9fafb', padding: 16, borderRadius: 8 }}>
              <Text style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
                {order.customer}
              </Text>
              <Text style={{ display: 'block', marginBottom: 4, color: '#6b7280' }}>
                {order.email}
              </Text>
              <Text style={{ display: 'block', color: '#6b7280', fontSize: 12 }}>
                {order.shippingAddress}
              </Text>
            </div>
          </Col>
          <Col span={12}>
            <Title level={5} style={{ color: '#111827', marginBottom: 8 }}>Informations commande</Title>
            <div style={{ background: '#f9fafb', padding: 16, borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text>Statut:</Text>
                <Tag color={order.status.name === 'Delivered' ? 'green' : order.status.name === 'Shipped' ? 'orange' : order.status.name === 'Processing' ? 'blue' : order.status.name === 'Pending' ? 'yellow' : 'red'}>
                  {order.status.name}
                </Tag>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text>Paiement:</Text>
                <Text style={{ fontWeight: 500 }}>{order.paymentMethod}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text>Priorité:</Text>
                <Tag color={order.priority === 'high' ? 'red' : order.priority === 'medium' ? 'orange' : 'green'}>
                  {order.priority}
                </Tag>
              </div>
            </div>
          </Col>
        </Row>
        
        <div style={{ marginTop: 24 }}>
          <Title level={5} style={{ color: '#111827', marginBottom: 12 }}>Produit commandé</Title>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 16, 
            padding: 16, 
            background: '#f9fafb', 
            borderRadius: 8 
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: order.product.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24
            }}>
              {order.product.icon}
            </div>
            <div style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {order.product.name}
              </Text>
              <Tag color="blue">{order.product.category}</Tag>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Text style={{ fontSize: 18, fontWeight: 700, color: '#111827', display: 'block' }}>
                ${order.total.toFixed(2)}
              </Text>
              <Text style={{ color: '#6b7280' }}>
                Quantité: {order.qty}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};