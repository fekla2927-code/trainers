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
   g7_triangles_eq — признаки равенства треугольников
   ===================================================================== */
const K=['A','B','C'];
const S1=(i,j)=>{const [p,q]=i<j?[i,j]:[j,i];return K[p]+K[q];};
const S2=(i,j)=>{const [p,q]=i<j?[i,j]:[j,i];return K[p]+'₁'+K[q]+'₁';};
const A1n=i=>'∠'+K[i];const A2n=i=>'∠'+K[i]+'₁';
const CRIT=['по первому признаку (две стороны и угол между ними)','по второму признаку (сторона и два прилежащих угла)','по третьему признаку (три стороны)','равенство треугольников не следует'];
const LETS=['KMN','PQR','DEF','MNP','XYZ','KLM','STU','EFG'];
/* proof library: steps [text, deps, reason]; reason null = from the condition */
const RS_={cond:'по условию',side:'общая сторона',angle:'общий угол',vert:'как вертикальные углы',I:'по первому признаку равенства треугольников',II:'по второму признаку равенства треугольников',III:'по третьему признаку равенства треугольников',corr:'как соответственные элементы равных треугольников'};
const RPOOL=Object.values(RS_);
const fKite=(marks)=>{const P=kiteP(5,6.6,8.2);return geo(Object.assign({P,poly:[['A','B','C','D']],seg:[['A','C']],maxH:150,W:260},marks));};
const fCross=(marks)=>{const P=crossP(3.4,2.6,195,125);return geo(Object.assign({P,poly:[['A','O','C'],['B','O','D']],maxH:160,W:260},marks));};
const fAngle=(marks)=>{const O=[0,0];const P={O,A:polar(O,3,0),C:polar(O,6.5,0),B:polar(O,3,48),D:polar(O,6.5,48)};return geo(Object.assign({P,seg:[['O','C'],['O','D'],['A','D'],['B','C']],maxH:170,W:260},marks));};
const PROOFS=[
 {given:'AB = AD, CB = CD (см. рисунок)',goal:'∠ABC = ∠ADC',tri:'ΔABC и ΔADC',fig:()=>fKite({tick:[['A','B',1],['A','D',1],['C','B',2],['C','D',2]]}),
  steps:[['AB = AD',[],'cond'],['CB = CD',[],'cond'],['AC — общая сторона',[],'side'],['ΔABC = ΔADC',[0,1,2],'III'],['∠ABC = ∠ADC',[3],'corr']],wrongTri:['ΔABD и ΔCBD','ΔABC и ΔABD','ΔBCD и ΔACD']},
 {given:'отрезки AB и CD пересекаются в точке O, AO = OB, CO = OD',goal:'AC = BD',tri:'ΔAOC и ΔBOD',fig:()=>fCross({tick:[['A','O',1],['O','B',1],['C','O',2],['O','D',2]]}),
  steps:[['AO = OB',[],'cond'],['CO = OD',[],'cond'],['∠AOC = ∠BOD',[],'vert'],['ΔAOC = ΔBOD',[0,1,2],'I'],['AC = BD',[3],'corr']],wrongTri:['ΔAOD и ΔBOC','ΔAOC и ΔCOB','ΔACB и ΔADB']},
 {given:'отрезки AB и CD пересекаются в точке O, AO = OB, ∠OAC = ∠OBD',goal:'CO = OD',tri:'ΔAOC и ΔBOD',fig:()=>fCross({tick:[['A','O',1],['O','B',1]],ang:[['A','O','C','',{n:1}],['B','O','D','',{n:1}]]}),
  steps:[['AO = OB',[],'cond'],['∠OAC = ∠OBD',[],'cond'],['∠AOC = ∠BOD',[],'vert'],['ΔAOC = ΔBOD',[0,1,2],'II'],['CO = OD',[3],'corr']],wrongTri:['ΔAOD и ΔBOC','ΔACB и ΔADB','ΔAOC и ΔAOD']},
 {given:'на одной стороне угла O отмечены точки A и C, на другой — B и D, OA = OB, OC = OD',goal:'AD = BC',tri:'ΔAOD и ΔBOC',fig:()=>fAngle({tick:[['O','A',1],['O','B',1],['A','C',2],['B','D',2]]}),
  steps:[['OA = OB',[],'cond'],['OD = OC',[],'cond'],['∠O — общий',[],'angle'],['ΔAOD = ΔBOC',[0,1,2],'I'],['AD = BC',[3],'corr']],wrongTri:['ΔAOB и ΔCOD','ΔACD и ΔBDC','ΔAOC и ΔBOD']},
 {given:'∠BAC = ∠DAC, ∠BCA = ∠DCA',goal:'AB = AD',tri:'ΔABC и ΔADC',fig:()=>fKite({ang:[['A','B','C','',{n:1}],['A','C','D','',{n:1}],['C','A','B','',{n:2}],['C','D','A','',{n:2}]]}),
  steps:[['∠BAC = ∠DAC',[],'cond'],['∠BCA = ∠DCA',[],'cond'],['AC — общая сторона',[],'side'],['ΔABC = ΔADC',[0,1,2],'II'],['AB = AD',[3],'corr']],wrongTri:['ΔABD и ΔCBD','ΔABC и ΔABD','ΔBCD и ΔBAD']},
 {given:'AB = AD, ∠BAC = ∠DAC',goal:'BC = DC',tri:'ΔABC и ΔADC',fig:()=>fKite({tick:[['A','B',1],['A','D',1]],ang:[['A','B','C','',{n:1}],['A','C','D','',{n:1}]]}),
  steps:[['AB = AD',[],'cond'],['∠BAC = ∠DAC',[],'cond'],['AC — общая сторона',[],'side'],['ΔABC = ΔADC',[0,1,2],'I'],['BC = DC',[3],'corr']],wrongTri:['ΔABD и ΔCBD','ΔBCD и ΔBAD','ΔABC и ΔBCD']}
];

/* ---------- theory figures ---------- */
const fEl=(()=>{const T=triAB(62,48,7);return geo({P:T,poly:[['A','B','C']],fill:[{pts:['A','B','C'],op:0.15}],side:[['B','C','a'],['A','C','b'],['A','B','c']],ang:[['A','B','C','∠A',{n:1}]],maxH:150,W:250});})();
const fBase=randShape(40,90);
const fOver=pairFig(fBase.T,{s:[[0,1,1],[1,2,2],[0,2,3]],a:[[0,1],[1,2],[2,3]],flip:true,maxH:140});
const fSAS=pairFig(triAB(55,70,6),{s:[[0,1,1],[0,2,2]],a:[[0,1]],rot:25,maxH:140});
const fASA=pairFig(triAB(55,70,6),{s:[[0,1,1]],a:[[0,1],[1,2]],flip:true,maxH:140});
const fSSS=pairFig(triAB(55,70,6),{s:[[0,1,1],[1,2,2],[0,2,3]],rot:-30,maxH:140});
/* SSA counter-example: B at origin, ray BC along x, AB=c, ∠B=β, AC=b with two solutions */
function ssaTris(c,beta,b){const B=[0,0],A=polar(B,c,beta);const h=A[1],dx=Math.sqrt(b*b-h*h);return [{A,B,C:[A[0]+dx,0]},{A,B,C:[A[0]-dx,0]}];}
const fSSA=(()=>{const [t1,t2]=ssaTris(6,38,4.4);return pairFig(t1,{T2:t2,s:[[0,1,1],[0,2,2]],a:[[1,1]],maxH:140});})();
const fSSA1=(()=>{const [t1,t2]=ssaTris(6,38,4.4);const P={A:t1.A,B:t1.B,C:t1.C,D:t2.C};return geo({P,poly:[['A','B','C']],seg:[['A','D',{col:'var(--accent)',sw:2.2}]],tick:[['A','C',2],['A','D',2],['A','B',1]],ang:[['B','C','A','',{n:1}]],names:{D:'C₁'},fill:[{pts:['A','D','C'],op:0.3}],maxH:150,W:260});})();

/* =====================================================================
   THEORY
   ===================================================================== */
