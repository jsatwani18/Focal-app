// FOCAL v2 — Revolutionary ADHD OS
// Science: Barkley, Mate, Hallowell, Dodson

// ── DATA ────────────────────────────────────────────────────────────────────
var DEFAULT_HABITS = [
  {id:'exercise', label:'Move your body',       emoji:'🏃', anchor:'morning',   tiny:'5 min walk — neurological medicine',    cat:'health'},
  {id:'water',    label:'Water first',           emoji:'💧', anchor:'morning',   tiny:'Before coffee. One full glass.',         cat:'health'},
  {id:'noscreen', label:'No phone 30 min',       emoji:'📵', anchor:'morning',   tiny:'Phone face-down until after breakfast',  cat:'dopamine'},
  {id:'protein',  label:'Protein in breakfast',  emoji:'🥚', anchor:'morning',   tiny:'Eggs, nuts, yogurt — dopamine fuel',    cat:'health'},
  {id:'onething', label:'Name your one thing',   emoji:'🎯', anchor:'morning',   tiny:'The single task that makes today a win', cat:'focus'},
  {id:'deepwork', label:'Deep work block',       emoji:'🧱', anchor:'afternoon', tiny:'25 min. One task. Phone elsewhere.',    cat:'focus'},
  {id:'journal',  label:'Brain dump',            emoji:'📓', anchor:'afternoon', tiny:'3 sentences is enough.',                cat:'mind'},
  {id:'urge',     label:'Pause before dopamine', emoji:'⚡', anchor:'afternoon', tiny:'Notice urge. Wait 60 seconds.',         cat:'dopamine'},
  {id:'reflect',  label:'Three-win reflection',  emoji:'🌙', anchor:'evening',   tiny:'Name 3 things that went okay today.',   cat:'mind'},
  {id:'sleep',    label:'Sleep wind-down',       emoji:'😴', anchor:'evening',   tiny:'No screens 30 min before bed.',         cat:'health'},
];

var EMOTIONS = [
  {id:'hyperfocused', l:'Hyperfocused', e:'🎯', c:'#0071E3', tip:'Rare gift. Protect this state — remove all distractions and ride it fully.'},
  {id:'wired',        l:'Wired',        e:'⚡', c:'#FF9500', tip:'Peak window. Start your hardest task right now before it passes.'},
  {id:'energized',    l:'Energized',    e:'🔥', c:'#34C759', tip:'Ride this wave. Stack deep work here and protect the window.'},
  {id:'happy',        l:'Happy',        e:'😊', c:'#34C759', tip:'Note what produced this. Replicate those conditions. Your happiness is data.'},
  {id:'grateful',     l:'Grateful',     e:'🙏', c:'#32ADE6', tip:'Gratitude activates the prefrontal cortex. Use this state for planning.'},
  {id:'calm',         l:'Calm',         e:'🌊', c:'#32ADE6', tip:'Precious and rare. Use it for planning, connecting, and organizing.'},
  {id:'restless',     l:'Restless',     e:'🌀', c:'#FF9500', tip:'Channel this into physical movement first — then redirect to a task.'},
  {id:'foggy',        l:'Foggy',        e:'🌫', c:'#AEAEB2', tip:'Walk 10 minutes before anything else. Blood to the brain first.'},
  {id:'anxious',      l:'Anxious',      e:'😰', c:'#FFCA28', tip:'Breathe out longer than you breathe in. Name 3 things you can physically touch.'},
  {id:'irritable',    l:'Irritable',    e:'😠', c:'#FF6B35', tip:'Something has built up. Write it down — do not act on it. Move your body first.'},
  {id:'overwhelmed',  l:'Overwhelmed',  e:'😵', c:'#FF3B30', tip:'One thing only. The 2-minute version of that thing. Delete everything else mentally.'},
  {id:'frustrated',   l:'Frustrated',   e:'😤', c:'#FF7043', tip:'Move your body for 5 minutes. Never push through active frustration.'},
  {id:'low',          l:'Low',          e:'😶', c:'#8E8E93', tip:'Light, water, protein, 5 min movement. Do them in that order.'},
  {id:'avoidant',     l:'Avoidant',     e:'🪨', c:'#A2845E', tip:'Say out loud what you are avoiding. Then commit to just 2 minutes of it.'},
  {id:'sad',          l:'Sad',          e:'💙', c:'#5856D6', tip:'Be gentle today. One small act of kindness toward yourself is enough.'},
];

var CAT_C = {health:'#34C759', focus:'#0071E3', dopamine:'#FF9500', mind:'#AF52DE'};

var ANCHORS = {
  morning:   {label:'Morning',   emoji:'🌅', desc:'After waking — after coffee'},
  afternoon: {label:'Afternoon', emoji:'☀️', desc:'After lunch — after sitting down'},
  evening:   {label:'Evening',   emoji:'🌙', desc:'After dinner — before bed'},
};

var URGES = [
  {id:'phone',    l:'Phone / Social media',  e:'📱', need:'Connection or novelty',   r:'Your brain wants connection or novelty. Text one real person something genuine first. Then ask: what was I actually trying to do before this hit?'},
  {id:'food',     l:'Snacking',              e:'🍕', need:'Comfort or emotion',      r:'Drink a full glass of water. Wait 5 minutes. Ask honestly: is this hunger, or am I soothing something? Name the emotion if you can.'},
  {id:'gaming',   l:'Gaming or apps',        e:'🎮', need:'Achievement or escape',   r:'What are you escaping right now? Name it. Set a 5-minute timer and do the thing you are avoiding. Just 5 minutes.'},
  {id:'watching', l:'Watching or streaming', e:'📺', need:'Escape or numbing',       r:'What feels too hard to face? You do not have to fix it — just write its name on paper. Naming the thing makes it smaller.'},
  {id:'shopping', l:'Shopping or browsing',  e:'🛍', need:'Novelty or control',      r:'Add it to a list. Give it 48 hours. The dopamine from buying lasts minutes. The 48-hour rule eliminates most of these.'},
];

var INSIGHTS = [
  {a:'Dr. Russell Barkley', c:'#0071E3', q:'ADHD is not a problem of knowing what to do. It is a problem of doing what you know.', ctx:'This is why information alone never fixes ADHD. The gap is in doing it at the exact moment it is needed. You need external systems at the point of performance.'},
  {a:'Dr. Russell Barkley', c:'#0071E3', q:'Everything is either NOW or NOT NOW. The ADHD brain is time-blind.', ctx:'Future-you does not feel real. The fix: manufacture urgency before the crisis arrives. Timers, visible clocks, commitments that create accountability now.'},
  {a:'Dr. Russell Barkley', c:'#0071E3', q:'Exercise is the single most powerful tool you have for your ADHD brain. Treat it like medication.', ctx:'20 to 30 minutes of cardio elevates dopamine and norepinephrine in a way that mirrors stimulant medication. It is not optional. It is medicine.'},
  {a:'Dr. Russell Barkley', c:'#0071E3', q:'You cannot use your ADHD brain to manage your ADHD brain. You need external scaffolding.', ctx:'Mental notes fail. Intentions evaporate. The solution is radical externalization — nothing important lives in your head. Everything lives in your environment.'},
  {a:'Dr. Gabor Mate', c:'#FF9500', q:'The ADHD brain is not diseased. It is a brain that adapted to protect itself.', ctx:'ADHD often emerges as an adaptation — a mind that learned to scatter attention to avoid being overwhelmed. Understanding this replaces self-blame with curiosity.'},
  {a:'Dr. Gabor Mate', c:'#FF9500', q:'Behind every compulsive behavior is pain. Dopamine-seeking is self-medication, not weakness.', ctx:'When you reach for your phone or screen, ask: what pain am I soothing? What need is unmet? This was a coping strategy. Coping strategies can be updated.'},
  {a:'Dr. Gabor Mate', c:'#FF9500', q:'Shame is the most destructive force for the ADHD brain. Self-compassion is neurological medicine.', ctx:'Shame shuts down the prefrontal cortex — exactly the region ADHD already taxes. Self-compassion is not indulgence. It is physiologically the better strategy.'},
  {a:'Dr. Gabor Mate', c:'#FF9500', q:'You are not too much. You are not broken. Your gifts have not found the right container yet.', ctx:'The intensity, the curiosity, the emotional depth — these are not defects. They are your nature, looking for an environment worthy of them.'},
  {a:'Dr. Ned Hallowell', c:'#34C759', q:'ADHD is a Ferrari engine with bicycle brakes. The power is extraordinary — learn to drive it.', ctx:'The hyperfocus, the creativity, the intensity — this is the engine. The structures you build are the brakes. You do not need a smaller engine. You need better brakes.'},
  {a:'Dr. Ned Hallowell', c:'#34C759', q:'Connection is medicine. Never underestimate the power of being truly understood.', ctx:'Body doubling works. Accountability partners work. Because the human nervous system regulates itself through connection. You were never meant to manage this alone.'},
  {a:'Dr. William Dodson', c:'#AF52DE', q:'Rejection Sensitive Dysphoria affects 99% of people with ADHD. The pain is neurological, not weakness.', ctx:'When rejection hits you like a physical blow — that is RSD. Your nervous system fires in a way most people simply do not experience. Naming it gives you a map.'},
];

var JOURNAL_PROMPTS = [
  'What made today harder than it needed to be? What could change?',
  'What are you avoiding right now? Say it honestly — no judgment.',
  'When did you feel most like yourself today? What were you doing?',
  'What would you tell a close friend with ADHD who had your exact day?',
  'What did your brain do well today, even if it felt small?',
  'What triggered your hardest moment? Can you trace it to a need?',
  'If tomorrow could be 10% better than today, what is that one change?',
  'Where did you feel shame today? Was it deserved — or was it ADHD talking?',
];

var UNDERSTAND = [
  {t:'Why your brain seeks dopamine',     c:'#FF9500', i:'⚡', b:'Mate: ADHD involves dysregulated dopamine signaling. When you doom-scroll, you are self-medicating a neurological deficit. Understanding this replaces shame with agency. You can redirect the need instead of fighting it.'},
  {t:'Why you cannot just start',         c:'#0071E3', i:'🧱', b:'Barkley: Task initiation requires the prefrontal cortex to manufacture interest or urgency. ADHD brains do not do this automatically. You need external triggers at the exact moment of starting.'},
  {t:'Why you forget everything',         c:'#34C759', i:'🌫', b:'Barkley: Working memory in ADHD functions like a whiteboard erased every few minutes. Fix: radical externalization — nothing important should live in your head. Everything should live in your environment.'},
  {t:'Why shame makes it worse',          c:'#AF52DE', i:'💙', b:'Mate: Shame shuts down the prefrontal cortex. Self-criticism does not motivate the ADHD brain. It paralyzes it. Self-compassion is physiologically the better strategy — not indulgence.'},
  {t:'Why exercise is non-negotiable',    c:'#FF3B30', i:'🏃', b:'Barkley and Ratey: 20-30 minutes of aerobic exercise produces neurochemical effects that mirror stimulant medication. It also builds the prefrontal cortex over time. This is evidence-based medicine.'},
  {t:'Why hyperfocus is your superpower', c:'#FF9500', i:'🔥', b:'Hallowell: The ADHD brain can sustain extraordinary, effortless focus when the task is intrinsically compelling. This is your greatest asset. Find what triggers it and build structures around it.'},
];

