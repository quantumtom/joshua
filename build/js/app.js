(function(){/*
 MIT

 @module WOPR
*/
'use strict';(function(){var a={j:function(){a.l();a.i();a.b();a.f()},l:function(){a.a=document.getElementById("panelRoot");a.e=document.getElementById("theMapList");a.d=document.getElementById("theEnhancementList");a.e.addEventListener("change",function(){a.b()});a.d.addEventListener("change",function(){a.b()})},i:function(){Date.prototype.g=function(){var b=new Date;b.setHours(b.getHours()-4);return b};Date.prototype.h=function(){var b=this.getMonth(),a=this.getDate(),e=[31,29,31,30,31,30,31,31,
30,31,30,31],c=0,f;this.getYear()%4&&(e[1]=28);for(f=0;f<b;f+=1)c+=e[f];return c+a};Number.prototype.k=function(a){var d;d=Math.floor(this/a);return d*=a};Number.prototype.c=function(a){for(var d=this.toString();d.length<a;)d="0"+d;return d}},b:function(){function b(b){var d=b.getFullYear(),c=b.getMinutes(),e=b.getHours();b=b.h();var f=30,g=0,k=a.d[a.d.selectedIndex].value,h="http://www.ssd.noaa.gov/"+a.e[a.e.selectedIndex].value+"/img/";b=b.c(3);e=e.c(2);0<=h.search("mtsat")&&(f=59,g=32);0<=h.search("east")&&
(g=15);c=c.k(f);c+=g;0===c&&(c="00");return h+d+b+"_"+e+c+k+".jpg"}for(;a.a.firstChild;)a.a.removeChild(a.a.firstChild);var d=(new Date).g(),e,c,f=function(){var a,c=[];for(a=0;20>a;a+=1)c.push(b(d)),d.setMinutes(d.getMinutes()+30);return c}();for(e=0;e<f.length;e+=1)c=document.createElement("img"),c.src=f[e],c.setAttribute("alt","Satellite Weather Image #"+e.c(2)),c.classList.add("hidden"),c.classList.add("frame"),a.a.appendChild(c)},f:function(b){var d=document.getElementsByClassName("frame");b||
(b=0);setTimeout(function(){d.item(b).classList.add("hidden");b<d.length-1?b+=1:b=0;d.item(b).classList.remove("hidden");a.f(b)},50)}};a.j()})();}).call(window);
//# sourceMappingURL=app.js.map
