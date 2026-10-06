'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  useEffect(() => {
    // Canvas background logic ported from vanilla JS
    const cv = document.getElementById('lbg') as HTMLCanvasElement;
    if (!cv) return;
    
    let lbgRaf: number;
    const ctx = cv.getContext('2d')!;
    let W = 0, H = 0;
    const m = { x: -9999, y: -9999 };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const host = cv.parentElement!;

    function size() {
      const r = host.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t: number) {
      if (!document.body.contains(cv)) return;
      const gap = 26, cols = Math.ceil(W / gap) + 2, rows = Math.ceil(H / gap) + 2;
      ctx.clearRect(0, 0, W, H);
      const tt = reduce ? 0 : t / 1000;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const bx = i * gap - gap / 2, by = j * gap - gap / 2;
          const wave = Math.sin(bx * 0.012 + tt * 0.9) * Math.cos(by * 0.011 - tt * 0.7);
          let x = bx + Math.sin(tt + j * 0.35) * 3, y = by + Math.cos(tt * 0.8 + i * 0.3) * 3;
          const dx = x - m.x, dy = y - m.y, d = Math.hypot(dx, dy);
          const R = 170;
          let k = 0;
          if (d < R) {
            k = (1 - d / R);
            x += dx / d * k * 22;
            y += dy / d * k * 22;
          }
          const r = 1.1 + ((wave + 1) / 2) * 1.6 + k * 2.2;
          const a = 0.16 + ((wave + 1) / 2) * 0.28 + k * 0.5;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = k > 0.35 ? `rgba(233,183,154,${Math.min(1, a)})` : `rgba(201,185,166,${a})`;
          ctx.fill();
        }
      }
      
      ctx.strokeStyle = 'rgba(233,183,154,0.10)';
      ctx.lineWidth = 1;
      for (let l = 0; l < 4; l++) {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 8) {
          const y = H * (0.25 + l * 0.18) + Math.sin(x * 0.008 + tt * 0.6 + l) * 26 + Math.cos(x * 0.02 - tt * 0.4) * 8;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      if (!reduce) lbgRaf = requestAnimationFrame(draw);
    }
    
    size();
    
    const handleMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      m.x = e.clientX - r.left;
      m.y = e.clientY - r.top;
      if (reduce) draw(0);
    };
    
    const handleLeave = () => {
      m.x = -9999; m.y = -9999;
      if (reduce) draw(0);
    };
    
    host.addEventListener('pointermove', handleMove);
    host.addEventListener('pointerleave', handleLeave);
    window.addEventListener('resize', size);
    
    if (reduce) draw(0);
    else lbgRaf = requestAnimationFrame(draw);
    
    document.body.classList.add('is-login');

    return () => {
      if (lbgRaf) cancelAnimationFrame(lbgRaf);
      host.removeEventListener('pointermove', handleMove);
      host.removeEventListener('pointerleave', handleLeave);
      window.removeEventListener('resize', size);
      document.body.classList.remove('is-login');
    };
  }, []);

  return (
    <div className="auth" style={{ minHeight: '100vh', display: 'flex' }}>
      <div className="side" style={{ flex: 1, position: 'relative', background: '#D3C6B5' }}>
        <img src="/images/landing_2.jpeg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <img className="logo" src="/images/landing_0.png" alt="Fabiebsky" style={{ position: 'absolute', top: 32, left: 32, height: 40 }} />
      </div>
      
      {/* Required style overrides for auth layout since globals.css might not have them if they were dynamically injected */}
      <style dangerouslySetInnerHTML={{ __html: `
        .auth { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
        .auth .side { position: relative; background: var(--taupe2); overflow: hidden; }
        .auth .side>img:first-child { width: 100%; height: 100%; object-fit: cover; }
        .auth .logo { position: absolute; top: 32px; left: 32px; height: 32px; width: auto; z-index: 2; filter: drop-shadow(0 2px 8px rgba(42,33,25,0.25)); }
        .auth .panel { position: relative; display: flex; align-items: center; justify-content: center; background: var(--ink); color: var(--cream); padding: 24px; overflow: hidden; }
        .auth canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.8; }
        .auth .box { position: relative; z-index: 10; width: 100%; max-width: 380px; display: flex; flex-direction: column; gap: 32px; }
        .auth .card { background: var(--cream); color: var(--ink); padding: 32px 24px; border-radius: 16px; display: flex; flex-direction: column; gap: 16px; box-shadow: 0 16px 48px rgba(0,0,0,0.3); border: none; }
        .auth .or { text-align: center; font-size: 12px; color: var(--muted); position: relative; }
        .auth .or::before, .auth .or::after { content: ""; position: absolute; top: 50%; width: 40%; height: 1px; background: var(--line); }
        .auth .or::before { left: 0; } .auth .or::after { right: 0; }
        .auth .alt { display: flex; justify-content: flex-end; font-size: 13px; gap: 4px; }
        .auth .alt button { color: var(--acc); font-weight: 700; }
        .auth .alt button:hover { text-decoration: underline; }
        @media(max-width:900px){ .auth { grid-template-columns: 1fr; } .auth .side { display: none; } }
      `}} />

      <div className="panel" style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#2A2119', padding: 24 }}>
        <canvas id="lbg" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.8 }}></canvas>
        <div className="box" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'center' }}>
            <h2 style={{ fontSize: 32, color: '#F4EFE7', fontFamily: "'Playfair Display', serif" }}>Selamat datang di Fabiebsky</h2>
            <p style={{ color: '#C9B9A6', fontSize: 14 }}>Daftar untuk membuat akun baru.</p>
          </div>
          
          <form id="authForm" className="card" noValidate>
            <h2 style={{ fontSize: 24, margin: 0, fontFamily: "'Playfair Display', serif" }}>Daftar</h2>
            
            <div className="field" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="r-name" style={{ fontSize: 13, fontWeight: 700 }}>Nama Lengkap</label>
              <input id="r-name" type="text" placeholder="John Doe" style={{ padding: '12px 14px', borderRadius: 6, border: '1px solid #DCD2C4', background: '#FFFDF9', minHeight: 44, color: '#2A2119' }} />
            </div>

            <div className="field" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="r-email" style={{ fontSize: 13, fontWeight: 700 }}>Email</label>
              <input id="r-email" type="email" placeholder="johndoe@email.com" style={{ padding: '12px 14px', borderRadius: 6, border: '1px solid #DCD2C4', background: '#FFFDF9', minHeight: 44, color: '#2A2119' }} />
            </div>
            
            <div className="field" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label htmlFor="r-pw" style={{ fontSize: 13, fontWeight: 700 }}>Password</label>
              <input id="r-pw" type="password" placeholder="••••••••" style={{ padding: '12px 14px', borderRadius: 6, border: '1px solid #DCD2C4', background: '#FFFDF9', minHeight: 44, color: '#2A2119' }} />
            </div>
            
            <Link href="/" style={{ width: '100%', marginTop: 8 }}>
              <button type="button" className="btn acc" style={{ width: '100%', padding: '14px 24px', borderRadius: 6, background: '#B5563A', color: '#fff', border: 'none', fontWeight: 700, minHeight: 44 }}>Daftar</button>
            </Link>
            
            <div className="or">atau</div>
            
            <Link href="/" style={{ width: '100%' }}>
              <button type="button" className="btn ghost" style={{ width: '100%', padding: '14px 24px', borderRadius: 6, background: '#fff', border: '1px solid #DCD2C4', color: '#2A2119', fontWeight: 600, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
                Daftar dengan Google
              </button>
            </Link>
            
            <div className="alt" style={{ justifyContent: 'center', marginTop: 8 }}>
              Sudah punya akun? 
              <Link href="/login">
                <button type="button">Masuk</button>
              </Link>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}