var WD = ['S','M','T','W','T','F','S'];
var J_IDX = Math.floor(Math.random() * JOURNAL_PROMPTS.length);
var TMODES = {micro:{l:'Micro',m:10}, sprint:{l:'Sprint',m:25}, turbo:{l:'Turbo',m:50}};

// ── STATE ────────────────────────────────────────────────────────────────────
var KEY = 'focal_v6';
var S = {
  profile: {done:false, name:'', peakTime:'unpredictable', mainTrigger:'phone', struggles:[]},
  habits: null,
  habitData: {},
  checkins: {},
  urgeLog: [],
  oneFocus: {},
  journal: {},
  insightIdx: 0,
  totalWins: 0,
  timerMode: 'sprint',
  bodyDouble: false,
};

function loadS(){
  try {
    var d = localStorage.getItem(KEY);
    if(d){
      var p = JSON.parse(d);
      Object.keys(p).forEach(function(k){ S[k] = p[k]; });
    }
  } catch(e){}
}
function saveS(){
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){}
}
loadS();

function getHabits(){ return S.habits || DEFAULT_HABITS; }
var TODAY = new Date().toISOString().slice(0,10);
function td(){ return S.habitData[TODAY] || {}; }
function ci(){ return S.checkins[TODAY] || {}; }
function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function pad(n){ return String(n).padStart(2,'0'); }

function weekDates(){
  var t=new Date(), d=t.getDay(), a=[];
  for(var i=0;i<7;i++){ var x=new Date(t); x.setDate(t.getDate()-d+i); a.push(x.toISOString().slice(0,10)); }
  return a;
}
function lastNDates(n){
  var a=[], d=new Date();
  for(var i=n-1;i>=0;i--){ var x=new Date(d); x.setDate(d.getDate()-i); a.push(x.toISOString().slice(0,10)); }
  return a;
}
function getStreak(id){
  var s=0, d=new Date();
  for(var i=0;i<400;i++){ var k=d.toISOString().slice(0,10); if((S.habitData[k]||{})[id]){ s++; d.setDate(d.getDate()-1); } else break; }
  return s;
}
function doneCount(){ return getHabits().filter(function(h){ return td()[h.id]; }).length; }
function doneTd(id){ return !!(td()[id]); }

function getGreeting(){
  var h=new Date().getHours();
  var name = S.profile.name ? ', '+S.profile.name : '';
  if(h<5)  return 'Still up'+name+'?';
  if(h<12) return 'Good morning'+name+'.';
  if(h<17) return 'Good afternoon'+name+'.';
  if(h<21) return 'Good evening'+name+'.';
  return 'Good night'+name+'.';
}

function getPersonalizedTip(){
  var wd = weekDates();
  var habits = getHabits();
  var name = S.profile.name || 'you';
  var h = new Date().getHours();

  // Check exercise this week
  var exHabit = habits.filter(function(x){ return x.id==='exercise'; })[0];
  if(exHabit){
    var exDays = wd.filter(function(d){ return (S.habitData[d]||{})[exHabit.id]; }).length;
    if(exDays === 0 && h > 8) return {label:'Barkley', text:'You have not moved your body yet this week. Exercise is neurological medicine — even a 5-minute walk today changes your dopamine levels.', c:'#FF3B30'};
  }

  // Today emotion tip
  var em = EMOTIONS.filter(function(e){ return e.id===ci().emotion; })[0];
  if(em) return {label:'Right now', text:em.tip, c:em.c};

  // Peak time tip
  var pt = S.profile.peakTime;
  if(pt==='morning' && h>=6 && h<12) return {label:'Your peak window', text:'You work best in the mornings. Protect this time — start your hardest task before anything else.', c:'#0071E3'};
  if(pt==='morning' && h>=12) return {label:'Energy note', text:'Your peak window has passed for today. Shift to lighter tasks and prepare for a strong morning tomorrow.', c:'#AEAEB2'};
  if(pt==='afternoon' && h>=12 && h<17) return {label:'Your peak window', text:'This is your best time. Stack your hardest work here and eliminate distractions.', c:'#0071E3'};
  if(pt==='evening' && h>=17) return {label:'Your peak window', text:'Your energy peaks in the evening. Use this window deliberately — do not waste it on passive consumption.', c:'#0071E3'};

  // Dopamine trap tip
  var trigger = S.profile.mainTrigger;
  var weekUrges = S.urgeLog.filter(function(u){ return wd.indexOf(u.date) !== -1; });
  var triggerUrges = weekUrges.filter(function(u){ return u.type === trigger; });
  if(triggerUrges.length >= 3) return {label:'Pattern alert', text:'You have reached for '+trigger+' '+triggerUrges.length+' times this week. Mate asks: what need is beneath this pattern?', c:'#FF9500'};

  // Default
  return {label:'Barkley', text:'Make the right behavior the easiest behavior. Design your environment today — do not rely on willpower.', c:'#0071E3'};
}

function generateInsight(){
  var habits = getHabits();
  var wd = weekDates();
  var name = S.profile.name || 'you';
  var parts = [];

  // Best habit
  var rates = habits.map(function(h){ return {h:h, done:wd.filter(function(d){ return (S.habitData[d]||{})[h.id]; }).length}; });
  rates.sort(function(a,b){ return b.done-a.done; });
  if(rates[0].done > 0) parts.push('Your strongest habit this week is "'+rates[0].h.label+'" at '+rates[0].done+'/7 days. That is a real neural pathway forming.');

  // Worst habit
  var worst = rates[rates.length-1];
  if(worst.done===0 && habits.length > 1) parts.push('"'+worst.h.label+'" has not been done this week. Mate asks: what need does avoiding this serve? There is information in the resistance.');

  // Exercise
  var exH = habits.filter(function(h){ return h.id==='exercise'; })[0];
  if(exH){ var exD=wd.filter(function(d){ return (S.habitData[d]||{})[exH.id]; }).length; if(exD<=1) parts.push('You have moved your body on only '+exD+' day(s) this week. Barkley is direct: exercise is the most powerful neurological intervention available to you daily.'); }

  // Emotion pattern
  var emCount = {};
  wd.forEach(function(d){ var e=(S.checkins[d]||{}).emotion; if(e) emCount[e]=(emCount[e]||0)+1; });
  var emEntries = Object.keys(emCount).map(function(k){ return {id:k,count:emCount[k]}; }).sort(function(a,b){ return b.count-a.count; });
  if(emEntries.length>0){
    var topEm = emEntries[0];
    var emObj = EMOTIONS.filter(function(e){ return e.id===topEm.id; })[0];
    if(emObj) parts.push('This week you felt "'+emObj.l+'" most often ('+topEm.count+' days). '+getEmotionInsight(topEm.id));
  }

  // Urge pattern
  var weekUrges = S.urgeLog.filter(function(u){ return wd.indexOf(u.date)!==-1; });
  if(weekUrges.length>0){
    var redirected = weekUrges.filter(function(u){ return u.redirected; }).length;
    var pct = Math.round(redirected/weekUrges.length*100);
    parts.push('You logged '+weekUrges.length+' dopamine urges this week and redirected '+redirected+' of them ('+pct+'%). Every redirected urge is a vote for who you are becoming.');
  }

  if(parts.length===0) return 'Check in daily and log your urges — the more data Focal has, the more it can show you about your own patterns. Self-knowledge is the foundation of ADHD management (Barkley).';
  return parts.join('\n\n');
}

function getEmotionInsight(id){
  var map = {
    low:'Barkley connects consistent low energy to exercise deficit and sleep quality. Check both this week.',
    anxious:'Mate: anxiety often signals an unmet need or suppressed feeling. What have you been avoiding?',
    overwhelmed:'You may be taking on too much or deferring too many decisions. Simplify ruthlessly.',
    foggy:'Foggy states often follow poor sleep or low hydration. Look at the day before — the cause is usually there.',
    frustrated:'Frustration is blocked progress. What is the one obstacle that keeps reappearing?',
    wired:'You have had high-energy states available. Are you using them for your most important work, or letting them drain?',
    energized:'Consistent energy is rare for ADHD brains. What conditions produced it? Replicate them.',
    sad:'Mate: sit with this gently. Sadness often carries important information. Do not rush past it.',
    avoidant:'Avoidance is the brain protecting you from perceived failure. What does success look like for what you are avoiding?',
    happy:'Note what produced this state. Replicate the conditions. Your happiness is data, not luck.',
    grateful:'Gratitude activates the prefrontal cortex — the exact region ADHD taxes. Use this state for planning.',
    irritable:'Something has built up that needs to be expressed or released. Write it before you act on it.',
    restless:'Restless energy is unfocused drive. Channel it into physical movement first, then redirect to a task.',
    hyperfocused:'You have experienced flow this week. What triggered it? That is your most valuable self-knowledge.',
    calm:'Calm is precious. You used it this week — notice what conditions created it.',
  };
  return map[id] || 'Notice what conditions produced this state most often.';
}

// ── NAVIGATION ───────────────────────────────────────────────────────────────
var CUR = 'hq';
function go(s){
  CUR = s;
  document.querySelectorAll('.ni').forEach(function(b){ b.classList.toggle('on', b.id==='n-'+s); });
  render();
  document.getElementById('screen').scrollTop = 0;
}
['hq','focus','regulate','habits','you'].forEach(function(s){
  document.getElementById('n-'+s).onclick = function(){ go(s); };
});

