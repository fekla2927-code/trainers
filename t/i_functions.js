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
const BR=s=>esc(s).replace(/\n/g,'<br>');
const isPrime=n=>{if(n<2)return false;for(let d=2;d*d<=n;d++)if(n%d===0)return false;return true;};
const gcd=(a,b)=>b?gcd(b,a%b):a;
const dsum=n=>String(Math.abs(n)).split('').reduce((s,c)=>s+ +c,0);
const fact=n=>n<=1?1:n*fact(n-1);
const fib=n=>{let a=1,b=1;for(let i=3;i<=n;i++){[a,b]=[b,a+b];}return n<=2?1:b;};
const rev=n=>+String(n).split('').reverse().join('');

/* ---------- theory ---------- */
const theory=[
{title:'Что мы уже умеем',lvl:0,html:`
<p>В модуле «7. Списки» ты научился хранить много значений в одной переменной, перебирать их, искать максимум, сортировать. До этого — переменные, условия, циклы и строки.</p>
<p class="hook">В Minecraft есть команда <code>/tp</code>: набрал одно слово — и игра сама делает десятки действий (найти координаты, проверить блоки, переместить игрока, загрузить чанки). Кто-то <b>один раз</b> написал этот код и дал ему имя. Сегодня ты научишься делать <b>свои команды</b> — функции.</p>
<p>Ты уже пользовался чужими функциями: <code>print</code>, <code>len</code>, <code>max</code>, <code>int</code>. Теперь сделаешь свои.</p>`},
{title:'Функция — своя кнопка-заклинание',lvl:0,html:`
<div class="box rule"><b>Правило</b>Функцию создают словом <code>def</code> (от define — «определить»): <code>def имя():</code>, двоеточие, а ниже — тело функции <b>с отступом 4 пробела</b>. Чтобы функция сработала, её надо <b>вызвать</b>: <code>имя()</code> — со скобками.</div>
${RUN(`def hello():
    print("Привет!")
    print("Я — функция")

hello()
hello()`)}
<p>Попробуй вызвать <code>hello()</code> три раза. А теперь удали все вызовы — программа ничего не напечатает!</p>
<div class="box rule"><b>Почему так</b>Строки с <code>def</code> — это только <b>рецепт</b>. Python запоминает его, но не выполняет. Готовить по рецепту он начнёт, когда ты нажмёшь кнопку — вызовешь функцию. Можно нажать сколько угодно раз.</div>
<div class="box err"><b>Частые ошибки</b>
• Забыл двоеточие после <code>def hello()</code> → SyntaxError.<br>
• Забыл отступ у тела → IndentationError.<br>
• Написал <code>hello</code> без скобок — функция <b>не вызвалась</b>. Скобки — это и есть «нажать кнопку».<br>
• Вызвал функцию <b>раньше</b>, чем написал def → NameError: Python читает программу сверху вниз и ещё не знает такого имени.</div>`},
{title:'Параметры: кнопка с настройками',lvl:1,html:`
<p>Кнопка «приготовить чай» полезнее, если можно сказать, <b>сколько ложек сахара</b>. Для этого у функции есть <b>параметры</b> — переменные в скобках.</p>
<div class="box rule"><b>Правило</b>В <code>def greet(name, times):</code> переменные <code>name</code> и <code>times</code> — <b>параметры</b>. При вызове <code>greet("Паша", 3)</code> значения <code>"Паша"</code> и <code>3</code> — <b>аргументы</b>. Они подставляются в параметры <b>по порядку</b>: первый в первый, второй во второй.</div>
${RUN(`def greet(name, times):
    for i in range(times):
        print("Привет,", name)

greet("Паша", 2)
greet("Артём", 1)`)}
<p>Поменяй местами аргументы: <code>greet(2, "Паша")</code>. Что скажет Python и почему?</p>
${RUN(`def rect(w, h):
    for i in range(h):
        print("#" * w)

rect(5, 3)`)}
<div class="box err"><b>Ошибка: не то количество аргументов</b>Если функция ждёт 2 аргумента, а ты дал 1 — <code>TypeError: … missing 1 required positional argument</code>. Сколько параметров — столько и аргументов.</div>`},
{title:'return: вернуть результат',lvl:2,html:`
<p class="hook">Калькулятор, который <b>показывает</b> ответ на экране, и калькулятор, который <b>кладёт ответ тебе в руку</b>, — разные вещи. С показанным числом дальше ничего не сделаешь, а то, что в руке, можно сложить, сравнить, передать дальше.</p>
<div class="box rule"><b>Правило</b><code>return значение</code> — функция <b>отдаёт</b> результат тому, кто её вызвал, и <b>сразу заканчивает работу</b>. Вызов функции можно использовать как число: <code>y = square(5)</code>, <code>print(square(3) + 1)</code>.</div>
${RUN(`def square(x):
    return x * x

a = square(5)
print(a)
print(square(3) + square(4))`)}
<p>Попробуй: <code>print(square(square(2)))</code>. Сначала считается внутренний вызов.</p>
<div class="box err"><b>Главная ошибка: print вместо return</b>Если функция только <b>печатает</b>, она ничего не возвращает — Python отдаёт специальное значение <code>None</code> («ничего»).</div>
${RUN(`def bad_square(x):
    print(x * x)

y = bad_square(4)
print("y =", y)`)}
<div class="box rule"><b>return останавливает функцию</b>Всё, что после выполненного <code>return</code>, не выполняется. Это удобно: нашёл ответ — сразу выходи.</div>
${RUN(`def sign(x):
    if x > 0:
        return "плюс"
    if x < 0:
        return "минус"
    return "ноль"

print(sign(5), sign(-2), sign(0))`)}`},
{title:'Локальные переменные',lvl:3,html:`
<div class="box rule"><b>Правило</b>Переменные, созданные <b>внутри</b> функции (и её параметры), — <b>локальные</b>: они живут только пока функция работает и не видны снаружи. «Что случилось в функции — остаётся в функции».</div>
${RUN(`x = 5

def f():
    x = 100
    print("внутри:", x)

f()
print("снаружи:", x)`)}
<p>Внутри функции своя <code>x</code> = 100, а снаружи — своя, 5. Это как две разные комнаты: в каждой своя коробка с наклейкой «x».</p>
${RUN(`def add_one(n):
    n = n + 1
    return n

a = 7
b = add_one(a)
print(a, b)`)}
<p><code>a</code> не изменилось: в функцию передалось <b>значение</b> 7, а n — это новая коробка внутри функции.</p>
<div class="box err"><b>Ошибка</b>Если создать переменную внутри функции, а напечатать снаружи — NameError: снаружи такого имени нет. Чтобы вынести результат — используй <code>return</code>.</div>
<div class="box tip"><b>Зачем это нужно</b>Можно писать функции, не боясь испортить чужие переменные. В больших программах (в игре — миллион строк) без этого всё бы сломалось.</div>`},
{title:'Свои полезные функции',lvl:4,html:`
<p>Хорошая функция — как инструмент: сделал один раз, пользуешься всегда. Вот три классических.</p>
<h3>Простое ли число?</h3>
${RUN(`def is_prime(n):
    if n < 2:
        return False
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False
        d += 1
    return True

for x in [1, 2, 9, 13, 97, 100]:
    print(x, is_prime(x))`)}
<div class="box rule"><b>Почему d * d &lt;= n</b>Если n = a · b, то один из множителей не больше корня из n. Поэтому делители достаточно искать до корня. Для n = 1 000 000 это 1000 проверок вместо миллиона!</div>
<h3>НОД — алгоритм Евклида</h3>
<p>Ты знаешь его из модуля про while. Теперь он станет кнопкой:</p>
${RUN(`def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

print(gcd(48, 18), gcd(17, 5))`)}
<div class="box rule"><b>Правило Евклида</b>НОД(a, b) = НОД(b, a % b), а НОД(a, 0) = a.</div>
<h3>Сумма цифр</h3>
${RUN(`def digit_sum(n):
    s = 0
    while n > 0:
        s += n % 10
        n //= 10
    return s

print(digit_sum(2026))`)}
<div class="fact">Простые числа защищают твои переписки: шифр RSA использует произведение двух огромных простых чисел (сотни цифр). Перемножить их легко, а разложить обратно на множители не может даже суперкомпьютер.</div>`},
{title:'Функции вызывают функции',lvl:5,html:`
<p>Из функции можно вызывать другие функции — так из маленьких кирпичиков строят большие программы.</p>
${RUN(`def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

def lcm(a, b):
    return a * b // gcd(a, b)

print(lcm(4, 6), lcm(12, 18))`)}
<p>НОК через НОД: <code>a · b / НОД(a, b)</code>. Функция <code>lcm</code> «нажимает кнопку» <code>gcd</code>.</p>
${RUN(`def is_prime(n):
    if n < 2:
        return False
    for d in range(2, n):
        if d * d > n:
            break
        if n % d == 0:
            return False
    return True

def count_primes(n):
    k = 0
    for x in range(2, n + 1):
        if is_prime(x):
            k += 1
    return k

print(count_primes(100))`)}
<p>Поменяй 100 на 1000. Простых чисел до тысячи — 168.</p>
<div class="box tip"><b>Как думает программист</b>Большую задачу «найди все простые-перевёртыши» он разбивает: «нужна кнопка — простое ли?», «нужна кнопка — перевернуть число». Пишет их отдельно, проверяет, а потом собирает.</div>`},
{title:'Функции и списки',lvl:6,html:`
<p>Функция может принимать список и возвращать список.</p>
${RUN(`def evens(a):
    return [x for x in a if x % 2 == 0]

def average(a):
    return sum(a) / len(a)

nums = [3, 8, 5, 10, 4]
print(evens(nums))
print(average(nums))`)}
<div class="box err"><b>Осторожно: список внутри функции — тот же самый</b>С числами функция работает с копией значения. А список передаётся «тот же самый поезд»: если функция сделает <code>append</code>, список изменится и снаружи.</div>
${RUN(`def add_zero(a):
    a.append(0)

b = [1, 2]
add_zero(b)
add_zero(b)
print(b)`)}`},
{title:'Рекурсия: функция вызывает саму себя',lvl:7,html:`
<p class="hook">Встань между двух зеркал — увидишь коридор из отражений. В каждом зеркале — зеркало поменьше. Это и есть <b>рекурсия</b>: что-то определяется через уменьшенную копию самого себя.</p>
<div class="box rule"><b>Правило</b>Рекурсивная функция вызывает саму себя для <b>меньшей</b> задачи. Обязательно нужна <b>база</b> — простой случай, где ответ известен без рекурсии. Иначе вызовы будут бесконечными.</div>
<h3>Факториал</h3>
<p>n! = 1 · 2 · … · n. Заметим: 5! = 5 · 4!. А 1! = 1 — это база.</p>
${RUN(`def fact(n):
    if n == 1:
        return 1
    return n * fact(n - 1)

print(fact(5))`)}
<div class="widget" id="w-stack"></div>
<h3>Числа Фибоначчи</h3>
<p>1, 1, 2, 3, 5, 8, 13… — каждое равно сумме двух предыдущих. Базы: fib(1) = fib(2) = 1.</p>
${RUN(`def fib(n):
    if n <= 2:
        return 1
    return fib(n - 1) + fib(n - 2)

for i in range(1, 11):
    print(i, fib(i))`)}
<p>Попробуй <code>fib(30)</code> — заметно медленно! Функция много раз пересчитывает одно и то же: fib(30) вызывает себя больше 1,6 миллиона раз.</p>
<div class="box err"><b>Без базы — RecursionError</b>Если убрать <code>if n == 1: return 1</code>, функция будет звать fact(0), fact(−1), … пока Python не остановит её: <code>RecursionError: maximum recursion depth exceeded</code> (по умолчанию примерно 1000 вложенных вызовов).</div>
<h3>Ханойские башни — идея</h3>
<p>Есть 3 стержня и n дисков разного размера на первом. Нужно перенести все на третий: за ход — один диск, больший нельзя класть на меньший. Рекурсивная идея: <b>перенеси n − 1 дисков на запасной стержень, большой диск — на цель, потом n − 1 дисков сверху на него</b>. Число ходов h(n) = 2 · h(n − 1) + 1 = 2ⁿ − 1.</p>
${RUN(`def hanoi(n, a, b, c):
    if n == 0:
        return
    hanoi(n - 1, a, c, b)
    print("диск", n, ":", a, "->", c)
    hanoi(n - 1, b, a, c)

hanoi(3, 1, 2, 3)`)}
<div class="fact">По легенде, монахи в храме переносят 64 золотых диска, и когда закончат — наступит конец света. Нужно 2⁶⁴ − 1 ≈ 1,8 · 10¹⁹ ходов. Даже по ходу в секунду это около 585 миллиардов лет — в 40 раз больше возраста Вселенной.</div>`},
{title:'Типичные ошибки с функциями',lvl:3,html:`
<div class="box err"><b>1. Нет скобок при вызове</b><code>hello</code> вместо <code>hello()</code> — ничего не происходит.</div>
<div class="box err"><b>2. print вместо return</b>Результат нельзя использовать, получаешь None.</div>
<div class="box err"><b>3. return внутри цикла слишком рано</b><code>for d in …: if n % d == 0: return False / else: return True</code> — функция закончится на первой же проверке.</div>
<div class="box err"><b>4. Переменная из функции снаружи</b>NameError — используй return.</div>
<div class="box err"><b>5. Рекурсия без базы</b>RecursionError.</div>`},
{title:'Шпаргалка',html:`
<ul class="steps">
<li><code>def имя(параметры):</code> + тело с отступом; вызов — <code>имя(аргументы)</code>.</li>
<li>Аргументы подставляются в параметры по порядку.</li>
<li><code>return</code> отдаёт результат и завершает функцию. Без return функция возвращает None.</li>
<li>Переменные внутри функции — локальные.</li>
<li>Функции можно вызывать из функций — строим программу из кирпичиков.</li>
<li>Рекурсия = база + вызов себя для меньшей задачи.</li></ul>`},
{title:'Что дальше',html:`
<p>Теперь у тебя есть всё: данные (списки), действия (циклы, условия) и свои команды (функции). Этого хватает, чтобы писать <b>алгоритмы</b> — умные способы решать задачи быстро.</p>
<p>В модуле <b>«9. Алгоритмы»</b> ты узнаешь, как угадать число от 1 до 1000 за 10 вопросов, как компьютер сортирует миллионы чисел, почему одна программа работает секунду, а другая — тысячу лет, и как Эратосфен 2000 лет назад придумал «сито» для простых чисел.</p>`}
];