const theory=[
{title:'Почему мосты собирают из треугольников',lvl:0,html:`
<p class="hook">Возьми четыре палочки и соедини их на шарнирах в квадрат. Нажми на угол — квадрат сразу «сложится» в ромб. А теперь собери из трёх палочек треугольник и попробуй его перекосить. Не выйдет! Поэтому фермы мостов, стрелы подъёмных кранов, опоры ЛЭП и Эйфелева башня собраны из треугольников. Почему треугольник жёсткий? Ответ — в этой теме: <b>три стороны однозначно задают треугольник</b>.</p>
<p>Сначала слова. У треугольника ABC есть:</p>
<ul><li><b>вершины</b> A, B, C — «углы-точки»;</li><li><b>стороны</b> AB, BC, AC — отрезки между вершинами;</li><li><b>углы</b> ∠A, ∠B, ∠C.</li></ul>
<div class="fig">${fEl}</div>
<div class="box rule"><b>Противолежащая сторона</b>Сторона, которая <b>не касается</b> вершины угла, лежит <b>против</b> этого угла. Против ∠A лежит BC, против ∠B — AC, против ∠C — AB.</div>
<p><b>Периметр</b> — сумма длин всех сторон: P = AB + BC + AC. Как длина забора вокруг треугольного участка.</p>
<div class="box err"><b>Частая путаница</b>«Сторона, прилежащая к углу A» — это AB и AC (они выходят из A). А «противолежащая» — BC, она напротив.</div>
<div class="fact">В Эйфелевой башне больше 18 000 металлических деталей, и почти все они собраны в треугольные решётки. Поэтому башня высотой около 300 м весит примерно 7300 тонн металла — меньше, чем кажется, и при этом не шатается.</div>`},
{title:'Что значит «треугольники равны»',lvl:0,html:`
<div class="box rule"><b>Определение</b>Два треугольника <b>равны</b>, если их можно совместить наложением: вырезать один, положить на другой (можно повернуть и перевернуть) — и они совпадут целиком.</div>
<p>Когда треугольники совпали, совпали и все их части: три стороны и три угла. Значит, у равных треугольников <b>соответственно равны все стороны и все углы</b>.</p>
<div class="fig">${fOver}</div>
<p>Одинаковые <b>чёрточки</b> на сторонах означают равные стороны, одинаковые <b>дужки</b> — равные углы. Так договорились все геометры мира.</p>
<div class="box rule"><b>Порядок букв важен</b>Запись ΔABC = ΔKMN значит: A совмещается с K, B — с M, C — с N. Поэтому AB = KM, BC = MN, AC = KN, ∠A = ∠K, ∠B = ∠M, ∠C = ∠N.</div>
<div class="box ex"><b>Пример</b>ΔABC = ΔPQR, AB = 5, BC = 7, AC = 8. Тогда PQ = 5, QR = 7, PR = 8.</div>
<div class="box tip"><b>Как не ошибиться</b>Подпиши буквы друг под другом:<br>A B C<br>K M N<br>и «переводи» по столбикам: сторона BC → MN, угол C → угол N.</div>
<div class="box err"><b>Главное следствие</b>В равных треугольниках <b>против равных углов лежат равные стороны</b>. Этим мы будем пользоваться в каждой задаче.</div>`},
{title:'Первый признак: две стороны и угол между ними',lvl:1,html:`
<p>Проверять все 6 элементов (3 стороны + 3 угла) долго. <b>Признак</b> — это короткая проверка: хватает трёх правильно выбранных элементов.</p>
<div class="box rule"><b>Первый признак равенства треугольников</b>Если две стороны и угол <b>между ними</b> одного треугольника соответственно равны двум сторонам и углу между ними другого треугольника, то такие треугольники равны.</div>
<div class="fig">${fSAS}</div>
<p><b>Почему это работает.</b> Совместим равные углы A и A₁. Сторона AB ляжет на луч A₁B₁, и так как AB = A₁B₁, точка B попадёт точно в B₁. Так же C попадёт в C₁. Три вершины совпали — совпали и треугольники.</p>
<p>Проверь сам: задай две стороны и угол между ними — третья сторона получится всегда одна и та же.</p>
<div class="widget" id="w-sas"></div>
<div class="box ex"><b>Пример</b>Отрезки AB и CD пересекаются в точке O, которая делит каждый пополам. Тогда AO = OB, CO = OD, ∠AOC = ∠BOD (вертикальные). По первому признаку ΔAOC = ΔBOD, значит AC = BD.</div>
<div class="box err"><b>Ловушка</b>Угол должен быть именно <b>между</b> равными сторонами (стороны выходят из вершины этого угла). «Две стороны и какой-нибудь угол» — не признак!</div>`},
{title:'Второй признак: сторона и два прилежащих угла',lvl:2,html:`
<div class="box rule"><b>Второй признак равенства треугольников</b>Если сторона и два прилежащих к ней угла одного треугольника соответственно равны стороне и двум прилежащим к ней углам другого треугольника, то такие треугольники равны.</div>
<div class="fig">${fASA}</div>
<p><b>Прилежащие к стороне AB углы</b> — это углы на её концах: ∠A и ∠B.</p>
<p><b>Почему это работает.</b> Совместим стороны AB и A₁B₁. Из концов выходят лучи под одинаковыми углами. Два луча пересекаются только в одной точке — это и есть третья вершина. Как два прожектора с концов стадиона: если их повернуть на заданные углы, лучи встретятся в одной точке.</p>
<div class="box ex"><b>Пример</b>В четырёхугольнике ABCD диагональ AC делит углы A и C пополам. Тогда ∠BAC = ∠DAC, ∠BCA = ∠DCA, AC общая → ΔABC = ΔADC по второму признаку → AB = AD и CB = CD.</div>
<div class="box err"><b>Ловушка</b>Углы должны прилегать к <b>той самой</b> стороне. Если равны сторона AB и углы A и C — это не второй признак в чистом виде (хотя позже, зная сумму углов, ты научишься выкручиваться).</div>`},
{title:'Третий признак: три стороны и жёсткость',lvl:3,html:`
<div class="box rule"><b>Третий признак равенства треугольников</b>Если три стороны одного треугольника соответственно равны трём сторонам другого треугольника, то такие треугольники равны.</div>
<div class="fig">${fSSS}</div>
<p><b>Вот она, жёсткость!</b> Три палочки фиксированной длины можно сложить в треугольник только одним способом (с точностью до поворота). Значит, конструкция не может «перекоситься» — для этого ей пришлось бы стать другим треугольником с теми же сторонами, а такого нет.</p>
<p>А четырёхугольник по четырём сторонам не определяется: квадрат и ромб со стороной 1 — разные фигуры. Чтобы сделать его жёстким, ставят <b>диагональ</b>: она делит его на два жёстких треугольника. Так устроены ворота, табуретки с перекладинами и мосты.</p>
<div class="box ex"><b>Пример</b>AB = AD и CB = CD («воздушный змей»). AC — общая. По третьему признаку ΔABC = ΔADC, значит ∠BAC = ∠DAC: диагональ AC — биссектриса угла A.</div>
<div class="box tip"><b>Как сопоставить вершины по сторонам</b>Против равных сторон лежат равные углы. Если в ΔABC сторона BC = 7, а в ΔKMN сторона 7 — это KN, то ∠A = ∠M (оба лежат против стороны 7).</div>
<div class="fact">Шарнирный n-угольник становится жёстким, если добавить n − 3 диагонали из одной вершины: они режут его на n − 2 треугольника. Инженеры называют такие конструкции фермами.</div>`},
{title:'Как выбрать признак. И что признаком НЕ является',lvl:4,html:`
<ol class="steps"><li>Выпиши, что равно: стороны (чёрточки) и углы (дужки). Не забудь <b>общую сторону</b>, <b>общий угол</b> и <b>вертикальные углы</b> — их часто не рисуют.</li>
<li>Три стороны → <b>III</b> признак.</li><li>Две стороны + угол <b>между ними</b> → <b>I</b> признак.</li><li>Сторона + два угла <b>на её концах</b> → <b>II</b> признак.</li><li>Ничего не подошло → данных не хватает.</li></ol>
<div class="box err"><b>Не признак 1: три угла</b>Маленький и большой треугольник могут иметь одинаковые углы (как фото и его увеличенная копия). Углы равны, а треугольники — нет.</div>
<div class="box err"><b>Не признак 2: две стороны и угол НЕ между ними</b>Смотри: AB = AB, AC = AC₁, ∠B общий, но треугольники ABC и ABC₁ разные! Точка C «может встать» в двух местах.</div>
<div class="fig">${fSSA1}</div>
<div class="box tip"><b>Чего не хватает?</b>Если дано AB = A₁B₁ и ∠A = ∠A₁, то для I признака нужно ещё AC = A₁C₁ (вторая сторона угла A), а для II — ∠B = ∠B₁ (второй угол у стороны AB).</div>`},
{title:'Находим стороны, углы и периметры',lvl:5,html:`
<div class="box rule"><b>Схема</b>1) Докажи, что треугольники равны (признак). 2) Найди <b>соответственные</b> элементы. 3) Перенеси число.</div>
<div class="box ex"><b>Пример</b>ΔABC = ΔKMN, периметр ABC равен 24, KM = 7, MN = 9. Тогда AB = 7, BC = 9 и AC = 24 − 7 − 9 = 8, а значит KN = 8.</div>
<div class="box ex"><b>Пример 2</b>В «воздушном змее» ABCD: AB = AD = 5, периметр 26. Значит, CB + CD = 26 − 10 = 16, а так как CB = CD (из равенства ΔABC = ΔADC), CB = 8.</div>
<div class="box err"><b>Ошибка</b>Перенести число не на ту сторону. Всегда проверяй: соответственные стороны лежат против равных углов.</div>`},
{title:'Как записать доказательство',lvl:6,html:`
<p>Доказательство — это цепочка, где у каждого шага есть <b>причина</b>. Как в детективе: «Дворецкий был в саду — это видел садовник».</p>
<div class="fig">${PROOFS[1].fig()}</div>
<div class="box ex"><b>Задача</b>Отрезки AB и CD пересекаются в точке O, AO = OB, CO = OD. Докажи, что AC = BD.<br><b>Решение.</b><br>1) AO = OB — по условию.<br>2) CO = OD — по условию.<br>3) ∠AOC = ∠BOD — как вертикальные.<br>4) Значит, ΔAOC = ΔBOD по первому признаку (шаги 1–3).<br>5) Поэтому AC = BD — как соответственные стороны равных треугольников.</div>
<div class="box rule"><b>Порядок</b>Сначала собери три равенства («кирпичики»), потом — равенство треугольников, и только потом — вывод. Вывод раньше доказательства — ошибка.</div>
<div class="box tip"><b>Стандартные причины</b>«по условию», «общая сторона», «общий угол», «вертикальные углы», «по I/II/III признаку», «соответственные элементы равных треугольников».</div>`},
{title:'Идеи для задач со звёздочкой',lvl:7,html:`
<div class="box rule"><b>1. Почему «сторона-сторона-угол не между» не работает</b>Дано AB, угол A и сторона BC. Проведи окружность с центром B радиусом BC. Она может пересечь луч в <b>двух</b> точках — два разных треугольника! Подвигай ползунки:</div>
<div class="widget" id="w-ssa"></div>
<div class="box rule"><b>2. Удвоение медианы</b>Медиану AM продли за точку M на такой же отрезок MD = AM. Тогда ΔAMB = ΔDMC (по I признаку: BM = MC, AM = MD, вертикальные углы), и поэтому CD = AB. Получается треугольник ACD со сторонами AC, AB и 2·AM. Отсюда, например, <span class="m">|AB − AC| &lt; 2AM &lt; AB + AC</span>.</div>
<div class="box rule"><b>3. Доказательство в два шага</b>Иногда сначала нужно доказать равенство одной пары треугольников, чтобы получить «кирпичик» для второй пары.</div>
<div class="box rule"><b>4. Жёсткие конструкции</b>Ферма из n узлов в плоскости жёсткая, если в ней правильно расставлены 2n − 3 стержня (например, треугольник: 3 узла, 3 стержня).</div>`},
{title:'Шпаргалка',html:`<ul class="steps"><li>Равные треугольники совмещаются наложением; против равных углов — равные стороны.</li><li>I: две стороны и угол между ними.</li><li>II: сторона и два прилежащих угла.</li><li>III: три стороны.</li><li>НЕ признаки: три угла; две стороны и угол не между ними.</li><li>Ищи общие стороны, общие и вертикальные углы.</li></ul>`}
];

const NW=t=>`<span style="white-space:nowrap;font-size:17px">${t}</span>`;
const symbols={tab:'Знаки',title:'Знаки и признаки темы',rows:[
['Δ','«треугольник»','ΔABC — треугольник с вершинами A, B, C.','ΔABC'],
['∠','«угол»','∠A — угол при вершине A; ∠ABC — угол с вершиной B.','∠ABC = 40°'],
[NW('ΔABC = ΔKMN'),'«равны»','Треугольники совмещаются: A→K, B→M, C→N.','AB = KM, ∠C = ∠N'],
[NW('| и ||'),'Чёрточки на сторонах','Одинаковое число чёрточек — равные отрезки.','AB = AD'],
[NW('◠'),'Дужки в углах','Одинаковое число дужек — равные углы.','∠1 = ∠2'],
['I (СУС)','Первый признак','Сторона — угол между ними — сторона.','AB, AC, ∠A'],
['II (УСУ)','Второй признак','Угол — сторона — угол (углы на концах стороны).','∠A, AB, ∠B'],
['III (ССС)','Третий признак','Три стороны.','AB, BC, AC'],
['P','Периметр','Сумма всех сторон.','P = AB + BC + AC']
],after:`<div class="box tip" style="margin-top:14px"><b>Самое важное</b>Три элемента — но правильные: угол между сторонами (I) или стороны между углами (II). Три угла и «две стороны и угол не между ними» — не признаки.</div>`};

/* =====================================================================
   GENERATORS
   ===================================================================== */
/* ===== L0 ===== */
G(0,()=>CH('Какие два треугольника называются равными?','Те, которые можно совместить наложением',['Те, у которых равны периметры','Те, у которых равны все три угла','Те, у которых равны две стороны'],
 {short:'Равные треугольники совпадают при наложении.',
 explain:'Определение: треугольники <b>равны</b>, если их можно совместить наложением (вырезать, повернуть, если надо перевернуть — и они совпадут). Равные периметры — мало: у треугольников 3, 4, 5 и 4, 4, 4 периметр 12, но они разные. Три равных угла — тоже мало: маленький и большой треугольник могут иметь одни и те же углы.',
 explain2:'Представь два одинаковых треугольных куска пиццы. Положи один на другой — края совпали. Вот это и есть «равны». Если хоть один край торчит — не равны.'}),{rule:true});
