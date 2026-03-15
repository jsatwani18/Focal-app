
// ── DATA ────────────────────────────────────────────────────────────────────
var HABITS = [
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
var CAT_C = {health:'#34C759', focus:'#0071E3', dopamine:'#FF9500', mind:'#AF52DE'};
var ANCHORS = {
  morning:   {label:'Morning',   emoji:'🌅', desc:'After waking — after coffee'},
  afternoon: {label:'Afternoon', emoji:'☀️', desc:'After lunch — after sitting down'},
  evening:   {label:'Evening',   emoji:'🌙', desc:'After dinner — before bed'},
};
var EMOTIONS = [
  {id:'wired',       l:'Wired',      e:'⚡', tip:'Peak window. Start your hardest task right now.'},
  {id:'energized',   l:'Energized',  e:'🔥', tip:'Ride this wave. Stack deep work here. Protect it.'},
  {id:'calm',        l:'Calm',       e:'🌊', tip:'Precious. Use it for planning and connection.'},
  {id:'foggy',       l:'Foggy',      e:'🌫', tip:'Walk 10 minutes first. Blood to the brain.'},
  {id:'anxious',     l:'Anxious',    e:'😰', tip:'Breathe out longer than in. Ground yourself physically.'},
  {id:'overwhelmed', l:'Too Much',   e:'🌀', tip:'One thing only. The 2-minute version. Delete the rest.'},
  {id:'frustrated',  l:'Frustrated', e:'😤', tip:'Move your body 5 min. Never push through friction.'},
  {id:'low',         l:'Low',        e:'😶', tip:'Light, water, protein, 5 min movement. In that order.'},
  {id:'avoidant',    l:'Avoidant',   e:'🪨', tip:'Say out loud what you are avoiding. Then 2 minutes only.'},
  {id:'sad',         l:'Sad',        e:'💙', tip:'Be gentle today. One small kind act for yourself is enough.'},
];
var URGES = [
  {id:'phone',    l:'Phone / Social media',  e:'📱', need:'Connection or novelty',
   r:'Your brain wants connection or novelty. Text one real person something genuine first. Then ask — what was I actually trying to do before this urge hit?'},
  {id:'food',     l:'Snacking',              e:'🍕', need:'Comfort or emotion',
   r:'Drink a full glass of water. Wait 5 minutes. Ask honestly — is this hunger, or am I soothing something? Try to name the emotion.'},
  {id:'gaming',   l:'Gaming or apps',        e:'🎮', need:'Achievement or escape',
   r:'What are you escaping right now? Name it. Set a 5-minute timer and do exactly the thing you are avoiding. Just 5 minutes.'},
  {id:'watching', l:'Watching or streaming', e:'📺', need:'Escape or numbing',
   r:'What feels too hard to face? You do not have to fix it — just write its name on paper. Naming the thing makes it smaller.'},
  {id:'shopping', l:'Shopping or browsing',  e:'🛍', need:'Novelty or control',
   r:'Add it to a list. Give it 48 hours. The dopamine from buying lasts minutes. The 48-hour rule eliminates most of these urges.'},
];
var INSIGHTS = [
  {a:'Dr. Russell Barkley', c:'#0071E3',
   q:'ADHD is not a problem of knowing what to do. It is a problem of doing what you know.',
   ctx:'This is why information alone never fixes ADHD. Your brain knows what to do. The gap is in doing it at the exact moment it is needed. You need external systems at the point of performance — not more knowledge.'},
  {a:'Dr. Russell Barkley', c:'#0071E3',
   q:'Everything is either NOW or NOT NOW. The ADHD brain is time-blind.',
   ctx:'Future-you does not feel real. That is why deadlines only activate you at the last second. The fix: manufacture urgency before the crisis arrives. Timers, visible clocks, commitments that create accountability now.'},
  {a:'Dr. Russell Barkley', c:'#0071E3',
   q:'Exercise is the single most powerful tool you have for your ADHD brain. Treat it like medication.',
   ctx:'20 to 30 minutes of cardio elevates dopamine, norepinephrine, and serotonin in a way that mirrors stimulant medication. It is not optional. It is not self-care. It is the most evidence-backed daily intervention available to you.'},
  {a:'Dr. Russell Barkley', c:'#0071E3',
   q:'You cannot use your ADHD brain to manage your ADHD brain. You need external scaffolding.',
   ctx:'Mental notes fail. Intentions evaporate. Memory leaks constantly. The solution is radical externalization — nothing important lives in your head. Everything lives in your environment, written down, made visible, made tangible.'},
  {a:'Dr. Gabor Mate', c:'#FF9500',
   q:'The ADHD brain is not diseased. It is a brain that adapted to protect itself.',
   ctx:'ADHD often emerges as an adaptation — a mind that learned to scatter attention to avoid being fully present in an overwhelming environment. Understanding this replaces self-blame with curiosity. Your brain was doing its best with what it had.'},
  {a:'Dr. Gabor Mate', c:'#FF9500',
   q:'Behind every compulsive behavior is pain. Dopamine-seeking is self-medication, not weakness.',
   ctx:'When you reach for your phone or your food or your screen, ask: what pain am I trying to soothe? What need is unmet? This is not a character flaw. It was a coping strategy. And coping strategies can be updated.'},
  {a:'Dr. Gabor Mate', c:'#FF9500',
   q:'Shame is the most destructive force for the ADHD brain. Self-compassion is neurological medicine.',
   ctx:'Shame activates the brain\'s pain circuitry and shuts down the prefrontal cortex — exactly the region ADHD already taxes. Every moment of self-compassion instead of self-criticism literally re-opens the brain. This is physiology, not sentiment.'},
  {a:'Dr. Gabor Mate', c:'#FF9500',
   q:'You are not too much. You are not broken. Your gifts have not found the right container yet.',
   ctx:'The intensity, the curiosity, the emotional depth — these are not defects. They are your nature, looking for an environment worthy of them. Your work is not to become someone else. It is to build the right conditions for who you already are.'},
  {a:'Dr. Ned Hallowell', c:'#34C759',
   q:'ADHD is a Ferrari engine with bicycle brakes. The power is extraordinary — learn to drive it.',
   ctx:'The hyperfocus, the creativity, the intensity — this is the engine. The structures and systems you build are the brakes. You do not need a smaller engine. You need brakes that match it, and someone to show you the track.'},
  {a:'Dr. Ned Hallowell', c:'#34C759',
   q:'Connection is medicine. Never underestimate the power of being truly understood.',
   ctx:'Body doubling works. Accountability partners work. Therapy works. Not because ADHD is a social disorder — but because the human nervous system regulates itself through connection with other nervous systems. You were never meant to manage this alone.'},
  {a:'Dr. William Dodson', c:'#AF52DE',
   q:'Rejection Sensitive Dysphoria affects 99% of people with ADHD. The pain is neurological, not weakness.',
   ctx:'When criticism or rejection hits you like a physical blow — that is RSD. Your nervous system fires in a way that most people simply do not experience. This is not being too sensitive. Naming it as RSD gives you a map of what is happening.'},
];
var JOURNAL_PROMPTS = [
  'What made today harder than it needed to be? What could change?',
  'What are you avoiding right now? Say it honestly — no judgment.',
  'When did you feel most like yourself today? What were you doing?',
  'What would you tell a close friend with ADHD who had your exact day?',
  'What did your brain do well today, even if it felt small?',
  'What triggered your hardest moment? Can you trace it back to a need?',
  'If tomorrow could be 10% better than today, what is that one change?',
  'Where did you feel shame today? Was it deserved — or was it ADHD talking?',
];
var UNDERSTAND = [
  {t:'Why your brain seeks dopamine',     c:'#FF9500', i:'⚡',
   b:'Mate: ADHD involves dysregulated dopamine signaling. When you doom-scroll compulsively, you are self-medicating a neurological deficit — not failing a character test. Understanding this replaces shame with agency. You can redirect the need instead of fighting it.'},
  {t:'Why you cannot just start',         c:'#0071E3', i:'🧱',
   b:'Barkley: Task initiation requires the prefrontal cortex to manufacture interest or urgency — and the ADHD brain does not do this automatically. This is why you need external triggers at the exact moment of starting: a timer, a person, a commitment, a first step written down.'},
  {t:'Why you forget everything',         c:'#34C759', i:'🌫',
   b:'Barkley: Working memory in ADHD functions like a whiteboard that gets erased every few minutes. This is neurological architecture, not a character flaw. Fix: radical externalization — nothing important should live in your head. Everything should live in your environment.'},
  {t:'Why shame makes it worse',          c:'#AF52DE', i:'💙',
   b:'Mate: Shame activates the brain\'s pain circuitry and shuts down the prefrontal cortex — the exact region ADHD already taxes. Self-criticism does not motivate the ADHD brain. It paralyzes it. Self-compassion is physiologically the better strategy.'},
  {t:'Why exercise is non-negotiable',    c:'#FF3B30', i:'🏃',
   b:'Barkley and Ratey: 20 to 30 minutes of aerobic exercise produces neurochemical effects that mirror stimulant medication — elevating dopamine, norepinephrine, and serotonin simultaneously. It also builds the prefrontal cortex over time. This is evidence-based medicine.'},
  {t:'Why hyperfocus is your superpower', c:'#FF9500', i:'🔥',
   b:'Hallowell: The ADHD brain is capable of extraordinary, sustained, effortless focus when the task is intrinsically compelling. This is real, it is powerful, and it is your greatest asset. Find the conditions that reliably produce it, then build structures around them.'},
];
var WD = ['S','M','T','W','T','F','S'];
var J_IDX = Math.floor(Math.random() * JOURNAL_PROMPTS.length);

// ── STATE ─────────────────────────────────────────────────────────────────────
var KEY = 'focal_v5';
var S = {habitData:{}, checkins:{}, oneFocus:{}, journal:{}, insightIdx:0, totalWins:0, timerMode:'sprint', bodyDouble:false};
function loadS(){ try{ var d=localStorage.getItem(KEY); if(d){ var p=JSON.parse(d); Object.keys(p).forEach(function(k){ S[k]=p[k]; }); } }catch(e){} }
function saveS(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }
loadS();

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
function getStreak(id){
  var s=0, d=new Date();
  for(var i=0;i<400;i++){ var k=d.toISOString().slice(0,10); if((S.habitData[k]||{})[id]){ s++; d.setDate(d.getDate()-1); } else break; }
  return s;
}
function doneCount(){ return HABITS.filter(function(h){ return td()[h.id]; }).length; }
function doneTd(id){ return !!(td()[id]); }

// ── NAV ───────────────────────────────────────────────────────────────────────
var CUR = 'hq';
function go(s){
  CUR = s;
  document.querySelectorAll('.ni').forEach(function(b){ b.classList.toggle('on', b.id==='n-'+s); });
  render();
  document.getElementById('screen').scrollTop = 0;
}
['hq','focus','regulate','habits','wisdom'].forEach(function(s){
  document.getElementById('n-'+s).onclick = function(){ go(s); };
});

// ── HABITS ────────────────────────────────────────────────────────────────────
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
    var h   = HABITS.filter(function(x){ return x.id===id; })[0];
    if(chk){ chk.className = done ? 'chk on' : 'chk pop'; chk.textContent = done ? '\u2713' : h.emoji; if(!done) setTimeout(function(){ if(chk) chk.classList.remove('pop'); }, 500); }
    if(lp)  lp.className  = done ? 'lp done' : 'lp';
  }
  updateRing();
}
function updateRing(){
  var done=doneCount(), total=HABITS.length, pct=done/total, C=2*Math.PI*22;
  var rf=document.getElementById('rprog'), rl=document.getElementById('rlabel');
  if(rf){ rf.setAttribute('stroke-dashoffset', C*(1-pct)); rf.setAttribute('stroke', pct===1 ? '#34C759' : '#0071E3'); }
  if(rl) rl.textContent = done+'/'+total;
}
function habitRowHtml(h){
  var done=doneTd(h.id), col=CAT_C[h.cat]||'#0071E3', streak=getStreak(h.id);
  var right = streak>1 ? '<div class="sbadge">&#128293; '+streak+'</div>' : '<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:'+col+';">'+h.cat+'</div>';
  return '<div class="crow tap'+(done?' done':'')+'" data-hid="'+h.id+'">'
    +'<div class="chk'+(done?' on':'')+'">'+( done ? '\u2713' : h.emoji )+'</div>'
    +'<div style="flex:1;min-width:0;"><div class="lp'+(done?' done':'')+'">'+h.label+'</div><div class="ls">'+h.tiny+'</div></div>'
    +'<div style="flex-shrink:0;">'+right+'</div>'
    +'</div>';
}

