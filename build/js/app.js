(function(){/*
 MIT

 @module WOPR
*/
'use strict';(function(){var a={i:function(){a.l();a.h();a.b();a.e()},l:function(){a.a=document.getElementById("panelRoot");a.d=document.getElementById("theMapList");a.c=document.getElementById("theEnhancementList");a.d.addEventListener("change",function(){a.b()});a.c.addEventListener("change",function(){a.b()})},h:function(){Date.prototype.f=function(){var b=new Date;b.setHours(b.getHours()-4);return b};Date.prototype.g=function(){var b=this.getMonth(),a=this.getDate(),c=[31,29,31,30,31,30,31,31,
30,31,30,31],d=0,f;this.getYear()%4&&(c[1]=28);for(f=0;f<b;f+=1)d+=c[f];return d+a};Number.prototype.k=function(b){var a;a=Math.floor(this/b);return a*=b};Number.prototype.j=function(){for(var a=this;2>a.length;)a="0"+a;return a}},b:function(){function b(b){var d=b.getFullYear(),c=b.getMinutes(),f=b.getHours();b=b.g();var e=30,g=0,k=a.c[a.c.selectedIndex].value,h="http://www.ssd.noaa.gov/"+a.d[a.d.selectedIndex].value+"/img/";0<=h.search("mtsat")&&(e=59,g=32);0<=h.search("east")&&(g=15);c=c.k(e);
c+=g;0===c&&(c="00");return h+d+b+"_"+f+c+k+".jpg"}for(;a.a.firstChild;)a.a.removeChild(a.a.firstChild);var e=(new Date).f(),c,d,f=function(){var a,c=[];for(a=0;20>a;a+=1)c.push(b(e)),e.setMinutes(e.getMinutes()+30);return c}();for(c=0;c<f.length;c+=1)d=document.createElement("img"),d.src=f[c],d.setAttribute("alt","Satellite Weather Image #"+c.j()),d.classList.add("hidden"),d.classList.add("frame"),a.a.appendChild(d)},e:function(b){var e=document.getElementsByClassName("frame");b||(b=0);setTimeout(function(){e.item(b).classList.add("hidden");
b<e.length-1?b+=1:b=0;e.item(b).classList.remove("hidden");a.e(b)},50)}};a.i()})();}).call(window);
//# sourceMappingURL=app.js.map
