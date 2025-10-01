'use client';

import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'antd';
import ProductFormFields from './ProductFormFields';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useToastNotifications } from '../../hooks/useToastNotifications';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      price
      updatedAt
    }
  }
`;

export interface ProductEditModalProps {
  open: boolean;
  onClose: () => void;
  onUpdated?: () => void;
  product?: { id: string; name: string; price: number } | null;
}

export default function ProductEditModal({ open, onClose, onUpdated, product }: ProductEditModalProps) {
  const [form] = Form.useForm();
  const { notifyProductUpdated, notifyApiError } = useToastNotifications();
  const [updateProduct, { loading }] = useMutation(UPDATE_PRODUCT_MUTATION);

  useEffect(() => {
    if (open && product) {
      form.setFieldsValue({ name: product.name, price: product.price });
    } else {
      form.resetFields();
    }
  }, [open, product, form]);

  const handleFinish = async (values: { name: string; price: number }) => {
    if (!product) return;
    try {
      const { data } = await updateProduct({ variables: { id: product.id, input: values } });
      notifyProductUpdated(data?.updateProduct?.name);
      onClose();
      form.resetFields();
      onUpdated?.();
    } catch (e: any) {
      notifyApiError(e.message);
    }
  };

  return (
    <Modal title={product ? `Modifier "${product.name}"` : 'Modifier le produit'} open={open} onCancel={onClose} footer={null} destroyOnClose>
      <ProductFormFields form={form as any} onFinish={handleFinish as any} isEdit={true} loading={loading} hideActions />
      <div style={{ textAlign: 'right', marginTop: 8 }}>
        <Button onClick={onClose} disabled={loading}>Annuler</Button>
        <Button type="primary" loading={loading} onClick={() => form.submit()} style={{ marginLeft: 8 }}>
          Enregistrer
        </Button>
      </div>
    </Modal>
  );
}