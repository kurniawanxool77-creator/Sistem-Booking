'use client';

import React, { useState } from 'react';

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [teaseHidden, setTeaseHidden] = useState(false);
  const [nama, setNama] = useState('');
  const [pesan, setPesan] = useState('');

  const adminWa = "6281234567890"; // the target WA number requested by user

  const handleSend = () => {
    let text = '';
    if (nama) {
      text += `Halo min, saya *${nama}*\n\n`;
    }
    if (pesan) {
      text += `${pesan}`;
    } else {
      text += `Halo! Ada yang bisa dibantu soal order atau ukuran?`;
    }

    const url = `https://wa.me/${adminWa}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setPesan('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div id="chatTease" hidden={teaseHidden || isOpen}>
        <span>Butuh bantuan? <b>Chat admin</b> untuk tanya ukuran atau order.</span>
        <button aria-label="Tutup" onClick={() => setTeaseHidden(true)}>×</button>
      </div>
      
      <button 
        id="chatFab" 
        onClick={() => setIsOpen(!isOpen)} 
        aria-label={isOpen ? "Tutup" : "Chat admin"} 
        aria-expanded={isOpen} 
        title={isOpen ? "Tutup chat" : "Chat admin via WhatsApp"}
      >
        <span className="ico">
          <svg className="bub" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z"/>
            <path d="M8 12h.01M12 12h.01M16 12h.01"/>
          </svg>
          <svg className="x" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18"/>
          </svg>
          <span className="dot"></span>
        </span>
        <span className="lbl">{isOpen ? "Tutup" : "Chat admin"}</span>
      </button>

      {isOpen && (
        <div id="chatBox" role="dialog" aria-label="Chat admin" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="hd">
            <div className="av">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <b>Admin Fabiebsky</b>
              <small>Biasanya balas dalam beberapa menit</small>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Tutup" style={{ color: 'var(--sand)', fontSize: '20px', minWidth: '32px' }}>×</button>
          </div>
          <div className="bd">
            <div className="cw-list" id="cwList">
              <div className="cw-m admin">Halo! Ada yang bisa dibantu soal order atau ukuran?</div>
            </div>
            <div className="cw-g" id="cwGuest" style={{ gridTemplateColumns: '1fr', marginBottom: '8px' }}>
              <input 
                id="cwNama" 
                placeholder="Nama kamu" 
                autoComplete="name" 
                value={nama} 
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <textarea 
              id="chatMsg" 
              placeholder="Tulis pesan untuk admin (Enter untuk kirim)" 
              value={pesan} 
              onChange={(e) => setPesan(e.target.value)} 
              onKeyDown={handleKeyDown}
            />
            <button className="btn acc" id="cwSend" onClick={handleSend} style={{ width: '100%' }}>Kirim pesan</button>
            <a id="chatWa" className="cw-wa" href={`https://wa.me/${adminWa}`} target="_blank" rel="noopener noreferrer">atau chat lewat WhatsApp</a>
          </div>
        </div>
      )}
    </>
  );
}
