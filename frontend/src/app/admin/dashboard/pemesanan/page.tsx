'use client';

import React, { useState } from 'react';

export default function PemesananPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  // Fake data generation
  const allOrders = Array.from({ length: 45 }).map((_, i) => {
    const statuses = ['Paid', 'Unpaid', 'Kadaluarsa'];
    const names = ['Salsa Maharani', 'Bagas Nugroho', 'Dimas Aditya', 'Rina Melati', 'Ferdinand', 'Agus'];
    const couriers = ['JNE Reguler', 'J&T Express', 'Sicepat BEST'];
    const subtotal = 150000 + i * 50000;
    const shippingFee = 15000;
    const discount = i % 2 === 0 ? 20000 : 0;
    const total = subtotal + shippingFee - discount;
    return {
      id: `FB-261005-${4800 + i}`,
      customer: names[i % names.length],
      date: `0${(i % 9) + 1} Okt 2026`,
      status: statuses[i % 3],
      courier: couriers[i % 3],
      trackingNumber: i % 2 === 0 ? '' : `JP88273${i}4492`,
      address: `Jl. Pahlawan No. ${i + 12}, RT 01/RW 02, Jakarta`,
      items: [
        { name: 'Kemeja Flannel', variant: 'L', qty: 1, price: subtotal }
      ],
      subtotal: `Rp ${subtotal.toLocaleString('id-ID')}`,
      shippingFee: `Rp ${shippingFee.toLocaleString('id-ID')}`,
      discount: discount > 0 ? `Rp ${discount.toLocaleString('id-ID')}` : 'Rp 0',
      total: `Rp ${total.toLocaleString('id-ID')}`
    };
  });

  const filteredOrders = allOrders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === '' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const displayedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontFamily: 'var(--serif)', color: 'var(--ink)', margin: 0 }}>Daftar Pemesanan</h2>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px', marginBottom: 0 }}>Kelola pesanan masuk yang perlu diproses.</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Cari ID Pesanan atau Nama Pelanggan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '10px 16px 10px 40px', borderRadius: '8px', border: '1px solid var(--line)', width: '100%', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--line)', outline: 'none', background: 'transparent' }}>
          <option value="">Semua Status</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Kadaluarsa">Kadaluarsa</option>
        </select>
      </div>

      <div style={{ background: 'var(--surf)', borderRadius: '12px', border: '1px solid var(--line)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--line)' }}>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>ID PESANAN</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>PELANGGAN</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>TANGGAL</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>STATUS</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>TOTAL</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {displayedOrders.length > 0 ? displayedOrders.map(o => (
              <tr key={o.id} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '16px', fontWeight: 600, color: 'var(--ink)' }}>{o.id}</td>
                <td style={{ padding: '16px' }}>{o.customer}</td>
                <td style={{ padding: '16px', color: 'var(--muted)' }}>{o.date}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600,
                    background: o.status === 'Paid' ? '#E6F4EA' : (o.status === 'Kadaluarsa' ? '#FCE8E6' : '#FEF7E0'),
                    color: o.status === 'Paid' ? '#1E8E3E' : (o.status === 'Kadaluarsa' ? '#D93025' : '#E37400')
                  }}>
                    {o.status}
                  </span>
                </td>
                <td style={{ padding: '16px', fontWeight: 600 }}>{o.total}</td>
                <td style={{ padding: '16px' }}>
                  <button onClick={() => setSelectedInvoice(o)} style={{ padding: '6px 12px', border: '1px solid var(--line)', background: 'transparent', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Lihat Resi
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>Tidak ada pesanan ditemukan.</td></tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--muted)' }}>
            Menampilkan
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--line)', outline: 'none' }}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            data dari total {filteredOrders.length}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--line)', background: 'transparent', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? 'var(--line)' : 'var(--ink)' }}>Sebelumnya</button>
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages || totalPages === 0} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--line)', background: 'transparent', cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer', color: currentPage === totalPages || totalPages === 0 ? 'var(--line)' : 'var(--ink)' }}>Selanjutnya</button>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'var(--surf)', padding: '32px', borderRadius: '12px', width: '500px', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 12px 48px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '24px' }}>Invoice Pembayaran</h3>
                <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>Resi pesanan untuk pelanggan.</div>
              </div>
              <button onClick={() => setSelectedInvoice(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px', color: 'var(--muted)' }}>&times;</button>
            </div>

            <div style={{ padding: '20px', border: '1px dashed var(--line)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255,255,255,0.5)', maxHeight: '60vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '12px' }}>ID Pesanan</div>
                  <div style={{ fontWeight: 600 }}>{selectedInvoice.id}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '12px' }}>Tanggal</div>
                  <div style={{ fontWeight: 600 }}>{selectedInvoice.date}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '12px' }}>Status Pembayaran</div>
                  <div>
                    <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, background: selectedInvoice.status === 'Paid' ? '#E6F4EA' : (selectedInvoice.status === 'Kadaluarsa' ? '#FCE8E6' : '#FEF7E0'), color: selectedInvoice.status === 'Paid' ? '#1E8E3E' : (selectedInvoice.status === 'Kadaluarsa' ? '#D93025' : '#E37400') }}>
                      {selectedInvoice.status}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ height: '1px', background: 'var(--line)' }}></div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '12px' }}>Nama Pelanggan</div>
                  <div style={{ fontWeight: 600 }}>{selectedInvoice.customer}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '12px', minWidth: '100px' }}>Alamat</div>
                  <div style={{ fontWeight: 500, fontSize: '13px', textAlign: 'right' }}>{selectedInvoice.address}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '12px' }}>Kurir Pengiriman</div>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>{selectedInvoice.courier}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '12px' }}>No. Resi</div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#1E8E3E' }}>
                    {selectedInvoice.trackingNumber ? (
                      selectedInvoice.trackingNumber
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: 'var(--ink)' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                          Resi
                          <input type="file" style={{ display: 'none' }} />
                        </label>
                        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>atau</span>
                        <input type="text" placeholder="Ketik No. Resi..." style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid var(--line)', outline: 'none', fontSize: '12px', width: '130px', color: 'var(--ink)' }} />
                        <button style={{ padding: '6px 10px', borderRadius: '4px', background: 'var(--ink)', color: 'var(--cream)', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Simpan</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ height: '1px', background: 'var(--line)' }}></div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.05em' }}>DETAIL PRODUK</div>
                {selectedInvoice.items.map((item: any, idx: number) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Varian: {item.variant} &times; {item.qty}</div>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>Rp {item.price.toLocaleString('id-ID')}</div>
                  </div>
                ))}
              </div>

              <div style={{ height: '1px', background: 'var(--line)' }}></div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '13px' }}>Subtotal Produk</div>
                  <div style={{ fontWeight: 500, fontSize: '13px' }}>{selectedInvoice.subtotal}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '13px' }}>Biaya Pengiriman</div>
                  <div style={{ fontWeight: 500, fontSize: '13px' }}>{selectedInvoice.shippingFee}</div>
                </div>
                {selectedInvoice.discount !== 'Rp 0' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ color: '#D93025', fontSize: '13px' }}>Diskon</div>
                    <div style={{ fontWeight: 500, fontSize: '13px', color: '#D93025' }}>-{selectedInvoice.discount}</div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '16px', borderTop: '2px dashed var(--line)' }}>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>Total Pembayaran</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink)' }}>{selectedInvoice.total}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                Cetak Resi
              </button>
              <button onClick={() => setSelectedInvoice(null)} style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', background: 'var(--ink)', color: 'var(--cream)', cursor: 'pointer', fontWeight: 600 }}>Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
