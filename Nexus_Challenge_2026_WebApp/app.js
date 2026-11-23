const qs = (s) => document.querySelector(s);
const qsa = (s) => [...document.querySelectorAll(s)];

const menuBtn = qs('#menuBtn');
const nav = qs('#nav');
function closeMenu(){
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded','false');
  menuBtn.setAttribute('aria-label','Abrir menú');
}
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',String(open));
  menuBtn.setAttribute('aria-label',open ? 'Cerrar menú' : 'Abrir menú');
});
qsa('#nav a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape') closeMenu();});

// Motion remains optional, including for visitors who prefer reduced motion.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle = qs('#motionToggle');
let savedMotion = null;
try { savedMotion = localStorage.getItem('nexus-motion'); } catch {}
let motionPaused = reducedMotion.matches || savedMotion === 'paused';
function renderMotion(){
  document.documentElement.dataset.motion = motionPaused ? 'paused' : 'playing';
  motionToggle.setAttribute('aria-pressed',String(motionPaused));
  motionToggle.textContent = motionPaused ? 'Activar animaciones' : 'Pausar animaciones';
}
motionToggle.addEventListener('click',()=>{
  motionPaused = !motionPaused;
  renderMotion();
  try { localStorage.setItem('nexus-motion',motionPaused ? 'paused' : 'playing'); } catch {}
});
reducedMotion.addEventListener('change',event=>{
  if(event.matches){motionPaused=true;renderMotion();}
});
renderMotion();

if('IntersectionObserver' in window){
  const revealObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:0.08});
  qsa('.section-heading, .mission-card, .visual-card, .point-card, .rule-panel, .match-grid, .event-grid article, .final-banner').forEach((element,index)=>{
    element.style.setProperty('--reveal-delay',`${Math.min(index%4,3)*70}ms`);
    revealObserver.observe(element);
    element.classList.add('reveal');
  });
  const sectionObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      qsa('#nav a').forEach(link=>{
        if(link.hash===`#${entry.target.id}`) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    });
  },{rootMargin:'-20% 0px -55% 0px'});
  qsa('main section[id]').forEach(section=>sectionObserver.observe(section));
}

