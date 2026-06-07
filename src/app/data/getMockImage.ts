import placeholder from '@/assets/images/mocks/placeholder.svg';

const mockImages = import.meta.glob<string>(
  '@/assets/images/mocks/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, import: 'default' },
);

export function getMockImage(filename: string): string {
  const match = Object.entries(mockImages).find(([path]) =>
    path.endsWith(`/${filename}`),
  );

  return match?.[1] ?? placeholder;
}

export function getMockGallery(filenames: string[]): string[] {
  return filenames.map(getMockImage);
}
