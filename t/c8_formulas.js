(function(){
const {R,pick,shuffle,sample,range}=H;
const N=H.num;
const C=f=>H.chem(f).replace(/NaN/g,'Na&#8288;N');
const rd=(x,d)=>{const k=Math.pow(10,d);return Math.round(x*k)/k;};
const gens=[];
const G=(lvl,make,o)=>{o=o||{};gens.push({lvl,star:o.star,rule:o.rule,make:()=>{for(let i=0;i<500;i++){const t=make();if(t){if(t.type==='num')t.ans=Math.round(t.ans*1e9)/1e9;return t;}}return null;}});};
const CH=(q,correct,wrongs,extra)=>{const opts=shuffle([correct,...wrongs]);if(new Set(opts).size!==opts.length)return null;return Object.assign({type:'choice',q,opts,ans:opts.indexOf(correct)},extra||{});};
const RULE=(lvl,q,correct,wrongs,extra)=>G(lvl,()=>CH(q,correct,wrongs,extra),{rule:true});
/* numeric answer rounded to d decimals; tolerance = a bit more than half of the last kept digit */
const NUM=(q,v,d,extra)=>{const a=rd(v,d);if(!isFinite(a)||a===0)return null;const exact=Math.abs(a-v)<1e-9;
  return Object.assign({type:'num',q:q+(exact?'':[' Округли до целых.',' Округли до десятых.',' Округли до сотых.',' Округли до тысячных.'][d]),ans:a,tol:0.6*Math.pow(10,-d)/Math.abs(a)},extra||{});};
const SV=(w,h,inner,lab)=>`<svg viewBox="0 0 ${w} ${h}" width="${w}" role="img" aria-label="${lab||'Рисунок'}" style="font-family:system-ui,sans-serif;max-width:100%">${inner}</svg>`;
const T=(x,y,s,o)=>{o=o||{};return `<text x="${x}" y="${y}" text-anchor="${o.a||'middle'}" font-size="${o.fs||14}" font-weight="${o.fw||600}" fill="${o.c||'var(--ink)'}">${s}</text>`;};
const ROM=['0','I','II','III','IV','V','VI','VII','VIII'];
const KEYS=['₂','₃','₄','₅','₇','(',')'];

/* ---------- school table of relative atomic masses ---------- */
const AR={H:1,He:4,Li:7,C:12,N:14,O:16,F:19,Ne:20,Na:23,Mg:24,Al:27,Si:28,P:31,S:32,Cl:35.5,Ar:40,K:39,Ca:40,Cr:52,Mn:55,Fe:56,Cu:64,Zn:65,Br:80,Ag:108,I:127,Ba:137,Hg:201,Pb:207};
/* parse formula: Al2(SO4)3, CuSO4·5H2O → {Al:2,S:3,O:12} (order of appearance) */
function parseF(f){const tot={};String(f).split('·').forEach(part=>{const m=part.match(/^(\d+)(.*)$/);const k=m?+m[1]:1;const s=m?m[2]:part;let i=0;
  const seq=()=>{const c={};while(i<s.length&&s[i]!==')'&&s[i]!==']'){let sub;if(s[i]==='('||s[i]==='['){i++;sub=seq();i++;}else{const mm=s.slice(i).match(/^[A-Z][a-z]?/);if(!mm)throw new Error('bad formula '+f);i+=mm[0].length;if(!(mm[0] in AR))throw new Error('no Ar for '+mm[0]);sub={[mm[0]]:1};}
    const d=s.slice(i).match(/^\d+/);let q=1;if(d){q=+d[0];i+=d[0].length;}for(const e in sub)c[e]=(c[e]||0)+q*sub[e];}return c;};
  const c=seq();for(const e in c)tot[e]=(tot[e]||0)+k*c[e];});return tot;}
const Mr=f=>{const c=parseF(f);let s=0;for(const e in c)s+=AR[e]*c[e];return rd(s,6);};
/* "2·27 + 3·16 = 102" */
const MrSum=f=>{const c=parseF(f);return Object.keys(c).map(e=>c[e]>1?`${c[e]}·${N(AR[e])}`:N(AR[e])).join(' + ')+' = '+N(Mr(f));};
const MrSumL=f=>{const c=parseF(f);return Object.keys(c).map(e=>c[e]>1?`${c[e]}·A<sub>r</sub>(${e})`:`A<sub>r</sub>(${e})`).join(' + ');};
const atomsTotal=f=>{const c=parseF(f);let s=0;for(const e in c)s+=c[e];return s;};

const EN={H:'водород',O:'кислород',Na:'натрий',K:'калий',Li:'литий',Ag:'серебро',F:'фтор',Br:'бром',I:'иод',Hg:'ртуть',Pb:'свинец',Mg:'магний',Ca:'кальций',Ba:'барий',Zn:'цинк',Al:'алюминий',Fe:'железо',Cu:'медь',C:'углерод',S:'сера',N:'азот',P:'фосфор',Cl:'хлор',Cr:'хром',Mn:'марганец',Si:'кремний'};
/* unicode subscripts for SVG text */
const SUBU=s=>String(s).replace(/([A-Za-z\)])(\d+)/g,(m,a,d)=>a+d.replace(/\d/g,c=>'₀₁₂₃₄₅₆₇₈₉'[c]));
const POLY=g=>/[A-Z].*[A-Z]/.test(g)||/\d/.test(g);
/* formula from valences */
function fml(A,a,B,b){const l=H.lcm(a,b),x=l/a,y=l/b;const bb=POLY(B)&&y>1?`(${B})${y}`:`${B}${y>1?y:''}`;return {f:`${A}${x>1?x:''}${bb}`,x,y,l};}
const fXY=(A,x,B,y)=>`${A}${x>1?x:''}${POLY(B)&&y>1?`(${B})${y}`:`${B}${y>1?y:''}`}`;

/* oxides that really exist: [element, valence] */
const OXV=[['Na',1],['K',1],['Li',1],['Ag',1],['Cu',1],['Cl',1],['N',1],['Mg',2],['Ca',2],['Ba',2],['Zn',2],['Fe',2],['Cu',2],['C',2],['N',2],['Mn',2],['Al',3],['Fe',3],['Cr',3],['N',3],['P',3],['C',4],['S',4],['N',4],['Si',4],['Mn',4],['N',5],['P',5],['S',6],['Cr',6],['Cl',7],['Mn',7]];
const BIN=[ // [A,a,B,b,class name]
 ...[['Na',1],['K',1],['Ag',1],['Mg',2],['Ca',2],['Ba',2],['Zn',2],['Fe',2],['Fe',3],['Cu',2],['Al',3],['P',3],['P',5],['C',4]].map(p=>[p[0],p[1],'Cl',1,'хлорид']),
 ...[['Na',1],['K',1],['Ag',1],['Mg',2],['Ca',2],['Zn',2],['Fe',2],['Cu',2],['Al',3]].map(p=>[p[0],p[1],'S',2,'сульфид']),
 ...[['Li',1],['Mg',2],['Ca',2],['Al',3]].map(p=>[p[0],p[1],'N',3,'нитрид'])];
const GR={OH:[1,'гидроксид'],NO3:[1,'нитрат'],SO4:[2,'сульфат'],CO3:[2,'карбонат'],PO4:[3,'фосфат']};
const GM=[['Na',1],['K',1],['Ca',2],['Ba',2],['Mg',2],['Zn',2],['Fe',2],['Fe',3],['Cu',2],['Al',3]];
const grOK=(m,v,g)=>!(g==='CO3'&&(m==='Al'||(m==='Fe'&&v===3)||m==='Cu'));
const vtxt=(e,v)=>(e==='Fe'||e==='Cu'||e==='Cr'||e==='Mn'||e==='N'||e==='P'||e==='S'||e==='C'||e==='Cl')?` (${ROM[v]})`:'';

/* ---------- pictures ---------- */
function arrow(x1,y1,x2,y2){const a=Math.atan2(y2-y1,x2-x1),h=8;const p1=[x2-h*Math.cos(a-0.4),y2-h*Math.sin(a-0.4)],p2=[x2-h*Math.cos(a+0.4),y2-h*Math.sin(a+0.4)];
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--accent-ink)" stroke-width="1.8"/><polygon points="${x2},${y2} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="var(--accent-ink)"/>`;}
function crossPic(A,a,B,b){const r=fml(A,a,B,b);const g=H.gcd(a,b);let s='';
  s+=T(50,28,ROM[a],{fs:15,c:'var(--accent-ink)',fw:700})+T(170,28,ROM[b],{fs:15,c:'var(--accent-ink)',fw:700});
  s+=T(50,74,A,{fs:24,fw:700})+T(170,74,SUBU(B),{fs:24,fw:700});
  s+=arrow(70,36,150,100)+arrow(150,36,70,100);
  s+=T(50,120,g>1?`${b} : ${g} = ${b/g}`:String(b),{fs:14,c:'var(--hl)',fw:700})+T(170,120,g>1?`${a} : ${g} = ${a/g}`:String(a),{fs:14,c:'var(--hl)',fw:700});
  s+=T(222,52,`НОК(${a}, ${b}) = ${r.l}`,{a:'start',fs:13,fw:500})+T(222,74,'формула:',{a:'start',fs:13,fw:500})+T(222,104,SUBU(r.f),{a:'start',fs:24,fw:700,c:'var(--accent-ink)'});
  return SV(340,134,s,'Составление формулы крест-накрест');}
/* structural formula: centre atom + neighbours [sym, bond order, dir] */
function structPic(c,nb){const cx=160,cy=78,D={L:[-80,0],R:[80,0],U:[0,-56],D:[0,56]};let s=`<circle cx="${cx}" cy="${cy}" r="19" fill="var(--hl)" fill-opacity=".45"/>`;
  nb.forEach(([sy,o,d])=>{const [dx,dy]=D[d];const len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len,px=-uy,py=ux;
    for(let k=0;k<o;k++){const off=(k-(o-1)/2)*6;s+=`<line x1="${(cx+ux*21+px*off).toFixed(1)}" y1="${(cy+uy*21+py*off).toFixed(1)}" x2="${(cx+dx-ux*17+px*off).toFixed(1)}" y2="${(cy+dy-uy*17+py*off).toFixed(1)}" stroke="var(--fig)" stroke-width="2"/>`;}
    s+=T(cx+dx,cy+dy+7,sy,{fs:20,fw:700});});
  s+=T(cx,cy+7,c,{fs:20,fw:700});return SV(320,156,s,'Структурная формула');}
const MOL=[['H₂O','O',[['H',1,'L'],['H',1,'R']]],['CO₂','C',[['O',2,'L'],['O',2,'R']]],['NH₃','N',[['H',1,'L'],['H',1,'R'],['H',1,'D']]],['CH₄','C',[['H',1,'L'],['H',1,'R'],['H',1,'U'],['H',1,'D']]],['H₂S','S',[['H',1,'L'],['H',1,'R']]],['HCl','Cl',[['H',1,'L']]],['N₂','N',[['N',3,'R']]],['SO₃','S',[['O',2,'L'],['O',2,'R'],['O',2,'U']]],['PH₃','P',[['H',1,'L'],['H',1,'R'],['H',1,'D']]],['SiH₄','Si',[['H',1,'L'],['H',1,'R'],['H',1,'U'],['H',1,'D']]],['HCN','C',[['H',1,'L'],['N',3,'R']]],['SO₂','S',[['O',2,'L'],['O',2,'R']]]];

/* ---------- theory ---------- */
const theory=[
{title:'Почему вода — H₂O, а не HO?',lvl:0,html:`
<p class="hook">Представь атомы как детали LEGO с «руками»-крючками. У водорода одна рука, у кислорода — две. Атом кислорода держит двумя руками два водорода — и получается молекула воды <b>H₂O</b>. А HO не бывает: у кислорода одна рука осталась бы пустой! Химики называют число таких «рук» <b>валентностью</b>. Зная её, ты сможешь сам написать формулу почти любого вещества из 8 класса — не зубря.</p>
<p>В этой теме: валентность → формулы «крест-накрест» → валентность по формуле → группы атомов → относительная молекулярная масса M<sub>r</sub> → массовая доля элемента w → как по процентам узнать формулу (так работают настоящие химики-аналитики) → олимпиадные задачи.</p>
<div class="box tip"><b>Что такое формула</b>${C('H2SO4')} — «рецепт» молекулы: в ней 2 атома H, 1 атом S и 4 атома O. Маленькая цифра справа внизу — <b>индекс</b>, она показывает число атомов. Если индекса нет, атом один.</div>`},
{title:'Валентность',lvl:0,html:`
<div class="box rule"><b>Валентность</b>— это способность атома образовывать определённое число химических связей с другими атомами. Обозначают римской цифрой над символом: H<sup>I</sup>, O<sup>II</sup>, Al<sup>III</sup>.</div>
<p><b>Почему так.</b> Каждая связь — это «рукопожатие» двух атомов. Атом водорода может пожать только одну руку — его валентность I. Кислород — две, валентность II. За единицу взята валентность водорода.</p>
<div class="figrow"><div class="fig">${structPic('O',MOL[0][2])}<div class="cap">H₂O: у O две связи → II</div></div><div class="fig">${structPic('C',MOL[1][2])}<div class="cap">CO₂: у C 2 + 2 → IV</div></div></div>
<p>В <b>структурной формуле</b> каждая чёрточка — одна связь. Сосчитай чёрточки у атома — получишь его валентность. У углерода в CO₂ две двойные связи: 2 + 2 = IV.</p>
<div class="box rule"><b>Постоянная валентность (выучи!)</b>
<b>I</b> — H, Li, Na, K, Ag, F<br><b>II</b> — O, Mg, Ca, Ba, Zn<br><b>III</b> — Al</div>
<div class="box rule"><b>Переменная валентность</b>Fe — II, III · Cu — I, II · C — II, IV · S — II, IV, VI · P — III, V · N — I…V · Cl — I…VII · Mn — II, IV, VII · Cr — II, III, VI. Какая именно — пишут в названии: оксид железа(III).</div>
<div class="box tip"><b>Как запомнить</b>«На Калий Литий Серебро — по одной руке (I); Магний Кальций Барий Цинк и Кислород — по две (II); Алюминий — три». Высшая валентность элемента обычно равна номеру его группы: S в VI группе → до VI.</div>
<div class="box err"><b>Частая ошибка</b>Путать валентность с индексом. В Fe₂O₃ у железа индекс 2, а валентность III.</div>
<div class="fact">Слово «валентность» ввёл английский химик Эдуард Франкленд в 1852 году. Латинское <i>valentia</i> — «сила».</div>`},
{title:'Составляем формулу: правило «крест-накрест»',lvl:1,html:`
<div class="box rule"><b>Правило</b>В формуле из двух элементов сумма валентностей всех атомов одного элемента равна сумме валентностей всех атомов другого: <span class="m">x·a = y·b</span>, где a, b — валентности, x, y — индексы.</div>
<ol class="steps"><li>Пиши символы рядом, сверху — валентности: Al<sup>III</sup> O<sup>II</sup>.</li>
<li>Найди НОК валентностей: НОК(3, 2) = 6.</li>
<li>Раздели НОК на валентность каждого элемента: 6 : 3 = 2 (это индекс Al), 6 : 2 = 3 (индекс O).</li>
<li>Формула: Al₂O₃. Проверка: 2·3 = 3·2 = 6 ✔</li></ol>
<div class="fig">${crossPic('Al',3,'O',2)}</div>
<p><b>Короткий путь — крест-накрест:</b> валентность одного элемента становится индексом другого. Только не забудь <b>сократить</b>, если оба индекса делятся на одно число.</p>
<div class="box ex"><b>Пример</b>S<sup>VI</sup> O<sup>II</sup>: крест-накрест даёт S₂O₆ — сокращаем на 2 → <b>SO₃</b>. Через НОК сразу: НОК(6, 2) = 6; 6 : 6 = 1, 6 : 2 = 3 → SO₃.</div>
<div class="box err"><b>Частая ошибка</b>1) Не сократить: «C₂O₄» вместо CO₂. 2) Поставить валентность своему же элементу: «Al₃O₂». Валентность «перепрыгивает» к соседу!</div>
<p><b>Попробуй сам:</b> собери вещество в конструкторе.</p>
<div class="widget" id="w-cross"></div>`},
{title:'Валентность по формуле',lvl:2,html:`
<div class="box rule"><b>Правило</b>Если известна валентность одного элемента (обычно O = II, H = I, Cl = I в хлоридах), то: <span class="m">валентность X = (индекс соседа · его валентность) : индекс X</span>.</div>
<p><b>Почему так.</b> Все «руки» должны быть заняты: сколько рук у всех атомов кислорода, столько и у всех атомов второго элемента.</p>
<div class="box ex"><b>Пример 1</b>Fe₂O₃: у трёх атомов O всего 3·2 = 6 рук. Их держат 2 атома Fe → каждый держит 6 : 2 = 3. Валентность Fe = III.</div>
<div class="box ex"><b>Пример 2</b>Mn₂O₇: 7·2 = 14; 14 : 2 = 7 → Mn<sup>VII</sup>. А в MnO₂: 2·2 = 4; 4 : 1 = 4 → Mn<sup>IV</sup>.</div>
<div class="box err"><b>Частая ошибка</b>Брать индекс за валентность: «в SO₂ у серы валентность 2». Нет: 2·2 = 4, сера здесь IV.</div>`},
{title:'Группы атомов: OH, NO₃, SO₄, CO₃, PO₄',lvl:3,html:`
<p>Некоторые группы атомов в реакциях ведут себя как одна «деталь» — их не разбирают. У каждой такой группы своя валентность.</p>
<div class="box rule"><b>Валентность групп</b><b>I</b> — OH (гидроксид), NO₃ (нитрат), Cl (хлорид)<br><b>II</b> — SO₄ (сульфат), CO₃ (карбонат), S (сульфид)<br><b>III</b> — PO₄ (фосфат)</div>
<p>Формулу составляют точно так же, крест-накрест. Если группы нужно взять больше одной, её берут в <b>скобки</b>, а индекс ставят за скобкой.</p>
<div class="box ex"><b>Пример</b>Ca<sup>II</sup> и (OH)<sup>I</sup>: НОК = 2 → Ca(OH)₂. Al<sup>III</sup> и (SO₄)<sup>II</sup>: НОК = 6 → Al₂(SO₄)₃. Ca<sup>II</sup> и (PO₄)<sup>III</sup> → Ca₃(PO₄)₂.</div>
<div class="box err"><b>Частая ошибка</b>Писать CaOH₂ — это значило бы «один O и два H». А в Ca(OH)₂ две целые группы OH: 2 атома O и 2 атома H. Индекс за скобкой умножает <b>всё</b>, что в скобке.</div>
<div class="box tip"><b>Считаем атомы</b>В Al₂(SO₄)₃: Al — 2, S — 1·3 = 3, O — 4·3 = 12. Всего 17 атомов.</div>`},
{title:'Относительная молекулярная масса Mr',lvl:4,html:`
<div class="box rule"><b>Определение</b>M<sub>r</sub> — относительная молекулярная масса — сумма относительных атомных масс всех атомов в формуле (с учётом индексов): <span class="m">M<sub>r</sub>(Al₂O₃) = 2·A<sub>r</sub>(Al) + 3·A<sub>r</sub>(O)</span>. Единиц измерения у неё нет.</div>
<p><b>Почему так.</b> Масса молекулы — это просто сумма масс атомов, как вес рюкзака — сумма весов вещей в нём. A<sub>r</sub> берём из таблицы Менделеева (округляем: Cl = 35,5; Cu = 64; остальные — до целых).</p>
<div class="box ex"><b>Примеры</b>M<sub>r</sub>(H₂O) = 2·1 + 16 = 18<br>M<sub>r</sub>(H₂SO₄) = 2·1 + 32 + 4·16 = 98<br>M<sub>r</sub>(Ca(OH)₂) = 40 + 2·(16 + 1) = 74<br>M<sub>r</sub>(CuSO₄·5H₂O) = 160 + 5·18 = 250</div>
<div class="box err"><b>Частая ошибка</b>Забыть, что индекс за скобкой умножает всю группу: в Al₂(SO₄)₃ кислорода 12, а не 4.</div>
<div class="box tip"><b>Таблица A<sub>r</sub></b>H 1 · C 12 · N 14 · O 16 · Na 23 · Mg 24 · Al 27 · Si 28 · P 31 · S 32 · Cl 35,5 · K 39 · Ca 40 · Cr 52 · Mn 55 · Fe 56 · Cu 64 · Zn 65 · Ag 108 · Ba 137</div>`},
{title:'Массовая доля элемента w',lvl:5,html:`
<div class="box rule"><b>Формула</b><span class="m">w(Э) = ${H.frac('n · A<sub>r</sub>(Э)','M<sub>r</sub>')} · 100%</span>, где n — число атомов элемента в формуле.</div>
<p><b>Почему так.</b> Это как доля сыра в пицце: масса сыра делить на массу всей пиццы. Только вместо граммов — относительные массы атомов.</p>
<div class="box ex"><b>Пример</b>Вода H₂O: M<sub>r</sub> = 18. w(O) = 16 / 18 · 100% ≈ 88,9%, w(H) = 2 / 18 · 100% ≈ 11,1%. Сумма — 100%.</div>
<div class="box ex"><b>Сколько железа в руде?</b>Гематит Fe₂O₃: M<sub>r</sub> = 160; w(Fe) = 112 / 160 = 0,7 = 70%. Из 1 т чистого гематита можно получить 700 кг железа.</div>
<div class="box err"><b>Частая ошибка</b>Забыть индекс: w(Fe) = 56 / 160 = 35% — неверно, в формуле два атома Fe.</div>
<div class="fact">Около 65% массы твоего тела — это кислород (в основном в составе воды), примерно 18% — углерод.</div>`},
{title:'Вывод формулы по массовым долям',lvl:6,html:`
<div class="box rule"><b>Алгоритм</b>Отношение индексов = отношение <b>w : A<sub>r</sub></b>: <span class="m">x : y = ${H.frac('w(A)','A<sub>r</sub>(A)')} : ${H.frac('w(B)','A<sub>r</sub>(B)')}</span>. Потом делим всё на наименьшее и доводим до целых.</div>
<p><b>Почему так.</b> Возьмём 100 г вещества. Тогда масса каждого элемента в граммах равна его проценту. Делим массу на «массу одного атома» A<sub>r</sub> — получаем, во сколько раз одних атомов больше, чем других.</p>
<div class="box ex"><b>Пример</b>Fe — 70%, O — 30%.<ol class="steps"><li>70 : 56 = 1,25; 30 : 16 = 1,875.</li><li>Делим на меньшее: 1 : 1,5.</li><li>Умножаем на 2, чтобы стало целым: 2 : 3.</li><li>Формула Fe₂O₃.</li></ol></div>
<div class="box err"><b>Частая ошибка</b>Делить проценты друг на друга без A<sub>r</sub>: 70 : 30 ≈ 2,3 — бессмыслица. Атомы разных элементов весят по-разному!</div>
<div class="box tip"><b>Если дано отношение масс</b>m(Fe) : m(S) = 7 : 4 → 7/56 : 4/32 = 0,125 : 0,125 = 1 : 1 → FeS.</div>`},
{title:'★ Истинная формула и кристаллогидраты',lvl:7,html:`
<p>По процентам получается только <b>простейшая</b> формула — отношение атомов. У C₂H₄ и C₃H₆ проценты одинаковые (85,7% C)! Чтобы найти <b>истинную</b> формулу, нужна ещё M<sub>r</sub>.</p>
<div class="box rule"><b>Через M<sub>r</sub></b>Число атомов элемента: <span class="m">n = ${H.frac('w · M<sub>r</sub>','A<sub>r</sub>')}</span>.</div>
<div class="box ex"><b>Пример</b>Углеводород: w(C) = 85,7%, M<sub>r</sub> = 42. n(C) = 0,857·42 / 12 = 3; n(H) = 0,143·42 / 1 = 6 → C₃H₆.</div>
<p><b>Кристаллогидраты</b> — кристаллы, в которые встроены молекулы воды. Синий медный купорос — CuSO₄·5H₂O. Точка «·» значит «вместе с». Нагреешь — вода уходит, и кристаллы становятся белыми (CuSO₄).</p>
<div class="box ex"><b>Пример</b>M<sub>r</sub>(CuSO₄·5H₂O) = 160 + 5·18 = 250; w(H₂O) = 90 / 250 = 36%.</div>
<div class="box tip"><b>Найти x в Х·xH₂O</b>Если известна w(H₂O): <span class="m">${H.frac('18x','M<sub>r</sub>(соли) + 18x')} = w</span> → <span class="m">x = ${H.frac('w · M<sub>r</sub>(соли)','18 · (1 − w)')}</span>.</div>
<div class="fact">Гипс, из которого делают повязки при переломах, — это кристаллогидрат CaSO₄·2H₂O.</div>`}
];

const symbols={tab:'Формулы',title:'Обозначения и формулы',rows:[
['I, II, III…','валентность','Сколько связей образует атом. Пишут римскими цифрами.','Al<sup>III</sup>, O<sup>II</sup>'],
['индекс','маленькая цифра в формуле','Сколько атомов (или групп) в молекуле.',C('H2O')+': 2 атома H'],
['x·a = y·b','правило валентности','Сумма валентностей одного элемента = сумме другого.','2·III = 3·II'],
['( )ₙ','скобки','Индекс за скобкой умножает всё внутри.',C('Ca(OH)2')+': 2 O, 2 H'],
['A<sub>r</sub>','относительная атомная масса','Масса атома в атомных единицах, из таблицы.','A<sub>r</sub>(O) = 16'],
['M<sub>r</sub>','относительная молекулярная масса','Сумма A<sub>r</sub> всех атомов.','M<sub>r</sub>(H₂O) = 18'],
['w(Э)','массовая доля элемента','n·A<sub>r</sub> / M<sub>r</sub> · 100%.','w(O) в H₂O ≈ 88,9%'],
['x : y','вывод формулы','= w(A)/A<sub>r</sub>(A) : w(B)/A<sub>r</sub>(B).','70/56 : 30/16 = 2 : 3'],
['·xH₂O','кристаллогидрат','x молекул воды на одну «формулу» соли.',C('CuSO4·5H2O')]
],after:`<div class="box tip" style="margin-top:14px"><b>Постоянная валентность</b>I — H, Li, Na, K, Ag · II — O, Mg, Ca, Ba, Zn · III — Al. Группы: OH, NO₃ — I; SO₄, CO₃ — II; PO₄ — III.</div>`};

const figs={};

/* ---------- widget ---------- */
function onTheory(root){const w=root.querySelector('#w-cross');if(!w)return;
  const As=[['Na',1],['K',1],['Ag',1],['Cu',1],['Cu',2],['Mg',2],['Ca',2],['Ba',2],['Zn',2],['Fe',2],['Fe',3],['Al',3]];
  const Bs=[['O',2],['Cl',1],['S',2],['N',3],['OH',1],['NO3',1],['SO4',2],['CO3',2],['PO4',3]];
  const sel='font:inherit;font-size:16px;padding:4px 8px;border-radius:8px;border:1px solid var(--line);background:var(--card);color:var(--ink)';
  w.innerHTML=`<label>Первый элемент: <select id="wA" style="${sel}">${As.map((p,i)=>`<option value="${i}">${p[0]} (${ROM[p[1]]})</option>`).join('')}</select></label>
