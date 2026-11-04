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
   g7_right_tri — прямоугольный треугольник
   ===================================================================== */
/* right angle at C; ∠A = al; hypotenuse c. C origin, A on x-axis, B on y-axis */
const rtA=(al,c)=>{c=c||8;return {C:[0,0],A:[c*Math.cos(al*D2R),0],B:[0,c*Math.sin(al*D2R)]};};
const rtFig=(P,o)=>geo(Object.assign({P,poly:[['A','B','C']],fill:[{pts:['A','B','C'],op:0.15}],rt:[['C','A','B']],maxH:200,W:280},o||{}));
const CRR=['по двум катетам','по катету и прилежащему острому углу','по гипотенузе и острому углу','по гипотенузе и катету','равенство не следует'];

/* ---------- theory figures ---------- */
const fRT=rtFig(rtA(37,8),{side:[['A','C','катет',{fs:13}],['B','C','катет',{fs:13}],['A','B','гипотенуза',{fs:13}]],maxH:170,W:300});
const f30=rtFig(rtA(30,8),{ang:[['A','B','C','30°',{n:1}]],side:[['A','B','c'],['B','C','c/2',{col:'var(--accent-ink)'}]],maxH:170,W:300});
const f30b=(()=>{const P=rtA(30,8);P.D=[0,-P.B[1]];return geo({P,poly:[['A','B','D']],seg:[['A','C',{dash:true}]],fill:[{pts:['A','B','D'],op:0.15}],rt:[['C','A','B']],ang:[['A','B','C','30°',{n:1}],['A','C','D','30°',{n:1,r:34}]],tick:[['B','C',1],['C','D',1]],maxH:200,W:260});})();
const fMed=(()=>{const P=rtA(35,8);P.M=mid(P.A,P.B);return rtFig(P,{seg:[['C','M',{col:'var(--accent)',sw:2.2}]],tick:[['A','M',1],['M','B',1],['C','M',1]],maxH:170,W:300});})();
const fRect=(()=>{const P=rtA(35,8);P.D=add(P.A,P.B);P.M=mid(P.A,P.B);return geo({P,poly:[['A','D','B','C']],seg:[['A','B',{col:'var(--accent)'}],['C','D',{col:'var(--accent)'}]],rt:[['C','A','B']],dots:['M'],fill:[{pts:['A','B','C'],op:0.15}],maxH:150,W:260});})();
const fDist=(()=>{const P={M:[3,3.5],H:[3,0],A:[6.5,0],L:[-0.5,0],R:[8,0]};return geo({P,seg:[['L','R',{col:'var(--fig)'}],['M','H',{col:'var(--accent)',sw:2.4}],['M','A',{dash:true}]],rt:[['H','A','M']],lab:['M','H','A'],txt:[[[7.6,0.45],'a',{fs:15,col:'var(--accent-ink)'}]],maxH:150,W:260});})();

/* =====================================================================
   THEORY
   ===================================================================== */
const theory=[
{title:'Верёвка египтян и прямой угол',lvl:0,html:`
<p class="hook">Как построить ровно прямой угол, если у тебя нет ни угольника, ни транспортира? Египетские строители (по преданию — «натягиватели верёвки») брали верёвку с 12 равными промежутками и натягивали её треугольником со сторонами <b>3, 4 и 5</b>. Угол между сторонами 3 и 4 получался точно прямым. Так размечали углы пирамид и полей после разлива Нила.</p>
<div class="box rule"><b>Названия</b>В прямоугольном треугольнике один угол 90°.<br>• <b>Катеты</b> — две стороны, образующие прямой угол.<br>• <b>Гипотенуза</b> — сторона <b>против</b> прямого угла.</div>
<div class="fig">${fRT}</div>
<div class="box rule"><b>Гипотенуза — самая длинная</b>Против большего угла лежит большая сторона, а прямой угол — самый большой в прямоугольном треугольнике. Поэтому гипотенуза длиннее каждого катета.</div>
<div class="box err"><b>Ошибка</b>Гипотенуза — не «самая наклонная» и не «нижняя» сторона. Поверни треугольник как угодно: гипотенуза всегда напротив значка прямого угла.</div>
<div class="fact">Слово «гипотенуза» — от греческого «стягивающая»: она стягивает концы двух катетов. А «катет» значит «отвес» — у греков катет рисовали вертикально, как отвес строителя.</div>`},
{title:'Острые углы: в сумме 90°',lvl:1,html:`
<div class="box rule"><b>Свойство</b>Сумма острых углов прямоугольного треугольника равна <span class="m">90°</span>.</div>
<p><b>Почему.</b> Сумма всех углов 180°, прямой забрал 90°, на два острых осталось 90°. Поэтому в прямоугольном треугольнике не может быть второго прямого или тупого угла.</p>
<div class="box ex"><b>Пример</b>∠A = 35° → ∠B = 90° − 35° = 55°. Острые углы относятся как 1 : 2 → 30° и 60°.</div>
<div class="box tip"><b>Высота из прямого угла</b>Высота CH делит прямоугольный треугольник на два маленьких, и в них углы «перетасованы»: ∠ACH = ∠B, ∠BCH = ∠A. (Проверь: ∠ACH = 90° − ∠A = ∠B.)</div>`},
{title:'Катет против угла 30°',lvl:2,html:`
<div class="box rule"><b>Свойство</b>Катет, лежащий против угла 30°, равен <b>половине гипотенузы</b>.</div>
<div class="fig">${f30}</div>
<p><b>Почему.</b> Приставим к треугольнику его зеркальную копию (отражение относительно AC). Получится большой треугольник ABD, у которого все углы по 60° — <b>равносторонний</b>! Значит, BD = AB, а BC — половина BD, то есть половина AB.</p>
<div class="fig">${f30b}</div>
<div class="widget" id="w-30"></div>
<div class="box rule"><b>Обратное утверждение</b>Если катет равен половине гипотенузы, то угол, лежащий против этого катета, равен 30°.</div>
<div class="box ex"><b>Пример</b>Гипотенуза 14, ∠A = 30°. Катет BC (против A) = 7. А если известно ∠B = 60°, то ∠A = 30° — ответ тот же.</div>
<div class="box err"><b>Главная ловушка</b>Половине гипотенузы равен катет <b>против</b> угла 30°, а не прилежащий к нему! Прилежащий катет длиннее (≈ 0,87 гипотенузы).</div>`},
{title:'Медиана к гипотенузе',lvl:3,html:`
<div class="box rule"><b>Свойство</b>Медиана, проведённая к гипотенузе, равна <b>половине гипотенузы</b>: <span class="m">CM = AM = MB = AB/2</span>.</div>
<div class="fig">${fMed}</div>
<p><b>Почему.</b> Достроим треугольник до прямоугольника ACBD. Диагонали прямоугольника равны и делятся точкой пересечения пополам. Середина M гипотенузы — точка пересечения диагоналей, поэтому CM = AB/2.</p>
<div class="fig">${fRect}</div>
<div class="box tip"><b>Следствие: два равнобедренных</b>Медиана CM режет треугольник на два равнобедренных: AM = CM и BM = CM. Поэтому ∠ACM = ∠A, ∠BCM = ∠B.</div>
<div class="box rule"><b>Обратное</b>Если медиана треугольника равна половине стороны, к которой она проведена, то угол против этой стороны — прямой.</div>
<div class="widget" id="w-ladder"></div>`},
{title:'Признаки равенства прямоугольных треугольников',lvl:4,html:`
<p>Прямой угол у обоих треугольников уже есть — это «бесплатное» равенство. Поэтому хватает <b>двух</b> элементов:</p>
<div class="box rule"><b>Прямоугольные треугольники равны</b>1) по двум катетам (I признак);<br>2) по катету и прилежащему острому углу (II признак);<br>3) по гипотенузе и острому углу;<br>4) по гипотенузе и катету.</div>
<p>Последний — особенный: в общем случае «две стороны и угол не между ними» не признак, но для прямого угла он работает (приложи треугольники равными катетами — получится равнобедренный треугольник, высота которого делит его пополам).</p>
<div class="box err"><b>Не признак</b>Два острых угла: большой и маленький треугольники 30°–60°–90° разные.</div>
<div class="box ex"><b>Пример: биссектриса угла</b>Точка D на биссектрисе угла A. Опустим перпендикуляры DE и DF на стороны. ΔAED = ΔAFD по гипотенузе (AD общая) и острому углу → DE = DF. Каждая точка биссектрисы <b>равноудалена</b> от сторон угла.</div>`},
{title:'Расстояние от точки до прямой',lvl:5,html:`
<div class="box rule"><b>Определение</b><b>Расстояние от точки до прямой</b> — длина перпендикуляра, проведённого из точки к прямой.</div>
<div class="fig">${fDist}</div>
<p>MH — перпендикуляр, MA — <b>наклонная</b>. В треугольнике MHA угол H прямой, MA — гипотенуза, поэтому <b>перпендикуляр короче любой наклонной</b>. Вот почему расстояние меряют именно по перпендикуляру: это самый короткий путь.</p>
<div class="box ex"><b>Пример</b>Наклонная MA = 10 образует с прямой угол 30°. Расстояние MH — катет против 30°: MH = 5.</div>
<div class="fact">Футболист, который бежит к боковой линии «кратчайшим путём», бежит перпендикулярно ей. А мяч, брошенный с высоты, падает по перпендикуляру к земле — по отвесу.</div>`},
{title:'Крыши, лестницы и горки',lvl:6,html:`
<div class="box ex"><b>Лестница</b>Лестница длиной 6 м стоит под углом 60° к земле. Угол между лестницей и стеной 30°, а против него лежит отрезок земли от стены до лестницы: 3 м.</div>
<div class="box ex"><b>Крыша</b>Двускатная крыша с уклоном 30°: стропило длиной 5 м поднимает конёк на 2,5 м над перекрытием (катет против 30°).</div>
<div class="box tip"><b>Как решать</b>1) Нарисуй прямоугольный треугольник (стена ⊥ земля, конёк ⊥ перекрытие). 2) Найди угол 30°. 3) Катет против него = половина «наклонной» стороны.</div>
<div class="fact">Нормы для пандусов в России требуют уклона не круче примерно 5° (1 : 12), а горнолыжные «чёрные» трассы бывают круче 30°. Склон 30° — это когда высота равна половине длины спуска!</div>`},
{title:'Идеи для задач со звёздочкой',lvl:7,html:`
<div class="box rule"><b>1. Цепочки 30°–60°–90°</b>Высота CH из прямого угла треугольника с ∠A = 30°: BC = AB/2, BH = BC/2 = AB/4, AH = 3AB/4. Высота делит гипотенузу в отношении 3 : 1.</div>
<div class="box rule"><b>2. Скользящая лестница</b>Лестница AB скользит: A по стене, B по полу. Середина M всегда на расстоянии AB/2 от угла O (медиана к гипотенузе!). Значит, середина движется по дуге окружности.</div>
<div class="box rule"><b>3. Угол 15°</b>Если острый угол 15°, то высота к гипотенузе равна четверти гипотенузы: медиана CM = c/2, ∠CMB = 30°, высота CH = CM/2 = c/4.</div>
<div class="box rule"><b>4. Биссектриса угла 60°</b>В треугольнике 30°–60°–90° биссектриса угла 60° делит катет в отношении 2 : 1 (от вершины угла 30°).</div>`},
{title:'Шпаргалка',html:`<ul class="steps"><li>Гипотенуза против прямого угла, она самая длинная.</li><li>Острые углы: ∠A + ∠B = 90°.</li><li>Катет против 30° = гипотенуза / 2 (и наоборот).</li><li>Медиана к гипотенузе = гипотенуза / 2.</li><li>Признаки: 2 катета; катет + прилежащий угол; гипотенуза + угол; гипотенуза + катет.</li><li>Расстояние до прямой — по перпендикуляру.</li></ul>`}
];