// ── TIMER ─────────────────────────────────────────────────────────────────────
var TMODES = {micro:{l:'Micro',m:10}, sprint:{l:'Sprint',m:25}, turbo:{l:'Turbo',m:50}};
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
  var m=Math.floor(left/60), s=left%60;
  var stroke=tPhase==='break'?'#34C759':tPhase==='working'?'#0071E3':'#D1D1D6';
  var phase={idle:'Ready',working:'Working',paused:'Paused',break:'Break'}[tPhase];
  td2.innerHTML='<svg width="220" height="220" viewBox="0 0 220 220" style="display:block;overflow:visible;">'
    +'<circle class="tring-bg" cx="110" cy="110" r="88"/>'
    +'<circle class="tring-fill" cx="110" cy="110" r="88" stroke="'+stroke+'" stroke-dasharray="'+C+'" stroke-dashoffset="'+C*(1-pct)+'" style="transform:rotate(-90deg);transform-origin:50% 50%;transition:stroke-dashoffset .9s linear,stroke .4s;"/>'
    +'</svg>'
    +'<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;">'
    +'<div class="ttime">'+pad(m)+':'+pad(s)+'</div>'
    +'<div class="tphase">'+phase+'</div>'
    +'</div>';
  if(!tc) return;
  if(tPhase==='idle'){
    tc.innerHTML='<button class="btn btn-p" id="t-start">Begin</button>';
    document.getElementById('t-start').onclick = startTimer;
  } else if(tPhase==='working'){
    tc.innerHTML='<div style="display:flex;gap:10px;">'
      +'<button class="btn btn-g btn-sm" id="t-pause">Pause</button>'
      +'<button class="btn btn-g btn-sm" id="t-reset">Reset</button>'
      +'<button class="btn btn-sm" style="width:auto;padding:9px 18px;background:#FFF0EF;color:#FF3B30;border:none;border-radius:14px;font-family:inherit;font-size:14px;font-weight:500;cursor:pointer;" id="t-stuck">Stuck?</button>'
      +'</div>';
    document.getElementById('t-pause').onclick = pauseTimer;
    document.getElementById('t-reset').onclick = resetTimer;
    document.getElementById('t-stuck').onclick = showStuck;
  } else if(tPhase==='paused'){
    tc.innerHTML='<div style="display:flex;gap:10px;">'
      +'<button class="btn btn-p btn-sm" id="t-resume">Resume</button>'
      +'<button class="btn btn-g btn-sm" id="t-reset2">Reset</button>'
      +'</div>';
    document.getElementById('t-resume').onclick = resumeTimer;
    document.getElementById('t-reset2').onclick = resetTimer;
  } else {
    tc.innerHTML='<div style="background:#F0FAF2;border-radius:16px;padding:18px;margin-bottom:14px;">'
      +'<div style="font-size:11px;font-weight:700;letter-spacing:.06em;color:#34C759;text-transform:uppercase;margin-bottom:8px;">Break — move your body</div>'
      +'<div style="font-size:15px;font-weight:500;color:#3A3A3C;">Step outside for 60 seconds \ud83c\udf3f</div>'
      +'<div style="font-size:12px;color:#AEAEB2;margin-top:4px;">Movement restores dopamine. Barkley calls this essential.</div>'
      +'</div>'
      +'<button class="btn btn-s" id="t-next">Start Next Session</button>';
    document.getElementById('t-next').onclick = resetTimer;
  }
}

