(function(){
const {R,pick,shuffle,sample,range,plural}=H;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const C=s=>`<pre class="code">${esc(s)}</pre>`;
const ic=s=>`<code>${esc(s)}</code>`;
const RUN=(code,inp)=>`<pre class="run"${inp!=null?` data-input="${esc(inp).replace(/"/g,'&quot;')}"`:''}>${esc(code)}</pre>`;
const pyl=a=>'['+a.join(', ')+']';
const pys=a=>'['+a.map(x=>`'${x}'`).join(', ')+']';
const lst=(n,lo,hi)=>{const a=[];for(let i=0;i<n;i++)a.push(R(lo,hi));return a;};
const dlst=(n,lo,hi)=>sample(range(lo,hi),n);
const T=(inp,out)=>({in:inp,out:String(out)});
const lines=a=>a.join('\n');
const choiceOf=(right,wrongs)=>{const o=[right];for(const w of wrongs){if(!o.includes(w))o.push(w);}const opts=shuffle(o);return {opts,ans:opts.indexOf(right)};};

/* ---------- theory ---------- */
const theory=[
{title:'Что мы уже умеем',lvl:0,html:`
<p>В прошлых модулях ты научился печатать (<code>print</code>), хранить числа и текст в переменных, читать ввод (<code>input</code>), делать развилки (<code>if</code>), повторять действия (<code>for</code>, <code>while</code>) и разбирать строки на символы и слова (модуль «6. Строки»).</p>
<p class="hook">В Minecraft у тебя 36 ячеек инвентаря. Неужели игра заводит 36 отдельных переменных <code>slot1</code>, <code>slot2</code>, …, <code>slot36</code>? А если сундук на 54 ячейки? А оценки всех 25 учеников класса? Нет — для этого есть <b>списки</b>: одна переменная, в которой хранится сколько угодно значений.</p>
<p>Одна переменная — одна коробка. А список — целый <b>поезд из вагонов</b>: у поезда одно имя, а в каждом вагоне лежит своё значение.</p>`},
{title:'Список — поезд с вагонами',lvl:0,html:`
<div class="box rule"><b>Правило</b>Список записывают в <b>квадратных скобках</b> через запятую: <code>a = [5, 8, 2]</code>. Каждый элемент имеет номер — <b>индекс</b>. Индексы начинаются с <b>0</b>: <code>a[0]</code> — первый вагон, <code>a[1]</code> — второй.</div>
<p>Почему с нуля? Индекс — это «на сколько вагонов отойти от начала». Первый вагон — отходить не надо, сдвиг 0. Точно так же было со строками: <code>s[0]</code> — первая буква.</p>
${RUN(`a = [5, 8, 2, 9]
print(a)
print(a[0])
print(a[2])`)}
<p>Попробуй: замени <code>a[2]</code> на <code>a[3]</code>. А теперь на <code>a[4]</code> — что скажет Python?</p>
<div class="widget" id="w-train"></div>
<div class="box rule"><b>Индексы с конца</b><code>a[-1]</code> — последний элемент, <code>a[-2]</code> — предпоследний. Удобно, когда не знаешь длину.</div>
${RUN(`games = ["Minecraft", "Roblox", "Terraria"]
print(games[-1])
print(games[0], "и", games[-2])`)}
<p>В списке можно хранить числа, строки — что угодно. Пустой список: <code>a = []</code>.</p>
<div class="box err"><b>Частая ошибка: IndexError</b>В списке из 4 элементов индексы 0, 1, 2, 3. Индекса <b>4 нет</b>! <code>a[4]</code> → ошибка <code>IndexError: list index out of range</code> («индекс за пределами списка»). Последний индекс всегда на 1 меньше длины.</div>`},
{title:'len, append и изменение элементов',lvl:1,html:`
<div class="box rule"><b>Три главные команды</b>
<code>len(a)</code> — длина (сколько вагонов).<br>
<code>a.append(x)</code> — прицепить новый вагон <code>x</code> в <b>конец</b>.<br>
<code>a[i] = x</code> — положить в вагон номер <code>i</code> новое значение (старое пропадёт).</div>
${RUN(`a = [3, 1]
a.append(7)
a.append(10)
print(a, len(a))
a[0] = 100
print(a)`)}
<p>Попробуй прицепить ещё один вагон и посмотри, как изменится <code>len(a)</code>.</p>
<p><b>В отличие от строк, список можно менять!</b> Строку <code>s[0] = "Я"</code> изменить нельзя, а список — пожалуйста.</p>
<h3>Список из ввода по одному числу</h3>
<p>Так собирают список, когда сначала вводят количество <code>n</code>, а потом n чисел, каждое на своей строке:</p>
${RUN(`n = int(input())
a = []
for i in range(n):
    x = int(input())
    a.append(x)
print(a)`,'4\n10\n20\n30\n40')}
<div class="box err"><b>Ошибка</b>Нельзя добавить элемент так: <code>a[len(a)] = 5</code> — такого вагона ещё нет, будет IndexError. Новые элементы добавляют только через <code>append</code>.</div>
<div class="fact">В Python у списка нет фиксированного размера: ты можешь прицепить хоть миллион элементов. Python сам находит для них место в памяти.</div>`},
{title:'Перебор списка',lvl:2,html:`
<p>Чтобы что-то сделать с каждым элементом, используем уже знакомый <code>for</code>. Есть два способа.</p>
<div class="box rule"><b>Способ 1: по значениям</b><code>for x in a:</code> — переменная <code>x</code> по очереди <b>становится каждым элементом</b>. Удобно, когда нужно только читать.</div>
${RUN(`marks = [5, 4, 5, 3]
for x in marks:
    print("Оценка:", x)`)}
<div class="box rule"><b>Способ 2: по индексам</b><code>for i in range(len(a)):</code> — <code>i</code> принимает значения 0, 1, …, len(a) − 1. Нужен, когда надо <b>менять</b> элементы или знать номер.</div>
${RUN(`a = [2, 7, 1]
for i in range(len(a)):
    a[i] = a[i] * 10
print(a)`)}
<p>Попробуй изменить <code>* 10</code> на <code>+ i</code> — каждый элемент увеличится на свой номер.</p>
<div class="box err"><b>Ловушка</b><code>for x in a: x = x * 10</code> — список <b>не изменится</b>! <code>x</code> — это копия значения из вагона, как будто ты сфотографировал содержимое и разрисовал фотографию. Чтобы поменять сам вагон, нужен индекс: <code>a[i] = …</code>.</div>`},
{title:'Сумма, максимум, минимум',lvl:3,html:`
<p>Сначала научимся делать это <b>вручную</b> — так ты поймёшь, как работает компьютер. Потом узнаем готовые функции.</p>
<h3>Сумма — копилка</h3>
${RUN(`a = [4, -2, 7, 1]
s = 0
for x in a:
    s = s + x
print("Сумма:", s)`)}
<h3>Максимум — «царь горы»</h3>
<p>Первый элемент объявляем царём горы. Дальше каждый следующий сравниваем с царём: если он больше — он новый царь.</p>
${RUN(`a = [4, -2, 7, 1]
m = a[0]
for x in a:
    if x > m:
        m = x
print("Максимум:", m)`)}
<div class="box err"><b>Частая ошибка</b><code>m = 0</code> вместо <code>m = a[0]</code>. Для списка <code>[-5, -3, -8]</code> такая программа скажет «максимум 0», а нуля в списке нет! Всегда начинай с <b>элемента списка</b>.</div>
<p>Поменяй в программе выше <code>&gt;</code> на <code>&lt;</code> — получится поиск минимума.</p>
<div class="box rule"><b>Готовые функции</b><code>sum(a)</code> — сумма, <code>max(a)</code> — максимум, <code>min(a)</code> — минимум, <code>len(a)</code> — количество.</div>
${RUN(`a = [4, -2, 7, 1]
print(sum(a), max(a), min(a), len(a))
print("Среднее:", sum(a) / len(a))`)}
<div class="box tip"><b>Где номер максимума?</b>Если нужен не сам максимум, а его <b>индекс</b>, храни номер: <code>k = 0</code>, и в цикле по <code>i</code>: <code>if a[i] &gt; a[k]: k = i</code>.</div>`},
{title:'Поиск и подсчёт',lvl:4,html:`
<div class="box rule"><b>Правило</b>
<code>x in a</code> — <code>True</code>, если x есть в списке, иначе <code>False</code>.<br>
<code>a.count(x)</code> — сколько раз x встречается.<br>
<code>a.index(x)</code> — индекс <b>первого</b> вхождения x (если x нет — ошибка ValueError).</div>
${RUN(`a = [3, 7, 1, 7, 7]
print(7 in a, 5 in a)
print(a.count(7))
print(a.index(7))`)}
<h3>Как это сделать вручную: флажок</h3>
<p>Поднимаем флажок <code>found = False</code>. Идём по списку; нашли — опускаем флажок в <code>True</code>. Ответ печатаем <b>после</b> цикла.</p>
${RUN(`a = [3, 7, 1, 9]
x = 1
found = False
for v in a:
    if v == x:
        found = True
if found:
    print("Есть!")
else:
    print("Нет")`)}
<div class="box err"><b>Ошибка</b>Если написать <code>else: print("Нет")</code> <b>внутри</b> цикла, программа напечатает «Нет» для каждого неподходящего элемента. Решение «есть или нет» можно принять только когда просмотрел весь список.</div>
<h3>Счётчик</h3>
${RUN(`a = [12, 5, 8, 21, 6, 3]
k = 0
for x in a:
    if x % 2 == 0:
        k += 1
print("Чётных:", k)`)}`},
{title:'Ввод списка в одну строку: split и map',lvl:5,html:`
<p>Обычно числа вводят в одну строку через пробел: <code>3 10 5</code>. Ты уже знаешь <code>split()</code> из модуля про строки — он режет строку по пробелам.</p>
<div class="box rule"><b>Правило</b><code>input().split()</code> даёт список <b>строк</b>: <code>['3', '10', '5']</code>.<br>
<code>list(map(int, input().split()))</code> — список <b>чисел</b>: <code>[3, 10, 5]</code>. <code>map(int, …)</code> применяет <code>int</code> к каждому кусочку.</div>
${RUN(`a = input().split()
print(a)
b = list(map(int, a))
print(b)
print(sum(b))`,'3 10 5')}
<p>Поменяй ввод на свои числа и запусти ещё раз.</p>
<div class="box err"><b>Ловушка: строки вместо чисел</b>Без <code>map(int, …)</code> <code>'3' + '10'</code> = <code>'310'</code> (склейка), а <code>max(['9', '10'])</code> = <code>'9'</code>: строки сравниваются по буквам, как в словаре, и «9» идёт после «1».</div>
<div class="box rule"><b>Печать списка без скобок</b><code>print(*a)</code> — звёздочка «высыпает» элементы, и они печатаются через пробел: <code>3 10 5</code>.</div>
${RUN(`a = [3, 10, 5]
print(a)
print(*a)`)}`},
{title:'Срезы и сортировка',lvl:6,html:`
<div class="box rule"><b>Срезы — как у строк</b><code>a[i:j]</code> — элементы с индекса i <b>до</b> j (j не входит). <code>a[:3]</code> — первые три, <code>a[-2:]</code> — последние два, <code>a[::-1]</code> — список задом наперёд.</div>
${RUN(`a = [10, 20, 30, 40, 50]
print(a[1:4])
print(a[:2], a[-2:])
print(a[::-1])`)}
<div class="box rule"><b>Сортировка</b><code>a.sort()</code> — сортирует <b>сам список</b> (по возрастанию) и ничего не возвращает.<br>
<code>sorted(a)</code> — возвращает <b>новый</b> отсортированный список, а <code>a</code> не трогает.<br>
<code>reverse=True</code> — по убыванию.</div>
${RUN(`a = [5, 1, 4, 2]
b = sorted(a)
print(a, b)
a.sort(reverse=True)
print(a)`)}
<div class="box err"><b>Частая ошибка</b><code>a = a.sort()</code> — теперь в a лежит <code>None</code> («ничего»), потому что <code>sort()</code> ничего не возвращает. Пиши просто <code>a.sort()</code> или <code>a = sorted(a)</code>.</div>
<div class="fact">Сортировка в Python называется Timsort — её придумал программист Тим Петерс в 2002 году. Потом её взяли в Java и Android. Как устроены сортировки внутри, ты узнаешь в модуле «9. Алгоритмы».</div>`},
{title:'Генератор списка',lvl:7,html:`
<p>Иногда список удобно «сгенерировать» одной строкой. Читается почти как по-русски.</p>
<div class="box rule"><b>Правило</b><code>[выражение for x in что_перебираем]</code> — «список из выражений для каждого x».<br>
<code>[x for x in a if условие]</code> — только те, что подходят под условие (фильтр).</div>
${RUN(`squares = [x * x for x in range(1, 6)]
print(squares)
a = [7, 12, 5, 8, 3, 10]
even = [x for x in a if x % 2 == 0]
print(even)`)}
<p>Попробуй: сделай список кубов <code>x ** 3</code> или оставь только числа больше 6.</p>
<p>Это то же самое, что цикл с append:</p>
${RUN(`even = []
for x in [7, 12, 5, 8, 3, 10]:
    if x % 2 == 0:
        even.append(x)
print(even)`)}
<div class="box tip"><b>Как запомнить</b>«Дай мне <b>x·x</b> для каждого <b>x</b> из 1…5». Сначала — что положить, потом — откуда брать, в конце — какой фильтр.</div>`},
{title:'Типичные ошибки со списками',lvl:6,html:`
<div class="box err"><b>1. Индекс = длина</b><code>a[len(a)]</code> → IndexError. Последний — <code>a[len(a) - 1]</code> или <code>a[-1]</code>.</div>
<div class="box err"><b>2. Забыли int</b>После <code>split()</code> в списке строки. <code>sum(['1','2'])</code> → TypeError.</div>
<div class="box err"><b>3. a = a.sort()</b>В a окажется None.</div>
<div class="box err"><b>4. Изменение через x</b><code>for x in a: x += 1</code> не меняет список.</div>
<div class="box err"><b>5. Два имени — один поезд</b><code>b = a</code> <b>не копирует</b> список! Это вторая наклейка на тот же поезд. Измени b — изменится и a. Копия: <code>b = a[:]</code>.</div>
${RUN(`a = [1, 2, 3]
b = a
b.append(99)
print(a)
c = a[:]
c.append(5)
print(a, c)`)}`},
{title:'Олимпиадные приёмы',lvl:8,html:`
<h3>Второй максимум</h3>
<p>Держим двух «царей»: самого большого <code>m1</code> и второго <code>m2</code>. Если пришло число больше m1 — старый m1 становится вторым.</p>
${RUN(`a = [4, 9, 2, 9, 7]
m1 = max(a)
m2 = None
for x in a:
    if x != m1 and (m2 == None or x > m2):
        m2 = x
print(m1, m2)`)}
<h3>Циклический сдвиг</h3>
<p>Сдвиг вправо на 1: последний вагон переезжает в начало. Через срезы: <code>a[-k:] + a[:-k]</code> (списки можно склеивать знаком <code>+</code>). Если k больше длины, сначала <code>k = k % len(a)</code>.</p>
${RUN(`a = [1, 2, 3, 4, 5]
k = 2
k = k % len(a)
print(a[-k:] + a[:-k])`)}
<p>Поставь <code>k = 7</code> — результат будет тот же, что при k = 2. Почему?</p>
<h3>Уникальные элементы</h3>
${RUN(`a = [3, 1, 3, 2, 1, 5]
for x in a:
    if a.count(x) == 1:
        print(x)`)}
<h3>Серии подряд</h3>
<p>Сравниваем каждый элемент с <b>предыдущим</b>: <code>a[i] == a[i-1]</code>. Цикл по <code>i</code> начинаем с 1, чтобы не выйти за край.</p>`},
{title:'Шпаргалка',html:`
<ul class="steps">
<li><code>a = [5, 8, 2]</code>; индексы с 0; <code>a[-1]</code> — последний.</li>
<li><code>len(a)</code>, <code>a.append(x)</code>, <code>a[i] = x</code>.</li>
<li><code>for x in a</code> — читать; <code>for i in range(len(a))</code> — менять.</li>
<li><code>sum, max, min</code>; вручную — копилка и «царь горы» с <code>a[0]</code>.</li>
<li><code>x in a</code>, <code>a.count(x)</code>, <code>a.index(x)</code>.</li>
<li><code>list(map(int, input().split()))</code>, <code>print(*a)</code>.</li>
<li>Срезы <code>a[i:j]</code>; <code>a.sort()</code> меняет, <code>sorted(a)</code> возвращает новый.</li>
<li><code>[x*x for x in a if x &gt; 0]</code>.</li></ul>`},
{title:'Что дальше',html:`
<p>Теперь ты умеешь хранить сколько угодно данных и обрабатывать их циклами. Но заметил? Код «найти максимум», «проверить, простое ли число» приходится писать снова и снова.</p>
<p>В следующем модуле <b>«8. Функции»</b> ты научишься создавать <b>свои команды</b>: один раз написал <code>is_prime(n)</code> — и пользуешься как кнопкой, сколько угодно раз. Как <code>len</code> или <code>max</code>, только придуманные тобой.</p>`}
];

