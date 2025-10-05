import React from 'react';
import { Input, Select, Space, Button } from 'antd';
import { SearchOutlined, FilterOutlined, ReloadOutlined, ExportOutlined } from '@ant-design/icons';

const { Option } = Select;

interface OrderFiltersProps {
  searchText: string;
  setSearchText: (text: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  onRefresh: () => void;
  onExport: () => void;
}

export const OrderFilters: React.FC<OrderFiltersProps> = ({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter,
  onRefresh,
  onExport
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      marginBottom: 20,
      gap: 16,
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', gap: 12, flex: 1, minWidth: 300 }}>
        <Input
          placeholder="Rechercher par client, commande, produit..."
          prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ 
            flex: 1,
            borderRadius: 8,
            height: 40
          }}
        />
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: 150, height: 40 }}
          suffixIcon={<FilterOutlined />}
        >
          <Option value="all">Tous les statuts</Option>
          <Option value="pending">En attente</Option>
          <Option value="processing">En cours</Option>
          <Option value="shipped">Expédié</Option>
          <Option value="delivered">Livré</Option>
          <Option value="cancelled">Annulé</Option>
        </Select>
      </div>
      
      <Space>
        <Button 
          icon={<ReloadOutlined />}
          onClick={onRefresh}
          style={{ borderRadius: 8 }}
        >
          Actualiser
        </Button>
        <Button 
          icon={<ExportOutlined />}
          type="primary"
          onClick={onExport}
          style={{ 
            background: '#f97316',
            borderColor: '#f97316',
            borderRadius: 8
          }}
        >
          Exporter
        </Button>
      </Space>
    </div>
  );
};