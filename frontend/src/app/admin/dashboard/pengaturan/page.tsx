import React from 'react';

export default function PengaturanPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontFamily: 'var(--serif)', color: 'var(--ink)' }}>Pengaturan Sistem</h2>
        <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>Atur preferensi toko dan identitas brand Anda di sini.</p>
      </div>

      <div style={{ background: 'var(--surf)', borderRadius: '12px', border: '1px solid var(--line)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>Nama Toko</label>
          <input type="text" defaultValue="Fabiebsky" style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none' }} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>Email Support</label>
          <input type="email" defaultValue="support@fabiebsky.com" style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>Alamat Toko</label>
          <textarea rows={3} defaultValue="Jl. Sukajadi No. 123, Bandung" style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none', resize: 'vertical' }} />
        </div>

        <div style={{ marginTop: '12px' }}>
          <button style={{ padding: '10px 20px', background: 'var(--ink)', color: 'var(--cream)', borderRadius: '6px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Simpan Perubahan</button>
        </div>
      </div>
    </div>
  );
}
