(function(){
"use strict";
/* ===== общий код географических модулей 5–6 класса (вставляется в каждый модуль) ===== */
const {R,pick,shuffle,sample,plural}=H;
const N=H.num,M=H.m;
const r2=x=>Math.round(x*100)/100;
const rnd=(x,d)=>{const k=Math.pow(10,d||0);return Math.round(x*k)/k;};
const sgn=x=>x>0?'+'+N(x):N(x);
const gens=[];
const G=(lvl,make,o)=>{o=o||{};gens.push({lvl,star:o.star,rule:o.rule,make:()=>{for(let i=0;i<400;i++){const t=make();if(t)return t;}return null;}});};
const CH=(q,correct,wrongs,extra)=>{const w=wrongs.filter(x=>x!==correct);const opts=shuffle([correct,...w]);if(new Set(opts).size!==opts.length)return null;return Object.assign({type:'choice',q,opts,ans:opts.indexOf(correct)},extra||{});};
/* choice in fixed order (for letters on a map) */
const CHF=(q,opts,ans,extra)=>Object.assign({type:'choice',q,opts,ans},extra||{});
const NUM=(ans,o)=>Object.assign({type:'num',ans},o||{});
const MULTI=(q,items,extra)=>{const it=shuffle(items);const ans=[];it.forEach((x,i)=>{if(x[1])ans.push(i);});if(!ans.length)return null;return Object.assign({type:'multi',q,opts:it.map(x=>x[0]),ans},extra||{});};
/* bank gens: item = {q,a,w:[...],e,e2,pic,hint,short,onShow} */
const BANK=(lvl,items,o)=>G(lvl,()=>{const it=pick(items);const w=it.w.length>3?sample(it.w,3):it.w;
  return CH(it.q,it.a,w,{pic:it.pic,hint:it.hint,short:it.short||it.a,explain:it.e,explain2:it.e2,onShow:it.onShow});},o);
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);

/* ---------- theory helpers ---------- */
const STEPS=(t,a)=>`<div class="box ex"><b>${t}</b>${a.map((s,i)=>`<div style="margin:5px 0"><b>Шаг ${i+1}.</b> ${s}</div>`).join('')}</div>`;
const CHK=(qs)=>`<div class="box ex"><b>🤔 Проверь себя</b>${qs.map(([q,a])=>`<div style="margin:6px 0">${q}<details style="margin-top:4px"><summary style="cursor:pointer;color:var(--accent-ink);font-weight:600">Показать ответ</summary><div style="margin-top:4px">${a}</div></details></div>`).join('')}</div>`;
const REM=(r,t)=>`<div class="box tip"><b>📌 Запомни</b>${r}${t?`<div style="margin-top:6px"><i>Как запомнить:</i> ${t}</div>`:''}</div>`;
const RULE=(t,x)=>`<div class="box rule"><b>${t}</b>${x}</div>`;
const ERR=(t,x)=>`<div class="box err"><b>${t}</b>${x}</div>`;
const FACT=x=>`<div class="fact">${x}</div>`;
const FIG=(svg,cap)=>`<div class="fig"><div style="display:flex;flex-direction:column;align-items:center">${svg}${cap?`<div class="cap" style="font-size:14px;color:var(--muted);text-align:center;margin-top:4px">${cap}</div>`:''}</div></div>`;
const FIGROW=(...a)=>`<div class="figrow">${a.map(([s,c])=>`<div class="fig">${s}${c?`<div class="cap">${c}</div>`:''}</div>`).join('')}</div>`;
const TABLE=(head,rows)=>`<table class="sym"><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;

/* ---------- SVG primitives ---------- */
let SVGID=0;
const SV=(w,h,inner,aria,wd)=>`<svg viewBox="0 0 ${w} ${h}" width="${wd||Math.min(w,340)}" role="img" aria-label="${aria||'Рисунок'}" style="font-family:system-ui,sans-serif;max-width:100%;height:auto">${inner}</svg>`;
const TX=(x,y,t,o)=>{o=o||{};const halo=o.halo?` paint-order="stroke" stroke="var(--card)" stroke-width="${o.halo===true?3:o.halo}" stroke-linejoin="round"`:'';
  return `<text x="${r2(x)}" y="${r2(y)}" text-anchor="${o.a||'middle'}" font-size="${o.fs||13}" font-weight="${o.wt||600}" fill="${o.c||'var(--ink)'}"${o.it?' font-style="italic"':''}${halo}${o.rot!=null?` transform="rotate(${o.rot} ${r2(x)} ${r2(y)})"`:''}>${t}</text>`;};
const LN=(x1,y1,x2,y2,o)=>{o=o||{};return `<line x1="${r2(x1)}" y1="${r2(y1)}" x2="${r2(x2)}" y2="${r2(y2)}" stroke="${o.c||'var(--fig)'}" stroke-width="${o.sw||2}" stroke-linecap="round"${o.dash?` stroke-dasharray="${o.dash}"`:''}${o.op!=null?` stroke-opacity="${o.op}"`:''}/>`;};
const HEAD=(x,y,dx,dy,o)=>{o=o||{};const m=Math.hypot(dx,dy)||1;const ux=dx/m,uy=dy/m,hs=o.hs||9;const bx=x-ux*hs,by=y-uy*hs;const px=-uy*hs*0.45,py=ux*hs*0.45;
  return `<polygon points="${r2(x)},${r2(y)} ${r2(bx+px)},${r2(by+py)} ${r2(bx-px)},${r2(by-py)}" fill="${o.c||'var(--fig)'}"/>`;};
const ARR=(x1,y1,x2,y2,o)=>{o=o||{};const m=Math.hypot(x2-x1,y2-y1)||1;const hs=o.hs||9;return LN(x1,y1,x2-(x2-x1)/m*hs*0.6,y2-(y2-y1)/m*hs*0.6,o)+HEAD(x2,y2,x2-x1,y2-y1,o);};
const CIR=(x,y,r,o)=>{o=o||{};return `<circle cx="${r2(x)}" cy="${r2(y)}" r="${r}" fill="${o.f||'none'}"${o.fo!=null?` fill-opacity="${o.fo}"`:''} stroke="${o.s||'none'}" stroke-width="${o.sw||1.5}"${o.dash?` stroke-dasharray="${o.dash}"`:''}/>`;};
const RECT=(x,y,w,h,o)=>{o=o||{};return `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(w)}" height="${r2(h)}" rx="${o.rx||0}" fill="${o.f||'none'}"${o.fo!=null?` fill-opacity="${o.fo}"`:''} stroke="${o.s||'none'}" stroke-width="${o.sw||1.5}"/>`;};
const PATH=(d,o)=>{o=o||{};return `<path d="${d}" fill="${o.f||'none'}"${o.fo!=null?` fill-opacity="${o.fo}"`:''} stroke="${o.s||'none'}" stroke-width="${o.sw||1.5}" stroke-linejoin="round" stroke-linecap="round"${o.dash?` stroke-dasharray="${o.dash}"`:''}${o.so!=null?` stroke-opacity="${o.so}"`:''}/>`;};
const PTS=a=>a.map(p=>r2(p[0])+','+r2(p[1])).join(' ');
const PG=(a,o)=>{o=o||{};return `<polygon points="${PTS(a)}" fill="${o.f||'none'}"${o.fo!=null?` fill-opacity="${o.fo}"`:''} stroke="${o.s||'none'}" stroke-width="${o.sw||1.2}" stroke-linejoin="round"/>`;};
const PL=(a,o)=>{o=o||{};return `<polyline points="${PTS(a)}" fill="none" stroke="${o.c||'var(--fig)'}" stroke-width="${o.sw||2}" stroke-linejoin="round" stroke-linecap="round"${o.dash?` stroke-dasharray="${o.dash}"`:''}${o.op!=null?` stroke-opacity="${o.op}"`:''}/>`;};
/* label in a small rounded box */
const TAG=(x,y,t,o)=>{o=o||{};const fs=o.fs||12;const w=String(t).replace(/<[^>]+>/g,'').length*fs*0.58+10;return RECT(x-w/2,y-fs*0.9,w,fs*1.45,{rx:5,f:o.bg||'var(--card)',s:o.s||'var(--line)',sw:0.8})+TX(x,y+fs*0.28,t,{fs,c:o.c||'var(--ink)'});};
/* clickable letter marker (data-opt → clicks option button) */
const MARK=(x,y,L,i,o)=>{o=o||{};return `<g data-opt="${i}" style="cursor:pointer">${CIR(x,y,o.r||10,{f:o.f||'var(--hl)',s:'var(--fig)',sw:1.4})}${TX(x,y+4.5,L,{fs:12.5,wt:800,c:'#111'})}</g>`;};
const LET=['А','Б','В','Г','Д','Е'];
/* onShow: make every [data-opt] element click the matching answer button */
const CLICKMAP=root=>{root.querySelectorAll('.q [data-opt], .fig [data-opt]').forEach(g=>{g.addEventListener('click',()=>{const b=root.querySelector(`.opt[data-i="${g.getAttribute('data-opt')}"]`);if(b&&!b.disabled)b.click();});});};

/* ---------- colours ---------- */
const WATER='var(--accent)',LAND='var(--ok)',MOUNT='var(--warn)';

/* ====================== world map ======================
   simplified continents, lon/lat; equirectangular projection */
const WORLD={
NA:[[-166,68],[-157,71],[-140,70],[-128,70],[-115,68],[-100,68],[-94,72],[-82,70],[-80,63],[-92,62],[-94,58],[-88,56],[-82,55],[-79,59],[-77,62],[-70,61],[-64,60],[-61,56],[-56,52],[-60,48],[-65,45],[-70,42],[-74,40],[-76,35],[-81,31],[-80,26],[-82,27],[-84,30],[-90,29.5],[-94,29.5],[-97,27],[-97,22],[-95,19],[-91,19],[-90,21],[-87,21],[-88,16],[-83,15],[-83,10],[-79,9],[-77,8.5],[-80,7.5],[-85,10],[-87,13],[-92,14.5],[-96,16],[-105,20],[-106,23],[-109,26],[-112.5,29.5],[-114.7,31.7],[-113,29],[-110,24],[-110,23],[-112,25],[-114.2,28],[-117,32.5],[-120.5,34.5],[-124,40],[-124,46],[-123,49],[-130,54],[-135,58],[-140,60],[-147,61],[-152,59],[-158,57],[-164,55],[-158,58.5],[-162,60],[-165,62],[-164,65]],
GL:[[-73,78],[-60,82],[-35,83.5],[-20,82],[-18,77],[-22,70],[-32,68],[-40,65],[-43,60],[-48,61],[-52,65],[-54,69],[-58,75],[-68,76]],
SA:[[-77,8.5],[-72,12],[-64,10.5],[-60,8.5],[-52,5],[-50,1],[-44,-2.5],[-35,-5],[-35,-9],[-39,-14],[-39.5,-18],[-41,-22],[-48,-25.5],[-48.5,-28],[-53,-34],[-58,-34.5],[-57,-37],[-62,-39],[-65,-42],[-67,-46],[-66,-48],[-69,-51],[-68.5,-53],[-71,-54],[-74,-52],[-75,-48],[-73.5,-44],[-73.5,-38],[-71.5,-30],[-70.3,-18],[-75.5,-15],[-81,-6],[-80,-2],[-80,1],[-78,3],[-77.5,7]],
EA:[[-9.5,37],[-9,43],[-2,43.5],[-1.5,46.5],[-4.5,48.5],[-1.5,49.5],[2,51],[4,52],[5,53.5],[8.5,54],[8,57],[10.5,57.7],[10.5,55],[12,54.3],[14,54],[19,54.5],[21,55.5],[21,57],[24,57.5],[23.5,59],[28,60],[23,60],[21.5,61],[21.5,63],[25,65],[22,65.8],[17.5,62.5],[19,60],[16.5,57],[13,55.5],[11,58.5],[8,58],[5.5,59],[5,62],[10,64],[14,67.5],[19,70],[26,71],[31,70],[40,67.5],[33,66],[36,64.5],[44,66],[44,68.5],[53,68.5],[60,69],[68,72.5],[73,72],[80,73],[87,75],[100,77.5],[106,77],[113,74],[128,72],[140,72.5],[150,71],[160,69.5],[170,70],[180,69],[180,65],[177,62.5],[170,60],[163,60],[163,56],[160,53],[156,51],[155.5,57],[160,61.5],[155,59.5],[143,59.3],[137,54],[141,52],[140,48],[135,43.5],[130,42.5],[129.5,35.5],[126.5,34.5],[126,38],[125,39.5],[121.5,40.5],[121.5,39],[118,39],[119,37],[122.5,37],[119,35],[120.5,32],[122,30],[119.5,25],[114,22.3],[110,21],[108,21.5],[106,19.5],[109,15],[109,11.5],[105,8.6],[103,10.5],[100.5,13.5],[100,9],[103.5,1.3],[101,3],[98.5,8],[98.5,13],[97.5,16.5],[94.5,16],[94,18.5],[92,21.5],[90,22],[87,21.5],[86,20],[80.5,15.5],[80,10],[77.5,8],[76,10],[73.5,16],[72.8,21],[70,22.5],[68,23.7],[66.5,25.4],[61.5,25.2],[57.5,25.7],[56,27],[52,27.8],[50,30],[48,30],[48.5,28.5],[51,24.5],[51.5,25.5],[52,24],[56,26],[56.5,24.5],[59.5,22.5],[57.7,19],[55,17],[52,16],[45,13],[43.5,12.7],[42.5,16],[39,21.5],[35,28],[34,27.8],[32.5,30],[34.2,31.3],[35,33],[36,35.5],[36,36.8],[32.5,36.2],[30,36.3],[27.5,37],[26.5,39.5],[26,40.7],[23,40.5],[24,38],[22,36.5],[21,38.5],[19.5,41.5],[18.5,42.5],[15,45],[13.7,45.6],[12.3,45.3],[12.5,44],[14,42],[16,41.3],[18.5,40.2],[16.5,39],[16,38],[15.6,40],[13,41.2],[10.5,43],[9,44.4],[7,43.6],[4.5,43.5],[3,43],[3.2,41.8],[0.5,40.5],[0,39],[-0.7,37.6],[-2.2,36.7],[-5.6,36],[-6.5,36.8],[-7.5,37.2]],
AF:[[-17,21],[-16,24],[-13,27.5],[-9.8,30],[-9.5,32.5],[-6,35.8],[-2,35.1],[3,36.8],[10,37.3],[11,35.2],[10,34],[11.5,33],[15,32.3],[20,30.8],[20,32.3],[23,32.6],[25,31.7],[29,30.8],[32.3,31.3],[32.5,30],[33.5,27],[35.5,23.5],[37.3,19],[38.6,18],[39.7,15.5],[41.5,13.8],[43.3,12.5],[44.5,10.4],[51,11.8],[51.2,10.4],[48,5],[46,2],[42.5,-1],[40,-3.5],[39.2,-6.5],[40.5,-10.5],[40.5,-15],[37,-17.5],[35,-20],[35.5,-24],[32.8,-26],[32.5,-28.6],[30,-31.3],[27.5,-33.5],[25,-34],[20,-34.8],[18.4,-34],[18,-32],[15,-27],[14.5,-23],[12,-18],[12,-13],[13.5,-10.5],[12.2,-6],[9.5,-2],[9.5,3],[8.5,4.5],[6,4.3],[4,6.4],[1,6],[-2,4.8],[-5,5.2],[-7.5,4.4],[-11.5,6.9],[-13.2,8.9],[-15,10.9],[-16.7,12.5],[-17.5,14.7],[-16.5,16.2],[-16,19]],
AU:[[113.5,-22],[114,-26.5],[115,-30],[115,-34],[118,-35],[123,-34],[126,-32.3],[131,-31.5],[134,-32.8],[135.5,-35],[138,-34.5],[138,-35.7],[140,-37.8],[144,-38.3],[146.3,-39],[150,-37.5],[151.3,-33.8],[153.6,-28],[153,-25],[150.8,-22.5],[149,-20.5],[146,-18.5],[145.3,-15],[143.5,-14],[142.5,-10.8],[141.5,-13.5],[141.5,-17],[140,-17.7],[136,-15],[137,-12],[132.5,-11.5],[130,-13],[129,-15],[126,-14],[122.5,-17],[121,-19.5],[117,-20.6]],
AN:[[-180,-90],[-180,-78],[-160,-77],[-150,-76],[-140,-75],[-120,-73.5],[-100,-73],[-80,-73],[-70,-70],[-62,-64],[-58,-63.5],[-60,-66],[-62,-70],[-60,-75],[-50,-77.5],[-35,-77.5],[-28,-75],[-20,-73],[-10,-71],[0,-70],[20,-70],[40,-69],[55,-66.5],[70,-68],[80,-67],[90,-66.5],[110,-66],[130,-66],[145,-67],[160,-70],[170,-72],[167,-78],[180,-78],[180,-90]]
};
const ISL=[
 [[-5.5,50],[1.5,51],[1.7,52.7],[0,53.5],[-1.5,55],[-2,57.5],[-3,58.6],[-5,58.6],[-6,56.5],[-4.8,54.8],[-3,54],[-4.6,53.3],[-4.2,52],[-5.2,51.7]],
 [[-10,51.6],[-6,52],[-6,54.2],[-8,55.2],[-10,54]],
 [[130,31],[132,33.5],[135,34],[140,35],[141,38],[142,41],[140,41.5],[139.5,38],[136,36.5],[133,35.5],[130.9,34]],
 [[140,42],[141.5,45.5],[145.5,43.5],[143,42]],
 [[142,46],[143.5,46.5],[142.8,54.3],[142.2,52.5]],
 [[80,6],[81.8,7.5],[80.3,9.8],[79.8,8]],
 [[49.3,-12],[50.5,-15.5],[47,-25],[44,-25],[43.5,-21],[44.5,-16],[47,-13.3]],
 [[95.3,5.6],[98.5,4],[104,-1.5],[106,-6],[104.5,-5.8],[101,-2.5]],
 [[109,1.5],[111,-3],[116,-4],[118,1],[119,5],[117,7],[115,5],[110,2.5]],
 [[105.5,-6.8],[114.5,-7.8],[114.4,-8.7],[106,-7.5]],
 [[131,-1],[135,-3.5],[138,-1.6],[144,-3.5],[148,-6],[150.5,-10.5],[147,-10],[142.5,-9.3],[138.5,-8.3],[137.5,-5],[132,-2.5]],
 [[172.7,-34.4],[175,-37],[178.5,-37.7],[175,-41.5],[173,-39]],
 [[174,-41],[172.5,-40.5],[166.5,-46],[169,-46.6],[171,-44.5],[174,-42]],
 [[-24,65.5],[-21,66.5],[-15,66.5],[-13.5,65],[-18,63.4],[-22.5,63.8]],
 [[-85,21.9],[-80,23.2],[-74.2,20.2],[-77.5,19.9],[-80,21.6]],
 [[120,18.5],[122.5,18.4],[124,13],[126,9],[125.5,6],[122,7],[123,10],[120.5,14.5]],
 [[52,71.5],[56,73.7],[68,76.9],[60,75.8],[55,74.6],[53,72]],
 [[144.6,-40.7],[148.3,-40.9],[148,-43.2],[146,-43.6],[145,-42]],
 [[-80,73],[-68,70],[-62,67],[-66,62],[-75,64],[-80,66.5],[-90,70]],
 [[11,78],[22,80.5],[28,80],[20,77],[15,76.8]]
];
const INSEA={black:[[28,41.5],[28.6,44],[29.7,45.3],[31,46.6],[33.5,46],[32.5,45.4],[33.5,44.4],[36,45],[38,47],[39,47.2],[37.5,46],[38.5,45.5],[37.5,44.7],[39.5,43.5],[41.6,41.6],[38,41],[34,42],[31.5,41.2]],
 caspian:[[47,44.5],[49,46.5],[53,47],[53,45],[51,44.5],[52.5,42],[53,40.5],[54,37.5],[51,36.7],[49,38],[49.5,40.5],[47.5,42]]};