// ── BREATHING ─────────────────────────────────────────────────────────────────
var bPhase='idle', bSec=0, bCount=0, bInt=null;
function startBreath(){ bPhase='inhale'; bSec=0; bCount=0; clearInterval(bInt); bInt=setInterval(function(){ bSec++; if(bPhase==='inhale'&&bSec>=4){bPhase='hold';bSec=0;} else if(bPhase==='hold'&&bSec>=4){bPhase='exhale';bSec=0;} else if(bPhase==='exhale'&&bSec>=6){bPhase='inhale';bSec=0;bCount++;} drawBreath(); },1000); drawBreath(); }
function stopBreath(){ clearInterval(bInt); bPhase='idle'; drawBreath(); }
function drawBreath(){
  var el=document.getElementById('bcirc'); if(!el) return;
  var icons={idle:'🫁',inhale:'⬆️',hold:'⏸',exhale:'⬇️'};
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
  openModal('<div class="mtitle">Rejection Sensitive Dysphoria</div>'
    +'<div class="msub">Dr. William Dodson — affects 99% of people with ADHD</div>'
    +'<div style="background:rgba(175,82,222,.07);border-radius:14px;padding:16px;margin-bottom:18px;font-size:14px;color:#3A3A3C;line-height:1.7;">What you are feeling right now is <strong>neurological</strong>, not weakness. Your nervous system fires in a way that most people simply do not experience. Naming it as RSD gives you a map — which is the first step to responding instead of reacting.</div>'
    +makeSteps(['Say out loud: This is RSD. This is my nervous system, not reality.','Cold water on your wrists or face. Return to your body.','Ask: will this matter in 24 hours? In a week?','Make no decisions, send no messages for at least one hour.','Your sensitivity is not a flaw. It makes you deeply perceptive.'], '#AF52DE')
    +'<button class="btn btn-g" id="m-rsd-ok" style="margin-top:8px;">I see it. I name it. I am okay.</button>');
  document.getElementById('m-rsd-ok').onclick = closeModal;
}
function showOverwhelm(){
  openModal('<div class="mtitle">Overwhelm Protocol</div>'
    +'<div class="msub">Barkley — Simplify immediately. Complexity is the enemy.</div>'
    +makeSteps(['Stop. You do not need to solve everything right now.','Take three slow breaths. Out longer than in.','Name one thing — just one — that genuinely matters today.','Everything else: write it down. Tell it: not now.','Do that one thing for exactly five minutes. Only five minutes.','Still spiraling? Physically move to a different room.'], '#FF3B30')
    +'<button class="btn btn-d" id="m-owh-ok" style="margin-top:8px;">One thing. Five minutes. Go.</button>');
  document.getElementById('m-owh-ok').onclick = closeModal;
}
function showStuck(){
  openModal('<div class="mtitle">You are stuck.</div>'
    +'<div class="msub">This is normal. Here is what actually works.</div>'
    +makeSteps(['Change your physical position — stand, move to the floor, change rooms.','Read only the first sentence of the task out loud.','Tell yourself: I only need to work for two minutes.','Is this the wrong task for your current energy? Consider switching.','Write down exactly what is blocking you. Naming it breaks the loop.'], '#0071E3')
    +'<button class="btn btn-p" id="m-stk-ok" style="margin-top:8px;">Back to work</button>');
  document.getElementById('m-stk-ok').onclick = closeModal;
}
function showUrgeMenu(){
  var html='<div class="mtitle">Before you act on that urge.</div><div class="msub">Identify it. Meet the real need underneath.</div>';
  URGES.forEach(function(u){
    html+='<button class="urgbtn" data-uid="'+u.id+'"><span style="font-size:26px;">'+u.e+'</span><div><div style="font-size:15px;font-weight:500;color:#1D1D1F;">'+u.l+'</div><div style="font-size:11px;color:#AEAEB2;margin-top:2px;">Need: '+u.need+'</div></div><span style="margin-left:auto;color:#D1D1D6;font-size:16px;">&#9002;</span></button>';
  });
  openModal(html);
  document.querySelectorAll('.urgbtn').forEach(function(b){ b.onclick=function(){ showUrgeDetail(this.dataset.uid); }; });
}
function showUrgeDetail(id){
  var u=URGES.filter(function(x){ return x.id===id; })[0];
  openModal('<div class="mtitle">'+u.e+' '+u.l+'</div>'
    +'<div class="msub">Need underneath: '+u.need+'</div>'
    +'<div class="rbox"><div style="font-size:15px;color:#3A3A3C;line-height:1.75;">'+u.r+'</div></div>'
    +'<button class="btn btn-s" id="m-uid-ok">Urge redirected</button>'
    +'<button class="btn btn-g" id="m-uid-back" style="margin-top:10px;">Back</button>');
  document.getElementById('m-uid-ok').onclick = closeModal;
  document.getElementById('m-uid-back').onclick = showUrgeMenu;
}

