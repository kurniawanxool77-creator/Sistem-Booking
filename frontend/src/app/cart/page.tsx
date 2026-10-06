'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import ChatPopup from '../../components/landing/ChatPopup';
import { useShopStore } from '../../store/useShopStore';

export default function CartPage() {
  const { cart, items, user } = useShopStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const cartItems = cart.map(cartItem => {
    const item = items.find(i => i.id === cartItem.id);
    return item ? { ...item, qty: cartItem.qty || 1 } : null;
  }).filter(Boolean);
  
  const validCheckoutItems = cartItems.filter(i => i && i.status !== 'sold' && i.status !== 'locked');
  const subtotal = validCheckoutItems.reduce((sum, item) => sum + ((item?.price || 0) * (item?.qty || 1)), 0);
  
  const handleCheckout = () => {
    if (!user) {
       router.push('/login');
    } else {
       // redirect to checkout or payment
    }
  };

  return (
    <>
      <style>{`
        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .cart-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <Navbar />
      <main className="wrap" style={{ paddingTop: '48px', paddingBottom: '64px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="kicker" style={{ marginBottom: 8 }}>
              {user ? 'Keranjang Anda' : 'Keranjang Guest'}
            </div>
            <h1 style={{ margin: 0, fontWeight: 400 }}>
              {cart.length} pcs
            </h1>
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'right' }}>
            {!user ? 'Disimpan di browser ini' : ''}
          </div>
        </div>

        <div className="cart-grid">
          {/* Left Column - Cart Items */}
          <div>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '64px 24px', background: 'var(--surf)', borderRadius: 12 }}>
                <b style={{ display: 'block', fontSize: 16, marginBottom: 12, color: 'var(--ink)' }}>Keranjang masih kosong.</b>
                <p style={{ color: 'var(--muted)', marginBottom: 24, fontSize: 14 }}>Pilih item yang kamu mau dari katalog.</p>
                <button className="btn" onClick={() => router.push('/katalog')} style={{ background: 'var(--ink)', color: 'var(--surf)' }}>Ke katalog</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {cartItems.map(item => (
                   <div key={item!.id} className="card" style={{ padding: 16, background: 'var(--surf)', borderRadius: 16, display: 'flex', gap: 16 }}>
                     <div style={{ width: 80, height: 80, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                       <img src={`/images/${item!.cat === 'cur' ? 'landing_11.jpeg' : item!.cat === 'pnt' ? 'landing_4.jpeg' : 'landing_2.jpeg'}`} alt={item!.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                     </div>
                     <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                       {/* Kiri: Nama, Ukuran, Keterangan */}
                       <div style={{ display: 'flex', flexDirection: 'column' }}>
                         <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{item!.name}</h4>
                         <div style={{ fontSize: 13, color: 'var(--ink)', marginTop: 6, marginBottom: 6 }}>
                           Ukuran: {item!.size || (item!.cat === 'cur' ? 'All Size' : '-')}
                         </div>
                         <div style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                           {item!.brand === 'cur' ? 'fabiebsky.curated' : 'fabiebsky'} · {item!.code}
                         </div>
                       </div>
                       
                       {/* Kanan: Harga + X, lalu QTY */}
                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                           <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
                             {item!.priceOld && <s style={{ opacity: 0.5, marginRight: 8, fontSize: 12, fontWeight: 400 }}>Rp {item!.priceOld.toLocaleString('id-ID')}</s>}
                             Rp {item!.price.toLocaleString('id-ID')}
                           </div>
                           <button 
                             onClick={() => useShopStore.getState().removeFromCart(item!.id)} 
                             style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 0, display: 'flex' }}
                             aria-label="Hapus"
                           >
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                           </button>
                         </div>
                         
                         <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', background: 'var(--acc)', borderRadius: 24, padding: '2px 4px', width: 'fit-content' }}>
                           <button type="button" aria-label="Kurangi" onClick={() => useShopStore.getState().updateCartQty(item!.id, Math.max(1, (item!.qty || 1) - 1))} disabled={(item!.qty || 1) <= 1} style={{ color: '#fff', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: (item!.qty || 1) <= 1 ? 0.4 : 1, cursor: (item!.qty || 1) <= 1 ? 'not-allowed' : 'pointer' }}>−</button>
                           <input type="text" value={item!.qty || 1} readOnly style={{ width: 20, textAlign: 'center', background: 'transparent', border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, padding: 0 }} />
                           <button type="button" aria-label="Tambah" onClick={() => useShopStore.getState().updateCartQty(item!.id, (item!.qty || 1) + 1)} style={{ color: '#fff', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>+</button>
                         </div>
                       </div>
                     </div>
                   </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Summary */}
          <div className="card" style={{ padding: 32, borderRadius: 12, background: 'var(--surf)' }}>
            <h3 style={{ marginBottom: 24, fontWeight: 400 }}>Ringkasan</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
              <span style={{ color: 'var(--muted)' }}>Subtotal ({validCheckoutItems.length} item bisa di-checkout)</span>
              <b style={{ fontWeight: 600 }}>Rp {subtotal.toLocaleString('id-ID')}</b>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, fontSize: 14 }}>
              <span style={{ color: 'var(--muted)' }}>Ongkir</span>
              <span style={{ color: 'var(--muted)' }}>dihitung di checkout</span>
            </div>
            
            <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '0 0 24px 0' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <b style={{ fontSize: 14, fontWeight: 600 }}>Estimasi total</b>
              <h2 style={{ margin: 0, fontWeight: 400 }}>Rp {subtotal.toLocaleString('id-ID')}</h2>
            </div>
            
            <button 
              className="btn" 
              style={{ width: '100%', marginBottom: 16, background: validCheckoutItems.length ? 'var(--muted)' : '#a19b91', borderColor: validCheckoutItems.length ? 'var(--muted)' : '#a19b91', color: '#fff' }} 
              disabled={validCheckoutItems.length === 0}
              onClick={handleCheckout}
            >
              Checkout {validCheckoutItems.length} item
            </button>
            
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
              {!user ? 'Guest checkout tanpa akun. Kamu akan dapat kode transaksi untuk cek status dan tanya admin via WA.' : 'Selesaikan pembayaran sebelum item keduluan.'}
            </p>
          </div>
        </div>
      </main>
      <Sidebar />
      <Footer />
    </>
  );
}
