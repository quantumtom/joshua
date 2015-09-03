(function(){/*
 MIT

 @module WOPR.helpers

 A library of a few little helper functions.

*/
Date.prototype.a=function(){var a=this.getMonth(),b=this.getDate(),c=[31,29,31,30,31,30,31,31,30,31,30,31],d=0,e;this.getYear()%4&&(c[1]=28);for(e=0;e<a;e+=1)d+=c[e];return d=(d+b).f(3)};Date.prototype.b=function(){var a=this.getHours();return a=a.f(2)};Date.prototype.c=function(){return this.getMinutes().v()};Number.prototype.v=function(){var a;a=Math.floor(this/30);return a*=30};Number.prototype.f=function(a){for(var b=this.toString();b.length<a;)b="0"+b;return b};/*
 MIT

 @module WOPR.main

 Each satellite generates an image every thirty minutes. The second satellite timing is
 offset fifteen minutes from the first.

 Example:

 GOES-N timing        1200Z    |   1230Z    |   1300Z    |   1330Z
 GOES-P timing        1215Z    |   1245Z    |   1315Z    |   1345Z
*/
(function(){function a(){a.m();a.h();a.c(0)}a.a={j:document.getElementById("mapList"),g:document.getElementById("enhancementList")};a.m=function(){for(var b in a.a)a.a[b].addEventListener("change",function(){a.h();console.log("change")});a.l=160;a.b=document.getElementById("display")};a.h=function(){a.i=a.a.j[a.a.j.selectedIndex].value;a.u=a.a.g[a.a.g.selectedIndex].value;for(var b,c,d=a.o();a.b.firstChild;)a.b.removeChild(a.b.firstChild);for(b=0;b<d.length;b++)c=document.createElement("img"),c.src=
d[b],c.setAttribute("alt","Image #"+(b+1).f(2)),c.classList.add("frame"),c.classList.add("hidden"),a.b.appendChild(c)};a.s=function(b){var c="http://www.ssd.noaa.gov/"+a.i+"/img/",d=b.c();b=b.getFullYear()+b.a()+"_"+b.b();0<=a.i.search("east")&&(d+=15);0===d&&(d="00");return c+(b+d)+a.u+".jpg"};a.o=function(){var b=new Date;b.setUTCHours(b.getUTCHours()-1);var c,d=[];for(c=0;15>c;c+=1)d.push(a.s(b)),b.setUTCMinutes(b.getUTCMinutes()+30);return d};a.c=function(b){var c=document.getElementsByClassName("frame");
if(""==b||null==b||null==typeof b)b=0;setTimeout(function(){c.item(b).classList.add("hidden");b=b<c.length-1?b+1:0;c.item(b).classList.remove("hidden");a.c(b)},a.l)};a.call()})();}).call(window);
//# sourceMappingURL=wopr.js.map.json