/* ---------- symbols ---------- */
const symbols={tab:'Команды',title:'Команды для списков',rows:[
['[ ]','Квадратные скобки','Создать список; взять элемент по индексу.','<code>a = [5, 8]</code>, <code>a[0]</code>'],
['a[i]','Элемент с индексом i','Индексы с 0. Отрицательные — с конца.','<code>a[-1]</code> — последний'],
['len(a)','Длина','Сколько элементов в списке.','<code>len([5, 8])</code> → 2'],
['a.append(x)','Добавить в конец','Прицепить вагон x в конец списка.','<code>a.append(3)</code>'],
['sum / max / min','Сумма, максимум, минимум','Готовые функции для числового списка.','<code>max([3, 9, 1])</code> → 9'],
['x in a','Есть ли в списке','True или False.','<code>2 in [1, 2]</code> → True'],
['a.count(x)','Сколько раз','Количество вхождений x.','<code>[1, 1, 2].count(1)</code> → 2'],
['a.index(x)','Где впервые','Индекс первого вхождения x.','<code>[4, 7, 7].index(7)</code> → 1'],
['split / map','Ввод списка','Строка → список строк → список чисел.','<code>list(map(int, input().split()))</code>'],
['a[i:j]','Срез','С индекса i до j (не включая j).','<code>[1, 2, 3, 4][1:3]</code> → [2, 3]'],
['a.sort()','Сортировать сам список','Меняет a, ничего не возвращает.','<code>a.sort(reverse=True)</code>'],
['sorted(a)','Новый отсортированный','a не меняется.','<code>b = sorted(a)</code>'],
['print(*a)','Печать через пробел','Элементы без скобок и запятых.','<code>print(*[1, 2])</code> → 1 2'],
['[… for …]','Генератор списка','Список одной строкой, можно с if.','<code>[x*x for x in range(4)]</code>']],
after:'<div class="box tip"><b>Как запомнить</b>Список — поезд. Номер вагона — индекс, с нуля. len — сколько вагонов, append — прицепить вагон.</div>'};

