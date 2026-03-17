
// FOCAL — Radical simplicity for the ADHD brain
// 3 tabs. 1 dominant element per screen. Zero navigation within navigation.

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

// 5 emotions only — most distinct, most actionable states
var EMOTIONS = [
  {id:'on',       l:'On fire',    e:'🔥', c:'#34C759', tip:'Rare and limited. Start your hardest task right now. Protect this window completely.'},
  {id:'ok',       l:'Okay',       e:'🙂', c:'#0071E3', tip:'Steady state. A focused 25-min block will move the needle. Start with your one thing.'},
  {id:'foggy',    l:'Foggy',      e:'🌫', c:'#AEAEB2', tip:'Walk for 10 minutes before anything else. This is the only reset that works right now.'},
  {id:'anxious',  l:'Anxious',    e:'😰', c:'#FF9500', tip:'Breathe out longer than in. Name 3 things you can touch. Then name just one task.'},
  {id:'low',      l:'Struggling', e:'😶', c:'#636366', tip:'The bar is lower today and that is okay. One tiny habit. One small win. That is enough.'},
];

var URGES = [
  {id:'phone',    l:'Phone / Social',    e:'📱', need:'Connection or novelty',
   r:'Text one real person something genuine right now. That meets the actual need. Scrolling only simulates it.'},
  {id:'food',     l:'Snacking',          e:'🍕', need:'Comfort or emotion',
   r:'Drink a full glass of water. Wait 5 minutes. Ask: is this hunger, or am I soothing something?'},
  {id:'watching', l:'Watching / Streaming', e:'📺', need:'Escape or numbing',
   r:'Write the name of what you are avoiding on paper. Just the name. Naming it makes it smaller.'},
  {id:'gaming',   l:'Gaming / Apps',     e:'🎮', need:'Achievement or escape',
   r:'Set a 5-minute timer and do the thing you are avoiding first. Just 5 minutes. Then decide.'},
];

var ANCHORS = {
  morning:   {label:'Morning',   emoji:'🌅', desc:'After waking — after coffee'},
  afternoon: {label:'Afternoon', emoji:'☀️', desc:'After lunch — after sitting down'},
  evening:   {label:'Evening',   emoji:'🌙', desc:'After dinner — before bed'},
};
var CAT_C = {health:'#34C759', focus:'#0071E3', dopamine:'#FF9500', mind:'#AF52DE'};
var WD = ['S','M','T','W','T','F','S'];
var TMODES = {micro:{l:'10 min',m:10,d:'Low energy day'}, sprint:{l:'25 min',m:25,d:'Focused session'}, turbo:{l:'50 min',m:50,d:'Deep work block'}};
var TODAY = new Date().toISOString().slice(0,10);

// ── STATE ──────────────────────────────────────────────────────────────────────
var KEY = 'focal_v9';
var S = {
  profile:{done:false,name:'',peakTime:'unpredictable',mainTrigger:'phone'},
  habits:null,
  habitData:{},checkins:{},urgeLog:[],
  oneFocus:{},journal:{},
  totalWins:0,timerMode:'sprint',bodyDouble:false,chatHistory:[],
};
function loadS(){
  try{ var d=localStorage.getItem(KEY); if(d){ var p=JSON.parse(d); Object.keys(p).forEach(function(k){S[k]=p[k];}); } }catch(e){}
}
function saveS(){ try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){} }
loadS();

function getHabits(){ return S.habits||DEFAULT_HABITS; }
function td(){ return S.habitData[TODAY]||{}; }
function ci(){ return S.checkins[TODAY]||{}; }
function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function pad(n){ return String(n).padStart(2,'0'); }
function weekDates(){
  var t=new Date(),d=t.getDay(),a=[];
  for(var i=0;i<7;i++){var x=new Date(t);x.setDate(t.getDate()-d+i);a.push(x.toISOString().slice(0,10));}
  return a;
}
function getStreak(id){
  var s=0,d=new Date();
  for(var i=0;i<365;i++){var k=d.toISOString().slice(0,10);if((S.habitData[k]||{})[id]){s++;d.setDate(d.getDate()-1);}else break;}
  return s;
}
function doneCount(){ return getHabits().filter(function(h){return td()[h.id];}).length; }

// ── NAV ────────────────────────────────────────────────────────────────────────
var CUR='now';
function go(s){
  CUR=s;
  document.querySelectorAll('.ni').forEach(function(b){b.classList.toggle('on',b.id==='n-'+s);});
  render();
  var sc=document.getElementById('screen');
  if(sc) sc.scrollTop=0;
}
['now','do','brain'].forEach(function(s){
  document.getElementById('n-'+s).onclick=function(){go(s);};
});

