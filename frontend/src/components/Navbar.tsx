'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShopStore } from '../store/useShopStore';

export default function Navbar() {
  const { cart, user, logoutUser } = useShopStore();
  const router = useRouter();

  return (
    <header>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" aria-label="Fabiebsky beranda" style={{ background: 'transparent', border: 'none', padding: 0 }}>
          <img src="/images/landing_0.png" alt="Fabiebsky" />
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <nav id="nav" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none', fontSize: '18px', color: 'inherit', fontFamily: 'var(--serif)' }}>Home</Link>
            <div className="dd">
              <Link href="/katalog" className="dd-btn" style={{ textDecoration: 'none', fontSize: '18px', color: 'inherit', fontFamily: 'var(--serif)' }}>
                Katalog{' '}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4 }}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </Link>
              <div className="dd-menu" role="menu">
                <button onClick={() => router.push('/katalog?brand=fab')} role="menuitem">
                  <b>fabiebsky</b><span> (200)</span>
                </button>
                <button onClick={() => router.push('/katalog?brand=cur')} role="menuitem">
                  <b>fabiebsky.curated</b><span> (45)</span>
                </button>
              </div>
            </div>

          </nav>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/cart" className="cartbtn" aria-label="Keranjang" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6L5 3H2"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>
              </svg>
              <span className="n" id="cartCount" style={{ background: '#db4a2b', color: '#fff', borderRadius: '50%', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' }}>
                {cart.length}
              </span>
            </Link>
            
            {user ? (
              <nav>
                <div className="dd">
                  <button className="dd-btn" style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    cursor: 'pointer',
                    padding: 0
                  }}>
                    <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{user.nama || 'User'}</span>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E9B79A', overflow: 'hidden' }}>
                      <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  <div className="dd-menu" role="menu" style={{ right: 0, left: 'auto', minWidth: '180px' }}>
                    <button onClick={() => router.push('/alamat')} role="menuitem">
                      <span>Alamat</span>
                    </button>
                    <button onClick={() => router.push('/riwayat')} role="menuitem">
                      <span>Riwayat Pemesanan</span>
                    </button>
                    <button onClick={() => router.push('/profile')} role="menuitem">
                      <span>Foto Profile</span>
                    </button>
                    <button onClick={() => router.push('/forgot-password')} role="menuitem">
                      <span>Lupa Password</span>
                    </button>
                    <div style={{ height: 1, background: 'var(--line)', margin: '4px 0' }}></div>
                    <button onClick={() => {
                      logoutUser();
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      router.push('/');
                    }} role="menuitem" style={{ color: '#EA4335' }}>
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>
              </nav>
            ) : (
              <Link href="/login" style={{ 
                textDecoration: 'none', 
                background: '#db4a2b', 
                color: '#fff', 
                padding: '8px 16px', 
                borderRadius: '4px',
                fontWeight: 600
              }}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