/* ---------- widget ---------- */
function onTheory(root){
  const w=root.querySelector('#w-train');if(!w)return;
  let a=[5,8,2,9,4];
  w.innerHTML=`<div class="small"><b>Поиграй с поездом.</b> Двигай ползунок — это индекс i. Можно и отрицательный!</div>
  <label>i = <output id="wt-i">0</output><input type="range" id="wt-r" min="-5" max="4" value="0" step="1"></label>
  <div id="wt-svg"></div><div id="wt-out" class="small"></div>
  <div class="row"><button class="btn sbtn" id="wt-add">a.append(…)</button><button class="btn ghost sbtn" id="wt-reset">Сначала</button></div>`;
  const r=w.querySelector('#wt-r'),o=w.querySelector('#wt-i'),sv=w.querySelector('#wt-svg'),out=w.querySelector('#wt-out');
  function draw(){
    const n=a.length;r.min=-n;r.max=n-1;let i=+r.value;if(i<-n)i=-n;if(i>n-1)i=n-1;r.value=i;o.textContent=i;
    const idx=i<0?n+i:i;const cw=Math.min(52,(320-10)/n-6);const W=10+n*(cw+6);
    let s=`<svg viewBox="0 0 ${W} 96" width="${Math.min(340,W)}" role="img" aria-label="Список-поезд">`;
    for(let k=0;k<n;k++){const x=6+k*(cw+6);const on=k===idx;
      s+=`<rect x="${x}" y="20" width="${cw}" height="38" rx="6" fill="${on?'var(--hl)':'var(--card)'}" fill-opacity="${on?0.6:1}" stroke="var(--fig)" stroke-width="${on?2.5:1.2}"/>`;
      s+=`<text x="${x+cw/2}" y="45" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">${a[k]}</text>`;
      s+=`<text x="${x+cw/2}" y="13" text-anchor="middle" font-size="11" fill="var(--accent-ink)">${k}</text>`;
      s+=`<text x="${x+cw/2}" y="76" text-anchor="middle" font-size="11" fill="var(--muted)">${k-n}</text>`;
      s+=`<circle cx="${x+cw*0.25}" cy="62" r="3" fill="var(--fig)"/><circle cx="${x+cw*0.75}" cy="62" r="3" fill="var(--fig)"/>`;}
    s+=`<text x="4" y="92" font-size="10" fill="var(--muted)">сверху — индексы, снизу — индексы с конца</text></svg>`;
    sv.innerHTML=s;
    out.innerHTML=`a = ${pyl(a)} · len(a) = ${n} · <b>a[${i}] = ${a[idx]}</b>`;
  }
  r.oninput=draw;
  w.querySelector('#wt-add').onclick=()=>{if(a.length<8){a.push(R(1,9));}else{out.innerHTML+=' — хватит вагонов!';return;}draw();};
  w.querySelector('#wt-reset').onclick=()=>{a=[5,8,2,9,4];r.value=0;draw();};
  draw();
}

/* ---------- generators ---------- */
const gens=[];
const G=(lvl,make,o)=>gens.push(Object.assign({lvl,make},o||{}));
const RULE={rule:true},STAR={star:true};

/* L0 — что такое список, индексы */
G(0,()=>{const c=choiceOf('С нуля: первый элемент — a[0]',['С единицы: первый элемент — a[1]','С минус единицы: первый элемент — a[-1]','С любого числа, как захочешь']);
return {type:'choice',q:'С какого номера начинаются индексы в списке Python?',...c,
short:'Индексы начинаются с 0: a[0] — первый элемент.',
explain:'Индекс — это «на сколько шагов отойти от начала». До первого вагона идти не надо — сдвиг <b>0</b>. Поэтому первый элемент <code>a[0]</code>, второй <code>a[1]</code>. А <code>a[-1]</code> — это последний, а не первый.',
explain2:'Вспомни строки: в <code>s = "кот"</code> буква «к» — это <code>s[0]</code>. У списков всё точно так же. Как этажи в некоторых странах: нулевой этаж — первый, на который попадаешь.'};},RULE);
G(0,()=>{const n=pick([[3,5,7],[2,4,6],[10,20,30],[1,8,9]]);const right=`a = [${n.join(', ')}]`;
const c=choiceOf(right,[`a = (${n.join(' ')})`,`a = [${n.join('; ')}]`,`a = "${n.join(', ')}"`]);
return {type:'choice',q:`Как правильно создать список из чисел ${n.join(', ')}?`,...c,
short:`Квадратные скобки и запятые: ${right}.`,
explain:`Список пишут в <b>квадратных скобках</b>, элементы разделяют <b>запятыми</b>: <code>${right}</code>.<br>• С точкой с запятой — ошибка синтаксиса.<br>• В кавычках — это не список, а одна <b>строка</b> из символов.<br>• Круглые скобки без запятых — тоже ошибка.`,
explain2:'Правило из двух частей: <b>[ ]</b> — это поезд, <b>,</b> — сцепка между вагонами. Кавычки делают текст, а не поезд.'};},RULE);
G(0,()=>{const a=dlst(5,1,40);const k=R(0,4);
return {type:'num',q:`Что напечатает программа?${C(`a = ${pyl(a)}\nprint(a[${k}])`)}`,ans:a[k],
hint:'Считай вагоны с нуля: 0, 1, 2, …',
short:`a[${k}] — это ${k+1}-й элемент: ${a[k]}.`,
explain:`Нумеруем с нуля: ${a.map((x,i)=>`a[${i}] = ${x}`).join(', ')}.<br>Значит, <code>a[${k}]</code> = <b>${a[k]}</b>.${k>0?` Частая ошибка — ответ ${a[k-1]}: это если считать с единицы.`:''}`,
explain2:`Индекс ${k} значит «отойди от начала на ${k} ${plural(k,'шаг','шага','шагов')}». Встань на ${a[0]} и шагай: ${a.slice(0,k+1).join(' → ')}. Остановились на ${a[k]}.`};});
G(0,()=>{const a=dlst(R(5,6),1,50);const n=a.length;const k=R(1,3);
return {type:'num',q:`Что напечатает программа?${C(`a = ${pyl(a)}\nprint(a[-${k}])`)}`,ans:a[n-k],
hint:'a[-1] — последний, a[-2] — предпоследний…',
short:`a[-${k}] — ${k}-й с конца: ${a[n-k]}.`,
explain:`Отрицательный индекс считает <b>с конца</b>: a[-1] = ${a[n-1]}, a[-2] = ${a[n-2]}, a[-3] = ${a[n-3]}.<br>Значит, <code>a[-${k}]</code> = <b>${a[n-k]}</b>. Это то же, что a[len(a) − ${k}] = a[${n-k}].`,
explain2:`Длина списка ${n}. a[-${k}] = a[${n} − ${k}] = a[${n-k}]. Считаем с нуля: ${a.map((x,i)=>`${i}:${x}`).join(', ')} → ${a[n-k]}.`};});
G(0,()=>{const a=dlst(R(4,6),1,30);const n=a.length;
const c=choiceOf('Ошибку IndexError',[`${a[n-1]}`,`${a[0]}`,'None']);
return {type:'choice',q:`Что произойдёт?${C(`a = ${pyl(a)}\nprint(a[${n}])`)}`,...c,
short:`В списке из ${n} элементов индексы 0…${n-1}, индекса ${n} нет.`,
explain:`В списке ${n} ${plural(n,'элемент','элемента','элементов')}, их индексы: 0, 1, …, ${n-1}. Индекса <b>${n}</b> нет — Python сообщит <code>IndexError: list index out of range</code>.<br>Ответ ${a[n-1]} был бы при <code>a[${n-1}]</code> или <code>a[-1]</code>.`,
explain2:`Поезд из ${n} вагонов: номера 0…${n-1}. Просишь вагон №${n} — его не существует, Python не может его выдать и останавливается с ошибкой. Последний индекс всегда равен длине минус 1.`};});

