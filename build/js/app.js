(function(){/*
 MIT

 @module APP
*/
'use strict';(function(){var a={f:function(){a.a=document.getElementById("panelRoot");a.d=document.getElementById("theEnhancementList");a.c=document.getElementById("theMapList");a.c.addEventListener("change",function(){a.b()});a.d.addEventListener("change",function(){a.b()})},e:function(a){function f(a){var b=document.getElementsByClassName("frame");a||(a=0);setTimeout(function(){a<b.length-1?(b.item(a).classList.add("hidden"),a+=1,b.item(a).classList.remove("hidden"),f(a)):(b.item(a).classList.add("hidden"),
b.item(0).classList.remove("hidden"),f(0))},50)}return f(a)},g:function(){a.f();a.b();a.e(0)},b:function(){function l(a,b){var d,g;g=""+a;for(d=0;d<b;d+=1)g.length<b&&(g="0"+g);return g}function f(c){var b=c.getFullYear(),d=c.getMinutes(),g=c.getHours(),e;e=c.getMonth();var f=c.getDate(),k=[31,29,31,30,31,30,31,31,30,31,30,31],h=0;c.getYear()%4&&(k[1]=28);for(c=0;c<e;c+=1)h+=k[c];e=h+f;f="http://www.ssd.noaa.gov/"+a.c[a.c.selectedIndex].value+"/img/";k=30;h=0;c=a.d;c=c[c.selectedIndex].value;e=l(e,
3);g=l(g,2);0<=f.search("mtsat")&&(k=59,h=32);0<=f.search("east")&&(h=15);d=d/k;d=Math.floor(d);d=d*k;d=l(d+h,2);return f+b+e+"_"+g+d+c+".jpg"}for(;a.a.firstChild;)a.a.removeChild(a.a.firstChild);var m=function(){var a=new Date;a.setHours(a.getHours()-4);return a}(),b,e;for(b=0;20>b;b+=1)e=document.createElement("img"),e.src=f(m),e.classList.add("hidden"),e.classList.add("frame"),e.setAttribute("alt","Image "+b),a.a.appendChild(e),m.setMinutes(m.getMinutes()+30)}};a.g()})();}).call(window);
//# sourceMappingURL=app.js.map
