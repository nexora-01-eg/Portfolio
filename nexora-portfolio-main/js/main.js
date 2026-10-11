(function(){
"use strict";

/* ============ LANGUAGE SWITCH (AR / EN) ============ */
var LANG_KEY = 'nexora-portfolio-lang';
var langBtns = Array.prototype.slice.call(document.querySelectorAll('.lang-sw button'));

function applyLang(lang){
  document.documentElement.setAttribute('lang', lang);
  document.body.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  langBtns.forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-lang') === lang); });
  document.querySelectorAll('[data-ar][data-en]').forEach(function(el){
    el.textContent = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
  });
  var title = document.title;
  var t = lang === 'ar'
    ? 'NEXORA Portfolio — برتفوليو أعمالنا'
    : 'NEXORA Portfolio — Our Work';
  if(title !== t) document.title = t;
}

langBtns.forEach(function(b){
  b.addEventListener('click', function(){
    var lang = b.getAttribute('data-lang');
    applyLang(lang);
    try{ localStorage.setItem(LANG_KEY, lang); }catch(e){}
  });
});

try{
  var saved = localStorage.getItem(LANG_KEY);
  if(saved && (saved === 'ar' || saved === 'en')) applyLang(saved);
}catch(e){}

/* ============ HEADER SOLID + SCROLL PROGRESS ============ */
var header = document.getElementById('siteHeader');
var progBar = document.getElementById('progBar');

function onScroll(){
  var y = window.scrollY || window.pageYOffset;
  header.classList.toggle('solid', y > 24);
  var h = document.documentElement.scrollHeight - window.innerHeight;
  progBar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
}
window.addEventListener('scroll', onScroll, { passive:true });
onScroll();

/* ============ MOBILE MENU ============ */
var burger = document.getElementById('burger');
var mob = document.getElementById('mobMenu');
burger.addEventListener('click', function(){
  var open = mob.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
});
mob.querySelectorAll('a').forEach(function(a){
  a.addEventListener('click', function(){ mob.classList.remove('open'); burger.classList.remove('open'); });
});

/* ============ REVEAL ON SCROLL ============ */
var revealEls = document.querySelectorAll('.reveal, .reveal-l');
if('IntersectionObserver' in window){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function(el){ io.observe(el); });
} else {
  revealEls.forEach(function(el){ el.classList.add('in'); });
}

/* ============ NAV ACTIVE ON SCROLL ============ */
var sections = ['work', 'method', 'contact'];
var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
function setActive(id){
  navLinks.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
}
if('IntersectionObserver' in window){
  var secIO = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting && e.intersectionRatio > 0.2) setActive(e.target.id);
    });
  }, { threshold: [0.2, 0.5] });
  sections.forEach(function(id){
    var el = document.getElementById(id);
    if(el) secIO.observe(el);
  });
}

/* ============ COUNTERS ============ */
var counters = document.querySelectorAll('[data-count]');
function animateCounter(el){
  var target = parseFloat(el.getAttribute('data-count'));
  if(el.getAttribute('data-suffix')){ el.textContent = target; return; }
  var start = 0, dur = 1100, t0 = null;
  function step(ts){
    if(!t0) t0 = ts;
    var p = Math.min((ts - t0) / dur, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(start + (target - start) * eased);
    if(p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
if('IntersectionObserver' in window){
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ animateCounter(e.target); cio.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  counters.forEach(function(el){ cio.observe(el); });
} else {
  counters.forEach(function(el){ el.textContent = el.getAttribute('data-count'); });
}

/* ============ AMBIENT NETWORK CANVAS (hexagon nodes) ============ */
var canvas = document.getElementById('net');
if(canvas && window.requestAnimationFrame){
  var ctx = canvas.getContext('2d');
  var dots = [];
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function resize(){
    canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
    canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);
  var W = function(){ return canvas.offsetWidth; };
  var H = function(){ return canvas.offsetHeight; };
  var N = 22;
  for(var i = 0; i < N; i++){
    dots.push({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.0006, vy: (Math.random() - 0.5) * 0.0006, r: 0.8 + Math.random() * 1.4 });
  }
  var CONNECT = 0.12;
  function tick(){
    ctx.clearRect(0, 0, W(), H());
    var pts = dots.map(function(d){
      d.x += d.vx; d.y += d.vy;
      if(d.x < 0 || d.x > 1) d.vx *= -1;
      if(d.y < 0 || d.y > 1) d.vy *= -1;
      return { x: d.x * W(), y: d.y * H(), r: d.r };
    });
    for(var i = 0; i < pts.length; i++){
      for(var j = i + 1; j < pts.length; j++){
        var dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < CONNECT * W()){
          ctx.strokeStyle = 'rgba(214,195,165,' + (0.16 * (1 - dist / (CONNECT * W()))) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    pts.forEach(function(p){
      ctx.fillStyle = 'rgba(232,213,181,0.5)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    if(!prefersReduced) requestAnimationFrame(tick);
  }
  tick();
}

/* ============ CLOSE MOBILE MENU ON ESC ============ */
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){
    mob.classList.remove('open');
    burger.classList.remove('open');
  }
});

})();
