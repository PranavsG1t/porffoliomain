// Design & creative carousel engine (auto-drifting stack, drag, keyboard, lightbox).

export function startCarousel(IT){
var cleanups=[];function on(t,e,f,o){t.addEventListener(e,f,o);cleanups.push(function(){t.removeEventListener(e,f,o)})}
var raf=0,N=IT.length,car=document.getElementById('car'),lb=document.getElementById('lb'),stage=lb.querySelector('.stage'),pp=document.getElementById('pp');
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,playing=!reduce,hover=false,vis=true,p=0,tw=null,Wc=340,H=425,li=0,last=null,SPEED=.3;
var cards=IT.map(function(it,k){var c=document.createElement('div');c.className='card';c.innerHTML='<img alt="'+it.t+'" src="'+it.s+'"><span class="lab">'+it.t+'</span>';car.appendChild(c);return c});
var subs=[].slice.call(document.querySelectorAll('#subs button'));
function size(){Wc=Math.min(340,car.clientWidth/2.15);H=Wc*1.25;car.style.setProperty('--H',H+'px')}
function wrap(d){d=((d%N)+N)%N;return d>N/2?d-N:d}
function draw(){
  var best=0,bd=9;
  for(var i=0;i<N;i++){var d=wrap(i-p),a=Math.abs(d);if(a<bd){bd=a;best=i}
    var w=Wc*(.1+.9*Math.exp(-1.6*a*a)),h=H*(1-.09*Math.min(a,2.5)),x=(d<0?-1:1)*Wc*(1-Math.exp(-1.15*a)),c=cards[i];
    c.style.width=w+'px';c.style.height=h+'px';c.style.transform='translate(-50%,-50%) translateX('+x+'px)';
    c.style.zIndex=Math.round(100-a*10);c.style.opacity=a>3.6?Math.max(0,1-(a-3.6)*2):1;
    c.firstChild.nextSibling.style.opacity=Math.max(0,1-a*1.8);c.setAttribute('aria-hidden',a>.5)}
  if(best!==li||!subs[0].hasAttribute('aria-current')){li=best;var g=IT[best].g;subs.forEach(function(b,k){b.setAttribute('aria-current',k===g)})}
}
function go(target,dur){var from=p,delta=wrap(target-p);if(reduce){p=(p+delta+N)%N;draw();return}
  tw={t0:performance.now(),from:from,delta:delta,dur:dur||650}}
var lt=0;
function loop(ts){var dt=Math.min((ts-lt)/1000,.05);lt=ts;
  if(vis){if(tw){var k=Math.min(1,(ts-tw.t0)/tw.dur),e=1-Math.pow(1-k,3);p=((tw.from+tw.delta*e)%N+N)%N;if(k>=1)tw=null}
  else if(playing&&!hover&&lb.hidden)p=(p+dt*SPEED)%N;
  draw()}
  raf=requestAnimationFrame(loop)}
var io=new IntersectionObserver(function(e){vis=e[0].isIntersecting});io.observe(car);cleanups.push(function(){io.disconnect()});
car.addEventListener('pointerenter',function(){hover=true});car.addEventListener('pointerleave',function(){hover=false});
function step(n){go(Math.round(p)+n,500)}
document.getElementById('cp').onclick=function(){step(-1)};document.getElementById('cn').onclick=function(){step(1)};
function setPP(){pp.innerHTML=playing?'&#10074;&#10074;':'&#9654;';pp.setAttribute('aria-label',playing?'Pause':'Play')}
pp.onclick=function(){playing=!playing;setPP()};setPP();
subs.forEach(function(b,g){b.onclick=function(){for(var i=0;i<N;i++)if(IT[i].g===g){go(i,800);break}}});
car.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'){step(-1);e.preventDefault()}if(e.key==='ArrowRight'){step(1);e.preventDefault()}if(e.key==='Enter')open(Math.round(p)%N)});
/* click: centre card opens viewer, others glide to centre. drag/swipe to move */
var sx=0,sp=0,dragging=false,moved=false;
car.addEventListener('pointerdown',function(e){dragging=true;moved=false;sx=e.clientX;sp=p;tw=null});
on(window,'pointermove',function(e){if(!dragging)return;var d=e.clientX-sx;if(Math.abs(d)>6)moved=true;if(moved)p=((sp-d/(Wc*.6))%N+N)%N});
on(window,'pointerup',function(e){if(!dragging)return;dragging=false;
  if(moved){go(Math.round(p),400);return}
  var el=e.target.closest&&e.target.closest('.card');if(!el)return;var i=cards.indexOf(el);
  if(Math.abs(wrap(i-p))<.5)open(i);else go(i,650)});
function show(n){li=(n+N)%N;var it=IT[li];stage.innerHTML='';var im=new Image();im.src=it.f;im.alt=it.t;var c=document.createElement('div');c.className='cap';c.textContent=it.t+'  ('+(li+1)+' of '+N+')';stage.appendChild(im);stage.appendChild(c)}
function open(n){last=document.activeElement;show(n);lb.hidden=false;document.body.style.overflow='hidden';lb.querySelector('.x').focus()}
function close(){lb.hidden=true;document.body.style.overflow='';go(li,500);if(last)last.focus()}
lb.querySelector('.x').onclick=close;lb.querySelector('.pv').onclick=function(){show(li-1)};lb.querySelector('.nx').onclick=function(){show(li+1)};
lb.addEventListener('click',function(e){if(e.target===lb)close()});
on(document,'keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(li-1);if(e.key==='ArrowRight')show(li+1)});
on(window,'resize',size);size();draw();raf=requestAnimationFrame(function(ts){lt=ts;loop(ts)});
return function(){cancelAnimationFrame(raf);cleanups.forEach(function(f){f()});car.innerHTML='';document.body.style.overflow=''}
}