// ── HABIT TOGGLE ─────────────────────────────────────────────────────────────
function toggleHabit(id){
  if(!S.habitData[TODAY]) S.habitData[TODAY] = {};
  var was = !!S.habitData[TODAY][id];
  S.habitData[TODAY][id] = !was;
  if(!was) S.totalWins = (S.totalWins||0)+1;
  saveS();
  var row = document.querySelector('[data-hid="'+id+'"]');
  if(row){
    var done = S.habitData[TODAY][id];
    row.classList.toggle('done', done);
    var chk = row.querySelector('.chk');
    var lp  = row.querySelector('.lp');
    var h   = getHabits().filter(function(x){ return x.id===id; })[0];
    if(chk){ chk.className=done?'chk on':'chk pop'; chk.textContent=done?'\u2713':(h?h.emoji:''); if(!done) setTimeout(function(){ if(chk) chk.classList.remove('pop'); },500); }
    if(lp)  lp.className = done ? 'lp done' : 'lp';
  }
  updateRing();
}
function updateRing(){
  var done=doneCount(), total=getHabits().length, pct=total>0?done/total:0, C=2*Math.PI*22;
  var rf=document.getElementById('rprog'), rl=document.getElementById('rlabel');
  if(rf){ rf.setAttribute('stroke-dashoffset',C*(1-pct)); rf.setAttribute('stroke',pct===1?'#34C759':'#0071E3'); }
  if(rl) rl.textContent=done+'/'+total;
}
function habitRowHtml(h){
  var done=doneTd(h.id), col=CAT_C[h.cat]||'#0071E3', streak=getStreak(h.id);
  var right=streak>1?'<div class="sbadge">&#128293; '+streak+'</div>':'<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:'+col+';">'+h.cat+'</div>';
  return '<div class="crow tap'+(done?' done':'')+'" data-hid="'+h.id+'">'
    +'<div class="chk'+(done?' on':'')+'">'+( done?'\u2713':h.emoji )+'</div>'
    +'<div style="flex:1;min-width:0;"><div class="lp'+(done?' done':'')+'">'+esc(h.label)+'</div><div class="ls">'+esc(h.tiny)+'</div></div>'
    +'<div style="flex-shrink:0;">'+right+'</div>'
    +'</div>';
}
function habitRowEditHtml(h){
  var done=doneTd(h.id), col=CAT_C[h.cat]||'#0071E3', streak=getStreak(h.id);
  return '<div class="crow'+(done?' done':'')+'" data-hid="'+h.id+'" style="cursor:default;">'
    +'<div class="chk'+(done?' on':'')+'tap" data-check="'+h.id+'" style="cursor:pointer;">'+( done?'\u2713':h.emoji )+'</div>'
    +'<div style="flex:1;min-width:0;"><div class="lp'+(done?' done':'')+'">'+esc(h.label)+'</div><div class="ls">'+esc(h.tiny)+'</div></div>'
    +'<div class="edit-wrap">'
    +'<button class="edit-icon" data-edit="'+h.id+'">&#9998;</button>'
    +'<button class="del-icon" data-del="'+h.id+'">&#10005;</button>'
    +'</div></div>';
}

// ── TIMER ────────────────────────────────────────────────────────────────────
var tPhase='idle', tLeft=null, tTotal=0, tInt=null;
function startTimer(){ var m=TMODES[S.timerMode].m; tTotal=m*60; tLeft=tTotal; tPhase='working'; clearInterval(tInt); tInt=setInterval(function(){ tLeft--; if(tLeft<=0){ clearInterval(tInt); tPhase='break'; } drawTimer(); },1000); drawTimer(); }
function pauseTimer(){ clearInterval(tInt); tPhase='paused'; drawTimer(); }
function resumeTimer(){ tPhase='working'; tInt=setInterval(function(){ tLeft--; if(tLeft<=0){ clearInterval(tInt); tPhase='break'; } drawTimer(); },1000); drawTimer(); }
function resetTimer(){ clearInterval(tInt); tLeft=null; tPhase='idle'; drawTimer(); }
function drawTimer(){
  var td2=document.getElementById('tdisplay'), tc=document.getElementById('tctrl'); if(!td2) return;
  var left=tLeft!=null?tLeft:(tTotal||TMODES[S.timerMode].m*60);
  var total=tTotal||TMODES[S.timerMode].m*60;
  var pct=total>0?(total-left)/total:0, C=2*Math.PI*88;
  var stroke=tPhase==='break'?'#34C759':tPhase==='working'?'#0071E3':'#D1D1D6';
  var phase={idle:'Ready',working:'Working',paused:'Paused',break:'Break'}[tPhase];
  td2.innerHTML='<svg width="220" height="220" viewBox="0 0 220 220" style="display:block;overflow:visible;">'
    +'<circle class="tring-bg" cx="110" cy="110" r="88"/>'
    +'<circle class="tring-fill" cx="110" cy="110" r="88" stroke="'+stroke+'" stroke-dasharray="'+C+'" stroke-dashoffset="'+C*(1-pct)+'" style="transform:rotate(-90deg);transform-origin:50% 50%;transition:stroke-dashoffset .9s linear,stroke .4s;"/>'
    +'</svg>'
    +'<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;">'
    +'<div class="ttime">'+pad(Math.floor(left/60))+':'+pad(left%60)+'</div>'
    +'<div class="tphase">'+phase+'</div></div>';
  if(!tc) return;
  if(tPhase==='idle'){
    tc.innerHTML='<button class="btn btn-p" id="t-start">Begin</button>';
    document.getElementById('t-start').onclick=startTimer;
  } else if(tPhase==='working'){
    tc.innerHTML='<div style="display:flex;gap:10px;">'
      +'<button class="btn btn-g btn-sm" id="t-pause">Pause</button>'
      +'<button class="btn btn-g btn-sm" id="t-reset">Reset</button>'
      +'<button class="btn btn-sm" style="width:auto;padding:9px 18px;background:#FFF0EF;color:#FF3B30;border:none;border-radius:14px;font-family:inherit;font-size:14px;font-weight:500;cursor:pointer;" id="t-stuck">Stuck?</button>'
      +'</div>';
    document.getElementById('t-pause').onclick=pauseTimer;
    document.getElementById('t-reset').onclick=resetTimer;
    document.getElementById('t-stuck').onclick=showStuck;
  } else if(tPhase==='paused'){
    tc.innerHTML='<div style="display:flex;gap:10px;">'
      +'<button class="btn btn-p btn-sm" id="t-resume">Resume</button>'
      +'<button class="btn btn-g btn-sm" id="t-reset2">Reset</button></div>';
    document.getElementById('t-resume').onclick=resumeTimer;
    document.getElementById('t-reset2').onclick=resetTimer;
  } else {
    tc.innerHTML='<div style="background:#F0FAF2;border-radius:16px;padding:18px;margin-bottom:14px;">'
      +'<div style="font-size:11px;font-weight:700;letter-spacing:.06em;color:#34C759;text-transform:uppercase;margin-bottom:8px;">Break &#8212; move your body</div>'
      +'<div style="font-size:15px;font-weight:500;color:#3A3A3C;">Step outside for 60 seconds &#127807;</div>'
      +'<div style="font-size:12px;color:#AEAEB2;margin-top:4px;">Movement restores dopamine. Barkley calls this essential.</div></div>'
      +'<button class="btn btn-s" id="t-next">Start Next Session</button>';
    document.getElementById('t-next').onclick=resetTimer;
  }
}

// ── BREATHING ────────────────────────────────────────────────────────────────
var bPhase='idle', bSec=0, bCount=0, bInt=null;
function startBreath(){ bPhase='inhale'; bSec=0; bCount=0; clearInterval(bInt); bInt=setInterval(function(){ bSec++; if(bPhase==='inhale'&&bSec>=4){bPhase='hold';bSec=0;} else if(bPhase==='hold'&&bSec>=4){bPhase='exhale';bSec=0;} else if(bPhase==='exhale'&&bSec>=6){bPhase='inhale';bSec=0;bCount++;} drawBreath(); },1000); drawBreath(); }
function stopBreath(){ clearInterval(bInt); bPhase='idle'; drawBreath(); }
function drawBreath(){
  var el=document.getElementById('bcirc'); if(!el) return;
  var icons={idle:'&#129775;',inhale:'&#11014;&#65039;',hold:'&#9208;&#65039;',exhale:'&#11015;&#65039;'};
  var labels={idle:'Tap to begin',inhale:'Breathe in',hold:'Hold',exhale:'Breathe out'};
  el.className='bcirc'+(bPhase!=='idle'?' '+bPhase:'');
  el.innerHTML='<div style="font-size:42px;line-height:1;">'+icons[bPhase]+'</div>'
    +'<div style="font-size:15px;font-weight:500;color:#3A3A3C;">'+labels[bPhase]+'</div>'
    +(bCount>0?'<div style="font-size:12px;color:#AEAEB2;">Cycle '+bCount+'</div>':'');
}

// ── URGE LOGGING ─────────────────────────────────────────────────────────────
function logUrge(type, redirected){
  var now = new Date();
  S.urgeLog.push({date:TODAY, time:now.toTimeString().slice(0,5), type:type, redirected:!!redirected});
  if(S.urgeLog.length > 500) S.urgeLog = S.urgeLog.slice(-500);
  saveS();
}

