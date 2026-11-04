(function(){
const {R,pick,shuffle,sample,range,plural}=H;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const C=s=>`<pre class="code">${esc(s)}</pre>`;
const RUN=(code,inp)=>`<pre class="run"${inp!=null?` data-input="${esc(inp).replace(/"/g,'&quot;')}"`:''}>${esc(code)}</pre>`;
const pyl=a=>'['+a.join(', ')+']';
const lst=(n,lo,hi)=>{const a=[];for(let i=0;i<n;i++)a.push(R(lo,hi));return a;};
const T=(inp,out)=>({in:inp,out:String(out)});
const lines=a=>a.join('\n');
const choiceOf=(right,wrongs)=>{const o=[right];for(const w of wrongs){if(!o.includes(w))o.push(w);}const opts=shuffle(o);return {opts,ans:opts.indexOf(right)};};
const isPrime=n=>{if(n<2)return false;for(let d=2;d*d<=n;d++)if(n%d===0)return false;return true;};
const primesTo=n=>range(2,n).filter(isPrime);
const dsum=n=>String(n).split('').reduce((s,c)=>s+ +c,0);
function binSteps(a,x){let l=0,r=a.length-1,s=0;const tr=[];while(l<=r){const m=Math.floor((l+r)/2);s++;tr.push({l,r,m,v:a[m]});if(a[m]===x)break;else if(a[m]<x)l=m+1;else r=m-1;}return {s,tr};}
function bubblePass(a){a=a.slice();let sw=0;for(let j=0;j<a.length-1;j++)if(a[j]>a[j+1]){[a[j],a[j+1]]=[a[j+1],a[j]];sw++;}return {a,sw};}
function inversions(a){let k=0;for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++)if(a[i]>a[j])k++;return k;}
function selSteps(a,k){a=a.slice();for(let i=0;i<k;i++){let m=i;for(let j=i+1;j<a.length;j++)if(a[j]<a[m])m=j;[a[i],a[m]]=[a[m],a[i]];}return a;}
const guesses=N=>Math.floor(Math.log2(N))+1;

/* ---------- theory ---------- */
const theory=[
{title:'Что мы уже умеем',lvl:0,html:`
<p>В модуле «8. Функции» ты научился делать свои команды с <code>def</code> и <code>return</code>, а раньше — списки, циклы и условия. Это все кирпичики. Теперь научимся строить из них <b>умные</b> решения.</p>
<p class="hook">Загадай число от 1 до 1000. Я угадаю его не больше чем за <b>10 вопросов</b> вида «больше или меньше?». А для чисел до миллиона хватит 20 вопросов. Как? Это и есть алгоритм — и сегодня ты научишься делать так же.</p>`},
{title:'Алгоритм и линейный поиск',lvl:0,html:`
<div class="box rule"><b>Правило</b><b>Алгоритм</b> — точная последовательность шагов, которая для любых допустимых входных данных за конечное число шагов приводит к ответу. Как рецепт, но такой точный, что его может выполнить даже робот.</div>
<p>Самый простой алгоритм поиска — <b>линейный</b>: смотрим элементы по очереди, пока не найдём.</p>
${RUN(`a = [7, 3, 9, 4, 8, 1]
x = 4
pos = -1
for i in range(len(a)):
    if a[i] == x:
        pos = i
        break
print("Индекс:", pos)`)}
<p>Поменяй x на 5 — его нет, и программа напечатает −1. Это договорённость: «−1 значит не нашли».</p>
<div class="box tip"><b>Сколько это стоит</b>Если элементов n, то в худшем случае (элемента нет или он последний) нужно <b>n сравнений</b>. Для 1000 элементов — 1000, для миллиарда — миллиард.</div>
<div class="box err"><b>Ошибка</b>Не печатай «не найдено» внутри цикла в else — это ты помнишь из модуля про списки. Решение — после цикла.</div>`},
{title:'Бинарный поиск: игра «угадай число»',lvl:1,html:`
<p>Попробуй сам: компьютер загадал число от 1 до 1000.</p>
<div class="widget" id="w-guess"></div>
<div class="box rule"><b>Правило</b><b>Бинарный поиск</b> (поиск делением пополам) работает только в <b>отсортированном</b> списке. Смотрим на середину: если искомое больше — выкидываем левую половину, если меньше — правую. Каждый шаг вдвое уменьшает область поиска.</div>
<p>Почему 10 вопросов для 1000? После каждого вопроса остаётся половина: 1000 → 500 → 250 → 125 → 63 → 32 → 16 → 8 → 4 → 2 → 1. Нужно столько шагов, сколько раз можно делить 1000 пополам до 1. Так как 2¹⁰ = 1024 ≥ 1000, хватает 10.</p>
${RUN(`a = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
x = 23
left = 0
right = len(a) - 1
steps = 0
while left <= right:
    mid = (left + right) // 2
    steps += 1
    print("смотрю a[", mid, "] =", a[mid])
    if a[mid] == x:
        print("Нашёл на месте", mid, "за", steps, "шага")
        break
    elif a[mid] < x:
        left = mid + 1
    else:
        right = mid - 1`)}
<p>Поменяй x на 91, на 2, на 50 (его нет). Сколько шагов в каждом случае?</p>
<div class="box err"><b>Частые ошибки</b>
• Список не отсортирован — бинарный поиск даёт чепуху.<br>
• <code>left = mid</code> вместо <code>mid + 1</code> — может получиться вечный цикл.<br>
• <code>while left &lt; right</code> вместо <code>&lt;=</code> — пропустим последний кандидат.</div>
<div class="fact">Бинарный поиск используют повсюду: в словарях и базах данных, в git (команда git bisect ищет, в каком из тысячи изменений появилась ошибка), даже ты сам ищешь слово в бумажном словаре, открывая его посередине.</div>`},
{title:'Сортировка пузырьком',lvl:2,html:`
<div class="box rule"><b>Правило</b>Идём по списку и сравниваем <b>соседей</b>: если левый больше правого — меняем их местами. После первого прохода самый большой элемент «всплывает» в конец, как пузырёк. Повторяем проходы n − 1 раз.</div>
<div class="widget" id="w-sort"></div>
${RUN(`a = [5, 2, 9, 1, 7]
n = len(a)
for p in range(n - 1):
    for j in range(n - 1 - p):
        if a[j] > a[j + 1]:
            a[j], a[j + 1] = a[j + 1], a[j]
    print("после прохода", p + 1, ":", a)`)}
<p>Строка <code>a[j], a[j + 1] = a[j + 1], a[j]</code> меняет два элемента местами одной командой.</p>
<p>Почему <code>n - 1 - p</code>? После прохода p в конце уже стоят p самых больших — их сравнивать незачем. А <code>- 1</code> — чтобы <code>a[j + 1]</code> не вышел за край списка.</p>
<div class="box tip"><b>Сколько работы</b>Сравнений: (n − 1) + (n − 2) + … + 1 = n(n − 1)/2. Для 1000 элементов — почти полмиллиона, для миллиона — полтриллиона. Медленно!</div>`},
{title:'Сортировка выбором',lvl:3,html:`
<div class="box rule"><b>Правило</b>На шаге i находим <b>минимум</b> среди элементов с i-го до конца и меняем его местами с a[i]. После шага i первые i + 1 элементов стоят на своих местах.</div>
<p>Так раскладывают карты: ищешь самую маленькую и кладёшь первой, потом из оставшихся снова самую маленькую…</p>
${RUN(`a = [5, 2, 9, 1, 7]
n = len(a)
for i in range(n - 1):
    m = i
    for j in range(i + 1, n):
        if a[j] < a[m]:
            m = j
    a[i], a[m] = a[m], a[i]
    print("шаг", i + 1, ":", a)`)}
<p>Переключи в виджете выше режим на «Выбором» и сравни, сколько обменов делает каждая сортировка.</p>
<div class="box tip"><b>Пузырёк или выбор?</b>Сравнений у обеих примерно n²/2. Но выбором делает не больше n − 1 обменов, а пузырёк — может очень много. Обе считаются медленными; настоящие сортировки (как sorted в Python) делают примерно n · log₂ n сравнений.</div>`},
{title:'Сложность: считаем операции на пальцах',lvl:4,html:`
<p class="hook">Две программы решают одну задачу. Одна — за секунду, другая — за 30 лет. Код при этом может быть почти одинаковой длины! Всё решает, <b>сколько операций</b> делает алгоритм.</p>
<div class="box rule"><b>Правило</b>Сложность — как растёт число операций, когда растёт n (размер данных).<br>
• Один цикл до n — примерно <b>n</b> операций.<br>
• Цикл в цикле, оба до n — <b>n · n = n²</b>.<br>
• Деление пополам, пока не станет 1 — примерно <b>log₂ n</b> (сколько раз можно поделить на 2).</div>
${RUN(`n = 1000
k1 = 0
for i in range(n):
    k1 += 1
k2 = 0
for i in range(n):
    for j in range(n):
        k2 += 1
k3 = 0
m = n
while m > 1:
    m = m // 2
    k3 += 1
print(k1, k2, k3)`)}
<p>Поменяй n на 2000. Во сколько раз выросло каждое число?</p>
<div class="tbl"><table class="sym"><thead><tr><th>n</th><th>log₂ n</th><th>n</th><th>n²</th></tr></thead><tbody>
<tr><td>10</td><td>≈ 3</td><td>10</td><td>100</td></tr>
<tr><td>1000</td><td>≈ 10</td><td>1000</td><td>1 000 000</td></tr>
<tr><td>1 000 000</td><td>≈ 20</td><td>1 000 000</td><td>10¹²</td></tr></tbody></table></div>
<div class="box tip"><b>Правило олимпиадника</b>Python делает примерно 10 миллионов простых операций в секунду. Если n = 100 000, то n² = 10¹⁰ — это больше 15 минут. А на олимпиаде лимит обычно 1–2 секунды. Поэтому перед тем как писать код, прикинь число операций!</div>`},
{title:'Перебор: проверим все варианты',lvl:5,html:`
<p>Иногда проще всего — проверить <b>все</b> варианты. Компьютер не устаёт: тысячу вариантов он проверит за миг.</p>
<div class="box rule"><b>Все пары</b>Чтобы перебрать все пары разных элементов (без повторов), второй цикл начинают с <code>i + 1</code>:<br><code>for i in range(n):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;for j in range(i + 1, n):</code><br>Пар получается n(n − 1)/2.</div>
${RUN(`a = [3, 8, 1, 6]
for i in range(len(a)):
    for j in range(i + 1, len(a)):
        print(a[i], "+", a[j], "=", a[i] + a[j])`)}
<h3>Все трёхзначные числа</h3>
${RUN(`k = 0
for n in range(100, 1000):
    a = n // 100
    b = n // 10 % 10
    c = n % 10
    if a + b + c == 5:
        k += 1
print("Трёхзначных с суммой цифр 5:", k)`)}
<p>Поменяй 5 на 27 — такое число одно. Какое?</p>
<div class="box err"><b>Ошибка</b><code>for j in range(n)</code> вместо <code>range(i + 1, n)</code> — каждая пара посчитается дважды (a, b) и (b, a), да ещё и пары элемента с самим собой.</div>
<div class="fact">Перебором в 1976 году доказали знаменитую теорему о четырёх красках (любую карту можно раскрасить четырьмя цветами так, чтобы соседние страны были разного цвета): компьютер проверил почти 2000 особых случаев. Это было первое крупное доказательство с помощью компьютера.</div>`},
{title:'Решето Эратосфена',lvl:6,html:`
<p class="hook">Эратосфен — тот самый, который больше 2000 лет назад измерил размер Земли с помощью палки и тени. Он же придумал, как быстро найти <b>все</b> простые числа до n — «просеять» их через решето.</p>
<div class="box rule"><b>Правило</b>Выписываем числа от 2 до n. Берём первое невычеркнутое — 2 — оно простое; вычёркиваем все его кратные. Следующее невычеркнутое — 3 — простое; вычёркиваем кратные 3. И так далее. Вычёркивать кратные p можно начинать с <b>p · p</b>: меньшие кратные уже вычеркнуты раньше. Что осталось — простые.</div>
${RUN(`n = 50
is_p = [True] * (n + 1)
is_p[0] = False
is_p[1] = False
p = 2
while p * p <= n:
    if is_p[p]:
        for k in range(p * p, n + 1, p):
            is_p[k] = False
    p += 1
print([i for i in range(n + 1) if is_p[i]])`)}
<p><code>[True] * (n + 1)</code> — список из n + 1 значений True: «пока все считаем простыми». Поменяй n на 1000 и посчитай их через <code>len(…)</code> — должно быть 168.</p>
<div class="box tip"><b>Почему это быстро</b>Проверять каждое число делением — долго. Решето для n = 1 000 000 делает всего несколько миллионов простых шагов — меньше секунды.</div>`},
{title:'Олимпиадные идеи',lvl:7,html:`
<h3>Максимальная сумма подряд (алгоритм Кадане)</h3>
<p>Идём по списку и держим лучшую сумму отрезка, <b>заканчивающегося</b> здесь: <code>cur = max(x, cur + x)</code> — либо продолжаем отрезок, либо начинаем заново. Один проход вместо перебора всех отрезков!</p>
${RUN(`a = [2, -5, 3, 4, -1, 2, -6, 1]
cur = a[0]
best = a[0]
for x in a[1:]:
    cur = max(x, cur + x)
    best = max(best, cur)
print(best)`)}
<h3>Сначала оцени, потом пиши</h3>
<p>Если n ≤ 1000 — можно n² (миллион операций). Если n ≤ 100 000 — нужно что-то вроде n или n · log n. Если ответ ищется среди 10¹⁸ вариантов — только бинарный поиск или формула.</p>`},
{title:'Шпаргалка',html:`
<ul class="steps">
<li>Линейный поиск: до n сравнений, работает всегда.</li>
<li>Бинарный поиск: только в отсортированном, ≈ log₂ n шагов (1000 → 10, миллион → 20).</li>
<li>Пузырёк: меняем соседей; выбор: минимум на место i. Обе ≈ n²/2 сравнений.</li>
<li>Цикл в цикле — n²; деление пополам — log₂ n.</li>
<li>Все пары: <code>for j in range(i + 1, n)</code>, пар n(n − 1)/2.</li>
<li>Решето: вычёркиваем кратные p, начиная с p·p.</li></ul>`},
{title:'Что дальше',html:`
<p>Ты знаешь главные идеи алгоритмов: поиск, сортировку, перебор, оценку скорости. Это то, что отличает программиста от человека, который просто знает команды.</p>
<p>В модуле <b>«10. Задачи ОГЭ и олимпиад»</b> соберём всё вместе и порешаем задачи в том виде, как они бывают на экзамене и олимпиаде: с вводом, жёсткими тестами и ограничением по времени.</p>`}
];

