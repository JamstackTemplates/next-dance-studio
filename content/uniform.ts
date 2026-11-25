// Uniform: kit by style, hair rules and the front desk shop. Owners edit shop `stock` most often.
// Level leotard colours live on each level in content/classes.ts.
import type { StyleId } from './classes.ts';

export interface Kit {
  style: StyleId;
  items: { item: string; detail: string }[];
  shoes: string;
  notes?: string;
}

/** in-stock; low = running low; sold-out = ask the front desk when more arrive. */
export type Stock = 'in-stock' | 'low' | 'sold-out';

export interface ShopItem {
  id: string;
  name: string;
  /** Whole USD, paid at the front desk. */
  price: number;
  stock: Stock;
}

export const stockLabels: Record<Stock, string> = { 'in-stock': 'In stock', low: 'Running low', 'sold-out': 'Sold out' };

export const kits: Kit[] = [
  { style: 'ballet', shoes: 'Pink or skin-tone canvas split-sole slippers',
    items: [
      { item: 'Leotard', detail: 'In your level colour, studio camisole cut' },
      { item: 'Tights', detail: 'Pink or skin-tone' },
      { item: 'Any dancer', detail: 'White fitted tee with black tights or shorts' },
    ],
    notes: 'Adults wear any fitted dancewear.' },
  { style: 'contemporary', shoes: 'Bare feet',
    items: [
      { item: 'Top', detail: 'Leotard in your level colour, or a fitted black top' },
      { item: 'Legs', detail: 'Black footless tights or leggings' },
    ] },
  { style: 'jazz', shoes: 'Tan slip-on jazz shoes',
    items: [
      { item: 'Top', detail: 'Fitted black top or studio tee' },
      { item: 'Legs', detail: 'Black jazz pants' },
    ] },
  { style: 'tap', shoes: 'Black tap shoes (Petite: Velcro tap shoes)',
    items: [
      { item: 'Top', detail: 'Studio tee' },
      { item: 'Legs', detail: 'Black leggings or jazz pants' },
    ],
    notes: 'Put a name label inside both shoes.' },
  { style: 'hip-hop', shoes: 'Clean indoor-only sneakers',
    items: [
      { item: 'Top', detail: 'Studio tee or a loose top' },
      { item: 'Legs', detail: 'Joggers' },
    ],
    notes: 'Sneakers worn outside are not allowed on the marley.' },
  { style: 'musical-theatre', shoes: 'Tan jazz shoes',
    items: [
      { item: 'Top', detail: 'Studio tee' },
      { item: 'Legs', detail: 'Black jazz pants' },
    ],
    notes: 'Seniors also need tan character shoes.' },
];

export const hair = {
  ballet: 'Classical bun with net and pins (Petite: bun or low ponytail)',
  default: 'Tied back and off the face; no loose clips',
} as const;

export const shop: ShopItem[] = [
  { id: 'level-leotard', name: 'Level leotard (any level colour)', price: 42, stock: 'in-stock' },
  { id: 'studio-tee', name: 'P&P studio tee', price: 24, stock: 'in-stock' },
  { id: 'studio-hoodie', name: 'P&P pulse hoodie', price: 52, stock: 'low' },
  { id: 'dance-bag', name: 'Drawstring dance bag', price: 30, stock: 'in-stock' },
  { id: 'bun-kit', name: 'Bun kit (net, pins, scrunchie)', price: 8, stock: 'in-stock' },
  { id: 'petite-tap-shoes', name: 'Petite Velcro tap shoes', price: 46, stock: 'sold-out' },
];
