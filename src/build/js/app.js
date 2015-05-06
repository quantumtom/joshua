(function(){/*
 MIT

 @module APP
*/
var d={},d={d:function(){d.view={a:document.getElementById("panelRoot"),b:document.getElementById("theColorList"),c:document.getElementById("theMapList")};d.e()},e:function(){function q(a,c){var g,f;f=""+a;for(g=0;g<c;g+=1)f.length<c&&(f="0"+f);return f}function l(){for(var a=new Date,c=d.view.c,c=c[c.selectedIndex].value,g,f;d.view.a.firstChild;)d.view.a.removeChild(d.view.a.firstChild);a.setHours(a.getHours()-4);for(g=0;20>g;g+=1){var l=f=document.createElement("img"),b=c,n=a.getFullYear(),k;k=
a.getMonth();var m=a.getDate(),p=[31,29,31,30,31,30,31,31,30,31,30,31],e=0,h=void 0;a.getYear()%4&&(p[1]=28);for(h=0;h<k;h+=1)e+=p[h];k=e+=m;var e=a.getMinutes(),m=a.getHours(),p="http://www.ssd.noaa.gov/"+b+"/img/",h=30,r=0;k=q(k,3);m=q(m,2);0<=b.search("mtsat")&&(h=59,r=32);0<=b.search("east")&&(r=15);b=e;b=b/h;b=Math.floor(b);e=b*h;e+=r;e=q(e,2);b=d.view.b;b=b[b.selectedIndex].value;""===b&&(b="rb");l.src=p+(n+k+"_"+m+e)+b+".jpg";f.classList.add("hidden");f.classList.add("frame");f.setAttribute("alt",
"Image "+g+" unavailable.");d.view.a.appendChild(f);a.setMinutes(a.getMinutes()+30)}}function n(a){var c=document.getElementsByClassName("frame");a||(a=0);setTimeout(function(){a<c.length-1?(c.item(a).classList.add("hidden"),a=a+1,c.item(a).classList.remove("hidden"),n(a)):(c.item(a).classList.add("hidden"),c.item(0).classList.remove("hidden"),n(0))},133)}l();n(0);d.view.c.addEventListener("change",function(){l()});d.view.b.addEventListener("change",function(){l()})}};d.d();})();
//# sourceMappingURL=app.js.map