/* ---------- symbols ---------- */
const symbols={tab:'Алгоритмы',title:'Алгоритмы и их скорость',rows:[
['Линейный поиск','Смотрим по очереди','Работает для любого списка.','≈ n шагов'],
['Бинарный поиск','Делим пополам','Только для отсортированного списка.','≈ log₂ n шагов: 1000 → 10'],
['Пузырёк','Меняем соседей','Большие «всплывают» в конец.','≈ n²/2 сравнений'],
['Выбор','Минимум — на место i','Не больше n − 1 обменов.','≈ n²/2 сравнений'],
['sorted / sort','Встроенная сортировка','Timsort, очень быстрая.','≈ n · log₂ n'],
['Все пары','i &lt; j','Второй цикл с i + 1.','n(n − 1)/2 пар'],
['Решето','Эратосфен','Вычёркиваем кратные, начиная с p·p.','быстро до миллионов'],
['a[i], a[j] = a[j], a[i]','Обмен','Поменять два элемента местами.','<code>a[0], a[1] = a[1], a[0]</code>']],
after:'<div class="box tip"><b>Как запомнить</b>log₂ n — «сколько раз можно разрезать пополам». 1000 → 10, 1 000 000 → 20, 1 000 000 000 → 30.</div>'};

/* ---------- widgets ---------- */
function guessWidget(w){
  let secret=R(1,1000),tries=0,done=false;
  w.innerHTML=`<div class="small"><b>Угадай число от 1 до 1000.</b> Подсказка: начни с 500.</div>
  <div class="row"><input type="number" id="wg-in" min="1" max="1000" style="width:110px;font-size:17px;padding:6px 8px;border-radius:8px;border:1.5px solid var(--line);background:var(--card);color:var(--ink)"><button class="btn sbtn" id="wg-go">Проверить</button><button class="btn ghost sbtn" id="wg-new">Новое число</button><button class="btn ghost sbtn" id="wg-pc">Пусть угадает компьютер</button></div>
  <div id="wg-out" class="small" style="margin-top:6px"></div>`;
  const inp=w.querySelector('#wg-in'),out=w.querySelector('#wg-out');
  w.querySelector('#wg-go').onclick=()=>{if(done)return;const g=parseInt(inp.value,10);if(!(g>=1&&g<=1000)){out.innerHTML='Введи число от 1 до 1000.';return;}tries++;
    if(g===secret){done=true;out.innerHTML=`<b>Угадал за ${tries} ${plural(tries,'попытку','попытки','попыток')}!</b> ${tries<=10?'Отлично — бинарный поиск в действии.':'Попробуй каждый раз называть середину оставшегося отрезка — хватит 10.'}`;}
    else out.innerHTML=`Попытка ${tries}: загаданное число <b>${secret>g?'больше':'меньше'}</b> ${g}.`;inp.select();};
  inp.addEventListener('keydown',e=>{if(e.key==='Enter')w.querySelector('#wg-go').click();});
  w.querySelector('#wg-new').onclick=()=>{secret=R(1,1000);tries=0;done=false;out.innerHTML='Загадано новое число.';inp.value='';};
  w.querySelector('#wg-pc').onclick=()=>{let l=1,r=1000,k=0;const log=[];while(l<=r){const m=Math.floor((l+r)/2);k++;if(m===secret){log.push(`${m} — угадал!`);break;}if(m<secret){log.push(`${m}? больше`);l=m+1;}else{log.push(`${m}? меньше`);r=m-1;}}
    done=true;out.innerHTML=`Компьютер искал ${secret}: ${log.join(' → ')}<br><b>${k} ${plural(k,'вопрос','вопроса','вопросов')}</b> (никогда не больше 10).`;};
}
function sortWidget(w){
  let mode='bubble',base=[],frames=[],pos=0,timer=null;
  w.innerHTML=`<div class="small"><b>Посмотри, как сортирует компьютер.</b> Жёлтым — сравниваемые элементы, зелёным — уже на своём месте.</div>
  <div class="row"><button class="btn sbtn" id="wsr-b">Пузырьком</button><button class="btn ghost sbtn" id="wsr-s">Выбором</button></div>
  <div id="wsr-svg"></div><div id="wsr-msg" class="small" style="min-height:2.6em"></div>
  <div class="row"><button class="btn sbtn" id="wsr-step">Шаг ▶</button><button class="btn ghost sbtn" id="wsr-auto">Авто ⏩</button><button class="btn ghost sbtn" id="wsr-mix">Перемешать</button></div>`;
  const sv=w.querySelector('#wsr-svg'),msg=w.querySelector('#wsr-msg'),bB=w.querySelector('#wsr-b'),bS=w.querySelector('#wsr-s');
  function build(){const a=base.slice();const n=a.length;frames=[];let cmp=0,sw=0;
    const F=(hi,done,m)=>frames.push({a:a.slice(),hi,done:done.slice(),m,cmp,sw});
    const done=[];F([],done,'Начало. Нажимай «Шаг».');
    if(mode==='bubble'){for(let p=0;p<n-1;p++){for(let j=0;j<n-1-p;j++){cmp++;if(a[j]>a[j+1]){[a[j],a[j+1]]=[a[j+1],a[j]];sw++;F([j,j+1],done,`${a[j+1]} &gt; ${a[j]} — меняем местами.`);}else F([j,j+1],done,`${a[j]} ≤ ${a[j+1]} — оставляем.`);}done.push(n-1-p);F([],done,`Проход ${p+1} закончен: ${a[n-1-p]} всплыл на своё место.`);}done.push(0);}
    else{for(let i=0;i<n-1;i++){let m=i;for(let j=i+1;j<n;j++){cmp++;F([m,j],done,`Ищем минимум с места ${i}: сравниваем ${a[m]} и ${a[j]}.`);if(a[j]<a[m])m=j;}if(m!==i){[a[i],a[m]]=[a[m],a[i]];sw++;}done.push(i);F([i],done,`Минимум ${a[i]} ставим на место ${i}.`);}done.push(n-1);}
    F([],done.concat(range(0,n-1)),`Готово! Сравнений: ${cmp}, обменов: ${sw}.`);pos=0;draw();}
  function draw(){const f=frames[pos];const n=f.a.length;const bw=34,gap=6,W=n*(bw+gap)+gap,Hh=150;
    let s=`<svg viewBox="0 0 ${W} ${Hh}" width="${Math.min(340,W)}" role="img" aria-label="Сортировка">`;
    f.a.forEach((v,i)=>{const h=v*11;const x=gap+i*(bw+gap);const hi=f.hi.includes(i),dn=f.done.includes(i);
      s+=`<rect x="${x}" y="${Hh-22-h}" width="${bw}" height="${h}" rx="4" fill="${hi?'var(--hl)':dn?'var(--ok,#2a9d5c)':'var(--accent)'}" fill-opacity="${hi?0.9:dn?0.55:0.35}" stroke="var(--fig)" stroke-width="${hi?2:1}"/>`;
      s+=`<text x="${x+bw/2}" y="${Hh-6}" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)">${v}</text>`;});
    s+='</svg>';sv.innerHTML=s;msg.innerHTML=`${f.m}<br><span class="small">Сравнений: ${f.cmp} · обменов: ${f.sw}</span>`;}
  function mix(){base=shuffle(range(1,10)).slice(0,8);build();}
  function setMode(m){mode=m;bB.classList.toggle('ghost',m!=='bubble');bS.classList.toggle('ghost',m!=='sel');stop();build();}
  function stop(){if(timer){clearInterval(timer);timer=null;}}
  bB.onclick=()=>setMode('bubble');bS.onclick=()=>setMode('sel');
  w.querySelector('#wsr-step').onclick=()=>{stop();if(pos<frames.length-1)pos++;draw();};
  w.querySelector('#wsr-auto').onclick=()=>{if(timer){stop();return;}timer=setInterval(()=>{if(pos>=frames.length-1){stop();return;}pos++;draw();},350);};
  w.querySelector('#wsr-mix').onclick=()=>{stop();mix();};
  mix();
}
function onTheory(root){const g=root.querySelector('#w-guess');if(g)guessWidget(g);const s=root.querySelector('#w-sort');if(s)sortWidget(s);}