/* ---------- symbols ---------- */
const symbols={tab:'Команды',title:'Функции: главное',rows:[
['def f():','Определить функцию','Создать свою команду. Тело — с отступом.','<code>def hello():</code>'],
['f()','Вызов','Выполнить функцию. Без скобок не работает!','<code>hello()</code>'],
['def f(a, b):','Параметры','Переменные, в которые попадут аргументы.','<code>def rect(w, h):</code>'],
['f(3, 5)','Аргументы','Значения при вызове, по порядку.','<code>rect(3, 5)</code>'],
['return x','Вернуть','Отдать результат и закончить функцию.','<code>return a * b</code>'],
['None','«Ничего»','Что возвращает функция без return.','<code>y = print(1)</code> → None'],
['локальная','Локальная переменная','Создана внутри функции, снаружи не видна.','x внутри ≠ x снаружи'],
['рекурсия','Вызов самой себя','Нужна база, иначе RecursionError.','<code>return n * fact(n - 1)</code>'],
['база','База рекурсии','Простой случай с готовым ответом.','<code>if n == 1: return 1</code>']],
after:'<div class="box tip"><b>Как запомнить</b>def — написать рецепт. Скобки () — нажать кнопку. return — отдать результат в руки.</div>'};

/* ---------- widget: call stack of fact(n) ---------- */
function onTheory(root){
  const w=root.querySelector('#w-stack');if(!w)return;
  w.innerHTML=`<div class="small"><b>Посмотри, как работает fact(n).</b> Каждый вызов — новая «карточка» в стопке. Нажимай «Шаг».</div>
  <label>n = <output id="ws-n">4</output><input type="range" id="ws-r" min="1" max="5" value="4"></label>
  <div id="ws-svg"></div><div id="ws-msg" class="small"></div>
  <div class="row"><button class="btn sbtn" id="ws-step">Шаг ▶</button><button class="btn ghost sbtn" id="ws-reset">Сначала</button></div>`;
  const r=w.querySelector('#ws-r'),on=w.querySelector('#ws-n'),sv=w.querySelector('#ws-svg'),msg=w.querySelector('#ws-msg');
  let steps=[],pos=0;
  function build(n){steps=[];const st=[];
    for(let k=n;k>=1;k--){st.push({k,res:null});steps.push({st:st.map(x=>({...x})),m:k===1?`fact(1) — это база: сразу ответ 1.`:`fact(${k}) не знает ответ и вызывает fact(${k-1}). Карточка fact(${k}) ждёт.`});}
    let val=1;st[st.length-1].res=1;steps.push({st:st.map(x=>({...x})),m:'fact(1) возвращает 1.'});
    for(let i=st.length-2;i>=0;i--){const k=st[i].k;st.pop();val=k*val;st[i].res=val;steps.push({st:st.map(x=>({...x})),m:`fact(${k}) = ${k} · fact(${k-1}) = ${k} · ${val/k} = ${val}. Карточка сверху убрана.`});}
    steps.push({st:[],m:`Готово: fact(${n}) = ${fact(n)}. Стопка пуста — все вызовы закончились.`});
  }
  function draw(){const s=steps[pos];const H0=Math.max(1,+r.value)*38+20;
    let g=`<svg viewBox="0 0 320 ${H0}" width="320" role="img" aria-label="Стек вызовов">`;
    s.st.forEach((c,i)=>{const y=H0-14-(i+1)*38;const top=i===s.st.length-1;
      g+=`<rect x="20" y="${y}" width="280" height="32" rx="7" fill="${top?'var(--hl)':'var(--card)'}" fill-opacity="${top?0.55:1}" stroke="var(--fig)" stroke-width="${top?2:1}"/>`;
      g+=`<text x="34" y="${y+21}" font-size="14" font-family="ui-monospace,monospace" fill="var(--ink)">fact(${c.k})</text>`;
      g+=`<text x="286" y="${y+21}" text-anchor="end" font-size="13" fill="${c.res!=null?'var(--accent-ink)':'var(--muted)'}">${c.res!=null?'вернула '+c.res:(c.k===1?'база':'ждёт '+c.k+' · fact('+(c.k-1)+')')}</text>`;});
    g+=`<line x1="10" y1="${H0-8}" x2="310" y2="${H0-8}" stroke="var(--fig)" stroke-width="2"/></svg>`;
    sv.innerHTML=g;msg.innerHTML=`Шаг ${pos+1} из ${steps.length}. ${s.m}`;
  }
  function reset(){on.textContent=r.value;build(+r.value);pos=0;draw();}
  r.oninput=reset;w.querySelector('#ws-reset').onclick=reset;
  w.querySelector('#ws-step').onclick=()=>{if(pos<steps.length-1)pos++;draw();};
  reset();
}

