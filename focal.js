
// FOCAL v3 — Jony Ive design + AI Brain
// Science: Barkley, Mate, Hallowell, Dodson

// ── DATA ──────────────────────────────────────────────────────────────────────
var DEFAULT_HABITS = [
  {id:'exercise', label:'Move your body',       emoji:'🏃', anchor:'morning',   tiny:'5 min walk — neurological medicine',    cat:'health'},
  {id:'water',    label:'Water first',           emoji:'💧', anchor:'morning',   tiny:'Before coffee. One full glass.',         cat:'health'},
  {id:'noscreen', label:'No phone 30 min',       emoji:'📵', anchor:'morning',   tiny:'Phone face-down until after breakfast',  cat:'dopamine'},
  {id:'onething', label:'Name your one thing',   emoji:'🎯', anchor:'morning',   tiny:'The single task that makes today a win', cat:'focus'},
  {id:'deepwork', label:'Deep work block',       emoji:'🧱', anchor:'afternoon', tiny:'25 min. One task. Phone elsewhere.',    cat:'focus'},
  {id:'journal',  label:'Brain dump',            emoji:'📓', anchor:'afternoon', tiny:'3 sentences is enough.',                cat:'mind'},
  {id:'urge',     label:'Pause before dopamine', emoji:'⚡', anchor:'afternoon', tiny:'Notice urge. Wait 60 seconds.',         cat:'dopamine'},
  {id:'reflect',  label:'3-win reflection',      emoji:'🌙', anchor:'evening',   tiny:'Name 3 things that went okay today.',   cat:'mind'},
  {id:'sleep',    label:'Sleep wind-down',       emoji:'😴', anchor:'evening',   tiny:'No screens 30 min before bed.',         cat:'health'},
];

var EMOTIONS = [
  {id:'hyperfocused', l:'Hyperfocused', e:'🎯', c:'#0071E3', tip:'Rare and powerful. Remove all distractions and ride this state completely.'},
  {id:'energized',    l:'Energized',    e:'🔥', c:'#34C759', tip:'Stack your hardest task here. This window is limited — do not waste it.'},
  {id:'happy',        l:'Happy',        e:'😊', c:'#34C759', tip:'Note what produced this. Your happiness is data — replicate these conditions.'},
  {id:'grateful',     l:'Grateful',     e:'🙏', c:'#32ADE6', tip:'Gratitude activates the prefrontal cortex. Use this state for planning.'},
  {id:'calm',         l:'Calm',         e:'🌊', c:'#32ADE6', tip:'Precious and rare. Use it for organizing, planning, or deep connection.'},
  {id:'wired',        l:'Wired',        e:'⚡', c:'#FF9500', tip:'High activation — start your most important task before it tips into anxiety.'},
  {id:'restless',     l:'Restless',     e:'🌀', c:'#FF9500', tip:'Channel into physical movement first, then redirect to a task.'},
  {id:'foggy',        l:'Foggy',        e:'🌫', c:'#AEAEB2', tip:'Walk 10 minutes before anything else. Blood to the brain first.'},
  {id:'anxious',      l:'Anxious',      e:'😰', c:'#FFCA28', tip:'Breathe out longer than in. Name 3 things you can physically touch right now.'},
  {id:'irritable',    l:'Irritable',    e:'😠', c:'#FF6B35', tip:'Something has built up. Write it before you act on it. Move your body first.'},
  {id:'overwhelmed',  l:'Overwhelmed',  e:'😵', c:'#FF3B30', tip:'One thing only. The 2-minute version of that one thing. Delete everything else.'},
  {id:'low',          l:'Low',          e:'😶', c:'#8E8E93', tip:'Light, water, protein, 5 min movement. In that exact order.'},
  {id:'avoidant',     l:'Avoidant',     e:'🪨', c:'#A2845E', tip:'Say out loud what you are avoiding. Then: exactly 2 minutes of it.'},
  {id:'sad',          l:'Sad',          e:'💙', c:'#5856D6', tip:'Be gentle today. One small kind act toward yourself is genuinely enough.'},
  {id:'frustrated',   l:'Frustrated',   e:'😤', c:'#FF7043', tip:'Move your body 5 min first. Never push through active frustration.'},
];

var URGES = [
  {id:'phone',    l:'Phone / Social media',  e:'📱', need:'Connection or novelty',
   r:'Your brain wants connection or novelty. Text one real person something genuine first. Then ask: what was I actually trying to do before this urge hit?'},
  {id:'food',     l:'Snacking',              e:'🍕', need:'Comfort or emotion',
   r:'Drink a full glass of water. Wait 5 minutes. Ask honestly: is this hunger, or am I soothing something? Name the emotion if you can.'},
  {id:'gaming',   l:'Gaming or apps',        e:'🎮', need:'Achievement or escape',
   r:'What are you escaping right now? Name it out loud. Set a 5-minute timer and do the thing you are avoiding. Just 5 minutes.'},
  {id:'watching', l:'Watching or streaming', e:'📺', need:'Escape or numbing',
   r:'What feels too hard to face? You do not have to fix it. Just write its name on paper. Naming the thing makes it smaller.'},
  {id:'shopping', l:'Shopping or browsing',  e:'🛍', need:'Novelty or control',
   r:'Add it to a list. Give it 48 hours. The dopamine from buying lasts minutes. The 48-hour rule eliminates most of these.'},
];

var ANCHORS = {
  morning:   {label:'Morning',   emoji:'🌅', desc:'After waking — after coffee'},
  afternoon: {label:'Afternoon', emoji:'☀️', desc:'After lunch — after sitting down'},
  evening:   {label:'Evening',   emoji:'🌙', desc:'After dinner — before bed'},
};

var CAT_C = {health:'#34C759', focus:'#0071E3', dopamine:'#FF9500', mind:'#AF52DE'};

var INSIGHTS = [
  {a:'Dr. Russell Barkley', c:'#0071E3', q:'ADHD is not a problem of knowing what to do. It is a problem of doing what you know.', ctx:'This is why information alone never fixes ADHD. The gap is in doing it at the exact moment it is needed. You need external systems at the point of performance.'},
  {a:'Dr. Russell Barkley', c:'#0071E3', q:'Everything is either NOW or NOT NOW. The ADHD brain is time-blind.', ctx:'Future-you does not feel real. The fix: manufacture urgency before the crisis arrives. Timers, visible clocks, commitments that create accountability now.'},
  {a:'Dr. Russell Barkley', c:'#0071E3', q:'Exercise is the single most powerful tool you have for your ADHD brain. Treat it like medication.', ctx:'20-30 minutes of cardio elevates dopamine and norepinephrine in a way that mirrors stimulant medication. It is not optional. It is medicine.'},
  {a:'Dr. Russell Barkley', c:'#0071E3', q:'You cannot use your ADHD brain to manage your ADHD brain. You need external scaffolding.', ctx:'Mental notes fail. Intentions evaporate. The solution: radical externalization. Nothing important lives in your head. Everything lives in your environment.'},
  {a:'Dr. Gabor Mate', c:'#FF9500', q:'The ADHD brain is not diseased. It is a brain that adapted to protect itself.', ctx:'ADHD often emerges as an adaptation. Understanding this replaces self-blame with curiosity. Your brain was doing its best with what it had.'},
  {a:'Dr. Gabor Mate', c:'#FF9500', q:'Behind every compulsive behavior is pain. Dopamine-seeking is self-medication, not weakness.', ctx:'When you reach for your phone, ask: what pain am I soothing? What need is unmet? This was a coping strategy. Coping strategies can be updated.'},
  {a:'Dr. Gabor Mate', c:'#FF9500', q:'Shame is the most destructive force for the ADHD brain. Self-compassion is neurological medicine.', ctx:'Shame shuts down the prefrontal cortex. Self-criticism does not motivate the ADHD brain. It paralyzes it. Self-compassion is physiologically the better strategy.'},
  {a:'Dr. Gabor Mate', c:'#FF9500', q:'You are not too much. You are not broken. Your gifts have not found the right container yet.', ctx:'The intensity, the curiosity, the emotional depth are not defects. They are your nature, looking for an environment worthy of them.'},
  {a:'Dr. Ned Hallowell', c:'#34C759', q:'ADHD is a Ferrari engine with bicycle brakes. The power is extraordinary — learn to drive it.', ctx:'The hyperfocus, creativity, intensity — this is the engine. The structures you build are the brakes. You do not need a smaller engine. You need better brakes.'},
  {a:'Dr. Ned Hallowell', c:'#34C759', q:'Connection is medicine. Never underestimate the power of being truly understood.', ctx:'Body doubling works. Accountability partners work. Because the human nervous system regulates itself through connection. You were never meant to manage this alone.'},
  {a:'Dr. William Dodson', c:'#AF52DE', q:'Rejection Sensitive Dysphoria affects 99% of people with ADHD. The pain is neurological, not weakness.', ctx:'When rejection hits you like a physical blow, that is RSD. Your nervous system fires in a way most people simply do not experience. Naming it gives you a map.'},
];

