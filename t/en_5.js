/* Английский язык — 5 класс: грамматика (Present Simple / Continuous, наречия частоты,
   артикли, some/any, предлоги времени, местоимения) и фонетика (th, ɪ/iː, окончание -s). */
(function(){
const s=(t,shown)=>`<span class="say" data-say="${t}">${shown||t}</span>`;
const tr=t=>`<span class="tr">[${t}]</span>`;

/* ===================================================================== */
RU.rule({
id:'en.5.ps',
short:'Present Simple — «обычно, всегда, регулярно». I/you/we/they <b>like</b>, he/she/it <b>likes</b>; отрицание <b>don’t / doesn’t + глагол</b>; вопрос <b>Do / Does … + глагол?</b>',
theory:`
<p>Present Simple — это время <b>привычек, расписаний и фактов</b>: что ты делаешь <i>обычно</i>, <i>каждый день</i>, <i>всегда</i>. Не «прямо сейчас», а «вообще, как правило».</p>
<div class="box rule"><b>Утверждение</b>
I / you / we / they + <b>глагол</b>: ${s('I play football.')} ${s('They live in Moscow.')}<br>
he / she / it + <b>глагол + s</b>: ${s('He plays football.')} ${s('She lives in Moscow.')}</div>
<div class="box rule"><b>Отрицание</b>
I / you / we / they + <b>don’t</b> + глагол: ${s('I don’t like milk.')}<br>
he / she / it + <b>doesn’t</b> + глагол (БЕЗ -s!): ${s('She doesn’t like milk.')}</div>
<div class="box rule"><b>Вопрос и краткий ответ</b>
<b>Do</b> you / they … + глагол? ${s('Do you like milk?')} — ${s('Yes, I do.')} / ${s('No, I don’t.')}<br>
<b>Does</b> he / she / it … + глагол (БЕЗ -s!)? ${s('Does she like milk?')} — ${s('Yes, she does.')} / ${s('No, she doesn’t.')}<br>
С вопросительным словом: ${s('Where do you live?')} ${s('What time does the lesson start?')}</div>
<p><b>Как запомнить:</b> буква <b>s</b> — «одна на предложение». Если в предложении уже есть <b>does</b> или <b>doesn’t</b>, то -s «ушла» туда, и глагол остаётся голым: ${s('He likes')} → ${s('He doesn’t like')} → ${s('Does he like?')}</p>
<table class="sym"><thead><tr><th>Как пишется -s</th><th>Примеры</th></tr></thead><tbody>
<tr><td>обычно + <b>s</b></td><td>${s('work — works')}, ${s('read — reads')}, ${s('play — plays')} (гласная + y → просто s)</td></tr>
<tr><td>после s, ss, sh, ch, x, o → <b>es</b></td><td>${s('watch — watches')}, ${s('wash — washes')}, ${s('go — goes')}, ${s('do — does')}, ${s('fix — fixes')}</td></tr>
<tr><td>согласная + y → <b>ies</b></td><td>${s('study — studies')}, ${s('cry — cries')}, ${s('fly — flies')}</td></tr>
<tr><td>исключение</td><td>${s('have — has')}: ${s('She has a dog.')}</td></tr>
</tbody></table>
<p><b>Слова-подсказки (маркеры):</b> ${s('every day')}, ${s('every morning')}, ${s('usually')}, ${s('often')}, ${s('always')}, ${s('never')}, ${s('on Mondays')}, ${s('at the weekend')}, ${s('twice a week')}.</p>
<div class="box err"><b>Типичные ошибки русскоязычных</b>
✗ He like music. → ✓ ${s('He likes music.')} (он — значит, нужна -s)<br>
✗ She doesn’t likes. → ✓ ${s('She doesn’t like it.')}<br>
✗ Does he plays? → ✓ ${s('Does he play?')}<br>
✗ I am agree. → ✓ ${s('I agree.')} В английском <b>agree</b> — это глагол «соглашаться», am не нужен. Так же: ✗ I am like → ✓ ${s('I like')}, ✗ I am live → ✓ ${s('I live')}.<br>
✗ Where you live? → ✓ ${s('Where do you live?')} (в вопросе нужен помощник do/does)</div>`,
theory2:`
<p>Представь, что у глаголов в Present Simple есть <b>помощник — do</b>. В обычном утверждении он спрятан: ${s('I play.')} В вопросе и отрицании он выходит вперёд: ${s('Do you play?')} ${s('I don’t play.')}</p>
<p>Когда говорим про <b>одного человека</b> (he, she, it, my mum, Tom), помощник становится <b>does</b>, а глаголу добавляется хвостик <b>-s</b>. Но хвостик один на двоих: если в предложении есть does — хвостик забирает он.</p>
<div class="box ex"><b>Сравни</b>
${s('My dad works.')} — Папа работает.<br>
${s('My dad doesn’t work.')} — Папа не работает.<br>
${s('Does your dad work?')} — Твой папа работает?</div>
<div class="box tip"><b>Русская логика не помогает</b> «Я согласен» — это <b>не</b> «I am agree», а просто ${s('I agree.')} Глагол сам по себе — уже всё сказуемое.</div>`,
items:[
 {lvl:1,text:'My sister {likes*|like|liking} music.',
  why:'<b>My sister</b> = she (одна сестра), значит в Present Simple глагол получает -s: <b>likes</b>. «Like» — для I/you/we/they, «liking» без am/is/are вообще не сказуемое.',
  why2:'Проверка: замени «my sister» на she. She … → she likes. Хвостик -s появляется у глагола, когда речь об одном человеке.'},
 {lvl:1,text:'We {live*|lives|are live} in a small town.',
  why:'<b>We</b> — «мы», поэтому глагол без -s: <b>we live</b>. «Lives» — только для he/she/it. «Are live» — ошибка: глагол live уже сказуемое, am/is/are не нужны.',
  why2:'Как по-русски «мы живём» — одно слово-глагол. В английском тоже: we live. Никакого are.'},
 {lvl:1,text:'He {doesn’t*|don’t|isn’t} eat meat.',
  why:'Отрицание для he/she/it — <b>doesn’t</b> + глагол: he doesn’t eat. «Don’t» — для I/you/we/they. «Isn’t» — отрицание от is, оно не ставится перед обычным глаголом eat.',
  why2:'He — один человек, значит помощник does: does + not = doesn’t. He doesn’t eat meat = Он не ест мясо.'},
 {type:'listen',lvl:1,say:'She goes to school by bus.',q:'Послушай. Какая форма глагола прозвучала?',opts:['go','goes','going'],ans:1,
  why:'Прозвучало <b>She goes</b> [gəʊz]. После she глагол получает окончание, а go пишется с -es: go → goes.',
  why2:'Go оканчивается на o, поэтому не «gos», а <b>goes</b>. Так же do → does.'},
 {type:'read',lvl:1,text:'My brother plays football every day.',q:'Прочитай вслух',
  why:'Не проглоти окончание в <b>plays</b> — на конце звонкое [z]: [pleɪz]. В <b>every</b> ударение на первый слог: [ˈevri]. <b>football</b> — [ˈfʊtbɔːl].',
  why2:'Произнеси медленно: my BROther PLAYZ FOOTball Every DAY. Главное — услышать [z] в plays.'},
 {lvl:1,text:'Tom {is*|are|am@en.s.to_be} twelve. He {gets*|get|getting} up at seven.',
  why:'1) Tom = he, с he глагол to be — <b>is</b>: Tom is twelve. 2) He + Present Simple → глагол с -s: <b>gets up</b> (встаёт каждый день).',
  why2:'Is — «есть/является» для одного человека (Тому двенадцать). Get up — обычное действие, he → gets.'},
 {lvl:2,text:'{Does*|Do|Is} your dad work in an office? — Yes, he {does*|do|is}.',
  why:'1) Your dad = he, вопрос в Present Simple с he → <b>Does</b> your dad work? 2) Краткий ответ повторяет помощника: <b>Yes, he does.</b> «Is» не подходит: в вопросе обычный глагол work, а не to be.',
  why2:'Вопрос задан с does — значит и отвечаем does. Do — для you/they, is — для предложений без обычного глагола (Is he a teacher?).'},
 {lvl:2,text:'My friend {watches*|watchs|watch} TV in the evening, but I {don’t*|doesn’t|not} watch TV.',
  why:'1) My friend = he → watch + es = <b>watches</b> (после ch пишем -es). 2) I → отрицание <b>don’t</b> watch. «Doesn’t» — только для he/she/it, а просто «not» без помощника нельзя.',
  why2:'Watch оканчивается на ch — добавляем -es (watches). Для I помощник do: I don’t watch.'},
 {lvl:2,text:'I {agree*|am agree|agrees} with you.',
  why:'«Я согласен» = <b>I agree</b>. Agree — это глагол «соглашаться», ему не нужен am. «Agrees» — форма для he/she.',
  why2:'Типичная ошибка русскоязычных: «я согласен» звучит как «я есть согласный», отсюда «I am agree». Но по-английски — просто I agree.'},
 {type:'spell',lvl:2,say:'studies',ans:['studies'],q:'Послушай и напиши слово (это форма глагола study для he/she)',
  why:'Study оканчивается на <b>согласную + y</b> (d + y), поэтому y → i + es: <b>studies</b>.',
  why2:'Сравни: play → plays (перед y гласная a), а study → studies (перед y согласная d).'},
 {lvl:2,text:'My cousins {live*|lives} in London. They {have got*|has got@en.s.have_got} a big dog.',
  why:'1) My cousins — их несколько (they), значит <b>live</b> без -s. 2) They → <b>have got</b>; has got — только для he/she/it.',
  why2:'Cousins оканчивается на -s — это множественное число, «они». Для «они»: live, have got.'},
 {type:'listen',lvl:2,say:'Does your sister like ice cream? No, she doesn’t.',q:'Послушай диалог. Что ответили?',opts:['Нет, не любит','Да, любит','Она не знает'],ans:0,
  why:'Ответ был <b>No, she doesn’t</b> — «Нет, не любит». Doesn’t = does not.',
  why2:'В кратком ответе повторяют помощника из вопроса: Does…? — No, she doesn’t.'},
 {type:'read',lvl:2,text:'Does your father work at the weekend?',q:'Прочитай вслух',
  why:'<b>Does</b> — [dʌz], не «доуз». <b>father</b> — [ˈfɑːðə], звонкий th: кончик языка между зубами. <b>weekend</b> — [ˌwiːkˈend]. Вопрос «да/нет» — голос в конце идёт вверх.',
  why2:'Свяжи: «does your» [dʌz jɔː], «at the» [ət ðə]. Th в father и the — звонкий, не «з».'},
 {lvl:3,text:'Where {does*|do|is} your brother {go*|goes|going} after school?',
  why:'1) Your brother = he → помощник <b>does</b>. 2) После does глагол без -s: <b>go</b>. «Does … goes» — двойная -s, так нельзя.',
  why2:'Формула вопроса: вопросительное слово + does + he + глагол. Where does he go?'},
 {lvl:3,text:'My uncle {doesn’t*|don’t|isn’t} {have*|has|having} a car.',
  why:'1) My uncle = he → <b>doesn’t</b>. 2) После doesn’t — голый глагол: <b>have</b>, а не has. Has — это have + s, а -s уже «ушла» в doesn’t.',
  why2:'Ловушка: has — особая форма, но правило то же. He has a car → He doesn’t have a car.'},
 {lvl:3,text:'My little brother {cries*|crys|cry} a lot, and our dog {plays*|plaies|play} with him.',
  why:'1) Cry: перед y согласная r → y меняется: <b>cries</b>. 2) Play: перед y гласная a → просто -s: <b>plays</b>.',
  why2:'Смотри на букву перед y. Согласная (cry, study, fly) → -ies. Гласная (play, say, buy) → -s.'},
 {lvl:3,text:'What time {does*|do} the film {start*|starts}? — It starts at six. Let’s buy {an*|a@en.s.a_an} ice cream!',
  why:'1) The film = it → <b>does</b>. 2) После does — <b>start</b> без -s. Расписание — это Present Simple. 3) Ice начинается с гласного звука [aɪ] → <b>an</b> ice cream.',
  why2:'Расписание (кино, поезда, уроки) — всегда Present Simple. An ставим перед гласным звуком: an apple, an ice cream.'},
 {lvl:3,text:'There {are*|is@en.p.there_is} two parks in our town, and my grandad {walks*|walk} in one of them every morning.',
  why:'1) Two parks — множественное → <b>There are</b>. 2) My grandad = he, every morning — привычка → <b>walks</b>.',
  why2:'There are + несколько предметов. «Каждое утро» — маркер Present Simple, дедушка один → walks.'},
 {lvl:2,text:'{His*|He@en.p.possessive} name is Max. He {speaks*|speak} French.',
  why:'1) «Его имя» — притяжательное <b>His</b> name. He — «он», перед существительным не ставится. 2) He → <b>speaks</b> с -s.',
  why2:'His = «его» (чей?), he = «он» (кто?). Он говорит по-французски — he speaks.'},
 {type:'read',lvl:3,text:'He doesn’t like milk, but he likes tea.',q:'Прочитай вслух',
  why:'Сравни две формы: <b>doesn’t like</b> [ˈdʌznt laɪk] и <b>likes</b> [laɪks] — на конце глухое [s]. Можно сказать и полностью «does not like».',
  why2:'Медленно: he DOESn’t LIKE milk, but he LIKES tea. Окончание [s] в likes должно быть слышно.'}
]});

/* ===================================================================== */
RU.rule({
id:'en.5.pc',
short:'Present Continuous — «прямо сейчас»: <b>am / is / are + глагол-ing</b>. I am reading. She isn’t sleeping. Are you listening?',
theory:`
<p>Present Continuous — время «<b>в процессе</b>»: действие идёт <b>сейчас</b>, в момент речи. Как фото, где видно, что человек что-то делает.</p>
<div class="box rule"><b>Формула</b>
<b>am / is / are + глагол-ing</b><br>
${s('I am reading.')} ${s('She is sleeping.')} ${s('They are playing.')}<br>
Отрицание: ${s('I am not reading.')} ${s('He isn’t sleeping.')} ${s('We aren’t playing.')}<br>
Вопрос: ${s('Are you reading?')} — ${s('Yes, I am.')} ${s('Is she sleeping?')} — ${s('No, she isn’t.')}<br>
${s('What are you doing?')} — ${s('I am drawing.')}</div>
<table class="sym"><thead><tr><th>Кто</th><th>Форма be</th></tr></thead><tbody>
<tr><td>I</td><td><b>am</b> — ${s('I am cooking.')}</td></tr>
<tr><td>he / she / it, Tom, my cat</td><td><b>is</b> — ${s('My cat is eating.')}</td></tr>
<tr><td>you / we / they, my friends</td><td><b>are</b> — ${s('My friends are dancing.')}</td></tr>
</tbody></table>
<div class="box tip"><b>Как пишется -ing</b>
обычно: ${s('read — reading')}, ${s('play — playing')}<br>
немая e уходит: ${s('write — writing')}, ${s('dance — dancing')}<br>
короткий слог «согласная-гласная-согласная» → согласная удваивается: ${s('run — running')}, ${s('swim — swimming')}, ${s('sit — sitting')}<br>
ie → y: ${s('lie — lying')}, ${s('die — dying')}</div>
<p><b>Маркеры:</b> ${s('now')}, ${s('right now')}, ${s('at the moment')}, ${s('Look!')}, ${s('Listen!')}, ${s('Be quiet!')}, ${s('today')}, ${s('this week')}.</p>
<div class="box err"><b>Типичные ошибки</b>
✗ I reading. → ✓ ${s('I am reading.')} (без am не работает!)<br>
✗ He is play. → ✓ ${s('He is playing.')} (без -ing тоже не работает)<br>
✗ I am knowing / I am liking. → ✓ ${s('I know.')} ${s('I like it.')} Глаголы «состояния» — know, like, love, want, understand, need — в Continuous обычно <b>не</b> ставятся.<br>
✗ Do you listening? → ✓ ${s('Are you listening?')}</div>`,
theory2:`
<p>Представь, что ты снимаешь видео: «Смотри! Кот <i>спит-прямо-сейчас</i>». Для этого «прямо сейчас» англичане собирают конструктор из <b>двух</b> деталей:</p>
<ol class="steps"><li>деталь «есть»: <b>am / is / are</b>;</li><li>деталь «в процессе»: глагол + <b>ing</b>.</li></ol>
<p>Без любой из деталей конструктор разваливается.</p>
<div class="box ex"><b>Примеры</b>
${s('Look! The cat is sleeping.')} — Смотри! Кот спит.<br>
${s('I am doing my homework.')} — Я делаю уроки (сейчас).<br>
${s('Are you listening?')} — Ты слушаешь?</div>`,
items:[
 {lvl:1,text:'Look! The cat {is sleeping*|sleeping|sleeps} on the sofa.',
  why:'<b>Look!</b> — значит, происходит прямо сейчас → Present Continuous: is + sleeping. «Sleeping» без is — неполное сказуемое; «sleeps» — это привычка, а не сейчас.',
  why2:'Две детали: is (кот один) + sleeping. Look! — сигнал «смотри, что сейчас происходит».'},
 {lvl:1,text:'I {am*|is|are} doing my homework now.',
  why:'С <b>I</b> всегда <b>am</b>: I am doing. Is — для he/she/it, are — для you/we/they.',
  why2:'I am, he is, they are — как в глаголе to be. Now → Present Continuous.'},
 {lvl:1,text:'They {are playing*|is playing|playing} football at the moment.',
  why:'<b>At the moment</b> = сейчас. They → <b>are</b> playing. «Is» — для одного; «playing» без are — ошибка.',
  why2:'They (они) + are + playing. Маркер at the moment = «в данный момент».'},
 {type:'listen',lvl:1,say:'Listen! The baby is crying.',q:'Послушай. Что происходит?',opts:['Ребёнок спит','Ребёнок плачет','Ребёнок смеётся'],ans:1,
  why:'<b>The baby is crying</b> — малыш плачет (cry — плакать). Listen! — «послушай, вот прямо сейчас».',
  why2:'Crying от cry = плакать. Is crying — процесс сейчас.'},
 {type:'read',lvl:1,text:'I am reading a book now.',q:'Прочитай вслух',
  why:'Читай чётко <b>am</b> — не пропускай его. В <b>reading</b> долгий [iː] и носовой [ŋ] на конце: [ˈriːdɪŋ]. <b>book</b> — короткий [ʊ]: [bʊk].',
  why2:'I am READing a BOOK NOW. Окончание -ing — носовой звук, «г» в конце не произносится.'},
 {lvl:1,text:'Mum {is cooking*|cooks|cooking} dinner now. The plates {are*|is@en.s.to_be} on the table.',
  why:'1) <b>Now</b> → Present Continuous: Mum is cooking. 2) The plates — тарелки (много) → <b>are</b>.',
  why2:'Мама одна → is cooking. Тарелок несколько → are.'},
 {lvl:2,text:'She {isn’t watching*|not watching|doesn’t watching} TV now. She {is writing*|is writeing|writing} a letter.',
  why:'1) Отрицание в Present Continuous: <b>isn’t</b> + -ing. «Doesn’t» — из Present Simple, с -ing не сочетается; «not watching» без is — ошибка. 2) Write: немая e уходит → <b>writing</b>, и нужен is.',
  why2:'Отрицание делаем из детали «is»: is not = isn’t. Write → writing (e убираем перед -ing).'},
 {lvl:2,text:'{Are*|Do|Is} you listening to me? — Yes, I {am*|do|listen}.',
  why:'1) Вопрос в Present Continuous начинается с am/is/are; you → <b>Are</b> you listening? 2) Краткий ответ повторяет деталь be: <b>Yes, I am.</b>',
  why2:'Do — помощник Present Simple, с -ing не дружит. Вопрос Are…? — ответ I am.'},
 {lvl:2,text:'Why {is*|are|does} Tom {running*|runing|run}?',
  why:'1) Tom = he → <b>is</b>. 2) Run: короткий слог r-u-n → удваиваем n: <b>running</b>.',
  why2:'Why is he running? — Почему он бежит (сейчас)? Run, swim, sit — согласная удваивается.'},
 {type:'spell',lvl:2,say:'swimming',ans:['swimming'],q:'Послушай и напиши форму на -ing (swim + ing)',
  why:'Swim — короткий слог «согласная-гласная-согласная», последняя m удваивается: <b>swimming</b>.',
  why2:'Две m: swi<b>mm</b>ing. Так же running, sitting, getting.'},
 {lvl:2,text:'The dog {is lying*|is lieing|lying} {under*|in@en.p.prep_place} the table.',
  why:'1) Lie (лежать): ie → y + ing = <b>lying</b>, и нужен is. 2) Собака лежит <b>под</b> столом — under. «In the table» — «внутри стола», так не бывает.',
  why2:'Lie → lying, die → dying. Под — under, на — on, в — in.'},
 {type:'read',lvl:2,text:'My friends are swimming in the river today.',q:'Прочитай вслух',
  why:'<b>are</b> — [ɑː], долгий. <b>swimming</b> — [ˈswɪmɪŋ], короткий [ɪ]. <b>river</b> — [ˈrɪvə], r в конце не произносится.',
  why2:'Свяжи «friends are» [frendz ɑː]. Ударение: FRIENDS, SWIMming, RIVer, toDAY.'},
 {type:'listen',lvl:2,say:'What are you doing? I’m making a cake.',q:'Послушай. Что делает человек?',opts:['Ест торт','Печёт торт','Покупает торт'],ans:1,
  why:'<b>I’m making a cake</b> — «Я делаю (пеку) торт». Make a cake = печь торт. I’m = I am.',
  why2:'Making от make. Есть — eating, покупать — buying.'},
 {lvl:3,text:'I {know*|am knowing|knowing} the answer.',
  why:'<b>Know</b> — глагол состояния (знать), в Continuous не ставится, даже если «сейчас»: <b>I know</b>.',
  why2:'Знать нельзя «в процессе» — либо знаешь, либо нет. Так же like, love, want, understand.'},
 {lvl:3,text:'Be quiet! Grandpa {is having*|has|have} a rest.',
  why:'<b>Be quiet!</b> → сейчас. <b>Have a rest</b> (отдыхать) — это действие, поэтому можно: Grandpa is having a rest. «Has» — привычка, «have» — не та форма для he.',
  why2:'Have = «иметь» — не ставится в Continuous. Но have a rest, have breakfast, have a shower — действия, их можно: is having.'},
 {lvl:3,text:'{Where*|When|Who@en.p.wh_questions} is Kate going? — She {is going*|goes|go} to the shop.',
  why:'1) Ответ «to the shop» — это место, значит вопрос <b>Where</b> (куда). 2) Вопрос в Continuous (is … going) → ответ тоже: <b>She is going</b>.',
  why2:'Where = где/куда, When = когда, Who = кто. Куда идёт? — В магазин.'},
 {lvl:3,text:'Look! {Those*|That@en.s.this_that} boys {are climbing*|is climbing|climb} a tree.',
  why:'1) Boys — несколько мальчиков → <b>those</b> (те, мн. число). 2) Look! → сейчас; boys = they → <b>are climbing</b>.',
  why2:'That — один, those — много. Мальчиков много → those boys are climbing.'},
 {lvl:3,text:'Don’t {shout*|shouting|to shout@en.p.imperative}! The baby {is sleeping*|sleeps|sleep}.',
  why:'1) Запрет: <b>Don’t + глагол</b> без to и без -ing: Don’t shout! 2) Малыш спит сейчас → <b>is sleeping</b>.',
  why2:'Don’t run! Don’t shout! — просто голый глагол. Ребёнок спит прямо сейчас — Continuous.'},
 {type:'read',lvl:3,text:'Listen! Somebody is singing in the garden.',q:'Прочитай вслух',
  why:'<b>Somebody</b> — [ˈsʌmbədi], ударение на первый слог. <b>singing</b> — два носовых [ŋ]: [ˈsɪŋɪŋ]. <b>garden</b> — [ˈɡɑːdn].',
  why2:'LISten (t не читается!), SOMEbody, SINGing, GARden.'}
]});

/* ===================================================================== */
RU.rule({
id:'en.5.ps_vs_pc',
short:'Present Simple — обычно, всегда (I usually walk). Present Continuous — сейчас (Today I am going by bus). Know, like, want — только Simple.',
theory:`
<p>Два настоящих времени отвечают на разные вопросы: «<b>Как обычно?</b>» и «<b>Что сейчас?</b>»</p>
<table class="sym"><thead><tr><th>Present Simple</th><th>Present Continuous</th></tr></thead><tbody>
<tr><td><b>Present Simple</b> — привычки, регулярно, факты, расписание.<br>Маркеры: usually, always, often, never, every day, on Mondays.<br>${s('I usually walk to school.')}<br>${s('Water boils at one hundred degrees.')}</td>
<td><b>Present Continuous</b> — сейчас, в процессе, временно.<br>Маркеры: now, at the moment, Look!, Listen!, today, this week.<br>${s('Today I am going by bus.')}<br>${s('Look! The water is boiling.')}</td></tr>
</tbody></table>
<div class="box rule"><b>Пара для запоминания</b>
${s('What do you do?')} — Кем ты работаешь? (вообще)<br>
${s('What are you doing?')} — Что ты делаешь? (сейчас)</div>
<div class="box ex"><b>В одном предложении</b>
${s('He usually drinks tea, but today he is drinking coffee.')}<br>
${s('She wears jeans every day, but today she is wearing a dress.')}</div>
<div class="box tip"><b>Глаголы, которые не любят -ing</b> know, understand, like, love, hate, want, need, mean, believe — почти всегда Present Simple: ${s('I don’t understand this word.')} ${s('What does it mean?')}</div>
<div class="box err"><b>Ошибки</b>
✗ Look! It rains. → ✓ ${s('Look! It is raining.')}<br>
✗ I am usually walking to school. → ✓ ${s('I usually walk to school.')}<br>
✗ Are you liking pizza? → ✓ ${s('Do you like pizza?')}</div>`,
theory2:`
<p>Вспомни фото и видео. <b>Present Simple</b> — это «описание в анкете»: что человек делает вообще. <b>Present Continuous</b> — это «видео прямо сейчас».</p>
<div class="box ex"><b>Анкета и видео</b>
Анкета: ${s('My dad reads the newspaper every morning.')}<br>
Видео: ${s('Look! Dad is reading the newspaper.')}</div>
<p>Ищи слово-подсказку: <b>every, usually, always</b> → Simple; <b>now, Look!, today</b> → Continuous.</p>`,
items:[
 {lvl:1,text:'I usually {walk*|am walking} to school, but today I {am going*|go} by bus.',
  why:'1) <b>usually</b> — привычка → Present Simple: I usually walk. 2) <b>today</b> — сегодня, не как обычно → Present Continuous: I am going by bus.',
  why2:'Обычно — Simple, сегодня (временно, иначе чем всегда) — Continuous.'},
 {lvl:1,text:'Look! It {is raining*|rains}.',
  why:'<b>Look!</b> — дождь идёт прямо сейчас → <b>is raining</b>. «It rains» — про климат вообще (It rains a lot in London).',
  why2:'Look! = «смотри, вот сейчас» → Continuous.'},
 {lvl:1,text:'My dad {reads*|is reading} the newspaper every morning.',
  why:'<b>Every morning</b> — каждое утро, привычка → Present Simple: dad (he) <b>reads</b>.',
  why2:'Every = каждый → регулярно → Simple с -s.'},
 {type:'listen',lvl:1,say:'What do you do? I am a teacher.',q:'Послушай. О чём спросили?',opts:['Что ты сейчас делаешь?','Кем ты работаешь?','Где ты живёшь?'],ans:1,
  why:'<b>What do you do?</b> — Present Simple, вопрос «чем ты занимаешься вообще» = «кем работаешь». Ответ: I am a teacher. Про «сейчас» спросили бы What are you doing?',
  why2:'Do you do — «вообще». Are you doing — «сейчас».'},
 {type:'read',lvl:1,text:'We usually play chess, but now we are reading.',q:'Прочитай вслух',
  why:'<b>usually</b> — [ˈjuːʒuəli], звук [ʒ] как русское «ж». <b>chess</b> — [tʃes]. <b>reading</b> — долгий [iː].',
  why2:'We YUzhually PLAY CHESS, but NOW we are READing.'},
 {lvl:1,text:'Listen! My sister {is playing*|plays} the piano. She {can*|cans|can to@en.s.can} play very well.',
  why:'1) <b>Listen!</b> → сейчас: is playing. 2) <b>Can</b> не меняется и не берёт to: She can play.',
  why2:'Слушай — играет сейчас. Can — всегда одинаковое: I can, she can, и сразу глагол.'},
 {lvl:2,text:'Water {boils*|is boiling} at 100 degrees.',
  why:'Это <b>научный факт</b>, так всегда → Present Simple: water boils.',
  why2:'Факты о мире — Simple: The sun rises in the east. Water boils at 100 degrees.'},
 {lvl:2,text:'Turn off the cooker! The water {is boiling*|boils}.',
  why:'Просьба выключить плиту — потому что вода кипит <b>прямо сейчас</b> → is boiling.',
  why2:'Сравни с фактом «вода кипит при 100°». Здесь — конкретная кастрюля, сейчас.'},
 {lvl:2,text:'{Do*|Are} you {like*|liking} pizza?',
  why:'<b>Like</b> — глагол состояния, только Present Simple: <b>Do you like</b> pizza?',
  why2:'«Нравится» не бывает «в процессе». Поэтому Do you like…?, а не Are you liking.'},
 {lvl:2,text:'What {are you doing*|do you do} now? — I {am drawing*|draw} a picture.',
  why:'<b>Now</b> → Present Continuous в вопросе и в ответе: What are you doing? — I am drawing.',
  why2:'Сейчас → Continuous. «What do you do?» значит «кем ты работаешь».'},
 {type:'spell',lvl:2,say:'at the moment',ans:['at the moment'],q:'Послушай и напиши маркер Present Continuous (три слова)',
  why:'<b>at the moment</b> — «в данный момент», маркер Present Continuous. Moment пишется с одной m в середине.',
  why2:'At the moment = now. Пиши: at · the · moment.'},
 {lvl:2,text:'{There is*|There are@en.p.there_is} a new boy in our class. Today he {is sitting*|sits} next to me.',
  why:'1) <b>A new boy</b> — один → There is. 2) <b>Today</b> — сегодня, временно → he is sitting.',
  why2:'Один предмет — there is. Сегодня (не всегда) — Continuous.'},
 {type:'listen',lvl:2,say:'He usually drinks tea, but today he is drinking coffee.',q:'Послушай. Что он пьёт сегодня?',opts:['чай','кофе','сок'],ans:1,
  why:'<b>Today he is drinking coffee</b> — сегодня кофе. Чай — обычно (usually drinks tea).',
  why2:'Usually + Simple — обычно; today + Continuous — сегодня.'},
 {lvl:3,text:'I {don’t understand*|am not understanding} this word. What {does it mean*|is it meaning}?',
  why:'<b>Understand</b> и <b>mean</b> — глаголы состояния, Continuous с ними не используют: I don’t understand, What does it mean?',
  why2:'Понимать и значить — не процессы. Только Simple.'},
 {lvl:3,text:'She {is wearing*|wears} a red dress today, but she usually {wears*|is wearing} jeans.',
  why:'1) <b>today</b> → is wearing. 2) <b>usually</b> → wears.',
  why2:'Два маркера — два времени: today — Continuous, usually — Simple.'},
 {lvl:3,text:'My brother {wasn’t*|weren’t@en.p.was_were} at school yesterday. He is ill, so today he {is staying*|stays} at home.',
  why:'1) My brother = he → <b>wasn’t</b> (weren’t — для you/we/they). 2) Today, временно (болеет) → <b>is staying</b>.',
  why2:'He was / he wasn’t. Сегодня сидит дома из-за болезни — временно, Continuous.'},
 {lvl:3,text:'The {children*|childs@en.s.plurals} {are making*|make} a snowman in the garden right now.',
  why:'1) Child — исключение: мн. число <b>children</b>. 2) <b>Right now</b> → are making.',
  why2:'Child → children (как man → men). Прямо сейчас → Continuous.'},
 {type:'read',lvl:3,text:'What are you doing? I am waiting for my friend.',q:'Прочитай вслух',
  why:'<b>What are you</b> — свяжи: [wɒt ə juː]. <b>waiting</b> — [ˈweɪtɪŋ]. <b>friend</b> — [frend], ie читается как [e].',
  why2:'WHAT are you DOing? I am WAITing for my FRIEND.'},
 {lvl:3,text:'Hurry up! Everybody {is waiting*|waits|wait} for us.',
  why:'<b>Hurry up!</b> — «поторопись, нас ждут сейчас» → Continuous. <b>Everybody</b> — грамматически «он» (единственное число) → is waiting.',
  why2:'Everybody = каждый → is, как he. Сейчас ждут → is waiting.'}
]});

/* ===================================================================== */
RU.rule({
id:'en.5.adv_freq',
short:'always, usually, often, sometimes, never — <b>перед</b> обычным глаголом (I always get up), но <b>после</b> am/is/are (He is always late).',
theory:`
<p>Наречия частоты говорят, <b>как часто</b> что-то происходит.</p>
<table class="sym"><thead><tr><th>Слово</th><th>Как часто</th></tr></thead><tbody>
<tr><td>${s('always')} ${tr('ˈɔːlweɪz')}</td><td>всегда — 100%</td></tr>
<tr><td>${s('usually')} ${tr('ˈjuːʒuəli')}</td><td>обычно — 90%</td></tr>
<tr><td>${s('often')} ${tr('ˈɒfn')}</td><td>часто — 70%</td></tr>
<tr><td>${s('sometimes')} ${tr('ˈsʌmtaɪmz')}</td><td>иногда — 40%</td></tr>
<tr><td>${s('never')} ${tr('ˈnevə')}</td><td>никогда — 0%</td></tr>
</tbody></table>
<div class="box rule"><b>Где стоит наречие</b>
1) <b>Перед</b> обычным глаголом: ${s('I always get up at seven.')} ${s('He often plays football.')}<br>
2) <b>После</b> am / is / are: ${s('She is never late.')} ${s('We are usually busy.')}<br>
3) <b>Между</b> помощником и глаголом: ${s('I can never remember.')} ${s('We don’t often go to the cinema.')}</div>
<div class="box tip"><b>Как запомнить</b> «Глагол-работяга — наречие впереди; be — наречие позади».<br>
${s('I always walk')} &nbsp;|&nbsp; ${s('I am always happy')}</div>
<div class="box err"><b>Ошибки</b>
✗ I get always up. → ✓ ${s('I always get up.')}<br>
✗ He always is late. → ✓ ${s('He is always late.')}<br>
✗ I don’t never drink coffee. → ✓ ${s('I never drink coffee.')} — never уже значит «не», второе «не» не нужно! По-русски «никогда не пью», по-английски только одно отрицание.</div>
<p>Спросить «как часто?» — ${s('How often do you go swimming?')} — ${s('Twice a week.')} ${s('Every day.')} ${s('Once a month.')}</p>`,
theory2:`
<p>Представь предложение как поезд. Наречие частоты — пассажир, который садится <b>прямо перед вагоном-глаголом</b>: ${s('I often read.')}</p>
<p>Но если вагон — это <b>am / is / are</b>, пассажир садится <b>за</b> ним: ${s('I am often tired.')}</p>
<div class="box ex"><b>Примеры</b>
${s('Tom never eats fish.')} — Том никогда не ест рыбу (одно отрицание!).<br>
${s('My cat is always hungry.')} — Мой кот всегда голодный.</div>`,
items:[
 {lvl:1,text:'I {always get*|get always} up at seven.',
  why:'Наречие частоты стоит <b>перед</b> обычным глаголом: I <b>always get up</b>.',
  why2:'Get up — обычный глагол, always садится перед ним.'},
 {lvl:1,text:'She is {never*|always} late. She comes on time every day.',
  why:'Она приходит вовремя каждый день — значит, <b>никогда</b> не опаздывает: She is <b>never</b> late. После is наречие стоит правильно.',
  why2:'On time = вовремя. Если всегда вовремя, то never late.'},
 {lvl:1,text:'He {often plays*|plays often} football with his friends.',
  why:'<b>Often</b> ставим перед глаголом plays: He often plays football. «Plays often football» — наречие разрывает глагол и его дополнение, так нельзя.',
  why2:'Наречие — перед глаголом-работягой: often plays.'},
 {type:'listen',lvl:1,say:'I always have breakfast at home.',q:'Послушай. Как часто человек завтракает дома?',opts:['всегда','иногда','никогда'],ans:0,
  why:'Прозвучало <b>always</b> [ˈɔːlweɪz] — всегда.',
  why2:'Always — 100%, sometimes — иногда, never — никогда.'},
 {type:'read',lvl:1,text:'I usually get up at seven o’clock.',q:'Прочитай вслух',
  why:'<b>usually</b> — [ˈjuːʒuəli]: «ю-жу-а-ли», звук [ʒ] как «ж». <b>o’clock</b> — [əˈklɒk], ударение на второй слог.',
  why2:'Свяжи «get up at» [ɡet ʌp ət] — как одно слово.'},
 {lvl:1,text:'We {are always*|always are} busy on Mondays. We {have got*|has got@en.s.have_got} six lessons.',
  why:'1) С <b>are</b> наречие стоит после: we are always busy. 2) We → <b>have got</b>.',
  why2:'Be — наречие за ним. Has got — только для he/she/it.'},
 {lvl:2,text:'Tom {is usually*|usually is} at home in the evening.',
  why:'Здесь глагол — <b>is</b>, наречие идёт после него: Tom is usually at home.',
  why2:'Am/is/are + наречие: is usually, are often, am never.'},
 {lvl:2,text:'I {never drink*|don’t never drink|drink never} coffee.',
  why:'<b>Never</b> уже содержит «не», поэтому don’t не нужен: I never drink. «Drink never coffee» — неправильный порядок.',
  why2:'В английском одно отрицание на предложение. Never — и есть это отрицание.'},
 {lvl:2,text:'How {often*|many|much} do you go swimming? — Twice a week.',
  why:'Ответ «два раза в неделю» — про частоту → вопрос <b>How often</b>. How many/much — «сколько».',
  why2:'How often = как часто. Ответ: every day, twice a week, never.'},
 {type:'spell',lvl:2,say:'usually',ans:['usually'],q:'Послушай и напиши слово «обычно»',
  why:'<b>usually</b> = usual + ly, поэтому две l: usua<b>ll</b>y.',
  why2:'Запомни: usual (обычный) + ly → usually.'},
 {type:'listen',lvl:2,say:'My brother never watches cartoons.',q:'Послушай. Как часто брат смотрит мультики?',opts:['никогда','часто','иногда'],ans:0,
  why:'Прозвучало <b>never</b> — никогда. Заметь: never watches, без doesn’t.',
  why2:'Never [ˈnevə] — 0%.'},
 {lvl:2,text:'{Her*|She@en.p.possessive} brother {is often*|often is} ill in winter.',
  why:'1) «Её брат» — <b>her</b> brother (чей?). She — «она», перед существительным не стоит. 2) С is наречие после: is often ill.',
  why2:'Her = её. После is — often.'},
 {type:'read',lvl:2,text:'My sister is always happy in the morning.',q:'Прочитай вслух',
  why:'<b>always</b> — [ˈɔːlweɪz], долгое [ɔː]. <b>happy</b> — [ˈhæpi], широкое [æ]. <b>morning</b> — [ˈmɔːnɪŋ], r не произносится.',
  why2:'Свяжи «is always» [ɪz ˈɔːlweɪz] — z переходит в следующее слово.'},
 {lvl:3,text:'I can {never remember*|remember never} his name.',
  why:'С <b>can</b> наречие стоит между can и глаголом: I can never remember.',
  why2:'Помощник (can, don’t) — наречие — глагол.'},
 {lvl:3,text:'We don’t {often go*|go often} to the cinema.',
  why:'В отрицании наречие стоит после don’t, перед глаголом: we don’t often go.',
  why2:'Порядок: don’t + often + go.'},
 {lvl:3,text:'He is a good pupil. He {never forgets*|doesn’t never forget|forgets never} his homework.',
  why:'Never = «никогда не», второе отрицание doesn’t не нужно. Never стоит перед глаголом, а he → forgets.',
  why2:'Ловушка русской логики «никогда не забывает». По-английски: never forgets.'},
 {lvl:3,text:'We {usually go*|go usually} to the seaside in summer. {There are*|There is@en.p.there_is} lots of nice beaches there.',
  why:'1) Usually — перед глаголом go. 2) <b>Lots of beaches</b> — много пляжей → There are.',
  why2:'Наречие перед go. Beaches — мн. число → there are.'},
 {lvl:3,text:'My aunt {always buys*|buys always} {an*|a@en.s.a_an} apple pie for my birthday.',
  why:'1) Always — перед глаголом buys. 2) <b>Apple</b> начинается с гласного звука → an apple pie.',
  why2:'Always buys — наречие впереди. An перед гласным звуком.'},
 {type:'read',lvl:3,text:'We never go to school on Sunday.',q:'Прочитай вслух',
  why:'<b>never</b> — [ˈnevə], ударение на первый слог. <b>school</b> — [skuːl], ch читается как [k]. <b>Sunday</b> — [ˈsʌndeɪ].',
  why2:'We NEVer GO to SCHOOL on SUNday.'}
]});

/* ===================================================================== */
RU.rule({
id:'en.5.articles',
short:'<b>a/an</b> — «какой-то один» (a dog), <b>the</b> — «тот самый» (the dog, the sun), <b>без артикля</b> — еда (have breakfast), спорт (play football), предметы (Maths).',
theory:`
<p>В русском артиклей нет, поэтому их легко забыть. Думай так: артикль — это «указатель» перед существительным.</p>
<div class="box rule"><b>a / an — «один, какой-то»</b>
Впервые упоминаем: ${s('I have got a dog.')}<br>
Профессия: ${s('She is a doctor.')} ${s('He is an engineer.')}<br>
an — перед гласным звуком: ${s('an apple')}, ${s('an umbrella')}</div>
<div class="box rule"><b>the — «тот самый, понятно какой»</b>
Второй раз: ${s('I have got a dog. The dog is funny.')}<br>
Единственный в мире: ${s('the sun')}, ${s('the moon')}, ${s('the sky')}<br>
Музыкальные инструменты: ${s('play the piano')}, ${s('play the guitar')}<br>
Места развлечений: ${s('go to the cinema')}, ${s('go to the theatre')}</div>
<div class="box rule"><b>Без артикля</b>
Еда (приёмы пищи): ${s('have breakfast')}, ${s('have lunch')}, ${s('have dinner')}<br>
Спорт и игры: ${s('play football')}, ${s('play tennis')}, ${s('play chess')}<br>
Школьные предметы и языки: ${s('I like Maths.')} ${s('We speak English.')}<br>
Вообще, о всех: ${s('I like cats.')} ${s('Milk is good for you.')}<br>
Устойчивые выражения: ${s('go to school')}, ${s('go to bed')}, ${s('go to work')}, ${s('at home')}, ${s('by bus')}, ${s('by car')}</div>
<div class="box tip"><b>Как запомнить</b> «Спорт — без, музыка — с the»: ${s('play football')}, но ${s('play the guitar')}.</div>
<div class="box err"><b>Ошибки</b>
✗ I have the breakfast. → ✓ ${s('I have breakfast.')}<br>
✗ I play the football. → ✓ ${s('I play football.')}<br>
✗ She is doctor. → ✓ ${s('She is a doctor.')}<br>
Но: еда с прилагательным получает a — ${s('a big breakfast')}.</div>`,
theory2:`
<p>Представь, что ты рассказываешь другу историю. Первый раз: «Я видел <b>какую-то</b> собаку» — ${s('a dog')}. Потом: «<b>Эта</b> собака побежала» — ${s('the dog')}. Друг уже знает, о какой речь.</p>
<p>А там, где по-русски и не подумаешь про «какой-то» или «этот» — еда, спорт, школьные предметы — артикля нет: ${s('I have lunch.')} ${s('We play tennis.')}</p>
<div class="box ex"><b>Мини-история</b>
${s('I have got a cat. The cat is black.')}<br>
${s('After school I play football and then I have dinner.')}</div>`,
items:[
 {lvl:1,text:'I have got {a*|an|the} dog. {The*|A|_} dog is very funny.',
  why:'1) Собака упоминается впервые → <b>a</b> dog (dog начинается с согласного, поэтому не an). 2) Второй раз — уже понятно, какая → <b>The</b> dog.',
  why2:'Сначала «какая-то собака» (a), потом «эта собака» (the).'},
 {lvl:1,text:'Look at {the*|a|_} sun! It is so bright.',
  why:'Солнце одно на всех → <b>the</b> sun.',
  why2:'Единственное в мире: the sun, the moon, the sky.'},
 {lvl:1,text:'We play {_*|the|a} football after school.',
  why:'Спортивные игры — <b>без артикля</b>: play football.',
  why2:'Спорт — без: play football, play tennis.'},
 {lvl:1,text:'I have {_*|the|a} breakfast at eight o’clock.',
  why:'Приёмы пищи (breakfast, lunch, dinner) — <b>без артикля</b>: have breakfast.',
  why2:'Завтракать = have breakfast. Артикль не нужен.'},
 {type:'listen',lvl:1,say:'My brother plays the guitar.',q:'Послушай. Есть ли перед guitar слово the?',opts:['Да: plays the guitar','Нет: plays guitar'],ans:0,
  why:'Прозвучало <b>plays the guitar</b> [ðə ɡɪˈtɑː]. С музыкальными инструментами нужен the.',
  why2:'Музыка — с the: play the piano, play the guitar.'},
 {type:'read',lvl:1,text:'We have lunch at school.',q:'Прочитай вслух',
  why:'<b>lunch</b> — [lʌntʃ], короткое [ʌ]. <b>school</b> — [skuːl]. Артиклей тут нет — не добавляй лишних.',
  why2:'We HAVE LUNCH at SCHOOL — четыре ударных слова.'},
 {lvl:2,text:'My favourite subject is {_*|the|a} Maths.',
  why:'Школьные предметы — <b>без артикля</b>: Maths, English, History.',
  why2:'Предмет в школе — без: I like Maths.'},
 {lvl:2,text:'She is {a*|an|_} teacher, and her husband is {an*|a|_} engineer.',
  why:'Профессия → a/an. 1) Teacher начинается с согласного → <b>a</b> teacher. 2) Engineer — с гласного звука [e] → <b>an</b> engineer.',
  why2:'По-русски «она учитель», по-английски обязательно a: She is a teacher.'},
 {lvl:2,text:'Let’s go to {the*|a|_} cinema tonight!',
  why:'<b>Go to the cinema</b> — устойчивое выражение с the (так же the theatre).',
  why2:'В кино — the cinema.'},
 {lvl:2,text:'It’s late. Go to {_*|the|a} bed!',
  why:'<b>Go to bed</b> — «ложиться спать», устойчивое выражение без артикля.',
  why2:'Go to bed, go to school, go to work — без артикля.'},
 {lvl:2,text:'There {is*|are@en.p.there_is} {a*|the|_} park near my house. {The*|A|_} park is big and green.',
  why:'1) A park — один → <b>There is</b>. 2) Впервые упоминаем → <b>a</b> park. 3) Второй раз → <b>The</b> park.',
  why2:'There is + a (новое). Потом the — уже знаем, о каком парке.'},
 {type:'spell',lvl:2,say:'breakfast',ans:['breakfast'],q:'Послушай и напиши слово «завтрак»',
  why:'<b>breakfast</b> [ˈbrekfəst] = break (прервать) + fast (пост). Пишется ea, хотя звучит [e].',
  why2:'Запомни: break + fast → breakfast.'},
 {type:'listen',lvl:2,say:'I go to school by bus.',q:'Послушай. Как человек добирается до школы?',opts:['пешком','на автобусе','на машине'],ans:1,
  why:'<b>by bus</b> — на автобусе. Заметь: без артикля (by bus, by car).',
  why2:'By + транспорт без артикля: by bus, by train.'},
 {lvl:3,text:'I like {_*|the} cats, but {the*|_} cat next door is very angry.',
  why:'1) Кошки вообще → без артикля: I like cats. 2) Конкретная кошка (соседская) → <b>the</b> cat next door.',
  why2:'Обо всех — без артикля. О конкретной — the.'},
 {lvl:3,text:'My dad goes to {_*|the|a} work by {_*|the|a} car.',
  why:'1) <b>Go to work</b> — без артикля. 2) <b>By car</b> — тоже без артикля.',
  why2:'Устойчивые: go to work, by car.'},
 {lvl:3,text:'Mum makes {a*|_|the} big breakfast on Sundays.',
  why:'Обычно breakfast без артикля, но если есть прилагательное (big) — появляется <b>a</b>: a big breakfast.',
  why2:'have breakfast, но a big breakfast, a nice dinner.'},
 {lvl:3,text:'{These*|This@en.s.this_that} boys play {_*|the} basketball every Friday.',
  why:'1) Boys — мн. число → <b>These</b>. 2) Basketball — спорт → без артикля.',
  why2:'This boy, these boys. Спорт — без артикля.'},
 {lvl:3,text:'My sister can play {the*|_|a} violin, but I {can’t*|don’t can@en.s.can} play it.',
  why:'1) Инструмент → <b>the</b> violin. 2) Отрицание от can — <b>can’t</b>, без don’t.',
  why2:'Музыка — the. Can сам делает отрицание: can’t.'},
 {lvl:3,text:'{Has*|Have@en.s.have_got} your friend got {an*|a|_} umbrella? It is raining.',
  why:'1) Your friend = he/she → <b>Has</b> … got? 2) Umbrella начинается с гласного звука [ʌ] → <b>an</b>.',
  why2:'Has — для одного человека. An — перед гласным звуком.'},
 {type:'read',lvl:3,text:'My brother plays the piano and I play tennis.',q:'Прочитай вслух',
  why:'<b>the piano</b> — [ðə piˈænəʊ], ударение на «a». <b>tennis</b> — без артикля. В <b>the</b> звонкий th [ð].',
  why2:'Сравни: plays THE piano (с the), play tennis (без).'}
]});

/* ===================================================================== */
RU.rule({
id:'en.5.some_any',
short:'<b>some</b> — в утверждениях и предложениях (Would you like some tea?), <b>any</b> — в отрицаниях и вопросах (I haven’t got any milk. Have you got any pets?).',
theory:`
<p>some и any значат «несколько, немного» — когда точное количество неважно. Используются с <b>мн. числом</b> (apples) и с <b>неисчисляемыми</b> (milk, bread, water).</p>
<table class="sym"><thead><tr><th>Где</th><th>Что</th></tr></thead><tbody>
<tr><td>➕ утверждение</td><td><b>some</b>: ${s('There are some apples.')} ${s('I need some bread.')}</td></tr>
<tr><td>➖ отрицание</td><td><b>any</b>: ${s('I haven’t got any milk.')} ${s('There aren’t any eggs.')}</td></tr>
<tr><td>❓ вопрос</td><td><b>any</b>: ${s('Have you got any pets?')} ${s('Is there any juice?')}</td></tr>
<tr><td>🙏 предложение, просьба</td><td><b>some</b>: ${s('Would you like some tea?')} ${s('Can I have some water, please?')}</td></tr>
</tbody></table>
<div class="box tip"><b>Как запомнить</b> Предлагаешь или просишь — значит, ждёшь «да», значит <b>some</b>. Просто спрашиваешь или отрицаешь — <b>any</b>.</div>
<div class="box rule"><b>То же с something / anything</b>
${s('There is something in the box.')} — ${s('There isn’t anything in the box.')} — ${s('Is there anything in the box?')}</div>
<div class="box err"><b>Ошибки</b>
✗ I haven’t got no money. → ✓ ${s('I haven’t got any money.')} — два отрицания нельзя.<br>
✗ Would you like any tea? → ✓ ${s('Would you like some tea?')}<br>
<b>Особый случай:</b> any в утверждении = «любой»: ${s('Take any book you like.')} — Бери любую книгу.</div>`,
theory2:`
<p>Some — «оптимист»: он в весёлых утвердительных предложениях и когда ты что-то предлагаешь. Any — «сомневающийся»: он в вопросах («а есть ли?») и в отрицаниях («нет ни одного»).</p>
<div class="box ex"><b>Примеры</b>
${s('I have got some sweets.')} — У меня есть конфеты.<br>
${s('I haven’t got any sweets.')} — У меня нет конфет.<br>
${s('Have you got any sweets?')} — У тебя есть конфеты?<br>
${s('Would you like some sweets?')} — Хочешь конфет? (предлагаем → some)</div>`,
items:[
 {lvl:1,text:'There are {some*|any} apples on the table.',
  why:'Утвердительное предложение → <b>some</b>.',
  why2:'«На столе есть яблоки» — утверждение, some.'},
 {lvl:1,text:'I haven’t got {any*|some} brothers.',
  why:'Отрицание (haven’t) → <b>any</b>.',
  why2:'Нет ни одного брата — not … any.'},
 {lvl:1,text:'Are there {any*|some} shops near your house?',
  why:'Обычный вопрос «есть ли?» → <b>any</b>.',
  why2:'Спрашиваем, не зная ответа → any.'},
 {type:'listen',lvl:1,say:'Have you got any milk? Sorry, I haven’t got any.',q:'Послушай диалог. Есть ли молоко?',opts:['Нет, молока нет','Да, есть немного','Да, много'],ans:0,
  why:'Ответ: <b>Sorry, I haven’t got any</b> — «Извини, у меня нет (совсем)».',
  why2:'Haven’t got any = нет ни капли.'},
 {type:'read',lvl:1,text:'I have got some sweets for you.',q:'Прочитай вслух',
  why:'<b>some</b> — [sʌm], как «сам». <b>sweets</b> — [swiːts], долгий [iː] и [ts] на конце.',
  why2:'Свяжи «got some» [ɡɒt səm] — t не теряй.'},
 {lvl:1,text:'There {aren’t*|isn’t@en.p.there_is} {any*|some} eggs in the fridge.',
  why:'1) Eggs — мн. число → <b>There aren’t</b>. 2) Отрицание → <b>any</b>.',
  why2:'Яиц много (мн. число) — are. Нет ни одного — any.'},
 {lvl:2,text:'Would you like {some*|any} tea?',
  why:'<b>Would you like…?</b> — это предложение (угощаем) → <b>some</b>, хотя это вопрос.',
  why2:'Предлагаем — ждём «да» → some.'},
 {lvl:2,text:'Can I have {some*|any} water, please?',
  why:'Это <b>просьба</b> → <b>some</b>.',
  why2:'Просим — ждём «да» → some.'},
 {lvl:2,text:'We need {some*|any} bread and {some*|any} cheese for the sandwiches.',
  why:'Утверждение (we need) → <b>some</b> в обоих местах.',
  why2:'«Нам нужно немного хлеба и сыра» — утверждение, some.'},
 {lvl:2,text:'— Is there {any*|some} juice in the bottle? — No, there isn’t {any*|some}.',
  why:'1) Вопрос «есть ли?» → <b>any</b>. 2) Отрицание (isn’t) → <b>any</b>.',
  why2:'Вопрос и отрицание — оба раза any.'},
 {type:'spell',lvl:2,say:'some bread',ans:['some bread'],q:'Послушай и напиши (два слова)',
  why:'<b>some bread</b> — немного хлеба. Some пишется с немой e на конце, bread — с ea, хотя звучит [e].',
  why2:'Some [sʌm] — o читается как [ʌ]. Bread [bred].'},
 {type:'listen',lvl:2,say:'Would you like some cake? Yes, please.',q:'Послушай. Что предложили?',opts:['торт','чай','конфеты'],ans:0,
  why:'<b>some cake</b> — торт (кусочек торта). Заметь: в предложении-угощении some.',
  why2:'Would you like some… — хочешь…? Cake = торт.'},
 {lvl:2,text:'My friends {have got*|has got@en.s.have_got} {some*|any} new computer games.',
  why:'1) My friends = they → <b>have got</b>. 2) Утверждение → <b>some</b>.',
  why2:'Они — have got. Есть игры — some.'},
 {lvl:3,text:'You can take {any*|some} book you like — they are all interesting.',
  why:'Здесь any = «<b>любой</b>»: бери любую книгу. Some + ед. число значило бы «какую-то», это не подходит.',
  why2:'Any в утверждении — «любой, какой хочешь».'},
 {lvl:3,text:'There isn’t {anything*|something|nothing} in the box.',
  why:'Отрицание isn’t → <b>anything</b>. «Isn’t nothing» — двойное отрицание, нельзя.',
  why2:'There isn’t anything = There is nothing. Одно отрицание!'},
 {lvl:3,text:'I haven’t got {any*|no|some} money.',
  why:'В отрицании (haven’t) — <b>any</b>. «Haven’t got no» — двойное отрицание.',
  why2:'По-русски «нет никаких денег» — два «не». По-английски — одно: haven’t got any.'},
 {lvl:3,text:'{Are*|Is@en.s.to_be} there {any*|some} {tomatoes*|tomatos@en.s.plurals} in the bag?',
  why:'1) Tomatoes — мн. число → <b>Are</b> there. 2) Вопрос → <b>any</b>. 3) Tomato → <b>tomatoes</b> (после o добавляем -es).',
  why2:'Potato → potatoes, tomato → tomatoes. Вопрос — any.'},
 {lvl:3,text:'Let’s buy {some*|any} flowers for {our*|us@en.p.possessive} teacher.',
  why:'1) Утверждение-предложение (Let’s buy) → <b>some</b>. 2) «Наш учитель» — притяжательное <b>our</b>; us — «нас».',
  why2:'Our = наш (чей?). Some — купим немного цветов.'},
 {type:'read',lvl:3,text:'Are there any good films on TV tonight?',q:'Прочитай вслух',
  why:'<b>any</b> — [ˈeni], как «эни». <b>films</b> — [fɪlmz]. <b>TV</b> — [ˌtiːˈviː]. Голос вверх в конце вопроса.',
  why2:'Свяжи «Are there any» [ɑː ðər ˈeni].'}
]});

/* ===================================================================== */
RU.rule({
id:'en.5.prep_time',
short:'<b>at</b> — точное время и at night, at the weekend; <b>in</b> — части дня, месяцы, сезоны, годы; <b>on</b> — дни и даты (on Monday morning).',
theory:`
<p>По-русски «в семь», «в мае», «в понедельник» — везде «в». По-английски три разных предлога!</p>
<table class="sym"><thead><tr><th>Предлог</th><th>Когда</th></tr></thead><tbody>
<tr><td><b>AT</b> — точка</td><td>точное время: ${s('at seven o’clock')}, ${s('at half past four')}<br>${s('at night')}, ${s('at the weekend')}, ${s('at Christmas')}, ${s('at breakfast')}</td></tr>
<tr><td><b>IN</b> — длинный период</td><td>части дня: ${s('in the morning')}, ${s('in the afternoon')}, ${s('in the evening')}<br>месяцы: ${s('in May')}; сезоны: ${s('in winter')}; годы: ${s('in twenty twenty')}</td></tr>
<tr><td><b>ON</b> — день</td><td>дни недели: ${s('on Monday')}, ${s('on Mondays')}; даты: ${s('on the fifth of May')}<br>${s('on my birthday')}, ${s('on Christmas Day')}, ${s('on Monday morning')}</td></tr>
</tbody></table>
<div class="box tip"><b>Как запомнить: пирамида</b> AT — маленькая точка (час), ON — день, IN — большой кусок (месяц, сезон, год).</div>
<div class="box err"><b>Ловушки</b>
${s('in the morning')}, но ${s('at night')} — запомни парой!<br>
${s('in the morning')}, но ${s('on Monday morning')} — если есть день, побеждает <b>on</b>.<br>
<b>Без предлога</b>: every, this, next, last, today, tomorrow, yesterday — ${s('every Sunday')}, ${s('next week')}, ${s('this morning')}, ${s('tomorrow')}.<br>
✗ on every Sunday → ✓ ${s('every Sunday')}</div>`,
theory2:`
<p>Представь часы, календарь и год:</p>
<ol class="steps"><li>Смотришь на <b>часы</b> — <b>at</b>: ${s('at five')}.</li>
<li>Смотришь на <b>день в календаре</b> — <b>on</b>: ${s('on Friday')}.</li>
<li>Смотришь на <b>целый месяц или сезон</b> — <b>in</b>: ${s('in July')}, ${s('in summer')}.</li></ol>
<div class="box ex"><b>Одна фраза — три предлога</b>
${s('I get up at seven in the morning on Mondays.')}</div>`,
items:[
 {lvl:1,text:'The lesson starts {at*|in|on} nine o’clock.',
  why:'Точное время (на часах) → <b>at</b> nine o’clock.',
  why2:'Часы — at.'},
 {lvl:1,text:'My birthday is {in*|on|at} May.',
  why:'Месяц → <b>in</b> May.',
  why2:'Месяцы, сезоны, годы — in.'},
 {lvl:1,text:'We have English {on*|in|at} Tuesday.',
  why:'День недели → <b>on</b> Tuesday.',
  why2:'Дни — on: on Monday, on Tuesday.'},
 {lvl:1,text:'I do my homework {in*|at|on} the evening.',
  why:'Часть дня → <b>in</b> the evening.',
  why2:'In the morning, in the afternoon, in the evening.'},
 {type:'listen',lvl:1,say:'See you on Friday!',q:'Послушай. Когда встреча?',opts:['в пятницу','в субботу','в четверг'],ans:0,
  why:'<b>on Friday</b> — в пятницу. Четверг — Thursday, суббота — Saturday.',
  why2:'Friday [ˈfraɪdeɪ] = пятница. С днями — on.'},
 {type:'read',lvl:1,text:'I get up at seven in the morning.',q:'Прочитай вслух',
  why:'<b>at</b> — коротко [ət]. <b>seven</b> — [ˈsevn]. <b>in the morning</b> — [ɪn ðə ˈmɔːnɪŋ], th звонкий.',
  why2:'Два предлога: AT (часы) и IN (утро). Читай связно: «at seven» как одно слово.'},
 {lvl:2,text:'Owls hunt {at*|in|on} night.',
  why:'Запомни: <b>at night</b> (ночью), хотя in the morning.',
  why2:'Пара-исключение: in the morning — at night.'},
 {lvl:2,text:'It often snows {in*|on|at} winter.',
  why:'Сезон → <b>in</b> winter.',
  why2:'Сезоны — in: in winter, in summer.'},
 {lvl:2,text:'We go swimming {on*|in|at} Saturday morning.',
  why:'Есть день недели (Saturday) → <b>on</b>, даже если дальше morning.',
  why2:'День побеждает: on Saturday morning.'},
 {lvl:2,text:'What do you do {at*|in|on} the weekend?',
  why:'В британском английском — <b>at the weekend</b>.',
  why2:'На выходных = at the weekend (так в учебниках Spotlight).'},
 {lvl:2,text:'My cousins {come*|comes@en.p.ps_basic} to see us {at*|on|in} Christmas.',
  why:'1) My cousins = they → <b>come</b> без -s. 2) Праздник как период → <b>at</b> Christmas.',
  why2:'They come. At Christmas — на Рождество (праздники).'},
 {type:'spell',lvl:2,say:'Wednesday',ans:['Wednesday'],q:'Послушай и напиши день недели (с большой буквы)',
  why:'<b>Wednesday</b> [ˈwenzdeɪ] — первая d не читается! Пиши: Wed-nes-day.',
  why2:'Запомни по слогам «Вед-нес-дэй», а говори «Wenzday».'},
 {type:'listen',lvl:2,say:'My piano lesson is at half past four.',q:'Послушай. Во сколько урок?',opts:['в 4:30','в 3:30','в 4:00','в 5:30'],ans:0,
  why:'<b>half past four</b> — половина пятого, 4:30. Перед временем — at.',
  why2:'Half past = «половина после». Half past four = 4:30.'},
 {lvl:3,text:'We see our grandparents {_*|on|in} every Sunday.',
  why:'Перед <b>every</b> предлог не нужен: every Sunday.',
  why2:'Every, next, last, this — без предлога.'},
 {lvl:3,text:'My birthday is {on*|in|at} the fifth of May.',
  why:'Дата (конкретный день) → <b>on</b> the fifth of May. Только месяц — in May, но день месяца — on.',
  why2:'Дата — это день → on.'},
 {lvl:3,text:'I was born {in*|on|at} 2014.',
  why:'Год → <b>in</b> 2014.',
  why2:'Годы — in.'},
 {lvl:3,text:'The shop is closed {on*|in|at} Christmas Day.',
  why:'<b>Christmas Day</b> — конкретный день → on. Сравни: at Christmas (праздничный период).',
  why2:'Day = день → on.'},
 {lvl:3,text:'{When*|Where@en.p.wh_questions} do you go to bed? — {At*|In|On} ten o’clock.',
  why:'1) Ответ — время, значит вопрос <b>When</b> (когда). 2) Точное время → <b>At</b> ten o’clock.',
  why2:'When = когда, Where = где. Ровно в десять — at.'},
 {lvl:3,text:'We {were*|was@en.p.was_were} at the seaside {in*|on|at} August.',
  why:'1) We → <b>were</b>. 2) Месяц → <b>in</b> August.',
  why2:'We were, I was. Месяц — in.'},
 {lvl:3,text:'Tom {has got*|have got@en.s.have_got} a guitar lesson {on*|in|at} Monday afternoon.',
  why:'1) Tom = he → <b>has got</b>. 2) Есть день (Monday) → <b>on</b> Monday afternoon.',
  why2:'He has got. День + часть дня — on.'},
 {type:'read',lvl:3,text:'We play football on Saturday afternoon.',q:'Прочитай вслух',
  why:'<b>Saturday</b> — [ˈsætədeɪ]. <b>afternoon</b> — [ˌɑːftəˈnuːn], ударение на последний слог!',
  why2:'Свяжи «on Saturday» [ɒn ˈsætədeɪ]. AfterNOON.'}
]});

/* ===================================================================== */
RU.rule({
id:'en.5.pronouns',
short:'Перед глаголом — I, he, she, we, they; после глагола и предлога — me, him, her, us, them: <b>She</b> helps <b>me</b>. I like <b>it</b>.',
theory:`
<p>У английских местоимений два вида: «<b>кто делает</b>» (подлежащее) и «<b>кого/кому</b>» (после глагола или предлога).</p>
<table class="sym"><thead><tr><th>Кто?</th><th>Кого? Кому?</th></tr></thead><tbody>
<tr><td>${s('I')} — я</td><td>${s('me')} — меня, мне</td></tr>
<tr><td>${s('you')} — ты, вы</td><td>${s('you')} — тебя, вас</td></tr>
<tr><td>${s('he')} — он</td><td>${s('him')} — его, ему</td></tr>
<tr><td>${s('she')} — она</td><td>${s('her')} — её, ей</td></tr>
<tr><td>${s('it')} — оно (предмет, животное)</td><td>${s('it')} — его, её</td></tr>
<tr><td>${s('we')} — мы</td><td>${s('us')} — нас, нам</td></tr>
<tr><td>${s('they')} — они</td><td>${s('them')} — их, им</td></tr>
</tbody></table>
<div class="box rule"><b>Правило</b>
<b>Перед</b> глаголом — I, he, she, we, they: ${s('He helps me.')}<br>
<b>После</b> глагола: ${s('I help him.')} ${s('We visit them.')}<br>
<b>После</b> предлога: ${s('Come with us.')} ${s('This is for her.')} ${s('Look at me.')}</div>
<div class="box err"><b>Ловушки русскоязычных</b>
✗ Me and my friend go… → ✓ ${s('My friend and I go to school together.')} — себя ставим на второе место и говорим I.<br>
✗ I like. (о торте) → ✓ ${s('I like it.')} — в английском <b>it</b> обязательно, даже если по-русски «мне нравится».<br>
✗ Is cold. → ✓ ${s('It is cold.')} — у английского предложения всегда есть подлежащее.<br>
${s('Me too!')} — «Я тоже!» — так говорят в разговоре.</div>`,
theory2:`
<p>Представь, что местоимение «переодевается», когда меняет место. Перед глаголом оно в костюме <b>«кто»</b>: I, he, she. После глагола надевает костюм <b>«кого»</b>: me, him, her.</p>
<div class="box ex"><b>Примеры</b>
${s('I love my cat and she loves me.')}<br>
${s('Where are my keys? I can’t find them.')}<br>
${s('Can you help me?')}</div>`,
items:[
 {lvl:1,text:'This is my friend Max. {He*|Him|His} is ten.',
  why:'Max — подлежащее (кто? он) перед глаголом is → <b>He</b>. Him — «его» после глагола, His — «его» (чей).',
  why2:'Перед глаголом — he.'},
 {lvl:1,text:'I like Anna. I often help {her*|she}.',
  why:'После глагола help — форма «кого»: help <b>her</b>.',
  why2:'Помогаю (кому?) ей — her.'},
 {lvl:1,text:'Where are my keys? I can’t find {them*|they}.',
  why:'Keys — много → «их» после глагола find: <b>them</b>.',
  why2:'They — «они» (перед глаголом), them — «их» (после).'},
 {lvl:1,text:'{We*|Us} are in the same class.',
  why:'Подлежащее перед глаголом are → <b>We</b>. Us — «нас».',
  why2:'Мы (кто?) — we.'},
 {type:'listen',lvl:1,say:'Can you help me, please?',q:'Послушай. Кому нужна помощь?',opts:['мне (говорящему)','ему','им'],ans:0,
  why:'<b>help me</b> — помоги мне. Ему было бы help him, им — help them.',
  why2:'Me [miː] — меня, мне.'},
 {type:'read',lvl:1,text:'I love my cat and she loves me.',q:'Прочитай вслух',
  why:'<b>loves</b> — [lʌvz], звонкое [z] на конце. <b>me</b> — долгое [iː]. <b>love</b> — o читается как [ʌ].',
  why2:'I LOVE my CAT and she LOVES ME.'},
 {lvl:2,text:'Look at {him*|he}! He is so funny.',
  why:'После предлога <b>at</b> — форма «кого»: look at <b>him</b>.',
  why2:'Предлог — значит костюм «кого»: him.'},
 {lvl:2,text:'My grandparents live in a village. We visit {them*|they|their} every summer.',
  why:'После глагола visit — <b>them</b> (их). They — «они», their — «их» (чей).',
  why2:'Навещаем (кого?) их — them.'},
 {lvl:2,text:'This cake is delicious! I really like {it*|_}.',
  why:'В английском у like обязательно есть дополнение: I like <b>it</b>. Без it нельзя, хотя по-русски «мне очень нравится».',
  why2:'Типичная ошибка: «I like». Правильно — I like it.'},
 {lvl:2,text:'Kate and {I*|me} are friends.',
  why:'Это подлежащее (кто? Кейт и я) → <b>I</b>. Проверка: убери Kate — «I am a friend», а не «me am».',
  why2:'Убери второго человека и проверь: I are friends → I.'},
 {lvl:2,text:'My sister {can’t*|doesn’t can@en.s.can} swim, so I am teaching {her*|she}.',
  why:'1) Отрицание от can — <b>can’t</b>. 2) После teaching — <b>her</b> (её).',
  why2:'Can сам делает отрицание. Учу (кого?) её — her.'},
 {type:'spell',lvl:2,say:'Give it to me.',ans:['give it to me'],q:'Послушай и напиши фразу',
  why:'<b>Give it to me.</b> — Дай это мне. После to — <b>me</b>.',
  why2:'Четыре слова: give · it · to · me.'},
 {type:'listen',lvl:2,say:'Where is Tom? I can’t see him.',q:'Послушай. Кого не видно?',opts:['его (Тома)','её','их'],ans:0,
  why:'<b>I can’t see him</b> — не вижу его. Him = Tom.',
  why2:'Him — его (о мальчике).'},
 {lvl:3,text:'{My friend and I*|Me and my friend|I and my friend} go to school together.',
  why:'Подлежащее → <b>I</b>, и по вежливости себя называют вторым: My friend and I.',
  why2:'«Me and my friend» — разговорная ошибка. «I and my friend» — невежливо. Правильно: My friend and I.'},
 {lvl:3,text:'This present is for you and {me*|I}.',
  why:'После предлога <b>for</b> — форма «кого»: for you and <b>me</b>. Проверка: убери you — «for me».',
  why2:'Предлог → me. «For I» не говорят.'},
 {lvl:3,text:'— I like ice cream. — {Me*|I} too!',
  why:'В разговоре «Я тоже!» — <b>Me too!</b>',
  why2:'Устойчивая фраза: Me too!'},
 {lvl:3,text:'{It*|_|This} is cold today.',
  why:'По-русски «Сегодня холодно» — без подлежащего. В английском нужно <b>It</b>: It is cold.',
  why2:'Погода, время: It is cold. It is late. It is five o’clock.'},
 {lvl:3,text:'{Those*|That@en.s.this_that} shoes are new. Do you like {them*|it|they}?',
  why:'1) Shoes — мн. число → <b>Those</b>. 2) Туфли — «их», после like → <b>them</b>.',
  why2:'Those shoes — те туфли. Нравятся (кто?) они → like them.'},
 {lvl:3,text:'Our teacher {is*|are@en.s.to_be} very kind. We all love {her*|she|hers}.',
  why:'1) Our teacher — один человек → <b>is</b>. 2) После love — <b>her</b>. She — «она» (перед глаголом), hers — «её» без существительного (чей?).',
  why2:'Teacher is. Любим (кого?) её — her.'},
 {lvl:3,text:'Mum, {where*|what@en.p.wh_questions} is my bag? I can’t find {it*|them|its}.',
  why:'1) Ищем место → <b>where</b>. 2) Bag — один предмет → <b>it</b>. Its — «его» (чей).',
  why2:'Где? — where. Сумка одна → it.'},
 {type:'read',lvl:3,text:'Please call us when you see them.',q:'Прочитай вслух',
  why:'<b>us</b> — [ʌs], короткое. <b>them</b> — [ðem], звонкий th: язык между зубами.',
  why2:'PLEASE CALL us when you SEE them.'}
]});

/* ===================================================================== */
RU.rule({
id:'en.5.ph_th',
short:'th — язык между зубами: глухой /θ/ (think, three) и звонкий /ð/ (this, mother). Не заменяй на с, з, ф, т, д: think ≠ sink, mouth ≠ mouse.',
theory:`
<p>Звуков th в русском нет. Если заменить их на «с», «з», «ф», «т» или «д» — меняется слово!</p>
<div class="box rule"><b>Как произносить</b>
Кончик языка <b>слегка</b> просунь между зубами (не кусай!) и выдыхай воздух.<br>
Без голоса — <b>/θ/</b> глухой: ${s('think')} ${tr('θɪŋk')}, ${s('three')}, ${s('thank you')}, ${s('Thursday')}, ${s('mouth')}, ${s('teeth')}, ${s('birthday')}<br>
С голосом (горло дрожит) — <b>/ð/</b> звонкий: ${s('this')} ${tr('ðɪs')}, ${s('the')}, ${s('they')}, ${s('then')}, ${s('mother')}, ${s('father')}, ${s('brother')}</div>
<table class="sym"><thead><tr><th>Правильно</th><th>Если ошибёшься</th></tr></thead><tbody>
<tr><td>${s('think')} — думать</td><td>${s('sink')} — раковина</td></tr>
<tr><td>${s('mouth')} — рот</td><td>${s('mouse')} — мышь</td></tr>
<tr><td>${s('thank')} — благодарить</td><td>${s('sank')} — утонул</td></tr>
<tr><td>${s('three')} — три</td><td>${s('free')} — свободный, ${s('tree')} — дерево</td></tr>
<tr><td>${s('thick')} — толстый</td><td>${s('sick')} — больной</td></tr>
<tr><td>${s('they')} — они</td><td>${s('day')} — день</td></tr>
<tr><td>${s('then')} — потом</td><td>${s('den')} — логово</td></tr>
</tbody></table>
<div class="box tip"><b>Как угадать, какой th</b>
Звонкий /ð/ — в маленьких служебных словах (${s('the')}, ${s('this')}, ${s('that')}, ${s('they')}, ${s('them')}, ${s('there')}) и между гласными (${s('mother')}, ${s('father')}).<br>
Глухой /θ/ — в «смысловых» словах в начале и в конце: ${s('think')}, ${s('thank')}, ${s('bath')}, ${s('month')}.<br>
Пара: ${s('breath')} /θ/ — дыхание, ${s('breathe')} /ð/ — дышать.</div>
<div class="box err"><b>Проверь себя у зеркала</b> Если кончик языка не виден — звук неправильный.</div>`,
theory2:`
<p>Представь, что ты змея, которая устала: язык чуть-чуть высунут, и ты тихо выдыхаешь — это ${s('think')}. А теперь включи голос, будто жужжишь с высунутым языком — это ${s('this')}.</p>
<div class="box ex"><b>Потренируйся</b>
${s('Thank you!')} ${s('three thin things')} ${s('This is my mother.')}</div>
<p>Главное — не «сэнк ю» и не «зис», а язык между зубами.</p>`,
items:[
 {type:'listen',lvl:1,say:'think',q:'Послушай. Какое слово прозвучало?',opts:['think','sink','pink'],ans:0,
  why:'Прозвучало <b>think</b> [θɪŋk] — думать. В sink [sɪŋk] язык за зубами, это «с».',
  why2:'Th — язык между зубами, поток воздуха мягкий, «шепелявый».'},
 {type:'listen',lvl:1,say:'mouse',q:'Послушай. Какое слово прозвучало?',opts:['mouth','mouse','month','moss'],ans:1,
  why:'Прозвучало <b>mouse</b> [maʊs] — мышь, на конце обычное [s]. Mouth [maʊθ] — рот, язык между зубами.',
  why2:'Mouse — свист «с». Mouth — мягкое «шепелявое» θ.'},
 {type:'listen',lvl:1,say:'three',q:'Послушай. Какое слово прозвучало?',opts:['tree','free','three','see'],ans:2,
  why:'<b>three</b> [θriː] — три. Tree [triː] начинается с [t], free [friː] — с [f].',
  why2:'Русские часто говорят «фри» или «три» — но это другие слова!'},
 {type:'choice',lvl:1,q:'Какой звук в слове <b>this</b>?',opts:['/θ/ — глухой, как в think','/ð/ — звонкий, как в mother','/s/ — как в sun','/z/ — как в zoo'],ans:1,sayAfter:'this',
  why:'<b>this</b> [ðɪs] — звонкий th, как в mother. Это маленькое служебное слово — в таких th почти всегда звонкий.',
  why2:'The, this, that, they — звонкий /ð/.'},
 {type:'read',lvl:1,text:'Thank you for this book.',q:'Прочитай вслух',
  why:'<b>Thank</b> — глухой [θ], язык между зубами, не «сэнк». <b>this</b> — звонкий [ð], не «зис».',
  why2:'Два разных th: THank — без голоса, THis — с голосом.'},
 {type:'listen',lvl:2,say:'they',q:'Послушай. Какое слово прозвучало?',opts:['day','they','pay','say'],ans:1,
  why:'<b>they</b> [ðeɪ] — они. Day [deɪ] — день, начинается с [d].',
  why2:'They — язык между зубами + голос. Day — язык за зубами.'},
 {type:'listen',lvl:2,say:'then',q:'Послушай. Какое слово прозвучало?',opts:['den','ten','then','pen'],ans:2,
  why:'<b>then</b> [ðen] — потом. Den — [d], ten — [t].',
  why2:'Then — звонкий th, «мягкое жужжание» с языком между зубами.'},
 {type:'listen',lvl:2,say:'thank',q:'Послушай. Какое слово прозвучало?',opts:['sank','thank','tank','bank'],ans:1,
  why:'<b>thank</b> [θæŋk] — благодарить. Sank — [s], tank — [t].',
  why2:'Thank you — «сэнкью» неправильно, нужен θ.'},
 {type:'choice',lvl:2,q:'В каком слове th — <b>глухой</b> /θ/?',opts:['mother','brother','birthday','those'],ans:2,sayAfter:'birthday',
  why:'<b>birthday</b> [ˈbɜːθdeɪ] — глухой /θ/. В mother, brother (между гласными) и those (служебное слово) — звонкий /ð/.',
  why2:'Birth — «рождение», смысловое слово, θ на конце слога — глухой.'},
 {type:'spell',lvl:2,say:'Thursday',ans:['Thursday'],q:'Послушай и напиши день недели (с большой буквы)',
  why:'<b>Thursday</b> [ˈθɜːzdeɪ] — четверг. Th-ur-s-day.',
  why2:'Не путай с Tuesday (вторник) — там нет th.'},
 {type:'spell',lvl:2,say:'mouth',ans:['mouth'],q:'Послушай и напиши слово «рот»',
  why:'<b>mouth</b> [maʊθ] — ou + th на конце. Mouse (мышь) — se на конце.',
  why2:'Mou-th: звук [θ] на конце пишется th.'},
 {type:'read',lvl:2,text:'This is my mother and that is my father.',q:'Прочитай вслух',
  why:'Все th здесь звонкие [ð]: <b>this, mother, that, father</b>. Язык между зубами и голос.',
  why2:'Не «зис», «мазэр», «зэт», «фазэр» — язык должен быть виден.'},
 {type:'read',lvl:2,text:'My brother is thirteen this Thursday.',q:'Прочитай вслух',
  why:'<b>brother, this</b> — звонкий [ð]; <b>thirteen, Thursday</b> — глухой [θ]. В thirteen ударение на конце: [ˌθɜːˈtiːn].',
  why2:'ThirTEEN (13) — ударение на -teen, иначе услышат thirty (30).'},
 {lvl:2,text:'I {think*|sink} {these*|this@en.s.this_that} shoes are too small.',
  why:'1) «Я думаю» — <b>think</b> (sink — раковина). 2) Shoes — мн. число → <b>these</b>.',
  why2:'Think = думать. Много туфель — these.'},
 {type:'listen',lvl:3,say:'thick',q:'Послушай. Какое слово прозвучало?',opts:['sick','thick','tick','fix'],ans:1,
  why:'<b>thick</b> [θɪk] — толстый. Sick [sɪk] — больной.',
  why2:'A thick book — толстая книга. Θ — «шепелявый» звук.'},
 {type:'listen',lvl:3,say:'sink',q:'Послушай. Какое слово прозвучало? (Осторожно!)',opts:['think','sink','thing','zinc'],ans:1,
  why:'Прозвучало <b>sink</b> [sɪŋk] — обычное [s], язык за зубами. Think — [θ].',
  why2:'Теперь наоборот: уши должны отличать [s] от [θ].'},
 {type:'choice',lvl:3,q:'В каком слове th <b>звонкий</b> /ð/?',opts:['breath (дыхание)','breathe (дышать)','bath (ванна)'],ans:1,sayAfter:'breath, breathe',
  why:'<b>breathe</b> [briːð] — глагол «дышать», звонкий. <b>breath</b> [breθ] — существительное, глухой. Bath — глухой.',
  why2:'Немая e на конце — сигнал звонкого: breathe, bathe (купаться).'},
 {type:'choice',lvl:3,q:'Сколько раз звучит /ð/ в фразе <b>«This is the mother of that boy»</b>?',opts:['2','3','4','5'],ans:2,sayAfter:'This is the mother of that boy.',
  why:'<b>This, the, mother, that</b> — четыре звонких [ð].',
  why2:'Служебные слова (this, the, that) + mother — между гласными.'},
 {lvl:3,text:'There {are*|is@en.p.there_is} {three*|tree} birds in that {tree*|three}.',
  why:'1) Birds — мн. число → <b>There are</b>. 2) Три птицы — <b>three</b>. 3) На дереве — <b>tree</b>.',
  why2:'Three [θriː] — три, tree [triː] — дерево. Перепутаешь звук — перепутаешь смысл.'},
 {lvl:3,text:'{Thank*|Sank} you! {This*|These@en.s.this_that} is a great present.',
  why:'1) «Спасибо» — <b>Thank</b> you. 2) Present — один подарок, и is → <b>This</b>.',
  why2:'Thank you — благодарность. This is — один предмет.'},
 {lvl:3,text:'My brother {can*|cans@en.s.can} run very fast. He is {thin*|sin|tin} and strong.',
  why:'1) Can не меняется: he <b>can</b>. 2) <b>thin</b> [θɪn] — худой. Sin — грех, tin — жесть.',
  why2:'Can — без -s. Thin — худой, «шепелявый» θ.'},
 {type:'read',lvl:3,text:'These three brothers think that maths is easy.',q:'Прочитай вслух',
  why:'Звонкие [ð]: <b>these, brothers, that</b>. Глухие [θ]: <b>three, think, maths</b>.',
  why2:'Чередуй: ðiːz θriː ˈbrʌðəz θɪŋk ðæt mæθs.'}
]});

/* ===================================================================== */
RU.rule({
id:'en.5.ph_i',
short:'/ɪ/ — короткий, расслабленный (ship, sit, live); /iː/ — долгий, с улыбкой (sheep, seat, leave). Перепутаешь — получится другое слово.',
theory:`
<p>По-русски «и» одно. По-английски их два, и от этого зависит смысл!</p>
<div class="box rule"><b>Два звука</b>
<b>/ɪ/</b> — короткий, губы расслаблены, звук между «и» и «ы»: ${s('ship')}, ${s('sit')}, ${s('live')}, ${s('big')}, ${s('fish')}, ${s('it')}<br>
<b>/iː/</b> — долгий, губы в улыбке, как «ии-и»: ${s('sheep')}, ${s('seat')}, ${s('leave')}, ${s('see')}, ${s('eat')}, ${s('green')}</div>
<table class="sym"><thead><tr><th>/ɪ/</th><th>/iː/</th></tr></thead><tbody>
<tr><td>${s('ship')} — корабль</td><td>${s('sheep')} — овца</td></tr>
<tr><td>${s('live')} — жить</td><td>${s('leave')} — уходить</td></tr>
<tr><td>${s('hit')} — ударить</td><td>${s('heat')} — жара</td></tr>
<tr><td>${s('fill')} — наполнять</td><td>${s('feel')} — чувствовать</td></tr>
<tr><td>${s('sit')} — сидеть</td><td>${s('seat')} — место, сиденье</td></tr>
<tr><td>${s('chip')} — чипс</td><td>${s('cheap')} — дешёвый</td></tr>
</tbody></table>
<div class="box tip"><b>Как угадать по буквам</b>
/ɪ/ — буква <b>i</b> в закрытом слоге: big, sit, milk.<br>
/iː/ — <b>ee</b>, <b>ea</b>, <b>e</b> в открытом слоге: ${s('tree')}, ${s('tea')}, ${s('he')}.</div>
<div class="box err"><b>Слова-хитрецы</b>
${s('women')} ${tr('ˈwɪmɪn')} — o читается как /ɪ/! ${s('English')} ${tr('ˈɪŋɡlɪʃ')} — E в начале как /ɪ/. ${s('busy')} ${tr('ˈbɪzi')} — u как /ɪ/. ${s('people')} ${tr('ˈpiːpl')} — eo как /iː/.</div>`,
theory2:`
<p>Представь: <b>/iː/</b> — это когда тебя фотографируют и ты долго говоришь «сы-ы-ыр» с улыбкой: ${s('cheese')}. А <b>/ɪ/</b> — быстрый, ленивый звук, будто ты не успел улыбнуться: ${s('fish')}.</p>
<div class="box ex"><b>Слушай разницу</b>
${s('ship — sheep')}<br>${s('sit — seat')}<br>${s('live — leave')}</div>
<p>Ошибёшься — и вместо «Я живу здесь» (${s('I live here.')}) скажешь «Я ухожу отсюда» (${s('I leave here.')}).</p>`,
items:[
 {type:'listen',lvl:1,say:'sheep',q:'Послушай. Какое слово прозвучало?',opts:['ship','sheep','shop'],ans:1,
  why:'<b>sheep</b> [ʃiːp] — овца, долгий звук [iː]. Ship [ʃɪp] — корабль, звук короткий.',
  why2:'Ee — долгое «ии». Sheep тянется дольше, чем ship.'},
 {type:'listen',lvl:1,say:'live',q:'Послушай. Какое слово прозвучало?',opts:['live','leave','love'],ans:0,
  why:'<b>live</b> [lɪv] — жить, короткий [ɪ]. Leave [liːv] — уходить, долгий.',
  why2:'I live in Moscow — короткое, быстрое i.'},
 {type:'listen',lvl:1,say:'heat',q:'Послушай. Какое слово прозвучало?',opts:['hit','heat','hat'],ans:1,
  why:'<b>heat</b> [hiːt] — жара, долгий [iː]. Hit [hɪt] — ударить, короткий.',
  why2:'Ea — долгое «ии»: heat, eat, tea.'},
 {type:'choice',lvl:1,q:'Какой звук в слове <b>green</b>?',opts:['/iː/ — долгий','/ɪ/ — короткий'],ans:0,sayAfter:'green',
  why:'<b>green</b> [ɡriːn] — буквы ee дают долгий [iː].',
  why2:'Ee всегда долгое: tree, see, green, sheep.'},
 {type:'read',lvl:1,text:'Please sit in this seat.',q:'Прочитай вслух',
  why:'<b>sit</b> [sɪt] — короткий, <b>seat</b> [siːt] — долгий. <b>Please</b> — тоже долгий [iː]. <b>in, this</b> — короткие.',
  why2:'Тяни «ии» в please и seat, а sit, in, this — быстро.'},
 {type:'listen',lvl:2,say:'fill',q:'Послушай. Какое слово прозвучало?',opts:['feel','fill','fall'],ans:1,
  why:'<b>fill</b> [fɪl] — наполнять, короткий. Feel [fiːl] — чувствовать, долгий.',
  why2:'Fill the glass — наполни стакан.'},
 {type:'listen',lvl:2,say:'seat',q:'Послушай. Какое слово прозвучало?',opts:['sit','seat','set'],ans:1,
  why:'<b>seat</b> [siːt] — место, долгий. Sit [sɪt] — сидеть, короткий.',
  why2:'Ea → [iː]: seat, eat, heat.'},
 {type:'choice',lvl:2,q:'В каком слове <b>долгий</b> /iː/?',opts:['fish','big','tea','milk'],ans:2,sayAfter:'tea',
  why:'<b>tea</b> [tiː] — ea даёт долгий звук. В fish, big, milk — i в закрытом слоге, короткий [ɪ].',
  why2:'i + согласная в конце — короткий: fish, big, milk.'},
 {type:'spell',lvl:2,say:'sheep',ans:['sheep'],q:'Послушай и напиши слово «овца»',
  why:'<b>sheep</b> — долгий [iː] пишется ee.',
  why2:'Sh + ee + p.'},
 {type:'spell',lvl:2,say:'leave',ans:['leave'],q:'Послушай и напиши слово «уходить»',
  why:'<b>leave</b> [liːv] — долгий звук пишется ea, и немая e на конце.',
  why2:'L-ea-ve. Не путай с live (жить).'},
 {type:'read',lvl:2,text:'The big sheep is sleeping on the green hill.',q:'Прочитай вслух',
  why:'Долгие [iː]: <b>sheep, sleeping, green</b>. Короткие [ɪ]: <b>big, is, hill</b>.',
  why2:'Чередуй: big (коротко) — sheep (долго) — is (коротко) — sleeping (долго).'},
 {lvl:2,text:'There {is*|are@en.p.there_is} a big {ship*|sheep} in the port.',
  why:'1) A ship — один → <b>There is</b>. 2) В порту — корабль, <b>ship</b> (короткий [ɪ]). Sheep — овца.',
  why2:'Ship — корабль, sheep — овца. В порту — корабли.'},
 {lvl:2,text:'There are three {sheep*|sheeps@en.s.plurals} in the field. They {eat*|it} grass.',
  why:'1) <b>Sheep</b> — одинаково в ед. и мн. числе. 2) Они едят — <b>eat</b> [iːt]. It [ɪt] — «оно».',
  why2:'One sheep, three sheep. Eat — долгое, it — короткое.'},
 {type:'listen',lvl:3,say:'chip',q:'Послушай. Какое слово прозвучало?',opts:['cheap','chip','chop'],ans:1,
  why:'<b>chip</b> [tʃɪp] — короткий [ɪ]. Cheap [tʃiːp] — дешёвый, долгий.',
  why2:'Короткий и быстрый звук — chip.'},
 {type:'choice',lvl:3,q:'Как читается буква <b>o</b> в слове <b>women</b>?',opts:['/ɪ/ — как в sit','/ɒ/ — как в hot','/iː/ — как в see'],ans:0,sayAfter:'women',
  why:'<b>women</b> [ˈwɪmɪn] — слово-хитрец: o читается как [ɪ]. Woman (ед. ч.) — [ˈwʊmən].',
  why2:'Woman — «вумэн», women — «уимин».'},
 {type:'choice',lvl:3,q:'Какое слово <b>НЕ</b> с долгим /iː/ в первом слоге?',opts:['people','English','teacher','three'],ans:1,sayAfter:'English',
  why:'<b>English</b> [ˈɪŋɡlɪʃ] — первая буква E читается как короткий [ɪ]. People, teacher, three — долгий [iː].',
  why2:'English — «Инглиш», с коротким звуком.'},
 {type:'listen',lvl:3,say:'Please fill the glass.',q:'Послушай. Что прозвучало?',opts:['Please fill the glass.','Please feel the glass.'],ans:0,
  why:'<b>fill</b> — короткий [ɪ], наполнить стакан. Feel — потрогать, долгий.',
  why2:'Fill — быстро, feel — тянется.'},
 {lvl:3,text:'Please {sit*|seat} down. {Can*|Do@en.s.can} I help you?',
  why:'1) «Садитесь» — <b>sit down</b>. Seat — существительное «место». 2) Предлагаем помощь: <b>Can</b> I help you?',
  why2:'Sit down — садись. Can I…? — могу ли я…?'},
 {lvl:3,text:'Where do you {live*|leave}? — I live in {an*|a@en.s.a_an} old house near the river.',
  why:'1) «Где ты живёшь?» — <b>live</b> [lɪv]. 2) Old начинается с гласного звука → <b>an</b> old house.',
  why2:'Live — жить, leave — уходить. An перед гласным.'},
 {lvl:3,text:'I {feel*|fill} happy because it {is*|are@en.s.to_be} my birthday.',
  why:'1) «Я чувствую себя счастливым» — <b>feel</b> [fiːl]. 2) It → <b>is</b>.',
  why2:'Feel — чувствовать. It is.'},
 {type:'read',lvl:3,text:'My sister is sitting in her seat and eating a green apple.',q:'Прочитай вслух',
  why:'Короткие [ɪ]: <b>is, sitting, in</b>. Долгие [iː]: <b>seat, eating, green</b>. Sister — [ˈsɪstə].',
  why2:'Sitting — коротко, seat — долго. Не сливай.'}
]});

/* ===================================================================== */
RU.rule({
id:'en.5.ph_s_end',
short:'Окончание -s читается тремя способами: /s/ после глухих (cats), /z/ после звонких и гласных (dogs, plays), /ɪz/ после шипящих и свистящих (buses, watches).',
theory:`
<p>Окончание -s / -es бывает у мн. числа (${s('cats')}), у глагола с he/she (${s('likes')}) и у притяжательного ’s (${s('Tom’s')}). Читается оно по одному правилу.</p>
<table class="sym"><thead><tr><th>Звук</th><th>Когда</th></tr></thead><tbody>
<tr><td><b>/s/</b></td><td>после глухих звуков p, t, k, f, θ:<br>${s('cats')}, ${s('books')}, ${s('likes')}, ${s('cups')}, ${s('months')}</td></tr>
<tr><td><b>/z/</b></td><td>после звонких звуков и гласных:<br>${s('dogs')}, ${s('pens')}, ${s('plays')}, ${s('trees')}, ${s('goes')}, ${s('girls')}</td></tr>
<tr><td><b>/ɪz/</b> — лишний слог!</td><td>после s, z, ш, ч, дж (буквы s, ss, x, sh, ch, ce, ge):<br>${s('buses')}, ${s('boxes')}, ${s('watches')}, ${s('washes')}, ${s('pages')}, ${s('oranges')}</td></tr>
</tbody></table>
<div class="box tip"><b>Как запомнить: рука на горле</b> Положи пальцы на горло и скажи последний звук слова. Горло молчит (k, t, p) — читай /s/. Горло дрожит (g, n, l, гласные) — /z/. Шипишь или свистишь (s, ш, ч) — добавляй «из».</div>
<div class="box err"><b>Смотри на ЗВУК, а не на букву</b>
${s('makes')} — на конце буква e, но звук перед -s — /k/ → /s/.<br>
${s('knives')} — /z/ (f меняется на v).<br>
Хитрецы: ${s('does')} ${tr('dʌz')}, ${s('says')} ${tr('sez')}, ${s('houses')} ${tr('ˈhaʊzɪz')}.</div>`,
theory2:`
<p>Окончание -s — хамелеон: оно подстраивается под звук перед ним.</p>
<ol class="steps"><li>Перед ним тихий, глухой звук → и оно тихое, /s/: ${s('cats')}.</li>
<li>Перед ним звонкий звук или гласная → оно звенит, /z/: ${s('dogs')}.</li>
<li>Перед ним шипение или свист → чтобы не получилось «шшш-с», вставляем гласный: /ɪz/: ${s('buses')}.</li></ol>
<div class="box ex"><b>Послушай тройку</b>
${s('cats, dogs, buses')}<br>${s('likes, plays, watches')}</div>`,
items:[
 {type:'listen',lvl:1,say:'cats',q:'Послушай. Какой звук на конце?',opts:['/s/','/z/','/ɪz/'],ans:0,
  why:'<b>cats</b> [kæts] — перед -s глухой [t], поэтому [s].',
  why2:'T — горло молчит → окончание тоже глухое.'},
 {type:'listen',lvl:1,say:'dogs',q:'Послушай. Какой звук на конце?',opts:['/s/','/z/','/ɪz/'],ans:1,
  why:'<b>dogs</b> [dɒɡz] — перед -s звонкий [ɡ], поэтому [z].',
  why2:'G — горло дрожит → окончание звенит: [z].'},
 {type:'listen',lvl:1,say:'buses',q:'Послушай. Сколько слогов в слове?',opts:['один','два','три'],ans:1,
  why:'<b>buses</b> [ˈbʌsɪz] — два слога: bus-es. После [s] окончание [ɪz] добавляет слог.',
  why2:'Bus — один слог, buses — два.'},
 {type:'choice',lvl:1,q:'Как читается -s в слове <b>plays</b>?',opts:['/z/','/s/','/ɪz/'],ans:0,sayAfter:'plays',
  why:'<b>plays</b> [pleɪz] — перед -s гласный звук [eɪ], значит [z].',
  why2:'После гласных — всегда звонкое [z]: plays, goes, trees.'},
 {type:'read',lvl:1,text:'My cats like fish and my dogs like bones.',q:'Прочитай вслух',
  why:'<b>cats</b> — [s], <b>dogs</b> — [z], <b>bones</b> — [z]. Не превращай все окончания в «с».',
  why2:'Cats [kæts], dogs [dɒɡz], bones [bəʊnz].'},
 {type:'choice',lvl:2,q:'Как читается окончание в слове <b>watches</b>?',opts:['/s/','/ɪz/','/z/'],ans:1,sayAfter:'watches',
  why:'<b>watches</b> [ˈwɒtʃɪz] — после [tʃ] (ch) окончание [ɪz], лишний слог.',
  why2:'Ch шипит — добавляем «из»: watch-es.'},
 {type:'listen',lvl:2,say:'likes',q:'Послушай. Какой звук на конце?',opts:['/s/','/z/','/ɪz/'],ans:0,
  why:'<b>likes</b> [laɪks] — перед -s звук [k] (e немая!), поэтому [s].',
  why2:'Слушай звук, а не букву: like кончается на [k].'},
 {type:'choice',lvl:2,q:'В каком слове окончание /ɪz/?',opts:['books','boxes','pens','girls'],ans:1,sayAfter:'boxes',
  why:'<b>boxes</b> [ˈbɒksɪz] — после x [ks] нужен [ɪz]. Books — [s], pens и girls — [z].',
  why2:'X — свистящий звук, значит «из».'},
 {type:'choice',lvl:2,q:'Найди лишнее слово (окончание звучит по-другому)',opts:['cups','hats','rooms','books'],ans:2,sayAfter:'cups, hats, rooms, books',
  why:'<b>rooms</b> [ruːmz] — после звонкого [m] звучит [z]. В cups, hats, books — [s] после глухих p, t, k.',
  why2:'M — звонкий, горло дрожит → [z].'},
 {type:'spell',lvl:2,say:'watches',ans:['watches'],q:'Послушай и напиши слово (watch + окончание)',
  why:'После ch пишем <b>-es</b>: watches. Звук [ɪz] на письме — es.',
  why2:'Слышишь лишний слог «из» — пиши -es.'},
 {type:'spell',lvl:2,say:'boxes',ans:['boxes'],q:'Послушай и напиши слово (box во множественном числе)',
  why:'После x пишем <b>-es</b>: boxes [ˈbɒksɪz].',
  why2:'Box — boxes, fox — foxes.'},
 {type:'read',lvl:2,text:'She washes the dishes and watches TV.',q:'Прочитай вслух',
  why:'Три слова с [ɪz]: <b>washes, dishes, watches</b> — в каждом лишний слог.',
  why2:'WASH-es, DISH-es, WATCH-es — по два слога.'},
 {lvl:2,text:'One cat, two {cats*|cat@en.s.plurals}. The ending of «cats» sounds like the ending of {books*|dogs|boxes}.',
  why:'1) Два — мн. число: <b>cats</b>. 2) В cats и <b>books</b> окончание глухое [s] (после t и k). Dogs — [z], boxes — [ɪz].',
  why2:'Cats и books: перед -s глухие звуки → [s].'},
 {lvl:2,text:'My dad {washes*|washs|wash@en.p.ps_basic} the car on Sundays. «Washes» ends like {buses*|cats|dogs}.',
  why:'1) Dad = he, после sh пишем -es: <b>washes</b>. 2) Washes и <b>buses</b> заканчиваются на [ɪz].',
  why2:'Sh шипит → -es → [ɪz], как в buses.'},
 {type:'choice',lvl:3,q:'Как читается -s в слове <b>makes</b>? (На конце буква e!)',opts:['/s/ — перед ним звук /k/','/z/ — перед ним гласная e','/ɪz/ — как в buses'],ans:0,sayAfter:'makes',
  why:'<b>makes</b> [meɪks]: e немая, последний звук перед -s — [k], глухой → [s].',
  why2:'Буква e не звучит — значит, не считается.'},
 {type:'choice',lvl:3,q:'Как читается слово <b>does</b>?',opts:['[dʌz]','[duːz]','[dəʊz]'],ans:0,sayAfter:'does',
  why:'<b>does</b> [dʌz] — хитрец: гласная меняется на [ʌ]. Сравни: goes [ɡəʊz].',
  why2:'Do [duː] → does [dʌz]. Не «дуз» и не «доуз».'},
 {type:'listen',lvl:3,say:'says',q:'Послушай. Как произносится says?',opts:['[sez]','[seɪz]','[seɪs]'],ans:0,
  why:'<b>says</b> [sez] — гласная меняется: say [seɪ], но says [sez].',
  why2:'Хитрец: «сэз», а не «сэйз».'},
 {type:'listen',lvl:3,say:'oranges',q:'Послушай. Сколько слогов в слове?',opts:['два','три','четыре'],ans:1,
  why:'<b>oranges</b> [ˈɒrɪndʒɪz] — or-an-ges, три слога. После [dʒ] (ge) — [ɪz].',
  why2:'Orange — два слога, oranges — три.'},
 {type:'choice',lvl:3,q:'Как читается <b>houses</b>?',opts:['[ˈhaʊzɪz]','[ˈhaʊsɪz]','[haʊsz]'],ans:0,sayAfter:'houses',
  why:'<b>houses</b> [ˈhaʊzɪz] — хитрец: в мн. числе s внутри слова озвончается: [s] → [z], и на конце [ɪz].',
  why2:'House [haʊs], но houses [ˈhaʊzɪz] — два «з».'},
 {lvl:3,text:'My sister {plays*|plaies|play@en.p.ps_basic} tennis. «Plays» ends like {dogs*|cats|buses}.',
  why:'1) Sister = she; гласная + y → просто -s: <b>plays</b>. 2) После гласного окончание [z], как в <b>dogs</b>.',
  why2:'Plays [pleɪz], dogs [dɒɡz] — звонкое [z].'},
 {lvl:3,text:'I have got two {knives*|knifes@en.s.plurals}. «Knives» ends like {pens*|books|boxes}.',
  why:'1) Knife → <b>knives</b> (f → v + es). 2) Перед -s звонкий [v] → [z], как в <b>pens</b>.',
  why2:'Knives [naɪvz] — звонкое [z]. Books — [s], boxes — [ɪz].'},
 {type:'read',lvl:3,text:'My brother likes cars, bikes and buses.',q:'Прочитай вслух',
  why:'<b>likes, bikes</b> — [s]; <b>cars</b> — [z]; <b>buses</b> — [ɪz]. Все три варианта в одной фразе!',
  why2:'Likes [laɪks], cars [kɑːz], bikes [baɪks], buses [ˈbʌsɪz].'}
]});

/* ===================================================================== */
RU.mix(5,[
 {lvl:1,text:'My brother {is*|are@en.s.to_be} twelve. He {plays*|play@en.5.ps} football {on*|in|at@en.5.prep_time} Saturdays.',
  why:'1) My brother = he → <b>is</b>. 2) He + привычка → <b>plays</b>. 3) Дни недели → <b>on</b> Saturdays.',
  why2:'Is для одного; plays с -s; on + день.'},
 {lvl:1,text:'Look! The children {are swimming*|swim@en.5.pc} in the river.',
  why:'<b>Look!</b> — сейчас → Present Continuous: children (they) <b>are swimming</b>.',
  why2:'Смотри — значит прямо сейчас: are + -ing.'},
 {lvl:1,text:'I have got {an*|a@en.s.a_an} apple and {some*|any@en.5.some_any} grapes.',
  why:'1) Apple — с гласного звука → <b>an</b>. 2) Утверждение → <b>some</b> grapes.',
  why2:'An перед гласным. В утверждении — some.'},
 {lvl:1,text:'We {never eat*|eat never@en.5.adv_freq} meat {at*|in|on@en.5.prep_time} breakfast.',
  why:'1) Never — перед глаголом: <b>never eat</b>. 2) <b>At breakfast</b> — за завтраком.',
  why2:'Наречие перед глаголом. Приём пищи как момент — at.'},
 {lvl:1,text:'This is my grandma. I love {her*|she@en.5.pronouns} very much.',
  why:'После глагола love — форма «кого»: <b>her</b>.',
  why2:'Люблю (кого?) её — her.'},
 {lvl:2,text:'{There are*|There is@en.p.there_is} {some*|any@en.5.some_any} books on the shelf. {The*|A|_@en.5.articles} books are new.',
  why:'1) Books — мн. число → <b>There are</b>. 2) Утверждение → <b>some</b>. 3) Уже знаем, о каких книгах → <b>The</b> books.',
  why2:'Много книг — there are some. Второй раз — the.'},
 {lvl:2,text:'{Does*|Do@en.5.ps} your sister {like*|likes@en.5.ps} cats? — Yes, she {does*|likes@en.5.ps}.',
  why:'1) Sister = she → <b>Does</b>. 2) После does — <b>like</b> без -s. 3) Краткий ответ: <b>Yes, she does.</b>',
  why2:'Does … like? — Yes, she does.'},
 {lvl:2,text:'My parents usually {go*|are going@en.5.ps_vs_pc} to work by car, but today they {are walking*|walk@en.5.ps_vs_pc}.',
  why:'1) <b>usually</b> → Present Simple: go. 2) <b>today</b> → Present Continuous: are walking.',
  why2:'Обычно — Simple, сегодня — Continuous.'},
 {lvl:2,text:'I {can’t*|don’t can@en.s.can} find my {keys*|keyes@en.s.plurals}. Can you help {me*|I@en.5.pronouns}?',
  why:'1) Отрицание can — <b>can’t</b>. 2) Key — гласная + y → <b>keys</b>. 3) После help — <b>me</b>.',
  why2:'Can’t; keys (просто -s); help me.'},
 {lvl:2,text:'{Where*|When@en.p.wh_questions} is Tom? — He {is sitting*|sits@en.5.pc} in the kitchen.',
  why:'1) Ответ — место → <b>Where</b>. 2) Где он сейчас — <b>is sitting</b>.',
  why2:'Where = где. Сейчас сидит — Continuous.'},
 {lvl:2,text:'We play {_*|the|a@en.5.articles} tennis {at*|in|on@en.5.prep_time} the weekend.',
  why:'1) Спорт — без артикля: play tennis. 2) <b>At the weekend</b> (британский вариант).',
  why2:'Tennis без артикля. At the weekend.'},
 {lvl:2,text:'Yesterday I {was*|were@en.p.was_were} ill, but today I {feel*|fill@en.5.ph_i} fine.',
  why:'1) I → <b>was</b>. 2) «Чувствую себя» — <b>feel</b> [fiːl], долгий звук. Fill — наполнять.',
  why2:'I was. Feel — чувствовать.'},
 {lvl:2,text:'There {is*|are@en.p.there_is} {a*|an@en.s.a_an} big {ship*|sheep@en.5.ph_i} in the port.',
  why:'1) Один корабль → <b>There is</b>. 2) Big начинается с согласного → <b>a</b>. 3) В порту — <b>ship</b> (корабль).',
  why2:'There is a… Ship — корабль, sheep — овца.'},
 {lvl:3,text:'{Those*|That@en.s.this_that} {women*|womans@en.s.plurals} {are talking*|talk@en.5.pc} to our teacher now.',
  why:'1) Мн. число → <b>Those</b>. 2) Woman → <b>women</b>. 3) <b>Now</b> → are talking.',
  why2:'Those women — те женщины. Сейчас — Continuous.'},
 {lvl:3,text:'My cat {is always*|always is@en.5.adv_freq} hungry {in*|on|at@en.5.prep_time} the morning.',
  why:'1) После is — наречие: <b>is always</b>. 2) Часть дня → <b>in</b> the morning.',
  why2:'Be + always. In the morning.'},
 {lvl:3,text:'{Have*|Has@en.s.have_got} you got {any*|some@en.5.some_any} brothers or sisters?',
  why:'1) You → <b>Have</b> you got. 2) Вопрос → <b>any</b>.',
  why2:'Have для you. Вопрос — any.'},
 {lvl:3,text:'I {think*|sink@en.5.ph_th} {the*|a|_@en.5.articles} moon is beautiful tonight.',
  why:'1) «Я думаю» — <b>think</b> [θɪŋk]. 2) Луна одна → <b>the</b> moon.',
  why2:'Think — думать, sink — раковина. The moon — единственная.'},
 {lvl:3,text:'{Don’t*|Not@en.p.imperative} talk, please! The baby {is sleeping*|sleeps@en.5.ps_vs_pc}.',
  why:'1) Запрет — <b>Don’t</b> talk. 2) Ребёнок спит сейчас → <b>is sleeping</b>.',
  why2:'Don’t + глагол. Сейчас — Continuous.'},
 {lvl:3,text:'This is {my sister’s*|my sisters|my sister@en.p.possessive} room. She {doesn’t*|don’t@en.5.ps} like {it*|them|him@en.5.pronouns}.',
  why:'1) Чья комната? — сестры: <b>my sister’s</b> room. 2) She → <b>doesn’t</b>. 3) Room — один предмет → <b>it</b>.',
  why2:'’s = чей. She doesn’t. Комната — it.'},
 {lvl:3,text:'My grandad {watches*|watchs|watch@en.5.ps} the news {at*|in|on@en.5.prep_time} night.',
  why:'1) Grandad = he, после ch → <b>watches</b>. 2) <b>At night</b>.',
  why2:'Watch → watches. At night — исключение (ср. in the morning).'}
]);
})();
