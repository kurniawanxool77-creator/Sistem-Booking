'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import ChatPopup from '../../components/landing/ChatPopup';
import { useShopStore } from '../../store/useShopStore';

export default function CartPage() {
  const { cart, user } = useShopStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // REDIRECT TO LOGIN IF NOT LOGGED IN
    // Sesuai permintaan: "kalau mau pembelian harus di arahkan ke halaman login dulu"
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!mounted || !user) {
    // Show nothing while redirecting to prevent flicker
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="container" style={{ padding: '120px 24px 64px', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
        <h5 style={{ color: 'var(--acc)', fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>KERANJANG ANDA</h5>
        <h1 className="t-brand" style={{ fontSize: '3.5rem', marginBottom: 48 }}>{user.nama}</h1>
        
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 24px', background: 'var(--cream)', borderRadius: 16 }}>
            <h3 style={{ fontSize: 24, marginBottom: 16 }}>Keranjang masih kosong.</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 24 }}>Pilih item yang kamu mau dari katalog kami.</p>
            <button className="btn" onClick={() => router.push('/katalog')}>Ke Katalog</button>
          </div>
        ) : (
          <p>Anda memiliki {cart.length} item di keranjang.</p>
        )}
      </main>
      <ChatPopup />
      <Sidebar />
      <Footer />
    </>
  );
}