var JOURNAL_PROMPTS = [
  'What made today harder than it needed to be? What could change?',
  'What are you avoiding right now? Say it honestly.',
  'When did you feel most like yourself today? What were you doing?',
  'What would you tell a close friend with ADHD who had your exact day?',
  'What did your brain do well today, even if it felt small?',
  'What triggered your hardest moment? Can you trace it to a need?',
  'If tomorrow could be 10% better, what is that one change?',
  'Where did you feel shame today? Was it deserved or was it ADHD talking?',
];

var WD = ['S','M','T','W','T','F','S'];
var J_IDX = Math.floor(Math.random() * JOURNAL_PROMPTS.length);
var TMODES = {micro:{l:'Micro',m:10}, sprint:{l:'Sprint',m:25}, turbo:{l:'Turbo',m:50}};
var TODAY = new Date().toISOString().slice(0,10);

// ── STATE ──────────────────────────────────────────────────────────────────────
var KEY = 'focal_v8';
var S = {
  profile: {done:false, name:'', peakTime:'unpredictable', mainTrigger:'phone'},
  habits: null,
  habitData: {}, checkins: {}, urgeLog: [],
  oneFocus: {}, journal: {},
  insightIdx: 0, totalWins: 0,
  timerMode: 'sprint', bodyDouble: false,
  chatHistory: [],
};

function loadS(){
  try {
    var d = localStorage.getItem(KEY);
    if(d){ var p = JSON.parse(d); Object.keys(p).forEach(function(k){ S[k]=p[k]; }); }
  } catch(e){}
}
function saveS(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} }
loadS();

function getHabits(){ return S.habits || DEFAULT_HABITS; }
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
  for(var i=0;i<400;i++){
    var k=d.toISOString().slice(0,10);
    if((S.habitData[k]||{})[id]){ s++; d.setDate(d.getDate()-1); } else break;
  }
  return s;
}
function doneCount(){ return getHabits().filter(function(h){ return td()[h.id]; }).length; }

function getGreeting(){
  var h=new Date().getHours(), name=S.profile.name?', '+S.profile.name:'';
  if(h<5)  return 'Still up'+name+'?';
  if(h<12) return 'Good morning'+name+'.';
  if(h<17) return 'Good afternoon'+name+'.';
  if(h<21) return 'Good evening'+name+'.';
  return 'Good night'+name+'.';
}

function getPersonalizedTip(){
  var wd=weekDates(), h=new Date().getHours(), habits=getHabits();
  var exH=habits.filter(function(x){ return x.id==='exercise'; })[0];
  if(exH){
    var exDays=wd.filter(function(d){ return (S.habitData[d]||{})[exH.id]; }).length;
    if(exDays===0&&h>8) return {l:'Barkley', t:'You have not moved your body yet this week. Exercise is neurological medicine — even a 5-minute walk today rewires your dopamine.', c:'#FF3B30'};
  }
  var em=EMOTIONS.filter(function(e){ return e.id===ci().emotion; })[0];
  if(em) return {l:'Right now', t:em.tip, c:em.c};
  var pt=S.profile.peakTime;
  if(pt==='morning'&&h>=6&&h<12) return {l:'Your peak window', t:'This is your best time. Protect it and start your hardest task before anything else.', c:'#0071E3'};
  if(pt==='afternoon'&&h>=12&&h<17) return {l:'Your peak window', t:'You are in your peak window right now. Stack your deepest work here.', c:'#0071E3'};
  if(pt==='evening'&&h>=17&&h<21) return {l:'Your peak window', t:'Your energy peaks now. Use this window deliberately — not on passive consumption.', c:'#0071E3'};
  var weekUrges=S.urgeLog.filter(function(u){ return wd.indexOf(u.date)!==-1; });
  var tUrges=weekUrges.filter(function(u){ return u.type===S.profile.mainTrigger; }).length;
  if(tUrges>=3) return {l:'Pattern alert', t:'You have reached for '+S.profile.mainTrigger+' '+tUrges+' times this week. Mate asks: what need is beneath this pattern?', c:'#FF9500'};
  return {l:'Barkley', t:'Make the right behavior the easiest behavior. Design your environment — do not rely on willpower.', c:'#0071E3'};
}

function buildWeeklyInsight(){
  var wd=weekDates(), habits=getHabits(), parts=[];
  var rates=habits.map(function(h){ return {h:h, done:wd.filter(function(d){ return (S.habitData[d]||{})[h.id]; }).length}; });
  rates.sort(function(a,b){ return b.done-a.done; });
  if(rates.length>0&&rates[0].done>0) parts.push('Your strongest habit this week is "'+rates[0].h.label+'" at '+rates[0].done+'/7 days. That is a real neural pathway forming.');
  var worst=rates[rates.length-1];
  if(worst&&worst.done===0&&habits.length>1) parts.push('"'+worst.h.label+'" has not been done this week. Mate asks: what need does avoiding this serve? There is information in the resistance.');
  var exH=habits.filter(function(h){ return h.id==='exercise'; })[0];
  if(exH){ var exD=wd.filter(function(d){ return (S.habitData[d]||{})[exH.id]; }).length; if(exD<=1) parts.push('You have moved your body on only '+exD+' day(s) this week. Barkley is direct: exercise is the most powerful neurological intervention available to you daily.'); }
  var emCount={};
  wd.forEach(function(d){ var e=(S.checkins[d]||{}).emotion; if(e) emCount[e]=(emCount[e]||0)+1; });
  var emEntries=Object.keys(emCount).map(function(k){ return {id:k,count:emCount[k]}; }).sort(function(a,b){ return b.count-a.count; });
  if(emEntries.length>0){
    var top=emEntries[0], emObj=EMOTIONS.filter(function(e){ return e.id===top.id; })[0];
    if(emObj) parts.push('You felt "'+emObj.l+'" most often this week ('+top.count+' days). '+getEmInsight(top.id));
  }
  var wUrges=S.urgeLog.filter(function(u){ return wd.indexOf(u.date)!==-1; });
  if(wUrges.length>0){
    var redir=wUrges.filter(function(u){ return u.redirected; }).length;
    parts.push('You logged '+wUrges.length+' dopamine urges this week and redirected '+redir+' of them. Every redirected urge is a vote for who you are becoming.');
  }
  if(parts.length===0) return 'Check in daily and log your urges. The more data Focal has, the more it can show you about your own patterns. Self-knowledge is the foundation of ADHD management (Barkley).';
  return parts.join('\n\n');
}