/* ---------- generators ---------- */
const gens=[];
const G=(lvl,make,o)=>gens.push(Object.assign({lvl,make},o||{}));
const RULE={rule:true},STAR={star:true};

/* L0 */
G(0,()=>{const c=choiceOf('Точная последовательность шагов, которая за конечное число шагов приводит к ответу',['Любая программа на Python','Набор случайных действий, который иногда даёт ответ','Список команд, который может выполняться бесконечно']);
return {type:'choice',q:'Что такое <b>алгоритм</b>?',...c,
short:'Алгоритм: точно, по шагам, конечно.',
explain:'Алгоритм — это <b>точная</b> (исполнитель не должен угадывать), <b>пошаговая</b> инструкция, которая <b>заканчивается</b> и даёт ответ для любых допустимых данных. Случайные действия и бесконечные циклы — не алгоритм. А программа — это запись алгоритма на языке программирования.',
explain2:'Хороший рецепт торта — алгоритм: «взбей 3 яйца, добавь 200 г сахара, выпекай 30 минут». Плохой: «добавь сахара по вкусу и пеки, пока не будет готово» — неточно.'};},RULE);
G(0,()=>{const n=pick([10,50,100,1000,5000]);const c=choiceOf(String(n),[String(Math.ceil(Math.log2(n))),String(n/2),'1']);
return {type:'choice',q:`В <b>неотсортированном</b> списке ${n} чисел. Сколько сравнений понадобится линейному поиску в <b>худшем</b> случае?`,...c,
short:`Худший случай — проверить все ${n}.`,
explain:`Линейный поиск смотрит элементы по очереди. Худший случай — искомого нет или он последний: придётся проверить <b>все ${n}</b>. Бинарный поиск (≈ ${Math.ceil(Math.log2(n))} шагов) здесь нельзя — список не отсортирован.`,
explain2:`Ищешь носок в куче белья без порядка — в худшем случае перебираешь всю кучу.`};},RULE);
G(0,()=>{const a=sample(range(1,30),R(6,8));const has=Math.random()<0.75;const x=has?pick(a):pick(range(1,30).filter(v=>!a.includes(v)));const k=has?a.indexOf(x)+1:a.length;
return {type:'num',q:`Что напечатает программа?${C(`a = ${pyl(a)}\nx = ${x}\nk = 0\nfor v in a:\n    k += 1\n    if v == x:\n        break\nprint(k)`)}`,ans:k,
short:has?`${x} — ${k}-й по счёту, на нём break.`:`${x} нет — проверили все ${k}.`,
explain:has?`k считает, сколько элементов просмотрено. Просматриваем: ${a.slice(0,k).join(', ')} — на ${x} срабатывает break. Просмотрено <b>${k}</b>.`:`Числа ${x} в списке нет, break не сработает, цикл пройдёт все ${a.length} элементов. k = <b>${k}</b> — это худший случай линейного поиска.`,
explain2:`k += 1 стоит <b>до</b> проверки, поэтому найденный элемент тоже считается. ${has?`Позиция ${x} — индекс ${k-1}, значит просмотрено ${k}.`:`Не нашли — значит просмотрели весь список.`}`};});
G(0,()=>{const tests=[];const add=(a,x)=>tests.push(T(`${a.join(' ')}\n${x}`,a.indexOf(x)));
add([7,3,9,4],4);add([7,3,9,4],5);add([1,1,1],1);add([5],5);add([2,8,2,8],8);{const a=lst(10,1,9);add(a,R(1,9));}
return {type:'code',q:'В первой строке — числа, во второй — число <b>x</b>. Выведи индекс <b>первого</b> вхождения x (с нуля) или <code>-1</code>, если x нет. Встроенные index и in не используй — напиши линейный поиск сам.',
starter:`a = list(map(int, input().split()))\nx = int(input())\n`,tests,
solution:`a = list(map(int, input().split()))\nx = int(input())\npos = -1\nfor i in range(len(a)):\n    if a[i] == x:\n        pos = i\n        break\nprint(pos)`,
hint:'pos = -1 до цикла. Нашёл — pos = i и break.',
explain:'До цикла <code>pos = -1</code> («пока не нашли»). Идём по индексам; при совпадении запоминаем <code>pos = i</code> и <b>break</b> — чтобы не перезаписать первый найденный последующими. После цикла печатаем pos.',
explain2:'Без break для [2, 8, 2, 8] и x = 8 получился бы 3 (последнее вхождение), а нужно 1.'};});
G(0,()=>{const tests=[];const add=(a,x)=>tests.push(T(`${a.join(' ')}\n${x}`,a.lastIndexOf(x)));
add([2,8,2,8],8);add([7,3,9,4],5);add([1,1,1],1);add([5],5);add([4,6,9],4);{const a=lst(10,1,5);add(a,R(1,5));}
return {type:'code',q:'В первой строке — числа, во второй — число <b>x</b>. Выведи индекс <b>последнего</b> вхождения x или <code>-1</code>, если x нет.',
starter:`a = list(map(int, input().split()))\nx = int(input())\n`,tests,
solution:`a = list(map(int, input().split()))\nx = int(input())\npos = -1\nfor i in range(len(a)):\n    if a[i] == x:\n        pos = i\nprint(pos)`,
hint:'Тот же поиск, но без break: каждое новое совпадение перезапишет pos.',
explain:'Идём по всему списку <b>без break</b>: каждое совпадение перезаписывает pos, поэтому в конце останется последнее. Другой способ — идти с конца <code>range(len(a) - 1, -1, -1)</code> и остановиться на первом совпадении.',
explain2:'[2, 8, 2, 8], x = 8: на i = 1 pos = 1, на i = 3 pos = 3. Ответ 3.'};});