G(0,()=>{const L=pick(LETS);const i=R(0,2);const opp=[0,1,2].filter(x=>x!==i);const T=randShape().T;const P={};K.forEach((k,j)=>P[L[j]]=T[k]);
 const correct=L[opp[0]]+L[opp[1]];const wr=[L[i]+L[opp[0]],L[i]+L[opp[1]],'∠'+L[i]];
 return CH(`Какая сторона треугольника ${L} лежит <b>против</b> угла ${L[i]}?`,correct,wr,{pic:geo({P,poly:[[...L]],ang:[[L[i],L[opp[0]],L[opp[1]],'',{n:1}]],maxH:140,W:240}),
 short:`Против ∠${L[i]} — сторона, которая не касается вершины ${L[i]}: ${correct}.`,
 explain:`Стороны ${L[i]}${L[opp[0]]} и ${L[i]}${L[opp[1]]} выходят из вершины ${L[i]} — они <b>прилежащие</b> к углу ${L[i]}. Против угла лежит третья сторона, которая вершину ${L[i]} не касается: <b>${correct}</b>.`,
 explain2:`Встань в вершину ${L[i]} и посмотри «внутрь» угла: прямо перед тобой, напротив, — сторона ${correct}. Две другие стороны — это «руки» угла.`});},{rule:true});
G(0,()=>{const L=pick(LETS);const ask=R(0,1);
 if(ask===0){const i=R(0,2);const wr=[0,1,2].filter(x=>x!==i).map(x=>'∠'+L[x]);
  return CH(`ΔABC = Δ${L}. Какому углу равен ∠${K[i]}?`,'∠'+L[i],[...wr,'Нельзя сказать'],{short:`По порядку букв ${K[i]} ↔ ${L[i]}.`,
  explain:`В записи ΔABC = Δ${L} вершины идут парами: A ↔ ${L[0]}, B ↔ ${L[1]}, C ↔ ${L[2]}. Значит, ∠${K[i]} = <b>∠${L[i]}</b>.`,
  explain2:`Подпиши буквы друг под другом:<br>A B C<br>${L.split('').join(' ')}<br>Под буквой ${K[i]} стоит ${L[i]}.`});}
 const i=R(0,1),j=R(i+1,2);const c=L[i]+L[j];const all=[[0,1],[1,2],[0,2]].map(([p,q])=>L[p]+L[q]).filter(s=>s!==c);
 return CH(`ΔABC = Δ${L}. Какой стороне равна сторона ${K[i]}${K[j]}?`,c,[...all,'Нельзя сказать'],{short:`${K[i]} ↔ ${L[i]}, ${K[j]} ↔ ${L[j]} → ${K[i]}${K[j]} = ${c}.`,
 explain:`Порядок букв: A ↔ ${L[0]}, B ↔ ${L[1]}, C ↔ ${L[2]}. Сторона ${K[i]}${K[j]} соединяет вершины ${K[i]} и ${K[j]}, им соответствуют ${L[i]} и ${L[j]}. Значит, ${K[i]}${K[j]} = <b>${c}</b>.`,
 explain2:`«Переведи» название стороны по табличке:<br>A B C<br>${L.split('').join(' ')}<br>${K[i]} → ${L[i]}, ${K[j]} → ${L[j]}.`});});
G(0,()=>{const L=pick(LETS);for(;;){const a=R(4,15),b=R(4,15),c=R(4,15);if(!okTri(a,b,c,1)||new Set([a,b,c]).size<3)continue;const s=[c,a,b];/* AB, BC, AC */
 const nm=['AB','BC','AC'],nm2=[L[0]+L[1],L[1]+L[2],L[0]+L[2]];const k=R(0,2);
 return {type:'num',q:`ΔABC = Δ${L}. Известно: AB = ${c}, BC = ${a}, AC = ${b}. Найди ${nm2[k]}.`,ans:s[k],
  hint:`Какой стороне треугольника ABC соответствует ${nm2[k]}? Смотри на порядок букв.`,short:`${nm2[k]} ↔ ${nm[k]} = ${s[k]}.`,
  explain:`A ↔ ${L[0]}, B ↔ ${L[1]}, C ↔ ${L[2]}. Сторона ${nm2[k]} соответствует стороне ${nm[k]}. Равные треугольники совпадают, значит, ${nm2[k]} = ${nm[k]} = <b>${s[k]}</b>.`,
  explain2:`Подпиши буквы:<br>A B C<br>${L.split('').join(' ')}<br>${nm2[k]} «переводится» обратно в ${nm[k]}, а ${nm[k]} = ${s[k]}.`};}});
G(0,()=>{const L=pick(LETS);for(;;){const a=R(5,19),b=R(5,19),c=R(5,19);if(!okTri(a,b,c,1))continue;
 return {type:'num',q:`ΔABC = Δ${L}, AB = ${c}, BC = ${a}, ${L[0]}${L[2]} = ${b}. Найди периметр треугольника ABC.`,ans:a+b+c,
  hint:`${L[0]}${L[2]} соответствует стороне AC.`,short:`AC = ${L[0]}${L[2]} = ${b}; P = ${c} + ${a} + ${b} = ${a+b+c}.`,
  explain:`${L[0]}${L[2]} ↔ AC, поэтому AC = ${b}. Периметр — сумма сторон: P = AB + BC + AC = ${c} + ${a} + ${b} = <b>${a+b+c}</b>.`,
  explain2:`У равных треугольников и периметры равны. Периметр Δ${L} = ${c} + ${a} + ${b} = ${a+b+c} — такой же у ABC.`};}});

/* ===== L1: I признак ===== */
G(1,()=>CH('Как звучит первый признак равенства треугольников?','Если две стороны и угол между ними одного треугольника соответственно равны двум сторонам и углу между ними другого, то треугольники равны',
 ['Если две стороны и любой угол одного треугольника равны двум сторонам и углу другого, то треугольники равны','Если две стороны одного треугольника равны двум сторонам другого, то треугольники равны','Если три угла одного треугольника равны трём углам другого, то треугольники равны'],
 {short:'Две стороны и угол МЕЖДУ ними.',
 explain:'Первый признак: <b>две стороны и угол между ними</b>. Слово «между» главное: угол должен быть образован этими сторонами. «Любой угол» — неверно (бывают два разных треугольника). Двух сторон мало: угол между ними можно менять, и третья сторона будет другой. Три угла — тоже не признак: треугольники могут быть разного размера.',
 explain2:'Представь циркуль: две ножки — это стороны, раствор — угол между ними. Зафиксировал длины ножек и раствор — расстояние между концами ножек (третья сторона) определено однозначно.'}),{rule:true});
G(1,()=>{const i=R(0,2);const ot=[0,1,2].filter(x=>x!==i);const sides=`${S1(i,ot[0])} = ${S2(i,ot[0])} и ${S1(i,ot[1])} = ${S2(i,ot[1])}`;
 return CH(`Известно: ${sides}. Равенство каких углов нужно добавить, чтобы применить <b>первый</b> признак?`,`${A1n(i)} = ${A2n(i)}`,[`${A1n(ot[0])} = ${A2n(ot[0])}`,`${A1n(ot[1])} = ${A2n(ot[1])}`,'Любых двух углов'],
 {short:`Обе стороны выходят из вершины ${K[i]} — нужен угол ${K[i]}.`,
 explain:`Стороны ${S1(i,ot[0])} и ${S1(i,ot[1])} обе выходят из вершины <b>${K[i]}</b>, поэтому угол между ними — ${A1n(i)}. Нужно ${A1n(i)} = ${A2n(i)}. Угол ${K[ot[0]]} лежит не между этими сторонами — с ним признак не работает.`,
 explain2:`Найди букву, которая есть в названиях обеих сторон: ${S1(i,ot[0])} и ${S1(i,ot[1])} — общая буква ${K[i]}. Это вершина угла между сторонами.`});},{rule:true});
G(1,()=>{for(;;){const a=R(3,9),c=R(3,9);const th1=R(190,215),th2=R(110,150);const P=crossP(a,c,th1,th2);const AC=dist(P.A,P.C);const x=Math.round(AC);if(Math.abs(AC-x)>0.15||x<3)continue;
 return {type:'num',q:`Отрезки AB и CD пересекаются в точке O, AO = OB, CO = OD, AC = ${x}. Найди BD.`,ans:x,
  pic:geo({P,poly:[['A','O','C'],['B','O','D']],tick:[['A','O',1],['O','B',1],['C','O',2],['O','D',2]],side:[['A','C',String(x)],['B','D','?']],maxH:170,W:260}),
  hint:'Найди пару треугольников, в которых лежат AC и BD. Что у них равно? Не забудь про углы при точке O.',short:`ΔAOC = ΔBOD (I признак) → BD = AC = ${x}.`,
  explain:`Рассмотрим ΔAOC и ΔBOD:<br>• AO = OB (по условию);<br>• CO = OD (по условию);<br>• ∠AOC = ∠BOD (вертикальные углы).<br>По первому признаку ΔAOC = ΔBOD, значит, BD = AC = <b>${x}</b>.`,
  explain2:`Поверни картинку на 180° вокруг точки O: A перейдёт в B, C — в D (ведь O — середина обоих отрезков). Отрезок AC перейдёт в BD — его длина не изменится: ${x}.`};}});
G(1,()=>{for(;;){const p=R(4,9),q=R(4,10),d=R(5,12);if(!okTri(p,q,d,1.5))continue;const P=kiteP(p,q,d);if(!kiteOK(P,d))continue;const which=R(0,1);
 const angB=Math.round(angAt(P.B,P.A,P.C));
 const base={P,poly:[['A','B','C','D']],seg:[['A','C']],tick:[['A','B',1],['A','D',1]],ang:[['A','B','C','',{n:1}],['A','C','D','',{n:1}]],maxH:160,W:260};
 if(which===0){base.side=[['B','C',String(q)],['C','D','?']];
  return {type:'num',q:`AB = AD, ∠BAC = ∠DAC, BC = ${q}. Найди CD.`,ans:q,pic:geo(base),hint:'Сравни треугольники ABC и ADC. Какая сторона у них общая?',
  short:`ΔABC = ΔADC (I признак) → CD = BC = ${q}.`,
  explain:`ΔABC и ΔADC: AB = AD (условие), ∠BAC = ∠DAC (условие), AC — общая сторона. Угол A лежит между сторонами AB и AC (AD и AC) → первый признак. ΔABC = ΔADC, поэтому CD = BC = <b>${q}</b>.`,
  explain2:`Согни рисунок по линии AC: B попадёт на D (угол тот же и AB = AD). Значит, BC наложится на DC: CD = ${q}.`};}
 base.ang.push(['B','C','A',angB+'°',{n:2}]);
 return {type:'num',q:`AB = AD, ∠BAC = ∠DAC, ∠ABC = ${angB}°. Найди ∠ADC (в градусах).`,ans:angB,pic:geo(base),hint:'Докажи, что ΔABC = ΔADC. Какой угол соответствует ∠ABC?',
  short:`ΔABC = ΔADC → ∠ADC = ∠ABC = ${angB}°.`,
  explain:`AB = AD, ∠BAC = ∠DAC, AC — общая → ΔABC = ΔADC по первому признаку. Вершина B соответствует D, поэтому ∠ADC = ∠ABC = <b>${angB}°</b>.`,
  explain2:`Перегни рисунок по AC — ΔABC ляжет на ΔADC, угол B — на угол D. Совпавшие углы равны: ${angB}°.`};}});
