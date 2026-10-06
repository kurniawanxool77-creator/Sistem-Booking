import React from 'react';

export default function PesanMasukPage() {
  const messages = [
    { id: 1, title: 'Pembayaran Dikonfirmasi', body: 'Pesanan FB-230793-1122 telah dibayar oleh pelanggan.', time: '10 menit yang lalu', unread: true },
    { id: 2, title: 'Peringatan Stok Menipis', body: 'Stok produk Celana Chino kini tersisa 5 item. Segera restock sebelum kehabisan.', time: '2 jam yang lalu', unread: true },
    { id: 3, title: 'Pesanan Baru Masuk', body: 'Pesanan FB-240247-9912 sedang menunggu pembayaran.', time: 'Kemarin', unread: false },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontFamily: 'var(--serif)', color: 'var(--ink)' }}>Pesan Masuk & Notifikasi</h2>
        <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>Pemberitahuan terkini terkait pesanan dan sistem toko Anda.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map(m => (
          <div key={m.id} style={{ background: 'var(--surf)', padding: '20px', borderRadius: '12px', border: '1px solid', borderColor: m.unread ? 'var(--ink)' : 'var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {m.unread && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ink)' }}></div>}
                <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--ink)' }}>{m.title}</div>
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '14px', marginLeft: m.unread ? '16px' : '0' }}>{m.body}</div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{m.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