/* L1 */
G(1,()=>{const c=choiceOf('Список должен быть отсортирован',['Список должен быть короче 1000 элементов','В списке не должно быть повторов','Искомое число должно быть в списке']);
return {type:'choice',q:'Какое условие <b>обязательно</b> для бинарного поиска?',...c,
short:'Без сортировки бинарный поиск не работает.',
explain:'Бинарный поиск выкидывает половину списка по одному сравнению с серединой: «искомое больше — значит, слева его точно нет». Это верно только если список <b>отсортирован</b>. Длина любая, повторы не мешают, а если элемента нет — поиск просто сообщит об этом.',
explain2:'В словаре слова по алфавиту — поэтому можно открыть посередине и понять, в какую сторону листать. В куче несортированных карточек так не выйдет.'};},RULE);
G(1,()=>{const c=choiceOf('В 2 раза',['На 1 элемент','В 10 раз','Не уменьшается, просто сдвигается']);
return {type:'choice',q:'Во сколько раз уменьшается область поиска за один шаг бинарного поиска?',...c,
short:'Каждый шаг — пополам.',
explain:'Сравнили с серединой — и отбросили одну из половин. Значит, за шаг область уменьшается <b>в 2 раза</b>. Отсюда и название: binary — «двоичный», «на две части». Линейный поиск, наоборот, за шаг убирает лишь 1 элемент.',
explain2:'1000 → 500 → 250 → 125 → … Через 10 шагов останется 1 вариант.'};},RULE);
G(1,()=>{const N=pick([10,20,50,100,200,500,1000,2000,5000,10000,1000000]);const k=guesses(N);
return {type:'num',q:`Я загадал целое число от 1 до ${N.toLocaleString('ru-RU')}. На каждую попытку я отвечаю «больше», «меньше» или «угадал». Какое <b>наименьшее</b> число попыток гарантированно хватит, если играть оптимально?`,ans:k,
hint:'Каждая попытка делит оставшееся пополам. Сколько раз можно делить N пополам, пока не останется 1?',
short:`2^${k-1} = ${2**(k-1)} &lt; ${N} ≤ ${2**k - 1} = 2^${k} − 1 → ${k}.`,
explain:`Оптимально каждый раз называть середину оставшегося отрезка. За k попыток так можно различить до 2^k − 1 чисел (1, 3, 7, 15, 31, …). Нужно 2^k − 1 ≥ ${N}: 2^${k-1} − 1 = ${2**(k-1)-1} — мало, 2^${k} − 1 = ${2**k-1} — хватает. Ответ <b>${k}</b>.`,
explain2:`Дели пополам: ${(()=>{let x=N,s=[x];while(x>1){x=Math.floor(x/2);s.push(x);}return s.join(' → ');})()}. Делений ${k-1}, и ещё одна попытка, чтобы назвать последнее оставшееся число: ${k}.`};});
G(1,()=>{const a=sample(range(1,99),15).sort((x,y)=>x-y);const has=Math.random()<0.7;const x=has?pick(a):pick(range(1,99).filter(v=>!a.includes(v)));const {s,tr}=binSteps(a,x);
return {type:'num',q:`Сколько шагов (значение steps) сделает бинарный поиск?${C(`a = ${pyl(a)}\nx = ${x}\nleft = 0\nright = len(a) - 1\nsteps = 0\nwhile left <= right:\n    mid = (left + right) // 2\n    steps += 1\n    if a[mid] == x:\n        break\n    elif a[mid] < x:\n        left = mid + 1\n    else:\n        right = mid - 1\nprint(steps)`)}`,ans:s,
hint:'Начни с left = 0, right = 14, mid = 7. Записывай left, right, mid на каждом шаге.',
short:`Проверены индексы ${tr.map(t=>t.m).join(', ')} → ${s}.`,
explain:`Распишем шаги:<br>${tr.map((t,i)=>`${i+1}) left = ${t.l}, right = ${t.r}, mid = ${t.m}, a[mid] = ${t.v} — ${t.v===x?'нашли!':t.v<x?`меньше ${x}, left = ${t.m+1}`:`больше ${x}, right = ${t.m-1}`}`).join('<br>')}${has?'':`<br>left &gt; right — цикл закончился, ${x} в списке нет.`}<br>Ответ: <b>${s}</b>.`,
explain2:`Для 15 элементов бинарный поиск никогда не делает больше 4 шагов (2⁴ − 1 = 15). Каждый раз смотрим середину оставшегося куска и выбрасываем половину.`};});
G(1,()=>{const c=choiceOf('left = mid + 1',['left = mid','right = mid + 1','left = left + 1']);
return {type:'choice',q:`Какую строку нужно вставить вместо <code>???</code>?${C(`while left <= right:\n    mid = (left + right) // 2\n    if a[mid] == x:\n        break\n    elif a[mid] < x:\n        ???\n    else:\n        right = mid - 1`)}`,...c,
short:'a[mid] < x → искомое правее mid: left = mid + 1.',
explain:'Если a[mid] &lt; x, то x может быть только <b>правее</b> mid. Сам mid уже проверен, поэтому новая левая граница — <code>mid + 1</code>. Вариант <code>left = mid</code> опасен: когда left = right − 1, mid = left, и граница перестанет двигаться — вечный цикл. <code>left = left + 1</code> работает, но превращает поиск в медленный линейный.',
explain2:'Симметрия: при «больше» пишут right = mid − 1, при «меньше» — left = mid + 1. Всегда отбрасываем и сам mid — он уже проверен.'};});
G(1,()=>{const tests=[];const isq=n=>{let lo=0n,hi=2000000000n;while(lo<hi){const m=(lo+hi+1n)/2n;if(m*m<=n)lo=m;else hi=m-1n;}return lo;};
['0','1','15','16','1000000','999999999999999999','1000000000000000000',String(R(2,99999999))].forEach(s=>tests.push(T(s,isq(BigInt(s)).toString())));
return {type:'code',q:'Дано целое n (0 ≤ n ≤ 10<sup>18</sup>). Найди наибольшее целое k, такое что k · k ≤ n («целый корень»). Перебор k = 0, 1, 2, … не успеет: корень может быть около миллиарда. Используй <b>бинарный поиск</b> по ответу.',
starter:`n = int(input())\n`,tests,
solution:`n = int(input())\nleft = 0\nright = 2 * 10 ** 9\nwhile left < right:\n    mid = (left + right + 1) // 2\n    if mid * mid <= n:\n        left = mid\n    else:\n        right = mid - 1\nprint(left)`,
hint:'Ищи k на отрезке [0, 2·10⁹]. Если mid·mid ≤ n — ответ не меньше mid (left = mid), иначе right = mid − 1.',
explain:'Ответ лежит между 0 и 2·10⁹. Свойство «k·k ≤ n» верно для всех маленьких k и ложно для больших — граница и есть ответ. Бинарный поиск: если <code>mid * mid &lt;= n</code>, ответ ≥ mid → <code>left = mid</code>; иначе <code>right = mid - 1</code>. Чтобы не было вечного цикла при left = mid, середину берём «вверх»: <code>(left + right + 1) // 2</code>. Около 31 шага вместо миллиарда.',
explain2:'Почему не <code>int(n ** 0.5)</code>? Дробные числа в компьютере неточны: для n = 999999999999999999 корень почти ровно 10⁹, и Python округлит до 1000000000, а правильный ответ 999999999. Целочисленный бинарный поиск ошибок округления не делает.'};});