const NW=t=>`<span style="white-space:nowrap;font-size:17px">${t}</span>`;
const symbols={tab:'Формулы',title:'Обозначения и формулы темы',rows:[
['∠C = 90°','Прямой угол','Значок «уголок» на рисунке.','AB — гипотенуза'],
[NW('∠A + ∠B = 90°'),'Острые углы','В сумме дают прямой угол.','35° + 55°'],
[NW('a = c/2'),'Катет против 30°','Против угла 30° лежит половина гипотенузы.','c = 14 → a = 7'],
[NW('CM = AB/2'),'Медиана к гипотенузе','Середина гипотенузы равноудалена от всех вершин.','AB = 10 → CM = 5'],
['⊥','«перпендикулярно»','Под прямым углом.','MH ⊥ a'],
['ρ(M, a)','Расстояние до прямой','Длина перпендикуляра MH.','MH = 4'],
[NW('AH : HB = 3 : 1'),'Высота в 30°–60°–90°','Высота из прямого угла делит гипотенузу.','AB = 8 → 6 и 2']
],after:`<div class="box tip" style="margin-top:14px"><b>Самое важное</b>Половине гипотенузы равны: катет против 30° и медиана к гипотенузе.</div>`};

/* =====================================================================
   GENERATORS
   ===================================================================== */
const LT=['KMN','PQR','DEF','XYZ','STU','EFG'];
/* ===== L0 ===== */
G(0,()=>CH('Что такое гипотенуза?','Сторона прямоугольного треугольника, лежащая против прямого угла',['Сторона, прилежащая к прямому углу','Самая короткая сторона треугольника','Высота, опущенная на основание'],
 {short:'Гипотенуза — против прямого угла.',
 explain:'<b>Гипотенуза</b> — сторона против прямого угла. Стороны, образующие прямой угол (прилежащие к нему), — <b>катеты</b>. Гипотенуза — самая длинная сторона, а не самая короткая.',
 explain2:'Найди на рисунке значок прямого угла. Посмотри от него «вперёд», через треугольник: сторона напротив — гипотенуза.'}),{rule:true});
G(0,()=>CH('Может ли катет быть длиннее гипотенузы?','Нет: гипотенуза лежит против наибольшего угла (90°) и всегда длиннее каждого катета',['Да, если острый угол маленький','Да, если треугольник равнобедренный','Может быть равен ей, если угол 45°'],
 {short:'Гипотенуза — самая длинная сторона.',
 explain:'В треугольнике против большего угла лежит большая сторона. Прямой угол — самый большой (два других острые), поэтому гипотенуза <b>длиннее каждого катета</b>. Даже при угле 45° катеты равны друг другу, но меньше гипотенузы.',
 explain2:'Перпендикуляр короче наклонной: катет — это перпендикуляр из вершины на другой катет, а гипотенуза — наклонная из той же точки. Наклонная всегда длиннее.'}),{rule:true});
G(0,()=>{const L=pick(LT);const r=R(0,2);const ot=[0,1,2].filter(x=>x!==r);const T=rtA(R(28,62),8);const rot0=R(0,359);const keys=['C','A','B'];/* C is right */
 const P={};const map={};[r,ot[0],ot[1]].forEach((li,j)=>{P[L[li]]=rot(T[keys[j]],rot0);});
 const hyp=L[ot[0]]+L[ot[1]];const legs=[L[r]+L[ot[0]],L[r]+L[ot[1]]];
 return CH(`Какая сторона треугольника ${L} — гипотенуза?`,hyp,[...legs,'Здесь нет гипотенузы'],{pic:geo({P,poly:[[...L]],rt:[[L[r],L[ot[0]],L[ot[1]]]],maxH:170,W:250}),
  short:`Прямой угол при ${L[r]} → гипотенуза ${hyp}.`,
  explain:`Прямой угол — при вершине ${L[r]}. Стороны ${legs.join(' и ')} выходят из этой вершины — это катеты. Против прямого угла лежит <b>${hyp}</b> — гипотенуза.`,
  explain2:`Гипотенуза — единственная сторона, которая <b>не касается</b> вершины прямого угла ${L[r]}. Это ${hyp}.`});});
G(0,()=>{const L=pick(LT);const r=R(0,2);const ot=[0,1,2].filter(x=>x!==r);const opts=[L[r]+L[ot[0]],L[r]+L[ot[1]],L[ot[0]]+L[ot[1]],'∠'+L[r]];const sh=shuffle([0,1,2,3]);
 return {type:'multi',q:`В треугольнике ${L} угол ${L[r]} прямой. Отметь все катеты.`,opts:sh.map(i=>opts[i]),ans:[sh.indexOf(0),sh.indexOf(1)].sort((a,b)=>a-b),
  short:`Катеты выходят из вершины прямого угла: ${opts[0]}, ${opts[1]}.`,
  explain:`Катеты — стороны, образующие прямой угол, то есть выходящие из вершины ${L[r]}: <b>${opts[0]}</b> и <b>${opts[1]}</b>. ${opts[2]} — гипотенуза. ∠${L[r]} — это угол, а не сторона.`,
  explain2:`В названии катета обязательно есть буква ${L[r]} (вершина прямого угла). Ищи такие стороны.`};});
G(0,()=>{const k=R(1,6),d=pick([0.5,1,1.5,2]);const Ltot=12*k*d;const ans=5*k*d;const T={C:[0,0],A:[4,0],B:[0,3]};
 const dots=[];for(let i=0;i<=4;i++){T['a'+i]=[i,0];dots.push('a'+i);}for(let i=1;i<=3;i++){T['b'+i]=[0,i];dots.push('b'+i);}for(let i=1;i<5;i++){T['h'+i]=lerp(T.A,T.B,i/5);dots.push('h'+i);}
 return {type:'num',q:`Египтяне натягивали верёвку с 12 равными промежутками в треугольник со сторонами 3, 4 и 5 промежутков — и получали прямой угол. Какой длины выйдет гипотенуза, если вся верёвка ${N(Ltot)} м (в м)?`,ans,
  pic:geo({P:T,poly:[['A','B','C']],rt:[['C','A','B']],dots,lab:['A','B','C'],side:[['C','A','4'],['C','B','3'],['A','B','5']],maxH:160,W:220}),
  hint:'Один промежуток = вся длина / 12. Гипотенуза — самая длинная сторона, 5 промежутков.',short:`Промежуток ${N(Ltot)}/12 = ${N(k*d)} м; гипотенуза 5 · ${N(k*d)} = ${N(ans)} м.`,
  explain:`Всего 3 + 4 + 5 = 12 промежутков. Один промежуток: ${N(Ltot)} : 12 = ${N(k*d)} м. Гипотенуза — самая длинная сторона (против прямого угла) — 5 промежутков: 5 · ${N(k*d)} = <b>${N(ans)} м</b>.`,
  explain2:`Доля гипотенузы — 5 из 12: ${N(Ltot)} · 5/12 = ${N(ans)} м. Катеты: ${N(3*k*d)} и ${N(4*k*d)} м.`};});

