import React from 'react';

export default function TripayPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontFamily: 'var(--serif)', color: 'var(--ink)' }}>Konfigurasi Tripay</h2>
        <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>Masukkan kredensial Tripay untuk mengaktifkan pembayaran otomatis.</p>
      </div>

      <div style={{ background: 'var(--surf)', borderRadius: '12px', border: '1px solid var(--line)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>Environment</label>
          <select style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none', background: 'transparent' }}>
            <option>Sandbox (Testing)</option>
            <option>Production (Live)</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>Merchant Code</label>
          <input type="text" placeholder="T..." style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none' }} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>API Key</label>
          <input type="password" placeholder="DEV-..." style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>Private Key</label>
          <input type="password" placeholder="***" style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none' }} />
        </div>

        <div style={{ marginTop: '12px' }}>
          <button style={{ padding: '10px 20px', background: 'var(--ink)', color: 'var(--cream)', borderRadius: '6px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Simpan Konfigurasi</button>
        </div>
      </div>
    </div>
  );
}