/* L2 */
G(2,()=>{const c=choiceOf('Самый большой элемент оказывается в конце списка',['Самый маленький элемент оказывается в конце','Список полностью сортируется','Первые два элемента меняются местами']);
return {type:'choice',q:'Что гарантированно происходит после <b>одного</b> прохода сортировки пузырьком (по возрастанию)?',...c,
short:'Максимум «всплывает» в конец.',
explain:'При проходе мы сравниваем соседей и меняем, если левый больше. Самый большой элемент, как только до него дойдём, будет «ехать» направо при каждом сравнении — до самого конца. Остальная часть списка после одного прохода обычно ещё не отсортирована.',
explain2:'Как пузырёк воздуха в воде: самый большой (лёгкий) поднимается наверх — в конец списка — за один проход.'};},RULE);
G(2,()=>{let a;do{a=sample(range(1,9),5);}while(bubblePass(a).sw<2);const r=bubblePass(a).a;
const alt1=a.slice().sort((x,y)=>x-y);const alt2=(()=>{const t=a.slice();const m=t.indexOf(Math.max(...t));t.splice(m,1);t.push(Math.max(...a));return t;})();const alt3=(()=>{const t=a.slice();for(let j=0;j<4;j+=2)if(t[j]>t[j+1])[t[j],t[j+1]]=[t[j+1],t[j]];return t;})();
const c=choiceOf(pyl(r),[pyl(alt1),pyl(alt2),pyl(alt3),pyl(a)]);
return {type:'choice',q:`Каким станет список после <b>одного</b> прохода пузырька?${C(`a = ${pyl(a)}\nfor j in range(len(a) - 1):\n    if a[j] > a[j + 1]:\n        a[j], a[j + 1] = a[j + 1], a[j]\nprint(a)`)}`,...c,
short:`Результат: ${pyl(r)}.`,
explain:`Идём слева направо, сравнивая соседей:<br>${(()=>{const t=a.slice();const out=[];for(let j=0;j<4;j++){const sw=t[j]>t[j+1];if(sw)[t[j],t[j+1]]=[t[j+1],t[j]];out.push(`j=${j}: ${sw?`${t[j+1]} &gt; ${t[j]}, меняем → ${pyl(t)}`:`${t[j]} ≤ ${t[j+1]}, оставляем`}`);}return out.join('<br>');})()}<br>Ответ: <b>${pyl(r)}</b>. Максимум ${Math.max(...a)} в конце, но остальное ещё не отсортировано.`,
explain2:'Важно: после обмена следующее сравнение идёт уже с <b>новым</b> соседом. Поэтому большой элемент «едет» вправо, пока не встретит ещё больший.'};});
G(2,()=>{const a=sample(range(1,9),R(4,5));const k=inversions(a);
return {type:'num',q:`Сколько <b>обменов</b> сделает полная сортировка пузырьком списка <code>${pyl(a)}</code>?`,ans:k,
hint:'Каждый обмен соседей исправляет ровно одну «неправильную пару» (большее стоит левее меньшего). Посчитай такие пары.',
short:`Неправильных пар (инверсий) ${k} — столько и обменов.`,
explain:`Обмен соседей a[j] &gt; a[j+1] исправляет ровно одну пару, стоящую «не в том порядке», и не портит другие. Значит, обменов столько, сколько таких пар (их называют <b>инверсиями</b>):<br>${(()=>{const p=[];for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++)if(a[i]>a[j])p.push(`(${a[i]}, ${a[j]})`);return p.join(', ')||'нет';})()}<br>Всего <b>${k}</b>.`,
explain2:`Можно и честно промоделировать проходы: ${(()=>{let t=a.slice();const s=[];let tot=0;for(let p=0;p<a.length-1;p++){const r=bubblePass(t);t=r.a;tot+=r.sw;s.push(`проход ${p+1}: ${r.sw} обм. → ${pyl(t)}`);}return s.join('; ');})()}. Итого ${k}.`};});
G(2,()=>{const c=choiceOf('IndexError: при j = n − 1 обращение a[j + 1] выходит за край. Нужно range(n - 1)',['Список отсортируется по убыванию','Ничего, программа правильная','SyntaxError в строке обмена']);
return {type:'choice',q:`Что не так в этом проходе пузырька?${C(`n = len(a)\nfor j in range(n):\n    if a[j] > a[j + 1]:\n        a[j], a[j + 1] = a[j + 1], a[j]`)}`,...c,
short:'Последний j должен быть n − 2.',
explain:'Сравниваем a[j] и a[j + 1]. Последняя пара соседей — индексы n − 2 и n − 1. С <code>range(n)</code> j дойдёт до n − 1, и <code>a[n]</code> — такого элемента нет: <code>IndexError</code>. Правильно: <code>range(n - 1)</code>.',
explain2:'В списке из 5 элементов 4 пары соседей. Значит, j должен принимать 4 значения: 0, 1, 2, 3 — это range(4) = range(n − 1).'};});
G(2,()=>{const tests=[];const add=a=>{let t=a.slice();const o=[];for(let p=0;p<a.length-1;p++){t=bubblePass(t).a;o.push(t.join(' '));}tests.push(T(a.join(' '),lines(o)));};
add([5,2,9,1,7]);add([3,1]);add([1,2,3,4]);add([4,3,2,1]);add([2,2,1,2]);add(lst(7,-9,9));
return {type:'code',q:'Отсортируй числа по возрастанию <b>пузырьком</b>. Сделай ровно n − 1 проходов (n — количество чисел, n ≥ 2) и после <b>каждого</b> прохода выводи весь список через пробел. Так тесты увидят, что это действительно пузырёк.',
starter:`a = list(map(int, input().split()))\nn = len(a)\n`,tests,
solution:`a = list(map(int, input().split()))\nn = len(a)\nfor p in range(n - 1):\n    for j in range(n - 1 - p):\n        if a[j] > a[j + 1]:\n            a[j], a[j + 1] = a[j + 1], a[j]\n    print(*a)`,
hint:'Два цикла: внешний p — номер прохода, внутренний j — сравнение a[j] и a[j + 1]. print(*a) — внутри внешнего, но после внутреннего.',
explain:'Внешний цикл <code>for p in range(n - 1)</code> — проходы. Внутренний <code>for j in range(n - 1 - p)</code> — сравнение соседей; меняем, если <code>a[j] &gt; a[j + 1]</code>. Печать <code>print(*a)</code> — с отступом внешнего цикла, чтобы печатать после каждого прохода, а не после каждого сравнения.',
explain2:'Пример 5 2 9 1 7: проход 1 → 2 5 1 7 9; проход 2 → 2 1 5 7 9; проход 3 → 1 2 5 7 9; проход 4 → без изменений. Если используешь range(n − 1) вместо range(n − 1 − p) во внутреннем — тоже верно, просто чуть больше лишних сравнений.'};});

/* L3 */
G(3,()=>{const c=choiceOf('Находим минимум среди a[i], a[i+1], …, a[n−1] и меняем его местами с a[i]',['Меняем местами соседние a[i] и a[i+1], если они стоят неправильно','Находим максимум всего списка и ставим его на место i','Вставляем a[i] в нужное место среди первых элементов']);
return {type:'choice',q:'Что делает <b>сортировка выбором</b> на шаге i?',...c,
short:'Выбор: минимум из оставшихся → на место i.',
explain:'На шаге i первые i элементов уже стоят на своих местах. Среди оставшихся <b>выбираем</b> минимум и меняем его с a[i]. Обмен соседей — это пузырёк, а «вставить в нужное место» — сортировка вставками (тоже бывает, но это другой алгоритм).',
explain2:'Как выстроить класс по росту: ищешь самого низкого — он встаёт первым. Из оставшихся снова самый низкий — вторым. И так далее.'};},RULE);
G(3,()=>{const a=sample(range(1,20),6);const k=R(1,3);const r=selSteps(a,k);
const c=choiceOf(pyl(r),[pyl(selSteps(a,k+1)),pyl(selSteps(a,k-1)),pyl((()=>{let t=a.slice();for(let p=0;p<k;p++)t=bubblePass(t).a;return t;})())]);
return {type:'choice',q:`Список сортируют выбором. Каким он будет после <b>${k}</b> ${plural(k,'шага','шагов','шагов')}?${C(`a = ${pyl(a)}\nfor i in range(${k}):\n    m = i\n    for j in range(i + 1, len(a)):\n        if a[j] < a[m]:\n            m = j\n    a[i], a[m] = a[m], a[i]\nprint(a)`)}`,...c,
short:`После ${k} шагов на местах 0…${k-1} стоят ${k} наименьших.`,
explain:`${range(0,k-1).map(i=>{const before=selSteps(a,i);const after=selSteps(a,i+1);const mn=Math.min(...before.slice(i));return `Шаг ${i+1}: минимум среди ${pyl(before.slice(i))} — ${mn}, ставим на место ${i} → ${pyl(after)}`;}).join('<br>')}<br>Ответ: <b>${pyl(r)}</b>.`,
explain2:`Проверка: после ${k} шагов в начале стоят ${k} самых маленьких по порядку (${a.slice().sort((x,y)=>x-y).slice(0,k).join(', ')}), а хвост — в каком-то порядке после обменов.`};});
G(3,()=>{const n=R(5,30);
return {type:'num',q:`Сколько сравнений <code>a[j] &lt; a[m]</code> выполнит сортировка выбором для списка из <b>${n}</b> элементов (циклы <code>for i in range(n - 1)</code> и <code>for j in range(i + 1, n)</code>)?`,ans:n*(n-1)/2,
hint:'При i = 0 сравнений n − 1, при i = 1 — n − 2, … при i = n − 2 — одно.',
short:`${n-1} + ${n-2} + … + 1 = ${n}·${n-1}/2 = ${n*(n-1)/2}.`,
explain:`При i = 0 внутренний цикл делает ${n-1} сравнений, при i = 1 — ${n-2}, …, при i = ${n-2} — 1. Сумма 1 + 2 + … + ${n-1} = ${n-1}·${n}/2 = <b>${n*(n-1)/2}</b>. Это число не зависит от того, какие числа в списке.`,
explain2:`Сумму 1 + 2 + … + m можно найти как Гаусс: сложить первое с последним (1 + ${n-1} = ${n}), таких пар ${n-1}/2. ${n} · ${n-1} / 2 = ${n*(n-1)/2}.`};});
G(3,()=>{const tests=[];const add=a=>{const o=[];for(let i=1;i<a.length;i++)o.push(selSteps(a,i).join(' '));tests.push(T(a.join(' '),lines(o)));};
add([5,2,9,1,7]);add([2,1]);add([1,2,3]);add([3,3,1,1]);add([9,8,7,6,5]);add(lst(7,-20,20));
return {type:'code',q:'Отсортируй числа по возрастанию <b>выбором</b>: на шаге i (i = 0 … n − 2) найди индекс m <b>первого</b> минимума среди a[i], …, a[n−1] и поменяй a[i] и a[m] (даже если m = i). После каждого шага выводи список через пробел.',
starter:`a = list(map(int, input().split()))\nn = len(a)\n`,tests,
solution:`a = list(map(int, input().split()))\nn = len(a)\nfor i in range(n - 1):\n    m = i\n    for j in range(i + 1, n):\n        if a[j] < a[m]:\n            m = j\n    a[i], a[m] = a[m], a[i]\n    print(*a)`,
hint:'m = i; for j in range(i + 1, n): if a[j] < a[m]: m = j. Потом обмен и print(*a).',
explain:'Внешний цикл по i (место, которое заполняем). Внутри — поиск индекса минимума m (строгий знак &lt; — чтобы взять первый из равных). Затем обмен <code>a[i], a[m] = a[m], a[i]</code> и печать. Всего n − 1 строк вывода.',
explain2:'5 2 9 1 7: шаг 1 — минимум 1 (индекс 3) ↔ 5 → 1 2 9 5 7; шаг 2 — минимум 2 уже на месте → 1 2 9 5 7; шаг 3 — 5 ↔ 9 → 1 2 5 9 7; шаг 4 — 7 ↔ 9 → 1 2 5 7 9.'};});

