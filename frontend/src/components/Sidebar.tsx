import React from 'react';

export default function Sidebar() {
  return <div dangerouslySetInnerHTML={{ __html: `<div class="mobnav">
  <button data-go="home">Beranda</button><button data-go="katalog" data-brand="fab">Katalog</button><button data-go="cart">Keranjang</button><button data-go="cek">Riwayat order</button><button data-go="akun">Akun</button>
</div>` }} />;
}