G(1,()=>{for(;;){const a=R(2,5),c=a+R(2,5),phi=R(35,70);const O=[0,0];const P={O,A:polar(O,a,0),C:polar(O,c,0),B:polar(O,a,phi),D:polar(O,c,phi)};const AD=dist(P.A,P.D);const x=Math.round(AD);if(Math.abs(AD-x)>0.12)continue;
 return {type:'num',q:`На одной стороне угла O отмечены точки A и C, на другой — B и D, причём OA = OB = ${a}, OC = OD = ${c}. AD = ${x}. Найди BC.`,ans:x,
  pic:geo({P,seg:[['O','C'],['O','D'],['A','D',{col:'var(--accent)',sw:2}],['B','C']],tick:[['O','A',1],['O','B',1]],side:[['A','D',String(x)]],maxH:170,W:260}),
  hint:'Рассмотри треугольники AOD и BOC. Угол O у них общий.',short:`ΔAOD = ΔBOC (OA = OB, OD = OC, ∠O общий) → BC = AD = ${x}.`,
  explain:`ΔAOD и ΔBOC:<br>• OA = OB = ${a};<br>• OD = OC = ${c};<br>• ∠O — общий, и он лежит между этими сторонами.<br>По первому признаку ΔAOD = ΔBOC, значит BC = AD = <b>${x}</b>.`,
  explain2:`Отрази рисунок относительно биссектрисы угла O: луч OA перейдёт в луч OB, точка A (на расстоянии ${a}) — в B, точка D (на расстоянии ${c}) — в C. Отрезок AD перейдёт в BC.`};}});

/* ===== L2: II признак ===== */
G(2,()=>CH('Как звучит второй признак равенства треугольников?','Если сторона и два прилежащих к ней угла одного треугольника соответственно равны стороне и двум прилежащим к ней углам другого, то треугольники равны',
 ['Если два угла одного треугольника равны двум углам другого, то треугольники равны','Если сторона и любые два угла одного треугольника равны стороне и двум углам другого, то треугольники равны','Если две стороны и угол между ними одного треугольника равны двум сторонам и углу между ними другого, то треугольники равны'],
 {short:'Сторона и два угла НА ЕЁ КОНЦАХ.',
 explain:'Второй признак: <b>сторона и два прилежащих к ней угла</b> (углы на концах этой стороны). Двух углов без стороны мало — треугольник может быть больше или меньше. Последний вариант — это формулировка <b>первого</b> признака, а не второго.',
 explain2:'Положи на стол линейку (сторона) и из её концов пусти два луча под заданными углами. Лучи встретятся в одной-единственной точке — третья вершина определена.'}),{rule:true});
G(2,()=>{const i=R(0,1),j=R(i+1,2);
 return CH(`Известно: ${A1n(i)} = ${A2n(i)} и ${A1n(j)} = ${A2n(j)}. Равенство каких сторон нужно добавить, чтобы применить <b>второй</b> признак?`,`${S1(i,j)} = ${S2(i,j)}`,[`${S1(i,3-i-j)} = ${S2(i,3-i-j)}`,`${S1(j,3-i-j)} = ${S2(j,3-i-j)}`,'Никаких — двух углов достаточно'],
 {short:`Сторона между вершинами ${K[i]} и ${K[j]} — ${S1(i,j)}.`,
 explain:`Углы ${K[i]} и ${K[j]} должны быть <b>прилежащими</b> к стороне, то есть стоять на её концах. Сторона с концами ${K[i]} и ${K[j]} — это <b>${S1(i,j)}</b>. Двух углов недостаточно: маленький и большой треугольники могут иметь одинаковые углы.`,
 explain2:`Запиши буквы углов: ${K[i]} и ${K[j]}. Составь из них название стороны: ${S1(i,j)}. Это и есть «сторона между углами».`});},{rule:true});
G(2,()=>{for(;;){const p=R(4,10),q=R(4,10),d=R(5,13);if(!okTri(p,q,d,1.5)||p===q)continue;const P=kiteP(p,q,d);if(!kiteOK(P,d))continue;
 return {type:'num',q:`В четырёхугольнике ABCD диагональ AC такова, что ∠BAC = ∠DAC и ∠BCA = ∠DCA. AB = ${p}, BC = ${q}. Найди периметр ABCD.`,ans:2*(p+q),
  pic:geo({P,poly:[['A','B','C','D']],seg:[['A','C']],ang:[['A','B','C','',{n:1}],['A','C','D','',{n:1}],['C','A','B','',{n:2}],['C','D','A','',{n:2}]],side:[['A','B',String(p)],['B','C',String(q)]],maxH:160,W:270}),
  hint:'Докажи, что ΔABC = ΔADC. Тогда AD и CD найдутся.',short:`ΔABC = ΔADC (II) → AD = ${p}, CD = ${q}; P = 2·(${p} + ${q}) = ${2*(p+q)}.`,
  explain:`ΔABC и ΔADC: AC — общая, ∠BAC = ∠DAC и ∠BCA = ∠DCA — это углы на концах стороны AC. По второму признаку ΔABC = ΔADC.<br>Значит, AD = AB = ${p}, CD = CB = ${q}.<br>P = ${p} + ${q} + ${q} + ${p} = <b>${2*(p+q)}</b>.`,
  explain2:`Фигура симметрична относительно AC: верхняя половина — зеркальная копия нижней. Значит, периметр — это удвоенная «верхняя ломаная» AB + BC: 2 · ${p+q} = ${2*(p+q)}.<div class="box err"><b>Ловушка</b>${p} + ${q} = ${p+q} — это только половина периметра.</div>`};}});
G(2,()=>{for(;;){const a=R(3,7),c=R(3,7);const th1=R(190,212),th2=R(110,150);const P=crossP(a,c,th1,th2);
 return {type:'num',q:`Отрезки AB и CD пересекаются в точке O. AO = OB, ∠OAC = ∠OBD, CD = ${2*c}. Найди CO.`,ans:c,
  pic:geo({P,poly:[['A','O','C'],['B','O','D']],tick:[['A','O',1],['O','B',1]],ang:[['A','O','C','',{n:1}],['B','O','D','',{n:1}]],maxH:170,W:260}),
  hint:'Сравни ΔAOC и ΔBOD. Какие углы при O?',short:`ΔAOC = ΔBOD (II) → CO = OD = ${2*c}/2 = ${c}.`,
  explain:`ΔAOC и ΔBOD:<br>• AO = OB (условие);<br>• ∠OAC = ∠OBD (условие);<br>• ∠AOC = ∠BOD (вертикальные).<br>Сторона AO и углы на её концах (∠A и ∠O) равны стороне BO и углам ∠B и ∠O → второй признак. Значит, CO = OD.<br>CO + OD = CD = ${2*c} → CO = <b>${c}</b>.`,
  explain2:`Из равенства треугольников точка O оказывается серединой CD. Половина от ${2*c} — это ${c}.`};}});
G(2,()=>{for(;;){const b=R(5,14),a=R(4,12);if(2*a<=b+1)continue;const h=Math.sqrt(a*a-b*b/4);const P={A:[0,0],C:[b,0],B:[b/2,h],D:[b/2,0]};
 return {type:'num',q:`В треугольнике ABC отрезок BD (D на AC) — биссектриса угла B, и ∠ADB = ∠CDB. AB = ${a}, AC = ${b}. Найди периметр треугольника ABC.`,ans:2*a+b,
  pic:geo({P,poly:[['A','B','C']],seg:[['B','D']],ang:[['B','A','D','',{n:1}],['B','D','C','',{n:1,r:30}],['D','A','B','',{n:2,r:16}],['D','B','C','',{n:2,r:16}]],side:[['A','B',String(a)],['A','C',String(b)]],maxH:170,W:260}),
  hint:'Рассмотри ΔABD и ΔCBD: какая сторона общая, какие углы на её концах?',short:`ΔABD = ΔCBD (II) → BC = AB = ${a}; P = ${a} + ${a} + ${b} = ${2*a+b}.`,
  explain:`ΔABD и ΔCBD: BD — общая; ∠ABD = ∠CBD (BD — биссектриса); ∠ADB = ∠CDB (условие). Углы стоят на концах общей стороны BD → второй признак. Значит, BC = AB = ${a}.<br>P = ${a} + ${a} + ${b} = <b>${2*a+b}</b>.`,
  explain2:`Перегни треугольник по BD: углы при B и при D совпадают, поэтому луч BA ляжет на луч BC, а луч DA — на DC. Точка A попадёт в C → BC = BA = ${a}.`};}});

/* ===== L3: III признак ===== */
G(3,()=>CH('Как звучит третий признак равенства треугольников?','Если три стороны одного треугольника соответственно равны трём сторонам другого, то треугольники равны',
 ['Если три угла одного треугольника соответственно равны трём углам другого, то треугольники равны','Если периметры треугольников равны, то треугольники равны','Если две стороны одного треугольника равны двум сторонам другого, то треугольники равны'],
 {short:'Три стороны — и треугольник определён.',
 explain:'Третий признак: <b>три стороны</b>. Три угла — не признак (размер может быть разный). Равные периметры — тоже нет: 3 + 4 + 5 = 4 + 4 + 4. Две стороны без угла — мало.',
 explain2:'Три палочки заданной длины складываются в треугольник единственным способом — поэтому треугольник жёсткий, и этим пользуются в мостах и кранах.'}),{rule:true});
G(3,()=>{for(;;){const a=R(3,12),b=R(3,12),c=R(3,12);if(!okTri(a,b,c,1)||new Set([a,b,c]).size<3)continue;const eq=Math.random()<0.5;let s2=shuffle([a,b,c]);
 if(!eq){const k=R(0,2);s2[k]+=pick([-1,1]);if(!okTri(...s2,0.5)||s2[k]<2)continue;}
 const same=[...s2].sort((x,y)=>x-y).join()===[a,b,c].sort((x,y)=>x-y).join();const L=pick(LETS);
 const opts=['Равны, по третьему признаку','Не равны','Равны, по первому признаку','Нельзя определить без углов'];const ans=same?0:1;
 return {type:'choice',q:`Стороны ΔABC: AB = ${c}, BC = ${a}, AC = ${b}. Стороны Δ${L}: ${L[0]}${L[1]} = ${s2[0]}, ${L[1]}${L[2]} = ${s2[1]}, ${L[0]}${L[2]} = ${s2[2]}. Равны ли треугольники?`,opts,ans,
  short:same?'Наборы сторон совпадают → III признак.':'Наборы сторон разные — треугольники не равны.',
  explain:`Упорядочим стороны по возрастанию: ABC — ${[a,b,c].sort((x,y)=>x-y).join(', ')}; ${L} — ${[...s2].sort((x,y)=>x-y).join(', ')}. ${same?'Наборы <b>совпадают</b>, значит, по третьему признаку треугольники <b>равны</b> (вершины соответствуют не обязательно по алфавиту — неважно).':'Наборы <b>различаются</b>. У равных треугольников все стороны соответственно равны, значит, эти треугольники <b>не равны</b>.'} Углы знать не нужно — трёх сторон достаточно.`,
  explain2:same?`Представь три палочки длиной ${a}, ${b}, ${c}. Из них можно сложить только один треугольник — значит, оба треугольника одинаковые, просто подписаны по-разному.`:`Если бы треугольники были равны, у второго нашлась бы сторона каждой длины ${a}, ${b}, ${c}. А стороны второго — ${s2.join(', ')}: какой-то длины не хватает.`};}});
