'use client';

import React, { useEffect } from 'react';
import { Form, Button, Card, Typography, Space, Divider } from 'antd';
import { ArrowLeftOutlined, ShoppingOutlined } from '@ant-design/icons';
// // import Link from 'next/link'; // Supprimé car non utilisé // Supprimé car non utilisé
import ProductFormFields from './products/ProductFormFields';
import { useProductMutations } from '../hooks/useProductMutations';
import { ProductFormProps } from '../types';
import { FormLayout } from '../shared';

const { Title, Text } = Typography;

export default function ProductForm({ productId, mode }: ProductFormProps) {
  const [form] = Form.useForm();
  const { handleSubmit, loading, productData, isEdit } = useProductMutations({ productId, mode });

  // Charger les données du produit en mode édition
  useEffect(() => {
    if (mode === 'edit' && productData) {
      form.setFieldsValue({
        name: productData.name,
        price: productData.price,
      });
    }
  }, [productData, form, mode]);

  return (
    <FormLayout
      title={isEdit ? 'Modifier le produit' : 'Nouveau produit'}
      subtitle={isEdit 
        ? 'Modifiez les informations de votre produit'
        : 'Ajoutez un nouveau produit à votre catalogue'
      }
      icon={<ShoppingOutlined style={{ fontSize: '48px', color: '#1890ff' }} />}
      backUrl="/"
      backLabel="Retour à la liste"
      loading={loading}
    >
      <ProductFormFields
        form={form}
        onFinish={handleSubmit}
        loading={loading}
        isEdit={isEdit}
      />
    </FormLayout>
  );
}