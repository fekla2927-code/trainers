(function(){
const {R,pick,shuffle,sample,range,plural,gcd}=H;
const N=H.num,M=H.m;
const F=(a,b)=>H.frac(typeof a==='number'?N(a):a,typeof b==='number'?N(b):b);
const nz=(a,b)=>{let v;do{v=R(a,b);}while(v===0);return v;};
const cx=c=>c===1?'':c===-1?'−':N(c);
const pn=v=>v<0?`(${N(v)})`:N(v);
const xp=(a,v)=>{v=v||'x';return a===0?v:a>0?`${v} + ${N(a)}`:`${v} − ${N(-a)}`;};
const lin=(k,b)=>`${cx(k)}x${b===0?'':b>0?' + '+N(b):' − '+N(-b)}`;
const ok=(c,msg)=>{if(!c)throw new Error('self-check failed: '+msg);};
const near=(a,b)=>Math.abs(a-b)<1e-9;
const isInt=x=>Math.abs(x-Math.round(x))<1e-9;
const uniq=a=>new Set(a).size===a.length;
function ch(right,wrong){const o=shuffle([right,...wrong].map((s,i)=>({s,i})));return {opts:o.map(x=>x.s),ans:o.findIndex(x=>x.i===0)};}
const INF=Infinity;
// number → html (fraction if needed)
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

/* ---------- theory ---------- */
const theory=[
{title:'Числовые неравенства и их свойства',lvl:0,html:`
<p class="hook">Тебе 14, другу 12. Ты старше. Умножим оба возраста на 2 — ты всё ещё «больше»: 28 > 24. А теперь умножим на −1: −14 и −12. Кто больше? <b>−12 > −14!</b> Знак перевернулся. На этом одном факте горит половина класса на контрольной. Давай разберёмся, почему так.</p>
<div class="box rule"><b>Определение</b><b>a > b</b>, если разность <b>a − b положительна</b>. a < b, если a − b < 0.</div>
<p>Так можно сравнить что угодно: просто вычти и посмотри на знак.</p>
<div class="box rule"><b>Свойства (главные)</b>
1) Прибавить/вычесть одно и то же число — знак <b>не меняется</b>: a < b → a + 5 < b + 5.<br>
2) Умножить/разделить на <b>положительное</b> число — знак <b>не меняется</b>: a < b → 3a < 3b.<br>
3) Умножить/разделить на <b>отрицательное</b> — знак <b>меняется на противоположный</b>: a < b → −2a <b>></b> −2b.</div>
<p><b>Почему знак переворачивается?</b> Умножение на −1 — это «зеркало» относительно нуля на числовой прямой. Что было правее, оказывается левее.</p>
<div class="widget" id="w-flip"></div>
<div class="box ex"><b>Пример</b>a > b > 0. Что больше: ${F(1,'a')} или ${F(1,'b')}? Возьми 5 > 2: ${F(1,5)} < ${F(1,2)}. У положительных чисел при переходе к обратным знак меняется: ${F(1,'a')} < ${F(1,'b')}.</div>
<div class="box err"><b>Ловушка</b>a < b ⇒ a² < b²? Нет! −5 < 1, но 25 > 1. Возводить в квадрат можно только неотрицательные части.</div>`},
{title:'Числовые промежутки',lvl:1,html:`
<p>Решение неравенства — обычно не одно число, а целый кусок прямой. Его записывают <b>промежутком</b>.</p>
<div class="box rule"><b>Скобки</b><b>[ ]</b> — квадратная: конец <b>входит</b> (≤, ≥), на рисунке — закрашенная точка ●.<br><b>( )</b> — круглая: конец <b>не входит</b> (<, >), на рисунке — выколотая точка ○.<br>У ∞ скобка <b>всегда круглая</b>: до бесконечности не дойти.</div>
<div class="figrow">
<div class="fig">${nl1([I(-2,4,1,0)])}<div class="cap">−2 ≤ x < 4 → [−2; 4)</div></div>
<div class="fig">${nl1([I(3,INF,0,0)])}<div class="cap">x > 3 → (3; +∞)</div></div>
<div class="fig">${nl1([I(-INF,1,0,1)])}<div class="cap">x ≤ 1 → (−∞; 1]</div></div></div>
<div class="widget" id="w-iv"></div>
<div class="box tip"><b>Как запомнить</b>Квадратная скобка — «стенка», за неё можно взяться: число твоё. Круглая — «скользкая»: подходишь сколь угодно близко, но не касаешься.</div>
<div class="box err"><b>Частая ошибка</b>Писать [−∞ или 5; +∞]. Бесконечность — не число, её нельзя «включить».</div>`},
{title:'Пересечение и объединение промежутков',lvl:2,html:`
<div class="box rule"><b>Правило</b><b>Пересечение ∩</b> — числа, которые входят в <b>оба</b> промежутка сразу («И»). На прямой — где штриховки <b>накладываются</b>.<br><b>Объединение ∪</b> — числа, входящие <b>хотя бы в один</b> («ИЛИ»). Всё заштрихованное.</div>
<div class="figrow"><div class="fig">${nl([{ivs:[I(-3,2,1,1)]},{ivs:[I(0,5,0,1)],col:'var(--accent)',op:0.45}])}<div class="cap">[−3; 2] ∩ (0; 5] = (0; 2], а [−3; 2] ∪ (0; 5] = [−3; 5]</div></div></div>
<div class="box ex"><b>Как решать</b>1) Нарисуй оба промежутка на одной прямой, один над другим. 2) Для ∩ найди, где они перекрываются. 3) Проверь концы: точка входит в пересечение, только если она входит в <b>оба</b>.</div>
<div class="box err"><b>Ловушка</b>Если промежутки не перекрываются, пересечение пустое: (−∞; 1) ∩ [3; +∞) = ∅.</div>`},
{title:'Линейные неравенства',lvl:3,html:`
<div class="box rule"><b>Правило</b>Решаем как уравнение, но помним: при умножении или делении на <b>отрицательное</b> число знак <b>переворачивается</b>.</div>
<div class="box ex"><b>Пример</b>5 − 3x > 17 → −3x > 12 → делим на −3 и <b>переворачиваем</b> знак: x < −4. Ответ: (−∞; −4).<br>Проверка: x = −5 → 5 + 15 = 20 > 17 ✅; x = 0 → 5 > 17 ❌. Всё сходится.</div>
<div class="box ex"><b>С дробями</b>${F('x',2)} − ${F('x − 1',3)} ≥ 1. Умножаем на 6 (положительное — знак не трогаем): 3x − 2(x − 1) ≥ 6 → x + 2 ≥ 6 → x ≥ 4.</div>
<div class="box tip"><b>Лайфхак проверки</b>Подставь одно число из ответа и одно — не из ответа. Первое должно подходить, второе — нет.</div>
<div class="box ex"><b>Из жизни</b>У Артёма 3 000 ₽, он откладывает по 800 ₽ в неделю на наушники за 9 500 ₽. 3000 + 800n ≥ 9500 → n ≥ 8,125. Значит, минимум <b>9 недель</b> (недели — целые!).</div>`},
{title:'Системы и двойные неравенства',lvl:4,html:`
<div class="box rule"><b>Правило</b>Решение <b>системы</b> — числа, которые подходят <b>всем</b> неравенствам сразу. Решаем каждое, потом берём <b>пересечение</b>.</div>
<div class="box ex"><b>Пример</b>{ 2x − 1 > 3; x + 4 ≤ 10 } → { x > 2; x ≤ 6 } → (2; 6].</div>
<div class="box rule"><b>Двойное неравенство</b>−3 < 2x + 1 ≤ 7 — это система «короче». Действуем сразу со всеми тремя частями: −4 < 2x ≤ 6 → −2 < x ≤ 3.</div>
<div class="box err"><b>Ловушка с минусом</b>−1 ≤ 5 − 2x < 9 → −6 ≤ −2x < 4 → делим на −2: 3 ≥ x > −2, то есть −2 < x ≤ 3. Оба знака перевернулись, и концы поменялись местами!</div>
<div class="box ex"><b>Нет решений</b>{ x > 5; x < 2 } — число не может быть одновременно больше 5 и меньше 2. Ответ: ∅.</div>`},
{title:'Целые решения',lvl:5,html:`
<div class="box rule"><b>Сколько целых на отрезке</b>На отрезке [a; b] с целыми a ≤ b ровно <b>b − a + 1</b> целых чисел (как столбов в заборе: столбов на один больше, чем пролётов).</div>
<div class="box ex"><b>Пример</b>Целые решения −2,5 < x ≤ 3: это −2, −1, 0, 1, 2, 3 — шесть штук. Концы: −2,5 не целое, поэтому начинаем с −2; 3 входит (≤).</div>
<div class="box err"><b>Ловушка</b>Строгий знак: в −2 < x < 3 не входят ни −2, ни 3. Целые: −1, 0, 1, 2 — четыре, а не шесть.</div>`},
{title:'Неравенства с модулем |x − a| < b',lvl:6,html:`
<div class="box rule"><b>Смысл модуля</b>|x − a| — это <b>расстояние</b> на прямой от x до a.<br>|x − a| < b ⇔ a − b < x < a + b (ближе b к точке a).<br>|x − a| > b ⇔ x < a − b <b>или</b> x > a + b (дальше b).</div>
<div class="figrow"><div class="fig">${nl([{ivs:[I(-1,5,0,0)]}],{marks:[2]})}<div class="cap">|x − 2| < 3: не дальше 3 от точки 2 → (−1; 5)</div></div></div>
<div class="box ex"><b>Из жизни</b>Деталь для принтера должна быть 50 мм с допуском 0,2 мм: |d − 50| ≤ 0,2 → 49,8 ≤ d ≤ 50,2.</div>
<div class="box err"><b>Ловушка</b>|x + 3| < 2 — это расстояние до <b>−3</b> (x + 3 = x − (−3)). Ответ: (−5; −1), а не (1; 5).</div>`},
{title:'Оценка выражений',lvl:7,html:`
<p>Физик измерил линейкой: длина 2 < a < 3 см, ширина 1 < b < 4 см. В каких пределах может быть a + b? a − b? Это и есть <b>оценка</b>.</p>
<div class="box rule"><b>Правила</b>Неравенства <b>одного знака</b> можно почленно <b>складывать</b>.<br>Для <b>положительных</b> частей — почленно <b>умножать</b>.<br><b>Вычитать и делить почленно нельзя!</b> Вычитание = сложение с противоположным: a − b = a + (−b).</div>
<div class="box ex"><b>Пример</b>2 < a < 3, 1 < b < 4.<br>a + b: 2 + 1 < a + b < 3 + 4 → 3 < a + b < 7.<br>a − b: сначала −4 < −b < −1 (умножили на −1, знаки перевернулись!). Складываем: 2 − 4 < a − b < 3 − 1 → <b>−2 < a − b < 2</b>.</div>
<div class="box err"><b>Главная ошибка</b>«Вычесть почленно»: 2 − 1 < a − b < 3 − 4, то есть 1 < a − b < −1. Абсурд: 1 не может быть меньше −1! Проверка числами: a = 2,1, b = 3,9 → a − b = −1,8 — в «ответ» с ошибкой не попадает.</div>
<div class="box ex"><b>Дробь</b>Для положительных: ${F('a','b')} — наименьшая, когда a наименьшее, а b наибольшее: ${F(2,4)} < ${F('a','b')} < ${F(3,1)}.</div>`},
{title:'Доказательство неравенств',lvl:8,html:`
<div class="box rule"><b>Главный приём</b>Чтобы доказать A ≥ B, рассмотри разность A − B и покажи, что она ≥ 0. Чаще всего она оказывается <b>квадратом</b>, а квадрат не бывает отрицательным.</div>
<div class="box ex"><b>a² + b² ≥ 2ab</b>a² + b² − 2ab = (a − b)² ≥ 0. Готово! Равенство — только при a = b.</div>
<div class="box rule"><b>Среднее арифметическое ≥ среднего геометрического</b>Для a ≥ 0, b ≥ 0: ${F('a + b',2)} ≥ ${H.sqrt('ab')}, равенство при a = b.<br>Доказательство: ${F('a + b',2)} − ${H.sqrt('ab')} = ${F('(√a − √b)²',2)} ≥ 0.</div>
<div class="box ex"><b>Применение: забор</b>У тебя 40 м сетки, нужен прямоугольный загон наибольшей площади. Стороны a + b = 20, площадь ab ≤ (${F('a + b',2)})² = 100. Максимум 100 м² — при квадрате 10 × 10.</div>
<div class="box ex"><b>Применение: минимум</b>x + ${F(9,'x')} при x > 0: ≥ 2·${H.sqrt('x · 9/x')} = 2·3 = 6. Достигается при x = ${F(9,'x')}, т. е. x = 3.</div>
<div class="fact">Неравенство между средними для двух чисел было известно ещё Евклиду: в «Началах» (около 300 г. до н. э.) есть его геометрическая версия — полухорда в полукруге не больше радиуса.</div>`},
{title:'Олимпиадные приёмы',lvl:9,html:`
<ul class="steps">
<li><b>Выдели полный квадрат:</b> x² − 6x + 14 = (x − 3)² + 5 ≥ 5. Наименьшее значение 5.</li>
<li><b>Сравнение через промежуточное число:</b> 31¹¹ < 32¹¹ = 2⁵⁵ < 2⁵⁶ = 16¹⁴ < 17¹⁴.</li>
<li><b>Сумма модулей</b> |x − a| + |x − b| — сумма расстояний до двух точек. Между точками она постоянна и равна расстоянию между ними.</li>
<li><b>Сравнение дробей</b> ${F('n','n + 1')} = 1 − ${F(1,'n + 1')}: чем больше n, тем ближе к 1.</li></ul>`},
{title:'Шпаргалка',html:`
<ul class="steps">
<li>Умножаешь/делишь на отрицательное — <b>переворачивай знак</b>.</li>
<li>[ ] — конец входит (●), ( ) — не входит (○), у ∞ скобка круглая.</li>
<li>Система → пересечение. «Или» → объединение.</li>
<li>|x − a| < b → a − b < x < a + b; |x − a| > b → два луча.</li>
<li>Оценка: складывать можно, вычитать — через −b.</li>
<li>a² + b² ≥ 2ab; ${F('a + b',2)} ≥ √(ab).</li></ul>`}
];

/* ---------- symbols ---------- */
const symbols={tab:'Знаки',title:'Знаки и записи',rows:[
['<, >','меньше, больше','Строгое неравенство: равенство не допускается.','3 < 5'],
['≤, ≥','меньше или равно, больше или равно','Нестрогое: равенство тоже подходит.','x ≥ 2: подходит и 2'],
['[a; b]','отрезок','a ≤ x ≤ b, концы входят ●.','[1; 4]'],
['(a; b)','интервал','a < x < b, концы не входят ○.','(1; 4)'],
['[a; b), (a; b]','полуинтервал','Один конец входит, другой нет.','[1; 4): 1 входит, 4 нет'],
['(a; +∞), [a; +∞)','луч','x > a или x ≥ a.','x ≥ 3 → [3; +∞)'],
['∞','бесконечность','Не число; скобка у неё всегда круглая.','(−∞; 0)'],
['∩','пересечение','Общая часть, «И». Решение системы.','[0; 5] ∩ [3; 8] = [3; 5]'],
['∪','объединение','Всё вместе, «ИЛИ».','x < 1 или x > 4 → (−∞; 1) ∪ (4; +∞)'],
['∅','пустое множество','Решений нет.','x > 5 и x < 2 → ∅'],
['|x − a|','модуль разности','Расстояние от x до a на прямой.','|x − 2| < 3 → (−1; 5)'],
['a² + b² ≥ 2ab','классическое неравенство','Следует из (a − b)² ≥ 0.','при a = b равенство'],
['(a + b)/2 ≥ √(ab)','среднее арифметическое ≥ среднего геометрического','Для a, b ≥ 0.','4 и 16: 10 ≥ 8']
],after:`<div class="box tip" style="margin-top:14px"><b>Самое важное</b>Минус-множитель переворачивает знак. Квадратная скобка — конец твой, круглая — нет.</div>`};

/* ---------- generators ---------- */
const gens=[];
const G=(lvl,make,star,rule)=>gens.push({lvl,make,star,rule});
// interval choice: correct list + candidate wrong lists
function ivChoice(right,wrongs){const r=sets(right);const w=[];const add=L=>{const s=L?sets(L):'∅';if(s!==r&&!w.includes(s))w.push(s);};wrongs.forEach(add);
 const v=right[0];for(let d=1;w.length<3&&d<6;d++){add([I(isFinite(v.lo)?v.lo-d:v.lo,v.hi,v.cl,v.ch)]);if(w.length<3)add([I(v.lo,isFinite(v.hi)?v.hi+d:v.hi,v.cl,v.ch)]);}return ch(r,w.slice(0,3));}

/* L0 */
G(0,()=>{const r=ch('знак неравенства меняется на противоположный',['знак неравенства не меняется','неравенство превращается в равенство','знак меняется, только если число дробное']);
return {type:'choice',q:'Как звучит правило: если обе части верного неравенства умножить на одно и то же <b>отрицательное</b> число, то…',...r,
short:'Умножение на отрицательное переворачивает знак.',
explain:`При умножении на отрицательное число знак <b>меняется на противоположный</b>: < на >, ≤ на ≥.<br>Пример: 2 < 5, умножим на −1: −2 и −5. А −2 > −5. Знак перевернулся.`,
explain2:`Представь термометр: −2° теплее, чем −5°. Умножение на −1 «отражает» числа относительно нуля, как зеркало: кто был справа, оказывается слева. Поэтому знак разворачивается.`};},false,true);
G(0,()=>{const r=ch('a − b > 0',['a − b < 0','a · b > 0',`${F('a','b')} > 1`]);
return {type:'choice',q:'Что из этого — определение того, что <b>a > b</b>?',opts:r.opts.map(M),ans:r.ans,
short:'a > b ⇔ разность a − b положительна.',
explain:`По определению a > b, если <b>разность a − b положительна</b>. Это работает для любых чисел.<br>«${F('a','b')} > 1» — ловушка: для отрицательных не работает. −2 > −4, но ${F(-2,-4)} = ${F(1,2)} < 1.`,
explain2:`Проверь: 7 > 3 → 7 − 3 = 4 > 0 ✅. −1 > −6 → −1 − (−6) = 5 > 0 ✅. Разность всегда «знает», кто больше. Произведение и частное — нет.`};},false,true);
G(0,()=>{const k=nz(-6,6),m=nz(-9,9),lt=Math.random()<0.5;const rel=lt?'<':'>';const res=k>0?rel:FLIP[rel];
const r=ch(res,[FLIP[res],'=','нельзя определить']);
const L=`${cx(k)}a ${m>0?'+':'−'} ${Math.abs(m)}`,Rr=`${cx(k)}b ${m>0?'+':'−'} ${Math.abs(m)}`;
return {type:'choice',q:`Известно, что a ${rel} b. Какой знак поставить вместо «?»: <span class="m">${L} ? ${Rr}</span>`,...r,
short:k>0?`Умножили на ${k} > 0 — знак сохранился; прибавление ${N(m)} знак не меняет.`:`Умножили на ${N(k)} < 0 — знак перевернулся.`,
explain:`1) a ${rel} b. Умножаем обе части на ${N(k)}: ${k>0?`число положительное — знак <b>не меняется</b>: ${cx(k)}a ${rel} ${cx(k)}b.`:`число <b>отрицательное</b> — знак <b>переворачивается</b>: ${cx(k)}a ${FLIP[rel]} ${cx(k)}b.`}<br>2) Прибавляем ${N(m)} к обеим частям — знак не меняется.<br>Ответ: <b>${L} ${res} ${Rr}</b>.`,
explain2:`Проверь на числах: пусть a = ${lt?1:3}, b = ${lt?3:1} (a ${rel} b ✅). Левая часть: ${N(k)}·${lt?1:3} ${m>0?'+':'−'} ${Math.abs(m)} = ${N(k*(lt?1:3)+m)}, правая: ${N(k)}·${lt?3:1} ${m>0?'+':'−'} ${Math.abs(m)} = ${N(k*(lt?3:1)+m)}. ${N(k*(lt?1:3)+m)} ${res} ${N(k*(lt?3:1)+m)} ✅.`};});
G(0,()=>{const neg=Math.random()<0.4;const res=neg?'>':'<';const r=ch(res,[FLIP[res],'=','нельзя определить']);
const ex=neg?[-4,-2]:[5,2];
return {type:'choice',q:neg?'Известно, что a < b < 0. Сравни <span class="m">'+F(1,'a')+' ? '+F(1,'b')+'</span>':'Известно, что a > b > 0. Сравни <span class="m">'+F(1,'a')+' ? '+F(1,'b')+'</span>',...r,
short:neg?`Например, −4 < −2, а ${F(1,-4)} = −0,25 > −0,5 = ${F(1,-2)}.`:`Например, 5 > 2, а ${F(1,5)} < ${F(1,2)}.`,
explain:`Разделим обе части неравенства на положительное число ab (${neg?'оба отрицательные — произведение положительно':'оба положительные'}): ${neg?`a < b → ${F('a','ab')} < ${F('b','ab')} → ${F(1,'b')} < ${F(1,'a')}`:`a > b → ${F('a','ab')} > ${F('b','ab')} → ${F(1,'b')} > ${F(1,'a')}`}.<br>Ответ: <b>${F(1,'a')} ${res} ${F(1,'b')}</b>. У чисел одного знака при переходе к обратным знак неравенства меняется.`,
explain2:neg?`Числа: a = −4, b = −2. ${F(1,'a')} = −0,25, ${F(1,'b')} = −0,5. −0,25 правее на прямой → больше.`:`Пицца: делить на 5 человек или на 2? Чем больше людей (a), тем меньше кусок ${F(1,'a')}.`};});
G(0,()=>{const k=R(2,6),c=R(2,9);const all=[[`x − ${c} < y − ${c}`,true,'вычитание числа знак не меняет'],[`−${k}x > −${k}y`,true,`умножили на −${k} — знак перевернули`],[`${F('x',k)} < ${F('y',k)}`,true,`разделили на ${k} > 0`],[`${c} − x < ${c} − y`,false,`−x > −y, поэтому ${c} − x > ${c} − y`],['x² < y²',false,'неверно, например, x = −5, y = 1: 25 > 1']];
const o=shuffle(all);
return {type:'multi',q:'Известно, что <b>x < y</b>. Какие неравенства верны при <b>любых</b> таких x и y? Выбери все.',opts:o.map(z=>M(z[0])),ans:o.map((z,i)=>z[1]?i:-1).filter(i=>i>=0),
short:o.map(z=>`${z[0]}: ${z[1]?'да':'нет'} — ${z[2]}.`).join('<br>'),
explain:o.map(z=>`• ${M(z[0])} — ${z[1]?'<b>верно</b>':'<b>неверно</b>'}: ${z[2]}.`).join('<br>'),
explain2:`Проверь числами x = −5, y = 1: x − ${c} = ${-5-c} < ${1-c} ✅; −${k}x = ${5*k} > −${k} ✅; ${c} − x = ${c+5}, ${c} − y = ${c-1} — первое <b>больше</b>, значит «${c} − x < ${c} − y» неверно; x² = 25 > 1 = y² — неверно.`};});

/* L1 */
G(1,()=>{const a=R(-5,3),b=a+R(2,7);const r=ch(`число ${N(a)} не входит в промежуток (выколотая точка)`,[`число ${N(a)} входит в промежуток`,'промежуток бесконечный',`x меньше ${N(a)}`]);
return {type:'choice',q:`Что означает круглая скобка слева в записи <span class="m">(${N(a)}; ${N(b)}]</span>?`,...r,
short:'Круглая скобка — конец не входит, квадратная — входит.',
explain:`<b>Круглая</b> скобка — конец <b>не входит</b> (знак <), на рисунке выколотая точка ○. <b>Квадратная</b> — входит (≤), закрашенная ●.<br>(${N(a)}; ${N(b)}] — это ${N(a)} < x ≤ ${N(b)}.`,
explain2:`Квадратная скобка — как стенка, за неё можно взяться: число твоё. Круглая — скользкая: подходишь вплотную, но ${N(a)} не берёшь.`,pic:nl1([I(a,b,0,1)])};},false,true);
function randIv(){const t=R(0,2);if(t===0){const a=R(-7,3),b=a+R(2,8);return I(a,b,R(0,1),R(0,1));}const r=R(-7,7);return t===1?I(r,INF,R(0,1),0):I(-INF,r,0,R(0,1));}
function ivWrongs(v){const W=[];if(isFinite(v.lo)&&isFinite(v.hi)){W.push([I(v.lo,v.hi,!v.cl,!v.ch)],[I(v.lo,v.hi,!v.cl,v.ch)],[I(v.lo,v.hi,v.cl,!v.ch)],[I(-v.hi,-v.lo,v.ch,v.cl)]);}
 else{const r=isFinite(v.lo)?v.lo:v.hi,c=isFinite(v.lo)?v.cl:v.ch;W.push([isFinite(v.lo)?I(-INF,r,0,c):I(r,INF,c,0)],[isFinite(v.lo)?I(r,INF,!c,0):I(-INF,r,0,!c)],[isFinite(v.lo)?I(-INF,r,0,!c):I(r,INF,!c,0)],[isFinite(v.lo)?I(-r,INF,c,0):I(-INF,-r,0,c)]);}return W;}
G(1,()=>{const v=randIv();const r=ivChoice([v],ivWrongs(v));
return {type:'choice',q:`Запиши промежутком множество решений: <span class="m">${ineq(v)}</span>`,opts:r.opts.map(M),ans:r.ans,
short:`${ineq(v)} → ${ivs(v)}.`,
explain:`Смотрим на каждый конец:<br>${isFinite(v.lo)?`• слева ${nh(v.lo)}, знак «${v.cl?'≤':'<'}» → ${v.cl?'входит → <b>[</b>':'не входит → <b>(</b>'}<br>`:'• слева ограничения нет → <b>(−∞</b><br>'}${isFinite(v.hi)?`• справа ${nh(v.hi)}, знак «${v.ch?'≤':'<'}» → ${v.ch?'входит → <b>]</b>':'не входит → <b>)</b>'}`:'• справа ограничения нет → <b>+∞)</b>'}<br>Ответ: <b>${ivs(v)}</b>.<div class="fig">${nl1([v])}</div>`,
explain2:`Нарисуй на прямой: ${isFinite(v.lo)?`точка ${nh(v.lo)} ${v.cl?'закрашена ●':'выколота ○'}`:''}${isFinite(v.lo)&&isFinite(v.hi)?', ':''}${isFinite(v.hi)?`точка ${nh(v.hi)} ${v.ch?'закрашена ●':'выколота ○'}`:''}. Закрашенная — квадратная скобка, выколотая — круглая. ∞ — всегда круглая.`};});
G(1,()=>{const v=randIv();const r=ivChoice([v],ivWrongs(v));
return {type:'choice',q:'Какой промежуток изображён на рисунке?',pic:nl1([v]),opts:r.opts.map(M),ans:r.ans,
short:`${ivs(v)}: ${ineq(v)}.`,
explain:`Закрашенная точка ● — конец <b>входит</b>, квадратная скобка. Выколотая ○ — <b>не входит</b>, круглая. Если штриховка уходит до края — там ∞.<br>Здесь: <b>${ivs(v)}</b>, то есть ${ineq(v)}.`,
explain2:`Иди по рисунку слева направо: ${isFinite(v.lo)?`начинается в ${nh(v.lo)} (${v.cl?'●':'○'})`:'идёт из −∞'}, ${isFinite(v.hi)?`заканчивается в ${nh(v.hi)} (${v.ch?'●':'○'})`:'уходит в +∞'}. Переводим: ● → [ ], ○ → ( ).`};});
G(1,()=>{let v;do{const a=R(-9,3)+pick([0,0.5]),b=a+R(2,7)+pick([0,0.5]);v=I(a,b,R(0,1),R(0,1));}while(intsIn(v).length<2);
const Z=intsIn(v);const q=R(0,2);const ans=q===0?Z[0]:q===1?Z[Z.length-1]:Z.length;const what=['наименьшее целое число','наибольшее целое число','количество целых чисел'][q];
return {type:'num',q:`Найди ${what} из промежутка <span class="m">${ivs(v)}</span>.`,ans,
hint:'Проверь концы: входят ли они и целые ли они.',
short:`Целые в ${ivs(v)}: ${Z.map(N).join(', ')}.`,
explain:`${ivs(v)} — это ${ineq(v)}.<br>Левый конец ${nh(v.lo)}: ${isInt(v.lo)?(v.cl?'целый и входит':'целый, но <b>не входит</b> (круглая скобка)'):'не целый'} → первое целое <b>${N(Z[0])}</b>.<br>Правый конец ${nh(v.hi)}: ${isInt(v.hi)?(v.ch?'целый и входит':'целый, но <b>не входит</b>'):'не целый'} → последнее целое <b>${N(Z[Z.length-1])}</b>.<br>Все целые: ${Z.map(N).join(', ')} — ${Z.length} ${plural(Z.length,'число','числа','чисел')}.<br>Ответ: <b>${N(ans)}</b>.`,
explain2:`Выпиши целые числа рядом с промежутком и вычеркни лишние: ${range(Math.floor(v.lo)-1,Math.ceil(v.hi)+1).map(z=>inIv(v,z)?`<b>${N(z)}</b>`:`<s>${N(z)}</s>`).join(' ')}. Жирные — входят.`,
pic:nl1([v])};});

/* L2 */
G(2,()=>{const r=ch('числа, которые входят в оба промежутка сразу',['все числа обоих промежутков вместе','числа, лежащие между промежутками','только концы промежутков']);
return {type:'choice',q:'Что такое <b>пересечение</b> двух промежутков?',...r,
short:'∩ — общая часть, «И».',
explain:`Пересечение (∩) — числа, которые входят <b>и</b> в первый, <b>и</b> во второй промежуток. На рисунке — там, где штриховки накладываются.<br>«Все числа вместе» — это объединение (∪).`,
explain2:`Ты свободен с 14 до 18, друг — с 16 до 20. Когда можно встретиться? Только в общее время: с 16 до 18. Это и есть пересечение.`};},false,true);
function twoIv(){for(;;){const a=R(-8,2),b=a+R(3,8),c=R(a+1,b-1),d=b+R(1,6);const A=I(a,b,R(0,1),R(0,1)),B=I(c,d,R(0,1),R(0,1));const sw=Math.random()<0.5;return sw?[B,A]:[A,B];}}
G(2,()=>{const [A,B]=twoIv();const X=inter(A,B);ok(X,'inter');const U=unionOv(A,B);
const r=ivChoice([X],[[U],[I(X.lo,X.hi,!X.cl,X.ch)],[I(X.lo,X.hi,X.cl,!X.ch)],[I(X.lo,X.hi,!X.cl,!X.ch)]]);
return {type:'choice',q:`Найди пересечение <span class="m">${ivs(A)} ∩ ${ivs(B)}</span>.`,opts:r.opts.map(M),ans:r.ans,
short:`Общая часть: ${ivs(X)}.`,
explain:`Рисуем оба промежутка один над другим:<div class="fig">${nl([{ivs:[A]},{ivs:[B],col:'var(--accent)',op:0.45}])}</div>Перекрываются они от ${nh(X.lo)} до ${nh(X.hi)}.<br>Концы: ${nh(X.lo)} ${X.cl?'входит в оба':'не входит хотя бы в один'} → «${X.cl?'[':'('}»; ${nh(X.hi)} ${X.ch?'входит в оба':'не входит хотя бы в один'} → «${X.ch?']':')'}».<br>Ответ: <b>${ivs(X)}</b>.<br>${ivs(U)} — это объединение, а не пересечение.`,
explain2:`Запиши как систему: { ${ineq(A)} ; ${ineq(B)} }. Левая граница — <b>бóльшая</b> из левых (${nh(X.lo)}), правая — <b>меньшая</b> из правых (${nh(X.hi)}). Конец входит, только если он входит в <b>оба</b> промежутка.`};});
G(2,()=>{const [A,B]=twoIv();const U=unionOv(A,B);const X=inter(A,B);
const r=ivChoice([U],[[X],[I(U.lo,U.hi,!U.cl,U.ch)],[I(U.lo,U.hi,U.cl,!U.ch)],[I(U.lo,U.hi,!U.cl,!U.ch)]]);
return {type:'choice',q:`Найди объединение <span class="m">${ivs(A)} ∪ ${ivs(B)}</span>.`,opts:r.opts.map(M),ans:r.ans,
short:`Всё заштрихованное: ${ivs(U)}.`,
explain:`Объединение — всё, что заштриховано хотя бы один раз:<div class="fig">${nl([{ivs:[A]},{ivs:[B],col:'var(--accent)',op:0.45}])}</div>От ${nh(U.lo)} до ${nh(U.hi)} без пропусков (промежутки перекрываются).<br>Концы берём от того промежутка, которому они принадлежат: ${nh(U.lo)} → «${U.cl?'[':'('}», ${nh(U.hi)} → «${U.ch?']':')'}».<br>Ответ: <b>${ivs(U)}</b>.`,
explain2:`«Объединение» = «ИЛИ»: число подходит, если оно хотя бы в одном промежутке. Самое левое подходящее — ${nh(U.lo)}${U.cl?'':' (но само не входит)'}, самое правое — ${nh(U.hi)}${U.ch?'':' (не входит)'}. Общую часть ${ivs(X)} второй раз не считаем — она уже внутри.`};});
G(2,()=>{const r0=R(-6,6);const empty=Math.random()<0.5;let A,B;
if(empty){const d=R(1,5);A=ray(pick(['<','≤']),r0);B=ray(pick(['>','≥']),r0+d);}else{const d=R(2,6);A=ray(pick(['>','≥']),r0);B=ray(pick(['<','≤']),r0+d);}
if(Math.random()<0.5)[A,B]=[B,A];const X=inter(A,B);
const right=X?sets([X]):'∅';const wr=[];const U=unionOv(A,B);
const cand=X?['∅',sets([U]),sets([I(X.lo,X.hi,!X.cl,!X.ch)]),sets([I(-INF,X.lo,0,!X.cl)])]:[sets([I(Math.min(A.hi,B.hi),Math.max(A.lo,B.lo),1,1)]),sets([A]),sets([B]),`(${nh(Math.min(A.hi,B.hi))}; ${nh(Math.max(A.lo,B.lo))})`];
cand.forEach(c=>{if(c!==right&&!wr.includes(c))wr.push(c);});const r=ch(right,wr.slice(0,3));
return {type:'choice',q:`Найди пересечение <span class="m">${ivs(A)} ∩ ${ivs(B)}</span>.`,opts:r.opts.map(M),ans:r.ans,
short:X?`Общая часть — ${right}.`:'Лучи смотрят в разные стороны и не встречаются: ∅.',
explain:`<div class="fig">${nl([{ivs:[A]},{ivs:[B],col:'var(--accent)',op:0.45}])}</div>${X?`Лучи перекрываются между ${nh(X.lo)} и ${nh(X.hi)}. Ответ: <b>${right}</b>.`:`Один луч идёт влево от ${nh(Math.min(A.hi,B.hi))}, другой — вправо от ${nh(Math.max(A.lo,B.lo))}. Общих точек <b>нет</b>. Ответ: <b>∅</b>.`}`,
explain2:X?`Система: { ${ineq(A)}; ${ineq(B)} } → ${ineq(X)}.`:`Система: { ${ineq(A)}; ${ineq(B)} }. Может ли число быть одновременно ${ineq(A).replace('x ','')} и ${ineq(B).replace('x ','')}? Нет — значит, пересечение пустое.`};});

/* L3 */
G(3,()=>{const k=R(2,6),m=k*nz(-6,6);const op=pick(OPS);const res=FLIP[op];
const r=ch(`x ${res} ${N(m/(-k))}`,[`x ${op} ${N(m/(-k))}`,`x ${res} ${N(m/k)}`,`x ${op} ${N(m/k)}`]);
return {type:'choice',q:`Какое правило применить и что получится? Разделим обе части неравенства <span class="m">−${k}x ${op} ${N(m)}</span> на −${k}:`,opts:r.opts.map(M),ans:r.ans,
short:`Делим на отрицательное — знак переворачиваем: x ${res} ${N(-m/k)}.`,
explain:`Делим на <b>отрицательное</b> число −${k} → знак «${op}» меняется на «${res}».<br>${N(m)} : (−${k}) = ${N(-m/k)}.<br>Ответ: <b>x ${res} ${N(-m/k)}</b>.`,
explain2:`Проверка: возьми x из ответа, например x = ${N(-m/k+(res==='>'||res==='≥'?1:-1))}: −${k}·${pn(-m/k+(res==='>'||res==='≥'?1:-1))} = ${N(-k*(-m/k+(res==='>'||res==='≥'?1:-1)))}, и ${N(-k*(-m/k+(res==='>'||res==='≥'?1:-1)))} ${op} ${N(m)} ✅. Значит, направление верное.`};},false,true);
G(3,()=>{let a,b,c,d,kk;const form=R(0,1);
for(;;){if(form===0){a=nz(-7,7);b=nz(-9,9);c=b+a*nz(-6,6);d=0;}else{a=nz(-6,6);d=nz(-6,6);if(a===d)continue;b=nz(-9,9);const x0=nz(-6,6);c=0;kk=(a-d)*x0+b;}break;}
const op=pick(OPS);let lhs,rhs,K,B;
if(form===0){lhs=lin(a,b);rhs=N(c);K=a;B=c-b;}else{lhs=lin(a,b);rhs=lin(d,kk);K=a-d;B=kk-b;}
const r0=B/K;const res=K>0?op:FLIP[op];const v=ray(res,r0);
const TOG={'<':'≤','≤':'<','>':'≥','≥':'>'};
const r=ivChoice([v],[[ray(FLIP[res],r0)],[ray(res,-r0)],[ray(FLIP[res],-r0)],[ray(TOG[res],r0)],[ray(FLIP[TOG[res]],r0)]]);
return {type:'choice',q:`Реши неравенство <span class="m">${lhs} ${op} ${rhs}</span>.`,opts:r.opts.map(M),ans:r.ans,
short:`${cx(K)}x ${op} ${N(B)} → x ${res} ${N(r0)}.`,
explain:`${form===1?`Иксы — влево, числа — вправо (переносим с противоположным знаком): ${cx(a)}x ${d>0?'−':'+'} ${cx(Math.abs(d))}x ${op} ${N(kk)} ${b>0?'−':'+'} ${Math.abs(b)}.`:`Переносим ${N(b)} вправо с противоположным знаком: ${cx(a)}x ${op} ${N(c)} ${b>0?'−':'+'} ${Math.abs(b)}.`}<br>${cx(K)}x ${op} ${N(B)}.<br>${K>0?`Делим на ${N(K)} > 0 — знак сохраняется`:`Делим на ${N(K)} < 0 — знак <b>переворачиваем</b>`}: x ${res} ${N(r0)}.<br>Ответ: <b>${ivs(v)}</b>.<div class="fig">${nl1([v])}</div>`,
explain2:`Проверка двумя числами. x = ${N(r0+(inIv(v,r0+1)?1:-1))} (из ответа): ${N(a*(r0+(inIv(v,r0+1)?1:-1))+b)} ${op} ${form===1?N(d*(r0+(inIv(v,r0+1)?1:-1))+kk):N(c)} ✅. x = ${N(r0+(inIv(v,r0+1)?-1:1))} (не из ответа): ${N(a*(r0+(inIv(v,r0+1)?-1:1))+b)} ${op} ${form===1?N(d*(r0+(inIv(v,r0+1)?-1:1))+kk):N(c)} — неверно ❌. Значит, направление правильное.`};});
G(3,()=>{let p,q,a,b,c,x0,K;for(;;){[p,q]=sample([2,3,4,5,6],2);a=nz(-6,6);b=nz(-6,6);x0=nz(-8,8);K=q-p;const num=K*x0+q*a-p*b;if(num%(p*q))continue;c=num/(p*q);if(c!==0)break;}
// (x+a)/p − (x+b)/q op c  →  K x op K x0
const op=pick(OPS);const res=K>0?op:FLIP[op];const v=ray(res,x0);
const Z=intsIn(I(res==='>'||res==='≥'?x0:x0-5,res==='>'||res==='≥'?x0+5:x0,res!=='>',res!=='<'));
const wantMin=res==='>'||res==='≥';const ans=wantMin?Z[0]:Z[Z.length-1];
const chk=x=>{const L=(x+a)/p-(x+b)/q;return op==='<'?L<c-1e-12:op==='>'?L>c+1e-12:op==='≤'?L<=c+1e-12:L>=c-1e-12;};ok(chk(ans)&&!chk(ans+(wantMin?-1:1)),'frac2');
return {type:'num',q:`Найди <b>${wantMin?'наименьшее':'наибольшее'}</b> целое решение неравенства <span class="m">${F(xp(a),p)} − ${F(xp(b),q)} ${op} ${N(c)}</span>.`,ans,
hint:`Умножь обе части на ${p*q} (это положительное число — знак не меняется).`,
short:`${cx(K)}x ${op} ${N(K*x0)} → x ${res} ${N(x0)} → ${wantMin?'наименьшее':'наибольшее'} целое ${N(ans)}.`,
explain:`Умножаем на ${p*q} > 0, знак сохраняется:<br>${q}(${xp(a)}) − ${p}(${xp(b)}) ${op} ${N(c*p*q)}<br>${lin(q,q*a)} − ${p}x ${-p*b>0?'+':'−'} ${Math.abs(p*b)} ${op} ${N(c*p*q)} → ${lin(K,q*a-p*b)} ${op} ${N(c*p*q)} → ${cx(K)}x ${op} ${N(K*x0)}.<br>${K>0?'Делим на '+K+' > 0':'Делим на '+N(K)+' < 0 — знак переворачиваем'}: <b>x ${res} ${N(x0)}</b>.<br>${wantMin?'Наименьшее':'Наибольшее'} целое: ${res.length===2?`${N(x0)} входит (знак нестрогий)`:`${N(x0)} не входит (знак строгий), берём ${N(ans)}`}. Ответ: <b>${N(ans)}</b>.`,
explain2:`Проверка подстановкой x = ${N(ans)}: ${F(N(ans+a),p)} − ${F(N(ans+b),q)} = ${N(Math.round(((ans+a)/p-(ans+b)/q)*1000)/1000)} ${op} ${N(c)} ✅. А x = ${N(ans+(wantMin?-1:1))}: ${N(Math.round(((ans+(wantMin?-1:1)+a)/p-(ans+(wantMin?-1:1)+b)/q)*1000)/1000)} — уже не подходит ❌.<div class="box err"><b>Частая ошибка</b>Забыть скобки: −${p}(${xp(b)}) = ${lin(-p,-p*b)} — минус касается обоих слагаемых.</div>`};});
G(3,()=>{const item=pick([['наушники',9500],['видеокарту',42000],['электросамокат',27000],['игровую приставку',35000],['велосипед',23000]]);
let s0,w,C;do{s0=R(1,20)*500;w=R(3,20)*100;C=item[1];}while(C<=s0+w*2||(C-s0)%w===0);
const n=Math.ceil((C-s0)/w);ok(s0+w*n>=C&&s0+w*(n-1)<C,'save');
return {type:'num',q:`У Артёма ${s0} ₽. Каждую неделю он откладывает ${w} ₽ на ${item[0]} за ${C} ₽. Через какое <b>наименьшее</b> число недель у него хватит денег?`,ans:n,
hint:`Составь неравенство: ${s0} + ${w}n ≥ ${C}.`,
short:`${s0} + ${w}n ≥ ${C} → n ≥ ${N(Math.round((C-s0)/w*1000)/1000)} → n = ${n}.`,
explain:`Через n недель будет ${s0} + ${w}n ₽. Нужно: ${s0} + ${w}n ≥ ${C}.<br>${w}n ≥ ${C-s0} → n ≥ ${F(C-s0,w)} ≈ ${N(Math.round((C-s0)/w*1000)/1000)}.<br>n — целое число недель, поэтому округляем <b>вверх</b>: <b>n = ${n}</b>.<div class="box err"><b>Ловушка</b>Округлить вниз до ${n-1}: тогда будет ${s0+w*(n-1)} ₽ — не хватит ${C-s0-w*(n-1)} ₽.</div>`,
explain2:`Проверка: через ${n-1} ${plural(n-1,'неделю','недели','недель')} — ${s0} + ${w}·${n-1} = ${s0+w*(n-1)} ₽ < ${C} ❌. Через ${n} — ${s0+w*n} ₽ ≥ ${C} ✅.`};});

/* L4 */
G(4,()=>{const r=ch('пересечение решений всех неравенств системы',['объединение решений всех неравенств','решение только первого неравенства','сумма неравенств системы']);
return {type:'choice',q:'Решение <b>системы</b> неравенств — это…',...r,
short:'Система = «и то, и другое» = пересечение.',
explain:`Число — решение системы, если оно подходит <b>всем</b> неравенствам сразу. Значит, берём <b>пересечение</b> решений.<br>Объединение было бы для «совокупности» (связка «или»).`,
explain2:`Фейс-контроль на концерт: «старше 14» <b>и</b> «есть билет». Пройдут только те, у кого выполнены оба условия, — пересечение двух групп.`};},false,true);
function linIneq(){const a=nz(-5,5),x0=nz(-7,7),b=nz(-9,9);const op=pick(OPS);const c=a*x0+b;return {a,b,c,op,x0,v:ray(a>0?op:FLIP[op],x0),txt:`${lin(a,b)} ${op} ${N(c)}`};}
G(4,()=>{let P,Q,X;for(let t=0;;t++){P=linIneq();Q=linIneq();if(P.x0===Q.x0)continue;X=inter(P.v,Q.v);const left=P.v.lo===-INF,lq=Q.v.lo===-INF;if(left!==lq&&X)break;if(left===lq&&t>50)break;}
X=inter(P.v,Q.v);const right=X?sets([X]):'∅';
const cand=[X?'∅':sets([I(Math.min(P.x0,Q.x0),Math.max(P.x0,Q.x0),1,1)]),sets([P.v]),sets([Q.v]),X?sets([I(X.lo,X.hi,!X.cl,!X.ch)]):sets([I(Math.min(P.x0,Q.x0),Math.max(P.x0,Q.x0),0,0)])];
const wr=[];cand.forEach(c=>{if(c!==right&&!wr.includes(c))wr.push(c);});const r=ch(right,wr.slice(0,3));
return {type:'choice',q:`Реши систему неравенств: <span class="m">{ ${P.txt} ; ${Q.txt} }</span>`,opts:r.opts.map(M),ans:r.ans,
short:`${ineq(P.v)} и ${ineq(Q.v)} → ${right}.`,
explain:`1) ${P.txt} → ${cx(P.a)}x ${P.op} ${N(P.c-P.b)} → <b>${ineq(P.v)}</b>${P.a<0?' (делили на отрицательное — знак перевернули)':''}.<br>2) ${Q.txt} → ${cx(Q.a)}x ${Q.op} ${N(Q.c-Q.b)} → <b>${ineq(Q.v)}</b>${Q.a<0?' (знак перевернули)':''}.<br>3) Пересечение:<div class="fig">${nl([{ivs:[P.v]},{ivs:[Q.v],col:'var(--accent)',op:0.45}])}</div>Ответ: <b>${right}</b>.`,
explain2:X?`Проверь число из ответа, например ${N(intsIn(I(X.lo,X.hi,X.cl,X.ch)).length?intsIn(X)[0]:X.lo)}: подставь в оба неравенства — оба верны. А числа за пределами ответа нарушают хотя бы одно.`:`Первое требует ${ineq(P.v)}, второе — ${ineq(Q.v)}. Таких чисел одновременно не бывает — штриховки не перекрываются. Ответ ∅.`};});
G(4,()=>{let k,n,lo,hi;for(;;){k=nz(-5,5);n=nz(-9,9);const a=nz(-5,5),b=a+R(1,5);lo=k*a+n;hi=k*b+n;if(k<0)[lo,hi]=[hi,lo];if(lo<hi){break;}}
const c1=R(0,1),c2=R(0,1);// lo (c1) kx+n (c2) hi
const s1=c1?'≤':'<',s2=c2?'≤':'<';
let L=(lo-n)/k,Rr=(hi-n)/k,cl=c1,chh=c2;if(k<0){[L,Rr]=[Rr,L];[cl,chh]=[chh,cl];}
const v=I(L,Rr,cl,chh);const r=ivChoice([v],[[I(L,Rr,!cl,!chh)],[I(-Rr,-L,cl,chh)],[I((lo+n)/k<(hi+n)/k?(lo+n)/k:(hi+n)/k,(lo+n)/k<(hi+n)/k?(hi+n)/k:(lo+n)/k,cl,chh)],[I(L,Rr,chh,cl)]]);
return {type:'choice',q:`Реши двойное неравенство <span class="m">${N(lo)} ${s1} ${lin(k,n)} ${s2} ${N(hi)}</span>.`,opts:r.opts.map(M),ans:r.ans,
short:`${N(lo-n)} ${s1} ${cx(k)}x ${s2} ${N(hi-n)} → ${ineq(v)}.`,
explain:`Действуем со всеми тремя частями сразу.<br>1) ${n>0?'Вычитаем '+n:'Прибавляем '+(-n)}: ${N(lo-n)} ${s1} ${cx(k)}x ${s2} ${N(hi-n)}.<br>2) Делим на ${N(k)}${k<0?' — <b>отрицательное</b>, оба знака переворачиваем':''}: ${k<0?`${nh((lo-n)/k)} ${c1?'≥':'>'} x ${c2?'≥':'>'} ${nh((hi-n)/k)}, то есть ${ineq(v)}`:ineq(v)}.<br>Ответ: <b>${ivs(v)}</b>.`,
explain2:`Проверь концы подстановкой: x = ${nh(L)} → ${lin(k,n)} = ${N(k*L+n)}; x = ${nh(Rr)} → ${N(k*Rr+n)}. Это как раз границы ${N(lo)} и ${N(hi)}. ${k<0?'При отрицательном k левый конец x даёт правую границу — поэтому концы «меняются местами».':''}`};});
G(4,()=>{const k=R(2,5),a=nz(-5,5);const none=Math.random()<0.5;const b=none?a-R(1,4):a+R(1,4);
// {x + a... } simple: {kx > k a ; x − b < 0 ... } construct: x > a and x < b
const p1=`${k}x ${a*k>=0?'−':'+'} ${Math.abs(a*k)} > 0`,p2=`${xp(-b)} < 0`;const X=inter(I(a,INF,0,0),I(-INF,b,0,0));
const right=X?'('+N(a)+'; '+N(b)+')':'нет решений';const r=ch(right,X?['нет решений',`(−∞; ${N(a)}) ∪ (${N(b)}; +∞)`,`[${N(a)}; ${N(b)}]`]:[`(${N(b)}; ${N(a)})`,`(−∞; ${N(b)})`,`(${N(a)}; +∞)`]);
return {type:'choice',q:`Реши систему <span class="m">{ ${p1} ; ${p2} }</span>.`,opts:r.opts.map(M),ans:r.ans,
short:`x > ${N(a)} и x < ${N(b)} → ${right}.`,
explain:`1) ${p1} → ${k}x > ${N(a*k)} → x > ${N(a)}.<br>2) ${p2} → x < ${N(b)}.<br>${X?`Числа больше ${N(a)} и меньше ${N(b)}: <b>(${N(a)}; ${N(b)})</b>.`:`Нужно x > ${N(a)} и одновременно x < ${N(b)}, но ${N(b)} < ${N(a)}. Таких чисел нет — <b>нет решений</b>.`}<div class="fig">${nl([{ivs:[I(a,INF,0,0)]},{ivs:[I(-INF,b,0,0)],col:'var(--accent)',op:0.45}])}</div>`,
explain2:X?`Проверь x = ${N((a+b)/2)}: оба неравенства верны ✅.`:`Ловушка — ответ (${N(b)}; ${N(a)}): возьми x = ${N((a+b)/2)} — оно меньше ${N(a)}, значит, первое неравенство не выполнено. Штриховки не перекрываются.`};});

/* L5 */
G(5,()=>{const a=R(-9,0),b=a+R(3,12);const r=ch(`${b-a+1}`,[`${b-a}`,`${b-a-1}`,`${b-a+2}`]);
return {type:'choice',q:`Как посчитать целые числа на отрезке? Сколько целых чисел на <span class="m">[${N(a)}; ${N(b)}]</span>?`,...r,
short:`b − a + 1 = ${N(b)} − ${pn(a)} + 1 = ${b-a+1}.`,
explain:`Правило: на отрезке [a; b] (a, b — целые) ровно <b>b − a + 1</b> целых чисел. Здесь ${N(b)} − ${pn(a)} + 1 = <b>${b-a+1}</b>.<br>«+1» — потому что оба конца входят.`,
explain2:`Забор: от столба ${N(a)} до столба ${N(b)} — ${b-a} пролётов, а столбов на один больше: ${b-a+1}. Маленький пример: [1; 3] — числа 1, 2, 3, это 3 − 1 + 1 = 3.`};},false,true);
G(5,()=>{let P,Q,X,Z;for(;;){P=linIneq();Q=linIneq();X=inter(P.v,Q.v);if(!X||!isFinite(X.lo)||!isFinite(X.hi))continue;Z=intsIn(X);if(Z.length>=1&&Z.length<=6)break;}
return {type:'set',q:`Найди все <b>целые</b> решения системы <span class="m">{ ${P.txt} ; ${Q.txt} }</span>.`,ans:Z,ph:'числа через «;»',
short:`${ineq(X)} → целые: ${Z.map(N).join('; ')}.`,
explain:`1) ${P.txt} → ${ineq(P.v)}.<br>2) ${Q.txt} → ${ineq(Q.v)}.<br>Вместе: <b>${ineq(X)}</b>.<br>Целые: ${X.cl?`${N(X.lo)} входит`:`${N(X.lo)} не входит`}, ${X.ch?`${N(X.hi)} входит`:`${N(X.hi)} не входит`} → <b>${Z.map(N).join('; ')}</b>.<div class="fig">${nl1([X])}</div>`,
explain2:`Проверь граничные числа подстановкой в оба неравенства: ${[X.lo,X.hi].map(x=>`x = ${N(x)}: ${inIv(X,x)?'подходит ✅':'не подходит ❌ (строгий знак)'}`).join('; ')}. Остальные целые между ними подходят точно.`};});
G(5,()=>{let lo,hi,k,n,Z,c1,c2,v;for(;;){k=pick([2,3,4,5,-2,-3]);n=nz(-7,7);lo=R(-15,5);hi=lo+R(4,14);c1=R(0,1);c2=R(0,1);let L=(lo-n)/k,Rr=(hi-n)/k,cl=c1,chh=c2;if(k<0){[L,Rr]=[Rr,L];[cl,chh]=[chh,cl];}v=I(L,Rr,cl,chh);Z=intsIn(v);if(Z.length>=2&&(!isInt(L)||!isInt(Rr)))break;}
Z.forEach(z=>{const t=k*z+n;ok((c1?t>=lo:t>lo)&&(c2?t<=hi:t<hi),'cnt');});
return {type:'num',q:`Сколько <b>целых</b> решений у двойного неравенства <span class="m">${N(lo)} ${c1?'≤':'<'} ${lin(k,n)} ${c2?'≤':'<'} ${N(hi)}</span>?`,ans:Z.length,
short:`${ineq(v)} → целые ${Z.map(N).join(', ')} — ${Z.length}.`,
explain:`${n>0?'Вычитаем '+n:'Прибавляем '+(-n)} и делим на ${N(k)}${k<0?' (отрицательное — знаки переворачиваем)':''}: <b>${ineq(v)}</b>.<br>Целые числа в этом промежутке: ${Z.map(N).join(', ')}.<br>Всего <b>${Z.length}</b>.`,
explain2:`Дробные концы удобно перевести в десятичные: ${nh(v.lo)} ≈ ${N(Math.round(v.lo*100)/100)}, ${nh(v.hi)} ≈ ${N(Math.round(v.hi*100)/100)}. Первое целое справа от левого конца — ${N(Z[0])}, последнее слева от правого — ${N(Z[Z.length-1])}. Количество: ${N(Z[Z.length-1])} − ${pn(Z[0])} + 1 = ${Z.length}.`};});

/* L6 */
G(6,()=>{const a=nz(-5,5);const r=ch(`расстояние на числовой прямой от x до ${N(a)}`,[`число x − ${pn(a)}, всегда`,`расстояние от x до нуля`,`расстояние от x до ${N(-a)}`]);
return {type:'choice',q:`Что означает <span class="m">|x ${a>0?'−':'+'} ${Math.abs(a)}|</span>?`,...r,
short:`|x − a| — расстояние до a; здесь a = ${N(a)}.`,
explain:`|x − a| — это <b>расстояние</b> между точками x и a на прямой. ${a<0?`Здесь x + ${-a} = x − (${N(a)}), значит, a = <b>${N(a)}</b> (знак меняется!).`:`Здесь a = ${N(a)}.`}<br>«Число x − a» неверно: модуль никогда не бывает отрицательным, а x − a бывает.`,
explain2:`Проверь: x = ${N(a+3)} → |${N(a+3)} ${a>0?'−':'+'} ${Math.abs(a)}| = 3, и до точки ${N(a)} действительно 3 шага. x = ${N(a-3)} → тоже 3: расстояние не зависит от того, слева ты или справа.`};},false,true);
G(6,()=>{const a=nz(-6,6),b=R(1,6),strict=Math.random()<0.5;const v=I(a-b,a+b,!strict,!strict);
const r=ivChoice([v],[[I(-a-b,-a+b,!strict,!strict)],[I(-INF,a-b,0,!strict),I(a+b,INF,!strict,0)],[I(a-b,a+b,strict,strict)],[I(-b,b,!strict,!strict)]]);
return {type:'choice',q:`Реши неравенство <span class="m">|x ${a>0?'−':'+'} ${Math.abs(a)}| ${strict?'<':'≤'} ${b}</span>.`,opts:r.opts.map(M),ans:r.ans,
short:`Не дальше ${b} от точки ${N(a)}: ${ineq(v)}.`,
explain:`|x ${a>0?'−':'+'} ${Math.abs(a)}| — расстояние от x до точки <b>${N(a)}</b>. Оно ${strict?'меньше':'не больше'} ${b}:<br>${N(a)} − ${b} ${strict?'<':'≤'} x ${strict?'<':'≤'} ${N(a)} + ${b} → <b>${ivs(v)}</b>.<div class="fig">${nl([{ivs:[v]}],{marks:[a]})}</div>`,
explain2:`Алгебраически: −${b} ${strict?'<':'≤'} x ${a>0?'−':'+'} ${Math.abs(a)} ${strict?'<':'≤'} ${b}. Прибавляем ${N(a)} ко всем частям: ${N(a-b)} ${strict?'<':'≤'} x ${strict?'<':'≤'} ${N(a+b)}.${a<0?` Частая ошибка — взять центр ${N(-a)} вместо ${N(a)}.`:''}`};});
G(6,()=>{const a=nz(-6,6),b=R(1,6),strict=Math.random()<0.5;const L=[I(-INF,a-b,0,!strict),I(a+b,INF,!strict,0)];
const r=ivChoice(L,[[I(a-b,a+b,0,0)],[I(-INF,-a-b,0,!strict),I(-a+b,INF,!strict,0)],[I(-INF,a-b,0,strict),I(a+b,INF,strict,0)],[I(a+b,INF,!strict,0)]]);
return {type:'choice',q:`Реши неравенство <span class="m">|x ${a>0?'−':'+'} ${Math.abs(a)}| ${strict?'>':'≥'} ${b}</span>.`,opts:r.opts.map(M),ans:r.ans,
short:`Дальше ${b} от ${N(a)}: два луча ${sets(L)}.`,
explain:`Расстояние от x до ${N(a)} ${strict?'больше':'не меньше'} ${b} → x уходит <b>влево</b> за ${N(a-b)} <b>или вправо</b> за ${N(a+b)}:<br>x ${strict?'<':'≤'} ${N(a-b)} или x ${strict?'>':'≥'} ${N(a+b)}.<br>Ответ: <b>${sets(L)}</b>.<div class="fig">${nl([{ivs:L}],{marks:[a]})}</div>`,
explain2:`Ловушка — ответ (${N(a-b)}; ${N(a+b)}): это точки, которые <b>близко</b> к ${N(a)}, а нужны далёкие. Проверь x = ${N(a)}: |0| = 0 — не ${strict?'больше':'≥'} ${b}, значит, середина в ответ не входит.`};});
G(6,()=>{const k=pick([2,3]);const m=nz(-9,9),n=R(3,11),strict=Math.random()<0.5;const Z=[];for(let x=-60;x<=60;x++){const t=Math.abs(k*x-m);if(strict?t<n:t<=n)Z.push(x);}
const L=(m-n)/k,Rr=(m+n)/k;
return {type:'num',q:`Сколько целых решений у неравенства <span class="m">|${k}x ${m>0?'−':'+'} ${Math.abs(m)}| ${strict?'<':'≤'} ${n}</span>?`,ans:Z.length,
hint:`Раскрой модуль двойным неравенством: −${n} ${strict?'<':'≤'} ${k}x ${m>0?'−':'+'} ${Math.abs(m)} ${strict?'<':'≤'} ${n}.`,
short:`${nh(L)} ${strict?'<':'≤'} x ${strict?'<':'≤'} ${nh(Rr)} → ${Z.map(N).join(', ')}.`,
explain:`−${n} ${strict?'<':'≤'} ${k}x ${m>0?'−':'+'} ${Math.abs(m)} ${strict?'<':'≤'} ${n}<br>${N(m-n)} ${strict?'<':'≤'} ${k}x ${strict?'<':'≤'} ${N(m+n)}<br>${nh(L)} ${strict?'<':'≤'} x ${strict?'<':'≤'} ${nh(Rr)}.<br>Целые: ${Z.map(N).join(', ')} — <b>${Z.length}</b>.`,
explain2:`Проверь крайние: x = ${N(Z[0])}: |${N(k*Z[0]-m)}| = ${Math.abs(k*Z[0]-m)} ${strict?'<':'≤'} ${n} ✅; x = ${N(Z[0]-1)}: ${Math.abs(k*(Z[0]-1)-m)} — уже нет ❌. Аналогично справа: ${N(Z[Z.length-1])} ✅, ${N(Z[Z.length-1]+1)} ❌.`};});

/* L7 — оценка */
G(7,()=>{const r=ch('почленно складывать',['почленно вычитать','почленно делить','почленно умножать, даже если части отрицательные']);
return {type:'choice',q:'Неравенства одного знака (например, a < b и c < d) всегда можно…',...r,
short:'a < b и c < d ⇒ a + c < b + d.',
explain:`Сложение работает всегда: a + c < b + d. Умножать можно только для <b>положительных</b> частей. А вычитать и делить почленно <b>нельзя</b> — вместо вычитания прибавляем противоположное (−d < −c).`,
explain2:`Контрпример к вычитанию: 5 < 6 и 1 < 4. «Вычтем»: 5 − 1 < 6 − 4, то есть 4 < 2 — неверно! А сложение: 6 < 10 — верно.`};},false,true);
function bounds(){const a1=R(-3,6),a2=a1+R(1,4),b1=R(1,5),b2=b1+R(1,4);return {a1,a2,b1,b2};}
const dbl=(l,e,h)=>`${l} < ${e} < ${h}`;
G(7,()=>{let a1,a2,b1,b2;for(;;){({a1,a2,b1,b2}=bounds());if(a1-b1!==a1-b2&&a2-b2!==a2-b1)break;}
const right=dbl(N(a1-b2),'a − b',N(a2-b1));const w=[...new Set([dbl(N(a1-b1),'a − b',N(a2-b2)),dbl(N(a1+b1),'a − b',N(a2+b2)),dbl(N(a1-b2),'a − b',N(a2-b2)),dbl(N(a1-b1),'a − b',N(a2-b1)),dbl(N(-b2),'a − b',N(a2))])].filter(s=>s!==right);
const r=ch(right,w.slice(0,3));
return {type:'choice',q:`Известно: <span class="m">${N(a1)} < a < ${N(a2)}</span>, <span class="m">${N(b1)} < b < ${N(b2)}</span>. Оцени a − b.`,opts:r.opts.map(M),ans:r.ans,
short:`−${b2} < −b < −${b1}; складываем: ${N(a1-b2)} < a − b < ${N(a2-b1)}.`,
explain:`Вычитать неравенства нельзя. Делаем a − b = a + (−b).<br>1) Умножаем ${N(b1)} < b < ${N(b2)} на −1 (знаки переворачиваем): −${b2} < −b < −${b1}.<br>2) Складываем с ${N(a1)} < a < ${N(a2)}: ${N(a1)} − ${b2} < a − b < ${N(a2)} − ${b1}.<br>Ответ: <b>${right}</b>.<div class="box err"><b>Типичная ошибка</b>«Вычесть почленно»: ${dbl(N(a1-b1),'a − b',N(a2-b2))}. Проверка опровергает: a = ${N(a1+0.1)}, b = ${N(b2-0.1)} → a − b = ${N(Math.round((a1-b2+0.2)*10)/10)}.</div>`,
explain2:`Логика: a − b <b>самое маленькое</b>, когда a маленькое, а b <b>большое</b>: ${N(a1)} − ${b2} = ${N(a1-b2)}. <b>Самое большое</b> — когда a большое, а b маленькое: ${N(a2)} − ${b1} = ${N(a2-b1)}. Вот и границы.`};});
G(7,()=>{const {a1,a2,b1,b2}=bounds();const kk=R(2,4),mm=R(2,4);const lo=kk*a1+mm*b1,hi=kk*a2+mm*b2;
return {type:'num',q:`Известно: <span class="m">${N(a1)} < a < ${N(a2)}</span>, <span class="m">${N(b1)} < b < ${N(b2)}</span>. Найди <b>наименьшее целое</b> значение, которое может принимать выражение <span class="m">${kk}a + ${mm}b</span>.`,ans:lo+1,
hint:`Оцени ${kk}a и ${mm}b отдельно и сложи.`,
short:`${lo} < ${kk}a + ${mm}b < ${hi} → наименьшее целое ${lo+1}.`,
explain:`Умножаем на положительные числа (знаки не меняются): ${N(kk*a1)} < ${kk}a < ${N(kk*a2)}, ${mm*b1} < ${mm}b < ${mm*b2}.<br>Складываем: <b>${N(lo)} < ${kk}a + ${mm}b < ${N(hi)}</b>.<br>Неравенство строгое, ${N(lo)} не достигается → наименьшее целое <b>${N(lo+1)}</b>.`,
explain2:`Можно ли получить ${N(lo+1)}? Да: a = ${N(a1)} + ${F(1,2*kk)}, b = ${N(b1)} + ${F(1,2*mm)} → ${kk}a + ${mm}b = ${N(lo)} + ${F(1,2)} + ${F(1,2)} = ${N(lo+1)}. А ${N(lo)} — никак: для этого нужно a = ${N(a1)} и b = ${N(b1)}, а концы не входят.`};});
G(7,()=>{const a1=R(2,6),a2=a1+R(1,4),b1=R(1,4),b2=b1+R(1,4);const prod=Math.random()<0.5;
let right,w,ex;if(prod){right=dbl(N(a1*b1),'ab',N(a2*b2));w=[dbl(N(Math.min(a1*b2,a2*b1)),'ab',N(Math.max(a1*b2,a2*b1))),dbl(N(a1+b1),'ab',N(a2+b2)),dbl(N(a1*b1),'ab',N(a2*b1))];}
else{right=`${nh(a1/b2)} < ${F('a','b')} < ${nh(a2/b1)}`;w=[`${nh(a1/b1)} < ${F('a','b')} < ${nh(a2/b2)}`,`${nh(a1-b2)} < ${F('a','b')} < ${nh(a2-b1)}`,`${nh(a1/b2)} < ${F('a','b')} < ${nh(a2/b2)}`];}
w=[...new Set(w)].filter(s=>s!==right);while(w.length<3)w.push(prod?dbl(N(a1*b1-w.length),'ab',N(a2*b2)):`0 < ${F('a','b')} < ${nh(a2/b1+w.length)}`);
const r=ch(right,w.slice(0,3));
return {type:'choice',q:`Известно: <span class="m">${a1} < a < ${a2}</span>, <span class="m">${b1} < b < ${b2}</span>. Оцени ${prod?'произведение ab':'частное '+F('a','b')}.`,opts:r.opts.map(M),ans:r.ans,
short:prod?`Все части положительные — перемножаем: ${right}.`:`a/b = a · 1/b; ${F(1,b2)} < ${F(1,'b')} < ${F(1,b1)}.`,
explain:prod?`Все части <b>положительные</b>, поэтому неравенства можно почленно перемножить: ${a1}·${b1} < ab < ${a2}·${b2}.<br>Ответ: <b>${right}</b>.`:`Делить почленно нельзя. Пишем ${F('a','b')} = a · ${F(1,'b')}.<br>1) ${b1} < b < ${b2} → ${F(1,b2)} < ${F(1,'b')} < ${F(1,b1)} (у положительных при переходе к обратным знаки меняются).<br>2) Перемножаем с ${a1} < a < ${a2}: ${F(a1,b2)} < ${F('a','b')} < ${F(a2,b1)}.<br>Ответ: <b>${right}</b>.`,
explain2:prod?`Наименьшее произведение — когда оба множителя наименьшие, наибольшее — когда оба наибольшие. Это работает только для положительных: с отрицательными «−5 · −5 = 25» всё ломает.`:`Дробь ${F('a','b')} <b>меньше всего</b>, когда числитель маленький (${a1}), а знаменатель большой (${b2}). <b>Больше всего</b> — числитель большой (${a2}), знаменатель маленький (${b1}).`};});

/* L8 — доказательство */
G(8,()=>{const r=ch('a² + b² − 2ab = (a − b)² ≥ 0',['a² ≥ a и b² ≥ b','a и b всегда положительные','(a + b)² > a² + b²']);
return {type:'choice',q:'Почему <span class="m">a² + b² ≥ 2ab</span> для <b>любых</b> чисел a и b?',opts:r.opts.map(M),ans:r.ans,
short:'Разность равна квадрату, а квадрат ≥ 0.',
explain:`Рассмотрим разность: a² + b² − 2ab = (a − b)². Квадрат любого числа ≥ 0, значит, и разность ≥ 0, то есть a² + b² ≥ 2ab. Равенство — только при a = b.<br>Остальные варианты неверны: a² ≥ a ложно при a = 0,5; a и b могут быть отрицательными; (a + b)² > a² + b² ложно при ab < 0.`,
explain2:`Проверь: a = 3, b = −2: 9 + 4 = 13 ≥ 2·3·(−2) = −12 ✅, а разность 13 − (−12) = 25 = (3 − (−2))² ✅. Формула сама «показывает» квадрат.`};},false,true);
G(8,()=>{const r=ch(`${F('a + b',2)} ≥ ${H.sqrt('ab')}`,[`${F('a + b',2)} ≤ ${H.sqrt('ab')}`,`${F('a + b',2)} = ${H.sqrt('ab')}`,`${H.sqrt('a + b')} ≥ ab`]);
return {type:'choice',q:'Допиши: для любых неотрицательных a и b среднее арифметическое и среднее геометрическое связаны так…',...r,
short:'Среднее арифметическое не меньше среднего геометрического.',
explain:`${F('a + b',2)} ≥ ${H.sqrt('ab')} при a, b ≥ 0, равенство при a = b.<br>Почему: ${F('a + b',2)} − ${H.sqrt('ab')} = ${F('(√a − √b)²',2)} ≥ 0.`,
explain2:`Числа 4 и 16: среднее арифметическое (4 + 16) : 2 = 10, среднее геометрическое ${H.sqrt(64)} = 8. 10 ≥ 8 ✅. Для 9 и 9: оба средних = 9 — равенство при a = b.`};},false,true);
G(8,()=>{const c=nz(-7,7);const right=`a² ${c>0?'−':'+'} ${2*Math.abs(c)}a + ${c*c} = (a ${c>0?'−':'+'} ${Math.abs(c)})² ≥ 0`;
const r=ch(right,[`a² ≥ 0 и ${c*c} ≥ 0, значит, сумма ≥ ${N(2*c)}a`,`при a = ${c} получается равенство, значит, верно всегда`,`a² + ${c*c} ≥ ${c*c} ≥ ${N(2*c)}a`]);
return {type:'choice',q:`Какой шаг — ключ к доказательству неравенства <span class="m">a² + ${c*c} ≥ ${N(2*c)}a</span> для всех a?`,opts:r.opts.map(M),ans:r.ans,
short:`Перенесли всё влево — получили полный квадрат.`,
explain:`Переносим всё в одну часть: a² ${c>0?'−':'+'} ${2*Math.abs(c)}a + ${c*c} ≥ 0. Это полный квадрат: (a ${c>0?'−':'+'} ${Math.abs(c)})² ≥ 0 — верно всегда. ∎<br>«Проверили одно число» — не доказательство: нужно для <b>всех</b> a. «${c*c} ≥ ${N(2*c)}a» неверно, например, при a = ${100*Math.sign(c)}.`,
explain2:`Это частный случай a² + b² ≥ 2ab при b = ${Math.abs(c)}: a² + ${Math.abs(c)}² ≥ 2·${Math.abs(c)}·${c>0?'a':'(−a)'}. Ищи в неравенстве «квадрат + квадрат ≥ удвоенное произведение».`};});
G(8,()=>{const k=R(2,9);
return {type:'num',q:`Найди наименьшее значение выражения <span class="m">x + ${F(k*k,'x')}</span> при x > 0.`,ans:2*k,
hint:'Среднее арифметическое ≥ среднего геометрического.',
short:`x + ${F(k*k,'x')} ≥ 2√${k*k} = ${2*k}, равенство при x = ${k}.`,
explain:`По неравенству о средних для x и ${F(k*k,'x')}: ${F(`x + ${k*k}/x`,2)} ≥ ${H.sqrt(`x · ${k*k}/x`)} = ${H.sqrt(k*k)} = ${k}.<br>Значит, x + ${F(k*k,'x')} ≥ <b>${2*k}</b>. Достигается при x = ${F(k*k,'x')}, т. е. x = ${k}: ${k} + ${k} = ${2*k}.`,
explain2:`Проверь соседей: x = ${k-1}: ${N(Math.round((k-1+k*k/(k-1))*100)/100)}; x = ${k}: ${2*k}; x = ${k+1}: ${N(Math.round((k+1+k*k/(k+1))*100)/100)}. Меньше ${2*k} не получается. Другой способ: x + ${F(k*k,'x')} − ${2*k} = ${F(`(x − ${k})²`,'x')} ≥ 0.`};});
G(8,()=>{const s=R(4,20);const P=4*s;const pet=pick(['щенка','кроликов','козы','черепахи']);
return {type:'num',q:`У Артёма ${P} м сетки. Он хочет огородить прямоугольный загон для ${pet} наибольшей площади. Какой будет эта площадь (м²)?`,ans:s*s,
hint:`a + b = ${P/2}. По неравенству о средних ab ≤ ((a + b) : 2)².`,
short:`a + b = ${2*s}, ab ≤ ${s}² = ${s*s}; квадрат ${s} × ${s}.`,
explain:`Стороны a и b: 2(a + b) = ${P} → a + b = ${2*s}.<br>${H.sqrt('ab')} ≤ ${F('a + b',2)} = ${s} → ab ≤ ${s*s}.<br>Максимум <b>${s*s} м²</b> — при a = b = ${s} (квадрат).`,
explain2:`Попробуй разные загоны: ${s-3} × ${s+3} = ${(s-3)*(s+3)}, ${s-1} × ${s+1} = ${s*s-1}, ${s} × ${s} = ${s*s}. Заметь: (s − d)(s + d) = s² − d² — чем меньше «перекос» d, тем больше площадь.`};});
G(8,()=>{let m,n;do{m=R(1,9);n=R(1,9);}while(m===n);const a=m*m,b=n*n;const d=(a+b)/2-m*n;ok(near(d,(m-n)**2/2),'amgm');
return {type:'num',q:`На сколько среднее арифметическое чисел ${a} и ${b} больше их среднего геометрического?`,ans:d,
short:`${N((a+b)/2)} − ${m*n} = ${N(d)}.`,
explain:`Среднее арифметическое: (${a} + ${b}) : 2 = ${N((a+b)/2)}.<br>Среднее геометрическое: ${H.sqrt(`${a} · ${b}`)} = ${H.sqrt(a*b)} = ${m*n}.<br>Разность: ${N((a+b)/2)} − ${m*n} = <b>${N(d)}</b>.`,
explain2:`Формула: ${F('a + b',2)} − ${H.sqrt('ab')} = ${F('(√a − √b)²',2)} = ${F(`(${m} − ${n})²`,2)} = ${F((m-n)**2,2)} = ${N(d)} ✅. Разность всегда ≥ 0 — вот и доказательство неравенства о средних.`};});

/* L9 — ★ */
G(9,()=>{const r=ch('только при a = b',['при любых a и b','только при a = 0','никогда']);
return {type:'choice',q:`Когда в неравенстве <span class="m">${F('a + b',2)} ≥ ${H.sqrt('ab')}</span> (a, b ≥ 0) достигается <b>равенство</b>?`,...r,
short:'(√a − √b)² = 0 ⇔ a = b.',
explain:`${F('a + b',2)} − ${H.sqrt('ab')} = ${F('(√a − √b)²',2)}. Это ноль только при √a = √b, то есть <b>a = b</b>. Именно поэтому максимум площади — у квадрата, а минимум x + ${F('k²','x')} — при x = k.`,
explain2:'Проверь: a = b = 7 → 7 = 7 ✅. a = 0, b = 4 → 2 ≥ 0, не равенство. «Только при a = 0» — неверно.'};},true,true);
G(9,()=>{const p=nz(-6,6),q=R(-5,9);const b=-2*p,c=p*p+q;
return {type:'num',q:`Найди наименьшее значение выражения <span class="m">x² ${b>0?'+':'−'} ${Math.abs(b)}x ${c>=0?'+':'−'} ${Math.abs(c)}</span>.`,ans:q,
hint:'Выдели полный квадрат.',
short:`(x ${p>0?'−':'+'} ${Math.abs(p)})² ${q>=0?'+':'−'} ${Math.abs(q)} ≥ ${N(q)}.`,
explain:`x² ${b>0?'+':'−'} ${Math.abs(b)}x ${c>=0?'+':'−'} ${Math.abs(c)} = (x² ${b>0?'+':'−'} ${Math.abs(b)}x + ${p*p}) ${q>=0?'+':'−'} ${Math.abs(q)} = (x ${p>0?'−':'+'} ${Math.abs(p)})² ${q>=0?'+':'−'} ${Math.abs(q)}.<br>Квадрат ≥ 0, поэтому выражение ≥ ${N(q)}, и при x = ${N(p)} равно ${N(q)}.<br>Ответ: <b>${N(q)}</b>.`,
explain2:`Проверь значения: x = ${N(p-1)} → ${N((p-1)**2+b*(p-1)+c)}; x = ${N(p)} → ${N(q)}; x = ${N(p+1)} → ${N((p+1)**2+b*(p+1)+c)}. Минимум в «середине» — при x = ${N(p)}.`};},true);
G(9,()=>{const a=R(1,6),b=R(1,6);const c=a+b+2*R(1,4)+R(0,1);const Z=[];for(let x=-100;x<=100;x++)if(Math.abs(x-a)+Math.abs(x+b)<=c)Z.push(x);
const extra=(c-(a+b))/2;
return {type:'num',q:`Сколько целых решений у неравенства <span class="m">|x − ${a}| + |x + ${b}| ≤ ${c}</span>?`,ans:Z.length,
hint:`|x − ${a}| + |x + ${b}| — сумма расстояний от x до точек ${a} и −${b}.`,
short:`${nh(-b-extra)} ≤ x ≤ ${nh(a+extra)} → ${Z.length} целых.`,
explain:`Сумма расстояний от x до точек −${b} и ${a}.<br>• Между ними (−${b} ≤ x ≤ ${a}) сумма постоянна = ${a+b} ≤ ${c} ✅.<br>• Если выйти за точку на t, сумма станет ${a+b} + 2t. Нужно ${a+b} + 2t ≤ ${c} → t ≤ ${nh(extra)}.<br>Итого: ${nh(-b-extra)} ≤ x ≤ ${nh(a+extra)}.<br>Целые: от ${N(Z[0])} до ${N(Z[Z.length-1])} — <b>${Z.length}</b>.`,
explain2:`Проверь крайние: x = ${N(Z[Z.length-1])}: ${Math.abs(Z[Z.length-1]-a)} + ${Math.abs(Z[Z.length-1]+b)} = ${Math.abs(Z[Z.length-1]-a)+Math.abs(Z[Z.length-1]+b)} ≤ ${c} ✅; x = ${N(Z[Z.length-1]+1)}: ${Math.abs(Z[Z.length-1]+1-a)+Math.abs(Z[Z.length-1]+1+b)} > ${c} ❌. Слева аналогично: ${N(Z[0])} ✅, ${N(Z[0]-1)} ❌.`};},true);
G(9,()=>{const n=R(2020,2030);const A=`${F(n,n+1)}`,B=`${F(n+1,n+2)}`;const r=ch(`${B} больше`,[`${A} больше`,'они равны','сравнить нельзя без калькулятора']);
ok(n/(n+1)<(n+1)/(n+2),'cmp');
return {type:'choice',q:`Что больше: <span class="m">${A}</span> или <span class="m">${B}</span>?`,opts:r.opts.map(M),ans:r.ans,
short:`${A} = 1 − ${F(1,n+1)}, ${B} = 1 − ${F(1,n+2)}; второе «отнимает» меньше.`,
explain:`${A} = 1 − ${F(1,n+1)}, ${B} = 1 − ${F(1,n+2)}.<br>${F(1,n+2)} < ${F(1,n+1)}, значит, из 1 во втором случае вычитают <b>меньше</b> → ${B} <b>больше</b>.`,
explain2:`Через разность: ${B} − ${A} = ${F(`${n+1}² − ${n}·${n+2}`,`${n+1}·${n+2}`)} = ${F(1,`${n+1}·${n+2}`)} > 0 (ведь (n + 1)² − n(n + 2) = 1). На маленьких числах: ${F(1,2)} < ${F(2,3)} < ${F(3,4)} — растут к 1.`};},true);
G(9,()=>{ok(31n**11n<17n**14n,'31^11<17^14');const r=ch('17¹⁴',['31¹¹','они равны','сравнить нельзя']);
return {type:'choice',q:'Что больше: <span class="m">31¹¹</span> или <span class="m">17¹⁴</span>? (Олимпиадная классика.)',opts:r.opts.map(M),ans:r.ans,
short:'31¹¹ < 32¹¹ = 2⁵⁵ < 2⁵⁶ = 16¹⁴ < 17¹⁴.',
explain:`Ищем «мостик» — степени двойки:<br>31¹¹ < 32¹¹ = (2⁵)¹¹ = 2⁵⁵.<br>17¹⁴ > 16¹⁴ = (2⁴)¹⁴ = 2⁵⁶.<br>2⁵⁵ < 2⁵⁶, поэтому 31¹¹ < 2⁵⁵ < 2⁵⁶ < 17¹⁴. Ответ: <b>17¹⁴ больше</b>.`,
explain2:`Почему не 31 > 17 → «31¹¹ больше»? Показатели разные: у 17 их на 3 больше. Три лишних множителя по 17 (это 4913!) перевешивают. Проверка компьютером: 31¹¹ ≈ 2,5·10¹⁶, 17¹⁴ ≈ 1,7·10¹⁷.`};},true);
G(9,()=>{const k=R(1,5);let best=1e9;for(let a=0.05;a<=10;a+=0.05){const b=k*a;best=Math.min(best,(a+b)*(1/a+k*k/b));}ok(Math.abs(best-(k+1)**2)<1e-6,'cs');
const ex=k===1?`(a + b)(${F(1,'a')} + ${F(1,'b')})`:`(a + b)(${F(1,'a')} + ${F(k*k,'b')})`;
return {type:'num',q:`Найди наименьшее значение выражения <span class="m">${ex}</span> при a > 0, b > 0.`,ans:(k+1)**2,
hint:'Раскрой скобки и найди пару слагаемых вида «t + c/t».',
short:`= ${1+k*k} + ${F('b','a')} + ${F(k*k+'a','b')} ≥ ${1+k*k} + ${2*k} = ${(k+1)**2}.`,
explain:`Раскрываем: ${ex} = 1 + ${F((k===1?'':k*k)+'a','b')} + ${F('b','a')} + ${k*k} = ${1+k*k} + (${F('b','a')} + ${F((k===1?'':k*k)+'a','b')}).<br>По неравенству о средних: ${F('b','a')} + ${F((k===1?'':k*k)+'a','b')} ≥ 2${H.sqrt(k*k)} = ${2*k}.<br>Итого ≥ ${1+k*k} + ${2*k} = <b>${(k+1)**2}</b>; достигается при b = ${k===1?'':k}a (например, a = 1, b = ${k}).`,
explain2:`Проверка: a = 1, b = ${k}: (1 + ${k})(1 + ${F(k*k,k)}) = ${k+1} · ${k+1} = ${(k+1)**2}. Попробуй a = 1, b = ${k+1}: (${k+2})(1 + ${F(k*k,k+1)}) = ${N(Math.round((k+2)*(1+k*k/(k+1))*100)/100)} — больше.`};},true);
G(9,()=>{let x1,x2,y1,y2;do{x1=R(-4,3);x2=x1+R(2,5);y1=R(-3,4);y2=y1+R(2,5);}while(!(x1-y2<0&&x2-y1>0));
const lo=x1-y2,hi=x2-y1;const ans=Math.max(lo*lo,hi*hi);let bf=0;for(let x=x1;x<=x2;x+=0.5)for(let y=y1;y<=y2;y+=0.5)bf=Math.max(bf,(x-y)**2);ok(near(bf,ans),'maxsq');
const trap=Math.max((x2-y2)**2,(x1-y1)**2);
return {type:'num',q:`Известно: <span class="m">${N(x1)} ≤ x ≤ ${N(x2)}</span>, <span class="m">${N(y1)} ≤ y ≤ ${N(y2)}</span>. Найди наибольшее значение <span class="m">(x − y)²</span>.`,ans,
hint:'Сначала оцени x − y, а потом подумай, где квадрат наибольший.',
short:`${N(lo)} ≤ x − y ≤ ${N(hi)} → max (x − y)² = ${ans}.`,
explain:`1) x − y = x + (−y): ${N(-y2)} ≤ −y ≤ ${N(-y1)} → <b>${N(lo)} ≤ x − y ≤ ${N(hi)}</b>.<br>2) Квадрат тем больше, чем дальше число от нуля. Самое далёкое от нуля — ${Math.abs(lo)>=Math.abs(hi)?N(lo):N(hi)}.<br>Ответ: (${N(Math.abs(lo)>=Math.abs(hi)?lo:hi)})² = <b>${ans}</b>.<div class="box err"><b>Ловушка</b>Возводить в квадрат концы «как есть»: ${pn(lo)}² ≤ (x − y)² ≤ ${pn(hi)}² неверно — внутри есть 0, и квадрат может быть 0.</div>`,
explain2:`Достигается при ${Math.abs(lo)>=Math.abs(hi)?`x = ${N(x1)}, y = ${N(y2)}`:`x = ${N(x2)}, y = ${N(y1)}`}: (${Math.abs(lo)>=Math.abs(hi)?`${N(x1)} − ${pn(y2)}`:`${N(x2)} − ${pn(y1)}`})² = ${ans}. Наименьшее же значение (x − y)² здесь 0 (при x = y).`};},true);

/* ---------- widgets ---------- */
function onTheory(root){
  const f=root.querySelector('#w-flip');
  if(f){f.innerHTML=`<b>Умножь неравенство 2 < 5 на число k</b><label>k = <input type="range" id="fk" min="-5" max="5" value="3"><output id="fko"></output></label><div id="fout" style="font-size:18px;margin-top:6px"></div>`;
    const k=f.querySelector('#fk');const u=()=>{const v=+k.value;f.querySelector('#fko').textContent=N(v);const a=2*v,b=5*v;const s=a<b?'<':a>b?'>':'=';
      f.querySelector('#fout').innerHTML=`2·${pn(v)} ${s} 5·${pn(v)} → <b>${N(a)} ${s} ${N(b)}</b> ${v>0?'— знак сохранился ✅':v<0?'— знак <b>перевернулся</b>! 🔄':'— стало равенство: на 0 умножать бессмысленно'}`;};k.oninput=u;u();}
  const w=root.querySelector('#w-iv');
  if(w){w.innerHTML=`<b>Собери промежуток</b>
  <label>Левый конец a: <input type="range" id="ia" min="-8" max="8" value="-2"><output id="iao"></output></label>
  <label>Правый конец b: <input type="range" id="ib" min="-8" max="8" value="4"><output id="ibo"></output></label>
  <label><input type="checkbox" id="ica" checked> a входит (≤)</label>
  <label><input type="checkbox" id="icb"> b входит (≤)</label>
  <label><input type="checkbox" id="iia"> слева −∞</label>
  <label><input type="checkbox" id="iib"> справа +∞</label>
  <div id="ipic" class="fig" style="margin:6px 0"></div><div id="iout" style="line-height:1.7"></div>`;
    const g=id=>w.querySelector('#'+id);
    const u=()=>{let a=+g('ia').value,b=+g('ib').value;g('iao').textContent=N(a);g('ibo').textContent=N(b);
      const lo=g('iia').checked?-INF:a,hi=g('iib').checked?INF:b;
      if(lo>hi||(lo===hi&&!(g('ica').checked&&g('icb').checked))){g('ipic').innerHTML='';g('iout').innerHTML='Левый конец правее правого — таких x нет: <b>∅</b>.';return;}
      const v=I(lo,hi,g('ica').checked,g('icb').checked);g('ipic').innerHTML=nl1([v]);
      const Z=isFinite(lo)&&isFinite(hi)?intsIn(v):null;
      g('iout').innerHTML=`Неравенство: <b>${ineq(v)}</b><br>Промежуток: <b>${ivs(v)}</b><br>Целые числа: ${Z?(Z.length?Z.map(N).join(', ')+` (${Z.length} шт.)`:'нет'):'бесконечно много'}`;};
    w.querySelectorAll('input').forEach(i=>i.oninput=u);u();}
}

window.TOPIC={id:'a8_inequalities',title:'Неравенства',subtitle:'Алгебра · 8 класс',
intro:`<p>Свойства неравенств (и коварный минус!), промежутки на прямой, линейные неравенства и системы, модуль, оценка выражений и доказательства. В конце — олимпиадные задачи.</p>`,
theory,symbols,figs:{},onTheory,
levels:['Числовые неравенства и свойства','Числовые промежутки','Пересечение и объединение','Линейные неравенства','Системы и двойные неравенства','Целые решения','Неравенства с модулем','Оценка выражений','Доказательство неравенств','★ Олимпиадные задачи'],
gens};
})();
