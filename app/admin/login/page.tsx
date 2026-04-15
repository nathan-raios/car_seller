'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/lib/hooks/useAdmin';
import { Button } from '@/components/ui';
import { loginAdmin } from '@/lib/firebase/auth';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAdmin, loading } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && isAdmin) {
      router.push('/admin/dashboard');
    }
  }, [loading, isAdmin, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginAdmin(email, password);
      toast.success('Connexion réussie!');
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/wrong-password') {
        toast.error('Mot de passe incorrect');
      } else if (error.code === 'auth/user-not-found') {
        toast.error('Utilisateur non trouvé');
      } else {
        toast.error('Erreur lors de la connexion');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-2 to-dark-3 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-semibold text-gold italic mb-2">
            AutoPrestige
          </h1>
          <p className="text-gray-400">Administration</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="bg-dark-2 p-8 rounded-xl border border-dark-3">
          <h2 className="text-2xl font-semibold text-light mb-6">Connexion</h2>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-light mb-2">
              Adresse email
            </label>
            <input
              type="email"
              placeholder="admin@autoprestige.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-light mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading}
            className="w-full"
          >
            Se connecter
          </Button>

          {/* Info */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Seuls les administrateurs autorisés peuvent accéder à cette section.
          </p>
        </form>
      </div>
    </div>
  );
}