// ── HABIT TOGGLE ──────────────────────────────────────────────────────────────
function toggleHabit(id){
  if(!S.habitData[TODAY]) S.habitData[TODAY]={};
  var was=!!S.habitData[TODAY][id];
  S.habitData[TODAY][id]=!was;
  if(!was) S.totalWins=(S.totalWins||0)+1;
  saveS();
  // Update just the row without full re-render
  var row=document.querySelector('[data-hid="'+id+'"]');
  if(row){
    var done=S.habitData[TODAY][id];
    row.classList.toggle('done',done);
    var chk=row.querySelector('.chk'),lp=row.querySelector('.lp');
    var h=getHabits().filter(function(x){return x.id===id;})[0];
    if(chk){chk.className=done?'chk on':'chk pop';chk.textContent=done?'\u2713':(h?h.emoji:'');}
    if(lp) lp.className=done?'lp done':'lp';
    if(!done) setTimeout(function(){if(chk) chk.classList.remove('pop');},500);
  }
  // Update count badge
  var badge=document.getElementById('habit-count');
  if(badge) badge.textContent=doneCount()+'/'+getHabits().length;
  // Update ring if on now screen
  updateRingIfVisible();
}
function updateRingIfVisible(){
  var rf=document.getElementById('rprog'),rl=document.getElementById('rlabel');
  if(!rf||!rl) return;
  var done=doneCount(),total=getHabits().length,pct=total>0?done/total:0,C=2*Math.PI*60;
  rf.setAttribute('stroke-dashoffset',C*(1-pct));
  rf.setAttribute('stroke',pct===1?'#34C759':'#0071E3');
  rl.textContent=done+'/'+total;
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
function openModal(html){
  closeModal();
  var o=document.createElement('div');o.className='moverlay';o.id='modal';
  var s=document.createElement('div');s.className='msheet';
  s.innerHTML='<div class="mhandle"></div>'+html;
  o.appendChild(s);
  o.addEventListener('click',function(e){if(e.target===o) closeModal();});
  document.getElementById('app').appendChild(o);
}
function closeModal(){var m=document.getElementById('modal');if(m) m.remove();}

function steps(items,col){
  return items.map(function(s,i){
    var bg=col?'rgba(0,0,0,.05)':'#F5F5F5',c=col||'#636366';
    return '<div style="display:flex;gap:14px;margin-bottom:16px;align-items:flex-start;"><div class="step-num" style="background:'+bg+';color:'+c+';">'+(i+1)+'</div><div style="font-size:16px;color:#3A3A3C;line-height:1.6;">'+s+'</div></div>';
  }).join('');
}

// ── HABIT SHEET ───────────────────────────────────────────────────────────────
function showHabits(){
  var wd=weekDates();
  var habits=getHabits(),done=doneCount();
  var habHtml='';
  Object.keys(ANCHORS).forEach(function(anc){
    var ah=habits.filter(function(h){return h.anchor===anc;});
    if(!ah.length) return;
    habHtml+='<div style="font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#AEAEB2;margin:20px 0 10px 2px;">'+ANCHORS[anc].emoji+' '+ANCHORS[anc].label+'</div>';
    habHtml+='<div class="card" style="margin-bottom:8px;">';
    ah.forEach(function(h){
      var d=!!(td()[h.id]),col=CAT_C[h.cat]||'#0071E3',streak=getStreak(h.id);
      habHtml+='<div class="crow tap'+(d?' done':'')+'" data-hid="'+h.id+'">'
        +'<div class="chk'+(d?' on':'')+'">'+( d?'\u2713':h.emoji )+'</div>'
        +'<div style="flex:1;min-width:0;"><div class="lp'+(d?' done':'')+'">'+esc(h.label)+'</div><div class="ls">'+esc(h.tiny)+'</div></div>'
        +(streak>1?'<div class="sbadge">&#128293;'+streak+'</div>':'<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:'+col+';">'+h.cat+'</div>')
        +'</div>';
    });
    habHtml+='</div>';
  });
  openModal(
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">'
    +'<div class="mtitle" style="margin-bottom:0;">Habits</div>'
    +'<div style="font-size:28px;font-weight:200;letter-spacing:-1px;color:'+(done===habits.length?'#34C759':'#1D1D1F')+';">'+done+'<span style="font-size:15px;color:#AEAEB2;">/'+habits.length+'</span></div>'
    +'</div>'
    +'<div style="font-size:14px;color:#AEAEB2;margin-bottom:4px;">Anchor-based. Never clock-based.</div>'
    +habHtml
    +'<div style="margin-top:16px;padding:14px 16px;background:#F5F5F5;border-radius:16px;">'
    +'<div style="font-size:14px;color:#636366;line-height:1.7;font-style:italic;"><strong style="font-weight:600;font-style:normal;color:#3A3A3C;">Never miss twice.</strong> One miss is an accident. Two is a new habit &#8212; the habit of not doing it.</div></div>'
    +'<div style="margin-top:12px;"><button class="btn btn-g" id="m-add-hab" style="margin-bottom:10px;">+ Add habit</button>'
    +'<button class="btn btn-g" onclick="closeModal()">Close</button></div>'
  );
  document.getElementById('m-add-hab').onclick=function(){closeModal();showHabitForm(null);};
  // Bind habit toggles inside modal
  document.querySelectorAll('.msheet [data-hid]').forEach(function(row){
    row.onclick=function(){toggleHabit(this.dataset.hid);};
  });
}

function showHabitForm(editId){
  var h=editId?getHabits().filter(function(x){return x.id===editId;})[0]:null;
  var label=h?h.label:'', emoji=h?h.emoji:'', tiny=h?h.tiny:'', anc=h?h.anchor:'morning', cat=h?h.cat:'health';
  openModal(
    '<div class="mtitle">'+(editId?'Edit Habit':'New Habit')+'</div>'
    +'<div style="margin-bottom:14px;"><div style="font-size:12px;font-weight:600;color:#AEAEB2;text-transform:uppercase;letter-spacing:.04em;margin-bottom:7px;">Habit name</div>'
    +'<input class="form-input" id="f-label" placeholder="e.g. Drink water first" value="'+esc(label)+'"/></div>'
    +'<div style="display:grid;grid-template-columns:72px 1fr;gap:12px;margin-bottom:14px;">'
    +'<div><div style="font-size:12px;font-weight:600;color:#AEAEB2;text-transform:uppercase;letter-spacing:.04em;margin-bottom:7px;">Emoji</div>'
    +'<input class="form-input" id="f-emoji" value="'+esc(emoji)+'" style="text-align:center;font-size:22px;" placeholder="&#10022;"/></div>'
    +'<div><div style="font-size:12px;font-weight:600;color:#AEAEB2;text-transform:uppercase;letter-spacing:.04em;margin-bottom:7px;">Tiny version</div>'
    +'<input class="form-input" id="f-tiny" placeholder="Minimum viable" value="'+esc(tiny)+'"/></div>'
    +'</div>'
    +'<div style="margin-bottom:14px;"><div style="font-size:12px;font-weight:600;color:#AEAEB2;text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px;">When</div>'
    +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;" id="f-anc">'
    +Object.keys(ANCHORS).map(function(k){
      return '<button style="background:'+(anc===k?'#EBF3FD':'#F5F5F5')+';border:1.5px solid '+(anc===k?'#0071E3':'transparent')+';border-radius:14px;padding:12px 6px;cursor:pointer;font-family:inherit;text-align:center;" data-anc="'+k+'">'
        +'<div style="font-size:18px;margin-bottom:3px;">'+ANCHORS[k].emoji+'</div>'
        +'<div style="font-size:11px;font-weight:600;color:'+(anc===k?'#0071E3':'#3A3A3C')+';">'+ANCHORS[k].label+'</div>'
        +'</button>';
    }).join('')
    +'</div></div>'
    +'<div style="margin-bottom:24px;"><div style="font-size:12px;font-weight:600;color:#AEAEB2;text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px;">Category</div>'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;" id="f-cat">'
    +Object.keys(CAT_C).map(function(k){
      var c=CAT_C[k],active=cat===k;
      return '<button data-cat="'+k+'" style="background:'+(active?c+'18':'#F5F5F5')+';border:1.5px solid '+(active?c:'transparent')+';border-radius:10px;padding:9px 4px;cursor:pointer;font-family:inherit;font-size:11px;font-weight:500;color:'+(active?c:'#636366')+';text-transform:capitalize;">'+k+'</button>';
    }).join('')
    +'</div></div>'
    +'<button class="btn btn-p" id="f-save" style="margin-bottom:10px;">'+(editId?'Save changes':'Add habit')+'</button>'
    +(editId?'<button class="btn btn-d" id="f-del" style="margin-bottom:10px;">Delete</button>':'')
    +'<button class="btn btn-g" onclick="closeModal()">Cancel</button>'
  );
  var selAnc=anc,selCat=cat;
  document.getElementById('f-anc').addEventListener('click',function(e){
    var b=e.target.closest('[data-anc]');if(!b) return;
    selAnc=b.dataset.anc;
    document.querySelectorAll('[data-anc]').forEach(function(x){
      var on=x.dataset.anc===selAnc;
      x.style.background=on?'#EBF3FD':'#F5F5F5';
      x.style.borderColor=on?'#0071E3':'transparent';
      x.querySelector('div:last-child').style.color=on?'#0071E3':'#3A3A3C';
    });
  });
  document.getElementById('f-cat').addEventListener('click',function(e){
    var b=e.target.closest('[data-cat]');if(!b) return;
    selCat=b.dataset.cat;
    document.querySelectorAll('[data-cat]').forEach(function(x){
      var c=CAT_C[x.dataset.cat]||'#636366',on=x.dataset.cat===selCat;
      x.style.background=on?c+'18':'#F5F5F5';x.style.borderColor=on?c:'transparent';x.style.color=on?c:'#636366';
    });
  });
  document.getElementById('f-save').onclick=function(){
    var lv=document.getElementById('f-label').value.trim();if(!lv) return;
    var ev=document.getElementById('f-emoji').value.trim()||'✦';
    var tv=document.getElementById('f-tiny').value.trim();
    if(!S.habits) S.habits=JSON.parse(JSON.stringify(DEFAULT_HABITS));
    if(editId){
      var idx=S.habits.findIndex(function(h){return h.id===editId;});
      if(idx!==-1) S.habits[idx]={id:editId,label:lv,emoji:ev,tiny:tv,anchor:selAnc,cat:selCat};
    } else {
      S.habits.push({id:'c_'+Date.now(),label:lv,emoji:ev,tiny:tv,anchor:selAnc,cat:selCat});
    }
    saveS();closeModal();
  };
  var del=document.getElementById('f-del');
  if(del) del.onclick=function(){
    if(!confirm('Delete "'+label+'"?')) return;
    if(!S.habits) S.habits=JSON.parse(JSON.stringify(DEFAULT_HABITS));
    S.habits=S.habits.filter(function(h){return h.id!==editId;});
    saveS();closeModal();
  };
}

// ── URGE SHEET ────────────────────────────────────────────────────────────────
function showUrge(){
  var html='<div class="mtitle">Before you act on that urge.</div>'
    +'<div style="font-size:15px;color:#AEAEB2;margin-bottom:24px;line-height:1.5;">Name it. Find the need underneath it.</div>';
  URGES.forEach(function(u){
    html+='<button onclick="showUrgeDetail(\''+u.id+'\')" style="display:flex;align-items:center;gap:14px;padding:15px 18px;background:#F5F5F5;border-radius:16px;border:none;cursor:pointer;width:100%;margin-bottom:10px;font-family:inherit;text-align:left;">'
      +'<span style="font-size:28px;">'+u.e+'</span>'
      +'<div><div style="font-size:16px;font-weight:500;color:#1D1D1F;">'+u.l+'</div>'
      +'<div style="font-size:13px;color:#AEAEB2;margin-top:2px;">Need: '+u.need+'</div></div>'
      +'<span style="margin-left:auto;color:#D1D1D6;font-size:18px;">&#8250;</span>'
      +'</button>';
  });
  openModal(html);
}
function showUrgeDetail(id){
  var u=URGES.filter(function(x){return x.id===id;})[0];if(!u) return;
  openModal(
    '<div style="font-size:44px;margin-bottom:14px;">'+u.e+'</div>'
    +'<div class="mtitle" style="color:#FF9500;">Before you act on this</div>'
    +'<div style="font-size:14px;color:#AEAEB2;margin-bottom:20px;">Need underneath: '+u.need+'</div>'
    +'<div style="background:#F5F5F5;border-radius:18px;padding:18px 20px;margin-bottom:20px;">'
    +'<div style="font-size:17px;color:#3A3A3C;line-height:1.75;">'+u.r+'</div></div>'
    +'<button class="btn btn-s" id="m-redirected" style="margin-bottom:10px;">&#10003; Urge redirected</button>'
    +'<button class="btn btn-g" onclick="showUrge()">&#8592; Back</button>'
  );
  document.getElementById('m-redirected').onclick=function(){
    S.urgeLog.push({date:TODAY,time:new Date().toTimeString().slice(0,5),type:id,redirected:true});
    if(S.urgeLog.length>500) S.urgeLog=S.urgeLog.slice(-500);
    saveS();closeModal();
  };
}

// ── RSD / OVERWHELM ───────────────────────────────────────────────────────────
function showRSD(){
  openModal(
    '<div class="mtitle" style="color:#AF52DE;">Rejection Sensitive Dysphoria</div>'
    +'<div class="msub">Dr. William Dodson &#8212; affects 99% of people with ADHD</div>'
    +'<div style="background:rgba(175,82,222,.07);border-radius:16px;padding:16px;margin-bottom:20px;font-size:15px;color:#3A3A3C;line-height:1.7;">What you are feeling is <strong>neurological</strong>, not weakness. Your nervous system fires in a way most people\'s simply does not. Naming it as RSD is the first step to responding instead of reacting.</div>'
    +steps(['Say out loud: This is RSD. This is my nervous system, not reality.','Cold water on your wrists or face. Return to your body.','Make no decisions and send no messages for at least one hour.','Your sensitivity is not a flaw. It is the same trait that makes you deeply perceptive.'],'#AF52DE')
    +'<button class="btn btn-g" id="rsd-ok" style="margin-top:8px;">I see it. I name it. I\'m okay.</button>'
  );
  document.getElementById('rsd-ok').onclick=closeModal;
}
function showOverwhelm(){
  openModal(
    '<div class="mtitle" style="color:#FF3B30;">Overwhelm Protocol</div>'
    +'<div class="msub">Barkley &#8212; Simplify immediately. Complexity is the enemy.</div>'
    +steps(['Stop. You do not need to solve everything right now.','Three slow breaths. Out longer than in.','Name one thing &#8212; just one &#8212; that matters today.','Write everything else down and tell it: not now.','Do that one thing for exactly five minutes. Only five.'],'#FF3B30')
    +'<button class="btn btn-d" id="owh-ok" style="margin-top:8px;">One thing. Five minutes. Go.</button>'
  );
  document.getElementById('owh-ok').onclick=closeModal;
}

// ── TIMER ─────────────────────────────────────────────────────────────────────
var tPhase='idle',tLeft=null,tTotal=0,tInt=null;
function startTimer(){
  var m=TMODES[S.timerMode].m;tTotal=m*60;tLeft=tTotal;tPhase='working';
  clearInterval(tInt);
  tInt=setInterval(function(){
    tLeft--;
    if(tLeft<=0){clearInterval(tInt);tPhase='break';}
    drawTimer();
  },1000);
  drawTimer();
}
function pauseTimer(){clearInterval(tInt);tPhase='paused';drawTimer();}
function resumeTimer(){
  tPhase='working';
  tInt=setInterval(function(){tLeft--;if(tLeft<=0){clearInterval(tInt);tPhase='break';}drawTimer();},1000);
  drawTimer();
}
function resetTimer(){clearInterval(tInt);tLeft=null;tPhase='idle';drawTimer();}

function drawTimer(){
  var td2=document.getElementById('t-ring'),tc=document.getElementById('t-ctrl');if(!td2) return;
  var left=tLeft!=null?tLeft:(tTotal||TMODES[S.timerMode].m*60);
  var total=tTotal||TMODES[S.timerMode].m*60,pct=total>0?(total-left)/total:0,C=2*Math.PI*100;
  var stroke=tPhase==='break'?'#34C759':tPhase==='working'?'#0071E3':'#D1D1D6';
  td2.innerHTML='<svg width="260" height="260" viewBox="0 0 260 260" style="display:block;overflow:visible;">'
    +'<circle cx="130" cy="130" r="100" fill="none" stroke="rgba(0,0,0,.07)" stroke-width="7"/>'
    +'<circle cx="130" cy="130" r="100" fill="none" class="tring-fill" stroke="'+stroke+'" stroke-dasharray="'+C+'" stroke-dashoffset="'+C*(1-pct)+'" style="transform:rotate(-90deg);transform-origin:50% 50%;transition:stroke-dashoffset 1s linear,stroke .4s;"/>'
    +'</svg>'
    +'<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;">'
    +'<div style="font-size:64px;font-weight:200;letter-spacing:-4px;color:'+(tPhase==='break'?'#34C759':'#1D1D1F')+';line-height:1;font-variant-numeric:tabular-nums;">'+pad(Math.floor(left/60))+':'+pad(left%60)+'</div>'
    +'<div style="font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#AEAEB2;">'
    +{idle:'Ready',working:'Working',paused:'Paused',break:'Break'}[tPhase]
    +'</div></div>';
  if(!tc) return;
  if(tPhase==='idle'){
    tc.innerHTML='<button class="btn btn-p" id="t-start" style="font-size:18px;padding:18px;">Begin</button>';
    document.getElementById('t-start').onclick=startTimer;
  } else if(tPhase==='working'){
    tc.innerHTML='<div style="display:flex;gap:10px;">'
      +'<button class="btn btn-g btn-sm" id="t-pause">Pause</button>'
      +'<button class="btn btn-g btn-sm" id="t-reset">Reset</button>'
      +'<button class="btn btn-sm" style="width:auto;padding:10px 20px;background:#FFF0EF;color:#FF3B30;border:none;border-radius:16px;font-family:inherit;font-size:15px;font-weight:500;cursor:pointer;" id="t-stuck">Stuck?</button>'
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
    tc.innerHTML='<div style="background:#F0FAF2;border-radius:18px;padding:20px;margin-bottom:12px;text-align:center;">'
      +'<div style="font-size:13px;font-weight:700;letter-spacing:.06em;color:#34C759;text-transform:uppercase;margin-bottom:8px;">Break &#8212; Move your body</div>'
      +'<div style="font-size:17px;font-weight:500;color:#3A3A3C;">Step outside for 60 seconds</div>'
      +'<div style="font-size:13px;color:#AEAEB2;margin-top:4px;">Movement restores dopamine. Barkley: this is essential.</div></div>'
      +'<button class="btn btn-s" id="t-next" style="font-size:17px;">Start Next Session</button>';
    document.getElementById('t-next').onclick=resetTimer;
  }
}

function showStuck(){
  openModal(
    '<div class="mtitle">You are stuck.</div>'
    +'<div class="msub">Normal. Here is what actually works.</div>'
    +steps(['Change your physical position &#8212; stand, floor, different room.','Read only the first sentence of the task out loud.','Tell yourself: I only need to work for two minutes.','Is this the wrong task for your energy right now? Consider switching.'],'#0071E3')
    +'<button class="btn btn-p" id="stk-ok" style="margin-top:8px;">Back to work</button>'
  );
  document.getElementById('stk-ok').onclick=closeModal;
}

// ── BREATHING ─────────────────────────────────────────────────────────────────
var bPhase='idle',bSec=0,bCount=0,bInt=null;
function startBreath(){
  bPhase='inhale';bSec=0;bCount=0;clearInterval(bInt);
  bInt=setInterval(function(){
    bSec++;
    if(bPhase==='inhale'&&bSec>=4){bPhase='hold';bSec=0;}
    else if(bPhase==='hold'&&bSec>=4){bPhase='exhale';bSec=0;}
    else if(bPhase==='exhale'&&bSec>=6){bPhase='inhale';bSec=0;bCount++;}
    drawBreath();
  },1000);
  drawBreath();
}
function stopBreath(){clearInterval(bInt);bPhase='idle';drawBreath();}
function drawBreath(){
  var el=document.getElementById('bcirc');if(!el) return;
  var icons={idle:'&#129775;',inhale:'&#11014;&#65039;',hold:'&#9208;&#65039;',exhale:'&#11015;&#65039;'};
  var labels={idle:'Tap to begin',inhale:'Breathe in',hold:'Hold',exhale:'Breathe out'};
  el.className='bcirc'+(bPhase!=='idle'?' '+bPhase:'');
  el.innerHTML='<div style="font-size:48px;line-height:1;">'+icons[bPhase]+'</div>'
    +'<div style="font-size:16px;font-weight:500;color:#3A3A3C;">'+labels[bPhase]+'</div>'
    +(bCount>0?'<div style="font-size:13px;color:#AEAEB2;">Cycle '+bCount+'</div>':'');
}

// ── ONBOARDING ────────────────────────────────────────────────────────────────
var OB=1;
function renderOnboarding(){
  document.getElementById('screen').style.display='none';
  document.getElementById('nav').style.display='none';
  var el=document.createElement('div');el.id='ob';el.className='ob';
  document.getElementById('app').appendChild(el);
  drawOb();
}
function drawOb(){
  var el=document.getElementById('ob');if(!el) return;
  var dots='<div style="display:flex;gap:7px;margin-bottom:36px;">'
    +[0,1,2].map(function(i){return '<div style="width:'+(i===OB-1?22:7)+'px;height:7px;border-radius:4px;background:'+(i===OB-1?'#0071E3':'#D1D1D6')+';transition:all .3s;"></div>';}).join('')
    +'</div>';
  if(OB===1){
    el.innerHTML='<div style="font-size:64px;margin-bottom:28px;">&#129504;</div>'
      +'<div style="font-size:30px;font-weight:700;letter-spacing:-.5px;text-align:center;margin-bottom:10px;">Welcome to Focal</div>'
      +'<div style="font-size:16px;color:#AEAEB2;text-align:center;line-height:1.6;margin-bottom:36px;max-width:280px;">Built specifically for the ADHD brain. Radically simple.</div>'
      +dots
      +'<div style="width:100%;max-width:340px;font-size:13px;font-weight:600;color:#AEAEB2;letter-spacing:.04em;text-transform:uppercase;margin-bottom:8px;text-align:left;">What should I call you?</div>'
      +'<input class="inp" id="ob-name" placeholder="Your first name" autocomplete="given-name" value="'+esc(S.profile.name)+'" style="text-align:center;font-size:20px;margin-bottom:24px;max-width:340px;border-radius:16px;background:#F5F5F5;"/>'
      +'<button class="btn btn-p" id="ob-n1" style="max-width:340px;font-size:18px;">Continue</button>';
    var inp=document.getElementById('ob-name');inp.focus();
    document.getElementById('ob-n1').onclick=function(){var v=inp.value.trim();if(!v) return;S.profile.name=v;OB=2;drawOb();};
    inp.onkeydown=function(e){if(e.key==='Enter') document.getElementById('ob-n1').click();};
  } else if(OB===2){
    el.innerHTML='<div style="font-size:64px;margin-bottom:28px;">&#9889;</div>'
      +'<div style="font-size:30px;font-weight:700;letter-spacing:-.5px;text-align:center;margin-bottom:10px;">Hi '+esc(S.profile.name)+'</div>'
      +'<div style="font-size:16px;color:#AEAEB2;text-align:center;line-height:1.6;margin-bottom:36px;max-width:280px;">When does your brain usually have its best energy?</div>'
      +dots
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%;max-width:340px;margin-bottom:28px;" id="ob-peak">'
      +[['morning','&#127749;','Morning'],['afternoon','&#9728;&#65039;','Afternoon'],['evening','&#127769;','Evening'],['unpredictable','&#127774;','Unpredictable']].map(function(p){
        return '<button class="ob-choice'+(S.profile.peakTime===p[0]?' on':'')+'" data-pt="'+p[0]+'">'
          +'<div style="font-size:28px;margin-bottom:7px;">'+p[1]+'</div>'
          +'<div style="font-size:14px;font-weight:600;">'+p[2]+'</div></button>';
      }).join('')
      +'</div>'
      +'<button class="btn btn-p" id="ob-n2" style="max-width:340px;font-size:18px;">Continue</button>'
      +'<button style="background:none;border:none;font-family:inherit;font-size:15px;color:#AEAEB2;cursor:pointer;margin-top:16px;padding:8px;" id="ob-b2">&#8592; Back</button>';
    document.getElementById('ob-peak').addEventListener('click',function(e){
      var b=e.target.closest('[data-pt]');if(!b) return;
      S.profile.peakTime=b.dataset.pt;
      document.querySelectorAll('[data-pt]').forEach(function(x){x.classList.toggle('on',x.dataset.pt===S.profile.peakTime);});
    });
    document.getElementById('ob-n2').onclick=function(){OB=3;drawOb();};
    document.getElementById('ob-b2').onclick=function(){OB=1;drawOb();};
  } else {
    el.innerHTML='<div style="font-size:64px;margin-bottom:28px;">&#127945;</div>'
      +'<div style="font-size:30px;font-weight:700;letter-spacing:-.5px;text-align:center;margin-bottom:10px;">One last thing</div>'
      +'<div style="font-size:16px;color:#AEAEB2;text-align:center;line-height:1.6;margin-bottom:36px;max-width:280px;">What\'s your biggest dopamine trap? Focal will track it.</div>'
      +dots
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%;max-width:340px;margin-bottom:28px;" id="ob-trig">'
      +[['phone','&#128241;','Phone'],['food','&#127829;','Snacking'],['watching','&#128250;','Streaming'],['gaming','&#127918;','Gaming']].map(function(p){
        return '<button class="ob-choice'+(S.profile.mainTrigger===p[0]?' on':'')+'" data-trig="'+p[0]+'">'
          +'<div style="font-size:28px;margin-bottom:7px;">'+p[1]+'</div>'
          +'<div style="font-size:14px;font-weight:600;">'+p[2]+'</div></button>';
      }).join('')
      +'</div>'
      +'<button class="btn btn-p" id="ob-done" style="max-width:340px;font-size:18px;">Let\'s go &#8594;</button>'
      +'<button style="background:none;border:none;font-family:inherit;font-size:15px;color:#AEAEB2;cursor:pointer;margin-top:16px;padding:8px;" id="ob-b3">&#8592; Back</button>';
    document.getElementById('ob-trig').addEventListener('click',function(e){
      var b=e.target.closest('[data-trig]');if(!b) return;
      S.profile.mainTrigger=b.dataset.trig;
      document.querySelectorAll('[data-trig]').forEach(function(x){x.classList.toggle('on',x.dataset.trig===S.profile.mainTrigger);});
    });
    document.getElementById('ob-done').onclick=function(){
      S.profile.done=true;saveS();
      var o=document.getElementById('ob');if(o) o.remove();
      document.getElementById('screen').style.display='';
      document.getElementById('nav').style.display='';
      render();
    };
    document.getElementById('ob-b3').onclick=function(){OB=2;drawOb();};
  }
}

// ── NOW SCREEN ────────────────────────────────────────────────────────────────
function renderNow(){
  var wd=weekDates();
  var done=doneCount(),total=getHabits().length,pct=total>0?done/total:0,C=2*Math.PI*60;
  var h=new Date().getHours();
  var name=S.profile.name||'';
  var gr=(h<5?'Still up':(h<12?'Good morning':(h<17?'Good afternoon':'Good evening')))+(name?', '+name:'')+(h<5?'?':'.');
  var fv=S.oneFocus[TODAY]||'';
  var curEm=EMOTIONS.filter(function(e){return e.id===ci().emotion;})[0];

  // week mini bars
  var weekBars=wd.map(function(date){
    var cnt=getHabits().filter(function(hh){return (S.habitData[date]||{})[hh.id];}).length;
    var isT=date===TODAY;
    return '<div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;">'
      +'<div style="font-size:9px;font-weight:500;color:'+(isT?'#0071E3':'#D1D1D6')+';">'+WD[new Date(date+'T12:00').getDay()]+'</div>'
      +'<div style="width:100%;aspect-ratio:1;border-radius:8px;background:'+(cnt>0?'#EDFAF0':'#F5F5F5')+';border:1.5px solid '+(isT?'#0071E3':'transparent')+';display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;color:'+(isT?'#0071E3':cnt>0?'#34C759':'#D1D1D6')+';">'+(cnt>0?cnt:'·')+'</div>'
      +'</div>';
  }).join('');

  document.getElementById('screen').innerHTML=
    '<div style="padding:52px 24px 28px;min-height:100%;">'

    // Greeting — large, dominant
    +'<div style="font-size:34px;font-weight:700;letter-spacing:-.5px;line-height:1.1;margin-bottom:6px;">'+gr+'</div>'
    +'<div style="font-size:15px;color:#AEAEB2;margin-bottom:32px;">'+new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})+'</div>'

    // THE ONE THING — biggest element on screen
    +'<div style="font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#AEAEB2;margin-bottom:10px;">Your one thing today</div>'
    +'<input class="inp" id="focus-inp" placeholder="What makes today a win?" style="font-size:20px;font-weight:600;padding:18px 20px;border-radius:18px;background:#F5F5F5;margin-bottom:8px;" value="'+esc(fv)+'"/>'
    +(fv?'<div style="font-size:13px;color:#AEAEB2;margin-bottom:32px;padding-left:4px;">Barkley — one priority. Everything else is noise until this is done.</div>':'<div style="margin-bottom:32px;"></div>')

    // EMOTION CHECK — 5 options, big and clear
    +'<div style="font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#AEAEB2;margin-bottom:12px;">How are you right now?</div>'
    +'<div style="display:flex;gap:10px;margin-bottom:'+(curEm?'16px':'32px')+' ;" id="em-row">'
    +EMOTIONS.map(function(e){
      var on=ci().emotion===e.id;
      return '<button data-eid="'+e.id+'" style="flex:1;background:'+(on?e.c+'15':'#F5F5F5')+';border:2px solid '+(on?e.c:'transparent')+';border-radius:16px;padding:10px 4px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:5px;transition:all .15s;">'
        +'<span style="font-size:26px;line-height:1;">'+e.e+'</span>'
        +'<span style="font-size:9px;font-weight:600;color:'+(on?e.c:'#AEAEB2')+';text-align:center;line-height:1.2;">'+e.l+'</span>'
        +'</button>';
    }).join('')
    +'</div>'
    +(curEm?'<div style="background:'+curEm.c+'0F;border-left:3px solid '+curEm.c+';border-radius:0 14px 14px 0;padding:12px 16px;margin-bottom:32px;font-size:15px;color:#3A3A3C;line-height:1.6;">'+curEm.tip+'</div>':'')

    // HABITS — single number + tap to expand
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">'
    +'<div style="font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#AEAEB2;">Habits</div>'
    +'<button onclick="showHabits()" style="background:none;border:none;font-size:13px;font-weight:500;color:#0071E3;cursor:pointer;font-family:inherit;">View all &#8250;</button>'
    +'</div>'
    +'<div style="display:flex;align-items:center;gap:16px;background:#F5F5F5;border-radius:18px;padding:16px 20px;margin-bottom:32px;" onclick="showHabits()" id="habits-summary-card" style="cursor:pointer;">'
    +'<div style="position:relative;width:56px;height:56px;flex-shrink:0;">'
    +'<svg width="56" height="56" viewBox="0 0 56 56" style="overflow:visible;">'
    +'<circle cx="28" cy="28" r="22" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="4"/>'
    +'<circle id="rprog" cx="28" cy="28" r="22" fill="none" stroke="'+(pct===1?'#34C759':'#0071E3')+'" stroke-width="4" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+C*(1-pct)+'" style="transform:rotate(-90deg);transform-origin:50% 50%;transition:stroke-dashoffset .6s;"/>'
    +'</svg>'
    +'<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">'
    +'<span id="rlabel" style="font-size:12px;font-weight:700;color:'+(pct===1?'#34C759':'#1D1D1F')+';">'+done+'/'+total+'</span>'
    +'</div></div>'
    +'<div>'
    +'<div style="font-size:18px;font-weight:600;color:'+(done===total?'#34C759':'#1D1D1F')+';">'+(done===total?'All done today &#10003;':done+' of '+total+' habits done')+'</div>'
    +'<div style="font-size:14px;color:#AEAEB2;margin-top:3px;">Tap to check off habits</div>'
    +'</div>'
    +'</div>'

    // WEEK STRIP — small, at bottom
    +'<div style="font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#AEAEB2;margin-bottom:10px;">This week</div>'
    +'<div style="display:flex;gap:5px;justify-content:space-between;background:#F5F5F5;border-radius:16px;padding:14px;">'+weekBars+'</div>'
    +'</div>';

  // Bind focus input
  document.getElementById('focus-inp').oninput=function(){S.oneFocus[TODAY]=this.value;saveS();};

  // Bind emotion buttons
  document.getElementById('em-row').addEventListener('click',function(e){
    var b=e.target.closest('[data-eid]');if(!b) return;
    if(!S.checkins[TODAY]) S.checkins[TODAY]={};
    S.checkins[TODAY].emotion=b.dataset.eid;
    S.checkins[TODAY].time=new Date().toTimeString().slice(0,5);
    saveS();renderNow();
  });

  // Bind habits summary card
  var hsc=document.getElementById('habits-summary-card');
  if(hsc) hsc.style.cursor='pointer';
}

