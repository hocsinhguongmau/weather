(this.webpackJsonpweather=this.webpackJsonpweather||[]).push([[0],{11:function(e,t,n){e.exports=n(23)},21:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(3),o=n.n(c),i=n(1),s=n.n(i),h=n(4),u=n(5),l=n(6),d=n(9),f=n(7),m=n(10),p=n(8),w=n.n(p),v=(n(21),"e8ad1adef88349968665b0d70b156a49"),g="https://api.openweathermap.org/data/2.5/",y=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(d.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={isLoaded:!1,currentLocation:{},currentTime:null,currentWeather:{},searchCity:"",searchStatus:!1},n.getDate=function(e){var t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][e.getDay()],n=e.getDate(),a=["January","February","March","April","May","June","July","August","September","October","November","December"][e.getMonth()],r=e.getFullYear();return"".concat(t," ").concat(n," ").concat(a," ").concat(r)},n.getTime=function(e){return e.getHours()<6||e.getHours()>18?"night":"day"},n.handleSearchInput=function(e){n.setState({searchCity:e})},n.handleErrors=function(e){if(!e.ok)throw Error(e.statusText);return e},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"fetchWeather",value:function(){var e=this;fetch("".concat(g,"weather?lat=").concat(this.state.currentLocation.lat,"&lon=").concat(this.state.currentLocation.lon,"&units=metric&APPID=").concat(v)).then((function(e){return e.json()})).then((function(t){e.setState({isLoaded:!0,currentWeather:t,searchStatus:!0})}),(function(t){e.setState({isLoaded:!0,searchStatus:"Searching...",error:t})}))}},{key:"componentDidMount",value:function(){var e=Object(h.a)(s.a.mark((function e(){var t=this;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e,n){navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(n){t.setState({currentLocation:{lat:n.coords.latitude,lon:n.coords.longitude}}),e()}))}));case 2:this.fetchWeather();case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"fetchWithName",value:function(){var e=this,t=this.state.searchCity;fetch("".concat(g,"weather?q=").concat(t,"&units=metric&APPID=").concat(v)).then(this.handleErrors).then((function(e){return e.json()})).then((function(t){e.setState({currentWeather:t,searchStatus:!0})})).catch((function(t){e.setState({searchStatus:"City not found!"})}))}},{key:"fetchWithCoordinates",value:function(){var e=this,t=this.state.searchCity;fetch("".concat(g,"weather?lat=").concat(t[0],"&lon=").concat(t[1],"&units=metric&APPID=").concat(v)).then(this.handleErrors).then((function(e){return e.json()})).then((function(t){e.setState({currentWeather:t,searchStatus:!0})})).catch((function(t){e.setState({searchStatus:"City not found!"})}))}},{key:"render",value:function(){var e=this,t=null,n=this.state.currentWeather;return t=this.state.isLoaded&&this.state.searchStatus?r.a.createElement("div",{className:"weather-info"},r.a.createElement("p",{className:"weather-title"},n.name,",\xa0",n.sys.country),r.a.createElement("p",null,this.getDate(new Date)),r.a.createElement("div",{className:"weather-info-left"},r.a.createElement("p",{className:"weather-description"},n.weather[0].description),r.a.createElement("p",{className:"weather-image"},r.a.createElement("img",{src:"/weather"+"/images/animated-icons/".concat(n.weather[0].icon,".svg"),alt:n.weather[0].description}),Math.round(n.main.temp,0)," \xb0C"))):r.a.createElement("p",null,this.state.searchStatus),r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"".concat(this.getTime(new Date)," wrapper")},r.a.createElement("div",{className:"weather"},r.a.createElement("div",{className:"weather-search"},r.a.createElement(w.a,{placeholder:"Search by city or postal code",onPlaceSelected:function(t){void 0===t.name?(e.handleSearchInput(t.formatted_address),e.fetchWithName()):(e.handleSearchInput(t.name),e.fetchWithName())},types:["(regions)"]}),r.a.createElement("a",{className:"current-location",href:"#",onClick:function(){return e.fetchWeather()}},"Use your current location")),t)))}}]),t}(a.Component),S=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function b(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}n(22),o.a.render(r.a.createElement(y,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/weather",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/weather","/service-worker.js");S?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):b(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):b(t,e)}))}}()}},[[11,1,2]]]);
//# sourceMappingURL=main.7985291b.chunk.js.map