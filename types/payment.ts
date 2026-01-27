export interface Payment {
  id: string;
  user_id: string;
  course_id: string;
  coupon_id?: string;
  stripe_payment_id?: string;
  stripe_session_id?: string;
  amount: number;
  currency: string;
  discount_amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method?: string;
  refund_reason?: string;
  refunded_at?: string;
  created_at: string;
  // Relaciones (joins)
  user?: {
    full_name: string;
    avatar_url?: string;
  };
  course?: {
    title: string;
    slug: string;
  };
  coupon?: {
    code: string;
  };
}

export interface PaymentStats {
  total_revenue: number;
  total_transactions: number;
  completed_payments: number;
  refunded_payments: number;
  average_order_value: number;
}

export const PAYMENT_STATUS_LABELS: Record<Payment['status'], string> = {
  pending: 'Pendiente',
  completed: 'Completado',
  failed: 'Fallido',
  refunded: 'Reembolsado'
};

export const PAYMENT_STATUS_COLORS: Record<Payment['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-700'
};
