export type ProductVariant = { value: string; color: string; stock: number }
export type Product = {
  id: string
  name: string
  category: string
  price: number // integer cents
  compareAtPrice?: number
  rating: number
  reviews: number
  description: string
  details: string[]
  image: string
  images: string[]
  badge?: string
  featured?: boolean
  variants: ProductVariant[]
}

const photo = (id: string, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const products: Product[] = [
  {
    id: 'weekender-pack', name: 'Weekender Backpack', category: 'Bags', price: 8900, compareAtPrice: 11000,
    rating: 4.9, reviews: 128, description: 'A considered carry-all for quick getaways, daily commutes, and everything in between.',
    details: ['22L considered capacity', 'Water-resistant recycled nylon', 'Padded 16-inch laptop sleeve'],
    image: photo('photo-1553062407-98eeb64c6a62'), images: [photo('photo-1553062407-98eeb64c6a62'), photo('photo-1622560480654-d96214fdc887')],
    badge: 'Bestseller', featured: true, variants: [
      { value: 'Olive', color: '#6d7356', stock: 8 }, { value: 'Black', color: '#292b2a', stock: 5 }, { value: 'Sand', color: '#c9b99e', stock: 0 },
    ],
  },
  {
    id: 'tech-organizer', name: 'Tech Organizer', category: 'Organizers', price: 3400, rating: 4.8, reviews: 86,
    description: 'A compact home for cables, chargers, and the small essentials you reach for every day.',
    details: ['Flexible internal dividers', 'Soft-touch lining', 'Fits most travel chargers'],
    image: photo('photo-1622560480654-d96214fdc887'), images: [photo('photo-1622560480654-d96214fdc887'), photo('photo-1553062407-98eeb64c6a62')],
    featured: true, variants: [{ value: 'Charcoal', color: '#424443', stock: 12 }, { value: 'Stone', color: '#c9c3b7', stock: 6 }],
  },
  {
    id: 'packing-cubes', name: 'Packing Cube Set', category: 'Organizers', price: 2800, rating: 4.7, reviews: 64,
    description: 'A simple three-piece set that keeps a suitcase tidy and makes unpacking feel effortless.',
    details: ['Set of three sizes', 'Lightweight ripstop fabric', 'Top grab handles'],
    image: photo('photo-1581553680321-4fffae59fccd'), images: [photo('photo-1581553680321-4fffae59fccd'), photo('photo-1553062407-98eeb64c6a62')],
    variants: [{ value: 'Moss', color: '#747a5a', stock: 10 }, { value: 'Clay', color: '#b87f67', stock: 4 }],
  },
  {
    id: 'everyday-daypack', name: 'Everyday Daypack', category: 'Bags', price: 7200, rating: 4.8, reviews: 93,
    description: 'An understated everyday pack with thoughtful storage for workdays and city exploring.',
    details: ['18L capacity', 'Breathable back panel', 'Internal water bottle pocket'],
    image: photo('photo-1542291026-7eec264c27ff'), images: [photo('photo-1542291026-7eec264c27ff'), photo('photo-1553062407-98eeb64c6a62')],
    badge: 'New', featured: true, variants: [{ value: 'Black', color: '#292b2c', stock: 7 }, { value: 'Rust', color: '#a65e42', stock: 3 }],
  },
  {
    id: 'passport-wallet', name: 'Passport Wallet', category: 'Accessories', price: 2400, rating: 4.6, reviews: 51,
    description: 'Keep your travel documents and cards together in a slim, easy-to-reach wallet.',
    details: ['Passport-sized sleeve', 'Four card slots', 'Slim profile'],
    image: photo('photo-1627123424574-724758594e93'), images: [photo('photo-1627123424574-724758594e93'), photo('photo-1584917865442-de89df76afd3')],
    variants: [{ value: 'Cognac', color: '#98613f', stock: 9 }, { value: 'Black', color: '#282828', stock: 5 }],
  },
  {
    id: 'bottle-sling', name: 'Bottle Sling', category: 'Accessories', price: 1900, rating: 4.7, reviews: 39,
    description: 'A hands-free carry solution for long walks, airport days, and weekend adventures.',
    details: ['Adjustable strap', 'Lightweight woven fabric', 'Fits most 750ml bottles'],
    image: photo('photo-1602143407151-7111542de6e8'), images: [photo('photo-1602143407151-7111542de6e8'), photo('photo-1544816155-12df9643f363')],
    variants: [{ value: 'Forest', color: '#4e624d', stock: 11 }, { value: 'Black', color: '#282828', stock: 8 }],
  },
]

export const categories = ['All', ...Array.from(new Set(products.map((product) => product.category)))]
export const findProduct = (id: string) => products.find((product) => product.id === id)
