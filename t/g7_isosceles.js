(function(){
const {R,pick,shuffle,sample,range,plural,num:N}=H;
/* =====================================================================
   Geometry SVG helper (math coords, y up → auto-fit into ≤ 320 px)
   ===================================================================== */
const D2R=Math.PI/180;
const add=(a,b)=>[a[0]+b[0],a[1]+b[1]],sub=(a,b)=>[a[0]-b[0],a[1]-b[1]],mul=(a,k)=>[a[0]*k,a[1]*k];
const len=a=>Math.hypot(a[0],a[1]),dot=(a,b)=>a[0]*b[0]+a[1]*b[1];
const unit=a=>{const l=len(a)||1;return [a[0]/l,a[1]/l];};
const polar=(p,L,d)=>[p[0]+L*Math.cos(d*D2R),p[1]+L*Math.sin(d*D2R)];
const mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
const foot=(p,a,b)=>{const d=sub(b,a);const t=dot(sub(p,a),d)/dot(d,d);return lerp(a,b,t);};
const inter=(a,b,c,d)=>{const r=sub(b,a),s=sub(d,c);const den=r[0]*s[1]-r[1]*s[0];const t=((c[0]-a[0])*s[1]-(c[1]-a[1])*s[0])/den;return add(a,mul(r,t));};
const angAt=(v,a,b)=>{const u=unit(sub(a,v)),w=unit(sub(b,v));return Math.acos(Math.max(-1,Math.min(1,dot(u,w))))/D2R;};
const r1=x=>Math.round(x*10)/10;
const tw=(t,fs)=>{t=String(t).replace(/<[^>]+>/g,'');let w=0;for(const ch of t)w+=/[°·,.\s₁₂₃₄]/.test(ch)?fs*0.36:/[0-9]/.test(ch)?fs*0.56:fs*0.64;return w;};
const SUB={A1:'A₁',A2:'A₂',A3:'A₃',A4:'A₄',B1:'B₁',B2:'B₂',B3:'B₃',B4:'B₄'};

function geo(o){
  const P={};for(const k in o.P)if(Array.isArray(o.P[k]))P[k]=o.P[k];const W=o.W||300,MH=o.maxH||220,pad=o.pad==null?30:o.pad;
  const all=Object.values(P).concat(o.extra||[]);
  const x0=Math.min(...all.map(p=>p[0])),x1=Math.max(...all.map(p=>p[0]));
  const y0=Math.min(...all.map(p=>p[1])),y1=Math.max(...all.map(p=>p[1]));
  const bw=Math.max(x1-x0,1e-6),bh=Math.max(y1-y0,1e-6);
  const s=Math.min((W-2*pad)/bw,(MH-2*pad)/bh);
  const w=Math.round(bw*s+2*pad),h=Math.round(bh*s+2*pad);
  const X=p=>[pad+(p[0]-x0)*s,pad+(y1-p[1])*s];
  const Q={};for(const k in P)Q[k]=X(P[k]);
  const g=k=>Array.isArray(k)?X(k):Q[k];
  const polys=o.poly||[];
  const cen=pts=>[pts.reduce((a,p)=>a+p[0],0)/pts.length,pts.reduce((a,p)=>a+p[1],0)/pts.length];
  const allC=cen(Object.values(Q));
  const pstr=pts=>pts.map(p=>r1(p[0])+','+r1(p[1])).join(' ');
  const T=(x,y,t,fs,col,wt,anc)=>`<text x="${r1(x)}" y="${r1(y+fs*0.36)}" text-anchor="${anc||'middle'}" font-size="${fs}" font-weight="${wt||600}" fill="${col||'var(--ink)'}">${t}</text>`;
  const place=(p,d,t,fs,gap)=>{const ww=tw(t,fs),hh=fs*0.78;const k=gap+0.5*(ww*Math.abs(d[0])+hh*Math.abs(d[1]));return [p[0]+d[0]*k,p[1]+d[1]*k];};
  let out=`<svg viewBox="0 0 ${w} ${h}" width="${w}" role="img" aria-label="${o.aria||'Чертёж'}" style="font-family:system-ui,sans-serif">`;
  const LS=[];const ln=(A,B,attr)=>{LS.push([A,B]);return `<line x1="${r1(A[0])}" y1="${r1(A[1])}" x2="${r1(B[0])}" y2="${r1(B[1])}" ${attr}/>`;};
  if(o.grid){const G=o.grid;for(let x=G[0];x<=G[2]+1e-9;x++){const a=X([x,G[1]]),b=X([x,G[3]]);out+=`<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(b[0])}" y2="${r1(b[1])}" stroke="var(--line)" stroke-width="1"/>`;}
    for(let y=G[1];y<=G[3]+1e-9;y++){const a=X([G[0],y]),b=X([G[2],y]);out+=`<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(b[0])}" y2="${r1(b[1])}" stroke="var(--line)" stroke-width="1"/>`;}}
  (o.fill||[]).forEach(f=>{const pts=(f.pts||f).map(g);out+=`<polygon points="${pstr(pts)}" fill="${f.col||'var(--hl)'}" fill-opacity="${f.op||0.35}" stroke="none"/>`;});
  polys.forEach(pl=>{out+=`<polygon points="${pstr(pl.map(g))}" fill="none" stroke="var(--fig)" stroke-width="2.2" stroke-linejoin="round"/>`;pl.forEach((k,i)=>LS.push([g(k),g(pl[(i+1)%pl.length])]));});
  (o.seg||[]).forEach(sg=>{const op=sg[2]||{};let A=g(sg[0]),B=g(sg[1]);if(op.ext){const e=mul(sub(B,A),op.ext);A=sub(A,e);B=add(B,e);}
    out+=ln(A,B,`stroke="${op.col||'var(--fig)'}" stroke-width="${op.sw||1.7}" ${op.dash?'stroke-dasharray="6 4"':''} stroke-linecap="round"`);});
  (o.tick||[]).forEach(tk=>{const A=g(tk[0]),B=g(tk[1]),n=tk[2]||1;const e=unit(sub(B,A)),nn=[-e[1],e[0]],m=mid(A,B);
    for(let i=0;i<n;i++){const c=add(m,mul(e,(i-(n-1)/2)*5));out+=ln(add(c,mul(nn,6)),sub(c,mul(nn,6)),'stroke="var(--fig)" stroke-width="1.7"');}});
  (o.rt||[]).forEach(rt=>{const Vv=g(rt[0]),u=unit(sub(g(rt[1]),Vv)),ww=unit(sub(g(rt[2]),Vv)),k=10;const a=add(Vv,mul(u,k)),b=add(a,mul(ww,k)),c=add(Vv,mul(ww,k));LS.push([a,b],[b,c]);
    out+=`<path d="M${r1(a[0])},${r1(a[1])} L${r1(b[0])},${r1(b[1])} L${r1(c[0])},${r1(c[1])}" fill="none" stroke="var(--fig)" stroke-width="1.5"/>`;});
  const angInfo=(o.ang||[]).map(an=>{const op=an[4]||{};const Vv=g(an[0]),A=g(an[1]),B=g(an[2]);
    const a1=Math.atan2(A[1]-Vv[1],A[0]-Vv[0]);let dl=Math.atan2(B[1]-Vv[1],B[0]-Vv[0])-a1;while(dl>Math.PI)dl-=2*Math.PI;while(dl<=-Math.PI)dl+=2*Math.PI;
    const th=Math.abs(dl);const rr=op.r||(th<0.75?26:19);const n=op.n||1;
    for(let i=0;i<n;i++){const r=rr+i*4;const p=[Vv[0]+r*Math.cos(a1),Vv[1]+r*Math.sin(a1)],q=[Vv[0]+r*Math.cos(a1+dl),Vv[1]+r*Math.sin(a1+dl)];
      out+=`<path d="M${r1(p[0])},${r1(p[1])} A${r},${r} 0 0 ${dl>0?1:0} ${r1(q[0])},${r1(q[1])}" fill="none" stroke="${op.col||'var(--accent)'}" stroke-width="1.6"/>`;
      let prev=p;for(let j=1;j<=6;j++){const an2=a1+dl*j/6;const c=[Vv[0]+r*Math.cos(an2),Vv[1]+r*Math.sin(an2)];LS.push([prev,c]);prev=c;}}
    return {an,op,Vv,a1,dl,th,rr,n};});
  (o.dots||[]).forEach(k=>{const p=g(k);out+=`<circle cx="${r1(p[0])}" cy="${r1(p[1])}" r="2.8" fill="var(--fig)"/>`;});
  /* ---- collision-aware label placement ---- */
  const boxes=[];
  const segRect=(a,b,c,hw,hh)=>{const xmin=c[0]-hw,xmax=c[0]+hw,ymin=c[1]-hh,ymax=c[1]+hh;let t0=0,t1=1,hit=true;const dx=b[0]-a[0],dy=b[1]-a[1];const pp=[-dx,dx,-dy,dy],qq=[a[0]-xmin,xmax-a[0],a[1]-ymin,ymax-a[1]];
    for(let i=0;i<4;i++){if(Math.abs(pp[i])<1e-12){if(qq[i]<0){hit=false;break;}}else{const r=qq[i]/pp[i];if(pp[i]<0){if(r>t1){hit=false;break;}if(r>t0)t0=r;}else{if(r<t0){hit=false;break;}if(r<t1)t1=r;}}}
    if(hit)return -1;const pr=p=>Math.hypot(Math.max(xmin-p[0],0,p[0]-xmax),Math.max(ymin-p[1],0,p[1]-ymax));
    const ps=p=>{const d=sub(b,a);const t=Math.max(0,Math.min(1,dot(sub(p,a),d)/Math.max(dot(d,d),1e-9)));return len(sub(p,lerp(a,b,t)));};
    return Math.min(pr(a),pr(b),ps([xmin,ymin]),ps([xmax,ymin]),ps([xmin,ymax]),ps([xmax,ymax]));};
  const clr=(c,hw,hh)=>{let m=Math.min(c[0]-hw,w-c[0]-hw,c[1]-hh,h-c[1]-hh)+1;for(const L of LS)m=Math.min(m,segRect(L[0],L[1],c,hw,hh));for(const bx of boxes)m=Math.min(m,Math.max(Math.abs(c[0]-bx[0])-hw-bx[2],Math.abs(c[1]-bx[1])-hh-bx[3]));return m;};
  const choose=(cands,t,fs,thr)=>{const hw=tw(t,fs)/2+1,hh=fs*0.4+1;let best=cands[0],bs=-1e9;for(const c of cands){const v=clr(c,hw,hh);if(v>=thr){best=c;break;}if(v>bs){bs=v;best=c;}}boxes.push([best[0],best[1],hw,hh]);return best;};
  let labels='';
  const vdir=k=>{
    if(o.dir&&o.dir[k]!=null){const d=o.dir[k];return [Math.cos(d*D2R),-Math.sin(d*D2R)];}
    const p=Q[k];
    for(const pl of polys){const i=pl.indexOf(k);if(i<0)continue;const n=pl.length;const u1=unit(sub(g(pl[(i-1+n)%n]),p)),u2=unit(sub(g(pl[(i+1)%n]),p));let d=add(u1,u2);
      if(len(d)>0.15)return mul(unit(d),-1);const c=cen(pl.map(g));d=[-u1[1],u1[0]];if(dot(d,sub(c,p))>0)d=mul(d,-1);return d;}
    for(const pl of polys){for(let i=0;i<pl.length;i++){const A=g(pl[i]),B=g(pl[(i+1)%pl.length]);const f=foot(p,A,B);const t=dot(sub(p,A),sub(B,A))/dot(sub(B,A),sub(B,A));
      if(len(sub(f,p))<1&&t>0.02&&t<0.98){const e=unit(sub(B,A));let d=[-e[1],e[0]];if(dot(d,sub(cen(pl.map(g)),p))>0)d=mul(d,-1);return d;}}}
    let d=sub(p,allC);if(len(d)<4)d=[0.7,0.7];return unit(d);};
  (o.txt||[]).forEach(tx=>{const arr=Array.isArray(tx[0]);const p=arr?X(tx[0]):X([tx[0],tx[1]]);const t=arr?tx[1]:tx[2];const op=(arr?tx[2]:tx[3])||{};const fs=op.fs||14;
    boxes.push([p[0],p[1],tw(t,fs)/2+1,fs*0.4+1]);labels+=T(p[0],p[1],t,fs,op.col||'var(--ink)',op.wt||600,op.anc);});
  const labs=o.lab||Object.keys(P);
  labs.forEach(k=>{const t=(o.names&&o.names[k])||SUB[k]||k;const d0=vdir(k);const th0=Math.atan2(d0[1],d0[0]);const cands=[];
    for(const gp of [5,9])for(let j=0;j<=12;j++)for(const sg of (j?[1,-1]:[1])){const th=th0+sg*j*15*D2R;cands.push(place(Q[k],[Math.cos(th),Math.sin(th)],t,15,gp));}
    const p=choose(cands,t,15,2.5);labels+=T(p[0],p[1],t,15,'var(--accent-ink)',700);});
  (o.side||[]).forEach(sd=>{const op=sd[3]||{};const A=g(sd[0]),B=g(sd[1]);const e=unit(sub(B,A));let n=[-e[1],e[0]];const t0=op.t==null?0.5:op.t;
    let c=allC;for(const pl of polys){const i=pl.indexOf(sd[0]),j=pl.indexOf(sd[1]);if(i>=0&&j>=0&&(Math.abs(i-j)===1||Math.abs(i-j)===pl.length-1)){c=cen(pl.map(g));break;}}
    if(dot(n,sub(c,lerp(A,B,t0)))>0)n=mul(n,-1);if(op.flip)n=mul(n,-1);const fs=op.fs||14;const gp=op.gap==null?4:op.gap;const cands=[];
    for(const nn of [n,mul(n,-1)])for(const gg of [gp,gp+5])for(const dt of [0,0.1,-0.1,0.2,-0.2,0.3,-0.3])cands.push(place(lerp(A,B,Math.max(0.08,Math.min(0.92,t0+dt))),nn,sd[2],fs,gg));
    const p=choose(cands,sd[2],fs,2);labels+=T(p[0],p[1],sd[2],fs,op.col||'var(--ink)',600);});
  angInfo.forEach(({an,op,Vv,a1,dl,th,rr,n})=>{if(!an[3])return;const fs=op.fs||14;const rad=Math.max(tw(an[3],fs),fs)/2+2;const d=Math.max(rr+(n-1)*4+rad+3,(rad+3)/Math.sin(th/2));const cands=[];
    for(const dd of [0,7,14,22,32])for(const f of [0,0.3,-0.3,0.6,-0.6]){const am=a1+dl/2+f*dl/2;cands.push([Vv[0]+(d+dd)*Math.cos(am),Vv[1]+(d+dd)*Math.sin(am)]);}
    const p=choose(cands,an[3],fs,1.5);labels+=T(p[0],p[1],an[3],fs,'var(--accent-ink)',700);});
  return out+labels+'</svg>';
}

/* ---------- shared utilities ---------- */
const fig=s=>`<div class="fig">${s}</div>`;
const sq=x=>x*x;
const isInt=x=>Math.abs(x-Math.round(x))<1e-9;
const gens=[];
const G=(lvl,make,o)=>{o=o||{};gens.push({lvl,star:o.star,rule:o.rule,make:()=>{for(let i=0;i<400;i++){const t=make();if(t){if(t.type==='num')t.ans=Math.round(t.ans*1e9)/1e9;return t;}}return null;}});};
/* choice from correct + wrongs; null if not distinct */
const CH=(q,correct,wrongs,extra)=>{const opts=shuffle([correct,...wrongs]);if(new Set(opts).size!==opts.length)return null;return Object.assign({type:'choice',q,opts,ans:opts.indexOf(correct)},extra||{});};
/* radicals: n = k²·m */
const rad=n=>{let k=1,m=n;for(let d=2;d*d<=m;d++)while(m%(d*d)===0){m/=d*d;k*=d;}return {k,m};};
const RS=n=>{const {k,m}=rad(n);return m===1?String(k):(k===1?`√${m}`:`${k}√${m}`);};
const radVal=raw=>{let s=String(raw).replace(/\s+/g,'').replace(/,/g,'.').replace(/[·*×]/g,'').replace(/[()]/g,'').replace(/[−–]/g,'-');
  let m=s.match(/^(\d+(?:\.\d+)?)?√(\d+(?:\.\d+)?)$/);if(m){const k=m[1]?Number(m[1]):1;return k*k*Number(m[2]);}
  if(/^\d+(\.\d+)?$/.test(s))return Number(s)*Number(s);return NaN;};
/* task with answer √n (any equal form accepted: 5√2, √50) */
const RT=(n,o)=>Object.assign({type:'text',ans:[RS(n)],right:RS(n),ansText:RS(n),keys:['√'],ph:'например: 3√2 или 7',check:raw=>Math.abs(radVal(raw)-n)<1e-9*Math.max(1,n)},o);
const mark=s=>`<b style="color:var(--accent-ink)">${s}</b>`;

/* ---------- triangle helpers (7th grade geometry) ---------- */
const tri3=(a,b,c)=>{const x=(c*c+b*b-a*a)/(2*b);return {A:[0,0],C:[b,0],B:[x,Math.sqrt(Math.max(0,c*c-x*x))]};};
const okTri=(a,b,c,m)=>{m=m||1;return a+b>c+m&&a+c>b+m&&b+c>a+m;};
const rot=(p,d)=>{const c=Math.cos(d*D2R),s=Math.sin(d*D2R);return [p[0]*c-p[1]*s,p[0]*s+p[1]*c];};
const NM1={A1:'A₁',B1:'B₁',C1:'C₁',D1:'D₁',M1:'M₁',H1:'H₁'};
const dist=(p,q)=>len(sub(p,q));
/* triangle by base AB (horizontal) and angles at A and B */
const triAB=(al,be,base)=>{base=base||6;const A=[0,0],B=[base,0];const C=inter(A,polar(A,1,al),B,polar(B,1,180-be));return {A,B,C};};
/* random "nice" scalene shape: all angles in [lo,hi], pairwise differ ≥ 8° */
const randShape=(lo,hi)=>{lo=lo||35;hi=hi||95;for(;;){const a=R(lo,hi),b=R(lo,hi),c=180-a-b;if(c<lo||c>hi)continue;if(Math.abs(a-b)<8||Math.abs(a-c)<8||Math.abs(b-c)<8)continue;return {T:triAB(a,b,6),ang:[a,b,c]};}};
/* copy points (src keys) into new keys, optionally mirrored/rotated, placed to the right of ref points */
function placeRight(ref,src,newKeys,o){o=o||{};let pts=src.map(p=>p.slice());if(o.flip)pts=pts.map(p=>[-p[0],p[1]]);pts=pts.map(p=>rot(p,o.rot||0));
  const xs0=ref.map(p=>p[0]),ys0=ref.map(p=>p[1]),xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);
  const span=Math.max(...xs0)-Math.min(...xs0);const dx=Math.max(...xs0)-Math.min(...xs)+(o.gap!=null?o.gap:0.5*span);
  const dy=(Math.min(...ys0)+Math.max(...ys0))/2-(Math.min(...ys)+Math.max(...ys))/2;const out={};newKeys.forEach((k,i)=>out[k]=[pts[i][0]+dx,pts[i][1]+dy]);return out;}
/* pair of triangles ABC and A1B1C1 with marks.
   o.s=[[i,j,n]] equal sides (ticks), o.a=[[i,n]] equal angles (arcs), o.T2 = own second triangle (else congruent copy)
   o.side1/o.side2=[[i,j,text]] labels; o.names2 = names for A1,B1,C1 */
function pairFig(T,o){o=o||{};const K1=['A','B','C'],K2=['A1','B1','C1'];const src=o.T2?[o.T2.A,o.T2.B,o.T2.C]:[T.A,T.B,T.C];
  const P=Object.assign({A:T.A,B:T.B,C:T.C},placeRight([T.A,T.B,T.C],src,K2,{flip:o.flip,rot:o.rot}));
  const tick=[],ang=[],side=[];
  (o.s||[]).forEach(([i,j,n])=>{tick.push([K1[i],K1[j],n],[K2[i],K2[j],n]);});
  (o.a||[]).forEach(([i,n])=>{const ot=[0,1,2].filter(x=>x!==i);ang.push([K1[i],K1[ot[0]],K1[ot[1]],'',{n}],[K2[i],K2[ot[0]],K2[ot[1]],'',{n}]);});
  (o.side1||[]).forEach(([i,j,t])=>side.push([K1[i],K1[j],t]));(o.side2||[]).forEach(([i,j,t])=>side.push([K2[i],K2[j],t]));
  (o.ang1||[]).forEach(([i,t])=>{const ot=[0,1,2].filter(x=>x!==i);ang.push([K1[i],K1[ot[0]],K1[ot[1]],t,{n:1}]);});
  (o.ang2||[]).forEach(([i,t])=>{const ot=[0,1,2].filter(x=>x!==i);ang.push([K2[i],K2[ot[0]],K2[ot[1]],t,{n:1}]);});
  return geo({P,poly:[K1,K2],tick,ang,side,names:Object.assign({},NM1,o.names2||{}),fill:[{pts:K1,op:0.14},{pts:K2,op:0.26}],maxH:o.maxH||150,W:o.W||320,pad:24});}
/* kite: A left, C right on x-axis, B up, D down: AB=AD=p, CB=CD=q, AC=d */
const kiteP=(p,q,d)=>{const x=(p*p+d*d-q*q)/(2*d),y=Math.sqrt(Math.max(0,p*p-x*x));return {A:[0,0],C:[d,0],B:[x,y],D:[x,-y]};};
const kiteOK=(P,d)=>P.B[0]/d>0.22&&P.B[0]/d<0.72&&P.B[1]/d>0.25&&P.B[1]/d<0.72;
/* two segments AB and CD crossing at O: OA=OB=a, OC=OD=c */
const crossP=(a,c,th1,th2)=>{const O=[0,0];const A=polar(O,a,th1),C=polar(O,c,th2);return {O,A,B:mul(A,-1),C,D:mul(C,-1)};};
const opt4=(correct,pool,k)=>{const w=shuffle(pool.filter(x=>x!==correct)).slice(0,k||3);return [correct,...w];};
const LET='АБВГДЕ';
/* order-the-steps task: steps=[[text,deps[]]], canonical order = given order */
function orderTask(q,steps,extra){const n=steps.length;const perm=shuffle(range(0,n-1));const lab=i=>LET[perm.indexOf(i)];
  const list=perm.map((si,j)=>`<b>${LET[j]})</b> ${steps[si][0]}`).join('<br>');
  const valid=ord=>{const pos={};ord.forEach((s,i)=>pos[s]=i);return steps.every((st,i)=>(st[1]||[]).every(d=>pos[d]<pos[i]));};
  const str=ord=>ord.map(lab).join(' → ');const correct=str(range(0,n-1));const wr=new Set();
  for(let t=0;t<300&&wr.size<3;t++){const o=shuffle(range(0,n-1));if(!valid(o))wr.add(str(o));}
  if(wr.size<3)return null;
  return CH(`${q}<div style="margin-top:8px;line-height:1.7">${list}</div>`,correct,[...wr],extra);}

/* =====================================================================
   g7_isosceles — равнобедренный треугольник
   ===================================================================== */
/* isosceles with base AC, apex B; al = base angle */
const isoA=(al,base)=>{base=base||6;return {A:[0,0],C:[base,0],B:[base/2,base/2*Math.tan(al*D2R)]};};
const isoS=(lat,base)=>{const h=Math.sqrt(Math.max(0.01,lat*lat-base*base/4));return {A:[0,0],C:[base,0],B:[base/2,h]};};
const ISO_T=[['A','B',1],['B','C',1]];
const isoFig=(P,o)=>geo(Object.assign({P,poly:[['A','B','C']],fill:[{pts:['A','B','C'],op:0.15}],tick:ISO_T,maxH:170,W:260},o||{}));
/* scalene with apex B, base AC; returns feet: M (median), L (bisector), H (altitude) */
const cevP=(T)=>{const P=Object.assign({},T);P.M=mid(P.A,P.C);const ab=dist(P.A,P.B),cb=dist(P.C,P.B);P.L=lerp(P.A,P.C,ab/(ab+cb));P.H=foot(P.B,P.A,P.C);return P;};

/* ---------- theory figures ---------- */
const fCev=(()=>{const P=cevP(triAB(70,42,7));P.A=[0,0];const P2=cevP({A:[0,0],B:triAB(70,42,7).C,C:[7,0]});
  return P2;})();
const fMed=geo({P:{A:fCev.A,B:fCev.B,C:fCev.C,M:fCev.M},poly:[['A','B','C']],seg:[['B','M',{col:'var(--accent)',sw:2.2}]],tick:[['A','M',1],['M','C',1]],maxH:130,W:200});
const fBis=geo({P:{A:fCev.A,B:fCev.B,C:fCev.C,L:fCev.L},poly:[['A','B','C']],seg:[['B','L',{col:'var(--accent)',sw:2.2}]],ang:[['B','A','L','',{n:1,r:24}],['B','L','C','',{n:1,r:28}]],maxH:130,W:200});
const fAlt=geo({P:{A:fCev.A,B:fCev.B,C:fCev.C,H:fCev.H},poly:[['A','B','C']],seg:[['B','H',{col:'var(--accent)',sw:2.2}]],rt:[['H','C','B']],maxH:130,W:200});
const fObt=(()=>{const P={A:[0,0],C:[4,0],B:[6.5,3]};P.H=foot(P.A,P.B,P.C);P.H=[P.H[0],P.H[1]];const Hh=foot(P.B,P.A,P.C);P.K=Hh;
  return geo({P,poly:[['A','B','C']],seg:[['C','K',{dash:true}],['B','K',{col:'var(--accent)',sw:2.2}]],rt:[['K','A','B']],lab:['A','B','C','K'],names:{K:'H'},maxH:140,W:240});})();
const fIso=isoFig(isoA(65),{side:[['A','C','основание'],['A','B','боковая',{fs:12}],['B','C','боковая',{fs:12}]],ang:[['A','B','C','',{n:1}],['C','A','B','',{n:1}]],maxH:170,W:280});
const fIso3=(()=>{const P=isoA(62);P.D=mid(P.A,P.C);return isoFig(P,{seg:[['B','D',{col:'var(--accent)',sw:2.2}]],tick:[...ISO_T,['A','D',2],['D','C',2]],ang:[['B','A','D','',{n:1,r:26}],['B','D','C','',{n:1,r:30}]],rt:[['D','C','B']],maxH:170,W:260});})();
const fEqui=(()=>{const P=isoA(60);return geo({P,poly:[['A','B','C']],fill:[{pts:['A','B','C'],op:0.15}],tick:[['A','B',1],['B','C',1],['A','C',1]],ang:[['A','B','C','60°',{n:1}],['B','C','A','60°',{n:1}],['C','A','B','60°',{n:1}]],maxH:170,W:230});})();

/* =====================================================================
   THEORY
   ===================================================================== */
const theory=[
{title:'Три главных отрезка треугольника',lvl:0,html:`
<p class="hook">Как разрезать треугольный пирог на два куска с <b>одинаковой площадью</b> одним прямым разрезом из вершины? Как поставить подпорку под треугольную крышу, чтобы она стояла <b>вертикально</b>? Как провести тропинку, которая делит угол парка <b>ровно пополам</b>? Это три разных отрезка — медиана, высота и биссектриса. А в равнобедренном треугольнике они вдруг сливаются в один!</p>
<div class="figrow"><div class="fig">${fMed}<div class="cap">Медиана: AM = MC</div></div><div class="fig">${fBis}<div class="cap">Биссектриса: делит ∠B пополам</div></div><div class="fig">${fAlt}<div class="cap">Высота: BH ⊥ AC</div></div></div>
<div class="box rule"><b>Определения</b>• <b>Медиана</b> — отрезок из вершины в <b>середину</b> противоположной стороны.<br>• <b>Биссектриса</b> — отрезок биссектрисы угла от вершины до противоположной стороны (делит <b>угол</b> пополам).<br>• <b>Высота</b> — <b>перпендикуляр</b>, опущенный из вершины на прямую, содержащую противоположную сторону.</div>
<div class="box tip"><b>Как запомнить</b>«Медиана — мартышка: бегает по сторонам и делит сторону пополам». «Биссектриса — крыса: бегает по углам и делит угол пополам». Высота — как отвес: падает под прямым углом.</div>
<p>У каждого треугольника по <b>три</b> медианы, биссектрисы и высоты (из каждой вершины).</p>
<div class="box err"><b>Высота может быть снаружи</b>В тупоугольном треугольнике высоты из острых углов падают на <b>продолжение</b> стороны.</div>
<div class="fig">${fObt}</div>
<div class="fact">Медиана делит треугольник на два треугольника с равными площадями (у них равные основания и общая высота). Так что разрезать пирог поровну нужно по медиане!</div>`},
{title:'Равнобедренный треугольник и углы при основании',lvl:1,html:`
<div class="box rule"><b>Определение</b>Треугольник называется <b>равнобедренным</b>, если у него две стороны равны. Равные стороны — <b>боковые</b>, третья — <b>основание</b>. Угол между боковыми сторонами — <b>угол при вершине</b>, два других — <b>углы при основании</b>.</div>
<div class="fig">${fIso}</div>
<div class="box rule"><b>Теорема</b>В равнобедренном треугольнике <b>углы при основании равны</b>.</div>
<p><b>Почему.</b> Перегни треугольник по линии, которая делит угол B пополам. Боковые стороны равны — значит, A ляжет точно на C (первый признак: AB = CB, общий отрезок, равные половинки угла). Угол A совпадёт с углом C.</p>
<div class="box ex"><b>Пример</b>В ΔABC AB = BC, ∠A = 70°. Тогда ∠C = 70°, а ∠B = 180° − 70° − 70° = 40° (сумма углов треугольника 180°).</div>
<div class="box tip"><b>Формулы</b>Угол при вершине β, угол при основании α: <span class="m">β = 180° − 2α</span>, <span class="m">α = (180° − β) / 2</span>.</div>
<div class="box err"><b>Ошибка</b>Перепутать, какие углы «при основании». Это углы, прилежащие к основанию (между основанием и боковой стороной), а не угол напротив него.</div>
<div class="fact">Двускатные крыши, фронтоны греческих храмов, буква «Л» и треугольные дорожные знаки — равнобедренные треугольники. Равные скаты крыши дают равные углы наклона — снег и дождь стекают одинаково с обеих сторон.</div>`},
{title:'Медиана = биссектриса = высота',lvl:2,html:`
<div class="box rule"><b>Главное свойство</b>В равнобедренном треугольнике биссектриса, проведённая к <b>основанию</b>, является медианой и высотой. (И наоборот: медиана к основанию — это и биссектриса, и высота; высота к основанию — и медиана, и биссектриса.)</div>
<div class="fig">${fIso3}</div>
<p><b>Почему.</b> Биссектриса BD разрезает треугольник на ΔABD и ΔCBD: AB = CB, BD общая, ∠ABD = ∠CBD → равны по I признаку. Значит, AD = DC (медиана!) и ∠ADB = ∠CDB. А эти углы смежные, в сумме 180°, значит, каждый 90° (высота!).</p>
<p>Подвигай вершину B и посмотри, когда три отрезка совпадают:</p>
<div class="widget" id="w-iso"></div>
<div class="box ex"><b>Пример</b>AB = BC, AC = 12, ∠ABC = 50°, BD — высота. Тогда AD = 6, ∠ABD = 25°.</div>
<div class="box err"><b>Ловушка</b>Свойство работает только для отрезка к <b>основанию</b>! Медиана, проведённая к боковой стороне, обычно не биссектриса и не высота.</div>`},
{title:'Равносторонний треугольник',lvl:3,html:`
<div class="box rule"><b>Определение и свойства</b>Треугольник, у которого <b>все три стороны равны</b>, — равносторонний. Все его углы равны по <b>60°</b>. Каждая медиана — она же биссектриса и высота.</div>
<div class="fig">${fEqui}</div>
<p>Почему углы равны: равносторонний треугольник равнобедренный «с любой стороны», поэтому ∠A = ∠C и ∠A = ∠B. Три равных угла в сумме 180° → по 60°.</p>
<div class="box ex"><b>Пример</b>Периметр 27 → сторона 9. Высота BD делит ∠B = 60° на два угла по 30°.</div>
<div class="fact">Шестиугольные соты пчёл складываются из шести равносторонних треугольников. Так пчёлы тратят меньше всего воска на ячейку заданной площади.</div>`},
{title:'Как узнать, что треугольник равнобедренный',lvl:4,html:`
<div class="box rule"><b>Признак равнобедренного треугольника</b>Если в треугольнике два угла равны, то он равнобедренный (стороны напротив равных углов равны).</div>
<div class="box rule"><b>Ещё признаки</b>Треугольник равнобедренный, если в нём из одной вершины:<br>• медиана является высотой;<br>• биссектриса является высотой;<br>• биссектриса является медианой (это доказывается хитрее — «удвоением медианы», см. ★).</div>
<p><b>Почему медиана-высота даёт равнобедренный.</b> BD ⊥ AC и AD = DC → ΔABD = ΔCBD по I признаку (AD = DC, BD общая, прямые углы) → AB = CB.</p>
<div class="box ex"><b>Пример</b>∠A = ∠C = 65°, AB = 8 → BC = 8 (против равных углов — равные стороны).</div>
<div class="box err"><b>Ошибка</b>Стороны напротив равных углов: против ∠A лежит BC, против ∠C — AB. Значит, AB = BC, а не AB = AC.</div>`},
{title:'Периметры и «два случая»',lvl:5,html:`
<div class="box rule"><b>Периметр</b><span class="m">P = 2a + b</span>, где a — боковая сторона, b — основание.</div>
<div class="box rule"><b>Неравенство треугольника</b>Каждая сторона меньше суммы двух других. Для равнобедренного: <span class="m">b &lt; 2a</span>.</div>
<div class="box ex"><b>Задача-ловушка</b>Две стороны равнобедренного треугольника 4 и 9. Найди периметр.<br>Случай 1: боковые 4, 4, основание 9 — но 4 + 4 = 8 &lt; 9, такого треугольника нет!<br>Случай 2: боковые 9, 9, основание 4 — всё хорошо. P = 22.</div>
<div class="box ex"><b>Медиана и периметры</b>AB = BC, BD — медиана, P(ABC) = 40, P(ABD) = 32. P(ABD) = AB + AD + BD, а AB + AD — это половина P(ABC) = 20. Значит, BD = 32 − 20 = 12.</div>
<div class="box err"><b>Ошибка</b>Считать, что известная сторона — обязательно боковая. Всегда проверяй оба случая.</div>`},
{title:'Задачи на углы',lvl:6,html:`
<div class="box rule"><b>Инструменты</b>Углы при основании равны; сумма углов треугольника 180°; смежные углы в сумме 180°; внешний угол треугольника равен сумме двух внутренних, не смежных с ним.</div>
<div class="box ex"><b>Пример 1</b>Внешний угол при вершине B равнобедренного (AB = BC) треугольника 110°. Он равен ∠A + ∠C = 2∠A → ∠A = 55°.</div>
<div class="box ex"><b>Пример 2</b>Угол при основании 70°, AL — биссектриса угла A. ∠LAC = 35°, ∠ALC = 180° − 35° − 70° = 75°.</div>
<div class="box tip"><b>Совет</b>Обозначь угол при основании за x и выражай всё через x. В конце — уравнение «сумма = 180°».</div>`},
{title:'Идеи для задач со звёздочкой',lvl:7,html:`
<div class="box rule"><b>1. Цепочки равнобедренных</b>Если на рисунке AD = BD, то ∠DAB = ∠DBA. Отмечай равные отрезки, переводи их в равные углы и пиши уравнение. Так решается знаменитый треугольник 36°–72°–72°: биссектриса угла при основании разрезает его на два равнобедренных.</div>
<div class="box rule"><b>2. Зигзаг в угле</b>В угол α укладывают ломаную из равных звеньев, начиная от вершины. Углы при основаниях получающихся равнобедренных треугольников растут: α, 2α, 3α, … Звено можно уложить, пока угол меньше 90°.</div>
<div class="box rule"><b>3. Биссектриса-медиана</b>Если BD — и биссектриса, и медиана, продли BD за D на DE = BD. ΔABD = ΔCED → CE = AB и ∠CED = ∠ABD = ∠CBD → ΔBCE равнобедренный → BC = CE = AB.</div>
<div class="box tip"><b>Задача Лэнгли (1922)</b>В треугольнике 80°–80°–20° проводят два отрезка из вершин основания под углами 60° и 50° — и спрашивают угол между ними. Ответ 30°, но найти его школьными средствами очень непросто! Упрощённые версии этой задачи — в ★ уровне.</div>`},
{title:'Шпаргалка',html:`<ul class="steps"><li>Медиана — в середину стороны; биссектриса — делит угол; высота — перпендикуляр.</li><li>AB = BC → ∠A = ∠C (и наоборот).</li><li>К основанию: медиана = биссектриса = высота.</li><li>Равносторонний: все углы 60°.</li><li>P = 2a + b; b &lt; 2a — проверяй оба случая.</li><li>α = (180° − β)/2.</li></ul>`}
];

const NW=t=>`<span style="white-space:nowrap;font-size:17px">${t}</span>`;
const symbols={tab:'Формулы',title:'Обозначения и формулы темы',rows:[
['AB = BC','Боковые стороны','Равнобедренный треугольник с основанием AC и вершиной B.','AB = BC = 7'],
[NW('∠A = ∠C'),'Углы при основании','Всегда равны в равнобедренном треугольнике.','∠A = ∠C = 70°'],
[NW('β = 180° − 2α'),'Угол при вершине','Через угол при основании α.','α = 70° → β = 40°'],
[NW('α = (180° − β)/2'),'Угол при основании','Через угол при вершине β.','β = 100° → α = 40°'],
['BM','Медиана','AM = MC.','M — середина AC'],
['BL','Биссектриса','∠ABL = ∠LBC.','∠B = 80° → по 40°'],
['BH ⊥ AC','Высота','∠BHA = 90°.','«⊥» — перпендикулярно'],
[NW('P = 2a + b'),'Периметр','a — боковая, b — основание; нужно b &lt; 2a.','2 · 9 + 4 = 22']
],after:`<div class="box tip" style="margin-top:14px"><b>Самое важное</b>В равнобедренном треугольнике отрезок из вершины к основанию — сразу медиана, биссектриса и высота.</div>`};

/* =====================================================================
   GENERATORS
   ===================================================================== */
const CEV=['медиана','биссектриса','высота'];
/* ===== L0 ===== */
G(0,()=>{const k=R(0,2);const defs=['отрезок, соединяющий вершину треугольника с серединой противоположной стороны','отрезок биссектрисы угла треугольника, соединяющий вершину с точкой на противоположной стороне','перпендикуляр, проведённый из вершины треугольника к прямой, содержащей противоположную сторону'];
 const extra='отрезок, соединяющий середины двух сторон треугольника';
 return CH(`Что такое <b>${CEV[k]}</b> треугольника?`,defs[k],[...defs.filter((_,i)=>i!==k),extra].map(s=>s),
 {short:`${CEV[k][0].toUpperCase()+CEV[k].slice(1)} — ${defs[k]}.`,
 explain:`<b>${CEV[k][0].toUpperCase()+CEV[k].slice(1)}</b> — ${defs[k]}.<br>Остальные варианты: медиана делит пополам <b>сторону</b>, биссектриса — <b>угол</b>, высота образует <b>прямой угол</b>. Отрезок между серединами двух сторон — это средняя линия (8 класс).`,
 explain2:'Запоминалка: «Медиана — мартышка, бегает по сторонам и делит сторону пополам. Биссектриса — крыса, бегает по углам и делит угол пополам. Высота — отвес, падает под прямым углом».'});},{rule:true});
G(0,()=>CH('Где лежит высота, проведённая из вершины <b>острого</b> угла тупоугольного треугольника?','Вне треугольника: она падает на продолжение противоположной стороны',['Внутри треугольника, как обычно','Совпадает со стороной треугольника','Такой высоты не существует'],
 {short:'В тупоугольном треугольнике две высоты — снаружи.',
 explain:`Высота — перпендикуляр к <b>прямой</b>, содержащей сторону. В тупоугольном треугольнике перпендикуляр из острого угла падает на продолжение стороны, за тупой угол, — <b>вне треугольника</b>. Внутри лежит только высота из тупого угла. (Совпадает со стороной высота в прямоугольном треугольнике — там катет и есть высота.)${fig(fObt)}`,
 explain2:'Представь: ты стоишь в точке B и бросаешь камень вертикально вниз на дорогу AC. Если точка B «нависает» за краем C, камень упадёт мимо отрезка AC — на продолжение дороги.'}),{rule:true});
G(0,()=>{const sh=randShape(40,95);const T=sh.T;/* base AB from triAB → rename so apex is B, base A..C */const P0=cevP({A:T.A,C:T.B,B:T.C});
 const k=R(0,2);const ft=['M','L','H'][k];const P={A:P0.A,B:P0.B,C:P0.C,D:P0[ft]};if(dist(P0.M,P0.L)<0.5||dist(P0.L,P0.H)<0.5)return null;
 const o={P,poly:[['A','B','C']],seg:[['B','D',{col:'var(--accent)',sw:2.2}]],maxH:160,W:260};
 if(k===0)o.tick=[['A','D',1],['D','C',1]];if(k===1)o.ang=[['B','A','D','',{n:1,r:26}],['B','D','C','',{n:1,r:30}]];if(k===2)o.rt=[['D','C','B']];
 const opts=['медиана','биссектриса','высота','средняя линия'];
 return {type:'choice',q:'Что такое отрезок BD на рисунке? (Смотри на отметки: чёрточки, дужки, прямой угол.)',pic:geo(o),opts,ans:k,
  short:['Чёрточки: AD = DC → медиана.','Дужки: ∠ABD = ∠DBC → биссектриса.','Прямой угол: BD ⊥ AC → высота.'][k],
  explain:[`Чёрточки показывают AD = DC: точка D — середина стороны AC. Отрезок из вершины в середину противоположной стороны — <b>медиана</b>. Угол B она пополам не делит, и прямого угла нет.`,`Дужки показывают ∠ABD = ∠DBC: отрезок делит угол B пополам — <b>биссектриса</b>. Сторону AC он делит не пополам.`,`Значок прямого угла: BD ⊥ AC — <b>высота</b>. Она не обязана делить пополам ни сторону, ни угол.`][k],
  explain2:'Чёрточки на стороне → что-то делит сторону пополам (медиана). Дужки в угле → делят угол (биссектриса). Квадратик → перпендикуляр (высота). «Средняя линия» соединяет середины двух сторон, а не вершину со стороной.'};});
G(0,()=>{const k=R(0,2);const sh=randShape(40,95);const T=sh.T;const P0=cevP({A:T.A,C:T.B,B:T.C});const ft=['M','L','H'][k];const P={A:P0.A,B:P0.B,C:P0.C,D:P0[ft]};
 const o={P,poly:[['A','B','C']],seg:[['B','D',{col:'var(--accent)',sw:2.2}]],maxH:160,W:260};
 if(k===0){const x=R(3,14);const AC=2*x;const sc=AC/dist(P.A,P.C);o.side=[['A','D',String(x)],['A','C','',{}]];o.side=[['A','D',String(x)]];o.tick=[['A','D',1],['D','C',1]];
  return {type:'num',q:`BD — медиана треугольника ABC, AD = ${x}. Найди AC.`,pic:geo(o),ans:2*x,short:`AC = 2 · AD = ${2*x}.`,hint:'Медиана делит сторону пополам.',
   explain:`Медиана идёт в <b>середину</b> стороны: AD = DC = ${x}. AC = ${x} + ${x} = <b>${2*x}</b>.`,explain2:`D — середина AC, значит, AC в 2 раза длиннее половинки: 2 · ${x} = ${2*x}.`};}
 if(k===1){const B=Math.round(angAt(P.B,P.A,P.C));if(B%2)return null;o.ang=[['B','A','D','',{n:1,r:26}],['B','D','C','',{n:1,r:30}],['B','A','C',B+'°',{n:1,r:50}]];o.ang=[['B','A','D','?',{n:1,r:26}],['B','D','C','',{n:1,r:30}]];
  return {type:'num',q:`BD — биссектриса треугольника ABC, ∠ABC = ${B}°. Найди ∠ABD (в градусах).`,pic:geo(o),ans:B/2,short:`${B}° : 2 = ${B/2}°.`,hint:'Биссектриса делит угол пополам.',
   explain:`Биссектриса делит угол B на две равные части: ∠ABD = ∠DBC = ${B}° : 2 = <b>${B/2}°</b>.`,explain2:`Две одинаковые половинки дают ${B}°: x + x = ${B} → x = ${B/2}.`};}
 o.rt=[['D','C','B']];const ask=R(0,1);
 return {type:'num',q:`BD — высота треугольника ABC. Найди ∠${ask?'BDC':'ADB'} (в градусах).`,pic:geo(o),ans:90,short:'Высота ⊥ стороне → 90°.',hint:'Что значит «перпендикуляр»?',
  explain:`Высота — <b>перпендикуляр</b> к стороне, поэтому она образует со стороной прямые углы: ∠ADB = ∠BDC = <b>90°</b>.`,explain2:'Высота стоит на стороне «как столб на земле» — строго вертикально, под углом 90° с обеих сторон.'};});
G(0,()=>{const n=R(0,2);const qs=['Сколько медиан у треугольника?','Сколько биссектрис у треугольника?','Сколько высот у треугольника?'];
 return {type:'num',q:qs[n],ans:3,short:'По одной из каждой вершины — 3.',hint:'Сколько у треугольника вершин?',
  explain:`${CEV[n][0].toUpperCase()+CEV[n].slice(1)} проводится из вершины, а вершин три. Поэтому у каждого треугольника <b>3</b> ${['медианы','биссектрисы','высоты'][n]}. (Кстати, все три ${['медианы','биссектрисы','высоты (или их продолжения)'][n]} пересекаются в одной точке — это замечательные точки треугольника.)`,
  explain2:'Из A, из B и из C — по одной. 1 + 1 + 1 = 3.'};});

/* ===== L1 ===== */
G(1,()=>{const L=pick(['KMN','PQR','DEF','XYZ']);const i=R(0,2);const ot=[0,1,2].filter(x=>x!==i);const lat1=L[i]+L[ot[0]],lat2=L[i]+L[ot[1]],base=L[ot[0]]+L[ot[1]];
 return CH(`В треугольнике ${L}: ${lat1} = ${lat2}. Какая сторона — основание?`,base,[lat1,lat2,'У него нет основания'],
 {short:`Основание — третья, не равная сторона: ${base}.`,
 explain:`Равные стороны ${lat1} и ${lat2} называются <b>боковыми</b>, а третья сторона — <b>основанием</b>: ${base}. Вершина ${L[i]}, из которой выходят боковые стороны, — вершина равнобедренного треугольника.`,
 explain2:`Представь крышу домика: два одинаковых ската (${lat1} и ${lat2}) и пол чердака — основание ${base}.`});},{rule:true});
G(1,()=>CH('Какое свойство углов равнобедренного треугольника верно?','Углы при основании равны',['Все углы равны','Угол при вершине равен углу при основании','Углы при основании в сумме дают 90°'],
 {short:'Углы при основании равны.',
 explain:'Теорема: в равнобедренном треугольнике <b>углы при основании равны</b>. Все углы равны только в равностороннем. Угол при вершине может быть каким угодно (от 0° до 180°). Сумма углов при основании равна 180° − угол при вершине, а не обязательно 90°.',
 explain2:'Перегни равнобедренный треугольник пополам по оси симметрии — углы при основании совпадут. Значит, равны.'}),{rule:true});
G(1,()=>{const a=R(25,80);const P=isoA(a);const ask=R(0,1);
 if(ask===0)return {type:'num',q:`В треугольнике ABC: AB = BC, ∠A = ${a}°. Найди ∠C (в градусах).`,pic:isoFig(P,{ang:[['A','B','C',a+'°',{n:1}],['C','A','B','?',{n:1}]]}),ans:a,
  short:`Углы при основании равны: ∠C = ∠A = ${a}°.`,hint:'Какая сторона — основание? Какие углы к ней прилежат?',
  explain:`AB = BC → основание AC, углы при основании ∠A и ∠C. Они равны: ∠C = <b>${a}°</b>.`,explain2:'Треугольник симметричен: левая половина — зеркальное отражение правой. Угол слева равен углу справа.'};
 return {type:'num',q:`В треугольнике ABC: AB = BC, ∠A = ${a}°. Найди ∠B (в градусах).`,pic:isoFig(P,{ang:[['A','B','C',a+'°',{n:1}],['B','C','A','?',{n:1}]]}),ans:180-2*a,
  short:`∠B = 180° − 2 · ${a}° = ${180-2*a}°.`,hint:'Сначала найди ∠C, потом вспомни сумму углов.',
  explain:`∠C = ∠A = ${a}° (углы при основании). Сумма углов 180°: ∠B = 180° − ${a}° − ${a}° = <b>${180-2*a}°</b>.`,
  explain2:`Два угла при основании вместе «съедают» ${2*a}°. На вершину остаётся 180° − ${2*a}° = ${180-2*a}°.<div class="box err"><b>Ловушка</b>180° − ${a}° = ${180-a}° — забыли второй угол при основании.</div>`};});
G(1,()=>{const b=2*R(10,70);if(b===60)return null;const a=(180-b)/2;const P=isoA(a);
 return {type:'num',q:`Угол при вершине равнобедренного треугольника равен ${b}°. Найди угол при основании (в градусах).`,pic:isoFig(P,{ang:[['B','C','A',b+'°',{n:1}],['A','B','C','?',{n:1}]]}),ans:a,
  short:`(180° − ${b}°) : 2 = ${a}°.`,hint:'На два равных угла при основании остаётся 180° минус угол при вершине.',
  explain:`Сумма углов 180°. На два равных угла при основании остаётся 180° − ${b}° = ${180-b}°. Каждый: ${180-b}° : 2 = <b>${a}°</b>.`,
  explain2:`Проверка: ${a}° + ${a}° + ${b}° = 180° ✅.<div class="box err"><b>Ловушка</b>(180° − ${b}°) без деления на 2 = ${180-b}° — это сумма двух углов, а не один угол.</div>`};});
G(1,()=>{const e=R(100,150);const a=180-e;const b=180-2*a;const P=isoA(a);P.E=[-2.2,0];
 return {type:'num',q:`AB = BC. Внешний угол при вершине A (угол между продолжением основания CA за точку A и стороной AB) равен ${e}°. Найди угол B треугольника (в градусах).`,
  pic:geo({P,poly:[['A','B','C']],seg:[['A','E',{dash:true}]],tick:ISO_T,ang:[['A','E','B',e+'°',{n:1}]],lab:['A','B','C'],maxH:170,W:280}),ans:b,
  short:`∠A = 180° − ${e}° = ${a}°, ∠C = ${a}°, ∠B = 180° − ${2*a}° = ${b}°.`,hint:'Внешний угол и угол A — смежные.',
  explain:`Внешний угол и ∠A смежные: ∠A = 180° − ${e}° = ${a}°. Углы при основании равны: ∠C = ${a}°. ∠B = 180° − ${a}° − ${a}° = <b>${b}°</b>.`,
  explain2:`Другой путь: внешний угол равен сумме двух внутренних, не смежных с ним: ${e}° = ∠B + ∠C = ∠B + ${a}° → ∠B = ${b}° ✅.`};});
G(1,()=>{for(;;){const a=R(30,80),b=180-2*a;if(Math.abs(a-b)<6)continue;const P=isoA(a);const ask=R(0,1);
 const pair=ask?`∠B = ${b}°`:`∠C = ${a}°`;
 return CH(`В треугольнике ABC: AB = BC, ∠A = ${a}°. Какое равенство верно?`,pair,ask?[`∠B = ${a}°`,`∠B = ${180-a}°`,`∠C = ${b}°`]:[`∠C = ${b}°`,`∠C = ${180-a}°`,`∠B = ${a}°`],{pic:isoFig(P,{ang:[['A','B','C',a+'°',{n:1}]]}),
  short:`∠C = ${a}°, ∠B = ${b}°.`,explain:`Основание AC, поэтому ∠C = ∠A = ${a}°, а ∠B = 180° − 2 · ${a}° = ${b}°. Верно: <b>${pair}</b>.`,
  explain2:`Не путай: равны углы, прилежащие к основанию (A и C), а угол B — «вершина крыши» — особенный.`});}});

/* ===== L2 ===== */
G(2,()=>CH('Какое утверждение о равнобедренном треугольнике верно?','Биссектриса, проведённая к основанию, является медианой и высотой',['Любая биссектриса является медианой и высотой','Медиана, проведённая к боковой стороне, является высотой','Высота всегда лежит вне треугольника'],
 {short:'Только отрезок к ОСНОВАНИЮ — «три в одном».',
 explain:'Свойство: в равнобедренном треугольнике <b>биссектриса, проведённая к основанию</b>, является медианой и высотой. Для отрезков к боковым сторонам это неверно (кроме равностороннего треугольника). Высота к основанию всегда внутри.',
 explain2:'Ось симметрии равнобедренного треугольника проходит через вершину и середину основания. Она делит пополам угол, основание и стоит перпендикулярно. Других осей у него (обычно) нет.'}),{rule:true});
G(2,()=>{const k=R(0,2);const given=CEV[k];const opts=['медианой','биссектрисой','высотой','стороной треугольника'];const ok=[0,1,2].filter(x=>x!==k);const order=shuffle([0,1,2,3].filter(x=>x!==k).concat([]));
 const list=[...ok,3];const sh=shuffle(list);
 return {type:'multi',q:`В треугольнике ABC: AB = BC, BD — ${given}, проведённая к основанию AC. Чем ещё является BD? Отметь все верные варианты.`,opts:sh.map(x=>opts[x]),ans:ok.map(x=>sh.indexOf(x)).sort((a,b)=>a-b),
  short:`К основанию: ${given} = ${ok.map(x=>CEV[x]).join(' = ')}.`,
  explain:`Отрезок из вершины B к основанию AC в равнобедренном треугольнике — одновременно <b>медиана, биссектриса и высота</b>. Значит, BD — ещё и ${ok.map(x=>opts[x]).join(', и ')}. Стороной треугольника он, конечно, не является.`,
  explain2:'BD лежит на оси симметрии треугольника. Ось делит пополам основание (медиана), угол B (биссектриса) и перпендикулярна основанию (высота).'};},{rule:true});
G(2,()=>{const x=R(3,15);const lat=x+R(2,8);const P=isoS(lat,2*x);P.D=mid(P.A,P.C);
 return {type:'num',q:`В треугольнике ABC: AB = BC, BD — биссектриса, AC = ${2*x}. Найди AD.`,pic:isoFig(P,{seg:[['B','D',{col:'var(--accent)',sw:2.2}]],ang:[['B','A','D','',{n:1,r:24}],['B','D','C','',{n:1,r:28}]],side:[['A','C',String(2*x)]]}),ans:x,
  short:`Биссектриса к основанию — медиана: AD = ${2*x}/2 = ${x}.`,hint:'Биссектриса к основанию равнобедренного треугольника — это ещё и…',
  explain:`AC — основание (AB = BC), BD — биссектриса к основанию, а значит, и <b>медиана</b>: AD = DC = ${2*x} : 2 = <b>${x}</b>.<div class="box err"><b>Ловушка</b>Ответ ${2*x} — это вся сторона, а не половина.</div>`,
  explain2:'ΔABD = ΔCBD (AB = CB, BD общая, ∠ABD = ∠CBD — I признак), значит AD = DC — две равные половинки основания.'};});
G(2,()=>{const b=2*R(15,75);const a=(180-b)/2;const P=isoA(a);P.D=mid(P.A,P.C);const ask=R(0,1);
 return {type:'num',q:`В треугольнике ABC: AB = BC, ∠ABC = ${b}°, BD — медиана. Найди ${ask?'∠BDC':'∠ABD'} (в градусах).`,pic:isoFig(P,{seg:[['B','D',{col:'var(--accent)',sw:2.2}]],tick:[...ISO_T,['A','D',2],['D','C',2]],ang:[['B','C','A','',{n:1,r:30}]]}),ans:ask?90:b/2,
  short:ask?'Медиана к основанию — высота: 90°.':`Медиана к основанию — биссектриса: ${b}°/2 = ${b/2}°.`,hint:'Медиана к основанию равнобедренного треугольника — это ещё и биссектриса, и высота.',
  explain:ask?`BD — медиана к основанию, значит, и <b>высота</b>: BD ⊥ AC, ∠BDC = <b>90°</b>. Угол ${b}° здесь не нужен.`:`BD — медиана к основанию, значит, и <b>биссектриса</b>: ∠ABD = ${b}° : 2 = <b>${b/2}°</b>.`,
  explain2:ask?'Ось симметрии всегда перпендикулярна основанию — при любом угле при вершине.':`Проверка через ΔABD: ∠A = (180° − ${b}°)/2 = ${a}°, ∠ADB = 90°, тогда ∠ABD = 180° − 90° − ${a}° = ${b/2}° ✅.`};});
G(2,()=>{const x=R(15,70);const a=90-x;const P=isoA(a);P.D=mid(P.A,P.C);const ask=R(0,1);
 return {type:'num',q:`В треугольнике ABC: AB = BC, BD — высота, ∠ABD = ${x}°. Найди ${ask?'∠BAC':'∠ABC'} (в градусах).`,pic:isoFig(P,{seg:[['B','D',{col:'var(--accent)',sw:2.2}]],rt:[['D','C','B']],ang:[['B','A','D',x+'°',{n:1,r:30}]]}),ans:ask?a:2*x,
  short:ask?`В ΔABD: 90° + ${x}° + ∠A = 180° → ∠A = ${a}°.`:`Высота к основанию — биссектриса: ∠ABC = 2 · ${x}° = ${2*x}°.`,hint:ask?'Рассмотри прямоугольный треугольник ABD.':'Высота к основанию — это и биссектриса.',
  explain:ask?`В ΔABD угол D прямой: ∠BAD = 180° − 90° − ${x}° = <b>${a}°</b>. (Или: острые углы прямоугольного треугольника в сумме 90°.)`:`BD — высота к основанию, значит, и <b>биссектриса</b>: ∠ABC = 2 · ∠ABD = <b>${2*x}°</b>.`,
  explain2:ask?`Через вершину: ∠B = 2 · ${x}° = ${2*x}°, ∠A = (180° − ${2*x}°)/2 = ${a}° ✅.`:`Половинка угла ${x}°, целый угол — две половинки: ${x}° + ${x}° = ${2*x}°.`};});
G(2,()=>CH('В треугольнике ABC: AB = BC (основание AC), AM — медиана, проведённая к <b>боковой</b> стороне BC. Обязательно ли AM — биссектриса угла A?','Нет: «три в одном» верно только для отрезка к основанию',['Да, в равнобедренном треугольнике любая медиана — биссектриса','Да, но только если ∠B тупой','Да, если AB = BC'],
 {short:'Свойство только для отрезка к основанию.',
 explain:`Свойство «медиана = биссектриса = высота» относится только к отрезку, проведённому из вершины B к <b>основанию</b> AC. Медиана AM к боковой стороне в общем случае не делит угол A пополам. Пример: AB = BC = 10, AC = 4 — угол A большой (около 78°), и медиана AM идёт совсем не по его середине. Исключение — равносторонний треугольник.`,
 explain2:'Ось симметрии у (не равностороннего) равнобедренного треугольника одна — через вершину B. Отрезок из A на ней не лежит, значит, «магии» нет.'}));

/* ===== L3 ===== */
G(3,()=>CH('Какой треугольник называется равносторонним и чему равны его углы?','Все три стороны равны; каждый угол 60°',['Две стороны равны; углы при основании 60°','Все три стороны равны; каждый угол 90°','Все углы разные; их сумма 180°'],
 {short:'Равносторонний: стороны равны, углы по 60°.',
 explain:'<b>Равносторонний</b> — все три стороны равны. Он равнобедренный относительно любой стороны, поэтому все углы равны, а их сумма 180°: 180° : 3 = <b>60°</b>.',
 explain2:'Три одинаковые спички, сложенные треугольником. Поверни его на треть оборота — он совпадёт сам с собой. Значит, все углы одинаковые: 180/3 = 60.'}),{rule:true});
G(3,()=>{const a=R(3,25);const ask=R(0,1);
 return ask?{type:'num',q:`Периметр равностороннего треугольника ${3*a} см. Найди его сторону (в см).`,ans:a,pic:fEqui.replace(/60°/g,''),short:`${3*a} : 3 = ${a} см.`,hint:'Три равные стороны.',
   explain:`Все три стороны равны: P = 3a → a = ${3*a} : 3 = <b>${a} см</b>.`,explain2:`Проверка: ${a} + ${a} + ${a} = ${3*a} ✅.`}
  :{type:'num',q:`Сторона равностороннего треугольника ${a} см. Найди его периметр (в см).`,ans:3*a,short:`3 · ${a} = ${3*a} см.`,hint:'Сколько у него сторон и какие они?',
   explain:`P = 3 · ${a} = <b>${3*a} см</b>.`,explain2:`${a} + ${a} + ${a} = ${3*a}.`};});
G(3,()=>{const P=isoA(60);P.D=mid(P.A,P.C);const ask=R(0,2);const nm=['∠ABD','∠BAD','∠ADB'][ask],ans=[30,60,90][ask];
 return {type:'num',q:`ΔABC — равносторонний, BD — медиана. Найди ${nm} (в градусах).`,pic:geo({P,poly:[['A','B','C']],seg:[['B','D',{col:'var(--accent)',sw:2.2}]],tick:[['A','B',1],['B','C',1],['A','D',2],['D','C',2]],maxH:170,W:230}),ans,
  short:['Медиана — биссектриса: 60°/2 = 30°.','Все углы равностороннего — 60°.','Медиана — высота: 90°.'][ask],hint:'В равностороннем треугольнике медиана — это ещё и биссектриса, и высота.',
  explain:`Все углы равностороннего треугольника по 60°. Медиана BD — ещё и биссектриса (∠ABD = 30°) и высота (∠ADB = 90°). ${nm} = <b>${ans}°</b>.`,
  explain2:`Проверка в ΔABD: 30° + 60° + 90° = 180° ✅. Получился «половинка» равностороннего — знаменитый треугольник 30°–60°–90°.`};});
G(3,()=>{const a=R(4,15);const base=R(2,2*a-1);if(base===a)return null;const P1=3*a,P2=2*a+base;
 return {type:'num',q:`Сторона равностороннего треугольника равна боковой стороне равнобедренного. Периметр равностороннего ${P1} см, периметр равнобедренного ${P2} см. Найди основание равнобедренного треугольника (в см).`,ans:base,
  short:`a = ${P1}/3 = ${a}; основание = ${P2} − 2 · ${a} = ${base}.`,hint:'Сначала найди сторону равностороннего.',
  explain:`Сторона равностороннего: ${P1} : 3 = ${a} см. Это и боковая сторона равнобедренного. Основание: ${P2} − ${a} − ${a} = <b>${base} см</b>.`,
  explain2:`Проверка: ${a} + ${a} + ${base} = ${P2} ✅, и ${base} &lt; ${2*a} — треугольник существует.`};});
G(3,()=>{const k=R(2,6);
 return {type:'num',q:`Из равносторонних треугольников со стороной 1 сложили большой равносторонний треугольник со стороной ${k} (как треугольную пирамидку из шаров для бильярда, только из треугольничков). Сколько маленьких треугольников понадобилось?`,ans:k*k,
  hint:'Посчитай по рядам: в верхнем ряду 1 треугольник, во втором — 3, в третьем — 5…',short:`1 + 3 + 5 + … = ${k}² = ${k*k}.`,
  explain:`В ряду номер n лежит n треугольников «вверх» и n − 1 «вниз», всего 2n − 1. Сумма по ${k} рядам: ${range(1,k).map(n=>2*n-1).join(' + ')} = <b>${k*k}</b>.`,
  explain2:`Сторона увеличилась в ${k} раз — площадь в ${k}² = ${k*k} раз. Значит, маленьких треугольников ${k*k}.`};});

/* ===== L4 ===== */
G(4,()=>CH('Как звучит признак равнобедренного треугольника?','Если в треугольнике два угла равны, то он равнобедренный',['Если в треугольнике есть угол 60°, то он равнобедренный','Если в треугольнике провести медиану, то он равнобедренный','Если две стороны треугольника перпендикулярны, то он равнобедренный'],
 {short:'Два равных угла → равнобедренный.',
 explain:'Признак (обратная теорема): <b>если два угла треугольника равны, то он равнобедренный</b>; равны стороны, лежащие против равных углов. Угол 60° ничего не гарантирует (бывает 60°–50°–70°). Медиану можно провести в любом треугольнике.',
 explain2:'Теорема «AB = BC → ∠A = ∠C» работает и в обратную сторону: «∠A = ∠C → AB = BC». Против равных углов — равные стороны.'}),{rule:true});
G(4,()=>{const opts=[['∠A = ∠C',1],['BD — медиана и высота',1],['BD — биссектриса и высота',1],['BD — медиана',0],['∠B = 60°',0],['BD — высота',0]];const pick4=shuffle([...shuffle(opts.filter(o=>o[1])).slice(0,2),...shuffle(opts.filter(o=>!o[1])).slice(0,2)]);
 return {type:'multi',q:'В треугольнике ABC проведён отрезок BD (D на AC). Какие условия гарантируют, что ΔABC равнобедренный (AB = BC)? Отметь все.',opts:pick4.map(o=>o[0]),ans:pick4.map((o,i)=>o[1]?i:-1).filter(i=>i>=0),
  short:'Нужно «два в одном» или два равных угла.',
  explain:`${pick4.map(o=>`• ${o[0]} — ${o[1]?'<b>гарантирует</b>':'не гарантирует'}`).join('<br>')}<br>Гарантируют: равные углы при основании (признак), а также совпадение двух «особых» отрезков из одной вершины (медиана-высота, биссектриса-высота). Одна только медиана или высота есть в любом треугольнике; угол 60° тоже ничего не значит.`,
  explain2:'Пример: медиана-высота. ΔABD = ΔCBD (AD = DC, BD общая, прямые углы при D) → AB = CB. А просто высота бывает в любом треугольнике, даже в «кривом».'};},{rule:true});
G(4,()=>{const a=R(30,80);if(Math.abs(a-60)<5)return null;const AB=R(4,15);const AC=Math.round(2*AB*Math.cos(a*D2R)*10)/10;if(AC<1||!isInt(AC))return null;const P=isoA(a,AC);
 return {type:'num',q:`В треугольнике ABC: ∠A = ∠C = ${a}°, AB = ${AB}, AC = ${AC}. Найди периметр треугольника.`,pic:geo({P,poly:[['A','B','C']],ang:[['A','B','C',a+'°',{n:1}],['C','A','B',a+'°',{n:1}]],side:[['A','B',String(AB)],['A','C',String(AC)]],maxH:170,W:270}),ans:2*AB+AC,
  short:`∠A = ∠C → BC = AB = ${AB}; P = ${2*AB+AC}.`,hint:'Какая сторона лежит против ∠A, какая против ∠C?',
  explain:`Два угла равны → треугольник равнобедренный. Против ∠A лежит BC, против ∠C — AB, значит, BC = AB = ${AB}.<br>P = ${AB} + ${AB} + ${AC} = <b>${2*AB+AC}</b>.`,
  explain2:`Равные углы «смотрят» на равные стороны. AC лежит между равными углами — это основание.<div class="box err"><b>Ловушка</b>Решить, что AB = AC (= ${AC}). Нет: против равных углов лежат AB и BC.</div>`};});
G(4,()=>{const lat=R(5,16),b=R(4,2*lat-2);const P=isoS(lat,b);P.D=mid(P.A,P.C);const k=R(0,1);
 return {type:'num',q:`В треугольнике ABC отрезок BD — ${k?'биссектриса и высота':'медиана и высота'}. AB = ${lat}, AC = ${b}. Найди BC.`,pic:geo({P,poly:[['A','B','C']],seg:[['B','D',{col:'var(--accent)',sw:2.2}]],rt:[['D','C','B']],...(k?{ang:[['B','A','D','',{n:1,r:24}],['B','D','C','',{n:1,r:28}]]}:{tick:[['A','D',1],['D','C',1]]}),side:[['A','B',String(lat)],['A','C',String(b)]],maxH:170,W:260}),ans:lat,
  short:`Треугольник равнобедренный: BC = AB = ${lat}.`,hint:`Сравни ΔABD и ΔCBD.`,
  explain:`ΔABD и ΔCBD: BD общая, ∠ADB = ∠CDB = 90°, ${k?'∠ABD = ∠CBD — по второму признаку (сторона BD и два прилежащих угла)':'AD = DC — по первому признаку (две стороны и прямой угол между ними)'}. Значит, BC = AB = <b>${lat}</b>. AC = ${b} — лишнее данное.`,
  explain2:`Если ${k?'биссектриса':'медиана'} совпала с высотой, треугольник симметричен относительно BD. Зеркальная сторона к AB — это BC.`};});
G(4,()=>{const e=R(105,145);if(e===120)return null;const a=180-e;const AB=R(4,15);const AC=Math.round(2*AB*Math.cos(a*D2R));if(AC<2)return null;const P=isoA(a,AC);P.E=[-2.5,0];P.F=[AC+2.5,0];
 return {type:'num',q:`Внешние углы треугольника ABC при вершинах A и C равны (по ${e}°). AB = ${AB}. Найди BC.`,pic:geo({P,poly:[['A','B','C']],seg:[['A','E',{dash:true}],['C','F',{dash:true}]],ang:[['A','E','B',e+'°',{n:1}],['C','B','F',e+'°',{n:1}]],side:[['A','B',String(AB)]],lab:['A','B','C'],maxH:170,W:300}),ans:AB,
  short:`∠A = ∠C = 180° − ${e}° → BC = AB = ${AB}.`,hint:'Если равны внешние углы, то равны и внутренние (смежные).',
  explain:`∠A = 180° − ${e}° = ${a}°, ∠C = 180° − ${e}° = ${a}° (смежные углы). Два угла равны → треугольник равнобедренный, BC = AB = <b>${AB}</b>.`,
  explain2:'Внешний угол и внутренний в сумме дают 180°. Равные внешние → равные внутренние → равные противолежащие стороны.'};});

/* ===== L5 ===== */
G(5,()=>CH('Боковая сторона равнобедренного треугольника a, основание b. Какое условие обязательно должно выполняться?','b &lt; 2a',['a &lt; b','b &gt; 2a','a = b'],
 {short:'Неравенство треугольника: b < a + a.',
 explain:'Неравенство треугольника: каждая сторона меньше суммы двух других. Для основания: b &lt; a + a = <b>2a</b>. Иначе боковые стороны «не дотянутся» друг до друга. a &lt; b не обязательно (бывает узкий высокий треугольник), a = b — только равносторонний.',
 explain2:'Две палочки по 4 см и одна 9 см: 4 + 4 = 8 &lt; 9 — короткие палочки не сойдутся над длинной. Треугольника нет.'}),{rule:true});
G(5,()=>{const lat=R(4,25),b=R(2,2*lat-1);const Pp=2*lat+b;
 return {type:'num',q:`Периметр равнобедренного треугольника ${Pp} см, основание ${b} см. Найди боковую сторону (в см).`,ans:lat,pic:isoFig(isoS(lat,b),{side:[['A','C',b+' см'],['A','B','?']],maxH:160}),
  short:`(${Pp} − ${b}) : 2 = ${lat} см.`,hint:'P = 2a + b.',
  explain:`P = 2a + b → 2a = ${Pp} − ${b} = ${Pp-b} → a = <b>${lat} см</b>.`,explain2:`Убираем основание: ${Pp} − ${b} = ${Pp-b} — это две одинаковые боковые стороны. Одна: ${Pp-b} : 2 = ${lat}.`};});
G(5,()=>{const lat=R(4,25),b=R(2,2*lat-1);const Pp=2*lat+b;
 return {type:'num',q:`Периметр равнобедренного треугольника ${Pp} см, боковая сторона ${lat} см. Найди основание (в см).`,ans:b,
  short:`${Pp} − 2 · ${lat} = ${b} см.`,hint:'P = 2a + b.',explain:`b = P − 2a = ${Pp} − ${2*lat} = <b>${b} см</b>.`,
  explain2:`Из периметра убираем две боковые стороны: ${Pp} − ${lat} − ${lat} = ${b}.<div class="box err"><b>Ловушка</b>${Pp} − ${lat} = ${Pp-lat} — забыли вторую боковую сторону.</div>`};});
G(5,()=>{for(;;){const a=R(2,12),b=R(2,30);if(b===a)continue;const ok1=2*a>b,ok2=2*b>a;if(ok1&&ok2)continue;/* unique */
 const [lat,base]=ok1?[a,b]:[b,a];const ans=2*lat+base;const [s1,s2]=shuffle([a,b]);
 return {type:'num',q:`Две стороны равнобедренного треугольника равны ${s1} см и ${s2} см. Найди его периметр (в см).`,ans,
  hint:'Проверь оба варианта: какая из сторон может быть боковой? Не забудь неравенство треугольника.',short:`Только ${lat}, ${lat}, ${base} — треугольник существует; P = ${ans}.`,
  explain:`Случай 1: боковые ${base}, ${base}, основание ${lat}. ${base} + ${base} = ${2*base} ≤ ${lat} — <b>такого треугольника нет</b>.<br>Случай 2: боковые ${lat}, ${lat}, основание ${base}: ${2*lat} &gt; ${base} — всё хорошо.<br>P = ${lat} + ${lat} + ${base} = <b>${ans}</b>.`,
  explain2:`Нарисуй: две короткие стороны по ${base} не дотянутся друг до друга над длинной стороной ${lat}. Значит, короткая сторона — основание.<div class="box err"><b>Ловушка</b>P = 2 · ${base} + ${lat} = ${2*base+lat} — у «треугольника», которого не существует.</div>`};}});
G(5,()=>{for(;;){const lat=R(5,20),b=2*R(2,lat-1);const Pp=2*lat+b;const h=Math.sqrt(lat*lat-b*b/4);const md=R(Math.max(2,Math.ceil(h)-1),lat+2);
 /* BD median to base => BD = h, use exact h; choose triples where h integer */
 if(!isInt(h))continue;const Q=lat+b/2+h;
 return {type:'num',q:`В равнобедренном треугольнике ABC (AB = BC) проведена медиана BD. Периметр ΔABC равен ${Pp} см, периметр ΔABD равен ${Q} см. Найди BD (в см).`,ans:h,
  pic:(()=>{const P=isoS(lat,b);P.D=mid(P.A,P.C);return isoFig(P,{seg:[['B','D',{col:'var(--accent)',sw:2.2}]],tick:[...ISO_T,['A','D',2],['D','C',2]],maxH:160});})(),
  hint:'P(ABD) = AB + AD + BD. Чему равно AB + AD?',short:`AB + AD = ${Pp}/2 = ${Pp/2}; BD = ${Q} − ${Pp/2} = ${h}.`,
  explain:`AD — половина основания, поэтому AB + AD = (2·AB + AC)/2 = P(ABC)/2 = ${Pp/2}.<br>P(ABD) = AB + AD + BD → BD = ${Q} − ${Pp/2} = <b>${h} см</b>.`,
  explain2:`Медиана разрезает треугольник на две равные половинки ABD и CBD. Их периметры вместе: ${2*Q} = P(ABC) + 2·BD = ${Pp} + 2·BD → BD = (${2*Q} − ${Pp})/2 = ${h}.`};}});
G(5,()=>{for(;;){const d=R(1,9),lat=R(3,15);const b=lat+d;if(b>=2*lat)continue;const Pp=2*lat+b;
 return {type:'num',q:`Основание равнобедренного треугольника на ${d} см больше боковой стороны, а периметр ${Pp} см. Найди основание (в см).`,ans:b,
  short:`3x + ${d} = ${Pp} → x = ${lat}, основание ${b}.`,hint:'Пусть боковая сторона x. Тогда основание x + ' + d + '.',
  explain:`Боковая x, основание x + ${d}. P = x + x + x + ${d} = 3x + ${d} = ${Pp} → 3x = ${Pp-d} → x = ${lat}.<br>Основание: ${lat} + ${d} = <b>${b} см</b>.`,
  explain2:`Проверка: ${lat} + ${lat} + ${b} = ${Pp} ✅, и ${b} &lt; ${2*lat} — треугольник существует.`};}});

/* ===== L6 ===== */
G(6,()=>CH('Угол при вершине равнобедренного треугольника β. Как найти угол при основании α?','α = (180° − β) / 2',['α = 180° − β','α = 180° − 2β','α = β / 2'],
 {short:'Два равных угла делят остаток 180° − β.',
 explain:'Сумма углов 180°: β + α + α = 180° → 2α = 180° − β → <b>α = (180° − β)/2</b>. «180° − β» — это сумма <b>двух</b> углов при основании, не забудь поделить. 180° − 2β — это формула для угла при вершине, если известен угол при основании (только с α).',
 explain2:'Пример: β = 40°. α = (180 − 40)/2 = 70°. Проверка: 70 + 70 + 40 = 180 ✅.'}),{rule:true});
G(6,()=>{for(;;){const d=R(-60,90);if(d===0||(180-d)%3)continue;const a=(180-d)/3,b=a+d;if(a<=10||b<=10||a>=90)continue;
 return {type:'num',q:`Угол при вершине равнобедренного треугольника ${d>0?'на '+d+'° больше':'на '+(-d)+'° меньше'} угла при основании. Найди угол при вершине (в градусах).`,ans:b,pic:isoFig(isoA(a),{ang:[['A','B','C','x',{n:1}],['C','A','B','x',{n:1}],['B','C','A',d>0?'x + '+d+'°':'x − '+(-d)+'°',{n:1}]]}),
  short:`3x ${d>0?'+':'−'} ${Math.abs(d)} = 180 → x = ${a}°, вершина ${b}°.`,hint:'Угол при основании x. Запиши сумму углов.',
  explain:`Углы при основании x и x, при вершине x ${d>0?'+':'−'} ${Math.abs(d)}°. Сумма: 3x ${d>0?'+':'−'} ${Math.abs(d)} = 180 → 3x = ${180-d} → x = ${a}°.<br>Угол при вершине: <b>${b}°</b>.`,
  explain2:`Проверка: ${a}° + ${a}° + ${b}° = 180° ✅.<div class="box err"><b>Ловушка</b>Ответ ${a}° — это угол при основании, а спрашивали угол при вершине.</div>`};}});
G(6,()=>{const b=2*R(15,44);const a=(180-b)/2;const P=isoA(a);P.H=foot(P.A,P.B,P.C);const ans=90-a;
 return {type:'num',q:`В треугольнике ABC: AB = BC, ∠B = ${b}°, AH — высота, проведённая к боковой стороне BC. Найди ∠HAC (в градусах).`,pic:isoFig(P,{seg:[['A','H',{col:'var(--accent)',sw:2.2}]],rt:[['H','C','A']],ang:[['B','C','A',b+'°',{n:1,r:28}],['A','H','C','?',{n:1,r:34}]]}),ans,
  short:`∠C = ${a}°; в ΔAHC: ∠HAC = 90° − ${a}° = ${ans}° (= ∠B/2).`,hint:'Найди ∠C, потом рассмотри прямоугольный треугольник AHC.',
  explain:`∠C = (180° − ${b}°)/2 = ${a}°. В ΔAHC угол H прямой, поэтому ∠HAC = 90° − ${a}° = <b>${ans}°</b>.`,
  explain2:`Красивый факт: угол между высотой к боковой стороне и основанием всегда равен <b>половине угла при вершине</b>: ${b}°/2 = ${ans}°. Проверь: 90° − (180° − β)/2 = β/2.`};});
G(6,()=>{const a=2*R(15,40);const P=isoA(a);const AB=dist(P.A,P.B),AC=dist(P.A,P.C);P.L=lerp(P.C,P.B,AC/(AC+AB));const ask=R(0,1);const v=ask?180-a/2-a:a/2+a;
 return {type:'num',q:`В треугольнике ABC: AB = BC, ∠A = ${a}°, AL — биссектриса угла A (L на BC). Найди ${ask?'∠ALC':'∠ALB'} (в градусах).`,pic:isoFig(P,{seg:[['A','L',{col:'var(--accent)',sw:2.2}]],ang:[['A','L','C','',{n:1,r:30}],['A','B','L','',{n:1,r:34}],[ask?'L':'L',ask?'C':'A',ask?'A':'B','?',{n:2}]]}),ans:v,
  short:ask?`∠LAC = ${a/2}°, ∠C = ${a}° → ∠ALC = ${v}°.`:`∠ALB — внешний угол ΔALC: ${a/2}° + ${a}° = ${v}°.`,hint:'∠LAC = ∠A/2, ∠C = ∠A. Рассмотри ΔALC.',
  explain:`∠C = ∠A = ${a}° (углы при основании), ∠LAC = ${a}°/2 = ${a/2}°.<br>${ask?`В ΔALC: ∠ALC = 180° − ${a/2}° − ${a}° = <b>${v}°</b>.`:`∠ALB — внешний угол треугольника ALC при вершине L, он равен сумме двух не смежных с ним: ${a/2}° + ${a}° = <b>${v}°</b>.`}`,
  explain2:ask?`Или: ∠ALB = ${a/2}° + ${a}° = ${a*1.5}° (внешний угол), а ∠ALC = 180° − ${a*1.5}° = ${v}° ✅.`:`Или: ∠ALC = 180° − ${a/2}° − ${a}° = ${180-1.5*a}°, а ∠ALB = 180° − ${180-1.5*a}° = ${v}° (смежные) ✅.`};});
G(6,()=>{const a=R(20,80);const e=2*a;const P=isoA(a);P.E=[P.B[0]+(P.B[0]-P.A[0])*0.55,P.B[1]+(P.B[1]-P.A[1])*0.55];
 return {type:'num',q:`Внешний угол при вершине B равнобедренного треугольника ABC (AB = BC) равен ${e}°. Найди ∠A (в градусах).`,pic:geo({P,poly:[['A','B','C']],seg:[['B','E',{dash:true}]],tick:ISO_T,ang:[['B','C','E',e+'°',{n:1}]],lab:['A','B','C'],maxH:180,W:260}),ans:a,
  short:`${e}° = ∠A + ∠C = 2∠A → ∠A = ${a}°.`,hint:'Внешний угол равен сумме двух внутренних, не смежных с ним.',
  explain:`Внешний угол при B равен ∠A + ∠C. А ∠A = ∠C, поэтому ${e}° = 2∠A → ∠A = <b>${a}°</b>.`,
  explain2:`Через смежные углы: ∠B = 180° − ${e}° = ${180-e}°, ∠A = (180° − ${180-e}°)/2 = ${a}° ✅.`};});

/* ===== L7 ★ ===== */
G(7,()=>CH('В треугольнике биссектриса, проведённая из вершины B, оказалась и медианой. Что отсюда следует?','Треугольник равнобедренный: AB = BC',['Треугольник прямоугольный','Ничего: так бывает в любом треугольнике','Треугольник равносторонний'],
 {short:'Биссектриса-медиана → равнобедренный.',
 explain:'Это признак равнобедренного треугольника: если биссектриса совпадает с медианой, то <b>AB = BC</b>. Доказать его «в лоб» нельзя (ΔABD и ΔCBD — это «сторона-сторона-угол не между»), поэтому медиану удваивают: продлевают BD на DE = BD, и ΔABD = ΔCED даёт CE = AB и равнобедренный ΔBCE. Равносторонним треугольник быть не обязан.',
 explain2:'В «кривом» треугольнике биссектриса из B падает ближе к короткой стороне, а медиана — точно в середину. Совпасть они могут только когда стороны AB и BC равны.'}),{rule:true,star:true});
G(7,()=>{const al=pick([20,24,28,30,32,36,40,44,48,50,52,56]);const be=(180-al)/2;const ans=be-al;
 /* numeric check: AB=AC apex A at top */const A=[0,0],B=polar(A,1,-90-al/2),C=polar(A,1,-90+al/2);const t=(()=>{/* D on AC with BD=BC, D≠C */const u=sub(C,A),w=sub(A,B);const a2=dot(u,u),b2=2*dot(u,w),c2=dot(w,w)-dot(sub(C,B),sub(C,B));const r=[(-b2-Math.sqrt(b2*b2-4*a2*c2))/(2*a2),(-b2+Math.sqrt(b2*b2-4*a2*c2))/(2*a2)].filter(x=>x>1e-6&&x<1-1e-6);return r[0];})();
 const D=lerp(A,C,t);if(Math.abs(angAt(B,A,D)-ans)>1e-6)return null;
 const P={A,B,C,D};
 return {type:'num',q:`В треугольнике ABC: AB = AC, ∠A = ${al}°. На стороне AC взята точка D так, что BD = BC. Найди ∠ABD (в градусах).`,pic:geo({P,poly:[['A','B','C']],seg:[['B','D',{col:'var(--accent)',sw:2.2}]],tick:[['A','B',1],['A','C',1],['B','D',2],['B','C',2]],ang:[['A','B','C',al+'°',{n:1,r:30}]],maxH:200,W:220}),ans,
  hint:'Найди углы при основании ΔABC. Треугольник BDC тоже равнобедренный — с какой вершиной?',short:`∠C = ${be}°, ∠BDC = ${be}°, ∠DBC = ${al}°, ∠ABD = ${be}° − ${al}° = ${ans}°.`,
  explain:`1) ΔABC: AB = AC → ∠B = ∠C = (180° − ${al}°)/2 = ${be}°.<br>2) ΔBDC: BD = BC → ∠BDC = ∠BCD = ${be}°, значит ∠DBC = 180° − 2 · ${be}° = ${al}°.<br>3) ∠ABD = ∠ABC − ∠DBC = ${be}° − ${al}° = <b>${ans}°</b>.`,
  explain2:`Заметь: ∠DBC всегда равен ∠A (оба треугольника ABC и BDC имеют одинаковые углы при основании ${be}°). Значит, ответ — разность угла при основании и угла при вершине: ${be} − ${al} = ${ans}. Это упрощённая версия знаменитой задачи Лэнгли.`};},{star:true});
G(7,()=>{const v=R(0,1);
 if(v===0){const ask=R(0,2);const nm=['∠A','∠C','∠DBC'][ask],ans=[36,72,36][ask];
  const P=isoA(72);/* apex B=36°, base AC; D on BC? use: AB=BC apex B; D on AB with CD = AC... rename to statement below */
  const A=[0,0],C=[6,0],B=P.B;const D=lerp(B,A,dist(B,A)-6>0?(dist(B,A)-6)/dist(B,A):0);/* D on BA with AD... */
  /* statement: AB = AC, D on AC with AD = BD = BC. Build: apex A at top, base BC */
  const A2=[0,0],B2=polar(A2,1,-90-18),C2=polar(A2,1,-90+18);const D2=lerp(A2,C2,dist(B2,C2));/* AD = BC */
  if(Math.abs(dist(B2,D2)-dist(A2,D2))>1e-6)return null;
  return {type:'num',q:`В треугольнике ABC: AB = AC. На стороне AC взята точка D так, что AD = BD = BC. Найди ${nm} (в градусах).`,
   pic:geo({P:{A:A2,B:B2,C:C2,D:D2},poly:[['A','B','C']],seg:[['B','D',{col:'var(--accent)',sw:2.2}]],tick:[['A','D',1],['B','D',1],['B','C',1],['A','B',2],['A','C',2]],maxH:210,W:220}),ans,
   hint:'Обозначь ∠A = x. Из AD = BD найди ∠ABD, потом внешний угол BDC, потом ∠C.',short:`x + 2x + 2x = 180 → x = 36°; ∠C = 72°, ∠DBC = 36°.`,
   explain:`Пусть ∠A = x.<br>• AD = BD → ∠ABD = ∠A = x.<br>• ∠BDC — внешний угол ΔABD: ∠BDC = x + x = 2x.<br>• BD = BC → ∠C = ∠BDC = 2x.<br>• AB = AC → ∠ABC = ∠C = 2x.<br>Сумма углов ΔABC: x + 2x + 2x = 180° → x = 36°.<br>∠A = 36°, ∠C = 72°, ∠DBC = 72° − 36° = 36°. Ответ: <b>${ans}°</b>.`,
   explain2:'Это «золотой треугольник» 36°–72°–72°: биссектриса угла при основании разрезает его на два равнобедренных треугольника. Его стороны относятся как золотое сечение ≈ 1,618, он прячется в правильной пятиконечной звезде.'};}
 const ask=R(0,1);const nm=['∠BAC','∠B'][ask],ans=[108,36][ask];
 const B=[0,0],C=[1,0],A=polar(B,1/(2*Math.cos(36*D2R)),36);const D=[dist(A,B),0];if(Math.abs(dist(D,A)-dist(D,C))>1e-6)return null;
 return {type:'num',q:`В треугольнике ABC: AB = AC. На стороне BC взята точка D так, что DA = DC и BA = BD. Найди ${nm} (в градусах).`,
  pic:geo({P:{A,B,C,D},poly:[['A','B','C']],seg:[['A','D',{col:'var(--accent)',sw:2.2}]],tick:[['D','A',1],['D','C',1],['B','A',2],['B','D',2]],maxH:170,W:280}),ans,
  hint:'Пусть ∠B = ∠C = y. Из DA = DC найди ∠DAC, потом внешний угол ADB.',short:`y + 2y + 2y = 180 → y = 36°, ∠BAC = 108°.`,
  explain:`Пусть ∠B = ∠C = y (AB = AC).<br>• DA = DC → ∠DAC = ∠C = y.<br>• ∠ADB — внешний угол ΔADC: ∠ADB = 2y.<br>• BA = BD → ∠BAD = ∠BDA = 2y.<br>Сумма углов ΔABD: y + 2y + 2y = 180° → y = 36°.<br>∠BAC = 2y + y = 108°, ∠B = 36°. Ответ: <b>${ans}°</b>.`,
  explain2:'Треугольник 36°–36°–108° — тоже «золотой»: такие треугольники и 36°–72°–72° складываются в правильный пятиугольник (диагонали отрезают их от него).'};},{star:true});
G(7,()=>{const V=[[36,'∠A = 36°, BD — биссектриса угла B',(P)=>{const AB=dist(P.A,P.B),BC=dist(P.B,P.C);return lerp(P.A,P.C,AB/(AB+BC));}],
 [108,'∠A = 108°, D на BC и ∠BAD = 36°',(P)=>inter(P.B,P.C,P.A,polar(P.A,1,Math.atan2(P.B[1]-P.A[1],P.B[0]-P.A[0])/D2R+36))],
 [90,'∠A = 90°, AD — высота',(P)=>foot(P.A,P.B,P.C)],[120,'∠A = 120°, D на BC и ∠BAD = 30°',(P)=>inter(P.B,P.C,P.A,polar(P.A,1,Math.atan2(P.B[1]-P.A[1],P.B[0]-P.A[0])/D2R+30))],
 [120,'∠A = 120°, D на BC и ∠BAD = 90°',(P)=>inter(P.B,P.C,P.A,polar(P.A,1,Math.atan2(P.B[1]-P.A[1],P.B[0]-P.A[0])/D2R+90))]];
 const [va,txt,fD]=pick(V);const be=(180-va)/2;const P={B:[0,0],C:[6,0],A:[3,3*Math.tan(be*D2R)]};
 /* fD for case 36: BD bisector — needs apex at A: D on AC */const isBis=va===36;
 if(isBis){const AB=dist(P.B,P.A),BC=dist(P.B,P.C);P.D=lerp(P.A,P.C,AB/(AB+BC));}else P.D=fD(P);
 const tris=isBis?[['A','B','C'],['A','B','D'],['B','D','C']]:[['A','B','C'],['A','B','D'],['A','D','C']];
 const isIso=t=>{const s=[dist(P[t[0]],P[t[1]]),dist(P[t[1]],P[t[2]]),dist(P[t[0]],P[t[2]])];return Math.abs(s[0]-s[1])<1e-6||Math.abs(s[1]-s[2])<1e-6||Math.abs(s[0]-s[2])<1e-6;};
 const good=tris.filter(isIso);const ans=good.length;
 return {type:'num',q:`В треугольнике ABC: AB = AC, ${txt}. Сколько равнобедренных треугольников на рисунке (среди ${tris.map(t=>'Δ'+t.join('')).join(', ')})?`,ans,
  pic:geo({P,poly:[['A','B','C']],seg:[[isBis?'B':'A','D',{col:'var(--accent)',sw:2.2}]],tick:[['A','B',1],['A','C',1]],maxH:180,W:260}),
  hint:'Найди все углы в каждом треугольнике. Равнобедренный — если два угла равны.',short:`Равнобедренные: ${good.map(t=>'Δ'+t.join('')).join(', ')}.`,
  explain:`Посчитаем углы (∠B = ∠C = ${be}°):<br>${tris.map(t=>{const an=[angAt(P[t[0]],P[t[1]],P[t[2]]),angAt(P[t[1]],P[t[0]],P[t[2]]),angAt(P[t[2]],P[t[0]],P[t[1]])].map(x=>Math.round(x));return `Δ${t.join('')}: ∠${t[0]} = ${an[0]}°, ∠${t[1]} = ${an[1]}°, ∠${t[2]} = ${an[2]}° — ${isIso(t)?'<b>равнобедренный</b>':'нет'}`;}).join('<br>')}<br>Итого: <b>${ans}</b>.`,
  explain2:'Метод: подпиши на рисунке все углы, начиная с известных, используя сумму 180° и смежные углы. Два равных угла в треугольнике = равнобедренный.'};},{star:true});
G(7,()=>{const al=pick([7,8,10,11,12,13,14,15,16,17,18,20,22,25,30,36,40,45]);
 /* simulate zigzag: rays at 0 and al; points alternate */
 const A=[0,0];const dirs=[[1,0],[Math.cos(al*D2R),Math.sin(al*D2R)]];let prev=A,cur=[1,0],side=0,cnt=1,prevT=0;
 for(let s=0;s<200;s++){const d=dirs[1-side];/* find t>0: |t·d − cur| = 1, choose t > distance of prev (on same ray d) */const b2=-2*dot(d,cur),c2=dot(cur,cur)-1;const disc=b2*b2-4*c2;if(disc<1e-12)break;
  const ts=[(-b2-Math.sqrt(disc))/2,(-b2+Math.sqrt(disc))/2].filter(t=>t>len(prev)+1e-7);if(!ts.length)break;const t=Math.min(...ts);const nx=mul(d,t);prev=cur;cur=nx;side=1-side;cnt++;}
 const formula=Math.ceil(90/al-1e-9);if(cnt!==formula)return null;
 return {type:'num',q:`В угол ${al}° укладывают «змейку» из равных отрезков: первый отрезок AP₁ лежит на одной стороне угла (A — вершина угла), P₂ — на другой стороне, P₃ — снова на первой и т. д., причём AP₁ = P₁P₂ = P₂P₃ = … и каждая новая точка дальше от A, чем предыдущая на той же стороне. Сколько отрезков можно уложить (считая AP₁)?`,ans:cnt,
  hint:'Треугольник AP₁P₂ равнобедренный с углами при основании ' + al + '°. Посмотри на следующий: какие у него углы при основании?',short:`Углы при основаниях: ${al}°, ${2*al}°, ${3*al}°, … пока < 90°; отрезков ${cnt}.`,
  explain:`ΔAP₁P₂: P₁A = P₁P₂ → углы при основании по ${al}°. Внешний угол при P₁ равен ${2*al}° — это угол при основании следующего равнобедренного треугольника P₁P₂P₃. Дальше ${3*al}°, ${4*al}°, …<br>Отрезок P<sub>k</sub>P<sub>k+1</sub> существует, пока k · ${al}° &lt; 90° (у равнобедренного треугольника углы при основании острые). Наибольшее k = ${cnt-1}. Вместе с AP₁: 1 + ${cnt-1} = <b>${cnt}</b>.`,
  explain2:`Проверка на краю: k = ${cnt} даёт ${cnt*al}° ≥ 90° — такой «треугольник» не существует, змейка упирается.`};},{star:true});
G(7,()=>{const steps=[['Продлим BD за точку D на DE = BD',[]],['ΔABD = ΔCED (AD = DC, BD = DE, вертикальные углы при D)',[0]],['CE = AB и ∠CED = ∠ABD',[1]],['∠ABD = ∠CBD (BD — биссектриса), значит ∠CEB = ∠CBE',[2]],['ΔBCE равнобедренный: BC = CE = AB',[3]]];
 return orderTask('В треугольнике ABC отрезок BD — и биссектриса, и медиана. Докажи, что AB = BC. Выбери правильный порядок шагов:',steps,
 {short:'Удвоить медиану → равные треугольники → равнобедренный ΔBCE.',
 explain:'Идея — «удвоение медианы»:<br>1) Продлим BD на DE = BD.<br>2) ΔABD = ΔCED по I признаку.<br>3) Отсюда CE = AB и ∠CED = ∠ABD.<br>4) Но ∠ABD = ∠CBD (биссектриса) → в ΔBCE углы при B и E равны.<br>5) Значит, ΔBCE равнобедренный: BC = CE = AB.',
 explain2:'Почему не «просто сравнить ΔABD и ΔCBD»? У них BD общая, AD = DC и ∠ABD = ∠CBD — но угол не между сторонами! Это «сторона-сторона-угол», не признак. Поэтому нужен обходной путь через точку E.'});},{star:true});
G(7,()=>{const b=2*R(10,80);const a=(180-b)/2;const ans=90+b/2;const P=isoA(a);const AB=dist(P.A,P.B),AC=dist(P.A,P.C);P.L=lerp(P.C,P.B,AC/(AC+AB));P.K=lerp(P.A,P.B,AC/(AC+AB));P.I=inter(P.A,P.L,P.C,P.K);
 return {type:'num',q:`Угол при вершине B равнобедренного треугольника ABC равен ${b}°. Биссектрисы углов при основании AL и CK пересекаются в точке I. Найди ∠AIC (в градусах).`,ans,
  pic:isoFig(P,{seg:[['A','L',{col:'var(--accent)'}],['C','K',{col:'var(--accent)'}]],ang:[['B','C','A',b+'°',{n:1,r:24}],['I','A','C','?',{n:1,r:16}]],lab:['A','B','C','K','L','I']}),
  hint:'∠IAC = ∠A/2, ∠ICA = ∠C/2. Рассмотри ΔAIC.',short:`∠A = ∠C = ${a}°; ∠AIC = 180° − ${a}° = ${ans}° = 90° + ${b}°/2.`,
  explain:`∠A = ∠C = (180° − ${b}°)/2 = ${a}°. В ΔAIC: ∠IAC = ∠ICA = ${a}°/2 = ${N(a/2)}°. ∠AIC = 180° − 2 · ${N(a/2)}° = 180° − ${a}° = <b>${ans}°</b>.`,
  explain2:`Общая формула (для любого треугольника!): угол между биссектрисами двух углов равен 90° + (третий угол)/2 = 90° + ${b/2}° = ${ans}°.`};},{star:true});

/* =====================================================================
   WIDGET
   ===================================================================== */
const fitXY=(pts,W,Hh,pad)=>{const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);const s=Math.min((W-2*pad)/Math.max(x1-x0,1e-6),(Hh-2*pad)/Math.max(y1-y0,1e-6));
  const ox=(W-(x1-x0)*s)/2,oy=(Hh-(y1-y0)*s)/2;return {s,X:p=>[ox+(p[0]-x0)*s,Hh-oy-(p[1]-y0)*s]};};
