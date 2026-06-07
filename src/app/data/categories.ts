export const homeCategories = [
  'Technic',
  'Star Wars',
  'City',
  'Icons',
  'Creator',
  'Friends',
] as const;

export const seriesOptions = [
  'Wszystkie',
  ...homeCategories,
  'Harry Potter',
] as const;

export type SeriesOption = (typeof seriesOptions)[number];
