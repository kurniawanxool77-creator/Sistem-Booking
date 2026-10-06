'use client';

import React from 'react';
import Link from 'next/link';
import { useShopStore } from '../../store/useShopStore';

export default function AlamatPage() {
  const { user } = useShopStore();

  return (
    <main className="wrap" style={{ paddingBlock: '48px', minHeight: '60vh' }}>
      <div className="sec-head" style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px' }}>Buku Alamat</h1>
      </div>
      
      {!user ? (
        <div className="empty">
          <p>Anda harus login untuk mengatur alamat.</p>
          <Link href="/login" className="btn acc">Login Sekarang</Link>
        </div>
      ) : (
        <div className="card" style={{ padding: '24px' }}>
          <div className="field" style={{ maxWidth: '400px' }}>
            <label>Alamat Lengkap</label>
            <textarea rows={4} placeholder="Masukkan alamat lengkap pengiriman..." defaultValue={user.alamat || ''} />
            <button className="btn acc" style={{ marginTop: '16px' }}>Simpan Alamat</button>
          </div>
        </div>
      )}
    </main>
  );
}
