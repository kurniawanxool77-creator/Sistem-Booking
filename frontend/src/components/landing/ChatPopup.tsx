import React from 'react';

export default function ChatPopup() {
  return <div dangerouslySetInnerHTML={{ __html: `<div id="chatTease" hidden><span>Butuh bantuan? <b>Chat admin</b> untuk tanya ukuran atau order.</span><button data-act="chatTeaseClose" aria-label="Tutup">×</button></div>
<button id="chatFab" data-act="chatToggle" aria-label="Chat admin" aria-expanded="false" title="Chat admin via WhatsApp"><span class="ico"><svg class="bub" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg><svg class="x" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg><span class="dot"></span></span><span class="lbl">Chat admin</span></button>
` }} />;
}
