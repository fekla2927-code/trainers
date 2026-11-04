/* Английский язык — 6 класс. Темы en.6.* и итоговое упражнение RU.mix(6, …). */
(function(){
const s=(t,shown)=>`<span class="say" data-say="${t}">${shown||t}</span>`;
const tr=t=>`<span class="tr">[${t}]</span>`;

/* ===================== Past Simple: правильные глаголы ===================== */
RU.rule({
id:'en.6.past_reg',
short:`Past Simple — то, что уже случилось и закончилось. Правильный глагол + -ed: ${s('I played.')} ${s('She watched TV.')} Форма одна для всех: I, he, they — played.`,
theory:`
<div class="box rule"><b>Когда нужен Past Simple</b>
<p>Действие <b>случилось в прошлом и закончилось</b>: вчера, на прошлой неделе, два дня назад, в детстве.</p>
<p>${s('Yesterday I played football.')} — Вчера я играл в футбол.</p>
<p>${s('We watched a film last night.')} — Мы смотрели фильм вчера вечером.</p>
<p>Слова-подсказки: ${s('yesterday')}, ${s('last week')}, ${s('last Sunday')}, ${s('last year')}, ${s('two days ago')}, ${s('in 2015')}.</p></div>
<div class="box rule"><b>Формула</b>
<p><b>глагол + -ed</b> — и всё! Форма <b>одна для всех лиц</b>:</p>
<p>${s('I worked')} · ${s('you worked')} · ${s('he worked')} · ${s('she worked')} · ${s('we worked')} · ${s('they worked')}</p>
<p>Никакого -s у he/she в прошлом нет: ${s('He played.')}, а не «He playeds».</p></div>
<div class="box tip"><b>Правила написания (это важно!)</b>
<table class="sym">
<tr><th>Глагол</th><th>Что делаем</th><th>Примеры</th></tr>
<tr><td>обычный</td><td>+ ed</td><td>${s('work')} → ${s('worked')}, ${s('play')} → ${s('played')}, ${s('help')} → ${s('helped')}</td></tr>
<tr><td>кончается на -e</td><td>+ d</td><td>${s('like')} → ${s('liked')}, ${s('live')} → ${s('lived')}, ${s('dance')} → ${s('danced')}</td></tr>
<tr><td>согласная + y</td><td>y → i + ed</td><td>${s('study')} → ${s('studied')}, ${s('cry')} → ${s('cried')}, ${s('carry')} → ${s('carried')}</td></tr>
<tr><td>гласная + y</td><td>просто + ed</td><td>${s('play')} → ${s('played')}, ${s('stay')} → ${s('stayed')}, ${s('enjoy')} → ${s('enjoyed')}</td></tr>
<tr><td>короткий: 1 гласная + 1 согласная на конце</td><td>удваиваем согласную</td><td>${s('stop')} → ${s('stopped')}, ${s('plan')} → ${s('planned')}, ${s('drop')} → ${s('dropped')}, ${s('chat')} → ${s('chatted')}</td></tr>
</table>
<p>Не удваиваем: если на конце <b>w, x, y</b> (${s('fix')} → ${s('fixed')}, ${s('snow')} → ${s('snowed')}); если гласных <b>две</b> (${s('rain')} → ${s('rained')}, ${s('cook')} → ${s('cooked')}); если согласных <b>две</b> (${s('help')} → ${s('helped')}); если ударение не на последнем слоге (${s('visit')} → ${s('visited')}, ${s('open')} → ${s('opened')}).</p></div>
<div class="box tip"><b>Как запомнить про y</b><p>Буква y «прячется» за i, только когда перед ней <b>согласная</b>: stud<b>y</b> → stud<b>ied</b>. Если перед y гласная (pl<b>a</b>y, st<b>a</b>y, enj<b>o</b>y), y остаётся: pl<b>ayed</b>.</p></div>
<div class="box err"><b>Типичные ошибки</b>
<p>✗ Yesterday I play football. → ✓ ${s('Yesterday I played football.')} (есть «yesterday» — нужен -ed!)</p>
<p>✗ studyed, plaied → ✓ ${s('studied')}, ${s('played')}</p>
<p>✗ stoped → ✓ ${s('stopped')} (короткое слово — удваиваем p)</p></div>
<p>А как читать -ed: [t], [d] или [ɪd] — это отдельная тема фонетики 6 класса.</p>`,
theory2:`
<div class="box ex"><p>Представь, что -ed — это <b>штамп «ГОТОВО, В ПРОШЛОМ»</b>. Ставишь его на глагол — и действие улетает во вчера.</p>
<p>${s('I play')} — я играю (обычно). ${s('I played')} — я играл (уже было).</p>
<p>В русском мы меняем окончание: играю → игра<b>л</b>. В английском добавляем <b>-ed</b>: play → play<b>ed</b>.</p>
<p>И в английском прошедшее ещё проще: «я играл», «она играла», «они играли» — везде одно ${s('played')}.</p>
<p>Три маленьких правила: like → like<b>d</b> (е уже есть), study → stud<b>ied</b>, stop → sto<b>pp</b>ed.</p></div>`,
items:[
{lvl:1, text:'Yesterday I {played*|play|plays} football with my friends.',
 why:`Есть слово ${s('yesterday')} (вчера) — действие в прошлом, значит Past Simple: play + ed = <b>played</b>. «play» — настоящее время, «plays» — настоящее для he/she.`,
 why2:`Вчера — значит «играл», а не «играю». Штамп прошлого -ed: ${s('I played')}.`},
{lvl:1, text:'Last Sunday we {watched*|watch|watching} a film at home.',
 why:`${s('Last Sunday')} — в прошлое воскресенье, уже прошло. Past Simple: watch + ed = <b>watched</b>. «watching» без am/is/are вообще не сказуемое.`,
 why2:`«Мы смотрели» — прошлое → ${s('we watched')}.`},
{type:'listen', lvl:1, say:'We cleaned the room yesterday.', q:'Послушай. Какое слово ты услышал?', opts:['clean','cleaned','cleans'], ans:1,
 why:`Прозвучало ${s('We cleaned the room yesterday.')} — в конце глагола слышен звук [d]: ${s('cleaned')} ${tr('kliːnd')}. Это прошедшее время, ведь там ${s('yesterday')}.`,
 why2:`Слушай конец слова: «клин<b>д</b>» — это ${s('cleaned')}. Без [d] было бы ${s('clean')}.`},
{type:'read', lvl:1, text:'I watched a funny film last night.', q:'Прочитай вслух',
 why:`${s('watched')} ${tr('wɒtʃt')} — <b>один</b> слог, на конце звук [t], не «вотчед». ${s('funny')} ${tr('ˈfʌni')} — ударение на первый слог. ${s('last night')} ${tr('lɑːst naɪt')} — долгое [ɑː].`,
 why2:`Читай «вочт э фани фильм ласт найт»: watched — коротко, одним слогом, как «вочт».`},
{lvl:1, text:'My sister {is*|are|am@en.s.to_be} ten. Last year she {started*|starts|start} school.',
 why:`1) ${s('My sister')} = she, а с she всегда <b>is</b>: ${s('My sister is ten.')} 2) ${s('Last year')} — в прошлом году → Past Simple: start + ed = <b>started</b>.`,
 why2:`Сестра — «она» → is. «В прошлом году пошла в школу» — уже было → ${s('started')}.`},
{lvl:2, text:'Tom {stopped*|stoped|stopt} at the shop and bought some bread.',
 why:`${s('stop')} — короткое слово: одна гласная o + одна согласная p на конце. Такую согласную <b>удваиваем</b>: ${s('stopped')}. «stoped» — ошибка, «stopt» — так не пишут.`,
 why2:`Если не удвоить p, получится «stoped» — читалось бы как «стоупт». Двойная pp «охраняет» короткий звук: ${s('stopped')}.`},
{lvl:2, text:'Kate {studied*|studyed|studed} for her test all evening.',
 why:`${s('study')}: перед y стоит согласная d, поэтому y → i + ed: <b>studied</b>. «studyed» и «studed» — ошибки.`,
 why2:`Согласная + y → ied: stud<b>y</b> → stud<b>ied</b>, как cr<b>y</b> → cr<b>ied</b>.`},
{lvl:2, text:'We {stayed*|staied|stayd} at a hotel near the sea.',
 why:`${s('stay')}: перед y стоит <b>гласная</b> a, поэтому y остаётся и просто + ed: <b>stayed</b> (как ${s('played')}).`,
 why2:`Гласная + y → y не трогаем: st<b>ay</b> → st<b>ayed</b>.`},
{type:'spell', lvl:2, say:'studied', ans:['studied'], q:'Послушай и напиши слово (это прошедшее время от study)',
 why:`${s('studied')} ${tr('ˈstʌdid')}: study — согласная перед y → y меняем на i и добавляем ed.`,
 why2:`Запомни: stud + ied = studied. Буквы y в этом слове нет!`},
{type:'spell', lvl:2, say:'stopped', ans:['stopped'], q:'Послушай и напиши слово (прошедшее время от stop)',
 why:`${s('stopped')} ${tr('stɒpt')}: короткое слово stop → удваиваем p и добавляем ed. Звучит один слог, но пишется stopped.`,
 why2:`Слышишь «стопт», а пишешь sto<b>pp</b>ed — две p и -ed.`},
{type:'read', lvl:2, text:'We stayed at home and played a board game.', q:'Прочитай вслух',
 why:`${s('stayed')} ${tr('steɪd')} и ${s('played')} ${tr('pleɪd')} — по одному слогу, на конце звонкий [d]. ${s('board game')} ${tr('bɔːd ɡeɪm')} — долгое [ɔː]. ${s('at home')} — связывай: «эт хоум».`,
 why2:`Читай «стэйд», «плэйд» — без лишнего «эд» в конце.`},
{lvl:2, text:'Yesterday Mike {fixed*|fixxed|fix} {an*|a@en.s.a_an} old bike.',
 why:`1) Вчера → Past Simple: fix + ed = <b>fixed</b>. Букву x никогда не удваивают. 2) ${s('old')} начинается с гласного звука, поэтому <b>an</b>: ${s('an old bike')}.`,
 why2:`fix → fixed (x не удваиваем). Перед гласным звуком — an: an old, an apple.`},
{lvl:2, text:'Two days ago we {visited*|visit|visitted} our grandparents. They {live*|lives|living@en.5.ps} in a small village.',
 why:`1) ${s('two days ago')} — два дня назад → <b>visited</b>. Не удваиваем t: ударение в visit на первом слоге (VIsit). 2) Бабушка с дедушкой живут в деревне и сейчас → Present Simple; they — без -s: <b>live</b>.`,
 why2:`Ходили в гости — прошлое (visited). А живут они там всегда — настоящее: ${s('They live in a village.')}`},
{lvl:3, text:'The baby {cried*|cryed|cries} all night, so nobody slept.',
 why:`${s('slept')} — уже прошлое, значит и плакал малыш в прошлом. ${s('cry')}: согласная r + y → <b>cried</b>. «cryed» — ошибка в написании.`,
 why2:`cr<b>y</b> → cr<b>ied</b>, как stud<b>y</b> → stud<b>ied</b>.`},
{lvl:3, text:'He {planned*|planed|plans} his trip carefully last month.',
 why:`${s('last month')} → прошлое. ${s('plan')} — короткое слово (одна гласная + одна согласная) → удваиваем n: <b>planned</b>. «planed» — это другое слово (строгал рубанком).`,
 why2:`plan → pla<b>nn</b>ed, как stop → sto<b>pp</b>ed.`},
{lvl:3, q:'В каком ряду <b>все</b> формы написаны правильно?', opts:['stopped, studied, played','stoped, studied, played','stopped, studyed, plaied'], ans:0,
 why:`${s('stopped')} — удваиваем p; ${s('studied')} — согласная + y → ied; ${s('played')} — гласная + y → просто ed.`,
 why2:`Проверь каждое слово по таблице: короткое — удвоить, согласная + y — ied, гласная + y — ed.`},
{lvl:3, text:'I {enjoyed*|enjoied|enjoys} the party {on*|in|at@en.5.prep_time} Saturday. It was great!',
 why:`1) ${s('It was great')} — речь о прошедшей вечеринке. ${s('enjoy')}: перед y гласная o → <b>enjoyed</b>. 2) С днями недели — предлог <b>on</b>: ${s('on Saturday')}.`,
 why2:`enj<b>oy</b> → enj<b>oyed</b> (y не трогаем). Дни недели — всегда on: on Monday, on Saturday.`},
{lvl:3, text:'Yesterday Ben {dropped*|droped|drops} his phone. Now {its*|it\'s@en.p.possessive} screen is broken.',
 why:`1) ${s('drop')} — короткое слово → удваиваем p: <b>dropped</b>. 2) «Его (телефона) экран» — притяжательное <b>its</b> без апострофа. ${s("it's")} = it is: «it is screen» — бессмыслица.`,
 why2:`drop → dro<b>pp</b>ed. its = «его/её» (чей?), it's = it is (это есть).`},
{type:'read', lvl:3, text:'She opened the window and looked at the rain.', q:'Прочитай вслух',
 why:`${s('opened')} ${tr('ˈəʊpənd')} — два слога, на конце [d]. ${s('looked')} ${tr('lʊkt')} — один слог, на конце [t]. ${s('looked at')} связывай: «лукт эт».`,
 why2:`Окончание -ed здесь не даёт лишнего слога: «оупнд», «лукт».`},
{type:'listen', lvl:3, say:'They wanted to help.', q:'Послушай. Что прозвучало?', opts:['They want to help.','They wanted to help.'], ans:1,
 why:`Прозвучало ${s('They wanted to help.')} — в ${s('wanted')} ${tr('ˈwɒntɪd')} слышен лишний слог [ɪd]: «вонт<b>ид</b>». Это прошлое: «Они хотели помочь».`,
 why2:`Посчитай слоги: want — один, wan-ted — два. Ты слышал два.`}
]});

/* ===================== Past Simple: неправильные глаголы ===================== */
const IRR=[['be','was / were','been'],['have','had','had'],['do','did','done'],['go','went','gone'],['see','saw','seen'],['come','came','come'],['get','got','got'],['give','gave','given'],['take','took','taken'],['make','made','made'],['eat','ate','eaten'],['drink','drank','drunk'],['write','wrote','written'],['buy','bought','bought'],['bring','brought','brought'],['think','thought','thought'],['catch','caught','caught'],['teach','taught','taught'],['swim','swam','swum'],['run','ran','run'],['sing','sang','sung'],['begin','began','begun'],['speak','spoke','spoken'],['break','broke','broken'],['know','knew','known'],['fly','flew','flown'],['drive','drove','driven'],['find','found','found'],['lose','lost','lost'],['meet','met','met'],['sleep','slept','slept'],['leave','left','left'],['feel','felt','felt'],['tell','told','told'],['say','said','said'],['sit','sat','sat'],['stand','stood','stood'],['win','won','won'],['wear','wore','worn'],['put','put','put'],['cut','cut','cut']];
const irrTable='<table class="sym"><tr><th>глагол</th><th>прошедшее (Past Simple)</th><th>3-я форма (пригодится в 7 классе)</th></tr>'+IRR.map(r=>`<tr><td>${s(r[0])}</td><td><b>${r[1].split(' / ').map(x=>s(x)).join(' / ')}</b></td><td>${s(r[2])}</td></tr>`).join('')+`<tr><td>${s('read')}</td><td><b>${s('red','read')}</b> ${tr('red')}</td><td>${s('red','read')} ${tr('red')}</td></tr></table>`;
RU.rule({
id:'en.6.past_irreg',
short:`Неправильные глаголы в прошлом не получают -ed — у них своя форма, её надо выучить: ${s('go — went')}, ${s('see — saw')}, ${s('buy — bought')}.`,
theory:`
<div class="box rule"><b>Что такое неправильный глагол</b>
<p>Большинство глаголов в прошлом получают -ed (play → played). Но самые частые глаголы «непослушные»: у них <b>своя форма</b>.</p>
<p>${s('Yesterday I went to the cinema.')} — не «goed»!</p>
<p>${s('We saw a big dog.')} — не «seed»!</p>
<p>Как и у правильных, форма <b>одна для всех лиц</b>: ${s('I went')}, ${s('she went')}, ${s('they went')}.</p></div>
<div class="box tip"><b>Таблица неправильных глаголов</b> (нажимай, чтобы послушать)
<p>Для Past Simple нужна <b>вторая колонка</b>.</p>
${irrTable}
<p>Хитрость: ${s('read')} в прошлом пишется так же — read, но читается ${tr('red')}, как «рэд».</p></div>
<div class="box tip"><b>Как запомнить — учи группами</b>
<p>1) Все три формы одинаковые: ${s('put — put — put')}, ${s('cut — cut — cut')}.</p>
<p>2) Группа «-ought / -aught» (звучит [ɔːt]): ${s('buy — bought')}, ${s('bring — brought')}, ${s('think — thought')}, ${s('catch — caught')}, ${s('teach — taught')}.</p>
<p>3) Группа «i — a — u»: ${s('swim — swam — swum')}, ${s('sing — sang — sung')}, ${s('drink — drank — drunk')}, ${s('begin — began — begun')}.</p>
<p>4) ee → e: ${s('meet — met')}, ${s('sleep — slept')}, ${s('feel — felt')}.</p>
<p>Учи по 5 глаголов в день и говори вслух: «go — went — gone».</p></div>
<div class="box err"><b>Типичные ошибки</b>
<p>✗ I goed / I buyed → ✓ ${s('I went')} / ${s('I bought')}</p>
<p>✗ I was go to school → ✓ ${s('I went to school.')} (was здесь не нужен!)</p>
<p>✗ I drunk juice → ✓ ${s('I drank juice.')} (drunk — третья форма, для Past Simple нужна вторая)</p></div>`,
theory2:`
<div class="box ex"><p>Неправильные глаголы — как <b>друзья с прозвищами</b>. Друга зовут Go, но в прошлом его зовут Went. Логики нет — просто надо знать прозвище.</p>
<p>${s('go')} → ${s('went')}: ${s('I went home.')} — Я пошёл домой.</p>
<p>${s('see')} → ${s('saw')}: ${s('I saw a cat.')} — Я увидел кошку.</p>
<p>${s('eat')} → ${s('ate')}: ${s('I ate an apple.')} — Я съел яблоко.</p>
<p>Если слово в таблице — бери форму из второй колонки и <b>не добавляй</b> -ed.</p></div>`,
items:[
{lvl:1, text:'Yesterday I {went*|goed|go} to the park.',
 why:`${s('go')} — неправильный глагол, его прошедшая форма <b>went</b>. «goed» не бывает, «go» — настоящее время, а у нас ${s('yesterday')}.`,
 why2:`go → went. Прозвище надо знать: ${s('I went')}.`},
{lvl:1, text:'Last night we {saw*|seed|see} a great film.',
 why:`${s('see')} → <b>saw</b> ${tr('sɔː')}. ${s('Last night')} — вчера вечером, прошлое. «seed» — неправильная форма (и вообще это слово «семя»).`,
 why2:`see → saw: ${s('We saw a film.')}`},
{lvl:1, text:'Mum {made*|maked|make} a cake for my birthday last week.',
 why:`${s('make')} → <b>made</b>. ${s('last week')} — на прошлой неделе. «maked» — ошибка.`,
 why2:`make → made: ${s('Mum made a cake.')}`},
{type:'listen', lvl:1, say:'went', q:'Послушай. Это прошедшая форма какого глагола?', opts:['go','want','win'], ans:0,
 why:`${s('went')} — прошедшая форма глагола ${s('go')} (идти, ехать). У want прошедшее ${s('wanted')}, у win — ${s('won')}.`,
 why2:`go — went — gone. Запомни эту тройку первой: она самая частая.`},
{type:'read', lvl:1, text:'Yesterday I went to school and saw my friends.', q:'Прочитай вслух',
 why:`${s('went')} ${tr('went')} — короткое [e]. ${s('saw')} ${tr('sɔː')} — долгое [ɔː], буква w не читается. ${s('yesterday')} ${tr('ˈjestədeɪ')} — ударение на первый слог.`,
 why2:`saw читай как долгое «соо», а не «сав».`},
{lvl:1, text:'Last weekend I {bought*|buyed|buy} two {books*|bookes|book@en.s.plurals}.',
 why:`1) ${s('buy')} → <b>bought</b> ${tr('bɔːt')} (группа -ought). 2) Две книги — множественное число: book + s = <b>books</b>.`,
 why2:`buy → bought. Книг две — значит books.`},
{lvl:2, text:'At the party yesterday we {ate*|eated|eat} pizza and {drank*|drinked|drunk} juice.',
 why:`1) ${s('eat')} → <b>ate</b>. 2) ${s('drink')} → <b>drank</b>. «drunk» — это третья форма (drink — drank — drunk), в Past Simple она не нужна.`,
 why2:`Группа i — a — u: drink — dr<b>a</b>nk — dr<b>u</b>nk. Для «вчера» берём вторую: drank.`},
{lvl:2, text:'Granny {told*|telled|tell} me a funny story last night.',
 why:`${s('tell')} → <b>told</b>. «telled» не бывает. ${s('last night')} — прошлое, поэтому не tell.`,
 why2:`tell → told: ${s('She told me a story.')}`},
{type:'spell', lvl:2, say:'bought', ans:['bought'], q:'Послушай и напиши прошедшую форму (это от buy)',
 why:`${s('bought')} ${tr('bɔːt')}: слышим «боот», а пишем b-<b>ough</b>-t. Буквы gh не читаются.`,
 why2:`buy → bought, bring → brought, think → thought — все на -ought.`},
{type:'spell', lvl:2, say:'thought', ans:['thought'], q:'Послушай и напиши прошедшую форму (это от think)',
 why:`${s('thought')} ${tr('θɔːt')}: th + ough + t. Как bought, только с th в начале.`,
 why2:`think → th<b>ought</b>. Та же «ought», что в bought.`},
{type:'read', lvl:2, text:'My dad bought a new car and drove us to the park.', q:'Прочитай вслух',
 why:`${s('bought')} ${tr('bɔːt')} — gh не читается. ${s('drove')} ${tr('drəʊv')} — «дроув». ${s('drove us')} связывай: «дроувас».`,
 why2:`bought — «боот», drove — «дроув».`},
{lvl:2, text:'Two years ago my family {came*|comed|come} to this town. Now we {have got*|has got|have get@en.s.have_got} a big flat here.',
 why:`1) ${s('two years ago')} → прошлое: ${s('come')} → <b>came</b>. 2) we → <b>have got</b> (has got только для he/she/it). «have get» — так не говорят.`,
 why2:`come → came. «У нас есть» = ${s('we have got')}.`},
{lvl:2, q:'Найди «лишнее»: где <b>правильный</b> глагол среди неправильных?', opts:['went','bought','played','wrote'], ans:2,
 why:`${s('played')} — правильный: play + ed. А ${s('went')} (go), ${s('bought')} (buy), ${s('wrote')} (write) — неправильные.`,
 why2:`Видишь -ed на конце — скорее всего, правильный глагол.`},
{lvl:3, text:'I {wrote*|writed|written} a letter to my pen friend yesterday.',
 why:`${s('write')} → <b>wrote</b> → written. Для Past Simple нужна вторая форма wrote. «written» — третья форма, «writed» не бывает.`,
 why2:`write — wrote — written. «Вчера написал» = ${s('I wrote')}.`},
{lvl:3, text:'The plane {flew*|flied|flown} over the mountains an hour ago.',
 why:`${s('fly')} → <b>flew</b> → flown. ${s('an hour ago')} — час назад. «flied» — ошибка (fly неправильный), «flown» — третья форма.`,
 why2:`fly — flew — flown. Прошедшее = flew ${tr('fluː')}.`},
{lvl:3, text:'Last year our team {won*|winned|win} the school cup.',
 why:`${s('win')} → <b>won</b> ${tr('wʌn')} (читается как one!). ${s('last year')} — прошлое.`,
 why2:`win — won — won. «Победили в прошлом году» = ${s('We won.')}`},
{lvl:3, text:'Tom {broke*|breaked|broken} his arm last winter. Now he {can*|cans|can to@en.s.can} play football again.',
 why:`1) ${s('break')} → <b>broke</b> → broken; Past Simple = broke. 2) ${s('can')} не меняется: ни -s, ни to после него: ${s('he can play')}.`,
 why2:`break — broke — broken. can + глагол без to.`},
{lvl:3, text:'I {met*|meeted|meet} Kate yesterday and gave {her*|she|hers@en.5.pronouns} the book.',
 why:`1) ${s('meet')} → <b>met</b> (ee → e). 2) После глагола gave нужно объектное местоимение: «дал <b>ей</b>» = <b>her</b>. she — «она» (кто?), hers — «её» (чей?).`,
 why2:`meet → met, как sleep → slept. «Дал ей» — gave her.`},
{type:'read', lvl:3, text:'We swam in the lake and then slept in a tent.', q:'Прочитай вслух',
 why:`${s('swam')} ${tr('swæm')} — широкий звук [æ]. ${s('slept')} ${tr('slept')} — короткое [e]. ${s('lake')} ${tr('leɪk')} — «лэйк».`,
 why2:`swim → swam, sleep → slept. Читай «суæм», «слэпт».`},
{type:'listen', lvl:3, say:'caught', q:'Послушай. От какого глагола эта форма?', opts:['catch','cut','cook'], ans:0,
 why:`${s('caught')} ${tr('kɔːt')} — прошедшая форма от ${s('catch')} (ловить). У cut прошедшее cut, у cook — cooked.`,
 why2:`catch — caught, teach — taught: группа «-aught», звучит «-оот».`}
]});

/* ===================== Past Simple: отрицание и вопрос ===================== */
RU.rule({
id:'en.6.past_neg_q',
short:`Отрицание: didn't + глагол в начальной форме: ${s("I didn't go.")} Вопрос: Did + кто + глагол: ${s('Did you go?')} После did — никаких -ed и went!`,
theory:`
<div class="box rule"><b>Помощник did</b>
<p>В отрицании и вопросе в прошлом работает помощник <b>did</b>. Он «забирает» прошлое на себя, а глагол возвращается в <b>начальную форму</b>.</p>
<table class="sym">
<tr><th></th><th>Формула</th><th>Пример</th></tr>
<tr><td>+</td><td>I / he / they + V2 (played, went)</td><td>${s('He went home.')}</td></tr>
<tr><td>−</td><td>I / he / they + <b>didn't</b> + V1</td><td>${s("He didn't go home.")}</td></tr>
<tr><td>?</td><td><b>Did</b> + I / he / they + V1 …?</td><td>${s('Did he go home?')}</td></tr>
<tr><td>?</td><td>Where / When / What … + <b>did</b> + кто + V1?</td><td>${s('Where did he go?')}</td></tr>
</table>
<p>Краткие ответы: ${s('Yes, I did.')} ${s("No, I didn't.")}</p>
<p>${s("didn't")} = ${s('did not')}.</p></div>
<div class="box tip"><b>Как запомнить</b><p>Прошлое можно показать <b>только один раз</b>. Если есть did — глагол «отдыхает»: ${s("I didn't see")}, а не «didn't saw».</p></div>
<div class="box tip"><b>Исключение: was / were</b><p>С глаголом be помощник did <b>не нужен</b>: ${s('Was it difficult?')} ${s("It wasn't difficult.")} ${s("I wasn't at school.")}</p></div>
<div class="box err"><b>Типичные ошибки</b>
<p>✗ I didn't went → ✓ ${s("I didn't go.")}</p>
<p>✗ Did you saw…? → ✓ ${s('Did you see the film?')}</p>
<p>✗ Where you went? → ✓ ${s('Where did you go?')} (без did вопроса нет)</p>
<p>✗ Did he goes…? → ✓ ${s('Did he go?')}</p></div>`,
theory2:`
<div class="box ex"><p>Did — как <b>рюкзак с прошлым</b>. Когда он появляется, глагол снимает с себя всё прошлое и отдаёт рюкзаку.</p>
<p>${s('I saw him.')} → ${s("I didn't see him.")} (saw снял прошлое → see)</p>
<p>${s('She played.')} → ${s('Did she play?')} (played → play)</p>
<p>Правило одной фразой: <b>did / didn't + глагол как в словаре</b>.</p></div>`,
items:[
{lvl:1, text:'I {didn\'t*|don\'t|wasn\'t} watch TV yesterday.',
 why:`${s('yesterday')} — прошлое, а отрицание в прошлом строится с <b>didn't</b> + watch. «don't» — для настоящего, «wasn't watch» — так не бывает.`,
 why2:`Вчера не смотрел = ${s("I didn't watch.")}`},
{lvl:1, text:'{Did*|Do|Was} you play tennis last Saturday?',
 why:`${s('last Saturday')} — прошлое, вопрос к обычному глаголу play → <b>Did</b> you play…? «Do» — настоящее, «Was you play» — ошибка.`,
 why2:`Вопрос о прошлом начинается с Did: ${s('Did you play?')}`},
{lvl:1, text:'She didn\'t {go*|went|goes} to school on Monday.',
 why:`После <b>didn't</b> глагол в начальной форме: <b>go</b>. Прошлое уже показано в didn't, поэтому не went. И не goes — -s после didn't не бывает.`,
 why2:`didn't + go. Рюкзак с прошлым у did, глагол — как в словаре.`},
{lvl:1, text:'— Did you like the film? — Yes, I {did*|liked|do}.',
 why:`Краткий ответ повторяет помощника из вопроса: Did you…? → ${s('Yes, I did.')} «Yes, I liked» без it неполно, «do» — настоящее.`,
 why2:`Спросили с did — отвечаем с did: Yes, I did. / No, I didn't.`},
{type:'read', lvl:1, text:'Did you have a good weekend?', q:'Прочитай вслух',
 why:`${s('Did you')} часто сливается: «диджу». ${s('weekend')} ${tr('ˌwiːkˈend')} — долгое [iː]. Голос в конце вопроса чуть поднимается.`,
 why2:`Читай «Дид ю хэв э гуд уикенд?» — и спроси, а не скажи.`},
{type:'listen', lvl:1, say:"I didn't see him yesterday.", q:'Послушай. Что сказали?', opts:['Я его вчера видел.','Я его вчера не видел.','Я его сегодня не вижу.'], ans:1,
 why:`Прозвучало ${s("I didn't see him yesterday.")} — ${s("didn't")} значит «не» в прошлом, а ${s('yesterday')} — вчера.`,
 why2:`Ищи на слух didn't: его «т» на конце бывает еле слышно — «диднт».`},
{lvl:2, text:'Where {did you go*|you went|did you went} last summer?',
 why:`Вопрос с where в прошлом: Where + <b>did</b> + you + <b>go</b>? «you went» без did — не вопрос. «did you went» — прошлое дважды.`,
 why2:`Where did you go? — «вопросик, did, кто, глагол как в словаре».`},
{lvl:2, text:'We {didn\'t buy*|didn\'t bought|not bought} anything at the market.',
 why:`Отрицание в прошлом: <b>didn't + buy</b>. «didn't bought» — прошлое дважды, «not bought» — без помощника нельзя.`,
 why2:`Купили = bought. Не купили = didn't buy.`},
{lvl:2, text:'What time {did*|do|was} you get up yesterday? — I got up {at*|in|on@en.5.prep_time} seven.',
 why:`1) ${s('yesterday')} — прошлое, глагол get → вопрос с <b>did</b>. 2) С точным временем (seven o'clock) — предлог <b>at</b>: ${s('at seven')}.`,
 why2:`Вчера → did. Время по часам → at: at seven, at half past eight.`},
{lvl:2, text:'I {didn\'t go*|wasn\'t go|didn\'t went} to the party because I {was*|were|did@en.p.was_were} ill.',
 why:`1) Не пошёл = <b>didn't go</b>. «wasn't go» — смешение двух правил. 2) «Я был болен» — это глагол be: I → <b>was</b>. did здесь не нужен.`,
 why2:`Обычный глагол → didn't go. «Был» → was (с I, he, she, it).`},
{type:'spell', lvl:2, say:"didn't", ans:["didn't",'did not'], q:'Послушай и напиши слово (с апострофом)',
 why:`${s("didn't")} = did not. Апостроф стоит на месте пропущенной буквы o: did<b>n'</b>t.`,
 why2:`Пиши d-i-d-n-'-t. Можно и полностью: did not.`},
{type:'read', lvl:2, text:"I didn't do my homework yesterday.", q:'Прочитай вслух',
 why:`${s("didn't do")} — «диднт ду», t почти не слышно. ${s('homework')} ${tr('ˈhəʊmwɜːk')} — ударение на первый слог.`,
 why2:`didn't + do: «Я не сделал». Читай спокойно, без «дидэнт».`},
{type:'listen', lvl:2, say:'Did you go to the zoo?', q:'Послушай. Что это?', opts:['Вопрос о прошлом','Вопрос о настоящем','Утверждение о прошлом'], ans:0,
 why:`${s('Did you go to the zoo?')} начинается с ${s('Did')} — это вопрос о прошлом: «Ты ходил в зоопарк?»`,
 why2:`Did в начале = вопрос про прошлое. Do в начале = вопрос про настоящее.`},
{lvl:3, text:'Who {broke*|did broke|breaked} the window?',
 why:`Здесь who — это <b>тот, кто сделал</b> (подлежащее). В таком вопросе порядок как в утверждении и did не нужен: ${s('Who broke the window?')} «did broke» — прошлое дважды, «breaked» не бывает.`,
 why2:`Сравни: ${s('Tom broke the window.')} → ${s('Who broke the window?')} — просто ставим who вместо Tom.`},
{lvl:3, text:'{Did your brother go*|Did your brother went|Went your brother} to the concert?',
 why:`Did + кто (your brother) + go. «Did … went» — прошлое дважды. «Went your brother…?» — в английском глагол на первое место не ставят.`,
 why2:`Схема: Did + кто + глагол из словаря.`},
{lvl:3, text:'How many {children*|childs|childrens@en.s.plurals} did you {invite*|invited|invites} to your party?',
 why:`1) ${s('child')} → <b>children</b> — особое множественное, без -s. 2) После did — начальная форма: <b>invite</b>.`,
 why2:`child — children (как man — men). did + invite.`},
{lvl:3, text:'My brother {doesn\'t*|don\'t|isn\'t@en.5.ps} like fish, and yesterday he {didn\'t eat*|didn\'t ate|not ate} it again.',
 why:`1) «Не любит» вообще, сейчас → Present Simple; he → <b>doesn't</b> like. 2) Вчера → <b>didn't eat</b> (после didn't — начальная форма).`,
 why2:`Сейчас не любит — doesn't. Вчера не съел — didn't eat.`},
{lvl:3, q:'Какое предложение <b>неправильное</b>?', opts:['Did you see Tom?',"She didn't come.",'Did he went home?',"We didn't know."], ans:2,
 why:`«Did he went» — ошибка: после did нужна начальная форма: ${s('Did he go home?')}`,
 why2:`Если видишь did и рядом форму прошлого (went, saw, -ed) — это ошибка.`},
{type:'read', lvl:3, text:'Why did you come home so late?', q:'Прочитай вслух',
 why:`${s('come')} ${tr('kʌm')} — «кам», не «ком». ${s('late')} ${tr('leɪt')}. Вопрос с why: голос в конце обычно идёт вниз.`,
 why2:`Читай «Уай дид ю кам хоум соу лэйт?»`}
]});

/* ===================== Future Simple: will ===================== */
RU.rule({
id:'en.6.will',
short:`will + глагол — будущее, когда решаешь прямо сейчас, обещаешь, предлагаешь помощь или предсказываешь («я думаю…»): ${s("I'll help you.")} ${s('I think it will rain.')}`,
theory:`
<div class="box rule"><b>Формула</b>
<table class="sym">
<tr><th></th><th>Формула</th><th>Пример</th></tr>
<tr><td>+</td><td>кто + <b>will</b> + V1</td><td>${s('I will help you.')} = ${s("I'll help you.")}</td></tr>
<tr><td>−</td><td>кто + <b>won't</b> (will not) + V1</td><td>${s("He won't come.")}</td></tr>
<tr><td>?</td><td><b>Will</b> + кто + V1?</td><td>${s('Will you help me?')} — ${s('Yes, I will.')} / ${s("No, I won't.")}</td></tr>
</table>
<p>will — <b>одно для всех</b>: I will, she will, they will. После will — глагол без to и без -s.</p></div>
<div class="box rule"><b>Когда нужен will</b>
<p>1) <b>Решение прямо сейчас</b>, в момент разговора: — ${s("It's cold in here.")} — ${s("I'll close the window.")}</p>
<p>2) <b>Обещание, предложение помощи</b>: ${s("I'll call you tomorrow.")} ${s("Don't worry, I'll help you.")}</p>
<p>3) <b>Предсказание-мнение</b> (что, по-твоему, будет) — часто со словами ${s('I think')}, ${s("I'm sure")}, ${s('maybe')}, ${s('probably')}: ${s('I think it will be sunny tomorrow.')}</p>
<p>Слова-подсказки будущего: ${s('tomorrow')}, ${s('next week')}, ${s('next year')}, ${s('soon')}, ${s('one day')}.</p></div>
<div class="box tip"><b>Как запомнить</b><p>will — это «<b>о, придумал!</b>» или «<b>мне кажется</b>». Если план был готов заранее или ты видишь признаки («смотри, тучи!») — это уже <b>going to</b> (следующая тема).</p></div>
<div class="box err"><b>Типичные ошибки</b>
<p>✗ I will to go → ✓ ${s('I will go.')}</p>
<p>✗ He wills come / He will comes → ✓ ${s('He will come.')}</p>
<p>✗ I willn't → ✓ ${s("I won't.")} — особая форма, звучит ${tr('wəʊnt')}, не путай с ${s('want')} ${tr('wɒnt')}!</p></div>`,
theory2:`
<div class="box ex"><p>will — это <b>«-у / -ю» русского будущего</b>: помогу, позвоню, закрою.</p>
<p>${s("I'll help you.")} — Я помогу тебе.</p>
<p>${s("I'll call you.")} — Я позвоню тебе.</p>
<p>${s('I think it will rain.')} — Думаю, будет дождь.</p>
<p>Просто ставь <b>will</b> перед глаголом. Глагол не трогай — никаких to и -s.</p></div>`,
items:[
{lvl:1, text:'I think it {will be*|will is|will to be} sunny tomorrow.',
 why:`Мнение о будущем (${s('I think')}) → will. После will — глагол в начальной форме: <b>will be</b>. «will is», «will to be» — ошибки.`,
 why2:`will + глагол из словаря: will be, will go, will help.`},
{lvl:1, text:'Don\'t worry, I {will help*|will helps|will to help} you with your homework.',
 why:`Обещание помощи → will. После will — просто <b>help</b>, без -s и без to.`,
 why2:`«Я помогу» = ${s('I will help.')}`},
{lvl:1, text:'He {won\'t*|willn\'t|doesn\'t will} come to the party. He\'s ill.',
 why:`Отрицание will — особая форма <b>won't</b> (will not). «willn't» не существует, «doesn't will» — ошибка.`,
 why2:`will not = won't. Запомни как одно слово: ${s("won't")}.`},
{type:'read', lvl:1, text:'I think it will rain tomorrow.', q:'Прочитай вслух',
 why:`${s('think')} ${tr('θɪŋk')} — кончик языка между зубами. ${s('rain')} ${tr('reɪn')} — «рэйн». ${s('tomorrow')} ${tr('təˈmɒrəʊ')} — ударение на второй слог.`,
 why2:`Не говори «ай синк»: в think язык между зубами. И «туМОроу» — ударение в середине.`},
{type:'listen', lvl:1, say:"I'll call you tomorrow.", q:'Послушай. Что обещают?', opts:['позвонить завтра','позвонить сегодня','прийти завтра'], ans:0,
 why:`Прозвучало ${s("I'll call you tomorrow.")} — ${s('call')} = позвонить, ${s('tomorrow')} = завтра.`,
 why2:`I'll = I will — «я сделаю». call — звонить.`},
{lvl:2, text:'— The phone is ringing! — OK, {I\'ll answer*|I\'m going to answer|I answered} it.',
 why:`Решение принято <b>прямо сейчас</b>, в ответ на звонок → <b>will</b>: ${s("I'll answer it.")} going to — для заранее готовых планов. «answered» — прошлое.`,
 why2:`Телефон зазвонил — «о, отвечу!» Мгновенное решение = will.`},
{lvl:2, text:'{Will you open*|Will you to open|Do you will open} the door, please?',
 why:`Вопрос-просьба: <b>Will</b> + you + open…? После will — без to. «Do you will» — два помощника сразу, так нельзя.`,
 why2:`Will в начале + кто + глагол: Will you open…?`},
{lvl:2, text:'I\'m sure our team {will win*|wins|will wins} the match. Our players {are*|is|am@en.s.to_be} very strong.',
 why:`1) ${s("I'm sure")} — уверенность о будущем → <b>will win</b> (без -s после will). 2) ${s('Our players')} — они (they) → <b>are</b>.`,
 why2:`Уверен, что будет → will. Игроки — много → are.`},
{lvl:2, text:'In the future, {children*|childs|childrens@en.s.plurals} {will study*|will studies|studied} at home with robots.',
 why:`1) child → <b>children</b> (особое множественное). 2) Предсказание о будущем → <b>will study</b>. После will — без -es. «studied» — прошлое.`,
 why2:`Дети — children. В будущем будут учиться — will study.`},
{type:'spell', lvl:2, say:'tomorrow', ans:['tomorrow'], q:'Послушай и напиши слово',
 why:`${s('tomorrow')} ${tr('təˈmɒrəʊ')}: to + mo + <b>rr</b> + ow. Одна m, две r!`,
 why2:`Раздели: to-mor-row. Две r в середине.`},
{type:'read', lvl:2, text:"Don't worry, I will help you.", q:'Прочитай вслух',
 why:`${s('worry')} ${tr('ˈwʌri')} — «уари», о читается как [ʌ]. ${s('help')} ${tr('help')} — короткое [e].`,
 why2:`Читай «доунт уари, ай уил хэлп ю».`},
{type:'listen', lvl:2, say:"I won't go.", q:'Послушай. Что прозвучало?', opts:["I won't go.",'I want to go.'], ans:0,
 why:`Прозвучало ${s("I won't go.")} — «Я не пойду». ${s("won't")} ${tr('wəʊnt')} звучит «уоунт», а ${s('want')} ${tr('wɒnt')} — коротко «уонт».`,
 why2:`won't — с «оу» внутри, want — с коротким «о». И после want было бы to.`},
{lvl:3, text:'— I haven\'t got a pen. — No problem, {I\'ll give*|I\'m going to give|I give} you mine.',
 why:`Помощь предлагают <b>прямо сейчас</b>, услышав проблему → <b>will</b>: ${s("I'll give you mine.")} going to — если план был заранее. «I give» — по-русски «сейчас дам», но по-английски так нельзя.`,
 why2:`«Нет ручки? — Дам свою!» — решение на ходу = will.`},
{lvl:3, text:'I promise I {won\'t be*|won\'t to be|don\'t be} late again.',
 why:`Обещание → will; отрицание: <b>won't be</b>. После won't — без to. «don't be» — это приказ («не опаздывай»), а не обещание.`,
 why2:`Обещаю не опоздать = I won't be late.`},
{lvl:3, text:'I {think*|thinks|am thinking@en.5.ps_vs_pc} Anna {will like*|will to like|will likes} your present.',
 why:`1) think в значении «считаю, по-моему» не ставят в Continuous → <b>I think</b>. 2) Предсказание → <b>will like</b>, без to и без -s.`,
 why2:`«Я думаю (считаю)» = I think. «Ей понравится» = she will like.`},
{lvl:3, text:'— Is there any milk? — No, there {isn\'t*|aren\'t|hasn\'t@en.p.there_is}. — OK, {I\'ll buy*|I bought|I\'m buy} some.',
 why:`1) Вопрос был ${s('Is there…?')} (milk — неисчисляемое) → ответ ${s("No, there isn't.")} 2) Решение принято сейчас, услышав ответ → <b>I'll buy</b>.`,
 why2:`Is there…? — No, there isn't. «Тогда куплю!» — will.`},
{lvl:3, q:'В каком случае нужен именно <b>will</b> (решение прямо сейчас)?', opts:["We've got the tickets. We ___ fly to Rome in May.","— Oh no, I've forgotten my pencil! — I ___ lend you one.",'Look at those black clouds! It ___ rain.'], ans:1,
 why:`«Забыл карандаш! — Я одолжу тебе свой» — решение на ходу → ${s("I'll lend you one.")} Про билеты — план (going to), про тучи — есть признаки (going to).`,
 why2:`will = «придумал только что». План и «смотри, сейчас будет» — going to.`},
{type:'read', lvl:3, text:"I'm sure you will like this book.", q:'Прочитай вслух',
 why:`${s("I'm sure")} ${tr('aɪm ʃʊə')} — «айм шоо». ${s('this book')} — th звонкий [ð], ${s('book')} ${tr('bʊk')} — короткое [ʊ].`,
 why2:`sure — «шоо», book — «бук» (коротко).`}
]});

/* ===================== be going to ===================== */
RU.rule({
id:'en.6.going_to',
short:`am / is / are going to + глагол — план, который ты уже решил, или «смотри, сейчас случится»: ${s("I'm going to visit Granny on Sunday.")} ${s("Look! It's going to rain.")}`,
theory:`
<div class="box rule"><b>Формула</b>
<table class="sym">
<tr><th></th><th>Формула</th><th>Пример</th></tr>
<tr><td>+</td><td>I <b>am</b> / he, she, it <b>is</b> / we, you, they <b>are</b> + going to + V1</td><td>${s("I'm going to play football.")} ${s("She's going to buy a dress.")}</td></tr>
<tr><td>−</td><td>am / is / are + <b>not</b> + going to + V1</td><td>${s("We aren't going to watch TV.")}</td></tr>
<tr><td>?</td><td><b>Am / Is / Are</b> + кто + going to + V1?</td><td>${s('Are you going to come?')} — ${s('Yes, I am.')}</td></tr>
</table>
<p>Главное — не забыть <b>am / is / are</b> (как в to be).</p></div>
<div class="box rule"><b>Когда нужен going to</b>
<p>1) <b>План, намерение</b> — ты уже решил заранее: ${s("I'm going to visit my granny on Sunday.")} (я это уже запланировал)</p>
<p>2) <b>Есть признаки сейчас</b> — видно, что вот-вот случится: ${s("Look at those black clouds! It's going to rain.")}</p></div>
<div class="box tip"><b>will или going to?</b>
<table class="sym">
<tr><th>going to</th><th>will</th></tr>
<tr><td>решил <b>заранее</b>: ${s("I bought paint. I'm going to paint my room.")}</td><td>решаю <b>сейчас</b>: ${s("It's dark. I'll turn on the light.")}</td></tr>
<tr><td>вижу <b>признаки</b>: ${s("Look! He's going to fall!")}</td><td>просто <b>думаю</b>: ${s('I think he will win.')}</td></tr>
</table></div>
<div class="box err"><b>Типичные ошибки</b>
<p>✗ I going to play → ✓ ${s("I'm going to play.")} (пропал am!)</p>
<p>✗ He are going to → ✓ ${s("He's going to.")}</p>
<p>✗ I'm going to played → ✓ ${s("I'm going to play.")}</p>
<p>✗ Do you going to…? → ✓ ${s('Are you going to…?')}</p></div>`,
theory2:`
<div class="box ex"><p>going to — это <b>«собираюсь»</b>. По-русски так и есть: «я собираюсь навестить бабушку».</p>
<p>${s("I'm going to visit Granny.")} — Я собираюсь навестить бабушку.</p>
<p>${s("It's going to rain.")} — Сейчас пойдёт дождь (тучи уже видно).</p>
<p>Конструктор из трёх кубиков: <b>am/is/are</b> + <b>going to</b> + <b>глагол</b>.</p></div>`,
items:[
{lvl:1, text:'I {am*|is|are} going to visit my granny on Sunday.',
 why:`С I всегда <b>am</b>: ${s("I am going to visit")} (= I'm going to). is — для he/she/it, are — для you/we/they.`,
 why2:`I am, he is, they are — как в to be.`},
{lvl:1, text:'Look at those black clouds! It {is going to*|will to|going to} rain.',
 why:`Видны тучи — <b>есть признак</b>, что сейчас пойдёт дождь → <b>is going to</b>. «will to» — ошибка, «going to» без is — не хватает кубика.`,
 why2:`Смотри, тучи! → It's going to rain. Не забудь is.`},
{lvl:1, text:'We are going to {watch*|watched|watching} a film tonight.',
 why:`После going to — глагол в начальной форме: <b>watch</b>.`,
 why2:`going to + глагол из словаря.`},
{type:'read', lvl:1, text:"I'm going to play football after school.", q:'Прочитай вслух',
 why:`${s("I'm going to")} — «айм гоуин ту». ${s('football')} ${tr('ˈfʊtbɔːl')} — ударение на первый слог. ${s('after')} ${tr('ˈɑːftə')} — долгое [ɑː].`,
 why2:`Читай «айм гоуинг ту плэй футбол афта скул».`},
{type:'listen', lvl:1, say:"We're going to visit Granny on Sunday.", q:'Послушай. Что они собираются сделать?', opts:['навестить бабушку в воскресенье','навестить бабушку в субботу','позвонить бабушке'], ans:0,
 why:`Прозвучало ${s("We're going to visit Granny on Sunday.")} — ${s('visit')} = навестить, ${s('Sunday')} = воскресенье.`,
 why2:`Sunday — воскресенье, Saturday — суббота.`},
{lvl:2, text:'{Are you going*|Do you going|Is you going} to buy a new bike?',
 why:`Вопрос: am/is/are выходит вперёд. С you — <b>Are</b>: ${s('Are you going to buy…?')} do здесь не нужен.`,
 why2:`You are going → Are you going? Просто поменяли местами.`},
{lvl:2, text:'She {isn\'t going to*|doesn\'t going to|not going to} study tonight.',
 why:`Отрицание: is + not → <b>isn't going to</b>. doesn't с going to не используется, «not going to» без is — не хватает кубика.`,
 why2:`She is going to → She isn't going to.`},
{lvl:2, text:'I bought some paint yesterday. {I\'m going to paint*|I\'ll paint|I painted} my room this weekend.',
 why:`Краску уже купил — значит, <b>план готов заранее</b> → <b>going to</b>. will — для решения в момент разговора. «painted» — прошлое, а речь о выходных впереди.`,
 why2:`Заранее решил и подготовился = going to.`},
{lvl:2, text:'{Be*|Are|Is@en.p.imperative} careful! {You\'re going to fall*|You\'ll to fall|You fall}!',
 why:`1) Приказ / совет — повелительное наклонение: просто <b>Be careful!</b> 2) Видно, что вот-вот упадёт → <b>going to</b>: ${s("You're going to fall!")}`,
 why2:`«Осторожно!» = Be careful! «Сейчас упадёшь!» (видно же) = going to.`},
{lvl:2, text:'My parents {are going to*|is going to|going to} buy a car. They {want*|wants|are wanting@en.5.ps} a big one.',
 why:`1) ${s('My parents')} = they → <b>are going to</b>. 2) they → <b>want</b> без -s. want не употребляют в Continuous.`,
 why2:`Родители — они: are going to; they want.`},
{type:'spell', lvl:2, say:'tonight', ans:['tonight'], q:'Послушай и напиши слово (сегодня вечером)',
 why:`${s('tonight')} ${tr('təˈnaɪt')}: to + night. В night буквы gh не читаются.`,
 why2:`to-night: «сегодня» + «ночь».`},
{type:'read', lvl:2, text:'Look at the sky! It is going to rain.', q:'Прочитай вслух',
 why:`${s('Look at')} — связывай: «лукэт». ${s('sky')} ${tr('skaɪ')} — «скай». Подчеркни голосом ${s('rain')}.`,
 why2:`Говори как будто правда видишь тучи: «Лук эт зэ скай!»`},
{lvl:3, text:'— Why have you got a towel? — {I\'m going to swim*|I\'ll swim|I swim} in the lake.',
 why:`Полотенце взял заранее — это <b>план</b> → <b>going to swim</b>. will — для решения в момент разговора, «I swim» — по-английски так о будущем не говорят.`,
 why2:`Подготовился заранее (полотенце) = going to.`},
{lvl:3, text:'He\'s running too fast! {He\'s going to fall*|He going to fall|He\'s going fall}!',
 why:`Видно, что сейчас упадёт → going to. Нужны все кубики: <b>is ('s) + going to + fall</b>. Без is и без to — ошибки.`,
 why2:`He's + going to + fall — три кубика.`},
{lvl:3, text:'Tomorrow is Saturday. My friends and I {are going to*|am going to|is going to} play {_*|the|a@en.5.articles} tennis.',
 why:`1) ${s('My friends and I')} = we → <b>are going to</b>. 2) С названиями игр артикль не нужен: ${s('play tennis')}, ${s('play football')}.`,
 why2:`«Мы с друзьями» = we → are. play tennis — без артикля.`},
{lvl:3, text:'{Where*|Who|How many@en.p.wh_questions} {are you going to*|you are going to|do you going to} go this summer?',
 why:`1) Спрашиваем о месте — <b>Where</b> (куда). 2) В вопросе are выходит вперёд: <b>are you going to</b> go?`,
 why2:`Куда? — Where. Вопрос: Are you going to…?`},
{lvl:3, q:'Где нужен именно <b>going to</b>?', opts:['— Have you got a pencil? — Wait, I ___ give you one.',"Look! The baby ___ cry. Her face is red.",'I think robots ___ do all the housework one day.'], ans:1,
 why:`Малыш покраснел — <b>видны признаки</b>, что сейчас заплачет → ${s("The baby is going to cry.")} С карандашом — решение на ходу (will), про роботов — мнение с I think (will).`,
 why2:`«Смотри, сейчас случится!» = going to.`},
{type:'listen', lvl:3, say:"I'm not going to buy it.", q:'Послушай. Человек собирается это купить?', opts:['Да','Нет'], ans:1,
 why:`Прозвучало ${s("I'm not going to buy it.")} — «Я не собираюсь это покупать». Ключевое слово — ${s('not')}.`,
 why2:`Лови not между I'm и going.`},
{type:'read', lvl:3, text:'We are going to have a picnic on Saturday.', q:'Прочитай вслух',
 why:`${s('picnic')} ${tr('ˈpɪknɪk')} — ударение на первый слог. ${s('Saturday')} ${tr('ˈsætədeɪ')} — широкий [æ].`,
 why2:`«ПИКник», «СЭТэдэй».`}
]});

/* ===================== Степени сравнения ===================== */
RU.rule({
id:'en.6.comparatives',
short:`Короткие слова: -er / the -est (${s('big — bigger — the biggest')}). Длинные: more / the most (${s('more interesting')}). Особые: ${s('good — better — the best')}, ${s('bad — worse — the worst')}.`,
theory:`
<div class="box rule"><b>Две степени</b>
<p><b>Сравнительная</b> (кто «больше», из двух) + ${s('than')} (чем): ${s('A cat is smaller than a dog.')}</p>
<p><b>Превосходная</b> (самый-самый, из всех) + <b>the</b>: ${s('The elephant is the biggest animal in the zoo.')}</p></div>
<div class="box tip"><b>Как образовать</b>
<table class="sym">
<tr><th>Прилагательное</th><th>Сравнительная</th><th>Превосходная</th></tr>
<tr><td>короткое: ${s('tall')}, ${s('old')}</td><td>+ er: ${s('taller')}, ${s('older')}</td><td>the + est: ${s('the tallest')}, ${s('the oldest')}</td></tr>
<tr><td>на -e: ${s('nice')}, ${s('large')}</td><td>+ r: ${s('nicer')}, ${s('larger')}</td><td>the + st: ${s('the nicest')}</td></tr>
<tr><td>1 гласная + 1 согласная: ${s('big')}, ${s('hot')}, ${s('thin')}</td><td>удваиваем: ${s('bigger')}, ${s('hotter')}, ${s('thinner')}</td><td>${s('the biggest')}, ${s('the hottest')}</td></tr>
<tr><td>на согласную + y: ${s('happy')}, ${s('easy')}, ${s('busy')}</td><td>y → ier: ${s('happier')}, ${s('easier')}</td><td>${s('the happiest')}, ${s('the easiest')}</td></tr>
<tr><td>длинное (3 слога и больше, а также многие из 2 слогов, если они не на -y): ${s('interesting')}, ${s('beautiful')}, ${s('expensive')}</td><td>${s('more interesting')}</td><td>${s('the most interesting')}</td></tr>
</table></div>
<div class="box rule"><b>Особые слова — выучи наизусть</b>
<table class="sym">
<tr><td>${s('good')}</td><td>${s('better')}</td><td>${s('the best')}</td></tr>
<tr><td>${s('bad')}</td><td>${s('worse')}</td><td>${s('the worst')}</td></tr>
<tr><td>${s('far')}</td><td>${s('farther')} / ${s('further')}</td><td>${s('the farthest')} / ${s('the furthest')}</td></tr>
<tr><td>${s('many')}, ${s('much')}</td><td>${s('more')}</td><td>${s('the most')}</td></tr>
<tr><td>${s('little')} (мало)</td><td>${s('less')}</td><td>${s('the least')}</td></tr>
</table>
<p>У far обе формы правильные: farther и further.</p></div>
<div class="box tip"><b>Как запомнить</b><p>Короткое слово «растёт» хвостиком -er/-est. Длинному хвостик тяжело носить — ему помогают слова more/most. Использовать <b>и то, и другое сразу нельзя</b>.</p></div>
<div class="box err"><b>Типичные ошибки</b>
<p>✗ more bigger, more better → ✓ ${s('bigger')}, ${s('better')}</p>
<p>✗ the most tallest → ✓ ${s('the tallest')}</p>
<p>✗ gooder, badder → ✓ ${s('better')}, ${s('worse')}</p>
<p>✗ biger, happyer → ✓ ${s('bigger')}, ${s('happier')}</p>
<p>✗ He is taller then me → ✓ ${s('He is taller than me.')} (than — «чем», then — «потом»)</p></div>`,
theory2:`
<div class="box ex"><p>Представь лесенку: <b>tall → taller → the tallest</b> (высокий → выше → самый высокий).</p>
<p>По-русски тоже есть хвостик: высок<b>ий</b> → выш<b>е</b>, а длинные слова — «<b>более</b> интересный», «<b>самый</b> интересный». В английском так же: ${s('more interesting')}, ${s('the most interesting')}.</p>
<p>${s('My dog is bigger than your cat.')} — Моя собака больше твоей кошки.</p>
<p>${s('This is the best day!')} — Это лучший день!</p></div>`,
items:[
{lvl:1, text:'An elephant is {bigger*|biger|more big} than a dog.',
 why:`${s('big')} — короткое: 1 гласная + 1 согласная → удваиваем g: <b>bigger</b>. «more big» — для коротких слов more не нужен.`,
 why2:`big → bi<b>gg</b>er, как hot → ho<b>tt</b>er.`},
{lvl:1, text:'My brother is {taller*|more tall|tallest} than me.',
 why:`Сравниваем двоих, есть ${s('than')} → сравнительная степень: tall + er = <b>taller</b>. «tallest» — «самый», к than не подходит.`,
 why2:`Двое + than → -er.`},
{lvl:1, text:'This book is {more interesting*|interestinger|most interesting} than that one.',
 why:`${s('interesting')} — длинное слово → <b>more interesting</b>. «most» — превосходная, но тут сравнивают две книги (than).`,
 why2:`Длинное слово + сравнение двух = more …`},
{lvl:1, text:'Today is {better*|gooder|more good} than yesterday.',
 why:`${s('good')} — особое слово: good → <b>better</b> → the best. «gooder» и «more good» не бывает.`,
 why2:`good — better — best: просто выучи.`},
{type:'read', lvl:1, text:'My sister is older than me.', q:'Прочитай вслух',
 why:`${s('older')} ${tr('ˈəʊldə')} — «оулдэ», r на конце не читается. ${s('than')} ${tr('ðən')} — звонкий [ð], звучит коротко.`,
 why2:`«Май систэ из оулдэ зэн ми» — th язык между зубами.`},
{type:'listen', lvl:1, say:'happier', q:'Послушай. Какое слово прозвучало?', opts:['happy','happier','happiest'], ans:1,
 why:`Прозвучало ${s('happier')} ${tr('ˈhæpiə')} — «счастливее». happy — без хвостика, happiest — со [ст] на конце.`,
 why2:`Хвостик -er звучит как «-иэ», -est — как «-иист».`},
{lvl:2, text:'Summer is {the hottest*|the hotest|the most hot} season of the year.',
 why:`Самое жаркое из всех времён года → превосходная. ${s('hot')} — удваиваем t: <b>the hottest</b>.`,
 why2:`hot → ho<b>tt</b>est. Короткое слово — без most.`},
{lvl:2, text:'Maths is {easier*|easyer|more easy} for me than French.',
 why:`${s('easy')}: согласная s + y → y → i: <b>easier</b>. «more easy» — для двухсложных на -y используется -ier.`,
 why2:`eas<b>y</b> → eas<b>ier</b>, как happ<b>y</b> → happ<b>ier</b>.`},
{lvl:2, text:'This is {the worst*|the baddest|the most bad} day of my life!',
 why:`${s('bad')} — особое слово: bad → worse → <b>the worst</b>. «baddest», «most bad» — ошибки.`,
 why2:`bad — worse — worst: учи как стишок.`},
{lvl:2, text:'Moscow {is*|are|am@en.s.to_be} {bigger*|more big|biggest} than Kazan.',
 why:`1) Moscow — один город (it) → <b>is</b>. 2) Сравниваем два города, есть than → <b>bigger</b> (удваиваем g).`,
 why2:`Москва — это «она/оно» → is. Два города + than → bigger.`},
{type:'spell', lvl:2, say:'bigger', ans:['bigger'], q:'Послушай и напиши слово',
 why:`${s('bigger')}: big + g + er. Двойная gg!`,
 why2:`Короткое слово — удваиваем последнюю букву: bi-gg-er.`},
{type:'read', lvl:2, text:'This is the most beautiful place in the world.', q:'Прочитай вслух',
 why:`${s('beautiful')} ${tr('ˈbjuːtɪfl')} — ударение на первый слог. ${s('world')} ${tr('wɜːld')} — «уёлд». ${s('the most')} — «зэ моуст».`,
 why2:`«БЬЮтифл» — ударение в начале, конец почти проглатываем.`},
{lvl:2, text:'{These*|This|That@en.s.this_that} shoes are {more expensive*|expensiver|most expensive} than my old ones.',
 why:`1) shoes — много (are) и рядом → <b>these</b>. 2) ${s('expensive')} — длинное слово, сравниваем две пары (than) → <b>more expensive</b>.`,
 why2:`Много и рядом — these. Длинное + than — more.`},
{lvl:3, text:'Lake Baikal is {the deepest*|the deeper|the most deep} lake in the world.',
 why:`Самое глубокое из всех (in the world) → превосходная: deep + est = <b>the deepest</b>. «the deeper» — сравнительная, «most deep» — короткому слову most не нужен.`,
 why2:`«Самый … в мире» = the …est.`},
{lvl:3, text:'My cold is {worse*|badder|more bad} today than it was yesterday.',
 why:`Сравниваем (than), слово bad → <b>worse</b>. Простуда сегодня хуже, чем вчера.`,
 why2:`bad → worse (хуже) → the worst (хуже всего).`},
{lvl:3, text:'Which planet is {farther*|farer|more far} from the Sun, Mars or Venus?',
 why:`Сравниваем две планеты → сравнительная от far: <b>farther</b> (можно и further, но его здесь нет). «farer», «more far» — ошибки. Ответ: дальше Марс.`,
 why2:`far — farther/further — farthest/furthest.`},
{lvl:3, text:'Kate {has got*|have got|is got@en.s.have_got} {more*|much|most} friends than her sister.',
 why:`1) Kate = she → <b>has got</b>. 2) Сравниваем (than), friends — исчисляемое; many → <b>more</b>. «much» — без сравнения и для неисчисляемых, «most» — «больше всех».`,
 why2:`She has got. many — more — the most.`},
{lvl:3, text:'Tom {runs*|run|is run@en.5.ps} {faster*|more fast|fastest} than all the other boys in our class.',
 why:`1) Tom = he, Present Simple → <b>runs</b>. 2) Есть than → сравнительная: fast + er = <b>faster</b>.`,
 why2:`He runs. fast — faster — the fastest.`},
{lvl:3, q:'Какое предложение <b>неправильное</b>?', opts:['She is more happier now.','He is happier now.','It is the happiest day.'], ans:0,
 why:`«more happier» — двойное сравнение. Нужно просто ${s('happier')}. Хвостик -er и more вместе не ставят.`,
 why2:`Либо -er, либо more — никогда оба.`},
{type:'spell', lvl:3, say:'happiest', ans:['happiest'], q:'Послушай и напиши слово (самый счастливый)',
 why:`${s('happiest')}: happ<b>y</b> → happ<b>iest</b>. y меняется на i, две p.`,
 why2:`ha-pp-i-est: две p из happy, y → i.`},
{type:'read', lvl:3, text:'Football is more popular than tennis in our town.', q:'Прочитай вслух',
 why:`${s('popular')} ${tr('ˈpɒpjələ')} — ударение на первый слог. ${s('tennis')} ${tr('ˈtenɪs')}. ${s('town')} ${tr('taʊn')} — «таун».`,
 why2:`«ПОпьюлэ», «ТЭнис».`}
]});

/* ===================== much / many / a lot of / a few / a little ===================== */
RU.rule({
id:'en.6.much_many',
short:`many / a few — с тем, что можно посчитать (${s('many apples')}, ${s('a few friends')}); much / a little — с тем, что не считается (${s('much water')}, ${s('a little milk')}); a lot of — с любыми.`,
theory:`
<div class="box rule"><b>Считается или нет?</b>
<p><b>Исчисляемые</b> — можно посчитать: one apple, two apples. У них есть множественное число: ${s('apples')}, ${s('books')}, ${s('friends')}, ${s('people')}.</p>
<p><b>Неисчисляемые</b> — нельзя посчитать штуками: ${s('water')}, ${s('milk')}, ${s('juice')}, ${s('bread')}, ${s('money')}, ${s('time')}, ${s('homework')}, ${s('information')}, ${s('advice')}, ${s('furniture')}. Множественного числа нет, глагол — <b>is</b>.</p></div>
<div class="box tip"><b>Таблица</b>
<table class="sym">
<tr><th></th><th>исчисляемые (books)</th><th>неисчисляемые (milk)</th></tr>
<tr><td>много</td><td>${s('many books')}</td><td>${s('much milk')}</td></tr>
<tr><td>много (в утверждении)</td><td colspan="2">${s('a lot of books')} · ${s('a lot of milk')}</td></tr>
<tr><td>несколько / немного</td><td>${s('a few books')}</td><td>${s('a little milk')}</td></tr>
<tr><td>сколько?</td><td>${s('How many books?')}</td><td>${s('How much milk?')}</td></tr>
</table>
<p>much и many чаще всего в <b>вопросах и отрицаниях</b>: ${s("I haven't got much time.")} ${s('Have you got many friends?')} В утверждениях обычно говорят ${s('a lot of')}: ${s('We have got a lot of homework.')}</p>
<p>${s('How much is it?')} — Сколько это стоит?</p></div>
<div class="box tip"><b>Как запомнить</b><p><b>Many</b> — для <b>«многих штук»</b> (m-a-n-y: «мэни — монетки по одной»). <b>Much</b> — для «<b>массы</b>»: воды, времени, денег.</p></div>
<div class="box err"><b>Типичные ошибки</b>
<p>✗ many money → ✓ ${s('much money')} (деньги — неисчисляемое!)</p>
<p>✗ homeworks, informations, advices → ✓ ${s('homework')}, ${s('information')}, ${s('advice')}</p>
<p>✗ How much apples → ✓ ${s('How many apples')}</p>
<p>✗ a few water → ✓ ${s('a little water')}</p></div>`,
theory2:`
<div class="box ex"><p>Задай вопрос: «<b>Можно сказать „одна, две, три“?</b>»</p>
<p>Яблоки — одно, два, три → можно → ${s('many apples')}, ${s('a few apples')}.</p>
<p>Молоко — «одно молоко, два молока»? Нельзя → ${s('much milk')}, ${s('a little milk')}.</p>
<p>Не уверен? Скажи ${s('a lot of')} — он подходит к любому слову.</p></div>`,
items:[
{lvl:1, text:'How {many*|much} apples have you got?',
 why:`${s('apples')} — можно посчитать (one apple, two apples) → <b>How many</b>.`,
 why2:`Яблоки считаются → many.`},
{lvl:1, text:'How {much*|many} milk is there in the fridge?',
 why:`${s('milk')} — неисчисляемое, «два молока» не скажешь → <b>How much</b>.`,
 why2:`Молоко — масса, не штуки → much.`},
{lvl:1, text:'I haven\'t got {much*|many} time today.',
 why:`${s('time')} в значении «время» — неисчисляемое → <b>much</b>. Отрицание — для much самое подходящее место.`,
 why2:`Времени много или мало, но не «два времени» → much.`},
{lvl:1, text:'There aren\'t {many*|much} people in the park.',
 why:`${s('people')} — люди, их можно посчитать (это множественное от person) → <b>many</b>. Глагол тоже во множественном: aren't.`,
 why2:`Людей считают по одному → many people.`},
{type:'read', lvl:1, text:'How many brothers and sisters have you got?', q:'Прочитай вслух',
 why:`${s('How many')} ${tr('haʊ ˈmeni')} — «хау мэни». ${s('brothers')} ${tr('ˈbrʌðəz')} — звонкий [ð], на конце [z].`,
 why2:`«Хау мэни брАзэз энд сИстэз хэв ю гот?»`},
{type:'listen', lvl:1, say:'How much is it?', q:'Послушай. О чём спрашивают?', opts:['Сколько это стоит?','Сколько их?','Который час?'], ans:0,
 why:`${s('How much is it?')} — «Сколько это стоит?» Так спрашивают в магазине.`,
 why2:`How much…? о деньгах = сколько стоит. «Который час?» было бы ${s('What time is it?')}`},
{lvl:2, text:'Can I have {a little*|a few|many} sugar in my tea, please?',
 why:`${s('sugar')} — неисчисляемое (песок, не кусочки) → <b>a little</b> (немного). a few и many — для исчисляемых.`,
 why2:`Немного сахара = a little sugar.`},
{lvl:2, text:'I\'ve got {a few*|a little|much} friends in this town.',
 why:`${s('friends')} — исчисляемые, множественное число → <b>a few</b> (несколько). a little и much — для неисчисляемых.`,
 why2:`Несколько друзей = a few friends.`},
{lvl:2, text:'We\'ve got {a lot of*|many|a few} homework today.',
 why:`${s('homework')} — неисчисляемое (нет «homeworks») → many и a few не подходят. Остаётся <b>a lot of</b> — подходит ко всему.`,
 why2:`homework — масса заданий, а не штуки → a lot of homework.`},
{lvl:2, text:'There {is*|are@en.p.there_is} {a little*|a few|many} juice in the bottle.',
 why:`1) ${s('juice')} — неисчисляемое, с ним глагол в единственном: <b>There is</b>. 2) Немного сока → <b>a little</b>.`,
 why2:`Сок не считается: there is, a little juice.`},
{lvl:2, text:'I haven\'t got {any*|some@en.5.some_any} bread, and there isn\'t {much*|many} milk.',
 why:`1) В отрицании — <b>any</b>: ${s("I haven't got any bread.")} 2) ${s('milk')} — неисчисляемое → <b>much</b>.`,
 why2:`Отрицание → any. Молоко → much.`},
{type:'listen', lvl:2, say:'a few apples', q:'Послушай. Что прозвучало?', opts:['a few apples','a lot of apples','four apples'], ans:0,
 why:`Прозвучало ${s('a few apples')} ${tr('ə fjuː ˈæplz')} — «несколько яблок». few звучит «фью».`,
 why2:`few — «фью», four — «фо».`},
{type:'read', lvl:2, text:"I haven't got much time today.", q:'Прочитай вслух',
 why:`${s("haven't")} ${tr('ˈhævnt')} — «хэвнт». ${s('much')} ${tr('mʌtʃ')} — «мач». ${s('today')} ${tr('təˈdeɪ')} — ударение на второй слог.`,
 why2:`«Ай хэвнт гот мач тайм тудЭй».`},
{lvl:3, text:'How {much*|many} money did you spend?',
 why:`${s('money')} — неисчисляемое (считают рубли, а не «деньги»): <b>How much money</b>.`,
 why2:`Деньги в английском — как вода: much money.`},
{lvl:3, text:'He gave me {some good advice*|a good advice|some good advices}.',
 why:`${s('advice')} (совет) в английском <b>неисчисляемое</b>: нельзя «an advice» и «advices». Правильно: <b>some good advice</b>.`,
 why2:`Один совет = a piece of advice. Но просто «советы» = advice.`},
{lvl:3, text:'There {is*|are} a lot of information on this website.',
 why:`${s('information')} — неисчисляемое, без -s → глагол <b>is</b>. «a lot of» не делает его множественным.`,
 why2:`Важно то, что после a lot of: information — единственное → is.`},
{lvl:3, text:'My cat {doesn\'t*|don\'t|isn\'t@en.5.ps} drink {much*|many} water.',
 why:`1) My cat = it → Present Simple: <b>doesn't</b> drink. 2) ${s('water')} — неисчисляемое → <b>much</b>.`,
 why2:`it → doesn't. Вода → much.`},
{lvl:3, text:'{How many*|How much} {children*|childs|childrens@en.s.plurals} are there in your class?',
 why:`1) Детей можно посчитать → <b>How many</b>. 2) child → <b>children</b>, без -s.`,
 why2:`Детей считают → many. child — children.`},
{lvl:3, q:'Какое слово <b>неисчисляемое</b> (у него нет множественного числа)?', opts:['apple','furniture','chair','friend'], ans:1,
 why:`${s('furniture')} (мебель) — неисчисляемое: «two furnitures» нельзя. А ${s('chairs')}, ${s('apples')}, ${s('friends')} — можно.`,
 why2:`Мебель — общее слово, а стулья — штуки.`},
{type:'spell', lvl:3, say:'information', ans:['information'], q:'Послушай и напиши слово',
 why:`${s('information')} ${tr('ˌɪnfəˈmeɪʃn')}: in-for-ma-tion. Окончание -tion читается [ʃn].`,
 why2:`Почти как по-русски «информация», но на конце -tion.`},
{type:'read', lvl:3, text:'We need a little milk and a few eggs.', q:'Прочитай вслух',
 why:`${s('a little')} ${tr('ə ˈlɪtl')}. ${s('a few eggs')} — связывай: «э фью эгз». ${s('eggs')} — на конце звонкий [z].`,
 why2:`little — немного (молока), few — несколько (яиц).`}
]});

/* ===================== must / have to / mustn't / don't have to ===================== */
RU.rule({
id:'en.6.must_have_to',
short:`must / have to — «надо, обязан»; ${s("mustn't")} — «нельзя!»; ${s("don't have to")} — «не обязательно». В прошлом только ${s('had to')}.`,
theory:`
<div class="box rule"><b>Четыре выражения</b>
<table class="sym">
<tr><th>выражение</th><th>значение</th><th>пример</th></tr>
<tr><td>${s('must')} + V1</td><td>надо, должен (я сам так считаю; правила, знаки)</td><td>${s('I must study harder.')} ${s('You must wear a helmet.')}</td></tr>
<tr><td>${s('have to')} / ${s('has to')} + V1</td><td>приходится, надо (так сложились обстоятельства)</td><td>${s('I have to get up at seven.')} ${s('She has to walk the dog.')}</td></tr>
<tr><td>${s("mustn't")} + V1</td><td><b>нельзя</b>, запрещено</td><td>${s("You mustn't run in the corridor.")}</td></tr>
<tr><td>${s("don't have to")} / ${s("doesn't have to")} + V1</td><td><b>не обязательно</b>, можно не делать</td><td>${s("You don't have to come.")}</td></tr>
</table></div>
<div class="box rule"><b>Формы</b>
<p>must — одно для всех, без to и без -s: ${s('He must go.')}</p>
<p>have to меняется: ${s('I have to')} — ${s('he has to')}; вопрос: ${s('Do you have to…?')} ${s('Does she have to…?')}</p>
<p>У must <b>нет прошедшего</b>. В прошлом: ${s('had to')}: ${s('Yesterday I had to stay at home.')}</p>
<p>В будущем: ${s('will have to')}: ${s('You will have to wait.')}</p>
<p>Произношение: в ${s("mustn't")} ${tr('ˈmʌsnt')} первая t не читается — «маснт».</p></div>
<div class="box tip"><b>Как запомнить разницу</b>
<p>${s("mustn't")} — <b>красный свет</b> 🚫: делать нельзя.</p>
<p>${s("don't have to")} — <b>свобода выбора</b>: хочешь — делай, не хочешь — не делай.</p>
<p>${s("You mustn't swim here.")} — Здесь плавать запрещено. ${s("You don't have to swim.")} — Ты можешь не плавать.</p></div>
<div class="box err"><b>Типичные ошибки</b>
<p>✗ You must to go → ✓ ${s('You must go.')}</p>
<p>✗ He have to → ✓ ${s('He has to.')}</p>
<p>✗ I musted / Yesterday I must → ✓ ${s('I had to.')}</p>
<p>✗ «Не обязательно» = mustn't → ✓ ${s("don't have to")} (mustn't — это запрет!)</p></div>`,
theory2:`
<div class="box ex"><p>Представь светофор:</p>
<p>🟢 ${s('must')} / ${s('have to')} — «надо, делай»: ${s('I have to do my homework.')} — Мне надо сделать уроки.</p>
<p>🔴 ${s("mustn't")} — «стоп, нельзя»: ${s("You mustn't eat in class.")} — На уроке есть нельзя.</p>
<p>⚪ ${s("don't have to")} — «как хочешь»: ${s("You don't have to wear a tie.")} — Галстук можно не надевать.</p>
<p>Вчера? Только ${s('had to')}.</p></div>`,
items:[
{lvl:1, text:'You {mustn\'t*|don\'t have to} run in the corridor. It\'s dangerous.',
 why:`Бегать опасно — значит <b>нельзя</b> → <b>mustn't</b>. «don't have to» значило бы «не обязательно бегать» — но здесь запрет.`,
 why2:`Опасно = красный свет = mustn't.`},
{lvl:1, text:'Tomorrow is Sunday, so I {don\'t have to*|mustn\'t} get up early.',
 why:`В воскресенье рано вставать <b>не обязательно</b> (но и не запрещено) → <b>don't have to</b>. mustn't значило бы «запрещено вставать рано».`,
 why2:`Можно поспать — это свобода выбора = don't have to.`},
{lvl:1, text:'You must {wear*|to wear|wearing} a helmet when you ride a bike.',
 why:`После must — глагол в начальной форме <b>без to</b>: ${s('must wear')}.`,
 why2:`must + глагол, как can + глагол: никакого to.`},
{lvl:1, text:'My brother {has to*|have to|has} do his homework every evening.',
 why:`My brother = he → <b>has to</b>. «have to» — для I/you/we/they, а «has do» без to — ошибка.`,
 why2:`he has, she has → he has to.`},
{type:'read', lvl:1, text:'You must wash your hands before dinner.', q:'Прочитай вслух',
 why:`${s('must')} ${tr('mʌst')} — «маст». ${s('wash')} ${tr('wɒʃ')} — «уош». ${s('hands')} ${tr('hændz')} — широкий [æ], на конце [z].`,
 why2:`«Ю маст уош ёо хэндз бифо диннэ».`},
{type:'listen', lvl:1, say:"You mustn't touch it.", q:'Послушай. Что это значит?', opts:['Это трогать нельзя.','Это можно не трогать (не обязательно).','Это нужно потрогать.'], ans:0,
 why:`Прозвучало ${s("You mustn't touch it.")} — mustn't = запрет: «Это трогать нельзя».`,
 why2:`mustn't звучит «маснт» — это красный свет.`},
{lvl:2, text:'Yesterday I {had to*|must|musted} stay at home because I was ill.',
 why:`${s('yesterday')} — прошлое. У must нет прошедшей формы, поэтому <b>had to</b>. «musted» не существует.`,
 why2:`Вчера пришлось = had to.`},
{lvl:2, text:'{Does she have to*|Does she has to|Must she to} wear a uniform at school?',
 why:`Вопрос с have to строится через does: <b>Does she have to</b>…? После does — have (не has). «Must she to» — после must to не бывает.`,
 why2:`Does she have to…? — как Does she like…?`},
{lvl:2, text:'It\'s a free museum. You {don\'t have to*|mustn\'t} pay.',
 why:`Музей бесплатный — платить <b>не нужно</b> → <b>don't have to</b>. mustn't значило бы «платить запрещено».`,
 why2:`Бесплатно — значит можно не платить = don't have to.`},
{lvl:2, text:'It\'s against the rules: students {mustn\'t*|don\'t have to} use {their*|they|there@en.p.possessive} phones during the test.',
 why:`1) ${s("It's against the rules")} — «это против правил», значит запрещено → <b>mustn't</b>. 2) «Свои (их) телефоны» — притяжательное <b>their</b>. they — «они», there — «там».`,
 why2:`На контрольной — красный свет: mustn't. Чьи? — their.`},
{type:'spell', lvl:2, say:"mustn't", ans:["mustn't",'must not'], q:'Послушай и напиши (с апострофом). Осторожно: одну букву не слышно!',
 why:`${s("mustn't")} ${tr('ˈmʌsnt')} — слышим «маснт», а пишем mus<b>t</b>n't: первая t не читается.`,
 why2:`must + n't = mustn't.`},
{type:'read', lvl:2, text:"We don't have to wear a uniform at our school.", q:'Прочитай вслух',
 why:`${s('have to')} читается ${tr('ˈhæf tə')} — «хэф ту», v звучит как [f]. ${s('uniform')} ${tr('ˈjuːnɪfɔːm')} — ударение на первый слог.`,
 why2:`«Ви доунт хэфту уэа э ЮНифоом».`},
{type:'listen', lvl:2, say:'I had to wait for an hour.', q:'Послушай. Когда это было?', opts:['в прошлом','сейчас','в будущем'], ans:0,
 why:`${s('I had to wait for an hour.')} — ${s('had to')} = «пришлось» в прошлом: «Мне пришлось ждать час».`,
 why2:`had — прошлое от have. had to = пришлось.`},
{lvl:3, text:'Dad {will have to*|will must|must will} work late tomorrow.',
 why:`У must нет будущей формы, поэтому в будущем — <b>will have to</b>. «will must» и «must will» — ошибки.`,
 why2:`Завтра придётся = will have to.`},
{lvl:3, text:'You {mustn\'t*|don\'t have to} tell anyone. It\'s a secret!',
 why:`Секрет — рассказывать <b>нельзя</b> → <b>mustn't</b>.`,
 why2:`Секрет = красный свет = mustn't.`},
{lvl:3, text:'You {don\'t have to*|mustn\'t} help me — I can do it myself, but thank you!',
 why:`«Я справлюсь сам, но спасибо» — помогать <b>не обязательно</b> → <b>don't have to</b>. mustn't прозвучало бы как грубый запрет — и не сочеталось бы с «thank you».`,
 why2:`Можешь не помогать = don't have to.`},
{lvl:3, text:'In our school we {have to*|has to|must to} be in class {at*|on|in@en.5.prep_time} half past eight.',
 why:`1) we → <b>have to</b>. «must to» — после must to не бывает. 2) Точное время → <b>at</b>: ${s('at half past eight')}.`,
 why2:`we have to. Время по часам — at.`},
{lvl:3, text:'My mum works late, so my sister {has to*|have to|must to} cook dinner. She {usually cooks*|cooks usually|usually cook@en.5.adv_freq} pasta.',
 why:`1) my sister = she → <b>has to</b>. 2) Наречие частоты стоит <b>перед</b> обычным глаголом, а глагол с she получает -s: <b>usually cooks</b>.`,
 why2:`she has to. usually — перед глаголом: She usually cooks.`},
{lvl:3, text:'Look at the sign: you {mustn\'t*|don\'t have to} swim here. {There are*|There is|It is@en.p.there_is} a lot of rocks under the water.',
 why:`1) Знак запрещает → <b>mustn't</b>. 2) rocks — множественное → <b>There are</b> a lot of rocks.`,
 why2:`Знак — запрет: mustn't. Камней много → there are.`},
{lvl:3, q:'Выбери перевод: «Тебе <b>не обязательно</b> приходить».', opts:["You mustn't come.","You don't have to come.",'You must come.'], ans:1,
 why:`«Не обязательно» = ${s("You don't have to come.")} ${s("You mustn't come")} — «Тебе нельзя приходить».`,
 why2:`Не обязательно — don't have to. Нельзя — mustn't.`},
{type:'read', lvl:3, text:'I had to get up early yesterday.', q:'Прочитай вслух',
 why:`${s('had to')} ${tr('ˈhæd tə')} — «хэд ту», d почти сливается с t. ${s('early')} ${tr('ˈɜːli')} — «ёли». ${s('get up')} связывай: «гетап».`,
 why2:`«Ай хэдту гетап ёли йестэдэй».`}
]});

/* ===================== Фонетика: окончание -ed ===================== */
RU.rule({
id:'en.6.ph_ed',
short:`-ed читается тремя способами: [ɪd] после t и d (${s('wanted')}, ${s('needed')}), [t] после глухих звуков (${s('worked')}), [d] после звонких и гласных (${s('played')}).`,
theory:`
<div class="box rule"><b>Три способа прочитать -ed</b>
<table class="sym">
<tr><th>звук</th><th>когда</th><th>примеры</th></tr>
<tr><td><b>[ɪd]</b> — лишний слог</td><td>после звуков [t] и [d]</td><td>${s('wanted')} ${tr('ˈwɒntɪd')}, ${s('needed')} ${tr('ˈniːdɪd')}, ${s('visited')}, ${s('started')}, ${s('decided')}</td></tr>
<tr><td><b>[t]</b></td><td>после глухих звуков: [p], [k], [s], [f], [ʃ], [tʃ]</td><td>${s('worked')} ${tr('wɜːkt')}, ${s('stopped')}, ${s('looked')}, ${s('kissed')}, ${s('laughed')}, ${s('washed')}, ${s('watched')}</td></tr>
<tr><td><b>[d]</b></td><td>после звонких звуков и гласных</td><td>${s('played')} ${tr('pleɪd')}, ${s('lived')}, ${s('opened')}, ${s('cleaned')}, ${s('called')}, ${s('cried')}</td></tr>
</table></div>
<div class="box tip"><b>Как запомнить</b>
<p>Лишний слог [ɪd] появляется <b>только</b> после t и d: «want-ted» иначе не выговорить. Во всех остальных словах -ed <b>не добавляет слог</b>: worked — один слог, «уёкт».</p>
<p>Проверка руками: положи ладонь на горло и скажи последний звук глагола. Горло не дрожит (p, k, s, f, sh, ch) — читаем [t]. Дрожит — читаем [d].</p>
<p>Смотри на <b>звук</b>, а не на букву: в ${s('liked')} буква e немая, последний звук [k] → [t]; в ${s('laughed')} gh звучит как [f] → [t].</p></div>
<div class="box err"><b>Типичная ошибка</b>
<p>Читать всё как «-ед»: ✗ «уоркед», «плэйед». ✓ ${s('worked')} — «уёкт», ${s('played')} — «плэйд».</p></div>`,
theory2:`
<div class="box ex"><p>Помни три коробки:</p>
<p>📦 «Ид» — только для t и d: ${s('wanted')}, ${s('needed')}.</p>
<p>📦 «Т» — после «шипящих и глухих»: ${s('worked')}, ${s('watched')}.</p>
<p>📦 «Д» — всё остальное: ${s('played')}, ${s('lived')}.</p>
<p>Чаще всего -ed просто «прилипает» к слову без нового слога.</p></div>`,
items:[
{type:'listen', lvl:1, say:'wanted', q:'Послушай. Сколько слогов в слове?', opts:['1','2','3'], ans:1,
 why:`${s('wanted')} ${tr('ˈwɒn-tɪd')} — два слога: want + [ɪd]. После t окончание даёт новый слог.`,
 why2:`want-ed: «вонт-ид» — два хлопка.`},
{type:'listen', lvl:1, say:'worked', q:'Послушай. Как звучит окончание?', opts:['[t]','[d]','[ɪd]'], ans:0,
 why:`${s('worked')} ${tr('wɜːkt')} — на конце [t]: перед -ed глухой звук [k].`,
 why2:`k глухой → -ed тоже глухой: [t].`},
{type:'listen', lvl:1, say:'played', q:'Послушай. Как звучит окончание?', opts:['[t]','[d]','[ɪd]'], ans:1,
 why:`${s('played')} ${tr('pleɪd')} — на конце [d]: перед -ed гласный звук.`,
 why2:`После гласных -ed звонкий: [d].`},
{type:'listen', lvl:1, say:'needed', q:'Послушай. Как звучит окончание?', opts:['[t]','[d]','[ɪd]'], ans:2,
 why:`${s('needed')} ${tr('ˈniːdɪd')} — на конце [ɪd]: перед -ed звук [d], поэтому появляется лишний слог.`,
 why2:`need-ed — «нид-ид», два слога.`},
{type:'read', lvl:1, text:'I worked and played all day.', q:'Прочитай вслух',
 why:`${s('worked')} ${tr('wɜːkt')} — один слог, на конце [t]. ${s('played')} ${tr('pleɪd')} — один слог, на конце [d]. Не добавляй «-ед»!`,
 why2:`«Ай уёкт энд плэйд ол дэй».`},
{lvl:1, q:'В каком слове окончание -ed читается [ɪd]?', opts:['looked','started','opened'], ans:1,
 why:`${s('started')} ${tr('ˈstɑːtɪd')}: перед -ed звук [t] → [ɪd]. В ${s('looked')} — [t], в ${s('opened')} — [d].`,
 why2:`[ɪd] — только после t и d. star<b>t</b>ed.`},
{type:'listen', lvl:2, say:'watched', q:'Послушай. Сколько слогов в слове?', opts:['1','2'], ans:0,
 why:`${s('watched')} ${tr('wɒtʃt')} — <b>один</b> слог: «вочт». После [tʃ] окончание -ed звучит [t] и слога не добавляет.`,
 why2:`Хоть букв много, хлопок один: «вочт».`},
{lvl:2, q:'Найди «лишнее» слово (окончание читается по-другому):', opts:['helped','washed','cleaned','kissed'], ans:2,
 why:`${s('cleaned')} ${tr('kliːnd')} — на конце [d] (перед ним звонкий [n]). А ${s('helped')}, ${s('washed')}, ${s('kissed')} — на конце [t].`,
 why2:`p, sh, s — глухие → [t]; n — звонкий → [d].`},
{lvl:2, text:'In the word «stopped» the ending sounds like {[t]*|[d]|[ɪd]}, and in the word «dogs» the ending sounds like {[z]*|[s]|[ɪz]@en.5.ph_s_end}.',
 why:`1) ${s('stopped')} ${tr('stɒpt')}: перед -ed глухой [p] → <b>[t]</b>. 2) ${s('dogs')} ${tr('dɒɡz')}: перед -s звонкий [ɡ] → <b>[z]</b>.`,
 why2:`Правило одно для -ed и -s: после глухих — глухой звук, после звонких — звонкий.`},
{lvl:2, text:'In «thanked» the letters th sound like {[θ]*|[ð]@en.5.ph_th}, and the ending -ed sounds like {[t]*|[d]|[ɪd]}.',
 why:`1) ${s('thank')} начинается с глухого ${tr('θ')}, как ${s('think')}. 2) Перед -ed глухой [k] → <b>[t]</b>: ${s('thanked')} ${tr('θæŋkt')}.`,
 why2:`thank — глухой th. thanked — «сэнкт» с языком между зубами.`},
{type:'spell', lvl:2, say:'washed', ans:['washed'], q:'Послушай и напиши слово (прошедшее от wash)',
 why:`${s('washed')} ${tr('wɒʃt')}: слышим «уошт», но пишем wash + <b>ed</b>. Звук [t] на конце — это окончание -ed.`,
 why2:`Не пиши «washt»: окончание всегда пишется -ed, как бы оно ни звучало.`},
{type:'read', lvl:2, text:'We needed help, so we called our friends.', q:'Прочитай вслух',
 why:`${s('needed')} ${tr('ˈniːdɪd')} — два слога. ${s('called')} ${tr('kɔːld')} — один слог, на конце [d]. ${s('friends')} ${tr('frendz')}.`,
 why2:`«НИдид» — два слога, «коолд» — один.`},
{lvl:2, text:'In «cleaned» the letters ea sound like {[iː]*|[e]|[eɪ]@en.s.vowel_teams}, and the ending -ed sounds like {[d]*|[t]|[ɪd]}.',
 why:`1) В ${s('clean')} сочетание ea читается долгим <b>[iː]</b>, как в ${s('tea')}. 2) Перед -ed звонкий [n] → <b>[d]</b>: ${s('cleaned')} ${tr('kliːnd')}.`,
 why2:`ea = [iː] (sea, tea, clean). n звонкий → [d].`},
{lvl:3, text:'In «lived» the vowel is {[ɪ]*|[iː]@en.5.ph_i}, and the ending -ed sounds like {[d]*|[t]|[ɪd]}.',
 why:`1) ${s('live')} ${tr('lɪv')} — краткий <b>[ɪ]</b>, как в ${s('ship')}. 2) Перед -ed звонкий [v] → <b>[d]</b>: ${s('lived')} ${tr('lɪvd')}.`,
 why2:`live — коротко «лив». v звонкий → «ливд».`},
{type:'listen', lvl:3, say:'laughed', q:'Послушай. Как звучит окончание в слове laughed?', opts:['[t]','[d]','[ɪd]'], ans:0,
 why:`${s('laughed')} ${tr('lɑːft')}: буквы gh звучат как глухой [f] → окончание <b>[t]</b>.`,
 why2:`Слушай звук, а не буквы: «лааф» + [t] = «лаафт».`},
{lvl:3, q:'В каком ряду во <b>всех</b> словах -ed читается [t]?', opts:['liked, fixed, stopped','liked, lived, stopped','fixed, needed, kissed'], ans:0,
 why:`${s('liked')} (перед -ed [k]), ${s('fixed')} ([ks]), ${s('stopped')} ([p]) — все глухие → [t]. В ${s('lived')} — [d], в ${s('needed')} — [ɪd].`,
 why2:`Ищи в ряду «чужака»: lived звонкий, needed с лишним слогом.`},
{lvl:3, q:'Почему в слове «liked» окончание звучит [t], хотя перед d написана буква e?', opts:['Буква e не читается, а последний звук перед окончанием — глухой [k]','Потому что все глаголы на -e читаются с [t]','Потому что это неправильный глагол'], ans:0,
 why:`В ${s('like')} ${tr('laɪk')} буква e немая, слово кончается на звук [k]. [k] глухой → ${s('liked')} ${tr('laɪkt')}. Сравни: ${s('lived')} — тоже на -e, но читается [d], потому что [v] звонкий.`,
 why2:`Правило про звуки, а не про буквы. like звучит «лайк» → «лайкт».`},
{type:'spell', lvl:3, say:'decided', ans:['decided'], q:'Послушай и напиши слово (прошедшее от decide)',
 why:`${s('decided')} ${tr('dɪˈsaɪdɪd')}: decide + d (e уже есть). На конце слышен лишний слог [ɪd], потому что перед окончанием [d].`,
 why2:`de-ci-ded: c читается как [s] перед i.`},
{type:'read', lvl:3, text:'He looked at the map and decided to stay.', q:'Прочитай вслух',
 why:`${s('looked')} ${tr('lʊkt')} — один слог, [t]. ${s('decided')} ${tr('dɪˈsaɪdɪd')} — три слога, ударение на второй. ${s('map')} — широкий [æ].`,
 why2:`«лукт» — коротко, «дисАйдид» — с лишним слогом.`}
]});

/* ===================== Фонетика: /æ/ и /e/ ===================== */
const AE=[['bad','bed'],['man','men'],['pan','pen'],['sat','set'],['bag','beg'],['had','head'],['sand','send'],['mat','met']];
RU.rule({
id:'en.6.ph_ae',
short:`[æ] — широкий звук между «а» и «э», рот открыт широко: ${s('bad')}, ${s('man')}. [e] — как русское «э»: ${s('bed')}, ${s('men')}. Перепутаешь — получится другое слово!`,
theory:`
<div class="box rule"><b>Два разных звука</b>
<p><b>[æ]</b> — открой рот широко, как для «а», челюсть опусти вниз, а скажи «э». Получится что-то между: ${s('cat')} ${tr('kæt')}, ${s('black')} ${tr('blæk')}, ${s('apple')} ${tr('ˈæpl')}, ${s('hat')}.</p>
<p><b>[e]</b> — почти как русское «э» в слове «эти», рот приоткрыт: ${s('bed')} ${tr('bed')}, ${s('red')}, ${s('ten')}, ${s('egg')}.</p>
<p>Буква <b>a</b> в закрытом слоге обычно даёт [æ]: c<b>a</b>t, b<b>a</b>g. Буква <b>e</b> в закрытом слоге — [e]: p<b>e</b>n, t<b>e</b>n. Сочетание <b>ea</b> иногда тоже [e]: ${s('bread')}, ${s('head')}.</p></div>
<div class="box tip"><b>Пары слов — послушай и повтори</b>
<table class="sym"><tr><th>[æ]</th><th>[e]</th></tr>
${AE.map(p=>`<tr><td>${s(p[0])}</td><td>${s(p[1])}</td></tr>`).join('')}
</table>
<p>${s('bad')} — плохой, ${s('bed')} — кровать. ${s('man')} — мужчина, ${s('men')} — мужчины. ${s('pan')} — сковорода, ${s('pen')} — ручка. ${s('sat')} — сидел, ${s('set')} — накрывать (на стол), ставить.</p></div>
<div class="box tip"><b>Как запомнить</b><p>Для [æ] представь, что ты у врача: «Скажи „а-а-а“» — рот открыт широко. И в этом положении скажи «э». Проверь пальцем: при [æ] между зубами помещается палец, при [e] — нет.</p></div>
<div class="box err"><b>Типичная ошибка</b><p>Говорить всё как русское «э»: «бэд» — и уже непонятно, плохой это или кровать. ${s('I have a bad cat.')} — у меня плохой кот, а не «кровать-кот»!</p></div>`,
theory2:`
<div class="box ex"><p>[æ] — это «<b>лягушачье</b>» «э»: рот растянут вниз и в стороны, как у лягушки 🐸. ${s('cat')}, ${s('bag')}, ${s('man')}.</p>
<p>[e] — обычное спокойное «э»: ${s('pen')}, ${s('red')}, ${s('ten')}.</p>
<p>Скажи по очереди: ${s('man')} — ${s('men')}. Один мужчина — много мужчин. Разница только в ширине рта!</p></div>`,
items:[
{type:'listen', lvl:1, say:'bed', q:'Послушай. Какое слово прозвучало?', opts:['bad','bed'], ans:1,
 why:`Прозвучало ${s('bed')} ${tr('bed')} — «кровать», звук [e], рот приоткрыт. ${s('bad')} ${tr('bæd')} — шире.`,
 why2:`bed — спокойное «э», bad — широкое «лягушачье».`},
{type:'listen', lvl:1, say:'man', q:'Послушай. Какое слово прозвучало?', opts:['man','men'], ans:0,
 why:`Прозвучало ${s('man')} ${tr('mæn')} — «мужчина», широкий звук [æ]. ${s('men')} ${tr('men')} — «мужчины».`,
 why2:`Широко = man (один). Узко = men (много).`},
{type:'listen', lvl:1, say:'pen', q:'Послушай. Какое слово прозвучало?', opts:['pan','pen'], ans:1,
 why:`Прозвучало ${s('pen')} ${tr('pen')} — «ручка», звук [e]. ${s('pan')} ${tr('pæn')} — «сковорода».`,
 why2:`pen — «пэн» (спокойно), pan — «пæн» (рот широко).`},
{type:'listen', lvl:1, say:'sat', q:'Послушай. Какое слово прозвучало?', opts:['sat','set'], ans:0,
 why:`Прозвучало ${s('sat')} ${tr('sæt')} — «сидел» (прошедшее от sit), широкий [æ]. ${s('set')} ${tr('set')} — с [e].`,
 why2:`sit — sat: широкий звук.`},
{type:'read', lvl:1, text:'The black cat is on the bed.', q:'Прочитай вслух',
 why:`${s('black')} ${tr('blæk')} и ${s('cat')} ${tr('kæt')} — широкий [æ]. ${s('bed')} ${tr('bed')} — обычный [e]. Почувствуй разницу во рту!`,
 why2:`«Блæк кæт» — рот широко; «бэд» — спокойно.`},
{lvl:1, q:'В каком слове звук [æ]?', opts:['red','hat','ten'], ans:1,
 why:`${s('hat')} ${tr('hæt')} — буква a в закрытом слоге → [æ]. В ${s('red')} и ${s('ten')} — [e].`,
 why2:`a в коротком слове = [æ]; e = [e].`},
{type:'listen', lvl:2, say:'bag', q:'Послушай. Какое слово прозвучало?', opts:['bag','beg'], ans:0,
 why:`Прозвучало ${s('bag')} ${tr('bæɡ')} — «сумка». ${s('beg')} ${tr('beɡ')} — «просить».`,
 why2:`Сумка — широкое [æ]: bag.`},
{type:'listen', lvl:2, say:'I can see the men.', q:'Послушай. Сколько человек он видит?', opts:['одного (the man)','несколько (the men)'], ans:1,
 why:`Прозвучало ${s('I can see the men.')} — ${s('men')} ${tr('men')} с [e] — это мужчины, несколько.`,
 why2:`men — узкое «э», много людей. man — широкое, один.`},
{lvl:2, text:'I sleep in a big soft {bed*|bad}.',
 why:`Спят в <b>bed</b> (кровать) ${tr('bed')}. ${s('bad')} — «плохой», сюда по смыслу не подходит.`,
 why2:`bed — кровать, bad — плохой. Одна буква — и совсем другое слово.`},
{lvl:2, text:'Can I borrow your {pen*|pan}? I want to write something.',
 why:`Чтобы писать, нужна <b>pen</b> (ручка) ${tr('pen')}. ${s('pan')} — сковорода.`,
 why2:`Писать — pen. Жарить — pan.`},
{lvl:2, text:'Fry the eggs in a {pan*|pen}. {Don\'t*|Not|Doesn\'t@en.p.imperative} use too much oil.',
 why:`1) Жарят на <b>pan</b> ${tr('pæn')} (сковорода). 2) Отрицательная просьба/приказ: <b>Don't</b> + глагол: ${s("Don't use too much oil.")}`,
 why2:`Сковорода — pan (широкий звук). «Не делай» = Don't…`},
{lvl:2, text:'{There are*|There is@en.p.there_is} three {men*|man} at the door.',
 why:`1) Три человека — множественное → <b>There are</b>. 2) Мужчин трое → <b>men</b> ${tr('men')} (с [e]). ${s('man')} ${tr('mæn')} — один.`,
 why2:`Много → there are, men. Один → there is, a man.`},
{type:'spell', lvl:2, say:'black', ans:['black'], q:'Послушай и напиши слово',
 why:`${s('black')} ${tr('blæk')}: широкий [æ] пишется буквой a, на конце ck.`,
 why2:`b-l-a-c-k. После короткого гласного [k] пишется ck.`},
{type:'spell', lvl:2, say:'bread', ans:['bread'], q:'Послушай и напиши слово (хлеб)',
 why:`${s('bread')} ${tr('bred')}: звук [e], но пишется <b>ea</b>! Как в ${s('head')}.`,
 why2:`Слышишь «брэд» — пиши b-r-e-a-d.`},
{type:'read', lvl:2, text:'My dad has a red bag and a black hat.', q:'Прочитай вслух',
 why:`[æ]: ${s('dad')}, ${s('has')}, ${s('bag')}, ${s('black')}, ${s('hat')}. [e]: только ${s('red')}. Следи за ртом!`,
 why2:`Все слова с буквой a — широко, red — спокойно.`},
{lvl:3, text:'This milk is {bad*|bed}. Please don\'t drink {it*|its|him@en.5.pronouns}.',
 why:`1) Молоко испортилось — оно <b>bad</b> ${tr('bæd')} (плохое). 2) Молоко — it, после глагола тоже <b>it</b>: ${s("don't drink it")}. its — «его» (чей?), him — только о человеке.`,
 why2:`Плохое — bad. Молоко — it.`},
{lvl:3, text:'Grandad {sat*|set} in his chair. He {was*|were@en.p.was_were} tired.',
 why:`1) Дедушка <b>сидел</b>: sit → <b>sat</b> ${tr('sæt')}. ${s('set')} — другой глагол (ставить, накрывать). 2) He → <b>was</b>.`,
 why2:`sit — sat (сидел). He was.`},
{lvl:3, q:'Что значит предложение «I’ve got a bad pen»? (Внимательно: bad и pen!)', opts:['У меня плохая ручка.','У меня плохая сковородка.','У меня есть кровать и ручка.'], ans:0,
 sayAfter:"I've got a bad pen.",
 why:`${s('bad')} ${tr('bæd')} — плохой, ${s('pen')} ${tr('pen')} — ручка. «Плохая ручка».`,
 why2:`bad (широко) = плохой, pen (узко) = ручка.`},
{type:'listen', lvl:3, say:'had', q:'Послушай. Какое слово прозвучало?', opts:['had','head'], ans:0,
 why:`Прозвучало ${s('had')} ${tr('hæd')} — прошедшее от have, широкий [æ]. ${s('head')} ${tr('hed')} — «голова», [e].`,
 why2:`had — рот шире, head — спокойнее.`},
{type:'read', lvl:3, text:'Ten men sat on the sand.', q:'Прочитай вслух',
 why:`[e]: ${s('ten')}, ${s('men')}. [æ]: ${s('sat')}, ${s('sand')}. Чередуй: узко — узко — широко — широко.`,
 why2:`«Тэн мэн сæт он зэ сæнд».`}
]});

/* ===================== Фонетика: ударение ===================== */
RU.rule({
id:'en.6.ph_stress',
short:`В каждом слове один слог звучит громче и дольше — это ударение. Неправильное ударение мешает тебя понять: ${s('computer')} (com-PU-ter), ${s('photograph')} (PHO-to-graph), ${s('photographer')} (pho-TO-gra-pher).`,
theory:`
<div class="box rule"><b>Что такое ударение</b>
<p>Ударный слог — <b>громче, дольше, выше</b>. Остальные слоги проговариваются слабее. В упражнениях ударный слог написан <b>ЗАГЛАВНЫМИ</b> буквами: com-PU-ter.</p>
<p>В транскрипции знак ${tr('ˈ')} ставится <b>перед</b> ударным слогом: ${s('computer')} ${tr('kəmˈpjuːtə')}.</p></div>
<div class="box tip"><b>Подсказки</b>
<p>1) Большинство двусложных <b>существительных и прилагательных</b> — ударение на <b>первый</b> слог: ${s('TEAcher','teacher')}, ${s('PENcil','pencil')}, ${s('MOther','mother')}, ${s('HAPpy','happy')}, ${s('YELlow','yellow')}.</p>
<p>2) Многие двусложные <b>глаголы</b> — на <b>второй</b>: ${s('beGIN','begin')}, ${s('deCIDE','decide')}, ${s('forGET','forget')}.</p>
<p>3) Слова на <b>-tion</b> — ударение на слог перед ним: ${s('inforMAtion','information')}, ${s('eduCAtion','education')}.</p>
<p>4) Числа: ${s('thirTEEN','thirteen')} — ${s('THIRty','thirty')}, ${s('fifTEEN','fifteen')} — ${s('FIFty','fifty')}. Ударение помогает понять, какое число!</p>
<p>5) Ударение может «переезжать» в родственных словах: ${s('PHOtograph','photograph')} — ${s('phoTOgrapher','photographer')}.</p>
<p>6) ${s('present')}: существительное (подарок) — ${s('PREsent','present')}; глагол (представлять) — ${s('I will present my project.','preSENT')} ${tr('prɪˈzent')}: ${s('I got a present.')} / ${s('I will present my project.')}</p></div>
<div class="box tip"><b>Слова, где русские часто ошибаются</b>
<table class="sym"><tr><th>слово</th><th>ударение</th></tr>
<tr><td>${s('interesting')}</td><td>IN-ter-est-ing (не «интерЕстинг»)</td></tr>
<tr><td>${s('computer')}</td><td>com-PU-ter</td></tr>
<tr><td>${s('banana')}</td><td>ba-NA-na</td></tr>
<tr><td>${s('tomato')}</td><td>to-MA-to</td></tr>
<tr><td>${s('umbrella')}</td><td>um-BREL-la</td></tr>
<tr><td>${s('hotel')}</td><td>ho-TEL</td></tr>
<tr><td>${s('vegetables')}</td><td>VEG-ta-bles</td></tr>
</table></div>
<div class="box err"><b>Как тренироваться</b><p>Хлопай в ладоши на каждый слог: громкий хлопок — на ударный. ${s('ba-NA-na','banana')}: тихо — ГРОМКО — тихо.</p></div>`,
theory2:`
<div class="box ex"><p>Ударение — это <b>«главный слог»</b>, на который ты «нажимаешь» голосом, как на кнопку.</p>
<p>По-русски то же самое: «зА́мок» и «замО́к» — разные слова! В английском так же.</p>
<p>${s('computer')} — ком-ПЬЮ-тер (как по-русски).</p>
<p>${s('photograph')} — ФОУ-тэ-граф (в начале).</p>
<p>${s('photographer')} — фэ-ТО-грэ-фэ (переехало на второй слог).</p></div>`,
items:[
{type:'listen', lvl:1, say:'computer', q:'Послушай. Где ударение?', opts:['COM-pu-ter','com-PU-ter','com-pu-TER'], ans:1,
 why:`${s('computer')} ${tr('kəmˈpjuːtə')} — ударение на второй слог: com-<b>PU</b>-ter. Как по-русски «компьЮтер».`,
 why2:`Тихо — ГРОМКО — тихо: com-PU-ter.`},
{type:'listen', lvl:1, say:'banana', q:'Послушай. Где ударение?', opts:['BA-na-na','ba-NA-na','ba-na-NA'], ans:1,
 why:`${s('banana')} ${tr('bəˈnɑːnə')} — ударение на второй слог: ba-<b>NA</b>-na. Ударный слог — с долгим [ɑː].`,
 why2:`«бэ-НАА-нэ» — середина громче и длиннее.`},
{type:'listen', lvl:1, say:'teacher', q:'Послушай. Где ударение?', opts:['TEA-cher','tea-CHER'], ans:0,
 why:`${s('teacher')} ${tr('ˈtiːtʃə')} — существительное из двух слогов, ударение на первый: <b>TEA</b>-cher.`,
 why2:`Двусложные существительные обычно — на первый слог.`},
{type:'listen', lvl:1, say:'photograph', q:'Послушай. Где ударение?', opts:['PHO-to-graph','pho-TO-graph','pho-to-GRAPH'], ans:0,
 why:`${s('photograph')} ${tr('ˈfəʊtəɡrɑːf')} — ударение на первый слог: <b>PHO</b>-to-graph.`,
 why2:`«ФОУ-тэ-грааф» — нажимай в начале.`},
{type:'read', lvl:1, text:'My computer is on the table.', q:'Прочитай вслух',
 why:`${s('computer')} — com-<b>PU</b>-ter. ${s('table')} ${tr('ˈteɪbl')} — <b>TA</b>-ble, ударение на первый слог.`,
 why2:`«Май кэмПЬЮтэ из он зэ ТЭЙбл».`},
{lvl:1, q:'Где ударение в слове <b>interesting</b>? (Русские часто ошибаются!)', opts:['IN-ter-est-ing','in-ter-EST-ing','in-TER-est-ing'], ans:0, sayAfter:'interesting',
 why:`${s('interesting')} ${tr('ˈɪntrəstɪŋ')} — ударение на <b>первый</b> слог: <b>IN</b>-ter-est-ing. Не «интерЕстинг»!`,
 why2:`Нажми на начало: «ИНтрэстинг».`},
{type:'listen', lvl:2, say:'photographer', q:'Послушай. Где ударение?', opts:['PHO-to-gra-pher','pho-TO-gra-pher','pho-to-GRA-pher'], ans:1,
 why:`${s('photographer')} ${tr('fəˈtɒɡrəfə')} — ударение на второй слог: pho-<b>TO</b>-gra-pher. Сравни: ${s('photograph')} — PHO-to-graph.`,
 why2:`Фотограф — «фэ-ТО-грэ-фэ»: ударение переехало.`},
{type:'listen', lvl:2, say:'tomato', q:'Послушай. Где ударение?', opts:['TO-ma-to','to-MA-to','to-ma-TO'], ans:1,
 why:`${s('tomato')} ${tr('təˈmɑːtəʊ')} — to-<b>MA</b>-to, в британском варианте ударный слог с долгим [ɑː].`,
 why2:`«тэ-МАА-тоу».`},
{lvl:2, text:'In «thirteen» the stress is on {TEEN*|THIR}, and the letters th sound like {[θ]*|[ð]@en.5.ph_th}.',
 why:`1) ${s('thirteen')} ${tr('ˌθɜːˈtiːn')} — ударение на <b>TEEN</b> (а в ${s('thirty')} — на THIR). 2) В числах th — глухой <b>[θ]</b>, как в ${s('three')}.`,
 why2:`-teen всегда ударный: thir-TEEN, fif-TEEN. th в three, thirteen — глухой.`},
{lvl:2, text:'In «umbrella» the stress is on the {second*|first|third} syllable, and we say {an*|a@en.s.a_an} umbrella.',
 why:`1) ${s('umbrella')} ${tr('ʌmˈbrelə')} — um-<b>BREL</b>-la, ударение на <b>второй</b> слог. 2) umbrella начинается с гласного звука → <b>an</b>: ${s('an umbrella')}.`,
 why2:`ам-БРЭ-лэ. Перед гласным звуком — an.`},
{lvl:2, q:'Где ударение в слове present в предложении «I got a nice <b>present</b> for my birthday»?', opts:['PRE-sent','pre-SENT'], ans:0, sayAfter:'I got a nice present for my birthday.',
 why:`Здесь present — <b>существительное</b> (подарок) → ударение на первый слог: <b>PRE</b>-sent ${tr('ˈpreznt')}.`,
 why2:`Подарок — вещь (существительное) → PRE-sent.`},
{type:'spell', lvl:2, say:'banana', ans:['banana'], q:'Послушай и напиши слово',
 why:`${s('banana')}: b-a-n-a-n-a. Безударные a звучат как слабое [ə], но пишутся a.`,
 why2:`ba-na-na — три одинаковых слога на письме.`},
{type:'read', lvl:2, text:'I like bananas and tomatoes.', q:'Прочитай вслух',
 why:`${s('bananas')} — ba-<b>NA</b>-nas, ${s('tomatoes')} — to-<b>MA</b>-toes. Безударные слоги — коротко и слабо.`,
 why2:`«Ай лайк бэНААнэз энд тэМААтоуз».`},
{type:'listen', lvl:3, say:'thirty', q:'Послушай. Какое число прозвучало?', opts:['thirteen','thirty'], ans:1,
 why:`Прозвучало ${s('thirty')} ${tr('ˈθɜːti')} — 30, ударение на <b>первый</b> слог. В ${s('thirteen')} (13) ударение на -TEEN.`,
 why2:`THIR-ty — 30 (ударение в начале), thir-TEEN — 13 (ударение в конце).`},
{type:'listen', lvl:3, say:'fifteen', q:'Послушай. Какое число прозвучало?', opts:['fifteen','fifty'], ans:0,
 why:`Прозвучало ${s('fifteen')} ${tr('ˌfɪfˈtiːn')} — 15, ударение на -<b>TEEN</b> и долгое [iː]. ${s('fifty')} (50) — ударение на FIF.`,
 why2:`fif-TEEN = 15. FIF-ty = 50.`},
{lvl:3, q:'Где ударение в слове present: «Tomorrow I will <b>present</b> my project»?', opts:['PRE-sent','pre-SENT'], ans:1, sayAfter:'Tomorrow I will present my project.',
 why:`Здесь present — <b>глагол</b> (представлять) → ударение на второй слог: pre-<b>SENT</b> ${tr('prɪˈzent')}.`,
 why2:`Глагол (что сделаю?) → pre-SENT.`},
{lvl:3, text:'In «photographer» the stress is on {TO*|PHO|GRA}, and in transcription the stress mark is written {before*|after@en.s.transcription} the stressed syllable.',
 why:`1) ${s('photographer')} ${tr('fəˈtɒɡrəfə')} — pho-<b>TO</b>-gra-pher. 2) Знак ${tr('ˈ')} в транскрипции ставят <b>перед</b> ударным слогом.`,
 why2:`Ударение на TO. Знак ˈ «стоит у двери» ударного слога — перед ним.`},
{lvl:3, text:'In «sixteen» the stress is on {TEEN*|SIX}, and the letters ee sound like {[iː]*|[ɪ]@en.5.ph_i}.',
 why:`1) ${s('sixteen')} ${tr('ˌsɪksˈtiːn')} — six-<b>TEEN</b>. 2) ee — всегда долгий <b>[iː]</b>, как в ${s('sheep')}.`,
 why2:`-teen ударный и долгий: «сикс-ТИИН».`},
{lvl:3, q:'Какое слово <b>не похоже</b> на остальные по ударению?', opts:['teacher','pencil','begin','mother'], ans:2,
 why:`${s('begin')} ${tr('bɪˈɡɪn')} — глагол, ударение на <b>второй</b> слог: be-GIN. ${s('teacher')}, ${s('pencil')}, ${s('mother')} — существительные с ударением на первый.`,
 why2:`Существительные — в начале, многие глаголы — в конце.`},
{type:'spell', lvl:3, say:'photographer', ans:['photographer'], q:'Послушай и напиши слово (фотограф)',
 why:`${s('photographer')}: <b>ph</b>-o-t-o-g-r-a-<b>ph</b>-er. Звук [f] здесь дважды пишется ph.`,
 why2:`photo + graph + er. ph = [f].`},
{type:'read', lvl:3, text:'The photographer took a photograph of a banana.', q:'Прочитай вслух',
 why:`${s('photographer')} — pho-<b>TO</b>-gra-pher, ${s('photograph')} — <b>PHO</b>-to-graph, ${s('banana')} — ba-<b>NA</b>-na. Следи, как ударение «переезжает».`,
 why2:`«фэТОгрэфэ тук э ФОУтэграаф ов э бэНААнэ».`}
]});

/* ===================== Итоговое упражнение 6 класса ===================== */
RU.mix(6, [
{lvl:1, text:'Yesterday we {went*|go|goed@en.6.past_irreg} to the zoo. It {was*|were|is@en.p.was_were} great.',
 why:`1) Вчера → прошедшее от go: <b>went</b>. 2) It → <b>was</b> (прошлое от is).`,
 why2:`go → went. it was, they were.`},
{lvl:1, text:'My sister {is*|are@en.s.to_be} {older*|more old|oldest@en.6.comparatives} than me.',
 why:`1) My sister = she → <b>is</b>. 2) Сравнение двоих с than → <b>older</b>.`,
 why2:`she is. old → older (старше).`},
{lvl:1, text:'I {didn\'t*|don\'t|wasn\'t@en.6.past_neg_q} see {my*|me|mine@en.p.possessive} cousin last weekend.',
 why:`1) ${s('last weekend')} — прошлое → <b>didn't</b> see. 2) «Моего двоюродного брата» — перед существительным <b>my</b>.`,
 why2:`В прошлом «не» = didn't. Перед словом — my, без слова — mine.`},
{lvl:1, text:'Look at the clouds! It {is going to*|will to|going to@en.6.going_to} rain. Take {an*|a@en.s.a_an} umbrella.',
 why:`1) Тучи видны — признак → <b>is going to</b>. 2) umbrella начинается с гласного звука → <b>an</b>.`,
 why2:`Смотри, тучи → going to. an umbrella.`},
{lvl:1, text:'How {many*|much@en.6.much_many} {apples*|apple@en.s.plurals} did you buy?',
 why:`1) Яблоки считаются → <b>How many</b>. 2) После How many — множественное: <b>apples</b>.`,
 why2:`many + множественное: many apples.`},
{lvl:2, text:'{Be*|Are|Is@en.p.imperative} quiet, please! You {mustn\'t*|don\'t have to@en.6.must_have_to} talk during the test.',
 why:`1) Просьба-приказ — повелительное наклонение, просто глагол: <b>Be quiet!</b> 2) «Тише!» — значит разговаривать на контрольной запрещено → <b>mustn't</b>.`,
 why2:`«Тише!» = Be quiet! Нельзя = mustn't.`},
{lvl:2, text:'Every morning Tom {gets*|get|getting@en.5.ps} up at seven, but yesterday he {got*|getted|gets@en.6.past_irreg} up at nine.',
 why:`1) Каждое утро, Tom = he → <b>gets</b>. 2) Вчера → прошедшее от get: <b>got</b>.`,
 why2:`Обычно — gets. Вчера — got.`},
{lvl:2, text:'— It\'s very hot {in*|on|at@en.p.prep_place} here. — {I\'ll open*|I open|I opened@en.6.will} the window.',
 why:`1) Говорим ${s('in here')} — «здесь, в этой комнате». 2) Решение принято прямо сейчас → <b>I'll open</b>.`,
 why2:`in here — внутри. Мгновенное решение — will.`},
{lvl:2, text:'We {stopped*|stoped|stop@en.6.past_reg} at a café, and Dad {bought*|buyed|buys@en.6.past_irreg} some ice cream.',
 why:`1) stop — короткое слово → удваиваем p: <b>stopped</b>. 2) buy — неправильный: <b>bought</b>.`,
 why2:`stop → stopped, buy → bought.`},
{lvl:2, text:'{Are*|Do|Is@en.6.going_to} you going to watch the match {on*|in|at@en.5.prep_time} Saturday?',
 why:`1) Вопрос с going to и you → <b>Are</b> you going to…? 2) Дни недели — <b>on</b>: ${s('on Saturday')}.`,
 why2:`Are you going to…? on + день недели.`},
{lvl:2, text:'There {isn\'t*|aren\'t@en.p.there_is} {much*|many@en.6.much_many} bread left. Can you buy {some*|any@en.5.some_any}?',
 why:`1) bread — неисчисляемое → <b>There isn't</b>. 2) С неисчисляемым → <b>much</b>. 3) Просьба «купи немного» → <b>some</b> (в просьбах и предложениях — some).`,
 why2:`Хлеб не считается: isn't, much. Просьба — some.`},
{lvl:2, text:'Mike {usually walks*|walks usually|usually walk@en.5.adv_freq} to school, but yesterday he {didn\'t walk*|didn\'t walked|not walked@en.6.past_neg_q}.',
 why:`1) usually — перед глаголом, he → -s: <b>usually walks</b>. 2) Вчера не шёл пешком → <b>didn't walk</b>.`,
 why2:`usually + walks. didn't + walk.`},
{lvl:3, text:'Of all my friends, Kate is {the happiest*|the happyest|the most happy@en.6.comparatives}. She {smiles*|smile|smiling@en.5.ps} all the time.',
 why:`1) Из всех друзей — превосходная: happy → <b>the happiest</b>. 2) She → <b>smiles</b>.`,
 why2:`happ<b>y</b> → happ<b>iest</b>. She smiles.`},
{lvl:3, text:'Last night I {studied*|studyed|study@en.6.past_reg} for two hours because tomorrow I {have to*|has to|must to@en.6.must_have_to} write a test.',
 why:`1) study → <b>studied</b> (согласная + y → ied). 2) I → <b>have to</b>; «must to» — ошибка.`,
 why2:`studied. I have to (he has to).`},
{lvl:3, text:'— {Did*|Were|Was@en.6.past_neg_q} you hear that noise? — Yes, I think it {was*|were@en.p.was_were} the cat.',
 why:`1) hear — обычный глагол, вопрос в прошлом → <b>Did</b> you hear…? 2) it → <b>was</b>.`,
 why2:`Did + you + hear. it was.`},
{lvl:3, text:'Right now my brother {is playing*|plays|play@en.5.pc} a computer game. I think {he\'ll finish*|he finish|he finished@en.6.will} soon.',
 why:`1) ${s('Right now')} — прямо сейчас → Present Continuous: <b>is playing</b>. 2) Мнение о будущем с I think → <b>he'll finish</b>.`,
 why2:`Сейчас — is playing. Думаю, что будет — will.`},
{lvl:3, text:'{These*|This|That@en.s.this_that} jeans are {cheaper*|more cheap|cheapest@en.6.comparatives} than those.',
 why:`1) jeans — всегда множественное (are) → <b>These</b>. 2) cheap — короткое, сравнение с than → <b>cheaper</b>.`,
 why2:`jeans — «эти» (these). cheap → cheaper.`},
{lvl:3, text:'My granny {has got*|have got@en.s.have_got} {a lot of*|many|a few@en.6.much_many} free time now.',
 why:`1) My granny = she → <b>has got</b>. 2) time — неисчисляемое → many и a few нельзя → <b>a lot of</b>.`,
 why2:`She has got. Время не считается → a lot of.`},
{lvl:3, text:'In «wanted» the ending sounds like {[ɪd]*|[t]|[d]@en.6.ph_ed}, and in «bad» the vowel is {[æ]*|[e]@en.6.ph_ae}.',
 why:`1) В ${s('wanted')} перед -ed звук [t] → <b>[ɪd]</b>. 2) В ${s('bad')} — широкий <b>[æ]</b> (с [e] получится ${s('bed')}).`,
 why2:`После t и d — [ɪd]. bad — широко, bed — узко.`},
{lvl:3, text:'I can\'t {find*|found|finding@en.s.can} {my*|mine|me@en.p.possessive} keys. Where did I {put*|putted|puts@en.6.past_neg_q} them?',
 why:`1) После can't — начальная форма: <b>find</b>. 2) Перед словом keys — <b>my</b>. 3) После did — начальная форма: <b>put</b> (у put все формы одинаковые; «putted» не бывает).`,
 why2:`can't + find. my keys. did + put.`}
]);
})();