/* ---------- generators ---------- */
const gens=[];
const G=(lvl,make,o)=>gens.push(Object.assign({lvl,make},o||{}));
const RULE={rule:true},STAR={star:true};

/* L0 */
G(0,()=>{const c=choiceOf('def',['function','func','new']);
return {type:'choice',q:'Каким словом в Python начинается создание своей функции?',...c,
short:'def — от define, «определить».',
explain:'Функцию создают словом <code>def</code> (сокращение от английского define — «определить»): <code>def hello():</code>. Слова function и func бывают в других языках (JavaScript, Go), но не в Python.',
explain2:'Запомни строку-шаблон: <code>def имя():</code> — def, имя, скобки, двоеточие. Ниже — тело с отступом.'};},RULE);
G(0,()=>{const c=choiceOf('Только когда функцию вызывают: имя()',['Сразу, когда Python дошёл до строки def','Один раз в конце программы','Никогда — def только для красоты']);
return {type:'choice',q:'Когда выполняется код, написанный внутри функции (её тело)?',...c,
short:'def — рецепт, вызов — готовка.',
explain:'Когда Python встречает <code>def</code>, он только <b>запоминает</b> рецепт. Тело выполняется каждый раз, когда функцию <b>вызывают</b> — пишут её имя со скобками. Нет вызова — ничего не выполнится; три вызова — выполнится три раза.',
explain2:'Ты записал в телефон номер пиццерии (def). Пицца приедет, только когда позвонишь (вызов). Позвонил два раза — две пиццы.'};},RULE);
G(0,()=>{const k=R(1,3),m=R(2,4);const code=`def hello():\n    print("Привет!")\n\n`+Array(k).fill('hello()').join('\n')+`\nfor i in range(${m}):\n    hello()`;
return {type:'num',q:`Сколько раз программа напечатает «Привет!»?${C(code)}`,ans:k+m,
short:`${k} отдельных ${plural(k,'вызов','вызова','вызовов')} + ${m} в цикле = ${k+m}.`,
explain:`Каждый вызов <code>hello()</code> печатает «Привет!» один раз. Отдельных вызовов ${k}, в цикле — ещё ${m} (range(${m}) повторяет ${m} раз). Всего <b>${k+m}</b>. Строка def сама ничего не печатает.`,
explain2:`Считай нажатия кнопки: ${Array(k).fill('нажал').join(', ')}, потом цикл нажал ещё ${m} раз. ${k} + ${m} = ${k+m}.`};});
G(0,()=>{const L=['A','B','C','D'];const right='A C B D';
const c=choiceOf(right,['A B C D','A C D B','A B D']);
return {type:'choice',q:`В каком порядке напечатаются буквы?${C(`print("A")\n\ndef f():\n    print("B")\n\nprint("C")\nf()\nprint("D")`)}`,...c,
short:'B печатается, когда вызвали f() — после C.',
explain:'Python идёт сверху вниз. Печатает A. Встречает def — только запоминает функцию, B <b>не</b> печатает. Печатает C. Строка <code>f()</code> — вызов: теперь печатается B. Затем D. Итог: <b>A C B D</b>.',
explain2:'Def — как будильник, который ты завёл, но он звонит только по команде. Команда f() стоит после print("C"), значит B будет после C.'};});
G(0,()=>{const c=choiceOf('Ничего — функцию не вызвали: нужно hello() со скобками',['Привет!','Ошибку SyntaxError','Привет! два раза']);
return {type:'choice',q:`Что напечатает программа?${C(`def hello():\n    print("Привет!")\n\nhello`)}`,...c,
short:'Без скобок функция не вызывается.',
explain:'<code>hello</code> без скобок — это просто имя функции, как будто ты показал пальцем на кнопку, но не нажал. Python не ругается, но ничего и не делает. Чтобы вызвать, нужно <code>hello()</code>.',
explain2:'Скобки () — это «нажать». Имя без скобок — «посмотреть на кнопку».'};});
G(0,()=>{const tests=[1,2,3,4].map(k=>T(String(k),lines(Array(k).fill('Привет!\nЯ — функция'))));
return {type:'code',q:'Напиши функцию <code>hello()</code>, которая печатает две строки: <code>Привет!</code> и <code>Я — функция</code>. Программа читает число <b>k</b> и вызывает функцию k раз.',
starter:`def hello():\n    # напечатай две строки\n    pass\n\nk = int(input())\n`,tests,
solution:`def hello():\n    print("Привет!")\n    print("Я — функция")\n\nk = int(input())\nfor i in range(k):\n    hello()`,
hint:'В теле функции два print. Потом: for i in range(k): hello()',
explain:'1) В теле функции (с отступом) два <code>print</code>. Слово <code>pass</code> из заготовки можно удалить — оно значит «пока ничего не делать». 2) Читаем k. 3) Цикл <code>for i in range(k): hello()</code> нажимает кнопку k раз. Текст должен совпадать в точности, включая длинное тире «—».',
explain2:'Если k = 2, вывод: Привет!, Я — функция, Привет!, Я — функция — по две строки за каждый вызов.'};});