// ── MODALS ────────────────────────────────────────────────────────────────────
function openModal(html){
  closeModal();
  var o=document.createElement('div'); o.className='moverlay'; o.id='modal';
  var s=document.createElement('div'); s.className='msheet';
  s.innerHTML='<div class="mhandle"></div>'+html;
  o.appendChild(s);
  o.addEventListener('click',function(e){ if(e.target===o) closeModal(); });
  document.getElementById('app').appendChild(o);
}
function closeModal(){ var m=document.getElementById('modal'); if(m) m.remove(); }
function makeSteps(steps,col){
  return steps.map(function(s,i){
    var bg=col?'rgba(0,0,0,.06)':'#F5F5F7', c=col||'#636366';
    return '<div class="ustep"><div class="unum" style="background:'+bg+';color:'+c+';">'+(i+1)+'</div><div class="utext">'+s+'</div></div>';
  }).join('');
}
function showRSD(){
  openModal('<div class="mtitle">Rejection Sensitive Dysphoria</div>'
    +'<div class="msub">Dr. William Dodson &#8212; affects 99% of people with ADHD</div>'
    +'<div style="background:rgba(175,82,222,.07);border-radius:14px;padding:16px;margin-bottom:18px;font-size:14px;color:#3A3A3C;line-height:1.7;">What you are feeling right now is <strong>neurological</strong>, not weakness. Your nervous system fires in a way most people simply do not experience. Naming it as RSD gives you a map of what is happening, which is the first step to responding instead of reacting.</div>'
    +makeSteps(['Say out loud: This is RSD. This is my nervous system, not reality.','Cold water on your wrists or face. Return to your body.','Ask: will this matter in 24 hours? In a week?','Make no decisions, send no messages for at least one hour.','Your sensitivity is not a flaw. It is the same trait that makes you deeply perceptive.'],'#AF52DE')
    +'<button class="btn btn-g" id="m-rsd-ok" style="margin-top:8px;">I see it. I name it. I am okay.</button>');
  document.getElementById('m-rsd-ok').onclick=closeModal;
}
function showOverwhelm(){
  openModal('<div class="mtitle">Overwhelm Protocol</div>'
    +'<div class="msub">Barkley &#8212; Simplify immediately. Complexity is the enemy.</div>'
    +makeSteps(['Stop. You do not need to solve everything right now.','Take three slow breaths. Breathe out longer than in.','Name one thing &#8212; just one &#8212; that genuinely matters today.','Everything else: write it down. Tell it: not now.','Do that one thing for exactly five minutes. Only five.','Still spiraling? Physically move to a different room.'],'#FF3B30')
    +'<button class="btn btn-d" id="m-owh-ok" style="margin-top:8px;">One thing. Five minutes. Go.</button>');
  document.getElementById('m-owh-ok').onclick=closeModal;
}
function showStuck(){
  openModal('<div class="mtitle">You are stuck.</div>'
    +'<div class="msub">This is normal. Here is what actually works.</div>'
    +makeSteps(['Change your physical position &#8212; stand, floor, different room.','Read only the first sentence of the task out loud.','Tell yourself: I only need to work for two minutes.','Is this the wrong task for your current energy? Consider switching.','Write down exactly what is blocking you. Naming it breaks the loop.'],'#0071E3')
    +'<button class="btn btn-p" id="m-stk-ok" style="margin-top:8px;">Back to work</button>');
  document.getElementById('m-stk-ok').onclick=closeModal;
}
function showUrgeMenu(){
  var html='<div class="mtitle">Before you act on that urge.</div><div class="msub">Identify it. Then meet the real need underneath.</div>';
  URGES.forEach(function(u){
    html+='<button class="urgbtn" data-uid="'+u.id+'"><span style="font-size:26px;">'+u.e+'</span><div><div style="font-size:15px;font-weight:500;color:#1D1D1F;">'+u.l+'</div><div style="font-size:11px;color:#AEAEB2;margin-top:2px;">Need: '+u.need+'</div></div><span style="margin-left:auto;color:#D1D1D6;font-size:16px;">&#8250;</span></button>';
  });
  openModal(html);
  document.querySelectorAll('.urgbtn').forEach(function(b){ b.onclick=function(){ showUrgeDetail(this.dataset.uid); }; });
}
function showUrgeDetail(id){
  var u=URGES.filter(function(x){ return x.id===id; })[0];
  openModal('<div class="mtitle">'+u.e+' '+u.l+'</div>'
    +'<div class="msub">Need underneath: '+u.need+'</div>'
    +'<div class="rbox"><div style="font-size:15px;color:#3A3A3C;line-height:1.75;">'+u.r+'</div></div>'
    +'<button class="btn btn-s" id="m-uid-ok">&#10003; Urge redirected</button>'
    +'<button class="btn btn-g" id="m-uid-back" style="margin-top:10px;">&#8592; Back</button>');
  document.getElementById('m-uid-ok').onclick=function(){ logUrge(id,true); closeModal(); };
  document.getElementById('m-uid-back').onclick=showUrgeMenu;
}

// ── HABIT CRUD ───────────────────────────────────────────────────────────────
var FORM_EDIT_ID = null;
function showAddHabitModal(){
  FORM_EDIT_ID = null;
  openModal(buildHabitForm(null));
  bindHabitForm();
}
function showEditHabitModal(id){
  var h = getHabits().filter(function(x){ return x.id===id; })[0];
  if(!h) return;
  FORM_EDIT_ID = id;
  openModal(buildHabitForm(h));
  bindHabitForm();
}
function buildHabitForm(h){
  var label=h?esc(h.label):'', emoji=h?esc(h.emoji):'', tiny=h?esc(h.tiny):'';
  var anc=h?h.anchor:'morning', cat=h?h.cat:'health';
  var cats = [{k:'health',l:'Health',c:'#34C759'},{k:'focus',l:'Focus',c:'#0071E3'},{k:'dopamine',l:'Dopamine',c:'#FF9500'},{k:'mind',l:'Mind',c:'#AF52DE'}];
  var ancs = ['morning','afternoon','evening'];
  return '<div class="mtitle">'+(h?'Edit Habit':'New Habit')+'</div>'
    +'<div class="form-field"><div class="form-label">Habit name</div><input class="form-input" id="f-label" placeholder="e.g. Drink water first" value="'+label+'"/></div>'
    +'<div style="display:grid;grid-template-columns:1fr 2fr;gap:12px;">'
    +'<div class="form-field"><div class="form-label">Emoji</div><input class="form-input" id="f-emoji" placeholder="&#128692;" value="'+emoji+'" style="text-align:center;font-size:22px;"/></div>'
    +'<div class="form-field"><div class="form-label">Tiny version</div><input class="form-input" id="f-tiny" placeholder="Minimum viable" value="'+tiny+'"/></div>'
    +'</div>'
    +'<div class="form-field"><div class="form-label">When (anchor)</div><div class="anc-grid" id="f-anc">'
    +ancs.map(function(a){ return '<button class="anc-btn'+(anc===a?' on':'')+'" data-anc="'+a+'">'+ANCHORS[a].emoji+' '+ANCHORS[a].label+'</button>'; }).join('')
    +'</div></div>'
    +'<div class="form-field"><div class="form-label">Category</div><div class="cat-grid" id="f-cat">'
    +cats.map(function(c){ return '<button class="cat-btn'+(cat===c.k?' on':'')+'" data-cat="'+c.k+'" style="color:'+c.c+';">'+c.l+'</button>'; }).join('')
    +'</div></div>'
    +'<button class="btn btn-p" id="f-save" style="margin-top:8px;">'+(h?'Save changes':'Add habit')+'</button>'
    +(h?'<button class="btn btn-d" id="f-del" style="margin-top:10px;">Delete this habit</button>':'')
    +'<button class="btn btn-g" id="f-cancel" style="margin-top:10px;">Cancel</button>';
}
function bindHabitForm(){
  var selAnc='morning', selCat='health';
  var ancBtns=document.querySelectorAll('[data-anc]');
  var catBtns=document.querySelectorAll('[data-cat]');
  // init from current values
  ancBtns.forEach(function(b){ if(b.classList.contains('on')) selAnc=b.dataset.anc; });
  catBtns.forEach(function(b){ if(b.classList.contains('on')) selCat=b.dataset.cat; });
  ancBtns.forEach(function(b){
    b.onclick=function(){
      ancBtns.forEach(function(x){ x.classList.remove('on'); });
      this.classList.add('on'); selAnc=this.dataset.anc;
    };
  });
  catBtns.forEach(function(b){
    b.onclick=function(){
      catBtns.forEach(function(x){ x.classList.remove('on'); });
      this.classList.add('on'); selCat=this.dataset.cat;
    };
  });
  var saveBtn=document.getElementById('f-save');
  if(saveBtn) saveBtn.onclick=function(){
    var label=document.getElementById('f-label').value.trim();
    var emoji=document.getElementById('f-emoji').value.trim()||'✦';
    var tiny=document.getElementById('f-tiny').value.trim();
    if(!label) return;
    if(!S.habits) S.habits = JSON.parse(JSON.stringify(DEFAULT_HABITS));
    if(FORM_EDIT_ID){
      var idx=S.habits.findIndex(function(h){ return h.id===FORM_EDIT_ID; });
      if(idx!==-1){ S.habits[idx].label=label; S.habits[idx].emoji=emoji; S.habits[idx].tiny=tiny; S.habits[idx].anchor=selAnc; S.habits[idx].cat=selCat; }
    } else {
      S.habits.push({id:'c_'+Date.now(), label:label, emoji:emoji, anchor:selAnc, tiny:tiny, cat:selCat});
    }
    saveS(); closeModal(); renderHabits();
  };
  var delBtn=document.getElementById('f-del');
  if(delBtn) delBtn.onclick=function(){
    if(!FORM_EDIT_ID) return;
    if(!S.habits) S.habits = JSON.parse(JSON.stringify(DEFAULT_HABITS));
    S.habits = S.habits.filter(function(h){ return h.id!==FORM_EDIT_ID; });
    saveS(); closeModal(); renderHabits();
  };
  var cancelBtn=document.getElementById('f-cancel');
  if(cancelBtn) cancelBtn.onclick=closeModal;
}

