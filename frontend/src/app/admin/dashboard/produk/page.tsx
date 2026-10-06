'use client';

import React, { useState } from 'react';

export default function DaftarProdukPage() {
  const [showModal, setShowModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [variantDetailItem, setVariantDetailItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    { 
      id: 'PRD-001', 
      image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=150&q=80',
      name: 'Kemeja Flannel', 
      catalog: 'New Arrivals', 
      category: 'Kemeja', 
      price: '150000', 
      status: 'Tersedia',
      variants: [
        { size: 'S', stock: 10, price: 150000 },
        { size: 'M', stock: 50, price: 150000 },
        { size: 'L', stock: 40, price: 150000 },
        { size: 'XL', stock: 20, price: 160000 }
      ]
    },
    { 
      id: 'PRD-002', 
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=150&q=80',
      name: 'Celana Chino', 
      catalog: 'Summer Collection', 
      category: 'Pants', 
      price: '200000', 
      status: 'Tersedia',
      variants: [
        { size: '28', stock: 11, price: 200000 },
        { size: '30', stock: 20, price: 200000 },
        { size: '32', stock: 50, price: 210000 }
      ]
    },
    { 
      id: 'PRD-003', 
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=150&q=80',
      name: 'Jaket Denim', 
      catalog: 'Best Seller', 
      category: 'Outerwear', 
      price: '350000', 
      status: 'Habis',
      variants: [
        { size: 'M', stock: 0, price: 350000 },
        { size: 'L', stock: 0, price: 350000 }
      ]
    },
  ];

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase()));

  // Form State for prototype
  const [formVariants, setFormVariants] = useState([{ size: '', stock: '', price: '', image: '' }]);
  
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatRupiah = (angka: number | string) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(angka));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontFamily: 'var(--serif)', color: 'var(--ink)', margin: 0 }}>Daftar Produk</h2>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px', marginBottom: 0 }}>Kelola inventaris, varian, dan harga produk Anda.</p>
        </div>
        <button onClick={() => { setShowModal(true); setFormVariants([{ size: '', stock: '', price: '' }]); }} style={{ padding: '8px 16px', background: 'var(--ink)', color: 'var(--cream)', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>+ Tambah Produk</button>
      </div>
      
      <div style={{ display: 'flex', gap: '16px' }}>
         <div style={{ flex: 1, position: 'relative' }}>
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
             <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
           </svg>
           <input 
             type="text" 
             placeholder="Cari kode atau nama produk..." 
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
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>KODE</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>PRODUK</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>KATALOG</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>KATEGORI</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>VARIAN & STOK</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>HARGA</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>STATUS</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map(p => {
              const totalStock = p.variants.reduce((acc, curr) => acc + curr.stock, 0);
              const prices = p.variants.map(v => Number(v.price));
              const minPrice = Math.min(...prices);
              const maxPrice = Math.max(...prices);
              const priceDisplay = minPrice === maxPrice ? formatRupiah(minPrice) : `${formatRupiah(minPrice)} - ${formatRupiah(maxPrice)}`;

              return (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '16px', fontWeight: 600, color: 'var(--muted)', fontSize: '13px' }}>{p.id}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', background: '#f0f0f0' }}>
                        <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <span style={{ fontWeight: 600 }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px', color: 'var(--muted)' }}>{p.catalog}</td>
                  <td style={{ padding: '16px', color: 'var(--muted)' }}>{p.category}</td>
                  <td style={{ padding: '16px' }}>
                    <button 
                      onClick={() => setVariantDetailItem(p)}
                      style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--surf)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 }}
                    >
                      <span>{p.variants.length} Varian</span>
                      <span style={{ color: 'var(--muted)', fontWeight: 400 }}>| Total: {totalStock}</span>
                    </button>
                  </td>
                  <td style={{ padding: '16px', fontWeight: 600, fontSize: '13px' }}>{priceDisplay}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, background: p.status === 'Tersedia' ? '#E6F4EA' : '#FCE8E6', color: p.status === 'Tersedia' ? '#1E8E3E' : '#D93025' }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => setShowModal(true)} style={{ padding: '6px 12px', border: '1px solid var(--line)', background: 'transparent', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Edit</button>
                      <button onClick={() => setDeleteItem(p)} style={{ padding: '6px', border: '1px solid #FCE8E6', background: '#FCE8E6', color: '#D93025', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Hapus Produk">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
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

      {/* Varian Detail Modal */}
      {variantDetailItem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
           <div style={{ background: 'var(--surf)', padding: '24px', borderRadius: '12px', width: '400px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 12px 48px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <h3 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '20px' }}>Detail Stok Varian</h3>
                 <button onClick={() => setVariantDetailItem(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px', color: 'var(--muted)' }}>&times;</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid var(--line)' }}>
                 <img src={variantDetailItem.image} alt={variantDetailItem.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                 <div>
                   <div style={{ fontWeight: 600 }}>{variantDetailItem.name}</div>
                   <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Kode: {variantDetailItem.id}</div>
                 </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px', fontSize: '12px', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.05em' }}>
                  <span style={{ flex: 1 }}>UKURAN</span>
                  <span style={{ flex: 1, textAlign: 'center' }}>STOK</span>
                  <span style={{ flex: 1, textAlign: 'right' }}>HARGA</span>
                </div>
                {variantDetailItem.variants.map((v: any, i: number) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', border: '1px solid var(--line)' }}>
                    <span style={{ fontWeight: 600, flex: 1 }}>{v.size}</span>
                    <span style={{ fontWeight: 600, color: v.stock > 0 ? 'var(--ink)' : '#D93025', flex: 1, textAlign: 'center' }}>{v.stock > 0 ? v.stock : 'Habis'}</span>
                    <span style={{ fontWeight: 600, color: 'var(--muted)', flex: 1, textAlign: 'right' }}>{formatRupiah(v.price)}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                 <button onClick={() => setVariantDetailItem(null)} style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', background: 'var(--ink)', color: 'var(--cream)', cursor: 'pointer', fontWeight: 600 }}>Tutup</button>
              </div>
           </div>
        </div>
      )}

      {/* Form Tambah/Edit Produk */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
           <div style={{ background: 'var(--surf)', padding: '24px', borderRadius: '12px', width: '550px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 12px 48px rgba(0,0,0,0.1)', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <h3 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '20px' }}>Form Produk Baju</h3>
                 <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px', color: 'var(--muted)' }}>&times;</button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 {/* Gambar */}
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>FOTO PRODUK</label>
                   <div style={{ width: '100px', height: '100px', borderRadius: '8px', border: '2px dashed var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', cursor: 'pointer', background: 'rgba(0,0,0,0.02)' }}>
                      <div style={{ textAlign: 'center', fontSize: '12px' }}>+<br/>Upload</div>
                   </div>
                 </div>

                 <div style={{ display: 'flex', gap: '16px' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                     <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>KODE PRODUK</label>
                     <input type="text" placeholder="PRD-004" style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none' }} />
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 2 }}>
                     <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>NAMA PRODUK</label>
                     <input type="text" placeholder="Masukkan nama baju..." style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none' }} />
                   </div>
                 </div>
                 
                 <div style={{ display: 'flex', gap: '16px' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                     <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>KATALOG</label>
                     <select style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none', background: 'transparent' }}>
                       <option>New Arrivals</option>
                       <option>Best Seller</option>
                       <option>Summer Collection</option>
                     </select>
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                     <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>KATEGORI</label>
                     <select style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none', background: 'transparent' }}>
                       <option>Kemeja</option>
                       <option>Kaos (T-Shirt)</option>
                       <option>Outerwear</option>
                       <option>Pants</option>
                     </select>
                   </div>
                 </div>

                 {/* Manajemen Varian (Ukuran & Stok & Harga) */}
                 <div style={{ padding: '16px', border: '1px solid var(--line)', borderRadius: '8px', background: 'rgba(0,0,0,0.01)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)' }}>MANAJEMEN VARIAN (GAMBAR, UKURAN, STOK & HARGA)</label>
                    </div>
                    
                    {formVariants.map((fv, index) => (
                      <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '6px', border: '1px dashed var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'rgba(0,0,0,0.02)', flexShrink: 0 }} title="Upload Gambar Varian">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <input type="text" placeholder="Ukuran (S/M/L)" value={fv.size} onChange={(e) => { const newVars = [...formVariants]; newVars[index].size = e.target.value; setFormVariants(newVars); }} style={{ width: '100%', height: '42px', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <input type="number" placeholder="Stok" value={fv.stock} onChange={(e) => { const newVars = [...formVariants]; newVars[index].stock = e.target.value; setFormVariants(newVars); }} style={{ width: '100%', height: '42px', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ flex: 1.5 }}>
                          <input type="number" placeholder="Harga (Rp)" value={fv.price} onChange={(e) => { const newVars = [...formVariants]; newVars[index].price = e.target.value; setFormVariants(newVars); }} style={{ width: '100%', height: '42px', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        {formVariants.length > 1 && (
                          <button onClick={() => { const newVars = formVariants.filter((_, i) => i !== index); setFormVariants(newVars); }} style={{ height: '42px', padding: '0 12px', border: 'none', background: '#FCE8E6', color: '#D93025', borderRadius: '6px', cursor: 'pointer', flexShrink: 0 }}>
                            &times;
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button onClick={() => setFormVariants([...formVariants, { size: '', stock: '', price: '', image: '' }])} style={{ padding: '8px', border: '1px dashed var(--muted)', background: 'transparent', color: 'var(--muted)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, marginTop: '4px' }}>
                      + Tambah Varian Baru
                    </button>
                 </div>



                 <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>KETERANGAN (DESKRIPSI)</label>
                   <textarea rows={3} placeholder="Bahan katun, adem dipakai..." style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none', resize: 'vertical' }}></textarea>
                 </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                 <button onClick={() => setShowModal(false)} style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}>Batal</button>
                 <button onClick={() => setShowModal(false)} style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', background: 'var(--ink)', color: 'var(--cream)', cursor: 'pointer', fontWeight: 600 }}>Simpan Produk</button>
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
                 <h3 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)' }}>Hapus Produk</h3>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)', lineHeight: '1.5' }}>
                Apakah Anda yakin ingin menghapus produk <strong>{deleteItem.name}</strong>? Tindakan ini tidak dapat dibatalkan.
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
