'use client';

import React from 'react';
import Link from 'next/link';
import { useShopStore } from '../../store/useShopStore';

export default function ProfilePage() {
  const { user } = useShopStore();

  return (
    <main className="wrap" style={{ paddingBlock: '48px', minHeight: '60vh' }}>
      <div className="sec-head" style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px' }}>Profil Saya</h1>
      </div>
      
      {!user ? (
        <div className="empty">
          <p>Anda harus login untuk mengatur profil.</p>
          <Link href="/login" className="btn acc">Login Sekarang</Link>
        </div>
      ) : (
        <div className="card" style={{ padding: '24px', maxWidth: '500px' }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#E9B79A', overflow: 'hidden' }}>
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <button className="btn ghost">Ubah Foto</button>
          </div>

          <div className="form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="field">
              <label>Nama Lengkap</label>
              <input type="text" defaultValue={user.nama || ''} />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" defaultValue={user.email || ''} readOnly style={{ opacity: 0.7 }} />
            </div>
            <button className="btn acc" style={{ marginTop: '8px', alignSelf: 'flex-start' }}>Simpan Perubahan</button>
          </div>
        </div>
      )}
    </main>
  );
}
