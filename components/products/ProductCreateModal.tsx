'use client';

import React from 'react';
import { Modal, Button, Form } from 'antd';
import ProductFormFields from './ProductFormFields';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useToastNotifications } from '../../hooks/useToastNotifications';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      price
      createdAt
    }
  }
`;

export interface ProductCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export default function ProductCreateModal({ open, onClose, onCreated }: ProductCreateModalProps) {
  const [form] = Form.useForm();
  const { notifyProductCreated, notifyApiError } = useToastNotifications();
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION);

  const handleFinish = async (values: { name: string; price: number }) => {
    try {
      const { data } = await createProduct({ variables: { input: values } });
      notifyProductCreated(data?.createProduct?.name);
      onClose();
      form.resetFields();
      onCreated?.();
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Erreur lors de la création';
      notifyApiError(errorMessage);
    }
  };

  return (
    <Modal title="Nouveau produit" open={open} onCancel={onClose} footer={null} destroyOnClose>
      <ProductFormFields form={form} onFinish={handleFinish} isEdit={false} loading={loading} hideActions />
      <div style={{ textAlign: 'right', marginTop: 8 }}>
        <Button onClick={onClose} disabled={loading}>Annuler</Button>
        <Button type="primary" loading={loading} onClick={() => form.submit()} style={{ marginLeft: 8 }}>
          Créer
        </Button>
      </div>
    </Modal>
  );
}