G(3,()=>{for(;;){const a=R(3,12),b=R(3,12),c=R(3,12);if(!okTri(a,b,c,1)||new Set([a,b,c]).size<3)continue;const L=pick(LETS);const perm=shuffle([0,1,2]);
 /* ABC: side opposite A is BC=a, opposite B is AC=b, opposite C is AB=c. second triangle vertex L[j] gets angle equal to K[perm[j]] */
 const opp=[a,b,c];const sideOpp=j=>opp[perm[j]];const ot=j=>[0,1,2].filter(x=>x!==j);
 const sd={};[0,1,2].forEach(j=>{const [p,q]=ot(j);sd[L[p]+L[q]]=sideOpp(j);});const i=R(0,2);const jj=perm.indexOf(i);
 const keys=Object.keys(sd);
 return CH(`ΔABC: AB = ${c}, BC = ${a}, AC = ${b}. Δ${L}: ${keys.map(k=>k+' = '+sd[k]).join(', ')}. Треугольники равны. Какому углу Δ${L} равен ∠${K[i]}?`,'∠'+L[jj],[0,1,2].filter(x=>x!==jj).map(x=>'∠'+L[x]).concat(['Нельзя сказать']),
 {short:`∠${K[i]} лежит против стороны ${opp[i]}; в Δ${L} против стороны ${opp[i]} — ∠${L[jj]}.`,
 explain:`Против равных сторон лежат равные углы. ∠${K[i]} лежит против стороны ${S1(...ot(i))} = ${opp[i]}. В Δ${L} сторона длины ${opp[i]} — это ${L[ot(jj)[0]]}${L[ot(jj)[1]]}, а против неё лежит угол <b>${L[jj]}</b>. Значит, ∠${K[i]} = ∠${L[jj]}.<div class="box err"><b>Ловушка</b>Брать угол «по алфавиту» (${K[i]} → ${L[i]}) можно только когда записано ΔABC = Δ${L}. Здесь вершины идут в другом порядке.</div>`,
 explain2:`Найди сторону длиной ${opp[i]} в обоих треугольниках: в ABC это ${S1(...ot(i))}, в ${L} — ${L[ot(jj)[0]]}${L[ot(jj)[1]]}. Вершина, которая «смотрит» на эту сторону: ${K[i]} и ${L[jj]}. Они и совмещаются.`});}});
G(3,()=>{for(;;){const p=R(4,9),q=R(4,10),d=R(5,12);if(!okTri(p,q,d,1.5)||p===q)continue;const P=kiteP(p,q,d);if(!kiteOK(P,d))continue;const half=angAt(P.A,P.B,P.C);const x=Math.round(half);if(Math.abs(half-x)>0.25||x<15||x>65)continue;
 return {type:'num',q:`В четырёхугольнике ABCD: AB = AD, CB = CD, ∠BAD = ${2*x}°. Найди ∠BAC.`,ans:x,
  pic:geo({P,poly:[['A','B','C','D']],seg:[['A','C']],tick:[['A','B',1],['A','D',1],['C','B',2],['C','D',2]],ang:[['A','B','D',(2*x)+'°',{n:1,r:22}]],maxH:160,W:270}),
  hint:'ΔABC и ΔADC равны по трём сторонам. Что это говорит об углах при вершине A?',short:`ΔABC = ΔADC (III) → ∠BAC = ∠DAC = ${2*x}°/2 = ${x}°.`,
  explain:`ΔABC и ΔADC: AB = AD, CB = CD (условие), AC — общая. По третьему признаку они равны → ∠BAC = ∠DAC.<br>Эти два угла вместе дают ∠BAD = ${2*x}°, значит каждый равен ${2*x} : 2 = <b>${x}°</b>.`,
  explain2:`Диагональ AC в «воздушном змее» — ось симметрии. Она делит угол A пополам: ${2*x}° → ${x}° + ${x}°.`};}});
G(3,()=>{const n=R(4,9);
 return {type:'num',q:`Из ${n} реек на шарнирах собран ${n}-угольник — он «складывается». Какое наименьшее число диагональных реек нужно добавить, чтобы он стал жёстким (разбился на треугольники)?`,ans:n-3,
  hint:'Проведи все диагонали из одной вершины. На сколько треугольников они разрежут многоугольник?',short:`${n} − 3 = ${n-3} диагонали из одной вершины → ${n-2} жёстких треугольника.`,
  explain:`Треугольник жёсткий (третий признак: три стороны задают треугольник однозначно). Проведём из одной вершины все диагонали: в ${n}-угольнике их ${n} − 3 = <b>${n-3}</b> (к самой вершине и двум соседним провести нельзя). Они разрежут фигуру на ${n-2} треугольника, прилегающих друг к другу сторонами, — вся конструкция жёсткая. Меньше нельзя: каждая рейка добавляет только одну «связь», а ${n}-угольнику с шарнирами не хватает ровно ${n-3} связей.`,
  explain2:`Начни с маленьких: квадрату нужна 1 диагональ (4 − 3), пятиугольнику — 2 (5 − 3). Каждая новая вершина добавляет один треугольник и одну диагональ.`};});

/* ===== L4: какой признак? ===== */
G(4,()=>CH('Какой набор равенств <b>НЕ</b> гарантирует, что треугольники равны?','Две стороны и угол, не лежащий между ними',['Две стороны и угол между ними','Сторона и два прилежащих к ней угла','Три стороны'],
 {short:'«Сторона-сторона-угол не между ними» — не признак.',
 explain:'Три правильных набора — это три признака: I (две стороны и угол между ними), II (сторона и два прилежащих угла), III (три стороны). А «две стороны и угол <b>не между ними</b>» не признак: может получиться два разных треугольника.',
 explain2:`Посмотри на рисунок: AB общая, AC = AC₁, угол B общий, а треугольники ABC и ABC₁ разные.${fig(fSSA1)}`}),{rule:true});
G(4,()=>CH('Почему равенство трёх углов — <b>не</b> признак равенства треугольников?','Треугольники с одинаковыми углами могут быть разного размера',['Потому что углов всего два','Потому что углы нельзя измерить точно','Это признак — равных углов хватает'],
 {short:'Одинаковая форма ≠ одинаковый размер.',
 explain:'Увеличь треугольник в 2 раза (как фото): все углы останутся прежними, а стороны вырастут. Значит, по углам нельзя понять размер. Треугольники с равными углами называются <b>подобными</b> (это тема 8 класса), но не равными.',
 explain2:'Равносторонние треугольники со стороной 1 см и 1 км: все углы по 60°, но один помещается на ноготь, а другой — это огромный участок земли.'}),{rule:true});
const whichCrit=()=>{const kind=R(0,4);let fig,ans;
 if(kind<3){const sh=randShape(35,95).T;const o={rot:R(-40,40),flip:Math.random()<0.5};
  if(kind===0){const i=R(0,2),ot=[0,1,2].filter(x=>x!==i);Object.assign(o,{s:[[i,ot[0],1],[i,ot[1],2]],a:[[i,1]]});}
  if(kind===1){const i=R(0,1),j=R(i+1,2);Object.assign(o,{s:[[i,j,1]],a:[[i,1],[j,2]]});}
  if(kind===2)Object.assign(o,{s:[[0,1,1],[1,2,2],[0,2,3]]});
  fig=pairFig(sh,o);ans=kind;}
 else if(kind===3){const beta=R(32,44),c=6;const h=c*Math.sin(beta*D2R);const b=h+0.9+Math.random()*(c-h-1.8);const [t1,t2]=ssaTris(c,beta,b);fig=pairFig(t1,{T2:t2,s:[[0,1,1],[0,2,2]],a:[[1,1]]});ans=3;}
 else {const sh=randShape(35,95).T;const k=pick([0.6,0.7,1.45]);const T2={A:mul(sh.A,k),B:mul(sh.B,k),C:mul(sh.C,k)};fig=pairFig(sh,{T2,a:[[0,1],[1,2],[2,3]]});ans=3;}
 const ex=[`Отмечены две стороны (одна и две чёрточки) и угол <b>между ними</b> — он стоит в вершине, из которой выходят обе отмеченные стороны. Это <b>первый признак</b>.`,
  `Отмечена одна сторона и два угла <b>на её концах</b>. Это <b>второй признак</b>.`,`Отмечены все три стороны (1, 2 и 3 чёрточки). Это <b>третий признак</b>.`,
  `Отмечены две стороны и угол, который <b>не лежит между ними</b> (он стоит в вершине, из которой выходит только одна отмеченная сторона). Это не признак — и на рисунке видно, что треугольники разные. <b>Равенство не следует.</b>`,
  `Отмечены только три угла — сторон нет. Треугольники одинаковой формы, но разного размера. <b>Равенство не следует.</b>`][kind];
 return {type:'choice',q:'Одинаковые чёрточки — равные стороны, одинаковые дужки — равные углы. По какому признаку равны треугольники?',pic:fig,opts:CRIT.slice(),ans,
  short:['Две стороны и угол между ними → I.','Сторона и два угла на её концах → II.','Три стороны → III.','Угол не между сторонами — не признак.','Только углы — не признак.'][kind],
  explain:ex,explain2:kind===0?'Проверь: угол «зажат» между двумя отмеченными сторонами, как между ножками циркуля?':kind===1?'Сторона «зажата» между двумя отмеченными углами — как перекладина между двумя опорами.':kind===2?'Три чёрточки разного вида — три пары равных сторон. Больше ничего не нужно.':kind===3?'Найди вершину с дужкой. Выходят ли из неё обе отмеченные стороны? Нет — только одна. Значит, угол не между ними, и признак не работает.':'Ни одной чёрточки — ни одной пары равных сторон. По одним углам размер не узнать.'};};
G(4,whichCrit);G(4,whichCrit);
G(4,()=>{const i=R(0,2);const ot=[0,1,2].filter(x=>x!==i);const [j,k]=shuffle(ot);/* given sides S(i,j), S(i,k)?? use two sides sharing vertex i */
 const opts=[`${S1(j,k)} = ${S2(j,k)}`,`${A1n(i)} = ${A2n(i)}`,`${A1n(j)} = ${A2n(j)}`,`${A1n(k)} = ${A2n(k)}`];const order=shuffle([0,1,2,3]);
 return {type:'multi',q:`Известно: ${S1(i,j)} = ${S2(i,j)} и ${S1(i,k)} = ${S2(i,k)}. Какое <b>одно</b> дополнительное равенство уже гарантирует, что ΔABC = ΔA₁B₁C₁? Отметь все подходящие.`,opts:order.map(x=>opts[x]),ans:[order.indexOf(0),order.indexOf(1)].sort((a,b)=>a-b),
  short:`${S1(j,k)} → III признак; ${A1n(i)} → I признак.`,
  explain:`• ${S1(j,k)} = ${S2(j,k)} — тогда равны все три стороны → <b>III признак</b> ✔.<br>• ${A1n(i)} = ${A2n(i)} — это угол между данными сторонами (обе выходят из ${K[i]}) → <b>I признак</b> ✔.<br>• ${A1n(j)} или ${A1n(k)} — угол не между данными сторонами → признака нет ✘ (может получиться два разных треугольника).`,
  explain2:`Подходит то, что «замыкает» признак: третья сторона (будет три стороны) или угол в общей вершине ${K[i]} (будет «сторона-угол-сторона»). Углы ${K[j]} и ${K[k]} ничего не гарантируют.`};});
