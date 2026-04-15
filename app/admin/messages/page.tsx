'use client';

import React, { useState, useEffect } from 'react';
import { Button, Modal } from '@/components/ui';
import { Mail, Trash2 } from 'lucide-react';
import { getMessages, markMessageAsRead, deleteMessage } from '@/lib/firebase/firestore';
import { Message } from '@/lib/types';
import toast from 'react-hot-toast';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Erreur lors du chargement des messages');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMessage = async (message: Message) => {
    if (!message.lu) {
      try {
        await markMessageAsRead(message.id);
        setMessages(messages.map((m) => (m.id === message.id ? { ...m, lu: true } : m)));
      } catch (error) {
        console.error('Error marking as read:', error);
      }
    }
    setSelectedMessage(message);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedMessage) return;

    setDeleteLoading(true);
    try {
      await deleteMessage(selectedMessage.id);
      toast.success('Message supprimé');
      setShowModal(false);
      setMessages(messages.filter((m) => m.id !== selectedMessage.id));
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Erreur lors de la suppression');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display font-light text-light mb-2">Messages</h1>
        <p className="text-gray-400">{messages.length} message(s)</p>
      </div>

      {/* List */}
      <div className="space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-400">Aucun message</div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              onClick={() => handleOpenMessage(message)}
              className="bg-dark-2 p-6 rounded-xl border border-dark-3 hover:border-gold cursor-pointer transition group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={18} className="text-gold" />
                    <h3 className="font-semibold text-light">{message.nom}</h3>
                    {!message.lu && (
                      <span className="px-2 py-1 bg-gold text-dark text-xs font-semibold rounded-full">
                        Nouveau
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{message.email}</p>
                  <p className="text-light line-clamp-2">{message.message}</p>
                  {message.vehiculeNom && (
                    <p className="text-gold text-sm mt-2">Concernant: {message.vehiculeNom}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-3 ml-4">
                  <p className="text-xs text-gray-500">
                    {new Date(message.createdAt.toDate()).toLocaleDateString('fr-FR')}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMessage(message);
                      handleDelete();
                    }}
                    className="p-2 bg-dark-3 hover:bg-red-600/20 rounded transition opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedMessage(null);
        }}
        title={selectedMessage?.nom}
      >
        {selectedMessage && (
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
              <a href={`mailto:${selectedMessage.email}`} className="text-gold hover:text-gold-light transition">
                {selectedMessage.email}
              </a>
            </div>

            {selectedMessage.telephone && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Téléphone</p>
                <a href={`tel:${selectedMessage.telephone}`} className="text-gold hover:text-gold-light transition">
                  {selectedMessage.telephone}
                </a>
              </div>
            )}

            {selectedMessage.vehiculeNom && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Véhicule</p>
                <p className="text-light">{selectedMessage.vehiculeNom}</p>
              </div>
            )}

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Sujet</p>
              <p className="text-light capitalize">{selectedMessage.sujet}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Message</p>
              <p className="text-light whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>

            <div className="border-t border-dark-3 pt-4 flex gap-3">
              <Button
                variant="danger"
                size="sm"
                loading={deleteLoading}
                onClick={handleDelete}
              >
                Supprimer
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowModal(false);
                  setSelectedMessage(null);
                }}
              >
                Fermer
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
