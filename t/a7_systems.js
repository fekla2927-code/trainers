(function(){
const {R,pick,shuffle,sample,range,plural,gcd}=H;
const N=H.num,M=H.m;
const F=(a,b)=>H.frac(typeof a==='number'?N(a):a,typeof b==='number'?N(b):b);
const nz=(a,b)=>{let v;do{v=R(a,b);}while(v===0);return v;};
const pn=v=>v<0?`(${N(v)})`:N(v);
const ok=(c,msg)=>{if(!c)throw new Error('self-check failed: '+msg);};
const isInt=x=>Math.abs(x-Math.round(x))<1e-9;
function ch(right,wrong){const all=[right,...wrong];if(new Set(all).size!==all.length)return null;const o=shuffle(all.map((s,i)=>({s,i})));return {opts:o.map(x=>x.s),ans:o.findIndex(x=>x.i===0)};}
const gens=[];
const G=(lvl,make,o)=>{o=o||{};gens.push({lvl,star:o.star,rule:o.rule,make:()=>{for(let i=0;i<800;i++){const t=make();if(t){if(t.type==='num')t.ans=Math.round(t.ans*1e9)/1e9;return t;}}throw new Error('gen failed lvl '+lvl);}});};
/* число → дробь, если нужно */
function den(x){for(let d=1;d<=60;d++)if(isInt(x*d))return d;return 0;}
function nh(x){const d=den(x);if(d<=1)return N(Math.round(x));const n=Math.round(Math.abs(x)*d),g=gcd(n,d);return (x<0?'−':'')+F(n/g,d/g);}
/* линейные выражения */
function lin(cs,vs){let s='';cs.forEach((c,i)=>{if(c===0)return;const a=Math.abs(c);const t=(a===1?'':N(a))+vs[i];if(!s)s=(c<0?'−':'')+t;else s+=(c<0?' − ':' + ')+t;});return s||'0';}
const XY=['x','y'];
const cf=(k,v)=>k===1?v:k===-1?'−'+v:N(k)+v;
const eq=(a,b,c)=>`${lin([a,b],XY)} = ${N(c)}`;
const sysH=rows=>`<span class="m" style="display:inline-flex;align-items:center;vertical-align:middle;white-space:nowrap"><span style="font-size:${rows.length>2?3.1:2.2}em;font-weight:200;line-height:1;margin-right:3px">{</span><span style="display:inline-flex;flex-direction:column;line-height:1.45">${rows.map(r=>`<span>${r}</span>`).join('')}</span></span>`;
const S2=(a1,b1,c1,a2,b2,c2)=>sysH([eq(a1,b1,c1),eq(a2,b2,c2)]);
const P=(x,y)=>`(${N(x)}; ${N(y)})`;
/* проверка подстановкой */
const chk=(a,b,c,x,y)=>`${a===1?'':a===-1?'−':N(a)+'·'}${pn(x)} ${b<0?'−':'+'} ${Math.abs(b)===1?'':N(Math.abs(b))+'·'}${pn(y)} = ${N(a*x+b*y)} ${a*x+b*y===c?'✅':'❌ ≠ '+N(c)}`;
/* ответ-пара */
const parsePair=raw=>{const m=String(raw).replace(/[−–—]/g,'-').match(/-?\d+/g);return m&&m.length===2?m.map(Number):null;};
const PT=(q,x,y,extra)=>Object.assign({type:'text',q,ans:[P(x,y)],right:P(x,y),ansText:M(P(x,y)),ph:'(x; y)',keys:['−',';','(',')'],
  check:raw=>{const p=parsePair(raw);return !!p&&p[0]===x&&p[1]===y;}},extra||{});
function solve2(a1,b1,c1,a2,b2,c2){const D=a1*b2-a2*b1;if(D===0)return null;return [(c1*b2-c2*b1)/D,(a1*c2-a2*c1)/D];}
function count2(a1,b1,c1,a2,b2,c2){const D=a1*b2-a2*b1;if(D!==0)return 1;return (a1*c2-a2*c1===0&&b1*c2-b2*c1===0)?Infinity:0;}
/* исключение переменной: шаги сложения */
function elim(a1,b1,c1,a2,b2,c2,v){
  const p1=v==='y'?b1:a1,p2=v==='y'?b2:a2;const g=gcd(p1,p2);let m1=p2/g,m2=-p1/g;if(m1<0){m1=-m1;m2=-m2;}
  const A1=a1*m1,B1=b1*m1,C1=c1*m1,A2=a2*m2,B2=b2*m2,C2=c2*m2;
  const A=A1+A2,B=B1+B2,C=C1+C2;const other=v==='y'?'x':'y';const K=v==='y'?A:B;
  const val=C/K;let s='';
  if(m1===1&&m2===1)s+=`Коэффициенты при ${v} — противоположные числа (${N(p1)} и ${N(p2)}). Сразу <b>складываем</b> уравнения:<br>`;
  else s+=`Чтобы ${v} исчез, умножим ${[m1!==1?`первое уравнение на ${N(m1)}`:'',m2!==1?`${m1!==1?'второе':'второе уравнение'} на ${N(m2)}`:''].filter(Boolean).join(', ')}:<br>${sysH([eq(A1,B1,C1),eq(A2,B2,C2)])}<br>Теперь при ${v} стоят ${N(v==='y'?B1:A1)} и ${N(v==='y'?B2:A2)} — противоположные. Складываем:<br>`;
  s+=`${M(`${cf(K,other)} = ${N(C)}`)} → ${M(`${other} = ${nh(val)}`)}.`;
  return {html:s,val,other};
}
function solveAdd(a1,b1,c1,a2,b2,c2,v){
  const e=elim(a1,b1,c1,a2,b2,c2,v);const [x,y]=solve2(a1,b1,c1,a2,b2,c2);
  // подставляем в уравнение, где коэффициент при v ненулевой
  const useFirst=(v==='y'?b1:a1)!==0;const [a,b,c]=useFirst?[a1,b1,c1]:[a2,b2,c2];
  let back;
  if(v==='y'){back=`Подставим x = ${N(x)} в ${useFirst?'первое':'второе'} уравнение: ${M(`${a===1?'':a===-1?'−':N(a)+'·'}${pn(x)} ${b<0?'−':'+'} ${Math.abs(b)===1?'':N(Math.abs(b))}y = ${N(c)}`)} → ${M(`${b===1?'':b===-1?'−':N(b)}y = ${N(c-a*x)}`)} → ${M(`y = ${N(y)}`)}.`;}
  else{back=`Подставим y = ${N(y)} в ${useFirst?'первое':'второе'} уравнение: ${M(`${a===1?'':a===-1?'−':N(a)}x ${b<0?'−':'+'} ${Math.abs(b)===1?'':N(Math.abs(b))+'·'}${pn(y)} = ${N(c)}`)} → ${M(`${a===1?'':a===-1?'−':N(a)}x = ${N(c-b*y)}`)} → ${M(`x = ${N(x)}`)}.`;}
  return `${e.html}<br>${back}<br>Ответ: <b>${P(x,y)}</b>.`;
}
/* случайная система с целым решением */
function randSys(lim,opt){opt=opt||{};for(;;){const x=R(-6,6),y=R(-6,6);const a1=nz(-lim,lim),b1=nz(-lim,lim),a2=nz(-lim,lim),b2=nz(-lim,lim);
  if(a1*b2-a2*b1===0)continue;if(opt.test&&!opt.test(a1,b1,a2,b2))continue;return {x,y,a1,b1,c1:a1*x+b1*y,a2,b2,c2:a2*x+b2*y};}}

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


/* прямая ax + by = c → для plot */
const L2=(a,b,c,o)=>Object.assign(b===0?{vx:c/a}:{m:-a/b,b:c/b},o||{});

/* ---------- theory ---------- */
const theory=[
{title:'Что такое система уравнений',lvl:0,html:`
<p class="hook">Бургер и кола вместе стоят 350 ₽. Два бургера и кола — 560 ₽. Сколько стоит кола? Ты, скорее всего, уже решил: второй заказ дороже ровно на один бургер, значит, бургер 210 ₽, а кола — 140 ₽. Поздравляю, ты только что решил <b>систему уравнений</b> способом сложения (точнее, вычитания). Осталось научиться делать это с любыми числами.</p>
<div class="box rule"><b>Определение</b><b>Система</b> — несколько уравнений, которые должны выполняться <b>одновременно</b>. Пишут их под фигурной скобкой.<br><b>Решение системы</b> с переменными x и y — <b>пара чисел (x; y)</b>, которая превращает в верное равенство <b>каждое</b> уравнение.</div>
<p>Почему одного уравнения мало? У уравнения x + y = 10 решений бесконечно много: (1; 9), (2; 8), (3,5; 6,5)… Второе уравнение — это вторая «подсказка», которая отсекает лишнее. Как в детективе: одна улика — куча подозреваемых, две улики — один преступник.</p>
<div class="box ex"><b>Пример</b>Является ли пара (2; 3) решением системы ${S2(1,1,5,3,-1,3)}?<br>Первое: 2 + 3 = 5 ✅. Второе: 3·2 − 3 = 3 ✅. Оба верны — <b>да, является</b>.<br>А пара (1; 4)? Первое: 1 + 4 = 5 ✅, второе: 3·1 − 4 = −1 ≠ 3 ❌. <b>Не является</b> — одного верного уравнения мало.</div>
<div class="box err"><b>Частая ошибка</b>Проверить только первое уравнение и успокоиться. Пара должна подходить <b>всем</b> уравнениям. И порядок в паре важен: сначала x, потом y. (2; 3) и (3; 2) — разные пары!</div>
<div class="fact">GPS в твоём телефоне каждую секунду решает систему уравнений: расстояния до спутников дают уравнения, а неизвестные — твои координаты. Неизвестных четыре (три координаты и поправка часов телефона), поэтому нужно минимум 4 спутника.</div>`},
{title:'Способ подстановки',lvl:1,html:`
<div class="box rule"><b>Алгоритм</b><ol class="steps"><li>Из одного уравнения <b>вырази</b> одну переменную через другую (выбирай ту, где коэффициент 1 или −1).</li><li><b>Подставь</b> это выражение в другое уравнение — получится уравнение с одной переменной.</li><li>Реши его.</li><li>Найди вторую переменную по выражению из шага 1.</li><li><b>Проверь</b> пару в обоих уравнениях.</li></ol></div>
<p><b>Почему это работает?</b> Если y = 3 − 2x, то y и «3 − 2x» — одно и то же число. Значит, во втором уравнении можно вместо y написать 3 − 2x. Это как заменить в рецепте «стакан» на «200 мл».</p>
<div class="box ex"><b>Пример</b>${S2(2,1,7,4,-3,9)}<br>1) Из первого: y = 7 − 2x.<br>2) Во второе: 4x − 3(7 − 2x) = 9.<br>3) 4x − 21 + 6x = 9 → 10x = 30 → x = 3.<br>4) y = 7 − 2·3 = 1.<br>5) Проверка: 2·3 + 1 = 7 ✅, 4·3 − 3·1 = 9 ✅. Ответ: <b>(3; 1)</b>.</div>
<div class="box ex"><b>Выражаем x</b>${S2(1,-2,-1,3,1,11)}<br>Из первого: x = 2y − 1. Во второе: 3(2y − 1) + y = 11 → 7y − 3 = 11 → y = 2, x = 3. Ответ: <b>(3; 2)</b>.</div>
<div class="box err"><b>Ловушка со скобками</b>−3(7 − 2x) = −21 <b>+</b> 6x, а не −21 − 6x. Минус перед скобкой меняет знаки всех слагаемых внутри. Ставь скобки, когда подставляешь — всегда!</div>`},
{title:'Способ сложения',lvl:2,html:`
<div class="box rule"><b>Алгоритм</b><ol class="steps"><li>Умножь уравнения на такие числа, чтобы коэффициенты при одной переменной стали <b>противоположными</b> (например, 3y и −3y).</li><li><b>Сложи</b> уравнения: эта переменная исчезнет.</li><li>Реши полученное уравнение, подставь найденное значение в любое уравнение системы.</li></ol></div>
<p><b>Почему можно складывать уравнения?</b> Представь весы в равновесии на двух столах. Если сложить всё, что лежит на левых чашах, и всё, что на правых, — равновесие сохранится. Равное плюс равное — равное.</p>
<div class="box ex"><b>Пример: сразу складываем</b>${S2(3,2,11,5,-2,13)}<br>2y и −2y взаимно уничтожаются: 8x = 24 → x = 3. Из первого: 9 + 2y = 11 → y = 1. Ответ: <b>(3; 1)</b>.</div>
<div class="box ex"><b>Пример: сначала умножаем</b>${S2(2,3,7,3,-4,2)}<br>Чтобы убрать y: первое ·4, второе ·3: 8x + 12y = 28 и 9x − 12y = 6. Сложили: 17x = 34 → x = 2, тогда 4 + 3y = 7 → y = 1. Ответ: <b>(2; 1)</b>.</div>
<div class="box err"><b>Частая ошибка</b>Умножить на число только левую часть: «2x + 3y = 7, ·4 → 8x + 12y = 7». Правую часть тоже надо умножить! Весы должны оставаться в равновесии.</div>
<div class="box tip"><b>Что выбрать?</b>Есть переменная с коэффициентом ±1 — удобна подстановка. Коэффициенты «неудобные» (2x + 3y, 3x − 4y) — удобнее сложение.</div>
<div class="fact">Способ сложения описан ещё в древнекитайской книге «Математика в девяти книгах» (около 2000 лет назад). Китайские математики раскладывали коэффициенты счётными палочками в таблицу и «вычитали строки» — по сути, это метод Гаусса, который в Европе описали лишь в XIX веке.</div>`},
{title:'Графический смысл: сколько решений',lvl:3,html:`
<div class="box rule"><b>Главная идея</b>График уравнения ax + by = c — <b>прямая</b>. Решение системы — точка, которая лежит на <b>обеих</b> прямых, то есть <b>точка пересечения</b>.<br>
• прямые пересекаются → <b>одно</b> решение;<br>• прямые параллельны → <b>нет</b> решений;<br>• прямые совпадают → <b>бесконечно много</b> решений.</div>
<p>Поиграй: двигай ползунки и смотри, как прямые y = k₁x + m₁ и y = k₂x + m₂ то пересекаются, то становятся параллельными.</p>
<div class="widget" id="w-lines"></div>
<div class="box rule"><b>Как узнать без графика</b>Для системы a₁x + b₁y = c₁, a₂x + b₂y = c₂ сравни отношения коэффициентов:<br>
• ${F('a₁','a₂')} ≠ ${F('b₁','b₂')} → одно решение;<br>
• ${F('a₁','a₂')} = ${F('b₁','b₂')} ≠ ${F('c₁','c₂')} → нет решений;<br>
• ${F('a₁','a₂')} = ${F('b₁','b₂')} = ${F('c₁','c₂')} → бесконечно много.</div>
<div class="box ex"><b>Пример</b>${S2(2,-3,5,4,-6,1)}: ${F(2,4)} = ${F(-3,-6)} = ${F(1,2)}, а ${F(5,1)} = 5 — не равно. Прямые параллельны: <b>решений нет</b>. Проверь сложением: первое ·2 даёт 4x − 6y = 10, а второе говорит 4x − 6y = 1. Одно и то же не может быть и 10, и 1!</div>
<div class="box err"><b>Ловушка</b>Решение «на глаз» по графику может быть неточным: если прямые пересекаются в (1,3; 2,7), по клеточкам ты этого не увидишь. График показывает <b>сколько</b> решений и примерно где, а точный ответ даёт алгебра.</div>`},
{title:'Задачи на составление систем',lvl:4,html:`
<div class="box rule"><b>План</b><ol class="steps"><li>Обозначь <b>две</b> неизвестные буквами и запиши, что они значат («x — цена бургера, ₽»).</li><li>Каждое условие задачи переведи в <b>уравнение</b>.</li><li>Реши систему.</li><li>Проверь ответ <b>по тексту</b> задачи (не по уравнениям!) и ответь на заданный вопрос.</li></ol></div>
<div class="box ex"><b>Фазаны и кролики</b>В клетке фазаны и кролики: 35 голов и 94 ноги. Сколько кого?<br>x — фазанов, y — кроликов: ${sysH(['x + y = 35','2x + 4y = 94'])}<br>Первое ·2: 2x + 2y = 70. Вычтем из второго: 2y = 24 → y = 12, x = 23.<br>Проверка: 23 + 12 = 35 голов, 46 + 48 = 94 ноги ✅.</div>
<div class="fact">Задача про фазанов и кроликов — из китайского трактата «Сунь-цзы суань цзин» (примерно IV–V век). Там именно эти числа: 35 голов и 94 ноги. Ей больше 1500 лет, а её до сих пор дают на олимпиадах!</div>
<div class="box ex"><b>Лодка и течение</b>По течению катер идёт со скоростью v + u, против — v − u (v — своя скорость, u — течения). Если по течению 30 км/ч, против 22 км/ч: v + u = 30, v − u = 22. Складываем: 2v = 52, v = 26, u = 4.</div>
<div class="box ex"><b>Двузначное число</b>Число с цифрами a и b равно <b>10a + b</b> (а не ab — это произведение!). Число, записанное наоборот, — 10b + a.</div>
<div class="box err"><b>Частая ошибка</b>Решить систему и забыть, о чём спрашивали. Нашёл x и y — перечитай вопрос: может, нужно x + y или цена двух колы.</div>`},
{title:'Системы посложнее',lvl:5,html:`
<div class="box rule"><b>Сначала упрости</b>• Дроби → умножь уравнение на <b>общий знаменатель</b> (обе части!).<br>• Скобки → раскрой и приведи подобные.<br>• Одинаковые «блоки» (например, ${F(1,'x')} и ${F(1,'y')}) → сделай <b>замену</b>: u = ${F(1,'x')}, v = ${F(1,'y')}.</div>
<div class="box ex"><b>Дроби</b>${sysH([`${F('x',2)} + ${F('y',3)} = 4`,'x − y = 3'])}<br>Первое ·6: 3x + 2y = 24. Из второго x = y + 3: 3y + 9 + 2y = 24 → y = 3, x = 6.</div>
<div class="box ex"><b>Замена</b>${sysH([`${F(6,'x')} + ${F(6,'y')} = 5`,`${F(6,'x')} − ${F(6,'y')} = 1`])}<br>u = ${F(6,'x')}, v = ${F(6,'y')}: u + v = 5, u − v = 1 → u = 3, v = 2. Значит x = 2, y = 3.</div>
<div class="box tip"><b>Лайфхак: симметрия</b>${S2(3,5,19,5,3,13)}<br>Сложи: 8x + 8y = 32 → x + y = 4. Вычти: −2x + 2y = 6 → y − x = 3. Дальше — устно: y = 3,5, x = 0,5. Огромные коэффициенты (2023x + 2025y) с этим приёмом не страшны.</div>`},
{title:'Системы с параметром',lvl:6,html:`
<p>Параметр — это буква (обычно a), которая означает «какое-то число». Спрашивают: при каком a у системы нет решений? одно? бесконечно много?</p>
<div class="box rule"><b>Правило</b>Решений <b>нет</b>, если коэффициенты при x и y пропорциональны, а свободные члены — нет:<br>${F('a₁','a₂')} = ${F('b₁','b₂')} ≠ ${F('c₁','c₂')}.<br>Бесконечно много — если пропорциональны все три.</div>
<div class="box ex"><b>Пример</b>При каком a система ${sysH(['ax + 2y = 5','3x + 6y = 1'])} не имеет решений?<br>Нужно ${F('a',3)} = ${F(2,6)} → a = 1. Проверим свободные члены: ${F(5,1)} ≠ ${F(2,6)} ✅. Ответ: <b>a = 1</b>.</div>
<div class="box ex"><b>Классика</b>${sysH(['x + ay = 1','ax + y = 1'])}<br>При a = 1 оба уравнения — x + y = 1: <b>бесконечно много</b> решений. При a = −1: x − y = 1 и −x + y = 1, то есть x − y = −1 — противоречие, <b>решений нет</b>. При остальных a — одно решение.</div>
<div class="box err"><b>Ловушка</b>Найти a из ${F('a₁','a₂')} = ${F('b₁','b₂')} и забыть проверить свободные члены. Если они тоже пропорциональны, решений не «нет», а бесконечно много!</div>`},
{title:'Олимпиадные приёмы',lvl:7,html:`
<ul class="steps">
<li><b>Сложи всё.</b> ${sysH(['x + y = 5','y + z = 7','z + x = 8'])} Сложим: 2(x + y + z) = 20, x + y + z = 10. Тогда z = 10 − 5 = 5, x = 10 − 7 = 3, y = 10 − 8 = 2. Три уравнения — за минуту!</li>
<li><b>Циклическая симметрия.</b> В системе x + 2y + 3z, 2x + 3y + z, 3x + y + 2z каждая переменная встречается с коэффициентами 1, 2, 3. После сложения: 6(x + y + z) = сумма правых частей.</li>
<li><b>Целые решения.</b> Уравнение ax + by = c с целыми a, b, c имеет целые решения, только если c делится на НОД(a, b). Например, 6x + 9y = 20 в целых числах не решается: левая часть делится на 3, а 20 — нет.</li>
<li><b>Перебор с умом.</b> 7x + 11y = 100 в натуральных: 100 − 11y должно делиться на 7. Перебираем y = 1…9: подходит только y = 4 (100 − 44 = 56 = 7·8). Ответ x = 8, y = 4.</li></ul>`,},
{title:'Шпаргалка',html:`
<ul class="steps">
<li>Решение системы — пара (x; y), подходящая <b>всем</b> уравнениям.</li>
<li>Подстановка: вырази → подставь (в скобках!) → реши → найди вторую.</li>
<li>Сложение: подгони коэффициенты к противоположным → сложи. Умножай <b>обе</b> части.</li>
<li>Пересекаются — 1 решение, параллельны — 0, совпадают — ∞.</li>
<li>${F('a₁','a₂')} = ${F('b₁','b₂')} ≠ ${F('c₁','c₂')} — решений нет.</li>
<li>Олимпиада: сначала попробуй сложить все уравнения.</li></ul>`}
];

const symbols={tab:'Формулы',title:'Записи и правила',rows:[
['{ …','фигурная скобка системы','Уравнения должны выполняться одновременно («и»).',S2(1,1,5,1,-1,1)],
['(x; y)','пара — решение системы','Сначала x, потом y. Порядок важен!','(3; 2) ≠ (2; 3)'],
['y = kx + m','прямая','График линейного уравнения. k — наклон, m — где прямая пересекает ось y.','y = 2x − 1'],
['k₁ ≠ k₂','разные наклоны','Прямые пересекаются → одно решение.','y = x и y = −x'],
['k₁ = k₂, m₁ ≠ m₂','параллельные прямые','Решений нет.','y = 2x + 1 и y = 2x − 3'],
['k₁ = k₂, m₁ = m₂','совпадающие прямые','Бесконечно много решений.','x + y = 2 и 2x + 2y = 4'],
[`${F('a₁','a₂')} = ${F('b₁','b₂')} ≠ ${F('c₁','c₂')}`,'условие «нет решений»','Коэффициенты пропорциональны, свободные члены — нет.','2x + y = 1 и 4x + 2y = 5'],
['10a + b','двузначное число','Цифра десятков a, единиц b.','47 = 10·4 + 7'],
['v ± u','скорость по/против течения','v — своя скорость, u — течения.','v + u = 30, v − u = 22']
],after:`<div class="box tip" style="margin-top:14px"><b>Самое важное</b>Решил — подставь пару в <b>оба</b> уравнения. Это 20 секунд, которые спасают оценку.</div>`};

/* ---------- generators ---------- */
/* L0 */
G(0,()=>{const r=ch('пара чисел, которая обращает в верное равенство каждое уравнение системы',['пара чисел, которая подходит хотя бы к одному уравнению','значение x, при котором первое уравнение верно','сумма корней всех уравнений']);
return {type:'choice',q:'Что называется <b>решением системы</b> двух уравнений с двумя переменными?',...r,
short:'Решение — пара (x; y), подходящая всем уравнениям сразу.',
explain:'Решение системы — это <b>пара чисел (x; y)</b>, которая подходит <b>каждому</b> уравнению. Если пара подходит только одному уравнению — это не решение системы.<br>Пример: (1; 4) подходит к x + y = 5, но не к 3x − y = 3. Значит, решением системы из этих уравнений она не является.',
explain2:'Система — как вход в клуб с двумя охранниками. Пройти можно, только если пропустят <b>оба</b>. Пара чисел — это ты, уравнения — охранники.'};},{rule:true});
G(0,()=>{const x=R(-5,6),y=R(-5,6);const a1=nz(-4,4),b1=nz(-4,4),a2=nz(-4,4),b2=nz(-4,4);if(a1*b2-a2*b1===0)return null;
const c1=a1*x+b1*y,c2=a2*x+b2*y;
const cand=[[y,x],[x+1,y],[x,y-1],[-x,y],[x,-y],[x+b1,y-a1]];const wr=[];for(const [u,v] of cand){if(u===x&&v===y)continue;if(a2*u+b2*v===c2&&a1*u+b1*v===c1)continue;const s=P(u,v);if(!wr.includes(s))wr.push(s);if(wr.length===3)break;}
if(wr.length<3)return null;const r=ch(P(x,y),wr);if(!r)return null;
// trap: x+b1,y-a1 satisfies first eq only
return {type:'choice',q:`Какая пара является решением системы ${S2(a1,b1,c1,a2,b2,c2)}?`,...r,
hint:'Подставь каждую пару в оба уравнения.',short:`${P(x,y)}: ${chk(a1,b1,c1,x,y)}; ${chk(a2,b2,c2,x,y)}.`,
explain:`Подставим ${P(x,y)}:<br>• первое: ${chk(a1,b1,c1,x,y)}<br>• второе: ${chk(a2,b2,c2,x,y)}<br>Оба верны — это решение.<br>Остальные пары хотя бы в одно уравнение не подходят. Например, ${r.opts.filter((_,i)=>i!==r.ans)[0]} — проверь сам.`,
explain2:`Проверяем все варианты по очереди:<br>${r.opts.map(o=>{const [u,v]=parsePair(o);return `${o}: ${chk(a1,b1,c1,u,v)}; ${chk(a2,b2,c2,u,v)}`;}).join('<br>')}`};});
G(0,()=>{const x=R(-4,5),y=R(-4,5);const a1=nz(-3,4),b1=nz(-3,4);const c1=a1*x+b1*y;let a2,b2,c2;
// пара подходит к первому, но не ко второму (или к обоим)
const both=Math.random()<0.4;do{a2=nz(-4,4);b2=nz(-4,4);}while(a1*b2-a2*b1===0);c2=a2*x+b2*y+(both?0:nz(-3,3));
const r=ch(both?'да':'нет',[both?'нет':'да','только первому уравнению — значит, да','нельзя определить без графика']);if(!r)return null;
return {type:'choice',q:`Является ли пара ${P(x,y)} решением системы ${S2(a1,b1,c1,a2,b2,c2)}?`,...r,
short:`Первое: ${chk(a1,b1,c1,x,y)}; второе: ${chk(a2,b2,c2,x,y)}.`,
explain:`Подставляем x = ${N(x)}, y = ${N(y)} в <b>оба</b> уравнения:<br>• ${chk(a1,b1,c1,x,y)}<br>• ${chk(a2,b2,c2,x,y)}<br>${both?'Оба равенства верны → <b>да</b>.':'Первое верно, а второе — нет. Для решения системы нужно, чтобы были верны <b>все</b> уравнения → <b>нет</b>.'}`,
explain2:both?'Пара прошла обоих «охранников» — значит, это решение системы.':`Первое уравнение пара «прошла», а на втором споткнулась: получилось ${N(a2*x+b2*y)} вместо ${N(c2)}. Одного уравнения мало — нужно, чтобы подходили оба.`};});

/* L1 подстановка */
G(1,()=>{const r=ch('выразить одну переменную через другую из одного уравнения',['сложить уравнения','построить графики','подставить числа наугад и проверить']);
return {type:'choice',q:'С чего начинается <b>способ подстановки</b>?',...r,short:'Вырази переменную → подставь в другое уравнение.',
explain:'Способ подстановки: 1) из одного уравнения <b>выражаем</b> одну переменную (например, y = 3 − 2x); 2) <b>подставляем</b> это выражение в другое уравнение; 3) решаем уравнение с одной переменной; 4) находим вторую.',
explain2:'Название подсказывает: «подставить» можно только то, что уже выражено. Сначала получи «y = …», потом вставляй это вместо y во второе уравнение.'};},{rule:true});
G(1,()=>{const x=R(-5,5),k=nz(-3,3),m=nz(-6,6);const y=k*x+m;const a=nz(-4,5),b=nz(-4,4);if(a+b*k===0)return null;const c=a*x+b*y;
const ke=`${k===1?'':k===-1?'−':N(k)}x${m===0?'':m>0?' + '+N(m):' − '+N(-m)}`;
const A=a+b*k,Bm=b*m;
return PT(`Реши систему подстановкой: ${sysH([`y = ${ke}`,eq(a,b,c)])}`,x,y,{
hint:'y уже выражен. Подставь его во второе уравнение (в скобках!).',short:`x = ${N(x)}, y = ${N(y)}.`,
explain:`1) Подставляем y = ${ke} во второе: ${M(`${lin([a],['x'])} ${b<0?'−':'+'} ${Math.abs(b)===1?'':N(Math.abs(b))}(${ke}) = ${N(c)}`)}.<br>2) Раскрываем скобки: ${M(`${lin([a],['x'])} ${b*k<0?'−':'+'} ${cf(Math.abs(b*k),'x')} ${Bm<0?'−':'+'} ${N(Math.abs(Bm))} = ${N(c)}`)}${Bm===0?'':''}.<br>3) ${M(`${cf(A,'x')} = ${N(c)} ${Bm<0?'+':'−'} ${N(Math.abs(Bm))} = ${N(c-Bm)}`)} → x = ${N(x)}.<br>4) y = ${k===1?'':k===-1?'−':N(k)+'·'}${pn(x)} ${m<0?'−':'+'} ${N(Math.abs(m))} = ${N(y)}.<br>Ответ: <b>${P(x,y)}</b>.`,
explain2:`Проверка — лучший друг: подставим ${P(x,y)}.<br>Первое: ${N(k)}·${pn(x)} ${m<0?'−':'+'} ${N(Math.abs(m))} = ${N(y)} ✅ (это и есть y).<br>Второе: ${chk(a,b,c,x,y)}.<br>Главное место, где ошибаются, — знаки при раскрытии скобок: ${N(b)}·(${ke}) = ${cf(b*k,'x')} ${Bm<0?'−':'+'} ${N(Math.abs(Bm))}.`});});
G(1,()=>{const x=R(-5,6),y=R(-5,5);const p=nz(-4,4);const a=nz(-4,4),b=nz(-5,5);if(b-a*p===0)return null;
// x + p y = c1 ; a x + b y = c2
const c1=x+p*y,c2=a*x+b*y;const xe=`${N(c1)} ${p>0?'−':'+'} ${Math.abs(p)===1?'':N(Math.abs(p))}y`;
return PT(`Реши систему: ${S2(1,p,c1,a,b,c2)}`,x,y,{
hint:'В первом уравнении коэффициент при x равен 1. Вырази x.',short:`x = ${xe}, подстановка даёт y = ${N(y)}, x = ${N(x)}.`,
explain:`1) Из первого: ${M(`x = ${xe}`)}.<br>2) Во второе: ${M(`${a===1?'':a===-1?'−':N(a)}(${xe}) ${b<0?'−':'+'} ${Math.abs(b)===1?'':N(Math.abs(b))}y = ${N(c2)}`)}.<br>3) ${M(`${N(a*c1)} ${-a*p<0?'−':'+'} ${cf(Math.abs(a*p),'y')} ${b<0?'−':'+'} ${cf(Math.abs(b),'y')} = ${N(c2)}`)} → ${M(`${cf(b-a*p,'y')} = ${N(c2-a*c1)}`)} → y = ${N(y)}.<br>4) x = ${N(c1)} ${p>0?'−':'+'} ${Math.abs(p)===1?'':N(Math.abs(p))+'·'}${pn(y)} = ${N(x)}.<br>Ответ: <b>${P(x,y)}</b>.`,
explain2:`Другой способ — сложение. Умножим первое уравнение на ${N(-a)} и сложим со вторым — x исчезнет:<br>${solveAdd(1,p,c1,a,b,c2,'x')}<br>Проверка: ${chk(1,p,c1,x,y)}; ${chk(a,b,c2,x,y)}.`});});
G(1,()=>{const k=nz(-4,4),m=nz(-6,6),a=nz(-5,5),b=nz(-5,5),c=R(-9,9);
// y = m + kx  →  a x + b(m + kx) = c
const ye=`${N(m)} ${k<0?'−':'+'} ${Math.abs(k)===1?'':N(Math.abs(k))}x`;
const sg=v=>v<0?'−':'+';
const ok1=`${lin([a],['x'])} ${sg(b*m)} ${N(Math.abs(b*m))} ${sg(b*k)} ${cf(Math.abs(b*k),'x')} = ${N(c)}`;
const w1=`${lin([a],['x'])} ${sg(b*m)} ${N(Math.abs(b*m))} ${sg(-b*k)} ${cf(Math.abs(b*k),'x')} = ${N(c)}`;
const w2=`${lin([a],['x'])} ${sg(b*m)} ${N(Math.abs(m))} ${sg(b*k)} ${cf(Math.abs(b*k),'x')} = ${N(c)}`;
const w3=`${lin([a],['x'])} ${sg(b*m)} ${N(Math.abs(b*m))} ${sg(k)} ${cf(Math.abs(k),'x')} = ${N(c)}`;
if(Math.abs(b)===1)return null;
const r=ch(M(ok1),[M(w1),M(w2),M(w3)]);if(!r)return null;
return {type:'choice',q:`Из первого уравнения системы выразили <span class="m">y = ${ye}</span> и подставили во второе: <span class="m">${lin([a,b],XY)} = ${N(c)}</span>. Какое уравнение получится после раскрытия скобок?`,...r,
short:`${N(b)}·(${ye}) = ${N(b*m)} ${b*k<0?'−':'+'} ${cf(Math.abs(b*k),'x')}.`,
explain:`Подставляем в скобках: ${M(`${lin([a],['x'])} ${b<0?'−':'+'} ${N(Math.abs(b))}(${ye}) = ${N(c)}`)}.<br>Множитель ${N(b)} умножаем на <b>каждое</b> слагаемое в скобке: ${N(b)}·${pn(m)} = ${N(b*m)}, ${N(b)}·${k<0?'(':''}${cf(k,'x')}${k<0?')':''} = ${cf(b*k,'x')}.<br>Получаем ${M(ok1)}.<br>Типичные ошибки: умножить только первое слагаемое скобки или потерять знак «минус».`,
explain2:`Сделай это медленно, как в магазине: «${N(b)} пакета, в каждом по (${ye})». Значит, ${N(b)} раз по ${N(m)} = ${N(b*m)} и ${N(b)} раз по ${cf(k,'x')} = ${cf(b*k,'x')}. Знаки: минус на минус — плюс, минус на плюс — минус.`};});
G(1,()=>{const x=R(-5,6),y=R(-5,6);const p=nz(-3,3),a=nz(-4,4),b=nz(-4,4);if(a+b*p===0)return null;// -p x + y ... use y - p x = c1
const c1=y-p*x,c2=a*x+b*y;const s=x+y;
return {type:'num',q:`Реши систему ${S2(-p,1,c1,a,b,c2)} и запиши в ответ <b>x + y</b>.`,ans:s,
hint:'Вырази y из первого уравнения.',short:`Решение ${P(x,y)}, x + y = ${N(s)}.`,
explain:`1) Из первого: ${M(`y = ${N(c1)} ${p<0?'−':'+'} ${Math.abs(p)===1?'':N(Math.abs(p))}x`)}.<br>2) Во второе: ${M(`${lin([a],['x'])} ${b<0?'−':'+'} ${Math.abs(b)===1?'':N(Math.abs(b))}(${N(c1)} ${p<0?'−':'+'} ${Math.abs(p)===1?'':N(Math.abs(p))}x) = ${N(c2)}`)} → ${M(`${cf(a+b*p,'x')} = ${N(c2-b*c1)}`)} → x = ${N(x)}.<br>3) y = ${N(c1)} ${p<0?'−':'+'} ${Math.abs(p)===1?'':N(Math.abs(p))+'·'}${pn(x)} = ${N(y)}.<br>4) Спрашивают x + y = ${N(x)} + ${pn(y)} = <b>${N(s)}</b>.`,
explain2:`Решаем сложением (другой способ):<br>${solveAdd(-p,1,c1,a,b,c2,'y')}<br>И не забудь: в ответ нужно не пару, а <b>сумму</b> x + y = ${N(s)}.`};});

/* L2 сложение */
G(2,()=>{const r=ch('коэффициенты при одной из переменных — противоположные числа',['коэффициенты при x и y равны','правые части равны','в уравнениях нет минусов']);
return {type:'choice',q:'Когда уравнения системы можно <b>сразу сложить</b>, чтобы одна переменная исчезла?',...r,
short:'Например, 3y и −3y: при сложении получится 0.',
explain:'Переменная исчезает, когда при ней в уравнениях стоят <b>противоположные</b> коэффициенты: 5y и −5y, −x и x. Их сумма равна нулю. Если коэффициенты не противоположные, сначала умножаем уравнения на подходящие числа.',
explain2:'+3 шага вперёд и −3 шага назад = стоишь на месте. Так и 3y + (−3y) = 0y: переменная «уходит», остаётся уравнение с одной буквой.'};},{rule:true});
G(2,()=>{const r=ch('если к равным прибавить равные, получатся равные',['уравнения можно складывать только при одинаковых правых частях','складывать уравнения нельзя, можно только вычитать','потому что x + y = y + x']);
return {type:'choice',q:'Какое свойство позволяет <b>складывать уравнения</b> системы?',...r,
short:'A = B и C = D ⇒ A + C = B + D.',
explain:'Если A = B и C = D, то A + C = B + D: к равным прибавили равные. Поэтому сумма уравнений тоже верна при решении системы.',
explain2:'Две пары весов в равновесии. Сгрузи всё с левых чаш на одну чашу, а всё с правых — на другую. Весы останутся в равновесии.'};},{rule:true});
G(2,()=>{for(;;){const x=R(-6,6),y=R(-6,6);const b=nz(-5,5),a1=nz(-5,5),a2=nz(-5,5);if(a1+a2===0)continue;
const c1=a1*x+b*y,c2=a2*x-b*y;
return PT(`Реши систему способом сложения: ${S2(a1,b,c1,a2,-b,c2)}`,x,y,{hint:`Посмотри на коэффициенты при y: ${N(b)} и ${N(-b)}.`,short:`Сложили: ${cf(a1+a2,'x')} = ${N(c1+c2)}.`,
explain:solveAdd(a1,b,c1,a2,-b,c2,'y'),
explain2:`Проверим ответ ${P(x,y)} в обоих уравнениях:<br>• ${chk(a1,b,c1,x,y)}<br>• ${chk(a2,-b,c2,x,y)}<br>Если бы ты решал подстановкой, получилось бы то же самое — только дольше: коэффициенты неудобные.`});}});
G(2,()=>{const s=randSys(6,{test:(a1,b1,a2,b2)=>Math.abs(b2)!==Math.abs(b1)&&b2%b1===0&&b2/b1!==-1&&Math.abs(b1)>=1});
const {x,y,a1,b1,c1,a2,b2,c2}=s;
return PT(`Реши систему: ${S2(a1,b1,c1,a2,b2,c2)}`,x,y,{hint:`Умножь первое уравнение так, чтобы при y получилось ${N(-b2)}.`,short:`Ответ ${P(x,y)}.`,
explain:solveAdd(a1,b1,c1,a2,b2,c2,'y'),explain2:`Можно убрать и x:<br>${solveAdd(a1,b1,c1,a2,b2,c2,'x')}<br>Ответ тот же. Проверка: ${chk(a1,b1,c1,x,y)}; ${chk(a2,b2,c2,x,y)}.`});});
G(2,()=>{const s=randSys(7,{test:(a1,b1,a2,b2)=>{const g=gcd(b1,b2);return Math.abs(b1)>1&&Math.abs(b2)>1&&g===1&&Math.abs(a1)>1&&Math.abs(a2)>1&&gcd(a1,a2)===1;}});
const {x,y,a1,b1,c1,a2,b2,c2}=s;
return PT(`Реши систему: ${S2(a1,b1,c1,a2,b2,c2)}`,x,y,{hint:'Здесь придётся умножить оба уравнения. Подбери множители, чтобы при y стояли противоположные числа.',short:`Ответ ${P(x,y)}.`,
explain:solveAdd(a1,b1,c1,a2,b2,c2,'y'),explain2:`Другой путь — уберём x:<br>${solveAdd(a1,b1,c1,a2,b2,c2,'x')}<br>Проверка: ${chk(a1,b1,c1,x,y)}; ${chk(a2,b2,c2,x,y)}.`});});
G(2,()=>{const b1=pick([2,3,4,5,6]),b2=pick([3,4,5,6,8,9,10]);if(gcd(b1,b2)===b1||gcd(b1,b2)===b2)return null;const g=gcd(b1,b2);const m1=b2/g,m2=b1/g;
const right=`первое на ${m1}, второе на −${m2}`;const r=ch(right,[`первое на ${b1}, второе на ${b2}`,`первое на ${m2}, второе на −${m1}`,`первое на ${m1}, второе на ${m2}`]);if(!r)return null;
const a1=nz(-5,5),a2=nz(-5,5);
return {type:'choice',q:`Система: ${sysH([`${lin([a1,b1],XY)} = …`,`${lin([a2,b2],XY)} = …`])}<br>На какие числа удобно умножить уравнения, чтобы при сложении исчез <b>y</b>?`,...r,
short:`${N(b1)}·${m1} = ${b1*m1}, ${N(b2)}·(−${m2}) = ${N(-b2*m2)}.`,
explain:`Нужно, чтобы коэффициенты при y стали противоположными. Наименьшее общее кратное ${b1} и ${b2} — ${b1*m1}. Первое ·${m1}: ${b1}y → ${b1*m1}y. Второе ·(−${m2}): ${b2}y → ${N(-b2*m2)}y. В сумме 0.<br>Вариант «на ${m1} и на ${m2}» даёт ${b1*m1}y и ${b2*m2}y — они равны, а не противоположны: их надо было бы <b>вычитать</b>.`,
explain2:`Посчитай каждый вариант: что получится при y и чему равна сумма?<br>${r.opts.map(o=>{const mm=o.match(/на (−?\d+), второе на (−?\d+)/);const u=+mm[1].replace('−','-'),v=+mm[2].replace('−','-');return `${o}: ${cf(b1*u,'y')} + ${pn(b2*v)}y = ${cf(b1*u+b2*v,'y')}`;}).join('<br>')}<br>Ноль — только в правильном варианте.`};});

/* L3 графический смысл */
G(3,()=>{const r=ch('совпадают',['параллельны','пересекаются в одной точке','перпендикулярны']);
return {type:'choice',q:'Система двух линейных уравнений имеет <b>бесконечно много</b> решений, если их графики (прямые)…',...r,short:'Совпадающие прямые — все их точки общие.',
explain:'Каждая общая точка двух прямых — решение системы. Пересекаются → одна общая точка. Параллельны → ни одной. <b>Совпадают</b> → все точки общие, решений бесконечно много.',
explain2:'Пример: x + y = 2 и 2x + 2y = 4. Второе — это первое, умноженное на 2. Это одна и та же прямая, и любая её точка (0; 2), (1; 1), (5; −3)… подходит.'};},{rule:true});
G(3,()=>{const r=ch(`${F('a₁','a₂')} = ${F('b₁','b₂')} ≠ ${F('c₁','c₂')}`,[`${F('a₁','a₂')} ≠ ${F('b₁','b₂')}`,`${F('a₁','a₂')} = ${F('b₁','b₂')} = ${F('c₁','c₂')}`,'a₁ = b₁ и a₂ = b₂']);
return {type:'choice',q:'При каком условии система a₁x + b₁y = c₁, a₂x + b₂y = c₂ <b>не имеет решений</b>?',...r,short:'Коэффициенты при x и y пропорциональны, а свободные члены — нет.',
explain:`Если ${F('a₁','a₂')} = ${F('b₁','b₂')}, прямые параллельны или совпадают. Чтобы решений не было, они должны быть именно параллельными, то есть свободные члены <b>не</b> в той же пропорции: ≠ ${F('c₁','c₂')}.<br>Если и ${F('c₁','c₂')} такое же — прямые совпадают (∞ решений). Если ${F('a₁','a₂')} ≠ ${F('b₁','b₂')} — пересекаются (1 решение).`,
explain2:'Пример: 2x + y = 1 и 4x + 2y = 5. Удвоим первое: 4x + 2y = 2. Но второе требует 5. «Одно и то же равно 2 и 5» — невозможно. Решений нет.'};},{rule:true});
G(3,()=>{const kind=pick([1,0,Infinity]);let a1,b1,c1,a2,b2,c2;
for(;;){a2=nz(-5,5);b2=nz(-5,5);c2=nz(-9,9);if(kind===1){a1=nz(-5,5);b1=nz(-5,5);c1=R(-9,9);if(a1*b2-a2*b1===0)continue;}
else{const t=pick([2,3,-2,-1,-3]);a1=a2*t;b1=b2*t;c1=kind===Infinity?c2*t:c2*t+nz(-4,4);if(Math.abs(a1)>12||Math.abs(b1)>12)continue;}break;}
ok(count2(a1,b1,c1,a2,b2,c2)===kind,'count');
const lab=k=>k===1?'одно решение':k===0?'нет решений':'бесконечно много решений';
const r=ch(lab(kind),[1,0,Infinity].filter(k=>k!==kind).map(lab).concat(['два решения']));
const D=a1*b2-a2*b1;
return {type:'choice',q:`Сколько решений имеет система ${S2(a1,b1,c1,a2,b2,c2)}?`,...r,
short:kind===1?`${F(a1,a2)} ≠ ${F(b1,b2)} — прямые пересекаются.`:`${F(a1,a2)} = ${F(b1,b2)}${kind===0?' ≠ ':' = '}${F(c1,c2===0?'0':c2)}.`,
explain:kind===1?`Сравним отношения коэффициентов: ${F(a1,a2)} и ${F(b1,b2)} — они <b>не равны</b> (${N(a1)}·${pn(b2)} = ${N(a1*b2)}, а ${N(a2)}·${pn(b1)} = ${N(a2*b1)}). Наклоны прямых разные → они пересекаются ровно в одной точке → <b>одно решение</b>.`
:`Первое уравнение — это второе, умноженное на ${N(a1/a2)} в левой части: ${N(a2)}·${pn(a1/a2)} = ${N(a1)}, ${N(b2)}·${pn(a1/a2)} = ${N(b1)}. А правая часть: ${N(c2)}·${pn(a1/a2)} = ${N(c2*a1/a2)}, ${kind===0?`но в первом уравнении ${N(c1)}. Одно и то же выражение не может равняться и ${N(c1)}, и ${N(c2*a1/a2)} → прямые параллельны → <b>нет решений</b>.`:`и в первом уравнении тоже ${N(c1)}. Уравнения равносильны — это одна прямая → <b>бесконечно много решений</b>.`}`,
explain2:kind===1?`Быстрая проверка «крест-накрест»: ${N(a1)}·${pn(b2)} − ${pn(a2)}·${pn(b1)} = ${N(D)}. Это число не равно нулю — значит, наклоны прямых разные и решение ровно одно.`:`Попробуй способ сложения: умножим второе уравнение на ${N(a1/a2)} и вычтем из первого. x и y исчезнут одновременно, останется ${kind===0?`0 = ${N(c1-c2*a1/a2)} — неверное равенство. Значит, решений нет.`:'0 = 0 — верно при любых x и y на этой прямой. Решений бесконечно много.'}`};});
G(3,()=>{for(;;){const x0=R(-4,4),y0=R(-4,4);const ks=sample([[1,1],[-1,1],[2,1],[-2,1],[1,2],[-1,2],[3,1]],2);
const [p1,q1]=ks[0],[p2,q2]=ks[1];const m1=y0-p1*x0/q1,m2=y0-p2*x0/q2;if(!isInt(m1*q1)||!isInt(m2*q2))continue;
// −p x + q y = q m
const A1=-p1,B1=q1,C1=Math.round(q1*m1),A2=-p2,B2=q2,C2=Math.round(q2*m2);
if(Math.abs(m1)>5||Math.abs(m2)>5)continue;
const pic=plot({xr:[-6,6],yr:[-6,6],w:300,lines:[L2(A1,B1,C1,{col:'var(--accent)',label:'1'}),L2(A2,B2,C2,{col:'var(--hl)',label:'2'})]});
return PT(`На рисунке — графики уравнений системы ${S2(A1,B1,C1,A2,B2,C2)}<br>Найди решение системы по графику (и проверь подстановкой).`,x0,y0,{pic,
hint:'Найди точку, где прямые пересекаются. Сначала посмотри, сколько клеток по x, потом — по y.',short:`Прямые пересекаются в ${P(x0,y0)}.`,
explain:`Решение системы — точка пересечения прямых. По клеточкам это ${P(x0,y0)}.<br>Проверка: ${chk(A1,B1,C1,x0,y0)}; ${chk(A2,B2,C2,x0,y0)}.<br>Проверка обязательна: по рисунку легко ошибиться на клетку.`,
explain2:`Решим алгебраически:<br>${solveAdd(A1,B1,C1,A2,B2,C2,'y')}<br>Это та самая точка пересечения.`});}});
G(3,()=>{const a=nz(-4,4),b=nz(-4,4),c=R(-6,6);if(Math.abs(a)===Math.abs(b))return null;const t=pick([2,3,-2]);const want=pick(['none','inf']);
const right=want==='none'?eq(a*t,b*t,c*t+nz(-3,3)):eq(a*t,b*t,c*t);
const w=[eq(a*t,b*t+1,c*t),eq(b*t,a*t,c*t),eq(a*t,-b*t,c*t)];
const wr=w.concat([want==='none'?eq(a*t,b*t,c*t):eq(a*t,b*t,c*t+1)]);const r=ch(M(right),sample(wr.filter(s=>s!==right),3).map(M));if(!r)return null;
return {type:'choice',q:`Первое уравнение системы: <span class="m">${eq(a,b,c)}</span>. Каким должно быть второе, чтобы система <b>${want==='none'?'не имела решений':'имела бесконечно много решений'}</b>?`,...r,
short:want==='none'?`Коэффициенты в ${N(t)} раза больше, а правая часть — нет: прямые параллельны.`:`Это первое уравнение, умноженное на ${N(t)}: та же прямая.`,
explain:`Умножим первое уравнение на ${N(t)}: ${M(eq(a*t,b*t,c*t))}. Это <b>та же самая прямая</b>.<br>${want==='none'?`Чтобы прямые были <b>параллельны</b>, нужны те же коэффициенты при x и y (${N(a*t)} и ${N(b*t)}), но <b>другая</b> правая часть. Подходит ${M(right)}.`:`Значит, ${M(right)} задаёт ту же прямую — все её точки являются решениями.`}<br>Если поменять коэффициент при x или y, прямые станут пересекаться — будет одно решение.`,
explain2:`Сравни отношения: ${F('a₁','a₂')} = ${F(a,a*t)}, ${F('b₁','b₂')} = ${F(b,b*t)} — равны. ${want==='none'?'А свободные члены — в другой пропорции. Итог: «нет решений».':'И свободные члены в той же пропорции. Итог: «бесконечно много».'}`};});

/* L4 текстовые задачи */
G(4,()=>{const r=ch('обозначить две неизвестные величины буквами и записать, что они значат',['сразу сложить все числа из условия','угадать ответ и проверить','построить график']);
return {type:'choice',q:'С чего начинается решение текстовой задачи с помощью системы?',...r,short:'«Пусть x — …, y — …».',
explain:'Первый шаг — <b>ввести переменные</b>: «пусть x — цена бургера (₽), y — цена колы (₽)». Потом каждое условие переводим в уравнение, решаем систему и проверяем по тексту.',
explain2:'Это как подписать коробки при переезде. Если не написать, что лежит в «x», в конце забудешь, что ты нашёл.'};},{rule:true});
G(4,()=>{for(;;){const b=R(12,30)*10,k=R(6,15)*10;const p=R(1,3),q=R(1,3),u=R(1,4),v=R(1,4);if(p*v-u*q===0||(p===u&&q===v))continue;if(u<=p&&v<=q)continue;
const s1=p*b+q*k,s2=u*b+v*k;const ask=pick(['колы','бургера']);const ans=ask==='колы'?k:b;
const t=(n,w)=>`${n===1?'':n+' '}${w}`;
return {type:'num',q:`🍔 В кафе ${t(p,p===1?'бургер':'бургера')} и ${t(q,q===1?'кола':'колы')} стоят ${s1} ₽, а ${t(u,u===1?'бургер':'бургера')} и ${t(v,v===1?'кола':'колы')} — ${s2} ₽. Сколько рублей стоит ${ask==='колы'?'одна кола':'один бургер'}?`,ans,
hint:'x — цена бургера, y — цена колы. Запиши два уравнения.',short:`Бургер ${b} ₽, кола ${k} ₽.`,
explain:`Пусть x — цена бургера, y — цена колы: ${S2(p,q,s1,u,v,s2)}<br>${solveAdd(p,q,s1,u,v,s2,ask==='колы'?'x':'y')}<br>Значит, ${ask==='колы'?`кола стоит <b>${k} ₽</b>`:`бургер стоит <b>${b} ₽</b>`}.`,
explain2:`Проверим по тексту: ${p}·${b} + ${q}·${k} = ${s1} ₽ ✅, ${u}·${b} + ${v}·${k} = ${s2} ₽ ✅.<br>Совет: сравни два заказа — чем они отличаются и на сколько отличается цена. Это и есть вычитание уравнений.`};}});
G(4,()=>{const f=R(8,30),rb=R(5,25);const H_=f+rb,L=2*f+4*rb;const ask=pick(['кроликов','фазанов']);const ans=ask==='кроликов'?rb:f;
return {type:'num',q:`🐇 В клетке сидят фазаны и кролики. Всего ${H_} голов и ${L} ${plural(L,'нога','ноги','ног')}. Сколько в клетке ${ask}?`,ans,
hint:'У фазана 2 ноги, у кролика 4. Голова у каждого одна.',short:`Фазанов ${f}, кроликов ${rb}.`,
explain:`x — фазанов, y — кроликов: ${sysH([`x + y = ${H_}`,`2x + 4y = ${L}`])}<br>Первое ·2: 2x + 2y = ${2*H_}. Вычтем из второго: 2y = ${L-2*H_} → y = ${rb}. Тогда x = ${H_} − ${rb} = ${f}.<br>Ответ: ${ask} <b>${ans}</b>.`,
explain2:`Старинный трюк без уравнений: попроси всех животных поднять по 2 ноги. Поднимется ${2*H_} ног, на полу останется ${L} − ${2*H_} = ${L-2*H_}. Стоят теперь только кролики, у каждого по 2 ноги: кроликов ${L-2*H_} : 2 = ${rb}. Фазанов ${H_} − ${rb} = ${f}.`};});
G(4,()=>{for(;;){const v=R(12,30),u=R(1,5);const t1=R(2,5),t2=R(2,6);const d1=(v+u)*t1,d2=(v-u)*t2;const ask=pick(['течения','катера']);const ans=ask==='течения'?u:v;
return {type:'num',q:`🚤 Катер прошёл ${d1} км по течению реки за ${t1} ч, а ${d2} км против течения — за ${t2} ч. Найди скорость ${ask==='течения'?'течения':'катера в стоячей воде'} (в км/ч).`,ans,
hint:'По течению скорость v + u, против — v − u. Найди их из расстояния и времени.',short:`v + u = ${v+u}, v − u = ${v-u} → v = ${v}, u = ${u}.`,
explain:`Скорость по течению: ${d1} : ${t1} = ${v+u} км/ч, против: ${d2} : ${t2} = ${v-u} км/ч.<br>${sysH([`v + u = ${v+u}`,`v − u = ${v-u}`])}<br>Сложим: 2v = ${2*v} → v = ${v}. Вычтем: 2u = ${2*u} → u = ${u}.<br>Ответ: <b>${ans} км/ч</b>.`,
explain2:`Представь эскалатор: идёшь по движению — скорости складываются, против — вычитаются. Разница между «по» и «против» — это два течения: ${v+u} − ${v-u} = ${2*u}, значит течение ${u} км/ч, а катер — посередине: ${v} км/ч.`};}});
G(4,()=>{for(;;){const a=R(1,8),b=R(a+1,9);const s=a+b,d=9*(b-a);const n=10*a+b;
return {type:'num',q:`🔢 Сумма цифр двузначного числа равна ${s}. Если цифры поменять местами, число увеличится на ${d}. Найди число.`,ans:n,
hint:'Число с цифрами a и b — это 10a + b, а «наоборот» — 10b + a.',short:`a = ${a}, b = ${b}, число ${n}.`,
explain:`Пусть a — цифра десятков, b — единиц. Число 10a + b, перевёрнутое — 10b + a.<br>${sysH([`a + b = ${s}`,`(10b + a) − (10a + b) = ${d}`])} → ${sysH([`a + b = ${s}`,`9b − 9a = ${d}`])} → b − a = ${b-a}.<br>Сложим a + b = ${s} и b − a = ${b-a}: 2b = ${2*b}, b = ${b}, a = ${a}. Число <b>${n}</b>.`,
explain2:`Проверка: ${a} + ${b} = ${s} ✅; ${10*b+a} − ${n} = ${d} ✅.<br>Интересно: при перестановке цифр число всегда меняется на 9·(разность цифр). Здесь ${d} : 9 = ${b-a}.`};}});
G(4,()=>{for(;;){const son=R(6,16),k=pick([2,3]),t=R(2,12);const dad=k*(son+t)-t;if(dad-son<20||dad>60)continue;const sum=dad+son;
return {type:'num',q:`👨‍👦 Папе и сыну вместе ${sum} ${plural(sum,'год','года','лет')}. Через ${t} ${plural(t,'год','года','лет')} папа будет в ${k===2?'2 раза':'3 раза'} старше сына. Сколько лет сыну сейчас?`,ans:son,
hint:`x — возраст папы, y — сына. Через ${t} лет: x + ${t} и y + ${t}.`,short:`Сыну ${son}, папе ${dad}.`,
explain:`${sysH([`x + y = ${sum}`,`x + ${t} = ${k}(y + ${t})`])}<br>Из второго: x = ${k}y + ${k*t-t}. В первое: ${k}y + ${k*t-t} + y = ${sum} → ${k+1}y = ${sum-(k*t-t)} → y = ${son}.<br>Сыну <b>${son}</b>, папе ${dad}.`,
explain2:`Проверка по тексту: ${dad} + ${son} = ${sum} ✅. Через ${t}: папе ${dad+t}, сыну ${son+t}; ${dad+t} = ${k}·${son+t} ✅.<br>Главная ловушка — прибавить ${t} лет только одному. Время идёт для обоих!`};}});
G(4,()=>{const a=R(3,9)*50,c=R(2,a/50-1)*50;const n=R(5,14);const x=R(1,n-1),y=n-x;const S=a*x+c*y;
const right=sysH(['x + y = '+n,`${a}x + ${c}y = ${S}`]);const w1=sysH(['x + y = '+S,`${a}x + ${c}y = ${n}`]);const w2=sysH(['x + y = '+n,`${c}x + ${a}y = ${S}`]);const w3=sysH(['x − y = '+n,`${a}x + ${c}y = ${S}`]);
const r=ch(right,[w1,w2,w3]);
return {type:'choice',q:`🎬 Взрослый билет в кино стоит ${a} ₽, детский — ${c} ₽. Купили ${n} билетов на ${S} ₽. Пусть x — число <b>взрослых</b> билетов, y — <b>детских</b>. Какая система подходит?`,...r,
short:'Количество: x + y; деньги: цена × количество.',
explain:`Всего билетов: x + y = ${n}. Деньги: каждый взрослый — ${a} ₽, значит за взрослые ${a}x, за детские ${c}y. Вместе ${a}x + ${c}y = ${S}.<br>Ловушка: перепутать цены (${c}x + ${a}y) — тогда x означал бы детские билеты, а по условию x — взрослые.`,
explain2:`Проверь «единицы измерения»: x + y — это штуки, значит справа должно быть ${n} (штук). ${a}x — это рубли, значит справа ${S} ₽. В неверных вариантах штуки равны рублям — бессмыслица.`};});

/* L5 посложнее */
G(5,()=>{const r=ch('умножить обе части уравнения на общий знаменатель дробей',['умножить только дробные слагаемые','сложить знаменатели','перевернуть все дроби']);
return {type:'choice',q:'Что лучше сделать первым делом с уравнением системы, в котором есть <b>дроби</b>?',...r,short:'Домножь на общий знаменатель — дроби исчезнут.',
explain:`Умножаем <b>обе части</b> (каждое слагаемое!) на общий знаменатель. Например, ${F('x',2)} + ${F('y',3)} = 4, умножаем на 6: 3x + 2y = 24.`,
explain2:'Частая ошибка — забыть умножить правую часть или слагаемое без дроби. «Обе части» значит всё, что слева, и всё, что справа.'};},{rule:true});
G(5,()=>{for(;;){const p=pick([2,3,4,5]),q=pick([2,3,4,6]);if(p===q)continue;const s=R(-3,4),t=R(-3,4);const x=p*s,y=q*t;const c1=s+t;const a=nz(-3,3),b=nz(-3,3);const c2=a*x+b*y;
const L=p*q/gcd(p,q);const A1=L/p,B1=L/q,C1=L*c1;if(A1*b-a*B1===0)continue;
const fx=(n,v)=>F(v,n);
return PT(`Реши систему: ${sysH([`${fx(p,'x')} + ${fx(q,'y')} = ${N(c1)}`,eq(a,b,c2)])}`,x,y,{hint:`Умножь первое уравнение на ${L}.`,short:`После умножения на ${L}: ${eq(A1,B1,C1)}.`,
explain:`1) Первое ·${L}: ${M(eq(A1,B1,C1))}.<br>2) Решаем систему ${S2(A1,B1,C1,a,b,c2)}<br>${solveAdd(A1,B1,C1,a,b,c2,'x')}`,
explain2:`Проверка в исходном уравнении с дробями: ${F(N(x),p)} + ${F(N(y),q)} = ${N(s)} + ${pn(t)} = ${N(c1)} ✅. Второе: ${chk(a,b,c2,x,y)}.`});}});
G(5,()=>{for(;;){const x=R(-5,5),y=R(-5,5);const k1=R(2,4),m1=nz(-3,3),k2=nz(-3,3),m2=R(2,4);
// k1(x+y) + m1(x−y) = c1 ; k2(x+y) + m2(x−y)... use different blocks: k2(x−y) ... keep generic
const A1=k1+m1,B1=k1-m1,A2=k2+m2,B2=k2-m2;if(A1*B2-A2*B1===0||A1===0||B1===0||A2===0||B2===0)continue;const c1=A1*x+B1*y,c2=A2*x+B2*y;
const br=(k,m)=>`${k===1?'':k===-1?'−':N(k)}(x + y) ${m<0?'−':'+'} ${Math.abs(m)===1?'':N(Math.abs(m))}(x − y)`;
return PT(`Реши систему: ${sysH([`${br(k1,m1)} = ${N(c1)}`,`${br(k2,m2)} = ${N(c2)}`])}`,x,y,{hint:'Раскрой скобки и приведи подобные. Или сделай замену u = x + y, v = x − y.',short:`Ответ ${P(x,y)}.`,
explain:`Раскрываем скобки: ${S2(A1,B1,c1,A2,B2,c2)}<br>${solveAdd(A1,B1,c1,A2,B2,c2,'y')}`,
explain2:`Другой способ — замена u = x + y, v = x − y: ${sysH([`${lin([k1,m1],['u','v'])} = ${N(c1)}`,`${lin([k2,m2],['u','v'])} = ${N(c2)}`])}<br>Решение: u = ${N(x+y)}, v = ${N(x-y)}. Тогда x = (u + v) : 2 = ${N(x)}, y = (u − v) : 2 = ${N(y)}.`});}});
G(5,()=>{for(;;){const V=[1,2,3,6,-1,-2,-3,-6];const x=pick(V),y=pick(V);const a=pick([1,2]),b=pick([1,2,3]),c=pick([1,2]),d=pick([-1,-2,1]);
const A=6*a,B=6*b,C=6*c,D=6*d;if(A*D-B*C===0)continue;const u=6/x,v=6/y;const r1=a*u+b*v,r2=c*u+d*v;// A/x = a*6/x = a*u
const s1=A/x+B/y,s2=C/x+D/y;
const term=(k,den,first)=>`${first?(k<0?'−':''):(k<0?' − ':' + ')}${F(Math.abs(k),den)}`;
return PT(`Реши систему: ${sysH([`${term(A,'x',true)}${term(B,'y')} = ${N(s1)}`,`${term(C,'x',true)}${term(D,'y')} = ${N(s2)}`])}`,x,y,{hint:`Сделай замену u = ${F(6,'x')}, v = ${F(6,'y')}.`,short:`u = ${N(u)}, v = ${N(v)} → x = ${N(x)}, y = ${N(y)}.`,
explain:`Замена: u = ${F(6,'x')}, v = ${F(6,'y')}. Тогда ${F(A,'x')} = ${a===1?'':a}u и т. д.:<br>${sysH([`${lin([a,b],['u','v'])} = ${N(s1)}`,`${lin([c,d],['u','v'])} = ${N(s2)}`])}<br>Решаем: u = ${N(u)}, v = ${N(v)}.<br>Обратно: ${F(6,'x')} = ${N(u)} → x = 6 : ${pn(u)} = ${N(x)}; ${F(6,'y')} = ${N(v)} → y = ${N(y)}.<br>Ответ: <b>${P(x,y)}</b>.`,
explain2:`Проверка: ${F(A,pn(x))} + ${F(B,pn(y))} = ${N(A/x)} + ${pn(B/y)} = ${N(s1)} ✅; ${F(C,pn(x))} + ${F(D,pn(y))} = ${N(C/x)} + ${pn(D/y)} = ${N(s2)} ✅.<br>Замена превращает «страшную» систему с дробями в обычную линейную.`});}});
G(5,()=>{for(;;){const p=R(3,9),q=R(p+1,p+6);const x=R(-6,6),y=R(-6,6);const c1=p*x+q*y,c2=q*x+p*y;const s=x+y;if((c1+c2)%(p+q))continue;
return {type:'num',q:`Не решая систему полностью, найди <b>x + y</b>: ${S2(p,q,c1,q,p,c2)}`,ans:s,
hint:'Сложи уравнения. Что получится при x и при y?',short:`Сложили: ${p+q}(x + y) = ${N(c1+c2)}.`,
explain:`Сложим уравнения: ${p+q}x + ${p+q}y = ${N(c1+c2)}, то есть ${p+q}(x + y) = ${N(c1+c2)}. Отсюда x + y = ${N(c1+c2)} : ${p+q} = <b>${N(s)}</b>.`,
explain2:`Можно решить и «по-честному»: вычтем уравнения: ${lin([p-q,q-p],XY)} = ${N(c1-c2)} → x − y = ${N(x-y)}. Вместе с x + y = ${N(s)}: x = ${N(x)}, y = ${N(y)}. Сумма та же: ${N(s)}. Но сложение — в одно действие!`};}});
G(5,()=>{for(;;){const p=R(1001,2025),d=pick([1,2]);const q=p+d;const x=R(-4,4),y=R(-4,4);if(x===y)continue;const c1=p*x+q*y,c2=q*x+p*y;
return PT(`Реши систему с «огромными» коэффициентами: ${S2(p,q,c1,q,p,c2)}`,x,y,{hint:'Сложи уравнения, потом вычти.',short:`x + y = ${N(x+y)}, x − y = ${N(x-y)}.`,
explain:`Сложим: ${p+q}(x + y) = ${N(c1+c2)} → x + y = ${N(x+y)}.<br>Вычтем из первого второе: ${lin([-d,d],XY)} = ${N(c1-c2)} → y − x = ${N(y-x)}.<br>Теперь ${sysH([`x + y = ${N(x+y)}`,`y − x = ${N(y-x)}`])} → 2y = ${N(2*y)}, y = ${N(y)}, x = ${N(x)}.<br>Ответ: <b>${P(x,y)}</b>.`,
explain2:`Коэффициенты «переставлены»: в первом ${p} и ${q}, во втором ${q} и ${p}. Такая симметрия — сигнал: складывай и вычитай. Проверка: ${p}·${pn(x)} + ${q}·${pn(y)} = ${N(c1)} ✅.`});}});

/* L6 параметр */
G(6,()=>{const r=ch('коэффициенты при x и y пропорциональны, а свободные члены — нет',['коэффициенты при x равны нулю','свободные члены равны','все коэффициенты пропорциональны']);
return {type:'choice',q:'Система с параметром a <b>не имеет решений</b>, когда…',...r,short:`${F('a₁','a₂')} = ${F('b₁','b₂')} ≠ ${F('c₁','c₂')}.`,
explain:`Прямые параллельны, когда их коэффициенты при x и y пропорциональны: ${F('a₁','a₂')} = ${F('b₁','b₂')}. Но если и свободные члены в той же пропорции, прямые совпадают (решений бесконечно много). Поэтому для «нет решений» нужно ещё ≠ ${F('c₁','c₂')}.`,
explain2:'Параллельные прямые — как рельсы: одинаковый наклон, но сдвинуты. Пропорциональные «a и b» — одинаковый наклон, непропорциональные «c» — сдвиг.'};},{rule:true});
G(6,()=>{for(;;){const a2=nz(-4,4),b2=nz(-4,4),c2=R(-6,6);const t=pick([2,3,-2,-3,4]);const b1=b2*t,a=a2*t;let c1=R(-12,12);if(c1===c2*t)continue;
return {type:'num',q:`При каком значении <b>a</b> система ${sysH([`ax ${b1<0?'−':'+'} ${cf(Math.abs(b1),'y')} = ${N(c1)}`,eq(a2,b2,c2)])} <b>не имеет решений</b>?`,ans:a,
hint:`Нужно ${F('a',a2)} = ${F(b1,b2)}.`,short:`${F('a',a2)} = ${F(b1,b2)} = ${N(t)} → a = ${N(a)}.`,
explain:`Решений нет, когда ${F('a',N(a2))} = ${F(N(b1),N(b2))} ≠ ${F(N(c1),N(c2))}.<br>${F(N(b1),N(b2))} = ${N(t)}, значит a = ${N(t)}·${pn(a2)} = <b>${N(a)}</b>.<br>Проверим свободные члены: ${N(c2)}·${pn(t)} = ${N(c2*t)} ≠ ${N(c1)} ✅ — прямые параллельны, а не совпадают.`,
explain2:`При a = ${N(a)} первое уравнение: ${eq(a,b1,c1)}. Умножим второе на ${N(t)}: ${eq(a2*t,b2*t,c2*t)}. Левые части одинаковые, а правые ${N(c1)} и ${N(c2*t)} — разные. Противоречие → решений нет.`};}});
G(6,()=>{for(;;){const a2=nz(-4,4),b2=nz(-4,4),c2=nz(-6,6);const t=pick([2,3,-2,-3]);const a1=a2*t,b1=b2*t;const c=c2*t;
return {type:'num',q:`При каком значении <b>c</b> система ${sysH([`${lin([a1,b1],XY)} = c`,eq(a2,b2,c2)])} имеет <b>бесконечно много</b> решений?`,ans:c,
hint:'Первое уравнение должно получаться из второго умножением на одно число.',short:`Все коэффициенты в ${N(t)} раза больше: c = ${N(c)}.`,
explain:`${F(a1,a2)} = ${F(b1,b2)} = ${N(t)}: левая часть первого — это левая часть второго, умноженная на ${N(t)}. Чтобы уравнения совпали (одна прямая), правая часть тоже должна умножиться: c = ${N(c2)}·${pn(t)} = <b>${N(c)}</b>.`,
explain2:`При любом другом c прямые будут параллельны — решений нет. Бесконечно много бывает только при «идеальном совпадении»: ${eq(a1,b1,c)} — это ${eq(a2,b2,c2)}, умноженное на ${N(t)}.`};}});
G(6,()=>{for(;;){const p=nz(-3,4),q=nz(-4,5),rr=nz(-4,4);if(q-rr===0||rr+p*q===0)continue;const t=R(-5,5);const s=(q-rr)*t;const a=(1+p)*t;
return {type:'num',q:`При каком значении <b>a</b> решение системы ${sysH([`${lin([1,p],XY)} = a`,eq(q,-rr,s)])} удовлетворяет условию <b>x = y</b>?`,ans:a,
hint:'Подставь y = x во второе уравнение и найди x.',short:`x = y = ${N(t)}, a = ${N(a)}.`,
explain:`Если x = y, второе уравнение: ${cf(q,'x')} ${-rr<0?'−':'+'} ${cf(Math.abs(rr),'x')} = ${N(s)} → ${cf(q-rr,'x')} = ${N(s)} → x = ${N(t)}. Значит, y = ${N(t)}.<br>Первое: a = x ${p<0?'−':'+'} ${Math.abs(p)===1?'':N(Math.abs(p))}y = ${N(t)} ${p<0?'−':'+'} ${Math.abs(p)===1?'':N(Math.abs(p))+'·'}${pn(t)} = <b>${N(a)}</b>.`,
explain2:`Проверка: при a = ${N(a)} пара (${N(t)}; ${N(t)}) подходит: ${chk(1,p,a,t,t)}; ${chk(q,-rr,s,t,t)}. А решение у системы одно (коэффициенты не пропорциональны), значит, это и есть оно.`};}});
G(6,()=>{const b=nz(-5,5);const r=ch('при a = 1 — бесконечно много, при a = −1 — нет решений',['при a = 1 — нет решений, при a = −1 — бесконечно много','при a = ±1 — бесконечно много','при a = ±1 — нет решений']);
return {type:'choice',q:`Система ${sysH([`x + ay = ${N(b)}`,`ax + y = ${N(b)}`])}. Что происходит при a = 1 и при a = −1?`,...r,
short:`a = 1: одно и то же уравнение x + y = ${N(b)}. a = −1: противоречие.`,
explain:`a = 1: оба уравнения — x + y = ${N(b)}. Одна прямая → <b>бесконечно много</b> решений.<br>a = −1: x − y = ${N(b)} и −x + y = ${N(b)}, то есть x − y = ${N(-b)}. Но x − y не может равняться и ${N(b)}, и ${N(-b)} → <b>нет решений</b>.<br>При других a решение одно (${F(1,'a')} ≠ ${F('a',1)}).`,
explain2:`Сложим уравнения при a = −1: (x − y) + (−x + y) = ${N(b)} + ${pn(b)} → 0 = ${N(2*b)}. Неверно — значит, решений нет. При a = 1 вычтем: 0 = 0 — верно всегда, решений бесконечно много.`};});

/* L7 ★ хитрое сложение */
G(7,()=>{const r=ch('сложить все уравнения системы',['выразить x из первого уравнения','перемножить уравнения','построить график']);
return {type:'choice',q:'★ В системе x + y = …, y + z = …, z + x = … каждая переменная встречается одинаково. Какой первый шаг самый быстрый?',...r,short:'Сложи всё — получишь x + y + z.',
explain:'Сложив все три уравнения, получаем 2(x + y + z) = сумма правых частей. Зная x + y + z, каждую переменную находим вычитанием одного уравнения: z = (x + y + z) − (x + y).',
explain2:'Это как узнать вес трёх арбузов, если взвешивали их парами: сложи три взвешивания — каждый арбуз посчитан дважды. Раздели на 2 — получишь общий вес.'};},{rule:true,star:true});
G(7,()=>{const x=R(-5,9),y=R(-5,9),z=R(-5,9);const A=x+y,B=y+z,C=z+x;const ask=pick(['x','y','z']);const v={x,y,z}[ask];
const sol=[];for(let a=-20;a<=20;a++)for(let b=-20;b<=20;b++){const c=B-b;if(a+b===A&&c+a===C)sol.push([a,b,c]);}ok(sol.length===1&&sol[0][0]===x,'xyz');
const S=x+y+z;
return {type:'num',q:`★ Реши систему и найди <b>${ask}</b>: ${sysH([`x + y = ${N(A)}`,`y + z = ${N(B)}`,`z + x = ${N(C)}`])}`,ans:v,
hint:'Сложи все три уравнения.',short:`x + y + z = ${N(S)}, ${ask} = ${N(v)}.`,
explain:`Сложим все уравнения: 2x + 2y + 2z = ${N(A+B+C)} → x + y + z = ${N(S)}.<br>${ask==='x'?`x = (x + y + z) − (y + z) = ${N(S)} − ${pn(B)} = <b>${N(x)}</b>`:ask==='y'?`y = (x + y + z) − (z + x) = ${N(S)} − ${pn(C)} = <b>${N(y)}</b>`:`z = (x + y + z) − (x + y) = ${N(S)} − ${pn(A)} = <b>${N(z)}</b>`}.`,
explain2:`Полное решение: x = ${N(x)}, y = ${N(y)}, z = ${N(z)}. Проверка: ${N(x)} + ${pn(y)} = ${N(A)} ✅, ${N(y)} + ${pn(z)} = ${N(B)} ✅, ${N(z)} + ${pn(x)} = ${N(C)} ✅.`};},{star:true});
G(7,()=>{const x=R(-4,6),y=R(-4,6),z=R(-4,6);const A=x+2*y+3*z,B=2*x+3*y+z,C=3*x+y+2*z;const S=x+y+z;
// brute: unique?
let cnt=0;for(let a=-15;a<=15;a++)for(let b=-15;b<=15;b++)for(let c=-15;c<=15;c++)if(a+2*b+3*c===A&&2*a+3*b+c===B&&3*a+b+2*c===C)cnt++;ok(cnt===1,'cyc');
return {type:'num',q:`★ Найди <b>x + y + z</b>: ${sysH([`x + 2y + 3z = ${N(A)}`,`2x + 3y + z = ${N(B)}`,`3x + y + 2z = ${N(C)}`])}`,ans:S,
hint:'Сложи все три уравнения. Сколько раз войдёт каждая переменная?',short:`6(x + y + z) = ${N(A+B+C)}.`,
explain:`При сложении у x коэффициенты 1 + 2 + 3 = 6, у y: 2 + 3 + 1 = 6, у z: 3 + 1 + 2 = 6.<br>6(x + y + z) = ${N(A)} + ${pn(B)} + ${pn(C)} = ${N(A+B+C)} → x + y + z = <b>${N(S)}</b>.`,
explain2:`Если хочется проверить: система имеет единственное решение x = ${N(x)}, y = ${N(y)}, z = ${N(z)}; сумма ${N(S)}. Но олимпиадник не решает систему целиком, когда спрашивают только сумму!`};},{star:true});
G(7,()=>{for(;;){const g=[R(1,12),R(1,12),R(1,12),R(1,12),R(1,12)];const a=g.map((v,i)=>v+g[(i+1)%5]);
let sol=[];for(let t=0;t<=30;t++){const xs=[t];for(let i=0;i<4;i++)xs.push(a[i]-xs[i]);if(xs.every(v=>v>=0)&&xs[4]+xs[0]===a[4])sol.push(xs);}ok(sol.length===1&&sol[0][0]===g[0],'gnomes');
const S=a.reduce((p,q)=>p+q,0);
return {type:'num',q:`★ 🧙 Пять гномов сидят за круглым столом: Ар, Бо, Ви, Гу, Ду (Ду рядом с Аром). У каждой пары соседей вместе монет: Ар + Бо = ${a[0]}, Бо + Ви = ${a[1]}, Ви + Гу = ${a[2]}, Гу + Ду = ${a[3]}, Ду + Ар = ${a[4]}. Сколько монет у Ара?`,ans:g[0],
hint:'Сложи все пять равенств — каждый гном посчитан дважды. Потом вычти две подходящие пары.',short:`Всего ${S/2} монет; у Ара ${g[0]}.`,
explain:`Сложим всё: каждый гном входит в две пары, значит 2·(все монеты) = ${a.join(' + ')} = ${S}, всего ${S/2} монет.<br>Пары (Бо + Ви) и (Гу + Ду) не содержат Ара: ${a[1]} + ${a[3]} = ${a[1]+a[3]}.<br>У Ара: ${S/2} − ${a[1]+a[3]} = <b>${g[0]}</b>.`,
explain2:`Другой путь — «чередование»: Ар = ((Ар + Бо) − (Бо + Ви) + (Ви + Гу) − (Гу + Ду) + (Ду + Ар)) : 2 = (${a[0]} − ${a[1]} + ${a[2]} − ${a[3]} + ${a[4]}) : 2 = ${a[0]-a[1]+a[2]-a[3]+a[4]} : 2 = ${g[0]}.<br>У всех: ${g.join(', ')} — проверь суммы соседей.`};}},{star:true});

/* L8 ★ целые решения */
G(8,()=>{const r=ch('c делится на НОД(a, b)',['a + b делится на c','c — простое число','a и b — чётные']);
return {type:'choice',q:'★ Уравнение ax + by = c (a, b, c — целые) может иметь <b>целые</b> решения, только если…',...r,short:'Левая часть делится на НОД(a, b), значит, и c должно.',
explain:'При целых x, y число ax + by делится на d = НОД(a, b) (каждое слагаемое делится на d). Значит, и c должно делиться на d. Например, 6x + 9y = 20: левая часть делится на 3, а 20 — нет. Целых решений нет.<br>(Верно и обратное: если c делится на НОД, целые решения есть.)',
explain2:'Монеты по 6 и 9 рублей: любая сумма из них делится на 3 (6 = 3·2, 9 = 3·3). Набрать 20 рублей без сдачи невозможно.'};},{rule:true,star:true});
G(8,()=>{for(;;){const p=pick([7,9,11,13]),q=pick([5,7,8,11,12]);if(p===q||gcd(p,q)!==1)continue;const S=R(80,200);
const sol=[];for(let x=1;x*p<S;x++){const r=S-p*x;if(r>0&&r%q===0)sol.push([x,r/q]);}if(sol.length!==1)continue;const [x,y]=sol[0];
return {type:'num',q:`★ ✏️ Карандаш стоит ${p} ₽, ручка — ${q} ₽. Купили несколько карандашей и несколько ручек (хотя бы по одному) и заплатили ровно ${S} ₽. Сколько купили <b>ручек</b>?`,ans:y,
hint:`${p}x + ${q}y = ${S}. Перебери y: ${S} − ${q}y должно делиться на ${p}.`,short:`${p}·${x} + ${q}·${y} = ${S}.`,
explain:`Уравнение ${p}x + ${q}y = ${S}, x, y ≥ 1 — целые. Перебираем y, пока ${q}y < ${S}:<br>${range(1,Math.floor((S-1)/q)).map(v=>{const r=S-q*v;return `y = ${v}: ${S} − ${q*v} = ${r}${r>0&&r%p===0?` = ${p}·${r/p} ✅`:''}`;}).join('; ')}.<br>Подходит только y = <b>${y}</b> (тогда x = ${x}).`,
explain2:`Почему ответ один? Если (x; y) — решение, то следующее получается так: x уменьшаем на ${q}, y увеличиваем на ${p} (сумма не меняется: −${p*q} + ${p*q}). Шаг большой, и при ${S} ₽ второе натуральное решение не помещается.`};}},{star:true});
G(8,()=>{const sp=R(2,10),be=R(2,10),dr=R(2,10);const T=sp+be+dr,L=8*sp+6*be+6*dr,W=be+2*dr;
const sol=[];for(let s=0;s<=T;s++)for(let b=0;s+b<=T;b++){const d=T-s-b;if(8*s+6*b+6*d===L&&b+2*d===W)sol.push([s,b,d]);}ok(sol.length===1,'bugs');
const ask=pick(['пауков','жуков','стрекоз']);const ans=ask==='пауков'?sp:ask==='жуков'?be:dr;
return {type:'num',q:`★ 🕷️ В коробке пауки, жуки и стрекозы — всего ${T}. У них вместе ${L} ног и ${W} пар крыльев. У паука 8 ног и нет крыльев, у жука 6 ног и 1 пара крыльев, у стрекозы 6 ног и 2 пары крыльев. Сколько <b>${ask}</b>?`,ans,
hint:'Сначала по ногам найди пауков: если бы все были шестиногие, ног было бы 6·всего.',short:`Пауков ${sp}, жуков ${be}, стрекоз ${dr}.`,
explain:`Пусть все ${T} существ были бы шестиногими: ${6*T} ног. Лишние ${L} − ${6*T} = ${L-6*T} ног — это по 2 у каждого паука → пауков ${(L-6*T)/2} = ${sp}.<br>Жуков и стрекоз ${T} − ${sp} = ${T-sp}. Крыльев: (жуки + стрекозы) + стрекозы = ${W} → стрекоз ${W} − ${T-sp} = ${dr}, жуков ${be}.<br>Ответ: ${ask} <b>${ans}</b>.`,
explain2:`Это система трёх уравнений: ${sysH([`p + ж + с = ${T}`,`8p + 6ж + 6с = ${L}`,`ж + 2с = ${W}`])} Из первых двух: 8p + 6(${T} − p) = ${L} → 2p = ${L-6*T}. Проверка: ${8*sp} + ${6*be} + ${6*dr} = ${L} ✅.`};},{star:true});
G(8,()=>{for(;;){const p=pick([2,3,4,5]),q=pick([3,5,7,9]);if(p===q||gcd(p,q)!==1)continue;const S=R(30,70);
const sol=[];for(let x=1;p*x<S;x++){const r=S-p*x;if(r%q===0&&r>0)sol.push([x,r/q]);}if(sol.length<2||sol.length>6)continue;
return {type:'num',q:`★ Сколько решений в <b>натуральных</b> числах имеет уравнение <span class="m">${p}x + ${q}y = ${S}</span>?`,ans:sol.length,
hint:`Найди одно решение, остальные получаются сдвигом: x на ${q}, y на ${p}.`,short:`Решения: ${sol.map(s=>P(s[0],s[1])).join(', ')}.`,
explain:`Перебираем y от 1, пока ${q}y < ${S}, и смотрим, делится ли ${S} − ${q}y на ${p}:<br>${sol.map(s=>`y = ${s[1]}: ${S} − ${q*s[1]} = ${p*s[0]} = ${p}·${s[0]} ✅`).join('<br>')}<br>Всего <b>${sol.length}</b>.`,
explain2:`Закономерность: соседние решения отличаются на (${q}; −${p}) по x и y: ${sol.map(s=>P(s[0],s[1])).join(' → ')}. Почему: ${p}·${q} − ${q}·${p} = 0, сумма не меняется. Начни с самого маленького x и шагай, пока y остаётся натуральным.`};}},{star:true});

/* ---------- widget ---------- */
function onTheory(root){
  const w=root.querySelector('#w-lines');if(!w)return;
  w.innerHTML=`<b>Две прямые: y = k₁x + m₁ и y = k₂x + m₂</b>
  <label>k₁ = <input type="range" id="k1" min="-3" max="3" step="0.5" value="1"><output id="k1o"></output></label>
  <label>m₁ = <input type="range" id="m1" min="-5" max="5" step="1" value="1"><output id="m1o"></output></label>
  <label>k₂ = <input type="range" id="k2" min="-3" max="3" step="0.5" value="-1"><output id="k2o"></output></label>
  <label>m₂ = <input type="range" id="m2" min="-5" max="5" step="1" value="3"><output id="m2o"></output></label>
  <div id="lpic" class="fig" style="margin:6px 0"></div><div id="lout" style="line-height:1.7"></div>`;
  const g=id=>w.querySelector('#'+id);
  const u=()=>{const k1=+g('k1').value,m1=+g('m1').value,k2=+g('k2').value,m2=+g('m2').value;['k1','m1','k2','m2'].forEach(i=>g(i+'o').textContent=N(+g(i).value));
    let pts=[],msg;
    if(k1!==k2){const x=(m2-m1)/(k1-k2),y=k1*x+m1;const inR=Math.abs(x)<=6&&Math.abs(y)<=6;if(inR)pts=[{x,y,label:'('+N(Math.round(x*100)/100)+'; '+N(Math.round(y*100)/100)+')'}];
      msg=`Наклоны разные (k₁ ≠ k₂) → прямые <b>пересекаются</b> → <b>одно решение</b>: x = ${nh(x)}, y = ${nh(y)}${inR?'':' (точка за краем рисунка)'}.`;}
    else if(m1!==m2)msg='k₁ = k₂, но m₁ ≠ m₂ → прямые <b>параллельны</b> → <b>решений нет</b>.';
    else msg='k₁ = k₂ и m₁ = m₂ → прямые <b>совпадают</b> → <b>бесконечно много решений</b>.';
    g('lpic').innerHTML=plot({xr:[-6,6],yr:[-6,6],w:300,lines:[{m:k1,b:m1,col:'var(--accent)',label:'1'},{m:k2,b:m2,col:'var(--hl)',label:'2',dash:k1===k2&&m1===m2}],points:pts});
    g('lout').innerHTML=msg;};
  w.querySelectorAll('input').forEach(i=>i.oninput=u);u();
}

window.TOPIC={id:'a7_systems',title:'Системы линейных уравнений',subtitle:'Алгебра · 7 класс',
intro:`<p>Как найти две неизвестные сразу: способ подстановки и способ сложения, что значит система на графике (одна точка, ни одной или бесконечно много), задачи про кафе, кроликов и катера, системы с параметром. В конце — олимпиадные трюки: три уравнения за минуту и целые решения.</p>`,
theory,symbols,figs:{},onTheory,
levels:['Что такое система и её решение','Способ подстановки','Способ сложения','Графический смысл: сколько решений','Задачи на составление систем','Системы посложнее: дроби, скобки, замена','Системы с параметром','★ Олимпиадные: хитрое сложение','★ Олимпиадные: целые решения'],
gens};
})();
