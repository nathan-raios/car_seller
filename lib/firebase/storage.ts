import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

export async function uploadVehiculeImage(
  file: File,
  vehiculeId: string
): Promise<string> {
  const ext = file.name.split('.').pop();
  const fileName = `vehicules/${vehiculeId}/${Date.now()}.${ext}`;
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export async function deleteVehiculeImage(url: string) {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (error: any) {
    if (error.code !== 'storage/object-not-found') {
      throw error;
    }
  }
}