/* L1 — len, append, изменение */
G(1,()=>{const c=choiceOf('Добавляет x в конец списка a',['Добавляет x в начало списка a','Заменяет первый элемент на x','Прибавляет x к каждому элементу']);
return {type:'choice',q:'Что делает команда <code>a.append(x)</code>?',...c,
short:'append — прицепить вагон в конец.',
explain:'<code>append</code> по-английски «присоединить, дописать». Новый элемент x становится <b>последним</b>, длина списка увеличивается на 1. Пример: <code>a = [1, 2]; a.append(5)</code> → <code>[1, 2, 5]</code>.',
explain2:'Поезд: к хвосту прицепили новый вагон. Остальные вагоны не трогали и не меняли.'};},RULE);
G(1,()=>{const c=choiceOf('len(a)',['a.len()','length(a)','a.count()']);
return {type:'choice',q:'Как узнать, сколько элементов в списке <code>a</code>?',...c,
short:'len(a) — длина.',
explain:'Длину узнают функцией <code>len(a)</code> — от английского length («длина»). Ты уже пользовался ей для строк: <code>len("кот")</code> = 3. Записи <code>a.len()</code> и <code>length(a)</code> Python не знает. <code>a.count(x)</code> считает, сколько раз встречается конкретное x.',
explain2:'len — одна и та же функция для строк и списков: «сколько вагонов в поезде», «сколько букв в слове».'};},RULE);
G(1,()=>{const a=lst(R(2,4),1,9);const k=R(1,3);const add=lst(k,1,9);
let code=`a = ${pyl(a)}\n`+add.map(x=>`a.append(${x})`).join('\n')+`\nprint(len(a))`;
return {type:'num',q:`Что напечатает программа?${C(code)}`,ans:a.length+k,
short:`Было ${a.length}, добавили ${k} → ${a.length+k}.`,
explain:`Сначала в списке ${a.length} ${plural(a.length,'элемент','элемента','элементов')}. Каждый append добавляет ровно один: ${a.length} + ${k} = <b>${a.length+k}</b>. Список стал ${pyl(a.concat(add))}.`,
explain2:`Посчитай вагоны в итоговом поезде: ${pyl(a.concat(add))} — их ${a.length+k}.`};});
G(1,()=>{const tests=[];for(let t=0;t<5;t++){const n=t===0?1:R(2,6);const a=lst(n,-20,50);tests.push(T(`${n}\n${lines(a)}`,`${pyl(a)}\n${a[0]} ${a[n-1]}`));}
return {type:'code',q:'Сначала вводится число <b>n</b>, затем n целых чисел, каждое на своей строке. Собери их в список и выведи: в первой строке — весь список командой <code>print(a)</code>, во второй — первый и последний элементы через пробел.',
starter:`n = int(input())\na = []\n# добавь n чисел в список\n`,tests,
solution:`n = int(input())\na = []\nfor i in range(n):\n    a.append(int(input()))\nprint(a)\nprint(a[0], a[-1])`,
hint:'В цикле for i in range(n) читай число и делай a.append(…). Последний элемент — a[-1].',
explain:'Идея: пустой поезд <code>a = []</code>, затем n раз читаем число <code>int(input())</code> и цепляем его в конец <code>a.append(…)</code>. После цикла: <code>print(a)</code>, а затем <code>print(a[0], a[-1])</code>. Если n = 1, первый и последний — один и тот же элемент, и <code>a[-1]</code> это правильно обработает.',
explain2:'Пример: ввод 3, 7, 2, 9 → a = [7, 2, 9]. a[0] = 7, a[-1] = 9. Почему не a[n]? Индекс n уже за краем, последний — a[n − 1] или a[-1].'};});

/* L2 — перебор */
G(2,()=>{const c=choiceOf('x по очереди становится каждым элементом списка',['x по очереди становится каждым индексом 0, 1, 2…','x — это длина списка','x — это весь список целиком']);
return {type:'choice',q:'Что происходит с переменной <code>x</code> в цикле <code>for x in a:</code>?',...c,
short:'for x in a перебирает значения.',
explain:'<code>for x in a</code> перебирает <b>значения</b>: если <code>a = [5, 8, 2]</code>, то x будет 5, потом 8, потом 2. Индексы перебирает другой цикл: <code>for i in range(len(a))</code>.',
explain2:'Как контролёр в поезде: он заходит в каждый вагон по очереди и видит, что внутри. Номер вагона ему не нужен.'};},RULE);
G(2,()=>{const a=lst(R(5,7),1,20);const t=R(6,14);const k=a.filter(x=>x>t).length;
return {type:'num',q:`Что напечатает программа?${C(`a = ${pyl(a)}\nk = 0\nfor x in a:\n    if x > ${t}:\n        k += 1\nprint(k)`)}`,ans:k,
short:`Больше ${t}: ${a.filter(x=>x>t).join(', ')||'нет таких'} — ${k}.`,
explain:`Это счётчик: k увеличивается, когда x &gt; ${t}.<br>${a.map(x=>`${x} ${x>t?'&gt; '+t+' ✅':'— нет'}`).join('<br>')}<br>Итого: <b>${k}</b>.${a.includes(t)?` Обрати внимание: ${t} &gt; ${t} — неверно, строгий знак.`:''}`,
explain2:`Выпиши только числа больше ${t}: ${a.filter(x=>x>t).join(', ')||'(нет)'}. Их количество и есть ответ: ${k}.`};});
G(2,()=>{const a=lst(4,1,9);const m=R(2,5);const k=R(0,3);
return {type:'num',q:`Что напечатает программа?${C(`a = ${pyl(a)}\nfor i in range(len(a)):\n    a[i] = a[i] * ${m} + i\nprint(a[${k}])`)}`,ans:a[k]*m+k,
short:`a[${k}] = ${a[k]}·${m} + ${k} = ${a[k]*m+k}.`,
explain:`Цикл проходит индексы 0, 1, 2, 3 и меняет каждый элемент: новое = старое · ${m} + индекс.<br>${a.map((x,i)=>`a[${i}] = ${x}·${m} + ${i} = ${x*m+i}`).join('<br>')}<br>Печатаем a[${k}] = <b>${a[k]*m+k}</b>.`,
explain2:`Нас интересует только вагон ${k}. В нём было ${a[k]}. Когда i = ${k}, туда кладётся ${a[k]} · ${m} + ${k} = ${a[k]*m+k}.`};});
G(2,()=>{const fixes=['for i in range(len(a)):\n    a[i] = a[i] * 2'];
const c=choiceOf(fixes[0],['for x in a:\n    x = x * 2 + 0','for i in a:\n    a[i] = a[i] * 2','for i in range(a):\n    a[i] = a[i] * 2']);
c.opts=c.opts.map(o=>`<code style="white-space:pre">${esc(o)}</code>`);
return {type:'choice',q:`Программа должна удвоить все элементы списка, но список не меняется:${C(`a = [3, 1, 4]\nfor x in a:\n    x = x * 2\nprint(a)    # печатает [3, 1, 4]`)}Какой вариант цикла правильный?`,...c,
short:'Менять вагоны можно только через индекс: a[i] = …',
explain:'<code>x</code> — копия значения, её изменение не трогает список. Нужно пройти по <b>индексам</b> <code>for i in range(len(a))</code> и записать <code>a[i] = a[i] * 2</code>.<br>• <code>for i in a</code> — i будет значениями 3, 1, 4, и a[4] вызовет IndexError.<br>• <code>range(a)</code> — range не принимает список, TypeError.',
explain2:'Фото и оригинал: x — фотография содержимого вагона. Разрисуй фото — вагон не изменится. a[i] — это сам вагон.'};});
G(2,()=>{const tests=[];for(let t=0;t<5;t++){const n=t===0?1:t===1?2:R(3,8);const a=lst(n,-30,99);tests.push(T(`${n}\n${lines(a)}`,lines(a.filter((x,i)=>i%2===0))));}
return {type:'code',q:'Вводится число <b>n</b>, затем n чисел, каждое на своей строке. Выведи элементы с <b>чётными индексами</b> (0, 2, 4, …), каждый на своей строке.',
starter:`n = int(input())\na = []\nfor i in range(n):\n    a.append(int(input()))\n# выведи a[0], a[2], a[4], ...\n`,tests,
solution:`n = int(input())\na = []\nfor i in range(n):\n    a.append(int(input()))\nfor i in range(0, n, 2):\n    print(a[i])`,
hint:'range(0, n, 2) даёт 0, 2, 4, … Или проверяй if i % 2 == 0.',
explain:'Сначала собираем список, как раньше. Потом идём по индексам с шагом 2: <code>for i in range(0, n, 2): print(a[i])</code>. Важно: речь про <b>индексы</b>, а не про значения — само число может быть нечётным.',
explain2:'Пример: a = [10, 11, 12, 13, 14]. Индексы 0, 2, 4 → печатаем 10, 12, 14. Второй способ: <code>for i in range(n): if i % 2 == 0: print(a[i])</code>.'};});
G(2,()=>{const tests=[];for(let t=0;t<5;t++){const n=t===0?1:R(2,7);const a=lst(n,-9,60);tests.push(T(`${n}\n${lines(a)}`,lines(a.slice().reverse())));}
return {type:'code',q:'Вводится <b>n</b>, затем n чисел (каждое на своей строке). Выведи их в <b>обратном порядке</b>, каждое на своей строке.',
starter:`n = int(input())\na = []\nfor i in range(n):\n    a.append(int(input()))\n`,tests,
solution:`n = int(input())\na = []\nfor i in range(n):\n    a.append(int(input()))\nfor i in range(n - 1, -1, -1):\n    print(a[i])`,
hint:'Индексы от n−1 вниз до 0: range(n - 1, -1, -1).',
explain:'Без списка не обойтись: чтобы напечатать первое число последним, его надо где-то запомнить. Собираем список, затем идём по индексам назад: <code>range(n - 1, -1, -1)</code> — от n−1 до 0 (−1 не входит), шаг −1.',
explain2:'Ещё способ: <code>for i in range(n): print(a[n - 1 - i])</code>. При i = 0 печатаем a[n−1] (последний), при i = n−1 — a[0] (первый).'};});

