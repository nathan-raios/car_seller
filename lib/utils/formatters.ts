export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num);
}

export function formatKm(km: number): string {
  if (km === 0) return 'Neuf';
  return `${formatNumber(km)} km`;
}