const LAKES={baikal:[[103.7,51.6],[105,51.6],[108,53],[109.6,55.7],[109,55.8],[106.5,53.5],[104,52]],
 superior:[[-92,46.7],[-90,47.5],[-85,48],[-84.5,46.5],[-88,47.3]],
 victoria:[[32,0.3],[34,0.3],[34.5,-1.5],[33.5,-2.8],[31.8,-2]],
 tanganyika:[[29.2,-3.3],[29.7,-3.5],[30.6,-6],[31,-8.6],[30.5,-8.7],[29.5,-6.3]],
 ladoga:[[30,60.2],[31.5,60.4],[32.8,61.2],[31,61.7],[30.2,61]],
 chad:[[13.5,13],[14.8,13.5],[15,12.8],[14,12.3]]};
const RIVERS={
 'Амазонка':[[-76,-10.5],[-73.5,-5],[-70,-4],[-65,-3.5],[-60,-3.2],[-55,-2.5],[-52,-1.5],[-50,-0.3]],
 'Нил':[[33,-2],[32.5,1.5],[31.5,4],[31.5,9.5],[32.5,15.6],[33.5,17.5],[31.5,20],[31.5,23],[32.8,25.7],[31.2,30],[31,31.5]],
 'Миссисипи':[[-95,47.5],[-91.5,44],[-91,41],[-90,38.5],[-89.5,35],[-91,32.5],[-91.3,30.5],[-89.5,29]],
 'Волга':[[33,57],[36,57],[40,57.6],[44,56.3],[48,55.8],[49,55],[48,52],[46,51.5],[45.5,48.5],[47.5,46.8],[48,46]],
 'Обь':[[85,52],[83,55],[78,57.5],[76,60.8],[69,61.3],[66,63],[66,66.5],[69,67]],
 'Енисей':[[94,51.7],[92,56],[93,58.5],[90,62],[88,66],[86.5,69.4],[83,71.5]],
 'Лена':[[107,54],[108,57],[114,60],[120,60.5],[127,62],[129.7,62],[127,66],[125.5,70.5],[127,72.4]],
 'Янцзы':[[92,34],[97,33],[100,28],[104,29],[106,29.5],[110,30.7],[114,30.5],[117,31],[121.5,31.4]],
 'Амур':[[121,53.3],[126,52.5],[127.5,49.6],[132,47.7],[135,48.4],[137,50.5],[140.5,53]],
 'Конго':[[26,-11],[27,-5],[25,0.5],[22,1.5],[18,1],[16,-2.5],[13.5,-5],[12.3,-6]],
 'Ганг':[[79,30.5],[81,25.5],[85,25.5],[88,24],[90,22]]};
const MTS={
 'Анды':[[-75,7],[-75,4],[-77.5,0],[-79,-5],[-76,-10],[-72,-15],[-69,-19],[-68.5,-25],[-70,-32],[-71,-40],[-73,-48],[-72,-53]],
 'Кордильеры':[[-155,62],[-142,61],[-132,58],[-125,53],[-120,47],[-116,40],[-110,35],[-107,28],[-103,22],[-98,18]],
 'Гималаи':[[73,35],[78,32],[83,29],[88,27.8],[92,27.5],[95,28.5]],
 'Альпы':[[6,44],[7,46],[10,46.5],[13,47],[16,47.5]],
 'Уральские горы':[[59,51],[59,55],[59.5,60],[60,64],[64,67.5],[66,69]],
 'Кавказ':[[38,44.5],[42,43.3],[46,42],[49.5,40.5]],
 'Аппалачи':[[-87,33.5],[-83,36],[-79,38.5],[-76,41],[-72,43.5],[-68,46.5]],
 'Скандинавские горы':[[6,59],[8,61.5],[13,64],[16,67.5],[20,69.5]],
 'Атлас':[[-9,30.5],[-5,32],[0,34],[5,35.5],[9,36.5]],
 'Большой Водораздельный хребет':[[145,-15],[147,-20],[150,-25],[151.5,-30],[149,-36],[146.5,-37.5]]};
const MT_GEN={'Анды':'Анд','Кордильеры':'Кордильер','Гималаи':'Гималаев','Альпы':'Альп','Уральские горы':'Уральских гор','Кавказ':'Кавказа','Аппалачи':'Аппалачей','Скандинавские горы':'Скандинавских гор','Атлас':'Атласа','Большой Водораздельный хребет':'Большого Водораздельного хребта'};
const OCEAN_LBL={'Тихий':[[-150,5],[165,15]],'Атлантический':[[-35,20],[-20,-25]],'Индийский':[[78,-20]],'Северный Ледовитый':[[110,81.5]]};
const OCEAN_PT={'Тихий':[-140,-10],'Атлантический':[-30,10],'Индийский':[80,-25],'Северный Ледовитый':[-150,80],'Южный':[60,-60]};
const CONT_PT={'Евразия':[90,52],'Африка':[20,5],'Северная Америка':[-100,45],'Южная Америка':[-60,-12],'Австралия':[134,-25],'Антарктида':[30,-80]};
const CONT_KEY={'Евразия':'EA','Африка':'AF','Северная Америка':'NA','Южная Америка':'SA','Австралия':'AU','Антарктида':'AN'};
/* box: [lon0,lon1,latTop,latBottom] */
function proj(box,W){const sx=W/(box[1]-box[0]);const Hh=(box[2]-box[3])*sx;return {W,H:Hh,s:sx,X:lon=>(lon-box[0])*sx,Y:lat=>(box[2]-lat)*sx,P:p=>[(p[0]-box[0])*sx,(box[2]-p[1])*sx]};}
/* o: {box,W,grid:step|false,gridLbl,hl:{EA:true}, rivers:[names]|true, mts:[names]|true, lakes:bool, marks:[{lon,lat,L,i}], pts:[{lon,lat,t,c}], oceanNames, contNames, extra:(P)=>svg, eq:bool} */
function worldMap(o){o=o||{};const box=o.box||[-180,180,86,-72];const W=o.W||340;const P=proj(box,W);const id='cl'+(++SVGID)+Math.floor(Math.random()*1e6);
  const fs=o.fs||Math.max(8,Math.min(13,W/34*(360/(box[1]-box[0]))**0.25));
  let s=`<defs><clipPath id="${id}"><rect x="0" y="0" width="${r2(W)}" height="${r2(P.H)}"/></clipPath></defs><g clip-path="url(#${id})">`;
  s+=RECT(0,0,W,P.H,{f:WATER,fo:0.13});
  if(o.zones)s+=o.zones(P);
  if(o.grid){const st=o.grid;for(let la=-90;la<=90;la+=st){if(la===0&&o.eq!==false)continue;s+=LN(0,P.Y(la),W,P.Y(la),{sw:0.6,c:'var(--muted)',op:0.55});}
    for(let lo=-180;lo<=180;lo+=st)s+=LN(P.X(lo),0,P.X(lo),P.H,{sw:lo===0?1.1:0.6,c:'var(--muted)',op:lo===0?0.9:0.55});}
  for(const k in WORLD){const hl=o.hl&&o.hl[k];s+=PG(WORLD[k].map(P.P),{f:hl?'var(--hl)':LAND,fo:hl?0.75:(o.landOp||0.3),s:'var(--fig)',sw:0.6});}
  ISL.forEach(a=>{s+=PG(a.map(P.P),{f:LAND,fo:o.landOp||0.3,s:'var(--fig)',sw:0.5});});
  for(const k in INSEA)s+=PG(INSEA[k].map(P.P),{f:'var(--card)',fo:1,s:'var(--fig)',sw:0.5})+PG(INSEA[k].map(P.P),{f:WATER,fo:0.13});
  if(o.lakes)for(const k in LAKES)s+=PG(LAKES[k].map(P.P),{f:'var(--card)',fo:1,s:'var(--fig)',sw:0.5})+PG(LAKES[k].map(P.P),{f:WATER,fo:0.35});
  if(o.mts){const L=o.mts===true?Object.keys(MTS):o.mts;L.forEach(k=>{s+=PL(MTS[k].map(P.P),{c:MOUNT,sw:o.mtW||4,op:0.85});});}
  if(o.mtHL)o.mtHL.forEach(k=>{s+=PL(MTS[k].map(P.P),{c:'var(--bad)',sw:(o.mtW||4)+1});});
  if(o.rivers){const L=o.rivers===true?Object.keys(RIVERS):o.rivers;L.forEach(k=>{s+=PL(RIVERS[k].map(P.P),{c:WATER,sw:o.rvW||1.8});});}
  if(o.rvHL)o.rvHL.forEach(k=>{s+=PL(RIVERS[k].map(P.P),{c:'var(--bad)',sw:(o.rvW||1.8)+1.2});});
  if(o.eq!==false&&o.grid!==false)s+=LN(0,P.Y(0),W,P.Y(0),{sw:o.grid?1.1:0.8,c:'var(--bad)',op:0.7,dash:o.grid?null:'5 4'});
  if(o.extra)s+=o.extra(P);
  if(o.oceanNames){for(const k in OCEAN_LBL)OCEAN_LBL[k].forEach(p=>{const [x,y]=P.P(p);if(x>10&&x<W-10&&y>6&&y<P.H-4)s+=TX(x,y,k+(k==='Северный Ледовитый'?' океан':''),{fs:fs*0.85,c:'var(--accent-ink)',it:true,wt:600,halo:2});});}
  if(o.contNames){for(const k in CONT_PT){const [x,y]=P.P(CONT_PT[k]);if(x>10&&x<W-10&&y>6&&y<P.H-4)s+=TX(x,y,k,{fs:fs*0.85,c:'var(--ink)',halo:2});}}
  (o.pts||[]).forEach(p=>{const [x,y]=P.P([p.lon,p.lat]);s+=CIR(x,y,p.r||3.5,{f:p.c||'var(--bad)',s:'var(--card)',sw:1})+(p.t?TX(x+(p.dx!=null?p.dx:6),y+(p.dy!=null?p.dy:-5),p.t,{fs:p.fs||fs*0.85,a:p.a||'start',halo:2,c:p.tc||'var(--ink)'}):'');});
  s+='</g>';
  (o.marks||[]).forEach(m=>{const [x,y]=P.P([m.lon,m.lat]);s+=MARK(Math.max(11,Math.min(W-11,x)),Math.max(11,Math.min(P.H-11,y)),m.L,m.i);});
  s+=RECT(0,0,W,P.H,{s:'var(--fig)',sw:1});
  if(o.gridLbl){const st=o.gridLbl;let t='';const pad=o.pad||0;
    for(let la=-90;la<=90;la+=st){const y=P.Y(la);if(y<6||y>P.H-4)continue;t+=TX(-3,y+3.5,(la===0?'0°':Math.abs(la)+'°'+(la>0?'с':'ю')),{fs:9,a:'end',wt:500,c:'var(--muted)'});}
    for(let lo=-180;lo<=180;lo+=st){const x=P.X(lo);if(x<4||x>W-4)continue;t+=TX(x,P.H+11,(lo===0?'0°':Math.abs(lo)+'°'+(lo>0?'в':'з')),{fs:9,wt:500,c:'var(--muted)'});}
    return `<svg viewBox="-34 -4 ${r2(W+40)} ${r2(P.H+20)}" width="${o.wd||Math.min(340,W+40)}" role="img" aria-label="${o.aria||'Карта'}" style="font-family:system-ui,sans-serif;max-width:100%;height:auto">${s}${t}</svg>`;}
  return SV(r2(W),r2(P.H),s,o.aria||'Карта',o.wd);}

