(this["webpackJsonpreact-signal-light"]=this["webpackJsonpreact-signal-light"]||[]).push([[0],[,,,,,function(t,e,n){t.exports=n.p+"static/media/on.375c4f70.png"},function(t,e,n){t.exports=n.p+"static/media/off.afeb9266.png"},function(t,e,n){t.exports=n(18)},,,,,function(t,e,n){},,,,,function(t,e,n){},function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),c=n(3),o=n.n(c),r=(n(12),n(1)),u=n(4),l=(n(17),n(5)),f=n.n(l),s=n(6),h=n.n(s),g=window.liff,m=function(){var t=Object(a.useState)("0"),e=Object(r.a)(t,2),n=e[0],c=e[1],o=Object(a.useState)("512"),l=Object(r.a)(o,2),s=l[0],m=l[1],b=Object(a.useState)(!1),v=Object(r.a)(b,2),d=v[0],p=v[1],E=function t(e){g.bluetooth.getAvailability().then((function(n){n?e():setTimeout((function(){return t(e)}),1e4)})).catch((function(){return alert("avaiable fail")}))},w=function(){g.bluetooth.requestDevice().then((function(t){O(t)})).catch((function(){return alert("rquest fail")}))},O=function(t){t.gatt.connect().then((function(){t.gatt.getPrimaryService("82b37b0f-8c13-4027-b119-81289977fe69").then((function(t){B(t)})).catch((function(){return alert("get service fail")}))})).catch((function(){return alert("connect fail")}))},B=function(t){t.getCharacteristic("E9062E71-9E62-4BC6-B0D3-35CDCD9B027B").then((function(t){t.writeValue(u.Buffer.from(n))})).catch((function(){return alert("get characteristic fail")}))};return i.a.createElement("div",{className:"App"},i.a.createElement("div",{className:"light"},i.a.createElement("img",{src:d?f.a:h.a,alt:"signal-light"})),i.a.createElement("div",null,s),i.a.createElement("div",null,i.a.createElement("input",{type:"range",defaultValue:512,min:50,max:1024,onChange:function(t){m(t.target.value)}})),i.a.createElement("button",{onClick:function(){p(!d),c(d?s:"0"),g.init({liffId:"1564438963-AnXq88v2"}).then((function(){g.initPlugins(["bluetooth"]).then((function(){return E((function(){return w()}))})).catch((function(){return alert("init fail")}))}))},className:"button"},d?"OFF":"ON"))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}],[[7,1,2]]]);
//# sourceMappingURL=main.e9e6f795.chunk.js.map