// ── HQ ────────────────────────────────────────────────────────────────────────
function renderHQ(){
  var wd=weekDates(), done=doneCount(), total=HABITS.length, pct=done/total, C=2*Math.PI*22;
  var h=new Date().getHours(), dp=Math.min(100,Math.round(((h*60+new Date().getMinutes())/(24*60))*100));
  var gr=h<5?'Still up?':h<12?'Good morning.':h<17?'Good afternoon.':h<21?'Good evening.':'Good night.';
  var em=EMOTIONS.filter(function(e){ return e.id===ci().emotion; })[0];
  var fv=S.oneFocus[TODAY]||'';

  var html='<div class="page">'
    +'<div class="ph">'
      +'<div style="display:flex;justify-content:space-between;align-items:flex-start;">'
        +'<div>'
          +'<div class="ptitle">'+gr+'</div>'
          +'<div class="psub">'+new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})+'</div>'
          +(em?'<div style="display:flex;align-items:center;gap:6px;margin-top:8px;"><span style="font-size:14px;">'+em.e+'</span><span style="font-size:13px;color:#AEAEB2;">Feeling '+em.l.toLowerCase()+'</span></div>':'')
        +'</div>'
        +'<div style="position:relative;width:52px;height:52px;flex-shrink:0;margin-top:6px;">'
          +'<svg width="52" height="52" viewBox="0 0 52 52" style="overflow:visible;">'
            +'<circle cx="26" cy="26" r="22" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="3.5"/>'
            +'<circle id="rprog" cx="26" cy="26" r="22" fill="none" stroke="'+(pct===1?'#34C759':'#0071E3')+'" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+C*(1-pct)+'" style="transform:rotate(-90deg);transform-origin:50% 50%;transition:stroke-dashoffset .6s;"/>'
          +'</svg>'
          +'<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">'
            +'<span id="rlabel" style="font-size:11px;font-weight:600;color:'+(pct===1?'#34C759':'#1D1D1F')+';">'+done+'/'+total+'</span>'
          +'</div>'
        +'</div>'
      +'</div>'
      +'<div style="margin-top:20px;">'
        +'<div class="ptrack"><div class="pfill" style="width:'+dp+'%;background:linear-gradient(90deg,#0071E3,#34C759);"></div></div>'
        +'<div style="display:flex;justify-content:space-between;margin-top:5px;">'
          +'<span style="font-size:10px;color:#D1D1D6;">Midnight</span>'
          +'<span style="font-size:10px;color:#AEAEB2;font-weight:500;">'+new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})+'</span>'
          +'<span style="font-size:10px;color:#D1D1D6;">11 PM</span>'
        +'</div>'
      +'</div>'
    +'</div>'
    +'<div class="sec">'
      +'<div class="slabel">One thing</div>'
      +'<div class="iwrap"><input class="ifield" id="focus-inp" placeholder="What single task makes today a win?" style="font-size:17px;font-weight:500;" value="'+esc(fv)+'"/>'
      +(fv?'<div style="font-size:12px;color:#AEAEB2;margin-top:6px;">Barkley — one priority. Everything else is noise until this is done.</div>':'')
      +'</div>'
    +'</div>'
    +'<div class="sec">'
      +'<div class="slabel">This week</div>'
      +'<div class="card csolo"><div class="wstrip">'
      +wd.map(function(date){
        var cnt=HABITS.filter(function(h2){ return (S.habitData[date]||{})[h2.id]; }).length;
        var isT=date===TODAY;
        return '<div class="wcol"><div class="wdlbl">'+WD[new Date(date+'T12:00').getDay()]+'</div><div class="wdot'+(isT?' today':(!isT&&cnt>0?' has':''))+'">'+( cnt>0?cnt:'&#183;' )+'</div></div>';
      }).join('')
      +'</div></div>'
    +'</div>'
    +'<div class="sec">'
      +'<button class="crow tap" id="urge-gate" style="width:100%;border-radius:var(--r);background:var(--card);box-shadow:var(--sh);border:none;font-family:inherit;">'
        +'<span style="font-size:26px;">&#9889;</span>'
        +'<div style="text-align:left;flex:1;"><div style="font-size:15px;font-weight:600;color:#1D1D1F;">Feeling an urge?</div><div style="font-size:12px;color:#AEAEB2;margin-top:2px;">Tap here before you act on it.</div></div>'
        +'<span style="color:#D1D1D6;font-size:16px;">&#8250;</span>'
      +'</button>'
    +'</div>'
    +'<div class="sec">'
      +'<div class="slabel">Quick habits</div>'
      +'<div class="card" id="quick-habits">'
      +HABITS.slice(0,4).map(habitRowHtml).join('')
      +'</div>'
      +'<div style="font-size:12px;color:#AEAEB2;text-align:center;margin-top:10px;">+ '+(HABITS.length-4)+' more habits in the Habits tab</div>'
    +'</div>'
    +'<div class="sec"><div class="qcard"><div style="font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#0071E3;margin-bottom:8px;">Dr. Russell Barkley</div><div class="qtext">"Make the right behavior the easiest behavior. Design your environment — do not rely on willpower."</div></div></div>'
    +'</div>';

  document.getElementById('screen').innerHTML = html;
  document.getElementById('focus-inp').oninput = function(){ S.oneFocus[TODAY]=this.value; saveS(); };
  document.getElementById('urge-gate').onclick = showUrgeMenu;
  document.getElementById('quick-habits').addEventListener('click', function(e){ var r=e.target.closest('[data-hid]'); if(r) toggleHabit(r.dataset.hid); });
}

