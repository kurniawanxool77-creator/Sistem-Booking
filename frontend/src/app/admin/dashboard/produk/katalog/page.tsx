'use client';

import React, { useState } from 'react';

export default function KatalogProdukPage() {
  const [showModal, setShowModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const catalogs = [
    { id: 'KTG-001', name: 'New Arrivals', period: 'Oktober 2026', productsCount: 15, status: 'Aktif', banner: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200&q=80' },
    { id: 'KTG-002', name: 'Summer Collection', period: 'Agustus 2026', productsCount: 24, status: 'Aktif', banner: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=200&q=80' },
    { id: 'KTG-003', name: 'Best Seller', period: 'Sepanjang Tahun', productsCount: 10, status: 'Aktif', banner: 'https://images.unsplash.com/photo-1489987707023-af0825dad1cb?w=200&q=80' },
    { id: 'KTG-004', name: 'Diskon Akhir Tahun', period: 'Desember 2026', productsCount: 0, status: 'Draft', banner: 'https://images.unsplash.com/photo-1607083206968-13611e3d76ba?w=200&q=80' },
  ];

  const filteredCatalogs = catalogs.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredCatalogs.length / itemsPerPage);
  const paginatedCatalogs = filteredCatalogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontFamily: 'var(--serif)', color: 'var(--ink)', margin: 0 }}>Katalog Produk</h2>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px', marginBottom: 0 }}>Kelola tema katalog atau koleksi terbaru toko Anda.</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ padding: '8px 16px', background: 'var(--ink)', color: 'var(--cream)', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>+ Tambah Katalog</button>
      </div>
      
      <div style={{ display: 'flex', gap: '16px' }}>
         <div style={{ flex: 1, position: 'relative' }}>
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
             <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
           </svg>
           <input 
             type="text" 
             placeholder="Cari nama katalog..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             style={{ padding: '10px 16px 10px 40px', borderRadius: '8px', border: '1px solid var(--line)', width: '100%', outline: 'none', boxSizing: 'border-box' }} 
           />
         </div>
      </div>

      <div style={{ background: 'var(--surf)', borderRadius: '12px', border: '1px solid var(--line)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--line)' }}>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>NAMA KATALOG</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>PERIODE</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>TOTAL PRODUK</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>STATUS</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCatalogs.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '48px', height: '32px', borderRadius: '4px', overflow: 'hidden', background: '#f0f0f0' }}>
                       <img src={c.banner} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{c.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{c.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px', color: 'var(--muted)' }}>{c.period}</td>
                <td style={{ padding: '16px' }}>{c.productsCount} Produk</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, background: c.status === 'Aktif' ? '#E6F4EA' : '#FEF7E0', color: c.status === 'Aktif' ? '#1E8E3E' : '#E37400' }}>
                    {c.status}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setShowModal(true)} style={{ padding: '6px 12px', border: '1px solid var(--line)', background: 'transparent', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Edit</button>
                    <button onClick={() => setDeleteItem(c)} style={{ padding: '6px', border: '1px solid #FCE8E6', background: '#FCE8E6', color: '#D93025', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Hapus Katalog">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedCatalogs.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>Katalog tidak ditemukan.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px', color: 'var(--muted)' }}>Tampilkan</span>
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--line)', background: 'transparent' }}>
               <option value={10}>10</option>
               <option value={20}>20</option>
               <option value={50}>50</option>
            </select>
            <span style={{ fontSize: '14px', color: 'var(--muted)' }}>data per halaman</span>
         </div>
         
         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
               Halaman {currentPage} dari {totalPages || 1}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
               <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} style={{ padding: '6px 12px', border: '1px solid var(--line)', borderRadius: '6px', background: 'transparent', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}>Sebelumnya</button>
               <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)} style={{ padding: '6px 12px', border: '1px solid var(--line)', borderRadius: '6px', background: 'transparent', cursor: (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer', opacity: (currentPage === totalPages || totalPages === 0) ? 0.5 : 1 }}>Selanjutnya</button>
            </div>
         </div>
      </div>

      {/* Form Tambah/Edit Katalog Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
           <div style={{ background: 'var(--surf)', padding: '24px', borderRadius: '12px', width: '450px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 12px 48px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <h3 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '20px' }}>Form Katalog</h3>
                 <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px', color: 'var(--muted)' }}>&times;</button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>BANNER KATALOG</label>
                   <div style={{ width: '100%', height: '80px', borderRadius: '8px', border: '2px dashed var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', cursor: 'pointer', background: 'rgba(0,0,0,0.02)' }}>
                      <div style={{ textAlign: 'center', fontSize: '12px' }}>+ Upload Banner (Horizontal)</div>
                   </div>
                 </div>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>NAMA KATALOG</label>
                   <input type="text" placeholder="Contoh: New Arrivals" style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none' }} />
                 </div>
                 
                 <div style={{ display: 'flex', gap: '16px' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                     <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>PERIODE KATALOG</label>
                     <input type="text" placeholder="Contoh: Oktober 2026" style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none' }} />
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                     <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>STATUS</label>
                     <select style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none', background: 'transparent' }}>
                       <option>Aktif</option>
                       <option>Draft</option>
                     </select>
                   </div>
                 </div>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>DESKRIPSI (OPSIONAL)</label>
                   <textarea rows={3} placeholder="Katalog koleksi terbaru musim ini..." style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none', resize: 'vertical' }}></textarea>
                 </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                 <button onClick={() => setShowModal(false)} style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}>Batal</button>
                 <button onClick={() => setShowModal(false)} style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', background: 'var(--ink)', color: 'var(--cream)', cursor: 'pointer', fontWeight: 600 }}>Simpan Katalog</button>
              </div>
           </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteItem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
           <div style={{ background: 'var(--surf)', padding: '24px', borderRadius: '12px', width: '400px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 12px 48px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#D93025' }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
                 </svg>
                 <h3 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)' }}>Hapus Katalog</h3>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)', lineHeight: '1.5' }}>
                Apakah Anda yakin ingin menghapus katalog <strong>{deleteItem.name}</strong>? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                 <button onClick={() => setDeleteItem(null)} style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}>Batal</button>
                 <button onClick={() => setDeleteItem(null)} style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', background: '#D93025', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Ya, Hapus</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