G(4,()=>{const i=R(0,2),j=pick([0,1,2].filter(x=>x!==i));const k=3-i-j;const want=R(0,1);
 const correct=want===0?`${S1(i,k)} = ${S2(i,k)}`:`${A1n(j)} = ${A2n(j)}`;
 const pool=[`${S1(i,k)} = ${S2(i,k)}`,`${A1n(j)} = ${A2n(j)}`,`${S1(j,k)} = ${S2(j,k)}`,`${A1n(k)} = ${A2n(k)}`];
 return CH(`Известно: ${S1(i,j)} = ${S2(i,j)} и ${A1n(i)} = ${A2n(i)}. Что нужно добавить, чтобы треугольники были равны по <b>${want===0?'первому':'второму'}</b> признаку?`,correct,pool.filter(x=>x!==correct),
 {short:want===0?`Нужна вторая сторона угла ${K[i]}: ${S1(i,k)}.`:`Нужен второй угол у стороны ${S1(i,j)}: ∠${K[j]}.`,
 explain:want===0?`Первый признак — две стороны и угол <b>между</b> ними. Угол ${K[i]} образован сторонами ${S1(i,j)} и ${S1(i,k)}. Одна уже есть, нужна вторая: <b>${S1(i,k)} = ${S2(i,k)}</b>.`:`Второй признак — сторона и два угла <b>на её концах</b>. Сторона ${S1(i,j)}, её концы ${K[i]} и ${K[j]}. Угол ${K[i]} уже есть, нужен <b>∠${K[j]} = ∠${K[j]}₁</b>.`,
 explain2:want===0?`Нарисуй угол ${K[i]}: из вершины выходят две «руки» — ${S1(i,j)} и ${S1(i,k)}. Для I признака должны быть известны обе руки.`:`Нарисуй отрезок ${S1(i,j)}. У него два конца: ${K[i]} и ${K[j]}. Для II признака нужны углы на обоих концах.`});});

/* ===== L5: находим элементы ===== */
G(5,()=>CH('В равных треугольниках против равных углов лежат…','равные стороны',['большие стороны','перпендикулярные стороны','стороны, сумма которых равна периметру'],
 {short:'Против равных углов — равные стороны.',
 explain:'Равные треугольники совпадают при наложении. Совпавшие углы смотрят на совпавшие стороны, поэтому против равных углов лежат <b>равные стороны</b> (и наоборот). Именно так находят соответственные элементы.',
 explain2:'Если ∠A = ∠K, то сторона напротив A (это BC) равна стороне напротив K. Угол и «его» противолежащая сторона всегда путешествуют вместе.'}),{rule:true});
G(5,()=>{const L=pick(LETS);for(;;){const a=R(4,15),b=R(4,15),c=R(4,15);if(!okTri(a,b,c,1))continue;const P=a+b+c;
 return {type:'num',q:`ΔABC = Δ${L}. Периметр треугольника ABC равен ${P}, ${L[0]}${L[1]} = ${c}, ${L[1]}${L[2]} = ${a}. Найди ${L[0]}${L[2]}.`,ans:b,
  hint:'Периметры равных треугольников равны.',short:`${L[0]}${L[2]} = ${P} − ${c} − ${a} = ${b}.`,
  explain:`Равные треугольники имеют равные периметры: P(${L}) = ${P}.<br>${L[0]}${L[2]} = ${P} − ${L[0]}${L[1]} − ${L[1]}${L[2]} = ${P} − ${c} − ${a} = <b>${b}</b>.`,
  explain2:`Через ABC: AB = ${L[0]}${L[1]} = ${c}, BC = ${L[1]}${L[2]} = ${a}, тогда AC = ${P} − ${c} − ${a} = ${b}, и ${L[0]}${L[2]} = AC = ${b}.`};}});
G(5,()=>{for(;;){const p=R(3,10),q=R(3,12),d=R(4,14);if(!okTri(p,q,d,1.5)||p===q)continue;const P=kiteP(p,q,d);if(!kiteOK(P,d))continue;const Per=2*(p+q);
 return {type:'num',q:`В четырёхугольнике ABCD: AB = AD = ${p}, CB = CD, периметр ABCD равен ${Per}. Найди BC.`,ans:q,
  pic:geo({P,poly:[['A','B','C','D']],seg:[['A','C']],tick:[['A','B',1],['A','D',1],['C','B',2],['C','D',2]],side:[['A','B',String(p)],['B','C','?']],maxH:160,W:270}),
  hint:'Вычти из периметра две известные стороны.',short:`BC + CD = ${Per} − 2·${p} = ${Per-2*p}; BC = ${q}.`,
  explain:`P = AB + BC + CD + DA = ${p} + BC + CD + ${p}. Значит, BC + CD = ${Per} − ${2*p} = ${Per-2*p}. Так как CB = CD, каждая из них равна ${Per-2*p} : 2 = <b>${q}</b>.`,
  explain2:`Можно и через равные треугольники: ΔABC = ΔADC (по трём сторонам), «верхняя» ломаная AB + BC = половина периметра = ${Per/2}. BC = ${Per/2} − ${p} = ${q}.`};}});
G(5,()=>{for(;;){const a=R(3,8),c=R(3,8);const th1=R(192,212),th2=R(108,150);const P=crossP(a,c,th1,th2);const AC=dist(P.A,P.C);const x=Math.round(AC);if(Math.abs(AC-x)>0.15||x<2)continue;
 return {type:'num',q:`Отрезки AB и CD пересекаются в своей общей середине O. AO = ${a}, CO = ${c}, AC = ${x}. Найди периметр треугольника BOD.`,ans:a+c+x,
  pic:geo({P,poly:[['A','O','C'],['B','O','D']],tick:[['A','O',1],['O','B',1],['C','O',2],['O','D',2]],side:[['A','O',String(a)],['C','O',String(c)],['A','C',String(x)]],maxH:170,W:270}),
  hint:'ΔAOC = ΔBOD. Найди стороны ΔBOD.',short:`ΔBOD = ΔAOC → P = ${a} + ${c} + ${x} = ${a+c+x}.`,
  explain:`O — середина обоих отрезков: OB = AO = ${a}, OD = CO = ${c}. Вертикальные углы ∠AOC = ∠BOD → ΔAOC = ΔBOD по первому признаку, поэтому BD = AC = ${x}.<br>P(BOD) = ${a} + ${c} + ${x} = <b>${a+c+x}</b>.`,
  explain2:`Треугольник BOD — это треугольник AOC, повёрнутый на 180° вокруг O. Поворот не меняет длин, значит, периметры одинаковые: ${a} + ${c} + ${x}.`};}});
G(5,()=>{for(;;){const a=R(2,5),c=a+R(2,5),phi=R(35,75);const O=[0,0];const P={O,A:polar(O,a,0),C:polar(O,c,0),B:polar(O,a,phi),D:polar(O,c,phi)};const an=angAt(P.A,P.O,P.D);const x=Math.round(an);if(Math.abs(an-x)>0.3)continue;
 return {type:'num',q:`На одной стороне угла O отмечены точки A и C, на другой — B и D, причём OA = OB, OC = OD. ∠OAD = ${x}°. Найди ∠OBC (в градусах).`,ans:x,
  pic:geo({P,seg:[['O','C'],['O','D'],['A','D',{col:'var(--accent)',sw:2}],['B','C']],tick:[['O','A',1],['O','B',1],['A','C',2],['B','D',2]],ang:[['A','O','D',x+'°',{n:1}],['B','C','O','?',{n:1}]],maxH:180,W:270}),
  hint:'Какие треугольники равны? Какой угол в них соответствует ∠OAD?',short:`ΔAOD = ΔBOC → ∠OBC = ∠OAD = ${x}°.`,
  explain:`ΔAOD и ΔBOC: OA = OB, OD = OC (так как OC = OD), ∠O — общий. По первому признаку они равны, причём A ↔ B, D ↔ C. Угол OAD соответствует углу OBC: ∠OBC = <b>${x}°</b>.`,
  explain2:`Из равенства AC = BD (ведь OC − OA = OD − OB) рисунок симметричен относительно биссектрисы угла O. Угол при A «отражается» в угол при B.`};}});

/* ===== L6: доказательства ===== */
G(6,()=>CH('Ты доказал, что ΔABC = ΔKMN. Какой вывод из этого можно сделать?','AB = KM, BC = MN, AC = KN и ∠A = ∠K, ∠B = ∠M, ∠C = ∠N',['Только AB = KM','AB = MN, так как стороны равны в любом порядке','Только равенство углов, а стороны — нет'],
 {short:'Все соответственные элементы равны.',
 explain:'Равные треугольники совпадают при наложении, поэтому равны <b>все</b> соответственные элементы: три стороны и три угла. Соответствие задаёт порядок букв: A ↔ K, B ↔ M, C ↔ N. «В любом порядке» — нельзя: AB и MN не соответствуют друг другу.',
 explain2:'В доказательствах эта причина пишется так: «как соответственные элементы равных треугольников». Это последний шаг почти каждой задачи.'}),{rule:true});
const reasonTask=()=>{const pr=pick(PROOFS);const idx=pick([2,3,4]);const st=pr.steps[idx];const correct=RS_[st[2]];
 const wrong=shuffle(RPOOL.filter(x=>x!==correct&&x!==RS_.cond)).slice(0,2).concat([RS_.cond]);
 const listing=pr.steps.map((s,i)=>`${i+1}) ${s[0]} — ${i===idx?'<b>?</b>':RS_[s[2]]}`).join('<br>');
 return CH(`Дано: ${pr.given}. Доказать: ${pr.goal}.<div style="margin-top:6px;line-height:1.7">${listing}</div>Какая причина пропущена в шаге ${idx+1}?`,correct,wrong,{pic:pr.fig(),
  short:`Шаг ${idx+1}: ${st[0]} — ${correct}.`,
  explain:`Шаг ${idx+1}: «${st[0]}». ${st[2]==='side'?'Отрезок AC принадлежит обоим треугольникам — это <b>общая сторона</b>, её нет в условии.':st[2]==='angle'?'Угол O входит в оба треугольника — это <b>общий угол</b>.':st[2]==='vert'?'Углы AOC и BOD образованы двумя пересекающимися прямыми и лежат друг напротив друга — <b>вертикальные</b>, а вертикальные углы равны.':st[2]==='corr'?'Треугольники уже доказаны равными, и эти элементы в них соответствуют друг другу → <b>соответственные элементы равных треугольников</b>.':'Собраны три равенства: '+pr.steps.slice(0,3).map(s=>s[0]).join('; ')+'. Это '+({I:'две стороны и угол между ними → <b>первый признак</b>',II:'сторона и два прилежащих к ней угла → <b>второй признак</b>',III:'три стороны → <b>третий признак</b>'})[st[2]]+'.'}`,
  explain2:`Подсказка-проверка: «по условию» пишут только про то, что дано в задаче (${pr.given}). ${st[2]==='corr'?'Здесь же мы делаем вывод из уже доказанного равенства треугольников.':st[2]==='side'||st[2]==='angle'?'А этот элемент просто есть на рисунке у обоих треугольников сразу.':st[2]==='vert'?'А равенство вертикальных углов — теорема, она верна всегда.':'А равенство треугольников мы получаем из трёх «кирпичиков» по одному из признаков.'}`});};