// ── FOCUS ─────────────────────────────────────────────────────────────────────
function renderFocus(){
  var fv=S.oneFocus[TODAY]||'';
  var modeRows='';
  Object.keys(TMODES).forEach(function(k){
    var m=TMODES[k];
    var desc=k==='micro'?'For low energy days':k==='sprint'?'Classic focused session':'Deep work, flow state';
    var tick=S.timerMode===k
      ?'<div style="width:20px;height:20px;border-radius:50%;background:#0071E3;display:flex;align-items:center;justify-content:center;"><span style="color:#fff;font-size:11px;">&#10003;</span></div>'
      :'<div style="width:20px;height:20px;border-radius:50%;border:1.5px solid #D1D1D6;"></div>';
    modeRows+='<div class="crow tap" data-mode="'+k+'" style="justify-content:space-between;"><div><div class="lp">'+m.l+'</div><div class="ls">'+desc+'</div></div><div style="display:flex;align-items:center;gap:10px;"><span style="font-size:14px;color:#AEAEB2;font-weight:500;">'+m.m+' min</span>'+tick+'</div></div>';
  });

  document.getElementById('screen').innerHTML='<div class="page">'
    +'<div class="ph"><div class="ptitle">Focus</div><div class="psub">Barkley — Make time visible and tangible.</div></div>'
    +'<div class="sec"><div class="iwrap"><input class="ifield" id="task-inp" placeholder="Name the task you are working on" style="font-size:17px;font-weight:500;" value="'+esc(fv)+'"/></div></div>'
    +(tPhase==='idle'?'<div class="sec"><div class="slabel">Duration</div><div class="card" id="mode-rows">'+modeRows+'</div></div>':'')
    +'<div class="sec" style="display:flex;flex-direction:column;align-items:center;">'
      +'<div id="tdisplay" style="position:relative;width:220px;height:220px;"></div>'
      +'<div id="tctrl" style="width:100%;margin-top:20px;max-width:260px;"></div>'
    +'</div>'
    +'<div class="sec"><div class="card">'
      +'<div class="crow" style="justify-content:space-between;">'
        +'<div><div class="lp">Body Double Mode</div><div class="ls">Working alongside others activates the ADHD brain (Hallowell)</div></div>'
        +'<div class="ttrack'+(S.bodyDouble?' on':'')+'" id="bd-tog"><div class="tknob"></div></div>'
      +'</div>'
      +(S.bodyDouble?'<div style="padding:12px 16px;background:#F0FAF2;font-size:13px;color:#34C759;border-top:.5px solid rgba(0,0,0,.05);">&#128994; Someone is working alongside you. Stay focused.</div>':'')
    +'</div></div>'
    +'<div class="sec"><div class="slabel">Cannot start? Break it down.</div><div class="card">'
    +[1,2,3].map(function(n){ return '<div class="crow"><div style="min-width:26px;height:26px;border-radius:50%;background:#F5F5F7;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#AEAEB2;flex-shrink:0;">'+n+'</div><input class="ifield" placeholder="Step '+n+'..." style="font-size:14px;"/></div>'; }).join('')
    +'</div><div style="font-size:12px;color:#AEAEB2;margin-top:8px;padding-left:2px;font-style:italic;">Barkley — The ADHD brain cannot initiate a big task. It can always start step one.</div></div>'
    +'</div>';

  document.getElementById('task-inp').oninput = function(){ S.oneFocus[TODAY]=this.value; saveS(); };
  var mr=document.getElementById('mode-rows');
  if(mr) mr.addEventListener('click', function(e){ var r=e.target.closest('[data-mode]'); if(r){ S.timerMode=r.dataset.mode; saveS(); renderFocus(); } });
  var bdt=document.getElementById('bd-tog');
  if(bdt) bdt.onclick=function(){ S.bodyDouble=!S.bodyDouble; saveS(); renderFocus(); };
  drawTimer();
}