/* ===== L1 ===== */
G(1,()=>CH('Чему равна сумма острых углов прямоугольного треугольника?','90°',['180°','45°','Зависит от треугольника'],
 {short:'180° − 90° = 90°.',
 explain:'Сумма углов треугольника 180°, прямой угол — 90°. На два острых угла остаётся 180° − 90° = <b>90°</b> — всегда, в любом прямоугольном треугольнике.',
 explain2:'Пример: углы 30° и 60° — сумма 90°. Углы 45° и 45° — тоже 90°.'}),{rule:true});
G(1,()=>CH('Сколько прямых углов может быть в треугольнике?','Только один',['Два','Три','Сколько угодно'],
 {short:'Два прямых угла уже дают 180°.',
 explain:'Если бы углов по 90° было два, они уже дали бы 180°, и на третий угол ничего не осталось. Поэтому прямой угол в треугольнике — <b>только один</b>, а два других — острые.',
 explain2:'Попробуй нарисовать: из концов отрезка восстанови два перпендикуляра. Они параллельны и никогда не встретятся — треугольника не будет.'}),{rule:true});
G(1,()=>{const a=R(12,78);if(a===45)return null;const P=rtA(a);
 return {type:'num',q:`В треугольнике ABC: ∠C = 90°, ∠A = ${a}°. Найди ∠B (в градусах).`,pic:rtFig(P,{ang:[['A','B','C',a+'°',{n:1}],['B','C','A','?',{n:1}]]}),ans:90-a,
  short:`90° − ${a}° = ${90-a}°.`,hint:'Острые углы прямоугольного треугольника в сумме дают 90°.',
  explain:`∠A + ∠B = 90° → ∠B = 90° − ${a}° = <b>${90-a}°</b>.<div class="box err"><b>Ловушка</b>180° − ${a}° = ${180-a}° — забыли прямой угол.</div>`,
  explain2:`Через сумму всех углов: 180° − 90° − ${a}° = ${90-a}°.`};});
G(1,()=>{for(;;){const m=R(1,7),n=R(1,8);if(m>=n||H.gcd(m,n)!==1||90%(m+n))continue;const u=90/(m+n);const a=m*u,b=n*u;
 return {type:'num',q:`Острые углы прямоугольного треугольника относятся как ${m} : ${n}. Найди больший острый угол (в градусах).`,ans:b,pic:rtFig(rtA(a),{ang:[['A','B','C',m+'x',{n:1}],['B','C','A',n+'x',{n:1}]]}),
  short:`${m}x + ${n}x = 90 → x = ${u}; ${n}x = ${b}°.`,hint:'Сумма острых углов 90°. Обозначь одну часть x.',
  explain:`Углы ${m}x и ${n}x, их сумма 90°: ${m+n}x = 90 → x = ${u}°.<br>Больший угол: ${n} · ${u}° = <b>${b}°</b> (меньший ${a}°).`,
  explain2:`90° делим на ${m+n} частей по ${u}°. Больший угол — ${n} частей: ${b}°. Проверка: ${a} + ${b} = 90 ✅.`};}});
G(1,()=>{const a=R(20,70);if(a===45)return null;const P=rtA(a);P.H=foot(P.C,P.A,P.B);const ask=R(0,1);
 return {type:'num',q:`В треугольнике ABC: ∠C = 90°, ∠A = ${a}°, CH — высота. Найди ${ask?'∠ACH':'∠BCH'} (в градусах).`,pic:rtFig(P,{seg:[['C','H',{col:'var(--accent)',sw:2}]],rt:[['C','A','B'],['H','B','C']],ang:[['A','B','C',a+'°',{n:1}],ask?['C','A','H','?',{n:1,r:30}]:['C','H','B','?',{n:1,r:30}]]}),ans:ask?90-a:a,
  short:ask?`В ΔACH: 90° − ${a}° = ${90-a}°.`:`∠BCH = 90° − ∠B = ∠A = ${a}°.`,hint:ask?'Рассмотри прямоугольный треугольник ACH.':'Найди ∠B, потом рассмотри ΔBCH.',
  explain:ask?`ΔACH прямоугольный (∠H = 90°): ∠ACH = 90° − ∠A = 90° − ${a}° = <b>${90-a}°</b>.`:`∠B = 90° − ${a}° = ${90-a}°. ΔBCH прямоугольный: ∠BCH = 90° − ${90-a}° = <b>${a}°</b>.`,
  explain2:`Запомни: высота из прямого угла «меняет углы местами»: ∠ACH = ∠B = ${90-a}°, ∠BCH = ∠A = ${a}°.`};});
G(1,()=>{const b=R(15,75);const e=180-b;const P=rtA(90-b);P.E=[0,P.B[1]+2.2];
 return {type:'num',q:`В треугольнике ABC: ∠C = 90°. Внешний угол при вершине B равен ${e}°. Найди ∠A (в градусах).`,pic:rtFig(P,{seg:[['B','E',{dash:true}]],ang:[['B','A','E',e+'°',{n:1}]],lab:['A','B','C']}),ans:e-90,
  short:`∠B = 180° − ${e}° = ${b}°, ∠A = 90° − ${b}° = ${e-90}°.`,hint:'Внешний угол и внутренний — смежные.',
  explain:`∠B = 180° − ${e}° = ${b}° (смежные). ∠A = 90° − ${b}° = <b>${e-90}°</b>.`,
  explain2:`Внешний угол = сумма двух внутренних, не смежных с ним: ${e}° = 90° + ∠A → ∠A = ${e-90}° ✅.`};});

/* ===== L2 ===== */
G(2,()=>CH('Какой катет прямоугольного треугольника равен половине гипотенузы?','Катет, лежащий против угла 30°',['Катет, прилежащий к углу 30°','Катет, лежащий против угла 60°','Любой катет'],
 {short:'Против 30° — половина гипотенузы.',
 explain:'Свойство: <b>катет, лежащий против угла 30°</b>, равен половине гипотенузы. Прилежащий к углу 30° катет — это тот, что лежит против угла 60°, он длиннее (≈ 0,87 гипотенузы).',
 explain2:`Приложи к треугольнику его зеркальную копию — получится равносторонний треугольник. Катет против 30° — ровно половина его стороны.${fig(f30b)}`}),{rule:true});
G(2,()=>CH('Какое утверждение — обратное к свойству катета против 30°?','Если катет равен половине гипотенузы, то угол против этого катета равен 30°',['Если угол равен 30°, то гипотенуза вдвое меньше катета','Если катет равен половине гипотенузы, то угол против него равен 60°','Если один угол 30°, то другой 30°'],
 {short:'Катет = c/2 → угол против него 30°.',
 explain:'Прямое свойство: «угол 30° → противолежащий катет = c/2». Обратное: «<b>катет = c/2 → противолежащий ему угол = 30°</b>». Угол 60° лежит против другого, большего катета.',
 explain2:'Пример: лестница 4 м, её верх на высоте 2 м. Высота = половина длины → угол лестницы с землёй (против высоты) равен 30°.'}),{rule:true});
G(2,()=>{const c=2*R(2,15);const v=R(0,1);const P=rtA(30,8);
 return {type:'num',q:`В треугольнике ABC: ∠C = 90°, ${v?'∠B = 60°':'∠A = 30°'}, AB = ${c}. Найди BC.`,pic:rtFig(P,{ang:[v?['B','C','A','60°',{n:1}]:['A','B','C','30°',{n:1}]],side:[['A','B',String(c)],['B','C','?']]}),ans:c/2,
  short:`${v?'∠A = 30°; ':''}BC лежит против 30° → ${c}/2 = ${c/2}.`,hint:v?'Найди ∠A. Против какого угла лежит BC?':'BC лежит против угла A.',
  explain:`${v?`∠A = 90° − 60° = 30°. `:''}Катет BC лежит против угла A = 30°, значит, BC = AB / 2 = ${c} / 2 = <b>${c/2}</b>.<div class="box err"><b>Ловушка</b>Половине гипотенузы равен катет <b>против</b> 30°. Катет AC (прилежащий к 30°) не равен ${c/2} — он больше.</div>`,
  explain2:`Представь равносторонний треугольник со стороной ${c}: его половинка — наш треугольник, и BC — половина стороны: ${c/2}.`};});