// ── DO SCREEN ─────────────────────────────────────────────────────────────────
function renderDo(){
  var bodyDouble=S.bodyDouble||false;
  var modeButtons=Object.keys(TMODES).map(function(k){
    var m=TMODES[k],active=S.timerMode===k;
    return '<button data-mode="'+k+'" style="flex:1;padding:12px 6px;background:'+(active?'#0071E3':'#F5F5F5')+';color:'+(active?'#fff':'#636366')+';border:none;border-radius:14px;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;text-align:center;transition:all .15s;">'
      +'<div style="margin-bottom:2px;">'+m.l+'</div>'
      +'<div style="font-size:11px;font-weight:400;opacity:.8;">'+m.d+'</div>'
      +'</button>';
  }).join('');

  document.getElementById('screen').innerHTML=
    '<div style="padding:52px 24px 28px;display:flex;flex-direction:column;align-items:center;">'

    +'<div style="font-size:34px;font-weight:700;letter-spacing:-.5px;margin-bottom:4px;width:100%;">Focus</div>'
    +'<div style="font-size:15px;color:#AEAEB2;margin-bottom:28px;width:100%;">Make time visible. Make it tangible.</div>'

    // Mode picker — only shown when idle
    +(tPhase==='idle'
      ? '<div style="display:flex;gap:8px;width:100%;margin-bottom:28px;" id="mode-row">'+modeButtons+'</div>'
      : '')

    // Timer — the dominant element
    +'<div id="t-ring" style="position:relative;width:260px;height:260px;margin-bottom:24px;"></div>'
    +'<div id="t-ctrl" style="width:100%;max-width:300px;"></div>'

    // Body double — secondary, below everything
    +'<div style="width:100%;margin-top:28px;background:#F5F5F5;border-radius:18px;padding:16px 20px;">'
    +'<div style="display:flex;align-items:center;justify-content:space-between;">'
    +'<div>'
    +'<div style="font-size:16px;font-weight:500;">Body Double Mode</div>'
    +'<div style="font-size:13px;color:#AEAEB2;margin-top:2px;">Working alongside others activates the ADHD brain</div>'
    +'</div>'
    +'<div id="bd-tog" style="width:51px;height:31px;border-radius:100px;background:'+(bodyDouble?'#34C759':'#D1D1D6')+';position:relative;cursor:pointer;transition:background .2s;flex-shrink:0;">'
    +'<div style="position:absolute;top:2px;left:'+(bodyDouble?'22px':'2px')+';width:27px;height:27px;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.2);transition:left .22s;"></div>'
    +'</div></div>'
    +(bodyDouble?'<div style="margin-top:12px;font-size:14px;color:#34C759;">&#128994; Someone is working alongside you. Stay focused.</div>':'')
    +'</div>'

    // Urge button — prominent but below timer
    +'<button onclick="showUrge()" style="width:100%;margin-top:14px;padding:16px;background:rgba(255,149,0,.08);border:1.5px solid rgba(255,149,0,.2);border-radius:18px;font-family:inherit;font-size:16px;font-weight:600;color:#FF9500;cursor:pointer;">&#9889; Feeling an urge? Tap here first</button>'

    +'</div>';

  // Mode selector
  var mr=document.getElementById('mode-row');
  if(mr) mr.addEventListener('click',function(e){
    var b=e.target.closest('[data-mode]');if(!b) return;
    S.timerMode=b.dataset.mode;saveS();renderDo();
  });

  // Body double toggle
  var bdt=document.getElementById('bd-tog');
  if(bdt) bdt.onclick=function(){S.bodyDouble=!S.bodyDouble;saveS();renderDo();};

  drawTimer();
}