/* L1 */
G(1,()=>{const v=R(2,9);const c=choiceOf(`x — параметр, ${v} — аргумент`,[`x — аргумент, ${v} — параметр`,`x и ${v} — оба параметры`,`x — результат функции`]);
return {type:'choice',q:`Дано: <code>def f(x): …</code> и вызов <code>f(${v})</code>. Как называются x и ${v}?`,...c,
short:'В def — параметры, при вызове — аргументы.',
explain:`<b>Параметр</b> — переменная в скобках в строке def (x). <b>Аргумент</b> — конкретное значение, которое передают при вызове (${v}). При вызове f(${v}) Python делает x = ${v} и выполняет тело.`,
explain2:'Параметр — пустая ячейка в бланке «Имя: ____». Аргумент — то, что ты в неё вписал.'};},RULE);
G(1,()=>{const c=choiceOf('Ошибка TypeError: не хватает аргумента b',['Python подставит b = 0','Python подставит b = a','Функция выполнится, но ничего не вернёт']);
return {type:'choice',q:`Что произойдёт?${C(`def plus(a, b):\n    print(a + b)\n\nplus(5)`)}`,...c,
short:'Сколько параметров — столько и аргументов.',
explain:'Функция ждёт <b>два</b> аргумента (a и b), а получила один. Python не придумывает недостающие значения и сообщает: <code>TypeError: plus() missing 1 required positional argument: \'b\'</code>.',
explain2:'Попросили «сложи 5 и …» — и замолчали. Python не знает, с чем складывать, поэтому останавливается с ошибкой.'};},RULE);
G(1,()=>{let x,y,z;do{x=R(1,9);y=R(1,5);z=R(1,5);}while(z-y*x===x-y*z);
return {type:'num',q:`Что напечатает программа?${C(`def f(a, b, c):\n    print(a - b * c)\n\nf(${z}, ${y}, ${x})`)}`,ans:z-y*x,
short:`a = ${z}, b = ${y}, c = ${x}: ${z} − ${y}·${x} = ${z-y*x}.`,
explain:`Аргументы подставляются по порядку: a = ${z}, b = ${y}, c = ${x}. Считаем: a − b · c = ${z} − ${y} · ${x} = ${z} − ${y*x} = <b>${z-y*x}</b>. Умножение раньше вычитания, как в математике.`,
explain2:`Не важно, как называются переменные снаружи — важна позиция. Первое число идёт в первый параметр, второе — во второй, третье — в третий.`};});
G(1,()=>{const tests=[[3,2],[1,1],[5,4],[2,3],[7,1]].map(([w,h])=>T(`${w}\n${h}`,lines(Array(h).fill('#'.repeat(w)))));
return {type:'code',q:'Напиши функцию <code>rect(w, h)</code>, которая рисует прямоугольник из символов <code>#</code>: h строк по w символов. Программа читает w и h (каждое на своей строке) и вызывает <code>rect(w, h)</code>.',
starter:`def rect(w, h):\n    pass\n\nw = int(input())\nh = int(input())\n`,tests,
solution:`def rect(w, h):\n    for i in range(h):\n        print("#" * w)\n\nw = int(input())\nh = int(input())\nrect(w, h)`,
hint:'"#" * w — строка из w решёток. Повтори её h раз.',
explain:'Строку можно умножить на число: <code>"#" * 4</code> = <code>####</code>. Внутри функции цикл <code>for i in range(h): print("#" * w)</code>. Не забудь в конце <b>вызвать</b> функцию: <code>rect(w, h)</code>.',
explain2:'Пример w = 3, h = 2:<br><code>###<br>###</code><br>Ширина — сколько символов в строке, высота — сколько строк.'};});

/* L2 */
G(2,()=>{const c=choiceOf('return отдаёт значение туда, откуда функцию вызвали; print только показывает его на экране',['Это одно и то же','print отдаёт значение, а return показывает на экране','return печатает значение два раза']);
return {type:'choice',q:'Чем <code>return</code> отличается от <code>print</code>?',...c,
short:'return — в руки, print — на экран.',
explain:'<code>print(x)</code> выводит x на экран — человек видит, а программа дальше использовать не может. <code>return x</code> отдаёт x программе: его можно сохранить в переменную, сложить, передать в другую функцию. Кроме того, return сразу завершает функцию.',
explain2:'Калькулятор, который показывает ответ на табло (print), и друг, который кладёт ответ тебе в руку (return). С тем, что в руке, можно работать дальше.'};},RULE);
G(2,()=>{const c=choiceOf('None',['0','Пустую строку','Ошибку']);
return {type:'choice',q:'Что возвращает функция, в которой нет <code>return</code>?',...c,
short:'Без return функция возвращает None.',
explain:'Если функция закончилась, не встретив <code>return</code>, Python возвращает специальное значение <code>None</code> — «ничего». Его нельзя складывать с числами: <code>None + 1</code> → TypeError.',
explain2:'Ты отправил друга в магазин, но не попросил ничего купить. Он вернулся с пустыми руками — это None.'};},RULE);
G(2,()=>{const a=R(2,3),k=R(1,3);const f=x=>x*x-k;
return {type:'num',q:`Что напечатает программа?${C(`def f(x):\n    return x * x - ${k}\n\nprint(f(f(${a})))`)}`,ans:f(f(a)),
short:`f(${a}) = ${f(a)}, f(${f(a)}) = ${f(f(a))}.`,
explain:`Сначала внутренний вызов: f(${a}) = ${a}·${a} − ${k} = ${f(a)}. Его результат становится аргументом внешнего: f(${f(a)}) = ${f(a)}·${f(a)} − ${k} = <b>${f(f(a))}</b>.`,
explain2:`Как матрёшка: открываем изнутри. Вызов f(${a}) «превращается» в число ${f(a)}, и остаётся print(f(${f(a)})).`};});
G(2,()=>{const v=R(2,9);const right=`${2*v}<br>None`;
const c=choiceOf(right,[`${2*v}<br>${2*v}`,`${2*v}`,`None<br>${2*v}`]);
return {type:'choice',q:`Что напечатает программа?${C(`def f(x):\n    print(x * 2)\n\ny = f(${v})\nprint(y)`)}`,...c,
short:'Функция печатает, но не возвращает — y = None.',
explain:`При вызове f(${v}) функция <b>печатает</b> ${2*v}. Но return в ней нет, поэтому она возвращает None, и y = None. Вторая строка вывода — <b>None</b>. Чтобы y стал ${2*v}, нужно <code>return x * 2</code>.`,
explain2:`Два разных действия: показать (print) и отдать (return). Функция показала ${2*v}, но в руки ничего не дала — y пустой.`};});
G(2,()=>{const m=R(2,40);let ans=-1;for(let i=0;i<m;i++){if(i*i>m){ans=i;break;}}
return {type:'num',q:`Что напечатает программа?${C(`def f(n):\n    for i in range(n):\n        if i * i > n:\n            return i\n    return -1\n\nprint(f(${m}))`)}`,ans,
short:ans===-1?`Ни одно i из range(${m}) не дало i·i > ${m} → −1.`:`Первое i с i·i > ${m}: ${ans}·${ans} = ${ans*ans}.`,
explain:ans===-1?`i пробегает ${range(0,m-1).join(', ')}. Квадраты: ${range(0,m-1).map(i=>i*i).join(', ')} — ни один не больше ${m}. Цикл закончился, срабатывает <code>return -1</code>. Ответ <b>−1</b>.`:`Ищем первое i, у которого i·i &gt; ${m}: ${range(Math.max(0,ans-2),ans).map(i=>`${i}·${i} = ${i*i}`).join(', ')}. На i = ${ans} условие выполнилось, и <code>return ${ans}</code> <b>сразу</b> завершил функцию — дальше цикл не идёт, и до return -1 дело не дошло. Ответ <b>${ans}</b>.`,
explain2:`return — это «выход из функции немедленно». Как только нашли подходящее i, функция отдаёт его и заканчивается. return -1 срабатывает, только если цикл прошёл до конца и ничего не нашёл.`};});
G(2,()=>{const tests=[];const add=a=>tests.push(T(a.join(' '),Math.max(...a)));add([3,9,4]);add([7,7,7]);add([-5,-2,-9]);add([10,2,10]);add([0,-1,1]);add(lst(3,-100,100));
return {type:'code',q:'Напиши функцию <code>max3(a, b, c)</code>, которая <b>возвращает</b> (return) наибольшее из трёх чисел, <b>не используя</b> встроенную max. Программа читает три числа в одной строке и печатает <code>max3(…)</code>.',
starter:`def max3(a, b, c):\n    pass\n\na, b, c = map(int, input().split())\n`,tests,
solution:`def max3(a, b, c):\n    m = a\n    if b > m:\n        m = b\n    if c > m:\n        m = c\n    return m\n\na, b, c = map(int, input().split())\nprint(max3(a, b, c))`,
hint:'«Царь горы»: m = a, потом сравни с b и c. В конце return m.',
explain:'Внутри — знакомый «царь горы»: <code>m = a</code>; если b больше — m = b; если c больше — m = c; <code>return m</code>. Снаружи печатаем результат: <code>print(max3(a, b, c))</code>. Запись <code>a, b, c = map(int, input().split())</code> раскладывает три числа сразу по трём переменным.',
explain2:'Можно и через return в условиях: <code>if a &gt;= b and a &gt;= c: return a</code>, <code>if b &gt;= c: return b</code>, <code>return c</code>. Проверь на равных числах (7 7 7) и отрицательных.'};});

