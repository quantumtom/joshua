(function(){/*
 MIT

 @module WOPR.view

*/
/*
 MIT

 @module WOPR.helpers

 A library of a few little helper functions.

*/
Date.prototype.o=function(){var a=this.getMonth(),b=this.getDate(),d=[31,29,31,30,31,30,31,31,30,31,30,31],c=0,e;this.getYear()%4&&(d[1]=28);for(e=0;e<a;e+=1)c+=d[e];return c=(c+b).a(3)};Date.prototype.u=function(){var a=this.getHours();return a=a.a(2)};Date.prototype.v=function(){return this.getMinutes().B()};Number.prototype.B=function(){var a;a=Math.floor(this/30);return a*=30};Number.prototype.a=function(a){for(var b=this.toString();b.length<a;)b="0"+b;return b};/*
 MIT

 @module WOPR.main

 Each satellite generates an image every thirty minutes. The second satellite timing is
 offset fifteen minutes from the first.

 Example:

 GOES-N timing        1200Z    |   1230Z    |   1300Z    |   1330Z
 GOES-P timing        1215Z    |   1245Z    |   1315Z    |   1345Z
*/
(function(){function a(){a.j();a.g();a.b(0)}a.j=function(){function b(){var b=a.startTime.v(),b=function(b){0<a.f().search("east")&&(b+=15);return b}(b),b=function(a){0===a&&(a="00");return a}(b);return a.startTime.getFullYear()+a.startTime.o()+"_"+a.startTime.u()+b}this.display=document.getElementById("display");this.controls={h:document.getElementById("regionList"),c:document.getElementById("enhancementList")};this.s=function(){return this.controls.c[this.controls.c.selectedIndex].value};this.f=
function(){return this.controls.h[this.controls.h.selectedIndex].value};this.i=function(a){this.startTime=a};this.A=function(){return"http://www.ssd.noaa.gov/"+a.f()+"/img/"+(b()+a.s()+".jpg")};this.w=function(){var b=[],c=a.startTime,e;for(e=0;15>e;e+=1)b.push(a.A()),c.setUTCMinutes(c.getUTCMinutes()+30),a.i(c);return b}};a.g=function(){var b=new Date,d;this.m=function(){this.g()};b.setUTCHours(b.getUTCHours()-1);a.i(b);for(d in a.controls)a.controls.hasOwnProperty(d)&&a.controls[d].addEventListener("change",
this.m.bind(this),!1);a.l()};a.l=function(){for(var b,d=a.w(),c;a.display.firstChild;)a.display.removeChild(a.display.firstChild);for(c=0;c<d.length;c+=1)b=document.createElement("img"),b.src=d[c],b.setAttribute("alt","Image #"+(c+1).a(2)),b.classList.add("frame"),b.classList.add("hidden"),a.display.appendChild(b)};a.b=function(b){var d=document.getElementsByClassName("frame");b&&null!==b||(b=0);setTimeout(function(){d.item(b).classList.add("hidden");b=b<d.length-1?b+1:0;d.item(b).classList.remove("hidden");
a.b(b)},160)};a.call()})();}).call(window);
//# sourceMappingURL=wopr.js.map.json