function getEmInsight(id){
  var map={
    low:'Barkley connects consistent low energy to exercise deficit and sleep quality. Check both.',
    anxious:'Mate: anxiety often signals an unmet need. What have you been avoiding this week?',
    overwhelmed:'You may be deferring too many decisions. Simplify ruthlessly this week.',
    foggy:'Foggy states often follow poor sleep or low hydration. Look at the day before.',
    frustrated:'Frustration is blocked progress. What is the one obstacle that keeps reappearing?',
    wired:'You have had high-energy states. Are you using them for your most important work?',
    energized:'Consistent energy is rare for ADHD brains. What conditions produced it?',
    sad:'Mate: sit with this gently. Sadness carries important information.',
    avoidant:'Avoidance is the brain protecting you from perceived failure. Name what you are avoiding.',
    happy:'Note what produced this state. Replicate the conditions.',
    grateful:'Gratitude activates the prefrontal cortex. Use this state for planning.',
    irritable:'Something has built up. Write it before you act on it.',
    restless:'Restless energy is unfocused drive. Channel it into movement first.',
    hyperfocused:'You have experienced flow this week. What triggered it? That is your most valuable data.',
    calm:'Calm is precious. Notice what conditions created it and replicate them.',
  };
  return map[id] || 'Notice what conditions produced this state and what followed it.';
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────
var CUR = 'hq';
function go(s){
  CUR = s;
  document.querySelectorAll('.ni').forEach(function(b){ b.classList.toggle('on', b.id==='n-'+s); });
  render();
  document.getElementById('screen').scrollTop = 0;
}
['hq','focus','regulate','habits','brain'].forEach(function(s){
  document.getElementById('n-'+s).onclick = function(){ go(s); };
});

// ── HABIT TOGGLE ──────────────────────────────────────────────────────────────
function toggleHabit(id){
  if(!S.habitData[TODAY]) S.habitData[TODAY]={};
  var was=!!S.habitData[TODAY][id];
  S.habitData[TODAY][id]=!was;
  if(!was) S.totalWins=(S.totalWins||0)+1;
  saveS();
  var row=document.querySelector('[data-hid="'+id+'"]');
  if(row){
    var done=S.habitData[TODAY][id];
    row.classList.toggle('done',done);
    var chk=row.querySelector('.chk'), lp=row.querySelector('.lp');
    var h=getHabits().filter(function(x){ return x.id===id; })[0];
    if(chk){ chk.className=done?'chk on':'chk pop'; chk.textContent=done?'\u2713':(h?h.emoji:''); if(!done) setTimeout(function(){ if(chk) chk.classList.remove('pop'); },500); }
    if(lp) lp.className=done?'lp done':'lp';
  }
  updateRing();
}
function updateRing(){
  var done=doneCount(), total=getHabits().length, pct=total>0?done/total:0, C=2*Math.PI*22;
  var rf=document.getElementById('rprog'), rl=document.getElementById('rlabel');
  if(rf){ rf.setAttribute('stroke-dashoffset',C*(1-pct)); rf.setAttribute('stroke',pct===1?'#34C759':'#0071E3'); }
  if(rl) rl.textContent=done+'/'+total;
}
function habitRowHtml(h, editMode){
  var done=!!(td()[h.id]), col=CAT_C[h.cat]||'#0071E3', streak=getStreak(h.id);
  var right=editMode
    ?('<div style="display:flex;gap:8px;flex-shrink:0;">'
      +'<button class="edit-icon-btn" data-edit="'+h.id+'" style="width:30px;height:30px;border-radius:8px;background:#EBF3FD;border:none;cursor:pointer;font-size:13px;">&#9998;</button>'
      +'<button class="del-icon-btn" data-del="'+h.id+'" style="width:30px;height:30px;border-radius:8px;background:#FFF0EF;border:none;cursor:pointer;font-size:13px;">&#10005;</button>'
      +'</div>')
    :(streak>1?'<div class="sbadge">&#128293; '+streak+'</div>':'<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:'+col+';">'+h.cat+'</div>');
  return '<div class="crow'+(editMode?'':' tap')+((done&&!editMode)?' done':'')+'" data-hid="'+h.id+'">'
    +'<div class="chk'+(done?' on':'')+'">'+( done?'\u2713':h.emoji )+'</div>'
    +'<div style="flex:1;min-width:0;"><div class="lp'+(done&&!editMode?' done':'')+'">'+esc(h.label)+'</div><div class="ls">'+esc(h.tiny)+'</div></div>'
    +'<div style="flex-shrink:0;">'+right+'</div>'
    +'</div>';
}

// ── TIMER ─────────────────────────────────────────────────────────────────────
var tPhase='idle', tLeft=null, tTotal=0, tInt=null;
function startTimer(){ var m=TMODES[S.timerMode].m; tTotal=m*60; tLeft=tTotal; tPhase='working'; clearInterval(tInt); tInt=setInterval(function(){ tLeft--; if(tLeft<=0){clearInterval(tInt);tPhase='break';} drawTimer(); },1000); drawTimer(); }
function pauseTimer(){ clearInterval(tInt); tPhase='paused'; drawTimer(); }
function resumeTimer(){ tPhase='working'; tInt=setInterval(function(){ tLeft--; if(tLeft<=0){clearInterval(tInt);tPhase='break';} drawTimer(); },1000); drawTimer(); }
function resetTimer(){ clearInterval(tInt); tLeft=null; tPhase='idle'; drawTimer(); }
function drawTimer(){
  var td2=document.getElementById('tdisplay'), tc=document.getElementById('tctrl'); if(!td2) return;
  var left=tLeft!=null?tLeft:(tTotal||TMODES[S.timerMode].m*60);
  var total=tTotal||TMODES[S.timerMode].m*60, pct=total>0?(total-left)/total:0, C=2*Math.PI*88;
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

// ── BREATHING ─────────────────────────────────────────────────────────────────
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

function makeSteps(steps, col){
  return steps.map(function(s,i){
    var bg=col?'rgba(0,0,0,.06)':'#F5F5F7', c=col||'#636366';
    return '<div class="ustep"><div class="unum" style="background:'+bg+';color:'+c+';">'+(i+1)+'</div><div class="utext">'+s+'</div></div>';
  }).join('');
}

function showRSD(){
  openModal('<div class="mtitle" style="color:#AF52DE;">Rejection Sensitive Dysphoria</div>'
    +'<div class="msub">Dr. William Dodson &#8212; affects 99% of people with ADHD</div>'
    +'<div style="background:rgba(175,82,222,.07);border-radius:14px;padding:16px;margin-bottom:18px;font-size:14px;color:#3A3A3C;line-height:1.7;">What you are feeling is <strong>neurological</strong>, not weakness. Your nervous system fires in a way most people simply do not experience. Naming it as RSD gives you a map &#8212; the first step to responding instead of reacting.</div>'
    +makeSteps(['Say out loud: This is RSD. This is my nervous system, not reality.','Cold water on your wrists or face. Return to your body.','Ask: will this matter in 24 hours? In a week?','Make no decisions, send no messages for at least one hour.','Your sensitivity is not a flaw. It is the same trait that makes you deeply perceptive.'],'#AF52DE')
    +'<button class="btn btn-g" id="m-rsd-ok" style="margin-top:8px;">I see it. I name it. I am okay.</button>');
  document.getElementById('m-rsd-ok').onclick=closeModal;
}

function showOverwhelm(){
  openModal('<div class="mtitle" style="color:#FF3B30;">Overwhelm Protocol</div>'
    +'<div class="msub">Barkley &#8212; Simplify immediately. Complexity is the enemy.</div>'
    +makeSteps(['Stop. You do not need to solve everything right now.','Take three slow breaths. Breathe out longer than in.','Name one thing that genuinely matters today. Just one.','Everything else: write it down. Tell it: not now.','Do that one thing for exactly five minutes. Only five.','Still spiraling? Physically move to a different room.'],'#FF3B30')
    +'<button class="btn btn-d" id="m-owh-ok" style="margin-top:8px;">One thing. Five minutes. Go.</button>');
  document.getElementById('m-owh-ok').onclick=closeModal;
}

function showStuck(){
  openModal('<div class="mtitle">You are stuck.</div>'
    +'<div class="msub">This is normal. Here is what actually works.</div>'
    +makeSteps(['Change your physical position &#8212; stand, floor, different room.','Read only the first sentence of the task out loud.','Tell yourself: I only need to work for two minutes.','Is this the wrong task for your energy? Consider switching.','Write down exactly what is blocking you. Naming it breaks the loop.'],'#0071E3')
    +'<button class="btn btn-p" id="m-stk-ok" style="margin-top:8px;">Back to work</button>');
  document.getElementById('m-stk-ok').onclick=closeModal;
}

function showUrgeMenu(){
  var html='<div class="mtitle">Before you act on that urge.</div><div class="msub">Identify it. Meet the real need underneath.</div>';
  URGES.forEach(function(u){
    html+='<button class="urgbtn" data-uid="'+u.id+'"><span style="font-size:26px;">'+u.e+'</span><div><div style="font-size:15px;font-weight:500;color:#1D1D1F;">'+u.l+'</div><div style="font-size:11px;color:#AEAEB2;margin-top:2px;">Need: '+u.need+'</div></div><span style="margin-left:auto;color:#D1D1D6;font-size:16px;">&#8250;</span></button>';
  });
  openModal(html);
  document.querySelectorAll('.urgbtn').forEach(function(b){ b.onclick=function(){ showUrgeDetail(this.dataset.uid,false); }; });
}

function showUrgeDetail(id, fromRegulate){
  var u=URGES.filter(function(x){ return x.id===id; })[0]; if(!u) return;
  openModal('<div style="font-size:32px;margin-bottom:12px;">'+u.e+'</div>'
    +'<div class="mtitle" style="color:#FF9500;">Before you act on this</div>'
    +'<div class="msub">Need underneath: '+u.need+'</div>'
    +'<div style="background:#F5F5F7;border-radius:16px;padding:16px 18px;margin-bottom:16px;"><div style="font-size:15px;color:#3A3A3C;line-height:1.75;">'+u.r+'</div></div>'
    +'<button class="btn btn-s" id="m-uid-ok">&#10003; Urge redirected</button>'
    +'<button class="btn btn-g" id="m-uid-back" style="margin-top:10px;">&#8592; Back</button>');
  document.getElementById('m-uid-ok').onclick=function(){
    S.urgeLog.push({date:TODAY,time:new Date().toTimeString().slice(0,5),type:id,redirected:true});
    if(S.urgeLog.length>500) S.urgeLog=S.urgeLog.slice(-500);
    saveS(); closeModal();
  };
  document.getElementById('m-uid-back').onclick=fromRegulate?closeModal:showUrgeMenu;
}

// ── HABIT FORM ────────────────────────────────────────────────────────────────
function showHabitForm(editId){
  var h=editId?getHabits().filter(function(x){ return x.id===editId; })[0]:null;
  var label=h?h.label:'', emoji=h?h.emoji:'', tiny=h?h.tiny:'';
  var anc=h?h.anchor:'morning', cat=h?h.cat:'health';
  var cats=[{k:'health',c:'#34C759'},{k:'focus',c:'#0071E3'},{k:'dopamine',c:'#FF9500'},{k:'mind',c:'#AF52DE'}];
  openModal('<div class="mtitle">'+(editId?'Edit Habit':'New Habit')+'</div>'
    +'<div style="margin-bottom:16px;"><div style="font-size:12px;font-weight:600;color:#AEAEB2;letter-spacing:.04em;text-transform:uppercase;margin-bottom:6px;">Habit name</div><input class="form-input" id="f-label" placeholder="e.g. Drink water first" value="'+esc(label)+'"/></div>'
    +'<div style="display:grid;grid-template-columns:80px 1fr;gap:12px;margin-bottom:16px;">'
    +'<div><div style="font-size:12px;font-weight:600;color:#AEAEB2;letter-spacing:.04em;text-transform:uppercase;margin-bottom:6px;">Emoji</div><input class="form-input" id="f-emoji" value="'+esc(emoji)+'" style="text-align:center;font-size:22px;" placeholder="&#10022;"/></div>'
    +'<div><div style="font-size:12px;font-weight:600;color:#AEAEB2;letter-spacing:.04em;text-transform:uppercase;margin-bottom:6px;">Tiny version</div><input class="form-input" id="f-tiny" placeholder="Minimum viable" value="'+esc(tiny)+'"/></div>'
    +'</div>'
    +'<div style="margin-bottom:16px;"><div style="font-size:12px;font-weight:600;color:#AEAEB2;letter-spacing:.04em;text-transform:uppercase;margin-bottom:8px;">When (anchor)</div>'
    +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;" id="f-anc">'
    +Object.keys(ANCHORS).map(function(k){ return '<button class="abtn'+(anc===k?' on':'')+'" data-anc="'+k+'" style="padding:10px 6px;"><div style="font-size:18px;margin-bottom:3px;">'+ANCHORS[k].emoji+'</div><div style="font-size:11px;font-weight:600;color:#3A3A3C;">'+ANCHORS[k].label+'</div></button>'; }).join('')
    +'</div></div>'
    +'<div style="margin-bottom:24px;"><div style="font-size:12px;font-weight:600;color:#AEAEB2;letter-spacing:.04em;text-transform:uppercase;margin-bottom:8px;">Category</div>'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;" id="f-cat">'
    +cats.map(function(c){ return '<button data-cat="'+c.k+'" style="background:'+(cat===c.k?c.c+'15':'#F5F5F7')+';border:1.5px solid '+(cat===c.k?c.c:'transparent')+';border-radius:10px;padding:8px 4px;cursor:pointer;font-family:inherit;font-size:11px;font-weight:500;color:'+(cat===c.k?c.c:'#636366')+';text-transform:capitalize;">'+c.k+'</button>'; }).join('')
    +'</div></div>'
    +'<button class="btn btn-p" id="f-save" style="margin-bottom:10px;">'+(editId?'Save changes':'Add habit')+'</button>'
    +(editId?'<button class="btn btn-d" id="f-del" style="margin-bottom:10px;">Delete habit</button>':'')
    +'<button class="btn btn-g" id="f-cancel">Cancel</button>');

  var selAnc=anc, selCat=cat;
  document.getElementById('f-anc').addEventListener('click',function(e){
    var b=e.target.closest('[data-anc]'); if(!b) return;
    selAnc=b.dataset.anc;
    document.querySelectorAll('[data-anc]').forEach(function(x){ x.classList.toggle('on',x.dataset.anc===selAnc); });
  });
  document.getElementById('f-cat').addEventListener('click',function(e){
    var b=e.target.closest('[data-cat]'); if(!b) return;
    selCat=b.dataset.cat;
    var cc=CAT_C[selCat]||'#636366';
    document.querySelectorAll('[data-cat]').forEach(function(x){
      var xc=CAT_C[x.dataset.cat]||'#636366', isOn=x.dataset.cat===selCat;
      x.style.background=isOn?xc+'15':'#F5F5F7';
      x.style.borderColor=isOn?xc:'transparent';
      x.style.color=isOn?xc:'#636366';
    });
  });
  document.getElementById('f-save').onclick=function(){
    var lv=document.getElementById('f-label').value.trim(); if(!lv) return;
    var ev=document.getElementById('f-emoji').value.trim()||'✦';
    var tv=document.getElementById('f-tiny').value.trim();
    if(!S.habits) S.habits=JSON.parse(JSON.stringify(DEFAULT_HABITS));
    if(editId){
      var idx=S.habits.findIndex(function(h){ return h.id===editId; });
      if(idx!==-1){ S.habits[idx]={id:editId,label:lv,emoji:ev,tiny:tv,anchor:selAnc,cat:selCat}; }
    } else {
      S.habits.push({id:'c_'+Date.now(),label:lv,emoji:ev,tiny:tv,anchor:selAnc,cat:selCat});
    }
    saveS(); closeModal(); renderHabits();
  };
  var delBtn=document.getElementById('f-del');
  if(delBtn) delBtn.onclick=function(){
    if(!confirm('Delete "'+label+'"?')) return;
    if(!S.habits) S.habits=JSON.parse(JSON.stringify(DEFAULT_HABITS));
    S.habits=S.habits.filter(function(h){ return h.id!==editId; });
    saveS(); closeModal(); renderHabits();
  };
  document.getElementById('f-cancel').onclick=closeModal;
}

// ── ONBOARDING ────────────────────────────────────────────────────────────────
var OB_STEP=1;
function renderOnboarding(){
  document.getElementById('screen').style.display='none';
  document.getElementById('nav').style.display='none';
  var ob=document.createElement('div'); ob.id='onboarding'; ob.className='ob-full';
  document.getElementById('app').appendChild(ob);
  drawOb();
}
function drawOb(){
  var ob=document.getElementById('onboarding'); if(!ob) return;
  var dots='<div style="display:flex;gap:6px;margin-bottom:32px;">'
    +[0,1,2].map(function(i){ return '<div style="width:'+(i===OB_STEP-1?20:6)+'px;height:6px;border-radius:3px;background:'+(i===OB_STEP-1?'#0071E3':'#D1D1D6')+';transition:all .3s;"></div>'; }).join('')
    +'</div>';
  if(OB_STEP===1){
    ob.innerHTML='<div style="font-size:56px;margin-bottom:24px;">&#129504;</div>'
      +'<div style="font-size:28px;font-weight:700;letter-spacing:-.5px;text-align:center;margin-bottom:8px;">Welcome to Focal</div>'
      +'<div style="font-size:15px;color:#AEAEB2;text-align:center;line-height:1.6;margin-bottom:32px;max-width:280px;">Built specifically for the ADHD brain. Let\'s make it yours.</div>'
      +dots
      +'<div style="width:100%;max-width:340px;margin-bottom:8px;font-size:13px;font-weight:600;color:#AEAEB2;letter-spacing:.04em;text-transform:uppercase;text-align:left;">What should I call you?</div>'
      +'<input class="ob-input" id="ob-name" placeholder="Your first name" autocomplete="given-name" value="'+esc(S.profile.name)+'"/>'
      +'<button class="btn btn-p" id="ob-n1" style="max-width:340px;">Continue</button>';
    var inp=document.getElementById('ob-name');
    inp.focus();
    document.getElementById('ob-n1').onclick=function(){ var v=inp.value.trim(); if(!v) return; S.profile.name=v; OB_STEP=2; drawOb(); };
    inp.onkeydown=function(e){ if(e.key==='Enter') document.getElementById('ob-n1').click(); };
  } else if(OB_STEP===2){
    ob.innerHTML='<div style="font-size:56px;margin-bottom:24px;">&#9889;</div>'
      +'<div style="font-size:28px;font-weight:700;letter-spacing:-.5px;text-align:center;margin-bottom:8px;">Hi '+esc(S.profile.name)+'</div>'
      +'<div style="font-size:15px;color:#AEAEB2;text-align:center;line-height:1.6;margin-bottom:32px;max-width:280px;">When does your brain usually have the most energy?</div>'
      +dots
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%;max-width:340px;margin-bottom:28px;" id="ob-peak">'
      +[['morning','&#127749;','Morning'],['afternoon','&#9728;&#65039;','Afternoon'],['evening','&#127769;','Evening'],['unpredictable','&#127774;','Unpredictable']].map(function(p){ return '<button class="ob-choice'+(S.profile.peakTime===p[0]?' on':'')+'" data-pt="'+p[0]+'"><div style="font-size:24px;margin-bottom:6px;">'+p[1]+'</div><div style="font-size:13px;font-weight:600;">'+p[2]+'</div></button>'; }).join('')
      +'</div>'
      +'<button class="btn btn-p" id="ob-n2" style="max-width:340px;">Continue</button>'
      +'<button style="background:none;border:none;font-family:inherit;font-size:14px;color:#AEAEB2;cursor:pointer;margin-top:16px;padding:8px;" id="ob-b2">&#8592; Back</button>';
    document.getElementById('ob-peak').addEventListener('click',function(e){
      var b=e.target.closest('[data-pt]'); if(!b) return;
      S.profile.peakTime=b.dataset.pt;
      document.querySelectorAll('[data-pt]').forEach(function(x){ x.classList.toggle('on',x.dataset.pt===S.profile.peakTime); });
    });
    document.getElementById('ob-n2').onclick=function(){ OB_STEP=3; drawOb(); };
    document.getElementById('ob-b2').onclick=function(){ OB_STEP=1; drawOb(); };
  } else {
    ob.innerHTML='<div style="font-size:56px;margin-bottom:24px;">&#127945;</div>'
      +'<div style="font-size:28px;font-weight:700;letter-spacing:-.5px;text-align:center;margin-bottom:8px;">One last thing</div>'
      +'<div style="font-size:15px;color:#AEAEB2;text-align:center;line-height:1.6;margin-bottom:32px;max-width:280px;">What\'s your biggest dopamine trap? Focal will track it and find your patterns.</div>'
      +dots
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%;max-width:340px;margin-bottom:28px;" id="ob-trig">'
      +[['phone','&#128241;','Phone / Social'],['food','&#127829;','Snacking'],['watching','&#128250;','Streaming'],['gaming','&#127918;','Gaming']].map(function(p){ return '<button class="ob-choice'+(S.profile.mainTrigger===p[0]?' on':'')+'" data-trig="'+p[0]+'"><div style="font-size:24px;margin-bottom:6px;">'+p[1]+'</div><div style="font-size:13px;font-weight:600;">'+p[2]+'</div></button>'; }).join('')
      +'</div>'
      +'<button class="btn btn-p" id="ob-done" style="max-width:340px;">Let\'s go &#8594;</button>'
      +'<button style="background:none;border:none;font-family:inherit;font-size:14px;color:#AEAEB2;cursor:pointer;margin-top:16px;padding:8px;" id="ob-b3">&#8592; Back</button>';
    document.getElementById('ob-trig').addEventListener('click',function(e){
      var b=e.target.closest('[data-trig]'); if(!b) return;
      S.profile.mainTrigger=b.dataset.trig;
      document.querySelectorAll('[data-trig]').forEach(function(x){ x.classList.toggle('on',x.dataset.trig===S.profile.mainTrigger); });
    });
    document.getElementById('ob-done').onclick=function(){
      S.profile.done=true; saveS();
      var o=document.getElementById('onboarding'); if(o) o.remove();
      document.getElementById('screen').style.display='';
      document.getElementById('nav').style.display='';
      render();
    };
    document.getElementById('ob-b3').onclick=function(){ OB_STEP=2; drawOb(); };
  }
}

// ── HQ SCREEN ─────────────────────────────────────────────────────────────────
function renderHQ(){
  var wd=weekDates(), done=doneCount(), total=getHabits().length, pct=total>0?done/total:0, C=2*Math.PI*22;
  var h=new Date().getHours(), dp=Math.min(100,Math.round(((h*60+new Date().getMinutes())/(24*60))*100));
  var tip=getPersonalizedTip();
  var em=EMOTIONS.filter(function(e){ return e.id===ci().emotion; })[0];
  var fv=S.oneFocus[TODAY]||'';
  var weekUrges=S.urgeLog.filter(function(u){ return wd.indexOf(u.date)!==-1; });

  document.getElementById('screen').innerHTML='<div class="page">'
    +'<div class="ph">'
    +'<div style="display:flex;justify-content:space-between;align-items:flex-start;">'
    +'<div><div class="ptitle">'+getGreeting()+'</div>'
    +'<div class="psub">'+new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})+'</div>'
    +(em?'<div style="display:flex;align-items:center;gap:6px;margin-top:8px;"><span style="font-size:14px;">'+em.e+'</span><span style="font-size:13px;color:'+em.c+';">Feeling '+em.l.toLowerCase()+'</span></div>':'')
    +(weekUrges.length>0?'<div style="font-size:12px;color:#AEAEB2;margin-top:4px;">&#9889; '+weekUrges.length+' urge'+(weekUrges.length===1?'':'s')+' logged this week</div>':'')
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
    +'<div style="display:flex;justify-content:space-between;margin-top:5px;"><span style="font-size:10px;color:#D1D1D6;">Midnight</span><span style="font-size:10px;color:#AEAEB2;font-weight:500;">'+new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})+'</span><span style="font-size:10px;color:#D1D1D6;">11 PM</span></div></div>'
    +'</div>'
    +'<div class="sec"><div class="tip-card" style="border-left:3px solid '+tip.c+';">'
    +'<div style="font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:'+tip.c+';margin-bottom:6px;">'+tip.l+'</div>'
    +'<div style="font-size:14px;color:#3A3A3C;line-height:1.65;">'+tip.t+'</div></div></div>'
    +'<div class="sec"><div class="slabel">One thing today</div>'
    +'<div class="iwrap"><input class="ifield" id="focus-inp" placeholder="What single task makes today a win?" style="font-size:17px;font-weight:500;" value="'+esc(fv)+'"/>'
    +(fv?'<div style="font-size:12px;color:#AEAEB2;margin-top:6px;">Barkley &#8212; one priority. Everything else is noise until this is done.</div>':'')
    +'</div></div>'
    +'<div class="sec"><div class="slabel">This week</div><div class="card csolo"><div style="display:flex;justify-content:space-between;gap:4px;">'
    +wd.map(function(date){
      var cnt=getHabits().filter(function(h2){ return (S.habitData[date]||{})[h2.id]; }).length;
      var isT=date===TODAY;
      return '<div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;">'
        +'<div style="font-size:10px;font-weight:500;color:'+(isT?'#0071E3':'#D1D1D6')+';">'+WD[new Date(date+'T12:00').getDay()]+'</div>'
        +'<div class="wdot'+(isT?' today':(!isT&&cnt>0?' has':''))+'">'+( cnt>0?cnt:'&#183;' )+'</div></div>';
    }).join('')
    +'</div></div></div>'
    +'<div class="sec"><button class="crow tap" id="urge-gate" style="width:100%;border-radius:var(--r);background:var(--card);box-shadow:var(--sh);border:none;font-family:inherit;">'
    +'<span style="font-size:26px;">&#9889;</span><div style="flex:1;text-align:left;"><div style="font-size:15px;font-weight:600;color:#1D1D1F;">Feeling an urge?</div><div style="font-size:12px;color:#AEAEB2;margin-top:2px;">Tap here before you act on it.</div></div><span style="color:#D1D1D6;font-size:16px;">&#8250;</span>'
    +'</button></div>'
    +'<div class="sec"><div class="slabel">Quick habits</div><div class="card" id="quick-habits">'
    +getHabits().slice(0,4).map(function(h){ return habitRowHtml(h,false); }).join('')
    +'</div><div style="font-size:12px;color:#AEAEB2;text-align:center;margin-top:10px;">+ '+(getHabits().length-4)+' more in the Habits tab</div></div>'
    +'</div>';

  document.getElementById('focus-inp').oninput=function(){ S.oneFocus[TODAY]=this.value; saveS(); };
  document.getElementById('urge-gate').onclick=showUrgeMenu;
  document.getElementById('quick-habits').addEventListener('click',function(e){ var r=e.target.closest('[data-hid]'); if(r) toggleHabit(r.dataset.hid); });
}