/* L4 — сложность */
G(4,()=>{const c=choiceOf('Бинарный поиск: около 20 шагов против миллиона',['Линейный поиск: он проще','Одинаково, оба просматривают все элементы','Бинарный, но всего в 2 раза быстрее']);
return {type:'choice',q:'В <b>отсортированном</b> списке 1 000 000 чисел. Какой поиск быстрее в худшем случае и насколько?',...c,
short:'log₂(10⁶) ≈ 20 против 10⁶.',
explain:'Линейный в худшем случае проверит все 1 000 000. Бинарный делит пополам: 2²⁰ = 1 048 576 &gt; 10⁶, значит хватит <b>20</b> шагов. Разница — в 50 000 раз! Чем больше данных, тем сильнее выигрыш.',
explain2:'Угадай число до миллиона: «больше/меньше» — 20 вопросов. А «это 1? это 2? это 3?…» — может понадобиться миллион.'};},RULE);
G(4,()=>{const c=choiceOf('Примерно в 4 раза',['Примерно в 2 раза','Примерно в 8 раз','Не изменится']);
return {type:'choice',q:'Программа с двумя вложенными циклами <code>for i in range(n): for j in range(n):</code> работает 1 секунду. Во сколько раз дольше она будет работать, если n увеличить в 2 раза?',...c,
short:'n² → (2n)² = 4n².',
explain:'Число операций ≈ n · n = n². Если n стало 2n, то операций (2n)² = 4n² — в <b>4 раза</b> больше. Будет около 4 секунд. Для одного цикла было бы в 2 раза, для трёх вложенных — в 8.',
explain2:'Таблица умножения 10×10 — 100 клеток. 20×20 — уже 400, а не 200.'};},RULE);
G(4,()=>{const a=R(3,40),b=R(3,40);
return {type:'num',q:`Что напечатает программа?${C(`k = 0\nfor i in range(${a}):\n    for j in range(${b}):\n        k += 1\nprint(k)`)}`,ans:a*b,
short:`${a} · ${b} = ${a*b}.`,
explain:`Внешний цикл повторяется ${a} раз, и при <b>каждом</b> его шаге внутренний делает ${b} шагов. Всего ${a} · ${b} = <b>${a*b}</b>.`,
explain2:`Это как таблица ${a} строк на ${b} столбцов: k считает клетки.`};});
G(4,()=>{const n=R(5,40);
return {type:'num',q:`Что напечатает программа?${C(`n = ${n}\nk = 0\nfor i in range(n):\n    for j in range(i + 1, n):\n        k += 1\nprint(k)`)}`,ans:n*(n-1)/2,
short:`${n}·${n-1}/2 = ${n*(n-1)/2} — число пар.`,
explain:`При i = 0 внутренний цикл даёт ${n-1} шагов, при i = 1 — ${n-2}, …, при i = ${n-1} — 0. Сумма ${n-1} + ${n-2} + … + 1 = ${n}·${n-1}/2 = <b>${n*(n-1)/2}</b>. Это количество пар из ${n} элементов.`,
explain2:`Сколько рукопожатий, если ${n} человек жмут руки каждый каждому? Каждый жмёт ${n-1} рук, но так каждое рукопожатие считается дважды: ${n}·${n-1}/2 = ${n*(n-1)/2}.`};});
G(4,()=>{const n=R(20,5000);let m=n,k=0;while(m>1){m=Math.floor(m/2);k++;}
return {type:'num',q:`Что напечатает программа?${C(`n = ${n}\nk = 0\nwhile n > 1:\n    n = n // 2\n    k += 1\nprint(k)`)}`,ans:k,
short:`2^${k} = ${2**k} ≤ ${n} &lt; ${2**(k+1)} → ${k}.`,
explain:`Делим нацело на 2, пока не дойдём до 1: ${(()=>{let x=n;const s=[x];while(x>1){x=Math.floor(x/2);s.push(x);}return s.join(' → ');})()}. Делений <b>${k}</b>. Это примерно log₂ ${n}.`,
explain2:`k — это сколько раз можно разделить на 2: самая большая степень двойки, не превосходящая ${n}, — 2^${k} = ${2**k}.`};});
G(4,()=>{const right='бинарный поиск — линейный поиск — сортировка пузырьком';
const c=choiceOf(right,['линейный поиск — бинарный поиск — сортировка пузырьком','сортировка пузырьком — бинарный поиск — линейный поиск','бинарный поиск — сортировка пузырьком — линейный поиск']);
return {type:'choice',q:'Расположи по возрастанию числа операций для n = 1 000 000: линейный поиск, бинарный поиск, сортировка пузырьком.',...c,
short:'log n (20) &lt; n (10⁶) &lt; n²/2 (5·10¹¹).',
explain:'Бинарный поиск ≈ log₂ n ≈ 20 операций. Линейный ≈ n = 1 000 000. Пузырёк ≈ n²/2 = 500 000 000 000. Порядок: <b>бинарный → линейный → пузырёк</b>.',
explain2:'Если одна операция занимает 0,1 микросекунды: бинарный — мгновенно, линейный — 0,1 секунды, пузырёк — около 14 часов.'};});

