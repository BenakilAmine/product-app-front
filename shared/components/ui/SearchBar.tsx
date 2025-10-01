'use client';

import React from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';

const { Search } = Input;

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  allowClear?: boolean;
  showSearchButton?: boolean;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Rechercher...',
  size = 'middle',
  allowClear = true,
  showSearchButton = false,
  onSearch,
  onClear,
  loading = false,
  disabled = false,
  className,
  style
}: SearchBarProps) {
  const handleSearch = (searchValue: string) => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleClear = () => {
    onChange('');
    if (onClear) {
      onClear();
    }
  };

  if (showSearchButton) {
    return (
      <Space.Compact style={{ width: '100%', ...style }} className={className}>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          size={size}
          disabled={disabled}
          onPressEnter={(e) => handleSearch((e.target as HTMLInputElement).value)}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => handleSearch(value)}
          loading={loading}
          disabled={disabled}
        >
          Rechercher
        </Button>
        {allowClear && value && (
          <Button
            icon={<ClearOutlined />}
            onClick={handleClear}
            disabled={disabled}
          />
        )}
      </Space.Compact>
    );
  }

  return (
    <Search
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      size={size}
      allowClear={allowClear}
      onSearch={handleSearch}
      loading={loading}
      disabled={disabled}
      className={className}
      style={style}
      enterButton={false}
    />
  );
}