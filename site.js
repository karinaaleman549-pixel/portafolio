(function(){
  var d=document,de=d.documentElement;
  var links=d.getElementById('sn-links'),act=links&&links.querySelector('[aria-current]');
  if(act)links.scrollLeft=act.offsetLeft-(links.clientWidth-act.offsetWidth)/2;
  /* línea de lectura */
  var bar=d.getElementById('sn-prog');
  if(bar){
    var i=bar.firstElementChild;
    var upd=function(){
      var max=de.scrollHeight-window.innerHeight,y=window.pageYOffset||de.scrollTop||0;
      if(max<window.innerHeight*0.6){bar.classList.remove('on');return}
      i.style.transform='scaleX('+Math.min(1,y/max)+')';bar.classList.add('on');
    };
    window.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);window.addEventListener('load',upd);upd();
  }
  /* menú lateral */
  var dr=d.getElementById('sn-drawer'),ov=d.getElementById('sn-ov'),bt=d.getElementById('sn-burger'),cl=d.getElementById('sn-close');
  if(dr&&bt){
    var last=null;
    var open=function(){
      last=d.activeElement;dr.classList.add('on');ov.classList.add('on');de.classList.add('sn-lock');
      bt.setAttribute('aria-expanded','true');dr.setAttribute('aria-hidden','false');
      setTimeout(function(){var f=dr.querySelector('a[aria-current]')||dr.querySelector('a');if(f)f.focus()},60);
    };
    var close=function(back){
      dr.classList.remove('on');ov.classList.remove('on');de.classList.remove('sn-lock');
      bt.setAttribute('aria-expanded','false');dr.setAttribute('aria-hidden','true');
      if(back!==false&&last&&last.focus)last.focus();
    };
    bt.addEventListener('click',open);cl.addEventListener('click',function(){close()});ov.addEventListener('click',function(){close()});
    dr.addEventListener('click',function(e){if(e.target.closest('a'))close(false)});
    d.addEventListener('keydown',function(e){
      if(!dr.classList.contains('on'))return;
      if(e.key==='Escape'){close();return}
      if(e.key==='Tab'){
        var f=dr.querySelectorAll('a,button'),a=f[0],z=f[f.length-1];
        if(e.shiftKey&&d.activeElement===a){e.preventDefault();z.focus()}
        else if(!e.shiftKey&&d.activeElement===z){e.preventDefault();a.focus()}
      }
    });
    if(window.matchMedia){var mq=window.matchMedia('(min-width:900px)');var h=function(e){if(e.matches)close(false)};mq.addEventListener?mq.addEventListener('change',h):mq.addListener(h)}
  }
})();