/* ---------- widget helpers ---------- */
const SL=(id,label,min,max,step,val,unit)=>`<label>${label} <output id="${id}o"></output><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"></label>`;
const BTNS=(a)=>`<div style="display:flex;gap:6px;flex-wrap:wrap;margin:6px 0">${a.map(([id,t],i)=>`<button class="btn${i?' ghost':''}" id="${id}" type="button">${t}</button>`).join('')}</div>`;
const setBtns=(w,ids,act)=>ids.forEach(i=>{const b=w.querySelector('#'+i);if(b)b.className='btn'+(i===act?'':' ghost');});
/* order of play: by level, rule-checks first inside each level */
const SORTG=()=>{const a=gens.map((g,i)=>[g,i]);a.sort((x,y)=>x[0].lvl-y[0].lvl||((y[0].rule?1:0)-(x[0].rule?1:0))||x[1]-y[1]);gens.length=0;a.forEach(x=>gens.push(x[0]));return gens;};
/* bank split into several gens (chunks of 2) */
const BANKS=(lvl,items,o)=>{for(let i=0;i<items.length;i+=2){const ch=items.slice(i,i+2);if(ch.length===1&&i>0){/* merge single tail */}BANK(lvl,ch.length===1&&i>0?items.slice(i-1,i+1):ch,o);}};
/* ====== orthographic globe ====== */
const DEG=Math.PI/180;
const ortho=(lat,lon,lat0,lon0,R)=>{const f=lat*DEG,l=(lon-lon0)*DEG,f0=lat0*DEG;const cosc=Math.sin(f0)*Math.sin(f)+Math.cos(f0)*Math.cos(f)*Math.cos(l);
 let x=R*Math.cos(f)*Math.sin(l),y=R*(Math.cos(f0)*Math.sin(f)-Math.sin(f0)*Math.cos(f)*Math.cos(l));return {x,y,v:cosc>=0};};
const orthoInv=(x,y,lat0,lon0,R)=>{const rho=Math.hypot(x,y);if(rho>R)return null;if(rho<1e-9)return {lat:lat0,lon:lon0};const c=Math.asin(rho/R),f0=lat0*DEG;
 const lat=Math.asin(Math.cos(c)*Math.sin(f0)+y*Math.sin(c)*Math.cos(f0)/rho)/DEG;let lon=lon0+Math.atan2(x*Math.sin(c),rho*Math.cos(c)*Math.cos(f0)-y*Math.sin(c)*Math.sin(f0))/DEG;lon=((lon+540)%360)-180;return {lat,lon};};
/* o: {lat0,lon0,R,cx,cy,step,pt:{lat,lon},hlLat,hlLon,labels} */
function globe(o){const R=o.R||100,cx=o.cx||R+20,cy=o.cy||R+14,lat0=o.lat0||0,lon0=o.lon0||0,st=o.step||30;let s='';
 const P=(la,lo)=>{const p=ortho(la,lo,lat0,lon0,R);if(!p.v){const k=R/Math.hypot(p.x,p.y||1e-9);return [cx+p.x*k,cy-p.y*k,false];}return [cx+p.x,cy-p.y,true];};
 s+=CIR(cx,cy,R,{f:WATER,fo:0.15,s:'var(--fig)',sw:1.4});
 const land=a=>{const pts=a.map(p=>P(p[1],p[0]));if(!pts.some(p=>p[2]))return '';return PG(pts.map(p=>[p[0],p[1]]),{f:LAND,fo:0.3,s:'var(--fig)',sw:0.5});};
 for(const k in WORLD){if(k==='AN')continue;s+=land(WORLD[k]);}ISL.forEach(a=>{s+=land(a);});
 const line=(pts,o2)=>{let segs=[],cur=[];pts.forEach(p=>{if(p[2])cur.push([p[0],p[1]]);else{if(cur.length>1)segs.push(cur);cur=[];}});if(cur.length>1)segs.push(cur);return segs.map(sg=>PL(sg,o2)).join('');};
 for(let la=-90+st;la<90;la+=st){const pts=[];for(let lo=-180;lo<=180;lo+=4)pts.push(P(la,lo));s+=line(pts,{c:la===0?'var(--bad)':'var(--muted)',sw:la===0?1.6:0.7});}
 for(let lo=-180;lo<180;lo+=st){const pts=[];for(let la=-90;la<=90;la+=3)pts.push(P(la,lo));s+=line(pts,{c:lo===0?'var(--bad)':'var(--muted)',sw:lo===0?1.6:0.7});}
 if(o.hlLat!=null){const pts=[];for(let lo=-180;lo<=180;lo+=3)pts.push(P(o.hlLat,lo));s+=line(pts,{c:'var(--hl)',sw:2.6});}
 if(o.hlLon!=null){const pts=[];for(let la=-90;la<=90;la+=2)pts.push(P(la,o.hlLon));s+=line(pts,{c:'var(--accent-ink)',sw:2.6});}
 const np=P(90,0),sp=P(-90,0);if(np[2])s+=CIR(np[0],np[1],3,{f:'var(--ink)'})+TX(np[0]+5,np[1]-4,'С. полюс',{fs:9.5,a:'start',halo:2});if(sp[2])s+=CIR(sp[0],sp[1],3,{f:'var(--ink)'})+TX(sp[0]+5,sp[1]+11,'Ю. полюс',{fs:9.5,a:'start',halo:2});
 if(o.pt){const p=P(o.pt.lat,o.pt.lon);if(p[2])s+=CIR(p[0],p[1],5,{f:'var(--bad)',s:'var(--card)',sw:1.5});}
 if(o.marks)o.marks.forEach(m=>{const p=P(m.lat,m.lon);if(p[2])s+=MARK(p[0],p[1],m.L,m.i);});
 return SV(2*cx,2*cy,s,'Глобус',o.wd||Math.min(340,2*cx));}
/* screen point → svg coords */
const svgPt=(svg,ev)=>{const r=svg.getBoundingClientRect();const vb=svg.viewBox.baseVal;return [vb.x+(ev.clientX-r.left)/r.width*vb.width,vb.y+(ev.clientY-r.top)/r.height*vb.height];};
const fmtLat=l=>{const a=Math.round(Math.abs(l));return a===0?'0° (экватор)':a+'° '+(l>0?'с. ш.':'ю. ш.');};
const fmtLon=l=>{const a=Math.round(Math.abs(l));return a===0?'0° (начальный меридиан)':a===180?'180°':a+'° '+(l>0?'в. д.':'з. д.');};
/* ================= geo6_relief: §23–27 «Полярная звезда» ================= */
/* hypsometric scale (как на физической карте) */
const HYPS=[[-1e4,0,'ниже уровня моря (впадина)','var(--ok)',0.85],[0,200,'низменность','var(--ok)',0.45],[200,500,'возвышенность','var(--hl)',0.5],[500,1000,'плоскогорье или низкие горы','var(--warn)',0.3],[1000,2500,'средневысотные горы','var(--warn)',0.55],[2500,5000,'высокие горы','var(--warn)',0.8],[5000,9000,'высочайшие горы','var(--bad)',0.75]];
const hyps=h=>HYPS.find(x=>h>=x[0]&&h<x[1])||HYPS[6];
const plainType=h=>h<0?'впадина (ниже уровня моря)':h<200?'низменность':h<=500?'возвышенность':'плоскогорье';
const mtType=h=>h<1000?'низкие':h<=2500?'средневысотные':h<=5000?'высокие':'высочайшие';
/* ---- figures ---- */
const figLayersMove=(()=>{const W=104;let s='';const blk=(x0,lay)=>lay.map(([pts,c],i)=>PG(pts.map(p=>[x0+p[0],p[1]]),{f:c,fo:0.5,s:'var(--fig)',sw:0.8})).join('');
 const L1=[[[[0,40],[96,40],[96,60],[0,60]],'var(--hl)'],[[[0,60],[96,60],[96,80],[0,80]],'var(--warn)'],[[[0,80],[96,80],[96,100],[0,100]],'var(--ok)']];
 s+=blk(6,L1)+TX(54,122,'горизонтальное',{fs:11})+TX(54,135,'залегание',{fs:11});
 const wave=(y,a)=>{let p=[];for(let x=0;x<=96;x+=8)p.push([x,y-a*Math.sin(x/96*2*Math.PI)]);return p;};
 const f=(y1,y2,c)=>[[...wave(y1,14),...wave(y2,14).reverse()],c];
 s+=blk(118,[f(40,60,'var(--hl)'),f(60,80,'var(--warn)'),f(80,100,'var(--ok)')])+TX(166,122,'складки',{fs:11})+TX(166,135,'(смятие)',{fs:11});
 const g=(dy)=>[[[[0,40],[44,40],[44,60],[0,60]],'var(--hl)'],[[[0,60],[44,60],[44,80],[0,80]],'var(--warn)'],[[[0,80],[44,80],[44,100],[0,100]],'var(--ok)'],[[[52,40+dy],[96,40+dy],[96,60+dy],[52,60+dy]],'var(--hl)'],[[[52,60+dy],[96,60+dy],[96,80+dy],[52,80+dy]],'var(--warn)'],[[[52,80+dy],[96,80+dy],[96,100+dy],[52,100+dy]],'var(--ok)']];
 s+=blk(230,g(14))+LN(278,30,278,112,{c:'var(--bad)',sw:2,dash:'4 3'})+TX(278,26,'разлом',{fs:10.5,c:'var(--bad)'})+TX(278,128,'глыбы',{fs:11})+TX(278,141,'(сброс)',{fs:11});
 return SV(340,146,s,'Залегание горных пород',340);})();
const figQuake=(()=>{let s=RECT(0,40,320,130,{f:'var(--warn)',fo:0.18})+LN(0,40,320,40,{sw:2});const fx=160,fy=130;
 [24,48,72,96].forEach(r=>{s+=CIR(fx,fy,r,{s:'var(--bad)',sw:1.2,dash:'4 3'});});
 s+=`<rect x="0" y="0" width="320" height="39" fill="var(--card)"/>`;
 s+=CIR(fx,fy,6,{f:'var(--bad)'})+TX(fx+12,fy+4,'очаг',{fs:12.5,a:'start',c:'var(--bad)',halo:3});
 s+=CIR(fx,40,5,{f:'var(--hl)',s:'var(--fig)'})+LN(fx,46,fx,fy-8,{dash:'3 3',sw:1})+TX(fx,24,'эпицентр — прямо над очагом',{fs:12.5});
 s+=`<g transform="translate(60,28)">${RECT(0,0,18,12,{f:'var(--fig)',fo:0.5})}${PG([[-2,0],[9,-8],[20,0]],{f:'var(--fig)',fo:0.6})}</g>`+`<g transform="translate(244,28)">${RECT(0,0,18,12,{f:'var(--fig)',fo:0.5})}${PG([[-2,0],[9,-8],[20,0]],{f:'var(--fig)',fo:0.6})}</g>`;
 s+=TX(316,162,'сейсмические волны',{fs:11,wt:500,c:'var(--muted)',a:'end',halo:2});
 return SV(320,172,s,'Очаг и эпицентр землетрясения',320);})();
/* volcano cross-section; parts highlight, erupting flag */
const VPARTS=[['очаг','Магматический очаг','Подземный «котёл» с раскалённой магмой на глубине нескольких километров.'],['жерло','Жерло','Канал, по которому магма поднимается к поверхности.'],['кратер','Кратер','Чашеобразная впадина на вершине вулкана, откуда выходят лава, газы и пепел.'],['конус','Вулканический конус','Гора из застывшей лавы и слоёв пепла, наросших при извержениях.'],['лава','Лава','Магма, излившаяся на поверхность (газы из неё ушли). Температура — около 1000 °C.'],['пепел','Пепел и газы','Мелкие (до 2 мм) частицы лавы и пар. Пепел может засыпать целые города, как Помпеи.'],['бок','Боковой кратер','Дополнительный канал сбоку от главного жерла.']];
function figVolcano(o){o=o||{};const hl=o.hl;const H=k=>hl===k;let s='';
 s+=RECT(0,150,320,80,{f:'var(--warn)',fo:0.2})+LN(0,150,320,150,{sw:1.5});
 s+=PG([[60,150],[140,58],[180,58],[260,150]],{f:'var(--warn)',fo:H('конус')?0.75:0.45,s:'var(--fig)',sw:1.4});
 [[80,150,120,92],[110,150,138,110],[200,150,182,92],[230,150,192,120]].forEach(a=>{s+=LN(a[0],a[1],a[2],a[3],{sw:0.8,c:'var(--fig)',op:0.5});});
 s+=PATH('M140,58 Q160,72 180,58',{f:'var(--card)',fo:1,s:'var(--fig)',sw:1.2})+(H('кратер')?PATH('M140,58 Q160,72 180,58 Z',{f:'var(--hl)',fo:0.9}):'');
 s+=`<ellipse cx="160" cy="205" rx="70" ry="18" fill="var(--bad)" fill-opacity="${H('очаг')?0.95:0.6}" stroke="var(--fig)"/>`;
 s+=PATH('M154,190 L156,66 L164,66 L166,190 Z',{f:'var(--bad)',fo:H('жерло')?0.95:0.6,s:'var(--fig)',sw:1});
 s+=PATH('M160,140 L206,110 L210,114 L166,148 Z',{f:'var(--bad)',fo:H('бок')?0.95:0.5,s:'var(--fig)',sw:1})+CIR(208,112,4,{f:'var(--bad)',fo:H('бок')?0.95:0.6});
 if(o.erupt){s+=PATH('M150,62 C130,80 110,100 96,140 L104,141 C120,104 140,84 156,66 Z',{f:'var(--bad)',fo:H('лава')?0.95:0.75})+PATH('M170,62 C190,90 214,120 226,146 L218,147 C204,120 184,92 164,66 Z',{f:'var(--bad)',fo:H('лава')?0.95:0.75});
   [[160,30,22],[136,22,15],[186,20,17],[160,6,13],[208,10,10]].forEach(c=>{s+=CIR(c[0],c[1],c[2],{f:'var(--muted)',fo:H('пепел')?0.85:0.45});});
   [[120,40],[200,36],[106,62],[220,58]].forEach(p=>{s+=CIR(p[0],p[1],3.5,{f:'var(--fig)'});});}
 if(o.labels!==false){const L=[['очаг',160,224,'магматический очаг'],['жерло',172,170,'жерло'],['кратер',188,50,'кратер'],['конус',66,128,'конус'],['бок',216,104,'боковой кратер']];if(o.erupt)L.push(['лава',84,96,'лава'],['пепел',236,24,'пепел, газы']);
   L.forEach(([k,x,y,t])=>{s+=TX(x,y,t,{fs:12,a:k==='очаг'?'middle':k==='конус'||k==='лава'?'end':'start',halo:3,c:H(k)?'var(--bad)':'var(--ink)'});});}
 if(o.marks)o.marks.forEach(([k,L,i])=>{const P={очаг:[160,205],жерло:[160,160],кратер:[160,50],конус:[96,120],бок:[214,104]}[k];s+=MARK(P[0],P[1],L,i);});
 return SV(320,232,s,'Вулкан в разрезе',o.wd||320);}