G(2,()=>{const x=R(2,20);const P=rtA(30,8);
 return {type:'num',q:`В треугольнике ABC: ∠C = 90°, ∠A = 30°, BC = ${x}. Найди гипотенузу AB.`,pic:rtFig(P,{ang:[['A','B','C','30°',{n:1}]],side:[['B','C',String(x)],['A','B','?']]}),ans:2*x,
  short:`AB = 2 · BC = ${2*x}.`,hint:'BC лежит против угла 30°.',
  explain:`BC — катет против угла 30°, он равен половине гипотенузы. Значит, AB = 2 · ${x} = <b>${2*x}</b>.`,explain2:`Если половина равна ${x}, то целое — ${x} + ${x} = ${2*x}.`};});
G(2,()=>{const x=R(2,16);const S=3*x;const P=rtA(30,8);
 return {type:'num',q:`В прямоугольном треугольнике один острый угол 60°, а сумма гипотенузы и меньшего катета равна ${S} см. Найди гипотенузу (в см).`,ans:2*x,pic:rtFig(P,{ang:[['B','C','A','60°',{n:1}]],side:[['A','B','2x'],['B','C','x']]}),
  short:`x + 2x = ${S} → x = ${x}, гипотенуза ${2*x}.`,hint:'Второй острый угол 30°. Меньший катет лежит против него. Обозначь его x.',
  explain:`Второй острый угол 90° − 60° = 30°. Меньший катет лежит против меньшего угла — против 30°, поэтому он равен половине гипотенузы. Пусть катет x, гипотенуза 2x.<br>x + 2x = ${S} → x = ${x}. Гипотенуза: <b>${2*x} см</b>.`,
  explain2:`Сумма состоит из 3 равных частей (1 часть — катет, 2 части — гипотенуза). Часть = ${S} : 3 = ${x}; гипотенуза = 2 части = ${2*x}.`};});
G(2,()=>{const x=R(2,15);const ask=R(0,1);const P=rtA(30,8);
 return {type:'num',q:`В треугольнике ABC: ∠C = 90°, AB = ${2*x}, BC = ${x}. Найди ${ask?'∠B':'∠A'} (в градусах).`,pic:rtFig(P,{side:[['A','B',String(2*x)],['B','C',String(x)]]}),ans:ask?60:30,
  short:`BC = AB/2 → ∠A = 30°${ask?', ∠B = 60°':''}.`,hint:'Катет равен половине гипотенузы. Что это значит для угла против него?',
  explain:`BC = ${x} = ${2*x}/2 — катет равен половине гипотенузы. По обратному свойству угол против него ∠A = 30°.${ask?' Тогда ∠B = 90° − 30° = <b>60°</b>.':' Ответ: <b>30°</b>.'}`,
  explain2:'Отрази треугольник относительно AC: получится треугольник со сторонами AB, AB и 2·BC = AB — равносторонний. Значит, ∠B = 60°, ∠A = 30°.'};});

/* ===== L3 ===== */
G(3,()=>CH('Чему равна медиана прямоугольного треугольника, проведённая к гипотенузе?','Половине гипотенузы',['Половине большего катета','Высоте, проведённой к гипотенузе','Сумме катетов, делённой на 2'],
 {short:'CM = AB/2.',
 explain:'Медиана из вершины прямого угла к гипотенузе равна <b>половине гипотенузы</b>: середина гипотенузы равноудалена от всех трёх вершин. Высота к гипотенузе обычно короче медианы (совпадают только в равнобедренном прямоугольном треугольнике).',
 explain2:`Дострой треугольник до прямоугольника: диагонали равны и делятся пополам. Половина диагонали — это и есть медиана.${fig(fRect)}`}),{rule:true});
G(3,()=>CH('В треугольнике ABC медиана CM равна половине стороны AB. Что можно сказать об угле C?','∠C = 90°',['∠C = 60°','∠C = 30°','Ничего определённого'],
 {short:'Обратное свойство медианы: угол C прямой.',
 explain:'Если CM = AM = MB, то треугольники AMC и BMC равнобедренные: ∠ACM = ∠A, ∠BCM = ∠B. Тогда ∠C = ∠A + ∠B, а все три угла в сумме 180°: 2∠C = 180° → <b>∠C = 90°</b>.',
 explain2:'Точки A, B, C лежат на окружности с центром M и диаметром AB. Угол, опирающийся на диаметр, — прямой (это ты узнаешь в 8 классе).'}),{rule:true});
G(3,()=>{const m=R(2,15);const ask=R(0,1);const P=rtA(R(25,65),8);P.M=mid(P.A,P.B);
 return ask?{type:'num',q:`В треугольнике ABC: ∠C = 90°, AB = ${2*m}, CM — медиана. Найди CM.`,pic:rtFig(P,{seg:[['C','M',{col:'var(--accent)',sw:2}]],tick:[['A','M',1],['M','B',1]],side:[['A','B',String(2*m)],['C','M','?']]}),ans:m,
   short:`CM = AB/2 = ${m}.`,hint:'Медиана к гипотенузе…',explain:`Медиана к гипотенузе равна её половине: CM = ${2*m} / 2 = <b>${m}</b>.`,explain2:`Середина гипотенузы M — центр «окружности» через A, B и C: MA = MB = MC = ${m}.`}
  :{type:'num',q:`В треугольнике ABC: ∠C = 90°, медиана CM = ${m}. Найди гипотенузу AB.`,pic:rtFig(P,{seg:[['C','M',{col:'var(--accent)',sw:2}]],tick:[['A','M',1],['M','B',1]],side:[['C','M',String(m)],['A','B','?']]}),ans:2*m,
   short:`AB = 2 · CM = ${2*m}.`,hint:'Медиана к гипотенузе равна её половине.',explain:`CM = AB/2 → AB = 2 · ${m} = <b>${2*m}</b>.`,explain2:`AM = MB = CM = ${m} → AB = ${m} + ${m} = ${2*m}.`};});
G(3,()=>{const a=R(20,70);if(a===45)return null;const P=rtA(a,8);P.M=mid(P.A,P.B);const ask=R(0,2);const nm=['∠ACM','∠BCM','∠BMC'][ask];const ans=[a,90-a,2*a][ask];
 return {type:'num',q:`В треугольнике ABC: ∠C = 90°, ∠A = ${a}°, CM — медиана. Найди ${nm} (в градусах).`,pic:rtFig(P,{seg:[['C','M',{col:'var(--accent)',sw:2}]],tick:[['A','M',1],['M','B',1],['C','M',1]],ang:[['A','B','C',a+'°',{n:1}]]}),ans,
  short:['ΔAMC равнобедренный → ∠ACM = ∠A.','∠BCM = 90° − ∠ACM.','∠BMC — внешний угол ΔAMC: 2∠A.'][ask].replace('∠A.',`∠A = ${a}°.`)+(ask?` = ${ans}°`:''),hint:'CM = AM — треугольник AMC равнобедренный.',
  explain:`CM = AM = AB/2, поэтому ΔAMC равнобедренный и ∠ACM = ∠A = ${a}°. ${ask===1?`∠BCM = 90° − ${a}° = <b>${ans}°</b>.`:ask===2?`∠BMC — внешний угол ΔAMC при вершине M: ∠BMC = ∠A + ∠ACM = ${a}° + ${a}° = <b>${ans}°</b>.`:`Ответ: <b>${a}°</b>.`}`,
  explain2:`Медиана к гипотенузе режет треугольник на два равнобедренных: AM = CM и BM = CM. В каждом углы при основании равны: ∠ACM = ${a}°, ∠BCM = ∠B = ${90-a}°.`};});
G(3,()=>{const b=R(20,70);if(b===45)return null;const P=rtA(90-b,8);P.M=mid(P.A,P.B);
 return {type:'num',q:`В треугольнике ABC проведена медиана CM, и CM = AB/2. ∠B = ${b}°. Найди ∠A (в градусах).`,pic:geo({P,poly:[['A','B','C']],seg:[['C','M',{col:'var(--accent)',sw:2}]],tick:[['A','M',1],['M','B',1],['C','M',1]],ang:[['B','C','A','',{n:1}]],maxH:200,W:270}),ans:90-b,
  short:`CM = AB/2 → ∠C = 90° → ∠A = ${90-b}°.`,hint:'Медиана равна половине стороны — какой тогда угол C?',
  explain:`Медиана CM равна половине стороны AB → угол C, лежащий против AB, прямой. Тогда ∠A = 90° − ${b}° = <b>${90-b}°</b>.`,
  explain2:`Подробно: MB = MC → ∠BCM = ∠B = ${b}°; MA = MC → ∠ACM = ∠A. ∠A + ∠B + (∠A + ∠B) = 180° → ∠A + ∠B = 90° → ∠A = ${90-b}°.`};});

/* ===== L4 ===== */
G(4,()=>CH('Какой из наборов <b>НЕ</b> является признаком равенства прямоугольных треугольников?','Два острых угла',['Гипотенуза и катет','Гипотенуза и острый угол','Два катета'],
 {short:'Два острых угла — не признак.',
 explain:'Признаки: два катета; катет и прилежащий острый угол; гипотенуза и острый угол; гипотенуза и катет. А <b>два острых угла</b> не определяют размер: маленький и большой треугольник 30°–60°–90° разные.',
 explain2:'Прямой угол у обоих треугольников уже равен. Двух острых углов тогда мало — нужна хотя бы одна сторона.'}),{rule:true});
