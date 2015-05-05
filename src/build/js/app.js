(function(){/*
 MIT

 @module APP
*/
var c={},c={a:document.getElementById("panelRoot"),b:document.getElementById("theColorList"),c:document.getElementById("theMapList"),uri:{d:"img/",domain:"http://www.ssd.noaa.gov/",e:"goes/"},view:function(){function p(a,d){var f,e;e=""+a;for(f=0;f<d;f+=1)e.length<d&&(e="0"+e);return e}function k(){for(var a=new Date,d=c.c[c.c.selectedIndex].value,f,e;c.a.firstChild;)c.a.removeChild(c.a.firstChild);""===d&&(d="west/weus");a.setHours(a.getHours()-4);for(f=0;20>f;f+=1){var k=e=document.createElement("img"),
m=a.getFullYear(),h;h=a.getMonth();var l=a.getDate(),n=[31,29,31,30,31,30,31,31,30,31,30,31],b=0,g=void 0;a.getYear()%4&&(n[1]=28);for(g=0;g<h;g+=1)b+=n[g];h=b+=l;b=a.getMinutes();l=a.getHours();n=c.uri.domain+c.uri.e+d+"/"+c.uri.d;h=p(h,3);l=p(l,2);b=b/30;b=Math.floor(b);b=30*b;0<=d.search("east")&&(b+=15);b=p(b,2);g=c.b[c.b.selectedIndex].value;""===g&&(g="rb");k.src=n+(m+h+"_"+l+b)+g+".jpg";e.classList.add("hidden");e.classList.add("frame");e.setAttribute("alt","Image "+f+" unavailable.");c.a.appendChild(e);
a.setMinutes(a.getMinutes()+15)}}function m(a){var d=document.getElementsByClassName("frame");a||(a=0);setTimeout(function(){a<d.length-1?(d.item(a).classList.add("hidden"),a=a+1,d.item(a).classList.remove("hidden"),m(a)):(d.item(a).classList.add("hidden"),d.item(0).classList.remove("hidden"),m(0))},200)}k();m(0);c.c.addEventListener("change",function(){k()});c.b.addEventListener("change",function(){k()})}};c.view();})();
//# sourceMappingURL=app.js.map
