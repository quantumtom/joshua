(function(){/*
 MIT

 @module WOPR

 Each satellite generates an image every thirty minutes. The second satellite timing is
 offset fifteen minutes from the first.

 Example:

 GOES-N timing        1200Z    |   1230Z    |   1300Z    |   1330Z
 GOES-P timing        1215Z    |   1245Z    |   1315Z    |   1345Z
*/
(function(){function a(){a.a=document.getElementById("viewerPanel");a.f=document.getElementById("theMapList");a.c=document.getElementById("theEnhancementList");a.o();a.m();a.b();a.h()}a.o=function(){a.f.addEventListener("change",function(){a.b()});a.c.addEventListener("change",function(){a.b()})};a.u=function(){a.D=a.f[a.f.selectedIndex].value;a.C=a.c[a.c.selectedIndex].value};a.b=function(){a.u();a.s();a.v()};a.m=function(){Date.prototype.i=function(){var b=this.getMonth(),a=this.getDate(),d=[31,
29,31,30,31,30,31,31,30,31,30,31],f=0,e;this.getYear()%4&&(d[1]=28);for(e=0;e<b;e+=1)f+=d[e];return(f+a).g(3)};Date.prototype.j=function(){return this.getHours().g(2)};Date.prototype.l=function(){return this.getMinutes().A()};Number.prototype.A=function(){var a;a=Math.floor(this/30);return a*=30};Number.prototype.g=function(a){for(var c=this.toString();c.length<a;)c="0"+c;return c}};a.B=function(b){var c="http://www.ssd.noaa.gov/"+a.D+"/img/",d=b.getFullYear(),f=b.i(),e=b.j();b=b.l();0<=c.search("east")&&
(b+=15);0===b&&(b="00");return c+(d+f+"_"+e+b)+a.C+".jpg"};a.w=function(){var b=new Date;b.setUTCHours(b.getUTCHours()-1);var c,d=[];for(c=0;15>c;c+=1)d.push(a.B(b)),b.setMinutes(b.getMinutes()+30);return d};a.s=function(){for(;a.a.firstChild;)a.a.removeChild(a.a.firstChild)};a.v=function(){var b,c,d=a.w();for(b=0;b<d.length;b++)c=document.createElement("img"),c.src=d[b],c.setAttribute("alt","Image #"+(b+1).g(2)),c.classList.add("hidden"),c.classList.add("frame"),a.a.appendChild(c)};a.h=function(b){var c=
document.getElementsByClassName("frame");b||(b=0);setTimeout(function(){c.item(b).classList.add("hidden");b<c.length-1?b+=1:b=0;c.item(b).classList.remove("hidden");a.h(b)},160)};a.call()})();}).call(window);
//# sourceMappingURL=wopr.js.map.json
