'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui';
import { addMessage } from '@/lib/firebase/firestore';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const messageSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Veuillez entrer une adresse email valide'),
  telephone: z.string().optional(),
  sujet: z.enum(['achat', 'essai', 'financement', 'autre']),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

type MessageFormData = z.infer<typeof messageSchema>;

export default function ContactPage() {
  const searchParams = useSearchParams();
  const vehiculeId = searchParams?.get('vehiculeId');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: MessageFormData) => {
    setLoading(true);
    try {
      await addMessage({
        ...data,
        vehiculeId: vehiculeId || undefined,
      });
      toast.success('Message envoyé avec succès! Nous vous recontacterons prochainement.');
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-display font-light text-light mb-4">
            Nous Contacter
          </h1>
          <p className="text-gray-400 text-lg">
            Une question? Un projet? N'hésitez pas à nous écrire.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Phone */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-dark-3 rounded-lg flex items-center justify-center">
                  <Phone size={20} className="text-gold" />
                </div>
                <h3 className="font-semibold text-light">Téléphone</h3>
              </div>
              <p className="text-gray-400 ml-13">
                <a href="tel:+33123456789" className="hover:text-gold transition">
                  +33 (0)1 23 45 67 89
                </a>
              </p>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-dark-3 rounded-lg flex items-center justify-center">
                  <Mail size={20} className="text-gold" />
                </div>
                <h3 className="font-semibold text-light">Email</h3>
              </div>
              <p className="text-gray-400 ml-13">
                <a href="mailto:contact@autoprestige.fr" className="hover:text-gold transition">
                  contact@autoprestige.fr
                </a>
              </p>
            </div>

            {/* Address */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-dark-3 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-gold" />
                </div>
                <h3 className="font-semibold text-light">Adresse</h3>
              </div>
              <p className="text-gray-400 ml-13">
                123 Avenue des Champs-Élysées<br />
                75008 Paris, France
              </p>
            </div>

            {/* Hours */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-dark-3 rounded-lg flex items-center justify-center">
                  <Clock size={20} className="text-gold" />
                </div>
                <h3 className="font-semibold text-light">Horaires</h3>
              </div>
              <div className="text-gray-400 ml-13 space-y-1 text-sm">
                <p>Lundi - Vendredi: 9h00 - 18h00</p>
                <p>Samedi: 10h00 - 17h00</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-dark-2 p-8 rounded-xl border border-dark-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Nom */}
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    {...register('nom')}
                    className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
                  />
                  {errors.nom && (
                    <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    {...register('email')}
                    className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Telephone */}
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    placeholder="+33 (0)..."
                    {...register('telephone')}
                    className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
                  />
                </div>

                {/* Sujet */}
                <div>
                  <label className="block text-sm font-semibold text-light mb-2">
                    Sujet *
                  </label>
                  <select
                    {...register('sujet')}
                    className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition"
                  >
                    <option value="autre">Sélectionner un sujet</option>
                    <option value="achat">Achat</option>
                    <option value="essai">Essai routier</option>
                    <option value="financement">Financement</option>
                    <option value="autre">Autre</option>
                  </select>
                  {errors.sujet && (
                    <p className="text-red-500 text-sm mt-1">{errors.sujet.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-light mb-2">
                  Message *
                </label>
                <textarea
                  placeholder="Votre message..."
                  rows={6}
                  {...register('message')}
                  className="w-full px-4 py-2 bg-dark-3 text-light rounded-lg border border-dark-4 focus:border-gold outline-none transition resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button type="submit" size="lg" variant="primary" loading={loading} className="w-full">
                Envoyer mon message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
