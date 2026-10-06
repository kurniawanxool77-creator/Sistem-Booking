
/* ================= DATA ================= */
const LOCK_MS = 15*60*1000;
const ADMIN_WA='6281234567890'; // ganti dengan nomor WA admin asli (format internasional tanpa +)
const CATS = [
  {id:'kmj', brand:'fab', name:'Kemeja', prefix:'FAB-KMJ', max:100, price:329000, names:['Oversized Shirt · Off White','Boxy Shirt · Sand','Linen Shirt · Ink']},
  {id:'pnt', brand:'fab', name:'Pants', prefix:'FAB-PNT', max:100, price:359000, names:['Wide Pants · Charcoal','Wide Pants · Sand','Cargo Pants · Olive']},
  {id:'cur', brand:'cur', name:'Curated Drop 01', prefix:'CUR', max:45, price:0, names:['Bugs Bunny Knit · Blue','Dino Player Knit · Green','Panda Knit · Black','Cable Knit · Navy','Colorblock Wool · Navy Grey Maroon']},
];
const BRAND = {fab:{name:'fabiebsky',tag:'Produk sendiri · 100 pcs / kategori'}, cur:{name:'fabiebsky.curated',tag:'Thrift · one only one'}};
const SIZES = ['S','M','L','XL'];
// deterministic pseudo random
function rnd(seed){let x=Math.sin(seed*9301+49297)*233280;return x-Math.floor(x);}
function seedItems(){
  const items=[]; const now=Date.now();
  CATS.forEach(c=>{
    // sold count per category (example data)
    const soldN = c.id==='kmj'?61: c.id==='pnt'?19: 41;
    for(let n=1;n<=c.max;n++){
      const code = `${c.prefix}-${String(n).padStart(3,'0')}`;
      const r=rnd(n*7+c.id.length);
      const it={id:code, code, cat:c.id, brand:c.brand, seq:n, name:c.id==='cur'?c.names[n%c.names.length]:c.names[Math.floor(r*c.names.length)], size:c.id==='cur'?'All Size':SIZES[Math.floor(r*4)],
        price: c.price || Math.round((150000+r*450000)/1000)*1000, status:'available', lock:null, orderId:null, token:tok(code), soldAt:null};
      if(n<=soldN){it.status='sold'; it.soldAt=now-(soldN-n)*86400000*0.6; it.orderId='FB-'+String(230000+n*13).slice(-6);}
      else if(n===soldN+1){it.status='locked'; it.lock={by:'other', until: now+ (5+Math.floor(r*8))*60000};}
      items.push(it);
    }
  });
  return items;
}
function tok(code){let h=0;for(const ch of code)h=(h*31+ch.charCodeAt(0))>>>0;return (h.toString(16)+'a91f7c3e0c4d').slice(0,4)+'…'+(h*7).toString(16).slice(-4);}
const fmt=n=>'Rp '+n.toLocaleString('id-ID');
const mmss=ms=>{ms=Math.max(0,ms);const m=Math.floor(ms/60000),s=Math.floor(ms%60000/1000);return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;};
const dt=ts=>new Date(ts).toLocaleString('id-ID',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});

/* ================= STATE ================= */
let S;
const LOGO_SRC=document.querySelector('header img').getAttribute('src');
const SAMPLE_AKUN={nama:'Ferdinand',username:'Admin',email:'ferdinand@email.com',wa:'081234567890',kota:'Bandung',alamat:'Jl. Contoh No. 12, Kel. Contoh, Kec. Contoh',kode:'FB-USR-1024',updated:0};
const DISC_DEMO={'FAB-KMJ-062':259000,'FAB-KMJ-063':279000,'FAB-KMJ-064':249000,'FAB-PNT-021':299000}; // contoh product diskon (prototype)
function warnaDemo(){ (S&&S.items||[]).forEach(i=>{ if(!i.warna){ const m=String(i.name).split(' · '); if(m.length>1) i.warna=m[m.length-1]; } }); }
function discDemo(){ if(!S||!S.items) return; Object.entries(DISC_DEMO).forEach(([id,p])=>{ const i=S.items.find(x=>x.id===id); if(!i) return; /* diskon berlaku per produk (semua potong dengan nama & ukuran sama), seperti di CMS */ S.items.filter(x=>x.cat===i.cat&&x.name===i.name&&x.size===i.size&&x.status!=='sold').forEach(x=>{ if(!x.priceOld){ x.priceOld=x.price; } x.price=p; }); }); }
function load(){
  try{const raw=localStorage.getItem('fab_v4'); if(raw){S=JSON.parse(raw); if(S.items && S.items.length){ if(!S.accounts) S.accounts=[Object.assign({},SAMPLE_AKUN,{password:'fabiebsky'})]; if(S.guest===undefined) S.guest=false; if(!S.authView) S.authView='login'; S.items.forEach(i=>{if(i.cat==='cur'&&i.size==='L')i.size='All Size';}); discDemo(); warnaDemo(); return;}}}catch(e){}
  S={items:seedItems(), cart:[], orders:[], route:{name:'home'}, cat:'kmj', sort:'seq', showSold:true, filterStatus:'all', akun:null, guest:false, accounts:[Object.assign({},SAMPLE_AKUN,{password:'fabiebsky'})], authView:'login'};
  discDemo(); warnaDemo();
}
function save(){try{localStorage.setItem('fab_v4',JSON.stringify(S));}catch(e){}}
const byId=id=>S.items.find(i=>i.id===id);
const catOf=it=>CATS.find(c=>c.id===it.cat);

