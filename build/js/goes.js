(function(){var l=document.getElementById("panelOne"),m=document.getElementById("panelTwo"),n=document.getElementById("theEnhancement");
(function(){function p(a,c){var b,e;e=""+a;for(b=0;b<c;b+=1)e.length<c&&(e="0"+e);return e}function q(a,c){var b=a.getFullYear(),e;e=a.getMonth();var h=a.getDate(),k=[31,29,31,30,31,30,31,31,30,31,30,31],d=0,f;a.getYear()%4&&(k[1]=28);for(f=0;f<e;f+=1)d+=k[f];e=d+h;d=a.getMinutes();h=a.getHours();k="http://www.ssd.noaa.gov/goes/west/weus/img/";e=p(e,3);h=p(h,2);d=d/30;d=Math.floor(d);d=30*d;"east"===c&&(d+=15,k="http://www.ssd.noaa.gov/goes/east/eaus/img/");var d=p(d,2),g="rb";for(f=0;f<n.length;f+=
1)n[f].checked&&(g=n[f].value);return k+(b+e+"_"+h+d)+g+".jpg"}function r(){for(var a=new Date,c,b;l.firstChild;)l.removeChild(l.firstChild);for(;m.firstChild;)m.removeChild(m.firstChild);a.setHours(a.getHours()-4);for(c=0;20>c;c+=1)b=document.createElement("img"),b.classList.add("hidden"),b.classList.add("frameLeft"),b.src=q(a,"west"),l.appendChild(b),a.setMinutes(a.getMinutes()+15),b=document.createElement("img"),b.classList.add("hidden"),b.classList.add("frameRight"),b.src=q(a,"east"),window.console.log("here"),
a.setMinutes(a.getMinutes()+15),m.appendChild(b)}function g(a){var c=document.getElementsByClassName("frameLeft"),b=document.getElementsByClassName("frameRight");a||(a=0);setTimeout(function(){a<c.length-1?(c.item(a).classList.add("hidden"),b.item(a).classList.add("hidden"),a=a+1,c.item(a).classList.remove("hidden"),b.item(a).classList.remove("hidden"),g(a)):(c.item(a).classList.add("hidden"),b.item(a).classList.add("hidden"),c.item(0).classList.remove("hidden"),b.item(0).classList.remove("hidden"),
g(0))},200)}r();g(0);n.addEventListener("click",function(){r()})})();})();
//# sourceMap=sourcemap.json
