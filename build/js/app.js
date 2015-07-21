(function(){/*
 MIT

 @module WOPR
*/
'use strict';(function(){var a={i:function(){a.l();a.h();a.b();a.e()},l:function(){a.a=document.getElementById("panelRoot");a.d=document.getElementById("theMapList");a.c=document.getElementById("theEnhancementList");a.d.addEventListener("change",function(){a.b()});a.c.addEventListener("change",function(){a.b()});a.m=a.c[a.c.selectedIndex].value},h:function(){Date.prototype.f=function(){var b=new Date;b.setHours(b.getHours()-4);return b};Date.prototype.g=function(){var b=this.getMonth(),a=this.getDate(),
f=[31,29,31,30,31,30,31,31,30,31,30,31],c=0,e;this.getYear()%4&&(f[1]=28);for(e=0;e<b;e+=1)c+=f[e];return c+a};Number.prototype.k=function(a){var d;d=Math.floor(this/a);return d*=a};Number.prototype.j=function(){for(var a=this.toString();2>a.length;)a="0"+a;return a.valueOf()}},n:function(){},b:function(){function b(b){var d=b.getFullYear(),c=b.getMinutes(),f=b.getHours();b=b.g();var e="http://www.ssd.noaa.gov/"+a.d[a.d.selectedIndex].value+"/img/",h=30,g=0;0<=e.search("mtsat")&&(h=59,g=32);0<=e.search("east")&&
(g=15);c=c.k(h);c+=g;0===c&&(c="00");return e+d+b+"_"+f+c+a.m+".jpg"}for(;a.a.firstChild;)a.a.removeChild(a.a.firstChild);var d=(new Date).f(),f,c,e=function(){var a=[],c;for(c=0;20>c;c+=1)a.push(b(d)),d.setMinutes(d.getMinutes()+30);return a}();for(f=0;f<e.length;f+=1)c=document.createElement("img"),c.src=e[f],c.setAttribute("alt","Satellite Weather Image #"+f.j()),c.classList.add("hidden"),c.classList.add("frame"),a.a.appendChild(c)},e:function(b){var d=document.getElementsByClassName("frame");
b||(b=0);setTimeout(function(){d.item(b).classList.add("hidden");b<d.length-1?b+=1:b=0;d.item(b).classList.remove("hidden");a.e(b)},50)}};a.i()})();}).call(window);
//# sourceMappingURL=app.js.map
