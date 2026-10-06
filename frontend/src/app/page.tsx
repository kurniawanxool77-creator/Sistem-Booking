'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import ChatPopup from '../components/landing/ChatPopup';
import Link from 'next/link';
import { useShopStore } from '../store/useShopStore';

export default function Page() {
  const { items } = useShopStore();
  const freshItems = items.slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="wrap" style={{ paddingTop: '48px', paddingBottom: '64px', minHeight: '100vh' }}>
        <section className="hero">
          <div className="txt">
            <h1>Wear it once,<br />own it <em style={{ color: 'var(--acc)', fontStyle: 'italic' }}>forever.</em></h1>
            <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '46ch', lineHeight: 1.6 }}>
              Koleksi terbatas buat kamu yang nggak mau kembaran. Tiap piece Fabiebsky cuma ada satu, satu pemilik, dan nggak bakal di-restock.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link href="/katalog?brand=fab" className="btn" style={{ textDecoration: 'none' }}>
                Lihat koleksi fabiebsky
              </Link>
            </div>
          </div>
          <div className="img">
            <img src="/images/landing_2.jpeg" alt="Lookbook Fabiebsky Drop 01" />
          </div>
        </section>

        {/* Section 2: Kenapa Fabiebsky */}
        <section className="section" style={{ marginTop: '96px' }}>
          <div className="card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '28px', background: 'var(--cream)', borderRadius: '16px' }}>
            <div className="sec-head">
              <div className="l">
                <span className="kicker" style={{ color: 'var(--acc)', fontWeight: 600, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>Kenapa Fabiebsky</span>
                <h2 style={{ fontSize: '2.5rem', marginTop: '8px' }}>Yang kamu dapat di setiap piece</h2>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', marginTop: '32px' }}>
              <div>
                <div style={{ background: '#e9b79a', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#fff' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l2.4 1.6 2.9-.2 1 2.7 2.4 1.7-.7 2.8.7 2.8-2.4 1.7-1 2.7-2.9-.2L12 21l-2.4-1.6-2.9.2-1-2.7-2.4-1.7.7-2.8-.7-2.8 2.4-1.7 1-2.7 2.9.2z"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <b style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>Kualitas terjamin</b>
                <p style={{ color: 'var(--muted)', lineHeight: 1.5 }}>Setiap item dicek satu per satu sebelum dijual. Bahan, jahitan, dan kondisi sesuai yang tampil di foto.</p>
              </div>

              <div>
                <div style={{ background: '#e9b79a', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#fff' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>
                </div>
                <b style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>Admin siap respon</b>
                <p style={{ color: 'var(--muted)', lineHeight: 1.5 }}>Ada pertanyaan soal ukuran, stok, atau status order? Chat admin langsung dari web, cukup sebutkan kode transaksimu.</p>
              </div>

              <div>
                <div style={{ background: '#db4a2b', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#fff' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1.4" fill="currentColor" stroke="none"/></svg>
                </div>
                <b style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>Product lock</b>
                <p style={{ color: 'var(--muted)', lineHeight: 1.5 }}>Saat kamu checkout, item itu dikunci 15 menit khusus untukmu. Tidak ada yang bisa menyerobot sebelum kamu selesai bayar.</p>
              </div>

              <div>
                <div style={{ background: '#e9b79a', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#fff' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3l3 2 3-2 5 3-2 4-2-1v12H8V9L6 10 4 6z"/><path d="M12 12v4"/><path d="M10.5 13.5L12 12l1.5 1.5"/></svg>
                </div>
                <b style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>Only one</b>
                <p style={{ color: 'var(--muted)', lineHeight: 1.5 }}>Satu item, satu pemilik. Begitu terjual, item itu tidak dibuat lagi dan tercatat atas nama kode transaksimu.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Pilih Brand */}
        <section className="section" style={{ marginTop: '96px' }}>
          <div className="sec-head" style={{ marginBottom: '32px' }}>
            <div className="l">
              <span className="kicker" style={{ color: 'var(--acc)', fontWeight: 600, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>Dua pintu</span>
              <h2 style={{ fontSize: '2.5rem', marginTop: '8px' }}>Pilih brand</h2>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {/* Card Fabiebsky */}
            <div className="card brandcard" style={{ padding: '24px', background: 'var(--cream)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>fabiebsky</h3>
              <img src="/images/landing_10.jpeg" alt="fabiebsky" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }} />
              <Link href="/katalog?brand=fab" className="btn" style={{ textDecoration: 'none', textAlign: 'center', padding: '16px', background: '#333', color: '#fff', borderRadius: '8px' }}>
                Masuk katalog fabiebsky
              </Link>
            </div>

            {/* Card Curated */}
            <div className="card brandcard dark" style={{ padding: '24px', background: '#4d463d', color: '#fff', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>fabiebsky.curated</h3>
              <img src="/images/landing_11.jpeg" alt="fabiebsky.curated" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }} />
              <Link href="/katalog?brand=cur" className="btn light" style={{ textDecoration: 'none', textAlign: 'center', padding: '16px', background: '#f5f0e6', color: '#333', borderRadius: '8px', fontWeight: 600 }}>
                Lihat curated drop
              </Link>
            </div>
          </div>
        </section>

        {/* Section 4: Baru Masuk */}
        <section className="section" style={{ marginTop: '96px' }}>
          <div className="sec-head" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div className="l">
              <span className="kicker" style={{ color: 'var(--acc)', fontWeight: 600, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>Pilihan</span>
              <h2 style={{ fontSize: '2.5rem', marginTop: '8px' }}>Baru masuk</h2>
            </div>
            <Link href="/katalog" style={{ color: 'var(--ink)', textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid var(--ink)', paddingBottom: '2px' }}>
              Lihat semua
            </Link>
          </div>
          
          <div className="grid g4 hl">
            {freshItems.map(item => (
              <button 
                key={item.id} 
                className={`pc ${item.status || 'available'} b-${item.brand}`} 
                onClick={() => window.location.href = `/product/${item.id}`}
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

        {/* Section 5: Bottom Text */}
        <section className="section" style={{ marginTop: '96px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <span className="kicker" style={{ color: 'var(--acc)', fontWeight: 600, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>Fabiebsky</span>
          <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)' }}>Wear it once, own it forever</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '64ch', lineHeight: 1.6, fontSize: '16px' }}>
            Fabiebsky untuk kemeja dan pants yang dibuat sendiri dalam jumlah terbatas. Fabiebsky.curated untuk thrift pilihan yang masing-masing cuma ada satu. Setiap piece dicek dulu kualitasnya, dan admin siap bantu soal ukuran atau pesananmu.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '16px' }}>
            <Link href="/katalog?brand=fab" className="btn" style={{ textDecoration: 'none', padding: '12px 24px', background: '#333', color: '#fff', borderRadius: '8px' }}>
              Lihat koleksi fabiebsky
            </Link>
          </div>
        </section>
      </main>
      <ChatPopup />
      <Sidebar />
      <Footer />
    </>
  );
}