const svT=(p,t,col,fs)=>`<text x="${r1(p[0])}" y="${r1(p[1])}" text-anchor="middle" font-size="${fs||14}" font-weight="700" fill="${col||'var(--accent-ink)'}">${t}</text>`;
const svL=(a,b,st)=>`<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(b[0])}" y2="${r1(b[1])}" ${st}/>`;
function onTheory(root){const w=root.querySelector('#w-iso');if(!w)return;
  w.innerHTML=`<label>Сдвинь вершину B: <input type="range" id="iX" min="0.5" max="5.5" step="0.25" value="1.5"></label><div id="iS" style="display:flex;justify-content:center"></div><div id="iO" class="small" style="text-align:center"></div>`;
  const X0=w.querySelector('#iX');
  const draw=()=>{const x=+X0.value;const A=[0,0],C=[6,0],B=[x,4.2];const ab=dist(A,B),cb=dist(C,B);const M=[3,0],L=lerp(A,C,ab/(ab+cb)),Hh=[x,0];
    const {X}=fitXY([[-0.3,-0.6],[6.3,-0.6],[0,4.6]],320,190,14);let o=`<svg viewBox="0 0 320 190" width="320" role="img" aria-label="Медиана, биссектриса и высота" style="font-family:system-ui,sans-serif">`;
    o+=`<polygon points="${[A,B,C].map(X).map(p=>r1(p[0])+','+r1(p[1])).join(' ')}" fill="var(--hl)" fill-opacity=".18" stroke="var(--fig)" stroke-width="2.2"/>`;
    o+=svL(X(B),X(Hh),'stroke="var(--fig)" stroke-width="2" stroke-dasharray="5 4"')+svL(X(B),X(L),'stroke="var(--hl)" stroke-width="2.6"')+svL(X(B),X(M),'stroke="var(--accent)" stroke-width="2"');
    o+=svT(sub(X(A),[8,-14]),'A')+svT(add(X(C),[8,14]),'C')+svT(sub(X(B),[0,8]),'B')+'</svg>';
    w.querySelector('#iS').innerHTML=o;const same=Math.abs(x-3)<1e-9;
    w.querySelector('#iO').innerHTML=`<span style="color:var(--accent-ink);font-weight:700">медиана</span> · <span style="color:var(--hl);font-weight:700">биссектриса</span> · пунктир — высота<br>AB = <span class="out">${N(Math.round(ab*10)/10)}</span>, BC = <span class="out">${N(Math.round(cb*10)/10)}</span>, ∠A ≈ <span class="out">${Math.round(angAt(A,B,C))}°</span>, ∠C ≈ <span class="out">${Math.round(angAt(C,A,B))}°</span>${same?'<br><b>AB = BC — все три отрезка слились в один!</b>':''}`;};
  X0.oninput=draw;draw();}

window.TOPIC={id:'g7_isosceles',title:'Равнобедренный треугольник',subtitle:'Геометрия · 7 класс',
intro:`<p>Медиана, биссектриса и высота — три главных отрезка треугольника. В равнобедренном треугольнике они сливаются в один! Здесь: определения, углы при основании, свойство «три в одном», равносторонний треугольник, признаки равнобедренного, периметры с ловушкой «двух случаев» и задачи на углы. В конце — олимпиадные цепочки равнобедренных треугольников и «золотой» треугольник 36°–72°–72°.</p>`,
theory,symbols,figs:{},onTheory,
levels:['Медиана, биссектриса, высота','Равнобедренный треугольник: углы при основании','Медиана = биссектриса = высота','Равносторонний треугольник','Признаки равнобедренного треугольника','Периметры и «два случая»','Задачи на углы','★ Олимпиадные задачи'],
gens};
})();