// ── ONBOARDING ───────────────────────────────────────────────────────────────
var OB_STEP = 1;
function renderOnboarding(){
  var el = document.getElementById('screen');
  el.style.display = 'none';
  document.getElementById('nav').style.display = 'none';
  var ob = document.createElement('div');
  ob.id = 'onboarding';
  ob.className = 'ob-full';
  document.getElementById('app').appendChild(ob);
  drawObStep();
}
function drawObStep(){
  var ob = document.getElementById('onboarding'); if(!ob) return;
  if(OB_STEP===1){
    ob.innerHTML='<div class="ob-logo">&#129504;</div>'
      +'<div class="ob-title">Welcome to Focal</div>'
      +'<div class="ob-sub">Built specifically for the ADHD brain. Let\'s make it yours.</div>'
      +'<div class="ob-dots"><div class="ob-dot on"></div><div class="ob-dot"></div><div class="ob-dot"></div></div>'
      +'<div style="width:100%;max-width:340px;margin-bottom:8px;text-align:left;font-size:13px;font-weight:600;color:#AEAEB2;letter-spacing:.04em;text-transform:uppercase;">What should I call you?</div>'
      +'<input class="ob-input" id="ob-name" placeholder="Your first name" autocomplete="given-name"/>'
      +'<button class="ob-btn" id="ob-next1">Continue</button>';
    var inp=document.getElementById('ob-name');
    if(S.profile.name) inp.value=S.profile.name;
    inp.focus();
    document.getElementById('ob-next1').onclick=function(){
      var v=document.getElementById('ob-name').value.trim();
      if(!v) return;
      S.profile.name=v; OB_STEP=2; drawObStep();
    };
    inp.onkeydown=function(e){ if(e.key==='Enter') document.getElementById('ob-next1').click(); };
  } else if(OB_STEP===2){
    ob.innerHTML='<div class="ob-logo">&#127775;</div>'
      +'<div class="ob-title">Hi '+esc(S.profile.name)+'</div>'
      +'<div class="ob-sub">When does your brain usually have the most energy?</div>'
      +'<div class="ob-dots"><div class="ob-dot"></div><div class="ob-dot on"></div><div class="ob-dot"></div></div>'
      +'<div class="ob-choices" id="ob-peak">'
      +'<button class="ob-choice'+(S.profile.peakTime==='morning'?' on':'')+'" data-pt="morning">&#127749; Morning</button>'
      +'<button class="ob-choice'+(S.profile.peakTime==='afternoon'?' on':'')+'" data-pt="afternoon">&#9728;&#65039; Afternoon</button>'
      +'<button class="ob-choice'+(S.profile.peakTime==='evening'?' on':'')+'" data-pt="evening">&#127769; Evening</button>'
      +'<button class="ob-choice'+(S.profile.peakTime==='unpredictable'?' on':'')+'" data-pt="unpredictable">&#127774; Unpredictable</button>'
      +'</div>'
      +'<button class="ob-btn" id="ob-next2">Continue</button>'
      +'<button class="ob-back" id="ob-back2">&#8592; Back</button>';
    document.getElementById('ob-peak').addEventListener('click',function(e){
      var b=e.target.closest('[data-pt]'); if(!b) return;
      document.querySelectorAll('[data-pt]').forEach(function(x){ x.classList.remove('on'); });
      b.classList.add('on'); S.profile.peakTime=b.dataset.pt;
    });
    document.getElementById('ob-next2').onclick=function(){ OB_STEP=3; drawObStep(); };
    document.getElementById('ob-back2').onclick=function(){ OB_STEP=1; drawObStep(); };
  } else {
    ob.innerHTML='<div class="ob-logo">&#128170;</div>'
      +'<div class="ob-title">One last thing</div>'
      +'<div class="ob-sub">What\'s your biggest dopamine trap? Focal will track this and find your patterns.</div>'
      +'<div class="ob-dots"><div class="ob-dot"></div><div class="ob-dot"></div><div class="ob-dot on"></div></div>'
      +'<div class="ob-choices" id="ob-trigger">'
      +'<button class="ob-choice'+(S.profile.mainTrigger==='phone'?' on':'')+'" data-trig="phone">&#128241; Phone / Social</button>'
      +'<button class="ob-choice'+(S.profile.mainTrigger==='food'?' on':'')+'" data-trig="food">&#127829; Food / Snacking</button>'
      +'<button class="ob-choice'+(S.profile.mainTrigger==='watching'?' on':'')+'" data-trig="watching">&#128250; Watching / Streaming</button>'
      +'<button class="ob-choice'+(S.profile.mainTrigger==='gaming'?' on':'')+'" data-trig="gaming">&#127918; Gaming / Apps</button>'
      +'</div>'
      +'<button class="ob-btn" id="ob-done">Let\'s go</button>'
      +'<button class="ob-back" id="ob-back3">&#8592; Back</button>';
    document.getElementById('ob-trigger').addEventListener('click',function(e){
      var b=e.target.closest('[data-trig]'); if(!b) return;
      document.querySelectorAll('[data-trig]').forEach(function(x){ x.classList.remove('on'); });
      b.classList.add('on'); S.profile.mainTrigger=b.dataset.trig;
    });
    document.getElementById('ob-done').onclick=function(){
      S.profile.done=true; saveS();
      var o=document.getElementById('onboarding'); if(o) o.remove();
      document.getElementById('screen').style.display='';
      document.getElementById('nav').style.display='';
      render();
    };
    document.getElementById('ob-back3').onclick=function(){ OB_STEP=2; drawObStep(); };
  }
}

// ── HQ SCREEN ────────────────────────────────────────────────────────────────
function renderHQ(){
  var wd=weekDates(), done=doneCount(), total=getHabits().length, pct=total>0?done/total:0, C=2*Math.PI*22;
  var h=new Date().getHours(), dp=Math.min(100,Math.round(((h*60+new Date().getMinutes())/(24*60))*100));
  var fv=S.oneFocus[TODAY]||'';
  var tip=getPersonalizedTip();
  var em=EMOTIONS.filter(function(e){ return e.id===ci().emotion; })[0];
  var weekUrges=S.urgeLog.filter(function(u){ return wd.indexOf(u.date)!==-1; });

  var html='<div class="page">'
    +'<div class="ph">'
    +'<div style="display:flex;justify-content:space-between;align-items:flex-start;">'
    +'<div><div class="ptitle">'+getGreeting()+'</div>'
    +'<div class="psub">'+new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})+'</div>'
    +(em?'<div style="display:flex;align-items:center;gap:6px;margin-top:8px;"><span style="font-size:14px;">'+em.e+'</span><span style="font-size:13px;color:'+em.c+';">Feeling '+em.l.toLowerCase()+'</span></div>':'')
    +(weekUrges.length>0?'<div style="display:flex;align-items:center;gap:6px;margin-top:6px;"><span style="font-size:12px;">&#9889;</span><span style="font-size:12px;color:#AEAEB2;">'+weekUrges.length+' urge'+(weekUrges.length===1?'':'s')+' logged this week</span></div>':'')
    +'</div>'
    +'<div style="position:relative;width:52px;height:52px;flex-shrink:0;margin-top:6px;">'
    +'<svg width="52" height="52" viewBox="0 0 52 52" style="overflow:visible;">'
    +'<circle cx="26" cy="26" r="22" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="3.5"/>'
    +'<circle id="rprog" cx="26" cy="26" r="22" fill="none" stroke="'+(pct===1?'#34C759':'#0071E3')+'" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+C*(1-pct)+'" style="transform:rotate(-90deg);transform-origin:50% 50%;transition:stroke-dashoffset .6s;"/>'
    +'</svg>'
    +'<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">'
    +'<span id="rlabel" style="font-size:11px;font-weight:600;color:'+(pct===1?'#34C759':'#1D1D1F')+';">'+done+'/'+total+'</span>'
    +'</div></div></div>'
    +'<div style="margin-top:20px;"><div class="ptrack"><div class="pfill" style="width:'+dp+'%;background:linear-gradient(90deg,#0071E3,#34C759);"></div></div>'
    +'<div style="display:flex;justify-content:space-between;margin-top:5px;">'
    +'<span style="font-size:10px;color:#D1D1D6;">Midnight</span>'
    +'<span style="font-size:10px;color:#AEAEB2;font-weight:500;">'+new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})+'</span>'
    +'<span style="font-size:10px;color:#D1D1D6;">11 PM</span>'
    +'</div></div></div>'
    // Tip card
    +'<div class="sec"><div class="tip-card"><div class="tip-label">'+tip.label+'</div><div class="tip-text" style="color:var(--ink2);">'+tip.text+'</div></div></div>'
    // One thing
    +'<div class="sec"><div class="slabel">One thing</div>'
    +'<div class="iwrap"><input class="ifield" id="focus-inp" placeholder="What single task makes today a win?" style="font-size:17px;font-weight:500;" value="'+esc(fv)+'"/>'
    +(fv?'<div style="font-size:12px;color:#AEAEB2;margin-top:6px;">Barkley &#8212; one priority. Everything else is noise until this is done.</div>':'')
    +'</div></div>'
    // Week
    +'<div class="sec"><div class="slabel">This week</div><div class="card csolo"><div class="wstrip">'
    +wd.map(function(date){
      var cnt=getHabits().filter(function(h2){ return (S.habitData[date]||{})[h2.id]; }).length;
      var isT=date===TODAY;
      return '<div class="wcol"><div class="wdlbl">'+WD[new Date(date+'T12:00').getDay()]+'</div>'
        +'<div class="wdot'+(isT?' today':(!isT&&cnt>0?' has':''))+'">'+( cnt>0?cnt:'&#183;' )+'</div></div>';
    }).join('')
    +'</div></div></div>'
    // Urge gate
    +'<div class="sec"><button class="crow tap" id="urge-gate" style="width:100%;border-radius:var(--r);background:var(--card);box-shadow:var(--sh);border:none;font-family:inherit;">'
    +'<span style="font-size:26px;">&#9889;</span>'
    +'<div style="text-align:left;flex:1;"><div style="font-size:15px;font-weight:600;color:#1D1D1F;">Feeling an urge?</div>'
    +'<div style="font-size:12px;color:#AEAEB2;margin-top:2px;">Tap here before you act on it.</div></div>'
    +'<span style="color:#D1D1D6;font-size:16px;">&#8250;</span></button></div>'
    // Quick habits
    +'<div class="sec"><div class="slabel">Quick habits</div><div class="card" id="quick-habits">'
    +getHabits().slice(0,4).map(habitRowHtml).join('')
    +'</div><div style="font-size:12px;color:#AEAEB2;text-align:center;margin-top:10px;">+ '+(getHabits().length-4)+' more in the Habits tab</div></div>'
    +'</div>';

  document.getElementById('screen').innerHTML=html;
  document.getElementById('focus-inp').oninput=function(){ S.oneFocus[TODAY]=this.value; saveS(); };
  document.getElementById('urge-gate').onclick=showUrgeMenu;
  document.getElementById('quick-habits').addEventListener('click',function(e){ var r=e.target.closest('[data-hid]'); if(r) toggleHabit(r.dataset.hid); });
}

