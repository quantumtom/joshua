(function(){/*
 MIT

 @module APP
*/
'use strict';(function(){var a={g:function(){a.a=document.getElementById("panelRoot");a.d=document.getElementById("theEnhancementList");a.b=document.getElementById("theMapList");a.f=function(){var d=a.d;return d[d.selectedIndex].value};a.j()},c:{h:function(d,a){var c,b;b=""+d;for(c=0;c<a;c+=1)b.length<a&&(b="0"+b);return b},e:function(a){var e=a.getMonth(),c=a.getDate(),b=[31,29,31,30,31,30,31,31,30,31,30,31],f=0;a.getYear()%4&&(b[1]=28);for(a=0;a<e;a+=1)f+=b[a];return f+c},i:function(a,e){a=Math.floor(a/
e);return a*e}},j:function(){function d(){var c=new Date;c.setHours(c.getHours()-4);for(var b,f;a.a.firstChild;)a.a.removeChild(a.a.firstChild);for(b=0;20>b;b+=1){var d=f=document.createElement("img"),e=c.getFullYear(),g=c.getMinutes(),h=c.getHours(),k=a.c.e(c),l="http://www.ssd.noaa.gov/"+a.b[a.b.selectedIndex].value+"/img/",p=30,m=0,q=a.f(),n=a.c.h,r=a.c.i,k=n(k,3),h=n(h,2);0<=l.search("mtsat")&&(p=59,m=32);0<=l.search("east")&&(m=15);g=r(g,p);g+=m;g=n(g,2);d.src=l+e+k+"_"+h+g+q+".jpg";f.classList.add("hidden");
f.classList.add("frame");f.setAttribute("alt","Image "+b+" unavailable.");a.a.appendChild(f);c.setMinutes(c.getMinutes()+30)}}function e(a){var b=document.getElementsByClassName("frame");a||(a=0);setTimeout(function(){a<b.length-1?(b.item(a).classList.add("hidden"),a+=1,b.item(a).classList.remove("hidden"),e(a)):(b.item(a).classList.add("hidden"),b.item(0).classList.remove("hidden"),e(0))},133)}d();e(0);a.b.addEventListener("change",function(){d()});a.d.addEventListener("change",function(){d()})}};
a.g()})();}).call(window);
//# sourceMappingURL=app.js.map