G(4,()=>CH('Как звучит признак равенства прямоугольных треугольников по гипотенузе и катету?','Если гипотенуза и катет одного прямоугольного треугольника соответственно равны гипотенузе и катету другого, то треугольники равны',['Если гипотенуза одного треугольника равна катету другого, то треугольники равны','Если гипотенузы равны, то прямоугольные треугольники равны','Если катет и угол одного треугольника равны гипотенузе и углу другого, то треугольники равны'],
 {short:'Гипотенуза = гипотенузе, катет = катету.',
 explain:'Признак: <b>гипотенуза и катет</b> одного треугольника равны гипотенузе и катету другого → треугольники равны. Одной гипотенузы мало: катеты можно «перераспределить» (при гипотенузе 10 бывают катеты 6 и 8, а бывают 5 и ≈ 8,66).',
 explain2:'Приложи треугольники равными катетами, чтобы гипотенузы оказались по разные стороны. Получится равнобедренный треугольник (боковые — равные гипотенузы), а катет — его высота. Высота равнобедренного делит его на две равные половины.'}),{rule:true});
G(4,()=>{const kind=R(0,4);const al=R(28,62);const T=rtA(al,7);const o={rot:R(-30,30),flip:Math.random()<0.5};
 /* indices: A=0,B=1,C=2 in pairFig; C right angle */
 if(kind===0)Object.assign(o,{s:[[0,2,1],[1,2,2]]});
 if(kind===1)Object.assign(o,{s:[[0,2,1]],a:[[0,1]]});
 if(kind===2)Object.assign(o,{s:[[0,1,1]],a:[[0,1]]});
 if(kind===3)Object.assign(o,{s:[[0,1,1],[1,2,2]]});
 if(kind===4){const k=pick([0.65,1.45]);o.T2={A:mul(T.A,k),B:mul(T.B,k),C:mul(T.C,k)};o.a=[[0,1],[1,2]];delete o.rot;delete o.flip;}
 let fig=pairFig(T,o);
 /* add right-angle marks: draw by re-rendering with geo directly */
 const K1=['A','B','C'],K2=['A1','B1','C1'];const src=o.T2?[o.T2.A,o.T2.B,o.T2.C]:[T.A,T.B,T.C];const P=Object.assign({A:T.A,B:T.B,C:T.C},placeRight([T.A,T.B,T.C],src,K2,{flip:o.flip,rot:o.rot}));
 const tick=[],ang=[];(o.s||[]).forEach(([i,j,n])=>{tick.push([K1[i],K1[j],n],[K2[i],K2[j],n]);});(o.a||[]).forEach(([i,n])=>{const ot=[0,1,2].filter(x=>x!==i);ang.push([K1[i],K1[ot[0]],K1[ot[1]],'',{n}],[K2[i],K2[ot[0]],K2[ot[1]],'',{n}]);});
 fig=geo({P,poly:[K1,K2],tick,ang,rt:[['C','A','B'],['C1','A1','B1']],names:NM1,fill:[{pts:K1,op:0.14},{pts:K2,op:0.26}],maxH:150,W:320,pad:24});
 const ex=['Отмечены оба катета (стороны у прямого угла) → <b>по двум катетам</b>.','Отмечены катет AC и острый угол A, который к нему прилежит → <b>по катету и прилежащему острому углу</b>.','Отмечены гипотенуза AB (против прямого угла) и острый угол → <b>по гипотенузе и острому углу</b>.','Отмечены гипотенуза AB и катет BC → <b>по гипотенузе и катету</b>.','Отмечены только острые углы — сторон нет. Треугольники одной формы, но разного размера → <b>равенство не следует</b>.'][kind];
 return {type:'choice',q:'Оба треугольника прямоугольные. По какому признаку они равны?',pic:fig,opts:CRR.slice(),ans:kind,
  short:ex.replace(/<[^>]+>/g,''),explain:ex+' Сначала найди гипотенузу (напротив прямого угла), потом смотри, какие элементы отмечены.',
  explain2:'Алгоритм: отмечена гипотенуза? Если да — второй элемент катет или угол. Если нет — оба катета или катет + угол при нём. Если отмечены только углы — признака нет.'};});
G(4,()=>{const al=2*R(15,40);const d=R(2,12);const A=[0,0];const D=polar(A,d/Math.sin(al/2*D2R),al/2);const E=foot(D,A,[1,0]),F=foot(D,A,polar(A,1,al));
 const P={A,D,E,F,X:polar(A,dist(A,E)*1.35,0),Y:polar(A,dist(A,E)*1.35,al)};
 return {type:'num',q:`Точка D лежит на биссектрисе угла A. Из D опущены перпендикуляры DE и DF на стороны угла. DE = ${d}. Найди DF.`,
  pic:geo({P,seg:[['A','X'],['A','Y'],['A','D',{dash:true}],['D','E',{col:'var(--accent)',sw:2}],['D','F',{col:'var(--accent)',sw:2}]],rt:[['E','A','D'],['F','A','D']],ang:[['A','E','D','',{n:1,r:30}],['A','D','F','',{n:1,r:34}]],side:[['D','E',String(d)]],lab:['A','D','E','F'],maxH:190,W:260}),ans:d,
  short:`ΔAED = ΔAFD (гипотенуза AD и острый угол) → DF = DE = ${d}.`,hint:'Сравни прямоугольные треугольники AED и AFD. Что у них общее?',
  explain:`ΔAED и ΔAFD прямоугольные (∠E = ∠F = 90°), гипотенуза AD — общая, ∠EAD = ∠FAD (AD — биссектриса). По гипотенузе и острому углу они равны → DF = DE = <b>${d}</b>.`,
  explain2:'Свойство биссектрисы угла: каждая её точка равноудалена от сторон угла. Это как середина дороги: от неё одинаково далеко до обеих обочин.'};});
G(4,()=>{const c=R(8,16),x=R(3,c-3);const y=Math.sqrt(c*c-x*x);const P={A:[0,0],B:[c,0]};P.C=(()=>{const t=x/c;const f=lerp(P.A,P.B,t*t);return [f[0],Math.sqrt(Math.max(0,x*x-f[0]*f[0]))];})();P.D=[c-P.C[0],P.C[1]];
 return {type:'num',q:`Треугольники ABC и BAD прямоугольные (∠C = ∠D = 90°) с общей гипотенузой AB, точки C и D лежат по одну сторону от AB. BC = AD, AC = ${x}. Найди BD.`,
  pic:geo({P,poly:[['A','B','C'],['A','B','D']],rt:[['C','A','B'],['D','A','B']],tick:[['B','C',1],['A','D',1]],side:[['A','C',String(x)]],maxH:170,W:280}),ans:x,
  short:`ΔABC = ΔBAD (гипотенуза и катет) → BD = AC = ${x}.`,hint:'Признак по гипотенузе и катету.',
  explain:`ΔABC и ΔBAD прямоугольные, гипотенуза AB — общая, катеты BC = AD. По гипотенузе и катету ΔABC = ΔBAD (A ↔ B, C ↔ D). Значит, второй катет BD = AC = <b>${x}</b>.`,
  explain2:'Соответствие: катет BC (у вершины B) ↔ катет AD (у вершины A). Тогда оставшиеся катеты тоже соответствуют: AC ↔ BD.'};});

/* ===== L5 ===== */
G(5,()=>CH('Что называется расстоянием от точки до прямой?','Длина перпендикуляра, проведённого из точки к прямой',['Длина любого отрезка от точки до прямой','Длина самой длинной наклонной','Угол между наклонной и прямой'],
 {short:'Расстояние = длина перпендикуляра.',
 explain:'<b>Расстояние от точки до прямой</b> — длина перпендикуляра из точки к прямой. Это самый короткий из всех отрезков, соединяющих точку с прямой: любая наклонная — гипотенуза, а перпендикуляр — катет.',
 explain2:'Если ты стоишь на поле и хочешь как можно быстрее добежать до боковой линии, беги перпендикулярно ей. Длина этого пути и есть расстояние.'}),{rule:true});
G(5,()=>{const M=[R(2,6),R(3,5)];const xs=shuffle([M[0],M[0]-R(2,3),M[0]+R(2,3),M[0]+R(4,5)]);const P={M};const nm=['K','L','N','P'];xs.forEach((x,i)=>P[nm[i]]=[x,0]);P.X0=[Math.min(...xs)-1,0];P.X1=[Math.max(...xs)+1,0];
 const ri=xs.indexOf(M[0]);
 return CH('Какой отрезок равен расстоянию от точки M до прямой a?',`M${nm[ri]}`,nm.filter((_,i)=>i!==ri).map(n=>'M'+n),{pic:geo({P,seg:[['X0','X1'],...nm.map(n=>['M',n,{col:n===nm[ri]?'var(--fig)':'var(--fig)',dash:n!==nm[ri]}])],rt:[[nm[ri],'X1','M']],lab:['M',...nm],txt:[[[P.X1[0]-0.2,0.45],'a',{fs:15,col:'var(--accent-ink)'}]],maxH:170,W:300}),
  short:`M${nm[ri]} ⊥ a — это перпендикуляр.`,explain:`Расстояние — длина <b>перпендикуляра</b>. На рисунке значок прямого угла стоит при точке ${nm[ri]}: M${nm[ri]} ⊥ a. Остальные отрезки — наклонные, они длиннее.`,
  explain2:`Каждая наклонная — гипотенуза прямоугольного треугольника с катетом M${nm[ri]}. Гипотенуза длиннее катета, поэтому M${nm[ri]} — самый короткий.`});});
