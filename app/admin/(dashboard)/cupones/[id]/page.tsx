import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import CouponForm from '@/components/admin/coupons/CouponForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCouponPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: coupon, error } = await supabase
    .from('coupons')
    .select('*, course:courses(title, slug)')
    .eq('id', id)
    .single();

  if (error || !coupon) {
    notFound();
  }

  return <CouponForm initialCoupon={coupon} />;
}
