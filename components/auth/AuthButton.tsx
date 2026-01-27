'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-lg" />
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
        >
          <UserIcon size={18} />
          <span className="hidden sm:inline">Mi Panel</span>
        </button>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => router.push('/login')}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
    >
      <LogIn size={18} />
      <span>Iniciar Sesión</span>
    </button>
  );
}
