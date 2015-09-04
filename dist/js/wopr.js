(function(){/*
 MIT

 @module WOPR.helpers

 A library of a few little helper functions.

*/
Date.prototype.B=function(){var a=this.getMonth(),b=this.getDate(),d=[31,29,31,30,31,30,31,31,30,31,30,31],c=0,e;this.getYear()%4&&(d[1]=28);for(e=0;e<a;e+=1)c+=d[e];return c=(c+b).f(3)};Date.prototype.C=function(){var a=this.getHours();return a=a.f(2)};Date.prototype.D=function(){return this.getMinutes().J()};Number.prototype.J=function(){var a;a=Math.floor(this/30);return a*=30};Number.prototype.f=function(a){for(var b=this.toString();b.length<a;)b="0"+b;return b};/*
 MIT

 @module WOPR.main

 Each satellite generates an image every thirty minutes. The second satellite timing is
 offset fifteen minutes from the first.

 Example:

 GOES-N timing        1200Z    |   1230Z    |   1300Z    |   1330Z
 GOES-P timing        1215Z    |   1245Z    |   1315Z    |   1345Z
*/
(function(){function a(){a.u();a.j();a.h(0)}a.a={m:document.getElementById("mapList"),g:document.getElementById("enhancementList")};a.u=function(){a.L=160;a.c=document.getElementById("display")};a.M=function(){return a.a.g[a.a.g.selectedIndex].value};a.i=function(){return a.a.m[a.a.m.selectedIndex].value};a.j=function(){a.w();a.A();a.v()};a.w=function(){var b=new Date;b.setUTCHours(b.getUTCHours()-1);a.l(b)};a.l=function(b){a.b=b};a.A=function(){for(var b in a.a)a.a[b].addEventListener("change",function(){a.j()})};
a.v=function(){var b,d=a.H();a.I();for(var c=0;c<d.length;c++)b=document.createElement("img"),b.src=d[c],b.setAttribute("alt","Image #"+(c+1).f(2)),b.classList.add("frame"),b.classList.add("hidden"),a.c.appendChild(b)};a.I=function(){for(;a.c.firstChild;)a.c.removeChild(a.c.firstChild)};a.H=function(){var b,d=[],c;c=a.b;for(b=0;15>b;b+=1)d.push(a.s()),c.setUTCMinutes(c.getUTCMinutes()+30),a.l(c);return d};a.s=function(){return a.N()+a.K()};a.N=function(){return"http://www.ssd.noaa.gov/"+a.i()+"/img/"};
a.K=function(){return a.o()+a.M()+".jpg"};a.o=function(){var b=a.b.D(),b=a.F(b),b=a.G(b);return a.b.getFullYear()+a.b.B()+"_"+a.b.C()+b};a.F=function(b){return 0<a.i().search("east")?b+15:b};a.G=function(a){return 0===a?"00":a.f(2)};a.h=function(b){var d=document.getElementsByClassName("frame");if(""==b||null==b||null==typeof b)b=0;setTimeout(function(){d.item(b).classList.add("hidden");b=b<d.length-1?b+1:0;d.item(b).classList.remove("hidden");a.h(b)},a.L)};a.call()})();}).call(window);
//# sourceMappingURL=wopr.js.map.json