/* plate boundary scenes; t 0..1 */
function plateScene(type,t){let s='';const W=320,sea=58;
 const arrow=(x,y,dir)=>ARR(x,y,x+dir*36,y,{c:'var(--ink)',sw:2.5,hs:10});
 if(type==='cc'){const h=10+80*t;s+=RECT(0,150,W,40,{f:'var(--warn)',fo:0.35});
   s+=PG([[0,110],[110,110],[140,110-h*0.7],[160,110-h],[180,110-h*0.75],[210,110],[320,110],[320,150],[210,150],[160,150+h*0.5],[110,150],[0,150]],{f:'var(--hl)',fo:0.55,s:'var(--fig)',sw:1.2});
   s+=LN(160,112-h*0.6,160,148+h*0.4,{c:'var(--bad)',sw:1.4,dash:'4 3'});
   s+=arrow(20,130,1)+arrow(300,130,-1)+TX(60,104,'материковая',{fs:11})+TX(262,104,'материковая',{fs:11});
   if(t>0.3)s+=TX(160,104-h-6,'горы растут ⛰',{fs:12,c:'var(--bad)'});s+=TX(160,186,'мантия',{fs:11,c:'var(--muted)'});}
 if(type==='oc'){s+=RECT(0,152,W,40,{f:'var(--warn)',fo:0.3});
   s+=PG([[0,58],[186,58],[170,94],[166,96],[150,88],[0,88]],{f:WATER,fo:0.3});
   s+=PG([[0,88],[150,88],[166,96],[215,150],[205,160],[160,104],[146,100],[0,100]],{f:'var(--fig)',fo:0.45,s:'var(--fig)',sw:1});
   s+=PG([[186,58],[200,50],[320,46],[320,150],[219,150],[170,94]],{f:'var(--hl)',fo:0.5,s:'var(--fig)',sw:1.2});
   if(t>0.25){const vh=8+16*t;s+=PATH(`M206,140 Q232,100 252,${r2(48-vh+4)}`,{s:'var(--bad)',sw:2.5,dash:'3 3'})+PG([[236,48.5],[252,48-vh],[268,48]],{f:'var(--warn)',fo:0.85,s:'var(--fig)',sw:1})+PATH(`M252,${r2(48-vh)} Q258,${r2(36-vh)} 252,${r2(26-vh)}`,{s:'var(--muted)',sw:3});}
   s+=TX(120,76,'жёлоб →',{fs:11.5,c:'var(--accent-ink)',halo:2})+arrow(14,94,1)+TX(70,118,'океаническая плита',{fs:11})+TX(282,104,'материковая',{fs:11})+TX(282,117,'плита',{fs:11});
   [[190,116],[200,128]].forEach(p=>{s+=TX(p[0],p[1],'✶',{fs:14,c:'var(--bad)'});});s+=TX(80,180,'мантия',{fs:11,c:'var(--muted)'});}
 if(type==='do'){const g=6+40*t;s+=RECT(0,0,W,sea,{f:'var(--card)'})+RECT(0,sea,W,40,{f:WATER,fo:0.3});
   s+=PG([[0,98],[160-g,98],[160-g,140],[0,140]],{f:'var(--fig)',fo:0.4,s:'var(--fig)',sw:1})+PG([[160+g,98],[320,98],[320,140],[160+g,140]],{f:'var(--fig)',fo:0.4,s:'var(--fig)',sw:1});
   s+=PG([[160-g,140],[160-g,98],[160-g*0.5,86-12*t],[160,80-16*t],[160+g*0.5,86-12*t],[160+g,98],[160+g,140]],{f:'var(--bad)',fo:0.55,s:'var(--fig)',sw:1});
   s+=ARR(160,170,160,124,{c:'var(--bad)',sw:2.5})+TX(172,172,'магма поднимается',{fs:11,a:'start',c:'var(--bad)'});
   s+=arrow(110,120,-1)+arrow(210,120,1)+TX(160,74-16*t,'срединно-океанический хребет',{fs:11.5,halo:2});s+=RECT(0,150,W,40,{f:'var(--warn)',fo:0.3});}
 if(type==='dc'){const g=4+30*t,dep=12+38*t;s+=RECT(0,150,W,40,{f:'var(--warn)',fo:0.3});
   s+=PG([[0,70],[160-g-20,70],[160-g,70+dep],[160+g,70+dep],[160+g+20,70],[320,70],[320,150],[0,150]],{f:'var(--hl)',fo:0.5,s:'var(--fig)',sw:1.2});
   s+=LN(160-g-20,70,160-g,150,{c:'var(--bad)',sw:1.4,dash:'4 3'})+LN(160+g+20,70,160+g,150,{c:'var(--bad)',sw:1.4,dash:'4 3'});
   if(t>0.4)s+=RECT(160-g+2,70+dep-10,2*g-4,10,{f:WATER,fo:0.6});
   s+=arrow(60,110,-1)+arrow(260,110,1)+TX(160,58,t>0.4?'рифт: глубокая долина, озеро':'материк трескается',{fs:12,c:'var(--bad)'});}
 return SV(320,192,s,'Граница литосферных плит',320);}
const SCENE={cc:['Материк + материк: сталкиваются','Две материковые плиты давят друг на друга, кора сминается в складки и <b>поднимаются высокие горы</b>. Пример: Индийская плита врезалась в Евразийскую — выросли <b>Гималаи</b>. Растут они до сих пор!'],
 oc:['Океан ныряет под материк','Тяжёлая океаническая плита <b>подныривает</b> под материковую. Там, где она уходит вниз, — <b>глубоководный жёлоб</b>; на краю материка встают <b>горы</b> и <b>вулканы</b>, часто трясёт. Пример: <b>Анды</b> и Перуанско-Чилийский жёлоб, Тихоокеанское огненное кольцо.'],
 do:['Расходятся под океаном','Плиты <b>расходятся</b>, в трещину поднимается магма, застывает и наращивает дно. Так растёт <b>срединно-океанический хребет</b>. Его вершины выходят из воды островами — например, <b>Исландия</b>.'],
 dc:['Материк раскалывается','Материк трескается, середина проседает — образуется <b>рифт</b>: длинная глубокая долина, часто с озёрами. Пример: Восточно-Африканские разломы; на месте глубокого разлома — <b>озеро Байкал</b>.']};
/* absolute & relative height */
function figAbsRel(o){o=o||{};const foot=o.foot!=null?o.foot:120,top=o.top!=null?o.top:170;const sc=Math.min(0.6,110/Math.max(top,1));const base=170,Y=h=>base-h*sc;let s='';
 s+=RECT(0,base,320,20,{f:WATER,fo:0.35})+TX(30,base+14,'море: 0 м',{fs:11,a:'start',c:'var(--accent-ink)'});
 s+=PATH(`M0,${base} L40,${Y(foot)} L120,${Y(foot)} Q170,${Y(top)-8} 210,${Y(foot)} L320,${Y(foot)} L320,${base} Z`,{f:'var(--ok)',fo:0.3,s:'var(--fig)',sw:1.4});
 const tx=165;s+=CIR(tx,Y(top)+2,3.5,{f:'var(--bad)'})+CIR(120,Y(foot),3.5,{f:'var(--fig)'});
 s+=LN(0,Y(foot),320,Y(foot),{dash:'4 4',sw:0.8,c:'var(--muted)'});
 s+=ARR(236,base,236,Y(top)+3,{c:'var(--bad)',sw:1.6,hs:7})+ARR(236,Y(top)+3,236,base,{c:'var(--bad)',sw:1.6,hs:7})+LN(tx,Y(top)+2,242,Y(top)+2,{dash:'3 3',sw:0.8});
 s+=TX(242,(base+Y(top))/2+18,o.qa?'?':'абсолютная',{fs:11,a:'start',c:'var(--bad)'})+TX(242,(base+Y(top))/2+31,o.qa?'':`${top} м`,{fs:11,a:'start',c:'var(--bad)'});
 s+=ARR(tx,Y(foot),tx,Y(top)+6,{c:'var(--accent-ink)',sw:1.6,hs:7})+TX(tx-5,(Y(foot)+Y(top))/2+8,o.qr?'?':'относительная',{fs:11,a:'end',c:'var(--accent-ink)',halo:3})+(o.qr?'':TX(tx-5,(Y(foot)+Y(top))/2+21,(top-foot)+' м',{fs:11,a:'end',c:'var(--accent-ink)',halo:3}));
 s+=TX(112,Y(foot)+15,`подножие ${o.qf?'?':foot+' м'}`,{fs:11,a:'end',halo:2})+TX(tx,Y(top)-8,`вершина ${o.qa?'?':top+' м'}`,{fs:11.5,halo:2});
 return SV(320,192,s,'Абсолютная и относительная высота',320);}
/* hypsometric scale bar */
const figScale=(()=>{let s='';const items=[['ниже 0 м','впадины (ниже уровня моря)',HYPS[0]],['0–200 м','низменности',HYPS[1]],['200–500 м','возвышенности',HYPS[2]],['500–1000 м','плоскогорья, низкие горы',HYPS[3]],['1000–2500 м','средневысотные горы',HYPS[4]],['2500–5000 м','высокие горы',HYPS[5]],['выше 5000 м','высочайшие горы',HYPS[6]]];
 items.slice().reverse().forEach(([h,n,c],i)=>{const y=6+i*22;s+=RECT(6,y,40,20,{f:c[3],fo:c[4],s:'var(--fig)',sw:0.6})+TX(54,y+14,h,{fs:11.5,a:'start'})+TX(140,y+14,n,{fs:11.5,a:'start',wt:500});});
 return SV(320,162,s,'Шкала высот',300);})();
/* plain/mountain profile */
const figPlainMt=(()=>{let s=RECT(0,150,340,14,{f:WATER,fo:0.35});
 s+=PATH('M0,150 L0,136 Q30,130 60,134 Q90,128 120,132 L120,150 Z',{f:'var(--ok)',fo:0.45,s:'var(--fig)'})+TX(60,124,'низменность',{fs:11});
 s+=PATH('M120,150 L120,132 Q140,108 160,112 Q180,104 200,110 L200,150 Z',{f:'var(--hl)',fo:0.5,s:'var(--fig)'})+TX(160,100,'возвышенность',{fs:11});
 s+=PATH('M200,150 L200,110 L222,96 L234,40 L246,74 L262,22 L280,64 L296,52 L312,100 L340,112 L340,150 Z',{f:'var(--warn)',fo:0.6,s:'var(--fig)'})+TX(270,14,'горы',{fs:11});
 s+=LN(4,150,4,40,{sw:1})+TX(8,46,'высота',{fs:10,a:'start',c:'var(--muted)'});
 return SV(340,166,s,'Равнины и горы',340);})();
/* small landforms icons */
const figForms=(()=>{let s='';
 s+=PATH('M10,60 L40,60 L52,96 L68,96 L80,60 L110,60',{s:'var(--warn)',sw:2.5})+PATH('M52,96 L68,96',{s:WATER,sw:4})+TX(60,116,'каньон',{fs:11.5})+TX(60,128,'(река)',{fs:9.5,wt:500,c:'var(--muted)'});
 s+=PATH('M120,96 Q150,40 180,96 Q164,74 150,72 Q136,74 120,96 Z',{f:'var(--hl)',fo:0.6,s:'var(--fig)'})+TX(150,116,'бархан',{fs:11.5})+TX(150,128,'(ветер)',{fs:9.5,wt:500,c:'var(--muted)'});
 s+=PATH('M200,60 L222,60 L236,92 L246,92 L258,60 L280,60',{s:'var(--ok)',sw:2.5})+TX(240,116,'овраг',{fs:11.5})+TX(240,128,'(талые воды)',{fs:9.5,wt:500,c:'var(--muted)'});
 s+=PATH('M296,30 L330,96',{s:'var(--fig)',sw:2})+[[304,46],[312,60],[318,74],[324,86]].map(p=>CIR(p[0],p[1],4,{f:'var(--muted)'})).join('')+TX(312,116,'сель',{fs:11.5})+TX(304,128,'(грязь, камни)',{fs:9,wt:500,c:'var(--muted)'});
 return SV(340,134,s,'Формы рельефа',340);})();
/* map data for clickable tasks */
const PLAINS=[['Восточно-Европейская равнина',[42,55]],['Западно-Сибирская равнина',[75,61]],['Амазонская низменность',[-62,-4]],['Среднесибирское плоскогорье',[105,64]],['Прикаспийская низменность',[48,47.5]],['Великая Китайская равнина',[116,35]],['Индо-Гангская низменность',[82,26]],['плоскогорье Декан',[77,17]]];
const midOf=a=>a[Math.floor(a.length/2)];
const reliefMap=(o)=>worldMap(Object.assign({mts:true,mtW:3.5,landOp:0.25},o));
const VOLC=[['Ключевская Сопка',[160.6,56.1],'Евразия, полуостров Камчатка (Россия)'],['Везувий',[14.4,40.8],'Италия, Европа'],['Этна',[15,37.8],'остров Сицилия, Италия'],['Фудзияма',[138.7,35.4],'Япония'],['Килиманджаро',[37.4,-3.1],'Африка'],['Котопахи',[-78.4,-0.7],'Анды, Южная Америка'],['Кракатау',[105.4,-6.1],'Индонезия'],['Гекла',[-19.7,64],'Исландия']];

