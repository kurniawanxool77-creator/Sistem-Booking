import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string; code: string; cat: string; brand: string; seq: number;
  name: string; size: string; price: number; priceOld?: number;
  status: 'available' | 'locked' | 'sold';
  lock: { by: string; until: number } | null;
  orderId: string | null;
  token: string;
  soldAt: number | null;
  warna?: string;
}

interface User {
  nama: string; email: string; wa: string; kota: string; alamat: string;
  kode: string; updated: number;
}

interface CartItem {
  id: string;
  addedAt: number;
  qty?: number;
}

interface ShopState {
  items: Product[];
  cart: CartItem[];
  user: User | null;
  isGuest: boolean;
  
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  setItems: (items: Product[]) => void;
}

const CATS = [
  {id:'kmj', brand:'fab', name:'Kemeja', prefix:'FAB-KMJ', max:100, price:329000, names:['Oversized Shirt · Off White','Boxy Shirt · Sand','Linen Shirt · Ink']},
  {id:'pnt', brand:'fab', name:'Pants', prefix:'FAB-PNT', max:100, price:359000, names:['Wide Pants · Charcoal','Wide Pants · Sand','Cargo Pants · Olive']},
  {id:'cur', brand:'cur', name:'Curated Drop 01', prefix:'CUR', max:45, price:0, names:['Bugs Bunny Knit · Blue','Dino Player Knit · Green','Panda Knit · Black','Cable Knit · Navy','Colorblock Wool · Navy Grey Maroon']},
];
const SIZES = ['S','M','L','XL'];

function rnd(seed: number){let x=Math.sin(seed*9301+49297)*233280;return x-Math.floor(x);}
function tok(code: string){let h=0;for(let i=0;i<code.length;i++)h=(h*31+code.charCodeAt(i))>>>0;return (h.toString(16)+'a91f7c3e0c4d').slice(0,4)+'…'+(h*7).toString(16).slice(-4);}

export function seedItems(): Product[] {
  const items: Product[] = []; const now = Date.now();
  CATS.forEach(c => {
    const soldN = c.id==='kmj'?61: c.id==='pnt'?19: 41;
    for(let n=1;n<=c.max;n++){
      const code = `${c.prefix}-${String(n).padStart(3,'0')}`;
      const r = rnd(n*7+c.id.length);
      const name = c.id==='cur'?c.names[n%c.names.length]:c.names[Math.floor(r*c.names.length)];
      const it: Product = {
        id:code, code, cat:c.id, brand:c.brand, seq:n, 
        name, size:c.id==='cur'?'All Size':SIZES[Math.floor(r*4)],
        price: c.price || Math.round((150000+r*450000)/1000)*1000, 
        status:'available', lock:null, orderId:null, token:tok(code), soldAt:null,
        warna: name.split(' · ')[1] || ''
      };
      if(n<=soldN){it.status='sold'; it.soldAt=now-(soldN-n)*86400000*0.6; it.orderId='FB-'+String(230000+n*13).slice(-6);}
      else if(n===soldN+1){it.status='locked'; it.lock={by:'other', until: now+ (5+Math.floor(r*8))*60000};}
      items.push(it);
    }
  });
  return items;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      items: seedItems(),
      cart: [],
      user: null,
      isGuest: false,

      addToCart: (productId) => set((state) => ({ 
        cart: [...state.cart, { id: productId, addedAt: Date.now() }] 
      })),
      removeFromCart: (productId) => set((state) => ({ 
        cart: state.cart.filter(c => c.id !== productId) 
      })),
      
      updateCartQty: (productId, qty) => set((state) => ({
        cart: state.cart.map(c => c.id === productId ? { ...c, qty } : c)
      })),
      
      loginUser: (user) => set({ user, isGuest: false }),
      logoutUser: () => set({ user: null }),
      setItems: (items) => set({ items }),
    }),
    {
      name: 'fabiebsky-storage', // name of item in localStorage
    }
  )
);
