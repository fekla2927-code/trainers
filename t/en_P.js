/* Уровень P («2–4 класс»): грамматика начальной школы. */
(function(){
const say=(t,label)=>`<span class="say" data-say="${t}">${label||t}</span>`;
const tr=t=>`<span class="tr">[${t}]</span>`;

/* ===================== Present Simple ===================== */
RU.rule({
id:'en.p.ps_basic',
short:`Present Simple — то, что бывает <b>обычно, всегда, каждый день</b>. Глагол без изменений: ${say('I like cats.')} Но с <b>he, she, it</b> добавляем <b>-s</b>: ${say('She likes cats.')}`,
theory:`
<p>Present Simple — это «настоящее обычное». Мы говорим о том, что человек делает <b>регулярно</b>, что он <b>любит</b>, и о том, что <b>всегда правда</b>.</p>
<p>${say('I play football on Saturdays.')} — Я играю в футбол по субботам.<br>
${say('Cats drink milk.')} — Кошки пьют молоко.<br>
${say('My dad works in a bank.')} — Мой папа работает в банке.</p>

<div class="box rule"><b>Формула</b>
I / you / we / they + глагол: ${say('I like')}, ${say('you like')}, ${say('we like')}, ${say('they like')}<br>
he / she / it + глагол<b>-s</b>: ${say('he likes')}, ${say('she likes')}, ${say('it likes')}</div>

<p>Вместо he/she/it может стоять одно существительное: ${say('my sister')} (= she), ${say('Tom')} (= he), ${say('the dog')} (= it). Значит, и там нужен хвостик <b>-s</b>: ${say('My sister likes apples.')} ${say('The dog likes bones.')}<br>
А если существительное во множественном числе (${say('cats')}, ${say('my friends')}) — это they, хвостика нет: ${say('My friends like pizza.')}</p>

<table class="sym">
<tr><th>Как пишется</th><th>Примеры</th></tr>
<tr><td>обычно + <b>s</b></td><td>${say('like — likes')}, ${say('play — plays')}, ${say('read — reads')}</td></tr>
<tr><td>после <b>s, sh, ch, x, o</b> → <b>-es</b></td><td>${say('watch — watches')}, ${say('wash — washes')}, ${say('fix — fixes')}, ${say('go — goes')}, ${say('do — does')}</td></tr>
<tr><td>согласная + <b>y</b> → <b>-ies</b></td><td>${say('fly — flies')}, ${say('cry — cries')}, ${say('carry — carries')}</td></tr>
<tr><td>гласная + <b>y</b> → просто <b>-s</b></td><td>${say('play — plays')}, ${say('buy — buys')}</td></tr>
<tr><td>исключение</td><td>${say('have — has')}</td></tr>
</table>

<div class="box rule"><b>Отрицание и вопрос</b>
Нужен помощник <b>do</b> / <b>does</b>. Если помощник <b>does</b> — хвостик -s переходит к нему, а глагол остаётся «голым»:<br>
${say('I do not like milk.')} = ${say("I don't like milk.")}<br>
${say('She does not like milk.')} = ${say("She doesn't like milk.")}<br>
${say('Do you like milk? — Yes, I do.')}<br>
${say("Does he like milk? — No, he doesn't.")}</div>

<p>Слова-подсказки: ${say('every day')}, ${say('usually')}, ${say('always')}, ${say('often')}, ${say('on Sundays')}, ${say('in the morning')}.</p>

<div class="box tip"><b>Как запомнить</b>«Он, она, оно — хвостик <b>s</b> одно». Хвостик <b>-s</b> всего один на предложение: или у глагола (${say('he likes')}), или у помощника (${say("he doesn't like")}, ${say('does he like')}).</div>

<div class="box err"><b>Типичные ошибки</b>
✗ He like pizza. → ✓ ${say('He likes pizza.')}<br>
✗ She doesn't likes tea. → ✓ ${say("She doesn't like tea.")}<br>
✗ Does he plays? → ✓ ${say('Does he play?')}<br>
✗ He haves a dog. → ✓ ${say('He has a dog.')}<br>
✗ Tom watchs TV. → ✓ ${say('Tom watches TV.')}</div>`,
theory2:`
<p>Представь, что у глагола есть «хвостик» <b>-s</b>. Он нужен, только когда мы говорим про <b>одного другого человека или предмет</b> — он, она, оно (папа, Аня, кошка).</p>
<p>Про себя (I), про тебя (you), про нас (we), про них (they) — хвостика нет.</p>
<p>${say('I swim.')} — я плаваю.<br>
${say('My brother swims.')} — мой брат плавает (брат = he → хвостик).<br>
${say('My brothers swim.')} — мои братья плавают (братья = they → без хвостика).</p>
<p>В отрицании хвостик «прыгает» на does: ${say("He doesn't swim.")}</p>`,
items:[
 {lvl:1, text:'My sister {likes*|like} apples.',
  why:`<b>My sister</b> — это she (она), одна. С he/she/it глагол получает <b>-s</b>: ${say('My sister likes apples.')}`,
  why2:`Замени «my sister» на «she»: she like… или she likes? Он, она, оно — хвостик s одно: <b>likes</b>.`},
 {lvl:1, text:'I {play*|plays} football on Saturdays.',
  why:`С <b>I</b> глагол не меняется: ${say('I play')}. Хвостик -s нужен только для he/she/it.`,
  why2:`«Я» — это не «он/она/оно», значит без -s: <b>I play</b>.`},
 {lvl:1, text:'Cats {drink*|drinks} milk.',
  why:`<b>Cats</b> — кошки, много → это they. С they глагол без -s: ${say('Cats drink milk.')}`,
  why2:`Окончание -s уже есть у существительного cats (много). Глаголу хвостик не нужен: <b>drink</b>.`},
 {lvl:1, q:'Как правильно сказать: «Он читает книги каждый вечер»?', opts:['He read books every evening.','He reads books every evening.','He reading books every evening.'], ans:1, sayAfter:'He reads books every evening.',
  why:`He → глагол с <b>-s</b>: <b>reads</b>. «He reading» без am/is вообще не бывает, а «He read» — без хвостика.`,
  why2:`Каждый вечер — это «обычно», значит Present Simple. Он → хвостик: ${say('He reads books every evening.')}`},
 {type:'listen', lvl:1, say:'My dad washes the car on Sundays.', q:'Послушай. Что папа делает по воскресеньям?', opts:['моет машину','водит машину','чинит машину'], ans:0,
  why:`Ты услышал ${say('washes')} ${tr('ˈwɒʃɪz')} — «моет». После <b>sh</b> добавляется <b>-es</b>, и слышен лишний слог [ɪz].`,
  why2:`wash — мыть, drive — водить, fix — чинить. В предложении: ${say('My dad washes the car on Sundays.')}`},
 {type:'read', lvl:1, text:'My little brother likes bananas and apples.', q:'Прочитай вслух',
  why:`Чётко скажи хвостик в ${say('likes')} [laɪks] — звук [s] в конце. В ${say('bananas')} ударение на второй слог: ba-NA-nas. ${say('apples')} — [ˈæplz], первый звук как в «э», рот широко.`,
  why2:`Читай по кусочкам: ${say('My little brother')} — ${say('likes bananas')} — ${say('and apples')}. Не глотай -s в likes!`},
 {lvl:2, text:'Tom {watches*|watchs|watch} TV in the evening.',
  why:`Tom = he → нужен хвостик. Глагол <b>watch</b> кончается на <b>ch</b>, поэтому -<b>es</b>: ${say('watches')}. «watchs» так не пишут.`,
  why2:`После шипящих (s, sh, ch, x) просто -s не выговорить, поэтому вставляем e: watch → <b>watches</b> ${tr('ˈwɒtʃɪz')}.`},
 {lvl:2, text:'The baby {cries*|crys|cry} at night.',
  why:`The baby = it/he/she → нужен хвостик. <b>cry</b>: перед y стоит согласная r, поэтому y → i + es: ${say('cries')}.`,
  why2:`Правило «согласная + y»: cry → cries, fly → flies. А если перед y гласная (play), просто -s: plays.`},
 {lvl:2, text:`My friend {doesn't*|don't} like milk.`,
  why:`My friend = he/she → помощник <b>does</b>, отрицание <b>doesn't</b>: ${say("My friend doesn't like milk.")}`,
  why2:`don't — для I, you, we, they. Для одного друга (он) — <b>doesn't</b>.`},
 {lvl:2, text:'{Does*|Do} your cat sleep on the sofa? — Yes, it {does*|do}.',
  why:`Your cat = it → вопрос с <b>Does</b>. Короткий ответ повторяет помощника: ${say('Yes, it does.')}`,
  why2:`Кот — «оно» (it). Для it всегда does: ${say('Does your cat sleep on the sofa? Yes, it does.')}`},
 {type:'spell', lvl:2, say:'watches', ans:['watches'], q:'Послушай и напиши глагол (он смотрит):',
  why:`watch + es = <b>watches</b>. После ch пишем -es.`,
  why2:`Слышишь в конце [ɪz]? Это подсказка: на письме -es. ${say('He watches TV.')}`},
 {type:'listen', lvl:2, say:'She goes to school by bus.', q:'Послушай. Как она ездит в школу?', opts:['пешком','на автобусе','на машине'], ans:1,
  why:`${say('by bus')} — на автобусе. Обрати внимание: ${say('goes')} — go + es, потому что she.`,
  why2:`on foot — пешком, by car — на машине, <b>by bus</b> — на автобусе.`},
 {type:'read', lvl:2, text:'She goes to school every day by bus.', q:'Прочитай вслух',
  why:`${say('goes')} читается [gəʊz] — «гоуз», в конце звонкое [z]. ${say('school')} — [skuːl], долгое «у». ${say('every day')} — ударение на EV-ery.`,
  why2:`Произнеси медленно: ${say('She goes to school')} — ${say('every day by bus')}. Слово to звучит коротко и слабо.`},
 {lvl:2, text:'My brother {has got*|have got@en.s.have_got} a dog. The dog {likes*|like} bones.',
  why:`1) My brother = he → <b>has got</b> (have got — для I, you, we, they). 2) The dog = it → <b>likes</b> с хвостиком.`,
  why2:`Оба пропуска про «он/оно»: брат <b>has got</b>, собака <b>likes</b>. ${say('My brother has got a dog. The dog likes bones.')}`},
 {lvl:2, text:'Ann {is*|are@en.s.to_be} my friend. She {lives*|live} in a big house.',
  why:`1) Ann = she → <b>is</b> (I am, he/she/it is, we/you/they are). 2) She → <b>lives</b> с -s.`,
  why2:`Аня — она. «Она есть моя подруга» — <b>is</b>; «она живёт» — <b>lives</b>.`},
 {lvl:3, text:`My mum {doesn't drink*|doesn't drinks|don't drink} coffee.`,
  why:`Mum = she → <b>doesn't</b>. А после doesn't глагол без -s: <b>drink</b>. Хвостик уже «забрал» does.`,
  why2:`Один хвостик на предложение: does-n't уже с -s, поэтому ${say("My mum doesn't drink coffee.")}`},
 {lvl:3, text:'{Does*|Do|Is} your brother {play*|plays|to play} the guitar?',
  why:`Brother = he → <b>Does</b>. После does глагол голый: <b>play</b>. «Is … play», «Does … plays» и «Does … to play» — ошибки.`,
  why2:`Вопрос в Present Simple: Does + он + глагол без -s. ${say('Does your brother play the guitar?')}`},
 {lvl:3, text:'He {has*|haves|have} breakfast at seven.',
  why:`Глагол <b>have</b> — исключение: с he/she/it он становится <b>has</b>. «haves» не бывает.`,
  why2:`Запомни пару: I have — he <b>has</b>. ${say('He has breakfast at seven.')}`},
 {lvl:3, text:'These {boxes*|boxs@en.s.plurals} are heavy. My dad {carries*|carrys|carry} them to the car.',
  why:`1) box кончается на x → множественное <b>boxes</b>. 2) My dad = he; carry: согласная r + y → <b>carries</b>.`,
  why2:`Два похожих правила: box → boxes (после x пишем -es), carry → carries (y после согласной → ies).`},
 {lvl:3, text:'My cat {can*|cans@en.s.can} jump very high. It {catches*|catchs|catch} mice in the garden.',
  why:`1) <b>can</b> никогда не получает -s: he can, it can. 2) It → хвостик; catch кончается на ch → <b>catches</b>.`,
  why2:`Ловушка: can — «особый» глагол, у него нет хвостика. А обычный catch с it — <b>catches</b>.`},
 {lvl:3, q:'В каком предложении есть ошибка?', opts:['She plays tennis.',`He doesn't like fish.`,'Does he likes pizza?'], ans:2,
  why:`В «Does he likes pizza?» два хвостика: does и likes. Правильно: ${say('Does he like pizza?')}`,
  why2:`После does глагол всегда без -s. Остальные предложения верные: ${say('She plays tennis.')} ${say("He doesn't like fish.")}`}
]});

/* ===================== Present Continuous ===================== */
RU.rule({
id:'en.p.pc_basic',
short:`Present Continuous — то, что происходит <b>прямо сейчас</b>: am / is / are + глагол<b>-ing</b>. ${say('I am reading now.')}`,
theory:`
<p>Когда действие идёт <b>в эту минуту</b>, англичанин говорит не просто «я читаю», а «я есть читающий»: ${say('I am reading.')}</p>

<div class="box rule"><b>Формула</b>
<b>am / is / are</b> + глагол + <b>ing</b><br>
${say('I am reading.')} — Я (сейчас) читаю.<br>
${say('She is cooking.')} — Она (сейчас) готовит.<br>
${say('They are playing.')} — Они (сейчас) играют.</div>

<table class="sym">
<tr><th>Кто</th><th>Помощник</th><th>Пример</th></tr>
<tr><td>I</td><td>am</td><td>${say('I am drawing.')}</td></tr>
<tr><td>he / she / it, Tom, my mum, the cat</td><td>is</td><td>${say('The cat is sleeping.')}</td></tr>
<tr><td>we / you / they, the children</td><td>are</td><td>${say('The children are running.')}</td></tr>
</table>

<div class="box rule"><b>Как пишется -ing</b>
обычно: ${say('read — reading')}, ${say('play — playing')}<br>
немая e на конце исчезает: ${say('write — writing')}, ${say('dance — dancing')}, ${say('make — making')}<br>
короткое слово «гласная + согласная» — согласная удваивается: ${say('swim — swimming')}, ${say('run — running')}, ${say('sit — sitting')}</div>

<div class="box rule"><b>Отрицание и вопрос</b>
${say("He isn't sleeping.")} ${say("We aren't playing.")} ${say("I am not reading.")}<br>
${say('Is he sleeping? — Yes, he is.')}<br>
${say("Are you watching TV? — No, I am not.")}<br>
${say('What are you doing?')} — Что ты (сейчас) делаешь?</div>

<p>Слова-подсказки: ${say('now')}, ${say('right now')}, ${say('at the moment')}, ${say('Look!')}, ${say('Listen!')}</p>

<div class="box tip"><b>Как запомнить</b>У Present Continuous <b>две части</b>, как у двух колёс велосипеда: am/is/are + -ing. Без одного колеса не поедешь!</div>

<div class="box err"><b>Типичные ошибки</b>
✗ I reading. → ✓ ${say('I am reading.')} (забыли am)<br>
✗ She is read. → ✓ ${say('She is reading.')} (забыли -ing)<br>
✗ He is swiming. → ✓ ${say('He is swimming.')}<br>
✗ They is playing. → ✓ ${say('They are playing.')}</div>`,
theory2:`
<p>Представь, что ты смотришь в окно и рассказываешь, что видишь <b>прямо сейчас</b> — как репортёр.</p>
<p>${say('Look! A dog is running.')} — Смотри! Собака бежит.<br>
${say('The boys are playing football.')} — Мальчики играют в футбол.<br>
${say('I am looking out of the window.')} — Я смотрю в окно.</p>
<p>Рецепт: кто? + am/is/are + «что делает» с -ing на конце.</p>`,
items:[
 {lvl:1, text:'I {am*|is|are} reading a book now.',
  why:`С <b>I</b> всегда <b>am</b>: ${say('I am reading a book now.')}`,
  why2:`I am, he is, they are. Здесь «я» → <b>am</b>.`},
 {lvl:1, text:'The children {are*|is|am} playing in the garden.',
  why:`<b>The children</b> — дети, их много = they → <b>are</b>.`,
  why2:`children — это множественное число от child. Много → <b>are</b>: ${say('The children are playing in the garden.')}`},
 {lvl:1, text:'Look! The dog {is running*|running|is run}.',
  why:`Нужны обе части: <b>is</b> + <b>running</b>. «running» без is и «is run» без -ing — ошибки.`,
  why2:`«Look!» — значит, прямо сейчас. Собака = it → ${say('The dog is running.')}`},
 {lvl:1, text:'Mum {is cooking*|is cook|cooking} dinner now.',
  why:`Mum = she → <b>is</b>, плюс глагол с -ing: <b>is cooking</b>.`,
  why2:`Два колеса: is + cooking. ${say('Mum is cooking dinner now.')}`},
 {type:'listen', lvl:1, say:'The cat is sleeping on the bed.', q:'Послушай. Что делает кошка?', opts:['спит на кровати','ест на кухне','играет в саду'], ans:0,
  why:`${say('is sleeping')} — спит, ${say('on the bed')} — на кровати.`,
  why2:`sleep — спать, eat — есть, play — играть. Ты слышал ${say('The cat is sleeping on the bed.')}`},
 {type:'read', lvl:1, text:'My little sister is drawing a funny cat.', q:'Прочитай вслух',
  why:`${say('drawing')} — [ˈdrɔːɪŋ], долгое «о», в конце носовой звук [ŋ], буква g не звучит отдельно. ${say('funny')} — ударение на первый слог.`,
  why2:`Окончание -ing читай как одно «ин» в нос, без чёткого «г»: ${say('drawing')}. Связывай: ${say('is drawing')}.`},
 {lvl:2, text:'She {is swimming*|is swiming|swimming} in the river.',
  why:`swim — короткое слово, кончается на «гласная + согласная» (i + m), поэтому m удваивается: <b>swimming</b>. И нужно <b>is</b>.`,
  why2:`swim → swi<b>mm</b>ing, как run → ru<b>nn</b>ing. ${say('She is swimming in the river.')}`},
 {lvl:2, text:'We {are writing*|are writeing|are writting} a letter to Grandma.',
  why:`У write на конце немая e — она исчезает: write → <b>writing</b>. Удвоения t нет.`,
  why2:`Слова с немой e: make → making, dance → dancing, write → <b>writing</b>.`},
 {lvl:2, text:`My dad {isn't*|aren't} working today. He is at home.`,
  why:`Dad = he → is, отрицание <b>isn't</b>: ${say("My dad isn't working today.")}`,
  why2:`aren't — для we, you, they. Папа один → <b>isn't</b>.`},
 {lvl:2, text:'{Are*|Is|Do} you watching TV? — No, I {am not*|is not|are not}.',
  why:`Вопрос с you → <b>Are</b> you…? (do в Present Continuous не нужен). Ответ про себя → <b>I am not</b>.`,
  why2:`В вопросе am/is/are выходит вперёд: You are watching → <b>Are</b> you watching? Ответ: ${say('No, I am not.')}`},
 {type:'spell', lvl:2, say:'running', ans:['running'], q:'Послушай и напиши слово с -ing (бегущий / бегает сейчас):',
  why:`run → <b>running</b>: короткое слово, гласная + согласная → n удваивается.`,
  why2:`ru + nn + ing. Так же: sit → sitting, swim → swimming.`},
 {type:'spell', lvl:2, say:'sitting', ans:['sitting'], q:'Послушай и напиши слово с -ing (сидит сейчас):',
  why:`sit → <b>sitting</b>, буква t удваивается.`,
  why2:`Короткое sit: i + t → удваиваем t. ${say('The cat is sitting on the chair.')}`},
 {type:'read', lvl:2, text:'Look! It is raining and the children are running home.', q:'Прочитай вслух',
  why:`${say('raining')} [ˈreɪnɪŋ] — «рэйнин», ${say('children')} [ˈtʃɪldrən] — первый звук мягкий «ч». ${say('running')} — [ˈrʌnɪŋ].`,
  why2:`Раздели на части: ${say('Look!')} — ${say('It is raining')} — ${say('and the children are running home.')}`},
 {lvl:2, text:'This {is*|are@en.s.to_be} my brother. He {is playing*|playing|is play} the guitar now.',
  why:`1) This (один человек) → <b>is</b>. 2) Сейчас → <b>is playing</b>: нужно is и -ing.`,
  why2:`«Это есть мой брат» — <b>This is</b>. «Он сейчас играет» — <b>He is playing</b>.`},
 {lvl:2, text:'{These*|This@en.s.this_that} boys {are riding*|is riding|are rideing} their bikes.',
  why:`1) boys — много → <b>These</b> (this — для одного). 2) Много мальчиков → <b>are</b>; ride теряет немую e → <b>riding</b>.`,
  why2:`These boys = they → are. ride → riding (как write → writing). ${say('These boys are riding their bikes.')}`},
 {lvl:3, text:'Look at the {mice*|mouses|mouse@en.s.plurals}! They {are eating*|is eating|eating} cheese.',
  why:`1) Дальше стоит They — значит, мышей много: mouse → <b>mice</b> (исключение, «mouses» не бывает). 2) They → <b>are eating</b>.`,
  why2:`Исключения: mouse → mice, man → men, child → children. Много мышей → ${say('They are eating cheese.')}`},
 {lvl:3, text:'My grandma {has got*|have got@en.s.have_got} a garden. Today she {is planting*|planting|is planing} flowers there.',
  why:`1) Grandma = she → <b>has got</b>. 2) plant (сажать) + ing = <b>planting</b>, с is. «planing» — это от другого слова (plane), а без is нельзя.`,
  why2:`Бабушка — она: has got. Сегодня сажает: ${say('she is planting flowers')}.`},
 {lvl:3, text:'Shh! Grandpa {is sleeping*|sleeps|is sleep}.',
  why:`«Shh!» (тише!) — дедушка спит <b>прямо сейчас</b> → <b>is sleeping</b>. «sleeps» — это «обычно спит».`,
  why2:`Тише, потому что сейчас спит: ${say('Shh! Grandpa is sleeping.')}`},
 {lvl:3, text:'What {is*|are|does} Tom {doing*|do|does} now? — He is having lunch.',
  why:`Tom = he → <b>is</b>; «что делает сейчас?» → <b>doing</b>. ${say('What is Tom doing now?')}`,
  why2:`Вопрос «что делает сейчас» всегда строится так: What is/are + кто + doing?`},
 {lvl:3, q:'В каком предложении ошибка?', opts:['They are dancing.','He is siting on the chair.','I am making a cake.'], ans:1,
  why:`sit → <b>sitting</b> с двумя t. Правильно: ${say('He is sitting on the chair.')}`,
  why2:`dance → dancing и make → making (теряют e) — верно. А в sit нужно удвоить t: si<b>tt</b>ing.`}
]});

/* ===================== there is / there are ===================== */
RU.rule({
id:'en.p.there_is',
short:`Чтобы сказать «где-то есть / находится что-то», начинаем с <b>There is</b> (один предмет) или <b>There are</b> (много): ${say('There are three cats in the garden.')}`,
theory:`
<p>По-русски мы говорим: «В саду — три кошки». По-английски так нельзя. Начинаем с волшебной фразы <b>There is / There are</b>, а место ставим в конце:</p>
<p>${say('There are three cats in the garden.')} — В саду три кошки.<br>
${say('There is a book on the table.')} — На столе (лежит) книга.<br>
${say('There is some milk in the glass.')} — В стакане есть молоко.</p>

<div class="box rule"><b>Формула</b>
<b>There is</b> + a / an + один предмет (или «неисчисляемое»: milk, water, juice) + место<br>
<b>There are</b> + много предметов + место<br>
${say("There's a dog.")} = ${say('There is a dog.')}</div>

<table class="sym">
<tr><th></th><th>Один</th><th>Много</th></tr>
<tr><td>+</td><td>${say('There is a cat.')}</td><td>${say('There are two cats.')}</td></tr>
<tr><td>−</td><td>${say("There isn't a cat.")}</td><td>${say("There aren't any cats.")}</td></tr>
<tr><td>?</td><td>${say('Is there a cat?')}</td><td>${say('Are there any cats?')}</td></tr>
<tr><td>ответ</td><td>${say("Yes, there is. / No, there isn't.")}</td><td>${say("Yes, there are. / No, there aren't.")}</td></tr>
</table>

<p>Сколько? ${say('How many rooms are there in your flat? — There are four.')}</p>

<div class="box tip"><b>Как запомнить</b>Перевод русского предложения начинай <b>с конца</b>: «В комнате есть стол» → ${say('There is a table in the room.')}<br>
Если перечисляешь несколько вещей — смотри на <b>первую</b>: ${say('There is a pen and two pencils.')} / ${say('There are two pencils and a pen.')}</div>

<div class="box err"><b>Типичные ошибки</b>
✗ In the room is a table. → ✓ ${say('There is a table in the room.')}<br>
✗ There is two cats. → ✓ ${say('There are two cats.')}<br>
✗ There are a dog. → ✓ ${say('There is a dog.')}<br>
✗ There are some milk. → ✓ ${say('There is some milk.')} (milk не считают — это is)</div>`,
theory2:`
<p>There is / There are — это как указатель «Внимание, тут есть…!». Сначала говорим «тут есть», потом — что, и в конце — где.</p>
<p>Одна вещь → <b>is</b>: ${say('There is a ball under the bed.')}<br>
Много вещей → <b>are</b>: ${say('There are two balls under the bed.')}</p>
<p>Вопрос — просто меняем местами: ${say('Is there a ball under the bed?')}</p>`,
items:[
 {lvl:1, text:'There {is*|are} a cat on the sofa.',
  why:`<b>a cat</b> — одна кошка → <b>There is</b>.`,
  why2:`Один предмет — is, много — are. ${say('There is a cat on the sofa.')}`},
 {lvl:1, text:'There {are*|is} three cats in the garden.',
  why:`<b>three cats</b> — много → <b>There are</b>.`,
  why2:`Три — это больше одного → are. ${say('There are three cats in the garden.')}`},
 {lvl:1, text:'There {is*|are} a big tree near our house.',
  why:`<b>a big tree</b> — одно дерево (есть артикль a) → <b>There is</b>.`,
  why2:`Артикль a = «один». Значит, <b>is</b>.`},
 {lvl:1, text:'There {are*|is} two windows in my room.',
  why:`<b>two windows</b> — два окна → <b>There are</b>.`,
  why2:`windows с -s на конце — их много → are.`},
 {type:'listen', lvl:1, say:'There are four apples on the plate.', q:'Послушай. Сколько яблок на тарелке?', opts:['два','три','четыре'], ans:2,
  why:`${say('four')} — четыре. two — два, three — три.`,
  why2:`Слушай число после There are: ${say('There are four apples on the plate.')}`},
 {type:'listen', lvl:1, say:'There is a dog under the table.', q:'Послушай. Где собака?', opts:['на столе','под столом','рядом со столом'], ans:1,
  why:`${say('under the table')} — под столом. on — на, next to — рядом.`,
  why2:`Ключевое слово — ${say('under')} (под).`},
 {type:'read', lvl:1, text:'There are three cats in the garden.', q:'Прочитай вслух',
  why:`${say('There are')} читается слитно: [ðeər ɑː] — «зэр а», звук r связывает слова. ${say('three')} — [θriː]: кончик языка между зубами. ${say('garden')} — долгое [ɑː].`,
  why2:`Не говори «сри» или «фри» — в three язык между зубами. Читай медленно: ${say('There are three cats')} — ${say('in the garden.')}`},
 {lvl:2, q:'Как по-английски «На столе лежит книга»?', opts:['On the table is a book.','There is a book on the table.','There are a book on the table.'], ans:1, sayAfter:'There is a book on the table.',
  why:`Начинаем с <b>There is</b> (книга одна), место — в конце.`,
  why2:`«On the table is a book» — это русский порядок слов. По-английски: ${say('There is a book on the table.')}`},
 {lvl:2, text:'{Is there*|There is|Are there} a park near your school? — Yes, there {is*|are}.',
  why:`Это вопрос (есть «?» и ответ Yes) → is выходит вперёд: <b>Is there</b> a park…? Парк один, поэтому is, и ответ ${say('Yes, there is.')}`,
  why2:`There is → Is there? (поменяли местами). Один парк — is.`},
 {lvl:2, text:'{Are there*|Is there|There are} any eggs in the fridge? — No, there {aren\'t*|isn\'t}.',
  why:`eggs — много → <b>Are there</b> any eggs? Ответ тоже про много: ${say("No, there aren't.")}`,
  why2:`Вопрос + много предметов = Are there…? Отрицательный ответ: there <b>aren't</b>.`},
 {lvl:2, text:`There {isn't*|aren't} a lamp on the desk.`,
  why:`<b>a lamp</b> — одна → <b>isn't</b>.`,
  why2:`Артикль a — один предмет, значит is → isn't. ${say("There isn't a lamp on the desk.")}`},
 {lvl:2, text:'There {is*|are} some milk in the glass.',
  why:`<b>milk</b> нельзя посчитать (одно молоко, два молока — так не говорят) → <b>There is</b>.`,
  why2:`Молоко, вода, сок — «неисчисляемые», с ними is. ${say('There is some milk in the glass.')}`},
 {type:'spell', lvl:2, say:'chairs', ans:['chairs'], q:'Послушай и напиши слово (что есть в комнате):',
  why:`<b>chairs</b> — стулья: ch читается как «ч», air — как [eə].`,
  why2:`${say('There are four chairs in the kitchen.')} — chair + s.`},
 {type:'spell', lvl:2, say:'kitchen', ans:['kitchen'], q:'Послушай и напиши слово (комната в доме):',
  why:`<b>kitchen</b> — кухня. Звук «ч» после короткой гласной пишется <b>tch</b>: ki-tch-en.`,
  why2:`Как в watch, catch: короткий звук + «ч» = tch. ${say('There is a big table in the kitchen.')}`},
 {type:'read', lvl:2, text:'There is a big table in the kitchen.', q:'Прочитай вслух',
  why:`${say('There is a')} читай слитно: [ðeər ɪz ə]. ${say('kitchen')} — [ˈkɪtʃɪn], ударение на первый слог.`,
  why2:`Связывай: there‿is‿a. В table — [eɪ]: «тэйбл».`},
 {lvl:2, text:'There {are*|is} five {children*|childs|child@en.s.plurals} in the park.',
  why:`1) five children — много → <b>There are</b>. 2) child → <b>children</b> (исключение, «childs» не бывает; «child» — один).`,
  why2:`Пять детей: are + children. ${say('There are five children in the park.')}`},
 {lvl:2, text:'There {is*|are} {an*|a@en.s.a_an} orange in my bag.',
  why:`1) один апельсин → <b>There is</b>. 2) orange начинается с гласного звука [ɒ] → <b>an</b>.`,
  why2:`an — перед гласным звуком: an orange, an apple, an egg. Один → is.`},
 {lvl:3, text:'There {is*|are} a cat under the table. It {has got*|have got@en.s.have_got} green eyes.',
  why:`1) a cat — одна → <b>There is</b>. 2) It → <b>has got</b> (has для he/she/it).`,
  why2:`Кошка одна (is), кошка — it (has got). ${say('It has got green eyes.')}`},
 {lvl:3, text:'There {is*|are} a parrot in the cage. It {can*|cans|can to@en.s.can} talk!',
  why:`1) a parrot — один → <b>There is</b>. 2) <b>can</b> не меняется (без -s) и после него глагол без to: can talk.`,
  why2:`Один попугай → is. Can — без хвостика и без to: ${say('It can talk!')}`},
 {lvl:3, text:'There {is*|are} a pen and two pencils on the desk.',
  why:`Если перечисляем, смотрим на <b>первый</b> предмет: a pen — один → <b>There is</b>.`,
  why2:`Слово is/are «слушается» того, что стоит сразу после него. Сразу после — a pen. Сравни: ${say('There are two pencils and a pen.')}`},
 {lvl:3, text:'How many rooms {are there*|there are|is there} in your flat? — There {are*|is} four.',
  why:`Вопрос «сколько?» → порядок вопроса: How many rooms <b>are there</b>? rooms — много → are. Ответ: ${say('There are four.')}`,
  why2:`How many + много + are there…? ${say('How many rooms are there in your flat?')}`},
 {lvl:3, q:'Как сказать «В холодильнике нет молока»?', opts:[`There isn't any milk in the fridge.`,`There aren't any milk in the fridge.`,`In the fridge isn't milk.`], ans:0, sayAfter:"There isn't any milk in the fridge.",
  why:`milk — неисчисляемое → <b>isn't</b>. И начинаем с There, а не с места.`,
  why2:`Молоко не считают → is. Отрицание: ${say("There isn't any milk in the fridge.")}`}
]});

/* ===================== Possessive ===================== */
RU.rule({
id:'en.p.possessive',
short:`Чьё? — ${say('my')}, ${say('your')}, ${say('his')}, ${say('her')}, ${say('its')}, ${say('our')}, ${say('their')}, или имя + <b>’s</b>: ${say("Tom's bag")} — сумка Тома.`,
theory:`
<div class="box rule"><b>Слова «чей»</b>
<table class="sym">
<tr><th>Кто</th><th>Чей</th><th>Пример</th></tr>
<tr><td>I — я</td><td>my — мой</td><td>${say('my bag')}</td></tr>
<tr><td>you — ты, вы</td><td>your — твой, ваш</td><td>${say('your book')}</td></tr>
<tr><td>he — он</td><td>his — его</td><td>${say('his dog')}</td></tr>
<tr><td>she — она</td><td>her — её</td><td>${say('her cat')}</td></tr>
<tr><td>it — оно (животное, предмет)</td><td>its — его/её</td><td>${say('its tail')}</td></tr>
<tr><td>we — мы</td><td>our — наш</td><td>${say('our school')}</td></tr>
<tr><td>they — они</td><td>their — их</td><td>${say('their house')}</td></tr>
</table></div>

<div class="box rule"><b>’s — «принадлежит»</b>
Имя или слово + <b>’s</b>: ${say("Tom's bike")} — велосипед Тома, ${say("my dad's car")} — папина машина.<br>
Если слово уже кончается на -s (много): только апостроф: ${say("my parents' car")} — машина моих родителей.<br>
Если множественное без -s: ${say("the children's toys")} — игрушки детей.</div>

<div class="box tip"><b>Как запомнить</b>В английском нет слова «свой». Аня любит «свою» маму → её маму: ${say('Ann loves her mum.')} Том любит «свою» маму → его маму: ${say('Tom loves his mum.')}<br>
Порядок как в слове «папина машина»: сначала хозяин, потом вещь — ${say("Dad's car")}.</div>

<div class="box err"><b>Типичные ошибки</b>
✗ the bag of Tom → ✓ ${say("Tom's bag")}<br>
✗ Ann loves his mum (про свою маму) → ✓ ${say('Ann loves her mum.')}<br>
✗ The bird is in it's nest. → ✓ ${say('The bird is in its nest.')} (it’s = it is!)<br>
✗ They love there dog. → ✓ ${say('They love their dog.')} (there — «там»)</div>`,
theory2:`
<p>Сначала скажи, <b>чьё</b>, потом — <b>что</b>. Как по-русски «мамина сумка», «папин стул».</p>
<p>${say("Mum's bag")} — мамина сумка. ${say("Dad's chair")} — папин стул.</p>
<p>А вместо имени можно сказать короче: Том → his (его), Аня → her (её), мы → our (наш), они → their (их).</p>
<p>${say('This is Tom. This is his dog.')}</p>`,
items:[
 {lvl:1, text:'This is {my*|me|I} bag.',
  why:`«Моя сумка» → <b>my</b>. I — «я», me — «меня/мне».`,
  why2:`Чья? Моя → my: ${say('This is my bag.')}`},
 {lvl:1, text:'Tom has got a dog. {His*|Her|He} dog is black.',
  why:`Tom — мальчик → «его собака» = <b>his</b> dog. her — «её», he — «он».`,
  why2:`he — он, his — его. ${say('His dog is black.')}`},
 {lvl:1, text:'Ann loves {her*|his|she} cat.',
  why:`Ann — девочка, «свою кошку» → её кошку = <b>her</b> cat.`,
  why2:`«Свой» по-английски зависит от хозяина: у девочки — her. ${say('Ann loves her cat.')}`},
 {lvl:1, text:`This is {Kate's*|Kate|Kates} pencil.`,
  why:`«Карандаш Кейт» → имя + <b>’s</b>: Kate’s pencil.`,
  why2:`Хозяин + ’s + вещь: ${say("Kate's pencil")}.`},
 {lvl:1, q:'Как сказать «папина машина»?', opts:['the car of dad',`my dad's car`,'my dad car'], ans:1, sayAfter:"my dad's car",
  why:`Хозяин + <b>’s</b> + вещь: my dad’s car. «the car of dad» по-английски так не говорят.`,
  why2:`Как по-русски «папина»: сначала папа, потом машина, а между ними ’s.`},
 {type:'listen', lvl:1, say:"This is my brother's bike.", q:'Послушай. Чей это велосипед?', opts:['мой','моего брата','моей сестры'], ans:1,
  why:`${say("my brother's bike")} — велосипед моего брата. ’s звучит как [z].`,
  why2:`brother — брат, sister — сестра. Ты слышал «brother’s».`},
 {type:'listen', lvl:1, say:'Is this your pen? No, it is her pen.', q:'Послушай. Чья это ручка?', opts:['моя','твоя','её'], ans:2,
  why:`В ответе: ${say('it is her pen')} — это её ручка.`,
  why2:`your — твоя (это вопрос), а ответ — <b>her</b> pen, её.`},
 {type:'read', lvl:1, text:'This is my brother and these are his toys.', q:'Прочитай вслух',
  why:`${say('This')} и ${say('these')} — язык между зубами, звонко [ð]. ${say('his')} — [hɪz], в конце звонкое [z]. ${say('toys')} — [tɔɪz].`,
  why2:`this — короткое [ɪ], these — долгое [iː]. Послушай и повтори: ${say('This is my brother')} — ${say('and these are his toys.')}`},
 {lvl:2, text:'We love {our*|we|us} school.',
  why:`«Нашу школу» → <b>our</b>. we — «мы», us — «нас».`,
  why2:`we → our (наш). ${say('We love our school.')}`},
 {lvl:2, text:'The children are in {their*|there|they} room.',
  why:`«В их комнате» → <b>their</b>. there — «там» (звучит так же, но значит другое!), they — «они».`,
  why2:`their и there звучат одинаково. Чей? — их → their. ${say('The children are in their room.')}`},
 {lvl:2, text:`The bird is in {its*|it's|it} nest.`,
  why:`«В своём гнезде» (гнездо птицы) → <b>its</b> без апострофа. it’s = it is («оно есть»).`,
  why2:`Проверка: замени на it is. «in it is nest» — бессмыслица, значит <b>its</b>.`},
 {lvl:2, text:`My mum and dad have got a red car. It is my {parents'*|parent's|parents} car.`,
  why:`Хозяев двое (мама и папа) → parents. Слово уже кончается на -s, поэтому добавляем только апостроф: <b>parents’</b>.`,
  why2:`Один родитель — parent’s, два родителя — <b>parents’</b>. Без апострофа (parents) нельзя: так получится просто «родители».`},
 {lvl:2, text:`These are the {children's*|childrens'|childrens} toys.`,
  why:`children — множественное без -s, поэтому + <b>’s</b>: children’s. «childrens» — такого слова нет.`,
  why2:`Как с одним человеком: man → man’s, children → <b>children’s</b>.`},
 {lvl:2, q:'Аня говорит о своей маме. Как правильно?', opts:['Ann loves his mum.','Ann loves her mum.','Ann loves she mum.'], ans:1, sayAfter:'Ann loves her mum.',
  why:`Хозяйка — Аня (она) → <b>her</b> mum. his — про мальчика, she — «она», не «её».`,
  why2:`Слова «свой» нет. Смотри, кто хозяин: девочка → her.`},
 {type:'spell', lvl:2, say:'family', ans:['family'], q:'Послушай и напиши слово (семья):',
  why:`<b>family</b> — fa-mi-ly, на конце y.`,
  why2:`${say('This is my family.')} — Это моя семья.`},
 {type:'read', lvl:2, text:`My sister's room is very big and bright.`, q:'Прочитай вслух',
  why:`${say("sister's")} — [ˈsɪstəz], в конце звонкое [z]. ${say('bright')} — [braɪt], gh не читается.`,
  why2:`Ударение в sister — на первый слог: SIS-ter’s. ${say("My sister's room")} — ${say('is very big and bright.')}`},
 {lvl:2, text:'This {is*|are@en.s.to_be} my friend Ben. {His*|Her|He} dad is a doctor.',
  why:`1) This — один человек → <b>is</b>. 2) Ben — мальчик → «его папа» = <b>his</b> dad.`,
  why2:`This is (это есть). Бен — он, его — his: ${say('His dad is a doctor.')}`},
 {lvl:2, text:`{Those*|That@en.s.this_that} are my sister's dolls. {Her*|His|She} dolls are very pretty.`,
  why:`1) dolls — много, и стоит are → <b>Those</b> (that — для одного). 2) Куклы сестры → её = <b>her</b> dolls.`,
  why2:`that → those (много). Сестра — она → её → her.`},
 {lvl:3, text:'My brother {has got*|have got@en.s.have_got} a hamster. {Its*|It\'s|It} name is Bob.',
  why:`1) My brother = he → <b>has got</b>. 2) «Его (хомяка) имя» → <b>its</b>. It’s = it is — здесь не подходит.`,
  why2:`Проверь: «It is name is Bob» — бессмыслица, значит its. Брат — он → has got.`},
 {lvl:3, text:`Ben has got {an*|a@en.s.a_an} uncle. {His*|He's|Him} uncle's name is Jack.`,
  why:`1) uncle начинается с гласного звука [ʌ] → <b>an</b> uncle. 2) «Его дядю зовут…» → <b>His</b> uncle’s name.`,
  why2:`an — перед гласным звуком. His — «его» (Бена). ${say("His uncle's name is Jack.")}`},
 {lvl:3, text:`{Whose*|Who's|Who} bag is this? — It's {Tom's*|Tom|Toms}.`,
  why:`1) «Чья?» → <b>Whose</b>. Who’s = who is («кто есть»). 2) Ответ «Томина» → <b>Tom’s</b>.`,
  why2:`Whose — «чей», и ответ на него — с ’s: ${say("Whose bag is this? It's Tom's.")}`},
 {lvl:3, text:`Look at the cat! {Its*|It's} eyes are green and {it's*|its} very fat.`,
  why:`1) «Её глаза» → <b>Its</b> eyes (чьи?). 2) «Она (есть) очень толстая» → <b>it’s</b> = it is.`,
  why2:`Проверка — подставь «it is»: «It is eyes» — нет → Its; «it is very fat» — да → it’s.`}
]});

/* ===================== Prepositions of place ===================== */
RU.rule({
id:'en.p.prep_place',
short:`Где? — ${say('in')} (в), ${say('on')} (на), ${say('under')} (под), ${say('next to')} (рядом), ${say('behind')} (за, позади), ${say('in front of')} (перед), ${say('between')} (между).`,
theory:`
<table class="sym">
<tr><th>Предлог</th><th>Значение</th><th>Пример</th></tr>
<tr><td>${say('in')}</td><td>в, внутри</td><td>${say('The ball is in the box.')}</td></tr>
<tr><td>${say('on')}</td><td>на (сверху, на поверхности)</td><td>${say('The book is on the table.')}</td></tr>
<tr><td>${say('under')}</td><td>под</td><td>${say('The dog is under the bed.')}</td></tr>
<tr><td>${say('next to')}</td><td>рядом с</td><td>${say('The lamp is next to the bed.')}</td></tr>
<tr><td>${say('behind')}</td><td>за, позади</td><td>${say('The cat is behind the sofa.')}</td></tr>
<tr><td>${say('in front of')}</td><td>перед</td><td>${say('The car is in front of the house.')}</td></tr>
<tr><td>${say('between')}</td><td>между (двумя)</td><td>${say('The shop is between the bank and the school.')}</td></tr>
</table>

<div class="box rule"><b>Предлоги-«слова из нескольких частей»</b>
${say('next to')} — всегда с <b>to</b>. ${say('in front of')} — всегда с <b>of</b>. ${say('between')} A <b>and</b> B — всегда с and.</div>

<div class="box tip"><b>Как запомнить</b>Представь коробку и мяч: мяч <b>in</b> — внутри, <b>on</b> — сверху, <b>under</b> — снизу, <b>behind</b> — спрятался сзади, <b>in front of</b> — стоит перед коробкой, <b>next to</b> — сбоку.<br>
Порядок слов: кто + is/are + предлог + место: ${say('My bag is under the table.')}</div>

<div class="box err"><b>Где русский язык подводит</b>
«на картинке» → ${say('in the picture')} (не on)<br>
«на небе» → ${say('in the sky')} (не on)<br>
«на стене» → ${say('on the wall')} (здесь совпадает)<br>
✗ next the park → ✓ ${say('next to the park')}<br>
✗ in front the house → ✓ ${say('in front of the house')}</div>`,
theory2:`
<p>Предлог места — это стрелочка, которая показывает, где предмет.</p>
<p>${say('in the bag')} — в сумке. ${say('on the bag')} — на сумке. ${say('under the bag')} — под сумкой.</p>
<p>Три предлога «с хвостиками»: next <b>to</b>, in front <b>of</b>, between … <b>and</b> …</p>
<p>${say('I sit between Tom and Ann.')} — Я сижу между Томом и Аней.</p>`,
items:[
 {lvl:1, q:'Мяч — В коробке.', text:'The ball is {in*|on|under} the box.',
  why:`«в, внутри» → <b>in</b>.`,
  why2:`in — внутри, on — сверху, under — снизу. ${say('The ball is in the box.')}`},
 {lvl:1, q:'Книга — НА столе.', text:'The book is {on*|in|under} the table.',
  why:`«на поверхности» → <b>on</b>.`,
  why2:`Книга лежит сверху на столе → on. ${say('The book is on the table.')}`},
 {lvl:1, q:'Собака — ПОД кроватью.', text:'The dog is {under*|on|behind} the bed.',
  why:`«под» → <b>under</b>.`,
  why2:`under — под, behind — за. ${say('The dog is under the bed.')}`},
 {lvl:1, q:'Кошка — ЗА диваном (позади него).', text:'The cat is {behind*|in front of|next to} the sofa.',
  why:`«за, позади» → <b>behind</b>. in front of — перед, next to — рядом.`,
  why2:`Кошка спряталась сзади → behind. ${say('The cat is behind the sofa.')}`},
 {type:'listen', lvl:1, say:'The ball is under the chair.', q:'Послушай. Где мяч?', opts:['на стуле','под стулом','за стулом'], ans:1,
  why:`${say('under the chair')} — под стулом.`,
  why2:`on — на, under — под, behind — за. Ты слышал under.`},
 {type:'read', lvl:1, text:'The red ball is under the big table.', q:'Прочитай вслух',
  why:`${say('under')} — [ˈʌndə], первый звук короткое «а», r в конце не читается. ${say('table')} — [ˈteɪbl].`,
  why2:`Связывай: ${say('is under')} — «изандэ». ${say('The red ball')} — ${say('is under the big table.')}`},
 {lvl:2, text:'The shop is {between*|next|in front} the bank and the school.',
  why:`Два места (the bank <b>and</b> the school) → <b>between</b> … and … «next» без to и «in front» без of — ошибки.`,
  why2:`Между двумя — between A and B. ${say('The shop is between the bank and the school.')}`},
 {lvl:2, text:'My house is {next to*|next|next of} the park.',
  why:`«рядом с» — всегда <b>next to</b>.`,
  why2:`Запомни как одно слово: next‿to. ${say('My house is next to the park.')}`},
 {lvl:2, text:'The car is {in front of*|in front|front of} the house.',
  why:`«перед» — всегда три слова: <b>in front of</b>.`,
  why2:`in + front + of. ${say('The car is in front of the house.')}`},
 {lvl:2, q:'Часы висят НА стене.', text:'There is a clock {on*|in|under} the wall.',
  why:`«на стене» → <b>on</b> the wall (на поверхности).`,
  why2:`Здесь как по-русски: на стене → on. ${say('There is a clock on the wall.')}`},
 {type:'spell', lvl:2, say:'between', ans:['between'], q:'Послушай и напиши предлог (между):',
  why:`<b>between</b> — be-tw-een, долгое [iː] пишется ee.`,
  why2:`${say('between')} [bɪˈtwiːn], ударение на второй слог.`},
 {type:'spell', lvl:2, say:'behind', ans:['behind'], q:'Послушай и напиши предлог (за, позади):',
  why:`<b>behind</b> — be-hind, i читается как [aɪ].`,
  why2:`Как в слове kind: hind [haɪnd]. ${say('behind the door')}`},
 {type:'read', lvl:2, text:'The school is between the park and the shop.', q:'Прочитай вслух',
  why:`${say('between')} — ударение на второй слог: be-TWEEN. ${say('school')} — [skuːl], долгое «у». ${say('shop')} — [ʃɒp].`,
  why2:`Читай частями: ${say('The school is')} — ${say('between the park')} — ${say('and the shop.')}`},
 {lvl:2, q:'Эти книги — НА полке.', text:'{These*|This@en.s.this_that} books are {on*|under|in} the shelf.',
  why:`1) books — много → <b>These</b>. 2) «на полке» → <b>on</b> the shelf.`,
  why2:`this — один, these — много. Книги стоят сверху на полке → on.`},
 {lvl:2, text:'{An*|A@en.s.a_an} old lamp is {next to*|next|next of} the bed.',
  why:`1) old начинается с гласного звука [əʊ] → <b>An</b>. 2) «рядом с» → <b>next to</b>.`,
  why2:`an old, an apple, an egg. И next всегда с to: ${say('An old lamp is next to the bed.')}`},
 {lvl:3, q:'На картинке — две кошки.',text:'There are two cats {in*|on} the picture.',
  why:`По-русски «на картинке», а по-английски — <b>in</b> the picture (внутри рамки).`,
  why2:`Картинка — как окно: то, что нарисовано, — внутри. ${say('There are two cats in the picture.')}`},
 {lvl:3, text:'Birds are flying {in*|on} the sky.',
  why:`«на небе» → <b>in</b> the sky. Небо — как огромная комната, птицы внутри.`,
  why2:`Русское «на» здесь обманывает. Правильно: ${say('in the sky')}.`},
 {lvl:3, q:'Мои ноги — ПОД одеялом.', text:'My {feet*|foots@en.s.plurals} are {under*|between|on} the blanket.',
  why:`1) foot → <b>feet</b> (исключение). 2) «под одеялом» → <b>under</b>.`,
  why2:`Как tooth → teeth, foot → feet. Под → under.`},
 {lvl:3, text:'The kitten {can*|cans@en.s.can} hide {behind*|between of|in front} the curtains.',
  why:`1) <b>can</b> без -s, даже с it. 2) «за шторами» → <b>behind</b>. «between of» и «in front» без of — ошибки.`,
  why2:`Котёнок может спрятаться за шторами: ${say('The kitten can hide behind the curtains.')}`},
 {lvl:3, text:'Kate {has got*|have got@en.s.have_got} a desk {in front of*|in front|front of} the window.',
  why:`1) Kate = she → <b>has got</b>. 2) «перед» → <b>in front of</b>, все три слова.`,
  why2:`Она — has got. Перед окном — in front of the window.`},
 {lvl:3, q:'Как сказать «Кошка сидит между двумя собаками»?', opts:['The cat is sitting between two dogs.','The cat is sitting between of two dogs.','The cat is sitting next two dogs.'], ans:0, sayAfter:'The cat is sitting between two dogs.',
  why:`<b>between</b> — без of. «next two dogs» — без to и значит другое.`,
  why2:`between — одно слово, никаких of: between two dogs.`}
]});

/* ===================== Imperative ===================== */
RU.rule({
id:'en.p.imperative',
short:`Просьба или команда — глагол в начальной форме: ${say('Sit down!')} Запрет — <b>Don’t</b> + глагол: ${say("Don't run!")} Приглашение — <b>Let’s</b> + глагол: ${say("Let's play!")}`,
theory:`
<p>Когда мы просим или командуем, английский глагол стоит <b>в самом начале</b> и в самой простой форме — без to, без -s, без -ing.</p>

<div class="box rule"><b>Три формулы</b>
1) Глагол: ${say('Sit down, please.')} ${say('Open your books.')} ${say('Listen!')}<br>
2) <b>Don’t</b> + глагол: ${say("Don't run!")} ${say("Don't touch the cat!")}<br>
3) <b>Let’s</b> + глагол (давай…): ${say("Let's play!")} ${say("Let's go to the park!")}</div>

<p>С прилагательными (тихий, осторожный) нужен <b>be</b>:<br>
${say('Be quiet!')} — Тише! ${say('Be careful!')} — Осторожно! ${say("Don't be late!")} — Не опаздывай!</p>

<p>Вежливо: добавь ${say('please')} в начало или в конец: ${say('Please close the door.')} ${say('Close the door, please.')}</p>

<p>Команды на уроке: ${say('Stand up!')} ${say('Sit down!')} ${say('Open your books!')} ${say('Close your books!')} ${say('Listen and repeat!')} ${say("Don't talk!")}</p>

<div class="box tip"><b>Как запомнить</b>Команда — как кнопка: одно короткое слово в начале. Запрет — «красная кнопка» <b>Don’t</b>. Не важно, говоришь ты одному или многим — форма одна и та же.</div>

<div class="box err"><b>Типичные ошибки</b>
✗ Not run! → ✓ ${say("Don't run!")}<br>
✗ Don't to shout! → ✓ ${say("Don't shout!")}<br>
✗ Let's to play! / Let's playing! → ✓ ${say("Let's play!")}<br>
✗ Are quiet! → ✓ ${say('Be quiet!')}<br>
✗ Not be late! → ✓ ${say("Don't be late!")}</div>`,
theory2:`
<p>Представь, что ты тренер. Ты просто называешь действие: ${say('Run!')} — Беги! ${say('Jump!')} — Прыгай! ${say('Stop!')} — Стоп!</p>
<p>Хочешь запретить — ставишь перед ним Don’t: ${say("Don't jump!")} — Не прыгай!</p>
<p>Хочешь позвать друга — Let’s: ${say("Let's jump!")} — Давай прыгать!</p>`,
items:[
 {lvl:1, text:'{Sit*|Sits|Sitting} down, please.',
  why:`Команда → глагол в начальной форме: <b>Sit</b> down.`,
  why2:`Никаких -s и -ing в командах: ${say('Sit down, please.')}`},
 {lvl:1, text:'{Open*|Opens|To open} your books!',
  why:`Команда начинается с простого глагола: <b>Open</b>. To не нужен.`,
  why2:`Учитель говорит: ${say('Open your books!')} — просто глагол.`},
 {lvl:1, text:`{Don't*|Not|No} run in the classroom!`,
  why:`Запрет → <b>Don’t</b> + глагол: Don’t run.`,
  why2:`«Не бегай» — не «Not run», а ${say("Don't run!")}`},
 {lvl:1, text:'{Be*|Are|Is} quiet, please!',
  why:`quiet — прилагательное (тихий), в команде с ним нужен <b>Be</b>.`,
  why2:`Be quiet! Be careful! Be good! — всегда be. ${say('Be quiet, please!')}`},
 {type:'listen', lvl:1, say:'Close the window, please.', q:'Послушай. Что тебя просят сделать?', opts:['открыть окно','закрыть окно','помыть окно'], ans:1,
  why:`${say('close')} — закрыть. open — открыть, wash — помыть.`,
  why2:`Ты услышал: ${say('Close the window, please.')}`},
 {type:'listen', lvl:1, say:"Don't touch the cat!", q:'Послушай. Что тебе говорят?', opts:['Погладь кошку!','Не трогай кошку!','Покорми кошку!'], ans:1,
  why:`${say("Don't touch")} — не трогай. Слово Don’t в начале — это запрет.`,
  why2:`touch — трогать, feed — кормить. Don’t → «не».`},
 {type:'read', lvl:1, text:'Please open the window and sit down.', q:'Прочитай вслух',
  why:`${say('please')} — долгое [iː], в конце звонкое [z]. ${say('open')} — [ˈəʊpən], «оупэн». ${say('window')} — [ˈwɪndəʊ], губы трубочкой на w.`,
  why2:`Читай спокойно, как вежливую просьбу: ${say('Please open the window')} — ${say('and sit down.')}`},
 {lvl:2, text:`Don't {shout*|shouting|to shout}! The baby is sleeping.`,
  why:`После <b>Don’t</b> — глагол в начальной форме: Don’t <b>shout</b>.`,
  why2:`Don’t + голый глагол, без to и -ing: ${say("Don't shout!")}`},
 {lvl:2, text:`{Don't be*|Don't|Not be} late for school!`,
  why:`late — прилагательное → нужно be, а запрет — Don’t: <b>Don’t be</b> late.`,
  why2:`Be late (опоздать) → Don’t be late (не опаздывай).`},
 {lvl:2, text:`Let's {play*|to play|playing} football!`,
  why:`После <b>Let’s</b> — глагол без to и без -ing: Let’s <b>play</b>.`,
  why2:`Let’s + глагол: ${say("Let's play football!")}`},
 {lvl:2, text:`{Let's*|Let we|Lets} go to the park! — Good idea!`,
  why:`«Давай(те) пойдём» → <b>Let’s</b> (= let us), с апострофом. «Let we» — ошибка, «Lets» без апострофа — другое слово.`,
  why2:`Let’s — это сокращение let us. Апостроф обязателен: ${say("Let's go to the park!")}`},
 {type:'spell', lvl:2, say:'listen', ans:['listen'], q:'Послушай и напиши команду (Слушай!):',
  why:`<b>listen</b> — буква t не читается: [ˈlɪsn].`,
  why2:`Пишется li-s-t-en, а звучит «лисн». ${say('Listen and repeat!')}`},
 {type:'spell', lvl:2, say:'repeat', ans:['repeat'], q:'Послушай и напиши команду (Повтори!):',
  why:`<b>repeat</b> — re-peat, долгое [iː] пишется ea.`,
  why2:`${say('Listen and repeat!')} — Послушай и повтори!`},
 {type:'read', lvl:2, text:`Don't feed the animals in the zoo, please.`, q:'Прочитай вслух',
  why:`${say("Don't")} — [dəʊnt], «доунт». ${say('feed')} — долгое [iː]. ${say('animals')} — ударение на первый слог: AN-i-mals.`,
  why2:`Связывай: ${say('animals in the zoo')}. В zoo — звонкое [z]: [zuː].`},
 {lvl:2, text:'{Wash*|Washes|Washing} your hands. They {are*|is@en.s.to_be} dirty.',
  why:`1) Команда → <b>Wash</b>. 2) They (руки) → <b>are</b>.`,
  why2:`Команда — простой глагол. Руки — много → are: ${say('They are dirty.')}`},
 {lvl:2, text:`Give me {an*|a@en.s.a_an} apple, please. — Here you are. {Don't*|Doesn't|Not} eat it now. It is for lunch.`,
  why:`1) apple начинается с гласного звука → <b>an</b>. 2) Запрет → <b>Don’t</b> eat (doesn’t в командах не бывает).`,
  why2:`an apple. Не ешь — ${say("Don't eat it now.")}`},
 {lvl:3, text:'{Look*|Looks|Looking} at {those*|that@en.s.this_that} birds!',
  why:`1) Команда → <b>Look</b>. 2) birds — много, далеко → <b>those</b>.`,
  why2:`that bird — одна, those birds — много. ${say('Look at those birds!')}`},
 {lvl:3, text:`Please {don't*|not|doesn't} feed the {sheep*|sheeps@en.s.plurals}.`,
  why:`1) Запрет → <b>don’t</b>. 2) sheep во множественном числе тоже <b>sheep</b> — «sheeps» не бывает.`,
  why2:`Одна овца — a sheep, много — sheep. А «не корми» — don’t feed.`},
 {lvl:3, text:`You {can*|cans|can to@en.s.can} take my pen. {Don't*|Not|Doesn't} lose it!`,
  why:`1) <b>can</b> + глагол без to: can take. 2) Запрет → <b>Don’t</b> lose it.`,
  why2:`Можешь взять — can take. Не потеряй — Don’t lose.`},
 {lvl:3, q:'Учитель говорит: «Не открывайте учебники!» Как это по-английски?', opts:[`Don't open your books!`,'Not open your books!',`Doesn't open your books!`], ans:0, sayAfter:"Don't open your books!",
  why:`Запрет всегда с <b>Don’t</b> — и для одного, и для всего класса.`,
  why2:`Не важно, сколько человек слушает: ${say("Don't open your books!")}`},
 {lvl:3, q:'В каком предложении ошибка?', opts:[`Let's go home!`,`Don't be angry!`,`Don't to cry!`], ans:2,
  why:`После Don’t не ставится to. Правильно: ${say("Don't cry!")}`,
  why2:`Let’s go и Don’t be angry — верно. «Don’t to cry» — лишнее to.`}
]});

/* ===================== was / were ===================== */
RU.rule({
id:'en.p.was_were',
short:`«Был, была, было» → <b>was</b> (I, he, she, it). «Были» → <b>were</b> (we, you, they). ${say('I was at home. They were at school.')}`,
theory:`
<p>Глагол to be (am, is, are) в прошлом имеет всего две формы: <b>was</b> и <b>were</b>.</p>

<table class="sym">
<tr><th>Сейчас</th><th>Вчера</th><th>Пример</th></tr>
<tr><td>I am</td><td><b>I was</b></td><td>${say('I was at home yesterday.')}</td></tr>
<tr><td>he / she / it is</td><td><b>was</b></td><td>${say('She was ill.')} ${say('It was cold.')}</td></tr>
<tr><td>we / you / they are</td><td><b>were</b></td><td>${say('We were at the zoo.')} ${say('You were late.')}</td></tr>
</table>

<div class="box rule"><b>Отрицание и вопрос</b>
${say("I wasn't tired.")} ${say("They weren't at school.")}<br>
${say('Was she at home? — Yes, she was.')}<br>
${say("Were you at the party? — No, I wasn't.")}<br>
${say('Where were you yesterday?')}</div>

<p>Слова-подсказки: ${say('yesterday')} (вчера), ${say('last week')} (на прошлой неделе), ${say('last summer')}, ${say('two days ago')} (два дня назад), ${say('then')} (тогда).</p>

<div class="box tip"><b>Как запомнить</b>Am и is превращаются в <b>was</b>, are превращается в <b>were</b>. Буква a в обоих: <b>a</b>m → w<b>a</b>s. И you — всегда were, даже если «ты» один.</div>

<div class="box err"><b>Типичные ошибки</b>
✗ I were happy. → ✓ ${say('I was happy.')}<br>
✗ They was at home. → ✓ ${say('They were at home.')}<br>
✗ You was late. → ✓ ${say('You were late.')}<br>
✗ Did you happy? → ✓ ${say('Were you happy?')}</div>`,
theory2:`
<p>Считай людей: <b>один</b> (я, он, она, оно) — was; <b>много</b> (мы, они) — were. Плюс «ты/вы» — всегда were.</p>
<p>${say('My cat was hungry.')} — Моя кошка была голодная.<br>
${say('My cats were hungry.')} — Мои кошки были голодные.</p>`,
items:[
 {lvl:1, text:'I {was*|were} at home yesterday.',
  why:`I am → I <b>was</b>.`,
  why2:`Я — один → was. ${say('I was at home yesterday.')}`},
 {lvl:1, text:'The children {were*|was} in the park.',
  why:`The children = they → <b>were</b>.`,
  why2:`Детей много → were. ${say('The children were in the park.')}`},
 {lvl:1, text:'My cat {was*|were} hungry this morning.',
  why:`My cat = it → <b>was</b>.`,
  why2:`Одна кошка → was: ${say('My cat was hungry this morning.')}`},
 {lvl:1, text:'We {were*|was} at school on Monday.',
  why:`We → <b>were</b>.`,
  why2:`We are → we were. ${say('We were at school on Monday.')}`},
 {type:'listen', lvl:1, say:'Yesterday it was cold and rainy.', q:'Послушай. Какая погода была вчера?', opts:['тепло и солнечно','холодно и дождливо','холодно и снежно'], ans:1,
  why:`${say('cold')} — холодно, ${say('rainy')} — дождливо. warm — тепло, sunny — солнечно, snowy — снежно.`,
  why2:`Ты слышал ${say('cold and rainy')}.`},
 {type:'read', lvl:1, text:'Yesterday the weather was sunny and warm.', q:'Прочитай вслух',
  why:`${say('weather')} — [ˈweðə], th звонкий, язык между зубами. ${say('was')} — [wɒz], звонкое [z] в конце. ${say('warm')} — [wɔːm], долгое «о».`,
  why2:`Не говори «везер» — в weather язык между зубами. ${say('Yesterday the weather')} — ${say('was sunny and warm.')}`},
 {lvl:2, text:'You {were*|was} late, Tom!',
  why:`С <b>you</b> всегда <b>were</b> — даже если говорим одному Тому.`,
  why2:`you are → you were. ${say('You were late, Tom!')}`},
 {lvl:2, text:'{Was*|Were} your sister at the party? — Yes, she {was*|were}.',
  why:`Your sister = she → <b>Was</b> she…? и ответ ${say('Yes, she was.')}`,
  why2:`Вопрос: was выходит вперёд. Сестра одна → was.`},
 {lvl:2, text:`{Were*|Was} the boys at the zoo? — No, they {weren't*|wasn't}.`,
  why:`The boys = they → <b>Were</b>…? Ответ: they <b>weren’t</b>.`,
  why2:`Мальчиков много → were/weren’t.`},
 {lvl:2, text:`It {wasn't*|weren't} hot yesterday.`,
  why:`It → was → отрицание <b>wasn’t</b>.`,
  why2:`It is → it was → it wasn’t. ${say("It wasn't hot yesterday.")}`},
 {lvl:2, text:'Where {were*|was} you last Sunday?',
  why:`you → <b>were</b>: Where were you…?`,
  why2:`С you только were. ${say('Where were you last Sunday?')}`},
 {type:'spell', lvl:2, say:'yesterday', ans:['yesterday'], q:'Послушай и напиши слово (вчера):',
  why:`<b>yesterday</b> — yes-ter-day.`,
  why2:`Три части: yes + ter + day. ${say('I was at home yesterday.')}`},
 {type:'listen', lvl:2, say:'They were at the cinema.', q:'Послушай. Что прозвучало?', opts:['They are at the cinema.','They were at the cinema.','They was at the cinema.'], ans:1,
  why:`Ты слышал ${say('were')} [wɜː]. «They was» — так не говорят, а «are» — это «сейчас».`,
  why2:`They → were. ${say('They were at the cinema.')}`},
 {type:'read', lvl:2, text:'My grandparents were in the village last summer.', q:'Прочитай вслух',
  why:`${say('grandparents')} — ударение на первый слог: GRAND-parents. ${say('were')} — [wɜː], губы вперёд. ${say('village')} — [ˈvɪlɪdʒ].`,
  why2:`Читай частями: ${say('My grandparents')} — ${say('were in the village')} — ${say('last summer.')}`},
 {lvl:2, text:`Now I {am*|is@en.s.to_be} at home, but yesterday I {was*|were} at Grandma's.`,
  why:`1) Сейчас, I → <b>am</b>. 2) Вчера, I → <b>was</b>.`,
  why2:`I am (сейчас) → I was (вчера).`},
 {lvl:2, text:'{These*|This@en.s.this_that} flowers {were*|was} in our garden last year.',
  why:`1) flowers — много → <b>These</b>. 2) Много цветов → <b>were</b>.`,
  why2:`Цветы — много: these + were.`},
 {lvl:3, text:'There {were*|was} three {mice*|mouses@en.s.plurals} in the kitchen last night.',
  why:`1) три мыши — много → There <b>were</b>. 2) mouse → <b>mice</b> (исключение).`,
  why2:`There is → there was, there are → there were. Мыши: mouse → mice.`},
 {lvl:3, text:'My friend and I {were*|was} at the zoo. We saw {an*|a@en.s.a_an} elephant.',
  why:`1) My friend and I = мы (we) → <b>were</b>. 2) elephant начинается с гласного звука → <b>an</b>.`,
  why2:`Друг и я — двое → were. An elephant — перед гласным звуком an.`},
 {lvl:3, text:'My mum and dad {were*|was} at work, and my brother {was*|were} at school.',
  why:`1) Mum and dad = они → <b>were</b>. 2) My brother = он → <b>was</b>.`,
  why2:`Двое (мама и папа) → were. Один брат → was.`},
 {lvl:3, text:'{Were*|Was|Did} you happy yesterday? — Yes, I {was*|were}.',
  why:`1) you + прилагательное (happy) → <b>Were</b> you…? (did здесь не нужен). 2) Ответ про себя: I <b>was</b>.`,
  why2:`Вопрос к you — were, ответ от «я» — was.`},
 {lvl:3, q:'В каком предложении ошибка?', opts:['I was tired.','We was in London.','It was my birthday.'], ans:1,
  why:`We → <b>were</b>. Правильно: ${say('We were in London.')}`,
  why2:`I was, it was — верно. С we — только were.`}
]});

/* ===================== Wh-questions ===================== */
RU.rule({
id:'en.p.wh_questions',
short:`Вопросительные слова: ${say('what')} (что), ${say('where')} (где), ${say('when')} (когда), ${say('who')} (кто), ${say('how many')} (сколько). Порядок: слово + is/are/do/does + кто + …?`,
theory:`
<table class="sym">
<tr><th>Слово</th><th>Значение</th><th>Пример</th></tr>
<tr><td>${say('What')}</td><td>что, какой</td><td>${say('What is your name?')}</td></tr>
<tr><td>${say('Where')}</td><td>где, куда</td><td>${say('Where is my bag?')}</td></tr>
<tr><td>${say('When')}</td><td>когда</td><td>${say('When is your birthday?')}</td></tr>
<tr><td>${say('Who')}</td><td>кто</td><td>${say('Who is that girl?')}</td></tr>
<tr><td>${say('How many')}</td><td>сколько (штук)</td><td>${say('How many cats have you got?')}</td></tr>
<tr><td>${say('How old')}</td><td>сколько лет</td><td>${say('How old are you?')}</td></tr>
</table>

<div class="box rule"><b>Порядок слов</b>
С is/are/was/can: <b>слово + is + кто</b> — ${say('Where is the cat?')} ${say('What can you see?')}<br>
С обычным глаголом: <b>слово + do/does + кто + глагол</b> — ${say('Where do you live?')} ${say('What does your dog eat?')}<br>
Сейчас: ${say('What are you doing?')}</div>

<p>После <b>How many</b> — существительное во множественном числе: ${say('How many apples are there?')}</p>

<div class="box tip"><b>Как запомнить</b>Сначала «вопросик», потом «помощник», потом «кто». Слово ${say('Who')} про того, кто делает, — без помощника: ${say('Who lives here?')} (как he lives).<br>
Подсказка в ответе: «На диване» → Where. «В мае» → When. «Мой дядя» → Who. «Два» → How many.</div>

<div class="box err"><b>Типичные ошибки</b>
✗ Where you live? → ✓ ${say('Where do you live?')}<br>
✗ What your name? → ✓ ${say('What is your name?')}<br>
✗ How many cat? → ✓ ${say('How many cats?')}<br>
✗ Where does you live? → ✓ ${say('Where do you live?')}</div>`,
theory2:`
<p>Вопросительное слово — это «фонарик»: он показывает, что ты хочешь узнать.</p>
<p>Место → ${say('Where?')} Время → ${say('When?')} Человек → ${say('Who?')} Вещь → ${say('What?')} Число → ${say('How many?')}</p>
<p>Дальше — как в простом вопросе: ${say('Is it big?')} → ${say('Where is it?')}</p>`,
items:[
 {lvl:1, text:'{Where*|When|Who} is the cat? — It is on the sofa.',
  why:`Ответ — место («на диване») → <b>Where</b>.`,
  why2:`Где? — Where. ${say('Where is the cat?')}`},
 {lvl:1, text:'{What*|Who|Where} is your name? — My name is Ben.',
  why:`«Как тебя зовут?» по-английски — «Что есть твоё имя?»: <b>What</b> is your name?`,
  why2:`Запомни фразу целиком: ${say('What is your name?')}`},
 {lvl:1, text:'{Who*|What|Where} is that man? — He is my uncle.',
  why:`Спрашиваем о человеке, ответ «мой дядя» → <b>Who</b>.`,
  why2:`Кто? — Who. ${say('Who is that man?')}`},
 {lvl:1, text:'{When*|Where|Who} is your birthday? — In May.',
  why:`Ответ — время («в мае») → <b>When</b>.`,
  why2:`Когда? — When. ${say('When is your birthday?')}`},
 {lvl:1, text:'{How many*|How much|What} cats have you got? — Two.',
  why:`Кошек можно посчитать, ответ — число → <b>How many</b>.`,
  why2:`Сколько штук? — How many + много: How many cats?`},
 {type:'listen', lvl:1, say:'Where is my pencil?', q:'Послушай. Что спросили?', opts:['Где мой карандаш?','Когда мой карандаш?','Чей это карандаш?'], ans:0,
  why:`${say('Where')} — где.`,
  why2:`where [weə] — где, when [wen] — когда.`},
 {type:'read', lvl:1, text:'How many books are there on the desk?', q:'Прочитай вслух',
  why:`${say('How many')} — [haʊ ˈmeni], «хау мэни». ${say('books')} — короткое [ʊ]. ${say('desk')} — [desk].`,
  why2:`Голос в конце такого вопроса идёт вниз. ${say('How many books')} — ${say('are there on the desk?')}`},
 {lvl:2, text:'{How old*|How many|What old} are you? — I am ten.',
  why:`Спрашиваем про возраст → <b>How old</b> (сколько лет).`,
  why2:`«Сколько тебе лет?» = ${say('How old are you?')}`},
 {lvl:2, text:'What {does*|do|are} your brother like? — He likes pizza.',
  why:`Your brother = he, глагол like → помощник <b>does</b>.`,
  why2:`Вопрос: What + does + брат + like? Глагол без -s: ${say('What does your brother like?')}`},
 {lvl:2, text:'Where {do*|does|are} you live? — In Moscow.',
  why:`you + обычный глагол live → <b>do</b>.`,
  why2:`Where do you live? (does — для he/she/it).`},
 {lvl:2, text:`When {does*|do|is} the film start? — At six o'clock.`,
  why:`The film = it, глагол start → <b>does</b>.`,
  why2:`it → does. ${say('When does the film start?')}`},
 {lvl:2, text:'{How many*|How much|How} legs has a spider got? — Eight.',
  why:`Ноги можно посчитать, ответ — число → <b>How many</b>.`,
  why2:`Сколько ног? — How many legs? ${say('How many legs has a spider got?')}`},
 {lvl:2, q:'Ответ: «There are five apples». Какой был вопрос?', opts:['How many apples are there?','Where are the apples?','When are the apples?'], ans:0, sayAfter:'How many apples are there? There are five apples.',
  why:`В ответе — число (five) → вопрос <b>How many</b>.`,
  why2:`Сколько? — How many. Где? — Where (ответ был бы «на столе»).`},
 {type:'listen', lvl:2, say:'How many sisters have you got?', q:'Послушай. О чём тебя спросили?', opts:['Как зовут твою сестру?','Сколько у тебя сестёр?','Где живёт твоя сестра?'], ans:1,
  why:`${say('How many sisters')} — сколько сестёр.`,
  why2:`How many — сколько. Как зовут — What is her name? Где живёт — Where does she live?`},
 {type:'spell', lvl:2, say:'when', ans:['when'], q:'Послушай и напиши вопросительное слово (когда):',
  why:`<b>when</b> — пишется wh, читается [wen].`,
  why2:`Почти все вопросительные слова начинаются с wh: what, where, when, who.`},
 {type:'spell', lvl:2, say:'how many', ans:['how many'], q:'Послушай и напиши (сколько) — два слова:',
  why:`<b>how many</b> — два слова. many — пишется с a, а звучит [ˈmeni].`,
  why2:`${say('How many cats?')} — сколько кошек?`},
 {type:'read', lvl:2, text:'Where is your school? It is near the park.', q:'Прочитай вслух',
  why:`${say('Where')} — [weə], губы трубочкой. ${say('school')} — долгое «у». ${say('near')} — [nɪə].`,
  why2:`${say('Where is your school?')} — ${say('It is near the park.')}`},
 {lvl:2, text:'{Where*|What|Who} {are*|is@en.s.to_be} my shoes? — They are under the bed.',
  why:`1) Ответ — место → <b>Where</b>. 2) shoes — много → <b>are</b>.`,
  why2:`Где? — Where. Ботинки — they → are.`},
 {lvl:2, text:'{What*|Where|Who} is {this*|these@en.s.this_that}? — It is a new toy.',
  why:`1) Это вещь (игрушка) → <b>What</b>. 2) is и ответ «It» — один предмет → <b>this</b>.`,
  why2:`Что это? — What is this? These — для многих.`},
 {lvl:3, text:'{How many*|How much|What} {children*|childs@en.s.plurals} are there in your class? — Twenty.',
  why:`1) Ответ — число → <b>How many</b>. 2) child → <b>children</b> (исключение).`,
  why2:`How many + множественное: How many children…?`},
 {lvl:3, text:`{What*|Who|Where} {can*|cans@en.s.can} your parrot say? — It can say "Hello".`,
  why:`1) Спрашиваем о словах (что?) → <b>What</b>. 2) <b>can</b> без -s.`,
  why2:`Что умеет говорить? — What can… say? Can никогда не получает -s.`},
 {lvl:3, text:'Who {lives*|live|does lives} in this house? — My grandma.',
  why:`Who спрашивает о том, кто делает, — без помощника, а глагол как с he: <b>lives</b>.`,
  why2:`Who = «кто-то один» = he → ${say('Who lives in this house?')}`},
 {lvl:3, text:'What {are*|is|do} the children doing? — They are playing.',
  why:`Сейчас (doing) + the children (они) → <b>are</b>.`,
  why2:`Present Continuous: What are they doing? ${say('What are the children doing?')}`},
 {lvl:3, q:'Какой вопрос правильный?', opts:['Where you live?','Where do you live?','Where does you live?'], ans:1, sayAfter:'Where do you live?',
  why:`Нужен помощник <b>do</b> (для you).`,
  why2:`Без помощника нельзя, а does — только для he/she/it.`}
]});

/* ===================== Итоговое упражнение ===================== */
RU.mix('P',[
 {lvl:1, text:'There {are*|is@en.p.there_is} two {dogs*|dog@en.s.plurals} in the garden.',
  why:`1) two dogs — много → <b>There are</b>. 2) two → множественное <b>dogs</b>.`,
  why2:`Две собаки: are + dogs.`},
 {lvl:1, text:'Look! {My*|Me@en.p.possessive} cat {is sleeping*|sleeping|sleeps@en.p.pc_basic} {on*|in front@en.p.prep_place} the sofa.',
  why:`1) «Моя кошка» → <b>My</b>. 2) Look! → прямо сейчас: <b>is sleeping</b>. 3) «на диване» → <b>on</b>; «in front» без of — ошибка.`,
  why2:`My cat (моя), is sleeping (сейчас спит), on the sofa (на диване).`},
 {lvl:1, text:'{Where*|When@en.p.wh_questions} {were*|was@en.p.was_were} you yesterday? — At the zoo.',
  why:`1) Ответ — место → <b>Where</b>. 2) you → <b>were</b>.`,
  why2:`Где ты был? — ${say('Where were you yesterday?')}`},
 {lvl:1, text:`{Don't*|Doesn't@en.p.imperative} touch {that*|those@en.s.this_that} plate! It is hot.`,
  why:`1) Запрет → <b>Don’t</b>. 2) plate — одна тарелка → <b>that</b>.`,
  why2:`Не трогай — Don’t touch. Одна тарелка — that plate.`},
 {lvl:2, text:'My sister {has got*|have got@en.s.have_got} a bike. She {rides*|ride@en.p.ps_basic} it every day.',
  why:`1) My sister = she → <b>has got</b>. 2) She + каждый день → <b>rides</b>.`,
  why2:`Она — has got и rides (с хвостиком).`},
 {lvl:2, text:'{Is there*|Are there@en.p.there_is} {an*|a@en.s.a_an} apple in the fridge? — Yes, there is.',
  why:`1) Одно яблоко → <b>Is there</b>. 2) apple — с гласного звука → <b>an</b>.`,
  why2:`Is there an apple…? Ответ «there is» тоже подсказывает is.`},
 {lvl:2, text:'Tom {can*|cans@en.s.can} swim. Now he {is swimming*|is swiming@en.p.pc_basic} in the pool.',
  why:`1) <b>can</b> без -s. 2) swim → <b>swimming</b> (двойная m).`,
  why2:`He can swim. Сейчас: he is swi<b>mm</b>ing.`},
 {lvl:2, text:'{How many*|How much@en.p.wh_questions} {children*|childs@en.s.plurals} {were*|was@en.p.was_were} at the party?',
  why:`1) Детей считаем → <b>How many</b>. 2) child → <b>children</b>. 3) Много детей → <b>were</b>.`,
  why2:`How many children were at the party? — Сколько детей было на празднике?`},
 {lvl:2, text:'Ben and Max are brothers. {Their*|There@en.p.possessive} room is {next to*|next@en.p.prep_place} the kitchen.',
  why:`1) «Их комната» → <b>Their</b> (there — «там»). 2) «рядом с» → <b>next to</b>.`,
  why2:`Чья комната? Их — their. Рядом — next to.`},
 {lvl:2, text:'{Be*|Are@en.p.imperative} careful! The {knives*|knifes@en.s.plurals} are sharp.',
  why:`1) Команда с прилагательным → <b>Be</b> careful. 2) knife → <b>knives</b> (f → ves).`,
  why2:`Be careful! И knife — knives, как wife — wives.`},
 {lvl:2, text:`I {am*|is@en.s.to_be} hungry. {Let's*|Let@en.p.imperative} have lunch!`,
  why:`1) I → <b>am</b>. 2) «Давай пообедаем» → <b>Let’s</b> have lunch.`,
  why2:`I am hungry. Let’s = let us — «давай».`},
 {lvl:2, text:`{This*|These@en.s.this_that} is my grandpa. He {doesn't*|don't@en.p.ps_basic} like coffee.`,
  why:`1) is + один человек → <b>This</b>. 2) He → <b>doesn’t</b>.`,
  why2:`This is (один). He doesn’t like (он не любит).`},
 {lvl:3, text:'{What*|Who@en.p.wh_questions} {does*|do@en.p.ps_basic} your dog eat? — Meat and biscuits.',
  why:`1) Ответ — еда (вещи) → <b>What</b>. 2) your dog = it → <b>does</b>.`,
  why2:`Что ест собака? — What does your dog eat?`},
 {lvl:3, text:'Yesterday the weather {was*|were@en.p.was_were} bad, but today it {is*|are@en.s.to_be} sunny.',
  why:`1) Вчера, the weather = it → <b>was</b>. 2) Сегодня, it → <b>is</b>.`,
  why2:`Вчера — was, сегодня — is.`},
 {lvl:3, text:'There {is*|are@en.p.there_is} a lamp {between*|next@en.p.prep_place} the bed and the window.',
  why:`1) a lamp — одна → <b>There is</b>. 2) Два места через and → <b>between</b>; «next» без to — ошибка.`,
  why2:`Одна лампа — is. Между кроватью и окном — between … and ….`},
 {lvl:3, text:'My parents {were*|was@en.p.was_were} in Paris last year. {Their*|Her@en.p.possessive} hotel was very nice.',
  why:`1) My parents = они → <b>were</b>. 2) «Их отель» → <b>Their</b>.`,
  why2:`Родители — они: were, their.`},
 {lvl:3, text:'Listen! Mum {is singing*|sings@en.p.pc_basic}. She {can*|cans@en.s.can} sing very well.',
  why:`1) Listen! → прямо сейчас: <b>is singing</b>. 2) <b>can</b> без -s.`,
  why2:`Слушай — мама поёт (сейчас). Она умеет — she can.`}
]);
})();
