(this.webpackJsonpweather=this.webpackJsonpweather||[]).push([[0],{10:function(e,t,n){e.exports=n(18)},15:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(3),r=n.n(i),c=(n(15),n(1)),s=n.n(c),l=n(4),u=n(5),h=n(6),d=n(8),m=n(7),f=n(9),p=(n(17),"e8ad1adef88349968665b0d70b156a49"),w="https://api.openweathermap.org/data/2.5/",v=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={isLoaded:!1,currentLocation:{},items:{}},n}return Object(f.a)(t,e),Object(h.a)(t,[{key:"fetchWeather",value:function(){var e=this;fetch("".concat(w,"weather?lat=").concat(this.state.currentLocation.lat,"&lon=").concat(this.state.currentLocation.lon,"&units=metric&APPID=").concat(p)).then((function(e){return e.json()})).then((function(t){e.setState({isLoaded:!0,items:t})}),(function(t){e.setState({isLoaded:!0,error:t})}))}},{key:"componentDidMount",value:function(){var e=Object(l.a)(s.a.mark((function e(){var t=this;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e,n){navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(n){t.setState({currentLocation:{lat:n.coords.latitude,lon:n.coords.longitude}}),e()}))}));case 2:this.fetchWeather();case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=null;return this.state.isLoaded&&(e=o.a.createElement("div",null,o.a.createElement("p",null,this.state.items.name," ",this.state.items.sys.country),o.a.createElement("p",null,this.state.items.sys.id),o.a.createElement("p",null,this.state.items.weather[0].main),o.a.createElement("p",null,this.state.items.weather[0].description),o.a.createElement("p",null,o.a.createElement("img",{src:"http://openweathermap.org/img/wn/".concat(this.state.items.weather[0].icon,".png"),alt:this.state.items.weather[0].description})),o.a.createElement("p",null,"Temp ",Math.round(this.state.items.main.temp,0),"\xb0C"),o.a.createElement("p",null,"Feels like"," ",Math.round(this.state.items.main.feels_like,0),"\xb0C"),o.a.createElement("p",null,"Humidity ",this.state.items.main.humidity,"%"))),o.a.createElement("div",null,e,o.a.createElement("div",{id:"demo"}))}}]),t}(a.Component),g=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function b(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}r.a.render(o.a.createElement(v,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/weather",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/weather","/service-worker.js");g?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):b(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):b(t,e)}))}}()}},[[10,1,2]]]);
//# sourceMappingURL=main.2654f0ce.chunk.js.map