/* ================= ENGINE ================= */
function tick(){
  const now=Date.now(); let changed=false;
  S.items.forEach(it=>{
    if(it.status==='locked' && it.lock && it.lock.until<=now){
      const wasOther=it.lock.by==='other'; it.status='available';it.lock=null;changed=true;
      // demo: pembeli lain kadang mengunci ulang item yang baru dilepas
      if(wasOther && rnd(it.seq+now%97)>0.5){it.status='locked';it.lock={by:'other',until:now+(4+Math.floor(rnd(it.seq)*9))*60000};}
    }
  });
  S.orders.forEach(o=>{
    if(o.status==='pending' && o.expires<=now){o.status='expired'; o.items.forEach(id=>{const it=byId(id); if(it&&it.status==='pending'){it.status='available';it.lock=null;it.orderId=null;}}); changed=true;
      if(S.route.name==='pay'&&S.route.id===o.id){toast('Waktu bayar habis, item dilepas kembali.'); go({name:'cek',code:o.id});}}
  });
  if(changed){save(); render();} else updateTimers();
}
function myLock(){return S.items.filter(i=>i.status==='locked'&&i.lock&&i.lock.by==='me');}
function pendingOrder(){return S.orders.find(o=>o.status==='pending');}
function updateTimers(){
  const now=Date.now();
  document.querySelectorAll('[data-until]').forEach(el=>{el.textContent=mmss(+el.dataset.until-now);});
  const mine=myLock(); const po=pendingOrder(); const bar=document.getElementById('lockbar');
  if(po){bar.hidden=false; bar.querySelector('.wrap').innerHTML=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg> Order <span class="code">${po.id}</span> menunggu pembayaran · sisa <b class="num" data-until="${po.expires}">${mmss(po.expires-now)}</b> <button class="btn sm acc" data-go="pay" data-id="${po.id}" style="margin-left:auto">Bayar sekarang</button>`;}
  else bar.hidden=true;
  document.getElementById('cartCount').textContent=S.cart.length;
}
function releaseMine(){myLock().forEach(it=>{it.status='available';it.lock=null;});}
function lockForMe(ids){
  const now=Date.now(); const ok=[],fail=[];
  ids.forEach(id=>{const it=byId(id); if(it&&it.status==='available'){it.status='locked';it.lock={by:'me',until:now+LOCK_MS};ok.push(id);}else fail.push(id);});
  return {ok,fail};
}
function chatDefault(){const po=S.orders&&S.orders[0]; const who=S.akun?S.akun.nama:'';return `Halo admin Fabiebsky${who?', saya '+who:''}. ${po?'Saya mau tanya soal order '+po.id+'.':'Saya mau tanya soal produk.'}`;}
const escH=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function chatMsgs(){ if(!S.chat) S.chat={msgs:[],nama:'',wa:''}; return S.chat; }
function renderChat(){ const c=chatMsgs(), list=document.getElementById('cwList'); const fmtT=t=>new Date(t).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
  const me=S.akun?escH(S.akun.nama.split(' ')[0]):(c.nama?escH(c.nama.split(' ')[0]):'Kamu');
  const row=(from,html,t)=>`<div class="cw-row ${from}"><span class="cw-who">${from==='admin'?'Admin Fabiebsky':me}</span><div class="cw-m ${from}">${html}${t?`<small>${fmtT(t)}</small>`:''}</div></div>`;
  list.innerHTML=row('admin',`Halo${S.akun?' '+escH(S.akun.nama.split(' ')[0]):(c.nama?' '+escH(c.nama.split(' ')[0]):'')}! Ada yang bisa dibantu soal order atau ukuran?`)+c.msgs.map(m=>row(m.from==='admin'?'admin':'user',escH(m.text),m.at)).join('');
  list.scrollTop=list.scrollHeight; document.getElementById('cwGuest').hidden=!!(S.akun||c.msgs.length);
  document.getElementById('chatWa').href='https://wa.me/'+ADMIN_WA+'?text='+encodeURIComponent(chatDefault()); }
function prepChat(){ renderChat(); }
function chatSend(){ const ta=document.getElementById('chatMsg'); const body=(ta.value||'').trim(); if(!body) return; const c=chatMsgs();
  if(!S.akun&&!c.msgs.length){ const nama=(document.getElementById('cwNama').value||'').trim(), wa=(document.getElementById('cwWa').value||'').trim(); if(nama.length<2){toast('Isi nama kamu dulu'); document.getElementById('cwNama').focus(); return;} if(wa&&!/^08\d{8,12}$/.test(wa)){toast('Format WA 08xxxxxxxxxx'); document.getElementById('cwWa').focus(); return;} c.nama=nama; c.wa=wa; }
  const now=Date.now(); c.msgs.push({from:'user',text:body,at:now}); ta.value=''; save(); renderChat();
  const po=(S.orders||[])[0]; const reply=/ukuran|size/i.test(body)?'Ukuran mengikuti fisik tiap item. Cek "Ukuran & fit" di halaman produk, atau sebutkan kode itemnya biar kami bantu.':po?`Siap, kami cek pesanan ${po.id} dulu ya. Mohon tunggu sebentar.`:'Terima kasih, pesan kamu sudah kami terima. Admin akan balas segera.';
  setTimeout(()=>{ chatMsgs().msgs.push({from:'admin',text:reply,at:Date.now()}); save(); if(!document.getElementById('chatBox').hidden) renderChat(); else toast('Admin membalas chat kamu'); },1500); }
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2600);}

/* ================= ROUTER ================= */
function sibs(i){return S.items.filter(x=>x.cat===i.cat&&x.name===i.name&&x.size===i.size&&x.status==='available').sort((a,b)=>a.seq-b.seq);}
function stockOf(i){return sibs(i).length;} /* stok dari CMS: jumlah potong tersedia di nama+ukuran ini */
function qmax(i){return Math.max(1,Math.min(100,stockOf(i)));}
function qtyOf(i){const q=S.qty&&S.qty[i.id]; return Math.min(qmax(i),Math.max(1,parseInt(q)||1));}
function setQty(id,v){const it=byId(id); v=Math.min(qmax(it),Math.max(1,parseInt(v)||1)); S.qty=S.qty||{}; S.qty[id]=v; save(); render();}
function pickN(i,n){const xs=sibs(i); const ids=xs.map(x=>x.id); if(i.status==='available'){const k=ids.indexOf(i.id); if(k>0){ids.splice(k,1); ids.unshift(i.id);} } return ids.slice(0,n);}
function grpCart(rows){const m=new Map(); rows.forEach(i=>{const k=i.cat+'|'+i.name+'|'+i.size; if(!m.has(k))m.set(k,{it:i,ids:[],n:0,sum:0}); const g=m.get(k); g.ids.push(i.id); g.n++; g.sum+=i.price;}); return [...m.values()];}
function go(route){if(route&&route.name==='token')route={name:'home'}; S.route=route;save();render();window.scrollTo({top:0});}
(()=>{const inp=document.getElementById('nav-q'); if(!inp)return; inp.addEventListener('input',navSug); inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault(); const q=inp.value.trim(); if(!q)return; go({name:'katalog',brand:S.route.brand||'fab',q}); inp.blur(); inp.value=''; navSug();} if(e.key==='Escape'){inp.value='';navSug();inp.blur();}}); inp.addEventListener('click',e=>e.stopPropagation());})();
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const lb=document.getElementById('lb'); if(lb&&!lb.hidden)act('lbClose',{}); const rb=document.getElementById('rb'); if(rb&&!rb.hidden)act('rbClose',{}); const dd=document.getElementById('catdd'); if(dd)dd.classList.remove('open');}});
document.addEventListener('click',e=>{
  const dd=document.getElementById('catdd'); if(dd&&dd.classList.contains('open')&&!e.target.closest('#catdd .catbtn')){dd.classList.remove('open');}
  const a0=e.target.closest('[data-act="copy"]'); if(a0){e.preventDefault();e.stopPropagation();act('copy',a0.dataset);return;}
  const g=e.target.closest('[data-go]'); if(g){const r={name:g.dataset.go}; if(r.name==='akun'&&!S.akun){r.name='login';} if(g.dataset.brand){r.brand=g.dataset.brand;} if(g.dataset.id)r.id=g.dataset.id; if(g.dataset.cat){S.cat=g.dataset.cat;} if(g.dataset.code)r.code=g.dataset.code; if(g.dataset.q)r.q=g.dataset.q; go(r); return;}
  const a=e.target.closest('[data-act]'); if(a){ if(/Close$/.test(a.dataset.act)&&e.target.closest('[data-stop]')&&!e.target.closest('button'))return; act.el=a; act(a.dataset.act,a.dataset); }
});

/* ================= ACTIONS ================= */
function act(name,d){ const el=act.el; act.el=null;
  const it=d.id?byId(d.id):null;
  switch(name){
    case 'rmCartGrp': { const it=byId(d.id); const ids=S.items.filter(x=>x.cat===it.cat&&x.name===it.name&&x.size===it.size).map(x=>x.id); S.cart=S.cart.filter(x=>!ids.includes(x)); toast('Dikeluarkan dari keranjang'); save(); render(); break; }
    case 'qtyDec': setQty(d.id,qtyOf(byId(d.id))-1); break;
    case 'qtyInc': setQty(d.id,qtyOf(byId(d.id))+1); break;
    case 'addCart': { const it=byId(d.id); const ids=pickN(it,qtyOf(it)).filter(x=>!S.cart.includes(x)); if(ids.length){S.cart.push(...ids);toast(`${ids.length} pcs ${it.name} masuk keranjang`);} else toast('Sudah ada di keranjang'); save(); render(); break; }
    case 'rmCart': S.cart=S.cart.filter(x=>x!==d.id); save(); render(); break;
    case 'clearCart': S.cart=[]; save(); render(); toast('Keranjang dikosongkan'); break;
    case 'buyNow': { releaseMine(); const it=byId(d.id); const r=lockForMe(pickN(it,qtyOf(it))); if(r.ok.length){toast('Item dikunci untukmu 15 menit'); go({name:'checkout'});} else {toast('Item sudah diambil orang lain'); render();} break; }
    case 'checkoutCart': { releaseMine(); const r=lockForMe(S.cart); if(!r.ok.length){toast('Tidak ada item yang bisa di-checkout'); render(); break;} S.cart=S.cart.filter(id=>!r.fail.length||!r.fail.includes(id)); if(r.fail.length) toast(`${r.fail.length} item dikeluarkan (sudah diambil/sold)`); go({name:'checkout'}); break; }
    case 'releaseAll': releaseMine(); save(); toast('Lock dilepas'); render(); break;
    case 'createOrder': createOrder(); break;
    case 'pay': payOrder(d.id, d.result); break;
    case 'cancelOrder': { const o=S.orders.find(o=>o.id===d.id); if(o&&o.status==='pending'){o.status='cancelled'; o.items.forEach(id=>{const x=byId(id); if(x){x.status='available';x.lock=null;x.orderId=null;}}); save(); toast('Order dibatalkan'); go({name:'cek',code:o.id});} break; }
    case 'admin': { const o=S.orders.find(o=>o.id===d.id); if(!o) break; if(d.to==='shipped'){o.status='shipped';o.resi='JNE'+String(Date.now()).slice(-10);o.shippedAt=Date.now();} if(d.to==='completed'){o.status='completed';o.completedAt=Date.now();} save(); render(); break; }
    case 'findOrder': findOrder(); break;
    case 'akunEdit': S.akunEdit=true; save(); render(); break;
    case 'akunCancel': S.akunEdit=false; save(); render(); break;
    case 'akunSave': saveAkun(); break;
    case 'logout': S.akun=null; S.guest=false; S.akunEdit=false; S.authView='login'; save(); toast('Kamu sudah logout'); go({name:'login'}); break;
    case 'authView': S.authView=d.v; S.authMsg=null; S.forgotStep=0; S.forgotId=null; save(); render(); break;
    case 'doLogin': doLogin(); break;
    case 'doRegister': doRegister(); break;
    case 'doForgot': doForgot(); break;
    case 'chatToggle': { const box=document.getElementById('chatBox'); const fab=document.getElementById('chatFab'); box.hidden=!box.hidden; fab.classList.toggle('open',!box.hidden); fab.setAttribute('aria-expanded',String(!box.hidden)); fab.querySelector('.lbl').textContent=box.hidden?'Chat admin':'Tutup'; document.getElementById('chatTease').hidden=true; try{sessionStorage.setItem('fab_tease','1');}catch(e){} if(!box.hidden){prepChat(); setTimeout(()=>document.getElementById('chatMsg').focus(),50);} break; }
    case 'chatTeaseClose': document.getElementById('chatTease').hidden=true; try{sessionStorage.setItem('fab_tease','1');}catch(e){} break;
    case 'chatSend': chatSend(); break;
    case 'chatCopy': { const m=document.getElementById('chatMsg').value.trim()||chatDefault(); act('copy',{v:'WA admin +'+ADMIN_WA+'\n'+m}); break; }
    case 'guest': S.guest=true; S.akun=null; save(); toast('Masuk sebagai tamu'); go({name:'home'}); break;
    case 'setSort': S.sort=d.v; save(); render(); break;
    case 'toggleSold': S.showSold=!S.showSold; save(); render(); break;
    case 'filter': S.filterStatus=d.v; save(); render(); break;
    case 'reset': try{localStorage.removeItem('fab_v4');}catch(e){} load(); save(); render(); toast('Data contoh di-reset'); break;
    case 'dthumb': {const src=d.src; if(!src)break; const main=document.querySelector('.dmain .photo img.main')||document.querySelector('.dmain .photo img'); if(main){main.src=src;} document.querySelectorAll('.dthumb').forEach(t=>t.classList.toggle('on',t===el)); break;}
    case 'lbOpen': {const i=byId(d.id); if(!i)return; const c=CATS.find(x=>x.id===i.cat)||{}; const q=id=>document.getElementById(id); const cur=el&&el.classList.contains('dmain')?(el.querySelector('img.main')||el.querySelector('img')):null; q('lb-img').src=(cur&&cur.src)||imgFor(i)||''; q('lb-img').alt=i.name; q('lb-cat').textContent=(c.brand==='cur'?'fabiebsky.curated':'fabiebsky')+' · '+(c.name||''); q('lb-name').textContent=i.name; q('lb-code').textContent=i.code; q('lb-pill').innerHTML=pill(i); q('lb-size').textContent=i.size||'-'; q('lb-price').textContent=fmt(i.price); q('lb').hidden=false; document.body.style.overflow='hidden'; break;}
    case 'rbOpen': {const o=S.orders.find(x=>x.id===d.id); if(!o)return; document.getElementById('rb-body').innerHTML=receipt(o)+`<div class="ft"><button class="btn sm ghost" data-act="copy" data-v="${o.id}">${svgCopy}Salin kode transaksi</button><button class="btn sm" data-act="rbClose">Tutup</button></div>`; document.getElementById('rb').hidden=false; document.body.style.overflow='hidden'; break;}
    case 'rbClose': document.getElementById('rb').hidden=true; document.body.style.overflow=''; break;
    case 'cbToggle': {const dd=document.getElementById('catdd'); dd.classList.toggle('open'); dd.querySelector('.catbtn').setAttribute('aria-expanded',dd.classList.contains('open')); break;}
    case 'cbPick': S.cat=d.cat; go({name:'katalog',brand:d.brand}); break;
    case 'accToggle': {const it=el&&el.closest('.acc-item'); if(!it)return; const open=it.classList.toggle('open'); it.querySelector('.acc-h').setAttribute('aria-expanded',open); break;}
    case 'lbClose': document.getElementById('lb').hidden=true; document.body.style.overflow=''; break;
    case 'pickSize': {const t=byId(d.id); if(!t){toast('Ukuran itu sedang kosong');break;} go({name:'detail',id:t.id}); toast('Pindah ke item '+t.code+' · ukuran '+t.size); break;}
    case 'copy': navigator.clipboard.writeText(d.v).then(()=>toast('Kode disalin')).catch(()=>{toast('Salin manual: '+d.v);}); break;
  }
}
function createOrder(){
  const f=id=>document.getElementById(id);
  const vals={nama:f('f-nama').value.trim(), wa:f('f-wa').value.trim(), alamat:f('f-alamat').value.trim(), kota:f('f-kota').value.trim(), prov:f('f-prov').value};
  let bad=false;
  [['nama',vals.nama.length>=3],['wa',/^08\d{8,12}$/.test(vals.wa)],['alamat',vals.alamat.length>=10],['prov',!!vals.prov],['kota',vals.kota.length>=3]].forEach(([k,ok])=>{f('f-'+k).closest('.field').classList.toggle('invalid',!ok); if(!ok)bad=true;});
  if(bad){toast('Lengkapi data yang ditandai');return;}
  const kurir=document.querySelector('input[name=kurir]:checked').value; const ongkir={'JNE REG':22000,'J&T Express':20000,'SiCepat HALU':28000}[kurir];
  const bayar=document.querySelector('input[name=bayar]:checked').value;
  const mine=myLock(); if(!mine.length){toast('Tidak ada item terkunci. Mulai lagi dari katalog.'); go({name:'katalog',brand:'fab'}); return;}
  const id='FB-'+new Date().toISOString().slice(2,10).replace(/-/g,'')+'-'+String(Math.floor(1000+Math.random()*9000));
  const sub=mine.reduce((a,i)=>a+i.price,0);
  const o={id, status:'pending', created:Date.now(), expires:mine[0].lock.until, items:mine.map(i=>i.id), guest:vals, kurir, ongkir, bayar, sub, total:sub+ongkir};
  mine.forEach(i=>{i.status='pending'; i.orderId=id;});
  S.orders.unshift(o); S.cart=S.cart.filter(x=>!o.items.includes(x)); save(); go({name:'pay',id});
}
function payOrder(id,result){
  const o=S.orders.find(o=>o.id===id); if(!o||o.status!=='pending')return;
  if(result==='fail'){toast('Pembayaran gagal (simulasi). Coba metode lain selama lock aktif.'); return;}
  o.status='paid'; o.paidAt=Date.now(); o.items.forEach(x=>{const it=byId(x); it.status='sold'; it.lock=null; it.soldAt=o.paidAt;}); save(); toast('Pembayaran berhasil'); go({name:'cek',code:id,justPaid:true});
}
function findOrder(){
  const code=document.getElementById('q-kode').value.trim().toUpperCase(); const wa=document.getElementById('q-wa').value.trim();
  const o=S.orders.find(o=>o.id===code);
  if(!o){S.route={name:'cek',notFound:code||'(kosong)'}; render(); return;}
  if(wa && o.guest.wa!==wa){S.route={name:'cek',notFound:code,waMismatch:true}; render(); return;}
  go({name:'cek',code});
}

const WILAYAH={
"Aceh":["Banda Aceh","Langsa","Lhokseumawe","Sabang","Subulussalam","Aceh Barat","Aceh Barat Daya","Aceh Besar","Aceh Jaya","Aceh Selatan","Aceh Singkil","Aceh Tamiang","Aceh Tengah","Aceh Tenggara","Aceh Timur","Aceh Utara","Bener Meriah","Bireuen","Gayo Lues","Nagan Raya","Pidie","Pidie Jaya","Simeulue"],
"Sumatera Utara":["Medan","Binjai","Gunungsitoli","Padangsidimpuan","Pematangsiantar","Sibolga","Tanjungbalai","Tebing Tinggi","Asahan","Batu Bara","Dairi","Deli Serdang","Humbang Hasundutan","Karo","Labuhanbatu","Labuhanbatu Selatan","Labuhanbatu Utara","Langkat","Mandailing Natal","Nias","Nias Barat","Nias Selatan","Nias Utara","Padang Lawas","Padang Lawas Utara","Pakpak Bharat","Samosir","Serdang Bedagai","Simalungun","Tapanuli Selatan","Tapanuli Tengah","Tapanuli Utara","Toba"],
"Sumatera Barat":["Padang","Bukittinggi","Padang Panjang","Pariaman","Payakumbuh","Sawahlunto","Solok","Agam","Dharmasraya","Kepulauan Mentawai","Lima Puluh Kota","Padang Pariaman","Pasaman","Pasaman Barat","Pesisir Selatan","Sijunjung","Solok Selatan","Tanah Datar"],
"Riau":["Pekanbaru","Dumai","Bengkalis","Indragiri Hilir","Indragiri Hulu","Kampar","Kepulauan Meranti","Kuantan Singingi","Pelalawan","Rokan Hilir","Rokan Hulu","Siak"],
"Kepulauan Riau":["Batam","Tanjungpinang","Bintan","Karimun","Kepulauan Anambas","Lingga","Natuna"],
"Jambi":["Jambi","Sungai Penuh","Batanghari","Bungo","Kerinci","Merangin","Muaro Jambi","Sarolangun","Tanjung Jabung Barat","Tanjung Jabung Timur","Tebo"],
"Sumatera Selatan":["Palembang","Lubuklinggau","Pagar Alam","Prabumulih","Banyuasin","Empat Lawang","Lahat","Muara Enim","Musi Banyuasin","Musi Rawas","Musi Rawas Utara","Ogan Ilir","Ogan Komering Ilir","Ogan Komering Ulu","OKU Selatan","OKU Timur","Penukal Abab Lematang Ilir"],
"Bangka Belitung":["Pangkalpinang","Bangka","Bangka Barat","Bangka Selatan","Bangka Tengah","Belitung","Belitung Timur"],
"Bengkulu":["Bengkulu","Bengkulu Selatan","Bengkulu Tengah","Bengkulu Utara","Kaur","Kepahiang","Lebong","Mukomuko","Rejang Lebong","Seluma"],
"Lampung":["Bandar Lampung","Metro","Lampung Barat","Lampung Selatan","Lampung Tengah","Lampung Timur","Lampung Utara","Mesuji","Pesawaran","Pesisir Barat","Pringsewu","Tanggamus","Tulang Bawang","Tulang Bawang Barat","Way Kanan"],
"DKI Jakarta":["Jakarta Pusat","Jakarta Utara","Jakarta Barat","Jakarta Selatan","Jakarta Timur","Kepulauan Seribu"],
"Jawa Barat":["Bandung","Banjar","Bekasi","Bogor","Cimahi","Cirebon","Depok","Sukabumi","Tasikmalaya","Kab. Bandung","Bandung Barat","Kab. Bekasi","Kab. Bogor","Ciamis","Kab. Cirebon","Cianjur","Garut","Indramayu","Karawang","Kuningan","Majalengka","Pangandaran","Purwakarta","Subang","Kab. Sukabumi","Sumedang","Kab. Tasikmalaya"],
"Banten":["Serang","Cilegon","Tangerang","Tangerang Selatan","Lebak","Pandeglang","Kab. Serang","Kab. Tangerang"],
"Jawa Tengah":["Semarang","Magelang","Pekalongan","Salatiga","Surakarta (Solo)","Tegal","Banjarnegara","Banyumas","Batang","Blora","Boyolali","Brebes","Cilacap","Demak","Grobogan","Jepara","Karanganyar","Kebumen","Kendal","Klaten","Kudus","Kab. Magelang","Pati","Kab. Pekalongan","Pemalang","Purbalingga","Purworejo","Rembang","Kab. Semarang","Sragen","Sukoharjo","Kab. Tegal","Temanggung","Wonogiri","Wonosobo"],
"DI Yogyakarta":["Yogyakarta","Bantul","Gunungkidul","Kulon Progo","Sleman"],
"Jawa Timur":["Surabaya","Batu","Blitar","Kediri","Madiun","Malang","Mojokerto","Pasuruan","Probolinggo","Bangkalan","Banyuwangi","Kab. Blitar","Bojonegoro","Bondowoso","Gresik","Jember","Jombang","Kab. Kediri","Lamongan","Lumajang","Kab. Madiun","Magetan","Kab. Malang","Kab. Mojokerto","Nganjuk","Ngawi","Pacitan","Pamekasan","Kab. Pasuruan","Ponorogo","Kab. Probolinggo","Sampang","Sidoarjo","Situbondo","Sumenep","Trenggalek","Tuban","Tulungagung"],
"Bali":["Denpasar","Badung","Bangli","Buleleng","Gianyar","Jembrana","Karangasem","Klungkung","Tabanan"],
"Nusa Tenggara Barat":["Mataram","Bima","Kab. Bima","Dompu","Lombok Barat","Lombok Tengah","Lombok Timur","Lombok Utara","Sumbawa","Sumbawa Barat"],
"Nusa Tenggara Timur":["Kupang","Alor","Belu","Ende","Flores Timur","Kab. Kupang","Lembata","Malaka","Manggarai","Manggarai Barat","Manggarai Timur","Nagekeo","Ngada","Rote Ndao","Sabu Raijua","Sikka","Sumba Barat","Sumba Barat Daya","Sumba Tengah","Sumba Timur","Timor Tengah Selatan","Timor Tengah Utara"],
"Kalimantan Barat":["Pontianak","Singkawang","Bengkayang","Kapuas Hulu","Kayong Utara","Ketapang","Kubu Raya","Landak","Melawi","Mempawah","Sambas","Sanggau","Sekadau","Sintang"],
"Kalimantan Tengah":["Palangka Raya","Barito Selatan","Barito Timur","Barito Utara","Gunung Mas","Kapuas","Katingan","Kotawaringin Barat","Kotawaringin Timur","Lamandau","Murung Raya","Pulang Pisau","Seruyan","Sukamara"],
"Kalimantan Selatan":["Banjarmasin","Banjarbaru","Balangan","Banjar","Barito Kuala","Hulu Sungai Selatan","Hulu Sungai Tengah","Hulu Sungai Utara","Kotabaru","Tabalong","Tanah Bumbu","Tanah Laut","Tapin"],
"Kalimantan Timur":["Samarinda","Balikpapan","Bontang","Berau","Kutai Barat","Kutai Kartanegara","Kutai Timur","Mahakam Ulu","Paser","Penajam Paser Utara"],
"Kalimantan Utara":["Tarakan","Bulungan","Malinau","Nunukan","Tana Tidung"],
"Sulawesi Utara":["Manado","Bitung","Kotamobagu","Tomohon","Bolaang Mongondow","Bolaang Mongondow Selatan","Bolaang Mongondow Timur","Bolaang Mongondow Utara","Kepulauan Sangihe","Kepulauan Siau Tagulandang Biaro","Kepulauan Talaud","Minahasa","Minahasa Selatan","Minahasa Tenggara","Minahasa Utara"],
"Gorontalo":["Gorontalo","Boalemo","Bone Bolango","Kab. Gorontalo","Gorontalo Utara","Pohuwato"],
"Sulawesi Tengah":["Palu","Banggai","Banggai Kepulauan","Banggai Laut","Buol","Donggala","Morowali","Morowali Utara","Parigi Moutong","Poso","Sigi","Tojo Una-Una","Tolitoli"],
"Sulawesi Barat":["Mamuju","Majene","Mamasa","Mamuju Tengah","Pasangkayu","Polewali Mandar"],
"Sulawesi Selatan":["Makassar","Palopo","Parepare","Bantaeng","Barru","Bone","Bulukumba","Enrekang","Gowa","Jeneponto","Kepulauan Selayar","Luwu","Luwu Timur","Luwu Utara","Maros","Pangkajene dan Kepulauan","Pinrang","Sidenreng Rappang","Sinjai","Soppeng","Takalar","Tana Toraja","Toraja Utara","Wajo"],
"Sulawesi Tenggara":["Kendari","Baubau","Bombana","Buton","Buton Selatan","Buton Tengah","Buton Utara","Kolaka","Kolaka Timur","Kolaka Utara","Konawe","Konawe Kepulauan","Konawe Selatan","Konawe Utara","Muna","Muna Barat","Wakatobi"],
"Maluku":["Ambon","Tual","Buru","Buru Selatan","Kepulauan Aru","Kepulauan Tanimbar","Maluku Barat Daya","Maluku Tengah","Maluku Tenggara","Seram Bagian Barat","Seram Bagian Timur"],
"Maluku Utara":["Ternate","Tidore Kepulauan","Halmahera Barat","Halmahera Selatan","Halmahera Tengah","Halmahera Timur","Halmahera Utara","Kepulauan Sula","Pulau Morotai","Pulau Taliabu"],
"Papua":["Jayapura","Biak Numfor","Jayapura (Kab.)","Keerom","Kepulauan Yapen","Mamberamo Raya","Sarmi","Supiori","Waropen"],
"Papua Barat":["Manokwari","Fakfak","Kaimana","Manokwari Selatan","Pegunungan Arfak","Teluk Bintuni","Teluk Wondama"],
"Papua Barat Daya":["Sorong","Kab. Sorong","Maybrat","Raja Ampat","Sorong Selatan","Tambrauw"],
"Papua Tengah":["Nabire","Deiyai","Dogiyai","Intan Jaya","Mimika","Paniai","Puncak","Puncak Jaya"],
"Papua Pegunungan":["Jayawijaya","Lanny Jaya","Mamberamo Tengah","Nduga","Pegunungan Bintang","Tolikara","Yahukimo","Yalimo"],
"Papua Selatan":["Merauke","Asmat","Boven Digoel","Mappi"]
};
const PROVS=Object.keys(WILAYAH);
function provOf(kota){ if(!kota) return ''; const k=String(kota).toLowerCase(); for(const p of PROVS){ if(WILAYAH[p].some(c=>c.toLowerCase()===k)) return p; } return ''; }
function optsProv(sel){ return `<option value="">Pilih provinsi</option>`+PROVS.map(p=>`<option value="${p}" ${p===sel?'selected':''}>${p}</option>`).join(''); }
function optsKota(prov,sel){ const list=WILAYAH[prov]||[]; return `<option value="">${prov?'Pilih kota / kabupaten':'Pilih provinsi dulu'}</option>`+list.map(c=>`<option value="${c}" ${c===sel?'selected':''}>${c}</option>`).join(''); }
function wilSelects(idK,idP,kota,prov){ prov=prov||provOf(kota); return `<div class="field"><label for="${idP}">Provinsi</label><select id="${idP}" data-kota="${idK}">${optsProv(prov)}</select><span class="err">Pilih provinsi.</span></div><div class="field"><label for="${idK}">Kota / Kabupaten</label><select id="${idK}" ${prov?'':'disabled'}>${optsKota(prov,kota)}</select><span class="err">Pilih kota / kabupaten.</span></div>`; }
document.addEventListener('change',e=>{ const p=e.target; if(p.tagName==='SELECT'&&p.dataset.kota){ const k=document.getElementById(p.dataset.kota); if(k){ k.disabled=!p.value; k.innerHTML=optsKota(p.value,''); } } });
/* ================= VIEWS ================= */
const svgClock='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="flex-shrink:0;margin-top:2px"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const svgWA='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z"/></svg>';
function pill(it){const now=Date.now(); if(it.status==='available')return '<span class="pill available">Available</span>'; if(it.status==='sold')return '<span class="pill sold">Sold</span>'; if(it.status==='pending')return `<span class="pill pending">${it.orderId&&S.orders.find(o=>o.id===it.orderId)?'Menunggu bayar':'Locked'} · <span class="num" data-until="${S.orders.find(o=>o.id===it.orderId)?.expires||now}"></span></span>`; return `<span class="pill locked">${it.lock.by==='me'?'Di-hold untukmu':'Locked'} · <span class="num" data-until="${it.lock.until}">${mmss(it.lock.until-now)}</span></span>`;}
const IMGD={IMG_MAN:'/images/landing_2.jpeg',IMG_WOMAN:'/images/landing_3.jpeg',IMG_STAIRS_BOT:'/images/landing_4.jpeg',IMG_COUPLE:'/images/landing_5.jpeg',IMG_CAR:'/images/landing_6.jpeg',IMG_STAIRS_TOP:'/images/landing_7.jpeg'};
const CURD=['/images/landing_8.jpeg','/images/landing_9.jpeg','/images/landing_10.jpeg','/images/landing_11.jpeg','/images/landing_12.jpeg','/images/landing_13.jpeg','/images/landing_14.jpeg','/images/landing_15.jpeg','/images/landing_16.jpeg','/images/landing_17.jpeg'];
const IMG={kmj:[IMGD.IMG_MAN,IMGD.IMG_WOMAN,IMGD.IMG_STAIRS_BOT,IMGD.IMG_COUPLE],pnt:[IMGD.IMG_CAR,IMGD.IMG_STAIRS_TOP,IMGD.IMG_COUPLE],cur:[CURD[0],CURD[2],CURD[4],CURD[6],CURD[8]]};
const CUR_ALT=[CURD[1],CURD[3],CURD[5],CURD[7],CURD[9]];
function imgFor(it,alt){if(it.cat==='cur'){return (alt?CUR_ALT:IMG.cur)[it.seq%5];}const a=IMG[it.cat];return a?a[(it.seq+(alt?1:0))%a.length]:null;}
function photo(it,cls=''){const src=imgFor(it);const alt=imgFor(it,true);return `<div class="photo ${cls} ${it.seq%2?'':'alt'} ${src?'has-img':''}">${src?`<img class="main" src="${src}" alt="${it.name}" loading="lazy">${alt&&alt!==src?`<img class="alt" src="${alt}" alt="" loading="lazy">`:''}`:''}<span class="n">${String(it.seq).padStart(3,'0')}</span>${src?'':'[Foto '+it.name+']'}</div>`;}
function pcard(it){return `<button class="pc ${it.status} b-${it.brand}" data-go="detail" data-id="${it.id}">${photo(it)}${it.priceOld?`<span class="disc-badge">-${Math.round((1-it.price/it.priceOld)*100)}%</span>`:''}<div class="row"><span class="label">${BRAND[it.brand].name}</span>${it.status==='available'?'':pill(it)}</div><div class="name">${it.name}</div><div class="row"><span class="code">${it.code}</span><span class="price num ${it.priceOld?'disc':''}">${it.priceOld?`<s>${fmt(it.priceOld)}</s>`:''}<b>${fmt(it.price)}</b></span></div></button>`;}
function catStats(c){const xs=S.items.filter(i=>i.cat===c.id); const a=xs.filter(i=>i.status==='available').length, s=xs.filter(i=>i.status==='sold').length, l=xs.length-a-s; return {a,s,l,t:xs.length};}
function bar(st,dark){return `<div class="bar"><i class="s" style="width:${st.s/st.t*100}%"></i><i class="l" style="width:${st.l/st.t*100}%"></i><i class="a" style="width:${st.a/st.t*100}%"></i></div>`;}

function vHome(){
  const avail=[...S.items.filter(i=>i.status==='available')].sort((a,b)=>a.seq-b.seq);
  const firstPer=avail.filter((i,k,arr)=>arr.findIndex(x=>x.cat===i.cat)===k).sort((a,b)=>CATS.findIndex(c=>c.id===a.cat)-CATS.findIndex(c=>c.id===b.cat));
  const fresh=[...firstPer,...avail.filter(i=>!firstPer.includes(i))].slice(0,4);
  const cur=S.items.filter(i=>i.cat==='cur'); const cs=catStats(CATS.find(c=>c.id==='cur'));
  return `
  <section class="hero">
    <div class="txt">
      <h1>Wear it once,<br>own it <em style="color:var(--acc)">forever.</em></h1>
      <p style="color:var(--muted);font-size:17px;max-width:46ch">Koleksi terbatas buat kamu yang nggak mau kembaran. Tiap piece Fabiebsky cuma ada satu, satu pemilik, dan nggak bakal di-restock.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap"><button class="btn" data-go="katalog" data-brand="fab">Lihat koleksi fabiebsky</button><button class="btn ghost" data-go="katalog" data-brand="cur">Curated drop</button></div>
    </div>
    <div class="img"><img src="${IMGD.IMG_COUPLE}" alt="Lookbook Fabiebsky Drop 01">
    </div>
  </section>
  <section class="section"><div class="card" style="padding:40px;display:flex;flex-direction:column;gap:28px">
    <div class="sec-head"><div class="l"><span class="kicker">Kenapa Fabiebsky</span><h2>Yang kamu dapat di setiap piece</h2></div></div>
    <div class="steps points">
      <div><div class="top"><span class="ico" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.4 1.6 2.9-.2 1 2.7 2.4 1.7-.7 2.8.7 2.8-2.4 1.7-1 2.7-2.9-.2L12 21l-2.4-1.6-2.9.2-1-2.7-2.4-1.7.7-2.8-.7-2.8 2.4-1.7 1-2.7 2.9.2z"/><path d="M9 12l2 2 4-4"/></svg></span></div><b>Kualitas terjamin</b><p style="color:var(--muted)">Setiap item dicek satu per satu sebelum dijual. Bahan, jahitan, dan kondisi sesuai yang tampil di foto.</p></div>
      <div><div class="top"><span class="ico" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg></span></div><b>Admin siap respon</b><p style="color:var(--muted)">Ada pertanyaan soal ukuran, stok, atau status order? Chat admin langsung dari web, cukup sebutkan kode transaksimu.</p></div>
      <div><div class="top"><span class="ico" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1.4" fill="currentColor" stroke="none"/></svg></span></div><b>Product lock</b><p style="color:var(--muted)">Saat kamu checkout, item itu dikunci 15 menit khusus untukmu. Tidak ada yang bisa menyerobot sebelum kamu selesai bayar.</p></div>
      <div><div class="top"><span class="ico" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3l3 2 3-2 5 3-2 4-2-1v12H8V9L6 10 4 6z"/><path d="M12 12v4"/><path d="M10.5 13.5L12 12l1.5 1.5"/></svg></span></div><b>Only one</b><p style="color:var(--muted)">Satu item, satu pemilik. Begitu terjual, item itu tidak dibuat lagi dan tercatat atas nama kode transaksimu.</p></div>
    </div></div></section>
  <section class="section">
    <div class="sec-head"><div class="l"><span class="kicker">Dua pintu</span><h2>Pilih brand</h2></div></div>
    <div class="grid g2">
      <div class="card brandcard"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><h3>fabiebsky</h3></div>
        <button class="photo has-img brand-visual" data-go="katalog" data-brand="fab" style="aspect-ratio:16/10;flex-direction:column;align-items:flex-start;justify-content:flex-end;gap:2px"><img src="${IMGD.IMG_COUPLE}" alt="fabiebsky" loading="lazy"></button>
        <button class="btn" data-go="katalog" data-brand="fab" style="align-self:flex-start">Masuk katalog fabiebsky</button></div>
      <div class="card brandcard dark"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><h3>fabiebsky.curated</h3></div>
        ${(()=>{const i=cur[cs.s]||cur[0]||S.items.find(x=>x.brand==='cur'); return `<button class="photo has-img brand-visual" data-go="katalog" data-brand="cur" style="aspect-ratio:16/10;flex-direction:column;align-items:flex-start;justify-content:flex-end;gap:2px"><img src="${i?imgFor(i):''}" alt="fabiebsky.curated" loading="lazy"></button>`;})()}
        <button class="btn light" data-go="katalog" data-brand="cur" style="align-self:flex-start">Lihat curated drop</button></div>
    </div>
  </section>
  <section class="section">
    <div class="sec-head"><div class="l"><span class="kicker">Pilihan</span><h2>Baru masuk</h2></div><button class="link" data-go="katalog" data-brand="fab">Lihat semua</button></div>
    <div class="grid g4 hl">${fresh.map(pcard).join('')}</div>
  </section>
  <section class="section" style="align-items:center;text-align:center;gap:14px;padding-block:32px 16px">
    <span class="kicker">Fabiebsky</span><h2>Wear it once, own it forever</h2><p style="color:var(--muted);max-width:56ch">Fabiebsky untuk kemeja dan pants yang dibuat sendiri dalam jumlah terbatas. Fabiebsky.curated untuk thrift pilihan yang masing-masing cuma ada satu. Setiap piece dicek dulu kualitasnya, dan admin siap bantu soal ukuran atau pesananmu.</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center"><button class="btn" data-go="katalog" data-brand="fab">Lihat koleksi fabiebsky</button><button class="btn ghost" data-go="katalog" data-brand="cur">Curated drop</button></div>
  </section>`;
}
function searchItems(q){q=(q||'').trim().toLowerCase(); if(!q)return []; return S.items.filter(i=>i.name.toLowerCase().includes(q)||i.code.toLowerCase().includes(q)||String(i.seq)===q.replace(/^0+/,''));}
function navSug(){const inp=document.getElementById('nav-q'), box=document.getElementById('nav-sug'); if(!inp||!box)return; const q=inp.value; if(!q.trim()){box.innerHTML='';return;} const xs=searchItems(q); const top=[...xs].sort((a,b)=>(a.status==='available'?0:1)-(b.status==='available'?0:1)).slice(0,5);
  box.innerHTML=(top.length?top.map(i=>`<button role="menuitem" data-go="detail" data-id="${i.id}"><span class="ph">${imgFor(i)?`<img src="${imgFor(i)}" alt="">`:''}</span><span style="display:flex;flex-direction:column;gap:1px;min-width:0"><b style="font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${i.name}</b><span class="code">${i.code}</span></span>${pill(i)}</button>`).join(''):`<div class="none">Tidak ada yang cocok dengan “${q}”.</div>`)+(xs.length>5?`<button class="all" role="menuitem" data-go="katalog" data-brand="fab" data-q="${q.replace(/"/g,'&quot;')}"><b>Lihat semua ${xs.length} hasil →</b></button>`:'');}
function vKatalog(){
  const brand=S.route.brand||'fab'; let cat=CATS.find(c=>c.id===S.cat&&c.brand===brand)||CATS.find(c=>c.brand===brand); S.cat=cat.id;
  const st=catStats(cat);
  const q=(S.route.q||'').trim();
  let xs=q?searchItems(q):S.items.filter(i=>i.cat===cat.id);
  if(!S.showSold) xs=xs.filter(i=>i.status!=='sold');
  if(S.filterStatus!=='all') xs=xs.filter(i=>i.status===S.filterStatus);
  if(S.sort==='seqd') xs=[...xs].reverse(); if(S.sort==='pa') xs=[...xs].sort((a,b)=>a.price-b.price); if(S.sort==='pd') xs=[...xs].sort((a,b)=>b.price-a.price);
  return `<section class="section" style="gap:22px">
    <div class="kat-head">
    ${q?`<div style="display:flex;flex-direction:column;gap:6px"><span class="kicker">Hasil pencarian</span><h1 style="font-size:clamp(30px,4vw,44px)">“${q}”</h1><p style="color:var(--muted);font-size:14px">${xs.length} produk cocok dari fabiebsky &amp; fabiebsky.curated</p></div>`:`<div style="display:flex;flex-direction:column;gap:6px"><span class="kicker">Katalog</span><h1 style="font-size:clamp(30px,4vw,44px)">${BRAND[brand].name}</h1><p style="color:var(--muted);font-size:14px">${BRAND[brand].tag}</p></div>`}
      <form class="kat-search" data-brand="${brand}" role="search" onsubmit="return false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input id="kat-q" type="search" value="${q.replace(/"/g,'&quot;')}" placeholder="Cari nama, kode, atau nomor…" autocomplete="off" aria-label="Cari produk">${q?`<button type="button" data-go="katalog" data-brand="${brand}" aria-label="Hapus pencarian">✕</button>`:''}</form>
    </div>
    <div class="toolbar">
      ${q?'<span></span>':`<div class="catdd" id="catdd"><button class="catbtn" data-act="cbToggle" aria-haspopup="true" aria-expanded="false"><span class="lb">Kategori</span><span class="cur">${cat.name}</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button>
        <div class="menu" role="menu">${CATS.filter(c=>c.brand===brand).map(c=>{const st=catStats(c); const first=S.items.find(i=>i.cat===c.id); const im=first?imgFor(first):''; return `<button class="opt ${c.id===cat.id?'on':''}" role="menuitem" data-act="cbPick" data-brand="${brand}" data-cat="${c.id}"><div class="ic">${catIcon(c)}</div><div><b>${c.name}</b><small class="num">${st.a} dari ${st.t} item tersedia</small></div></button>`}).join('')}</div>
      </div>`}
      <label style="display:flex;gap:8px;align-items:center;font-size:13px;color:var(--muted)">Urutkan <select id="sort" aria-label="Urutkan"><option value="seq" ${S.sort==='seq'?'selected':''}>Terlama</option><option value="seqd" ${S.sort==='seqd'?'selected':''}>Terbaru</option><option value="pa" ${S.sort==='pa'?'selected':''}>Harga terendah</option><option value="pd" ${S.sort==='pd'?'selected':''}>Harga tertinggi</option></select></label>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;font-size:13px;color:var(--muted)"><span class="num">${q?`${xs.filter(i=>i.status==='available').length} dari ${xs.length} hasil masih tersedia`:`${cat.name} · ${st.a} dari ${st.t} item masih tersedia`}</span><label style="display:flex;align-items:center;gap:8px;min-height:44px"><input type="checkbox" id="showSold" ${S.showSold?'checked':''} style="width:16px;height:16px">Tampilkan yang sudah terjual</label></div>
    ${xs.length?`<div class="grid g4">${xs.map(pcard).join('')}</div>`:`<div class="empty card"><b>${q?'Tidak ada produk yang cocok.':'Semua item di kategori ini sudah terjual.'}</b>${q?'<span>Coba kata lain, misalnya "knit", "shirt", atau kode seperti FAB-KMJ-012.</span>':''}</div>`}
  </section>`;
}
function vDetail(){
  const it=byId(S.route.id); if(!it) return vKatalog(); const c=catOf(it); const st=catStats(c);
  const near=S.items.filter(i=>i.cat===it.cat&&Math.abs(i.seq-it.seq)<=2&&i.id!==it.id).slice(0,4);
  const canBuy=it.status==='available'; const mine=it.status==='locked'&&it.lock.by==='me'; const inCart=S.cart.includes(it.id)||sibs(it).some(x=>S.cart.includes(x.id));
  const statusTxt = it.status==='available'?`<span style="color:var(--ok);font-weight:700">Tersedia</span>`: it.status==='sold'?`<span style="color:var(--sold);font-weight:700">Sold · ${dt(it.soldAt)}</span>`: mine?`<span style="color:var(--lock);font-weight:700">Dikunci untukmu · sisa <span class="num" data-until="${it.lock.until}"></span></span>`:`<span style="color:var(--lock);font-weight:700">Di-hold orang lain · lepas dalam <span class="num" data-until="${it.lock?it.lock.until:(S.orders.find(o=>o.id===it.orderId)?.expires||Date.now())}"></span></span>`;
  return `<section class="section" style="gap:32px">
    <button class="link" data-go="katalog" data-brand="${it.brand}" data-cat="${c.id}" style="align-self:flex-start;display:inline-flex;align-items:center;gap:8px;font-size:13px;min-height:44px"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>Kembali ke ${c.name}</button>
    <div class="detail">
      <div style="display:grid;grid-template-columns:72px minmax(0,1fr);gap:12px"><div style="display:flex;flex-direction:column;gap:8px">${[1,2,3,4].map(n=>{let src=null;if(it.cat==='cur'){src=imgFor(it,n%2===1);}else{const a=IMG[it.cat];src=a?a[(it.seq+n)%a.length]:null;}return `<button class="photo dthumb ${n%2?'':'alt'} ${src?'has-img':''}" data-act="dthumb" data-src="${src||''}" style="aspect-ratio:1;padding:6px;font-size:10px" aria-label="Lihat foto ${n}">${src?`<img src="${src}" alt="" loading="lazy">`:n}</button>`}).join('')}</div><button class="dmain" data-act="lbOpen" data-id="${it.id}" aria-label="Perbesar foto" style="padding:0;text-align:left;cursor:zoom-in">${photo(it)}</button></div>
      <div class="info">
        <h1 style="font-size:clamp(28px,3.4vw,40px)">${it.name}</h1>
        <div style="display:flex;align-items:baseline;gap:14px;flex-wrap:wrap"><span class="code num" style="font-size:28px">${it.priceOld?`<s style="opacity:.5;font-size:18px;margin-right:10px">${fmt(it.priceOld)}</s>`:''}${fmt(it.price)}</span>${it.priceOld?`<span class="pill" style="background:#B5532E;color:#fff">Diskon ${Math.round((1-it.price/it.priceOld)*100)}%</span>`:''}<span style="font-size:13px;color:var(--muted)">Belum termasuk ongkir</span></div>
        <div class="card spec">
          <div><span class="label">Kategori produk</span><b style="font-size:16px">${c.name}</b></div>
          ${it.warna?`<div><span class="label">Warna</span><b style="font-size:16px">${it.warna}</b></div>`:''}
          <div><span class="label">Status</span><span style="font-size:13px">${statusTxt}</span></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px"><div style="display:flex;justify-content:space-between;font-size:13px"><b>Ukuran</b><span style="color:var(--muted)">Panduan ukuran</span></div><div class="sizes">${it.cat==='cur'?`<button class="on">All Size</button>`:SIZES.map(s=>{const alt=s===it.size?null:S.items.filter(x=>x.cat===it.cat&&x.name===it.name&&x.size===s&&x.status==='available').sort((a,b)=>a.seq-b.seq)[0]; return `<button class="${s===it.size?'on':''}" ${s===it.size?'':alt?`data-act="pickSize" data-id="${alt.id}" title="Pindah ke ${alt.code} (ukuran ${s})"`:'disabled aria-disabled="true" title="Ukuran '+s+' sedang kosong"'}>${s}</button>`}).join('')}</div><span style="font-size:12px;color:var(--muted)">${it.cat==='cur'?'Item curated hanya ada satu (one only one), All Size.':`Tiap item punya satu ukuran fisik. Klik ukuran lain untuk pindah ke ${it.name} yang tersedia di ukuran itu.`}</span></div>
        <div style="display:flex;flex-direction:column;gap:8px"><div style="display:flex;justify-content:space-between;font-size:13px"><b>QTY</b><span style="color:var(--muted)">Stok tersedia: <b class="num">${stockOf(it)}</b>${stockOf(it)>100?' · maks 100 per order':''}</span></div><div class="qty"><button type="button" data-act="qtyDec" data-id="${it.id}" aria-label="Kurangi" ${qtyOf(it)<=1?'disabled':''}>−</button><input id="qty-in" class="num" type="number" inputmode="numeric" min="1" max="100" value="${qtyOf(it)}" data-id="${it.id}" aria-label="Jumlah"><button type="button" data-act="qtyInc" data-id="${it.id}" aria-label="Tambah" ${qtyOf(it)>=qmax(it)?'disabled':''}>+</button></div></div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${mine?`<button class="btn" data-go="checkout">Lanjut checkout · sisa <span class="num" data-until="${it.lock.until}"></span></button>`:`<button class="btn" data-act="buyNow" data-id="${it.id}" ${canBuy?'':'disabled'}>${canBuy?'Beli sekarang':it.status==='sold'?'Sudah terjual':'Sedang di-hold orang lain'}</button>`}
          <button class="btn ghost" data-act="${inCart?'rmCartGrp':'addCart'}" data-id="${it.id}" ${it.status==='sold'?'disabled':''}>${inCart?'Hapus dari keranjang':'Tambah ke keranjang'}</button>
        </div>
        <div class="acc-list">
          ${[['Deskripsi',`[Deskripsi produk ${it.name}. Bahan, gramasi, cara rawat.]`],['Note',`[Catatan untuk ${it.name}. Item ini fisik ukuran ${it.size}.]`],['Pengiriman','Dikirim 1–2 hari kerja setelah status Paid. Kurir JNE, J&amp;T, SiCepat. Ongkir dihitung saat checkout.']].map(([t,b],i)=>`<div class="acc-item"><button class="acc-h" data-act="accToggle" aria-expanded="false"><span>${t}</span><span class="pm" aria-hidden="true"></span></button><div class="acc-b"><div><p>${b}</p></div></div></div>`).join('')}
        </div>
      </div>
    </div>
    ${near.length?`<div class="sec-head"><div class="l"><span class="kicker">Lainnya</span><h2>${c.name} lain di drop ini</h2></div><button class="link" data-go="katalog" data-brand="${it.brand}" data-cat="${c.id}">Semua ${c.name}</button></div><div class="grid g4">${near.map(pcard).join('')}</div>`:''}
  </section>`;
}
function vCart(){
  const rows=S.cart.map(byId).filter(Boolean); const ok=rows.filter(i=>i.status==='available'||(i.status==='locked'&&i.lock.by==='me'));
  const sub=ok.reduce((a,i)=>a+i.price,0);
  return `<section class="section"><div class="two">
    <div style="display:flex;flex-direction:column;gap:20px">
      <div class="sec-head"><div class="l"><span class="kicker">Keranjang guest</span><h1 style="font-size:40px">${rows.length} pcs</h1></div><span style="font-size:13px;color:var(--muted)">Disimpan di browser ini</span></div>
      ${rows.length?`<p style="font-size:13px;color:var(--muted)">Item baru dikunci untukmu saat checkout dimulai.</p>
      <div>${grpCart(rows).map(g=>{const i=g.it;const good=g.ids.map(byId).every(x=>x.status==='available'||(x.status==='locked'&&x.lock.by==='me'));return `<div class="cartrow ${good?'':'off'}">${photo(i)}<div style="display:flex;flex-direction:column;gap:4px;min-width:0"><span class="label">${BRAND[i.brand].name}</span><b>${i.name}</b><span style="font-size:13px;font-weight:700">Ukuran ${i.size}</span><span style="font-size:12px;color:var(--muted)">${g.n} pcs</span><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:4px">${pill(i)}<span style="font-size:12px;color:${good?'var(--muted)':'var(--acc)'}">${good?'Siap di-checkout':i.status==='sold'?'Sudah terjual. Akan dikeluarkan saat checkout.':'Di-hold orang lain. Akan dikeluarkan saat checkout.'}</span></div></div><div class="r"><b class="num">${fmt(g.sum)}</b><button class="icon-btn" data-act="rmCartGrp" data-id="${i.id}" aria-label="Hapus ${i.name}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg></button></div></div>`}).join('')}<div style="border-top:1px solid var(--line)"></div></div>
      <div style="display:flex;gap:12px;flex-wrap:wrap"><button class="btn ghost" data-go="katalog" data-brand="fab">Lanjut belanja</button></div>`
      :`<div class="empty card"><b>Keranjang masih kosong.</b><span>Pilih item yang kamu mau dari katalog.</span><button class="btn" data-go="katalog" data-brand="fab">Ke katalog</button></div>`}
    </div>
    <div class="card summary"><h2 style="font-size:22px">Ringkasan</h2>
      <div class="ln"><span style="color:var(--muted)">Subtotal (${ok.length} item bisa di-checkout)</span><b class="num">${fmt(sub)}</b></div>
      ${rows.length-ok.length?`<div class="ln"><span style="color:var(--muted)">${rows.length-ok.length} item Locked/Sold</span><span style="color:var(--acc)">tidak dihitung</span></div>`:''}
      <div class="ln"><span style="color:var(--muted)">Ongkir</span><span style="color:var(--muted)">dihitung di checkout</span></div>
      <div class="tot"><span style="font-weight:700">Estimasi total</span><b class="num">${fmt(sub)}</b></div>
      <button class="btn" data-act="checkoutCart" ${ok.length?'':'disabled'}>Checkout ${ok.length} item</button>
      <p style="font-size:12px;color:var(--muted)">Guest checkout tanpa akun. Kamu akan dapat kode transaksi untuk cek status dan tanya admin via WA.</p>
    </div>
  </div></section>`;
}
function vCheckout(){
  const mine=myLock(); if(!mine.length) return `<section class="section"><div class="empty card"><b>Tidak ada item yang sedang dikunci.</b><span>Lock 15 menit sudah habis atau belum dimulai. Pilih item lagi dari katalog.</span><button class="btn" data-go="katalog" data-brand="fab">Ke katalog</button></div></section>`;
  const sub=mine.reduce((a,i)=>a+i.price,0); const until=mine[0].lock.until;
  const g=(S.akun&&S.akun.nama)?S.akun:(S.orders[0]?.guest||{});
  return `<section class="section">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
      <button class="link" data-go="cart" style="display:inline-flex;align-items:center;gap:8px;padding:6px 0;min-height:44px;border-bottom:none"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg><span style="border-bottom:1px solid var(--ink)">Kembali</span></button>
      <div class="stepper"><span class="on"><i>1</i>Data pembeli</span><span class="on"><i>2</i>Pengiriman</span><span><i>3</i>Pembayaran</span><span><i>4</i>Selesai</span></div>
      <span class="pill locked" style="font-size:14px;padding:8px 14px">${mine.length} item dikunci untukmu · <span class="num" data-until="${until}">${mmss(until-Date.now())}</span></span>
    </div>
    <div class="two">
      <form class="form" id="coForm" novalidate>
        <div style="display:flex;flex-direction:column;gap:16px"><div style="display:flex;justify-content:space-between;align-items:baseline"><h2>1. Data pembeli</h2><span style="font-size:13px;color:var(--muted)">Guest · tanpa akun</span></div>
          <div class="grid g2" style="gap:14px"><div class="field"><label for="f-nama">Nama penerima</label><input id="f-nama" value="${g.nama||''}" placeholder="Nama lengkap" autocomplete="name"><span class="err">Minimal 3 huruf.</span></div><div class="field"><label for="f-wa">Nomor WhatsApp</label><input id="f-wa" value="${g.wa||''}" placeholder="08xxxxxxxxxx" inputmode="numeric" autocomplete="tel"><span class="err">Format 08xxxxxxxxxx. Dipakai untuk kode transaksi &amp; cek order.</span></div></div>
          <div class="field"><label for="f-alamat">Alamat lengkap</label><textarea id="f-alamat" rows="3" placeholder="Jalan, nomor, RT/RW, kelurahan, kecamatan" autocomplete="street-address">${g.alamat||''}</textarea><span class="err">Tulis alamat lengkap (min. 10 karakter).</span></div>
          <div class="grid g3" style="gap:14px">${wilSelects('f-kota','f-prov',g.kota||'',g.prov||'')}<div class="field"><label for="f-pos">Kode pos</label><input id="f-pos" placeholder="5 digit" inputmode="numeric"></div></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px"><h2>2. Pengiriman</h2>
          ${[['JNE REG','2–3 hari',22000,true],['J&T Express','2–4 hari',20000],['SiCepat HALU','1–2 hari',28000]].map(([n,e,p,c])=>`<label class="radio ${c?'on':''}"><span style="display:flex;gap:12px;align-items:center"><input type="radio" name="kurir" value="${n}" ${c?'checked':''}><span><b>${n}</b> · ${e}</span></span><b class="num">${fmt(p)}</b></label>`).join('')}
        </div>
        <div style="display:flex;flex-direction:column;gap:12px"><h2>3. Metode pembayaran</h2>
          <div class="grid g3" style="gap:10px">${[['VA','Virtual Account (BCA, Mandiri, BNI)'],['QRIS','QRIS',true],['E-wallet','E-wallet (GoPay, OVO, DANA)']].map(([v,n,c])=>`<label class="radio ${c?'on':''}"><span style="display:flex;gap:12px;align-items:center"><input type="radio" name="bayar" value="${v}" ${c?'checked':''}>${n}</span></label>`).join('')}</div>
          <span style="font-size:13px;color:var(--muted)">Status pembayaran dikonfirmasi otomatis lewat webhook gateway. Item jadi milikmu begitu status Paid.</span>
        </div>
      </form>
      <div class="card summary"><h2 style="font-size:22px">Ringkasan order</h2>
        ${grpCart(mine).map(g=>{const i=g.it;return `<div class="mini"><div class="ph ${i.seq%2?'':'alt'}"></div><div style="flex:1;display:flex;flex-direction:column;gap:2px;min-width:0"><b style="font-size:14px">${i.name}</b><span style="font-size:13px;color:var(--muted)">Ukuran ${i.size} · ${g.n} pcs</span></div><b class="num" style="font-size:14px">${fmt(g.sum)}</b></div>`}).join('')}
        <div class="ln" style="border-top:1px solid var(--line);padding-top:12px"><span style="color:var(--muted)">Subtotal</span><span class="num">${fmt(sub)}</span></div>
        <div class="ln"><span style="color:var(--muted)">Ongkir</span><span class="num" id="ongkirTxt">${fmt(22000)}</span></div>
        <div class="tot"><span style="font-weight:700">Total</span><b class="num" id="totalTxt">${fmt(sub+22000)}</b></div>
        <button class="btn" data-act="createOrder">Buat order &amp; bayar</button>
        
        <p style="font-size:12px;color:var(--muted)">Kode transaksi dibuat setelah tombol ini. Selesaikan pembayaran sebelum timer habis, kalau tidak item dilepas kembali.</p>
      </div>
    </div></section>`;
}
function vPay(){
  const o=S.orders.find(o=>o.id===S.route.id); if(!o) return vCek();
  if(o.status!=='pending') return vCek();
  return `<section class="section" style="align-items:center">
    <div class="stepper"><span class="on"><i>1</i>Data pembeli</span><span class="on"><i>2</i>Pengiriman</span><span class="on"><i>3</i>Pembayaran</span><span><i>4</i>Selesai</span></div>
    <div class="card receipt" style="width:100%">
      <div class="top"><div><span class="label" style="color:var(--sand)">Kode transaksi</span><div class="code" style="font-size:28px">${o.id}</div></div><span class="pill pending" style="font-size:14px;padding:8px 14px">Bayar dalam <span class="num" data-until="${o.expires}">${mmss(o.expires-Date.now())}</span></span></div>
      <div class="body">
        <div class="meta"><div><span style="color:var(--muted)">Metode</span><br><b>${o.bayar}</b></div><div><span style="color:var(--muted)">Total tagihan</span><br><b class="num">${fmt(o.total)}</b></div><div><span style="color:var(--muted)">Kirim ke</span><br><b>${o.guest.nama} · ${o.guest.wa}</b></div></div>
        <div style="background:var(--cream);border-radius:10px;padding:24px;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center">
          ${o.bayar==='QRIS'?`<div style="width:160px;height:160px;background:repeating-conic-gradient(var(--ink) 0 25%,var(--surf) 0 50%) 0 0/24px 24px;border:8px solid var(--surf);border-radius:6px"></div><span style="font-size:13px;color:var(--muted)">[QR contoh] Scan dengan aplikasi e-wallet / m-banking</span>`:o.bayar==='VA'?`<span class="label">Nomor Virtual Account</span><b class="code num" style="font-size:26px">8808 0${o.id.replace(/\D/g,'').slice(-9)}</b><button class="btn ghost sm" data-act="copy" data-v="88080${o.id.replace(/\D/g,'').slice(-9)}">Salin nomor VA</button>`:`<span class="label">E-wallet</span><span style="font-size:14px">Kamu akan diarahkan ke aplikasi e-wallet untuk konfirmasi.</span>`}
        </div>
        <div class="sim"><b>Simulasi gateway (prototype):</b><button class="btn sm acc" data-act="pay" data-id="${o.id}" data-result="paid">Webhook: Paid</button><button class="btn sm ghost" data-act="pay" data-id="${o.id}" data-result="fail">Webhook: Gagal</button><button class="btn sm ghost" data-act="cancelOrder" data-id="${o.id}">Batalkan order</button></div>
        <div class="callout warn">${svgClock}<span>Item tetap dikunci sampai timer habis. Kalau gagal, kamu bisa pilih metode lain selama lock aktif. Lewat 15 menit, order kadaluarsa dan item dilepas.</span></div>
      </div>
    </div></section>`;
}
function vSukses(){
  const o=S.orders.find(o=>o.id===S.route.id); if(!o) return vHome();
  return `<section class="section" style="align-items:center;text-align:center">
    <div style="width:64px;height:64px;border-radius:50%;background:var(--ok-soft);display:flex;align-items:center;justify-content:center"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg></div>
    <div style="display:flex;flex-direction:column;gap:8px"><h1 style="font-size:40px">Pembayaran berhasil</h1><p style="color:var(--muted)">Item sudah tercatat atas kode transaksimu. Receipt juga dikirim ke WhatsApp ${o.guest.wa}.</p></div>
    ${receipt(o)}
    <div class="callout acc" style="max-width:720px;width:100%;text-align:left">${svgWA}<span>Simpan kode transaksi <b class="code">${o.id}</b>. Tanpa akun, kode ini satu-satunya cara cek status dan tanya admin lewat WA.</span><button class="btn ghost sm" data-act="copy" data-v="${o.id}" style="margin-left:auto">Salin</button></div>
    <button class="link" data-go="home">Kembali ke beranda</button>
  </section>`;
}
function receipt(o){
  return `<div class="card receipt" style="width:100%;text-align:left">
    <div class="top"><div><span class="label" style="color:var(--sand)">Kode transaksi</span><div class="code" style="font-size:28px">${o.id}</div></div><img src="/images/landing_18.png" alt="Fabiebsky" style="height:32px;width:auto"></div>
    <div class="body">
      <div class="meta"><div><span style="color:var(--muted)">Status</span><br><b style="color:var(--ok)">Paid · ${dt(o.paidAt)}</b></div><div><span style="color:var(--muted)">Pembayaran</span><br><b>${o.bayar}</b></div><div><span style="color:var(--muted)">Kirim ke</span><br><b>${o.guest.nama} · ${o.guest.wa}</b><br><span style="font-size:12px;color:var(--muted)">${o.guest.alamat}, ${o.guest.kota}</span></div></div>
      <div style="border-top:1px solid var(--line)">${o.items.map(byId).map(i=>`<div class="line"><div style="display:flex;flex-direction:column;gap:2px;min-width:0"><b>${i.name}</b><span class="code" style="font-size:13px">${i.code}</span><span class="mono"><b style="color:var(--ok)">Sold → kamu</b></span></div><b class="num">${fmt(i.price)}</b></div>`).join('')}</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-size:14px"><div class="ln" style="display:flex;justify-content:space-between"><span style="color:var(--muted)">Subtotal</span><span class="num">${fmt(o.sub)}</span></div><div style="display:flex;justify-content:space-between"><span style="color:var(--muted)">Ongkir · ${o.kurir}</span><span class="num">${fmt(o.ongkir)}</span></div><div style="display:flex;justify-content:space-between;align-items:baseline"><b>Total dibayar</b><b class="code num" style="font-size:24px">${fmt(o.total)}</b></div></div>
    </div></div>`;
}
const CAT_ICON={
 kmj:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3l3 2 3-2 5 3-2 4-2-1v12H8V9L6 10 4 6z"/><path d="M9 3c0 2 1.5 3 3 3s3-1 3-3"/></svg>',
 pnt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l1 18h-5l-2-10-2 10H5z"/><path d="M6 7h12"/></svg>',
 cur:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4l-4 3 2 4 2-1v10h8V10l2 1 2-4-4-3"/><path d="M8 4c0 2 2 3 4 3s4-1 4-3"/><path d="M10 14h4"/></svg>'
};
function catIcon(c){return CAT_ICON[c.id]||CAT_ICON[c.brand==='cur'?'cur':'kmj'];}
const svgCopy='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';
function vCek(){
  if(!S.route.code && !S.route.notFound && S.orders.length){S.route.code=S.orders[0].id;}
  const o=S.route.code?S.orders.find(x=>x.id===S.route.code):null;
  const bought=S.orders.filter(x=>['paid','shipped','completed'].includes(x.status)).reduce((a,x)=>a+x.items.length,0);
  const steps=['pending','paid','shipped','completed']; const idx=o?steps.indexOf(o.status):-1;
  const stTxt={pending:'Menunggu pembayaran',paid:'Paid · sedang diproses',shipped:'Dikirim',completed:'Selesai',expired:'Kadaluarsa',cancelled:'Dibatalkan'};
  return `<section class="section"><div class="two cek">
    <div style="display:flex;flex-direction:column;gap:20px">
      <div style="display:flex;flex-direction:column;gap:8px"><span class="kicker">Cek status order</span><h1 style="font-size:36px">Order saya</h1><p style="color:var(--muted)">Semua produk yang sudah kamu beli tercatat di sini. Pilih order untuk melihat status dan detailnya.</p></div>
      ${S.orders.length?`<div class="card" style="padding:18px 20px;display:flex;flex-direction:column;gap:4px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap"><h2 style="font-size:20px">Riwayat order</h2><span style="font-size:12px;color:var(--muted)" class="num">${S.orders.length} order · ${bought} produk dibeli</span></div>
        <div class="olist">${S.orders.map(x=>{const on=o&&o.id===x.id;const st=x.status;const cls=st==='pending'?'pending':['paid','shipped','completed'].includes(st)?'available':'sold';return `<button class="orow ${on?'on':''}" data-go="cek" data-code="${x.id}"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><span style="display:inline-flex;align-items:center;gap:8px"><span class="code">${x.id}</span></span><span class="pill ${cls}">${stTxt[st]||st}</span></div><div style="display:flex;justify-content:space-between;gap:8px;font-size:12px;color:var(--muted)"><span>${dt(x.created)} · ${x.items.length} item</span><span class="num">${fmt(x.total)}</span></div><div style="font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${x.items.map(id=>byId(id)?.code||id).join(' · ')}</div></button>`}).join('')}</div>
      </div>`:`<div class="empty card"><b>Belum ada order.</b><span>Produk yang sudah dibayar akan muncul di sini.</span><button class="btn ghost sm" data-go="katalog" data-brand="fab">Ke katalog</button></div>`}
    </div>
    <div style="display:flex;flex-direction:column;gap:20px">
    ${o&&S.route.justPaid?`<div class="callout ok" style="align-items:center"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg><span><b>Pembayaran berhasil.</b> Produk ini sekarang milikmu dan tercatat di sini. Simpan kode transaksi <b class="code">${o.id}</b> untuk mengecek statusnya kapan saja.</span></div>`:''}
    ${o?`<div class="card" style="padding:26px 28px;display:flex;flex-direction:column;gap:22px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><div><span class="label">Kode transaksi</span><div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><div class="code" style="font-size:28px">${o.id}</div><button class="cpy" data-act="copy" data-v="${o.id}" title="Salin kode transaksi">${svgCopy}Salin kode</button></div><span style="font-size:12px;color:var(--muted)">Kirim kode ini ke admin kalau butuh bantuan.</span></div><span class="pill ${o.status==='pending'?'pending':o.status==='paid'||o.status==='shipped'||o.status==='completed'?'available':'sold'}" style="font-size:13px;padding:8px 14px">${stTxt[o.status]}</span></div>
      ${idx>=0?`<div class="tl">${[['Pending','Order dibuat '+dt(o.created)],['Paid',o.paidAt?'Webhook '+dt(o.paidAt):'Menunggu pembayaran'],['Shipped',o.shippedAt?dt(o.shippedAt)+' · '+o.resi:'Menunggu resi admin'],['Completed',o.completedAt?dt(o.completedAt):'—']].map(([t,s],i)=>`<div class="${i<idx||(i===idx&&o.status==='completed')?'done':i===idx?'cur':''}"><div class="dot"><i>${i<idx||o.status==='completed'?'✓':''}</i>${i<3?'<b></b>':''}</div><span class="t">${t}</span><span class="s">${s}</span></div>`).join('')}</div>`:`<div class="callout warn">${svgClock}<span>Order ini ${o.status==='expired'?'kadaluarsa karena tidak dibayar dalam 15 menit':'dibatalkan'}. Item sudah dilepas kembali ke katalog.</span></div>`}
      ${o.status==='pending'?`<div class="callout warn">${svgClock}<span>Sisa waktu bayar <b class="num" data-until="${o.expires}">${mmss(o.expires-Date.now())}</b>. Lewat itu item dilepas.</span><button class="btn sm acc" data-go="pay" data-id="${o.id}" style="margin-left:auto">Bayar sekarang</button></div>`:''}
      <div class="meta" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;font-size:13px;border-top:1px solid var(--line);padding-top:18px"><div><span style="color:var(--muted)">Penerima</span><br><b>${o.guest.nama} · ${o.guest.wa}</b></div><div><span style="color:var(--muted)">Kurir</span><br><b>${o.kurir}${o.resi?' · '+o.resi:' · resi menyusul'}</b></div><div><span style="color:var(--muted)">Total</span><br><b class="num">${fmt(o.total)} · ${o.bayar}</b></div></div>
      <div style="border-top:1px solid var(--line)">${o.items.map(byId).map(i=>`<div class="oi"><button class="ph" data-act="lbOpen" data-id="${i.id}" aria-label="Preview ${i.code}">${imgFor(i)?`<img src="${imgFor(i)}" alt="${i.name}">`:''}</button><div class="nm"><b>${i.name}</b><span class="code">${i.code}</span></div>${pill(i)}</div>`).join('')}</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${o.status!=='pending'&&o.paidAt?`<button class="btn ghost" data-act="rbOpen" data-id="${o.id}">Lihat receipt</button>`:''}
        ${o.resi?`<button class="btn ghost" data-act="copy" data-v="${o.resi}">Salin resi ${o.resi}</button>`:''}
      </div>
      ${o.status==='paid'||o.status==='shipped'?`<div class="sim"><b>Simulasi admin (prototype):</b>${o.status==='paid'?`<button class="btn sm ghost" data-act="admin" data-id="${o.id}" data-to="shipped">Input resi → Shipped</button>`:`<button class="btn sm ghost" data-act="admin" data-id="${o.id}" data-to="completed">Diterima → Completed</button>`}</div>`:''}
    </div>`:`<div class="empty card" style="min-height:280px;justify-content:center"><b>Hasil pencarian tampil di sini.</b><span>Masukkan kode transaksi di sebelah kiri. Coba checkout satu item dulu kalau belum punya kode.</span><button class="btn ghost sm" data-go="katalog" data-brand="fab">Ke katalog</button></div>`}
    </div>
  </div></section>`;
}
function doLogin(){
  // Prototype: tombol Masuk selalu berhasil, masuk sebagai akun contoh (atau akun yang cocok kalau ada)
  const f=id=>document.getElementById(id); const id=(f('l-id')?.value||'').trim().toLowerCase();
  const acc=S.accounts.find(a=>(a.username&&a.username.toLowerCase()===id)||a.email.toLowerCase()===id||a.wa===id)||S.accounts[0];
  const {password,...prof}=acc; S.akun=prof; S.guest=false; S.authMsg=null; save(); toast('Selamat datang, '+prof.nama); go({name:'home'});
}
function doRegister(){
  const f=id=>document.getElementById(id);
  const v={nama:f('r-nama').value.trim(),email:f('r-email').value.trim(),wa:f('r-wa').value.trim(),password:f('r-pw').value};
  let bad=false;
  [['nama',v.nama.length>=3],['email',/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)],['wa',/^08\d{8,12}$/.test(v.wa)],['pw',v.password.length>=6]].forEach(([k,ok])=>{f('r-'+k).closest('.field').classList.toggle('invalid',!ok); if(!ok)bad=true;});
  if(bad){toast('Lengkapi data yang ditandai');return;}
  if(S.accounts.some(a=>a.email.toLowerCase()===v.email.toLowerCase())){S.authMsg={t:'err',m:'Email sudah terdaftar. Silakan masuk.'};render();return;}
  const acc=Object.assign({},v,{kota:'',alamat:'',kode:'FB-USR-'+String(Math.floor(1000+Math.random()*9000)),updated:Date.now()});
  S.accounts.push(acc); const {password,...prof}=acc; S.akun=prof; S.guest=false; S.authMsg=null; save(); toast('Akun dibuat'); go({name:'akun'});
}
function doForgot(){
  const id=(document.getElementById('f-id').value.trim()||S.forgotId||'').toLowerCase(); const acc=S.accounts.find(a=>a.email.toLowerCase()===id||a.wa===id);
  if(!acc){S.authMsg={t:'err',m:'Akun dengan email/no HP itu tidak ditemukan.'};render();return;}
  const npw=document.getElementById('f-pw'); if(npw&&npw.value.length>=6){acc.password=npw.value; S.authMsg={t:'ok',m:'Password baru tersimpan. Silakan masuk.'}; S.authView='login'; S.forgotStep=0; S.forgotId=null; save(); render(); return;}
  S.authMsg={t:'ok',m:'Link reset dikirim ke WhatsApp '+acc.wa.replace(/(\d{4})\d+(\d{3})/,'$1-xxxx-$2')+' (simulasi). Masukkan password baru di bawah.'}; S.forgotStep=2; S.forgotId=id; render();
}
function vLogin(){
  const v=S.authView||'login'; const msg=S.authMsg?`<div class="callout ${S.authMsg.t==='err'?'warn':'ok'}" style="font-size:13px">${S.authMsg.m}</div>`:'';
  const fld=(id,l,ph,type='text',extra='')=>`<div class="field"><label for="${id}">${l}</label><input id="${id}" type="${type}" placeholder="${ph}" ${extra}><span class="err">Periksa isian ini.</span></div>`;
  let form='';
  if(v==='login') form=`<form id="authForm" class="card" novalidate><h2 style="font-size:24px">Masuk</h2>${msg}${fld('l-id','Username','Admin','text','value="Admin" autocomplete="username"')}${fld('l-pw','Password','••••••••','password','value="fabiebsky" autocomplete="current-password"')}<div class="alt"><button type="button" data-act="authView" data-v="forgot">Lupa password?</button></div><button type="submit" class="btn">Masuk</button><div class="or">atau</div><button type="button" class="btn ghost" data-act="guest">Masuk tanpa login</button><div class="alt" style="justify-content:center">Belum punya akun? <button type="button" data-act="authView" data-v="register">Buat akun</button></div><p style="font-size:12px;color:var(--muted);text-align:center">Prototype: data sudah terisi, klik Masuk untuk lanjut.</p></form>`;
  else if(v==='register') form=`<form id="authForm" class="card" novalidate><h2 style="font-size:24px">Buat akun</h2>${msg}${fld('r-nama','Nama','Nama lengkap','text','autocomplete="name"')}${fld('r-email','Email','nama@email.com','email','autocomplete="email"')}${fld('r-wa','No HP / WhatsApp','08xxxxxxxxxx','text','inputmode="numeric" autocomplete="tel"')}${fld('r-pw','Password','Minimal 6 karakter','password','autocomplete="new-password"')}<button type="submit" class="btn">Buat akun</button><div class="or">atau</div><button type="button" class="btn ghost" data-act="guest">Masuk tanpa login</button><div class="alt" style="justify-content:center">Sudah punya akun? <button type="button" data-act="authView" data-v="login">Masuk</button></div></form>`;
  else form=`<form id="authForm" class="card" novalidate><h2 style="font-size:24px">Lupa password</h2><p style="font-size:14px;color:var(--muted)">Masukkan email atau no HP yang terdaftar. Link reset dikirim lewat WhatsApp.</p>${msg}${fld('f-id','Email atau no HP','nama@email.com / 08xxxxxxxxxx','text',S.forgotStep===2?`value="${S.forgotId||''}" readonly`:'')}${S.forgotStep===2?fld('f-pw','Password baru','Minimal 6 karakter','password','autocomplete="new-password"'):''}<button type="submit" class="btn">${S.forgotStep===2?'Simpan password baru':'Kirim link reset'}</button><div class="alt" style="justify-content:center"><button type="button" data-act="authView" data-v="login">Kembali ke Masuk</button></div></form>`;
  return `<div class="auth"><div class="side"><img src="${IMGD.IMG_COUPLE}" alt=""><img class="logo" src="${LOGO_SRC}" alt="Fabiebsky"></div><div class="panel"><canvas id="lbg" aria-hidden="true"></canvas><div class="box"><div style="display:flex;flex-direction:column;gap:6px;text-align:center"><span class="kicker" style="color:#E9B79A">Fabiebsky</span><h2 style="font-size:32px;color:var(--cream)">Selamat datang di Fabiebsky</h2><p style="color:var(--sand);font-size:14px">Masuk untuk melanjutkan.</p></div>${form}</div></div></div>`;
}
function saveAkun(){
  const f=id=>document.getElementById(id);
  const v={nama:f('a-nama').value.trim(),email:f('a-email').value.trim(),wa:f('a-wa').value.trim(),alamat:f('a-alamat').value.trim(),kota:f('a-kota').value.trim(),prov:f('a-prov').value};
  let bad=false;
  [['nama',v.nama.length>=3],['email',!v.email||/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)],['wa',/^08\d{8,12}$/.test(v.wa)],['alamat',v.alamat.length>=10],['prov',!!v.prov],['kota',v.kota.length>=3]].forEach(([k,ok])=>{f('a-'+k).closest('.field').classList.toggle('invalid',!ok); if(!ok)bad=true;});
  if(bad){toast('Lengkapi data yang ditandai');return;}
  const kode=(S.akun&&S.akun.kode)||('FB-USR-'+String(Math.floor(1000+Math.random()*9000)));
  S.akun=Object.assign({},v,{kode,updated:Date.now()}); S.akunEdit=false; save(); toast('Data akun disimpan'); render();
}
function vAkun(){
  const a=S.akun; const edit=!!(a&&S.akunEdit);
  if(!a) return `<section class="section"><div class="empty card" style="max-width:520px;margin:0 auto"><b>Kamu masuk sebagai tamu.</b><span>Masuk atau buat akun untuk menyimpan data pengiriman.</span><button class="btn" data-go="login">Masuk / Buat akun</button></div></section>`;
  const fld=(id,l,ph,val,extra='')=>`<div class="field"><label for="${id}">${l}</label><input id="${id}" value="${val||''}" placeholder="${ph}" ${extra}><span class="err">Periksa isian ini.</span></div>`;
  return `<section class="section"><div style="max-width:860px">
    <div style="display:flex;flex-direction:column;gap:20px">
      <div class="sec-head"><div class="l"><span class="kicker">Akun pengguna</span><h1 style="font-size:40px">${a.nama}</h1></div></div>
      <p style="color:var(--muted);font-size:14px;max-width:60ch">Data akun dipakai untuk mengisi checkout otomatis.</p>
      ${edit?`<form id="akunForm" class="card" style="padding:24px;display:flex;flex-direction:column;gap:14px" novalidate>
        <div class="grid g2" style="gap:14px">${fld('a-nama','Nama','Nama lengkap',a?.nama,'autocomplete="name"')}${fld('a-email','Email','nama@email.com',a?.email,'inputmode="email" autocomplete="email"')}</div>
        <div class="grid g2" style="gap:14px">${fld('a-wa','No HP / WhatsApp','08xxxxxxxxxx',a?.wa,'inputmode="numeric" autocomplete="tel"')}</div>
        <div class="grid g2" style="gap:14px">${wilSelects('a-kota','a-prov',a?.kota,a?.prov)}</div>
        <div class="field"><label for="a-alamat">Alamat</label><textarea id="a-alamat" rows="3" placeholder="Jalan, nomor, RT/RW, kelurahan, kecamatan">${a?.alamat||''}</textarea><span class="err">Tulis alamat lengkap (min. 10 karakter).</span></div>
        <div style="display:flex;gap:10px;flex-wrap:wrap"><button type="submit" class="btn">Simpan data</button>${a?'<button type="button" class="btn ghost" data-act="akunCancel">Batal</button>':''}</div>
      </form>`
      :`<div class="card" style="padding:24px;display:flex;flex-direction:column;gap:16px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap"><h3 style="font-size:20px">Data akun</h3><span style="font-size:12px;color:var(--muted)">Dipakai untuk pengiriman</span></div>
        <div class="akun-grid">${[['Nama',a.nama,'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5z'],['Email',a.email||'—','M3 6h18v12H3z M3 7l9 6 9-6'],['No HP / WhatsApp',a.wa,'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M11 18h2'],['Kota / Provinsi',a.kota+(a.prov||provOf(a.kota)?', '+(a.prov||provOf(a.kota)):''),'M12 22s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'],['Alamat',a.alamat,'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11z']].map(([l,v,p],k)=>`<div class="akun-item ${k===4?'wide':''}"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${p}"/></svg></span><div style="display:flex;flex-direction:column;gap:3px;min-width:0"><span class="label">${l}</span><span style="font-size:15px;overflow-wrap:anywhere">${v||'—'}</span></div></div>`).join('')}</div>
        <div style="grid-column:1/-1;display:flex;gap:10px;flex-wrap:wrap;padding-top:6px;justify-content:space-between;align-items:center"><button class="btn" data-act="akunEdit">Edit data</button><button class="logout-link" data-act="logout"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>Logout</button></div>
      </div>`}
    </div>
  </div></section>`;
}

/* ================= RENDER ================= */
/* login background: pola titik bergelombang yang bereaksi ke kursor (sama seperti CMS) */
let lbgRaf=null;
function initLoginBg(){const cv=document.getElementById('lbg'); if(!cv)return; if(lbgRaf)cancelAnimationFrame(lbgRaf); const ctx=cv.getContext('2d'); let W=0,H=0; const m={x:-9999,y:-9999}; const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches; const host=cv.parentElement;
  function size(){const r=host.getBoundingClientRect(); const dpr=Math.min(2,devicePixelRatio||1); W=r.width; H=r.height; cv.width=W*dpr; cv.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);}
  function draw(t){if(!document.body.contains(cv))return; const gap=26, cols=Math.ceil(W/gap)+2, rows=Math.ceil(H/gap)+2; ctx.clearRect(0,0,W,H); const tt=reduce?0:t/1000;
    for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){const bx=i*gap-gap/2, by=j*gap-gap/2; const wave=Math.sin(bx*0.012+tt*0.9)*Math.cos(by*0.011-tt*0.7); let x=bx+Math.sin(tt+j*0.35)*3, y=by+Math.cos(tt*0.8+i*0.3)*3; const dx=x-m.x, dy=y-m.y, d=Math.hypot(dx,dy); const R=170; let k=0; if(d<R){k=(1-d/R); x+=dx/d*k*22; y+=dy/d*k*22;}
      const r=1.1+((wave+1)/2)*1.6+k*2.2, a=0.16+((wave+1)/2)*0.28+k*0.5; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fillStyle=k>0.35?`rgba(233,183,154,${Math.min(1,a)})`:`rgba(201,185,166,${a})`; ctx.fill();}
    ctx.strokeStyle='rgba(233,183,154,0.10)'; ctx.lineWidth=1; for(let l=0;l<4;l++){ctx.beginPath(); for(let x=0;x<=W;x+=8){const y=H*(0.25+l*0.18)+Math.sin(x*0.008+tt*0.6+l)*26+Math.cos(x*0.02-tt*0.4)*8; if(x===0)ctx.moveTo(x,y); else ctx.lineTo(x,y);} ctx.stroke();}
    if(!reduce) lbgRaf=requestAnimationFrame(draw);}
  size(); host.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect(); m.x=e.clientX-r.left; m.y=e.clientY-r.top; if(reduce)draw(0);}); host.addEventListener('pointerleave',()=>{m.x=-9999;m.y=-9999; if(reduce)draw(0);});
  if(reduce)draw(0); else lbgRaf=requestAnimationFrame(draw);
  if(!initLoginBg.bound){initLoginBg.bound=true; addEventListener('resize',()=>{if(document.getElementById('lbg'))initLoginBg();});}
}
function render(){
  // if(!S.akun && !S.guest && S.route.name!=='login'){S.route={name:'login'};}
  // if(S.route.name==='login' && S.akun){S.route={name:'home'};}
  const r=S.route; const v=document.getElementById('view');
  document.body.classList.toggle('is-login', r.name==='login');
  document.querySelectorAll('[data-go="akun"]').forEach(b=>{const l=S.akun?'Akun':'Masuk'; if(b.classList.contains('iconbtn')){b.setAttribute('aria-label',l);b.title=l;} else if(b.closest('.mobnav')) b.textContent=l;});
  const map={home:vHome,katalog:vKatalog,detail:vDetail,cart:vCart,checkout:vCheckout,pay:vPay,sukses:vSukses,cek:vCek,akun:vAkun,login:vLogin};
  v.innerHTML=(map[r.name]||vHome)();
  if(r.name==='login') requestAnimationFrame(initLoginBg);
  const katalogLike=r.name==='katalog'||r.name==='detail'; const curBrand=r.name==='katalog'?(r.brand||'fab'):(r.name==='detail'?(byId(r.id)?.brand||'fab'):null);
  document.querySelectorAll('nav button, .mobnav button').forEach(b=>{let on=false; if(b.classList.contains('dd-btn')) on=katalogLike; else if(b.closest('.dd-menu')) on=katalogLike&&b.dataset.brand===curBrand; else on=b.dataset.go===r.name||(b.dataset.go==='katalog'&&katalogLike); b.classList.toggle('on',on);});
  updateTimers();
  const sort=document.getElementById('sort'); if(sort) sort.onchange=e=>act('setSort',{v:e.target.value});
  const ss=document.getElementById('showSold'); if(ss) ss.onchange=()=>act('toggleSold',{});
  const qi=document.getElementById('qty-in'); if(qi){qi.onchange=()=>setQty(qi.dataset.id,qi.value);}
  document.querySelectorAll('.radio input').forEach(i=>i.onchange=()=>{i.closest('form')?.querySelectorAll(`input[name=${i.name}]`).forEach(x=>x.closest('.radio').classList.toggle('on',x.checked)); if(i.name==='kurir'){const p={'JNE REG':22000,'J&T Express':20000,'SiCepat HALU':28000}[i.value]; const sub=myLock().reduce((a,x)=>a+x.price,0); const o=document.getElementById('ongkirTxt'),t=document.getElementById('totalTxt'); if(o)o.textContent=fmt(p); if(t)t.textContent=fmt(sub+p);}});
  const f=document.getElementById('coForm'); if(f) f.onsubmit=e=>{e.preventDefault();act('createOrder',{});};
  // submit form tidak diandalkan (bisa diblokir di preview/iframe): tombol & Enter memanggil aksinya langsung
  const wire=(id,actName)=>{const f=document.getElementById(id); if(!f)return; const run=e=>{if(e)e.preventDefault(); act(actName(),{});}; f.onsubmit=run; f.querySelectorAll('button[type=submit]').forEach(b=>{b.type='button'; b.onclick=run;}); f.querySelectorAll('input').forEach(i=>{i.addEventListener('keydown',e=>{if(e.key==='Enter'){run(e);}});});};
  wire('authForm',()=>({login:'doLogin',register:'doRegister',forgot:'doForgot'}[S.authView||'login']));
  wire('akunForm',()=>'akunSave');
  ['q-kode','q-wa'].forEach(id=>{const el=document.getElementById(id); if(el) el.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();act('findOrder',{});}};});
  const kq=document.getElementById('kat-q'); if(kq) kq.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault(); const q=kq.value.trim(); const brand=kq.closest('form').dataset.brand; go(q?{name:'katalog',brand,q}:{name:'katalog',brand});}};
}
load();
if(!['home','katalog','detail','cart','checkout','pay','sukses','cek','akun'].includes(S.route?.name) || S.route?.name === 'login') S.route={name:'home'};
render();
setInterval(tick,1000);
setTimeout(()=>{let seen=false;try{seen=!!sessionStorage.getItem('fab_tease');}catch(e){} if(!seen && !document.body.classList.contains('is-login') && document.getElementById('chatBox').hidden){document.getElementById('chatTease').hidden=false; setTimeout(()=>{document.getElementById('chatTease').hidden=true;},9000);}},4000);
document.addEventListener('keydown',e=>{if(e.target&&e.target.id==='chatMsg'&&e.key==='Enter'&&!e.shiftKey){e.preventDefault(); chatSend();}});