/* ---------------- theory ---------------- */
const theory=[
{title:'Земная кора движется',lvl:0,html:`
<p class="hook">В Roblox есть игра «Natural Disaster Survival»: то землетрясение, то извержение вулкана, то цунами. А теперь сюрприз: в настоящей жизни всё это делает одна и та же сила — <b>движение земной коры</b>. Разберёмся, как она работает.</p>
<p>Земная кора не стоит на месте. Её большие блоки (плиты) двигаются. Иногда — так медленно, что за всю жизнь не заметишь. Иногда — за секунды (это землетрясение).</p>
${RULE('Движения земной коры','По направлению: <b>вертикальные</b> (вверх-вниз: поднятия и опускания суши) и <b>горизонтальные</b> (в стороны: движение литосферных плит). Обычно они идут одновременно.')}
<p>Пример вертикальных движений: Скандинавский полуостров поднимается примерно на <b>1 см в год</b>, а берега Северного моря и город Венеция понемногу опускаются.</p>
<p>Когда кора движется, в ней возникают <b>сжатия</b> и <b>растяжения</b>. Слои горных пород сминаются в <b>складки</b> или трескаются — получаются <b>разломы</b>, и огромные глыбы сдвигаются друг относительно друга.</p>
${FIG(figLayersMove,'Рис. Как могут лежать слои горных пород')}
${STEPS('Пример 1. Скандинавия поднимается на 1 см в год. На сколько она поднимется за 100 лет?',['Каждый год — 1 см.','100 лет · 1 см = 100 см.','100 см = <b>1 м</b>. Медленно, но за тысячи лет — десятки метров!'])}
${STEPS('Пример 2. Слои пород изогнуты волной. Что произошло?',['Изначально слои лежали ровно (горизонтально) — так оседают осадки.','Их сдавило с боков — они смялись.','Это <b>складки</b>.'])}
${FACT('Озеро Байкал образовалось на месте глубокого разлома земной коры. Поэтому оно такое глубокое — 1642 м, самое глубокое озеро мира.')}
${CHK([['Поднятие суши — какое это движение: вертикальное или горизонтальное?','Вертикальное (вверх).'],['Что образуется, если слои пород сдавить с боков?','Складки.']])}
${REM('Вертикальные — ↕ поднятия и опускания. Горизонтальные — ↔ движение плит. Сжатие → складки, разрыв → разлом.','«Складки — как скатерть, которую сдвинули руками; разлом — как треснувшая плитка шоколада».')}`},

{title:'Землетрясения',lvl:1,html:`
${RULE('Землетрясение','<b>Землетрясение</b> — резкие подземные толчки и колебания земной поверхности. Их вызывают разрыв и сдвиг горных пород в земной коре или верхней мантии.<br><b>Очаг</b> — место под землёй, где произошёл разрыв.<br><b>Эпицентр</b> — точка на поверхности <b>прямо над очагом</b> (греч. «эпи» — над). Там разрушения сильнее всего.')}
${FIG(figQuake,'Рис. Очаг и эпицентр землетрясения')}
<p>От очага во все стороны, как круги по воде от брошенного камня, расходятся колебания — <b>сейсмические волны</b>. Их записывает прибор <b>сейсмограф</b>. Чем глубже очаг, тем на большую площадь распространяется землетрясение.</p>
<p><b>Где трясёт чаще?</b> На <b>границах литосферных плит</b> и в местах крупных разломов — в горах и в океанах. Страны с частыми землетрясениями: Япония, Китай, Филиппины, Индонезия, Иран, Турция, Чили, Перу, Мексика, США, Россия (Камчатка, Курилы, Кавказ, Байкал).</p>
${STEPS('Пример 1. Очаг на глубине 20 км. Где эпицентр?',['Эпицентр — всегда на поверхности.','Он находится точно над очагом.','Значит, на поверхности, в 20 км <b>над</b> очагом.'])}
${STEPS('Пример 2. Где землетрясение вероятнее: в Мехико или в Санкт-Петербурге?',['Мехико стоит у границы плит Тихого океана (огненное кольцо).','Санкт-Петербург — в центре огромной Евразийской плиты, на устойчивой равнине.','Вероятнее — в <b>Мехико</b>.'])}
${CHK([['Как называется место на поверхности, где землетрясение сильнее всего?','Эпицентр.'],['Каким прибором записывают землетрясения?','Сейсмографом.']])}
${REM('Очаг — ПОД землёй, эпицентр — НАД очагом, на поверхности.','«ЭПИ — НАД, как эпиграф стоит НАД стихотворением».')}`},

{title:'Вулканы',lvl:2,html:`
<p>По трещинам (чаще всего на границах плит) раскалённая магма с газами пробивается наверх. Происходит <b>извержение</b>. Слово «вулкан» — от имени древнеримского бога огня Вулкана.</p>
${RULE('Вулкан','<b>Вулкан</b> — обычно конусообразная гора из застывшей лавы и пепла, с кратером на вершине.<br><b>Магма</b> — расплав в глубине. <b>Лава</b> — магма, вылившаяся на поверхность (газы из неё ушли).<br><b>Действующие</b> вулканы извергались на памяти людей, <b>потухшие</b> — нет сведений об извержениях.')}
<div class="widget" id="w-volc"></div>
${STEPS('Пример 1. Чем лава отличается от магмы?',['Обе — расплавленные горные породы.','Магма — под землёй, в ней много газов.','Лава — на поверхности, газы из неё ушли в воздух.'])}
${STEPS('Пример 2. Эльбрус — действующий вулкан?',['Извержений Эльбруса люди не помнят — записей нет.','Значит, он <b>потухший</b>. А Ключевская Сопка на Камчатке извергается часто — она <b>действующая</b>.'])}
<p>Больше всего вулканов — на берегах и островах Тихого океана. Они образуют <b>Тихоокеанское огненное (вулканическое) кольцо</b>. Рядом с вулканами бывают <b>гейзеры</b> — горячие источники, которые время от времени выбрасывают струю горячей воды и пара (Камчатка, Исландия).</p>
${FACT('В 79 году н. э. извержение Везувия засыпало пеплом древнеримский город Помпеи. А почвы у вулканов очень плодородные — поэтому люди, несмотря на опасность, там живут.')}
${CHK([['Как называется канал, по которому магма поднимается?','Жерло.'],['Что такое гейзер?','Горячий источник, который периодически выбрасывает струю горячей воды и пара.']])}
${REM('Очаг → жерло → кратер. Магма внизу, лава наверху. Действующий — извергался на памяти людей.','«МАГМА — в Глубине (Г), ЛАВА — Льётся по склону (Л)».')}`},

{title:'Что бывает на границах плит',lvl:3,html:`
<p>Почти всё интересное в рельефе — горы, вулканы, глубоководные жёлоба, хребты на дне — рождается на <b>границах литосферных плит</b>. Плиты там либо <b>сходятся</b>, либо <b>расходятся</b>.</p>
<div class="widget" id="w-plates"></div>
${RULE('Главное правило','<b>Сходятся</b> (сталкиваются) → горы, глубоководные жёлоба, вулканы, землетрясения.<br><b>Расходятся</b> → разломы, рифты; на дне океана — срединно-океанические хребты, поднимается магма.')}
${STEPS('Пример 1. Почему Гималаи — самые высокие горы?',['Индийская плита много миллионов лет давит на Евразийскую.','Обе плиты материковые — ни одна не ныряет вниз, поэтому кора сминается вверх.','Так выросли Гималаи с Джомолунгмой (8848 м), и растут до сих пор.'])}
${STEPS('Пример 2. Почему вдоль западного берега Южной Америки и горы, и вулканы, и глубокий жёлоб?',['Океаническая плита Наска подныривает под Южно-Американскую.','На месте «ныряния» — жёлоб; кора материка сминается — <b>Анды</b>; плавящаяся плита даёт магму — вулканы.'])}
${CHK([['Что образуется, когда расходятся плиты на дне океана?','Срединно-океанический хребет (поднимается магма).'],['Какие горы выросли при столкновении двух материковых плит?','Гималаи (и Альпы).']])}
${REM('Сходятся → горы и жёлоба. Расходятся → рифты и хребты на дне.','«Столкнулись машины — капот смялся гармошкой (горы). Разъехались — между ними щель (рифт)».')}`},

{title:'Абсолютная и относительная высота',lvl:4,html:`
<p>Чтобы сравнивать горы и равнины, нужно договориться, откуда мерить высоту.</p>
${FIG(figAbsRel())}
${RULE('Две высоты','<b>Абсолютная высота</b> — на сколько точка выше <b>уровня моря</b> (уровень моря = 0 м). В России её отсчитывают от уровня Балтийского моря (Кронштадтский футшток).<br><b>Относительная высота</b> — на сколько одна точка выше <b>другой</b> (например, вершина холма — над его подножием).')}
${RULE('Формула','относительная высота = абсолютная высота вершины − абсолютная высота подножия')}
${STEPS('Пример 1. Подножие холма — 120 м, вершина — 170 м. Найди относительную высоту.',['Относительная = вершина − подножие.','170 − 120 = <b>50 м</b>.'])}
${STEPS('Пример 2. Подножие горы на высоте 800 м, сама гора над подножием поднимается на 1500 м. Какова абсолютная высота вершины?',['Абсолютная вершины = подножие + относительная.','800 + 1500 = <b>2300 м</b>.'])}
${STEPS('Пример 3. Может ли абсолютная высота быть отрицательной?',['Да — если место на суше ниже уровня моря.','Например, часть Прикаспийской низменности — около −28 м, берег Мёртвого моря — около −430 м.'])}
${ERR('Частая ошибка','Складывать вместо вычитания: «относительная = 170 + 120». Нет! Относительная — это РАЗНИЦА: насколько вершина выше подножия.')}
${CHK([['Центр Санкт-Петербурга — 3 м над уровнем Балтийского моря. Это абсолютная или относительная высота?','Абсолютная (от уровня моря).'],['Вершина — 950 м, подножие — 400 м. Относительная высота?','950 − 400 = 550 м.']])}
${REM('Абсолютная — от МОРЯ. Относительная — от ПОДНОЖИЯ (разница).','«Абсолютная — от Абсолютного нуля, моря. Относительная — Относительно соседа».')}`},

{title:'Равнины',lvl:5,html:`
${RULE('Равнина','<b>Равнины</b> — обширные ровные или пологие участки земной поверхности, где высоты меняются не больше чем на 200 м. Они занимают около <b>60%</b> суши.')}
${RULE('Равнины по абсолютной высоте','<b>Низменности</b> — до 200 м (на карте зелёные). Участки ниже уровня моря — <b>впадины</b>.<br><b>Возвышенности</b> — от 200 до 500 м (жёлтые).<br><b>Плоскогорья</b> — выше 500 м (светло-коричневые).')}
${FIG(figScale,'Шкала высот физической карты')}
${FIG(figPlainMt)}
<p><b>Как образуются равнины?</b> Внешние силы разрушают горы, вода, ветер и ледники переносят обломки и складывают их в понижениях. Понижения заполняются осадочными породами и выравниваются. Поэтому равнины — на <b>устойчивых</b> участках земной коры.</p>
${STEPS('Пример 1. Средняя высота равнины 150 м. Как она называется?',['150 меньше 200.','Значит, это <b>низменность</b> (например, Западно-Сибирская).'])}
${STEPS('Пример 2. Высота 350 м?',['350 больше 200, но меньше 500.','Это <b>возвышенность</b> (например, Среднерусская).'])}
${STEPS('Пример 3. Высота 700 м — это уже горы?',['Нет, если поверхность ровная (перепады меньше 200 м).','Ровная поверхность выше 500 м — <b>плоскогорье</b> (Среднесибирское, Декан).'])}
<p>Все равнины имеют уклон. Например, Западно-Сибирская равнина наклонена к Северному Ледовитому океану — туда текут Обь и Иртыш. Равнины — самые заселённые места Земли: здесь удобно пахать, строить города и дороги.</p>
${CHK([['Какой цвет на физической карте у низменностей?','Зелёный.'],['Какая равнина — одна из самых больших в мире и на ней стоит Москва?','Восточно-Европейская (Русская) равнина.']])}
${REM('До 200 — низменность, 200–500 — возвышенность, выше 500 — плоскогорье.','«Двести — пятьсот: Низко — Выше — Плоско-гора» (Н-В-П по алфавиту не идут, зато по высоте — да: зелёный, жёлтый, коричневый, как светофор наоборот).')}`},

{title:'Горы',lvl:6,html:`
${RULE('Горы','<b>Горы</b> — обширные участки суши, высоко поднятые над равнинами, с большими перепадами высот (от сотен метров до нескольких километров). Они занимают около <b>40%</b> суши и образуются на <b>подвижных</b> участках земной коры.')}
${RULE('Горы по абсолютной высоте (по учебнику)','<b>Низкие</b> — до 1000 м.<br><b>Средневысотные</b> — от 1000 до 2500 м (Скандинавские горы).<br><b>Высокие</b> — выше 2500 м (Альпы).<br><b>Высочайшие</b> — выше 5000 м (Гималаи с Джомолунгмой — 8848 м).')}
<p>Одиночные горы встречаются редко. Обычно это вытянутые <b>горные хребты</b>. Между ними — <b>межгорные долины</b>. Хребты и долины вместе образуют <b>горную страну</b>.</p>
<p>На Земле два гигантских горных пояса. В Западном полушарии вдоль Тихого океана тянутся <b>Кордильеры</b> и <b>Анды</b>. В Восточном — пояс через всю Евразию с запада на восток: <b>Альпы, Кавказ, Гималаи</b>.</p>
<div class="widget" id="w-height"></div>
${STEPS('Пример 1. Эльбрус — 5642 м. Какие это горы?',['5642 больше 5000.','Значит, Кавказ с Эльбрусом — <b>высочайшие</b> горы. Эльбрус — высшая точка России.'])}
${STEPS('Пример 2. Высшая точка Скандинавских гор — около 2469 м. Какие это горы?',['2469 — между 1000 и 2500.','<b>Средневысотные</b>.'])}
${CHK([['Какие горы имеют высоту выше 2500 м, но ниже 5000 м?','Высокие (например, Альпы).'],['Как называется понижение между двумя горными хребтами?','Межгорная долина.']])}
${REM('Горы: до 1000 — низкие, 1000–2500 — средние, 2500–5000 — высокие, выше 5000 — высочайшие.','Числа-«ступеньки»: 1000 → 2500 → 5000 (каждая следующая — примерно вдвое выше).')}`},

{title:'Горы и равнины на карте мира',lvl:7,html:`
<p>Теперь потренируемся находить главные горы и равнины. На карте горы — коричневые линии.</p>
${FIG(reliefMap({W:340,extra:P=>{let s='';Object.keys(MTS).forEach(k=>{const p=midOf(MTS[k]);const [x,y]=P.P(p);const short={'Большой Водораздельный хребет':'Б. Водораздельный','Уральские горы':'Урал','Скандинавские горы':'Скандинав.'}[k]||k;s+=TX(x+(k==='Анды'?-6:6),y+(k==='Альпы'?-6:4),short,{fs:8.5,a:k==='Анды'?'end':'start',halo:2});});return s;}}),'Главные горные системы')}
${TABLE(['Горы','Где','Высшая точка'],[
['Гималаи','Евразия (Азия)','Джомолунгма (Эверест), 8848 м — высочайшая вершина Земли'],
['Анды','Южная Америка, вдоль Тихого океана','Аконкагуа, около 6960 м'],
['Кордильеры','Северная Америка, вдоль Тихого океана','Денали (Мак-Кинли), около 6190 м'],
['Кавказ','между Чёрным и Каспийским морями','Эльбрус, 5642 м — высшая точка России и Европы'],
['Альпы','Европа','Монблан, около 4810 м'],
['Уральские горы','граница Европы и Азии','Народная, около 1895 м'],
['Скандинавские','север Европы','около 2469 м']])}
${TABLE(['Равнина','Где','Тип'],[
['Восточно-Европейская','Европа (Россия)','равнина, около 4 млн км²'],
['Западно-Сибирская','Азия (Россия)','низменность'],
['Амазонская','Южная Америка','низменность — самая большая на Земле'],
['Прикаспийская','у Каспийского моря','низменность, часть ниже уровня моря'],
['Среднесибирское','Азия (Россия)','плоскогорье'],
['Декан','полуостров Индостан','плоскогорье']])}
${STEPS('Пример. Как найти Анды?',['Анды — в Южной Америке.','Они тянутся вдоль её <b>западного</b> берега (у Тихого океана) с севера на юг.','Это самые длинные горы на суше — около 9000 км.'])}
${CHK([['Какие горы отделяют Европу от Азии?','Уральские.'],['Где находится Амазонская низменность?','В Южной Америке.']])}
${REM('Два пояса гор: «Тихоокеанский» (Кордильеры + Анды) и «Евразийский» (Альпы — Кавказ — Гималаи).','«Анды — Америка, Альпы — Европа»: А — А, Е — Е? Нет: «Анды Америку держат с запада, Альпы — сердце Европы».')}`},

{title:'Внешние силы лепят рельеф',lvl:8,html:`
<p>Внутренние силы поднимают горы, а внешние — вода, лёд, ветер, перепады температуры, живые организмы — их разрушают и «вырезают» мелкие формы рельефа.</p>
${RULE('Выветривание','<b>Выветривание</b> — разрушение и изменение горных пород под действием температуры, влаги, воздуха и живых организмов.')}
${FIG(figForms)}
${TABLE(['Форма','Кто сделал','Где'],[
['Каньон','река пропилила глубокую долину','горы (Большой каньон реки Колорадо)'],
['Овраг','талые и дождевые воды','равнины, распаханные склоны'],
['Бархан','ветер надул песок «полумесяцем»','пустыни'],
['Дюна','ветер надул песок','берега морей (Куршская коса)'],
['Сель','грязевой поток с камнями после ливня','горы'],
['Снежная лавина','снег срывается со склона','горы'],
['Коралловый риф','живые организмы — кораллы','тёплые моря (Большой Барьерный риф, около 2200 км)']])}
${STEPS('Пример 1. Кто создал бархан?',['Бархан — холм из песка в пустыне.','Песок переносит <b>ветер</b>.','Значит, это работа ветра — внешней силы.'])}
${STEPS('Пример 2. Почему горы со временем становятся ниже?',['Вода, лёд, мороз и ветер разрушают породы.','Обломки скатываются вниз и уносятся реками.','Через миллионы лет высокие горы превращаются в холмы и даже в равнины.'])}
${FACT('Даже животные лепят рельеф: бобровые плотины бывают длиной до 1 км, а термитники в саваннах — высотой до 15 м!')}
${CHK([['Какая форма рельефа образуется в горах из-за того, что река миллионы лет углубляет русло?','Каньон.']])}
${REM('Внешние силы: вода (каньон, овраг), ветер (бархан, дюна), лёд и снег (лавина, ледниковые холмы), живые организмы (рифы).')}`},

{title:'★ Олимпиадные идеи',lvl:9,html:`
${RULE('1. Ракушки на Эвересте','В горных породах на вершине Джомолунгмы находят окаменевших морских животных. Значит, эти породы когда-то были дном моря — его подняло столкновение плит!')}
${RULE('2. Цепочка высот','Абсолютная высота вершины = абсолютная высота подножия + относительная высота. Можно «шагать» вверх по ступенькам: от моря к подножию, от подножия к вершине.')}
${RULE('3. Сейсмическая волна','Волны землетрясения бегут в земной коре со скоростью несколько километров в секунду. Время прихода = расстояние : скорость. По разнице времени прихода разных волн учёные узнают, где был очаг.')}
${RULE('4. Где ниже уровня моря?','На суше: впадина Мёртвого моря (около −430 м), Прикаспийская низменность (около −28 м). Под водой: Марианский жёлоб — по учебнику 10 971 м.')}`},

{title:'Шпаргалка',lvl:0,html:TABLE(['Что','Главное'],[
['Движения коры','вертикальные (↕) и горизонтальные (↔); складки и разломы'],
['Землетрясение','очаг — под землёй, эпицентр — над очагом'],
['Вулкан','очаг → жерло → кратер; магма/лава; действующие/потухшие'],
['Границы плит','сходятся → горы, жёлоба, вулканы; расходятся → рифты, хребты'],
['Высота','абсолютная — от моря; относительная = вершина − подножие'],
['Равнины','до 200 — низменности, 200–500 — возвышенности, >500 — плоскогорья'],
['Горы','до 1000 — низкие, до 2500 — средние, до 5000 — высокие, >5000 — высочайшие']])}
];
const symbols={tab:'Термины',title:'Главные термины',rows:[
['Очаг','где разрыв','Место под землёй, откуда идут толчки','глубина 20 км'],
['Эпицентр','«над»','Точка на поверхности над очагом','там сильнее всего трясёт'],
['Жерло','канал','По нему магма идёт к кратеру','в центре вулкана'],
['Кратер','чаша','Впадина на вершине вулкана','из него вылетает пепел'],
['Абс. высота','от моря','Насколько точка выше уровня моря','Эльбрус 5642 м'],
['Отн. высота','разница','Вершина − подножие','170 − 120 = 50 м'],
['Низменность','до 200 м','Равнина, на карте зелёная','Западно-Сибирская'],
['Возвышенность','200–500 м','Равнина, на карте жёлтая','Среднерусская'],
['Плоскогорье','> 500 м','Равнина, светло-коричневая','Среднесибирское']
],after:REM('Сходятся плиты → горы. Абсолютная — от моря, относительная — разница.')};