G(5,()=>{const d=R(2,15);const P={M:[0,d*Math.tan(30*D2R)],A:[0,0]};P.M=[0,0];P.H=[0,0];/* draw: slant MA at 30° */
 const A=[0,0],H=[2*d*Math.cos(30*D2R),0],M=[H[0],d];const PP={A,H,M,X0:[-1,0],X1:[H[0]+2,0]};
 return {type:'num',q:`Из точки M к прямой a проведена наклонная MA = ${2*d}. Она образует с прямой угол 30°. Найди расстояние от M до прямой a.`,pic:geo({P:PP,seg:[['X0','X1'],['M','A'],['M','H',{dash:true,col:'var(--accent)'}]],rt:[['H','X1','M']],ang:[['A','X1','M','30°',{n:1}]],side:[['A','M',String(2*d)]],lab:['A','H','M'],maxH:150,W:280}),ans:d,
  short:`MH — катет против 30°: ${2*d}/2 = ${d}.`,hint:'Опусти перпендикуляр MH. В ΔMHA какой угол 30°?',
  explain:`Опустим перпендикуляр MH. В прямоугольном ΔMHA угол A = 30°, MA — гипотенуза. Катет MH лежит против угла 30° → MH = ${2*d}/2 = <b>${d}</b>.`,
  explain2:`Расстояние — перпендикуляр, он короче наклонной. При угле 30° он ровно в 2 раза короче: ${d}.`};});
G(5,()=>{const d=R(2,12);const A=[0,0],H=[2*d*Math.cos(30*D2R),0],M=[H[0],d];const PP={A,H,M,X0:[-1,0],X1:[H[0]+2,0]};
 return {type:'num',q:`Расстояние от точки M до прямой a равно ${d}. Наклонная MA = ${2*d}. Найди угол между наклонной MA и прямой a (в градусах).`,pic:geo({P:PP,seg:[['X0','X1'],['M','A'],['M','H',{dash:true,col:'var(--accent)'}]],rt:[['H','X1','M']],ang:[['A','X1','M','?',{n:1}]],side:[['A','M',String(2*d)],['M','H',String(d),{flip:true}]],lab:['A','H','M'],maxH:150,W:280}),ans:30,
  short:`MH = MA/2 → ∠A = 30°.`,hint:'Катет равен половине гипотенузы…',
  explain:`MH — перпендикуляр (катет), MA — гипотенуза. MH = ${d} = ${2*d}/2 — катет равен половине гипотенузы, значит, угол против него ∠MAH = <b>30°</b>.`,
  explain2:'Обратное свойство: «половина гипотенузы → 30° напротив». Напротив MH лежит как раз угол A.'};});
G(5,()=>{const b=2*R(2,14);const P=rtA(30,8);P.H=foot(P.C,P.A,P.B);
 return {type:'num',q:`В треугольнике ABC: ∠C = 90°, ∠A = 30°, AC = ${b}. Найди расстояние от точки C до прямой AB.`,pic:rtFig(P,{seg:[['C','H',{dash:true,col:'var(--accent)'}]],rt:[['C','A','B'],['H','A','C']],ang:[['A','B','C','30°',{n:1}]],side:[['A','C',String(b)]]}),ans:b/2,
  short:`CH — катет против 30° в ΔACH: ${b}/2 = ${b/2}.`,hint:'Расстояние — перпендикуляр CH. Рассмотри ΔACH.',
  explain:`Расстояние от C до AB — длина перпендикуляра CH. В прямоугольном ΔACH (∠H = 90°) гипотенуза AC = ${b}, угол A = 30°, катет CH лежит против него → CH = ${b}/2 = <b>${b/2}</b>.`,
  explain2:`Не перепутай: здесь гипотенузой служит AC (в маленьком треугольнике ACH), а не AB.`};});

/* ===== L6 ===== */
G(6,()=>CH('Лестница стоит под углом 60° к земле. Какое свойство поможет найти, на каком расстоянии от стены стоит её нижний конец?','Катет против угла 30° равен половине гипотенузы',['Медиана к гипотенузе равна половине гипотенузы','Сумма острых углов равна 180°','Перпендикуляр длиннее наклонной'],
 {short:'Угол у стены 30° → расстояние = половина лестницы.',
 explain:'Стена, земля и лестница образуют прямоугольный треугольник: лестница — гипотенуза. Угол между лестницей и стеной 90° − 60° = 30°, а против него лежит отрезок земли от стены до лестницы. Значит, он равен <b>половине длины лестницы</b> — свойство катета против 30°.',
 explain2:'Неверные варианты: сумма острых углов 90°, а не 180°; перпендикуляр короче наклонной, а не длиннее; медиана здесь не нужна.'}),{rule:true});
G(6,()=>{const L=pick([3,4,5,6,7,8,9,10,2.5,3.5,4.5,5.5]);const W={O:[0,0],T:[0,L*Math.sin(60*D2R)],F:[L/2,0]};W.W1=[0,W.T[1]+0.8];W.G=[L/2+1.2,0];
 return {type:'num',q:`Лестница длиной ${N(L)} м приставлена к стене и образует с землёй угол 60°. На каком расстоянии от стены стоит нижний конец лестницы (в м)?`,ans:L/2,
  pic:geo({P:W,seg:[['O','W1',{sw:4,col:'var(--muted)'}],['O','G',{sw:3,col:'var(--muted)'}],['T','F',{sw:3,col:'var(--accent)'}]],rt:[['O','G','T']],ang:[['F','G','T','60°',{n:1}]],side:[['T','F',N(L)+' м'],['O','F','?']],lab:[],maxH:180,W:240}),
  short:`Угол у стены 30° → ${N(L)}/2 = ${N(L/2)} м.`,hint:'Найди угол между лестницей и стеной. Против него лежит нужный отрезок.',
  explain:`Стена ⊥ земля, лестница — гипотенуза. Угол между лестницей и стеной: 90° − 60° = 30°. Против него лежит отрезок земли от стены до лестницы → он равен ${N(L)}/2 = <b>${N(L/2)} м</b>.`,
  explain2:`Отрази лестницу в стене: две лестницы и земля между их концами образуют равносторонний треугольник (все углы 60°). Расстояние между концами = ${N(L)} м, от стены — половина.`};});
G(6,()=>{const L=pick([3,4,5,6,7,8,4.5,5.5,6.5]);const w=L*Math.cos(30*D2R);const P={A:[0,0],C:[2*w,0],B:[w,L/2],H:[w,0]};
 return {type:'num',q:`Двускатная крыша: каждое стропило длиной ${N(L)} м наклонено к горизонтальному перекрытию под углом 30°. На какой высоте над перекрытием находится конёк крыши (в м)?`,ans:L/2,
  pic:geo({P,poly:[['A','B','C']],seg:[['B','H',{dash:true}]],rt:[['H','C','B']],ang:[['A','B','C','30°',{n:1}]],tick:[['A','B',1],['B','C',1]],side:[['A','B',N(L)+' м'],['B','H','?',{flip:true}]],lab:[],maxH:150,W:300}),
  short:`Высота — катет против 30°: ${N(L)}/2 = ${N(L/2)} м.`,hint:'Опусти перпендикуляр из конька на перекрытие.',
  explain:`Перпендикуляр из конька BH и стропило AB образуют прямоугольный треугольник ABH с углом A = 30°. Высота BH лежит против 30° → BH = ${N(L)}/2 = <b>${N(L/2)} м</b>.`,
  explain2:`«Уклон 30°» — это когда на каждые 2 м стропила крыша поднимается на 1 м. ${N(L)} м стропила → ${N(L/2)} м подъёма.`};});
G(6,()=>{const h=pick([1,1.5,2,2.5,3,3.5]);const P={A:[0,0],B:[2*h*Math.cos(30*D2R),0],T:[0,h]};
 return {type:'num',q:`Ледяная горка наклонена к земле под углом 30°, её верхняя площадка на высоте ${N(h)} м. Какова длина ската (в м)?`,ans:2*h,
  pic:geo({P,poly:[['A','B','T']],fill:[{pts:['A','B','T'],op:0.2}],rt:[['A','B','T']],ang:[['B','T','A','30°',{n:1}]],side:[['A','T',N(h)+' м',{flip:true}],['T','B','?']],lab:[],maxH:140,W:280}),
  short:`Скат = 2 · ${N(h)} = ${N(2*h)} м.`,hint:'Высота лежит против угла 30°.',
  explain:`Скат — гипотенуза, высота — катет против угла 30° (угол наклона при нижнем конце). Катет = половина гипотенузы → скат = 2 · ${N(h)} = <b>${N(2*h)} м</b>.`,
  explain2:`Проверка: половина от ${N(2*h)} — это ${N(h)} ✅.`};});