/* L3 */
G(3,()=>{const c=choiceOf('Переменная, созданная внутри функции; снаружи её не видно',['Переменная, которую видно во всей программе','Переменная, которую нельзя изменять','Переменная, которая создаётся словом local']);
return {type:'choice',q:'Что такое <b>локальная</b> переменная?',...c,
short:'Локальная — живёт только внутри функции.',
explain:'Локальная переменная создаётся внутри функции (в том числе параметры) и существует, только пока функция работает. Снаружи её не видно — попытка напечатать даст NameError. Даже если снаружи есть переменная с таким же именем — это <b>другая</b> переменная.',
explain2:'Как черновик на контрольной: внутри можно писать что угодно, но учитель увидит только ответ (return).'};},RULE);
G(3,()=>{const a=R(1,9),b=R(10,99);const right=`${b}<br>${a}`;
const c=choiceOf(right,[`${b}<br>${b}`,`${a}<br>${a}`,`${a}<br>${b}`]);
return {type:'choice',q:`Что напечатает программа?${C(`x = ${a}\n\ndef f():\n    x = ${b}\n    print(x)\n\nf()\nprint(x)`)}`,...c,
short:`Внутри своя x = ${b}, снаружи осталась ${a}.`,
explain:`Внутри функции <code>x = ${b}</code> создаёт <b>новую локальную</b> переменную x — она печатается первой: ${b}. Внешняя x не меняется и остаётся ${a}. Вывод: ${b}, затем <b>${a}</b>.`,
explain2:`Две комнаты, в каждой коробка «x». В комнате-функции в коробку положили ${b}. В большой комнате коробка «x» по-прежнему с ${a}.`};});
G(3,()=>{const a=R(2,20),d=R(1,5);const right=`${a} ${a+d}`;
const c=choiceOf(right,[`${a+d} ${a+d}`,`${a} ${a}`,`${a+d} ${a}`]);
return {type:'choice',q:`Что напечатает программа?${C(`def grow(n):\n    n = n + ${d}\n    return n\n\na = ${a}\nb = grow(a)\nprint(a, b)`)}`,...c,
short:`a не изменилось (${a}), b = ${a+d}.`,
explain:`В функцию передаётся <b>значение</b> ${a}. Параметр n — своя локальная коробка: в неё кладут ${a}, потом ${a+d}, и это значение возвращается в b. Переменная a снаружи не трогается. Вывод: <b>${a} ${a+d}</b>.`,
explain2:`Ты дал другу ксерокопию своей тетради. Он что-то дописал в копии — твоя тетрадь осталась прежней. Новую версию он вернул тебе (b).`};});
G(3,()=>{const c=choiceOf('NameError: снаружи переменной s нет — она локальная. Нужно return s и s = count()',['Напечатает 15','Напечатает 0','SyntaxError: забыли двоеточие']);
return {type:'choice',q:`Что не так с программой?${C(`def count():\n    s = 0\n    for i in range(6):\n        s += i\n\ncount()\nprint(s)`)}`,...c,
short:'s — локальная, снаружи её нет.',
explain:'Переменная s создана внутри функции — она локальная и исчезает, когда функция закончилась. Строка <code>print(s)</code> снаружи вызовет <code>NameError: name \'s\' is not defined</code>. Решение: в функции написать <code>return s</code>, а снаружи — <code>s = count()</code> или <code>print(count())</code>.',
explain2:'Результат из функции «выносится» только через return. Всё остальное остаётся внутри.'};});

/* L4 */
G(4,()=>{const c=choiceOf('Если у n есть делитель, то есть делитель не больше корня из n',['Потому что все делители меньше корня','Чтобы программа была короче','Потому что простые числа меньше своего корня']);
return {type:'choice',q:'В функции <code>is_prime(n)</code> делители перебирают, пока <code>d * d &lt;= n</code>. Почему этого достаточно?',...c,
short:'n = a · b ⇒ меньший множитель ≤ √n.',
explain:'Если n составное, n = a · b. Оба множителя не могут быть больше √n — иначе их произведение было бы больше n. Значит, хотя бы один делитель ≤ √n, и мы его найдём. Если до √n делителей нет — n простое. Условие <code>d * d &lt;= n</code> — это «d ≤ √n» без корней.',
explain2:'Пример: 36 = 2·18 = 3·12 = 4·9 = 6·6. В каждой паре меньший множитель ≤ 6 = √36. Проверять дальше 6 бессмысленно — увидим те же пары наоборот.'};},RULE);
G(4,()=>{const c=choiceOf('НОД(a, b) = НОД(b, a % b), и НОД(a, 0) = a',['НОД(a, b) = НОД(a + b, b)','НОД(a, b) = a · b / 2','НОД(a, b) = НОД(a % b, a // b)']);
return {type:'choice',q:'На каком правиле построена функция <code>gcd</code> (алгоритм Евклида)?',...c,
short:'Евклид: заменяем пару (a, b) на (b, a % b).',
explain:'Общий делитель a и b делит и остаток a % b (ведь a % b = a − b · q). Поэтому НОД(a, b) = НОД(b, a % b). Числа быстро уменьшаются, и когда второе становится 0, первое и есть НОД.',
explain2:'Пример: НОД(48, 18) → (18, 12) → (12, 6) → (6, 0) → 6.'};},RULE);
G(4,()=>{const n=R(1000,99999);
return {type:'num',q:`Что напечатает программа?${C(`def digit_sum(n):\n    s = 0\n    while n > 0:\n        s += n % 10\n        n //= 10\n    return s\n\nprint(digit_sum(${n}))`)}`,ans:dsum(n),
short:`${String(n).split('').join(' + ')} = ${dsum(n)}.`,
explain:`n % 10 — последняя цифра, n //= 10 — отбросить её. Функция складывает все цифры: ${String(n).split('').reverse().join(' + ')} = <b>${dsum(n)}</b>.`,
explain2:`Порядок не важен: сумма цифр ${n} = ${String(n).split('').join(' + ')} = ${dsum(n)}.`};});
G(4,()=>{let a,b;do{const g=R(2,12);a=g*R(2,9);b=g*R(2,9);}while(a===b);
const steps=[];let x=a,y=b;while(y){steps.push(`(${x}, ${y})`);[x,y]=[y,x%y];}steps.push(`(${x}, 0)`);
return {type:'num',q:`Что напечатает программа?${C(`def gcd(a, b):\n    while b != 0:\n        a, b = b, a % b\n    return a\n\nprint(gcd(${a}, ${b}))`)}`,ans:gcd(a,b),
short:`НОД(${a}, ${b}) = ${gcd(a,b)}.`,
explain:`Алгоритм Евклида, пары по шагам: ${steps.join(' → ')}. Когда b стало 0, возвращаем a = <b>${gcd(a,b)}</b>.`,
explain2:`Проверка: ${a} = ${gcd(a,b)}·${a/gcd(a,b)}, ${b} = ${gcd(a,b)}·${b/gcd(a,b)}; числа ${a/gcd(a,b)} и ${b/gcd(a,b)} не имеют общих делителей, значит НОД = ${gcd(a,b)}.`};});
G(4,()=>{const tests=[];const add=a=>tests.push(T(a.join(' '),lines(a.map(x=>isPrime(x)?'YES':'NO'))));
add([2,9,13]);add([1]);add([0,1,2,3,4]);add([97,100,7919]);add([25,49,121]);add(lst(6,2,500));
return {type:'code',q:'Напиши функцию <code>is_prime(n)</code>, которая возвращает <code>True</code>, если n простое, и <code>False</code> иначе. В строке вводятся числа (≥ 0); для каждого выведи <code>YES</code> или <code>NO</code> на отдельной строке.',
starter:`def is_prime(n):\n    pass\n\na = list(map(int, input().split()))\n`,tests,
solution:`def is_prime(n):\n    if n < 2:\n        return False\n    d = 2\n    while d * d <= n:\n        if n % d == 0:\n            return False\n        d += 1\n    return True\n\na = list(map(int, input().split()))\nfor x in a:\n    if is_prime(x):\n        print("YES")\n    else:\n        print("NO")`,
hint:'0 и 1 — не простые. Перебирай d, пока d * d <= n. Нашёл делитель — return False. Цикл закончился — return True.',
explain:'1) Числа меньше 2 — не простые: <code>return False</code>. 2) Перебираем d = 2, 3, … пока <code>d * d &lt;= n</code>; если <code>n % d == 0</code> — нашли делитель, <code>return False</code>. 3) Если цикл закончился — делителей нет, <code>return True</code>. Важно: return True — <b>после</b> цикла, а не в else внутри.',
explain2:'Проверь на краях: 2 — простое (цикл не выполнится ни разу, 2·2 &gt; 2), 4 — нет, 25 — нет (делитель 5 = √25, поэтому знак &lt;=, а не &lt;), 1 — нет.'};});
G(4,()=>{const tests=[];const add=(a,b)=>tests.push(T(`${a} ${b}`,a*b/gcd(a,b)));add(4,6);add(12,18);add(7,13);add(5,5);add(1,9);add(R(10,60),R(10,60));
return {type:'code',q:'Напиши функции <code>gcd(a, b)</code> (НОД) и <code>lcm(a, b)</code> (НОК), причём lcm должна использовать gcd. Программа читает два натуральных числа в одной строке и печатает их НОК.',
starter:`def gcd(a, b):\n    pass\n\ndef lcm(a, b):\n    pass\n\na, b = map(int, input().split())\n`,tests,
solution:`def gcd(a, b):\n    while b != 0:\n        a, b = b, a % b\n    return a\n\ndef lcm(a, b):\n    return a * b // gcd(a, b)\n\na, b = map(int, input().split())\nprint(lcm(a, b))`,
hint:'НОК(a, b) = a · b // НОД(a, b). Используй //, чтобы ответ был целым.',
explain:'НОД — алгоритм Евклида. НОК находим по формуле <code>a * b // gcd(a, b)</code>. Деление именно <code>//</code>: обычное / дало бы дробное число вида 12.0, и тест не прошёл бы.',
explain2:'Пример: 4 и 6. НОД = 2. НОК = 4 · 6 / 2 = 12. Проверка: 12 делится и на 4, и на 6, а меньшего такого числа нет.'};});