/* L3 — сумма, максимум, минимум */
G(3,()=>{const c=choiceOf('m = a[0] — первый элемент списка',['m = 0','m = 1000000','m = len(a)']);
return {type:'choice',q:'Ищем максимум вручную. Чем правильнее всего заполнить <code>m</code> перед циклом?',...c,
short:'Начинать надо с элемента списка: m = a[0].',
explain:'Если начать с <code>m = 0</code>, то для списка из отрицательных чисел, например <code>[-5, -3, -8]</code>, ответ будет 0 — а такого числа в списке нет. Если начать с огромного числа, оно никогда не уступит. Правильно — первый элемент <code>a[0]</code>: он точно из списка, а дальше цикл найдёт больший, если он есть.',
explain2:'«Царь горы»: первым на гору ставим настоящего участника, а не воображаемого. Воображаемый 0 может оказаться сильнее всех и «победит», хотя его в игре нет.'};},RULE);
G(3,()=>{const a=lst(4,-9,9);const fs=[['sum',a.reduce((x,y)=>x+y,0)],['max',Math.max(...a)],['min',Math.min(...a)],['len',4]];const f=pick(fs);
return {type:'num',q:`Что напечатает <code>print(${f[0]}(${esc(pyl(a))}))</code>?`,ans:f[1],
short:`${f[0]} → ${f[1]}.`,
explain:`<code>sum</code> — сумма, <code>max</code> — наибольший, <code>min</code> — наименьший, <code>len</code> — количество.<br>Для ${pyl(a)}: сумма ${a.join(' + ').replace(/\+ -/g,'− ')} = ${fs[0][1]}, max = ${fs[1][1]}, min = ${fs[2][1]}, len = 4.<br>Ответ: <b>${f[1]}</b>.`,
explain2:`Помни про отрицательные: −9 меньше −1. На числовой прямой максимум — правее всех, минимум — левее всех.`};},RULE);
G(3,()=>{const a=lst(R(4,5),-30,-1);
return {type:'num',q:`Что напечатает программа?${C(`a = ${pyl(a)}\nm = 0\nfor x in a:\n    if x > m:\n        m = x\nprint(m)`)}`,ans:0,
short:'Ни одно отрицательное число не больше 0, m остался 0.',
explain:`Все числа отрицательные, ни одно не больше 0, поэтому условие <code>x &gt; m</code> ни разу не выполнилось и m остался <b>0</b>. Это классическая ошибка: настоящий максимум — ${Math.max(...a)}. Чтобы программа была правильной, нужно начинать с <code>m = a[0]</code>.`,
explain2:`Проследи: m = 0. ${a.map(x=>`${x} &gt; 0? нет`).join('; ')}. m не менялся → 0.`};});
G(3,()=>{const a=lst(R(5,7),1,30);const s=a.filter(x=>x%2===0).reduce((x,y)=>x+y,0);
return {type:'num',q:`Что напечатает программа?${C(`a = ${pyl(a)}\ns = 0\nfor x in a:\n    if x % 2 == 0:\n        s = s + x\nprint(s)`)}`,ans:s,
short:`Сумма чётных: ${a.filter(x=>x%2===0).join(' + ')||'0'} = ${s}.`,
explain:`В копилку попадают только чётные (остаток от деления на 2 равен 0): ${a.filter(x=>x%2===0).join(', ')||'таких нет'}.<br>s = ${a.filter(x=>x%2===0).join(' + ')||'0'} = <b>${s}</b>.`,
explain2:`Пройди по шагам: ${(()=>{let t=0;return a.map(x=>{if(x%2===0){t+=x;return `${x} чётное → s = ${t}`;}return `${x} пропускаем`;}).join('; ');})()}.`};});
G(3,()=>{const tests=[];for(let t=0;t<6;t++){const n=t===0?1:R(2,8);const a=t===1?lst(n,-50,-1):t===2?Array(n).fill(7):lst(n,-50,50);
tests.push(T(`${n}\n${lines(a)}`,`${a.reduce((x,y)=>x+y,0)}\n${Math.max(...a)}\n${Math.min(...a)}`));}
return {type:'code',q:'Вводится <b>n</b>, затем n целых чисел, каждое на своей строке. Выведи три строки: сумму, максимум и минимум.',
starter:`n = int(input())\na = []\nfor i in range(n):\n    a.append(int(input()))\n`,tests,
solution:`n = int(input())\na = []\nfor i in range(n):\n    a.append(int(input()))\nprint(sum(a))\nprint(max(a))\nprint(min(a))`,
hint:'Есть готовые функции sum, max, min. А можешь и вручную!',
explain:'Собрали список — дальше три готовые функции: <code>print(sum(a))</code>, <code>print(max(a))</code>, <code>print(min(a))</code>. Тесты проверяют и отрицательные числа, и список из одного элемента, и одинаковые числа.',
explain2:'Вручную: <code>s = 0; mx = a[0]; mn = a[0]</code>, потом в цикле <code>s += x</code>, <code>if x &gt; mx: mx = x</code>, <code>if x &lt; mn: mn = x</code>.'};});
G(3,()=>{const tests=[];for(let t=0;t<6;t++){const n=t===0?1:R(2,8);let a=lst(n,-20,20);if(t===2){a=[3,9,1,9,2];}if(t===3){a=[-4,-4,-4];}
let k=0;a.forEach((x,i)=>{if(x>a[k])k=i;});tests.push(T(`${a.length}\n${lines(a)}`,k));}
return {type:'code',q:'Вводится <b>n</b>, затем n чисел (каждое на своей строке). Выведи <b>индекс</b> максимального элемента. Если максимумов несколько — индекс <b>первого</b> из них. Индексы считаются с 0.',
starter:`n = int(input())\na = []\nfor i in range(n):\n    a.append(int(input()))\nk = 0\n`,tests,
solution:`n = int(input())\na = []\nfor i in range(n):\n    a.append(int(input()))\nk = 0\nfor i in range(n):\n    if a[i] > a[k]:\n        k = i\nprint(k)`,
hint:'Храни номер k лучшего элемента. Сравнивай a[i] с a[k]. Знак строгий — чтобы остался первый.',
explain:'Храним не сам максимум, а его <b>номер</b> k. Сначала k = 0. Для каждого i: если <code>a[i] &gt; a[k]</code>, то k = i. Знак строгий <code>&gt;</code>: если встретится такое же большое число, k не поменяется — останется первый. (Короткий путь: <code>a.index(max(a))</code> — тоже правильно.)',
explain2:'Пример [3, 9, 1, 9, 2]: k=0 (3) → i=1: 9 &gt; 3, k=1 → i=3: 9 &gt; 9? нет → ответ 1. С <code>&gt;=</code> получилось бы 3 — последний максимум.'};});

