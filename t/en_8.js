/* Английский язык — 8 класс: грамматика и фонетика. Пропуски с @ — темы прошлых лет (для повторения). */
(function(){
const S=t=>`<span class="say" data-say="${t}">${t}</span>`;
const T=t=>`<span class="tr">${t}</span>`;

/* ===================== Present Perfect Continuous ===================== */
RU.rule({
id:'en.8.ppc',
short:`Действие началось в прошлом и <b>всё ещё идёт</b> (или только что закончилось): <b>have / has been + глагол-ing</b>. ${S('I have been waiting for an hour.')} — Я жду уже час.`,
theory:`<p>Представь: ты стоишь на остановке. Пришёл в 8:00, сейчас 8:20, автобуса всё нет. Ты ждал раньше и <b>ждёшь до сих пор</b>. Для этого в английском есть отдельное время — <b>Present Perfect Continuous</b>.</p>
<p>${S('I have been waiting for twenty minutes.')} — Я жду (уже) двадцать минут.</p>
<div class="box rule"><b>Как строится</b>
<table class="sym"><tr><th></th><th>I / you / we / they</th><th>he / she / it</th></tr>
<tr><td>+</td><td>${S('I have been playing.')}</td><td>${S('She has been playing.')}</td></tr>
<tr><td>−</td><td>${S('I haven\'t been playing.')}</td><td>${S('He hasn\'t been playing.')}</td></tr>
<tr><td>?</td><td>${S('Have you been playing?')}</td><td>${S('Has she been playing?')}</td></tr></table>
Формула: <b>have / has + been + V-ing</b>. Слово <b>been</b> ${T('[biːn]')} есть всегда!</div>
<div class="box ex"><b>Слова-подсказки</b>
<b>for</b> + отрезок времени: ${S('for two hours')}, ${S('for a week')}, ${S('for ten years')}<br>
<b>since</b> + момент начала: ${S('since Monday')}, ${S('since nine o\'clock')}, ${S('since I was six')}<br>
<b>How long…?</b> — ${S('How long have you been learning English?')}<br>
<b>all day, all morning, lately, recently</b></div>
<div class="box tip"><b>Как запомнить</b>В русском мы говорим в <b>настоящем</b> времени: «Я учу английский пять лет». А англичанин думает: «я начал в прошлом и учу до сих пор» — и берёт have been: ${S('I have been learning English for five years.')}<br>Второе значение: действие только что закончилось, и виден его <b>след</b>: ${S('Your eyes are red. Have you been crying?')} — Ты плакал? (глаза красные).</div>
<div class="box err"><b>Типичные ошибки</b>
✗ I am learning English for five years. → ✓ ${S('I have been learning English for five years.')}<br>
✗ She have been working. → ✓ ${S('She has been working.')} (he / she / it → has)<br>
✗ I have waiting. → ✓ I have <b>been</b> waiting.<br>
✗ since two hours → ✓ <b>for</b> two hours (since — только с моментом начала).<br>
✗ I have been knowing him… → ✓ ${S('I have known him for years.')} Глаголы-«состояния» (<b>know, like, love, want, understand, have</b> в значении «иметь») в -ing не ставят — с ними берём обычный Present Perfect.</div>
<div class="box rule"><b>have been doing или have done?</b>
<b>have been + -ing</b> — важен <b>процесс</b>, сколько длится: ${S('I have been reading all day.')}<br>
<b>have + V3</b> — важен <b>результат</b>, сколько сделано: ${S('I have read three books.')}<br>
Есть число готовых штук (три книги, пять писем) — это Present Perfect.</div>`,
theory2:`<p>Представь секундомер. Ты нажал «старт» в прошлом, и он <b>всё ещё тикает</b>. Вот это и есть Present Perfect Continuous.</p>
<p>Русское «я <b>уже</b> час жду» = ${S('I have been waiting for an hour.')}</p>
<p>Собирай как конструктор: <b>have</b> (или <b>has</b> для he / she / it) + <b>been</b> + глагол с <b>-ing</b>.</p>
<p>${S('He has been sleeping since ten.')} — Он спит с десяти.<br>${S('We have been playing for an hour.')} — Мы играем уже час.</p>
<p><b>for</b> — «в течение» (сколько), <b>since</b> — «с» (с какого момента).</p>`,
items:[
 {lvl:1, text:"I {have been waiting*|am waiting|have waiting} for the bus for twenty minutes.",
  why:`Я начал ждать двадцать минут назад и <b>жду до сих пор</b> — это Present Perfect Continuous: <b>have been waiting</b>. «am waiting» — это русская логика («я жду»), но с for twenty minutes так нельзя. «have waiting» — потеряли слово <b>been</b>.`,
  why2:`Секундомер включили 20 минут назад, и он тикает: have + been + waiting. Три детали — все на месте.`},
 {lvl:1, text:"She {has been*|have been|is been} learning French since September.",
  why:`She — это «она», значит <b>has</b>, а не have. Дальше всегда <b>been</b>: has been learning. «is been» — такой формы нет.`,
  why2:`he / she / it → has. I / you / we / they → have. She has been learning.`},
 {lvl:1, text:"My brother {has been playing*|is playing|plays} computer games since breakfast. He {doesn't*|don't@en.5.ps} want to stop.",
  why:`1) since breakfast — с завтрака и до сих пор → <b>has been playing</b>. 2) He — третье лицо, в отрицании Present Simple нужно <b>doesn't</b>: ${S('He doesn\'t want to stop.')} «He don't» — ошибка.`,
  why2:`1) «С завтрака играет» = начал в прошлом, играет сейчас → has been playing. 2) he / she / it в отрицании — doesn't (does + not), как he likes → he doesn't like.`},
 {type:'listen', lvl:1, say:'I have been waiting for an hour.', q:'Послушай. Что сказал человек?', opts:['Я жду уже час.','Я ждал час вчера.','Я буду ждать час.'], ans:0,
  why:`Прозвучало ${S('I have been waiting for an hour.')} — have been waiting: ждёт до сих пор, уже час.`,
  why2:`have been + -ing = «уже… и всё ещё». Вчера было бы I waited, а будущее — I will wait.`},
 {type:'read', lvl:1, text:'I have been reading this book since Monday.', q:'Прочитай вслух',
  why:`<b>been</b> ${T('[biːn]')} — долгое «и». <b>reading</b> ${T('[ˈriːdɪŋ]')} — на конце носовое ${T('[ŋ]')}, без «г». <b>since</b> ${T('[sɪns]')}, <b>Monday</b> ${T('[ˈmʌndeɪ]')} — «Мандей». Связывай: «I have been» читается почти слитно.`,
  why2:`Послушай 🐢 медленно и повтори по кусочкам: ${S('I have been reading')} · ${S('this book')} · ${S('since Monday')}.`},
 {lvl:1, text:"We have been living here {for*|since|from} ten years.",
  why:`ten years — это <b>отрезок</b> времени (сколько длится) → <b>for</b>. since ставят перед моментом начала: since 2015. «from ten years» — так не говорят.`,
  why2:`Спроси себя: «сколько?» → for. «с какого момента?» → since. Десять лет — «сколько», значит for.`},
 {lvl:2, text:"It has been raining {since*|for|from} this morning.",
  why:`this morning — это <b>момент</b>, когда начался дождь → <b>since</b> (с утра). for — для отрезка: for two hours.`,
  why2:`since = «с» (с утра, с понедельника). for = «в течение» (два часа, неделю).`},
 {lvl:2, text:"How long {have you been learning*|are you learning|do you learn} English? — I {started*|have started@en.7.pp_vs_past} five years ago.",
  why:`1) How long…? — «как долго (и до сих пор)?» → <b>have you been learning</b>. 2) <b>ago</b> («назад») — точное время в прошлом, с ним только Past Simple: ${S('I started five years ago.')} Present Perfect с ago не бывает.`,
  why2:`1) Вопрос «сколько уже?» — have been + -ing. 2) Видишь ago, yesterday, last year — ставь Past Simple (started).`},
 {lvl:2, text:"They {haven't been sleeping*|hasn't been sleeping|haven't been sleep} well lately.",
  why:`They → <b>haven't</b> (has — только для he / she / it). После been — форма <b>-ing</b>: sleeping. «been sleep» — без -ing нельзя.`,
  why2:`они = they → have. Отрицание: haven't been sleeping — «плохо спят в последнее время».`},
 {type:'listen', lvl:2, say:'She has been working in the garden since nine.', q:'Послушай. Что мы узнали?', opts:['Она начала работать в саду в девять и всё ещё работает.','Она работала в саду до девяти.','Она будет работать в саду в девять.'], ans:0,
  why:`${S('She has been working in the garden since nine.')} — has been working + since nine: начала в девять и работает до сих пор.`,
  why2:`since = «с». С девяти и до этой минуты.`},
 {type:'spell', lvl:2, say:'have been waiting', ans:['have been waiting'], q:'Послушай и напиши три слова (это Present Perfect Continuous).',
  why:`<b>have been waiting</b>: been — с двумя <b>e</b> ${T('[biːn]')}, waiting — с <b>ai</b> и одной t.`,
  why2:`Формула на слух: have — been — глагол-ing. Wait + ing = waiting.`},
 {lvl:2, text:"Mum is tired because she {has been cooking*|cooks|is cook} since morning. There {are*|is@en.p.there_is} a lot of dishes on the table.",
  why:`1) since morning — готовит с утра и до сих пор (поэтому устала) → <b>has been cooking</b>. 2) a lot of dishes — тарелок много (множественное) → <b>There are</b>.`,
  why2:`1) Мама устала — это «след» долгого процесса: has been cooking. 2) Много чего-то → there are; одна вещь → there is.`},
 {lvl:3, text:"I {have known*|have been knowing|am knowing} my best friend since we were six.",
  why:`<b>know</b> — глагол-состояние, его не ставят в -ing. Поэтому вместо have been knowing — обычный Present Perfect: <b>have known</b>. ${S('I have known him since we were six.')}`,
  why2:`«Знать» — это не процесс, это состояние. Так же like, love, want, understand. С ними — have + V3: have known.`},
 {lvl:3, text:"She has been writing letters all morning. She {has written*|has been writing|have written} five letters.",
  why:`Есть <b>число готовых</b> писем (five letters) — важен результат → Present Perfect: <b>has written</b>. Процесс («пишет всё утро») — has been writing, но «сколько штук» — has written. «have written» — с she нужно has.`,
  why2:`Процесс — been + -ing. Результат, который можно посчитать, — has + V3 (written).`},
 {lvl:3, text:"He is sitting on a bench now. He is out of breath because he {has been running*|is running|runs}. He runs {faster*|more fast|the fastest@en.6.comparatives} than me.",
  why:`1) Он уже сидит на скамейке (сейчас не бежит), но запыхался — это след только что закончившегося долгого действия → <b>has been running</b>. «is running» — «бежит прямо сейчас», а он сидит. 2) Сравнение двух людей со словом <b>than</b> → сравнительная степень: fast → <b>faster</b>. «more fast» — нельзя: короткие слова получают -er.`,
  why2:`1) Запыхался = «бегал (и это видно)» → has been running. 2) than («чем») → -er: faster, bigger, taller.`},
 {type:'read', lvl:3, text:'We have been waiting for you for half an hour.', q:'Прочитай вслух',
  why:`<b>waiting</b> ${T('[ˈweɪtɪŋ]')}. <b>for you</b> — for звучит слабо ${T('[fə]')}. <b>half</b> ${T('[hɑːf]')} — буква l не читается! <b>half an hour</b> читается слитно: «хаафэнауэ», в <b>hour</b> h не читается.`,
  why2:`Опасные места: half — без «л», hour — без «х». Послушай 🐢 и повтори: ${S('half an hour')}.`},
 {lvl:3, q:'Какое предложение правильное? «Я живу в Москве с детства».', opts:['I live in Moscow since I was a child.','I have been living in Moscow since I was a child.','I am living in Moscow since I was a child.'], ans:1,
  why:`С детства и до сих пор → <b>have been living</b>. Русское «живу» — настоящее время, но с since в английском настоящее (live, am living) нельзя.`,
  why2:`since = «с какого-то момента и до сих пор» → только perfect: have been living.`},
 {lvl:3, text:"Kate {has been learning*|learns|is learning} Spanish for two years, but she still {can't*|doesn't can|isn't@en.s.can} speak it well.",
  why:`1) for two years — учит два года и продолжает → <b>has been learning</b>. 2) can не дружит с do / does: отрицание — просто <b>can't</b>: ${S('She can\'t speak it well.')}`,
  why2:`1) «Учит уже два года» → has been learning. 2) can't = can not. «doesn't can» — двойная ошибка.`}
]});

/* ===================== Past Perfect ===================== */
RU.rule({
id:'en.8.past_perf',
short:`Действие случилось <b>раньше другого действия в прошлом</b> («предпрошедшее»): <b>had + V3</b>. ${S('When I came, the film had started.')} — Когда я пришёл, фильм уже начался.`,
theory:`<p>Иногда в рассказе о прошлом нужно показать, что одно событие было <b>ещё раньше</b> другого. Для этого есть <b>Past Perfect</b>.</p>
<div class="box rule"><b>Как строится</b><b>had + V3</b> (третья форма глагола) — для всех лиц одинаково!<br>
+ ${S('I had finished.')} · ${S('She had gone.')}<br>
− ${S('We hadn\'t seen it.')} (had not)<br>
? ${S('Had you ever been there before?')}</div>
<div class="box ex"><b>Линия времени</b>
${S('When we arrived at the cinema, the film had already started.')}<br>
1) фильм начался (had started) → 2) мы пришли (arrived). Сначала — had, потом — обычный Past Simple.</div>
<div class="box ex"><b>Слова-подсказки</b>
<b>by</b> (к какому-то моменту): ${S('by six o\'clock')}, ${S('by the time we came')}<br>
<b>before, after, when, already, just, never… before</b></div>
<div class="box tip"><b>Как запомнить</b>Past Perfect — это «прошлое в прошлом». Как в фильме флешбэк: герой вспоминает то, что случилось ещё раньше. had = has / have, только «уехавшее» в прошлое.<br>
Сравни: ${S('When Mum came home, I cooked dinner.')} — мама пришла, и <b>тогда</b> я стал готовить.<br>${S('When Mum came home, I had cooked dinner.')} — ужин был <b>уже готов</b>.</div>
<div class="box err"><b>Типичные ошибки</b>
✗ The film has already started (в рассказе о прошлом) → ✓ ${S('The film had already started.')}<br>
✗ had went, had saw → ✓ had <b>gone</b>, had <b>seen</b> — после had всегда V3.<br>
✗ Ставить had в каждое предложение. Если события идут <b>по порядку</b>, Past Perfect не нужен: ${S('I got up, washed my face and had breakfast.')}</div>`,
theory2:`<p>Представь две коробки с прошлым: одна стоит дальше, другая ближе. В дальнюю кладём <b>had + V3</b>, в ближнюю — обычное прошедшее (came, saw, went).</p>
<p>${S('When I got home, my sister had cooked dinner.')} — Когда я пришёл домой (ближе), сестра уже приготовила ужин (ещё раньше).</p>
<p>По-русски можно сказать «<b>уже</b> …-л(а) к тому времени». Слышишь в голове «уже к тому моменту» — ставь had.</p>
<p>${S('By ten o\'clock, I had done my homework.')} — К десяти часам я уже сделал уроки.</p>`,
items:[
 {lvl:1, text:"When we arrived at the cinema, the film {had already started*|has already started|already starts}.",
  why:`Сначала начался фильм, потом мы пришли. Более раннее действие в прошлом → <b>had already started</b>. has started — это «сейчас», а рассказ о прошлом. already starts — настоящее время, не подходит.`,
  why2:`Флешбэк: фильм начался <b>ещё до</b> нашего прихода → had + V3.`},
 {lvl:1, text:"She {had*|has|have} never seen the sea before she went to Sochi.",
  why:`До поездки (went — прошлое) она ни разу не видела моря — это «прошлое в прошлом» → <b>had</b> never seen. has / have — настоящее, к прошлой поездке не подходит.`,
  why2:`Поездка уже в прошлом, а «никогда не видела» — ещё раньше. Значит had.`},
 {lvl:1, text:"By six o'clock yesterday, I {had finished*|have finished|finish} my homework.",
  why:`<b>By six o'clock yesterday</b> — «к шести часам вчера»: к этому моменту в прошлом действие уже закончилось → <b>had finished</b>.`,
  why2:`by + момент в прошлом = «уже к тому времени» → had + V3.`},
 {lvl:1, text:"Tom {was*|were@en.p.was_were} sad because he {had lost*|has lost|had lose} his phone.",
  why:`1) Tom — один человек → <b>was</b>. 2) Сначала потерял телефон, потом грустил → <b>had lost</b>. После had нужна V3: lose — lost — <b>lost</b>, а не lose.`,
  why2:`1) he / she / it / I → was, we / you / they → were. 2) Причина случилась раньше грусти → had lost.`},
 {type:'listen', lvl:1, say:'When I got home, my sister had cooked dinner.', q:'Послушай. Что случилось раньше?', opts:['Сестра приготовила ужин.','Я пришёл домой.','Всё случилось одновременно.'], ans:0,
  why:`${S('When I got home, my sister had cooked dinner.')} — had cooked: ужин был готов ещё до моего прихода.`,
  why2:`had + V3 всегда показывает действие, которое было раньше.`},
 {type:'read', lvl:1, text:'When I got to the station, the train had already left.', q:'Прочитай вслух',
  why:`<b>station</b> ${T('[ˈsteɪʃn]')} — «стейшн». <b>train</b> ${T('[treɪn]')}. <b>already</b> ${T('[ɔːlˈredi]')} — ударение на «ре». <b>left</b> — короткое ${T('[e]')}. «had already» читай слитно.`,
  why2:`Раздели на две части: ${S('When I got to the station,')} — пауза — ${S('the train had already left.')}`},
 {lvl:2, text:"I {didn't*|don't@en.6.past_neg_q} go to the party yesterday because I {hadn't finished*|haven't finished|didn't finished} my project.",
  why:`1) yesterday — прошлое, отрицание в Past Simple → <b>didn't</b> go. 2) Проект не был закончен ещё до вечеринки → <b>hadn't finished</b>. «didn't finished» — ошибка: после didn't глагол без -ed.`,
  why2:`1) Вчера → didn't. 2) «не успел закончить к тому времени» → hadn't + V3.`},
 {lvl:2, text:"{Had*|Has|Did} you ever been abroad before you moved to London?",
  why:`Переезд (moved) — в прошлом, а опыт «до этого» — ещё раньше → <b>Had</b> you ever been…? Did + been — невозможно (после did — первая форма). Has — настоящее.`,
  why2:`Вопрос в Past Perfect: Had + ты + V3? ${S('Had you ever been abroad?')}`},
 {lvl:2, text:"After the guests {had gone*|have gone|had went}, we washed the dishes.",
  why:`Сначала ушли гости, потом мыли посуду → <b>had gone</b>. go — went — <b>gone</b>: после had нужна третья форма, не went. have gone — настоящее время.`,
  why2:`had + V3. Третья форма от go — gone.`},
 {type:'spell', lvl:2, say:'had already left', ans:['had already left'], q:'Послушай и напиши три слова.',
  why:`<b>had already left</b>: already пишется с одной <b>l</b> в начале (al-ready), left — V3 от leave.`,
  why2:`already = all + ready, но одна l: al-ready.`},
 {lvl:2, text:"The streets were wet. It {had rained*|has rained|had rain} during the night. We {went*|goed@en.6.past_irreg} to school in boots.",
  why:`1) Улицы мокрые (прошлое), а дождь шёл ещё раньше, ночью → <b>had rained</b> (после had — V3 rained). 2) go — неправильный глагол: go — <b>went</b> — gone. «goed» не бывает.`,
  why2:`1) Сначала дождь, потом мокрые улицы → had rained. 2) Неправильные глаголы надо помнить: go → went.`},
 {type:'listen', lvl:2, say:'I had never eaten sushi before that day.', q:'Послушай. Что верно?', opts:['В тот день он попробовал суши впервые.','Он часто ел суши до того дня.','Он никогда не ест суши.'], ans:0,
  why:`${S('I had never eaten sushi before that day.')} — «до того дня я никогда не ел суши», значит, в тот день — впервые.`,
  why2:`had never + V3 + before = «ни разу до того».`},
 {lvl:3, q:'Сравни два предложения. Что значит <b>второе</b>?<br>1) When Mum came home, I <b>cooked</b> dinner.<br>2) When Mum came home, I <b>had cooked</b> dinner.', opts:['Ужин был уже готов, когда мама пришла.','Я начал готовить, когда мама пришла.','Я готовлю ужин каждый раз, когда мама приходит.'], ans:0, sayAfter:'When Mum came home, I had cooked dinner.',
  why:`<b>had cooked</b> — приготовил раньше маминого прихода, ужин уже готов. А cooked без had — «мама пришла, и тогда я приготовил».`,
  why2:`had = «уже к тому моменту». Без had — события по очереди: пришла → приготовил.`},
 {lvl:3, text:"I got up, {washed*|had washed} my face and had breakfast.",
  why:`Ловушка! События идут <b>по порядку</b> — встал, умылся, позавтракал. Для цепочки действий берём обычный Past Simple: <b>washed</b>. Past Perfect нужен, только когда порядок нарушен.`,
  why2:`Рассказываешь по очереди — had не нужен. had нужен, когда «прыгаешь» назад во времени.`},
 {lvl:3, text:"Before Anna came to the party, everybody {had eaten*|has eaten|had ate} all the cake. It was the {biggest*|most big|bigger@en.6.comparatives} cake I had ever seen.",
  why:`1) Торт съели ещё до прихода Анны → <b>had eaten</b> (eat — ate — eaten; после had — eaten). 2) the + «самый» → превосходная степень: big → <b>the biggest</b> (g удваивается). bigger — «больше», без «самый».`,
  why2:`1) had + V3 = eaten. 2) «самый большой из всех, что я видел» → the biggest.`},
 {lvl:3, text:"By the time the police arrived, the thief {had run*|has run|had ran} away.",
  why:`By the time… — «к тому времени, как» → вор убежал раньше → <b>had run</b>. run — ran — <b>run</b>: третья форма совпадает с первой, поэтому had ran — ошибка.`,
  why2:`run — ran — run. После had — третья форма: had run.`},
 {type:'read', lvl:3, text:'By the time we came back, the snow had melted.', q:'Прочитай вслух',
  why:`<b>By the time</b> — «бай зэ тайм», th ${T('[ð]')} — кончик языка между зубами. <b>snow</b> ${T('[snəʊ]')}. <b>melted</b> ${T('[ˈmeltɪd]')} — окончание -ed после t звучит ${T('[ɪd]')}.`,
  why2:`Послушай 🐢: ${S('By the time we came back,')} — пауза — ${S('the snow had melted.')}`},
 {lvl:3, text:"Yesterday I met an old friend. I {hadn't seen*|haven't seen|hadn't saw} him for five years. He told me a lot of interesting {stories*|storys@en.s.plurals}.",
  why:`1) Встреча была вчера, а «не видел пять лет» — до встречи → <b>hadn't seen</b>. see — saw — <b>seen</b>. 2) story: перед y согласная r → y меняем на i + es: <b>stories</b>.`,
  why2:`1) «До вчерашней встречи» — прошлое в прошлом → hadn't seen. 2) согласная + y → ies: story — stories, city — cities.`}
]});

/* ===================== Passive: Present / Past Simple ===================== */
RU.rule({
id:'en.8.passive',
short:`Когда важно не <b>кто</b> делает, а <b>что</b> с предметом делают: <b>am / is / are + V3</b> (сейчас, обычно) и <b>was / were + V3</b> (в прошлом). ${S('English is spoken here.')} ${S('The house was built in 1990.')}`,
theory:`<p>Сравни: ${S('Jack built this house.')} — Джек построил дом (важно, <b>кто</b>). ${S('This house was built in 1990.')} — Дом был построен (важен <b>дом</b>, а кто строил — неважно или неизвестно).</p>
<p>Второе предложение — <b>страдательный (пассивный) залог</b>: предмет не делает сам, с ним <b>что-то делают</b>.</p>
<div class="box rule"><b>Формула: be + V3</b>
<table class="sym"><tr><th>Время</th><th>Форма be</th><th>Пример</th></tr>
<tr><td>Present Simple (обычно, всегда)</td><td>am / is / are</td><td>${S('Tea is grown in China.')}<br>${S('These cars are made in Japan.')}</td></tr>
<tr><td>Past Simple (в прошлом)</td><td>was / were</td><td>${S('The letter was written yesterday.')}<br>${S('The photos were taken by my dad.')}</td></tr></table>
V3 — третья форма: правильные + <b>-ed</b> (painted, invented), неправильные — из таблицы (built, written, made, taken, stolen, spoken).</div>
<div class="box ex"><b>Отрицание и вопрос</b> — меняется только be:<br>
${S('Photos aren\'t allowed here.')} · ${S('The window wasn\'t broken.')}<br>
${S('Is football played in your school?')} · ${S('When was the telephone invented?')}</div>
<div class="box tip"><b>Кто сделал? — by</b>${S('The book was written by my favourite writer.')} — «кем»: <b>by</b> + кто.<br>
<b>Как запомнить:</b> по-русски это «<b>был построен</b>», «<b>говорят</b> на английском», «<b>делают</b> из дерева». Если в русском можно сказать «был …-н» или «…-ся» — скорее всего, нужен пассив.</div>
<div class="box err"><b>Типичные ошибки</b>
✗ English speaks here. (английский сам говорит?) → ✓ ${S('English is spoken here.')}<br>
✗ The bridge built in 1990. → ✓ The bridge <b>was</b> built in 1990. (без be — это «мост построил»!)<br>
✗ was build / was wrote → ✓ was <b>built</b> / was <b>written</b> — только V3.<br>
✗ Does football played…? → ✓ <b>Is</b> football played…? В пассиве do / does / did не нужны.<br>
Следи за числом: one letter <b>was</b>, two letters <b>were</b>.</div>`,
theory2:`<p>Представь, что предмет — «жертва»: он ничего не делает, с ним всё делают другие. Тогда ставим <b>быть + третья форма</b>.</p>
<p>Сейчас / обычно: <b>is / are</b> + V3. ${S('Bread is made from flour.')} — Хлеб делают из муки.</p>
<p>В прошлом: <b>was / were</b> + V3. ${S('My bike was stolen.')} — Мой велосипед украли.</p>
<p>Проверка: можно ли сказать «он <b>был</b> сделан / построен / украден»? Да → пассив.</p>`,
items:[
 {lvl:1, text:"English {is spoken*|speaks|is speak} in many countries.",
  why:`Английский язык сам не говорит — на нём <b>говорят</b> люди. Нужен пассив: is + V3. speak — spoke — <b>spoken</b> → <b>is spoken</b>. «is speak» — после is нужна третья форма.`,
  why2:`«На английском говорят» → English is spoken. be + V3.`},
 {lvl:1, text:"This castle {was built*|is built|built} in the twelfth century.",
  why:`Замок построили люди, давно (in the twelfth century — прошлое) → <b>was built</b>. is built — «строят сейчас / обычно». built без was значит «замок построил что-то сам».`,
  why2:`Прошлое + «был построен» → was + built.`},
 {lvl:1, text:"The letters {are delivered*|is delivered|deliver} every morning. Our postman {comes*|come@en.5.ps} at eight.",
  why:`1) Письма приносят (их приносит почтальон), их много → <b>are delivered</b>. 2) Our postman = he → Present Simple с <b>-s</b>: <b>comes</b>.`,
  why2:`1) letters — много → are + V3. 2) Один почтальон, каждый день → comes (he comes).`},
 {lvl:1, text:"These photos {were taken*|was taken|were took} by my grandfather.",
  why:`Фотографии делал дедушка (by my grandfather), их много → <b>were</b>. take — took — <b>taken</b>: нужна V3, а took — вторая форма.`,
  why2:`photos — много → were. V3 от take — taken.`},
 {type:'listen', lvl:1, say:'The window was broken by the boys.', q:'Послушай. Кто разбил окно?', opts:['мальчики','окно разбилось само','неизвестно'], ans:0,
  why:`${S('The window was broken by the boys.')} — <b>by the boys</b>: «мальчиками». Слово by показывает, кто сделал.`,
  why2:`by + кто = исполнитель. Окно разбили мальчики.`},
 {type:'read', lvl:1, text:'Tea is grown in China and India.', q:'Прочитай вслух',
  why:`<b>grown</b> ${T('[ɡrəʊn]')} — «гроун», V3 от grow. <b>China</b> ${T('[ˈtʃaɪnə]')} — «Чайна», <b>India</b> ${T('[ˈɪndiə]')}. <b>and</b> — коротко, слабо ${T('[ən]')}.`,
  why2:`Повтори: ${S('Tea is grown')} · ${S('in China and India.')}`},
 {lvl:2, text:"The first Harry Potter book {was written*|wrote|were written} by J. K. Rowling. It {was published*|published|is published} in 1997.",
  why:`1) Книгу написала писательница (by…), книга одна → <b>was written</b>. «wrote» значит «книга написала». 2) Книгу издали в 1997 году (прошлое) → <b>was published</b>.`,
  why2:`Книга — «жертва»: её написали и её издали. Одна книга, прошлое → was + V3 оба раза.`},
 {lvl:2, text:"Paper {is made*|makes|is making} from wood.",
  why:`Бумагу <b>делают</b> из дерева — это факт, всегда → Present Simple Passive: <b>is made</b>. «Paper makes» — бумага сама делает. is making — «бумага сейчас что-то делает».`,
  why2:`Что из чего делают → is / are + made. ${S('Paper is made from wood.')}`},
 {lvl:2, text:"My bike {was stolen*|stole|was steal} last week, but it {was found*|found|is found} yesterday. I {am*|is@en.s.to_be} so happy!",
  why:`1) Велосипед украли (last week) → <b>was stolen</b> (steal — stole — stolen). 2) Его нашли вчера → <b>was found</b>. 3) I → <b>am</b>.`,
  why2:`Велосипед ничего сам не делал — его украли и нашли: was + V3. С I — всегда am.`},
 {type:'spell', lvl:2, say:'written', ans:['written'], q:'Послушай и напиши третью форму глагола write.',
  why:`write — wrote — <b>written</b>. Буква <b>w</b> в начале не читается, а t удваивается: wri<b>tt</b>en.`,
  why2:`Слышим «ритн», а пишем w + ri + tt + en.`},
 {lvl:2, text:"{Is*|Does|Are} football played in your school?",
  why:`Вопрос в пассиве: на первое место выносим форму be. football — одно (он) → <b>Is</b>. В пассиве does не нужен.`,
  why2:`Football is played. → Is football played? Просто переставили is.`},
 {lvl:2, text:"The children {were given*|gave|was given} {some*|any@en.5.some_any} sweets after the concert.",
  why:`1) Детям дали конфеты (им дали, они не давали) → пассив; children — много → <b>were given</b>. 2) В утвердительном предложении — <b>some</b>; any — в вопросах и отрицаниях.`,
  why2:`1) children — это много детей → were. 2) «немного конфет» в утверждении → some.`},
 {lvl:3, q:'Как сказать по-английски «Этот мост построили в прошлом году»?', opts:['This bridge built last year.','This bridge was built last year.','This bridge is built last year.'], ans:1, sayAfter:'This bridge was built last year.',
  why:`Мост не строил сам — его построили → пассив. last year — прошлое → <b>was built</b>. Без was получится «мост построил».`,
  why2:`«построили» (неизвестно кто) → was + V3.`},
 {lvl:3, text:"Photos {aren't allowed*|don't allow|aren't allow} in the museum.",
  why:`Фотографировать <b>не разрешается</b> — фото «не разрешены» → пассив: <b>aren't allowed</b> (are not + V3). photos — много → are. «don't allow» — «фото не разрешают» (они сами?).`,
  why2:`Отрицание пассива: am / is / are + not + V3.`},
 {lvl:3, text:"When {was*|did|is} the telephone invented?",
  why:`Телефон изобрели давно → прошлое, пассив: The telephone was invented. В вопросе выносим was: <b>When was the telephone invented?</b> did + invented — ошибка.`,
  why2:`В пассиве вспомогательный глагол — сам be (was), а не did.`},
 {lvl:3, text:"Look! The workers {are painting*|paint@en.5.pc} our fence. It {is painted*|paints|is painting} every spring.",
  why:`1) Look! — действие происходит прямо сейчас → Present Continuous: <b>are painting</b>. 2) Забор сам не красит — его красят, и это бывает регулярно (every spring) → Present Simple Passive: <b>is painted</b>. «It paints» — «забор красит», is painting — «забор сейчас что-то красит».`,
  why2:`1) Look! / now → am / is / are + -ing. 2) Регулярно что-то делают с предметом → is + V3.`},
 {lvl:3, text:"Lunch {is served*|serves|is serving} at one o'clock {on*|in|at@en.5.prep_time} weekdays.",
  why:`1) Обед подают (обычно, по расписанию) → <b>is served</b>. 2) Дни недели и будни → <b>on</b>: on Monday, on weekdays.`,
  why2:`1) «Обед подаётся» → is + V3. 2) Дни — on; часы — at; месяцы и годы — in.`},
 {type:'read', lvl:3, text:'This house was built by my grandfather.', q:'Прочитай вслух',
  why:`<b>was</b> — слабо ${T('[wəz]')}. <b>built</b> ${T('[bɪlt]')} — буква u не читается, «билт». <b>grandfather</b> ${T('[ˈɡrænfɑːðə]')} — ударение на первый слог, d почти не слышно, th — ${T('[ð]')}.`,
  why2:`Опасные слова: built — «билт», grandfather — «грЭнфаазэ». Послушай 🐢.`},
 {type:'listen', lvl:3, say:'Our car is washed every Sunday.', q:'Послушай. Как часто моют машину?', opts:['каждое воскресенье','только в прошлое воскресенье','никогда'], ans:0,
  why:`${S('Our car is washed every Sunday.')} — <b>is washed</b> (Present) + every Sunday: моют каждое воскресенье.`,
  why2:`is + V3 — «обычно, регулярно»; was + V3 было бы про один раз в прошлом.`}
]});

/* ===================== Reported speech: statements ===================== */
RU.rule({
id:'en.8.reported',
short:`Пересказываем чужие слова: <b>He said (that)…</b> / <b>He told me (that)…</b> — и время «шагает назад»: am → was, will → would, can → could. ${S('“I am tired.” → He said that he was tired.')}`,
theory:`<p>Прямая речь — это точные слова в кавычках: ${S('Anna said, “I like pizza.”')}<br>Косвенная — пересказ: ${S('Anna said that she liked pizza.')}</p>
<div class="box rule"><b>Три вещи, которые меняются</b>
<ol class="steps"><li><b>Время — на шаг в прошлое</b> (если said / told).</li><li><b>Местоимения</b> — по смыслу: I → he / she, my → his / her, we → they.</li><li><b>Слова времени и места</b>: today → that day и т. д.</li></ol></div>
<table class="sym"><tr><th>Прямая речь</th><th>Косвенная речь</th></tr>
<tr><td>am / is → </td><td>was</td></tr><tr><td>are →</td><td>were</td></tr>
<tr><td>Present Simple: like</td><td>Past Simple: liked</td></tr>
<tr><td>Present Continuous: is cooking</td><td>Past Continuous: was cooking</td></tr>
<tr><td>will</td><td>would</td></tr><tr><td>can</td><td>could</td></tr>
<tr><td>Present Perfect: have seen</td><td>Past Perfect: had seen</td></tr>
<tr><td>Past Simple: saw</td><td>Past Perfect: had seen</td></tr></table>
<table class="sym"><tr><th>Было</th><th>Стало</th></tr>
<tr><td>${S('now')}</td><td>${S('then')}</td></tr><tr><td>${S('today')}</td><td>${S('that day')}</td></tr>
<tr><td>${S('yesterday')}</td><td>${S('the day before')}</td></tr><tr><td>${S('tomorrow')}</td><td>${S('the next day')}</td></tr>
<tr><td>${S('ago')}</td><td>${S('before')}</td></tr><tr><td>${S('last week')}</td><td>${S('the week before')}</td></tr>
<tr><td>${S('this')} / ${S('here')}</td><td>${S('that')} / ${S('there')}</td></tr></table>
<div class="box ex"><b>Примеры</b>
${S('“I will call you tomorrow,” said Lena.')} → ${S('Lena said that she would call me the next day.')}<br>
${S('“I can\'t swim,” said Nick.')} → ${S('Nick said that he couldn\'t swim.')}</div>
<div class="box tip"><b>said или told?</b><b>told</b> — всегда с тем, <b>кому</b>: told <b>me</b>, told <b>us</b>, told <b>Tom</b>.<br><b>said</b> — без «кому» или с <b>to</b>: ${S('She said that…')} · ${S('She said to me that…')}<br>Как запомнить: <b>tell</b> — «сообщить кому-то», кто-то обязательно рядом.</div>
<div class="box err"><b>Типичные ошибки</b>
✗ She said me… → ✓ She <b>told</b> me… / She said <b>to</b> me…<br>
✗ She told that… → ✓ She <b>said</b> that… / She told <b>me</b> that…<br>
✗ Оставлять tomorrow / yesterday, когда пересказываешь через неделю → the next day / the day before.<br>
✗ Забывать поменять местоимение: Max said, “My dog is ill.” → Max said that <b>his</b> dog was ill.</div>`,
theory2:`<p>Представь, что ты «переносишь» чужие слова на день или неделю назад. Всё, что в них было «сейчас», становится «тогда».</p>
<p>Поэтому глагол <b>делает шаг назад</b>: is → was, can → could, will → would.</p>
<p>${S('“I am hungry,” said Tom.')} → ${S('Tom said that he was hungry.')}</p>
<p>А «сегодня» того дня уже прошло — это «<b>тот день</b>» (that day), «завтра» того дня — «<b>следующий день</b>» (the next day).</p>
<p><b>told</b> + кому (told me), <b>said</b> — просто сказал.</p>`,
items:[
 {lvl:1, text:"Ann said, “I like pizza.” → Ann said that she {liked*|like|has liked} pizza.",
  why:`said → время шагает назад: like (Present Simple) → <b>liked</b> (Past Simple). «she like» — без -s и без сдвига. has liked — неверный сдвиг.`,
  why2:`Present Simple в косвенной речи → Past Simple: like → liked.`},
 {lvl:1, text:"Max said, “My dog is ill.” → Max said that {his*|my|her} dog was ill.",
  why:`Max говорил о <b>своей</b> собаке. В пересказе «my» меняем по смыслу: Max — он → <b>his</b> dog. my — это была бы моя собака, her — её.`,
  why2:`Говорил мальчик → my превращается в his. Говорила бы девочка → her.`},
 {lvl:1, text:"Kate {told*|said|spoke} me that she was busy.",
  why:`После пропуска стоит <b>me</b> (кому) → нужен <b>told</b>: told me. said me — ошибка (можно said <b>to</b> me). spoke me — так не говорят.`,
  why2:`told + кому. said — без «кому».`},
 {lvl:1, text:"When Nick was seven, he said, “I can't swim.” → Nick said that he {couldn't*|can't|didn't can} swim. Now he {swims*|swim@en.5.ps} very well.",
  why:`1) can → <b>could</b>, значит can't → <b>couldn't</b>. Тем более сейчас он уже плавает — «не умел» было тогда. 2) Now he… — Present Simple, he → <b>swims</b> с -s.`,
  why2:`1) can делает шаг назад и становится could. 2) he / she / it + глагол-s: he swims.`},
 {type:'listen', lvl:1, say:'She said that she was hungry.', q:'Послушай. Какими были её точные слова?', opts:['“I am hungry.”','“You are hungry.”','“I was hungry yesterday.”'], ans:0,
  why:`${S('She said that she was hungry.')} — was получилось из <b>am</b>, she — из <b>I</b>. Значит, она сказала: ${S('I am hungry.')}`,
  why2:`Идём обратно: was → am, she → I. «I am hungry.»`},
 {type:'read', lvl:1, text:'He said that he was very tired.', q:'Прочитай вслух',
  why:`<b>said</b> ${T('[sed]')} — «сед», не «саид»! <b>that</b> ${T('[ðət]')} — th звонкий, слабо. <b>tired</b> ${T('[ˈtaɪəd]')} — «тайэд», r не читается.`,
  why2:`Главная ловушка — said: читается как «сед». Послушай 🐢 и повтори.`},
 {lvl:2, text:"Last week Lena said, “I will call you tomorrow.” → Lena said that she would call me {the next day*|tomorrow|yesterday}.",
  why:`Слова сказаны неделю назад, их «завтра» уже давно прошло → tomorrow превращается в <b>the next day</b>. Заодно will → would, you → me.`,
  why2:`tomorrow → the next day (следующий день), yesterday → the day before.`},
 {lvl:2, text:"Last month Igor said, “I will help you tomorrow.” → Igor said that he {would*|will|wants} help me the next day.",
  why:`will → <b>would</b>. «will … the next day» не сочетается: the next day показывает пересказ из прошлого. wants help — без to и не тот смысл.`,
  why2:`will делает шаг назад — would.`},
 {lvl:2, text:"Last year Sam said, “I {have*|has@en.s.have_got} got a dog.” → Sam said that he {had*|have|having} got a dog.",
  why:`1) В прямой речи I → <b>have</b> got (has — для he / she / it). 2) В пересказе have → <b>had</b>: Sam said that he had got a dog. «he have» — ошибка, having — не та форма.`,
  why2:`1) I have got. 2) have шагает назад → had.`},
 {type:'spell', lvl:2, say:'the day before', ans:['the day before'], q:'Послушай и напиши три слова: так в косвенной речи меняется yesterday.',
  why:`yesterday → <b>the day before</b> («накануне»). before — с <b>e</b> на конце.`,
  why2:`«Вчера» того дня = «день до того» = the day before.`},
 {lvl:2, text:"Two weeks ago Olga said, “My brother {is*|are@en.s.to_be} in London now.” → Olga said that her brother {was*|were|be} in London {then*|now|tomorrow}.",
  why:`1) My brother = he → <b>is</b>. 2) is → <b>was</b> (brother один, поэтому не were). 3) now → <b>then</b> («тогда»): слова сказаны две недели назад.`,
  why2:`1) he → is. 2) is → was. 3) «сейчас» того времени = «тогда» → then.`},
 {type:'listen', lvl:2, say:'He told me that he had lost his keys.', q:'Послушай. Что он сказал на самом деле?', opts:['“I have lost my keys.”','“I will lose my keys.”','“You have lost your keys.”'], ans:0,
  why:`${S('He told me that he had lost his keys.')} — had lost получилось из <b>have lost</b>, he / his — из <b>I / my</b>. Его слова: ${S('I have lost my keys.')}`,
  why2:`had + V3 в пересказе ← have + V3 в прямой речи.`},
 {lvl:3, text:"She said {to me*|me|to} that she was busy.",
  why:`said с «кому» требует <b>to</b>: <b>said to me</b>. «said me» — ошибка. «said to that» — нет слова «кому».`,
  why2:`told me = said to me. Без to — только told.`},
 {lvl:3, text:"Last Friday Paul said, “I am leaving today.” → Paul said that he was leaving {that day*|today|the next day}.",
  why:`Сказано в прошлую пятницу, «сегодня» того дня → <b>that day</b> («в тот день»). today сейчас означало бы другой день. the next day — это из tomorrow.`,
  why2:`today → that day, tomorrow → the next day, yesterday → the day before.`},
 {lvl:3, text:"Mary said, “I bought the dress a week ago.” → Mary said that she {had bought*|has bought|buys} the dress a week {before*|ago|after}.",
  why:`1) Past Simple (bought) в пересказе → Past Perfect: <b>had bought</b>. 2) ago → <b>before</b>: «за неделю до того».`,
  why2:`1) bought шагает назад → had bought. 2) ago («назад от сегодня») → before («до того момента»).`},
 {lvl:3, text:"Yesterday Lisa said, “My sister always helps {me*|I@en.5.pronouns}.” → Lisa said that her sister always {helped*|help|has helped} her.",
  why:`1) После глагола (helps) нужно объектное местоимение: I → <b>me</b> («мне, меня»). 2) Present Simple (helps) в пересказе → Past Simple: <b>helped</b>. «her sister help» — потеряли -s, has helped — неверный сдвиг. Заметь: me в пересказе стало her.`,
  why2:`1) I — «я» (кто?), me — «мне / меня». 2) helps шагает назад → helped.`},
 {lvl:3, q:'Неделю назад Mike сказал: «I can’t come tomorrow.» Как правильно это пересказать?', opts:['Mike said that he couldn’t come the next day.','Mike said that he can’t come tomorrow.','Mike told that he couldn’t come the next day.'], ans:0, sayAfter:'Mike said that he couldn\'t come the next day.',
  why:`can't → <b>couldn't</b>, tomorrow → <b>the next day</b>, said без «кому». В третьем варианте ошибка: told that — после told нужен человек (told me).`,
  why2:`Три проверки: время сдвинуто? слово времени заменено? said / told правильно? Всё сходится только в первом.`},
 {type:'read', lvl:3, text:'She told me that she would come the next day.', q:'Прочитай вслух',
  why:`<b>told</b> ${T('[təʊld]')} — «тоулд». <b>would</b> ${T('[wʊd]')} — l не читается! <b>the next day</b> — «зэ некст дей», в next не глотай t.`,
  why2:`Ловушка — would: «вуд». Послушай 🐢: ${S('she would come')} · ${S('the next day')}.`},
 {lvl:3, text:"Yesterday Nina said, “I {have never been*|have never went|never was@en.7.pres_perf} to Paris.” → Nina said that she {had never been*|has never been|had never went} to Paris.",
  why:`1) Опыт «никогда не была» → Present Perfect: <b>have never been</b> (go → been / gone, не went). 2) В пересказе have → <b>had</b>: had never been. never стоит между had и V3, а went — вторая форма, после had нельзя.`,
  why2:`1) «Никогда не была» = have never been. 2) Шаг назад: have → had.`}
]});

/* ===================== Second Conditional ===================== */
RU.rule({
id:'en.8.cond_2',
short:`Мечты и «если бы»: ситуация <b>нереальная</b> сейчас. <b>If + Past Simple, would + глагол</b>. ${S('If I had a dog, I would walk it every day.')} — Если бы у меня была собака, я бы гулял с ней каждый день.`,
theory:`<p>Помнишь первый тип? ${S('If it rains, we will stay at home.')} — это <b>реально</b>: дождь вполне может пойти.</p>
<p>Второй тип — про то, чего <b>нет</b> (или почти не может быть): «если бы…, то бы…».</p>
<div class="box rule"><b>Формула</b>
<b>If + Past Simple</b> (had, knew, lived, were), <b>would + V</b> (would buy, would go)<br>
${S('If I had a lot of money, I would buy a big house.')}<br>
${S('If she knew the answer, she would tell us.')}<br>
Части можно поменять местами (тогда без запятой): ${S('I would buy a big house if I had a lot of money.')}</div>
<div class="box ex"><b>If I were you…</b> — «на твоём месте»: ${S('If I were you, I would ask the teacher.')}<br>
В учебниках после if во 2-м типе для всех лиц пишут <b>were</b>: if I were, if he were, if it were.<br>
Вопрос: ${S('What would you do if you saw a ghost?')}</div>
<div class="box tip"><b>Как запомнить</b>По-русски «если бы» — <b>прошедшее</b> время + «бы»: «если бы я <b>знал</b>, я <b>бы</b> сказал». В английском так же: в части с if — прошедшее (knew), а «бы» — это <b>would</b>.<br>
<b>would</b> ${T('[wʊd]')} — l не читается. Сокращение: I'd = I would.</div>
<div class="box err"><b>Типичные ошибки</b>
✗ If I would know… → ✓ If I <b>knew</b>… (would после if не ставим!)<br>
✗ If I had money, I will buy… → ✓ …I <b>would</b> buy.<br>
✗ If I have money, I would buy… → ✓ If I <b>had</b> money…<br>
Реально (может случиться) → 1-й тип: if + Present, will. Нереально, мечта → 2-й тип: if + Past, would.</div>`,
theory2:`<p>Второй тип — это «предложение-мечта». Ты фантазируешь о том, чего на самом деле нет.</p>
<p>Секрет: в английском, как и в русском, «если бы» требует <b>прошедшего</b> времени: «если бы я <b>жил</b>…» — ${S('If I lived…')}</p>
<p>А «бы» = <b>would</b>: «я <b>бы</b> купался» — ${S('I would swim.')}</p>
<p>${S('If I lived near the sea, I would swim every day.')} — Если бы я жил у моря, я бы купался каждый день (но я не живу у моря).</p>`,
items:[
 {lvl:1, text:"If I {had*|have|would have} a lot of money, I would buy a big house.",
  why:`Во второй части — would buy, значит это мечта (2-й тип). В части с if — Past Simple: <b>had</b>. have — для 1-го типа. would после if не ставим.`,
  why2:`«Если бы у меня <b>были</b>» — прошедшее → had.`},
 {lvl:1, text:"If she knew the answer, she {would tell*|will tell|tells} us.",
  why:`If + knew (Past Simple) → это 2-й тип, «если бы знала». Вторая часть — <b>would tell</b> («сказала бы»). will — для реальных условий.`,
  why2:`knew после if → в другой части обязательно would.`},
 {lvl:1, text:"If I {were*|am|be} you, I would ask the teacher.",
  why:`«На твоём месте» — я никак не могу быть тобой, это нереально → <b>If I were you</b>. Это устойчивое выражение: учи целиком. ${S('If I were you, I would ask the teacher.')}`,
  why2:`If I were you = «если бы я был тобой» = «на твоём месте».`},
 {lvl:1, text:"If my brother {lived*|lives} near the sea, he {would swim*|will swim} every day. But he {lives*|live@en.5.ps} in Moscow.",
  why:`1–2) Брат у моря <b>не</b> живёт (он в Москве) — значит, это мечта: <b>lived</b> … <b>would swim</b>. 3) he → Present Simple с -s: <b>lives</b>.`,
  why2:`«Если бы жил…, купался бы» — прошедшее + would. А правда сейчас: he lives in Moscow (he → -s).`},
 {type:'listen', lvl:1, say:'If I had a dog, I would walk it every day.', q:'Послушай. Есть ли у говорящего собака?', opts:['Нет, он только мечтает о ней.','Да, есть.','Есть, но он с ней не гуляет.'], ans:0,
  why:`${S('If I had a dog, I would walk it every day.')} — «если бы у меня была собака» → собаки нет, это мечта.`,
  why2:`had + would = «если бы… бы» → на самом деле этого нет.`},
 {type:'read', lvl:1, text:'If I had more time, I would read more books.', q:'Прочитай вслух',
  why:`<b>would</b> ${T('[wʊd]')} — без «л». <b>read</b> здесь ${T('[riːd]')} (настоящее, после would). <b>books</b> ${T('[bʊks]')} — короткое «у».`,
  why2:`Две половинки: ${S('If I had more time,')} — пауза — ${S('I would read more books.')}`},
 {lvl:2, text:"What {would you do*|will you do|do you do} if you saw a ghost?",
  why:`if you <b>saw</b> a ghost — привидение увидеть почти невозможно, это фантазия → <b>would you do</b>. Вопрос: would + ты + глагол.`,
  why2:`saw после if = «если бы ты увидел» → что бы ты сделал = what would you do.`},
 {lvl:2, text:"If it {were*|is} warmer today, we {would go*|will go} to the beach. But it {is*|are@en.s.to_be} cold and windy.",
  why:`1–2) На самом деле холодно, значит «если бы было теплее» — нереально: <b>were</b> … <b>would go</b>. 3) it → <b>is</b>: ${S('it is cold')}.`,
  why2:`Раз реальность другая (холодно) — 2-й тип: were + would. it всегда с is.`},
 {lvl:2, text:"If we didn't have homework, we {would play*|will play|would played} football all evening.",
  why:`if we <b>didn't have</b> (прошедшее) → 2-й тип → <b>would play</b>. После would — глагол без окончаний, поэтому would played — ошибка.`,
  why2:`would + чистый глагол: would play, would go, would be.`},
 {type:'spell', lvl:2, say:'would', ans:['would'], q:'Послушай и напиши главное слово 2-го типа условных предложений.',
  why:`<b>would</b> ${T('[wʊd]')} — пишется с <b>oul</b>, буква l не читается. Так же could, should.`,
  why2:`would, could, should — «немая» l: w-o-u-l-d.`},
 {lvl:2, text:"I would buy this jacket if it {didn't cost*|doesn't cost|wouldn't cost} so {much*|many@en.6.much_many}.",
  why:`1) I would buy → 2-й тип → в части с if прошедшее: <b>didn't cost</b>. wouldn't после if — нельзя. 2) Деньги неисчисляемы → so <b>much</b>.`,
  why2:`1) would в одной части — Past в другой. 2) much — для того, что не считают штуками (деньги, время, вода).`},
 {type:'listen', lvl:2, say:'If I lived in London, I would visit the museums every week.', q:'Послушай. Где живёт говорящий?', opts:['не в Лондоне','в Лондоне','в Лондоне уже много лет'], ans:0,
  why:`${S('If I lived in London, I would visit the museums every week.')} — «если бы я жил в Лондоне» → на самом деле он живёт не там.`,
  why2:`lived после if + would = мечта, а не реальность.`},
 {lvl:3, q:'В каком предложении говорится о <b>нереальной</b> ситуации?', opts:['If it rains, we will stay at home.','If I were a bird, I would fly to Africa.','If you heat ice, it melts.'], ans:1, sayAfter:'If I were a bird, I would fly to Africa.',
  why:`Человек не может стать птицей → нереально → 2-й тип: <b>were … would</b>. Первое — реальное будущее (1-й тип), третье — закон природы (нулевой тип).`,
  why2:`Ищи would — оно и показывает «бы», то есть фантазию.`},
 {lvl:3, text:"If he {knew*|would know|knows} her number, he would call her.",
  why:`Ловушка: хочется поставить would в обе части. Но после <b>if</b> would не ставим → <b>knew</b>. knows — для реального условия (с will).`,
  why2:`would — только в одной половине, не в той, где if.`},
 {lvl:3, text:"I'm sure it will be sunny tomorrow. If it {is*|were} sunny, we will go to the park.",
  why:`Ловушка наоборот! «Я уверен, что будет солнечно», а во второй части <b>will go</b> → это реальное условие, 1-й тип: <b>If it is sunny</b>. were — только для «если бы».`,
  why2:`Смотри на вторую часть: will → в if-части Present (is); would → Past (were).`},
 {lvl:3, text:"If I {could*|can} speak Chinese, I would talk to the people {who*|which@en.7.relative} live in China.",
  why:`1) I would talk → 2-й тип; can в прошедшем — <b>could</b>: «если бы я мог (умел)». 2) people — люди → <b>who</b>. which — только для предметов и животных.`,
  why2:`1) can → could, как have → had. 2) Люди — who, вещи — which.`},
 {type:'read', lvl:3, text:'If I were you, I would go to bed early.', q:'Прочитай вслух',
  why:`<b>were</b> ${T('[wɜː]')} — «вё», r не читается. <b>would</b> ${T('[wʊd]')}. <b>early</b> ${T('[ˈɜːli]')} — «ёли». Связывай: «If I» — «ифай».`,
  why2:`Послушай 🐢: ${S('If I were you,')} · ${S('I would go to bed early.')}`},
 {lvl:3, text:"You {always eat*|eat always@en.5.adv_freq} burgers! If you ate less fast food, you {would feel*|will feel|felt} better.",
  why:`1) Наречие частоты стоит <b>перед</b> смысловым глаголом: you <b>always eat</b>. 2) if you <b>ate</b> → 2-й тип → <b>would feel</b>.`,
  why2:`1) always, usually, often — перед глаголом (но после am / is / are). 2) ate после if → would + глагол.`},
 {lvl:3, text:"We would be very happy if our team {won*|wins|would win} the cup.",
  why:`We would be → 2-й тип → в части с if Past Simple: win — <b>won</b>. wins — 1-й тип, would win — после if нельзя.`,
  why2:`would в одной части → прошедшее (won) в части с if.`}
]});

/* ===================== Gerund or Infinitive ===================== */
RU.rule({
id:'en.8.ger_inf',
short:`После одних глаголов нужен <b>-ing</b> (enjoy, avoid, finish, mind: ${S('I enjoy reading.')}), после других — <b>to + глагол</b> (want, decide, hope, agree, refuse: ${S('I want to go.')}).`,
theory:`<p>Когда два глагола стоят рядом, второй принимает форму, которую «требует» первый: или <b>-ing</b> (герундий), или <b>to + глагол</b> (инфинитив).</p>
<table class="sym"><tr><th>+ -ing</th><th>+ to + глагол</th></tr>
<tr><td>${S('enjoy reading')} — наслаждаться</td><td>${S('want to go')} — хотеть</td></tr>
<tr><td>${S('avoid talking')} — избегать</td><td>${S('decide to buy')} — решить</td></tr>
<tr><td>${S('finish writing')} — закончить</td><td>${S('hope to see')} — надеяться</td></tr>
<tr><td>${S('mind opening')} — возражать</td><td>${S('agree to help')} — согласиться</td></tr>
<tr><td>${S('be good at drawing')} — после предлога</td><td>${S('refuse to answer')} — отказаться</td></tr></table>
<div class="box tip"><b>Как запомнить</b>
<b>-ing</b> — когда речь о самом занятии (нравится, закончил, избегаю): «процесс».<br>
<b>to</b> — когда смотришь <b>вперёд</b>, на цель: хочу, решил, надеюсь, согласился — всё это ещё должно случиться.<br>
После <b>предлога</b> (at, in, of, about, without) — всегда -ing: ${S('Tom is good at drawing.')}<br>
${S('Do you mind opening the window?')} — «Ты не против открыть окно?» (вежливая просьба).</div>
<div class="box rule"><b>Уровень 3: глаголы, у которых меняется смысл</b>
<b>stop</b>: ${S('He stopped smoking.')} — бросил курить. ${S('We stopped to have a rest.')} — остановились, <b>чтобы</b> отдохнуть.<br>
<b>remember</b>: ${S('Remember to lock the door.')} — не забудь (сделать потом). ${S('I remember visiting this castle.')} — помню, как был (в прошлом).<br>
<b>try</b>: ${S('I tried to lift the box.')} — пытался (трудно). ${S('Try adding some sugar.')} — попробуй ради эксперимента.</div>
<div class="box err"><b>Типичные ошибки</b>
✗ I enjoy to read. → ✓ ${S('I enjoy reading.')}<br>
✗ I want going. / I want go. → ✓ ${S('I want to go.')}<br>
✗ He is good at draw. → ✓ good at <b>drawing</b>.<br>
Правописание -ing: swim → swi<b>mm</b>ing, run → ru<b>nn</b>ing, write → writ<b>ing</b> (e уходит).</div>`,
theory2:`<p>Представь, что глаголы — это «друзья с характером». Одни дружат только с <b>-ing</b>, другие — только с <b>to</b>.</p>
<p><b>Команда -ing</b> (уже делаю / делал): enjoy, finish, avoid, mind. ${S('I finished doing my homework.')}</p>
<p><b>Команда to</b> (планы, «хочу в будущем»): want, decide, hope, agree, refuse. ${S('We decided to go to the cinema.')}</p>
<p>Подсказка: <b>to</b> похоже на стрелку → вперёд, к цели.</p>`,
items:[
 {lvl:1, text:"I enjoy {reading*|to read|read} detective stories.",
  why:`<b>enjoy</b> («получать удовольствие») дружит только с -ing: <b>enjoy reading</b>. to read и read после enjoy — ошибка.`,
  why2:`enjoy + -ing. ${S('I enjoy reading.')}`},
 {lvl:1, text:"We decided {to go*|going|go} to the cinema.",
  why:`<b>decide</b> («решить») — это план на будущее → <b>to go</b>.`,
  why2:`decide, want, hope → to + глагол. Решили (что сделать?) → пойти: to go.`},
 {lvl:1, text:"Do you mind {opening*|to open|open} the window?",
  why:`<b>mind</b> («возражать, быть против») требует -ing: <b>Do you mind opening</b>…? Это вежливая просьба: «Ты не против открыть окно?»`,
  why2:`mind + -ing. Запомни фразу целиком: ${S('Do you mind opening the window?')}`},
 {lvl:1, text:"My sister wants {to become*|becoming|become} a doctor. She {is*|are@en.s.to_be} very good at biology.",
  why:`1) <b>want</b> + to: <b>wants to become</b>. 2) She → <b>is</b>.`,
  why2:`1) «хочет стать» — хочу (что сделать?) → to become. 2) she — is.`},
 {type:'listen', lvl:1, say:'He finished doing his homework at nine.', q:'Послушай. Что прозвучало после finished?', opts:['doing','to do','do'], ans:0,
  why:`${S('He finished doing his homework at nine.')} — после <b>finish</b> всегда -ing: finished <b>doing</b>.`,
  why2:`finish + -ing: закончил (что?) делать — doing.`},
 {type:'read', lvl:1, text:'I enjoy playing football with my friends.', q:'Прочитай вслух',
  why:`<b>enjoy</b> ${T('[ɪnˈdʒɔɪ]')} — ударение на второй слог. <b>playing</b> — конец ${T('[ɪŋ]')}, без «г». <b>friends</b> ${T('[frendz]')} — «френдз».`,
  why2:`Послушай 🐢: ${S('I enjoy playing football')} · ${S('with my friends.')}`},
 {lvl:2, text:"She refused {to answer*|answering|answer} my question.",
  why:`<b>refuse</b> («отказаться») — из команды to: <b>refused to answer</b>.`,
  why2:`refuse, agree, decide, hope, want → to.`},
 {lvl:2, text:"He avoided {talking*|to talk|talk} to me yesterday. He {was*|were@en.p.was_were} angry with me.",
  why:`1) <b>avoid</b> («избегать») + -ing: <b>avoided talking</b>. 2) He, в прошлом → <b>was</b>.`,
  why2:`1) avoid — из команды -ing. 2) he / she / it / I → was.`},
 {lvl:2, text:"We hope {to see*|seeing|see} you soon.",
  why:`<b>hope</b> («надеяться») — взгляд вперёд → <b>to see</b>. ${S('We hope to see you soon.')}`,
  why2:`hope + to. Надеемся (что сделать?) — увидеть.`},
 {lvl:2, text:"When {did you finish*|you finished@en.6.past_neg_q} {writing*|to write} your essay?",
  why:`1) Вопрос в Past Simple: When + <b>did</b> + you + глагол: <b>did you finish</b>. «When you finished?» — нет вспомогательного did. 2) finish + -ing → <b>writing</b>.`,
  why2:`1) Вопрос о прошлом — с did. 2) finish — из команды -ing.`},
 {type:'spell', lvl:2, say:'swimming', ans:['swimming'], q:'Послушай и напиши -ing-форму от swim.',
  why:`swim → <b>swimming</b>: короткое слово кончается на гласная + согласная → согласная удваивается: swi<b>mm</b>ing. Так же running, sitting, getting.`,
  why2:`s-w-i-m-m-i-n-g — две m!`},
 {lvl:2, text:"They agreed {to help*|helping|help} us with the project.",
  why:`<b>agree</b> («согласиться») + to: <b>agreed to help</b>.`,
  why2:`Согласились (что сделать?) помочь → to help.`},
 {lvl:3, text:"We were tired, so we stopped {to have*|having} a rest.",
  why:`Устали → остановились, <b>чтобы</b> отдохнуть: <b>stopped to have</b> a rest. stopped having a rest значило бы «перестали отдыхать» — наоборот.`,
  why2:`stop + to = остановиться, чтобы. stop + -ing = перестать.`},
 {lvl:3, text:"My dad stopped {smoking*|to smoke} ten years ago, and now he feels much better.",
  why:`Папа <b>бросил</b> курить (и ему лучше) → <b>stopped smoking</b>. stopped to smoke — «остановился, чтобы покурить».`,
  why2:`stop + -ing = перестать делать. Бросил курить = stopped smoking.`},
 {lvl:3, text:"Please remember {to lock*|locking} the door when you leave.",
  why:`Это просьба <b>на будущее</b>: не забудь запереть → <b>remember to lock</b>. remember + -ing — «помнить, как уже делал».`,
  why2:`remember to — «не забыть сделать». remember -ing — «помнить, что было».`},
 {lvl:3, text:"I remember {visiting*|to visit} this castle when I was a little boy.",
  why:`Это <b>воспоминание</b> о прошлом (when I was a little boy) → <b>remember visiting</b>: «помню, как я там был».`,
  why2:`Смотришь назад, в прошлое → -ing. Вперёд → to.`},
 {lvl:3, q:'Какое предложение значит «Я <b>пытался</b> поднять коробку (было трудно)»?', opts:['I tried to lift the box, but it was too heavy.','I tried lifting the box to see how heavy it was.','I tried lift the box.'], ans:0, sayAfter:'I tried to lift the box, but it was too heavy.',
  why:`<b>try to</b> — пытаться сделать что-то трудное: tried to lift, but it was too heavy. try + -ing — «попробовать ради проверки, эксперимента». tried lift — ошибка.`,
  why2:`try to = старался (не получилось). try -ing = попробовал «а что будет».`},
 {type:'listen', lvl:3, say:'We stopped to buy some water.', q:'Послушай. Что они сделали?', opts:['Остановились, чтобы купить воды.','Перестали покупать воду.','Купили воду и не остановились.'], ans:0,
  why:`${S('We stopped to buy some water.')} — stop <b>to</b> = остановиться, чтобы что-то сделать.`,
  why2:`Слышишь to после stopped → «чтобы».`},
 {lvl:3, text:"Have you finished {cleaning*|to clean} your room yet? — Yes, I {have just finished*|just finish|finished just@en.7.pp_words}.",
  why:`1) finish + -ing → <b>cleaning</b>. 2) «Только что закончил» — Present Perfect с just: <b>have just finished</b>. just стоит между have и V3.`,
  why2:`1) finish — из команды -ing. 2) have + just + V3.`},
 {lvl:3, text:"Tom is good at {drawing*|to draw|draw}. He draws {better*|gooder|more good@en.6.comparatives} than anyone in our class.",
  why:`1) После предлога <b>at</b> — всегда -ing: good at <b>drawing</b>. 2) good / well — неправильное сравнение: good → <b>better</b> → the best.`,
  why2:`1) предлог + -ing. 2) good — better — best, «gooder» не бывает.`},
 {type:'read', lvl:3, text:'Remember to buy some bread on your way home.', q:'Прочитай вслух',
  why:`<b>Remember</b> ${T('[rɪˈmembə]')} — ударение на «ме», в конце ${T('[ə]')}. <b>to</b> — слабо ${T('[tə]')}. <b>bread</b> ${T('[bred]')} — ea читается как короткое «е». <b>way home</b> — «уэй хоум».`,
  why2:`Ловушка — bread: не «бриид», а «бред». Послушай 🐢.`}
]});

/* ===================== Word formation ===================== */
RU.rule({
id:'en.8.word_form',
short:`Из одного слова делаем другое с помощью <b>суффиксов</b> (-tion, -ment, -ness, -er/-or, -ful, -less) и <b>приставок</b> (un-, dis-, im-). ${S('care')} → ${S('careful')}, ${S('careless')}. В ОГЭ исходное слово дано БОЛЬШИМИ буквами в конце строки.`,
theory:`<p>В задании ОГЭ ты видишь предложение с пропуском, а в конце — слово большими буквами: <b>He is a very ___ driver. CARE</b>. Нужно превратить CARE в слово, которое подходит по смыслу и по грамматике: ${S('careful')}.</p>
<ol class="steps"><li>Посмотри, <b>какое слово нужно</b>: перед существительным — прилагательное (a careful driver), после a / the / прилагательного — существительное (the invention).</li>
<li>Посмотри на <b>смысл</b>: хорошее или плохое? «да» или «не»? (careful — внимательный, careless — небрежный).</li>
<li>Проверь <b>правописание</b>.</li></ol>
<table class="sym"><tr><th>Что получаем</th><th>Суффикс / приставка</th><th>Примеры</th></tr>
<tr><td>существительное — <b>действие, предмет</b></td><td>-tion, -ment</td><td>${S('invent')} → ${S('invention')}, ${S('inform')} → ${S('information')}, ${S('develop')} → ${S('development')}, ${S('agree')} → ${S('agreement')}</td></tr>
<tr><td>существительное — <b>качество</b></td><td>-ness</td><td>${S('kind')} → ${S('kindness')}, ${S('happy')} → ${S('happiness')} (y → i), ${S('dark')} → ${S('darkness')}</td></tr>
<tr><td>существительное — <b>человек</b></td><td>-er, -or</td><td>${S('teach')} → ${S('teacher')}, ${S('drive')} → ${S('driver')}, ${S('visit')} → ${S('visitor')}, ${S('act')} → ${S('actor')}</td></tr>
<tr><td>прилагательное «<b>полный</b>»</td><td>-ful</td><td>${S('help')} → ${S('helpful')}, ${S('use')} → ${S('useful')}, ${S('beauty')} → ${S('beautiful')}, ${S('success')} → ${S('successful')}</td></tr>
<tr><td>прилагательное «<b>без</b>»</td><td>-less</td><td>${S('use')} → ${S('useless')}, ${S('care')} → ${S('careless')}, ${S('home')} → ${S('homeless')}</td></tr>
<tr><td>«<b>не</b>»</td><td>un-, dis-, im-</td><td>${S('unhappy')}, ${S('unusual')}, ${S('dislike')}, ${S('disagree')}, ${S('disappear')}, ${S('impossible')}, ${S('impolite')}, ${S('impatient')}</td></tr></table>
<div class="box tip"><b>Как запомнить</b>-ful = full («полный»): helpful — «полный помощи». -less = less («меньше, без»): useless — «без пользы».<br><b>im-</b> обычно перед <b>p</b> и <b>m</b>: impossible, impolite, impatient. С остальными чаще un- или dis-, их надо запоминать.</div>
<div class="box err"><b>Типичные ошибки</b>
✗ beautyful → ✓ beau<b>ti</b>ful (y → i). ✗ usefull → ✓ use<b>ful</b> (одна l!).<br>
✗ happyness → ✓ happ<b>i</b>ness.<br>
✗ unpossible, unagree → ✓ <b>im</b>possible, <b>dis</b>agree.<br>
✗ Не смотреть на смысл: «He has never had an accident. He is a careless driver» — нет! Без аварий — значит careful.</div>`,
theory2:`<p>Представь, что слово — это кубик LEGO, а суффиксы и приставки — детали, которые к нему прищёлкивают.</p>
<p>Прищёлкнул <b>-er</b> — получился человек: ${S('teach')} → ${S('teacher')} (тот, кто учит).</p>
<p>Прищёлкнул <b>-ful</b> — «полный»: ${S('help')} → ${S('helpful')}. Прищёлкнул <b>-less</b> — «без»: ${S('help')} → ${S('helpless')}.</p>
<p>Приставки <b>un-, dis-, im-</b> — как русская «не-»: ${S('happy')} → ${S('unhappy')} (несчастный).</p>
<p>Совет: сначала реши, <b>какое</b> слово нужно (человек? качество? «не»?), потом выбирай деталь.</p>`,
items:[
 {lvl:1, text:"My uncle teaches English at school. He is a {teacher*|teaching|teachness}. TEACH",
  why:`После «He is a…» нужно существительное — <b>человек</b>, который учит: teach + <b>-er</b> = <b>teacher</b>. teaching — «обучение», teachness — такого слова нет.`,
  why2:`-er = человек, который что-то делает: teacher, driver, player.`},
 {lvl:1, text:"Thank you for your help! You are very {helpful*|helpless|helpfully}. HELP",
  why:`Тебя благодарят → ты помог, ты «полный помощи» → <b>helpful</b>. helpless — «беспомощный» (наоборот). После are нужно прилагательное, а helpfully — наречие.`,
  why2:`-ful = полный: helpful — полезный, готовый помочь.`},
 {lvl:1, text:"I can't do it — it's {impossible*|unpossible|dispossible}. POSSIBLE",
  why:`«Не могу» → «невозможно»: possible → <b>impossible</b>. Перед p ставим <b>im-</b>. unpossible и dispossible — таких слов нет.`,
  why2:`im- + p…: impossible, impolite, impatient.`},
 {lvl:1, text:"There {is*|are@en.p.there_is} a lot of useful {information*|informer|informment} on this website. INFORM",
  why:`1) information — <b>неисчисляемое</b> (как «информация» без множественного числа в английском) → <b>There is</b>, даже с a lot of. 2) После useful нужно существительное: inform + <b>-ation</b> = <b>information</b>. informer — «осведомитель» (человек), не подходит.`,
  why2:`1) information не бывает «informations», поэтому is. 2) inform → information.`},
 {type:'listen', lvl:1, say:'happiness', q:'Послушай слово. Какой суффикс в нём?', opts:['-ness','-ment','-tion'], ans:0,
  why:`${S('happiness')} ${T('[ˈhæpinəs]')} — happy + <b>-ness</b> = «счастье». y перед суффиксом превращается в i.`,
  why2:`-ness — суффикс качества: kindness, darkness, happiness.`},
 {type:'read', lvl:1, text:'She is a very kind and helpful girl.', q:'Прочитай вслух',
  why:`<b>kind</b> ${T('[kaɪnd]')} — «кайнд». <b>helpful</b> ${T('[ˈhelpfl]')} — ударение на первый слог, суффикс -ful читается очень коротко. <b>girl</b> ${T('[ɡɜːl]')} — «гёл», r не читается.`,
  why2:`Послушай 🐢: ${S('a very kind')} · ${S('and helpful girl')}.`},
 {lvl:2, text:"Everybody was surprised by his {kindness*|kindment|unkind}. KIND",
  why:`После his нужно существительное — <b>качество</b>: kind + <b>-ness</b> = <b>kindness</b> («доброта»). unkind — прилагательное. kindment — нет такого слова.`,
  why2:`his + существительное. Качество → -ness.`},
 {lvl:2, text:"Yesterday the {visitors*|visitions|visitness} {saw*|seed@en.6.past_irreg} the old castle. VISIT",
  why:`1) После the — существительное, «люди, которые пришли посмотреть» → visit + <b>-or</b> + s = <b>visitors</b>. 2) see — неправильный глагол: see — <b>saw</b> — seen.`,
  why2:`1) visit → visitor (посетитель), как act → actor. 2) see → saw.`},
 {lvl:2, text:"I {disagree*|unagree|imagree} with you. AGREE",
  why:`«Я не согласен» → agree + <b>dis-</b> = <b>disagree</b>. С agree приставка только dis-.`,
  why2:`dis- + глагол: disagree, dislike, disappear.`},
 {type:'spell', lvl:2, say:'beautiful', ans:['beautiful'], q:'Послушай и напиши прилагательное от beauty.',
  why:`beauty + -ful = <b>beautiful</b>: y меняется на <b>i</b>, а -ful пишется с <b>одной</b> l.`,
  why2:`b-e-a-u-t-i-f-u-l. Помни: beau + ti + ful.`},
 {lvl:2, text:"The {invention*|inventment|inventness} of the telephone {changed*|change@en.6.past_reg} the world. INVENT",
  why:`1) После The — существительное: invent + <b>-ion</b> = <b>invention</b> («изобретение»). 2) Это было давно → Past Simple, правильный глагол + ed: <b>changed</b>.`,
  why2:`1) invent → invention, как inform → information. 2) Прошлое → change + d.`},
 {type:'listen', lvl:2, say:'careless', q:'Послушай. Какое слово прозвучало?', opts:['careful','careless'], ans:1,
  why:`Прозвучало ${S('careless')} ${T('[ˈkeələs]')} — «небрежный». Слышно ${T('[ləs]')} в конце. А ${S('careful')} кончается на ${T('[fl]')}.`,
  why2:`-less звучит как «лэс», -ful — как короткое «фл».`},
 {lvl:2, text:"Don't be {impolite*|unpolite|dispolite}! Say “thank you”. POLITE",
  why:`«Не будь невежливым» → polite + <b>im-</b> = <b>impolite</b> (polite начинается с p).`,
  why2:`p → im-: impolite, impossible, impatient.`},
 {lvl:3, text:"This old phone doesn't work. It is completely {useless*|useful|usage}. USE",
  why:`Телефон не работает → он <b>без пользы</b>: use + <b>-less</b> = <b>useless</b>. useful — «полезный» (противоположный смысл). usage — существительное.`,
  why2:`Смотри на смысл: не работает → useless.`},
 {lvl:3, text:"The magician waved his hand, and the rabbit {disappeared*|unappeared|appearance}. APPEAR",
  why:`Кролик <b>исчез</b> → appear («появиться») + <b>dis-</b> = disappear, и в прошлом (waved) → <b>disappeared</b>. appearance — существительное «внешность».`,
  why2:`appear — появиться, disappear — исчезнуть. Плюс -ed, потому что прошлое.`},
 {lvl:3, text:"The {development*|developer|developness} of new technologies {is*|are@en.s.to_be} very fast now. DEVELOP",
  why:`1) «Развитие» → develop + <b>-ment</b> = <b>development</b>. developer — человек-разработчик, по смыслу не подходит. 2) Подлежащее — development (одно) → <b>is</b>. technologies — это просто «чего», не подлежащее.`,
  why2:`1) -ment — процесс: development, movement. 2) Кто «очень быстрое»? развитие → is.`},
 {lvl:3, text:"It was a {wonderful*|wonderless|wonderness} holiday — we enjoyed every day. WONDER",
  why:`Нам понравился каждый день → «чудесный»: wonder + <b>-ful</b> = <b>wonderful</b>. Перед holiday нужно прилагательное.`,
  why2:`wonder — чудо, wonderful — «полный чудес», чудесный.`},
 {lvl:3, text:"My little brother is often {unhappy*|happiness|happily} when it rains because he {can't*|doesn't can@en.s.can} play outside. HAPPY",
  why:`1) Не может гулять → грустит: un + happy = <b>unhappy</b>. После is — прилагательное, поэтому не happiness (существительное) и не happily (наречие). 2) Отрицание can — <b>can't</b>, без doesn't.`,
  why2:`1) un- = «не»: unhappy — несчастный. 2) can't = cannot.`},
 {lvl:3, q:'Какое слово образовано <b>НЕправильно</b>?', opts:['unhappy','impossible','unagree','dishonest'], ans:2,
  why:`Правильно — <b>disagree</b>. С agree работает только dis-. Остальные слова верные: unhappy, impossible, dishonest.`,
  why2:`agree → disagree. «unagree» не существует.`},
 {type:'read', lvl:3, text:'This information is very useful for my project.', q:'Прочитай вслух',
  why:`<b>information</b> ${T('[ˌɪnfəˈmeɪʃn]')} — ударение на «мей», -tion читается ${T('[ʃn]')} «шн». <b>useful</b> ${T('[ˈjuːsfl]')} — «юсфл». <b>project</b> ${T('[ˈprɒdʒekt]')} — ударение на первый слог.`,
  why2:`Сложное слово — information: ин-фэ-МЕЙ-шн. Послушай 🐢.`}
]});

/* ===================== Articles with geographical names ===================== */
RU.rule({
id:'en.8.articles_geo',
short:`<b>the</b> — реки, моря, океаны, горные цепи, группы островов, пустыни и страны со словами States / Kingdom / Federation или во множественном числе (the Thames, the Alps, the USA). <b>Без артикля</b> — континенты, большинство стран, города, улицы, отдельные горы и озёра (Russia, Moscow, Mount Elbrus, Lake Baikal).`,
theory:`<div class="box rule"><b>THE — «вода» и «много»</b>
<table class="sym"><tr><th>Что</th><th>Примеры</th></tr>
<tr><td>реки</td><td>${S('the Thames')}, ${S('the Volga')}, ${S('the Nile')}</td></tr>
<tr><td>моря и океаны</td><td>${S('the Black Sea')}, ${S('the Pacific Ocean')}, ${S('the Atlantic')}</td></tr>
<tr><td>горные цепи (много гор)</td><td>${S('the Alps')}, ${S('the Urals')}, ${S('the Himalayas')}</td></tr>
<tr><td>группы островов</td><td>${S('the Canary Islands')}</td></tr>
<tr><td>пустыни</td><td>${S('the Sahara')}</td></tr>
<tr><td>страны-«союзы» и во мн. числе</td><td>${S('the USA')}, ${S('the UK')}, ${S('the Russian Federation')}, ${S('the Netherlands')}</td></tr></table></div>
<div class="box rule"><b>БЕЗ артикля — «одно, своё имя»</b>
<table class="sym"><tr><th>Что</th><th>Примеры</th></tr>
<tr><td>континенты</td><td>${S('Europe')}, ${S('Africa')}, ${S('Asia')}</td></tr>
<tr><td>большинство стран</td><td>${S('Russia')}, ${S('France')}, ${S('Spain')}, ${S('Australia')}</td></tr>
<tr><td>города, улицы, площади</td><td>${S('Moscow')}, ${S('London')}, ${S('Oxford Street')}, ${S('Red Square')}</td></tr>
<tr><td>одна гора (Mount …)</td><td>${S('Mount Elbrus')}, ${S('Mount Everest')}</td></tr>
<tr><td>одно озеро (Lake …)</td><td>${S('Lake Baikal')}, ${S('Lake Ladoga')}</td></tr>
<tr><td>один остров</td><td>${S('Sicily')}, ${S('Madeira')}</td></tr></table></div>
<div class="box tip"><b>Как запомнить</b>
<b>Вода течёт и шумит — the</b>: реки, моря, океаны.<br>
<b>Много чего-то — the</b>: the Alps (много гор), the Canary Islands (много островов), the Netherlands, the United States (много штатов).<br>
<b>Одно с «именем» — без артикля</b>: Russia, Moscow, Mount Elbrus, Lake Baikal.<br>
Сравни: ${S('Mount Everest is in the Himalayas.')} — одна гора без артикля, цепь гор — с the.</div>
<div class="box err"><b>Типичные ошибки</b>
✗ the Russia, the Moscow, the Africa → ✓ Russia, Moscow, Africa<br>
✗ the Lake Baikal, the Mount Elbrus → ✓ Lake Baikal, Mount Elbrus<br>
✗ Thames, Black Sea без the → ✓ <b>the</b> Thames, <b>the</b> Black Sea<br>
✗ USA без the → ✓ <b>the</b> USA (= the United States of America).</div>`,
theory2:`<p>Простое правило из двух «корзинок».</p>
<p><b>Корзинка THE</b>: всё, что про <b>воду</b> (реки, моря, океаны) и всё, где <b>много</b> (горы-цепи, острова-группы, «соединённые» страны). ${S('the Volga')}, ${S('the Alps')}, ${S('the USA')}.</p>
<p><b>Пустая корзинка</b>: всё «одиночное» с собственным именем — страны, города, континенты, одна гора, одно озеро. ${S('Russia')}, ${S('Moscow')}, ${S('Lake Baikal')}.</p>
<p>Спроси себя: «Это вода? Этого много? Это союз?» Да → the. Нет → ничего.</p>`,
items:[
 {lvl:1, text:"London is on {the*|_|a} Thames.",
  why:`Thames — <b>река</b>, а реки всегда с <b>the</b>: ${S('the Thames')}.`,
  why2:`Вода течёт — ставим the.`},
 {lvl:1, text:"My cousin lives in {_*|the} Russia, and my aunt lives in {the*|_} USA.",
  why:`1) Russia — обычная страна → <b>без артикля</b>. 2) USA = the United States of America — «соединённые штаты», много штатов → <b>the USA</b>.`,
  why2:`Russia, France, Spain — без the. the USA, the UK — с the.`},
 {lvl:1, text:"I want to climb {_*|the} Mount Elbrus.",
  why:`Одна гора со словом Mount → <b>без артикля</b>: ${S('Mount Elbrus')}.`,
  why2:`Одна гора — без the. Цепь гор (the Caucasus, the Alps) — с the.`},
 {lvl:1, text:"Have you ever seen {_*|the} Lake Baikal? It {is*|are@en.s.to_be} the deepest lake in the world.",
  why:`1) Lake + название → <b>без артикля</b>: Lake Baikal. 2) It → <b>is</b>.`,
  why2:`1) Одно озеро со словом Lake — пустая корзинка. 2) it — всегда is.`},
 {type:'listen', lvl:1, say:'We went skiing in the Alps.', q:'Послушай. Как прозвучало название?', opts:['the Alps','Alps','the Alp'], ans:0,
  why:`${S('We went skiing in the Alps.')} — <b>the Alps</b>: горная цепь, много гор → the и окончание -s.`,
  why2:`Много гор → the + множественное число.`},
 {type:'read', lvl:1, text:'The Volga is the longest river in Europe.', q:'Прочитай вслух',
  why:`<b>The Volga</b> ${T('[ðə ˈvɒlɡə]')} — перед согласной the читается ${T('[ðə]')}. <b>longest</b> ${T('[ˈlɒŋɡɪst]')}. <b>Europe</b> ${T('[ˈjʊərəp]')} — «Юэрэп», а не «Европа»!`,
  why2:`Ловушка — Europe: «ЮЭ-рэп». Послушай 🐢.`},
 {lvl:2, text:"We swam in {the*|_} Black Sea last summer.",
  why:`Море → <b>the</b>: the Black Sea.`,
  why2:`Моря и океаны — с the.`},
 {lvl:2, text:"In summer it is {hotter*|more hot@en.6.comparatives} in {_*|the} Africa than in {_*|the} Europe.",
  why:`1) hot — короткое слово, сравнение с than → <b>hotter</b> (t удваивается). 2–3) Континенты → <b>без артикля</b>: Africa, Europe.`,
  why2:`1) hot → hotter. 2–3) Континенты — пустая корзинка.`},
 {lvl:2, text:"The capital of {_*|the} Russia is {_*|the} Moscow.",
  why:`Страна Russia и город Moscow — <b>без артикля</b>. В начале стоит The — но это к слову capital («столица»), а не к стране.`,
  why2:`Страны и города — без the.`},
 {type:'spell', lvl:2, say:'the Netherlands', ans:['the Netherlands'], q:'Послушай и напиши название страны (вместе с артиклем).',
  why:`<b>the Netherlands</b> (Нидерланды) — название во множественном числе (-s), поэтому с the. Пишется с th: ne-<b>th</b>-er-lands.`,
  why2:`Netherlands = «низкие земли» (много земель) → the.`},
 {lvl:2, text:"Last year we {went*|goed@en.6.past_irreg} to {the*|_} UK and visited {_*|the} London.",
  why:`1) go — неправильный: <b>went</b>. 2) UK = the United Kingdom (королевство) → <b>the UK</b>. 3) Город → <b>без артикля</b>: London.`,
  why2:`1) go → went. 2) Kingdom → the. 3) Города — без the.`},
 {type:'listen', lvl:2, say:'The Pacific Ocean is bigger than the Atlantic.', q:'Послушай. Какой океан больше, по словам диктора?', opts:['Тихий','Атлантический','Индийский'], ans:0,
  why:`${S('The Pacific Ocean is bigger than the Atlantic.')} — Pacific (Тихий) больше, чем Atlantic. Оба — с the.`,
  why2:`Pacific — Тихий океан, Atlantic — Атлантический.`},
 {lvl:3, text:"{The*|_} Canary Islands are in {the*|_} Atlantic Ocean, near {_*|the} Africa.",
  why:`1) Группа островов → <b>the</b> Canary Islands. 2) Океан → <b>the</b> Atlantic Ocean. 3) Континент → <b>без артикля</b>: Africa.`,
  why2:`Много островов — the. Океан — the. Континент — ничего.`},
 {lvl:3, text:"{The*|_} Sahara is the largest hot desert in the world.",
  why:`Пустыни → <b>the</b>: the Sahara.`,
  why2:`Пустыни, как и реки, — с the.`},
 {lvl:3, text:"Mount Everest is in {the*|_} Himalayas.",
  why:`Himalayas — горная <b>цепь</b>, много гор → <b>the Himalayas</b>. А сама гора — без артикля: Mount Everest.`,
  why2:`Одна гора — ничего, цепь гор — the.`},
 {lvl:3, text:"My friend {has never been*|never was|has never went@en.7.pres_perf} to {the*|_} Urals.",
  why:`1) Опыт «никогда не был» → Present Perfect: <b>has never been</b> (не went — это вторая форма). 2) Urals — горы (много) → <b>the Urals</b>.`,
  why2:`1) has + never + been. 2) Горы — the.`},
 {lvl:3, q:'В каком предложении <b>ошибка</b>?', opts:['I live in the Russian Federation.','We walked across Red Square.','My dream is to visit the Australia.','The Nile is in Africa.'], ans:2,
  why:`Australia — обычная страна (и континент) → <b>без артикля</b>: visit Australia. the Russian Federation — с the (Federation), Red Square — площадь без артикля, the Nile — река.`,
  why2:`Australia — одно «имя», пустая корзинка.`},
 {lvl:3, text:"Have you ever been to {the*|_} Netherlands? — Yes, I went there {in*|on|at@en.5.prep_time} 2019.",
  why:`1) Netherlands — во множественном числе → <b>the</b>. 2) Год → <b>in</b>: in 2019.`,
  why2:`1) -s на конце страны → the. 2) годы, месяцы — in; дни — on; часы — at.`},
 {type:'read', lvl:3, text:'Last summer we went to the United Kingdom.', q:'Прочитай вслух',
  why:`<b>the United</b> ${T('[ðə juˈnaɪtɪd]')} — United начинается со звука ${T('[j]')} («ю»), ударение на «най». <b>Kingdom</b> ${T('[ˈkɪŋdəm]')} — ударение на первый слог, ng — носовое ${T('[ŋ]')}.`,
  why2:`Послушай 🐢: ${S('Last summer')} · ${S('we went')} · ${S('to the United Kingdom.')}`}
]});

/* ===================== Schwa ===================== */
RU.rule({
id:'en.8.ph_schwa',
short:`${T('[ə]')} — короткий, ленивый, «никакой» звук в <b>безударных</b> слогах. Его можно записать любой гласной буквой: ${S('about')}, ${S('teacher')}, ${S('doctor')}, ${S('banana')}.`,
theory:`<p>Самый частый звук английского языка — не «а» и не «и», а ${T('[ə]')} (он называется <b>шва</b>, schwa). Это короткий неясный звук, когда рот почти не напрягается.</p>
<div class="box tip"><b>Русская подсказка</b>Скажи «<b>молоко</b>». Первый звук «о» на самом деле звучит как короткое неясное «ъ/а»: «мълако». Вот это и есть ${T('[ə]')}! В русском безударные гласные тоже «съедаются» — в английском так же.</div>
<div class="box rule"><b>Где он бывает</b>Только в <b>безударном</b> слоге. А писаться может любой буквой:
<table class="sym"><tr><th>Буква</th><th>Примеры</th></tr>
<tr><td>a</td><td>${S('about')} ${T('[əˈbaʊt]')}, ${S('banana')} ${T('[bəˈnɑːnə]')}, ${S('sofa')} ${T('[ˈsəʊfə]')}</td></tr>
<tr><td>e</td><td>${S('children')} ${T('[ˈtʃɪldrən]')}, ${S('problem')} ${T('[ˈprɒbləm]')}</td></tr>
<tr><td>o</td><td>${S('today')} ${T('[təˈdeɪ]')}, ${S('lemon')} ${T('[ˈlemən]')}, ${S('computer')} ${T('[kəmˈpjuːtə]')}</td></tr>
<tr><td>u</td><td>${S('autumn')} ${T('[ˈɔːtəm]')}, ${S('support')} ${T('[səˈpɔːt]')}</td></tr>
<tr><td>-er, -or, -ar, -our</td><td>${S('teacher')} ${T('[ˈtiːtʃə]')}, ${S('doctor')} ${T('[ˈdɒktə]')}, ${S('sugar')} ${T('[ˈʃʊɡə]')}, ${S('colour')} ${T('[ˈkʌlə]')}</td></tr></table></div>
<ol class="steps"><li>Найди <b>ударный</b> слог — его говори чётко.</li><li>Остальные гласные почти всегда превращаются в ${T('[ə]')} — говори их коротко и слабо.</li><li>В британском произношении <b>r</b> на конце слова не читается: teacher = «тиичэ».</li></ol>
<div class="box err"><b>Типичные ошибки</b>
✗ Читать «по буквам»: «док-ТОР», «ба-на-на» с тремя чёткими «а» → ✓ ${S('doctor')} «ДОКтэ», ${S('banana')} «бэНААнэ».<br>
✗ Говорить в конце «-ер», «-ор» → ✓ просто ${T('[ə]')}: ${S('computer')}, ${S('mother')}.<br>
✗ При письме ${T('[ə]')} ловушка: на слух не понять, какая буква. Пиши, как в словаре: doct<b>o</b>r, sist<b>e</b>r, sug<b>a</b>r, col<b>ou</b>r — как русские словарные слова.</div>`,
theory2:`<p>Представь, что ты очень устал и говоришь лениво. Ударный слог — громко и ясно, а все остальные — «э-э» коротко и тихо. Вот этот ленивый звук и есть ${T('[ə]')}.</p>
<p>${S('banana')} — «бэ-НАА-нэ»: только середина ясная.</p>
<p>${S('teacher')} — «ТИИ-чэ»: никакого «ер» на конце.</p>
<p>${S('about')} — «э-БАУТ».</p>
<p>Как в русском «молоко» — «мъл<b>а</b>ко»: безударные гласные звучат слабо.</p>`,
items:[
 {type:'listen', lvl:1, say:'banana', q:'Послушай. Где ударение в слове banana?', opts:['BA-na-na','ba-NA-na','ba-na-NA'], ans:1,
  why:`${S('banana')} ${T('[bəˈnɑːnə]')} — ударный только <b>второй</b> слог «НАА». Первый и последний — слабое ${T('[ə]')}.`,
  why2:`Ясно звучит только середина. Остальное — ленивое «э».`},
 {type:'listen', lvl:1, say:'teacher', q:'Послушай. Как звучит конец слова teacher?', opts:['коротко и слабо — [ə]','чётко «-ер»','чётко «-ар»'], ans:0,
  why:`${S('teacher')} ${T('[ˈtiːtʃə]')} — на конце слабое ${T('[ə]')}. Буква r в конце слова в британском английском не читается.`,
  why2:`-er в конце = просто «э»: teacher, mother, sister.`},
 {lvl:1, q:'В каком слоге слова <b>about</b> звучит [ə]?', opts:['в первом: a-','во втором: -bout','ни в каком'], ans:0, sayAfter:'about',
  why:`${S('about')} ${T('[əˈbaʊt]')} — ударение на второй слог (-bout), а первый, безударный, звучит как ${T('[ə]')}.`,
  why2:`Где нет ударения — там ${T('[ə]')}. В about ударный -bout, значит a- = ${T('[ə]')}.`},
 {lvl:1, q:'Вставь пропущенное. Помни: на месте [ə] букву не слышно — запоминай, как слово пишется.', text:"My mother {is*|are@en.s.to_be} a {doctor*|docter|doctar}.",
  why:`1) My mother = she → <b>is</b>. 2) ${S('doctor')} ${T('[ˈdɒktə]')}: на конце слышно ${T('[ə]')}, а пишется <b>-or</b>.`,
  why2:`1) Одна мама → is. 2) doctor — с o, как и actor, visitor.`},
 {type:'read', lvl:1, text:'My mother is a teacher.', q:'Прочитай вслух',
  why:`<b>mother</b> ${T('[ˈmʌðə]')} — «МАзэ», в конце ${T('[ə]')}. <b>a</b> — слабо ${T('[ə]')}. <b>teacher</b> ${T('[ˈtiːtʃə]')} — «ТИИчэ», без «р».`,
  why2:`Три слабых ${T('[ə]')}: mothe<b>r</b>, <b>a</b>, teache<b>r</b>. Ударные — MO и TEA.`},
 {type:'spell', lvl:1, say:'doctor', ans:['doctor'], q:'Послушай и напиши слово.',
  why:`<b>doctor</b>: в конце слышно ${T('[ə]')}, а пишется <b>-or</b>.`,
  why2:`d-o-c-t-o-r — две o.`},
 {type:'listen', lvl:2, say:'computer', q:'Послушай слово computer. Сколько в нём звуков [ə]?', opts:['один','два','ни одного'], ans:1,
  why:`${S('computer')} ${T('[kəmˈpjuːtə]')} — ударение на «пью». Первый слог com- и конец -ter — оба ${T('[ə]')}. Всего <b>два</b>.`,
  why2:`Ударный слог один (-pu-), а безударных два — значит, два ${T('[ə]')}.`},
 {lvl:2, q:'Выбери правильное написание. На месте [ə] букву не слышно — вспоминай, как слово пишется.', text:"Yesterday my {sister*|sistar|sistor} {bought*|buyed@en.6.past_irreg} a {banana*|banena|benana}.",
  why:`1) ${S('sister')} — на конце ${T('[ə]')}, пишется <b>-er</b>. 2) buy — неправильный глагол: buy — <b>bought</b> — bought. 3) ${S('banana')} — все три гласные <b>a</b>, хотя две из них звучат как ${T('[ə]')}.`,
  why2:`1) sister, brother, mother — на -er. 2) buy → bought. 3) banana — «три а».`},
 {lvl:2, q:'В каком слове <b>НЕТ</b> звука [ə]?', opts:['sofa','about','cat','teacher'], ans:2,
  why:`${S('cat')} ${T('[kæt]')} — один слог, он ударный, поэтому ${T('[ə]')} нет. В ${S('sofa')}, ${S('about')}, ${S('teacher')} есть безударные слоги с ${T('[ə]')}.`,
  why2:`${T('[ə]')} живёт только в безударных слогах. В коротком cat безударных слогов нет.`},
 {type:'spell', lvl:2, say:'sugar', ans:['sugar'], q:'Послушай и напиши слово (конец звучит как [ə]).',
  why:`<b>sugar</b> ${T('[ˈʃʊɡə]')}: начало «шу» пишется <b>su</b>, а конец ${T('[ə]')} — <b>-ar</b>.`,
  why2:`s-u-g-a-r. Слышим «шугэ», пишем sugar.`},
 {lvl:2, q:'Выбери правильное написание. На месте [ə] букву не слышно.', text:"Our {neighbour*|neighbar|neighbur} {has*|have@en.s.have_got} got a big dog.",
  why:`1) ${S('neighbour')} ${T('[ˈneɪbə]')} — на конце ${T('[ə]')}, а пишется британское <b>-our</b> (как colour). 2) Our neighbour = he / she → <b>has got</b>.`,
  why2:`1) neighbour — «сосед», запомни: neigh-bour. 2) he / she / it → has got.`},
 {type:'read', lvl:2, text:'Today is a good day for a picnic.', q:'Прочитай вслух',
  why:`<b>Today</b> ${T('[təˈdeɪ]')} — первый слог слабый, «тэДЕЙ». <b>a</b> — ${T('[ə]')}. <b>for a</b> — слабо и слитно: ${T('[fərə]')}. <b>picnic</b> ${T('[ˈpɪknɪk]')}.`,
  why2:`Ударные слова: DAY, GOOD, PIC-nic. Всё остальное — коротко: ${S('for a picnic')}.`},
 {type:'listen', lvl:3, say:'photographer', q:'Послушай слово photographer. Где ударение?', opts:['PHO-to-gra-pher','pho-TO-gra-pher','pho-to-GRA-pher'], ans:1,
  why:`${S('photographer')} ${T('[fəˈtɒɡrəfə]')} — ударение на <b>второй</b> слог. Остальные три гласных звучат как ${T('[ə]')}. Сравни: ${S('photograph')} ${T('[ˈfəʊtəɡrɑːf]')} — ударение на первом.`,
  why2:`photograph — ФО-то-граф, а photographer — фэ-ТО-грэ-фэ. Ударение «прыгает».`},
 {lvl:3, q:'Какая буква читается как [ə] в слове lemon [ˈlemən]?', opts:['e','o','m'], ans:1, sayAfter:'lemon',
  why:`В ${S('lemon')} ударение на первый слог (le-), там чёткое ${T('[e]')}. Безударное <b>o</b> во втором слоге → ${T('[ə]')}.`,
  why2:`Ударный слог — чёткий, безударный — ${T('[ə]')}. Безударная тут буква o.`},
 {lvl:3, q:'Выбери правильное написание. На месте [ə] букву не слышно.', text:"When I {was*|were@en.p.was_were} little, I wanted to be a {pilot*|pilat|pilet}.",
  why:`1) I → <b>was</b>. 2) ${S('pilot')} ${T('[ˈpaɪlət]')} — второй слог безударный, звучит ${T('[ə]')}, а пишется <b>o</b>.`,
  why2:`1) I was, we were. 2) pilot — «пайлэт», но пишется с o.`},
 {lvl:3, q:'Выбери правильное написание. На месте [ə] букву не слышно.', text:"There {are*|is@en.p.there_is} seven {colours*|colers|colars} in a rainbow.",
  why:`1) seven colours — много → <b>There are</b>. 2) ${S('colours')} ${T('[ˈkʌləz]')} — безударный конец ${T('[ə]')} в британском написании <b>-our</b>.`,
  why2:`1) Много → are. 2) colour — с our, как neighbour, favourite.`},
 {type:'read', lvl:3, text:'The children are going to the cinema on Saturday.', q:'Прочитай вслух',
  why:`Слабые ${T('[ə]')}: <b>The</b> ${T('[ðə]')}, child<b>ren</b> ${T('[ˈtʃɪldrən]')}, <b>are</b> ${T('[ə]')}, <b>to the</b> ${T('[tə ðə]')}, cin<b>e</b>m<b>a</b> ${T('[ˈsɪnəmə]')}, Sat<b>ur</b>day ${T('[ˈsætədeɪ]')}. Ударные — CHIL-, GO-, CI-, SAT-.`,
  why2:`Выдели голосом только ударные слоги, остальное — коротко. Послушай 🐢.`},
 {type:'listen', lvl:3, say:'Canada', q:'Послушай слово Canada. Сколько в нём звуков [ə]?', opts:['ни одного','один','два'], ans:2,
  why:`${S('Canada')} ${T('[ˈkænədə]')} — ударный первый слог «КЭ», а -na- и -da оба звучат ${T('[ə]')}. Всего <b>два</b>.`,
  why2:`Три слога, ударный один → два безударных → два ${T('[ə]')}.`}
]});

/* ===================== Weak forms ===================== */
RU.rule({
id:'en.8.ph_weak',
short:`Маленькие служебные слова (to, for, can, was, and, of, at, from, a, the) в потоке речи звучат <b>слабо</b>, с ${T('[ə]')}: ${S('a cup of tea')} ${T('[ə ˈkʌp əv ˈtiː]')}.`,
theory:`<p>Англичане выделяют голосом <b>важные</b> слова (существительные, глаголы, прилагательные), а маленькие служебные — «проглатывают». У каждого такого слова есть <b>сильная</b> форма (отдельно, под ударением) и <b>слабая</b> (в предложении).</p>
<table class="sym"><tr><th>Слово</th><th>Сильно</th><th>Слабо (обычно)</th><th>Пример</th></tr>
<tr><td>to</td><td>${T('[tuː]')}</td><td>${T('[tə]')}</td><td>${S('I want to go.')}</td></tr>
<tr><td>for</td><td>${T('[fɔː]')}</td><td>${T('[fə]')}</td><td>${S('This is for you.')}</td></tr>
<tr><td>can</td><td>${T('[kæn]')}</td><td>${T('[kən]')}</td><td>${S('I can swim.')}</td></tr>
<tr><td>was</td><td>${T('[wɒz]')}</td><td>${T('[wəz]')}</td><td>${S('She was at home.')}</td></tr>
<tr><td>and</td><td>${T('[ænd]')}</td><td>${T('[ən]')}, ${T('[n]')}</td><td>${S('fish and chips')}</td></tr>
<tr><td>of</td><td>${T('[ɒv]')}</td><td>${T('[əv]')}</td><td>${S('a cup of tea')}</td></tr>
<tr><td>at</td><td>${T('[æt]')}</td><td>${T('[ət]')}</td><td>${S('at six o\'clock')}</td></tr>
<tr><td>from</td><td>${T('[frɒm]')}</td><td>${T('[frəm]')}</td><td>${S('I\'m from Russia.')}</td></tr></table>
<div class="box rule"><b>Когда слово звучит СИЛЬНО</b>
1) В <b>конце</b> предложения: ${S('What are you looking at?')} — at ${T('[æt]')}.<br>
2) В <b>коротком ответе</b>: ${S('Yes, I can.')} ${T('[kæn]')}, ${S('Yes, he was.')} ${T('[wɒz]')}.<br>
3) Когда на слово делают <b>особое ударение</b>.</div>
<div class="box tip"><b>can или can't?</b>${S('I can swim.')} — can слабое «кэн», ударение на swim.<br>${S('I can\'t swim.')} — can't сильное ${T('[kɑːnt]')} «каант», ударны оба слова.<br>Слышишь короткое «кн» — это can, слышишь долгое «аа» — can't.</div>
<div class="box err"><b>Типичные ошибки</b>
✗ Читать каждое слово громко и чётко «Ай — вонт — ту — гоу» → ✓ ${S('I want to go.')} «ай вонтэ гоу».<br>
✗ На слух не узнать слово: ${T('[əv]')} — это of, а не off; ${T('[tə]')} — это to, а не two / too.<br>
✗ Писать «a cup off tea», «fish an chips» — ✓ a cup <b>of</b> tea, fish <b>and</b> chips.</div>`,
theory2:`<p>Представь музыку: важные слова — это громкие барабаны, а маленькие слова — тихие шорохи между ними. Ты их слышишь, но еле-еле.</p>
<p>${S('a cup of tea')} — «э КАП эв ТИИ»: громко только cup и tea.</p>
<p>${S('fish and chips')} — «ФИШ н ЧИПС»: and превратилось почти в одно «н».</p>
<p>${S('I want to go.')} — to звучит как короткое «тэ».</p>
<p>Секрет: громко — <b>важные</b> слова, коротко — всё остальное.</p>`,
items:[
 {type:'listen', lvl:1, say:'I can swim.', q:'Послушай. Человек умеет плавать или нет?', opts:['умеет (can)','не умеет (can’t)'], ans:0,
  why:`${S('I can swim.')} — can звучит коротко и слабо ${T('[kən]')}, ударение на swim. Значит, <b>can</b> — умеет.`,
  why2:`Короткое «кн» = can. Долгое «каант» = can't.`},
 {type:'listen', lvl:1, say:'I can\'t swim.', q:'Послушай. Человек умеет плавать или нет?', opts:['умеет (can)','не умеет (can’t)'], ans:1,
  why:`${S('I can\'t swim.')} — can't звучит сильно, с долгим ${T('[ɑː]')}: ${T('[kɑːnt]')}. Значит, <b>не умеет</b>.`,
  why2:`can't никогда не бывает слабым — оно всегда громкое и долгое.`},
 {lvl:1, q:'Как обычно звучит <b>to</b> в предложении «I want to go home»?', opts:['[tə] — коротко и слабо','[tuː] — как two','чётко «ту»'], ans:0, sayAfter:'I want to go home.',
  why:`В предложении to — служебное слово, поэтому слабое: ${T('[tə]')}. ${S('I want to go home.')}`,
  why2:`Маленькие слова в середине предложения — слабые. to = «тэ».`},
 {lvl:1, q:'Ты слышишь: «I want [tə] buy a cup [əv] tea». Какие слова здесь звучат слабо? Вставь их.', text:"I want {to*|too|two} buy a cup {of*|off|on} tea.",
  why:`1) ${T('[tə]')} — слабая форма <b>to</b> (too и two всегда звучат долго ${T('[tuː]')}). 2) ${T('[əv]')} — слабая форма <b>of</b>: a cup of tea. off звучит ${T('[ɒf]')}, on — ${T('[ɒn]')}.`,
  why2:`1) want to — «хочу». 2) a cup of — «чашка чего?» → of.`},
 {lvl:1, q:'Ты слышишь: «a cup [əv] tea». Вставь пропущенные слова.', text:"She {buys*|buy@en.5.ps} a cup {of*|off|on} tea every morning.",
  why:`1) She + every morning → Present Simple с <b>-s</b>: <b>buys</b>. 2) ${T('[əv]')} = <b>of</b>: a cup of tea.`,
  why2:`1) he / she / it → -s. 2) «чашка чего» = a cup of.`},
 {type:'read', lvl:1, text:'I want to go for a walk.', q:'Прочитай вслух',
  why:`Громко — <b>want</b>, <b>go</b>, <b>walk</b>. Слабо: <b>to</b> ${T('[tə]')}, <b>for a</b> ${T('[fərə]')}. <b>walk</b> ${T('[wɔːk]')} — l не читается!`,
  why2:`«ай ВОНТ тэ ГОУ фэрэ ВООК». Послушай 🐢 и повтори в таком же ритме.`},
 {type:'spell', lvl:1, say:'fish and chips', ans:['fish and chips'], q:'Послушай и напиши три слова. Слово and здесь звучит почти как [n].',
  why:`<b>fish and chips</b> — and в быстрой речи звучит ${T('[ən]')} или просто ${T('[n]')}, но пишется полностью: a-n-d.`,
  why2:`Слышим «фишнчипс», пишем fish and chips.`},
 {lvl:2, q:'Ты слышишь: «She [wəz] at home [ən] her brother was at school». Вставь слова.', text:"Yesterday she {was*|were@en.p.was_were} at home {and*|an|end} her brother was at school.",
  why:`1) she → <b>was</b> (were — для we / you / they). 2) ${T('[ən]')} — слабая форма <b>and</b>. an — артикль, end — «конец».`,
  why2:`1) she was. 2) «и» = and, даже если звучит как «эн».`},
 {type:'listen', lvl:2, say:'This present is for you.', q:'Послушай. Какое слово прозвучало слабо, как [fə]?', opts:['for','four','from'], ans:0,
  why:`${S('This present is for you.')} — for звучит слабо ${T('[fə]')}. four («четыре») всегда сильное ${T('[fɔː]')}, from — ${T('[frəm]')}.`,
  why2:`«Для тебя» = for you. Слабое «фэ».`},
 {lvl:2, q:'В каком предложении can звучит <b>сильно</b> [kæn]?', opts:['I can swim.','Can you help me?','Yes, I can.'], ans:2, sayAfter:'Yes, I can.',
  why:`В коротком ответе ${S('Yes, I can.')} can стоит в конце и звучит сильно ${T('[kæn]')}. В остальных — слабое ${T('[kən]')}.`,
  why2:`Конец предложения и короткий ответ → сильная форма.`},
 {type:'spell', lvl:2, say:'a glass of milk', ans:['a glass of milk'], q:'Послушай и напиши четыре слова.',
  why:`<b>a glass of milk</b>: a — ${T('[ə]')}, of — слабое ${T('[əv]')}. Пишется of (не off!).`,
  why2:`«Стакан чего?» → of: a glass of milk.`},
 {lvl:2, q:'Ты слышишь: «My friend comes [frəm] Spain. His plane arrives [ət] six». Вставь слова.', text:"My friend comes {from*|for|form} Spain. His plane arrives {at*|in|on@en.5.prep_time} six o'clock.",
  why:`1) ${T('[frəm]')} — слабая форма <b>from</b> («из»). form — «форма», for — ${T('[fə]')}. 2) Время по часам → <b>at</b>: at six o'clock.`,
  why2:`1) «из Испании» = from Spain. 2) Часы — at.`},
 {type:'read', lvl:2, text:'We were at home and the children were asleep.', q:'Прочитай вслух',
  why:`<b>were</b> в середине — слабо ${T('[wə]')}. <b>at</b> — ${T('[ət]')}, <b>and the</b> — ${T('[ən ðə]')}. Громко: <b>home</b>, <b>children</b>, <b>asleep</b> ${T('[əˈsliːp]')}.`,
  why2:`Ритм: «уи вэ эт ХОУМ эн зэ ЧИЛдрэн вэ эСЛИИП».`},
 {type:'listen', lvl:2, say:'I bought some bread and milk.', q:'Послушай. Что купили?', opts:['хлеб и молоко','только хлеб','хлеб и мёд'], ans:0,
  why:`${S('I bought some bread and milk.')} — and звучит слабо ${T('[ən]')}, но оно есть: хлеб <b>и</b> молоко.`,
  why2:`«брэд н милк» — and спрятано между словами.`},
 {lvl:3, q:'Как звучит <b>at</b> в вопросе «What are you looking at?»', opts:['сильно [æt] — предлог в конце предложения','слабо [ət]'], ans:0, sayAfter:'What are you looking at?',
  why:`Предлог стоит в самом <b>конце</b> предложения — поэтому сильная форма ${T('[æt]')}. А вот <b>are</b> в середине — слабое ${T('[ə]')}.`,
  why2:`В конце предложения маленькие слова «просыпаются» и звучат полностью.`},
 {lvl:3, q:'— Was he at home? — Yes, he was. Как звучит was в коротком ответе?', opts:['[wɒz] — сильно','[wəz] — слабо'], ans:0, sayAfter:'Yes, he was.',
  why:`В коротком ответе ${S('Yes, he was.')} was стоит в конце и звучит сильно ${T('[wɒz]')}. А в вопросе «Was he…» — слабо ${T('[wəz]')}.`,
  why2:`Короткие ответы (Yes, I can. Yes, he was.) — всегда сильная форма.`},
 {lvl:3, q:'Ты слышишь: «My sister [kən] play … guitar [ən] the piano». Вставь слова.', text:"My sister {can*|can't} play {the*|_@en.5.articles} guitar {and*|an|end} the piano.",
  why:`1) ${T('[kən]')} — слабое, значит <b>can</b> (can't всегда сильное ${T('[kɑːnt]')}). 2) С музыкальными инструментами — <b>the</b>: play the guitar. 3) ${T('[ən]')} = <b>and</b>.`,
  why2:`1) Короткое «кэн» → can. 2) play the + инструмент. 3) «и» → and.`},
 {lvl:3, q:'Ты слышишь: «There [wəz] a lot [əv] snow last winter». Вставь слова.', text:"There {was*|were@en.p.there_is} a lot {of*|off|on} snow last winter.",
  why:`1) snow — неисчисляемое → <b>There was</b> (в прошлом от there is). 2) ${T('[əv]')} = <b>of</b>: a lot of.`,
  why2:`1) Снег не считают → was. 2) a lot of — «много».`},
 {type:'read', lvl:3, text:'Can you come to my party on Saturday?', q:'Прочитай вслух',
  why:`<b>Can</b> в начале вопроса — слабо ${T('[kən]')}. <b>to</b> — ${T('[tə]')}. Громко: <b>come</b>, <b>party</b>, <b>Saturday</b> ${T('[ˈsætədeɪ]')}. В конце голос идёт вверх ↗.`,
  why2:`Ритм: «кэн ю КАМ тэ май ПАти он САтэдей?»`}
]});

/* ===================== Silent letters ===================== */
RU.rule({
id:'en.8.ph_silent',
short:`В некоторых словах буквы пишутся, но <b>не читаются</b>: <b>k</b>nee, <b>w</b>rite, lis<b>t</b>en, clim<b>b</b>, <b>h</b>our, i<b>s</b>land, We<b>d</b>nesday.`,
theory:`<p>Когда-то давно англичане эти буквы произносили, а потом перестали — а написание осталось. Поэтому слова приходится запоминать, как русские «солнце» или «лестница» (где тоже есть непроизносимые согласные!).</p>
<table class="sym"><tr><th>Сочетание</th><th>Не читается</th><th>Примеры</th></tr>
<tr><td><b>kn-</b> в начале</td><td>k</td><td>${S('knee')} ${T('[niː]')}, ${S('knife')} ${T('[naɪf]')}, ${S('know')} ${T('[nəʊ]')}, ${S('knock')}</td></tr>
<tr><td><b>wr-</b> в начале</td><td>w</td><td>${S('write')} ${T('[raɪt]')}, ${S('wrong')} ${T('[rɒŋ]')}, ${S('wrist')}</td></tr>
<tr><td><b>-mb</b> в конце</td><td>b</td><td>${S('climb')} ${T('[klaɪm]')}, ${S('lamb')}, ${S('comb')}, ${S('thumb')}</td></tr>
<tr><td><b>-sten, -stle</b></td><td>t</td><td>${S('listen')} ${T('[ˈlɪsn]')}, ${S('castle')} ${T('[ˈkɑːsl]')}, ${S('whistle')}</td></tr>
<tr><td><b>h</b> в начале (некоторые слова)</td><td>h</td><td>${S('hour')} ${T('[ˈaʊə]')}, ${S('honest')} ${T('[ˈɒnɪst]')}</td></tr>
<tr><td>особые слова</td><td>s, d, l, u</td><td>${S('island')} ${T('[ˈaɪlənd]')}, ${S('Wednesday')} ${T('[ˈwenzdeɪ]')}, ${S('walk')}, ${S('half')}, ${S('could')}, ${S('guitar')}</td></tr></table>
<div class="box tip"><b>an hour, an honest man</b>Раз <b>h</b> не читается, слово начинается с <b>гласного звука</b> → артикль <b>an</b>: ${S('an hour')}, ${S('an honest boy')}. Но ${S('a house')}, ${S('a horse')} — там h читается.</div>
<div class="box tip"><b>Как запомнить</b>Придумай «секретное» чтение для письма: «К-нифе», «В-рите», «Лис-тен», «Вед-нес-дей». Читаешь по-английски правильно, а про себя для письма — по буквам.</div>
<div class="box err"><b>Типичные ошибки</b>
✗ «книфе», «кни» → ✓ ${S('knife')} «найф», ${S('knee')} «нии».<br>
✗ «листен», «кастл» с «т» → ✓ ${S('listen')} «лисн», ${S('castle')} «каасл».<br>
✗ «климб» → ✓ ${S('climb')} «клайм».<br>
✗ При письме терять немые буквы: «nife», «rong», «lisen», «Wensday».<br>
Слова-«близнецы» по звучанию: ${S('know')} = no, ${S('knew')} = new, ${S('write')} = right, ${S('hour')} = our — различай по смыслу.</div>`,
theory2:`<p>Немые буквы — как «невидимки»: на бумаге они есть, а в звуке их нет. Как в русском «со<b>л</b>нце» — «л» мы пишем, но не говорим.</p>
<p>${S('knee')} — «нии» (k спит). ${S('write')} — «райт» (w спит). ${S('listen')} — «лисн» (t спит).</p>
<p>${S('hour')} — «ауэ» (h спит), поэтому ${S('an hour')}.</p>
<p>Правило-подсказка: <b>kn</b> и <b>wr</b> в начале слова — первая буква всегда молчит.</p>`,
items:[
 {type:'listen', lvl:1, say:'knee', q:'Послушай. Какую букву в слове knee НЕ произносят?', opts:['k','n','e'], ans:0,
  why:`${S('knee')} ${T('[niː]')} — «нии». В начале <b>kn-</b> буква <b>k</b> всегда молчит.`,
  why2:`kn в начале = просто «н»: knee, knife, know.`},
 {lvl:1, q:'Как читается слово <b>write</b>?', opts:['[raɪt]','[wraɪt]','[vraɪt]'], ans:0, sayAfter:'write',
  why:`${S('write')} ${T('[raɪt]')} — в начале <b>wr-</b> буква <b>w</b> не читается.`,
  why2:`wr = «р»: write, wrong, wrist.`},
 {lvl:1, q:'Выбери правильное написание (в этом слове есть «немая» буква).', text:"I cut my finger with {a*|an@en.s.a_an} {knife*|nife|knaif}.",
  why:`1) ${S('knife')} начинается со звука ${T('[n]')} (согласный) → <b>a</b> knife. 2) Пишется <b>kn</b>ife: k не читается, но пишется, на конце немая e.`,
  why2:`1) Согласный звук → a. 2) knife — «найф», но на письме k-n-i-f-e.`},
 {type:'spell', lvl:1, say:'knife', ans:['knife'], q:'Послушай и напиши слово «нож». Не забудь немую букву!',
  why:`<b>knife</b> — k-n-i-f-e. Слышим «найф», а пишем с <b>k</b> в начале и <b>e</b> на конце.`,
  why2:`«К-нифе» — так можно запомнить написание.`},
 {type:'read', lvl:1, text:'I hurt my knee at school.', q:'Прочитай вслух',
  why:`<b>knee</b> ${T('[niː]')} — «нии», k не читается! <b>hurt</b> ${T('[hɜːt]')} — «хёт», r не читается. <b>school</b> ${T('[skuːl]')} — ch здесь звучит как «к».`,
  why2:`Ловушки: knee — без «к», school — «скуул». Послушай 🐢.`},
 {lvl:1, q:'Выбери правильный вариант (в слове «час» буква h не читается).', text:"We waited for {an*|a@en.s.a_an} {hour*|our|houre}.",
  why:`1) В ${S('hour')} ${T('[ˈaʊə]')} h не читается → слово начинается с гласного звука → <b>an</b> hour. 2) «Час» пишется <b>hour</b>; our — это «наш» (звучит так же!).`,
  why2:`1) Слышим «ауэ» — гласный звук → an. 2) hour (час) и our (наш) — близнецы по звуку.`},
 {type:'listen', lvl:2, say:'castle', q:'Послушай. Какую букву не произносят в слове castle?', opts:['t','s','c'], ans:0,
  why:`${S('castle')} ${T('[ˈkɑːsl]')} — «каасл». Буква <b>t</b> в -stle молчит.`,
  why2:`castle, whistle, listen — t спит после s.`},
 {lvl:2, q:'Выбери правильное написание (в слове climb буква b не читается).', text:"My dad {climbed*|climed|climbd} the {highest*|most high@en.6.comparatives} mountain in Europe.",
  why:`1) ${S('climbed')} ${T('[klaɪmd]')} — b не слышно, но пишется: climb + <b>ed</b>. 2) high — короткое слово → «самая высокая» = <b>the highest</b>.`,
  why2:`1) climb + ed = climbed (b остаётся). 2) high → higher → the highest.`},
 {lvl:2, q:'В каком слове <b>НЕТ</b> немой буквы?', opts:['island','Wednesday','window','honest'], ans:2,
  why:`${S('window')} ${T('[ˈwɪndəʊ]')} — читаются все согласные. А в ${S('island')} молчит s, в ${S('Wednesday')} — d, в ${S('honest')} — h.`,
  why2:`island — «айлэнд», Wednesday — «уэнздей», honest — «онист». А window — «уиндоу», всё слышно.`},
 {type:'spell', lvl:2, say:'Wednesday', ans:['Wednesday'], q:'Послушай и напиши день недели.',
  why:`<b>Wednesday</b> ${T('[ˈwenzdeɪ]')} — слышим «уэнздей», а пишем W-e-<b>d</b>-n-e-s-d-a-y. Первая d и вторая e не читаются.`,
  why2:`Запомни по-секретному: «Вед-нес-дей».`},
 {lvl:2, q:'Выбери правильное написание (в начале слова wr- буква w не читается).', text:"Sorry, it {was*|were@en.p.was_were} my mistake. I gave you the {wrong*|rong|vrong} answer.",
  why:`1) it → <b>was</b>. 2) ${S('wrong')} ${T('[rɒŋ]')} — «ронг», пишется с <b>w</b>: wrong.`,
  why2:`1) it was. 2) wr = «р»: wrong, write.`},
 {type:'read', lvl:2, text:'We visited an old castle on an island.', q:'Прочитай вслух',
  why:`<b>castle</b> ${T('[ˈkɑːsl]')} — без «т». <b>island</b> ${T('[ˈaɪlənd]')} — без «с». <b>an old</b>, <b>an island</b> — читай слитно: «энОУлд», «энАЙлэнд».`,
  why2:`Две немые буквы: cas<b>t</b>le и i<b>s</b>land. Послушай 🐢.`},
 {type:'listen', lvl:3, say:'honest', q:'Послушай. С какого звука начинается слово honest?', opts:['с гласного [ɒ] — h не читается','с [h]'], ans:0,
  why:`${S('honest')} ${T('[ˈɒnɪst]')} — «онист», h молчит. Поэтому говорят ${S('an honest man')}.`,
  why2:`honest и hour — h спит. А в house, horse, happy — h читается.`},
 {lvl:3, q:'Какая пара слов звучит <b>одинаково</b>?', opts:['know — no','knee — key','listen — lesson'], ans:0, sayAfter:'know, no',
  why:`${S('know')} ${T('[nəʊ]')} и ${S('no')} ${T('[nəʊ]')} — одинаково, потому что k молчит. knee ${T('[niː]')} и key ${T('[kiː]')} — разные, listen ${T('[ˈlɪsn]')} и lesson ${T('[ˈlesn]')} — разные гласные.`,
  why2:`kn = n, поэтому know звучит как no. Различаем только по смыслу.`},
 {lvl:3, q:'Выбери правильный вариант.', text:"He is {an*|a@en.s.a_an} {honest*|onest|honist} man. He never tells lies.",
  why:`1) В ${S('honest')} h не читается → гласный звук → <b>an</b> honest man. 2) Пишется <b>h</b>onest.`,
  why2:`1) Слышим «онист» → an. 2) h пишем, но не читаем.`},
 {lvl:3, q:'Выбери правильное написание (слова know, now, no похожи!).', text:"Do you {know*|now|no} the answer? — No, I {don't*|doesn't@en.5.ps}.",
  why:`1) «Знаешь?» → <b>know</b> (с немой k). now — «сейчас», no — «нет». 2) I → <b>don't</b> (doesn't — только для he / she / it).`,
  why2:`1) Do you know…? — «знаешь ли ты». 2) I / you / we / they → don't.`},
 {type:'spell', lvl:3, say:'listen', ans:['listen'], q:'Послушай и напиши слово.',
  why:`<b>listen</b> ${T('[ˈlɪsn]')} — «лисн», но пишется с <b>t</b>: lis-t-en.`,
  why2:`«Лис-тен» — секретное чтение для письма.`},
 {type:'read', lvl:3, text:'On Wednesday we climbed a hill and listened to the birds.', q:'Прочитай вслух',
  why:`<b>Wednesday</b> ${T('[ˈwenzdeɪ]')} — «уЭНЗдей». <b>climbed</b> ${T('[klaɪmd]')} — «клаймд», без «б». <b>listened</b> ${T('[ˈlɪsnd]')} — «лиснд», без «т». <b>birds</b> ${T('[bɜːdz]')}.`,
  why2:`Три немые буквы: We<b>d</b>nesday, clim<b>b</b>ed, lis<b>t</b>ened. Послушай 🐢.`},
 {lvl:3, q:'Почему говорят <b>an hour</b>, но <b>a house</b>?', opts:['В hour буква h не читается, и слово начинается с гласного звука.','Потому что hour — длинное слово.','Это исключение без причины.'], ans:0, sayAfter:'an hour, a house',
  why:`Артикль выбирают по <b>звуку</b>, а не по букве. ${S('hour')} ${T('[ˈaʊə]')} начинается с гласного звука → an. ${S('house')} ${T('[haʊs]')} — с ${T('[h]')} → a.`,
  why2:`Слышишь гласный звук в начале → an. Слышишь согласный → a.`}
]});

/* ===================== Итоговое упражнение 8 класса ===================== */
RU.mix(8, [
 {lvl:1, text:"Look! It {has been snowing*|is snowing yet|snows@en.8.ppc} since morning, and the streets {are*|is@en.s.to_be} white.",
  why:`1) since morning — с утра и до сих пор → <b>has been snowing</b>. 2) the streets — много улиц → <b>are</b>.`,
  why2:`1) «Идёт с утра» = has been + -ing. 2) Много → are.`},
 {lvl:1, text:"This bridge {was built*|built|is built@en.8.passive} a hundred years ago. It is the {oldest*|older|most old@en.6.comparatives} bridge in our town.",
  why:`1) Мост построили (пассив), ago → прошлое → <b>was built</b>. 2) the + «самый» → <b>the oldest</b>.`,
  why2:`1) was + V3. 2) old → older → the oldest.`},
 {lvl:1, text:"I enjoy {swimming*|to swim@en.8.ger_inf} in {the*|_@en.8.articles_geo} Black Sea every summer.",
  why:`1) enjoy + -ing → <b>swimming</b>. 2) Море → <b>the</b> Black Sea.`,
  why2:`1) enjoy — из команды -ing. 2) Вода → the.`},
 {lvl:1, text:"If I {had*|have@en.8.cond_2} a car, I {would drive*|will drive@en.8.cond_2} to the mountains.",
  why:`Машины нет — это мечта, 2-й тип: if + Past (<b>had</b>), <b>would drive</b>.`,
  why2:`«Если бы была…, поехал бы…» → had + would.`},
 {lvl:1, text:"My uncle {sings*|sing@en.5.ps} very well. He is a famous {singer*|singment|singness@en.8.word_form}. SING",
  why:`1) My uncle = he → <b>sings</b>. 2) Человек, который поёт → sing + -er = <b>singer</b>.`,
  why2:`1) he → -s. 2) -er = человек.`},
 {lvl:1, text:"When I came home, my parents {had already eaten*|have already eaten|already eat@en.8.past_perf} dinner.",
  why:`Сначала родители поужинали, потом я пришёл → <b>had already eaten</b>.`,
  why2:`«Уже к моему приходу» → had + V3.`},
 {lvl:2, text:"Last Monday Mike said, “I {am*|is@en.s.to_be} ill today.” → Mike said that he {was*|were|be@en.8.reported} ill that day.",
  why:`1) I → <b>am</b>. 2) В пересказе am → <b>was</b>, today → that day.`,
  why2:`1) I am. 2) Шаг назад: am → was.`},
 {lvl:2, text:"We {have been waiting*|are waiting|wait@en.8.ppc} for you {for*|since@en.7.pp_words} two hours!",
  why:`1) Ждём до сих пор → <b>have been waiting</b>. 2) two hours — отрезок → <b>for</b>.`,
  why2:`1) «Уже два часа ждём» → have been + -ing. 2) Сколько? → for.`},
 {lvl:2, text:"{The*|_@en.8.articles_geo} Volga flows into {the*|_@en.8.articles_geo} Caspian Sea.",
  why:`Река → <b>the</b> Volga, море → <b>the</b> Caspian Sea.`,
  why2:`Вода — всегда the.`},
 {lvl:2, text:"How {many*|much@en.6.much_many} languages {are spoken*|is spoken|speak@en.8.passive} in India?",
  why:`1) languages можно посчитать → <b>many</b>. 2) На языках говорят (пассив), languages — много → <b>are spoken</b>.`,
  why2:`1) Считаемое → many. 2) are + V3.`},
 {lvl:2, text:"She refused {to tell*|telling@en.8.ger_inf} me {her*|she|hers@en.p.possessive} secret.",
  why:`1) refuse + to → <b>to tell</b>. 2) «её секрет» — перед существительным притяжательное <b>her</b>.`,
  why2:`1) refuse — из команды to. 2) her + существительное.`},
 {lvl:2, text:"My brother is very {careless*|careful|caring@en.8.word_form} — he {has lost*|have lost@en.7.pres_perf} his keys three times this month. CARE",
  why:`1) Теряет ключи → небрежный → <b>careless</b>. 2) he → <b>has</b> lost (this month ещё не закончился → Present Perfect).`,
  why2:`1) Смысл плохой → -less. 2) he → has.`},
 {lvl:2, text:"If you {practised*|practise@en.8.cond_2} more, you would play the guitar {better*|gooder|more good@en.6.comparatives}.",
  why:`1) you would play → 2-й тип → <b>practised</b> (Past). 2) well → <b>better</b>.`,
  why2:`1) would в одной части → Past в другой. 2) good / well → better.`},
 {lvl:2, text:"Yesterday Olga told {me*|to me@en.8.reported} that she {had seen*|has seen|sees@en.8.reported} a fox in the forest.",
  why:`1) told + кому без to → <b>told me</b>. 2) В пересказе прошлое → <b>had seen</b>.`,
  why2:`1) told me = said to me. 2) Шаг назад → had + V3.`},
 {lvl:3, text:"We stopped {to look*|looking@en.8.ger_inf} at the map because we {were*|was@en.p.was_were} lost.",
  why:`1) Заблудились → остановились, <b>чтобы</b> посмотреть карту → <b>stopped to look</b>. 2) we → <b>were</b>.`,
  why2:`1) stop to = «чтобы». 2) we were.`},
 {lvl:3, text:"{The*|_@en.8.articles_geo} Alps are {more beautiful*|beautifuller|most beautiful@en.6.comparatives} than I expected.",
  why:`1) Горная цепь → <b>the</b> Alps. 2) Длинное слово + than → <b>more beautiful</b>.`,
  why2:`1) Много гор → the. 2) more + длинное слово.`},
 {lvl:3, text:"The window {was broken*|has broken|is broke@en.8.passive} last night. {Did*|Were@en.6.past_neg_q} you hear anything?",
  why:`1) Окно разбили вчера ночью → <b>was broken</b>. 2) Вопрос в Past Simple с глаголом hear → <b>Did</b> you hear.`,
  why2:`1) was + V3. 2) Did + ты + глагол?`},
 {lvl:3, text:"By the time we got to the station, the train {had left*|has left|leaves@en.8.past_perf}, so we {had to*|must@en.6.must_have_to} take a taxi.",
  why:`1) Поезд ушёл раньше нашего прихода → <b>had left</b>. 2) must в прошлом не бывает → <b>had to</b>.`,
  why2:`1) by the time → had + V3. 2) Прошлое «пришлось» = had to.`},
 {lvl:3, text:"I {have known*|have been knowing@en.8.ppc} Tom since we {were*|are|have been@en.7.pp_words} five.",
  why:`1) know — глагол-состояние → <b>have known</b> (без -ing). 2) После since — момент в прошлом, Past Simple: <b>were</b>.`,
  why2:`1) know не ставим в -ing. 2) since + прошедшее: since we were five.`},
 {lvl:3, text:"It is {impossible*|unpossible|dispossible@en.8.word_form} to climb {_*|the@en.8.articles_geo} Mount Everest in one day. POSSIBLE",
  why:`1) possible → <b>impossible</b> (im- перед p). 2) Одна гора → <b>без артикля</b>.`,
  why2:`1) im + possible. 2) Mount + имя — без the.`},
 {lvl:3, text:"What would you do if you {found*|find@en.8.cond_2} {a*|an@en.s.a_an} wallet in the street?",
  why:`1) would you do → 2-й тип → <b>found</b> (find — found). 2) wallet начинается с согласного звука → <b>a</b>.`,
  why2:`1) would → Past после if. 2) Согласный звук → a.`}
]);
})();