/* L5 — перебор */
G(5,()=>{const c=choiceOf('for i in range(n):\n    for j in range(i + 1, n):',['for i in range(n):\n    for j in range(n):','for i in range(n):\n    for j in range(i, n):','for i in range(n - 1):\n    j = i + 1']);
c.opts=c.opts.map(o=>`<code style="white-space:pre">${esc(o)}</code>`);
return {type:'choice',q:'Какие циклы перебирают <b>все пары</b> разных индексов (i, j) ровно по одному разу (пара (1, 3) и (3, 1) — одна и та же)?',...c,
short:'j начинается с i + 1.',
explain:'Чтобы пара не повторялась, договоримся: i &lt; j. Тогда второй цикл начинается с <code>i + 1</code>.<br>• <code>range(n)</code> во втором цикле даст каждую пару дважды и пары (i, i).<br>• <code>range(i, n)</code> добавит пары элемента с самим собой.<br>• Без второго цикла получим только соседние пары.',
explain2:'Рукопожатия: каждый жмёт руку только тем, кто стоит <b>правее</b> него в шеренге. Так никто не пожмёт руку дважды и сам себе.'};},RULE);
G(5,()=>{const s=R(3,24);let k=0;for(let n=100;n<1000;n++)if(dsum(n)===s)k++;
return {type:'num',q:`Что напечатает программа?${C(`k = 0\nfor n in range(100, 1000):\n    if n // 100 + n // 10 % 10 + n % 10 == ${s}:\n        k += 1\nprint(k)`)}`,ans:k,
hint:'Это количество трёхзначных чисел с суммой цифр '+s+'. Перебери первую цифру a (1…9) и посчитай, сколькими способами b + c = '+s+' − a (b, c от 0 до 9).',
short:`Трёхзначных с суммой цифр ${s}: ${k}.`,
explain:`Программа перебирает все трёхзначные числа и считает те, у которых сумма цифр (сотни + десятки + единицы) равна ${s}.<br>Посчитаем по первой цифре a: нужно b + c = ${s} − a, где b, c от 0 до 9.<br>${range(1,9).map(a=>{const t=s-a;const w=t<0||t>18?0:(t<=9?t+1:19-t);return `a=${a}: b+c=${t} → ${w}`;}).join('; ')}.<br>Итого <b>${k}</b>.`,
explain2:`Число способов записать t = b + c с цифрами 0…9: t + 1 при t ≤ 9 и 19 − t при 9 &lt; t ≤ 18. Складываем по всем первым цифрам: ${k}.`};});
G(5,()=>{const n=R(5,25);const s=R(Math.floor(n/2)+2,n+3);let k=0;for(let x=1;x<=n;x++)for(let y=x+1;y<=n;y++)if(x+y===s)k++;
return {type:'num',q:`Что напечатает программа?${C(`k = 0\nfor x in range(1, ${n+1}):\n    for y in range(x + 1, ${n+1}):\n        if x + y == ${s}:\n            k += 1\nprint(k)`)}`,ans:k,
short:`Пары x &lt; y ≤ ${n} с суммой ${s}: ${k}.`,
explain:`Ищем пары 1 ≤ x &lt; y ≤ ${n} с x + y = ${s}. Для каждого x число y = ${s} − x определено однозначно; нужно x &lt; y и y ≤ ${n}.<br>Подходят: ${(()=>{const p=[];for(let x=1;x<=n;x++){const y=s-x;if(y>x&&y<=n)p.push(`(${x}, ${y})`);}return p.join(', ')||'нет';})()}.<br>Итого <b>${k}</b>.`,
explain2:`Перебор проверяет ${n*(n-1)/2} пар, но подходящих мало: x пробегает значения, пока x &lt; ${s} − x, т. е. x &lt; ${s/2}, и при этом ${s} − x ≤ ${n}.`};});
G(5,()=>{const tests=[];const add=(a,S)=>{let k=0;for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++)if(a[i]+a[j]===S)k++;tests.push(T(`${a.join(' ')}\n${S}`,k));};
add([1,4,3,2,5],6);add([3,3,3],6);add([1,2],5);add([7],7);add([-1,1,0,0],0);{const a=lst(12,1,10);add(a,R(5,15));}
return {type:'code',q:'В первой строке — числа, во второй — число <b>S</b>. Сколько существует пар позиций i &lt; j, для которых a[i] + a[j] = S?',
starter:`a = list(map(int, input().split()))\nS = int(input())\n`,tests,
solution:`a = list(map(int, input().split()))\nS = int(input())\nk = 0\nn = len(a)\nfor i in range(n):\n    for j in range(i + 1, n):\n        if a[i] + a[j] == S:\n            k += 1\nprint(k)`,
hint:'Перебор всех пар: for i in range(n): for j in range(i + 1, n).',
explain:'Перебираем все пары позиций с i &lt; j (второй цикл с i + 1) и считаем подходящие. Важно: считаются <b>позиции</b>, а не значения: в [3, 3, 3] при S = 6 три пары: (0,1), (0,2), (1,2).',
explain2:'Пример 1 4 3 2 5, S = 6: (1, 5), (4, 2) → 2 пары. Операций ≈ n²/2 — для n до нескольких тысяч это нормально.'};});
G(5,()=>{const tests=[];const add=(a,b)=>{const r=[];for(let n=a;n<=b;n++){const d=String(n).split('').map(Number);if(d.reduce((s,x)=>s+x*x*x,0)===n)r.push(n);}tests.push(T(`${a} ${b}`,r.length?lines(r):'НЕТ'));};
add(100,999);add(100,152);add(150,160);add(371,371);add(372,406);add(400,500);
return {type:'code',q:'Число назовём <b>кубическим</b>, если оно равно сумме кубов своих цифр (например, 153 = 1³ + 5³ + 3³). Даны a и b (100 ≤ a ≤ b ≤ 999) в одной строке. Выведи все кубические числа на отрезке [a, b], каждое на своей строке, или <code>НЕТ</code>.',
starter:`a, b = map(int, input().split())\n`,tests,
solution:`a, b = map(int, input().split())\nfound = False\nfor n in range(a, b + 1):\n    x = n // 100\n    y = n // 10 % 10\n    z = n % 10\n    if x ** 3 + y ** 3 + z ** 3 == n:\n        print(n)\n        found = True\nif not found:\n    print("НЕТ")`,
hint:'Перебери n от a до b. Цифры: n // 100, n // 10 % 10, n % 10.',
explain:'Перебор: для каждого n из [a, b] находим цифры (сотни <code>n // 100</code>, десятки <code>n // 10 % 10</code>, единицы <code>n % 10</code>) и проверяем сумму кубов. Флажок found нужен, чтобы в конце напечатать «НЕТ», если ничего не нашли. Не забудь <code>b + 1</code> в range — b тоже входит.',
explain2:'Среди всех трёхзначных таких чисел ровно четыре: 153, 370, 371, 407. Компьютер находит их перебором 900 чисел за мгновение.'};});
G(5,()=>{const tests=[];const add=s=>{let k=0;for(let n=100;n<1000;n++)if(dsum(n)===s)k++;tests.push(T(String(s),k));};
[1,2,5,10,27,26,14].forEach(add);
return {type:'code',q:'Дано s (1 ≤ s ≤ 27). Сколько существует трёхзначных чисел с суммой цифр s?',
starter:`s = int(input())\n`,tests,
solution:`s = int(input())\nk = 0\nfor n in range(100, 1000):\n    if n // 100 + n // 10 % 10 + n % 10 == s:\n        k += 1\nprint(k)`,
hint:'Перебери все n от 100 до 999.',
explain:'Чистый перебор: 900 чисел, для каждого считаем сумму цифр и сравниваем с s. Вместо одного цикла можно три вложенных по цифрам: <code>for a in range(1, 10): for b in range(10): for c in range(10):</code> — это те же 900 вариантов.',
explain2:'Проверка краёв: s = 1 — только 100 (ответ 1); s = 27 — только 999 (ответ 1); s = 2 — 101, 110, 200 (ответ 3).'};});

/* L6 — решето */
G(6,()=>{const c=choiceOf('Все меньшие кратные p (2p, 3p, …, (p − 1)·p) уже вычеркнуты как кратные меньших простых',['Потому что p · p — простое число','Это просто договорённость, можно начинать с 2p — будет быстрее','Потому что числа меньше p · p не делятся на p']);
return {type:'choice',q:'Почему в решете Эратосфена кратные простого p вычёркивают, начиная с <b>p · p</b>?',...c,
short:'k·p при k &lt; p уже вычеркнуто числом k (или его простым делителем).',
explain:'Возьмём кратное k · p, где k &lt; p. У числа k есть простой делитель, меньший p, — и при его обработке k · p уже вычеркнули. Значит, первое «новое» кратное — p · p. Начинать с 2p тоже правильно, но это лишняя работа. А числа меньше p · p вполне могут делиться на p (например, 2p).',
explain2:'Пример, p = 5: 10 вычеркнули при p = 2, 15 — при p = 3, 20 — при p = 2. Первое, которое ещё не вычеркнуто, — 25 = 5 · 5.'};},RULE);
G(6,()=>{const c=choiceOf('Только простые числа',['Только чётные числа','Только составные числа','Все числа, кроме кратных 2 и 3']);
return {type:'choice',q:'Какие числа остаются невычеркнутыми после работы решета Эратосфена (от 2 до n)?',...c,
short:'Решето оставляет простые.',
explain:'Мы вычёркиваем все числа, у которых есть делитель-простое меньше их самих, — то есть все <b>составные</b>. Остаются числа без таких делителей — <b>простые</b>. Чётные (кроме 2) как раз вычёркиваются первыми.',
explain2:'Как сито для муки: крупные комки (составные — «склеенные» из множителей) застревают, мелкие (простые) проходят.'};},RULE);
G(6,()=>{const N=R(20,100);const ps=primesTo(N);
return {type:'num',q:`Сколько чисел останется невычеркнутыми, если запустить решето Эратосфена для n = ${N}?`,ans:ps.length,
short:`Простых до ${N}: ${ps.length}.`,
explain:`Остаются простые числа от 2 до ${N}: ${ps.join(', ')}. Всего <b>${ps.length}</b>.`,
explain2:`Вычёркиваем кратные 2 (кроме 2), кратные 3 (кроме 3), 5, 7 — этого достаточно, ведь 11 · 11 = 121 &gt; ${N}. Остаётся ${ps.length}.`};});
G(6,()=>{const p=pick([3,5,7]);
return {type:'num',q:`Решето Эратосфена для n = 100. Какое число будет <b>первым</b> вычеркнуто, когда мы обрабатываем простое ${p} (начиная с p · p)?`,ans:p*p,
short:`p · p = ${p*p}.`,
explain:`Вычёркивание кратных ${p} начинается с ${p} · ${p} = <b>${p*p}</b>. Меньшие кратные ${range(2,p-1).map(k=>k*p).join(', ')} уже вычеркнуты раньше как кратные меньших простых.`,
explain2:`${range(2,p-1).map(k=>`${k*p} = ${k}·${p}`).join(', ')} — каждое делится на число меньше ${p}, значит его уже убрали.`};});
G(6,()=>{const tests=[1,2,10,100,1000,100000].map(n=>T(String(n),primesTo(n).length));
return {type:'code',q:'Дано n (1 ≤ n ≤ 100 000). Сколько простых чисел не больше n? Используй решето Эратосфена — оно справится быстро.',
starter:`n = int(input())\n`,tests,
solution:`n = int(input())\nis_p = [True] * (n + 1)\nis_p[0] = False\nif n >= 1:\n    is_p[1] = False\np = 2\nwhile p * p <= n:\n    if is_p[p]:\n        for k in range(p * p, n + 1, p):\n            is_p[k] = False\n    p += 1\nprint(sum(is_p))`,
hint:'is_p = [True] * (n + 1); 0 и 1 — не простые. Для каждого p с p·p ≤ n, если is_p[p], вычеркни p·p, p·p + p, …',
explain:'Список флажков <code>is_p</code> длины n + 1 («индекс = число»). 0 и 1 помечаем False. Для p = 2, 3, … пока <code>p * p &lt;= n</code>: если p ещё не вычеркнуто — вычёркиваем <code>range(p * p, n + 1, p)</code>. В конце считаем True: <code>sum(is_p)</code> (True считается как 1) — или циклом.',
explain2:'Проверка: до 10 — 4 простых (2, 3, 5, 7), до 100 — 25, до 1000 — 168, до 100 000 — 9592. Осторожно с n = 1: is_p = [True, True], оба надо пометить False, ответ 0.'};});
G(6,()=>{const tests=[];const add=(a,b)=>tests.push(T(`${a} ${b}`,primesTo(b).filter(p=>p>=a).reduce((s,x)=>s+x,0)));
add(1,10);add(10,20);add(14,16);add(2,2);add(1,1);add(R(100,500),R(600,1000));
return {type:'code',q:'Даны a и b (1 ≤ a ≤ b ≤ 10 000) в одной строке. Найди <b>сумму</b> всех простых чисел на отрезке [a, b] (если их нет — 0).',
starter:`a, b = map(int, input().split())\n`,tests,
solution:`a, b = map(int, input().split())\nis_p = [True] * (b + 1)\nis_p[0] = False\nis_p[1] = False\np = 2\nwhile p * p <= b:\n    if is_p[p]:\n        for k in range(p * p, b + 1, p):\n            is_p[k] = False\n    p += 1\ns = 0\nfor x in range(a, b + 1):\n    if is_p[x]:\n        s += x\nprint(s)`,
hint:'Построй решето до b, потом сложи x от a до b, у которых is_p[x] == True.',
explain:'Строим решето до b, затем проходим отрезок [a, b] и складываем простые. Решето строится один раз для всех чисел — это быстрее, чем проверять каждое число делением.',
explain2:'Пример: [10, 20] → 11 + 13 + 17 + 19 = 60. [14, 16] — простых нет → 0. [1, 1] → 0 (1 не простое).'};});

