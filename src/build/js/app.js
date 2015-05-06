(function(){/*
 MIT

 @module APP
*/
var b={},b={a:document.getElementById("panelRoot"),b:document.getElementById("theColorList"),c:document.getElementById("theMapList"),uri:{d:"img/",domain:"http://www.ssd.noaa.gov/"},view:function(){function q(a,f){var g,e;e=""+a;for(g=0;g<f;g+=1)e.length<f&&(e="0"+e);return e}function l(){for(var a=new Date,f=b.c[b.c.selectedIndex].value,g,e;b.a.firstChild;)b.a.removeChild(b.a.firstChild);a.setHours(a.getHours()-4);for(g=0;20>g;g+=1){var l=e=document.createElement("img"),c=f,n=a.getFullYear(),k;k=
a.getMonth();var m=a.getDate(),p=[31,29,31,30,31,30,31,31,30,31,30,31],d=0,h=void 0;a.getYear()%4&&(p[1]=28);for(h=0;h<k;h+=1)d+=p[h];k=d+=m;var d=a.getMinutes(),m=a.getHours(),p=b.uri.domain+c+"/"+b.uri.d,h=30,r=0;k=q(k,3);m=q(m,2);0<=c.search("mtsat")&&(h=59,r=32);0<=c.search("east")&&(r=15);c=d;c=c/h;c=Math.floor(c);d=c*h;d+=r;d=q(d,2);c=b.b[b.b.selectedIndex].value;""===c&&(c="rb");l.src=p+(n+k+"_"+m+d)+c+".jpg";e.classList.add("hidden");e.classList.add("frame");e.setAttribute("alt","Image "+
g+" unavailable.");b.a.appendChild(e);a.setMinutes(a.getMinutes()+30)}}function n(a){var f=document.getElementsByClassName("frame");a||(a=0);setTimeout(function(){a<f.length-1?(f.item(a).classList.add("hidden"),a=a+1,f.item(a).classList.remove("hidden"),n(a)):(f.item(a).classList.add("hidden"),f.item(0).classList.remove("hidden"),n(0))},133)}l();n(0);b.c.addEventListener("change",function(){l()});b.b.addEventListener("change",function(){l()})}};b.view();})();
//# sourceMappingURL=app.js.map
