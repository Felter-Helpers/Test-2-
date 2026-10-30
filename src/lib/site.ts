import { getEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

const photoFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

/** Look up a photo in src/assets/photos/ by filename. Fails the build if it's missing. */
export function photo(filename: string): ImageMetadata {
  const match = photoFiles[`../assets/photos/${filename}`];
  if (!match) {
    throw new Error(`Photo "${filename}" not found in src/assets/photos/ (check site.yml)`);
  }
  return match.default;
}

type Shop = { phone: string; email: string; address: { street: string; city: string; region: string; postalCode: string } };

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
export const mailtoHref = (email: string) => `mailto:${email}`;
export const addressLine = (shop: Shop) =>
  `${shop.address.street}, ${shop.address.city}, ${shop.address.region} ${shop.address.postalCode}`;
export const directionsHref = (shop: Shop) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressLine(shop))}`;
export const mapEmbedSrc = (shop: Shop) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(addressLine(shop))}&output=embed`;

export async function getSite() {
  const entry = await getEntry('site', 'site');
  if (!entry) throw new Error('Missing src/content/data/site.yml');
  return entry.data;
}

export type Site = Awaited<ReturnType<typeof getSite>>;

export const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

/** "09:00" -> "9am", "17:30" -> "5:30pm" */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, '0')}${suffix}` : `${hour}${suffix}`;
}
