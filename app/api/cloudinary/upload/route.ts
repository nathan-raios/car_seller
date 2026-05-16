import { NextResponse } from 'next/server';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
const folderBase = process.env.CLOUDINARY_FOLDER || 'vehicules';

export async function POST(request: Request) {
  if (!cloudName || !uploadPreset) {
    return NextResponse.json(
      { 
        error: 'Variables Cloudinary manquantes. Ajoute CLOUDINARY_CLOUD_NAME et CLOUDINARY_UPLOAD_PRESET dans .env.local et redémarre le serveur.' 
      },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const vehiculeId = formData.get('vehiculeId');

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }

  if (!vehiculeId || typeof vehiculeId !== 'string') {
    return NextResponse.json({ error: 'Missing vehiculeId' }, { status: 400 });
  }

  const uploadData = new FormData();
  uploadData.append('file', file);
  uploadData.append('upload_preset', uploadPreset);
  uploadData.append('folder', `${folderBase}/${vehiculeId}`);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: 'POST',
    body: uploadData,
  });

  const result = await response.json();
  if (!response.ok) {
    return NextResponse.json(result, { status: response.status });
  }

  return NextResponse.json(result);
}