// ── FOCUS SCREEN ─────────────────────────────────────────────────────────────
function renderFocus(){
  var fv=S.oneFocus[TODAY]||'';
  var modeRows='';
  Object.keys(TMODES).forEach(function(k){
    var m=TMODES[k];
    var desc=k==='micro'?'For low energy days':k==='sprint'?'Classic focused session':'Deep work, flow state';
    var tick=S.timerMode===k
      ?'<div style="width:20px;height:20px;border-radius:50%;background:#0071E3;display:flex;align-items:center;justify-content:center;"><span style="color:#fff;font-size:11px;">&#10003;</span></div>'
      :'<div style="width:20px;height:20px;border-radius:50%;border:1.5px solid #D1D1D6;"></div>';
    modeRows+='<div class="crow tap" data-mode="'+k+'" style="justify-content:space-between;">'
      +'<div><div class="lp">'+m.l+'</div><div class="ls">'+desc+'</div></div>'
      +'<div style="display:flex;align-items:center;gap:10px;"><span style="font-size:14px;color:#AEAEB2;font-weight:500;">'+m.m+' min</span>'+tick+'</div></div>';
  });

  document.getElementById('screen').innerHTML='<div class="page">'
    +'<div class="ph"><div class="ptitle">Focus</div><div class="psub">Barkley &#8212; Make time visible and tangible.</div></div>'
    +'<div class="sec"><div class="iwrap"><input class="ifield" id="task-inp" placeholder="Name the task you are working on" style="font-size:17px;font-weight:500;" value="'+esc(fv)+'"/></div></div>'
    +(tPhase==='idle'?'<div class="sec"><div class="slabel">Duration</div><div class="card" id="mode-rows">'+modeRows+'</div></div>':'')
    +'<div class="sec" style="display:flex;flex-direction:column;align-items:center;">'
    +'<div id="tdisplay" style="position:relative;width:220px;height:220px;"></div>'
    +'<div id="tctrl" style="width:100%;margin-top:20px;max-width:260px;"></div></div>'
    +'<div class="sec"><div class="card"><div class="crow" style="justify-content:space-between;">'
    +'<div><div class="lp">Body Double Mode</div><div class="ls">Working alongside others activates the ADHD brain (Hallowell)</div></div>'
    +'<div class="ttrack'+(S.bodyDouble?' on':'')+'" id="bd-tog"><div class="tknob"></div></div></div>'
    +(S.bodyDouble?'<div style="padding:12px 16px;background:#F0FAF2;font-size:13px;color:#34C759;border-top:.5px solid rgba(0,0,0,.05);">&#128994; Someone is working alongside you. Stay focused.</div>':'')
    +'</div></div>'
    +'<div class="sec"><div class="slabel">Cannot start? Break it down.</div><div class="card">'
    +[1,2,3].map(function(n){ return '<div class="crow"><div style="min-width:26px;height:26px;border-radius:50%;background:#F5F5F7;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#AEAEB2;flex-shrink:0;">'+n+'</div><input class="ifield" placeholder="Step '+n+'..." style="font-size:14px;"/></div>'; }).join('')
    +'</div><div style="font-size:12px;color:#AEAEB2;margin-top:8px;padding-left:2px;font-style:italic;">Barkley &#8212; The ADHD brain cannot initiate a big task. It can always start step one.</div></div>'
    +'</div>';

  document.getElementById('task-inp').oninput=function(){ S.oneFocus[TODAY]=this.value; saveS(); };
  var mr=document.getElementById('mode-rows');
  if(mr) mr.addEventListener('click',function(e){ var r=e.target.closest('[data-mode]'); if(r){ S.timerMode=r.dataset.mode; saveS(); renderFocus(); } });
  var bdt=document.getElementById('bd-tog');
  if(bdt) bdt.onclick=function(){ S.bodyDouble=!S.bodyDouble; saveS(); renderFocus(); };
  drawTimer();
}

// ── REGULATE SCREEN ───────────────────────────────────────────────────────────
var regTab='checkin', openU=-1;
function renderRegulate(){
  document.getElementById('screen').innerHTML='<div class="page">'
    +'<div class="ph"><div class="ptitle">Regulate</div><div class="psub">Mate &#8212; Shame shuts the brain down. Compassion opens it.</div></div>'
    +'<div class="sec"><div class="egrid">'
    +'<button class="ebtn" id="rsd-btn" style="background:#F9F0FF;"><div style="font-size:24px;margin-bottom:8px;">&#128156;</div><div style="font-size:13px;font-weight:700;color:#AF52DE;">RSD Emergency</div><div style="font-size:11px;color:#AEAEB2;margin-top:3px;">Rejection hit hard</div></button>'
    +'<button class="ebtn" id="owh-btn" style="background:#FFF0EF;"><div style="font-size:24px;margin-bottom:8px;">&#127744;</div><div style="font-size:13px;font-weight:700;color:#FF3B30;">Overwhelm SOS</div><div style="font-size:11px;color:#AEAEB2;margin-top:3px;">Brain is spiraling</div></button>'
    +'</div></div>'
    +'<div class="sec"><div class="pillrow" id="reg-pills">'
    +'<button class="pill'+(regTab==='checkin'?' on':'')+'" data-rt="checkin">Check-In</button>'
    +'<button class="pill'+(regTab==='urge'?' on':'')+'" data-rt="urge">Urge Interceptor</button>'
    +'<button class="pill'+(regTab==='breathe'?' on':'')+'" data-rt="breathe">Breathe</button>'
    +'</div></div>'
    +'<div class="sec" id="reg-body"></div></div>';
  document.getElementById('rsd-btn').onclick=showRSD;
  document.getElementById('owh-btn').onclick=showOverwhelm;
  document.getElementById('reg-pills').addEventListener('click',function(e){ var b=e.target.closest('[data-rt]'); if(b){ regTab=b.dataset.rt; drawRegPills(); drawRegBody(); } });
  drawRegBody();
}
function drawRegPills(){ document.querySelectorAll('[data-rt]').forEach(function(b){ b.classList.toggle('on',b.dataset.rt===regTab); }); }
function drawRegBody(){
  var el=document.getElementById('reg-body'); if(!el) return;
  if(regTab==='checkin'){ el.innerHTML=buildCheckin(); bindCheckin(); }
  else if(regTab==='urge'){ el.innerHTML=buildUrgeInline(); document.querySelectorAll('.urgbtn').forEach(function(b){ b.onclick=function(){ showUrgeDetail(this.dataset.uid); }; }); }
  else { el.innerHTML=buildBreathe(); document.getElementById('bcirc').onclick=function(){ bPhase==='idle'?startBreath():stopBreath(); }; drawBreath(); }
}
function buildCheckin(){
  var em=EMOTIONS.filter(function(e){ return e.id===ci().emotion; })[0];
  return '<div class="slabel" style="padding-left:2px;">How are you right now?</div>'
    +'<div class="emgrid" style="margin-bottom:14px;" id="em-grid">'
    +EMOTIONS.map(function(e){ return '<button class="embtn'+(ci().emotion===e.id?' on':'')+'" data-eid="'+e.id+'"><span class="emji">'+e.e+'</span><span class="emlbl">'+e.l+'</span></button>'; }).join('')
    +'</div>'
    +(em?'<div class="card csolo" style="margin-bottom:14px;background:var(--blue-bg);border-left:3px solid var(--blue);">'
    +'<div style="font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:'+em.c+';margin-bottom:6px;">For this state</div>'
    +'<div style="font-size:15px;color:#3A3A3C;line-height:1.6;">'+em.tip+'</div>'
    +(ci().time?'<div style="font-size:10px;color:#AEAEB2;margin-top:8px;">Checked in at '+ci().time+'</div>':'')
    +'</div>':'')
    +'<div class="slabel" style="padding-left:2px;margin-top:20px;margin-bottom:10px;">Mate body scan</div>'
    +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;" id="body-grid">'
    +['Head','Chest','Stomach','Throat','Shoulders','Whole body'].map(function(area){
      var sel=(ci().bodyArea||'')===area;
      return '<button class="anc-btn'+(sel?' on':'')+'" data-area="'+area+'" style="padding:10px 8px;font-size:12px;">'+area+'</button>';
    }).join('')
    +'</div>'
    +(ci().bodyArea?'<div style="font-size:12px;color:#AEAEB2;margin-top:10px;padding-left:2px;font-style:italic;">Mate &#8212; The body always tells the truth. Emotions live there first.</div>':'');
}
function bindCheckin(){
  var eg=document.getElementById('em-grid');
  if(eg) eg.addEventListener('click',function(e){ var b=e.target.closest('[data-eid]'); if(b){ if(!S.checkins[TODAY]) S.checkins[TODAY]={}; S.checkins[TODAY].emotion=b.dataset.eid; S.checkins[TODAY].time=new Date().toTimeString().slice(0,5); saveS(); drawRegBody(); } });
  var bg=document.getElementById('body-grid');
  if(bg) bg.addEventListener('click',function(e){ var b=e.target.closest('[data-area]'); if(b){ if(!S.checkins[TODAY]) S.checkins[TODAY]={}; S.checkins[TODAY].bodyArea=b.dataset.area; saveS(); drawRegBody(); } });
}
function buildUrgeInline(){
  return '<div class="slabel" style="padding-left:2px;margin-bottom:10px;">What are you reaching for?</div>'
    +'<div style="font-size:13px;color:#AEAEB2;margin-bottom:16px;">Mate &#8212; Name the urge. Name the need behind it.</div>'
    +URGES.map(function(u){ return '<button class="urgbtn" data-uid="'+u.id+'"><span style="font-size:26px;">'+u.e+'</span><div><div style="font-size:14px;font-weight:500;color:#1D1D1F;">'+u.l+'</div><div style="font-size:11px;color:#AEAEB2;margin-top:2px;">Need: '+u.need+'</div></div><span style="margin-left:auto;color:#D1D1D6;">&#8250;</span></button>'; }).join('');
}
function buildBreathe(){
  return '<div class="slabel" style="padding-left:2px;margin-bottom:20px;">4 &#183; 4 &#183; 6 Breathing</div>'
    +'<div id="bcirc" class="bcirc"><div style="font-size:42px;line-height:1;">&#129775;</div><div style="font-size:15px;font-weight:500;color:#3A3A3C;">Tap to begin</div></div>'
    +'<div class="card csolo"><div style="font-size:14px;color:#636366;line-height:1.7;text-align:center;">Inhale 4 &#160;&#183;&#160; Hold 4 &#160;&#183;&#160; Exhale 6<br/><span style="font-size:12px;color:#AEAEB2;">The longer exhale activates your parasympathetic system.</span></div></div>';
}

