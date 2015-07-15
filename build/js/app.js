(function(){/*
 MIT

 @module APP
*/
'use strict';(function(){var a={g:function(){a.a=document.getElementById("panelRoot");a.d=document.getElementById("theEnhancementList");a.b=document.getElementById("theMapList");a.j=function(){for(;a.a.firstChild;)a.a.removeChild(a.a.firstChild)};a.f=function(){var c=a.d;return c[c.selectedIndex].value};a.l=function(){var c=new Date;c.setHours(c.getHours()-4);return c};a.k()},c:{h:function(c,a){var d,b;b=""+c;for(d=0;d<a;d+=1)b.length<a&&(b="0"+b);return b},e:function(a){var e=a.getMonth(),d=a.getDate(),
b=[31,29,31,30,31,30,31,31,30,31,30,31],g=0;a.getYear()%4&&(b[1]=28);for(a=0;a<e;a+=1)g+=b[a];return g+d},i:function(a,e){a=Math.floor(a/e);return a*e}},k:function(){function c(){var d=a.l(),b,c;a.j();for(b=0;20>b;b+=1){var e=c=document.createElement("img"),q=d.getFullYear(),f=d.getMinutes(),h=d.getHours(),k=a.c.e(d),l="http://www.ssd.noaa.gov/"+a.b[a.b.selectedIndex].value+"/img/",p=30,m=0,r=a.f(),n=a.c.h,t=a.c.i,k=n(k,3),h=n(h,2);0<=l.search("mtsat")&&(p=59,m=32);0<=l.search("east")&&(m=15);f=t(f,
p);f+=m;f=n(f,2);e.src=l+q+k+"_"+h+f+r+".jpg";c.classList.add("hidden");c.classList.add("frame");c.setAttribute("alt","Image "+b+" unavailable.");a.a.appendChild(c);d.setMinutes(d.getMinutes()+30)}}function e(a){var b=document.getElementsByClassName("frame");a||(a=0);setTimeout(function(){a<b.length-1?(b.item(a).classList.add("hidden"),a+=1,b.item(a).classList.remove("hidden"),e(a)):(b.item(a).classList.add("hidden"),b.item(0).classList.remove("hidden"),e(0))},133)}c();e(0);a.b.addEventListener("change",
function(){c()});a.d.addEventListener("change",function(){c()})}};a.g()})();}).call(window);
//# sourceMappingURL=app.js.map
