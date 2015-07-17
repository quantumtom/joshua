(function(){/*
 MIT

 @module APP
*/
'use strict';(function(){var a={h:function(){a.g();a.b();a.d(0)},g:function(){a.a=document.getElementById("panelRoot");a.e=document.getElementById("theEnhancementList");a.c=document.getElementById("theMapList");a.c.addEventListener("change",function(){a.b()});a.e.addEventListener("change",function(){a.b()});a.f=function(){var b=a.e;return b[b.selectedIndex].value}},b:function(){function b(a,b){var c,f;f=""+a;for(c=0;c<b;c+=1)f.length<b&&(f="0"+f);return f}function e(d){var g=d.getFullYear(),c=d.getMinutes(),
f=d.getHours(),k;k=d.getMonth();var e=d.getDate(),l=[31,29,31,30,31,30,31,31,30,31,30,31],h=0;d.getYear()%4&&(l[1]=28);for(d=0;d<k;d+=1)h+=l[d];k=h+e;e="http://www.ssd.noaa.gov/"+a.c[a.c.selectedIndex].value+"/img/";l=30;h=0;k=b(k,3);f=b(f,2);0<=e.search("mtsat")&&(l=59,h=32);0<=e.search("east")&&(h=15);c=c/l;c=Math.floor(c);c=c*l;c=b(c+h,2);return e+g+k+"_"+f+c+a.f()+".jpg"}for(;a.a.firstChild;)a.a.removeChild(a.a.firstChild);var n=function(){var a=new Date;a.setHours(a.getHours()-4);return a}(),
m,g;for(m=0;20>m;m+=1)g=document.createElement("img"),g.src=e(n),g.classList.add("hidden"),g.classList.add("frame"),g.setAttribute("alt","Image "+m),a.a.appendChild(g),n.setMinutes(n.getMinutes()+30)},d:function(b){var e=document.getElementsByClassName("frame");b||(b=0);setTimeout(function(){e.item(b).classList.add("hidden");b<e.length-1?b+=1:b=0;e.item(b).classList.remove("hidden");a.d(b)},50)}};a.h()})();}).call(window);
//# sourceMappingURL=app.js.map
