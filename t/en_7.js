/* Английский язык — 7 класс. Грамматика: Past Continuous, Present Perfect, used to, относительные местоимения,
   условные 0/1 типа, модальные глаголы. Фонетика: /w/–/v/, /ŋ/, интонация вопросов. */
(function(){
const s=(t,l)=>`<span class="say" data-say="${t}">${l||t}</span>`;
const tr=t=>`<span class="tr">[${t}]</span>`;

/* ===================== Past Continuous ===================== */
RU.rule({
id:'en.7.past_cont',
short:'Past Continuous = <b>was / were + глагол с -ing</b>. Действие <b>шло</b> (было в процессе) в определённый момент прошлого: <i>At seven o’clock yesterday I <b>was reading</b>.</i>',
theory:`<p><b>Past Continuous</b> — «прошедшее длительное». Оно показывает, что действие <b>шло, продолжалось</b> в какой-то момент в прошлом. Представь: ты поставил вчерашнее видео на паузу — и видишь человека <b>посреди</b> действия.</p>
<div class="box rule"><b>Формула</b><b>was / were + глагол-ing</b><br>I / he / she / it → <b>was</b> reading<br>you / we / they → <b>were</b> reading</div>
<table class="sym"><tr><th></th><th>I, he, she, it</th><th>you, we, they</th></tr>
<tr><td>+</td><td>${s('He was sleeping.')}</td><td>${s('They were sleeping.')}</td></tr>
<tr><td>−</td><td>${s('He wasn’t sleeping.')}</td><td>${s('They weren’t sleeping.')}</td></tr>
<tr><td>?</td><td>${s('Was he sleeping?')}</td><td>${s('Were they sleeping?')}</td></tr></table>
<p>Короткие ответы: ${s('Yes, I was.')} / ${s('No, I wasn’t.')} / ${s('Yes, they were.')} / ${s('No, they weren’t.')}</p>
<div class="box ex"><b>Примеры</b>${s('At seven o’clock yesterday I was reading a book.')}<br>${s('At midnight my dad was watching football.')}<br>${s('What were you doing at five o’clock yesterday?')}</div>
<div class="box tip"><b>Слова-подсказки</b>${s('at five o’clock yesterday')}, ${s('at that moment')}, ${s('at midnight')}, ${s('all day yesterday')}, ${s('from two to four yesterday')}, ${s('while')} (пока).</div>
<div class="box rule"><b>Как добавить -ing</b>${s('read')} → ${s('reading')} (просто -ing)<br>${s('write')} → ${s('writing')}, ${s('make')} → ${s('making')} (немая e уходит)<br>${s('swim')} → ${s('swimming')}, ${s('run')} → ${s('running')}, ${s('sit')} → ${s('sitting')} (короткий ударный гласный + одна согласная → согласную удваиваем)<br>${s('lie')} → ${s('lying')} (ie → y)</div>
<div class="box tip"><b>Как запомнить</b>Вопрос «<b>Что ты делал</b> вчера в 7 часов?» — по-русски «делал», то есть был в процессе. was / were = «был(и)», -ing = «в процессе».</div>
<div class="box err"><b>Типичные ошибки</b>✗ I was go → ✓ ${s('I was going.')}<br>✗ They was playing → ✓ ${s('They were playing.')}<br>✗ At seven I reading → ✓ ${s('At seven I was reading.')} (без was / were нельзя!)<br>✗ I was knowing → ✓ ${s('I knew.')} Глаголы «состояния» (${s('know')}, ${s('like')}, ${s('want')}, ${s('understand')}, ${s('love')}) обычно не ставят в -ing.</div>`,
theory2:`<p>Представь фотографию: вчера, ровно в 7 вечера, щёлк! На фото ты <b>читаешь</b> книгу. Это не «прочитал», а «читал, был в процессе».</p>
<p>По-английски так: <b>был</b> (was / were) + <b>читающий</b> (reading).</p>
<p>${s('I was reading.')} — Я читал (в тот момент).<br>${s('We were playing.')} — Мы играли (в тот момент).<br>${s('She was cooking.')} — Она готовила (в тот момент).</p>
<p>Одно лицо (I, he, she, it) → <b>was</b>. Много или «you» → <b>were</b>.</p>`,
items:[
 {lvl:1,text:'At seven o’clock yesterday I {was reading*|were reading|am reading} a book.',
  why:'С <b>I</b> ставим <b>was</b>, а глагол — с окончанием <b>-ing</b>: <b>was reading</b> («я читал в тот момент»). «were» с I не употребляется, а «am reading» — настоящее время, но речь о вчерашнем дне (yesterday).',
  why2:'Формула: was / were + -ing. Вчера + I → was. Значит: I was read<b>ing</b>.'},
 {lvl:1,text:'They {were playing*|was playing|were play} football at five o’clock yesterday.',
  why:'<b>They</b> — «они», много людей → <b>were</b>. После was / were глагол обязательно с <b>-ing</b>: <b>were playing</b>.',
  why2:'they / we / you → were. И не забываем -ing: play → playing.'},
 {lvl:1,text:'At six o’clock yesterday my mum {was cooking*|were cooking|was cook} dinner.',
  why:'<b>my mum</b> = she → <b>was</b>. Глагол с -ing: <b>was cooking</b> — «мама готовила» (в 6 часов действие шло).',
  why2:'Мама — одна (she), значит was. Без -ing нельзя: не «was cook», а «was cooking».'},
 {type:'listen',lvl:1,say:'They were watching TV.',q:'Послушай. Какое слово стоит перед watching?',opts:['were','are','was'],ans:0,
  why:'Прозвучало: <i>They <b>were</b> watching TV.</i> — «Они смотрели телевизор» (в прошлом). <b>were</b> — потому что they. «are watching» было бы настоящее время.',
  why2:'were [wɜː] — прошедшее время, are [ɑː] — настоящее. С they в прошлом: they were.'},
 {lvl:1,text:'At eight o’clock yesterday the {children*|childs@en.s.plurals} {were having*|was having|were have} breakfast.',
  why:'1) <b>child</b> — исключение, во множественном числе <b>children</b> (не «childs»). 2) children — их много → <b>were</b> + -ing: <b>were having</b> breakfast («завтракали»).',
  why2:'child → children (как man → men). Много детей → were having.'},
 {type:'read',lvl:1,text:'Yesterday evening I was reading a book and my brother was playing games.',q:'Прочитай вслух',
  why:'<b>was</b> читается [wɒz], в быстрой речи почти [wəz]. В <b>reading</b>, <b>playing</b> конец -ing — это носовой звук [ɪŋ], без чёткого «г» на конце. <b>brother</b> — звук [ð], кончик языка между зубами.',
  why2:'Читай спокойно, по смыслу: «Yesterday evening / I was reading a book / and my brother / was playing games».'},
 {lvl:2,text:'I {wasn’t sleeping*|weren’t sleeping|didn’t sleeping} at midnight, I {was doing*|did doing|were doing} my homework.',
  why:'1) Отрицание с I: <b>wasn’t</b> + -ing → <b>wasn’t sleeping</b>. «didn’t sleeping» — смесь двух времён, так нельзя. 2) Утверждение с I: <b>was doing</b>.',
  why2:'В Past Continuous отрицание — это просто was + not = wasn’t. Никакого did!'},
 {lvl:2,text:'— {Were*|Was|Did} you watching TV at nine o’clock last night? — No, I {wasn’t*|weren’t|didn’t}.',
  why:'1) Вопрос: was / were ставим в начало. С <b>you</b> → <b>Were</b> you watching…? «Did you watching» неверно — после did не бывает -ing. 2) Короткий ответ про себя: <b>No, I wasn’t.</b>',
  why2:'Вопрос — Were you…? Ответ про «я» — I was / I wasn’t.'},
 {lvl:2,text:'What {were*|was|did} the children doing at ten o’clock yesterday?',
  why:'Вопрос с what: What + <b>were</b> + the children + doing? <b>children</b> — много → were. «did» не подходит: после did было бы «do», а не «doing».',
  why2:'Видишь doing — значит нужен was / were. Дети — много → were.'},
 {type:'spell',lvl:2,say:'swimming',ans:['swimming'],q:'Послушай и напиши слово (форма с -ing).',
  why:'<b>swim</b> → <b>swimming</b>: короткий ударный гласный [ɪ] + одна согласная m → m удваиваем: swi<b>mm</b>ing.',
  why2:'Как run → running, sit → sitting: swim → swimming (две m).'},
 {lvl:2,text:'All evening yesterday my sister {was writing*|was writeing|were writing} an essay.',
  why:'<b>write</b> кончается на немую e → она уходит: <b>writing</b>. my sister = she → <b>was</b>.',
  why2:'make → making, write → writing: немая e перед -ing пропадает.'},
 {lvl:2,text:'At five o’clock yesterday my dad {was washing*|were washing|washing} {his*|him|he@en.p.possessive} car.',
  why:'1) dad = he → <b>was washing</b> (без was нельзя). 2) «Чью машину?» — <b>его</b> → притяжательное <b>his</b> car. him — «его / ему» (кого? кому?), he — «он».',
  why2:'he → his (его), she → her (её). Машина чья? — his car.'},
 {type:'spell',lvl:2,say:'writing',ans:['writing'],q:'Послушай и напиши слово.',
  why:'<b>write</b> → <b>writing</b>: немая e уходит, t не удваиваем (гласный [aɪ] длинный). Начальная w в write не читается.',
  why2:'Пишется w-r-i-t-i-n-g, одна t.'},
 {lvl:3,text:'At that moment I {didn’t understand*|wasn’t understanding|wasn’t understand} anything.',
  why:'Ловушка! <b>understand</b> — глагол состояния (понимать, знать, любить, хотеть). Их обычно не ставят в Past Continuous, даже если есть «at that moment». Правильно: <b>I didn’t understand</b> (Past Simple).',
  why2:'Понимание — это не процесс, который видно на фото. Поэтому know, understand, like, want — без -ing.'},
 {lvl:3,q:'Какое предложение правильное?',opts:['I was knowing the answer.','I knew the answer.','I was know the answer.'],ans:1,
  why:'<b>know</b> — глагол состояния, в -ing его не ставят: правильно <b>I knew the answer</b>. «I was know» — ошибка формы (нет -ing).',
  why2:'know, like, want, understand — «не любят» -ing. Значит: I knew.'},
 {lvl:3,text:'At ten o’clock yesterday {there were*|there was|it were@en.p.there_is} a lot of people in the shop, and everyone {was shouting*|were shouting|shouting}.',
  why:'1) <b>a lot of people</b> — много → <b>there were</b>. 2) Ловушка: <b>everyone</b> («каждый, все») по-английски — единственное число, как he → <b>was shouting</b>.',
  why2:'people — множественное → there were. everyone — как «каждый» → was.'},
 {lvl:3,text:'At four o’clock {on*|in|at@en.5.prep_time} Sunday we {were sitting*|was sitting|were siting} in the park.',
  why:'1) С днями недели — <b>on</b>: on Sunday. 2) we → <b>were</b>; <b>sit</b> → <b>sitting</b> (короткий гласный + одна согласная — удваиваем t).',
  why2:'on + день недели. sit → sitting (две t), we → were.'},
 {type:'read',lvl:3,text:'What were you doing at midnight?',q:'Прочитай вслух (это вопрос — в конце голос понижается)',
  why:'<b>were</b> [wɜː] — губы трубочкой, не «вэ». <b>doing</b> — [ˈduːɪŋ]. <b>midnight</b> — ударение на первый слог: MID-night. Это специальный вопрос (what), поэтому в конце голос идёт вниз ↘.',
  why2:'What were you DOing at MIDnight ↘? Не повышай голос в конце.'}
]});

/* ===================== Past Simple vs Past Continuous ===================== */
RU.rule({
id:'en.7.past_s_vs_c',
short:'Длинное фоновое действие — <b>Past Continuous</b>, короткое, которое его прервало, — <b>Past Simple</b>: <i>I <b>was reading</b> when the phone <b>rang</b>.</i> После <b>while</b> обычно Past Continuous, после <b>when</b> — Past Simple.',
theory:`<p>Часто в одном предложении встречаются два времени. Одно действие <b>длилось</b> (фон), а другое <b>случилось</b> посреди него (коротко, «бац!»).</p>
<div class="box rule"><b>Схема</b>Длинное (фон) → <b>Past Continuous</b>: was / were + -ing<br>Короткое («бац!») → <b>Past Simple</b>: V2 (rang, came, saw)<br>${s('I was reading when the phone rang.')}<br>${s('While we were walking in the park, it started to rain.')}</div>
<table class="sym"><tr><th>Слово</th><th>Что после него обычно</th><th>Пример</th></tr>
<tr><td><b>while</b> (пока, в то время как)</td><td>длинное: Past Continuous</td><td>${s('While I was having a shower, the lights went out.')}</td></tr>
<tr><td><b>when</b> (когда)</td><td>короткое: Past Simple</td><td>${s('When Mum came home, I was still doing my homework.')}</td></tr></table>
<div class="box ex"><b>Ещё варианты</b>Два длинных действия одновременно — оба Past Continuous:<br>${s('At eight o’clock Dad was cooking dinner while Mum was reading.')}<br>Цепочка коротких действий одно за другим — все Past Simple:<br>${s('He opened the door, came in and sat down.')}</div>
<div class="box tip"><b>Как запомнить</b>Длинное — это <b>«фильм»</b>, который шёл. Короткое — <b>«звонок»</b>, который его прервал. Фильм — was / were + -ing, звонок — V2.</div>
<div class="box err"><b>Смысл меняется!</b>${s('When I came home, my sister was cooking dinner.')} — сестра <b>уже готовила</b>, когда я пришёл.<br>${s('When I came home, my sister cooked dinner.')} — я пришёл, и <b>потом</b> сестра приготовила ужин.<br>Типичная ошибка: ✗ While I watched TV, … → лучше ✓ ${s('While I was watching TV, …')}</div>`,
theory2:`<p>Представь: ты <b>смотрел</b> фильм (долго), и вдруг <b>позвонил</b> телефон (раз — и всё).</p>
<p>«Смотрел» — долго → <b>was watching</b>. «Позвонил» — коротко → <b>rang</b>.</p>
<p>${s('I was watching a film when the phone rang.')}</p>
<p>По-русски тоже: «смотрел» (несовершенный вид, процесс) и «позвонил» (совершенный вид, результат). Процесс → -ing, результат → V2.</p>`,
items:[
 {lvl:1,text:'I {was reading*|read|were reading} when the phone {rang*|was ringing|ringed}.',
  why:'Я <b>читал</b> (долго, фон) → <b>was reading</b>. Телефон <b>зазвонил</b> (коротко, прервал) → Past Simple: <b>rang</b> (ring — rang — rung). «ringed» — такой формы нет.',
  why2:'Фон — was + -ing. «Бац!» — V2: rang.'},
 {lvl:1,text:'While we {were walking*|was walking|are walking} in the park, it started to rain.',
  why:'После <b>while</b> — длинное действие: Past Continuous. we → <b>were walking</b>. «are walking» — настоящее время, а история в прошлом (started).',
  why2:'while = «пока шло действие» → were + -ing.'},
 {lvl:1,text:'When Mum came home, I {was still doing*|still did|were still doing} my homework.',
  why:'Слово <b>still</b> («всё ещё») показывает: домашка <b>продолжалась</b>, когда мама пришла → Past Continuous, I → <b>was still doing</b>.',
  why2:'«Я всё ещё делал» — процесс → was doing.'},
 {lvl:1,q:'Что поставить в пропуск? <i>While I ___ TV, the lights went out.</i>',opts:['was watching','watched','watch'],ans:0,sayAfter:'While I was watching TV, the lights went out.',
  why:'После <b>while</b> — длинное, фоновое действие: <b>was watching</b>. Короткое действие (свет погас) — went out, Past Simple.',
  why2:'Пока я смотрел (долго) — was watching. Свет погас (бац) — went out.'},
 {lvl:1,text:'He {opened*|was opening|opens} the door, {came*|was coming|comes} in and sat down.',
  why:'Это <b>цепочка</b> коротких действий одно за другим: открыл, вошёл, сел → все в Past Simple: <b>opened, came, sat</b>. Настоящее время (opens, comes) не подходит: sat — прошедшее.',
  why2:'Действия по очереди, как шаги: открыл → вошёл → сел. Все V2.'},
 {type:'listen',lvl:1,say:'She was cooking when I came home.',q:'Послушай. Что делала она, когда я пришёл?',opts:['готовила — процесс уже шёл','начала готовить после моего прихода','будет готовить'],ans:0,
  why:'<i>She <b>was cooking</b> when I came home.</i> — was cooking (Past Continuous) значит, что готовка <b>уже шла</b>, когда я пришёл.',
  why2:'was + -ing = процесс в тот момент. Она уже стояла у плиты.'},
 {type:'read',lvl:1,text:'I was reading a book when the phone rang.',q:'Прочитай вслух',
  why:'<b>reading</b> — [ˈriːdɪŋ], долгий звук [iː]. <b>phone</b> — [fəʊn], ph = [f]. <b>rang</b> — [ræŋ], на конце носовой [ŋ] без «г».',
  why2:'Две части: «I was reading a book» / «when the phone rang».'},
 {lvl:2,text:'At eight o’clock yesterday Dad {was cooking*|cooked|cooks} dinner while Mum {was reading*|read|reads} a magazine.',
  why:'Два <b>длинных</b> действия шли одновременно в момент «в 8 часов вчера» → оба в Past Continuous: <b>was cooking</b> и <b>was reading</b>. cooks / reads — настоящее время, не подходит.',
  why2:'В 8 вчера: папа готовил (процесс), мама читала (процесс). Оба — was + -ing.'},
 {lvl:2,text:'I {saw*|was seeing|see} an accident while I {was waiting*|were waiting|am waiting} for the bus.',
  why:'1) Увидел (коротко) → <b>saw</b>. 2) После <b>while</b> — длинное: I → <b>was waiting</b>. «were» с I нельзя, «am waiting» — настоящее время.',
  why2:'Пока я ждал (долго) — was waiting, увидел (бац) — saw.'},
 {lvl:2,text:'— What {were*|did|was} you doing when the lights went out? — I {was having*|had|were having} a shower.',
  why:'1) В вопросе стоит <b>doing</b>, значит нужен were: What <b>were</b> you doing…? (you → were). 2) Ответ на «что ты делал в тот момент» — тоже процесс: <b>I was having a shower</b>.',
  why2:'Вопрос в Past Continuous → и ответ в Past Continuous.'},
 {lvl:2,text:'The children {were playing*|was playing|are playing} in the garden when it suddenly {started*|was starting|starts} to snow.',
  why:'1) Дети играли (фон) → children — много → <b>were playing</b>. 2) <b>suddenly</b> («вдруг») — короткое событие → <b>started</b>.',
  why2:'«вдруг» почти всегда = Past Simple. Фон — were playing.'},
 {lvl:2,text:'When I looked out of {the*|a|_@en.5.articles} window, it {was snowing*|snowed|snows}.',
  why:'1) Устойчивое выражение: look out of <b>the</b> window (понятно, какое окно — то, что в комнате). 2) Снег <b>уже шёл</b>, когда я выглянул → <b>was snowing</b>. «snowed» значило бы «пошёл снег после этого».',
  why2:'Выглянул в окно — а там шёл снег (процесс). the window — наше окно.'},
 {lvl:2,text:'While the boys {were playing*|was playing|are playing} football, one of them {broke*|breaked|broken@en.6.past_irreg} a window.',
  why:'1) После while — длинное действие; the boys — много → <b>were playing</b>. 2) <b>break</b> — неправильный глагол: break — <b>broke</b> — broken. В Past Simple — вторая форма: broke.',
  why2:'Играли (фон) — were playing. Разбил (бац) — broke (V2 от break).'},
 {lvl:3,text:'Kate {was taking*|took|takes} a photo of the lake when she {dropped*|was dropping|drops} her phone into the water.',
  why:'1) Кейт <b>фотографировала</b> (процесс, фон) → <b>was taking</b>. 2) Уронила (коротко) → <b>dropped</b> (drop → dropped, p удваиваем).',
  why2:'Процесс — was taking. Неожиданное короткое — dropped.'},
 {lvl:3,q:'В каком предложении сестра начала готовить <b>после того</b>, как я пришёл?',opts:['When I came home, my sister cooked dinner.','When I came home, my sister was cooking dinner.'],ans:0,
  why:'<i>my sister <b>cooked</b></i> — Past Simple: сначала я пришёл, <b>потом</b> она приготовила. <i>was cooking</i> — она <b>уже</b> готовила, когда я вошёл.',
  why2:'Два V2 подряд = по очереди. was + -ing = уже шло.'},
 {lvl:3,q:'Какое предложение правильное?',opts:['When the teacher came in, the students were talking.','While the teacher came in, the students talked.','When the teacher was coming in, the students talk.'],ans:0,
  why:'Учитель <b>вошёл</b> (коротко) → came in; ученики <b>разговаривали</b> (фон) → were talking. Во втором while стоит с коротким действием, в третьем смешаны прошлое и настоящее (talk).',
  why2:'when + короткое (came in), фон — were talking.'},
 {lvl:3,text:'When the film {began*|begun|beginned@en.6.past_irreg}, we {were still buying*|still bought|are still buying} popcorn.',
  why:'1) begin — <b>began</b> — begun: в Past Simple вторая форма <b>began</b>. 2) <b>still</b> + процесс в момент начала фильма → <b>were still buying</b> (we → were).',
  why2:'Фильм начался (V2: began), а мы всё ещё покупали (were buying).'},
 {lvl:3,text:'I {was having*|had|were having} a shower when my friend phoned, so I didn’t answer. {He*|Him|His@en.5.pronouns} wanted to go for a walk.',
  why:'1) Я <b>был в душе</b> (процесс), когда позвонил друг → <b>was having</b> a shower; поэтому и не ответил. 2) В начале предложения нужно подлежащее «он» → <b>He</b> wanted… (him — «его / ему», his — «его» чей).',
  why2:'Фон — was having. Кто хотел гулять? Он — He.'},
 {type:'listen',lvl:3,say:'When I came home, she cooked dinner.',q:'Послушай. Когда она начала готовить?',opts:['до моего прихода, процесс уже шёл','после того, как я пришёл'],ans:1,
  why:'<i>When I came home, she <b>cooked</b> dinner.</i> — два Past Simple подряд → действия <b>по очереди</b>: я пришёл, потом она приготовила.',
  why2:'cooked (а не was cooking) — значит, не было процесса в момент прихода.'},
 {type:'read',lvl:3,text:'While we were walking in the park, it started to rain.',q:'Прочитай вслух',
  why:'<b>while</b> [waɪl] и <b>were</b> [wɜː], <b>walking</b> [ˈwɔːkɪŋ] — звук [w]: губы трубочкой, зубы губ не касаются. В walking буква l не читается. В <b>started</b> -ed звучит [ɪd].',
  why2:'Три слова с [w] подряд: while we were walking. Губы — трубочкой!'}
]});

/* ===================== Present Perfect ===================== */
RU.rule({
id:'en.7.pres_perf',
short:'Present Perfect = <b>have / has + 3-я форма глагола</b> (V3). Действие в прошлом, но важен <b>результат сейчас</b>: <i>I <b>have lost</b> my keys</i> (и сейчас их нет).',
theory:`<p><b>Present Perfect</b> — «настоящее совершённое». Действие уже произошло, но нам важно, <b>что из этого получилось сейчас</b>. Когда именно — не важно и не называется.</p>
<div class="box rule"><b>Формула</b><b>have / has + V3</b> (3-я форма: -ed у правильных, 3-я колонка таблицы у неправильных)<br>I / you / we / they → <b>have</b> (’ve)<br>he / she / it → <b>has</b> (’s)</div>
<table class="sym"><tr><th></th><th>I, you, we, they</th><th>he, she, it</th></tr>
<tr><td>+</td><td>${s('I have finished.')}</td><td>${s('She has finished.')}</td></tr>
<tr><td>−</td><td>${s('I haven’t finished.')}</td><td>${s('She hasn’t finished.')}</td></tr>
<tr><td>?</td><td>${s('Have you finished?')}</td><td>${s('Has she finished?')}</td></tr></table>
<p>Короткие ответы: ${s('Yes, I have.')} / ${s('No, she hasn’t.')}</p>
<div class="box ex"><b>Результат сейчас</b>${s('I have lost my keys.')} — потерял, и сейчас ключей нет.<br>${s('Tom has broken his arm.')} — сломал, рука сейчас в гипсе.<br>${s('Look! Dad has made pancakes.')} — блины уже на столе.</div>
<table class="sym"><tr><th>V1</th><th>V2 (Past Simple)</th><th>V3 (Present Perfect)</th></tr>
<tr><td>${s('go')}</td><td>${s('went')}</td><td>${s('gone')}</td></tr>
<tr><td>${s('see')}</td><td>${s('saw')}</td><td>${s('seen')}</td></tr>
<tr><td>${s('eat')}</td><td>${s('ate')}</td><td>${s('eaten')}</td></tr>
<tr><td>${s('write')}</td><td>${s('wrote')}</td><td>${s('written')}</td></tr>
<tr><td>${s('break')}</td><td>${s('broke')}</td><td>${s('broken')}</td></tr>
<tr><td>${s('take')}</td><td>${s('took')}</td><td>${s('taken')}</td></tr>
<tr><td>${s('drink')}</td><td>${s('drank')}</td><td>${s('drunk')}</td></tr>
<tr><td>${s('buy')}</td><td>${s('bought')}</td><td>${s('bought')}</td></tr>
<tr><td>${s('lose')}</td><td>${s('lost')}</td><td>${s('lost')}</td></tr>
<tr><td>${s('make')}</td><td>${s('made')}</td><td>${s('made')}</td></tr></table>
<div class="box rule"><b>been или gone?</b>${s('He has gone to the shop.')} — ушёл в магазин и <b>ещё не вернулся</b> (он там или в пути).<br>${s('He has been to the shop.')} — сходил и <b>уже вернулся</b>.<br>${s('Have you ever been to London?')} — Ты когда-нибудь был в Лондоне?</div>
<div class="box err"><b>Типичные ошибки</b>✗ She have finished → ✓ ${s('She has finished.')}<br>✗ I have saw → ✓ ${s('I have seen.')} (нужна 3-я форма, не 2-я)<br>✗ Did you seen…? → ✓ ${s('Have you seen…?')}</div>`,
theory2:`<p>Present Perfect — это «<b>уже есть результат</b>». Как в русском: «Я <b>сделал</b> уроки» (они готовы, можно гулять).</p>
<p>Собираем из двух кусочков: <b>have</b> (или has для he / she / it) + <b>3-я форма</b> глагола.</p>
<p>${s('I have done my homework.')} — Я сделал уроки (готово!).<br>${s('She has lost her bag.')} — Она потеряла сумку (сейчас сумки нет).<br>${s('We have bought a car.')} — Мы купили машину (вот она стоит).</p>
<p>Время («вчера», «в 2010») здесь не называем — важен только результат.</p>`,
items:[
 {lvl:1,text:'I {have finished*|has finished|have finish} my homework, so now I can play.',
  why:'С <b>I</b> — <b>have</b>. После have — 3-я форма: finish → <b>finished</b>. Результат сейчас: уроки готовы, можно играть.',
  why2:'I have + V3. finish — правильный глагол, V3 = finished.'},
 {lvl:1,text:'She {has lost*|have lost|has lose} her keys. She can’t open the door.',
  why:'<b>She</b> → <b>has</b>. lose — lost — <b>lost</b> (3-я форма). Результат: ключей нет, дверь не открыть.',
  why2:'he / she / it → has. После has — V3: lost.'},
 {lvl:1,text:'We {have bought*|has bought|have buyed} a new car. Look at it!',
  why:'<b>We</b> → <b>have</b>. buy — неправильный: buy — bought — <b>bought</b>. «buyed» — такой формы нет.',
  why2:'we → have. buy → bought (2-я и 3-я формы одинаковые).'},
 {lvl:1,q:'Как образуется Present Perfect?',opts:['have / has + 3-я форма глагола','was / were + глагол с -ing','did + глагол'],ans:0,
  why:'Present Perfect = <b>have / has + V3</b>: I have seen, she has seen. was / were + -ing — это Past Continuous.',
  why2:'Perfect — это всегда have (has) + 3-я форма.'},
 {lvl:1,text:'Tom {has broken*|have broken|has broke} his arm. He is in hospital now.',
  why:'Tom = he → <b>has</b>. break — broke — <b>broken</b>: после has нужна 3-я форма, а broke — это 2-я.',
  why2:'has + V3. 3-я форма break — broken.'},
 {type:'listen',lvl:1,say:'I have seen this film.',q:'Послушай. Видел ли говорящий этот фильм?',opts:['Да, уже видел','Нет, ещё не видел','Посмотрит завтра'],ans:0,
  why:'<i>I <b>have seen</b> this film.</i> — «Я (уже) видел этот фильм». have + seen — Present Perfect, результат: фильм знаком.',
  why2:'have seen = «видел, знаю его». Отрицание было бы haven’t seen.'},
 {type:'read',lvl:1,text:'I have finished my homework, so I can go out now.',q:'Прочитай вслух',
  why:'<b>have</b> [hæv] — [v] на конце, верхние зубы на нижнюю губу. <b>finished</b> — -ed звучит [t]: [ˈfɪnɪʃt]. <b>homework</b> — ударение на первый слог.',
  why2:'I have FInished my HOMEwork / so I can go OUT now.'},
 {lvl:2,text:'{Have*|Has|Did} you seen my bag? I can’t find it.',
  why:'Вопрос в Present Perfect: <b>Have</b> + you + V3 (seen)? С you — Have. «Did you seen» — ошибка: после did было бы see.',
  why2:'Видишь 3-ю форму seen — значит, в начале have / has. you → Have.'},
 {lvl:2,text:'My parents {haven’t*|hasn’t|didn’t} seen this film.',
  why:'My parents = they → <b>haven’t</b> seen. hasn’t — для he / she / it. «didn’t seen» — смесь двух времён.',
  why2:'they → have → haven’t.'},
 {lvl:2,text:'— Has Kate done the washing-up? — Yes, she {has*|have|did}.',
  why:'Вопрос начинался с <b>Has</b> → и в коротком ответе <b>has</b>: Yes, she has. «did» — ответ на вопрос с did.',
  why2:'Чем спросили, тем и отвечаем: Has…? — Yes, she has.'},
 {lvl:2,text:'Look! Dad {has made*|has maked|have made} pancakes for {us*|we|our@en.5.pronouns}.',
  why:'1) Dad = he → <b>has</b>. make — made — <b>made</b>. «maked» не существует. Look! — результат прямо перед глазами. 2) После предлога (for) — объектное местоимение: we → <b>us</b> («для нас»). our — «наш», ему нужно существительное.',
  why2:'make — неправильный: made, made. Папа — has. for + us (не we).'},
 {lvl:2,text:'Mike isn’t here. He {has gone*|has been|have gone} to the shop.',
  why:'Майка <b>здесь нет</b> — значит, он ушёл и ещё не вернулся → <b>has gone</b>. has been — «сходил и вернулся». have — не для he.',
  why2:'gone — «ушёл туда», been — «побывал и вернулся».'},
 {type:'spell',lvl:2,say:'written',ans:['written'],q:'Послушай и напиши 3-ю форму глагола write.',
  why:'write — wrote — <b>written</b>. Пишется с <b>двумя t</b>: wri<b>tt</b>en (звук [ɪ] короткий).',
  why2:'w-r-i-t-t-e-n: в начале немая w, в середине две t.'},
 {lvl:2,text:'Look! Somebody {has opened*|have opened|has open} the window, and now it is {colder*|more cold|coldest@en.6.comparatives} in the room.',
  why:'1) Somebody («кто-то») — как he → <b>has opened</b>. 2) cold — короткое прилагательное → сравнительная степень <b>colder</b> («холоднее»). «more cold» неправильно, coldest — «самый холодный».',
  why2:'Кто-то открыл (has + V3) → стало холоднее (cold + er).'},
 {lvl:3,text:'Mike is back now. He {has been*|has gone|have been} to the shop.',
  why:'Майк <b>уже вернулся</b> → он <b>побывал</b> в магазине: <b>has been</b>. has gone значило бы, что он ещё там.',
  why2:'Вернулся → been. Не вернулся → gone.'},
 {lvl:3,q:'<i>Anna has gone to Paris.</i> Где Анна сейчас?',opts:['в Париже или по дороге туда','уже вернулась из Парижа'],ans:0,
  why:'<b>has gone</b> — уехала и <b>ещё не вернулась</b>. Если бы вернулась, сказали бы <i>Anna has been to Paris.</i>',
  why2:'gone = «ушла / уехала» (её нет здесь). been = «побывала».'},
 {lvl:3,text:'The {children*|childs@en.s.plurals} {have eaten*|have ate|has eaten} all the sweets!',
  why:'1) child → <b>children</b> (исключение). 2) children — они → <b>have</b>; eat — ate — <b>eaten</b>: нужна 3-я форма, а ate — это 2-я.',
  why2:'Дети (много) → have eaten. ate — для Past Simple, eaten — для Perfect.'},
 {lvl:3,text:'My brother {has taken*|has took|have taken} {my*|me|mine@en.p.possessive} phone, and I can’t call you.',
  why:'1) brother = he → has; take — took — <b>taken</b>. 2) «мой телефон»: перед существительным — <b>my</b> phone. mine стоит без существительного (It’s mine), me — «меня / мне».',
  why2:'has + V3 (taken). Перед словом phone — my.'},
 {lvl:3,text:'— Is there any juice? — No, sorry. I {have drunk*|have drank|has drunk} it all.',
  why:'Ловушка неправильного глагола: drink — drank — <b>drunk</b>. После have — 3-я форма <b>drunk</b>. I → have.',
  why2:'drink → drank (вчера) → drunk (уже выпил). I have drunk.'},
 {type:'spell',lvl:3,say:'broken',ans:['broken'],q:'Послушай и напиши 3-ю форму глагола break.',
  why:'break — broke — <b>broken</b> [ˈbrəʊkən]. Пишется b-r-o-k-e-n.',
  why2:'В 3-й форме много неправильных глаголов кончаются на -en: broken, eaten, written, taken.'},
 {type:'read',lvl:3,text:'My sister has lost her keys, and she has not found them yet.',q:'Прочитай вслух',
  why:'<b>has</b> [hæz] — на конце звонкий [z]. <b>lost</b> [lɒst]. <b>found</b> [faʊnd]. <b>yet</b> [jet] — как «е» с [й] в начале.',
  why2:'Читай по частям: My sister has lost her keys / and she has not found them yet.'}
]});

/* ===================== Present Perfect vs Past Simple ===================== */
RU.rule({
id:'en.7.pp_vs_past',
short:'Если названо <b>когда</b> (yesterday, last year, in 2010, ago, When…?) — <b>Past Simple</b>. Если время не названо и важен результат или опыт «до сих пор» (ever, never, already, yet, just, since, for) — <b>Present Perfect</b>.',
theory:`<p>По-русски и «я видел этот фильм», и «я видел его вчера» — одно и то же время. А в английском это <b>два разных</b> времени. Решает одно: <b>названо ли время в прошлом</b>.</p>
<table class="sym"><tr><th>Past Simple (V2)</th><th>Present Perfect (have / has + V3)</th></tr>
<tr><td>Время <b>названо</b>, оно закончилось</td><td>Время <b>не названо</b>, важен результат или опыт до сих пор</td></tr>
<tr><td>${s('yesterday')}, ${s('last week')}, ${s('last year')}, ${s('two days ago')}, ${s('in 2010')}, ${s('When…?')}</td><td>${s('ever')}, ${s('never')}, ${s('already')}, ${s('yet')}, ${s('just')}, ${s('since')}, ${s('for')} (до сих пор)</td></tr>
<tr><td>${s('I saw this film yesterday.')}</td><td>${s('I have already seen this film.')}</td></tr>
<tr><td>${s('We went to Spain last summer.')}</td><td>${s('We have been to Spain twice.')}</td></tr>
<tr><td>${s('When did you buy this jacket?')}</td><td>${s('Have you ever bought clothes online?')}</td></tr></table>
<div class="box ex"><b>Типичный диалог</b>${s('Have you ever eaten sushi?')} — Ты когда-нибудь ел суши? (опыт → Present Perfect)<br>${s('Yes, I ate it last week.')} — Да, ел на прошлой неделе. (названо время → Past Simple)</div>
<div class="box rule"><b>Закончилось или нет?</b>${s('I have lived here since I was born.')} — живу и сейчас.<br>${s('My grandfather lived in this village for twenty years.')} — дедушка там больше не живёт.<br>Если человек жил давно (например, писатель прошлого) — только Past Simple: ${s('Shakespeare wrote many plays.')}</div>
<div class="box tip"><b>Как запомнить</b>Задай себе вопрос: «<b>Когда?</b>» Если в предложении есть ответ — вчера, в прошлом году, два дня назад — ставь Past Simple. Если ответа нет, а есть «уже», «никогда», «только что», «когда-нибудь» — Present Perfect.</div>
<div class="box err"><b>Типичные ошибки</b>✗ I have seen him yesterday → ✓ ${s('I saw him yesterday.')}<br>✗ When have you arrived? → ✓ ${s('When did you arrive?')}<br>✗ I have lost my keys two days ago → ✓ ${s('I lost my keys two days ago.')}</div>`,
theory2:`<p>Представь две коробки.</p>
<p><b>Коробка «Вчера и раньше»</b> — на ней наклейка с датой: yesterday, last year, in 2010, ago. Сюда — Past Simple: ${s('I saw him yesterday.')}</p>
<p><b>Коробка «Результат сейчас»</b> — без даты: already, just, ever, never, yet. Сюда — Present Perfect: ${s('I have just seen him.')}</p>
<p>Видишь дату в прошлом — Past Simple. Даты нет — Present Perfect.</p>`,
items:[
 {lvl:1,text:'I {saw*|have seen} this film yesterday.',
  why:'Есть <b>yesterday</b> — время названо → Past Simple: <b>saw</b>. С yesterday Present Perfect не используется.',
  why2:'yesterday = коробка «Вчера» → V2: saw.'},
 {lvl:1,text:'I {have already seen*|already saw} this film. Let’s watch something else.',
  why:'<b>already</b> («уже»), время не названо, важен результат: фильм знаком → Present Perfect: <b>have already seen</b>. already стоит между have и V3.',
  why2:'«уже» без даты → have + already + V3.'},
 {lvl:1,text:'We {went*|have gone|have been} to the seaside last summer.',
  why:'<b>last summer</b> — названо время в прошлом → Past Simple: go — <b>went</b>.',
  why2:'last … (прошлым летом) → V2. go → went.'},
 {lvl:1,text:'My dad {has been*|was} to Japan three times.',
  why:'Это <b>опыт</b> за всю жизнь, время не названо → <b>has been to</b> Japan («побывал»). Сочетание «was to Japan» неверно.',
  why2:'«Сколько раз был?» без даты — has been. Сколько раз = опыт.'},
 {lvl:1,q:'Какое слово подсказывает, что нужен <b>Past Simple</b>?',opts:['yesterday','ever','already','yet'],ans:0,
  why:'<b>yesterday</b> называет конкретное время в прошлом → Past Simple. ever, already, yet — слова Present Perfect.',
  why2:'Дата в прошлом (вчера) — Past Simple.'},
 {type:'listen',lvl:1,say:'I saw her yesterday.',q:'Послушай. Какое время прозвучало?',opts:['Past Simple — saw','Present Perfect — have seen'],ans:0,
  why:'<i>I <b>saw</b> her yesterday.</i> — есть yesterday → Past Simple, глагол <b>saw</b> (see — saw — seen).',
  why2:'Есть «вчера» → только Past Simple.'},
 {lvl:1,text:'Last year we {went*|have gone|have been} to Spain, and it was {hotter*|more hot|hottest@en.6.comparatives} there than at home.',
  why:'1) <b>Last year</b> → Past Simple: <b>went</b>. 2) hot — короткое прилагательное: hot → <b>hotter</b> (t удваивается). «more hot» неверно, hottest — «самый жаркий», а здесь сравнение с than.',
  why2:'last year → went. hot + than → hotter.'},
 {lvl:2,text:'She {lost*|has lost} her keys two days ago.',
  why:'<b>two days ago</b> («два дня назад») — время названо → Past Simple: <b>lost</b>. С ago Present Perfect нельзя.',
  why2:'ago = «назад» = дата в прошлом → V2.'},
 {lvl:2,text:'— {Have you ever eaten*|Did you ever eat} sushi? — Yes, I {ate*|have eaten} it last week.',
  why:'1) Вопрос об <b>опыте</b> «когда-нибудь в жизни» (ever) → <b>Have you ever eaten</b>…? 2) В ответе названо время — <b>last week</b> → Past Simple: <b>ate</b>.',
  why2:'Сначала спрашиваем про опыт (Perfect), потом уточняем, когда (Past Simple).'},
 {lvl:2,text:'When {did you buy*|have you bought} this jacket? It {looks*|look@en.5.ps} great!',
  why:'1) Вопрос <b>When…?</b> («когда?») спрашивает о точном времени в прошлом → Past Simple: <b>did you buy</b>. 2) It (куртка) → Present Simple с -s: <b>looks</b>.',
  why2:'When…? = «назови дату» → did + V1. it → looks.'},
 {lvl:2,text:'Kate {has just gone*|just went} out. She’ll be back in ten minutes.',
  why:'<b>just</b> («только что») + результат сейчас (её нет дома) → Present Perfect: <b>has just gone</b>.',
  why2:'«только что ушла» — has just gone (just между has и V3).'},
 {lvl:2,text:'In 2010 my family {moved*|has moved} to Moscow.',
  why:'<b>In 2010</b> — конкретный год в прошлом → Past Simple: <b>moved</b>.',
  why2:'Год в прошлом = дата → V2.'},
 {lvl:2,text:'Where {did you go*|have you gone} last weekend? — We {went*|goed|gone@en.6.past_irreg} to the zoo.',
  why:'1) <b>last weekend</b> → Past Simple: Where <b>did you go</b>…? 2) go — неправильный: go — <b>went</b> — gone. «goed» не бывает, gone — 3-я форма, без have её не ставят.',
  why2:'Прошлые выходные → did you go? → We went.'},
 {type:'read',lvl:2,text:'Last summer we visited my grandmother in the village.',q:'Прочитай вслух',
  why:'<b>visited</b> — -ed после t звучит [ɪd]: [ˈvɪzɪtɪd]; [v] — зубы на губу. <b>village</b> [ˈvɪlɪdʒ] — ударение на первый слог, конец [ɪdʒ]. <b>grandmother</b> — ударение на GRAND.',
  why2:'LAST SUMmer / we VIsited my GRANDmother / in the VILlage.'},
 {lvl:3,text:'I {have lived*|lived} in this town since I was born.',
  why:'<b>since I was born</b> — «с рождения и до сих пор» → Present Perfect: <b>have lived</b>. (А was born — Past Simple, потому что родился в конкретный момент.)',
  why2:'since = «с тех пор и до сих пор» → have + V3.'},
 {lvl:3,text:'My grandfather {lived*|has lived} in this village for twenty years. Then he moved to the city.',
  why:'Дедушка там <b>больше не живёт</b> (он переехал) — период закончился → Past Simple: <b>lived</b>. Даже с for, если всё в прошлом, — Past Simple.',
  why2:'Закончилось → V2. Продолжается до сих пор → have + V3.'},
 {lvl:3,text:'— {Have you finished*|Did you finish} your project yet? — Yes, I {finished*|have finished} it yesterday.',
  why:'1) <b>yet</b> в вопросе («уже?») → Present Perfect: <b>Have you finished</b>…yet? 2) В ответе есть <b>yesterday</b> → Past Simple: <b>finished</b>.',
  why2:'yet → Perfect. yesterday → Past Simple. Решают слова-подсказки.'},
 {lvl:3,q:'В каком предложении ключ, скорее всего, <b>до сих пор потерян</b>?',opts:['I have lost my key.','I lost my key last week, but Dad found it.'],ans:0,
  why:'<i>I <b>have lost</b> my key.</i> — Present Perfect: результат сейчас — ключа нет. Во втором предложении — история в прошлом, и ключ нашёлся.',
  why2:'Present Perfect = «и сейчас так». Ключа нет прямо сейчас.'},
 {lvl:3,text:'Shakespeare {wrote*|has written} many plays.',
  why:'Шекспир жил давно, его жизнь закончилась → новых пьес он не напишет → Past Simple: <b>wrote</b>.',
  why2:'Человек из прошлого — его дела только в Past Simple.'},
 {lvl:3,text:'— Has the film started yet? — Yes, it {started*|has started} ten minutes ago.',
  why:'В ответе <b>ten minutes ago</b> — названо время → Past Simple: <b>started</b>. Вопрос с yet — в Present Perfect, но ответ с ago — уже Past Simple.',
  why2:'ago → V2, даже если вопрос был в Perfect.'},
 {lvl:3,text:'Yesterday Ben {bought*|has bought} two new {knives*|knifes@en.s.plurals}.',
  why:'1) <b>Yesterday</b> → Past Simple: <b>bought</b>. 2) knife → <b>knives</b>: f / fe на конце меняется на v + es (как wife → wives, leaf → leaves).',
  why2:'Вчера → bought. knife → knives.'},
 {type:'listen',lvl:3,say:'We have just come home.',q:'Послушай. Что сказали?',opts:['Мы только что пришли домой.','Мы пришли домой вчера.','Мы скоро придём домой.'],ans:0,
  why:'<i>We <b>have just come</b> home.</i> — just = «только что», Present Perfect: результат сейчас — мы дома. come — came — <b>come</b> (3-я форма как 1-я).',
  why2:'have just + V3 = «только что сделали».'},
 {type:'read',lvl:3,text:'I have already seen this film, but I watched it again last week.',q:'Прочитай вслух',
  why:'Тут оба времени: <b>have already seen</b> (опыт) и <b>watched … last week</b> (названо время). <b>already</b> [ɔːlˈredi] — ударение на RE. <b>watched</b> — -ed звучит [t]: [wɒtʃt].',
  why2:'Две части: «I have already seen this film» / «but I watched it again last week».'}
]});

/* ===================== Present Perfect: маркеры ===================== */
RU.rule({
id:'en.7.pp_words',
short:'<b>for</b> + период (for three years), <b>since</b> + начальная точка (since 2019, since Monday). <b>already, just</b> — между have и V3; <b>yet</b> — в конце вопроса и отрицания; <b>ever</b> — в вопросах, <b>never</b> — «никогда».',
theory:`<p>У Present Perfect есть «слова-друзья». Они помогают узнать время и стоят на своих местах.</p>
<table class="sym"><tr><th>Слово</th><th>Значение</th><th>Где стоит</th><th>Пример</th></tr>
<tr><td><b>already</b></td><td>уже</td><td>между have и V3 (утверждение)</td><td>${s('I have already done it.')}</td></tr>
<tr><td><b>just</b></td><td>только что</td><td>между have и V3</td><td>${s('She has just come.')}</td></tr>
<tr><td><b>yet</b></td><td>уже? / ещё не</td><td>в конце вопроса и отрицания</td><td>${s('Have you finished yet?')}<br>${s('I haven’t finished yet.')}</td></tr>
<tr><td><b>ever</b></td><td>когда-нибудь</td><td>в вопросах, перед V3</td><td>${s('Have you ever been to London?')}</td></tr>
<tr><td><b>never</b></td><td>никогда</td><td>между have и V3 (без not!)</td><td>${s('I have never been to London.')}</td></tr></table>
<div class="box rule"><b>for или since?</b><b>for</b> + <b>сколько</b> длится (период): ${s('for three years')}, ${s('for a week')}, ${s('for a long time')}<br><b>since</b> + <b>с какого момента</b> (точка): ${s('since 2019')}, ${s('since Monday')}, ${s('since last summer')}, ${s('since I was six')}<br>${s('I have lived here for five years.')} = ${s('I have lived here since 2021.')}</div>
<div class="box ex"><b>Вопрос «Как долго?»</b>${s('How long have you had this dog?')} — ${s('For three months.')} / ${s('Since May.')}</div>
<div class="box tip"><b>Как запомнить</b><b>for</b> — «в течение» (сколько). <b>since</b> — «с» (с какого времени). Если можно спросить «сколько?» — for. Если «с какого момента?» — since.<br>Самое лучшее в жизни: ${s('This is the most interesting book I have ever read.')}</div>
<div class="box err"><b>Типичные ошибки</b>✗ I live here for five years → ✓ ${s('I have lived here for five years.')} (по-русски «живу», но по-английски — Present Perfect!)<br>✗ since three years → ✓ ${s('for three years')}<br>✗ I haven’t never… → ✓ ${s('I have never…')} (never уже отрицание)<br>✗ I haven’t done it already → ✓ ${s('I haven’t done it yet.')}</div>`,
theory2:`<p><b>for</b> — это длина «палочки» времени: ${s('for two years')} (два года).<br><b>since</b> — это начало «палочки», точка старта: ${s('since 2020')} (с 2020-го).</p>
<p><b>already</b> = «уже» (да, сделано). <b>yet</b> = «уже?» или «ещё не» — в вопросе и с not, в конце.<br><b>just</b> = «только что». <b>ever</b> = «когда-нибудь?». <b>never</b> = «никогда».</p>
<p>${s('I have just eaten.')} — Я только что поел.<br>${s('I haven’t eaten yet.')} — Я ещё не ел.</p>`,
items:[
 {lvl:1,text:'I have lived here {for*|since} five years.',
  why:'<b>five years</b> — это <b>период</b> (сколько?) → <b>for</b>.',
  why2:'Сколько? Пять лет → for.'},
 {lvl:1,text:'She has known him {since*|for} 2019.',
  why:'<b>2019</b> — <b>точка</b>, с которой всё началось (с какого момента?) → <b>since</b>.',
  why2:'С 2019 года → since.'},
 {lvl:1,text:'I haven’t done my homework {yet*|already|just}.',
  why:'В <b>отрицании</b> «ещё не» → <b>yet</b> в конце. already и just в отрицании так не ставят.',
  why2:'haven’t … yet = «ещё не сделал».'},
 {lvl:1,text:'We have {just*|yet} had lunch, so we aren’t hungry.',
  why:'«Только что пообедали» → <b>just</b> между have и V3. yet между have и V3 не ставят.',
  why2:'just = «только что», стоит после have.'},
 {lvl:1,q:'Какое слово ставим перед периодом времени (<i>three days, a week, a long time</i>)?',opts:['for','since'],ans:0,
  why:'Период («сколько?») → <b>for</b>: for three days, for a week. since — перед точкой отсчёта.',
  why2:'for = в течение. since = с (какого-то момента).'},
 {type:'listen',lvl:1,say:'I have known her since I was five.',q:'Послушай. Какое слово прозвучало?',opts:['since','for'],ans:0,
  why:'<i>I have known her <b>since</b> I was five.</i> — «Я знаю её с пяти лет»: since + момент (когда мне было пять).',
  why2:'since [sɪns] — «с». Знакомы с того момента и до сих пор.'},
 {lvl:1,text:'Mum has {just*|yet} come home. She {looks*|look@en.5.ps} tired.',
  why:'1) «Только что пришла» → <b>just</b>. 2) Present Simple, she (Mum) → глагол с <b>-s</b>: she <b>looks</b> tired.',
  why2:'has just come. Мама = she → looks (с -s).'},
 {lvl:2,text:'He has worked at this school {since*|for} he left university.',
  why:'«С тех пор как он окончил университет» — это точка отсчёта → <b>since</b>. После since может стоять целое предложение в Past Simple (he left).',
  why2:'since + событие в прошлом (he left) = с того момента.'},
 {lvl:2,text:'{Have you ever*|Have you yet|Did you ever} ridden a horse?',
  why:'Вопрос «когда-нибудь в жизни?» → <b>Have you ever</b> + V3 (ridden). yet перед V3 не ставят (оно стоит в конце вопроса), а «Did … ridden» — ошибка: после did нужна 1-я форма.',
  why2:'Вопрос про опыт: Have you ever…?'},
 {lvl:2,text:'I have {never*|ever} been to America.',
  why:'В утверждении «никогда» → <b>never</b>. ever ставим в вопросах.',
  why2:'I have never… = «я никогда не…». Отдельное not не нужно.'},
 {lvl:2,q:'Где правильно стоит <b>just</b>?',opts:['I have just seen him.','I just have seen him.','I have seen him just.'],ans:0,
  why:'<b>just</b> стоит <b>между have и V3</b>: I have <b>just</b> seen him.',
  why2:'Схема: have + just + V3.'},
 {lvl:2,text:'— How long have you had this dog? — {For*|Since} three months.',
  why:'<b>three months</b> — период (сколько?) → <b>For</b> three months.',
  why2:'Сколько времени? Три месяца → for.'},
 {lvl:2,text:'My {sister’s*|sisters@en.p.possessive} cat has lived with us {for*|since} two years.',
  why:'1) «Кошка сестры» (чья?) → притяжательный ’s: <b>my sister’s cat</b>. sisters — просто «сёстры». 2) two years — период → <b>for</b>.',
  why2:'чья кошка? — sister’s. Сколько? — for two years.'},
 {type:'spell',lvl:2,say:'already',ans:['already'],q:'Послушай и напиши слово «уже».',
  why:'<b>already</b> [ɔːlˈredi] — пишется с <b>одной l</b>: a-l-r-e-a-d-y.',
  why2:'all + ready, но одна l: already.'},
 {type:'read',lvl:2,text:'We have lived in this house for ten years.',q:'Прочитай вслух',
  why:'<b>lived</b> — -ed звучит [d]: [lɪvd]. <b>this</b> — звук [ð]. <b>years</b> [jɪəz] — в начале [й].',
  why2:'We have LIVED in this HOUSE / for TEN YEARS.'},
 {lvl:3,text:'It hasn’t rained {since*|for} last Monday.',
  why:'<b>last Monday</b> — момент начала (с прошлого понедельника) → <b>since</b>.',
  why2:'«с прошлого понедельника» — точка → since.'},
 {lvl:3,text:'They have been friends {for*|since} a long time.',
  why:'<b>a long time</b> — «долгое время», это период → <b>for</b>.',
  why2:'Долго (сколько?) → for a long time.'},
 {lvl:3,text:'Has the post arrived {yet*|just|for}?',
  why:'В вопросе «уже?» в конце → <b>yet</b>. just в конце вопроса не ставят, for нужно продолжение (период).',
  why2:'Вопрос «…уже?» → yet в конце.'},
 {lvl:3,q:'Какое предложение <b>неправильное</b>?',opts:['I have lived here since three years.','I have lived here for three years.','I have lived here since 2020.'],ans:0,
  why:'three years — период, с ним только <b>for</b>. «since three years» — ошибка (по-русски «уже три года» сбивает).',
  why2:'since + точка (2020), for + период (три года).'},
 {lvl:3,text:'This is the {most interesting*|interestingest|more interesting@en.6.comparatives} book I have {ever*|never} read.',
  why:'1) interesting — длинное прилагательное → превосходная степень <b>the most interesting</b>. 2) «самая интересная из всех, что я <b>когда-либо</b> читал» → <b>ever</b>.',
  why2:'the most … I have ever … = «самое … из всего, что я когда-либо…».'},
 {lvl:3,text:'We haven’t had {any*|some@en.5.some_any} rain {since*|for} Sunday.',
  why:'1) В отрицании — <b>any</b> (haven’t had any rain). 2) Sunday — день, с которого начался отсчёт → <b>since</b>.',
  why2:'Отрицание → any. С воскресенья → since.'},
 {lvl:3,text:'We {came*|comed|come@en.6.past_irreg} here in May, and we have lived here {since*|for} then.',
  why:'1) <b>in May</b> → Past Simple; come — <b>came</b> — come. «comed» не бывает. 2) <b>since then</b> — «с тех пор».',
  why2:'Приехали (в мае) — came. С тех пор живём — since then.'},
 {type:'listen',lvl:3,say:'We have lived here for six years.',q:'Послушай. Сколько времени они здесь живут?',opts:['шесть лет','с шести лет','шесть месяцев'],ans:0,
  why:'<i>We have lived here <b>for six years</b>.</i> — for + период: «уже шесть лет». «С шести лет» было бы since we were six.',
  why2:'for six years = в течение шести лет.'},
 {type:'read',lvl:3,text:'I have just finished my book, but my friend has not started it yet.',q:'Прочитай вслух',
  why:'<b>just</b> [dʒʌst], <b>yet</b> [jet]. <b>finished</b> — конец [ʃt], <b>started</b> — конец [ɪd]. Не путай: has not — [hæz nɒt].',
  why2:'Две части с паузой: «I have just finished my book» / «but my friend has not started it yet».'}
]});

/* ===================== used to ===================== */
RU.rule({
id:'en.7.used_to',
short:'<b>used to + V1</b> — «раньше бывало, а теперь нет»: <i>I <b>used to</b> play football</i> (раньше играл, сейчас не играю). Отрицание <b>didn’t use to</b>, вопрос <b>Did you use to…?</b>',
theory:`<p><b>used to</b> рассказывает о том, что <b>было раньше, регулярно</b> (привычка или состояние), но <b>сейчас уже не так</b>.</p>
<div class="box rule"><b>Формула</b>+ ${s('I used to play football.')} — Раньше я играл в футбол.<br>− ${s('I didn’t use to like fish.')} — Раньше я не любил рыбу.<br>? ${s('Did you use to climb trees?')} — Ты лазил по деревьям (в детстве)?<br>Короткие ответы: ${s('Yes, I did.')} / ${s('No, I didn’t.')}</div>
<p>После used to — <b>1-я форма</b> глагола (play, live, be). Форма одна для всех лиц: I / he / they <b>used to</b>.</p>
<div class="box ex"><b>Примеры</b>${s('My grandad used to work at a factory.')} — Дедушка раньше работал на заводе (теперь на пенсии).<br>${s('There used to be a cinema in our street.')} — Раньше на нашей улице был кинотеатр.<br>${s('We used to live in a small flat.')}</div>
<div class="box rule"><b>Где не подходит used to</b>Если действие было <b>один раз</b> или указано, <b>сколько раз</b>, — Past Simple: ${s('Last summer I went to the sea three times.')}<br>О настоящих привычках — Present Simple: ${s('Now I usually get up at seven.')}</div>
<div class="box tip"><b>Как запомнить</b>used to = «раньше… (а теперь нет)». Слышится [ˈjuːstə] — «юста», но пишется <b>used to</b>. В отрицании и вопросе после did — <b>use</b> без d (как всегда после did: did + V1).</div>
<div class="box err"><b>Типичные ошибки</b>✗ I use to play → ✓ ${s('I used to play.')}<br>✗ I didn’t used to → ✓ ${s('I didn’t use to.')}<br>✗ I used to played → ✓ ${s('I used to play.')}<br>✗ I was used to play — так нельзя. (Есть отдельное выражение <i>be used to + -ing</i> = «привыкнуть», его пока не путаем.)</div>`,
theory2:`<p>used to — это «<b>раньше</b>». Как в русском: «Раньше я боялся темноты» — ${s('I used to be afraid of the dark.')}</p>
<p>Значит: тогда — да, а сейчас — уже нет.</p>
<p>${s('I used to have long hair.')} — Раньше у меня были длинные волосы.<br>${s('She used to live in Sochi.')} — Раньше она жила в Сочи.</p>
<p>Просто запомни кусочек <b>used to</b> и ставь после него обычный глагол.</p>`,
items:[
 {lvl:1,text:'When I was little, I {used to*|use to|was used to} sleep with a teddy bear.',
  why:'«Раньше, в детстве, бывало» → <b>used to</b> + V1 (sleep). «use to» без d в утверждении — ошибка, «was used to sleep» так не говорят.',
  why2:'Раньше (а сейчас нет) → used to.'},
 {lvl:1,text:'My grandad {used to*|uses to|used} work at a factory, but now he is retired.',
  why:'Раньше работал, а теперь на пенсии → <b>used to</b> work. «uses to» не бывает, а «used work» — без to нельзя.',
  why2:'used to — одна форма для всех: he used to.'},
 {lvl:1,text:'We used to {live*|lived|living} in a small flat.',
  why:'После <b>used to</b> — 1-я форма глагола: <b>live</b>. lived и living — ошибка.',
  why2:'used to + V1 (как после to обычно).'},
 {lvl:1,q:'Что значит <i>I used to play football</i>?',opts:['Раньше я играл в футбол (а теперь нет).','Я привык играть в футбол.','Я буду играть в футбол.'],ans:0,
  why:'<b>used to</b> + V1 = «раньше регулярно делал, а теперь нет».',
  why2:'used to = «раньше».'},
 {lvl:1,text:'There {used to*|use to|was used to} be a cinema in our street.',
  why:'Раньше на улице был кинотеатр (теперь нет) → There <b>used to</b> be…',
  why2:'There used to be = «раньше здесь был(о)».'},
 {type:'listen',lvl:1,say:'I used to play the piano.',q:'Послушай. Играет ли человек на пианино сейчас?',opts:['Скорее нет — так было раньше','Да, каждый день','Начнёт со следующей недели'],ans:0,
  why:'<i>I <b>used to</b> play the piano.</i> — «Раньше я играл на пианино» → сейчас уже не играет.',
  why2:'used to = было раньше, сейчас — нет.'},
 {type:'read',lvl:1,text:'I used to be afraid of the dark.',q:'Прочитай вслух',
  why:'<b>used to</b> читается слитно [ˈjuːstə] — «юста», звук [s], а не [z]. <b>afraid</b> [əˈfreɪd] — ударение на второй слог. <b>dark</b> [dɑːk] — r не читается.',
  why2:'I USED to be aFRAID of the DARK.'},
 {lvl:2,text:'I {didn’t use to*|didn’t used to|not used to} like broccoli, but now I love it.',
  why:'Отрицание: <b>didn’t use to</b>. После did глагол всегда в 1-й форме → <b>use</b> без d.',
  why2:'did + V1: didn’t use to (как didn’t play, didn’t go).'},
 {lvl:2,text:'{Did*|Do|Were} you use to climb trees when you were small?',
  why:'Вопрос: <b>Did</b> you use to…? Речь о прошлом (when you were small), поэтому did. «Were you use to» — ошибка.',
  why2:'Вопрос с used to строится через did, как в Past Simple.'},
 {lvl:2,text:'— Did your dad use to have long hair? — Yes, he {did*|used|was}.',
  why:'Вопрос начинался с <b>Did</b> → короткий ответ: Yes, he <b>did</b>.',
  why2:'Did…? — Yes, he did. / No, he didn’t.'},
 {lvl:2,text:'My sister {used to be*|used to being|use to be} afraid of dogs.',
  why:'Раньше боялась → <b>used to be</b> afraid. После used to — V1 (be), а не being. «use to» в утверждении без d — ошибка.',
  why2:'used to + be = «раньше была».'},
 {lvl:2,text:'People {didn’t use to*|didn’t used to|don’t use to} have mobile phones fifty years ago.',
  why:'Прошлое (fifty years ago) + отрицание → <b>didn’t use to</b>. «don’t use to» — настоящего времени у used to нет.',
  why2:'Раньше не было → didn’t use to have.'},
 {type:'spell',lvl:2,say:'used to',ans:['used to'],q:'Послушай и напиши (два слова).',
  why:'Слышится [ˈjuːstə] — d почти не слышно, но пишется <b>used to</b>.',
  why2:'u-s-e-d, пробел, t-o.'},
 {lvl:2,text:'When my mum was a girl, she used to {play*|played|plays} tennis. She {was*|were@en.p.was_were} very good at it.',
  why:'1) После used to — V1: <b>play</b>. 2) she → <b>was</b> (were — для you, we, they).',
  why2:'used to play. Она — was.'},
 {lvl:2,text:'My grandparents used to {keep*|kept|keeping} {sheep*|sheeps@en.s.plurals} on their farm.',
  why:'1) used to + V1: <b>keep</b>. 2) <b>sheep</b> — исключение: множественное число такое же, как единственное (one sheep — ten sheep).',
  why2:'used to keep. Овцы — sheep (без -s).'},
 {lvl:3,text:'Last summer I {went*|used to go} to the sea three times.',
  why:'Указано, <b>сколько раз</b> (three times) и когда (last summer) → Past Simple: <b>went</b>. used to говорит о долгой привычке без счёта.',
  why2:'Посчитали — Past Simple. «Раньше бывало» — used to.'},
 {lvl:3,text:'I used to get up late. Now I {usually*|use to|used to} get up at seven.',
  why:'О <b>настоящей</b> привычке (Now) used to не говорят. Настоящее время: Now I <b>usually</b> get up at seven.',
  why2:'used to — только о прошлом. Сейчас — usually.'},
 {lvl:3,q:'Выбери правильное предложение.',opts:['He used to live in London.','He use to live in London.','He used to lived in London.','He was used to live in London.'],ans:0,
  why:'Правильно: <b>used to + V1</b> → He used to live. Без d, с V2 или с was — ошибки.',
  why2:'Форма одна: used to + live.'},
 {lvl:3,text:'I used to be {shorter*|more short|shortest@en.6.comparatives} than my brother, but now I am taller.',
  why:'1) used to be — раньше был. 2) short — короткое прилагательное + than → <b>shorter</b>. «more short» неверно.',
  why2:'Раньше был ниже (short → shorter), теперь выше (taller).'},
 {lvl:3,text:'We used to go to the park {on*|in|at@en.5.prep_time} Sundays.',
  why:'С днями недели — <b>on</b>: on Sundays («по воскресеньям»). used to go — раньше ходили регулярно.',
  why2:'Дни недели → on.'},
 {lvl:3,text:'My uncle used to {smoke*|smoked}, but he {gave*|gived|given@en.6.past_irreg} it up five years ago.',
  why:'1) used to + V1: <b>smoke</b>. 2) five years ago → Past Simple; give — <b>gave</b> — given. give up = «бросить (привычку)».',
  why2:'used to smoke. Бросил пять лет назад — gave up.'},
 {type:'read',lvl:3,text:'We used to live in a small village, but now we live in a big city.',q:'Прочитай вслух',
  why:'<b>used to</b> [ˈjuːstə]. <b>live</b> [lɪv] — короткий [ɪ]. <b>village</b> [ˈvɪlɪdʒ] и <b>city</b> [ˈsɪti] — ударение на первый слог.',
  why2:'Сравни: «we USED to live» (раньше) — «but NOW we live» (сейчас).'}
]});

/* ===================== Relative clauses ===================== */
RU.rule({
id:'en.7.relative',
short:'<b>who</b> — о людях, <b>which</b> — о предметах и животных, <b>whose</b> — «чей», <b>where</b> — «где» (о месте). <i>The girl <b>who</b> lives next door… / The book <b>which</b> I read… / The town <b>where</b> I was born…</i>',
theory:`<p>Относительные слова соединяют два предложения в одно и поясняют, <b>о ком или о чём</b> речь — как русские «который», «чей», «где».</p>
<table class="sym"><tr><th>Слово</th><th>О ком / о чём</th><th>Пример</th></tr>
<tr><td><b>who</b></td><td>люди (который, которая)</td><td>${s('The girl who lives next door is my friend.')}</td></tr>
<tr><td><b>which</b></td><td>предметы, животные</td><td>${s('The cake which Mum made was delicious.')}</td></tr>
<tr><td><b>that</b></td><td>и люди, и предметы (вместо who / which)</td><td>${s('The film that we saw was funny.')}</td></tr>
<tr><td><b>whose</b></td><td>чей, чья, чьё</td><td>${s('I have a friend whose father is a pilot.')}</td></tr>
<tr><td><b>where</b></td><td>место (где, в котором)</td><td>${s('This is the town where I was born.')}</td></tr></table>
<div class="box rule"><b>where или which? (о месте)</b>Посмотри на глагол после пропуска.<br>Если после него уже всё есть, предложение закончено — <b>where</b>: ${s('This is the house where my grandad lived.')} (жил <b>где</b>? — там)<br>Если глаголу нужен предмет (построил <b>что?</b>) или подлежащее — <b>which</b>: ${s('This is the house which my grandad built.')} (построил <b>что</b>? — дом)<br>${s('We stayed at a hotel which had a big pool.')} (у отеля <b>был</b> бассейн — отель сам подлежащее)</div>
<div class="box tip"><b>Как запомнить</b><b>who</b> — «кто», значит про людей. <b>which</b> — «который» про вещи. <b>whose</b> — «чей» (после него сразу существительное: whose <b>dog</b>, whose <b>father</b>). <b>where</b> — «где».</div>
<div class="box err"><b>Типичные ошибки</b>✗ The man which… → ✓ ${s('The man who…')}<br>✗ The boy who’s dog… → ✓ ${s('The boy whose dog…')} (who’s = who is)<br>✗ The town which I was born → ✓ ${s('The town where I was born.')}<br>Глагол после who согласуем с главным словом: ${s('The woman who lives upstairs…')} (woman — она → lives).</div>`,
theory2:`<p>Это как русское «который».</p>
<p>Человек → <b>who</b>: ${s('the boy who sings')} — мальчик, который поёт.<br>Вещь или животное → <b>which</b>: ${s('the cat which sleeps')} — кошка, которая спит.<br>Чей? → <b>whose</b>: ${s('the girl whose cat is black')} — девочка, чья кошка чёрная.<br>Место, где → <b>where</b>: ${s('the park where we play')} — парк, где мы играем.</p>`,
items:[
 {lvl:1,text:'The girl {who*|which|where} lives next door is my friend.',
  why:'<b>girl</b> — человек → <b>who</b>. which — для вещей, where — для мест.',
  why2:'Девочка, которая… — человек → who.'},
 {lvl:1,text:'This is the book {which*|who|whose} I told you about.',
  why:'<b>book</b> — предмет → <b>which</b>. who — для людей, whose — «чей» (после него нужно существительное).',
  why2:'Книга, которая… — вещь → which.'},
 {lvl:1,text:'This is the town {where*|who|which} I was born.',
  why:'Речь о <b>месте</b>, и после пропуска предложение закончено (I was born — родился <b>где?</b>) → <b>where</b>.',
  why2:'Город, где я родился → where.'},
 {lvl:1,text:'I have a friend {whose*|who|which} father is a pilot.',
  why:'«Друг, <b>чей</b> отец — пилот» → <b>whose</b>. После whose сразу идёт существительное (father).',
  why2:'чей отец? → whose father.'},
 {lvl:1,q:'Какое слово используем, когда говорим о <b>людях</b>?',opts:['who','which','where'],ans:0,
  why:'О людях — <b>who</b> (можно и that). which — о предметах и животных, where — о местах.',
  why2:'who = кто → люди.'},
 {type:'listen',lvl:1,say:'This is the man whose son is a famous singer.',q:'Послушай. Какое слово соединяет части предложения?',opts:['whose','which','where'],ans:0,
  why:'<i>This is the man <b>whose</b> son is a famous singer.</i> — «Это человек, <b>чей</b> сын — известный певец». whose [huːz].',
  why2:'whose son = «чей сын».'},
 {type:'read',lvl:1,text:'The girl who sits next to me is very kind.',q:'Прочитай вслух',
  why:'<b>who</b> [huː] — w не читается, звучит [h]. <b>sits</b> [sɪts]. <b>next to</b> — [ˈnekst tə], t почти сливаются. <b>kind</b> [kaɪnd].',
  why2:'The GIRL who SITS next to me / is VEry KIND.'},
 {lvl:2,text:'The cake {which*|who|where} Mum made was delicious.',
  why:'<b>cake</b> — предмет, и мама сделала <b>что?</b> — торт → <b>which</b>.',
  why2:'Торт, который… — вещь → which.'},
 {lvl:2,text:'A vet is a doctor {who*|which|whose} helps animals.',
  why:'<b>doctor</b> — человек → <b>who</b>. whose не подходит: после него должно быть существительное.',
  why2:'Врач, который помогает → who.'},
 {lvl:2,text:'That’s the café {where*|which|who} we first met.',
  why:'<b>café</b> — место; «мы встретились» — предложение закончено (встретились <b>где?</b> — там) → <b>where</b>.',
  why2:'Кафе, где мы познакомились → where.'},
 {lvl:2,text:'The man {whose*|who|who’s} car was stolen called the police.',
  why:'«Мужчина, <b>чью</b> машину украли» → <b>whose</b> car. who’s = who is («кто есть») — здесь не подходит, хотя звучит так же.',
  why2:'Чья машина? → whose car.'},
 {lvl:2,text:'A dictionary is a book {which*|who|where} explains the meaning of words.',
  why:'Словарь — книга, предмет, и она сама объясняет (подлежащее) → <b>which</b>.',
  why2:'Книга, которая объясняет → which.'},
 {lvl:2,text:'The woman {who*|which|where} {lives*|live@en.5.ps} upstairs is a teacher.',
  why:'1) woman — человек → <b>who</b>. 2) Глагол после who согласуем с woman (она) → Present Simple с -s: <b>lives</b>.',
  why2:'Женщина (she), которая живёт → who lives.'},
 {lvl:2,text:'I like films {which*|who|where} {are*|is@en.s.to_be} funny.',
  why:'1) films — предметы → <b>which</b>. 2) films — много → <b>are</b> funny.',
  why2:'Фильмы, которые смешные → which are.'},
 {type:'listen',lvl:2,say:'The town where I was born is very small.',q:'Послушай. О чём говорят?',opts:['о городе, где я родился','о человеке, который родился в городе','о доме, который построили'],ans:0,
  why:'<i>The town <b>where</b> I was born is very small.</i> — «Город, где я родился, очень маленький».',
  why2:'where = где → речь о месте.'},
 {lvl:3,text:'This is the house {which*|where|who} my grandad built.',
  why:'Ловушка! Дедушка построил <b>что?</b> — дом. Глаголу built нужен предмет, его и заменяет <b>which</b>. where поставили бы, если бы глаголу ничего не было нужно.',
  why2:'built what? — the house → which.'},
 {lvl:3,text:'This is the house {where*|which|whose} my grandad lived as a boy.',
  why:'Дедушка <b>жил где?</b> — в этом доме. После lived предмет не нужен → <b>where</b>.',
  why2:'Жил где? — там → where. Построил что? — which.'},
 {lvl:3,text:'We stayed at a hotel {which*|where|who} had a big swimming pool.',
  why:'Ловушка! После пропуска сразу <b>had</b> — нужно подлежащее: отель имел бассейн → <b>which</b> (отель = предмет). «where had» — нет подлежащего.',
  why2:'Кто имел бассейн? Отель → which had.'},
 {lvl:3,q:'В каком предложении <b>нельзя</b> поставить <b>which</b>?',opts:['The boy ___ won the race is my cousin.','The bike ___ I bought is red.','The film ___ we saw was funny.'],ans:0,
  why:'<b>The boy</b> — человек, для людей which не используют: The boy <b>who</b> won the race… В остальных — предметы (bike, film), там which подходит.',
  why2:'Люди → who (или that), не which.'},
 {lvl:3,text:'The {children*|childrens@en.s.plurals} {who*|which|whose} sing in the school choir are very talented.',
  why:'1) <b>children</b> — уже множественное число, «childrens» — ошибка. 2) Дети — люди → <b>who</b>.',
  why2:'child → children (без s). Люди → who.'},
 {lvl:3,text:'The boy {whose*|who|which} bike {was*|were@en.p.was_were} stolen went to the police.',
  why:'1) «Мальчик, <b>чей</b> велосипед…» → <b>whose</b> bike. 2) bike — один → <b>was</b> stolen.',
  why2:'Чей велосипед? → whose. Велосипед один → was.'},
 {lvl:3,text:'This is the {biggest*|bigest|most big@en.6.comparatives} park in our city. It’s the place {where*|which|who} I walk my dog.',
  why:'1) big → <b>biggest</b>: короткий гласный + одна согласная → g удваиваем. 2) Гуляю с собакой <b>где?</b> — там, предложение закончено → <b>where</b>.',
  why2:'big → bigger → biggest. Место, где гуляю → where.'},
 {type:'read',lvl:3,text:'This is the park where we play football after school.',q:'Прочитай вслух',
  why:'<b>where</b> [weə] — губы трубочкой [w], r не читается. <b>park</b> [pɑːk], <b>after</b> [ˈɑːftə] — долгий [ɑː]. <b>football</b> — ударение на FOOT.',
  why2:'This is the PARK / where we play FOOTball / after SCHOOL.'}
]});

/* ===================== Conditionals 0 and 1 ===================== */
RU.rule({
id:'en.7.cond_01',
short:'<b>Нулевой тип</b> (всегда так): If + Present Simple, Present Simple — <i>If you heat ice, it melts.</i> <b>Первый тип</b> (реально в будущем): If + Present Simple, <b>will</b> + V1 — <i>If it rains tomorrow, we will stay at home.</i> После <b>if</b> will не ставим!',
theory:`<p>Условные предложения — это «если …, то …». В 7 классе их два типа.</p>
<div class="box rule"><b>Нулевой тип — «так бывает всегда»</b>If + Present Simple, Present Simple<br>Законы природы, факты, правила:<br>${s('If you heat ice, it melts.')}<br>${s('If you mix red and white, you get pink.')}<br>${s('If plants don’t get water, they die.')}</div>
<div class="box rule"><b>Первый тип — «реально может случиться в будущем»</b>If + Present Simple, <b>will</b> + V1<br>${s('If it rains tomorrow, we will stay at home.')}<br>${s('If you don’t hurry, you will miss the bus.')}<br>${s('If I see Tom, I will tell him the news.')}</div>
<div class="box err"><b>Главная ошибка</b>После <b>if</b> <b>will не ставим</b>, даже если по-русски «будет»!<br>«Если завтра <b>пойдёт</b> дождь…» → ✗ If it will rain → ✓ ${s('If it rains tomorrow…')}<br>Will — только в другой части: ${s('…we will stay at home.')}</div>
<div class="box tip"><b>Как запомнить</b>«<b>If</b> и <b>will</b> — не друзья, рядом не сидят». А ещё: если часть с if стоит первой, ставим запятую: ${s('If it snows, we will make a snowman.')} Если второй — запятая не нужна: ${s('We will make a snowman if it snows.')}</div>
<table class="sym"><tr><th>Тип</th><th>Часть с if</th><th>Другая часть</th></tr>
<tr><td>0 (всегда)</td><td>Present Simple</td><td>Present Simple</td></tr>
<tr><td>1 (будущее)</td><td>Present Simple</td><td>will + V1</td></tr></table>`,
theory2:`<p>Представь две половинки: «Если …» и «то …».</p>
<p>В половинке с <b>if</b> — всегда простое настоящее время (как будто «если идёт дождь»).</p>
<p>Если это <b>всегда</b> так (лёд тает от тепла) — и вторая половинка в настоящем: ${s('If you heat ice, it melts.')}</p>
<p>Если это про <b>завтра</b> или конкретный случай — во второй половинке <b>will</b>: ${s('If it rains, I will stay at home.')}</p>`,
items:[
 {lvl:1,text:'If it {rains*|will rain|rained} tomorrow, we will stay at home.',
  why:'В части с <b>if</b> — Present Simple, даже про завтра: <b>If it rains</b>. it → rain<b>s</b>. «If it will rain» — главная ошибка!',
  why2:'If и will рядом не стоят. it rains (с -s).'},
 {lvl:1,text:'If you heat ice, it {melts*|will melts|melted}.',
  why:'Это закон природы (нулевой тип) → Present Simple: it <b>melts</b>. «will melts» — ошибка: после will -s не бывает.',
  why2:'Всегда так бывает → Present Simple: it melts.'},
 {lvl:1,text:'If you {don’t*|won’t|doesn’t} hurry, you will miss the bus.',
  why:'В части с if — Present Simple: отрицание с you → <b>don’t</b>. won’t (= will not) после if не ставим, doesn’t — для he / she / it.',
  why2:'If you don’t… — Present Simple с you.'},
 {lvl:1,text:'If I see Tom tomorrow, I {will tell*|tell|told} {him*|he|his@en.5.pronouns} the news.',
  why:'1) Конкретный случай в будущем (tomorrow) → первый тип: во второй части <b>will tell</b>. 2) Скажу <b>кому?</b> — ему → объектное местоимение <b>him</b> (he — «он», his — «его» чей).',
  why2:'Если увижу завтра → тогда скажу: will tell. Кому? — him.'},
 {lvl:1,q:'Какое время ставим в части с <b>if</b>, если речь о будущем?',opts:['Present Simple','Future Simple (will)','Past Simple'],ans:0,
  why:'После <b>if</b> — <b>Present Simple</b>: If it rains tomorrow… Will — только в другой части.',
  why2:'If + настоящее время. Всегда.'},
 {type:'listen',lvl:1,say:'If I have time, I will call you.',q:'Послушай. Что обещает говорящий?',opts:['позвонить, если будет время','позвонить в любом случае','он уже позвонил'],ans:0,
  why:'<i><b>If</b> I have time, I <b>will call</b> you.</i> — «Если у меня будет время, я тебе позвоню». Позвонит только при условии.',
  why2:'if = «если» → условие. will call = позвонит.'},
 {type:'read',lvl:1,text:'If it rains tomorrow, we will stay at home.',q:'Прочитай вслух',
  why:'<b>rains</b> [reɪnz] — на конце [z]. <b>tomorrow</b> [təˈmɒrəʊ] — ударение на второй слог. <b>will</b> [wɪl] — губы трубочкой. После запятой — маленькая пауза.',
  why2:'If it RAINS toMORrow, / we will STAY at HOME.'},
 {lvl:1,text:'If {he*|him@en.5.pronouns} {comes*|will come|come} late again, the teacher will be angry.',
  why:'1) Подлежащее «он» → <b>he</b> (him — «его / ему»). 2) После if — Present Simple, he → <b>comes</b>. will come после if нельзя.',
  why2:'If he comes (Present Simple, -s), …will be angry.'},
 {lvl:2,text:'If you mix red and white, you {get*|will got|got} pink.',
  why:'Факт, так всегда бывает (нулевой тип) → Present Simple: you <b>get</b> pink. «will got» — ошибка: после will только V1.',
  why2:'Всегда так → get (настоящее время).'},
 {lvl:2,text:'We {will go*|goes|went} to the beach if the weather {is*|will be|was} nice on Saturday.',
  why:'1) Будущее (on Saturday) → <b>will go</b>. goes — не для we. 2) В части с if — Present Simple: <b>is</b> nice. «will be» после if нельзя.',
  why2:'Часть с if может стоять второй — правило то же: if + Present Simple.'},
 {lvl:2,text:'If plants {don’t get*|won’t get|doesn’t get} water, they die.',
  why:'Это факт природы (нулевой тип), plants — они → <b>don’t get</b>. doesn’t — для одного, won’t после if не ставим.',
  why2:'Растения (they) → don’t. Всегда так → Present Simple.'},
 {lvl:2,text:'What will you do if you {don’t pass*|won’t pass|didn’t pass} the exam?',
  why:'После <b>if</b> — Present Simple: <b>don’t pass</b>. Вопрос о будущем, но в части с if — настоящее время.',
  why2:'if + don’t pass. Will — в другой части (What will you do).'},
 {lvl:2,text:'If she {studies*|study|will study} hard, she will get a good mark.',
  why:'После if — Present Simple, she → с -s: study → <b>studies</b> (согласная + y → ies).',
  why2:'she studies (y → ies). Will — только во второй части.'},
 {lvl:2,text:'If you eat too {many*|much@en.6.much_many} sweets, your teeth will hurt.',
  why:'<b>sweets</b> — исчисляемые (их можно посчитать) → <b>many</b>. much — для неисчисляемых (much sugar). Остальное — первый тип: If you eat…, …will hurt.',
  why2:'Конфеты считаются → many sweets.'},
 {lvl:3,q:'Какое предложение <b>неправильное</b>?',opts:['If it will snow, we will make a snowman.','If it snows, we will make a snowman.','We will make a snowman if it snows.'],ans:0,
  why:'Ошибка — <b>If it will snow</b>. После if — Present Simple: If it snows. Порядок частей может быть любым.',
  why2:'If + will = ошибка.'},
 {lvl:3,q:'<i>If you press this button, the machine starts.</i> Какой это тип условного предложения?',opts:['нулевой: так происходит всегда','первый: один конкретный случай в будущем'],ans:0,
  why:'Обе части в Present Simple (press, starts) → <b>нулевой тип</b>: так машина работает всегда, это правило.',
  why2:'Нет will → нулевой тип, «всегда так».'},
 {lvl:3,text:'If I {have*|will have|has} time this evening, I {will help*|help|helped} you with your project.',
  why:'1) После if — Present Simple, I → <b>have</b>. 2) Конкретное будущее (this evening) → <b>will help</b>.',
  why2:'If I have time…, I will help. Первый тип.'},
 {lvl:3,text:'Water {boils*|will boils|boiled} if you heat it to one hundred degrees.',
  why:'Закон природы (нулевой тип) → Present Simple: water — оно → <b>boils</b>. «will boils» — ошибка формы.',
  why2:'Всегда так → boils (с -s).'},
 {lvl:3,text:'If the weather {is*|will be|was} {better*|gooder|more good@en.6.comparatives} tomorrow, we will go for a picnic.',
  why:'1) После if — Present Simple: <b>is</b>. 2) good — исключение: good → <b>better</b> → the best. «gooder» и «more good» неверно.',
  why2:'If the weather is better… good → better.'},
 {type:'listen',lvl:3,say:'If you heat water, it boils.',q:'Послушай. Какой это тип условного предложения?',opts:['нулевой (так бывает всегда)','первый (конкретное будущее)'],ans:0,
  why:'<i>If you heat water, it <b>boils</b>.</i> — обе части в Present Simple, это закон природы → <b>нулевой</b> тип.',
  why2:'Нет will, факт → нулевой тип.'},
 {type:'read',lvl:3,text:'If you don’t hurry, you will miss the bus.',q:'Прочитай вслух',
  why:'<b>don’t</b> [dəʊnt], <b>hurry</b> [ˈhʌri] — звук [ʌ], как короткое «а». <b>miss</b> [mɪs] — короткий [ɪ]. <b>bus</b> [bʌs].',
  why2:'If you don’t HURry, / you will MISS the BUS.'}
]});

/* ===================== Modals ===================== */
RU.rule({
id:'en.7.modals',
short:'<b>should</b> — совет («следует»), <b>may</b> — разрешение («можно?») или возможность, <b>might</b> — «может быть» (не уверен), <b>could</b> — умел в прошлом или вежливая просьба. После них — <b>V1 без to</b>: <i>You should <b>go</b>.</i>',
theory:`<p>Модальные глаголы показывают <b>отношение</b>: советую, разрешаю, сомневаюсь, умел.</p>
<table class="sym"><tr><th>Глагол</th><th>Значение</th><th>Пример</th></tr>
<tr><td><b>should</b> / shouldn’t</td><td>совет: следует / не следует</td><td>${s('You should drink more water.')}<br>${s('You shouldn’t eat so many sweets.')}</td></tr>
<tr><td><b>may</b></td><td>вежливое разрешение: можно?</td><td>${s('May I come in?')}</td></tr>
<tr><td><b>might</b> (и may)</td><td>возможно, может быть (не уверен)</td><td>${s('Take an umbrella. It might rain.')}</td></tr>
<tr><td><b>could</b> / couldn’t</td><td>умел, мог (в прошлом)</td><td>${s('When I was five, I could swim.')}</td></tr>
<tr><td><b>could</b></td><td>вежливая просьба</td><td>${s('Could you open the window, please?')}</td></tr></table>
<div class="box rule"><b>Три железных правила</b>1) После модального глагола — <b>V1 без to</b>: ${s('She should see a doctor.')} (✗ should to see)<br>2) <b>Без -s</b> в 3-м лице: ${s('He might come.')} (✗ he mights, ✗ he might comes)<br>3) Вопрос и отрицание — <b>без do</b>: ${s('Should I go?')} ${s('You shouldn’t go.')}</div>
<div class="box tip"><b>Как запомнить</b><b>should</b> — «совет друга». <b>might</b> — «пятьдесят на пятьдесят». <b>could</b> — прошедшее от can: can (могу) → could (мог). <b>May I…?</b> — самый вежливый способ спросить разрешения.</div>
<div class="box err"><b>Типичные ошибки</b>✗ You should to go → ✓ ${s('You should go.')}<br>✗ She shoulds → ✓ ${s('She should.')}<br>✗ Do I should…? → ✓ ${s('Should I…?')}<br>✗ He might is at home → ✓ ${s('He might be at home.')}</div>`,
theory2:`<p>Это «волшебные» глаголы-помощники. Они не меняются и ставят после себя обычный глагол.</p>
<p>${s('You should rest.')} — Тебе следует отдохнуть (совет).<br>${s('May I go out?')} — Можно мне выйти? (разрешение)<br>${s('It might snow.')} — Может быть, пойдёт снег (не уверен).<br>${s('I could read at four.')} — Я умел читать в четыре года (прошлое).</p>
<p>Никаких to, никаких -s: should go, might go, could go.</p>`,
items:[
 {lvl:1,text:'You {should*|should to|shoulds} drink more water.',
  why:'Совет → <b>should</b> + V1 без to: should drink. «should to» и «shoulds» — ошибки.',
  why2:'should + глагол. Без to, без -s.'},
 {lvl:1,text:'You look tired. You {should*|mustn’t|can’t} go to bed early.',
  why:'Даём <b>совет</b> уставшему человеку: тебе <b>следует</b> лечь пораньше → <b>should</b>. mustn’t — запрет, can’t — «не можешь»: не по смыслу.',
  why2:'Совет → should.'},
 {lvl:1,text:'When I was five, I {could*|can|may} swim.',
  why:'Умение в <b>прошлом</b> (when I was five) → <b>could</b> (прошедшее от can).',
  why2:'can — умею сейчас, could — умел раньше.'},
 {lvl:1,text:'She might {come*|comes|to come} to the party.',
  why:'После модального глагола — <b>V1 без to и без -s</b>: might <b>come</b>.',
  why2:'might + come. Никаких изменений.'},
 {lvl:1,q:'Каким глаголом дают <b>совет</b>?',opts:['should','could','might'],ans:0,
  why:'Совет — <b>should</b>: You should see a doctor. could — умел / вежливая просьба, might — «может быть».',
  why2:'should = «следует, лучше бы».'},
 {type:'listen',lvl:1,say:'You should see a doctor.',q:'Послушай. Что это?',opts:['совет','разрешение','умение в прошлом'],ans:0,
  why:'<i>You <b>should</b> see a doctor.</i> — «Тебе следует сходить к врачу» → это <b>совет</b>.',
  why2:'should = совет.'},
 {type:'read',lvl:1,text:'You should drink more water.',q:'Прочитай вслух',
  why:'<b>should</b> [ʃʊd] — буква l не читается! <b>drink</b> [drɪŋk] — носовой [ŋ] перед k. <b>water</b> [ˈwɔːtə] — [w] губами, r на конце не читается.',
  why2:'You SHOULD drink MORE WAter. В should — без «л».'},
 {lvl:2,text:'{Could*|Should|Might} you open the window, please?',
  why:'<b>Вежливая просьба</b> (please) → <b>Could</b> you…? Should you / Might you так не просят.',
  why2:'Could you…, please? = «Не могли бы вы…?»'},
 {lvl:2,text:'— Excuse me, {may*|will|am} I come in? — Yes, of course.',
  why:'Вежливо <b>спрашиваем разрешения</b> → <b>May</b> I come in? «Will I come in?» и «Am I come in?» — неправильно.',
  why2:'Можно войти? → May I…?'},
 {lvl:2,text:'Take an umbrella. It {might*|shouldn’t|mustn’t} rain later.',
  why:'«Возьми зонт — <b>может быть</b>, пойдёт дождь» → <b>might</b>. shouldn’t — «не должен бы» (тогда зачем зонт?), mustn’t — запрет, дождю ничего не запретишь.',
  why2:'might = возможно, не уверен.'},
 {lvl:2,text:'You {shouldn’t*|should|could} eat so many sweets. They are bad for your teeth.',
  why:'Конфеты вредны → совет <b>не</b> делать: <b>shouldn’t</b>.',
  why2:'Плохо для зубов → не следует → shouldn’t.'},
 {lvl:2,text:'Last year I {couldn’t*|can’t|shouldn’t} ride a bike, but now I can.',
  why:'<b>Last year</b> — прошлое, и речь об умении → <b>couldn’t</b> («не умел»). А сейчас — can.',
  why2:'В прошлом не умел → couldn’t.'},
 {lvl:2,text:'You should {wear*|wears|to wear} a warm coat. It’s {colder*|more cold|coldest@en.6.comparatives} today than yesterday.',
  why:'1) После should — V1 без to: <b>wear</b>. 2) cold + than → <b>colder</b> (короткое прилагательное + er).',
  why2:'should wear. Холоднее, чем вчера → colder than.'},
 {type:'listen',lvl:2,say:'It might snow tomorrow.',q:'Послушай. Насколько уверен говорящий?',opts:['не уверен: возможно, пойдёт','точно знает, что пойдёт','запрещает снегу идти'],ans:0,
  why:'<i>It <b>might</b> snow tomorrow.</i> — «Завтра, может быть, пойдёт снег» → говорящий <b>не уверен</b>.',
  why2:'might = «может быть».'},
 {lvl:3,text:'He {might be*|might is|mights be} at home, but I’m not sure.',
  why:'После might — V1 <b>be</b> (не is), и без -s у самого might → <b>might be</b>.',
  why2:'Модальный + be, а не is / are.'},
 {lvl:3,q:'Выбери правильное предложение.',opts:['She should to see a doctor.','She shoulds see a doctor.','She should see a doctor.','She should sees a doctor.'],ans:2,
  why:'Правильно: <b>She should see</b> a doctor. После should — V1 без to; ни у should, ни у глагола нет -s.',
  why2:'should + see — и всё.'},
 {lvl:3,text:'I’m not sure, but we {might*|mustn’t|might to} go to the cinema tonight.',
  why:'«Не уверен, но <b>может быть</b>, пойдём» → <b>might</b> + V1. «might to» — ошибка (to не нужно), mustn’t — запрет, не по смыслу.',
  why2:'not sure → might.'},
 {lvl:3,q:'Что значит <b>could</b> в предложении <i>When I was six, I could read.</i>?',opts:['умел (в прошлом)','вежливая просьба','совет'],ans:0,
  why:'Есть <b>when I was six</b> — прошлое → could = «<b>умел</b>». Просьба была бы в вопросе: Could you…?',
  why2:'could в рассказе о прошлом = «умел, мог».'},
 {lvl:3,text:'You {shouldn’t*|should|might} watch TV all night. You {have to*|has to@en.6.must_have_to} get up early tomorrow.',
  why:'1) Совет не делать → <b>shouldn’t</b>. 2) Обязанность (надо вставать) с you → <b>have to</b>. has to — только для he / she / it.',
  why2:'Не следует → shouldn’t. you → have to.'},
 {lvl:3,text:'My little brother {could*|can|might} read when he was four, and now he {reads*|read@en.5.ps} a lot.',
  why:'1) Умел в прошлом (when he was four) → <b>could</b>. 2) Сейчас, регулярно, he → Present Simple с -s: <b>reads</b>.',
  why2:'Тогда умел — could. Сейчас читает — he reads.'},
 {lvl:3,text:'Excuse me, {could*|should|might} you tell me where the {nearest*|most near|nearer@en.6.comparatives} bank is?',
  why:'1) Вежливая просьба к незнакомцу → <b>could</b> you…? 2) «Ближайший» → превосходная степень от near: <b>the nearest</b>.',
  why2:'Could you…? — вежливо. near → nearest (самый близкий).'},
 {lvl:3,text:'We {might*|mights|might to} go to {the*|a|_@en.5.articles} seaside next summer, but we aren’t sure.',
  why:'1) Не уверены → <b>might</b> + V1 (без -s, без to). 2) Устойчивое выражение: go to <b>the</b> seaside («на море»).',
  why2:'might go. the seaside — всегда с the.'},
 {type:'read',lvl:3,text:'It might rain later, so you should take an umbrella.',q:'Прочитай вслух',
  why:'<b>might</b> [maɪt] — gh не читается. <b>should</b> [ʃʊd] — l не читается. <b>umbrella</b> [ʌmˈbrelə] — ударение на второй слог. <b>an umbrella</b> — слитно: [ənʌm…].',
  why2:'It might RAIN later, / so you should TAKE an umBRELla.'}
]});

/* ===================== Фонетика: /w/ и /v/ ===================== */
RU.rule({
id:'en.7.ph_wv',
short:'<b>/w/</b> — губы вытянуты трубочкой, как для «у», зубы губ <b>не касаются</b>: <i>west, wine, wet</i>. <b>/v/</b> — верхние зубы касаются нижней губы, как русское «в»: <i>vest, vine, vet</i>.',
theory:`<p>В русском языке звука /w/ нет, поэтому мы часто говорим вместо него «в». А по-английски это <b>разные слова</b>: ${s('west')} (запад) и ${s('vest')} (майка)!</p>
<table class="sym"><tr><th>Звук</th><th>Как произносить</th><th>Слова</th></tr>
<tr><td>${tr('w')}</td><td>Губы округлить и вытянуть вперёд трубочкой, как для «у», и сразу раскрыть. Зубы губ не касаются. Похоже на быстрое «уэ».</td><td>${s('we')}, ${s('window')}, ${s('water')}, ${s('what')}, ${s('one')} ${tr('wʌn')}, ${s('queen')} ${tr('kwiːn')}</td></tr>
<tr><td>${tr('v')}</td><td>Верхние зубы слегка касаются нижней губы — как русское «в».</td><td>${s('very')}, ${s('village')}, ${s('voice')}, ${s('river')}, ${s('seven')}</td></tr></table>
<div class="box ex"><b>Пары слов — послушай и сравни</b>${s('west')} ${tr('west')} — ${s('vest')} ${tr('vest')}<br>${s('wine')} ${tr('waɪn')} (вино) — ${s('vine')} ${tr('vaɪn')} (виноградная лоза)<br>${s('wet')} ${tr('wet')} (мокрый) — ${s('vet')} ${tr('vet')} (ветеринар)</div>
<div class="box rule"><b>Как пишется /w/</b><b>w</b>: ${s('we')}, ${s('west')}<br><b>wh</b>: ${s('what')}, ${s('when')}, ${s('where')}, ${s('white')} — но в ${s('who')}, ${s('whose')}, ${s('whole')} wh читается как ${tr('h')}!<br><b>qu</b> = ${tr('kw')}: ${s('queen')}, ${s('quick')}<br>Без буквы w: ${s('one')} и ${s('once')} начинаются со звука ${tr('w')}.</div>
<div class="box tip"><b>Как запомнить</b>Перед /w/ подумай «у»: «у-ест» → ${s('west')}. Проверь в зеркале: при /w/ губы трубочкой, при /v/ видно верхние зубы на нижней губе.<br>Скороговорка: ${s('We went west in a white van.')}</div>
<div class="box err"><b>Типичная ошибка</b>Говорить «вэл» вместо ${s('well')}, «вот» вместо ${s('what')}. Тогда ${s('wet')} превращается в ${s('vet')}, и вместо «мокрый» получается «ветеринар».</div>`,
theory2:`<p>Два звука — два положения губ.</p>
<p><b>/w/</b>: сделай губы, как будто хочешь подуть на горячий чай или сказать «у». Теперь скажи ${s('we')}. Зубы не участвуют!</p>
<p><b>/v/</b>: прикуси нижнюю губу верхними зубами — легко — и скажи ${s('very')}. Это наше «в».</p>
<p>${s('wet')} — мокрый (губы трубочкой). ${s('vet')} — ветеринар (зубы на губу).</p>`,
items:[
 {type:'listen',lvl:1,say:'west',q:'Послушай. Какое слово прозвучало?',opts:['west','vest'],ans:0,
  why:'Прозвучало <b>west</b> [west] — «запад»: в начале /w/, губы трубочкой. vest — «майка», в начале /v/.',
  why2:'/w/ мягкий, губной, похож на «у». /v/ — с зубами, как «в».'},
 {type:'listen',lvl:1,say:'vest',q:'Послушай. Какое слово прозвучало?',opts:['west','vest'],ans:1,
  why:'Прозвучало <b>vest</b> [vest] — «майка»: в начале /v/, зубы на нижней губе, как русское «в».',
  why2:'Слышишь «в» — это v. Слышишь «у»-образный звук — это w.'},
 {type:'listen',lvl:1,say:'wine',q:'Послушай. Какое слово прозвучало?',opts:['vine','wine'],ans:1,
  why:'Прозвучало <b>wine</b> [waɪn] — «вино», в начале /w/. vine [vaɪn] — «виноградная лоза».',
  why2:'«уайн» — wine, «вайн» — vine.'},
 {type:'listen',lvl:1,say:'vet',q:'Послушай. Какое слово прозвучало?',opts:['wet','vet'],ans:1,
  why:'Прозвучало <b>vet</b> [vet] — «ветеринар», /v/ как русское «в». wet [wet] — «мокрый».',
  why2:'vet — «вет», wet — «уэт».'},
 {lvl:1,q:'Как произносится звук <b>/w/</b>?',opts:['губы вытянуть трубочкой, как для «у», зубы губ не касаются','верхние зубы касаются нижней губы','кончик языка между зубами'],ans:0,
  why:'Для /w/ губы округлены и вытянуты (как «у»), потом быстро раскрываются. Зубы на губе — это /v/, язык между зубами — это /θ/, /ð/.',
  why2:'/w/ — только губы. /v/ — зубы + губа.'},
 {type:'read',lvl:1,text:'We visit our grandmother every week.',q:'Прочитай вслух',
  why:'<b>We</b> и <b>week</b> — /w/: губы трубочкой. <b>visit</b> и <b>every</b> — /v/: зубы на губу. Не перепутай: «уи визит», а не «ви визит».',
  why2:'WE (губы) — VIsit (зубы) — EVery (зубы) — WEEK (губы).'},
 {lvl:1,text:'A {vet*|wet} {is*|are@en.s.to_be} a doctor for animals.',
  why:'1) «Врач для животных» — <b>vet</b> (ветеринар), со звуком /v/. wet — «мокрый». 2) A vet — один → <b>is</b>.',
  why2:'vet = ветеринар (зубы на губу). Один врач → is.'},
 {lvl:2,text:'My dog is ill, so we are taking him to the {vet*|wet}.',
  why:'Собака заболела → ведём к <b>vet</b> (ветеринару). wet — прилагательное «мокрый», не подходит.',
  why2:'К врачу для животных → vet.'},
 {lvl:2,text:'Don’t sit on the bench — it’s {wet*|vet}!',
  why:'Скамейка <b>мокрая</b> → <b>wet</b> [wet], со звуком /w/.',
  why2:'Мокрый — wet (губы трубочкой).'},
 {type:'spell',lvl:2,say:'wet',ans:['wet'],q:'Послушай и напиши слово. В начале /w/ или /v/?',
  why:'Прозвучало <b>wet</b> [wet] — «мокрый», губной /w/ → буква <b>w</b>.',
  why2:'«уэт» — w-e-t.'},
 {type:'spell',lvl:2,say:'village',ans:['village'],q:'Послушай и напиши слово.',
  why:'<b>village</b> [ˈvɪlɪdʒ] — «деревня»: /v/ → буква v; две l; конец [ɪdʒ] пишется -age.',
  why2:'v-i-l-l-a-g-e.'},
 {lvl:2,q:'В каком слове <b>wh</b> читается <b>не</b> как /w/?',opts:['who','what','when','white'],ans:0,
  why:'В <b>who</b> [huː] wh читается как /h/ (так же whose, whole). В what, when, white — /w/.',
  why2:'who, whose, whole — «х». Остальные wh — «у»-образный /w/.'},
 {type:'listen',lvl:2,say:'very well',q:'Послушай. Какие звуки в начале слов?',opts:['/v/, потом /w/','/w/, потом /v/','оба /v/','оба /w/'],ans:0,
  why:'<b>very</b> [ˈveri] — /v/, <b>well</b> [wel] — /w/. Русские часто говорят «вэри вэл» — так неправильно.',
  why2:'VEry — зубы. WELL — губы.'},
 {lvl:2,text:'It {was*|were@en.p.was_were} {wet*|vet} and windy yesterday.',
  why:'1) it → <b>was</b>. 2) «Было <b>мокро</b> и ветрено» → <b>wet</b>.',
  why2:'it was. Мокро — wet.'},
 {lvl:2,text:'Look at {these*|this@en.s.this_that} {vests*|wests} — which one do you like?',
  why:'1) vests — много → <b>these</b> (this — для одного). 2) «майки» — <b>vests</b>, со звуком /v/. «wests» — такого слова нет.',
  why2:'Много вещей рядом → these. Майка — vest.'},
 {lvl:3,q:'В каком слове <b>нет</b> звука /w/?',opts:['very','one','queen','when'],ans:0,
  why:'<b>very</b> начинается с /v/. А <b>one</b> [wʌn] и <b>queen</b> [kwiːn] — с /w/, хотя по буквам не видно! when — тоже /w/.',
  why2:'one [wʌn] и queen [kwiːn] — в обоих есть /w/ (губы трубочкой). very [ˈveri] — /v/.'},
 {type:'listen',lvl:3,say:'We went west.',q:'Послушай. Сколько раз прозвучал звук /w/?',opts:['3','2','1'],ans:0,
  why:'<b>We</b> — <b>went</b> — <b>west</b>: три раза /w/.',
  why2:'Каждое слово начинается с w.'},
 {lvl:3,text:'My grandad {has*|have@en.s.have_got} got a big garden with a {vine*|wine} on the wall.',
  why:'1) grandad = he → <b>has got</b>. 2) На стене растёт <b>vine</b> [vaɪn] — виноградная лоза. wine — вино, на стене не растёт.',
  why2:'he has got. Растение — vine (/v/).'},
 {lvl:3,text:'The wind usually {blows*|blow@en.5.ps} from the {west*|vest} here.',
  why:'1) wind — оно (it) → Present Simple с -s: <b>blows</b>. 2) Ветер дует с <b>запада</b> → <b>west</b>.',
  why2:'it blows. Запад — west.'},
 {type:'read',lvl:2,text:'What a wonderful view of the river!',q:'Прочитай вслух',
  why:'<b>What</b> и <b>wonderful</b> — /w/ (губы). <b>view</b> [vjuː] и <b>river</b> [ˈrɪvə] — /v/ (зубы). Восклицание — в конце голос вниз.',
  why2:'WHAT a WONderful VIEW / of the RIVer!'},
 {type:'read',lvl:3,text:'We were very worried when the van went into the water.',q:'Прочитай вслух',
  why:'/w/: <b>we, were, worried, when, went, water</b>. /v/: <b>very, van</b>. <b>worried</b> [ˈwʌrid] — звук [ʌ].',
  why2:'Следи за губами: w — трубочка, v — зубы на губу.'}
]});

/* ===================== Фонетика: /ŋ/ ===================== */
RU.rule({
id:'en.7.ph_ng',
short:'<b>/ŋ/</b> — носовой звук: задняя часть языка прижата к нёбу, воздух идёт через нос. Буквы <b>ng</b> на конце читаются /ŋ/ <b>без «г»</b>: <i>sing, thing, long</i>. Но в <i>finger, English, hungry, longer</i> — /ŋg/.',
theory:`<p>Звук ${tr('ŋ')} похож на «н», но язык работает по-другому. В русском такого звука нет.</p>
<div class="box rule"><b>Как произносить /ŋ/</b>Скажи «ка» и замри: задняя часть языка прижата к нёбу. Теперь, не отпуская язык, пусти голос через <b>нос</b> — это ${tr('ŋ')}. Рот приоткрыт, кончик языка лежит внизу.</div>
<table class="sym"><tr><th>/n/</th><th>/ŋ/</th></tr>
<tr><td>${s('sin')} ${tr('sɪn')} — грех</td><td>${s('sing')} ${tr('sɪŋ')} — петь</td></tr>
<tr><td>${s('thin')} ${tr('θɪn')} — тонкий</td><td>${s('thing')} ${tr('θɪŋ')} — вещь</td></tr>
<tr><td>${s('win')} ${tr('wɪn')} — побеждать</td><td>${s('wing')} ${tr('wɪŋ')} — крыло</td></tr>
<tr><td>${s('ran')} ${tr('ræn')} — бежал</td><td>${s('rang')} ${tr('ræŋ')} — звонил</td></tr></table>
<div class="box rule"><b>Есть «г» после /ŋ/ или нет?</b><b>Без /g/</b> — на конце слова и в словах, образованных от них:<br>${s('sing')} ${tr('sɪŋ')}, ${s('singer')} ${tr('ˈsɪŋə')}, ${s('singing')} ${tr('ˈsɪŋɪŋ')}, ${s('long')}, ${s('ringing')}, ${s('young')}<br><b>С /g/</b> — в середине слова-«корня» и в степенях сравнения:<br>${s('finger')} ${tr('ˈfɪŋɡə')}, ${s('English')} ${tr('ˈɪŋɡlɪʃ')}, ${s('hungry')} ${tr('ˈhʌŋɡri')}, ${s('angry')}, ${s('longer')} ${tr('ˈlɒŋɡə')}, ${s('younger')}, ${s('stronger')}</div>
<div class="box tip"><b>А буквы nk?</b>Перед k буква n тоже читается ${tr('ŋ')}: ${s('think')} ${tr('θɪŋk')}, ${s('pink')}, ${s('bank')}, ${s('drink')}.</div>
<div class="box err"><b>Типичные ошибки</b>1) «синг» с чётким «г» на конце → правильно ${s('sing')} ${tr('sɪŋ')}.<br>2) «син» с простым «н» → получится другое слово ${s('sin')}.<br>3) Окончание -ing: не «ридинг», а ${s('reading')} ${tr('ˈriːdɪŋ')} — носом, без «г».</div>`,
theory2:`<p>Зажми нос пальцами и скажи «нннн» — звук пропадёт, потому что он идёт через нос. /ŋ/ тоже идёт через нос, только язык прижимается <b>сзади</b>, как при звуке «к».</p>
<p>Главное: на конце слова <b>«г» не произносим</b>: ${s('sing')}, ${s('long')}, ${s('thing')}, ${s('reading')}.</p>
<p>Сравни: ${s('singer')} (певец — без «г») и ${s('finger')} (палец — с «г»).</p>`,
items:[
 {type:'listen',lvl:1,say:'sing',q:'Послушай. Какое слово прозвучало?',opts:['sin','sing'],ans:1,
  why:'Прозвучало <b>sing</b> [sɪŋ] — «петь», на конце носовой /ŋ/. sin [sɪn] кончается на обычный /n/.',
  why2:'sing — звук «уходит в нос», sin — простое «н».'},
 {type:'listen',lvl:1,say:'thin',q:'Послушай. Какое слово прозвучало?',opts:['thin','thing'],ans:0,
  why:'Прозвучало <b>thin</b> [θɪn] — «тонкий», на конце обычный /n/ (кончик языка у верхних зубов).',
  why2:'thin — «н» кончиком языка. thing — /ŋ/ задней частью языка.'},
 {type:'listen',lvl:1,say:'wing',q:'Послушай. Какое слово прозвучало?',opts:['win','wing'],ans:1,
  why:'Прозвучало <b>wing</b> [wɪŋ] — «крыло», на конце /ŋ/. win [wɪn] — «побеждать».',
  why2:'wing — носовой конец, без «г».'},
 {type:'listen',lvl:1,say:'ran',q:'Послушай. Какое слово прозвучало?',opts:['ran','rang'],ans:0,
  why:'Прозвучало <b>ran</b> [ræn] — «бежал» (от run). rang [ræŋ] — «звонил» (от ring).',
  why2:'ran — обычное «н». rang — /ŋ/.'},
 {lvl:1,q:'Как произносится звук <b>/ŋ/</b>?',opts:['задняя часть языка прижата к нёбу, воздух идёт через нос','кончик языка за верхними зубами, как русское «н»','как «нг» с чётким «г» на конце'],ans:0,
  why:'/ŋ/ — <b>задняя</b> часть языка у нёба (как для «к»), воздух через нос. Кончик языка у зубов — это /n/. «г» на конце не произносим.',
  why2:'Положение «к» + голос через нос = /ŋ/.'},
 {type:'read',lvl:1,text:'I am singing a song.',q:'Прочитай вслух',
  why:'<b>singing</b> [ˈsɪŋɪŋ] — два раза /ŋ/, без «г». <b>song</b> [sɒŋ] — на конце тоже /ŋ/, не «сонг».',
  why2:'«сиŋиŋ», «соŋ» — звук уходит в нос.'},
 {lvl:1,text:'A bird {has*|have@en.s.have_got} got two {wings*|wins}.',
  why:'1) A bird — одна → <b>has got</b>. 2) У птицы — <b>wings</b> [wɪŋz] (крылья). wins — «побеждает».',
  why2:'Птица (it) → has got. Крылья — wings.'},
 {lvl:2,text:'The phone {rang*|ran}, but nobody answered.',
  why:'Телефон <b>зазвонил</b> → <b>rang</b> [ræŋ] (ring — rang — rung). ran — «бежал», телефоны не бегают.',
  why2:'Звонить — ring → rang (/ŋ/).'},
 {lvl:2,text:'Mum cut a {thin*|thing} slice of bread.',
  why:'«<b>Тонкий</b> ломтик» → <b>thin</b> [θɪn]. thing [θɪŋ] — «вещь».',
  why2:'thin — тонкий, thing — вещь.'},
 {type:'spell',lvl:2,say:'thing',ans:['thing'],q:'Послушай и напиши слово.',
  why:'<b>thing</b> [θɪŋ] — «вещь»: /ŋ/ на конце пишется <b>ng</b>.',
  why2:'t-h-i-n-g.'},
 {type:'spell',lvl:2,say:'ringing',ans:['ringing'],q:'Послушай и напиши слово.',
  why:'<b>ringing</b> [ˈrɪŋɪŋ] — «звонящий / звонит»: ring + ing. Два раза /ŋ/ — два раза ng.',
  why2:'r-i-n-g-i-n-g.'},
 {lvl:2,q:'В каком слове после /ŋ/ слышится /g/?',opts:['finger','singer','singing','long'],ans:0,
  why:'<b>finger</b> [ˈfɪŋɡə] — /g/ слышен. В singer [ˈsɪŋə], singing и long — только /ŋ/, без «г».',
  why2:'finger — с «г», singer — без.'},
 {type:'listen',lvl:2,say:'singer',q:'Послушай. Есть ли /g/ после /ŋ/ в этом слове?',opts:['нет: [ˈsɪŋə]','да: [ˈsɪŋɡə]'],ans:0,
  why:'<b>singer</b> образовано от sing, поэтому /g/ нет: [ˈsɪŋə].',
  why2:'sing → singer — «г» не появляется.'},
 {lvl:2,text:'Yesterday I {saw*|seed|seen@en.6.past_irreg} a strange {thing*|thin} in the sky.',
  why:'1) Yesterday → Past Simple: see — <b>saw</b> — seen. 2) «Странную <b>вещь</b>» → <b>thing</b>.',
  why2:'вчера → saw. вещь → thing (/ŋ/).'},
 {lvl:2,text:'{Somebody*|Anybody@en.5.some_any} {rang*|ran} the bell, and I opened the door.',
  why:'1) В утвердительном предложении — <b>Somebody</b> («кто-то»). Anybody — в вопросах и отрицаниях. 2) <b>rang</b> the bell — «позвонил в звонок».',
  why2:'Утверждение → somebody. Звонить → rang.'},
 {lvl:3,q:'Как правильно произносится <b>longer</b>?',opts:['[ˈlɒŋɡə] — с /g/','[ˈlɒŋə] — без /g/'],ans:0,
  why:'Исключение! В сравнительной степени <b>longer, stronger, younger</b> /g/ слышен: [ˈlɒŋɡə]. А в long [lɒŋ] — нет.',
  why2:'long — без «г», longer — с «г». Запомни: long, strong, young + er → «г» появляется.'},
 {lvl:3,q:'Сколько раз звучит /ŋ/ в слове <b>singing</b>?',opts:['2','1','0'],ans:0,
  why:'<b>singing</b> [ˈsɪŋɪŋ]: sing + ing → два /ŋ/.',
  why2:'Два ng — два /ŋ/.'},
 {lvl:3,q:'В каком слове буква <b>n</b> читается как /ŋ/?',opts:['think','tent','ten','nine'],ans:0,
  why:'Перед <b>k</b> буква n читается /ŋ/: <b>think</b> [θɪŋk]. В tent, ten, nine — обычный /n/.',
  why2:'nk = /ŋk/: think, pink, bank.'},
 {lvl:3,q:'В каком слове <b>нет</b> /g/ после /ŋ/?',opts:['singer','finger','English','hungry'],ans:0,
  why:'<b>singer</b> [ˈsɪŋə] — без /g/ (от sing). finger, English, hungry — с /ŋɡ/.',
  why2:'Образовано от глагола на -ng → «г» нет.'},
 {lvl:3,text:'My cat is very {thin*|thing} because it {doesn’t*|don’t@en.5.ps} eat much.',
  why:'1) Кошка <b>худая</b> → <b>thin</b>. 2) it → отрицание в Present Simple: <b>doesn’t</b> eat.',
  why2:'Худая — thin. it → doesn’t.'},
 {type:'read',lvl:2,text:'The young singer has a strong voice.',q:'Прочитай вслух',
  why:'<b>young</b> [jʌŋ], <b>singer</b> [ˈsɪŋə], <b>strong</b> [strɒŋ] — везде /ŋ/ <b>без «г»</b>. <b>voice</b> — /v/, зубы на губу.',
  why2:'«яŋ», «сиŋэ», «строŋ» — носом.'},
 {type:'read',lvl:3,text:'My little brother is hungry and angry.',q:'Прочитай вслух',
  why:'А здесь /g/ есть: <b>hungry</b> [ˈhʌŋɡri] и <b>angry</b> [ˈæŋɡri]. <b>brother</b> — /ð/.',
  why2:'hungry и angry — «хаŋгри», «эŋгри», с «г».'}
]});

/* ===================== Фонетика: интонация вопросов ===================== */
RU.rule({
id:'en.7.ph_intonation',
short:'Общий вопрос (ответ yes / no) — голос в конце <b>повышается ↗</b>: <i>Are you ready?↗</i> Специальный вопрос (what, where, when…) — голос <b>понижается ↘</b>: <i>Where do you live?↘</i>',
theory:`<p>Интонация — это «мелодия» фразы: голос идёт <b>вверх ↗</b> или <b>вниз ↘</b>. В английском от неё зависит, как тебя поймут.</p>
<table class="sym"><tr><th>Тип фразы</th><th>Голос в конце</th><th>Пример</th></tr>
<tr><td>Утверждение</td><td>↘ вниз</td><td>${s('I live in Moscow.')} ↘</td></tr>
<tr><td>Общий вопрос (ответ yes / no)<br>начинается с do, does, is, are, can, have…</td><td>↗ вверх</td><td>${s('Are you ready?')} ↗<br>${s('Do you like pizza?')} ↗<br>${s('Can you swim?')} ↗</td></tr>
<tr><td>Специальный вопрос<br>what, where, when, who, why, how…</td><td>↘ вниз</td><td>${s('Where do you live?')} ↘<br>${s('What is your name?')} ↘<br>${s('How old are you?')} ↘</td></tr>
<tr><td>Альтернативный вопрос (… or …?)</td><td>↗ на первом, ↘ на последнем</td><td>${s('Would you like tea or coffee?')} tea ↗ … coffee ↘</td></tr>
<tr><td>Перечисление</td><td>↗ ↗ … ↘ на последнем</td><td>${s('I like apples, pears and bananas.')} apples ↗, pears ↗, bananas ↘</td></tr></table>
<div class="box tip"><b>Как запомнить</b>Если на вопрос можно ответить «<b>Yes</b>» или «<b>No</b>» — голос поднимается, как будто ты <b>ждёшь</b> ответа «да / нет» ↗.<br>Если вопрос начинается с <b>wh-</b>слова или how — голос опускается ↘, как в обычном предложении.</div>
<div class="box err"><b>Типичная ошибка русскоязычных</b>Мы привыкли, что в любом вопросе голос идёт вверх. Но ✗ «What is your name ↗?» звучит по-английски странно — как будто ты переспрашиваешь. Правильно: ${s('What is your name?')} ↘.</div>
<div class="box ex"><b>Потренируйся вслух</b>${s('Is it cold?')} ↗ — ${s('Why is it cold?')} ↘<br>${s('Have you got a pet?')} ↗ — ${s('What pet have you got?')} ↘<br>(Голос в компьютерной озвучке не всегда точно показывает интонацию — ориентируйся на стрелки.)</div>`,
theory2:`<p>Представь лестницу.</p>
<p>Вопрос «да или нет?» — ты в конце <b>поднимаешься</b> по лестнице ↗: ${s('Do you like cats?')} ↗</p>
<p>Вопрос со словом what, where, when, why, who, how — ты в конце <b>спускаешься</b> ↘: ${s('Where is my bag?')} ↘</p>
<p>Простой тест: можно ответить «yes» или «no»? Да → ↗. Нет → ↘.</p>`,
items:[
 {lvl:1,q:'Как звучит голос в конце <b>общего вопроса</b> (ответ yes / no)? <i>Are you ready?</i>',opts:['повышается ↗','понижается ↘'],ans:0,sayAfter:'Are you ready?',
  why:'<i>Are you ready?</i> — на него отвечают Yes / No → это общий вопрос → голос в конце <b>вверх ↗</b>.',
  why2:'Yes / No — значит ↗.'},
 {lvl:1,q:'Как звучит голос в конце <b>специального вопроса</b>? <i>Where do you live?</i>',opts:['понижается ↘','повышается ↗'],ans:0,sayAfter:'Where do you live?',
  why:'<i>Where do you live?</i> начинается с <b>where</b> — это специальный вопрос → голос <b>вниз ↘</b>.',
  why2:'wh-слово в начале → ↘.'},
 {lvl:1,q:'Какой вопрос произносится с <b>повышением ↗</b> в конце?',opts:['Do you like pizza?','What do you like?','Where is the cat?'],ans:0,
  why:'<i>Do you like pizza?</i> — ответ Yes / No → ↗. What… и Where… — специальные вопросы → ↘.',
  why2:'Начинается с do → общий вопрос → ↗.'},
 {lvl:1,q:'Какой вопрос произносится с <b>понижением ↘</b> в конце?',opts:['Can you swim?','When does the film start?','Is it cold?'],ans:1,
  why:'<i>When does the film start?</i> — начинается с <b>when</b>, это специальный вопрос → ↘. Can you…? и Is it…? — общие → ↗.',
  why2:'when = wh-слово → ↘.'},
 {type:'listen',lvl:1,say:'Do you like pizza?',q:'Послушай вопрос. Какой он и какая у него интонация?',opts:['общий (ответ yes / no) — голос в конце ↗','специальный (what, where…) — голос в конце ↘'],ans:0,
  why:'<i>Do you like pizza?</i> — начинается с <b>Do</b>, на него отвечают Yes / No → общий → ↗.',
  why2:'Do… ? → Yes / No → вверх.'},
 {type:'listen',lvl:1,say:'What is your name?',q:'Послушай вопрос. Какой он и какая у него интонация?',opts:['общий (ответ yes / no) — голос в конце ↗','специальный (what, where…) — голос в конце ↘'],ans:1,
  why:'<i>What is your name?</i> — начинается с <b>What</b> → специальный → ↘.',
  why2:'What… → вниз.'},
 {type:'read',lvl:1,text:'Are you ready?',q:'Прочитай вслух. Это общий вопрос — в конце подними голос ↗.',
  why:'<b>Are</b> [ɑː] — r не читается. <b>ready</b> [ˈredi] — ударение на RE, и на этом слоге голос идёт вверх ↗.',
  why2:'Are you REA↗dy?'},
 {lvl:1,text:'{Is*|Are@en.s.to_be} your dad at home? The voice goes {up*|down} at the end.',
  why:'1) your dad — один (he) → <b>Is</b>. 2) Это общий вопрос (ответ yes / no) → голос в конце <b>up</b> ↗.',
  why2:'Is your dad…? → Yes / No → up.'},
 {lvl:2,q:'Как произносится обычное утверждение <i>I live in Moscow.</i>?',opts:['с понижением ↘ в конце','с повышением ↗ в конце'],ans:0,sayAfter:'I live in Moscow.',
  why:'Обычное утверждение — голос в конце <b>вниз ↘</b>, как точка.',
  why2:'Утверждение = ↘.'},
 {lvl:2,q:'Как звучит <b>альтернативный</b> вопрос <i>Would you like tea or coffee?</i>',opts:['tea ↗ … coffee ↘','tea ↘ … coffee ↗','везде ↗'],ans:0,sayAfter:'Would you like tea or coffee?',
  why:'В вопросе с <b>or</b> («или»): на первом варианте голос вверх ↗ (tea), на последнем — вниз ↘ (coffee).',
  why2:'Первый вариант ↗, последний ↘ — выбор закрыт.'},
 {type:'listen',lvl:2,say:'How old is your brother?',q:'Послушай вопрос. Какой он и какая у него интонация?',opts:['общий (ответ yes / no) — голос в конце ↗','специальный (what, how…) — голос в конце ↘'],ans:1,
  why:'<i>How old is your brother?</i> — начинается с <b>How</b>, ответить yes / no нельзя → специальный → ↘.',
  why2:'how — тоже вопросительное слово → ↘.'},
 {type:'listen',lvl:2,say:'Have you got a pet?',q:'Послушай вопрос. Какой он и какая у него интонация?',opts:['общий (ответ yes / no) — голос в конце ↗','специальный (what, where…) — голос в конце ↘'],ans:0,
  why:'<i>Have you got a pet?</i> — ответ Yes, I have / No, I haven’t → общий → ↗.',
  why2:'Have…? → yes / no → вверх.'},
 {type:'read',lvl:2,text:'Where do you live?',q:'Прочитай вслух. Это специальный вопрос — в конце опусти голос ↘.',
  why:'<b>Where</b> [weə] — /w/ губами, r не читается. Ударение и понижение голоса — на <b>live</b> [lɪv] ↘.',
  why2:'Where do you LI↘VE?'},
 {lvl:2,text:'{Where*|Who@en.p.wh_questions} do you live? In this question the voice goes {down*|up} at the end.',
  why:'1) Спрашиваем о месте → <b>Where</b> (где). Who — «кто». 2) Специальный вопрос → голос <b>down</b> ↘.',
  why2:'Где? → Where. wh-вопрос → down.'},
 {lvl:2,text:'{Does*|Do@en.5.ps} your sister like music? In this question the voice goes {up*|down} at the end.',
  why:'1) your sister = she → <b>Does</b>. 2) Ответ yes / no → общий вопрос → голос <b>up</b> ↗.',
  why2:'she → Does. Yes / No → up.'},
 {lvl:2,text:'How old are you? The voice goes {down*|up} at the end.',
  why:'Вопрос начинается с <b>How</b> — специальный, ответ не yes / no → голос <b>down</b> ↘.',
  why2:'How… → down.'},
 {lvl:3,q:'Русские ученики часто повышают голос в конце вопроса <i>What’s your name?</i> Как правильно?',opts:['понизить ↘, потому что это вопрос с what','повысить ↗, как во всех вопросах','говорить ровно, без изменения'],ans:0,
  why:'What — вопросительное слово → специальный вопрос → <b>↘</b>. Повышение здесь звучит как переспрос: «Как-как тебя зовут?»',
  why2:'Не все вопросы ↗! wh-вопросы ↘.'},
 {lvl:3,q:'В каком ряду интонация указана <b>верно</b>?',opts:['Can you help me? ↗ / Why are you late? ↘','Can you help me? ↘ / Why are you late? ↗','Can you help me? ↗ / Why are you late? ↗'],ans:0,
  why:'<i>Can you help me?</i> — yes / no → ↗. <i>Why are you late?</i> — why → ↘.',
  why2:'Can… ↗, Why… ↘.'},
 {lvl:3,q:'Как произносят <b>перечисление</b>: <i>I like apples, pears and bananas.</i>',opts:['на каждом пункте ↗, на последнем ↘','везде ↘','везде ↗'],ans:0,sayAfter:'I like apples, pears and bananas.',
  why:'В перечислении голос поднимается на каждом пункте ↗ («это ещё не всё»), а на последнем опускается ↘ («конец списка»).',
  why2:'apples ↗, pears ↗, bananas ↘.'},
 {type:'listen',lvl:3,say:'Is your sister older or younger than you?',q:'Послушай вопрос. Какой он и какая у него интонация?',opts:['общий: ↗ в конце','специальный: ↘ в конце','альтернативный (с or): ↗ на первом варианте, ↘ на последнем'],ans:2,
  why:'В вопросе есть <b>or</b>: older <b>or</b> younger → это альтернативный вопрос: older ↗ … younger ↘. Ответить yes / no нельзя — надо выбрать.',
  why2:'Есть or и выбор → ↗ … ↘.'},
 {lvl:3,text:'What {did*|does|do@en.6.past_neg_q} you do yesterday? The voice goes {down*|up} at the end.',
  why:'1) yesterday → Past Simple: What <b>did</b> you do? 2) Вопрос с what → голос <b>down</b> ↘.',
  why2:'вчера → did. what → down.'},
 {lvl:3,text:'{Have*|Has@en.s.have_got} you got a bike? The voice goes {up*|down} at the end.',
  why:'1) с you → <b>Have</b> you got…? (has — для he / she / it). 2) Ответ yes / no → голос <b>up</b> ↗.',
  why2:'you → Have. Yes / No → up.'},
 {type:'read',lvl:3,text:'Would you like tea or coffee?',q:'Прочитай вслух: на tea голос вверх ↗, на coffee — вниз ↘.',
  why:'<b>Would</b> [wʊd] — l не читается. <b>tea</b> [tiː] ↗, <b>coffee</b> [ˈkɒfi] ↘ — ударение на CO.',
  why2:'Would you like TEA↗ or COF↘fee?'}
]});

/* ===================== Итоговое упражнение 7 класса ===================== */
RU.mix(7,[
 {lvl:1,text:'At nine o’clock yesterday my {brother’s*|brothers@en.p.possessive} friends {were playing*|was playing|were play@en.7.past_cont} computer games.',
  why:'1) «Друзья брата» (чьи?) → <b>brother’s</b>. 2) В девять вчера действие шло; friends — много → <b>were playing</b>.',
  why2:'Чьи друзья? — brother’s. Процесс в момент прошлого → were + -ing.'},
 {lvl:1,text:'While I {was waiting*|were waiting|am waiting@en.7.past_s_vs_c} for the bus, I {saw*|seed|seen@en.6.past_irreg} an old friend.',
  why:'1) После while — длинное действие: I → <b>was waiting</b>. 2) see — <b>saw</b> — seen: в Past Simple вторая форма.',
  why2:'Пока ждал (фон) — was waiting. Увидел — saw.'},
 {lvl:1,text:'When I was small, I {used to*|use to|was used to@en.7.used_to} be afraid of {mice*|mouses@en.s.plurals}.',
  why:'1) Раньше (а сейчас нет) → <b>used to</b> be. 2) mouse → <b>mice</b> — исключение.',
  why2:'used to = раньше. mouse — mice.'},
 {lvl:1,text:'You {should*|should to|shoulds@en.7.modals} take an umbrella — {there are*|there is@en.p.there_is} dark clouds in the sky.',
  why:'1) Совет → <b>should</b> + V1 без to. 2) clouds — много → <b>there are</b>.',
  why2:'should take. Облаков много → there are.'},
 {lvl:1,text:'If you {mix*|will mix|mixes@en.7.cond_01} yellow and blue, you {get*|got|gets@en.7.cond_01} green.',
  why:'Нулевой тип (так всегда): обе части в Present Simple. С you — без -s: <b>mix</b>, <b>get</b>. После if will не ставим.',
  why2:'Факт → If you mix…, you get…'},
 {lvl:1,text:'It {might*|mights|might to@en.7.modals} snow tonight. {Don’t*|Not|No@en.p.imperative} forget your hat!',
  why:'1) «Может быть, пойдёт снег» → <b>might</b> + V1. 2) Запрет / просьба «не забудь» → <b>Don’t</b> + V1.',
  why2:'might snow. Не делай! → Don’t…'},
 {lvl:2,text:'I {have never been*|never was|was never@en.7.pp_vs_past} to Italy, but last year my parents {went*|have gone|have been@en.7.pp_vs_past} to Rome.',
  why:'1) Опыт за всю жизнь, время не названо (never) → <b>have never been</b> to. 2) <b>last year</b> → Past Simple: <b>went</b>.',
  why2:'never → Present Perfect. last year → Past Simple.'},
 {lvl:2,text:'She has lived in London {since*|for@en.7.pp_words} 2018, and she {likes*|like@en.5.ps} it very much.',
  why:'1) 2018 — точка отсчёта → <b>since</b>. 2) she → Present Simple с -s: <b>likes</b>.',
  why2:'С 2018 → since. Она любит → likes.'},
 {lvl:2,text:'The woman {who*|which|whose@en.7.relative} {teaches*|teach@en.5.ps} us English {is*|are@en.s.to_be} very kind.',
  why:'1) woman — человек → <b>who</b>. 2) who заменяет woman (она) → <b>teaches</b> (-es после ch). 3) Главное слово — woman (одна) → <b>is</b>.',
  why2:'Женщина, которая учит → who teaches. Она добрая → is.'},
 {lvl:2,text:'Have you {ever*|yet@en.7.pp_words} {seen*|saw|seed@en.7.pres_perf} {an*|a@en.s.a_an} owl?',
  why:'1) В вопросе «когда-нибудь» → <b>ever</b> (yet перед V3 не ставят — только в конце вопроса). 2) После have — V3: see — saw — <b>seen</b>. 3) owl начинается с гласного звука → <b>an</b> owl.',
  why2:'Have you ever seen…? owl — гласный звук → an.'},
 {lvl:2,text:'— Is there {any*|some@en.5.some_any} milk? — No, Tom {has drunk*|has drank|have drunk@en.7.pres_perf} it all.',
  why:'1) В вопросе — <b>any</b>. 2) drink — drank — <b>drunk</b>; Tom = he → <b>has drunk</b>.',
  why2:'Вопрос → any. Tom has drunk (V3).'},
 {lvl:2,text:'My grandad {could*|can|should@en.7.modals} run very fast when he was young, but now he {walks*|walk@en.5.ps} slowly.',
  why:'1) Умел в прошлом (when he was young) → <b>could</b>. 2) Сейчас, he → <b>walks</b> (с -s).',
  why2:'Тогда умел — could. Сейчас — he walks.'},
 {lvl:2,text:'— {Did*|Have@en.7.pp_vs_past} you see the match yesterday? — No, I {didn’t*|haven’t|wasn’t@en.6.past_neg_q}.',
  why:'1) yesterday → Past Simple: <b>Did</b> you see…? 2) Короткий ответ на вопрос с did: No, I <b>didn’t</b>.',
  why2:'вчера → Did…? → No, I didn’t.'},
 {lvl:3,text:'If it {is*|will be|was@en.7.cond_01} {warmer*|more warm|warmest@en.6.comparatives} tomorrow, we {will go*|goes|went@en.7.cond_01} swimming.',
  why:'1) После if — Present Simple: <b>is</b>. 2) warm + er → <b>warmer</b> («теплее»). 3) Будущее → <b>will go</b>.',
  why2:'If + is, …will go. warm → warmer.'},
 {lvl:3,text:'This is the café {where*|which|who@en.7.relative} we {met*|meeted|have met@en.7.pp_vs_past} last year.',
  why:'1) Познакомились <b>где?</b> — в кафе, после глагола ничего не нужно → <b>where</b>. 2) last year → Past Simple: meet — <b>met</b>.',
  why2:'Место, где → where. В прошлом году → met.'},
 {lvl:3,text:'It {was raining*|were raining|is raining@en.7.past_s_vs_c} when we {left*|leaved|have left@en.7.past_s_vs_c} the house, so we {took*|taked|have taken@en.6.past_irreg} an umbrella.',
  why:'1) Дождь <b>уже шёл</b> (фон) → it <b>was raining</b>. 2) Вышли (коротко) → leave — <b>left</b>. 3) take — <b>took</b> — taken.',
  why2:'Фон — was raining. Короткие действия — left, took.'},
 {lvl:3,text:'I {have known*|know|am knowing@en.7.pres_perf} her {for*|since@en.7.pp_words} six years.',
  why:'1) «Знаю её уже шесть лет» — с прошлого до сих пор → Present Perfect: <b>have known</b>. По-русски «знаю», но по-английски не know! 2) six years — период → <b>for</b>.',
  why2:'До сих пор → have known. Сколько? → for.'},
 {lvl:3,text:'We {didn’t use to*|didn’t used to|don’t use to@en.7.used_to} have a car, but now we {have got*|has got@en.s.have_got} two.',
  why:'1) Отрицание: <b>didn’t use to</b> (после did — use без d). 2) we → <b>have got</b>.',
  why2:'didn’t use to. we have got.'},
 {lvl:3,text:'The boy {whose*|who|who’s@en.7.relative} dog we found {was*|were@en.p.was_were} very happy.',
  why:'1) «Мальчик, <b>чью</b> собаку мы нашли» → <b>whose</b> dog. who’s = who is. 2) The boy — один → <b>was</b>.',
  why2:'Чья собака? → whose. Мальчик был рад → was.'},
 {lvl:3,text:'My brother {is reading*|reads@en.5.ps_vs_pc} now. He {has already read*|already reads|has already readed@en.7.pres_perf} three books this week.',
  why:'1) <b>now</b> → Present Continuous: <b>is reading</b>. 2) Результат за неделю, которая ещё идёт → <b>has already read</b>. read — read — read (пишется так же, читается [red]).',
  why2:'Сейчас → is reading. Уже прочитал → has already read.'}
]);
})();
