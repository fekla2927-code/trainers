(function(){
const {R,pick,shuffle,sample,range,plural,gcd}=H;
const N=H.num,M=H.m;
const F=(a,b)=>H.frac(typeof a==='number'?N(a):a,typeof b==='number'?N(b):b);
const nz=(a,b)=>{let v;do{v=R(a,b);}while(v===0);return v;};
const pn=v=>v<0?`(${N(v)})`:N(v);
const ok=(c,msg)=>{if(!c)throw new Error('self-check failed: '+msg);};
const isInt=x=>Math.abs(x-Math.round(x))<1e-9;
const INF=Infinity;
function ch(right,wrong){const all=[right,...wrong];if(new Set(all).size!==all.length)return null;const o=shuffle(all.map((s,i)=>({s,i})));return {opts:o.map(x=>x.s),ans:o.findIndex(x=>x.i===0)};}
const gens=[];
const G=(lvl,make,o)=>{o=o||{};gens.push({lvl,star:o.star,rule:o.rule,make:()=>{for(let i=0;i<800;i++){const t=make();if(t){if(t.type==='num')t.ans=Math.round(t.ans*1e9)/1e9;return t;}}throw new Error('gen failed lvl '+lvl);}});};
const A=Math.abs;
/* x − a в красивом виде */
const xa=(a,v)=>{v=v||'x';return a===0?v:a>0?`${v} − ${N(a)}`:`${v} + ${N(-a)}`;};
const ab=s=>`|${s}|`;
const plusC=c=>c===0?'':c>0?` + ${N(c)}`:` − ${N(-c)}`;
const fset=a=>a.length?'{'+a.slice().sort((p,q)=>p-q).map(N).join('; ')+'}':'∅';
const parsePair=raw=>{const m=String(raw).replace(/[−–—]/g,'-').match(/-?\d+/g);return m&&m.length===2?m.map(Number):null;};
const P=(x,y)=>`(${N(x)}; ${N(y)})`;
const PT=(q,x,y,extra)=>Object.assign({type:'text',q,ans:[P(x,y)],right:P(x,y),ansText:M(P(x,y)),ph:'(x; y)',keys:['−',';','(',')'],
  check:raw=>{const p=parsePair(raw);return !!p&&p[0]===x&&p[1]===y;}},extra||{});

function den(x){for(let d=1;d<=24;d++)if(isInt(x*d))return d;return 0;}
function nh(x){if(x===INF)return '+∞';if(x===-INF)return '−∞';const d=den(x);if(d<=1)return N(x);const n=Math.round(Math.abs(x)*d),g=gcd(n,d);return (x<0?'−':'')+F(n/g,d/g);}
function nt(x){if(x===INF)return '+∞';if(x===-INF)return '−∞';const d=den(x);if(d<=1)return N(x);const n=Math.round(Math.abs(x)*d),g=gcd(n,d);return (x<0?'−':'')+(n/g)+'/'+(d/g);}
/* intervals: {lo,hi,cl,ch} */
const I=(lo,hi,cl,chh)=>({lo,hi,cl:lo===-INF?false:!!cl,ch:hi===INF?false:!!chh});
const ivs=v=>`${v.cl?'[':'('}${nh(v.lo)}; ${nh(v.hi)}${v.ch?']':')'}`;
const sets=L=>L.length?L.map(ivs).join(' ∪ '):'∅';
function ineq(v,x){x=x||'x';if(v.lo===-INF&&v.hi===INF)return `${x} — любое число`;if(v.lo===-INF)return `${x} ${v.ch?'≤':'<'} ${nh(v.hi)}`;if(v.hi===INF)return `${x} ${v.cl?'≥':'>'} ${nh(v.lo)}`;return `${nh(v.lo)} ${v.cl?'≤':'<'} ${x} ${v.ch?'≤':'<'} ${nh(v.hi)}`;}
function inter(a,b){let lo,cl,hi,chh;if(a.lo>b.lo){lo=a.lo;cl=a.cl;}else if(b.lo>a.lo){lo=b.lo;cl=b.cl;}else{lo=a.lo;cl=a.cl&&b.cl;}
 if(a.hi<b.hi){hi=a.hi;chh=a.ch;}else if(b.hi<a.hi){hi=b.hi;chh=b.ch;}else{hi=a.hi;chh=a.ch&&b.ch;}
 if(lo>hi||(lo===hi&&!(cl&&chh)))return null;return I(lo,hi,cl,chh);}
function unionOv(a,b){let lo,cl,hi,chh;if(a.lo<b.lo){lo=a.lo;cl=a.cl;}else if(b.lo<a.lo){lo=b.lo;cl=b.cl;}else{lo=a.lo;cl=a.cl||b.cl;}
 if(a.hi>b.hi){hi=a.hi;chh=a.ch;}else if(b.hi>a.hi){hi=b.hi;chh=b.ch;}else{hi=a.hi;chh=a.ch||b.ch;}return I(lo,hi,cl,chh);}
const inIv=(v,x)=>(x>v.lo||(v.cl&&x===v.lo))&&(x<v.hi||(v.ch&&x===v.hi));
function intsIn(v){const a=v.cl?Math.ceil(v.lo-1e-9):Math.floor(v.lo+1e-9)+1,b=v.ch?Math.floor(v.hi+1e-9):Math.ceil(v.hi-1e-9)-1;const r=[];for(let k=a;k<=b;k++)r.push(k);return r;}
const FLIP={'<':'>','>':'<','≤':'≥','≥':'≤'};
function ray(op,r){return op==='<'?I(-INF,r,0,0):op==='≤'?I(-INF,r,0,1):op==='>'?I(r,INF,0,0):I(r,INF,1,0);}
const OPS=['<','>','≤','≥'];

/* ---------- number line ---------- */
function nl(rows,o){o=o||{};const W=320;const pts=[];rows.forEach(r=>r.ivs.forEach(v=>{if(isFinite(v.lo))pts.push(v.lo);if(isFinite(v.hi))pts.push(v.hi);}));(o.marks||[]).forEach(m=>pts.push(m));
 let lo=Math.min(...pts),hi=Math.max(...pts);if(!pts.length){lo=-5;hi=5;}const span=Math.max(hi-lo,2);lo-=span*0.3+0.5;hi+=span*0.3+0.5;
 const X=x=>x===-INF?14:x===INF?W-14:20+(x-lo)/(hi-lo)*(W-40);
 const nr=rows.length,AY=22+nr*20,Hh=AY+44;
 let s=`<svg viewBox="0 0 ${W} ${Hh}" width="${W}" role="img" aria-label="Числовая прямая" style="font-family:system-ui,sans-serif">`;
 s+=`<defs><marker id="nla" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="var(--fig)"/></marker></defs>`;
 rows.forEach((r,ri)=>{const y=AY-12-ri*20;const col=r.col||'var(--hl)';r.ivs.forEach(v=>{const x1=X(v.lo),x2=X(v.hi);s+=`<rect x="${Math.min(x1,x2)}" y="${y-5}" width="${Math.abs(x2-x1)}" height="10" rx="3" fill="${col}" fill-opacity="${r.op||0.6}"/>`;});});
 s+=`<line x1="8" y1="${AY}" x2="${W-6}" y2="${AY}" stroke="var(--fig)" stroke-width="1.6" marker-end="url(#nla)"/><text x="${W-10}" y="${AY+18}" font-size="13" font-style="italic" fill="var(--ink)">x</text>`;
 // endpoints
 const eps=[];rows.forEach(r=>r.ivs.forEach(v=>{[[v.lo,v.cl],[v.hi,v.ch]].forEach(([x,c])=>{if(!isFinite(x))return;const e=eps.find(e=>e.x===x);if(e)e.c=e.c||c;else eps.push({x,c});});}));
 (o.marks||[]).forEach(m=>{if(!eps.find(e=>e.x===m))eps.push({x:m,c:null});});
 eps.sort((a,b)=>a.x-b.x);let lastX=-99,lastRow=0;
 eps.forEach(e=>{const px=X(e.x);s+=`<line x1="${px}" y1="${AY-14-(nr-1)*20}" x2="${px}" y2="${AY}" stroke="var(--fig)" stroke-width="1" stroke-dasharray="3 3"/>`;
  if(e.c!==null)s+=`<circle cx="${px}" cy="${AY}" r="5" fill="${e.c?'var(--accent-ink)':'var(--card)'}" stroke="var(--accent-ink)" stroke-width="2"/>`;else s+=`<line x1="${px}" y1="${AY-5}" x2="${px}" y2="${AY+5}" stroke="var(--fig)" stroke-width="1.6"/>`;
  const row=(px-lastX<30&&lastRow===0)?1:0;lastX=px;lastRow=row;
  s+=`<text x="${px}" y="${AY+20+row*15}" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent-ink)">${nt(e.x)}</text>`;});
 return s+'</svg>';}
const nl1=L=>nl([{ivs:L}]);


function plot(c){
  const xr=c.xr||[-6,6],yr=c.yr||[-6,6],W=c.w||300,pad=c.pad||16;
  const u=(W-2*pad)/(xr[1]-xr[0]);
  const Hh=Math.round(u*(yr[1]-yr[0])+2*pad);
  const X=x=>pad+(x-xr[0])*u,Y=y=>pad+(yr[1]-y)*u;
  const f1=v=>Math.round(v*10)/10;
  const fs=c.fs||(u>=17?11:10);
  const step=c.step||(u>=21?1:u>=11?2:5);
  const X0=X(0),Y0=Y(0);
  const occ=[],dots=[];
  let g='',lab='';
  const addSeg=(x1,y1,x2,y2)=>{const d=Math.hypot(x2-x1,y2-y1),n=Math.max(1,Math.ceil(d/2));for(let i=0;i<=n;i++)dots.push([x1+(x2-x1)*i/n,y1+(y2-y1)*i/n]);};
  const addPoly=pts=>{for(let i=1;i<pts.length;i++)addSeg(pts[i-1][0],pts[i-1][1],pts[i][0],pts[i][1]);};
  const box=(x,y,t,anc,f)=>{const w=String(t).length*f*0.62+5;const x0=anc==='end'?x-w:anc==='middle'?x-w/2:x;return {x0,y0:y-f*0.82-1,x1:x0+w,y1:y+f*0.22+1};};
  const inter=(a,b)=>a.x0<b.x1&&b.x0<a.x1&&a.y0<b.y1&&b.y0<a.y1;
  const hitD=b=>dots.some(([px,py])=>px>=b.x0-1.5&&px<=b.x1+1.5&&py>=b.y0-1.5&&py<=b.y1+1.5);
  const inside=b=>b.x0>=2&&b.x1<=W-2&&b.y0>=2&&b.y1<=Hh-2;
  const hasV=xr[0]<=0&&xr[1]>=0,hasH=yr[0]<=0&&yr[1]>=0;
  const hitA=b=>(hasV&&X0>=b.x0-2&&X0<=b.x1+2)||(hasH&&Y0>=b.y0-2&&Y0<=b.y1+2);
  const halo=`stroke="var(--card)" stroke-width="3.5" stroke-linejoin="round" paint-order="stroke"`;
  function place(t,px,py,cands,o){
    o=o||{};const f=o.f||fs;
    let pickc=null;
    if(o.tick){const b0=box(px+cands[0][0],py+cands[0][1],t,cands[0][2],f);if(occ.some(q=>inter(q,b0)))return '';}
    for(const cd of cands){const b=box(px+cd[0],py+cd[1],t,cd[2],f);if(inside(b)&&!occ.some(q=>inter(q,b))&&!hitD(b)&&(o.axes===false||!hitA(b))){pickc=[cd,b];break;}}
    if(!pickc){if(!o.must)return '';let best=1e9;
      for(const cd of cands.concat(cands.map(q=>[q[0]*2,q[1]*1.8,q[2]]))){const b=box(px+cd[0],py+cd[1],t,cd[2],f);if(!inside(b))continue;
        const pen=dots.filter(([qx,qy])=>qx>=b.x0-1.5&&qx<=b.x1+1.5&&qy>=b.y0-1.5&&qy<=b.y1+1.5).length+40*occ.filter(q=>inter(q,b)).length+(o.axes!==false&&hitA(b)?8:0);
        if(pen<best){best=pen;pickc=[cd,b];}}
      if(!pickc){const cd=cands[0];pickc=[cd,box(px+cd[0],py+cd[1],t,cd[2],f)];}}
    occ.push(pickc[1]);const cd=pickc[0];
    return `<text x="${f1(px+cd[0])}" y="${f1(py+cd[1])}" text-anchor="${cd[2]}" font-size="${f}" font-weight="${o.bold?700:500}" fill="${o.col||'var(--ink)'}" ${halo}>${t}</text>`;
  }
  const around=(d)=>[[d,-d,'start'],[d,d+8,'start'],[-d,-d,'end'],[-d,d+8,'end'],[0,-d-2,'middle'],[0,d+12,'middle'],[d+2,4,'start'],[-d-2,4,'end']];
  /* фон и сетка */
  g+=`<rect x="0.5" y="0.5" width="${W-1}" height="${Hh-1}" rx="10" fill="var(--card)" stroke="var(--line)"/>`;
  for(let i=Math.ceil(xr[0]);i<=xr[1];i++)if(i!==0)g+=`<line x1="${f1(X(i))}" y1="${f1(Y(yr[0]))}" x2="${f1(X(i))}" y2="${f1(Y(yr[1]))}" stroke="var(--line)" stroke-width="1"/>`;
  for(let j=Math.ceil(yr[0]);j<=yr[1];j++)if(j!==0)g+=`<line x1="${f1(X(xr[0]))}" y1="${f1(Y(j))}" x2="${f1(X(xr[1]))}" y2="${f1(Y(j))}" stroke="var(--line)" stroke-width="1"/>`;
  /* закрашенные области */
  (c.rects||[]).forEach(r=>{const x1=Math.min(X(0),X(r.x)),x2=Math.max(X(0),X(r.x)),y1=Math.min(Y(0),Y(r.y)),y2=Math.max(Y(0),Y(r.y));
    g+=`<rect x="${f1(x1)}" y="${f1(y1)}" width="${f1(x2-x1)}" height="${f1(y2-y1)}" fill="var(--hl)" fill-opacity="${r.op||0.3}" stroke="var(--hl)" stroke-width="1.5"/>`;});
  (c.polys||[]).forEach(p=>{g+=`<polygon points="${p.pts.map(q=>f1(X(q[0]))+','+f1(Y(q[1]))).join(' ')}" fill="var(--hl)" fill-opacity="${p.op||0.35}" stroke="var(--hl)" stroke-width="1.5"/>`;});
  /* оси */
  if(yr[0]<=0&&yr[1]>=0){g+=`<line x1="${f1(X(xr[0]))}" y1="${f1(Y0)}" x2="${f1(X(xr[1])+4)}" y2="${f1(Y0)}" stroke="var(--fig)" stroke-width="1.4"/><polygon points="${f1(X(xr[1])+6)},${f1(Y0)} ${f1(X(xr[1])-2)},${f1(Y0-4)} ${f1(X(xr[1])-2)},${f1(Y0+4)}" fill="var(--fig)"/>`;}
  if(xr[0]<=0&&xr[1]>=0){g+=`<line x1="${f1(X0)}" y1="${f1(Y(yr[0]))}" x2="${f1(X0)}" y2="${f1(Y(yr[1])-4)}" stroke="var(--fig)" stroke-width="1.4"/><polygon points="${f1(X0)},${f1(Y(yr[1])-6)} ${f1(X0-4)},${f1(Y(yr[1])+2)} ${f1(X0+4)},${f1(Y(yr[1])+2)}" fill="var(--fig)"/>`;}
  /* асимптоты (пунктир) */
  (c.asym||[]).forEach(a=>{
    if(a.x!=null){g+=`<line x1="${f1(X(a.x))}" y1="${f1(Y(yr[0]))}" x2="${f1(X(a.x))}" y2="${f1(Y(yr[1]))}" stroke="var(--fig)" stroke-width="1.3" stroke-dasharray="5 4"/>`;addSeg(X(a.x),Y(yr[0]),X(a.x),Y(yr[1]));}
    else{g+=`<line x1="${f1(X(xr[0]))}" y1="${f1(Y(a.y))}" x2="${f1(X(xr[1]))}" y2="${f1(Y(a.y))}" stroke="var(--fig)" stroke-width="1.3" stroke-dasharray="5 4"/>`;addSeg(X(xr[0]),Y(a.y),X(xr[1]),Y(a.y));}
  });
  /* отрезки */
  (c.segs||[]).forEach(s=>{g+=`<line x1="${f1(X(s.x1))}" y1="${f1(Y(s.y1))}" x2="${f1(X(s.x2))}" y2="${f1(Y(s.y2))}" stroke="${s.col||'var(--fig)'}" stroke-width="${s.sw||1.3}" ${s.dash===false?'':'stroke-dasharray="4 3"'}/>`;addSeg(X(s.x1),Y(s.y1),X(s.x2),Y(s.y2));});
  /* прямые */
  (c.lines||[]).forEach(l=>{
    let a,b;
    if(l.vx!=null){a=[l.vx,yr[0]];b=[l.vx,yr[1]];}
    else if(l.m===0){a=[xr[0],l.b];b=[xr[1],l.b];}
    else{let lo=xr[0],hi=xr[1];const p1=(yr[0]-l.b)/l.m,p2=(yr[1]-l.b)/l.m;lo=Math.max(lo,Math.min(p1,p2));hi=Math.min(hi,Math.max(p1,p2));if(lo>=hi)return;a=[lo,l.m*lo+l.b];b=[hi,l.m*hi+l.b];}
    g+=`<line x1="${f1(X(a[0]))}" y1="${f1(Y(a[1]))}" x2="${f1(X(b[0]))}" y2="${f1(Y(b[1]))}" stroke="${l.col||'var(--hl)'}" stroke-width="2.2" ${l.dash?'stroke-dasharray="7 4"':''}/>`;
    addSeg(X(a[0]),Y(a[1]),X(b[0]),Y(b[1]));
    l._p=[a,b];
  });
  /* гиперболы: каждая ветка — отдельная ломаная, ветки никогда не соединяются */
  (c.curves||[]).forEach(cv=>{
    const k=cv.k,a=cv.a||0,b=cv.b||0;const f=x=>k/(x-a)+b;cv._br=[];
    [1,-1].forEach(s=>{
      if(cv.only&&cv.only!==s)return;
      const Ye=(s*k>0)?yr[1]:yr[0];
      let t0=k/(Ye-b);if(!(t0*s>0))t0=s*1e-3;
      const xFar=s>0?xr[1]:xr[0];
      let x0=a+t0;
      if(s>0&&x0<xr[0])x0=xr[0];if(s<0&&x0>xr[1])x0=xr[1];
      if(s>0?x0>=xFar:x0<=xFar)return;
      const xs=[];const n=140;
      for(let i=0;i<=n;i++)xs.push(x0+(xFar-x0)*i/n);
      const yA=f(x0),yB=f(xFar);
      for(let i=1;i<n;i++){const yy=yA+(yB-yA)*i/n;const xx=a+k/(yy-b);if((xx-x0)*(xx-xFar)<0)xs.push(xx);}
      xs.sort((p,q)=>p-q);
      const pts=xs.map(x=>{let y=f(x);y=Math.max(yr[0],Math.min(yr[1],y));return [X(x),Y(y)];});
      g+=`<polyline points="${pts.map(p=>f1(p[0])+','+f1(p[1])).join(' ')}" fill="none" stroke="${cv.col||'var(--accent)'}" stroke-width="${cv.sw||2.4}" stroke-linejoin="round" stroke-linecap="round" ${cv.dash?`stroke-dasharray="${cv.dash}"`:''}/>`;
      addPoly(pts);cv._br.push(s);
    });
  });
  /* произвольные функции (ломаные): fn = {f, col, sw, dash, label, lx, brk:[x...]} */
  (c.fns||[]).forEach(fn=>{
    const xs=[];const n=480;for(let i=0;i<=n;i++)xs.push(xr[0]+(xr[1]-xr[0])*i/n);(fn.brk||[]).forEach(b=>{if(b>xr[0]&&b<xr[1])xs.push(b);});xs.sort((p,q)=>p-q);
    let run=[];const flush=()=>{if(run.length>1){g+=`<polyline points="${run.map(p=>f1(p[0])+','+f1(p[1])).join(' ')}" fill="none" stroke="${fn.col||'var(--accent)'}" stroke-width="${fn.sw||2.4}" stroke-linejoin="round" stroke-linecap="round" ${fn.dash?`stroke-dasharray="${fn.dash}"`:''}/>`;addPoly(run);}run=[];};
    xs.forEach(x=>{const y=fn.f(x);if(y>=yr[0]-1e-9&&y<=yr[1]+1e-9)run.push([X(x),Y(y)]);else flush();});flush();
  });
  /* оси: подписи x, y */
  if(yr[0]<=0&&yr[1]>=0)lab+=place('x',X(xr[1])+2,Y0,[[0,fs+5,'end'],[0,-6,'end']],{must:true,axes:false,f:fs+2,bold:true});
  if(xr[0]<=0&&xr[1]>=0)lab+=place('y',X0,Y(yr[1]),[[7,8,'start'],[-7,8,'end']],{must:true,axes:false,f:fs+2,bold:true});
  /* точки */
  (c.points||[]).forEach(p=>{
    if(p.proj){g+=`<line x1="${f1(X(p.x))}" y1="${f1(Y(p.y))}" x2="${f1(X(p.x))}" y2="${f1(Y0)}" stroke="var(--fig)" stroke-width="1.1" stroke-dasharray="3 3"/><line x1="${f1(X(p.x))}" y1="${f1(Y(p.y))}" x2="${f1(X0)}" y2="${f1(Y(p.y))}" stroke="var(--fig)" stroke-width="1.1" stroke-dasharray="3 3"/>`;addSeg(X(p.x),Y(p.y),X(p.x),Y0);addSeg(X(p.x),Y(p.y),X0,Y(p.y));}
  });
  (c.points||[]).forEach(p=>{
    const col=p.col==='ok'?'var(--ok)':p.col==='bad'?'var(--bad)':'var(--accent-ink)';
    g+=`<circle cx="${f1(X(p.x))}" cy="${f1(Y(p.y))}" r="${p.r||4}" fill="${col}" stroke="var(--card)" stroke-width="1.5"/>`;
    occ.push({x0:X(p.x)-5,y0:Y(p.y)-5,x1:X(p.x)+5,y1:Y(p.y)+5});
  });
  (c.points||[]).forEach(p=>{
    if(!p.label)return;const sx=p.x>=0?1:-1,sy=p.y>=0?1:-1;
    const base=[[7*sx,sy>0?-7:15,sx>0?'start':'end'],[7*sx,sy>0?15:-7,sx>0?'start':'end'],[-7*sx,sy>0?-7:15,sx>0?'end':'start'],[-7*sx,sy>0?15:-7,sx>0?'end':'start'],[0,-10,'middle'],[0,18,'middle'],[9,4,'start'],[-9,4,'end']];
    lab+=place(p.label,X(p.x),Y(p.y),base,{must:true,f:fs+1,bold:true,col:p.col==='bad'?'var(--bad)':p.col==='ok'?'var(--ok)':'var(--accent-ink)'});
  });
  /* подписи кривых */
  (c.curves||[]).forEach(cv=>{
    if(!cv.label)return;const k=cv.k,a=cv.a||0,b=cv.b||0,f=x=>k/(x-a)+b;
    const xs=(cv.lx!=null?[cv.lx]:[]).concat([a+2.5,a+3.5,a+1.8,a+4.5,a-2.5,a-3.5,a-1.8,a-4.5,a+1.2,a-1.2,a+5.5,a-5.5]);
    let done='';
    for(const x of xs){if(x<=xr[0]+0.3||x>=xr[1]-0.3)continue;const y=f(x);if(y<=yr[0]+0.3||y>=yr[1]-0.3)continue;
      done=place(cv.label,X(x),Y(y),around(7),{f:fs+1,bold:true,col:cv.lcol||cv.col||'var(--accent-ink)'});if(done)break;}
    if(!done){const x=xs[0],y=Math.max(yr[0]+1,Math.min(yr[1]-1,f(x)));done=place(cv.label,X(x),Y(y),around(7),{must:true,f:fs+1,bold:true,col:cv.lcol||cv.col||'var(--accent-ink)'});}
    lab+=done;
  });
  (c.fns||[]).forEach(fn=>{
    if(!fn.label)return;let done='';const xs=(fn.lx!=null?[fn.lx]:[]).concat([xr[1]-1.5,xr[0]+1.5,xr[1]-2.5,xr[0]+2.5,(xr[0]+xr[1])/2]);
    for(const x of xs){const y=fn.f(x);if(y<=yr[0]+0.3||y>=yr[1]-0.3)continue;done=place(fn.label,X(x),Y(y),around(7),{f:fs+1,bold:true,col:fn.lcol||fn.col||'var(--accent-ink)'});if(done)break;}
    lab+=done;
  });
  /* подписи прямых */
  (c.lines||[]).forEach(l=>{
    if(!l.label||!l._p)return;const [a,b]=l._p;let done='';
    for(const t of [0.85,0.15,0.7,0.3,0.5]){const x=a[0]+(b[0]-a[0])*t,y=a[1]+(b[1]-a[1])*t;done=place(l.label,X(x),Y(y),around(7),{f:fs+1,bold:true,col:l.lcol||'var(--ink)'});if(done)break;}
    if(!done)done=place(l.label,X(a[0]+(b[0]-a[0])*0.85),Y(a[1]+(b[1]-a[1])*0.85),around(7),{must:true,f:fs+1,bold:true});
    lab+=done;
  });
  /* свободный текст */
  (c.texts||[]).forEach(t=>{lab+=place(t.t,X(t.x),Y(t.y),[[0,4,'middle'],[0,-8,'middle'],[0,16,'middle'],[10,4,'start'],[-10,4,'end']],{must:true,f:t.f||fs+1,bold:t.bold!==false,col:t.col||'var(--accent-ink)',axes:t.axes});});
  if(c.quarters){[[1,1,'I'],[-1,1,'II'],[-1,-1,'III'],[1,-1,'IV']].forEach(([sx,sy,t],i)=>{const x=(sx>0?xr[1]:xr[0])/2,y=(sy>0?yr[1]:yr[0])/2;
    lab+=place(t,X(x),Y(y)-(c.quarters==='signs'?6:-6),[[0,0,'middle'],[0,-12,'middle'],[0,12,'middle']],{must:true,f:22,bold:true,col:'var(--accent-ink)'});
    if(c.quarters==='signs')lab+=place(['(+; +)','(−; +)','(−; −)','(+; −)'][i],X(x),Y(y)+14,[[0,0,'middle'],[0,8,'middle']],{must:true,f:13,col:'var(--ink)'});});}
  /* числа на осях — пропускаем, если мешают линиям */
  if(c.ticks!==false){
    for(let i=Math.ceil(xr[0]);i<xr[1];i++){if(i===0||i%step!==0||!(yr[0]<=0&&yr[1]>=0))continue;
      lab+=place(N(i),X(i),Y0,[[0,fs+3,'middle'],[0,-4,'middle']],{axes:false,tick:true});}
    for(let j=Math.ceil(yr[0]);j<yr[1];j++){if(j===0||j%step!==0||!(xr[0]<=0&&xr[1]>=0))continue;
      lab+=place(N(j),X0,Y(j),[[-4,fs*0.36,'end'],[4,fs*0.36,'start']],{axes:false,tick:true});}
    if(xr[0]<=0&&yr[0]<=0)lab+=place('0',X0,Y0,[[-4,fs+3,'end'],[4,fs+3,'start']],{axes:false});
  }
  return `<svg viewBox="0 0 ${W} ${Hh}" width="${W}" role="img" aria-label="${c.aria||'Координатная плоскость'}" style="font-family:system-ui,sans-serif">${g}${lab}</svg>`;
}


/* график y = |x − a| + c и др. */
const absFn=(a,c,o)=>Object.assign({f:x=>A(x-a)+c,brk:[a]},o||{});
const gpic=(fns,o)=>plot(Object.assign({xr:[-6,6],yr:[-3,7],w:300,fns},o||{}));
/* точки на прямой с дугой расстояния */
function distLine(a,b,o){o=o||{};const W=320;const lo=Math.min(a,b,0)-2,hi=Math.max(a,b,0)+2;const X=x=>20+(x-lo)/(hi-lo)*(W-40);const AY=58;
 let s=`<svg viewBox="0 0 ${W} 86" width="${W}" role="img" aria-label="Расстояние на прямой" style="font-family:system-ui,sans-serif">`;
 s+=`<line x1="8" y1="${AY}" x2="${W-6}" y2="${AY}" stroke="var(--fig)" stroke-width="1.6"/><polygon points="${W-4},${AY} ${W-12},${AY-4} ${W-12},${AY+4}" fill="var(--fig)"/>`;
 for(let k=Math.ceil(lo);k<=hi;k++)s+=`<line x1="${X(k).toFixed(1)}" y1="${AY-3}" x2="${X(k).toFixed(1)}" y2="${AY+3}" stroke="var(--fig)"/>`;
 const x1=X(a),x2=X(b),mid=(x1+x2)/2,hgt=Math.min(34,Math.abs(x2-x1)/2+8);
 if(a!==b)s+=`<path d="M${x1.toFixed(1)},${AY-6} Q${mid.toFixed(1)},${(AY-6-2*hgt+8).toFixed(1)} ${x2.toFixed(1)},${AY-6}" fill="none" stroke="var(--hl)" stroke-width="2.4"/><text x="${mid.toFixed(1)}" y="${(AY-hgt-4).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)" stroke="var(--card)" stroke-width="3" paint-order="stroke">${o.lab||N(A(a-b))}</text>`;
 const marks=[[a,o.la||N(a)],[b,o.lb||N(b)]];if(o.zero&&a!==0&&b!==0)marks.push([0,'0']);
 marks.forEach(([x,t],i)=>{s+=`<circle cx="${X(x).toFixed(1)}" cy="${AY}" r="${i<2?5:3}" fill="${i<2?'var(--accent-ink)':'var(--fig)'}"/><text x="${X(x).toFixed(1)}" y="${AY+20}" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent-ink)">${t}</text>`;});
 return s+'</svg>';}

/* ---------- theory ---------- */
const theory=[
{title:'Модуль — это расстояние',lvl:0,html:`
<p class="hook">Ты живёшь на 3-м этаже, а твой друг ставит велосипед на парковке на −2 (два этажа под землёй). Сколько этажей проедет лифт? Посчитай 3 − (−2) = 5 или −2 − 3 = −5 — знак зависит от того, кто из кого вычитает, а лифт в обоих случаях проедет <b>5</b> этажей. Расстояние не бывает отрицательным — и именно для этого в математике есть <b>модуль</b>.</p>
<div class="box rule"><b>Определение</b><b>Модуль числа a</b> (|a|) — это <b>расстояние</b> от точки 0 до точки a на числовой прямой.<br>|7| = 7, |−7| = 7, |0| = 0.</div>
<div class="figrow"><div class="fig">${distLine(-4,0,{lab:'|−4| = 4'})}<div class="cap">−4 стоит в 4 шагах от нуля</div></div></div>
<div class="box rule"><b>Главные свойства</b>• |a| ≥ 0 — модуль никогда не отрицательный;<br>• |a| = |−a| — противоположные числа одинаково далеко от нуля;<br>• <b>|a − b|</b> — расстояние между точками a и b.</div>
<div class="widget" id="w-dist"></div>
<div class="box ex"><b>Пример</b>Расстояние между −3 и 5: |5 − (−3)| = |8| = 8. И наоборот: |−3 − 5| = |−8| = 8. Порядок не важен.</div>
<div class="box err"><b>Частая ошибка</b>«Модуль просто убирает минус», поэтому |−x| = x. Нет! Если x = −2, то |−x| = |2| = 2, а x = −2. Верно только |−x| = |x|.</div>
<div class="fact">Значок |x| для модуля придумал немецкий математик Карл Вейерштрасс в 1841 году. В Python модуль — это функция abs(): abs(−7) даст 7.</div>`},
{title:'Как раскрыть модуль',lvl:1,html:`
<div class="box rule"><b>Правило</b>|a| = a, если a ≥ 0;<br>|a| = −a, если a < 0.<br>То есть: положительное оставляем, отрицательное «переворачиваем».</div>
<p><b>Почему «−a»?</b> Если a = −5, то −a = −(−5) = 5. Минус перед отрицательным числом делает его положительным — это и есть расстояние.</p>
<div class="box ex"><b>Пример</b>Раскрой |x − 5| при x < 2. Тогда x − 5 < 2 − 5 < 0 — выражение отрицательное. Значит, |x − 5| = −(x − 5) = <b>5 − x</b>.<br>Проверка: x = 0 → |−5| = 5 и 5 − 0 = 5 ✅.</div>
<div class="box ex"><b>Упрощение</b>При 3 < x < 7: |x − 3| + |x − 7| = (x − 3) + (7 − x) = <b>4</b>. Иксы сократились!</div>
<div class="box rule"><b>Модуль и действия</b>|a · b| = |a| · |b|, |a|² = a², но |a + b| ≤ |a| + |b| (равенство — только если a и b одного знака).</div>
<div class="box err"><b>Ловушка</b>|a − b| ≠ |a| − |b|. Пример: a = 2, b = −3: |2 − (−3)| = 5, а |2| − |−3| = −1. Модуль не может быть отрицательным!</div>`},
{title:'Уравнения |x − a| = b',lvl:2,html:`
<div class="box rule"><b>Правило</b>|x − a| = b означает: «x находится на расстоянии b от точки a».<br>• b > 0 → <b>два</b> корня: x = a − b и x = a + b;<br>• b = 0 → <b>один</b> корень: x = a;<br>• b < 0 → корней <b>нет</b> (расстояние не бывает отрицательным).</div>
<div class="figrow"><div class="fig">${distLine(2,5,{lab:'3'})}<div class="cap">|x − 2| = 3: от точки 2 на 3 вправо — 5…</div></div><div class="fig">${distLine(-1,2,{lab:'3'})}<div class="cap">…и на 3 влево — −1. Ответ: −1 и 5</div></div></div>
<div class="box ex"><b>Алгебраически</b>|x − 2| = 3 → x − 2 = 3 или x − 2 = −3 → x = 5 или x = −1.</div>
<div class="box err"><b>Ловушка со знаком</b>|x + 4| = 1 — это расстояние до точки <b>−4</b>, ведь x + 4 = x − (−4). Корни: −5 и −3, а не 3 и 5.</div>
<div class="box err"><b>Ловушка с отрицательной правой частью</b>|x − 7| = −2 — корней нет. Не пиши «x = 5 и x = 9»: подставь — получится 2 = −2.</div>`},
{title:'Уравнения посложнее',lvl:3,html:`
<div class="box rule"><b>Правило</b>|A| = c (c ≥ 0) ⇔ A = c или A = −c.<br>|A| = |B| ⇔ A = B или A = −B.</div>
<div class="box ex"><b>|2x − 1| = 5</b>2x − 1 = 5 → x = 3; 2x − 1 = −5 → x = −2. Ответ: −2; 3.</div>
<div class="box ex"><b>|x − 1| = |x − 7|</b>Точка x одинаково далека от 1 и от 7 — это середина: x = (1 + 7) : 2 = <b>4</b>. Алгебраически: x − 1 = −(x − 7) → 2x = 8.</div>
<div class="box ex"><b>Модуль в модуле: ||x| − 2| = 1</b>Снимаем «луковицу» снаружи: |x| − 2 = 1 или |x| − 2 = −1 → |x| = 3 или |x| = 1 → x = ±3, ±1. <b>Четыре</b> корня!</div>
<div class="box ex"><b>Переменная справа: |x − 4| = 2x − 1</b>Правая часть должна быть ≥ 0! Случаи: x − 4 = 2x − 1 → x = −3, но тогда 2x − 1 = −7 < 0 — <b>посторонний</b> корень. x − 4 = −(2x − 1) → 3x = 5 → x = ${F(5,3)}, 2x − 1 = ${F(7,3)} ≥ 0 ✅.</div>
<div class="box tip"><b>Правило безопасности</b>Если справа есть x — обязательно проверь корни подстановкой.</div>`},
{title:'Неравенства с модулем',lvl:4,html:`
<div class="box rule"><b>Правило</b>|x − a| < b — «ближе чем b к точке a»: <b>a − b < x < a + b</b> (отрезок).<br>|x − a| > b — «дальше чем b»: <b>x < a − b или x > a + b</b> (два луча).</div>
<div class="figrow"><div class="fig">${nl([{ivs:[I(-3,3,0,0)]}],{marks:[0]})}<div class="cap">|x| < 3 → (−3; 3)</div></div>
<div class="fig">${nl([{ivs:[I(-INF,-1,0,1),I(5,INF,1,0)]}],{marks:[2]})}<div class="cap">|x − 2| ≥ 3 → (−∞; −1] ∪ [5; +∞)</div></div></div>
<div class="box tip"><b>Как запомнить</b>«Меньше» — внутри, держимся близко к центру («сидим дома»). «Больше» — снаружи, разбегаемся в обе стороны.</div>
<div class="box err"><b>Ловушки</b>|x| < −2 — решений нет (модуль не меньше отрицательного). |x| > −2 — подходит <b>любое</b> x. |x − 1| ≤ 0 — только x = 1.</div>
<div class="box ex"><b>Из жизни</b>Батарея телефона должна работать при температуре 20° ± 15°: |t − 20| ≤ 15 → 5 ≤ t ≤ 35.</div>`},
{title:'Сумма модулей',lvl:5,html:`
<p class="hook">Тебе нужно поставить точку x на прямой так, чтобы сумма расстояний до точек 0 и 2 была как можно меньше. Где? Ответ удивляет: <b>где угодно между ними</b>!</p>
<div class="box rule"><b>Правило</b>|x − a| + |x − b| — сумма расстояний от x до a и до b (a < b).<br>• На отрезке [a; b] сумма <b>постоянна</b> и равна b − a — это наименьшее значение.<br>• Снаружи отрезка она больше: каждый шаг наружу добавляет 2.</div>
<div class="box ex"><b>|x| + |x − 2| = …</b>
= 2 → все x из [0; 2] (бесконечно много!);<br>= 4 → x = −1 или x = 3 (на 1 шаг наружу с каждой стороны: 2 + 2·1);<br>= 1 → корней нет (меньше 2 не бывает).</div>
<div class="box rule"><b>Метод интервалов</b>Отметь точки, где модули «переключаются» (a и b). На каждом промежутке раскрой модули со своими знаками и реши обычное уравнение. Проверь, что корень попал в свой промежуток.</div>
<div class="box err"><b>Ловушка</b>Решить |x| + |x − 2| = 4 как «x + x − 2 = 4» и получить один корень x = 3. Забыт промежуток x < 0, где −x + (2 − x) = 4 → x = −1.</div>`},
{title:'Графики с модулем',lvl:6,html:`
<div class="box rule"><b>y = |x|</b>«Галочка» (буква V): при x ≥ 0 это y = x, при x < 0 — y = −x. Вершина в (0; 0).</div>
<div class="box rule"><b>Сдвиги</b>y = |x − a| + c — та же галочка, сдвинутая на a <b>вправо</b> (при a > 0) и на c <b>вверх</b>. Вершина в точке (a; c).</div>
<div class="figrow"><div class="fig">${gpic([absFn(0,0,{col:'var(--fig)',dash:'5 4',label:'y = |x|',lx:-3.5}),absFn(2,1,{col:'var(--accent)',lx:4.6})],{points:[{x:2,y:1,label:'(2; 1)'}]})}<div class="cap">Пунктир — y = |x|, сплошная — y = |x − 2| + 1: сдвиг на 2 вправо и на 1 вверх</div></div></div>
<div class="box err"><b>Ловушка</b>y = |x + 3| сдвигается <b>влево</b> на 3 (вершина в x = −3), хотя там «плюс». Ищи, где модуль равен нулю: x + 3 = 0.</div>
<div class="box rule"><b>Сумма модулей: «корыто»</b>y = |x| + |x − 2| — между 0 и 2 график горизонтальный (y = 2), а снаружи поднимается с наклоном 2.</div>
<div class="widget" id="w-graph"></div>`},
{title:'Олимпиадные приёмы',lvl:7,html:`
<p class="hook">На улице в точках 1, 2, 3, …, 9 стоят 9 домов. Где поставить магазин, чтобы сумма расстояний от всех домов до него была наименьшей? Ответ — в <b>медиане</b> (здесь это дом 5). И это правило работает для любой расстановки домов, даже когда среднее арифметическое указывает совсем в другое место.</p>
<div class="box rule"><b>Медиана минимизирует сумму расстояний</b>f(x) = |x − a₁| + |x − a₂| + … + |x − aₙ| (a₁ ≤ … ≤ aₙ) наименьшая, когда x — <b>медиана</b>:<br>• n нечётное — средняя точка;<br>• n чётное — любая точка между двумя средними.</div>
<p><b>Почему?</b> Разбей точки на пары: крайние (a₁ и aₙ), следующие (a₂ и aₙ₋₁)… Для каждой пары сумма расстояний минимальна, когда x между ними. Медиана лежит между всеми парами сразу!</p>
<div class="box ex"><b>|x − 1| + |x − 2| + … + |x − 9|</b>Медиана — 5. Наименьшее значение: 4 + 3 + 2 + 1 + 0 + 1 + 2 + 3 + 4 = <b>20</b>.</div>
<div class="box rule"><b>Сумма неотрицательных равна нулю</b>|A| + |B| = 0 ⇔ A = 0 и B = 0. Пример: |x − 2y| + |y − 3| = 0 → y = 3, x = 6.</div>
<div class="box ex"><b>|x| + |y| = 3</b>На плоскости это квадрат, повёрнутый «ромбом», с вершинами (±3; 0), (0; ±3). Целых точек на нём 4 · 3 = 12.</div>
<div class="fact">Задача о магазине — это то, что решают логисты, когда выбирают, где построить склад вдоль трассы. Правило медианы работает и для футбольной команды: вратарь стоит не в «среднем арифметическом» места ударов, а там, где ему в сумме бежать меньше всего.</div>`},
{title:'Шпаргалка',html:`
<ul class="steps">
<li>|a| — расстояние от 0 до a; |a − b| — между a и b.</li>
<li>|a| = a при a ≥ 0, |a| = −a при a < 0.</li>
<li>|x − a| = b: b > 0 → a ± b; b = 0 → a; b < 0 → ∅.</li>
<li>|x − a| < b → (a − b; a + b); |x − a| > b → два луча.</li>
<li>|x − a| + |x − b| ≥ |a − b|, равенство на отрезке между a и b.</li>
<li>y = |x − a| + c — галочка с вершиной (a; c).</li>
<li>Сумма модулей минимальна в медиане.</li></ul>`}
];

const symbols={tab:'Знаки',title:'Модуль: записи и правила',rows:[
['|a|','модуль a','Расстояние от 0 до a. Всегда ≥ 0.','|−7| = 7'],
['|a − b|','модуль разности','Расстояние между точками a и b.','|2 − 9| = 7'],
['|a| = |−a|','симметрия','Противоположные числа одинаково далеко от нуля.','|5| = |−5| = 5'],
['|ab| = |a|·|b|','модуль произведения','Модуль можно «разнести» по множителям.','|−2·3| = 6'],
['|a + b| ≤ |a| + |b|','неравенство треугольника','Равенство, только когда a и b одного знака.','|3 + (−5)| = 2 < 8'],
['|x| < b','«ближе b к нулю»','−b < x < b (при b > 0).','|x| < 3 → (−3; 3)'],
['|x| > b','«дальше b от нуля»','x < −b или x > b.','|x| > 2 → два луча'],
['y = |x − a| + c','галочка','Вершина (a; c), ветви вверх.','y = |x − 2| + 1'],
['±','«плюс-минус»','Два числа сразу.','x = 3 ± 2 → 1 и 5']
],after:`<div class="box tip" style="margin-top:14px"><b>Самое важное</b>Видишь |x − a| — думай «расстояние до точки a». Половина задач решается рисунком на прямой.</div>`};

/* ---------- generators ---------- */
/* L0 */
G(0,()=>{const r=ch('расстояние от точки 0 до точки a на числовой прямой',['число a без знака «плюс»','число, противоположное a','число a, умноженное на −1']);
return {type:'choice',q:'Что такое <b>модуль числа a</b>?',...r,short:'|a| — расстояние от 0 до a.',
explain:'Модуль |a| — это <b>расстояние</b> от нуля до точки a. Расстояние не бывает отрицательным, поэтому |a| ≥ 0. |−7| = 7, |7| = 7.<br>«Число, противоположное a» — неверно: для a = 7 это −7, а |7| = 7.',
explain2:'Представь, что ты стоишь на нуле. Сколько шагов до точки −7? Семь. До точки 7? Тоже семь. Направление неважно — модуль считает только шаги.'};},{rule:true});
G(0,()=>{const r=ch('расстояние между точками a и b',['сумма расстояний от a и b до нуля','точка посередине между a и b','разность модулей |a| − |b|']);
return {type:'choice',q:'Что означает <b>|a − b|</b> на числовой прямой?',...r,short:'|a − b| — расстояние между a и b.',
explain:'|a − b| — это <b>расстояние между точками a и b</b>. Например, |5 − (−3)| = 8: от −3 до 5 ровно 8 шагов.<br>|a| − |b| — совсем другое: при a = 2, b = −3 это −1, а расстояние между ними 5.',
explain2:'Из жизни: ты на 3-м этаже, друг на −2. Разность 3 − (−2) = 5 — столько этажей проедет лифт. Модуль нужен, чтобы ответ не зависел от того, кого вычитаем из кого.'};},{rule:true});
G(0,()=>{const a=nz(-12,12),b=R(-9,9),c=R(-9,9),k=R(2,4),d=nz(-6,6);const v=A(a)+A(b-c)-k*A(d);
return {type:'num',q:`Вычисли: <span class="m">|${N(a)}| + |${N(b)} − ${pn(c)}| − ${k} · |${N(d)}|</span>`,ans:v,
hint:'Сначала посчитай, что внутри каждого модуля.',short:`${A(a)} + ${A(b-c)} − ${k}·${A(d)} = ${N(v)}.`,
explain:`1) |${N(a)}| = ${A(a)}.<br>2) ${N(b)} − ${pn(c)} = ${N(b-c)}, |${N(b-c)}| = ${A(b-c)}.<br>3) |${N(d)}| = ${A(d)}, ${k} · ${A(d)} = ${k*A(d)}.<br>Итого: ${A(a)} + ${A(b-c)} − ${k*A(d)} = <b>${N(v)}</b>.`,
explain2:`Модуль — как скобка: сначала вычисляешь всё внутри, потом «снимаешь» знак минус, если он есть. И только потом делаешь действия снаружи. Результат может быть отрицательным — модули положительны, а вот вычитание снаружи — нет.`};});
G(0,()=>{const a=R(-15,10),b=a+nz(-14,14);const d=A(a-b);const it=pick([['🚩','флажок','флажок'],['🏠','дом','дом'],['🌡️','отметка','отметка']]);
return {type:'num',q:`На числовой прямой отмечены точки A(${N(a)}) и B(${N(b)}). Найди расстояние между ними.`,ans:d,pic:distLine(a,b,{lab:'?',la:'A',lb:'B'}),
hint:'Расстояние = |a − b|.',short:`|${N(a)} − ${pn(b)}| = ${d}.`,
explain:`Расстояние между точками — модуль разности координат: |${N(a)} − ${pn(b)}| = |${N(a-b)}| = <b>${d}</b>.`,
explain2:`Посчитай шаги: ${a<0&&b>0||a>0&&b<0?`от ${N(Math.min(a,b))} до 0 — ${A(Math.min(a,b))} шагов, от 0 до ${N(Math.max(a,b))} — ещё ${A(Math.max(a,b))}. Всего ${d}.`:`от ${N(Math.min(a,b))} до ${N(Math.max(a,b))} — это ${N(Math.max(a,b))} − ${pn(Math.min(a,b))} = ${d}.`} Порядок вычитания не важен: |${N(b)} − ${pn(a)}| = ${d} тоже.`};});
G(0,()=>{const k=pick([R(1,15),R(1,15),0,-R(1,9)]);const ans=k>0?[k,-k]:k===0?[0]:[];
return {type:'set',q:`Найди все числа x, для которых <span class="m">|x| = ${N(k)}</span>.${k<0?' (Если таких нет, напиши ∅.)':''}`,ans,ph:'числа через ; или ∅',keys:['−','∅',';'],
hint:'Какие точки находятся на расстоянии '+N(k)+' от нуля?',short:k>0?`x = ${k} или x = −${k}.`:k===0?'Только x = 0.':'Модуль не бывает отрицательным: ∅.',
explain:k>0?`|x| = ${k} — точка x на расстоянии ${k} от нуля. Таких точек две: справа <b>${k}</b> и слева <b>−${k}</b>.`:k===0?'На расстоянии 0 от нуля — только сам ноль: <b>x = 0</b>.':`|x| — расстояние, оно не бывает отрицательным. Равенство |x| = ${N(k)} невозможно: <b>∅</b>.`,
explain2:k>0?`Проверка: |${k}| = ${k} ✅, |−${k}| = ${k} ✅. Типичная ошибка — записать только ${k} и забыть отрицательный корень.`:k===0?'|0| = 0, а для любого другого числа модуль положителен.':`Попробуй подставить что угодно: |5| = 5, |−5| = 5, |0| = 0 — всегда ≥ 0, никогда не ${N(k)}.`};});

/* L1 */
G(1,()=>{const r=ch('|a| = a, если a ≥ 0, и |a| = −a, если a < 0',['|a| = a при любом a','|a| = −a, если a > 0, и |a| = a, если a < 0','|a| = −a при любом a']);
return {type:'choice',q:'Как <b>раскрыть модуль</b> |a|?',...r,short:'Неотрицательное — без изменений, отрицательное — с минусом.',
explain:'|a| = a, если a ≥ 0; |a| = <b>−a</b>, если a < 0. Например, |−5| = −(−5) = 5. «−a» при отрицательном a — это положительное число.',
explain2:'Не пугайся записи «|a| = −a»: если a = −8, то −a = 8. Минус «переворачивает» отрицательное число в положительное.'};},{rule:true});
G(1,()=>{const right='|a · b| = |a| · |b|';const r=ch(right,['|a + b| = |a| + |b|','|a − b| = |a| − |b|','|−a| = a']);
return {type:'choice',q:'Какое равенство верно при <b>любых</b> числах a и b?',...r,short:'Модуль произведения равен произведению модулей.',
explain:`<b>|a · b| = |a| · |b|</b> — верно всегда (знак произведения не влияет на его «размер»).<br>Остальные ломаются на примерах: |2 + (−3)| = 1, а |2| + |−3| = 5; |2 − (−3)| = 5, а |2| − |−3| = −1; |−a| = a неверно при a = −1.`,
explain2:'Ищи контрпример: подставь числа разных знаков, например a = 2, b = −3. Верное равенство выдержит любую проверку: |2 · (−3)| = 6 = 2 · 3 ✅.'};},{rule:true});
G(1,()=>{const p=nz(-6,8),q=p-R(0,4);const right=`${N(p)} − x`;const r=ch(M(right),[M(xa(p)),M(`−x ${p<0?'+':'−'} ${N(A(p))}`),M(xa(-p))]);if(!r)return null;
const t=q-1;
return {type:'choice',q:`Раскрой модуль <span class="m">|${xa(p)}|</span>, если <span class="m">x < ${N(q)}</span>.`,...r,short:`x − ${pn(p)} < 0, значит |${xa(p)}| = ${right}.`,
explain:`При x < ${N(q)}: ${xa(p)} < ${N(q)} − ${pn(p)} = ${N(q-p)} ≤ 0 — выражение <b>отрицательное</b>. Значит, модуль раскрываем с минусом: |${xa(p)}| = −(${xa(p)}) = <b>${right}</b>.`,
explain2:`Проверь числом: x = ${N(t)} (оно < ${N(q)}). |${N(t)} − ${pn(p)}| = |${N(t-p)}| = ${A(t-p)}, а ${N(p)} − ${pn(t)} = ${N(p-t)} ✅. Вариант «${xa(p)}» дал бы ${N(t-p)} — отрицательный модуль, так не бывает.`};});
G(1,()=>{const a=R(-6,4),b=a+R(2,9);const x0=a+R(1,b-a-1)/1;if(x0<=a||x0>=b)return null;
return {type:'num',q:`Упрости выражение <span class="m">|${xa(a)}| + |${xa(b)}|</span> при <span class="m">${N(a)} < x < ${N(b)}</span> и запиши результат.`,ans:b-a,
hint:'Определи знак каждого выражения под модулем на этом промежутке.',short:`(${xa(a)}) + (${N(b)} − x) = ${b-a}.`,
explain:`При ${N(a)} < x < ${N(b)}:<br>• ${xa(a)} > 0 → |${xa(a)}| = ${xa(a)};<br>• ${xa(b)} < 0 → |${xa(b)}| = ${N(b)} − x.<br>Сумма: (${xa(a)}) + (${N(b)} − x) = <b>${b-a}</b>. Иксы сократились!`,
explain2:`Геометрически: это сумма расстояний от x до ${N(a)} и до ${N(b)}. Если x между ними, сумма равна длине отрезка: ${N(b)} − ${pn(a)} = ${b-a}. Проверь: x = ${N(x0)} → ${A(x0-a)} + ${A(x0-b)} = ${b-a} ✅.`};});
G(1,()=>{const all=[['|−a| = |a|',true,'противоположные числа одинаково далеко от нуля'],['|a|² = a²',true,'квадрат «съедает» знак'],['|a − b| = |b − a|',true,'расстояние от a до b равно расстоянию от b до a'],['|a²| = a²',true,'a² ≥ 0'],['|−a| = a',false,'при a = −2: |2| = 2 ≠ −2'],['|a + b| = |a| + |b|',false,'при a = 1, b = −1: 0 ≠ 2'],['|a| = a',false,'при a = −3: 3 ≠ −3'],['|a| − |b| = |a − b|',false,'при a = 0, b = 1: −1 ≠ 1']];
const o=shuffle(sample(all.filter(z=>z[1]),R(2,3)).concat(sample(all.filter(z=>!z[1]),2)));
return {type:'multi',q:'Какие равенства верны при <b>любых</b> a и b? Выбери все.',opts:o.map(z=>M(z[0])),ans:o.map((z,i)=>z[1]?i:-1).filter(i=>i>=0),
short:o.map(z=>`${z[0]}: ${z[1]?'да':'нет'}`).join('; '),
explain:o.map(z=>`• ${M(z[0])} — ${z[1]?'<b>верно</b>':'<b>неверно</b>'}: ${z[2]}.`).join('<br>'),
explain2:'Метод проверки: подставь «неудобные» числа — отрицательное и ноль. Если равенство ломается хоть на одном примере, оно неверно. Если верно — ищи объяснение через смысл «расстояния».'};});

/* L2 */
G(2,()=>{const r=ch('два корня: x = a − b и x = a + b',['один корень: x = a + b','два корня: x = b − a и x = b + a','корней нет']);
return {type:'choice',q:'Сколько корней у уравнения |x − a| = b при <b>b > 0</b> и какие?',...r,short:'x на расстоянии b от a: слева и справа.',
explain:'|x − a| = b — «x на расстоянии b от точки a». Таких точек две: <b>a − b</b> (слева) и <b>a + b</b> (справа).<br>Если b = 0 — один корень x = a; если b < 0 — корней нет.',
explain2:'Ты стоишь в точке a и делаешь b шагов. Можно пойти вправо (a + b) или влево (a − b). Два направления — два корня.'};},{rule:true});
G(2,()=>{const a=R(-8,8),b=R(1,9);
return {type:'set',q:`Реши уравнение <span class="m">|${xa(a)}| = ${b}</span>. Запиши все корни.`,ans:[a-b,a+b],ph:'корни через ;',keys:['−',';'],
hint:`Это точки на расстоянии ${b} от ${N(a)}.`,short:`x = ${N(a)} ± ${b}: ${N(a-b)} и ${N(a+b)}.`,
explain:`${xa(a)} = ${b} или ${xa(a)} = −${b}.<br>x = ${N(a)} + ${b} = <b>${N(a+b)}</b> или x = ${N(a)} − ${b} = <b>${N(a-b)}</b>.`,
explain2:`На прямой: от точки ${N(a)} отступаем на ${b} вправо и влево. Проверка: |${N(a+b)} − ${pn(a)}| = ${b} ✅, |${N(a-b)} − ${pn(a)}| = ${b} ✅.`,pic:distLine(a,a+b,{lab:String(b)})};});
G(2,()=>{const a=R(1,9),b=R(1,8);
return {type:'set',q:`Реши уравнение <span class="m">|x + ${a}| = ${b}</span>. Запиши все корни.`,ans:[-a-b,-a+b],ph:'корни через ;',keys:['−',';'],
hint:`x + ${a} = x − (−${a}): это расстояние до точки −${a}.`,short:`x = −${a} ± ${b}.`,
explain:`x + ${a} = ${b} → x = <b>${N(b-a)}</b>; x + ${a} = −${b} → x = <b>${N(-a-b)}</b>.<br>Ловушка: |x + ${a}| — это расстояние до <b>−${a}</b>, а не до ${a}. Корни ${a} ± ${b} = ${N(a-b)}, ${a+b} — неверны.`,
explain2:`Проверка: |${N(b-a)} + ${a}| = |${b}| = ${b} ✅; |${N(-a-b)} + ${a}| = |−${b}| = ${b} ✅. А «${a+b}»: |${a+b} + ${a}| = ${2*a+b} ≠ ${b}.`};});
G(2,()=>{const a=R(-6,6),c=R(-5,5);const kind=pick([1,0,-1]);const b=kind>0?R(1,7):kind===0?0:-R(1,6);const d=b+c;const cnt=kind>0?2:kind===0?1:0;
return {type:'num',q:`Сколько корней имеет уравнение <span class="m">|${xa(a)}|${plusC(c)} = ${N(d)}</span>?`,ans:cnt,
hint:'Сначала оставь модуль один в левой части.',short:`|${xa(a)}| = ${N(b)} → ${cnt} ${plural(cnt,'корень','корня','корней')}.`,
explain:`Переносим ${N(c)}: |${xa(a)}| = ${N(d)} − ${pn(c)} = ${N(b)}.<br>${b>0?`${N(b)} > 0 → <b>два</b> корня: ${N(a-b)} и ${N(a+b)}.`:b===0?`Модуль равен нулю → выражение равно нулю: x = ${N(a)}, <b>один</b> корень.`:`Модуль не может быть отрицательным (${N(b)} < 0) → корней <b>нет</b>, ответ 0.`}`,
explain2:`Смысл: «расстояние от x до ${N(a)} равно ${N(b)}». ${b>0?'Есть две точки — слева и справа.':b===0?'Расстояние 0 — только сама точка.':'Отрицательных расстояний не бывает.'}${c?` Не реши по ошибке |${xa(a)}| = ${N(d)} — сначала перенеси ${N(c)}!`:''}`};});
G(2,()=>{const a=R(-6,6),b=R(1,8),c=R(-6,6),k=pick([1,2,3]);const d=k*b+c;
return {type:'set',q:`Реши уравнение <span class="m">${k===1?'':k}|${xa(a)}|${plusC(c)} = ${N(d)}</span>.`,ans:[a-b,a+b],ph:'корни через ;',keys:['−',';'],
hint:'Сначала вырази модуль: перенеси число и раздели.',short:`|${xa(a)}| = ${b} → ${N(a-b)}; ${N(a+b)}.`,
explain:`1) ${k===1?'':k}|${xa(a)}| = ${N(d)} − ${pn(c)} = ${N(k*b)}.<br>${k>1?`2) Делим на ${k}: |${xa(a)}| = ${b}.<br>`:''}${k>1?3:2}) x = ${N(a)} ± ${b} → <b>${N(a-b)}</b> и <b>${N(a+b)}</b>.`,
explain2:`Обращайся с |${xa(a)}| как с одной «коробкой» t: ${k===1?'':k}t${plusC(c)} = ${N(d)} → t = ${b}. А потом открой коробку: |${xa(a)}| = ${b}. Проверка: ${k===1?'':k+'·'}|${N(a+b)} − ${pn(a)}|${plusC(c)} = ${N(k*b+c)} ✅.`};});

/* L3 */
G(3,()=>{const r=ch('A = B или A = −B',['только A = B','A = B и A = −B одновременно','A² = −B²']);
return {type:'choice',q:'Уравнение <b>|A| = |B|</b> равносильно…',...r,short:'Равные модули — числа равны или противоположны.',
explain:'Два числа имеют одинаковые модули, если они <b>равны</b> или <b>противоположны</b>: |3| = |3|, |3| = |−3|. Поэтому |A| = |B| ⇔ A = B или A = −B.',
explain2:'На прямой: одинаково далеко от нуля стоят либо одна и та же точка, либо две симметричные. Других вариантов нет.'};},{rule:true});
G(3,()=>{for(;;){const a=pick([2,3,4,5]),x1=R(-6,6),x2=R(-6,6);if(x1===x2)continue;if((a*(x1+x2))%2)continue;const b=-a*(x1+x2)/2,c=a*A(x1-x2)/2;if(b===0||c===0)continue;
const ex=`${a}x${plusC(b)}`;
return {type:'set',q:`Реши уравнение <span class="m">|${ex}| = ${c}</span>.`,ans:[x1,x2],ph:'корни через ;',keys:['−',';'],
hint:`${ex} = ${c} или ${ex} = −${c}.`,short:`Корни ${N(Math.min(x1,x2))} и ${N(Math.max(x1,x2))}.`,
explain:`${ex} = ${c} → ${a}x = ${N(c-b)} → x = ${N((c-b)/a)}.<br>${ex} = −${c} → ${a}x = ${N(-c-b)} → x = ${N((-c-b)/a)}.<br>Ответ: <b>${fset([x1,x2])}</b>.`,
explain2:`Другой взгляд: вынесем ${a}: |${a}(${xa(-b/a)})| = ${c} → |${xa(-b/a)}| = ${N(c/a)}. Расстояние от x до ${N(-b/a)} равно ${N(c/a)} → x = ${N(-b/a)} ± ${N(c/a)}.`};}});
G(3,()=>{const a=R(-8,6),b=a+R(1,10);const m=(a+b)/2;
return {type:'num',q:`Реши уравнение <span class="m">|${xa(a)}| = |${xa(b)}|</span>.`,ans:m,
hint:'Точка x одинаково удалена от двух точек. Где она?',short:`Середина между ${N(a)} и ${N(b)}: ${N(m)}.`,
explain:`|${xa(a)}| = |${xa(b)}| ⇔ ${xa(a)} = ${xa(b)} (невозможно: ${N(-a)} ≠ ${N(-b)}) или ${xa(a)} = −(${xa(b)}).<br>Второе: 2x = ${N(a+b)} → x = <b>${N(m)}</b>.`,
explain2:`Смысл: расстояние от x до ${N(a)} равно расстоянию до ${N(b)}. Такая точка — середина отрезка: (${N(a)} + ${pn(b)}) : 2 = ${N(m)}. Проверка: |${N(m)} − ${pn(a)}| = ${N(A(m-a))} = |${N(m)} − ${pn(b)}| ✅.`};});
G(3,()=>{const a=R(1,6),b=R(0,7);const roots=new Set();[a+b,a-b].forEach(t=>{if(t>=0){roots.add(t);roots.add(-t);}});const ans=[...roots];
ans.forEach(x=>ok(A(A(x)-a)===b,'nested'));
return {type:'set',q:`Реши уравнение <span class="m">||x| − ${a}| = ${b}</span>. Запиши все корни.`,ans,ph:'корни через ;',keys:['−',';'],
hint:'Снимай модули снаружи внутрь: |x| − '+a+' = ±'+b+'.',short:`Корни: ${fset(ans)}.`,
explain:`Внешний модуль: |x| − ${a} = ${b} или |x| − ${a} = −${b}.<br>• |x| = ${a+b} → x = ±${a+b}${a+b===0?' (то есть 0)':''};<br>• |x| = ${N(a-b)} → ${a-b>0?`x = ±${a-b}`:a-b===0?'x = 0':'корней нет (модуль не бывает отрицательным)'}.<br>Ответ: <b>${fset(ans)}</b> — ${ans.length} ${plural(ans.length,'корень','корня','корней')}.`,
explain2:`Это как луковица: снимаешь слой за слоем. Проверь: ${ans.slice().sort((p,q)=>p-q).map(x=>`||${N(x)}| − ${a}| = |${N(A(x)-a)}| = ${A(A(x)-a)}`).join('; ')}.`};});
G(3,()=>{for(;;){const a=R(-5,6),b=R(-6,6);// |x − a| = 2x + b
const c1=-a-b,c2=(a-b)/3;const cand=[c1,c2].filter(isInt);const good=[c1,c2].filter(x=>2*x+b>=0&&A(x-a)===2*x+b);
if(c1===c2||!good.length||good.some(x=>!isInt(x)))continue;const bad=[c1,c2].filter(x=>!good.includes(x));
// brute
const br=[];for(let x=-60;x<=60;x++)if(A(x-a)===2*x+b)br.push(x);ok(br.length===good.length,'abs-lin');
const rhs=`2x${plusC(b)}`;
return {type:'set',q:`Реши уравнение <span class="m">|${xa(a)}| = ${rhs}</span>. Не забудь проверку!`,ans:good,ph:'корни через ;',keys:['−',';'],
hint:'Правая часть должна быть неотрицательной. Реши оба случая и проверь каждый корень.',short:`Корни: ${fset(good)}.`,
explain:`Случай 1: ${xa(a)} = ${rhs} → x = ${N(c1)}. Проверка: ${rhs.replace('x','·'+pn(c1)).replace('2·','2·')} = ${N(2*c1+b)} ${2*c1+b>=0?'≥ 0 ✅':'< 0 ❌ — посторонний'}.<br>Случай 2: ${xa(a)} = −(${rhs}) → 3x = ${N(a-b)} → x = ${isInt(c2)?N(c2):F(N(a-b),3)}. Проверка: правая часть ${isInt(c2)?N(2*c2+b):F(N(2*(a-b)+3*b),3)} ${2*c2+b>=0?'≥ 0 ✅':'< 0 ❌ — посторонний'}.<br>Ответ: <b>${fset(good)}</b>.`,
explain2:`Почему нужна проверка: модуль слева ≥ 0, значит, и ${rhs} обязано быть ≥ 0. ${bad.length?`Корень ${bad.map(x=>isInt(x)?N(x):F(N(Math.round(x*3)),3)).join(', ')} делает правую часть отрицательной — равенство «модуль = отрицательное» невозможно.`:'Здесь оба корня прошли проверку.'} Подставь: ${good.map(x=>`|${N(x)} − ${pn(a)}| = ${A(x-a)}, 2·${pn(x)}${plusC(b)} = ${2*x+b}`).join('; ')} ✅.`};}});

/* L4 */
G(4,()=>{const r=ch('−a < x < a',['x < a','x < −a или x > a','−a < x или x < a']);
return {type:'choice',q:'Неравенство <b>|x| < a</b> (a > 0) равносильно…',...r,short:'«Ближе a к нулю» — между −a и a.',
explain:'|x| < a — «расстояние от x до нуля меньше a». Это точки <b>между −a и a</b>: −a < x < a.<br>«x < a» — мало: x = −100 подходит под x < a, но |−100| = 100 > a.',
explain2:'Ты на поводке длины a, привязан к нулю. Уйти можно в обе стороны, но не дальше a. Получается отрезок (−a; a).'};},{rule:true});
G(4,()=>{const a=R(-6,6),b=R(1,6),st=Math.random()<0.5;const v=I(a-b,a+b,!st,!st);
const right=ivs(v);const w=[ivs(I(-a-b,-a+b,!st,!st)),ivs(I(a-b,a+b,st,st)),sets([I(-INF,a-b,0,!st),I(a+b,INF,!st,0)])];const r=ch(M(right),w.map(M));if(!r)return null;
return {type:'choice',q:`Реши неравенство <span class="m">|${xa(a)}| ${st?'<':'≤'} ${b}</span>.`,...r,
short:`${N(a)} − ${b} ${st?'<':'≤'} x ${st?'<':'≤'} ${N(a)} + ${b}.`,
explain:`|${xa(a)}| ${st?'<':'≤'} ${b} — расстояние от x до ${N(a)} ${st?'меньше':'не больше'} ${b}:<br>${N(a-b)} ${st?'<':'≤'} x ${st?'<':'≤'} ${N(a+b)} → <b>${right}</b>.${st?' Концы не входят — скобки круглые.':' Концы входят — скобки квадратные.'}`,
explain2:`Двойное неравенство: −${b} ${st?'<':'≤'} ${xa(a)} ${st?'<':'≤'} ${b}. Прибавим ${N(a)} ко всем частям: ${N(a-b)} ${st?'<':'≤'} x ${st?'<':'≤'} ${N(a+b)}.${a!==0?` Ловушка: центр — точка ${N(a)}, а не ${N(-a)}.`:''}<div class="fig">${nl1([v])}</div>`};});
G(4,()=>{const a=R(-6,6),b=R(1,6),st=Math.random()<0.5;const L=[I(-INF,a-b,0,!st),I(a+b,INF,!st,0)];
const right=sets(L);const w=[ivs(I(a-b,a+b,!st,!st)),sets([I(-INF,a-b,0,st),I(a+b,INF,st,0)]),sets([I(-INF,-a-b,0,!st),I(-a+b,INF,!st,0)])];const r=ch(M(right),w.map(M));if(!r)return null;
return {type:'choice',q:`Реши неравенство <span class="m">|${xa(a)}| ${st?'>':'≥'} ${b}</span>.`,...r,
short:`x ${st?'<':'≤'} ${N(a-b)} или x ${st?'>':'≥'} ${N(a+b)}.`,
explain:`«Расстояние от x до ${N(a)} ${st?'больше':'не меньше'} ${b}» — точки снаружи: x ${st?'<':'≤'} ${N(a-b)} <b>или</b> x ${st?'>':'≥'} ${N(a+b)}.<br>Ответ: <b>${right}</b>. Это два луча, их объединяют знаком ∪.`,
explain2:`Проверь точками: x = ${N(a)} (центр) — |0| = 0, не ${st?'>':'≥'} ${b} ❌, значит, середина не входит. x = ${N(a+b+1)} — |${b+1}| = ${b+1} ${st?'>':'≥'} ${b} ✅.<div class="fig">${nl1(L)}</div>`};});
G(4,()=>{const k=pick([1,2,3]),a=R(-9,9),b=R(1,9);const st=Math.random()<0.5;const Z=[];for(let x=-60;x<=60;x++){const v=A(k*x-a);if(st?v<b:v<=b)Z.push(x);}if(!Z.length)return null;
const ex=k===1?xa(a):`${k}x${plusC(-a)}`;
return {type:'num',q:`Сколько <b>целых</b> чисел удовлетворяют неравенству <span class="m">|${ex}| ${st?'<':'≤'} ${b}</span>?`,ans:Z.length,
hint:'Раскрой как двойное неравенство, найди промежуток и посчитай целые.',short:`Целые: ${Z.map(N).join(', ')} — ${Z.length} шт.`,
explain:`−${b} ${st?'<':'≤'} ${ex} ${st?'<':'≤'} ${b} → ${N(a-b)} ${st?'<':'≤'} ${k===1?'x':k+'x'} ${st?'<':'≤'} ${N(a+b)}${k>1?` → ${nh((a-b)/k)} ${st?'<':'≤'} x ${st?'<':'≤'} ${nh((a+b)/k)}`:''}.<br>Целые числа в этом промежутке: ${Z.map(N).join(', ')}. Всего <b>${Z.length}</b>.`,
explain2:`Считай аккуратно с концами: ${st?'знак строгий — концы не берём':'знак нестрогий — целые концы берём'}. Проверка крайних: |${k===1?'':k+'·'}${pn(Z[0])}${plusC(-a)}| = ${A(k*Z[0]-a)} ✅, а следующее ${N(Z[0]-1)} даёт ${A(k*(Z[0]-1)-a)} ❌.`};});
G(4,()=>{const a=R(-6,6),b=R(1,6);const kind=pick(['lt','gt','le0']);let q,right,why;
if(kind==='lt'){q=`|${xa(a)}| < −${b}`;right='∅ (решений нет)';why=`Модуль не бывает меньше отрицательного числа: |…| ≥ 0 > −${b}.`;}
else if(kind==='gt'){q=`|${xa(a)}| > −${b}`;right='x — любое число';why=`Модуль всегда ≥ 0, а 0 > −${b}. Неравенство верно при любом x.`;}
else{q=`|${xa(a)}| ≤ 0`;right=`только x = ${N(a)}`;why=`Модуль не бывает отрицательным, значит, |${xa(a)}| = 0 → x = ${N(a)}.`;}
const pool=['∅ (решений нет)','x — любое число',`только x = ${N(a)}`,`(${N(a-b)}; ${N(a+b)})`];const r=ch(right,pool.filter(s=>s!==right));
return {type:'choice',q:`Реши неравенство <span class="m">${q}</span>.`,...r,short:why,
explain:`${why}<br>Ответ: <b>${right}</b>. Не надо раскрывать модуль «по правилу» — здесь всё решает то, что модуль неотрицателен.`,
explain2:`Подставь пару чисел: x = ${N(a)} → |0| = 0; x = ${N(a+5)} → 5. ${kind==='lt'?`Ни 0, ни 5 не меньше −${b}. И никакое другое значение модуля тоже.`:kind==='gt'?`И 0, и 5 больше −${b} — подходит всё.`:'0 ≤ 0 подходит, 5 ≤ 0 — нет. Подходит только точка, где модуль равен нулю.'}`};});

/* L5 */
G(5,()=>{const r=ch('на отрезке [a; b], и оно равно b − a',['только в точке x = a','в середине отрезка, и оно равно 0','при x = 0, и оно равно a + b']);
return {type:'choice',q:'При a < b выражение |x − a| + |x − b| принимает наименьшее значение…',...r,short:'Между a и b сумма расстояний равна длине отрезка.',
explain:'|x − a| + |x − b| — сумма расстояний от x до a и до b. Если x между ними, эти расстояния в сумме дают длину отрезка <b>b − a</b>. Снаружи — больше: приходится «возвращаться». Поэтому минимум b − a достигается на <b>всём отрезке</b> [a; b].',
explain2:'Ты ходишь между двумя магазинами: из дома к одному и к другому. Если дом между ними — суммарно пройдёшь ровно расстояние между магазинами. Если дом снаружи — путь к дальнему включает путь к ближнему, выходит больше.'};},{rule:true});
G(5,()=>{const a=R(-8,4),b=a+R(1,10);const s=pick([1,-1]);const p=s>0?a:-b,q=s>0?b:-a;// |x+?| forms
return {type:'num',q:`Найди наименьшее значение выражения <span class="m">|${xa(p)}| + |${xa(q)}|</span>.`,ans:q-p,
hint:`Это сумма расстояний от x до точек ${N(p)} и ${N(q)}.`,short:`Минимум = расстояние между ${N(p)} и ${N(q)} = ${q-p}.`,
explain:`|${xa(p)}| — расстояние до ${N(p)}, |${xa(q)}| — до ${N(q)}. Сумма расстояний не меньше расстояния между точками: ${N(q)} − ${pn(p)} = <b>${q-p}</b>. Оно достигается при любом x от ${N(p)} до ${N(q)}.`,
explain2:`Раскроем модули при ${N(p)} ≤ x ≤ ${N(q)}: (${xa(p)}) + (${N(q)} − x) = ${q-p}. При x > ${N(q)}: 2x${plusC(-p-q)} > ${q-p}; при x < ${N(p)}: ${N(p+q)} − 2x > ${q-p}. Значит, минимум ${q-p}.`};});
G(5,()=>{for(;;){const a=pick([0,R(-6,3)]),b=a+R(1,8);const c=(b-a)+2*R(1,4);const x1=(a+b-c)/2,x2=(a+b+c)/2;if(!isInt(x1))continue;
const br=[];for(let x=-60;x<=60;x++)if(A(x-a)+A(x-b)===c)br.push(x);ok(br.length===2&&br[0]===x1&&br[1]===x2,'summod');
return {type:'set',q:`Реши уравнение <span class="m">|${xa(a)}| + |${xa(b)}| = ${c}</span>.`,ans:[x1,x2],ph:'корни через ;',keys:['−',';'],
hint:`Наименьшее значение левой части — ${b-a}. На сколько надо выйти за отрезок [${N(a)}; ${N(b)}]?`,short:`Корни ${N(x1)} и ${N(x2)}.`,
explain:`Метод интервалов. Точки ${N(a)} и ${N(b)}.<br>• x < ${N(a)}: ${N(a)} − x + ${N(b)} − x = ${c} → 2x = ${N(a+b-c)} → x = ${N(x1)} (< ${N(a)} ✅).<br>• ${N(a)} ≤ x ≤ ${N(b)}: сумма = ${b-a} ≠ ${c} — корней нет.<br>• x > ${N(b)}: 2x${plusC(-a-b)} = ${c} → x = ${N(x2)} (> ${N(b)} ✅).<br>Ответ: <b>${fset([x1,x2])}</b>.`,
explain2:`Через расстояния: внутри отрезка сумма = ${b-a}. Каждый шаг наружу добавляет 2 (удаляемся от обеих точек). Нужно добавить ${c} − ${b-a} = ${c-b+a} → выйти на ${(c-b+a)/2} за каждый конец: ${N(a)} − ${(c-b+a)/2} = ${N(x1)} и ${N(b)} + ${(c-b+a)/2} = ${N(x2)}.`};}});
G(5,()=>{const a=R(-7,3),b=a+R(1,9);
return {type:'num',q:`Сколько <b>целых</b> корней у уравнения <span class="m">|${xa(a)}| + |${xa(b)}| = ${b-a}</span>?`,ans:b-a+1,
hint:'Вспомни, где сумма расстояний до двух точек равна расстоянию между ними.',short:`Все x из [${N(a)}; ${N(b)}]: целых ${b-a+1}.`,
explain:`Сумма расстояний до ${N(a)} и ${N(b)} равна ${b-a} (длине отрезка) ровно для x из <b>[${N(a)}; ${N(b)}]</b>. Корней бесконечно много, а целых: от ${N(a)} до ${N(b)} — ${N(b)} − ${pn(a)} + 1 = <b>${b-a+1}</b>.`,
explain2:`Не забудь «+1», как столбы забора: на отрезке длины ${b-a} целых точек ${b-a+1} (оба конца входят). Например: ${range(a,b).slice(0,12).map(N).join(', ')}${b-a+1>12?', …':''}.`};});

/* L6 */
G(6,()=>{const r=ch('сдвигом на a вправо и на c вверх (при a, c > 0)',['сдвигом на a влево и на c вверх','сдвигом на c вправо и на a вверх','растяжением в a раз']);
return {type:'choice',q:'Как получить график y = |x − a| + c из графика y = |x|?',...r,short:'Вершина «галочки» переезжает в (a; c).',
explain:'Вершина y = |x| — в точке (0; 0), где модуль равен нулю. У y = |x − a| + c модуль равен нулю при x = a, тогда y = c. Вершина — <b>(a; c)</b>: сдвиг на a вправо и на c вверх.',
explain2:'Ловушка «минус — значит влево»: в y = |x − 2| вершина там, где x − 2 = 0, то есть x = 2 — справа. Ищи ноль под модулем.'};},{rule:true});
G(6,()=>{for(;;){const a=nz(-3,3),c=nz(-2,3);if(A(a)===A(c))continue;const vars=[[a,c],[-a,c],[a,-c],[c,a]];if(vars.some(([p,q])=>q<-2||q>4||A(p)>4))continue;
const pics=vars.map(([p,q])=>gpic([absFn(p,q,{col:'var(--accent)'})],{w:150,xr:[-5,5],yr:[-3,6],ticks:false,points:[{x:p,y:q}]}));
const o=shuffle(pics.map((s,i)=>({s,i})));
return {type:'choice',pics:true,q:`Какой рисунок — график функции <span class="m">y = |${xa(a)}|${plusC(c)}</span>? (Клетка — 1.)`,opts:o.map(x=>x.s),ans:o.findIndex(x=>x.i===0),ansText:`галочка с вершиной (${N(a)}; ${N(c)})`,
short:`Вершина (${N(a)}; ${N(c)}).`,
explain:`Вершина там, где модуль равен нулю: ${xa(a)} = 0 → x = ${N(a)}, тогда y = ${N(c)}. Нужна «галочка» с вершиной <b>(${N(a)}; ${N(c)})</b>: на ${A(a)} ${a>0?'вправо':'влево'} и на ${A(c)} ${c>0?'вверх':'вниз'} от начала координат.<br>Ловушки: вершина (${N(-a)}; ${N(c)}) — перепутан знак сдвига; (${N(c)}; ${N(a)}) — перепутаны x и y.`,
explain2:`Проверь точкой: при x = ${N(a+1)} должно быть y = |${N(a+1)} − ${pn(a)}|${plusC(c)} = ${N(1+c)}. На верном рисунке точка (${N(a+1)}; ${N(1+c)}) лежит на графике — на соседней клетке справа от вершины, на 1 выше.`};}});
G(6,()=>{const a=nz(-5,5),c=nz(-6,6);
return PT(`Найди координаты вершины графика <span class="m">y = |${xa(a)}|${plusC(c)}</span>.`,a,c,{
hint:'Вершина — там, где выражение под модулем равно нулю.',short:`${xa(a)} = 0 → x = ${N(a)}, y = ${N(c)}.`,
explain:`Под модулем ноль при x = ${N(a)}. Тогда y = 0${plusC(c)} = ${N(c)}. Это наименьшее значение функции — вершина «галочки»: <b>${P(a,c)}</b>.`,
explain2:`Сравни соседей: x = ${N(a-1)} → y = ${N(1+c)}; x = ${N(a)} → ${N(c)}; x = ${N(a+1)} → ${N(1+c)}. В точке ${N(a)} — «дно», дальше в обе стороны растёт.`,
pic:gpic([absFn(a,c,{col:'var(--accent)'})],{yr:[Math.min(-3,c-1),Math.max(7,c+3)],xr:[-7,7]})});});
G(6,()=>{const a=nz(-4,4),c=R(-3,3);const kind=pick([0,1,2]);const d=kind===0?c-R(1,3):kind===1?c:c+R(1,5);const cnt=kind;
return {type:'num',q:`Сколько общих точек у графика <span class="m">y = |${xa(a)}|${plusC(c)}</span> и прямой <span class="m">y = ${N(d)}</span>?`,ans:cnt,
pic:gpic([absFn(a,c,{col:'var(--accent)'}),{f:()=>d,col:'var(--hl)',dash:'6 4'}],{xr:[-7,7],yr:[Math.min(-3,d-1,c-1),Math.max(7,d+2)]}),
hint:'Найди вершину галочки и сравни её высоту с прямой.',short:`Вершина на высоте ${N(c)}, прямая на ${N(d)} → ${cnt}.`,
explain:`Вершина галочки — (${N(a)}; ${N(c)}), ветви идут вверх. ${d<c?`Прямая y = ${N(d)} ниже вершины — не пересекаются: <b>0</b>.`:d===c?`Прямая проходит ровно через вершину — <b>1</b> общая точка.`:`Прямая выше вершины — пересекает обе ветви: <b>2</b> точки (x = ${N(a)} ± ${d-c}).`}`,
explain2:`Алгебраически: |${xa(a)}|${plusC(c)} = ${N(d)} → |${xa(a)}| = ${N(d-c)}. ${d-c<0?'Модуль отрицательным не бывает — корней нет.':d-c===0?'Один корень x = '+N(a)+'.':'Два корня: '+N(a-(d-c))+' и '+N(a+d-c)+'.'}`};});
G(6,()=>{const a=R(-4,1),b=a+R(1,4);const m=b-a;
return {type:'num',q:`На рисунке — график <span class="m">y = |${xa(a)}| + |${xa(b)}|</span>. Найди наименьшее значение функции.`,ans:m,
pic:gpic([{f:x=>A(x-a)+A(x-b),brk:[a,b],col:'var(--accent)'}],{xr:[-6,6],yr:[-1,9]}),
hint:'Посмотри на «дно» корыта или вспомни про расстояния.',short:`На [${N(a)}; ${N(b)}] график горизонтален: y = ${m}.`,
explain:`На отрезке [${N(a)}; ${N(b)}] модули раскрываются как (${xa(a)}) + (${N(b)} − x) = ${m} — горизонтальный участок, «дно корыта». Снаружи график поднимается. Наименьшее значение — <b>${m}</b>.`,
explain2:`Сумма расстояний от x до ${N(a)} и до ${N(b)} не меньше расстояния между ними: ${N(b)} − ${pn(a)} = ${m}. По рисунку: самая низкая часть графика на высоте ${m}.`};});

/* L7 ★ */
G(7,()=>{const r=ch('в медиане набора точек a₁, …, aₙ',['в среднем арифметическом точек','в самой левой точке','в точке x = 0']);
return {type:'choice',q:'★ Где сумма |x − a₁| + |x − a₂| + … + |x − aₙ| принимает <b>наименьшее</b> значение?',...r,short:'Медиана: слева и справа поровну точек.',
explain:'Разобьём точки на пары: крайние, следующие за ними и т. д. Для каждой пары сумма расстояний минимальна, когда x между ними. Медиана лежит внутри всех пар сразу — поэтому там минимум.<br>Среднее арифметическое — ловушка: для точек 0, 0, 9 среднее 3, сумма расстояний 3 + 3 + 6 = 12, а в медиане 0: 0 + 0 + 9 = 9.',
explain2:'Если сдвинуть x из медианы на 1 вправо, расстояния до точек справа уменьшатся, до точек слева — увеличатся. Слева точек не меньше, чем справа, поэтому сумма не уменьшается.'};},{rule:true,star:true});
G(7,()=>{const n=R(5,13);const f=x=>{let s=0;for(let k=1;k<=n;k++)s+=A(x-k);return s;};let mn=INF;for(let x=0;x<=n+1;x+=0.5)mn=Math.min(mn,f(x));
const med=n%2?(n+1)/2:n/2;ok(f(med)===mn,'median');
return {type:'num',q:`★ Найди наименьшее значение выражения <span class="m">|x − 1| + |x − 2| + … + |x − ${n}|</span>.`,ans:mn,
hint:'Минимум — в медиане чисел 1, 2, …, '+n+'.',short:`В x = ${n%2?med:`[${n/2}; ${n/2+1}]`}: ${mn}.`,
explain:`Медиана чисел 1, …, ${n}: ${n%2?`средняя — ${med}`:`любая точка от ${n/2} до ${n/2+1}`}. Берём x = ${med}:<br>${range(1,n).map(k=>A(med-k)).join(' + ')} = <b>${mn}</b>.`,
explain2:`Пары: (1; ${n}), (2; ${n-1}), … Для пары (k; ${n+1} − k) минимум суммы — расстояние ${n+1} − 2k. Сумма: ${range(1,Math.floor(n/2)).map(k=>n+1-2*k).join(' + ')} = ${mn}${n%2?` (средняя точка ${med} без пары даёт 0)`:''}.`};},{star:true});
G(7,()=>{for(;;){const k=pick([5,7,9]);const pts=sample(range(-20,40),k).sort((p,q)=>p-q);const med=pts[(k-1)/2];const f=x=>pts.reduce((s,p)=>s+A(x-p),0);
let best=null,bv=INF;for(let x=-25;x<=45;x++){const v=f(x);if(v<bv){bv=v;best=x;}}ok(best===med,'shop');
return {type:'num',q:`★ 🏪 Вдоль прямой улицы стоят ${k} домов: на отметках ${pts.map(N).join(', ')} (в сотнях метров). Где поставить магазин, чтобы <b>сумма</b> расстояний от всех домов до него была наименьшей? Запиши отметку.`,ans:med,
hint:'Это минимум суммы модулей |x − a₁| + … + |x − aₙ|.',short:`Медиана: ${N(med)}; сумма ${bv}.`,
explain:`Сумма расстояний — f(x) = ${pts.map(p=>`|${xa(p)}|`).join(' + ')}. Её минимум — в <b>медиане</b>: средний по счёту дом из ${k} — ${(k+1)/2}-й: <b>${N(med)}</b>. Сумма расстояний там ${bv}.`,
explain2:`Почему не среднее арифметическое (${N(Math.round(pts.reduce((s,p)=>s+p,0)/k*100)/100)})? Сдвинемся от ${N(med)} на 1 вправо: к ${(k-1)/2} домам справа станет ближе, а к ${(k+1)/2} домам слева (включая ${N(med)}) — дальше. Сумма вырастет на 1. Так же и влево. f(${N(med)}) = ${bv}, f(${N(med+1)}) = ${f(med+1)}, f(${N(med-1)}) = ${f(med-1)}.`};}},{star:true});
G(7,()=>{for(;;){const k=pick([4,6,8]);const pts=sample(range(-10,20),k).sort((p,q)=>p-q);const L=pts[k/2-1],Rr=pts[k/2];if(Rr-L<2)continue;const f=x=>pts.reduce((s,p)=>s+A(x-p),0);
let bv=INF;for(let x=-15;x<=25;x++)bv=Math.min(bv,f(x));const cnt=range(-15,25).filter(x=>f(x)===bv).length;ok(cnt===Rr-L+1,'evenmed');
return {type:'num',q:`★ Сколько <b>целых</b> x, при которых выражение <span class="m">${pts.map(p=>`|${xa(p)}|`).join(' + ')}</span> принимает наименьшее значение?`,ans:cnt,
hint:'Точек чётное число. Медиана — не точка, а целый отрезок.',short:`Минимум на [${N(L)}; ${N(Rr)}]: целых ${cnt}.`,
explain:`Точки по порядку: ${pts.map(N).join(', ')}. Их ${k} — чётное число, две средние: ${N(L)} и ${N(Rr)}. На всём отрезке [${N(L)}; ${N(Rr)}] слева и справа по ${k/2} точек — сумма одна и та же, минимальная (${bv}).<br>Целых чисел на отрезке: ${N(Rr)} − ${pn(L)} + 1 = <b>${cnt}</b>.`,
explain2:`Проверь: f(${N(L)}) = ${f(L)}, f(${N(Rr)}) = ${f(Rr)} — одинаково, а f(${N(L-1)}) = ${f(L-1)} и f(${N(Rr+1)}) = ${f(Rr+1)} — больше. Внутри отрезка при сдвиге на 1 к ${k/2} точкам приближаемся, от ${k/2} удаляемся — сумма не меняется.`};}},{star:true});

/* L8 ★ */
G(8,()=>{const r=ch('каждое из них равно нулю',['хотя бы одно из них равно нулю','они противоположны','они равны']);
return {type:'choice',q:'★ Сумма двух модулей |A| + |B| равна нулю тогда и только тогда, когда…',...r,short:'Сумма неотрицательных = 0 ⇔ все слагаемые = 0.',
explain:'|A| ≥ 0 и |B| ≥ 0. Если хоть одно больше нуля, сумма больше нуля. Значит, |A| + |B| = 0 ⇔ <b>A = 0 и B = 0</b>.<br>«Противоположны» — ловушка: модули противоположных чисел равны, а не противоположны: |3| + |−3| = 6.',
explain2:'Две гири, вес каждой ≥ 0. Весы показывают 0 — значит, обе невесомые. Этим приёмом решают «одно уравнение с двумя неизвестными».'};},{rule:true,star:true});
G(8,()=>{const k=nz(-3,3),y=nz(-6,6),m=R(-5,5);const x=k*y+m;
const e1=`${xa(m)}${k>0?' − ':' + '}${A(k)===1?'':A(k)}y`;
return PT(`★ Реши уравнение с двумя неизвестными: <span class="m">|${e1}| + |${xa(y,'y')}| = 0</span>. Запиши пару (x; y).`,x,y,{
hint:'Сумма неотрицательных чисел равна нулю, только если каждое равно нулю.',short:`y = ${N(y)}, x = ${N(x)}.`,
explain:`Оба модуля ≥ 0, а сумма 0 → оба равны 0:<br>${xa(y,'y')} = 0 → y = ${N(y)};<br>${e1} = 0 → x = ${N(m)}${k>0?' + ':' − '}${A(k)===1?'':A(k)+'·'}${pn(y)}${k>0?'':''} = ${N(x)}.<br>Ответ: <b>${P(x,y)}</b>.`,
explain2:`Обычно одно уравнение с двумя неизвестными имеет бесконечно много решений. Но модули «зажимают» ответ: любая другая пара даёт положительную сумму. Проверка: |${N(x)}${plusC(-m)}${k>0?' − ':' + '}${A(k)===1?'':A(k)+'·'}${pn(y)}| + |${N(y)}${plusC(-y)}| = 0 + 0 = 0 ✅.`});},{star:true});
G(8,()=>{const n=R(2,9);let c=0;for(let x=-n;x<=n;x++)for(let y=-n;y<=n;y++)if(A(x)+A(y)===n)c++;ok(c===4*n,'diamond');
return {type:'num',q:`★ Сколько точек с <b>целыми</b> координатами лежит на линии <span class="m">|x| + |y| = ${n}</span>?`,ans:c,
pic:plot({xr:[-Math.max(5,n+1),Math.max(5,n+1)],yr:[-Math.max(5,n+1),Math.max(5,n+1)],w:240,ticks:n<=4,segs:[{x1:n,y1:0,x2:0,y2:n,dash:false,col:'var(--accent)',sw:2.2},{x1:0,y1:n,x2:-n,y2:0,dash:false,col:'var(--accent)',sw:2.2},{x1:-n,y1:0,x2:0,y2:-n,dash:false,col:'var(--accent)',sw:2.2},{x1:0,y1:-n,x2:n,y2:0,dash:false,col:'var(--accent)',sw:2.2}]}),
hint:'Для каждого x от −'+n+' до '+n+' посчитай, сколько подходит y.',short:`4 · ${n} = ${c}.`,
explain:`Перебираем x от −${n} до ${n}: |y| = ${n} − |x|.<br>• |x| = ${n} → y = 0: 2 точки;<br>• |x| < ${n} → y = ±(${n} − |x|): по 2 точки на каждое из ${2*n-1} значений x.<br>Итого 2 + 2·${2*n-1} = <b>${c}</b>.`,
explain2:`Это «ромб» (квадрат, повёрнутый на 45°) с вершинами (±${n}; 0), (0; ±${n}). На каждой из 4 сторон ${n+1} целых точек, но вершины посчитаны дважды: 4·${n+1} − 4 = ${c}.`};},{star:true});
G(8,()=>{for(;;){const a=R(1,6),b=R(0,5),c=R(0,4);const f=x=>A(A(A(x)-a)-b);
const cand=new Set();for(const s2 of [1,-1])for(const s1 of [1,-1]){const t=b+s2*c;if(t<0)continue;const u=a+s1*t;if(u<0)continue;cand.add(u);cand.add(-u);}
const roots=[...cand].filter(x=>f(x)===c);let br=0;for(let x=-100;x<=100;x++)if(f(x)===c)br++;ok(br===roots.length,'triple');if(roots.length<2)continue;
return {type:'num',q:`★ Сколько корней имеет уравнение <span class="m">|||x| − ${a}| − ${b}| = ${c}</span>?`,ans:roots.length,
hint:'Снимай модули снаружи: ||x| − '+a+'| = '+b+' ± '+c+', потом |x| = …',short:`Корни: ${fset(roots)}.`,
explain:`1) ||x| − ${a}| − ${b} = ±${c} → ||x| − ${a}| = ${b+c}${c?` или ${N(b-c)}`:''}${b-c<0?' (отрицательное — отбрасываем)':''}.<br>2) Каждое: |x| − ${a} = ±(…) → |x| = ${[...new Set([b+c,b-c].filter(t=>t>=0).flatMap(t=>[a+t,a-t]))].map(u=>u<0?`${N(u)} (нет)`:u).join(', ')}.<br>3) Из |x| = u > 0 — два корня, из u = 0 — один.<br>Корни: ${fset(roots)} — всего <b>${roots.length}</b>.`,
explain2:`Можно нарисовать график y = |||x| − ${a}| − ${b}| — «зигзаг» — и провести прямую y = ${c}. Число пересечений = число корней. Проверка подстановкой: ${roots.slice().sort((p,q)=>p-q).map(x=>`f(${N(x)}) = ${f(x)}`).join(', ')}.`};}},{star:true});

/* ---------- widgets ---------- */
function onTheory(root){
  const w=root.querySelector('#w-dist');
  if(w){w.innerHTML=`<b>Расстояние между точками</b><label>a = <input type="range" id="da" min="-8" max="8" value="-3"><output id="dao"></output></label><label>b = <input type="range" id="db" min="-8" max="8" value="5"><output id="dbo"></output></label><div id="dpic" class="fig" style="margin:6px 0"></div><div id="dout"></div>`;
    const u=()=>{const a=+w.querySelector('#da').value,b=+w.querySelector('#db').value;w.querySelector('#dao').textContent=N(a);w.querySelector('#dbo').textContent=N(b);
      w.querySelector('#dpic').innerHTML=distLine(a,b,{la:'a',lb:'b',zero:true});
      w.querySelector('#dout').innerHTML=`|a − b| = |${N(a)} − ${pn(b)}| = |${N(a-b)}| = <b>${A(a-b)}</b>; |b − a| = |${N(b-a)}| = <b>${A(b-a)}</b>. |a| = ${A(a)}, |b| = ${A(b)}.`;};
    w.querySelectorAll('input').forEach(i=>i.oninput=u);u();}
  const g=root.querySelector('#w-graph');
  if(g){g.innerHTML=`<b>Построй график</b><label>Вид: <select id="gm" style="font-size:16px;padding:4px"><option value="0">y = |x − a| + c</option><option value="1">y = |x − a| + |x − c|</option><option value="2">y = |x − a| − |x − c|</option></select></label>
  <label>a = <input type="range" id="ga" min="-4" max="4" value="0"><output id="gao"></output></label><label>c = <input type="range" id="gc" min="-4" max="4" value="2"><output id="gco"></output></label><div id="gpic" class="fig" style="margin:6px 0"></div><div id="gout" style="line-height:1.6"></div>`;
    const q=id=>g.querySelector('#'+id);
    const u=()=>{const m=+q('gm').value,a=+q('ga').value,c=+q('gc').value;q('gao').textContent=N(a);q('gco').textContent=N(c);let f,txt;
      if(m===0){f=x=>A(x-a)+c;txt=`y = |${xa(a)}|${plusC(c)}: галочка с вершиной <b>(${N(a)}; ${N(c)})</b>. Наименьшее значение ${N(c)}.`;}
      else if(m===1){f=x=>A(x-a)+A(x-c);txt=`y = |${xa(a)}| + |${xa(c)}|: ${a===c?'это 2|'+xa(a)+'| — узкая галочка':`«корыто»: на [${N(Math.min(a,c))}; ${N(Math.max(a,c))}] y = ${A(a-c)} (горизонтально)`}. Наименьшее значение <b>${A(a-c)}</b>.`;}
      else{f=x=>A(x-a)-A(x-c);txt=`y = |${xa(a)}| − |${xa(c)}|: «ступенька» от ${N(-A(a-c))} до ${N(A(a-c))}. Значения всегда между −${A(a-c)} и ${A(a-c)}.`;}
      q('gpic').innerHTML=gpic([{f,brk:[a,c],col:'var(--accent)'}],{yr:[-5,8]});q('gout').innerHTML=txt;};
    g.querySelectorAll('input,select').forEach(i=>{i.oninput=u;i.onchange=u;});u();}
}

window.TOPIC={id:'a7_modulus',title:'Модуль числа',subtitle:'Алгебра · 7 класс',
intro:`<p>Модуль как расстояние на прямой, как его раскрывать, уравнения и неравенства с модулем, сумма модулей и графики-«галочки». В конце — олимпиадные задачи: где поставить магазин (медиана!) и модули в модулях.</p>`,
theory,symbols,figs:{},onTheory,
levels:['Модуль как расстояние','Раскрытие модуля и свойства','Уравнения |x − a| = b','Уравнения посложнее','Неравенства с модулем','Сумма модулей','Графики с модулем','★ Олимпиадные: минимум суммы модулей','★ Олимпиадные: хитрые уравнения'],
gens};
})();
