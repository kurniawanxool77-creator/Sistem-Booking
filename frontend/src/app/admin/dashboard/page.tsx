import React from 'react';

export default function AdminDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Stats Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '24px' }}>
        {/* Card 1 */}
        <div style={{ background: 'var(--surf)', padding: '24px', borderRadius: '12px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase' }}>Terjual</div>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: 'var(--ink)' }}>121 <span style={{ fontSize: '20px', color: 'var(--muted)', fontFamily: 'var(--sans)' }}>/ 245</span></div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>49% dari seluruh nomor</div>
          </div>
        </div>
        
        {/* Card 2 */}
        <div style={{ background: 'var(--surf)', padding: '24px', borderRadius: '12px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase' }}>Masih Tersedia</div>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: 'var(--ink)' }}>124</div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>0 nomor sedang di-hold</div>
          </div>
        </div>

        {/* Card 3 */}
        <div style={{ background: 'var(--surf)', padding: '24px', borderRadius: '12px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--acc)', textTransform: 'uppercase' }}>Perlu Dikirim</div>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: 'var(--acc)' }}>4</div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>0 menunggu pembayaran</div>
          </div>
        </div>

        {/* Card 4 */}
        <div style={{ background: 'var(--surf)', padding: '24px', borderRadius: '12px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase' }}>Penjualan Bulan Ini</div>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: 'var(--ink)' }}>Rp 9.940.000</div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Total sepanjang waktu Rp 41.899.000</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* Stok per Kategori */}
        <div style={{ background: 'var(--surf)', borderRadius: '16px', border: '1px solid var(--line)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', margin: 0 }}>Stok per kategori</h2>
            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--sold)' }}></div> Terjual</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--lock)' }}></div> Di-hold</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--ok)' }}></div> Tersedia</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Category 1 */}
            <div style={{ background: 'var(--taupe)', borderRadius: '12px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}>FABIEBSKY</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)' }}>80 terjual · 120 tersedia dari 200</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 600 }}>
                    <span>Kemeja</span>
                    <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 400 }}>61 terjual · 0 hold · <span style={{ color: 'var(--ok)', fontWeight: 600 }}>39 tersedia</span></span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--line)', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: '61%', background: 'var(--sold)' }}></div>
                    <div style={{ width: '0%', background: 'var(--lock)' }}></div>
                    <div style={{ width: '39%', background: 'var(--ok)' }}></div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 600 }}>
                    <span>Pants</span>
                    <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 400 }}>19 terjual · 0 hold · <span style={{ color: 'var(--ok)', fontWeight: 600 }}>81 tersedia</span></span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--line)', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: '19%', background: 'var(--sold)' }}></div>
                    <div style={{ width: '0%', background: 'var(--lock)' }}></div>
                    <div style={{ width: '81%', background: 'var(--ok)' }}></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Category 2 */}
            <div style={{ background: 'rgba(181,86,58,0.08)', borderRadius: '12px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ background: 'var(--acc)', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}>CURATED</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)' }}>41 terjual · 4 tersedia dari 45</div>
              </div>
            </div>

          </div>
        </div>

        {/* Pesanan Terbaru */}
        <div style={{ background: 'var(--surf)', borderRadius: '16px', border: '1px solid var(--line)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', margin: 0 }}>Pesanan terbaru</h2>
            <button style={{ background: 'transparent', border: '1px solid var(--ink)', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}>Semua pesanan</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--muted)' }}>FB-261005-4821</div>
                <div style={{ fontSize: '14px' }}>Salsa Maharani · 1 item · 06 Okt</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontWeight: 700, fontSize: '15px' }}>Rp 351.000</div>
                <div style={{ background: 'rgba(234,67,53,0.1)', color: '#EA4335', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EA4335' }}></div> Kadaluarsa
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--muted)' }}>FB-230793</div>
                <div style={{ fontSize: '14px' }}>Bagas Nugroho · 1 item · 06 Okt</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontWeight: 700, fontSize: '15px' }}>Rp 357.000</div>
                <div style={{ background: 'var(--ok-soft)', color: 'var(--ok)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--ok)' }}></div> Paid · perlu dikirim
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--muted)' }}>FB-240247</div>
                <div style={{ fontSize: '14px' }}>Bagas Nugroho · 1 item · 06 Okt</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontWeight: 700, fontSize: '15px' }}>Rp 387.000</div>
                <div style={{ background: 'var(--ok-soft)', color: 'var(--ok)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--ok)' }}></div> Paid · perlu dikirim
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