/* ---------------- generators ---------------- */
/* L0 */
G(0,()=>CH('Какие бывают движения земной коры по направлению?','Вертикальные и горизонтальные',['Быстрые и медленные','Внутренние и внешние','Солёные и пресные'],{
 short:'Вертикальные (↕) и горизонтальные (↔).',explain:'По <b>направлению</b> движения коры бывают <b>вертикальные</b> (поднятия и опускания суши) и <b>горизонтальные</b> (движение плит в стороны). «Быстрые и медленные» — это деление по скорости, а «внутренние и внешние» — это силы.',
 explain2:'Направление — это «куда»: вверх-вниз (вертикально) или вбок (горизонтально).'}),{rule:true});
BANK(0,[
 {q:'Скандинавский полуостров поднимается примерно на 1 см в год. Это какое движение земной коры?',a:'Вертикальное',w:['Горизонтальное','Это не движение коры, а ветер','Землетрясение'],e:'Поднятие (вверх) — <b>вертикальное</b> движение.',e2:'Вертикаль — линия вверх-вниз, как столб. Поднятие — вверх.'},
 {q:'Что происходит со слоями горных пород, когда кору <b>сдавливает с боков</b>?',a:'Они сминаются в складки',w:['Они превращаются в воду','Они становятся ровнее','Они плавятся в магму'],e:'При сжатии слои <b>сминаются в складки</b> — как скатерть, если сдвинуть её руками с двух сторон.',e2:'Сожми с двух сторон стопку бумаги — она изогнётся волной. Это складки.'},
 {q:'Как называется трещина, по которой глыбы земной коры сдвинулись друг относительно друга?',a:'Разлом',w:['Складка','Кратер','Русло'],e:'Если кора не мнётся, а <b>трескается</b>, получается <b>разлом</b>; глыбы по нему сдвигаются.',e2:'Разлом — от слова «ломать». Как треснувшая плитка шоколада.'},
 {q:'Какое озеро образовалось на месте глубокого разлома земной коры?',a:'Байкал',w:['Каспийское','Ладожское','Онежское'],e:'<b>Байкал</b> лежит в огромном разломе — поэтому он самый глубокий в мире (1642 м).',e2:'Разлом — глубокая щель; если её заполнит вода, будет глубокое озеро. Самое глубокое — Байкал.'}]);
G(0,()=>{const v=pick([1,2,0.5]),y=pick([10,50,100,200,500,1000]);const cm=v*y;const ans=cm/100;
 return NUM(ans,{q:`Участок суши поднимается на ${N(v)} см в год. На сколько <b>метров</b> он поднимется за ${N(y)} лет?`,short:`${N(v)} · ${N(y)} = ${N(cm)} см = ${N(ans)} м.`,
  explain:`За ${N(y)} лет: ${M(`${N(v)} · ${N(y)} = ${N(cm)} см`)}. В 1 м — 100 см: ${M(`${N(cm)} : 100 = ${N(ans)} м`)}.`,explain2:`Каждый год — ${N(v)} см. Через 100 лет было бы ${N(v*100)} см = ${N(v)} м. А у нас ${N(y)} лет — это в ${N(y/100)} раз${y===100?'':' от ста'}: ${N(ans)} м.`});});

/* L1 */
G(1,()=>CH('Что такое <b>эпицентр</b> землетрясения?','Место на поверхности Земли прямо над очагом',['Место под землёй, где произошёл разрыв пород','Самая глубокая точка океана','Вершина вулкана'],{
 short:'Эпицентр — над очагом, на поверхности.',explain:'<b>Очаг</b> — место под землёй, где разорвались породы. <b>Эпицентр</b> — точка на поверхности <b>прямо над очагом</b> («эпи» — над). Там сильнее всего трясёт.',
 explain2:'Вспомни: эпиграф стоит НАД текстом. Эпицентр — НАД очагом.'}),{rule:true});
BANK(1,[
 {q:'Где на Земле чаще всего бывают землетрясения?',a:'На границах литосферных плит',w:['В центре огромных равнин','Только в пустынях','Только на полюсах'],e:'Землетрясения — от разрывов и сдвигов коры. Чаще всего это происходит на <b>границах плит</b>, в горах и в океанах.',e2:'Посмотри на карту землетрясений: точки выстраиваются в линии — это и есть границы плит.'},
 {q:'В каком из этих городов землетрясение наиболее вероятно?',a:'Мехико',w:['Санкт-Петербург','Париж','Москва'],e:'<b>Мехико</b> — рядом с границей плит Тихого океана. Санкт-Петербург, Москва и Париж — на устойчивых равнинах в центре Евразийской плиты.',e2:'Ищем город у Тихоокеанского огненного кольца. Из списка это Мехико.'},
 {q:'Каким прибором записывают колебания земной коры?',a:'Сейсмографом',w:['Барометром','Термометром','Компасом'],e:'Колебания записывает <b>сейсмограф</b> («сейсмос» — колебание). Барометр — давление, термометр — температура, компас — стороны горизонта.',e2:'«Сейсмо» — трясти, «граф» — писать: «пишущий тряску».'},
 {q:'В какой из этих стран землетрясения бывают часто?',a:'Япония',w:['Финляндия','Польша','Белоруссия'],e:'<b>Япония</b> стоит там, где сходятся несколько плит. Финляндия, Польша, Белоруссия — на спокойной части Евразийской плиты.',e2:'Япония — острова у Тихого океана, на огненном кольце. Там часто трясёт, поэтому строят сейсмостойкие дома.'},
 {q:'Что из перечисленного правильно про глубину очага?',a:'Чем глубже очаг, тем на бо́льшую площадь распространяется землетрясение',w:['Очаг всегда на поверхности','Чем глубже очаг, тем меньше площадь','Очаг бывает только в ядре'],e:'По учебнику: <b>чем глубже очаг, тем на бо́льшую площадь</b> распространяется землетрясение (волны расходятся шире).',e2:'Как свет фонарика: чем дальше от стены фонарик, тем шире пятно.'}]);
G(1,()=>{const which=pick(['очаг','эпицентр']);
 const pic=figQuake.replace('>очаг<','>?<').replace('>эпицентр — прямо над очагом<','>?<');
 return CH(`На рисунке точка <b>${which==='очаг'?'под землёй, откуда идут круги-волны':'на поверхности прямо над ней'}</b>. Как она называется?`,which==='очаг'?'Очаг':'Эпицентр',['Очаг','Эпицентр','Кратер','Жерло'],{pic,
  short:which==='очаг'?'Под землёй — очаг.':'Над очагом на поверхности — эпицентр.',explain:'Под землёй, где разорвались породы и откуда расходятся волны, — <b>очаг</b>. Точка на поверхности прямо над ним — <b>эпицентр</b>. Кратер и жерло — части вулкана.',
  explain2:'Очаг — как печка-очаг внизу, откуда всё идёт. Эпицентр — «над центром».'});});

/* L2 */
G(2,()=>CH('Чем <b>лава</b> отличается от <b>магмы</b>?','Лава — это магма, излившаяся на поверхность (газы из неё ушли)',['Лава холодная, а магма горячая','Лава — это пепел, а магма — пар','Ничем, это одно и то же'],{
 short:'Магма — внутри, лава — снаружи.',explain:'<b>Магма</b> — расплав в глубине Земли, насыщенный газами. Когда она изливается на поверхность и газы уходят в воздух, её называют <b>лавой</b>. Лава горячая — около 1000 °C.',
 explain2:'«МАГМА — в Глубине, ЛАВА — Льётся по склону».'}),{rule:true});
G(2,()=>{const keys=['очаг','жерло','кратер','конус','бок'];const nm={очаг:'магматический очаг',жерло:'жерло',кратер:'кратер',конус:'вулканический конус',бок:'боковой кратер'};const tg=pick(keys);const four=shuffle([tg,...sample(keys.filter(k=>k!==tg),3)]);
 return CHF(`🌋 Нажми на букву: где у вулкана <b>${nm[tg]}</b>?`,four.map((k,i)=>'Буква '+LET[i]),four.indexOf(tg),{pic:figVolcano({labels:false,marks:four.map((k,i)=>[k,LET[i],i])}),onShow:CLICKMAP,
  short:`${cap(nm[tg])} — буква ${LET[four.indexOf(tg)]}.`,explain:`Снизу вверх: <b>магматический очаг</b> (глубоко под землёй) → по <b>жерлу</b> магма поднимается → выходит в <b>кратер</b> на вершине. Гора вокруг — <b>конус</b> из лавы и пепла. Канал сбоку — <b>боковой кратер</b>. ${cap(nm[tg])} — буква <b>${LET[four.indexOf(tg)]}</b>.`,
  explain2:'Представь бутылку газировки: внизу — запас (очаг), горлышко-трубка — жерло, отверстие сверху — кратер, сама бутылка — конус.'});});
BANK(2,[
 {q:'Как называют вулкан, извержений которого люди не помнят и записей о них нет?',a:'Потухший',w:['Действующий','Подводный','Грязевой'],e:'<b>Потухший</b> — сведений об извержениях нет (например, Эльбрус). <b>Действующий</b> — извергался на памяти людей (Ключевская Сопка, Этна).',e2:'Потух — значит, «огонь погас» давно-давно.'},
 {q:'Что такое <b>гейзер</b>?',a:'Горячий источник, который время от времени выбрасывает струю горячей воды и пара',w:['Вулкан под водой','Трещина в леднике','Песчаный холм в пустыне'],e:'<b>Гейзер</b> — фонтанирующий горячий источник у вулканов (Камчатка, Исландия). Струя бывает высотой в десятки метров.',e2:'Как чайник, который «стреляет» паром, только природный и огромный.'},
 {q:'Где на Земле больше всего вулканов?',a:'На берегах и островах Тихого океана (огненное кольцо)',w:['В центре Африки','В Сахаре','На Восточно-Европейской равнине'],e:'Вулканы — на границах плит. Вокруг <b>Тихого океана</b> их так много, что получилось <b>Тихоокеанское огненное кольцо</b>.',e2:'«Огненное кольцо» обнимает Тихий океан: Камчатка, Япония, Индонезия, Анды, Кордильеры.'},
 {q:'Какой древнеримский город засыпало пеплом при извержении Везувия?',a:'Помпеи',w:['Рим','Афины','Венеция'],e:'В 79 году н. э. Везувий засыпал горячим пеплом город <b>Помпеи</b>. Сейчас его раскопали — это город-музей.',e2:'Помпеи — у подножия Везувия, рядом с Неаполем.'},
 {q:'Откуда слово «вулкан»?',a:'От имени древнеримского бога огня и кузнечного дела Вулкана',w:['От латинского «вода»','От имени путешественника','От слова «волна»'],e:'Древние римляне называли <b>Вулканом</b> бога огня и кузнечного дела.',e2:'Римляне думали, что внутри горы работает кузница бога Вулкана — отсюда огонь и дым.'},
 {q:'Какой вулкан — самый высокий действующий вулкан Евразии (Камчатка)?',a:'Ключевская Сопка',w:['Везувий','Эльбрус','Фудзияма'],e:'<b>Ключевская Сопка</b> на Камчатке — около 4750 м, часто извергается. Эльбрус выше, но он потухший.',e2:'Ищем вулкан на Камчатке — это Ключевская Сопка.'}]);
G(2,()=>{const v=sample(VOLC,4);const tg=pick(v);
 return CHF(`🗺 Где на карте вулкан <b>${tg[0]}</b>? Нажми на букву.`,v.map((x,i)=>'Буква '+LET[i]),v.indexOf(tg),{pic:worldMap({W:340,box:[-180,180,80,-50],marks:v.map((x,i)=>({lon:x[1][0],lat:x[1][1],L:LET[i],i}))}),onShow:CLICKMAP,
  short:`${tg[0]} — ${tg[2]}.`,explain:`${tg[0]} находится: <b>${tg[2]}</b> — это буква ${LET[v.indexOf(tg)]}. ${v.filter(x=>x!==tg).map(x=>`${x[0]} — ${x[2]}`).join('; ')}.`,
  explain2:'Сначала вспомни материк или страну, а потом найди её на карте. Камчатка — крайний восток России; Италия — «сапожок» в Средиземном море; Япония — острова к востоку от Азии.'});});

/* L3 */
G(3,()=>CH('Что образуется, когда две литосферные плиты <b>сталкиваются</b>?','Горы (а у края океана — ещё жёлоба и вулканы)',['Срединно-океанический хребет','Рифт — глубокая трещина','Ничего не образуется'],{
 short:'Сходятся → горы, жёлоба, вулканы.',explain:'При <b>столкновении</b> кора сминается — растут <b>горы</b>. Если океаническая плита ныряет под материковую — ещё и <b>жёлоб</b> и <b>вулканы</b>. Рифты и срединно-океанические хребты — там, где плиты <b>расходятся</b>.',
 explain2:'Столкнулись две машины — капот смялся гармошкой. Это и есть горы.'}),{rule:true});
G(3,()=>{const it=pick([['Гималаи','Индийская плита столкнулась с Евразийской (материк + материк)','сходятся'],['Анды','плита Наска ныряет под Южно-Американскую','сходятся'],['Исландия','расходятся плиты на дне Атлантики, магма наращивает хребет','расходятся'],['Байкал','кора раскололась — глубокий разлом','расходятся'],['Альпы','Африканская плита давит на Евразийскую','сходятся'],['Срединно-Атлантический хребет','Американские плиты расходятся с Евразийской и Африканской','расходятся'],['Марианский жёлоб','Тихоокеанская плита ныряет под соседнюю','сходятся']]);
 return CH(`Как образовался объект «<b>${it[0]}</b>»: литосферные плиты здесь сходятся или расходятся?`,it[2]==='сходятся'?'Сходятся (сталкиваются)':'Расходятся',['Сходятся (сталкиваются)','Расходятся'],{
  short:`${it[0]}: ${it[1]}.`,explain:`${it[0]} — ${it[1]}. Значит, плиты <b>${it[2]}</b>. Правило: сходятся → горы, жёлоба, вулканы; расходятся → рифты, срединно-океанические хребты.`,
  explain2:it[2]==='сходятся'?'Горы и жёлоба — следы «аварии» плит: они давят друг на друга.':'Рифт, разлом, хребет на дне с магмой — следы того, что плиты разъезжаются и между ними появляется щель.'});});
BANK(3,[
 {q:'Почему у западного берега Южной Америки есть и высокие горы, и вулканы, и глубоководный жёлоб?',a:'Океаническая плита подныривает под материковую',w:['Там расходятся плиты','Там нет границы плит','Это сделал ветер'],e:'Плита Наска (океаническая) <b>ныряет</b> под Южно-Американскую: на месте ныряния — жёлоб, край материка сминается в <b>Анды</b>, а из глубины поднимается магма — <b>вулканы</b>.',e2:'Тяжёлая тонкая океаническая плита уходит вниз, как санки под сугроб, а сугроб (материк) поднимается.'},
 {q:'Что поднимается со дна океана там, где плиты расходятся?',a:'Магма — она застывает и наращивает срединно-океанический хребет',w:['Пресная вода','Песок из пустыни','Ледник'],e:'В щель между расходящимися плитами поднимается <b>магма</b>; застывая, она строит <b>срединно-океанический хребет</b>.',e2:'Щель внизу — горячая магма заполняет её, как клей заполняет трещину.'},
 {q:'Как называется длинная глубокая долина, которая образуется, когда материк раскалывается?',a:'Рифт',w:['Каньон','Бархан','Кратер'],e:'<b>Рифт</b> — провал между расходящимися блоками коры (Восточная Африка, Байкал). Каньон пропиливает река, бархан надувает ветер.',e2:'Рифт — «трещина-долина» от растяжения коры.'}]);

