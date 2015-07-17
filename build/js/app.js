(function(){/*
 MIT

 @module APP
*/
'use strict';(function(){var b={e:function(){function l(a,g){var b,e;e=""+a;for(b=0;b<g;b+=1)e.length<g&&(e="0"+e);return e}function f(){var a=new Date;a.setHours(a.getHours()-4);for(var g,h;b.a.firstChild;)b.a.removeChild(b.a.firstChild);for(g=0;20>g;g+=1){var e=h=document.createElement("img"),q=a.getFullYear(),c=a.getMinutes(),f=a.getHours(),d=b.f.d(a),m="http://www.ssd.noaa.gov/"+b.b[b.b.selectedIndex].value+"/img/",n=30,p=0,k;k=b.c;k=k[k.selectedIndex].value;d=l(d,3);f=l(f,2);0<=m.search("mtsat")&&
(n=59,p=32);0<=m.search("east")&&(p=15);c=c/n;c=Math.floor(c);c=c*n;c+=p;c=l(c,2);e.src=m+q+d+"_"+f+c+k+".jpg";h.classList.add("hidden");h.classList.add("frame");h.setAttribute("alt","Image "+g);b.a.appendChild(h);a.setMinutes(a.getMinutes()+30)}}function d(a){var b=document.getElementsByClassName("frame");a||(a=0);setTimeout(function(){a<b.length-1?(b.item(a).classList.add("hidden"),a+=1,b.item(a).classList.remove("hidden"),d(a)):(b.item(a).classList.add("hidden"),b.item(0).classList.remove("hidden"),
d(0))},133)}b.a=document.getElementById("panelRoot");b.c=document.getElementById("theEnhancementList");b.b=document.getElementById("theMapList");b.f={d:function(a){var b=a.getMonth(),f=a.getDate(),e=[31,29,31,30,31,30,31,31,30,31,30,31],d=0;a.getYear()%4&&(e[1]=28);for(a=0;a<b;a+=1)d+=e[a];return d+f}};f();d(0);b.b.addEventListener("change",function(){f()});b.c.addEventListener("change",function(){f()})}};b.e()})();}).call(window);
//# sourceMappingURL=app.js.map
