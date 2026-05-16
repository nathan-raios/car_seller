function getCloudinaryPublicId(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl);
    const parts = url.pathname.split('/').filter(Boolean);
    const uploadIndex = parts.findIndex((part) => part === 'upload');
    if (uploadIndex === -1) return null;

    const afterUpload = parts.slice(uploadIndex + 1);
    if (afterUpload.length === 0) return null;
    if (afterUpload[0].startsWith('v')) {
      afterUpload.shift();
    }

    const publicIdWithExt = afterUpload.join('/');
    return publicIdWithExt.replace(/\.[^/.]+$/, '');
  } catch {
    return null;
  }
}

export async function uploadVehiculeImage(
  file: File,
  vehiculeId: string
): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('vehiculeId', vehiculeId);

  const response = await fetch('/api/cloudinary/upload', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error?.message || result.error || 'Erreur lors du téléchargement vers Cloudinary');
  }

  return result.secure_url;
}

export async function deleteVehiculeImage(url: string) {
  const publicId = getCloudinaryPublicId(url);
  if (!publicId) {
    console.warn('Impossible de récupérer le public_id Cloudinary pour', url);
    return;
  }

  const response = await fetch('/api/cloudinary/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ publicId }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.warn('Cloudinary delete failed:', error);
  }
}
