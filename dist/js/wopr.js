(function(){/*
 MIT

 @module WOPR.helpers

 A library of a few little helper functions.

*/
Date.prototype.m=function(){var a=this.getMonth(),b=this.getDate(),c=[31,29,31,30,31,30,31,31,30,31,30,31],d=0,e;this.getYear()%4&&(c[1]=28);for(e=0;e<a;e+=1)d+=c[e];return d=(d+b).a(3)};Date.prototype.s=function(){var a=this.getHours();return a=a.a(2)};Date.prototype.u=function(){return this.getMinutes().A()};Number.prototype.A=function(){var a;a=Math.floor(this/30);return a*=30};Number.prototype.a=function(a){for(var b=this.toString();b.length<a;)b="0"+b;return b};/*
 MIT

 @module WOPR.main

 Each satellite generates an image every thirty minutes. The second satellite timing is
 offset fifteen minutes from the first.

 Example:

 GOES-N timing        1200Z    |   1230Z    |   1300Z    |   1330Z
 GOES-P timing        1215Z    |   1245Z    |   1315Z    |   1345Z
*/
(function(){function a(){a.j();a.c();a.b(0)}a.j=function(){this.interval=160;this.display=document.getElementById("display");this.controls={h:document.getElementById("regionList"),f:document.getElementById("enhancementList")};this.o=function(){return this.controls.f[this.controls.f.selectedIndex].value};this.g=function(){return this.controls.h[this.controls.h.selectedIndex].value};this.i=function(a){this.startTime=a};this.w=function(){var b="http://www.ssd.noaa.gov/"+a.g()+"/img/",c=a.startTime.u(),
c=0<a.g().search("east")?c+15:c,c=0===c?"00":c.a(2);return b+(a.startTime.getFullYear()+a.startTime.m()+"_"+a.startTime.s()+c+a.o()+".jpg")};this.v=function(){var b=[],c;c=a.startTime;for(var d=0;15>d;d+=1)b.push(a.w()),c.setUTCMinutes(c.getUTCMinutes()+30),a.i(c);return b}};a.c=function(){var b=new Date;b.setUTCHours(b.getUTCHours()-1);a.i(b);for(var c in a.controls)a.controls[c].addEventListener("change",function(){a.c()});a.l()};a.l=function(){for(var b,c=a.v();a.display.firstChild;)a.display.removeChild(a.display.firstChild);
for(var d=0;d<c.length;d++)b=document.createElement("img"),b.src=c[d],b.setAttribute("alt","Image #"+(d+1).a(2)),b.classList.add("frame"),b.classList.add("hidden"),a.display.appendChild(b)};a.b=function(b){var c=document.getElementsByClassName("frame");if(""==b||null==b||null==typeof b)b=0;setTimeout(function(){c.item(b).classList.add("hidden");b=b<c.length-1?b+1:0;c.item(b).classList.remove("hidden");a.b(b)},a.interval)};a.call()})();}).call(window);
//# sourceMappingURL=wopr.js.map.json