G(6,()=>{const L=pick([2,3,4,5,6,8,10,3.6,4.4]);const al=R(25,70);const O=[0,0],T=[0,L*Math.sin(al*D2R)],F=[L*Math.cos(al*D2R),0];const M=mid(T,F);
 return {type:'num',q:`Лестница длиной ${N(L)} м стоит у стены. Ровно на её середине сидит котёнок. На каком расстоянии от угла O между стеной и полом находится котёнок (в м)? Подсказка: угол наклона лестницы не важен!`,ans:L/2,
  pic:geo({P:{O,T,F,M},seg:[['O',[0,T[1]+0.6],{sw:4,col:'var(--muted)'}],['O',[F[0]+0.6,0],{sw:3,col:'var(--muted)'}],['T','F',{sw:3,col:'var(--accent)'}],['O','M',{dash:true}]],rt:[['O','F','T']],dots:['M'],side:[['T','F',N(L)+' м']],lab:['O','M'],extra:[[0,T[1]+0.6],[F[0]+0.6,0]],maxH:180,W:240}),
  short:`OM — медиана к гипотенузе: ${N(L)}/2 = ${N(L/2)} м.`,hint:'Стена ⊥ пол. OM — какой отрезок в треугольнике?',
  explain:`Стена, пол и лестница — прямоугольный треугольник с гипотенузой-лестницей. OM — медиана к гипотенузе, она равна половине гипотенузы: <b>${N(L/2)} м</b> — при любом наклоне!`,
  explain2:'Поэтому, когда лестница соскальзывает, котёнок движется по дуге окружности с центром в углу O.'};});

/* ===== L7 ★ ===== */
G(7,()=>CH('Лестница скользит: верхний конец — по стене, нижний — по полу. По какой линии движется середина лестницы?','По дуге окружности с центром в углу между стеной и полом',['По прямой, параллельной лестнице','По прямой, соединяющей начальное и конечное положения','По дуге окружности с центром в нижнем конце лестницы'],
 {short:'Середина всегда на расстоянии L/2 от угла.',
 explain:'Стена, пол и лестница образуют прямоугольный треугольник; отрезок от угла O до середины лестницы M — медиана к гипотенузе, OM = L/2 при любом положении. Все точки на постоянном расстоянии от O лежат на <b>окружности с центром O</b> радиусом L/2 (точнее, на её четверти).',
 explain2:'Проверь на крайних положениях: лестница стоит вертикально — середина на стене на высоте L/2; лежит на полу — середина на полу на расстоянии L/2. А при 45° — тоже на расстоянии L/2 от угла. Это дуга!'}),{rule:true,star:true});
G(7,()=>{const k=R(1,9);const ask=R(0,2);const P=rtA(30,8);P.H=foot(P.C,P.A,P.B);
 const q=ask===0?`BH = ${k}. Найди AH.`:ask===1?`BH = ${k}. Найди AB.`:`AB = ${4*k}. Найди AH.`;const ans=ask===1?4*k:3*k;
 /* numeric check */if(Math.abs(dist(P.A,P.H)/dist(P.B,P.H)-3)>1e-9)return null;
 return {type:'num',q:`В треугольнике ABC: ∠C = 90°, ∠A = 30°, CH — высота. ${q}`,pic:rtFig(P,{seg:[['C','H',{col:'var(--accent)',sw:2}]],rt:[['C','A','B'],['H','B','C']],ang:[['A','B','C','30°',{n:1}]]}),ans,
  hint:'Найди ∠BCH. В треугольнике BCH тоже есть угол 30°!',short:`BH = BC/2 = AB/4 → AH = 3·BH, AB = 4·BH.`,
  explain:`∠B = 60°, в ΔBCH: ∠BCH = 30°. Значит, BH = BC/2 (катет против 30° в ΔBCH).<br>В ΔABC: BC = AB/2 (катет против ∠A = 30°).<br>Отсюда BH = AB/4, AH = AB − BH = 3AB/4, то есть AH = 3·BH.<br>${ask===2?`AB = ${4*k} → BH = ${k}, AH = <b>${3*k}</b>.`:`BH = ${k} → AB = ${4*k}, AH = ${3*k}. Ответ: <b>${ans}</b>.`}`,
  explain2:`Цепочка «половинок»: AB → BC = AB/2 → BH = BC/2 = AB/4. Высота делит гипотенузу в отношении 3 : 1.`};},{star:true});
G(7,()=>{const k=R(1,6);const c=8*k;const P=rtA(30,c);P.H=foot(P.C,P.A,P.B);P.K=foot(P.H,P.B,P.C);if(Math.abs(dist(P.B,P.K)-k)>1e-9)return null;
 return {type:'num',q:`В треугольнике ABC: ∠C = 90°, ∠A = 30°, AB = ${c}. Из C проведена высота CH, а из H — перпендикуляр HK на катет BC. Найди BK.`,
  pic:rtFig(P,{seg:[['C','H',{col:'var(--accent)'}],['H','K',{col:'var(--accent)'}]],rt:[['C','A','B'],['H','B','C'],['K','B','H']],ang:[['A','B','C','30°',{n:1}]],side:[['A','B',String(c)]]}),ans:k,
  hint:'Три раза примени свойство катета против 30°: в ΔABC, в ΔCBH, в ΔHBK.',short:`BC = ${4*k}, BH = ${2*k}, BK = ${k}.`,
  explain:`1) ΔABC: BC лежит против ∠A = 30° → BC = ${c}/2 = ${4*k}.<br>2) ΔCBH (∠H = 90°, ∠B = 60°, ∠BCH = 30°): BH = BC/2 = ${2*k}.<br>3) ΔHBK (∠K = 90°, ∠B = 60°, ∠BHK = 30°): BK = BH/2 = <b>${k}</b>.`,
  explain2:`Каждый следующий треугольник — уменьшенная вдвое копия «30°–60°–90°». ${c} → ${4*k} → ${2*k} → ${k}: три раза делим пополам, ${c}/8 = ${k}.`};},{star:true});
G(7,()=>{const c=4*R(1,8);const P=rtA(15,8);P.H=foot(P.C,P.A,P.B);P.M=mid(P.A,P.B);if(Math.abs(dist(P.C,P.H)/dist(P.A,P.B)-0.25)>1e-9)return null;
 return {type:'num',q:`В прямоугольном треугольнике один из острых углов равен 15°, гипотенуза ${c}. Найди высоту, проведённую к гипотенузе.`,pic:rtFig(P,{seg:[['C','H',{col:'var(--accent)',sw:2}],['C','M',{dash:true}]],rt:[['C','A','B'],['H','B','C']],ang:[['A','B','C','15°',{n:1,r:40}]],lab:['A','B','C','H','M'],maxH:150,W:300}),ans:c/4,
  hint:'Проведи медиану CM. Какой угол CMB?',short:`CM = ${c/2}, ∠CMB = 30° → CH = CM/2 = ${c/4}.`,
  explain:`Проведём медиану CM: CM = AM = ${c}/2 = ${c/2}. ΔAMC равнобедренный → ∠ACM = 15°, внешний угол ∠CMB = 15° + 15° = 30°.<br>В прямоугольном ΔCHM угол M = 30°, CM — гипотенуза → CH = CM/2 = <b>${c/4}</b>.`,
  explain2:`Итог-формула: в треугольнике с углом 15° высота к гипотенузе равна четверти гипотенузы: ${c}/4 = ${c/4}.`};},{star:true});
G(7,()=>{const a=R(16,74);if(a===45)return null;const ans=Math.abs(90-2*a);const P=rtA(a,8);P.H=foot(P.C,P.A,P.B);P.M=mid(P.A,P.B);if(Math.abs(angAt(P.C,P.H,P.M)-ans)>1e-6)return null;
 return {type:'num',q:`В треугольнике ABC: ∠C = 90°, ∠A = ${a}°. CH — высота, CM — медиана. Найди угол между ними, ∠HCM (в градусах).`,pic:rtFig(P,{seg:[['C','H',{col:'var(--accent)'}],['C','M',{col:'var(--accent)',dash:true}]],rt:[['C','A','B'],['H','B','C']],ang:[['A','B','C',a+'°',{n:1}]],tick:[['A','M',1],['M','B',1]],lab:['A','B','C','H','M']}),ans,
  hint:'∠ACM = ∠A (медиана к гипотенузе). ∠ACH = ∠B (высота).',short:`∠ACM = ${a}°, ∠ACH = ${90-a}° → ∠HCM = |${a} − ${90-a}| = ${ans}°.`,
  explain:`Медиана: CM = AM → ∠ACM = ∠A = ${a}°.<br>Высота: в ΔACH ∠ACH = 90° − ${a}° = ${90-a}°.<br>Оба угла отсчитываются от CA, поэтому ∠HCM = |${a}° − ${90-a}°| = <b>${ans}°</b>.`,
  explain2:`Формула: угол между высотой и медианой из прямого угла равен разности острых углов: |∠A − ∠B| = |${a} − ${90-a}| = ${ans}°. Если треугольник равнобедренный (45°–45°), высота и медиана совпадают — угол 0°.`};},{star:true});