// Countdown
const eventDate = new Date('2026-12-05T08:30:00-06:00').getTime();
function updateCountdown(){
  let diff = eventDate - Date.now();
  if(diff <= 0){
    qs('#countdown').innerHTML = '<strong>La misión ha comenzado.</strong>';
    return;
  }
  const d = Math.floor(diff / 86400000);
  diff %= 86400000;
  const h = Math.floor(diff / 3600000);
  diff %= 3600000;
  const m = Math.floor(diff / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  qs('#cdDays').textContent = d;
  qs('#cdHours').textContent = String(h).padStart(2,'0');
  qs('#cdMinutes').textContent = String(m).padStart(2,'0');
  qs('#cdSeconds').textContent = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

// Match timer
const MATCH_SECONDS = 90;
const ENDGAME_SECONDS = 15;
let remaining = MATCH_SECONDS;
let timerHandle = null;
let running = false;

const timer = qs('#timer');
const phasePill = qs('#phasePill');
const timerNote = qs('#timerNote');
const progressBar = qs('#progressBar');

function formatTime(sec){
  const m = Math.floor(sec/60);
  const s = sec%60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function beep(freq=650, duration=0.12, volume=.05){
  if(!qs('#soundToggle').checked) return;
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }catch(e){}
}

function renderTimer(){
  timer.textContent = formatTime(remaining);
  const elapsed = MATCH_SECONDS - remaining;
  progressBar.style.width = `${(elapsed/MATCH_SECONDS)*100}%`;

  if(remaining === MATCH_SECONDS){
    phasePill.textContent = 'LISTO';
    phasePill.className = 'status-pill';
    timer.classList.remove('endgame');
    timerNote.textContent = '90 segundos para explorar, competir y estacionarse.';
  } else if(remaining > ENDGAME_SECONDS){
    phasePill.textContent = 'MISIÓN';
    phasePill.className = 'status-pill';
    timer.classList.remove('endgame');
    timerNote.textContent = 'Recupera recursos y anota: una pelota o un cubo a la vez.';
  } else if(remaining > 0){
    phasePill.textContent = 'ENDGAME';
    phasePill.className = 'status-pill endgame';
    timer.classList.add('endgame');
    timerNote.textContent = 'Endgame: estaciónate en el semicírculo de tu alianza.';
  } else {
    phasePill.textContent = 'MATCH FINALIZADO';
    phasePill.className = 'status-pill';
    timer.classList.remove('endgame');
    timerNote.textContent = 'Fin del match.';
  }
}

function tick(){
  if(remaining <= 0){
    clearInterval(timerHandle);
    timerHandle = null;
    running = false;
    beep(240, .6, .09);
    renderTimer();
    return;
  }
  remaining -= 1;
  if(remaining === ENDGAME_SECONDS){
    beep(950,.18,.07);
    setTimeout(()=>beep(1150,.18,.06),210);
  } else if(remaining <= 3 && remaining > 0){
    beep(700,.08,.04);
  }
  renderTimer();
}

qs('#startBtn').addEventListener('click', ()=>{
  if(running || remaining <= 0) return;
  running = true;
  if(remaining === MATCH_SECONDS) beep(880,.22,.07);
  timerHandle = setInterval(tick,1000);
  renderTimer();
});
qs('#pauseBtn').addEventListener('click', ()=>{
  if(timerHandle) clearInterval(timerHandle);
  timerHandle = null;
  running = false;
});
qs('#resetBtn').addEventListener('click', ()=>{
  if(timerHandle) clearInterval(timerHandle);
  timerHandle = null;
  running = false;
  remaining = MATCH_SECONDS;
  renderTimer();
});
renderTimer();

// Scoring (Reglamento oficial v1.4, sección 5 y tabla de faltas G05–G06)
const POINTS = {balls:1, cubes:3, robots:2, parkBonus:2};
const FOUL_POINTS = {poss:1, minor:3, major:10}; // se suman a la alianza contraria
const LIMITS = {balls:5, cubes:4, robots:2, poss:99, minor:99, major:9};
const TEAMS = ['blue','yellow'];
const NAMES = {blue:'Blue', yellow:'Yellow'};
const rival = team => team === 'blue' ? 'yellow' : 'blue';
const emptyTeam = () => ({balls:0,cubes:0,robots:0,poss:0,minor:0,major:0});
const state = {blue:emptyTeam(), yellow:emptyTeam()};

function fieldPoints(team){
  const s = state[team];
  return s.balls*POINTS.balls + s.cubes*POINTS.cubes + s.robots*POINTS.robots + (s.robots === 2 ? POINTS.parkBonus : 0);
}
function foulPointsReceived(team){
  const r = state[rival(team)];
  return r.poss*FOUL_POINTS.poss + r.minor*FOUL_POINTS.minor + r.major*FOUL_POINTS.major;
}
function calcScore(team){ return fieldPoints(team) + foulPointsReceived(team); }

function renderTeam(team){
  const s = state[team];
  const prefix = `#${team}`;
  ['balls','cubes','robots','poss','minor','major'].forEach(type=>{
    const key = type.charAt(0).toUpperCase()+type.slice(1);
    qs(`${prefix}${key}`).textContent = s[type];
  });
  qs(`${prefix}Score`).textContent = calcScore(team);
  qs(`${prefix}Breakdown`).textContent = `Cancha ${fieldPoints(team)} · Faltas del rival ${foulPointsReceived(team)}`;
  qs(`${prefix}FoulCount`).textContent = s.poss + s.minor + s.major;
  qs(`${prefix}Bonus`).classList.toggle('active', s.robots === 2);
}
function renderResult(){
  const b = calcScore('blue'), y = calcScore('yellow');
  const box = qs('#matchResult');
  box.className = 'match-result ' + (b===y ? 'tie' : b>y ? 'blue-wins' : 'yellow-wins');
  box.textContent = b===y ? 'Empate · 1 RP para cada alianza'
    : `Gana ${b>y ? 'Blue' : 'Yellow'} Alliance · 2 RP para cada equipo de la alianza`;
}
function renderScores(){ TEAMS.forEach(renderTeam); renderResult(); }

qsa('.counter button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const {team, type} = btn.dataset;
    const delta = Number(btn.dataset.delta);
    state[team][type] = Math.max(0,Math.min(LIMITS[type],state[team][type]+delta));
    renderScores();
  });
});

function clearScores(){
  TEAMS.forEach(team=>{ state[team] = emptyTeam(); });
  renderScores();
}
qs('#clearScoreBtn').addEventListener('click',clearScores);
clearScores();

function resultText(){
  const b = calcScore('blue'), y = calcScore('yellow');
  const winner = b===y ? 'Empate (1 RP cada alianza)' : `${b>y ? 'Blue' : 'Yellow'} Alliance (2 RP)`;
  const line = team => {
    const s = state[team];
    return `${NAMES[team]}: ${s.balls} pelotas, ${s.cubes} cubos, ${s.robots} estacionados${s.robots===2?' + bonus':''}; faltas cometidas: ${s.poss} posesión, ${s.minor} menores, ${s.major} mayores`;
  };
  return `Nexus Challenge 2026 · Resultado\nBlue ${b} - ${y} Yellow\nGanador: ${winner}\n${line('blue')}\n${line('yellow')}`;
}
qs('#copyResultBtn').addEventListener('click',async()=>{
  try{
    await navigator.clipboard.writeText(resultText());
    const toast=qs('#toast');
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'),1800);
  }catch{
    alert(resultText());
  }
});