/* L4 — высоты */
G(4,()=>CH('Как найти <b>относительную</b> высоту холма?','Из абсолютной высоты вершины вычесть абсолютную высоту подножия',['Сложить высоту вершины и подножия','Это высота над уровнем моря','Умножить высоту вершины на 2'],{
 short:'Относительная = вершина − подножие.',explain:'<b>Относительная</b> высота — на сколько вершина выше подножия: ${M("вершина − подножие")}. Высота над уровнем моря — это <b>абсолютная</b>.'.replace('${M("вершина − подножие")}',M('вершина − подножие')),
 explain2:'«Относительная» — относительно соседа (подножия). Насколько выше? — значит, вычитаем.'}),{rule:true});
G(4,()=>CH('Что такое <b>абсолютная высота</b>?','Превышение точки над уровнем моря',['Превышение вершины над подножием','Самая большая высота на Земле','Высота над поверхностью ближайшей реки'],{
 short:'Абсолютная — от уровня моря.',explain:'<b>Абсолютная высота</b> — на сколько точка выше <b>уровня моря</b> (океана). В России — от уровня Балтийского моря. Превышение над подножием — относительная высота.',
 explain2:'У моря — 0 м. Всё остальное считаем от него, как в лифте считаем этажи от первого.'}),{rule:true});
G(4,()=>{const foot=pick([80,100,120,150,180,200,240,300,350,400,600,800]),rel=pick([20,30,45,50,60,75,90,120,150,200,250,300,500,700,1200]);const top=foot+rel;const mode=pick(['rel','abs','foot']);
 const ans=mode==='rel'?rel:mode==='abs'?top:foot;
 const q=mode==='rel'?`Абсолютная высота подножия холма — ${foot} м, вершины — ${top} м. Найди <b>относительную</b> высоту холма (в метрах).`:mode==='abs'?`Подножие горы находится на абсолютной высоте ${foot} м. Относительная высота горы — ${rel} м. Найди <b>абсолютную</b> высоту вершины (в метрах).`:`Абсолютная высота вершины — ${top} м, относительная высота горы — ${rel} м. На какой абсолютной высоте её <b>подножие</b>? (в метрах)`;
 return NUM(ans,{q,pic:figAbsRel({foot,top,qa:mode==='abs',qr:mode==='rel',qf:mode==='foot'}),hint:'Относительная = вершина − подножие.',
  short:mode==='rel'?`${top} − ${foot} = ${rel} м.`:mode==='abs'?`${foot} + ${rel} = ${top} м.`:`${top} − ${rel} = ${foot} м.`,
  explain:`Связь трёх высот: ${M('вершина = подножие + относительная')}.<br>${mode==='rel'?`Относительная = ${top} − ${foot} = <b>${rel} м</b>.`:mode==='abs'?`Вершина = ${foot} + ${rel} = <b>${top} м</b>.`:`Подножие = ${top} − ${rel} = <b>${foot} м</b>.`}`,
  explain2:`Представь лестницу: от моря до подножия — ${mode==='foot'?'?':foot} ступенек-метров, от подножия до вершины — ${mode==='rel'?'?':rel}, всего от моря до вершины — ${mode==='abs'?'?':top}. ${mode==='rel'?`${top} − ${foot} = ${rel}`:mode==='abs'?`${foot} + ${rel} = ${top}`:`${top} − ${rel} = ${foot}`}.`});});
G(4,()=>{const p=pick([['Джомолунгмы (Эвереста)',8848],['Эльбруса',5642]]);const q=pick([['Эльбруса',5642],['Монблана (Альпы)',4810],['горы Народная (Урал)',1895]]);if(p[1]<=q[1])return null;const d=p[1]-q[1];
 return NUM(d,{q:`Высота ${p[0]} — ${p[1]} м, ${q[0]} — ${q[1]} м. На сколько метров ${p[0].split(' ')[0]} выше?`,short:`${p[1]} − ${q[1]} = ${d} м.`,
  explain:`Обе высоты абсолютные (от уровня моря), поэтому просто вычитаем: ${M(`${p[1]} − ${q[1]} = ${d} м`)}.`,explain2:`Поставь обе горы на одну «линейку» от моря: одна дотягивается до ${p[1]}, другая до ${q[1]}. Разница — ${d} м.`});});

/* L5 — равнины */
G(5,()=>CH('Какие равнины называют <b>возвышенностями</b>?','Равнины с абсолютной высотой от 200 до 500 м',['Равнины ниже 200 м','Равнины выше 500 м','Любые горы выше 1000 м'],{
 short:'Возвышенности: 200–500 м.',explain:'По абсолютной высоте: <b>низменности</b> — до 200 м, <b>возвышенности</b> — 200–500 м, <b>плоскогорья</b> — выше 500 м.',
 explain2:'Три «этажа» равнин: зелёный (низко), жёлтый (выше), светло-коричневый (плоскогорье).'}),{rule:true});
G(5,()=>{const h=pick([-28,40,90,120,150,180,230,280,320,400,450,600,750,900,1200]);if(h===200||h===500)return null;const tp=plainType(h);
 return CH(`Средняя абсолютная высота равнины — <b>${N(h)} м</b>. Как называется такая равнина?`,cap(tp),['Низменность','Возвышенность','Плоскогорье','Впадина (ниже уровня моря)'],{pic:figScale,
  short:`${N(h)} м → ${tp}.`,explain:`Сравниваем с границами: ниже 0 — впадина, 0–200 — низменность, 200–500 — возвышенность, выше 500 — плоскогорье. ${N(h)} м → <b>${tp}</b>.`,
  explain2:`Поставь ${N(h)} на шкалу высот: ${h<0?'ниже нуля':h<200?'меньше 200':h<=500?'между 200 и 500':'больше 500'} — это ${tp}.`});});
BANK(5,[
 {q:'Какую часть суши занимают равнины?',a:'около 60%',w:['около 10%','около 40%','почти 100%'],e:'Равнины занимают около <b>60%</b> суши, горы — около <b>40%</b>.',e2:'Больше половины суши — равнины. 60 + 40 = 100.'},
 {q:'Каким цветом на физической карте обозначают низменности?',a:'Зелёным',w:['Коричневым','Голубым','Белым'],e:'Низменности — <b>зелёные</b>, возвышенности — жёлтые, плоскогорья и горы — оттенки коричневого, вода — голубая.',e2:'Чем выше — тем «темнее и коричневее». Самое низкое на суше — зелёное.'},
 {q:'Как образуется большинство равнин?',a:'Обломки разрушенных гор заполняют понижения и выравнивают их',w:['Их выдавливают вулканы','Они растут при столкновении плит','Их насыпают люди'],e:'Внешние силы разрушают горы, обломки уносятся водой, ветром, ледниками и откладываются в понижениях — поверхность <b>выравнивается</b>.',e2:'Как в песочнице: высыпешь песок в ямку — станет ровно.'},
 {q:'Куда наклонена Западно-Сибирская равнина? (Подсказка: смотри, куда текут Обь и Иртыш.)',a:'К Северному Ледовитому океану',w:['К Индийскому океану','К Чёрному морю','К Тихому океану'],e:'Реки текут вниз по уклону. Обь и Иртыш текут на <b>север</b>, в Северный Ледовитый океан, — значит, равнина наклонена туда.',e2:'Вода всегда течёт вниз. Куда течёт река — туда и понижается равнина.'},
 {q:'Почему на равнинах живёт больше всего людей?',a:'Там удобно пахать землю и строить города и дороги',w:['Там нет зимы','Там нет рек','Там больше вулканов'],e:'На равнинах <b>удобнее и дешевле</b> заниматься земледелием, строить города, дороги, заводы.',e2:'Попробуй построить дорогу по горам и по ровному полю — где проще?'}]);

/* L6 — горы */
G(6,()=>CH('Какие горы по учебнику называют <b>высокими</b>?','Выше 2500 м (но ниже 5000 м)',['До 1000 м','От 1000 до 2500 м','Только выше 8000 м'],{
 short:'Высокие — выше 2500 м.',explain:'По абсолютной высоте: <b>низкие</b> — до 1000 м, <b>средневысотные</b> — 1000–2500 м, <b>высокие</b> — выше 2500 м, <b>высочайшие</b> — выше 5000 м.',
 explain2:'Ступеньки: 1000 → 2500 → 5000. Высокие начинаются со второй ступеньки — 2500.'}),{rule:true});
G(6,()=>{const h=pick([600,800,950,1200,1600,1895,2100,2469,2700,3500,4100,4810,5642,6190,6960,8848]);const tp=mtType(h);
 return CH(`Высшая точка гор — <b>${N(h)} м</b>. К какому типу по высоте относятся эти горы?`,cap(tp),['Низкие','Средневысотные','Высокие','Высочайшие'],{
  short:`${N(h)} м → ${tp}.`,explain:`Границы: до 1000 м — низкие, 1000–2500 — средневысотные, 2500–5000 — высокие, выше 5000 — высочайшие. ${N(h)} м → <b>${tp}</b>.`,
  explain2:`Сравни ${N(h)} по очереди с 1000, 2500, 5000: ${h<1000?'меньше 1000':h<=2500?'больше 1000, но не больше 2500':h<=5000?'больше 2500, но не больше 5000':'больше 5000'}.`});});
BANK(6,[
 {q:'Как называется высочайшая вершина Земли?',a:'Джомолунгма (Эверест)',w:['Эльбрус','Килиманджаро','Монблан'],e:'<b>Джомолунгма (Эверест)</b> в Гималаях — 8848 м. Эльбрус — высшая точка России (5642 м), Килиманджаро — Африки, Монблан — Альп.',e2:'Самые высокие горы — Гималаи, а в них — Джомолунгма.'},
 {q:'Какая вершина — высшая точка России?',a:'Эльбрус',w:['Джомолунгма','Народная','Ключевская Сопка'],e:'<b>Эльбрус</b> (Кавказ) — 5642 м. Народная — высшая точка Урала, Ключевская Сопка — вулкан на Камчатке.',e2:'Эльбрус — двуглавый потухший вулкан на Кавказе, самая высокая гора России.'},
 {q:'Что такое <b>горная страна</b>?',a:'Группа горных хребтов с межгорными долинами между ними',w:['Одна одиночная гора','Государство в горах','Плоскогорье'],e:'<b>Горная страна</b> — это много хребтов и разделяющих их межгорных долин (например, Кавказ, Гималаи).',e2:'Хребет — как зубчатая стена, долина — как коридор между стенами. Много стен и коридоров вместе — горная страна.'},
 {q:'Какую часть суши занимают горы?',a:'около 40%',w:['около 60%','около 5%','около 90%'],e:'Горы — около <b>40%</b> суши, равнины — около 60%.',e2:'Равнин больше, чем гор: 60 против 40.'},
 {q:'Где образуются горы?',a:'На подвижных участках земной коры, где она поднимается',w:['На самых устойчивых участках коры','Только на дне океанов','Там, где много рек'],e:'Горы растут на <b>подвижных</b> участках, где кора поднимается и сминается. Равнины — на устойчивых.',e2:'Горы — «следы движения». Где кора спокойна — там равнины.'}]);

/* L7 — карта */
G(7,()=>{const keys=Object.keys(MTS);const four=sample(keys,4);const tg=pick(four);
 return CHF(`🗺 Покажи на карте: <b>${tg}</b>. Нажми на букву.`,four.map((k,i)=>'Буква '+LET[i]),four.indexOf(tg),{pic:reliefMap({W:340,box:[-180,180,80,-56],marks:four.map((k,i)=>{const p=midOf(MTS[k]);return {lon:p[0],lat:p[1],L:LET[i],i};})}),onShow:CLICKMAP,
  short:`${tg} — буква ${LET[four.indexOf(tg)]}.`,explain:`${tg} — буква <b>${LET[four.indexOf(tg)]}</b>. ${({'Анды':'Анды тянутся вдоль западного берега Южной Америки.','Кордильеры':'Кордильеры — вдоль западного берега Северной Америки.','Гималаи':'Гималаи — в Азии, к северу от Индии.','Альпы':'Альпы — в центре Европы.','Уральские горы':'Урал — с севера на юг между Европой и Азией.','Кавказ':'Кавказ — между Чёрным и Каспийским морями.','Аппалачи':'Аппалачи — на востоке Северной Америки.','Скандинавские горы':'Скандинавские горы — на Скандинавском полуострове.','Атлас':'Атлас — на северо-западе Африки.','Большой Водораздельный хребет':'Большой Водораздельный хребет — вдоль восточного берега Австралии.'})[tg]}`,
  explain2:'Сначала найди материк, потом сторону: запад, восток, север, юг. Горы, которые тянутся вдоль берега, — коричневая линия рядом с океаном.'});});
G(7,()=>{const four=sample(PLAINS,4);const tg=pick(four);
 return CHF(`🗺 Где на карте <b>${tg[0]}</b>? Нажми на букву.`,four.map((k,i)=>'Буква '+LET[i]),four.indexOf(tg),{pic:reliefMap({W:340,box:[-100,150,72,-25],rivers:true,marks:four.map((k,i)=>({lon:k[1][0],lat:k[1][1],L:LET[i],i}))}),onShow:CLICKMAP,
  short:`${tg[0]} — буква ${LET[four.indexOf(tg)]}.`,explain:`${tg[0]} — буква <b>${LET[four.indexOf(tg)]}</b>. ${({'Восточно-Европейская равнина':'Она в Европе, на ней Москва; на востоке её ограничивает Урал.','Западно-Сибирская равнина':'Она в Азии, сразу за Уралом; по ней течёт Обь.','Амазонская низменность':'Она в Южной Америке, вдоль реки Амазонки у экватора.','Среднесибирское плоскогорье':'Оно восточнее Енисея, между Енисеем и Леной.','Прикаспийская низменность':'Она на севере Каспийского моря.','Великая Китайская равнина':'Она на востоке Китая, у Жёлтого моря.','Индо-Гангская низменность':'Она вдоль реки Ганг, южнее Гималаев.','плоскогорье Декан':'Оно на полуострове Индостан.'})[tg[0]]}`,
  explain2:'Опирайся на соседей: Урал делит Восточно-Европейскую и Западно-Сибирскую; Енисей отделяет Западно-Сибирскую от Среднесибирского плоскогорья.'});});
BANK(7,[
 {q:'Какие горы служат границей между Европой и Азией?',a:'Уральские',w:['Альпы','Анды','Гималаи'],e:'<b>Уральские горы</b> тянутся с севера на юг и разделяют Европу и Азию.',e2:'Урал — «каменный пояс» России, между Восточно-Европейской и Западно-Сибирской равнинами.'},
 {q:'На каком материке находятся Анды?',a:'Южная Америка',w:['Северная Америка','Африка','Евразия'],e:'<b>Анды</b> — вдоль западного берега <b>Южной Америки</b>. Самые длинные горы на суше.',e2:'Анды — Америка (Южная). Кордильеры — Америка (Северная).'},
 {q:'Какая низменность — самая большая на Земле?',a:'Амазонская',w:['Прикаспийская','Западно-Сибирская','Индо-Гангская'],e:'<b>Амазонская низменность</b> в Южной Америке — самая большая; по ней течёт Амазонка.',e2:'Самая большая река — Амазонка, и её низменность тоже самая большая.'},
 {q:'Между какими морями находятся горы Кавказ?',a:'Между Чёрным и Каспийским',w:['Между Белым и Баренцевым','Между Красным и Средиземным','Между Балтийским и Северным'],e:'<b>Кавказ</b> — между Чёрным и Каспийским морями. Здесь Эльбрус — высшая точка России.',e2:'Кавказ — на юге России. Слева Чёрное море, справа Каспийское.'}]);

/* L8 — внешние силы */
G(8,()=>CH('Что такое <b>выветривание</b>?','Разрушение и изменение горных пород под действием температуры, влаги, воздуха и организмов',['Образование гор при столкновении плит','Извержение вулкана','Движение воздуха из области высокого давления'],{
 short:'Выветривание — разрушение пород внешними силами.',explain:'<b>Выветривание</b> — разрушение горных пород: их «грызут» перепады температуры, вода, воздух, корни растений. Это работа внешних сил. Рост гор — внутренние силы.',
 explain2:'Оставь кирпич на улице на много лет — он покроется трещинами и начнёт крошиться. Это и есть выветривание.'}),{rule:true});