G(7,()=>{const k=R(1,9);const ask=R(0,1);const P=rtA(30,8);const t=1/3;P.D=lerp(P.C,P.A,t);/* CD = AC/3 */if(Math.abs(angAt(P.B,P.C,P.D)-30)>1e-6)return null;
 return {type:'num',q:`В треугольнике ABC: ∠C = 90°, ∠A = 30°, BD — биссектриса угла B (D на AC). AC = ${3*k}. Найди ${ask?'AD':'CD'}.`,pic:rtFig(P,{seg:[['B','D',{col:'var(--accent)',sw:2}]],ang:[['A','B','C','30°',{n:1}],['B','C','D','',{n:1,r:30}],['B','D','A','',{n:1,r:34}]],side:[['A','C',String(3*k)]]}),ans:ask?2*k:k,
  hint:'∠ABD = 30° = ∠A. Что это значит для ΔABD? А в ΔBCD угол CBD = 30°…',short:`AD = BD = 2·CD → AC = 3·CD; CD = ${k}, AD = ${2*k}.`,
  explain:`∠B = 60°, биссектриса делит его на 30° и 30°.<br>• ΔABD: ∠A = ∠ABD = 30° → равнобедренный, AD = BD.<br>• ΔBCD: ∠C = 90°, ∠CBD = 30° → CD = BD/2 (катет против 30°).<br>Значит, AD = 2·CD, AC = 3·CD = ${3*k} → CD = ${k}, AD = ${2*k}. Ответ: <b>${ask?2*k:k}</b>.`,
  explain2:`Биссектриса угла 60° в треугольнике 30°–60°–90° делит катет AC в отношении 2 : 1, считая от вершины угла 30°.`};},{star:true});
G(7,()=>{const b=2*R(3,15);const P={A:[0,0],C:[b,0],B:[b/2,b/2*Math.tan(30*D2R)]};const t=R(15,85)/100;P.X=lerp(P.A,P.C,t);P.E=foot(P.X,P.A,P.B);P.F=foot(P.X,P.C,P.B);
 const s=dist(P.X,P.E)+dist(P.X,P.F);if(Math.abs(s-b/2)>1e-9)return null;
 return {type:'num',q:`В равнобедренном треугольнике ABC основание AC = ${b}, углы при основании по 30°. Точка X — произвольная точка основания. Найди сумму расстояний от X до боковых сторон AB и BC.`,
  pic:geo({P,poly:[['A','B','C']],seg:[['X','E',{col:'var(--accent)',sw:2}],['X','F',{col:'var(--accent)',sw:2}]],rt:[['E','B','X'],['F','B','X']],tick:[['A','B',1],['B','C',1]],ang:[['A','B','C','',{n:1}],['C','A','B','30°',{n:1}]],side:[['A','C',String(b)]],maxH:150,W:300}),ans:b/2,
  hint:'XE — катет против угла 30° в ΔAXE. То же для XF.',short:`XE = AX/2, XF = XC/2 → XE + XF = AC/2 = ${b/2}.`,
  explain:`ΔAEX прямоугольный, ∠A = 30° → XE = AX/2. ΔCFX: ∠C = 30° → XF = XC/2.<br>XE + XF = (AX + XC)/2 = AC/2 = ${b}/2 = <b>${b/2}</b> — при любом положении X!`,
  explain2:`Проверь крайний случай: X = A. Тогда расстояние до AB равно 0, а до BC — высота из A, которая лежит против угла C = 30° в треугольнике с гипотенузой AC: ${b}/2. Сумма ${b/2} ✅.`};},{star:true});

/* =====================================================================
   WIDGETS
   ===================================================================== */
const fitXY=(pts,W,Hh,pad)=>{const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);const s=Math.min((W-2*pad)/Math.max(x1-x0,1e-6),(Hh-2*pad)/Math.max(y1-y0,1e-6));
  const ox=(W-(x1-x0)*s)/2,oy=(Hh-(y1-y0)*s)/2;return {s,X:p=>[ox+(p[0]-x0)*s,Hh-oy-(p[1]-y0)*s]};};
const svT=(p,t,col,fs)=>`<text x="${r1(p[0])}" y="${r1(p[1])}" text-anchor="middle" font-size="${fs||14}" font-weight="700" fill="${col||'var(--accent-ink)'}">${t}</text>`;
const svL=(a,b,st)=>`<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(b[0])}" y2="${r1(b[1])}" ${st}/>`;
function onTheory(root){
  const w=root.querySelector('#w-30');
  if(w){w.innerHTML=`<label>∠A = <output id="ra">40</output>°<input type="range" id="rA" min="10" max="80" step="1" value="40"></label><div id="rS" style="display:flex;justify-content:center"></div><div id="rO" class="small" style="text-align:center"></div>`;
    const A=w.querySelector('#rA');const draw=()=>{const al=+A.value;w.querySelector('#ra').textContent=al;const c=10;const P=rtA(al,c);const {X}=fitXY([[0,0],[10,0],[0,10]],320,180,16);
      let o=`<svg viewBox="0 0 320 180" width="320" role="img" aria-label="Катет против угла" style="font-family:system-ui,sans-serif">`;
      o+=`<polygon points="${[P.A,P.B,P.C].map(X).map(p=>r1(p[0])+','+r1(p[1])).join(' ')}" fill="var(--hl)" fill-opacity=".2" stroke="var(--fig)" stroke-width="2"/>`+svL(X(P.B),X(P.C),`stroke="var(--accent)" stroke-width="${al===30?5:3}"`);
      o+=svT(add(X(P.A),[10,14]),'A')+svT(sub(X(P.B),[10,4]),'B')+svT(add(X(P.C),[-10,14]),'C')+'</svg>';w.querySelector('#rS').innerHTML=o;const bc=c*Math.sin(al*D2R);
      w.querySelector('#rO').innerHTML=`Гипотенуза AB = 10, катет против ∠A: BC = <span class="out">${N(Math.round(bc*100)/100)}</span>${al===30?' — <b>ровно половина гипотенузы!</b>':''}`;};
    A.oninput=draw;draw();}
  const s=root.querySelector('#w-ladder');
  if(s){s.innerHTML=`<label>Наклон лестницы: <output id="la">60</output>°<input type="range" id="lA" min="5" max="85" step="1" value="60"></label><div id="lS" style="display:flex;justify-content:center"></div><div id="lO" class="small" style="text-align:center"></div>`;
    const A=s.querySelector('#lA');const draw=()=>{const al=+A.value;s.querySelector('#la').textContent=al;const L=8;const T=[0,L*Math.sin(al*D2R)],F=[L*Math.cos(al*D2R),0],M=mid(T,F);const {X,s:sc}=fitXY([[-0.6,-0.5],[8.6,-0.5],[-0.6,8.4]],300,220,10);
      let o=`<svg viewBox="0 0 300 220" width="300" role="img" aria-label="Скользящая лестница" style="font-family:system-ui,sans-serif">`;
      o+=svL(X([0,0]),X([0,8.3]),'stroke="var(--muted)" stroke-width="4"')+svL(X([0,0]),X([8.5,0]),'stroke="var(--muted)" stroke-width="3"');
      const O=X([0,0]);o+=`<path d="M${r1(O[0])},${r1(O[1]-4*sc)} A${r1(4*sc)},${r1(4*sc)} 0 0 1 ${r1(O[0]+4*sc)},${r1(O[1])}" fill="none" stroke="var(--hl)" stroke-width="2" stroke-dasharray="5 4"/>`;
      o+=svL(X(T),X(F),'stroke="var(--accent)" stroke-width="4"')+svL(O,X(M),'stroke="var(--fig)" stroke-width="1.5" stroke-dasharray="4 3"')+`<circle cx="${r1(X(M)[0])}" cy="${r1(X(M)[1])}" r="5" fill="var(--hl)" stroke="var(--fig)"/>`;
      o+=svT(add(O,[-10,14]),'O')+svT(add(X(M),[14,-8]),'M')+'</svg>';s.querySelector('#lS').innerHTML=o;
      s.querySelector('#lO').innerHTML=`Лестница 8 м. Расстояние OM = <span class="out">${N(Math.round(dist([0,0],M)*100)/100)} м</span> — всегда половина лестницы. Середина бегает по дуге окружности!`;};
    A.oninput=draw;draw();}
}

window.TOPIC={id:'g7_right_tri',title:'Прямоугольный треугольник',subtitle:'Геометрия · 7 класс',
intro:`<p>Как египтяне строили прямой угол верёвкой с 12 узлами? Почему середина падающей лестницы движется по окружности? Здесь: катеты и гипотенуза, сумма острых углов, катет против угла 30°, медиана к гипотенузе, признаки равенства прямоугольных треугольников, расстояние от точки до прямой и задачи про крыши, лестницы и горки. В конце — олимпиадные цепочки 30°–60°–90° и треугольник с углом 15°.</p>`,
theory,symbols,figs:{},onTheory,
levels:['Катеты и гипотенуза','Сумма острых углов — 90°','Катет против угла 30°','Медиана к гипотенузе','Признаки равенства прямоугольных треугольников','Расстояние от точки до прямой','Из жизни: крыши, лестницы, горки','★ Олимпиадные задачи'],
gens};
})();
