'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = React.useState('');
  
  // Collapse states for sidebar menus
  const [isProdukOpen, setIsProdukOpen] = React.useState(true);
  const [isNotifOpen, setIsNotifOpen] = React.useState(true);
  const [isPaymentOpen, setIsPaymentOpen] = React.useState(true);
  
  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const [isNotifPopupOpen, setIsNotifPopupOpen] = React.useState(false);

  React.useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('id-ID', options));
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--cream)', color: 'var(--ink)' }}>
      {/* Sidebar Overlay for Mobile */}
      <div 
        className={isMobileSidebarOpen ? 'sidebar-overlay active' : 'sidebar-overlay'}
        onClick={() => setIsMobileSidebarOpen(false)}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999 }}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar-container ${isMobileSidebarOpen ? 'open' : ''}`} style={{ width: '260px', background: 'var(--ink)', color: 'var(--cream)', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', borderRight: '1px solid var(--ink3)', boxShadow: '4px 0 24px rgba(0,0,0,0.1)' }}>
        <div style={{ padding: '32px 24px 24px 24px', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <img src="/images/landing_0.png" alt="Fabiebsky" style={{ height: '48px', filter: 'brightness(0) invert(1)' }} />
        </div>
        
        {/* Custom scrollbar and media queries injected via style tag */}
        <style dangerouslySetInnerHTML={{__html: `
          .sidebar-scroll::-webkit-scrollbar { width: 6px; }
          .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
          .sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
          .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }

          .sidebar-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 16px;
            color: rgba(244,239,231,0.7);
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            border-radius: 8px;
            transition: all 0.2s ease;
            background: transparent;
            border: 1px solid transparent;
            cursor: pointer;
            width: 100%;
          }
          .sidebar-item:hover {
            background: rgba(255,255,255,0.05);
            color: var(--cream);
          }
          .sidebar-item.active {
            background: rgba(233,183,154,0.1);
            color: #E9B79A;
            border: 1px solid rgba(233,183,154,0.2);
          }
          
          .sidebar-submenu-item {
            color: rgba(244,239,231,0.5);
            text-decoration: none;
            font-size: 13px;
            position: relative;
            transition: all 0.2s ease;
            display: block;
            padding: 4px 0;
          }
          .sidebar-submenu-item:hover {
            color: var(--cream);
            transform: translateX(4px);
          }
          .sidebar-submenu-item.active {
            color: #E9B79A;
            font-weight: 600;
          }

          .hamburger-btn { display: none; }
          .sidebar-overlay { display: none; }
          .header-left { display: flex; align-items: center; }

          @media (max-width: 768px) {
            .sidebar-container {
              position: fixed !important;
              left: 0;
              top: 0;
              z-index: 1000;
              transform: translateX(-100%);
              transition: transform 0.3s ease;
            }
            .sidebar-container.open {
              transform: translateX(0);
            }
            .sidebar-overlay.active {
              display: block !important;
            }
            .hamburger-btn {
              display: flex !important;
              align-items: center;
              justify-content: center;
              background: transparent;
              border: none;
              cursor: pointer;
              padding: 8px;
              margin-left: -8px;
              margin-right: 12px;
              color: var(--ink);
            }
            .header-container {
              padding: 16px 20px !important;
            }
            .header-title-text {
              font-size: 24px !important;
            }
          }
        `}} />

        <div className="sidebar-scroll" style={{ padding: '0 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', paddingBottom: '32px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'var(--muted)', fontWeight: 700 }}>MENU</div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', margin: '0 -12px', fontFamily: 'var(--sans)' }}>
            
            <Link href="/admin/dashboard" className={`sidebar-item ${pathname === '/admin/dashboard' ? 'active' : ''}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>Dashboard</span>
              </div>
            </Link>

            <Link href="/admin/dashboard/manajemen-user" className={`sidebar-item ${pathname?.includes('/admin/dashboard/manajemen-user') ? 'active' : ''}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Manajemen User</span>
              </div>
            </Link>

            <Link href="/admin/dashboard/analitik" className={`sidebar-item ${pathname?.includes('/admin/dashboard/analitik') ? 'active' : ''}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                </svg>
                <span>Analitik Bisnis</span>
              </div>
            </Link>
            
            <Link href="/admin/dashboard/pemesanan" className={`sidebar-item ${pathname?.includes('/admin/dashboard/pemesanan') ? 'active' : ''}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span>Pemesanan</span>
              </div>
              <span style={{ background: 'var(--acc)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '10px' }}>4</span>
            </Link>

            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
              <button onClick={() => setIsProdukOpen(!isProdukOpen)} className={`sidebar-item ${pathname?.includes('/admin/dashboard/produk') ? 'active' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.38 3.46L16 2a8 8 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/>
                  </svg>
                  <span>Produk</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isProdukOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {isProdukOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '6px 0 12px 42px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '24px', top: 0, bottom: '12px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                  <Link href="/admin/dashboard/produk" className={`sidebar-submenu-item ${pathname === '/admin/dashboard/produk' ? 'active' : ''}`}>Daftar Produk</Link>
                  <Link href="/admin/dashboard/produk/katalog" className={`sidebar-submenu-item ${pathname?.includes('/admin/dashboard/produk/katalog') ? 'active' : ''}`}>Katalog</Link>
                  <Link href="/admin/dashboard/produk/kategori" className={`sidebar-submenu-item ${pathname?.includes('/admin/dashboard/produk/kategori') ? 'active' : ''}`}>Kategori</Link>
                  <Link href="/admin/dashboard/produk/diskon" className={`sidebar-submenu-item ${pathname?.includes('/admin/dashboard/produk/diskon') ? 'active' : ''}`}>Diskon</Link>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
              <button onClick={() => setIsNotifOpen(!isNotifOpen)} className={`sidebar-item ${pathname?.includes('/admin/dashboard/notifikasi') ? 'active' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <span>Notifikasi</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isNotifOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {isNotifOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '6px 0 12px 42px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '24px', top: 0, bottom: '12px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                  <Link href="/admin/dashboard/notifikasi/perubahan" className={`sidebar-submenu-item ${pathname?.includes('/admin/dashboard/notifikasi/perubahan') ? 'active' : ''}`}>Perubahan Sistem</Link>
                  <Link href="/admin/dashboard/notifikasi" className={`sidebar-submenu-item ${pathname === '/admin/dashboard/notifikasi' ? 'active' : ''}`}>Pesan Masuk</Link>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
              <button onClick={() => setIsPaymentOpen(!isPaymentOpen)} className={`sidebar-item ${pathname?.includes('/admin/dashboard/payment-gateway') ? 'active' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line>
                  </svg>
                  <span>Payment Gateway</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isPaymentOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {isPaymentOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '6px 0 12px 42px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '24px', top: 0, bottom: '12px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                  <Link href="/admin/dashboard/payment-gateway/tripay" className={`sidebar-submenu-item ${pathname?.includes('/admin/dashboard/payment-gateway/tripay') ? 'active' : ''}`}>Tripay</Link>
                </div>
              )}
            </div>

            <Link href="/admin/dashboard/pengaturan" className={`sidebar-item ${pathname?.includes('/admin/dashboard/pengaturan') ? 'active' : ''}`} style={{ marginTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <span>Pengaturan</span>
              </div>
            </Link>

          </nav>
        </div>
        
        <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--cream)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontFamily: 'var(--serif)', fontWeight: 700 }}>
               F
             </div>
             <div>
               <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--cream)' }}>Ferdinand</div>
               <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Superadmin</div>
             </div>
          </div>
          <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Keluar" onMouseOver={(e) => e.currentTarget.style.background='rgba(217, 48, 37, 0.2)'} onMouseOut={(e) => e.currentTarget.style.background='rgba(255,255,255,0.05)'}>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
             </svg>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Navbar */}
        <header className="header-container" style={{ 
          background: 'var(--surf)', borderBottom: '1px solid var(--line)', 
          padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 4px 24px rgba(0,0,0,0.03)'
        }}>
          <div className="header-left">
            <button className="hamburger-btn" onClick={() => setIsMobileSidebarOpen(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div>
              <h1 className="header-title-text" style={{ fontSize: '32px', fontFamily: 'var(--serif)', margin: '0 0 4px', color: 'var(--ink)' }}>Dashboard</h1>
              <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>Ringkasan stok dan penjualan</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ fontSize: '14px', color: 'var(--muted)', display: 'flex', alignItems: 'center' }}>
              {currentDate || '...'}
            </div>
            <div style={{ width: '1px', height: '24px', background: 'var(--line)' }}></div>
            
            <div style={{ position: 'relative' }}>
              <button onClick={() => setIsNotifPopupOpen(!isNotifPopupOpen)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.03)', border: 'none', cursor: 'pointer', position: 'relative' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span style={{ position: 'absolute', top: '6px', right: '8px', width: '8px', height: '8px', background: '#D93025', borderRadius: '50%', border: '2px solid var(--surf)' }}></span>
              </button>

              {isNotifPopupOpen && (
                <div style={{ position: 'absolute', top: '50px', right: '0', width: '320px', background: 'var(--surf)', borderRadius: '12px', boxShadow: '0 12px 48px rgba(0,0,0,0.12)', border: '1px solid var(--line)', overflow: 'hidden', zIndex: 100 }}>
                   <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: 0, fontSize: '16px', fontFamily: 'var(--serif)' }}>Notifikasi</h3>
                      <span style={{ fontSize: '12px', color: '#1E8E3E', fontWeight: 600, cursor: 'pointer' }}>Tandai dibaca</span>
                   </div>
                   <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', background: 'rgba(0,0,0,0.02)', cursor: 'pointer' }}>
                         <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--ink)' }}>Pesanan Baru: FB-261005</div>
                         <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Salsa Maharani telah melakukan pembayaran sebesar Rp 351.000.</div>
                         <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px' }}>10 menit yang lalu</div>
                      </div>
                      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', cursor: 'pointer' }}>
                         <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--ink)' }}>Stok Menipis</div>
                         <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Produk "Jaket Denim" varian M sisa 0.</div>
                         <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px' }}>1 jam yang lalu</div>
                      </div>
                   </div>
                   <div style={{ padding: '12px', textAlign: 'center', borderTop: '1px solid var(--line)', background: 'var(--surf)' }}>
                      <Link href="/admin/dashboard/notifikasi" onClick={() => setIsNotifPopupOpen(false)} style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 600, textDecoration: 'none' }}>Lihat Semua Notifikasi</Link>
                   </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: '32px 40px', flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