// ── FOCUS SCREEN ──────────────────────────────────────────────────────────────
function renderFocus(){
  var fv=S.oneFocus[TODAY]||'';
  var modeRows='';
  Object.keys(TMODES).forEach(function(k){
    var m=TMODES[k], desc=k==='micro'?'For low energy days':k==='sprint'?'Classic focused session':'Deep work, flow state';
    var tick=S.timerMode===k?'<div style="width:20px;height:20px;border-radius:50%;background:#0071E3;display:flex;align-items:center;justify-content:center;"><span style="color:#fff;font-size:11px;">&#10003;</span></div>':'<div style="width:20px;height:20px;border-radius:50%;border:1.5px solid #D1D1D6;"></div>';
    modeRows+='<div class="crow tap" data-mode="'+k+'" style="justify-content:space-between;"><div><div class="lp">'+m.l+'</div><div class="ls">'+desc+'</div></div><div style="display:flex;align-items:center;gap:10px;"><span style="font-size:14px;color:#AEAEB2;font-weight:500;">'+m.m+' min</span>'+tick+'</div></div>';
  });
  document.getElementById('screen').innerHTML='<div class="page">'
    +'<div class="ph"><div class="ptitle">Focus</div><div class="psub">Barkley &#8212; Make time visible and tangible.</div></div>'
    +'<div class="sec"><div class="iwrap"><input class="ifield" id="task-inp" placeholder="Name the task you are working on" style="font-size:17px;font-weight:500;" value="'+esc(fv)+'"/></div></div>'
    +(tPhase==='idle'?'<div class="sec"><div class="slabel">Duration</div><div class="card" id="mode-rows">'+modeRows+'</div></div>':'')
    +'<div class="sec" style="display:flex;flex-direction:column;align-items:center;">'
    +'<div id="tdisplay" style="position:relative;width:220px;height:220px;"></div>'
    +'<div id="tctrl" style="width:100%;margin-top:20px;max-width:260px;"></div></div>'
    +(tPhase==='break'?'<div class="sec"><div style="background:#F0FAF2;border-radius:16px;padding:18px;text-align:center;"><div style="font-size:11px;font-weight:700;letter-spacing:.06em;color:#34C759;text-transform:uppercase;margin-bottom:8px;">Break &#8212; Move your body</div><div style="font-size:15px;font-weight:500;color:#3A3A3C;">Step outside for 60 seconds &#127807;</div><div style="font-size:12px;color:#AEAEB2;margin-top:4px;">Movement restores dopamine. Barkley calls this essential.</div></div></div>':'')
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
var regTab='checkin';
function renderRegulate(){
  document.getElementById('screen').innerHTML='<div class="page">'
    +'<div class="ph"><div class="ptitle">Regulate</div><div class="psub">Mate &#8212; Shame shuts the brain down. Compassion opens it.</div></div>'
    +'<div class="sec"><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">'
    +'<button class="ebtn" id="rsd-btn" style="background:#F9F0FF;border-radius:var(--r);padding:16px 14px;cursor:pointer;text-align:left;border:none;font-family:inherit;box-shadow:var(--sh);"><div style="font-size:24px;margin-bottom:8px;">&#128156;</div><div style="font-size:13px;font-weight:700;color:#AF52DE;">RSD Emergency</div><div style="font-size:11px;color:#AEAEB2;margin-top:3px;">Rejection hit hard</div></button>'
    +'<button class="ebtn" id="owh-btn" style="background:#FFF0EF;border-radius:var(--r);padding:16px 14px;cursor:pointer;text-align:left;border:none;font-family:inherit;box-shadow:var(--sh);"><div style="font-size:24px;margin-bottom:8px;">&#127744;</div><div style="font-size:13px;font-weight:700;color:#FF3B30;">Overwhelm SOS</div><div style="font-size:11px;color:#AEAEB2;margin-top:3px;">Brain is spiraling</div></button>'
    +'</div></div>'
    +'<div class="sec"><div class="pillrow" id="reg-pills">'
    +'<button class="pill'+(regTab==='checkin'?' on':'')+'" data-rt="checkin">Check-In</button>'
    +'<button class="pill'+(regTab==='urge'?' on':'')+'" data-rt="urge">Urge Interceptor</button>'
    +'<button class="pill'+(regTab==='breathe'?' on':'')+'" data-rt="breathe">Breathe</button>'
    +'</div></div>'
    +'<div class="sec" id="reg-body"></div></div>';
  document.getElementById('rsd-btn').onclick=showRSD;
  document.getElementById('owh-btn').onclick=showOverwhelm;
  document.getElementById('reg-pills').addEventListener('click',function(e){ var b=e.target.closest('[data-rt]'); if(b){ regTab=b.dataset.rt; document.querySelectorAll('[data-rt]').forEach(function(x){ x.classList.toggle('on',x.dataset.rt===regTab); }); drawRegBody(); } });
  drawRegBody();
}
function drawRegBody(){
  var el=document.getElementById('reg-body'); if(!el) return;
  if(regTab==='checkin') { el.innerHTML=buildCheckin(); bindCheckin(); }
  else if(regTab==='urge') { el.innerHTML=buildUrgeInline(); document.querySelectorAll('.urgbtn').forEach(function(b){ b.onclick=function(){ showUrgeDetail(this.dataset.uid,true); }; }); }
  else { el.innerHTML=buildBreathe(); var bc=document.getElementById('bcirc'); if(bc) bc.onclick=function(){ bPhase==='idle'?startBreath():stopBreath(); }; drawBreath(); }
}
function buildCheckin(){
  var em=EMOTIONS.filter(function(e){ return e.id===ci().emotion; })[0];
  return '<div class="slabel" style="padding-left:2px;">How are you right now?</div>'
    +'<div class="emgrid" style="margin-bottom:14px;" id="em-grid">'
    +EMOTIONS.map(function(e){ return '<button class="embtn'+(ci().emotion===e.id?' on':'')+'"'+(ci().emotion===e.id?' style="border-color:'+e.c+';background:'+e.c+'15;"':'')+' data-eid="'+e.id+'"><span class="emji">'+e.e+'</span><span class="emlbl'+(ci().emotion===e.id?'" style="color:'+e.c+'"':'"')+'>'+e.l+'</span></button>'; }).join('')
    +'</div>'
    +(em?'<div class="card csolo" style="margin-bottom:14px;background:'+em.c+'10;border-left:3px solid '+em.c+';">'
    +'<div style="font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:'+em.c+';margin-bottom:6px;">For this state</div>'
    +'<div style="font-size:15px;color:#3A3A3C;line-height:1.6;">'+em.tip+'</div>'
    +(ci().time?'<div style="font-size:10px;color:#AEAEB2;margin-top:8px;">Checked in at '+ci().time+'</div>':'')
    +'</div>':'')
    +'<div class="slabel" style="padding-left:2px;margin-top:20px;margin-bottom:10px;">Mate body scan</div>'
    +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;" id="body-grid">'
    +['Head','Chest','Stomach','Throat','Shoulders','Whole body'].map(function(area){
      var sel=(ci().bodyArea||'')===area;
      return '<button class="abtn'+(sel?' on':'')+'" data-area="'+area+'" style="padding:10px 8px;"><div style="font-size:12px;font-weight:'+(sel?600:400)+';color:'+(sel?'#0071E3':'#3A3A3C')+';">'+area+'</div></button>';
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
  var done=doneCount(), habits=getHabits();
  document.getElementById('screen').innerHTML='<div class="page">'
    +'<div class="ph"><div style="display:flex;justify-content:space-between;align-items:flex-end;">'
    +'<div><div class="ptitle">Habits</div><div class="psub">Anchor-based. Never clock-based.</div></div>'
    +'<div style="text-align:right;"><div style="font-size:32px;font-weight:200;letter-spacing:-2px;color:'+(done===habits.length?'#34C759':'#1D1D1F')+';">'+done+'<span style="font-size:16px;font-weight:400;color:#AEAEB2;">/'+habits.length+'</span></div></div>'
    +'</div></div>'
    +'<div class="sec"><div style="display:flex;justify-content:space-between;align-items:center;">'
    +'<div class="pillrow" id="hab-pills" style="flex:1;">'
    +'<button class="pill'+(habTab==='today'?' on':'')+'" data-ht="today">Today</button>'
    +'<button class="pill'+(habTab==='week'?' on':'')+'" data-ht="week">This Week</button>'
    +'</div>'
    +'<button id="edit-toggle" style="flex-shrink:0;margin-left:10px;padding:7px 14px;background:'+(habEditMode?'var(--blue-bg)':'var(--card)')+';border:1.5px solid '+(habEditMode?'var(--blue)':'rgba(0,0,0,.08)')+';border-radius:var(--rpill);font-family:inherit;font-size:12px;font-weight:600;color:'+(habEditMode?'var(--blue)':'#636366')+';cursor:pointer;">'+(habEditMode?'Done':'Edit')+'</button>'
    +'</div></div>'
    +'<div class="sec" id="hab-body"></div></div>';
  document.getElementById('hab-pills').addEventListener('click',function(e){ var b=e.target.closest('[data-ht]'); if(b){ habTab=b.dataset.ht; document.querySelectorAll('[data-ht]').forEach(function(x){ x.classList.toggle('on',x.dataset.ht===habTab); }); drawHabBody(); } });
  document.getElementById('edit-toggle').onclick=function(){ habEditMode=!habEditMode; renderHabits(); };
  drawHabBody();
}
function drawHabBody(){
  var el=document.getElementById('hab-body'); if(!el) return;
  if(habTab==='week'){ el.innerHTML=buildHabWeek(); return; }
  var habits=getHabits(), ah=habits.filter(function(h){ return h.anchor===habAnchor; });
  var doneAll=ah.length>0&&ah.every(function(h){ return td()[h.id]; });
  el.innerHTML='<div class="agrid">'
    +Object.keys(ANCHORS).map(function(k){
      var a=ANCHORS[k], cnt=habits.filter(function(h){ return h.anchor===k&&td()[h.id]; }).length;
      var tot=habits.filter(function(h){ return h.anchor===k; }).length;
      return '<button class="abtn'+(habAnchor===k?' on':'')+'" data-anc="'+k+'"><div style="font-size:20px;margin-bottom:4px;">'+a.emoji+'</div><div style="font-size:12px;font-weight:600;color:'+(habAnchor===k?'#0071E3':'#3A3A3C')+';">'+a.label+'</div><div style="font-size:11px;color:#AEAEB2;margin-top:2px;">'+cnt+'/'+tot+'</div></button>';
    }).join('')
    +'</div>'
    +'<div style="font-size:12px;color:#AEAEB2;margin-bottom:14px;font-style:italic;">'+ANCHORS[habAnchor].desc+'</div>'
    +'<div class="card" id="hab-rows">'+(ah.length>0?ah.map(function(h){ return habitRowHtml(h,habEditMode); }).join(''):'<div class="csolo" style="text-align:center;color:#AEAEB2;font-size:14px;">No '+habAnchor+' habits yet</div>')+'</div>'
    +(doneAll&&!habEditMode?'<div class="card csolo" style="margin-top:12px;background:#F0FAF2;text-align:center;"><div style="font-size:14px;font-weight:600;color:#34C759;">All '+habAnchor+' habits complete.</div><div style="font-size:12px;color:#AEAEB2;margin-top:4px;">Say yes out loud. That dopamine hit is real. (Barkley)</div></div>':'')
    +'<button id="add-habit-btn" style="width:100%;margin-top:12px;padding:14px;background:var(--card);border:1.5px dashed rgba(0,0,0,.1);border-radius:var(--r);font-family:inherit;font-size:14px;font-weight:500;color:#AEAEB2;cursor:pointer;">+ Add habit</button>'
    +'<div class="qcard" style="margin-top:16px;"><div style="font-size:13px;color:#636366;line-height:1.7;font-style:italic;"><strong style="font-weight:600;font-style:normal;color:#636366;">Never miss twice.</strong> One miss is an accident. Two misses is a new habit &#8212; the habit of not doing it.</div></div>';

  el.querySelectorAll('[data-anc]').forEach(function(b){ b.onclick=function(){ habAnchor=this.dataset.anc; drawHabBody(); }; });
  var hr=document.getElementById('hab-rows');
  if(hr) hr.addEventListener('click',function(e){
    var editBtn=e.target.closest('[data-edit]'); if(editBtn){ showHabitForm(editBtn.dataset.edit); return; }
    var delBtn=e.target.closest('[data-del]'); if(delBtn){ deleteHabit(delBtn.dataset.del); return; }
    if(!habEditMode){ var row=e.target.closest('[data-hid]'); if(row) toggleHabit(row.dataset.hid); }
  });
  var addBtn=document.getElementById('add-habit-btn');
  if(addBtn) addBtn.onclick=function(){ showHabitForm(null); };
}
function deleteHabit(id){
  var h=getHabits().filter(function(x){ return x.id===id; })[0]; if(!h) return;
  openModal('<div class="mtitle">Delete "'+esc(h.label)+'"?</div>'
    +'<div class="msub">This cannot be undone.</div>'
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
  var wd=weekDates(), habits=getHabits();
  return habits.map(function(h){
    var col=CAT_C[h.cat]||'#0071E3', streak=getStreak(h.id);
    var done7=wd.filter(function(d){ return (S.habitData[d]||{})[h.id]; }).length;
    return '<div class="card" style="margin-bottom:10px;">'
      +'<div class="crow"><span style="font-size:22px;">'+h.emoji+'</span><div style="flex:1;"><div class="lp">'+esc(h.label)+'</div><div class="ls">'+h.cat+' &#183; '+h.anchor+'</div></div><div style="font-size:13px;color:#AEAEB2;font-weight:500;">'+done7+'/7</div></div>'
      +'<div style="padding:0 16px 14px;"><div class="wbars">'+wd.map(function(d){ return '<div class="wbar'+((S.habitData[d]||{})[h.id]?' on':'')+'"></div>'; }).join('')+'</div>'
      +(streak>1?'<div style="margin-top:8px;font-size:12px;color:#FF9500;font-weight:500;">&#128293; '+streak+'-day streak</div>':'')+'</div></div>';
  }).join('');
}

// ── BRAIN SCREEN (AI) ─────────────────────────────────────────────────────────
var chatMessages = [];
var chatLoading = false;

function buildSystemPrompt(){
  var wd=weekDates(), habits=getHabits(), tdTd=td();
  var habitSummary=habits.map(function(h){ return '"'+h.label+'": '+wd.filter(function(d){ return (S.habitData[d]||{})[h.id]; }).length+'/7 days'; }).join(', ');
  var emHistory=wd.map(function(d){ var em=EMOTIONS.filter(function(e){ return e.id===(S.checkins[d]||{}).emotion; })[0]; return em?d+': '+em.l:''; }).filter(Boolean).join(', ')||'No check-ins yet';
  var wUrges=S.urgeLog.filter(function(u){ return wd.indexOf(u.date)!==-1; });
  var urgeSummary=wUrges.length>0?(wUrges.length+' urges: '+wUrges.map(function(u){ return u.type; }).join(', ')+'. Redirected: '+wUrges.filter(function(u){ return u.redirected; }).length+'.'):'No urges logged this week';
  var todayDone=habits.filter(function(h){ return tdTd[h.id]; }).map(function(h){ return h.label; }).join(', ')||'None yet';
  var todayMissed=habits.filter(function(h){ return !tdTd[h.id]; }).map(function(h){ return h.label; }).join(', ')||'All done';
  var curEm=EMOTIONS.filter(function(e){ return e.id===ci().emotion; })[0];
  var name=S.profile.name||'this person';
  return 'You are an expert ADHD coach built into the Focal app. You have deeply studied:\n'
    +'- Dr. Russell Barkley: executive function model, time blindness, external scaffolding, exercise as medicine\n'
    +'- Dr. Gabor Mate: trauma-informed ADHD, dopamine as self-medication, shame vs compassion, body-mind connection\n'
    +'- Dr. Ned Hallowell: strength-based approach, connection as medicine, hyperfocus as superpower\n'
    +'- Dr. William Dodson: Rejection Sensitive Dysphoria in 99% of ADHD people\n\n'
    +'You know '+name+' personally through their data:\n\n'
    +'PROFILE:\n'
    +'- Name: '+S.profile.name+'\n'
    +'- Peak energy: '+S.profile.peakTime+'\n'
    +'- Main dopamine trigger: '+S.profile.mainTrigger+'\n\n'
    +'TODAY ('+TODAY+'):\n'
    +'- Current emotion: '+(curEm?curEm.l:'Not checked in')+'\n'
    +'- Habits done: '+todayDone+'\n'
    +'- Habits not done yet: '+todayMissed+'\n\n'
    +'THIS WEEK:\n'
    +'- Habit completion: '+habitSummary+'\n'
    +'- Emotions: '+emHistory+'\n'
    +'- Dopamine urges: '+urgeSummary+'\n\n'
    +'COACHING STYLE:\n'
    +'- Be direct, warm, and deeply personal — never generic\n'
    +'- Reference their actual data when relevant\n'
    +'- Keep responses concise — ADHD brains do not need walls of text\n'
    +'- Use Barkley, Mate, Hallowell, Dodson naturally, not as lectures\n'
    +'- Validate first when someone is struggling, then redirect\n'
    +'- Short sharp truths are often more powerful than long explanations\n'
    +'- Be honest and challenging when needed — this person deserves truth, not just comfort';
}

function renderBrain(){
  var name=S.profile.name||'there';
  var starters=['I cannot start anything today','What should I focus on right now?','I keep reaching for my phone','Analyse my patterns this week'];
  document.getElementById('screen').innerHTML='<div style="display:flex;flex-direction:column;height:calc(100vh - 72px);">'
    +'<div style="padding:52px 20px 16px;background:#F5F5F7;border-bottom:.5px solid rgba(0,0,0,.06);flex-shrink:0;">'
    +'<div style="display:flex;justify-content:space-between;align-items:flex-start;">'
    +'<div><div class="ptitle">Brain &#10022;</div><div class="psub">Your AI coach. Knows your data. Knows the science.</div></div>'
    +(chatMessages.length>0?'<button id="clear-chat" style="background:none;border:none;font-size:13px;color:#AEAEB2;cursor:pointer;padding:4px 0;">Clear</button>':'')
    +'</div></div>'
    +'<div id="chat-area" style="flex:1;overflow-y:auto;padding:16px 20px;-webkit-overflow-scrolling:touch;">'
    +(chatMessages.length===0
      ? '<div style="text-align:center;padding:24px 0 20px;">'
        +'<div style="font-size:48px;margin-bottom:12px;">&#129504;</div>'
        +'<div style="font-size:17px;font-weight:600;color:#1D1D1F;margin-bottom:6px;">Hi '+esc(name)+'</div>'
        +'<div style="font-size:14px;color:#AEAEB2;line-height:1.6;max-width:280px;margin:0 auto;">I know your patterns, your triggers, and the science. Ask me anything.</div></div>'
        +'<div style="display:flex;flex-direction:column;gap:8px;" id="starters">'
        +starters.map(function(s){ return '<button class="starter-btn" style="background:#fff;border:.5px solid rgba(0,0,0,.08);border-radius:14px;padding:12px 16px;font-family:inherit;font-size:14px;color:#3A3A3C;cursor:pointer;text-align:left;box-shadow:0 1px 2px rgba(0,0,0,.06);">'+s+'</button>'; }).join('')
        +'</div>'
      : renderChatMessages()
    )
    +'<div id="chat-end"></div></div>'
    +'<div style="padding:12px 20px;background:rgba(255,255,255,.92);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-top:.5px solid rgba(0,0,0,.06);flex-shrink:0;">'
    +'<div style="display:flex;gap:10px;align-items:flex-end;">'
    +'<div style="flex:1;background:#F5F5F7;border-radius:20px;padding:10px 16px;display:flex;align-items:flex-end;">'
    +'<textarea id="chat-input" rows="1" placeholder="Ask your brain anything..." style="flex:1;background:transparent;border:none;outline:none;font-family:inherit;font-size:15px;color:#1D1D1F;resize:none;line-height:1.5;max-height:100px;overflow-y:auto;"></textarea>'
    +'</div>'
    +'<button id="chat-send" style="width:40px;height:40px;border-radius:50%;background:#D1D1D6;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s;">'
    +'<span style="color:#fff;font-size:16px;margin-top:-1px;">&#8593;</span></button>'
    +'</div></div></div>';

  var sendBtn=document.getElementById('chat-send');
  var inp=document.getElementById('chat-input');
  var clearBtn=document.getElementById('clear-chat');

  if(clearBtn) clearBtn.onclick=function(){ chatMessages=[]; S.chatHistory=[]; saveS(); renderBrain(); };

  var stEl=document.getElementById('starters');
  if(stEl) stEl.addEventListener('click',function(e){ var b=e.target.closest('.starter-btn'); if(b){ inp.value=b.textContent; updateSendBtn(); } });

  function updateSendBtn(){
    sendBtn.style.background=inp.value.trim()&&!chatLoading?'#0071E3':'#D1D1D6';
    sendBtn.style.cursor=inp.value.trim()&&!chatLoading?'pointer':'default';
  }
  inp.oninput=updateSendBtn;
  inp.onkeydown=function(e){ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); doSend(); } };
  sendBtn.onclick=doSend;

  function doSend(){
    var txt=inp.value.trim(); if(!txt||chatLoading) return;
    chatMessages.push({role:'user',content:txt});
    inp.value=''; updateSendBtn();
    updateChatArea();
    sendToAI();
  }

  function updateChatArea(){
    var area=document.getElementById('chat-area'); if(!area) return;
    area.innerHTML=renderChatMessages()+(chatLoading?renderTyping():'')+'<div id="chat-end"></div>';
    var end=document.getElementById('chat-end'); if(end) end.scrollIntoView({behavior:'smooth'});
  }

  async function sendToAI(){
    chatLoading=true; updateChatArea();
    try{
      var response=await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          model:'claude-sonnet-4-20250514',
          max_tokens:1000,
          system:buildSystemPrompt(),
          messages:chatMessages.map(function(m){ return {role:m.role,content:m.content}; }),
        }),
      });
      var data=await response.json();
      var text=(data.content&&data.content[0]&&data.content[0].text)||'Something went wrong. Please try again.';
      chatMessages.push({role:'assistant',content:text});
      S.chatHistory=chatMessages.slice(-30);
      saveS();
    } catch(e){
      chatMessages.push({role:'assistant',content:'Something went wrong. Please try again.'});
    }
    chatLoading=false;
    updateChatArea();
    updateSendBtn();
  }

  var end=document.getElementById('chat-end'); if(end) end.scrollIntoView({behavior:'auto'});
}

