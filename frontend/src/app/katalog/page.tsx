'use client';

import React, { useState } from 'react';
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
  
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [showSold, setShowSold] = useState(false);
  const [sortBy, setSortBy] = useState('Terbaru');
  const [isCatOpen, setIsCatOpen] = useState(false);
  
  const isCurated = brandParam === 'cur';

  let displayItems = items.filter(item => item.brand === brandParam);
  
  if (category) {
    displayItems = displayItems.filter(item => item.cat === category);
  }
  
  if (search) {
    const q = search.toLowerCase();
    displayItems = displayItems.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.code.toLowerCase().includes(q)
    );
  }
  
  const totalInCategory = displayItems.length;
  const availableItems = displayItems.filter(item => item.status !== 'sold');
  
  if (!showSold) {
    displayItems = availableItems;
  }
  
  if (sortBy === 'Harga terendah') {
    displayItems.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'Harga tertinggi') {
    displayItems.sort((a, b) => b.price - a.price);
  } else {
    displayItems.sort((a, b) => b.id.localeCompare(a.id));
  }

  const categoryName = category === 'pnt' ? 'Celana' : category === 'sh' ? 'Kemeja' : category === 'ts' ? 'Kaos' : category === 'jkt' ? 'Jaket' : 'Semua';

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

        <div className="kat-head" style={{ marginBottom: 32 }}>
          <div className="catdd" style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsCatOpen(!isCatOpen)}
              style={{
                background: 'transparent', 
                border: '1px solid var(--line)', 
                padding: '10px 16px', 
                borderRadius: '24px', 
                fontSize: 14, 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: 'var(--ink)'
              }}
            >
              <span style={{ fontSize: 11, letterSpacing: '0.05em', opacity: 0.7 }}>KATEGORI</span>
              <b style={{ fontWeight: 600 }}>{categoryName}</b>
              <svg style={{ transition: 'transform 0.2s', transform: isCatOpen ? 'rotate(180deg)' : 'none' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            
            {isCatOpen && (
              <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 8, background: 'var(--surf)', border: '1px solid var(--line)', borderRadius: 12, padding: 8, width: 280, boxShadow: '0 12px 40px rgba(42,33,25,0.15)', zIndex: 50 }}>
                {[{ id: '', name: 'Semua' }, { id: 'sh', name: 'Kemeja' }, { id: 'pnt', name: 'Pants' }, { id: 'ts', name: 'Kaos' }, { id: 'jkt', name: 'Jaket' }].map(cat => {
                  const catItems = items.filter(item => item.brand === brandParam && (cat.id === '' || item.cat === cat.id));
                  const catAvailable = catItems.filter(item => item.status !== 'sold').length;
                  const catTotal = catItems.length;
                  const isSelected = category === cat.id;
                  
                  if (catTotal === 0 && cat.id !== '') return null; // Hide empty categories
                  
                  return (
                    <button 
                      key={cat.id}
                      onClick={() => { setCategory(cat.id); setIsCatOpen(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '10px', 
                        borderRadius: 8, textAlign: 'left', border: 'none', 
                        background: isSelected ? 'rgba(181, 86, 58, 0.1)' : 'transparent', 
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: isSelected ? 'var(--acc)' : 'transparent', border: isSelected ? 'none' : '1px solid var(--line)', color: isSelected ? '#fff' : 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {cat.id === 'sh' || cat.id === '' ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>
                        ) : cat.id === 'pnt' ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h14l-1 16H6Z"/><path d="M12 4v16"/></svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: isSelected ? 'var(--ink)' : 'var(--ink)' }}>{cat.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{catAvailable} dari {catTotal} item tersedia</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="kat-search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              type="text" 
              placeholder="Cari nama, kode, atau nomor..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>
            {categoryName} - {availableItems.length} dari {totalInCategory} item masih tersedia
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={showSold} 
                onChange={(e) => setShowSold(e.target.checked)} 
                style={{ width: 16, height: 16, cursor: 'pointer' }} 
              /> 
              Tampilkan yang sudah terjual
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)' }}>
              Urutkan 
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid var(--line)', background: 'var(--surf)', fontSize: 13, cursor: 'pointer' }}
              >
                <option>Terbaru</option>
                <option>Harga terendah</option>
                <option>Harga tertinggi</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid g4 hl">
          {displayItems.length > 0 ? (
            displayItems.map(item => (
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
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
              Tidak ada item yang sesuai dengan filter Anda.
            </div>
          )}
          </div>
      </main>
      <ChatPopup />
      <Sidebar />
      <Footer />
    </>
  );
}