/* L4 — поиск и подсчёт */
G(4,()=>{const c=choiceOf('True, если x есть в списке a, иначе False',['Индекс элемента x в списке','Сколько раз x встречается в a','Добавляет x в список a']);
return {type:'choice',q:'Что даёт выражение <code>x in a</code>?',...c,
short:'in — проверка «есть ли?»: True/False.',
explain:'<code>x in a</code> отвечает на вопрос «есть ли x в списке?»: <code>True</code> (да) или <code>False</code> (нет). Индекс даёт <code>a.index(x)</code>, количество — <code>a.count(x)</code>, добавляет — <code>a.append(x)</code>.',
explain2:'Это как спросить: «В поезде есть вагон с углём?» Ответ — да или нет, а не номер вагона.'};},RULE);
G(4,()=>{let a,x;do{a=lst(7,1,6);x=pick(a);}while(a.filter(v=>v===x).length<2);const f=pick(['index','count']);const ans=f==='index'?a.indexOf(x):a.filter(v=>v===x).length;
return {type:'num',q:`Что напечатает программа?${C(`a = ${pyl(a)}\nprint(a.${f}(${x}))`)}`,ans,
short:f==='index'?`Первое ${x} стоит на индексе ${ans}.`:`${x} встречается ${ans} раз(а).`,
explain:f==='index'?`<code>index</code> — индекс <b>первого</b> вхождения. Нумеруем с нуля: ${a.map((v,i)=>v===x?`<b>${i}:${v}</b>`:`${i}:${v}`).join(', ')}. Первое ${x} — на месте <b>${ans}</b>. (Не ${ans+1} — считаем с нуля!)`:`<code>count</code> считает, сколько раз встречается число: ${a.map(v=>v===x?`<b>${v}</b>`:v).join(', ')} → <b>${ans}</b>.`,
explain2:f==='index'?`Иди слева направо, считая шаги с 0, и остановись на первом ${x}: ${a.slice(0,ans+1).join(' → ')} — индекс ${ans}.`:`Подчеркни все ${x} в списке и посчитай: ${ans}.`};});
G(4,()=>{const c=choiceOf('else: print("Нет") стоит внутри цикла — «Нет» печатается для каждого неподходящего элемента',['Нужно писать found = 0, а не found = False','Нельзя сравнивать v == x','Цикл for нельзя использовать со списком']);
return {type:'choice',q:`Программа должна один раз сказать, есть ли 7 в списке. А она печатает много строк. В чём ошибка?${C(`a = [3, 7, 1, 9]\nfor v in a:\n    if v == 7:\n        print("Есть")\n    else:\n        print("Нет")`)}`,...c,
short:'Вывод «Нет» нужно делать после цикла, по флажку.',
explain:'Для каждого элемента программа печатает либо «Есть», либо «Нет» — получается «Нет, Есть, Нет, Нет». Решение «нет в списке» можно принять, только просмотрев <b>весь</b> список. Правильно: флажок <code>found = False</code>, в цикле при совпадении <code>found = True</code>, а печать — <b>после</b> цикла.',
explain2:'Ищешь ключи в 4 карманах. Нельзя после первого пустого кармана сказать «ключей нет» — надо проверить все. Поэтому вывод — после цикла.'};});
G(4,()=>{const tests=[];const mk=(a,x)=>{const k=a.filter(v=>v===x).length;tests.push(T(`${a.length}\n${lines(a)}\n${x}`,k?k:'НЕТ'));};
mk([5,3,5,1,5],5);mk([2,4,6],7);mk([9],9);mk([-1,0,-1],-1);{const a=lst(8,1,5);mk(a,pick(a));}mk(lst(5,10,20),3);
return {type:'code',q:'Вводится <b>n</b>, затем n чисел (каждое на своей строке), а последней строкой — число <b>x</b>. Выведи, сколько раз x встречается в списке. Если ни разу — выведи <code>НЕТ</code>.',
starter:`n = int(input())\na = []\nfor i in range(n):\n    a.append(int(input()))\nx = int(input())\n`,tests,
solution:`n = int(input())\na = []\nfor i in range(n):\n    a.append(int(input()))\nx = int(input())\nk = a.count(x)\nif k == 0:\n    print("НЕТ")\nelse:\n    print(k)`,
hint:'Посчитай k (a.count(x) или вручную), а потом if k == 0.',
explain:'Считаем вхождения: <code>k = a.count(x)</code> (или счётчиком в цикле: <code>if v == x: k += 1</code>). После этого развилка: если k == 0 — печатаем «НЕТ», иначе — k. Обрати внимание: x читается <b>после</b> списка.',
explain2:'Пример: [5, 3, 5, 1, 5], x = 5 → count = 3. Для x = 7 в [2, 4, 6] → 0 → «НЕТ». Текст «НЕТ» пиши заглавными буквами и в кавычках.'};});

/* L5 — split и map */
G(5,()=>{const n=dlst(3,1,40);const c=choiceOf(pys(n),[pyl(n),`'${n.join(' ')}'`,`[${n.join(' ')}]`]);
return {type:'choice',q:`Пользователь ввёл <code>${n.join(' ')}</code>. Что окажется в <code>a</code> после <code>a = input().split()</code>?`,...c,
short:'split даёт список строк.',
explain:`<code>split()</code> разрезает строку по пробелам и возвращает список <b>строк</b>: ${esc(pys(n))}. Это ещё не числа! Чтобы получить числа ${pyl(n)}, нужно <code>list(map(int, input().split()))</code>.`,
explain2:`input() всегда даёт текст. split() режет текст на кусочки, но кусочки остаются текстом — в кавычках. Превращает в числа только int.`};},RULE);
G(5,()=>{let x,y;do{x=R(1,9);y=R(1,9);}while(x===y);
return {type:'num',q:`Пользователь ввёл <code>${x} ${y}</code>. Что напечатает программа?${C(`a = input().split()\nprint(a[0] + a[1])`)}`,ans:+(String(x)+y),
short:`Строки склеиваются: '${x}' + '${y}' = '${x}${y}'.`,
explain:`В списке лежат <b>строки</b> '${x}' и '${y}'. Плюс для строк — это <b>склейка</b>: '${x}' + '${y}' = <b>${x}${y}</b>. Ответ ${x+y} получился бы, если бы мы сделали <code>int(a[0]) + int(a[1])</code> или использовали <code>map(int, …)</code>.`,
explain2:`Представь, что это не числа, а наклейки с цифрами. Ты кладёшь наклейку «${x}» рядом с наклейкой «${y}» — получается «${x}${y}». Складывать как числа Python будет, только если их превратить в int.`};});
G(5,()=>{const big=pick([[9,10,100],[8,25,100],[7,30,123],[5,40,1000]]);const sh=shuffle(big);
return {type:'num',q:`Пользователь ввёл <code>${sh.join(' ')}</code>. Что напечатает программа?${C(`a = input().split()\nprint(max(a))`)}`,ans:big[0],
short:`Строки сравниваются по первой букве: '${big[0]}' больше, чем '${String(big[1])[0]}…' и '1…'.`,
explain:`Без <code>map(int, …)</code> в списке строки. Строки сравниваются как слова в словаре: по первому символу. У '${big[0]}' первый символ '${big[0]}', у остальных — '${String(big[1])[0]}' и '1'. '${big[0]}' больше → max = <b>${big[0]}</b>, хотя как число самое большое ${big[2]}.`,
explain2:`В словаре слово «яблоко» стоит после «арбуза», хотя оно короче. Так и '${big[0]}' «после» '${big[2]}'. Чтобы сравнивать как числа: <code>a = list(map(int, input().split()))</code>.`};});
G(5,()=>{const tests=[];const add=a=>tests.push(T(a.join(' '),a.filter(x=>x>0).reduce((s,x)=>s+x,0)));
add([3,-5,7,0,2]);add([-1,-2,-3]);add([10]);add(lst(10,-50,50));add([0,0,0]);add(lst(7,-9,9));
return {type:'code',q:'В одной строке через пробел вводятся целые числа. Выведи сумму <b>положительных</b> из них (если таких нет — выведи 0).',
starter:`a = input().split()\n`,tests,
solution:`a = list(map(int, input().split()))\ns = 0\nfor x in a:\n    if x > 0:\n        s += x\nprint(s)`,
hint:'a = list(map(int, input().split())). Ноль не положительный!',
explain:'1) Читаем числа: <code>a = list(map(int, input().split()))</code>. 2) Копилка <code>s = 0</code>, в цикле добавляем только <code>x &gt; 0</code>. 3) Печатаем s. Если положительных нет, s так и останется 0 — это правильный ответ. Ноль — не положительное число, но прибавлять его безопасно.',
explain2:'Короче через генератор: <code>print(sum([x for x in a if x &gt; 0]))</code>. Пример: 3 −5 7 0 2 → 3 + 7 + 2 = 12.'};});
G(5,()=>{const tests=[];const add=a=>{let k=0;for(let i=1;i<a.length;i++)if(a[i]>a[i-1])k++;tests.push(T(a.join(' '),k));};
add([1,3,2,5,6]);add([5]);add([4,4,4]);add([9,7,5,3]);add(lst(10,1,20));add(lst(8,-5,5));
return {type:'code',q:'В одной строке вводятся целые числа. Сколько чисел <b>больше предыдущего</b>? (У первого числа предыдущего нет.)',
starter:`a = list(map(int, input().split()))\n`,tests,
solution:`a = list(map(int, input().split()))\nk = 0\nfor i in range(1, len(a)):\n    if a[i] > a[i - 1]:\n        k += 1\nprint(k)`,
hint:'Сравнивай a[i] и a[i - 1], начиная с i = 1.',
explain:'Нужен цикл по индексам, потому что сравниваем соседей: <code>for i in range(1, len(a))</code> и <code>if a[i] &gt; a[i - 1]: k += 1</code>. Начинаем с 1: у a[0] нет соседа слева (a[-1] — это последний элемент, а не «предыдущий»!).',
explain2:'Пример 1 3 2 5 6: 3&gt;1 ✅, 2&gt;3 ❌, 5&gt;2 ✅, 6&gt;5 ✅ → 3. Одно число → сравнивать не с чем → 0.'};});