/* L5 */
G(5,()=>{const c=choiceOf('Да, если к моменту вызова та функция уже определена (её def уже выполнился)',['Нет, функции не могут вызывать друг друга','Да, но только print и len','Только если функции называются одинаково']);
return {type:'choice',q:'Можно ли внутри одной своей функции вызвать другую свою функцию?',...c,
short:'Можно — так строят программы из кирпичиков.',
explain:'Да! Например, <code>lcm</code> вызывает <code>gcd</code>, <code>count_primes</code> вызывает <code>is_prime</code>. Нужно только, чтобы к моменту <b>вызова</b> Python уже прочитал def нужной функции. Обычно все def пишут в начале программы, а основной код — внизу.',
explain2:'Как в игре: заклинание «огненный шар» внутри использует заклинание «зажечь огонь». Маленькие кнопки собираются в большие.'};},RULE);
G(5,()=>{const p=R(1,5),q=R(2,3),n=R(1,6);const a=x=>x+p,b=x=>a(x)*q;
return {type:'num',q:`Что напечатает программа?${C(`def a(x):\n    return x + ${p}\n\ndef b(x):\n    return a(x) * ${q}\n\nprint(b(a(${n})))`)}`,ans:b(a(n)),
short:`a(${n}) = ${a(n)}, b(${a(n)}) = a(${a(n)})·${q} = ${b(a(n))}.`,
explain:`Изнутри наружу: a(${n}) = ${n} + ${p} = ${a(n)}. Затем b(${a(n)}): внутри вызывается a(${a(n)}) = ${a(a(n))}, умножаем на ${q}: ${a(a(n))} · ${q} = <b>${b(a(n))}</b>.`,
explain2:`Распиши формулой: b(x) = (x + ${p}) · ${q}, a(x) = x + ${p}. b(a(${n})) = (${n} + ${p} + ${p}) · ${q} = ${b(a(n))}.`};});
G(5,()=>{const n=R(10,60);let k=0;const ps=[];for(let x=2;x<=n;x++)if(isPrime(x)){k++;ps.push(x);}
return {type:'num',q:`Функция <code>is_prime</code> написана правильно. Что напечатает программа?${C(`def count_primes(n):\n    k = 0\n    for x in range(2, n + 1):\n        if is_prime(x):\n            k += 1\n    return k\n\nprint(count_primes(${n}))`)}`,ans:k,
short:`Простые до ${n}: ${ps.join(', ')} — ${k}.`,
explain:`count_primes считает простые числа от 2 до ${n} включительно (range(2, ${n+1})). Это ${ps.join(', ')} — всего <b>${k}</b>.`,
explain2:`Выписывай подряд и вычёркивай составные (кратные 2, 3, 5, 7): останутся ${ps.join(', ')}. Посчитай их: ${k}.`};});
G(5,()=>{const tests=[];const sol=n=>{const r=[];for(let p=2;p<=n;p++)if(isPrime(p)&&isPrime(rev(p)))r.push(p);return r.join(' ');};
[2,10,13,40,100,R(110,200)].forEach(n=>tests.push(T(String(n),sol(n))));
return {type:'code',q:'Число назовём <b>суперпростым</b>, если оно простое и число, записанное теми же цифрами задом наперёд, тоже простое (например, 13 и 31; 11 и 11). Дано n ≥ 2. Выведи через пробел все суперпростые числа от 2 до n. Используй две функции: <code>is_prime(n)</code> и <code>rev(n)</code>.',
starter:`def is_prime(n):\n    pass\n\ndef rev(n):\n    pass\n\nn = int(input())\n`,tests,
solution:`def is_prime(n):\n    if n < 2:\n        return False\n    d = 2\n    while d * d <= n:\n        if n % d == 0:\n            return False\n        d += 1\n    return True\n\ndef rev(n):\n    return int(str(n)[::-1])\n\nn = int(input())\nres = []\nfor p in range(2, n + 1):\n    if is_prime(p) and is_prime(rev(p)):\n        res.append(p)\nprint(*res)`,
hint:'rev(n): int(str(n)[::-1]). Собери подходящие в список и выведи print(*res).',
explain:'Разбиваем задачу на кнопки. <code>is_prime</code> — как раньше. <code>rev(n)</code> — переворот через строку: <code>int(str(n)[::-1])</code> (срез [::-1] ты знаешь со строк). Главный цикл: для каждого p от 2 до n, если <code>is_prime(p) and is_prime(rev(p))</code> — добавляем в список. Печатаем <code>print(*res)</code>.',
explain2:'Пример: 23 простое, rev = 32 — не простое, не берём. 37 простое, rev = 73 — простое, берём. Однозначные простые 2, 3, 5, 7 при перевороте не меняются — берём.'};});