// ── HABITS SCREEN ─────────────────────────────────────────────────────────────
var habTab='today', habAnchor='morning', habEditMode=false;
function renderHabits(){
  var done=doneCount();
  document.getElementById('screen').innerHTML='<div class="page">'
    +'<div class="ph"><div style="display:flex;justify-content:space-between;align-items:flex-end;">'
    +'<div><div class="ptitle">Habits</div><div class="psub">Anchor-based. Never clock-based.</div></div>'
    +'<div style="text-align:right;"><div style="font-size:32px;font-weight:200;letter-spacing:-2px;color:'+(done===getHabits().length?'#34C759':'#1D1D1F')+';">'+done+'<span style="font-size:16px;font-weight:400;color:#AEAEB2;">/'+getHabits().length+'</span></div></div>'
    +'</div></div>'
    +'<div class="sec"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">'
    +'<div class="pillrow" id="hab-pills" style="flex:1;">'
    +'<button class="pill'+(habTab==='today'?' on':'')+'" data-ht="today">Today</button>'
    +'<button class="pill'+(habTab==='week'?' on':'')+'" data-ht="week">This Week</button>'
    +'</div>'
    +'<button id="edit-toggle" style="flex-shrink:0;margin-left:10px;padding:7px 14px;background:'+(habEditMode?'var(--blue-bg)':'var(--card)')+';border:1.5px solid '+(habEditMode?'var(--blue)':'var(--sep)')+';border-radius:var(--rpill);font-family:inherit;font-size:12px;font-weight:600;color:'+(habEditMode?'var(--blue)':'var(--ink3)')+';cursor:pointer;">'+( habEditMode?'Done':'Edit')+'</button>'
    +'</div></div>'
    +'<div class="sec" id="hab-body"></div></div>';
  document.getElementById('hab-pills').addEventListener('click',function(e){ var b=e.target.closest('[data-ht]'); if(b){ habTab=b.dataset.ht; drawHabPills(); drawHabBody(); } });
  document.getElementById('edit-toggle').onclick=function(){ habEditMode=!habEditMode; renderHabits(); };
  drawHabBody();
}
function drawHabPills(){ document.querySelectorAll('[data-ht]').forEach(function(b){ b.classList.toggle('on',b.dataset.ht===habTab); }); }
function drawHabBody(){
  var el=document.getElementById('hab-body'); if(!el) return;
  if(habTab==='week'){ el.innerHTML=buildHabWeek(); return; }
  var ah=getHabits().filter(function(h){ return h.anchor===habAnchor; });
  var doneAll=ah.length>0&&ah.every(function(h){ return td()[h.id]; });
  el.innerHTML='<div class="agrid">'
    +Object.keys(ANCHORS).map(function(k){
      var a=ANCHORS[k];
      var cnt=getHabits().filter(function(h){ return h.anchor===k&&td()[h.id]; }).length;
      var tot=getHabits().filter(function(h){ return h.anchor===k; }).length;
      return '<button class="abtn'+(habAnchor===k?' on':'')+'" data-anc="'+k+'"><div class="aemoji">'+a.emoji+'</div><div class="alabel">'+a.label+'</div><div class="acount">'+cnt+'/'+tot+'</div></button>';
    }).join('')
    +'</div>'
    +'<div style="font-size:12px;color:#AEAEB2;margin-bottom:14px;font-style:italic;">'+ANCHORS[habAnchor].desc+'</div>'
    +'<div class="card" id="hab-rows">'+(ah.length>0 ? (habEditMode ? ah.map(habitRowEditHtml) : ah.map(habitRowHtml)).join('') : '<div class="csolo" style="text-align:center;color:#AEAEB2;font-size:14px;">No '+habAnchor+' habits yet</div>')+'</div>'
    +(doneAll&&!habEditMode?'<div class="card csolo" style="margin-top:12px;background:#F0FAF2;text-align:center;"><div style="font-size:14px;font-weight:600;color:#34C759;">All '+habAnchor+' habits complete.</div><div style="font-size:12px;color:#AEAEB2;margin-top:4px;">Say yes out loud. That dopamine hit is real. (Barkley)</div></div>':'')
    +'<button id="add-habit-btn" style="width:100%;margin-top:12px;padding:14px;background:var(--card);border:1.5px dashed var(--sep);border-radius:var(--r);font-family:inherit;font-size:14px;font-weight:500;color:var(--ink4);cursor:pointer;">+ Add habit</button>'
    +'<div class="qcard" style="margin-top:16px;"><div class="qtext"><strong style="font-weight:600;font-style:normal;color:#636366;">Never miss twice.</strong> One miss is an accident. Two misses is a new habit &#8212; the habit of not doing it.</div></div>';

  el.querySelectorAll('[data-anc]').forEach(function(b){ b.onclick=function(){ habAnchor=this.dataset.anc; drawHabBody(); }; });
  var hr=document.getElementById('hab-rows');
  if(hr){
    hr.addEventListener('click',function(e){
      var check=e.target.closest('[data-check]'); if(check){ toggleHabit(check.dataset.check); drawHabBody(); return; }
      var edit=e.target.closest('[data-edit]'); if(edit){ showEditHabitModal(edit.dataset.edit); return; }
      var del=e.target.closest('[data-del]'); if(del){ deleteHabitConfirm(del.dataset.del); return; }
      if(!habEditMode){ var row=e.target.closest('[data-hid]'); if(row) toggleHabit(row.dataset.hid); }
    });
  }
  var addBtn=document.getElementById('add-habit-btn');
  if(addBtn) addBtn.onclick=showAddHabitModal;
}
function deleteHabitConfirm(id){
  var h=getHabits().filter(function(x){ return x.id===id; })[0];
  if(!h) return;
  openModal('<div class="mtitle">Delete "'+esc(h.label)+'"?</div>'
    +'<div class="msub">This cannot be undone. Your completion history will be preserved.</div>'
    +'<button class="btn btn-d" id="m-del-ok">Delete habit</button>'
    +'<button class="btn btn-g" id="m-del-no" style="margin-top:10px;">Cancel</button>');
  document.getElementById('m-del-ok').onclick=function(){
    if(!S.habits) S.habits=JSON.parse(JSON.stringify(DEFAULT_HABITS));
    S.habits=S.habits.filter(function(x){ return x.id!==id; });
    saveS(); closeModal(); drawHabBody();
  };
  document.getElementById('m-del-no').onclick=closeModal;
}
function buildHabWeek(){
  var wd=weekDates();
  return getHabits().map(function(h){
    var col=CAT_C[h.cat]||'#0071E3', streak=getStreak(h.id);
    var done7=wd.filter(function(d){ return (S.habitData[d]||{})[h.id]; }).length;
    return '<div class="card" style="margin-bottom:10px;">'
      +'<div class="crow"><span style="font-size:22px;">'+h.emoji+'</span><div style="flex:1;"><div class="lp">'+esc(h.label)+'</div><div class="ls">'+h.cat+' &#183; '+h.anchor+'</div></div><div style="font-size:13px;color:#AEAEB2;font-weight:500;">'+done7+'/7</div></div>'
      +'<div style="padding:0 16px 14px;"><div class="wbars">'+wd.map(function(d){ return '<div class="wbar'+((S.habitData[d]||{})[h.id]?' on':'')+'"></div>'; }).join('')+'</div>'
      +(streak>1?'<div style="margin-top:8px;font-size:12px;color:#FF9500;font-weight:500;">&#128293; '+streak+'-day streak</div>':'')+'</div></div>';
  }).join('');
}

