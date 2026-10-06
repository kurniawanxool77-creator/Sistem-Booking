import React from 'react';

export default function Footer() {
  return <div dangerouslySetInnerHTML={{ __html: `<footer>
  <div class="wrap">
    <div class="cols">
      <div class="col"><img src="/images/landing_1.png" alt="Fabiebsky" style="height:40px;width:auto;align-self:flex-start"><p>Satu baju, satu pemilik. Kemeja dan pants buatan sendiri dalam jumlah terbatas, plus thrift pilihan yang masing-masing cuma ada satu.</p></div>
      <div class="col"><span class="label">Belanja</span><button data-go="katalog" data-brand="fab">fabiebsky</button><button data-go="katalog" data-brand="cur">fabiebsky.curated</button>
        <span class="label" style="margin-top:8px">Ikuti kami</span>
        <div class="social"><a href="https://instagram.com/fabiebsky" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a><a href="https://tiktok.com/@fabiebsky" target="_blank" rel="noopener" aria-label="TikTok" title="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.3 1.7 3.8 4 4v3.1c-1.5 0-2.9-.5-4-1.3v6.4a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v3.2a2.5 2.5 0 1 0 1.6 2.3V3h3.1z"/></svg></a><a href="https://shopee.co.id/fabiebsky" target="_blank" rel="noopener" aria-label="Shopee" title="Shopee"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16l-1 12H5L4 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><path d="M9.5 13c0 1 1 1.5 2.5 1.5s2.5.5 2.5 1.5-1 1.5-2.5 1.5-2.5-.5-2.5-1.5"/></svg></a><a href="https://wa.me/628xxxxxxxxxx" target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z"/><path d="M9 10c.3 1.8 1.9 3.5 3.8 3.9l1.2-1.2 2 .9-.3 1.6c-3.4.4-7.4-3.3-7.4-6.7L10 7l1 2-2 1z"/></svg></a></div></div>
      <div class="col"><span class="label">Bantuan</span><a class="fcontact" href="https://wa.me/6281234567890" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z"/></svg><span>WA: <b class="num">0812-3456-7890</b></span></a><a class="fcontact" href="mailto:halo@fabiebsky.id"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg><span>Email: <b>halo@fabiebsky.id</b></span></a></div>
      <div class="col"><span class="label">Kebijakan</span><span style="color:var(--sand)">Pembayaran: VA, QRIS, e-wallet</span><span style="color:var(--sand)">Thrift: no return</span><span style="color:var(--sand)">Lock 15 menit saat checkout</span></div>
    </div>
    <div class="bot"><span>© 2026 Fabiebsky. Prototype dengan data contoh.</span><span>Guest checkout · tanpa akun</span></div>
  </div>
</footer>` }} />;
}