/* L6 */
G(6,()=>{const c=choiceOf('Да: return может вернуть любое значение, в том числе список',['Нет, только одно число','Нет, только строку','Да, но список при этом сортируется']);
return {type:'choice',q:'Может ли функция вернуть список?',...c,
short:'return [ … ] — пожалуйста.',
explain:'return отдаёт <b>любое</b> значение: число, строку, True/False, список. Например, <code>def evens(a): return [x for x in a if x % 2 == 0]</code> возвращает список чётных. Ничего само по себе не сортируется.',
explain2:'Функция — как курьер: может принести одну посылку или целую коробку посылок (список).'};},RULE);
G(6,()=>{const a=lst(R(1,3),1,9);const k=R(2,3);
return {type:'num',q:`Что напечатает программа?${C(`def add_zero(lst):\n    lst.append(0)\n\nb = ${pyl(a)}\n`+Array(k).fill('add_zero(b)').join('\n')+`\nprint(len(b))`)}`,ans:a.length+k,
short:'Список в функцию передаётся «тот же самый» — append меняет b.',
explain:`В отличие от числа, список передаётся в функцию не копией, а «тем же поездом». <code>lst.append(0)</code> прицепляет вагон к самому b. Вызовов ${k} → длина ${a.length} + ${k} = <b>${a.length+k}</b>.`,
explain2:`Число в функции — ксерокопия, а список — сама тетрадь. Функция дописала в тетрадь ${k} ${plural(k,'раз','раза','раз')}.`};});
G(6,()=>{const tests=[];const add=a=>{const m=Math.min(...a);tests.push(T(a.join(' '),a.map(x=>x-m).join(' ')));};
add([5,3,8]);add([7]);add([-2,4,-2]);add([10,10,10]);add(lst(8,-20,20));add(lst(6,100,200));
return {type:'code',q:'Напиши функцию <code>shift(a)</code>, которая возвращает <b>новый список</b>: из каждого элемента вычтен минимум списка (так самый маленький становится 0). Программа читает числа в строке и печатает результат через пробел.',
starter:`def shift(a):\n    pass\n\na = list(map(int, input().split()))\n`,tests,
solution:`def shift(a):\n    m = min(a)\n    return [x - m for x in a]\n\na = list(map(int, input().split()))\nprint(*shift(a))`,
hint:'m = min(a), а потом return [x - m for x in a].',
explain:'Сначала минимум <b>один раз</b>: <code>m = min(a)</code>. Потом генератор: <code>return [x - m for x in a]</code>. Печать: <code>print(*shift(a))</code>. Если считать min внутри генератора, ответ тоже верный, но это лишняя работа на каждом шаге.',
explain2:'Пример: 5 3 8 → минимум 3 → 2 0 5. С отрицательными: −2 4 −2 → минимум −2 → 0 6 0 (вычесть −2 = прибавить 2).'};});

/* L7 — рекурсия */
G(7,()=>{const c=choiceOf('Простой случай, в котором функция возвращает ответ без вызова самой себя',['Первая строка программы','Самый большой вызов функции','Переменная, в которой хранится результат']);
return {type:'choice',q:'Что такое <b>база</b> рекурсии?',...c,
short:'База — где рекурсия останавливается.',
explain:'База — это условие, при котором ответ известен сразу, без нового вызова. Например, в факториале <code>if n == 1: return 1</code>. Каждый рекурсивный вызов должен приближать к базе (n − 1, n // 2…), иначе вызовы будут бесконечными.',
explain2:'Спуск по лестнице: «чтобы спуститься с 10-й ступеньки — спустись с 9-й и сделай шаг». База — «на 1-й ступеньке просто шагни на пол».'};},RULE);
G(7,()=>{const c=choiceOf('Функция будет вызывать себя бесконечно, и Python остановит её с RecursionError',['Функция вернёт 0','Функция вернёт None','Программа зависнет навсегда без ошибки']);
return {type:'choice',q:`Что будет, если у рекурсивной функции нет базы?${C(`def f(n):\n    return n * f(n - 1)\n\nprint(f(5))`)}`,...c,
short:'Без базы — RecursionError.',
explain:'f(5) зовёт f(4), f(3), …, f(0), f(−1), … и никогда не останавливается. Каждый незаконченный вызов занимает место в памяти («стопка карточек»). Python ограничивает глубину примерно 1000 вызовов и выдаёт <code>RecursionError: maximum recursion depth exceeded</code>.',
explain2:'Два зеркала напротив друг друга — отражения бесконечны. Но у Python «зеркало» ограничено: на тысячном отражении он говорит «хватит».'};},RULE);
G(7,()=>{const n=R(3,7);
return {type:'num',q:`Что напечатает программа?${C(`def fact(n):\n    if n == 1:\n        return 1\n    return n * fact(n - 1)\n\nprint(fact(${n}))`)}`,ans:fact(n),
short:`${n}! = ${range(1,n).join(' · ')} = ${fact(n)}.`,
explain:`fact(${n}) = ${n} · fact(${n-1}) = … — раскрываем до базы fact(1) = 1:<br>${range(1,n).reverse().join(' · ')} = <b>${fact(n)}</b>.`,
explain2:`Снизу вверх: fact(1) = 1, ${range(2,n).map(k=>`fact(${k}) = ${k}·${fact(k-1)} = ${fact(k)}`).join(', ')}.`};});
G(7,()=>{const n=R(5,10);
return {type:'num',q:`Что напечатает программа?${C(`def fib(n):\n    if n <= 2:\n        return 1\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(${n}))`)}`,ans:fib(n),
short:`Ряд: ${range(1,n).map(fib).join(', ')}.`,
explain:`fib(1) = fib(2) = 1 — база. Каждое следующее — сумма двух предыдущих: ${range(1,n).map(fib).join(', ')}. fib(${n}) = <b>${fib(n)}</b>.`,
explain2:`fib(${n}) = fib(${n-1}) + fib(${n-2}) = ${fib(n-1)} + ${fib(n-2)} = ${fib(n)}. Проще выписать ряд с начала, чем раскрывать рекурсию сверху.`};});
G(7,()=>{const n=R(3,4);const after=Math.random()<0.5;const seq=after?range(1,n):range(1,n).reverse();
const code=after?`def f(n):\n    if n == 0:\n        return\n    f(n - 1)\n    print(n)\n\nf(${n})`:`def f(n):\n    if n == 0:\n        return\n    print(n)\n    f(n - 1)\n\nf(${n})`;
const c=choiceOf(seq.join(' '),[seq.slice().reverse().join(' '),seq.slice(1).join(' '),range(0,n).join(' ')]);
return {type:'choice',q:`Что напечатает программа (числа по строкам, здесь — через пробел)?${C(code)}`,...c,
short:after?'Печать после вызова — числа выводятся на обратном пути: 1, 2, …':'Печать до вызова — сначала большое число.',
explain:after?`f(${n}) сначала вызывает f(${n-1}), та — f(${n-2})… до f(0), которая ничего не делает. Печатать начинают на <b>обратном пути</b>: первой заканчивается f(1) и печатает 1, потом f(2) печатает 2 и т. д. Ответ: <b>${seq.join(' ')}</b>.`:`f(${n}) <b>сначала печатает</b> ${n}, потом вызывает f(${n-1}), которая печатает ${n-1}… до f(0), где всё останавливается. Ответ: <b>${seq.join(' ')}</b>.`,
explain2:after?'Как стопка тарелок: вызовы кладут тарелки (не печатая), а печать происходит, когда тарелки снимают — сверху, то есть с самой маленькой.':'Каждый вызов делает «скажи своё число и передай дальше». Первым говорит тот, кого вызвали первым.'};});
G(7,()=>{const n=R(2,7);
return {type:'num',q:`Для ханойских башен число ходов h(n) удовлетворяет правилу h(1) = 1, h(n) = 2 · h(n − 1) + 1. Сколько ходов нужно для <b>${n}</b> дисков?`,ans:2**n-1,
short:`h(${n}) = 2^${n} − 1 = ${2**n-1}.`,
explain:`Считаем по правилу: ${range(1,n).map(k=>`h(${k}) = ${2**k-1}`).join(', ')}. Ответ <b>${2**n-1}</b>. Заметь: всегда 2ⁿ − 1.`,
explain2:`Чтобы перенести ${n} дисков: перенеси ${n-1} (это h(${n-1}) = ${2**(n-1)-1} ходов), большой диск (1 ход), и снова ${n-1} (${2**(n-1)-1}). ${2**(n-1)-1} + 1 + ${2**(n-1)-1} = ${2**n-1}.`};});
G(7,()=>{const tests=[1,2,3,7,10,20].map(n=>T(String(n),fib(n)));
return {type:'code',q:'Напиши <b>рекурсивную</b> функцию <code>fib(n)</code>: fib(1) = fib(2) = 1, fib(n) = fib(n − 1) + fib(n − 2). Программа читает n (1 ≤ n ≤ 20) и печатает fib(n).',
starter:`def fib(n):\n    pass\n\nn = int(input())\n`,tests,
solution:`def fib(n):\n    if n <= 2:\n        return 1\n    return fib(n - 1) + fib(n - 2)\n\nn = int(input())\nprint(fib(n))`,
hint:'База: if n <= 2: return 1. Иначе return fib(n - 1) + fib(n - 2).',
explain:'Переписываем определение почти дословно: база <code>if n &lt;= 2: return 1</code>, иначе <code>return fib(n - 1) + fib(n - 2)</code>. Снаружи — <code>print(fib(n))</code>.',
explain2:'Проверь: fib(3) = fib(2) + fib(1) = 2, fib(7) = 13. Для n до 20 рекурсия работает быстро, а для n = 40 будет ждать долго — почему, узнаешь в задаче со звёздочкой.'};});