// ── BRAIN SCREEN ──────────────────────────────────────────────────────────────
var brainMessages=[];
var brainThinking=false;

// Intent detection
var INTENTS=[
  {p:/(can'?t|cannot|won'?t).*(start|begin|do|focus|initiate)/i, id:'cant_start'},
  {p:/(overwhelm|spiral|too much|drowning|panic|everything)/i,    id:'overwhelmed'},
  {p:/(rsd|reject|criticism|shame|worthless|stupid|broken|fail)/i,id:'rsd'},
  {p:/(phone|scroll|social|instagram|tiktok|twitter|reddit)/i,    id:'phone_urge'},
  {p:/(food|snack|eat|binge|sugar)/i,                             id:'food_urge'},
  {p:/(pattern|data|week|trend|how am i doing|summary|analys)/i,  id:'week_analysis'},
  {p:/(habit|miss|skip|forget|fail)/i,                            id:'habit_check'},
  {p:/(focus|what should|do now|priorit|next)/i,                  id:'what_next'},
  {p:/(exercise|move|walk|gym|run|workout)/i,                     id:'exercise'},
  {p:/(sleep|tired|exhaust)/i,                                    id:'sleep'},
  {p:/(stuck|block|procrastin)/i,                                 id:'stuck'},
  {p:/(angry|frustrat|irritat|rage)/i,                            id:'frustrated'},
  {p:/(sad|down|depress|hopeless|pointless)/i,                    id:'sad'},
  {p:/(anxious|anxiety|worry|stress)/i,                           id:'anxious'},
  {p:/(good|great|won|win|did it|completed|proud|amazing)/i,      id:'celebrate'},
  {p:/(motivat|inspired|can'?t be bothered)/i,                    id:'motivation'},
  {p:/(start)/i,                                                  id:'cant_start'},
  {p:/.*/,                                                        id:'general'},
];
function detectIntent(input){
  for(var i=0;i<INTENTS.length;i++){if(INTENTS[i].p.test(input)) return INTENTS[i].id;}
  return 'general';
}

function getCtx(){
  var wd=weekDates(),habits=getHabits();
  var rates=habits.map(function(h){return {h:h,days:wd.filter(function(d){return (S.habitData[d]||{})[h.id];}).length};}).sort(function(a,b){return b.days-a.days;});
  var emCount={};
  wd.forEach(function(d){var e=(S.checkins[d]||{}).emotion;if(e) emCount[e]=(emCount[e]||0)+1;});
  var topEm=Object.keys(emCount).sort(function(a,b){return emCount[b]-emCount[a];})[0];
  var topEmObj=topEm?EMOTIONS.filter(function(e){return e.id===topEm;})[0]:null;
  var wUrges=S.urgeLog.filter(function(u){return wd.indexOf(u.date)!==-1;});
  var exDays=rates.filter(function(r){return r.h.id==='exercise';})[0];
  var curEm=EMOTIONS.filter(function(e){return e.id===ci().emotion;})[0];
  var focus=S.oneFocus[TODAY]||'';
  var done=doneCount(),total=habits.length;
  var weekPct=total>0?Math.round(wd.reduce(function(acc,d){return acc+habits.filter(function(h){return (S.habitData[d]||{})[h.id];}).length;},0)/(total*7)*100):0;
  return {rates:rates,topEmObj:topEmObj,emCount:emCount,wUrges:wUrges,exDays:exDays?exDays.days:0,curEm:curEm,focus:focus,done:done,total:total,weekPct:weekPct,name:S.profile.name||'',peak:S.profile.peakTime,trigger:S.profile.mainTrigger,hour:new Date().getHours()};
}

var BRAIN={
  cant_start:function(c){
    var r=[];
    r.push('Barkley\'s most important insight: the ADHD brain cannot manufacture interest or urgency on demand. This is not laziness — it is how your prefrontal cortex is wired.');
    if(c.curEm) r.push('You are feeling '+c.curEm.l.toLowerCase()+' right now. '+c.curEm.tip);
    if(c.exDays===0) r.push('You have not moved your body this week. Even a 5-minute walk will physically change your brain state right now.');
    r.push(c.focus?'Your one thing is "'+c.focus+'". Do not start the whole thing. Open it, read the first line, set a timer for 2 minutes. That is the entire task.':'You have not named your one thing today. Do that first — go to the Now tab and write it. Naming the task activates the prefrontal cortex.');
    r.push('The 2-minute rule: commit to only 2 minutes. Set a visible timer. The dread before starting is always worse than the task itself.');
    return r;
  },
  overwhelmed:function(c){
    return ['Stop. You do not need to solve everything right now.','Three slow breaths. Out longer than in. Then name one thing — just one — that genuinely matters today. Write it down.','Everything else goes on paper. You are not abandoning it, you are parking it so your brain can function.','If you are still spiralling: change rooms. Your nervous system is anchored to the space it got stuck in.'];
  },
  rsd:function(c){
    return ['What you are feeling is neurological, not a character flaw. This is Rejection Sensitive Dysphoria — Dr. William Dodson found it affects 99% of people with ADHD.','Say out loud: "This is RSD. This is my nervous system, not reality."','Do not respond to anyone or make any decisions for at least one hour.','Your sensitivity is not a flaw. It is the same trait that makes you deeply perceptive and creative.'];
  },
  phone_urge:function(c){
    var r=[];
    var phoneUrges=c.wUrges.filter(function(u){return u.type==='phone';}).length;
    r.push('Maté: behind every compulsive urge is an unmet need. Your brain is reaching for connection or novelty right now.');
    if(phoneUrges>=3) r.push('You have logged '+phoneUrges+' phone urges this week. That is a pattern worth understanding. What need keeps bringing you here?');
    r.push('Before you open it: text one real person something genuine. That meets the actual need. Scrolling only simulates connection without delivering it.');
    return r;
  },
  food_urge:function(c){
    return ['Drink a full glass of water first. Wait 5 minutes. Then ask: is this hunger, or am I soothing something?','Maté: food urges are almost always emotional, not physical. Name the emotion if you can. Even one word.'];
  },
  week_analysis:function(c){
    var r=['Here is what your data shows this week:'];
    if(c.weekPct>=70) r.push('Overall: '+c.weekPct+'% habit completion. Strong. Your neural pathways are forming.');
    else if(c.weekPct>=40) r.push('Overall: '+c.weekPct+'% habit completion. Building momentum. The weeks that feel average are usually the ones that create the foundation.');
    else r.push('Overall: '+c.weekPct+'% this week. Hard week. That is information, not a verdict. What made it hard?');
    if(c.rates.length>0&&c.rates[0].days>0) r.push('Strongest: "'+c.rates[0].h.label+'" at '+c.rates[0].days+'/7 days. Real neural wiring happening here.');
    var worst=c.rates[c.rates.length-1];
    if(worst&&worst.days===0&&c.rates.length>1) r.push('"'+worst.h.label+'" has not been done at all. Maté asks: what need does avoiding this serve?');
    if(c.exDays===0) r.push('Zero exercise this week. Barkley calls it the single most powerful daily intervention for ADHD. Even a short walk changes everything.');
    if(c.topEmObj) r.push('Most frequent feeling: "'+c.topEmObj.l+'" ('+c.emCount[c.topEmObj.id]+' days). '+getEmInsight(c.topEmObj.id));
    if(c.wUrges.length>0){var red=c.wUrges.filter(function(u){return u.redirected;}).length;r.push('Dopamine urges: '+c.wUrges.length+' logged, '+red+' redirected. Every interception is a vote for who you are becoming.');}
    return r;
  },
  habit_check:function(c){
    var r=[];
    var strong=c.rates.filter(function(r){return r.days>=5;});
    var zero=c.rates.filter(function(r){return r.days===0;});
    if(strong.length) r.push('You are genuinely building: '+strong.map(function(x){return '"'+x.h.label+'" ('+x.days+'/7)';}).join(', ')+'.');
    if(zero.length) r.push('Not started this week: '+zero.map(function(x){return '"'+x.h.label+'"';}).join(', ')+'. What is the friction point for each of these?');
    r.push('The iron rule: never miss twice. One miss is an accident. Two is the beginning of a new habit — the habit of not doing it.');
    return r;
  },
  what_next:function(c){
    var r=[];
    if(c.curEm) r.push('You are feeling '+c.curEm.l.toLowerCase()+'. '+c.curEm.tip);
    if(c.focus) r.push('Your declared one thing is "'+c.focus+'". Start here. Everything else is noise until this moves.');
    else r.push('You have not named your one thing today. That is the single highest-leverage action available right now — go to Now and name it.');
    var pt=c.peak,h=c.hour;
    if(pt==='morning'&&h>=6&&h<12) r.push('This is your peak window. Your hardest task belongs here — not admin, not email, not preparation.');
    else if(pt==='afternoon'&&h>=12&&h<17) r.push('You are in your peak window right now. Stack your deepest work here.');
    else if(pt==='evening'&&h>=17&&h<21) r.push('Your energy peaks now. Use it deliberately.');
    return r;
  },
  exercise:function(c){
    var r=[];
    if(c.exDays===0) r.push('You have not moved your body this week at all. Barkley: exercise produces the same neurochemical effect as stimulant medication. It is not a wellness suggestion. It is medicine.');
    else if(c.exDays>=4) r.push('You have moved your body '+c.exDays+' days this week. This is one of the highest-leverage things you can do for your ADHD brain. Keep this going.');
    else r.push('You have exercised '+c.exDays+' day(s) this week. The target is 5+. The days you exercise are neurologically different days.');
    r.push('Minimum effective dose: 20 minutes of elevated heart rate. Walking fast counts. Cycling counts. Anything that gets your heart rate up.');
    return r;
  },
  sleep:function(c){
    return ['Sleep deprivation is functionally identical to worsening your ADHD symptoms. Barkley: every hour of lost sleep is lost executive function — the exact resource ADHD already taxes.','The wind-down is the habit. Not the sleep itself. Remove stimuli 30 minutes before bed: no screens, dim lights, lower temperature.','ADHD brains often resist sleep onset because the night is the first quiet time the brain gets. Journal or brain-dump before bed to unload the backlog.'];
  },
  stuck:function(c){
    var r=['Stuck is normal. Here is what Barkley says actually works:','Change your physical position first — stand, move to the floor, go to a different room. This alone shifts the brain state.','Read only the first sentence of the task out loud. Just the first sentence.'];
    if(c.focus) r.push('Your task is "'+c.focus+'". What is the smallest possible first step — not the task, the step before the task? Name it out loud.');
    r.push('Commit to 2 minutes only. The brain almost always continues after starting.');
    return r;
  },
  frustrated:function(c){
    return ['Do not push through active frustration. Barkley is clear: pushing through builds aversion and makes the task harder next time.','Move your body for 5 minutes right now. Walk fast. This is a neurochemical reset, not avoidance.','After moving: write down the exact friction point. Not "I\'m stuck" — the specific thing. Naming it precisely usually reveals a concrete next action.'];
  },
  sad:function(c){
    return [(c.name?c.name+', ':'')+' what you are feeling is real and valid. Do not rush past it.','Maté: the ADHD brain often carries unprocessed grief and sadness because motion and distraction are used to avoid sitting with pain.','Be gentle with yourself today. The bar is lower today. One small kind act toward yourself is genuinely enough.',c.exDays<=1?'When you are ready — not forced — movement helps. A slow walk outside. The body holds sadness too.':''];
  },
  anxious:function(c){
    return ['What you are feeling is a threat response. Your nervous system believes something is dangerous.','Breathe out longer than you breathe in. 4 in, hold 4, 6 out. This directly activates your parasympathetic nervous system.','Name 3 things you can physically touch right now. This pulls the nervous system back into the present moment.','After grounding: what is the actual thing driving this? Name it as specifically as possible. Vague anxiety is the most powerful kind.'];
  },
  celebrate:function(c){
    var r=[(c.name?c.name+', ':'')+' genuinely — this matters. Your brain physically rewired today because of what you did.'];
    if(c.done>=c.total*.8) r.push('You have completed '+c.done+'/'+c.total+' habits today. Barkley: every completed action is a real neurological event. The pathways are forming.');
    r.push('Hallowell\'s instruction: celebrate out loud. Say yes. Do the fist pump. The dopamine from genuine celebration is what cements the habit in the brain.');
    r.push('Note what made today work. What conditions were present? That is your formula. Replicate it.');
    return r;
  },
  motivation:function(c){
    return ['Barkley: motivation does not precede action for the ADHD brain. It follows it. You cannot wait to feel motivated — you act first, and the motivation emerges from the action.','The ADHD brain is interest-driven. If you are not interested, the prefrontal cortex cannot manufacture the signal to begin. This is neurological.','Three things that create engagement: novelty, challenge, urgency. Manufacture at least one artificially right now.',c.exDays<=1?'You have barely moved your body this week. Exercise is the most reliable motivation reset available to you. Even 10 minutes changes the state.':'Keep exercising — it is your most reliable neurochemical reset.'];
  },
  general:function(c){
    var r=[];
    if(c.curEm) r.push('You are feeling '+c.curEm.l.toLowerCase()+'. '+c.curEm.tip);
    if(c.focus) r.push('Your one thing today is "'+c.focus+'". '+(c.done>=c.total*.6?'You are making real progress.':'Start here if you have not yet.'));
    else r.push('You have not named your one thing today. That is the single highest-leverage action available right now.');
    if(c.exDays===0) r.push('You have not moved your body this week. Barkley calls exercise neurological medicine — more effective than almost anything else for ADHD.');
    r.push('What specifically is on your mind? The more specific you are, the more useful I can be.');
    return r;
  },
};

function getEmInsight(id){
  var m={low:'Barkley connects low energy to exercise deficit and sleep quality.',anxious:'Mate: anxiety often signals an unmet need. What have you been avoiding?',overwhelmed:'You may be deferring too many decisions. Simplify ruthlessly.',foggy:'Foggy states often follow poor sleep or low hydration. Look at the day before.',frustrated:'Frustration is blocked progress. What obstacle keeps reappearing?',on:'High-energy states are available. Are you using them for your most important work?',ok:'Consistent steady state. What conditions are producing this?',sad:'Mate: sit with this gently. Sadness carries important information.'};
  return m[id]||'Notice what conditions produced this state most often.';
}

function processInput(input){
  var intent=detectIntent(input);
  var c=getCtx();
  var handler=BRAIN[intent]||BRAIN.general;
  return handler(c,input).filter(function(p){return p&&p.trim();}).join('\n\n');
}

function renderBrain(){
  brainMessages=S.chatHistory||[];
  var name=S.profile.name||'there';
  var starters=['I cannot start anything today','What does my data say this week?','I keep reaching for my phone','I am feeling overwhelmed'];

  document.getElementById('screen').innerHTML=
    '<div style="display:flex;flex-direction:column;height:calc(100dvh - 64px - env(safe-area-inset-bottom));">'

    // Header — with emergency buttons visible
    +'<div style="padding:52px 24px 16px;flex-shrink:0;">'
    +'<div style="display:flex;justify-content:space-between;align-items:flex-start;">'
    +'<div>'
    +'<div style="font-size:34px;font-weight:700;letter-spacing:-.5px;">Brain &#10022;</div>'
    +'<div style="font-size:15px;color:#AEAEB2;margin-top:4px;">Knows your data. Knows the science.</div>'
    +'</div>'
    +(brainMessages.length>0?'<button id="clear-chat" style="background:none;border:none;font-size:14px;color:#AEAEB2;cursor:pointer;font-family:inherit;padding:4px 0;">Clear</button>':'')
    +'</div>'

    // Emergency buttons — always visible on this screen
    +'<div style="display:flex;gap:10px;margin-top:16px;">'
    +'<button onclick="showRSD()" style="flex:1;padding:12px 14px;background:rgba(175,82,222,.07);border:1.5px solid rgba(175,82,222,.15);border-radius:16px;cursor:pointer;font-family:inherit;text-align:left;border:1.5px solid rgba(175,82,222,.15);">'
    +'<div style="font-size:18px;margin-bottom:4px;">&#128156;</div>'
    +'<div style="font-size:13px;font-weight:700;color:#AF52DE;">RSD Emergency</div>'
    +'</button>'
    +'<button onclick="showOverwhelm()" style="flex:1;padding:12px 14px;background:rgba(255,59,48,.05);border:1.5px solid rgba(255,59,48,.12);border-radius:16px;cursor:pointer;font-family:inherit;text-align:left;">'
    +'<div style="font-size:18px;margin-bottom:4px;">&#127744;</div>'
    +'<div style="font-size:13px;font-weight:700;color:#FF3B30;">Overwhelm SOS</div>'
    +'</button>'
    +'</div>'
    +'</div>'

    // Chat
    +'<div id="chat-area" style="flex:1;overflow-y:auto;padding:8px 24px;-webkit-overflow-scrolling:touch;">'
    +(brainMessages.length===0 ? buildWelcome(name,starters) : buildMessages())
    +'<div id="chat-end"></div></div>'

    // Input
    +'<div style="padding:12px 24px;background:rgba(255,255,255,.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:.5px solid rgba(0,0,0,.06);flex-shrink:0;">'
    +'<div style="display:flex;gap:10px;align-items:flex-end;">'
    +'<div style="flex:1;background:#F5F5F5;border-radius:22px;padding:12px 18px;">'
    +'<textarea id="chat-inp" rows="1" placeholder="Ask anything..." style="width:100%;background:transparent;border:none;outline:none;font-family:inherit;font-size:16px;color:#1D1D1F;resize:none;line-height:1.5;max-height:100px;overflow-y:auto;display:block;"></textarea>'
    +'</div>'
    +'<button id="chat-send" style="width:44px;height:44px;border-radius:50%;background:#D1D1D6;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s;">'
    +'<span style="color:#fff;font-size:18px;line-height:1;margin-top:-1px;">&#8593;</span>'
    +'</button>'
    +'</div></div>'
    +'</div>';

  // Bind
  var clearBtn=document.getElementById('clear-chat');
  if(clearBtn) clearBtn.onclick=function(){brainMessages=[];S.chatHistory=[];saveS();renderBrain();};

  var inp=document.getElementById('chat-inp');
  var send=document.getElementById('chat-send');

  function updateBtn(){
    send.style.background=inp.value.trim()&&!brainThinking?'#0071E3':'#D1D1D6';
    send.style.cursor=inp.value.trim()&&!brainThinking?'pointer':'default';
  }
  inp.oninput=updateBtn;
  inp.onkeydown=function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg();}};
  send.onclick=sendMsg;

  var stEl=document.getElementById('starters-list');
  if(stEl) stEl.addEventListener('click',function(e){
    var b=e.target.closest('[data-starter]');
    if(b){inp.value=b.dataset.starter;updateBtn();}
  });

  function sendMsg(){
    var txt=inp.value.trim();if(!txt||brainThinking) return;
    brainMessages.push({role:'user',content:txt});
    inp.value='';updateBtn();
    brainThinking=true;refreshChat();
    var delay=280+Math.random()*420;
    setTimeout(function(){
      var response=processInput(txt);
      brainMessages.push({role:'assistant',content:response});
      S.chatHistory=brainMessages.slice(-40);saveS();
      brainThinking=false;refreshChat();updateBtn();
    },delay);
  }

  function refreshChat(){
    var area=document.getElementById('chat-area');if(!area) return;
    area.innerHTML=buildMessages()+(brainThinking?buildTyping():'')+'<div id="chat-end"></div>';
    var end=document.getElementById('chat-end');if(end) end.scrollIntoView({behavior:'smooth'});
  }

  // Scroll to bottom
  setTimeout(function(){
    var end=document.getElementById('chat-end');
    if(end) end.scrollIntoView({behavior:'auto'});
  },50);
}

