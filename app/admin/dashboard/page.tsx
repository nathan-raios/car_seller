'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, DollarSign, TrendingUp, Mail, type LucideIcon } from 'lucide-react';
import { getVehicules, getMessages } from '@/lib/firebase/firestore';
import { Vehicule, Message } from '@/lib/types';
import { formatPrice } from '@/lib/utils/formatters';
import { LoadingSpinner } from '@/components/ui';

interface StatCard {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export default function AdminDashboardPage() {
  const [vehicles, setVehicles] = useState<Vehicule[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [vehiclesData, messagesData] = await Promise.all([
          getVehicules(),
          getMessages(),
        ]);
        setVehicles(vehiclesData);
        setMessages(messagesData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const stats: StatCard[] = [
    {
      title: 'Véhicules Total',
      value: vehicles.length,
      icon: Package,
      color: 'from-gold to-gold-light',
    },
    {
      title: 'Véhicules Neufs',
      value: vehicles.filter((v) => v.type === 'neuf').length,
      icon: TrendingUp,
      color: 'from-blue-600 to-blue-400',
    },
    {
      title: 'Véhicules Occasions',
      value: vehicles.filter((v) => v.type === 'occasion').length,
      icon: TrendingUp,
      color: 'from-purple-600 to-purple-400',
    },
    {
      title: 'Valeur Stock',
      value: formatPrice(vehicles.reduce((sum, v) => sum + v.prix, 0)),
      icon: DollarSign,
      color: 'from-green-600 to-green-400',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display font-light text-light mb-2">
          Tableau de Bord
        </h1>
        <p className="text-gray-400">Bienvenue sur votre espace d'administration</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl text-dark font-semibold overflow-hidden relative group`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm opacity-90 font-body mb-2">{stat.title}</p>
                  <p className="text-3xl font-display font-bold">{stat.value}</p>
                </div>
                <Icon size={32} className="opacity-30" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Vehicles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-2 rounded-xl border border-dark-3 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Package size={24} className="text-gold" />
            <h2 className="text-xl font-semibold text-light">Ajouts Récents</h2>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {vehicles.slice(0, 5).map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-start justify-between p-3 bg-dark-3 rounded-lg hover:bg-dark-4 transition"
              >
                <div>
                  <p className="font-semibold text-light">
                    {vehicle.marque} {vehicle.modele}
                  </p>
                  <p className="text-sm text-gray-400">{vehicle.annee}</p>
                </div>
                <p className="text-gold font-semibold">{formatPrice(vehicle.prix)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-2 rounded-xl border border-dark-3 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Mail size={24} className="text-gold" />
            <h2 className="text-xl font-semibold text-light">Messages Récents</h2>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {messages.slice(0, 5).map((message) => (
              <div
                key={message.id}
                className="p-3 bg-dark-3 rounded-lg hover:bg-dark-4 transition"
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="font-semibold text-light">{message.nom}</p>
                  {!message.lu && (
                    <span className="w-2 h-2 bg-gold rounded-full mt-1" />
                  )}
                </div>
                <p className="text-sm text-gray-400 truncate">{message.message}</p>
                <p className="text-xs text-gray-500 mt-1">{message.email}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
