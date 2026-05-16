'use client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';
import { uploadVehiculeImage } from '@/lib/firebase/storage';
import toast from 'react-hot-toast';

interface ImageUploaderProps {
  onImagesChange: (urls: string[]) => void;
  onMainImageChange: (url: string) => void;
  vehiculeId: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesChange,
  onMainImageChange,
  vehiculeId,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const [uploading, setUploading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > 10) {
      toast.error('Maximum 10 images');
      return;
    }

    setUploading(true);
    try {
      const uploadedUrls = await Promise.all(
        acceptedFiles.map((file) => uploadVehiculeImage(file, vehiculeId))
      );

      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      onImagesChange(newImages);
      if (mainImageIndex === 0) {
        onMainImageChange(uploadedUrls[0]);
      }
      toast.success(`${uploadedUrls.length} image(s) uploadée(s)`);
    } catch (error) {
      console.error('Upload error:', error);
      const message = error instanceof Error ? error.message : String(error);
      toast.error(`Erreur lors de l'upload: ${message}`);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected: (fileRejections) => {
      const messages = fileRejections.flatMap((rejection) =>
        rejection.errors.map((error) => `${rejection.file.name}: ${error.message}`)
      );
      toast.error(messages.join(' • ') || 'Fichier invalide');
    },
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    disabled: uploading || images.length >= 10,
  });

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);

    if (mainImageIndex === index) {
      setMainImageIndex(0);
      if (newImages.length > 0) {
        onMainImageChange(newImages[0]);
      }
    } else if (mainImageIndex > index) {
      setMainImageIndex(mainImageIndex - 1);
    }
  };

  const handleSetMainImage = (index: number) => {
    setMainImageIndex(index);
    onMainImageChange(images[index]);
  };

  return (
    <div>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-dark-3 rounded-lg p-8 text-center cursor-pointer hover:border-gold transition bg-dark-3/30"
      >
        <input {...getInputProps()} />
        <Upload size={32} className="mx-auto mb-3 text-gold" />
        <p className="text-light font-semibold mb-1">
          {uploading ? 'Upload en cours...' : 'Déposez vos images ici'}
        </p>
        <p className="text-sm text-gray-400">
          {images.length}/10 images uploadées
        </p>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-semibold text-light mb-4">Images uploadées:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition ${
                  mainImageIndex === index
                    ? 'border-gold bg-gold/10'
                    : 'border-dark-3 hover:border-gold'
                }`}
                onClick={() => handleSetMainImage(index)}
              >
                <Image
                  src={image}
                  alt={`Image ${index}`}
                  fill
                  className="object-cover"
                  sizes="200px"
                />

                {mainImageIndex === index && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <p className="text-gold font-semibold text-xs">Principal</p>
                  </div>
                )}

                <button
                  type="button"
                  aria-label="Supprimer l'image"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                  className="absolute top-1 right-1 p-1 bg-red-600 rounded-full hover:bg-red-700 transition"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
