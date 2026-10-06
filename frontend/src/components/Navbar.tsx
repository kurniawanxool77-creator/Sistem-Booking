'use client';

import React from 'react';
import Link from 'next/link';
import { useShopStore } from '../store/useShopStore';

export default function Navbar() {
  const { cart, user, logoutUser } = useShopStore();

  return (
    <header>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" aria-label="Fabiebsky beranda" style={{ background: 'transparent', border: 'none', padding: 0 }}>
          <img src="/images/landing_0.png" alt="Fabiebsky" />
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <nav id="nav" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>Home</Link>
            <div className="dd">
              <Link href="/katalog" className="dd-btn" style={{ textDecoration: 'none' }}>
                Katalog{' '}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </Link>
              <div className="dd-menu" role="menu">
                <Link href="/katalog?brand=fab" role="menuitem">
                  <b>fabiebsky</b><span> (200)</span>
                </Link>
                <Link href="/katalog?brand=cur" role="menuitem">
                  <b>fabiebsky.curated</b><span> (45)</span>
                </Link>
              </div>
            </div>
            {user && (
              <Link href="/cek" style={{ textDecoration: 'none' }}>Riwayat order</Link>
            )}
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
              <button onClick={() => logoutUser()} style={{ 
                background: '#db4a2b', 
                color: '#fff', 
                border: 'none',
                padding: '8px 16px', 
                borderRadius: '4px',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                Logout
              </button>
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
