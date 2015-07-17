(function(){/*
 MIT

 @module APP
*/
'use strict';(function(){var a={g:function(){a.f();a.b();a.d()},f:function(){a.a=document.getElementById("panelRoot");a.e=document.getElementById("theEnhancementList");a.c=document.getElementById("theMapList");a.c.addEventListener("change",function(){a.b()});a.e.addEventListener("change",function(){a.b()})},b:function(){function b(a,b){var c,f;f=""+a;for(c=0;c<b;c+=1)f.length<b&&(f="0"+f);return f}function e(d){var h=d.getFullYear(),c=d.getMinutes(),f=d.getHours(),l;l=d.getMonth();var e=d.getDate(),
g=[31,29,31,30,31,30,31,31,30,31,30,31],k=0;d.getYear()%4&&(g[1]=28);for(d=0;d<l;d+=1)k+=g[d];l=k+e;e="http://www.ssd.noaa.gov/"+a.c[a.c.selectedIndex].value+"/img/";g=30;k=0;l=b(l,3);f=b(f,2);0<=e.search("mtsat")&&(g=59,k=32);0<=e.search("east")&&(k=15);c=c/g;c=Math.floor(c);c=c*g;c=b(c+k,2);g=a.e;return e+h+l+"_"+f+c+g[g.selectedIndex].value+".jpg"}for(;a.a.firstChild;)a.a.removeChild(a.a.firstChild);var n=function(){var a=new Date;a.setHours(a.getHours()-4);return a}(),m,h;for(m=0;20>m;m+=1)h=
document.createElement("img"),h.src=e(n),h.classList.add("hidden"),h.classList.add("frame"),h.setAttribute("alt","Image "+m),a.a.appendChild(h),n.setMinutes(n.getMinutes()+30)},d:function(b){var e=document.getElementsByClassName("frame");b||(b=0);setTimeout(function(){e.item(b).classList.add("hidden");b<e.length-1?b+=1:b=0;e.item(b).classList.remove("hidden");a.d(b)},50)}};a.g()})();}).call(window);
//# sourceMappingURL=app.js.map