/* L7 — ★ */
G(7,()=>{const N=pick([1000000000,1000000,100000000]);const k=guesses(N);
return {type:'num',q:`Бинарный поиск ищет число в отсортированном списке из ${N.toLocaleString('ru-RU')} элементов. Сколько сравнений с серединой понадобится в <b>худшем</b> случае (как в программе с <code>while left &lt;= right</code>)?`,ans:k,
short:`2^${k} − 1 ≥ ${N.toLocaleString('ru-RU')} → ${k}.`,
explain:`За k шагов бинарный поиск различает до 2^k − 1 позиций. 2^${k-1} − 1 = ${(2**(k-1)-1).toLocaleString('ru-RU')} — мало, 2^${k} − 1 = ${(2**k-1).toLocaleString('ru-RU')} — достаточно. Ответ <b>${k}</b>. Запомни: 2¹⁰ ≈ 1000, поэтому миллион ≈ 2²⁰, миллиард ≈ 2³⁰.`,
explain2:`Каждые 10 шагов уменьшают область примерно в 1000 раз (2¹⁰ = 1024). Делим ${N.toLocaleString('ru-RU')} пополам, пока не останется 1, — получится ${k-1} делений, и ещё одно сравнение на последнем элементе: ${k}.`};},STAR);
G(7,()=>{const tests=[];const add=a=>{let cur=a[0],best=a[0];for(const x of a.slice(1)){cur=Math.max(x,cur+x);best=Math.max(best,cur);}tests.push(T(a.join(' '),best));};
add([2,-5,3,4,-1,2,-6,1]);add([-3,-1,-2]);add([5]);add([1,2,3]);add([4,-10,4]);add(lst(15,-10,10));add(lst(10,-5,8));
return {type:'code',q:'<b>Лучший отрезок.</b> Дана последовательность целых чисел (изменения курса за дни). Найди наибольшую сумму <b>непрерывного</b> отрезка (хотя бы из одного числа). Например, для 2 −5 3 4 −1 2 −6 1 ответ 8 (отрезок 3 4 −1 2).',
starter:`a = list(map(int, input().split()))\n`,tests,
solution:`a = list(map(int, input().split()))\ncur = a[0]\nbest = a[0]\nfor x in a[1:]:\n    cur = max(x, cur + x)\n    best = max(best, cur)\nprint(best)`,
hint:'cur — лучшая сумма отрезка, который заканчивается на текущем числе: max(x, cur + x).',
explain:'Можно перебрать все отрезки (≈ n² или n³ операций). Красивее — алгоритм Кадане за один проход: <code>cur</code> — лучшая сумма отрезка, <b>заканчивающегося</b> на текущем x. Либо продолжаем прошлый отрезок (<code>cur + x</code>), либо начинаем новый с x — что больше. <code>best</code> — рекорд за всё время.',
explain2:'Если все числа отрицательные (−3 −1 −2), ответ — самое большое из них (−1): отрезок должен быть непустым. Поэтому начальные значения — a[0], а не 0. Перебор пар (i, j) с суммой через sum(a[i:j+1]) тоже пройдёт тесты, но на 100 000 чисел будет считать вечность.'};},STAR);
G(7,()=>{const tests=[];const add=n=>{for(const p of primesTo(n))if(isPrime(n-p)){tests.push(T(String(n),`${p} ${n-p}`));return;}};
[4,6,10,28,98,R(50,500)*2,9998].forEach(add);
return {type:'code',q:'<b>Гипотеза Гольдбаха</b>: каждое чётное число n ≥ 4 — сумма двух простых. Дано чётное n (4 ≤ n ≤ 10 000). Выведи через пробел два простых p и q, p ≤ q, p + q = n, с <b>наименьшим</b> возможным p.',
starter:`n = int(input())\n`,tests,
solution:`def is_prime(x):\n    if x < 2:\n        return False\n    d = 2\n    while d * d <= x:\n        if x % d == 0:\n            return False\n        d += 1\n    return True\n\nn = int(input())\nfor p in range(2, n):\n    if is_prime(p) and is_prime(n - p):\n        print(p, n - p)\n        break`,
hint:'Перебирай p = 2, 3, 4, … и проверяй, простые ли p и n − p. Первый найденный — ответ.',
explain:'Перебор с функцией is_prime: идём p = 2, 3, … и проверяем <code>is_prime(p) and is_prime(n - p)</code>. Первая найденная пара — с наименьшим p, сразу <code>break</code>. Условие p ≤ q выполнится само: подходящее p всегда находится раньше середины.',
explain2:'Примеры: 4 = 2 + 2, 10 = 3 + 7 (не 5 + 5 — у 3 меньше p), 28 = 5 + 23. Гипотезу проверили компьютером для всех чисел до 4 · 10¹⁸, но доказать её математики не могут уже почти 300 лет (с 1742 года).'};},STAR);
G(7,()=>{const tests=[];const ways=n=>{let k=0;for(let c=0;5*c<=n;c++)for(let b=0;5*c+2*b<=n;b++)k++;return k;};
[1,2,5,10,0,100,R(20,80)].forEach(n=>tests.push(T(String(n),ways(n))));
return {type:'code',q:'Сколькими способами можно набрать сумму <b>n</b> рублей монетами 1, 2 и 5 рублей (0 ≤ n ≤ 100)? Способы, отличающиеся только порядком монет, считаются одинаковыми. Например, 5 рублей: 5; 2+2+1; 2+1+1+1; 1·5 — 4 способа.',
starter:`n = int(input())\n`,tests,
solution:`n = int(input())\nk = 0\nfor c in range(n // 5 + 1):\n    for b in range((n - 5 * c) // 2 + 1):\n        k += 1\nprint(k)`,
hint:'Переберём, сколько пятёрок c и сколько двушек b. Рубли добирают остаток — это всегда ровно один вариант.',
explain:'Способ однозначно задаётся количеством пятёрок c и двушек b — рублёвых монет будет n − 5c − 2b, лишь бы это было ≥ 0. Перебираем c от 0 до n // 5 и b от 0 до (n − 5c) // 2 и считаем варианты. Порядок монет не учитывается автоматически — мы же считаем количества, а не последовательности.',
explain2:'Можно и тремя циклами (a, b, c от 0 до n) с проверкой a + 2b + 5c == n — это честный перебор, медленнее, но для n ≤ 100 тоже успеет (≈ 10⁶ вариантов). n = 0 — один способ: не брать монет.'};},STAR);
G(7,()=>{const a=sample(range(1,12),6);const k=inversions(a);
return {type:'num',q:`Сколько пар индексов (i, j), i &lt; j, удовлетворяют условию a[i] &gt; a[j] для списка <code>${pyl(a)}</code>? (Это число называют количеством <b>инверсий</b> — оно показывает, насколько список «перемешан».)`,ans:k,
short:`Инверсий ${k}.`,
explain:`Для каждого элемента считаем, сколько <b>меньших</b> стоит правее:<br>${a.map((x,i)=>`${x}: ${a.slice(i+1).filter(y=>y<x).join(', ')||'—'} → ${a.slice(i+1).filter(y=>y<x).length}`).join('<br>')}<br>Сумма: <b>${k}</b>.`,
explain2:`Это ровно число обменов, которые сделает пузырёк. Отсортированный список — 0 инверсий, список по убыванию из 6 элементов — 15 (все пары).`};},STAR);

window.TOPIC={id:'i_algorithms',title:'9. Алгоритмы',subtitle:'Программирование · Python',
intro:'<p>Алгоритмы — умные способы решать задачи: искать, сортировать, перебирать, не тратя лишнего времени. Поиграй с виджетами, запускай примеры и считай операции — это навык настоящего программиста.</p>',
theory,symbols,figs:{},onTheory,
levels:['Алгоритм. Линейный поиск','Бинарный поиск','Сортировка пузырьком','Сортировка выбором','Сложность: считаем операции','Перебор','Решето Эратосфена','★ Олимпиадные задачи'],
gens};
})();
