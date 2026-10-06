'use client';

import React from 'react';
import Link from 'next/link';
import { useShopStore } from '../../store/useShopStore';

export default function RiwayatPage() {
  const { user } = useShopStore();

  return (
    <main className="wrap" style={{ paddingBlock: '48px', minHeight: '60vh' }}>
      <div className="sec-head" style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px' }}>Riwayat Pemesanan</h1>
      </div>
      
      {!user ? (
        <div className="empty">
          <p>Anda harus login untuk melihat riwayat pemesanan.</p>
          <Link href="/login" className="btn acc">Login Sekarang</Link>
        </div>
      ) : (
        <div className="card" style={{ padding: '24px' }}>
          <div className="empty" style={{ padding: '64px 24px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--taupe2)' }}>
              <path d="M21 8v13H3V8" />
              <path d="M1 3h22v5H1z" />
              <path d="M10 12h4" />
            </svg>
            <p>Belum ada riwayat pesanan.</p>
            <Link href="/katalog" className="btn ghost" style={{ marginTop: '12px' }}>Mulai Belanja</Link>
          </div>
        </div>
      )}
    </main>
  );
}