// ── REGULATE ──────────────────────────────────────────────────────────────────
var regTab='checkin', openU=-1;
function renderRegulate(){
  document.getElementById('screen').innerHTML='<div class="page">'
    +'<div class="ph"><div class="ptitle">Regulate</div><div class="psub">Mate — Shame shuts the brain down. Compassion opens it.</div></div>'
    +'<div class="sec"><div class="egrid">'
      +'<button class="ebtn" id="rsd-btn" style="background:#F9F0FF;"><div style="font-size:24px;margin-bottom:8px;">&#128156;</div><div style="font-size:13px;font-weight:700;color:#AF52DE;">RSD Emergency</div><div style="font-size:11px;color:#AEAEB2;margin-top:3px;">Rejection hit hard</div></button>'
      +'<button class="ebtn" id="owh-btn" style="background:#FFF0EF;"><div style="font-size:24px;margin-bottom:8px;">&#127744;</div><div style="font-size:13px;font-weight:700;color:#FF3B30;">Overwhelm SOS</div><div style="font-size:11px;color:#AEAEB2;margin-top:3px;">Brain is spiraling</div></button>'
    +'</div></div>'
    +'<div class="sec"><div class="pillrow" id="reg-pills">'
      +'<button class="pill'+(regTab==='checkin'?' on':'')+'" data-rt="checkin">Check-In</button>'
      +'<button class="pill'+(regTab==='urge'?' on':'')+'" data-rt="urge">Urge Interceptor</button>'
      +'<button class="pill'+(regTab==='breathe'?' on':'')+'" data-rt="breathe">Breathe</button>'
    +'</div></div>'
    +'<div class="sec" id="reg-body"></div>'
    +'</div>';
  document.getElementById('rsd-btn').onclick = showRSD;
  document.getElementById('owh-btn').onclick = showOverwhelm;
  document.getElementById('reg-pills').addEventListener('click', function(e){ var b=e.target.closest('[data-rt]'); if(b){ regTab=b.dataset.rt; drawRegPills(); drawRegBody(); } });
  drawRegBody();
}
function drawRegPills(){ document.querySelectorAll('[data-rt]').forEach(function(b){ b.classList.toggle('on', b.dataset.rt===regTab); }); }
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
    +(em?'<div class="card csolo" style="margin-bottom:14px;background:#EBF3FD;"><div style="font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#0071E3;margin-bottom:6px;">Right now</div><div style="font-size:15px;color:#3A3A3C;line-height:1.6;">'+em.tip+'</div></div>':'')
    +'<div class="slabel" style="padding-left:2px;margin-top:18px;margin-bottom:10px;">Mate body scan</div>'
    +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;" id="body-grid">'
    +['Head','Chest','Stomach','Throat','Shoulders','Whole body'].map(function(area){
      var sel=(ci().bodyArea||'')===area;
      return '<button class="abtn'+(sel?' on':'')+'" data-area="'+area+'" style="padding:10px 8px;"><div style="font-size:12px;font-weight:'+(sel?600:400)+';">'+area+'</div></button>';
    }).join('')
    +'</div>'
    +(ci().bodyArea?'<div style="font-size:12px;color:#AEAEB2;margin-top:10px;padding-left:2px;font-style:italic;">Mate — The body always tells the truth. Emotions live there first.</div>':'');
}
function bindCheckin(){
  var eg=document.getElementById('em-grid');
  if(eg) eg.addEventListener('click', function(e){ var b=e.target.closest('[data-eid]'); if(b){ if(!S.checkins[TODAY]) S.checkins[TODAY]={}; S.checkins[TODAY].emotion=b.dataset.eid; saveS(); drawRegBody(); } });
  var bg=document.getElementById('body-grid');
  if(bg) bg.addEventListener('click', function(e){ var b=e.target.closest('[data-area]'); if(b){ if(!S.checkins[TODAY]) S.checkins[TODAY]={}; S.checkins[TODAY].bodyArea=b.dataset.area; saveS(); drawRegBody(); } });
}
function buildUrgeInline(){
  return '<div class="slabel" style="padding-left:2px;margin-bottom:10px;">What are you reaching for?</div>'
    +'<div style="font-size:13px;color:#AEAEB2;margin-bottom:16px;">Mate — Name the urge. Name the need behind it.</div>'
    +URGES.map(function(u){ return '<button class="urgbtn" data-uid="'+u.id+'"><span style="font-size:26px;">'+u.e+'</span><div><div style="font-size:14px;font-weight:500;color:#1D1D1F;">'+u.l+'</div><div style="font-size:11px;color:#AEAEB2;margin-top:2px;">Need: '+u.need+'</div></div><span style="margin-left:auto;color:#D1D1D6;">&#8250;</span></button>'; }).join('');
}
function buildBreathe(){
  return '<div class="slabel" style="padding-left:2px;margin-bottom:20px;">4 &#183; 4 &#183; 6 Breathing</div>'
    +'<div id="bcirc" class="bcirc"><div style="font-size:42px;line-height:1;">&#129775;</div><div style="font-size:15px;font-weight:500;color:#3A3A3C;">Tap to begin</div></div>'
    +'<div class="card csolo"><div style="font-size:14px;color:#636366;line-height:1.7;text-align:center;">Inhale 4 &#160;&#183;&#160; Hold 4 &#160;&#183;&#160; Exhale 6<br/><span style="font-size:12px;color:#AEAEB2;">The longer exhale activates your parasympathetic system.</span></div></div>';
}

