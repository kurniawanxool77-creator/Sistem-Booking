'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import Footer from '../../../components/Footer';
import ChatPopup from '../../../components/landing/ChatPopup';
import { useShopStore, Product } from '../../../store/useShopStore';

export default function ProductDetailPage() {
  const { items, addToCart, user } = useShopStore();
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (params.id) {
      const found = items.find(i => i.id === params.id);
      if (found) setProduct(found);
    }
  }, [params.id, items]);

  const handleAddToCart = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (product) {
      addToCart(product.id);
      router.push('/cart');
    }
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="container" style={{ padding: '120px 24px', minHeight: '80vh' }}>
          <h2>Mencari produk...</h2>
        </main>
        <Footer />
      </>
    );
  }

  const isSold = product.status === 'sold';
  const isLocked = product.status === 'locked';

  return (
    <>
      <Navbar />
      <main className="wrap" style={{ paddingTop: '48px', paddingBottom: '64px', minHeight: '100vh' }}>
        <section className="section" style={{ gap: '32px' }}>
          <button className="link" onClick={() => router.back()} style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', minHeight: '44px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Kembali ke {product.cat === 'kmj' ? 'Kemeja' : product.cat === 'pnt' ? 'Pants' : 'Katalog'}
          </button>
          
          <div className="detail">
            <div style={{ display: 'grid', gridTemplateColumns: '72px minmax(0,1fr)', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[1, 2, 3, 4].map(n => {
                  const src = `/images/${product.cat === 'cur' ? 'landing_11.jpeg' : product.cat === 'pnt' ? 'landing_4.jpeg' : 'landing_2.jpeg'}`;
                  return (
                    <button key={n} className={`photo dthumb ${n % 2 ? '' : 'alt'} ${src ? 'has-img' : ''}`} style={{ aspectRatio: 1, padding: '6px', fontSize: '10px' }} aria-label={`Lihat foto ${n}`}>
                      <img src={src} alt="" loading="lazy" />
                    </button>
                  );
                })}
              </div>
              <button className="dmain" aria-label="Perbesar foto" style={{ padding: 0, textAlign: 'left', cursor: 'zoom-in' }}>
                <div className="photo has-img">
                  <img src={`/images/${product.cat === 'cur' ? 'landing_11.jpeg' : product.cat === 'pnt' ? 'landing_4.jpeg' : 'landing_2.jpeg'}`} alt={product.name} />
                </div>
              </button>
            </div>
            
            <div className="info">
              <h1 style={{ fontSize: 'clamp(28px, 3.4vw, 40px)' }}>{product.name}</h1>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', flexWrap: 'wrap' }}>
                <span className="code num" style={{ fontSize: '28px' }}>
                  {product.priceOld ? <s style={{ opacity: .5, fontSize: '18px', marginRight: '10px' }}>Rp {product.priceOld.toLocaleString('id-ID')}</s> : null}
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
                {product.priceOld ? <span className="pill" style={{ background: '#B5532E', color: '#fff' }}>Diskon {Math.round((1 - product.price / product.priceOld) * 100)}%</span> : null}
                <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Belum termasuk ongkir</span>
              </div>
              
              <div className="card spec">
                <div><span className="label">Kategori produk</span><b style={{ fontSize: '16px' }}>{product.cat === 'kmj' ? 'Kemeja' : product.cat === 'pnt' ? 'Pants' : 'Curated'}</b></div>
                {product.warna ? <div><span className="label">Warna</span><b style={{ fontSize: '16px' }}>{product.warna}</b></div> : <div><span className="label">Warna</span><b style={{ fontSize: '16px' }}>{product.name.split(' · ')[1] || '-'}</b></div>}
                <div>
                  <span className="label">Status</span>
                  <span style={{ fontSize: '13px' }}>
                    {isSold ? <span style={{ color: 'var(--sold)', fontWeight: 700 }}>Sold Out</span> : isLocked ? <span style={{ color: 'var(--lock)', fontWeight: 700 }}>Sedang di-hold</span> : <span style={{ color: 'var(--ok)', fontWeight: 700 }}>Tersedia</span>}
                  </span>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <b>Ukuran</b><span style={{ color: 'var(--muted)' }}>Panduan ukuran</span>
                </div>
                <div className="sizes">
                  {product.cat === 'cur' ? (
                    <button className="on">All Size</button>
                  ) : (
                    ['S', 'M', 'L', 'XL'].map(s => (
                      <button key={s} className={s === product.size ? 'on' : ''} disabled={s !== product.size} aria-disabled={s !== product.size} title={s !== product.size ? `Ukuran ${s} sedang kosong` : ''}>
                        {s}
                      </button>
                    ))
                  )}
                </div>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  {product.cat === 'cur' ? 'Item curated hanya ada satu (one only one), All Size.' : `Tiap item punya satu ukuran fisik. Klik ukuran lain untuk pindah ke ${product.name} yang tersedia di ukuran itu.`}
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <b>QTY</b><span style={{ color: 'var(--muted)' }}>Stok tersedia: <b className="num">{product.status === 'available' ? '10' : '0'}</b></span>
                </div>
                <div className="qty">
                  <button type="button" aria-label="Kurangi" disabled>−</button>
                  <input id="qty-in" className="num" type="number" inputMode="numeric" min="1" max="100" defaultValue="1" aria-label="Jumlah" disabled={product.status !== 'available'} />
                  <button type="button" aria-label="Tambah" disabled>+</button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button className="btn" disabled={isSold || isLocked}>
                  {isSold ? 'Sudah terjual' : isLocked ? 'Sedang di-hold orang lain' : 'Beli sekarang'}
                </button>
                <button className="btn ghost" onClick={handleAddToCart} disabled={isSold}>
                  Tambah ke keranjang
                </button>
              </div>
              
              <div className="acc-list">
                {[
                  ['Deskripsi', `Deskripsi produk ${product.name}. Bahan, gramasi, cara rawat.`],
                  ['Note', `Catatan untuk ${product.name}. Item ini fisik ukuran ${product.size}.`],
                  ['Pengiriman', 'Dikirim 1–2 hari kerja setelah status Paid. Kurir JNE, J&T, SiCepat. Ongkir dihitung saat checkout.']
                ].map(([t, b], i) => (
                  <div key={i} className="acc-item">
                    <button className="acc-h" aria-expanded="false" onClick={(e) => {
                      const item = e.currentTarget.parentElement;
                      if (item) {
                        const open = item.classList.toggle('open');
                        e.currentTarget.setAttribute('aria-expanded', String(open));
                      }
                    }}>
                      <span>{t}</span><span className="pm" aria-hidden="true"></span>
                    </button>
                    <div className="acc-b">
                      <div><p>{b}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="sec-head" style={{ marginTop: '64px' }}>
            <div className="l">
              <span className="kicker">Lainnya</span>
              <h2>{product.cat === 'kmj' ? 'Kemeja' : product.cat === 'pnt' ? 'Pants' : 'Curated'} lain di drop ini</h2>
            </div>
            <button className="link" onClick={() => router.push(`/katalog?brand=${product.brand}`)}>
              Semua {product.cat === 'kmj' ? 'Kemeja' : product.cat === 'pnt' ? 'Pants' : 'Curated'}
            </button>
          </div>
          <div className="grid g4 hl">
            {items.filter(i => i.cat === product.cat && i.id !== product.id).slice(0, 4).map(item => (
              <button 
                key={item.id} 
                className={`pc ${item.status || 'available'} b-${item.brand}`} 
                onClick={() => router.push(`/product/${item.id}`)}
                style={{ textAlign: 'left' }}
              >
                <div className="photo has-img">
                  <img 
                    src={`/images/${item.cat === 'cur' ? 'landing_11.jpeg' : item.cat === 'pnt' ? 'landing_4.jpeg' : 'landing_2.jpeg'}`} 
                    alt={item.name} 
                    loading="lazy" 
                  />
                </div>
                {item.priceOld ? (
                  <span className="disc-badge">-{Math.round((1 - item.price / item.priceOld) * 100)}%</span>
                ) : null}
                <div className="row">
                  <span className="label">{item.brand === 'cur' ? 'fabiebsky.curated' : 'fabiebsky'}</span>
                </div>
                <div className="name">{item.name}</div>
                <div className="row">
                  <span className="code">{item.code}</span>
                  <span className={`price num ${item.priceOld ? 'disc' : ''}`}>
                    {item.priceOld ? <s>Rp {item.priceOld.toLocaleString('id-ID')}</s> : null}
                    <b>Rp {item.price.toLocaleString('id-ID')}</b>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
      <ChatPopup />
      <Sidebar />
      <Footer />
    </>
  );
}