<label>Второй (элемент или группа): <select id="wB" style="${sel}">${Bs.map((p,i)=>`<option value="${i}">${p[0].replace(/(\d)/g,c=>'₀₁₂₃₄₅₆₇₈₉'[c])} (${ROM[p[1]]})</option>`).join('')}</select></label>
<div id="wS" style="display:flex;justify-content:center"></div><div id="wO" class="small" style="text-align:center;margin-top:6px"></div>`;
  const g=id=>w.querySelector(id);g('#wA').value='11';
  const draw=()=>{const [A,a]=As[+g('#wA').value],[B,b]=Bs[+g('#wB').value];const r=fml(A,a,B,b);
    g('#wS').innerHTML=crossPic(A,a,B,b);const m=Mr(r.f);const wA=rd(r.x*AR[A]/m*100,1);
    g('#wO').innerHTML=`Формула: <span class="out">${C(r.f)}</span> · проверка: ${r.x}·${ROM[a]} = ${r.y}·${ROM[b]} = ${r.l}<br>M<sub>r</sub> = ${MrSum(r.f)} · w(${A}) = ${r.x>1?r.x+'·':''}${N(AR[A])} / ${N(m)} ≈ <span class="out">${N(wA)}%</span>`;};
  w.querySelectorAll('select').forEach(i=>i.onchange=draw);draw();}

/* helper: typed formula task */
const TXT=(q,f,extra)=>Object.assign({type:'text',q,ans:[f],check:raw=>H.normChem(raw)===f,right:f,keys:KEYS,ph:'например, Al2O3',ansText:C(f)},extra||{});
function crossExplain(A,a,B,b){const r=fml(A,a,B,b);const g=H.gcd(a,b);const dA=C(A),dB=C(B);
  return {explain:`Пишем символы и валентности: ${dA}<sup>${ROM[a]}</sup> ${dB}<sup>${ROM[b]}</sup>.<br>НОК(${a}, ${b}) = ${r.l}. Индекс ${A}: ${r.l} : ${a} = ${r.x}; индекс ${dB}: ${r.l} : ${b} = ${r.y}.<br>Формула: <b>${C(r.f)}</b>. Проверка: ${r.x}·${a} = ${r.y}·${b} = ${r.l} ✔${g>1?`<br>Крест-накрест дало бы ${C(fXY(A,b,B,a))} — его надо сократить на ${g}.`:''}`,
   explain2:`Представь «руки»: у каждого атома ${A} их ${a}, у ${POLY(B)?'каждой группы':'каждого атома'} ${dB} — ${b}. Нужно взять столько штук, чтобы рук с обеих сторон было поровну. ${r.x} × ${a} = ${r.l} и ${r.y} × ${b} = ${r.l} — поровну! Значит, ${r.x} шт. ${A} и ${r.y} шт. ${dB}: ${C(r.f)}.${POLY(B)&&r.y>1?` Группу ${dB} берём в скобки, потому что её ${r.y}.`:''}`,
   explain3:crossPic(A,a,B,b)};}

/* =================== GENERATORS =================== */
/* L0 — валентность */
RULE(0,'Что такое валентность?','Способность атома образовывать определённое число химических связей',['Число атомов элемента в молекуле','Масса атома в атомных единицах','Номер элемента в таблице Менделеева'],
{short:'Валентность — сколько связей («рук») у атома.',
explain:'Валентность — это способность атома образовывать определённое число химических связей. Число атомов в молекуле — это <b>индекс</b>, масса атома — A<sub>r</sub>, а номер элемента — вообще другое (заряд ядра).',
explain2:'Атомы — как детали LEGO с крючками. Сколько крючков у детали — такая у неё валентность. У водорода один крючок (I), у кислорода два (II).'});
RULE(0,'Какая валентность у водорода и кислорода почти во всех соединениях?','H — I, O — II',['H — II, O — I','H — I, O — I','H — II, O — II'],
{short:'Водород всегда I, кислород — II.',
explain:'Водород образует одну связь — его валентность I (её приняли за единицу). Кислород — две связи, валентность II. Это опора для всех расчётов: по ним определяют валентность других элементов.',
explain2:'Вспомни воду H–O–H: у каждого H одна чёрточка, у O — две.'});
G(0,()=>{const P=[['Na',1],['K',1],['Li',1],['Ag',1],['Mg',2],['Ca',2],['Ba',2],['Zn',2],['Al',3]];const [e,v]=pick(P);
return CH(`Какая валентность у элемента <b>${EN[e]}</b> (${e}) в соединениях? Она у него постоянная.`,ROM[v],['I','II','III','IV'].filter(x=>x!==ROM[v]),
{short:`${e} — валентность ${ROM[v]}.`,explain:`Постоянную валентность нужно знать наизусть: I — H, Li, Na, K, Ag; II — O, Mg, Ca, Ba, Zn; III — Al. Значит, у ${e} валентность <b>${ROM[v]}</b>.`,
explain2:`Подсказка-стишок: «Натрий, калий, литий, серебро — по одной руке; магний, кальций, барий, цинк — по две; алюминий — три». ${EN[e][0].toUpperCase()+EN[e].slice(1)} — ${ROM[v]}.`});});
G(0,()=>{const m=pick(MOL);const v=m[2].reduce((s,x)=>s+x[1],0);
return {type:'num',q:`Перед тобой структурная формула молекулы ${m[0]}. Каждая чёрточка — одна связь. Какая валентность у выделенного атома ${m[1]}? Ответ — обычной цифрой.`,pic:structPic(m[1],m[2]),ans:v,
short:`Связей у ${m[1]}: ${m[2].map(x=>x[1]).join(' + ')} = ${v}, валентность ${ROM[v]}.`,
explain:`Валентность = число связей атома. Считаем чёрточки у ${m[1]}: ${m[2].map(x=>x[1]===1?'одинарная (1)':x[1]===2?'двойная (2)':'тройная (3)').join(', ')}. Всего ${m[2].map(x=>x[1]).join(' + ')} = <b>${v}</b>, т. е. валентность ${ROM[v]}.`,
explain2:`Двойная связь «=» — это две руки сразу, тройная «≡» — три. Пересчитай все линии, которые касаются ${m[1]}: их ${v}.`};});
G(0,()=>{const vars=['Fe','Cu','S','C','N','P','Cl','Mn','Cr'],cons=['Na','K','Mg','Ca','Al','Zn','Ba','Ag','Li'];const e=pick(vars);const ws=sample(cons,3);
return CH('У какого элемента валентность <b>переменная</b> (в разных соединениях разная)?',`${e} (${EN[e]})`,ws.map(x=>`${x} (${EN[x]})`),
{short:`${e} бывает с разной валентностью.`,explain:`Постоянная валентность у Na, K, Li, Ag (I), Mg, Ca, Ba, Zn (II), Al (III). А <b>${e}</b> меняет валентность: например, ${e==='Fe'?'FeO (II) и Fe₂O₃ (III)':e==='Cu'?'Cu₂O (I) и CuO (II)':e==='S'?'H₂S (II), SO₂ (IV), SO₃ (VI)':e==='C'?'CO (II) и CO₂ (IV)':e==='N'?'N₂O (I), NO₂ (IV), N₂O₅ (V)':e==='P'?'P₂O₃ (III) и P₂O₅ (V)':e==='Cl'?'HCl (I) и Cl₂O₇ (VII)':e==='Mn'?'MnO (II), MnO₂ (IV), Mn₂O₇ (VII)':'Cr₂O₃ (III) и CrO₃ (VI)'}.`,
explain2:`Раз в названиях пишут «оксид железа(II)» и «оксид железа(III)» — значит, у железа несколько вариантов. У натрия, кальция или алюминия так никогда не пишут: у них валентность одна.`});});

/* L1 — крест-накрест */
RULE(1,'Как составить формулу вещества из двух элементов по их валентностям?','Найти НОК валентностей и разделить его на валентность каждого элемента — получатся индексы',['Индекс каждого элемента равен его собственной валентности','Сложить валентности и поставить сумму индексом у второго элемента','Индексы всегда равны 1, валентность на формулу не влияет'],
{short:'НОК : валентность = индекс (или крест-накрест с сокращением).',
explain:'Правило: x·a = y·b. Находим НОК валентностей a и b и делим на каждую: x = НОК : a, y = НОК : b. Пример: Al<sup>III</sup> O<sup>II</sup> → НОК 6 → Al₂O₃. Свою валентность индексом ставить нельзя — получилось бы Al₃O₂, где 3·3 ≠ 2·2.',
explain2:'Короткий путь: валентность одного элемента «перепрыгивает» крест-накрест и становится индексом другого, потом сокращаем. S<sup>VI</sup>O<sup>II</sup> → S₂O₆ → SO₃.'});
G(1,()=>{const [e,v]=pick(OXV);const r=fml(e,v,'O',2);
return TXT(`Составь формулу оксида, в котором ${EN[e]} (${e}) имеет валентность ${ROM[v]}. Кислород — II.`,r.f,Object.assign({hint:`НОК(${v}, 2) = ${r.l}. Раздели его на валентности.`,short:`${e}<sup>${ROM[v]}</sup>O<sup>II</sup>: НОК ${r.l} → ${C(r.f)}.`},crossExplain(e,v,'O',2)));});
G(1,()=>{const [A,a,B,b,cl]=pick(BIN);const r=fml(A,a,B,b);
return TXT(`Составь формулу вещества (${cl}) из ${A}<sup>${ROM[a]}</sup> и ${B}<sup>${ROM[b]}</sup>.`,r.f,Object.assign({hint:`НОК(${a}, ${b}) = ${r.l}.`,short:`НОК ${r.l}: ${r.l}:${a} = ${r.x}, ${r.l}:${b} = ${r.y} → ${C(r.f)}.`},crossExplain(A,a,B,b)));});
G(1,()=>{for(;;){const [e,v]=pick(OXV);const r=fml(e,v,'O',2);if(v===2)continue;const sw=fXY(e,r.y,'O',r.x),raw=fXY(e,2,'O',v),one=`${e}O`;
const w=[sw,raw,one,fXY(e,1,'O',v)].filter(x=>x!==r.f);const ws=[...new Set(w)].slice(0,3);if(ws.length<3)continue;
return CH(`Какая формула оксида ${EN[e]==='сера'?'серы':EN[e]==='медь'?'меди':EN[e]==='железо'?'железа':'элемента '+e}(${ROM[v]}) верная?`,C(r.f),ws.map(C),Object.assign({short:`${r.x}·${v} = ${r.y}·2 = ${r.l} ✔`},crossExplain(e,v,'O',2)));}});
G(1,()=>{for(;;){const [e,v]=pick(OXV);const r=fml(e,v,'O',2);if(r.y===1&&r.x===1)continue;const which=R(0,1);const ans=which?r.y:r.x;
return {type:'num',q:`Оксид ${e}<sup>${ROM[v]}</sup>O<sup>II</sup>. Какой индекс будет у <b>${which?'кислорода':e}</b> в формуле? (Если индекса нет — ответ 1.)`,ans,
hint:`НОК(${v}, 2) = ${r.l}.`,short:`Формула ${C(r.f)}, индекс ${which?'O':e} = ${ans}.`,...crossExplain(e,v,'O',2)};}});
G(1,()=>{for(;;){const [e,v]=pick(OXV.filter(p=>p[1]%2===0&&p[1]>2));const r=fml(e,v,'O',2);const raw=fXY(e,2,'O',v);
return CH(`Петя составил формулу оксида ${e}<sup>${ROM[v]}</sup> крест-накрест и получил ${C(raw)}. Как надо записать правильно?`,C(r.f),[C(raw)+' — всё верно',C(fXY(e,v,'O',2)),C(fXY(e,1,'O',v))].filter(x=>x!==C(r.f)).slice(0,3),
{short:`${C(raw)} сокращаем на 2 → ${C(r.f)}.`,explain:`Крест-накрест даёт ${e}₂O<sub>${v}</sub>, но индексы 2 и ${v} делятся на 2. Индексы в формуле должны быть наименьшими: <b>${C(r.f)}</b>. Проверка: ${r.x}·${v} = ${r.y}·2 = ${r.l} ✔`,
explain2:`Сравни: ${C(raw)} и ${C(r.f)} — одно и то же соотношение атомов (${e} : O = 1 : ${v/2}). Химики всегда пишут самую короткую запись, как дробь 2/${v} сокращают до 1/${v/2}.`});}});

/* L2 — валентность по формуле */
RULE(2,'Как найти валентность элемента X в оксиде XₓOᵧ?','Умножить индекс кислорода на 2 и разделить на индекс X',['Валентность X равна индексу X','Валентность X равна индексу кислорода','Сложить индексы X и O'],
{short:'Валентность X = y·2 : x.',
explain:'Все «руки» кислорода (y атомов по 2) держат атомы X. Значит, у x атомов X вместе y·2 рук, у каждого — y·2 : x. Пример: Fe₂O₃ → 3·2 : 2 = 3, Fe<sup>III</sup>.',
explain2:'Индекс — это сколько атомов, а не сколько рук. В SO₂ индекс у O равен 2, но сера там IV: 2 кислорода × 2 руки = 4.'});
G(2,()=>{const [e,v]=pick(OXV);const r=fml(e,v,'O',2);
return {type:'num',q:`Определи валентность ${e} в оксиде ${C(r.f)}. Ответ — обычной (арабской) цифрой.`,ans:v,hint:'У кислорода валентность II.',
short:`${r.y}·2 : ${r.x} = ${v} → ${e}<sup>${ROM[v]}</sup>.`,
explain:`У кислорода валентность II. Атомов O — ${r.y}, у них всего ${r.y}·2 = ${2*r.y} «рук». Их держат ${r.x} ${H.plural(r.x,'атом','атома','атомов')} ${e}: ${2*r.y} : ${r.x} = <b>${v}</b>. Валентность ${e} — ${ROM[v]}.`,
explain2:`Проверь ответ крест-накрест: ${e}<sup>${ROM[v]}</sup>O<sup>II</sup> → НОК(${v}, 2) = ${r.l} → ${C(r.f)}. Совпало с данной формулой — значит, ${ROM[v]} верно.`};});
G(2,()=>{const [A,a,B,b]=pick(BIN.filter(p=>p[4]!=='нитрид'));const r=fml(A,a,B,b);
return {type:'num',q:`Определи валентность ${A} в соединении ${C(r.f)}, если валентность ${B} здесь равна ${ROM[b]}. Ответ — арабской цифрой.`,ans:a,
short:`${r.y}·${b} : ${r.x} = ${a}.`,explain:`Всего «рук» у ${B}: ${r.y}·${b} = ${r.y*b}. Делим на число атомов ${A} (${r.x}): ${r.y*b} : ${r.x} = <b>${a}</b>. Валентность ${A} — ${ROM[a]}.`,
explain2:`Правило: x·a = y·b. Здесь x = ${r.x}, y = ${r.y}, b = ${b}: ${r.x}·a = ${r.y*b} → a = ${a}.`};});
G(2,()=>{for(;;){const e=pick(['S','N','Mn','Cr','C','P','Cl','Fe','Cu']);const ox=OXV.filter(p=>p[0]===e);if(ox.length<2)continue;const v=pick(ox)[1];const f=fml(e,v,'O',2).f;const others=ox.filter(p=>p[1]!==v).map(p=>fml(e,p[1],'O',2).f);if(others.length<1)continue;
const extra=['NaCl','H2O','CaO','MgO','K2O'].filter(x=>!x.includes(e));const ws=shuffle(others).slice(0,3);while(ws.length<3)ws.push(extra[ws.length]);
return CH(`В каком оксиде ${e} проявляет валентность <b>${ROM[v]}</b>?`,C(f),ws.map(C),
{short:`В ${C(f)}: ${fml(e,v,'O',2).y}·2 : ${fml(e,v,'O',2).x} = ${v}.`,explain:`Проверяем каждую формулу: валентность ${e} = (индекс O · 2) : индекс ${e}.<br>${[f,...ws].filter(x=>x.includes(e)&&parseF(x).O).map(x=>{const c=parseF(x);return `${C(x)}: ${c.O}·2 : ${c[e]} = ${2*c.O/c[e]}`;}).join('<br>')}<br>Нужная валентность ${ROM[v]} — у <b>${C(f)}</b>.`,
explain2:`Составь формулу сам: ${e}<sup>${ROM[v]}</sup>O<sup>II</sup>, НОК(${v}, 2) = ${H.lcm(v,2)} → ${C(f)}. Ищи её среди ответов.`});}});
G(2,()=>{for(;;){const P=[['FeCl3','Fe',3,'Cl',1],['CuCl2','Cu',2,'Cl',1],['Fe2O3','Fe',3,'O',2],['Cu2O','Cu',1,'O',2],['PCl5','P',5,'Cl',1],['Mn2O7','Mn',7,'O',2],['N2O5','N',5,'O',2],['SO3','S',6,'O',2],['CO2','C',4,'O',2],['FeS','Fe',2,'S',2],['Cl2O7','Cl',7,'O',2],['CrO3','Cr',6,'O',2]];
const p=pick(P);const c=parseF(p[0]);const wrong=c[p[1]];if(wrong===p[2])continue;
return CH(`Вася говорит: «В ${C(p[0])} валентность ${p[1]} равна ${ROM[wrong]} — это же видно по индексу!» Прав ли он?`,`Нет, валентность ${p[1]} — ${ROM[p[2]]}`,[`Да, валентность ${ROM[wrong]}`,`Нет, валентность ${p[1]} — ${ROM[c[p[3]]]}`,`Нет, валентность ${p[1]} — ${ROM[Math.min(8,p[2]+1)]}`].filter((x,i,a)=>a.indexOf(x)===i&&x!==`Нет, валентность ${p[1]} — ${ROM[p[2]]}`),
{short:`${c[p[3]]}·${p[4]} : ${c[p[1]]} = ${p[2]}.`,explain:`Индекс — это число атомов, а не валентность. Считаем: у ${p[3]} (валентность ${ROM[p[4]]}) всего ${c[p[3]]}·${p[4]} = ${c[p[3]]*p[4]} «рук», атомов ${p[1]} — ${c[p[1]]}: ${c[p[3]]*p[4]} : ${c[p[1]]} = ${p[2]}. Валентность ${p[1]} — <b>${ROM[p[2]]}</b>, Вася не прав.`,
explain2:`Пример попроще: в CO₂ индекс у C — 1, а валентность — IV (две двойные связи O=C=O). Индекс и валентность — разные вещи.`});}});

/* L3 — группы атомов */
RULE(3,'Какая валентность у кислотного остатка SO₄ (сульфат) и у группы OH?','SO₄ — II, OH — I',['SO₄ — IV, OH — II','SO₄ — VI, OH — I','SO₄ — I, OH — II'],
{short:'OH и NO₃ — I, SO₄ и CO₃ — II, PO₄ — III.',
explain:'Запомни таблицу групп: OH, NO₃, Cl — I; SO₄, CO₃, S — II; PO₄ — III. Валентность группы можно проверить по кислоте: H₂SO₄ — два водорода (по I) держат одну группу SO₄ → II. HNO₃ → NO₃ — I, H₃PO₄ → PO₄ — III.',
explain2:'Сколько атомов H в кислоте, такая и валентность её остатка: H₂SO₄ → II, H₃PO₄ → III, HNO₃ → I. А OH — это «половинка воды» H–O–, у неё одна свободная рука.'});
RULE(3,'Что означает индекс 2 за скобкой в Ca(OH)₂?','Две группы OH: два атома O и два атома H',['Два атома H, атом O один','Два атома кальция','Два атома O, атом H один'],
{short:'Индекс за скобкой умножает всё внутри.',explain:'Индекс за скобкой умножает всё, что в скобках: (OH)₂ = O₂H₂. Поэтому в Ca(OH)₂ один Ca, два O и два H. Запись CaOH₂ означала бы один O и два H — это другое (и неверное) вещество.',
explain2:'Как в математике: 2·(a + b) = 2a + 2b. Скобка с индексом — «двойная порция» всей группы.'});
G(3,()=>{for(;;){const [m,v]=pick(GM);const g=pick(Object.keys(GR));if(!grOK(m,v,g))continue;const [gv,gn]=GR[g];const r=fml(m,v,g,gv);
return TXT(`Составь формулу: ${gn} ${m}${vtxt(m,v)} — соединение ${m}<sup>${ROM[v]}</sup> с группой ${C(g)}<sup>${ROM[gv]}</sup>. Скобки — с клавиатуры или кнопками.`,r.f,Object.assign({hint:`Валентность ${C(g)} — ${ROM[gv]}. НОК(${v}, ${gv}) = ${r.l}.`,short:`${C(r.f)}: ${r.x}·${v} = ${r.y}·${gv}.`},crossExplain(m,v,g,gv)));}});
G(3,()=>{for(;;){const [m,v]=pick(GM.filter(p=>p[1]>1));const g=pick(['OH','NO3','SO4','PO4']);if(!grOK(m,v,g))continue;const gv=GR[g][0];const r=fml(m,v,g,gv);if(r.y<2)continue;
const bad1=`${m}${r.x>1?r.x:''}${g}${r.y}`,bad2=fXY(m,r.x,g,1),bad3=fXY(m,r.y,g,r.x);const ws=[...new Set([bad1,bad2,bad3])].filter(x=>x!==r.f);if(ws.length<3)continue;
return CH(`Какая формула верна для соединения ${m}<sup>${ROM[v]}</sup> с ${C(g)}<sup>${ROM[gv]}</sup>?`,C(r.f),ws.map(C),Object.assign({short:`${r.y} группы ${C(g)} → скобки: ${C(r.f)}.`},crossExplain(m,v,g,gv),
{explain:crossExplain(m,v,g,gv).explain+`<br>Запись ${C(bad1)} неверна: без скобок индекс ${r.y} относится только к последнему атому.`}));}});
G(3,()=>{for(;;){const [m,v]=pick(GM);const g=pick(Object.keys(GR));if(!grOK(m,v,g))continue;const gv=GR[g][0];const r=fml(m,v,g,gv);if(r.y<2&&r.x<2)continue;
return {type:'num',q:`Определи валентность металла ${m} в соединении ${C(r.f)}. Валентность ${C(g)} — ${ROM[gv]}. Ответ — арабской цифрой.`,ans:v,
short:`${r.y}·${gv} : ${r.x} = ${v}.`,explain:`Группа ${C(g)} — как один «атом» с валентностью ${ROM[gv]}. Групп ${r.y}, у них ${r.y}·${gv} = ${r.y*gv} рук. Атомов ${m} — ${r.x}: ${r.y*gv} : ${r.x} = <b>${v}</b>.`,
explain2:`Проверка обратным ходом: ${m}<sup>${ROM[v]}</sup> и ${C(g)}<sup>${ROM[gv]}</sup>, НОК = ${r.l} → ${C(r.f)}. Совпало.`};}});
G(3,()=>{for(;;){const f=pick(['Al2(SO4)3','Ca3(PO4)2','Fe2(SO4)3','Ca(OH)2','Fe(OH)3','Ba(NO3)2','Mg3(PO4)2','Al(OH)3','Cu(NO3)2','(NH4)2SO4','Ca(NO3)2','Zn3(PO4)2']);const c=parseF(f);const e=pick([...Object.keys(c),'всех']);
const ans=e==='всех'?atomsTotal(f):c[e];if(ans<2)continue;
return {type:'num',q:`Сколько ${e==='всех'?'<b>всего атомов</b>':`атомов <b>${e}</b>`} в формуле ${C(f)}?`,ans,
short:Object.keys(c).map(x=>`${x}: ${c[x]}`).join(', ')+(e==='всех'?` → всего ${ans}.`:'.'),
explain:`Индекс за скобкой умножает всё, что в скобке. Разбираем ${C(f)}: ${Object.keys(c).map(x=>`${x} — ${c[x]}`).join('; ')}.${e==='всех'?` Всего: ${Object.values(c).join(' + ')} = <b>${ans}</b>.`:` Ответ: <b>${ans}</b>.`}`,
explain2:`Раскрой скобки, как в алгебре: 3·(a + b) = 3a + 3b. Каждый атом внутри скобки повторяется столько раз, какой индекс стоит за скобкой. Индекс без скобки относится только к одному атому перед ним.`};}});

/* L4 — Mr */
RULE(4,'Как вычислить относительную молекулярную массу Mr?','Сложить относительные атомные массы всех атомов с учётом индексов',['Сложить A<sub>r</sub> элементов, не обращая внимания на индексы','Перемножить A<sub>r</sub> всех элементов','Взять A<sub>r</sub> самого тяжёлого элемента'],
{short:'Mr = Σ (индекс · A<sub>r</sub>).',explain:'M<sub>r</sub> = сумма A<sub>r</sub> всех атомов. Каждый атом считается столько раз, сколько их в формуле: M<sub>r</sub>(H₂O) = 2·1 + 16 = 18, а не 1 + 16 = 17.',
explain2:'Как взвесить корзину с яблоками: вес одного яблока умножаешь на число яблок и прибавляешь вес остального.'});
G(4,()=>{const f=pick(['H2O','CO2','NaCl','HCl','CaO','SO2','SO3','NH3','CH4','Fe2O3','Al2O3','CuO','MgO','P2O5','Na2O','KCl','H2S','CuCl2','FeCl3','ZnO','N2O5','SiO2','Cu2O','MnO2']);const m=Mr(f);
return {type:'num',q:`Вычисли M<sub>r</sub>(${C(f)}). A<sub>r</sub>: ${Object.keys(parseF(f)).map(e=>`${e} = ${N(AR[e])}`).join(', ')}.`,ans:m,
short:`M<sub>r</sub> = ${MrSum(f)}.`,explain:`M<sub>r</sub>(${C(f)}) = ${MrSumL(f)} = ${MrSum(f)}. Ответ: <b>${N(m)}</b>.`,
explain2:`Разложи формулу на атомы: ${Object.entries(parseF(f)).map(([e,k])=>`${k} шт. ${e} по ${N(AR[e])}`).join(', ')}. Сложи массы: ${Object.entries(parseF(f)).map(([e,k])=>N(k*AR[e])).join(' + ')} = ${N(m)}.`};});
G(4,()=>{const f=pick(['H2SO4','HNO3','H3PO4','Ca(OH)2','Al2(SO4)3','CaCO3','NaOH','Fe(OH)3','CuSO4','Ca3(PO4)2','KMnO4','Na2CO3','Ba(NO3)2','Mg(OH)2','NH4NO3','Fe2(SO4)3','AgNO3','K2SO4']);const m=Mr(f);
return {type:'num',q:`Вычисли M<sub>r</sub>(${C(f)}). A<sub>r</sub>: ${Object.keys(parseF(f)).map(e=>`${e} = ${N(AR[e])}`).join(', ')}.`,ans:m,hint:'Индекс за скобкой умножает всю скобку.',
short:`M<sub>r</sub> = ${MrSum(f)}.`,explain:`Сначала считаем атомы: ${Object.entries(parseF(f)).map(([e,k])=>`${e} — ${k}`).join(', ')}.<br>M<sub>r</sub> = ${MrSum(f)}. Ответ: <b>${N(m)}</b>.`,
explain2:`Можно считать по частям. ${/\(/.test(f)?`Масса группы в скобках: M<sub>r</sub>(${C(f.match(/\(([^)]+)\)/)[1])}) = ${N(Mr(f.match(/\(([^)]+)\)/)[1]))}; умножаем на ${f.match(/\)(\d)/)[1]} и прибавляем остальное.`:`Например, ${Object.entries(parseF(f)).map(([e,k])=>`${k}·${N(AR[e])} = ${N(k*AR[e])}`).join('; ')}.`} Итог ${N(m)}.`};});
G(4,()=>{for(;;){const fs=sample(['H2O','CO2','SO2','NH3','CH4','CaO','NaCl','HCl','O2','N2','H2S','MgO','NO2','SO3','CO'],4);const ms=fs.map(Mr);const mx=Math.max(...ms);if(ms.filter(x=>x===mx).length>1)continue;const f=fs[ms.indexOf(mx)];
return CH('У какого вещества <b>самая большая</b> M<sub>r</sub>?',C(f),fs.filter(x=>x!==f).map(C),{short:fs.map(x=>`${C(x)}: ${N(Mr(x))}`).join(', '),
explain:`Считаем каждую: ${fs.map(x=>`M<sub>r</sub>(${C(x)}) = ${MrSum(x)}`).join('; ')}. Больше всех — <b>${C(f)}</b> (${N(mx)}).`,
explain2:`Не суди по числу атомов! У CH₄ пять атомов, а M<sub>r</sub> всего 16, потому что водород очень лёгкий (1). Тяжёлые атомы — S (32), Cl (35,5), O (16).`});}});
G(4,()=>{const P=[['CuSO4',5],['FeSO4',7],['Na2CO3',10],['CaCl2',6],['MgSO4',7],['BaCl2',2],['CaSO4',2],['Na2SO4',10],['ZnSO4',7]];const [s,x]=pick(P);const f=`${s}·${x}H2O`;const m=Mr(f);
return {type:'num',q:`Вычисли M<sub>r</sub> кристаллогидрата ${C(f)}. Точка «·» значит «вместе с».`,ans:m,
short:`${N(Mr(s))} + ${x}·18 = ${N(m)}.`,explain:`M<sub>r</sub>(${C(s)}) = ${MrSum(s)}.<br>M<sub>r</sub>(H₂O) = 18, молекул воды ${x}: ${x}·18 = ${18*x}.<br>Сумма: ${N(Mr(s))} + ${18*x} = <b>${N(m)}</b>.`,
explain2:`Точка в формуле — это не умножение, а «плюс ещё ${x} молекул воды». Поэтому массы складываем: соль + ${x}×вода.`};});

/* L5 — массовая доля */
RULE(5,'По какой формуле считают массовую долю элемента в веществе?','w(Э) = n·A<sub>r</sub>(Э) / M<sub>r</sub> · 100%',['w(Э) = A<sub>r</sub>(Э) / M<sub>r</sub> · 100% (индекс не нужен)','w(Э) = M<sub>r</sub> / A<sub>r</sub>(Э) · 100%','w(Э) = n / (число всех атомов) · 100%'],
{short:'Масса всех атомов элемента / M<sub>r</sub>.',explain:'w — это доля массы: масса всех атомов элемента (n·A<sub>r</sub>) делить на массу всей молекулы M<sub>r</sub>. Индекс n обязателен: в Fe₂O₃ железа два атома. И это доля <b>массы</b>, а не числа атомов: в H₂O атомов водорода 2/3, а по массе всего 11%.',
explain2:'Доля сыра в пицце = масса сыра / масса пиццы. Если сыра два куска — его масса удваивается. Так и с индексом.'});
G(5,()=>{for(;;){const P=['H2O','CO2','SO2','SO3','Fe2O3','CuO','Al2O3','NaCl','CaCO3','H2SO4','HNO3','NH3','CH4','MgO','NaOH','CuSO4','KMnO4','Fe3O4','P2O5','Ca(OH)2','NH4NO3','Ca3(PO4)2','Na2CO3','KNO3'];const f=pick(P);const c=parseF(f);const e=pick(Object.keys(c));const m=Mr(f);const w=c[e]*AR[e]/m*100;
const t=NUM(`Вычисли массовую долю ${EN[e]==='медь'?'меди':EN[e]==='железо'?'железа':EN[e]==='сера'?'серы':'элемента '+e} в ${C(f)}${f==='NH4NO3'?' (аммиачная селитра — удобрение)':f==='Fe2O3'?' (гематит — железная руда)':f==='CaCO3'?' (мел)':''}. Ответ в процентах.`,w,1,
{short:`w(${e}) = ${c[e]>1?c[e]+'·':''}${N(AR[e])} / ${N(m)} · 100% ≈ ${N(rd(w,1))}%.`,
explain:`1) M<sub>r</sub>(${C(f)}) = ${MrSum(f)}.<br>2) Атомов ${e} — ${c[e]}, их масса ${c[e]>1?c[e]+'·':''}${N(AR[e])} = ${N(c[e]*AR[e])}.<br>3) w(${e}) = ${N(c[e]*AR[e])} / ${N(m)} · 100% ≈ <b>${N(rd(w,1))}%</b>.`,
explain2:`Представь 100 молекул-«рюкзаков»… проще: возьми одну молекулу массой ${N(m)}. Из неё на ${e} приходится ${N(c[e]*AR[e])}. Доля: ${N(c[e]*AR[e])} из ${N(m)} = ${N(rd(c[e]*AR[e]/m,4))} ≈ ${N(rd(w,1))}%.`});if(t&&w>2&&w<98)return t;}});
G(5,()=>{for(;;){const fs=sample(['H2O','CO2','SO2','SO3','CuO','Al2O3','MgO','CaO','Fe2O3','Na2O','P2O5','SiO2','CO','NO2','ZnO','K2O'],4);const ws=fs.map(f=>parseF(f).O*16/Mr(f));const mx=Math.max(...ws);if(ws.filter(x=>Math.abs(x-mx)<0.01).length>1)continue;const f=fs[ws.indexOf(mx)];
return CH('В каком оксиде массовая доля кислорода <b>наибольшая</b>?',C(f),fs.filter(x=>x!==f).map(C),{short:fs.map((x,i)=>`${C(x)}: ${N(rd(ws[i]*100,1))}%`).join(', '),
explain:`Считаем w(O) = n·16 / M<sub>r</sub>:<br>${fs.map((x,i)=>`${C(x)}: ${parseF(x).O}·16 / ${N(Mr(x))} ≈ ${N(rd(ws[i]*100,1))}%`).join('<br>')}<br>Больше всех — <b>${C(f)}</b>.`,
explain2:'Чем легче второй элемент и чем больше атомов кислорода на него приходится, тем выше доля кислорода. Тяжёлые металлы (Zn, Cu, K) «перетягивают» массу на себя.'});}});
G(5,()=>{const P=[['Fe2O3','Fe','гематита (железная руда)'],['CuO','Cu','оксида меди(II)'],['Al2O3','Al','глинозёма Al₂O₃'],['NaCl','Na','поваренной соли'],['CaCO3','Ca','мела'],['Fe3O4','Fe','магнетита (магнитная руда)'],['NH4NO3','N','аммиачной селитры'],['H2O','H','воды']];const [f,e,nm]=pick(P);const c=parseF(f);const m=Mr(f);const mm=pick([10,20,50,100,200,500,1000]);const w=c[e]*AR[e]/m;
return NUM(`Сколько граммов ${e==='Fe'?'железа':e==='Cu'?'меди':e==='Al'?'алюминия':e==='Na'?'натрия':e==='Ca'?'кальция':e==='N'?'азота':'водорода'} содержится в ${mm} г ${nm} ${C(f)}?`,mm*w,1,
{short:`m = ${mm} · ${N(c[e]*AR[e])} / ${N(m)} ≈ ${N(rd(mm*w,1))} г.`,explain:`1) w(${e}) = ${N(c[e]*AR[e])} / ${N(m)} ≈ ${N(rd(w,4))}.<br>2) m(${e}) = m(вещества) · w = ${mm} · ${N(rd(w,4))} ≈ <b>${N(rd(mm*w,1))} г</b>.`,
explain2:`Пропорция: в ${N(m)} г вещества — ${N(c[e]*AR[e])} г ${e}; в ${mm} г — x г. x = ${mm}·${N(c[e]*AR[e])} / ${N(m)} ≈ ${N(rd(mm*w,1))} г.`});});
G(5,()=>{for(;;){const f=pick(['H2SO4','HNO3','CaCO3','NaOH','KMnO4','CuSO4','Na2CO3','KNO3','H3PO4','Ca(OH)2']);const c=parseF(f);const es=Object.keys(c);if(es.length!==3)continue;const m=Mr(f);const w=es.map(e=>rd(c[e]*AR[e]/m*100,1));const k=R(0,2);const rest=rd(100-w.filter((_,i)=>i!==k).reduce((a,b)=>a+b,0),1);if(Math.abs(rest-w[k])>0.15)continue;
const known=es.filter((_,i)=>i!==k);
const t=NUM(`В ${C(f)} массовые доли: w(${known[0]}) = ${N(w[es.indexOf(known[0])])}%, w(${known[1]}) = ${N(w[es.indexOf(known[1])])}%. Найди w(${es[k]}) без вычисления M<sub>r</sub>. Ответ в процентах.`,rest,1,
{short:`100 − ${N(w[es.indexOf(known[0])])} − ${N(w[es.indexOf(known[1])])} = ${N(rest)}%.`,explain:`Сумма массовых долей всех элементов — 100%. w(${es[k]}) = 100 − ${N(w[es.indexOf(known[0])])} − ${N(w[es.indexOf(known[1])])} = <b>${N(rest)}%</b>.`,
explain2:`Проверим «по-честному»: w(${es[k]}) = ${c[es[k]]>1?c[es[k]]+'·':''}${N(AR[es[k]])} / ${N(m)} ≈ ${N(w[k])}%. Сходится.`});if(t)return t;}});

/* L6 — вывод формулы */
RULE(6,'Как найти отношение индексов x : y по массовым долям элементов?','x : y = w(A)/A<sub>r</sub>(A) : w(B)/A<sub>r</sub>(B)',['x : y = w(A) : w(B)','x : y = A<sub>r</sub>(A) : A<sub>r</sub>(B)','x : y = w(A)·A<sub>r</sub>(A) : w(B)·A<sub>r</sub>(B)'],
{short:'Делим каждую долю на A<sub>r</sub>.',explain:'В 100 г вещества масса элемента = его проценту. Чтобы перейти от массы к числу атомов, делим на массу одного атома A<sub>r</sub>. Отношение полученных чисел и есть x : y. Просто w(A) : w(B) нельзя — атомы весят по-разному.',
explain2:'Если в мешке 70 кг арбузов по 7 кг и 30 кг яблок по 0,3 кг, то арбузов 10, а яблок 100. Делим массу на «массу одной штуки» — получаем количество. С атомами то же.'});
const DER=['Fe2O3','FeO','Fe3O4','CuO','Cu2O','SO2','SO3','P2O5','N2O5','NO2','N2O','Al2O3','CO2','CO','MgO','Na2O','Cl2O7','Mn2O7','MnO2','CrO3','Cr2O3','CH4','NH3','H2S','FeS','FeS2','CuS','Al2S3','K2O','Li2O','SiO2'];
function deriveOK(A,B,wA,x,y){const r=(wA/AR[A])/((100-wA)/AR[B]);let best=null;for(let a=1;a<=8;a++)for(let b=1;b<=8;b++){if(H.gcd(a,b)!==1)continue;const e=Math.abs(a/b-r)/r;if(!best||e<best[0])best=[e,a,b];}return best[1]===x&&best[2]===y&&best[0]<0.02;}
G(6,()=>{for(;;){const f=pick(DER);const c=parseF(f);const [A,B]=Object.keys(c);const x=c[A],y=c[B];const wA=rd(x*AR[A]/Mr(f)*100,1);if(!deriveOK(A,B,wA,x,y))continue;
const cand=[];for(const [dx,dy] of [[1,0],[0,1],[-1,0],[0,-1],[1,1],[2,1],[1,2]]){const a=x+dx,b=y+dy;if(a<1||b<1)continue;const g=H.gcd(a,b);const ff=fXY(A,a/g,B,b/g);if(ff===f)continue;const wf=(a*AR[A])/(a*AR[A]+b*AR[B])*100;if(Math.abs(wf-wA)<1.5)continue;cand.push(ff);}
if(y!==x)cand.unshift(fXY(A,y,B,x));const ws=[...new Set(cand)].filter(z=>z!==f).slice(0,3);if(ws.length<3)continue;
const nA=wA/AR[A],nB=(100-wA)/AR[B],mn=Math.min(nA,nB);
return CH(`Вещество состоит из ${A} и ${B}: w(${A}) = ${N(wA)}%, w(${B}) = ${N(rd(100-wA,1))}%. Какова его простейшая формула?`,C(f),ws.map(C),
{hint:'Раздели каждый процент на A<sub>r</sub>, потом всё — на меньшее число.',short:`${N(rd(nA,3))} : ${N(rd(nB,3))} = ${x} : ${y} → ${C(f)}.`,
explain:`1) Делим на A<sub>r</sub>: ${A}: ${N(wA)} / ${N(AR[A])} ≈ ${N(rd(nA,3))}; ${B}: ${N(rd(100-wA,1))} / ${N(AR[B])} ≈ ${N(rd(nB,3))}.<br>2) Делим на меньшее (${N(rd(mn,3))}): ${N(rd(nA/mn,2))} : ${N(rd(nB/mn,2))}.<br>3) Доводим до целых: <b>${x} : ${y}</b> → ${C(f)}.`,
explain2:`Проверка обратным ходом: M<sub>r</sub>(${C(f)}) = ${MrSum(f)}; w(${A}) = ${N(x*AR[A])} / ${N(Mr(f))} ≈ ${N(wA)}% — совпало. Можно так проверить каждый вариант ответа и выбрать подходящий.`});}});
G(6,()=>{for(;;){const f=pick(['FeS','CuO','SO2','SO3','CH4','H2O','Fe2O3','MgO','CO2','NO2','CaO','Cu2S','FeS2','SiO2','Al2O3','MgS','N2O5']);const c=parseF(f);const [A,B]=Object.keys(c);let mA=c[A]*AR[A],mB=c[B]*AR[B];const g=H.gcd(mA,mB);mA/=g;mB/=g;if(mA>40||mB>40)continue;
return TXT(`В веществе из ${A} и ${B} массы элементов относятся как m(${A}) : m(${B}) = ${mA} : ${mB}. Выведи формулу (A<sub>r</sub>: ${A} = ${AR[A]}, ${B} = ${AR[B]}).`,f,
{short:`${mA}/${AR[A]} : ${mB}/${AR[B]} = ${c[A]} : ${c[B]}.`,explain:`Отношение атомов = отношение масс, делённых на A<sub>r</sub>:<br>x : y = ${mA}/${AR[A]} : ${mB}/${AR[B]} = ${N(rd(mA/AR[A],4))} : ${N(rd(mB/AR[B],4))} = <b>${c[A]} : ${c[B]}</b> → ${C(f)}.`,
explain2:`Проверка: в ${C(f)} масса ${A} — ${c[A]}·${AR[A]} = ${c[A]*AR[A]}, масса ${B} — ${c[B]}·${AR[B]} = ${c[B]*AR[B]}. Отношение ${c[A]*AR[A]} : ${c[B]*AR[B]} = ${mA} : ${mB} ✔`});}});
G(6,()=>{for(;;){const f=pick(DER);const c=parseF(f);const [A,B]=Object.keys(c);const x=c[A],y=c[B];if(x===1&&y===1)continue;const wA=rd(x*AR[A]/Mr(f)*100,1);if(!deriveOK(A,B,wA,x,y))continue;const which=R(0,1);
return {type:'num',q:`Вещество из ${A} и ${B}: w(${A}) = ${N(wA)}%. Выведи простейшую формулу ${A}<sub>x</sub>${B}<sub>y</sub> и введи индекс <b>${which?'y':'x'}</b> (у ${which?B:A}).`,ans:which?y:x,
short:`Формула ${C(f)}.`,explain:`${N(wA)} / ${N(AR[A])} : ${N(rd(100-wA,1))} / ${N(AR[B])} ≈ ${N(rd(wA/AR[A],3))} : ${N(rd((100-wA)/AR[B],3))} ≈ ${x} : ${y}. Формула ${C(f)}, индекс ${which?'y':'x'} = <b>${which?y:x}</b>.`,
explain2:`Возьми 100 г вещества: ${N(wA)} г ${A} и ${N(rd(100-wA,1))} г ${B}. «Штук» атомов: ${N(rd(wA/AR[A],3))} и ${N(rd((100-wA)/AR[B],3))}. Подели на меньшее и умножь, чтобы стало целым: ${x} и ${y}.`};}});

/* L7 ★ */
RULE(7,'Почему по одним массовым долям нельзя найти <b>истинную</b> формулу вещества?','Проценты дают только отношение атомов: у C₂H₄ и C₃H₆ они одинаковые — нужна ещё M<sub>r</sub>',['Можно: проценты всегда дают истинную формулу','Потому что сумма процентов не равна 100%','Потому что A<sub>r</sub> бывают дробными'],
{short:'По w — простейшая формула, по w и M<sub>r</sub> — истинная.',explain:'Массовые доли зависят только от отношения атомов. CH₂, C₂H₄, C₃H₆ — у всех w(C) = 85,7%. Чтобы понять, сколько атомов на самом деле, нужна M<sub>r</sub> (или плотность газа): n = w·M<sub>r</sub> / A<sub>r</sub>.',
explain2:'Рецепт «1 яйцо на 2 ложки муки» не говорит, сколько всего ты испёк блинов. Пропорция одна, а порции могут быть разные. M<sub>r</sub> — это размер порции.'});
RULE(7,'Что означает запись CuSO₄·5H₂O?','На одну частицу CuSO₄ в кристалле приходится 5 молекул воды',['CuSO₄ умножить на 5H₂O','Раствор CuSO₄ в пяти литрах воды','Смесь CuSO₄ и 5% воды'],
{short:'Кристаллогидрат: соль + 5 молекул воды.',explain:'Точка в формуле кристаллогидрата значит «вместе с»: в кристалле на каждую CuSO₄ приходится 5 молекул H₂O. Поэтому M<sub>r</sub> = 160 + 5·18 = 250 — массы складываются, а не умножаются.',
explain2:'Представь коробку конфет, где к каждой конфете приложено 5 фантиков. Это одна «упаковка» — CuSO₄ плюс 5 H₂O.'});
G(7,()=>{const P=[['CH4',16],['C2H6',30],['C3H8',44],['C4H10',58],['C2H4',28],['C3H6',42],['C4H8',56],['C2H2',26],['C6H6',78],['C5H12',72]];const [f,m]=pick(P);const c=parseF(f);const wC=rd(c.C*12/m*100,1);
return TXT(`★ Углеводород (вещество из C и H) содержит ${N(wC)}% углерода, его M<sub>r</sub> = ${m}. Найди истинную формулу.`,f,
{hint:'n(C) = w·Mr / 12, n(H) = (1 − w)·Mr / 1.',short:`n(C) = ${N(wC/100)}·${m}/12 → ${c.C}, n(H) = ${N(rd(1-wC/100,3))}·${m}/1 → ${c.H}: ${C(f)}.`,
explain:`Число атомов = w · M<sub>r</sub> / A<sub>r</sub>.<br>n(C) = ${N(wC/100)}·${m} / 12 ≈ ${N(rd(wC/100*m/12,2))} → <b>${c.C}</b>.<br>n(H) = ${N(rd(1-wC/100,3))}·${m} / 1 ≈ ${N(rd((1-wC/100)*m,2))} → <b>${c.H}</b>.<br>Формула ${C(f)}. Проверка: ${c.C}·12 + ${c.H}·1 = ${m} ✔`,
explain2:`Другой путь: сначала простейшая формула по процентам: ${N(wC)}/12 : ${N(rd(100-wC,1))}/1 ≈ 1 : ${N(rd(c.H/c.C,2))}${c.H/c.C===2?' → CH₂ (M<sub>r</sub> = 14)':''}. Потом смотрим, во сколько раз M<sub>r</sub> = ${m} больше массы простейшей формулы, и умножаем индексы. Получаем ${C(f)}.`});},{star:true});
const OXEL=[['P2O5','P'],['N2O5','N'],['SO3','S'],['CrO3','Cr'],['SO2','S'],['SiO2','Si'],['CO2','C'],['MnO2','Mn'],['Al2O3','Al'],['Fe2O3','Fe'],['Cr2O3','Cr'],['Cl2O7','Cl'],['Mn2O7','Mn'],['MgO','Mg'],['CaO','Ca'],['ZnO','Zn'],['CuO','Cu'],['BaO','Ba'],['Na2O','Na'],['K2O','K']];
G(7,()=>{for(;;){const [f,e]=pick(OXEL);const c=parseF(f);const w=rd(c[e]*AR[e]/Mr(f)*100,1);const tmpl=f.replace(e,'Э');const ar=w*16*c.O/((100-w)*c[e]);
const all=Object.keys(AR).filter(x=>x!=='O'&&x!=='He'&&x!=='Ne'&&x!=='Ar');const near=all.filter(x=>x!==e).sort((a,b)=>Math.abs(AR[a]-ar)-Math.abs(AR[b]-ar));if(Math.abs(AR[near[0]]-ar)<1.5)continue;
const ws=near.slice(0,3);
return CH(`★ Оксид элемента имеет формулу ${C(tmpl)}, массовая доля элемента в нём ${N(w)}%. Что это за элемент?`,`${e} (${EN[e]})`,ws.map(x=>`${x} (${EN[x]||x})`),
{hint:`Пусть A<sub>r</sub>(Э) = a. Тогда w = ${c[e]>1?c[e]+'a':'a'} / (${c[e]>1?c[e]+'a':'a'} + ${16*c.O}).`,short:`A<sub>r</sub> ≈ ${N(rd(ar,1))} → ${e}.`,
explain:`Обозначим A<sub>r</sub>(Э) = a. M<sub>r</sub> = ${c[e]>1?c[e]+'a':'a'} + ${c.O}·16.<br>${N(w/100)} = ${c[e]>1?c[e]+'a':'a'} / (${c[e]>1?c[e]+'a':'a'} + ${16*c.O}).<br>Доля кислорода ${N(rd(100-w,1))}% — это ${16*c.O}. Значит, на элемент приходится ${16*c.O}·${N(w)}/${N(rd(100-w,1))} ≈ ${N(rd(ar*c[e],1))}${c[e]>1?`, на один атом — ${N(rd(ar,1))}`:''}.<br>A<sub>r</sub> ≈ ${N(rd(ar,1))} — это <b>${e}</b> (${EN[e]}).`,
explain2:`Проверка подстановкой: M<sub>r</sub>(${C(f)}) = ${MrSum(f)}; w(${e}) = ${N(c[e]*AR[e])} / ${N(Mr(f))} ≈ ${N(w)}% ✔. Для ${ws[0]}: ${N(c[e]*AR[ws[0]])} / ${N(c[e]*AR[ws[0]]+16*c.O)} ≈ ${N(rd(c[e]*AR[ws[0]]/(c[e]*AR[ws[0]]+16*c.O)*100,1))}% — не подходит.`});}},{star:true});
const HYD=[['CuSO4',5,'медного купороса'],['FeSO4',7,'железного купороса'],['Na2CO3',10,'кристаллической соды'],['CaCl2',6,'кристаллогидрата хлорида кальция'],['MgSO4',7,'английской соли'],['BaCl2',2,'кристаллогидрата хлорида бария'],['CaSO4',2,'гипса'],['Na2SO4',10,'глауберовой соли'],['ZnSO4',7,'цинкового купороса']];
G(7,()=>{for(;;){const [s,x,nm]=pick(HYD);const M=Mr(s);const w=rd(18*x/(M+18*x)*100,1);const xc=w/100*M/(18*(1-w/100));if(Math.abs(xc-x)>0.2)continue;
return {type:'num',q:`★ Массовая доля воды в кристаллогидрате ${C(s)}·xH₂O равна ${N(w)}%. Найди x.`,ans:x,hint:'w = 18x / (Mr(соли) + 18x).',
short:`x = ${N(w/100)}·${N(M)} / (18·${N(rd(1-w/100,3))}) ≈ ${x}.`,
explain:`M<sub>r</sub>(${C(s)}) = ${MrSum(s)}.<br>w(H₂O) = 18x / (${N(M)} + 18x) = ${N(w/100)}.<br>18x = ${N(w/100)}·(${N(M)} + 18x) → 18x·${N(rd(1-w/100,3))} = ${N(rd(w/100*M,2))} → x ≈ ${N(rd(xc,2))}, т. е. <b>x = ${x}</b>.`,
explain2:`Возьмём 100 г: воды ${N(w)} г, соли ${N(rd(100-w,1))} г. «Порций» соли: ${N(rd(100-w,1))} / ${N(M)} ≈ ${N(rd((100-w)/M,4))}; «порций» воды: ${N(w)} / 18 ≈ ${N(rd(w/18,4))}. Отношение ≈ 1 : ${x}.`};}},{star:true});
G(7,()=>{const [s,x,nm]=pick(HYD);const M=Mr(s)+18*x;const w=18*x/M*100;
return NUM(`★ Найди массовую долю воды в кристаллогидрате ${C(s+'·'+x+'H2O')}. Ответ в процентах.`,w,1,{short:`${18*x} / ${N(M)} · 100% ≈ ${N(rd(w,1))}%.`,
explain:`M<sub>r</sub> = ${N(Mr(s))} + ${x}·18 = ${N(M)}. Масса воды — ${x}·18 = ${18*x}.<br>w(H₂O) = ${18*x} / ${N(M)} · 100% ≈ <b>${N(rd(w,1))}%</b>.`,
explain2:`Вода в формуле — «отдельный кусок» массой ${18*x}. Доля этого куска в общей массе ${N(M)}: ${N(rd(w,1))}%. ${s==='CuSO4'?'Ровно 36% — поэтому купорос при прокаливании так сильно теряет в массе.':''}`});},{star:true});
G(7,()=>{for(;;){const [s,x,nm]=pick(HYD);const M=Mr(s)+18*x;const m=pick([10,20,25,50,100,250,500]);const mw=m*18*x/M;const t=NUM(`★ Сколько граммов воды улетит при полном прокаливании ${m} г ${nm} ${C(s+'·'+x+'H2O')}?`,mw,1,
{short:`${m}·${18*x}/${N(M)} ≈ ${N(rd(mw,1))} г.`,explain:`M<sub>r</sub>(${C(s+'·'+x+'H2O')}) = ${N(Mr(s))} + ${18*x} = ${N(M)}; доля воды ${18*x}/${N(M)}.<br>m(H₂O) = ${m} · ${18*x} / ${N(M)} ≈ <b>${N(rd(mw,1))} г</b>. Останется ${N(rd(m-mw,1))} г безводной соли.`,
explain2:`Пропорция: из ${N(M)} г кристаллогидрата уходит ${18*x} г воды, из ${m} г — x г. x = ${m}·${18*x}/${N(M)} ≈ ${N(rd(mw,1))} г.`});if(t)return t;}},{star:true});
G(7,()=>{for(;;){const f=pick(['KMnO4','CaCO3','Na2SO4','H2SO4','HNO3','KNO3','K2CO3','Na2CO3','KClO3','CuSO4','Na3PO4']);const c=parseF(f);const es=Object.keys(c);const m=Mr(f);
const cand=[];es.forEach(e=>{[-1,1].forEach(d=>{const cc=Object.assign({},c);cc[e]+=d;if(cc[e]<1)return;const ff=es.map(z=>z+(cc[z]>1?cc[z]:'')).join('');if(ff!==f)cand.push(ff);});});
const wsC=shuffle(cand).filter(ff=>{const cf=parseF(ff);return es.some(e=>Math.abs(cf[e]*AR[e]/Mr(ff)-c[e]*AR[e]/m)>0.015);}).slice(0,3);if(wsC.length<3)continue;
const wv=es.map(e=>rd(c[e]*AR[e]/m*100,1));const nn=es.map((e,i)=>wv[i]/AR[e]);const mn=Math.min(...nn);
return CH(`★ Состав вещества: ${es.map((e,i)=>`${e} — ${N(wv[i])}%`).join(', ')}. Какова его формула?`,C(f),wsC.map(C),
{short:es.map((e,i)=>`${N(rd(nn[i]/mn,2))}`).join(' : ')+` → ${C(f)}`,
explain:`Делим каждую долю на A<sub>r</sub>: ${es.map((e,i)=>`${e}: ${N(wv[i])}/${N(AR[e])} ≈ ${N(rd(nn[i],3))}`).join('; ')}.<br>Делим на наименьшее (${N(rd(mn,3))}): ${es.map((e,i)=>N(rd(nn[i]/mn,2))).join(' : ')} ≈ ${es.map(e=>c[e]).join(' : ')}.<br>Формула <b>${C(f)}</b>.`,
explain2:`Можно проверить варианты: для ${C(f)} M<sub>r</sub> = ${MrSum(f)}, доли ${es.map((e,i)=>`${e} ${N(wv[i])}%`).join(', ')} — совпадает. У других вариантов хотя бы одна доля отличается больше чем на 1,5%.`});}},{star:true});
G(7,()=>{for(;;){const P=[['CH4','C',4],['SiH4','Si',4],['NH3','N',3],['PH3','P',3],['H2S','S',2],['HCl','Cl',1]];const [f,e,n]=pick(P);const w=rd(n/Mr(f)*100,1);const tmpl=n===1?'HЭ':n===2?'H₂Э':`ЭH${'₀₁₂₃₄₅₆₇₈₉'[n]}`;const ar=n*(100-w)/w;
const opts=Object.keys(AR).filter(x=>!['H','He','Ne','Ar'].includes(x)&&x!==e).sort((a,b)=>Math.abs(AR[a]-ar)-Math.abs(AR[b]-ar));if(Math.abs(AR[opts[0]]-ar)<1)continue;
return CH(`★ Элемент образует с водородом летучее соединение ${tmpl}, в котором массовая доля водорода ${N(w)}%. Какой это элемент?`,`${e} (${EN[e]})`,opts.slice(0,3).map(x=>`${x} (${EN[x]||x})`),
{short:`A<sub>r</sub> = ${n}·(100 − ${N(w)}) / ${N(w)} ≈ ${N(rd(ar,1))} → ${e}.`,
explain:`На водород (${n} ${H.plural(n,'атом','атома','атомов')}, масса ${n}) приходится ${N(w)}% массы. Тогда масса элемента: ${n} · (100 − ${N(w)}) / ${N(w)} ≈ ${N(rd(ar,1))}. A<sub>r</sub> ≈ ${N(rd(ar,1))} → <b>${e}</b>, соединение ${C(f)}.`,
explain2:`Проверка: M<sub>r</sub>(${C(f)}) = ${MrSum(f)}; w(H) = ${n} / ${N(Mr(f))} ≈ ${N(w)}% ✔. Подсказка из таблицы: у элемента должна быть валентность ${ROM[n]} с водородом.`});}},{star:true});

window.TOPIC={id:'c8_formulas',title:'Формулы и валентность',subtitle:'Химия · 8 класс',
intro:`<p>Почему вода — H₂O, а не HO? Научишься по валентности сам писать формулы веществ (правило «крест-накрест»), находить валентность по формуле, считать M<sub>r</sub> и массовую долю элемента, а по процентам — выводить формулу, как настоящий химик-аналитик. Есть конструктор формул, а в конце — олимпиадные задачи и кристаллогидраты.</p>`,
theory,symbols,figs,onTheory,
levels:['Валентность','Формулы по валентности','Валентность по формуле','Группы атомов и скобки','Относительная молекулярная масса Mr','Массовая доля элемента','Вывод формулы по массовым долям','★ Олимпиадные задачи'],
gens};
})();