// ── HABITS ────────────────────────────────────────────────────────────────────
var habTab='today', habAnchor='morning';
function renderHabits(){
  var done=doneCount();
  document.getElementById('screen').innerHTML='<div class="page">'
    +'<div class="ph"><div style="display:flex;justify-content:space-between;align-items:flex-end;"><div><div class="ptitle">Habits</div><div class="psub">Anchor-based. Never clock-based.</div></div>'
    +'<div style="text-align:right;"><div style="font-size:32px;font-weight:200;letter-spacing:-2px;color:'+(done===HABITS.length?'#34C759':'#1D1D1F')+';">'+done+'<span style="font-size:16px;font-weight:400;color:#AEAEB2;">/'+HABITS.length+'</span></div></div></div></div>'
    +'<div class="sec"><div class="pillrow" id="hab-pills"><button class="pill'+(habTab==='today'?' on':'')+'" data-ht="today">Today</button><button class="pill'+(habTab==='week'?' on':'')+'" data-ht="week">This Week</button></div></div>'
    +'<div class="sec" id="hab-body"></div></div>';
  document.getElementById('hab-pills').addEventListener('click', function(e){ var b=e.target.closest('[data-ht]'); if(b){ habTab=b.dataset.ht; drawHabPills(); drawHabBody(); } });
  drawHabBody();
}
function drawHabPills(){ document.querySelectorAll('[data-ht]').forEach(function(b){ b.classList.toggle('on', b.dataset.ht===habTab); }); }
function drawHabBody(){
  var el=document.getElementById('hab-body'); if(!el) return;
  if(habTab==='week'){ el.innerHTML=buildHabWeek(); return; }
  var ah=HABITS.filter(function(h){ return h.anchor===habAnchor; });
  var doneAll=ah.length>0&&ah.every(function(h){ return td()[h.id]; });
  el.innerHTML='<div class="agrid">'
    +Object.keys(ANCHORS).map(function(k){
      var a=ANCHORS[k];
      var cnt=HABITS.filter(function(h){ return h.anchor===k&&td()[h.id]; }).length;
      var tot=HABITS.filter(function(h){ return h.anchor===k; }).length;
      return '<button class="abtn'+(habAnchor===k?' on':'')+'" data-anc="'+k+'"><div class="aemoji">'+a.emoji+'</div><div class="alabel">'+a.label+'</div><div class="acount">'+cnt+'/'+tot+'</div></button>';
    }).join('')
    +'</div>'
    +'<div style="font-size:12px;color:#AEAEB2;margin-bottom:14px;font-style:italic;">'+ANCHORS[habAnchor].desc+'</div>'
    +'<div class="card" id="hab-rows">'+ah.map(habitRowHtml).join('')+'</div>'
    +(doneAll?'<div class="card csolo" style="margin-top:12px;background:#F0FAF2;text-align:center;"><div style="font-size:14px;font-weight:600;color:#34C759;">All '+habAnchor+' habits complete.</div><div style="font-size:12px;color:#AEAEB2;margin-top:4px;">Say yes out loud. That dopamine hit is real. (Barkley)</div></div>':'')
    +'<div class="qcard" style="margin-top:16px;"><div class="qtext"><strong style="font-weight:600;font-style:normal;color:#636366;">Never miss twice.</strong> One miss is an accident. Two misses is a new habit — the habit of not doing it.</div></div>';

  el.querySelectorAll('[data-anc]').forEach(function(b){ b.onclick=function(){ habAnchor=this.dataset.anc; drawHabBody(); }; });
  var hr=document.getElementById('hab-rows');
  if(hr) hr.addEventListener('click', function(e){ var r=e.target.closest('[data-hid]'); if(r) toggleHabit(r.dataset.hid); });
}
function buildHabWeek(){
  var wd=weekDates();
  return HABITS.map(function(h){
    var col=CAT_C[h.cat]||'#0071E3', streak=getStreak(h.id);
    var done7=wd.filter(function(d){ return (S.habitData[d]||{})[h.id]; }).length;
    return '<div class="card" style="margin-bottom:10px;">'
      +'<div class="crow"><span style="font-size:22px;">'+h.emoji+'</span><div style="flex:1;"><div class="lp">'+h.label+'</div><div class="ls">'+h.cat+' &#183; '+h.anchor+'</div></div><div style="font-size:13px;color:#AEAEB2;font-weight:500;">'+done7+'/7</div></div>'
      +'<div style="padding:0 16px 14px;">'
        +'<div class="wbars">'+wd.map(function(d){ return '<div class="wbar'+((S.habitData[d]||{})[h.id]?' on':'')+'"></div>'; }).join('')+'</div>'
        +(streak>1?'<div style="margin-top:8px;font-size:12px;color:#FF9500;font-weight:500;">&#128293; '+streak+'-day streak</div>':'')
      +'</div>'
    +'</div>';
  }).join('');
}