/* L6 — срезы и сортировка */
G(6,()=>{const c=choiceOf('a.sort() меняет сам список a; sorted(a) возвращает новый список, a не меняется',['Они делают одно и то же','sorted(a) меняет a, а a.sort() возвращает новый список','a.sort() сортирует по убыванию, sorted(a) — по возрастанию']);
return {type:'choice',q:'Чем отличаются <code>a.sort()</code> и <code>sorted(a)</code>?',...c,
short:'sort — на месте, sorted — копия.',
explain:'<code>a.sort()</code> переставляет элементы <b>в самом списке</b> и ничего не возвращает (None). <code>sorted(a)</code> делает <b>новый</b> отсортированный список, а исходный остаётся как был. Обе по возрастанию; по убыванию — с <code>reverse=True</code>.',
explain2:'sort — ты сам расставил книги на полке. sorted — ты сфотографировал полку и на фото расставил по порядку, а настоящие книги стоят как стояли.'};},RULE);
G(6,()=>{const a=dlst(6,1,60);let i=R(0,3),j=R(i+2,6);const r=a.slice(i,j);
const c=choiceOf(pyl(r),[pyl(a.slice(i,j+1)),pyl(a.slice(i+1,j+1)),pyl(a.slice(Math.max(0,i-1),j))]);
return {type:'choice',q:`Что напечатает программа?${C(`a = ${pyl(a)}\nprint(a[${i}:${j}])`)}`,...c,
short:`С индекса ${i} до ${j}, ${j} не входит.`,
explain:`Срез <code>a[${i}:${j}]</code> берёт индексы ${range(i,j-1).join(', ')} — от ${i} <b>до</b> ${j}, сам ${j} <b>не входит</b>.<br>Индексы: ${a.map((x,t)=>`${t}:${x}`).join(', ')}.<br>Ответ: <b>${pyl(r)}</b>.`,
explain2:`Длина среза = ${j} − ${i} = ${j-i}. Начни с a[${i}] = ${a[i]} и возьми ${j-i} ${plural(j-i,'элемент','элемента','элементов')} подряд.`};});
G(6,()=>{const a=dlst(6,1,50);const b=a.slice().sort((x,y)=>y-x);const k=R(2,3);
const c=choiceOf(pyl(b.slice(0,k)),[pyl(a.slice().sort((x,y)=>x-y).slice(0,k)),pyl(a.slice(0,k)),pyl(b.slice(-k))]);
return {type:'choice',q:`Что напечатает программа?${C(`a = ${pyl(a)}\na.sort(reverse=True)\nprint(a[:${k}])`)}`,...c,
short:`По убыванию, первые ${k}: самые большие.`,
explain:`После <code>sort(reverse=True)</code> список по убыванию: ${pyl(b)}. Срез <code>[:${k}]</code> — первые ${k}: <b>${pyl(b.slice(0,k))}</b>. Это ${k} самых больших числа.`,
explain2:`reverse=True — «наоборот», от большого к маленькому. Затем берём начало списка.`};});
G(6,()=>{const a=dlst(4,1,9);const c=choiceOf('None',[pyl(a.slice().sort((x,y)=>x-y)),pyl(a),'Ошибку IndexError']);
return {type:'choice',q:`Что напечатает программа?${C(`a = ${pyl(a)}\na = a.sort()\nprint(a)`)}`,...c,
short:'sort() ничего не возвращает, в a записался None.',
explain:`<code>a.sort()</code> отсортировал список, но <b>вернул None</b> («ничего»). Строка <code>a = a.sort()</code> положила это None в a — список потерян. Печатается <b>None</b>. Правильно: просто <code>a.sort()</code> без «a =», или <code>a = sorted(a)</code>.`,
explain2:'Представь: ты попросил друга расставить книги, а потом записал в тетрадь «что он мне сказал». Он ничего не сказал — он просто расставил. В тетради — пусто (None).'};});
G(6,()=>{const tests=[];const add=a=>{const b=a.slice().sort((x,y)=>y-x).slice(0,3);tests.push(T(a.join(' '),lines(b)));};
add([5,1,9,3,7]);add([1,2,3]);add([4,4,4,4]);add([-1,-5,-3,-2]);add(lst(10,1,99));add(lst(6,-10,10));
return {type:'code',q:'В строке вводятся целые числа (не меньше трёх). Выведи три самых больших из них по убыванию, каждое на своей строке. (Одинаковые числа могут повторяться — тогда выводи их как есть.)',
starter:`a = list(map(int, input().split()))\n`,tests,
solution:`a = list(map(int, input().split()))\na.sort(reverse=True)\nfor x in a[:3]:\n    print(x)`,
hint:'Отсортируй по убыванию и возьми срез a[:3].',
explain:'Сортируем по убыванию <code>a.sort(reverse=True)</code> — самые большие оказываются в начале. Затем <code>for x in a[:3]: print(x)</code>. Если числа повторяются, например 4 4 4 4, вывод 4, 4, 4 — так и надо.',
explain2:'Без reverse: <code>a.sort()</code>, и тогда три больших — в конце: a[-1], a[-2], a[-3] (печатаем в этом порядке).'};});
G(6,()=>{const tests=[];const add=a=>{const b=a.slice().sort((x,y)=>x-y);tests.push(T(a.join(' '),b[(b.length-1)/2]));};
add([5,1,9]);add([7]);add([3,8,1,9,2]);add([4,4,1,4,9]);add(lst(9,-50,50));add(lst(7,1,10));
return {type:'code',q:'Вводится нечётное количество целых чисел в одну строку. Выведи <b>медиану</b> — число, которое окажется ровно посередине, если их отсортировать.',
starter:`a = list(map(int, input().split()))\n`,tests,
solution:`a = list(map(int, input().split()))\na.sort()\nprint(a[len(a) // 2])`,
hint:'После сортировки середина — индекс len(a) // 2.',
explain:'Сортируем и берём средний элемент. Если чисел n (нечётное), то индексы 0…n−1, середина — <code>n // 2</code>. Например, n = 5: индексы 0 1 <b>2</b> 3 4 — 5 // 2 = 2 ✅.',
explain2:'Пример: 3 8 1 9 2 → отсортировано 1 2 3 8 9 → посередине 3. Медиана хороша тем, что один «выброс» (например, 1000000) не портит ответ, в отличие от среднего.'};});

/* L7 — генераторы */
G(7,()=>{const k=R(3,5);const r=range(0,k-1).map(x=>x*x);const c=choiceOf(pyl(r),[pyl(range(1,k).map(x=>x*x)),pyl(range(0,k-1).map(x=>x*2)),pyl(range(0,k-1))]);
return {type:'choice',q:`Что получится: <code>[x * x for x in range(${k})]</code>?`,...c,
short:`Квадраты чисел 0…${k-1}.`,
explain:`Читаем: «x·x для каждого x из range(${k})». range(${k}) — это ${range(0,k-1).join(', ')}. Квадраты: ${range(0,k-1).map(x=>`${x}·${x} = ${x*x}`).join(', ')}. Итог <b>${pyl(r)}</b>.`,
explain2:'Генератор списка = цикл с append в одну строку: сначала пишем, ЧТО положить (x*x), потом ОТКУДА брать x (for x in …).'};},RULE);
G(7,()=>{const a=lst(7,1,30);const k=pick([3,4,5]);const r=a.filter(x=>x%k===0);
const opts0=[pyl(r),pyl(a.filter(x=>x%k!==0)),pyl(a.filter(x=>x%k===0).map(x=>x/k)),pyl(r.concat([k]))];
const c=choiceOf(opts0[0],opts0.slice(1));
return {type:'choice',q:`Что напечатает программа?${C(`a = ${pyl(a)}\nb = [x for x in a if x % ${k} == 0]\nprint(b)`)}`,...c,
short:`Только кратные ${k}.`,
explain:`Фильтр <code>if x % ${k} == 0</code> оставляет числа, которые делятся на ${k} без остатка: ${a.map(x=>x%k===0?`<b>${x}</b>`:x).join(', ')}.<br>Ответ: <b>${pyl(r)}</b>${r.length?'':' (пустой список — ни одно не подошло)'}.`,
explain2:'Это то же, что: b = []; for x in a: if x % '+k+' == 0: b.append(x). Порядок сохраняется такой же, как в a.'};});
G(7,()=>{const tests=[];const add=a=>{const b=a.filter(x=>x%2===0).map(x=>x*x);tests.push(T(a.join(' '),b.length?b.join(' '):'НЕТ'));};
add([1,2,3,4]);add([1,3,5]);add([0,-2,7]);add(lst(8,-10,10));add([6]);add(lst(10,1,30));
return {type:'code',q:'В строке вводятся целые числа. Выведи в одну строку через пробел <b>квадраты чётных</b> чисел (в том же порядке). Если чётных нет — выведи <code>НЕТ</code>.',
starter:`a = list(map(int, input().split()))\n`,tests,
solution:`a = list(map(int, input().split()))\nb = [x * x for x in a if x % 2 == 0]\nif len(b) == 0:\n    print("НЕТ")\nelse:\n    print(*b)`,
hint:'b = [x * x for x in a if x % 2 == 0], а потом print(*b). 0 и отрицательные чётные тоже считаются!',
explain:'Генератор: <code>b = [x * x for x in a if x % 2 == 0]</code>. Если список пустой (<code>len(b) == 0</code>) — «НЕТ», иначе <code>print(*b)</code> печатает через пробел. Заметь: 0 и −2 — чётные (−2 % 2 == 0 в Python).',
explain2:'Пример: 1 2 3 4 → чётные 2 и 4 → квадраты 4 16. Вывод: <code>4 16</code>.'};});

