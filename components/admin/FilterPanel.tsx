'use client';

import { Card, Form, Input, Select, DatePicker, Button, Space, Row, Col, Typography } from 'antd';
import { SearchOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text } = Typography;

interface FilterOption {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'dateRange';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface FilterPanelProps {
  filters: FilterOption[];
  onFilterChange: (filters: Record<string, string | number>) => void;
  onClear: () => void;
  loading?: boolean;
  className?: string;
}

export default function FilterPanel({ 
  filters, 
  onFilterChange, 
  onClear, 
  loading = false,
  className 
}: FilterPanelProps) {
  const [form] = Form.useForm();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (changedValues: Record<string, unknown>, allValues: Record<string, unknown>) => {
    onFilterChange(allValues as Record<string, string | number>);
  };

  const handleClear = () => {
    form.resetFields();
    onClear();
  };

  const renderFilterInput = (filter: FilterOption) => {
    switch (filter.type) {
      case 'text':
        return (
          <Input
            placeholder={filter.placeholder || `Rechercher par ${filter.label.toLowerCase()}`}
            prefix={<SearchOutlined />}
          />
        );
      case 'select':
        return (
          <Select
            placeholder={`Sélectionner ${filter.label.toLowerCase()}`}
            allowClear
            style={{ width: '100%' }}
          >
            {filter.options?.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      case 'date':
        return (
          <DatePicker
            placeholder={`Sélectionner une date`}
            style={{ width: '100%' }}
          />
        );
      case 'dateRange':
        return (
          <RangePicker
            placeholder={['Date de début', 'Date de fin']}
            style={{ width: '100%' }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card 
      className={className}
      style={{ marginBottom: 16 }}
      title={
        <Space>
          <FilterOutlined aria-hidden="true" />
          <Text strong>Filtres avancés</Text>
          <Button 
            type="link" 
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls="filter-content"
          >
            {isExpanded ? 'Réduire' : 'Développer'}
          </Button>
        </Space>
      }
      extra={
        <Button 
          icon={<ClearOutlined />} 
          onClick={handleClear}
          disabled={loading}
          aria-label="Effacer tous les filtres"
        >
          Effacer
        </Button>
      }
    >
      <div id="filter-content" role="region" aria-label="Contenu des filtres">
        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleFilterChange}
          initialValues={{}}
          role="search"
          aria-label="Formulaire de filtrage"
        >
          <Row gutter={[16, 16]}>
            {filters.map((filter, index) => (
              <Col 
                key={filter.key} 
                xs={24} 
                sm={12} 
                md={8} 
                lg={6}
                style={{ display: isExpanded || index < 3 ? 'block' : 'none' }}
              >
                <Form.Item
                  name={filter.key}
                  label={filter.label}
                  style={{ marginBottom: 0 }}
                >
                  {renderFilterInput(filter)}
                </Form.Item>
              </Col>
            ))}
          </Row>
        </Form>
      </div>
    </Card>
  );
}