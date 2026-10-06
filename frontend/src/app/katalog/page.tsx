'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useSearchParams } from 'next/navigation';
import ChatPopup from '../../components/landing/ChatPopup';
import { useShopStore } from '../../store/useShopStore';

export default function KatalogPage() {
  const { items } = useShopStore();
  const searchParams = useSearchParams();
  const brandParam = searchParams.get('brand') || 'fab';
  
  const filteredItems = items.filter(item => item.brand === brandParam);
  const isCurated = brandParam === 'cur';

  return (
    <>
      <Navbar />
      <main className="wrap" style={{ paddingTop: '48px', paddingBottom: '64px', minHeight: '100vh' }}>
        <div style={{ marginBottom: 48 }}>
          <h5 style={{ color: 'var(--acc)', fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>KATALOG</h5>
          <h1 className="t-brand" style={{ fontSize: '3.5rem', marginBottom: 12 }}>
            {isCurated ? 'fabiebsky.curated' : 'fabiebsky'}
          </h1>
          <p style={{ color: 'var(--muted)' }}>
            {isCurated ? 'Thrift · one only one' : 'Produk sendiri · 100 pcs / kategori'}
          </p>
        </div>
        
          <div className="grid g4 hl">
            {filteredItems.slice(0, 12).map(item => (
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
      </main>
      <ChatPopup />
      <Sidebar />
      <Footer />
    </>
  );
}
