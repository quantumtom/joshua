(function(){/*
 MIT

 @module WOPR

 Each satellite generates an image every thirty minutes. The second satellite timing is
 offset fifteen minutes from the first.

 Example:

 GOES-N timing        1200Z    |   1230Z    |   1300Z    |   1330Z
 GOES-P timing        1215Z    |   1245Z    |   1315Z    |   1345Z
*/
(function(){function a(){a.a=document.getElementById("viewerPanel");a.f=document.getElementById("theMapList");a.c=document.getElementById("theEnhancementList");a.j();a.b();a.h(0);a.f.addEventListener("change",function(){a.b()});a.c.addEventListener("change",function(){a.b()})}a.b=function(){a.i=a.f[a.f.selectedIndex].value;a.v=a.c[a.c.selectedIndex].value;a.l();a.m()};a.j=function(){Date.prototype.a=function(){var b=this.getMonth(),a=this.getDate(),d=[31,29,31,30,31,30,31,31,30,31,30,31],e=0,f;this.getYear()%
4&&(d[1]=28);for(f=0;f<b;f+=1)e+=d[f];return e=(e+a).g(3)};Date.prototype.b=function(){var b=this.getHours();return b=b.g(2)};Date.prototype.c=function(){return this.getMinutes().u()};Number.prototype.u=function(){var b;b=Math.floor(this/30);return b*=30};Number.prototype.g=function(b){for(var a=this.toString();a.length<b;)a="0"+a;return a}};a.s=function(b){var c="http://www.ssd.noaa.gov/"+a.i+"/img/",d=b.getFullYear(),e=b.a(),f=b.b();b=b.c();0<=a.i.search("east")&&(b+=15);0===b&&(b="00");return c+
(d+e+"_"+f+b)+a.v+".jpg"};a.o=function(){var b=new Date;b.setUTCHours(b.getUTCHours()-1);var c,d=[];for(c=0;15>c;c+=1)d.push(a.s(b)),b.setMinutes(b.getMinutes()+30);return d};a.l=function(){for(;a.a.firstChild;)a.a.removeChild(a.a.firstChild)};a.m=function(){var b,c,d=a.o(),e;for(b=0;b<d.length;b++)e="image_"+b,c=document.createElement("img"),c.src=d[b],c.id=e,c.setAttribute("alt","Image #"+(b+1).g(2)),c.classList.add("NOAA_JPEG"),c.classList.add("hidden"),c.classList.add("frame"),a.a.appendChild(c)};
a.h=function(b){var c=document.getElementsByClassName("frame");b=b||0;setTimeout(function(){c.item(b).classList.add("hidden");b=b<c.length-1?b+1:0;c.item(b).classList.remove("hidden");a.h(b)},160)};a.call()})();}).call(window);
//# sourceMappingURL=wopr.js.map.json
