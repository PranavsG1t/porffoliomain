// ASCII hero engine: dark ASCII field, red vinyl-groove ripples and the spinning ASCII record.
/* ASCII hero: same chaos field and cursor fade as Hero.jsx, plus red vinyl-groove ripples and a spinning ASCII record */
export function startAsciiHero(el,el2){
  var cleanups=[];function on(t,e,f,o){t.addEventListener(e,f,o);cleanups.push(function(){t.removeEventListener(e,f,o)})}
  var RAMP=" .`':;-~=+*?!*#&21%@",GR=".:o0O@",D=".:-=+*#%@";
  var COLS,ROWS,CW,CH,aspect,t=0,animId;
  var mouse={x:-1,y:-1},cursorOpacity=0.36,cursorActive=false,lastMoveTime=0;
  var OPACITY_REST=0.36,OPACITY_ACTIVE=0.8,OPACITY_EASE=3.5;
  var disc={x:0,y:0,tx:0,ty:0,s:0,a:0},DR=92,G=0;
  var hash=function(n){return Math.abs((Math.sin(n*127.1+311.7)*43758.5453)%1)};
  var fract=function(x){return x-Math.floor(x)};
  function noise2(x,y){
    var ix=Math.floor(x),iy=Math.floor(y),fx=fract(x),fy=fract(y);
    var ux=fx*fx*(3-2*fx),uy=fy*fy*(3-2*fy);
    var a=hash(ix+iy*57),b=hash(ix+1+iy*57),c=hash(ix+(iy+1)*57),d=hash(ix+1+(iy+1)*57);
    return (a+(b-a)*ux+(c-a)*uy+(a-b-c+d)*ux*uy)*2-1;
  }
  var smoothstep=function(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};
  var CHAOS=[
    {bx:.22,by:.65,freq:9.5,speed:.72,phase:0,driftR:.13,driftSpeed:.17,driftAngle:0},
    {bx:.78,by:.30,freq:11.2,speed:.88,phase:Math.PI*.7,driftR:.10,driftSpeed:.23,driftAngle:Math.PI*.8},
    {bx:.58,by:.74,freq:7.8,speed:.55,phase:Math.PI*1.4,driftR:.14,driftSpeed:.13,driftAngle:Math.PI*1.6}];
  function chaosField(nx,ny,time){
    var ax=nx*aspect,total=0;
    for(var i=0;i<CHAOS.length;i++){var s=CHAOS[i];
      var sa=s.driftAngle+time*s.driftSpeed;
      var px=(s.bx+Math.cos(sa)*s.driftR)*aspect,py=s.by+Math.sin(sa)*s.driftR;
      var dist=Math.sqrt((ax-px)*(ax-px)+(ny-py)*(ny-py));
      total+=(1/(1+dist*4.2))*Math.sin(s.freq*Math.PI*2*dist-s.speed*time+s.phase);}
    return total/2.2;
  }
  var EXPAND_SPEED=.22,RING_THICK=.018,MAX_RADIUS=.52,RIPPLE_LIFE=MAX_RADIUS/EXPAND_SPEED,ripples=[];
  function spawnRipple(x,y,big){
    for(var i=0;i<ripples.length;i++){var r=ripples[i],dx=r.x-x,dy=r.y-y;
      if(!big&&Math.sqrt(dx*dx+dy*dy)<.015&&(t-r.born)<.18)return;}
    if(ripples.length>=8)ripples.shift();
    ripples.push({x:x,y:y,born:t,big:!!big});
  }
  /* returns the original ripple energy and records the groove trail strength in G */
  function rippleField(rip,nx,ny,time){
    var age=time-rip.born;if(age<0)return 0;
    var ringR=EXPAND_SPEED*age;if(ringR>MAX_RADIUS)return 0;
    var ax=(nx-rip.x)*aspect,ay=ny-rip.y,pixR=Math.sqrt(ax*ax+ay*ay);
    var life=Math.pow(1-ringR/MAX_RADIUS,1.4),inner=smoothstep(ringR/.01);
    var n=rip.big?6:3,gs=rip.big?.03:.034,boost=rip.big?1.3:1;
    for(var k=0;k<n;k++){var rr=ringR-k*gs;if(rr<.012)break;
      var dl=Math.abs(pixR-rr);
      if(dl<RING_THICK*1.2){var b=Math.exp(-(dl*dl)/(RING_THICK*RING_THICK*.45))*(1-k*(rip.big?.12:.25))*life*inner*boost;if(b>G)G=b}}
    var delta=Math.abs(pixR-ringR);if(delta>RING_THICK*2.5)return 0;
    return Math.exp(-(delta*delta)/(RING_THICK*RING_THICK))*life*inner*1.8;
  }
  function resize(){
    var W=el.parentNode.clientWidth,H=el.parentNode.clientHeight;
    var tmp=document.createElement('span');
    tmp.style.cssText='font-family:Space Mono,monospace;font-size:11px;line-height:1.18;letter-spacing:.06em;position:absolute;visibility:hidden;white-space:pre';
    tmp.textContent='X';document.body.appendChild(tmp);
    CW=tmp.offsetWidth||7.2;CH=tmp.offsetHeight||13;document.body.removeChild(tmp);
    COLS=Math.ceil(W/CW)+1;ROWS=Math.ceil(H/CH)+1;aspect=(COLS*CW)/(ROWS*CH);
  }
  var lastTime=0;
  function render(ts){
    if(!el.offsetParent){lastTime=ts;animId=requestAnimationFrame(render);return}
    var dt=Math.min((ts-lastTime)/1000,.05);lastTime=ts;t+=dt*.48;
    for(var i=ripples.length-1;i>=0;i--)if((t-ripples[i].born)>RIPPLE_LIFE+.1)ripples.splice(i,1);
    if(disc.s<.03&&cursorActive){disc.x=disc.tx;disc.y=disc.ty}
    disc.x+=(disc.tx-disc.x)*Math.min(1,dt*9);disc.y+=(disc.ty-disc.y)*Math.min(1,dt*9);
    disc.s+=((cursorActive?1:0)-disc.s)*Math.min(1,dt*7);disc.a+=dt*4.2;
    var R=DR*disc.s,R2=R*R,RL=RAMP.length-1,lines=[],lines2=[];
    for(var row=0;row<ROWS;row++){
      var ny=row/ROWS,a='',b='',cy=(row+.5)*CH-disc.y;
      for(var col=0;col<COLS;col++){
        var nx=col/COLS;G=0;
        var w=chaosField(nx,ny,t);
        for(var k=0;k<ripples.length;k++)w+=rippleField(ripples[k],nx,ny,t);
        w+=noise2(nx*9+t*.06,ny*9+t*.05)*.03;
        var ch=null;
        if(disc.s>.03){var cx=(col+.5)*CW-disc.x,r2=cx*cx+cy*cy;
          if(r2<R2){var u=Math.sqrt(r2)/R;
            if(u<.07)ch=' ';else if(u>.93)ch='@';else if(u<.3)ch=(Math.cos(Math.atan2(cy,cx)-disc.a)>0.2)?'%':'*';
            else{var wd=Math.pow(Math.max(0,Math.cos(Math.atan2(cy,cx)-disc.a)),6),v=.18+.4*(.5+.5*Math.sin(u*20))+.5*wd;
              ch=D[Math.min(D.length-1,Math.floor(v*D.length))]}}}
        if(ch===null&&G>.3)ch=GR[Math.min(GR.length-1,Math.floor((G-.3)/.9*GR.length))];
        if(ch!==null){a+=' ';b+=ch}
        else{a+=RAMP[Math.round(Math.pow(Math.min(1,Math.abs(w)),.62)*RL)];b+=' '}
      }
      lines.push(a);lines2.push(b);
    }
    el.textContent=lines.join('\n');el2.textContent=lines2.join('\n');
    var target=cursorActive?OPACITY_ACTIVE:OPACITY_REST;
    cursorOpacity+=(target-cursorOpacity)*Math.min(1,dt*OPACITY_EASE);
    el.style.opacity=cursorOpacity;
    if(cursorActive&&(t-lastMoveTime)>1.8)cursorActive=false;
    animId=requestAnimationFrame(render);
  }
  function heroPos(e){var r=el.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height,px:e.clientX-r.left,py:e.clientY-r.top,inside:e.clientY>=r.top&&e.clientY<=r.bottom}}
  on(window,'resize',resize);
  on(window,'mousemove',function(e){
    var p=heroPos(e);if(!p.inside){cursorActive=false;return;}
    var dx=p.x-mouse.x,dy=p.y-mouse.y;mouse.x=p.x;mouse.y=p.y;
    disc.tx=p.px;disc.ty=p.py;cursorActive=true;lastMoveTime=t;
    if(Math.sqrt(dx*dx+dy*dy)>.009)spawnRipple(p.x,p.y);
  });
  on(window,'click',function(e){var p=heroPos(e);if(p.inside)spawnRipple(p.x,p.y,true)});
  on(document,'mouseleave',function(){cursorActive=false});
  resize();
  animId=requestAnimationFrame(function(ts){lastTime=ts;render(ts)});
  return function(){cancelAnimationFrame(animId);cleanups.forEach(function(f){f()})}
}