// ── YOU SCREEN ────────────────────────────────────────────────────────────────
var youTab='overview', openUnd=-1;
function renderYou(){
  document.getElementById('screen').innerHTML='<div class="page">'
    +'<div class="ph"><div class="ptitle">You</div><div class="psub">Your patterns. Your data. Your brain.</div></div>'
    +'<div class="sec"><div class="winscard"><span style="font-size:36px;">&#127942;</span><div><div class="winsnum">'+(S.totalWins||0)+'</div><div class="winslbl">habit completions<br/>your brain is rewiring</div></div></div></div>'
    +'<div class="sec"><div class="pillrow" id="you-pills">'
    +'<button class="pill'+(youTab==='overview'?' on':'')+'" data-yt="overview">Overview</button>'
    +'<button class="pill'+(youTab==='emotions'?' on':'')+'" data-yt="emotions">Emotions</button>'
    +'<button class="pill'+(youTab==='dopamine'?' on':'')+'" data-yt="dopamine">Dopamine</button>'
    +'<button class="pill'+(youTab==='journal'?' on':'')+'" data-yt="journal">Journal</button>'
    +'<button class="pill'+(youTab==='learn'?' on':'')+'" data-yt="learn">Learn</button>'
    +'</div></div>'
    +'<div class="sec" id="you-body"></div></div>';
  document.getElementById('you-pills').addEventListener('click',function(e){ var b=e.target.closest('[data-yt]'); if(b){ youTab=b.dataset.yt; drawYouPills(); drawYouBody(); } });
  drawYouBody();
}
function drawYouPills(){ document.querySelectorAll('[data-yt]').forEach(function(b){ b.classList.toggle('on',b.dataset.yt===youTab); }); }
function drawYouBody(){
  var el=document.getElementById('you-body'); if(!el) return;
  if(youTab==='overview')  { el.innerHTML=buildOverview(); }
  else if(youTab==='emotions') { el.innerHTML=buildEmotions(); }
  else if(youTab==='dopamine') { el.innerHTML=buildDopamine(); }
  else if(youTab==='journal')  { el.innerHTML=buildJournal(); bindJournal(); }
  else                         { el.innerHTML=buildLearn(); bindLearn(); }
}
function buildOverview(){
  var wd=weekDates();
  var habits=getHabits();
  var done=doneCount(), total=habits.length;
  var weeklyWins=wd.reduce(function(acc,d){ return acc+habits.filter(function(h){ return (S.habitData[d]||{})[h.id]; }).length; },0);
  var maxPossible=total*7;
  var weekPct=maxPossible>0?Math.round(weeklyWins/maxPossible*100):0;
  var insight=generateInsight();
  var rates=habits.map(function(h){ return {h:h, done:wd.filter(function(d){ return (S.habitData[d]||{})[h.id]; }).length}; }).sort(function(a,b){ return b.done-a.done; });

  return '<div class="insight-card" style="margin-bottom:20px;">'
    +'<div class="insight-label">&#128161; Your weekly insight</div>'
    +'<div class="insight-text">'+insight.split('\n\n').join('</div><div style="height:12px;"></div><div class="insight-text">')+'</div>'
    +'</div>'
    +'<div class="card csolo" style="margin-bottom:16px;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">'
    +'<div style="font-size:15px;font-weight:600;">This week</div>'
    +'<div style="font-size:22px;font-weight:200;color:'+(weekPct>=70?'#34C759':weekPct>=40?'#FF9500':'#FF3B30')+';">'+weekPct+'%</div>'
    +'</div>'
    +'<div class="ptrack" style="height:6px;margin-bottom:14px;"><div class="pfill" style="width:'+weekPct+'%;background:'+(weekPct>=70?'#34C759':weekPct>=40?'#FF9500':'#FF3B30')+';"></div></div>'
    +rates.slice(0,5).map(function(r){
      var pct=Math.round(r.done/7*100);
      var col=CAT_C[r.h.cat]||'#0071E3';
      return '<div class="hab-comp-row"><span style="font-size:18px;flex-shrink:0;">'+r.h.emoji+'</span><div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:500;color:#1D1D1F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+esc(r.h.label)+'</div></div><div class="hab-comp-bar" style="width:80px;"><div class="hab-comp-fill" style="width:'+pct+'%;background:'+col+';"></div></div><div style="font-size:11px;color:#AEAEB2;width:28px;text-align:right;">'+r.done+'/7</div></div>';
    }).join('')
    +'</div>'
    +(S.profile.name?'<div class="card csolo" style="background:var(--blue-bg);">'
    +'<div style="font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--blue);margin-bottom:8px;">Your profile</div>'
    +'<div class="stat-row"><div class="stat-label">Name</div><div class="stat-val">'+esc(S.profile.name)+'</div></div>'
    +'<div class="stat-row"><div class="stat-label">Peak energy</div><div class="stat-val">'+S.profile.peakTime+'</div></div>'
    +'<div class="stat-row"><div class="stat-label">Main trigger</div><div class="stat-val">'+S.profile.mainTrigger+'</div></div>'
    +'<button style="margin-top:12px;background:none;border:none;font-family:inherit;font-size:12px;color:var(--blue);cursor:pointer;font-weight:500;padding:0;" id="reset-profile-btn">Edit profile</button>'
    +'</div>':'');
}
function buildEmotions(){
  var last14=lastNDates(14);
  var emCount={};
  last14.forEach(function(d){ var e=(S.checkins[d]||{}).emotion; if(e) emCount[e]=(emCount[e]||0)+1; });
  var emEntries=Object.keys(emCount).map(function(k){ return {id:k,count:emCount[k]}; }).sort(function(a,b){ return b.count-a.count; });
  var checkedDays=last14.filter(function(d){ return (S.checkins[d]||{}).emotion; }).length;

  return '<div class="slabel" style="padding-left:2px;margin-bottom:10px;">Last 14 days</div>'
    +'<div class="emhist-grid" style="margin-bottom:20px;">'
    +last14.map(function(date){
      var em=(S.checkins[date]||{}).emotion;
      var emObj=em?EMOTIONS.filter(function(e){ return e.id===em; })[0]:null;
      var isT=date===TODAY;
      return '<div class="emhist-cell'+(em?'':' empty')+'" style="'+(isT?'border:1.5px solid #0071E3;border-radius:10px;':'')+'" title="'+date+'">'+(emObj?emObj.e:'')+'</div>';
    }).join('')
    +'</div>'
    +(checkedDays===0?'<div style="text-align:center;padding:24px;color:#AEAEB2;font-size:14px;">Start checking in daily to see your emotion patterns here.</div>':
    '<div class="card csolo" style="margin-bottom:14px;">'
    +'<div style="font-size:13px;font-weight:600;color:#1D1D1F;margin-bottom:12px;">Most frequent emotions</div>'
    +emEntries.slice(0,5).map(function(entry){
      var emObj=EMOTIONS.filter(function(e){ return e.id===entry.id; })[0];
      if(!emObj) return '';
      var pct=Math.round(entry.count/checkedDays*100);
      return '<div class="urge-row">'
        +'<span style="font-size:20px;width:28px;flex-shrink:0;">'+emObj.e+'</span>'
        +'<div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:500;color:#1D1D1F;">'+emObj.l+'</div></div>'
        +'<div class="urge-bar-outer" style="width:80px;"><div class="urge-bar-inner" style="width:'+pct+'%;background:'+emObj.c+';"></div></div>'
        +'<div style="font-size:11px;color:#AEAEB2;width:24px;text-align:right;">'+entry.count+'</div>'
        +'</div>';
    }).join('')
    +'</div>'
    +'<div class="card csolo">'
    +'<div style="font-size:13px;font-weight:600;color:#1D1D1F;margin-bottom:12px;">Insight</div>'
    +(emEntries.length>0?'<div style="font-size:14px;color:#3A3A3C;line-height:1.7;">'+getEmotionInsight(emEntries[0].id)+'</div>':'')
    +'</div>');
}
function buildDopamine(){
  var wd=weekDates();
  var weekUrges=S.urgeLog.filter(function(u){ return wd.indexOf(u.date)!==-1; });
  var redirected=weekUrges.filter(function(u){ return u.redirected; }).length;
  var redirectPct=weekUrges.length>0?Math.round(redirected/weekUrges.length*100):0;
  var byType={};
  weekUrges.forEach(function(u){ byType[u.type]=(byType[u.type]||0)+1; });
  var typeEntries=Object.keys(byType).map(function(k){ return {id:k,count:byType[k]}; }).sort(function(a,b){ return b.count-a.count; });

  return '<div class="card csolo" style="margin-bottom:14px;">'
    +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;text-align:center;">'
    +'<div style="padding:8px 0;border-right:.5px solid var(--sep2);"><div style="font-size:28px;font-weight:200;letter-spacing:-1px;">'+weekUrges.length+'</div><div style="font-size:11px;color:#AEAEB2;margin-top:2px;">urges this week</div></div>'
    +'<div style="padding:8px 0;border-right:.5px solid var(--sep2);"><div style="font-size:28px;font-weight:200;letter-spacing:-1px;color:'+( redirectPct>=60?'#34C759':'#FF9500')+';">'+redirectPct+'%</div><div style="font-size:11px;color:#AEAEB2;margin-top:2px;">redirected</div></div>'
    +'<div style="padding:8px 0;"><div style="font-size:28px;font-weight:200;letter-spacing:-1px;">'+S.urgeLog.length+'</div><div style="font-size:11px;color:#AEAEB2;margin-top:2px;">total logged</div></div>'
    +'</div></div>'
    +(weekUrges.length===0?'<div style="text-align:center;padding:24px;color:#AEAEB2;font-size:14px;">Use the Urge Interceptor in Regulate when you feel a pull. Your patterns will appear here.</div>':
    '<div class="card csolo" style="margin-bottom:14px;">'
    +'<div style="font-size:13px;font-weight:600;color:#1D1D1F;margin-bottom:12px;">This week by type</div>'
    +typeEntries.map(function(entry){
      var u=URGES.filter(function(x){ return x.id===entry.id; })[0];
      var pct=weekUrges.length>0?Math.round(entry.count/weekUrges.length*100):0;
      return '<div class="urge-row">'
        +'<span style="font-size:20px;width:28px;flex-shrink:0;">'+(u?u.e:'&#9889;')+'</span>'
        +'<div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:500;color:#1D1D1F;">'+(u?u.l:entry.id)+'</div></div>'
        +'<div class="urge-bar-outer" style="width:80px;"><div class="urge-bar-inner" style="width:'+pct+'%;"></div></div>'
        +'<div style="font-size:11px;color:#AEAEB2;width:24px;text-align:right;">'+entry.count+'</div>'
        +'</div>';
    }).join('')
    +'</div>'
    +'<div class="qcard">'
    +'<div style="font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--orange);margin-bottom:8px;">Mate on this</div>'
    +'<div class="qtext">Behind every compulsive behavior is pain. Dopamine-seeking is self-medication, not weakness. Ask what need each urge is serving &#8212; that is where the real work is.</div>'
    +'</div>');
}
function buildJournal(){
  var saved=(S.journal||{})[TODAY]||'';
  return '<div class="card csolo" style="margin-bottom:14px;background:var(--blue-bg);">'
    +'<div style="font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--blue);margin-bottom:6px;">Today\'s prompt</div>'
    +'<div style="font-size:15px;color:#3A3A3C;line-height:1.6;font-style:italic;">&#8220;'+JOURNAL_PROMPTS[J_IDX]+'&#8221;</div>'
    +'</div>'
    +'<div class="card csolo" style="margin-bottom:12px;"><textarea id="jta" class="tafield" rows="8" placeholder="Write here. No format. No judgment. No rules.">'+esc(saved)+'</textarea></div>'
    +'<button class="btn btn-p" id="save-j">Save</button>'
    +'<div style="font-size:12px;color:#AEAEB2;text-align:center;margin-top:12px;font-style:italic;">Mate &#8212; Writing gives the unconscious a voice.</div>';
}
function bindJournal(){
  var btn=document.getElementById('save-j');
  if(btn) btn.onclick=function(){
    var ta=document.getElementById('jta'); if(!ta) return;
    if(!S.journal) S.journal={};
    S.journal[TODAY]=ta.value; saveS();
    btn.textContent='Saved &#10003;'; btn.style.background='#34C759';
    setTimeout(function(){ btn.textContent='Save'; btn.style.background=''; },2000);
  };
}
function buildLearn(){
  var idx=S.insightIdx%INSIGHTS.length, ins=INSIGHTS[idx];
  return '<div class="icard">'
    +'<div class="iauthor" style="color:'+ins.c+';">'+ins.a+'</div>'
    +'<div class="iquote">&#8220;'+ins.q+'&#8221;</div>'
    +'<div class="idiv"></div>'
    +'<div class="ictx">'+ins.ctx+'</div>'
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-top:20px;">'
    +'<button class="btn btn-g btn-sm" id="ins-prev">&#8592; Previous</button>'
    +'<span style="font-size:12px;color:#AEAEB2;">'+(idx+1)+' of '+INSIGHTS.length+'</span>'
    +'<button class="btn btn-p btn-sm" id="ins-next">Next &#8594;</button>'
    +'</div></div>'
    +'<div style="margin-top:20px;">'
    +UNDERSTAND.map(function(card,i){
      return '<div class="urow">'
        +'<div class="uhead" data-ui="'+i+'"><div style="display:flex;align-items:center;gap:12px;"><span style="font-size:22px;">'+card.i+'</span><div style="font-size:14px;font-weight:600;color:#1D1D1F;">'+card.t+'</div></div><span class="chev'+(openUnd===i?' open':'')+'">&#8250;</span></div>'
        +'<div class="ubody'+(openUnd===i?' open':'')+'">'+card.b+'</div></div>';
    }).join('')
    +'</div>';
}
function bindLearn(){
  var p=document.getElementById('ins-prev'), n=document.getElementById('ins-next');
  if(p) p.onclick=function(){ S.insightIdx=(S.insightIdx-1+INSIGHTS.length)%INSIGHTS.length; saveS(); drawYouBody(); };
  if(n) n.onclick=function(){ S.insightIdx=(S.insightIdx+1)%INSIGHTS.length; saveS(); drawYouBody(); };
  document.querySelectorAll('[data-ui]').forEach(function(el){ el.onclick=function(){ openUnd=openUnd===parseInt(this.dataset.ui)?-1:parseInt(this.dataset.ui); drawYouBody(); }; });
}

// ── RENDER ────────────────────────────────────────────────────────────────────
function render(){
  if(CUR==='hq')       renderHQ();
  else if(CUR==='focus')    renderFocus();
  else if(CUR==='regulate') renderRegulate();
  else if(CUR==='habits')   renderHabits();
  else if(CUR==='you')      renderYou();
  document.getElementById('screen').addEventListener('click',function(e){
    var rp=e.target.closest('#reset-profile-btn');
    if(rp){ S.profile.done=false; saveS(); OB_STEP=1; renderOnboarding(); }
  },{once:true});
}

// ── INIT ──────────────────────────────────────────────────────────────────────
if(!S.profile.done){
  renderOnboarding();
} else {
  render();
}
