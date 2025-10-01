'use client';

import React from 'react';
import { Form, Input, InputNumber, Button, Space, Row, Col, Divider } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { productValidationRules } from '../../utils/productValidation';
import { ProductFormFieldsProps } from '../../types';
import { priceInputConfig } from '../../shared/utils/priceUtils';

export default function ProductFormFields({ form, onFinish, loading, isEdit, hideActions = false }: ProductFormFieldsProps) {
  return (
    <Form
      form={form}
      name="productForm"
      onFinish={onFinish}
      layout="vertical"
      size="large"
      disabled={loading}
    >
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Form.Item
            name="name"
            label="Nom du produit"
            rules={productValidationRules.name}
          >
            <Input
              placeholder="Ex: iPhone 15 Pro"
              style={{ fontSize: '16px' }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="price"
            label="Prix (€)"
            rules={productValidationRules.price}
          >
            <InputNumber
              placeholder="Ex: 1 299,99"
              style={{ width: '100%', fontSize: '16px' }}
              {...priceInputConfig}
            />
          </Form.Item>
        </Col>
      </Row>

      {!hideActions && (
        <>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            <Space size="large">
              <Link href="/">
                <Button size="large" disabled={loading}>
                  Annuler
                </Button>
              </Link>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                icon={<SaveOutlined />}
              >
                {isEdit ? 'Modifier le produit' : 'Créer le produit'}
              </Button>
            </Space>
          </div>
        </>
      )}
    </Form>
  );
}