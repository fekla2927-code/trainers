/* Английский язык: реестр тем от «Старт» до 9 класса.
   Содержание добавляют файлы levels/*.js через RU.rule({...}) (имя RU оставлено общим для движка). */
window.CONF={ls:'en-trainer:v1',lang:'en-GB',title:'Английский язык',subtitle:'От нуля до 9 класса · с озвучкой',
 grades:['S','P',5,6,7,8,9],
 gradeLabels:{S:'Старт (с нуля)',P:'2–4 класс',5:'5 класс',6:'6 класс',7:'7 класс',8:'8 класс',9:'9 класс'},
 homeTitle:'Английский: от нуля до 9 класса',
 homeIntro:'Выбери уровень. В каждом — темы по порядку: сначала объяснение (всё можно послушать 🔊), потом упражнения от простых к сложным: послушай и выбери, напиши, что услышал, прочитай вслух — тренажёр проверит.',
 homeStart:'Если английский даётся трудно — начни со «Старта»: там буквы, звуки и правила чтения. Если основа есть — начни с 8 класса: если ошибёшься в теме прошлых лет, тренажёр сам отправит тебя её повторить и вернёт обратно.'};
(function(){
const RU = window.RU = {reg:{}, order:[], mixes:{}, errors:[]};
const S = (grade, section, list) => list.forEach(([id,title]) => { RU.reg[id] = {id, grade, section, title, items:[]}; RU.order.push(id); });

S('S','Буквы и звуки',[
 ['en.s.alphabet','Английский алфавит: как называются буквы'],
 ['en.s.consonants','Согласные буквы и сочетания: c, g, s, x, y, sh, ch, th, ph, wh, ck, ng'],
 ['en.s.vowels','Гласные в открытом и закрытом слоге. «Немая» e'],
 ['en.s.vowel_teams','Сочетания гласных: ee, ea, oo, ai/ay, oa, ow/ou, oi/oy'],
 ['en.s.r_vowels','Гласные с буквой r: ar, or, er, ir, ur, are, ire, ure'],
 ['en.s.transcription','Знаки транскрипции']]);
S('S','Первые слова и фразы',[
 ['en.s.greetings','Приветствия и знакомство'],
 ['en.s.words_basic','Числа, цвета, дни недели, семья'],
 ['en.s.to_be','Глагол to be: am, is, are'],
 ['en.s.a_an','Артикли a и an'],
 ['en.s.plurals','Множественное число существительных'],
 ['en.s.have_got','have got / has got'],
 ['en.s.this_that','this, that, these, those'],
 ['en.s.can','can / can’t']]);

S('P','Грамматика начальной школы',[
 ['en.p.ps_basic','Present Simple: I like — he likes'],
 ['en.p.pc_basic','Present Continuous: I am reading'],
 ['en.p.there_is','there is / there are'],
 ['en.p.possessive','Притяжательный ’s и my, your, his, her, its, our, their'],
 ['en.p.prep_place','Предлоги места: in, on, under, next to, behind, between'],
 ['en.p.imperative','Повелительное наклонение: Sit down! Don’t run!'],
 ['en.p.was_were','was / were'],
 ['en.p.wh_questions','Вопросительные слова: what, where, when, who, how many']]);

S(5,'Грамматика',[
 ['en.5.ps','Present Simple: утверждение, отрицание, вопрос'],
 ['en.5.pc','Present Continuous'],
 ['en.5.ps_vs_pc','Present Simple или Present Continuous'],
 ['en.5.adv_freq','Наречия частоты: always, usually, often, sometimes, never'],
 ['en.5.articles','Артикли a / an / the / без артикля'],
 ['en.5.some_any','some / any'],
 ['en.5.prep_time','Предлоги времени: in, on, at'],
 ['en.5.pronouns','Личные и объектные местоимения: I — me, he — him']]);
S(5,'Фонетика',[
 ['en.5.ph_th','Звуки /θ/ и /ð/ (think, this)'],
 ['en.5.ph_i','Звуки /ɪ/ и /iː/ (ship — sheep)'],
 ['en.5.ph_s_end','Как читается окончание -s: /s/, /z/, /ɪz/']]);

S(6,'Грамматика',[
 ['en.6.past_reg','Past Simple: правильные глаголы'],
 ['en.6.past_irreg','Past Simple: неправильные глаголы'],
 ['en.6.past_neg_q','Past Simple: отрицание и вопрос с did'],
 ['en.6.will','Future Simple: will'],
 ['en.6.going_to','be going to'],
 ['en.6.comparatives','Степени сравнения прилагательных'],
 ['en.6.much_many','Исчисляемые и неисчисляемые: much, many, a lot of, a few, a little'],
 ['en.6.must_have_to','must, have to, mustn’t, don’t have to']]);
S(6,'Фонетика',[
 ['en.6.ph_ed','Как читается окончание -ed: /t/, /d/, /ɪd/'],
 ['en.6.ph_ae','Звуки /æ/ и /e/ (bad — bed)'],
 ['en.6.ph_stress','Ударение в английских словах']]);

S(7,'Грамматика',[
 ['en.7.past_cont','Past Continuous'],
 ['en.7.past_s_vs_c','Past Simple или Past Continuous (when / while)'],
 ['en.7.pres_perf','Present Perfect'],
 ['en.7.pp_vs_past','Present Perfect или Past Simple'],
 ['en.7.pp_words','Present Perfect: for, since, already, yet, just, ever, never'],
 ['en.7.used_to','used to'],
 ['en.7.relative','Относительные местоимения: who, which, that, whose, where'],
 ['en.7.cond_01','Условные предложения нулевого и первого типа'],
 ['en.7.modals','should, may, might, could']]);
S(7,'Фонетика',[
 ['en.7.ph_wv','Звуки /w/ и /v/ (west — vest)'],
 ['en.7.ph_ng','Звук /ŋ/ (sing, thing)'],
 ['en.7.ph_intonation','Интонация в вопросах']]);

S(8,'Грамматика',[
 ['en.8.ppc','Present Perfect Continuous'],
 ['en.8.past_perf','Past Perfect'],
 ['en.8.passive','Страдательный залог: Present и Past Simple'],
 ['en.8.reported','Косвенная речь: утверждения'],
 ['en.8.cond_2','Условные предложения второго типа'],
 ['en.8.ger_inf','Герундий или инфинитив'],
 ['en.8.word_form','Словообразование: -tion, -ment, -ness, -er, -ful, -less, un-, dis-, im-'],
 ['en.8.articles_geo','Артикли с географическими названиями']]);
S(8,'Фонетика',[
 ['en.8.ph_schwa','Звук /ə/ — самый частый звук английского'],
 ['en.8.ph_weak','Слабые формы: to, for, can, was, and'],
 ['en.8.ph_silent','Непроизносимые буквы: knee, write, listen']]);

S(9,'Грамматика',[
 ['en.9.passive_all','Страдательный залог во всех временах'],
 ['en.9.reported_q','Косвенная речь: вопросы и просьбы'],
 ['en.9.cond_3','Условные предложения третьего типа и смешанные'],
 ['en.9.wish','I wish / If only'],
 ['en.9.causative','have something done'],
 ['en.9.modal_perf','must have, can’t have, should have done'],
 ['en.9.linking','Слова-связки: although, however, despite, unless'],
 ['en.9.word_form','Словообразование в формате ОГЭ'],
 ['en.9.phrasal','Фразовые глаголы: get, look, give, take, put']]);
S(9,'Фонетика и чтение',[
 ['en.9.ph_linking','Связная речь: как слова сливаются'],
 ['en.9.ph_reading','Чтение текста вслух (как в ОГЭ)']]);

RU.rule = function(o){
  const r = RU.reg[o.id];
  if(!r){RU.errors.push('Неизвестная тема: '+o.id);return;}
  Object.assign(r, o, {grade:r.grade, section:r.section, title:o.title||r.title});
  r.items = (o.items||[]).map((it,i)=>RU.prep(it, r.id, r.id+'#'+i));
};
RU.mix = function(grade, items){
  const base=(RU.mixes[grade]||[]).length;
  RU.mixes[grade] = (RU.mixes[grade]||[]).concat(items.map((it,i)=>RU.prep(it, null, 'mix'+grade+'#'+(base+i))));
};
RU.prep = function(it, ruleId, key){
  it = Object.assign({}, it); it.key = key; it.rule = it.rule || ruleId; it.lvl = it.lvl || 1;
  if(!it.type) it.type = it.text ? 'gaps' : 'choice';
  if(it.type==='gaps'){
    it.gaps=[]; const parts=[]; let last=0; const re=/\{([^{}]+)\}/g; let m;
    while((m=re.exec(it.text))){
      parts.push({t:it.text.slice(last,m.index)});
      let body=m[1], rule=it.rule;
      const at=body.lastIndexOf('@'); if(at>=0){rule=body.slice(at+1).trim(); body=body.slice(0,at);}
      const raw=body.split('|'); let ans=-1;
      const opts=raw.map((o,i)=>{if(o.endsWith('*')){if(ans>=0)RU.errors.push(key+': две звёздочки в пропуске');ans=i;o=o.slice(0,-1);}return o;});
      if(ans<0) RU.errors.push(key+': нет правильного варианта (*) в пропуске {'+m[1]+'}');
      if(!rule) RU.errors.push(key+': в итоговом упражнении у каждого пропуска нужно указать тему через @');
      else if(!RU.reg[rule]) RU.errors.push(key+': неизвестная тема '+rule);
      if(new Set(opts).size!==opts.length) RU.errors.push(key+': повтор вариантов в {'+m[1]+'}');
      parts.push({gap:it.gaps.length}); it.gaps.push({opts, ans, rule});
      last=re.lastIndex;
    }
    parts.push({t:it.text.slice(last)}); it.parts=parts;
    if(!it.gaps.length) RU.errors.push(key+': в упражнении нет пропусков');
    if(!it.rule && it.gaps.length) it.rule = it.gaps[0].rule;
  }else if(it.type==='choice'||it.type==='listen'){
    if(!it.opts || it.ans==null || it.ans<0 || it.ans>=it.opts.length) RU.errors.push(key+': ошибка в вариантах ответа');
    if(it.opts && new Set(it.opts).size!==it.opts.length) RU.errors.push(key+': повтор вариантов');
    if(it.type==='listen' && !it.say) RU.errors.push(key+': listen без say');
    if(!RU.reg[it.rule]) RU.errors.push(key+': неизвестная тема '+it.rule);
  }else if(it.type==='spell'){
    if(!it.say || !it.ans) RU.errors.push(key+': spell без say/ans');
  }else if(it.type==='read'){
    if(!it.text) RU.errors.push(key+': read без text');
  }else RU.errors.push(key+': неизвестный тип '+it.type);
  if(!it.why) RU.errors.push(key+': нет объяснения why');
  if(!it.why2) RU.errors.push(key+': нет второго объяснения why2');
  return it;
};
})();