function buildWelcome(name,starters){
  return '<div style="text-align:center;padding:20px 0 24px;">'
    +'<div style="font-size:52px;margin-bottom:12px;">&#129504;</div>'
    +'<div style="font-size:18px;font-weight:600;margin-bottom:6px;">Hi '+esc(name)+'</div>'
    +'<div style="font-size:15px;color:#AEAEB2;line-height:1.6;max-width:260px;margin:0 auto;">Ask me anything. I know your patterns and the science.</div>'
    +'</div>'
    +'<div id="starters-list" style="display:flex;flex-direction:column;gap:8px;">'
    +starters.map(function(s){
      return '<button data-starter="'+esc(s)+'" style="background:#F5F5F5;border:none;border-radius:16px;padding:14px 18px;font-family:inherit;font-size:16px;color:#3A3A3C;cursor:pointer;text-align:left;">'+esc(s)+'</button>';
    }).join('')
    +'</div>';
}

function buildMessages(){
  return brainMessages.map(function(m){
    var isU=m.role==='user';
    return '<div style="margin-bottom:14px;display:flex;flex-direction:column;align-items:'+(isU?'flex-end':'flex-start')+';gap:4px;">'
      +(!isU?'<div style="font-size:11px;color:#AEAEB2;padding-left:4px;">Brain &#10022;</div>':'')
      +'<div class="'+(isU?'chat-user':'chat-ai')+'">'+esc(m.content).replace(/\n\n/g,'</div><div style="height:10px;"></div><div class="'+(isU?'chat-user':'chat-ai')+'">')+'</div>'
      +'</div>';
  }).join('');
}

