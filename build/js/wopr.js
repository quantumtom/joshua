(function(){/*
 MIT

 @module WOPR

 Each satellite generates an image every thirty minutes. The second satellite timing is
 offset fifteen minutes from the first.

 Example:

 GOES-N timing        1200Z    |   1230Z    |   1300Z    |   1330Z
 GOES-P timing        1215Z    |   1245Z    |   1315Z    |   1345Z
*/
(function(){function b(){b.a=document.getElementById("viewerPanel");b.f=document.getElementById("theMapList");b.c=document.getElementById("theEnhancementList");b.o();b.b();b.h();b.f.addEventListener("change",function(){b.b()});b.c.addEventListener("change",function(){b.b()})}b.b=function(){b.i=b.f[b.f.selectedIndex].value;b.B=b.c[b.c.selectedIndex].value;b.s();b.u()};b.o=function(){Date.prototype.j=function(){var a=this.getMonth(),b=this.getDate(),d=[31,29,31,30,31,30,31,31,30,31,30,31],e=0,f;this.getYear()%
4&&(d[1]=28);for(f=0;f<a;f+=1)e+=d[f];return e=(e+b).g(3)};Date.prototype.l=function(){var a=this.getHours();return a=a.g(2)};Date.prototype.m=function(){return this.getMinutes().A()};Number.prototype.A=function(){var a;a=Math.floor(this/30);return a*=30};Number.prototype.g=function(a){for(var b=this.toString();b.length<a;)b="0"+b;return b}};b.w=function(a){var c="http://www.ssd.noaa.gov/"+b.i+"/img/",d=a.getFullYear(),e=a.j(),f=a.l();a=a.m();0<=b.i.search("east")&&(a+=15);0===a&&(a="00");return c+
(d+e+"_"+f+a)+b.B+".jpg"};b.v=function(){var a=new Date;a.setUTCHours(a.getUTCHours()-1);var c,d=[];for(c=0;15>c;c+=1)d.push(b.w(a)),a.setMinutes(a.getMinutes()+30);return d};b.s=function(){for(;b.a.firstChild;)b.a.removeChild(b.a.firstChild)};b.u=function(){var a,c,d=b.v(),e;for(a=0;a<d.length;a++)e="image_"+a,c=document.createElement("img"),c.src=d[a],c.id=e,c.setAttribute("alt","Image #"+(a+1).g(2)),c.classList.add("NOAA_JPEG"),c.classList.add("hidden"),c.classList.add("frame"),b.a.appendChild(c),
c=document.getElementById(e),console.dir(c)};b.h=function(a){var c=document.getElementsByClassName("frame");a||(a=0);setTimeout(function(){c.item(a).classList.add("hidden");a<c.length-1?a+=1:a=0;c.item(a).classList.remove("hidden");b.h(a)},160)};b.call()})();}).call(window);
//# sourceMappingURL=wopr.js.map.json
