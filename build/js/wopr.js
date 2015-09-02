(function(){/*
 MIT

 @module WOPR.helpers

 A library of a few little helper functions.

*/
Date.prototype.a=function(){var a=this.getMonth(),b=this.getDate(),c=[31,29,31,30,31,30,31,31,30,31,30,31],d=0,e;this.getYear()%4&&(c[1]=28);for(e=0;e<a;e+=1)d+=c[e];return d=(d+b).f(3)};Date.prototype.b=function(){var a=this.getHours();return a=a.f(2)};Date.prototype.c=function(){return this.getMinutes().u()};Number.prototype.u=function(){var a;a=Math.floor(this/30);return a*=30};Number.prototype.f=function(a){for(var b=this.toString();b.length<a;)b="0"+b;return b};/*
 MIT

 @module WOPR.main

 Each satellite generates an image every thirty minutes. The second satellite timing is
 offset fifteen minutes from the first.

 Example:

 GOES-N timing        1200Z    |   1230Z    |   1300Z    |   1330Z
 GOES-P timing        1215Z    |   1245Z    |   1315Z    |   1345Z
*/
(function(){function a(){a.l();a.c();a.b(0)}a.a={i:document.getElementById("mapList"),g:document.getElementById("enhancementList")};a.l=function(){for(var b in a.a)a.a[b].addEventListener("change",function(){a.c()});this.display=document.getElementById("display");this.frames=document.getElementsByClassName("frame");this.j={interval:160}};a.c=function(){a.h=a.a.i[a.a.i.selectedIndex].value;a.s=a.a.g[a.a.g.selectedIndex].value;for(var b,c,d=a.m();a.display.firstChild;)a.display.removeChild(a.display.firstChild);
for(b=0;b<d.length;b++)c=document.createElement("img"),c.src=d[b],c.setAttribute("alt","Image #"+(b+1).f(2)),c.classList.add("frame"),a.display.appendChild(c)};a.o=function(b){var c="http://www.ssd.noaa.gov/"+a.h+"/img/",d=b.c();b=b.getFullYear()+b.a()+"_"+b.b();0<=a.h.search("east")&&(d+=15);d||(d="00");return c+(b+d)+a.s+".jpg"};a.m=function(){var b=new Date;b.setUTCHours(b.getUTCHours()-1);for(var c=[],d=0;15>d;d+=1)c.push(a.o(b)),b.setUTCMinutes(b.getUTCMinutes()+30);return c};a.b=function(b){var c=
a.frames;b||(b=0);setTimeout(function(){c.item(b).classList.add("hidden");b=b<c.length-1?b+1:0;c.item(b).classList.remove("hidden");a.b(b)},a.j.interval)};a.call()})();}).call(window);
//# sourceMappingURL=wopr.js.map.json
