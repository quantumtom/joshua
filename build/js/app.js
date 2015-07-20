(function(){/*
 MIT

 @module WOPR
*/
'use strict';(function(){var b={k:function(){b.j();b.b();b.e()},j:function(){b.a=document.getElementById("panelRoot");b.f=document.getElementById("theEnhancementList");b.d=document.getElementById("theMapList");b.d.addEventListener("change",function(){b.b()});b.f.addEventListener("change",function(){b.b()});b.m=new b.n;Date.prototype.g=function(){var a=this.getMonth(),b=this.getDate(),d=[31,29,31,30,31,30,31,31,30,31,30,31],c=0,f;this.getYear()%4&&(d[1]=28);for(f=0;f<a;f+=1)c+=d[f];return c+b}},n:function(){this.l=
function(a,b){a=Math.floor(a/b);return a*b};this.c=function(a,b){var d,c;c=""+a;for(d=0;d<b;d+=1)c.length<b&&(c="0"+c);return c};this.h=function(){var a=b.f;return a[a.selectedIndex].value};this.i=function(){var a=new Date;a.setHours(a.getHours()-4);return a}},b:function(){for(var a=b.m;b.a.firstChild;)b.a.removeChild(b.a.firstChild);var e=a.i(),d,c;for(d=0;20>d;d+=1){var f=c=document.createElement("img"),p=e.getFullYear(),g=e.getMinutes(),h=e.getHours(),k=e.g(),l="http://www.ssd.noaa.gov/"+b.d[b.d.selectedIndex].value+
"/img/",n=30,m=0,k=a.c(k,3),h=a.c(h,2);0<=l.search("mtsat")&&(n=59,m=32);0<=l.search("east")&&(m=15);g=a.l(g,n);g+=m;g=a.c(g,2);f.src=l+p+k+"_"+h+g+a.h()+".jpg";c.classList.add("hidden");c.classList.add("frame");c.setAttribute("alt","Image "+d);b.a.appendChild(c);e.setMinutes(e.getMinutes()+30)}},e:function(a){var e=document.getElementsByClassName("frame");a||(a=0);setTimeout(function(){e.item(a).classList.add("hidden");a<e.length-1?a+=1:a=0;e.item(a).classList.remove("hidden");b.e(a)},50)}};b.k()})();}).call(window);
//# sourceMappingURL=app.js.map
