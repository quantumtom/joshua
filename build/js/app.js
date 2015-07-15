(function(){/*
 MIT

 @module APP
*/
'use strict';var b={},b={i:function(){b.view={b:document.getElementById("panelRoot"),f:document.getElementById("theEnhancementList"),d:document.getElementById("theMapList"),k:function(){for(;b.view.b.firstChild;)b.view.b.removeChild(b.view.b.firstChild)},e:function(){return b.view.d[b.view.d.selectedIndex].value},h:function(){var a=b.view.f;return a[a.selectedIndex].value}};b.n=b.view.e();b.m=function(){var a=new Date;a.setHours(a.getHours()-4);return a};b.l()},a:{c:function(a,d){var f,c;c=""+a;for(f=
0;f<d;f+=1)c.length<d&&(c="0"+c);return c},g:function(a){var d=a.getMonth(),f=a.getDate(),c=[31,29,31,30,31,30,31,31,30,31,30,31],g=0;a.getYear()%4&&(c[1]=28);for(a=0;a<d;a+=1)g+=c[a];return g+f},j:function(a,d){a=Math.floor(a/d);return a*d}},l:function(){function a(){var a=b.m(),c,d;b.view.k();for(c=0;20>c;c+=1){var p=d=document.createElement("img"),q=a.getFullYear(),e=a.getMinutes(),h=a.getHours(),k=b.a.g(a),l="http://www.ssd.noaa.gov/"+b.view.e()+"/img/",n=30,m=0,r=b.view.h(),k=(0,b.a.c)(k,3),
h=(0,b.a.c)(h,2);0<=l.search("mtsat")&&(n=59,m=32);0<=l.search("east")&&(m=15);e=(0,b.a.j)(e,n);e+=m;e=(0,b.a.c)(e,2);p.src=l+q+k+"_"+h+e+r+".jpg";d.classList.add("hidden");d.classList.add("frame");d.setAttribute("alt","Image "+c+" unavailable.");b.view.b.appendChild(d);a.setMinutes(a.getMinutes()+30)}}function d(a){var c=document.getElementsByClassName("frame");a||(a=0);setTimeout(function(){a<c.length-1?(c.item(a).classList.add("hidden"),a+=1,c.item(a).classList.remove("hidden"),d(a)):(c.item(a).classList.add("hidden"),
c.item(0).classList.remove("hidden"),d(0))},133)}a();d(0);b.view.d.addEventListener("change",function(){a()});b.view.f.addEventListener("change",function(){a()})}};b.i();}).call(window);
//# sourceMappingURL=app.js.map