function buildTyping(){
  return '<div style="margin-bottom:14px;">'
    +'<div style="font-size:11px;color:#AEAEB2;padding-left:4px;margin-bottom:4px;">Brain &#10022;</div>'
    +'<div class="chat-ai" style="display:inline-flex;gap:5px;align-items:center;">'
    +'<div style="width:7px;height:7px;border-radius:50%;background:#AEAEB2;animation:tp 1.2s ease infinite;"></div>'
    +'<div style="width:7px;height:7px;border-radius:50%;background:#AEAEB2;animation:tp 1.2s ease infinite;animation-delay:.2s;"></div>'
    +'<div style="width:7px;height:7px;border-radius:50%;background:#AEAEB2;animation:tp 1.2s ease infinite;animation-delay:.4s;"></div>'
    +'<style>@keyframes tp{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}</style>'
    +'</div></div>';
}

// ── MAIN RENDER ───────────────────────────────────────────────────────────────
function render(){
  brainMessages=S.chatHistory||[];
  if(CUR==='now')   renderNow();
  else if(CUR==='do')    renderDo();
  else if(CUR==='brain') renderBrain();
}

// ── INIT ──────────────────────────────────────────────────────────────────────
if(!S.profile.done){
  OB=1; renderOnboarding();
} else {
  render();
}
