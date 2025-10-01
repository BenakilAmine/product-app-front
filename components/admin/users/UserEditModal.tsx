import React from 'react';
import { Modal, Form, Input, Select, Tag } from 'antd';
import { UserOutlined, TeamOutlined, CrownOutlined } from '@ant-design/icons';
import { UserItem } from '../../../types/admin';

interface UserEditModalProps {
  visible: boolean;
  user: UserItem | null;
  onSave: (role: string) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function UserEditModal({
  visible,
  user,
  onSave,
  onCancel,
  loading = false
}: UserEditModalProps) {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({ role: user.role });
    }
  }, [user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave(values.role);
    } catch (error) {
      // Validation errors are handled by Ant Design
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Modifier le rôle utilisateur"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Sauvegarder"
      cancelText="Annuler"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Email">
          <Input value={user?.email} disabled />
        </Form.Item>
        <Form.Item
          name="role"
          label="Rôle"
          rules={[{ required: true, message: 'Veuillez sélectionner un rôle' }]}
        >
          <Select placeholder="Sélectionner un rôle">
            <Select.Option value="USER">
              <Tag color="green" icon={<UserOutlined />}>USER</Tag>
            </Select.Option>
            <Select.Option value="ADMIN">
              <Tag color="blue" icon={<TeamOutlined />}>ADMIN</Tag>
            </Select.Option>
            <Select.Option value="SUPER_ADMIN">
              <Tag color="red" icon={<CrownOutlined />}>SUPER_ADMIN</Tag>
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}