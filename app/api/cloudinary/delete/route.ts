import { NextResponse } from 'next/server';
import crypto from 'crypto';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

function createSignature(publicId: string, timestamp: number) {
  return crypto
    .createHash('sha1')
    .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    .digest('hex');
}

export async function POST(request: Request) {
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: 'Cloudinary server-side credentials missing' },
      { status: 500 }
    );
  }

  const body = await request.json();
  const publicId = body?.publicId;

  if (!publicId || typeof publicId !== 'string') {
    return NextResponse.json(
      { error: 'Missing publicId' },
      { status: 400 }
    );
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createSignature(publicId, timestamp);

  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('api_key', apiKey);
  formData.append('timestamp', String(timestamp));
  formData.append('signature', signature);
  formData.append('resource_type', 'image');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return NextResponse.json(result, { status: response.status });
  }

  return NextResponse.json(result);
}
