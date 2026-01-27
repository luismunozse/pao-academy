export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_purchase: number;
  max_uses?: number;
  used_count: number;
  course_id?: string;
  starts_at?: string;
  expires_at?: string;
  is_active: boolean;
  created_at: string;
  // Relaciones
  course?: {
    title: string;
    slug: string;
  };
}

export interface CouponFormData {
  code: string;
  description?: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_purchase?: number;
  max_uses?: number;
  course_id?: string;
  starts_at?: string;
  expires_at?: string;
  is_active: boolean;
}

export const getEmptyCoupon = (): CouponFormData => ({
  code: '',
  description: '',
  discount_type: 'percentage',
  discount_value: 10,
  min_purchase: 0,
  max_uses: undefined,
  course_id: undefined,
  starts_at: undefined,
  expires_at: undefined,
  is_active: true
});

export const generateCouponCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};
