import React from 'react';

export default function MainView() {
  return <div dangerouslySetInnerHTML={{ __html: `


<style id="glass-theme">
/* ===== Glass design (eksperimen) ===== */
:root{--glass:rgba(255,253,249,.58);--glass-strong:rgba(255,253,249,.78);--glass-dark:rgba(42,33,25,.80);--glass-line:rgba(255,255,255,.55);--glass-line-dark:rgba(255,255,255,.12);--glass-blur:16px;--glass-shadow:0 10px 30px rgba(42,33,25,.10),inset 0 1px 0 rgba(255,255,255,.6)}
/* latar ambient supaya blur terasa */
body::before{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;background:
  radial-gradient(900px 520px at 8% -10%,rgba(181,86,58,.16),transparent 60%),
  radial-gradient(700px 480px at 100% 12%,rgba(201,185,166,.55),transparent 60%),
  radial-gradient(760px 600px at 50% 110%,rgba(240,220,205,.75),transparent 60%),
  var(--cream)}
body{background:transparent}
/* header & nav */
header{background:var(--glass-dark);backdrop-filter:blur(var(--glass-blur)) saturate(160%);-webkit-backdrop-filter:blur(var(--glass-blur)) saturate(160%);border-bottom:1px solid var(--glass-line-dark);box-shadow:0 8px 30px rgba(42,33,25,.18)}
nav .dd-menu,.catdd .menu,.adm .menu{background:var(--glass-strong);backdrop-filter:blur(20px) saturate(160%);-webkit-backdrop-filter:blur(20px) saturate(160%);border-color:var(--glass-line);box-shadow:0 18px 44px rgba(42,33,25,.20),inset 0 1px 0 rgba(255,255,255,.7)}
nav .dd-search{background:rgba(255,255,255,.45)}
.mobnav{background:var(--glass-dark);backdrop-filter:blur(var(--glass-blur)) saturate(160%);-webkit-backdrop-filter:blur(var(--glass-blur)) saturate(160%);border-top-color:var(--glass-line-dark)}
.lockbar{background:rgba(245,230,198,.72);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.5)}
/* kartu */
.card{background:var(--glass);backdrop-filter:blur(var(--glass-blur)) saturate(140%);-webkit-backdrop-filter:blur(var(--glass-blur)) saturate(140%);border:1px solid var(--glass-line);box-shadow:var(--glass-shadow)}
.brandcard.dark,.counter,.tokenbox{background:var(--glass-dark);backdrop-filter:blur(var(--glass-blur)) saturate(160%);-webkit-backdrop-filter:blur(var(--glass-blur)) saturate(160%);border:1px solid var(--glass-line-dark);box-shadow:0 18px 44px rgba(42,33,25,.22),inset 0 1px 0 rgba(255,255,255,.08)}
.brandcard.dark::before,.counter::before,.tokenbox::before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(135deg,rgba(255,255,255,.10),transparent 45%)}
.brandcard.dark,.counter,.tokenbox{position:relative;overflow:hidden}
.tokenbox input{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.18)}
.hero .img .tag{background:var(--glass-strong);backdrop-filter:blur(14px) saturate(150%);-webkit-backdrop-filter:blur(14px) saturate(150%);border:1px solid var(--glass-line);box-shadow:0 10px 30px rgba(42,33,25,.22)}
.steps .ico{background:rgba(240,220,205,.7);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.6)}
.pc .photo::after{background:rgba(42,33,25,.55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.18)}
.pill{backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.photo{box-shadow:inset 0 0 0 1px rgba(255,255,255,.35)}
/* kontrol */
.btn.ghost{background:rgba(255,255,255,.35);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-color:rgba(42,33,25,.55)}
.btn.ghost:hover{background:rgba(255,255,255,.6)}
.chip,.sizes button,.radio,.kat-search,.field input,.field select,.field textarea,.toolbar select,.icon-btn,.cpy{background:rgba(255,255,255,.5);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.chip.on,.sizes button.on{background:var(--ink)}
.tabs{border-bottom-color:rgba(42,33,25,.15)}
.stock{background:var(--glass)}
.archive button{backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
.archive .sold{background:rgba(230,224,216,.7)}.archive .locked,.archive .pending{background:rgba(245,230,198,.75)}
.callout{backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.5)}
.callout.warn{background:rgba(245,230,198,.7)}.callout.acc{background:rgba(240,220,205,.7)}.callout.ok{background:rgba(220,235,221,.7)}
.receipt .top{background:var(--glass-dark);backdrop-filter:blur(var(--glass-blur));-webkit-backdrop-filter:blur(var(--glass-blur))}
.receipt{overflow:hidden}
/* overlay & popup */
#lb,#rb{background:rgba(42,33,25,.55);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
#lb .in,#rb .in{background:var(--glass-strong);backdrop-filter:blur(24px) saturate(160%);-webkit-backdrop-filter:blur(24px) saturate(160%);border:1px solid var(--glass-line)}
#lb .x,#rb .x{background:rgba(255,255,255,.6);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
#chatBox{background:var(--glass-strong);backdrop-filter:blur(22px) saturate(160%);-webkit-backdrop-filter:blur(22px) saturate(160%);border:1px solid var(--glass-line);box-shadow:0 20px 50px rgba(42,33,25,.26),inset 0 1px 0 rgba(255,255,255,.7)}
#chatBox .hd{background:var(--glass-dark);backdrop-filter:blur(var(--glass-blur));-webkit-backdrop-filter:blur(var(--glass-blur));border-bottom:1px solid var(--glass-line-dark)}
#chatBox .cw-list{display:flex;flex-direction:column;gap:10px;max-height:300px;min-height:120px;overflow-y:auto;padding:6px}
#chatBox .cw-m{padding:9px 12px;border-radius:12px;font-size:13px;line-height:1.45;white-space:pre-wrap;overflow-wrap:anywhere}
#chatBox .cw-m.admin{border-bottom-left-radius:4px}
#chatBox .cw-m small{display:block;font-size:10px;margin-top:3px}
#chatBox .cw-g{display:grid;grid-template-columns:1fr 1fr;gap:8px}#chatBox .cw-g[hidden]{display:none}
#chatBox .cw-g input{width:100%;min-width:0;padding:9px 10px;border-radius:8px;font-size:13px}
#chatBox .cw-wa{font-size:12px;color:var(--muted);text-align:center;text-decoration:underline}
#chatBox .cw-row{display:flex;flex-direction:column;gap:3px;max-width:88%}
#chatBox .cw-row.admin{align-self:flex-start;align-items:flex-start}
#chatBox .cw-row.user{align-self:flex-end;align-items:flex-end}
#chatBox .cw-who{font-size:10px;letter-spacing:.08em;text-transform:uppercase;font-weight:700;color:var(--muted);padding:0 4px}
#chatBox .cw-row.user .cw-who{color:var(--acc)}
#chatBox .cw-m{max-width:none;color:var(--ink)}
#chatBox .cw-m.admin,#chatBox .bubble{background:#fff;border:1px solid rgba(42,33,25,.12);box-shadow:0 2px 8px rgba(42,33,25,.06)}
#chatBox .cw-m.user{background:var(--acc-soft);color:var(--ink);border:1px solid rgba(181,86,58,.35);border-bottom-right-radius:4px;box-shadow:0 2px 8px rgba(181,86,58,.10)}
#chatBox .cw-m small{opacity:.6}
#chatBox .cw-m.user small{text-align:right}
#chatBox textarea,#chatBox .cw-g input{background:rgba(255,255,255,.55);border:1px solid rgba(42,33,25,.18)}
#chatTease{background:var(--glass-strong);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid var(--glass-line)}
#chatFab{background:rgba(181,86,58,.86);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.35)}
#chatFab:hover{background:rgba(156,72,48,.92)}
#toast{background:rgba(42,33,25,.78);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid var(--glass-line-dark)}
/* auth */
.auth .box .card{background:rgba(255,253,249,.88);backdrop-filter:blur(24px) saturate(160%);-webkit-backdrop-filter:blur(24px) saturate(160%);border:1px solid var(--glass-line)}
/* footer */
footer{background:var(--glass-dark);backdrop-filter:blur(var(--glass-blur)) saturate(160%);-webkit-backdrop-filter:blur(var(--glass-blur)) saturate(160%);border-top:1px solid var(--glass-line-dark)}
.akun-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
@media(max-width:560px){.akun-grid{grid-template-columns:1fr}}
.akun-item{display:grid;grid-template-columns:40px minmax(0,1fr);gap:12px;align-items:center;padding:14px 16px;border:1px solid var(--line);border-radius:10px;background:rgba(255,255,255,.55)}
.akun-item.wide{grid-column:1/-1}
.akun-item .ic{width:40px;height:40px;border-radius:10px;background:var(--acc-soft);color:var(--acc);display:inline-flex;align-items:center;justify-content:center}
.akun-item .ic svg{width:18px;height:18px}
.logout-link{display:inline-flex;align-items:center;gap:8px;padding:8px 4px;min-height:44px;font-weight:700;font-size:14px;color:var(--acc);background:none;border:none;border-radius:6px;transition:color .15s,opacity .15s}
.logout-link svg{width:18px;height:18px}
.logout-link:hover{color:#9c4830;text-decoration:underline;text-underline-offset:4px}
/* hover: warna lebih gelap (taupe), konsisten di semua kartu & item interaktif */
:root{--hover:#fff;--hover-line:rgba(42,33,25,.10)}
.pc{padding:10px;margin:-10px;border-radius:14px;background:transparent;transition:background .25s ease,box-shadow .25s ease,transform .25s ease}
.pc .photo{transition:box-shadow .25s ease,transform .25s ease}
.pc:hover,.pc:focus-visible{background:var(--hover);box-shadow:0 18px 40px rgba(42,33,25,.16);transform:translateY(-4px)}
.pc:hover .photo,.pc:focus-visible .photo,.grid.hl .pc:hover .photo{box-shadow:0 0 0 1px rgba(42,33,25,.08);transform:none}
.pc:hover .photo img.main{transform:scale(1.05)}
.pc .photo::after{left:50%;right:auto;bottom:16px;width:max-content;white-space:nowrap;transform:translate(-50%,8px);padding:10px 18px;font-size:14px;font-weight:800;letter-spacing:.03em;background:rgba(255,255,255,.55);color:var(--ink);border:1px solid rgba(255,255,255,.9);box-shadow:0 10px 26px rgba(42,33,25,.28),inset 0 1px 0 rgba(255,255,255,.9);backdrop-filter:blur(14px) saturate(160%);-webkit-backdrop-filter:blur(14px) saturate(160%);text-shadow:0 1px 0 rgba(255,255,255,.7)}
.pc:hover .photo::after,.pc:focus-visible .photo::after{transform:translate(-50%,0)}
.pc .photo::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(to top,rgba(42,33,25,.35),rgba(42,33,25,0) 45%);opacity:0;transition:opacity .25s;pointer-events:none}
.pc:hover .photo::before,.pc:focus-visible .photo::before{opacity:1}
.pc.sold:hover{opacity:.85}
/* foto kategori di kartu brand */
.brandcard button.photo{transition:transform .25s ease,box-shadow .25s ease}
.brandcard button.photo{overflow:hidden}
.brandcard button.photo img{transition:transform .5s ease}
.brandcard button.photo:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(42,33,25,.22)}
.brandcard button.photo:hover img{transform:scale(1.04)}
/* item daftar, menu, dan tombol kecil */
.orow:hover,.catdd .opt:hover,nav .dd-menu button:hover{background:var(--hover);box-shadow:0 8px 20px rgba(42,33,25,.10)}
.acc-item .acc-h{border-radius:8px;padding-inline:12px;margin-inline:-12px;width:calc(100% + 24px);transition:background .2s ease}
.acc-item .acc-h:hover{background:#fff;box-shadow:none}
.chip:hover,.sizes button:not(.on):not(:disabled):hover,.radio:hover,.icon-btn:hover,.cpy:hover,.btn.ghost:hover,.kat-search:hover,.toolbar select:hover{background:var(--hover);border-color:rgba(42,33,25,.4);box-shadow:0 8px 20px rgba(42,33,25,.12)}
.archive button:hover{transform:translateY(-2px);box-shadow:0 0 0 2px var(--hover),0 8px 18px rgba(42,33,25,.16)}
.chip,.sizes button,.radio,.icon-btn,.cpy,.btn.ghost,.archive button{transition:background .2s ease,box-shadow .2s ease,border-color .2s ease,transform .2s ease}
nav button:hover,.cartbtn:hover{background:rgba(255,255,255,.22)}
footer .col button{transition:color .15s,opacity .15s}footer .col button:hover{color:#E9B79A;text-decoration:underline;text-underline-offset:4px}
.brandcard.dark .btn.light:hover{background:var(--hover)}
@media(prefers-reduced-motion:reduce){.pc:hover,.brandcard button.photo:hover,.archive button:hover{transform:none}}
/* item dropdown: hover kontras (gelap) */
nav .dd-menu button,.catdd .opt{transition:background .15s ease,color .15s ease,box-shadow .15s ease}
nav .dd-menu button:hover,nav .dd-menu button:focus-visible,.catdd .opt:hover,.catdd .opt:focus-visible{background:var(--ink);color:var(--cream);box-shadow:0 8px 20px rgba(42,33,25,.25)}
nav .dd-menu button:hover span,nav .dd-menu button:focus-visible span,.catdd .opt:hover small,.catdd .opt:focus-visible small{color:var(--sand)}
nav .dd-menu button.on:hover{color:#E9B79A}
.catdd .opt:hover .ic{background:var(--acc);color:#fff}
nav .dd-sug button:not(.all):hover .code{color:var(--sand)}
/* dropdown lebih jelas: panel lebih pekat, teks lebih kontras */
nav .dd-menu,.catdd .menu{background:rgba(255,253,249,.96);backdrop-filter:blur(24px) saturate(140%);-webkit-backdrop-filter:blur(24px) saturate(140%);border:1px solid rgba(42,33,25,.12);box-shadow:0 20px 50px rgba(42,33,25,.28),0 2px 6px rgba(42,33,25,.10)}
nav .dd-menu{min-width:300px}
nav .dd-menu button{font-size:17px;padding:12px 14px;color:var(--ink)}
nav .dd-menu button span{font-size:13px;color:var(--ink2);font-weight:500;opacity:.85}
nav .dd-menu button.on{color:var(--acc)}
nav .dd-search{background:rgba(255,255,255,.9);border-color:rgba(42,33,25,.18)}
nav .dd-search input{font-weight:600}
nav .dd-sug .none{color:var(--ink2)}
.catdd .opt b{color:var(--ink)}.catdd .opt small{color:var(--ink2);opacity:.85}
/* label 'Lihat detail' & gradasi dihapus: hover kartu sudah cukup */
.pc .photo::after,.pc .photo::before{display:none!important;content:none}
/* tombol ukuran: oranye */
.sizes button{border-color:rgba(181,86,58,.35);color:var(--ink)}
.sizes button.on{background:var(--acc);border-color:var(--acc);color:#fff;box-shadow:0 6px 16px rgba(181,86,58,.30)}
.sizes button:not(.on):not(:disabled):hover{background:var(--acc-soft);border-color:var(--acc);color:var(--acc);box-shadow:0 6px 16px rgba(181,86,58,.18)}
.sizes button.on:hover{background:#9c4830;border-color:#9c4830}
.sizes button:disabled{opacity:.45}
/* ikon fitur "Kenapa Fabiebsky": hover */
.steps .ico{transition:background .25s ease,color .25s ease,transform .25s ease,box-shadow .25s ease;cursor:default}
.steps .ico svg{transition:transform .25s ease}
.steps>div:hover .ico,.steps .ico:hover{background:var(--acc);color:#fff;transform:translateY(-3px) scale(1.06);box-shadow:0 10px 22px rgba(181,86,58,.32)}
.steps>div:hover .ico svg,.steps .ico:hover svg{transform:scale(1.1)}
@media(prefers-reduced-motion:reduce){.steps>div:hover .ico,.steps .ico:hover{transform:none}.steps>div:hover .ico svg{transform:none}}
/* tombol utama form login/daftar/lupa password: oranye */
#authForm .btn:not(.ghost){background:var(--acc);border-color:var(--acc);color:#fff;box-shadow:0 8px 20px rgba(181,86,58,.28)}
#authForm .btn:not(.ghost):hover{background:#9c4830;border-color:#9c4830}
/* tanpa nomor di foto (katalog & halaman produk) */
.photo .n{display:none!important}
.dthumb{cursor:pointer;border:2px solid transparent;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease}
.dthumb:hover,.dthumb.on{border-color:var(--acc);transform:translateY(-2px);box-shadow:0 8px 18px rgba(42,33,25,.18)}
.dthumb img{transition:transform .3s ease}.dthumb:hover img{transform:scale(1.06)}
.dmain{display:block;width:100%;border-radius:8px;overflow:hidden;transition:transform .25s ease,box-shadow .25s ease}
.dmain:hover{transform:translateY(-3px);box-shadow:0 18px 40px rgba(42,33,25,.2)}
.dmain .photo img.main{transition:transform .5s ease}.dmain:hover .photo img.main{transform:scale(1.03)}
.dmain::after{content:"Klik untuk perbesar";position:absolute;left:50%;bottom:14px;transform:translate(-50%,6px);padding:8px 14px;border-radius:999px;font-size:12px;font-weight:700;background:rgba(255,255,255,.6);color:var(--ink);border:1px solid rgba(255,255,255,.9);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);opacity:0;transition:opacity .25s,transform .25s;pointer-events:none;white-space:nowrap}
.dmain{position:relative}.dmain:hover::after{opacity:1;transform:translate(-50%,0)}
/* fallback tanpa backdrop-filter: pakai warna lebih pekat */
@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){
  header,footer,.mobnav,.brandcard.dark,.counter,.tokenbox,#chatBox .hd,.receipt .top{background:rgba(42,33,25,.96)}
  .card,.hero .img .tag,nav .dd-menu,.catdd .menu,#chatBox,#chatTease,#lb .in,#rb .in,.auth .box .card{background:rgba(255,253,249,.96)}
}
</style>


<div class="lockbar" id="lockbar" hidden><div class="wrap"></div></div>
<main id="view" class="wrap"></main>


<div id="lb" hidden role="dialog" aria-modal="true" aria-label="Preview produk" data-act="lbClose"><div class="in" data-stop="1"><button class="x" data-act="lbClose" aria-label="Tutup">✕</button><div class="im"><img id="lb-img" src="" alt=""></div><div class="tx"><span class="label" id="lb-cat"></span><h3 id="lb-name"></h3><div class="code" id="lb-code" style="font-size:18px"></div><div id="lb-pill"></div><div style="display:flex;gap:16px;font-size:13px;color:var(--muted)"><span>Ukuran <b style="color:var(--ink)" id="lb-size"></b></span><span>Harga <b style="color:var(--ink)" class="num" id="lb-price"></b></span></div></div></div></div>
<div id="rb" hidden role="dialog" aria-modal="true" aria-label="Receipt" data-act="rbClose"><div class="in" data-stop="1"><button class="x" data-act="rbClose" aria-label="Tutup">✕</button><div id="rb-body"></div></div></div>
<div id="toast" role="status" aria-live="polite"></div>
<div id="chatBox" hidden role="dialog" aria-label="Chat admin">
  <div class="hd"><div class="av"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z"/></svg></div><div style="flex:1"><b>Admin Fabiebsky</b><small>Biasanya balas dalam beberapa menit</small></div><button data-act="chatToggle" aria-label="Tutup" style="color:var(--sand);font-size:20px;min-width:32px">×</button></div>
  <div class="bd">
    <div class="cw-list" id="cwList"><div class="cw-m admin">Halo! Ada yang bisa dibantu soal order atau ukuran?</div></div>
    <div class="cw-g" id="cwGuest" hidden><input id="cwNama" placeholder="Nama kamu" autocomplete="name"><input id="cwWa" placeholder="No WA (opsional)" inputmode="numeric" autocomplete="tel"></div>
    <textarea id="chatMsg" placeholder="Tulis pesan untuk admin (Enter untuk kirim)"></textarea>
    <button class="btn acc" id="cwSend" data-act="chatSend">Kirim pesan</button>
    <a id="chatWa" class="cw-wa" href="#" target="_blank" rel="noopener">atau chat lewat WhatsApp</a>
  </div>
</div>

` }} />;
}