/* L8 — ★ */
G(8,()=>{const a=lst(R(4,6),1,9);let s=a.slice();for(let i=1;i<s.length;i++)s[i]+=s[i-1];const k=R(1,a.length-1);
return {type:'num',q:`Что напечатает программа?${C(`a = ${pyl(a)}\nfor i in range(1, len(a)):\n    a[i] = a[i] + a[i - 1]\nprint(a[${k}])`)}`,ans:s[k],
short:`После цикла a[i] — сумма первых i+1 элементов: ${s[k]}.`,
explain:`Каждый элемент становится суммой себя и <b>уже изменённого</b> предыдущего. Так получаются «накопленные суммы»:<br>${s.map((v,i)=>`a[${i}] = ${a.slice(0,i+1).join(' + ')} = ${v}`).join('<br>')}<br>a[${k}] = <b>${s[k]}</b>.`,
explain2:`Ловушка: a[i − 1] к этому моменту уже изменён! Поэтому a[${k}] — не ${a[k]} + ${a[k-1]} = ${a[k]+a[k-1]}, а сумма всех первых ${k+1}: ${s[k]}. Такие массивы называют префиксными суммами — они часто нужны на олимпиадах.`};},STAR);
G(8,()=>{const a=lst(3,1,9);const k=R(1,3);
return {type:'num',q:`Что напечатает программа?${C(`a = ${pyl(a)}\nb = a\n`+range(1,k).map(t=>`b.append(${t})`).join('\n')+`\nprint(len(a))`)}`,ans:3+k,
short:'b = a — это не копия, а второе имя того же списка.',
explain:`<code>b = a</code> не создаёт новый список — это вторая наклейка на <b>тот же самый</b> поезд. Прицепили ${k} ${plural(k,'вагон','вагона','вагонов')} через b — они видны и через a. len(a) = 3 + ${k} = <b>${3+k}</b>. Ответ 3 был бы, если бы мы сделали копию <code>b = a[:]</code>.`,
explain2:'Два имени одного кота: «Барсик» и «Котик». Покормил Котика — Барсик тоже сыт. Это частая ловушка в олимпиадных задачах на «что напечатает».'};},STAR);
G(8,()=>{const tests=[];const add=a=>{const m1=Math.max(...a);const m2=Math.max(...a.filter(x=>x!==m1));tests.push(T(a.join(' '),m2));};
add([4,9,2,9,7]);add([1,2]);add([5,5,5,3]);add([-1,-7,-3]);add(lst(10,1,50).concat([0,100]));add([10,20,20,10]);
return {type:'code',q:'В строке вводятся целые числа (среди них есть хотя бы два <b>разных</b>). Выведи <b>второй по величине</b> различный элемент. Например, для 4 9 2 9 7 ответ 7 (9 — самый большой, хоть он и встречается дважды).',
starter:`a = list(map(int, input().split()))\n`,tests,
solution:`a = list(map(int, input().split()))\nm1 = max(a)\nb = [x for x in a if x != m1]\nprint(max(b))`,
hint:'Найди максимум m1, затем максимум среди чисел, которые не равны m1.',
explain:'Шаг 1: <code>m1 = max(a)</code>. Шаг 2: убираем все копии максимума: <code>b = [x for x in a if x != m1]</code>. Шаг 3: ответ — <code>max(b)</code>. Частая ошибка — <code>sorted(a)[-2]</code>: для 4 9 2 9 7 это даст 9, а нужно 7.',
explain2:'Вариант за один проход: держи m1 и m2. Если x &gt; m1: m2 = m1, m1 = x; иначе если x != m1 и x &gt; m2: m2 = x. Начинать m2 надо с очень маленького числа или None.'};},STAR);
G(8,()=>{const tests=[];const add=(a,k)=>{const n=a.length;const kk=k%n;const b=kk?a.slice(n-kk).concat(a.slice(0,n-kk)):a.slice();tests.push(T(`${a.join(' ')}\n${k}`,b.join(' ')));};
add([1,2,3,4,5],2);add([1,2,3,4,5],7);add([9],3);add([4,5,6],0);add([1,2,3],3);add(lst(8,1,99),R(1,20));
return {type:'code',q:'В первой строке — список чисел, во второй — число <b>k</b> (k ≥ 0). Сдвинь список <b>циклически вправо</b> на k позиций (последние элементы переезжают в начало) и выведи его через пробел. Например, 1 2 3 4 5 и k = 2 → 4 5 1 2 3.',
starter:`a = list(map(int, input().split()))\nk = int(input())\n`,tests,
solution:`a = list(map(int, input().split()))\nk = int(input())\nk = k % len(a)\nb = a[len(a) - k:] + a[:len(a) - k]\nprint(*b)`,
hint:'Сначала k = k % len(a). Потом склей два среза: хвост + начало.',
explain:'Сдвиг на len(a) возвращает список на место, поэтому сначала <code>k = k % len(a)</code>. Хвост из k элементов переезжает вперёд: <code>a[len(a) - k:] + a[:len(a) - k]</code>. Почему не <code>a[-k:]</code>? При k = 0 срез <code>a[-0:]</code> = <code>a[0:]</code> — весь список, и он удвоится. Через len(a) − k это не страшно.',
explain2:'Пример: [1, 2, 3, 4, 5], k = 7 → 7 % 5 = 2. Хвост [4, 5], начало [1, 2, 3] → [4, 5, 1, 2, 3]. Можно и в цикле k раз делать «последний в начало»: a = [a[-1]] + a[:-1].'};},STAR);
G(8,()=>{const tests=[];const add=a=>{const u=a.filter(x=>a.filter(y=>y===x).length===1);tests.push(T(a.join(' '),u.length?u.join(' '):'НЕТ'));};
add([3,1,3,2,1,5]);add([7,7,7]);add([4]);add([1,2,3]);add(lst(10,1,6));add([-1,2,-1,2,0]);
return {type:'code',q:'В строке вводятся числа. Выведи через пробел те, что встречаются <b>ровно один раз</b>, в порядке появления. Если таких нет — выведи <code>НЕТ</code>.',
starter:`a = list(map(int, input().split()))\n`,tests,
solution:`a = list(map(int, input().split()))\nu = [x for x in a if a.count(x) == 1]\nif u:\n    print(*u)\nelse:\n    print("НЕТ")`,
hint:'a.count(x) == 1 — значит, x уникальный.',
explain:'Для каждого x проверяем <code>a.count(x) == 1</code> — это и есть «встречается ровно один раз». Собираем подходящие генератором и печатаем через <code>print(*u)</code>; если список пуст — «НЕТ». (Пустой список в if считается «ложью».)',
explain2:'Пример: 3 1 3 2 1 5 → count: 3→2, 1→2, 3→2, 2→1 ✅, 1→2, 5→1 ✅ → вывод 2 5. Для олимпиад это медленно на больших данных (count каждый раз идёт по всему списку), но для учебных размеров отлично.'};},STAR);
G(8,()=>{const tests=[];const add=a=>{let best=1,cur=1;for(let i=1;i<a.length;i++){if(a[i]===a[i-1]){cur++;if(cur>best)best=cur;}else cur=1;}tests.push(T(a.join(' '),best));};
add([1,1,2,2,2,3]);add([5]);add([1,2,3,4]);add([7,7,7,7]);add([2,2,1,2,2,2,2]);add(lst(12,1,3));
return {type:'code',q:'В строке вводятся числа. Найди длину самой длинной <b>серии одинаковых чисел, стоящих подряд</b>. Например, для 1 1 2 2 2 3 ответ 3.',
starter:`a = list(map(int, input().split()))\n`,tests,
solution:`a = list(map(int, input().split()))\nbest = 1\ncur = 1\nfor i in range(1, len(a)):\n    if a[i] == a[i - 1]:\n        cur += 1\n        if cur > best:\n            best = cur\n    else:\n        cur = 1\nprint(best)`,
hint:'Два счётчика: cur — длина текущей серии, best — рекорд. Если a[i] == a[i-1], cur += 1, иначе cur = 1.',
explain:'Идём слева направо, сравнивая с предыдущим. Если равны — серия продолжается: <code>cur += 1</code>, и обновляем рекорд <code>best</code>. Если не равны — началась новая серия: <code>cur = 1</code>. Начальные значения — 1: одно число — уже серия длины 1.',
explain2:'Пример 2 2 1 2 2 2 2: cur = 1,2 | 1 | 1,2,3,4 → best = 4. Ошибка новичков — обновлять best только в else: тогда последняя серия (в конце списка) не учтётся.'};},STAR);

window.TOPIC={id:'i_lists',title:'7. Списки',subtitle:'Программирование · Python',
intro:'<p>Списки — способ хранить много значений под одним именем: оценки, очки игроков, ячейки инвентаря. Читай теорию и обязательно запускай примеры — меняй числа и смотри, что получится. Потом переходи к задачам.</p>',
theory,symbols,figs:{},onTheory,
levels:['Список и индексы','len, append, изменение','Перебор списка','Сумма, максимум, минимум','Поиск и подсчёт','Ввод: split и map','Срезы и сортировка','Генератор списка','★ Олимпиадные задачи'],
gens};
})();
