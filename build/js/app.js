(function(){/*
 MIT

 @module WOPR
*/
'use strict';(function(){var a={k:function(){a.j();a.b();a.e()},j:function(){a.a=document.getElementById("panelRoot");a.f=document.getElementById("theEnhancementList");a.d=document.getElementById("theMapList");a.d.addEventListener("change",function(){a.b()});a.f.addEventListener("change",function(){a.b()});a.m=new a.n;Date.prototype.g=function(){var b=this.getMonth(),a=this.getDate(),f=[31,29,31,30,31,30,31,31,30,31,30,31],c=0,d;this.getYear()%4&&(f[1]=28);for(d=0;d<b;d+=1)c+=f[d];return c+a};Number.prototype.c=
function(b){var a=this.toString();for(console.log("oldString",a);a.length<b;)a="0"+a;console.log("oldString",a)}},n:function(){this.l=function(a,e){a=Math.floor(a/e);return a*e};this.h=function(){var b=a.f;return b[b.selectedIndex].value};this.i=function(){var a=new Date;a.setHours(a.getHours()-4);return a}},b:function(){function b(b){var d=b.getFullYear(),c=b.getMinutes(),f=b.getHours();b=b.g();var h="http://www.ssd.noaa.gov/"+a.d[a.d.selectedIndex].value+"/img/",g=30,k=0;b.c(3);f.c(2);0<=h.search("mtsat")&&
(g=59,k=32);0<=h.search("east")&&(k=15);c=e.l(c,g);c+=k;0===c?c="00":c.c(2);return h+d+b+"_"+f+c+e.h()+".jpg"}for(var e=a.m;a.a.firstChild;)a.a.removeChild(a.a.firstChild);var f=e.i(),c,d,g=function(){var a=[],c;for(c=0;20>c;c+=1)a.push(b(f)),f.setMinutes(f.getMinutes()+30);return a}();for(c=0;c<g.length;c+=1)d=document.createElement("img"),d.src=g[c],d.setAttribute("alt","Satellite Weather Image #"+c),d.classList.add("hidden"),d.classList.add("frame"),a.a.appendChild(d)},e:function(b){var e=document.getElementsByClassName("frame");
b||(b=0);setTimeout(function(){e.item(b).classList.add("hidden");b<e.length-1?b+=1:b=0;e.item(b).classList.remove("hidden");a.e(b)},50)}};a.k()})();}).call(window);
//# sourceMappingURL=app.js.map