G(8,()=>{const f=pick([['каньон','река (текучая вода)'],['овраг','талые и дождевые воды'],['бархан','ветер'],['дюна','ветер'],['коралловый риф','живые организмы (кораллы)'],['морена (холмы из камней, оставленные ледником)','ледник']]);
 return CH(`Какая сила создала эту форму рельефа: <b>${f[0]}</b>?`,cap(f[1]),['Река (текучая вода)','Талые и дождевые воды','Ветер','Живые организмы (кораллы)','Ледник','Вулкан'],{short:`${cap(f[0])} — работа: ${f[1]}.`,
  explain:`${cap(f[0])} создал(а) <b>${f[1]}</b>. Каньон пропиливает река, овраги размывают талые и дождевые воды, барханы и дюны надувает ветер, рифы строят кораллы, ледник оставляет каменные холмы.`,
  explain2:'Подумай, ГДЕ встречается эта форма. Пустыня или песчаный берег → ветер. Горы с рекой внизу → река. Тёплое море → кораллы. Склон поля → дождевые и талые воды.'});});
BANK(8,[
 {q:'Как называется грязевой или грязекаменный поток, который внезапно сходит в горах после ливня?',a:'Сель',w:['Лавина','Бархан','Гейзер'],e:'<b>Сель</b> — поток грязи и камней в горах. <b>Лавина</b> — это снег. Бархан — песчаный холм, гейзер — горячий источник.',e2:'Сель — «грязевая река». Лавина — «снежная река».'},
 {q:'Что строили живые организмы, создав форму рельефа длиной около 2200 км у берегов Австралии?',a:'Большой Барьерный риф',w:['Гималаи','Большой каньон','Урал'],e:'<b>Большой Барьерный риф</b> построили крошечные кораллы — это рельеф, созданный живыми организмами.',e2:'Кораллы живут в тёплом море у Австралии. Миллионы их скелетов — и получился риф.'},
 {q:'Где обычно встречаются барханы?',a:'В песчаных пустынях',w:['На ледниках','На дне океана','В тайге'],e:'<b>Барханы</b> — песчаные холмы-полумесяцы, их надувает ветер в <b>пустынях</b>.',e2:'Где много песка и ветра? В пустыне.'}]);


G(5,()=>{const low=[['Западно-Сибирская',true],['Амазонская',true],['Прикаспийская',true],['Индо-Гангская',true]],oth=[['Среднерусская',false],['Среднесибирское',false],['Декан',false]];
 const it=sample(low,2).concat(sample(oth,2));
 return MULTI('Отметь все <b>низменности</b> (равнины ниже 200 м).',it,{short:'Низменности: Западно-Сибирская, Амазонская, Прикаспийская, Индо-Гангская.',
  explain:'<b>Низменности</b>: Западно-Сибирская, Амазонская, Прикаспийская, Индо-Гангская. <b>Среднерусская</b> — возвышенность, <b>Среднесибирское</b> и <b>Декан</b> — плоскогорья.',
  explain2:'Подсказка в названиях: «возвышенность» и «плоскогорье» сами говорят о себе. Низменности — у больших рек (Обь, Амазонка, Ганг) и у Каспия.'});});
G(2,()=>{const ring=[['Ключевская Сопка','Камчатка'],['Фудзияма','Япония'],['Котопахи','Анды'],['Кракатау','Индонезия']],not=[['Везувий','Италия'],['Этна','Сицилия'],['Гекла','Исландия'],['Килиманджаро','Африка']];const n=pick(not);const r=sample(ring,3);
 return CH('Какой из этих вулканов <b>не</b> входит в Тихоокеанское огненное кольцо?',`${n[0]} (${n[1]})`,r.map(x=>`${x[0]} (${x[1]})`),{short:`${n[0]} — не у Тихого океана.`,
  explain:`Огненное кольцо — вулканы по берегам и островам <b>Тихого океана</b>: ${r.map(x=>x[0]+' — '+x[1]).join(', ')}. А ${n[0]} (${n[1]}) — далеко от Тихого океана.`,
  explain2:'Мысленно обведи Тихий океан: Камчатка, Япония, Индонезия, Новая Зеландия, Анды, Кордильеры. Италия, Исландия и Африка в это кольцо не попадают.'});});
G(8,()=>MULTI('Отметь формы рельефа, которые создал <b>ветер</b>.',shuffle([['бархан',true],['дюна',true],['каньон',false],['овраг',false],['коралловый риф',false]]),{short:'Барханы и дюны — работа ветра.',
 explain:'Ветер переносит песок и насыпает <b>барханы</b> (в пустынях) и <b>дюны</b> (на морских берегах). Каньон и овраг сделала вода, риф — кораллы.',explain2:'Где ветер может «насыпать» холм? Только там, где много песка: в пустыне и на пляже.'}));

/* L9 ★ */
G(9,()=>{const v=pick([5,6,7,8]),d=pick([60,120,180,240,300,420,480,600]);const t=d/v;if(!Number.isInteger(t))return null;
 return NUM(t,{q:`★ Сейсмические волны бегут в земной коре со скоростью около ${v} км/с. Город находится в ${d} км от очага. Через сколько секунд после толчка в очаге в городе начнёт трясти?`,short:`${d} : ${v} = ${t} с.`,
  explain:`Время = расстояние : скорость: ${M(`${d} : ${v} = ${t} с`)}. Системы оповещения успевают за эти секунды остановить поезда и лифты!`,explain2:`За каждую секунду волна пробегает ${v} км. Сколько таких кусочков в ${d} км? ${d} : ${v} = ${t}.`});},{star:true});
G(9,()=>{const city=pick([120,150,180,200,250]),foot=city+pick([40,60,80,100]),rel=pick([35,45,55,70,85]);const top=foot+rel;
 return NUM(top-city,{q:`★ Город стоит на абсолютной высоте ${city} м. Подножие холма — на ${foot} м, а относительная высота холма — ${rel} м. На сколько метров вершина холма выше города?`,
  short:`${foot} + ${rel} = ${top}; ${top} − ${city} = ${top-city} м.`,explain:`<b>Шаг 1.</b> Абсолютная высота вершины: ${M(`${foot} + ${rel} = ${top} м`)}.<br><b>Шаг 2.</b> Превышение над городом (это тоже относительная высота): ${M(`${top} − ${city} = ${top-city} м`)}.`,
  explain2:`Можно иначе: подножие выше города на ${foot-city} м, а вершина выше подножия на ${rel} м. ${foot-city} + ${rel} = ${top-city} м.`});},{star:true});
G(9,()=>{const base=5364;
 return NUM(8848-base,{q:'★ Базовый лагерь альпинистов под Джомолунгмой находится на высоте 5364 м. Какую относительную высоту нужно преодолеть от лагеря до вершины (8848 м)?',short:'8848 − 5364 = 3484 м.',
  explain:`Относительная высота = вершина − начальная точка: ${M('8848 − 5364 = 3484 м')}. Выходит, сам подъём «всего» 3,5 км, но в разреженном воздухе это очень тяжело.`,explain2:'От лагеря до вершины — разница двух абсолютных высот: 8848 − 5364.'});},{star:true});
BANK(9,[
 {q:'★ На вершине Джомолунгмы в горных породах находят окаменелых морских животных. Как это объяснить?',a:'Эти породы образовались на дне моря, а потом их подняло столкновение плит',w:['Их занесли туда альпинисты','Раньше Джомолунгма была вулканом под водой и извергала ракушки','Животные сами забрались в горы'],e:'Осадочные породы с ракушками образовались на <b>дне древнего моря</b>. Индийская плита врезалась в Евразийскую, слои смялись и <b>поднялись</b> на высоту почти 9 км.',e2:'Горы растут из того, что было внизу. Если наверху ракушки — значит, «верх» когда-то был морским дном.'},
 {q:'★ Где на суше абсолютная высота отрицательная (ниже уровня моря)?',a:'На берегу Мёртвого моря и в части Прикаспийской низменности',w:['На вершине Эльбруса','В Гималаях','На Восточно-Европейской равнине у Москвы'],e:'Берег <b>Мёртвого моря</b> — около −430 м, часть <b>Прикаспийской низменности</b> — около −28 м. Это впадины: суша ниже уровня океана.',e2:'Отрицательная высота — ниже моря. Ищем самые низкие места суши: впадины у Мёртвого моря и Каспия.'},
 {q:'★ Почему на Гавайских островах вулканы есть, хотя они далеко от границ плит?',a:'Под ними «горячая точка» — поток магмы из мантии прожигает плиту',w:['Это не вулканы, а холмы','Там проходит граница двух материков','Вулканы туда принёс океан'],e:'Под Гавайями — <b>горячая точка</b>: из глубины мантии поднимается струя магмы и прожигает Тихоокеанскую плиту. Плита ползёт, и вулканы выстраиваются цепочкой.',e2:'Как паяльник под листом бумаги, который медленно двигают: получается ряд прожжённых дырочек — цепочка вулканов.'},
 {q:'★ Какой океан окружён «огненным кольцом» вулканов и землетрясений?',a:'Тихий',w:['Атлантический','Индийский','Северный Ледовитый'],e:'По краям <b>Тихого океана</b> его плиты ныряют под соседние — отсюда вулканы и землетрясения кольцом: Камчатка, Япония, Индонезия, Новая Зеландия, Анды, Кордильеры.',e2:'Самый большой океан — и самое большое кольцо вулканов вокруг него.'}],{star:true});

/* extras: rule checks for every level, more ★ */
G(7,()=>CH('Какие два гигантских горных пояса есть на Земле?','Вдоль Тихого океана (Кордильеры и Анды) и через всю Евразию (Альпы, Кавказ, Гималаи)',['Вдоль экватора и вдоль Северного полярного круга','Только в Африке и Австралии','Вдоль Атлантического океана по обоим берегам'],{short:'Тихоокеанский и Евразийский пояса.',explain:'По учебнику: в Западном полушарии вдоль Тихого океана — <b>Кордильеры и Анды</b>; в Восточном — пояс через всю <b>Евразию</b>: Альпы, Кавказ, Гималаи.',explain2:'Горы — на границах плит: вокруг Тихого океана и там, где Африка и Индия давят на Евразию.'}),{rule:true});
G(9,()=>CH('★ Как найти абсолютную высоту вершины, если известны высота подножия и относительная высота?','Сложить абсолютную высоту подножия и относительную высоту',['Вычесть из относительной абсолютную','Умножить их','Взять относительную высоту'],{short:'Вершина = подножие + относительная.',explain:'Абсолютная высота вершины = <b>абсолютная высота подножия + относительная высота</b>.',explain2:'Лестница: от моря до подножия, потом от подножия до вершины.'}),{rule:true,star:true});
G(9,()=>{const v=pick([2,4,5,10]),h=pick([1,2,5]);const y=h*1000/v;return NUM(y,{q:`★ Гималаи поднимаются примерно на ${v} мм в год. За сколько лет они вырастут на ${h} м (если скорость не изменится)?`,short:`${h} м = ${h*1000} мм; ${h*1000} : ${v} = ${N(y)} лет.`,explain:`${M(`${h} м = ${h*1000} мм`)}; ${M(`${h*1000} : ${v} = ${N(y)}`)} лет. Для Земли это мгновение, для человека — очень долго.`,explain2:'Переведи метры в миллиметры, потом раздели на скорость.'});},{star:true});
/* ---------------- widgets ---------------- */
function onTheory(root){
 const v=root.querySelector('#w-volc');
 if(v){v.innerHTML=`<b>🌋 Вулкан в разрезе: нажимай на части</b>${BTNS([['vEr','💥 Извержение'],...VPARTS.map((p,i)=>['vp'+i,p[1]])])}<div id="vP" class="fig"></div><div id="vT" style="text-align:center;line-height:1.6;min-height:3em"></div>`;
  let er=false,hl=null;const g=id=>v.querySelector('#'+id);
  const u=()=>{g('vP').innerHTML=figVolcano({erupt:er,hl});const p=VPARTS.find(x=>x[0]===hl);g('vT').innerHTML=p?`<b>${p[1]}</b> — ${p[2]}`:(er?'Извержение! Лава течёт по склонам, вылетают пепел и вулканические бомбы.':'Вулкан спит. Нажми «Извержение» или на часть вулкана.');
   g('vEr').className='btn'+(er?'':' ghost');VPARTS.forEach((p,i)=>{g('vp'+i).className='btn'+(hl===p[0]?'':' ghost');});};
  g('vEr').onclick=()=>{er=!er;if(!er&&(hl==='лава'||hl==='пепел'))hl=null;u();};VPARTS.forEach((p,i)=>{g('vp'+i).onclick=()=>{hl=p[0];if(p[0]==='лава'||p[0]==='пепел')er=true;u();};});u();}
 const w=root.querySelector('#w-plates');
 if(w){const T=Object.keys(SCENE);w.innerHTML=`<b>🧩 Границы плит: выбери случай и двигай время</b>${BTNS(T.map(k=>['pb_'+k,SCENE[k][0]]))}${SL('pT','Прошло времени:',0,100,1,60)}<div id="pP" class="fig"></div><div id="pX" style="line-height:1.6"></div>`;
  let ty='cc';const g=id=>w.querySelector('#'+id);const u=()=>{const t=+g('pT').value;g('pTo').textContent=t+' млн лет';g('pP').innerHTML=plateScene(ty,t/100);g('pX').innerHTML=SCENE[ty][1];setBtns(w,T.map(k=>'pb_'+k),'pb_'+ty);};
  T.forEach(k=>{g('pb_'+k).onclick=()=>{ty=k;u();};});g('pT').oninput=u;u();}
 const h=root.querySelector('#w-height');
 if(h){h.innerHTML=`<b>📏 Высотомер: двигай высоту</b>${SL('hH','Абсолютная высота:',-100,8848,1,1200)}<div id="hP" class="fig"></div><div id="hX" style="text-align:center;line-height:1.7"></div>`;
  const g=id=>h.querySelector('#'+id);const ex=hh=>hh<0?'берег Каспия (−28 м)':hh<200?'Западно-Сибирская низменность':hh<=500?'Среднерусская возвышенность':hh<1000?'Среднесибирское плоскогорье (или низкие горы)':hh<=2500?'Скандинавские горы, Урал':hh<=5000?'Альпы (Монблан ≈ 4810 м)':'Гималаи, Анды, Кавказ (Эльбрус 5642 м)';
  const u=()=>{const hh=+g('hH').value;g('hHo').textContent=N(hh)+' м';const c=hyps(hh);const y=170-Math.max(0,hh)/8848*150;
   g('hP').innerHTML=SV(320,180,RECT(0,170,320,10,{f:WATER,fo:0.4})+PATH(`M20,170 L${160-50},${r2(y+30)} L160,${r2(y)} L${160+50},${r2(y+30)} L300,170 Z`,{f:c[3],fo:c[4],s:'var(--fig)',sw:1.2})+TX(160,r2(y)-8,N(hh)+' м',{fs:13,halo:3})+(hh>=8000?TX(160,r2(y)-24,'⛳',{fs:14}):''),'Высота',300);
   g('hX').innerHTML=`Цвет на карте и тип: <span class="out">${hh<1000&&hh>=0?(hh<200?'низменность':hh<=500?'возвышенность':'плоскогорье, если ровно; низкие горы, если перепады большие'):hh<0?'впадина ниже уровня моря':mtType(hh)+' горы'}</span><br><span class="small">Пример: ${ex(hh)}</span>`;};
  g('hH').oninput=u;u();}
}

window.TOPIC={id:'geo6_relief',title:'Рельеф: горы и равнины',subtitle:'География · 6 класс',
intro:`<p>Учебник «Полярная звезда», §23–27. Движения земной коры, землетрясения и вулканы; что происходит на границах литосферных плит; абсолютная и относительная высота; равнины и горы, их виды по высоте; главные горы и равнины на карте мира; внешние силы и мелкие формы рельефа. В конце — ★ олимпиадные задачи.</p>`,
theory,symbols,figs:{},onTheory,
levels:['Движения земной коры','Землетрясения','Вулканы','Границы литосферных плит','Абсолютная и относительная высота','Равнины','Горы','Горы и равнины на карте','Внешние силы и формы рельефа','★ Олимпиадные задачи'],
gens:SORTG()};
})();