// ── WISDOM ────────────────────────────────────────────────────────────────────
var wisTab='insight', openUnd=-1;
function renderWisdom(){
  document.getElementById('screen').innerHTML='<div class="page">'
    +'<div class="ph"><div class="ptitle">Wisdom</div><div class="psub">Know your brain. Change your story.</div></div>'
    +'<div class="sec"><div class="winscard"><span style="font-size:36px;">&#127942;</span><div><div class="winsnum">'+(S.totalWins||0)+'</div><div class="winslbl">habit completions<br/>your brain is rewiring</div></div></div></div>'
    +'<div class="sec"><div class="pillrow" id="wis-pills"><button class="pill'+(wisTab==='insight'?' on':'')+'" data-wt="insight">Insights</button><button class="pill'+(wisTab==='journal'?' on':'')+'" data-wt="journal">Journal</button><button class="pill'+(wisTab==='understand'?' on':'')+'" data-wt="understand">Understand</button></div></div>'
    +'<div class="sec" id="wis-body"></div></div>';
  document.getElementById('wis-pills').addEventListener('click', function(e){ var b=e.target.closest('[data-wt]'); if(b){ wisTab=b.dataset.wt; drawWisPills(); drawWisBody(); } });
  drawWisBody();
}
function drawWisPills(){ document.querySelectorAll('[data-wt]').forEach(function(b){ b.classList.toggle('on', b.dataset.wt===wisTab); }); }
function drawWisBody(){
  var el=document.getElementById('wis-body'); if(!el) return;
  if(wisTab==='insight'){ el.innerHTML=buildInsights(); bindInsights(); }
  else if(wisTab==='journal'){ el.innerHTML=buildJournal(); bindJournal(); }
  else { el.innerHTML=buildUnderstand(); bindUnderstand(); }
}
function buildInsights(){
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
    +'</div>'
    +'</div>'
    +'<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:16px;">'
    +[{k:'barkley',l:'Dr. Barkley',c:'#0071E3'},{k:'mate',l:'Dr. Mate',c:'#FF9500'},{k:'hallowell',l:'Dr. Hallowell',c:'#34C759'},{k:'dodson',l:'Dr. Dodson',c:'#AF52DE'}].map(function(a){
      var fi=0;
      for(var i=0;i<INSIGHTS.length;i++){ if(INSIGHTS[i].a.toLowerCase().indexOf(a.k==='mate'?'mate':a.k.split(' ')[0])!==-1){ fi=i; break; } }
      return '<button data-fi="'+fi+'" style="padding:7px 16px;border-radius:100px;background:'+a.c+'12;border:1.5px solid '+a.c+'30;color:'+a.c+';font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;">'+a.l+'</button>';
    }).join('')
    +'</div>';
}
function bindInsights(){
  var p=document.getElementById('ins-prev'), n=document.getElementById('ins-next');
  if(p) p.onclick=function(){ S.insightIdx=(S.insightIdx-1+INSIGHTS.length)%INSIGHTS.length; saveS(); drawWisBody(); };
  if(n) n.onclick=function(){ S.insightIdx=(S.insightIdx+1)%INSIGHTS.length; saveS(); drawWisBody(); };
  document.querySelectorAll('[data-fi]').forEach(function(b){ b.onclick=function(){ S.insightIdx=parseInt(this.dataset.fi); saveS(); drawWisBody(); }; });
}
function buildJournal(){
  var saved=(S.journal||{})[TODAY]||'';
  return '<div class="card csolo" style="margin-bottom:14px;background:#EBF3FD;"><div style="font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#0071E3;margin-bottom:6px;">Today\'s prompt</div><div style="font-size:15px;color:#3A3A3C;line-height:1.6;font-style:italic;">&#8220;'+JOURNAL_PROMPTS[J_IDX]+'&#8221;</div></div>'
    +'<div class="card csolo" style="margin-bottom:12px;"><textarea id="jta" class="tafield" rows="8" placeholder="Write here. No format. No judgment. No rules.">'+esc(saved)+'</textarea></div>'
    +'<button class="btn btn-p" id="save-j">Save</button>'
    +'<div style="font-size:12px;color:#AEAEB2;text-align:center;margin-top:12px;font-style:italic;">Mate — Writing gives the unconscious a voice.</div>';
}
function bindJournal(){
  var btn=document.getElementById('save-j');
  if(btn) btn.onclick=function(){ var ta=document.getElementById('jta'); if(!ta) return; if(!S.journal) S.journal={}; S.journal[TODAY]=ta.value; saveS(); btn.textContent='Saved &#10003;'; btn.style.background='#34C759'; setTimeout(function(){ btn.textContent='Save'; btn.style.background=''; },2000); };
}
function buildUnderstand(){
  return UNDERSTAND.map(function(card,i){
    return '<div class="urow">'
      +'<div class="uhead" data-ui="'+i+'"><div style="display:flex;align-items:center;gap:12px;"><span style="font-size:22px;">'+card.i+'</span><div style="font-size:14px;font-weight:600;color:#1D1D1F;">'+card.t+'</div></div><span class="chev'+(openUnd===i?' open':'')+'">&#8250;</span></div>'
      +'<div class="ubody'+(openUnd===i?' open':'')+'">'+card.b+'</div>'
      +'</div>';
  }).join('');
}
function bindUnderstand(){
  document.querySelectorAll('[data-ui]').forEach(function(el){ el.onclick=function(){ openUnd=openUnd===parseInt(this.dataset.ui)?-1:parseInt(this.dataset.ui); drawWisBody(); }; });
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
function render(){
  if(CUR==='hq') renderHQ();
  else if(CUR==='focus') renderFocus();
  else if(CUR==='regulate') renderRegulate();
  else if(CUR==='habits') renderHabits();
  else if(CUR==='wisdom') renderWisdom();
}
render();