function renderChatMessages(){
  return chatMessages.map(function(m){
    var isUser=m.role==='user';
    return '<div style="margin-bottom:12px;display:flex;flex-direction:column;align-items:'+(isUser?'flex-end':'flex-start')+';}">'
      +(isUser?'':'<div style="font-size:11px;color:#AEAEB2;margin-bottom:4px;padding-left:4px;">Brain &#10022;</div>')
      +'<div class="'+(isUser?'chat-user':'chat-ai')+'">'+esc(m.content).replace(/\n/g,'<br/>')+'</div></div>';
  }).join('');
}

function renderTyping(){
  return '<div style="margin-bottom:12px;">'
    +'<div style="font-size:11px;color:#AEAEB2;margin-bottom:4px;padding-left:4px;">Brain &#10022;</div>'
    +'<div class="chat-ai" style="display:inline-flex;gap:4px;align-items:center;padding:14px 18px;">'
    +'<div style="width:6px;height:6px;border-radius:50%;background:#AEAEB2;animation:tp 1.2s ease infinite;"></div>'
    +'<div style="width:6px;height:6px;border-radius:50%;background:#AEAEB2;animation:tp 1.2s ease infinite;animation-delay:.2s;"></div>'
    +'<div style="width:6px;height:6px;border-radius:50%;background:#AEAEB2;animation:tp 1.2s ease infinite;animation-delay:.4s;"></div>'
    +'<style>@keyframes tp{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}</style>'
    +'</div></div>';
}

// ── MAIN RENDER ───────────────────────────────────────────────────────────────
function render(){
  chatMessages = S.chatHistory || [];
  if(CUR==='hq')       renderHQ();
  else if(CUR==='focus')    renderFocus();
  else if(CUR==='regulate') renderRegulate();
  else if(CUR==='habits')   renderHabits();
  else if(CUR==='brain')    renderBrain();
}

// ── INIT ──────────────────────────────────────────────────────────────────────
if(!S.profile.done){
  OB_STEP=1; renderOnboarding();
} else {
  render();
}
