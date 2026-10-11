export type CategoryId = 
  | 'todos'
  | 'panes'
  | 'facturas'
  | 'churros-bolitas'
  | 'rotiseria'
  | 'pizzas-empanadas'
  | 'tartas'
  | 'sandwiches'
  | 'dulces';

export interface ProductOption {
  name: string;
  choices: {
    label: string;
    extraPrice?: number;
  }[];
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  unit: string; // e.g. "x docena", "x kg", "x unidad", "porción"
  description: string;
  badge?: string; // e.g. "Recién Horneado", "Favorito de Vivi", "Especialidad"
  popular?: boolean;
  image: string;
  options?: ProductOption[];
  tags: string[];
  stockStatus?: 'disponible' | 'ultimas_unidades' | 'recien_salido';
  maxQuantity?: number; // e.g. 100 for breads
  minQuantity?: number; // default 1
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  selectedOptions: Record<string, string>;
  specialInstructions?: string;
  itemTotalPrice: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  deliveryType: 'takeaway' | 'delivery';
  paymentMethod: 'efectivo' | 'transferencia' | 'tarjeta';
  notes?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
  status: 'confirmado' | 'en_horno' | 'empaquetando' | 'listo';
}
