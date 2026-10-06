'use client';

import React, { useState } from 'react';

export default function ManajemenUserPage() {
  const [showModal, setShowModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const users = [
    { id: 1, name: 'Ferdinand', email: 'ferdi@fabiebsky.com', role: 'Superadmin', status: 'Aktif', provider: 'Email' },
    { id: 2, name: 'Agus', email: 'agus@fabiebsky.com', role: 'Admin', status: 'Aktif', provider: 'Email' },
    { id: 3, name: 'Salsa', email: 'salsa@example.com', role: 'Customer', status: 'Pasif', provider: 'Google' },
    { id: 4, name: 'Bagas', email: 'bagas@gmail.com', role: 'Customer', status: 'Aktif', provider: 'Google' },
  ];

  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === '' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '24px', fontFamily: 'var(--serif)', color: 'var(--ink)', margin: 0 }}>Manajemen User</h2>
        <button onClick={() => setShowModal(true)} style={{ padding: '8px 16px', background: 'var(--ink)', color: 'var(--cream)', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>+ Tambah User</button>
      </div>
      
      {/* Search and Filters */}
      <div style={{ display: 'flex', gap: '16px' }}>
         <div style={{ flex: 1, position: 'relative' }}>
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
             <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
           </svg>
           <input 
             type="text" 
             placeholder="Cari nama atau email pengguna..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             style={{ padding: '10px 16px 10px 40px', borderRadius: '8px', border: '1px solid var(--line)', width: '100%', outline: 'none', boxSizing: 'border-box' }} 
           />
         </div>
         <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--line)', outline: 'none', background: 'transparent' }}>
            <option value="">Semua Role</option>
            <option value="Superadmin">Superadmin</option>
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
         </select>
      </div>

      <div style={{ background: 'var(--surf)', borderRadius: '12px', border: '1px solid var(--line)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--line)' }}>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>NAMA</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>EMAIL</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>METODE LOGIN</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>ROLE</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>STATUS</th>
              <th style={{ padding: '16px', fontSize: '12px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em' }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? filteredUsers.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '16px', fontWeight: 500 }}>{u.name}</td>
                <td style={{ padding: '16px', color: 'var(--muted)', fontSize: '14px' }}>{u.email}</td>
                <td style={{ padding: '16px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {u.provider === 'Google' ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10z"></path>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect><polyline points="3 7 12 13 21 7"></polyline>
                        </svg>
                      )}
                      <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{u.provider}</span>
                   </div>
                </td>
                <td style={{ padding: '16px' }}><span style={{ padding: '4px 8px', background: 'var(--line)', borderRadius: '4px', fontSize: '12px' }}>{u.role}</span></td>
                <td style={{ padding: '16px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, background: u.status === 'Aktif' ? '#E6F4EA' : '#FCE8E6', color: u.status === 'Aktif' ? '#1E8E3E' : '#D93025' }}>
                    {u.status}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '6px 12px', border: '1px solid var(--line)', background: 'transparent', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Edit</button>
                    <button onClick={() => setDeleteItem(u)} style={{ padding: '6px', border: '1px solid #FCE8E6', background: '#FCE8E6', color: '#D93025', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Hapus User">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>Tidak ada user yang ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
           <div style={{ background: 'var(--surf)', padding: '24px', borderRadius: '12px', width: '400px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 12px 48px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <h3 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '20px' }}>Tambah User Baru</h3>
                 <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px', color: 'var(--muted)' }}>&times;</button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>NAMA LENGKAP</label>
                   <input type="text" placeholder="Masukkan nama..." style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none' }} />
                 </div>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>EMAIL</label>
                   <input type="email" placeholder="contoh@gmail.com" style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none' }} />
                 </div>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>ROLE AKSES</label>
                   <select style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none', background: 'transparent' }}>
                     <option>Customer</option>
                     <option>Admin</option>
                   </select>
                 </div>
                 
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                   <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>TIPE PENDAFTARAN (LOGIN)</label>
                   <select style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--line)', outline: 'none', background: 'transparent' }}>
                     <option>Manual (Set Password Default)</option>
                     <option>Otomatis (Terkait Akun Google / SSO)</option>
                   </select>
                   <span style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Jika memilih Otomatis, sistem hanya akan mengizinkan login via Google menggunakan email di atas.</span>
                 </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                 <button onClick={() => setShowModal(false)} style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}>Batal</button>
                 <button onClick={() => setShowModal(false)} style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', background: 'var(--ink)', color: 'var(--cream)', cursor: 'pointer', fontWeight: 600 }}>Simpan User</button>
              </div>
           </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteItem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
           <div style={{ background: 'var(--surf)', padding: '24px', borderRadius: '12px', width: '400px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 12px 48px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#D93025' }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
                 </svg>
                 <h3 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)' }}>Hapus User</h3>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)', lineHeight: '1.5' }}>
                Apakah Anda yakin ingin menghapus user <strong>{deleteItem.name}</strong>? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                 <button onClick={() => setDeleteItem(null)} style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}>Batal</button>
                 <button onClick={() => setDeleteItem(null)} style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', background: '#D93025', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Ya, Hapus</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