G(6,reasonTask);
G(6,()=>{const pr=pick(PROOFS);const t=orderTask(`Дано: ${pr.given}. Доказать: ${pr.goal}. Расставь шаги доказательства в правильном порядке:`,pr.steps.map(s=>[s[0]+(s[2]==='side'||s[2]==='angle'?'':' ('+RS_[s[2]]+')'),s[1]]),{pic:pr.fig(),
  short:'Сначала три «кирпичика», потом равенство треугольников, потом вывод.',
  explain:`Правильная логика:<br>${pr.steps.map((s,i)=>`${i+1}) ${s[0]}${s[2]==='side'||s[2]==='angle'?'':' — '+RS_[s[2]]}`).join('<br>')}<br>Нельзя писать «${pr.steps[3][0]}» раньше, чем собраны все три равенства, и нельзя делать вывод «${pr.steps[4][0]}» раньше, чем доказано равенство треугольников. (Порядок трёх первых «кирпичиков» между собой не важен.)`,
  explain2:'Как в рецепте: сначала собираешь ингредиенты (три равенства), потом печёшь торт (признак), потом ешь (вывод). Торт до ингредиентов не испечёшь.'});return t;});
G(6,()=>{const pr=pick(PROOFS);
 return CH(`Дано: ${pr.given}. Доказать: ${pr.goal}. Равенство каких треугольников нужно доказать?`,pr.tri,pr.wrongTri,{pic:pr.fig(),
  short:`${pr.tri}: в них есть ${pr.goal.split(' = ').join(' и ')}.`,
  explain:`Чтобы доказать «${pr.goal}», нужны треугольники, в которые входят <b>оба</b> элемента ${pr.goal.split(' = ').join(' и ')}, и про которые хватает данных для признака. Это <b>${pr.tri}</b>: ${pr.steps.slice(0,3).map(s=>s[0]).join(', ')} → ${RS_[pr.steps[3][2]]}.`,
  explain2:'Правило выбора: найди отрезки (углы) из вопроса на рисунке и посмотри, в каких треугольниках они «живут». Потом проверь, что для этих треугольников есть три равенства.'});});
G(6,reasonTask);

/* ===== L7: ★ ===== */
G(7,()=>CH('Дано AB = A₁B₁, AC = A₁C₁ и ∠B = ∠B₁. Можно ли утверждать, что ΔABC = ΔA₁B₁C₁?','Нет: угол B не лежит между сторонами AB и AC, и треугольники могут быть разными',['Да, по первому признаку','Да, по второму признаку','Да, по третьему признаку'],
 {short:'«Сторона-сторона-угол не между» — не признак.',
 explain:`Угол B образован сторонами AB и BC, а не AB и AC. Значит, это не первый признак. Пример: точка C может стоять в двух местах на луче из B (окружность с центром A радиусом AC пересекает луч дважды).${fig(fSSA)}Две стороны и угол одинаковы, а треугольники разные. <b>Утверждать нельзя.</b>`,
 explain2:'Представь дверь (AC) на петле A, которая может упираться в пол (луч из B) в двух точках: «приоткрыта» и «распахнута». Длина двери та же, а треугольники разные.'}),{rule:true,star:true});
G(7,()=>{const c=pick([8,10,12,14,16,20]);const h=c/2;const kind=R(0,4);let x;
 if(kind===0)x=R(1,h-1);else if(kind===1)x=h;else if(kind===2)x=R(h+1,c-1);else x=R(c,c+6);if(kind===4)x=c;
 const ans=x<h?0:x===h?1:x<c?2:1;
 const B=polar([0,0],c,30);const draw=(cnt)=>{const P={A:[0,0],B};const E=[c*1.25,0];P.E=E;const seg=[['A','E',{col:'var(--muted)'}],['A','B',{sw:2.2}]];
  const pts=[];if(x>=h){const dx=Math.sqrt(Math.max(0,x*x-h*h));[B[0]+dx,B[0]-dx].forEach(v=>{if(v>1e-6&&pts.every(q=>Math.abs(q-v)>1e-6))pts.push(v);});}
  pts.forEach((v,i)=>{P['C'+(i+1)]=[v,0];seg.push(['B','C'+(i+1),{col:'var(--accent)',sw:2}]);});
  P.H=[B[0],0];seg.push(['B','H',{dash:true}]);
  return geo({P,seg,ang:[['A','E','B','30°',{n:1}]],rt:[['H','E','B']],side:[['A','B',String(c)],['B','H',N(h),{flip:true}]],lab:['A','B',...Object.keys(P).filter(k=>/^C/.test(k)),...(x===h?[]:['H'])],names:{C1:'C₁',C2:'C₂'},maxH:170,W:300,extra:[[0,-0.5]]});};
 return {type:'num',q:`Сколько существует различных (неравных) треугольников ABC, у которых AB = ${c}, ∠A = 30° и BC = ${x}?`,ans,
  hint:'Опусти перпендикуляр BH на вторую сторону угла: BH = AB/2 (катет против 30°). Сравни BC с BH и с AB.',
  short:`BH = ${N(h)}; BC = ${x} → ${ans} ${H.plural(ans,'треугольник','треугольника','треугольников')}.`,
  explain:`Точка C лежит на луче (стороне угла A) на расстоянии ${x} от B: это пересечение луча с окружностью радиуса ${x} с центром B.<br>Расстояние от B до луча: BH = AB · ½ = ${N(h)} (катет против угла 30°).<br>${x<h?`BC = ${x} &lt; ${N(h)} — окружность до луча не достаёт: <b>0</b> треугольников.`:x===h?`BC = ${x} = BH — окружность касается луча, C = H: <b>1</b> треугольник (прямоугольный).`:x<c?`${N(h)} &lt; ${x} &lt; ${c} — окружность пересекает луч в <b>двух</b> точках по одну сторону от A: <b>2</b> разных треугольника. Вот почему «две стороны и угол не между ними» — не признак!`:`BC = ${x} ≥ AB = ${c} — вторая точка пересечения ${x===c?'совпадает с A':'лежит на продолжении луча за A'}, подходит только одна: <b>1</b> треугольник.`}${fig(draw())}`,
  explain2:`Порог 1: BC = BH = ${N(h)} (касание). Порог 2: BC = AB = ${c}. Меньше первого — 0; ровно первый — 1; между порогами — 2; от второго и больше — 1. У нас BC = ${x} → ${ans}.`};},{star:true});
G(7,()=>{for(;;){const p=R(3,12),q=R(p+2,16);const lo=Math.floor((q-p)/2)+1,hi=Math.ceil((p+q)/2)-1;const vals=range(lo,hi).filter(m=>2*m>q-p&&2*m<p+q);if(vals.length<2||vals.length>7)continue;
 return {type:'set',q:`В треугольнике ABC: AB = ${p}, AC = ${q}. Медиана AM — целое число. Какие значения она может принимать? Перечисли все через запятую.`,ans:vals,
  hint:'Удвой медиану: продли AM за M на MD = AM. Какие стороны у треугольника ACD?',short:`${q} − ${p} &lt; 2AM &lt; ${q} + ${p} → AM ∈ {${vals.join(', ')}}.`,
  explain:`Продлим AM за M на MD = AM. ΔAMB = ΔDMC (BM = MC, AM = MD, вертикальные углы) → CD = AB = ${p}.<br>В треугольнике ACD стороны ${q}, ${p} и AD = 2·AM. Неравенство треугольника: ${q} − ${p} &lt; 2AM &lt; ${q} + ${p}, то есть ${N((q-p)/2)} &lt; AM &lt; ${N((p+q)/2)}.<br>Целые значения: <b>${vals.join(', ')}</b>.`,
  explain2:`Представь, что угол A между сторонами ${p} и ${q} меняется от 0° до 180°. При почти нулевом угле медиана почти (${p} + ${q})/2 = ${N((p+q)/2)}, при развёрнутом — почти (${q} − ${p})/2 = ${N((q-p)/2)}. Сами концы не достигаются (треугольник вырождается), а все промежуточные значения бывают.`};}},{star:true});
G(7,()=>{for(;;){const b=R(4,12),c=R(4,12),m=R(2,11);if(!(2*m>Math.abs(b-c)+0.5&&2*m<b+c-0.5))continue;
 return {type:'num',q:`В треугольнике ABC: AB = ${c}, AC = ${b}, медиана AM = ${m}. Медиану продлили за точку M на отрезок MD = AM. Найди периметр треугольника ABD.`,ans:c+b+2*m,
  hint:'Какому отрезку равен BD? Сравни треугольники AMC и DMB.',short:`BD = AC = ${b}, AD = ${2*m}; P = ${c} + ${b} + ${2*m} = ${c+b+2*m}.`,
  explain:`ΔAMC и ΔDMB: CM = MB (M — середина BC), AM = MD (построение), ∠AMC = ∠DMB (вертикальные). По I признаку они равны → BD = AC = ${b}.<br>AD = 2 · AM = ${2*m}.<br>P(ABD) = AB + BD + AD = ${c} + ${b} + ${2*m} = <b>${c+b+2*m}</b>.`,
  explain2:`Это знаменитый приём «удвоение медианы»: он превращает две стороны и медиану в один треугольник со сторонами ${c}, ${b}, ${2*m}. Поэтому, кстати, треугольник однозначно задаётся двумя сторонами и медианой между ними.`};}},{star:true});
G(7,()=>{const steps=[['ΔABC = ΔA₁B₁C₁ (по II признаку: AB = A₁B₁, ∠A = ∠A₁, ∠B = ∠B₁)',[]],['AC = A₁C₁ (соответственные стороны)',[0]],['AD = A₁D₁ (по условию), ∠A = ∠A₁',[]],['ΔACD = ΔA₁C₁D₁ (по I признаку)',[1,2]],['CD = C₁D₁ (соответственные стороны)',[3]]];
 return orderTask('У треугольников ABC и A₁B₁C₁: AB = A₁B₁, ∠A = ∠A₁, ∠B = ∠B₁. На сторонах AB и A₁B₁ отмечены точки D и D₁, AD = A₁D₁. Докажи, что CD = C₁D₁. Выбери правильный порядок шагов:',steps,
 {pic:pairFig(triAB(58,64,6),{s:[[0,1,1]],a:[[0,1],[1,2]]}),
 short:'Сначала ΔABC = ΔA₁B₁C₁ → AC = A₁C₁, потом ΔACD = ΔA₁C₁D₁.',
 explain:'Доказательство в два шага:<br>1) ΔABC = ΔA₁B₁C₁ по второму признаку.<br>2) Отсюда AC = A₁C₁ — новый «кирпичик».<br>3) AD = A₁D₁ и ∠A = ∠A₁.<br>4) ΔACD = ΔA₁C₁D₁ по первому признаку (AC, AD и угол A между ними).<br>5) CD = C₁D₁.<br>Шаг 4 невозможен, пока не получено AC = A₁C₁ — это главная идея.',
 explain2:'Сначала «прокачай» большой треугольник, чтобы добыть недостающую сторону AC, а уже с ней решай маленький. Как в игре: чтобы открыть вторую дверь, сначала добудь ключ за первой.'});},{star:true});
