export interface Order {
  key: string;
  no: number;
  orderId: string;
  customer: string;
  email: string;
  product: {
    name: string;
    category: string;
    icon: string;
    iconBg: string;
  };
  qty: number;
  total: number;
  date: string;
  time: string;
  status: {
    name: string;
    dotColor: string;
    textColor: string;
    bgColor: string;
    borderColor: string;
  };
  priority: string;
  paymentMethod: string;
  shippingAddress: string;
}

export const ordersData: Order[] = [
  {
    key: '1',
    no: 1,
    orderId: '#10234',
    customer: 'Amaya Weller',
    email: 'amaya.weller@email.com',
    product: {
      name: 'Wireless Headphones Pro',
      category: 'Electronics',
      icon: '🎧',
      iconBg: '#1f2937'
    },
    qty: 2,
    total: 199.98,
    date: '2024-01-15',
    time: '14:30',
    status: {
      name: 'Shipped',
      dotColor: '#f97316',
      textColor: '#f97316',
      bgColor: '#fef3c7',
      borderColor: '#fde68a'
    },
    priority: 'high',
    paymentMethod: 'Credit Card',
    shippingAddress: '123 Main St, New York, NY 10001'
  },
  {
    key: '2',
    no: 2,
    orderId: '#10235',
    customer: 'Sebastian Adams',
    email: 'sebastian.adams@email.com',
    product: {
      name: 'Running Shoes Sport',
      category: 'Fashion',
      icon: '👟',
      iconBg: '#ef4444'
    },
    qty: 1,
    total: 89.99,
    date: '2024-01-15',
    time: '09:15',
    status: {
      name: 'Processing',
      dotColor: '#f97316',
      textColor: '#f97316',
      bgColor: '#fef3c7',
      borderColor: '#fde68a'
    },
    priority: 'medium',
    paymentMethod: 'PayPal',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90210'
  },
  {
    key: '3',
    no: 3,
    orderId: '#10236',
    customer: 'Suzanne Bright',
    email: 'suzanne.bright@email.com',
    product: {
      name: 'Smartwatch Series 8',
      category: 'Electronics',
      icon: '⌚',
      iconBg: '#1f2937'
    },
    qty: 1,
    total: 399.99,
    date: '2024-01-14',
    time: '16:45',
    status: {
      name: 'Delivered',
      dotColor: '#10b981',
      textColor: '#10b981',
      bgColor: '#d1fae5',
      borderColor: '#a7f3d0'
    },
    priority: 'high',
    paymentMethod: 'Apple Pay',
    shippingAddress: '789 Pine St, Chicago, IL 60601'
  },
  {
    key: '4',
    no: 4,
    orderId: '#10237',
    customer: 'Peter Howl',
    email: 'peter.howl@email.com',
    product: {
      name: 'Coffee Maker Deluxe',
      category: 'Home & Kitchen',
      icon: '☕',
      iconBg: '#ef4444'
    },
    qty: 1,
    total: 149.99,
    date: '2024-01-14',
    time: '11:20',
    status: {
      name: 'Pending',
      dotColor: '#ef4444',
      textColor: '#ef4444',
      bgColor: '#fee2e2',
      borderColor: '#fecaca'
    },
    priority: 'low',
    paymentMethod: 'Bank Transfer',
    shippingAddress: '321 Elm St, Houston, TX 77001'
  },
  {
    key: '5',
    no: 5,
    orderId: '#10238',
    customer: 'Anita Singh',
    email: 'anita.singh@email.com',
    product: {
      name: 'Bluetooth Speaker Plus',
      category: 'Electronics',
      icon: '🔊',
      iconBg: '#d97706'
    },
    qty: 3,
    total: 179.97,
    date: '2024-01-13',
    time: '13:10',
    status: {
      name: 'Shipped',
      dotColor: '#f97316',
      textColor: '#f97316',
      bgColor: '#fef3c7',
      borderColor: '#fde68a'
    },
    priority: 'medium',
    paymentMethod: 'Credit Card',
    shippingAddress: '654 Maple Dr, Phoenix, AZ 85001'
  },
  {
    key: '6',
    no: 6,
    orderId: '#10239',
    customer: 'Michael Chen',
    email: 'michael.chen@email.com',
    product: {
      name: 'Gaming Laptop Pro',
      category: 'Electronics',
      icon: '💻',
      iconBg: '#1f2937'
    },
    qty: 1,
    total: 1299.99,
    date: '2024-01-13',
    time: '10:30',
    status: {
      name: 'Processing',
      dotColor: '#f97316',
      textColor: '#f97316',
      bgColor: '#fef3c7',
      borderColor: '#fde68a'
    },
    priority: 'high',
    paymentMethod: 'Credit Card',
    shippingAddress: '987 Cedar Ln, Seattle, WA 98101'
  },
  {
    key: '7',
    no: 7,
    orderId: '#10240',
    customer: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    product: {
      name: 'Yoga Mat Premium',
      category: 'Sports',
      icon: '🧘',
      iconBg: '#10b981'
    },
    qty: 2,
    total: 79.98,
    date: '2024-01-12',
    time: '15:45',
    status: {
      name: 'Delivered',
      dotColor: '#10b981',
      textColor: '#10b981',
      bgColor: '#d1fae5',
      borderColor: '#a7f3d0'
    },
    priority: 'low',
    paymentMethod: 'PayPal',
    shippingAddress: '147 Birch St, Denver, CO 80201'
  },
  {
    key: '8',
    no: 8,
    orderId: '#10241',
    customer: 'David Wilson',
    email: 'david.wilson@email.com',
    product: {
      name: 'Kitchen Knife Set',
      category: 'Home & Kitchen',
      icon: '🔪',
      iconBg: '#dc2626'
    },
    qty: 1,
    total: 199.99,
    date: '2024-01-12',
    time: '08:20',
    status: {
      name: 'Cancelled',
      dotColor: '#6b7280',
      textColor: '#6b7280',
      bgColor: '#f3f4f6',
      borderColor: '#d1d5db'
    },
    priority: 'medium',
    paymentMethod: 'Credit Card',
    shippingAddress: '258 Spruce Ave, Miami, FL 33101'
  }
];