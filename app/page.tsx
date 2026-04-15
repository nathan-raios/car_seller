export const dynamic = 'force-dynamic';

import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedCars } from '@/components/home/FeaturedCars';
import { StatsSection } from '@/components/home/StatsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';

export const metadata = {
  title: 'AutoPrestige - L\'Art de Conduire l\'Excellence',
  description:
    'Découvrez notre sélection exclusive de véhicules neufs et d\'occasion de prestige. Chaque voiture raconte une histoire d\'excellence et de performance.',
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCars />
      <StatsSection />
      <TestimonialsSection />
    </>
  );
}