/* L8 — ★ */
G(8,()=>{const tests=[];const mv=(n,a,b,c,out)=>{if(!n)return;mv(n-1,a,c,b,out);out.push(`${a} ${c}`);mv(n-1,b,a,c,out);};
[1,2,3,4].forEach(n=>{const o=[];mv(n,1,2,3,o);tests.push(T(String(n),lines(o)));});
return {type:'code',q:'<b>Ханойские башни.</b> На стержне 1 лежат n дисков (1 ≤ n ≤ 4), их надо перенести на стержень 3 (стержень 2 — запасной). За ход переносится один верхний диск; больший нельзя класть на меньший. Выведи кратчайшую последовательность ходов: каждый ход — строка «откуда куда», например <code>1 3</code>.',
starter:`def hanoi(n, a, b, c):\n    # перенести n дисков с a на c, используя b\n    pass\n\nn = int(input())\n`,tests,
solution:`def hanoi(n, a, b, c):\n    if n == 0:\n        return\n    hanoi(n - 1, a, c, b)\n    print(a, c)\n    hanoi(n - 1, b, a, c)\n\nn = int(input())\nhanoi(n, 1, 2, 3)`,
hint:'Перенеси n−1 дисков с a на b (через c), потом print(a, c), потом n−1 дисков с b на c (через a).',
explain:'Рекурсивная идея: чтобы перенести n дисков с a на c, (1) перенеси верхние n − 1 на запасной b: <code>hanoi(n - 1, a, c, b)</code>; (2) самый большой — с a на c: <code>print(a, c)</code>; (3) n − 1 дисков с b на c: <code>hanoi(n - 1, b, a, c)</code>. База: n == 0 — ничего не делать.',
explain2:'Для n = 2: 1 2 (маленький на запасной), 1 3 (большой на цель), 2 3 (маленький сверху). Ходов 2ⁿ − 1 = 3. Обрати внимание на порядок параметров при каждом вызове — роли стержней меняются.'};},STAR);
G(8,()=>{const tests=[];const sol=n=>{let k=0;for(let p=2;p+2<=n;p++)if(isPrime(p)&&isPrime(p+2))k++;return k;};
[3,5,7,20,100,R(150,1000)].forEach(n=>tests.push(T(String(n),sol(n))));
return {type:'code',q:'<b>Простые-близнецы</b> — пары простых чисел, отличающихся на 2: (3, 5), (5, 7), (11, 13)… Дано n. Сколько пар близнецов (p, p + 2), у которых оба числа не больше n?',
starter:`def is_prime(n):\n    pass\n\nn = int(input())\n`,tests,
solution:`def is_prime(n):\n    if n < 2:\n        return False\n    d = 2\n    while d * d <= n:\n        if n % d == 0:\n            return False\n        d += 1\n    return True\n\nn = int(input())\nk = 0\nfor p in range(2, n - 1):\n    if is_prime(p) and is_prime(p + 2):\n        k += 1\nprint(k)`,
hint:'Для каждого p проверь is_prime(p) and is_prime(p + 2), причём p + 2 <= n.',
explain:'Функция is_prime + один цикл. p идёт от 2 до n − 2 (чтобы p + 2 ≤ n): <code>range(2, n - 1)</code>. Если оба простые — счётчик + 1. Границы проверяют тесты: при n = 5 есть одна пара (3, 5), при n = 7 — две.',
explain2:'До 20: (3, 5), (5, 7), (11, 13), (17, 19) — 4 пары. Учёные до сих пор не знают, бесконечно ли много таких пар — это одна из знаменитых нерешённых задач математики.'};},STAR);
G(8,()=>{const tests=[];const sol=n=>{const w=[1,1,2];for(let i=3;i<=n;i++)w[i]=w[i-1]+w[i-2]+w[i-3];return w[n];};
[1,2,3,4,10,20].forEach(n=>tests.push(T(String(n),sol(n))));
return {type:'code',q:'Кузнечик прыгает по лестнице вверх на 1, 2 или 3 ступеньки за прыжок. Сколькими способами он может подняться с земли (ступенька 0) ровно на ступеньку n (1 ≤ n ≤ 20)? Например, на ступеньку 3 — четырьмя способами: 1+1+1, 1+2, 2+1, 3.',
starter:`def ways(n):\n    pass\n\nn = int(input())\n`,tests,
solution:`def ways(n):\n    if n == 0:\n        return 1\n    if n < 0:\n        return 0\n    return ways(n - 1) + ways(n - 2) + ways(n - 3)\n\nn = int(input())\nprint(ways(n))`,
hint:'Последний прыжок был на 1, 2 или 3. Значит ways(n) = ways(n−1) + ways(n−2) + ways(n−3). База: ways(0) = 1, отрицательные — 0.',
explain:'Смотрим на <b>последний</b> прыжок. Если он был на 1 — до этого кузнечик как-то добрался до n − 1: ways(n − 1) способов. Аналогично для 2 и 3. Итого ways(n) = ways(n − 1) + ways(n − 2) + ways(n − 3). Базы: ways(0) = 1 (уже на месте — один способ: ничего не делать), для отрицательных — 0.',
explain2:'Проверим: ways(1) = 1, ways(2) = 2 (1+1, 2), ways(3) = 2 + 1 + 1 = 4, ways(4) = 4 + 2 + 1 = 7. Это «трибоначчи» — родственник чисел Фибоначчи.'};},STAR);
G(8,()=>{const n=R(5,10);const calls=2*fib(n)-1;
return {type:'num',q:`Сколько всего раз будет вызвана функция fib (считая самый первый вызов) при вычислении <code>fib(${n})</code>?${C(`def fib(n):\n    if n <= 2:\n        return 1\n    return fib(n - 1) + fib(n - 2)`)}`,ans:calls,
hint:'Пусть c(n) — число вызовов. c(1) = c(2) = 1, c(n) = 1 + c(n − 1) + c(n − 2).',
short:`c(${n}) = ${calls} (это 2·fib(${n}) − 1).`,
explain:`Обозначим c(n) — сколько вызовов делает fib(n), включая себя. c(1) = c(2) = 1, а c(n) = 1 + c(n − 1) + c(n − 2).<br>${(()=>{const c=[0,1,1];for(let i=3;i<=n;i++)c[i]=1+c[i-1]+c[i-2];return range(1,n).map(i=>`c(${i}) = ${c[i]}`).join(', ');})()}.<br>Ответ: <b>${calls}</b>.`,
explain2:`Можно заметить закономерность: c(n) = 2 · fib(n) − 1 = 2 · ${fib(n)} − 1 = ${calls}. Вызовы растут так же быстро, как сами числа Фибоначчи — поэтому fib(40) считается очень долго (больше 200 миллионов вызовов).`};},STAR);
G(8,()=>{const n=R(10,120);const pc=n.toString(2).split('').filter(c=>c==='1').length;
const tr=[];let m=n;while(m>1){tr.push(`f(${m}) = f(${Math.floor(m/2)}) + ${m%2}`);m=Math.floor(m/2);}tr.push(`f(${m}) = ${m}`);
return {type:'num',q:`Что напечатает программа?${C(`def f(n):\n    if n <= 1:\n        return n\n    return f(n // 2) + n % 2\n\nprint(f(${n}))`)}`,ans:pc,
short:`f считает единицы в двоичной записи: ${n} = ${n.toString(2)}₂ → ${pc}.`,
explain:`Раскрываем: ${tr.join('; ')}.<br>Складываем остатки: <b>${pc}</b>.`,
explain2:`n % 2 — последняя двоичная цифра, n // 2 — отбросить её. Значит, f(n) — количество единиц в двоичной записи. ${n} = ${n.toString(2)}₂, единиц: ${pc}.`};},STAR);

window.TOPIC={id:'i_functions',title:'8. Функции',subtitle:'Программирование · Python',
intro:'<p>Функции — твои собственные команды. Один раз написал — пользуешься сколько угодно, как кнопкой. Запускай каждый пример и меняй его. В конце — рекурсия: функция, которая вызывает саму себя.</p>',
theory,symbols,figs:{},onTheory,
levels:['def и вызов','Параметры','return и print','Локальные переменные','Полезные функции','Функции вызывают функции','Функции и списки','Рекурсия','★ Олимпиадные задачи'],
gens};
})();