G(7,()=>{const kind=R(0,1);let P,label;
 if(kind===0){const p=R(4,6),q=R(7,10),d=R(8,12);if(!okTri(p,q,d,2))return null;P=kiteP(p,q,d);label='AB = AD, CB = CD («воздушный змей», AB ≠ CB)';}
 else{const s=R(5,8),d=R(5,11);if(d>=2*s-1||Math.abs(d-s*Math.SQRT2)<0.5)return null;P=kiteP(s,s,d);label='все четыре стороны равны (ромб, не квадрат)';}
 P.O=inter(P.A,P.C,P.B,P.D);const pts=['A','B','C','D','O'];
 const tris=[['A','B','C'],['A','C','D'],['A','B','D'],['B','C','D'],['A','B','O'],['B','C','O'],['C','D','O'],['A','D','O']];
 const key=t=>{const s=[dist(P[t[0]],P[t[1]]),dist(P[t[1]],P[t[2]]),dist(P[t[0]],P[t[2]])].sort((x,y)=>x-y);return s;};
 let cnt=0;const pairs=[];for(let i=0;i<tris.length;i++)for(let j=i+1;j<tris.length;j++){const a=key(tris[i]),b=key(tris[j]);if(a.every((v,k)=>Math.abs(v-b[k])<1e-6)){cnt++;pairs.push(`Δ${tris[i].join('')} = Δ${tris[j].join('')}`);}}
 return {type:'num',q:`В четырёхугольнике ABCD ${label}. Диагонали AC и BD пересекаются в точке O. Сколько пар равных треугольников можно найти среди треугольников ABC, ACD, ABD, BCD, ABO, BCO, CDO, ADO?`,ans:cnt,
  pic:geo({P,poly:[['A','B','C','D']],seg:[['A','C'],['B','D']],tick:kind===0?[['A','B',1],['A','D',1],['C','B',2],['C','D',2]]:[['A','B',1],['A','D',1],['C','B',1],['C','D',1]],lab:pts,maxH:170,W:280}),
  hint:'Сравнивай треугольники по трём сторонам. Помни: AC — ось симметрии.',short:`${cnt} ${H.plural(cnt,'пара','пары','пар')}: ${pairs.join(', ')}.`,
  explain:`Перебираем все 28 пар и сравниваем стороны (третий признак). Равные пары:<br>${pairs.join('<br>')}<br>Итого <b>${cnt}</b>. ${kind===0?'Треугольники ABD и BCD не равны: у них общая BD, но AB ≠ CB.':'В ромбе обе диагонали — оси симметрии, поэтому все четыре маленьких треугольника равны между собой: это уже 6 пар.'}`,
  explain2:kind===0?'Ось симметрии AC разрезает фигуру на зеркальные половинки. Каждый треугольник сверху имеет зеркального «близнеца» снизу: ABC↔ADC, ABO↔ADO, CBO↔CDO. Треугольники ABD и CBD сами симметричны, но друг другу не равны.':'Четыре маленьких треугольника равны → C(4,2) = 6 пар. Плюс ABC = CDA и ABD = CDB → ещё 2. Всего 8.'};},{star:true});
G(7,()=>{const n=R(4,12);
 return {type:'num',q:`Инженер собирает плоскую ферму из ${n} узлов (шарниров), соединённых стержнями. Конструкция строится так: начинают с одного жёсткого треугольника, а каждый новый узел крепят к двум уже имеющимся двумя стержнями. Сколько всего стержней будет в ферме?`,ans:2*n-3,
  hint:'Треугольник: 3 узла, 3 стержня. Каждый следующий узел добавляет ровно 2 стержня.',short:`3 + 2 · (${n} − 3) = ${2*n-3}.`,
  explain:`Начало: 3 узла, 3 стержня. Остаётся добавить ${n} − 3 = ${n-3} узлов, по 2 стержня на каждый: 3 + 2 · ${n-3} = <b>${2*n-3}</b>.<br>Каждый новый узел с двумя стержнями образует новый жёсткий треугольник (третий признак!), поэтому вся ферма жёсткая. Это ровно 2n − 3 стержней — меньше для жёсткости плоской фермы не бывает.`,
  explain2:`Формула 2n − 3: у каждого узла на плоскости 2 «степени свободы» (можно двигать влево-вправо и вверх-вниз), всего 2n. Вся конструкция целиком может сдвигаться и вращаться — 3 движения, которые стержни не запрещают. Остальные 2n − 3 должен запретить каждый стержень: ${2*n} − 3 = ${2*n-3}.`};},{star:true});

/* =====================================================================
   WIDGETS
   ===================================================================== */
const fitXY=(pts,W,Hh,pad)=>{const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);const s=Math.min((W-2*pad)/Math.max(x1-x0,1e-6),(Hh-2*pad)/Math.max(y1-y0,1e-6));
  const ox=(W-(x1-x0)*s)/2,oy=(Hh-(y1-y0)*s)/2;return {s,X:p=>[ox+(p[0]-x0)*s,Hh-oy-(p[1]-y0)*s]};};
const svT=(p,t,col,fs)=>`<text x="${r1(p[0])}" y="${r1(p[1])}" text-anchor="middle" font-size="${fs||14}" font-weight="700" fill="${col||'var(--accent-ink)'}">${t}</text>`;
const svL=(a,b,st)=>`<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(b[0])}" y2="${r1(b[1])}" ${st}/>`;
function onTheory(root){
  const w=root.querySelector('#w-sas');
  if(w){w.innerHTML=`<label>AB = <output id="sc">6</output><input type="range" id="sC" min="2" max="9" step="0.5" value="6"></label><label>AC = <output id="sb">8</output><input type="range" id="sB" min="2" max="9" step="0.5" value="8"></label><label>∠A = <output id="sa">50</output>°<input type="range" id="sA" min="15" max="160" step="1" value="50"></label><div id="sS" style="display:flex;justify-content:center"></div><div id="sO" class="small" style="text-align:center"></div>`;
    const C=w.querySelector('#sC'),B=w.querySelector('#sB'),A=w.querySelector('#sA');
    const draw=()=>{const c=+C.value,b=+B.value,al=+A.value;w.querySelector('#sc').textContent=N(c);w.querySelector('#sb').textContent=N(b);w.querySelector('#sa').textContent=al;
      const PA=[0,0],PC=[b,0],PB=polar(PA,c,al);const {X}=fitXY([PA,PB,PC,[-1,0],[9,0],[0,8.6]],320,190,22);const a=dist(PB,PC);
      const qa=X(PA),qb=X(PB),qc=X(PC);let o=`<svg viewBox="0 0 320 190" width="320" role="img" aria-label="Треугольник по двум сторонам и углу" style="font-family:system-ui,sans-serif">`;
      o+=`<polygon points="${[qa,qb,qc].map(p=>r1(p[0])+','+r1(p[1])).join(' ')}" fill="var(--hl)" fill-opacity=".3" stroke="none"/>`;
      o+=svL(qa,qc,'stroke="var(--fig)" stroke-width="2.4"')+svL(qa,qb,'stroke="var(--fig)" stroke-width="2.4"')+svL(qb,qc,'stroke="var(--accent)" stroke-width="2.4" stroke-dasharray="6 4"');
      const r=24,p1=[qa[0]+r,qa[1]],p2=[qa[0]+r*Math.cos(al*D2R),qa[1]-r*Math.sin(al*D2R)];o+=`<path d="M${r1(p1[0])},${r1(p1[1])} A${r},${r} 0 0 0 ${r1(p2[0])},${r1(p2[1])}" fill="none" stroke="var(--accent)" stroke-width="1.8"/>`;
      o+=svT([qa[0]-10,qa[1]+14],'A')+svT([qb[0],qb[1]-8],'B')+svT([qc[0]+10,qc[1]+14],'C')+'</svg>';
      w.querySelector('#sS').innerHTML=o;const aB=angAt(PB,PA,PC),aC=angAt(PC,PA,PB);
      w.querySelector('#sO').innerHTML=`Третья сторона BC = <span class="out">${N(Math.round(a*10)/10)}</span>, ∠B ≈ <span class="out">${Math.round(aB)}°</span>, ∠C ≈ <span class="out">${Math.round(aC)}°</span>. Точка B определяется однозначно — другого треугольника с такими AB, AC и ∠A нет.`;};
    [C,B,A].forEach(e=>e.oninput=draw);draw();}
  const s=root.querySelector('#w-ssa');
  if(s){s.innerHTML=`<label>AB = 8, ∠A = <output id="ta">30</output>°<input type="range" id="tA" min="15" max="70" step="1" value="30"></label><label>BC = <output id="tb">5</output><input type="range" id="tB" min="1" max="11" step="0.25" value="5"></label><div id="tS" style="display:flex;justify-content:center"></div><div id="tO" class="small" style="text-align:center"></div>`;
    const A=s.querySelector('#tA'),Bv=s.querySelector('#tB');
    const draw=()=>{const al=+A.value,a=+Bv.value,c=8;s.querySelector('#ta').textContent=al;s.querySelector('#tb').textContent=N(a);
      const PA=[0,0],PB=polar(PA,c,al);const h=PB[1];const {X,s:sc}=fitXY([[-4,-2],[14,-2],[-4,8.5],[14,8.5]],320,200,10);
      const pts=[];if(a>=h-1e-9){const dx=Math.sqrt(Math.max(0,a*a-h*h));[PB[0]+dx,PB[0]-dx].forEach(v=>{if(v>1e-6&&pts.every(q=>Math.abs(q-v)>1e-6))pts.push(v);});}
      const qa=X(PA),qb=X(PB);let o=`<svg viewBox="0 0 320 200" width="320" role="img" aria-label="Две стороны и угол не между ними" style="font-family:system-ui,sans-serif">`;
      o+=svL(X([-3.5,0]),X([13.8,0]),'stroke="var(--muted)" stroke-width="1.5"')+svL(qa,X(polar(PA,13,al)),'stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 4"');
      o+=`<circle cx="${r1(qb[0])}" cy="${r1(qb[1])}" r="${r1(a*sc)}" fill="none" stroke="var(--accent)" stroke-width="1.4" stroke-dasharray="5 4"/>`;
      o+=svL(qa,qb,'stroke="var(--fig)" stroke-width="2.6"');
      pts.forEach((v,i)=>{const qc=X([v,0]);o+=`<polygon points="${[qa,qb,qc].map(p=>r1(p[0])+','+r1(p[1])).join(' ')}" fill="var(--hl)" fill-opacity="${i?0.22:0.35}" stroke="none"/>`+svL(qb,qc,'stroke="var(--accent)" stroke-width="2.2"')+`<circle cx="${r1(qc[0])}" cy="${r1(qc[1])}" r="3.5" fill="var(--accent)"/>`+svT([qc[0],qc[1]+17],'C'+(pts.length>1?(i?'₂':'₁'):''));});
      o+=svT([qa[0]-10,qa[1]+14],'A')+svT([qb[0],qb[1]-10],'B')+'</svg>';s.querySelector('#tS').innerHTML=o;
      s.querySelector('#tO').innerHTML=`Расстояние от B до луча: <span class="out">${N(Math.round(h*100)/100)}</span>. Треугольников с такими данными: <span class="out">${pts.length}</span>${pts.length===2?' — два разных! Поэтому «две стороны и угол не между ними» не признак.':pts.length===0?' — окружность не достаёт до луча.':'.'}`;};
    [A,Bv].forEach(e=>e.oninput=draw);draw();}
}

window.TOPIC={id:'g7_triangles_eq',title:'Признаки равенства треугольников',subtitle:'Геометрия · 7 класс',
intro:`<p>Почему треугольник — самая жёсткая фигура и почему мосты собирают из треугольников? Здесь: элементы треугольника, что значит «равны», три признака равенства (СУС, УСУ, ССС), как выбрать признак, как находить стороны и углы и как записывать доказательства. В конце — олимпиадные задачи: почему «сторона-сторона-угол» не признак, удвоение медианы и жёсткие фермы.</p>`,
theory,symbols,figs:{},onTheory,
levels:['Элементы треугольника и равенство','Первый признак (две стороны и угол между ними)','Второй признак (сторона и два угла)','Третий признак (три стороны)','Какой признак? Чего не хватает?','Находим стороны, углы, периметры','Доказательства: причины и порядок шагов','★ Олимпиадные задачи'],
gens};
})();
