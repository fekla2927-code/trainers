/* Английский язык — 9 класс. Темы en.9.* и итоговое упражнение RU.mix(9, …). */
(function(){
const s = t => '<span class="say" data-say="'+t.replace(/"/g,'&quot;')+'">'+t+'</span>';
const tr = t => '<span class="tr">['+t+']</span>';

/* ================= 1. Passive: all tenses ================= */
RU.rule({
id:'en.9.passive_all',
short:'Пассив = <b>be</b> в нужном времени + <b>V3</b>. Меняется только be: is made → is being made → has been made → will be made. Пример: <i>The road is being repaired.</i>',
theory:`
<p>Страдательный залог (пассив) нужен, когда важно не <b>кто</b> делает, а <b>что происходит с предметом</b>: «Мост <b>строят</b>», «Письмо <b>уже отправили</b>».</p>
<div class="box rule"><b>Главная формула</b>be (в нужном времени) + V3 (третья форма глагола: built, written, cleaned)</div>
<p>Секрет: <b>V3 не меняется никогда</b>. Время показывает только глагол <b>be</b>. Ты просто ставишь be в то время, которое нужно, — и добавляешь V3.</p>
<table class="sym">
<tr><th>Время</th><th>Формула</th><th>Пример</th></tr>
<tr><td>Present Simple</td><td>am/is/are + V3</td><td>${s('English is spoken here.')}</td></tr>
<tr><td>Past Simple</td><td>was/were + V3</td><td>${s('The bridge was built in the past.')}</td></tr>
<tr><td>Present Continuous</td><td>am/is/are <b>being</b> + V3</td><td>${s('The road is being repaired now.')}</td></tr>
<tr><td>Past Continuous</td><td>was/were <b>being</b> + V3</td><td>${s('The room was being cleaned when we came.')}</td></tr>
<tr><td>Present Perfect</td><td>have/has <b>been</b> + V3</td><td>${s('The letter has been sent.')}</td></tr>
<tr><td>Past Perfect</td><td>had <b>been</b> + V3</td><td>${s('The money had been stolen before the police came.')}</td></tr>
<tr><td>Future Simple</td><td>will <b>be</b> + V3</td><td>${s('The results will be announced tomorrow.')}</td></tr>
<tr><td>С модальными</td><td>can / must / should <b>be</b> + V3</td><td>${s('Phones must be switched off.')}</td></tr>
</table>
<div class="box tip"><b>Как запомнить</b>Continuous → появляется <b>being</b>. Perfect → появляется <b>been</b>. Will и модальные → просто <b>be</b>.<br>${s('is being made')} — «делается прямо сейчас», ${s('has been made')} — «уже сделано», ${s('will be made')} — «будет сделано».</div>
<p>Кто сделал — через <b>by</b>: ${s('The book was written by a famous writer.')}</p>
<p>Отрицание и вопрос — через первое вспомогательное слово: ${s('The letter has not been sent.')} ${s('Has the letter been sent?')} ${s('Will it be finished soon?')}</p>
<div class="box err"><b>Типичные ошибки</b>
❌ <i>The road is repairing.</i> — дорога сама себя не ремонтирует! ✅ ${s('The road is being repaired.')}<br>
❌ <i>The cake has eaten.</i> ✅ ${s('The cake has been eaten.')}<br>
❌ <i>It will built.</i> — пропал be. ✅ ${s('It will be built.')}<br>
❌ <i>was build</i> — нужна V3: build → built → <b>built</b>.</div>
<div class="box ex"><b>Проверь себя</b>Спроси: предмет <b>сам</b> делает действие? Если нет — значит пассив: be + V3.</div>`,
theory2:`
<p>Представь, что <b>be</b> — это «часы», которые показывают время, а <b>V3</b> — это «картинка» действия, она одна и та же.</p>
<ul>
<li>сейчас, в процессе: ${s('is being painted')} — «красится (прямо сейчас)»</li>
<li>уже готово: ${s('has been painted')} — «уже покрашено»</li>
<li>будет: ${s('will be painted')} — «будет покрашено»</li>
</ul>
<p>По-русски мы часто говорим «<b>его</b> красят», «<b>её</b> отремонтировали» — без того, кто делает. Это и есть пассив.</p>
<p>${s('Look! The fence is being painted.')} — Смотри! Забор красят.<br>${s('The fence has been painted.')} — Забор (уже) покрасили.<br>${s('The fence will be painted tomorrow.')} — Забор покрасят завтра.</p>`,
items:[
 {lvl:1, text:'English {is spoken*|speaks|is speaking} in many countries.',
  why:'Язык сам не говорит — на нём говорят люди. Это общий факт → Present Simple Passive: <b>is spoken</b> (is + V3). <i>speaks</i> — «язык говорит», а <i>is speaking</i> — «язык говорит сейчас».',
  why2:'«На английском <b>говорят</b> во многих странах» — по-русски тоже без «кто». Формула: am/is/are + V3: speak → spoke → <b>spoken</b>.'},
 {lvl:1, text:'The new bridge {will be built*|will build|will built} next year.',
  why:'Будущее + пассив: <b>will be + V3</b> → <b>will be built</b>. <i>will build</i> — «мост построит» (кого?), а в <i>will built</i> пропал be.',
  why2:'«Мост <b>построят</b> в следующем году». После will всегда идёт <b>be</b>, а уже потом V3 (built).'},
 {lvl:1, text:'Look! A new road {is being built*|is building|is built} near our house.',
  why:'Слово <b>Look!</b> показывает, что действие идёт прямо сейчас → Present Continuous Passive: <b>is being built</b>. <i>is building</i> — «дорога строит», а <i>is built</i> — обычный факт, без «прямо сейчас».',
  why2:'Continuous в пассиве = am/is/are + <b>being</b> + V3. «Смотри! Дорогу <b>строят</b> (сейчас)».'},
 {lvl:1, text:'The letter {can be sent*|can send|can be send} by email.',
  why:'После модального глагола (can, must, should) пассив = <b>be + V3</b>: <b>can be sent</b>. <i>can send</i> — «письмо может отправить», а в <i>can be send</i> нет третьей формы (send → sent → <b>sent</b>).',
  why2:'«Письмо <b>можно отправить</b> по почте». Модальный + be + V3.'},
 {lvl:1, q:'Как сказать в пассиве: «Новый стадион (уже) построили»?', opts:['A new stadium has been built.','A new stadium has built.','A new stadium was been built.'], ans:0,
  why:'«Уже построили», результат сейчас → Present Perfect Passive: <b>has been built</b>. В <i>has built</i> нет been (получается «стадион построил»), а <i>was been</i> — такой формы не бывает.',
  why2:'Perfect в пассиве = have/has + <b>been</b> + V3. Запомни: в Perfect всегда появляется <b>been</b>.', sayAfter:'A new stadium has been built.'},
 {type:'listen', lvl:1, say:'The road is being repaired.', q:'Послушай. Что сейчас происходит с дорогой?', opts:['Её ремонтируют прямо сейчас','Её уже отремонтировали','Её отремонтируют завтра'], ans:0,
  why:'Ты услышал <b>is being repaired</b>: слово <b>being</b> = процесс, «прямо сейчас». Если бы было <i>has been repaired</i> — «уже отремонтировали».',
  why2:'Being [ˈbiːɪŋ] — два слога, звучит как «би-инг». Услышал being → действие идёт сейчас.'},
 {type:'read', lvl:1, text:'The bridge is being repaired at the moment.', q:'Прочитай вслух',
  why:`${s('being')} ${tr('ˈbiːɪŋ')} — два слога, не «бинг». ${s('repaired')} — ударение на второй слог: re-PAIRED, окончание -ed звучит как /d/. «at the moment» читай слитно: ${s('at the moment')}.`,
  why2:'В «bridge» на конце звук [dʒ], как «дж». «the moment» — th межзубный, язык между зубами, «the» слабое [ðə].'},
 {lvl:2, text:'The plate is empty: all the biscuits {have been eaten*|have eaten|has been eaten}.',
  why:'Результат виден сейчас (тарелка пустая) → Present Perfect Passive. <b>biscuits</b> — множественное число, значит <b>have been eaten</b>. <i>has</i> — для одного предмета, а <i>have eaten</i> — «печенье съело».',
  why2:'«Всё печенье <b>съели</b>». have/has + been + V3: eat → ate → <b>eaten</b>. Biscuits — они → have.'},
 {lvl:2, text:'When we arrived, the room {was being cleaned*|was cleaning|is being cleaned}, so we waited outside.',
  why:'В прошлом, в момент нашего прихода, шёл процесс → Past Continuous Passive: <b>was being cleaned</b>. <i>was cleaning</i> — «комната убирала», <i>is being cleaned</i> — настоящее, а рассказ о прошлом (arrived, waited).',
  why2:'Past Continuous пассив = was/were + being + V3. «Когда мы пришли, комнату <b>убирали</b>, и мы ждали снаружи».'},
 {lvl:2, text:'By the time the police came, the money {had been stolen*|had stolen|has been stolen}.',
  why:'Действие случилось <b>раньше</b> другого действия в прошлом (the police came) → Past Perfect Passive: <b>had been stolen</b>. <i>had stolen</i> — «деньги украли (что-то)», <i>has been stolen</i> — настоящее время, не подходит к рассказу о прошлом.',
  why2:'«К тому времени, как приехала полиция, деньги <b>уже украли</b>». had + been + V3: steal → stole → <b>stolen</b>.'},
 {lvl:2, text:'Phones {must be switched*|must switch|must be switch} off during the exam.',
  why:'Телефоны сами себя не выключают → пассив с модальным: <b>must be switched</b> off. <i>must switch</i> — «телефоны должны выключить (что-то)», в <i>must be switch</i> нет -ed.',
  why2:'«Телефоны <b>должны быть выключены</b>». must + be + V3 (switched).'},
 {lvl:2, text:'Our flat {is*|are@en.s.to_be} very small, but it {has just been painted*|has just painted|just painted}.',
  why:'1) <b>Our flat</b> — одна квартира, «она» → <b>is</b>. 2) Квартиру покрасили (не она красила), и <b>just</b> — «только что» → Present Perfect Passive: <b>has just been painted</b>. Just стоит после has.',
  why2:'1) flat = it → is (are — для «они»). 2) «Её <b>только что покрасили</b>»: has + just + been + V3.'},
 {lvl:2, text:'Look! The windows in {that*|those@en.s.this_that} house {are being cleaned*|are cleaning|are cleaned}.',
  why:'1) <b>house</b> — один дом там, вдалеке → <b>that</b> (those — для многих: those houses). 2) Look! — прямо сейчас, окна моют → <b>are being cleaned</b> (windows — много, поэтому are).',
  why2:'1) that house, those houses. 2) Continuous пассив: are + being + V3. <i>are cleaning</i> — «окна моют (что-то)» — не то.'},
 {lvl:2, text:'This is the {oldest*|most old|older@en.6.comparatives} church in the town. It {is being repaired*|is repairing|repairs} now.',
  why:'1) Короткое прилагательное old: превосходная степень <b>the oldest</b> (most old — для длинных слов; older — сравнительная, после the ... in the town не подходит). 2) now + церковь ремонтируют → <b>is being repaired</b>.',
  why2:'1) the + old + est = самая старая. 2) «Её <b>ремонтируют</b> сейчас»: is being + V3.'},
 {lvl:2, text:'The prizes {will be given*|will give|are giving} to the winners {on*|in|at@en.5.prep_time} Friday.',
  why:'1) Призы сами не дают — их вручат → Future Passive: <b>will be given</b>. 2) С днями недели предлог <b>on</b>: on Friday (in — с месяцами и годами, at — с часами).',
  why2:'1) «Призы <b>вручат</b> в пятницу»: will + be + V3 (give → gave → given). 2) on Monday, on Friday, on my birthday.'},
 {type:'spell', lvl:2, say:'built', ans:['built'], q:'Послушай и напиши слово (третья форма от build)',
  why:'build → built → <b>built</b>. Пишется <b>bui</b>lt: буква u не читается, звучит [bɪlt].',
  why2:'Запомни пару: build [bɪld] — built [bɪlt]. В обоих словах есть «немая» u после b.'},
 {type:'listen', lvl:2, say:'The house has been painted.', q:'Послушай. Какое предложение прозвучало?', opts:['The house has been painted.','The house is being painted.','The house was painted.'], ans:0,
  why:'Ты слышал <b>has been</b> [hæz biːn] — это Present Perfect Passive: «дом (уже) покрасили». Being звучало бы как «би-инг», а was — коротко [wəz].',
  why2:'В быстрой речи has звучит слабо: [əz bɪn]. Ищи слово been — значит Perfect.'},
 {lvl:3, text:'My car {is being repaired*|is repairing|repairs} at the moment, so I {am taking*|take|takes@en.5.ps_vs_pc} the bus these days.',
  why:'1) Машину ремонтируют сейчас (at the moment) → <b>is being repaired</b>. 2) <b>these days</b> — временная ситуация «в эти дни» → Present Continuous: <b>am taking</b>. (take — обычная привычка, takes — для he/she.)',
  why2:'1) Машина сама себя не чинит → пассив, а «сейчас» → being. 2) Временно, пока машина в ремонте → I am taking.'},
 {lvl:3, text:'I was told that all the tickets {had already been sold*|had already sold|have already been sold}.',
  why:'Главное предложение в прошлом (I was told), а билеты продали ещё раньше → Past Perfect Passive: <b>had already been sold</b>. <i>had already sold</i> — «билеты продали (что-то)», <i>have been sold</i> — настоящее время после прошедшего «was told» не подходит.',
  why2:'«Мне сказали, что билеты <b>уже распродали</b>». Раньше другого прошлого → had been + V3.'},
 {lvl:3, text:'The Harry Potter books {have been translated*|have translated|were translating} into more than seventy languages.',
  why:'Книги сами не переводят — их перевели, и результат важен сейчас → <b>have been translated</b>. <i>have translated</i> — «книги перевели (что-то)», <i>were translating</i> — активный процесс в прошлом.',
  why2:'Это как в ОГЭ: видишь, что предмет «страдает» от действия, — ставь be в нужное время + V3.'},
 {lvl:3, text:'The email {had been sent*|had sent|has been sent} before I {noticed*|was noticing|notice@en.6.past_reg} the mistake.',
  why:'1) Письмо отправили раньше, чем я заметил ошибку → <b>had been sent</b> (Past Perfect Passive). 2) «Заметил» — короткое законченное действие в прошлом → Past Simple правильного глагола: notice + d = <b>noticed</b>.',
  why2:'1) Раньше другого прошлого → had been + V3. 2) Правильный глагол на -e: просто добавь -d: notice → noticed.'},
 {type:'read', lvl:2, text:'All the tickets have already been sold.', q:'Прочитай вслух',
  why:`${s('have already')} — свяжи слова: «хэвол-реди». ${s('been')} ${tr('biːn')} — долгий звук «и». В ${s('sold')} — звук [əʊ], как «оу».`,
  why2:'Ударные слова: ALL, TICKETS, ALREADY, SOLD. Have и been читай быстрее и слабее.'},
 {type:'read', lvl:3, text:'The results will be announced tomorrow morning.', q:'Прочитай вслух',
  why:`${s('results')} — ударение на второй слог: re-SULTS. ${s('announced')} — ударение на -NOUNCED, -ed звучит как /t/ (после звука s): [əˈnaʊnst]. ${s('tomorrow')} — to-MOR-row.`,
  why2:'«will be» читай вместе и слабо. В announced первая буква a — безударный звук [ə].'}
]});

/* ================= 2. Reported questions and requests ================= */
RU.rule({
id:'en.9.reported_q',
short:'В косвенном вопросе — порядок как в утверждении и без do/did: <i>She asked where I lived.</i> Да/нет-вопрос — через <b>if/whether</b>. Просьба — <b>asked me to do</b>, <b>told me not to do</b>.',
theory:`
<p>Косвенная речь — это когда мы <b>пересказываем</b> чужие слова. Утверждения ты уже знаешь (he said that…). Теперь — <b>вопросы</b> и <b>просьбы</b>.</p>
<div class="box rule"><b>1. Специальный вопрос (where, what, when, how…)</b>asked + вопросительное слово + <b>подлежащее + глагол</b> (как в обычном предложении!)<br>
${s('“Where do you live?”')} → ${s('She asked me where I lived.')}<br>
${s('“What are you doing?”')} → ${s('He asked me what I was doing.')}</div>
<div class="box rule"><b>2. Общий вопрос (да / нет)</b>asked + <b>if</b> / <b>whether</b> + подлежащее + глагол<br>
${s('“Do you like pizza?”')} → ${s('He asked me if I liked pizza.')}<br>
${s('“Can you help me?”')} → ${s('She asked me whether I could help her.')}</div>
<div class="box rule"><b>3. Просьбы и приказы</b>asked / told + кого + <b>to</b> + глагол; отрицание — <b>not to</b><br>
${s('“Please close the window.”')} → ${s('Mum asked me to close the window.')}<br>
${s('“Don’t talk!”')} → ${s('The teacher told us not to talk.')}</div>
<p><b>Сдвиг времён</b> (если asked / told в прошедшем) — как в утверждениях:</p>
<table class="sym">
<tr><th>Прямая речь</th><th>Косвенная</th></tr>
<tr><td>do / does → </td><td>Past Simple (lived, liked)</td></tr>
<tr><td>am / is / are doing →</td><td>was / were doing</td></tr>
<tr><td>did / have done →</td><td>had done</td></tr>
<tr><td>can → could, will → would</td><td>${s('He asked if I would come.')}</td></tr>
<tr><td>yesterday → the day before, now → then</td><td></td></tr>
</table>
<div class="box err"><b>Типичные ошибки</b>
❌ <i>She asked where did I live.</i> ✅ ${s('She asked where I lived.')} — никаких do / did!<br>
❌ <i>He asked where was the station.</i> ✅ ${s('He asked where the station was.')} — глагол в конце, как в утверждении.<br>
❌ <i>He asked that I liked pizza.</i> ✅ ${s('He asked if I liked pizza.')}<br>
❌ <i>She told me don’t wait.</i> ✅ ${s('She told me not to wait.')}</div>
<div class="box tip"><b>Как запомнить</b>Косвенный вопрос — уже <b>не вопрос</b>. Вопросительный знак пропал — пропал и вопросительный порядок слов.</div>`,
theory2:`
<p>По-русски: «Она спросила, <b>где я живу</b>». Посмотри: после «где» идёт обычный порядок — «я живу». В английском так же: <b>where I lived</b>.</p>
<p>А вместо русской частицы «ли» («спросила, <b>нравится ли</b> мне») англичане ставят <b>if</b>: ${s('She asked if I liked it.')}</p>
<p>Просьба = «попросила меня <b>сделать</b>» → ${s('She asked me to wait.')}<br>«Сказала <b>не</b> делать» → ${s('She told me not to wait.')}</p>`,
items:[
 {lvl:1, text:'She asked me where I {lived*|did I live|do I live}.',
  why:'В косвенном вопросе нет do / did и порядок как в утверждении: where + <b>I lived</b>. Время сдвигается: «Where do you live?» → where I lived.',
  why2:'«Она спросила, где я живу» — «я живу» без вопросительного порядка. <i>did I live</i> — так только в прямом вопросе.'},
 {lvl:1, text:'He asked me {if*|that|do} I liked pizza.',
  why:'Общий вопрос «Do you like pizza?» (ответ да/нет) передаём через <b>if</b> («ли»). <i>that</i> — для утверждений, а <i>do</i> в косвенном вопросе не нужен.',
  why2:'«Он спросил, нравится <b>ли</b> мне пицца» — «ли» = if.'},
 {lvl:1, text:'Mum asked me {to close*|close|closing} the window.',
  why:'Просьба в косвенной речи: asked + кого + <b>to</b> + глагол → <b>asked me to close</b>.',
  why2:'«Мама попросила меня закрыть окно». После asked me всегда to: asked me to help, asked me to wait.'},
 {lvl:1, text:'The teacher told us {not to talk*|don’t talk|to not talking} during the test.',
  why:'Запрет «Don’t talk!» в косвенной речи → told us <b>not to</b> talk. Don’t в косвенную речь не переходит.',
  why2:'Отрицательная просьба: <b>not to</b> + глагол. Not стоит перед to.'},
 {lvl:1, q:'Как правильно пересказать: <i>“Where is the station?” he asked.</i>', opts:['He asked where the station was.','He asked where was the station.','He asked where is the station.'], ans:0,
  why:'В косвенном вопросе порядок как в утверждении: подлежащее <b>the station</b>, потом глагол <b>was</b> (is → was из-за сдвига времён).',
  why2:'Сравни: «Где вокзал?» — вопрос. «Он спросил, где вокзал» — уже не вопрос, поэтому was уходит в конец.', sayAfter:'He asked where the station was.'},
 {type:'listen', lvl:1, say:'He asked me if I was hungry.', q:'Послушай. Какой вопрос ему задали на самом деле (прямая речь)?', opts:['Are you hungry?','Were you hungry yesterday?','Is he hungry?'], ans:0,
  why:'«He asked me <b>if I was hungry</b>» — пересказ вопроса «<b>Are you hungry?</b>». Was появилось из-за сдвига времён, вчерашний день тут ни при чём.',
  why2:'if = «ли»: «спросил, голоден ли я». В прямой речи: Are you hungry?'},
 {type:'read', lvl:1, text:'She asked me where I lived.', q:'Прочитай вслух',
  why:`${s('asked')} ${tr('ɑːskt')} — окончание -ed звучит как /t/, а «sk» не теряй: «аскт». ${s('lived')} ${tr('lɪvd')} — короткий [ɪ], на конце /d/.`,
  why2:'Ударные слова: ASKED, WHERE, LIVED. «me» и «I» короткие и безударные.'},
 {lvl:2, text:'He wanted to know what time the film {started*|did start|does start}.',
  why:'Косвенный вопрос (wanted to know) → без do/did: <b>the film started</b>. Время сдвинуто в прошлое из-за wanted.',
  why2:'«Он хотел знать, во сколько начинается фильм» — обычный порядок «фильм начинается» → the film started.'},
 {lvl:2, text:'My friend asked me if I {could*|can|could I} help him.',
  why:'«Can you help me?» → can сдвигается в <b>could</b>, порядок прямой: <b>I could</b> help him. <i>could I</i> — вопросительный порядок, так нельзя.',
  why2:'can → could, will → would. И не забывай: после if — подлежащее, потом глагол.'},
 {lvl:2, text:'She asked me if I {would*|will|would I} come to her party.',
  why:'«Will you come?» → will сдвигается в <b>would</b>, и порядок прямой: <b>I would</b>.',
  why2:'В косвенной речи после asked: will → would. <i>would I</i> — порядок вопроса, он не нужен.'},
 {lvl:2, text:'The doctor told me {to stay*|stay|staying} in bed.',
  why:'Совет/приказ «Stay in bed» → told me <b>to stay</b>.',
  why2:'told + кого + to + глагол: told me to stay, told us to sit down.'},
 {lvl:2, text:'Dad asked {me*|I@en.5.pronouns} where {his keys were*|were his keys|are his keys}.',
  why:'1) После глагола asked нужен объектный падеж: <b>me</b> (I — только подлежащее). 2) Порядок как в утверждении: <b>his keys were</b> (are → were из-за сдвига времён).',
  why2:'1) asked <b>me</b>, told <b>him</b>, helped <b>us</b>. 2) «Папа спросил меня, где его ключи» — «ключи» (подлежащее), потом were.'},
 {lvl:2, text:'The teacher asked {us*|we@en.5.pronouns} {to open*|open|opening} our books.',
  why:'1) После asked — объектное местоимение <b>us</b> (we — подлежащее). 2) Просьба → <b>to open</b>.',
  why2:'1) «Попросила нас» — нас = us. 2) asked us to + глагол.'},
 {lvl:2, text:'Mum asked me how many {apples*|apple@en.s.plurals} I {had bought*|have bought|did I buy}.',
  why:'1) После how many — существительное во множественном числе: <b>apples</b>. 2) «How many apples have you bought?» → сдвиг: have bought → <b>had bought</b>, порядок прямой (не <i>did I buy</i>).',
  why2:'1) how many + много штук → apples. 2) Present Perfect в косвенной речи превращается в Past Perfect: had + V3.'},
 {lvl:2, text:'He asked me what time I usually {got*|did I get|do I get} up {on*|in|at@en.5.prep_time} Sundays.',
  why:'1) В косвенном вопросе порядок прямой и без do: <b>I usually got up</b> («What time do you get up?» → got). 2) С днями недели — <b>on</b>: on Sundays.',
  why2:'1) Никаких do/did в косвенном вопросе! 2) on Monday, on Sundays, on my birthday.'},
 {type:'listen', lvl:2, say:'She told me not to wait for her.', q:'Послушай. Что она сказала?', opts:['«Не жди меня»','«Подожди меня»','«Я тебя не жду»'], ans:0,
  why:'<b>told me not to wait</b> = велела мне <b>не</b> ждать. Прямая речь: «Don’t wait for me!»',
  why2:'Ищи на слух not to — это запрет: not to wait = «не ждать».'},
 {type:'spell', lvl:2, say:'whether', ans:['whether'], q:'Послушай и напиши слово (= if, «ли»)',
  why:`<b>whether</b> ${tr('ˈweðə')} — пишется wh-e-th-e-r. Не путай с weather (погода): звучат одинаково, но здесь смысл «ли».`,
  why2:'whether = if в косвенных вопросах: She asked whether I was ready.'},
 {lvl:3, text:'Tom asked me where I {had been*|have been|had I been} the day before.',
  why:'«Where were you yesterday?» → Past Simple сдвигается в Past Perfect: <b>I had been</b>, yesterday → the day before. Порядок прямой.',
  why2:'Видишь the day before — значит прошедшее «отодвинули» ещё дальше в прошлое: were → had been.'},
 {lvl:3, text:'He asked me what {I was doing*|was I doing|I am doing} at that moment.',
  why:'«What are you doing now?» → Present Continuous сдвигается в Past Continuous: <b>I was doing</b>, now → at that moment. Порядок — как в утверждении.',
  why2:'are doing → was doing. «Он спросил, что я делаю» — подлежащее I перед глаголом.'},
 {lvl:3, text:'She asked {who*|whose|whom} {had taken*|has taken|did take} her pen.',
  why:'1) Спрашивают о человеке, который взял, — <b>who</b> (кто). 2) «Who has taken my pen?» → Present Perfect сдвигается в <b>had taken</b>. Who здесь сам подлежащее, поэтому порядок не меняется.',
  why2:'1) who = кто, whose = чей. 2) has taken → had taken.'},
 {lvl:3, text:'Kate asked me if I {had seen*|have seen|did I see} the new film. “No, I {didn’t*|don’t|wasn’t@en.6.past_neg_q} go to the cinema last weekend,” I answered.',
  why:'1) «Have you seen the new film?» → <b>if I had seen</b>. 2) last weekend — прошлое; отрицание в Past Simple: <b>didn’t</b> + глагол (go). wasn’t с go не употребляется.',
  why2:'1) have seen → had seen. 2) В прошлом «не пошёл» = didn’t go.'},
 {lvl:3, text:'The guide asked us {not to touch*|don’t touch|not touch} the pictures because they {are*|is@en.s.to_be} very old.',
  why:'1) «Please don’t touch the pictures» → asked us <b>not to touch</b>. 2) <b>they</b> (картины) → <b>are</b>.',
  why2:'1) Отрицательная просьба: not to + глагол. 2) they are, it is.'},
 {type:'read', lvl:2, text:'The teacher told us not to run in the corridor.', q:'Прочитай вслух',
  why:`${s('told us')} — свяжи: «толдас». ${s('corridor')} ${tr('ˈkɒrɪdɔː')} — ударение на первый слог: COR-ri-dor, на конце r не читается.`,
  why2:'Ударные слова: TEACHER, TOLD, NOT, RUN, CORRIDOR. «to» и «the» слабые.'},
 {type:'read', lvl:3, text:'He asked if I could help him with his homework.', q:'Прочитай вслух',
  why:`${s('asked if')} — свяжи «аскт-иф». ${s('could')} ${tr('kʊd')} — буква l не читается. ${s('homework')} — ударение на HOME.`,
  why2:'«help him» — h в him в быстрой речи почти не слышно: «хелп-им». Не ставь паузу перед if.'}
]});

/* ================= 3. Third and mixed conditionals ================= */
RU.rule({
id:'en.9.cond_3',
short:'Сожаление о прошлом, которое уже не изменить: <b>If + had V3, would have V3</b>. <i>If I had known, I would have come.</i> Смешанный тип: <i>If I had slept, I wouldn’t be tired now.</i>',
theory:`
<p>Третий тип — это фантазия о <b>прошлом</b>: «Если бы я тогда знал, я бы пришёл». Но ничего уже не изменить — я <b>не</b> знал и <b>не</b> пришёл.</p>
<div class="box rule"><b>Третий тип</b>If + <b>had + V3</b>, … <b>would have + V3</b><br>
${s('If I had known about the party, I would have come.')}<br>= Я не знал и не пришёл.</div>
<p>Части можно поменять местами (тогда без запятой): ${s('I would have come if I had known.')}</p>
<p>Отрицание: ${s('If it hadn’t rained, we would have played football.')} ${s('We wouldn’t have missed the train if we had left earlier.')}</p>
<div class="box rule"><b>Смешанный тип: прошлое → сейчас</b>If + had V3 (прошлое), … would + глагол (результат <b>сейчас</b>)<br>
${s('If I had gone to bed earlier, I wouldn’t be tired now.')}<br>Вчера не лёг рано → сегодня устал. Подсказка — слова <b>now, today</b>.</div>
<table class="sym">
<tr><th>Тип</th><th>Условие</th><th>Результат</th><th>Про что</th></tr>
<tr><td>2-й</td><td>If I <b>had</b> time,</td><td>I <b>would go</b>.</td><td>сейчас, нереально</td></tr>
<tr><td>3-й</td><td>If I <b>had had</b> time,</td><td>I <b>would have gone</b>.</td><td>прошлое, не случилось</td></tr>
<tr><td>смешанный</td><td>If I <b>had slept</b>,</td><td>I <b>wouldn’t be</b> tired now.</td><td>прошлое → сейчас</td></tr>
</table>
<div class="box err"><b>Типичные ошибки</b>
❌ <i>If I would have known…</i> — после if никогда не ставь would! ✅ ${s('If I had known…')}<br>
❌ <i>If I knew yesterday…</i> — для прошлого нужно had + V3.<br>
❌ <i>I would came</i> — после would have только V3: ${s('I would have come.')}</div>
<div class="box tip"><b>Как запомнить</b>«Had — в if, would have — в другой половине». В речи would have звучит как ${s('would’ve')} ${tr('ˈwʊdəv')}.</div>`,
theory2:`
<p>Представь машину времени, которая <b>не работает</b>. Ты смотришь назад и говоришь: «Эх, если бы…»</p>
<p>По-русски: «Если бы ты <b>позвонил</b>, я бы <b>помог</b>». По-английски нужно показать, что это прошлое: ставим «на шаг назад» — <b>had called</b> и <b>would have helped</b>.</p>
<p>${s('If you had called me, I would have helped you.')}<br>${s('If we had taken a map, we wouldn’t have got lost.')}</p>
<p>Лайфхак: если в предложении есть <b>yesterday, last year, then</b> и речь о том, что <b>не случилось</b> — это третий тип.</p>`,
items:[
 {lvl:1, text:'If I {had known*|knew|have known} about the party, I would have come.',
  why:'Вторая половина — <b>would have come</b>, значит третий тип: в if-части <b>had + V3</b> → <b>had known</b>.',
  why2:'«Если бы я знал (тогда)…» — прошлое, которое не изменить: had known.'},
 {lvl:1, text:'If you had asked me yesterday, I {would have helped*|would help|will help} you.',
  why:'If-часть — had asked (прошлое), yesterday → результат тоже в прошлом: <b>would have helped</b>.',
  why2:'Третий тип: had V3 … would have V3. Will после if-фантазии о прошлом не бывает.'},
 {lvl:1, text:'If it {hadn’t rained*|didn’t rain|wouldn’t rain} yesterday, we would have played football.',
  why:'Yesterday + would have played → третий тип: <b>hadn’t rained</b>. После if would не ставится.',
  why2:'«Если бы вчера не было дождя…» — но дождь был. had not + V3.'},
 {lvl:1, text:'She would have passed the exam if she {had studied*|studied|would have studied} harder.',
  why:'Первая часть would have passed → в if-части <b>had studied</b>. <i>would have studied</i> после if — ошибка.',
  why2:'Части можно менять местами, но правило то же: had V3 — после if.'},
 {lvl:1, q:'Что значит: <i>If I had seen him, I would have said hello.</i>', opts:['Я его не видел и не поздоровался','Я его видел и поздоровался','Если увижу его — поздороваюсь'], ans:0,
  why:'Третий тип — о прошлом, которое <b>не случилось</b>: не видел → не поздоровался.',
  why2:'had seen — «если бы видел (тогда)». Раз «если бы», значит на самом деле не видел.', sayAfter:'If I had seen him, I would have said hello.'},
 {type:'listen', lvl:1, say:'If I had seen him, I would have told him.', q:'Послушай. Видел ли говорящий его?', opts:['Нет, не видел','Да, видел','Увидит завтра'], ans:0,
  why:'Ты слышал <b>If I had seen him</b> — третий тип, нереальное прошлое. Значит, не видел.',
  why2:'«would have told» в речи звучит как «вуд-ев-толд». Это «рассказал бы (но не рассказал)».'},
 {type:'read', lvl:1, text:'If I had known, I would have come earlier.', q:'Прочитай вслух',
  why:`${s('known')} ${tr('nəʊn')} — буква k не читается! ${s('would have')} читай слитно и слабо: ${tr('ˈwʊdəv')}. ${s('earlier')} ${tr('ˈɜːliə')} — r не читается.`,
  why2:'Пауза — только после known (там запятая). Ударные слова: KNOWN, COME, EARLIER.'},
 {lvl:2, text:'We {wouldn’t have missed*|didn’t miss|won’t miss} the train if we had left home earlier.',
  why:'If-часть — had left → третий тип, результат: <b>wouldn’t have missed</b>.',
  why2:'«Мы бы не опоздали на поезд, если бы вышли раньше» (но опоздали). would not have + V3.'},
 {lvl:2, text:'If they {had taken*|took|would take} a map, they wouldn’t have got lost.',
  why:'Результат wouldn’t have got lost → условие <b>had taken</b> (take → took → taken).',
  why2:'«Если бы они взяли карту…» — не взяли и заблудились. had + V3.'},
 {lvl:2, text:'If I had gone to bed earlier last night, I {wouldn’t be*|wouldn’t have been|won’t be} so tired now.',
  why:'Смешанный тип: условие в прошлом (last night), а результат <b>сейчас</b> (now) → <b>wouldn’t be</b>. <i>wouldn’t have been</i> — о прошлом, а «now» говорит о настоящем.',
  why2:'Вчера не лёг рано → сейчас устал. Видишь now — во второй части would + обычный глагол.'},
 {lvl:2, text:'If we {had bought*|bought|buy} the tickets last week, we would be at the concert now.',
  why:'Покупка — в прошлом (last week), результат — сейчас (now) → смешанный тип: условие <b>had bought</b>.',
  why2:'«Если бы купили билеты на прошлой неделе (но не купили), сейчас были бы на концерте».'},
 {lvl:2, text:'If I {had known*|knew|have known} it was {your*|you’re|you@en.p.possessive} birthday, I would have bought a present.',
  why:'1) would have bought → третий тип: <b>had known</b>. 2) «Твой день рождения» — притяжательное <b>your</b>. <i>you’re</i> = you are.',
  why2:'1) had V3 в if-части. 2) your = твой, you’re = ты есть.'},
 {lvl:2, text:'If Tom {hadn’t eaten*|didn’t eat|wouldn’t eat} so {many*|much@en.6.much_many} sweets, he wouldn’t have felt ill.',
  why:'1) wouldn’t have felt → третий тип: <b>hadn’t eaten</b>. 2) sweets — исчисляемые (конфеты можно сосчитать) → <b>many</b>.',
  why2:'1) «Если бы Том не съел…» — had not + V3. 2) many sweets, much sugar.'},
 {lvl:2, text:'If the weather {had been*|was|would be} {better*|more good|gooder@en.6.comparatives} last Sunday, we would have gone to the beach.',
  why:'1) last Sunday + would have gone → <b>had been</b>. 2) good — исключение: good → <b>better</b> → the best.',
  why2:'1) Третий тип: had been. 2) Не бывает «more good» и «gooder» — только better.'},
 {lvl:3, text:'If I {had*|would have|have} known the answer, I would have told you.',
  why:'После if никогда не ставится would! Правильно: <b>If I had known</b>.',
  why2:'Ловушка: would have — только во второй части. В if-части — had + V3.'},
 {lvl:3, text:'I would have called you yesterday if my phone battery {hadn’t died*|didn’t die|wouldn’t die}.',
  why:'Результат would have called yesterday → условие тоже о прошлом: <b>hadn’t died</b>.',
  why2:'«Позвонил бы вчера, если бы не сел телефон» (а он сел). had not + V3.'},
 {lvl:3, text:'She {fell*|falled@en.6.past_irreg} near the finish. If she hadn’t fallen, she {would have won*|would win|will win} the race.',
  why:'1) fall — неправильный глагол: fall → <b>fell</b> → fallen. 2) hadn’t fallen → третий тип: <b>would have won</b>.',
  why2:'1) falled — такого слова нет. 2) О прошлой гонке, которую она не выиграла: would have + V3.'},
 {lvl:3, text:'If you had listened to the teacher yesterday, you {would know*|would have known|will know} how to do {this*|these@en.s.this_that} exercise now.',
  why:'1) Смешанный тип: вчера не слушал → <b>сейчас</b> не знаешь: <b>would know</b>. 2) exercise — одно упражнение → <b>this</b> (these — для многих).',
  why2:'1) Слово now решает: результат в настоящем → would + глагол. 2) this exercise, these exercises.'},
 {lvl:3, text:'If I {had seen*|saw|have seen} you {at*|on|in@en.5.prep_time} the weekend, I would have said hello.',
  why:'1) would have said → <b>had seen</b>. 2) В британском английском — <b>at the weekend</b>.',
  why2:'1) Третий тип. 2) Запомни как фразу: at the weekend, at night, at Christmas.'},
 {type:'read', lvl:2, text:'If we had taken a taxi, we would not have been late.', q:'Прочитай вслух',
  why:`${s('had taken a taxi')} — свяжи «тейкен-э-тэкси». ${s('taxi')} ${tr('ˈtæksi')} — звук [æ], рот широко. ${s('would not have been')} читай ровно, ударение на NOT.`,
  why2:'Пауза только на запятой после taxi. В late — дифтонг [eɪ]: «лейт».'},
 {type:'read', lvl:3, text:'If she had studied harder, she would have passed the exam.', q:'Прочитай вслух',
  why:`${s('studied')} ${tr('ˈstʌdid')} — ударение на STU. ${s('passed')} ${tr('pɑːst')} — -ed звучит как /t/. ${s('exam')} — ударение на второй слог: ex-AM ${tr('ɪɡˈzæm')}.`,
  why2:'«would have» — слабо: «вудэв». «harder» — r не читается: [ˈhɑːdə].'},
 {type:'listen', lvl:2, say:'I would have come.', q:'Послушай. Что прозвучало?', opts:['I would have come.','I will have come.','I would come.'], ans:0,
  why:'Ты слышал короткое [əv] после would: «вудэв» — это <b>would have</b>. «Пришёл бы (но не пришёл)».',
  why2:'В быстрой речи have сокращается до [əv]. Если слышишь «вудэв» — это would have.'},
 {type:'spell', lvl:2, say:'known', ans:['known'], q:'Послушай и напиши слово (третья форма от know)',
  why:'know → knew → <b>known</b>. Буква k в начале не читается, на конце -n.',
  why2:'Как know (знать) + n. Звучит как «ноун».'}
]});

/* ================= 4. I wish / If only ================= */
RU.rule({
id:'en.9.wish',
short:'<b>I wish + Past Simple</b> — жаль, что сейчас не так (<i>I wish I had a dog</i>). <b>I wish + had V3</b> — жаль, что в прошлом так вышло (<i>I wish I hadn’t said that</i>). <b>I wish + would</b> — хочу, чтобы кто-то изменил поведение.',
theory:`
<p><b>I wish</b> = «жаль, что…» / «хотел бы я, чтобы…». <b>If only</b> = «если бы только…» — то же самое, но эмоциональнее.</p>
<div class="box rule"><b>1. Жаль, что СЕЙЧАС не так</b>I wish + <b>Past Simple</b> (to be → <b>were</b>)<br>
${s('I wish I had a dog.')} — Жаль, что у меня нет собаки.<br>
${s('I wish I were taller.')} — Жаль, что я не выше.<br>
${s('I wish I knew the answer.')} — Жаль, что я не знаю ответа.<br>
${s('I wish I could swim.')} — Жаль, что я не умею плавать (can → could).</div>
<div class="box rule"><b>2. Жаль, что в ПРОШЛОМ так получилось</b>I wish + <b>had + V3</b><br>
${s('I wish I had gone to the party.')} — Жаль, что я не пошёл на вечеринку.<br>
${s('If only I hadn’t eaten so much cake!')} — Ну зачем я съел столько торта!</div>
<div class="box rule"><b>3. Хочу, чтобы КТО-ТО (или что-то) изменился</b>I wish + другой человек + <b>would</b> + глагол — обычно раздражение<br>
${s('I wish my brother would stop playing loud music.')}<br>
${s('I wish it would stop raining.')}</div>
<div class="box tip"><b>Как запомнить</b>После wish время делает «шаг назад»: сейчас → Past Simple, прошлое → Past Perfect. И всё переворачивается: <b>есть</b> → «жаль, что <b>нет</b>», <b>нет</b> → «жаль, что <b>есть</b>».</div>
<div class="box err"><b>Типичные ошибки</b>
❌ <i>I wish I have a dog.</i> ✅ ${s('I wish I had a dog.')}<br>
❌ <i>I wish I would speak French.</i> — would не говорят о себе. ✅ ${s('I wish I could speak French.')}<br>
❌ <i>I wish I didn’t say that yesterday.</i> ✅ ${s('I wish I hadn’t said that.')}<br>
В разговоре можно услышать <i>I wish I was</i>, но в школе и на экзамене пиши <b>were</b>.</div>`,
theory2:`
<p>Русское «жаль» английским помогает <b>wish</b>, но время надо сдвинуть назад, как в условных предложениях.</p>
<table class="sym">
<tr><th>На самом деле</th><th>Я жалею</th></tr>
<tr><td>I don’t have a cat.</td><td>${s('I wish I had a cat.')}</td></tr>
<tr><td>I can’t dance.</td><td>${s('I wish I could dance.')}</td></tr>
<tr><td>I didn’t go.</td><td>${s('I wish I had gone.')}</td></tr>
<tr><td>I ate too much.</td><td>${s('I wish I hadn’t eaten so much.')}</td></tr>
</table>
<p>Подсказка: <b>yesterday, last week</b> → had V3. <b>now, today</b> → Past Simple.</p>`,
items:[
 {lvl:1, text:'I wish I {had*|have|would have} a dog.',
  why:'Жаль, что <b>сейчас</b> нет собаки → после wish Past Simple: <b>had</b>.',
  why2:'«Жаль, что у меня нет собаки». Сейчас → шаг назад → had.'},
 {lvl:1, text:'I wish I {were*|am|will be} taller.',
  why:'Жаль, что сейчас я не выше → Past Simple от to be. После wish правильно <b>were</b> (для всех лиц).',
  why2:'I wish I were… — классическая форма. (В разговоре бывает was, но в школе — were.)'},
 {lvl:1, text:'I wish I {could*|can|will} swim.',
  why:'Жаль, что не умею → can делает шаг назад: <b>could</b>.',
  why2:'can → could: I wish I could fly, I wish I could swim.'},
 {lvl:1, text:'I wish I {had gone*|went|go} to the party yesterday. Everybody says it was great!',
  why:'Жаль о <b>прошлом</b> (yesterday) → <b>had + V3</b>: had gone.',
  why2:'«Жаль, что я не пошёл вчера». Прошлое → шаг назад → Past Perfect.'},
 {lvl:1, text:'I wish it {would stop*|stops|will stop} raining.',
  why:'Хотим, чтобы что-то (дождь) изменилось → <b>would</b> + глагол: would stop.',
  why2:'«Хоть бы дождь кончился!» — I wish + would.'},
 {lvl:1, q:'Как сказать: «Жаль, что у меня нет времени»?', opts:['I wish I had time.','I wish I have time.','I wish I had had time.'], ans:0,
  why:'Сейчас нет времени → I wish + Past Simple: <b>had</b>. <i>had had</i> — о прошлом.',
  why2:'Шаг назад: have → had.', sayAfter:'I wish I had time.'},
 {type:'listen', lvl:1, say:'I wish I had a brother.', q:'Послушай. Есть ли у говорящего брат?', opts:['Нет','Да'], ans:0,
  why:'«I wish I had a brother» = «Жаль, что у меня нет брата». Wish переворачивает: had → на самом деле нет.',
  why2:'Если бы брат был, жалеть было бы не о чем.'},
 {type:'read', lvl:1, text:'I wish I could fly.', q:'Прочитай вслух',
  why:`${s('wish')} ${tr('wɪʃ')} — губы трубочкой для [w], короткий [ɪ]. ${s('could')} — l не читается. ${s('fly')} — «флай».`,
  why2:'Короткое предложение — каждое слово должно прозвучать чётко. Ударные: WISH, FLY.'},
 {lvl:2, text:'If only I {hadn’t eaten*|didn’t eat|don’t eat} so much cake last night!',
  why:'Сожаление о прошлом (last night) → <b>hadn’t + V3</b>: hadn’t eaten.',
  why2:'If only = I wish. О прошлом → had not + V3.'},
 {lvl:2, text:'I wish my brother {would stop*|stops|will stop} playing loud music.',
  why:'Раздражает поведение <b>другого</b> человека → <b>would stop</b>.',
  why2:'«Хоть бы брат перестал!» — wish + кто-то + would.'},
 {lvl:2, text:'I wish I {knew*|know|had known} the answer now.',
  why:'Сейчас (now) не знаю → Past Simple: <b>knew</b>. <i>had known</i> — о прошлом.',
  why2:'now → Past Simple после wish.'},
 {lvl:2, text:'She wishes she {lived*|lives|has lived} by the sea.',
  why:'Сейчас она не живёт у моря и жалеет → Past Simple: <b>lived</b>.',
  why2:'Даже если wishes в настоящем, после него — шаг назад: lived.'},
 {lvl:2, text:'I wish I {had*|have} {a*|an@en.s.a_an} bigger room.',
  why:'1) Сейчас комната маленькая → <b>had</b>. 2) bigger начинается с согласного звука [b] → <b>a</b>.',
  why2:'1) wish + Past Simple. 2) an — только перед гласным звуком: an apple, a big room.'},
 {lvl:2, text:'I wish there {were*|are|will be} more {children*|childs@en.s.plurals} in our street.',
  why:'1) Сейчас мало детей, жалею → Past Simple: there <b>were</b>. 2) child — исключение: <b>children</b>.',
  why2:'1) there are → there were после wish. 2) one child — two children.'},
 {lvl:2, text:'I wish I {hadn’t lost*|didn’t lose|don’t lose} my phone. I {bought*|buyed@en.6.past_irreg} it only last month.',
  why:'1) Потерял — в прошлом → <b>hadn’t lost</b>. 2) buy — неправильный глагол: buy → <b>bought</b> → bought.',
  why2:'1) Сожаление о прошлом — had V3. 2) buyed — такого нет.'},
 {lvl:2, text:'I wish my sister {would stop*|stops|will stop} taking {my*|me|mine@en.p.possessive} clothes.',
  why:'1) Раздражает поведение сестры → <b>would stop</b>. 2) Перед существительным — <b>my</b> (mine — без существительного: «They are mine»).',
  why2:'1) wish + would. 2) my clothes, but: the clothes are mine.'},
 {type:'listen', lvl:2, say:'I wish I had gone with them.', q:'Послушай. Что чувствует говорящий?', opts:['Жалеет, что не пошёл с ними','Рад, что пошёл с ними','Собирается пойти с ними'], ans:0,
  why:'«had gone» — прошлое, после wish: «жаль, что я <b>не</b> пошёл».',
  why2:'Услышал had + V3 → сожаление о прошлом.'},
 {type:'spell', lvl:2, say:'I wish I were taller', ans:['I wish I were taller'], q:'Послушай и напиши предложение',
  why:`<b>I wish I were taller.</b> were ${tr('wɜː')} — не путай с where [weə] (где). taller — двойная l.`,
  why2:'После wish — were для всех лиц. tall → taller.'},
 {lvl:3, text:'I wish I {could*|would} speak French.',
  why:'О своём умении говорят <b>could</b>. <i>I wish I would</i> — ошибка: would после wish — о других людях.',
  why2:'Ловушка ОГЭ: I wish I could (умел бы), I wish YOU would (ты бы…).'},
 {lvl:3, text:'He wishes he {had studied*|studied|would study} harder last year.',
  why:'last year → прошлое → <b>had studied</b>.',
  why2:'Жалеет о прошлом году — Past Perfect.'},
 {lvl:3, text:'If only I {were*|am|will be} {older*|more old|oldest@en.6.comparatives}! Then I could drive.',
  why:'1) Сейчас я не старше → <b>were</b>. 2) old — короткое слово: <b>older</b> (more old — неверно; oldest — превосходная степень, тут сравнение).',
  why2:'1) If only = I wish → were. 2) old → older → the oldest.'},
 {lvl:3, text:'I wish I {could*|can|would} go out, but I {have to*|must to|has to@en.6.must_have_to} do my homework.',
  why:'1) Сейчас не могу → <b>could</b>. 2) Обязанность: <b>have to</b> для I (has to — для he/she; после must частица to не ставится).',
  why2:'1) can → could. 2) I have to, he has to, I must (без to).'},
 {lvl:3, text:'I wish I {hadn’t said*|didn’t say|don’t say} that to her yesterday.',
  why:'yesterday → сожаление о прошлом → <b>hadn’t said</b>.',
  why2:'«Зачем я ей это сказал!» — had not + V3.'},
 {type:'read', lvl:2, text:'I wish I had more free time.', q:'Прочитай вслух',
  why:`${s('wish I')} — свяжи «уиш-ай». ${s('free time')} — долгий [iː] в free, дифтонг [aɪ] в time.`,
  why2:'Ударные слова: WISH, MORE, FREE, TIME. В «more» r не читается: [mɔː].'},
 {type:'read', lvl:3, text:'If only I had listened to my mother.', q:'Прочитай вслух',
  why:`${s('listened')} ${tr('ˈlɪsnd')} — буква t не читается! -ed звучит как /d/. ${s('mother')} — th звонкий [ð], язык между зубами.`,
  why2:'«If only» — ударение на ONLY. «had» и «to» — слабые.'}
]});

/* ================= 5. Causative: have something done ================= */
RU.rule({
id:'en.9.causative',
short:'<b>have + предмет + V3</b> — тебе что-то сделали (ты не сам): <i>I had my hair cut.</i> — Меня подстригли. Время меняется только у have.',
theory:`
<p>По-русски мы говорим: «Я подстригся», «Я починил телефон в мастерской». Но на самом деле стриг парикмахер, а чинил мастер! В английском это видно сразу:</p>
<div class="box rule"><b>Формула</b>have (в нужном времени) + <b>что</b> + <b>V3</b><br>
${s('I had my hair cut.')} — Меня подстригли (парикмахер).<br>
${s('I cut my hair.')} — Я подстригся <b>сам</b>.</div>
<table class="sym">
<tr><th>Время</th><th>Пример</th></tr>
<tr><td>Present Simple</td><td>${s('I have my hair cut every month.')}</td></tr>
<tr><td>Present Continuous</td><td>${s('She is having her car repaired.')}</td></tr>
<tr><td>Past Simple</td><td>${s('We had our flat painted last year.')}</td></tr>
<tr><td>Present Perfect</td><td>${s('They have just had the roof repaired.')}</td></tr>
<tr><td>Future / going to</td><td>${s('I am going to have my eyes tested.')}</td></tr>
<tr><td>Модальные</td><td>${s('You should have your bike repaired.')}</td></tr>
</table>
<div class="box tip"><b>Как запомнить</b>Порядок: <b>have — ЧТО — V3</b>. Предмет стоит в середине, как начинка в бутерброде.<br>Вопросы и отрицания — как с обычным глаголом have: ${s('Where do you have your hair cut?')} ${s('I didn’t have it repaired.')}</div>
<p>Иногда так говорят о неприятности: ${s('He had his bike stolen.')} — У него украли велосипед.</p>
<p><b>get</b> вместо have — то же самое, только разговорнее: ${s('I got my phone repaired.')}</p>
<div class="box err"><b>Типичные ошибки</b>
❌ <i>I had cut my hair.</i> — это Past Perfect «я (сам) подстриг». ✅ ${s('I had my hair cut.')}<br>
❌ <i>I have repaired my bike</i> (если чинил мастер). ✅ ${s('I have had my bike repaired.')}<br>
❌ <i>How often have you your hair cut?</i> ✅ ${s('How often do you have your hair cut?')}</div>`,
theory2:`
<p>Представь, что <b>have</b> — это «заказ услуги». Ты заказал, а сделал кто-то другой.</p>
<p>${s('I had my car washed.')} — Мне помыли машину (на мойке).<br>
${s('We are having our kitchen painted.')} — Нам красят кухню (сейчас работают маляры).<br>
${s('I need to have my eyes tested.')} — Мне надо проверить зрение (у врача).</p>
<p>Подсказка: если по смыслу работает <b>мастер, парикмахер, врач, магазин</b> — нужна конструкция have + что + V3.</p>`,
items:[
 {lvl:1, text:'Last month I went to the hairdresser’s and {had my hair cut*|had cut my hair|have my hair cut}.',
  why:'Стриг парикмахер, а не я → <b>had my hair cut</b> (have + что + V3, в прошлом). <i>had cut my hair</i> — «я сам подстриг», <i>have</i> — настоящее время, а рассказ о прошлом.',
  why2:'Порядок: had — my hair — cut. Cut во всех формах одинаковый: cut — cut — cut.'},
 {lvl:1, text:'She {is having*|has|having} her car repaired at the moment.',
  why:'at the moment → Present Continuous от have: <b>is having</b> her car repaired.',
  why2:'«Ей сейчас чинят машину». Только have меняет время, repaired остаётся V3.'},
 {lvl:1, text:'You should {get your teeth checked*|get checked your teeth|check get your teeth} twice a year.',
  why:'Порядок: get — <b>что</b> (your teeth) — V3 (checked). Get = have, только разговорнее.',
  why2:'Предмет всегда в середине: get your teeth checked.'},
 {lvl:1, text:'We are going to {have our kitchen painted*|have painted our kitchen|paint have our kitchen} next week.',
  why:'Красить будут маляры → <b>have our kitchen painted</b>: have — что — V3.',
  why2:'<i>have painted our kitchen</i> — это Present Perfect «мы покрасили». Нужен порядок «have + кухня + painted».'},
 {lvl:1, q:'<i>I had my car washed.</i> Кто мыл машину?', opts:['Кто-то другой (например, на мойке)','Я сам'], ans:0,
  why:'have + что + V3 = сделал кто-то другой для меня.',
  why2:'Если бы мыл сам: I washed my car.', sayAfter:'I had my car washed.'},
 {type:'listen', lvl:1, say:'She had her bag stolen on the bus.', q:'Послушай. Что случилось?', opts:['У неё украли сумку в автобусе','Она украла сумку в автобусе','Она забыла сумку дома'], ans:0,
  why:'<b>had her bag stolen</b> — с ней что-то сделали (украли). Это неприятность, а не заказ.',
  why2:'have + что + V3 может означать «у неё украли / ей сломали».'},
 {type:'read', lvl:1, text:'I had my hair cut yesterday.', q:'Прочитай вслух',
  why:`${s('hair')} ${tr('heə')} — r не читается: «хэа». ${s('cut')} ${tr('kʌt')} — короткий [ʌ], как русское «а». ${s('yesterday')} — ударение на YES.`,
  why2:'«had my» — d почти сливается с m. Ударные слова: HAIR, CUT, YESTERDAY.'},
 {lvl:2, text:'I need to {have my eyes tested*|have tested my eyes|test have my eyes}: I can’t see the board well.',
  why:'Зрение проверяет врач → <b>have my eyes tested</b>.',
  why2:'have — my eyes — tested. Предмет между have и V3.'},
 {lvl:2, text:'How often {do you have*|have you|you have} your hair cut?',
  why:'В этой конструкции have — обычный глагол, вопрос строится через <b>do</b>: How often <b>do you have</b> your hair cut?',
  why2:'Как «Do you have a pen?» — так и «Do you have your hair cut?».'},
 {lvl:2, text:'Our house looks new: we {have just had the roof repaired*|have just had repaired the roof|have just the roof repaired}.',
  why:'Present Perfect от have: <b>have just had</b> + что (the roof) + V3 (repaired).',
  why2:'«Нам только что починили крышу». have had — это Present Perfect от have, дальше — предмет и V3.'},
 {lvl:2, text:'I can’t go to the post office, so I’ll {have the parcel delivered*|have delivered the parcel|deliver have the parcel} to my house.',
  why:'Посылку доставит курьер → <b>have the parcel delivered</b>.',
  why2:'have — the parcel — delivered. Не путай с Present Perfect «have delivered».'},
 {lvl:2, text:'My dad {has*|have@en.5.ps} his car {serviced*|service|servicing} every year.',
  why:'1) My dad = he → <b>has</b> (Present Simple, he/she/it). 2) Машину обслуживают в сервисе → V3: <b>serviced</b>.',
  why2:'1) he has, they have. 2) have + что + V3.'},
 {lvl:2, text:'Last Saturday I {had my hair cut*|had cut my hair|have my hair cut} {at*|in|on@en.5.prep_time} ten o’clock in the morning.',
  why:'1) Last Saturday, стриг парикмахер → <b>had my hair cut</b>. 2) С часами — <b>at</b>: at ten o’clock.',
  why2:'1) have + что + V3 в прошлом. 2) at + время на часах.'},
 {lvl:2, text:'Mum {was having*|had having|was had} the carpet cleaned when I {came*|come|comed@en.6.past_irreg} home.',
  why:'1) Процесс в прошлом, в момент «когда я пришёл» → <b>was having</b> the carpet cleaned. 2) come — неправильный: come → <b>came</b> → come.',
  why2:'1) Past Continuous от have. 2) comed — такого слова нет.'},
 {type:'listen', lvl:2, say:'I am having my hair cut tomorrow.', q:'Послушай. О чём речь?', opts:['Меня подстригут завтра','Я завтра кого-то подстригу','Меня подстригли вчера'], ans:0,
  why:'<b>am having my hair cut tomorrow</b> — Present Continuous о запланированном: меня подстригут завтра.',
  why2:'Услышал tomorrow и have + hair + cut → завтра стрижка у парикмахера.'},
 {type:'spell', lvl:2, say:'repaired', ans:['repaired'], q:'Послушай и напиши слово',
  why:'re-pair-ed: <b>repaired</b>. Сочетание ai перед r читается [eə].',
  why2:'repair + ed. Одна r в середине, одна p.'},
 {lvl:3, text:'He {had his bike stolen*|stole his bike|had stolen his bike} last week.',
  why:'С ним случилась неприятность: велосипед украли → <b>had his bike stolen</b>. <i>had stolen his bike</i> — «он (сам) украл свой велосипед» (Past Perfect).',
  why2:'have + что + V3 = «у него украли».'},
 {lvl:3, text:'My grandmother {didn’t have*|hadn’t|didn’t had} her windows cleaned last spring.',
  why:'Отрицание в Past Simple — через <b>didn’t have</b> (have здесь обычный глагол; после didn’t — начальная форма).',
  why2:'didn’t + have, а не had. Hadn’t her windows — так не говорят.'},
 {lvl:3, text:'There {are*|is@en.p.there_is} some broken windows in our school, so the head teacher is going to {have them repaired*|have repaired them|repair have them}.',
  why:'1) windows — много → <b>there are</b>. 2) Окна починят мастера → <b>have them repaired</b>: местоимение в середине.',
  why2:'1) there is + один, there are + много. 2) have — them — repaired.'},
 {lvl:3, text:'Your bike is broken. You should {have it repaired*|have repaired it|repair have it} at the shop {next to*|next|near of@en.p.prep_place} the station.',
  why:'1) Чинить будет мастерская → <b>have it repaired</b>. 2) «рядом с» = <b>next to</b> (near of — неверно).',
  why2:'1) have — it — V3. 2) next to the station.'},
 {lvl:3, text:'{Did*|Were|Have@en.6.past_neg_q} you {have your photo taken*|have taken your photo|take have your photo} for your new passport last week?',
  why:'1) Вопрос в Past Simple (last week) → <b>Did</b> you have…? 2) Фотографировал фотограф → <b>have your photo taken</b>.',
  why2:'1) Did + подлежащее + глагол. 2) have — what — V3.'},
 {type:'read', lvl:2, text:'We are having our kitchen painted.', q:'Прочитай вслух',
  why:`${s('kitchen')} ${tr('ˈkɪtʃɪn')} — ударение на KIT, tch = «ч». ${s('painted')} ${tr('ˈpeɪntɪd')} — -ed после t звучит как [ɪd].`,
  why2:'«having our» — свяжи: «хэвинг-ауэ». Ударные: HAVING, KITCHEN, PAINTED.'},
 {type:'read', lvl:3, text:'You should have your eyes tested every year.', q:'Прочитай вслух',
  why:`${s('should')} — l не читается: [ʃʊd]. ${s('your eyes')} — свяжи: «йо-райз». ${s('tested')} — -ed звучит как [ɪd].`,
  why2:'Ударные: EYES, TESTED, EVERY, YEAR. «have your» читай быстро.'}
]});

/* ================= 6. Modal perfect ================= */
RU.rule({
id:'en.9.modal_perf',
short:'<b>must have V3</b> — наверняка было; <b>can’t have V3</b> — не может быть, чтобы было; <b>should have V3</b> — надо было (а не сделал); <b>shouldn’t have V3</b> — не надо было (а сделал).',
theory:`
<p>Модальный глагол + <b>have + V3</b> — это разговор о <b>прошлом</b>: догадки и упрёки.</p>
<table class="sym">
<tr><th>Конструкция</th><th>Значение</th><th>Пример</th></tr>
<tr><td><b>must have</b> + V3</td><td>наверняка, должно быть (уверен на 90%)</td><td>${s('The ground is wet. It must have rained.')}</td></tr>
<tr><td><b>can’t have</b> + V3</td><td>не может быть, чтобы (уверен, что нет)</td><td>${s('She can’t have seen me. She was at home.')}</td></tr>
<tr><td><b>might / may have</b> + V3</td><td>может быть (не уверен)</td><td>${s('He might have forgotten.')}</td></tr>
<tr><td><b>should have</b> + V3</td><td>надо было (но не сделал) — упрёк, сожаление</td><td>${s('You should have told me!')}</td></tr>
<tr><td><b>shouldn’t have</b> + V3</td><td>не надо было (а сделал)</td><td>${s('I shouldn’t have eaten so much.')}</td></tr>
</table>
<div class="box tip"><b>Как выбрать</b>1) Есть <b>доказательство</b>, что было → <b>must have</b>.<br>2) Есть доказательство, что <b>не могло</b> быть (был в другом месте, не умеет) → <b>can’t have</b>.<br>3) Ты <b>точно знаешь</b>, что человек сделал / не сделал, и оцениваешь — хорошо или плохо → <b>should / shouldn’t have</b>.</div>
<div class="box err"><b>Типичные ошибки</b>
❌ <i>mustn’t have</i> для «не может быть» — правильно ${s('can’t have')}.<br>
❌ <i>He must have went.</i> — после have только V3: ${s('He must have gone.')}<br>
❌ <i>should of</i> — так пишут по ошибке, потому что слышат [əv]. Правильно: ${s('should have')}.</div>
<p>В речи have слабый: ${s('must have')} ${tr('ˈmʌstəv')}, ${s('should have')} ${tr('ˈʃʊdəv')}.</p>`,
theory2:`
<p>Представь себя детективом 🕵️:</p>
<ul>
<li>Следы на снегу → «Здесь <b>наверняка</b> кто-то <b>прошёл</b>» → ${s('Someone must have walked here.')}</li>
<li>Но у подозреваемого алиби → «Он <b>не мог</b> этого <b>сделать</b>» → ${s('He can’t have done it.')}</li>
</ul>
<p>А теперь ты — строгий родитель:</p>
<ul>
<li>«<b>Надо было</b> взять зонт!» (а ты не взял) → ${s('You should have taken an umbrella.')}</li>
<li>«<b>Не надо было</b> так поздно ложиться!» (а ты лёг) → ${s('You shouldn’t have gone to bed so late.')}</li>
</ul>`,
items:[
 {lvl:1, text:'Everything is white outside. It {must have snowed*|can’t have snowed|should have snowed} during the night.',
  why:'Доказательство — всё белое → вывод «наверняка шёл снег»: <b>must have snowed</b>.',
  why2:'Детектив видит улику → must have + V3.'},
 {lvl:1, text:'You {should have told*|must have told|can’t have told} me about the test! Now I’m not ready.',
  why:'Упрёк: ты не сказал, а надо было → <b>should have told</b>.',
  why2:'«Надо было сказать!» — should have + V3.'},
 {lvl:1, text:'Tom got full marks. He {must have studied*|can’t have studied|shouldn’t have studied} a lot.',
  why:'Доказательство — высшая оценка → «наверняка много занимался»: <b>must have studied</b>.',
  why2:'Уверенная догадка о прошлом → must have.'},
 {lvl:1, text:'We missed the bus. We {should have left*|must have left|can’t have left} home earlier.',
  why:'Сожаление: не вышли раньше, а надо было → <b>should have left</b>.',
  why2:'«Надо было выйти раньше» — should have + V3 (leave → left → left).'},
 {lvl:1, q:'Что значит: <i>You should have called me.</i>', opts:['Тебе надо было мне позвонить (а ты не позвонил)','Ты, наверное, мне звонил','Ты не мог мне позвонить'], ans:0,
  why:'should have + V3 = «надо было», но человек этого <b>не сделал</b>.',
  why2:'Упрёк о прошлом.', sayAfter:'You should have called me.'},
 {type:'listen', lvl:1, say:'She must have missed the bus.', q:'Послушай. Что думает говорящий?', opts:['Он почти уверен, что она опоздала на автобус','Он считает, что ей надо было опоздать','Он уверен, что она не опоздала'], ans:0,
  why:'<b>must have missed</b> — уверенная догадка: «она, должно быть, опоздала на автобус».',
  why2:'must have = «наверняка». В речи: «мастэв».'},
 {type:'read', lvl:1, text:'You should have told me earlier.', q:'Прочитай вслух',
  why:`${s('should have')} читай слитно: ${tr('ˈʃʊdəv')}. ${s('told me')} — d и m сливаются. ${s('earlier')} — r не читается.`,
  why2:'Ударные: TOLD, EARLIER. Голос понижается в конце — это упрёк.'},
 {lvl:2, text:'Ann {can’t have seen*|must have seen|should have seen} me at the cinema yesterday: she was at home with a cold.',
  why:'Алиби — Энн была дома → «не может быть, чтобы она меня видела»: <b>can’t have seen</b>.',
  why2:'Доказательство «нет» → can’t have + V3.'},
 {lvl:2, text:'The window is broken, but Jack {can’t have broken*|must have broken|should have broken} it: he was at school all day.',
  why:'Джек весь день был в школе → он не мог разбить: <b>can’t have broken</b>.',
  why2:'Алиби → can’t have.'},
 {lvl:2, text:'Kate looks very happy. She {must have passed*|can’t have passed|shouldn’t have passed} her exam.',
  why:'Улика — она счастлива → «наверняка сдала»: <b>must have passed</b>.',
  why2:'Уверенный вывод → must have + V3.'},
 {lvl:2, text:'The streets {are*|is@en.s.to_be} wet. It {must have rained*|can’t have rained|should have rained} in the night.',
  why:'1) streets — много → <b>are</b>. 2) Мокрые улицы — улика → <b>must have rained</b>.',
  why2:'1) they are. 2) Догадка по признакам → must have.'},
 {lvl:2, text:'Jane {can’t have written*|must have written|should have written} this letter: she {doesn’t*|don’t|isn’t@en.5.ps} speak German.',
  why:'1) Она не знает немецкого → не могла написать: <b>can’t have written</b>. 2) Jane = she → <b>doesn’t</b> speak.',
  why2:'1) Доказательство «нет» → can’t have. 2) she doesn’t, they don’t.'},
 {lvl:2, text:'I {should have bought*|must have bought|can’t have bought} {some*|any@en.5.some_any} bread yesterday — now there is nothing for breakfast.',
  why:'1) Не купил, а надо было → <b>should have bought</b>. 2) Утвердительное предложение → <b>some</b>.',
  why2:'1) Сожаление — should have. 2) some — в утверждении, any — в вопросах и отрицаниях.'},
 {lvl:2, text:'Somebody {has eaten*|have eaten@en.7.pres_perf} my sandwich! It {must have been*|can’t have been|should have been} the dog: look at its happy face!',
  why:'1) somebody — единственное число → <b>has eaten</b>. 2) Улика — довольная морда собаки → <b>must have been</b>.',
  why2:'1) somebody has, everybody has. 2) «Наверняка это была собака».'},
 {type:'listen', lvl:2, say:'You should have asked me.', q:'Послушай. Что прозвучало?', opts:['You should have asked me.','You should ask me.','You shouldn’t have asked me.'], ans:0,
  why:'Ты слышал короткое «шудэв» и asked с [t] на конце — это <b>should have asked</b>: «надо было спросить меня».',
  why2:'Отрицания shouldn’t не было — нет звука [nt]. А «have» звучит как [əv].'},
 {type:'spell', lvl:2, say:'should have', ans:['should have'], q:'Послушай и напиши два слова (в речи have звучит как [əv])',
  why:'Пишем <b>should have</b>. Ошибка «should of» появляется из-за того, что have звучит слабо [əv].',
  why2:'После модальных всегда have, никогда не of.'},
 {lvl:3, text:'I saw you eat all the sweets! You {shouldn’t have eaten*|can’t have eaten|must have eaten} so many.',
  why:'Я видел, что ты съел → это не догадка, а упрёк: «не надо было» → <b>shouldn’t have eaten</b>.',
  why2:'Когда точно знаешь, что человек сделал, и это плохо → shouldn’t have.'},
 {lvl:3, text:'That {can’t have been*|must have been|should have been} Mike in the street: he is on holiday in Spain.',
  why:'Майк в Испании → это не мог быть он: <b>can’t have been</b>.',
  why2:'Алиби → can’t have.'},
 {lvl:3, text:'The lights are off and nobody answers the door. They {must have gone*|can’t have gone|should have gone} out.',
  why:'Улики: темно и никто не открывает → «наверняка ушли»: <b>must have gone</b>.',
  why2:'Уверенный вывод → must have + V3 (go → went → gone).'},
 {lvl:3, text:'I heard you! You {shouldn’t have shouted*|can’t have shouted|must have shouted} at {her*|she@en.5.pronouns}: she was only trying to help.',
  why:'1) Я слышал → это не догадка, а упрёк: <b>shouldn’t have shouted</b>. 2) После предлога at — объектное местоимение <b>her</b>.',
  why2:'1) «Не надо было кричать». 2) at her, with him, for them.'},
 {lvl:3, text:'Mark won the race? He {can’t have won*|must have won|should have won} it: he {broke*|breaked|broken@en.6.past_irreg} his leg last month!',
  why:'1) Со сломанной ногой нельзя выиграть → <b>can’t have won</b>. 2) break — неправильный: break → <b>broke</b> → broken; last month → Past Simple: broke.',
  why2:'1) «Не может быть, чтобы он выиграл». 2) broken — это V3, без have не употребляется.'},
 {type:'read', lvl:2, text:'She must have forgotten about it.', q:'Прочитай вслух',
  why:`${s('must have')} — слитно и слабо: ${tr('ˈmʌstəv')}. ${s('forgotten')} — ударение на GOT. ${s('about it')} — свяжи: «эбаутит».`,
  why2:'Ударные: MUST, FORGOTTEN. В forgotten две t, читается одна.'},
 {type:'read', lvl:3, text:'He can’t have seen us. He was in another city.', q:'Прочитай вслух',
  why:`${s('can’t')} ${tr('kɑːnt')} — в британском долгий [ɑː]: «кант». ${s('seen us')} — свяжи: «сиинас». ${s('another')} — ударение на NO, th звонкий.`,
  why2:'Сделай паузу на точке. Ударные: CAN’T, SEEN, ANOTHER, CITY.'}
]});

/* ================= 7. Linking words ================= */
RU.rule({
id:'en.9.linking',
short:'<b>although</b> + предложение (хотя…), <b>despite</b> + существительное или -ing (несмотря на…), <b>however</b> — в начале нового предложения с запятой (однако), <b>unless</b> = if … not (если не).',
theory:`
<p>Слова-связки соединяют мысли. В ОГЭ и в сочинениях они очень нужны.</p>
<table class="sym">
<tr><th>Слово</th><th>Значение</th><th>Что после него</th><th>Пример</th></tr>
<tr><td><b>although / though</b></td><td>хотя</td><td>целое предложение (кто + что делает)</td><td>${s('Although it was raining, we went out.')}</td></tr>
<tr><td><b>despite / in spite of</b></td><td>несмотря на</td><td>существительное или -ing</td><td>${s('Despite the rain, we went out.')}<br>${s('She went to school despite feeling ill.')}</td></tr>
<tr><td><b>however</b></td><td>однако</td><td>новое предложение, после however — запятая</td><td>${s('The film was long. However, it was interesting.')}</td></tr>
<tr><td><b>unless</b></td><td>если не</td><td>предложение в Present Simple (без will)</td><td>${s('You won’t pass unless you work harder.')}</td></tr>
</table>
<div class="box tip"><b>Как запомнить</b><b>Although</b> любит целое предложение (there’s a verb!).<br><b>Despite</b> любит одно слово-предмет: despite <b>the rain</b>, despite <b>his age</b>, despite <b>being</b> tired.<br><b>Unless</b> = if not, поэтому после unless <b>not</b> не нужно: ${s('unless it rains')} = if it doesn’t rain.</div>
<div class="box err"><b>Типичные ошибки</b>
❌ <i>Despite it was raining…</i> ✅ ${s('Although it was raining…')} или ${s('Despite the rain…')}<br>
❌ <i>Despite of the rain</i> — of только в <b>in spite of</b>.<br>
❌ <i>It was cold, however we went out.</i> — however начинает новое предложение: ${s('It was cold. However, we went out.')} Внутри одного предложения — <b>but</b>.<br>
❌ <i>unless you will work</i> ✅ ${s('unless you work')}</div>`,
theory2:`
<p>Переведи на «русскую логику»:</p>
<ul>
<li><b>although</b> = «хотя» + целая мысль: «хотя <b>шёл дождь</b>»</li>
<li><b>despite</b> = «несмотря на» + предмет: «несмотря на <b>дождь</b>»</li>
<li><b>however</b> = «однако,» — точка перед ним, запятая после</li>
<li><b>unless</b> = «если не»</li>
</ul>
<p>${s('Although he was tired, he finished his homework.')}<br>${s('Despite the cold, the children played outside.')}<br>${s('We will play tennis unless it rains.')}</p>`,
items:[
 {lvl:1, text:'{Although*|Despite|However} it was raining, we went for a walk.',
  why:'После пропуска целое предложение (it was raining) → <b>Although</b> (хотя). Despite + предложение — ошибка, however так не употребляется.',
  why2:'«Хотя шёл дождь, мы пошли гулять». Кто + глагол → although.'},
 {lvl:1, text:'{Despite*|Although|Unless} the rain, we went for a walk.',
  why:'После пропуска только существительное (the rain) → <b>Despite</b> (несмотря на).',
  why2:'«Несмотря на дождь». Although требует целого предложения: although it was raining.'},
 {lvl:1, text:'The film was long. {However*|Although|Despite}, it was very interesting.',
  why:'Новое предложение, в начале «Однако,» с запятой → <b>However</b>.',
  why2:'However, … = Однако, … Ставится после точки.'},
 {lvl:1, text:'We will go to the beach tomorrow {unless*|although|despite} it rains.',
  why:'Смысл: пойдём, <b>если не</b> будет дождя → <b>unless</b>.',
  why2:'unless = if not: unless it rains = if it doesn’t rain.'},
 {lvl:1, q:'Что значит <b>unless</b>?', opts:['если не','потому что','хотя'], ans:0,
  why:'unless = if … not = «если не».',
  why2:'I’ll come unless I’m busy — Приду, если не буду занят.', sayAfter:'I will come unless I am busy.'},
 {type:'listen', lvl:1, say:'Although he was tired, he finished his homework.', q:'Послушай. Он закончил домашнее задание?', opts:['Да, хотя и устал','Нет, потому что устал'], ans:0,
  why:'<b>Although</b> = хотя. «Хотя он устал, он закончил домашнее задание».',
  why2:'Although показывает противоречие: устал, но всё равно сделал.'},
 {type:'read', lvl:1, text:'Although it was cold, we went swimming.', q:'Прочитай вслух',
  why:`${s('although')} ${tr('ɔːlˈðəʊ')} — ударение на второй слог: al-THOUGH, th звонкий, gh не читается. ${s('swimming')} — на конце [ŋ], без «г».`,
  why2:'Пауза на запятой после cold. Ударные: THOUGH, COLD, WENT, SWIMMING.'},
 {lvl:2, text:'She went to school {despite*|although|unless} feeling ill.',
  why:'После пропуска -ing форма (feeling) → <b>despite</b>.',
  why2:'despite + -ing: despite feeling ill, despite being tired.'},
 {lvl:2, text:'{In spite of*|Although|However} his age, my grandfather runs every morning.',
  why:'После пропуска существительное (his age) → <b>In spite of</b> (= despite).',
  why2:'«Несмотря на свой возраст». In spite of = despite, только с of.'},
 {lvl:2, text:'I like this phone. {However*|Although|Unless}, it is too expensive for me.',
  why:'Новое предложение, «Однако,» → <b>However</b>.',
  why2:'Точка + However + запятая.'},
 {lvl:2, text:'He was tired, {but*|however|despite} he finished his homework.',
  why:'Внутри одного предложения после запятой → <b>but</b>. However так не соединяет два предложения, а despite не ставят перед целым предложением.',
  why2:'Если перед словом запятая и дальше целое предложение — but.'},
 {lvl:2, text:'{Although*|Despite|However} my brother {is*|are@en.s.to_be} younger than me, he is taller.',
  why:'1) Дальше целое предложение → <b>Although</b>. 2) my brother = he → <b>is</b>.',
  why2:'1) Хотя + кто + что. 2) he is, they are.'},
 {lvl:2, text:'{Despite*|Although|Unless} the cold weather, the {children*|childs|childrens@en.s.plurals} played outside.',
  why:'1) Дальше существительное (the cold weather) → <b>Despite</b>. 2) child → <b>children</b> (исключение).',
  why2:'1) despite + предмет. 2) Ни childs, ни childrens не бывает.'},
 {lvl:2, text:'It was {the most*|the more|most@en.6.comparatives} expensive hotel in the town. {However*|Although|Despite}, the rooms were small.',
  why:'1) Длинное прилагательное expensive, «самый … в городе» → <b>the most</b> expensive. 2) Новое предложение «Однако,» → <b>However</b>.',
  why2:'1) the most + длинное слово. 2) However, — после точки.'},
 {type:'listen', lvl:2, say:'We will play tennis unless it rains.', q:'Послушай. Когда они НЕ будут играть в теннис?', opts:['Если пойдёт дождь','Если не будет дождя','Будут играть в любом случае'], ans:0,
  why:'<b>unless it rains</b> = если не пойдёт дождь. Значит, если дождь пойдёт — играть не будут.',
  why2:'unless = if not. Игра будет, только если нет дождя.'},
 {type:'spell', lvl:2, say:'although', ans:['although'], q:'Послушай и напиши слово (хотя)',
  why:'<b>although</b> — одна l, в конце ough (gh не читается).',
  why2:'al + though. Не «allthough» — только одна l.'},
 {lvl:3, text:'{Although*|Despite|In spite of} he had a cold, he played in the match.',
  why:'Дальше целое предложение (he had a cold) → только <b>Although</b>. Despite и in spite of нельзя ставить перед подлежащим с глаголом.',
  why2:'Проверка: есть «кто + глагол» (he had)? → although.'},
 {lvl:3, text:'Despite {being*|she was|be} tired, she went to the party.',
  why:'После despite — -ing форма: <b>being</b> tired.',
  why2:'despite + -ing. Despite she was — ошибка.'},
 {lvl:3, text:'I’m very busy today, so don’t call me {unless*|although|despite} it is really important.',
  why:'«Не звони, <b>если не</b> очень важно» → <b>unless</b>.',
  why2:'unless = если не.'},
 {lvl:3, text:'I’ll ring you tonight {unless*|although|despite} I {am*|will be@en.7.cond_01} too busy.',
  why:'1) «Позвоню, если не буду слишком занят» → <b>unless</b>. 2) После unless (как после if) — Present Simple, без will: <b>am</b>.',
  why2:'1) unless = if not. 2) В условной части will не ставим.'},
 {lvl:3, text:'He {didn’t*|doesn’t|wasn’t@en.6.past_neg_q} go to the party last Saturday {although*|despite|however} he was invited.',
  why:'1) last Saturday → Past Simple, отрицание: <b>didn’t</b> go. 2) Дальше целое предложение (he was invited) → <b>although</b>.',
  why2:'1) didn’t + глагол. 2) хотя + кто + глагол.'},
 {lvl:3, text:'You {mustn’t*|don’t have to@en.6.must_have_to} use your phone in class {unless*|although|despite} the teacher allows it.',
  why:'1) Это запрет → <b>mustn’t</b> (don’t have to = «не обязательно», смысл другой). 2) «Если учитель не разрешит» → <b>unless</b>.',
  why2:'1) mustn’t = нельзя. 2) unless = если не.'},
 {type:'read', lvl:2, text:'Despite the rain, the match continued.', q:'Прочитай вслух',
  why:`${s('despite')} — ударение на второй слог: de-SPITE. ${s('continued')} ${tr('kənˈtɪnjuːd')} — ударение на TIN, -ed звучит как /d/.`,
  why2:'Пауза на запятой. «the match» — th звонкий, a — [æ].'},
 {type:'read', lvl:3, text:'We will be late unless we hurry.', q:'Прочитай вслух',
  why:`${s('unless')} — ударение на второй слог: un-LESS ${tr('ənˈles')}. ${s('hurry')} ${tr('ˈhʌri')} — звук [ʌ], как короткое «а».`,
  why2:'Не делай паузу перед unless — это одна мысль. Ударные: LATE, UNLESS, HURRY.'}
]});

/* ================= 8. Word formation (OGE) ================= */
RU.rule({
id:'en.9.word_form',
short:'В ОГЭ дано слово (DANGER) — нужно образовать форму, которая подходит по смыслу: прилагательное (dangerous), наречие (easily), существительное (difference), отрицание (impossible). Сначала реши, <b>какая часть речи</b> нужна в пропуске.',
theory:`
<p>В задании ОГЭ рядом с пропуском стоит слово большими буквами. Его нужно <b>изменить</b>, чтобы оно подошло в предложение.</p>
<ol class="steps">
<li>Посмотри <b>вокруг пропуска</b>: что нужно — кто/что (существительное), какой (прилагательное) или как (наречие)?</li>
<li>Проверь смысл: может, нужно <b>отрицание</b> (un-, im-, ir-, il-, dis-)?</li>
<li>Для существительного проверь: нужен <b>человек</b> (-er, -ist, -ian) или <b>явление</b> (-tion, -ness, -ence, -ity)?</li>
</ol>
<table class="sym">
<tr><th>Нужно</th><th>Суффиксы</th><th>Примеры</th></tr>
<tr><td>прилагательное (какой?)</td><td>-ous, -al, -ive, -able, -ful, -ic</td><td>${s('famous')}, ${s('national')}, ${s('active')}, ${s('comfortable')}, ${s('successful')}, ${s('scientific')}</td></tr>
<tr><td>наречие (как?)</td><td>-ly</td><td>${s('easily')}, ${s('clearly')}, ${s('unfortunately')}</td></tr>
<tr><td>существительное-явление</td><td>-ence/-ance, -ity, -tion, -ment, -ness</td><td>${s('difference')}, ${s('popularity')}, ${s('invention')}</td></tr>
<tr><td>существительное-человек</td><td>-ist, -ian, -er/-or</td><td>${s('scientist')}, ${s('musician')}, ${s('visitor')}</td></tr>
<tr><td>«не-»</td><td>un-, im- (перед p, m), ir- (перед r), il- (перед l), in-, dis-</td><td>${s('unusual')}, ${s('impossible')}, ${s('irregular')}, ${s('illegal')}, ${s('dislike')}</td></tr>
</table>
<div class="box tip"><b>Подсказки по месту в предложении</b>
a / the / my + <b>___</b> + существительное → прилагательное: a <b>famous</b> city.<br>
a / the + <b>___</b> + of / в конце → существительное: the <b>difference</b> between…<br>
глагол + <b>___</b> → наречие: He solved it <b>easily</b>.<br>
is / was / looks / smells + <b>___</b> → прилагательное: It looks <b>dangerous</b>.</div>
<div class="box err"><b>Типичные ошибки</b>
Орфография: easy → eas<b>i</b>ly (y → i), success → succe<b>ss</b>ful (одна l в конце), comfort → comfort<b>able</b>.<br>
❌ <i>unpossible</i> ✅ ${s('impossible')} &nbsp; ❌ <i>unregular</i> ✅ ${s('irregular')} &nbsp; ❌ <i>unlegal</i> ✅ ${s('illegal')}</div>`,
theory2:`
<p>Представь, что слово — это <b>конструктор</b>: корень + деталь в начале (приставка) + деталь в конце (суффикс).</p>
<p>${s('danger')} (опасность) + ous → ${s('dangerous')} (опасный)<br>
${s('easy')} (лёгкий) + ly → ${s('easily')} (легко)<br>
${s('science')} (наука) → ${s('scientist')} (учёный)<br>
${s('possible')} (возможный) + im → ${s('impossible')} (невозможный)</p>
<p>Задай вопрос к пропуску по-русски: «<b>какой?</b>» — прилагательное, «<b>как?</b>» — наречие, «<b>кто? что?</b>» — существительное.</p>`,
items:[
 {lvl:1, q:'Образуй от слова <b>DANGER</b> форму, которая подходит по смыслу.', text:'Swimming in this river is {dangerous*|danger|dangerously}.',
  why:'После is нужен признак «какой?» → прилагательное: danger + ous = <b>dangerous</b>.',
  why2:'«Плавать в этой реке <b>опасно</b>» — is + прилагательное.'},
 {lvl:1, q:'Образуй форму от слова <b>FAME</b>.', text:'Tchaikovsky is a {famous*|fame|famously} Russian composer.',
  why:'a ___ composer — перед существительным нужно прилагательное: <b>famous</b> (e уходит: fame → famous).',
  why2:'«Какой композитор? — Знаменитый». Прилагательное на -ous.'},
 {lvl:1, q:'Образуй форму от слова <b>NATION</b>.', text:'The {national*|nation|nationally} flag of Russia is white, blue and red.',
  why:'the ___ flag — нужно прилагательное: nation + al = <b>national</b>.',
  why2:'«Какой флаг? — Национальный». -al = прилагательное.'},
 {lvl:1, q:'Образуй форму от слова <b>EASY</b>.', text:'He solved the problem {easily*|easy|easiness}.',
  why:'solved (как?) → наречие: easy → eas<b>i</b>ly (y меняется на i).',
  why2:'Глагол + наречие: решил легко → easily.'},
 {lvl:1, q:'Образуй форму от слова <b>SCIENCE</b>.', text:'My uncle is a {scientist*|science|scientific}: he works in a laboratory.',
  why:'a ___ — нужен человек (кто?) → <b>scientist</b> (учёный). Scientific — прилагательное «научный».',
  why2:'-ist = человек: scientist, artist, tourist.'},
 {lvl:1, q:'Какой суффикс превращает <b>DANGER</b> в прилагательное «опасный»?', opts:['-ous','-ful','-ly'], ans:0,
  why:'danger + <b>-ous</b> = dangerous. Так же: fame → famous.',
  why2:'-ly делает наречия, а «dangerful» не существует.', sayAfter:'dangerous'},
 {type:'listen', lvl:1, say:'irregular', q:'Послушай. Какую приставку ты слышишь?', opts:['ir-','un-','in-'], ans:0,
  why:'<b>ir</b>regular — перед буквой r приставка «не-» превращается в ir-. Звучит [ɪˈreɡjələ].',
  why2:'regular → irregular, responsible → irresponsible.'},
 {type:'read', lvl:1, text:'Swimming in this river is dangerous.', q:'Прочитай вслух',
  why:`${s('dangerous')} ${tr('ˈdeɪndʒərəs')} — ударение на DAN, первая a читается [eɪ], окончание -ous — слабое [əs]. ${s('river')} — короткий [ɪ].`,
  why2:'В swimming двойная m, на конце [ŋ]. Ударные: SWIMMING, RIVER, DANGEROUS.'},
 {lvl:2, q:'Образуй форму от слова <b>DIFFERENT</b>.', text:'What is the {difference*|different|differently} between these two words?',
  why:'the ___ between — нужно существительное «разница»: different → <b>difference</b> (-ent → -ence).',
  why2:'После the — существительное. -ence = явление.'},
 {lvl:2, q:'Образуй форму от слова <b>POSSIBLE</b>.', text:'It is {impossible*|unpossible|inpossible} to learn a language in a week.',
  why:'По смыслу «невозможно». Перед p приставка <b>im-</b>: <b>impossible</b>.',
  why2:'im- перед p и m: impossible, impolite, immature.'},
 {lvl:2, q:'Образуй форму от слова <b>MUSIC</b>.', text:'He wants to become a professional {musician*|musical|musicer}.',
  why:'a professional ___ — человек → <b>musician</b> (-ian).',
  why2:'music → musician, magic → magician.'},
 {lvl:2, q:'Образуй форму от слова <b>COMFORT</b>.', text:'This sofa is very {comfortable*|comfort|comfortably}.',
  why:'is very ___ → прилагательное: comfort + able = <b>comfortable</b>.',
  why2:'«Диван очень удобный» — какой? → -able.'},
 {lvl:2, q:'Образуй форму от слова <b>ACT</b>.', text:'My grandmother is very {active*|act|action} for her age.',
  why:'is very ___ → прилагательное: act + ive = <b>active</b>.',
  why2:'-ive = прилагательное: active, creative, attractive.'},
 {lvl:2, q:'Образуй формы слов: 1) <b>MY</b>, 2) <b>FAME</b>.', text:'{My*|Me@en.p.possessive} grandfather was a {famous*|fame|famously} doctor.',
  why:'1) «Мой дедушка» → притяжательное <b>my</b>. 2) a ___ doctor → прилагательное <b>famous</b>.',
  why2:'1) my + существительное. 2) какой врач? — знаменитый.'},
 {lvl:2, q:'Вставь: 1) форму глагола BE, 2) форму от слова <b>DANGER</b>.', text:'There {are*|is@en.p.there_is} many {dangerous*|danger|dangerously} animals in the jungle.',
  why:'1) many animals — много → <b>there are</b>. 2) ___ animals → прилагательное <b>dangerous</b>.',
  why2:'1) there are + множественное. 2) какие животные? — опасные.'},
 {lvl:2, q:'Вставь: 1) правильный порядок слов, 2) форму от слова <b>CLEAR</b>.', text:'Our teacher {always explains*|explains always@en.5.adv_freq} the rules very {clearly*|clear|clearness}.',
  why:'1) Наречие частоты стоит <b>перед</b> смысловым глаголом: <b>always explains</b>. 2) explains (как?) → наречие <b>clearly</b>.',
  why2:'1) always, usually, often — перед глаголом. 2) clear + ly.'},
 {lvl:2, q:'Вставь: 1) this или these, 2) форму от слова <b>USE</b>.', text:'{This*|These@en.s.this_that} information is very {useful*|use|usefully}.',
  why:'1) information — неисчисляемое, всегда единственное число → <b>This</b>. 2) is very ___ → прилагательное <b>useful</b>.',
  why2:'1) this information (не these!). 2) use + ful = полезный.'},
 {type:'listen', lvl:2, say:'popularity', q:'Послушай. На какой слог падает ударение?', opts:['POP-u-lar-i-ty','pop-u-LAR-i-ty','pop-u-lar-I-ty'], ans:1,
  why:'В словах на <b>-ity</b> ударение падает на слог перед -ity: pop-u-<b>LAR</b>-i-ty. Сравни: <b>POP</b>ular.',
  why2:'Суффикс -ity «перетягивает» ударение: popular → popularity, active → activity.'},
 {type:'spell', lvl:2, say:'successful', ans:['successful'], q:'Послушай и напиши слово',
  why:'<b>successful</b>: su-<b>cc</b>-e-<b>ss</b>-ful — две c, две s, и одна l в конце.',
  why2:'success + ful. Суффикс -ful всегда с одной l.'},
 {type:'spell', lvl:3, say:'unfortunately', ans:['unfortunately'], q:'Послушай и напиши слово',
  why:'<b>un + fortunate + ly</b>: e перед -ly сохраняется → unfortunate<b>ly</b>.',
  why2:'Собери как конструктор: un-fortunate-ly.'},
 {lvl:3, q:'Образуй форму от слова <b>FORTUNATE</b>.', text:'{Unfortunately*|Fortunately|Unfortunate}, we missed the last bus and had to walk home.',
  why:'Плохое событие (опоздали, шли пешком) + запятая в начале → наречие с отрицанием: <b>Unfortunately</b> (к сожалению).',
  why2:'un + fortunate + ly. Unfortunate — прилагательное, оно не стоит отдельно перед запятой.'},
 {lvl:3, q:'Образуй форму от слова <b>REGULAR</b>.', text:'“Go” is an {irregular*|unregular|inregular} verb.',
  why:'Перед r приставка «не-» — <b>ir-</b>: <b>irregular</b>.',
  why2:'ir- перед r: irregular, irresponsible.'},
 {lvl:3, q:'Образуй форму от слова <b>LEGAL</b>.', text:'It is {illegal*|unlegal|inlegal} to drive a car without a licence.',
  why:'Перед l приставка «не-» — <b>il-</b>: <b>illegal</b> (две l).',
  why2:'il- перед l: illegal, illogical.'},
 {lvl:3, q:'Образуй форму от слова <b>POPULAR</b>.', text:'The {popularity*|popular|popularly} of online games is growing.',
  why:'The ___ of → существительное: popular + ity = <b>popularity</b>.',
  why2:'the + ___ + of = существительное. -ity = явление.'},
 {lvl:3, q:'Вставь: 1) форму глагола BE, 2) форму от слова <b>BELIEVE</b>.', text:'It {was*|were@en.p.was_were} {unbelievably*|unbelievable|believable} hot yesterday.',
  why:'1) it + прошлое → <b>was</b>. 2) Перед прилагательным hot нужно наречие «невероятно» → <b>unbelievably</b>.',
  why2:'1) it was, they were. 2) Прилагательное усиливают наречием: very hot, unbelievably hot.'},
 {lvl:3, q:'Вставь: 1) форму глагола HAVE, 2) a или an, 3) форму от слова <b>USUAL</b>.', text:'He {has*|have@en.5.ps} {an*|a@en.s.a_an} {unusual*|usual|unusually} name, so everybody remembers it.',
  why:'1) he → <b>has</b>. 2) Слово unusual начинается с гласного звука [ʌ] → <b>an</b>. 3) «Его все запоминают» → имя необычное: <b>unusual</b>.',
  why2:'1) he has. 2) an + гласный звук. 3) un + usual = необычный.'},
 {lvl:3, q:'Вставь: 1) форму от слова <b>INVENT</b>, 2) форму глагола CHANGE.', text:'The {invention*|invent|inventive} of the telephone {changed*|changes|will change@en.6.past_reg} people’s lives in the nineteenth century.',
  why:'1) The ___ of → существительное: invent + ion = <b>invention</b>. 2) in the nineteenth century — прошлое → <b>changed</b>.',
  why2:'1) the + существительное + of. 2) Past Simple правильного глагола: change + d.'},
 {type:'read', lvl:2, text:'The view from the mountain was unbelievable.', q:'Прочитай вслух',
  why:`${s('unbelievable')} ${tr('ˌʌnbɪˈliːvəbl')} — ударение на LIEV, долгий [iː]. ${s('mountain')} ${tr('ˈmaʊntən')} — ударение на первый слог, вторая часть слабая.`,
  why2:'«view» — [vjuː], губа к зубам для v. Ударные: VIEW, MOUNTAIN, UNBELIEVABLE.'},
 {type:'read', lvl:3, text:'Unfortunately, the museum was closed, so we went to the park.', q:'Прочитай вслух',
  why:`${s('unfortunately')} ${tr('ʌnˈfɔːtʃənətli')} — ударение на FOR, -tu- звучит как «ч». ${s('museum')} — mu-SE-um ${tr('mjuˈziːəm')}. ${s('closed')} — -ed звучит как /d/.`,
  why2:'Пауза после Unfortunately и после closed (запятые). В park r не читается.'}
]});

/* ================= 9. Phrasal verbs ================= */
RU.rule({
id:'en.9.phrasal',
short:'Фразовый глагол = глагол + маленькое слово, и смысл меняется: <i>look after</i> — присматривать, <i>look for</i> — искать, <i>give up</i> — бросить, <i>get up</i> — вставать, <i>find out</i> — узнать. Местоимение — в середину: <i>turn it off</i>.',
theory:`
<p>Фразовый глагол — это как русские приставки: «смотреть» → «<b>при</b>сматривать», «<b>вы</b>смотреть». В английском маленькое слово ставится <b>после</b> глагола.</p>
<table class="sym">
<tr><th>Фразовый глагол</th><th>Значение</th><th>Пример</th></tr>
<tr><td>${s('look after')}</td><td>присматривать, заботиться</td><td>${s('Can you look after my cat?')}</td></tr>
<tr><td>${s('look for')}</td><td>искать</td><td>${s('I am looking for my keys.')}</td></tr>
<tr><td>${s('give up')}</td><td>бросить (привычку), сдаться</td><td>${s('My dad gave up smoking.')} ${s('Don’t give up!')}</td></tr>
<tr><td>${s('get up')}</td><td>вставать (с кровати)</td><td>${s('I get up at seven.')}</td></tr>
<tr><td>${s('take off')}</td><td>взлетать (о самолёте)</td><td>${s('The plane took off on time.')}</td></tr>
<tr><td>${s('put on')}</td><td>надевать</td><td>${s('Put on your coat.')}</td></tr>
<tr><td>${s('turn on')} / ${s('turn off')}</td><td>включать / выключать</td><td>${s('Turn off the light, please.')}</td></tr>
<tr><td>${s('find out')}</td><td>узнать, выяснить</td><td>${s('I found out the truth.')}</td></tr>
<tr><td>${s('run out of')}</td><td>закончиться (у нас), израсходовать</td><td>${s('We have run out of milk.')}</td></tr>
</table>
<div class="box rule"><b>Где стоит местоимение (it, them, him)</b>Если предмет — местоимение, оно встаёт <b>между</b> глаголом и маленьким словом:<br>
${s('Turn off the TV.')} = ${s('Turn the TV off.')} → но только ${s('Turn it off.')}<br>
❌ <i>Turn off it.</i> ❌ <i>Put on it.</i> ✅ ${s('Put it on.')}<br>
С look after, look for, run out of так нельзя: ${s('look after him')}, ${s('look for them')}.</div>
<div class="box err"><b>Типичные ошибки</b>
❌ <i>We have run out milk.</i> — не забывай <b>of</b>: ${s('run out of milk')}.<br>
❌ Путать look for (искать) и look after (присматривать).<br>
Глагол меняется как обычно: give → <b>gave</b> up, take → <b>took</b> off, run → <b>ran</b> out of, find → <b>found</b> out, get → <b>got</b> up.</div>`,
theory2:`
<p>Запомни картинками:</p>
<ul>
<li><b>up</b> — вверх: ${s('get up')} — встать с кровати; ${s('give up')} — «поднять руки», сдаться.</li>
<li><b>off</b> — прочь, отрыв: ${s('take off')} — самолёт отрывается от земли; ${s('turn off')} — выключить.</li>
<li><b>on</b> — на, включено: ${s('put on')} — надеть на себя; ${s('turn on')} — включить.</li>
<li><b>out</b> — наружу: ${s('find out')} — «вытащить» правду; ${s('run out of')} — всё «вытекло», закончилось.</li>
<li><b>after</b> — «ходить следом»: ${s('look after')} — присматривать. <b>for</b> — «для поиска»: ${s('look for')} — искать.</li>
</ul>`,
items:[
 {lvl:1, text:'Can you {look after*|look for|look at} my cat while I am on holiday?',
  why:'Пока я в отпуске, кто-то должен <b>присматривать</b> за кошкой → <b>look after</b>.',
  why2:'look after = заботиться, присматривать. Look for — искать (кошка не потерялась).'},
 {lvl:1, text:'It’s cold outside. {Put on*|Give up|Find out} your coat.',
  why:'Холодно → пальто надо <b>надеть</b>: <b>Put on</b>.',
  why2:'put on = надевать (на себя одежду).'},
 {lvl:1, text:'I usually {get up*|give up|look after} at seven on school days.',
  why:'«Встаю в семь» → <b>get up</b>.',
  why2:'get up = вставать с кровати.'},
 {lvl:1, text:'It’s dark in here. Can you {turn on*|turn off|give up} the light?',
  why:'Темно → свет надо <b>включить</b>: <b>turn on</b>.',
  why2:'on = включено, off = выключено.'},
 {lvl:1, text:'Our plane {took off*|got up|put on} at seven o’clock in the morning.',
  why:'Самолёт <b>взлетел</b> → take off, в прошлом: <b>took off</b>.',
  why2:'take off = взлетать. take → took.'},
 {lvl:1, q:'Как сказать: «Самолёт взлетел»?', opts:['The plane took off.','The plane got up.','The plane put on.'], ans:0,
  why:'Взлетать — <b>take off</b>; в прошлом took off.',
  why2:'got up — встал (человек с кровати), put on — надел.', sayAfter:'The plane took off.'},
 {type:'listen', lvl:1, say:'Don’t give up!', q:'Послушай. Что тебе говорят?', opts:['Не сдавайся!','Не вставай!','Не надевай!'], ans:0,
  why:'<b>give up</b> = сдаться, бросить. Don’t give up! — Не сдавайся!',
  why2:'Не вставай — было бы Don’t get up.'},
 {type:'read', lvl:1, text:'Please turn off the light.', q:'Прочитай вслух',
  why:`${s('turn off')} — свяжи: «тёр-нофф», n переходит к гласной. ${s('light')} — gh не читается: [laɪt].`,
  why2:'«turn» — [tɜːn], r не читается. Ударные: TURN, OFF, LIGHT.'},
 {lvl:2, text:'I can’t find my keys. I {am looking for*|am looking after|am giving up} them everywhere.',
  why:'Ключи потерялись → их <b>ищут</b>: <b>am looking for</b>.',
  why2:'look for = искать.'},
 {lvl:2, text:'My dad {gave up*|got up|looked after} smoking two years ago.',
  why:'Бросить привычку → <b>give up</b>; ago → прошлое: <b>gave up</b>.',
  why2:'give up + -ing = бросить делать что-то.'},
 {lvl:2, text:'We have {run out of*|run out|run off} milk. Can you buy some?',
  why:'Молоко <b>закончилось</b> → <b>run out of</b> (не забудь of!).',
  why2:'run out of + что: run out of milk, run out of time.'},
 {lvl:2, text:'I want to {find out*|look after|give up} what time the museum opens.',
  why:'Хочу <b>узнать</b>, во сколько открывается музей → <b>find out</b>.',
  why2:'find out = узнать, выяснить.'},
 {lvl:2, text:'The TV is too loud. Please turn {it off*|off it}.',
  why:'Местоимение <b>it</b> встаёт между глаголом и off: <b>turn it off</b>. Turn off it — ошибка.',
  why2:'Правило: turn + it + off, put + it + on.'},
 {lvl:2, text:'My grandmother {looks after*|looks for|gives up} my little brother when my parents {are*|is@en.s.to_be} at work.',
  why:'1) Бабушка <b>присматривает</b> за братом → <b>looks after</b>. 2) my parents = they → <b>are</b>.',
  why2:'1) look after = заботиться. 2) they are.'},
 {lvl:2, text:'Yesterday I {got up*|gave up|put on} late and {missed*|misses|missing@en.6.past_reg} the bus.',
  why:'1) Встал поздно → <b>got up</b>. 2) Yesterday → Past Simple: miss + ed = <b>missed</b>.',
  why2:'1) get → got. 2) Правильный глагол + -ed.'},
 {lvl:2, text:'We have {run out of*|run out|run off} bread, and there isn’t {any*|some@en.5.some_any} milk either.',
  why:'1) Хлеб закончился → <b>run out of</b>. 2) В отрицании — <b>any</b>.',
  why2:'1) run out of + что. 2) isn’t any, aren’t any.'},
 {lvl:2, text:'{Put on*|Turn off|Give up} {your*|you@en.p.possessive} hat: it’s cold!',
  why:'1) Холодно → надень шапку: <b>Put on</b>. 2) «Твою шапку» → <b>your</b>.',
  why2:'1) put on = надеть. 2) your + существительное.'},
 {type:'listen', lvl:2, say:'We have run out of milk.', q:'Послушай. Что случилось?', opts:['Закончилось молоко','Пролили молоко','Купили молоко'], ans:0,
  why:'<b>run out of milk</b> = молоко закончилось.',
  why2:'В речи: «ран-аут-ов» — слова сливаются.'},
 {type:'spell', lvl:2, say:'look after', ans:['look after'], q:'Послушай и напиши два слова (присматривать)',
  why:'<b>look after</b> — два слова. oo в look — короткий [ʊ].',
  why2:'look + after. Не путай с look for (искать).'},
 {lvl:3, text:'This is my new jacket. I want to put {it on*|on it} now.',
  why:'Местоимение it — между put и on: <b>put it on</b>.',
  why2:'put on the jacket = put the jacket on = put it on.'},
 {lvl:3, text:'The car stopped in the middle of the road because it {ran out of*|ran out|gave up} petrol.',
  why:'Бензин закончился → <b>ran out of</b> petrol (run → ran, и обязательно of).',
  why2:'run out of + что. Без of нельзя, если дальше идёт предмет.'},
 {lvl:3, text:'Last night I {found out*|looked after|gave up} that my best friend {was*|were@en.p.was_were} moving to another city.',
  why:'1) <b>Узнал</b> новость → <b>found out</b> (find → found). 2) my best friend = he/she → <b>was</b>.',
  why2:'1) find out = узнать. 2) he was, they were.'},
 {lvl:3, text:'Who {is looking after*|is looking for|is giving up} the children at the moment? — {Their*|They’re|There@en.p.possessive} aunt is.',
  why:'1) Кто <b>присматривает</b> за детьми → <b>is looking after</b>. 2) «Их тётя» → притяжательное <b>Their</b> (They’re = they are, There = там).',
  why2:'1) look after children. 2) their = их.'},
 {lvl:3, text:'When the plane {was taking off*|was getting up|was putting on}, my little sister {started*|starts@en.7.past_s_vs_c} to cry.',
  why:'1) Самолёт <b>взлетал</b> (процесс) → <b>was taking off</b>. 2) Короткое действие на фоне процесса в прошлом → Past Simple: <b>started</b>.',
  why2:'1) take off = взлетать. 2) when + процесс (was …ing), короткое действие — Past Simple.'},
 {type:'read', lvl:2, text:'My grandmother looks after our dog.', q:'Прочитай вслух',
  why:`${s('looks after')} — свяжи: «лук-сафта», s переходит к гласной. ${s('grandmother')} — ударение на GRAND, th звонкий.`,
  why2:'В «after» r не читается: [ˈɑːftə]. Ударные: GRANDMOTHER, LOOKS, DOG.'},
 {type:'read', lvl:3, text:'The plane took off on time, so we were not late.', q:'Прочитай вслух',
  why:`${s('took off on')} — всё сливается: «ту-ко-фон». ${s('plane')} — дифтонг [eɪ]. Пауза на запятой после time.`,
  why2:'«were not» — [wɜː nɒt]. Ударные: PLANE, TOOK, OFF, TIME, LATE.'}
]});

/* ================= 10. Connected speech: linking ================= */
RU.rule({
id:'en.9.ph_linking',
short:'В живой речи англичане не делают паузы между словами: <i>look at it</i> звучит как «лу-ка-тит». Согласный «прилипает» к следующей гласной, между гласными появляются /j/ и /w/, а r на конце слова звучит перед гласной.',
theory:`
<p>Англичане говорят «цепочкой»: слова сливаются в одно длинное слово. Если научишься это слышать, станет намного легче понимать аудио в ОГЭ.</p>
<div class="box rule"><b>1. Согласный + гласный</b>Последний согласный «перепрыгивает» к следующему слову:<br>
${s('look at')} → «лу-кат», ${s('turn it off')} → «тёр-ни-тофф», ${s('an apple')} → «э-нэпл», ${s('pick it up')} → «пи-ки-тап».</div>
<div class="box rule"><b>2. Связующий r</b>В британском английском r на конце слова не читается: ${s('far')} ${tr('fɑː')}. Но если следующее слово начинается с гласной — r <b>звучит</b>:<br>
${s('far away')} ${tr('fɑːr əˈweɪ')}, ${s('there is')}, ${s('more and more')}, ${s('four eggs')}.</div>
<div class="box rule"><b>3. Гласный + гласный: появляются /j/ и /w/</b>
После [iː], [ɪ], [aɪ], [eɪ] — лёгкий звук [j] («й»): ${s('I agree')} → «ай-йэгри», ${s('see it')}, ${s('she is')}.<br>
После [uː], [əʊ], [aʊ] — лёгкий [w]: ${s('go out')} → «гоу-ваут», ${s('do it')}, ${s('how are you')}.</div>
<div class="box rule"><b>4. Одинаковые согласные</b>Произносим <b>один</b> длинный звук: ${s('big girl')}, ${s('bus stop')}, ${s('black cat')}.</div>
<div class="box rule"><b>5. Выпадение t и d</b>Между двумя согласными t и d часто «теряются»: ${s('next door')} → «некс-до», ${s('last night')} → «лас-найт».</div>
<div class="box rule"><b>6. d + you, t + you</b>В быстрой речи: ${s('did you')} → «диджу», ${s('would you')} → «вуджу», ${s('don’t you')} → «доунчу».</div>
<div class="box tip"><b>Как тренироваться</b>Слушай фразу на 🐢 (медленно), потом на обычной скорости. Повторяй как одно слово.</div>`,
theory2:`
<p>Представь, что слова — это вагончики поезда 🚂. В английском вагончики сцеплены: между ними нет щелей.</p>
<p>По-русски мы тоже так говорим: «в_окно» звучит как «вакно». В английском так почти всегда:</p>
<p>${s('Come in!')} → «ка-мин!»<br>${s('Get up!')} → «ге-тап!»<br>${s('Not at all.')} → «но-тэ-тол»</p>
<p>Секрет: когда читаешь вслух, <b>не останавливайся</b> после каждого слова. Останавливайся только на запятых и точках.</p>`,
items:[
 {type:'listen', lvl:1, say:'Pick it up.', q:'Послушай. Какую фразу ты услышал? (Слова слились: «пи-ки-тап».)', opts:['Pick it up.','Pick up.','Pick a cup.'], ans:0,
  why:'Ты услышал <b>Pick it up</b>: k «прилипла» к it, t — к up: «пи-ки-тап». Три слова звучат как одно.',
  why2:'Согласный + гласный = слияние. Слушай на 🐢, чтобы различить it.'},
 {type:'listen', lvl:1, say:'Put it on.', q:'Послушай. Какую фразу ты услышал?', opts:['Put it on.','Put it in.','Put on.'], ans:0,
  why:'«пу-ти-тон» — это <b>Put it on</b> (надень это). В конце — on [ɒn], а не in [ɪn].',
  why2:'t из put перескакивает к it, t из it — к on.'},
 {q:'Какой звук «появляется» между словами в <b>go out</b>?', opts:['[w]','[j]','[r]'], ans:0, lvl:1,
  why:'После [əʊ] в go губы округлены — и появляется лёгкий <b>[w]</b>: «гоу-ваут».',
  why2:'Звуки [uː], [əʊ], [aʊ] + гласный → [w]: do it, go out, how are you.', sayAfter:'go out'},
 {q:'Какой звук «появляется» между словами в <b>I agree</b>?', opts:['[j]','[w]','[r]'], ans:0, lvl:1,
  why:'После [aɪ] появляется лёгкий <b>[j]</b> («й»): «ай-йэгри».',
  why2:'Звуки [iː], [ɪ], [aɪ], [eɪ] + гласный → [j]: I agree, see it, she is.', sayAfter:'I agree'},
 {type:'spell', lvl:1, say:'Get up', ans:['get up'], q:'Послушай и напиши два слова (звучат как одно: «ге-тап»)',
  why:'<b>get up</b> — два слова. t «прилипает» к up, поэтому кажется, что это одно слово.',
  why2:'get + up = вставать.'},
 {type:'read', lvl:1, text:'Look at it and pick it up.', q:'Прочитай вслух — слитно, без пауз',
  why:`Читай как два «длинных слова»: ${s('look at it')} → «лу-ка-тит», ${s('and pick it up')} → «эн-пи-ки-тап». В and d почти не слышно.`,
  why2:'Не останавливайся после каждого слова — согласный переходит к следующей гласной.'},
 {type:'read', lvl:1, text:'I agree with you.', q:'Прочитай вслух',
  why:`${s('I agree')} — между словами лёгкий [j]: «ай-йэгри». ${s('with you')} — th + y: «уиз-ю».`,
  why2:'Ударение — на GREE. Читай одной фразой.'},
 {q:'В какой фразе британец произносит букву <b>r</b> на конце первого слова?', opts:['far away','far from home','a car park'], ans:0, lvl:2,
  why:'В <b>far away</b> следующее слово начинается с гласной → r звучит: «фар-эвэй». В far from и car park после r согласный — r молчит.',
  why2:'Связующий r: r на конце + гласный в начале следующего слова.', sayAfter:'far away'},
 {q:'Как обычно звучит <b>did you</b> в быстрой речи?', opts:['«диджу» [ˈdɪdʒu]','«дид — ю» с паузой','«ди-ю» без d'], ans:0, lvl:2,
  why:'d + y [j] сливаются в звук <b>[dʒ]</b>: «диджу». Так же would you → «вуджу».',
  why2:'Это как русское «дж» в «джунгли».', sayAfter:'Did you see it?'},
 {type:'listen', lvl:2, say:'Can I have a glass of water?', q:'Послушай. Что просят?', opts:['Стакан воды','Стакан сока','Бутылку воды'], ans:0,
  why:'«a glass of water» — слова сливаются: «э-гла-сов-уотэ». glass = стакан, water = вода.',
  why2:'«have a» → «хэвэ», «glass of» → «гласов». of звучит слабо [əv].'},
 {type:'listen', lvl:2, say:'Is it an old car?', q:'Послушай. О чём спрашивают?', opts:['Это старая машина?','Это новая машина?','Это его машина?'], ans:0,
  why:'«Is it an old car?» звучит как «и-зи-тэ-ноулд-ка»: всё слилось. old = старый.',
  why2:'n из an «прилипает» к old: «э-ноулд».'},
 {type:'spell', lvl:2, say:'an apple', ans:['an apple'], q:'Послушай и напиши два слова',
  why:'<b>an apple</b>: перед гласным — an, и n «прилипает» к apple: «э-нэпл».',
  why2:'Звучит как одно слово, но пишется в два.'},
 {type:'spell', lvl:2, say:'far away', ans:['far away'], q:'Послушай и напиши два слова (со связующим r)',
  why:'<b>far away</b> — r в far звучит, потому что дальше гласная.',
  why2:'far + away = далеко. В away a в начале — слабый [ə].'},
 {lvl:2, text:'When a word {ends*|end@en.5.ps} in a consonant and the next word starts with a vowel, we {join*|separate} the two words: “look at” sounds like “loo-kat”.',
  why:'1) <b>a word</b> = it → Present Simple с -s: <b>ends</b>. 2) Согласный + гласный → слова <b>соединяются</b> (join).',
  why2:'1) it ends, they end. 2) look at → «лу-кат».'},
 {lvl:2, text:'In British English the letter “r” at the end of “car” {is*|are@en.s.to_be} silent, but in “car engine” it {is pronounced*|is silent}.',
  why:'1) the letter = it → <b>is</b>. 2) Перед гласной (engine) r становится связующим и <b>звучит</b>: is pronounced.',
  why2:'1) it is. 2) car [kɑː], но car engine [kɑːr ˈendʒɪn].'},
 {lvl:2, text:'There {is*|are@en.p.there_is} a small “w” sound between “go” and “out”, and a small {“y”*|“w”} sound between “I” and “agree”.',
  why:'1) a small sound — один → <b>There is</b>. 2) После [aɪ] появляется <b>[j]</b> — звук, как буква “y” в yes.',
  why2:'1) there is + один. 2) go out → [w], I agree → [j].'},
 {lvl:3, text:'When two {words*|word@en.s.plurals} meet with the same consonant, as in “big girl”, we say {one long “g”*|two separate “g” sounds}.',
  why:'1) two → множественное число: <b>words</b>. 2) Одинаковые согласные на стыке сливаются в <b>один длинный звук</b>.',
  why2:'1) one word, two words. 2) big girl, bus stop, black cat — без паузы и без двойного звука.'},
 {lvl:3, text:'In fast speech “did you” often {sounds*|sound@en.5.ps} like {“didja”*|“did … you” with a pause}.',
  why:'1) «did you» здесь — одна фраза, «оно» → <b>sounds</b>. 2) d + y сливаются в [dʒ] → <b>“didja”</b>.',
  why2:'1) it sounds. 2) Пауз внутри фраз носители не делают.'},
 {lvl:3, text:'In “next door” and “last night” the letter “t” is usually {dropped*|very strong}, because it {comes*|come@en.5.ps} between two consonants.',
  why:'1) t между двумя согласными обычно <b>выпадает</b>: «некс-до», «лас-найт». 2) it → <b>comes</b>.',
  why2:'1) Так проще произносить. 2) Present Simple: it comes.'},
 {type:'read', lvl:2, text:'There is an apple on the table.', q:'Прочитай вслух',
  why:`${s('There is')} — связующий r: «зэа-риз». ${s('an apple on')} — «э-нэп-лон». ${s('the table')} — th звонкий, a в table — [eɪ].`,
  why2:'Читай всю фразу без пауз, ударные: APPLE, TABLE.'},
 {type:'read', lvl:3, text:'Get up at eight and have an egg for breakfast.', q:'Прочитай вслух',
  why:`${s('Get up at eight')} — «ге-та-пэт-эйт». ${s('have an egg')} — «хэ-вэ-нэг». ${s('breakfast')} ${tr('ˈbrekfəst')} — ea читается [e].`,
  why2:'Ударные: GET, EIGHT, EGG, BREAKFAST. «for» — слабый [fə].'},
 {type:'read', lvl:3, text:'Far away there is an old island.', q:'Прочитай вслух',
  why:`${s('Far away')} и ${s('there is')} — связующий r. ${s('an old island')} — «э-ноулд-айлэнд». В ${s('island')} буква s не читается!`,
  why2:'Ударные: FAR, AWAY, OLD, ISLAND. island [ˈaɪlənd].'}
]});

/* ================= 11. Reading aloud (OGE task 1) ================= */
RU.rule({
id:'en.9.ph_reading',
short:'В ОГЭ нужно прочитать вслух научно-популярный текст. Секрет: читай <b>смысловыми кусочками</b>, делай паузы на запятых и точках, правильно ставь ударение, не теряй окончания (-s, -ed) и звуки th.',
theory:`
<p>В первом задании устной части ОГЭ ты читаешь вслух небольшой научно-популярный текст. Проверяют <b>произношение</b>, <b>ударение</b> и <b>интонацию</b>, а не скорость.</p>
<ol class="steps">
<li><b>Прочитай текст про себя</b> и найди трудные слова. Нажми на них, чтобы послушать.</li>
<li><b>Раздели текст на кусочки</b> по смыслу. Паузы — на запятых, точках и перед and / but / because в длинных предложениях.</li>
<li><b>Ударение</b>: ${s('scientist')} SCI-en-tist, ${s('important')} im-POR-tant, ${s('information')} in-for-MA-tion, ${s('environment')} en-VI-ron-ment, ${s('planet')} PLA-net, ${s('volcano')} vol-CA-no.</li>
<li><b>Не теряй окончания</b>: -s ([s], [z], [ɪz]) и -ed ([t], [d], [ɪd]).</li>
<li><b>th</b> — язык между зубами: ${s('the Earth')}, ${s('think')}, ${s('other')}.</li>
<li><b>Интонация</b>: в конце утвердительного предложения голос <b>понижается</b>.</li>
</ol>
<div class="box tip"><b>Маленькие слова читаются слабо</b>
${s('the')} [ðə] перед согласным: ${s('the Moon')}; но [ði] перед гласным: ${s('the Earth')}, ${s('the ocean')}.<br>
${s('of')} [əv], ${s('to')} [tə], ${s('and')} [ən], ${s('a')} [ə] — быстро и без ударения.</div>
<div class="box err"><b>Типичные ошибки</b>
Читать все слова с одинаковой силой, «по слогам».<br>
Произносить буквы, которые не читаются: ${s('half')} (l не читается), ${s('island')} (s не читается), ${s('know')} (k не читается).<br>
Говорить «зе» или «се» вместо th.</div>`,
theory2:`
<p>Представь, что ты — диктор научной передачи 🎙️ и рассказываешь младшему брату интересный факт. Ты не спешишь, говоришь чётко и делаешь паузы, чтобы он успел понять.</p>
<p>Попробуй прочитать: ${s('Dolphins are very clever animals.')}<br>
Ударные слова: DOLPHINS, CLEVER, ANIMALS. «are» и «very» — проще и быстрее.</p>
<p>Правило «важное — громче»: существительные, глаголы и прилагательные — ударные; the, a, of, to, and — безударные.</p>`,
items:[
 {type:'read', lvl:1, text:'Dolphins are very clever animals. They live in groups and help each other. Every dolphin has its own special whistle, which works like a name. Dolphins talk to each other with these sounds and can understand many of them.', q:'Прочитай текст вслух, как в ОГЭ',
  why:`${s('dolphins')} — ударение на DOL, ph = [f], окончание -s звучит [z]. ${s('each other')} — свяжи: «и-чаза», th звонкий. ${s('whistle')} ${tr('ˈwɪsl')} — буква t не читается! Паузы — на каждой точке.`,
  why2:'Ударные слова: CLEVER, GROUPS, HELP, WHISTLE, NAME, SOUNDS. «are», «and», «of», «to» — слабые. В конце каждого предложения голос вниз.'},
 {type:'read', lvl:1, text:'Bees are small, but they are very important for people. When a bee flies from flower to flower, it carries pollen and helps plants to grow fruit. Without bees, we would have much less food.', q:'Прочитай текст вслух, как в ОГЭ',
  why:`${s('important')} — im-POR-tant. ${s('flower')} ${tr('ˈflaʊə')} — «флауэ», r не читается. ${s('carries')} — -ies звучит [iz]. ${s('pollen')} ${tr('ˈpɒlən')} — ударение на первый слог. Паузы: после small, после flower, после bees.`,
  why2:'«flies from flower to flower» читай ровно, одной фразой. В «without» th звонкий: [wɪˈðaʊt].'},
 {type:'read', lvl:1, text:'Penguins are birds, but they cannot fly. Instead, they are excellent swimmers. Their wings work like flippers. Most penguins live in the cold south of our planet. In winter, some penguins stand very close to each other in large groups to keep warm.', q:'Прочитай текст вслух, как в ОГЭ',
  why:`${s('penguins')} — PEN-guins ${tr('ˈpeŋɡwɪnz')}, ng = [ŋ]. ${s('excellent')} — ударение на EX. ${s('south')} — th глухой [θ] на конце. ${s('planet')} — PLA-net, [æ].`,
  why2:'Паузы: после birds, после Instead, после winter, на точках. «Their wings» — th звонкий. «warm» [wɔːm] — r не читается.'},
 {lvl:1, q:'Вставь: 1) форму глагола BE, 2) где ударение.', text:'Penguins {are*|is@en.s.to_be} birds. In the word “penguin” the stress is on the {first*|second} syllable.',
  why:'1) penguins — много, «они» → <b>are</b>. 2) <b>PEN</b>-guin — ударение на первый слог.',
  why2:'1) they are. 2) Большинство двусложных существительных — с ударением на первом слоге: PENguin, DOLphin, PLAnet.'},
 {type:'listen', lvl:1, say:'important', q:'Послушай. На какой слог падает ударение?', opts:['im-POR-tant','IM-por-tant','im-por-TANT'], ans:0,
  why:'im-<b>POR</b>-tant — ударение на второй слог. Первый и третий — слабые [ɪm], [tənt].',
  why2:'Частая ошибка в ОГЭ — «ИМпортант». Слушай на 🐢.'},
 {type:'read', lvl:2, text:'Sleep is very important for your health. While you are sleeping, your brain is still working. It sorts the information from the day and helps you remember new things. Teenagers need about nine hours of sleep every night.', q:'Прочитай текст вслух, как в ОГЭ',
  why:`${s('health')} ${tr('helθ')} — ea = [e], на конце глухой [θ]. ${s('information')} — in-for-MA-tion. ${s('teenagers')} ${tr('ˈtiːneɪdʒəz')} — ударение на TEEN. ${s('hours')} — h не читается: [ˈaʊəz].`,
  why2:'Паузы: после health, после sleeping, после day. «things» — th глухой, на конце [ŋz]. Слово «nine» можно и прочитать, и продиктовать цифрой — засчитается.'},
 {type:'read', lvl:2, text:'The Moon is our only natural satellite. It does not produce its own light. It reflects the light of the Sun. There is no air on the Moon, so there is no wind and no sound. The footprints of the first astronauts are probably still there.', q:'Прочитай текст вслух, как в ОГЭ',
  why:`${s('natural')} ${tr('ˈnætʃrəl')} — tu = «ч». ${s('satellite')} — SA-tel-lite, на конце [aɪt]. ${s('produce')} — глагол, ударение на второй слог: pro-DUCE. ${s('astronauts')} — AS-tro-nauts. ${s('probably')} — PROB-ab-ly.`,
  why2:'«The Moon» — the слабое [ðə]. «There is» — связующий r. Паузы — на точках и после Moon перед so.'},
 {type:'read', lvl:2, text:'Water covers most of our planet, but only a small part of it is fresh water that people can drink. Most fresh water is frozen in ice and snow. That is why it is important to save water at home.', q:'Прочитай текст вслух, как в ОГЭ',
  why:`${s('water')} ${tr('ˈwɔːtə')} — британское «уотэ». ${s('covers')} — [ˈkʌvəz]. ${s('frozen')} — [ˈfrəʊzn]. ${s('snow')} — [snəʊ], «сноу». ${s('That is why')} — th звонкий, свяжи «зэ-тиз-уай».`,
  why2:'Паузы: после planet (запятая) и на точках. «part of it is» — всё сливается: «па-то-ви-тиз».'},
 {lvl:2, q:'Вставь: 1) форму глагола MOVE, 2) как звучит «the».', text:'The Moon {moves*|move@en.5.ps} around the Earth. In “the Earth” we say “the” like {“thee”*|“thuh”}, because “Earth” starts with a vowel sound.',
  why:'1) The Moon = it → Present Simple с -s: <b>moves</b>. 2) Перед гласным звуком the звучит как <b>[ði]</b> — «thee».',
  why2:'1) it moves. 2) the Moon [ðə], the Earth [ði].'},
 {lvl:2, q:'Вставь: 1) форму глагола COVER, 2) где ударение.', text:'Water {covers*|cover@en.5.ps} most of our planet. In the word “planet” the stress is on the {first*|second} syllable.',
  why:'1) Water (вода) = it → <b>covers</b>. 2) <b>PLA</b>-net — ударение на первый слог.',
  why2:'1) it covers. 2) PLAnet [ˈplænɪt].'},
 {lvl:2, q:'Вставь: 1) степень сравнения BIG, 2) как звучит «the».', text:'The blue whale is {the biggest*|the bigger|the most big@en.6.comparatives} animal on our planet. In “the biggest” the word “the” sounds like {“thuh”*|“thee”}.',
  why:'1) Самое большое из всех → <b>the biggest</b> (big → bigger → biggest, g удваивается). 2) Перед согласным [b] the звучит слабо <b>[ðə]</b> — «thuh».',
  why2:'1) Короткое слово — -est. 2) the + согласный → [ðə].'},
 {lvl:2, q:'Вставь: 1) there is или there are, 2) где ударение.', text:'There {are*|is@en.p.there_is} millions of stars in the sky. In the word “millions” the stress is on the {first*|second} syllable.',
  why:'1) millions of stars — много → <b>There are</b>. 2) <b>MIL</b>-lions — ударение на первый слог.',
  why2:'1) there are + множественное. 2) MILlions [ˈmɪljənz].'},
 {type:'listen', lvl:2, say:'environment', q:'Послушай. На какой слог падает ударение?', opts:['en-VI-ron-ment','EN-vi-ron-ment','en-vi-ron-MENT'], ans:0,
  why:`en-<b>VI</b>-ron-ment ${tr('ɪnˈvaɪrənmənt')} — ударение на второй слог, где звучит [aɪ].`,
  why2:'Слово часто встречается в текстах ОГЭ про экологию. Слушай на 🐢.'},
 {type:'spell', lvl:2, say:'scientists', ans:['scientists'], q:'Послушай и напиши слово',
  why:'<b>scientists</b>: sc в начале читается [s], ie — [aɪə], на конце -ists.',
  why2:'science → scientist → scientists. Ударение на SCI.'},
 {type:'read', lvl:3, text:'A volcano is a mountain with a hole at the top. Deep under the ground it is so hot that rocks melt. When the pressure becomes very strong, hot liquid rock comes out of the volcano. This rock is called lava. Some volcanoes have been sleeping for hundreds of years, but scientists watch them carefully because they can wake up at any time.', q:'Прочитай текст вслух, как в ОГЭ',
  why:`${s('volcano')} — vol-CA-no ${tr('vɒlˈkeɪnəʊ')}. ${s('pressure')} ${tr('ˈpreʃə')} — ss = «ш». ${s('liquid')} ${tr('ˈlɪkwɪd')}. ${s('called')} — -ed = /d/. ${s('watch them')} — th звонкий, не «з».`,
  why2:'Длинное последнее предложение раздели: «Some volcanoes have been sleeping for hundreds of years, | but scientists watch them carefully | because they can wake up at any time.»'},
 {type:'read', lvl:3, text:'Every year people throw away millions of plastic bottles. Plastic does not disappear. It can stay in the ground or in the ocean for hundreds of years, and many sea animals suffer from it. That is why scientists think that recycling is very important for the environment.', q:'Прочитай текст вслух, как в ОГЭ',
  why:`${s('throw')} ${tr('θrəʊ')} — th глухой + r. ${s('disappear')} — dis-ap-PEAR. ${s('the ocean')} — the как [ði]. ${s('recycling')} — re-CY-cling ${tr('ˌriːˈsaɪklɪŋ')}. ${s('environment')} — en-VI-ron-ment.`,
  why2:'Паузы: на точках, после ocean (запятая). «think that» — два разных th: глухой [θ] и звонкий [ð]. «suffer from it» — «са-фэ-фро-мит».'},
 {type:'read', lvl:3, text:'Chocolate is made from the seeds of the cocoa tree. These trees grow only in hot countries near the equator. People started drinking chocolate thousands of years ago, but solid chocolate bars appeared much later. Today chocolate is one of the most popular sweets in the world.', q:'Прочитай текст вслух, как в ОГЭ',
  why:`${s('chocolate')} ${tr('ˈtʃɒklət')} — ДВА слога: «чок-лэт». ${s('cocoa')} ${tr('ˈkəʊkəʊ')} — «коукоу», a не читается. ${s('equator')} — e-QUA-tor ${tr('ɪˈkweɪtə')}. ${s('appeared')} — -ed = /d/. ${s('world')} ${tr('wɜːld')}.`,
  why2:'Паузы: после ago (запятая), на точках. «thousands» — th глухой. «countries» [ˈkʌntriz].'},
 {lvl:3, q:'Вставь: 1) форму HAVE в Present Perfect Continuous, 2) где ударение.', text:'Many volcanoes {have been*|has been@en.8.ppc} sleeping for hundreds of years. In the word “volcano” the stress is on the {second*|first} syllable.',
  why:'1) volcanoes — много → <b>have been</b> sleeping. 2) vol-<b>CA</b>-no — ударение на второй слог.',
  why2:'1) they have been doing. 2) [vɒlˈkeɪnəʊ].'},
 {lvl:3, q:'Вставь: 1) форму глагола DISCOVER, 2) где сделать паузу при чтении.', text:'Last year scientists {discovered*|discover|discovers@en.6.past_reg} a new kind of frog. When you read a text aloud, you make a short pause {at a full stop*|after every “the”}.',
  why:'1) Last year → Past Simple: <b>discovered</b>. 2) Паузы делают <b>на точках</b> и запятых, а не после маленьких слов.',
  why2:'1) discover + ed. 2) the всегда «приклеено» к следующему слову.'}
]});

/* ================= Mixed exercise, grade 9 (OGE style) ================= */
RU.mix(9, [
 {lvl:3, q:'Вставь формы слов: 1) GO, 2) OLD.', text:'Last summer my family {went*|goes|has gone@en.6.past_irreg} to Kazan. It is one of the {oldest*|older|most old@en.6.comparatives} cities in Russia.',
  why:'1) Last summer → Past Simple: go → <b>went</b>. 2) one of the + превосходная степень: <b>oldest</b>.',
  why2:'1) Указание на прошлое → went, не has gone. 2) one of the oldest cities.'},
 {lvl:3, q:'Вставь формы слов: 1) COOK, 2) WONDER.', text:'When I came home, my mum {was cooking*|cooked|is cooking@en.7.past_s_vs_c} dinner. The kitchen smelled {wonderful*|wonderfully|wonder@en.9.word_form}.',
  why:'1) Процесс в момент прихода → <b>was cooking</b>. 2) После smell (пахнет — какой?) — прилагательное: <b>wonderful</b>.',
  why2:'1) when + Past Simple, а фон — Past Continuous. 2) smell, look, taste, sound + прилагательное.'},
 {lvl:3, q:'Вставь формы слов: 1) BUILD, 2) LARGE.', text:'A new swimming pool {is being built*|is building|builds@en.9.passive_all} in our town now. It will be the {largest*|larger|most large@en.6.comparatives} pool in the region.',
  why:'1) Бассейн строят сейчас → <b>is being built</b>. 2) Самый большой → <b>the largest</b>.',
  why2:'1) be being + V3. 2) large → larger → largest.'},
 {lvl:3, q:'Вставь формы слов: 1) KNOW, 2) PREPARE.', text:'If I {had known*|knew|have known@en.9.cond_3} about yesterday’s test, I {would have prepared*|would prepare|will prepare@en.9.cond_3} for it.',
  why:'Третий тип (о вчерашнем тесте): <b>had known</b> … <b>would have prepared</b>.',
  why2:'had V3 в if-части, would have V3 — в другой.'},
 {lvl:3, q:'Вставь формы слов: 1) LEARN, 2) FLUENT.', text:'My sister {has been learning*|is learning|learns@en.8.ppc} English for five years. She speaks it {fluently*|fluent|fluency@en.9.word_form}.',
  why:'1) Действие длится до сих пор (for five years) → <b>has been learning</b>. 2) speaks (как?) → наречие <b>fluently</b>.',
  why2:'1) for + период до сейчас → Present Perfect Continuous. 2) fluent + ly.'},
 {lvl:3, q:'Вставь: 1) местоимение, 2) форму глагола CAN.', text:'My friend asked {me*|I@en.5.pronouns} if I {could*|can|could I@en.9.reported_q} lend him my bike.',
  why:'1) После asked — объектное <b>me</b>. 2) Косвенный вопрос: can → <b>could</b>, порядок прямой.',
  why2:'1) asked me. 2) if I could.'},
 {lvl:3, q:'Вставь: 1) форму глагола HAVE, 2) правильный порядок слов.', text:'I wish I {had*|have|will have@en.9.wish} more free time. I {usually get*|get usually@en.5.adv_freq} home very late.',
  why:'1) Жаль, что сейчас нет → <b>had</b>. 2) Наречие частоты — перед глаголом: <b>usually get</b>.',
  why2:'1) wish + Past Simple. 2) usually + глагол.'},
 {lvl:3, q:'Вставь формы слов: 1) LOOK, 2) GO.', text:'You {look*|looks@en.5.ps} tired. You {should have gone*|must have gone|can’t have gone@en.9.modal_perf} to bed earlier last night.',
  why:'1) you → <b>look</b> (без -s). 2) Упрёк: не лёг рано, а надо было → <b>should have gone</b>.',
  why2:'1) -s только у he/she/it. 2) should have + V3 = надо было.'},
 {lvl:3, q:'Вставь: 1) слово-связку, 2) форму слова CHILD.', text:'{Although*|Despite|Unless@en.9.linking} it was very cold, the {children*|childs|childrens@en.s.plurals} played in the snow all day.',
  why:'1) Дальше целое предложение → <b>Although</b>. 2) child → <b>children</b>.',
  why2:'1) although + кто + глагол. 2) Исключение.'},
 {lvl:3, q:'Вставь формы слов: 1) PAINT, 2) STAY.', text:'Our flat {is being painted*|is painting|paints@en.9.passive_all}, so we {are staying*|stay|stays@en.5.ps_vs_pc} with our grandparents this week.',
  why:'1) Квартиру красят сейчас → <b>is being painted</b>. 2) Временно (this week) → <b>are staying</b>.',
  why2:'1) Пассив Continuous. 2) Временная ситуация → Present Continuous.'},
 {lvl:3, q:'Вставь формы слов: 1) LEAVE, 2) BE.', text:'By the time we got to the station, the train {had already left*|has already left|already leaves@en.8.past_perf}. We {were*|was@en.p.was_were} very upset.',
  why:'1) Раньше другого прошлого действия → <b>had already left</b>. 2) we → <b>were</b>.',
  why2:'1) By the time + Past Simple → Past Perfect. 2) we were.'},
 {lvl:3, q:'Вставь: 1) have something done, 2) форму глагола DROP.', text:'Last week I {had my phone repaired*|had repaired my phone|have my phone repaired@en.9.causative} at a shop near my school because I {dropped*|droped|drop@en.6.past_reg} it.',
  why:'1) Чинили в мастерской → <b>had my phone repaired</b>. 2) drop — краткий гласный + одна согласная → удваиваем: <b>dropped</b>.',
  why2:'1) have + что + V3. 2) stop → stopped, drop → dropped.'},
 {lvl:3, q:'Вставь формы слов: 1) VISIT, 2) IMPRESS.', text:'The museum {has been visited*|has visited|visited@en.9.passive_all} by millions of tourists. Its collection is really {impressive*|impress|impression@en.9.word_form}.',
  why:'1) Музей посещают (by tourists) → пассив: <b>has been visited</b>. 2) is really ___ → прилагательное <b>impressive</b>.',
  why2:'1) has been + V3. 2) impress + ive.'},
 {lvl:3, q:'Вставь формы слов: 1) HURRY, 2) MISS.', text:'Unless you {hurry*|will hurry|hurried@en.7.cond_01}, you {will miss*|miss|would miss@en.7.cond_01} the bus.',
  why:'1) После unless (как после if) — Present Simple: <b>hurry</b>. 2) Результат в будущем → <b>will miss</b>.',
  why2:'Первый тип: unless/if + Present, will + глагол.'},
 {lvl:3, q:'Вставь: 1) фразовый глагол, 2) some или any.', text:'We {have run out of*|have run out|have looked for@en.9.phrasal} sugar. Can you buy {some*|any@en.5.some_any}, please?',
  why:'1) Сахар закончился → <b>have run out of</b>. 2) Просьба → <b>some</b>.',
  why2:'1) run out of + что. 2) В просьбах и предложениях — some.'},
 {lvl:3, q:'Вставь: 1) модальный глагол в прошлом, 2) форму глагола BE.', text:'Tom {can’t have taken*|must have taken|should have taken@en.9.modal_perf} your book: he {is*|are@en.s.to_be} in hospital this week.',
  why:'1) Том в больнице → не мог взять: <b>can’t have taken</b>. 2) he → <b>is</b>.',
  why2:'1) Алиби → can’t have. 2) he is.'},
 {lvl:3, q:'Вставь: 1) форму глагола FORGET, 2) my или mine.', text:'If only I {hadn’t forgotten*|didn’t forget|don’t forget@en.9.wish} {my*|mine@en.p.possessive} keys this morning!',
  why:'1) Сожаление о прошлом (this morning уже прошло) → <b>hadn’t forgotten</b>. 2) Перед существительным — <b>my</b>.',
  why2:'1) If only + had V3. 2) my keys; the keys are mine.'},
 {lvl:3, q:'Вставь формы слов: 1) BELIEVE, 2) DECIDE.', text:'Yesterday it was {unbelievably*|unbelievable|believe@en.9.word_form} hot, so we {decided*|decide|have decided@en.7.pp_vs_past} to go to the river.',
  why:'1) Перед прилагательным hot — наречие <b>unbelievably</b>. 2) Yesterday → Past Simple: <b>decided</b>.',
  why2:'1) un + believe + able + ly. 2) Точное время в прошлом → Past Simple, не Present Perfect.'},
 {lvl:3, q:'Вставь: 1) фразовый глагол, 2) форму глагола BE.', text:'When the plane finally {took off*|got up|put on@en.9.phrasal}, everybody {was*|were@en.p.was_were} happy.',
  why:'1) Самолёт взлетел → <b>took off</b>. 2) everybody — единственное число → <b>was</b>.',
  why2:'1) take off = взлетать. 2) everybody is / was.'},
 {lvl:3, q:'Вставь: 1) косвенную просьбу, 2) форму слова HARM.', text:'Mum told me {not to play*|don’t play|not play@en.9.reported_q} computer games late at night. She thinks it is {harmful*|harm|harmfully@en.9.word_form} to my eyes.',
  why:'1) «Don’t play!» → told me <b>not to play</b>. 2) is ___ to → прилагательное <b>harmful</b> (harmful to — вреден для).',
  why2:'1) not to + глагол. 2) harm + ful = вредный.'},
 {lvl:3, q:'Вставь формы слова BUILD и выбери this / these.', text:'This castle {was built*|built|has been built@en.8.passive} more than five hundred years ago. {These*|This@en.s.this_that} walls are very thick.',
  why:'1) ago → Past Simple Passive: <b>was built</b> (has been built с ago не употребляется). 2) walls — много → <b>These</b>.',
  why2:'1) Замок построили давно → was built. 2) these walls, this wall.'},
 {lvl:3, q:'Вставь: 1) форму глагола SEND, 2) степень сравнения EASY.', text:'The tickets {will be sent*|will send|are sending@en.9.passive_all} to you by email tomorrow. It is the {easiest*|most easy|easier@en.6.comparatives} way.',
  why:'1) Билеты пришлют завтра → <b>will be sent</b>. 2) easy → <b>the easiest</b> (y → i).',
  why2:'1) will be + V3. 2) Двусложные на -y: easy → easier → easiest.'}
]);
})();
