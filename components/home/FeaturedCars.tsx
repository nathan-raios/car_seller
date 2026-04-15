import { getFeaturedVehicules } from '@/lib/firebase/firestore';
import type { SerializableVehicule } from '@/lib/types';
import { FeaturedCarsClient } from './FeaturedCarsClient';

export const FeaturedCars = async () => {
  const cars = (await getFeaturedVehicules(6)).map(
    ({ createdAt, updatedAt, ...car }) => car as SerializableVehicule
  );

  return <FeaturedCarsClient cars={cars} />;
};
