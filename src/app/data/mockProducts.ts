/**
 * Mock product catalog for development.
 *
 * Images:
 *   1. Drop files into src/assets/images/mocks/
 *   2. Name each file after the set number, e.g. 42210.png
 *   3. Set the matching `image` field below (filename only)
 *   4. Until a file exists, the app falls back to placeholder.svg
 *
 * Usage in components:
 *   import { mockProducts } from '@/app/data/mockProducts';
 *   import { getMockImage } from '@/app/data/getMockImage';
 *
 *   <img src={getMockImage(product.image)} alt={product.name} />
 */

export interface MockProduct {
  id: number;
  name: string;
  number: string;
  /** Filename inside src/assets/images/mocks/ */
  image: string;
  /** Optional extra gallery images for the product detail page */
  gallery?: string[];
  price: number;
  oldPrice: number;
  series: string;
  ageRange: string;
  pieces: number;
  availability: string;
}

export const mockProducts: MockProduct[] = [
  {
    id: 1,
    name: 'Nissan Skyline GT-R',
    number: '42210',
    image: '42210.png',
    gallery: ['42210.png', '42210-2.png', '42210-3.png'],
    price: 1499,
    oldPrice: 1899,
    series: 'Technic',
    ageRange: '18+',
    pieces: 1853,
    availability: 'Dostępny',
  },
  {
    id: 2,
    name: 'Millennium Falcon',
    number: '75192',
    image: '75192.png',
    price: 3199,
    oldPrice: 3999,
    series: 'Star Wars',
    ageRange: '16+',
    pieces: 7541,
    availability: 'Dostępny',
  },
  {
    id: 3,
    name: 'Police Station',
    number: '60316',
    image: '60316.png',
    price: 649,
    oldPrice: 899,
    series: 'City',
    ageRange: '7+',
    pieces: 2923,
    availability: 'Dostępny',
  },
  {
    id: 4,
    name: 'Taj Mahal',
    number: '21056',
    image: '21056.png',
    price: 379,
    oldPrice: 499,
    series: 'Icons',
    ageRange: '18+',
    pieces: 2022,
    availability: 'Dostępny',
  },
  {
    id: 5,
    name: 'Porsche 911 RSR',
    number: '42096',
    image: '42096.png',
    price: 1199,
    oldPrice: 1599,
    series: 'Technic',
    ageRange: '18+',
    pieces: 1580,
    availability: 'Dostępny',
  },
  {
    id: 6,
    name: 'AT-AT Walker',
    number: '75313',
    image: '75313.png',
    price: 2399,
    oldPrice: 2999,
    series: 'Star Wars',
    ageRange: '10+',
    pieces: 6785,
    availability: 'Ostatnie sztuki',
  },
  {
    id: 7,
    name: 'Bugatti Chiron',
    number: '42083',
    image: '42083.png',
    price: 2899,
    oldPrice: 3499,
    series: 'Technic',
    ageRange: '16+',
    pieces: 3599,
    availability: 'Dostępny',
  },
  {
    id: 8,
    name: 'Hogwarts Castle',
    number: '71043',
    image: '71043.png',
    price: 3699,
    oldPrice: 4299,
    series: 'Harry Potter',
    ageRange: '16+',
    pieces: 6020,
    availability: 'Dostępny',
  },
  {
    id: 9,
    name: 'Fire Station',
    number: '60320',
    image: '60320.png',
    price: 899,
    oldPrice: 1099,
    series: 'City',
    ageRange: '6+',
    pieces: 985,
    availability: 'Dostępny',
  },
];

export function getMockProductById(id: number): MockProduct | undefined {
  return mockProducts.find((product) => product.id === id);
}

export function getMockProductByNumber(number: string): MockProduct | undefined {
  return mockProducts.find((product) => product.number === number);
}
