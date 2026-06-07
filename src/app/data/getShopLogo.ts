const shopLogos = import.meta.glob<string>(
  '@/assets/images/shops/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, import: 'default' },
);

export function getShopLogo(filename: string): string {
  const match = Object.entries(shopLogos).find(([path]) =>
    path.endsWith(`/${filename}`),
  );

  return match?.[1] ?? '';
}
