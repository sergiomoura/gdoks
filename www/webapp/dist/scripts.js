/*
 AngularJS v1.4.4
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(O,W,t){'use strict';function L(b){return function(){var a=arguments[0],c;c="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.4.4/"+(b?b+"/":"")+a;for(a=1;a<arguments.length;a++){c=c+(1==a?"?":"&")+"p"+(a-1)+"=";var d=encodeURIComponent,e;e=arguments[a];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;c+=d(e)}return Error(c)}}function Da(b){if(null==b||Ya(b))return!1;var a="length"in Object(b)&&b.length;
return b.nodeType===pa&&a?!0:I(b)||G(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function m(b,a,c){var d,e;if(b)if(C(b))for(d in b)"prototype"==d||"length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d)||a.call(c,b[d],d,b);else if(G(b)||Da(b)){var f="object"!==typeof b;d=0;for(e=b.length;d<e;d++)(f||d in b)&&a.call(c,b[d],d,b)}else if(b.forEach&&b.forEach!==m)b.forEach(a,c,b);else if(lc(b))for(d in b)a.call(c,b[d],d,b);else if("function"===typeof b.hasOwnProperty)for(d in b)b.hasOwnProperty(d)&&
a.call(c,b[d],d,b);else for(d in b)Na.call(b,d)&&a.call(c,b[d],d,b);return b}function mc(b,a,c){for(var d=Object.keys(b).sort(),e=0;e<d.length;e++)a.call(c,b[d[e]],d[e]);return d}function nc(b){return function(a,c){b(c,a)}}function Ud(){return++mb}function oc(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function Mb(b,a,c){for(var d=b.$$hashKey,e=0,f=a.length;e<f;++e){var g=a[e];if(D(g)||C(g))for(var h=Object.keys(g),l=0,k=h.length;l<k;l++){var n=h[l],q=g[n];c&&D(q)?ca(q)?b[n]=new Date(q.valueOf()):Oa(q)?
b[n]=new RegExp(q):(D(b[n])||(b[n]=G(q)?[]:{}),Mb(b[n],[q],!0)):b[n]=q}}oc(b,d);return b}function Q(b){return Mb(b,xa.call(arguments,1),!1)}function Vd(b){return Mb(b,xa.call(arguments,1),!0)}function Y(b){return parseInt(b,10)}function Nb(b,a){return Q(Object.create(b),a)}function v(){}function Za(b){return b}function qa(b){return function(){return b}}function pc(b){return C(b.toString)&&b.toString!==Object.prototype.toString}function y(b){return"undefined"===typeof b}function x(b){return"undefined"!==
typeof b}function D(b){return null!==b&&"object"===typeof b}function lc(b){return null!==b&&"object"===typeof b&&!qc(b)}function I(b){return"string"===typeof b}function X(b){return"number"===typeof b}function ca(b){return"[object Date]"===sa.call(b)}function C(b){return"function"===typeof b}function Oa(b){return"[object RegExp]"===sa.call(b)}function Ya(b){return b&&b.window===b}function $a(b){return b&&b.$evalAsync&&b.$watch}function ab(b){return"boolean"===typeof b}function rc(b){return!(!b||!(b.nodeName||
b.prop&&b.attr&&b.find))}function Wd(b){var a={};b=b.split(",");var c;for(c=0;c<b.length;c++)a[b[c]]=!0;return a}function ta(b){return M(b.nodeName||b[0]&&b[0].nodeName)}function bb(b,a){var c=b.indexOf(a);0<=c&&b.splice(c,1);return c}function fa(b,a,c,d){if(Ya(b)||$a(b))throw Ea("cpws");if(sc.test(sa.call(a)))throw Ea("cpta");if(a){if(b===a)throw Ea("cpi");c=c||[];d=d||[];D(b)&&(c.push(b),d.push(a));var e;if(G(b))for(e=a.length=0;e<b.length;e++)a.push(fa(b[e],null,c,d));else{var f=a.$$hashKey;G(a)?
a.length=0:m(a,function(b,c){delete a[c]});if(lc(b))for(e in b)a[e]=fa(b[e],null,c,d);else if(b&&"function"===typeof b.hasOwnProperty)for(e in b)b.hasOwnProperty(e)&&(a[e]=fa(b[e],null,c,d));else for(e in b)Na.call(b,e)&&(a[e]=fa(b[e],null,c,d));oc(a,f)}}else if(a=b,D(b)){if(c&&-1!==(f=c.indexOf(b)))return d[f];if(G(b))return fa(b,[],c,d);if(sc.test(sa.call(b)))a=new b.constructor(b);else if(ca(b))a=new Date(b.getTime());else if(Oa(b))a=new RegExp(b.source,b.toString().match(/[^\/]*$/)[0]),a.lastIndex=
b.lastIndex;else return e=Object.create(qc(b)),fa(b,e,c,d);d&&(c.push(b),d.push(a))}return a}function ia(b,a){if(G(b)){a=a||[];for(var c=0,d=b.length;c<d;c++)a[c]=b[c]}else if(D(b))for(c in a=a||{},b)if("$"!==c.charAt(0)||"$"!==c.charAt(1))a[c]=b[c];return a||b}function ka(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(G(b)){if(!G(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!ka(b[d],a[d]))return!1;return!0}}else{if(ca(b))return ca(a)?
ka(b.getTime(),a.getTime()):!1;if(Oa(b))return Oa(a)?b.toString()==a.toString():!1;if($a(b)||$a(a)||Ya(b)||Ya(a)||G(a)||ca(a)||Oa(a))return!1;c=ga();for(d in b)if("$"!==d.charAt(0)&&!C(b[d])){if(!ka(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!(d in c||"$"===d.charAt(0)||a[d]===t||C(a[d])))return!1;return!0}return!1}function cb(b,a,c){return b.concat(xa.call(a,c))}function tc(b,a){var c=2<arguments.length?xa.call(arguments,2):[];return!C(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?
a.apply(b,cb(c,arguments,0)):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Xd(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)&&"$"===b.charAt(1)?c=t:Ya(a)?c="$WINDOW":a&&W===a?c="$DOCUMENT":$a(a)&&(c="$SCOPE");return c}function db(b,a){if("undefined"===typeof b)return t;X(a)||(a=a?2:null);return JSON.stringify(b,Xd,a)}function uc(b){return I(b)?JSON.parse(b):b}function vc(b,a){var c=Date.parse("Jan 01, 1970 00:00:00 "+b)/6E4;return isNaN(c)?a:c}function Ob(b,
a,c){c=c?-1:1;var d=vc(a,b.getTimezoneOffset());a=b;b=c*(d-b.getTimezoneOffset());a=new Date(a.getTime());a.setMinutes(a.getMinutes()+b);return a}function ua(b){b=z(b).clone();try{b.empty()}catch(a){}var c=z("<div>").append(b).html();try{return b[0].nodeType===Pa?M(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+M(b)})}catch(d){return M(c)}}function wc(b){try{return decodeURIComponent(b)}catch(a){}}function xc(b){var a={};m((b||"").split("&"),function(b){var d,e,f;b&&(e=
b=b.replace(/\+/g,"%20"),d=b.indexOf("="),-1!==d&&(e=b.substring(0,d),f=b.substring(d+1)),e=wc(e),x(e)&&(f=x(f)?wc(f):!0,Na.call(a,e)?G(a[e])?a[e].push(f):a[e]=[a[e],f]:a[e]=f))});return a}function Pb(b){var a=[];m(b,function(b,d){G(b)?m(b,function(b){a.push(ma(d,!0)+(!0===b?"":"="+ma(b,!0)))}):a.push(ma(d,!0)+(!0===b?"":"="+ma(b,!0)))});return a.length?a.join("&"):""}function nb(b){return ma(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function ma(b,a){return encodeURIComponent(b).replace(/%40/gi,
"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,a?"%20":"+")}function Yd(b,a){var c,d,e=Qa.length;for(d=0;d<e;++d)if(c=Qa[d]+a,I(c=b.getAttribute(c)))return c;return null}function Zd(b,a){var c,d,e={};m(Qa,function(a){a+="app";!c&&b.hasAttribute&&b.hasAttribute(a)&&(c=b,d=b.getAttribute(a))});m(Qa,function(a){a+="app";var e;!c&&(e=b.querySelector("["+a.replace(":","\\:")+"]"))&&(c=e,d=e.getAttribute(a))});c&&(e.strictDi=null!==Yd(c,"strict-di"),
a(c,d?[d]:[],e))}function yc(b,a,c){D(c)||(c={});c=Q({strictDi:!1},c);var d=function(){b=z(b);if(b.injector()){var d=b[0]===W?"document":ua(b);throw Ea("btstrpd",d.replace(/</,"&lt;").replace(/>/,"&gt;"));}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);c.debugInfoEnabled&&a.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);a.unshift("ng");d=eb(a,c.strictDi);d.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",
d);c(b)(a)})}]);return d},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;O&&e.test(O.name)&&(c.debugInfoEnabled=!0,O.name=O.name.replace(e,""));if(O&&!f.test(O.name))return d();O.name=O.name.replace(f,"");aa.resumeBootstrap=function(b){m(b,function(b){a.push(b)});return d()};C(aa.resumeDeferredBootstrap)&&aa.resumeDeferredBootstrap()}function $d(){O.name="NG_ENABLE_DEBUG_INFO!"+O.name;O.location.reload()}function ae(b){b=aa.element(b).injector();if(!b)throw Ea("test");return b.get("$$testability")}
function zc(b,a){a=a||"_";return b.replace(be,function(b,d){return(d?a:"")+b.toLowerCase()})}function ce(){var b;if(!Ac){var a=ob();la=O.jQuery;x(a)&&(la=null===a?t:O[a]);la&&la.fn.on?(z=la,Q(la.fn,{scope:Ra.scope,isolateScope:Ra.isolateScope,controller:Ra.controller,injector:Ra.injector,inheritedData:Ra.inheritedData}),b=la.cleanData,la.cleanData=function(a){var d;if(Qb)Qb=!1;else for(var e=0,f;null!=(f=a[e]);e++)(d=la._data(f,"events"))&&d.$destroy&&la(f).triggerHandler("$destroy");b(a)}):z=R;aa.element=
z;Ac=!0}}function pb(b,a,c){if(!b)throw Ea("areq",a||"?",c||"required");return b}function Sa(b,a,c){c&&G(b)&&(b=b[b.length-1]);pb(C(b),a,"not a function, got "+(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function Ta(b,a){if("hasOwnProperty"===b)throw Ea("badname",a);}function Bc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&C(b)?tc(e,b):b}function qb(b){var a=b[0];b=b[b.length-1];var c=[a];do{a=a.nextSibling;
if(!a)break;c.push(a)}while(a!==b);return z(c)}function ga(){return Object.create(null)}function de(b){function a(a,b,c){return a[b]||(a[b]=c())}var c=L("$injector"),d=L("ng");b=a(b,"angular",Object);b.$$minErr=b.$$minErr||L;return a(b,"module",function(){var b={};return function(f,g,h){if("hasOwnProperty"===f)throw d("badname","module");g&&b.hasOwnProperty(f)&&(b[f]=null);return a(b,f,function(){function a(b,c,e,f){f||(f=d);return function(){f[e||"push"]([b,c,arguments]);return B}}function b(a,c){return function(b,
e){e&&C(e)&&(e.$$moduleName=f);d.push([a,c,arguments]);return B}}if(!g)throw c("nomod",f);var d=[],e=[],r=[],u=a("$injector","invoke","push",e),B={_invokeQueue:d,_configBlocks:e,_runBlocks:r,requires:g,name:f,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),decorator:b("$provide","decorator"),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider",
"register"),directive:b("$compileProvider","directive"),config:u,run:function(a){r.push(a);return this}};h&&u(h);return B})}})}function ee(b){Q(b,{bootstrap:yc,copy:fa,extend:Q,merge:Vd,equals:ka,element:z,forEach:m,injector:eb,noop:v,bind:tc,toJson:db,fromJson:uc,identity:Za,isUndefined:y,isDefined:x,isString:I,isFunction:C,isObject:D,isNumber:X,isElement:rc,isArray:G,version:fe,isDate:ca,lowercase:M,uppercase:rb,callbacks:{counter:0},getTestability:ae,$$minErr:L,$$csp:Fa,reloadWithDebugInfo:$d});
Rb=de(O);Rb("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:ge});a.provider("$compile",Cc).directive({a:he,input:Dc,textarea:Dc,form:ie,script:je,select:ke,style:le,option:me,ngBind:ne,ngBindHtml:oe,ngBindTemplate:pe,ngClass:qe,ngClassEven:re,ngClassOdd:se,ngCloak:te,ngController:ue,ngForm:ve,ngHide:we,ngIf:xe,ngInclude:ye,ngInit:ze,ngNonBindable:Ae,ngPluralize:Be,ngRepeat:Ce,ngShow:De,ngStyle:Ee,ngSwitch:Fe,ngSwitchWhen:Ge,ngSwitchDefault:He,ngOptions:Ie,ngTransclude:Je,ngModel:Ke,
ngList:Le,ngChange:Me,pattern:Ec,ngPattern:Ec,required:Fc,ngRequired:Fc,minlength:Gc,ngMinlength:Gc,maxlength:Hc,ngMaxlength:Hc,ngValue:Ne,ngModelOptions:Oe}).directive({ngInclude:Pe}).directive(sb).directive(Ic);a.provider({$anchorScroll:Qe,$animate:Re,$animateCss:Se,$$animateQueue:Te,$$AnimateRunner:Ue,$browser:Ve,$cacheFactory:We,$controller:Xe,$document:Ye,$exceptionHandler:Ze,$filter:Jc,$$forceReflow:$e,$interpolate:af,$interval:bf,$http:cf,$httpParamSerializer:df,$httpParamSerializerJQLike:ef,
$httpBackend:ff,$location:gf,$log:hf,$parse:jf,$rootScope:kf,$q:lf,$$q:mf,$sce:nf,$sceDelegate:of,$sniffer:pf,$templateCache:qf,$templateRequest:rf,$$testability:sf,$timeout:tf,$window:uf,$$rAF:vf,$$jqLite:wf,$$HashMap:xf,$$cookieReader:yf})}])}function fb(b){return b.replace(zf,function(a,b,d,e){return e?d.toUpperCase():d}).replace(Af,"Moz$1")}function Kc(b){b=b.nodeType;return b===pa||!b||9===b}function Lc(b,a){var c,d,e=a.createDocumentFragment(),f=[];if(Sb.test(b)){c=c||e.appendChild(a.createElement("div"));
d=(Bf.exec(b)||["",""])[1].toLowerCase();d=na[d]||na._default;c.innerHTML=d[1]+b.replace(Cf,"<$1></$2>")+d[2];for(d=d[0];d--;)c=c.lastChild;f=cb(f,c.childNodes);c=e.firstChild;c.textContent=""}else f.push(a.createTextNode(b));e.textContent="";e.innerHTML="";m(f,function(a){e.appendChild(a)});return e}function R(b){if(b instanceof R)return b;var a;I(b)&&(b=T(b),a=!0);if(!(this instanceof R)){if(a&&"<"!=b.charAt(0))throw Tb("nosel");return new R(b)}if(a){a=W;var c;b=(c=Df.exec(b))?[a.createElement(c[1])]:
(c=Lc(b,a))?c.childNodes:[]}Mc(this,b)}function Ub(b){return b.cloneNode(!0)}function tb(b,a){a||ub(b);if(b.querySelectorAll)for(var c=b.querySelectorAll("*"),d=0,e=c.length;d<e;d++)ub(c[d])}function Nc(b,a,c,d){if(x(d))throw Tb("offargs");var e=(d=vb(b))&&d.events,f=d&&d.handle;if(f)if(a)m(a.split(" "),function(a){if(x(c)){var d=e[a];bb(d||[],c);if(d&&0<d.length)return}b.removeEventListener(a,f,!1);delete e[a]});else for(a in e)"$destroy"!==a&&b.removeEventListener(a,f,!1),delete e[a]}function ub(b,
a){var c=b.ng339,d=c&&gb[c];d&&(a?delete d.data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),Nc(b)),delete gb[c],b.ng339=t))}function vb(b,a){var c=b.ng339,c=c&&gb[c];a&&!c&&(b.ng339=c=++Ef,c=gb[c]={events:{},data:{},handle:t});return c}function Vb(b,a,c){if(Kc(b)){var d=x(c),e=!d&&a&&!D(a),f=!a;b=(b=vb(b,!e))&&b.data;if(d)b[a]=c;else{if(f)return b;if(e)return b&&b[a];Q(b,a)}}}function wb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+
a+" "):!1}function xb(b,a){a&&b.setAttribute&&m(a.split(" "),function(a){b.setAttribute("class",T((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+T(a)+" "," ")))})}function yb(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");m(a.split(" "),function(a){a=T(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",T(c))}}function Mc(b,a){if(a)if(a.nodeType)b[b.length++]=a;else{var c=a.length;if("number"===typeof c&&a.window!==
a){if(c)for(var d=0;d<c;d++)b[b.length++]=a[d]}else b[b.length++]=a}}function Oc(b,a){return zb(b,"$"+(a||"ngController")+"Controller")}function zb(b,a,c){9==b.nodeType&&(b=b.documentElement);for(a=G(a)?a:[a];b;){for(var d=0,e=a.length;d<e;d++)if((c=z.data(b,a[d]))!==t)return c;b=b.parentNode||11===b.nodeType&&b.host}}function Pc(b){for(tb(b,!0);b.firstChild;)b.removeChild(b.firstChild)}function Wb(b,a){a||tb(b);var c=b.parentNode;c&&c.removeChild(b)}function Ff(b,a){a=a||O;if("complete"===a.document.readyState)a.setTimeout(b);
else z(a).on("load",b)}function Qc(b,a){var c=Ab[a.toLowerCase()];return c&&Rc[ta(b)]&&c}function Gf(b,a){var c=b.nodeName;return("INPUT"===c||"TEXTAREA"===c)&&Sc[a]}function Hf(b,a){var c=function(c,e){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=a[e||c.type],g=f?f.length:0;if(g){if(y(c.immediatePropagationStopped)){var h=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=
function(){return!0===c.immediatePropagationStopped};1<g&&(f=ia(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||f[l].call(b,c)}};c.elem=b;return c}function wf(){this.$get=function(){return Q(R,{hasClass:function(b,a){b.attr&&(b=b[0]);return wb(b,a)},addClass:function(b,a){b.attr&&(b=b[0]);return yb(b,a)},removeClass:function(b,a){b.attr&&(b=b[0]);return xb(b,a)}})}}function Ga(b,a){var c=b&&b.$$hashKey;if(c)return"function"===typeof c&&(c=b.$$hashKey()),c;c=typeof b;return c="function"==
c||"object"==c&&null!==b?b.$$hashKey=c+":"+(a||Ud)():c+":"+b}function Ua(b,a){if(a){var c=0;this.nextUid=function(){return++c}}m(b,this.put,this)}function If(b){return(b=b.toString().replace(Tc,"").match(Uc))?"function("+(b[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function eb(b,a){function c(a){return function(b,c){if(D(b))m(b,nc(a));else return a(b,c)}}function d(a,b){Ta(a,"service");if(C(b)||G(b))b=r.instantiate(b);if(!b.$get)throw Ha("pget",a);return q[a+"Provider"]=b}function e(a,b){return function(){var c=
B.invoke(b,this);if(y(c))throw Ha("undef",a);return c}}function f(a,b,c){return d(a,{$get:!1!==c?e(a,b):b})}function g(a){pb(y(a)||G(a),"modulesToLoad","not an array");var b=[],c;m(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=r.get(e[0]);f[e[1]].apply(f,e[2])}}if(!n.get(a)){n.put(a,!0);try{I(a)?(c=Rb(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):C(a)?b.push(r.invoke(a)):G(a)?b.push(r.invoke(a)):Sa(a,"module")}catch(e){throw G(a)&&
(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ha("modulerr",a,e.stack||e.message||e);}}});return b}function h(b,c){function d(a,e){if(b.hasOwnProperty(a)){if(b[a]===l)throw Ha("cdep",a+" <- "+k.join(" <- "));return b[a]}try{return k.unshift(a),b[a]=l,b[a]=c(a,e)}catch(f){throw b[a]===l&&delete b[a],f;}finally{k.shift()}}function e(b,c,f,g){"string"===typeof f&&(g=f,f=null);var h=[],k=eb.$$annotate(b,a,g),l,r,n;r=0;for(l=k.length;r<l;r++){n=k[r];if("string"!==
typeof n)throw Ha("itkn",n);h.push(f&&f.hasOwnProperty(n)?f[n]:d(n,g))}G(b)&&(b=b[l]);return b.apply(c,h)}return{invoke:e,instantiate:function(a,b,c){var d=Object.create((G(a)?a[a.length-1]:a).prototype||null);a=e(a,d,b,c);return D(a)||C(a)?a:d},get:d,annotate:eb.$$annotate,has:function(a){return q.hasOwnProperty(a+"Provider")||b.hasOwnProperty(a)}}}a=!0===a;var l={},k=[],n=new Ua([],!0),q={$provide:{provider:c(d),factory:c(f),service:c(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),
value:c(function(a,b){return f(a,qa(b),!1)}),constant:c(function(a,b){Ta(a,"constant");q[a]=b;u[a]=b}),decorator:function(a,b){var c=r.get(a+"Provider"),d=c.$get;c.$get=function(){var a=B.invoke(d,c);return B.invoke(b,null,{$delegate:a})}}}},r=q.$injector=h(q,function(a,b){aa.isString(b)&&k.push(b);throw Ha("unpr",k.join(" <- "));}),u={},B=u.$injector=h(u,function(a,b){var c=r.get(a+"Provider",b);return B.invoke(c.$get,c,t,a)});m(g(b),function(a){a&&B.invoke(a)});return B}function Qe(){var b=!0;this.disableAutoScrolling=
function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===ta(a))return b=a,!0});return b}function f(b){if(b){b.scrollIntoView();var c;c=g.yOffset;C(c)?c=c():rc(c)?(c=c[0],c="fixed"!==a.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):X(c)||(c=0);c&&(b=b.getBoundingClientRect().top,a.scrollBy(0,b-c))}else a.scrollTo(0,0)}function g(a){a=I(a)?a:c.hash();var b;a?(b=h.getElementById(a))?f(b):
(b=e(h.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var h=a.document;b&&d.$watch(function(){return c.hash()},function(a,b){a===b&&""===a||Ff(function(){d.$evalAsync(g)})});return g}]}function hb(b,a){if(!b&&!a)return"";if(!b)return a;if(!a)return b;G(b)&&(b=b.join(" "));G(a)&&(a=a.join(" "));return b+" "+a}function Jf(b){I(b)&&(b=b.split(" "));var a=ga();m(b,function(b){b.length&&(a[b]=!0)});return a}function Ia(b){return D(b)?b:{}}function Kf(b,a,c,d){function e(a){try{a.apply(null,xa.call(arguments,
1))}finally{if(B--,0===B)for(;K.length;)try{K.pop()()}catch(b){c.error(b)}}}function f(){g();h()}function g(){a:{try{w=n.state;break a}catch(a){}w=void 0}w=y(w)?null:w;ka(w,F)&&(w=F);F=w}function h(){if(A!==l.url()||p!==w)A=l.url(),p=w,m(N,function(a){a(l.url(),w)})}var l=this,k=b.location,n=b.history,q=b.setTimeout,r=b.clearTimeout,u={};l.isMock=!1;var B=0,K=[];l.$$completeOutstandingRequest=e;l.$$incOutstandingRequestCount=function(){B++};l.notifyWhenNoOutstandingRequests=function(a){0===B?a():
K.push(a)};var w,p,A=k.href,s=a.find("base"),H=null;g();p=w;l.url=function(a,c,e){y(e)&&(e=null);k!==b.location&&(k=b.location);n!==b.history&&(n=b.history);if(a){var f=p===e;if(A===a&&(!d.history||f))return l;var h=A&&Ja(A)===Ja(a);A=a;p=e;if(!d.history||h&&f){if(!h||H)H=a;c?k.replace(a):h?(c=k,e=a.indexOf("#"),a=-1===e?"":a.substr(e),c.hash=a):k.href=a}else n[c?"replaceState":"pushState"](e,"",a),g(),p=w;return l}return H||k.href.replace(/%27/g,"'")};l.state=function(){return w};var N=[],J=!1,F=
null;l.onUrlChange=function(a){if(!J){if(d.history)z(b).on("popstate",f);z(b).on("hashchange",f);J=!0}N.push(a);return a};l.$$applicationDestroyed=function(){z(b).off("hashchange popstate",f)};l.$$checkUrlChange=h;l.baseHref=function(){var a=s.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};l.defer=function(a,b){var c;B++;c=q(function(){delete u[c];e(a)},b||0);u[c]=!0;return c};l.defer.cancel=function(a){return u[a]?(delete u[a],r(a),e(v),!0):!1}}function Ve(){this.$get=["$window",
"$log","$sniffer","$document",function(b,a,c,d){return new Kf(b,d,a,c)}]}function We(){this.$get=function(){function b(b,d){function e(a){a!=q&&(r?r==a&&(r=a.n):r=a,f(a.n,a.p),f(a,q),q=a,q.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw L("$cacheFactory")("iid",b);var g=0,h=Q({},d,{id:b}),l={},k=d&&d.capacity||Number.MAX_VALUE,n={},q=null,r=null;return a[b]={put:function(a,b){if(!y(b)){if(k<Number.MAX_VALUE){var c=n[a]||(n[a]={key:a});e(c)}a in l||g++;l[a]=b;g>k&&this.remove(r.key);
return b}},get:function(a){if(k<Number.MAX_VALUE){var b=n[a];if(!b)return;e(b)}return l[a]},remove:function(a){if(k<Number.MAX_VALUE){var b=n[a];if(!b)return;b==q&&(q=b.p);b==r&&(r=b.n);f(b.n,b.p);delete n[a]}delete l[a];g--},removeAll:function(){l={};g=0;n={};q=r=null},destroy:function(){n=h=l=null;delete a[b]},info:function(){return Q({},h,{size:g})}}}var a={};b.info=function(){var b={};m(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function qf(){this.$get=
["$cacheFactory",function(b){return b("templates")}]}function Cc(b,a){function c(a,b,c){var d=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,e={};m(a,function(a,f){var g=a.match(d);if(!g)throw ea("iscp",b,f,a,c?"controller bindings definition":"isolate scope definition");e[f]={mode:g[1][0],collection:"*"===g[2],optional:"?"===g[3],attrName:g[4]||f}});return e}function d(a){var b=a.charAt(0);if(!b||b!==M(b))throw ea("baddir",a);if(a!==a.trim())throw ea("baddir",a);}var e={},f=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,
g=/(([\w\-]+)(?:\:([^;]+))?;?)/,h=Wd("ngSrc,ngSrcset,src,srcset"),l=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,k=/^(on[a-z]+|formaction)$/;this.directive=function r(a,f){Ta(a,"directive");I(a)?(d(a),pb(f,"directiveFactory"),e.hasOwnProperty(a)||(e[a]=[],b.factory(a+"Directive",["$injector","$exceptionHandler",function(b,d){var f=[];m(e[a],function(e,g){try{var h=b.invoke(e);C(h)?h={compile:qa(h)}:!h.compile&&h.link&&(h.compile=qa(h.link));h.priority=h.priority||0;h.index=g;h.name=h.name||a;h.require=h.require||
h.controller&&h.name;h.restrict=h.restrict||"EA";var k=h,l=h,r=h.name,n={isolateScope:null,bindToController:null};D(l.scope)&&(!0===l.bindToController?(n.bindToController=c(l.scope,r,!0),n.isolateScope={}):n.isolateScope=c(l.scope,r,!1));D(l.bindToController)&&(n.bindToController=c(l.bindToController,r,!0));if(D(n.bindToController)){var S=l.controller,B=l.controllerAs;if(!S)throw ea("noctrl",r);var ha;a:if(B&&I(B))ha=B;else{if(I(S)){var m=Vc.exec(S);if(m){ha=m[3];break a}}ha=void 0}if(!ha)throw ea("noident",
r);}var s=k.$$bindings=n;D(s.isolateScope)&&(h.$$isolateBindings=s.isolateScope);h.$$moduleName=e.$$moduleName;f.push(h)}catch(t){d(t)}});return f}])),e[a].push(f)):m(a,nc(r));return this};this.aHrefSanitizationWhitelist=function(b){return x(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return x(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};var n=!0;this.debugInfoEnabled=function(a){return x(a)?
(n=a,this):n};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,c,d,w,p,A,s,H,N,J){function F(a,b){try{a.addClass(b)}catch(c){}}function V(a,b,c,d,e){a instanceof z||(a=z(a));m(a,function(b,c){b.nodeType==Pa&&b.nodeValue.match(/\S+/)&&(a[c]=z(b).wrap("<span></span>").parent()[0])});var f=S(a,b,a,c,d,e);V.$$addScopeClass(a);var g=null;return function(b,c,d){pb(b,"scope");d=d||{};
var e=d.parentBoundTranscludeFn,h=d.transcludeControllers;d=d.futureParentElement;e&&e.$$boundTransclude&&(e=e.$$boundTransclude);g||(g=(d=d&&d[0])?"foreignobject"!==ta(d)&&d.toString().match(/SVG/)?"svg":"html":"html");d="html"!==g?z(Xb(g,z("<div>").append(a).html())):c?Ra.clone.call(a):a;if(h)for(var l in h)d.data("$"+l+"Controller",h[l].instance);V.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,e);return d}}function S(a,b,c,d,e,f){function g(a,c,d,e){var f,l,k,r,n,u,N;if(p)for(N=Array(c.length),r=0;r<
h.length;r+=3)f=h[r],N[f]=c[f];else N=c;r=0;for(n=h.length;r<n;)if(l=N[h[r++]],c=h[r++],f=h[r++],c){if(c.scope){if(k=a.$new(),V.$$addScopeInfo(z(l),k),u=c.$$destroyBindings)c.$$destroyBindings=null,k.$on("$destroyed",u)}else k=a;u=c.transcludeOnThisElement?P(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?P(a,b):null;c(f,k,l,d,u,c)}else f&&f(a,l.childNodes,t,e)}for(var h=[],l,k,r,n,p,u=0;u<a.length;u++){l=new aa;k=ha(a[u],[],l,0===u?d:t,e);(f=k.length?E(k,a[u],l,b,c,null,[],[],f):null)&&f.scope&&
V.$$addScopeClass(l.$$element);l=f&&f.terminal||!(r=a[u].childNodes)||!r.length?null:S(r,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||l)h.push(u,f,l),n=!0,p=p||f;f=null}return n?g:null}function P(a,b,c){return function(d,e,f,g,h){d||(d=a.$new(!1,h),d.$$transcluded=!0);return b(d,e,{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})}}function ha(a,b,c,d,e){var h=c.$attr,l;switch(a.nodeType){case pa:x(b,va(ta(a)),"E",d,e);for(var k,r,n,p=a.attributes,
u=0,N=p&&p.length;u<N;u++){var K=!1,J=!1;k=p[u];l=k.name;r=T(k.value);k=va(l);if(n=ia.test(k))l=l.replace(Xc,"").substr(8).replace(/_(.)/g,function(a,b){return b.toUpperCase()});var S=k.replace(/(Start|End)$/,"");L(S)&&k===S+"Start"&&(K=l,J=l.substr(0,l.length-5)+"end",l=l.substr(0,l.length-6));k=va(l.toLowerCase());h[k]=l;if(n||!c.hasOwnProperty(k))c[k]=r,Qc(a,k)&&(c[k]=!0);X(a,b,r,k,n);x(b,k,"A",d,e,K,J)}a=a.className;D(a)&&(a=a.animVal);if(I(a)&&""!==a)for(;l=g.exec(a);)k=va(l[2]),x(b,k,"C",d,
e)&&(c[k]=T(l[3])),a=a.substr(l.index+l[0].length);break;case Pa:if(11===Va)for(;a.parentNode&&a.nextSibling&&a.nextSibling.nodeType===Pa;)a.nodeValue+=a.nextSibling.nodeValue,a.parentNode.removeChild(a.nextSibling);wa(b,a.nodeValue);break;case 8:try{if(l=f.exec(a.nodeValue))k=va(l[1]),x(b,k,"M",d,e)&&(c[k]=T(l[2]))}catch(B){}}b.sort(za);return b}function ya(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ea("uterdir",b,c);a.nodeType==pa&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&
e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return z(d)}function Wc(a,b,c){return function(d,e,f,g,h){e=ya(e[0],b,c);return a(d,e,f,g,h)}}function E(a,b,d,e,f,g,h,k,r){function n(a,b,c,d){if(a){c&&(a=Wc(a,c,d));a.require=E.require;a.directiveName=x;if(P===E||E.$$isolateScope)a=Z(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=Wc(b,c,d));b.require=E.require;b.directiveName=x;if(P===E||E.$$isolateScope)b=Z(b,{isolateScope:!0});k.push(b)}}function u(a,b,c,d){var e;if(I(b)){var f=b.match(l);b=
b.substring(f[0].length);var g=f[1]||f[3],f="?"===f[2];"^^"===g?c=c.parent():e=(e=d&&d[b])&&e.instance;e||(d="$"+b+"Controller",e=g?c.inheritedData(d):c.data(d));if(!e&&!f)throw ea("ctreq",b,a);}else if(G(b))for(e=[],g=0,f=b.length;g<f;g++)e[g]=u(a,b[g],c,d);return e||null}function N(a,b,c,d,e,f){var g=ga(),h;for(h in d){var l=d[h],k={$scope:l===P||l.$$isolateScope?e:f,$element:a,$attrs:b,$transclude:c},r=l.controller;"@"==r&&(r=b[l.name]);k=p(r,k,!0,l.controllerAs);g[l.name]=k;s||a.data("$"+l.name+
"Controller",k.instance)}return g}function K(a,c,e,f,g,l){function r(a,b,c){var d;$a(a)||(c=b,b=a,a=t);s&&(d=A);c||(c=s?ja.parent():ja);return g(a,b,d,c,ya)}var n,p,J,B,A,ha,ja;b===e?(f=d,ja=d.$$element):(ja=z(e),f=new aa(ja,d));P&&(B=c.$new(!0));g&&(ha=r,ha.$$boundTransclude=g);w&&(A=N(ja,f,ha,w,B,c));P&&(V.$$addScopeInfo(ja,B,!0,!(F&&(F===P||F===P.$$originalDirective))),V.$$addScopeClass(ja,!0),B.$$isolateBindings=P.$$isolateBindings,Y(c,f,B,B.$$isolateBindings,P,B));if(A){var m=P||S,H;m&&A[m.name]&&
(p=m.$$bindings.bindToController,(J=A[m.name])&&J.identifier&&p&&(H=J,l.$$destroyBindings=Y(c,f,J.instance,p,m)));for(n in A){J=A[n];var E=J();E!==J.instance&&(J.instance=E,ja.data("$"+n+"Controller",E),J===H&&(l.$$destroyBindings(),l.$$destroyBindings=Y(c,f,E,p,m)))}}n=0;for(l=h.length;n<l;n++)p=h[n],$(p,p.isolateScope?B:c,ja,f,p.require&&u(p.directiveName,p.require,ja,A),ha);var ya=c;P&&(P.template||null===P.templateUrl)&&(ya=B);a&&a(ya,e.childNodes,t,g);for(n=k.length-1;0<=n;n--)p=k[n],$(p,p.isolateScope?
B:c,ja,f,p.require&&u(p.directiveName,p.require,ja,A),ha)}r=r||{};for(var J=-Number.MAX_VALUE,S=r.newScopeDirective,w=r.controllerDirectives,P=r.newIsolateScopeDirective,F=r.templateDirective,A=r.nonTlbTranscludeDirective,m=!1,H=!1,s=r.hasElementTranscludeDirective,ba=d.$$element=z(b),E,x,v,y=e,za,wa=0,L=a.length;wa<L;wa++){E=a[wa];var Bb=E.$$start,M=E.$$end;Bb&&(ba=ya(b,Bb,M));v=t;if(J>E.priority)break;if(v=E.scope)E.templateUrl||(D(v)?(O("new/isolated scope",P||S,E,ba),P=E):O("new/isolated scope",
P,E,ba)),S=S||E;x=E.name;!E.templateUrl&&E.controller&&(v=E.controller,w=w||ga(),O("'"+x+"' controller",w[x],E,ba),w[x]=E);if(v=E.transclude)m=!0,E.$$tlb||(O("transclusion",A,E,ba),A=E),"element"==v?(s=!0,J=E.priority,v=ba,ba=d.$$element=z(W.createComment(" "+x+": "+d[x]+" ")),b=ba[0],U(f,xa.call(v,0),b),y=V(v,e,J,g&&g.name,{nonTlbTranscludeDirective:A})):(v=z(Ub(b)).contents(),ba.empty(),y=V(v,e));if(E.template)if(H=!0,O("template",F,E,ba),F=E,v=C(E.template)?E.template(ba,d):E.template,v=fa(v),
E.replace){g=E;v=Sb.test(v)?Yc(Xb(E.templateNamespace,T(v))):[];b=v[0];if(1!=v.length||b.nodeType!==pa)throw ea("tplrt",x,"");U(f,ba,b);L={$attr:{}};v=ha(b,[],L);var Q=a.splice(wa+1,a.length-(wa+1));P&&Zc(v);a=a.concat(v).concat(Q);$c(d,L);L=a.length}else ba.html(v);if(E.templateUrl)H=!0,O("template",F,E,ba),F=E,E.replace&&(g=E),K=Lf(a.splice(wa,a.length-wa),ba,d,f,m&&y,h,k,{controllerDirectives:w,newScopeDirective:S!==E&&S,newIsolateScopeDirective:P,templateDirective:F,nonTlbTranscludeDirective:A}),
L=a.length;else if(E.compile)try{za=E.compile(ba,d,y),C(za)?n(null,za,Bb,M):za&&n(za.pre,za.post,Bb,M)}catch(R){c(R,ua(ba))}E.terminal&&(K.terminal=!0,J=Math.max(J,E.priority))}K.scope=S&&!0===S.scope;K.transcludeOnThisElement=m;K.templateOnThisElement=H;K.transclude=y;r.hasElementTranscludeDirective=s;return K}function Zc(a){for(var b=0,c=a.length;b<c;b++)a[b]=Nb(a[b],{$$isolateScope:!0})}function x(b,d,f,g,h,l,k){if(d===h)return null;h=null;if(e.hasOwnProperty(d)){var n;d=a.get(d+"Directive");for(var p=
0,u=d.length;p<u;p++)try{n=d[p],(g===t||g>n.priority)&&-1!=n.restrict.indexOf(f)&&(l&&(n=Nb(n,{$$start:l,$$end:k})),b.push(n),h=n)}catch(J){c(J)}}return h}function L(b){if(e.hasOwnProperty(b))for(var c=a.get(b+"Directive"),d=0,f=c.length;d<f;d++)if(b=c[d],b.multiElement)return!0;return!1}function $c(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;m(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});m(b,function(b,f){"class"==f?(F(e,b),a["class"]=(a["class"]?
a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function Lf(a,b,c,e,f,g,h,l){var k=[],r,n,p=b[0],u=a.shift(),J=Nb(u,{templateUrl:null,transclude:null,replace:null,$$originalDirective:u}),N=C(u.templateUrl)?u.templateUrl(b,c):u.templateUrl,B=u.templateNamespace;b.empty();d(N).then(function(d){var K,w;d=fa(d);if(u.replace){d=Sb.test(d)?Yc(Xb(B,T(d))):[];K=d[0];if(1!=d.length||K.nodeType!==
pa)throw ea("tplrt",u.name,N);d={$attr:{}};U(e,b,K);var A=ha(K,[],d);D(u.scope)&&Zc(A);a=A.concat(a);$c(c,d)}else K=p,b.html(d);a.unshift(J);r=E(a,K,c,f,b,u,g,h,l);m(e,function(a,c){a==K&&(e[c]=b[0])});for(n=S(b[0].childNodes,f);k.length;){d=k.shift();w=k.shift();var H=k.shift(),V=k.shift(),A=b[0];if(!d.$$destroyed){if(w!==p){var ya=w.className;l.hasElementTranscludeDirective&&u.replace||(A=Ub(K));U(H,z(w),A);F(z(A),ya)}w=r.transcludeOnThisElement?P(d,r.transclude,V):V;r(n,d,A,e,w,r)}}k=null});return function(a,
b,c,d,e){a=e;b.$$destroyed||(k?k.push(b,c,d,a):(r.transcludeOnThisElement&&(a=P(b,r.transclude,e)),r(n,b,c,d,a,r)))}}function za(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function O(a,b,c,d){function e(a){return a?" (module: "+a+")":""}if(b)throw ea("multidir",b.name,e(b.$$moduleName),c.name,e(c.$$moduleName),a,ua(d));}function wa(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&V.$$addBindingClass(a);
return function(a,c){var e=c.parent();b||V.$$addBindingClass(e);V.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function Xb(a,b){a=M(a||"html");switch(a){case "svg":case "math":var c=W.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function R(a,b){if("srcdoc"==b)return H.HTML;var c=ta(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return H.RESOURCE_URL}function X(a,c,d,e,
f){var g=R(a,e);f=h[e]||f;var l=b(d,!0,g,f);if(l){if("multiple"===e&&"select"===ta(a))throw ea("selmulti",ua(a));c.push({priority:100,compile:function(){return{pre:function(a,c,h){c=h.$$observers||(h.$$observers={});if(k.test(e))throw ea("nodomevents");var r=h[e];r!==d&&(l=r&&b(r,!0,g,f),d=r);l&&(h[e]=l(a),(c[e]||(c[e]=[])).$$inter=!0,(h.$$observers&&h.$$observers[e].$$scope||a).$watch(l,function(a,b){"class"===e&&a!=b?h.$updateClass(a,b):h.$set(e,a)}))}}}})}}function U(a,b,c){var d=b[0],e=b.length,
f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var l=a.length;g<l;g++,h++)h<l?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=W.createDocumentFragment();a.appendChild(d);z.hasData(d)&&(z(c).data(z(d).data()),la?(Qb=!0,la.cleanData([d])):delete z.cache[d[z.expando]]);d=1;for(e=b.length;d<e;d++)f=b[d],z(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function Z(a,b){return Q(function(){return a.apply(null,
arguments)},a,b)}function $(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,ua(d))}}function Y(a,c,d,e,f,g){var h;m(e,function(e,g){var l=e.attrName,k=e.optional,r,n,p,K;switch(e.mode){case "@":k||Na.call(c,l)||(d[g]=c[l]=void 0);c.$observe(l,function(a){I(a)&&(d[g]=a)});c.$$observers[l].$$scope=a;I(c[l])&&(d[g]=b(c[l])(a));break;case "=":if(!Na.call(c,l)){if(k)break;c[l]=void 0}if(k&&!c[l])break;n=w(c[l]);K=n.literal?ka:function(a,b){return a===b||a!==a&&b!==b};p=n.assign||function(){r=d[g]=n(a);throw ea("nonassign",
c[l],f.name);};r=d[g]=n(a);k=function(b){K(b,d[g])||(K(b,r)?p(a,b=d[g]):d[g]=b);return r=b};k.$stateful=!0;k=e.collection?a.$watchCollection(c[l],k):a.$watch(w(c[l],k),null,n.literal);h=h||[];h.push(k);break;case "&":n=c.hasOwnProperty(l)?w(c[l]):v;if(n===v&&k)break;d[g]=function(b){return n(a,b)}}});e=h?function(){for(var a=0,b=h.length;a<b;++a)h[a]()}:v;return g&&e!==v?(g.$on("$destroy",e),v):e}var aa=function(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr=
{};this.$$element=a};aa.prototype={$normalize:va,$addClass:function(a){a&&0<a.length&&N.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&N.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=ad(a,b);c&&c.length&&N.addClass(this.$$element,c);(c=ad(b,a))&&c.length&&N.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=this.$$element[0],g=Qc(f,a),h=Gf(f,a),f=a;g?(this.$$element.prop(a,b),e=g):h&&(this[h]=b,f=h);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=
e=zc(a,"-"));g=ta(this.$$element);if("a"===g&&"href"===a||"img"===g&&"src"===a)this[a]=b=J(b,"src"===a);else if("img"===g&&"srcset"===a){for(var g="",h=T(b),l=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,l=/\s/.test(h)?l:/(,)/,h=h.split(l),l=Math.floor(h.length/2),k=0;k<l;k++)var r=2*k,g=g+J(T(h[r]),!0),g=g+(" "+T(h[r+1]));h=T(h[2*k]).split(/\s/);g+=J(T(h[0]),!0);2===h.length&&(g+=" "+T(h[1]));this[a]=b=g}!1!==d&&(null===b||b===t?this.$$element.removeAttr(e):this.$$element.attr(e,b));(a=this.$$observers)&&
m(a[f],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=ga()),e=d[a]||(d[a]=[]);e.push(b);A.$evalAsync(function(){e.$$inter||!c.hasOwnProperty(a)||y(c[a])||b(c[a])});return function(){bb(e,b)}}};var ca=b.startSymbol(),da=b.endSymbol(),fa="{{"==ca||"}}"==da?Za:function(a){return a.replace(/\{\{/g,ca).replace(/}}/g,da)},ia=/^ngAttr[A-Z]/;V.$$addBindingInfo=n?function(a,b){var c=a.data("$binding")||[];G(b)?c=c.concat(b):c.push(b);a.data("$binding",
c)}:v;V.$$addBindingClass=n?function(a){F(a,"ng-binding")}:v;V.$$addScopeInfo=n?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:v;V.$$addScopeClass=n?function(a,b){F(a,b?"ng-isolate-scope":"ng-scope")}:v;return V}]}function va(b){return fb(b.replace(Xc,""))}function ad(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),f=0;a:for(;f<d.length;f++){for(var g=d[f],h=0;h<e.length;h++)if(g==e[h])continue a;c+=(0<c.length?" ":"")+g}return c}function Yc(b){b=z(b);var a=b.length;
if(1>=a)return b;for(;a--;)8===b[a].nodeType&&Mf.call(b,a,1);return b}function Xe(){var b={},a=!1;this.register=function(a,d){Ta(a,"controller");D(a)?Q(b,a):b[a]=d};this.allowGlobals=function(){a=!0};this.$get=["$injector","$window",function(c,d){function e(a,b,c,d){if(!a||!D(a.$scope))throw L("$controller")("noscp",d,b);a.$scope[b]=c}return function(f,g,h,l){var k,n,q;h=!0===h;l&&I(l)&&(q=l);if(I(f)){l=f.match(Vc);if(!l)throw Nf("ctrlfmt",f);n=l[1];q=q||l[3];f=b.hasOwnProperty(n)?b[n]:Bc(g.$scope,
n,!0)||(a?Bc(d,n,!0):t);Sa(f,n,!0)}if(h)return h=(G(f)?f[f.length-1]:f).prototype,k=Object.create(h||null),q&&e(g,q,k,n||f.name),Q(function(){var a=c.invoke(f,k,g,n);a!==k&&(D(a)||C(a))&&(k=a,q&&e(g,q,k,n||f.name));return k},{instance:k,identifier:q});k=c.instantiate(f,g,n);q&&e(g,q,k,n||f.name);return k}}]}function Ye(){this.$get=["$window",function(b){return z(b.document)}]}function Ze(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function Yb(b){return D(b)?
ca(b)?b.toISOString():db(b):b}function df(){this.$get=function(){return function(b){if(!b)return"";var a=[];mc(b,function(b,d){null===b||y(b)||(G(b)?m(b,function(b,c){a.push(ma(d)+"="+ma(Yb(b)))}):a.push(ma(d)+"="+ma(Yb(b))))});return a.join("&")}}}function ef(){this.$get=function(){return function(b){function a(b,e,f){null===b||y(b)||(G(b)?m(b,function(b,c){a(b,e+"["+(D(b)?c:"")+"]")}):D(b)&&!ca(b)?mc(b,function(b,c){a(b,e+(f?"":"[")+c+(f?"":"]"))}):c.push(ma(e)+"="+ma(Yb(b))))}if(!b)return"";var c=
[];a(b,"",!0);return c.join("&")}}}function Zb(b,a){if(I(b)){var c=b.replace(Of,"").trim();if(c){var d=a("Content-Type");(d=d&&0===d.indexOf(bd))||(d=(d=c.match(Pf))&&Qf[d[0]].test(c));d&&(b=uc(c))}}return b}function cd(b){var a=ga(),c;I(b)?m(b.split("\n"),function(b){c=b.indexOf(":");var e=M(T(b.substr(0,c)));b=T(b.substr(c+1));e&&(a[e]=a[e]?a[e]+", "+b:b)}):D(b)&&m(b,function(b,c){var f=M(c),g=T(b);f&&(a[f]=a[f]?a[f]+", "+g:g)});return a}function dd(b){var a;return function(c){a||(a=cd(b));return c?
(c=a[M(c)],void 0===c&&(c=null),c):a}}function ed(b,a,c,d){if(C(d))return d(b,a,c);m(d,function(d){b=d(b,a,c)});return b}function cf(){var b=this.defaults={transformResponse:[Zb],transformRequest:[function(a){return D(a)&&"[object File]"!==sa.call(a)&&"[object Blob]"!==sa.call(a)&&"[object FormData]"!==sa.call(a)?db(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ia($b),put:ia($b),patch:ia($b)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",paramSerializer:"$httpParamSerializer"},
a=!1;this.useApplyAsync=function(b){return x(b)?(a=!!b,this):a};var c=!0;this.useLegacyPromiseExtensions=function(a){return x(a)?(c=!!a,this):c};var d=this.interceptors=[];this.$get=["$httpBackend","$$cookieReader","$cacheFactory","$rootScope","$q","$injector",function(e,f,g,h,l,k){function n(a){function d(a){var b=Q({},a);b.data=a.data?ed(a.data,a.headers,a.status,f.transformResponse):a.data;a=a.status;return 200<=a&&300>a?b:l.reject(b)}function e(a,b){var c,d={};m(a,function(a,e){C(a)?(c=a(b),null!=
c&&(d[e]=c)):d[e]=a});return d}if(!aa.isObject(a))throw L("$http")("badreq",a);var f=Q({method:"get",transformRequest:b.transformRequest,transformResponse:b.transformResponse,paramSerializer:b.paramSerializer},a);f.headers=function(a){var c=b.headers,d=Q({},a.headers),f,g,h,c=Q({},c.common,c[M(a.method)]);a:for(f in c){g=M(f);for(h in d)if(M(h)===g)continue a;d[f]=c[f]}return e(d,ia(a))}(a);f.method=rb(f.method);f.paramSerializer=I(f.paramSerializer)?k.get(f.paramSerializer):f.paramSerializer;var g=
[function(a){var c=a.headers,e=ed(a.data,dd(c),t,a.transformRequest);y(e)&&m(c,function(a,b){"content-type"===M(b)&&delete c[b]});y(a.withCredentials)&&!y(b.withCredentials)&&(a.withCredentials=b.withCredentials);return q(a,e).then(d,d)},t],h=l.when(f);for(m(B,function(a){(a.request||a.requestError)&&g.unshift(a.request,a.requestError);(a.response||a.responseError)&&g.push(a.response,a.responseError)});g.length;){a=g.shift();var r=g.shift(),h=h.then(a,r)}c?(h.success=function(a){Sa(a,"fn");h.then(function(b){a(b.data,
b.status,b.headers,f)});return h},h.error=function(a){Sa(a,"fn");h.then(null,function(b){a(b.data,b.status,b.headers,f)});return h}):(h.success=fd("success"),h.error=fd("error"));return h}function q(c,d){function g(b,c,d,e){function f(){k(c,b,d,e)}F&&(200<=b&&300>b?F.put(P,[b,c,cd(d),e]):F.remove(P));a?h.$applyAsync(f):(f(),h.$$phase||h.$apply())}function k(a,b,d,e){b=Math.max(b,0);(200<=b&&300>b?N.resolve:N.reject)({data:a,status:b,headers:dd(d),config:c,statusText:e})}function q(a){k(a.data,a.status,
ia(a.headers()),a.statusText)}function B(){var a=n.pendingRequests.indexOf(c);-1!==a&&n.pendingRequests.splice(a,1)}var N=l.defer(),J=N.promise,F,m,S=c.headers,P=r(c.url,c.paramSerializer(c.params));n.pendingRequests.push(c);J.then(B,B);!c.cache&&!b.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(F=D(c.cache)?c.cache:D(b.cache)?b.cache:u);F&&(m=F.get(P),x(m)?m&&C(m.then)?m.then(q,q):G(m)?k(m[1],m[0],ia(m[2]),m[3]):k(m,200,{},"OK"):F.put(P,J));y(m)&&((m=gd(c.url)?f()[c.xsrfCookieName||
b.xsrfCookieName]:t)&&(S[c.xsrfHeaderName||b.xsrfHeaderName]=m),e(c.method,P,d,g,S,c.timeout,c.withCredentials,c.responseType));return J}function r(a,b){0<b.length&&(a+=(-1==a.indexOf("?")?"?":"&")+b);return a}var u=g("$http");b.paramSerializer=I(b.paramSerializer)?k.get(b.paramSerializer):b.paramSerializer;var B=[];m(d,function(a){B.unshift(I(a)?k.get(a):k.invoke(a))});n.pendingRequests=[];(function(a){m(arguments,function(a){n[a]=function(b,c){return n(Q({},c||{},{method:a,url:b}))}})})("get","delete",
"head","jsonp");(function(a){m(arguments,function(a){n[a]=function(b,c,d){return n(Q({},d||{},{method:a,url:b,data:c}))}})})("post","put","patch");n.defaults=b;return n}]}function Rf(){return new O.XMLHttpRequest}function ff(){this.$get=["$browser","$window","$document",function(b,a,c){return Sf(b,Rf,b.defer,a.angular.callbacks,c[0])}]}function Sf(b,a,c,d,e){function f(a,b,c){var f=e.createElement("script"),n=null;f.type="text/javascript";f.src=a;f.async=!0;n=function(a){f.removeEventListener("load",
n,!1);f.removeEventListener("error",n,!1);e.body.removeChild(f);f=null;var g=-1,u="unknown";a&&("load"!==a.type||d[b].called||(a={type:"error"}),u=a.type,g="error"===a.type?404:200);c&&c(g,u)};f.addEventListener("load",n,!1);f.addEventListener("error",n,!1);e.body.appendChild(f);return n}return function(e,h,l,k,n,q,r,u){function B(){p&&p();A&&A.abort()}function K(a,d,e,f,g){H!==t&&c.cancel(H);p=A=null;a(d,e,f,g);b.$$completeOutstandingRequest(v)}b.$$incOutstandingRequestCount();h=h||b.url();if("jsonp"==
M(e)){var w="_"+(d.counter++).toString(36);d[w]=function(a){d[w].data=a;d[w].called=!0};var p=f(h.replace("JSON_CALLBACK","angular.callbacks."+w),w,function(a,b){K(k,a,d[w].data,"",b);d[w]=v})}else{var A=a();A.open(e,h,!0);m(n,function(a,b){x(a)&&A.setRequestHeader(b,a)});A.onload=function(){var a=A.statusText||"",b="response"in A?A.response:A.responseText,c=1223===A.status?204:A.status;0===c&&(c=b?200:"file"==Aa(h).protocol?404:0);K(k,c,b,A.getAllResponseHeaders(),a)};e=function(){K(k,-1,null,null,
"")};A.onerror=e;A.onabort=e;r&&(A.withCredentials=!0);if(u)try{A.responseType=u}catch(s){if("json"!==u)throw s;}A.send(l)}if(0<q)var H=c(B,q);else q&&C(q.then)&&q.then(B)}}function af(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function f(a){return"\\\\\\"+a}function g(c){return c.replace(n,b).replace(q,a)}function h(f,h,n,q){function w(a){try{var b=a;a=n?e.getTrusted(n,
b):e.valueOf(b);var c;if(q&&!x(a))c=a;else if(null==a)c="";else{switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=db(a)}c=a}return c}catch(g){d(Ka.interr(f,g))}}q=!!q;for(var p,m,s=0,H=[],N=[],J=f.length,F=[],V=[];s<J;)if(-1!=(p=f.indexOf(b,s))&&-1!=(m=f.indexOf(a,p+l)))s!==p&&F.push(g(f.substring(s,p))),s=f.substring(p+l,m),H.push(s),N.push(c(s,w)),s=m+k,V.push(F.length),F.push("");else{s!==J&&F.push(g(f.substring(s)));break}n&&1<F.length&&Ka.throwNoconcat(f);if(!h||H.length){var S=
function(a){for(var b=0,c=H.length;b<c;b++){if(q&&y(a[b]))return;F[V[b]]=a[b]}return F.join("")};return Q(function(a){var b=0,c=H.length,e=Array(c);try{for(;b<c;b++)e[b]=N[b](a);return S(e)}catch(g){d(Ka.interr(f,g))}},{exp:f,expressions:H,$$watchDelegate:function(a,b){var c;return a.$watchGroup(N,function(d,e){var f=S(d);C(b)&&b.call(this,f,d!==e?c:f,a);c=f})}})}}var l=b.length,k=a.length,n=new RegExp(b.replace(/./g,f),"g"),q=new RegExp(a.replace(/./g,f),"g");h.startSymbol=function(){return b};h.endSymbol=
function(){return a};return h}]}function bf(){this.$get=["$rootScope","$window","$q","$$q",function(b,a,c,d){function e(e,h,l,k){var n=4<arguments.length,q=n?xa.call(arguments,4):[],r=a.setInterval,u=a.clearInterval,B=0,K=x(k)&&!k,w=(K?d:c).defer(),p=w.promise;l=x(l)?l:0;p.then(null,null,n?function(){e.apply(null,q)}:e);p.$$intervalId=r(function(){w.notify(B++);0<l&&B>=l&&(w.resolve(B),u(p.$$intervalId),delete f[p.$$intervalId]);K||b.$apply()},h);f[p.$$intervalId]=w;return p}var f={};e.cancel=function(b){return b&&
b.$$intervalId in f?(f[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),delete f[b.$$intervalId],!0):!1};return e}]}function ac(b){b=b.split("/");for(var a=b.length;a--;)b[a]=nb(b[a]);return b.join("/")}function hd(b,a){var c=Aa(b);a.$$protocol=c.protocol;a.$$host=c.hostname;a.$$port=Y(c.port)||Tf[c.protocol]||null}function id(b,a){var c="/"!==b.charAt(0);c&&(b="/"+b);var d=Aa(b);a.$$path=decodeURIComponent(c&&"/"===d.pathname.charAt(0)?d.pathname.substring(1):d.pathname);a.$$search=
xc(d.search);a.$$hash=decodeURIComponent(d.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function ra(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ja(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function Cb(b){return b.replace(/(#.+)|#$/,"$1")}function bc(b,a,c){this.$$html5=!0;c=c||"";hd(b,this);this.$$parse=function(b){var c=ra(a,b);if(!I(c))throw Db("ipthprfx",b,a);id(c,this);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var b=
Pb(this.$$search),c=this.$$hash?"#"+nb(this.$$hash):"";this.$$url=ac(this.$$path)+(b?"?"+b:"")+c;this.$$absUrl=a+this.$$url.substr(1)};this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;(f=ra(b,d))!==t?(g=f,g=(f=ra(c,f))!==t?a+(ra("/",f)||f):b+g):(f=ra(a,d))!==t?g=a+f:a==d+"/"&&(g=a);g&&this.$$parse(g);return!!g}}function cc(b,a,c){hd(b,this);this.$$parse=function(d){var e=ra(b,d)||ra(a,d),f;y(e)||"#"!==e.charAt(0)?this.$$html5?f=e:(f="",y(e)&&(b=d,this.replace())):
(f=ra(c,e),y(f)&&(f=e));id(f,this);d=this.$$path;var e=b,g=/^\/[A-Z]:(\/.*)/;0===f.indexOf(e)&&(f=f.replace(e,""));g.exec(f)||(d=(f=g.exec(d))?f[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var a=Pb(this.$$search),e=this.$$hash?"#"+nb(this.$$hash):"";this.$$url=ac(this.$$path)+(a?"?"+a:"")+e;this.$$absUrl=b+(this.$$url?c+this.$$url:"")};this.$$parseLinkUrl=function(a,c){return Ja(b)==Ja(a)?(this.$$parse(a),!0):!1}}function jd(b,a,c){this.$$html5=!0;cc.apply(this,arguments);this.$$parseLinkUrl=
function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;b==Ja(d)?f=d:(g=ra(a,d))?f=b+c+g:a===d+"/"&&(f=a);f&&this.$$parse(f);return!!f};this.$$compose=function(){var a=Pb(this.$$search),e=this.$$hash?"#"+nb(this.$$hash):"";this.$$url=ac(this.$$path)+(a?"?"+a:"")+e;this.$$absUrl=b+c+this.$$url}}function Eb(b){return function(){return this[b]}}function kd(b,a){return function(c){if(y(c))return this[b];this[b]=a(c);this.$$compose();return this}}function gf(){var b="",a={enabled:!1,requireBase:!0,
rewriteLinks:!0};this.hashPrefix=function(a){return x(a)?(b=a,this):b};this.html5Mode=function(b){return ab(b)?(a.enabled=b,this):D(b)?(ab(b.enabled)&&(a.enabled=b.enabled),ab(b.requireBase)&&(a.requireBase=b.requireBase),ab(b.rewriteLinks)&&(a.rewriteLinks=b.rewriteLinks),this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement","$window",function(c,d,e,f,g){function h(a,b,c){var e=k.url(),f=k.$$state;try{d.url(a,b,c),k.$$state=d.state()}catch(g){throw k.url(e),k.$$state=f,g;}}function l(a,
b){c.$broadcast("$locationChangeSuccess",k.absUrl(),a,k.$$state,b)}var k,n;n=d.baseHref();var q=d.url(),r;if(a.enabled){if(!n&&a.requireBase)throw Db("nobase");r=q.substring(0,q.indexOf("/",q.indexOf("//")+2))+(n||"/");n=e.history?bc:jd}else r=Ja(q),n=cc;var u=r.substr(0,Ja(r).lastIndexOf("/")+1);k=new n(r,u,"#"+b);k.$$parseLinkUrl(q,q);k.$$state=d.state();var B=/^\s*(javascript|mailto):/i;f.on("click",function(b){if(a.rewriteLinks&&!b.ctrlKey&&!b.metaKey&&!b.shiftKey&&2!=b.which&&2!=b.button){for(var e=
z(b.target);"a"!==ta(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var h=e.prop("href"),l=e.attr("href")||e.attr("xlink:href");D(h)&&"[object SVGAnimatedString]"===h.toString()&&(h=Aa(h.animVal).href);B.test(h)||!h||e.attr("target")||b.isDefaultPrevented()||!k.$$parseLinkUrl(h,l)||(b.preventDefault(),k.absUrl()!=d.url()&&(c.$apply(),g.angular["ff-684208-preventDefault"]=!0))}});Cb(k.absUrl())!=Cb(q)&&d.url(k.absUrl(),!0);var K=!0;d.onUrlChange(function(a,b){y(ra(u,a))?g.location.href=a:(c.$evalAsync(function(){var d=
k.absUrl(),e=k.$$state,f;k.$$parse(a);k.$$state=b;f=c.$broadcast("$locationChangeStart",a,d,b,e).defaultPrevented;k.absUrl()===a&&(f?(k.$$parse(d),k.$$state=e,h(d,!1,e)):(K=!1,l(d,e)))}),c.$$phase||c.$digest())});c.$watch(function(){var a=Cb(d.url()),b=Cb(k.absUrl()),f=d.state(),g=k.$$replace,n=a!==b||k.$$html5&&e.history&&f!==k.$$state;if(K||n)K=!1,c.$evalAsync(function(){var b=k.absUrl(),d=c.$broadcast("$locationChangeStart",b,a,k.$$state,f).defaultPrevented;k.absUrl()===b&&(d?(k.$$parse(a),k.$$state=
f):(n&&h(b,g,f===k.$$state?null:k.$$state),l(a,f)))});k.$$replace=!1});return k}]}function hf(){var b=!0,a=this;this.debugEnabled=function(a){return x(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||v;a=!1;try{a=!!e.apply}catch(l){}return a?function(){var a=
[];m(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function Wa(b,a){if("__defineGetter__"===b||"__defineSetter__"===b||"__lookupGetter__"===b||"__lookupSetter__"===b||"__proto__"===b)throw da("isecfld",a);return b}function Ba(b,a){if(b){if(b.constructor===b)throw da("isecfn",a);if(b.window===b)throw da("isecwindow",
a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw da("isecdom",a);if(b===Object)throw da("isecobj",a);}return b}function ld(b,a){if(b){if(b.constructor===b)throw da("isecfn",a);if(b===Uf||b===Vf||b===Wf)throw da("isecff",a);}}function Xf(b,a){return"undefined"!==typeof b?b:a}function md(b,a){return"undefined"===typeof b?a:"undefined"===typeof a?b:b+a}function U(b,a){var c,d;switch(b.type){case s.Program:c=!0;m(b.body,function(b){U(b.expression,a);c=c&&b.expression.constant});b.constant=
c;break;case s.Literal:b.constant=!0;b.toWatch=[];break;case s.UnaryExpression:U(b.argument,a);b.constant=b.argument.constant;b.toWatch=b.argument.toWatch;break;case s.BinaryExpression:U(b.left,a);U(b.right,a);b.constant=b.left.constant&&b.right.constant;b.toWatch=b.left.toWatch.concat(b.right.toWatch);break;case s.LogicalExpression:U(b.left,a);U(b.right,a);b.constant=b.left.constant&&b.right.constant;b.toWatch=b.constant?[]:[b];break;case s.ConditionalExpression:U(b.test,a);U(b.alternate,a);U(b.consequent,
a);b.constant=b.test.constant&&b.alternate.constant&&b.consequent.constant;b.toWatch=b.constant?[]:[b];break;case s.Identifier:b.constant=!1;b.toWatch=[b];break;case s.MemberExpression:U(b.object,a);b.computed&&U(b.property,a);b.constant=b.object.constant&&(!b.computed||b.property.constant);b.toWatch=[b];break;case s.CallExpression:c=b.filter?!a(b.callee.name).$stateful:!1;d=[];m(b.arguments,function(b){U(b,a);c=c&&b.constant;b.constant||d.push.apply(d,b.toWatch)});b.constant=c;b.toWatch=b.filter&&
!a(b.callee.name).$stateful?d:[b];break;case s.AssignmentExpression:U(b.left,a);U(b.right,a);b.constant=b.left.constant&&b.right.constant;b.toWatch=[b];break;case s.ArrayExpression:c=!0;d=[];m(b.elements,function(b){U(b,a);c=c&&b.constant;b.constant||d.push.apply(d,b.toWatch)});b.constant=c;b.toWatch=d;break;case s.ObjectExpression:c=!0;d=[];m(b.properties,function(b){U(b.value,a);c=c&&b.value.constant;b.value.constant||d.push.apply(d,b.value.toWatch)});b.constant=c;b.toWatch=d;break;case s.ThisExpression:b.constant=
!1,b.toWatch=[]}}function nd(b){if(1==b.length){b=b[0].expression;var a=b.toWatch;return 1!==a.length?a:a[0]!==b?a:t}}function od(b){return b.type===s.Identifier||b.type===s.MemberExpression}function pd(b){if(1===b.body.length&&od(b.body[0].expression))return{type:s.AssignmentExpression,left:b.body[0].expression,right:{type:s.NGValueParameter},operator:"="}}function qd(b){return 0===b.body.length||1===b.body.length&&(b.body[0].expression.type===s.Literal||b.body[0].expression.type===s.ArrayExpression||
b.body[0].expression.type===s.ObjectExpression)}function rd(b,a){this.astBuilder=b;this.$filter=a}function sd(b,a){this.astBuilder=b;this.$filter=a}function Fb(b){return"constructor"==b}function dc(b){return C(b.valueOf)?b.valueOf():Yf.call(b)}function jf(){var b=ga(),a=ga();this.$get=["$filter",function(c){function d(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=dc(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function e(a,b,c,e,f){var g=e.inputs,h;if(1===g.length){var l=d,g=g[0];return a.$watch(function(a){var b=
g(a);d(b,l)||(h=e(a,t,t,[b]),l=b&&dc(b));return h},b,c,f)}for(var k=[],n=[],q=0,m=g.length;q<m;q++)k[q]=d,n[q]=null;return a.$watch(function(a){for(var b=!1,c=0,f=g.length;c<f;c++){var l=g[c](a);if(b||(b=!d(l,k[c])))n[c]=l,k[c]=l&&dc(l)}b&&(h=e(a,t,t,n));return h},b,c,f)}function f(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;C(b)&&b.apply(this,arguments);x(a)&&d.$$postDigest(function(){x(f)&&e()})},c)}function g(a,b,c,d){function e(a){var b=!0;m(a,function(a){x(a)||
(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,c,d){g=a;C(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function h(a,b,c,d){var e;return e=a.$watch(function(a){return d(a)},function(a,c,d){C(b)&&b.apply(this,arguments);e()},c)}function l(a,b){if(!b)return a;var c=a.$$watchDelegate,c=c!==g&&c!==f?function(c,d,e,f){e=a(c,d,e,f);return b(e,c,d)}:function(c,d,e,f){e=a(c,d,e,f);c=b(e,c,d);return x(e)?c:e};a.$$watchDelegate&&a.$$watchDelegate!==
e?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=e,c.inputs=a.inputs?a.inputs:[a]);return c}var k=Fa().noUnsafeEval,n={csp:k,expensiveChecks:!1},q={csp:k,expensiveChecks:!0};return function(d,k,B){var m,w,p;switch(typeof d){case "string":p=d=d.trim();var s=B?a:b;m=s[p];m||(":"===d.charAt(0)&&":"===d.charAt(1)&&(w=!0,d=d.substring(2)),B=B?q:n,m=new ec(B),m=(new fc(m,c,B)).parse(d),m.constant?m.$$watchDelegate=h:w?m.$$watchDelegate=m.literal?g:f:m.inputs&&(m.$$watchDelegate=e),
s[p]=m);return l(m,k);case "function":return l(d,k);default:return v}}}]}function lf(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return td(function(a){b.$evalAsync(a)},a)}]}function mf(){this.$get=["$browser","$exceptionHandler",function(b,a){return td(function(a){b.defer(a)},a)}]}function td(b,a){function c(a,b,c){function d(b){return function(c){e||(e=!0,b.call(a,c))}}var e=!1;return[d(b),d(c)]}function d(){this.$$state={status:0}}function e(a,b){return function(c){b.call(a,c)}}
function f(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,b(function(){var b,d,e;e=c.pending;c.processScheduled=!1;c.pending=t;for(var f=0,g=e.length;f<g;++f){d=e[f][0];b=e[f][c.status];try{C(b)?d.resolve(b(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),a(h)}}}))}function g(){this.promise=new d;this.resolve=e(this,this.resolve);this.reject=e(this,this.reject);this.notify=e(this,this.notify)}var h=L("$q",TypeError);Q(d.prototype,{then:function(a,b,c){if(y(a)&&
y(b)&&y(c))return this;var d=new g;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&f(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return k(b,!0,a)},function(b){return k(b,!1,a)},b)}});Q(g.prototype,{resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(h("qcycle",a)):this.$$resolve(a))},$$resolve:function(b){var d,e;e=c(this,this.$$resolve,
this.$$reject);try{if(D(b)||C(b))d=b&&b.then;C(d)?(this.promise.$$state.status=-1,d.call(b,e[0],e[1],this.notify)):(this.promise.$$state.value=b,this.promise.$$state.status=1,f(this.promise.$$state))}catch(g){e[1](g),a(g)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;f(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&d&&d.length&&b(function(){for(var b,
e,f=0,g=d.length;f<g;f++){e=d[f][0];b=d[f][3];try{e.notify(C(b)?b(c):c)}catch(h){a(h)}}})}});var l=function(a,b){var c=new g;b?c.resolve(a):c.reject(a);return c.promise},k=function(a,b,c){var d=null;try{C(c)&&(d=c())}catch(e){return l(e,!1)}return d&&C(d.then)?d.then(function(){return l(a,b)},function(a){return l(a,!1)}):l(a,b)},n=function(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,c,d)},q=function u(a){if(!C(a))throw h("norslvr",a);if(!(this instanceof u))return new u(a);var b=new g;
a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};q.defer=function(){return new g};q.reject=function(a){var b=new g;b.reject(a);return b.promise};q.when=n;q.resolve=n;q.all=function(a){var b=new g,c=0,d=G(a)?[]:{};m(a,function(a,e){c++;n(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};return q}function vf(){this.$get=["$window","$timeout",function(b,a){function c(){for(var a=
0;a<n.length;a++){var b=n[a];b&&(n[a]=null,b())}k=n.length=0}function d(a){var b=n.length;k++;n.push(a);0===b&&(l=h(c));return function(){0<=b&&(b=n[b]=null,0===--k&&l&&(l(),l=null,n.length=0))}}var e=b.requestAnimationFrame||b.webkitRequestAnimationFrame,f=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,g=!!e,h=g?function(a){var b=e(a);return function(){f(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};d.supported=g;var l,k=0,n=[];return d}]}
function kf(){function b(a){function b(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$id=++mb;this.$$ChildScope=null}b.prototype=a;return b}var a=10,c=L("$rootScope"),d=null,e=null;this.digestTtl=function(b){arguments.length&&(a=b);return a};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(f,g,h,l){function k(a){a.currentScope.$$destroyed=!0}function n(){this.$id=++mb;this.$$phase=
this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$$isolateBindings=null}function q(a){if(p.$$phase)throw c("inprog",p.$$phase);p.$$phase=a}function r(a,b){do a.$$watchersCount+=b;while(a=a.$parent)}function u(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function s(){}function K(){for(;H.length;)try{H.shift()()}catch(a){g(a)}e=
null}function w(){null===e&&(e=l.defer(function(){p.$apply(K)}))}n.prototype={constructor:n,$new:function(a,c){var d;c=c||this;a?(d=new n,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=b(this)),d=new this.$$ChildScope);d.$parent=c;d.$$prevSibling=c.$$childTail;c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=d;(a||c!=this)&&d.$on("$destroy",k);return d},$watch:function(a,b,c,e){var f=h(a);if(f.$$watchDelegate)return f.$$watchDelegate(this,b,c,f,
a);var g=this,l=g.$$watchers,k={fn:b,last:s,get:f,exp:e||a,eq:!!c};d=null;C(b)||(k.fn=v);l||(l=g.$$watchers=[]);l.unshift(k);r(this,1);return function(){0<=bb(l,k)&&r(g,-1);d=null}},$watchGroup:function(a,b){function c(){h=!1;l?(l=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,l=!0;if(!a.length){var k=!0;g.$evalAsync(function(){k&&b(e,e,g)});return function(){k=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});m(a,function(a,
b){var l=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(l)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!y(e)){if(D(e))if(Da(e))for(f!==q&&(f=q,u=f.length=0,k++),a=e.length,u!==a&&(k++,f.length=u=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(k++,f[b]=g);else{f!==r&&(f=r={},u=0,k++);a=0;for(b in e)e.hasOwnProperty(b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(k++,f[b]=g)):(u++,f[b]=g,
k++));if(u>a)for(b in k++,f)e.hasOwnProperty(b)||(u--,delete f[b])}else f!==e&&(f=e,k++);return k}}c.$stateful=!0;var d=this,e,f,g,l=1<b.length,k=0,n=h(a,c),q=[],r={},p=!0,u=0;return this.$watch(n,function(){p?(p=!1,b(e,e,d)):b(e,g,d);if(l)if(D(e))if(Da(e)){g=Array(e.length);for(var a=0;a<e.length;a++)g[a]=e[a]}else for(a in g={},e)Na.call(e,a)&&(g[a]=e[a]);else g=e})},$digest:function(){var b,f,h,k,n,r,u=a,m,w=[],E,H;q("$digest");l.$$checkUrlChange();this===p&&null!==e&&(l.defer.cancel(e),K());d=
null;do{r=!1;for(m=this;t.length;){try{H=t.shift(),H.scope.$eval(H.expression,H.locals)}catch(v){g(v)}d=null}a:do{if(k=m.$$watchers)for(n=k.length;n--;)try{if(b=k[n])if((f=b.get(m))!==(h=b.last)&&!(b.eq?ka(f,h):"number"===typeof f&&"number"===typeof h&&isNaN(f)&&isNaN(h)))r=!0,d=b,b.last=b.eq?fa(f,null):f,b.fn(f,h===s?f:h,m),5>u&&(E=4-u,w[E]||(w[E]=[]),w[E].push({msg:C(b.exp)?"fn: "+(b.exp.name||b.exp.toString()):b.exp,newVal:f,oldVal:h}));else if(b===d){r=!1;break a}}catch(y){g(y)}if(!(k=m.$$watchersCount&&
m.$$childHead||m!==this&&m.$$nextSibling))for(;m!==this&&!(k=m.$$nextSibling);)m=m.$parent}while(m=k);if((r||t.length)&&!u--)throw p.$$phase=null,c("infdig",a,w);}while(r||t.length);for(p.$$phase=null;x.length;)try{x.shift()()}catch(z){g(z)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this===p&&l.$$applicationDestroyed();r(this,-this.$$watchersCount);for(var b in this.$$listenerCount)u(this,this.$$listenerCount[b],b);a&&a.$$childHead==
this&&(a.$$childHead=this.$$nextSibling);a&&a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=v;this.$on=this.$watch=this.$watchGroup=function(){return v};this.$$listeners={};this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=this.$$watchers=
null}},$eval:function(a,b){return h(a)(this,b)},$evalAsync:function(a,b){p.$$phase||t.length||l.defer(function(){t.length&&p.$digest()});t.push({scope:this,expression:a,locals:b})},$$postDigest:function(a){x.push(a)},$apply:function(a){try{q("$apply");try{return this.$eval(a)}finally{p.$$phase=null}}catch(b){g(b)}finally{try{p.$digest()}catch(c){throw g(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&H.push(b);w()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=
c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,u(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,f=!1,h={name:a,targetScope:e,stopPropagation:function(){f=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},l=cb([h],arguments,1),k,n;do{d=e.$$listeners[a]||c;h.currentScope=e;k=0;for(n=d.length;k<n;k++)if(d[k])try{d[k].apply(null,l)}catch(q){g(q)}else d.splice(k,
1),k--,n--;if(f)return h.currentScope=null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var f=cb([e],arguments,1),h,l;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(l=d.length;h<l;h++)if(d[h])try{d[h].apply(null,f)}catch(k){g(k)}else d.splice(h,1),h--,l--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&
c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var p=new n,t=p.$$asyncQueue=[],x=p.$$postDigestQueue=[],H=p.$$applyAsyncQueue=[];return p}]}function ge(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(a){return x(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return x(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,f;f=Aa(c).href;
return""===f||f.match(e)?c:"unsafe:"+f}}}function Zf(b){if("self"===b)return b;if(I(b)){if(-1<b.indexOf("***"))throw Ca("iwcard",b);b=ud(b).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+b+"$")}if(Oa(b))return new RegExp("^"+b.source+"$");throw Ca("imatcher");}function vd(b){var a=[];x(b)&&m(b,function(b){a.push(Zf(b))});return a}function of(){this.SCE_CONTEXTS=oa;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=vd(a));return b};this.resourceUrlBlacklist=
function(b){arguments.length&&(a=vd(b));return a};this.$get=["$injector",function(c){function d(a,b){return"self"===a?gd(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var f=function(a){throw Ca("unsafe");};c.has("$sanitize")&&(f=c.get("$sanitize"));var g=e(),h={};h[oa.HTML]=
e(g);h[oa.CSS]=e(g);h[oa.URL]=e(g);h[oa.JS]=e(g);h[oa.RESOURCE_URL]=e(h[oa.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Ca("icontext",a,b);if(null===b||b===t||""===b)return b;if("string"!==typeof b)throw Ca("itype",a);return new c(b)},getTrusted:function(c,e){if(null===e||e===t||""===e)return e;var g=h.hasOwnProperty(c)?h[c]:null;if(g&&e instanceof g)return e.$$unwrapTrustedValue();if(c===oa.RESOURCE_URL){var g=Aa(e.toString()),q,r,u=!1;q=0;for(r=b.length;q<r;q++)if(d(b[q],
g)){u=!0;break}if(u)for(q=0,r=a.length;q<r;q++)if(d(a[q],g)){u=!1;break}if(u)return e;throw Ca("insecurl",e.toString());}if(c===oa.HTML)return f(e);throw Ca("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function nf(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sceDelegate",function(a,c){if(b&&8>Va)throw Ca("iequirks");var d=ia(oa);d.isEnabled=function(){return b};d.trustAs=c.trustAs;d.getTrusted=c.getTrusted;d.valueOf=
c.valueOf;b||(d.trustAs=d.getTrusted=function(a,b){return b},d.valueOf=Za);d.parseAs=function(b,c){var e=a(c);return e.literal&&e.constant?e:a(c,function(a){return d.getTrusted(b,a)})};var e=d.parseAs,f=d.getTrusted,g=d.trustAs;m(oa,function(a,b){var c=M(b);d[fb("parse_as_"+c)]=function(b){return e(a,b)};d[fb("get_trusted_"+c)]=function(b){return f(a,b)};d[fb("trust_as_"+c)]=function(b){return g(a,b)}});return d}]}function pf(){this.$get=["$window","$document",function(b,a){var c={},d=Y((/android (\d+)/.exec(M((b.navigator||
{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),f=a[0]||{},g,h=/^(Moz|webkit|ms)(?=[A-Z])/,l=f.body&&f.body.style,k=!1,n=!1;if(l){for(var q in l)if(k=h.exec(q)){g=k[0];g=g.substr(0,1).toUpperCase()+g.substr(1);break}g||(g="WebkitOpacity"in l&&"webkit");k=!!("transition"in l||g+"Transition"in l);n=!!("animation"in l||g+"Animation"in l);!d||k&&n||(k=I(l.webkitTransition),n=I(l.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hasEvent:function(a){if("input"===
a&&11>=Va)return!1;if(y(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:Fa(),vendorPrefix:g,transitions:k,animations:n,android:d}}]}function rf(){this.$get=["$templateCache","$http","$q","$sce",function(b,a,c,d){function e(f,g){e.totalPendingRequests++;I(f)&&b.get(f)||(f=d.getTrustedResourceUrl(f));var h=a.defaults&&a.defaults.transformResponse;G(h)?h=h.filter(function(a){return a!==Zb}):h===Zb&&(h=null);return a.get(f,{cache:b,transformResponse:h})["finally"](function(){e.totalPendingRequests--}).then(function(a){b.put(f,
a.data);return a.data},function(a){if(!g)throw ea("tpload",f,a.status,a.statusText);return c.reject(a)})}e.totalPendingRequests=0;return e}]}function sf(){this.$get=["$rootScope","$browser","$location",function(b,a,c){return{findBindings:function(a,b,c){a=a.getElementsByClassName("ng-binding");var g=[];m(a,function(a){var d=aa.element(a).data("$binding");d&&m(d,function(d){c?(new RegExp("(^|\\s)"+ud(b)+"(\\s|\\||$)")).test(d)&&g.push(a):-1!=d.indexOf(b)&&g.push(a)})});return g},findModels:function(a,
b,c){for(var g=["ng-","data-ng-","ng\\:"],h=0;h<g.length;++h){var l=a.querySelectorAll("["+g[h]+"model"+(c?"=":"*=")+'"'+b+'"]');if(l.length)return l}},getLocation:function(){return c.url()},setLocation:function(a){a!==c.url()&&(c.url(a),b.$digest())},whenStable:function(b){a.notifyWhenNoOutstandingRequests(b)}}}]}function tf(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(b,a,c,d,e){function f(f,l,k){C(f)||(k=l,l=f,f=v);var n=xa.call(arguments,3),q=x(k)&&!k,r=(q?d:c).defer(),
u=r.promise,m;m=a.defer(function(){try{r.resolve(f.apply(null,n))}catch(a){r.reject(a),e(a)}finally{delete g[u.$$timeoutId]}q||b.$apply()},l);u.$$timeoutId=m;g[m]=r;return u}var g={};f.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return f}]}function Aa(b){Va&&(Z.setAttribute("href",b),b=Z.href);Z.setAttribute("href",b);return{href:Z.href,protocol:Z.protocol?Z.protocol.replace(/:$/,""):"",host:Z.host,
search:Z.search?Z.search.replace(/^\?/,""):"",hash:Z.hash?Z.hash.replace(/^#/,""):"",hostname:Z.hostname,port:Z.port,pathname:"/"===Z.pathname.charAt(0)?Z.pathname:"/"+Z.pathname}}function gd(b){b=I(b)?Aa(b):b;return b.protocol===wd.protocol&&b.host===wd.host}function uf(){this.$get=qa(O)}function xd(b){function a(a){try{return decodeURIComponent(a)}catch(b){return a}}var c=b[0]||{},d={},e="";return function(){var b,g,h,l,k;b=c.cookie||"";if(b!==e)for(e=b,b=e.split("; "),d={},h=0;h<b.length;h++)g=
b[h],l=g.indexOf("="),0<l&&(k=a(g.substring(0,l)),d[k]===t&&(d[k]=a(g.substring(l+1))));return d}}function yf(){this.$get=xd}function Jc(b){function a(c,d){if(D(c)){var e={};m(c,function(b,c){e[c]=a(c,b)});return e}return b.factory(c+"Filter",d)}this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];a("currency",yd);a("date",zd);a("filter",$f);a("json",ag);a("limitTo",bg);a("lowercase",cg);a("number",Ad);a("orderBy",Bd);a("uppercase",dg)}function $f(){return function(b,
a,c){if(!Da(b)){if(null==b)return b;throw L("filter")("notarray",b);}var d;switch(gc(a)){case "function":break;case "boolean":case "null":case "number":case "string":d=!0;case "object":a=eg(a,c,d);break;default:return b}return Array.prototype.filter.call(b,a)}}function eg(b,a,c){var d=D(b)&&"$"in b;!0===a?a=ka:C(a)||(a=function(a,b){if(y(a))return!1;if(null===a||null===b)return a===b;if(D(b)||D(a)&&!pc(a))return!1;a=M(""+a);b=M(""+b);return-1!==a.indexOf(b)});return function(e){return d&&!D(e)?La(e,
b.$,a,!1):La(e,b,a,c)}}function La(b,a,c,d,e){var f=gc(b),g=gc(a);if("string"===g&&"!"===a.charAt(0))return!La(b,a.substring(1),c,d);if(G(b))return b.some(function(b){return La(b,a,c,d)});switch(f){case "object":var h;if(d){for(h in b)if("$"!==h.charAt(0)&&La(b[h],a,c,!0))return!0;return e?!1:La(b,a,c,!1)}if("object"===g){for(h in a)if(e=a[h],!C(e)&&!y(e)&&(f="$"===h,!La(f?b:b[h],e,c,f,f)))return!1;return!0}return c(b,a);case "function":return!1;default:return c(b,a)}}function gc(b){return null===
b?"null":typeof b}function yd(b){var a=b.NUMBER_FORMATS;return function(b,d,e){y(d)&&(d=a.CURRENCY_SYM);y(e)&&(e=a.PATTERNS[1].maxFrac);return null==b?b:Cd(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,e).replace(/\u00A4/g,d)}}function Ad(b){var a=b.NUMBER_FORMATS;return function(b,d){return null==b?b:Cd(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function Cd(b,a,c,d,e){if(D(b))return"";var f=0>b;b=Math.abs(b);var g=Infinity===b;if(!g&&!isFinite(b))return"";var h=b+"",l="",k=!1,n=[];g&&(l="\u221e");
if(!g&&-1!==h.indexOf("e")){var q=h.match(/([\d\.]+)e(-?)(\d+)/);q&&"-"==q[2]&&q[3]>e+1?b=0:(l=h,k=!0)}if(g||k)0<e&&1>b&&(l=b.toFixed(e),b=parseFloat(l));else{g=(h.split(Dd)[1]||"").length;y(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);var g=(""+b).split(Dd),h=g[0],g=g[1]||"",q=0,r=a.lgSize,u=a.gSize;if(h.length>=r+u)for(q=h.length-r,k=0;k<q;k++)0===(q-k)%u&&0!==k&&(l+=c),l+=h.charAt(k);for(k=q;k<h.length;k++)0===(h.length-k)%r&&0!==k&&
(l+=c),l+=h.charAt(k);for(;g.length<e;)g+="0";e&&"0"!==e&&(l+=d+g.substr(0,e))}0===b&&(f=!1);n.push(f?a.negPre:a.posPre,l,f?a.negSuf:a.posSuf);return n.join("")}function Gb(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function $(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Gb(e,a,d)}}function Hb(b,a){return function(c,d){var e=c["get"+b](),f=rb(a?"SHORT"+b:b);return d[f][e]}}function Ed(b){var a=
(new Date(b,0,1)).getDay();return new Date(b,0,(4>=a?5:12)-a)}function Fd(b){return function(a){var c=Ed(a.getFullYear());a=+new Date(a.getFullYear(),a.getMonth(),a.getDate()+(4-a.getDay()))-+c;a=1+Math.round(a/6048E5);return Gb(a,b)}}function hc(b,a){return 0>=b.getFullYear()?a.ERAS[0]:a.ERAS[1]}function zd(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,l=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=Y(b[9]+b[10]),g=Y(b[9]+b[11]));h.call(a,Y(b[1]),
Y(b[2])-1,Y(b[3]));f=Y(b[4]||0)-f;g=Y(b[5]||0)-g;h=Y(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));l.call(a,f,g,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e,f){var g="",h=[],l,k;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;I(c)&&(c=fg.test(c)?Y(c):a(c));X(c)&&(c=new Date(c));if(!ca(c)||!isFinite(c.getTime()))return c;for(;e;)(k=gg.exec(e))?(h=cb(h,k,1),e=h.pop()):(h.push(e),e=null);var n=c.getTimezoneOffset();
f&&(n=vc(f,c.getTimezoneOffset()),c=Ob(c,f,!0));m(h,function(a){l=hg[a];g+=l?l(c,b.DATETIME_FORMATS,n):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function ag(){return function(b,a){y(a)&&(a=2);return db(b,a)}}function bg(){return function(b,a,c){a=Infinity===Math.abs(Number(a))?Number(a):Y(a);if(isNaN(a))return b;X(b)&&(b=b.toString());if(!G(b)&&!I(b))return b;c=!c||isNaN(c)?0:Y(c);c=0>c&&c>=-b.length?b.length+c:c;return 0<=a?b.slice(c,c+a):0===c?b.slice(a,b.length):b.slice(Math.max(0,
c+a),c)}}function Bd(b){function a(a,c){c=c?-1:1;return a.map(function(a){var d=1,h=Za;if(C(a))h=a;else if(I(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))d="-"==a.charAt(0)?-1:1,a=a.substring(1);if(""!==a&&(h=b(a),h.constant))var l=h(),h=function(a){return a[l]}}return{get:h,descending:d*c}})}function c(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}return function(b,e,f){if(!Da(b))return b;G(e)||(e=[e]);0===e.length&&(e=["+"]);var g=a(e,f);g.push({get:function(){return{}},
descending:f?-1:1});b=Array.prototype.map.call(b,function(a,b){return{value:a,predicateValues:g.map(function(d){var e=d.get(a);d=typeof e;if(null===e)d="string",e="null";else if("string"===d)e=e.toLowerCase();else if("object"===d)a:{if("function"===typeof e.valueOf&&(e=e.valueOf(),c(e)))break a;if(pc(e)&&(e=e.toString(),c(e)))break a;e=b}return{value:e,type:d}})}});b.sort(function(a,b){for(var c=0,d=0,e=g.length;d<e;++d){var c=a.predicateValues[d],f=b.predicateValues[d],u=0;c.type===f.type?c.value!==
f.value&&(u=c.value<f.value?-1:1):u=c.type<f.type?-1:1;if(c=u*g[d].descending)break}return c});return b=b.map(function(a){return a.value})}}function Ma(b){C(b)&&(b={link:b});b.restrict=b.restrict||"AC";return qa(b)}function Gd(b,a,c,d,e){var f=this,g=[],h=f.$$parentForm=b.parent().controller("form")||Ib;f.$error={};f.$$success={};f.$pending=t;f.$name=e(a.name||a.ngForm||"")(c);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;h.$addControl(f);f.$rollbackViewValue=function(){m(g,
function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){m(g,function(a){a.$commitViewValue()})};f.$addControl=function(a){Ta(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a)};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];m(f.$pending,function(b,c){f.$setValidity(c,null,a)});m(f.$error,function(b,c){f.$setValidity(c,null,a)});m(f.$$success,function(b,c){f.$setValidity(c,null,
a)});bb(g,a)};Hd({ctrl:this,$element:b,set:function(a,b,c){var d=a[b];d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(bb(d,c),0===d.length&&delete a[b])},parentForm:h,$animate:d});f.$setDirty=function(){d.removeClass(b,Xa);d.addClass(b,Jb);f.$dirty=!0;f.$pristine=!1;h.$setDirty()};f.$setPristine=function(){d.setClass(b,Xa,Jb+" ng-submitted");f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;m(g,function(a){a.$setPristine()})};f.$setUntouched=function(){m(g,function(a){a.$setUntouched()})};
f.$setSubmitted=function(){d.addClass(b,"ng-submitted");f.$submitted=!0;h.$setSubmitted()}}function ic(b){b.$formatters.push(function(a){return b.$isEmpty(a)?a:a.toString()})}function ib(b,a,c,d,e,f){var g=M(a[0].type);if(!e.android){var h=!1;a.on("compositionstart",function(a){h=!0});a.on("compositionend",function(){h=!1;l()})}var l=function(b){k&&(f.defer.cancel(k),k=null);if(!h){var e=a.val();b=b&&b.type;"password"===g||c.ngTrim&&"false"===c.ngTrim||(e=T(e));(d.$viewValue!==e||""===e&&d.$$hasNativeValidators)&&
d.$setViewValue(e,b)}};if(e.hasEvent("input"))a.on("input",l);else{var k,n=function(a,b,c){k||(k=f.defer(function(){k=null;b&&b.value===c||l(a)}))};a.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||n(a,this,this.value)});if(e.hasEvent("paste"))a.on("paste cut",n)}a.on("change",l);d.$render=function(){var b=d.$isEmpty(d.$viewValue)?"":d.$viewValue;a.val()!==b&&a.val(b)}}function Kb(b,a){return function(c,d){var e,f;if(ca(c))return c;if(I(c)){'"'==c.charAt(0)&&'"'==c.charAt(c.length-
1)&&(c=c.substring(1,c.length-1));if(ig.test(c))return new Date(c);b.lastIndex=0;if(e=b.exec(c))return e.shift(),f=d?{yyyy:d.getFullYear(),MM:d.getMonth()+1,dd:d.getDate(),HH:d.getHours(),mm:d.getMinutes(),ss:d.getSeconds(),sss:d.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},m(e,function(b,c){c<a.length&&(f[a[c]]=+b)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function jb(b,a,c,d){return function(e,f,g,h,l,k,n){function q(a){return a&&!(a.getTime&&
a.getTime()!==a.getTime())}function r(a){return x(a)?ca(a)?a:c(a):t}Id(e,f,g,h);ib(e,f,g,h,l,k);var u=h&&h.$options&&h.$options.timezone,m;h.$$parserName=b;h.$parsers.push(function(b){return h.$isEmpty(b)?null:a.test(b)?(b=c(b,m),u&&(b=Ob(b,u)),b):t});h.$formatters.push(function(a){if(a&&!ca(a))throw kb("datefmt",a);if(q(a))return(m=a)&&u&&(m=Ob(m,u,!0)),n("date")(a,d,u);m=null;return""});if(x(g.min)||g.ngMin){var s;h.$validators.min=function(a){return!q(a)||y(s)||c(a)>=s};g.$observe("min",function(a){s=
r(a);h.$validate()})}if(x(g.max)||g.ngMax){var w;h.$validators.max=function(a){return!q(a)||y(w)||c(a)<=w};g.$observe("max",function(a){w=r(a);h.$validate()})}}}function Id(b,a,c,d){(d.$$hasNativeValidators=D(a[0].validity))&&d.$parsers.push(function(b){var c=a.prop("validity")||{};return c.badInput&&!c.typeMismatch?t:b})}function Jd(b,a,c,d,e){if(x(d)){b=b(d);if(!b.constant)throw kb("constexpr",c,d);return b(a)}return e}function jc(b,a){b="ngClass"+b;return["$animate",function(c){function d(a,b){var c=
[],d=0;a:for(;d<a.length;d++){for(var e=a[d],n=0;n<b.length;n++)if(e==b[n])continue a;c.push(e)}return c}function e(a){var b=[];return G(a)?(m(a,function(a){b=b.concat(e(a))}),b):I(a)?a.split(" "):D(a)?(m(a,function(a,c){a&&(b=b.concat(c.split(" ")))}),b):a}return{restrict:"AC",link:function(f,g,h){function l(a,b){var c=g.data("$classCounts")||ga(),d=[];m(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function k(b){if(!0===a||f.$index%
2===a){var k=e(b||[]);if(!n){var m=l(k,1);h.$addClass(m)}else if(!ka(b,n)){var s=e(n),m=d(k,s),k=d(s,k),m=l(m,1),k=l(k,-1);m&&m.length&&c.addClass(g,m);k&&k.length&&c.removeClass(g,k)}}n=ia(b)}var n;f.$watch(h[b],k,!0);h.$observe("class",function(a){k(f.$eval(h[b]))});"ngClass"!==b&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var k=e(f.$eval(h[b]));g===a?(g=l(k,1),h.$addClass(g)):(g=l(k,-1),h.$removeClass(g))}})}}}]}function Hd(b){function a(a,b){b&&!f[a]?(k.addClass(e,a),f[a]=!0):!b&&
f[a]&&(k.removeClass(e,a),f[a]=!1)}function c(b,c){b=b?"-"+zc(b,"-"):"";a(lb+b,!0===c);a(Kd+b,!1===c)}var d=b.ctrl,e=b.$element,f={},g=b.set,h=b.unset,l=b.parentForm,k=b.$animate;f[Kd]=!(f[lb]=e.hasClass(lb));d.$setValidity=function(b,e,f){e===t?(d.$pending||(d.$pending={}),g(d.$pending,b,f)):(d.$pending&&h(d.$pending,b,f),Ld(d.$pending)&&(d.$pending=t));ab(e)?e?(h(d.$error,b,f),g(d.$$success,b,f)):(g(d.$error,b,f),h(d.$$success,b,f)):(h(d.$error,b,f),h(d.$$success,b,f));d.$pending?(a(Md,!0),d.$valid=
d.$invalid=t,c("",null)):(a(Md,!1),d.$valid=Ld(d.$error),d.$invalid=!d.$valid,c("",d.$valid));e=d.$pending&&d.$pending[b]?t:d.$error[b]?!1:d.$$success[b]?!0:null;c(b,e);l.$setValidity(b,e,d)}}function Ld(b){if(b)for(var a in b)if(b.hasOwnProperty(a))return!1;return!0}var jg=/^\/(.+)\/([a-z]*)$/,M=function(b){return I(b)?b.toLowerCase():b},Na=Object.prototype.hasOwnProperty,rb=function(b){return I(b)?b.toUpperCase():b},Va,z,la,xa=[].slice,Mf=[].splice,kg=[].push,sa=Object.prototype.toString,qc=Object.getPrototypeOf,
Ea=L("ng"),aa=O.angular||(O.angular={}),Rb,mb=0;Va=W.documentMode;v.$inject=[];Za.$inject=[];var G=Array.isArray,sc=/^\[object (Uint8(Clamped)?)|(Uint16)|(Uint32)|(Int8)|(Int16)|(Int32)|(Float(32)|(64))Array\]$/,T=function(b){return I(b)?b.trim():b},ud=function(b){return b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},Fa=function(){if(!x(Fa.rules)){var b=W.querySelector("[ng-csp]")||W.querySelector("[data-ng-csp]");if(b){var a=b.getAttribute("ng-csp")||b.getAttribute("data-ng-csp");
Fa.rules={noUnsafeEval:!a||-1!==a.indexOf("no-unsafe-eval"),noInlineStyle:!a||-1!==a.indexOf("no-inline-style")}}else{b=Fa;try{new Function(""),a=!1}catch(c){a=!0}b.rules={noUnsafeEval:a,noInlineStyle:!1}}}return Fa.rules},ob=function(){if(x(ob.name_))return ob.name_;var b,a,c=Qa.length,d,e;for(a=0;a<c;++a)if(d=Qa[a],b=W.querySelector("["+d.replace(":","\\:")+"jq]")){e=b.getAttribute(d+"jq");break}return ob.name_=e},Qa=["ng-","data-ng-","ng:","x-ng-"],be=/[A-Z]/g,Ac=!1,Qb,pa=1,Pa=3,fe={full:"1.4.4",
major:1,minor:4,dot:4,codeName:"pylon-requirement"};R.expando="ng339";var gb=R.cache={},Ef=1;R._data=function(b){return this.cache[b[this.expando]]||{}};var zf=/([\:\-\_]+(.))/g,Af=/^moz([A-Z])/,lg={mouseleave:"mouseout",mouseenter:"mouseover"},Tb=L("jqLite"),Df=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Sb=/<|&#?\w+;/,Bf=/<([\w:]+)/,Cf=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,na={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>",
"</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};na.optgroup=na.option;na.tbody=na.tfoot=na.colgroup=na.caption=na.thead;na.th=na.td;var Ra=R.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===W.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),R(O).on("load",a))},toString:function(){var b=[];m(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=
b?z(this[b]):z(this[this.length+b])},length:0,push:kg,sort:[].sort,splice:[].splice},Ab={};m("multiple selected checked disabled readOnly required open".split(" "),function(b){Ab[M(b)]=b});var Rc={};m("input select option textarea button form details".split(" "),function(b){Rc[b]=!0});var Sc={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};m({data:Vb,removeData:ub,hasData:function(b){for(var a in gb[b.ng339])return!0;return!1}},function(b,a){R[a]=b});m({data:Vb,
inheritedData:zb,scope:function(b){return z.data(b,"$scope")||zb(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return z.data(b,"$isolateScope")||z.data(b,"$isolateScopeNoTemplate")},controller:Oc,injector:function(b){return zb(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:wb,css:function(b,a,c){a=fb(a);if(x(c))b.style[a]=c;else return b.style[a]},attr:function(b,a,c){var d=b.nodeType;if(d!==Pa&&2!==d&&8!==d)if(d=M(a),Ab[d])if(x(c))c?(b[a]=!0,b.setAttribute(a,
d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||v).specified?d:t;else if(x(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?t:b},prop:function(b,a,c){if(x(c))b[a]=c;else return b[a]},text:function(){function b(a,b){if(y(b)){var d=a.nodeType;return d===pa||d===Pa?a.textContent:""}a.textContent=b}b.$dv="";return b}(),val:function(b,a){if(y(a)){if(b.multiple&&"select"===ta(b)){var c=[];m(b.options,function(a){a.selected&&c.push(a.value||
a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(y(a))return b.innerHTML;tb(b,!0);b.innerHTML=a},empty:Pc},function(b,a){R.prototype[a]=function(a,d){var e,f,g=this.length;if(b!==Pc&&(2==b.length&&b!==wb&&b!==Oc?a:d)===t){if(D(a)){for(e=0;e<g;e++)if(b===Vb)b(this[e],a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;g=e===t?Math.min(g,1):g;for(f=0;f<g;f++){var h=b(this[f],a,d);e=e?e+h:h}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});m({removeData:ub,
on:function a(c,d,e,f){if(x(f))throw Tb("onargs");if(Kc(c)){var g=vb(c,!0);f=g.events;var h=g.handle;h||(h=g.handle=Hf(c,f));for(var g=0<=d.indexOf(" ")?d.split(" "):[d],l=g.length;l--;){d=g[l];var k=f[d];k||(f[d]=[],"mouseenter"===d||"mouseleave"===d?a(c,lg[d],function(a){var c=a.relatedTarget;c&&(c===this||this.contains(c))||h(a,d)}):"$destroy"!==d&&c.addEventListener(d,h,!1),k=f[d]);k.push(e)}}},off:Nc,one:function(a,c,d){a=z(a);a.on(c,function f(){a.off(c,d);a.off(c,f)});a.on(c,d)},replaceWith:function(a,
c){var d,e=a.parentNode;tb(a);m(new R(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];m(a.childNodes,function(a){a.nodeType===pa&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){var d=a.nodeType;if(d===pa||11===d){c=new R(c);for(var d=0,e=c.length;d<e;d++)a.appendChild(c[d])}},prepend:function(a,c){if(a.nodeType===pa){var d=a.firstChild;m(new R(c),function(c){a.insertBefore(c,d)})}},
wrap:function(a,c){c=z(c).eq(0).clone()[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:Wb,detach:function(a){Wb(a,!0)},after:function(a,c){var d=a,e=a.parentNode;c=new R(c);for(var f=0,g=c.length;f<g;f++){var h=c[f];e.insertBefore(h,d.nextSibling);d=h}},addClass:yb,removeClass:xb,toggleClass:function(a,c,d){c&&m(c.split(" "),function(c){var f=d;y(f)&&(f=!wb(a,c));(f?yb:xb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},
find:function(a,c){return a.getElementsByTagName?a.getElementsByTagName(c):[]},clone:Ub,triggerHandler:function(a,c,d){var e,f,g=c.type||c,h=vb(a);if(h=(h=h&&h.events)&&h[g])e={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:v,type:g,target:a},c.type&&(e=Q(e,
c)),c=ia(h),f=d?[e].concat(d):[e],m(c,function(c){e.isImmediatePropagationStopped()||c.apply(a,f)})}},function(a,c){R.prototype[c]=function(c,e,f){for(var g,h=0,l=this.length;h<l;h++)y(g)?(g=a(this[h],c,e,f),x(g)&&(g=z(g))):Mc(g,a(this[h],c,e,f));return x(g)?g:this};R.prototype.bind=R.prototype.on;R.prototype.unbind=R.prototype.off});Ua.prototype={put:function(a,c){this[Ga(a,this.nextUid)]=c},get:function(a){return this[Ga(a,this.nextUid)]},remove:function(a){var c=this[a=Ga(a,this.nextUid)];delete this[a];
return c}};var xf=[function(){this.$get=[function(){return Ua}]}],Uc=/^[^\(]*\(\s*([^\)]*)\)/m,mg=/,/,ng=/^\s*(_?)(\S+?)\1\s*$/,Tc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ha=L("$injector");eb.$$annotate=function(a,c,d){var e;if("function"===typeof a){if(!(e=a.$inject)){e=[];if(a.length){if(c)throw I(d)&&d||(d=a.name||If(a)),Ha("strictdi",d);c=a.toString().replace(Tc,"");c=c.match(Uc);m(c[1].split(mg),function(a){a.replace(ng,function(a,c,d){e.push(d)})})}a.$inject=e}}else G(a)?(c=a.length-1,Sa(a[c],"fn"),
e=a.slice(0,c)):Sa(a,"fn",!0);return e};var Nd=L("$animate"),Ue=function(){this.$get=["$q","$$rAF",function(a,c){function d(){}d.all=v;d.chain=v;d.prototype={end:v,cancel:v,resume:v,pause:v,complete:v,then:function(d,f){return a(function(a){c(function(){a()})}).then(d,f)}};return d}]},Te=function(){var a=new Ua,c=[];this.$get=["$$AnimateRunner","$rootScope",function(d,e){function f(d,f,l){var k=a.get(d);k||(a.put(d,k={}),c.push(d));d=function(a,c){var d=!1;a&&(a=I(a)?a.split(" "):G(a)?a:[],m(a,function(a){a&&
(d=!0,k[a]=c)}));return d};f=d(f,!0);l=d(l,!1);!f&&!l||1<c.length||e.$$postDigest(function(){m(c,function(c){var d=a.get(c);if(d){var e=Jf(c.attr("class")),f="",g="";m(d,function(a,c){a!==!!e[c]&&(a?f+=(f.length?" ":"")+c:g+=(g.length?" ":"")+c)});m(c,function(a){f&&yb(a,f);g&&xb(a,g)});a.remove(c)}});c.length=0})}return{enabled:v,on:v,off:v,pin:v,push:function(a,c,e,k){k&&k();e=e||{};e.from&&a.css(e.from);e.to&&a.css(e.to);(e.addClass||e.removeClass)&&f(a,e.addClass,e.removeClass);return new d}}}]},
Re=["$provide",function(a){var c=this;this.$$registeredAnimations=Object.create(null);this.register=function(d,e){if(d&&"."!==d.charAt(0))throw Nd("notcsel",d);var f=d+"-animation";c.$$registeredAnimations[d.substr(1)]=f;a.factory(f,e)};this.classNameFilter=function(a){if(1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null)&&/(\s+|\/)ng-animate(\s+|\/)/.test(this.$$classNameFilter.toString()))throw Nd("nongcls","ng-animate");return this.$$classNameFilter};this.$get=["$$animateQueue",
function(a){function c(a,d,e){if(e){var l;a:{for(l=0;l<e.length;l++){var k=e[l];if(1===k.nodeType){l=k;break a}}l=void 0}!l||l.parentNode||l.previousElementSibling||(e=null)}e?e.after(a):d.prepend(a)}return{on:a.on,off:a.off,pin:a.pin,enabled:a.enabled,cancel:function(a){a.end&&a.end()},enter:function(f,g,h,l){g=g&&z(g);h=h&&z(h);g=g||h.parent();c(f,g,h);return a.push(f,"enter",Ia(l))},move:function(f,g,h,l){g=g&&z(g);h=h&&z(h);g=g||h.parent();c(f,g,h);return a.push(f,"move",Ia(l))},leave:function(c,
e){return a.push(c,"leave",Ia(e),function(){c.remove()})},addClass:function(c,e,h){h=Ia(h);h.addClass=hb(h.addclass,e);return a.push(c,"addClass",h)},removeClass:function(c,e,h){h=Ia(h);h.removeClass=hb(h.removeClass,e);return a.push(c,"removeClass",h)},setClass:function(c,e,h,l){l=Ia(l);l.addClass=hb(l.addClass,e);l.removeClass=hb(l.removeClass,h);return a.push(c,"setClass",l)},animate:function(c,e,h,l,k){k=Ia(k);k.from=k.from?Q(k.from,e):e;k.to=k.to?Q(k.to,h):h;k.tempClasses=hb(k.tempClasses,l||
"ng-inline-animate");return a.push(c,"animate",k)}}}]}],Se=function(){this.$get=["$$rAF","$q",function(a,c){var d=function(){};d.prototype={done:function(a){this.defer&&this.defer[!0===a?"reject":"resolve"]()},end:function(){this.done()},cancel:function(){this.done(!0)},getPromise:function(){this.defer||(this.defer=c.defer());return this.defer.promise},then:function(a,c){return this.getPromise().then(a,c)},"catch":function(a){return this.getPromise().catch(a)},"finally":function(a){return this.getPromise().finally(a)}};
return function(c,f){function g(){a(function(){f.addClass&&(c.addClass(f.addClass),f.addClass=null);f.removeClass&&(c.removeClass(f.removeClass),f.removeClass=null);f.to&&(c.css(f.to),f.to=null);h||l.done();h=!0});return l}f.from&&(c.css(f.from),f.from=null);var h,l=new d;return{start:g,end:g}}}]},ea=L("$compile");Cc.$inject=["$provide","$$sanitizeUriProvider"];var Xc=/^((?:x|data)[\:\-_])/i,Nf=L("$controller"),Vc=/^(\S+)(\s+as\s+(\w+))?$/,$e=function(){this.$get=["$document",function(a){return function(c){c?
!c.nodeType&&c instanceof z&&(c=c[0]):c=a[0].body;return c.offsetWidth+1}}]},bd="application/json",$b={"Content-Type":bd+";charset=utf-8"},Pf=/^\[|^\{(?!\{)/,Qf={"[":/]$/,"{":/}$/},Of=/^\)\]\}',?\n/,og=L("$http"),fd=function(a){return function(){throw og("legacy",a);}},Ka=aa.$interpolateMinErr=L("$interpolate");Ka.throwNoconcat=function(a){throw Ka("noconcat",a);};Ka.interr=function(a,c){return Ka("interr",a,c.toString())};var pg=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,Tf={http:80,https:443,ftp:21},Db=
L("$location"),qg={$$html5:!1,$$replace:!1,absUrl:Eb("$$absUrl"),url:function(a){if(y(a))return this.$$url;var c=pg.exec(a);(c[1]||""===a)&&this.path(decodeURIComponent(c[1]));(c[2]||c[1]||""===a)&&this.search(c[3]||"");this.hash(c[5]||"");return this},protocol:Eb("$$protocol"),host:Eb("$$host"),port:Eb("$$port"),path:kd("$$path",function(a){a=null!==a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(I(a)||X(a))a=
a.toString(),this.$$search=xc(a);else if(D(a))a=fa(a,{}),m(a,function(c,e){null==c&&delete a[e]}),this.$$search=a;else throw Db("isrcharg");break;default:y(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:kd("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};m([jd,cc,bc],function(a){a.prototype=Object.create(qg);a.prototype.state=function(c){if(!arguments.length)return this.$$state;if(a!==bc||!this.$$html5)throw Db("nostate");
this.$$state=y(c)?null:c;return this}});var da=L("$parse"),Uf=Function.prototype.call,Vf=Function.prototype.apply,Wf=Function.prototype.bind,Lb=ga();m("+ - * / % === !== == != < > <= >= && || ! = |".split(" "),function(a){Lb[a]=!0});var rg={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},ec=function(a){this.options=a};ec.prototype={constructor:ec,lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);
else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(a))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var c=a+this.peek(),d=c+this.peek(2),e=Lb[c],f=Lb[d];Lb[a]||e||f?(a=f?d:e?c:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},
is:function(a,c){return-1!==c.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=x(c)?"s "+c+"-"+
this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw da("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=M(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:c,
text:a,constant:!0,value:Number(a)})},readIdent:function(){for(var a=this.index;this.index<this.text.length;){var c=this.text.charAt(this.index);if(!this.isIdent(c)&&!this.isNumber(c))break;this.index++}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,f=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),e=e+g;if(f)"u"===g?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||
this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d+=rg[g]||g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,constant:!0,value:d});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var s=function(a,c){this.lexer=a;this.options=c};s.Program="Program";s.ExpressionStatement="ExpressionStatement";s.AssignmentExpression="AssignmentExpression";s.ConditionalExpression="ConditionalExpression";
s.LogicalExpression="LogicalExpression";s.BinaryExpression="BinaryExpression";s.UnaryExpression="UnaryExpression";s.CallExpression="CallExpression";s.MemberExpression="MemberExpression";s.Identifier="Identifier";s.Literal="Literal";s.ArrayExpression="ArrayExpression";s.Property="Property";s.ObjectExpression="ObjectExpression";s.ThisExpression="ThisExpression";s.NGValueParameter="NGValueParameter";s.prototype={ast:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.program();0!==this.tokens.length&&
this.throwError("is an unexpected token",this.tokens[0]);return a},program:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.expressionStatement()),!this.expect(";"))return{type:s.Program,body:a}},expressionStatement:function(){return{type:s.ExpressionStatement,expression:this.filterChain()}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},expression:function(){return this.assignment()},assignment:function(){var a=
this.ternary();this.expect("=")&&(a={type:s.AssignmentExpression,left:a,right:this.assignment(),operator:"="});return a},ternary:function(){var a=this.logicalOR(),c,d;return this.expect("?")&&(c=this.expression(),this.consume(":"))?(d=this.expression(),{type:s.ConditionalExpression,test:a,alternate:c,consequent:d}):a},logicalOR:function(){for(var a=this.logicalAND();this.expect("||");)a={type:s.LogicalExpression,operator:"||",left:a,right:this.logicalAND()};return a},logicalAND:function(){for(var a=
this.equality();this.expect("&&");)a={type:s.LogicalExpression,operator:"&&",left:a,right:this.equality()};return a},equality:function(){for(var a=this.relational(),c;c=this.expect("==","!=","===","!==");)a={type:s.BinaryExpression,operator:c.text,left:a,right:this.relational()};return a},relational:function(){for(var a=this.additive(),c;c=this.expect("<",">","<=",">=");)a={type:s.BinaryExpression,operator:c.text,left:a,right:this.additive()};return a},additive:function(){for(var a=this.multiplicative(),
c;c=this.expect("+","-");)a={type:s.BinaryExpression,operator:c.text,left:a,right:this.multiplicative()};return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a={type:s.BinaryExpression,operator:c.text,left:a,right:this.unary()};return a},unary:function(){var a;return(a=this.expect("+","-","!"))?{type:s.UnaryExpression,operator:a.text,prefix:!0,argument:this.unary()}:this.primary()},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):
this.expect("[")?a=this.arrayDeclaration():this.expect("{")?a=this.object():this.constants.hasOwnProperty(this.peek().text)?a=fa(this.constants[this.consume().text]):this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",this.peek());for(var c;c=this.expect("(","[",".");)"("===c.text?(a={type:s.CallExpression,callee:a,arguments:this.parseArguments()},this.consume(")")):"["===c.text?(a={type:s.MemberExpression,object:a,property:this.expression(),
computed:!0},this.consume("]")):"."===c.text?a={type:s.MemberExpression,object:a,property:this.identifier(),computed:!1}:this.throwError("IMPOSSIBLE");return a},filter:function(a){a=[a];for(var c={type:s.CallExpression,callee:this.identifier(),arguments:a,filter:!0};this.expect(":");)a.push(this.expression());return c},parseArguments:function(){var a=[];if(")"!==this.peekToken().text){do a.push(this.expression());while(this.expect(","))}return a},identifier:function(){var a=this.consume();a.identifier||
this.throwError("is not a valid identifier",a);return{type:s.Identifier,name:a.text}},constant:function(){return{type:s.Literal,value:this.consume().value}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))}this.consume("]");return{type:s.ArrayExpression,elements:a}},object:function(){var a=[],c;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;c={type:s.Property,kind:"init"};this.peek().constant?
c.key=this.constant():this.peek().identifier?c.key=this.identifier():this.throwError("invalid key",this.peek());this.consume(":");c.value=this.expression();a.push(c)}while(this.expect(","))}this.consume("}");return{type:s.ObjectExpression,properties:a}},throwError:function(a,c){throw da("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},consume:function(a){if(0===this.tokens.length)throw da("ueoe",this.text);var c=this.expect(a);c||this.throwError("is unexpected, expecting ["+a+
"]",this.peek());return c},peekToken:function(){if(0===this.tokens.length)throw da("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){return this.peekAhead(0,a,c,d,e)},peekAhead:function(a,c,d,e,f){if(this.tokens.length>a){a=this.tokens[a];var g=a.text;if(g===c||g===d||g===e||g===f||!(c||d||e||f))return a}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.tokens.shift(),a):!1},constants:{"true":{type:s.Literal,value:!0},"false":{type:s.Literal,value:!1},"null":{type:s.Literal,
value:null},undefined:{type:s.Literal,value:t},"this":{type:s.ThisExpression}}};rd.prototype={compile:function(a,c){var d=this,e=this.astBuilder.ast(a);this.state={nextId:0,filters:{},expensiveChecks:c,fn:{vars:[],body:[],own:{}},assign:{vars:[],body:[],own:{}},inputs:[]};U(e,d.$filter);var f="",g;this.stage="assign";if(g=pd(e))this.state.computing="assign",f=this.nextId(),this.recurse(g,f),f="fn.assign="+this.generateFunction("assign","s,v,l");g=nd(e.body);d.stage="inputs";m(g,function(a,c){var e=
"fn"+c;d.state[e]={vars:[],body:[],own:{}};d.state.computing=e;var f=d.nextId();d.recurse(a,f);d.return_(f);d.state.inputs.push(e);a.watchId=c});this.state.computing="fn";this.stage="main";this.recurse(e);f='"'+this.USE+" "+this.STRICT+'";\n'+this.filterPrefix()+"var fn="+this.generateFunction("fn","s,l,a,i")+f+this.watchFns()+"return fn;";f=(new Function("$filter","ensureSafeMemberName","ensureSafeObject","ensureSafeFunction","ifDefined","plus","text",f))(this.$filter,Wa,Ba,ld,Xf,md,a);this.state=
this.stage=t;f.literal=qd(e);f.constant=e.constant;return f},USE:"use",STRICT:"strict",watchFns:function(){var a=[],c=this.state.inputs,d=this;m(c,function(c){a.push("var "+c+"="+d.generateFunction(c,"s"))});c.length&&a.push("fn.inputs=["+c.join(",")+"];");return a.join("")},generateFunction:function(a,c){return"function("+c+"){"+this.varsPrefix(a)+this.body(a)+"};"},filterPrefix:function(){var a=[],c=this;m(this.state.filters,function(d,e){a.push(d+"=$filter("+c.escape(e)+")")});return a.length?
"var "+a.join(",")+";":""},varsPrefix:function(a){return this.state[a].vars.length?"var "+this.state[a].vars.join(",")+";":""},body:function(a){return this.state[a].body.join("")},recurse:function(a,c,d,e,f,g){var h,l,k=this,n,q;e=e||v;if(!g&&x(a.watchId))c=c||this.nextId(),this.if_("i",this.lazyAssign(c,this.computedMember("i",a.watchId)),this.lazyRecurse(a,c,d,e,f,!0));else switch(a.type){case s.Program:m(a.body,function(c,d){k.recurse(c.expression,t,t,function(a){l=a});d!==a.body.length-1?k.current().body.push(l,
";"):k.return_(l)});break;case s.Literal:q=this.escape(a.value);this.assign(c,q);e(q);break;case s.UnaryExpression:this.recurse(a.argument,t,t,function(a){l=a});q=a.operator+"("+this.ifDefined(l,0)+")";this.assign(c,q);e(q);break;case s.BinaryExpression:this.recurse(a.left,t,t,function(a){h=a});this.recurse(a.right,t,t,function(a){l=a});q="+"===a.operator?this.plus(h,l):"-"===a.operator?this.ifDefined(h,0)+a.operator+this.ifDefined(l,0):"("+h+")"+a.operator+"("+l+")";this.assign(c,q);e(q);break;case s.LogicalExpression:c=
c||this.nextId();k.recurse(a.left,c);k.if_("&&"===a.operator?c:k.not(c),k.lazyRecurse(a.right,c));e(c);break;case s.ConditionalExpression:c=c||this.nextId();k.recurse(a.test,c);k.if_(c,k.lazyRecurse(a.alternate,c),k.lazyRecurse(a.consequent,c));e(c);break;case s.Identifier:c=c||this.nextId();d&&(d.context="inputs"===k.stage?"s":this.assign(this.nextId(),this.getHasOwnProperty("l",a.name)+"?l:s"),d.computed=!1,d.name=a.name);Wa(a.name);k.if_("inputs"===k.stage||k.not(k.getHasOwnProperty("l",a.name)),
function(){k.if_("inputs"===k.stage||"s",function(){f&&1!==f&&k.if_(k.not(k.nonComputedMember("s",a.name)),k.lazyAssign(k.nonComputedMember("s",a.name),"{}"));k.assign(c,k.nonComputedMember("s",a.name))})},c&&k.lazyAssign(c,k.nonComputedMember("l",a.name)));(k.state.expensiveChecks||Fb(a.name))&&k.addEnsureSafeObject(c);e(c);break;case s.MemberExpression:h=d&&(d.context=this.nextId())||this.nextId();c=c||this.nextId();k.recurse(a.object,h,t,function(){k.if_(k.notNull(h),function(){if(a.computed)l=
k.nextId(),k.recurse(a.property,l),k.addEnsureSafeMemberName(l),f&&1!==f&&k.if_(k.not(k.computedMember(h,l)),k.lazyAssign(k.computedMember(h,l),"{}")),q=k.ensureSafeObject(k.computedMember(h,l)),k.assign(c,q),d&&(d.computed=!0,d.name=l);else{Wa(a.property.name);f&&1!==f&&k.if_(k.not(k.nonComputedMember(h,a.property.name)),k.lazyAssign(k.nonComputedMember(h,a.property.name),"{}"));q=k.nonComputedMember(h,a.property.name);if(k.state.expensiveChecks||Fb(a.property.name))q=k.ensureSafeObject(q);k.assign(c,
q);d&&(d.computed=!1,d.name=a.property.name)}},function(){k.assign(c,"undefined")});e(c)},!!f);break;case s.CallExpression:c=c||this.nextId();a.filter?(l=k.filter(a.callee.name),n=[],m(a.arguments,function(a){var c=k.nextId();k.recurse(a,c);n.push(c)}),q=l+"("+n.join(",")+")",k.assign(c,q),e(c)):(l=k.nextId(),h={},n=[],k.recurse(a.callee,l,h,function(){k.if_(k.notNull(l),function(){k.addEnsureSafeFunction(l);m(a.arguments,function(a){k.recurse(a,k.nextId(),t,function(a){n.push(k.ensureSafeObject(a))})});
h.name?(k.state.expensiveChecks||k.addEnsureSafeObject(h.context),q=k.member(h.context,h.name,h.computed)+"("+n.join(",")+")"):q=l+"("+n.join(",")+")";q=k.ensureSafeObject(q);k.assign(c,q)},function(){k.assign(c,"undefined")});e(c)}));break;case s.AssignmentExpression:l=this.nextId();h={};if(!od(a.left))throw da("lval");this.recurse(a.left,t,h,function(){k.if_(k.notNull(h.context),function(){k.recurse(a.right,l);k.addEnsureSafeObject(k.member(h.context,h.name,h.computed));q=k.member(h.context,h.name,
h.computed)+a.operator+l;k.assign(c,q);e(c||q)})},1);break;case s.ArrayExpression:n=[];m(a.elements,function(a){k.recurse(a,k.nextId(),t,function(a){n.push(a)})});q="["+n.join(",")+"]";this.assign(c,q);e(q);break;case s.ObjectExpression:n=[];m(a.properties,function(a){k.recurse(a.value,k.nextId(),t,function(c){n.push(k.escape(a.key.type===s.Identifier?a.key.name:""+a.key.value)+":"+c)})});q="{"+n.join(",")+"}";this.assign(c,q);e(q);break;case s.ThisExpression:this.assign(c,"s");e("s");break;case s.NGValueParameter:this.assign(c,
"v"),e("v")}},getHasOwnProperty:function(a,c){var d=a+"."+c,e=this.current().own;e.hasOwnProperty(d)||(e[d]=this.nextId(!1,a+"&&("+this.escape(c)+" in "+a+")"));return e[d]},assign:function(a,c){if(a)return this.current().body.push(a,"=",c,";"),a},filter:function(a){this.state.filters.hasOwnProperty(a)||(this.state.filters[a]=this.nextId(!0));return this.state.filters[a]},ifDefined:function(a,c){return"ifDefined("+a+","+this.escape(c)+")"},plus:function(a,c){return"plus("+a+","+c+")"},return_:function(a){this.current().body.push("return ",
a,";")},if_:function(a,c,d){if(!0===a)c();else{var e=this.current().body;e.push("if(",a,"){");c();e.push("}");d&&(e.push("else{"),d(),e.push("}"))}},not:function(a){return"!("+a+")"},notNull:function(a){return a+"!=null"},nonComputedMember:function(a,c){return a+"."+c},computedMember:function(a,c){return a+"["+c+"]"},member:function(a,c,d){return d?this.computedMember(a,c):this.nonComputedMember(a,c)},addEnsureSafeObject:function(a){this.current().body.push(this.ensureSafeObject(a),";")},addEnsureSafeMemberName:function(a){this.current().body.push(this.ensureSafeMemberName(a),
";")},addEnsureSafeFunction:function(a){this.current().body.push(this.ensureSafeFunction(a),";")},ensureSafeObject:function(a){return"ensureSafeObject("+a+",text)"},ensureSafeMemberName:function(a){return"ensureSafeMemberName("+a+",text)"},ensureSafeFunction:function(a){return"ensureSafeFunction("+a+",text)"},lazyRecurse:function(a,c,d,e,f,g){var h=this;return function(){h.recurse(a,c,d,e,f,g)}},lazyAssign:function(a,c){var d=this;return function(){d.assign(a,c)}},stringEscapeRegex:/[^ a-zA-Z0-9]/g,
stringEscapeFn:function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)},escape:function(a){if(I(a))return"'"+a.replace(this.stringEscapeRegex,this.stringEscapeFn)+"'";if(X(a))return a.toString();if(!0===a)return"true";if(!1===a)return"false";if(null===a)return"null";if("undefined"===typeof a)return"undefined";throw da("esc");},nextId:function(a,c){var d="v"+this.state.nextId++;a||this.current().vars.push(d+(c?"="+c:""));return d},current:function(){return this.state[this.state.computing]}};
sd.prototype={compile:function(a,c){var d=this,e=this.astBuilder.ast(a);this.expression=a;this.expensiveChecks=c;U(e,d.$filter);var f,g;if(f=pd(e))g=this.recurse(f);f=nd(e.body);var h;f&&(h=[],m(f,function(a,c){var e=d.recurse(a);a.input=e;h.push(e);a.watchId=c}));var l=[];m(e.body,function(a){l.push(d.recurse(a.expression))});f=0===e.body.length?function(){}:1===e.body.length?l[0]:function(a,c){var d;m(l,function(e){d=e(a,c)});return d};g&&(f.assign=function(a,c,d){return g(a,d,c)});h&&(f.inputs=
h);f.literal=qd(e);f.constant=e.constant;return f},recurse:function(a,c,d){var e,f,g=this,h;if(a.input)return this.inputs(a.input,a.watchId);switch(a.type){case s.Literal:return this.value(a.value,c);case s.UnaryExpression:return f=this.recurse(a.argument),this["unary"+a.operator](f,c);case s.BinaryExpression:return e=this.recurse(a.left),f=this.recurse(a.right),this["binary"+a.operator](e,f,c);case s.LogicalExpression:return e=this.recurse(a.left),f=this.recurse(a.right),this["binary"+a.operator](e,
f,c);case s.ConditionalExpression:return this["ternary?:"](this.recurse(a.test),this.recurse(a.alternate),this.recurse(a.consequent),c);case s.Identifier:return Wa(a.name,g.expression),g.identifier(a.name,g.expensiveChecks||Fb(a.name),c,d,g.expression);case s.MemberExpression:return e=this.recurse(a.object,!1,!!d),a.computed||(Wa(a.property.name,g.expression),f=a.property.name),a.computed&&(f=this.recurse(a.property)),a.computed?this.computedMember(e,f,c,d,g.expression):this.nonComputedMember(e,f,
g.expensiveChecks,c,d,g.expression);case s.CallExpression:return h=[],m(a.arguments,function(a){h.push(g.recurse(a))}),a.filter&&(f=this.$filter(a.callee.name)),a.filter||(f=this.recurse(a.callee,!0)),a.filter?function(a,d,e,g){for(var r=[],m=0;m<h.length;++m)r.push(h[m](a,d,e,g));a=f.apply(t,r,g);return c?{context:t,name:t,value:a}:a}:function(a,d,e,q){var r=f(a,d,e,q),m;if(null!=r.value){Ba(r.context,g.expression);ld(r.value,g.expression);m=[];for(var s=0;s<h.length;++s)m.push(Ba(h[s](a,d,e,q),
g.expression));m=Ba(r.value.apply(r.context,m),g.expression)}return c?{value:m}:m};case s.AssignmentExpression:return e=this.recurse(a.left,!0,1),f=this.recurse(a.right),function(a,d,h,q){var m=e(a,d,h,q);a=f(a,d,h,q);Ba(m.value,g.expression);m.context[m.name]=a;return c?{value:a}:a};case s.ArrayExpression:return h=[],m(a.elements,function(a){h.push(g.recurse(a))}),function(a,d,e,f){for(var g=[],m=0;m<h.length;++m)g.push(h[m](a,d,e,f));return c?{value:g}:g};case s.ObjectExpression:return h=[],m(a.properties,
function(a){h.push({key:a.key.type===s.Identifier?a.key.name:""+a.key.value,value:g.recurse(a.value)})}),function(a,d,e,f){for(var g={},m=0;m<h.length;++m)g[h[m].key]=h[m].value(a,d,e,f);return c?{value:g}:g};case s.ThisExpression:return function(a){return c?{value:a}:a};case s.NGValueParameter:return function(a,d,e,f){return c?{value:e}:e}}},"unary+":function(a,c){return function(d,e,f,g){d=a(d,e,f,g);d=x(d)?+d:0;return c?{value:d}:d}},"unary-":function(a,c){return function(d,e,f,g){d=a(d,e,f,g);
d=x(d)?-d:0;return c?{value:d}:d}},"unary!":function(a,c){return function(d,e,f,g){d=!a(d,e,f,g);return c?{value:d}:d}},"binary+":function(a,c,d){return function(e,f,g,h){var l=a(e,f,g,h);e=c(e,f,g,h);l=md(l,e);return d?{value:l}:l}},"binary-":function(a,c,d){return function(e,f,g,h){var l=a(e,f,g,h);e=c(e,f,g,h);l=(x(l)?l:0)-(x(e)?e:0);return d?{value:l}:l}},"binary*":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)*c(e,f,g,h);return d?{value:e}:e}},"binary/":function(a,c,d){return function(e,
f,g,h){e=a(e,f,g,h)/c(e,f,g,h);return d?{value:e}:e}},"binary%":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)%c(e,f,g,h);return d?{value:e}:e}},"binary===":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)===c(e,f,g,h);return d?{value:e}:e}},"binary!==":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)!==c(e,f,g,h);return d?{value:e}:e}},"binary==":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)==c(e,f,g,h);return d?{value:e}:e}},"binary!=":function(a,c,d){return function(e,
f,g,h){e=a(e,f,g,h)!=c(e,f,g,h);return d?{value:e}:e}},"binary<":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)<c(e,f,g,h);return d?{value:e}:e}},"binary>":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)>c(e,f,g,h);return d?{value:e}:e}},"binary<=":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)<=c(e,f,g,h);return d?{value:e}:e}},"binary>=":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)>=c(e,f,g,h);return d?{value:e}:e}},"binary&&":function(a,c,d){return function(e,f,g,h){e=
a(e,f,g,h)&&c(e,f,g,h);return d?{value:e}:e}},"binary||":function(a,c,d){return function(e,f,g,h){e=a(e,f,g,h)||c(e,f,g,h);return d?{value:e}:e}},"ternary?:":function(a,c,d,e){return function(f,g,h,l){f=a(f,g,h,l)?c(f,g,h,l):d(f,g,h,l);return e?{value:f}:f}},value:function(a,c){return function(){return c?{context:t,name:t,value:a}:a}},identifier:function(a,c,d,e,f){return function(g,h,l,k){g=h&&a in h?h:g;e&&1!==e&&g&&!g[a]&&(g[a]={});h=g?g[a]:t;c&&Ba(h,f);return d?{context:g,name:a,value:h}:h}},
computedMember:function(a,c,d,e,f){return function(g,h,l,k){var n=a(g,h,l,k),q,m;null!=n&&(q=c(g,h,l,k),Wa(q,f),e&&1!==e&&n&&!n[q]&&(n[q]={}),m=n[q],Ba(m,f));return d?{context:n,name:q,value:m}:m}},nonComputedMember:function(a,c,d,e,f,g){return function(h,l,k,n){h=a(h,l,k,n);f&&1!==f&&h&&!h[c]&&(h[c]={});l=null!=h?h[c]:t;(d||Fb(c))&&Ba(l,g);return e?{context:h,name:c,value:l}:l}},inputs:function(a,c){return function(d,e,f,g){return g?g[c]:a(d,e,f)}}};var fc=function(a,c,d){this.lexer=a;this.$filter=
c;this.options=d;this.ast=new s(this.lexer);this.astCompiler=d.csp?new sd(this.ast,c):new rd(this.ast,c)};fc.prototype={constructor:fc,parse:function(a){return this.astCompiler.compile(a,this.options.expensiveChecks)}};ga();ga();var Yf=Object.prototype.valueOf,Ca=L("$sce"),oa={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},ea=L("$compile"),Z=W.createElement("a"),wd=Aa(O.location.href);xd.$inject=["$document"];Jc.$inject=["$provide"];yd.$inject=["$locale"];Ad.$inject=["$locale"];
var Dd=".",hg={yyyy:$("FullYear",4),yy:$("FullYear",2,0,!0),y:$("FullYear",1),MMMM:Hb("Month"),MMM:Hb("Month",!0),MM:$("Month",2,1),M:$("Month",1,1),dd:$("Date",2),d:$("Date",1),HH:$("Hours",2),H:$("Hours",1),hh:$("Hours",2,-12),h:$("Hours",1,-12),mm:$("Minutes",2),m:$("Minutes",1),ss:$("Seconds",2),s:$("Seconds",1),sss:$("Milliseconds",3),EEEE:Hb("Day"),EEE:Hb("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a,c,d){a=-1*d;return a=(0<=a?"+":"")+(Gb(Math[0<a?"floor":
"ceil"](a/60),2)+Gb(Math.abs(a%60),2))},ww:Fd(2),w:Fd(1),G:hc,GG:hc,GGG:hc,GGGG:function(a,c){return 0>=a.getFullYear()?c.ERANAMES[0]:c.ERANAMES[1]}},gg=/((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,fg=/^\-?\d+$/;zd.$inject=["$locale"];var cg=qa(M),dg=qa(rb);Bd.$inject=["$parse"];var he=qa({restrict:"E",compile:function(a,c){if(!c.href&&!c.xlinkHref)return function(a,c){if("a"===c[0].nodeName.toLowerCase()){var f="[object SVGAnimatedString]"===sa.call(c.prop("href"))?
"xlink:href":"href";c.on("click",function(a){c.attr(f)||a.preventDefault()})}}}}),sb={};m(Ab,function(a,c){function d(a,d,f){a.$watch(f[e],function(a){f.$set(c,!!a)})}if("multiple"!=a){var e=va("ng-"+c),f=d;"checked"===a&&(f=function(a,c,f){f.ngModel!==f[e]&&d(a,c,f)});sb[e]=function(){return{restrict:"A",priority:100,link:f}}}});m(Sc,function(a,c){sb[c]=function(){return{priority:100,link:function(a,e,f){if("ngPattern"===c&&"/"==f.ngPattern.charAt(0)&&(e=f.ngPattern.match(jg))){f.$set("ngPattern",
new RegExp(e[1],e[2]));return}a.$watch(f[c],function(a){f.$set(c,a)})}}}});m(["src","srcset","href"],function(a){var c=va("ng-"+a);sb[c]=function(){return{priority:99,link:function(d,e,f){var g=a,h=a;"href"===a&&"[object SVGAnimatedString]"===sa.call(e.prop("href"))&&(h="xlinkHref",f.$attr[h]="xlink:href",g=null);f.$observe(c,function(c){c?(f.$set(h,c),Va&&g&&e.prop(g,f[h])):"href"===a&&f.$set(h,null)})}}}});var Ib={$addControl:v,$$renameControl:function(a,c){a.$name=c},$removeControl:v,$setValidity:v,
$setDirty:v,$setPristine:v,$setSubmitted:v};Gd.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var Od=function(a){return["$timeout","$parse",function(c,d){function e(a){return""===a?d('this[""]').assign:d(a).assign||v}return{name:"form",restrict:a?"EAC":"E",controller:Gd,compile:function(d,g){d.addClass(Xa).addClass(lb);var h=g.name?"name":a&&g.ngForm?"ngForm":!1;return{pre:function(a,d,f,g){if(!("action"in f)){var m=function(c){a.$apply(function(){g.$commitViewValue();g.$setSubmitted()});
c.preventDefault()};d[0].addEventListener("submit",m,!1);d.on("$destroy",function(){c(function(){d[0].removeEventListener("submit",m,!1)},0,!1)})}var s=g.$$parentForm,B=h?e(g.$name):v;h&&(B(a,g),f.$observe(h,function(c){g.$name!==c&&(B(a,t),s.$$renameControl(g,c),B=e(g.$name),B(a,g))}));d.on("$destroy",function(){s.$removeControl(g);B(a,t);Q(g,Ib)})}}}}}]},ie=Od(),ve=Od(!0),ig=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,sg=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
tg=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,ug=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,Pd=/^(\d{4})-(\d{2})-(\d{2})$/,Qd=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,kc=/^(\d{4})-W(\d\d)$/,Rd=/^(\d{4})-(\d\d)$/,Sd=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Td={text:function(a,c,d,e,f,g){ib(a,c,d,e,f,g);ic(e)},date:jb("date",Pd,Kb(Pd,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":jb("datetimelocal",Qd,Kb(Qd,
"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:jb("time",Sd,Kb(Sd,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:jb("week",kc,function(a,c){if(ca(a))return a;if(I(a)){kc.lastIndex=0;var d=kc.exec(a);if(d){var e=+d[1],f=+d[2],g=d=0,h=0,l=0,k=Ed(e),f=7*(f-1);c&&(d=c.getHours(),g=c.getMinutes(),h=c.getSeconds(),l=c.getMilliseconds());return new Date(e,0,k.getDate()+f,d,g,h,l)}}return NaN},"yyyy-Www"),month:jb("month",Rd,Kb(Rd,["yyyy","MM"]),"yyyy-MM"),number:function(a,c,d,e,f,g){Id(a,
c,d,e);ib(a,c,d,e,f,g);e.$$parserName="number";e.$parsers.push(function(a){return e.$isEmpty(a)?null:ug.test(a)?parseFloat(a):t});e.$formatters.push(function(a){if(!e.$isEmpty(a)){if(!X(a))throw kb("numfmt",a);a=a.toString()}return a});if(x(d.min)||d.ngMin){var h;e.$validators.min=function(a){return e.$isEmpty(a)||y(h)||a>=h};d.$observe("min",function(a){x(a)&&!X(a)&&(a=parseFloat(a,10));h=X(a)&&!isNaN(a)?a:t;e.$validate()})}if(x(d.max)||d.ngMax){var l;e.$validators.max=function(a){return e.$isEmpty(a)||
y(l)||a<=l};d.$observe("max",function(a){x(a)&&!X(a)&&(a=parseFloat(a,10));l=X(a)&&!isNaN(a)?a:t;e.$validate()})}},url:function(a,c,d,e,f,g){ib(a,c,d,e,f,g);ic(e);e.$$parserName="url";e.$validators.url=function(a,c){var d=a||c;return e.$isEmpty(d)||sg.test(d)}},email:function(a,c,d,e,f,g){ib(a,c,d,e,f,g);ic(e);e.$$parserName="email";e.$validators.email=function(a,c){var d=a||c;return e.$isEmpty(d)||tg.test(d)}},radio:function(a,c,d,e){y(d.name)&&c.attr("name",++mb);c.on("click",function(a){c[0].checked&&
e.$setViewValue(d.value,a&&a.type)});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e,f,g,h,l){var k=Jd(l,a,"ngTrueValue",d.ngTrueValue,!0),n=Jd(l,a,"ngFalseValue",d.ngFalseValue,!1);c.on("click",function(a){e.$setViewValue(c[0].checked,a&&a.type)});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return!1===a};e.$formatters.push(function(a){return ka(a,k)});e.$parsers.push(function(a){return a?k:n})},hidden:v,
button:v,submit:v,reset:v,file:v},Dc=["$browser","$sniffer","$filter","$parse",function(a,c,d,e){return{restrict:"E",require:["?ngModel"],link:{pre:function(f,g,h,l){l[0]&&(Td[M(h.type)]||Td.text)(f,g,h,l[0],c,a,d,e)}}}}],vg=/^(true|false|\d+)$/,Ne=function(){return{restrict:"A",priority:100,compile:function(a,c){return vg.test(c.ngValue)?function(a,c,f){f.$set("value",a.$eval(f.ngValue))}:function(a,c,f){a.$watch(f.ngValue,function(a){f.$set("value",a)})}}}},ne=["$compile",function(a){return{restrict:"AC",
compile:function(c){a.$$addBindingClass(c);return function(c,e,f){a.$$addBindingInfo(e,f.ngBind);e=e[0];c.$watch(f.ngBind,function(a){e.textContent=a===t?"":a})}}}}],pe=["$interpolate","$compile",function(a,c){return{compile:function(d){c.$$addBindingClass(d);return function(d,f,g){d=a(f.attr(g.$attr.ngBindTemplate));c.$$addBindingInfo(f,d.expressions);f=f[0];g.$observe("ngBindTemplate",function(a){f.textContent=a===t?"":a})}}}}],oe=["$sce","$parse","$compile",function(a,c,d){return{restrict:"A",
compile:function(e,f){var g=c(f.ngBindHtml),h=c(f.ngBindHtml,function(a){return(a||"").toString()});d.$$addBindingClass(e);return function(c,e,f){d.$$addBindingInfo(e,f.ngBindHtml);c.$watch(h,function(){e.html(a.getTrustedHtml(g(c))||"")})}}}}],Me=qa({restrict:"A",require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),qe=jc("",!0),se=jc("Odd",0),re=jc("Even",1),te=Ma({compile:function(a,c){c.$set("ngCloak",t);a.removeClass("ng-cloak")}}),ue=[function(){return{restrict:"A",
scope:!0,controller:"@",priority:500}}],Ic={},wg={blur:!0,focus:!0};m("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var c=va("ng-"+a);Ic[c]=["$parse","$rootScope",function(d,e){return{restrict:"A",compile:function(f,g){var h=d(g[c],null,!0);return function(c,d){d.on(a,function(d){var f=function(){h(c,{$event:d})};wg[a]&&e.$$phase?c.$evalAsync(f):c.$apply(f)})}}}}]});var xe=["$animate",
function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var h,l,k;c.$watch(e.ngIf,function(c){c?l||g(function(c,f){l=f;c[c.length++]=W.createComment(" end ngIf: "+e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)}):(k&&(k.remove(),k=null),l&&(l.$destroy(),l=null),h&&(k=qb(h.clone),a.leave(k).then(function(){k=null}),h=null))})}}}],ye=["$templateRequest","$anchorScroll","$animate",function(a,c,d){return{restrict:"ECA",priority:400,
terminal:!0,transclude:"element",controller:aa.noop,compile:function(e,f){var g=f.ngInclude||f.src,h=f.onload||"",l=f.autoscroll;return function(e,f,m,r,s){var t=0,v,w,p,A=function(){w&&(w.remove(),w=null);v&&(v.$destroy(),v=null);p&&(d.leave(p).then(function(){w=null}),w=p,p=null)};e.$watch(g,function(g){var m=function(){!x(l)||l&&!e.$eval(l)||c()},q=++t;g?(a(g,!0).then(function(a){if(q===t){var c=e.$new();r.template=a;a=s(c,function(a){A();d.enter(a,null,f).then(m)});v=c;p=a;v.$emit("$includeContentLoaded",
g);e.$eval(h)}},function(){q===t&&(A(),e.$emit("$includeContentError",g))}),e.$emit("$includeContentRequested",g)):(A(),r.template=null)})}}}}],Pe=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,f){/SVG/.test(d[0].toString())?(d.empty(),a(Lc(f.template,W).childNodes)(c,function(a){d.append(a)},{futureParentElement:d})):(d.html(f.template),a(d.contents())(c))}}}],ze=Ma({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),
Le=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,c,d,e){var f=c.attr(d.$attr.ngList)||", ",g="false"!==d.ngTrim,h=g?T(f):f;e.$parsers.push(function(a){if(!y(a)){var c=[];a&&m(a.split(h),function(a){a&&c.push(g?T(a):a)});return c}});e.$formatters.push(function(a){return G(a)?a.join(f):t});e.$isEmpty=function(a){return!a||!a.length}}}},lb="ng-valid",Kd="ng-invalid",Xa="ng-pristine",Jb="ng-dirty",Md="ng-pending",kb=L("ngModel"),xg=["$scope","$exceptionHandler","$attrs",
"$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,c,d,e,f,g,h,l,k,n){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=t;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=t;this.$name=n(d.name||"",!1)(a);var q=f(d.ngModel),r=q.assign,s=q,B=r,
K=null,w,p=this;this.$$setOptions=function(a){if((p.$options=a)&&a.getterSetter){var c=f(d.ngModel+"()"),g=f(d.ngModel+"($$$p)");s=function(a){var d=q(a);C(d)&&(d=c(a));return d};B=function(a,c){C(q(a))?g(a,{$$$p:p.$modelValue}):r(a,p.$modelValue)}}else if(!q.assign)throw kb("nonassign",d.ngModel,ua(e));};this.$render=v;this.$isEmpty=function(a){return y(a)||""===a||null===a||a!==a};var A=e.inheritedData("$formController")||Ib,z=0;Hd({ctrl:this,$element:e,set:function(a,c){a[c]=!0},unset:function(a,
c){delete a[c]},parentForm:A,$animate:g});this.$setPristine=function(){p.$dirty=!1;p.$pristine=!0;g.removeClass(e,Jb);g.addClass(e,Xa)};this.$setDirty=function(){p.$dirty=!0;p.$pristine=!1;g.removeClass(e,Xa);g.addClass(e,Jb);A.$setDirty()};this.$setUntouched=function(){p.$touched=!1;p.$untouched=!0;g.setClass(e,"ng-untouched","ng-touched")};this.$setTouched=function(){p.$touched=!0;p.$untouched=!1;g.setClass(e,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){h.cancel(K);p.$viewValue=
p.$$lastCommittedViewValue;p.$render()};this.$validate=function(){if(!X(p.$modelValue)||!isNaN(p.$modelValue)){var a=p.$$rawModelValue,c=p.$valid,d=p.$modelValue,e=p.$options&&p.$options.allowInvalid;p.$$runValidators(a,p.$$lastCommittedViewValue,function(f){e||c===f||(p.$modelValue=f?a:t,p.$modelValue!==d&&p.$$writeModelToScope())})}};this.$$runValidators=function(a,c,d){function e(){var d=!0;m(p.$validators,function(e,f){var h=e(a,c);d=d&&h;g(f,h)});return d?!0:(m(p.$asyncValidators,function(a,
c){g(c,null)}),!1)}function f(){var d=[],e=!0;m(p.$asyncValidators,function(f,h){var k=f(a,c);if(!k||!C(k.then))throw kb("$asyncValidators",k);g(h,t);d.push(k.then(function(){g(h,!0)},function(a){e=!1;g(h,!1)}))});d.length?k.all(d).then(function(){h(e)},v):h(!0)}function g(a,c){l===z&&p.$setValidity(a,c)}function h(a){l===z&&d(a)}z++;var l=z;(function(){var a=p.$$parserName||"parse";if(w===t)g(a,null);else return w||(m(p.$validators,function(a,c){g(c,null)}),m(p.$asyncValidators,function(a,c){g(c,
null)})),g(a,w),w;return!0})()?e()?f():h(!1):h(!1)};this.$commitViewValue=function(){var a=p.$viewValue;h.cancel(K);if(p.$$lastCommittedViewValue!==a||""===a&&p.$$hasNativeValidators)p.$$lastCommittedViewValue=a,p.$pristine&&this.$setDirty(),this.$$parseAndValidate()};this.$$parseAndValidate=function(){var c=p.$$lastCommittedViewValue;if(w=y(c)?t:!0)for(var d=0;d<p.$parsers.length;d++)if(c=p.$parsers[d](c),y(c)){w=!1;break}X(p.$modelValue)&&isNaN(p.$modelValue)&&(p.$modelValue=s(a));var e=p.$modelValue,
f=p.$options&&p.$options.allowInvalid;p.$$rawModelValue=c;f&&(p.$modelValue=c,p.$modelValue!==e&&p.$$writeModelToScope());p.$$runValidators(c,p.$$lastCommittedViewValue,function(a){f||(p.$modelValue=a?c:t,p.$modelValue!==e&&p.$$writeModelToScope())})};this.$$writeModelToScope=function(){B(a,p.$modelValue);m(p.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}})};this.$setViewValue=function(a,c){p.$viewValue=a;p.$options&&!p.$options.updateOnDefault||p.$$debounceViewValueCommit(c)};this.$$debounceViewValueCommit=
function(c){var d=0,e=p.$options;e&&x(e.debounce)&&(e=e.debounce,X(e)?d=e:X(e[c])?d=e[c]:X(e["default"])&&(d=e["default"]));h.cancel(K);d?K=h(function(){p.$commitViewValue()},d):l.$$phase?p.$commitViewValue():a.$apply(function(){p.$commitViewValue()})};a.$watch(function(){var c=s(a);if(c!==p.$modelValue&&(p.$modelValue===p.$modelValue||c===c)){p.$modelValue=p.$$rawModelValue=c;w=t;for(var d=p.$formatters,e=d.length,f=c;e--;)f=d[e](f);p.$viewValue!==f&&(p.$viewValue=p.$$lastCommittedViewValue=f,p.$render(),
p.$$runValidators(c,f,v))}return c})}],Ke=["$rootScope",function(a){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:xg,priority:1,compile:function(c){c.addClass(Xa).addClass("ng-untouched").addClass(lb);return{pre:function(a,c,f,g){var h=g[0],l=g[1]||Ib;h.$$setOptions(g[2]&&g[2].$options);l.$addControl(h);f.$observe("name",function(a){h.$name!==a&&l.$$renameControl(h,a)});a.$on("$destroy",function(){l.$removeControl(h)})},post:function(c,e,f,g){var h=g[0];if(h.$options&&
h.$options.updateOn)e.on(h.$options.updateOn,function(a){h.$$debounceViewValueCommit(a&&a.type)});e.on("blur",function(e){h.$touched||(a.$$phase?c.$evalAsync(h.$setTouched):c.$apply(h.$setTouched))})}}}}}],yg=/(\s+|^)default(\s+|$)/,Oe=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,c){var d=this;this.$options=fa(a.$eval(c.ngModelOptions));this.$options.updateOn!==t?(this.$options.updateOnDefault=!1,this.$options.updateOn=T(this.$options.updateOn.replace(yg,function(){d.$options.updateOnDefault=
!0;return" "}))):this.$options.updateOnDefault=!0}]}},Ae=Ma({terminal:!0,priority:1E3}),zg=L("ngOptions"),Ag=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,Ie=["$compile","$parse",function(a,c){function d(a,d,e){function f(a,c,d,e,g){this.selectValue=a;this.viewValue=c;this.label=d;this.group=e;this.disabled=g}
function n(a){var c;if(!s&&Da(a))c=a;else{c=[];for(var d in a)a.hasOwnProperty(d)&&"$"!==d.charAt(0)&&c.push(d)}return c}var m=a.match(Ag);if(!m)throw zg("iexp",a,ua(d));var r=m[5]||m[7],s=m[6];a=/ as /.test(m[0])&&m[1];var t=m[9];d=c(m[2]?m[1]:r);var v=a&&c(a)||d,w=t&&c(t),p=t?function(a,c){return w(e,c)}:function(a){return Ga(a)},A=function(a,c){return p(a,C(a,c))},x=c(m[2]||m[1]),z=c(m[3]||""),y=c(m[4]||""),J=c(m[8]),F={},C=s?function(a,c){F[s]=c;F[r]=a;return F}:function(a){F[r]=a;return F};return{trackBy:t,
getTrackByValue:A,getWatchables:c(J,function(a){var c=[];a=a||[];for(var d=n(a),f=d.length,g=0;g<f;g++){var h=a===d?g:d[g],k=C(a[h],h),h=p(a[h],k);c.push(h);if(m[2]||m[1])h=x(e,k),c.push(h);m[4]&&(k=y(e,k),c.push(k))}return c}),getOptions:function(){for(var a=[],c={},d=J(e)||[],g=n(d),h=g.length,m=0;m<h;m++){var q=d===g?m:g[m],r=C(d[q],q),s=v(e,r),q=p(s,r),u=x(e,r),w=z(e,r),r=y(e,r),s=new f(q,s,u,w,r);a.push(s);c[q]=s}return{items:a,selectValueMap:c,getOptionFromViewValue:function(a){return c[A(a)]},
getViewValueFromOption:function(a){return t?aa.copy(a.viewValue):a.viewValue}}}}}var e=W.createElement("option"),f=W.createElement("optgroup");return{restrict:"A",terminal:!0,require:["select","?ngModel"],link:function(c,h,l,k){function n(a,c){a.element=c;c.disabled=a.disabled;a.value!==c.value&&(c.value=a.selectValue);a.label!==c.label&&(c.label=a.label,c.textContent=a.label)}function q(a,c,d,e){c&&M(c.nodeName)===d?d=c:(d=e.cloneNode(!1),c?a.insertBefore(d,c):a.appendChild(d));return d}function r(a){for(var c;a;)c=
a.nextSibling,Wb(a),a=c}function s(a){var c=p&&p[0],d=J&&J[0];if(c||d)for(;a&&(a===c||a===d);)a=a.nextSibling;return a}function t(){var a=F&&w.readValue();F=D.getOptions();var c={},d=h[0].firstChild;N&&h.prepend(p);d=s(d);F.items.forEach(function(a){var g,k;a.group?(g=c[a.group],g||(g=q(h[0],d,"optgroup",f),d=g.nextSibling,g.label=a.group,g=c[a.group]={groupElement:g,currentOptionElement:g.firstChild}),k=q(g.groupElement,g.currentOptionElement,"option",e),n(a,k),g.currentOptionElement=k.nextSibling):
(k=q(h[0],d,"option",e),n(a,k),d=k.nextSibling)});Object.keys(c).forEach(function(a){r(c[a].currentOptionElement)});r(d);v.$render();if(!v.$isEmpty(a)){var g=w.readValue();(D.trackBy?ka(a,g):a===g)||(v.$setViewValue(g),v.$render())}}var v=k[1];if(v){var w=k[0];k=l.multiple;for(var p,x=0,y=h.children(),C=y.length;x<C;x++)if(""===y[x].value){p=y.eq(x);break}var N=!!p,J=z(e.cloneNode(!1));J.val("?");var F,D=d(l.ngOptions,h,c);k?(v.$isEmpty=function(a){return!a||0===a.length},w.writeValue=function(a){F.items.forEach(function(a){a.element.selected=
!1});a&&a.forEach(function(a){(a=F.getOptionFromViewValue(a))&&!a.disabled&&(a.element.selected=!0)})},w.readValue=function(){var a=h.val()||[],c=[];m(a,function(a){(a=F.selectValueMap[a])&&!a.disabled&&c.push(F.getViewValueFromOption(a))});return c},D.trackBy&&c.$watchCollection(function(){if(G(v.$viewValue))return v.$viewValue.map(function(a){return D.getTrackByValue(a)})},function(){v.$render()})):(w.writeValue=function(a){var c=F.getOptionFromViewValue(a);c&&!c.disabled?h[0].value!==c.selectValue&&
(J.remove(),N||p.remove(),h[0].value=c.selectValue,c.element.selected=!0,c.element.setAttribute("selected","selected")):null===a||N?(J.remove(),N||h.prepend(p),h.val(""),p.prop("selected",!0),p.attr("selected",!0)):(N||p.remove(),h.prepend(J),h.val("?"),J.prop("selected",!0),J.attr("selected",!0))},w.readValue=function(){var a=F.selectValueMap[h.val()];return a&&!a.disabled?(N||p.remove(),J.remove(),F.getViewValueFromOption(a)):null},D.trackBy&&c.$watch(function(){return D.getTrackByValue(v.$viewValue)},
function(){v.$render()}));N?(p.remove(),a(p)(c),p.removeClass("ng-scope")):p=z(e.cloneNode(!1));t();c.$watchCollection(D.getWatchables,t)}}}}],Be=["$locale","$interpolate","$log",function(a,c,d){var e=/{}/g,f=/^when(Minus)?(.+)$/;return{link:function(g,h,l){function k(a){h.text(a||"")}var n=l.count,q=l.$attr.when&&h.attr(l.$attr.when),r=l.offset||0,s=g.$eval(q)||{},t={},x=c.startSymbol(),w=c.endSymbol(),p=x+n+"-"+r+w,A=aa.noop,z;m(l,function(a,c){var d=f.exec(c);d&&(d=(d[1]?"-":"")+M(d[2]),s[d]=h.attr(l.$attr[c]))});
m(s,function(a,d){t[d]=c(a.replace(e,p))});g.$watch(n,function(c){var e=parseFloat(c),f=isNaN(e);f||e in s||(e=a.pluralCat(e-r));e===z||f&&X(z)&&isNaN(z)||(A(),f=t[e],y(f)?(null!=c&&d.debug("ngPluralize: no rule defined for '"+e+"' in "+q),A=v,k()):A=g.$watch(f,k),z=e)})}}}],Ce=["$parse","$animate",function(a,c){var d=L("ngRepeat"),e=function(a,c,d,e,k,n,m){a[d]=e;k&&(a[k]=n);a.$index=c;a.$first=0===c;a.$last=c===m-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(c&1))};return{restrict:"A",
multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(f,g){var h=g.ngRepeat,l=W.createComment(" end ngRepeat: "+h+" "),k=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!k)throw d("iexp",h);var n=k[1],q=k[2],r=k[3],s=k[4],k=n.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);if(!k)throw d("iidexp",n);var v=k[3]||k[1],x=k[2];if(r&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(r)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(r)))throw d("badident",
r);var w,p,A,y,C={$id:Ga};s?w=a(s):(A=function(a,c){return Ga(c)},y=function(a){return a});return function(a,f,g,k,n){w&&(p=function(c,d,e){x&&(C[x]=c);C[v]=d;C.$index=e;return w(a,C)});var s=ga();a.$watchCollection(q,function(g){var k,q,u=f[0],w,C=ga(),D,F,I,G,L,H,M;r&&(a[r]=g);if(Da(g))L=g,q=p||A;else for(M in q=p||y,L=[],g)g.hasOwnProperty(M)&&"$"!==M.charAt(0)&&L.push(M);D=L.length;M=Array(D);for(k=0;k<D;k++)if(F=g===L?k:L[k],I=g[F],G=q(F,I,k),s[G])H=s[G],delete s[G],C[G]=H,M[k]=H;else{if(C[G])throw m(M,
function(a){a&&a.scope&&(s[a.id]=a)}),d("dupes",h,G,I);M[k]={id:G,scope:t,clone:t};C[G]=!0}for(w in s){H=s[w];G=qb(H.clone);c.leave(G);if(G[0].parentNode)for(k=0,q=G.length;k<q;k++)G[k].$$NG_REMOVED=!0;H.scope.$destroy()}for(k=0;k<D;k++)if(F=g===L?k:L[k],I=g[F],H=M[k],H.scope){w=u;do w=w.nextSibling;while(w&&w.$$NG_REMOVED);H.clone[0]!=w&&c.move(qb(H.clone),null,z(u));u=H.clone[H.clone.length-1];e(H.scope,k,v,I,x,F,D)}else n(function(a,d){H.scope=d;var f=l.cloneNode(!1);a[a.length++]=f;c.enter(a,
null,z(u));u=f;H.clone=a;C[H.id]=H;e(H.scope,k,v,I,x,F,D)});s=C})}}}}],De=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngShow,function(c){a[c?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],we=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngHide,function(c){a[c?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],Ee=Ma(function(a,c,d){a.$watch(d.ngStyle,
function(a,d){d&&a!==d&&m(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),Fe=["$animate",function(a){return{require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,f){var g=[],h=[],l=[],k=[],n=function(a,c){return function(){a.splice(c,1)}};c.$watch(e.ngSwitch||e.on,function(c){var d,e;d=0;for(e=l.length;d<e;++d)a.cancel(l[d]);d=l.length=0;for(e=k.length;d<e;++d){var s=qb(h[d].clone);k[d].$destroy();(l[d]=a.leave(s)).then(n(l,d))}h.length=0;k.length=0;(g=f.cases["!"+
c]||f.cases["?"])&&m(g,function(c){c.transclude(function(d,e){k.push(e);var f=c.element;d[d.length++]=W.createComment(" end ngSwitchWhen: ");h.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],Ge=Ma({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),He=Ma({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,
c,d,e,f){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:f,element:c})}}),Je=Ma({restrict:"EAC",link:function(a,c,d,e,f){if(!f)throw L("ngTransclude")("orphan",ua(c));f(function(a){c.empty();c.append(a)})}}),je=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],Bg={$setViewValue:v,$render:v},Cg=["$element","$scope","$attrs",function(a,c,d){var e=this,f=new Ua;e.ngModelCtrl=Bg;e.unknownOption=z(W.createElement("option"));
e.renderUnknownOption=function(c){c="? "+Ga(c)+" ?";e.unknownOption.val(c);a.prepend(e.unknownOption);a.val(c)};c.$on("$destroy",function(){e.renderUnknownOption=v});e.removeUnknownOption=function(){e.unknownOption.parent()&&e.unknownOption.remove()};e.readValue=function(){e.removeUnknownOption();return a.val()};e.writeValue=function(c){e.hasOption(c)?(e.removeUnknownOption(),a.val(c),""===c&&e.emptyOption.prop("selected",!0)):null==c&&e.emptyOption?(e.removeUnknownOption(),a.val("")):e.renderUnknownOption(c)};
e.addOption=function(a,c){Ta(a,'"option value"');""===a&&(e.emptyOption=c);var d=f.get(a)||0;f.put(a,d+1)};e.removeOption=function(a){var c=f.get(a);c&&(1===c?(f.remove(a),""===a&&(e.emptyOption=t)):f.put(a,c-1))};e.hasOption=function(a){return!!f.get(a)}}],ke=function(){return{restrict:"E",require:["select","?ngModel"],controller:Cg,link:function(a,c,d,e){var f=e[1];if(f){var g=e[0];g.ngModelCtrl=f;f.$render=function(){g.writeValue(f.$viewValue)};c.on("change",function(){a.$apply(function(){f.$setViewValue(g.readValue())})});
if(d.multiple){g.readValue=function(){var a=[];m(c.find("option"),function(c){c.selected&&a.push(c.value)});return a};g.writeValue=function(a){var d=new Ua(a);m(c.find("option"),function(a){a.selected=x(d.get(a.value))})};var h,l=NaN;a.$watch(function(){l!==f.$viewValue||ka(h,f.$viewValue)||(h=ia(f.$viewValue),f.$render());l=f.$viewValue});f.$isEmpty=function(a){return!a||0===a.length}}}}}},me=["$interpolate",function(a){function c(a){a[0].hasAttribute("selected")&&(a[0].selected=!0)}return{restrict:"E",
priority:100,compile:function(d,e){if(y(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var k=d.parent(),m=k.data("$selectController")||k.parent().data("$selectController");m&&m.ngModelCtrl&&(f?a.$watch(f,function(a,f){e.$set("value",a);f!==a&&m.removeOption(f);m.addOption(a,d);m.ngModelCtrl.$render();c(d)}):(m.addOption(e.value,d),m.ngModelCtrl.$render(),c(d)),d.on("$destroy",function(){m.removeOption(e.value);m.ngModelCtrl.$render()}))}}}}],le=qa({restrict:"E",
terminal:!1}),Fc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){e&&(d.required=!0,e.$validators.required=function(a,c){return!d.required||!e.$isEmpty(c)},d.$observe("required",function(){e.$validate()}))}}},Ec=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f,g=d.ngPattern||d.pattern;d.$observe("pattern",function(a){I(a)&&0<a.length&&(a=new RegExp("^"+a+"$"));if(a&&!a.test)throw L("ngPattern")("noregexp",g,a,ua(c));f=a||t;e.$validate()});
e.$validators.pattern=function(a){return e.$isEmpty(a)||y(f)||f.test(a)}}}}},Hc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=-1;d.$observe("maxlength",function(a){a=Y(a);f=isNaN(a)?-1:a;e.$validate()});e.$validators.maxlength=function(a,c){return 0>f||e.$isEmpty(c)||c.length<=f}}}}},Gc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("minlength",function(a){f=Y(a)||0;e.$validate()});e.$validators.minlength=function(a,
c){return e.$isEmpty(c)||c.length>=f}}}}};O.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):(ce(),ee(aa),aa.module("ngLocale",[],["$provide",function(a){function c(a){a+="";var c=a.indexOf(".");return-1==c?0:a.length-c-1}a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ERANAMES:["Before Christ","Anno Domini"],ERAS:["BC","AD"],FIRSTDAYOFWEEK:6,MONTH:"January February March April May June July August September October November December".split(" "),
SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),WEEKENDRANGE:[5,6],fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",medium:"MMM d, y h:mm:ss a",mediumDate:"MMM d, y",mediumTime:"h:mm:ss a","short":"M/d/yy h:mm a",shortDate:"M/d/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,
maxFrac:2,minFrac:2,minInt:1,negPre:"-\u00a4",negSuf:"",posPre:"\u00a4",posSuf:""}]},id:"en-us",pluralCat:function(a,e){var f=a|0,g=e;t===g&&(g=Math.min(c(a),3));Math.pow(10,g);return 1==f&&0==g?"one":"other"}})}]),z(W).ready(function(){Zd(W,yc)}))})(window,document);!window.angular.$$csp().noInlineStyle&&window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
;'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
  var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
  $provide.value("$locale", {
    "DATETIME_FORMATS": {
      "AMPMS": [
      "AM",
      "PM"
      ],
      "DAY": [
      "domingo",
      "segunda-feira",
      "ter\u00e7a-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
      "s\u00e1bado"
      ],
      "ERANAMES": [
      "Antes de Cristo",
      "Ano do Senhor"
      ],
      "ERAS": [
      "a.C.",
      "d.C."
      ],
      "FIRSTDAYOFWEEK": 6,
      "MONTH": [
      "janeiro",
      "fevereiro",
      "mar\u00e7o",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro"
      ],
      "SHORTDAY": [
      "dom",
      "seg",
      "ter",
      "qua",
      "qui",
      "sex",
      "s\u00e1b"
      ],
      "SHORTMONTH": [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez"
      ],
      "STANDALONEMONTH": [
      "janeiro",
      "fevereiro",
      "mar\u00e7o",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro"
      ],
      "WEEKENDRANGE": [
      5,
      6
      ],
      "fullDate": "EEEE, d 'de' MMMM 'de' y",
      "longDate": "d 'de' MMMM 'de' y",
      "medium": "d 'de' MMM 'de' y HH:mm:ss",
      "mediumDate": "d 'de' MMM 'de' y",
      "mediumTime": "HH:mm:ss",
      "short": "dd/MM/yy HH:mm",
      "shortDate": "dd/MM/yy",
      "shortTime": "HH:mm"
    },
    "NUMBER_FORMATS": {
      "CURRENCY_SYM": "R$ ",
      "DECIMAL_SEP": ",",
      "GROUP_SEP": ".",
      "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "-\u00a4",
        "negSuf": "",
        "posPre": "\u00a4",
        "posSuf": ""
      }
      ]
    },
    "id": "pt-br",
    "localeID": "pt_BR",
    "pluralCat": function(n, opt_precision) {  if (n >= 0 && n <= 2 && n != 2) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;}
  });
}]);;/*
 AngularJS v1.4.4
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(E,s,X){'use strict';function sa(a,b,c){if(!a)throw ngMinErr("areq",b||"?",c||"required");return a}function ta(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;Y(a)&&(a=a.join(" "));Y(b)&&(b=b.join(" "));return a+" "+b}function Da(a){var b={};a&&(a.to||a.from)&&(b.to=a.to,b.from=a.from);return b}function U(a,b,c){var d="";a=Y(a)?a:a&&O(a)&&a.length?a.split(/\s+/):[];l(a,function(a,w){a&&0<a.length&&(d+=0<w?" ":"",d+=c?b+a:a+b)});return d}function Ea(a){if(a instanceof J)switch(a.length){case 0:return[];
case 1:if(1===a[0].nodeType)return a;break;default:return J(ia(a))}if(1===a.nodeType)return J(a)}function ia(a){if(!a[0])return a;for(var b=0;b<a.length;b++){var c=a[b];if(1==c.nodeType)return c}}function Fa(a,b,c){l(b,function(b){a.addClass(b,c)})}function Ga(a,b,c){l(b,function(b){a.removeClass(b,c)})}function R(a){return function(b,c){c.addClass&&(Fa(a,b,c.addClass),c.addClass=null);c.removeClass&&(Ga(a,b,c.removeClass),c.removeClass=null)}}function ha(a){a=a||{};if(!a.$$prepared){var b=a.domOperation||
G;a.domOperation=function(){a.$$domOperationFired=!0;b();b=G};a.$$prepared=!0}return a}function da(a,b){ua(a,b);va(a,b)}function ua(a,b){b.from&&(a.css(b.from),b.from=null)}function va(a,b){b.to&&(a.css(b.to),b.to=null)}function S(a,b,c){var d=(b.addClass||"")+" "+(c.addClass||""),e=(b.removeClass||"")+" "+(c.removeClass||"");a=Ha(a.attr("class"),d,e);c.preparationClasses&&(b.preparationClasses=V(c.preparationClasses,b.preparationClasses),delete c.preparationClasses);d=b.domOperation!==G?b.domOperation:
null;wa(b,c);d&&(b.domOperation=d);b.addClass=a.addClass?a.addClass:null;b.removeClass=a.removeClass?a.removeClass:null;return b}function Ha(a,b,c){function d(a){O(a)&&(a=a.split(" "));var b={};l(a,function(a){a.length&&(b[a]=!0)});return b}var e={};a=d(a);b=d(b);l(b,function(a,b){e[b]=1});c=d(c);l(c,function(a,b){e[b]=1===e[b]?null:-1});var w={addClass:"",removeClass:""};l(e,function(b,c){var d,e;1===b?(d="addClass",e=!a[c]):-1===b&&(d="removeClass",e=a[c]);e&&(w[d].length&&(w[d]+=" "),w[d]+=c)});
return w}function D(a){return a instanceof s.element?a[0]:a}function xa(a,b,c){var d="";b&&(d=U(b,"ng-",!0));c.addClass&&(d=V(d,U(c.addClass,"-add")));c.removeClass&&(d=V(d,U(c.removeClass,"-remove")));d.length&&(c.preparationClasses=d,a.addClass(d))}function $(a,b){var c=b?"-"+b+"s":"";ea(a,[fa,c]);return[fa,c]}function ja(a,b){var c=b?"paused":"",d=W+"PlayState";ea(a,[d,c]);return[d,c]}function ea(a,b){a.style[b[0]]=b[1]}function V(a,b){return a?b?a+" "+b:a:b}function ya(a,b,c){var d=Object.create(null),
e=a.getComputedStyle(b)||{};l(c,function(a,b){var c=e[a];if(c){var F=c.charAt(0);if("-"===F||"+"===F||0<=F)c=Ia(c);0===c&&(c=null);d[b]=c}});return d}function Ia(a){var b=0;a=a.split(/\s*,\s*/);l(a,function(a){"s"==a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));a=parseFloat(a)||0;b=b?Math.max(a,b):a});return b}function ka(a){return 0===a||null!=a}function za(a,b){var c=K,d=a+"s";b?c+="Duration":d+=" linear all";return[c,d]}function Aa(){var a=Object.create(null);return{flush:function(){a=Object.create(null)},
count:function(b){return(b=a[b])?b.total:0},get:function(b){return(b=a[b])&&b.value},put:function(b,c){a[b]?a[b].total++:a[b]={total:1,value:c}}}}var G=s.noop,wa=s.extend,J=s.element,l=s.forEach,Y=s.isArray,O=s.isString,la=s.isObject,Ja=s.isUndefined,Ka=s.isDefined,Ba=s.isFunction,ma=s.isElement,K,na,W,oa;E.ontransitionend===X&&E.onwebkittransitionend!==X?(K="WebkitTransition",na="webkitTransitionEnd transitionend"):(K="transition",na="transitionend");E.onanimationend===X&&E.onwebkitanimationend!==
X?(W="WebkitAnimation",oa="webkitAnimationEnd animationend"):(W="animation",oa="animationend");var pa=W+"Delay",qa=W+"Duration",fa=K+"Delay";E=K+"Duration";var La={transitionDuration:E,transitionDelay:fa,transitionProperty:K+"Property",animationDuration:qa,animationDelay:pa,animationIterationCount:W+"IterationCount"},Ma={transitionDuration:E,transitionDelay:fa,animationDuration:qa,animationDelay:pa};s.module("ngAnimate",[]).provider("$$body",function(){this.$get=["$document",function(a){return J(a[0].body)}]}).directive("ngAnimateChildren",
[function(){return function(a,b,c){a=c.ngAnimateChildren;s.isString(a)&&0===a.length?b.data("$$ngAnimateChildren",!0):c.$observe("ngAnimateChildren",function(a){b.data("$$ngAnimateChildren","on"===a||"true"===a)})}}]).factory("$$rAFMutex",["$$rAF",function(a){return function(){var b=!1;a(function(){b=!0});return function(c){b?c():a(c)}}}]).factory("$$AnimateRunner",["$q","$$rAFMutex",function(a,b){function c(a){this.setHost(a);this._doneCallbacks=[];this._runInAnimationFrame=b();this._state=0}c.chain=
function(a,b){function c(){if(H===a.length)b(!0);else a[H](function(a){!1===a?b(!1):(H++,c())})}var H=0;c()};c.all=function(a,b){function c(w){u=u&&w;++H===a.length&&b(u)}var H=0,u=!0;l(a,function(a){a.done(c)})};c.prototype={setHost:function(a){this.host=a||{}},done:function(a){2===this._state?a():this._doneCallbacks.push(a)},progress:G,getPromise:function(){if(!this.promise){var b=this;this.promise=a(function(a,c){b.done(function(b){!1===b?c():a()})})}return this.promise},then:function(a,b){return this.getPromise().then(a,
b)},"catch":function(a){return this.getPromise()["catch"](a)},"finally":function(a){return this.getPromise()["finally"](a)},pause:function(){this.host.pause&&this.host.pause()},resume:function(){this.host.resume&&this.host.resume()},end:function(){this.host.end&&this.host.end();this._resolve(!0)},cancel:function(){this.host.cancel&&this.host.cancel();this._resolve(!1)},complete:function(a){var b=this;0===b._state&&(b._state=1,b._runInAnimationFrame(function(){b._resolve(a)}))},_resolve:function(a){2!==
this._state&&(l(this._doneCallbacks,function(b){b(a)}),this._doneCallbacks.length=0,this._state=2)}};return c}]).provider("$$animateQueue",["$animateProvider",function(a){function b(a,b,c,l){return d[a].some(function(a){return a(b,c,l)})}function c(a,b){a=a||{};var c=0<(a.addClass||"").length,d=0<(a.removeClass||"").length;return b?c&&d:c||d}var d=this.rules={skip:[],cancel:[],join:[]};d.join.push(function(a,b,d){return!b.structural&&c(b.options)});d.skip.push(function(a,b,d){return!b.structural&&
!c(b.options)});d.skip.push(function(a,b,c){return"leave"==c.event&&b.structural});d.skip.push(function(a,b,c){return c.structural&&2===c.state&&!b.structural});d.cancel.push(function(a,b,c){return c.structural&&b.structural});d.cancel.push(function(a,b,c){return 2===c.state&&b.structural});d.cancel.push(function(a,b,c){a=b.options;c=c.options;return a.addClass&&a.addClass===c.removeClass||a.removeClass&&a.removeClass===c.addClass});this.$get=["$$rAF","$rootScope","$rootElement","$document","$$body",
"$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite","$$forceReflow",function(d,w,H,u,F,B,N,z,Na,t,Oa){function s(a,b){var c=D(a),f=[],h=r[b];h&&l(h,function(a){a.node.contains(c)&&f.push(a.callback)});return f}function I(a,b,c,f){d(function(){l(s(b,a),function(a){a(b,c,f)})})}function n(a,h,m){function d(b,c,f,h){I(c,a,f,h);b.progress(c,f,h)}function r(b){var c=a,f=m;f.preparationClasses&&(c.removeClass(f.preparationClasses),f.preparationClasses=null);f.activeClasses&&(c.removeClass(f.activeClasses),
f.activeClasses=null);Ca(a,m);da(a,m);m.domOperation();q.complete(!b)}var g,n;if(a=Ea(a))g=D(a),n=a.parent();m=ha(m);var q=new z;Y(m.addClass)&&(m.addClass=m.addClass.join(" "));m.addClass&&!O(m.addClass)&&(m.addClass=null);Y(m.removeClass)&&(m.removeClass=m.removeClass.join(" "));m.removeClass&&!O(m.removeClass)&&(m.removeClass=null);m.from&&!la(m.from)&&(m.from=null);m.to&&!la(m.to)&&(m.to=null);if(!g)return r(),q;var e=[g.className,m.addClass,m.removeClass].join(" ");if(!A(e))return r(),q;var l=
0<=["enter","move","leave"].indexOf(h),F=!M||x.get(g),e=!F&&v.get(g)||{},t=!!e.state;F||t&&1==e.state||(F=!ca(a,n,h));if(F)return r(),q;l&&y(a);n={structural:l,element:a,event:h,close:r,options:m,runner:q};if(t){if(b("skip",a,n,e)){if(2===e.state)return r(),q;S(a,e.options,m);return e.runner}if(b("cancel",a,n,e))if(2===e.state)e.runner.end();else if(e.structural)e.close();else return S(a,e.options,n.options),e.runner;else if(b("join",a,n,e))if(2===e.state)S(a,m,{});else return xa(a,l?h:null,m),h=
n.event=e.event,m=S(a,e.options,n.options),e.runner}else S(a,m,{});(t=n.structural)||(t="animate"===n.event&&0<Object.keys(n.options.to||{}).length||c(n.options));if(!t)return r(),f(a),q;xa(a,l?h:null,m);$(g,9999);var B=(e.counter||0)+1;n.counter=B;k(a,1,n);w.$$postDigest(function(){var b=v.get(g),y=!b,b=b||{},A=0<(a.parent()||[]).length&&("animate"===b.event||b.structural||c(b.options));if(y||b.counter!==B||!A){y&&(Ca(a,m),da(a,m));if(y||l&&b.event!==h)m.domOperation(),q.end();A||f(a)}else h=!b.structural&&
c(b.options,!0)?"setClass":b.event,k(a,2),b=N(a,h,b.options,function(a){Oa();$(D(a),!1)}),b.done(function(b){r(!b);(b=v.get(g))&&b.counter===B&&f(D(a));d(q,h,"close",{})}),q.setHost(b),d(q,h,"start",{})});return q}function y(a){a=D(a).querySelectorAll("[data-ng-animate]");l(a,function(a){var b=parseInt(a.getAttribute("data-ng-animate")),c=v.get(a);switch(b){case 2:c.runner.end();case 1:c&&v.remove(a)}})}function f(a){a=D(a);a.removeAttribute("data-ng-animate");v.remove(a)}function g(a,b){return D(a)===
D(b)}function ca(a,b,c){c=g(a,F)||"HTML"===a[0].nodeName;var f=g(a,H),h=!1,r;for((a=a.data("$ngAnimatePin"))&&(b=a);b&&b.length;){f||(f=g(b,H));a=b[0];if(1!==a.nodeType)break;var d=v.get(a)||{};h||(h=d.structural||x.get(a));if(Ja(r)||!0===r)a=b.data("$$ngAnimateChildren"),Ka(a)&&(r=a);if(h&&!1===r)break;f||(f=g(b,H),f||(a=b.data("$ngAnimatePin"))&&(b=a));c||(c=g(b,F));b=b.parent()}return(!h||r)&&f&&c}function k(a,b,c){c=c||{};c.state=b;a=D(a);a.setAttribute("data-ng-animate",b);c=(b=v.get(a))?wa(b,
c):c;v.put(a,c)}var v=new B,x=new B,M=null,h=w.$watch(function(){return 0===Na.totalPendingRequests},function(a){a&&(h(),w.$$postDigest(function(){w.$$postDigest(function(){null===M&&(M=!0)})}))}),r={},q=a.classNameFilter(),A=q?function(a){return q.test(a)}:function(){return!0},Ca=R(t);return{on:function(a,b,c){b=ia(b);r[a]=r[a]||[];r[a].push({node:b,callback:c})},off:function(a,b,c){function f(a,b,c){var h=ia(b);return a.filter(function(a){return!(a.node===h&&(!c||a.callback===c))})}var h=r[a];h&&
(r[a]=1===arguments.length?null:f(h,b,c))},pin:function(a,b){sa(ma(a),"element","not an element");sa(ma(b),"parentElement","not an element");a.data("$ngAnimatePin",b)},push:function(a,b,c,f){c=c||{};c.domOperation=f;return n(a,b,c)},enabled:function(a,b){var c=arguments.length;if(0===c)b=!!M;else if(ma(a)){var f=D(a),h=x.get(f);1===c?b=!h:(b=!!b)?h&&x.remove(f):x.put(f,!0)}else b=M=!!a;return b}}}]}]).provider("$$animation",["$animateProvider",function(a){function b(a){return a.data("$$animationRunner")}
var c=this.drivers=[];this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap",function(a,e,w,H,u){function F(a){function b(a){if(a.processed)return a;a.processed=!0;var d=a.domNode,f=d.parentNode;e.put(d,a);for(var g;f;){if(g=e.get(f)){g.processed||(g=b(g));break}f=f.parentNode}(g||c).children.push(a);return a}var c={children:[]},d,e=new u;for(d=0;d<a.length;d++){var I=a[d];e.put(I.domNode,a[d]={domNode:I.domNode,fn:I.fn,children:[]})}for(d=0;d<a.length;d++)b(a[d]);return function(a){var b=
[],c=[],d;for(d=0;d<a.children.length;d++)c.push(a.children[d]);a=c.length;var e=0,k=[];for(d=0;d<c.length;d++){var v=c[d];0>=a&&(a=e,e=0,b=b.concat(k),k=[]);k.push(v.fn);l(v.children,function(a){e++;c.push(a)});a--}k.length&&(b=b.concat(k));return b}(c)}var B=[],N=R(a);return function(z,u,t,s){function G(a){a=a.hasAttribute("ng-animate-ref")?[a]:a.querySelectorAll("[ng-animate-ref]");var b=[];l(a,function(a){var c=a.getAttribute("ng-animate-ref");c&&c.length&&b.push(a)});return b}function I(a){var b=
[],c={};l(a,function(a,f){var h=D(a.element),d=0<=["enter","move"].indexOf(a.event),h=a.structural?G(h):[];if(h.length){var e=d?"to":"from";l(h,function(a){var b=a.getAttribute("ng-animate-ref");c[b]=c[b]||{};c[b][e]={animationID:f,element:J(a)}})}else b.push(a)});var f={},d={};l(c,function(c,e){var k=c.from,y=c.to;if(k&&y){var g=a[k.animationID],v=a[y.animationID],q=k.animationID.toString();if(!d[q]){var x=d[q]={beforeStart:function(){g.beforeStart();v.beforeStart()},close:function(){g.close();v.close()},
classes:n(g.classes,v.classes),from:g,to:v,anchors:[]};x.classes.length?b.push(x):(b.push(g),b.push(v))}d[q].anchors.push({out:k.element,"in":y.element})}else k=k?k.animationID:y.animationID,y=k.toString(),f[y]||(f[y]=!0,b.push(a[k]))});return b}function n(a,b){a=a.split(" ");b=b.split(" ");for(var c=[],f=0;f<a.length;f++){var d=a[f];if("ng-"!==d.substring(0,3))for(var k=0;k<b.length;k++)if(d===b[k]){c.push(d);break}}return c.join(" ")}function y(a,b){for(var f=c.length-1;0<=f;f--){var d=c[f];if(w.has(d)&&
(d=w.get(d)(a,b)))return d}}function f(a,c){a.from&&a.to?(b(a.from.element).setHost(c),b(a.to.element).setHost(c)):b(a.element).setHost(c)}function g(){var a=b(z);!a||"leave"===u&&t.$$domOperationFired||a.end()}function ca(b){z.off("$destroy",g);z.removeData("$$animationRunner");N(z,t);da(z,t);t.domOperation();M&&a.removeClass(z,M);z.removeClass("ng-animate");v.complete(!b)}t=ha(t);var k=0<=["enter","move","leave"].indexOf(u),v=new H({end:function(){ca()},cancel:function(){ca(!0)}});if(!c.length)return ca(),
v;z.data("$$animationRunner",v);var x=ta(z.attr("class"),ta(t.addClass,t.removeClass)),M=t.tempClasses;M&&(x+=" "+M,t.tempClasses=null);B.push({element:z,classes:x,event:u,structural:k,options:t,beforeStart:function(){z.addClass("ng-animate");M&&a.addClass(z,M)},close:ca});z.on("$destroy",g);if(1<B.length)return v;e.$$postDigest(function(){var a=[];l(B,function(c){var f=c.element;b(f)&&D(f).parentNode?a.push(c):c.close()});B.length=0;var c=I(a),d=[];l(c,function(a){d.push({domNode:D(a.from?a.from.element:
a.element),fn:function(){a.beforeStart();var c,d=a.close;if(b(a.anchors?a.from.element||a.to.element:a.element)){var h=y(a,s);h&&(c=h.start)}c?(c=c(),c.done(function(a){d(!a)}),f(a,c)):d()}})});l(F(d),function(a){a()})});return v}}]}]).provider("$animateCss",["$animateProvider",function(a){var b=Aa(),c=Aa();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAF",function(a,e,w,H,u,F,B){function N(a,b){var c=a.parentNode;return(c.$$ngAnimateParentKey||(c.$$ngAnimateParentKey=
++E))+"-"+a.getAttribute("class")+"-"+b}function z(y,f,g,n){var k;0<b.count(g)&&(k=c.get(g),k||(f=U(f,"-stagger"),e.addClass(y,f),k=ya(a,y,n),k.animationDuration=Math.max(k.animationDuration,0),k.transitionDuration=Math.max(k.transitionDuration,0),e.removeClass(y,f),c.put(g,k)));return k||{}}function s(a){I&&I();n.push(a);I=B(function(){I=null;b.flush();c.flush();for(var a=u(),d=0;d<n.length;d++)n[d](a);n.length=0})}function t(c,f,e){f=b.get(e);f||(f=ya(a,c,La),"infinite"===f.animationIterationCount&&
(f.animationIterationCount=1));b.put(e,f);c=f;e=c.animationDelay;f=c.transitionDelay;c.maxDelay=e&&f?Math.max(e,f):e||f;c.maxDuration=Math.max(c.animationDuration*c.animationIterationCount,c.transitionDuration);return c}var G=R(e),E=0,I,n=[];return function(a,c){function d(){k()}function n(){k(!0)}function k(b){if(!(B||ra&&u)){B=!0;u=!1;c.$$skipPreparationClasses||e.removeClass(a,Z);e.removeClass(a,X);ja(h,!1);$(h,!1);l(r,function(a){h.style[a[0]]=""});G(a,c);da(a,c);if(c.onDone)c.onDone();m&&m.complete(!b)}}
function v(a){p.blockTransition&&$(h,a);p.blockKeyframeAnimation&&ja(h,!!a)}function x(){m=new w({end:d,cancel:n});k();return{$$willAnimate:!1,start:function(){return m},end:d}}function I(){function b(){if(!B){v(!1);l(r,function(a){h.style[a[0]]=a[1]});G(a,c);e.addClass(a,X);if(p.recalculateTimingStyles){ga=h.className+" "+Z;aa=N(h,ga);C=t(h,ga,aa);Q=C.maxDelay;J=Math.max(Q,0);L=C.maxDuration;if(0===L){k();return}p.hasTransitions=0<C.transitionDuration;p.hasAnimations=0<C.animationDuration}if(p.applyTransitionDelay||
p.applyAnimationDelay){Q="boolean"!==typeof c.delay&&ka(c.delay)?parseFloat(c.delay):Q;J=Math.max(Q,0);var g;p.applyTransitionDelay&&(C.transitionDelay=Q,g=[fa,Q+"s"],r.push(g),h.style[g[0]]=g[1]);p.applyAnimationDelay&&(C.animationDelay=Q,g=[pa,Q+"s"],r.push(g),h.style[g[0]]=g[1])}O=1E3*J;R=1E3*L;if(c.easing){var q=c.easing;p.hasTransitions&&(g=K+"TimingFunction",r.push([g,q]),h.style[g]=q);p.hasAnimations&&(g=W+"TimingFunction",r.push([g,q]),h.style[g]=q)}C.transitionDuration&&x.push(na);C.animationDuration&&
x.push(oa);n=Date.now();a.on(x.join(" "),m);H(d,O+1.5*R,!1);va(a,c)}}function d(){k()}function m(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||b.timeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-n,0)>=O&&b>=L&&(ra=!0,k())}if(!B)if(h.parentNode){var n,x=[],g=function(a){if(ra)u&&a&&(u=!1,k());else if(u=!a,C.animationDuration)if(a=ja(h,u),u)r.push(a);else{var b=r,c=b.indexOf(a);0<=a&&b.splice(c,1)}},q=0<V&&(C.transitionDuration&&0===T.transitionDuration||
C.animationDuration&&0===T.animationDuration)&&Math.max(T.animationDelay,T.transitionDelay);q?H(b,Math.floor(q*V*1E3),!1):b();E.resume=function(){g(!0)};E.pause=function(){g(!1)}}else k()}var h=D(a);if(!h||!h.parentNode)return x();c=ha(c);var r=[],q=a.attr("class"),A=Da(c),B,u,ra,m,E,J,O,L,R;if(0===c.duration||!F.animations&&!F.transitions)return x();var ba=c.event&&Y(c.event)?c.event.join(" "):c.event,S="",P="";ba&&c.structural?S=U(ba,"ng-",!0):ba&&(S=ba);c.addClass&&(P+=U(c.addClass,"-add"));c.removeClass&&
(P.length&&(P+=" "),P+=U(c.removeClass,"-remove"));c.applyClassesEarly&&P.length&&(G(a,c),P="");var Z=[S,P].join(" ").trim(),ga=q+" "+Z,X=U(Z,"-active"),q=A.to&&0<Object.keys(A.to).length;if(!(0<(c.keyframeStyle||"").length||q||Z))return x();var aa,T;0<c.stagger?(A=parseFloat(c.stagger),T={transitionDelay:A,animationDelay:A,transitionDuration:0,animationDuration:0}):(aa=N(h,ga),T=z(h,Z,aa,Ma));c.$$skipPreparationClasses||e.addClass(a,Z);c.transitionStyle&&(A=[K,c.transitionStyle],ea(h,A),r.push(A));
0<=c.duration&&(A=0<h.style[K].length,A=za(c.duration,A),ea(h,A),r.push(A));c.keyframeStyle&&(A=[W,c.keyframeStyle],ea(h,A),r.push(A));var V=T?0<=c.staggerIndex?c.staggerIndex:b.count(aa):0;(ba=0===V)&&!c.skipBlocking&&$(h,9999);var C=t(h,ga,aa),Q=C.maxDelay;J=Math.max(Q,0);L=C.maxDuration;var p={};p.hasTransitions=0<C.transitionDuration;p.hasAnimations=0<C.animationDuration;p.hasTransitionAll=p.hasTransitions&&"all"==C.transitionProperty;p.applyTransitionDuration=q&&(p.hasTransitions&&!p.hasTransitionAll||
p.hasAnimations&&!p.hasTransitions);p.applyAnimationDuration=c.duration&&p.hasAnimations;p.applyTransitionDelay=ka(c.delay)&&(p.applyTransitionDuration||p.hasTransitions);p.applyAnimationDelay=ka(c.delay)&&p.hasAnimations;p.recalculateTimingStyles=0<P.length;if(p.applyTransitionDuration||p.applyAnimationDuration)L=c.duration?parseFloat(c.duration):L,p.applyTransitionDuration&&(p.hasTransitions=!0,C.transitionDuration=L,A=0<h.style[K+"Property"].length,r.push(za(L,A))),p.applyAnimationDuration&&(p.hasAnimations=
!0,C.animationDuration=L,r.push([qa,L+"s"]));if(0===L&&!p.recalculateTimingStyles)return x();null==c.duration&&0<C.transitionDuration&&(p.recalculateTimingStyles=p.recalculateTimingStyles||ba);O=1E3*J;R=1E3*L;c.skipBlocking||(p.blockTransition=0<C.transitionDuration,p.blockKeyframeAnimation=0<C.animationDuration&&0<T.animationDelay&&0===T.animationDuration);ua(a,c);p.blockTransition||p.blockKeyframeAnimation?v(L):c.skipBlocking||$(h,!1);return{$$willAnimate:!0,end:d,start:function(){if(!B)return E=
{end:d,cancel:n,resume:null,pause:null},m=new w(E),s(I),m}}}}]}]).provider("$$animateCssDriver",["$$animationProvider",function(a){a.drivers.push("$$animateCssDriver");this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$$body","$sniffer","$$jqLite",function(a,c,d,e,w,H,u){function F(a){return a.replace(/\bng-\S+\b/g,"")}function B(a,b){O(a)&&(a=a.split(" "));O(b)&&(b=b.split(" "));return a.filter(function(a){return-1===b.indexOf(a)}).join(" ")}function N(c,e,u){function f(a){var b=
{},c=D(a).getBoundingClientRect();l(["width","height","top","left"],function(a){var d=c[a];switch(a){case "top":d+=t.scrollTop;break;case "left":d+=t.scrollLeft}b[a]=Math.floor(d)+"px"});return b}function g(){var c=F(u.attr("class")||""),d=B(c,v),c=B(v,c),d=a(k,{to:f(u),addClass:"ng-anchor-in "+d,removeClass:"ng-anchor-out "+c,delay:!0});return d.$$willAnimate?d:null}function N(){k.remove();e.removeClass("ng-animate-shim");u.removeClass("ng-animate-shim")}var k=J(D(e).cloneNode(!0)),v=F(k.attr("class")||
"");e.addClass("ng-animate-shim");u.addClass("ng-animate-shim");k.addClass("ng-anchor");E.append(k);var x;c=function(){var c=a(k,{addClass:"ng-anchor-out",delay:!0,from:f(e)});return c.$$willAnimate?c:null}();if(!c&&(x=g(),!x))return N();var M=c||x;return{start:function(){function a(){c&&c.end()}var b,c=M.start();c.done(function(){c=null;if(!x&&(x=g()))return c=x.start(),c.done(function(){c=null;N();b.complete()}),c;N();b.complete()});return b=new d({end:a,cancel:a})}}}function z(a,b,c,f){var e=s(a,
G),u=s(b,G),k=[];l(f,function(a){(a=N(c,a.out,a["in"]))&&k.push(a)});if(e||u||0!==k.length)return{start:function(){function a(){l(b,function(a){a.end()})}var b=[];e&&b.push(e.start());u&&b.push(u.start());l(k,function(a){b.push(a.start())});var c=new d({end:a,cancel:a});d.all(b,function(a){c.complete(a)});return c}}}function s(c,d){var e=c.element,f=c.options||{};f.$$skipPreparationClasses=!0;f.skipBlocking=!0;c.structural&&(f.event=c.event,"leave"===c.event&&(f.onDone=f.domOperation));d(e);K(e,f);
f.preparationClasses&&(f.event=V(f.event,f.preparationClasses));e=a(e,f);return e.$$willAnimate?e:null}if(!H.animations&&!H.transitions)return G;var t=D(w);c=D(e);var E=J(t.parentNode===c?t:c),K=R(u);return function(a,b){return a.from&&a.to?z(a.from,a.to,a.classes,a.anchors):s(a,b)}}]}]).provider("$$animateJs",["$animateProvider",function(a){this.$get=["$injector","$$AnimateRunner","$$rAFMutex","$$jqLite",function(b,c,d,e){function w(c){c=Y(c)?c:c.split(" ");for(var d=[],e={},l=0;l<c.length;l++){var w=
c[l],s=a.$$registeredAnimations[w];s&&!e[w]&&(d.push(b.get(s)),e[w]=!0)}return d}var s=R(e);return function(a,b,d,e){function z(){e.domOperation();s(a,e)}function D(a,b,d,e,f){switch(d){case "animate":b=[b,e.from,e.to,f];break;case "setClass":b=[b,J,I,f];break;case "addClass":b=[b,J,f];break;case "removeClass":b=[b,I,f];break;default:b=[b,f]}b.push(e);if(a=a.apply(a,b))if(Ba(a.start)&&(a=a.start()),a instanceof c)a.done(f);else if(Ba(a))return a;return G}function t(a,b,d,e,f){var g=[];l(e,function(e){var l=
e[f];l&&g.push(function(){var e,f,h=!1,g=function(a){h||(h=!0,(f||G)(a),e.complete(!a))};e=new c({end:function(){g()},cancel:function(){g(!0)}});f=D(l,a,b,d,function(a){g(!1===a)});return e})});return g}function E(a,b,d,e,f){var g=t(a,b,d,e,f);if(0===g.length){var q,n;"beforeSetClass"===f?(q=t(a,"removeClass",d,e,"beforeRemoveClass"),n=t(a,"addClass",d,e,"beforeAddClass")):"setClass"===f&&(q=t(a,"removeClass",d,e,"removeClass"),n=t(a,"addClass",d,e,"addClass"));q&&(g=g.concat(q));n&&(g=g.concat(n))}if(0!==
g.length)return function(a){var b=[];g.length&&l(g,function(a){b.push(a())});b.length?c.all(b,a):a();return function(a){l(b,function(b){a?b.cancel():b.end()})}}}3===arguments.length&&la(d)&&(e=d,d=null);e=ha(e);d||(d=a.attr("class")||"",e.addClass&&(d+=" "+e.addClass),e.removeClass&&(d+=" "+e.removeClass));var J=e.addClass,I=e.removeClass,n=w(d),y,f;if(n.length){var g,K;"leave"==b?(K="leave",g="afterLeave"):(K="before"+b.charAt(0).toUpperCase()+b.substr(1),g=b);"enter"!==b&&"move"!==b&&(y=E(a,b,e,
n,K));f=E(a,b,e,n,g)}if(y||f)return{start:function(){function b(c){l=!0;z();da(a,e);h.complete(c)}var d,g=[];y&&g.push(function(a){d=y(a)});g.length?g.push(function(a){z();a(!0)}):z();f&&g.push(function(a){d=f(a)});var l=!1,h=new c({end:function(){l||((d||G)(void 0),b(void 0))},cancel:function(){l||((d||G)(!0),b(!0))}});c.chain(g,b);return h}}}}]}]).provider("$$animateJsDriver",["$$animationProvider",function(a){a.drivers.push("$$animateJsDriver");this.$get=["$$animateJs","$$AnimateRunner",function(a,
c){function d(c){return a(c.element,c.event,c.classes,c.options)}return function(a){if(a.from&&a.to){var b=d(a.from),s=d(a.to);if(b||s)return{start:function(){function a(){return function(){l(d,function(a){a.end()})}}var d=[];b&&d.push(b.start());s&&d.push(s.start());c.all(d,function(a){e.complete(a)});var e=new c({end:a(),cancel:a()});return e}}}else return d(a)}}]}])})(window,window.angular);
;/*
 AngularJS v1.4.4
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(s,n,t){'use strict';n.module("ngAria",["ng"]).provider("$aria",function(){function a(a,f,l){return function(m,d,e){var b=e.$normalize(f);c[b]&&!e[b]&&m.$watch(e[a],function(b){b=l?!b:!!b;d.attr(f,b)})}}var c={ariaHidden:!0,ariaChecked:!0,ariaDisabled:!0,ariaRequired:!0,ariaInvalid:!0,ariaMultiline:!0,ariaValue:!0,tabindex:!0,bindKeypress:!0,bindRoleForClick:!0};this.config=function(a){c=n.extend(c,a)};this.$get=function(){return{config:function(a){return c[a]},$$watchExpr:a}}}).directive("ngShow",
["$aria",function(a){return a.$$watchExpr("ngShow","aria-hidden",!0)}]).directive("ngHide",["$aria",function(a){return a.$$watchExpr("ngHide","aria-hidden",!1)}]).directive("ngModel",["$aria",function(a){function c(c,m,d){return a.config(m)&&!d.attr(c)}function k(a,c){return!c.attr("role")&&c.attr("type")===a&&"INPUT"!==c[0].nodeName}function f(a,c){var d=a.type,e=a.role;return"checkbox"===(d||e)||"menuitemcheckbox"===e?"checkbox":"radio"===(d||e)||"menuitemradio"===e?"radio":"range"===d||"progressbar"===
e||"slider"===e?"range":"textbox"===(d||e)||"TEXTAREA"===c[0].nodeName?"multiline":""}return{restrict:"A",require:"?ngModel",priority:200,compile:function(l,m){var d=f(m,l);return{pre:function(a,b,c,g){"checkbox"===d&&"checkbox"!==c.type&&(g.$isEmpty=function(b){return!1===b})},post:function(e,b,h,g){function f(){return g.$modelValue}function m(){return p?(p=!1,function(a){a=h.value==g.$viewValue;b.attr("aria-checked",a);b.attr("tabindex",0-!a)}):function(a){b.attr("aria-checked",h.value==g.$viewValue)}}
function l(){b.attr("aria-checked",!g.$isEmpty(g.$viewValue))}var p=c("tabindex","tabindex",b);switch(d){case "radio":case "checkbox":k(d,b)&&b.attr("role",d);c("aria-checked","ariaChecked",b)&&e.$watch(f,"radio"===d?m():l);break;case "range":k(d,b)&&b.attr("role","slider");if(a.config("ariaValue")){var n=!b.attr("aria-valuemin")&&(h.hasOwnProperty("min")||h.hasOwnProperty("ngMin")),q=!b.attr("aria-valuemax")&&(h.hasOwnProperty("max")||h.hasOwnProperty("ngMax")),r=!b.attr("aria-valuenow");n&&h.$observe("min",
function(a){b.attr("aria-valuemin",a)});q&&h.$observe("max",function(a){b.attr("aria-valuemax",a)});r&&e.$watch(f,function(a){b.attr("aria-valuenow",a)})}break;case "multiline":c("aria-multiline","ariaMultiline",b)&&b.attr("aria-multiline",!0)}p&&b.attr("tabindex",0);g.$validators.required&&c("aria-required","ariaRequired",b)&&e.$watch(function(){return g.$error.required},function(a){b.attr("aria-required",!!a)});c("aria-invalid","ariaInvalid",b)&&e.$watch(function(){return g.$invalid},function(a){b.attr("aria-invalid",
!!a)})}}}}}]).directive("ngDisabled",["$aria",function(a){return a.$$watchExpr("ngDisabled","aria-disabled")}]).directive("ngMessages",function(){return{restrict:"A",require:"?ngMessages",link:function(a,c,k,f){c.attr("aria-live")||c.attr("aria-live","assertive")}}}).directive("ngClick",["$aria","$parse",function(a,c){return{restrict:"A",compile:function(k,f){var l=c(f.ngClick,null,!0);return function(c,d,e){function b(a,b){if(-1!==b.indexOf(a[0].nodeName))return!0}var f=["BUTTON","A","INPUT","TEXTAREA"];
!a.config("bindRoleForClick")||d.attr("role")||b(d,f)||d.attr("role","button");a.config("tabindex")&&!d.attr("tabindex")&&d.attr("tabindex",0);if(a.config("bindKeypress")&&!e.ngKeypress&&!b(d,f))d.on("keypress",function(a){function b(){l(c,{$event:a})}var d=a.which||a.keyCode;32!==d&&13!==d||c.$apply(b)})}}}}]).directive("ngDblclick",["$aria",function(a){return function(c,k,f){a.config("tabindex")&&!k.attr("tabindex")&&k.attr("tabindex",0)}}])})(window,window.angular);
;/*
 AngularJS v1.4.4
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,g,l){'use strict';function m(b,a,f){var c=f.baseHref(),k=b[0];return function(b,d,e){var f,h;e=e||{};h=e.expires;f=g.isDefined(e.path)?e.path:c;d===l&&(h="Thu, 01 Jan 1970 00:00:00 GMT",d="");g.isString(h)&&(h=new Date(h));d=encodeURIComponent(b)+"="+encodeURIComponent(d);d=d+(f?";path="+f:"")+(e.domain?";domain="+e.domain:"");d+=h?";expires="+h.toUTCString():"";d+=e.secure?";secure":"";e=d.length+1;4096<e&&a.warn("Cookie '"+b+"' possibly not set or overflowed because it was too large ("+
e+" > 4096 bytes)!");k.cookie=d}}g.module("ngCookies",["ng"]).provider("$cookies",[function(){var b=this.defaults={};this.$get=["$$cookieReader","$$cookieWriter",function(a,f){return{get:function(c){return a()[c]},getObject:function(c){return(c=this.get(c))?g.fromJson(c):c},getAll:function(){return a()},put:function(c,a,n){f(c,a,n?g.extend({},b,n):b)},putObject:function(c,b,a){this.put(c,g.toJson(b),a)},remove:function(a,k){f(a,l,k?g.extend({},b,k):b)}}}]}]);g.module("ngCookies").factory("$cookieStore",
["$cookies",function(b){return{get:function(a){return b.getObject(a)},put:function(a,f){b.putObject(a,f)},remove:function(a){b.remove(a)}}}]);m.$inject=["$document","$log","$browser"];g.module("ngCookies").provider("$$cookieWriter",function(){this.$get=m})})(window,window.angular);
;/*!
 * AngularJS Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.1.4
 */
!function(e,t,n){"use strict";!function(){t.module("ngMaterial",["ng","ngAnimate","ngAria","material.core","material.core.interaction","material.core.gestures","material.core.layout","material.core.meta","material.core.theming.palette","material.core.theming","material.core.animate","material.components.autocomplete","material.components.backdrop","material.components.bottomSheet","material.components.button","material.components.card","material.components.checkbox","material.components.chips","material.components.colors","material.components.content","material.components.datepicker","material.components.dialog","material.components.divider","material.components.fabActions","material.components.fabShared","material.components.fabSpeedDial","material.components.fabToolbar","material.components.gridList","material.components.icon","material.components.input","material.components.list","material.components.menu","material.components.menuBar","material.components.navBar","material.components.progressCircular","material.components.panel","material.components.progressLinear","material.components.radioButton","material.components.showHide","material.components.sidenav","material.components.select","material.components.slider","material.components.sticky","material.components.subheader","material.components.switch","material.components.swipe","material.components.tabs","material.components.toast","material.components.toolbar","material.components.tooltip","material.components.truncate","material.components.virtualRepeat","material.components.whiteframe"])}(),function(){function e(e,t){if(t.has("$swipe")){var n="You are using the ngTouch module. \nAngularJS Material already has mobile click, tap, and swipe support... \nngTouch is not supported with AngularJS Material!";e.warn(n)}}function n(e,t){e.decorator("$$rAF",["$delegate",o]),e.decorator("$q",["$delegate",i]),t.theme("default").primaryPalette("indigo").accentPalette("pink").warnPalette("deep-orange").backgroundPalette("grey")}function o(e){return e.throttle=function(t){var n,o,i,r;return function(){n=arguments,r=this,i=t,o||(o=!0,e(function(){i.apply(r,Array.prototype.slice.call(n)),o=!1}))}},e}function i(e){return e.resolve||(e.resolve=e.when),e}e.$inject=["$log","$injector"],n.$inject=["$provide","$mdThemingProvider"],o.$inject=["$delegate"],i.$inject=["$delegate"],t.module("material.core",["ngAnimate","material.core.animate","material.core.layout","material.core.interaction","material.core.gestures","material.core.theming"]).config(n).run(e)}(),function(){function e(e){function n(n,o,i){function r(e){t.isUndefined(e)&&(e=!0),o.toggleClass("md-autofocus",!!e)}var a=i.mdAutoFocus||i.mdAutofocus||i.mdSidenavFocus;r(e(a)(n)),a&&n.$watch(a,r)}return{restrict:"A",link:{pre:n}}}e.$inject=["$parse"],t.module("material.core").directive("mdAutofocus",e).directive("mdAutoFocus",e).directive("mdSidenavFocus",e)}(),function(){function e(){function e(e){var t="#"===e[0]?e.substr(1):e,n=t.length/3,o=t.substr(0,n),i=t.substr(n,n),r=t.substr(2*n);return 1===n&&(o+=o,i+=i,r+=r),"rgba("+parseInt(o,16)+","+parseInt(i,16)+","+parseInt(r,16)+",0.1)"}function t(e){e=e.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);var t=e&&4===e.length?"#"+("0"+parseInt(e[1],10).toString(16)).slice(-2)+("0"+parseInt(e[2],10).toString(16)).slice(-2)+("0"+parseInt(e[3],10).toString(16)).slice(-2):"";return t.toUpperCase()}function n(e){return e.replace(")",", 0.1)").replace("(","a(")}function o(e){return e?e.replace("rgba","rgb").replace(/,[^\),]+\)/,")"):"rgb(0,0,0)"}return{rgbaToHex:t,hexToRgba:e,rgbToRgba:n,rgbaToRgb:o}}t.module("material.core").factory("$mdColorUtil",e)}(),function(){function e(){function e(e){var t=a+"-"+e,i=o(t),d=i.charAt(0).toLowerCase()+i.substring(1);return n(r,e)?e:n(r,i)?i:n(r,d)?d:e}function n(e,n){return t.isDefined(e.style[n])}function o(e){return e.replace(s,function(e,t,n,o){return o?n.toUpperCase():n})}function i(e){var t,n,o=/^(Moz|webkit|ms)(?=[A-Z])/;for(t in e.style)if(n=o.exec(t))return n[0]}var r=document.createElement("div"),a=i(r),d=/webkit/i.test(a),s=/([:\-_]+(.))/g,c={isInputKey:function(e){return e.keyCode>=31&&e.keyCode<=90},isNumPadKey:function(e){return 3===e.location&&e.keyCode>=97&&e.keyCode<=105},isMetaKey:function(e){return e.keyCode>=91&&e.keyCode<=93},isFnLockKey:function(e){return e.keyCode>=112&&e.keyCode<=145},isNavigationKey:function(e){var t=c.KEY_CODE,n=[t.SPACE,t.ENTER,t.UP_ARROW,t.DOWN_ARROW];return n.indexOf(e.keyCode)!=-1},hasModifierKey:function(e){return e.ctrlKey||e.metaKey||e.altKey},ELEMENT_MAX_PIXELS:1533917,BEFORE_NG_ARIA:210,KEY_CODE:{COMMA:188,SEMICOLON:186,ENTER:13,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,TAB:9,BACKSPACE:8,DELETE:46},CSS:{TRANSITIONEND:"transitionend"+(d?" webkitTransitionEnd":""),ANIMATIONEND:"animationend"+(d?" webkitAnimationEnd":""),TRANSFORM:e("transform"),TRANSFORM_ORIGIN:e("transformOrigin"),TRANSITION:e("transition"),TRANSITION_DURATION:e("transitionDuration"),ANIMATION_PLAY_STATE:e("animationPlayState"),ANIMATION_DURATION:e("animationDuration"),ANIMATION_NAME:e("animationName"),ANIMATION_TIMING:e("animationTimingFunction"),ANIMATION_DIRECTION:e("animationDirection")},MEDIA:{xs:"(max-width: 599px)","gt-xs":"(min-width: 600px)",sm:"(min-width: 600px) and (max-width: 959px)","gt-sm":"(min-width: 960px)",md:"(min-width: 960px) and (max-width: 1279px)","gt-md":"(min-width: 1280px)",lg:"(min-width: 1280px) and (max-width: 1919px)","gt-lg":"(min-width: 1920px)",xl:"(min-width: 1920px)",landscape:"(orientation: landscape)",portrait:"(orientation: portrait)",print:"print"},MEDIA_PRIORITY:["xl","gt-lg","lg","gt-md","md","gt-sm","sm","gt-xs","xs","landscape","portrait","print"]};return c}t.module("material.core").factory("$mdConstant",e)}(),function(){function e(e,n){function o(){return[].concat(v)}function i(){return v.length}function r(e){return v.length&&e>-1&&e<v.length}function a(e){return!!e&&r(u(e)+1)}function d(e){return!!e&&r(u(e)-1)}function s(e){return r(e)?v[e]:null}function c(e,t){return v.filter(function(n){return n[e]===t})}function l(e,n){return e?(t.isNumber(n)||(n=v.length),v.splice(n,0,e),u(e)):-1}function m(e){p(e)&&v.splice(u(e),1)}function u(e){return v.indexOf(e)}function p(e){return e&&u(e)>-1}function h(){return v.length?v[0]:null}function f(){return v.length?v[v.length-1]:null}function g(e,o,i,a){i=i||b;for(var d=u(o);;){if(!r(d))return null;var s=d+(e?-1:1),c=null;if(r(s)?c=v[s]:n&&(c=e?f():h(),s=u(c)),null===c||s===a)return null;if(i(c))return c;t.isUndefined(a)&&(a=s),d=s}}var b=function(){return!0};e&&!t.isArray(e)&&(e=Array.prototype.slice.call(e)),n=!!n;var v=e||[];return{items:o,count:i,inRange:r,contains:p,indexOf:u,itemAt:s,findBy:c,add:l,remove:m,first:h,last:f,next:t.bind(null,g,!1),previous:t.bind(null,g,!0),hasPrevious:d,hasNext:a}}t.module("material.core").config(["$provide",function(t){t.decorator("$mdUtil",["$delegate",function(t){return t.iterator=e,t}])}])}(),function(){function e(e,n,o){function i(e){var n=u[e];t.isUndefined(n)&&(n=u[e]=r(e));var o=h[n];return t.isUndefined(o)&&(o=a(n)),o}function r(t){return e.MEDIA[t]||("("!==t.charAt(0)?"("+t+")":t)}function a(e){var t=p[e];return t||(t=p[e]=o.matchMedia(e)),t.addListener(d),h[t.media]=!!t.matches}function d(e){n.$evalAsync(function(){h[e.media]=!!e.matches})}function s(e){return p[e]}function c(t,n){for(var o=0;o<e.MEDIA_PRIORITY.length;o++){var i=e.MEDIA_PRIORITY[o];if(p[u[i]].matches){var r=m(t,n+"-"+i);if(t[r])return t[r]}}return t[m(t,n)]}function l(n,o,i){var r=[];return n.forEach(function(n){var a=m(o,n);t.isDefined(o[a])&&r.push(o.$observe(a,t.bind(void 0,i,null)));for(var d in e.MEDIA)a=m(o,n+"-"+d),t.isDefined(o[a])&&r.push(o.$observe(a,t.bind(void 0,i,d)))}),function(){r.forEach(function(e){e()})}}function m(e,t){return f[t]||(f[t]=e.$normalize(t))}var u={},p={},h={},f={};return i.getResponsiveAttribute=c,i.getQuery=s,i.watchResponsiveAttributes=l,i}e.$inject=["$mdConstant","$rootScope","$window"],t.module("material.core").factory("$mdMedia",e)}(),function(){function e(e,n){function o(e){return e=t.isArray(e)?e:[e],e.forEach(function(t){s.forEach(function(n){e.push(n+"-"+t)})}),e}function i(e){return e=t.isArray(e)?e:[e],o(e).map(function(e){return"["+e+"]"}).join(",")}function r(e,t){if(e=d(e),!e)return!1;for(var n=o(t),i=0;i<n.length;i++)if(e.hasAttribute(n[i]))return!0;return!1}function a(e,t){e=d(e),e&&o(t).forEach(function(t){e.removeAttribute(t)})}function d(e){if(e=e[0]||e,e.nodeType)return e}var s=["data","x"];return e?n?i(e):o(e):{buildList:o,buildSelector:i,hasAttribute:r,removeAttribute:a}}t.module("material.core").config(["$provide",function(t){t.decorator("$mdUtil",["$delegate",function(t){return t.prefixer=e,t}])}])}(),function(){function o(o,r,a,d,s,c,l,m,u,p){function h(e){return e?f(e)||g(e)?e:e+"px":"0"}function f(e){return String(e).indexOf("px")>-1}function g(e){return String(e).indexOf("%")>-1}function b(e){return e[0]||e}var v=c.startSymbol(),E=c.endSymbol(),$="{{"===v&&"}}"===E,C=function(e,n,o){var i=!1;if(e&&e.length){var r=u.getComputedStyle(e[0]);i=t.isDefined(r[n])&&(!o||r[n]==o)}return i},y={dom:{},now:e.performance&&e.performance.now?t.bind(e.performance,e.performance.now):Date.now||function(){return(new Date).getTime()},getModelOption:function(e,t){if(e.$options){var n=e.$options;return n.getOption?n.getOption(t):n[t]}},bidi:function(e,n,i,r){var a=!("rtl"==o[0].dir||"rtl"==o[0].body.dir);if(0==arguments.length)return a?"ltr":"rtl";var d=t.element(e);a&&t.isDefined(i)?d.css(n,h(i)):!a&&t.isDefined(r)&&d.css(n,h(r))},bidiProperty:function(e,n,i,r){var a=!("rtl"==o[0].dir||"rtl"==o[0].body.dir),d=t.element(e);a&&t.isDefined(n)?(d.css(n,h(r)),d.css(i,"")):!a&&t.isDefined(i)&&(d.css(i,h(r)),d.css(n,""))},clientRect:function(e,t,n){var o=b(e);t=b(t||o.offsetParent||document.body);var i=o.getBoundingClientRect(),r=n?t.getBoundingClientRect():{left:0,top:0,width:0,height:0};return{left:i.left-r.left,top:i.top-r.top,width:i.width,height:i.height}},offsetRect:function(e,t){return y.clientRect(e,t,!0)},nodesToArray:function(e){e=e||[];for(var t=[],n=0;n<e.length;++n)t.push(e.item(n));return t},getViewportTop:function(){return e.scrollY||e.pageYOffset||0},findFocusTarget:function(e,n){function o(e,n){var o,i=e[0].querySelectorAll(n);return i&&i.length&&i.length&&t.forEach(i,function(e){e=t.element(e);var n=e.hasClass("md-autofocus");n&&(o=e)}),o}var i,r=this.prefixer("md-autofocus",!0);return i=o(e,n||r),i||n==r||(i=o(e,this.prefixer("md-auto-focus",!0)),i||(i=o(e,r))),i},disableScrollAround:function(e,n,i){function r(e){function n(e){e.preventDefault()}e=t.element(e||d);var o;return i.disableScrollMask?o=e:(o=t.element('<div class="md-scroll-mask">  <div class="md-scroll-mask-bar"></div></div>'),e.append(o)),o.on("wheel",n),o.on("touchmove",n),function(){o.off("wheel"),o.off("touchmove"),i.disableScrollMask||o[0].parentNode.removeChild(o[0])}}function a(){var e=o[0].documentElement,n=e.style.cssText||"",i=d.style.cssText||"",r=y.getViewportTop(),a=d.clientWidth,s=d.scrollHeight>d.clientHeight+1;return s&&t.element(d).css({position:"fixed",width:"100%",top:-r+"px"}),d.clientWidth<a&&(d.style.overflow="hidden"),s&&(e.style.overflowY="scroll"),function(){d.style.cssText=i,e.style.cssText=n,d.scrollTop=r}}if(i=i||{},y.disableScrollAround._count=Math.max(0,y.disableScrollAround._count||0),y.disableScrollAround._count++,y.disableScrollAround._restoreScroll)return y.disableScrollAround._restoreScroll;var d=o[0].body,s=a(),c=r(n);return y.disableScrollAround._restoreScroll=function(){--y.disableScrollAround._count<=0&&(s(),c(),delete y.disableScrollAround._restoreScroll)}},enableScrolling:function(){var e=this.disableScrollAround._restoreScroll;e&&e()},floatingScrollbars:function(){if(this.floatingScrollbars.cached===n){var e=t.element("<div><div></div></div>").css({width:"100%","z-index":-1,position:"absolute",height:"35px","overflow-y":"scroll"});e.children().css("height","60px"),o[0].body.appendChild(e[0]),this.floatingScrollbars.cached=e[0].offsetWidth==e[0].childNodes[0].offsetWidth,e.remove()}return this.floatingScrollbars.cached},forceFocus:function(t){var n=t[0]||t;document.addEventListener("click",function i(e){e.target===n&&e.$focus&&(n.focus(),e.stopImmediatePropagation(),e.preventDefault(),n.removeEventListener("click",i))},!0);var o=document.createEvent("MouseEvents");o.initMouseEvent("click",!1,!0,e,{},0,0,0,0,!1,!1,!1,!1,0,null),o.$material=!0,o.$focus=!0,n.dispatchEvent(o)},createBackdrop:function(e,t){return a(y.supplant('<md-backdrop class="{0}">',[t]))(e)},supplant:function(e,t,n){return n=n||/\{([^\{\}]*)\}/g,e.replace(n,function(e,n){var o=n.split("."),i=t;try{for(var r in o)o.hasOwnProperty(r)&&(i=i[o[r]])}catch(a){i=e}return"string"==typeof i||"number"==typeof i?i:e})},fakeNgModel:function(){return{$fake:!0,$setTouched:t.noop,$setViewValue:function(e){this.$viewValue=e,this.$render(e),this.$viewChangeListeners.forEach(function(e){e()})},$isEmpty:function(e){return 0===(""+e).length},$parsers:[],$formatters:[],$viewChangeListeners:[],$render:t.noop}},debounce:function(e,t,o,i){var a;return function(){var d=o,s=Array.prototype.slice.call(arguments);r.cancel(a),a=r(function(){a=n,e.apply(d,s)},t||10,i)}},throttle:function(e,t){var n;return function(){var o=this,i=arguments,r=y.now();(!n||r-n>t)&&(e.apply(o,i),n=r)}},time:function(e){var t=y.now();return e(),y.now()-t},valueOnUse:function(e,t,n){var o=null,i=Array.prototype.slice.call(arguments),r=i.length>3?i.slice(3):[];Object.defineProperty(e,t,{get:function(){return null===o&&(o=n.apply(e,r)),o}})},nextUid:function(){return""+i++},disconnectScope:function(e){if(e&&e.$root!==e&&!e.$$destroyed){var t=e.$parent;e.$$disconnected=!0,t.$$childHead===e&&(t.$$childHead=e.$$nextSibling),t.$$childTail===e&&(t.$$childTail=e.$$prevSibling),e.$$prevSibling&&(e.$$prevSibling.$$nextSibling=e.$$nextSibling),e.$$nextSibling&&(e.$$nextSibling.$$prevSibling=e.$$prevSibling),e.$$nextSibling=e.$$prevSibling=null}},reconnectScope:function(e){if(e&&e.$root!==e&&e.$$disconnected){var t=e,n=t.$parent;t.$$disconnected=!1,t.$$prevSibling=n.$$childTail,n.$$childHead?(n.$$childTail.$$nextSibling=t,n.$$childTail=t):n.$$childHead=n.$$childTail=t}},getClosest:function(e,n,o){if(t.isString(n)){var i=n.toUpperCase();n=function(e){return e.nodeName.toUpperCase()===i}}if(e instanceof t.element&&(e=e[0]),o&&(e=e.parentNode),!e)return null;do if(n(e))return e;while(e=e.parentNode);return null},elementContains:function(n,o){var i=e.Node&&e.Node.prototype&&Node.prototype.contains,r=i?t.bind(n,n.contains):t.bind(n,function(e){return n===o||!!(16&this.compareDocumentPosition(e))});return r(o)},extractElementByName:function(e,n,o,i){function r(e){return a(e)||(o?d(e):null)}function a(e){if(e)for(var t=0,o=e.length;t<o;t++)if(e[t].nodeName.toLowerCase()===n)return e[t];return null}function d(e){var t;if(e)for(var n=0,o=e.length;n<o;n++){var i=e[n];if(!t)for(var a=0,d=i.childNodes.length;a<d;a++)t=t||r([i.childNodes[a]])}return t}var s=r(e);return!s&&i&&l.warn(y.supplant("Unable to find node '{0}' in element '{1}'.",[n,e[0].outerHTML])),t.element(s||e)},initOptionalProperties:function(e,n,o){o=o||{},t.forEach(e.$$isolateBindings,function(i,r){if(i.optional&&t.isUndefined(e[r])){var a=t.isDefined(n[i.attrName]);e[r]=t.isDefined(o[r])?o[r]:a}})},nextTick:function(e,t,n){function o(){var e=i.queue,t=i.digest;i.queue=[],i.timeout=null,i.digest=!1,e.forEach(function(e){var t=e.scope&&e.scope.$$destroyed;t||e.callback()}),t&&d.$digest()}var i=y.nextTick,a=i.timeout,s=i.queue||[];return s.push({scope:n,callback:e}),null==t&&(t=!0),i.digest=i.digest||t,i.queue=s,a||(i.timeout=r(o,0,!1))},processTemplate:function(e){return $?e:e&&t.isString(e)?e.replace(/\{\{/g,v).replace(/}}/g,E):e},getParentWithPointerEvents:function(e){for(var t=e.parent();C(t,"pointer-events","none");)t=t.parent();return t},getNearestContentElement:function(e){for(var t=e.parent()[0];t&&t!==m[0]&&t!==document.body&&"MD-CONTENT"!==t.nodeName.toUpperCase();)t=t.parentNode;return t},checkStickySupport:function(){var e,n=t.element("<div>");o[0].body.appendChild(n[0]);for(var i=["sticky","-webkit-sticky"],r=0;r<i.length;++r)if(n.css({position:i[r],top:0,"z-index":2}),n.css("position")==i[r]){e=i[r];break}return n.remove(),e},parseAttributeBoolean:function(e,t){return""===e||!!e&&(t===!1||"false"!==e&&"0"!==e)},hasComputedStyle:C,isParentFormSubmitted:function(e){var n=y.getClosest(e,"form"),o=n?t.element(n).controller("form"):null;return!!o&&o.$submitted},animateScrollTo:function(e,t,n){function o(){var n=i();e.scrollTop=n,(s?n<t:n>t)&&p(o)}function i(){var e=n||1e3,t=y.now()-c;return r(t,a,d,e)}function r(e,t,n,o){if(e>o)return t+n;var i=(e/=o)*e,r=i*e;return t+n*(-2*r+3*i)}var a=e.scrollTop,d=t-a,s=a<t,c=y.now();p(o)},uniq:function(e){if(e)return e.filter(function(e,t,n){return n.indexOf(e)===t})}};return y.dom.animator=s(y),y}o.$inject=["$document","$timeout","$compile","$rootScope","$$mdAnimate","$interpolate","$log","$rootElement","$window","$$rAF"];var i=0;t.module("material.core").factory("$mdUtil",o),t.element.prototype.focus=t.element.prototype.focus||function(){return this.length&&this[0].focus(),this},t.element.prototype.blur=t.element.prototype.blur||function(){return this.length&&this[0].blur(),this}}(),function(){function e(e,t,n,o,i){this.$q=e,this.$templateRequest=t,this.$injector=n,this.$compile=o,this.$controller=i}e.$inject=["$q","$templateRequest","$injector","$compile","$controller"],t.module("material.core").service("$mdCompiler",e),e.prototype.compile=function(e){return e.contentElement?this._prepareContentElement(e):this._compileTemplate(e)},e.prototype._prepareContentElement=function(e){var t=this._fetchContentElement(e);return this.$q.resolve({element:t.element,cleanup:t.restore,locals:{},link:function(){return t.element}})},e.prototype._compileTemplate=function(e){var n=this,o=e.templateUrl,i=e.template||"",r=t.extend({},e.resolve),a=t.extend({},e.locals),d=e.transformTemplate||t.identity;return t.forEach(r,function(e,o){t.isString(e)?r[o]=n.$injector.get(e):r[o]=n.$injector.invoke(e)}),t.extend(r,a),o?r.$$ngTemplate=this.$templateRequest(o):r.$$ngTemplate=this.$q.when(i),this.$q.all(r).then(function(o){var i=d(o.$$ngTemplate,e),r=e.element||t.element("<div>").html(i.trim()).contents();return n._compileElement(o,r,e)})},e.prototype._compileElement=function(e,n,o){function i(i){if(e.$scope=i,o.controller){var s=t.extend(e,{$element:n}),c=r.$controller(o.controller,s,!0,o.controllerAs);o.bindToController&&t.extend(c.instance,e);var l=c();n.data("$ngControllerController",l),n.children().data("$ngControllerController",l),d.controller=l}return a(i)}var r=this,a=this.$compile(n),d={element:n,cleanup:n.remove.bind(n),locals:e,link:i};return d},e.prototype._fetchContentElement=function(e){function n(e){var t=e.parentNode,n=e.nextElementSibling;return function(){n?t.insertBefore(e,n):t.appendChild(e)}}var o=e.contentElement,i=null;return t.isString(o)?(o=document.querySelector(o),i=n(o)):(o=o[0]||o,i=document.contains(o)?n(o):function(){o.parentNode&&o.parentNode.removeChild(o)}),{element:t.element(o),restore:i}}}(),function(){function e(){function e(){t.showWarnings=!1}var t={showWarnings:!0};return{disableWarnings:e,$get:["$$rAF","$log","$window","$interpolate",function(e,o,i,r){return n.apply(t,arguments)}]}}function n(e,n,o,i){function r(e,o,i){var r=t.element(e)[0]||e;!r||r.hasAttribute(o)&&0!==r.getAttribute(o).length||l(r,o)||(i=t.isString(i)?i.trim():"",i.length?e.attr(o,i):p&&n.warn('ARIA: Attribute "',o,'", required for accessibility, is missing on node:',r))}function a(t,n,o){e(function(){r(t,n,o())})}function d(e,t){var n=c(e)||"",o=n.indexOf(i.startSymbol())>-1;o?a(e,t,function(){return c(e)}):r(e,t,n)}function s(e,t){var n=c(e),o=n.indexOf(i.startSymbol())>-1;o||n||r(e,t,n)}function c(e){function t(t){for(;t.parentNode&&(t=t.parentNode)!==e;)if(t.getAttribute&&"true"===t.getAttribute("aria-hidden"))return!0}e=e[0]||e;for(var n,o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,null,!1),i="";n=o.nextNode();)t(n)||(i+=n.textContent);return i.trim()||""}function l(e,t){function n(e){var t=e.currentStyle?e.currentStyle:o.getComputedStyle(e);return"none"===t.display}var i=e.hasChildNodes(),r=!1;if(i)for(var a=e.childNodes,d=0;d<a.length;d++){var s=a[d];1===s.nodeType&&s.hasAttribute(t)&&(n(s)||(r=!0))}return r}function m(e){var n=t.element(e)[0]||e;return!!n.hasAttribute&&(n.hasAttribute("aria-label")||n.hasAttribute("aria-labelledby")||n.hasAttribute("aria-describedby"))}function u(e,n){function o(e){if(!m(e))return!1;if(e.hasAttribute("role"))switch(e.getAttribute("role").toLowerCase()){case"command":case"definition":case"directory":case"grid":case"list":case"listitem":case"log":case"marquee":case"menu":case"menubar":case"note":case"presentation":case"separator":case"scrollbar":case"status":case"tablist":return!1}switch(e.tagName.toLowerCase()){case"abbr":case"acronym":case"address":case"applet":case"audio":case"b":case"bdi":case"bdo":case"big":case"blockquote":case"br":case"canvas":case"caption":case"center":case"cite":case"code":case"col":case"data":case"dd":case"del":case"dfn":case"dir":case"div":case"dl":case"em":case"embed":case"fieldset":case"figcaption":case"font":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":case"hgroup":case"html":case"i":case"ins":case"isindex":case"kbd":case"keygen":case"label":case"legend":case"li":case"map":case"mark":case"menu":case"object":case"ol":case"output":case"pre":case"presentation":case"q":case"rt":case"ruby":case"samp":case"small":case"source":case"span":case"status":case"strike":case"strong":case"sub":case"sup":case"svg":case"tbody":case"td":case"th":case"thead":case"time":case"tr":case"track":case"tt":case"ul":case"var":return!1}return!0}n=n||1;var i=t.element(e)[0]||e;return!!i.parentNode&&(!!o(i.parentNode)||(n--,!!n&&u(i.parentNode,n)))}var p=this.showWarnings;return{expect:r,expectAsync:a,expectWithText:d,expectWithoutText:s,getText:c,hasAriaLabel:m,parentHasAriaLabel:u}}n.$inject=["$$rAF","$log","$window","$interpolate"],t.module("material.core").provider("$mdAria",e)}(),function(){function n(e,n){this.$timeout=e,this.$mdUtil=n,this.bodyElement=t.element(document.body),this.isBuffering=!1,this.bufferTimeout=null,this.lastInteractionType=null,this.lastInteractionTime=null,this.inputEventMap={keydown:"keyboard",mousedown:"mouse",mouseenter:"mouse",touchstart:"touch",pointerdown:"pointer",MSPointerDown:"pointer"},this.iePointerMap={2:"touch",3:"touch",4:"mouse"},this.initializeEvents()}n.$inject=["$timeout","$mdUtil"],t.module("material.core.interaction",[]).service("$mdInteraction",n),n.prototype.initializeEvents=function(){var t="MSPointerEvent"in e?"MSPointerDown":"PointerEvent"in e?"pointerdown":null;this.bodyElement.on("keydown mousedown",this.onInputEvent.bind(this)),"ontouchstart"in document.documentElement&&this.bodyElement.on("touchstart",this.onBufferInputEvent.bind(this)),t&&this.bodyElement.on(t,this.onInputEvent.bind(this))},n.prototype.onInputEvent=function(e){if(!this.isBuffering){var t=this.inputEventMap[e.type];"pointer"===t&&(t=this.iePointerMap[e.pointerType]||e.pointerType),this.lastInteractionType=t,this.lastInteractionTime=this.$mdUtil.now()}},n.prototype.onBufferInputEvent=function(e){this.$timeout.cancel(this.bufferTimeout),this.onInputEvent(e),this.isBuffering=!0,this.bufferTimeout=this.$timeout(function(){this.isBuffering=!1}.bind(this),650,!1)},n.prototype.getLastInteractionType=function(){return this.lastInteractionType},n.prototype.isUserInvoked=function(e){var n=t.isNumber(e)?e:15;return this.lastInteractionTime>=this.$mdUtil.now()-n}}(),function(){function n(){}function o(n,o,i){function r(e){return function(t,n){n.distance<this.state.options.maxDistance&&this.dispatchEvent(t,e,n)}}function a(e,t,n){var o=h[t.replace(/^\$md./,"")];if(!o)throw new Error("Failed to register element with handler "+t+". Available handlers: "+Object.keys(h).join(", "));return o.registerElement(e,n)}function s(e,o){var i=new n(e);return t.extend(i,o),h[e]=i,v}function c(){for(var e=document.createElement("div"),n=["","webkit","Moz","MS","ms","o"],o=0;o<n.length;o++){var i=n[o],r=i?i+"TouchAction":"touchAction";if(t.isDefined(e.style[r]))return r}}var m=navigator.userAgent||navigator.vendor||e.opera,u=m.match(/ipad|iphone|ipod/i),p=m.match(/android/i),g=c(),b="undefined"!=typeof e.jQuery&&t.element===e.jQuery,v={handler:s,register:a,isHijackingClicks:(u||p)&&!b&&!f};if(v.isHijackingClicks){var E=6;v.handler("click",{options:{maxDistance:E},onEnd:r("click")}),v.handler("focus",{options:{maxDistance:E},onEnd:function(e,t){function n(e){var t=["INPUT","SELECT","BUTTON","TEXTAREA","VIDEO","AUDIO"];return"-1"!=e.getAttribute("tabindex")&&!e.hasAttribute("DISABLED")&&(e.hasAttribute("tabindex")||e.hasAttribute("href")||e.isContentEditable||t.indexOf(e.nodeName)!=-1)}t.distance<this.state.options.maxDistance&&n(e.target)&&(this.dispatchEvent(e,"focus",t),e.target.focus())}}),v.handler("mouseup",{options:{maxDistance:E},onEnd:r("mouseup")}),v.handler("mousedown",{onStart:function(e){this.dispatchEvent(e,"mousedown")}})}return v.handler("press",{onStart:function(e,t){this.dispatchEvent(e,"$md.pressdown")},onEnd:function(e,t){this.dispatchEvent(e,"$md.pressup")}}).handler("hold",{options:{maxDistance:6,delay:500},onCancel:function(){i.cancel(this.state.timeout)},onStart:function(e,n){return this.state.registeredParent?(this.state.pos={x:n.x,y:n.y},void(this.state.timeout=i(t.bind(this,function(){this.dispatchEvent(e,"$md.hold"),this.cancel()}),this.state.options.delay,!1))):this.cancel()},onMove:function(e,t){g||"touchmove"!==e.type||e.preventDefault();var n=this.state.pos.x-t.x,o=this.state.pos.y-t.y;Math.sqrt(n*n+o*o)>this.options.maxDistance&&this.cancel()},onEnd:function(){this.onCancel()}}).handler("drag",{options:{minDistance:6,horizontal:!0,cancelMultiplier:1.5},onSetup:function(e,t){g&&(this.oldTouchAction=e[0].style[g],e[0].style[g]=t.horizontal?"pan-y":"pan-x")},onCleanup:function(e){this.oldTouchAction&&(e[0].style[g]=this.oldTouchAction)},onStart:function(e){this.state.registeredParent||this.cancel()},onMove:function(e,t){var n,o;g||"touchmove"!==e.type||e.preventDefault(),this.state.dragPointer?this.dispatchDragMove(e):(this.state.options.horizontal?(n=Math.abs(t.distanceX)>this.state.options.minDistance,o=Math.abs(t.distanceY)>this.state.options.minDistance*this.state.options.cancelMultiplier):(n=Math.abs(t.distanceY)>this.state.options.minDistance,o=Math.abs(t.distanceX)>this.state.options.minDistance*this.state.options.cancelMultiplier),n?(this.state.dragPointer=d(e),l(e,this.state.dragPointer),this.dispatchEvent(e,"$md.dragstart",this.state.dragPointer)):o&&this.cancel())},dispatchDragMove:o.throttle(function(e){this.state.isRunning&&(l(e,this.state.dragPointer),this.dispatchEvent(e,"$md.drag",this.state.dragPointer))}),onEnd:function(e,t){this.state.dragPointer&&(l(e,this.state.dragPointer),this.dispatchEvent(e,"$md.dragend",this.state.dragPointer))}}).handler("swipe",{options:{minVelocity:.65,minDistance:10},onEnd:function(e,t){var n;Math.abs(t.velocityX)>this.state.options.minVelocity&&Math.abs(t.distanceX)>this.state.options.minDistance?(n="left"==t.directionX?"$md.swipeleft":"$md.swiperight",this.dispatchEvent(e,n)):Math.abs(t.velocityY)>this.state.options.minVelocity&&Math.abs(t.distanceY)>this.state.options.minDistance&&(n="up"==t.directionY?"$md.swipeup":"$md.swipedown",this.dispatchEvent(e,n))}})}function i(e){this.name=e,this.state={}}function r(){function n(e,n,o){o=o||u;var i=new t.element.Event(n);i.$material=!0,i.pointer=o,i.srcEvent=e,t.extend(i,{clientX:o.x,clientY:o.y,screenX:o.x,screenY:o.y,pageX:o.x,pageY:o.y,ctrlKey:e.ctrlKey,altKey:e.altKey,shiftKey:e.shiftKey,metaKey:e.metaKey}),t.element(o.target).trigger(i)}function o(t,n,o){o=o||u;var i;"click"===n||"mouseup"==n||"mousedown"==n?(i=document.createEvent("MouseEvents"),i.initMouseEvent(n,!0,!0,e,t.detail,o.x,o.y,o.x,o.y,t.ctrlKey,t.altKey,t.shiftKey,t.metaKey,t.button,t.relatedTarget||null)):(i=document.createEvent("CustomEvent"),i.initCustomEvent(n,!0,!0,{})),i.$material=!0,i.pointer=o,i.srcEvent=t,o.target.dispatchEvent(i)}var r="undefined"!=typeof e.jQuery&&t.element===e.jQuery;return i.prototype={options:{},dispatchEvent:r?n:o,onSetup:t.noop,onCleanup:t.noop,onStart:t.noop,onMove:t.noop,onEnd:t.noop,onCancel:t.noop,start:function(e,n){if(!this.state.isRunning){var o=this.getNearestParent(e.target),i=o&&o.$mdGesture[this.name]||{};this.state={isRunning:!0,options:t.extend({},this.options,i),registeredParent:o},this.onStart(e,n)}},move:function(e,t){this.state.isRunning&&this.onMove(e,t)},end:function(e,t){this.state.isRunning&&(this.onEnd(e,t),this.state.isRunning=!1)},cancel:function(e,t){this.onCancel(e,t),this.state={}},getNearestParent:function(e){for(var t=e;t;){if((t.$mdGesture||{})[this.name])return t;t=t.parentNode}return null},registerElement:function(e,t){function n(){delete e[0].$mdGesture[o.name],e.off("$destroy",n),o.onCleanup(e,t||{})}var o=this;return e[0].$mdGesture=e[0].$mdGesture||{},e[0].$mdGesture[this.name]=t||{},e.on("$destroy",n),o.onSetup(e,t||{}),n}},i}function a(e,n){function o(e){var t=!e.clientX&&!e.clientY;t||e.$material||e.isIonicTap||c(e)||(e.preventDefault(),e.stopPropagation())}function i(e){var t=0===e.clientX&&0===e.clientY,n=e.target&&"submit"===e.target.type;t||e.$material||e.isIonicTap||c(e)||n?(g=null,"label"==e.target.tagName.toLowerCase()&&(g={x:e.x,y:e.y})):(e.preventDefault(),e.stopPropagation(),g=null)}function r(e,t){var o;for(var i in h)o=h[i],o instanceof n&&("start"===e&&o.cancel(),o[e](t,u))}function a(e){if(!u){var t=+Date.now();p&&!s(e,p)&&t-p.endTime<1500||(u=d(e),r("start",e))}}function m(e){u&&s(e,u)&&(l(e,u),r("move",e))}function f(e){u&&s(e,u)&&(l(e,u),u.endTime=+Date.now(),r("end",e),p=u,u=null)}document.contains||(document.contains=function(e){return document.body.contains(e)}),!b&&e.isHijackingClicks&&(document.addEventListener("click",i,!0),document.addEventListener("mouseup",o,!0),document.addEventListener("mousedown",o,!0),document.addEventListener("focus",o,!0),b=!0);var v="mousedown touchstart pointerdown",E="mousemove touchmove pointermove",$="mouseup mouseleave touchend touchcancel pointerup pointercancel";t.element(document).on(v,a).on(E,m).on($,f).on("$$mdGestureReset",function(){p=u=null})}function d(e){var t=m(e),n={startTime:+Date.now(),target:e.target,type:e.type.charAt(0)};return n.startX=n.x=t.pageX,n.startY=n.y=t.pageY,n}function s(e,t){return e&&t&&e.type.charAt(0)===t.type}function c(e){return g&&g.x==e.x&&g.y==e.y}function l(e,t){var n=m(e),o=t.x=n.pageX,i=t.y=n.pageY;t.distanceX=o-t.startX,t.distanceY=i-t.startY,t.distance=Math.sqrt(t.distanceX*t.distanceX+t.distanceY*t.distanceY),t.directionX=t.distanceX>0?"right":t.distanceX<0?"left":"",t.directionY=t.distanceY>0?"down":t.distanceY<0?"up":"",t.duration=+Date.now()-t.startTime,t.velocityX=t.distanceX/t.duration,t.velocityY=t.distanceY/t.duration}function m(e){return e=e.originalEvent||e,e.touches&&e.touches[0]||e.changedTouches&&e.changedTouches[0]||e}o.$inject=["$$MdGestureHandler","$$rAF","$timeout"],a.$inject=["$mdGesture","$$MdGestureHandler"];var u,p,h={},f=!1,g=null,b=!1;t.module("material.core.gestures",[]).provider("$mdGesture",n).factory("$$MdGestureHandler",r).run(a),n.prototype={skipClickHijack:function(){return f=!0},$get:["$$MdGestureHandler","$$rAF","$timeout",function(e,t,n){return new o(e,t,n)}]}}(),function(){function e(){function e(e){function n(e){return s.optionsFactory=e.options,s.methods=(e.methods||[]).concat(a),c}function o(e,t){return d[e]=t,c}function i(t,n){if(n=n||{},n.methods=n.methods||[],n.options=n.options||function(){return{}},/^cancel|hide|show$/.test(t))throw new Error("Preset '"+t+"' in "+e+" is reserved!");if(n.methods.indexOf("_options")>-1)throw new Error("Method '_options' in "+e+" is reserved!");return s.presets[t]={methods:n.methods.concat(a),
optionsFactory:n.options,argOption:n.argOption},c}function r(n,o){function i(e){return e=e||{},e._options&&(e=e._options),m.show(t.extend({},l,e))}function r(e){return m.destroy(e)}function a(t,n){var i={};return i[e]=u,o.invoke(t||function(){return n},{},i)}var c,l,m=n(),u={hide:m.hide,cancel:m.cancel,show:i,destroy:r};return c=s.methods||[],l=a(s.optionsFactory,{}),t.forEach(d,function(e,t){u[t]=e}),t.forEach(s.presets,function(e,n){function o(e){this._options=t.extend({},i,e)}var i=a(e.optionsFactory,{}),r=(e.methods||[]).concat(c);if(t.extend(i,{$type:n}),t.forEach(r,function(e){o.prototype[e]=function(t){return this._options[e]=t,this}}),e.argOption){var d="show"+n.charAt(0).toUpperCase()+n.slice(1);u[d]=function(e){var t=u[n](e);return u.show(t)}}u[n]=function(n){return arguments.length&&e.argOption&&!t.isObject(n)&&!t.isArray(n)?(new o)[e.argOption](n):new o(n)}}),u}r.$inject=["$$interimElement","$injector"];var a=["onHide","onShow","onRemove"],d={},s={presets:{}},c={setDefaults:n,addPreset:i,addMethod:o,$get:r};return c.addPreset("build",{methods:["controller","controllerAs","resolve","multiple","template","templateUrl","themable","transformTemplate","parent","contentElement"]}),c}function o(e,o,i,r,a,d,s,c,l,m,u){return function(){function p(e){e=e||{};var t=new v(e||{}),n=e.multiple?o.resolve():o.all(C);e.multiple||(n=n.then(function(){var e=y.concat(M.map(E.cancel));return o.all(e)}));var i=n.then(function(){return t.show()["catch"](function(e){return e})["finally"](function(){C.splice(C.indexOf(i),1),M.push(t)})});return C.push(i),t.deferred.promise["catch"](function(e){return e instanceof Error&&u(e),e}),t.deferred.promise}function h(e,t){function i(n){var o=n.remove(e,!1,t||{})["catch"](function(e){return e})["finally"](function(){y.splice(y.indexOf(o),1)});return M.splice(M.indexOf(n),1),y.push(o),n.deferred.promise}return t=t||{},t.closeAll?o.all(M.slice().reverse().map(i)):t.closeTo!==n?o.all(M.slice(t.closeTo).map(i)):i(M[M.length-1])}function f(e,n){var i=M.pop();if(!i)return o.when(e);var r=i.remove(e,!0,n||{})["catch"](function(e){return e})["finally"](function(){y.splice(y.indexOf(r),1)});return y.push(r),i.deferred.promise["catch"](t.noop)}function g(e){return function(){var t=arguments;return M.length?e.apply(E,t):C.length?C[0]["finally"](function(){return e.apply(E,t)}):o.when("No interim elements currently showing up.")}}function b(e){var n=e?null:M.shift(),i=t.element(e).length&&t.element(e)[0].parentNode;if(i){var r=M.filter(function(e){return e.options.element[0]===i});r.length&&(n=r[0],M.splice(M.indexOf(n),1))}return n?n.remove($,!1,{$destroy:!0}):o.when($)}function v(m){function u(){return o(function(e,t){function n(e){y.deferred.reject(e),t(e)}m.onCompiling&&m.onCompiling(m),f(m).then(function(t){M=g(t,m),m.cleanupElement=t.cleanup,T=$(M,m,t.controller).then(e,n)})["catch"](n)})}function p(e,n,i){function r(e){y.deferred.resolve(e)}function a(e){y.deferred.reject(e)}return M?(m=t.extend(m||{},i||{}),m.cancelAutoHide&&m.cancelAutoHide(),m.element.triggerHandler("$mdInterimElementRemove"),m.$destroy===!0?C(m.element,m).then(function(){n&&a(e)||r(e)}):(o.when(T)["finally"](function(){C(m.element,m).then(function(){n?a(e):r(e)},a)}),y.deferred.promise)):o.when(!1)}function h(e){return e=e||{},e.template&&(e.template=s.processTemplate(e.template)),t.extend({preserveScope:!1,cancelAutoHide:t.noop,scope:e.scope||i.$new(e.isolateScope),onShow:function(e,t,n){return d.enter(t,n.parent)},onRemove:function(e,t){return t&&d.leave(t)||o.when()}},e)}function f(e){var t=e.skipCompile?null:c.compile(e);return t||o(function(t){t({locals:{},link:function(){return e.element}})})}function g(e,n){t.extend(e.locals,n);var o=e.link(n.scope);return n.element=o,n.parent=b(o,n),n.themable&&l(o),o}function b(n,o){var i=o.parent;if(i=t.isFunction(i)?i(o.scope,n,o):t.isString(i)?t.element(e[0].querySelector(i)):t.element(i),!(i||{}).length){var r;return a[0]&&a[0].querySelector&&(r=a[0].querySelector(":not(svg) > body")),r||(r=a[0]),"#comment"==r.nodeName&&(r=e[0].body),t.element(r)}return i}function v(){var e,o=t.noop;m.hideDelay&&(e=r(E.hide,m.hideDelay),o=function(){r.cancel(e)}),m.cancelAutoHide=function(){o(),m.cancelAutoHide=n}}function $(e,n,i){var r=n.onShowing||t.noop,a=n.onComplete||t.noop;try{r(n.scope,e,n,i)}catch(d){return o.reject(d)}return o(function(t,r){try{o.when(n.onShow(n.scope,e,n,i)).then(function(){a(n.scope,e,n),v(),t(e)},r)}catch(d){r(d.message)}})}function C(e,n){var i=n.onRemoving||t.noop;return o(function(t,r){try{var a=o.when(n.onRemove(n.scope,e,n)||!0);i(e,a),n.$destroy?(t(e),!n.preserveScope&&n.scope&&a.then(function(){n.scope.$destroy()})):a.then(function(){!n.preserveScope&&n.scope&&n.scope.$destroy(),t(e)},r)}catch(d){r(d.message)}})}var y,M,T=o.when(!0);return m=h(m),y={options:m,deferred:o.defer(),show:u,remove:p}}var E,$=!1,C=[],y=[],M=[];return E={show:p,hide:g(h),cancel:g(f),destroy:b,$injector_:m}}}return o.$inject=["$document","$q","$rootScope","$timeout","$rootElement","$animate","$mdUtil","$mdCompiler","$mdTheming","$injector","$exceptionHandler"],e.$get=o,e}t.module("material.core").provider("$$interimElement",e)}(),function(){!function(){function e(e){function d(e){return e.replace(m,"").replace(u,function(e,t,n,o){return o?n.toUpperCase():n})}var m=/^((?:x|data)[\:\-_])/i,u=/([\:\-\_]+(.))/g,p=["","xs","gt-xs","sm","gt-sm","md","gt-md","lg","gt-lg","xl","print"],h=["layout","flex","flex-order","flex-offset","layout-align"],f=["show","hide","layout-padding","layout-margin"];t.forEach(p,function(n){t.forEach(h,function(t){var o=n?t+"-"+n:t;e.directive(d(o),r(o))}),t.forEach(f,function(t){var o=n?t+"-"+n:t;e.directive(d(o),a(o))})}),e.provider("$$mdLayout",function(){return{$get:t.noop,validateAttributeValue:l,validateAttributeUsage:c,disableLayouts:function(e){A.enabled=e!==!0}}}).directive("mdLayoutCss",o).directive("ngCloak",i("ng-cloak")).directive("layoutWrap",a("layout-wrap")).directive("layoutNowrap",a("layout-nowrap")).directive("layoutNoWrap",a("layout-no-wrap")).directive("layoutFill",a("layout-fill")).directive("layoutLtMd",s("layout-lt-md",!0)).directive("layoutLtLg",s("layout-lt-lg",!0)).directive("flexLtMd",s("flex-lt-md",!0)).directive("flexLtLg",s("flex-lt-lg",!0)).directive("layoutAlignLtMd",s("layout-align-lt-md")).directive("layoutAlignLtLg",s("layout-align-lt-lg")).directive("flexOrderLtMd",s("flex-order-lt-md")).directive("flexOrderLtLg",s("flex-order-lt-lg")).directive("offsetLtMd",s("flex-offset-lt-md")).directive("offsetLtLg",s("flex-offset-lt-lg")).directive("hideLtMd",s("hide-lt-md")).directive("hideLtLg",s("hide-lt-lg")).directive("showLtMd",s("show-lt-md")).directive("showLtLg",s("show-lt-lg")).config(n)}function n(){var e=!!document.querySelector("[md-layouts-disabled]");A.enabled=!e}function o(){return A.enabled=!1,{restrict:"A",priority:"900"}}function i(e){return["$timeout",function(n){return{restrict:"A",priority:-10,compile:function(o){return A.enabled?(o.addClass(e),function(t,o){n(function(){o.removeClass(e)},10,!1)}):t.noop}}}]}function r(e){function n(t,n,o){var i=d(n,e,o),r=o.$observe(o.$normalize(e),i);i(p(e,o,"")),t.$on("$destroy",function(){r()})}return["$mdUtil","$interpolate","$log",function(o,i,r){return g=o,b=i,v=r,{restrict:"A",compile:function(o,i){var r;return A.enabled&&(c(e,i,o,v),l(e,p(e,i,""),m(o,e,i)),r=n),r||t.noop}}}]}function a(e){function n(t,n){n.addClass(e)}return["$mdUtil","$interpolate","$log",function(o,i,r){return g=o,b=i,v=r,{restrict:"A",compile:function(o,i){var r;return A.enabled&&(l(e,p(e,i,""),m(o,e,i)),n(null,o),r=n),r||t.noop}}}]}function d(e,n){var o;return function(i){var r=l(n,i||"");t.isDefined(r)&&(o&&e.removeClass(o),o=r?n+"-"+r.trim().replace($,"-"):n,e.addClass(o))}}function s(e){var n=e.split("-");return["$log",function(o){return o.warn(e+"has been deprecated. Please use a `"+n[0]+"-gt-<xxx>` variant."),t.noop}]}function c(e,t,n,o){var i,r,a,d=n[0].nodeName.toLowerCase();switch(e.replace(E,"")){case"flex":"md-button"!=d&&"fieldset"!=d||(r="<"+d+" "+e+"></"+d+">",a="https://github.com/philipwalton/flexbugs#9-some-html-elements-cant-be-flex-containers",i="Markup '{0}' may not work as expected in IE Browsers. Consult '{1}' for details.",o.warn(g.supplant(i,[r,a])))}}function l(e,n,o){var i;if(!u(n)){switch(e.replace(E,"")){case"layout":h(n,y)||(n=y[0]);break;case"flex":h(n,C)||isNaN(n)&&(n="");break;case"flex-offset":case"flex-order":n&&!isNaN(+n)||(n="0");break;case"layout-align":var r=f(n);n=g.supplant("{main}-{cross}",r);break;case"layout-padding":case"layout-margin":case"layout-fill":case"layout-wrap":case"layout-nowrap":case"layout-nowrap":n=""}n!=i&&(o||t.noop)(n)}return n?n.trim():""}function m(e,t,n){return function(e){u(e)||(n[n.$normalize(t)]=e)}}function u(e){return(e||"").indexOf(b.startSymbol())>-1}function p(e,t,n){var o=t.$normalize(e);return t[o]?t[o].trim().replace($,"-"):n||null}function h(e,t,n){e=n&&e?e.replace($,n):e;var o=!1;return e&&t.forEach(function(t){t=n?t.replace($,n):t,o=o||t===e}),o}function f(e){var t,n={main:"start",cross:"stretch"};return e=e||"",0!==e.indexOf("-")&&0!==e.indexOf(" ")||(e="none"+e),t=e.toLowerCase().trim().replace($,"-").split("-"),t.length&&"space"===t[0]&&(t=[t[0]+"-"+t[1],t[2]]),t.length>0&&(n.main=t[0]||n.main),t.length>1&&(n.cross=t[1]||n.cross),M.indexOf(n.main)<0&&(n.main="start"),T.indexOf(n.cross)<0&&(n.cross="stretch"),n}var g,b,v,E=/(-gt)?-(sm|md|lg|print)/g,$=/\s+/g,C=["grow","initial","auto","none","noshrink","nogrow"],y=["row","column"],M=["","start","center","end","stretch","space-around","space-between"],T=["","start","center","end","stretch"],A={enabled:!0,breakpoints:[]};e(t.module("material.core.layout",["ng"]))}()}(),function(){function e(e){this._$timeout=e,this._liveElement=this._createLiveElement(),this._announceTimeout=100}e.$inject=["$timeout"],t.module("material.core").service("$mdLiveAnnouncer",e),e.prototype.announce=function(e,t){t||(t="polite");var n=this;n._liveElement.textContent="",n._liveElement.setAttribute("aria-live",t),n._$timeout(function(){n._liveElement.textContent=e},n._announceTimeout,!1)},e.prototype._createLiveElement=function(){var e=document.createElement("div");return e.classList.add("md-visually-hidden"),e.setAttribute("role","status"),e.setAttribute("aria-atomic","true"),e.setAttribute("aria-live","polite"),document.body.appendChild(e),e}}(),function(){t.module("material.core.meta",[]).provider("$$mdMeta",function(){function e(e){if(r[e])return!0;var n=document.getElementsByName(e)[0];return!!n&&(r[e]=t.element(n),!0)}function n(n,o){if(e(n),r[n])r[n].attr("content",o);else{var a=t.element('<meta name="'+n+'" content="'+o+'"/>');i.append(a),r[n]=a}return function(){r[n].attr("content",""),r[n].remove(),delete r[n]}}function o(t){if(!e(t))throw Error("$$mdMeta: could not find a meta tag with the name '"+t+"'");return r[t].attr("content")}var i=t.element(document.head),r={},a={setMeta:n,getMeta:o};return t.extend({},a,{$get:function(){return a}})})}(),function(){function e(e,o){function i(e){return e&&""!==e}var r,a=[],d={};return r={notFoundError:function(t,n){e.error((n||"")+"No instance found for handle",t)},getInstances:function(){return a},get:function(e){if(!i(e))return null;var t,n,o;for(t=0,n=a.length;t<n;t++)if(o=a[t],o.$$mdHandle===e)return o;return null},register:function(e,n){function o(){var t=a.indexOf(e);t!==-1&&a.splice(t,1)}function i(){var t=d[n];t&&(t.forEach(function(t){t.resolve(e)}),delete d[n])}return n?(e.$$mdHandle=n,a.push(e),i(),o):t.noop},when:function(e){if(i(e)){var t=o.defer(),a=r.get(e);return a?t.resolve(a):(d[e]===n&&(d[e]=[]),d[e].push(t)),t.promise}return o.reject("Invalid `md-component-id` value.")}}}e.$inject=["$log","$q"],t.module("material.core").factory("$mdComponentRegistry",e)}(),function(){!function(){function e(e){function n(e){return e.hasClass("md-icon-button")?{isMenuItem:e.hasClass("md-menu-item"),fitRipple:!0,center:!0}:{isMenuItem:e.hasClass("md-menu-item"),dimBackground:!0}}return{attach:function(o,i,r){return r=t.extend(n(i),r),e.attach(o,i,r)}}}e.$inject=["$mdInkRipple"],t.module("material.core").factory("$mdButtonInkRipple",e)}()}(),function(){!function(){function e(e){function n(n,o,i){return e.attach(n,o,t.extend({center:!0,dimBackground:!1,fitRipple:!0},i))}return{attach:n}}e.$inject=["$mdInkRipple"],t.module("material.core").factory("$mdCheckboxInkRipple",e)}()}(),function(){!function(){function e(e){function n(n,o,i){return e.attach(n,o,t.extend({center:!1,dimBackground:!0,outline:!1,rippleSize:"full"},i))}return{attach:n}}e.$inject=["$mdInkRipple"],t.module("material.core").factory("$mdListInkRipple",e)}()}(),function(){function e(e,n){return{controller:t.noop,link:function(t,o,i){i.hasOwnProperty("mdInkRippleCheckbox")?n.attach(t,o):e.attach(t,o)}}}function n(){function e(){n=!0}var n=!1;return{disableInkRipple:e,$get:["$injector",function(e){function i(i,r,a){return n||r.controller("mdNoInk")?t.noop:e.instantiate(o,{$scope:i,$element:r,rippleOptions:a})}return{attach:i}}]}}function o(e,n,o,i,r,a,d){this.$window=i,this.$timeout=r,this.$mdUtil=a,this.$mdColorUtil=d,this.$scope=e,this.$element=n,this.options=o,this.mousedown=!1,this.ripples=[],this.timeout=null,this.lastRipple=null,a.valueOnUse(this,"container",this.createContainer),this.$element.addClass("md-ink-ripple"),(n.controller("mdInkRipple")||{}).createRipple=t.bind(this,this.createRipple),(n.controller("mdInkRipple")||{}).setColor=t.bind(this,this.color),this.bindEvents()}function i(e,n){(e.mousedown||e.lastRipple)&&(e.mousedown=!1,e.$mdUtil.nextTick(t.bind(e,n),!1))}function r(){return{controller:t.noop}}o.$inject=["$scope","$element","rippleOptions","$window","$timeout","$mdUtil","$mdColorUtil"],e.$inject=["$mdButtonInkRipple","$mdCheckboxInkRipple"],t.module("material.core").provider("$mdInkRipple",n).directive("mdInkRipple",e).directive("mdNoInk",r).directive("mdNoBar",r).directive("mdNoStretch",r);var a=450;o.prototype.color=function(e){function n(){var e=o.options&&o.options.colorElement?o.options.colorElement:[],t=e.length?e[0]:o.$element[0];return t?o.$window.getComputedStyle(t).color:"rgb(0,0,0)"}var o=this;return t.isDefined(e)&&(o._color=o._parseColor(e)),o._color||o._parseColor(o.inkRipple())||o._parseColor(n())},o.prototype.calculateColor=function(){return this.color()},o.prototype._parseColor=function(e,t){t=t||1;var n=this.$mdColorUtil;if(e)return 0===e.indexOf("rgba")?e.replace(/\d?\.?\d*\s*\)\s*$/,(.1*t).toString()+")"):0===e.indexOf("rgb")?n.rgbToRgba(e):0===e.indexOf("#")?n.hexToRgba(e):void 0},o.prototype.bindEvents=function(){this.$element.on("mousedown",t.bind(this,this.handleMousedown)),this.$element.on("mouseup touchend",t.bind(this,this.handleMouseup)),this.$element.on("mouseleave",t.bind(this,this.handleMouseup)),this.$element.on("touchmove",t.bind(this,this.handleTouchmove))},o.prototype.handleMousedown=function(e){if(!this.mousedown)if(e.hasOwnProperty("originalEvent")&&(e=e.originalEvent),this.mousedown=!0,this.options.center)this.createRipple(this.container.prop("clientWidth")/2,this.container.prop("clientWidth")/2);else if(e.srcElement!==this.$element[0]){var t=this.$element[0].getBoundingClientRect(),n=e.clientX-t.left,o=e.clientY-t.top;this.createRipple(n,o)}else this.createRipple(e.offsetX,e.offsetY)},o.prototype.handleMouseup=function(){i(this,this.clearRipples)},o.prototype.handleTouchmove=function(){i(this,this.deleteRipples)},o.prototype.deleteRipples=function(){for(var e=0;e<this.ripples.length;e++)this.ripples[e].remove()},o.prototype.clearRipples=function(){for(var e=0;e<this.ripples.length;e++)this.fadeInComplete(this.ripples[e])},o.prototype.createContainer=function(){var e=t.element('<div class="md-ripple-container"></div>');return this.$element.append(e),e},o.prototype.clearTimeout=function(){this.timeout&&(this.$timeout.cancel(this.timeout),this.timeout=null)},o.prototype.isRippleAllowed=function(){var e=this.$element[0];do{if(!e.tagName||"BODY"===e.tagName)break;if(e&&t.isFunction(e.hasAttribute)){if(e.hasAttribute("disabled"))return!1;if("false"===this.inkRipple()||"0"===this.inkRipple())return!1}}while(e=e.parentNode);return!0},o.prototype.inkRipple=function(){return this.$element.attr("md-ink-ripple")},o.prototype.createRipple=function(e,n){function o(e,t,n){return e?Math.max(t,n):Math.sqrt(Math.pow(t,2)+Math.pow(n,2))}if(this.isRippleAllowed()){var i=this,r=i.$mdColorUtil,d=t.element('<div class="md-ripple"></div>'),s=this.$element.prop("clientWidth"),c=this.$element.prop("clientHeight"),l=2*Math.max(Math.abs(s-e),e),m=2*Math.max(Math.abs(c-n),n),u=o(this.options.fitRipple,l,m),p=this.calculateColor();d.css({left:e+"px",top:n+"px",background:"black",width:u+"px",height:u+"px",backgroundColor:r.rgbaToRgb(p),borderColor:r.rgbaToRgb(p)}),this.lastRipple=d,this.clearTimeout(),this.timeout=this.$timeout(function(){i.clearTimeout(),i.mousedown||i.fadeInComplete(d)},.35*a,!1),this.options.dimBackground&&this.container.css({backgroundColor:p}),this.container.append(d),this.ripples.push(d),d.addClass("md-ripple-placed"),this.$mdUtil.nextTick(function(){d.addClass("md-ripple-scaled md-ripple-active"),i.$timeout(function(){i.clearRipples()},a,!1)},!1)}},o.prototype.fadeInComplete=function(e){this.lastRipple===e?this.timeout||this.mousedown||this.removeRipple(e):this.removeRipple(e)},o.prototype.removeRipple=function(e){var t=this,n=this.ripples.indexOf(e);n<0||(this.ripples.splice(this.ripples.indexOf(e),1),e.removeClass("md-ripple-active"),e.addClass("md-ripple-remove"),0===this.ripples.length&&this.container.css({backgroundColor:""}),this.$timeout(function(){t.fadeOutComplete(e)},a,!1))},o.prototype.fadeOutComplete=function(e){e.remove(),this.lastRipple=null}}(),function(){!function(){function e(e){function n(n,o,i){return e.attach(n,o,t.extend({center:!1,dimBackground:!0,outline:!1,rippleSize:"full"},i))}return{attach:n}}e.$inject=["$mdInkRipple"],t.module("material.core").factory("$mdTabInkRipple",e)}()}(),function(){t.module("material.core.theming.palette",[]).constant("$mdColorPalette",{red:{50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000",contrastDefaultColor:"light",contrastDarkColors:"50 100 200 300 A100",contrastStrongLightColors:"400 500 600 700 A200 A400 A700"},pink:{50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f",A100:"#ff80ab",A200:"#ff4081",A400:"#f50057",A700:"#c51162",contrastDefaultColor:"light",contrastDarkColors:"50 100 200 A100",contrastStrongLightColors:"500 600 A200 A400 A700"},purple:{50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff",contrastDefaultColor:"light",contrastDarkColors:"50 100 200 A100",contrastStrongLightColors:"300 400 A200 A400 A700"},"deep-purple":{50:"#ede7f6",100:"#d1c4e9",200:"#b39ddb",300:"#9575cd",400:"#7e57c2",500:"#673ab7",600:"#5e35b1",700:"#512da8",800:"#4527a0",900:"#311b92",A100:"#b388ff",A200:"#7c4dff",A400:"#651fff",A700:"#6200ea",contrastDefaultColor:"light",contrastDarkColors:"50 100 200 A100",contrastStrongLightColors:"300 400 A200"},indigo:{50:"#e8eaf6",100:"#c5cae9",200:"#9fa8da",300:"#7986cb",400:"#5c6bc0",500:"#3f51b5",600:"#3949ab",700:"#303f9f",800:"#283593",900:"#1a237e",A100:"#8c9eff",A200:"#536dfe",A400:"#3d5afe",A700:"#304ffe",contrastDefaultColor:"light",contrastDarkColors:"50 100 200 A100",contrastStrongLightColors:"300 400 A200 A400"},blue:{50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff",contrastDefaultColor:"light",contrastDarkColors:"50 100 200 300 400 A100",contrastStrongLightColors:"500 600 700 A200 A400 A700"},"light-blue":{50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea",contrastDefaultColor:"dark",contrastLightColors:"600 700 800 900 A700",contrastStrongLightColors:"600 700 800 A700"},cyan:{50:"#e0f7fa",100:"#b2ebf2",200:"#80deea",300:"#4dd0e1",400:"#26c6da",500:"#00bcd4",600:"#00acc1",700:"#0097a7",800:"#00838f",900:"#006064",A100:"#84ffff",A200:"#18ffff",A400:"#00e5ff",A700:"#00b8d4",contrastDefaultColor:"dark",contrastLightColors:"700 800 900",contrastStrongLightColors:"700 800 900"},teal:{50:"#e0f2f1",100:"#b2dfdb",200:"#80cbc4",300:"#4db6ac",400:"#26a69a",500:"#009688",600:"#00897b",700:"#00796b",800:"#00695c",900:"#004d40",A100:"#a7ffeb",A200:"#64ffda",A400:"#1de9b6",A700:"#00bfa5",contrastDefaultColor:"dark",contrastLightColors:"500 600 700 800 900",contrastStrongLightColors:"500 600 700"},green:{50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853",contrastDefaultColor:"dark",contrastLightColors:"500 600 700 800 900",contrastStrongLightColors:"500 600 700"},"light-green":{50:"#f1f8e9",100:"#dcedc8",200:"#c5e1a5",300:"#aed581",400:"#9ccc65",500:"#8bc34a",600:"#7cb342",700:"#689f38",800:"#558b2f",900:"#33691e",A100:"#ccff90",A200:"#b2ff59",A400:"#76ff03",A700:"#64dd17",contrastDefaultColor:"dark",contrastLightColors:"700 800 900",contrastStrongLightColors:"700 800 900"},lime:{50:"#f9fbe7",100:"#f0f4c3",200:"#e6ee9c",300:"#dce775",400:"#d4e157",500:"#cddc39",600:"#c0ca33",700:"#afb42b",800:"#9e9d24",900:"#827717",A100:"#f4ff81",A200:"#eeff41",A400:"#c6ff00",A700:"#aeea00",contrastDefaultColor:"dark",contrastLightColors:"900",contrastStrongLightColors:"900"},yellow:{50:"#fffde7",100:"#fff9c4",200:"#fff59d",300:"#fff176",400:"#ffee58",500:"#ffeb3b",600:"#fdd835",700:"#fbc02d",800:"#f9a825",900:"#f57f17",A100:"#ffff8d",A200:"#ffff00",A400:"#ffea00",A700:"#ffd600",contrastDefaultColor:"dark"},amber:{50:"#fff8e1",100:"#ffecb3",200:"#ffe082",300:"#ffd54f",400:"#ffca28",500:"#ffc107",600:"#ffb300",700:"#ffa000",800:"#ff8f00",900:"#ff6f00",A100:"#ffe57f",A200:"#ffd740",A400:"#ffc400",A700:"#ffab00",contrastDefaultColor:"dark"},orange:{50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00",contrastDefaultColor:"dark",contrastLightColors:"800 900",contrastStrongLightColors:"800 900"},"deep-orange":{50:"#fbe9e7",100:"#ffccbc",200:"#ffab91",300:"#ff8a65",400:"#ff7043",500:"#ff5722",600:"#f4511e",700:"#e64a19",800:"#d84315",900:"#bf360c",A100:"#ff9e80",A200:"#ff6e40",A400:"#ff3d00",A700:"#dd2c00",contrastDefaultColor:"light",contrastDarkColors:"50 100 200 300 400 A100 A200",contrastStrongLightColors:"500 600 700 800 900 A400 A700"},brown:{50:"#efebe9",100:"#d7ccc8",200:"#bcaaa4",300:"#a1887f",400:"#8d6e63",500:"#795548",600:"#6d4c41",700:"#5d4037",800:"#4e342e",900:"#3e2723",A100:"#d7ccc8",A200:"#bcaaa4",A400:"#8d6e63",A700:"#5d4037",contrastDefaultColor:"light",contrastDarkColors:"50 100 200 A100 A200",contrastStrongLightColors:"300 400"},grey:{50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#ffffff",A200:"#000000",A400:"#303030",A700:"#616161",contrastDefaultColor:"dark",contrastLightColors:"600 700 800 900 A200 A400 A700"},"blue-grey":{50:"#eceff1",100:"#cfd8dc",200:"#b0bec5",300:"#90a4ae",400:"#78909c",500:"#607d8b",600:"#546e7a",700:"#455a64",800:"#37474f",900:"#263238",A100:"#cfd8dc",A200:"#b0bec5",A400:"#78909c",A700:"#455a64",contrastDefaultColor:"light",contrastDarkColors:"50 100 200 300 A100 A200",contrastStrongLightColors:"400 500 700"}})}(),function(){!function(e){function t(e){var t=!!document.querySelector("[md-themes-disabled]");e.disableTheming(t)}function o(t,o){function i(e,t){return t=t||{},p[e]=a(e,t),h}function r(t,n){return a(t,e.extend({},p[t]||{},n))}function a(e,t){var n=w.filter(function(e){return!t[e]});if(n.length)throw new Error("Missing colors %1 in palette %2!".replace("%1",n.join(", ")).replace("%2",e));return t}function s(t,n){if(E[t])return E[t];n=n||"default";var o="string"==typeof n?E[n]:n,i=new l(t);return o&&e.forEach(o.colors,function(t,n){i.colors[n]={name:t.name,hues:e.extend({},t.hues)}}),E[t]=i,i}function l(t){function n(t){if(t=0===arguments.length||!!t,t!==o.isDark){o.isDark=t,o.foregroundPalette=o.isDark?g:f,o.foregroundShadow=o.isDark?b:v;var n=o.isDark?A:T,i=o.isDark?T:A;return e.forEach(n,function(e,t){var n=o.colors[t],r=i[t];if(n)for(var a in n.hues)n.hues[a]===r[a]&&(n.hues[a]=e[a])}),o}}var o=this;o.name=t,o.colors={},o.dark=n,n(!1),y.forEach(function(t){var n=(o.isDark?A:T)[t];o[t+"Palette"]=function(i,r){var a=o.colors[t]={name:i,hues:e.extend({},n,r)};return Object.keys(a.hues).forEach(function(e){if(!n[e])throw new Error("Invalid hue name '%1' in theme %2's %3 color %4. Available hue names: %4".replace("%1",e).replace("%2",o.name).replace("%3",i).replace("%4",Object.keys(n).join(", ")))}),Object.keys(a.hues).map(function(e){return a.hues[e]}).forEach(function(e){if(w.indexOf(e)==-1)throw new Error("Invalid hue value '%1' in theme %2's %3 color %4. Available hue values: %5".replace("%1",e).replace("%2",o.name).replace("%3",t).replace("%4",i).replace("%5",w.join(", ")))}),o},o[t+"Color"]=function(){var e=Array.prototype.slice.call(arguments);return console.warn("$mdThemingProviderTheme."+t+"Color() has been deprecated. Use $mdThemingProviderTheme."+t+"Palette() instead."),o[t+"Palette"].apply(o,e)}})}function m(t,o,i,r){function a(e){return e===n||""===e||l.THEMES[e]!==n}function d(e,t){function n(){return d&&d.$mdTheme||("default"==C?"":C)}function i(t){if(t){a(t)||r.warn("Attempted to use unregistered theme '"+t+"'. Register it with $mdThemingProvider.theme().");var n=e.data("$mdThemeName");n&&e.removeClass("md-"+n+"-theme"),e.addClass("md-"+t+"-theme"),e.data("$mdThemeName",t),d&&e.data("$mdThemeController",d)}}var d=t.controller("mdTheme")||e.data("$mdThemeController");if(i(n()),d)var s=$||d.$shouldWatch||o.parseAttributeBoolean(e.attr("md-theme-watch")),c=d.registerChanges(function(t){i(t),s?e.on("$destroy",c):c()})}var l=function(e,o){o===n&&(o=e,e=n),e===n&&(e=t),l.inherit(o,o)};return Object.defineProperty(l,"THEMES",{get:function(){return e.extend({},E)}}),Object.defineProperty(l,"PALETTES",{get:function(){return e.extend({},p)}}),Object.defineProperty(l,"ALWAYS_WATCH",{get:function(){return $}}),l.inherit=d,l.registered=a,l.defaultTheme=function(){return C},l.generateTheme=function(e){c(E[e],e,k.nonce)},l.defineTheme=function(e,t){t=t||{};var n=s(e);return t.primary&&n.primaryPalette(t.primary),t.accent&&n.accentPalette(t.accent),t.warn&&n.warnPalette(t.warn),t.background&&n.backgroundPalette(t.background),t.dark&&n.dark(),this.generateTheme(e),i.resolve(e)},l.setBrowserColor=_,l}m.$inject=["$rootScope","$mdUtil","$q","$log"],p={};var h,E={},$=!1,C="default";e.extend(p,t);var M=function(e){var t=o.setMeta("theme-color",e),n=o.setMeta("msapplication-navbutton-color",e);return function(){t(),n()}},_=function(t){t=e.isObject(t)?t:{};var n=t.theme||"default",o=t.hue||"800",i=p[t.palette]||p[E[n].colors[t.palette||"primary"].name],r=e.isObject(i[o])?i[o].hex:i[o];return M(r)};return h={definePalette:i,extendPalette:r,theme:s,configuration:function(){return e.extend({},k,{defaultTheme:C,alwaysWatchTheme:$,registeredStyles:[].concat(k.registeredStyles)})},disableTheming:function(t){k.disableTheming=e.isUndefined(t)||!!t},registerStyles:function(e){k.registeredStyles.push(e)},setNonce:function(e){k.nonce=e},generateThemesOnDemand:function(e){k.generateOnDemand=e},setDefaultTheme:function(e){C=e},alwaysWatchTheme:function(e){$=e},enableBrowserColor:_,$get:m,_LIGHT_DEFAULT_HUES:T,_DARK_DEFAULT_HUES:A,_PALETTES:p,_THEMES:E,_parseRules:d,_rgba:u}}function i(t,n,o,i,r,a){return{priority:101,link:{pre:function(d,s,c){var l=[],m=n.startSymbol(),u=n.endSymbol(),p=c.mdTheme.trim(),h=p.substr(0,m.length)===m&&p.lastIndexOf(u)===p.length-u.length,f="::",g=c.mdTheme.split(m).join("").split(u).join("").trim().substr(0,f.length)===f,b={registerChanges:function(t,n){return n&&(t=e.bind(n,t)),l.push(t),function(){var e=l.indexOf(t);e>-1&&l.splice(e,1)}},$setTheme:function(e){t.registered(e)||a.warn("attempted to use unregistered theme '"+e+"'"),b.$mdTheme=e;for(var n=l.length;n--;)l[n](e)},$shouldWatch:i.parseAttributeBoolean(s.attr("md-theme-watch"))||t.ALWAYS_WATCH||h&&!g};s.data("$mdThemeController",b);var v=function(){var e=n(c.mdTheme)(d);return o(e)(d)||e},E=function(t){return"string"==typeof t?b.$setTheme(t):void r.when(e.isFunction(t)?t():t).then(function(e){b.$setTheme(e)})};E(v());var $=d.$watch(v,function(e){e&&(E(e),b.$shouldWatch||$())})}}}}function r(){return k.disableTheming=!0,{restrict:"A",priority:"900"}}function a(e){return e}function d(t,n,o){l(t,n),o=o.replace(/THEME_NAME/g,t.name);var i=[],r=t.colors[n],a=new RegExp("\\.md-"+t.name+"-theme","g"),d=new RegExp("('|\")?{{\\s*("+n+")-(color|contrast)-?(\\d\\.?\\d*)?\\s*}}(\"|')?","g"),s=/'?"?\{\{\s*([a-zA-Z]+)-(A?\d+|hue\-[0-3]|shadow|default)-?(\d\.?\d*)?(contrast)?\s*\}\}'?"?/g,c=p[r.name];return o=o.replace(s,function(e,n,o,i,r){return"foreground"===n?"shadow"==o?t.foregroundShadow:t.foregroundPalette[o]||t.foregroundPalette[1]:(0!==o.indexOf("hue")&&"default"!==o||(o=t.colors[n].hues[o]),u((p[t.colors[n].name][o]||"")[r?"contrast":"value"],i))}),e.forEach(r.hues,function(e,n){var r=o.replace(d,function(t,n,o,i,r){return u(c[e]["color"===i?"value":"contrast"],r)});if("default"!==n&&(r=r.replace(a,".md-"+t.name+"-theme.md-"+n)),"default"==t.name){var s=/((?:\s|>|\.|\w|-|:|\(|\)|\[|\]|"|'|=)*)\.md-default-theme((?:\s|>|\.|\w|-|:|\(|\)|\[|\]|"|'|=)*)/g;r=r.replace(s,function(e,t,n){return e+", "+t+n})}i.push(r)}),i}function s(t,n){function o(t,n){var o=t.contrastDefaultColor,i=t.contrastLightColors||[],r=t.contrastStrongLightColors||[],a=t.contrastDarkColors||[];"string"==typeof i&&(i=i.split(" ")),"string"==typeof r&&(r=r.split(" ")),"string"==typeof a&&(a=a.split(" ")),delete t.contrastDefaultColor,delete t.contrastLightColors,delete t.contrastStrongLightColors,delete t.contrastDarkColors,e.forEach(t,function(n,d){function s(){return"light"===o?a.indexOf(d)>-1?E:r.indexOf(d)>-1?C:$:i.indexOf(d)>-1?r.indexOf(d)>-1?C:$:E}if(!e.isObject(n)){var c=m(n);if(!c)throw new Error("Color %1, in palette %2's hue %3, is invalid. Hex or rgb(a) color expected.".replace("%1",n).replace("%2",t.name).replace("%3",d));t[d]={hex:t[d],value:c,contrast:s()}}})}var i=document.head,r=i?i.firstElementChild:null,a=!k.disableTheming&&t.has("$MD_THEME_CSS")?t.get("$MD_THEME_CSS"):"";if(a+=k.registeredStyles.join(""),r&&0!==a.length){e.forEach(p,o);var d=a.split(/\}(?!(\}|'|"|;))/).filter(function(e){return e&&e.trim().length}).map(function(e){return e.trim()+"}"}),s=new RegExp("md-("+y.join("|")+")","g");y.forEach(function(e){_[e]=""}),d.forEach(function(e){for(var t,n=(e.match(s),0);t=y[n];n++)if(e.indexOf(".md-"+t)>-1)return _[t]+=e;for(n=0;t=y[n];n++)if(e.indexOf(t)>-1)return _[t]+=e;return _[M]+=e}),k.generateOnDemand||e.forEach(n.THEMES,function(e){h[e.name]||"default"!==n.defaultTheme()&&"default"===e.name||c(e,e.name,k.nonce)})}}function c(e,t,n){var o=document.head,i=o?o.firstElementChild:null;h[t]||(y.forEach(function(t){for(var r=d(e,t,_[t]);r.length;){var a=r.shift();if(a){var s=document.createElement("style");s.setAttribute("md-theme-style",""),n&&s.setAttribute("nonce",n),s.appendChild(document.createTextNode(a)),o.insertBefore(s,i)}}}),h[e.name]=!0)}function l(e,t){if(!p[(e.colors[t]||{}).name])throw new Error("You supplied an invalid color palette for theme %1's %2 palette. Available palettes: %3".replace("%1",e.name).replace("%2",t).replace("%3",Object.keys(p).join(", ")))}function m(t){
if(e.isArray(t)&&3==t.length)return t;if(/^rgb/.test(t))return t.replace(/(^\s*rgba?\(|\)\s*$)/g,"").split(",").map(function(e,t){return 3==t?parseFloat(e,10):parseInt(e,10)});if("#"==t.charAt(0)&&(t=t.substring(1)),/^([a-fA-F0-9]{3}){1,2}$/g.test(t)){var n=t.length/3,o=t.substr(0,n),i=t.substr(n,n),r=t.substr(2*n);return 1===n&&(o+=o,i+=i,r+=r),[parseInt(o,16),parseInt(i,16),parseInt(r,16)]}}function u(t,n){return t?(4==t.length&&(t=e.copy(t),n?t.pop():n=t.pop()),n&&("number"==typeof n||"string"==typeof n&&n.length)?"rgba("+t.join(",")+","+n+")":"rgb("+t.join(",")+")"):"rgb('0,0,0')"}t.$inject=["$mdThemingProvider"],i.$inject=["$mdTheming","$interpolate","$parse","$mdUtil","$q","$log"],a.$inject=["$mdTheming"],o.$inject=["$mdColorPalette","$$mdMetaProvider"],s.$inject=["$injector","$mdTheming"],e.module("material.core.theming",["material.core.theming.palette","material.core.meta"]).directive("mdTheme",i).directive("mdThemable",a).directive("mdThemesDisabled",r).provider("$mdTheming",o).config(t).run(s);var p,h={},f={name:"dark",1:"rgba(0,0,0,0.87)",2:"rgba(0,0,0,0.54)",3:"rgba(0,0,0,0.38)",4:"rgba(0,0,0,0.12)"},g={name:"light",1:"rgba(255,255,255,1.0)",2:"rgba(255,255,255,0.7)",3:"rgba(255,255,255,0.5)",4:"rgba(255,255,255,0.12)"},b="1px 1px 0px rgba(0,0,0,0.4), -1px -1px 0px rgba(0,0,0,0.4)",v="",E=m("rgba(0,0,0,0.87)"),$=m("rgba(255,255,255,0.87)"),C=m("rgb(255,255,255)"),y=["primary","accent","warn","background"],M="primary",T={accent:{"default":"A200","hue-1":"A100","hue-2":"A400","hue-3":"A700"},background:{"default":"50","hue-1":"A100","hue-2":"100","hue-3":"300"}},A={background:{"default":"A400","hue-1":"800","hue-2":"900","hue-3":"A200"}};y.forEach(function(e){var t={"default":"500","hue-1":"300","hue-2":"800","hue-3":"A100"};T[e]||(T[e]=t),A[e]||(A[e]=t)});var w=["50","100","200","300","400","500","600","700","800","900","A100","A200","A400","A700"],k={disableTheming:!1,generateOnDemand:!1,registeredStyles:[],nonce:null},_={}}(e.angular)}(),function(){function n(n,o,i,r,a){var d;return d={translate3d:function(e,t,n,o){function i(n){return a(e,{to:n||t,addClass:o.transitionOutClass,removeClass:o.transitionInClass,duration:o.duration}).start()}return a(e,{from:t,to:n,addClass:o.transitionInClass,removeClass:o.transitionOutClass,duration:o.duration}).start().then(function(){return i})},waitTransitionEnd:function(t,n){var a=3e3;return o(function(o,d){function s(e){e&&e.target!==t[0]||(e&&i.cancel(l),t.off(r.CSS.TRANSITIONEND,s),o())}function c(n){return n=n||e.getComputedStyle(t[0]),"0s"==n.transitionDuration||!n.transition&&!n.transitionProperty}n=n||{},c(n.cachedTransitionStyles)&&(a=0);var l=i(s,n.timeout||a);t.on(r.CSS.TRANSITIONEND,s)})},calculateTransformValues:function(e,t){function n(){var t=e?e.parent():null,n=t?t.parent():null;return n?d.clientRect(n):null}var o=t.element,i=t.bounds;if(o||i){var r=o?d.clientRect(o)||n():d.copyRect(i),a=d.copyRect(e[0].getBoundingClientRect()),s=d.centerPointFor(a),c=d.centerPointFor(r);return{centerX:c.x-s.x,centerY:c.y-s.y,scaleX:Math.round(100*Math.min(.5,r.width/a.width))/100,scaleY:Math.round(100*Math.min(.5,r.height/a.height))/100}}return{centerX:0,centerY:0,scaleX:.5,scaleY:.5}},calculateZoomToOrigin:function(e,o){var i="translate3d( {centerX}px, {centerY}px, 0 ) scale( {scaleX}, {scaleY} )",r=t.bind(null,n.supplant,i);return r(d.calculateTransformValues(e,o))},calculateSlideToOrigin:function(e,o){var i="translate3d( {centerX}px, {centerY}px, 0 )",r=t.bind(null,n.supplant,i);return r(d.calculateTransformValues(e,o))},toCss:function(e){function n(e,n,i){t.forEach(n.split(" "),function(e){o[e]=i})}var o={},i="left top right bottom width height x y min-width min-height max-width max-height";return t.forEach(e,function(e,a){if(!t.isUndefined(e))if(i.indexOf(a)>=0)o[a]=e+"px";else switch(a){case"transition":n(a,r.CSS.TRANSITION,e);break;case"transform":n(a,r.CSS.TRANSFORM,e);break;case"transformOrigin":n(a,r.CSS.TRANSFORM_ORIGIN,e);break;case"font-size":o["font-size"]=e}}),o},toTransformCss:function(e,n,o){var i={};return t.forEach(r.CSS.TRANSFORM.split(" "),function(t){i[t]=e}),n&&(o=o||"all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important",i.transition=o),i},copyRect:function(e,n){return e?(n=n||{},t.forEach("left top right bottom width height".split(" "),function(t){n[t]=Math.round(e[t])}),n.width=n.width||n.right-n.left,n.height=n.height||n.bottom-n.top,n):null},clientRect:function(e){var n=t.element(e)[0].getBoundingClientRect(),o=function(e){return e&&e.width>0&&e.height>0};return o(n)?d.copyRect(n):null},centerPointFor:function(e){return e?{x:Math.round(e.left+e.width/2),y:Math.round(e.top+e.height/2)}:{x:0,y:0}}}}t.module("material.core").factory("$$mdAnimate",["$q","$timeout","$mdConstant","$animateCss",function(e,t,o,i){return function(r){return n(r,e,t,o,i)}}])}(),function(){t.version.minor>=4?t.module("material.core.animate",[]):!function(){function e(e){return e.replace(/-[a-z]/g,function(e){return e.charAt(1).toUpperCase()})}var n=t.forEach,o=t.isDefined(document.documentElement.style.WebkitAppearance),i=o?"-webkit-":"",r=(o?"webkitTransitionEnd ":"")+"transitionend",a=(o?"webkitAnimationEnd ":"")+"animationend",d=["$document",function(e){return function(){return e[0].body.clientWidth+1}}],s=["$$rAF",function(e){return function(){var t=!1;return e(function(){t=!0}),function(n){t?n():e(n)}}}],c=["$q","$$rAFMutex",function(e,o){function i(e){this.setHost(e),this._doneCallbacks=[],this._runInAnimationFrame=o(),this._state=0}var r=0,a=1,d=2;return i.prototype={setHost:function(e){this.host=e||{}},done:function(e){this._state===d?e():this._doneCallbacks.push(e)},progress:t.noop,getPromise:function(){if(!this.promise){var t=this;this.promise=e(function(e,n){t.done(function(t){t===!1?n():e()})})}return this.promise},then:function(e,t){return this.getPromise().then(e,t)},"catch":function(e){return this.getPromise()["catch"](e)},"finally":function(e){return this.getPromise()["finally"](e)},pause:function(){this.host.pause&&this.host.pause()},resume:function(){this.host.resume&&this.host.resume()},end:function(){this.host.end&&this.host.end(),this._resolve(!0)},cancel:function(){this.host.cancel&&this.host.cancel(),this._resolve(!1)},complete:function(e){var t=this;t._state===r&&(t._state=a,t._runInAnimationFrame(function(){t._resolve(e)}))},_resolve:function(e){this._state!==d&&(n(this._doneCallbacks,function(t){t(e)}),this._doneCallbacks.length=0,this._state=d)}},i.all=function(e,t){function o(n){r=r&&n,++i===e.length&&t(r)}var i=0,r=!0;n(e,function(e){e.done(o)})},i}];t.module("material.core.animate",[]).factory("$$forceReflow",d).factory("$$AnimateRunner",c).factory("$$rAFMutex",s).factory("$animateCss",["$window","$$rAF","$$AnimateRunner","$$forceReflow","$$jqLite","$timeout","$animate",function(t,d,s,c,l,m,u){function p(o,d){var c=[],l=C(o),p=l&&u.enabled(),g=!1,M=!1;p&&(d.transitionStyle&&c.push([i+"transition",d.transitionStyle]),d.keyframeStyle&&c.push([i+"animation",d.keyframeStyle]),d.delay&&c.push([i+"transition-delay",d.delay+"s"]),d.duration&&c.push([i+"transition-duration",d.duration+"s"]),g=d.keyframeStyle||d.to&&(d.duration>0||d.transitionStyle),M=!!d.addClass||!!d.removeClass,y(o,!0));var T=p&&(g||M);E(o,d);var A,w,k=!1;return{close:t.close,start:function(){function t(){if(!k)return k=!0,A&&w&&o.off(A,w),h(o,d),v(o,d),n(c,function(t){l.style[e(t[0])]=""}),u.complete(!0),u}var u=new s;return b(function(){if(y(o,!1),!T)return t();n(c,function(t){var n=t[0],o=t[1];l.style[e(n)]=o}),h(o,d);var s=f(o);if(0===s.duration)return t();var u=[];d.easing&&(s.transitionDuration&&u.push([i+"transition-timing-function",d.easing]),s.animationDuration&&u.push([i+"animation-timing-function",d.easing])),d.delay&&s.animationDelay&&u.push([i+"animation-delay",d.delay+"s"]),d.duration&&s.animationDuration&&u.push([i+"animation-duration",d.duration+"s"]),n(u,function(t){var n=t[0],o=t[1];l.style[e(n)]=o,c.push(t)});var p=s.delay,g=1e3*p,b=s.duration,v=1e3*b,E=Date.now();A=[],s.transitionDuration&&A.push(r),s.animationDuration&&A.push(a),A=A.join(" "),w=function(e){e.stopPropagation();var n=e.originalEvent||e,o=n.timeStamp||Date.now(),i=parseFloat(n.elapsedTime.toFixed(3));Math.max(o-E,0)>=g&&i>=b&&t()},o.on(A,w),$(o,d),m(t,g+1.5*v,!1)}),u}}}function h(e,t){t.addClass&&(l.addClass(e,t.addClass),t.addClass=null),t.removeClass&&(l.removeClass(e,t.removeClass),t.removeClass=null)}function f(e){function n(e){return o?"Webkit"+e.charAt(0).toUpperCase()+e.substr(1):e}var i=C(e),r=t.getComputedStyle(i),a=g(r[n("transitionDuration")]),d=g(r[n("animationDuration")]),s=g(r[n("transitionDelay")]),c=g(r[n("animationDelay")]);d*=parseInt(r[n("animationIterationCount")],10)||1;var l=Math.max(d,a),m=Math.max(c,s);return{duration:l,delay:m,animationDuration:d,transitionDuration:a,animationDelay:c,transitionDelay:s}}function g(e){var t=0,o=(e||"").split(/\s*,\s*/);return n(o,function(e){"s"==e.charAt(e.length-1)&&(e=e.substring(0,e.length-1)),e=parseFloat(e)||0,t=t?Math.max(e,t):e}),t}function b(e){M&&M(),T.push(e),M=d(function(){M=null;for(var e=c(),t=0;t<T.length;t++)T[t](e);T.length=0})}function v(e,t){E(e,t),$(e,t)}function E(e,t){t.from&&(e.css(t.from),t.from=null)}function $(e,t){t.to&&(e.css(t.to),t.to=null)}function C(e){for(var t=0;t<e.length;t++)if(1===e[t].nodeType)return e[t]}function y(t,n){var o=C(t),r=e(i+"transition-delay");o.style[r]=n?"-9999s":""}var M,T=[];return p}])}()}(),function(){t.module("material.components.autocomplete",["material.core","material.components.icon","material.components.virtualRepeat"])}(),function(){t.module("material.components.backdrop",["material.core"]).directive("mdBackdrop",["$mdTheming","$mdUtil","$animate","$rootElement","$window","$log","$$rAF","$document",function(e,n,o,i,r,a,d,s){function c(c,m,u){function p(){var e=parseInt(h.height,10)+Math.abs(parseInt(h.top,10));m.css("height",e+"px")}o.pin&&o.pin(m,i);var h;d(function(){if(h=r.getComputedStyle(s[0].body),"fixed"===h.position){var o=n.debounce(function(){h=r.getComputedStyle(s[0].body),p()},60,null,!1);p(),t.element(r).on("resize",o),c.$on("$destroy",function(){t.element(r).off("resize",o)})}var i=m.parent();if(i.length){"BODY"===i[0].nodeName&&m.css("position","fixed");var d=r.getComputedStyle(i[0]);"static"===d.position&&a.warn(l),e.inherit(m,i)}})}var l="<md-backdrop> may not work properly in a scrolled, static-positioned parent container.";return{restrict:"E",link:c}}])}(),function(){function e(e){return{restrict:"E",link:function(t,n){n.addClass("_md"),t.$on("$destroy",function(){e.destroy()})}}}function n(e){function n(e,n,r,a,d,s,c,l){function m(o,i,c,m){if(i=r.extractElementByName(i,"md-bottom-sheet"),i.attr("tabindex","-1"),i.hasClass("ng-cloak")){var u="$mdBottomSheet: using `<md-bottom-sheet ng-cloak >` will affect the bottom-sheet opening animations.";l.warn(u,i[0])}c.disableBackdrop||(h=r.createBackdrop(o,"md-bottom-sheet-backdrop md-opaque"),h[0].tabIndex=-1,c.clickOutsideToClose&&h.on("click",function(){r.nextTick(d.cancel,!0)}),a.inherit(h,c.parent),e.enter(h,c.parent,null));var f=new p(i,c.parent);return c.bottomSheet=f,a.inherit(f.element,c.parent),c.disableParentScroll&&(c.restoreScroll=r.disableScrollAround(f.element,c.parent)),e.enter(f.element,c.parent,h).then(function(){var e=r.findFocusTarget(i)||t.element(i[0].querySelector("button")||i[0].querySelector("a")||i[0].querySelector(r.prefixer("ng-click",!0)))||h;c.escapeToClose&&(c.rootElementKeyupCallback=function(e){e.keyCode===n.KEY_CODE.ESCAPE&&r.nextTick(d.cancel,!0)},s.on("keyup",c.rootElementKeyupCallback),e&&e.focus())})}function u(t,n,o){var i=o.bottomSheet;return o.disableBackdrop||e.leave(h),e.leave(i.element).then(function(){o.disableParentScroll&&(o.restoreScroll(),delete o.restoreScroll),i.cleanup()})}function p(e,t){function a(t){e.css(n.CSS.TRANSITION_DURATION,"0ms")}function s(t){var o=t.pointer.distanceY;o<5&&(o=Math.max(-i,o/2)),e.css(n.CSS.TRANSFORM,"translate3d(0,"+(i+o)+"px,0)")}function l(t){if(t.pointer.distanceY>0&&(t.pointer.distanceY>20||Math.abs(t.pointer.velocityY)>o)){var i=e.prop("offsetHeight")-t.pointer.distanceY,a=Math.min(i/t.pointer.velocityY*.75,500);e.css(n.CSS.TRANSITION_DURATION,a+"ms"),r.nextTick(d.cancel,!0)}else e.css(n.CSS.TRANSITION_DURATION,""),e.css(n.CSS.TRANSFORM,"")}var m=c.register(t,"drag",{horizontal:!1});return t.on("$md.dragstart",a).on("$md.drag",s).on("$md.dragend",l),{element:e,cleanup:function(){m(),t.off("$md.dragstart",a),t.off("$md.drag",s),t.off("$md.dragend",l)}}}var h;return{themable:!0,onShow:m,onRemove:u,disableBackdrop:!1,escapeToClose:!0,clickOutsideToClose:!0,disableParentScroll:!0}}n.$inject=["$animate","$mdConstant","$mdUtil","$mdTheming","$mdBottomSheet","$rootElement","$mdGesture","$log"];var o=.5,i=80;return e("$mdBottomSheet").setDefaults({methods:["disableParentScroll","escapeToClose","clickOutsideToClose"],options:n})}e.$inject=["$mdBottomSheet"],n.$inject=["$$interimElementProvider"],t.module("material.components.bottomSheet",["material.core","material.components.backdrop"]).directive("mdBottomSheet",e).provider("$mdBottomSheet",n)}(),function(){function e(e){return{restrict:"E",link:function(t,n){e(n)}}}function n(e,n,o,i){function r(e){return t.isDefined(e.href)||t.isDefined(e.ngHref)||t.isDefined(e.ngLink)||t.isDefined(e.uiSref)}function a(e,t){if(r(t))return'<a class="md-button" ng-transclude></a>';var n="undefined"==typeof t.type?"button":t.type;return'<button class="md-button" type="'+n+'" ng-transclude></button>'}function d(a,d,s){n(d),e.attach(a,d),o.expectWithoutText(d,"aria-label"),r(s)&&t.isDefined(s.ngDisabled)&&a.$watch(s.ngDisabled,function(e){d.attr("tabindex",e?-1:0)}),d.on("click",function(e){s.disabled===!0&&(e.preventDefault(),e.stopImmediatePropagation())}),d.hasClass("md-no-focus")||(d.on("focus",function(){i.isUserInvoked()&&"keyboard"!==i.getLastInteractionType()||d.addClass("md-focused")}),d.on("blur",function(){d.removeClass("md-focused")}))}return{restrict:"EA",replace:!0,transclude:!0,template:a,link:d}}n.$inject=["$mdButtonInkRipple","$mdTheming","$mdAria","$mdInteraction"],e.$inject=["$mdTheming"],t.module("material.components.button",["material.core"]).directive("mdButton",n).directive("a",e)}(),function(){function e(e){return{restrict:"E",link:function(t,n,o){n.addClass("_md"),e(n)}}}e.$inject=["$mdTheming"],t.module("material.components.card",["material.core"]).directive("mdCard",e)}(),function(){function e(e,n,o,i,r,a){function d(d,s){function c(d,s,c,l){function m(e,t,n){c[e]&&d.$watch(c[e],function(e){n[e]&&s.attr(t,n[e])})}function u(e){var t=e.which||e.keyCode;t!==o.KEY_CODE.SPACE&&t!==o.KEY_CODE.ENTER||(e.preventDefault(),s.addClass("md-focused"),p(e))}function p(e){s[0].hasAttribute("disabled")||d.skipToggle||d.$apply(function(){var t=c.ngChecked&&c.ngClick?c.checked:!v.$viewValue;v.$setViewValue(t,e&&e.type),v.$render()})}function h(){s.toggleClass("md-checked",!!v.$viewValue&&!g)}function f(e){g=e!==!1,g&&s.attr("aria-checked","mixed"),s.toggleClass("md-indeterminate",g)}var g,b=l[0],v=l[1]||r.fakeNgModel(),E=l[2];if(b){var $=b.isErrorGetter||function(){return v.$invalid&&(v.$touched||E&&E.$submitted)};b.input=s,d.$watch($,b.setInvalid)}i(s),s.children().on("focus",function(){s.focus()}),r.parseAttributeBoolean(c.mdIndeterminate)&&(f(),d.$watch(c.mdIndeterminate,f)),c.ngChecked&&d.$watch(d.$eval.bind(d,c.ngChecked),function(e){v.$setViewValue(e),v.$render()}),m("ngDisabled","tabindex",{"true":"-1","false":c.tabindex}),n.expectWithText(s,"aria-label"),e.link.pre(d,{on:t.noop,0:{}},c,[v]),s.on("click",p).on("keypress",u).on("focus",function(){"keyboard"===a.getLastInteractionType()&&s.addClass("md-focused")}).on("blur",function(){s.removeClass("md-focused")}),v.$render=h}return s.$set("tabindex",s.tabindex||"0"),s.$set("type","checkbox"),s.$set("role",s.type),{pre:function(e,t){t.on("click",function(e){this.hasAttribute("disabled")&&e.stopImmediatePropagation()})},post:c}}return e=e[0],{restrict:"E",transclude:!0,require:["^?mdInputContainer","?ngModel","?^form"],priority:o.BEFORE_NG_ARIA,template:'<div class="md-container" md-ink-ripple md-ink-ripple-checkbox><div class="md-icon"></div></div><div ng-transclude class="md-label"></div>',compile:d}}e.$inject=["inputDirective","$mdAria","$mdConstant","$mdTheming","$mdUtil","$mdInteraction"],t.module("material.components.checkbox",["material.core"]).directive("mdCheckbox",e)}(),function(){t.module("material.components.chips",["material.core","material.components.autocomplete"])}(),function(){!function(){function e(e,n,o){function r(e,t){try{t&&e.css(s(t))}catch(n){o.error(n.message)}}function a(e){var t=l(e);return d(t)}function d(t,o){o=o||!1;var i=e.PALETTES[t.palette][t.hue];return i=o?i.contrast:i.value,n.supplant("rgba({0}, {1}, {2}, {3})",[i[0],i[1],i[2],i[3]||t.opacity])}function s(e){var n={},o=e.hasOwnProperty("color");return t.forEach(e,function(e,t){var i=l(e),r=t.indexOf("background")>-1;n[t]=d(i),r&&!o&&(n.color=d(i,!0))}),n}function c(n){return t.isDefined(e.THEMES[n.split("-")[0]])}function l(n){var o=n.split("-"),i=t.isDefined(e.THEMES[o[0]]),r=i?o.splice(0,1)[0]:e.defaultTheme();return{theme:r,palette:m(o,r),hue:u(o,r),opacity:o[2]||1}}function m(t,o){var r=t.length>1&&i.indexOf(t[1])!==-1,a=t[0].replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();if(r&&(a=t[0]+"-"+t.splice(1,1)),i.indexOf(a)===-1){var d=e.THEMES[o].colors[a];if(!d)throw new Error(n.supplant("mdColors: couldn't find '{palette}' in the palettes.",{palette:a}));a=d.name}return a}function u(t,o){var i=e.THEMES[o].colors;if("hue"===t[1]){var r=parseInt(t.splice(2,1)[0],10);if(r<1||r>3)throw new Error(n.supplant("mdColors: 'hue-{hueNumber}' is not a valid hue, can be only 'hue-1', 'hue-2' and 'hue-3'",{hueNumber:r}));if(t[1]="hue-"+r,!(t[0]in i))throw new Error(n.supplant("mdColors: 'hue-x' can only be used with [{availableThemes}], but was used with '{usedTheme}'",{availableThemes:Object.keys(i).join(", "),usedTheme:t[0]}));return i[t[0]].hues[t[1]]}return t[1]||i[t[0]in i?t[0]:"primary"].hues["default"]}return i=i||Object.keys(e.PALETTES),{applyThemeColors:r,getThemeColor:a,hasTheme:c}}function n(e,n,i,r){return{restrict:"A",require:["^?mdTheme"],compile:function(a,d){function s(){var e=d.mdColors,i=e.indexOf("::")>-1,r=!!i||o.test(d.mdColors);d.mdColors=e.replace("::","");var a=t.isDefined(d.mdColorsWatch);return!i&&!r&&(!a||n.parseAttributeBoolean(d.mdColorsWatch))}var c=s();return function(n,o,a,d){var s=d[0],l={},m=function(t){"string"!=typeof t&&(t=""),a.mdColors||(a.mdColors="{}");var o=r(a.mdColors)(n);return s&&Object.keys(o).forEach(function(n){var i=o[n];e.hasTheme(i)||(o[n]=(t||s.$mdTheme)+"-"+i)}),u(o),o},u=function(e){if(!t.equals(e,l)){var n=Object.keys(l);l.background&&!n.color&&n.push("color"),n.forEach(function(e){o.css(e,"")})}l=e},p=t.noop;s&&(p=s.registerChanges(function(t){e.applyThemeColors(o,m(t))})),n.$on("$destroy",function(){p()});try{c?n.$watch(m,t.bind(this,e.applyThemeColors,o),!0):e.applyThemeColors(o,m())}catch(h){i.error(h.message)}}}}}n.$inject=["$mdColors","$mdUtil","$log","$parse"],e.$inject=["$mdTheming","$mdUtil","$log"];var o=/^{((\s|,)*?["'a-zA-Z-]+?\s*?:\s*?('|")[a-zA-Z0-9-.]*('|"))+\s*}$/,i=null;t.module("material.components.colors",["material.core"]).directive("mdColors",n).service("$mdColors",e)}()}(),function(){function e(e){function t(e,t){this.$scope=e,this.$element=t}return{restrict:"E",controller:["$scope","$element",t],link:function(t,o){o.addClass("_md"),e(o),t.$broadcast("$mdContentLoaded",o),n(o[0])}}}function n(e){t.element(e).on("$md.pressdown",function(t){"t"===t.pointer.type&&(t.$materialScrollFixed||(t.$materialScrollFixed=!0,0===e.scrollTop?e.scrollTop=1:e.scrollHeight===e.scrollTop+e.offsetHeight&&(e.scrollTop-=1)))})}e.$inject=["$mdTheming"],t.module("material.components.content",["material.core"]).directive("mdContent",e)}(),function(){t.module("material.components.datepicker",["material.core","material.components.icon","material.components.virtualRepeat"])}(),function(){function e(e,n,o){return{restrict:"E",link:function(i,r){r.addClass("_md"),n(r),e(function(){function e(){r.toggleClass("md-content-overflow",a.scrollHeight>a.clientHeight)}var n,a=r[0].querySelector("md-dialog-content");a&&(n=a.getElementsByTagName("img"),e(),t.element(n).on("load",e)),i.$on("$destroy",function(){o.destroy(r)})})}}}function o(e){function o(e,t){return{template:['<md-dialog md-theme="{{ dialog.theme || dialog.defaultTheme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">','  <md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">','    <h2 class="md-title">{{ dialog.title }}</h2>','    <div ng-if="::dialog.mdHtmlContent" class="md-dialog-content-body" ','        ng-bind-html="::dialog.mdHtmlContent"></div>','    <div ng-if="::!dialog.mdHtmlContent" class="md-dialog-content-body">',"      <p>{{::dialog.mdTextContent}}</p>","    </div>",'    <md-input-container md-no-float ng-if="::dialog.$type == \'prompt\'" class="md-prompt-input-container">','      <input ng-keypress="dialog.keypress($event)" md-autofocus ng-model="dialog.result"              placeholder="{{::dialog.placeholder}}">',"    </md-input-container>","  </md-dialog-content>","  <md-dialog-actions>",'    <md-button ng-if="dialog.$type === \'confirm\' || dialog.$type === \'prompt\'"               ng-click="dialog.abort()" class="md-primary md-cancel-button">',"      {{ dialog.cancel }}","    </md-button>",'    <md-button ng-click="dialog.hide()" class="md-primary md-confirm-button" md-autofocus="dialog.$type===\'alert\'">',"      {{ dialog.ok }}","    </md-button>","  </md-dialog-actions>","</md-dialog>"].join("").replace(/\s\s+/g,""),controller:function(){var n="prompt"==this.$type;n&&this.initialValue&&(this.result=this.initialValue),this.hide=function(){e.hide(!n||this.result)},this.abort=function(){e.cancel()},this.keypress=function(n){n.keyCode===t.KEY_CODE.ENTER&&e.hide(this.result)}},controllerAs:"dialog",bindToController:!0}}function i(e,o,i,d,s,c,l,m,u,p,h,f,g){function b(e){e.defaultTheme=h.defaultTheme(),C(e)}function v(e,t,n,o){if(o){var i=o.htmlContent||n.htmlContent||"",r=o.textContent||n.textContent||o.content||n.content||"";if(i&&!p.has("$sanitize"))throw Error("The ngSanitize module must be loaded in order to use htmlContent.");if(i&&r)throw Error("md-dialog cannot have both `htmlContent` and `textContent`");o.mdHtmlContent=i,o.mdTextContent=r}}function E(e,n,o,r){function a(){n[0].querySelector(".md-actions")&&u.warn("Using a class of md-actions is deprecated, please use <md-dialog-actions>.")}function d(){function e(){return n[0].querySelector(".dialog-close, md-dialog-actions button:last-child")}if(o.focusOnOpen){var t=i.findFocusTarget(n)||e()||s;t.focus()}}t.element(c[0].body).addClass("md-dialog-is-showing");var s=n.find("md-dialog");if(s.hasClass("ng-cloak")){var l="$mdDialog: using `<md-dialog ng-cloak>` will affect the dialog opening animations.";u.warn(l,n[0])}return y(o),A(s,o),T(e,n,o),M(n,o),_(n,o).then(function(){w(n,o),a(),d()})}function $(e,n,o){function i(){return x(n,o)}function d(){t.element(c[0].body).removeClass("md-dialog-is-showing"),o.contentElement&&o.reverseContainerStretch(),o.cleanupElement(),o.$destroy||"keyboard"!==o.originInteraction||o.origin.focus()}return o.deactivateListeners(),o.unlockScreenReader(),o.hideBackdrop(o.$destroy),r&&r.parentNode&&r.parentNode.removeChild(r),a&&a.parentNode&&a.parentNode.removeChild(a),o.$destroy?d():i().then(d)}function C(e){var n;e.targetEvent&&e.targetEvent.target&&(n=t.element(e.targetEvent.target));var o=n&&n.controller("mdTheme");if(o){e.themeWatch=o.$shouldWatch;var i=e.theme||o.$mdTheme;i&&(e.scope.theme=i);var r=o.registerChanges(function(t){e.scope.theme=t,e.themeWatch||r()})}}function y(e){function o(e,o){var i=t.element(e||{});if(i&&i.length){var r={top:0,left:0,height:0,width:0},a=t.isFunction(i[0].getBoundingClientRect);return t.extend(o||{},{element:a?i:n,bounds:a?i[0].getBoundingClientRect():t.extend({},r,i[0]),focus:t.bind(i,i.focus)})}}function i(e,n){return t.isString(e)&&(e=c[0].querySelector(e)),t.element(e||n)}e.origin=t.extend({element:null,bounds:null,focus:t.noop},e.origin||{}),e.parent=i(e.parent,m),e.closeTo=o(i(e.closeTo)),e.openFrom=o(i(e.openFrom)),e.targetEvent&&(e.origin=o(e.targetEvent.target,e.origin),e.originInteraction=g.getLastInteractionType())}function M(n,o){var r=t.element(l),a=i.debounce(function(){k(n,o)},60),s=[],c=function(){var t="alert"==o.$type?e.hide:e.cancel;i.nextTick(t,!0)};if(o.escapeToClose){var m=o.parent,u=function(e){e.keyCode===d.KEY_CODE.ESCAPE&&(e.stopPropagation(),e.preventDefault(),c())};n.on("keydown",u),m.on("keydown",u),s.push(function(){n.off("keydown",u),m.off("keydown",u)})}if(r.on("resize",a),s.push(function(){r.off("resize",a)}),o.clickOutsideToClose){var p,h=n,f=function(e){p=e.target},g=function(e){p===h[0]&&e.target===h[0]&&(e.stopPropagation(),e.preventDefault(),c())};h.on("mousedown",f),h.on("mouseup",g),s.push(function(){h.off("mousedown",f),h.off("mouseup",g)})}o.deactivateListeners=function(){s.forEach(function(e){e()}),o.deactivateListeners=null}}function T(e,t,n){n.disableParentScroll&&(n.restoreScroll=i.disableScrollAround(t,n.parent)),n.hasBackdrop&&(n.backdrop=i.createBackdrop(e,"md-dialog-backdrop md-opaque"),s.enter(n.backdrop,n.parent)),n.hideBackdrop=function(e){n.backdrop&&(e?n.backdrop.remove():s.leave(n.backdrop)),n.disableParentScroll&&(n.restoreScroll&&n.restoreScroll(),delete n.restoreScroll),n.hideBackdrop=null}}function A(e,t){var n="alert"===t.$type?"alertdialog":"dialog",d=e.find("md-dialog-content"),s=e.attr("id"),c="dialogContent_"+(s||i.nextUid());e.attr({role:n,tabIndex:"-1"}),0===d.length&&(d=e,s&&(c=s)),d.attr("id",c),e.attr("aria-describedby",c),t.ariaLabel?o.expect(e,"aria-label",t.ariaLabel):o.expectAsync(e,"aria-label",function(){var e=d.text().split(/\s+/);return e.length>3&&(e=e.slice(0,3).concat("...")),e.join(" ")}),r=document.createElement("div"),r.classList.add("md-dialog-focus-trap"),r.tabIndex=0,a=r.cloneNode(!1);var l=function(){e.focus()};r.addEventListener("focus",l),a.addEventListener("focus",l),e[0].parentNode.insertBefore(r,e[0]),e.after(a)}function w(e,t){function n(e){for(;e.parentNode;){if(e===document.body)return;for(var t=e.parentNode.children,i=0;i<t.length;i++)e===t[i]||N(t[i],["SCRIPT","STYLE"])||t[i].setAttribute("aria-hidden",o);n(e=e.parentNode)}}var o=!0;n(e[0]),t.unlockScreenReader=function(){o=!1,n(e[0]),t.unlockScreenReader=null}}function k(e,t){var n="fixed"==l.getComputedStyle(c[0].body).position,o=t.backdrop?l.getComputedStyle(t.backdrop[0]):null,i=o?Math.min(c[0].body.clientHeight,Math.ceil(Math.abs(parseInt(o.height,10)))):0,r={top:e.css("top"),height:e.css("height")},a=Math.abs(t.parent[0].getBoundingClientRect().top);return e.css({top:(n?a:0)+"px",height:i?i+"px":"100%"}),function(){e.css(r)}}function _(e,t){t.parent.append(e),t.reverseContainerStretch=k(e,t);var n=e.find("md-dialog"),o=i.dom.animator,r=o.calculateZoomToOrigin,a={transitionInClass:"md-transition-in",transitionOutClass:"md-transition-out"},d=o.toTransformCss(r(n,t.openFrom||t.origin)),s=o.toTransformCss("");return n.toggleClass("md-dialog-fullscreen",!!t.fullscreen),o.translate3d(n,d,s,a).then(function(e){return t.reverseAnimate=function(){return delete t.reverseAnimate,t.closeTo?(a={transitionInClass:"md-transition-out",transitionOutClass:"md-transition-in"},d=s,s=o.toTransformCss(r(n,t.closeTo)),o.translate3d(n,d,s,a)):e(s=o.toTransformCss(r(n,t.origin)))},t.clearAnimate=function(){return delete t.clearAnimate,n.removeClass([a.transitionOutClass,a.transitionInClass].join(" ")),o.translate3d(n,s,o.toTransformCss(""),{})},!0})}function x(e,t){return t.reverseAnimate().then(function(){t.contentElement&&t.clearAnimate()})}function N(e,t){if(t.indexOf(e.nodeName)!==-1)return!0}return{hasBackdrop:!0,isolateScope:!0,onCompiling:b,onShow:E,onShowing:v,onRemove:$,clickOutsideToClose:!1,escapeToClose:!0,targetEvent:null,closeTo:null,openFrom:null,focusOnOpen:!0,disableParentScroll:!0,autoWrap:!0,fullscreen:!1,transformTemplate:function(e,t){function n(e){return t.autoWrap&&!/<\/md-dialog>/g.test(e)?"<md-dialog>"+(e||"")+"</md-dialog>":e||""}var o=f.startSymbol(),i=f.endSymbol(),r=o+(t.themeWatch?"":"::")+"theme"+i;return'<div class="md-dialog-container" tabindex="-1" md-theme="'+r+'">'+n(e)+"</div>"}}}o.$inject=["$mdDialog","$mdConstant"],i.$inject=["$mdDialog","$mdAria","$mdUtil","$mdConstant","$animate","$document","$window","$rootElement","$log","$injector","$mdTheming","$interpolate","$mdInteraction"];var r,a;return e("$mdDialog").setDefaults({methods:["disableParentScroll","hasBackdrop","clickOutsideToClose","escapeToClose","targetEvent","closeTo","openFrom","parent","fullscreen","multiple"],options:i}).addPreset("alert",{methods:["title","htmlContent","textContent","content","ariaLabel","ok","theme","css"],options:o}).addPreset("confirm",{methods:["title","htmlContent","textContent","content","ariaLabel","ok","cancel","theme","css"],options:o}).addPreset("prompt",{methods:["title","htmlContent","textContent","initialValue","content","placeholder","ariaLabel","ok","cancel","theme","css"],options:o})}e.$inject=["$$rAF","$mdTheming","$mdDialog"],o.$inject=["$$interimElementProvider"],t.module("material.components.dialog",["material.core","material.components.backdrop"]).directive("mdDialog",e).provider("$mdDialog",o)}(),function(){function e(e){return{restrict:"E",link:e}}e.$inject=["$mdTheming"],t.module("material.components.divider",["material.core"]).directive("mdDivider",e)}(),function(){!function(){function e(e){return{restrict:"E",require:["^?mdFabSpeedDial","^?mdFabToolbar"],compile:function(t,n){var o=t.children(),i=e.prefixer().hasAttribute(o,"ng-repeat");i?o.addClass("md-fab-action-item"):o.wrap('<div class="md-fab-action-item">')}}}e.$inject=["$mdUtil"],t.module("material.components.fabActions",["material.core"]).directive("mdFabActions",e)}()}(),function(){!function(){function e(e,n,o,i,r,a){function d(){N.direction=N.direction||"down",N.isOpen=N.isOpen||!1,l(),n.addClass("md-animations-waiting")}function s(){var o=["click","focusin","focusout"];t.forEach(o,function(e){n.on(e,c)}),e.$on("$destroy",function(){t.forEach(o,function(e){n.off(e,c)}),h()})}function c(e){"click"==e.type&&k(e),"focusout"!=e.type||D||(D=a(function(){N.close()},100,!1)),"focusin"==e.type&&D&&(a.cancel(D),D=null)}function l(){N.currentActionIndex=-1}function m(){e.$watch("vm.direction",function(e,t){o.removeClass(n,"md-"+t),o.addClass(n,"md-"+e),l()});var t,i;e.$watch("vm.isOpen",function(e){l(),t&&i||(t=_(),i=x()),e?p():h();var r=e?"md-is-open":"",a=e?"":"md-is-open";t.attr("aria-haspopup",!0),t.attr("aria-expanded",e),i.attr("aria-hidden",!e),o.setClass(n,r,a)})}function u(){n[0].scrollHeight>0?o.addClass(n,"_md-animations-ready").then(function(){n.removeClass("md-animations-waiting")}):S<10&&(a(u,100),S+=1)}function p(){n.on("keydown",g),i.nextTick(function(){t.element(document).on("click touchend",f)})}function h(){n.off("keydown",g),t.element(document).off("click touchend",f)}function f(e){if(e.target){var t=i.getClosest(e.target,"md-fab-trigger"),n=i.getClosest(e.target,"md-fab-actions");t||n||N.close()}}function g(e){switch(e.which){case r.KEY_CODE.ESCAPE:return N.close(),e.preventDefault(),!1;case r.KEY_CODE.LEFT_ARROW:return C(e),!1;case r.KEY_CODE.UP_ARROW:return y(e),!1;case r.KEY_CODE.RIGHT_ARROW:return M(e),!1;case r.KEY_CODE.DOWN_ARROW:return T(e),!1}}function b(e){E(e,-1)}function v(e){E(e,1)}function E(e,n){var o=$();N.currentActionIndex=N.currentActionIndex+n,N.currentActionIndex=Math.min(o.length-1,N.currentActionIndex),N.currentActionIndex=Math.max(0,N.currentActionIndex);var i=t.element(o[N.currentActionIndex]).children()[0];t.element(i).attr("tabindex",0),i.focus(),e.preventDefault(),e.stopImmediatePropagation()}function $(){var e=x()[0].querySelectorAll(".md-fab-action-item");return t.forEach(e,function(e){t.element(t.element(e).children()[0]).attr("tabindex",-1)}),e}function C(e){"left"===N.direction?v(e):b(e);
}function y(e){"down"===N.direction?b(e):v(e)}function M(e){"left"===N.direction?b(e):v(e)}function T(e){"up"===N.direction?b(e):v(e)}function A(e){return i.getClosest(e,"md-fab-trigger")}function w(e){return i.getClosest(e,"md-fab-actions")}function k(e){A(e.target)&&N.toggle(),w(e.target)&&N.close()}function _(){return n.find("md-fab-trigger")}function x(){return n.find("md-fab-actions")}var N=this,S=0;N.open=function(){e.$evalAsync("vm.isOpen = true")},N.close=function(){e.$evalAsync("vm.isOpen = false"),n.find("md-fab-trigger")[0].focus()},N.toggle=function(){e.$evalAsync("vm.isOpen = !vm.isOpen")},N.$onInit=function(){d(),s(),m(),u()},1===t.version.major&&t.version.minor<=4&&this.$onInit();var D}e.$inject=["$scope","$element","$animate","$mdUtil","$mdConstant","$timeout"],t.module("material.components.fabShared",["material.core"]).controller("MdFabController",e)}()}(),function(){!function(){function n(){function e(e,t){t.prepend('<div class="_md-css-variables"></div>')}return{restrict:"E",scope:{direction:"@?mdDirection",isOpen:"=?mdOpen"},bindToController:!0,controller:"MdFabController",controllerAs:"vm",link:e}}function o(n){function o(e){n(e,r,!1)}function i(n){if(!n.hasClass("md-animations-waiting")||n.hasClass("_md-animations-ready")){var o=n[0],i=n.controller("mdFabSpeedDial"),r=o.querySelectorAll(".md-fab-action-item"),a=o.querySelector("md-fab-trigger"),d=o.querySelector("._md-css-variables"),s=parseInt(e.getComputedStyle(d).zIndex);t.forEach(r,function(e,t){var n=e.style;n.transform=n.webkitTransform="",n.transitionDelay="",n.opacity=1,n.zIndex=r.length-t+s}),a.style.zIndex=s+r.length+1,i.isOpen||t.forEach(r,function(e,t){var n,o,r=e.style,d=(a.clientHeight-e.clientHeight)/2,s=(a.clientWidth-e.clientWidth)/2;switch(i.direction){case"up":n=e.scrollHeight*(t+1)+d,o="Y";break;case"down":n=-(e.scrollHeight*(t+1)+d),o="Y";break;case"left":n=e.scrollWidth*(t+1)+s,o="X";break;case"right":n=-(e.scrollWidth*(t+1)+s),o="X"}var c="translate"+o+"("+n+"px)";r.transform=r.webkitTransform=c})}}return{addClass:function(e,t,n){e.hasClass("md-fling")?(i(e),o(n)):n()},removeClass:function(e,t,n){i(e),o(n)}}}function i(n){function o(e){n(e,r,!1)}function i(n){var o=n[0],i=n.controller("mdFabSpeedDial"),r=o.querySelectorAll(".md-fab-action-item"),d=o.querySelector("._md-css-variables"),s=parseInt(e.getComputedStyle(d).zIndex);t.forEach(r,function(e,t){var n=e.style,o=t*a;n.opacity=i.isOpen?1:0,n.transform=n.webkitTransform=i.isOpen?"scale(1)":"scale(0)",n.transitionDelay=(i.isOpen?o:r.length-o)+"ms",n.zIndex=r.length-t+s})}var a=65;return{addClass:function(e,t,n){i(e),o(n)},removeClass:function(e,t,n){i(e),o(n)}}}o.$inject=["$timeout"],i.$inject=["$timeout"];var r=300;t.module("material.components.fabSpeedDial",["material.core","material.components.fabShared","material.components.fabActions"]).directive("mdFabSpeedDial",n).animation(".md-fling",o).animation(".md-scale",i).service("mdFabSpeedDialFlingAnimation",o).service("mdFabSpeedDialScaleAnimation",i)}()}(),function(){!function(){function n(){function e(e,t,n){t.addClass("md-fab-toolbar"),t.find("md-fab-trigger").find("button").prepend('<div class="md-fab-toolbar-background"></div>')}return{restrict:"E",transclude:!0,template:'<div class="md-fab-toolbar-wrapper">  <div class="md-fab-toolbar-content" ng-transclude></div></div>',scope:{direction:"@?mdDirection",isOpen:"=?mdOpen"},bindToController:!0,controller:"MdFabController",controllerAs:"vm",link:e}}function o(){function n(n,o,i){if(o){var r=n[0],a=n.controller("mdFabToolbar"),d=r.querySelector(".md-fab-toolbar-background"),s=r.querySelector("md-fab-trigger button"),c=r.querySelector("md-toolbar"),l=r.querySelector("md-fab-trigger button md-icon"),m=n.find("md-fab-actions").children();if(s&&d){var u=e.getComputedStyle(s).getPropertyValue("background-color"),p=r.offsetWidth,h=(r.offsetHeight,2*(p/s.offsetWidth));d.style.backgroundColor=u,d.style.borderRadius=p+"px",a.isOpen?(c.style.pointerEvents="inherit",d.style.width=s.offsetWidth+"px",d.style.height=s.offsetHeight+"px",d.style.transform="scale("+h+")",d.style.transitionDelay="0ms",l&&(l.style.transitionDelay=".3s"),t.forEach(m,function(e,t){e.style.transitionDelay=25*(m.length-t)+"ms"})):(c.style.pointerEvents="none",d.style.transform="scale(1)",d.style.top="0",n.hasClass("md-right")&&(d.style.left="0",d.style.right=null),n.hasClass("md-left")&&(d.style.right="0",d.style.left=null),d.style.transitionDelay="200ms",l&&(l.style.transitionDelay="0ms"),t.forEach(m,function(e,t){e.style.transitionDelay=200+25*t+"ms"}))}}}return{addClass:function(e,t,o){n(e,t,o),o()},removeClass:function(e,t,o){n(e,t,o),o()}}}t.module("material.components.fabToolbar",["material.core","material.components.fabShared","material.components.fabActions"]).directive("mdFabToolbar",n).animation(".md-fab-toolbar",o).service("mdFabToolbarAnimation",o)}()}(),function(){function e(e,o,i,r){function a(n,a,d,s){function c(){for(var e in o.MEDIA)r(e),r.getQuery(o.MEDIA[e]).addListener(M);return r.watchResponsiveAttributes(["md-cols","md-row-height","md-gutter"],d,m)}function l(){s.layoutDelegate=t.noop,T();for(var e in o.MEDIA)r.getQuery(o.MEDIA[e]).removeListener(M)}function m(e){null==e?s.invalidateLayout():r(e)&&s.invalidateLayout()}function u(e){var o=g(),r={tileSpans:b(o),colCount:v(),rowMode:C(),rowHeight:$(),gutter:E()};if(e||!t.equals(r,A)){var d=i(r.colCount,r.tileSpans,o).map(function(e,n){return{grid:{element:a,style:f(r.colCount,n,r.gutter,r.rowMode,r.rowHeight)},tiles:e.map(function(e,i){return{element:t.element(o[i]),style:h(e.position,e.spans,r.colCount,n,r.gutter,r.rowMode,r.rowHeight)}})}}).reflow().performance();n.mdOnLayout({$event:{performance:d}}),A=r}}function p(e){return w+e+k}function h(e,t,n,o,i,r,a){var d=1/n*100,s=(n-1)/n,c=_({share:d,gutterShare:s,gutter:i}),l="rtl"!=document.dir&&"rtl"!=document.body.dir,m=l?{left:x({unit:c,offset:e.col,gutter:i}),width:N({unit:c,span:t.col,gutter:i}),paddingTop:"",marginTop:"",top:"",height:""}:{right:x({unit:c,offset:e.col,gutter:i}),width:N({unit:c,span:t.col,gutter:i}),paddingTop:"",marginTop:"",top:"",height:""};switch(r){case"fixed":m.top=x({unit:a,offset:e.row,gutter:i}),m.height=N({unit:a,span:t.row,gutter:i});break;case"ratio":var u=d/a,p=_({share:u,gutterShare:s,gutter:i});m.paddingTop=N({unit:p,span:t.row,gutter:i}),m.marginTop=x({unit:p,offset:e.row,gutter:i});break;case"fit":var h=(o-1)/o,u=1/o*100,p=_({share:u,gutterShare:h,gutter:i});m.top=x({unit:p,offset:e.row,gutter:i}),m.height=N({unit:p,span:t.row,gutter:i})}return m}function f(e,t,n,o,i){var r={};switch(o){case"fixed":r.height=N({unit:i,span:t,gutter:n}),r.paddingBottom="";break;case"ratio":var a=1===e?0:(e-1)/e,d=1/e*100,s=d*(1/i),c=_({share:s,gutterShare:a,gutter:n});r.height="",r.paddingBottom=N({unit:c,span:t,gutter:n});break;case"fit":}return r}function g(){return[].filter.call(a.children(),function(e){return"MD-GRID-TILE"==e.tagName&&!e.$$mdDestroyed})}function b(e){return[].map.call(e,function(e){var n=t.element(e).controller("mdGridTile");return{row:parseInt(r.getResponsiveAttribute(n.$attrs,"md-rowspan"),10)||1,col:parseInt(r.getResponsiveAttribute(n.$attrs,"md-colspan"),10)||1}})}function v(){var e=parseInt(r.getResponsiveAttribute(d,"md-cols"),10);if(isNaN(e))throw"md-grid-list: md-cols attribute was not found, or contained a non-numeric value";return e}function E(){return y(r.getResponsiveAttribute(d,"md-gutter")||1)}function $(){var e=r.getResponsiveAttribute(d,"md-row-height");if(!e)throw"md-grid-list: md-row-height attribute was not found";switch(C()){case"fixed":return y(e);case"ratio":var t=e.split(":");return parseFloat(t[0])/parseFloat(t[1]);case"fit":return 0}}function C(){var e=r.getResponsiveAttribute(d,"md-row-height");if(!e)throw"md-grid-list: md-row-height attribute was not found";return"fit"==e?"fit":e.indexOf(":")!==-1?"ratio":"fixed"}function y(e){return/\D$/.test(e)?e:e+"px"}a.addClass("_md"),a.attr("role","list"),s.layoutDelegate=u;var M=t.bind(s,s.invalidateLayout),T=c();n.$on("$destroy",l);var A,w=e.startSymbol(),k=e.endSymbol(),_=e(p("share")+"% - ("+p("gutter")+" * "+p("gutterShare")+")"),x=e("calc(("+p("unit")+" + "+p("gutter")+") * "+p("offset")+")"),N=e("calc(("+p("unit")+") * "+p("span")+" + ("+p("span")+" - 1) * "+p("gutter")+")")}return{restrict:"E",controller:n,scope:{mdOnLayout:"&"},link:a}}function n(e){this.layoutInvalidated=!1,this.tilesInvalidated=!1,this.$timeout_=e.nextTick,this.layoutDelegate=t.noop}function o(e){function n(t,n){var o,a,d,s,c,l;return s=e.time(function(){a=i(t,n)}),o={layoutInfo:function(){return a},map:function(t){return c=e.time(function(){var e=o.layoutInfo();d=t(e.positioning,e.rowCount)}),o},reflow:function(t){return l=e.time(function(){var e=t||r;e(d.grid,d.tiles)}),o},performance:function(){return{tileCount:n.length,layoutTime:s,mapTime:c,reflowTime:l,totalTime:s+c+l}}}}function o(e,t){e.element.css(e.style),t.forEach(function(e){e.element.css(e.style)})}function i(e,t){function n(t,n){if(t.col>e)throw"md-grid-list: Tile at position "+n+" has a colspan ("+t.col+") that exceeds the column count ("+e+")";for(var a=0,l=0;l-a<t.col;)d>=e?o():(a=c.indexOf(0,d),a!==-1&&(l=r(a+1))!==-1?d=l+1:(a=l=0,o()));return i(a,t.col,t.row),d=a+t.col,{col:a,row:s}}function o(){d=0,s++,i(0,e,-1)}function i(e,t,n){for(var o=e;o<e+t;o++)c[o]=Math.max(c[o]+n,0)}function r(e){var t;for(t=e;t<c.length;t++)if(0!==c[t])return t;if(t===c.length)return t}function a(){for(var t=[],n=0;n<e;n++)t.push(0);return t}var d=0,s=0,c=a();return{positioning:t.map(function(e,t){return{spans:e,position:n(e,t)}}),rowCount:s+Math.max.apply(Math,c)}}var r=o;return n.animateWith=function(e){r=t.isFunction(e)?e:o},n}function i(e){function n(n,o,i,r){o.attr("role","listitem");var a=e.watchResponsiveAttributes(["md-colspan","md-rowspan"],i,t.bind(r,r.invalidateLayout));r.invalidateTiles(),n.$on("$destroy",function(){o[0].$$mdDestroyed=!0,a(),r.invalidateLayout()}),t.isDefined(n.$parent.$index)&&n.$watch(function(){return n.$parent.$index},function(e,t){e!==t&&r.invalidateTiles()})}return{restrict:"E",require:"^mdGridList",template:"<figure ng-transclude></figure>",transclude:!0,scope:{},controller:["$attrs",function(e){this.$attrs=e}],link:n}}function r(){return{template:"<figcaption ng-transclude></figcaption>",transclude:!0}}n.$inject=["$mdUtil"],o.$inject=["$mdUtil"],e.$inject=["$interpolate","$mdConstant","$mdGridLayout","$mdMedia"],i.$inject=["$mdMedia"],t.module("material.components.gridList",["material.core"]).directive("mdGridList",e).directive("mdGridTile",i).directive("mdGridTileFooter",r).directive("mdGridTileHeader",r).factory("$mdGridLayout",o),n.prototype={invalidateTiles:function(){this.tilesInvalidated=!0,this.invalidateLayout()},invalidateLayout:function(){this.layoutInvalidated||(this.layoutInvalidated=!0,this.$timeout_(t.bind(this,this.layout)))},layout:function(){try{this.layoutDelegate(this.tilesInvalidated)}finally{this.layoutInvalidated=!1,this.tilesInvalidated=!1}}}}(),function(){t.module("material.components.icon",["material.core"])}(),function(){function n(e,t){function n(t){var n=t[0].querySelector(r),o=t[0].querySelector(a);return n&&t.addClass("md-icon-left"),o&&t.addClass("md-icon-right"),function(t,n){e(n)}}function o(e,n,o,i){var r=this;r.isErrorGetter=o.mdIsError&&t(o.mdIsError),r.delegateClick=function(){r.input.focus()},r.element=n,r.setFocused=function(e){n.toggleClass("md-input-focused",!!e)},r.setHasValue=function(e){n.toggleClass("md-input-has-value",!!e)},r.setHasPlaceholder=function(e){n.toggleClass("md-input-has-placeholder",!!e)},r.setInvalid=function(e){e?i.addClass(n,"md-input-invalid"):i.removeClass(n,"md-input-invalid")},e.$watch(function(){return r.label&&r.input},function(e){e&&!r.label.attr("for")&&r.label.attr("for",r.input.attr("id"))})}o.$inject=["$scope","$element","$attrs","$animate"];var i=["INPUT","TEXTAREA","SELECT","MD-SELECT"],r=i.reduce(function(e,t){return e.concat(["md-icon ~ "+t,".md-icon ~ "+t])},[]).join(","),a=i.reduce(function(e,t){return e.concat([t+" ~ md-icon",t+" ~ .md-icon"])},[]).join(",");return{restrict:"E",compile:n,controller:o}}function o(){return{restrict:"E",require:"^?mdInputContainer",link:function(e,t,n,o){!o||n.mdNoFloat||t.hasClass("md-container-ignore")||(o.label=t,e.$on("$destroy",function(){o.label=null}))}}}function i(e,n,o,i,r){function a(a,d,s,c){function l(e){return h.setHasValue(!g.$isEmpty(e)),e}function m(){h.label&&s.$observe("required",function(e){h.label.toggleClass("md-required",e&&!E)})}function u(){h.setHasValue(d.val().length>0||(d[0].validity||{}).badInput)}function p(){function o(){d.attr("rows",1).css("height","auto").addClass("md-no-flex");var e=c();if(!$){var t=d[0].style.padding||"";$=d.css("padding",0).prop("offsetHeight"),d[0].style.padding=t}if(b&&$&&(e=Math.max(e,$*b)),v&&$){var n=$*v;n<e?(d.attr("md-no-autogrow",""),e=n):d.removeAttr("md-no-autogrow")}$&&d.attr("rows",Math.round(e/$)),d.css("height",e+"px").removeClass("md-no-flex")}function c(){var e=C.offsetHeight,t=C.scrollHeight-e;return e+Math.max(t,0)}function l(t){return e.nextTick(o),t}function m(){if(p&&(p=!1,t.element(n).off("resize",o),E&&E(),d.attr("md-no-autogrow","").off("input",o),f)){var e=g.$formatters.indexOf(l);e>-1&&g.$formatters.splice(e,1)}}function u(){function e(e){e.preventDefault(),l=!0,u=e.clientY,p=parseFloat(d.css("height"))||d.prop("offsetHeight")}function n(e){l&&(e.preventDefault(),m(),f.addClass("md-input-resized"))}function o(e){l&&d.css("height",p+e.pointer.distanceY+"px")}function i(e){l&&(l=!1,f.removeClass("md-input-resized"))}if(!s.hasOwnProperty("mdNoResize")){var c=t.element('<div class="md-resize-handle"></div>'),l=!1,u=null,p=0,f=h.element,g=r.register(c,"drag",{horizontal:!1});d.wrap('<div class="md-resize-wrapper">').after(c),c.on("mousedown",e),f.on("$md.dragstart",n).on("$md.drag",o).on("$md.dragend",i),a.$on("$destroy",function(){c.off("mousedown",e).remove(),f.off("$md.dragstart",n).off("$md.drag",o).off("$md.dragend",i),g(),c=null,f=null,g=null})}}var p=!s.hasOwnProperty("mdNoAutogrow");if(u(),p){var b=s.hasOwnProperty("rows")?parseInt(s.rows):NaN,v=s.hasOwnProperty("maxRows")?parseInt(s.maxRows):NaN,E=a.$on("md-resize-textarea",o),$=null,C=d[0];if(i(function(){e.nextTick(o)},10,!1),d.on("input",o),f&&g.$formatters.push(l),b||d.attr("rows",1),t.element(n).on("resize",o),a.$on("$destroy",m),s.hasOwnProperty("mdDetectHidden")){var y=function(){var e=!1;return function(){var t=0===C.offsetHeight;t===!1&&e===!0&&o(),e=t}}();a.$watch(function(){return e.nextTick(y,!1),!0})}}}var h=c[0],f=!!c[1],g=c[1]||e.fakeNgModel(),b=c[2],v=t.isDefined(s.readonly),E=e.parseAttributeBoolean(s.mdNoAsterisk),$=d[0].tagName.toLowerCase();if(h){if("hidden"===s.type)return void d.attr("aria-hidden","true");if(h.input){if(h.input[0].contains(d[0]))return;throw new Error("<md-input-container> can only have *one* <input>, <textarea> or <md-select> child element!")}h.input=d,m();var C=t.element('<div class="md-errors-spacer">');d.after(C),h.label||o.expect(d,"aria-label",s.placeholder),d.addClass("md-input"),d.attr("id")||d.attr("id","input_"+e.nextUid()),"input"===$&&"number"===s.type&&s.min&&s.max&&!s.step?d.attr("step","any"):"textarea"===$&&p(),f||u();var y=h.isErrorGetter||function(){return g.$invalid&&(g.$touched||b&&b.$submitted)};a.$watch(y,h.setInvalid),s.ngValue&&s.$observe("value",u),g.$parsers.push(l),g.$formatters.push(l),d.on("input",u),v||d.on("focus",function(t){e.nextTick(function(){h.setFocused(!0)})}).on("blur",function(t){e.nextTick(function(){h.setFocused(!1),u()})}),a.$on("$destroy",function(){h.setFocused(!1),h.setHasValue(!1),h.input=null})}}return{restrict:"E",require:["^?mdInputContainer","?ngModel","?^form"],link:a}}function r(e,n){function o(o,i,r,a){function d(e){return c.parent?(c.text(String(i.val()||e||"").length+" / "+s),e):e}var s,c,l,m=a[0],u=a[1];n.nextTick(function(){l=t.element(u.element[0].querySelector(".md-errors-spacer")),c=t.element('<div class="md-char-counter">'),l.append(c),r.$set("ngTrim","false"),o.$watch(r.mdMaxlength,function(n){s=n,t.isNumber(n)&&n>0?(c.parent().length||e.enter(c,l),d()):e.leave(c)}),m.$validators["md-maxlength"]=function(e,n){return!t.isNumber(s)||s<0||(d(),(e||i.val()||n||"").length<=s)}})}return{restrict:"A",require:["ngModel","^mdInputContainer"],link:o}}function a(e){function n(n,o,i,r){if(r){var a=r.element.find("label"),d=r.element.attr("md-no-float");if(a&&a.length||""===d||n.$eval(d))return void r.setHasPlaceholder(!0);if("MD-SELECT"!=o[0].nodeName){var s=t.element('<label ng-click="delegateClick()" tabindex="-1">'+i.placeholder+"</label>");i.$set("placeholder",null),r.element.addClass("md-icon-float").prepend(s),e(s)(n)}}}return{restrict:"A",require:"^^?mdInputContainer",priority:200,link:{pre:n}}}function d(e){function t(t,n,o){function i(){a=!0,e(function(){n[0].select(),a=!1},1,!1)}function r(e){a&&e.preventDefault()}if("INPUT"===n[0].nodeName||"TEXTAREA"===n[0].nodeName){var a=!1;n.on("focus",i).on("mouseup",r),t.$on("$destroy",function(){n.off("focus",i).off("mouseup",r)})}}return{restrict:"A",link:t}}function s(){function e(e,n,o,i){i&&(n.toggleClass("md-input-messages-animation",!0),n.toggleClass("md-auto-hide",!0),("false"==o.mdAutoHide||t(o))&&n.toggleClass("md-auto-hide",!1))}function t(e){return A.some(function(t){return e[t]})}return{restrict:"EA",link:e,require:"^^?mdInputContainer"}}function c(e){function t(t){function n(){for(var e=t[0];e=e.parentNode;)if(e.nodeType===Node.DOCUMENT_FRAGMENT_NODE)return!0;return!1}function o(t){return!!e.getClosest(t,"md-input-container")}function i(e){e.toggleClass("md-input-message-animation",!0)}if(o(t))i(t);else if(n())return function(e,n){o(n)&&i(t)}}return{restrict:"EA",compile:t,priority:100}}function l(e,t,n,o){return E(e,t,n,o),{addClass:function(e,t,n){p(e,n)}}}function m(e,t,n,o){return E(e,t,n,o),{enter:function(e,t){p(e,t)},leave:function(e,t){h(e,t)},addClass:function(e,t,n){"ng-hide"==t?h(e,n):n()},removeClass:function(e,t,n){"ng-hide"==t?p(e,n):n()}}}function u(e,t,n,o){return E(e,t,n,o),{enter:function(e,t){var n=f(e);n.start().done(t)},leave:function(e,t){var n=g(e);n.start().done(t)}}}function p(e,n){var o,i=[],r=v(e),a=r.children();return 0==r.length||0==a.length?(T.warn("mdInput messages show animation called on invalid messages element: ",e),void n()):(t.forEach(a,function(e){o=f(t.element(e)),i.push(o.start())}),void C.all(i,n))}function h(e,n){var o,i=[],r=v(e),a=r.children();return 0==r.length||0==a.length?(T.warn("mdInput messages hide animation called on invalid messages element: ",e),void n()):(t.forEach(a,function(e){o=g(t.element(e)),i.push(o.start())}),void C.all(i,n))}function f(t){var n=parseInt(e.getComputedStyle(t[0]).height),o=parseInt(e.getComputedStyle(t[0]).marginTop),i=v(t),r=b(t),a=o>-n;return a||i.hasClass("md-auto-hide")&&!r.hasClass("md-input-invalid")?y(t,{}):y(t,{event:"enter",structural:!0,from:{opacity:0,"margin-top":-n+"px"},to:{opacity:1,"margin-top":"0"},duration:.3})}function g(t){var n=t[0].offsetHeight,o=e.getComputedStyle(t[0]);return 0===parseInt(o.opacity)?y(t,{}):y(t,{event:"leave",structural:!0,from:{opacity:1,"margin-top":0},to:{opacity:0,"margin-top":-n+"px"},duration:.3})}function b(e){var t=e.controller("mdInputContainer");return t.element}function v(e){return e.hasClass("md-input-messages-animation")?e:e.hasClass("md-input-message-animation")?t.element(M.getClosest(e,function(e){return e.classList.contains("md-input-messages-animation")})):t.element(e[0].querySelector(".md-input-messages-animation"))}function E(e,t,n,o){C=e,y=t,M=n,T=o}n.$inject=["$mdTheming","$parse"],i.$inject=["$mdUtil","$window","$mdAria","$timeout","$mdGesture"],r.$inject=["$animate","$mdUtil"],a.$inject=["$compile"],c.$inject=["$mdUtil"],d.$inject=["$timeout"],l.$inject=["$$AnimateRunner","$animateCss","$mdUtil","$log"],m.$inject=["$$AnimateRunner","$animateCss","$mdUtil","$log"],u.$inject=["$$AnimateRunner","$animateCss","$mdUtil","$log"];var $=t.module("material.components.input",["material.core"]).directive("mdInputContainer",n).directive("label",o).directive("input",i).directive("textarea",i).directive("mdMaxlength",r).directive("placeholder",a).directive("ngMessages",s).directive("ngMessage",c).directive("ngMessageExp",c).directive("mdSelectOnFocus",d).animation(".md-input-invalid",l).animation(".md-input-messages-animation",m).animation(".md-input-message-animation",u);e._mdMocksIncluded&&$.service("$$mdInput",function(){return{messages:{show:p,hide:h,getElement:v}}}).service("mdInputInvalidAnimation",l).service("mdInputMessagesAnimation",m).service("mdInputMessageAnimation",u);var C,y,M,T,A=["ngIf","ngShow","ngHide","ngSwitchWhen","ngSwitchDefault"]}(),function(){function e(e){return{restrict:"E",compile:function(t){return t[0].setAttribute("role","list"),e}}}function n(e,n,o,i){var r=["md-checkbox","md-switch","md-menu"];return{restrict:"E",controller:"MdListController",compile:function(a,d){function s(){for(var e,t,n=["md-switch","md-checkbox"],o=0;t=n[o];++o)if((e=a.find(t)[0])&&!e.hasAttribute("aria-label")){var i=a.find("p")[0];if(!i)return;e.setAttribute("aria-label","Toggle "+i.textContent)}}function c(){var e=t.element(E),n=e.parent().hasClass("md-secondary-container")||E.parentNode.firstElementChild!==E,o="left";n&&(o="right"),e.attr("md-position-mode")||e.attr("md-position-mode",o+" target");var i=e.children().eq(0);g(i[0])||i.attr("ng-click","$mdMenu.open($event)"),i.attr("aria-label")||i.attr("aria-label","Open List Menu")}function l(n){if("div"==n)C=t.element('<div class="md-no-style md-list-item-inner">'),C.append(a.contents()),a.addClass("md-proxy-focus");else{C=t.element('<div class="md-button md-no-style">   <div class="md-list-item-inner"></div></div>');var o=t.element('<md-button class="md-no-style"></md-button>');p(a[0],o[0]),o.attr("aria-label")||o.attr("aria-label",e.getText(a)),a.hasClass("md-no-focus")&&o.addClass("md-no-focus"),C.prepend(o),C.children().eq(1).append(a.contents()),a.addClass("_md-button-wrap")}a[0].setAttribute("tabindex","-1"),a.append(C)}function m(){var e=t.element('<div class="md-secondary-container">');t.forEach($,function(t){u(t,e)}),C.append(e)}function u(n,o){if(n&&!f(n)&&n.hasAttribute("ng-click")){e.expect(n,"aria-label");var i=t.element('<md-button class="md-secondary md-icon-button">');p(n,i[0],["ng-if","ng-hide","ng-show"]),n.setAttribute("tabindex","-1"),i.append(n),n=i[0]}n&&(!g(n)||!d.ngClick&&h(n))&&t.element(n).removeClass("md-secondary"),a.addClass("md-with-secondary"),o.append(n)}function p(e,n,i){var r=o.prefixer(["ng-if","ng-click","ng-dblclick","aria-label","ng-disabled","ui-sref","href","ng-href","target","ng-attr-ui-sref","ui-sref-opts"]);i&&(r=r.concat(o.prefixer(i))),t.forEach(r,function(t){e.hasAttribute(t)&&(n.setAttribute(t,e.getAttribute(t)),e.removeAttribute(t))})}function h(e){return r.indexOf(e.nodeName.toLowerCase())!=-1}function f(e){var t=e.nodeName.toUpperCase();return"MD-BUTTON"==t||"BUTTON"==t}function g(e){for(var t=e.attributes,n=0;n<t.length;n++)if("ngClick"===d.$normalize(t[n].name))return!0;return!1}function b(e,a,d,s){function c(){p&&p.children&&!b&&!v&&t.forEach(r,function(e){t.forEach(p.querySelectorAll(e+":not(.md-secondary)"),function(e){u.push(e)})})}function l(){(1==u.length||b)&&(a.addClass("md-clickable"),b||s.attachRipple(e,t.element(a[0].querySelector(".md-no-style"))))}function m(e){var t=["md-slider"];if(!e.path)return t.indexOf(e.target.tagName.toLowerCase())!==-1;for(var n=e.path.indexOf(a.children()[0]),o=0;o<n;o++)if(t.indexOf(e.path[o].tagName.toLowerCase())!==-1)return!0}a.addClass("_md");var u=[],p=a[0].firstElementChild,h=a.hasClass("_md-button-wrap"),f=h?p.firstElementChild:p,b=f&&g(f),v=a.hasClass("md-no-proxy");c(),l(),u.length&&t.forEach(u,function(n){n=t.element(n),e.mouseActive=!1,n.on("mousedown",function(){e.mouseActive=!0,i(function(){e.mouseActive=!1},100)}).on("focus",function(){e.mouseActive===!1&&a.addClass("md-focused"),n.on("blur",function t(){a.removeClass("md-focused"),n.off("blur",t)})})});var E=function(e){if("INPUT"!=e.target.nodeName&&"TEXTAREA"!=e.target.nodeName&&!e.target.isContentEditable){var t=e.which||e.keyCode;t==n.KEY_CODE.SPACE&&f&&(f.click(),e.preventDefault(),e.stopPropagation())}};b||u.length||f&&f.addEventListener("keypress",E),a.off("click"),a.off("keypress"),1==u.length&&f&&a.children().eq(0).on("click",function(e){if(!m(e)){var n=o.getClosest(e.target,"BUTTON");!n&&f.contains(e.target)&&t.forEach(u,function(n){e.target===n||n.contains(e.target)||("MD-MENU"===n.nodeName&&(n=n.children[0]),t.element(n).triggerHandler("click"))})}}),e.$on("$destroy",function(){f&&f.removeEventListener("keypress",E)})}var v,E,$=a[0].querySelectorAll(".md-secondary"),C=a;if(a[0].setAttribute("role","listitem"),d.ngClick||d.ngDblclick||d.ngHref||d.href||d.uiSref||d.ngAttrUiSref)l("button");else if(!a.hasClass("md-no-proxy")){for(var y,M=0;y=r[M];++M)if(E=a[0].querySelector(y)){v=!0;break}v?l("div"):a.addClass("md-no-proxy")}return m(),s(),v&&"MD-MENU"===E.nodeName&&c(),b}}}function o(e,t,n){function o(e,t){var o={};n.attach(e,t,o)}var i=this;i.attachRipple=o}o.$inject=["$scope","$element","$mdListInkRipple"],e.$inject=["$mdTheming"],n.$inject=["$mdAria","$mdConstant","$mdUtil","$timeout"],t.module("material.components.list",["material.core"]).controller("MdListController",o).directive("mdList",e).directive("mdListItem",n)}(),function(){t.module("material.components.menu",["material.core","material.components.backdrop"])}(),function(){t.module("material.components.menuBar",["material.core","material.components.icon","material.components.menu"])}(),function(){function e(e,n){return{restrict:"E",transclude:!0,controller:o,controllerAs:"ctrl",bindToController:!0,scope:{mdSelectedNavItem:"=?",mdNoInkBar:"=?",navBarAriaLabel:"@?"},template:'<div class="md-nav-bar"><nav role="navigation"><ul class="_md-nav-bar-list" ng-transclude role="listbox"tabindex="0"ng-focus="ctrl.onFocus()"ng-keydown="ctrl.onKeydown($event)"aria-label="{{ctrl.navBarAriaLabel}}"></ul></nav><md-nav-ink-bar ng-hide="ctrl.mdNoInkBar"></md-nav-ink-bar></div>',link:function(o,i,r,a){n(i),a.navBarAriaLabel||e.expectAsync(i,"aria-label",t.noop)}}}function o(e,t,n,o){this._$timeout=n,this._$scope=t,this._$mdConstant=o,this.mdSelectedNavItem,this.navBarAriaLabel,this._navBarEl=e[0],this._inkbar;var i=this,r=this._$scope.$watch(function(){return i._navBarEl.querySelectorAll("._md-nav-button").length},function(e){e>0&&(i._initTabs(),r())})}function i(e,n){return{restrict:"E",require:["mdNavItem","^mdNavBar"],controller:r,bindToController:!0,controllerAs:"ctrl",replace:!0,transclude:!0,template:function(e,t){var n,o,i,r=t.mdNavClick,a=t.mdNavHref,d=t.mdNavSref,s=t.srefOpts;if((r?1:0)+(a?1:0)+(d?1:0)>1)throw Error("Must not specify more than one of the md-nav-click, md-nav-href, or md-nav-sref attributes per nav-item directive.");return r?n='ng-click="ctrl.mdNavClick()"':a?n='ng-href="{{ctrl.mdNavHref}}"':d&&(n='ui-sref="{{ctrl.mdNavSref}}"'),o=s?'ui-sref-opts="{{ctrl.srefOpts}}" ':"",n&&(i='<md-button class="_md-nav-button md-accent" ng-class="ctrl.getNgClassMap()" ng-blur="ctrl.setFocused(false)" tabindex="-1" '+o+n+'><span ng-transclude class="_md-nav-button-text"></span></md-button>'),'<li class="md-nav-item" role="option" aria-selected="{{ctrl.isSelected()}}">'+(i||"")+"</li>"},scope:{mdNavClick:"&?",mdNavHref:"@?",mdNavSref:"@?",srefOpts:"=?",name:"@"},link:function(o,i,r,a){n(function(){var n=a[0],r=a[1],d=t.element(i[0].querySelector("._md-nav-button"));n.name||(n.name=t.element(i[0].querySelector("._md-nav-button-text")).text().trim()),d.on("click",function(){r.mdSelectedNavItem=n.name,o.$apply()}),e.expectWithText(i,"aria-label")})}}}function r(e){this._$element=e,this.mdNavClick,this.mdNavHref,this.mdNavSref,this.srefOpts,this.name,this._selected=!1,this._focused=!1}o.$inject=["$element","$scope","$timeout","$mdConstant"],i.$inject=["$mdAria","$$rAF"],r.$inject=["$element"],e.$inject=["$mdAria","$mdTheming"],t.module("material.components.navBar",["material.core"]).controller("MdNavBarController",o).directive("mdNavBar",e).controller("MdNavItemController",r).directive("mdNavItem",i),o.prototype._initTabs=function(){this._inkbar=t.element(this._navBarEl.querySelector("md-nav-ink-bar"));var e=this;this._$timeout(function(){e._updateTabs(e.mdSelectedNavItem,n)}),this._$scope.$watch("ctrl.mdSelectedNavItem",function(t,n){e._$timeout(function(){e._updateTabs(t,n)})})},o.prototype._updateTabs=function(e,t){var n=this,o=this._getTabs();if(o){var i=-1,r=-1,a=this._getTabByName(e),d=this._getTabByName(t);d&&(d.setSelected(!1),i=o.indexOf(d)),a&&(a.setSelected(!0),r=o.indexOf(a)),this._$timeout(function(){n._updateInkBarStyles(a,r,i)})}},o.prototype._updateInkBarStyles=function(e,t,n){if(this._inkbar.toggleClass("_md-left",t<n).toggleClass("_md-right",t>n),this._inkbar.css({display:t<0?"none":""}),e){var o=e.getButtonEl(),i=o.offsetLeft;this._inkbar.css({left:i+"px",width:o.offsetWidth+"px"})}},o.prototype._getTabs=function(){var e=Array.prototype.slice.call(this._navBarEl.querySelectorAll(".md-nav-item")).map(function(e){return t.element(e).controller("mdNavItem")});return e.indexOf(n)?e:null},o.prototype._getTabByName=function(e){return this._findTab(function(t){return t.getName()==e})},o.prototype._getSelectedTab=function(){return this._findTab(function(e){return e.isSelected()})},o.prototype.getFocusedTab=function(){return this._findTab(function(e){return e.hasFocus()})},o.prototype._findTab=function(e){for(var t=this._getTabs(),n=0;n<t.length;n++)if(e(t[n]))return t[n];return null},o.prototype.onFocus=function(){var e=this._getSelectedTab();e&&e.setFocused(!0)},o.prototype._moveFocus=function(e,t){e.setFocused(!1),t.setFocused(!0)},o.prototype.onKeydown=function(e){var t=this._$mdConstant.KEY_CODE,n=this._getTabs(),o=this.getFocusedTab();if(o){var i=n.indexOf(o);switch(e.keyCode){case t.UP_ARROW:case t.LEFT_ARROW:i>0&&this._moveFocus(o,n[i-1]);break;case t.DOWN_ARROW:case t.RIGHT_ARROW:i<n.length-1&&this._moveFocus(o,n[i+1]);break;case t.SPACE:case t.ENTER:this._$timeout(function(){o.getButtonEl().click()})}}},r.prototype.getNgClassMap=function(){return{"md-active":this._selected,"md-primary":this._selected,"md-unselected":!this._selected,"md-focused":this._focused}},r.prototype.getName=function(){return this.name},r.prototype.getButtonEl=function(){return this._$element[0].querySelector("._md-nav-button")},r.prototype.setSelected=function(e){this._selected=e},r.prototype.isSelected=function(){return this._selected},r.prototype.setFocused=function(e){this._focused=e,e&&this.getButtonEl().focus()},r.prototype.hasFocus=function(){return this._focused}}(),function(){t.module("material.components.progressCircular",["material.core"])}(),function(){function e(){return{definePreset:o,getAllPresets:i,clearPresets:r,$get:a()}}function o(e,t){if(!e||!t)throw new Error("mdPanelProvider: The panel preset definition is malformed. The name and preset object are required.");if(g.hasOwnProperty(e))throw new Error("mdPanelProvider: The panel preset you have requested has already been defined.");delete t.id,delete t.position,delete t.animation,g[e]=t}function i(){return t.copy(g)}function r(){g={}}function a(){return["$rootElement","$rootScope","$injector","$window",function(e,t,n,o){return new d(g,e,t,n,o)}]}function d(e,n,o,i,r){this._defaultConfigOptions={bindToController:!0,clickOutsideToClose:!1,disableParentScroll:!1,escapeToClose:!1,focusOnOpen:!0,fullscreen:!1,hasBackdrop:!1,propagateContainerEvents:!1,transformTemplate:t.bind(this,this._wrapTemplate),trapFocus:!1,zIndex:p},this._config={},this._presets=e,this._$rootElement=n,this._$rootScope=o,this._$injector=i,this._$window=r,this._$mdUtil=this._$injector.get("$mdUtil"),this._trackedPanels={},this._groups=Object.create(null),this.animation=l.animation,this.xPosition=c.xPosition,this.yPosition=c.yPosition,this.interceptorTypes=s.interceptorTypes,this.closeReasons=s.closeReasons,this.absPosition=c.absPosition}function s(e,t){this._$q=t.get("$q"),
this._$mdCompiler=t.get("$mdCompiler"),this._$mdConstant=t.get("$mdConstant"),this._$mdUtil=t.get("$mdUtil"),this._$mdTheming=t.get("$mdTheming"),this._$rootScope=t.get("$rootScope"),this._$animate=t.get("$animate"),this._$mdPanel=t.get("$mdPanel"),this._$log=t.get("$log"),this._$window=t.get("$window"),this._$$rAF=t.get("$$rAF"),this.id=e.id,this.config=e,this.panelContainer,this.panelEl,this.isAttached=!1,this._removeListeners=[],this._topFocusTrap,this._bottomFocusTrap,this._backdropRef,this._restoreScroll=null,this._interceptors=Object.create(null),this._compilerCleanup=null,this._restoreCache={styles:"",classes:""}}function c(e){this._$window=e.get("$window"),this._isRTL="rtl"===e.get("$mdUtil").bidi(),this._$mdConstant=e.get("$mdConstant"),this._absolute=!1,this._relativeToEl,this._top="",this._bottom="",this._left="",this._right="",this._translateX=[],this._translateY=[],this._positions=[],this._actualPosition}function l(e){this._$mdUtil=e.get("$mdUtil"),this._openFrom,this._closeTo,this._animationClass="",this._openDuration,this._closeDuration,this._rawDuration}function m(e){var n=t.isString(e)?document.querySelector(e):e;return t.element(n)}function u(e,t){var n=getComputedStyle(e[0]||e)[t],o=n.indexOf("("),i=n.lastIndexOf(")"),r={x:0,y:0};if(o>-1&&i>-1){var a=n.substring(o+1,i).split(", ").slice(-2);r.x=parseInt(a[0]),r.y=parseInt(a[1])}return r}d.$inject=["presets","$rootElement","$rootScope","$injector","$window"],t.module("material.components.panel",["material.core","material.components.backdrop"]).provider("$mdPanel",e);var p=80,h="_md-panel-hidden",f=t.element('<div class="_md-panel-focus-trap" tabindex="0"></div>'),g={};d.prototype.create=function(e,n){if("string"==typeof e?e=this._getPresetByName(e):"object"!=typeof e||!t.isUndefined(n)&&n||(n=e,e={}),e=e||{},n=n||{},t.isDefined(n.id)&&this._trackedPanels[n.id]){var o=this._trackedPanels[n.id];return t.extend(o.config,n),o}this._config=t.extend({id:n.id||"panel_"+this._$mdUtil.nextUid(),scope:this._$rootScope.$new(!0),attachTo:this._$rootElement},this._defaultConfigOptions,n,e);var i=new s(this._config,this._$injector);return this._trackedPanels[n.id]=i,this._config.groupName&&(t.isString(this._config.groupName)&&(this._config.groupName=[this._config.groupName]),t.forEach(this._config.groupName,function(e){i.addToGroup(e)})),this._config.scope.$on("$destroy",t.bind(i,i.detach)),i},d.prototype.open=function(e,t){var n=this.create(e,t);return n.open().then(function(){return n})},d.prototype._getPresetByName=function(e){if(!this._presets[e])throw new Error("mdPanel: The panel preset configuration that you requested does not exist. Use the $mdPanelProvider to create a preset before requesting one.");return this._presets[e]},d.prototype.newPanelPosition=function(){return new c(this._$injector)},d.prototype.newPanelAnimation=function(){return new l(this._$injector)},d.prototype.newPanelGroup=function(e,t){if(!this._groups[e]){t=t||{};var n={panels:[],openPanels:[],maxOpen:t.maxOpen>0?t.maxOpen:1/0};this._groups[e]=n}return this._groups[e]},d.prototype.setGroupMaxOpen=function(e,t){if(!this._groups[e])throw new Error("mdPanel: Group does not exist yet. Call newPanelGroup().");this._groups[e].maxOpen=t},d.prototype._openCountExceedsMaxOpen=function(e){if(this._groups[e]){var t=this._groups[e];return t.maxOpen>0&&t.openPanels.length>t.maxOpen}return!1},d.prototype._closeFirstOpenedPanel=function(e){this._groups[e].openPanels[0].close()},d.prototype._wrapTemplate=function(e){var t=e||"";return'<div class="md-panel-outer-wrapper">  <div class="md-panel _md-panel-offscreen">'+t+"</div></div>"},d.prototype._wrapContentElement=function(e){var n=t.element('<div class="md-panel-outer-wrapper">');return e.addClass("md-panel _md-panel-offscreen"),n.append(e),n},s.interceptorTypes={CLOSE:"onClose"},s.prototype.open=function(){var e=this;return this._$q(function(n,o){var i=e._done(n,e),r=e._simpleBind(e.show,e),a=function(){e.config.groupName&&t.forEach(e.config.groupName,function(t){e._$mdPanel._openCountExceedsMaxOpen(t)&&e._$mdPanel._closeFirstOpenedPanel(t)})};e.attach().then(r).then(a).then(i)["catch"](o)})},s.prototype.close=function(e){var n=this;return this._$q(function(o,i){n._callInterceptors(s.interceptorTypes.CLOSE).then(function(){var r=n._done(o,n),a=n._simpleBind(n.detach,n),d=n.config.onCloseSuccess||t.noop;d=t.bind(n,d,n,e),n.hide().then(a).then(r).then(d)["catch"](i)},i)})},s.prototype.attach=function(){if(this.isAttached&&this.panelEl)return this._$q.when(this);var e=this;return this._$q(function(n,o){var i=e._done(n,e),r=e.config.onDomAdded||t.noop,a=function(t){return e.isAttached=!0,e._addEventListeners(),t};e._$q.all([e._createBackdrop(),e._createPanel().then(a)["catch"](o)]).then(r).then(i)["catch"](o)})},s.prototype.detach=function(){if(!this.isAttached)return this._$q.when(this);var e=this,n=e.config.onDomRemoved||t.noop,o=function(){return e._removeEventListeners(),e._topFocusTrap&&e._topFocusTrap.parentNode&&e._topFocusTrap.parentNode.removeChild(e._topFocusTrap),e._bottomFocusTrap&&e._bottomFocusTrap.parentNode&&e._bottomFocusTrap.parentNode.removeChild(e._bottomFocusTrap),e._restoreCache.classes&&(e.panelEl[0].className=e._restoreCache.classes),e.panelEl[0].style.cssText=e._restoreCache.styles||"",e._compilerCleanup(),e.panelContainer.remove(),e.isAttached=!1,e._$q.when(e)};return this._restoreScroll&&(this._restoreScroll(),this._restoreScroll=null),this._$q(function(t,i){var r=e._done(t,e);e._$q.all([o(),!e._backdropRef||e._backdropRef.detach()]).then(n).then(r)["catch"](i)})},s.prototype.destroy=function(){var e=this;this.config.groupName&&t.forEach(this.config.groupName,function(t){e.removeFromGroup(t)}),this.config.scope.$destroy(),this.config.locals=null,this._interceptors=null},s.prototype.show=function(){if(!this.panelContainer)return this._$q(function(e,t){t("mdPanel: Panel does not exist yet. Call open() or attach().")});if(!this.panelContainer.hasClass(h))return this._$q.when(this);var e=this,n=function(){return e.panelContainer.removeClass(h),e._animateOpen()};return this._$q(function(o,i){var r=e._done(o,e),a=e.config.onOpenComplete||t.noop,d=function(){e.config.groupName&&t.forEach(e.config.groupName,function(t){e._$mdPanel._groups[t].openPanels.push(e)})};e._$q.all([e._backdropRef?e._backdropRef.show():e,n().then(function(){e._focusOnOpen()},i)]).then(a).then(d).then(r)["catch"](i)})},s.prototype.hide=function(){if(!this.panelContainer)return this._$q(function(e,t){t("mdPanel: Panel does not exist yet. Call open() or attach().")});if(this.panelContainer.hasClass(h))return this._$q.when(this);var e=this;return this._$q(function(n,o){var i=e._done(n,e),r=e.config.onRemoving||t.noop,a=function(){e.panelContainer.addClass(h)},d=function(){if(e.config.groupName){var n;t.forEach(e.config.groupName,function(t){t=e._$mdPanel._groups[t],n=t.openPanels.indexOf(e),n>-1&&t.openPanels.splice(n,1)})}},s=function(){var t=e.config.origin;t&&m(t).focus()};e._$q.all([e._backdropRef?e._backdropRef.hide():e,e._animateClose().then(r).then(a).then(d).then(s)["catch"](o)]).then(i,o)})},s.prototype.addClass=function(e,t){if(this._$log.warn("mdPanel: The addClass method is in the process of being deprecated. Full deprecation is scheduled for the AngularJS Material 1.2 release. To achieve the same results, use the panelContainer or panelEl JQLite elements that are referenced in MdPanelRef."),!this.panelContainer)throw new Error("mdPanel: Panel does not exist yet. Call open() or attach().");t||this.panelContainer.hasClass(e)?t&&!this.panelEl.hasClass(e)&&this.panelEl.addClass(e):this.panelContainer.addClass(e)},s.prototype.removeClass=function(e,t){if(this._$log.warn("mdPanel: The removeClass method is in the process of being deprecated. Full deprecation is scheduled for the AngularJS Material 1.2 release. To achieve the same results, use the panelContainer or panelEl JQLite elements that are referenced in MdPanelRef."),!this.panelContainer)throw new Error("mdPanel: Panel does not exist yet. Call open() or attach().");!t&&this.panelContainer.hasClass(e)?this.panelContainer.removeClass(e):t&&this.panelEl.hasClass(e)&&this.panelEl.removeClass(e)},s.prototype.toggleClass=function(e,t){if(this._$log.warn("mdPanel: The toggleClass method is in the process of being deprecated. Full deprecation is scheduled for the AngularJS Material 1.2 release. To achieve the same results, use the panelContainer or panelEl JQLite elements that are referenced in MdPanelRef."),!this.panelContainer)throw new Error("mdPanel: Panel does not exist yet. Call open() or attach().");t?this.panelEl.toggleClass(e):this.panelContainer.toggleClass(e)},s.prototype._compile=function(){var e=this;return e._$mdCompiler.compile(e.config).then(function(n){var o=e.config;if(o.contentElement){var i=n.element;e._restoreCache.styles=i[0].style.cssText,e._restoreCache.classes=i[0].className,e.panelContainer=e._$mdPanel._wrapContentElement(i),e.panelEl=i}else e.panelContainer=n.link(o.scope),e.panelEl=t.element(e.panelContainer[0].querySelector(".md-panel"));return e._compilerCleanup=n.cleanup,m(e.config.attachTo).append(e.panelContainer),e})},s.prototype._createPanel=function(){var e=this;return this._$q(function(t,n){e.config.locals||(e.config.locals={}),e.config.locals.mdPanelRef=e,e._compile().then(function(){e.config.disableParentScroll&&(e._restoreScroll=e._$mdUtil.disableScrollAround(null,e.panelContainer,{disableScrollMask:!0})),e.config.panelClass&&e.panelEl.addClass(e.config.panelClass),e.config.propagateContainerEvents&&e.panelContainer.css("pointer-events","none"),e._$animate.pin&&e._$animate.pin(e.panelContainer,m(e.config.attachTo)),e._configureTrapFocus(),e._addStyles().then(function(){t(e)},n)},n)})},s.prototype._addStyles=function(){var e=this;return this._$q(function(t){e.panelContainer.css("z-index",e.config.zIndex),e.panelEl.css("z-index",e.config.zIndex+1);var n=function(){e._setTheming(),e.panelEl.removeClass("_md-panel-offscreen"),e.panelContainer.addClass(h),t(e)};if(e.config.fullscreen)return e.panelEl.addClass("_md-panel-fullscreen"),void n();var o=e.config.position;return o?void e._$rootScope.$$postDigest(function(){e._updatePosition(!0),e._setTheming(),t(e)}):void n()})},s.prototype._setTheming=function(){this._$mdTheming(this.panelEl),this._$mdTheming(this.panelContainer)},s.prototype.updatePosition=function(e){if(!this.panelContainer)throw new Error("mdPanel: Panel does not exist yet. Call open() or attach().");this.config.position=e,this._updatePosition()},s.prototype._updatePosition=function(e){var t=this.config.position;t&&(t._setPanelPosition(this.panelEl),e&&(this.panelEl.removeClass("_md-panel-offscreen"),this.panelContainer.addClass(h)),this.panelEl.css(c.absPosition.TOP,t.getTop()),this.panelEl.css(c.absPosition.BOTTOM,t.getBottom()),this.panelEl.css(c.absPosition.LEFT,t.getLeft()),this.panelEl.css(c.absPosition.RIGHT,t.getRight()))},s.prototype._focusOnOpen=function(){if(this.config.focusOnOpen){var e=this;this._$rootScope.$$postDigest(function(){var t=e._$mdUtil.findFocusTarget(e.panelEl)||e.panelEl;t.focus()})}},s.prototype._createBackdrop=function(){if(this.config.hasBackdrop){if(!this._backdropRef){var e=this._$mdPanel.newPanelAnimation().openFrom(this.config.attachTo).withAnimation({open:"_md-opaque-enter",close:"_md-opaque-leave"});this.config.animation&&e.duration(this.config.animation._rawDuration);var t={animation:e,attachTo:this.config.attachTo,focusOnOpen:!1,panelClass:"_md-panel-backdrop",zIndex:this.config.zIndex-1};this._backdropRef=this._$mdPanel.create(t)}if(!this._backdropRef.isAttached)return this._backdropRef.attach()}},s.prototype._addEventListeners=function(){this._configureEscapeToClose(),this._configureClickOutsideToClose(),this._configureScrollListener()},s.prototype._removeEventListeners=function(){this._removeListeners&&this._removeListeners.forEach(function(e){e()}),this._removeListeners=[]},s.prototype._configureEscapeToClose=function(){if(this.config.escapeToClose){var e=m(this.config.attachTo),t=this,n=function(e){e.keyCode===t._$mdConstant.KEY_CODE.ESCAPE&&(e.stopPropagation(),e.preventDefault(),t.close(s.closeReasons.ESCAPE))};this.panelContainer.on("keydown",n),e.on("keydown",n),this._removeListeners.push(function(){t.panelContainer.off("keydown",n),e.off("keydown",n)})}},s.prototype._configureClickOutsideToClose=function(){if(this.config.clickOutsideToClose){var e,n=this.config.propagateContainerEvents?t.element(document.body):this.panelContainer,o=function(t){e=t.target},i=this,r=function(t){i.config.propagateContainerEvents?e===i.panelEl[0]||i.panelEl[0].contains(e)||i.close():e===n[0]&&t.target===n[0]&&(t.stopPropagation(),t.preventDefault(),i.close(s.closeReasons.CLICK_OUTSIDE))};n.on("mousedown",o),n.on("mouseup",r),this._removeListeners.push(function(){n.off("mousedown",o),n.off("mouseup",r)})}},s.prototype._configureScrollListener=function(){if(!this.config.disableParentScroll){var e=t.bind(this,this._updatePosition),n=this._$$rAF.throttle(e),o=this,i=function(){n()};this._$window.addEventListener("scroll",i,!0),this._removeListeners.push(function(){o._$window.removeEventListener("scroll",i,!0)})}},s.prototype._configureTrapFocus=function(){if(this.panelEl.attr("tabIndex","-1"),this.config.trapFocus){var e=this.panelEl;this._topFocusTrap=f.clone()[0],this._bottomFocusTrap=f.clone()[0];var t=function(){e.focus()};this._topFocusTrap.addEventListener("focus",t),this._bottomFocusTrap.addEventListener("focus",t),this._removeListeners.push(this._simpleBind(function(){this._topFocusTrap.removeEventListener("focus",t),this._bottomFocusTrap.removeEventListener("focus",t)},this)),e[0].parentNode.insertBefore(this._topFocusTrap,e[0]),e.after(this._bottomFocusTrap)}},s.prototype.updateAnimation=function(e){this.config.animation=e,this._backdropRef&&this._backdropRef.config.animation.duration(e._rawDuration)},s.prototype._animateOpen=function(){this.panelContainer.addClass("md-panel-is-showing");var e=this.config.animation;if(!e)return this.panelContainer.addClass("_md-panel-shown"),this._$q.when(this);var t=this;return this._$q(function(n){var o=t._done(n,t),i=function(){t._$log.warn("mdPanel: MdPanel Animations failed. Showing panel without animating."),o()};e.animateOpen(t.panelEl).then(o,i)})},s.prototype._animateClose=function(){var e=this.config.animation;if(!e)return this.panelContainer.removeClass("md-panel-is-showing"),this.panelContainer.removeClass("_md-panel-shown"),this._$q.when(this);var t=this;return this._$q(function(n){var o=function(){t.panelContainer.removeClass("md-panel-is-showing"),n(t)},i=function(){t._$log.warn("mdPanel: MdPanel Animations failed. Hiding panel without animating."),o()};e.animateClose(t.panelEl).then(o,i)})},s.prototype.registerInterceptor=function(e,n){var o=null;if(t.isString(e)?t.isFunction(n)||(o="Interceptor callback must be a function, instead got "+typeof n):o="Interceptor type must be a string, instead got "+typeof e,o)throw new Error("MdPanel: "+o);var i=this._interceptors[e]=this._interceptors[e]||[];return i.indexOf(n)===-1&&i.push(n),this},s.prototype.removeInterceptor=function(e,t){var n=this._interceptors[e]?this._interceptors[e].indexOf(t):-1;return n>-1&&this._interceptors[e].splice(n,1),this},s.prototype.removeAllInterceptors=function(e){return e?this._interceptors[e]=[]:this._interceptors=Object.create(null),this},s.prototype._callInterceptors=function(e){var n=this,o=n._$q,i=n._interceptors&&n._interceptors[e]||[];return i.reduceRight(function(e,i){var r=i&&t.isFunction(i.then),a=r?i:null;return e.then(function(){if(!a)try{a=i(n)}catch(e){a=o.reject(e)}return a})},o.resolve(n))},s.prototype._simpleBind=function(e,t){return function(n){return e.apply(t,n)}},s.prototype._done=function(e,t){return function(){e(t)}},s.prototype.addToGroup=function(e){this._$mdPanel._groups[e]||this._$mdPanel.newPanelGroup(e);var t=this._$mdPanel._groups[e],n=t.panels.indexOf(this);n<0&&t.panels.push(this)},s.prototype.removeFromGroup=function(e){if(!this._$mdPanel._groups[e])throw new Error("mdPanel: The group "+e+" does not exist.");var t=this._$mdPanel._groups[e],n=t.panels.indexOf(this);n>-1&&t.panels.splice(n,1)},s.closeReasons={CLICK_OUTSIDE:"clickOutsideToClose",ESCAPE:"escapeToClose"},c.xPosition={CENTER:"center",ALIGN_START:"align-start",ALIGN_END:"align-end",OFFSET_START:"offset-start",OFFSET_END:"offset-end"},c.yPosition={CENTER:"center",ALIGN_TOPS:"align-tops",ALIGN_BOTTOMS:"align-bottoms",ABOVE:"above",BELOW:"below"},c.absPosition={TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},c.viewportMargin=8,c.prototype.absolute=function(){return this._absolute=!0,this},c.prototype._setPosition=function(e,n){if(e===c.absPosition.RIGHT||e===c.absPosition.LEFT)this._left=this._right="";else{if(e!==c.absPosition.BOTTOM&&e!==c.absPosition.TOP){var o=Object.keys(c.absPosition).join().toLowerCase();throw new Error("mdPanel: Position must be one of "+o+".")}this._top=this._bottom=""}return this["_"+e]=t.isString(n)?n:"0",this},c.prototype.top=function(e){return this._setPosition(c.absPosition.TOP,e)},c.prototype.bottom=function(e){return this._setPosition(c.absPosition.BOTTOM,e)},c.prototype.start=function(e){var t=this._isRTL?c.absPosition.RIGHT:c.absPosition.LEFT;return this._setPosition(t,e)},c.prototype.end=function(e){var t=this._isRTL?c.absPosition.LEFT:c.absPosition.RIGHT;return this._setPosition(t,e)},c.prototype.left=function(e){return this._setPosition(c.absPosition.LEFT,e)},c.prototype.right=function(e){return this._setPosition(c.absPosition.RIGHT,e)},c.prototype.centerHorizontally=function(){return this._left="50%",this._right="",this._translateX=["-50%"],this},c.prototype.centerVertically=function(){return this._top="50%",this._bottom="",this._translateY=["-50%"],this},c.prototype.center=function(){return this.centerHorizontally().centerVertically()},c.prototype.relativeTo=function(e){return this._absolute=!1,this._relativeToEl=m(e),this},c.prototype.addPanelPosition=function(e,t){if(!this._relativeToEl)throw new Error("mdPanel: addPanelPosition can only be used with relative positioning. Set relativeTo first.");return this._validateXPosition(e),this._validateYPosition(t),this._positions.push({x:e,y:t}),this},c.prototype._validateYPosition=function(e){if(null!=e){for(var t,n=Object.keys(c.yPosition),o=[],i=0;t=n[i];i++){var r=c.yPosition[t];if(o.push(r),r===e)return}throw new Error("mdPanel: Panel y position only accepts the following values:\n"+o.join(" | "))}},c.prototype._validateXPosition=function(e){if(null!=e){for(var t,n=Object.keys(c.xPosition),o=[],i=0;t=n[i];i++){var r=c.xPosition[t];if(o.push(r),r===e)return}throw new Error("mdPanel: Panel x Position only accepts the following values:\n"+o.join(" | "))}},c.prototype.withOffsetX=function(e){return this._translateX.push(e),this},c.prototype.withOffsetY=function(e){return this._translateY.push(e),this},c.prototype.getTop=function(){return this._top},c.prototype.getBottom=function(){return this._bottom},c.prototype.getLeft=function(){return this._left},c.prototype.getRight=function(){return this._right},c.prototype.getTransform=function(){var e=this._reduceTranslateValues("translateX",this._translateX),t=this._reduceTranslateValues("translateY",this._translateY);return(e+" "+t).trim()},c.prototype._setTransform=function(e){return e.css(this._$mdConstant.CSS.TRANSFORM,this.getTransform())},c.prototype._isOnscreen=function(e){var t=parseInt(this.getLeft()),n=parseInt(this.getTop());if(this._translateX.length||this._translateY.length){var o=this._$mdConstant.CSS.TRANSFORM,i=u(e,o);t+=i.x,n+=i.y}var r=t+e[0].offsetWidth,a=n+e[0].offsetHeight;return t>=0&&n>=0&&a<=this._$window.innerHeight&&r<=this._$window.innerWidth},c.prototype.getActualPosition=function(){return this._actualPosition},c.prototype._reduceTranslateValues=function(e,n){return n.map(function(n){var o=t.isFunction(n)?n(this):n;return e+"("+o+")"},this).join(" ")},c.prototype._setPanelPosition=function(e){if(e.removeClass("_md-panel-position-adjusted"),this._absolute)return void this._setTransform(e);if(this._actualPosition)return this._calculatePanelPosition(e,this._actualPosition),this._setTransform(e),void this._constrainToViewport(e);for(var t=0;t<this._positions.length;t++)if(this._actualPosition=this._positions[t],this._calculatePanelPosition(e,this._actualPosition),this._setTransform(e),this._isOnscreen(e))return;this._constrainToViewport(e)},c.prototype._constrainToViewport=function(e){var t=c.viewportMargin,n=this._top,o=this._left;if(this.getTop()){var i=parseInt(this.getTop()),r=e[0].offsetHeight+i,a=this._$window.innerHeight;i<t?this._top=t+"px":r>a&&(this._top=i-(r-a+t)+"px")}if(this.getLeft()){var d=parseInt(this.getLeft()),s=e[0].offsetWidth+d,l=this._$window.innerWidth;d<t?this._left=t+"px":s>l&&(this._left=d-(s-l+t)+"px")}e.toggleClass("_md-panel-position-adjusted",this._top!==n||this._left!==o)},c.prototype._reverseXPosition=function(e){if(e!==c.xPosition.CENTER){var t="start",n="end";return e.indexOf(t)>-1?e.replace(t,n):e.replace(n,t)}},c.prototype._bidi=function(e){return this._isRTL?this._reverseXPosition(e):e},c.prototype._calculatePanelPosition=function(e,t){var n=e[0].getBoundingClientRect(),o=n.width,i=n.height,r=this._relativeToEl[0].getBoundingClientRect(),a=r.left,d=r.right,s=r.width;switch(this._bidi(t.x)){case c.xPosition.OFFSET_START:this._left=a-o+"px";break;case c.xPosition.ALIGN_END:this._left=d-o+"px";break;case c.xPosition.CENTER:var l=a+.5*s-.5*o;this._left=l+"px";break;case c.xPosition.ALIGN_START:this._left=a+"px";break;case c.xPosition.OFFSET_END:this._left=d+"px"}var m=r.top,u=r.bottom,p=r.height;switch(t.y){case c.yPosition.ABOVE:this._top=m-i+"px";break;case c.yPosition.ALIGN_BOTTOMS:this._top=u-i+"px";break;case c.yPosition.CENTER:var h=m+.5*p-.5*i;this._top=h+"px";break;case c.yPosition.ALIGN_TOPS:this._top=m+"px";break;case c.yPosition.BELOW:this._top=u+"px"}},l.animation={SLIDE:"md-panel-animate-slide",SCALE:"md-panel-animate-scale",FADE:"md-panel-animate-fade"},l.prototype.openFrom=function(e){return e=e.target?e.target:e,this._openFrom=this._getPanelAnimationTarget(e),this._closeTo||(this._closeTo=this._openFrom),this},l.prototype.closeTo=function(e){return this._closeTo=this._getPanelAnimationTarget(e),this},l.prototype.duration=function(e){function n(e){if(t.isNumber(e))return e/1e3}return e&&(t.isNumber(e)?this._openDuration=this._closeDuration=n(e):t.isObject(e)&&(this._openDuration=n(e.open),this._closeDuration=n(e.close))),this._rawDuration=e,this},l.prototype._getPanelAnimationTarget=function(e){return t.isDefined(e.top)||t.isDefined(e.left)?{element:n,bounds:{top:e.top||0,left:e.left||0}}:this._getBoundingClientRect(m(e))},l.prototype.withAnimation=function(e){return this._animationClass=e,this},l.prototype.animateOpen=function(e){var n=this._$mdUtil.dom.animator;this._fixBounds(e);var o={},i=e[0].style.transform||"",r=n.toTransformCss(i),a=n.toTransformCss(i);switch(this._animationClass){case l.animation.SLIDE:e.css("opacity","1"),o={transitionInClass:"_md-panel-animate-enter"};var d=n.calculateSlideToOrigin(e,this._openFrom)||"";r=n.toTransformCss(d+" "+i);break;case l.animation.SCALE:o={transitionInClass:"_md-panel-animate-enter"};var s=n.calculateZoomToOrigin(e,this._openFrom)||"";r=n.toTransformCss(s+" "+i);break;case l.animation.FADE:o={transitionInClass:"_md-panel-animate-enter"};break;default:o=t.isString(this._animationClass)?{transitionInClass:this._animationClass}:{transitionInClass:this._animationClass.open,transitionOutClass:this._animationClass.close}}return o.duration=this._openDuration,n.translate3d(e,r,a,o)},l.prototype.animateClose=function(e){var n=this._$mdUtil.dom.animator,o={},i=e[0].style.transform||"",r=n.toTransformCss(i),a=n.toTransformCss(i);switch(this._animationClass){case l.animation.SLIDE:e.css("opacity","1"),o={transitionInClass:"_md-panel-animate-leave"};var d=n.calculateSlideToOrigin(e,this._closeTo)||"";a=n.toTransformCss(d+" "+i);break;case l.animation.SCALE:o={transitionInClass:"_md-panel-animate-scale-out _md-panel-animate-leave"};var s=n.calculateZoomToOrigin(e,this._closeTo)||"";a=n.toTransformCss(s+" "+i);break;case l.animation.FADE:o={transitionInClass:"_md-panel-animate-fade-out _md-panel-animate-leave"};break;default:o=t.isString(this._animationClass)?{transitionOutClass:this._animationClass}:{transitionInClass:this._animationClass.close,transitionOutClass:this._animationClass.open}}return o.duration=this._closeDuration,n.translate3d(e,r,a,o)},l.prototype._fixBounds=function(e){var t=e[0].offsetWidth,n=e[0].offsetHeight;this._openFrom&&null==this._openFrom.bounds.height&&(this._openFrom.bounds.height=n),this._openFrom&&null==this._openFrom.bounds.width&&(this._openFrom.bounds.width=t),this._closeTo&&null==this._closeTo.bounds.height&&(this._closeTo.bounds.height=n),this._closeTo&&null==this._closeTo.bounds.width&&(this._closeTo.bounds.width=t)},l.prototype._getBoundingClientRect=function(e){if(e instanceof t.element)return{element:e,bounds:e[0].getBoundingClientRect()}}}(),function(){function e(e,n,o){function i(e,t,n){return e.attr("aria-valuemin",0),e.attr("aria-valuemax",100),e.attr("role","progressbar"),r}function r(o,i,r){function u(){r.$observe("value",function(e){var t=a(e);i.attr("aria-valuenow",t),h()!=l&&f($,t)}),r.$observe("mdBufferValue",function(e){f(E,a(e))}),r.$observe("disabled",function(e){b=e===!0||e===!1?!!e:t.isDefined(e),i.toggleClass(m,b),C.toggleClass(g,!b)}),r.$observe("mdMode",function(e){switch(g&&C.removeClass(g),e){case l:case c:case d:case s:C.addClass(g="md-mode-"+e);break;default:C.addClass(g="md-mode-"+s)}})}function p(){if(t.isUndefined(r.mdMode)){var e=t.isDefined(r.value),n=e?d:s;i.attr("md-mode",n),r.mdMode=n}}function h(){var e=(r.mdMode||"").trim();if(e)switch(e){case d:case s:case c:case l:break;default:e=s}return e}function f(e,o){if(!b&&h()){var i=n.supplant("translateX({0}%) scale({1},1)",[(o-100)/2,o/100]),r=v({transform:i});t.element(e).css(r)}}e(i);var g,b=r.hasOwnProperty("disabled"),v=n.dom.animator.toCss,E=t.element(i[0].querySelector(".md-bar1")),$=t.element(i[0].querySelector(".md-bar2")),C=t.element(i[0].querySelector(".md-container"));i.attr("md-mode",h()).toggleClass(m,b),p(),u()}function a(e){return Math.max(0,Math.min(e||0,100))}var d="determinate",s="indeterminate",c="buffer",l="query",m="_md-progress-linear-disabled";return{restrict:"E",template:'<div class="md-container"><div class="md-dashed"></div><div class="md-bar md-bar1"></div><div class="md-bar md-bar2"></div></div>',compile:i}}e.$inject=["$mdTheming","$mdUtil","$log"],t.module("material.components.progressLinear",["material.core"]).directive("mdProgressLinear",e)}(),function(){function e(e,n,o,i){function r(r,a,d,s){function c(){a.hasClass("md-focused")||a.addClass("md-focused")}function l(o){var i=o.which||o.keyCode;if(i==n.KEY_CODE.ENTER||o.currentTarget==o.target)switch(i){case n.KEY_CODE.LEFT_ARROW:case n.KEY_CODE.UP_ARROW:o.preventDefault(),m.selectPrevious(),c();break;case n.KEY_CODE.RIGHT_ARROW:case n.KEY_CODE.DOWN_ARROW:o.preventDefault(),m.selectNext(),c();break;case n.KEY_CODE.ENTER:var r=t.element(e.getClosest(a[0],"form"));r.length>0&&r.triggerHandler("submit")}}a.addClass("_md"),o(a);var m=s[0],u=s[1]||e.fakeNgModel();m.init(u),r.mouseActive=!1,a.attr({role:"radiogroup",tabIndex:a.attr("tabindex")||"0"}).on("keydown",l).on("mousedown",function(e){r.mouseActive=!0,i(function(){r.mouseActive=!1},100)}).on("focus",function(){r.mouseActive===!1&&m.$element.addClass("md-focused")}).on("blur",function(){m.$element.removeClass("md-focused")})}function a(e){this._radioButtonRenderFns=[],this.$element=e}function d(){return{init:function(e){this._ngModelCtrl=e,this._ngModelCtrl.$render=t.bind(this,this.render)},add:function(e){this._radioButtonRenderFns.push(e)},remove:function(e){var t=this._radioButtonRenderFns.indexOf(e);t!==-1&&this._radioButtonRenderFns.splice(t,1)},render:function(){this._radioButtonRenderFns.forEach(function(e){e()})},setViewValue:function(e,t){this._ngModelCtrl.$setViewValue(e,t),this.render()},getViewValue:function(){return this._ngModelCtrl.$viewValue},selectNext:function(){return s(this.$element,1)},selectPrevious:function(){return s(this.$element,-1)},setActiveDescendant:function(e){this.$element.attr("aria-activedescendant",e)},isDisabled:function(){return this.$element[0].hasAttribute("disabled")}}}function s(n,o){var i=e.iterator(n[0].querySelectorAll("md-radio-button"),!0);if(i.count()){var r=function(e){return!t.element(e).attr("disabled")},a=n[0].querySelector("md-radio-button.md-checked"),d=i[o<0?"previous":"next"](a,r)||i.first();t.element(d).triggerHandler("click")}}return a.prototype=d(),{restrict:"E",controller:["$element",a],require:["mdRadioGroup","?ngModel"],link:{pre:r}}}function n(e,t,n){function o(o,r,a,d){function s(){if(!d)throw"RadioButton: No RadioGroupController could be found.";d.add(l),a.$observe("value",l),r.on("click",c).on("$destroy",function(){d.remove(l)})}function c(e){r[0].hasAttribute("disabled")||d.isDisabled()||o.$apply(function(){d.setViewValue(a.value,e&&e.type)})}function l(){var e=d.getViewValue()==a.value;e!==u&&("md-radio-group"!==r[0].parentNode.nodeName.toLowerCase()&&r.parent().toggleClass(i,e),e&&d.setActiveDescendant(r.attr("id")),u=e,r.attr("aria-checked",e).toggleClass(i,e))}function m(n,o){n.attr({id:a.id||"radio_"+t.nextUid(),role:"radio","aria-checked":"false"}),e.expectWithText(n,"aria-label")}var u;n(r),m(r,o),a.ngValue?t.nextTick(s,!1):s()}var i="md-checked";return{restrict:"E",require:"^mdRadioGroup",transclude:!0,template:'<div class="md-container" md-ink-ripple md-ink-ripple-checkbox><div class="md-off"></div><div class="md-on"></div></div><div ng-transclude class="md-label"></div>',link:o}}e.$inject=["$mdUtil","$mdConstant","$mdTheming","$timeout"],n.$inject=["$mdAria","$mdUtil","$mdTheming"],t.module("material.components.radioButton",["material.core"]).directive("mdRadioGroup",e).directive("mdRadioButton",n)}(),function(){function e(e,t){return["$mdUtil","$window",function(n,o){return{restrict:"A",multiElement:!0,link:function(i,r,a){var d=i.$on("$md-resize-enable",function(){d();var s=r[0],c=s.nodeType===o.Node.ELEMENT_NODE?o.getComputedStyle(s):{};i.$watch(a[e],function(e){if(!!e===t){n.nextTick(function(){i.$broadcast("$md-resize")});var o={cachedTransitionStyles:c};n.dom.animator.waitTransitionEnd(r,o).then(function(){i.$broadcast("$md-resize")})}})})}}}]}t.module("material.components.showHide",["material.core"]).directive("ngShow",e("ngShow",!0)).directive("ngHide",e("ngHide",!1))}(),function(){function e(e,o,i,r){function a(e,n){var r=function(){return!1},a=function(){return i.when(o.supplant(c,[n||""]))};return t.extend({isLockedOpen:r,isOpen:r,toggle:a,open:a,close:a,onClose:t.noop,then:function(e){return s(n).then(e||t.noop)}},e)}function d(t,i){var a=e.get(t);return a||i?a:(r.error(o.supplant(c,[t||""])),n)}function s(t){return e.when(t)["catch"](r.error)}var c="SideNav '{0}' is not available! Did you use md-component-id='{0}'?",l={find:d,waitFor:s};return function(e,n){if(t.isUndefined(e))return l;var o=n===!0,i=l.find(e,o);return!i&&o?l.waitFor(e):!i&&t.isUndefined(n)?a(l,e):i}}function o(){return{restrict:"A",require:"^mdSidenav",link:function(e,t,n,o){}}}function i(e,o,i,r,a,d,s,c,l,m,u,p,h){function f(s,f,g,b){function v(e,t){s.isLockedOpen=e,e===t?f.toggleClass("md-locked-open",!!e):d[e?"addClass":"removeClass"](f,"md-locked-open"),w&&w.toggleClass("md-locked-open",!!e)}function E(e){var t=o.findFocusTarget(f)||o.findFocusTarget(f,"[md-sidenav-focus]")||f,n=f.parent();n[e?"on":"off"]("keydown",M),w&&w[e?"on":"off"]("click",T);var i=$(n,e);return e&&(N=u[0].activeElement,k=a.getLastInteractionType()),C(e),S=m.all([e&&w?d.enter(w,n):w?d.leave(w):m.when(!0),d[e?"removeClass":"addClass"](f,"md-closed")]).then(function(){s.isOpen&&(h(function(){I.triggerHandler("resize")}),t&&t.focus()),i&&i()})}function $(e,t){var n=f[0],o=e[0].scrollTop;if(t&&o){_={top:n.style.top,bottom:n.style.bottom,height:n.style.height};var i={
top:o+"px",bottom:"auto",height:e[0].clientHeight+"px"};f.css(i),w.css(i)}if(!t&&_)return function(){n.style.top=_.top,n.style.bottom=_.bottom,n.style.height=_.height,w[0].style.top=null,w[0].style.bottom=null,w[0].style.height=null,_=null}}function C(e){e&&!A?(A=x.css("overflow"),x.css("overflow","hidden")):t.isDefined(A)&&(x.css("overflow",A),A=n)}function y(e){return s.isOpen==e?m.when(!0):(s.isOpen&&b.onCloseCb&&b.onCloseCb(),m(function(t){s.isOpen=e,o.nextTick(function(){S.then(function(e){!s.isOpen&&N&&"keyboard"===k&&(N.focus(),N=null),t(e)})})}))}function M(e){var t=e.keyCode===i.KEY_CODE.ESCAPE;return t?T(e):m.when(!0)}function T(e){return e.preventDefault(),b.close()}var A,w,k,_,x=null,N=null,S=m.when(!0),D=c(g.mdIsLockedOpen),I=t.element(p),H=function(){return D(s.$parent,{$media:function(t){return l.warn("$media is deprecated for is-locked-open. Use $mdMedia instead."),e(t)},$mdMedia:e})};g.mdDisableScrollTarget&&(x=u[0].querySelector(g.mdDisableScrollTarget),x?x=t.element(x):l.warn(o.supplant('mdSidenav: couldn\'t find element matching selector "{selector}". Falling back to parent.',{selector:g.mdDisableScrollTarget}))),x||(x=f.parent()),g.hasOwnProperty("mdDisableBackdrop")||(w=o.createBackdrop(s,"md-sidenav-backdrop md-opaque ng-enter")),f.addClass("_md"),r(f),w&&r.inherit(w,f),f.on("$destroy",function(){w&&w.remove(),b.destroy()}),s.$on("$destroy",function(){w&&w.remove()}),s.$watch(H,v),s.$watch("isOpen",E),b.$toggleOpen=y}return{restrict:"E",scope:{isOpen:"=?mdIsOpen"},controller:"$mdSidenavController",compile:function(e){return e.addClass("md-closed").attr("tabIndex","-1"),f}}}function r(e,t,n,o,i){var r=this;r.isOpen=function(){return!!e.isOpen},r.isLockedOpen=function(){return!!e.isLockedOpen},r.onClose=function(e){return r.onCloseCb=e,r},r.open=function(){return r.$toggleOpen(!0)},r.close=function(){return r.$toggleOpen(!1)},r.toggle=function(){return r.$toggleOpen(!e.isOpen)},r.$toggleOpen=function(t){return o.when(e.isOpen=t)};var a=t.mdComponentId,d=a&&a.indexOf(i.startSymbol())>-1,s=d?i(a)(e.$parent):a;r.destroy=n.register(r,s),d&&t.$observe("mdComponentId",function(e){e&&e!==r.$$mdHandle&&(r.destroy(),r.destroy=n.register(r,e))})}e.$inject=["$mdComponentRegistry","$mdUtil","$q","$log"],i.$inject=["$mdMedia","$mdUtil","$mdConstant","$mdTheming","$mdInteraction","$animate","$compile","$parse","$log","$q","$document","$window","$$rAF"],r.$inject=["$scope","$attrs","$mdComponentRegistry","$q","$interpolate"],t.module("material.components.sidenav",["material.core","material.components.backdrop"]).factory("$mdSidenav",e).directive("mdSidenav",i).directive("mdSidenavFocus",o).controller("$mdSidenavController",r)}(),function(){function o(e,o,i,r,a,d,s,l){function m(l,m){var u=t.element("<md-select-value><span></span></md-select-value>");if(u.append('<span class="md-select-icon" aria-hidden="true"></span>'),u.addClass("md-select-value"),u[0].hasAttribute("id")||u.attr("id","select_value_label_"+o.nextUid()),l.find("md-content").length||l.append(t.element("<md-content>").append(l.contents())),m.mdOnOpen&&(l.find("md-content").prepend(t.element('<div> <md-progress-circular md-mode="indeterminate" ng-if="$$loadingAsyncDone === false" md-diameter="25px"></md-progress-circular></div>')),l.find("md-option").attr("ng-show","$$loadingAsyncDone")),m.name){var p=t.element('<select class="md-visually-hidden">');p.attr({name:m.name,"aria-hidden":"true",tabindex:"-1"});var h=l.find("md-option");t.forEach(h,function(e){var n=t.element("<option>"+e.innerHTML+"</option>");e.hasAttribute("ng-value")?n.attr("ng-value",e.getAttribute("ng-value")):e.hasAttribute("value")&&n.attr("value",e.getAttribute("value")),p.append(n)}),p.append('<option ng-value="'+m.ngModel+'" selected></option>'),l.parent().append(p)}var f=o.parseAttributeBoolean(m.multiple),g=f?"multiple":"",b='<div class="md-select-menu-container" aria-hidden="true"><md-select-menu {0}>{1}</md-select-menu></div>';return b=o.supplant(b,[g,l.html()]),l.empty().append(u),l.append(b),m.tabindex||m.$set("tabindex",0),function(l,m,u,p){function h(){var e=m.attr("aria-label")||m.attr("placeholder");!e&&A&&A.label&&(e=A.label.text()),M=e,a.expect(m,"aria-label",e)}function g(){I&&(O=O||I.find("md-select-menu").controller("mdSelectMenu"),w.setLabelText(O.selectedLabels()))}function b(){if(M){var e=O.selectedLabels({mode:"aria"});m.attr("aria-label",e.length?M+": "+e:M)}}function v(){A&&A.setHasValue(O.selectedLabels().length>0||(m[0].validity||{}).badInput)}function E(){if(I=t.element(m[0].querySelector(".md-select-menu-container")),H=l,u.mdContainerClass){var e=I[0].getAttribute("class")+" "+u.mdContainerClass;I[0].setAttribute("class",e)}O=I.find("md-select-menu").controller("mdSelectMenu"),O.init(k,u.ngModel),m.on("$destroy",function(){I.remove()})}function $(e){if(i.isNavigationKey(e))e.preventDefault(),C(e);else if(c(e,i)){e.preventDefault();var n=O.optNodeForKeyboardSearch(e);if(!n||n.hasAttribute("disabled"))return;var o=t.element(n).controller("mdOption");O.isMultiple||O.deselect(Object.keys(O.selected)[0]),O.select(o.hashKey,o.value),O.refreshViewValue()}}function C(){H._mdSelectIsOpen=!0,m.attr("aria-expanded","true"),e.show({scope:H,preserveScope:!0,skipCompile:!0,element:I,target:m[0],selectCtrl:w,preserveElement:!0,hasBackdrop:!0,loadingAsync:!!u.mdOnOpen&&(l.$eval(u.mdOnOpen)||!0)})["finally"](function(){H._mdSelectIsOpen=!1,m.focus(),m.attr("aria-expanded","false"),k.$setTouched()})}var y,M,T=!0,A=p[0],w=p[1],k=p[2],_=p[3],x=m.find("md-select-value"),N=t.isDefined(u.readonly),S=o.parseAttributeBoolean(u.mdNoAsterisk);if(S&&m.addClass("md-no-asterisk"),A){var D=A.isErrorGetter||function(){return k.$invalid&&(k.$touched||_&&_.$submitted)};if(A.input&&m.find("md-select-header").find("input")[0]!==A.input[0])throw new Error("<md-input-container> can only have *one* child <input>, <textarea> or <select> element!");A.input=m,A.label||a.expect(m,"aria-label",m.attr("placeholder")),l.$watch(D,A.setInvalid)}var I,H,O;E(),r(m),_&&t.isDefined(u.multiple)&&o.nextTick(function(){var e=k.$modelValue||k.$viewValue;e&&_.$setPristine()});var P=k.$render;k.$render=function(){P(),g(),b(),v()},u.$observe("placeholder",k.$render),A&&A.label&&u.$observe("required",function(e){A.label.toggleClass("md-required",e&&!S)}),w.setLabelText=function(e){w.setIsPlaceholder(!e);var t=!1;if(u.mdSelectedText&&u.mdSelectedHtml)throw Error("md-select cannot have both `md-selected-text` and `md-selected-html`");if(u.mdSelectedText||u.mdSelectedHtml)e=d(u.mdSelectedText||u.mdSelectedHtml)(l),t=!0;else if(!e){var n=u.placeholder||(A&&A.label?A.label.text():"");e=n||"",t=!0}var o=x.children().eq(0);u.mdSelectedHtml?o.html(s.getTrustedHtml(e)):t?o.text(e):o.html(e)},w.setIsPlaceholder=function(e){e?(x.addClass("md-select-placeholder"),A&&A.label&&A.label.addClass("md-placeholder")):(x.removeClass("md-select-placeholder"),A&&A.label&&A.label.removeClass("md-placeholder"))},N||(m.on("focus",function(e){A&&A.setFocused(!0)}),m.on("blur",function(e){T&&(T=!1,H._mdSelectIsOpen&&e.stopImmediatePropagation()),H._mdSelectIsOpen||(A&&A.setFocused(!1),v())})),w.triggerClose=function(){d(u.mdOnClose)(l)},l.$$postDigest(function(){h(),g(),b()}),l.$watch(function(){return O.selectedLabels()},g);var L;u.$observe("ngMultiple",function(e){L&&L();var t=d(e);L=l.$watch(function(){return t(l)},function(e,t){e===n&&t===n||(e?m.attr("multiple","multiple"):m.removeAttr("multiple"),m.attr("aria-multiselectable",e?"true":"false"),I&&(O.setMultiple(e),P=k.$render,k.$render=function(){P(),g(),b(),v()},k.$render()))})}),u.$observe("disabled",function(e){t.isString(e)&&(e=!0),y!==n&&y===e||(y=e,e?m.attr({"aria-disabled":"true"}).removeAttr("tabindex").off("click",C).off("keydown",$):m.attr({tabindex:u.tabindex,"aria-disabled":"false"}).on("click",C).on("keydown",$))}),u.hasOwnProperty("disabled")||u.hasOwnProperty("ngDisabled")||(m.attr({"aria-disabled":"false"}),m.on("click",C),m.on("keydown",$));var R={role:"listbox","aria-expanded":"false","aria-multiselectable":f&&!u.ngMultiple?"true":"false"};m[0].hasAttribute("id")||(R.id="select_"+o.nextUid());var F="select_container_"+o.nextUid();I.attr("id",F),R["aria-owns"]=F,m.attr(R),l.$on("$destroy",function(){e.destroy()["finally"](function(){A&&(A.setFocused(!1),A.setHasValue(!1),A.input=null),k.$setTouched()})})}}var u=i.KEY_CODE;[u.SPACE,u.ENTER,u.UP_ARROW,u.DOWN_ARROW];return{restrict:"E",require:["^?mdInputContainer","mdSelect","ngModel","?^form"],compile:m,controller:function(){}}}function i(e,o,i,r){function a(e,n,i,a){function d(e){13!=e.keyCode&&32!=e.keyCode||s(e)}function s(n){var i=o.getClosest(n.target,"md-option"),r=i&&t.element(i).data("$mdOptionController");if(i&&r){if(i.hasAttribute("disabled"))return n.stopImmediatePropagation(),!1;var a=c.hashGetter(r.value),d=t.isDefined(c.selected[a]);e.$apply(function(){c.isMultiple?d?c.deselect(a):c.select(a,r.value):d||(c.deselect(Object.keys(c.selected)[0]),c.select(a,r.value)),c.refreshViewValue()})}}var c=a[0];n.addClass("_md"),r(n),n.on("click",s),n.on("keypress",d)}function d(r,a,d){function s(){var e=l.ngModel.$modelValue||l.ngModel.$viewValue||[];if(t.isArray(e)){var n=Object.keys(l.selected),o=e.map(l.hashGetter),i=n.filter(function(e){return o.indexOf(e)===-1});i.forEach(l.deselect),o.forEach(function(t,n){l.select(t,e[n])})}}function c(){var e=l.ngModel.$viewValue||l.ngModel.$modelValue;Object.keys(l.selected).forEach(l.deselect),l.select(l.hashGetter(e),e)}var l=this;l.isMultiple=t.isDefined(a.multiple),l.selected={},l.options={},r.$watchCollection(function(){return l.options},function(){l.ngModel.$render()});var u,p;l.setMultiple=function(e){function n(e,n){return t.isArray(e||n||[])}var o=l.ngModel;p=p||o.$isEmpty,l.isMultiple=e,u&&u(),l.isMultiple?(o.$validators["md-multiple"]=n,o.$render=s,r.$watchCollection(l.modelBinding,function(e){n(e)&&s(e),l.ngModel.$setPristine()}),o.$isEmpty=function(e){return!e||0===e.length}):(delete o.$validators["md-multiple"],o.$render=c)};var h,f,g,b="",v=300;l.optNodeForKeyboardSearch=function(e){h&&clearTimeout(h),h=setTimeout(function(){h=n,b="",g=n,f=n},v);var o=e.keyCode-(i.isNumPadKey(e)?48:0);b+=String.fromCharCode(o);var r=new RegExp("^"+b,"i");f||(f=d.find("md-option"),g=new Array(f.length),t.forEach(f,function(e,t){g[t]=e.textContent.trim()}));for(var a=0;a<g.length;++a)if(r.test(g[a]))return f[a]},l.init=function(n,i){l.ngModel=n,l.modelBinding=i,l.ngModel.$isEmpty=function(e){return!l.options[l.hashGetter(e)]};var a=o.getModelOption(n,"trackBy");if(a){var d={},s=e(a);l.hashGetter=function(e,t){return d.$value=e,s(t||r,d)}}else l.hashGetter=function(e){return t.isObject(e)?"object_"+(e.$$mdSelectId||(e.$$mdSelectId=++m)):e};l.setMultiple(l.isMultiple)},l.selectedLabels=function(e){e=e||{};var t=e.mode||"html",n=o.nodesToArray(d[0].querySelectorAll("md-option[selected]"));if(n.length){var i;return"html"==t?i=function(e){if(e.hasAttribute("md-option-empty"))return"";var t=e.innerHTML,n=e.querySelector(".md-ripple-container");n&&(t=t.replace(n.outerHTML,""));var o=e.querySelector(".md-container");return o&&(t=t.replace(o.outerHTML,"")),t}:"aria"==t&&(i=function(e){return e.hasAttribute("aria-label")?e.getAttribute("aria-label"):e.textContent}),o.uniq(n.map(i)).join(", ")}return""},l.select=function(e,t){var n=l.options[e];n&&n.setSelected(!0),l.selected[e]=t},l.deselect=function(e){var t=l.options[e];t&&t.setSelected(!1),delete l.selected[e]},l.addOption=function(e,n){if(t.isDefined(l.options[e]))throw new Error('Duplicate md-option values are not allowed in a select. Duplicate value "'+n.value+'" found.');l.options[e]=n,t.isDefined(l.selected[e])&&(l.select(e,n.value),t.isDefined(l.ngModel.$modelValue)&&l.hashGetter(l.ngModel.$modelValue)===e&&l.ngModel.$validate(),l.refreshViewValue())},l.removeOption=function(e){delete l.options[e]},l.refreshViewValue=function(){var e,n=[];for(var i in l.selected)(e=l.options[i])?n.push(e.value):n.push(l.selected[i]);var r=o.getModelOption(l.ngModel,"trackBy"),a=l.isMultiple?n:n[0],d=l.ngModel.$modelValue;(r?t.equals(d,a):d+""===a)||(l.ngModel.$setViewValue(a),l.ngModel.$render())}}return d.$inject=["$scope","$attrs","$element"],{restrict:"E",require:["mdSelectMenu"],scope:!1,controller:d,link:{pre:a}}}function r(e,n,o){function i(e,n){return e.append(t.element('<div class="md-text">').append(e.contents())),e.attr("tabindex",n.tabindex||"0"),r(n)||e.attr("md-option-empty",""),a}function r(e){var t=e.value,n=e.ngValue;return t||n}function a(i,r,a,d){function s(e,t,n){if(!m.hashGetter)return void(n||i.$$postDigest(function(){s(e,t,!0)}));var o=m.hashGetter(t,i),r=m.hashGetter(e,i);l.hashKey=r,l.value=e,m.removeOption(o,l),m.addOption(r,l)}function c(){var e={role:"option","aria-selected":"false"};r[0].hasAttribute("id")||(e.id="select_option_"+n.nextUid()),r.attr(e)}var l=d[0],m=d[1];o(r),m.isMultiple&&(r.addClass("md-checkbox-enabled"),r.prepend(u.clone())),t.isDefined(a.ngValue)?i.$watch(a.ngValue,s):t.isDefined(a.value)?s(a.value):i.$watch(function(){return r.text().trim()},s),a.$observe("disabled",function(e){e?r.attr("tabindex","-1"):r.attr("tabindex","0")}),i.$$postDigest(function(){a.$observe("selected",function(e){t.isDefined(e)&&("string"==typeof e&&(e=!0),e?(m.isMultiple||m.deselect(Object.keys(m.selected)[0]),m.select(l.hashKey,l.value)):m.deselect(l.hashKey),m.refreshViewValue())})}),e.attach(i,r),c(),i.$on("$destroy",function(){m.removeOption(l.hashKey,l)})}function d(e){this.selected=!1,this.setSelected=function(t){t&&!this.selected?e.attr({selected:"selected","aria-selected":"true"}):!t&&this.selected&&(e.removeAttr("selected"),e.attr("aria-selected","false")),this.selected=t}}return d.$inject=["$element"],{restrict:"E",require:["mdOption","^^mdSelectMenu"],controller:d,compile:i}}function a(){function e(e,n){function o(){return e.parent().find("md-select-header").length}function i(){var o=e.find("label");o.length||(o=t.element("<label>"),e.prepend(o)),o.addClass("md-container-ignore"),n.label&&o.text(n.label)}o()||i()}return{restrict:"E",compile:e}}function d(){return{restrict:"E"}}function s(o){function i(o,i,m,u,p,h,f,g,b){function v(e,t,n){function o(){return f(t,{addClass:"md-leave"}).start()}function i(){t.removeClass("md-active"),t.attr("aria-hidden","true"),t[0].style.display="none",$(n),!n.$destroy&&n.restoreFocus&&n.target.focus()}return n=n||{},n.cleanupInteraction(),n.cleanupResizing(),n.hideBackdrop(),n.$destroy===!0?i():o().then(i)}function E(e,r,a){function d(e,t,n){return n.parent.append(t),p(function(e,n){try{f(t,{removeClass:"md-leave",duration:0}).start().then(s).then(e)}catch(o){n(o)}})}function s(){return p(function(t){if(a.isRemoved)return p.reject(!1);var n=C(e,r,a);n.container.element.css(M.toCss(n.container.styles)),n.dropDown.element.css(M.toCss(n.dropDown.styles)),h(function(){r.addClass("md-active"),n.dropDown.element.css(M.toCss({transform:""})),v(a.focusedNode),t()})})}function l(e,t,n){return n.disableParentScroll&&!m.getClosest(n.target,"MD-DIALOG")?n.restoreScroll=m.disableScrollAround(n.element,n.parent):n.disableParentScroll=!1,n.hasBackdrop&&(n.backdrop=m.createBackdrop(e,"md-select-backdrop md-click-catcher"),g.enter(n.backdrop,b[0].body,null,{duration:0})),function(){n.backdrop&&n.backdrop.remove(),n.disableParentScroll&&n.restoreScroll(),delete n.restoreScroll}}function v(e){e&&!e.hasAttribute("disabled")&&e.focus()}function E(e,n){var o=r.find("md-select-menu");if(!n.target)throw new Error(m.supplant(y,[n.target]));t.extend(n,{isRemoved:!1,target:t.element(n.target),parent:t.element(n.parent),selectEl:o,contentEl:r.find("md-content"),optionNodes:o[0].getElementsByTagName("md-option")})}function $(){var n=function(e,t,n){return function(){if(!n.isRemoved){var o=C(e,t,n),i=o.container,r=o.dropDown;i.element.css(M.toCss(i.styles)),r.element.css(M.toCss(r.styles))}}}(e,r,a),o=t.element(u);return o.on("resize",n),o.on("orientationchange",n),function(){o.off("resize",n),o.off("orientationchange",n)}}function A(){a.loadingAsync&&!a.isRemoved&&(e.$$loadingAsyncDone=!1,p.when(a.loadingAsync).then(function(){e.$$loadingAsyncDone=!0,delete a.loadingAsync}).then(function(){h(s)}))}function w(){function e(e){e.preventDefault(),e.stopPropagation(),a.restoreFocus=!1,m.nextTick(o.hide,!0)}function t(e){switch(e.preventDefault(),e.stopPropagation(),e.keyCode){case T.UP_ARROW:return l();case T.DOWN_ARROW:return s();case T.SPACE:case T.ENTER:var t=m.getClosest(e.target,"md-option");t&&(p.triggerHandler({type:"click",target:t}),e.preventDefault()),u(e);break;case T.TAB:case T.ESCAPE:e.stopPropagation(),e.preventDefault(),a.restoreFocus=!0,m.nextTick(o.hide,!0);break;default:if(c(e,i)){var n=p.controller("mdSelectMenu").optNodeForKeyboardSearch(e);a.focusedNode=n||a.focusedNode,n&&n.focus()}}}function d(e){var t,o=m.nodesToArray(a.optionNodes),i=o.indexOf(a.focusedNode);do i===-1?i=0:"next"===e&&i<o.length-1?i++:"prev"===e&&i>0&&i--,t=o[i],t.hasAttribute("disabled")&&(t=n);while(!t&&i<o.length-1&&i>0);t&&t.focus(),a.focusedNode=t}function s(){d("next")}function l(){d("prev")}function u(e){function t(){var t=!1;if(e&&e.currentTarget.children.length>0){var n=e.currentTarget.children[0],o=n.scrollHeight>n.clientHeight;if(o&&n.children.length>0){var i=e.pageX-e.currentTarget.getBoundingClientRect().left;i>n.querySelector("md-option").offsetWidth&&(t=!0)}}return t}if(!(e&&"click"==e.type&&e.currentTarget!=p[0]||t())){var n=m.getClosest(e.target,"md-option");n&&n.hasAttribute&&!n.hasAttribute("disabled")&&(e.preventDefault(),e.stopPropagation(),h.isMultiple||(a.restoreFocus=!0,m.nextTick(function(){o.hide(h.ngModel.$viewValue)},!0)))}}if(!a.isRemoved){var p=a.selectEl,h=p.controller("mdSelectMenu")||{};return r.addClass("md-clickable"),a.backdrop&&a.backdrop.on("click",e),p.on("keydown",t),p.on("click",u),function(){a.backdrop&&a.backdrop.off("click",e),p.off("keydown",t),p.off("click",u),r.removeClass("md-clickable"),a.isRemoved=!0}}}return A(),E(e,a),a.hideBackdrop=l(e,r,a),d(e,r,a).then(function(e){return r.attr("aria-hidden","false"),a.alreadyOpen=!0,a.cleanupInteraction=w(),a.cleanupResizing=$(),e},a.hideBackdrop)}function $(e){var t=e.selectCtrl;if(t){var n=e.selectEl.controller("mdSelectMenu");t.setLabelText(n?n.selectedLabels():""),t.triggerClose()}}function C(n,o,i){var c,p=o[0],h=i.target[0].children[0],f=b[0].body,g=i.selectEl[0],v=i.contentEl[0],E=f.getBoundingClientRect(),$=h.getBoundingClientRect(),C=!1,y={left:E.left+l,top:l,bottom:E.height-l,right:E.width-l-(m.floatingScrollbars()?16:0)},M={top:$.top-y.top,left:$.left-y.left,right:y.right-($.left+$.width),bottom:y.bottom-($.top+$.height)},T=E.width-2*l,A=g.querySelector("md-option[selected]"),w=g.getElementsByTagName("md-option"),k=g.getElementsByTagName("md-optgroup"),_=s(o,v),x=r(i.loadingAsync);c=x?v.firstElementChild||v:A?A:k.length?k[0]:w.length?w[0]:v.firstElementChild||v,v.offsetWidth>T?v.style["max-width"]=T+"px":v.style.maxWidth=null,C&&(v.style["min-width"]=$.width+"px"),_&&g.classList.add("md-overflow");var N=c;"MD-OPTGROUP"===(N.tagName||"").toUpperCase()&&(N=w[0]||v.firstElementChild||v,c=N),i.focusedNode=N,p.style.display="block";var S=g.getBoundingClientRect(),D=d(c);if(c){var I=u.getComputedStyle(c);D.paddingLeft=parseInt(I.paddingLeft,10)||0,D.paddingRight=parseInt(I.paddingRight,10)||0}if(_){var H=v.offsetHeight/2;v.scrollTop=D.top+D.height/2-H,M.top<H?v.scrollTop=Math.min(D.top,v.scrollTop+H-M.top):M.bottom<H&&(v.scrollTop=Math.max(D.top+D.height-S.height,v.scrollTop-H+M.bottom))}var O,P,L,R,F;C?(O=$.left,P=$.top+$.height,L="50% 0",P+S.height>y.bottom&&(P=$.top-S.height,L="50% 100%")):(O=$.left+D.left-D.paddingLeft+2,P=Math.floor($.top+$.height/2-D.height/2-D.top+v.scrollTop)+2,L=D.left+$.width/2+"px "+(D.top+D.height/2-v.scrollTop)+"px 0px",R=Math.min($.width+D.paddingLeft+D.paddingRight,T),F=e.getComputedStyle(h)["font-size"]);var B=p.getBoundingClientRect(),j=Math.round(100*Math.min($.width/S.width,1))/100,U=Math.round(100*Math.min($.height/S.height,1))/100;return{container:{element:t.element(p),styles:{left:Math.floor(a(y.left,O,y.right-B.width)),top:Math.floor(a(y.top,P,y.bottom-B.height)),"min-width":R,"font-size":F}},dropDown:{element:t.element(g),styles:{transformOrigin:L,transform:i.alreadyOpen?"":m.supplant("scale({0},{1})",[j,U])}}}}var y="$mdSelect.show() expected a target element in options.target but got '{0}'!",M=m.dom.animator,T=i.KEY_CODE;return{parent:"body",themable:!0,onShow:E,onRemove:v,hasBackdrop:!0,disableParentScroll:!0}}function r(e){return e&&t.isFunction(e.then)}function a(e,t,n){return Math.max(e,Math.min(t,n))}function d(e){return e?{left:e.offsetLeft,top:e.offsetTop,width:e.offsetWidth,height:e.offsetHeight}:{left:0,top:0,width:0,height:0}}function s(e,t){var n=!1;try{var o=e[0].style.display;e[0].style.display="block",n=t.scrollHeight>t.offsetHeight,e[0].style.display=o}finally{}return n}return i.$inject=["$mdSelect","$mdConstant","$mdUtil","$window","$q","$$rAF","$animateCss","$animate","$document"],o("$mdSelect").setDefaults({methods:["target"],options:i})}function c(e,t){var n=String.fromCharCode(e.keyCode),o=e.keyCode<=31;return n&&n.length&&!o&&!t.isMetaKey(e)&&!t.isFnLockKey(e)&&!t.hasModifierKey(e)}o.$inject=["$mdSelect","$mdUtil","$mdConstant","$mdTheming","$mdAria","$parse","$sce","$injector"],i.$inject=["$parse","$mdUtil","$mdConstant","$mdTheming"],r.$inject=["$mdButtonInkRipple","$mdUtil","$mdTheming"],s.$inject=["$$interimElementProvider"];var l=8,m=0,u=t.element('<div class="md-container"><div class="md-icon"></div></div>');t.module("material.components.select",["material.core","material.components.backdrop"]).directive("mdSelect",o).directive("mdSelectMenu",i).directive("mdOption",r).directive("mdOptgroup",a).directive("mdSelectHeader",d).provider("$mdSelect",s)}(),function(){function e(){return{controller:function(){},compile:function(e){var o=e.find("md-slider");if(o){var i=o.attr("md-vertical");return i!==n&&e.attr("md-vertical",""),o.attr("flex")||o.attr("flex",""),function(e,n,o,i){function r(e){n.children().attr("disabled",e),n.find("input").attr("disabled",e)}n.addClass("_md");var a=t.noop;o.disabled?r(!0):o.ngDisabled&&(a=e.$watch(o.ngDisabled,function(e){r(e)})),e.$on("$destroy",function(){a()});var d;i.fitInputWidthToTextLength=function(e){var t=n[0].querySelector("md-input-container");if(t){var o=getComputedStyle(t),i=parseInt(o.minWidth),r=2*parseInt(o.padding);d=d||parseInt(o.maxWidth);var a=Math.max(d,i+r+i/2*e);t.style.maxWidth=a+"px"}}}}}}}function o(e,n,o,i,r,a,d,s,c,l){function m(e,n){var i=t.element(e[0].getElementsByClassName("md-slider-wrapper")),r=n.tabindex||0;return i.attr("tabindex",r),(n.disabled||n.ngDisabled)&&i.attr("tabindex",-1),i.attr("role","slider"),o.expect(e,"aria-label"),u}function u(o,m,u,p){function h(){y(),x()}function f(e){se=parseFloat(e),m.attr("aria-valuemin",e),h()}function g(e){ce=parseFloat(e),m.attr("aria-valuemax",e),h()}function b(e){le=parseFloat(e)}function v(e){me=N(parseInt(e),0,6)}function E(){m.attr("aria-disabled",!!Y())}function $(){if(ie&&!Y()&&!t.isUndefined(le)){if(le<=0){var e="Slider step value must be greater than zero when in discrete mode";throw c.error(e),new Error(e)}var o=Math.floor((ce-se)/le);ue||(ue=t.element("<canvas>").css("position","absolute"),J.append(ue),pe=ue[0].getContext("2d"));var i=M();!i||i.height||i.width||(y(),i=he),ue[0].width=i.width,ue[0].height=i.height;for(var r,a=0;a<=o;a++){var d=n.getComputedStyle(J[0]);pe.fillStyle=d.color||"black",r=Math.floor((oe?i.height:i.width)*(a/o)),pe.fillRect(oe?0:r-1,oe?r-1:0,oe?i.width:2,oe?2:i.height)}}}function C(){if(ue&&pe){var e=M();pe.clearRect(0,0,e.width,e.height)}}function y(){he=Q[0].getBoundingClientRect()}function M(){return te(),he}function T(e){if(!Y()){var t;(oe?e.keyCode===r.KEY_CODE.DOWN_ARROW:e.keyCode===r.KEY_CODE.LEFT_ARROW)?t=-le:(oe?e.keyCode===r.KEY_CODE.UP_ARROW:e.keyCode===r.KEY_CODE.RIGHT_ARROW)&&(t=le),t=re?-t:t,t&&((e.metaKey||e.ctrlKey||e.altKey)&&(t*=4),e.preventDefault(),e.stopPropagation(),o.$evalAsync(function(){_(W.$viewValue+t)}))}}function A(){$(),o.mouseActive=!0,ee.removeClass("md-focused"),l(function(){o.mouseActive=!1},100)}function w(){o.mouseActive===!1&&ee.addClass("md-focused")}function k(){ee.removeClass("md-focused"),m.removeClass("md-active"),C()}function _(e){W.$setViewValue(N(S(e)))}function x(){isNaN(W.$viewValue)&&(W.$viewValue=W.$modelValue),W.$viewValue=N(W.$viewValue);var e=z(W.$viewValue);o.modelValue=W.$viewValue,m.attr("aria-valuenow",W.$viewValue),D(e),G.text(W.$viewValue)}function N(e,n,o){if(t.isNumber(e))return n=t.isNumber(n)?n:se,o=t.isNumber(o)?o:ce,Math.max(n,Math.min(o,e))}function S(e){if(t.isNumber(e)){var n=Math.round((e-se)/le)*le+se;return n=Math.round(n*Math.pow(10,me))/Math.pow(10,me),V&&V.fitInputWidthToTextLength&&i.debounce(function(){V.fitInputWidthToTextLength(n.toString().length)},100)(),n}}function D(e){e=j(e);var t=100*e+"%",n=re?100*(1-e)+"%":t;oe?X.css("bottom",t):i.bidiProperty(X,"left","right",t),Z.css(oe?"height":"width",n),m.toggleClass(re?"md-max":"md-min",0===e),m.toggleClass(re?"md-min":"md-max",1===e)}function I(e){if(!Y()){m.addClass("md-active"),m[0].focus(),y();var t=q(U(oe?e.pointer.y:e.pointer.x)),n=N(S(t));o.$apply(function(){_(n),D(z(n))})}}function H(e){if(!Y()){m.removeClass("md-dragging");var t=q(U(oe?e.pointer.y:e.pointer.x)),n=N(S(t));o.$apply(function(){_(n),x()})}}function O(e){Y()||(fe=!0,e.stopPropagation(),m.addClass("md-dragging"),R(e))}function P(e){fe&&(e.stopPropagation(),R(e))}function L(e){fe&&(e.stopPropagation(),fe=!1)}function R(e){ie?B(oe?e.pointer.y:e.pointer.x):F(oe?e.pointer.y:e.pointer.x)}function F(e){o.$evalAsync(function(){_(q(U(e)))})}function B(e){var t=q(U(e)),n=N(S(t));D(U(e)),G.text(n)}function j(e){return Math.max(0,Math.min(e||0,1))}function U(e){var t=oe?he.top:he.left,n=oe?he.height:he.width,o=(e-t)/n;return oe||"rtl"!==i.bidi()||(o=1-o),Math.max(0,Math.min(1,oe?1-o:o))}function q(e){var t=re?1-e:e;return se+t*(ce-se)}function z(e){var t=(e-se)/(ce-se);return re?1-t:t}a(m);var W=p[0]||{$setViewValue:function(e){this.$viewValue=e,this.$viewChangeListeners.forEach(function(e){e()})},$parsers:[],$formatters:[],$viewChangeListeners:[]},V=p[1],Y=(t.element(i.getClosest(m,"_md-slider-container",!0)),u.ngDisabled?t.bind(null,s(u.ngDisabled),o.$parent):function(){return m[0].hasAttribute("disabled")}),K=t.element(m[0].querySelector(".md-thumb")),G=t.element(m[0].querySelector(".md-thumb-text")),X=K.parent(),Q=t.element(m[0].querySelector(".md-track-container")),Z=t.element(m[0].querySelector(".md-track-fill")),J=t.element(m[0].querySelector(".md-track-ticks")),ee=t.element(m[0].getElementsByClassName("md-slider-wrapper")),te=(t.element(m[0].getElementsByClassName("md-slider-content")),i.throttle(y,5e3)),ne=3,oe=t.isDefined(u.mdVertical),ie=t.isDefined(u.mdDiscrete),re=t.isDefined(u.mdInvert);t.isDefined(u.min)?u.$observe("min",f):f(0),t.isDefined(u.max)?u.$observe("max",g):g(100),t.isDefined(u.step)?u.$observe("step",b):b(1),t.isDefined(u.round)?u.$observe("round",v):v(ne);var ae=t.noop;u.ngDisabled&&(ae=o.$parent.$watch(u.ngDisabled,E)),d.register(ee,"drag",{horizontal:!oe}),o.mouseActive=!1,ee.on("keydown",T).on("mousedown",A).on("focus",w).on("blur",k).on("$md.pressdown",I).on("$md.pressup",H).on("$md.dragstart",O).on("$md.drag",P).on("$md.dragend",L),setTimeout(h,0);var de=e.throttle(h);t.element(n).on("resize",de),o.$on("$destroy",function(){t.element(n).off("resize",de)}),W.$render=x,W.$viewChangeListeners.push(x),W.$formatters.push(N),W.$formatters.push(S);var se,ce,le,me,ue,pe,he={};y();var fe=!1}return{scope:{},require:["?ngModel","?^mdSliderContainer"],template:'<div class="md-slider-wrapper"><div class="md-slider-content"><div class="md-track-container"><div class="md-track"></div><div class="md-track md-track-fill"></div><div class="md-track-ticks"></div></div><div class="md-thumb-container"><div class="md-thumb"></div><div class="md-focus-thumb"></div><div class="md-focus-ring"></div><div class="md-sign"><span class="md-thumb-text"></span></div><div class="md-disabled-thumb"></div></div></div></div>',compile:m}}o.$inject=["$$rAF","$window","$mdAria","$mdUtil","$mdConstant","$mdTheming","$mdGesture","$parse","$log","$timeout"],t.module("material.components.slider",["material.core"]).directive("mdSlider",o).directive("mdSliderContainer",e)}(),function(){function e(e,t,o,i){function r(i){function r(e,t){t.addClass("md-sticky-clone");var n={element:e,clone:t};return f.items.push(n),o.nextTick(function(){p.prepend(n.clone)}),h(),function(){f.items.forEach(function(t,n){t.element[0]===e[0]&&(f.items.splice(n,1),t.clone.remove())}),h()}}function d(){f.items.forEach(s),f.items=f.items.sort(function(e,t){return e.top<t.top?-1:1});for(var e,t=p.prop("scrollTop"),n=f.items.length-1;n>=0;n--)if(t>f.items[n].top){e=f.items[n];break}l(e)}function s(e){var t=e.element[0];for(e.top=0,e.left=0,e.right=0;t&&t!==p[0];)e.top+=t.offsetTop,e.left+=t.offsetLeft,t.offsetParent&&(e.right+=t.offsetParent.offsetWidth-t.offsetWidth-t.offsetLeft),t=t.offsetParent;e.height=e.element.prop("offsetHeight");var i=o.floatingScrollbars()?"0":n;o.bidi(e.clone,"margin-left",e.left,i),o.bidi(e.clone,"margin-right",i,e.right)}function c(){var e=p.prop("scrollTop"),t=e>(c.prevScrollTop||0);if(c.prevScrollTop=e,0===e)return void l(null);if(t){if(f.next&&f.next.top<=e)return void l(f.next);if(f.current&&f.next&&f.next.top-e<=f.next.height)return void u(f.current,e+(f.next.top-f.next.height-e))}if(!t){if(f.current&&f.prev&&e<f.current.top)return void l(f.prev);if(f.next&&f.current&&e>=f.next.top-f.current.height)return void u(f.current,e+(f.next.top-e-f.current.height))}f.current&&u(f.current,e)}function l(e){if(f.current!==e){f.current&&(u(f.current,null),m(f.current,null)),e&&m(e,"active"),f.current=e;var t=f.items.indexOf(e);f.next=f.items[t+1],f.prev=f.items[t-1],m(f.next,"next"),m(f.prev,"prev")}}function m(e,t){e&&e.state!==t&&(e.state&&(e.clone.attr("sticky-prev-state",e.state),e.element.attr("sticky-prev-state",e.state)),e.clone.attr("sticky-state",t),e.element.attr("sticky-state",t),e.state=t)}function u(t,i){t&&(null===i||i===n?t.translateY&&(t.translateY=null,t.clone.css(e.CSS.TRANSFORM,"")):(t.translateY=i,o.bidi(t.clone,e.CSS.TRANSFORM,"translate3d("+t.left+"px,"+i+"px,0)","translateY("+i+"px)")))}var p=i.$element,h=t.throttle(d);a(p),p.on("$scrollstart",h),p.on("$scroll",c);var f;return f={prev:null,current:null,next:null,items:[],add:r,refreshElements:d}}function a(e){function n(){+o.now()-r>a?(i=!1,e.triggerHandler("$scrollend")):(e.triggerHandler("$scroll"),t.throttle(n))}var i,r,a=200;e.on("scroll touchmove",function(){i||(i=!0,t.throttle(n),e.triggerHandler("$scrollstart")),e.triggerHandler("$scroll"),r=+o.now()})}var d=o.checkStickySupport();return function(e,t,n){var o=t.controller("mdContent");if(o)if(d)t.css({position:d,top:0,"z-index":2});else{var a=o.$element.data("$$sticky");a||(a=r(o),o.$element.data("$$sticky",a));var s=n||i(t.clone())(e),c=a.add(t,s);e.$on("$destroy",c)}}}e.$inject=["$mdConstant","$$rAF","$mdUtil","$compile"],t.module("material.components.sticky",["material.core","material.components.content"]).factory("$mdSticky",e)}(),function(){function e(e,n,o,i,r){return{restrict:"E",replace:!0,transclude:!0,template:'<div class="md-subheader _md">  <div class="md-subheader-inner">    <div class="md-subheader-content"></div>  </div></div>',link:function(a,d,s,c,l){function m(e){return t.element(e[0].querySelector(".md-subheader-content"))}o(d),d.addClass("_md"),i.prefixer().removeAttribute(d,"ng-repeat");var u=d[0].outerHTML;s.$set("role","heading"),r.expect(d,"aria-level","2"),l(a,function(e){m(d).append(e)}),d.hasClass("md-no-sticky")||l(a,function(t){var o=n('<div class="md-subheader-wrapper" aria-hidden="true">'+u+"</div>")(a);i.nextTick(function(){m(o).append(t)}),e(a,d,o)})}}}e.$inject=["$mdSticky","$compile","$mdTheming","$mdUtil","$mdAria"],t.module("material.components.subheader",["material.core","material.components.sticky"]).directive("mdSubheader",e)}(),function(){function e(e,n,o,i,r,a,d){
function s(e,s){var l=c.compile(e,s).post;return e.addClass("md-dragging"),function(e,s,c,m){function u(t){b&&b(e)||(t.stopPropagation(),s.addClass("md-dragging"),C={width:v.prop("offsetWidth")})}function p(e){if(C){e.stopPropagation(),e.srcEvent&&e.srcEvent.preventDefault();var t=e.pointer.distanceX/C.width,n=g.$viewValue?1+t:t;n=Math.max(0,Math.min(1,n)),v.css(o.CSS.TRANSFORM,"translate3d("+100*n+"%,0,0)"),C.translate=n}}function h(t){if(C){t.stopPropagation(),s.removeClass("md-dragging"),v.css(o.CSS.TRANSFORM,"");var n=g.$viewValue?C.translate<.5:C.translate>.5;n&&f(!g.$viewValue),C=null,e.skipToggle=!0,d(function(){e.skipToggle=!1},1)}}function f(t){e.$apply(function(){g.$setViewValue(t),g.$render()})}var g=(m[0],m[1]||n.fakeNgModel()),b=(m[2],null);null!=c.disabled?b=function(){return!0}:c.ngDisabled&&(b=i(c.ngDisabled));var v=t.element(s[0].querySelector(".md-thumb-container")),E=t.element(s[0].querySelector(".md-container")),$=t.element(s[0].querySelector(".md-label"));r(function(){s.removeClass("md-dragging")}),l(e,s,c,m),b&&e.$watch(b,function(e){s.attr("tabindex",e?-1:0)}),c.$observe("mdInvert",function(e){var t=n.parseAttributeBoolean(e);t?s.prepend($):s.prepend(E),s.toggleClass("md-inverted",t)}),a.register(E,"drag"),E.on("$md.dragstart",u).on("$md.drag",p).on("$md.dragend",h);var C}}var c=e[0];return{restrict:"E",priority:o.BEFORE_NG_ARIA,transclude:!0,template:'<div class="md-container"><div class="md-bar"></div><div class="md-thumb-container"><div class="md-thumb" md-ink-ripple md-ink-ripple-checkbox></div></div></div><div ng-transclude class="md-label"></div>',require:["^?mdInputContainer","?ngModel","?^form"],compile:s}}e.$inject=["mdCheckboxDirective","$mdUtil","$mdConstant","$parse","$$rAF","$mdGesture","$timeout"],t.module("material.components.switch",["material.core","material.components.checkbox"]).directive("mdSwitch",e)}(),function(){function e(e){function t(e){function t(t,i,r){i.css("touch-action",r.mdSwipeTouchAction||"none");var a=e(r[n]);i.on(o,function(e){t.$applyAsync(function(){a(t,{$event:e})})})}return{restrict:"A",link:t}}t.$inject=["$parse"];var n="md"+e,o="$md."+e.toLowerCase();return t}t.module("material.components.swipe",["material.core"]).directive("mdSwipeLeft",e("SwipeLeft")).directive("mdSwipeRight",e("SwipeRight")).directive("mdSwipeUp",e("SwipeUp")).directive("mdSwipeDown",e("SwipeDown"))}(),function(){t.module("material.components.tabs",["material.core","material.components.icon"])}(),function(){function e(e){return{restrict:"E",link:function(t,n){n.addClass("_md"),t.$on("$destroy",function(){e.destroy()})}}}function n(e){function n(e){i=e}function o(e,n,o,r){function a(t,a,d){i=d.textContent||d.content;var l=!r("gt-sm");return a=o.extractElementByName(a,"md-toast",!0),d.element=a,d.onSwipe=function(e,t){var i=e.type.replace("$md.",""),r=i.replace("swipe","");"down"===r&&d.position.indexOf("top")!=-1&&!l||"up"===r&&(d.position.indexOf("bottom")!=-1||l)||("left"!==r&&"right"!==r||!l)&&(a.addClass("md-"+i),o.nextTick(n.cancel))},d.openClass=s(d.position),a.addClass(d.toastClass),d.parent.addClass(d.openClass),o.hasComputedStyle(d.parent,"position","static")&&d.parent.css("position","relative"),a.on(c,d.onSwipe),a.addClass(l?"md-bottom":d.position.split(" ").map(function(e){return"md-"+e}).join(" ")),d.parent&&d.parent.addClass("md-toast-animating"),e.enter(a,d.parent).then(function(){d.parent&&d.parent.removeClass("md-toast-animating")})}function d(t,n,i){return n.off(c,i.onSwipe),i.parent&&i.parent.addClass("md-toast-animating"),i.openClass&&i.parent.removeClass(i.openClass),(1==i.$destroy?n.remove():e.leave(n)).then(function(){i.parent&&i.parent.removeClass("md-toast-animating"),o.hasComputedStyle(i.parent,"position","static")&&i.parent.css("position","")})}function s(e){return r("gt-xs")?"md-toast-open-"+(e.indexOf("top")>-1?"top":"bottom"):"md-toast-open-bottom"}var c="$md.swipeleft $md.swiperight $md.swipeup $md.swipedown";return{onShow:a,onRemove:d,toastClass:"",position:"bottom left",themable:!0,hideDelay:3e3,autoWrap:!0,transformTemplate:function(e,n){var o=n.autoWrap&&e&&!/md-toast-content/g.test(e);if(o){var i=document.createElement("md-template");i.innerHTML=e;for(var r=0;r<i.children.length;r++)if("MD-TOAST"===i.children[r].nodeName){var a=t.element('<div class="md-toast-content">');a.append(t.element(i.children[r].childNodes)),i.children[r].appendChild(a[0])}return i.innerHTML}return e||""}}}o.$inject=["$animate","$mdToast","$mdUtil","$mdMedia"];var i,r="ok",a=e("$mdToast").setDefaults({methods:["position","hideDelay","capsule","parent","position","toastClass"],options:o}).addPreset("simple",{argOption:"textContent",methods:["textContent","content","action","highlightAction","highlightClass","theme","parent"],options:["$mdToast","$mdTheming",function(e,t){return{template:'<md-toast md-theme="{{ toast.theme }}" ng-class="{\'md-capsule\': toast.capsule}">  <div class="md-toast-content">    <span class="md-toast-text" role="alert" aria-relevant="all" aria-atomic="true">      {{ toast.content }}    </span>    <md-button class="md-action" ng-if="toast.action" ng-click="toast.resolve()"         ng-class="highlightClasses">      {{ toast.action }}    </md-button>  </div></md-toast>',controller:["$scope",function(t){var n=this;n.highlightAction&&(t.highlightClasses=["md-highlight",n.highlightClass]),t.$watch(function(){return i},function(){n.content=i}),this.resolve=function(){e.hide(r)}}],theme:t.defaultTheme(),controllerAs:"toast",bindToController:!0}}]}).addMethod("updateTextContent",n).addMethod("updateContent",n);return a}e.$inject=["$mdToast"],n.$inject=["$$interimElementProvider"],t.module("material.components.toast",["material.core","material.components.button"]).directive("mdToast",e).provider("$mdToast",n)}(),function(){function e(e,n,o,i,r){var a=t.bind(null,o.supplant,"translate3d(0,{0}px,0)");return{template:"",restrict:"E",link:function(d,s,c){function l(){function i(e){var t=s.parent().find("md-content");!f&&t.length&&l(null,t),e=d.$eval(e),e===!1?g():g=u()}function l(e,t){t&&s.parent()[0]===t.parent()[0]&&(f&&f.off("scroll",$),f=t,g=u())}function m(e){var t=e?e.target.scrollTop:v;C(),b=Math.min(h/E,Math.max(0,b+t-v)),s.css(n.CSS.TRANSFORM,a([-b*E])),f.css(n.CSS.TRANSFORM,a([(h-b)*E])),v=t,o.nextTick(function(){var e=s.hasClass("md-whiteframe-z1");e&&!b?r.removeClass(s,"md-whiteframe-z1"):!e&&b&&r.addClass(s,"md-whiteframe-z1")})}function u(){return f?(f.on("scroll",$),f.attr("scroll-shrink","true"),o.nextTick(p,!1),function(){f.off("scroll",$),f.attr("scroll-shrink","false"),p()}):t.noop}function p(){h=s.prop("offsetHeight");var e=-h*E+"px";f.css({"margin-top":e,"margin-bottom":e}),m()}var h,f,g=t.noop,b=0,v=0,E=c.mdShrinkSpeedFactor||.5,$=e.throttle(m),C=o.debounce(p,5e3);d.$on("$mdContentLoaded",l),c.$observe("mdScrollShrink",i),c.ngShow&&d.$watch(c.ngShow,p),c.ngHide&&d.$watch(c.ngHide,p),d.$on("$destroy",g)}s.addClass("_md"),i(s),o.nextTick(function(){s.addClass("_md-toolbar-transitions")},!1),t.isDefined(c.mdScrollShrink)&&l()}}}e.$inject=["$$rAF","$mdConstant","$mdUtil","$mdTheming","$animate"],t.module("material.components.toolbar",["material.core","material.components.content"]).directive("mdToolbar",e)}(),function(){function n(e,n,o,i,r,a,d,s){function c(c,g,b){function v(){c.mdZIndex=c.mdZIndex||u,c.mdDelay=c.mdDelay||p,f[c.mdDirection]||(c.mdDirection=h)}function E(e){var t=e||r(g.text().trim())(c.$parent);(!H.attr("aria-label")&&!H.attr("aria-labelledby")||H.attr("md-labeled-by-tooltip"))&&(H.attr("aria-label",t),H.attr("md-labeled-by-tooltip")||H.attr("md-labeled-by-tooltip",I))}function $(){v(),N&&N.panelEl&&N.panelEl.removeClass(k),k="md-origin-"+c.mdDirection,_=f[c.mdDirection],x=d.newPanelPosition().relativeTo(H).addPanelPosition(_.x,_.y),N&&N.panelEl&&(N.panelEl.addClass(k),N.updatePosition(x))}function C(){function t(e){return e.some(function(e){return"disabled"===e.attributeName&&H[0].disabled}),!1}function o(){M(!1)}function r(){L=document.activeElement===H[0]}function d(e){"focus"===e.type&&L?L=!1:c.mdVisible||(H.on(m,u),M(!0),"touchstart"===e.type&&H.one("touchend",function(){a.nextTick(function(){i.one("touchend",u)},!1)}))}function u(){S=c.hasOwnProperty("mdAutohide")?c.mdAutohide:b.hasOwnProperty("mdAutohide"),(S||P||i[0].activeElement!==H[0])&&(D&&(e.cancel(D),M.queued=!1,D=null),H.off(m,u),H.triggerHandler("blur"),M(!1)),P=!1}function p(){P=!0}function h(){s.deregister("scroll",o,!0),s.deregister("blur",r),s.deregister("resize",O),H.off(l,d).off(m,u).off("mousedown",p),u(),f&&f.disconnect()}if(H[0]&&"MutationObserver"in n){var f=new MutationObserver(function(e){t(e)&&a.nextTick(function(){M(!1)})});f.observe(H[0],{attributes:!0})}L=!1,s.register("scroll",o,!0),s.register("blur",r),s.register("resize",O),c.$on("$destroy",h),H.on("mousedown",p),H.on(l,d)}function y(){function e(){c.$destroy()}if(g[0]&&"MutationObserver"in n){var t=new MutationObserver(function(e){e.forEach(function(e){"md-visible"!==e.attributeName||c.visibleWatcher||(c.visibleWatcher=c.$watch("mdVisible",T))})});t.observe(g[0],{attributes:!0}),b.hasOwnProperty("mdVisible")&&(c.visibleWatcher=c.$watch("mdVisible",T))}else c.visibleWatcher=c.$watch("mdVisible",T);c.$watch("mdDirection",$),g.one("$destroy",e),H.one("$destroy",e),c.$on("$destroy",function(){M(!1),N&&N.destroy(),t&&t.disconnect(),g.remove()}),g.text().indexOf(r.startSymbol())>-1&&c.$watch(function(){return g.text().trim()},E)}function M(t){M.queued&&M.value===!!t||!M.queued&&c.mdVisible===!!t||(M.value=!!t,M.queued||(t?(M.queued=!0,D=e(function(){c.mdVisible=M.value,M.queued=!1,D=null,c.visibleWatcher||T(c.mdVisible)},c.mdDelay)):a.nextTick(function(){c.mdVisible=!1,c.visibleWatcher||T(!1)})))}function T(e){e?A():w()}function A(){if(!g[0].textContent.trim())throw new Error("Text for the tooltip has not been provided. Please include text within the mdTooltip element.");if(!N){var e=t.element(document.body),n=d.newPanelAnimation().openFrom(H).closeTo(H).withAnimation({open:"md-show",close:"md-hide"}),o={id:I,attachTo:e,contentElement:g,propagateContainerEvents:!0,panelClass:"md-tooltip "+k,animation:n,position:x,zIndex:c.mdZIndex,focusOnOpen:!1};N=d.create(o)}N.open().then(function(){N.panelEl.attr("role","tooltip")})}function w(){N&&N.close()}var k,_,x,N,S,D,I="md-tooltip-"+a.nextUid(),H=a.getParentWithPointerEvents(g),O=o.throttle($),P=!1,L=null;v(),E(),g.detach(),$(),C(),y()}var l="focus touchstart mouseenter",m="blur touchcancel mouseleave",u=100,p=0,h="bottom",f={top:{x:d.xPosition.CENTER,y:d.yPosition.ABOVE},right:{x:d.xPosition.OFFSET_END,y:d.yPosition.CENTER},bottom:{x:d.xPosition.CENTER,y:d.yPosition.BELOW},left:{x:d.xPosition.OFFSET_START,y:d.yPosition.CENTER}};return{restrict:"E",priority:210,scope:{mdZIndex:"=?mdZIndex",mdDelay:"=?mdDelay",mdVisible:"=?mdVisible",mdAutohide:"=?mdAutohide",mdDirection:"@?mdDirection"},link:c}}function o(){function n(e){r[e.type]&&r[e.type].forEach(function(t){t.call(this,e)},this)}function o(t,o,i){var d=r[t]=r[t]||[];d.length||(i?e.addEventListener(t,n,!0):a.on(t,n)),d.indexOf(o)===-1&&d.push(o)}function i(t,o,i){var d=r[t],s=d?d.indexOf(o):-1;s>-1&&(d.splice(s,1),0===d.length&&(i?e.removeEventListener(t,n,!0):a.off(t,n)))}var r={},a=t.element(e);return{register:o,deregister:i}}n.$inject=["$timeout","$window","$$rAF","$document","$interpolate","$mdUtil","$mdPanel","$$mdTooltipRegistry"],t.module("material.components.tooltip",["material.core","material.components.panel"]).directive("mdTooltip",n).service("$$mdTooltipRegistry",o)}(),function(){function e(){return{restrict:"AE",controller:n,controllerAs:"$ctrl",bindToController:!0}}function n(e){e.addClass("md-truncate")}n.$inject=["$element"],t.module("material.components.truncate",["material.core"]).directive("mdTruncate",e)}(),function(){function e(){return{controller:o,template:n,compile:function(e,t){e.addClass("md-virtual-repeat-container").addClass(t.hasOwnProperty("mdOrientHorizontal")?"md-orient-horizontal":"md-orient-vertical")}}}function n(e){return'<div class="md-virtual-repeat-scroller"><div class="md-virtual-repeat-sizer"></div><div class="md-virtual-repeat-offsetter">'+e[0].innerHTML+"</div></div>"}function o(e,n,o,i,r,a,d,s,c){this.$rootScope=r,this.$scope=d,this.$element=s,this.$attrs=c,this.size=0,this.scrollSize=0,this.scrollOffset=0,this.horizontal=this.$attrs.hasOwnProperty("mdOrientHorizontal"),this.repeater=null,this.autoShrink=this.$attrs.hasOwnProperty("mdAutoShrink"),this.autoShrinkMin=parseInt(this.$attrs.mdAutoShrinkMin,10)||0,this.originalSize=null,this.offsetSize=parseInt(this.$attrs.mdOffsetSize,10)||0,this.oldElementSize=null,this.maxElementPixels=o.ELEMENT_MAX_PIXELS,this.$attrs.mdTopIndex?(this.bindTopIndex=i(this.$attrs.mdTopIndex),this.topIndex=this.bindTopIndex(this.$scope),t.isDefined(this.topIndex)||(this.topIndex=0,this.bindTopIndex.assign(this.$scope,0)),this.$scope.$watch(this.bindTopIndex,t.bind(this,function(e){e!==this.topIndex&&this.scrollToIndex(e)}))):this.topIndex=0,this.scroller=s[0].querySelector(".md-virtual-repeat-scroller"),this.sizer=this.scroller.querySelector(".md-virtual-repeat-sizer"),this.offsetter=this.scroller.querySelector(".md-virtual-repeat-offsetter");var l=t.bind(this,this.updateSize);e(t.bind(this,function(){l();var e=n.debounce(l,10,null,!1),o=t.element(a);this.size||e(),o.on("resize",e),d.$on("$destroy",function(){o.off("resize",e)}),d.$emit("$md-resize-enable"),d.$on("$md-resize",l)}))}function i(e){return{controller:r,priority:1e3,require:["mdVirtualRepeat","^^mdVirtualRepeatContainer"],restrict:"A",terminal:!0,transclude:"element",compile:function(t,n){var o=n.mdVirtualRepeat,i=o.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)\s*$/),r=i[1],a=e(i[2]),d=n.mdExtraName&&e(n.mdExtraName);return function(e,t,n,o,i){o[0].link_(o[1],i,r,a,d)}}}}function r(e,n,o,i,r,a,d,s){this.$scope=e,this.$element=n,this.$attrs=o,this.$browser=i,this.$document=r,this.$rootScope=a,this.$$rAF=d,this.onDemand=s.parseAttributeBoolean(o.mdOnDemand),this.browserCheckUrlChange=i.$$checkUrlChange,this.newStartIndex=0,this.newEndIndex=0,this.newVisibleEnd=0,this.startIndex=0,this.endIndex=0,this.itemSize=e.$eval(o.mdItemSize)||null,this.isFirstRender=!0,this.isVirtualRepeatUpdating_=!1,this.itemsLength=0,this.unwatchItemSize_=t.noop,this.blocks={},this.pooledBlocks=[],e.$on("$destroy",t.bind(this,this.cleanupBlocks_))}function a(e){if(!t.isFunction(e.getItemAtIndex)||!t.isFunction(e.getLength))throw Error("When md-on-demand is enabled, the Object passed to md-virtual-repeat must implement functions getItemAtIndex() and getLength() ");this.model=e}o.$inject=["$$rAF","$mdUtil","$mdConstant","$parse","$rootScope","$window","$scope","$element","$attrs"],r.$inject=["$scope","$element","$attrs","$browser","$document","$rootScope","$$rAF","$mdUtil"],i.$inject=["$parse"],t.module("material.components.virtualRepeat",["material.core","material.components.showHide"]).directive("mdVirtualRepeatContainer",e).directive("mdVirtualRepeat",i);var d=3;o.prototype.register=function(e){this.repeater=e,t.element(this.scroller).on("scroll wheel touchmove touchend",t.bind(this,this.handleScroll_))},o.prototype.isHorizontal=function(){return this.horizontal},o.prototype.getSize=function(){return this.size},o.prototype.setSize_=function(e){var t=this.getDimensionName_();this.size=e,this.$element[0].style[t]=e+"px"},o.prototype.unsetSize_=function(){this.$element[0].style[this.getDimensionName_()]=this.oldElementSize,this.oldElementSize=null},o.prototype.updateSize=function(){this.originalSize||(this.size=this.isHorizontal()?this.$element[0].clientWidth:this.$element[0].clientHeight,this.handleScroll_(),this.repeater&&this.repeater.containerUpdated())},o.prototype.getScrollSize=function(){return this.scrollSize},o.prototype.getDimensionName_=function(){return this.isHorizontal()?"width":"height"},o.prototype.sizeScroller_=function(e){var t=this.getDimensionName_(),n=this.isHorizontal()?"height":"width";if(this.sizer.innerHTML="",e<this.maxElementPixels)this.sizer.style[t]=e+"px";else{this.sizer.style[t]="auto",this.sizer.style[n]="auto";var o=Math.floor(e/this.maxElementPixels),i=document.createElement("div");i.style[t]=this.maxElementPixels+"px",i.style[n]="1px";for(var r=0;r<o;r++)this.sizer.appendChild(i.cloneNode(!1));i.style[t]=e-o*this.maxElementPixels+"px",this.sizer.appendChild(i)}},o.prototype.autoShrink_=function(e){var t=Math.max(e,this.autoShrinkMin*this.repeater.getItemSize());if(this.autoShrink&&t!==this.size){null===this.oldElementSize&&(this.oldElementSize=this.$element[0].style[this.getDimensionName_()]);var n=this.originalSize||this.size;if(!n||t<n)this.originalSize||(this.originalSize=this.size),this.setSize_(t);else if(null!==this.originalSize){this.unsetSize_();var o=this.originalSize;this.originalSize=null,o||this.updateSize(),this.setSize_(o||this.size)}this.repeater.containerUpdated()}},o.prototype.setScrollSize=function(e){var t=e+this.offsetSize;this.scrollSize!==t&&(this.sizeScroller_(t),this.autoShrink_(t),this.scrollSize=t)},o.prototype.getScrollOffset=function(){return this.scrollOffset},o.prototype.scrollTo=function(e){this.scroller[this.isHorizontal()?"scrollLeft":"scrollTop"]=e,this.handleScroll_()},o.prototype.scrollToIndex=function(e){var t=this.repeater.getItemSize(),n=this.repeater.itemsLength;e>n&&(e=n-1),this.scrollTo(t*e)},o.prototype.resetScroll=function(){this.scrollTo(0)},o.prototype.handleScroll_=function(){var e="rtl"!=document.dir&&"rtl"!=document.body.dir;e||this.maxSize||(this.scroller.scrollLeft=this.scrollSize,this.maxSize=this.scroller.scrollLeft);var t=this.isHorizontal()?e?this.scroller.scrollLeft:this.maxSize-this.scroller.scrollLeft:this.scroller.scrollTop;if(!(t===this.scrollOffset||t>this.scrollSize-this.size)){var n=this.repeater.getItemSize();if(n){var o=Math.max(0,Math.floor(t/n)-d),i=(this.isHorizontal()?"translateX(":"translateY(")+(!this.isHorizontal()||e?o*n:-(o*n))+"px)";if(this.scrollOffset=t,this.offsetter.style.webkitTransform=i,this.offsetter.style.transform=i,this.bindTopIndex){var r=Math.floor(t/n);r!==this.topIndex&&r<this.repeater.getItemCount()&&(this.topIndex=r,this.bindTopIndex.assign(this.$scope,r),this.$rootScope.$$phase||this.$scope.$digest())}this.repeater.containerUpdated()}}},r.Block,r.prototype.link_=function(e,n,o,i,r){this.container=e,this.transclude=n,this.repeatName=o,this.rawRepeatListExpression=i,this.extraName=r,this.sized=!1,this.repeatListExpression=t.bind(this,this.repeatListExpression_),this.container.register(this)},r.prototype.cleanupBlocks_=function(){t.forEach(this.pooledBlocks,function(e){e.element.remove()})},r.prototype.readItemSize_=function(){if(!this.itemSize){this.items=this.repeatListExpression(this.$scope),this.parentNode=this.$element[0].parentNode;var e=this.getBlock_(0);e.element[0].parentNode||this.parentNode.appendChild(e.element[0]),this.itemSize=e.element[0][this.container.isHorizontal()?"offsetWidth":"offsetHeight"]||null,this.blocks[0]=e,this.poolBlock_(0),this.itemSize&&this.containerUpdated()}},r.prototype.repeatListExpression_=function(e){var t=this.rawRepeatListExpression(e);if(this.onDemand&&t){var n=new a(t);return n.$$includeIndexes(this.newStartIndex,this.newVisibleEnd),n}return t},r.prototype.containerUpdated=function(){return this.itemSize?(this.sized||(this.items=this.repeatListExpression(this.$scope)),this.sized||(this.unwatchItemSize_(),this.sized=!0,this.$scope.$watchCollection(this.repeatListExpression,t.bind(this,function(e,t){this.isVirtualRepeatUpdating_||this.virtualRepeatUpdate_(e,t)}))),this.updateIndexes_(),void((this.newStartIndex!==this.startIndex||this.newEndIndex!==this.endIndex||this.container.getScrollOffset()>this.container.getScrollSize())&&(this.items instanceof a&&this.items.$$includeIndexes(this.newStartIndex,this.newEndIndex),this.virtualRepeatUpdate_(this.items,this.items)))):(this.unwatchItemSize_&&this.unwatchItemSize_!==t.noop&&this.unwatchItemSize_(),this.unwatchItemSize_=this.$scope.$watchCollection(this.repeatListExpression,t.bind(this,function(e){e&&e.length&&this.readItemSize_()})),void(this.$rootScope.$$phase||this.$scope.$digest()))},r.prototype.getItemSize=function(){return this.itemSize},r.prototype.getItemCount=function(){return this.itemsLength},r.prototype.virtualRepeatUpdate_=function(e,n){this.isVirtualRepeatUpdating_=!0;var o=e&&e.length||0,i=!1;if(this.items&&o<this.items.length&&0!==this.container.getScrollOffset()){this.items=e;var r=this.container.getScrollOffset();this.container.resetScroll(),this.container.scrollTo(r)}o!==this.itemsLength&&(i=!0,this.itemsLength=o),this.items=e,(e!==n||i)&&this.updateIndexes_(),this.parentNode=this.$element[0].parentNode,i&&this.container.setScrollSize(o*this.itemSize);var a,d=!1;this.isFirstRender&&(d=!0,this.isFirstRender=!1,a=this.$attrs.mdStartIndex?this.$scope.$eval(this.$attrs.mdStartIndex):this.container.topIndex,this.container.scrollToIndex(a)),Object.keys(this.blocks).forEach(function(e){var t=parseInt(e,10);(t<this.newStartIndex||t>=this.newEndIndex)&&this.poolBlock_(t)},this),this.$browser.$$checkUrlChange=t.noop;var s,c,l=[],m=[];for(s=this.newStartIndex;s<this.newEndIndex&&null==this.blocks[s];s++)c=this.getBlock_(s),this.updateBlock_(c,s),l.push(c);for(;null!=this.blocks[s];s++)this.updateBlock_(this.blocks[s],s);for(var u=s-1;s<this.newEndIndex;s++)c=this.getBlock_(s),this.updateBlock_(c,s),m.push(c);l.length&&this.parentNode.insertBefore(this.domFragmentFromBlocks_(l),this.$element[0].nextSibling),m.length&&this.parentNode.insertBefore(this.domFragmentFromBlocks_(m),this.blocks[u]&&this.blocks[u].element[0].nextSibling),d&&this.container.scrollToIndex(a),this.$browser.$$checkUrlChange=this.browserCheckUrlChange,this.startIndex=this.newStartIndex,this.endIndex=this.newEndIndex,this.isVirtualRepeatUpdating_=!1},r.prototype.getBlock_=function(e){if(this.pooledBlocks.length)return this.pooledBlocks.pop();var n;return this.transclude(t.bind(this,function(t,o){n={element:t,"new":!0,scope:o},this.updateScope_(o,e),this.parentNode.appendChild(t[0])})),n},r.prototype.updateBlock_=function(e,t){this.blocks[t]=e,(e["new"]||e.scope.$index!==t||e.scope[this.repeatName]!==this.items[t])&&(e["new"]=!1,this.updateScope_(e.scope,t),this.$rootScope.$$phase||e.scope.$digest())},r.prototype.updateScope_=function(e,t){e.$index=t,e[this.repeatName]=this.items&&this.items[t],this.extraName&&(e[this.extraName(this.$scope)]=this.items[t])},r.prototype.poolBlock_=function(e){this.pooledBlocks.push(this.blocks[e]),this.parentNode.removeChild(this.blocks[e].element[0]),delete this.blocks[e]},r.prototype.domFragmentFromBlocks_=function(e){var t=this.$document[0].createDocumentFragment();return e.forEach(function(e){t.appendChild(e.element[0])}),t},r.prototype.updateIndexes_=function(){var e=this.items?this.items.length:0,t=Math.ceil(this.container.getSize()/this.itemSize);this.newStartIndex=Math.max(0,Math.min(e-t,Math.floor(this.container.getScrollOffset()/this.itemSize))),this.newVisibleEnd=this.newStartIndex+t+d,this.newEndIndex=Math.min(e,this.newVisibleEnd),this.newStartIndex=Math.max(0,this.newStartIndex-d)},a.prototype.$$includeIndexes=function(e,t){for(var n=e;n<t;n++)this.hasOwnProperty(n)||(this[n]=this.model.getItemAtIndex(n));this.length=this.model.getLength()}}(),function(){function e(e){function t(t,a,d){var s="";d.$observe("mdWhiteframe",function(t){t=parseInt(t,10)||r,t!=n&&(t>i||t<o)&&(e.warn("md-whiteframe attribute value is invalid. It should be a number between "+o+" and "+i,a[0]),t=r);var c=t==n?"":"md-whiteframe-"+t+"dp";d.$updateClass(c,s),s=c})}var n=-1,o=1,i=24,r=4;return{link:t}}e.$inject=["$log"],t.module("material.components.whiteframe",["material.core"]).directive("mdWhiteframe",e)}(),function(){function e(e,d,s,c,l,m,u,p,h,f,g,b){function v(){s.initOptionalProperties(e,h,{searchText:"",selectedItem:null,clearButton:!1}),l(d),M(),s.nextTick(function(){w(),C(),e.autofocus&&d.on("focus",y)})}function E(){e.requireMatch&&De&&De.$setValidity("md-require-match",!!e.selectedItem||!e.searchText)}function $(){function t(){var e=0,t=d.find("md-input-container");if(t.length){var n=t.find("input");e=t.prop("offsetHeight"),e-=n.prop("offsetTop"),e-=n.prop("offsetHeight"),e+=t.prop("offsetTop")}return e}function n(){var e=Ae.scrollContainer.getBoundingClientRect(),t={};e.right>p.right-r&&(t.left=m.right-e.width+"px"),Ae.$.scrollContainer.css(t)}if(!Ae)return s.nextTick($,!1,e);var c,l=(e.dropdownItems||i)*o,m=Ae.wrap.getBoundingClientRect(),u=Ae.snap.getBoundingClientRect(),p=Ae.root.getBoundingClientRect(),f=u.bottom-p.top,g=p.bottom-u.top,b=m.left-p.left,v=m.width,E=t(),C=e.dropdownPosition;if(C||(C=f>g&&p.height-f-r<l?"top":"bottom"),h.mdFloatingLabel&&(b+=a,v-=2*a),c={left:b+"px",minWidth:v+"px",maxWidth:Math.max(m.right-p.left,p.right-m.left)-r+"px"},"top"===C)c.top="auto",c.bottom=g+"px",c.maxHeight=Math.min(l,m.top-p.top-r)+"px";else{var y=p.bottom-m.bottom-r+s.getViewportTop();c.top=f-E+"px",c.bottom="auto",c.maxHeight=Math.min(l,y)+"px"}Ae.$.scrollContainer.css(c),s.nextTick(n,!1)}function C(){Ae.$.root.length&&(l(Ae.$.scrollContainer),Ae.$.scrollContainer.detach(),Ae.$.root.append(Ae.$.scrollContainer),u.pin&&u.pin(Ae.$.scrollContainer,p))}function y(){Ae.input.focus()}function M(){var n=parseInt(e.delay,10)||0;h.$observe("disabled",function(e){ye.isDisabled=s.parseAttributeBoolean(e,!1)}),h.$observe("required",function(e){ye.isRequired=s.parseAttributeBoolean(e,!1)}),h.$observe("readonly",function(e){ye.isReadonly=s.parseAttributeBoolean(e,!1)}),e.$watch("searchText",n?s.debounce(B,n):B),e.$watch("selectedItem",H),t.element(m).on("resize",Ie),e.$on("$destroy",T)}function T(){if(ye.hidden||s.enableScrolling(),t.element(m).off("resize",Ie),Ae){var e=["ul","scroller","scrollContainer","input"];t.forEach(e,function(e){Ae.$[e].remove()})}}function A(){ye.hidden||$()}function w(){var e=k();Ae={main:d[0],scrollContainer:d[0].querySelector(".md-virtual-repeat-container"),scroller:d[0].querySelector(".md-virtual-repeat-scroller"),ul:d.find("ul")[0],input:d.find("input")[0],wrap:e.wrap,snap:e.snap,root:document.body},Ae.li=Ae.ul.getElementsByTagName("li"),Ae.$=_(Ae),De=Ae.$.input.controller("ngModel")}function k(){var e,n;for(e=d;e.length&&(n=e.attr("md-autocomplete-snap"),!t.isDefined(n));e=e.parent());if(e.length)return{snap:e[0],wrap:"width"===n.toLowerCase()?e[0]:d.find("md-autocomplete-wrap")[0]};var o=d.find("md-autocomplete-wrap")[0];return{snap:o,wrap:o}}function _(e){var n={};for(var o in e)e.hasOwnProperty(o)&&(n[o]=t.element(e[o]));return n}function x(e,n){!e&&n?($(),ue(!0,He.Count|He.Selected),Ae&&(s.disableScrollAround(Ae.ul),Se=N(t.element(Ae.wrap)))):e&&!n&&(s.enableScrolling(),Se&&(Se(),Se=null))}function N(e){function t(e){e.preventDefault()}return e.on("wheel",t),e.on("touchmove",t),function(){e.off("wheel",t),e.off("touchmove",t)}}function S(){ke=!0}function D(){xe||ye.hidden||Ae.input.focus(),ke=!1,ye.hidden=X()}function I(){Ae.input.focus()}function H(n,o){E(),n?V(n).then(function(t){e.searchText=t,L(n,o)}):o&&e.searchText&&V(o).then(function(n){t.isString(e.searchText)&&n.toString().toLowerCase()===e.searchText.toLowerCase()&&(e.searchText="")}),n!==o&&O()}function O(){t.isFunction(e.itemChange)&&e.itemChange(Y(e.selectedItem))}function P(){t.isFunction(e.textChange)&&e.textChange()}function L(e,t){_e.forEach(function(n){n(e,t)})}function R(e){_e.indexOf(e)==-1&&_e.push(e)}function F(e){var t=_e.indexOf(e);t!=-1&&_e.splice(t,1)}function B(t,n){ye.index=K(),t!==n&&(E(),V(e.selectedItem).then(function(o){t!==o&&(e.selectedItem=null,t!==n&&P(),re()?ve():(ye.matches=[],G(!1),ue(!1,He.Count)))}))}function j(e){xe=!1,ke||(ye.hidden=X(),Ce("ngBlur",{$event:e}))}function U(e){e&&(ke=!1,xe=!1),Ae.input.blur()}function q(e){xe=!0,Q()&&re()&&ve(),ye.hidden=X(),Ce("ngFocus",{$event:e})}function z(t){switch(t.keyCode){case c.KEY_CODE.DOWN_ARROW:if(ye.loading)return;t.stopPropagation(),t.preventDefault(),ye.index=Math.min(ye.index+1,ye.matches.length-1),he(),ue(!1,He.Selected);break;case c.KEY_CODE.UP_ARROW:if(ye.loading)return;t.stopPropagation(),t.preventDefault(),ye.index=ye.index<0?ye.matches.length-1:Math.max(0,ye.index-1),he(),ue(!1,He.Selected);break;case c.KEY_CODE.TAB:if(D(),ye.hidden||ye.loading||ye.index<0||ye.matches.length<1)return;de(ye.index);break;case c.KEY_CODE.ENTER:if(ye.hidden||ye.loading||ye.index<0||ye.matches.length<1)return;if(ne())return;t.stopPropagation(),t.preventDefault(),de(ye.index);break;case c.KEY_CODE.ESCAPE:if(t.preventDefault(),!Z())return;t.stopPropagation(),ce(),e.searchText&&J("clear")&&le(),ye.hidden=!0,J("blur")&&U(!0)}}function W(){return t.isNumber(e.minLength)?e.minLength:1}function V(n){function o(t){return t&&e.itemText?e.itemText(Y(t)):null}return f.when(o(n)||n).then(function(e){return e&&!t.isString(e)&&g.warn("md-autocomplete: Could not resolve display value to a string. Please check the `md-item-text` attribute."),e})}function Y(e){if(!e)return n;var t={};return ye.itemName&&(t[ye.itemName]=e),t}function K(){return e.autoselect?0:-1}function G(e){ye.loading!=e&&(ye.loading=e),ye.hidden=X()}function X(){return!Q()||!ee()}function Q(){return!(ye.loading&&!te())&&(!ne()&&!!xe)}function Z(){return J("blur")||!ye.hidden||ye.loading||J("clear")&&e.searchText}function J(t){return!e.escapeOptions||e.escapeOptions.toLowerCase().indexOf(t)!==-1}function ee(){return re()&&te()||be()}function te(){return!!ye.matches.length}function ne(){return!!ye.scope.selectedItem}function oe(){return ye.loading&&!ne()}function ie(){return V(ye.matches[ye.index])}function re(){return(e.searchText||"").length>=W()}function ae(e,t,n){Object.defineProperty(ye,e,{get:function(){return n},set:function(e){var o=n;n=e,t(e,o)}})}function de(t){s.nextTick(function(){V(ye.matches[t]).then(function(e){var t=Ae.$.input.controller("ngModel");t.$setViewValue(e),t.$render()})["finally"](function(){e.selectedItem=ye.matches[t],G(!1)})},!1)}function se(){ce(),le()}function ce(){ye.index=0,ye.matches=[]}function le(){G(!0),e.searchText="";var t=document.createEvent("CustomEvent");t.initCustomEvent("change",!0,!0,{value:""}),Ae.input.dispatchEvent(t),Ae.input.blur(),e.searchText="",Ae.input.focus()}function me(n){function o(t){t&&(t=f.when(t),Ne++,G(!0),s.nextTick(function(){t.then(i)["finally"](function(){0===--Ne&&G(!1)})},!0,e))}function i(t){we[a]=t,(n||"")===(e.searchText||"")&&Ee(t)}var r=e.$parent.$eval(Te),a=n.toLowerCase(),d=t.isArray(r),c=!!r.then;d?i(r):c&&o(r)}function ue(e,t){var n=e?"polite":"assertive",o=[];t&He.Selected&&ye.index!==-1&&o.push(ie()),t&He.Count&&o.push(f.resolve(pe())),f.all(o).then(function(e){b.announce(e.join(" "),n)})}function pe(){switch(ye.matches.length){case 0:return"There are no matches available.";case 1:return"There is 1 match available.";default:return"There are "+ye.matches.length+" matches available."}}function he(){if(Ae.li[0]){var e=Ae.li[0].offsetHeight,t=e*ye.index,n=t+e,o=Ae.scroller.clientHeight,i=Ae.scroller.scrollTop;t<i?ge(t):n>i+o&&ge(n-o)}}function fe(){return 0!==Ne}function ge(e){Ae.$.scrollContainer.controller("mdVirtualRepeatContainer").scrollTo(e)}function be(){var e=(ye.scope.searchText||"").length;return ye.hasNotFound&&!te()&&(!ye.loading||fe())&&e>=W()&&(xe||ke)&&!ne()}function ve(){var t=e.searchText||"",n=t.toLowerCase();!e.noCache&&we[n]?Ee(we[n]):me(t),ye.hidden=X()}function Ee(t){ye.matches=t,ye.hidden=X(),ye.loading&&G(!1),e.selectOnMatch&&$e(),$(),ue(!0,He.Count)}function $e(){var t=e.searchText,n=ye.matches,o=n[0];1===n.length&&V(o).then(function(n){var o=t==n;e.matchInsensitive&&!o&&(o=t.toLowerCase()==n.toLowerCase()),o&&de(0)})}function Ce(t,n){h[t]&&e.$parent.$eval(h[t],n||{})}var ye=this,Me=e.itemsExpr.split(/ in /i),Te=Me[1],Ae=null,we={},ke=!1,_e=[],xe=!1,Ne=0,Se=null,De=null,Ie=s.debounce(A);ae("hidden",x,!0),ye.scope=e,ye.parent=e.$parent,ye.itemName=Me[0],ye.matches=[],ye.loading=!1,ye.hidden=!0,ye.index=null,ye.id=s.nextUid(),ye.isDisabled=null,ye.isRequired=null,ye.isReadonly=null,ye.hasNotFound=!1,ye.keydown=z,ye.blur=j,ye.focus=q,ye.clear=se,ye.select=de,
ye.listEnter=S,ye.listLeave=D,ye.mouseUp=I,ye.getCurrentDisplayValue=ie,ye.registerSelectedItemWatcher=R,ye.unregisterSelectedItemWatcher=F,ye.notFoundVisible=be,ye.loadingIsVisible=oe,ye.positionDropdown=$;var He={Count:1,Selected:2};return v()}e.$inject=["$scope","$element","$mdUtil","$mdConstant","$mdTheming","$window","$animate","$rootElement","$attrs","$q","$log","$mdLiveAnnouncer"],t.module("material.components.autocomplete").controller("MdAutocompleteCtrl",e);var o=48,i=5,r=8,a=2}(),function(){function e(e){return{controller:"MdAutocompleteCtrl",controllerAs:"$mdAutocompleteCtrl",scope:{inputName:"@mdInputName",inputMinlength:"@mdInputMinlength",inputMaxlength:"@mdInputMaxlength",searchText:"=?mdSearchText",selectedItem:"=?mdSelectedItem",itemsExpr:"@mdItems",itemText:"&mdItemText",placeholder:"@placeholder",noCache:"=?mdNoCache",requireMatch:"=?mdRequireMatch",selectOnMatch:"=?mdSelectOnMatch",matchInsensitive:"=?mdMatchCaseInsensitive",itemChange:"&?mdSelectedItemChange",textChange:"&?mdSearchTextChange",minLength:"=?mdMinLength",delay:"=?mdDelay",autofocus:"=?mdAutofocus",floatingLabel:"@?mdFloatingLabel",autoselect:"=?mdAutoselect",menuClass:"@?mdMenuClass",inputId:"@?mdInputId",escapeOptions:"@?mdEscapeOptions",dropdownItems:"=?mdDropdownItems",dropdownPosition:"@?mdDropdownPosition",clearButton:"=?mdClearButton"},compile:function(e,n){var o=["md-select-on-focus","md-no-asterisk","ng-trim","ng-pattern"],i=e.find("input");return o.forEach(function(e){var t=n[n.$normalize(e)];null!==t&&i.attr(e,t)}),function(e,n,o,i){i.hasNotFound=!!n.attr("md-has-not-found"),t.isDefined(o.mdClearButton)||e.floatingLabel||(e.clearButton=!0)}},template:function(t,n){function o(){var e=t.find("md-item-template").detach(),n=e.length?e.html():t.html();return e.length||t.empty(),"<md-autocomplete-parent-scope md-autocomplete-replace>"+n+"</md-autocomplete-parent-scope>"}function i(){var e=t.find("md-not-found").detach(),n=e.length?e.html():"";return n?'<li ng-if="$mdAutocompleteCtrl.notFoundVisible()"                         md-autocomplete-parent-scope>'+n+"</li>":""}function r(){return n.mdFloatingLabel?'            <md-input-container ng-if="floatingLabel">              <label>{{floatingLabel}}</label>              <input type="search"                  '+(null!=l?'tabindex="'+l+'"':"")+'                  id="{{ inputId || \'fl-input-\' + $mdAutocompleteCtrl.id }}"                  name="{{inputName}}"                  autocomplete="off"                  ng-required="$mdAutocompleteCtrl.isRequired"                  ng-readonly="$mdAutocompleteCtrl.isReadonly"                  ng-minlength="inputMinlength"                  ng-maxlength="inputMaxlength"                  ng-disabled="$mdAutocompleteCtrl.isDisabled"                  ng-model="$mdAutocompleteCtrl.scope.searchText"                  ng-model-options="{ allowInvalid: true }"                  ng-keydown="$mdAutocompleteCtrl.keydown($event)"                  ng-blur="$mdAutocompleteCtrl.blur($event)"                  ng-focus="$mdAutocompleteCtrl.focus($event)"                  aria-owns="ul-{{$mdAutocompleteCtrl.id}}"                  aria-label="{{floatingLabel}}"                  aria-autocomplete="list"                  role="combobox"                  aria-haspopup="true"                  aria-activedescendant=""                  aria-expanded="{{!$mdAutocompleteCtrl.hidden}}"/>              <div md-autocomplete-parent-scope md-autocomplete-replace>'+c+"</div>            </md-input-container>":'            <input type="search"                '+(null!=l?'tabindex="'+l+'"':"")+'                id="{{ inputId || \'input-\' + $mdAutocompleteCtrl.id }}"                name="{{inputName}}"                ng-if="!floatingLabel"                autocomplete="off"                ng-required="$mdAutocompleteCtrl.isRequired"                ng-disabled="$mdAutocompleteCtrl.isDisabled"                ng-readonly="$mdAutocompleteCtrl.isReadonly"                ng-minlength="inputMinlength"                ng-maxlength="inputMaxlength"                ng-model="$mdAutocompleteCtrl.scope.searchText"                ng-keydown="$mdAutocompleteCtrl.keydown($event)"                ng-blur="$mdAutocompleteCtrl.blur($event)"                ng-focus="$mdAutocompleteCtrl.focus($event)"                placeholder="{{placeholder}}"                aria-owns="ul-{{$mdAutocompleteCtrl.id}}"                aria-label="{{placeholder}}"                aria-autocomplete="list"                role="combobox"                aria-haspopup="true"                aria-activedescendant=""                aria-expanded="{{!$mdAutocompleteCtrl.hidden}}"/>'}function a(){return'<button type="button" aria-label="Clear Input" tabindex="-1" ng-if="clearButton && $mdAutocompleteCtrl.scope.searchText && !$mdAutocompleteCtrl.isDisabled" ng-click="$mdAutocompleteCtrl.clear($event)"><md-icon md-svg-src="'+e.mdClose+'"></md-icon></button>'}var d=i(),s=o(),c=t.html(),l=n.tabindex;return d&&t.attr("md-has-not-found",!0),t.attr("tabindex","-1"),"        <md-autocomplete-wrap            ng-class=\"{ 'md-whiteframe-z1': !floatingLabel,                         'md-menu-showing': !$mdAutocompleteCtrl.hidden,                         'md-show-clear-button': !!clearButton }\">          "+r()+"          "+a()+'          <md-progress-linear              class="'+(n.mdFloatingLabel?"md-inline":"")+'"              ng-if="$mdAutocompleteCtrl.loadingIsVisible()"              md-mode="indeterminate"></md-progress-linear>          <md-virtual-repeat-container              md-auto-shrink              md-auto-shrink-min="1"              ng-mouseenter="$mdAutocompleteCtrl.listEnter()"              ng-mouseleave="$mdAutocompleteCtrl.listLeave()"              ng-mouseup="$mdAutocompleteCtrl.mouseUp()"              ng-hide="$mdAutocompleteCtrl.hidden"              class="md-autocomplete-suggestions-container md-whiteframe-z1"              ng-class="{ \'md-not-found\': $mdAutocompleteCtrl.notFoundVisible() }"              role="presentation">            <ul class="md-autocomplete-suggestions"                ng-class="::menuClass"                id="ul-{{$mdAutocompleteCtrl.id}}">              <li md-virtual-repeat="item in $mdAutocompleteCtrl.matches"                  ng-class="{ selected: $index === $mdAutocompleteCtrl.index }"                  ng-click="$mdAutocompleteCtrl.select($index)"                  md-extra-name="$mdAutocompleteCtrl.itemName">                  '+s+"                  </li>"+d+"            </ul>          </md-virtual-repeat-container>        </md-autocomplete-wrap>"}}}e.$inject=["$$mdSvgRegistry"],t.module("material.components.autocomplete").directive("mdAutocomplete",e)}(),function(){function e(e,t){function n(e,n,o){return function(e,n,i){function r(n,o){s[o]=e[n],e.$watch(n,function(e){t.nextTick(function(){s[o]=e})})}function a(){var t=!1,n=!1;e.$watch(function(){n||t||(t=!0,e.$$postDigest(function(){n||s.$digest(),t=n=!1}))}),s.$watch(function(){n=!0})}var d=e.$mdAutocompleteCtrl,s=d.parent.$new(),c=d.itemName;r("$index","$index"),r("item",c),a(),o(s,function(e){n.after(e)})}}return{restrict:"AE",compile:n,terminal:!0,transclude:"element"}}e.$inject=["$compile","$mdUtil"],t.module("material.components.autocomplete").directive("mdAutocompleteParentScope",e)}(),function(){function e(e,t,n){this.$scope=e,this.$element=t,this.$attrs=n,this.regex=null}e.$inject=["$scope","$element","$attrs"],t.module("material.components.autocomplete").controller("MdHighlightCtrl",e),e.prototype.init=function(e,t){this.flags=this.$attrs.mdHighlightFlags||"",this.unregisterFn=this.$scope.$watch(function(n){return{term:e(n),contentText:t(n)}}.bind(this),this.onRender.bind(this),!0),this.$element.on("$destroy",this.unregisterFn)},e.prototype.onRender=function(e,t){var n=e.contentText;null!==this.regex&&e.term===t.term||(this.regex=this.createRegex(e.term,this.flags)),e.term?this.applyRegex(n):this.$element.text(n)},e.prototype.applyRegex=function(e){var n=this.resolveTokens(e);this.$element.empty(),n.forEach(function(e){if(e.isMatch){var n=t.element('<span class="highlight">').text(e.text);this.$element.append(n)}else this.$element.append(document.createTextNode(e))}.bind(this))},e.prototype.resolveTokens=function(e){function t(t,o){var i=e.slice(t,o);i&&n.push(i)}var n=[],o=0;return e.replace(this.regex,function(e,i){t(o,i),n.push({text:e,isMatch:!0}),o=i+e.length}),t(o),n},e.prototype.createRegex=function(e,t){var n="",o="",i=this.sanitizeRegex(e);return t.indexOf("^")>=0&&(n="^"),t.indexOf("$")>=0&&(o="$"),new RegExp(n+i+o,t.replace(/[$\^]/g,""))},e.prototype.sanitizeRegex=function(e){return e&&e.toString().replace(/[\\\^\$\*\+\?\.\(\)\|\{}\[\]]/g,"\\$&")}}(),function(){function e(e,t){return{terminal:!0,controller:"MdHighlightCtrl",compile:function(n,o){var i=t(o.mdHighlightText),r=e(n.html());return function(e,t,n,o){o.init(i,r)}}}}e.$inject=["$interpolate","$parse"],t.module("material.components.autocomplete").directive("mdHighlightText",e)}(),function(){function o(e,t,o,i,r){this.$scope=e,this.$element=t,this.$mdConstant=o,this.$timeout=i,this.$mdUtil=r,this.isEditting=!1,this.parentController=n,this.enableChipEdit=!1}o.$inject=["$scope","$element","$mdConstant","$timeout","$mdUtil"],t.module("material.components.chips").controller("MdChipCtrl",o),o.prototype.init=function(e){this.parentController=e,this.enableChipEdit=this.parentController.enableChipEdit,this.enableChipEdit&&(this.$element.on("keydown",this.chipKeyDown.bind(this)),this.$element.on("mousedown",this.chipMouseDown.bind(this)),this.getChipContent().addClass("_md-chip-content-edit-is-enabled"))},o.prototype.getChipContent=function(){var e=this.$element[0].getElementsByClassName("md-chip-content");return t.element(e[0])},o.prototype.getContentElement=function(){return t.element(this.getChipContent().children()[0])},o.prototype.getChipIndex=function(){return parseInt(this.$element.attr("index"))},o.prototype.goOutOfEditMode=function(){if(this.isEditting){this.isEditting=!1,this.$element.removeClass("_md-chip-editing"),this.getChipContent()[0].contentEditable="false";var e=this.getChipIndex(),t=this.getContentElement().text();t?(this.parentController.updateChipContents(e,this.getContentElement().text()),this.$mdUtil.nextTick(function(){this.parentController.selectedChip===e&&this.parentController.focusChip(e)}.bind(this))):this.parentController.removeChipAndFocusInput(e)}},o.prototype.selectNodeContents=function(t){var n,o;document.body.createTextRange?(n=document.body.createTextRange(),n.moveToElementText(t),n.select()):e.getSelection&&(o=e.getSelection(),n=document.createRange(),n.selectNodeContents(t),o.removeAllRanges(),o.addRange(n))},o.prototype.goInEditMode=function(){this.isEditting=!0,this.$element.addClass("_md-chip-editing"),this.getChipContent()[0].contentEditable="true",this.getChipContent().on("blur",function(){this.goOutOfEditMode()}.bind(this)),this.selectNodeContents(this.getChipContent()[0])},o.prototype.chipKeyDown=function(e){this.isEditting||e.keyCode!==this.$mdConstant.KEY_CODE.ENTER&&e.keyCode!==this.$mdConstant.KEY_CODE.SPACE?this.isEditting&&e.keyCode===this.$mdConstant.KEY_CODE.ENTER&&(e.preventDefault(),this.goOutOfEditMode()):(e.preventDefault(),this.goInEditMode())},o.prototype.chipMouseDown=function(){this.getChipIndex()==this.parentController.selectedChip&&this.enableChipEdit&&!this.isEditting&&this.goInEditMode()}}(),function(){function e(e,o,i,r){function a(n,o,a,s){var c=s.shift(),l=s.shift(),m=t.element(o[0].querySelector(".md-chip-content"));e(o),c&&(l.init(c),m.append(i(d)(n)),m.on("blur",function(){c.resetSelectedChip(),c.$scope.$applyAsync()})),r(function(){c&&c.shouldFocusLastChip&&c.focusLastChipThenInput()})}var d=o.processTemplate(n);return{restrict:"E",require:["^?mdChips","mdChip"],link:a,controller:"MdChipCtrl"}}e.$inject=["$mdTheming","$mdUtil","$compile","$timeout"],t.module("material.components.chips").directive("mdChip",e);var n='    <span ng-if="!$mdChipsCtrl.readonly" class="md-visually-hidden">      {{$mdChipsCtrl.deleteHint}}    </span>'}(),function(){function e(e){function t(t,n,o,i){n.on("click",function(e){t.$apply(function(){i.removeChip(t.$$replacedScope.$index)})}),e(function(){n.attr({tabindex:-1,"aria-hidden":!0}),n.find("button").attr("tabindex","-1")})}return{restrict:"A",require:"^mdChips",scope:!1,link:t}}e.$inject=["$timeout"],t.module("material.components.chips").directive("mdChipRemove",e)}(),function(){function e(e){function t(t,n,o){var i=t.$parent.$mdChipsCtrl,r=i.parent.$new(!1,i.parent);r.$$replacedScope=t,r.$chip=t.$chip,r.$index=t.$index,r.$mdChipsCtrl=i;var a=i.$scope.$eval(o.mdChipTransclude);n.html(a),e(n.contents())(r)}return{restrict:"EA",terminal:!0,link:t,scope:!1}}e.$inject=["$compile"],t.module("material.components.chips").directive("mdChipTransclude",e)}(),function(){function e(e,t,o,i,r,a,d){this.$timeout=a,this.$mdConstant=o,this.$scope=e,this.parent=e.$parent,this.$mdUtil=d,this.$log=i,this.$element=r,this.$attrs=t,this.ngModelCtrl=null,this.userInputNgModelCtrl=null,this.autocompleteCtrl=null,this.userInputElement=null,this.items=[],this.selectedChip=-1,this.enableChipEdit=d.parseAttributeBoolean(t.mdEnableChipEdit),this.addOnBlur=d.parseAttributeBoolean(t.mdAddOnBlur),this.inputAriaLabel="Chips input.",this.containerHint="Chips container. Use arrow keys to select chips.",this.deleteHint="Press delete to remove this chip.",this.deleteButtonLabel="Remove",this.chipBuffer="",this.useTransformChip=!1,this.useOnAdd=!1,this.useOnRemove=!1,this.wrapperId="",this.contentIds=[],this.ariaTabIndex=null,this.chipAppendDelay=n,this.init()}e.$inject=["$scope","$attrs","$mdConstant","$log","$element","$timeout","$mdUtil"];var n=300;t.module("material.components.chips").controller("MdChipsCtrl",e),e.prototype.init=function(){var e=this;e.wrapperId="_md-chips-wrapper-"+e.$mdUtil.nextUid(),e.$scope.$watchCollection("$mdChipsCtrl.items",function(){e.setupInputAria(),e.setupWrapperAria()}),e.$attrs.$observe("mdChipAppendDelay",function(t){e.chipAppendDelay=parseInt(t)||n})},e.prototype.setupInputAria=function(){var e=this.$element.find("input");e&&(e.attr("role","textbox"),e.attr("aria-multiline",!0))},e.prototype.setupWrapperAria=function(){var e=this,t=this.$element.find("md-chips-wrap");this.items&&this.items.length?(t.attr("role","listbox"),this.contentIds=this.items.map(function(){return e.wrapperId+"-chip-"+e.$mdUtil.nextUid()}),t.attr("aria-owns",this.contentIds.join(" "))):(t.removeAttr("role"),t.removeAttr("aria-owns"))},e.prototype.inputKeydown=function(e){var t=this.getChipBuffer();if(!(this.autocompleteCtrl&&e.isDefaultPrevented&&e.isDefaultPrevented())){if(e.keyCode===this.$mdConstant.KEY_CODE.BACKSPACE){if(0!==this.getCursorPosition(e.target))return;return e.preventDefault(),e.stopPropagation(),void(this.items.length&&this.selectAndFocusChipSafe(this.items.length-1))}if((!this.separatorKeys||this.separatorKeys.length<1)&&(this.separatorKeys=[this.$mdConstant.KEY_CODE.ENTER]),this.separatorKeys.indexOf(e.keyCode)!==-1){if(this.autocompleteCtrl&&this.requireMatch||!t)return;if(e.preventDefault(),this.hasMaxChipsReached())return;return this.appendChip(t.trim()),this.resetChipBuffer(),!1}}},e.prototype.getCursorPosition=function(e){try{if(e.selectionStart===e.selectionEnd)return e.selectionStart}catch(t){if(!e.value)return 0}},e.prototype.updateChipContents=function(e,t){e>=0&&e<this.items.length&&(this.items[e]=t,this.ngModelCtrl.$setDirty())},e.prototype.isEditingChip=function(){return!!this.$element[0].querySelector("._md-chip-editing")},e.prototype.isRemovable=function(){return!!this.ngModelCtrl&&(this.readonly?this.removable:!t.isDefined(this.removable)||this.removable)},e.prototype.chipKeydown=function(e){if(!this.getChipBuffer()&&!this.isEditingChip())switch(e.keyCode){case this.$mdConstant.KEY_CODE.BACKSPACE:case this.$mdConstant.KEY_CODE.DELETE:if(this.selectedChip<0)return;if(e.preventDefault(),!this.isRemovable())return;this.removeAndSelectAdjacentChip(this.selectedChip);break;case this.$mdConstant.KEY_CODE.LEFT_ARROW:e.preventDefault(),(this.selectedChip<0||this.readonly&&0==this.selectedChip)&&(this.selectedChip=this.items.length),this.items.length&&this.selectAndFocusChipSafe(this.selectedChip-1);break;case this.$mdConstant.KEY_CODE.RIGHT_ARROW:e.preventDefault(),this.selectAndFocusChipSafe(this.selectedChip+1);break;case this.$mdConstant.KEY_CODE.ESCAPE:case this.$mdConstant.KEY_CODE.TAB:if(this.selectedChip<0)return;e.preventDefault(),this.onFocus()}},e.prototype.getPlaceholder=function(){var e=this.items&&this.items.length&&(""==this.secondaryPlaceholder||this.secondaryPlaceholder);return e?this.secondaryPlaceholder:this.placeholder},e.prototype.removeAndSelectAdjacentChip=function(e){var t=this,n=t.getAdjacentChipIndex(e);this.$element[0].querySelector("md-chips-wrap"),this.$element[0].querySelector('md-chip[index="'+e+'"]');t.removeChip(e),t.$timeout(function(){t.$timeout(function(){t.selectAndFocusChipSafe(n)})})},e.prototype.resetSelectedChip=function(){this.selectedChip=-1,this.ariaTabIndex=null},e.prototype.getAdjacentChipIndex=function(e){var t=this.items.length-1;return 0==t?-1:e==t?e-1:e},e.prototype.appendChip=function(e){if(this.shouldFocusLastChip=!0,this.useTransformChip&&this.transformChip){var n=this.transformChip({$chip:e});t.isDefined(n)&&(e=n)}if(t.isObject(e)){var o=this.items.some(function(n){return t.equals(e,n)});if(o)return}if(!(null==e||this.items.indexOf(e)+1)){var i=this.items.push(e),r=i-1;this.ngModelCtrl.$setDirty(),this.validateModel(),this.useOnAdd&&this.onAdd&&this.onAdd({$chip:e,$index:r})}},e.prototype.useTransformChipExpression=function(){this.useTransformChip=!0},e.prototype.useOnAddExpression=function(){this.useOnAdd=!0},e.prototype.useOnRemoveExpression=function(){this.useOnRemove=!0},e.prototype.useOnSelectExpression=function(){this.useOnSelect=!0},e.prototype.getChipBuffer=function(){var e=this.userInputElement?this.userInputNgModelCtrl?this.userInputNgModelCtrl.$viewValue:this.userInputElement[0].value:this.chipBuffer;return t.isString(e)?e:""},e.prototype.resetChipBuffer=function(){this.userInputElement?this.userInputNgModelCtrl?(this.userInputNgModelCtrl.$setViewValue(""),this.userInputNgModelCtrl.$render()):this.userInputElement[0].value="":this.chipBuffer=""},e.prototype.hasMaxChipsReached=function(){return t.isString(this.maxChips)&&(this.maxChips=parseInt(this.maxChips,10)||0),this.maxChips>0&&this.items.length>=this.maxChips},e.prototype.validateModel=function(){this.ngModelCtrl.$setValidity("md-max-chips",!this.hasMaxChipsReached())},e.prototype.removeChip=function(e){var t=this.items.splice(e,1);this.ngModelCtrl.$setDirty(),this.validateModel(),t&&t.length&&this.useOnRemove&&this.onRemove&&this.onRemove({$chip:t[0],$index:e})},e.prototype.removeChipAndFocusInput=function(e){this.removeChip(e),this.autocompleteCtrl?(this.autocompleteCtrl.hidden=!0,this.$mdUtil.nextTick(this.onFocus.bind(this))):this.onFocus()},e.prototype.selectAndFocusChipSafe=function(e){if(!this.items.length||e===-1)return this.focusInput();if(e>=this.items.length){if(!this.readonly)return this.onFocus();e=0}e=Math.max(e,0),e=Math.min(e,this.items.length-1),this.selectChip(e),this.focusChip(e)},e.prototype.focusLastChipThenInput=function(){var e=this;e.shouldFocusLastChip=!1,e.focusChip(this.items.length-1),e.$timeout(function(){e.focusInput()},e.chipAppendDelay)},e.prototype.focusInput=function(){this.selectChip(-1),this.onFocus()},e.prototype.selectChip=function(e){e>=-1&&e<=this.items.length?(this.selectedChip=e,this.useOnSelect&&this.onSelect&&this.onSelect({$chip:this.items[e]})):this.$log.warn("Selected Chip index out of bounds; ignoring.")},e.prototype.selectAndFocusChip=function(e){this.selectChip(e),e!=-1&&this.focusChip(e)},e.prototype.focusChip=function(e){var t=this.$element[0].querySelector('md-chip[index="'+e+'"] .md-chip-content');this.ariaTabIndex=e,t.focus()},e.prototype.configureNgModel=function(e){this.ngModelCtrl=e;var t=this;e.$render=function(){t.items=t.ngModelCtrl.$viewValue}},e.prototype.onFocus=function(){var e=this.$element[0].querySelector("input");e&&e.focus(),this.resetSelectedChip()},e.prototype.onInputFocus=function(){this.inputHasFocus=!0,this.setupInputAria(),this.resetSelectedChip()},e.prototype.onInputBlur=function(){this.inputHasFocus=!1,this.shouldAddOnBlur()&&(this.appendChip(this.getChipBuffer().trim()),this.resetChipBuffer())},e.prototype.configureUserInput=function(e){this.userInputElement=e;var n=e.controller("ngModel");n!=this.ngModelCtrl&&(this.userInputNgModelCtrl=n);var o=this.$scope,i=this,r=function(e,n){o.$evalAsync(t.bind(i,n,e))};e.attr({tabindex:0}).on("keydown",function(e){r(e,i.inputKeydown)}).on("focus",function(e){r(e,i.onInputFocus)}).on("blur",function(e){r(e,i.onInputBlur)})},e.prototype.configureAutocomplete=function(e){e&&(this.autocompleteCtrl=e,e.registerSelectedItemWatcher(t.bind(this,function(e){if(e){if(this.hasMaxChipsReached())return;this.appendChip(e),this.resetChipBuffer()}})),this.$element.find("input").on("focus",t.bind(this,this.onInputFocus)).on("blur",t.bind(this,this.onInputBlur)))},e.prototype.shouldAddOnBlur=function(){this.validateModel();var e=this.getChipBuffer().trim(),t=this.ngModelCtrl.$valid,n=this.autocompleteCtrl&&!this.autocompleteCtrl.hidden;return this.userInputNgModelCtrl&&(t=t&&this.userInputNgModelCtrl.$valid),this.addOnBlur&&!this.requireMatch&&e&&t&&!n},e.prototype.hasFocus=function(){return this.inputHasFocus||this.selectedChip>=0},e.prototype.contentIdFor=function(e){return this.contentIds[e]}}(),function(){function e(e,t,a,d,s,c){function l(n,o){function i(e){if(o.ngModel){var t=r[0].querySelector(e);return t&&t.outerHTML}}var r=o.$mdUserTemplate;o.$mdUserTemplate=null;var l=i("md-chips>md-chip-template"),m=t.prefixer().buildList("md-chip-remove").map(function(e){return"md-chips>*["+e+"]"}).join(","),p=i(m)||u.remove,h=l||u["default"],f=i("md-chips>md-autocomplete")||i("md-chips>input")||u.input,g=r.find("md-chip");return r[0].querySelector("md-chip-template>*[md-chip-remove]")&&d.warn("invalid placement of md-chip-remove within md-chip-template."),function(n,i,r,d){t.initOptionalProperties(n,o),e(i);var m=d[0];if(l&&(m.enableChipEdit=!1),m.chipContentsTemplate=h,m.chipRemoveTemplate=p,m.chipInputTemplate=f,m.mdCloseIcon=c.mdClose,i.attr({tabindex:-1}).on("focus",function(){m.onFocus()}),o.ngModel&&(m.configureNgModel(i.controller("ngModel")),r.mdTransformChip&&m.useTransformChipExpression(),r.mdOnAppend&&m.useOnAppendExpression(),r.mdOnAdd&&m.useOnAddExpression(),r.mdOnRemove&&m.useOnRemoveExpression(),r.mdOnSelect&&m.useOnSelectExpression(),f!=u.input&&n.$watch("$mdChipsCtrl.readonly",function(e){e||t.nextTick(function(){if(0===f.indexOf("<md-autocomplete")){var e=i.find("md-autocomplete");m.configureAutocomplete(e.controller("mdAutocomplete"))}m.configureUserInput(i.find("input"))})}),t.nextTick(function(){var e=i.find("input");e&&e.toggleClass("md-input",!0)})),g.length>0){var b=a(g.clone())(n.$parent);s(function(){i.find("md-chips-wrap").prepend(b)})}}}function m(){return{chips:t.processTemplate(n),input:t.processTemplate(o),"default":t.processTemplate(i),remove:t.processTemplate(r)}}var u=m();return{template:function(e,t){return t.$mdUserTemplate=e.clone(),u.chips},require:["mdChips"],restrict:"E",controller:"MdChipsCtrl",controllerAs:"$mdChipsCtrl",bindToController:!0,compile:l,scope:{readonly:"=readonly",removable:"=mdRemovable",placeholder:"@",secondaryPlaceholder:"@",maxChips:"@mdMaxChips",transformChip:"&mdTransformChip",onAppend:"&mdOnAppend",onAdd:"&mdOnAdd",onRemove:"&mdOnRemove",onSelect:"&mdOnSelect",inputAriaLabel:"@",containerHint:"@",deleteHint:"@",deleteButtonLabel:"@",separatorKeys:"=?mdSeparatorKeys",requireMatch:"=?mdRequireMatch",chipAppendDelayString:"@?mdChipAppendDelay"}}}e.$inject=["$mdTheming","$mdUtil","$compile","$log","$timeout","$$mdSvgRegistry"],t.module("material.components.chips").directive("mdChips",e);var n='      <md-chips-wrap          id="{{$mdChipsCtrl.wrapperId}}"          tabindex="{{$mdChipsCtrl.readonly ? 0 : -1}}"          ng-keydown="$mdChipsCtrl.chipKeydown($event)"          ng-class="{ \'md-focused\': $mdChipsCtrl.hasFocus(),                       \'md-readonly\': !$mdChipsCtrl.ngModelCtrl || $mdChipsCtrl.readonly,                      \'md-removable\': $mdChipsCtrl.isRemovable() }"          aria-setsize="{{$mdChipsCtrl.items.length}}"          class="md-chips">        <span ng-if="$mdChipsCtrl.readonly" class="md-visually-hidden">          {{$mdChipsCtrl.containerHint}}        </span>        <md-chip ng-repeat="$chip in $mdChipsCtrl.items"            index="{{$index}}"            ng-class="{\'md-focused\': $mdChipsCtrl.selectedChip == $index, \'md-readonly\': !$mdChipsCtrl.ngModelCtrl || $mdChipsCtrl.readonly}">          <div class="md-chip-content"              tabindex="{{$mdChipsCtrl.ariaTabIndex == $index ? 0 : -1}}"              id="{{$mdChipsCtrl.contentIdFor($index)}}"              role="option"              aria-selected="{{$mdChipsCtrl.selectedChip == $index}}"               aria-posinset="{{$index}}"              ng-click="!$mdChipsCtrl.readonly && $mdChipsCtrl.focusChip($index)"              ng-focus="!$mdChipsCtrl.readonly && $mdChipsCtrl.selectChip($index)"              md-chip-transclude="$mdChipsCtrl.chipContentsTemplate"></div>          <div ng-if="$mdChipsCtrl.isRemovable()"               class="md-chip-remove-container"               tabindex="-1"               md-chip-transclude="$mdChipsCtrl.chipRemoveTemplate"></div>        </md-chip>        <div class="md-chip-input-container" ng-if="!$mdChipsCtrl.readonly && $mdChipsCtrl.ngModelCtrl">          <div md-chip-transclude="$mdChipsCtrl.chipInputTemplate"></div>        </div>      </md-chips-wrap>',o='        <input            class="md-input"            tabindex="0"            aria-label="{{$mdChipsCtrl.inputAriaLabel}}"             placeholder="{{$mdChipsCtrl.getPlaceholder()}}"            ng-model="$mdChipsCtrl.chipBuffer"            ng-focus="$mdChipsCtrl.onInputFocus()"            ng-blur="$mdChipsCtrl.onInputBlur()"            ng-keydown="$mdChipsCtrl.inputKeydown($event)">',i="      <span>{{$chip}}</span>",r='      <button          class="md-chip-remove"          ng-if="$mdChipsCtrl.isRemovable()"          ng-click="$mdChipsCtrl.removeChipAndFocusInput($$replacedScope.$index)"          type="button"          tabindex="-1">        <md-icon md-svg-src="{{ $mdChipsCtrl.mdCloseIcon }}"></md-icon>        <span class="md-visually-hidden">          {{$mdChipsCtrl.deleteButtonLabel}}        </span>      </button>'}(),function(){function e(){this.selectedItem=null,this.searchText=""}t.module("material.components.chips").controller("MdContactChipsCtrl",e),e.prototype.queryContact=function(e){return this.contactQuery({$query:e})},e.prototype.itemName=function(e){return e[this.contactName]}}(),function(){function e(e,t){function o(n,o){return function(n,i,r,a){var d=a;t.initOptionalProperties(n,o),e(i),i.attr("tabindex","-1"),r.$observe("mdChipAppendDelay",function(e){d.chipAppendDelay=e})}}return{template:function(e,t){return n},restrict:"E",controller:"MdContactChipsCtrl",controllerAs:"$mdContactChipsCtrl",bindToController:!0,compile:o,scope:{contactQuery:"&mdContacts",placeholder:"@",secondaryPlaceholder:"@",contactName:"@mdContactName",contactImage:"@mdContactImage",contactEmail:"@mdContactEmail",contacts:"=ngModel",requireMatch:"=?mdRequireMatch",minLength:"=?mdMinLength",highlightFlags:"@?mdHighlightFlags",chipAppendDelay:"@?mdChipAppendDelay"}}}e.$inject=["$mdTheming","$mdUtil"],t.module("material.components.chips").directive("mdContactChips",e);var n='      <md-chips class="md-contact-chips"          ng-model="$mdContactChipsCtrl.contacts"          md-require-match="$mdContactChipsCtrl.requireMatch"          md-chip-append-delay="{{$mdContactChipsCtrl.chipAppendDelay}}"           md-autocomplete-snap>          <md-autocomplete              md-menu-class="md-contact-chips-suggestions"              md-selected-item="$mdContactChipsCtrl.selectedItem"              md-search-text="$mdContactChipsCtrl.searchText"              md-items="item in $mdContactChipsCtrl.queryContact($mdContactChipsCtrl.searchText)"              md-item-text="$mdContactChipsCtrl.itemName(item)"              md-no-cache="true"              md-min-length="$mdContactChipsCtrl.minLength"              md-autoselect              placeholder="{{$mdContactChipsCtrl.contacts.length == 0 ?                  $mdContactChipsCtrl.placeholder : $mdContactChipsCtrl.secondaryPlaceholder}}">            <div class="md-contact-suggestion">              <img                   ng-src="{{item[$mdContactChipsCtrl.contactImage]}}"                  alt="{{item[$mdContactChipsCtrl.contactName]}}"                  ng-if="item[$mdContactChipsCtrl.contactImage]" />              <span class="md-contact-name" md-highlight-text="$mdContactChipsCtrl.searchText"                    md-highlight-flags="{{$mdContactChipsCtrl.highlightFlags}}">                {{item[$mdContactChipsCtrl.contactName]}}              </span>              <span class="md-contact-email" >{{item[$mdContactChipsCtrl.contactEmail]}}</span>            </div>          </md-autocomplete>          <md-chip-template>            <div class="md-contact-avatar">              <img                   ng-src="{{$chip[$mdContactChipsCtrl.contactImage]}}"                  alt="{{$chip[$mdContactChipsCtrl.contactName]}}"                  ng-if="$chip[$mdContactChipsCtrl.contactImage]" />            </div>            <div class="md-contact-name">              {{$chip[$mdContactChipsCtrl.contactName]}}            </div>          </md-chip-template>      </md-chips>'}(),function(){!function(){function e(){return{template:function(e,t){var n=t.hasOwnProperty("ngIf")?"":'ng-if="calendarCtrl.isInitialized"',o='<div ng-switch="calendarCtrl.currentView" '+n+'><md-calendar-year ng-switch-when="year"></md-calendar-year><md-calendar-month ng-switch-default></md-calendar-month></div>';return o},scope:{minDate:"=mdMinDate",maxDate:"=mdMaxDate",dateFilter:"=mdDateFilter",_currentView:"@mdCurrentView"},require:["ngModel","mdCalendar"],controller:n,controllerAs:"calendarCtrl",bindToController:!0,link:function(e,t,n,o){var i=o[0],r=o[1];r.configureNgModel(i)}}}function n(e,n,o,r,a,d,s,c,l){d(e),this.$element=e,this.$scope=n,this.dateUtil=o,this.$mdUtil=r,this.keyCode=a.KEY_CODE,this.$$rAF=s,this.$mdDateLocale=l,this.today=this.dateUtil.createDateAtMidnight(),this.ngModelCtrl=null,this.SELECTED_DATE_CLASS="md-calendar-selected-date",this.TODAY_CLASS="md-calendar-date-today",this.FOCUSED_DATE_CLASS="md-focus",this.id=i++,this.displayDate=null,this.selectedDate=null,this.firstRenderableDate=null,this.lastRenderableDate=null,this.isInitialized=!1,this.width=0,this.scrollbarWidth=0,c.tabindex||e.attr("tabindex","-1");var m,u=t.bind(this,this.handleKeyEvent);m=e.parent().hasClass("md-datepicker-calendar")?t.element(document.body):e,m.on("keydown",u),n.$on("$destroy",function(){m.off("keydown",u)}),1===t.version.major&&t.version.minor<=4&&this.$onInit()}n.$inject=["$element","$scope","$$mdDateUtil","$mdUtil","$mdConstant","$mdTheming","$$rAF","$attrs","$mdDateLocale"],t.module("material.components.datepicker").directive("mdCalendar",e);var o=340,i=0;n.prototype.$onInit=function(){this.currentView=this._currentView||"month";var e=this.$mdDateLocale;this.minDate&&this.minDate>e.firstRenderableDate?this.firstRenderableDate=this.minDate:this.firstRenderableDate=e.firstRenderableDate,this.maxDate&&this.maxDate<e.lastRenderableDate?this.lastRenderableDate=this.maxDate:this.lastRenderableDate=e.lastRenderableDate},n.prototype.configureNgModel=function(e){var t=this;t.ngModelCtrl=e,t.$mdUtil.nextTick(function(){t.isInitialized=!0}),e.$render=function(){var e=this.$viewValue;t.$scope.$broadcast("md-calendar-parent-changed",e),t.selectedDate||(t.selectedDate=e),t.displayDate||(t.displayDate=t.selectedDate||t.today)}},n.prototype.setNgModelValue=function(e){
var t=this.dateUtil.createDateAtMidnight(e);return this.focus(t),this.$scope.$emit("md-calendar-change",t),this.ngModelCtrl.$setViewValue(t),this.ngModelCtrl.$render(),t},n.prototype.setCurrentView=function(e,n){var o=this;o.$mdUtil.nextTick(function(){o.currentView=e,n&&(o.displayDate=t.isDate(n)?n:new Date(n))})},n.prototype.focus=function(e){if(this.dateUtil.isValidDate(e)){var t=this.$element[0].querySelector(".md-focus");t&&t.classList.remove(this.FOCUSED_DATE_CLASS);var n=this.getDateId(e,this.currentView),o=document.getElementById(n);o&&(o.classList.add(this.FOCUSED_DATE_CLASS),o.focus(),this.displayDate=e)}else{var i=this.$element[0].querySelector("[ng-switch]");i&&i.focus()}},n.prototype.getActionFromKeyEvent=function(e){var t=this.keyCode;switch(e.which){case t.ENTER:return"select";case t.RIGHT_ARROW:return"move-right";case t.LEFT_ARROW:return"move-left";case t.DOWN_ARROW:return e.metaKey?"move-page-down":"move-row-down";case t.UP_ARROW:return e.metaKey?"move-page-up":"move-row-up";case t.PAGE_DOWN:return"move-page-down";case t.PAGE_UP:return"move-page-up";case t.HOME:return"start";case t.END:return"end";default:return null}},n.prototype.handleKeyEvent=function(e){var t=this;this.$scope.$apply(function(){if(e.which==t.keyCode.ESCAPE||e.which==t.keyCode.TAB)return t.$scope.$emit("md-calendar-close"),void(e.which==t.keyCode.TAB&&e.preventDefault());var n=t.getActionFromKeyEvent(e);n&&(e.preventDefault(),e.stopPropagation(),t.$scope.$broadcast("md-calendar-parent-action",n))})},n.prototype.hideVerticalScrollbar=function(e){function t(){var t=n.width||o,i=n.scrollbarWidth,a=e.calendarScroller;r.style.width=t+"px",a.style.width=t+i+"px",a.style.paddingRight=i+"px"}var n=this,i=e.$element[0],r=i.querySelector(".md-calendar-scroll-mask");n.width>0?t():n.$$rAF(function(){var o=e.calendarScroller;n.scrollbarWidth=o.offsetWidth-o.clientWidth,n.width=i.querySelector("table").offsetWidth,t()})},n.prototype.getDateId=function(e,t){if(!t)throw new Error("A namespace for the date id has to be specified.");return["md",this.id,t,e.getFullYear(),e.getMonth(),e.getDate()].join("-")},n.prototype.updateVirtualRepeat=function(){var e=this.$scope,t=e.$on("$md-resize-enable",function(){e.$$phase||e.$apply(),t()})}}()}(),function(){!function(){function e(){return{template:'<table aria-hidden="true" class="md-calendar-day-header"><thead></thead></table><div class="md-calendar-scroll-mask"><md-virtual-repeat-container class="md-calendar-scroll-container" md-offset-size="'+(i-o)+'"><table role="grid" tabindex="0" class="md-calendar" aria-readonly="true"><tbody md-calendar-month-body role="rowgroup" md-virtual-repeat="i in monthCtrl.items" md-month-offset="$index" class="md-calendar-month" md-start-index="monthCtrl.getSelectedMonthIndex()" md-item-size="'+o+'"><tr aria-hidden="true" style="height:'+o+'px;"></tr></tbody></table></md-virtual-repeat-container></div>',require:["^^mdCalendar","mdCalendarMonth"],controller:n,controllerAs:"monthCtrl",bindToController:!0,link:function(e,t,n,o){var i=o[0],r=o[1];r.initialize(i)}}}function n(e,t,n,o,i,r){this.$element=e,this.$scope=t,this.$animate=n,this.$q=o,this.dateUtil=i,this.dateLocale=r,this.calendarScroller=e[0].querySelector(".md-virtual-repeat-scroller"),this.isInitialized=!1,this.isMonthTransitionInProgress=!1;var a=this;this.cellClickHandler=function(){var e=i.getTimestampFromNode(this);a.$scope.$apply(function(){a.calendarCtrl.setNgModelValue(e)})},this.headerClickHandler=function(){a.calendarCtrl.setCurrentView("year",i.getTimestampFromNode(this))}}n.$inject=["$element","$scope","$animate","$q","$$mdDateUtil","$mdDateLocale"],t.module("material.components.datepicker").directive("mdCalendarMonth",e);var o=265,i=45;n.prototype.initialize=function(e){this.items={length:this.dateUtil.getMonthDistance(e.firstRenderableDate,e.lastRenderableDate)+2},this.calendarCtrl=e,this.attachScopeListeners(),e.updateVirtualRepeat(),e.ngModelCtrl&&e.ngModelCtrl.$render()},n.prototype.getSelectedMonthIndex=function(){var e=this.calendarCtrl;return this.dateUtil.getMonthDistance(e.firstRenderableDate,e.displayDate||e.selectedDate||e.today)},n.prototype.changeSelectedDate=function(e){var t=this,n=t.calendarCtrl,o=n.selectedDate;n.selectedDate=e,this.changeDisplayDate(e).then(function(){var t=n.SELECTED_DATE_CLASS,i="month";if(o){var r=document.getElementById(n.getDateId(o,i));r&&(r.classList.remove(t),r.setAttribute("aria-selected","false"))}if(e){var a=document.getElementById(n.getDateId(e,i));a&&(a.classList.add(t),a.setAttribute("aria-selected","true"))}})},n.prototype.changeDisplayDate=function(e){if(!this.isInitialized)return this.buildWeekHeader(),this.calendarCtrl.hideVerticalScrollbar(this),this.isInitialized=!0,this.$q.when();if(!this.dateUtil.isValidDate(e)||this.isMonthTransitionInProgress)return this.$q.when();this.isMonthTransitionInProgress=!0;var t=this.animateDateChange(e);this.calendarCtrl.displayDate=e;var n=this;return t.then(function(){n.isMonthTransitionInProgress=!1}),t},n.prototype.animateDateChange=function(e){if(this.dateUtil.isValidDate(e)){var t=this.dateUtil.getMonthDistance(this.calendarCtrl.firstRenderableDate,e);this.calendarScroller.scrollTop=t*o}return this.$q.when()},n.prototype.buildWeekHeader=function(){for(var e=this.dateLocale.firstDayOfWeek,t=this.dateLocale.shortDays,n=document.createElement("tr"),o=0;o<7;o++){var i=document.createElement("th");i.textContent=t[(o+e)%7],n.appendChild(i)}this.$element.find("thead").append(n)},n.prototype.attachScopeListeners=function(){var e=this;e.$scope.$on("md-calendar-parent-changed",function(t,n){e.changeSelectedDate(n)}),e.$scope.$on("md-calendar-parent-action",t.bind(this,this.handleKeyEvent))},n.prototype.handleKeyEvent=function(e,t){var n=this.calendarCtrl,o=n.displayDate;if("select"===t)n.setNgModelValue(o);else{var i=null,r=this.dateUtil;switch(t){case"move-right":i=r.incrementDays(o,1);break;case"move-left":i=r.incrementDays(o,-1);break;case"move-page-down":i=r.incrementMonths(o,1);break;case"move-page-up":i=r.incrementMonths(o,-1);break;case"move-row-down":i=r.incrementDays(o,7);break;case"move-row-up":i=r.incrementDays(o,-7);break;case"start":i=r.getFirstDateOfMonth(o);break;case"end":i=r.getLastDateOfMonth(o)}i&&(i=this.dateUtil.clampDate(i,n.minDate,n.maxDate),this.changeDisplayDate(i).then(function(){n.focus(i)}))}}}()}(),function(){!function(){function e(e,o){var i=e('<md-icon md-svg-src="'+o.mdTabsArrow+'"></md-icon>')({})[0];return{require:["^^mdCalendar","^^mdCalendarMonth","mdCalendarMonthBody"],scope:{offset:"=mdMonthOffset"},controller:n,controllerAs:"mdMonthBodyCtrl",bindToController:!0,link:function(e,n,o,r){var a=r[0],d=r[1],s=r[2];s.calendarCtrl=a,s.monthCtrl=d,s.arrowIcon=i.cloneNode(!0),e.$watch(function(){return s.offset},function(e){t.isNumber(e)&&s.generateContent()})}}}function n(e,t,n){this.$element=e,this.dateUtil=t,this.dateLocale=n,this.monthCtrl=null,this.calendarCtrl=null,this.offset=null,this.focusAfterAppend=null}e.$inject=["$compile","$$mdSvgRegistry"],n.$inject=["$element","$$mdDateUtil","$mdDateLocale"],t.module("material.components.datepicker").directive("mdCalendarMonthBody",e),n.prototype.generateContent=function(){var e=this.dateUtil.incrementMonths(this.calendarCtrl.firstRenderableDate,this.offset);this.$element.empty().append(this.buildCalendarForMonth(e)),this.focusAfterAppend&&(this.focusAfterAppend.classList.add(this.calendarCtrl.FOCUSED_DATE_CLASS),this.focusAfterAppend.focus(),this.focusAfterAppend=null)},n.prototype.buildDateCell=function(e){var t=this.monthCtrl,n=this.calendarCtrl,o=document.createElement("td");if(o.tabIndex=-1,o.classList.add("md-calendar-date"),o.setAttribute("role","gridcell"),e){o.setAttribute("tabindex","-1"),o.setAttribute("aria-label",this.dateLocale.longDateFormatter(e)),o.id=n.getDateId(e,"month"),o.setAttribute("data-timestamp",e.getTime()),this.dateUtil.isSameDay(e,n.today)&&o.classList.add(n.TODAY_CLASS),this.dateUtil.isValidDate(n.selectedDate)&&this.dateUtil.isSameDay(e,n.selectedDate)&&(o.classList.add(n.SELECTED_DATE_CLASS),o.setAttribute("aria-selected","true"));var i=this.dateLocale.dates[e.getDate()];if(this.isDateEnabled(e)){var r=document.createElement("span");r.classList.add("md-calendar-date-selection-indicator"),r.textContent=i,o.appendChild(r),o.addEventListener("click",t.cellClickHandler),n.displayDate&&this.dateUtil.isSameDay(e,n.displayDate)&&(this.focusAfterAppend=o)}else o.classList.add("md-calendar-date-disabled"),o.textContent=i}return o},n.prototype.isDateEnabled=function(e){return this.dateUtil.isDateWithinRange(e,this.calendarCtrl.minDate,this.calendarCtrl.maxDate)&&(!t.isFunction(this.calendarCtrl.dateFilter)||this.calendarCtrl.dateFilter(e))},n.prototype.buildDateRow=function(e){var t=document.createElement("tr");return t.setAttribute("role","row"),t.setAttribute("aria-label",this.dateLocale.weekNumberFormatter(e)),t},n.prototype.buildCalendarForMonth=function(e){var t=this.dateUtil.isValidDate(e)?e:new Date,n=this.dateUtil.getFirstDateOfMonth(t),o=this.getLocaleDay_(n),i=this.dateUtil.getNumberOfDaysInMonth(t),r=document.createDocumentFragment(),a=1,d=this.buildDateRow(a);r.appendChild(d);var s=this.offset===this.monthCtrl.items.length-1,c=0,l=document.createElement("td"),m=document.createElement("span");if(m.textContent=this.dateLocale.monthHeaderFormatter(t),l.appendChild(m),l.classList.add("md-calendar-month-label"),this.calendarCtrl.maxDate&&n>this.calendarCtrl.maxDate?l.classList.add("md-calendar-month-label-disabled"):(l.addEventListener("click",this.monthCtrl.headerClickHandler),l.setAttribute("data-timestamp",n.getTime()),l.setAttribute("aria-label",this.dateLocale.monthFormatter(t)),l.appendChild(this.arrowIcon.cloneNode(!0))),o<=2){l.setAttribute("colspan","7");var u=this.buildDateRow();if(u.appendChild(l),r.insertBefore(u,d),s)return r}else c=3,l.setAttribute("colspan","3"),d.appendChild(l);for(var p=c;p<o;p++)d.appendChild(this.buildDateCell());for(var h=o,f=n,g=1;g<=i;g++){if(7===h){if(s)return r;h=0,a++,d=this.buildDateRow(a),r.appendChild(d)}f.setDate(g);var b=this.buildDateCell(f);d.appendChild(b),h++}for(;d.childNodes.length<7;)d.appendChild(this.buildDateCell());for(;r.childNodes.length<6;){for(var v=this.buildDateRow(),E=0;E<7;E++)v.appendChild(this.buildDateCell());r.appendChild(v)}return r},n.prototype.getLocaleDay_=function(e){return(e.getDay()+(7-this.dateLocale.firstDayOfWeek))%7}}()}(),function(){!function(){function e(){return{template:'<div class="md-calendar-scroll-mask"><md-virtual-repeat-container class="md-calendar-scroll-container"><table role="grid" tabindex="0" class="md-calendar" aria-readonly="true"><tbody md-calendar-year-body role="rowgroup" md-virtual-repeat="i in yearCtrl.items" md-year-offset="$index" class="md-calendar-year" md-start-index="yearCtrl.getFocusedYearIndex()" md-item-size="'+o+'"><tr aria-hidden="true" style="height:'+o+'px;"></tr></tbody></table></md-virtual-repeat-container></div>',require:["^^mdCalendar","mdCalendarYear"],controller:n,controllerAs:"yearCtrl",bindToController:!0,link:function(e,t,n,o){var i=o[0],r=o[1];r.initialize(i)}}}function n(e,t,n,o,i){this.$element=e,this.$scope=t,this.$animate=n,this.$q=o,this.dateUtil=i,this.calendarScroller=e[0].querySelector(".md-virtual-repeat-scroller"),this.isInitialized=!1,this.isMonthTransitionInProgress=!1;var r=this;this.cellClickHandler=function(){r.calendarCtrl.setCurrentView("month",i.getTimestampFromNode(this))}}n.$inject=["$element","$scope","$animate","$q","$$mdDateUtil"],t.module("material.components.datepicker").directive("mdCalendarYear",e);var o=88;n.prototype.initialize=function(e){this.items={length:this.dateUtil.getYearDistance(e.firstRenderableDate,e.lastRenderableDate)+1},this.calendarCtrl=e,this.attachScopeListeners(),e.updateVirtualRepeat(),e.ngModelCtrl&&e.ngModelCtrl.$render()},n.prototype.getFocusedYearIndex=function(){var e=this.calendarCtrl;return this.dateUtil.getYearDistance(e.firstRenderableDate,e.displayDate||e.selectedDate||e.today)},n.prototype.changeDate=function(e){if(!this.isInitialized)return this.calendarCtrl.hideVerticalScrollbar(this),this.isInitialized=!0,this.$q.when();if(this.dateUtil.isValidDate(e)&&!this.isMonthTransitionInProgress){var t=this,n=this.animateDateChange(e);return t.isMonthTransitionInProgress=!0,t.calendarCtrl.displayDate=e,n.then(function(){t.isMonthTransitionInProgress=!1})}},n.prototype.animateDateChange=function(e){if(this.dateUtil.isValidDate(e)){var t=this.dateUtil.getYearDistance(this.calendarCtrl.firstRenderableDate,e);this.calendarScroller.scrollTop=t*o}return this.$q.when()},n.prototype.handleKeyEvent=function(e,t){var n=this.calendarCtrl,o=n.displayDate;if("select"===t)this.changeDate(o).then(function(){n.setCurrentView("month",o),n.focus(o)});else{var i=null,r=this.dateUtil;switch(t){case"move-right":i=r.incrementMonths(o,1);break;case"move-left":i=r.incrementMonths(o,-1);break;case"move-row-down":i=r.incrementMonths(o,6);break;case"move-row-up":i=r.incrementMonths(o,-6)}if(i){var a=n.minDate?r.getFirstDateOfMonth(n.minDate):null,d=n.maxDate?r.getFirstDateOfMonth(n.maxDate):null;i=r.getFirstDateOfMonth(this.dateUtil.clampDate(i,a,d)),this.changeDate(i).then(function(){n.focus(i)})}}},n.prototype.attachScopeListeners=function(){var e=this;e.$scope.$on("md-calendar-parent-changed",function(t,n){e.changeDate(n)}),e.$scope.$on("md-calendar-parent-action",t.bind(e,e.handleKeyEvent))}}()}(),function(){!function(){function e(){return{require:["^^mdCalendar","^^mdCalendarYear","mdCalendarYearBody"],scope:{offset:"=mdYearOffset"},controller:n,controllerAs:"mdYearBodyCtrl",bindToController:!0,link:function(e,n,o,i){var r=i[0],a=i[1],d=i[2];d.calendarCtrl=r,d.yearCtrl=a,e.$watch(function(){return d.offset},function(e){t.isNumber(e)&&d.generateContent()})}}}function n(e,t,n){this.$element=e,this.dateUtil=t,this.dateLocale=n,this.calendarCtrl=null,this.yearCtrl=null,this.offset=null,this.focusAfterAppend=null}n.$inject=["$element","$$mdDateUtil","$mdDateLocale"],t.module("material.components.datepicker").directive("mdCalendarYearBody",e),n.prototype.generateContent=function(){var e=this.dateUtil.incrementYears(this.calendarCtrl.firstRenderableDate,this.offset);this.$element.empty().append(this.buildCalendarForYear(e)),this.focusAfterAppend&&(this.focusAfterAppend.classList.add(this.calendarCtrl.FOCUSED_DATE_CLASS),this.focusAfterAppend.focus(),this.focusAfterAppend=null)},n.prototype.buildMonthCell=function(e,t){var n=this.calendarCtrl,o=this.yearCtrl,i=this.buildBlankCell(),r=new Date(e,t,1);i.setAttribute("aria-label",this.dateLocale.monthFormatter(r)),i.id=n.getDateId(r,"year"),i.setAttribute("data-timestamp",r.getTime()),this.dateUtil.isSameMonthAndYear(r,n.today)&&i.classList.add(n.TODAY_CLASS),this.dateUtil.isValidDate(n.selectedDate)&&this.dateUtil.isSameMonthAndYear(r,n.selectedDate)&&(i.classList.add(n.SELECTED_DATE_CLASS),i.setAttribute("aria-selected","true"));var a=this.dateLocale.shortMonths[t];if(this.dateUtil.isMonthWithinRange(r,n.minDate,n.maxDate)){var d=document.createElement("span");d.classList.add("md-calendar-date-selection-indicator"),d.textContent=a,i.appendChild(d),i.addEventListener("click",o.cellClickHandler),n.displayDate&&this.dateUtil.isSameMonthAndYear(r,n.displayDate)&&(this.focusAfterAppend=i)}else i.classList.add("md-calendar-date-disabled"),i.textContent=a;return i},n.prototype.buildBlankCell=function(){var e=document.createElement("td");return e.tabIndex=-1,e.classList.add("md-calendar-date"),e.setAttribute("role","gridcell"),e.setAttribute("tabindex","-1"),e},n.prototype.buildCalendarForYear=function(e){var t,n=e.getFullYear(),o=document.createDocumentFragment(),i=document.createElement("tr"),r=document.createElement("td");for(r.className="md-calendar-month-label",r.textContent=n,i.appendChild(r),t=0;t<6;t++)i.appendChild(this.buildMonthCell(n,t));o.appendChild(i);var a=document.createElement("tr");for(a.appendChild(this.buildBlankCell()),t=6;t<12;t++)a.appendChild(this.buildMonthCell(n,t));return o.appendChild(a),o}}()}(),function(){!function(){t.module("material.components.datepicker").config(["$provide",function(e){function t(){this.months=null,this.shortMonths=null,this.days=null,this.shortDays=null,this.dates=null,this.firstDayOfWeek=0,this.formatDate=null,this.parseDate=null,this.monthHeaderFormatter=null,this.weekNumberFormatter=null,this.longDateFormatter=null,this.msgCalendar="",this.msgOpenCalendar=""}t.prototype.$get=function(e,t){function n(e,n){if(!e)return"";var o=e.toLocaleTimeString(),i=e;return 0!==e.getHours()||o.indexOf("11:")===-1&&o.indexOf("23:")===-1||(i=new Date(e.getFullYear(),e.getMonth(),e.getDate(),1,0,0)),t("date")(i,"M/d/yyyy",n)}function o(e){return new Date(e)}function i(e){e=e.trim();var t=/^(([a-zA-Z]{3,}|[0-9]{1,4})([ \.,]+|[\/\-])){2}([a-zA-Z]{3,}|[0-9]{1,4})$/;return t.test(e)}function r(e){return g.shortMonths[e.getMonth()]+" "+e.getFullYear()}function a(e){return g.months[e.getMonth()]+" "+e.getFullYear()}function d(e){return"Week "+e}function s(e){return[g.days[e.getDay()],g.months[e.getMonth()],g.dates[e.getDate()],e.getFullYear()].join(" ")}for(var c=e.DATETIME_FORMATS.SHORTDAY.map(function(e){return e.substring(0,1)}),l=Array(32),m=1;m<=31;m++)l[m]=m;var u="Calendar",p="Open calendar",h=new Date(1880,0,1),f=new Date(h.getFullYear()+250,0,1),g={months:this.months||e.DATETIME_FORMATS.MONTH,shortMonths:this.shortMonths||e.DATETIME_FORMATS.SHORTMONTH,days:this.days||e.DATETIME_FORMATS.DAY,shortDays:this.shortDays||c,dates:this.dates||l,firstDayOfWeek:this.firstDayOfWeek||0,formatDate:this.formatDate||n,parseDate:this.parseDate||o,isDateComplete:this.isDateComplete||i,monthHeaderFormatter:this.monthHeaderFormatter||r,monthFormatter:this.monthFormatter||a,weekNumberFormatter:this.weekNumberFormatter||d,longDateFormatter:this.longDateFormatter||s,msgCalendar:this.msgCalendar||u,msgOpenCalendar:this.msgOpenCalendar||p,firstRenderableDate:this.firstRenderableDate||h,lastRenderableDate:this.lastRenderableDate||f};return g},t.prototype.$get.$inject=["$locale","$filter"],e.provider("$mdDateLocale",new t)}])}()}(),function(){!function(){t.module("material.components.datepicker").factory("$$mdDateUtil",function(){function e(e){return new Date(e.getFullYear(),e.getMonth(),1)}function n(e){return new Date(e.getFullYear(),e.getMonth()+1,0).getDate()}function o(e){return new Date(e.getFullYear(),e.getMonth()+1,1)}function i(e){return new Date(e.getFullYear(),e.getMonth()-1,1)}function r(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()}function a(e,t){return e.getDate()==t.getDate()&&r(e,t)}function d(e,t){var n=o(e);return r(n,t)}function s(e,t){var n=i(e);return r(t,n)}function c(e,t){return b((e.getTime()+t.getTime())/2)}function l(t){var n=e(t);return Math.floor((n.getDay()+t.getDate()-1)/7)}function m(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()+t)}function u(e,t){var o=new Date(e.getFullYear(),e.getMonth()+t,1),i=n(o);return i<e.getDate()?o.setDate(i):o.setDate(e.getDate()),o}function p(e,t){return 12*(t.getFullYear()-e.getFullYear())+(t.getMonth()-e.getMonth())}function h(e){return new Date(e.getFullYear(),e.getMonth(),n(e))}function f(e){return e&&e.getTime&&!isNaN(e.getTime())}function g(e){f(e)&&e.setHours(0,0,0,0)}function b(e){var n;return n=t.isUndefined(e)?new Date:new Date(e),g(n),n}function v(e,t,n){var o=b(e),i=f(t)?b(t):null,r=f(n)?b(n):null;return(!i||i<=o)&&(!r||r>=o)}function E(e,t){return u(e,12*t)}function $(e,t){return t.getFullYear()-e.getFullYear()}function C(e,t,n){var o=e;return t&&e<t&&(o=new Date(t.getTime())),n&&e>n&&(o=new Date(n.getTime())),o}function y(e){if(e&&e.hasAttribute("data-timestamp"))return Number(e.getAttribute("data-timestamp"))}function M(e,t,n){var o=e.getMonth(),i=e.getFullYear();return(!t||t.getFullYear()<i||t.getMonth()<=o)&&(!n||n.getFullYear()>i||n.getMonth()>=o)}return{getFirstDateOfMonth:e,getNumberOfDaysInMonth:n,getDateInNextMonth:o,getDateInPreviousMonth:i,isInNextMonth:d,isInPreviousMonth:s,getDateMidpoint:c,isSameMonthAndYear:r,getWeekOfMonth:l,incrementDays:m,incrementMonths:u,getLastDateOfMonth:h,isSameDay:a,getMonthDistance:p,isValidDate:f,setDateTimeToMidnight:g,createDateAtMidnight:b,isDateWithinRange:v,incrementYears:E,getYearDistance:$,clampDate:C,getTimestampFromNode:y,isMonthWithinRange:M}})}()}(),function(){!function(){function n(e,n,i,r){return{template:function(t,n){var o=n.mdHideIcons,i=n.ariaLabel||n.mdPlaceholder,r="all"===o||"calendar"===o?"":'<md-button class="md-datepicker-button md-icon-button" type="button" tabindex="-1" aria-hidden="true" ng-click="ctrl.openCalendarPane($event)"><md-icon class="md-datepicker-calendar-icon" aria-label="md-calendar" md-svg-src="'+e.mdCalendar+'"></md-icon></md-button>',a="";return"all"!==o&&"triangle"!==o&&(a='<md-button type="button" md-no-ink class="md-datepicker-triangle-button md-icon-button" ng-click="ctrl.openCalendarPane($event)" aria-label="{{::ctrl.locale.msgOpenCalendar}}"><div class="md-datepicker-expand-triangle"></div></md-button>',t.addClass(c)),r+'<div class="md-datepicker-input-container" ng-class="{\'md-datepicker-focused\': ctrl.isFocused}"><input '+(i?'aria-label="'+i+'" ':"")+'class="md-datepicker-input" aria-haspopup="true" aria-expanded="{{ctrl.isCalendarOpen}}" ng-focus="ctrl.setFocused(true)" ng-blur="ctrl.setFocused(false)"> '+a+'</div><div class="md-datepicker-calendar-pane md-whiteframe-z1" id="{{::ctrl.calendarPaneId}}"><div class="md-datepicker-input-mask"><div class="md-datepicker-input-mask-opaque"></div></div><div class="md-datepicker-calendar"><md-calendar role="dialog" aria-label="{{::ctrl.locale.msgCalendar}}" md-current-view="{{::ctrl.currentView}}"md-min-date="ctrl.minDate"md-max-date="ctrl.maxDate"md-date-filter="ctrl.dateFilter"ng-model="ctrl.date" ng-if="ctrl.isCalendarOpen"></md-calendar></div></div>'},require:["ngModel","mdDatepicker","?^mdInputContainer","?^form"],scope:{minDate:"=mdMinDate",maxDate:"=mdMaxDate",placeholder:"@mdPlaceholder",currentView:"@mdCurrentView",dateFilter:"=mdDateFilter",isOpen:"=?mdIsOpen",debounceInterval:"=mdDebounceInterval",dateLocale:"=mdDateLocale"},controller:o,controllerAs:"ctrl",bindToController:!0,link:function(e,o,a,c){var l=c[0],m=c[1],u=c[2],p=c[3],h=n.parseAttributeBoolean(a.mdNoAsterisk);if(m.configureNgModel(l,u,r),u){var f=o[0].querySelector(".md-errors-spacer");f&&o.after(t.element("<div>").append(f)),u.setHasPlaceholder(a.mdPlaceholder),u.input=o,u.element.addClass(d).toggleClass(s,"calendar"!==a.mdHideIcons&&"all"!==a.mdHideIcons),u.label?h||a.$observe("required",function(e){u.label.toggleClass("md-required",!!e)}):i.expect(o,"aria-label",a.mdPlaceholder),e.$watch(u.isErrorGetter||function(){return l.$invalid&&(l.$touched||p&&p.$submitted)},u.setInvalid)}else if(p)var g=e.$watch(function(){return p.$submitted},function(e){e&&(m.updateErrorState(),g())})}}}function o(n,o,i,r,a,d,s,c,l,m,u){this.$window=r,this.dateUtil=l,this.$mdConstant=a,this.$mdUtil=s,this.$$rAF=m,this.$mdDateLocale=c,this.documentElement=t.element(document.documentElement),this.ngModelCtrl=null,this.inputElement=o[0].querySelector("input"),this.ngInputElement=t.element(this.inputElement),this.inputContainer=o[0].querySelector(".md-datepicker-input-container"),this.calendarPane=o[0].querySelector(".md-datepicker-calendar-pane"),this.calendarButton=o[0].querySelector(".md-datepicker-button"),this.inputMask=t.element(o[0].querySelector(".md-datepicker-input-mask-opaque")),this.$element=o,this.$attrs=i,this.$scope=n,this.date=null,this.isFocused=!1,this.isDisabled,this.setDisabled(o[0].disabled||t.isString(i.disabled)),this.isCalendarOpen=!1,this.openOnFocus=i.hasOwnProperty("mdOpenOnFocus"),this.mdInputContainer=null,this.calendarPaneOpenedFrom=null,this.calendarPaneId="md-date-pane-"+s.nextUid(),this.bodyClickHandler=t.bind(this,this.handleBodyClick),this.windowEventName=p.test(navigator.userAgent||navigator.vendor||e.opera)?"orientationchange":"resize",this.windowEventHandler=s.debounce(t.bind(this,this.closeCalendarPane),100),this.windowBlurHandler=t.bind(this,this.handleWindowBlur),this.ngDateFilter=u("date"),this.leftMargin=20,this.topMargin=null,i.tabindex?(this.ngInputElement.attr("tabindex",i.tabindex),i.$set("tabindex",null)):i.$set("tabindex","-1"),i.$set("aria-owns",this.calendarPaneId),d(o),d(t.element(this.calendarPane));var h=this;n.$on("$destroy",function(){h.detachCalendarPane()}),i.mdIsOpen&&n.$watch("ctrl.isOpen",function(e){e?h.openCalendarPane({target:h.inputElement}):h.closeCalendarPane()}),1===t.version.major&&t.version.minor<=4&&this.$onInit()}o.$inject=["$scope","$element","$attrs","$window","$mdConstant","$mdTheming","$mdUtil","$mdDateLocale","$$mdDateUtil","$$rAF","$filter"],n.$inject=["$$mdSvgRegistry","$mdUtil","$mdAria","inputDirective"],t.module("material.components.datepicker").directive("mdDatepicker",n);var i=3,r="md-datepicker-invalid",a="md-datepicker-open",d="_md-datepicker-floating-label",s="_md-datepicker-has-calendar-icon",c="_md-datepicker-has-triangle-icon",l=500,m=368,u=360,p=/ipad|iphone|ipod|android/i;o.prototype.$onInit=function(){this.locale=this.dateLocale?t.extend({},this.$mdDateLocale,this.dateLocale):this.$mdDateLocale,this.installPropertyInterceptors(),this.attachChangeListeners(),this.attachInteractionListeners()},o.prototype.configureNgModel=function(e,n,o){this.ngModelCtrl=e,this.mdInputContainer=n,this.$attrs.$set("type","date"),o[0].link.pre(this.$scope,{on:t.noop,val:t.noop,0:{}},this.$attrs,[e]);var i=this;i.ngModelCtrl.$formatters.push(function(e){var n=t.isDefined(e)?Date.parse(e):null;if(!isNaN(n)&&t.isNumber(n)&&(e=new Date(n)),e&&!(e instanceof Date))throw Error("The ng-model for md-datepicker must be a Date instance or a value that can be parsed into a date. Currently the model is of type: "+typeof e);return i.onExternalChange(e),e}),e.$viewChangeListeners.unshift(t.bind(this,this.updateErrorState));var r=i.$mdUtil.getModelOption(e,"updateOn");r&&this.ngInputElement.on(r,t.bind(this.$element,this.$element.triggerHandler,r))},o.prototype.attachChangeListeners=function(){var e=this;e.$scope.$on("md-calendar-change",function(t,n){e.setModelValue(n),e.onExternalChange(n),e.closeCalendarPane()}),e.ngInputElement.on("input",t.bind(e,e.resizeInputElement));var n=t.isDefined(this.debounceInterval)?this.debounceInterval:l;e.ngInputElement.on("input",e.$mdUtil.debounce(e.handleInputEvent,n,e))},o.prototype.attachInteractionListeners=function(){var e=this,n=this.$scope,o=this.$mdConstant.KEY_CODE;e.ngInputElement.on("keydown",function(t){t.altKey&&t.keyCode==o.DOWN_ARROW&&(e.openCalendarPane(t),n.$digest())}),e.openOnFocus&&(e.ngInputElement.on("focus",t.bind(e,e.openCalendarPane)),t.element(e.$window).on("blur",e.windowBlurHandler),n.$on("$destroy",function(){t.element(e.$window).off("blur",e.windowBlurHandler)})),n.$on("md-calendar-close",function(){e.closeCalendarPane()})},o.prototype.installPropertyInterceptors=function(){var e=this;if(this.$attrs.ngDisabled){var t=this.$scope.$parent;t&&t.$watch(this.$attrs.ngDisabled,function(t){e.setDisabled(t)})}Object.defineProperty(this,"placeholder",{get:function(){return e.inputElement.placeholder},set:function(t){e.inputElement.placeholder=t||""}})},o.prototype.setDisabled=function(e){this.isDisabled=e,this.inputElement.disabled=e,this.calendarButton&&(this.calendarButton.disabled=e)},o.prototype.updateErrorState=function(e){var n=e||this.date;if(this.clearErrorState(),this.dateUtil.isValidDate(n)){if(n=this.dateUtil.createDateAtMidnight(n),this.dateUtil.isValidDate(this.minDate)){var o=this.dateUtil.createDateAtMidnight(this.minDate);this.ngModelCtrl.$setValidity("mindate",n>=o)}if(this.dateUtil.isValidDate(this.maxDate)){var i=this.dateUtil.createDateAtMidnight(this.maxDate);this.ngModelCtrl.$setValidity("maxdate",n<=i)}t.isFunction(this.dateFilter)&&this.ngModelCtrl.$setValidity("filtered",this.dateFilter(n))}else this.ngModelCtrl.$setValidity("valid",null==n);t.element(this.inputContainer).toggleClass(r,!this.ngModelCtrl.$valid)},o.prototype.clearErrorState=function(){this.inputContainer.classList.remove(r),["mindate","maxdate","filtered","valid"].forEach(function(e){this.ngModelCtrl.$setValidity(e,!0)},this)},o.prototype.resizeInputElement=function(){this.inputElement.size=this.inputElement.value.length+i},o.prototype.handleInputEvent=function(){var e=this.inputElement.value,t=e?this.locale.parseDate(e):null;this.dateUtil.setDateTimeToMidnight(t);var n=""==e||this.dateUtil.isValidDate(t)&&this.locale.isDateComplete(e)&&this.isDateEnabled(t);n&&(this.setModelValue(t),this.date=t),this.updateErrorState(t)},o.prototype.isDateEnabled=function(e){return this.dateUtil.isDateWithinRange(e,this.minDate,this.maxDate)&&(!t.isFunction(this.dateFilter)||this.dateFilter(e))},o.prototype.attachCalendarPane=function(){var e=this.calendarPane,n=document.body;e.style.transform="",this.$element.addClass(a),this.mdInputContainer&&this.mdInputContainer.element.addClass(a),t.element(n).addClass("md-datepicker-is-showing");var o=this.inputContainer.getBoundingClientRect(),i=n.getBoundingClientRect();(!this.topMargin||this.topMargin<0)&&(this.topMargin=(this.inputMask.parent().prop("clientHeight")-this.ngInputElement.prop("clientHeight"))/2);var r=o.top-i.top-this.topMargin,d=o.left-i.left-this.leftMargin,s=i.top<0&&0==document.body.scrollTop?-i.top:document.body.scrollTop,c=i.left<0&&0==document.body.scrollLeft?-i.left:document.body.scrollLeft,l=s+this.$window.innerHeight,p=c+this.$window.innerWidth;if(this.inputMask.css({position:"absolute",left:this.leftMargin+"px",top:this.topMargin+"px",width:o.width-1+"px",height:o.height-2+"px"}),d+u>p){if(p-u>0)d=p-u;else{d=c;var h=this.$window.innerWidth/u;e.style.transform="scale("+h+")"}e.classList.add("md-datepicker-pos-adjusted")}r+m>l&&l-m>s&&(r=l-m,e.classList.add("md-datepicker-pos-adjusted")),e.style.left=d+"px",e.style.top=r+"px",document.body.appendChild(e),this.$$rAF(function(){e.classList.add("md-pane-open")})},o.prototype.detachCalendarPane=function(){this.$element.removeClass(a),this.mdInputContainer&&this.mdInputContainer.element.removeClass(a),t.element(document.body).removeClass("md-datepicker-is-showing"),this.calendarPane.classList.remove("md-pane-open"),this.calendarPane.classList.remove("md-datepicker-pos-adjusted"),this.isCalendarOpen&&this.$mdUtil.enableScrolling(),this.calendarPane.parentNode&&this.calendarPane.parentNode.removeChild(this.calendarPane)},o.prototype.openCalendarPane=function(t){if(!this.isCalendarOpen&&!this.isDisabled&&!this.inputFocusedOnWindowBlur){this.isCalendarOpen=this.isOpen=!0,this.calendarPaneOpenedFrom=t.target,this.$mdUtil.disableScrollAround(this.calendarPane),this.attachCalendarPane(),this.focusCalendar(),this.evalAttr("ngFocus");var n=this;this.$mdUtil.nextTick(function(){n.documentElement.on("click touchstart",n.bodyClickHandler)},!1),e.addEventListener(this.windowEventName,this.windowEventHandler)}},o.prototype.closeCalendarPane=function(){function t(){n.isCalendarOpen=n.isOpen=!1}if(this.isCalendarOpen){var n=this;n.detachCalendarPane(),n.ngModelCtrl.$setTouched(),n.evalAttr("ngBlur"),n.documentElement.off("click touchstart",n.bodyClickHandler),e.removeEventListener(n.windowEventName,n.windowEventHandler),n.calendarPaneOpenedFrom.focus(),n.calendarPaneOpenedFrom=null,n.openOnFocus?n.$mdUtil.nextTick(t):t()}},o.prototype.getCalendarCtrl=function(){return t.element(this.calendarPane.querySelector("md-calendar")).controller("mdCalendar")},o.prototype.focusCalendar=function(){var e=this;this.$mdUtil.nextTick(function(){e.getCalendarCtrl().focus()},!1)},o.prototype.setFocused=function(e){e||this.ngModelCtrl.$setTouched(),this.openOnFocus||this.evalAttr(e?"ngFocus":"ngBlur"),this.isFocused=e},o.prototype.handleBodyClick=function(e){if(this.isCalendarOpen){var t=this.$mdUtil.getClosest(e.target,"md-calendar");t||this.closeCalendarPane(),this.$scope.$digest()}},o.prototype.handleWindowBlur=function(){this.inputFocusedOnWindowBlur=document.activeElement===this.inputElement},o.prototype.evalAttr=function(e){
this.$attrs[e]&&this.$scope.$parent.$eval(this.$attrs[e])},o.prototype.setModelValue=function(e){var t=this.$mdUtil.getModelOption(this.ngModelCtrl,"timezone");this.ngModelCtrl.$setViewValue(this.ngDateFilter(e,"yyyy-MM-dd",t))},o.prototype.onExternalChange=function(e){var t=this.$mdUtil.getModelOption(this.ngModelCtrl,"timezone");this.date=e,this.inputElement.value=this.locale.formatDate(e,t),this.mdInputContainer&&this.mdInputContainer.setHasValue(!!e),this.resizeInputElement(),this.updateErrorState()}}()}(),function(){function e(e,t,n,o){function i(o,i,r){function a(){r.mdSvgIcon||r.mdSvgSrc||(r.mdFontIcon&&i.addClass("md-font "+r.mdFontIcon),i.addClass(c))}function d(){if(!r.mdSvgIcon&&!r.mdSvgSrc){r.mdFontIcon&&(i.removeClass(s),i.addClass(r.mdFontIcon),s=r.mdFontIcon);var t=e.fontSet(r.mdFontSet);c!==t&&(i.removeClass(c),i.addClass(t),c=t)}}t(i);var s=r.mdFontIcon,c=e.fontSet(r.mdFontSet);a(),r.$observe("mdFontIcon",d),r.$observe("mdFontSet",d);var l=(i[0].getAttribute(r.$attr.mdSvgSrc),r.$normalize(r.$attr.mdSvgIcon||r.$attr.mdSvgSrc||""));if(r.role||(n.expect(i,"role","img"),r.role="img"),"img"===r.role&&!r.ariaHidden&&!n.hasAriaLabel(i)){var m;r.alt?n.expect(i,"aria-label",r.alt):n.parentHasAriaLabel(i,2)?n.expect(i,"aria-hidden","true"):(m=r.mdFontIcon||r.mdSvgIcon||i.text())?n.expect(i,"aria-label",m):n.expect(i,"aria-hidden","true")}l&&r.$observe(l,function(t){i.empty(),t&&e(t).then(function(e){i.empty(),i.append(e)})})}return{restrict:"E",link:i}}t.module("material.components.icon").directive("mdIcon",["$mdIcon","$mdTheming","$mdAria","$sce",e])}(),function(){function n(){}function o(e,t){this.url=e,this.viewBoxSize=t||r.defaultViewBoxSize}function i(n,o,i,r,a,d){function s(e){if(e=e||"",t.isString(e)||(e=d.getTrustedUrl(e)),E[e])return i.when(l(E[e]));if(C.test(e)||y.test(e))return h(e).then(m(e));e.indexOf(":")==-1&&(e="$default:"+e);var o=n[e]?u:p;return o(e).then(m(e))}function c(e){var o=t.isUndefined(e)||!(e&&e.length);if(o)return n.defaultFontSet;var i=e;return t.forEach(n.fontSets,function(t){t.alias==e&&(i=t.fontSet||i)}),i}function l(e){var n=e.clone(),o="_cache"+a.nextUid();return n.id&&(n.id+=o),t.forEach(n.querySelectorAll("[id]"),function(e){e.id+=o}),n}function m(e){return function(t){return E[e]=f(t)?t:new g(t,n[e]),E[e].clone()}}function u(e){var t=n[e];return h(t.url).then(function(e){return new g(e,t)})}function p(e){function t(t){var n=e.slice(e.lastIndexOf(":")+1),i=t.querySelector("#"+n);return i?new g(i,d):o(e)}function o(e){var t="icon "+e+" not found";return r.warn(t),i.reject(t||e)}var a=e.substring(0,e.lastIndexOf(":"))||"$default",d=n[a];return d?h(d.url).then(t):o(e)}function h(n){function a(n){var o=y.exec(n),r=/base64/i.test(n),a=r?e.atob(o[2]):o[2];return i.when(t.element(a)[0])}function d(e){return i(function(n,i){var a=function(e){var n=t.isString(e)?e:e.message||e.data||e.statusText;r.warn(n),i(e)},d=function(o){$[e]||($[e]=t.element("<div>").append(o)[0].querySelector("svg")),n($[e])};o(e,!0).then(d,a)})}return y.test(n)?a(n):d(n)}function f(e){return t.isDefined(e.element)&&t.isDefined(e.config)}function g(e,n){e&&"svg"!=e.tagName&&(e=t.element('<svg xmlns="http://www.w3.org/2000/svg">').append(e.cloneNode(!0))[0]),e.getAttribute("xmlns")||e.setAttribute("xmlns","http://www.w3.org/2000/svg"),this.element=e,this.config=n,this.prepare()}function b(){var e=this.config?this.config.viewBoxSize:n.defaultViewBoxSize;t.forEach({fit:"",height:"100%",width:"100%",preserveAspectRatio:"xMidYMid meet",viewBox:this.element.getAttribute("viewBox")||"0 0 "+e+" "+e,focusable:!1},function(e,t){this.element.setAttribute(t,e)},this)}function v(){return this.element.cloneNode(!0)}var E={},$={},C=/[-\w@:%\+.~#?&\/\/=]{2,}\.[a-z]{2,4}\b(\/[-\w@:%\+.~#?&\/\/=]*)?/i,y=/^data:image\/svg\+xml[\s*;\w\-\=]*?(base64)?,(.*)$/i;return g.prototype={clone:v,prepare:b},s.fontSet=c,s}i.$inject=["config","$templateRequest","$q","$log","$mdUtil","$sce"],t.module("material.components.icon").constant("$$mdSvgRegistry",{mdTabsArrow:"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyICIvPjwvZz48L3N2Zz4=",mdClose:"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik0xOSA2LjQxbC0xLjQxLTEuNDEtNS41OSA1LjU5LTUuNTktNS41OS0xLjQxIDEuNDEgNS41OSA1LjU5LTUuNTkgNS41OSAxLjQxIDEuNDEgNS41OS01LjU5IDUuNTkgNS41OSAxLjQxLTEuNDEtNS41OS01LjU5eiIvPjwvZz48L3N2Zz4=",mdCancel:"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik0xMiAyYy01LjUzIDAtMTAgNC40Ny0xMCAxMHM0LjQ3IDEwIDEwIDEwIDEwLTQuNDcgMTAtMTAtNC40Ny0xMC0xMC0xMHptNSAxMy41OWwtMS40MSAxLjQxLTMuNTktMy41OS0zLjU5IDMuNTktMS40MS0xLjQxIDMuNTktMy41OS0zLjU5LTMuNTkgMS40MS0xLjQxIDMuNTkgMy41OSAzLjU5LTMuNTkgMS40MSAxLjQxLTMuNTkgMy41OSAzLjU5IDMuNTl6Ii8+PC9nPjwvc3ZnPg==",mdMenu:"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0zLDZIMjFWOEgzVjZNMywxMUgyMVYxM0gzVjExTTMsMTZIMjFWMThIM1YxNloiIC8+PC9zdmc+",mdToggleArrow:"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiPjxwYXRoIGQ9Ik0yNCAxNmwtMTIgMTIgMi44MyAyLjgzIDkuMTctOS4xNyA5LjE3IDkuMTcgMi44My0yLjgzeiIvPjxwYXRoIGQ9Ik0wIDBoNDh2NDhoLTQ4eiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==",mdCalendar:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgM2gtMVYxaC0ydjJIOFYxSDZ2Mkg1Yy0xLjExIDAtMS45OS45LTEuOTkgMkwzIDE5YzAgMS4xLjg5IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY4aDE0djExek03IDEwaDV2NUg3eiIvPjwvc3ZnPg==",mdChecked:"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik05IDE2LjE3TDQuODMgMTJsLTEuNDIgMS40MUw5IDE5IDIxIDdsLTEuNDEtMS40MXoiLz48L2c+PC9zdmc+"}).provider("$mdIcon",n);var r={defaultViewBoxSize:24,defaultFontSet:"material-icons",fontSets:[]};n.prototype={icon:function(e,t,n){return e.indexOf(":")==-1&&(e="$default:"+e),r[e]=new o(t,n),this},iconSet:function(e,t,n){return r[e]=new o(t,n),this},defaultIconSet:function(e,t){var n="$default";return r[n]||(r[n]=new o(e,t)),r[n].viewBoxSize=t||r.defaultViewBoxSize,this},defaultViewBoxSize:function(e){return r.defaultViewBoxSize=e,this},fontSet:function(e,t){return r.fontSets.push({alias:e,fontSet:t||e}),this},defaultFontSet:function(e){return r.defaultFontSet=e?e:"",this},defaultIconSize:function(e){return r.defaultIconSize=e,this},$get:["$templateRequest","$q","$log","$mdUtil","$sce",function(e,t,n,o,a){return i(r,e,t,n,o,a)}]}}(),function(){function e(e,o,i,r,a,d,s,c,l){var m,u,p=a.prefixer(),h=this;this.nestLevel=parseInt(o.mdNestLevel,10)||0,this.init=function(n,o){o=o||{},m=n,u=i[0].querySelector(p.buildSelector(["ng-click","ng-mouseenter"])),u.setAttribute("aria-expanded","false"),this.isInMenuBar=o.isInMenuBar,this.nestedMenus=a.nodesToArray(m[0].querySelectorAll(".md-nested-menu")),m.on("$mdInterimElementRemove",function(){h.isOpen=!1,a.nextTick(function(){h.onIsOpenChanged(h.isOpen)})}),a.nextTick(function(){h.onIsOpenChanged(h.isOpen)});var d="menu_container_"+a.nextUid();m.attr("id",d),t.element(u).attr({"aria-owns":d,"aria-haspopup":"true"}),r.$on("$destroy",t.bind(this,function(){this.disableHoverListener(),e.destroy()})),m.on("$destroy",function(){e.destroy()})};var f,g,b=[];this.enableHoverListener=function(){b.push(s.$on("$mdMenuOpen",function(e,t){m[0].contains(t[0])&&(h.currentlyOpenMenu=t.controller("mdMenu"),h.isAlreadyOpening=!1,h.currentlyOpenMenu.registerContainerProxy(h.triggerContainerProxy.bind(h)))})),b.push(s.$on("$mdMenuClose",function(e,t){m[0].contains(t[0])&&(h.currentlyOpenMenu=n)})),g=t.element(a.nodesToArray(m[0].children[0].children)),g.on("mouseenter",h.handleMenuItemHover),g.on("mouseleave",h.handleMenuItemMouseLeave)},this.disableHoverListener=function(){for(;b.length;)b.shift()();g&&g.off("mouseenter",h.handleMenuItemHover),g&&g.off("mouseleave",h.handleMenuItemMouseLeave)},this.handleMenuItemHover=function(e){if(!h.isAlreadyOpening){var n=e.target.querySelector("md-menu")||a.getClosest(e.target,"MD-MENU");f=d(function(){if(n&&(n=t.element(n).controller("mdMenu")),h.currentlyOpenMenu&&h.currentlyOpenMenu!=n){var e=h.nestLevel+1;h.currentlyOpenMenu.close(!0,{closeTo:e}),h.isAlreadyOpening=!!n,n&&n.open()}else n&&!n.isOpen&&n.open&&(h.isAlreadyOpening=!!n,n&&n.open())},n?100:250);var o=e.currentTarget.querySelector(".md-button:not([disabled])");o&&o.focus()}},this.handleMenuItemMouseLeave=function(){f&&(d.cancel(f),f=n)},this.open=function(t){t&&t.stopPropagation(),t&&t.preventDefault(),h.isOpen||(h.enableHoverListener(),h.isOpen=!0,a.nextTick(function(){h.onIsOpenChanged(h.isOpen)}),u=u||(t?t.target:i[0]),u.setAttribute("aria-expanded","true"),r.$emit("$mdMenuOpen",i),e.show({scope:r,mdMenuCtrl:h,nestLevel:h.nestLevel,element:m,target:u,preserveElement:!0,parent:"body"})["finally"](function(){u.setAttribute("aria-expanded","false"),h.disableHoverListener()}))},this.onIsOpenChanged=function(e){e?(m.attr("aria-hidden","false"),i[0].classList.add("md-open"),t.forEach(h.nestedMenus,function(e){e.classList.remove("md-open")})):(m.attr("aria-hidden","true"),i[0].classList.remove("md-open")),r.$mdMenuIsOpen=h.isOpen},this.focusMenuContainer=function(){var e=m[0].querySelector(p.buildSelector(["md-menu-focus-target","md-autofocus"]));e||(e=m[0].querySelector(".md-button:not([disabled])")),e.focus()},this.registerContainerProxy=function(e){this.containerProxy=e},this.triggerContainerProxy=function(e){this.containerProxy&&this.containerProxy(e)},this.destroy=function(){return h.isOpen?e.destroy():c.when(!1)},this.close=function(n,o){if(h.isOpen){h.isOpen=!1,a.nextTick(function(){h.onIsOpenChanged(h.isOpen)});var d=t.extend({},o,{skipFocus:n});if(r.$emit("$mdMenuClose",i,d),e.hide(null,o),!n){var s=h.restoreFocusTo||i.find("button")[0];s instanceof t.element&&(s=s[0]),s&&s.focus()}}},this.positionMode=function(){var e=(o.mdPositionMode||"target").split(" ");return 1==e.length&&e.push(e[0]),{left:e[0],top:e[1]}},this.offsets=function(){var e=(o.mdOffset||"0 0").split(" ").map(parseFloat);if(2==e.length)return{left:e[0],top:e[1]};if(1==e.length)return{top:e[0],left:e[0]};throw Error("Invalid offsets specified. Please follow format <x, y> or <n>")},r.$mdMenu={open:this.open,close:this.close},r.$mdOpenMenu=t.bind(this,function(){return l.warn("mdMenu: The $mdOpenMenu method is deprecated. Please use `$mdMenu.open`."),this.open.apply(this,arguments)})}e.$inject=["$mdMenu","$attrs","$element","$scope","$mdUtil","$timeout","$rootScope","$q","$log"],t.module("material.components.menu").controller("mdMenuCtrl",e)}(),function(){function e(e){function n(n){n.addClass("md-menu");var r=n.children()[0],a=n.children()[1],d=e.prefixer();d.hasAttribute(r,"ng-click")||(r=r.querySelector(d.buildSelector(["ng-click","ng-mouseenter"]))||r);var s="MD-BUTTON"===r.nodeName||"BUTTON"===r.nodeName;if(r&&s&&!r.hasAttribute("type")&&r.setAttribute("type","button"),!r)throw Error(i+"Expected the menu to have a trigger element.");if(!a||"MD-MENU-CONTENT"!==a.nodeName)throw Error(i+"Expected the menu to contain a `md-menu-content` element.");r&&r.setAttribute("aria-haspopup","true");var c=n[0].querySelectorAll("md-menu"),l=parseInt(n[0].getAttribute("md-nest-level"),10)||0;return c&&t.forEach(e.nodesToArray(c),function(e){e.hasAttribute("md-position-mode")||e.setAttribute("md-position-mode","cascade"),e.classList.add("_md-nested-menu"),e.setAttribute("md-nest-level",l+1)}),o}function o(e,n,o,i){var r=i[0],a=!!i[1],d=t.element('<div class="_md md-open-menu-container md-whiteframe-z2"></div>'),s=n.children()[1];n.addClass("_md"),s.hasAttribute("role")||s.setAttribute("role","menu"),d.append(s),n.on("$destroy",function(){d.remove()}),n.append(d),d[0].style.display="none",r.init(d,{isInMenuBar:a})}var i="Invalid HTML for md-menu: ";return{restrict:"E",require:["mdMenu","?^mdMenuBar"],controller:"mdMenuCtrl",scope:!0,compile:n}}e.$inject=["$mdUtil"],t.module("material.components.menu").directive("mdMenu",e)}(),function(){function e(e){function o(e,o,a,d,s,c,l,m,u,p){function h(n,o,i){return i.nestLevel?t.noop:(i.disableParentScroll&&!e.getClosest(i.target,"MD-DIALOG")?i.restoreScroll=e.disableScrollAround(i.element,i.parent):i.disableParentScroll=!1,i.hasBackdrop&&(i.backdrop=e.createBackdrop(n,"md-menu-backdrop md-click-catcher"),u.enter(i.backdrop,d[0].body)),function(){i.backdrop&&i.backdrop.remove(),i.disableParentScroll&&i.restoreScroll()})}function f(e,t,n){function o(){return m(t,{addClass:"md-leave"}).start()}function i(){t.removeClass("md-active"),E(t,n),n.alreadyOpen=!1}return n.cleanupInteraction(),n.cleanupBackdrop(),n.cleanupResizing(),n.hideBackdrop(),t.removeClass("md-clickable"),n.$destroy===!0?i():o().then(i)}function g(n,i,r){function d(){return r.parent.append(i),i[0].style.display="",c(function(e){var t=$(i,r);i.removeClass("md-leave"),m(i,{addClass:"md-active",from:y.toCss(t),to:y.toCss({transform:""})}).start().then(e)})}function u(){if(!r.target)throw Error("$mdMenu.show() expected a target to animate from in options.target");t.extend(r,{alreadyOpen:!1,isRemoved:!1,target:t.element(r.target),parent:t.element(r.parent),menuContentEl:t.element(i[0].querySelector("md-menu-content"))})}function f(){var e=function(e,t){return l.throttle(function(){if(!r.isRemoved){var n=$(e,t);e.css(y.toCss(n))}})}(i,r);return s.addEventListener("resize",e),s.addEventListener("orientationchange",e),function(){s.removeEventListener("resize",e),s.removeEventListener("orientationchange",e)}}function g(){return r.backdrop?(r.backdrop.on("click",v),function(){r.backdrop.off("click",v)}):t.noop}function v(e){e.preventDefault(),e.stopPropagation(),n.$apply(function(){r.mdMenuCtrl.close(!0,{closeAll:!0})})}function E(){function o(t){var n;switch(t.keyCode){case a.KEY_CODE.ESCAPE:r.mdMenuCtrl.close(!1,{closeAll:!0}),n=!0;break;case a.KEY_CODE.UP_ARROW:b(t,r.menuContentEl,r,-1)||r.nestLevel||r.mdMenuCtrl.triggerContainerProxy(t),n=!0;break;case a.KEY_CODE.DOWN_ARROW:b(t,r.menuContentEl,r,1)||r.nestLevel||r.mdMenuCtrl.triggerContainerProxy(t),n=!0;break;case a.KEY_CODE.LEFT_ARROW:r.nestLevel?r.mdMenuCtrl.close():r.mdMenuCtrl.triggerContainerProxy(t),n=!0;break;case a.KEY_CODE.RIGHT_ARROW:var o=e.getClosest(t.target,"MD-MENU");o&&o!=r.parent[0]?t.target.click():r.mdMenuCtrl.triggerContainerProxy(t),n=!0}n&&(t.preventDefault(),t.stopImmediatePropagation())}function i(t){function o(){n.$apply(function(){r.mdMenuCtrl.close(!0,{closeAll:!0})})}function i(e,t){if(!e)return!1;for(var n,o=0;n=t[o];++o)if(C.hasAttribute(e,n))return!0;return!1}var a=t.target;do{if(a==r.menuContentEl[0])return;if((i(a,["ng-click","ng-href","ui-sref"])||"BUTTON"==a.nodeName||"MD-BUTTON"==a.nodeName)&&!i(a,["md-prevent-menu-close"])){var d=e.getClosest(a,"MD-MENU");a.hasAttribute("disabled")||d&&d!=r.parent[0]||o();break}}while(a=a.parentNode)}if(!r.menuContentEl[0])return t.noop;r.menuContentEl.on("keydown",o),r.menuContentEl[0].addEventListener("click",i,!0);var d=r.menuContentEl[0].querySelector(C.buildSelector(["md-menu-focus-target","md-autofocus"]));if(!d)for(var s=r.menuContentEl[0].children.length,c=0;c<s;c++){var l=r.menuContentEl[0].children[c];if(d=l.querySelector(".md-button:not([disabled])"))break;if(l.firstElementChild&&!l.firstElementChild.disabled){d=l.firstElementChild;break}}return d&&d.focus(),function(){r.menuContentEl.off("keydown",o),r.menuContentEl[0].removeEventListener("click",i,!0)}}return u(r),r.menuContentEl[0]?o.inherit(r.menuContentEl,r.target):p.warn("$mdMenu: Menu elements should always contain a `md-menu-content` element,otherwise interactivity features will not work properly.",i),r.cleanupResizing=f(),r.hideBackdrop=h(n,i,r),d().then(function(e){return r.alreadyOpen=!0,r.cleanupInteraction=E(),r.cleanupBackdrop=g(),i.addClass("md-clickable"),e})}function b(t,n,o,i){for(var r,a=e.getClosest(t.target,"MD-MENU-ITEM"),d=e.nodesToArray(n[0].children),s=d.indexOf(a),c=s+i;c>=0&&c<d.length;c+=i){var l=d[c].querySelector(".md-button");if(r=v(l))break}return r}function v(e){if(e&&e.getAttribute("tabindex")!=-1)return e.focus(),d[0].activeElement==e}function E(e,t){t.preserveElement?i(e).style.display="none":i(e).parentNode===i(t.parent)&&i(t.parent).removeChild(i(e))}function $(t,o){function i(e){e.top=Math.max(Math.min(e.top,v.bottom-l.offsetHeight),v.top),e.left=Math.max(Math.min(e.left,v.right-l.offsetWidth),v.left)}function a(){for(var e=0;e<m.children.length;++e)if("none"!=s.getComputedStyle(m.children[e]).display)return m.children[e]}var c,l=t[0],m=t[0].firstElementChild,u=m.getBoundingClientRect(),p=d[0].body,h=p.getBoundingClientRect(),f=s.getComputedStyle(m),g=o.target[0].querySelector(C.buildSelector("md-menu-origin"))||o.target[0],b=g.getBoundingClientRect(),v={left:h.left+r,top:Math.max(h.top,0)+r,bottom:Math.max(h.bottom,Math.max(h.top,0)+h.height)-r,right:h.right-r},E={top:0,left:0,right:0,bottom:0},$={top:0,left:0,right:0,bottom:0},y=o.mdMenuCtrl.positionMode();"target"!=y.top&&"target"!=y.left&&"target-right"!=y.left||(c=a(),c&&(c=c.firstElementChild||c,c=c.querySelector(C.buildSelector("md-menu-align-target"))||c,E=c.getBoundingClientRect(),$={top:parseFloat(l.style.top||0),left:parseFloat(l.style.left||0)}));var M={},T="top ";switch(y.top){case"target":M.top=$.top+b.top-E.top;break;case"cascade":M.top=b.top-parseFloat(f.paddingTop)-g.style.top;break;case"bottom":M.top=b.top+b.height;break;default:throw new Error('Invalid target mode "'+y.top+'" specified for md-menu on Y axis.')}var A="rtl"==e.bidi();switch(y.left){case"target":M.left=$.left+b.left-E.left,T+=A?"right":"left";break;case"target-left":M.left=b.left,T+="left";break;case"target-right":M.left=b.right-u.width+(u.right-E.right),T+="right";break;case"cascade":var w=A?b.left-u.width<v.left:b.right+u.width<v.right;M.left=w?b.right-g.style.left:b.left-g.style.left-u.width,T+=w?"left":"right";break;case"right":A?(M.left=b.right-b.width,T+="left"):(M.left=b.right-u.width,T+="right");break;case"left":A?(M.left=b.right-u.width,T+="right"):(M.left=b.left,T+="left");break;default:throw new Error('Invalid target mode "'+y.left+'" specified for md-menu on X axis.')}var k=o.mdMenuCtrl.offsets();M.top+=k.top,M.left+=k.left,i(M);var _=Math.round(100*Math.min(b.width/l.offsetWidth,1))/100,x=Math.round(100*Math.min(b.height/l.offsetHeight,1))/100;return{top:Math.round(M.top),left:Math.round(M.left),transform:o.alreadyOpen?n:e.supplant("scale({0},{1})",[_,x]),transformOrigin:T}}var C=e.prefixer(),y=e.dom.animator;return{parent:"body",onShow:g,onRemove:f,hasBackdrop:!0,disableParentScroll:!0,skipCompile:!0,preserveScope:!0,multiple:!0,themable:!0}}function i(e){return e instanceof t.element&&(e=e[0]),e}o.$inject=["$mdUtil","$mdTheming","$mdConstant","$document","$window","$q","$$rAF","$animateCss","$animate","$log"];var r=8;return e("$mdMenu").setDefaults({methods:["target"],options:o})}e.$inject=["$$interimElementProvider"],t.module("material.components.menu").provider("$mdMenu",e)}(),function(){function e(e,n,i,r,a,d,s,c){this.$element=i,this.$attrs=r,this.$mdConstant=a,this.$mdUtil=s,this.$document=d,this.$scope=e,this.$rootScope=n,this.$timeout=c;var l=this;t.forEach(o,function(e){l[e]=t.bind(l,l[e])})}e.$inject=["$scope","$rootScope","$element","$attrs","$mdConstant","$document","$mdUtil","$timeout"],t.module("material.components.menuBar").controller("MenuBarController",e);var o=["handleKeyDown","handleMenuHover","scheduleOpenHoveredMenu","cancelScheduledOpen"];e.prototype.init=function(){var e=this.$element,t=this.$mdUtil,o=this.$scope,i=this,r=[];e.on("keydown",this.handleKeyDown),this.parentToolbar=t.getClosest(e,"MD-TOOLBAR"),r.push(this.$rootScope.$on("$mdMenuOpen",function(t,n){i.getMenus().indexOf(n[0])!=-1&&(e[0].classList.add("md-open"),n[0].classList.add("md-open"),i.currentlyOpenMenu=n.controller("mdMenu"),i.currentlyOpenMenu.registerContainerProxy(i.handleKeyDown),i.enableOpenOnHover())})),r.push(this.$rootScope.$on("$mdMenuClose",function(o,r,a){var d=i.getMenus();if(d.indexOf(r[0])!=-1&&(e[0].classList.remove("md-open"),r[0].classList.remove("md-open")),e[0].contains(r[0])){for(var s=r[0];s&&d.indexOf(s)==-1;)s=t.getClosest(s,"MD-MENU",!0);s&&(a.skipFocus||s.querySelector("button:not([disabled])").focus(),i.currentlyOpenMenu=n,i.disableOpenOnHover(),i.setKeyboardMode(!0))}})),o.$on("$destroy",function(){for(i.disableOpenOnHover();r.length;)r.shift()()}),this.setKeyboardMode(!0)},e.prototype.setKeyboardMode=function(e){e?this.$element[0].classList.add("md-keyboard-mode"):this.$element[0].classList.remove("md-keyboard-mode")},e.prototype.enableOpenOnHover=function(){if(!this.openOnHoverEnabled){var e=this;e.openOnHoverEnabled=!0,e.parentToolbar&&(e.parentToolbar.classList.add("md-has-open-menu"),e.$mdUtil.nextTick(function(){t.element(e.parentToolbar).on("click",e.handleParentClick)},!1)),t.element(e.getMenus()).on("mouseenter",e.handleMenuHover)}},e.prototype.handleMenuHover=function(e){this.setKeyboardMode(!1),this.openOnHoverEnabled&&this.scheduleOpenHoveredMenu(e)},e.prototype.disableOpenOnHover=function(){this.openOnHoverEnabled&&(this.openOnHoverEnabled=!1,this.parentToolbar&&(this.parentToolbar.classList.remove("md-has-open-menu"),t.element(this.parentToolbar).off("click",this.handleParentClick)),t.element(this.getMenus()).off("mouseenter",this.handleMenuHover))},e.prototype.scheduleOpenHoveredMenu=function(e){var n=t.element(e.currentTarget),o=n.controller("mdMenu");this.setKeyboardMode(!1),this.scheduleOpenMenu(o)},e.prototype.scheduleOpenMenu=function(e){var t=this,o=this.$timeout;e!=t.currentlyOpenMenu&&(o.cancel(t.pendingMenuOpen),t.pendingMenuOpen=o(function(){t.pendingMenuOpen=n,t.currentlyOpenMenu&&t.currentlyOpenMenu.close(!0,{closeAll:!0}),e.open()},200,!1))},e.prototype.handleKeyDown=function(e){var n=this.$mdConstant.KEY_CODE,o=this.currentlyOpenMenu,i=o&&o.isOpen;this.setKeyboardMode(!0);var r,a,d;switch(e.keyCode){case n.DOWN_ARROW:o?o.focusMenuContainer():this.openFocusedMenu(),r=!0;break;case n.UP_ARROW:o&&o.close(),r=!0;break;case n.LEFT_ARROW:a=this.focusMenu(-1),i&&(d=t.element(a).controller("mdMenu"),this.scheduleOpenMenu(d)),r=!0;break;case n.RIGHT_ARROW:a=this.focusMenu(1),i&&(d=t.element(a).controller("mdMenu"),this.scheduleOpenMenu(d)),r=!0}r&&(e&&e.preventDefault&&e.preventDefault(),e&&e.stopImmediatePropagation&&e.stopImmediatePropagation())},e.prototype.focusMenu=function(e){var t=this.getMenus(),n=this.getFocusedMenuIndex();n==-1&&(n=this.getOpenMenuIndex());var o=!1;if(n==-1?(n=0,o=!0):(e<0&&n>0||e>0&&n<t.length-e)&&(n+=e,o=!0),o)return t[n].querySelector("button").focus(),t[n]},e.prototype.openFocusedMenu=function(){var e=this.getFocusedMenu();e&&t.element(e).controller("mdMenu").open()},e.prototype.getMenus=function(){var e=this.$element;return this.$mdUtil.nodesToArray(e[0].children).filter(function(e){return"MD-MENU"==e.nodeName})},e.prototype.getFocusedMenu=function(){return this.getMenus()[this.getFocusedMenuIndex()]},e.prototype.getFocusedMenuIndex=function(){var e=this.$mdUtil,t=e.getClosest(this.$document[0].activeElement,"MD-MENU");if(!t)return-1;var n=this.getMenus().indexOf(t);return n},e.prototype.getOpenMenuIndex=function(){for(var e=this.getMenus(),t=0;t<e.length;++t)if(e[t].classList.contains("md-open"))return t;return-1},e.prototype.handleParentClick=function(e){var n=this.querySelector("md-menu.md-open");n&&!n.contains(e.target)&&t.element(n).controller("mdMenu").close(!0,{closeAll:!0})}}(),function(){function e(e,n){return{restrict:"E",require:"mdMenuBar",controller:"MenuBarController",compile:function(o,i){return i.ariaRole||o[0].setAttribute("role","menubar"),t.forEach(o[0].children,function(n){if("MD-MENU"==n.nodeName){n.hasAttribute("md-position-mode")||(n.setAttribute("md-position-mode","left bottom"),n.querySelector("button, a, md-button").setAttribute("role","menuitem"));var o=e.nodesToArray(n.querySelectorAll("md-menu-content"));t.forEach(o,function(e){e.classList.add("md-menu-bar-menu"),e.classList.add("md-dense"),e.hasAttribute("width")||e.setAttribute("width",5)})}}),o.find("md-menu-item").addClass("md-in-menu-bar"),function(e,t,o,i){t.addClass("_md"),n(e,t),i.init()}}}}e.$inject=["$mdUtil","$mdTheming"],t.module("material.components.menuBar").directive("mdMenuBar",e)}(),function(){function e(){return{restrict:"E",compile:function(e,t){t.role||e[0].setAttribute("role","separator")}}}t.module("material.components.menuBar").directive("mdMenuDivider",e)}(),function(){function e(e,t,n){this.$element=t,this.$attrs=n,this.$scope=e}e.$inject=["$scope","$element","$attrs"],t.module("material.components.menuBar").controller("MenuItemController",e),e.prototype.init=function(e){var t=this.$element,n=this.$attrs;this.ngModel=e,"checkbox"!=n.type&&"radio"!=n.type||(this.mode=n.type,this.iconEl=t[0].children[0],this.buttonEl=t[0].children[1],e&&this.initClickListeners())},e.prototype.clearNgAria=function(){var e=this.$element[0],n=["role","tabindex","aria-invalid","aria-checked"];t.forEach(n,function(t){e.removeAttribute(t)})},e.prototype.initClickListeners=function(){function e(){if("radio"==d){var e=a.ngValue?r.$eval(a.ngValue):a.value;return i.$modelValue==e}return i.$modelValue}function n(e){e?c.off("click",l):c.on("click",l)}var o=this,i=this.ngModel,r=this.$scope,a=this.$attrs,d=(this.$element,this.mode);this.handleClick=t.bind(this,this.handleClick);var s=this.iconEl,c=t.element(this.buttonEl),l=this.handleClick;a.$observe("disabled",n),n(a.disabled),i.$render=function(){o.clearNgAria(),e()?(s.style.display="",c.attr("aria-checked","true")):(s.style.display="none",c.attr("aria-checked","false"))},r.$$postDigest(i.$render)},e.prototype.handleClick=function(e){var t,n=this.mode,o=this.ngModel,i=this.$attrs;"checkbox"==n?t=!o.$modelValue:"radio"==n&&(t=i.ngValue?this.$scope.$eval(i.ngValue):i.value),o.$setViewValue(t),o.$render()}}(),function(){function e(e,n,o){return{controller:"MenuItemController",require:["mdMenuItem","?ngModel"],priority:n.BEFORE_NG_ARIA,compile:function(n,i){function r(e,o,i){i=i||n,i instanceof t.element&&(i=i[0]),i.hasAttribute(e)||i.setAttribute(e,o)}function a(o){var i=e.prefixer(o);t.forEach(i,function(e){if(n[0].hasAttribute(e)){var t=n[0].getAttribute(e);l[0].setAttribute(e,t),n[0].removeAttribute(e)}})}var d=i.type,s="md-in-menu-bar";if("checkbox"!=d&&"radio"!=d||!n.hasClass(s))r("role","menuitem",n[0].querySelector("md-button, button, a"));else{var c=n[0].textContent,l=t.element('<md-button type="button"></md-button>'),m='<md-icon md-svg-src="'+o.mdChecked+'"></md-icon>';l.html(c),l.attr("tabindex","0"),n.html(""),n.append(t.element(m)),n.append(l),n.addClass("md-indent").removeClass(s),r("role","checkbox"==d?"menuitemcheckbox":"menuitemradio",l),a("ng-disabled")}return function(e,t,n,o){var i=o[0],r=o[1];i.init(r)}}}}e.$inject=["$mdUtil","$mdConstant","$$mdSvgRegistry"],t.module("material.components.menuBar").directive("mdMenuItem",e)}(),function(){function e(e,n,o,i,r,a){function d(a,d,E){function $(t,o,r,d,s,l){function h(e){_.attr("stroke-dashoffset",c(v,E,e,M)),_.attr("transform","rotate("+y+" "+v/2+" "+v/2+")")}var f=++D,g=i.now(),b=o-t,v=m(a.mdDiameter),E=u(v),$=r||n.easeFn,C=d||n.duration,y=-90*(s||0),M=l||100;o===t?h(o):T=p(function A(){var n=e.Math.max(0,e.Math.min(i.now()-g,C));h($(n,t,b,C)),f===D&&n<C&&(T=p(A))})}function C(){$(x,N,n.easeFnIndeterminate,n.durationIndeterminate,S,75),S=++S%4}function y(){A||(A=r(C,n.durationIndeterminate,0,!1),C(),d.addClass(v).removeAttr("aria-valuenow"))}function M(){A&&(r.cancel(A),A=null,d.removeClass(v))}var T,A,w=d[0],k=t.element(w.querySelector("svg")),_=t.element(w.querySelector("path")),x=n.startIndeterminate,N=n.endIndeterminate,S=0,D=0;o(d),d.toggleClass(b,E.hasOwnProperty("disabled")),a.mdMode===g&&y(),a.$on("$destroy",function(){M(),T&&h(T)}),a.$watchGroup(["value","mdMode",function(){var e=w.disabled;return e===!0||e===!1?e:t.isDefined(d.attr("disabled"))}],function(e,t){var n=e[1],o=e[2],i=t[2];if(o!==i&&d.toggleClass(b,!!o),o)M();else if(n!==f&&n!==g&&(n=g,E.$set("mdMode",n)),n===g)y();else{var r=l(e[0]);M(),d.attr("aria-valuenow",r),$(l(t[0]),r)}}),a.$watch("mdDiameter",function(t){var n=m(t),o=u(n),i=l(a.value),r=n/2+"px",p={width:n+"px",height:n+"px"};k[0].setAttribute("viewBox","0 0 "+n+" "+n),k.css(p).css("transform-origin",r+" "+r+" "+r),d.css(p),_.attr("stroke-width",o),_.attr("stroke-linecap","square"),a.mdMode==g?(_.attr("d",s(n,o,!0)),_.attr("stroke-dasharray",(n-o)*e.Math.PI*.75),_.attr("stroke-dashoffset",c(n,o,1,75))):(_.attr("d",s(n,o,!1)),_.attr("stroke-dasharray",(n-o)*e.Math.PI),_.attr("stroke-dashoffset",c(n,o,0,100)),$(i,i))})}function s(e,t,n){var o=e/2,i=t/2,r=o+","+i,a=i+","+o,d=o-i;return"M"+r+"A"+d+","+d+" 0 1 1 "+a+(n?"":"A"+d+","+d+" 0 0 1 "+r)}function c(t,n,o,i){return(t-n)*e.Math.PI*(3*(i||100)/100-o/100)}function l(t){return e.Math.max(0,e.Math.min(t||0,100))}function m(e){var t=n.progressSize;if(e){var o=parseFloat(e);return e.lastIndexOf("%")===e.length-1&&(o=o/100*t),o}return t}function u(e){return n.strokeWidth/100*e}var p=e.requestAnimationFrame||e.webkitRequestAnimationFrame||t.noop,h=e.cancelAnimationFrame||e.webkitCancelAnimationFrame||e.webkitCancelRequestAnimationFrame||t.noop,f="determinate",g="indeterminate",b="_md-progress-circular-disabled",v="md-mode-indeterminate";return{restrict:"E",scope:{value:"@",mdDiameter:"@",mdMode:"@"},template:'<svg xmlns="http://www.w3.org/2000/svg"><path fill="none"/></svg>',compile:function(e,n){if(e.attr({"aria-valuemin":0,"aria-valuemax":100,role:"progressbar"}),t.isUndefined(n.mdMode)){var o=n.hasOwnProperty("value")?f:g;n.$set("mdMode",o)}else n.$set("mdMode",n.mdMode.trim());return d}}}e.$inject=["$window","$mdProgressCircular","$mdTheming","$mdUtil","$interval","$log"],t.module("material.components.progressCircular").directive("mdProgressCircular",e)}(),function(){function e(){function e(e,t,n,o){return n*e/o+t}function n(e,t,n,o){var i=(e/=o)*e,r=i*e;return t+n*(6*r*i+-15*i*i+10*r)}var o={progressSize:50,strokeWidth:10,duration:100,easeFn:e,durationIndeterminate:1333,startIndeterminate:1,endIndeterminate:149,easeFnIndeterminate:n,easingPresets:{linearEase:e,materialEase:n}};return{configure:function(e){return o=t.extend(o,e||{})},$get:function(){return o}}}t.module("material.components.progressCircular").provider("$mdProgressCircular",e)}(),function(){function e(){function e(e,o,i,r){if(r){var a=r.getTabElementIndex(o),d=n(o,"md-tab-body").remove(),s=n(o,"md-tab-label").remove(),c=r.insertTab({scope:e,parent:e.$parent,index:a,element:o,template:d.html(),label:s.html()},a);e.select=e.select||t.noop,e.deselect=e.deselect||t.noop,e.$watch("active",function(e){e&&r.select(c.getIndex(),!0)}),e.$watch("disabled",function(){r.refreshIndex()}),e.$watch(function(){return r.getTabElementIndex(o)},function(e){c.index=e,r.updateTabOrder()}),e.$on("$destroy",function(){r.removeTab(c)})}}function n(e,n){for(var o=e[0].children,i=0,r=o.length;i<r;i++){var a=o[i];if(a.tagName===n.toUpperCase())return t.element(a)}return t.element()}return{require:"^?mdTabs",terminal:!0,compile:function(o,i){var r=n(o,"md-tab-label"),a=n(o,"md-tab-body");if(0===r.length&&(r=t.element("<md-tab-label></md-tab-label>"),i.label?r.text(i.label):r.append(o.contents()),0===a.length)){var d=o.contents().detach();a=t.element("<md-tab-body></md-tab-body>"),a.append(d)}return o.append(r),a.html()&&o.append(a),e},scope:{active:"=?mdActive",disabled:"=?ngDisabled",select:"&?mdOnSelect",deselect:"&?mdOnDeselect"}}}t.module("material.components.tabs").directive("mdTab",e)}(),function(){function e(){return{require:"^?mdTabs",link:function(e,t,n,o){o&&o.attachRipple(e,t)}}}t.module("material.components.tabs").directive("mdTabItem",e)}(),function(){function e(){return{terminal:!0}}t.module("material.components.tabs").directive("mdTabLabel",e)}(),function(){function e(e){return{restrict:"A",compile:function(t,n){
var o=e(n.mdTabScroll,null,!0);return function(e,t){t.on("mousewheel",function(t){e.$apply(function(){o(e,{$event:t})})})}}}}e.$inject=["$parse"],t.module("material.components.tabs").directive("mdTabScroll",e)}(),function(){function e(e,o,i,r,a,d,s,c,l,m,u){function p(){v("stretchTabs",C),G("focusIndex",k,ue.selectedIndex||0),G("offsetLeft",w,0),G("hasContent",A,!1),G("maxTabWidth",M,Z()),G("shouldPaginate",T,!1),E("noInkBar",L),E("dynamicHeight",R),E("noPagination"),E("swipeContent"),E("noDisconnect"),E("autoselect"),E("noSelectClick"),E("centerTabs",y,!1),E("enableDisconnect"),ue.scope=e,ue.parent=e.$parent,ue.tabs=[],ue.lastSelectedIndex=null,ue.hasFocus=!1,ue.styleTabItemFocus=!1,ue.shouldCenterTabs=V(),ue.tabContentPrefix="tab-content-",h()}function h(){ue.selectedIndex=ue.selectedIndex||0,f(),b(),g(),m(o),d.nextTick(function(){he=j(),ae(),ne(),de(),ue.tabs[ue.selectedIndex]&&ue.tabs[ue.selectedIndex].scope.select(),be=!0,X()})}function f(){var e=c.$mdTabsTemplate,n=t.element(o[0].querySelector("md-tab-data"));n.html(e),l(n.contents())(ue.parent),delete c.$mdTabsTemplate}function g(){t.element(i).on("resize",P),e.$on("$destroy",$)}function b(){e.$watch("$mdTabsCtrl.selectedIndex",_)}function v(e,t){var n=c.$normalize("md-"+e);t&&G(e,t),c.$observe(n,function(t){ue[e]=t})}function E(e,t){function n(t){ue[e]="false"!==t}var o=c.$normalize("md-"+e);t&&G(e,t),c.hasOwnProperty(o)&&n(c[o]),c.$observe(o,n)}function $(){ge=!0,t.element(i).off("resize",P)}function C(e){var n=j();t.element(n.wrapper).toggleClass("md-stretch-tabs",W()),de()}function y(e){ue.shouldCenterTabs=V()}function M(e,n){if(e!==n){var o=j();t.forEach(o.tabs,function(t){t.style.maxWidth=e+"px"}),d.nextTick(ue.updateInkBarStyles)}}function T(e,t){e!==t&&(ue.maxTabWidth=Z(),ue.shouldCenterTabs=V(),d.nextTick(function(){ue.maxTabWidth=Z(),ne(ue.selectedIndex)}))}function A(e){o[e?"removeClass":"addClass"]("md-no-tab-content")}function w(n){var o=j(),i=ue.shouldCenterTabs?"":"-"+n+"px";t.element(o.paging).css(r.CSS.TRANSFORM,"translate3d("+i+", 0, 0)"),e.$broadcast("$mdTabsPaginationChanged")}function k(e,t){e!==t&&j().tabs[e]&&(ne(),te())}function _(t,n){t!==n&&(ue.selectedIndex=K(t),ue.lastSelectedIndex=n,ue.updateInkBarStyles(),ae(),ne(t),e.$broadcast("$mdTabsChanged"),ue.tabs[n]&&ue.tabs[n].scope.deselect(),ue.tabs[t]&&ue.tabs[t].scope.select())}function x(e){var t=o[0].getElementsByTagName("md-tab");return Array.prototype.indexOf.call(t,e[0])}function N(){N.watcher||(N.watcher=e.$watch(function(){d.nextTick(function(){N.watcher&&o.prop("offsetParent")&&(N.watcher(),N.watcher=null,P())},!1)}))}function S(e){switch(e.keyCode){case r.KEY_CODE.LEFT_ARROW:e.preventDefault(),ee(-1,!0);break;case r.KEY_CODE.RIGHT_ARROW:e.preventDefault(),ee(1,!0);break;case r.KEY_CODE.SPACE:case r.KEY_CODE.ENTER:e.preventDefault(),pe||D(ue.focusIndex)}}function D(e,t){pe||(ue.focusIndex=ue.selectedIndex=e),t&&ue.noSelectClick||d.nextTick(function(){ue.tabs[e].element.triggerHandler("click")},!1)}function I(e){ue.shouldPaginate&&(e.preventDefault(),ue.offsetLeft=ce(ue.offsetLeft-e.wheelDelta))}function H(){var e,t,n=j(),o=n.canvas.clientWidth,i=o+ue.offsetLeft;for(e=0;e<n.tabs.length&&(t=n.tabs[e],!(t.offsetLeft+t.offsetWidth>i));e++);o>t.offsetWidth?ue.offsetLeft=ce(t.offsetLeft):ue.offsetLeft=ce(t.offsetLeft+(t.offsetWidth-o+1))}function O(){var e,t,n=j();for(e=0;e<n.tabs.length&&(t=n.tabs[e],!(t.offsetLeft+t.offsetWidth>=ue.offsetLeft));e++);n.canvas.clientWidth>t.offsetWidth?ue.offsetLeft=ce(t.offsetLeft+t.offsetWidth-n.canvas.clientWidth):ue.offsetLeft=ce(t.offsetLeft)}function P(){ue.lastSelectedIndex=ue.selectedIndex,ue.offsetLeft=ce(ue.offsetLeft),d.nextTick(function(){ue.updateInkBarStyles(),X()})}function L(e){t.element(j().inkBar).toggleClass("ng-hide",e)}function R(e){o.toggleClass("md-dynamic-height",e)}function F(e){if(!ge){var t=ue.selectedIndex,n=ue.tabs.splice(e.getIndex(),1)[0];re(),ue.selectedIndex===t&&(n.scope.deselect(),ue.tabs[ue.selectedIndex]&&ue.tabs[ue.selectedIndex].scope.select()),d.nextTick(function(){X(),ue.offsetLeft=ce(ue.offsetLeft)})}}function B(e,n){var o=be,i={getIndex:function(){return ue.tabs.indexOf(r)},isActive:function(){return this.getIndex()===ue.selectedIndex},isLeft:function(){return this.getIndex()<ue.selectedIndex},isRight:function(){return this.getIndex()>ue.selectedIndex},shouldRender:function(){return!ue.noDisconnect||this.isActive()},hasFocus:function(){return ue.styleTabItemFocus&&ue.hasFocus&&this.getIndex()===ue.focusIndex},id:d.nextUid(),hasContent:!(!e.template||!e.template.trim())},r=t.extend(i,e);return t.isDefined(n)?ue.tabs.splice(n,0,r):ue.tabs.push(r),oe(),ie(),d.nextTick(function(){X(),me(r),o&&ue.autoselect&&d.nextTick(function(){d.nextTick(function(){D(ue.tabs.indexOf(r))})})}),r}function j(){var e={},t=o[0];return e.wrapper=t.querySelector("md-tabs-wrapper"),e.canvas=e.wrapper.querySelector("md-tabs-canvas"),e.paging=e.canvas.querySelector("md-pagination-wrapper"),e.inkBar=e.paging.querySelector("md-ink-bar"),e.contents=t.querySelectorAll("md-tabs-content-wrapper > md-tab-content"),e.tabs=e.paging.querySelectorAll("md-tab-item"),e.dummies=e.canvas.querySelectorAll("md-dummy-tab"),e}function U(){return ue.offsetLeft>0}function q(){var e=j(),t=e.tabs[e.tabs.length-1];return t&&t.offsetLeft+t.offsetWidth>e.canvas.clientWidth+ue.offsetLeft}function z(){var e=ue.tabs[ue.focusIndex];return e&&e.id?"tab-item-"+e.id:null}function W(){switch(ue.stretchTabs){case"always":return!0;case"never":return!1;default:return!ue.shouldPaginate&&i.matchMedia("(max-width: 600px)").matches}}function V(){return ue.centerTabs&&!ue.shouldPaginate}function Y(){if(ue.noPagination||!be)return!1;var e=o.prop("clientWidth");return t.forEach(j().dummies,function(t){e-=t.offsetWidth}),e<0}function K(e){if(e===-1)return-1;var t,n,o=Math.max(ue.tabs.length-e,e);for(t=0;t<=o;t++){if(n=ue.tabs[e+t],n&&n.scope.disabled!==!0)return n.getIndex();if(n=ue.tabs[e-t],n&&n.scope.disabled!==!0)return n.getIndex()}return e}function G(e,t,n){Object.defineProperty(ue,e,{get:function(){return n},set:function(e){var o=n;n=e,t&&t(e,o)}})}function X(){ue.maxTabWidth=Z(),ue.shouldPaginate=Y()}function Q(e){var n=0;return t.forEach(e,function(e){n+=Math.max(e.offsetWidth,e.getBoundingClientRect().width)}),Math.ceil(n)}function Z(){return o.prop("clientWidth")}function J(){var e=ue.tabs[ue.selectedIndex],t=ue.tabs[ue.focusIndex];ue.tabs=ue.tabs.sort(function(e,t){return e.index-t.index}),ue.selectedIndex=ue.tabs.indexOf(e),ue.focusIndex=ue.tabs.indexOf(t)}function ee(e,t){var n,o=t?"focusIndex":"selectedIndex",i=ue[o];for(n=i+e;ue.tabs[n]&&ue.tabs[n].scope.disabled;n+=e);ue.tabs[n]&&(ue[o]=n)}function te(){ue.styleTabItemFocus="keyboard"===u.getLastInteractionType(),j().dummies[ue.focusIndex].focus()}function ne(e){var n=j();if(t.isNumber(e)||(e=ue.focusIndex),n.tabs[e]&&!ue.shouldCenterTabs){var o=n.tabs[e],i=o.offsetLeft,r=o.offsetWidth+i;ue.offsetLeft=Math.max(ue.offsetLeft,ce(r-n.canvas.clientWidth+64)),ue.offsetLeft=Math.min(ue.offsetLeft,ce(i))}}function oe(){fe.forEach(function(e){d.nextTick(e)}),fe=[]}function ie(){for(var e=!1,t=0;t<ue.tabs.length;t++)if(ue.tabs[t].hasContent){e=!0;break}ue.hasContent=e}function re(){ue.selectedIndex=K(ue.selectedIndex),ue.focusIndex=K(ue.focusIndex)}function ae(){if(!ue.dynamicHeight)return o.css("height","");if(!ue.tabs.length)return fe.push(ae);var e=j(),t=e.contents[ue.selectedIndex],i=t?t.offsetHeight:0,r=e.wrapper.offsetHeight,a=i+r,c=o.prop("clientHeight");if(c!==a){"bottom"===o.attr("md-align-tabs")&&(c-=r,a-=r,o.attr("md-border-bottom")!==n&&++c),pe=!0;var l={height:c+"px"},m={height:a+"px"};o.css(l),s(o,{from:l,to:m,easing:"cubic-bezier(0.35, 0, 0.25, 1)",duration:.5}).start().done(function(){o.css({transition:"none",height:""}),d.nextTick(function(){o.css("transition","")}),pe=!1})}}function de(){var e=j();if(!e.tabs[ue.selectedIndex])return void t.element(e.inkBar).css({left:"auto",right:"auto"});if(!ue.tabs.length)return fe.push(ue.updateInkBarStyles);if(!o.prop("offsetParent"))return N();var n=ue.selectedIndex,i=e.paging.offsetWidth,r=e.tabs[n],a=r.offsetLeft,s=i-a-r.offsetWidth;if(ue.shouldCenterTabs){var c=Q(e.tabs);i>c&&d.nextTick(de,!1)}se(),t.element(e.inkBar).css({left:a+"px",right:s+"px"})}function se(){var e=j(),n=ue.selectedIndex,o=ue.lastSelectedIndex,i=t.element(e.inkBar);t.isNumber(o)&&i.toggleClass("md-left",n<o).toggleClass("md-right",n>o)}function ce(e){var t=j();if(!t.tabs.length||!ue.shouldPaginate)return 0;var n=t.tabs[t.tabs.length-1],o=n.offsetLeft+n.offsetWidth;return e=Math.max(0,e),e=Math.min(o-t.canvas.clientWidth,e)}function le(e,n){var o=j(),i={colorElement:t.element(o.inkBar)};a.attach(e,n,i)}function me(e){if(e.hasContent){var n=o[0].querySelectorAll('[md-tab-id="'+e.id+'"]');t.element(n).attr("aria-controls",ue.tabContentPrefix+e.id)}}var ue=this,pe=!1,he=j(),fe=[],ge=!1,be=!1;ue.$onInit=p,ue.updatePagination=d.debounce(X,100),ue.redirectFocus=te,ue.attachRipple=le,ue.insertTab=B,ue.removeTab=F,ue.select=D,ue.scroll=I,ue.nextPage=H,ue.previousPage=O,ue.keydown=S,ue.canPageForward=q,ue.canPageBack=U,ue.refreshIndex=re,ue.incrementIndex=ee,ue.getTabElementIndex=x,ue.updateInkBarStyles=d.debounce(de,100),ue.updateTabOrder=d.debounce(J,100),ue.getFocusedTabId=z,1===t.version.major&&t.version.minor<=4&&this.$onInit()}e.$inject=["$scope","$element","$window","$mdConstant","$mdTabInkRipple","$mdUtil","$animateCss","$attrs","$compile","$mdTheming","$mdInteraction"],t.module("material.components.tabs").controller("MdTabsController",e)}(),function(){function e(e){return{scope:{selectedIndex:"=?mdSelected"},template:function(t,n){return n.$mdTabsTemplate=t.html(),'<md-tabs-wrapper> <md-tab-data></md-tab-data> <md-prev-button tabindex="-1" role="button" aria-label="Previous Page" aria-disabled="{{!$mdTabsCtrl.canPageBack()}}" ng-class="{ \'md-disabled\': !$mdTabsCtrl.canPageBack() }" ng-if="$mdTabsCtrl.shouldPaginate" ng-click="$mdTabsCtrl.previousPage()"> <md-icon md-svg-src="'+e.mdTabsArrow+'"></md-icon> </md-prev-button> <md-next-button tabindex="-1" role="button" aria-label="Next Page" aria-disabled="{{!$mdTabsCtrl.canPageForward()}}" ng-class="{ \'md-disabled\': !$mdTabsCtrl.canPageForward() }" ng-if="$mdTabsCtrl.shouldPaginate" ng-click="$mdTabsCtrl.nextPage()"> <md-icon md-svg-src="'+e.mdTabsArrow+'"></md-icon> </md-next-button> <md-tabs-canvas tabindex="{{ $mdTabsCtrl.hasFocus ? -1 : 0 }}" aria-activedescendant="{{$mdTabsCtrl.getFocusedTabId()}}" ng-focus="$mdTabsCtrl.redirectFocus()" ng-class="{ \'md-paginated\': $mdTabsCtrl.shouldPaginate, \'md-center-tabs\': $mdTabsCtrl.shouldCenterTabs }" ng-keydown="$mdTabsCtrl.keydown($event)" role="tablist"> <md-pagination-wrapper ng-class="{ \'md-center-tabs\': $mdTabsCtrl.shouldCenterTabs }" md-tab-scroll="$mdTabsCtrl.scroll($event)"> <md-tab-item tabindex="-1" class="md-tab" ng-repeat="tab in $mdTabsCtrl.tabs" role="tab" md-tab-id="{{::tab.id}}"aria-selected="{{tab.isActive()}}" aria-disabled="{{tab.scope.disabled || \'false\'}}" ng-click="$mdTabsCtrl.select(tab.getIndex())" ng-class="{ \'md-active\':    tab.isActive(), \'md-focused\':   tab.hasFocus(), \'md-disabled\':  tab.scope.disabled }" ng-disabled="tab.scope.disabled" md-swipe-left="$mdTabsCtrl.nextPage()" md-swipe-touch-action="pan-y" md-swipe-right="$mdTabsCtrl.previousPage()" md-tabs-template="::tab.label" md-scope="::tab.parent"></md-tab-item> <md-ink-bar></md-ink-bar> </md-pagination-wrapper> <md-tabs-dummy-wrapper class="md-visually-hidden md-dummy-wrapper"> <md-dummy-tab class="md-tab" tabindex="-1" id="tab-item-{{::tab.id}}" md-tab-id="{{::tab.id}}"aria-selected="{{tab.isActive()}}" aria-disabled="{{tab.scope.disabled || \'false\'}}" ng-focus="$mdTabsCtrl.hasFocus = true" ng-blur="$mdTabsCtrl.hasFocus = false" ng-repeat="tab in $mdTabsCtrl.tabs" md-tabs-template="::tab.label" md-scope="::tab.parent"></md-dummy-tab> </md-tabs-dummy-wrapper> </md-tabs-canvas> </md-tabs-wrapper> <md-tabs-content-wrapper ng-show="$mdTabsCtrl.hasContent && $mdTabsCtrl.selectedIndex >= 0" class="_md"> <md-tab-content id="{{:: $mdTabsCtrl.tabContentPrefix + tab.id}}" class="_md" role="tabpanel" aria-labelledby="tab-item-{{::tab.id}}" md-swipe-left="$mdTabsCtrl.swipeContent && $mdTabsCtrl.incrementIndex(1)" md-swipe-right="$mdTabsCtrl.swipeContent && $mdTabsCtrl.incrementIndex(-1)" md-swipe-touch-action="pan-y" ng-if="tab.hasContent" ng-repeat="(index, tab) in $mdTabsCtrl.tabs" ng-class="{ \'md-no-transition\': $mdTabsCtrl.lastSelectedIndex == null, \'md-active\':        tab.isActive(), \'md-left\':          tab.isLeft(), \'md-right\':         tab.isRight(), \'md-no-scroll\':     $mdTabsCtrl.dynamicHeight }"> <div md-tabs-template="::tab.template" md-connected-if="tab.isActive()" md-scope="::tab.parent" ng-if="$mdTabsCtrl.enableDisconnect || tab.shouldRender()"></div> </md-tab-content> </md-tabs-content-wrapper>'},controller:"MdTabsController",controllerAs:"$mdTabsCtrl",bindToController:!0}}e.$inject=["$$mdSvgRegistry"],t.module("material.components.tabs").directive("mdTabs",e)}(),function(){function e(e,t){return{require:"^?mdTabs",link:function(n,o,i,r){if(r){var a,d,s=function(){r.updatePagination(),r.updateInkBarStyles()};if("MutationObserver"in t){var c={childList:!0,subtree:!0,characterData:!0};a=new MutationObserver(s),a.observe(o[0],c),d=a.disconnect.bind(a)}else{var l=e.debounce(s,15,null,!1);o.on("DOMSubtreeModified",l),d=o.off.bind(o,"DOMSubtreeModified",l)}n.$on("$destroy",function(){d()})}}}}e.$inject=["$mdUtil","$window"],t.module("material.components.tabs").directive("mdTabsDummyWrapper",e)}(),function(){function e(e,t){function n(n,o,i,r){function a(){n.$watch("connected",function(e){e===!1?d():s()}),n.$on("$destroy",s)}function d(){r.enableDisconnect&&t.disconnectScope(c)}function s(){r.enableDisconnect&&t.reconnectScope(c)}if(r){var c=r.enableDisconnect?n.compileScope.$new():n.compileScope;return o.html(n.template),e(o.contents())(c),t.nextTick(a)}}return{restrict:"A",link:n,scope:{template:"=mdTabsTemplate",connected:"=?mdConnectedIf",compileScope:"=mdScope"},require:"^?mdTabs"}}e.$inject=["$compile","$mdUtil"],t.module("material.components.tabs").directive("mdTabsTemplate",e)}(),function(){t.module("material.core").constant("$MD_THEME_CSS",'md-autocomplete.md-THEME_NAME-theme{background:"{{background-A100}}"}md-autocomplete.md-THEME_NAME-theme[disabled]:not([md-floating-label]){background:"{{background-100}}"}md-autocomplete.md-THEME_NAME-theme button md-icon path{fill:"{{background-600}}"}md-autocomplete.md-THEME_NAME-theme button:after{background:"{{background-600-0.3}}"}.md-autocomplete-suggestions-container.md-THEME_NAME-theme{background:"{{background-A100}}"}.md-autocomplete-suggestions-container.md-THEME_NAME-theme li{color:"{{background-900}}"}.md-autocomplete-suggestions-container.md-THEME_NAME-theme li .highlight{color:"{{background-600}}"}.md-autocomplete-suggestions-container.md-THEME_NAME-theme li.selected,.md-autocomplete-suggestions-container.md-THEME_NAME-theme li:hover{background:"{{background-200}}"}md-backdrop{background-color:"{{background-900-0.0}}"}md-backdrop.md-opaque.md-THEME_NAME-theme{background-color:"{{background-900-1.0}}"}md-bottom-sheet.md-THEME_NAME-theme{background-color:"{{background-50}}";border-top-color:"{{background-300}}"}md-bottom-sheet.md-THEME_NAME-theme.md-list md-list-item{color:"{{foreground-1}}"}md-bottom-sheet.md-THEME_NAME-theme .md-subheader{background-color:"{{background-50}}";color:"{{foreground-1}}"}.md-button.md-THEME_NAME-theme:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme:not([disabled]):hover{background-color:"{{background-500-0.2}}"}.md-button.md-THEME_NAME-theme:not([disabled]).md-icon-button:hover{background-color:transparent}.md-button.md-THEME_NAME-theme.md-fab md-icon{color:"{{accent-contrast}}"}.md-button.md-THEME_NAME-theme.md-primary{color:"{{primary-color}}"}.md-button.md-THEME_NAME-theme.md-primary.md-fab,.md-button.md-THEME_NAME-theme.md-primary.md-raised{color:"{{primary-contrast}}";background-color:"{{primary-color}}"}.md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]) md-icon,.md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]) md-icon{color:"{{primary-contrast}}"}.md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]):hover,.md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]):hover{background-color:"{{primary-600}}"}.md-button.md-THEME_NAME-theme.md-primary:not([disabled]) md-icon{color:"{{primary-color}}"}.md-button.md-THEME_NAME-theme.md-fab{background-color:"{{accent-color}}";color:"{{accent-contrast}}"}.md-button.md-THEME_NAME-theme.md-fab:not([disabled]) .md-icon{color:"{{accent-contrast}}"}.md-button.md-THEME_NAME-theme.md-fab:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-fab:not([disabled]):hover{background-color:"{{accent-A700}}"}.md-button.md-THEME_NAME-theme.md-raised{color:"{{background-900}}";background-color:"{{background-50}}"}.md-button.md-THEME_NAME-theme.md-raised:not([disabled]) md-icon{color:"{{background-900}}"}.md-button.md-THEME_NAME-theme.md-raised:not([disabled]):hover{background-color:"{{background-50}}"}.md-button.md-THEME_NAME-theme.md-raised:not([disabled]).md-focused{background-color:"{{background-200}}"}.md-button.md-THEME_NAME-theme.md-warn{color:"{{warn-color}}"}.md-button.md-THEME_NAME-theme.md-warn.md-fab,.md-button.md-THEME_NAME-theme.md-warn.md-raised{color:"{{warn-contrast}}";background-color:"{{warn-color}}"}.md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]) md-icon,.md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]) md-icon{color:"{{warn-contrast}}"}.md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]):hover,.md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]):hover{background-color:"{{warn-600}}"}.md-button.md-THEME_NAME-theme.md-warn:not([disabled]) md-icon{color:"{{warn-color}}"}.md-button.md-THEME_NAME-theme.md-accent{color:"{{accent-color}}"}.md-button.md-THEME_NAME-theme.md-accent.md-fab,.md-button.md-THEME_NAME-theme.md-accent.md-raised{color:"{{accent-contrast}}";background-color:"{{accent-color}}"}.md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]) md-icon,.md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]) md-icon{color:"{{accent-contrast}}"}.md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]):hover,.md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]):hover{background-color:"{{accent-A700}}"}.md-button.md-THEME_NAME-theme.md-accent:not([disabled]) md-icon{color:"{{accent-color}}"}.md-button.md-THEME_NAME-theme.md-accent[disabled],.md-button.md-THEME_NAME-theme.md-fab[disabled],.md-button.md-THEME_NAME-theme.md-raised[disabled],.md-button.md-THEME_NAME-theme.md-warn[disabled],.md-button.md-THEME_NAME-theme[disabled]{color:"{{foreground-3}}";cursor:default}.md-button.md-THEME_NAME-theme.md-accent[disabled] md-icon,.md-button.md-THEME_NAME-theme.md-fab[disabled] md-icon,.md-button.md-THEME_NAME-theme.md-raised[disabled] md-icon,.md-button.md-THEME_NAME-theme.md-warn[disabled] md-icon,.md-button.md-THEME_NAME-theme[disabled] md-icon{color:"{{foreground-3}}"}.md-button.md-THEME_NAME-theme.md-fab[disabled],.md-button.md-THEME_NAME-theme.md-raised[disabled]{background-color:"{{foreground-4}}"}.md-button.md-THEME_NAME-theme[disabled]{background-color:transparent}._md a.md-THEME_NAME-theme:not(.md-button).md-primary{color:"{{primary-color}}"}._md a.md-THEME_NAME-theme:not(.md-button).md-primary:hover{color:"{{primary-700}}"}._md a.md-THEME_NAME-theme:not(.md-button).md-accent{color:"{{accent-color}}"}._md a.md-THEME_NAME-theme:not(.md-button).md-accent:hover{color:"{{accent-A700}}"}._md a.md-THEME_NAME-theme:not(.md-button).md-warn{color:"{{warn-color}}"}._md a.md-THEME_NAME-theme:not(.md-button).md-warn:hover{color:"{{warn-700}}"}md-card.md-THEME_NAME-theme{color:"{{foreground-1}}";background-color:"{{background-hue-1}}";border-radius:2px}md-card.md-THEME_NAME-theme .md-card-image{border-radius:2px 2px 0 0}md-card.md-THEME_NAME-theme md-card-header md-card-avatar md-icon{color:"{{background-color}}";background-color:"{{foreground-3}}"}md-card.md-THEME_NAME-theme md-card-header md-card-header-text .md-subhead,md-card.md-THEME_NAME-theme md-card-title md-card-title-text:not(:only-child) .md-subhead{color:"{{foreground-2}}"}md-checkbox.md-THEME_NAME-theme .md-ripple{color:"{{accent-A700}}"}md-checkbox.md-THEME_NAME-theme.md-checked .md-ripple{color:"{{background-600}}"}md-checkbox.md-THEME_NAME-theme.md-checked.md-focused .md-container:before{background-color:"{{accent-color-0.26}}"}md-checkbox.md-THEME_NAME-theme .md-ink-ripple{color:"{{foreground-2}}"}md-checkbox.md-THEME_NAME-theme.md-checked .md-ink-ripple{color:"{{accent-color-0.87}}"}md-checkbox.md-THEME_NAME-theme:not(.md-checked) .md-icon{border-color:"{{foreground-2}}"}md-checkbox.md-THEME_NAME-theme.md-checked .md-icon{background-color:"{{accent-color-0.87}}"}md-checkbox.md-THEME_NAME-theme.md-checked .md-icon:after{border-color:"{{accent-contrast-0.87}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-ripple{color:"{{primary-600}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ripple{color:"{{background-600}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-ink-ripple{color:"{{foreground-2}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ink-ripple{color:"{{primary-color-0.87}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary:not(.md-checked) .md-icon{border-color:"{{foreground-2}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-icon{background-color:"{{primary-color-0.87}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked.md-focused .md-container:before{background-color:"{{primary-color-0.26}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-icon:after{border-color:"{{primary-contrast-0.87}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-indeterminate[disabled] .md-container{color:"{{foreground-3}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn .md-ripple{color:"{{warn-600}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn .md-ink-ripple{color:"{{foreground-2}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple{color:"{{warn-color-0.87}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn:not(.md-checked) .md-icon{border-color:"{{foreground-2}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-icon{background-color:"{{warn-color-0.87}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked.md-focused:not([disabled]) .md-container:before{background-color:"{{warn-color-0.26}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-icon:after{border-color:"{{background-200}}"}md-checkbox.md-THEME_NAME-theme[disabled]:not(.md-checked) .md-icon{border-color:"{{foreground-3}}"}md-checkbox.md-THEME_NAME-theme[disabled].md-checked .md-icon{background-color:"{{foreground-3}}"}md-checkbox.md-THEME_NAME-theme[disabled].md-checked .md-icon:after{border-color:"{{background-200}}"}md-checkbox.md-THEME_NAME-theme[disabled] .md-icon:after{border-color:"{{foreground-3}}"}md-checkbox.md-THEME_NAME-theme[disabled] .md-label{color:"{{foreground-3}}"}md-chips.md-THEME_NAME-theme .md-chips{box-shadow:0 1px "{{foreground-4}}"}md-chips.md-THEME_NAME-theme .md-chips.md-focused{box-shadow:0 2px "{{primary-color}}"}md-chips.md-THEME_NAME-theme .md-chips .md-chip-input-container input{color:"{{foreground-1}}"}md-chips.md-THEME_NAME-theme .md-chips .md-chip-input-container input:-moz-placeholder,md-chips.md-THEME_NAME-theme .md-chips .md-chip-input-container input::-moz-placeholder{color:"{{foreground-3}}"}md-chips.md-THEME_NAME-theme .md-chips .md-chip-input-container input:-ms-input-placeholder{color:"{{foreground-3}}"}md-chips.md-THEME_NAME-theme .md-chips .md-chip-input-container input::-webkit-input-placeholder{color:"{{foreground-3}}"}md-chips.md-THEME_NAME-theme md-chip{background:"{{background-300}}";color:"{{background-800}}"}md-chips.md-THEME_NAME-theme md-chip md-icon{color:"{{background-700}}"}md-chips.md-THEME_NAME-theme md-chip.md-focused{background:"{{primary-color}}";color:"{{primary-contrast}}"}md-chips.md-THEME_NAME-theme md-chip.md-focused md-icon{color:"{{primary-contrast}}"}md-chips.md-THEME_NAME-theme md-chip._md-chip-editing{background:transparent;color:"{{background-800}}"}md-chips.md-THEME_NAME-theme md-chip-remove .md-button md-icon path{fill:"{{background-500}}"}.md-contact-suggestion span.md-contact-email{color:"{{background-400}}"}md-content.md-THEME_NAME-theme{color:"{{foreground-1}}";background-color:"{{background-default}}"}.md-calendar.md-THEME_NAME-theme{background:"{{background-A100}}";color:"{{background-A200-0.87}}"}.md-calendar.md-THEME_NAME-theme tr:last-child td{border-bottom-color:"{{background-200}}"}.md-THEME_NAME-theme .md-calendar-day-header{background:"{{background-300}}";color:"{{background-A200-0.87}}"}.md-THEME_NAME-theme .md-calendar-date.md-calendar-date-today .md-calendar-date-selection-indicator{border:1px solid "{{primary-500}}"}.md-THEME_NAME-theme .md-calendar-date.md-calendar-date-today.md-calendar-date-disabled{color:"{{primary-500-0.6}}"}.md-calendar-date.md-focus .md-THEME_NAME-theme .md-calendar-date-selection-indicator,.md-THEME_NAME-theme .md-calendar-date-selection-indicator:hover{background:"{{background-300}}"}.md-THEME_NAME-theme .md-calendar-date.md-calendar-selected-date .md-calendar-date-selection-indicator,.md-THEME_NAME-theme .md-calendar-date.md-focus.md-calendar-selected-date .md-calendar-date-selection-indicator{background:"{{primary-500}}";color:"{{primary-500-contrast}}";border-color:transparent}.md-THEME_NAME-theme .md-calendar-date-disabled,.md-THEME_NAME-theme .md-calendar-month-label-disabled{color:"{{background-A200-0.435}}"}.md-THEME_NAME-theme .md-datepicker-input{color:"{{foreground-1}}"}.md-THEME_NAME-theme .md-datepicker-input:-moz-placeholder,.md-THEME_NAME-theme .md-datepicker-input::-moz-placeholder{color:"{{foreground-3}}"}.md-THEME_NAME-theme .md-datepicker-input:-ms-input-placeholder{color:"{{foreground-3}}"}.md-THEME_NAME-theme .md-datepicker-input::-webkit-input-placeholder{color:"{{foreground-3}}"}.md-THEME_NAME-theme .md-datepicker-input-container{border-bottom-color:"{{foreground-4}}"}.md-THEME_NAME-theme .md-datepicker-input-container.md-datepicker-focused{border-bottom-color:"{{primary-color}}"}.md-accent .md-THEME_NAME-theme .md-datepicker-input-container.md-datepicker-focused{border-bottom-color:"{{accent-color}}"}.md-THEME_NAME-theme .md-datepicker-input-container.md-datepicker-invalid,.md-warn .md-THEME_NAME-theme .md-datepicker-input-container.md-datepicker-focused{border-bottom-color:"{{warn-A700}}"}.md-THEME_NAME-theme .md-datepicker-calendar-pane{border-color:"{{background-hue-1}}"}.md-THEME_NAME-theme .md-datepicker-triangle-button .md-datepicker-expand-triangle{border-top-color:"{{foreground-2}}"}.md-THEME_NAME-theme .md-datepicker-open .md-datepicker-calendar-icon{color:"{{primary-color}}"}.md-accent .md-THEME_NAME-theme .md-datepicker-open .md-datepicker-calendar-icon,.md-THEME_NAME-theme .md-datepicker-open.md-accent .md-datepicker-calendar-icon{color:"{{accent-color}}"}.md-THEME_NAME-theme .md-datepicker-open.md-warn .md-datepicker-calendar-icon,.md-warn .md-THEME_NAME-theme .md-datepicker-open .md-datepicker-calendar-icon{color:"{{warn-A700}}"}.md-THEME_NAME-theme .md-datepicker-calendar{background:"{{background-A100}}"}.md-THEME_NAME-theme .md-datepicker-input-mask-opaque{box-shadow:0 0 0 9999px "{{background-hue-1}}"}.md-THEME_NAME-theme .md-datepicker-open .md-datepicker-input-container{background:"{{background-hue-1}}"}md-dialog.md-THEME_NAME-theme{border-radius:4px;background-color:"{{background-hue-1}}";color:"{{foreground-1}}"}md-dialog.md-THEME_NAME-theme.md-content-overflow .md-actions,md-dialog.md-THEME_NAME-theme.md-content-overflow md-dialog-actions,md-divider.md-THEME_NAME-theme{border-top-color:"{{foreground-4}}"}.layout-gt-lg-row>md-divider.md-THEME_NAME-theme,.layout-gt-md-row>md-divider.md-THEME_NAME-theme,.layout-gt-sm-row>md-divider.md-THEME_NAME-theme,.layout-gt-xs-row>md-divider.md-THEME_NAME-theme,.layout-lg-row>md-divider.md-THEME_NAME-theme,.layout-md-row>md-divider.md-THEME_NAME-theme,.layout-row>md-divider.md-THEME_NAME-theme,.layout-sm-row>md-divider.md-THEME_NAME-theme,.layout-xl-row>md-divider.md-THEME_NAME-theme,.layout-xs-row>md-divider.md-THEME_NAME-theme{border-right-color:"{{foreground-4}}"}md-icon.md-THEME_NAME-theme{color:"{{foreground-2}}"}md-icon.md-THEME_NAME-theme.md-primary{color:"{{primary-color}}"}md-icon.md-THEME_NAME-theme.md-accent{color:"{{accent-color}}"}md-icon.md-THEME_NAME-theme.md-warn{color:"{{warn-color}}"}md-input-container.md-THEME_NAME-theme .md-input{color:"{{foreground-1}}";border-color:"{{foreground-4}}"}md-input-container.md-THEME_NAME-theme .md-input:-moz-placeholder,md-input-container.md-THEME_NAME-theme .md-input::-moz-placeholder{color:"{{foreground-3}}"}md-input-container.md-THEME_NAME-theme .md-input:-ms-input-placeholder{color:"{{foreground-3}}"}md-input-container.md-THEME_NAME-theme .md-input::-webkit-input-placeholder{color:"{{foreground-3}}"}md-input-container.md-THEME_NAME-theme>md-icon{color:"{{foreground-1}}"}md-input-container.md-THEME_NAME-theme .md-placeholder,md-input-container.md-THEME_NAME-theme label{color:"{{foreground-3}}"}md-input-container.md-THEME_NAME-theme label.md-required:after{color:"{{warn-A700}}"}md-input-container.md-THEME_NAME-theme:not(.md-input-focused):not(.md-input-invalid) label.md-required:after{color:"{{foreground-2}}"}md-input-container.md-THEME_NAME-theme .md-input-message-animation,md-input-container.md-THEME_NAME-theme .md-input-messages-animation{color:"{{warn-A700}}"}md-input-container.md-THEME_NAME-theme .md-input-message-animation .md-char-counter,md-input-container.md-THEME_NAME-theme .md-input-messages-animation .md-char-counter{color:"{{foreground-1}}"}md-input-container.md-THEME_NAME-theme.md-input-focused .md-input:-moz-placeholder,md-input-container.md-THEME_NAME-theme.md-input-focused .md-input::-moz-placeholder{color:"{{foreground-2}}"}md-input-container.md-THEME_NAME-theme.md-input-focused .md-input:-ms-input-placeholder{color:"{{foreground-2}}"}md-input-container.md-THEME_NAME-theme.md-input-focused .md-input::-webkit-input-placeholder{color:"{{foreground-2}}"}md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-has-value label{color:"{{foreground-2}}"}md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused .md-input,md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-resized .md-input{border-color:"{{primary-color}}"}md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused label,md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused md-icon{color:"{{primary-color}}"}md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent .md-input{border-color:"{{accent-color}}"}md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent label,md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent md-icon{color:"{{accent-color}}"}md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn .md-input{border-color:"{{warn-A700}}"}md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn label,md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn md-icon{color:"{{warn-A700}}"}md-input-container.md-THEME_NAME-theme.md-input-invalid .md-input{border-color:"{{warn-A700}}"}md-input-container.md-THEME_NAME-theme.md-input-invalid .md-char-counter,md-input-container.md-THEME_NAME-theme.md-input-invalid .md-input-message-animation,md-input-container.md-THEME_NAME-theme.md-input-invalid label{color:"{{warn-A700}}"}[disabled] md-input-container.md-THEME_NAME-theme .md-input,md-input-container.md-THEME_NAME-theme .md-input[disabled]{border-bottom-color:transparent;color:"{{foreground-3}}";background-image:linear-gradient(90deg,"{{foreground-3}}" 0,"{{foreground-3}}" 33%,transparent 0);background-image:-ms-linear-gradient(left,transparent 0,"{{foreground-3}}" 100%)}md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text h3,md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text h4,md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text h3,md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text h4{color:"{{foreground-1}}"}md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text p,md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text p{color:"{{foreground-2}}"}md-list.md-THEME_NAME-theme .md-proxy-focus.md-focused div.md-no-style{background-color:"{{background-100}}"}md-list.md-THEME_NAME-theme md-list-item .md-avatar-icon{background-color:"{{foreground-3}}";color:"{{background-color}}"}md-list.md-THEME_NAME-theme md-list-item>md-icon{color:"{{foreground-2}}"}md-list.md-THEME_NAME-theme md-list-item>md-icon.md-highlight{color:"{{primary-color}}"}md-list.md-THEME_NAME-theme md-list-item>md-icon.md-highlight.md-accent{color:"{{accent-color}}"}md-menu-content.md-THEME_NAME-theme{background-color:"{{background-A100}}"}md-menu-content.md-THEME_NAME-theme md-menu-item{color:"{{background-A200-0.87}}"}md-menu-content.md-THEME_NAME-theme md-menu-item md-icon{color:"{{background-A200-0.54}}"}md-menu-content.md-THEME_NAME-theme md-menu-item .md-button[disabled],md-menu-content.md-THEME_NAME-theme md-menu-item .md-button[disabled] md-icon{color:"{{background-A200-0.25}}"}md-menu-content.md-THEME_NAME-theme md-menu-divider{background-color:"{{background-A200-0.11}}"}md-menu-bar.md-THEME_NAME-theme>button.md-button{color:"{{foreground-2}}";border-radius:2px}md-menu-bar.md-THEME_NAME-theme md-menu.md-open>button,md-menu-bar.md-THEME_NAME-theme md-menu>button:focus{outline:none;background:"{{background-200}}"}md-menu-bar.md-THEME_NAME-theme.md-open:not(.md-keyboard-mode) md-menu:hover>button{background-color:"{{ background-500-0.2}}"}md-menu-bar.md-THEME_NAME-theme:not(.md-keyboard-mode):not(.md-open) md-menu button:focus,md-menu-bar.md-THEME_NAME-theme:not(.md-keyboard-mode):not(.md-open) md-menu button:hover{background:transparent}md-menu-content.md-THEME_NAME-theme .md-menu>.md-button:after{color:"{{background-A200-0.54}}"}md-menu-content.md-THEME_NAME-theme .md-menu.md-open>.md-button{background-color:"{{ background-500-0.2}}"}md-toolbar.md-THEME_NAME-theme.md-menu-toolbar{background-color:"{{background-A100}}";color:"{{background-A200}}"}md-toolbar.md-THEME_NAME-theme.md-menu-toolbar md-toolbar-filler{background-color:"{{primary-color}}";color:"{{background-A100-0.87}}"}md-toolbar.md-THEME_NAME-theme.md-menu-toolbar md-toolbar-filler md-icon{color:"{{background-A100-0.87}}"}md-nav-bar.md-THEME_NAME-theme .md-nav-bar{background-color:transparent;border-color:"{{foreground-4}}"}md-nav-bar.md-THEME_NAME-theme .md-button._md-nav-button.md-unselected{color:"{{foreground-2}}"}md-nav-bar.md-THEME_NAME-theme md-nav-ink-bar{color:"{{accent-color}}";background:"{{accent-color}}"}md-nav-bar.md-THEME_NAME-theme.md-accent>.md-nav-bar{background-color:"{{accent-color}}"}md-nav-bar.md-THEME_NAME-theme.md-accent>.md-nav-bar .md-button._md-nav-button{color:"{{accent-A100}}"}md-nav-bar.md-THEME_NAME-theme.md-accent>.md-nav-bar .md-button._md-nav-button.md-active,md-nav-bar.md-THEME_NAME-theme.md-accent>.md-nav-bar .md-button._md-nav-button.md-focused{color:"{{accent-contrast}}"}md-nav-bar.md-THEME_NAME-theme.md-accent>.md-nav-bar .md-button._md-nav-button.md-focused{background:"{{accent-contrast-0.1}}"}md-nav-bar.md-THEME_NAME-theme.md-accent>.md-nav-bar md-nav-ink-bar{color:"{{primary-600-1}}";background:"{{primary-600-1}}"}md-nav-bar.md-THEME_NAME-theme.md-warn>.md-nav-bar{background-color:"{{warn-color}}"}md-nav-bar.md-THEME_NAME-theme.md-warn>.md-nav-bar .md-button._md-nav-button{color:"{{warn-100}}"}md-nav-bar.md-THEME_NAME-theme.md-warn>.md-nav-bar .md-button._md-nav-button.md-active,md-nav-bar.md-THEME_NAME-theme.md-warn>.md-nav-bar .md-button._md-nav-button.md-focused{color:"{{warn-contrast}}"}md-nav-bar.md-THEME_NAME-theme.md-warn>.md-nav-bar .md-button._md-nav-button.md-focused{background:"{{warn-contrast-0.1}}"}md-nav-bar.md-THEME_NAME-theme.md-primary>.md-nav-bar{background-color:"{{primary-color}}"}md-nav-bar.md-THEME_NAME-theme.md-primary>.md-nav-bar .md-button._md-nav-button{color:"{{primary-100}}"}md-nav-bar.md-THEME_NAME-theme.md-primary>.md-nav-bar .md-button._md-nav-button.md-active,md-nav-bar.md-THEME_NAME-theme.md-primary>.md-nav-bar .md-button._md-nav-button.md-focused{color:"{{primary-contrast}}"}md-nav-bar.md-THEME_NAME-theme.md-primary>.md-nav-bar .md-button._md-nav-button.md-focused{background:"{{primary-contrast-0.1}}"}md-toolbar>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar{background-color:"{{primary-color}}"}md-toolbar>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button{color:"{{primary-100}}"}md-toolbar>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-active,md-toolbar>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-focused{color:"{{primary-contrast}}"}md-toolbar>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-focused{background:"{{primary-contrast-0.1}}"}md-toolbar.md-accent>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar{background-color:"{{accent-color}}"}md-toolbar.md-accent>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button{color:"{{accent-A100}}"}md-toolbar.md-accent>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-active,md-toolbar.md-accent>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-focused{color:"{{accent-contrast}}"}md-toolbar.md-accent>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-focused{background:"{{accent-contrast-0.1}}"}md-toolbar.md-accent>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar md-nav-ink-bar{color:"{{primary-600-1}}";background:"{{primary-600-1}}"}md-toolbar.md-warn>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar{background-color:"{{warn-color}}"}md-toolbar.md-warn>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button{color:"{{warn-100}}"}md-toolbar.md-warn>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-active,md-toolbar.md-warn>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-focused{color:"{{warn-contrast}}"}md-toolbar.md-warn>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-focused{background:"{{warn-contrast-0.1}}"}md-progress-circular.md-THEME_NAME-theme path{stroke:"{{primary-color}}"}md-progress-circular.md-THEME_NAME-theme.md-warn path{stroke:"{{warn-color}}"}md-progress-circular.md-THEME_NAME-theme.md-accent path{stroke:"{{accent-color}}"}._md-panel-backdrop.md-THEME_NAME-theme{background-color:"{{background-900-1.0}}"}md-progress-linear.md-THEME_NAME-theme .md-container{background-color:"{{primary-100}}"}md-progress-linear.md-THEME_NAME-theme .md-bar{background-color:"{{primary-color}}"}md-progress-linear.md-THEME_NAME-theme.md-warn .md-container{background-color:"{{warn-100}}"}md-progress-linear.md-THEME_NAME-theme.md-warn .md-bar{background-color:"{{warn-color}}"}md-progress-linear.md-THEME_NAME-theme.md-accent .md-container{background-color:"{{accent-100}}"}md-progress-linear.md-THEME_NAME-theme.md-accent .md-bar{background-color:"{{accent-color}}"}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn .md-bar1{background-color:"{{warn-100}}"}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn .md-dashed:before{background:radial-gradient("{{warn-100}}" 0,"{{warn-100}}" 16%,transparent 42%)}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent .md-bar1{background-color:"{{accent-100}}"}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent .md-dashed:before{background:radial-gradient("{{accent-100}}" 0,"{{accent-100}}" 16%,transparent 42%)}md-radio-button.md-THEME_NAME-theme .md-off{border-color:"{{foreground-2}}"}md-radio-button.md-THEME_NAME-theme .md-on{background-color:"{{accent-color-0.87}}"}md-radio-button.md-THEME_NAME-theme.md-checked .md-off{border-color:"{{accent-color-0.87}}"}md-radio-button.md-THEME_NAME-theme.md-checked .md-ink-ripple{color:"{{accent-color-0.87}}"}md-radio-button.md-THEME_NAME-theme .md-container .md-ripple{color:"{{accent-A700}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-on,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-on,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-on,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-on{background-color:"{{primary-color-0.87}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-off{border-color:"{{primary-color-0.87}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-ink-ripple{color:"{{primary-color-0.87}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-container .md-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-container .md-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-container .md-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-container .md-ripple{color:"{{primary-600}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-on,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-on,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-on,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-on{background-color:"{{warn-color-0.87}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-off{border-color:"{{warn-color-0.87}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-ink-ripple{color:"{{warn-color-0.87}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-container .md-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-container .md-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-container .md-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-container .md-ripple{color:"{{warn-600}}"}md-radio-button.md-THEME_NAME-theme[disabled],md-radio-group.md-THEME_NAME-theme[disabled]{color:"{{foreground-3}}"}md-radio-button.md-THEME_NAME-theme[disabled] .md-container .md-off,md-radio-button.md-THEME_NAME-theme[disabled] .md-container .md-on,md-radio-group.md-THEME_NAME-theme[disabled] .md-container .md-off,md-radio-group.md-THEME_NAME-theme[disabled] .md-container .md-on{border-color:"{{foreground-3}}"}md-radio-group.md-THEME_NAME-theme .md-checked .md-ink-ripple{color:"{{accent-color-0.26}}"}md-radio-group.md-THEME_NAME-theme .md-checked:not([disabled]).md-primary .md-ink-ripple,md-radio-group.md-THEME_NAME-theme.md-primary .md-checked:not([disabled]) .md-ink-ripple{color:"{{primary-color-0.26}}"}md-radio-group.md-THEME_NAME-theme .md-checked.md-primary .md-ink-ripple{color:"{{warn-color-0.26}}"}md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty) .md-checked .md-container:before{background-color:"{{accent-color-0.26}}"}md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty) .md-checked.md-primary .md-container:before,md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty).md-primary .md-checked .md-container:before{background-color:"{{primary-color-0.26}}"}md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty) .md-checked.md-warn .md-container:before,md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty).md-warn .md-checked .md-container:before{background-color:"{{warn-color-0.26}}"}md-sidenav.md-THEME_NAME-theme,md-sidenav.md-THEME_NAME-theme md-content{background-color:"{{background-hue-1}}"}md-input-container md-select.md-THEME_NAME-theme .md-select-value span:first-child:after{color:"{{warn-A700}}"}md-input-container:not(.md-input-focused):not(.md-input-invalid) md-select.md-THEME_NAME-theme .md-select-value span:first-child:after{color:"{{foreground-3}}"}md-input-container.md-input-focused:not(.md-input-has-value) md-select.md-THEME_NAME-theme .md-select-value,md-input-container.md-input-focused:not(.md-input-has-value) md-select.md-THEME_NAME-theme .md-select-value.md-select-placeholder{color:"{{primary-color}}"}md-input-container.md-input-invalid md-select.md-THEME_NAME-theme .md-select-value{color:"{{warn-A700}}"!important;border-bottom-color:"{{warn-A700}}"!important}md-input-container.md-input-invalid md-select.md-THEME_NAME-theme.md-no-underline .md-select-value{border-bottom-color:transparent!important}md-select.md-THEME_NAME-theme[disabled] .md-select-value{border-bottom-color:transparent;background-image:linear-gradient(90deg,"{{foreground-3}}" 0,"{{foreground-3}}" 33%,transparent 0);background-image:-ms-linear-gradient(left,transparent 0,"{{foreground-3}}" 100%)}md-select.md-THEME_NAME-theme .md-select-value{border-bottom-color:"{{foreground-4}}"}md-select.md-THEME_NAME-theme .md-select-value.md-select-placeholder{color:"{{foreground-3}}"}md-select.md-THEME_NAME-theme .md-select-value span:first-child:after{color:"{{warn-A700}}"}md-select.md-THEME_NAME-theme.md-no-underline .md-select-value{border-bottom-color:transparent!important}md-select.md-THEME_NAME-theme.ng-invalid.ng-touched .md-select-value{color:"{{warn-A700}}"!important;border-bottom-color:"{{warn-A700}}"!important}md-select.md-THEME_NAME-theme.ng-invalid.ng-touched.md-no-underline .md-select-value{border-bottom-color:transparent!important}md-select.md-THEME_NAME-theme:not([disabled]):focus .md-select-value{border-bottom-color:"{{primary-color}}";color:"{{ foreground-1 }}"}md-select.md-THEME_NAME-theme:not([disabled]):focus .md-select-value.md-select-placeholder{color:"{{ foreground-1 }}"}md-select.md-THEME_NAME-theme:not([disabled]):focus.md-no-underline .md-select-value{border-bottom-color:transparent!important}md-select.md-THEME_NAME-theme:not([disabled]):focus.md-accent .md-select-value{border-bottom-color:"{{accent-color}}"}md-select.md-THEME_NAME-theme:not([disabled]):focus.md-warn .md-select-value{border-bottom-color:"{{warn-color}}"}md-select.md-THEME_NAME-theme[disabled] .md-select-icon,md-select.md-THEME_NAME-theme[disabled] .md-select-value,md-select.md-THEME_NAME-theme[disabled] .md-select-value.md-select-placeholder{color:"{{foreground-3}}"}md-select.md-THEME_NAME-theme .md-select-icon{color:"{{foreground-2}}"}md-select-menu.md-THEME_NAME-theme md-content{background:"{{background-A100}}"}md-select-menu.md-THEME_NAME-theme md-content md-optgroup{color:"{{background-600-0.87}}"}md-select-menu.md-THEME_NAME-theme md-content md-option{color:"{{background-900-0.87}}"}md-select-menu.md-THEME_NAME-theme md-content md-option[disabled] .md-text{color:"{{background-400-0.87}}"}md-select-menu.md-THEME_NAME-theme md-content md-option:not([disabled]):focus,md-select-menu.md-THEME_NAME-theme md-content md-option:not([disabled]):hover{background:"{{background-200}}"}md-select-menu.md-THEME_NAME-theme md-content md-option[selected]{color:"{{primary-500}}"}md-select-menu.md-THEME_NAME-theme md-content md-option[selected]:focus{color:"{{primary-600}}"}md-select-menu.md-THEME_NAME-theme md-content md-option[selected].md-accent{color:"{{accent-color}}"}md-select-menu.md-THEME_NAME-theme md-content md-option[selected].md-accent:focus{color:"{{accent-A700}}"}.md-checkbox-enabled.md-THEME_NAME-theme .md-ripple{color:"{{primary-600}}"}.md-checkbox-enabled.md-THEME_NAME-theme[selected] .md-ripple{color:"{{background-600}}"}.md-checkbox-enabled.md-THEME_NAME-theme .md-ink-ripple{color:"{{foreground-2}}"}.md-checkbox-enabled.md-THEME_NAME-theme[selected] .md-ink-ripple{color:"{{primary-color-0.87}}"}.md-checkbox-enabled.md-THEME_NAME-theme:not(.md-checked) .md-icon{border-color:"{{foreground-2}}"}.md-checkbox-enabled.md-THEME_NAME-theme[selected] .md-icon{background-color:"{{primary-color-0.87}}"}.md-checkbox-enabled.md-THEME_NAME-theme[selected].md-focused .md-container:before{background-color:"{{primary-color-0.26}}"}.md-checkbox-enabled.md-THEME_NAME-theme[selected] .md-icon:after{border-color:"{{primary-contrast-0.87}}"}.md-checkbox-enabled.md-THEME_NAME-theme .md-indeterminate[disabled] .md-container{color:"{{foreground-3}}"}.md-checkbox-enabled.md-THEME_NAME-theme md-option .md-text{color:"{{background-900-0.87}}"}md-slider.md-THEME_NAME-theme .md-track{background-color:"{{foreground-3}}"}md-slider.md-THEME_NAME-theme .md-track-ticks{color:"{{background-contrast}}"}md-slider.md-THEME_NAME-theme .md-focus-ring{background-color:"{{accent-A200-0.2}}"}md-slider.md-THEME_NAME-theme .md-disabled-thumb{border-color:"{{background-color}}";background-color:"{{background-color}}"}md-slider.md-THEME_NAME-theme.md-min .md-thumb:after{background-color:"{{background-color}}";border-color:"{{foreground-3}}"}md-slider.md-THEME_NAME-theme.md-min .md-focus-ring{background-color:"{{foreground-3-0.38}}"}md-slider.md-THEME_NAME-theme.md-min[md-discrete] .md-thumb:after{background-color:"{{background-contrast}}";border-color:transparent}md-slider.md-THEME_NAME-theme.md-min[md-discrete] .md-sign{background-color:"{{background-400}}"}md-slider.md-THEME_NAME-theme.md-min[md-discrete] .md-sign:after{border-top-color:"{{background-400}}"}md-slider.md-THEME_NAME-theme.md-min[md-discrete][md-vertical] .md-sign:after{border-top-color:transparent;border-left-color:"{{background-400}}"}md-slider.md-THEME_NAME-theme .md-track.md-track-fill{background-color:"{{accent-color}}"}md-slider.md-THEME_NAME-theme .md-thumb:after{border-color:"{{accent-color}}";background-color:"{{accent-color}}"}md-slider.md-THEME_NAME-theme .md-sign{background-color:"{{accent-color}}"}md-slider.md-THEME_NAME-theme .md-sign:after{border-top-color:"{{accent-color}}"}md-slider.md-THEME_NAME-theme[md-vertical] .md-sign:after{border-top-color:transparent;border-left-color:"{{accent-color}}"}md-slider.md-THEME_NAME-theme .md-thumb-text{color:"{{accent-contrast}}"}md-slider.md-THEME_NAME-theme.md-warn .md-focus-ring{background-color:"{{warn-200-0.38}}"}md-slider.md-THEME_NAME-theme.md-warn .md-track.md-track-fill{background-color:"{{warn-color}}"}md-slider.md-THEME_NAME-theme.md-warn .md-thumb:after{border-color:"{{warn-color}}";background-color:"{{warn-color}}"}md-slider.md-THEME_NAME-theme.md-warn .md-sign{background-color:"{{warn-color}}"}md-slider.md-THEME_NAME-theme.md-warn .md-sign:after{border-top-color:"{{warn-color}}"}md-slider.md-THEME_NAME-theme.md-warn[md-vertical] .md-sign:after{border-top-color:transparent;border-left-color:"{{warn-color}}"}md-slider.md-THEME_NAME-theme.md-warn .md-thumb-text{color:"{{warn-contrast}}"}md-slider.md-THEME_NAME-theme.md-primary .md-focus-ring{background-color:"{{primary-200-0.38}}"}md-slider.md-THEME_NAME-theme.md-primary .md-track.md-track-fill{background-color:"{{primary-color}}"}md-slider.md-THEME_NAME-theme.md-primary .md-thumb:after{border-color:"{{primary-color}}";background-color:"{{primary-color}}"}md-slider.md-THEME_NAME-theme.md-primary .md-sign{background-color:"{{primary-color}}"}md-slider.md-THEME_NAME-theme.md-primary .md-sign:after{border-top-color:"{{primary-color}}"}md-slider.md-THEME_NAME-theme.md-primary[md-vertical] .md-sign:after{border-top-color:transparent;border-left-color:"{{primary-color}}"}md-slider.md-THEME_NAME-theme.md-primary .md-thumb-text{color:"{{primary-contrast}}"}md-slider.md-THEME_NAME-theme[disabled] .md-thumb:after{border-color:transparent}md-slider.md-THEME_NAME-theme[disabled]:not(.md-min) .md-thumb:after,md-slider.md-THEME_NAME-theme[disabled][md-discrete] .md-thumb:after{background-color:"{{foreground-3}}";border-color:transparent}md-slider.md-THEME_NAME-theme[disabled][readonly] .md-sign{background-color:"{{background-400}}"}md-slider.md-THEME_NAME-theme[disabled][readonly] .md-sign:after{border-top-color:"{{background-400}}"}md-slider.md-THEME_NAME-theme[disabled][readonly][md-vertical] .md-sign:after{border-top-color:transparent;border-left-color:"{{background-400}}"}md-slider.md-THEME_NAME-theme[disabled][readonly] .md-disabled-thumb{border-color:transparent;background-color:transparent}md-slider-container[disabled]>:first-child:not(md-slider),md-slider-container[disabled]>:last-child:not(md-slider){color:"{{foreground-3}}"}.md-subheader.md-THEME_NAME-theme{color:"{{ foreground-2-0.23 }}";background-color:"{{background-default}}"}.md-subheader.md-THEME_NAME-theme.md-primary{color:"{{primary-color}}"}.md-subheader.md-THEME_NAME-theme.md-accent{color:"{{accent-color}}"}.md-subheader.md-THEME_NAME-theme.md-warn{color:"{{warn-color}}"}md-switch.md-THEME_NAME-theme .md-ink-ripple{color:"{{background-500}}"}md-switch.md-THEME_NAME-theme .md-thumb{background-color:"{{background-50}}"}md-switch.md-THEME_NAME-theme .md-bar{background-color:"{{background-500}}"}md-switch.md-THEME_NAME-theme.md-checked .md-ink-ripple{color:"{{accent-color}}"}md-switch.md-THEME_NAME-theme.md-checked .md-thumb{background-color:"{{accent-color}}"}md-switch.md-THEME_NAME-theme.md-checked .md-bar{background-color:"{{accent-color-0.5}}"}md-switch.md-THEME_NAME-theme.md-checked.md-focused .md-thumb:before{background-color:"{{accent-color-0.26}}"}md-switch.md-THEME_NAME-theme.md-checked.md-primary .md-ink-ripple{color:"{{primary-color}}"}md-switch.md-THEME_NAME-theme.md-checked.md-primary .md-thumb{background-color:"{{primary-color}}"}md-switch.md-THEME_NAME-theme.md-checked.md-primary .md-bar{background-color:"{{primary-color-0.5}}"}md-switch.md-THEME_NAME-theme.md-checked.md-primary.md-focused .md-thumb:before{background-color:"{{primary-color-0.26}}"}md-switch.md-THEME_NAME-theme.md-checked.md-warn .md-ink-ripple{color:"{{warn-color}}"}md-switch.md-THEME_NAME-theme.md-checked.md-warn .md-thumb{background-color:"{{warn-color}}"}md-switch.md-THEME_NAME-theme.md-checked.md-warn .md-bar{background-color:"{{warn-color-0.5}}"}md-switch.md-THEME_NAME-theme.md-checked.md-warn.md-focused .md-thumb:before{background-color:"{{warn-color-0.26}}"}md-switch.md-THEME_NAME-theme[disabled] .md-thumb{background-color:"{{background-400}}"}md-switch.md-THEME_NAME-theme[disabled] .md-bar{background-color:"{{foreground-4}}"}md-tabs.md-THEME_NAME-theme md-tabs-wrapper{background-color:transparent;border-color:"{{foreground-4}}"}md-tabs.md-THEME_NAME-theme .md-paginator md-icon{color:"{{primary-color}}"}md-tabs.md-THEME_NAME-theme md-ink-bar{color:"{{accent-color}}";background:"{{accent-color}}"}md-tabs.md-THEME_NAME-theme .md-tab{color:"{{foreground-2}}"}md-tabs.md-THEME_NAME-theme .md-tab[disabled],md-tabs.md-THEME_NAME-theme .md-tab[disabled] md-icon{color:"{{foreground-3}}"}md-tabs.md-THEME_NAME-theme .md-tab.md-active,md-tabs.md-THEME_NAME-theme .md-tab.md-active md-icon,md-tabs.md-THEME_NAME-theme .md-tab.md-focused,md-tabs.md-THEME_NAME-theme .md-tab.md-focused md-icon{color:"{{primary-color}}"}md-tabs.md-THEME_NAME-theme .md-tab.md-focused{background:"{{primary-color-0.1}}"}md-tabs.md-THEME_NAME-theme .md-tab .md-ripple-container{color:"{{accent-A100}}"}md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper{background-color:"{{accent-color}}"}md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]),md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]) md-icon{color:"{{accent-A100}}"}md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active,md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active md-icon,md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused,md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused md-icon{color:"{{accent-contrast}}"}md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused{background:"{{accent-contrast-0.1}}"}md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-ink-bar{color:"{{primary-600-1}}";background:"{{primary-600-1}}"}md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper{background-color:"{{primary-color}}"}md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]),md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]) md-icon{color:"{{primary-100}}"}md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active,md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active md-icon,md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused,md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused md-icon{color:"{{primary-contrast}}"}md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused{background:"{{primary-contrast-0.1}}"}md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper{background-color:"{{warn-color}}"}md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]),md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]) md-icon{color:"{{warn-100}}"}md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active,md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active md-icon,md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused,md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused md-icon{color:"{{warn-contrast}}"}md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused{background:"{{warn-contrast-0.1}}"}md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper{background-color:"{{primary-color}}"}md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]),md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]) md-icon{color:"{{primary-100}}"}md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active,md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active md-icon,md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused,md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused md-icon{color:"{{primary-contrast}}"}md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused{background:"{{primary-contrast-0.1}}"}md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper{background-color:"{{accent-color}}"}md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]),md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]) md-icon{color:"{{accent-A100}}"}md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active,md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active md-icon,md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused,md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused md-icon{color:"{{accent-contrast}}"}md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused{background:"{{accent-contrast-0.1}}"}md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-ink-bar{color:"{{primary-600-1}}";background:"{{primary-600-1}}"}md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper{background-color:"{{warn-color}}"}md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]),md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]) md-icon{color:"{{warn-100}}"}md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active,md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active md-icon,md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused,md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused md-icon{color:"{{warn-contrast}}"}md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused{background:"{{warn-contrast-0.1}}"}md-toast.md-THEME_NAME-theme .md-toast-content{background-color:#323232;color:"{{background-50}}"}md-toast.md-THEME_NAME-theme .md-toast-content .md-button{color:"{{background-50}}"}md-toast.md-THEME_NAME-theme .md-toast-content .md-button.md-highlight{color:"{{accent-color}}"}md-toast.md-THEME_NAME-theme .md-toast-content .md-button.md-highlight.md-primary{color:"{{primary-color}}"}md-toast.md-THEME_NAME-theme .md-toast-content .md-button.md-highlight.md-warn{color:"{{warn-color}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar){background-color:"{{primary-color}}";color:"{{primary-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-icon{color:"{{primary-contrast}}";fill:"{{primary-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) .md-button[disabled] md-icon{color:"{{primary-contrast-0.26}}";fill:"{{primary-contrast-0.26}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent{background-color:"{{accent-color}}";color:"{{accent-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent .md-ink-ripple{color:"{{accent-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-icon{color:"{{accent-contrast}}";fill:"{{accent-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent .md-button[disabled] md-icon{color:"{{accent-contrast-0.26}}";fill:"{{accent-contrast-0.26}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn{background-color:"{{warn-color}}";color:"{{warn-contrast}}"}.md-panel.md-tooltip.md-THEME_NAME-theme{color:"{{background-700-contrast}}";background-color:"{{background-700}}"}body.md-THEME_NAME-theme,html.md-THEME_NAME-theme{color:"{{foreground-1}}";background-color:"{{background-color}}"}');
}()}(window,window.angular),window.ngMaterial={version:{full:"1.1.4"}};;!function(){"use strict";angular.module("material.components.expansionPanels",["material.core"])}(),function(){"use strict";angular.module("material.components.expansionPanels").run(["$templateCache",function(n){n.put("icons/ic_keyboard_arrow_right_black_24px.svg",'<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>\n    <path d="M0-.25h24v24H0z" fill="none"/>\n</svg>')}])}(),function(){"use strict";function n(){function n(n,e){var o="Invalid HTML for md-expansion-panel: ";if(n.attr("tabindex",e.tabindex||"0"),null===n[0].querySelector("md-expansion-panel-collapsed"))throw Error(o+"Expected a child element of `md-epxansion-panel-collapsed`");if(null===n[0].querySelector("md-expansion-panel-expanded"))throw Error(o+"Expected a child element of `md-epxansion-panel-expanded`");return function(n,e,o,t){var i=t[0],r=t[1];i.epxansionPanelGroupCtrl=r||void 0,i.init()}}function o(n,o,t,i,r,a,s,l,c,d,u,p){function m(n){var e=a.KEY_CODE;switch(n.keyCode){case e.ENTER:g();break;case e.ESCAPE:x()}}function f(){F=!0,M===!0&&v()}function v(){return F===!1?void(M=!0):("function"==typeof q&&(q(),q=void 0),D.componentId&&D.epxansionPanelGroupCtrl&&D.epxansionPanelGroupCtrl.removePanel(D.componentId),void 0===t.mdComponentId&&t.$set("mdComponentId","_expansion_panel_id_"+s.nextUid()),D.componentId=t.mdComponentId,q=l.register({expand:g,collapse:x,remove:C,onRemove:$,isOpen:h,addClickCatcher:S,removeClickCatcher:_,componentId:t.mdComponentId},t.mdComponentId),void(D.epxansionPanelGroupCtrl&&D.epxansionPanelGroupCtrl.addPanel(D.componentId,{expand:g,collapse:x,remove:C,onRemove:$,destroy:E,isOpen:h})))}function h(){return W}function g(n){if(W!==!0&&L!==!0){W=!0,n=n||{};var t=d.defer();return D.epxansionPanelGroupCtrl&&D.epxansionPanelGroupCtrl.expandPanel(D.componentId),o.removeClass("md-close"),o.addClass("md-open"),n.animation===!1?o.addClass("md-no-animation"):o.removeClass("md-no-animation"),w(),O.hide(n),G.show(n),j&&j.show(n),N&&N.show(n),c(function(){t.resolve()},n.animation===!1?0:e),t.promise}}function x(n){if(W!==!1){W=!1,n=n||{};var t=d.defer();return o.addClass("md-close"),o.removeClass("md-open"),n.animation===!1?o.addClass("md-no-animation"):o.removeClass("md-no-animation"),P(),O.show(n),G.hide(n),j&&j.hide(n),N&&N.hide(n),c(function(){t.resolve()},n.animation===!1?0:e),t.promise}}function C(t){t=t||{};var i=d.defer();return D.epxansionPanelGroupCtrl&&D.epxansionPanelGroupCtrl.removePanel(D.componentId),"function"==typeof q&&(q(),q=void 0),t.animation===!1||W===!1?(n.$destroy(),o.remove(),i.resolve(),y()):(x(),c(function(){n.$destroy(),o.remove(),i.resolve(),y()},e)),i.promise}function $(n){B=n}function y(){"function"==typeof B&&(B(),B=void 0)}function E(){n.$destroy()}function w(){(N&&N.noSticky!==!0||j&&j.noSticky!==!0)&&(H=n.$watch(function(){return o[0].offsetTop},K,!0),z=n.$watch(function(){return o[0].offsetWidth},Y,!0),A=s.getNearestContentElement(o),"MD-CONTENT"===A.nodeName?(U=k(A),angular.element(A).on("scroll",K)):U=void 0,G.setHeight===!0&&G.$element.on("scroll",K),angular.element(i).on("scroll",K).on("resize",K).on("resize",Y))}function P(){"function"==typeof H&&(H(),H=void 0),"function"==typeof z&&(z(),z=void 0),A&&"MD-CONTENT"===A.nodeName&&angular.element(A).off("scroll",K),G.setHeight===!0&&G.$element.off("scroll",K),angular.element(i).off("scroll",K).off("resize",K).off("resize",Y)}function k(n){for(var e=n.parentNode;e&&e!==document;){if(b(e,"transform"))return e;e=e.parentNode}}function b(n,e){var o=!1;if(n){var t=i.getComputedStyle(n);o=void 0!==t[e]&&"none"!==t[e]}return o}function I(n){var e,o,t;t=G.setHeight===!0?G.$element[0].getBoundingClientRect():A.getBoundingClientRect();var i=U?U.getBoundingClientRect().top:0;e=Math.max(t.top,0),o=e+t.height,N&&N.noSticky===!1&&N.onScroll(e,o,i),j&&j.noSticky===!1&&j.onScroll(e,o,i)}function R(){var n=o[0].offsetWidth;N&&N.noSticky===!1&&N.onResize(n),j&&j.noSticky===!1&&j.onResize(n)}function S(e){T=s.createBackdrop(n),T[0].tabIndex=-1,"function"==typeof e&&T.on("click",e),u.enter(T,o.parent(),null,{duration:0}),o.css("z-index",60)}function _(){T&&(T.remove(),T.off("click"),T=void 0,o.css("z-index",""))}var O,G,j,N,q,A,H,z,B,U,T,D=this,F=!1,M=!1,W=!1,L=!1,K=r.throttle(I),Y=r.throttle(R);D.registerCollapsed=function(n){O=n},D.registerExpanded=function(n){G=n},D.registerHeader=function(n){j=n},D.registerFooter=function(n){N=n},void 0===t.mdComponentId?(t.$set("mdComponentId","_expansion_panel_id_"+s.nextUid()),v()):t.$observe("mdComponentId",function(){v()}),D.$element=o,D.expand=g,D.collapse=x,D.remove=C,D.destroy=E,D.onRemove=$,D.init=f,void 0!==t.ngDisabled?n.$watch(t.ngDisabled,function(n){L=n,o.attr("tabindex",L?-1:0)}):void 0!==t.disabled&&(L=void 0!==t.disabled&&"false"!==t.disabled&&t.disabled!==!1,o.attr("tabindex",L?-1:0)),o.on("focus",function(n){o.on("keydown",m)}).on("blur",function(n){o.off("keydown",m)}),n.$panel={collapse:x,expand:g,remove:C,isOpen:h},n.$on("$destroy",function(){_(),"function"==typeof q&&(q(),q=void 0),P()})}var t={restrict:"E",require:["mdExpansionPanel","?^^mdExpansionPanelGroup"],scope:!0,compile:n,controller:["$scope","$element","$attrs","$window","$$rAF","$mdConstant","$mdUtil","$mdComponentRegistry","$timeout","$q","$animate","$parse",o]};return t}angular.module("material.components.expansionPanels").directive("mdExpansionPanel",n);var e=180}(),function(){"use strict";function n(n,e,o){function t(t){var i=n.get(t);return i?i:void o.error(e.supplant(r,[t||""]))}function i(e){return n.when(e)["catch"](o.error)}var r="ExpansionPanel '{0}' is not available! Did you use md-component-id='{0}'?",a={find:t,waitFor:i};return function(n){return void 0===n?a:t(n)}}angular.module("material.components.expansionPanels").factory("$mdExpansionPanel",n),n.$inject=["$mdComponentRegistry","$mdUtil","$log"]}(),function(){"use strict";function n(n,e){function o(o,t,i,r){function a(e){t.css("width",t[0].offsetWidth+"px"),r.$element.css("min-height",t[0].offsetHeight+"px");var o={addClass:"md-absolute md-hide",from:{opacity:1},to:{opacity:0}};e.animation===!1&&(o.duration=0),n(t,o).start().then(function(){t.removeClass("md-hide"),t.css("display","none")})}function s(o){t.css("display",""),t.css("width",t[0].parentNode.offsetWidth+"px");var i={addClass:"md-show",from:{opacity:0},to:{opacity:1}};o.animation===!1&&(i.duration=0),n(t,i).start().then(function(){r.$element.css("transition","none"),t.removeClass("md-absolute md-show"),t.css("width",""),r.$element.css("min-height",""),e(function(){r.$element.css("transition","")},0)})}r.registerCollapsed({show:s,hide:a}),t.on("click",function(){r.expand()})}var t={restrict:"E",require:"^^mdExpansionPanel",link:o};return t}angular.module("material.components.expansionPanels").directive("mdExpansionPanelCollapsed",n),n.$inject=["$animateCss","$timeout"]}(),function(){"use strict";function n(n,e){function o(o,t,i,r){function a(e){var o=l?l:t[0].scrollHeight+"px";t.addClass("md-hide md-overflow"),t.removeClass("md-show md-scroll-y");var i={from:{"max-height":o,opacity:1},to:{"max-height":"48px",opacity:0}};e.animation===!1&&(i.duration=0),n(t,i).start().then(function(){t.css("display","none"),t.removeClass("md-hide")})}function s(o){t.css("display",""),t.addClass("md-show md-overflow");var i=l?l:t[0].scrollHeight+"px",r={from:{"max-height":"48px",opacity:0},to:{"max-height":i,opacity:1}};o.animation===!1&&(r.duration=0),n(t,r).start().then(function(){void 0!==l?t.addClass("md-scroll-y"):(t.css("transition","none"),t.css("max-height","none"),e(function(){t.css("transition","")},0)),t.removeClass("md-overflow")})}var l=i.height||void 0;void 0!==l&&(l=l.replace("px","")+"px"),r.registerExpanded({show:s,hide:a,setHeight:void 0!==l,$element:t})}var t={restrict:"E",require:"^^mdExpansionPanel",link:o};return t}angular.module("material.components.expansionPanels").directive("mdExpansionPanelExpanded",n),n.$inject=["$animateCss","$timeout"]}(),function(){"use strict";function n(){function n(n,e,o,t){function i(){}function r(){l()}function a(n,o,i){var r,a,s=e[0].getBoundingClientRect();s.bottom>o?(r=u[0].offsetHeight,a=o-r-i,a<e[0].parentNode.getBoundingClientRect().top&&(a=e[0].parentNode.getBoundingClientRect().top),u.css("width",t.$element[0].offsetWidth+"px"),e.css("height",r+"px"),u.css("top",a+"px"),e.addClass("md-stick"),c=!0):c===!0&&l()}function s(n){c!==!1&&u.css("width",n+"px")}function l(){c=!1,u.css("width",""),u.css("top",""),e.css("height",""),e.removeClass("md-stick")}var c=!1,d=void 0!==o.mdNoSticky,u=angular.element(e[0].querySelector(".md-expansion-panel-footer-container"));t.registerFooter({show:i,hide:r,onScroll:a,onResize:s,noSticky:d})}var e={restrict:"E",transclude:!0,template:'<div class="md-expansion-panel-footer-container" ng-transclude></div>',require:"^^mdExpansionPanel",link:n};return e}angular.module("material.components.expansionPanels").directive("mdExpansionPanelFooter",n)}(),function(){"use strict";function n(){function n(n,e,o,t){function i(n){return E.push(n),function(){E.splice(E.indexOf(n),1)}}function r(){var n=u();E.forEach(function(e){e(n)})}function a(n,e){y[n]=e,P===!0&&(e.expand(),p(n)),r()}function s(n){p(n)}function l(n,e){return y[n].remove(e)}function c(n){Object.keys(y).forEach(function(e){y[e].remove(n)})}function d(n){delete y[n],r()}function u(){return Object.keys(y).length}function p(n){w===!1&&Object.keys(y).forEach(function(e){e!==n&&y[e].collapse()})}function m(n,e){if(void 0!==$[n])throw Error('$mdExpansionPanelGroup.register() The name "'+n+'" has already been registered');$[n]=e}function f(n){if(void 0===$[n])throw Error('$mdExpansionPanelGroup.addPanel() Cannot find Panel with name of "'+n+'"');return $[n]}function v(){return Object.keys(y).map(function(n){return y[n]})}function h(){return Object.keys(y).map(function(n){return y[n]}).filter(function(n){return n.isOpen()})}function g(n){var e=n!==!0;Object.keys(y).forEach(function(n){y[n].collapse({animation:e})})}var x,C=this,$={},y={},E=[],w=void 0!==e.mdMultiple||void 0!==e.multiple,P=void 0!==e.mdAutoExpand||void 0!==e.autoExpand;x=t.register({$element:o,register:m,getRegistered:f,getAll:v,getOpen:h,remove:l,removeAll:c,collapseAll:g,onChange:i,count:u},e.mdComponentId),C.addPanel=a,C.expandPanel=s,C.removePanel=d,n.$on("$destroy",function(){"function"==typeof x&&(x(),x=void 0),Object.keys(y).forEach(function(n){y[n].destroy()})})}var e={restrict:"E",controller:["$scope","$attrs","$element","$mdComponentRegistry",n]};return e}angular.module("material.components.expansionPanels").directive("mdExpansionPanelGroup",n)}(),function(){"use strict";function n(n,e,o,t,i,r,a,s,l){function c(o){var t=n.get(o);return t?u(t):void l.error(e.supplant(p,[o||""]))}function d(e){var o=s.defer();return n.when(e).then(function(n){o.resolve(u(n))})["catch"](function(n){o.reject(),l.error(n)}),o.promise}function u(n){function l(e,o){if("string"!=typeof e)throw Error("$mdExpansionPanelGroup.register() Expects name to be a string");g(o),n.register(e,o)}function c(e,o){return n.remove(e,o)}function d(e){n.removeAll(e)}function u(e){return n.onChange(e)}function p(){return n.count()}function m(){return n.getAll()}function f(){return n.getOpen()}function v(e){n.collapseAll(e)}function h(t,l){if(l=l||{},"string"==typeof t)return h(n.getRegistered(t),l);if(g(t),t.componentId&&n.isPanelActive(t.componentId))return s.reject('panel with componentId "'+t.componentId+'" is currently active');var c=s.defer(),d=i.$new();return angular.extend(d,t.scope),x(t,function(i){var s=angular.element(i),u=t.componentId||s.attr("md-component-id")||"_panelComponentId_"+e.nextUid(),p=o().waitFor(u);s.attr("md-component-id",u);var m=r(s);if(t.controller){angular.extend(l,t.locals||{}),l.$scope=d,l.$panel=p;var f=a(t.controller,l,!0),v=f();s.data("$ngControllerController",v),s.children().data("$ngControllerController",v),t.controllerAs&&(d[t.controllerAs]=v)}n.$element.append(s),m(d),p.then(function(n){c.resolve(n)})}),c.promise}function g(n){if("object"!=typeof n||null===n)throw Error("$mdExapnsionPanelGroup.add()/.register() : Requires an options object to be passed in");if(!n.template&&!n.templateUrl)throw Error("$mdExapnsionPanelGroup.add()/.register() : Is missing required paramters to create. Required One of the following: template, templateUrl")}function x(n,e){void 0!==n.templateUrl?t(n.templateUrl).then(function(n){e(n)}):e(n.template)}var C={add:h,register:l,getAll:m,getOpen:f,remove:c,removeAll:d,collapseAll:v,onChange:u,count:p};return C}var p="ExpansionPanelGroup '{0}' is not available! Did you use md-component-id='{0}'?",m={find:c,waitFor:d};return function(n){return void 0===n?m:c(n)}}angular.module("material.components.expansionPanels").factory("$mdExpansionPanelGroup",n),n.$inject=["$mdComponentRegistry","$mdUtil","$mdExpansionPanel","$templateRequest","$rootScope","$compile","$controller","$q","$log"]}(),function(){"use strict";function n(){function n(n,e,o,t){function i(){}function r(){l()}function a(n,o,t){var i,r,a=e[0].getBoundingClientRect();a.top<n?(i=n-t,r=e[0].parentNode.getBoundingClientRect().bottom-n-a.height,r<0&&(i+=r),u.css("width",e[0].offsetWidth+"px"),u.css("top",i+"px"),e.css("height",u[0].offsetHeight+"px"),e.removeClass("md-no-stick"),e.addClass("md-stick"),c=!0):c===!0&&l()}function s(n){c!==!1&&u.css("width",n+"px")}function l(){c=!1,u.css("width",""),e.css("height",""),e.css("top",""),e.removeClass("md-stick"),e.addClass("md-no-stick")}var c=!1,d=void 0!==o.mdNoSticky,u=angular.element(e[0].querySelector(".md-expansion-panel-header-container"));t.registerHeader({show:i,hide:r,noSticky:d,onScroll:a,onResize:s})}var e={restrict:"E",transclude:!0,template:'<div class="md-expansion-panel-header-container" ng-transclude></div>',require:"^^mdExpansionPanel",link:n};return e}angular.module("material.components.expansionPanels").directive("mdExpansionPanelHeader",n),n.$inject=[]}(),function(){"use strict";function n(){var n={restrict:"E",template:'<md-icon class="md-expansion-panel-icon" md-svg-icon="icons/ic_keyboard_arrow_right_black_24px.svg"></md-icon>',replace:!0};return n}angular.module("material.components.expansionPanels").directive("mdExpansionPanelIcon",n)}();;!function(e){function t(u){if(n[u])return n[u].exports;var d=n[u]={exports:{},id:u,loaded:!1};return e[u].call(d.exports,d,d.exports,t),d.loaded=!0,d.exports}var n={};return t.m=e,t.c=n,t.oe=function(e){throw e},t.p="",t(t.s=4)}([function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var d=n(6),i=u(d),r=n(5),o=u(r),a=function(){return{restrict:"E",scope:{locked:"@?mdLocked"},replace:!0,transclude:!0,template:i.default,link:o.default}};t.default={name:"mdSidemenu",directive:a}},function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var d=n(7),i=u(d),r=n(8),o=u(r),a=function(){return{restrict:"E",scope:{uiSref:"@?",uiSrefActive:"@?",href:"@?",target:"@?"},transclude:!0,template:o.default,controller:i.default,controllerAs:"$mdSidemenuButton",bindToController:!0}};t.default={name:"mdSidemenuButton",directive:a}},function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var d=n(9),i=u(d),r=n(10),o=u(r),a=function(){return{restrict:"E",scope:{heading:"@mdHeading",icon:"@?mdIcon",arrow:"@?mdArrow"},replace:!0,transclude:!0,template:o.default,controller:i.default,controllerAs:"$mdSidemenuContent",bindToController:!0}};t.default={name:"mdSidemenuContent",directive:a}},function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var d=n(11),i=u(d),r=function(){return{restrict:"E",replace:!0,transclude:!0,template:i.default}};t.default={name:"mdSidemenuGroup",directive:r}},function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}var d=n(0),i=u(d),r=n(3),o=u(r),a=n(2),c=u(a),l=n(1),s=u(l);!function(e){e.module("ngMaterialSidemenu",["ngMaterial"]).directive(i.default.name,i.default.directive).directive(o.default.name,o.default.directive).directive(c.default.name,c.default.directive).directive(s.default.name,s.default.directive)}(angular)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){e.$watch(function(){return n.locked},function(e){e?t[0].classList.add("md-sidemenu-locked"):t[0].classList.remove("md-sidemenu-locked")})}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=t.locked&&"md-sidemenu-locked";return'<div class="md-sidemenu '+n+'" ng-transclude></div>'}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'\n    <md-button\n      class="md-sidemenu-button"\n      layout="column"\n      ng-attr-href="{{ $mdSidemenuButton.href }}"\n      ng-attr-ui-sref="{{ $mdSidemenuButton.uiSref }}"\n      ng-attr-ui-sref-active="{{ $mdSidemenuButton.uiSrefActive }}"\n      ng-attr-target="{{ $mdSidemenuButton.target }}">\n      <div layout="row" layout-fill layout-align="start center" ng-transclude></div>\n    </md-button>\n  '}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){this.visible=!1,this.changeState=function(){this.visible=!this.visible}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'\n    <div class="md-sidemenu-content" layout="column">\n      <md-button class="md-sidemenu-toggle" ng-if="$mdSidemenuContent.heading" ng-click="$mdSidemenuContent.changeState();" ng-class="{ \'md-active\': $mdSidemenuContent.visible }">\n        <div layout="row">\n          <md-icon ng-if="$mdSidemenuContent.icon">{{ $mdSidemenuContent.icon }}</md-icon>\n          <span flex>{{ $mdSidemenuContent.heading }}</span>\n          <md-icon ng-if="$mdSidemenuContent.arrow">keyboard_arrow_down</md-icon>\n        </div>\n      </md-button>\n\n      <div class="md-sidemenu-wrapper" md-sidemenu-disable-animate ng-class="{ \'md-active\': $mdSidemenuContent.visible, \'md-sidemenu-wrapper-icons\':  $mdSidemenuContent.icon }" layout="column" ng-transclude></div>\n    </div>\n  '}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="md-sidemenu-group" flex layout="column" layout-align="start start" ng-transclude></div>'}}]);
;/*
 AngularJS v1.4.4
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(A,h,B){'use strict';function v(h){return["$animate",function(q){return{restrict:"AE",transclude:"element",terminal:!0,require:"^^ngMessages",link:function(m,e,a,g,k){var c=e[0],n,l=a.ngMessage||a.when;a=a.ngMessageExp||a.whenExp;var p=function(d){n=d?w(d)?d:d.split(/[\s,]+/):null;g.reRender()};a?(p(m.$eval(a)),m.$watchCollection(a,p)):p(l);var f,r;g.register(c,r={test:function(d){var b=n;d=b?w(b)?0<=b.indexOf(d):b.hasOwnProperty(d):void 0;return d},attach:function(){f||k(m,function(d){q.enter(d,
null,e);f=d;f.on("$destroy",function(){f&&(g.deregister(c),r.detach())})})},detach:function(){if(f){var d=f;f=null;q.leave(d)}}})}}}]}var w=h.isArray,x=h.forEach,y=h.isString,z=h.element;h.module("ngMessages",[]).directive("ngMessages",["$animate",function(h){function q(e,a){return y(a)&&0===a.length||m(e.$eval(a))}function m(e){return y(e)?e.length:!!e}return{require:"ngMessages",restrict:"AE",controller:["$element","$scope","$attrs",function(e,a,g){function k(a,d){for(var b=d,e=[];b&&b!==a;){var c=
b.$$ngMessageNode;if(c&&c.length)return l[c];b.childNodes.length&&-1==e.indexOf(b)?(e.push(b),b=b.childNodes[b.childNodes.length-1]):b=b.previousSibling||b.parentNode}}var c=this,n=0,l=this.messages={},p,f;this.render=function(r){r=r||{};p=!1;f=r;for(var d=q(a,g.ngMessagesMultiple)||q(a,g.multiple),b=[],n={},s=c.head,k=!1,l=0;null!=s;){l++;var t=s.message,u=!1;k||x(r,function(b,a){!u&&m(b)&&t.test(a)&&!n[a]&&(u=n[a]=!0,t.attach())});u?k=!d:b.push(t);s=s.next}x(b,function(b){b.detach()});b.length!==
l?h.setClass(e,"ng-active","ng-inactive"):h.setClass(e,"ng-inactive","ng-active")};a.$watchCollection(g.ngMessages||g["for"],c.render);this.reRender=function(){p||(p=!0,a.$evalAsync(function(){p&&f&&c.render(f)}))};this.register=function(a,d){var b=n.toString();l[b]={message:d};var g=e[0],f=l[b];c.head?(g=k(g,a))?(f.next=g.next,g.next=f):(f.next=c.head,c.head=f):c.head=f;a.$$ngMessageNode=b;n++;c.reRender()};this.deregister=function(a){var d=a.$$ngMessageNode;delete a.$$ngMessageNode;var b=l[d];(a=
k(e[0],a))?a.next=b.next:c.head=b.next;delete l[d];c.reRender()}}]}}]).directive("ngMessagesInclude",["$templateRequest","$document","$compile",function(h,q,m){return{restrict:"AE",require:"^^ngMessages",link:function(e,a,g){var k=g.ngMessagesInclude||g.src;h(k).then(function(c){m(c)(e,function(c){a.after(c);c=z(q[0].createComment(" ngMessagesInclude: "+k+" "));a.after(c);a.remove()})})}}}]).directive("ngMessage",v("AE")).directive("ngMessageExp",v("A"))})(window,window.angular);
;/*
 AngularJS v1.4.4
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(I,d,B){'use strict';function D(f,q){q=q||{};d.forEach(q,function(d,h){delete q[h]});for(var h in f)!f.hasOwnProperty(h)||"$"===h.charAt(0)&&"$"===h.charAt(1)||(q[h]=f[h]);return q}var x=d.$$minErr("$resource"),C=/^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;d.module("ngResource",["ng"]).provider("$resource",function(){var f=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}};
this.$get=["$http","$q",function(q,h){function u(d,g){this.template=d;this.defaults=s({},f.defaults,g);this.urlParams={}}function w(y,g,l,m){function c(b,k){var c={};k=s({},g,k);r(k,function(a,k){v(a)&&(a=a());var d;if(a&&a.charAt&&"@"==a.charAt(0)){d=b;var e=a.substr(1);if(null==e||""===e||"hasOwnProperty"===e||!C.test("."+e))throw x("badmember",e);for(var e=e.split("."),n=0,g=e.length;n<g&&d!==B;n++){var h=e[n];d=null!==d?d[h]:B}}else d=a;c[k]=d});return c}function F(b){return b.resource}function e(b){D(b||
{},this)}var G=new u(y,m);l=s({},f.defaults.actions,l);e.prototype.toJSON=function(){var b=s({},this);delete b.$promise;delete b.$resolved;return b};r(l,function(b,k){var g=/^(POST|PUT|PATCH)$/i.test(b.method);e[k]=function(a,z,m,y){var n={},f,l,A;switch(arguments.length){case 4:A=y,l=m;case 3:case 2:if(v(z)){if(v(a)){l=a;A=z;break}l=z;A=m}else{n=a;f=z;l=m;break}case 1:v(a)?l=a:g?f=a:n=a;break;case 0:break;default:throw x("badargs",arguments.length);}var u=this instanceof e,p=u?f:b.isArray?[]:new e(f),
t={},w=b.interceptor&&b.interceptor.response||F,C=b.interceptor&&b.interceptor.responseError||B;r(b,function(b,a){"params"!=a&&"isArray"!=a&&"interceptor"!=a&&(t[a]=H(b))});g&&(t.data=f);G.setUrlParams(t,s({},c(f,b.params||{}),n),b.url);n=q(t).then(function(a){var c=a.data,g=p.$promise;if(c){if(d.isArray(c)!==!!b.isArray)throw x("badcfg",k,b.isArray?"array":"object",d.isArray(c)?"array":"object",t.method,t.url);b.isArray?(p.length=0,r(c,function(a){"object"===typeof a?p.push(new e(a)):p.push(a)})):
(D(c,p),p.$promise=g)}p.$resolved=!0;a.resource=p;return a},function(a){p.$resolved=!0;(A||E)(a);return h.reject(a)});n=n.then(function(a){var b=w(a);(l||E)(b,a.headers);return b},C);return u?n:(p.$promise=n,p.$resolved=!1,p)};e.prototype["$"+k]=function(a,b,c){v(a)&&(c=b,b=a,a={});a=e[k].call(this,a,this,b,c);return a.$promise||a}});e.bind=function(b){return w(y,s({},g,b),l)};return e}var E=d.noop,r=d.forEach,s=d.extend,H=d.copy,v=d.isFunction;u.prototype={setUrlParams:function(f,g,l){var m=this,
c=l||m.template,h,e,q=m.urlParams={};r(c.split(/\W/),function(b){if("hasOwnProperty"===b)throw x("badname");!/^\d+$/.test(b)&&b&&(new RegExp("(^|[^\\\\]):"+b+"(\\W|$)")).test(c)&&(q[b]=!0)});c=c.replace(/\\:/g,":");g=g||{};r(m.urlParams,function(b,k){h=g.hasOwnProperty(k)?g[k]:m.defaults[k];d.isDefined(h)&&null!==h?(e=encodeURIComponent(h).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"%20").replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,
"+"),c=c.replace(new RegExp(":"+k+"(\\W|$)","g"),function(b,a){return e+a})):c=c.replace(new RegExp("(/?):"+k+"(\\W|$)","g"),function(b,a,c){return"/"==c.charAt(0)?c:a+c})});m.defaults.stripTrailingSlashes&&(c=c.replace(/\/+$/,"")||"/");c=c.replace(/\/\.(?=\w+($|\?))/,".");f.url=c.replace(/\/\\\./,"/.");r(g,function(b,c){m.urlParams[c]||(f.params=f.params||{},f.params[c]=b)})}};return w}]})})(window,window.angular);
;/*
 AngularJS v1.4.4
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,c,C){'use strict';function v(r,h,g){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,f,b,d,y){function z(){k&&(g.cancel(k),k=null);l&&(l.$destroy(),l=null);m&&(k=g.leave(m),k.then(function(){k=null}),m=null)}function x(){var b=r.current&&r.current.locals;if(c.isDefined(b&&b.$template)){var b=a.$new(),d=r.current;m=y(b,function(b){g.enter(b,null,m||f).then(function(){!c.isDefined(t)||t&&!a.$eval(t)||h()});z()});l=d.scope=b;l.$emit("$viewContentLoaded");
l.$eval(w)}else z()}var l,m,k,t=b.autoscroll,w=b.onload||"";a.$on("$routeChangeSuccess",x);x()}}}function A(c,h,g){return{restrict:"ECA",priority:-400,link:function(a,f){var b=g.current,d=b.locals;f.html(d.$template);var y=c(f.contents());b.controller&&(d.$scope=a,d=h(b.controller,d),b.controllerAs&&(a[b.controllerAs]=d),f.data("$ngControllerController",d),f.children().data("$ngControllerController",d));y(a)}}}p=c.module("ngRoute",["ng"]).provider("$route",function(){function r(a,f){return c.extend(Object.create(a),
f)}function h(a,c){var b=c.caseInsensitiveMatch,d={originalPath:a,regexp:a},g=d.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,c,b,d){a="?"===d?d:null;d="*"===d?d:null;g.push({name:b,optional:!!a});c=c||"";return""+(a?"":c)+"(?:"+(a?c:"")+(d&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");d.regexp=new RegExp("^"+a+"$",b?"i":"");return d}var g={};this.when=function(a,f){var b=c.copy(f);c.isUndefined(b.reloadOnSearch)&&(b.reloadOnSearch=!0);
c.isUndefined(b.caseInsensitiveMatch)&&(b.caseInsensitiveMatch=this.caseInsensitiveMatch);g[a]=c.extend(b,a&&h(a,b));if(a){var d="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";g[d]=c.extend({redirectTo:a},h(d,b))}return this};this.caseInsensitiveMatch=!1;this.otherwise=function(a){"string"===typeof a&&(a={redirectTo:a});this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(a,f,b,d,h,p,x){function l(b){var e=s.current;
(v=(n=k())&&e&&n.$$route===e.$$route&&c.equals(n.pathParams,e.pathParams)&&!n.reloadOnSearch&&!w)||!e&&!n||a.$broadcast("$routeChangeStart",n,e).defaultPrevented&&b&&b.preventDefault()}function m(){var u=s.current,e=n;if(v)u.params=e.params,c.copy(u.params,b),a.$broadcast("$routeUpdate",u);else if(e||u)w=!1,(s.current=e)&&e.redirectTo&&(c.isString(e.redirectTo)?f.path(t(e.redirectTo,e.params)).search(e.params).replace():f.url(e.redirectTo(e.pathParams,f.path(),f.search())).replace()),d.when(e).then(function(){if(e){var a=
c.extend({},e.resolve),b,f;c.forEach(a,function(b,e){a[e]=c.isString(b)?h.get(b):h.invoke(b,null,null,e)});c.isDefined(b=e.template)?c.isFunction(b)&&(b=b(e.params)):c.isDefined(f=e.templateUrl)&&(c.isFunction(f)&&(f=f(e.params)),c.isDefined(f)&&(e.loadedTemplateUrl=x.valueOf(f),b=p(f)));c.isDefined(b)&&(a.$template=b);return d.all(a)}}).then(function(f){e==s.current&&(e&&(e.locals=f,c.copy(e.params,b)),a.$broadcast("$routeChangeSuccess",e,u))},function(b){e==s.current&&a.$broadcast("$routeChangeError",
e,u,b)})}function k(){var a,b;c.forEach(g,function(d,g){var q;if(q=!b){var h=f.path();q=d.keys;var l={};if(d.regexp)if(h=d.regexp.exec(h)){for(var k=1,m=h.length;k<m;++k){var n=q[k-1],p=h[k];n&&p&&(l[n.name]=p)}q=l}else q=null;else q=null;q=a=q}q&&(b=r(d,{params:c.extend({},f.search(),a),pathParams:a}),b.$$route=d)});return b||g[null]&&r(g[null],{params:{},pathParams:{}})}function t(a,b){var d=[];c.forEach((a||"").split(":"),function(a,c){if(0===c)d.push(a);else{var f=a.match(/(\w+)(?:[?*])?(.*)/),
g=f[1];d.push(b[g]);d.push(f[2]||"");delete b[g]}});return d.join("")}var w=!1,n,v,s={routes:g,reload:function(){w=!0;a.$evalAsync(function(){l();m()})},updateParams:function(a){if(this.current&&this.current.$$route)a=c.extend({},this.current.params,a),f.path(t(this.current.$$route.originalPath,a)),f.search(a);else throw B("norout");}};a.$on("$locationChangeStart",l);a.$on("$locationChangeSuccess",m);return s}]});var B=c.$$minErr("ngRoute");p.provider("$routeParams",function(){this.$get=function(){return{}}});
p.directive("ngView",v);p.directive("ngView",A);v.$inject=["$route","$anchorScroll","$animate"];A.$inject=["$compile","$controller","$route"]})(window,window.angular);
;/*!
 * angular-ui-mask
 * https://github.com/angular-ui/ui-mask
 * Version: 1.8.7 - 2016-07-26T16:01:23.393Z
 * License: MIT
 */
!function(){"use strict";angular.module("ui.mask",[]).value("uiMaskConfig",{maskDefinitions:{9:/\d/,A:/[a-zA-Z]/,"*":/[a-zA-Z0-9]/},clearOnBlur:!0,clearOnBlurPlaceholder:!1,escChar:"\\",eventsToHandle:["input","keyup","click","focus"],addDefaultPlaceholder:!0,allowInvalidValue:!1}).provider("uiMask.Config",function(){var e={};this.maskDefinitions=function(n){return e.maskDefinitions=n},this.clearOnBlur=function(n){return e.clearOnBlur=n},this.clearOnBlurPlaceholder=function(n){return e.clearOnBlurPlaceholder=n},this.eventsToHandle=function(n){return e.eventsToHandle=n},this.addDefaultPlaceholder=function(n){return e.addDefaultPlaceholder=n},this.allowInvalidValue=function(n){return e.allowInvalidValue=n},this.$get=["uiMaskConfig",function(n){var t=n;for(var a in e)angular.isObject(e[a])&&!angular.isArray(e[a])?angular.extend(t[a],e[a]):t[a]=e[a];return t}]}).directive("uiMask",["uiMask.Config",function(e){function n(e){return e===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(e.type||e.href||~e.tabIndex)}return{priority:100,require:"ngModel",restrict:"A",compile:function(){var t=angular.copy(e);return function(e,a,i,r){function l(e){return angular.isDefined(e)?(w(e),L?(h(),d(),!0):f()):f()}function u(e){e&&(B=e,!L||0===a.val().length&&angular.isDefined(i.placeholder)||a.val(m(p(a.val()))))}function o(){return l(i.uiMask)}function c(e){return L?(j=p(e||""),R=g(j),r.$setValidity("mask",R),j.length&&(R||Q.allowInvalidValue)?m(j):void 0):e}function s(e){return L?(j=p(e||""),R=g(j),r.$viewValue=j.length?m(j):"",r.$setValidity("mask",R),R||Q.allowInvalidValue?J?r.$viewValue:j:void 0):e}function f(){return L=!1,v(),angular.isDefined(q)?a.attr("placeholder",q):a.removeAttr("placeholder"),angular.isDefined(W)?a.attr("maxlength",W):a.removeAttr("maxlength"),a.val(r.$modelValue),r.$viewValue=r.$modelValue,!1}function h(){j=F=p(r.$modelValue||""),H=_=m(j),R=g(j),i.maxlength&&a.attr("maxlength",2*S[S.length-1]),!q&&Q.addDefaultPlaceholder&&a.attr("placeholder",B);for(var e=r.$modelValue,n=r.$formatters.length;n--;)e=r.$formatters[n](e);r.$viewValue=e||"",r.$render()}function d(){Z||(a.bind("blur",$),a.bind("mousedown mouseup",V),a.bind("keydown",E),a.bind(Q.eventsToHandle.join(" "),O),Z=!0)}function v(){Z&&(a.unbind("blur",$),a.unbind("mousedown",V),a.unbind("mouseup",V),a.unbind("keydown",E),a.unbind("input",O),a.unbind("keyup",O),a.unbind("click",O),a.unbind("focus",O),Z=!1)}function g(e){return e.length?e.length>=T:!0}function p(e){var n,t,i="",r=a[0],l=A.slice(),u=N,o=u+C(r),c="";return e=e.toString(),n=0,t=e.length-B.length,angular.forEach(I,function(a){var i=a.position;i>=u&&o>i||(i>=u&&(i+=t),e.substring(i,i+a.value.length)===a.value&&(c+=e.slice(n,i),n=i+a.value.length))}),e=c+e.slice(n),angular.forEach(e.split(""),function(e){l.length&&l[0].test(e)&&(i+=e,l.shift())}),i}function m(e){var n="",t=S.slice();return angular.forEach(B.split(""),function(a,i){e.length&&i===t[0]?(n+=e.charAt(0)||"_",e=e.substr(1),t.shift()):n+=a}),n}function b(e){var n,t=angular.isDefined(i.uiMaskPlaceholder)?i.uiMaskPlaceholder:i.placeholder;return angular.isDefined(t)&&t[e]?t[e]:(n=angular.isDefined(i.uiMaskPlaceholderChar)&&i.uiMaskPlaceholderChar?i.uiMaskPlaceholderChar:"_","space"===n.toLowerCase()?" ":n[0])}function k(){var e,n,t=B.split("");S&&!isNaN(S[0])&&angular.forEach(S,function(e){t[e]="_"}),e=t.join(""),n=e.replace(/[_]+/g,"_").split("_"),n=n.filter(function(e){return""!==e});var a=0;return n.map(function(n){var t=e.indexOf(n,a);return a=t+1,{value:n,position:t}})}function w(e){var n=0;if(S=[],A=[],B="",angular.isString(e)){T=0;var t=!1,a=0,i=e.split(""),r=!1;angular.forEach(i,function(e,i){r?(r=!1,B+=e,n++):Q.escChar===e?r=!0:Q.maskDefinitions[e]?(S.push(n),B+=b(i-a),A.push(Q.maskDefinitions[e]),n++,t||T++,t=!1):"?"===e?(t=!0,a++):(B+=e,n++)})}S.push(S.slice().pop()+1),I=k(),L=S.length>1?!0:!1}function $(){if((Q.clearOnBlur||Q.clearOnBlurPlaceholder&&0===j.length&&i.placeholder)&&(N=0,z=0,R&&0!==j.length||(H="",a.val(""),e.$apply(function(){r.$pristine||r.$setViewValue("")}))),j!==U){var n=a.val(),t=""===j&&n&&angular.isDefined(i.uiMaskPlaceholderChar)&&"space"===i.uiMaskPlaceholderChar;t&&a.val(""),y(a[0]),t&&a.val(n)}U=j}function y(e){var n;angular.isFunction(window.Event)&&!e.fireEvent?(n=new Event("change",{view:window,bubbles:!0,cancelable:!1}),e.dispatchEvent(n)):"createEvent"in document?(n=document.createEvent("HTMLEvents"),n.initEvent("change",!1,!0),e.dispatchEvent(n)):e.fireEvent&&e.fireEvent("onchange")}function V(e){"mousedown"===e.type?a.bind("mouseout",M):a.unbind("mouseout",M)}function M(){z=C(this),a.unbind("mouseout",M)}function E(e){var n=8===e.which,t=P(this)-1||0,i=90===e.which&&e.ctrlKey;if(n){for(;t>=0;){if(D(t)){x(this,t+1);break}t--}K=-1===t}i&&(a.val(""),e.preventDefault())}function O(n){n=n||{};var t=n.which,i=n.type;if(16!==t&&91!==t){var l,u=a.val(),o=_,c=!1,s=p(u),f=F,h=P(this)||0,d=N||0,v=h-d,g=S[0],b=S[s.length]||S.slice().shift(),k=z||0,w=C(this)>0,$=k>0,y=u.length>o.length||k&&u.length>o.length-k,V=u.length<o.length||k&&u.length===o.length-k,M=t>=37&&40>=t&&n.shiftKey,E=37===t,O=8===t||"keyup"!==i&&V&&-1===v,A=46===t||"keyup"!==i&&V&&0===v&&!$,I=(E||O||"click"===i)&&h>g;if(z=C(this),!M&&(!w||"click"!==i&&"keyup"!==i&&"focus"!==i)){if(O&&K)return a.val(B),e.$apply(function(){r.$setViewValue("")}),void x(this,d);if("input"===i&&V&&!$&&s===f){for(;O&&h>g&&!D(h);)h--;for(;A&&b>h&&-1===S.indexOf(h);)h++;var T=S.indexOf(h);s=s.substring(0,T)+s.substring(T+1),s!==f&&(c=!0)}for(l=m(s),_=l,F=s,!c&&u.length>l.length&&(c=!0),a.val(l),c&&e.$apply(function(){r.$setViewValue(l)}),y&&g>=h&&(h=g+1),I&&h--,h=h>b?b:g>h?g:h;!D(h)&&h>g&&b>h;)h+=I?-1:1;(I&&b>h||y&&!D(d))&&h++,N=h,x(this,h)}}}function D(e){return S.indexOf(e)>-1}function P(e){if(!e)return 0;if(void 0!==e.selectionStart)return e.selectionStart;if(document.selection&&n(a[0])){e.focus();var t=document.selection.createRange();return t.moveStart("character",e.value?-e.value.length:0),t.text.length}return 0}function x(e,t){if(!e)return 0;if(0!==e.offsetWidth&&0!==e.offsetHeight)if(e.setSelectionRange)n(a[0])&&(e.focus(),e.setSelectionRange(t,t));else if(e.createTextRange){var i=e.createTextRange();i.collapse(!0),i.moveEnd("character",t),i.moveStart("character",t),i.select()}}function C(e){return e?void 0!==e.selectionStart?e.selectionEnd-e.selectionStart:window.getSelection?window.getSelection().toString().length:document.selection?document.selection.createRange().text.length:0:0}var S,A,B,I,T,j,H,R,_,F,N,z,K,L=!1,Z=!1,q=i.placeholder,W=i.maxlength,G=r.$isEmpty;r.$isEmpty=function(e){return G(L?p(e||""):e)};var J=!1;i.$observe("modelViewValue",function(e){"true"===e&&(J=!0)}),i.$observe("allowInvalidValue",function(e){Q.allowInvalidValue=""===e?!0:!!e,c(r.$modelValue)});var Q={};i.uiOptions?(Q=e.$eval("["+i.uiOptions+"]"),Q=angular.isObject(Q[0])?function(e,n){for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(void 0===n[t]?n[t]=angular.copy(e[t]):angular.isObject(n[t])&&!angular.isArray(n[t])&&(n[t]=angular.extend({},e[t],n[t])));return n}(t,Q[0]):t):Q=t,i.$observe("uiMask",l),angular.isDefined(i.uiMaskPlaceholder)?i.$observe("uiMaskPlaceholder",u):i.$observe("placeholder",u),angular.isDefined(i.uiMaskPlaceholderChar)&&i.$observe("uiMaskPlaceholderChar",o),r.$formatters.unshift(c),r.$parsers.unshift(s);var U=a.val();a.bind("mousedown mouseup",V),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){if(null===this)throw new TypeError;var n=Object(this),t=n.length>>>0;if(0===t)return-1;var a=0;if(arguments.length>1&&(a=Number(arguments[1]),a!==a?a=0:0!==a&&a!==1/0&&a!==-(1/0)&&(a=(a>0||-1)*Math.floor(Math.abs(a)))),a>=t)return-1;for(var i=a>=0?a:Math.max(t-Math.abs(a),0);t>i;i++)if(i in n&&n[i]===e)return i;return-1})}}}}])}();;!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("angular")):"function"==typeof define&&define.amd?define("ng-currency",["angular"],n):"object"==typeof exports?exports["ng-currency"]=n(require("angular")):e["ng-currency"]=n(e.angular)}(this,function(e){return function(e){function n(t){if(r[t])return r[t].exports;var u=r[t]={i:t,l:!1,exports:{}};return e[t].call(u.exports,u,u.exports,n),u.l=!0,u.exports}var r={};return n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:t})},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=0)}([function(e,n,r){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var u=r(1),o=t(u),i=r(2),a=t(i),c=r(3),f=t(c),l=o.default.module("ng-currency",[]);l.provider("ngCurrencySettings",a.default),l.directive("ngCurrency",f.default),n.default=l.name},function(n,r){n.exports=e},function(e,n,r){"use strict";function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var u=function(){function e(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,r,t){return r&&e(n.prototype,r),t&&e(n,t),n}}(),o=function(){function e(){t(this,e),this._defaults={fraction:2,hardCap:!1,min:void 0,max:void 0,currencySymbol:void 0}}return u(e,[{key:"$get",value:function(){var e=this;return{get defaults(){return e.defaults}}}},{key:"defaults",get:function(){return this._defaults},set:function(e){this._defaults=e}}]),e}();n.default=o},function(e,n,r){"use strict";function t(e,n,r,t){return{require:"ngModel",link:function(u,o,i,a){function c(){if(h){var e=void 0,n=void 0,r=void 0;if(a.$options&&(a.$options.getOption?(n=a.$options.getOption("updateOn"),r=a.$options.getOption("debounce")):(n=a.$options.updateOn,r=a.$options.debounce)),"blur"===n||r){e=a.$viewValue;for(var t=a.$parsers.length-1;t>=0;t--)e=a.$parsers[t](e)}else e=a.$$rawModelValue;for(var u=a.$formatters.length-1;u>=0;u--)e=a.$formatters[u](e);a.$viewValue=e,a.$render()}}function f(){if(a.$validate(),h){var e=l(a.$$rawModelValue);e!==a.$$rawModelValue&&(a.$setViewValue(e.toFixed(x)),a.$commitViewValue(),c())}}function l(e){return g&&(void 0!==y&&e>y?e=y:void 0!==b&&e<b&&(e=b)),e}function d(e){return RegExp("\\d|\\-|\\"+e,"g")}function s(e){return RegExp("\\-{0,1}((\\"+e+")|([0-9]{1,}\\"+e+"?))&?[0-9]{0,"+x+"}","g")}function v(r){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];r=String(r);var u=n.NUMBER_FORMATS.DECIMAL_SEP,o=null,i=e("currency")("-1",p(),x),a=RegExp("[0-9."+u+n.NUMBER_FORMATS.GROUP_SEP+"]+");return i.replace(a.exec(i),"")===r.replace(a.exec(r),"")&&(r="-"+a.exec(r)),RegExp("^-[\\s]*$","g").test(r)&&(r="-0"),d(u).test(r)&&(o=r.match(d(u)).join("").match(s(u))||[""],o=o[0],o=t?o.replace(u,"."):o),o||null}function p(){return void 0===m?n.NUMBER_FORMATS.CURRENCY_SYM:m}var $=t.defaults,g=$.hardCap,b=$.min,y=$.max,m=$.currencySymbol,x=$.fraction,O=i.required,h=!0;i.$observe("ngCurrency",function(e){h="false"!==e,h?c():(a.$viewValue=a.$$rawModelValue,a.$render())}),i.$observe("hardCap",function(e){g="true"===e,f()}),i.$observe("min",function(e){b=e?Number(e):void 0,f()}),i.$observe("max",function(e){y=e?Number(e):void 0,f()}),i.$observe("currencySymbol",function(e){m=e,c()}),i.$observe("required",function(e){O=e,f()}),i.$observe("fraction",function(e){x=e||2,c(),f()}),r(function(){u.$emit("currencyRedraw")}),a.$parsers.push(function(e){return h&&-1===[void 0,null,""].indexOf(e)?(e=v(e),e=l(Number(e))):e}),a.$formatters.push(function(n){return h&&-1===[void 0,null,""].indexOf(n)?e("currency")(n,p(),x):n}),a.$validators.min=function(e){return!(O||-1===[void 0,null,""].indexOf(e)&&!isNaN(e))||(!h||-1!==[void 0,null].indexOf(b)||isNaN(b)||e>=b)},a.$validators.max=function(e){return!(O||-1===[void 0,null,""].indexOf(e)&&!isNaN(e))||(!h||-1!==[void 0,null].indexOf(y)||isNaN(y)||e<=y)},a.$validators.fraction=function(e){return!h||!e||!isNaN(e)},u.$on("currencyRedraw",function(){f(),c()}),o.bind("focus",function(){if(h){var e=v(a.$viewValue,!1);a.$viewValue!==e&&(a.$viewValue=e,a.$render(),o.triggerHandler("focus"))}}),o.bind("blur",c)}}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=t,t.$inject=["$filter","$locale","$timeout","ngCurrencySettings"]}])});;/*! 12.2.13 */
!window.XMLHttpRequest||window.FileAPI&&FileAPI.shouldLoad||(window.XMLHttpRequest.prototype.setRequestHeader=function(a){return function(b,c){if("__setXHR_"===b){var d=c(this);d instanceof Function&&d(this)}else a.apply(this,arguments)}}(window.XMLHttpRequest.prototype.setRequestHeader));var ngFileUpload=angular.module("ngFileUpload",[]);ngFileUpload.version="12.2.13",ngFileUpload.service("UploadBase",["$http","$q","$timeout",function(a,b,c){function d(d){function e(a){j.notify&&j.notify(a),k.progressFunc&&c(function(){k.progressFunc(a)})}function h(a){return null!=d._start&&g?{loaded:a.loaded+d._start,total:d._file&&d._file.size||a.total,type:a.type,config:d,lengthComputable:!0,target:a.target}:a}function i(){a(d).then(function(a){if(g&&d._chunkSize&&!d._finished&&d._file){var b=d._file&&d._file.size||0;e({loaded:Math.min(d._end,b),total:b,config:d,type:"progress"}),f.upload(d,!0)}else d._finished&&delete d._finished,j.resolve(a)},function(a){j.reject(a)},function(a){j.notify(a)})}d.method=d.method||"POST",d.headers=d.headers||{};var j=d._deferred=d._deferred||b.defer(),k=j.promise;return d.disableProgress||(d.headers.__setXHR_=function(){return function(a){a&&a.upload&&a.upload.addEventListener&&(d.__XHR=a,d.xhrFn&&d.xhrFn(a),a.upload.addEventListener("progress",function(a){a.config=d,e(h(a))},!1),a.upload.addEventListener("load",function(a){a.lengthComputable&&(a.config=d,e(h(a)))},!1))}}),g?d._chunkSize&&d._end&&!d._finished?(d._start=d._end,d._end+=d._chunkSize,i()):d.resumeSizeUrl?a.get(d.resumeSizeUrl).then(function(a){d._start=d.resumeSizeResponseReader?d.resumeSizeResponseReader(a.data):parseInt((null==a.data.size?a.data:a.data.size).toString()),d._chunkSize&&(d._end=d._start+d._chunkSize),i()},function(a){throw a}):d.resumeSize?d.resumeSize().then(function(a){d._start=a,d._chunkSize&&(d._end=d._start+d._chunkSize),i()},function(a){throw a}):(d._chunkSize&&(d._start=0,d._end=d._start+d._chunkSize),i()):i(),k.success=function(a){return k.then(function(b){a(b.data,b.status,b.headers,d)}),k},k.error=function(a){return k.then(null,function(b){a(b.data,b.status,b.headers,d)}),k},k.progress=function(a){return k.progressFunc=a,k.then(null,null,function(b){a(b)}),k},k.abort=k.pause=function(){return d.__XHR&&c(function(){d.__XHR.abort()}),k},k.xhr=function(a){return d.xhrFn=function(b){return function(){b&&b.apply(k,arguments),a.apply(k,arguments)}}(d.xhrFn),k},f.promisesCount++,k["finally"]&&k["finally"]instanceof Function&&k["finally"](function(){f.promisesCount--}),k}function e(a){var b={};for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}var f=this;f.promisesCount=0,this.isResumeSupported=function(){return window.Blob&&window.Blob.prototype.slice};var g=this.isResumeSupported();this.isUploadInProgress=function(){return f.promisesCount>0},this.rename=function(a,b){return a.ngfName=b,a},this.jsonBlob=function(a){null==a||angular.isString(a)||(a=JSON.stringify(a));var b=new window.Blob([a],{type:"application/json"});return b._ngfBlob=!0,b},this.json=function(a){return angular.toJson(a)},this.isFile=function(a){return null!=a&&(a instanceof window.Blob||a.flashId&&a.name&&a.size)},this.upload=function(a,b){function c(b,c){if(b._ngfBlob)return b;if(a._file=a._file||b,null!=a._start&&g){a._end&&a._end>=b.size&&(a._finished=!0,a._end=b.size);var d=b.slice(a._start,a._end||b.size);return d.name=b.name,d.ngfName=b.ngfName,a._chunkSize&&(c.append("_chunkSize",a._chunkSize),c.append("_currentChunkSize",a._end-a._start),c.append("_chunkNumber",Math.floor(a._start/a._chunkSize)),c.append("_totalSize",a._file.size)),d}return b}function h(b,d,e){if(void 0!==d)if(angular.isDate(d)&&(d=d.toISOString()),angular.isString(d))b.append(e,d);else if(f.isFile(d)){var g=c(d,b),i=e.split(",");i[1]&&(g.ngfName=i[1].replace(/^\s+|\s+$/g,""),e=i[0]),a._fileKey=a._fileKey||e,b.append(e,g,g.ngfName||g.name)}else if(angular.isObject(d)){if(d.$$ngfCircularDetection)throw"ngFileUpload: Circular reference in config.data. Make sure specified data for Upload.upload() has no circular reference: "+e;d.$$ngfCircularDetection=!0;try{for(var j in d)if(d.hasOwnProperty(j)&&"$$ngfCircularDetection"!==j){var k=null==a.objectKey?"[i]":a.objectKey;d.length&&parseInt(j)>-1&&(k=null==a.arrayKey?k:a.arrayKey),h(b,d[j],e+k.replace(/[ik]/g,j))}}finally{delete d.$$ngfCircularDetection}}else b.append(e,d)}function i(){a._chunkSize=f.translateScalars(a.resumeChunkSize),a._chunkSize=a._chunkSize?parseInt(a._chunkSize.toString()):null,a.headers=a.headers||{},a.headers["Content-Type"]=void 0,a.transformRequest=a.transformRequest?angular.isArray(a.transformRequest)?a.transformRequest:[a.transformRequest]:[],a.transformRequest.push(function(b){var c,d=new window.FormData;b=b||a.fields||{},a.file&&(b.file=a.file);for(c in b)if(b.hasOwnProperty(c)){var e=b[c];a.formDataAppender?a.formDataAppender(d,c,e):h(d,e,c)}return d})}return b||(a=e(a)),a._isDigested||(a._isDigested=!0,i()),d(a)},this.http=function(b){return b=e(b),b.transformRequest=b.transformRequest||function(b){return window.ArrayBuffer&&b instanceof window.ArrayBuffer||b instanceof window.Blob?b:a.defaults.transformRequest[0].apply(this,arguments)},b._chunkSize=f.translateScalars(b.resumeChunkSize),b._chunkSize=b._chunkSize?parseInt(b._chunkSize.toString()):null,d(b)},this.translateScalars=function(a){if(angular.isString(a)){if(a.search(/kb/i)===a.length-2)return parseFloat(1024*a.substring(0,a.length-2));if(a.search(/mb/i)===a.length-2)return parseFloat(1048576*a.substring(0,a.length-2));if(a.search(/gb/i)===a.length-2)return parseFloat(1073741824*a.substring(0,a.length-2));if(a.search(/b/i)===a.length-1)return parseFloat(a.substring(0,a.length-1));if(a.search(/s/i)===a.length-1)return parseFloat(a.substring(0,a.length-1));if(a.search(/m/i)===a.length-1)return parseFloat(60*a.substring(0,a.length-1));if(a.search(/h/i)===a.length-1)return parseFloat(3600*a.substring(0,a.length-1))}return a},this.urlToBlob=function(c){var d=b.defer();return a({url:c,method:"get",responseType:"arraybuffer"}).then(function(a){var b=new Uint8Array(a.data),e=a.headers("content-type")||"image/WebP",f=new window.Blob([b],{type:e}),g=c.match(/.*\/(.+?)(\?.*)?$/);g.length>1&&(f.name=g[1]),d.resolve(f)},function(a){d.reject(a)}),d.promise},this.setDefaults=function(a){this.defaults=a||{}},this.defaults={},this.version=ngFileUpload.version}]),ngFileUpload.service("Upload",["$parse","$timeout","$compile","$q","UploadExif",function(a,b,c,d,e){function f(a,b,c){var e=[i.emptyPromise()];return angular.forEach(a,function(d,f){0===d.type.indexOf("image/jpeg")&&i.attrGetter("ngfFixOrientation",b,c,{$file:d})&&e.push(i.happyPromise(i.applyExifRotation(d),d).then(function(b){a.splice(f,1,b)}))}),d.all(e)}function g(a,b,c,e){var f=i.attrGetter("ngfResize",b,c);if(!f||!i.isResizeSupported()||!a.length)return i.emptyPromise();if(f instanceof Function){var g=d.defer();return f(a).then(function(d){h(d,a,b,c,e).then(function(a){g.resolve(a)},function(a){g.reject(a)})},function(a){g.reject(a)})}return h(f,a,b,c,e)}function h(a,b,c,e,f){function g(d,g){if(0===d.type.indexOf("image")){if(a.pattern&&!i.validatePattern(d,a.pattern))return;a.resizeIf=function(a,b){return i.attrGetter("ngfResizeIf",c,e,{$width:a,$height:b,$file:d})};var j=i.resize(d,a);h.push(j),j.then(function(a){b.splice(g,1,a)},function(a){d.$error="resize",(d.$errorMessages=d.$errorMessages||{}).resize=!0,d.$errorParam=(a?(a.message?a.message:a)+": ":"")+(d&&d.name),f.$ngfValidations.push({name:"resize",valid:!1}),i.applyModelValidation(f,b)})}}for(var h=[i.emptyPromise()],j=0;j<b.length;j++)g(b[j],j);return d.all(h)}var i=e;return i.getAttrWithDefaults=function(a,b){if(null!=a[b])return a[b];var c=i.defaults[b];return null==c?c:angular.isString(c)?c:JSON.stringify(c)},i.attrGetter=function(b,c,d,e){var f=this.getAttrWithDefaults(c,b);if(!d)return f;try{return e?a(f)(d,e):a(f)(d)}catch(g){if(b.search(/min|max|pattern/i))return f;throw g}},i.shouldUpdateOn=function(a,b,c){var d=i.attrGetter("ngfModelOptions",b,c);return d&&d.updateOn?d.updateOn.split(" ").indexOf(a)>-1:!0},i.emptyPromise=function(){var a=d.defer(),c=arguments;return b(function(){a.resolve.apply(a,c)}),a.promise},i.rejectPromise=function(){var a=d.defer(),c=arguments;return b(function(){a.reject.apply(a,c)}),a.promise},i.happyPromise=function(a,c){var e=d.defer();return a.then(function(a){e.resolve(a)},function(a){b(function(){throw a}),e.resolve(c)}),e.promise},i.updateModel=function(c,d,e,h,j,k,l){function m(f,g,j,l,m){d.$$ngfPrevValidFiles=f,d.$$ngfPrevInvalidFiles=g;var n=f&&f.length?f[0]:null,o=g&&g.length?g[0]:null;c&&(i.applyModelValidation(c,f),c.$setViewValue(m?n:f)),h&&a(h)(e,{$files:f,$file:n,$newFiles:j,$duplicateFiles:l,$invalidFiles:g,$invalidFile:o,$event:k});var p=i.attrGetter("ngfModelInvalid",d);p&&b(function(){a(p).assign(e,m?o:g)}),b(function(){})}function n(){function a(a,b){return a.name===b.name&&(a.$ngfOrigSize||a.size)===(b.$ngfOrigSize||b.size)&&a.type===b.type}function b(b){var c;for(c=0;c<r.length;c++)if(a(b,r[c]))return!0;for(c=0;c<s.length;c++)if(a(b,s[c]))return!0;return!1}if(j){q=[],t=[];for(var c=0;c<j.length;c++)b(j[c])?t.push(j[c]):q.push(j[c])}}function o(a){return angular.isArray(a)?a:[a]}function p(){function a(){b(function(){m(w?r.concat(v):v,w?s.concat(u):u,j,t,x)},z&&z.debounce?z.debounce.change||z.debounce:0)}var f=y?q:v;g(f,d,e,c).then(function(){y?i.validate(q,w?r.length:0,c,d,e).then(function(b){v=b.validsFiles,u=b.invalidsFiles,a()}):a()},function(){for(var b=0;b<f.length;b++){var c=f[b];if("resize"===c.$error){var d=v.indexOf(c);d>-1&&(v.splice(d,1),u.push(c)),a()}}})}var q,r,s,t=[],u=[],v=[];r=d.$$ngfPrevValidFiles||[],s=d.$$ngfPrevInvalidFiles||[],c&&c.$modelValue&&(r=o(c.$modelValue));var w=i.attrGetter("ngfKeep",d,e);q=(j||[]).slice(0),("distinct"===w||i.attrGetter("ngfKeepDistinct",d,e)===!0)&&n(d,e);var x=!w&&!i.attrGetter("ngfMultiple",d,e)&&!i.attrGetter("multiple",d);if(!w||q.length){i.attrGetter("ngfBeforeModelChange",d,e,{$files:j,$file:j&&j.length?j[0]:null,$newFiles:q,$duplicateFiles:t,$event:k});var y=i.attrGetter("ngfValidateAfterResize",d,e),z=i.attrGetter("ngfModelOptions",d,e);i.validate(q,w?r.length:0,c,d,e).then(function(a){l?m(q,[],j,t,x):(z&&z.allowInvalid||y?v=q:(v=a.validFiles,u=a.invalidFiles),i.attrGetter("ngfFixOrientation",d,e)&&i.isExifSupported()?f(v,d,e).then(function(){p()}):p())})}},i}]),ngFileUpload.directive("ngfSelect",["$parse","$timeout","$compile","Upload",function(a,b,c,d){function e(a){var b=a.match(/Android[^\d]*(\d+)\.(\d+)/);if(b&&b.length>2){var c=d.defaults.androidFixMinorVersion||4;return parseInt(b[1])<4||parseInt(b[1])===c&&parseInt(b[2])<c}return-1===a.indexOf("Chrome")&&/.*Windows.*Safari.*/.test(a)}function f(a,b,c,d,f,h,i,j){function k(){return"input"===b[0].tagName.toLowerCase()&&c.type&&"file"===c.type.toLowerCase()}function l(){return t("ngfChange")||t("ngfSelect")}function m(b){if(j.shouldUpdateOn("change",c,a)){var e=b.__files_||b.target&&b.target.files,f=[];if(!e)return;for(var g=0;g<e.length;g++)f.push(e[g]);j.updateModel(d,c,a,l(),f.length?f:null,b)}}function n(a,d){function e(b){a.attr("id","ngf-"+b),d.attr("id","ngf-label-"+b)}for(var f=0;f<b[0].attributes.length;f++){var g=b[0].attributes[f];"type"!==g.name&&"class"!==g.name&&"style"!==g.name&&("id"===g.name?(e(g.value),u.push(c.$observe("id",e))):a.attr(g.name,g.value||"required"!==g.name&&"multiple"!==g.name?g.value:g.name))}}function o(){if(k())return b;var a=angular.element('<input type="file">'),c=angular.element("<label>upload</label>");return c.css("visibility","hidden").css("position","absolute").css("overflow","hidden").css("width","0px").css("height","0px").css("border","none").css("margin","0px").css("padding","0px").attr("tabindex","-1"),n(a,c),g.push({el:b,ref:c}),document.body.appendChild(c.append(a)[0]),a}function p(c){if(b.attr("disabled"))return!1;if(!t("ngfSelectDisabled",a)){var d=q(c);if(null!=d)return d;r(c);try{k()||document.body.contains(x[0])||(g.push({el:b,ref:x.parent()}),document.body.appendChild(x.parent()[0]),x.bind("change",m))}catch(f){}return e(navigator.userAgent)?setTimeout(function(){x[0].click()},0):x[0].click(),!1}}function q(a){var b=a.changedTouches||a.originalEvent&&a.originalEvent.changedTouches;if(b){if("touchstart"===a.type)return w=b[0].clientX,v=b[0].clientY,!0;if("touchend"===a.type){var c=b[0].clientX,d=b[0].clientY;if(Math.abs(c-w)>20||Math.abs(d-v)>20)return a.stopPropagation(),a.preventDefault(),!1}return!0}}function r(b){j.shouldUpdateOn("click",c,a)&&x.val()&&(x.val(null),j.updateModel(d,c,a,l(),null,b,!0))}function s(a){if(x&&!x.attr("__ngf_ie10_Fix_")){if(!x[0].parentNode)return void(x=null);a.preventDefault(),a.stopPropagation(),x.unbind("click");var b=x.clone();return x.replaceWith(b),x=b,x.attr("__ngf_ie10_Fix_","true"),x.bind("change",m),x.bind("click",s),x[0].click(),!1}x.removeAttr("__ngf_ie10_Fix_")}var t=function(a,b){return j.attrGetter(a,c,b)};j.registerModelChangeValidator(d,c,a);var u=[];t("ngfMultiple")&&u.push(a.$watch(t("ngfMultiple"),function(){x.attr("multiple",t("ngfMultiple",a))})),t("ngfCapture")&&u.push(a.$watch(t("ngfCapture"),function(){x.attr("capture",t("ngfCapture",a))})),t("ngfAccept")&&u.push(a.$watch(t("ngfAccept"),function(){x.attr("accept",t("ngfAccept",a))})),u.push(c.$observe("accept",function(){x.attr("accept",t("accept"))}));var v=0,w=0,x=b;k()||(x=o()),x.bind("change",m),k()?b.bind("click",r):b.bind("click touchstart touchend",p),-1!==navigator.appVersion.indexOf("MSIE 10")&&x.bind("click",s),d&&d.$formatters.push(function(a){return(null==a||0===a.length)&&x.val()&&x.val(null),a}),a.$on("$destroy",function(){k()||x.parent().remove(),angular.forEach(u,function(a){a()})}),h(function(){for(var a=0;a<g.length;a++){var b=g[a];document.body.contains(b.el[0])||(g.splice(a,1),b.ref.remove())}}),window.FileAPI&&window.FileAPI.ngfFixIE&&window.FileAPI.ngfFixIE(b,x,m)}var g=[];return{restrict:"AEC",require:"?ngModel",link:function(e,g,h,i){f(e,g,h,i,a,b,c,d)}}}]),function(){function a(a){return"img"===a.tagName.toLowerCase()?"image":"audio"===a.tagName.toLowerCase()?"audio":"video"===a.tagName.toLowerCase()?"video":/./}function b(b,c,d,e,f,g,h,i){function j(a){var g=b.attrGetter("ngfNoObjectUrl",f,d);b.dataUrl(a,g)["finally"](function(){c(function(){var b=(g?a.$ngfDataUrl:a.$ngfBlobUrl)||a.$ngfDataUrl;i?e.css("background-image","url('"+(b||"")+"')"):e.attr("src",b),b?e.removeClass("ng-hide"):e.addClass("ng-hide")})})}c(function(){var c=d.$watch(f[g],function(c){var k=h;if("ngfThumbnail"===g&&(k||(k={width:e[0].naturalWidth||e[0].clientWidth,height:e[0].naturalHeight||e[0].clientHeight}),0===k.width&&window.getComputedStyle)){var l=getComputedStyle(e[0]);l.width&&l.width.indexOf("px")>-1&&l.height&&l.height.indexOf("px")>-1&&(k={width:parseInt(l.width.slice(0,-2)),height:parseInt(l.height.slice(0,-2))})}return angular.isString(c)?(e.removeClass("ng-hide"),i?e.css("background-image","url('"+c+"')"):e.attr("src",c)):void(!c||!c.type||0!==c.type.search(a(e[0]))||i&&0!==c.type.indexOf("image")?e.addClass("ng-hide"):k&&b.isResizeSupported()?(k.resizeIf=function(a,e){return b.attrGetter("ngfResizeIf",f,d,{$width:a,$height:e,$file:c})},b.resize(c,k).then(function(a){j(a)},function(a){throw a})):j(c))});d.$on("$destroy",function(){c()})})}ngFileUpload.service("UploadDataUrl",["UploadBase","$timeout","$q",function(a,b,c){var d=a;return d.base64DataUrl=function(a){if(angular.isArray(a)){var b=c.defer(),e=0;return angular.forEach(a,function(c){d.dataUrl(c,!0)["finally"](function(){if(e++,e===a.length){var c=[];angular.forEach(a,function(a){c.push(a.$ngfDataUrl)}),b.resolve(c,a)}})}),b.promise}return d.dataUrl(a,!0)},d.dataUrl=function(a,e){if(!a)return d.emptyPromise(a,a);if(e&&null!=a.$ngfDataUrl||!e&&null!=a.$ngfBlobUrl)return d.emptyPromise(e?a.$ngfDataUrl:a.$ngfBlobUrl,a);var f=e?a.$$ngfDataUrlPromise:a.$$ngfBlobUrlPromise;if(f)return f;var g=c.defer();return b(function(){if(window.FileReader&&a&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 8")||a.size<2e4)&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 9")||a.size<4e6)){var c=window.URL||window.webkitURL;if(c&&c.createObjectURL&&!e){var f;try{f=c.createObjectURL(a)}catch(h){return void b(function(){a.$ngfBlobUrl="",g.reject()})}b(function(){if(a.$ngfBlobUrl=f,f){g.resolve(f,a),d.blobUrls=d.blobUrls||[],d.blobUrlsTotalSize=d.blobUrlsTotalSize||0,d.blobUrls.push({url:f,size:a.size}),d.blobUrlsTotalSize+=a.size||0;for(var b=d.defaults.blobUrlsMaxMemory||268435456,e=d.defaults.blobUrlsMaxQueueSize||200;(d.blobUrlsTotalSize>b||d.blobUrls.length>e)&&d.blobUrls.length>1;){var h=d.blobUrls.splice(0,1)[0];c.revokeObjectURL(h.url),d.blobUrlsTotalSize-=h.size}}})}else{var i=new FileReader;i.onload=function(c){b(function(){a.$ngfDataUrl=c.target.result,g.resolve(c.target.result,a),b(function(){delete a.$ngfDataUrl},1e3)})},i.onerror=function(){b(function(){a.$ngfDataUrl="",g.reject()})},i.readAsDataURL(a)}}else b(function(){a[e?"$ngfDataUrl":"$ngfBlobUrl"]="",g.reject()})}),f=e?a.$$ngfDataUrlPromise=g.promise:a.$$ngfBlobUrlPromise=g.promise,f["finally"](function(){delete a[e?"$$ngfDataUrlPromise":"$$ngfBlobUrlPromise"]}),f},d}]),ngFileUpload.directive("ngfSrc",["Upload","$timeout",function(a,c){return{restrict:"AE",link:function(d,e,f){b(a,c,d,e,f,"ngfSrc",a.attrGetter("ngfResize",f,d),!1)}}}]),ngFileUpload.directive("ngfBackground",["Upload","$timeout",function(a,c){return{restrict:"AE",link:function(d,e,f){b(a,c,d,e,f,"ngfBackground",a.attrGetter("ngfResize",f,d),!0)}}}]),ngFileUpload.directive("ngfThumbnail",["Upload","$timeout",function(a,c){return{restrict:"AE",link:function(d,e,f){var g=a.attrGetter("ngfSize",f,d);b(a,c,d,e,f,"ngfThumbnail",g,a.attrGetter("ngfAsBackground",f,d))}}}]),ngFileUpload.config(["$compileProvider",function(a){a.imgSrcSanitizationWhitelist&&a.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|webcal|local|file|data|blob):/),a.aHrefSanitizationWhitelist&&a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|webcal|local|file|data|blob):/)}]),ngFileUpload.filter("ngfDataUrl",["UploadDataUrl","$sce",function(a,b){return function(c,d,e){if(angular.isString(c))return b.trustAsResourceUrl(c);var f=c&&((d?c.$ngfDataUrl:c.$ngfBlobUrl)||c.$ngfDataUrl);return c&&!f?(!c.$ngfDataUrlFilterInProgress&&angular.isObject(c)&&(c.$ngfDataUrlFilterInProgress=!0,a.dataUrl(c,d)),""):(c&&delete c.$ngfDataUrlFilterInProgress,(c&&f?e?b.trustAsResourceUrl(f):f:c)||"")}}])}(),ngFileUpload.service("UploadValidate",["UploadDataUrl","$q","$timeout",function(a,b,c){function d(a){var b="",c=[];if(a.length>2&&"/"===a[0]&&"/"===a[a.length-1])b=a.substring(1,a.length-1);else{var e=a.split(",");if(e.length>1)for(var f=0;f<e.length;f++){var g=d(e[f]);g.regexp?(b+="("+g.regexp+")",f<e.length-1&&(b+="|")):c=c.concat(g.excludes)}else 0===a.indexOf("!")?c.push("^((?!"+d(a.substring(1)).regexp+").)*$"):(0===a.indexOf(".")&&(a="*"+a),b="^"+a.replace(new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]","g"),"\\$&")+"$",b=b.replace(/\\\*/g,".*").replace(/\\\?/g,"."))}return{regexp:b,excludes:c}}function e(a,b){null==b||a.$dirty||(a.$setDirty?a.$setDirty():a.$dirty=!0)}var f=a;return f.validatePattern=function(a,b){if(!b)return!0;var c=d(b),e=!0;if(c.regexp&&c.regexp.length){var f=new RegExp(c.regexp,"i");e=null!=a.type&&f.test(a.type)||null!=a.name&&f.test(a.name)}for(var g=c.excludes.length;g--;){var h=new RegExp(c.excludes[g],"i");e=e&&(null==a.type||h.test(a.type))&&(null==a.name||h.test(a.name))}return e},f.ratioToFloat=function(a){var b=a.toString(),c=b.search(/[x:]/i);return b=c>-1?parseFloat(b.substring(0,c))/parseFloat(b.substring(c+1)):parseFloat(b)},f.registerModelChangeValidator=function(a,b,c){a&&a.$formatters.push(function(d){if(a.$dirty){var e=d;d&&!angular.isArray(d)&&(e=[d]),f.validate(e,0,a,b,c).then(function(){f.applyModelValidation(a,e)})}return d})},f.applyModelValidation=function(a,b){e(a,b),angular.forEach(a.$ngfValidations,function(b){a.$setValidity(b.name,b.valid)})},f.getValidationAttr=function(a,b,c,d,e){var g="ngf"+c[0].toUpperCase()+c.substr(1),h=f.attrGetter(g,a,b,{$file:e});if(null==h&&(h=f.attrGetter("ngfValidate",a,b,{$file:e}))){var i=(d||c).split(".");h=h[i[0]],i.length>1&&(h=h&&h[i[1]])}return h},f.validate=function(a,c,d,e,g){function h(b,c,h){if(a){for(var i=a.length,j=null;i--;){var n=a[i];if(n){var o=f.getValidationAttr(e,g,b,c,n);null!=o&&(h(n,o,i)||(-1===k.indexOf(b)?(n.$error=b,(n.$errorMessages=n.$errorMessages||{})[b]=!0,n.$errorParam=o,-1===m.indexOf(n)&&m.push(n),l||a.splice(i,1),j=!1):a.splice(i,1)))}}null!==j&&d.$ngfValidations.push({name:b,valid:j})}}function i(c,h,i,n,o){function p(b,d,e){function f(f){if(f())if(-1===k.indexOf(c)){if(d.$error=c,(d.$errorMessages=d.$errorMessages||{})[c]=!0,d.$errorParam=e,-1===m.indexOf(d)&&m.push(d),!l){var g=a.indexOf(d);g>-1&&a.splice(g,1)}b.resolve(!1)}else{var h=a.indexOf(d);h>-1&&a.splice(h,1),b.resolve(!0)}else b.resolve(!0)}null!=e?n(d,e).then(function(a){f(function(){return!o(a,e)})},function(){f(function(){return j("ngfValidateForce",{$file:d})})}):b.resolve(!0)}var q=[f.emptyPromise(!0)];a&&(a=void 0===a.length?[a]:a,angular.forEach(a,function(a){var d=b.defer();return q.push(d.promise),!i||null!=a.type&&0===a.type.search(i)?void("dimensions"===c&&null!=f.attrGetter("ngfDimensions",e)?f.imageDimensions(a).then(function(b){p(d,a,j("ngfDimensions",{$file:a,$width:b.width,$height:b.height}))},function(){d.resolve(!1)}):"duration"===c&&null!=f.attrGetter("ngfDuration",e)?f.mediaDuration(a).then(function(b){p(d,a,j("ngfDuration",{$file:a,$duration:b}))},function(){d.resolve(!1)}):p(d,a,f.getValidationAttr(e,g,c,h,a))):void d.resolve(!0)}));var r=b.defer();return b.all(q).then(function(a){for(var b=!0,e=0;e<a.length;e++)if(!a[e]){b=!1;break}d.$ngfValidations.push({name:c,valid:b}),r.resolve(b)}),r.promise}d=d||{},d.$ngfValidations=d.$ngfValidations||[],angular.forEach(d.$ngfValidations,function(a){a.valid=!0});var j=function(a,b){return f.attrGetter(a,e,g,b)},k=(f.attrGetter("ngfIgnoreInvalid",e,g)||"").split(" "),l=f.attrGetter("ngfRunAllValidations",e,g);if(null==a||0===a.length)return f.emptyPromise({validFiles:a,invalidFiles:[]});a=void 0===a.length?[a]:a.slice(0);var m=[];h("pattern",null,f.validatePattern),h("minSize","size.min",function(a,b){return a.size+.1>=f.translateScalars(b)}),h("maxSize","size.max",function(a,b){return a.size-.1<=f.translateScalars(b)});var n=0;if(h("maxTotalSize",null,function(b,c){return n+=b.size,n>f.translateScalars(c)?(a.splice(0,a.length),!1):!0}),h("validateFn",null,function(a,b){return b===!0||null===b||""===b}),!a.length)return f.emptyPromise({validFiles:[],invalidFiles:m});var o=b.defer(),p=[];return p.push(i("maxHeight","height.max",/image/,this.imageDimensions,function(a,b){return a.height<=b})),p.push(i("minHeight","height.min",/image/,this.imageDimensions,function(a,b){return a.height>=b})),p.push(i("maxWidth","width.max",/image/,this.imageDimensions,function(a,b){return a.width<=b})),p.push(i("minWidth","width.min",/image/,this.imageDimensions,function(a,b){return a.width>=b})),p.push(i("dimensions",null,/image/,function(a,b){return f.emptyPromise(b)},function(a){return a})),p.push(i("ratio",null,/image/,this.imageDimensions,function(a,b){for(var c=b.toString().split(","),d=!1,e=0;e<c.length;e++)Math.abs(a.width/a.height-f.ratioToFloat(c[e]))<.01&&(d=!0);return d})),p.push(i("maxRatio","ratio.max",/image/,this.imageDimensions,function(a,b){return a.width/a.height-f.ratioToFloat(b)<1e-4})),p.push(i("minRatio","ratio.min",/image/,this.imageDimensions,function(a,b){return a.width/a.height-f.ratioToFloat(b)>-1e-4})),p.push(i("maxDuration","duration.max",/audio|video/,this.mediaDuration,function(a,b){return a<=f.translateScalars(b)})),p.push(i("minDuration","duration.min",/audio|video/,this.mediaDuration,function(a,b){return a>=f.translateScalars(b)})),p.push(i("duration",null,/audio|video/,function(a,b){return f.emptyPromise(b)},function(a){return a})),p.push(i("validateAsyncFn",null,null,function(a,b){return b},function(a){return a===!0||null===a||""===a})),b.all(p).then(function(){if(l)for(var b=0;b<a.length;b++){var d=a[b];d.$error&&a.splice(b--,1)}l=!1,h("maxFiles",null,function(a,b,d){return b>c+d}),o.resolve({validFiles:a,invalidFiles:m})}),o.promise},f.imageDimensions=function(a){if(a.$ngfWidth&&a.$ngfHeight){var d=b.defer();return c(function(){d.resolve({width:a.$ngfWidth,height:a.$ngfHeight})}),d.promise}if(a.$ngfDimensionPromise)return a.$ngfDimensionPromise;var e=b.defer();return c(function(){return 0!==a.type.indexOf("image")?void e.reject("not image"):void f.dataUrl(a).then(function(b){function d(){var b=h[0].naturalWidth||h[0].clientWidth,c=h[0].naturalHeight||h[0].clientHeight;h.remove(),a.$ngfWidth=b,a.$ngfHeight=c,e.resolve({width:b,height:c})}function f(){h.remove(),e.reject("load error")}function g(){c(function(){h[0].parentNode&&(h[0].clientWidth?d():i++>10?f():g())},1e3)}var h=angular.element("<img>").attr("src",b).css("visibility","hidden").css("position","fixed").css("max-width","none !important").css("max-height","none !important");h.on("load",d),h.on("error",f);var i=0;g(),angular.element(document.getElementsByTagName("body")[0]).append(h)},function(){e.reject("load error")})}),a.$ngfDimensionPromise=e.promise,a.$ngfDimensionPromise["finally"](function(){delete a.$ngfDimensionPromise}),a.$ngfDimensionPromise},f.mediaDuration=function(a){if(a.$ngfDuration){var d=b.defer();return c(function(){d.resolve(a.$ngfDuration)}),d.promise}if(a.$ngfDurationPromise)return a.$ngfDurationPromise;var e=b.defer();return c(function(){return 0!==a.type.indexOf("audio")&&0!==a.type.indexOf("video")?void e.reject("not media"):void f.dataUrl(a).then(function(b){function d(){var b=h[0].duration;a.$ngfDuration=b,h.remove(),e.resolve(b)}function f(){h.remove(),e.reject("load error")}function g(){c(function(){h[0].parentNode&&(h[0].duration?d():i>10?f():g())},1e3)}var h=angular.element(0===a.type.indexOf("audio")?"<audio>":"<video>").attr("src",b).css("visibility","none").css("position","fixed");h.on("loadedmetadata",d),h.on("error",f);var i=0;g(),angular.element(document.body).append(h)},function(){e.reject("load error")})}),a.$ngfDurationPromise=e.promise,a.$ngfDurationPromise["finally"](function(){delete a.$ngfDurationPromise}),a.$ngfDurationPromise},f}]),ngFileUpload.service("UploadResize",["UploadValidate","$q",function(a,b){var c=a,d=function(a,b,c,d,e){var f=e?Math.max(c/a,d/b):Math.min(c/a,d/b);return{width:a*f,height:b*f,marginX:a*f-c,marginY:b*f-d}},e=function(a,e,f,g,h,i,j,k){var l=b.defer(),m=document.createElement("canvas"),n=document.createElement("img");return n.setAttribute("style","visibility:hidden;position:fixed;z-index:-100000"),document.body.appendChild(n),n.onload=function(){var a=n.width,b=n.height;if(n.parentNode.removeChild(n),null!=k&&k(a,b)===!1)return void l.reject("resizeIf");try{if(i){var o=c.ratioToFloat(i),p=a/b;o>p?(e=a,f=e/o):(f=b,e=f*o)}e||(e=a),f||(f=b);var q=d(a,b,e,f,j);m.width=Math.min(q.width,e),m.height=Math.min(q.height,f);var r=m.getContext("2d");r.drawImage(n,Math.min(0,-q.marginX/2),Math.min(0,-q.marginY/2),q.width,q.height),l.resolve(m.toDataURL(h||"image/WebP",g||.934))}catch(s){l.reject(s)}},n.onerror=function(){n.parentNode.removeChild(n),l.reject()},n.src=a,l.promise};return c.dataUrltoBlob=function(a,b,c){for(var d=a.split(","),e=d[0].match(/:(.*?);/)[1],f=atob(d[1]),g=f.length,h=new Uint8Array(g);g--;)h[g]=f.charCodeAt(g);var i=new window.Blob([h],{type:e});return i.name=b,i.$ngfOrigSize=c,i},c.isResizeSupported=function(){var a=document.createElement("canvas");return window.atob&&a.getContext&&a.getContext("2d")&&window.Blob},c.isResizeSupported()&&Object.defineProperty(window.Blob.prototype,"name",{get:function(){return this.$ngfName},set:function(a){this.$ngfName=a},configurable:!0}),c.resize=function(a,d){if(0!==a.type.indexOf("image"))return c.emptyPromise(a);var f=b.defer();return c.dataUrl(a,!0).then(function(b){e(b,d.width,d.height,d.quality,d.type||a.type,d.ratio,d.centerCrop,d.resizeIf).then(function(e){if("image/jpeg"===a.type&&d.restoreExif!==!1)try{e=c.restoreExif(b,e)}catch(g){setTimeout(function(){throw g},1)}try{var h=c.dataUrltoBlob(e,a.name,a.size);f.resolve(h)}catch(g){f.reject(g)}},function(b){"resizeIf"===b&&f.resolve(a),f.reject(b)})},function(a){f.reject(a)}),f.promise},c}]),function(){function a(a,c,d,e,f,g,h,i,j,k){function l(){return c.attr("disabled")||s("ngfDropDisabled",a)}function m(b,c,d){if(b){var e;try{e=b&&b.getData&&b.getData("text/html")}catch(f){}q(b.items,b.files,s("ngfAllowDir",a)!==!1,s("multiple")||s("ngfMultiple",a)).then(function(a){a.length?n(a,c):o(d,e).then(function(a){n(a,c)})})}}function n(b,c){i.updateModel(e,d,a,s("ngfChange")||s("ngfDrop"),b,c)}function o(b,c){if(!i.shouldUpdateOn(b,d,a)||"string"!=typeof c)return i.rejectPromise([]);var e=[];c.replace(/<(img src|img [^>]* src) *=\"([^\"]*)\"/gi,function(a,b,c){e.push(c)});var f=[],g=[];if(e.length){angular.forEach(e,function(a){f.push(i.urlToBlob(a).then(function(a){g.push(a)}))});var h=k.defer();return k.all(f).then(function(){h.resolve(g)},function(a){h.reject(a)}),h.promise}return i.emptyPromise()}function p(a,b,c,d){var e=s("ngfDragOverClass",a,{$event:c}),f="dragover";if(angular.isString(e))f=e;else if(e&&(e.delay&&(w=e.delay),e.accept||e.reject)){var g=c.dataTransfer.items;if(null!=g&&g.length)for(var h=e.pattern||s("ngfPattern",a,{$event:c}),j=g.length;j--;){if(!i.validatePattern(g[j],h)){f=e.reject;break}f=e.accept}else f=e.accept}d(f)}function q(b,c,e,f){function g(a,b){var c=k.defer();if(null!=a)if(a.isDirectory){var d=[i.emptyPromise()];if(m){var e={type:"directory"};e.name=e.path=(b||"")+a.name,n.push(e)}var f=a.createReader(),h=[],p=function(){f.readEntries(function(e){try{e.length?(h=h.concat(Array.prototype.slice.call(e||[],0)),p()):(angular.forEach(h.slice(0),function(c){n.length<=j&&l>=o&&d.push(g(c,(b?b:"")+a.name+"/"))}),k.all(d).then(function(){c.resolve()},function(a){c.reject(a)}))}catch(f){c.reject(f)}},function(a){c.reject(a)})};p()}else a.file(function(a){try{a.path=(b?b:"")+a.name,m&&(a=i.rename(a,a.path)),n.push(a),o+=a.size,c.resolve()}catch(d){c.reject(d)}},function(a){c.reject(a)});return c.promise}var j=i.getValidationAttr(d,a,"maxFiles");null==j&&(j=Number.MAX_VALUE);var l=i.getValidationAttr(d,a,"maxTotalSize");null==l&&(l=Number.MAX_VALUE);var m=s("ngfIncludeDir",a),n=[],o=0,p=[i.emptyPromise()];if(b&&b.length>0&&"file:"!==h.location.protocol)for(var q=0;q<b.length;q++){if(b[q].webkitGetAsEntry&&b[q].webkitGetAsEntry()&&b[q].webkitGetAsEntry().isDirectory){var r=b[q].webkitGetAsEntry();if(r.isDirectory&&!e)continue;null!=r&&p.push(g(r))}else{var t=b[q].getAsFile();null!=t&&(n.push(t),o+=t.size)}if(n.length>j||o>l||!f&&n.length>0)break}else if(null!=c)for(var u=0;u<c.length;u++){var v=c.item(u);if((v.type||v.size>0)&&(n.push(v),o+=v.size),n.length>j||o>l||!f&&n.length>0)break}var w=k.defer();return k.all(p).then(function(){if(f||m||!n.length)w.resolve(n);else{for(var a=0;n[a]&&"directory"===n[a].type;)a++;w.resolve([n[a]])}},function(a){w.reject(a)}),w.promise}var r=b(),s=function(a,b,c){return i.attrGetter(a,d,b,c)};if(s("dropAvailable")&&g(function(){a[s("dropAvailable")]?a[s("dropAvailable")].value=r:a[s("dropAvailable")]=r}),!r)return void(s("ngfHideOnDropNotAvailable",a)===!0&&c.css("display","none"));null==s("ngfSelect")&&i.registerModelChangeValidator(e,d,a);var t,u=null,v=f(s("ngfStopPropagation")),w=1;c[0].addEventListener("dragover",function(b){if(!l()&&i.shouldUpdateOn("drop",d,a)){if(b.preventDefault(),v(a)&&b.stopPropagation(),navigator.userAgent.indexOf("Chrome")>-1){var e=b.dataTransfer.effectAllowed;b.dataTransfer.dropEffect="move"===e||"linkMove"===e?"move":"copy"}g.cancel(u),t||(t="C",p(a,d,b,function(d){t=d,c.addClass(t),s("ngfDrag",a,{$isDragging:!0,$class:t,$event:b})}))}},!1),c[0].addEventListener("dragenter",function(b){!l()&&i.shouldUpdateOn("drop",d,a)&&(b.preventDefault(),v(a)&&b.stopPropagation())},!1),c[0].addEventListener("dragleave",function(b){!l()&&i.shouldUpdateOn("drop",d,a)&&(b.preventDefault(),
v(a)&&b.stopPropagation(),u=g(function(){t&&c.removeClass(t),t=null,s("ngfDrag",a,{$isDragging:!1,$event:b})},w||100))},!1),c[0].addEventListener("drop",function(b){!l()&&i.shouldUpdateOn("drop",d,a)&&(b.preventDefault(),v(a)&&b.stopPropagation(),t&&c.removeClass(t),t=null,m(b.dataTransfer,b,"dropUrl"))},!1),c[0].addEventListener("paste",function(b){navigator.userAgent.toLowerCase().indexOf("firefox")>-1&&s("ngfEnableFirefoxPaste",a)&&b.preventDefault(),!l()&&i.shouldUpdateOn("paste",d,a)&&m(b.clipboardData||b.originalEvent.clipboardData,b,"pasteUrl")},!1),navigator.userAgent.toLowerCase().indexOf("firefox")>-1&&s("ngfEnableFirefoxPaste",a)&&(c.attr("contenteditable",!0),c.on("keypress",function(a){a.metaKey||a.ctrlKey||a.preventDefault()}))}function b(){var a=document.createElement("div");return"draggable"in a&&"ondrop"in a&&!/Edge\/12./i.test(navigator.userAgent)}ngFileUpload.directive("ngfDrop",["$parse","$timeout","$window","Upload","$http","$q",function(b,c,d,e,f,g){return{restrict:"AEC",require:"?ngModel",link:function(h,i,j,k){a(h,i,j,k,b,c,d,e,f,g)}}}]),ngFileUpload.directive("ngfNoFileDrop",function(){return function(a,c){b()&&c.css("display","none")}}),ngFileUpload.directive("ngfDropAvailable",["$parse","$timeout","Upload",function(a,c,d){return function(e,f,g){if(b()){var h=a(d.attrGetter("ngfDropAvailable",g));c(function(){h(e),h.assign&&h.assign(e,!0)})}}}])}(),ngFileUpload.service("UploadExif",["UploadResize","$q",function(a,b){function c(a,b,c,d){switch(b){case 2:return a.transform(-1,0,0,1,c,0);case 3:return a.transform(-1,0,0,-1,c,d);case 4:return a.transform(1,0,0,-1,0,d);case 5:return a.transform(0,1,1,0,0,0);case 6:return a.transform(0,1,-1,0,d,0);case 7:return a.transform(0,-1,-1,0,d,c);case 8:return a.transform(0,-1,1,0,0,c)}}function d(a){for(var b="",c=new Uint8Array(a),d=c.byteLength,e=0;d>e;e++)b+=String.fromCharCode(c[e]);return window.btoa(b)}var e=a;return e.isExifSupported=function(){return window.FileReader&&(new FileReader).readAsArrayBuffer&&e.isResizeSupported()},e.readOrientation=function(a){var c=b.defer(),d=new FileReader,e=a.slice?a.slice(0,65536):a;return d.readAsArrayBuffer(e),d.onerror=function(a){return c.reject(a)},d.onload=function(a){var b={orientation:1},d=new DataView(this.result);if(65496!==d.getUint16(0,!1))return c.resolve(b);for(var e=d.byteLength,f=2;e>f;){var g=d.getUint16(f,!1);if(f+=2,65505===g){if(1165519206!==d.getUint32(f+=2,!1))return c.resolve(b);var h=18761===d.getUint16(f+=6,!1);f+=d.getUint32(f+4,h);var i=d.getUint16(f,h);f+=2;for(var j=0;i>j;j++)if(274===d.getUint16(f+12*j,h)){var k=d.getUint16(f+12*j+8,h);return k>=2&&8>=k&&(d.setUint16(f+12*j+8,1,h),b.fixedArrayBuffer=a.target.result),b.orientation=k,c.resolve(b)}}else{if(65280!==(65280&g))break;f+=d.getUint16(f,!1)}}return c.resolve(b)},c.promise},e.applyExifRotation=function(a){if(0!==a.type.indexOf("image/jpeg"))return e.emptyPromise(a);var f=b.defer();return e.readOrientation(a).then(function(b){return b.orientation<2||b.orientation>8?f.resolve(a):void e.dataUrl(a,!0).then(function(g){var h=document.createElement("canvas"),i=document.createElement("img");i.onload=function(){try{h.width=b.orientation>4?i.height:i.width,h.height=b.orientation>4?i.width:i.height;var g=h.getContext("2d");c(g,b.orientation,i.width,i.height),g.drawImage(i,0,0);var j=h.toDataURL(a.type||"image/WebP",.934);j=e.restoreExif(d(b.fixedArrayBuffer),j);var k=e.dataUrltoBlob(j,a.name);f.resolve(k)}catch(l){return f.reject(l)}},i.onerror=function(){f.reject()},i.src=g},function(a){f.reject(a)})},function(a){f.reject(a)}),f.promise},e.restoreExif=function(a,b){var c={};return c.KEY_STR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c.encode64=function(a){var b,c,d,e,f,g="",h="",i="",j=0;do b=a[j++],c=a[j++],h=a[j++],d=b>>2,e=(3&b)<<4|c>>4,f=(15&c)<<2|h>>6,i=63&h,isNaN(c)?f=i=64:isNaN(h)&&(i=64),g=g+this.KEY_STR.charAt(d)+this.KEY_STR.charAt(e)+this.KEY_STR.charAt(f)+this.KEY_STR.charAt(i),b=c=h="",d=e=f=i="";while(j<a.length);return g},c.restore=function(a,b){a.match("data:image/jpeg;base64,")&&(a=a.replace("data:image/jpeg;base64,",""));var c=this.decode64(a),d=this.slice2Segments(c),e=this.exifManipulation(b,d);return"data:image/jpeg;base64,"+this.encode64(e)},c.exifManipulation=function(a,b){var c=this.getExifArray(b),d=this.insertExif(a,c);return new Uint8Array(d)},c.getExifArray=function(a){for(var b,c=0;c<a.length;c++)if(b=a[c],255===b[0]&225===b[1])return b;return[]},c.insertExif=function(a,b){var c=a.replace("data:image/jpeg;base64,",""),d=this.decode64(c),e=d.indexOf(255,3),f=d.slice(0,e),g=d.slice(e),h=f;return h=h.concat(b),h=h.concat(g)},c.slice2Segments=function(a){for(var b=0,c=[];;){if(255===a[b]&218===a[b+1])break;if(255===a[b]&216===a[b+1])b+=2;else{var d=256*a[b+2]+a[b+3],e=b+d+2,f=a.slice(b,e);c.push(f),b=e}if(b>a.length)break}return c},c.decode64=function(a){var b,c,d,e,f,g="",h="",i=0,j=[],k=/[^A-Za-z0-9\+\/\=]/g;k.exec(a)&&console.log("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, NaNExpect errors in decoding."),a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");do d=this.KEY_STR.indexOf(a.charAt(i++)),e=this.KEY_STR.indexOf(a.charAt(i++)),f=this.KEY_STR.indexOf(a.charAt(i++)),h=this.KEY_STR.indexOf(a.charAt(i++)),b=d<<2|e>>4,c=(15&e)<<4|f>>2,g=(3&f)<<6|h,j.push(b),64!==f&&j.push(c),64!==h&&j.push(g),b=c=g="",d=e=f=h="";while(i<a.length);return j},c.restore(a,b)},e}]);;/*! ngTagsInput v3.2.0 License: MIT */!function(){"use strict";var a={backspace:8,tab:9,enter:13,escape:27,space:32,up:38,down:40,left:37,right:39,"delete":46,comma:188},b=9007199254740991,c=["text","email","url"],d=angular.module("ngTagsInput",[]);d.directive("tagsInput",["$timeout","$document","$window","$q","tagsInputConfig","tiUtil",function(d,e,f,g,h,i){function j(a,b,c,d){var e,f,h,j,k={};return e=function(b){return i.safeToString(b[a.displayProperty])},f=function(b,c){b[a.displayProperty]=c},h=function(b){var d=e(b),f=d&&d.length>=a.minLength&&d.length<=a.maxLength&&a.allowedTagsPattern.test(d)&&!i.findInObjectArray(k.items,b,a.keyProperty||a.displayProperty);return g.when(f&&c({$tag:b})).then(i.promisifyValue)},j=function(a){return g.when(d({$tag:a})).then(i.promisifyValue)},k.items=[],k.addText=function(a){var b={};return f(b,a),k.add(b)},k.add=function(c){var d=e(c);return a.replaceSpacesWithDashes&&(d=i.replaceSpacesWithDashes(d)),f(c,d),h(c).then(function(){k.items.push(c),b.trigger("tag-added",{$tag:c})})["catch"](function(){d&&b.trigger("invalid-tag",{$tag:c})})},k.remove=function(a){var c=k.items[a];return j(c).then(function(){return k.items.splice(a,1),k.clearSelection(),b.trigger("tag-removed",{$tag:c}),c})},k.select=function(a){0>a?a=k.items.length-1:a>=k.items.length&&(a=0),k.index=a,k.selected=k.items[a]},k.selectPrior=function(){k.select(--k.index)},k.selectNext=function(){k.select(++k.index)},k.removeSelected=function(){return k.remove(k.index)},k.clearSelection=function(){k.selected=null,k.index=-1},k.getItems=function(){return a.useStrings?k.items.map(e):k.items},k.clearSelection(),k}function k(a){return-1!==c.indexOf(a)}return{restrict:"E",require:"ngModel",scope:{tags:"=ngModel",text:"=?",templateScope:"=?",tagClass:"&",onTagAdding:"&",onTagAdded:"&",onInvalidTag:"&",onTagRemoving:"&",onTagRemoved:"&",onTagClicked:"&"},replace:!1,transclude:!0,templateUrl:"ngTagsInput/tags-input.html",controller:["$scope","$attrs","$element",function(a,c,d){a.events=i.simplePubSub(),h.load("tagsInput",a,c,{template:[String,"ngTagsInput/tag-item.html"],type:[String,"text",k],placeholder:[String,"Add a tag"],tabindex:[Number,null],removeTagSymbol:[String,String.fromCharCode(215)],replaceSpacesWithDashes:[Boolean,!0],minLength:[Number,3],maxLength:[Number,b],addOnEnter:[Boolean,!0],addOnSpace:[Boolean,!1],addOnComma:[Boolean,!0],addOnBlur:[Boolean,!0],addOnPaste:[Boolean,!1],pasteSplitPattern:[RegExp,/,/],allowedTagsPattern:[RegExp,/.+/],enableEditingLastTag:[Boolean,!1],minTags:[Number,0],maxTags:[Number,b],displayProperty:[String,"text"],keyProperty:[String,""],allowLeftoverText:[Boolean,!1],addFromAutocompleteOnly:[Boolean,!1],spellcheck:[Boolean,!0],useStrings:[Boolean,!1]}),a.tagList=new j(a.options,a.events,i.handleUndefinedResult(a.onTagAdding,!0),i.handleUndefinedResult(a.onTagRemoving,!0)),this.registerAutocomplete=function(){d.find("input");return{addTag:function(b){return a.tagList.add(b)},getTags:function(){return a.tagList.items},getCurrentTagText:function(){return a.newTag.text()},getOptions:function(){return a.options},getTemplateScope:function(){return a.templateScope},on:function(b,c){return a.events.on(b,c,!0),this}}},this.registerTagItem=function(){return{getOptions:function(){return a.options},removeTag:function(b){a.disabled||a.tagList.remove(b)}}}}],link:function(b,c,g,h){var j,k,l=[a.enter,a.comma,a.space,a.backspace,a["delete"],a.left,a.right],m=b.tagList,n=b.events,o=b.options,p=c.find("input"),q=["minTags","maxTags","allowLeftoverText"];j=function(){h.$setValidity("maxTags",m.items.length<=o.maxTags),h.$setValidity("minTags",m.items.length>=o.minTags),h.$setValidity("leftoverText",b.hasFocus||o.allowLeftoverText?!0:!b.newTag.text())},k=function(){d(function(){p[0].focus()})},h.$isEmpty=function(a){return!a||!a.length},b.newTag={text:function(a){return angular.isDefined(a)?(b.text=a,void n.trigger("input-change",a)):b.text||""},invalid:null},b.track=function(a){return a[o.keyProperty||o.displayProperty]},b.getTagClass=function(a,c){var d=a===m.selected;return[b.tagClass({$tag:a,$index:c,$selected:d}),{selected:d}]},b.$watch("tags",function(a){if(a){if(m.items=i.makeObjectArray(a,o.displayProperty),o.useStrings)return;b.tags=m.items}else m.items=[]}),b.$watch("tags.length",function(){j(),h.$validate()}),g.$observe("disabled",function(a){b.disabled=a}),b.eventHandlers={input:{keydown:function(a){n.trigger("input-keydown",a)},focus:function(){b.hasFocus||(b.hasFocus=!0,n.trigger("input-focus"))},blur:function(){d(function(){var a=e.prop("activeElement"),d=a===p[0],f=c[0].contains(a);(d||!f)&&(b.hasFocus=!1,n.trigger("input-blur"))})},paste:function(a){a.getTextData=function(){var b=a.clipboardData||a.originalEvent&&a.originalEvent.clipboardData;return b?b.getData("text/plain"):f.clipboardData.getData("Text")},n.trigger("input-paste",a)}},host:{click:function(){b.disabled||k()}},tag:{click:function(a){n.trigger("tag-clicked",{$tag:a})}}},n.on("tag-added",b.onTagAdded).on("invalid-tag",b.onInvalidTag).on("tag-removed",b.onTagRemoved).on("tag-clicked",b.onTagClicked).on("tag-added",function(){b.newTag.text("")}).on("tag-added tag-removed",function(){b.tags=m.getItems(),h.$setDirty(),k()}).on("invalid-tag",function(){b.newTag.invalid=!0}).on("option-change",function(a){-1!==q.indexOf(a.name)&&j()}).on("input-change",function(){m.clearSelection(),b.newTag.invalid=null}).on("input-focus",function(){c.triggerHandler("focus"),h.$setValidity("leftoverText",!0)}).on("input-blur",function(){o.addOnBlur&&!o.addFromAutocompleteOnly&&m.addText(b.newTag.text()),c.triggerHandler("blur"),j()}).on("input-keydown",function(c){var d,e,f,g,h=c.keyCode,j={};i.isModifierOn(c)||-1===l.indexOf(h)||(j[a.enter]=o.addOnEnter,j[a.comma]=o.addOnComma,j[a.space]=o.addOnSpace,d=!o.addFromAutocompleteOnly&&j[h],e=(h===a.backspace||h===a["delete"])&&m.selected,g=h===a.backspace&&0===b.newTag.text().length&&o.enableEditingLastTag,f=(h===a.backspace||h===a.left||h===a.right)&&0===b.newTag.text().length&&!o.enableEditingLastTag,d?m.addText(b.newTag.text()):g?(m.selectPrior(),m.removeSelected().then(function(a){a&&b.newTag.text(a[o.displayProperty])})):e?m.removeSelected():f&&(h===a.left||h===a.backspace?m.selectPrior():h===a.right&&m.selectNext()),(d||f||e||g)&&c.preventDefault())}).on("input-paste",function(a){if(o.addOnPaste){var b=a.getTextData(),c=b.split(o.pasteSplitPattern);c.length>1&&(c.forEach(function(a){m.addText(a)}),a.preventDefault())}})}}}]),d.directive("tiTagItem",["tiUtil",function(a){return{restrict:"E",require:"^tagsInput",template:'<ng-include src="$$template"></ng-include>',scope:{$scope:"=scope",data:"="},link:function(b,c,d,e){var f=e.registerTagItem(),g=f.getOptions();b.$$template=g.template,b.$$removeTagSymbol=g.removeTagSymbol,b.$getDisplayText=function(){return a.safeToString(b.data[g.displayProperty])},b.$removeTag=function(){f.removeTag(b.$index)},b.$watch("$parent.$index",function(a){b.$index=a})}}}]),d.directive("autoComplete",["$document","$timeout","$sce","$q","tagsInputConfig","tiUtil",function(b,c,d,e,f,g){function h(a,b,c){var d,f,h,i={};return h=function(){return b.tagsInput.keyProperty||b.tagsInput.displayProperty},d=function(a,c){return a.filter(function(a){return!g.findInObjectArray(c,a,h(),function(a,c){return b.tagsInput.replaceSpacesWithDashes&&(a=g.replaceSpacesWithDashes(a),c=g.replaceSpacesWithDashes(c)),g.defaultComparer(a,c)})})},i.reset=function(){f=null,i.items=[],i.visible=!1,i.index=-1,i.selected=null,i.query=null},i.show=function(){b.selectFirstMatch?i.select(0):i.selected=null,i.visible=!0},i.load=g.debounce(function(c,j){i.query=c;var k=e.when(a({$query:c}));f=k,k.then(function(a){k===f&&(a=g.makeObjectArray(a.data||a,h()),a=d(a,j),i.items=a.slice(0,b.maxResultsToShow),i.items.length>0?i.show():i.reset())})},b.debounceDelay),i.selectNext=function(){i.select(++i.index)},i.selectPrior=function(){i.select(--i.index)},i.select=function(a){0>a?a=i.items.length-1:a>=i.items.length&&(a=0),i.index=a,i.selected=i.items[a],c.trigger("suggestion-selected",a)},i.reset(),i}function i(a,b){var c=a.find("li").eq(b),d=c.parent(),e=c.prop("offsetTop"),f=c.prop("offsetHeight"),g=d.prop("clientHeight"),h=d.prop("scrollTop");h>e?d.prop("scrollTop",e):e+f>g+h&&d.prop("scrollTop",e+f-g)}return{restrict:"E",require:"^tagsInput",scope:{source:"&",matchClass:"&"},templateUrl:"ngTagsInput/auto-complete.html",controller:["$scope","$element","$attrs",function(a,b,c){a.events=g.simplePubSub(),f.load("autoComplete",a,c,{template:[String,"ngTagsInput/auto-complete-match.html"],debounceDelay:[Number,100],minLength:[Number,3],highlightMatchedText:[Boolean,!0],maxResultsToShow:[Number,10],loadOnDownArrow:[Boolean,!1],loadOnEmpty:[Boolean,!1],loadOnFocus:[Boolean,!1],selectFirstMatch:[Boolean,!0],displayProperty:[String,""]}),a.suggestionList=new h(a.source,a.options,a.events),this.registerAutocompleteMatch=function(){return{getOptions:function(){return a.options},getQuery:function(){return a.suggestionList.query}}}}],link:function(b,c,d,e){var f,h=[a.enter,a.tab,a.escape,a.up,a.down],j=b.suggestionList,k=e.registerAutocomplete(),l=b.options,m=b.events;l.tagsInput=k.getOptions(),f=function(a){return a&&a.length>=l.minLength||!a&&l.loadOnEmpty},b.templateScope=k.getTemplateScope(),b.addSuggestionByIndex=function(a){j.select(a),b.addSuggestion()},b.addSuggestion=function(){var a=!1;return j.selected&&(k.addTag(angular.copy(j.selected)),j.reset(),a=!0),a},b.track=function(a){return a[l.tagsInput.keyProperty||l.tagsInput.displayProperty]},b.getSuggestionClass=function(a,c){var d=a===j.selected;return[b.matchClass({$match:a,$index:c,$selected:d}),{selected:d}]},k.on("tag-added tag-removed invalid-tag input-blur",function(){j.reset()}).on("input-change",function(a){f(a)?j.load(a,k.getTags()):j.reset()}).on("input-focus",function(){var a=k.getCurrentTagText();l.loadOnFocus&&f(a)&&j.load(a,k.getTags())}).on("input-keydown",function(c){var d=c.keyCode,e=!1;if(!g.isModifierOn(c)&&-1!==h.indexOf(d))return j.visible?d===a.down?(j.selectNext(),e=!0):d===a.up?(j.selectPrior(),e=!0):d===a.escape?(j.reset(),e=!0):(d===a.enter||d===a.tab)&&(e=b.addSuggestion()):d===a.down&&b.options.loadOnDownArrow&&(j.load(k.getCurrentTagText(),k.getTags()),e=!0),e?(c.preventDefault(),c.stopImmediatePropagation(),!1):void 0}),m.on("suggestion-selected",function(a){i(c,a)})}}}]),d.directive("tiAutocompleteMatch",["$sce","tiUtil",function(a,b){return{restrict:"E",require:"^autoComplete",template:'<ng-include src="$$template"></ng-include>',scope:{$scope:"=scope",data:"="},link:function(c,d,e,f){var g=f.registerAutocompleteMatch(),h=g.getOptions();c.$$template=h.template,c.$index=c.$parent.$index,c.$highlight=function(c){return h.highlightMatchedText&&(c=b.safeHighlight(c,g.getQuery())),a.trustAsHtml(c)},c.$getDisplayText=function(){return b.safeToString(c.data[h.displayProperty||h.tagsInput.displayProperty])}}}}]),d.directive("tiTranscludeAppend",function(){return function(a,b,c,d,e){e(function(a){b.append(a)})}}),d.directive("tiAutosize",["tagsInputConfig",function(a){return{restrict:"A",require:"ngModel",link:function(b,c,d,e){var f,g,h=a.getTextAutosizeThreshold();f=angular.element('<span class="input"></span>'),f.css("display","none").css("visibility","hidden").css("width","auto").css("white-space","pre"),c.parent().append(f),g=function(a){var b,e=a;return angular.isString(e)&&0===e.length&&(e=d.placeholder),e&&(f.text(e),f.css("display",""),b=f.prop("offsetWidth"),f.css("display","none")),c.css("width",b?b+h+"px":""),a},e.$parsers.unshift(g),e.$formatters.unshift(g),d.$observe("placeholder",function(a){e.$modelValue||g(a)})}}}]),d.directive("tiBindAttrs",function(){return function(a,b,c){a.$watch(c.tiBindAttrs,function(a){angular.forEach(a,function(a,b){c.$set(b,a)})},!0)}}),d.provider("tagsInputConfig",function(){var a={},b={},c=3;this.setDefaults=function(b,c){return a[b]=c,this},this.setActiveInterpolation=function(a,c){return b[a]=c,this},this.setTextAutosizeThreshold=function(a){return c=a,this},this.$get=["$interpolate",function(d){var e={};return e[String]=function(a){return a},e[Number]=function(a){return parseInt(a,10)},e[Boolean]=function(a){return"true"===a.toLowerCase()},e[RegExp]=function(a){return new RegExp(a)},{load:function(c,f,g,h){var i=function(){return!0};f.options={},angular.forEach(h,function(h,j){var k,l,m,n,o,p;k=h[0],l=h[1],m=h[2]||i,n=e[k],o=function(){var b=a[c]&&a[c][j];return angular.isDefined(b)?b:l},p=function(a){f.options[j]=a&&m(a)?n(a):o()},b[c]&&b[c][j]?g.$observe(j,function(a){p(a),f.events.trigger("option-change",{name:j,newValue:a})}):p(g[j]&&d(g[j])(f.$parent))})},getTextAutosizeThreshold:function(){return c}}}]}),d.factory("tiUtil",["$timeout","$q",function(a,b){var c={};return c.debounce=function(b,c){var d;return function(){var e=arguments;a.cancel(d),d=a(function(){b.apply(null,e)},c)}},c.makeObjectArray=function(a,b){if(!angular.isArray(a)||0===a.length||angular.isObject(a[0]))return a;var c=[];return a.forEach(function(a){var d={};d[b]=a,c.push(d)}),c},c.findInObjectArray=function(a,b,d,e){var f=null;return e=e||c.defaultComparer,a.some(function(a){return e(a[d],b[d])?(f=a,!0):void 0}),f},c.defaultComparer=function(a,b){return c.safeToString(a).toLowerCase()===c.safeToString(b).toLowerCase()},c.safeHighlight=function(a,b){function d(a){return a.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}if(a=c.encodeHTML(a),b=c.encodeHTML(b),!b)return a;var e=new RegExp("&[^;]+;|"+d(b),"gi");return a.replace(e,function(a){return a.toLowerCase()===b.toLowerCase()?"<em>"+a+"</em>":a})},c.safeToString=function(a){return angular.isUndefined(a)||null==a?"":a.toString().trim()},c.encodeHTML=function(a){return c.safeToString(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},c.handleUndefinedResult=function(a,b){return function(){var c=a.apply(null,arguments);return angular.isUndefined(c)?b:c}},c.replaceSpacesWithDashes=function(a){return c.safeToString(a).replace(/\s/g,"-")},c.isModifierOn=function(a){return a.shiftKey||a.ctrlKey||a.altKey||a.metaKey},c.promisifyValue=function(a){return a=angular.isUndefined(a)?!0:a,b[a?"when":"reject"]()},c.simplePubSub=function(){var a={};return{on:function(b,c,d){return b.split(" ").forEach(function(b){a[b]||(a[b]=[]);var e=d?[].unshift:[].push;e.call(a[b],c)}),this},trigger:function(b,d){var e=a[b]||[];return e.every(function(a){return c.handleUndefinedResult(a,!0)(d)}),this}}},c}]),d.run(["$templateCache",function(a){a.put("ngTagsInput/tags-input.html",'<div class="host" tabindex="-1" ng-click="eventHandlers.host.click()" ti-transclude-append><div class="tags" ng-class="{focused: hasFocus}"><ul class="tag-list"><li class="tag-item" ng-repeat="tag in tagList.items track by track(tag)" ng-class="getTagClass(tag, $index)" ng-click="eventHandlers.tag.click(tag)"><ti-tag-item scope="templateScope" data="::tag"></ti-tag-item></li></ul><input class="input" autocomplete="off" ng-model="newTag.text" ng-model-options="{getterSetter: true}" ng-keydown="eventHandlers.input.keydown($event)" ng-focus="eventHandlers.input.focus($event)" ng-blur="eventHandlers.input.blur($event)" ng-paste="eventHandlers.input.paste($event)" ng-trim="false" ng-class="{\'invalid-tag\': newTag.invalid}" ng-disabled="disabled" ti-bind-attrs="{type: options.type, placeholder: options.placeholder, tabindex: options.tabindex, spellcheck: options.spellcheck}" ti-autosize></div></div>'),a.put("ngTagsInput/tag-item.html",'<span ng-bind="$getDisplayText()"></span> <a class="remove-button" ng-click="$removeTag()" ng-bind="::$$removeTagSymbol"></a>'),a.put("ngTagsInput/auto-complete.html",'<div class="autocomplete" ng-if="suggestionList.visible"><ul class="suggestion-list"><li class="suggestion-item" ng-repeat="item in suggestionList.items track by track(item)" ng-class="getSuggestionClass(item, $index)" ng-click="addSuggestionByIndex($index)" ng-mouseenter="suggestionList.select($index)"><ti-autocomplete-match scope="templateScope" data="::item"></ti-autocomplete-match></li></ul></div>'),a.put("ngTagsInput/auto-complete-match.html",'<span ng-bind-html="$highlight($getDisplayText())"></span>')}])}();;(function(){
	
	var modCargos = angular.module('Cargos',[]);

	var CargosController = function($scope,$mdDialog,GDoksFactory,$mdToast){

		$scope.cargos = [];

		GDoksFactory.getCargos().success(function(response){
			for (var i = response.cargos.length - 1; i >= 0; i--) {
				response.cargos[i].valor_hh *= 1;
			}
			$scope.cargos = response.cargos;	
		});
		
		$scope.openDialog = function(ev,idCargo){
			// Declarando o objeto cargo clicado
			var cargoClicado;

			// Definindo o objeto cargo clicado
			if(idCargo == 0) {
				cargoClicado = {id:0,nome:null,valor_hh:null};
			} else {
				cargoClicado = $scope.cargos.find(function(c){return c.id == this},idCargo);
			}

			$mdDialog.show(
				{
					controller: function($scope,cargo,parentCargo,parentCargos,parentScope){
						$scope.cargo = cargo;

						$scope.salvar = function(cargo){
							
							// mostrar carregando
							parentScope.root.carregando = true;

							if(cargo.id == 0){
								GDoksFactory.inserirCargo(cargo)
								.success(function(response){
									// Esconde carregando
									parentScope.root.carregando = false;

									cargo.id = response.newId;
									parentCargos.push(cargo);
									$mdToast.show(
										$mdToast.simple()
										.textContent('Novo cargo inserido com sucesso!')
										.position('bottom left')
										.hideDelay(5000)
									);

									// Escondendo o diálogo.
									$mdDialog.hide();
								})
								.error(function(err){
									// Esconde carregando
									parentScope.root.carregando = false;

									// imprimindo erro no console
									console.warn(err);

									// Retornando toast para o cliente
									$mdToast.show(
										$mdToast.simple()
										.textContent('Um erro ocorreu. Não foi possível completar ação!')
										.position('bottom left')
										.hideDelay(5000)
									);
								});
							} else {
								GDoksFactory.atualizarCargo(cargo)
								.success(function(response){
									// Esconde carregando
									parentScope.root.carregando = false;

									parentCargo.valor_hh = cargo.valor_hh;
									parentCargo.nome = cargo.nome;
									$mdToast.show(
										$mdToast.simple()
										.textContent('Cargo alterado com sucesso!')
										.position('bottom left')
										.hideDelay(5000)
									);

									// Escondendo o diálogo.
									$mdDialog.hide();
								})
								.error(function(err){
									// Esconde carregando
									parentScope.root.carregando = false;

									// Imprimindo erro no console
									console.warn(err);

									// Retornando toast para o usuário
									$mdToast.show(
										$mdToast.simple()
										.textContent('Um erro ocorreu. Não foi possível completar ação!')
										.position('bottom left')
										.hideDelay(5000)
									);
								});
							}
						};

						$scope.cancelar = function(cargo){
							$mdDialog.hide(cargo);
						}
					},
					locals:{
						cargo:angular.copy(cargoClicado),
						parentCargo:cargoClicado,
						parentCargos:$scope.cargos,
						parentScope:$scope
					},
					templateUrl: './app/modules/Cargos/cargo-dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true
				})
				.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
				}, function() {
				$scope.status = 'You cancelled the dialog.';
				});
		}

		$scope.openConfirm = function(ev,idCargo) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Tem certeza que deseja remover este cargo?')
				.textContent('A ação não poderá ser desfeita.')
				.ariaLabel('Deseja remover o cargo')
				.targetEvent(ev)
				.ok('Sim')
				.cancel('Não');

			$mdDialog.show(confirm).then(
				function() {
					GDoksFactory.removerCargo(idCargo)
					.success(function(response){
						$scope.cargos = $scope.cargos.filter(function(c){return c.id!= this},idCargo);
						$mdToast.show(
							$mdToast.simple()
							.textContent('Cargo removido!')
							.position('bottom left')
							.hideDelay(5000)
						);
					})
				}
			);
		};
	}

	modCargos.controller('CargosController',CargosController);
})();;(function(){
	angular.module('Clientes',[])
	.controller('ClientesController',ClientesController)
	.controller('ClienteController',ClienteController);


	function ClientesController($scope,GDoksFactory,$location){
		// levantando clientes na base de dados local
		$scope.clientes = [];
		indexedDB.open('gdoks').onsuccess = function(evt){
			evt.target.result.transaction('clientes').objectStore('clientes').getAll().onsuccess = function(evt){
				$scope.$apply(function(){$scope.clientes = evt.target.result});
			}
		}
		// função que leva para a tela de adicionar disciplina
		$scope.goToAddCliente = function(){
			$location.url('/clientes/0');
		}
	};

	function ClienteController($scope,$routeParams,GDoksFactory,$location,$mdToast){
		// Capturando o id passado na url
		var id = $routeParams.id;

		// se id== 0, adicionar um novo usuário. se não carregar o cliente de id passado
		if(id == 0) {
			// Criando um cliente vazio.
			$scope.cliente = {};
			$scope.cliente.id = 0;
			$scope.cliente.nome = '';
			$scope.cliente.nome_fantasia = '';
			$scope.cliente.tipo = '1';
			$scope.cliente.cnpj = '';
			$scope.cliente.cpf = null;
			$scope.cliente.contato_nome = '';
			$scope.cliente.contato_email = '';
			$scope.cliente.contato_telefone = '';
			$scope.cliente.endereco = '';
			$scope.cliente.ftp_host = '';
			$scope.cliente.ftp_usuario = '';
			$scope.cliente.ftp_senha = '';
			$scope.cliente.login = '';
			$scope.cliente.senha1 = '';
			$scope.cliente.senha2 = '';
		} else {
			// Carregando informações do cliente a partir da base
			GDoksFactory.getCliente(id)
				.success(
					function(response){
						$scope.cliente = response.cliente;
						$scope.cliente.tipo = response.cliente.cpf == null?'1':'2';
					}
				)
				.error(
					function(error){

					}
				);
		}

		// Definindo função que cancela as alterações
		$scope.cancel = function(){
			$location.url("/clientes");
		}

		$scope.salvarCliente = function(){
			
			// Mostra carregando
			$scope.root.carregando = true;

			var cliente = angular.copy($scope.cliente);
			cliente.senha = $scope.cliente.senha1;
			delete cliente.senha1;
			delete cliente.senha2;

			if($scope.cliente.id == 0){

				GDoksFactory.adicionarCliente(cliente)
				.success(
					function(response){
						// Esconde carregando
						$scope.root.carregando = false;
						
						// Atribuindo novo id para o cliente
						$scope.cliente.id = response.newId;

						// salvando cliente na base local
						var cliente = angular.copy($scope.cliente);

						// salvando info sobre o ftp
						cliente.ftp_configurado =	(cliente.ftp_host != '' &&
													cliente.ftp_usuario != '' &&
													cliente.ftp_senha != '' &&
													cliente.ftp_host != undefined &&
													cliente.ftp_usuario != undefined &&
													cliente.ftp_senha != undefined &&
													cliente.ftp_host != null &&
													cliente.ftp_usuario != null &&
													cliente.ftp_senha != null);
						delete cliente.senha1;
						delete cliente.senha2;
						delete cliente.ftp_host;
						delete cliente.ftp_usuario;
						delete cliente.ftp_senha;

						indexedDB.open('gdoks').onsuccess = function(evt){
							evt.target.result.transaction('clientes','readwrite').objectStore('clientes').add(cliente);
						}
						
						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent(response.msg)
							.position('bottom left')
							.hideDelay(5000)
						);

						// Voltando para a tela de clientes
						$location.url("/clientes");
					}
				)
				.error(
					function(error){
						// Esconde carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent(error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);

						// Imprimindo erro no console
						console.warn(error.msg);
					}
				);
			} else {
				GDoksFactory.atualizarCliente(cliente)
				.success(
					function(response){
						// Esconde carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent(response.msg)
							.position('bottom left')
							.hideDelay(5000)
						);					

						// atualiznado cliente na base local
						var cliente = angular.copy($scope.cliente);

						// salvando info sobre o ftp
						cliente.ftp_configurado =	(cliente.ftp_host != '' &&
													cliente.ftp_usuario != '' &&
													cliente.ftp_senha != '' &&
													cliente.ftp_host != undefined &&
													cliente.ftp_usuario != undefined &&
													cliente.ftp_senha != undefined &&
													cliente.ftp_host != null &&
													cliente.ftp_usuario != null &&
													cliente.ftp_senha != null);
						
						delete cliente.ftp_host;
						delete cliente.ftp_usuario;
						delete cliente.ftp_senha;
						indexedDB.open('gdoks').onsuccess = function(evt){
							evt.target.result.transaction('clientes','readwrite').objectStore('clientes').put(cliente);
						}

						// Voltando para a tela de clientes
						$location.url("/clientes");
					}
				)
				.error(
					function(error){
						// Esconde carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent(error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);	

						// Imprimindo erro no console
						console.warn(error.msg);
					}
				);
			}
		}

		$scope.onTipoChange = function(){
			if($scope.cliente.tipo == '1'){
				// Pessoa Jurídica. CPF deve ser nulo!
				$scope.cliente.cpf = null;
			} else {
				// Pessoa Física. CNPJ deve ser nulo!
				$scope.cliente.cnpj = null;
			}
		}
	}
})();;// Definição do módulo 'Configurações' e seu Controller
angular.module('Configuracoes',[]).controller('ConfiguracoesController',ConfiguracoesController);

// Definição da ConfigurcoesController
function ConfiguracoesController($scope){};
;(function(){
	// Criando o módulo "Documentos"
	var module = angular.module('Documentos',['ngFileUpload']);

	// Atribuindo Controller Documentos Controller
	module.controller('DocumentosController',DocumentosController);
	
	// Atribuindo filtros do módulo
	module.filter('daysFromNow',daysFromNow);
	
	// Definindo função controller
	function DocumentosController($scope,GDoksFactory,$mdToast,$location,$cookies){
		
		// Definindo 'agora'
		$scope.agora = new Date();

		// Definindo valor inicial para ordem
		$scope.ordem = 'data_limite';

		// Definindo o valor inicial para o vetor de areas
		$scope.areas = [];

		// Definindo o valor inicial para o vetor de subareas
		$scope.subareas = [];

		// Carregando clientes
		$scope.clientes = [];
		carregaClientes();

		// Carregando projetos
		var projetos = [];
		$scope.projetos = [];
		carregaProjetos();

		// Carregando documentos
		$scope.documentos = [];

		// Carregando disciplinas
		$scope.disciplinas = [];
		carregaDisciplinas();

		// Função que carrega clientes
		function carregaClientes(){
			indexedDB.open('gdoks').onsuccess = function(evt){
				evt.target.result.transaction("clientes").objectStore("clientes").getAll().onsuccess = function(evt){
					$scope.$apply(function(){
						$scope.clientes = evt.target.result;
					})
				}
			}
		}

		// Função que carrega projetos
		function carregaProjetos(){
			indexedDB.open('gdoks').onsuccess = function(evt){
				evt.target.result.transaction("projetos").objectStore("projetos").getAll().onsuccess = function(evt){
					$scope.$apply(function(){
						projetos = evt.target.result;
						$scope.projetos = projetos;
					})
				}
			}
		}

		// função que carrega áreas de um projeto
		function carregaAreas(id_projeto){
			GDoksFactory.getAreas(id_projeto)
			.success(function(response){
				$scope.areas = response.areas;
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar áreas do projeto selecionado: ' + error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// escrevendo erro no console
				console.warn(error);
			})
		}

		// função que carrega subáreas de uma area
		function carregaSubareas(id_projeto,id_area){
			GDoksFactory.getSubareas(id_projeto,id_area)
			.success(function(response){
				$scope.subareas = response.subareas;
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar sub-áreas da área selecionada: ' + error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// escrevendo erro no console
				console.warn(error);
			})
		}

		// Função que carrega as disciplinas e subdisciplinas (base do cliente)
		function carregaDisciplinas(){
			indexedDB.open('gdoks').onsuccess = function(evt){
				evt.target.result.transaction("disciplinas").objectStore("disciplinas").getAll().onsuccess = function(evt){
					$scope.disciplinas = evt.target.result;
				}
			}
		}

		// HANDLERS : : : : : : : : : : : : : : : : : : : : : : : : : : : : :
		$scope.onClienteChange = function(){
			if($scope.busca.id_cliente == undefined){
				$scope.projetos = projetos;
			} else {
				$scope.projetos = projetos.filter(function(a){return a.id_cliente==this},$scope.busca.id_cliente);	
			}
			$scope.busca.id_projeto=undefined;
			$scope.busca.id_area=undefined;
			$scope.busca.id_subarea=undefined;
		}

		$scope.onProjetoChange = function(){
			carregaAreas($scope.busca.id_projeto);
			$scope.busca.id_area=undefined;
			$scope.busca.id_subarea=undefined;
		}

		$scope.onAreaChange = function(){
			carregaSubareas($scope.busca.id_projeto,$scope.busca.id_area);
			$scope.busca.id_subarea=undefined;
		}

		$scope.onDisciplinaChange = function(){
			if($scope.busca.id_disciplina!=undefined){
				$scope.subdisciplinas = $scope.disciplinas.find(function(a){
																return a.id==this;
															},$scope.busca.id_disciplina).subs;
			}
			$scope.busca.id_subdisciplina = undefined;
		}

		$scope.onOpenClick = function(id){
			$location.path('/documentos/'+id);
		}

		$scope.onFirstPageClick = function(){
			if($scope.busca.pagAtual > 1){
				$scope.busca.pagAtual=1;
				$scope.buscarDocumentos();
			}
		}

		$scope.onPreviousPageClick = function(){
			if($scope.busca.pagAtual > 1){
				$scope.busca.pagAtual--;
				$scope.buscarDocumentos();
			}
		}

		$scope.onNextPageClick = function(){
			if($scope.busca.pagAtual < $scope.totPaginas){
				$scope.busca.pagAtual++;
				$scope.buscarDocumentos();
			}
		}

		$scope.onLastPageClick = function(){
			if($scope.busca.pagAtual < $scope.totPaginas){
				$scope.busca.pagAtual=$scope.totPaginas;
				$scope.buscarDocumentos();
			}
		}

		$scope.onBuscarDocumentoClick = function(){
			$scope.busca.pagAtual = 1;
			$scope.buscarDocumentos();
		}

		// Função de busca
		$scope.buscarDocumentos = function(){
			
			// Salvando busca num cookie
			$cookies.putObject('busca',$scope.busca,{'expires':new Date((new Date()).getTime() + DURACAO_DA_BUSCA)});

			// Mostra carregando
			$scope.root.carregando = true;

			// Mandando fazer busca
			GDoksFactory.buscarDocumentos($scope.busca)
			.success(function(response){
				// Esconde Carregando
				$scope.root.carregando = false;

				// Carregando os documentos
				$scope.documentos = response.documentos;

				// Parsing
				for (var i = $scope.documentos.length - 1; i >= 0; i--) {
					$scope.documentos[i].data_limite = ($scope.documentos[i].data_limite?new Date($scope.documentos[i].data_limite+'T00:00'):null);
					$scope.documentos[i].ua = ($scope.documentos[i].ua?new Date($scope.documentos[i].ua):null);
				}

				// determinando o total de páginas
				$scope.totPaginas = Math.ceil(response.total/response.npp);
			})
			.error(function(error){
				// Esconde Carregando
				$scope.root.carregando = false;
			});
		}

		// Verificando se o cookie da busca está definido
		if($cookies.getObject('busca') == undefined){
			// sem cookie de busca. definindo valores padrão na mão
			$scope.busca = {
				nome:'',
				ordem:'nome',
				id_cliente:undefined,
				id_projeto:undefined,
				id_area:undefined,
				id_subarea:undefined,
				id_disciplina:undefined,
				id_subdisciplina:undefined,
				completude: 3,
				validacao: 3,
				pagAtual:1
			};
		} else {
			// Busca no cookie. Carregando
			$scope.busca = $cookies.getObject('busca');
			$scope.buscarDocumentos();
		}
	}

	// Definindo função filter
	function daysFromNow(){
		return function(futureDate){
			if(futureDate == null){
				return '';
			} else {
				var diff = Math.ceil((futureDate - (new Date()))/86400000);
				if(diff == 1){
					return ('1 dia restante');
				} else if(diff > 1){
					return (diff + ' dias restantes');
				} else if(diff == 0) {
					return 'Hoje';
				} else if(diff == -1 ) {
					return ('1 dia atrás');
				} else {
					return ((-diff) + ' dias atrás');
				}
			}
		}
	}

})();;(function(){
	// Carregando módulo de documentos
	var module = angular.module('Documentos');

	// Atribuindo o controller
	module.controller('DocumentoController', DocumentoController);

	// Defininfo controller
	function DocumentoController($scope,Upload,$mdExpansionPanel,$routeParams,GDoksFactory,$mdToast,$cookies,$mdDialog,$interval){

		// Carregando informações do usuário logado a partir do cookie
		$scope.usuario = $cookies.getObject('user');
		console.dir($scope.usuario);

		// Pedindo para carregar usuários. Documento é carregado em seguida.
		carregaUsuarios();

		// Alguns dados do possível update a ser realizado
		$scope.update = {};

		// Pedindo para carregar tamanhos de papel
		$scope.tamanhosDePapel = [];
		$scope.tamanhoPadrao = null;
		carregaTamanhosDePapel();

		// Definindo vetor que mantém os usuários
		$scope.usuarios = [];

		// Determinando o odu do usuário logado
		$scope.idu = $cookies.getObject('user').id;

		// Definindo itens para o formUpload
		$scope.formUploadItems = [];

		$scope.collapseHistPanel = function(index){
			$mdExpansionPanel('histPanel_'+index).collapse();
		}

		$scope.onFilesChange = function(){
			// limpando dados
			$scope.formUploadItems = [];

			// Levantando qual foi o último pacote de arquivos
			if($scope.documento.revisoes[0].pdas == undefined || $scope.documento.revisoes[0].pdas.length == 0){
				var ultimosArquivos = [];
			} else {
				var ultimosArquivos = $scope.documento.revisoes[0].pdas[0].arquivos;
			}

			// Declarando item
			var item;

			// Definindo agora
			$scope.agora = new Date();

			$scope.update.progressoTotal = $scope.documento.revisoes[0].progresso_validado;

			// Percorrendo vetor de arquivos escolhidos para saber se eles constam no último pacote
			for (var i = $scope.updateFiles.length - 1; i >= 0; i--) {
				if(ultimosArquivos.find(function(a){return a.nome_cliente==this},$scope.updateFiles[i].name) == undefined){
					// Arquivo NOVO
					item = {nome:$scope.updateFiles[i].name, nPaginas:1, tamanhoDoPapel:$scope.tamanhoPadrao.id, tipo:'novo',acao:1};
				} else {
					item = {nome:$scope.updateFiles[i].name, nPaginas:1, tamanhoDoPapel:$scope.tamanhoPadrao.id, tipo:'antigoParaAtualizar',acao:1}
				}
				$scope.formUploadItems.push(item);
			}

			// percorrendo o último pacote de arquivos procurando os arquivos que não constam no vetor de arquivos escolhidos
			for (var i = ultimosArquivos.length - 1; i >= 0; i--) {
				if($scope.updateFiles.find(function(a){return a.name == ultimosArquivos[i].nome_cliente}) == undefined){
					item = {nome:ultimosArquivos[i].nome_cliente, nPaginas:1, tamanhoDoPapel:$scope.tamanhoPadrao.id, tipo:'antigoNaoAtualizar',acao:1}
					$scope.formUploadItems.push(item);
				}				
			}
		}

		$scope.onDeleteClick = function(nome){
			var index = $scope.formUploadItems.findIndex(function(a){return a.nome == this},nome);
			$scope.formUploadItems.splice(index,1);
		}

		$scope.bloquearParaRevisao = function(){
			GDoksFactory.bloquearDocumentoParaRevisao($scope.documento.id)
			.success(function(response){
				$scope.documento.datahora_do_checkout = new Date(response.datahora);
				$scope.documento.idu_checkout = $scope.usuario.id;
				$scope.documento.sigla_checkout = $scope.usuario.sigla;

				$scope.documento.status = statusDeDocumento($scope.documento);
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao tentar bloquear documento para revisão: ' + error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);
			})
			
		}

		$scope.baixar = function(){
			GDoksFactory.baixarPDA($scope.documento.revisoes[0].pdas[0].id);
		}

		$scope.enviarArquivos = function(){

			// Mostrando o carregando
			$scope.root.carregando = true;

			// Fazendo upload de arquivos se tiver algo para subir.
			if ($scope.updateFiles && $scope.updateFiles.length) {
				// Criando pacote a enviar
				var packToSend = [];
				var index;
				var item;
				for (var i = $scope.formUploadItems.length - 1; i >= 0; i--) {
					// Procurando o item no vetor updateFiles
					item = $scope.formUploadItems[i];
					index = $scope.updateFiles.findIndex(function(a){return a.name == this},item.nome);

					// adicionando ao pacote a enviar
					if(index > -1){
						packToSend.push({file:$scope.updateFiles[index], dados:item});
					} else {
						packToSend.push({dados:item});
					}
				};
				
				// Enviando pacote
				Upload.upload(
					{
	                	url: API_ROOT+'/documentos/'+$scope.documento.id+'/pdas',
	                	data: {profiles: packToSend,update:$scope.update},
	                	headers: {'Authorization':$cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}
	            	}
	            ).then(
	            	function (response){
	            		$scope.root.carregando = false;
	            		if(response.error == 1){

	            			// Retornando Toast para o usuário
	            			$mdToast.show(
	            				$mdToast.simple()
	            				.textContent('Ocorreu um erro ao enviar arquivos:' + response.msg)
	            				.position('bottom left')
	            				.hideDelay(5000)
	            			);
	            		} else {
	            			// limpando dados
	            			$scope.updateFiles = [];
	            			$scope.update = {};
							$scope.formcoUploadItems = [];
							
	            			// Recarregando documento da base
	            			carregaDocumento($scope.documento.id);
	            		}
	            	},
	            	function(error){

	            		// Escondendo o carregando
	            		$scope.root.carregando = false;

	            		// Retornando Toast para o usuário
	            		$mdToast.show(
	            			$mdToast.simple()
	            			.textContent('Falha ao enviar arquivo; '+ error.data.msg)
	            			.position('bottom left')
	            			.hideDelay(5000)
	            		);

	            		// Imprimindo o erro no console
	            		console.warn(error);
	            	}
	            );
	        } else {
	        	$scope.root.carregando = false;
	        	// Retornando Toast para o usuário
	        	$mdToast.show(
	        		$mdToast.simple()
	        		.textContent('Erro desconhecido. Entrar em contato com o suporte técnico.')
	        		.position('bottom left')
	        		.hideDelay(5000)
	        	);
	        }
	        
		}

		$scope.openValidarProgressoDialog  = function(evt){
			$mdDialog.show(
				{
					controller: ValidarProgressoDialogController,
					locals:{
						doc: angular.copy($scope.documento),
						parentScope: $scope
					},
					templateUrl: './app/modules/Documentos/validarProgresso-dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose:true
				}
			)
		}

		$scope.avancarRevisao = function(ev){

			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Tem que deseja avançar a revisão deste documento?')
				.textContent('A ação não poderá ser desfeita.')
				.ariaLabel('Deseja avançar a revisão deste documento? Esta ação não poderá ser desfeita.')
				.targetEvent(ev)
				.ok('Sim')
				.cancel('Não');

			$mdDialog.show(confirm).then(
				function() {
					GDoksFactory.avancarRevisao($scope.documento)
					.success(function(response){
						if(response.error == 0){
							var rev = {
								data_limite:$scope.documento.revisoes[0].data_limite,
								id:response.newId,
								ua:null,
								serial:response.newSerial,
								progresso_a_validar: 0,
								progresso_validado:0
							};
							$scope.documento.revisoes.unshift(rev);

							// recalculando o status do documento
							$scope.documento.status = statusDeDocumento($scope.documento);

							$mdToast.show(
								// Retornando toast para usuário
								$mdToast.simple()
								.textContent('Revisão avançou com sucesso!')
								.position('bottom left')
								.hideDelay(5000)
							);
						} else {
							$mdToast.show(
								// Retornando toast para usuário
								$mdToast.simple()
								.textContent('Ocorreu um erro ao tentar avançar a revisão: ' + response.error )
								.position('bottom left')
								.hideDelay(5000)
							);
						}
					})
					.error(function(error){
						$mdToast.show(
							// Retornando toast para usuário
							$mdToast.simple()
							.textContent('Ocorreu um erro ao tentar avançar a revisão.')
							.position('bottom left')
							.hideDelay(5000)
						);

						// Imprimindo erro no console
						console.warn(response);
					})
				}
			);
		}

		// FUNÇÕES AUXILIARES = = = = = = = = = = = = = = = = = = = =
		function ValidarProgressoDialogController($scope,$cookies,doc,parentScope){
			$scope.doc = doc;

			$scope.cancelar = function(){
				$mdDialog.hide();
			}

			$scope.validar = function(){
				GDoksFactory.validarProgresso($scope.doc.id,$scope.doc.revisoes[0].progresso_a_validar)
				.success(function(response){
					// Atualizando documento localmente
					parentScope.documento.revisoes[0].pdas[0].progresso_total = $scope.doc.revisoes[0].progresso_a_validar + $scope.doc.revisoes[0].progresso_validado;
					parentScope.documento.revisoes[0].progresso_validado = $scope.doc.revisoes[0].progresso_a_validar + $scope.doc.revisoes[0].progresso_validado;
					parentScope.documento.revisoes[0].progresso_a_validar = 0;
					parentScope.documento.revisoes[0].pdas[0].validador = parentScope.usuarios.find(function(u){return u.id == this},$cookies.getObject('user').id);
					parentScope.documento.revisoes[0].pdas[0].idu_validador = parentScope.documento.revisoes[0].pdas[0].validador.id;
					parentScope.documento.revisoes[0].pdas[0].datahora_validacao = new Date();

					// Atualizando status do documento
					parentScope.documento.status = statusDeDocumento(parentScope.documento);

					// escondendo caixa de diálogo
					$mdDialog.hide();

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Progresso validado')
						.position('bottom left')
						.hideDelay(5000)
					);
				})
				.error(function(error){})
			}
		}

		function carregaDocumento(id){
			// Mostra o carregando
			$scope.root.carregando = true;

			// Faz a requisição a factory
			GDoksFactory.getDocumento(id)
			.success(function(response){
				// Esconde carregando
				$scope.root.carregando = false;

				// Lendo resposta
				var doc = response.documento;

				// Salvando no histórico
				$scope.root.addDocumentoAoHistorico(doc);
				
				// Parsings...
				doc.datahora_do_checkout = (doc.datahora_do_checkout==null) ? null : new Date(doc.datahora_do_checkout);
				for (var i = doc.revisoes.length - 1; i >= 0; i--) {
					doc.revisoes[i].data_limite = new Date(doc.revisoes[i].data_limite+'T00:00:00');
					doc.revisoes[i].ua = new Date(doc.revisoes[i].ua);

					// parsing pdas
					if(doc.revisoes[i].pdas != null){
						for (var j = doc.revisoes[i].pdas.length - 1; j >= 0; j--) {

							// Parsing validador
							if(doc.revisoes[i].pdas[j].idu_validador==null){
								doc.revisoes[i].pdas[j].validador = null;
							} else {
								doc.revisoes[i].pdas[j].validador = $scope.usuarios.find(function(u){return u.id==this},doc.revisoes[i].pdas[j].idu_validador);
								doc.revisoes[i].pdas[j].datahora_validacao = new Date(doc.revisoes[i].pdas[j].datahora_validacao);
							}
						}
					}
				}

				// Definindo o status do documento;
				doc.status = statusDeDocumento(doc);

				// Carrega documento no scope
				$scope.documento = doc;
			})
			.error(function(error){
				$scope.root.carregando = false;
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar documento: ' + error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);
			});
		}

		function carregaTamanhosDePapel(){
			GDoksFactory.getTamanhosDePapel()
			.success(function(response){
				$scope.tamanhosDePapel = response.tamanhosDePapel;
				$scope.tamanhoPadrao = $scope.tamanhosDePapel.find(function(a){
						return a.nome == "A4";
					});

				// Montando dicionário
				$scope.dic_tamanhosDePapel = [];
				for (var i = $scope.tamanhosDePapel.length - 1; i >= 0; i--) {
					$scope.dic_tamanhosDePapel[$scope.tamanhosDePapel[i].id] = $scope.tamanhosDePapel[i].nome;
				}
			})
			.error(function(error){
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar tamanhos de papel: ' + error.msg)
					.position('bottom left')
					.hideDelay(5000)
				);

				// Enviando erro para o console
				console.warn(error);
			})
		}

		function carregaUsuarios(){
			indexedDB.open("gdoks").onsuccess = function(evt){
				evt.target.result.transaction('usuarios').objectStore('usuarios').getAll().onsuccess = function(evt){
					$scope.$apply(function(){
						$scope.usuarios = evt.target.result;
					});
					carregaDocumento($routeParams.id)
				}
			}
		}

		function statusDeDocumento(doc){
			// Possíveis status de documento:
			// - DOCSTATUS_INVALIDO = 0;
			// - DOCSTATUS_VIRGEM = 1;
			// - DOCSTATUS_CHECKOUT = 2;
			// - DOCSTATUS_AGUARDANDO_VALIDACAO = 3;
			// - DOCSTATUS_VALIDADO = 4;
			// - DOCSTATUS_CONCLUIDO = 5;

			// Definindo o valor padrão do estado
			var status = DOCSTATUS_INVALIDO;

			// Caso ele esteja com checkout
			if(doc.idu_checkout == null && (doc.revisoes[0].pdas == undefined || doc.revisoes[0].pdas.length ==0)){
				status = DOCSTATUS_VIRGEM;
				return status;
			}

			if(doc.idu_checkout == null && doc.revisoes[0].progresso_a_validar>0){
				status = DOCSTATUS_AGUARDANDO_VALIDACAO;
				return status;
			}

			if(doc.idu_checkout == null && doc.revisoes[0].progresso_a_validar == 0 && doc.revisoes[0].progresso_validado == 100){
				status = DOCSTATUS_CONCLUIDO;
				return status;
			}

			if(doc.idu_checkout == null && doc.revisoes[0].progresso_a_validar == 0 && doc.revisoes[0].progresso_validado < 100){
				status = DOCSTATUS_VALIDADO;
				return status;
			}

			if(doc.idu_checkout != null && doc.revisoes.length > 0 && doc.revisoes[0].progresso_a_validar == 0){
				status = DOCSTATUS_CHECKOUT;
				return status;
			}

			return status;
		}
	}


})();
;angular.module('Disciplinas',[])
.controller('DisciplinasController',DisciplinasController)
.controller('DisciplinaController',DisciplinaController)
.controller('SubdisciplinaController',SubdisciplinaController)
.controller('EspecialistasController',EspecialistasController)
.controller('ValidadoresController',ValidadoresController)

function DisciplinasController($scope,GDoksFactory,$location){
	// Definindo variável que carrega aa disciplinas
	$scope.disciplinas = [];

	// Carregando disciplinas da base
	var openReq = indexedDB.open("gdoks");
	openReq.onsuccess = function(){
		var db = openReq.result;
		db.transaction('disciplinas').objectStore('disciplinas').getAll().onsuccess = function(evt){
			$scope.$apply(function(){$scope.disciplinas = evt.target.result;});
		}
	}

	// função que leva para a tela de adicionar disciplina
	$scope.goToAddDisciplina = function(){
		$location.url('/disciplinas/0');
	}
};

function DisciplinaController($scope,$routeParams,GDoksFactory,$mdToast,$location){
	// Lendo id da url
	var id = $routeParams.id;

	$scope.usuarios = [];
	$scope.dicUsuarios = [];
	$scope.usuariosCarregados = false;

	function carregaUsuarios(){
		// Levantando usuários da base
		indexedDB.open("gdoks").onsuccess = function(evt){
			evt.target.result.transaction("usuarios").objectStore("usuarios").getAll().onsuccess = function(evt){
				$scope.$apply(function(){
					$scope.usuarios = evt.target.result;
					$scope.usuariosCarregados = true;
					// criando dicionário de usuários
					for (var i = $scope.usuarios.length - 1; i >= 0; i--) {
						$scope.dicUsuarios[$scope.usuarios[i].id] = $scope.usuarios[i];
					}
				});
				onUsuariosCarregados();
			}
		}
	}

	function onUsuariosCarregados(){
		carregaDisciplina(id);
	}

	function carregaDisciplina(id){
		if(id == 0) {
			// Criando uma disciplina vazia.
			$scope.disciplina = {
				id : 0,
				nome : '',
				sigla : '',
				ativa : true,
				subs : [],
				especialistas : [],
				validadores : []
			};
		} else {
			// Carregando dados da disciplina a partir da base no cliente
			indexedDB.open('gdoks').onsuccess = function(evt){
				var db = evt.target.result;
				var transaction = db.transaction(['disciplinas','usuarios']);
				transaction.objectStore('disciplinas').get(id*1).onsuccess = function(evt){
					$scope.$apply(function(){
						$scope.disciplina = evt.target.result;

						// parsing especialistas
						for (var i = $scope.disciplina.especialistas.length - 1; i >= 0; i--) {
							$scope.disciplina.especialistas[i] = $scope.dicUsuarios[$scope.disciplina.especialistas[i]];
						};
						
						// parsing validadores
						for (var i = $scope.disciplina.validadores.length - 1; i >= 0; i--) {
							$scope.disciplina.validadores[i] = $scope.dicUsuarios[$scope.disciplina.validadores[i]];
						};
					})
				}
			}
		}
	}

	carregaUsuarios();
		
	// Definindo função para salvar disciplina
	$scope.salvarDisciplina = function(){

		// Mostra carregando
		$scope.root.carregando = true;

		if($scope.disciplina.id == 0){
			GDoksFactory.adicionarDisciplina($scope.disciplina)
			.success(
				function(response){
					// Esconde carregando
					$scope.root.carregando = false;

					// Atribuindo novo id a disciplina
					$scope.disciplina.id = response.newId;

					// salvando na base de dados local
					indexedDB.open('gdoks').onsuccess = function(evt){
						evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').add($scope.disciplina);
					}

					// retornando toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Dados da disciplina inseridos com sucesso!')
						.position('bottom left')
						.hideDelay(5000)
					);

					// mudando url
					$location.url('/disciplinas/'+response.newId);

				}
			)
			.error(
				function(error){
					// Esconde carregando
					$scope.root.carregando = false;

					// Retornando toast para usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Não foi possível completar a ação')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Exibindo erro no console.
					console.warn(error)
					
				}
			);
		} else {
			GDoksFactory.atualizarDisciplina($scope.disciplina)
			.success(
				function(response){
					// Esconde carregando
					$scope.root.carregando = false;

					// Retornando toast para usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Dados da disciplina atualizados com sucesso!')
						.position('bottom left')
						.hideDelay(5000)
					);

					// atualizando usuário na base local
					indexedDB.open('gdoks').onsuccess = function(evt){
						evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').put($scope.disciplina);
					}
				}
			)
			.error(
				function(error){
					// Esconde carregando
					$scope.root.carregando = false;

					// Retornando toast para usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Não foi possível completar a ação')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Exibindo erro no console
					console.warn(error);
				}
			);
		}
	}

	// Definindo função que cancela as alterações
	$scope.cancel = function(){
		window.location = "WebGDoks.php#/disciplinas";
	}
}

function SubdisciplinaController($scope,$mdDialog){
	$scope.openSubDialog = function(evt,sub){
		$mdDialog.show(
				{
					controller: SubDialogController,
					locals:{
						sub:angular.copy(sub),
						parentSub:sub,
						parentScope:$scope
					},
					templateUrl: './app/modules/Disciplinas/sub-dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose:true
				})
	}
}

function SubDialogController($scope,sub,parentSub,parentScope,$mdDialog,GDoksFactory,$mdToast){
	$scope.sub = sub;

	$scope.salvar = function(sub){
		// Mostrar Carregando
		parentScope.root.carregando = true;

		// Atribuindo o id da disciplina
		sub.id_disciplina = parentScope.disciplina.id;

		// Verificando se vai adicionar ou atualizar subdisciplina
		if(sub.id != 0){
			GDoksFactory.atualizarSubdisciplina(sub)
				.success(
					function(response){
						// Esconde Carregando
						parentScope.root.carregando = false;

						// Copiando informações da sub para a parentSub
						parentSub.nome = sub.nome;
						parentSub.sigla = sub.sigla;
						parentSub.ativa = sub.ativa;

						// atualizar na base local
						indexedDB.open('gdoks').onsuccess = function(evt){
							evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').put(parentScope.disciplina);
						}

						// Retornando toast para usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Dados da subdisciplina atualizados com sucesso!')
							.position('bottom left')
							.hideDelay(5000)
						);
					}
				)
				.error(
					function(error){
						// Esconde Carregando
						parentScope.root.carregando = false;

						// Retornando toast para usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Não foi possível realizar a ação. ' + error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);

						// Exibindo erro no console
						console.warn(error);

					}
				);
		} else {
			GDoksFactory.adicionarSubdisciplina(sub)
				.success(
					function(response){
						// Escondendo o carregando
						parentScope.root.carregando = false;

						// Atribuindo id da sub recém inserida
						sub.id = response.newId;

						// Retornando toast para usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Subdisciplina atualizada com sucesso!')
							.position('bottom left')
							.hideDelay(5000)
						);

						// Adicionando a subdisciplina ao vetor de subs da disciplina
						parentScope.disciplina.subs.push(sub);

						// atualizar na base local
						indexedDB.open('gdoks').onsuccess = function(evt){
							var putRequest = evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').put(parentScope.disciplina);
							putRequest.onsuccess = function(evt){
								console.log("atualizou disciplina na base local");
								console.dir(evt);
							}
							putRequest.onerror = function(evt){
								console.log("NÃO atualizou disciplina na base local");
								console.dir(evt);
							}
						}
					}
				)
				.error(
					function(error){
						// Escondendo o carregando
						parentScope.root.carregando = false;

						// Retornando toast para usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Não foi possível completar ação. ' + error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);

						// Exibindo erro no console
						console.warn(error);
					}
				);
		}

		// Escondendo
		$mdDialog.hide();
	};

	$scope.cancelar = function(){
		$mdDialog.hide();
	}
}

function EspecialistasController($scope,GDoksFactory,$mdToast){

	// Copiando vetor de especialistas para comportamento de interface
	$scope.$watch('disciplina',function(){
		if($scope.disciplina != undefined){
			$scope.especialistas = angular.copy($scope.disciplina.especialistas);
		}
	})

	// Função que filtra opções de especialista ao digitar
	$scope.filtrarTexto = function(search){
		// filtrando quanto ao texto
		return $scope.usuarios.filter(
			function(a){
				return a.nome.toLowerCase().indexOf(this.toLowerCase()) != -1;
			},search);
	}

	// Função que salva vetor de especialistas
	$scope.salvar = function(){
		// Mostrando o carregando
		$scope.root.carregando = true;

		// limpando vetor para enviar só os ids dos especialistas
		var ids = $scope.especialistas.map(function(a){return a.id});

		// Enviando informações para salvamento
		GDoksFactory.salvarEspecialistas($scope.disciplina.id,ids)
		.success(function(response){
			// Esconde o carregando
			$scope.root.carregando = false;

			// Salvando especialistas no scope.
			$scope.disciplina.especialistas = $scope.especialistas;

			// Salvando na base local
			indexedDB.open('gdoks').onsuccess = function(evt){
				// clonando disciplina a ser salva na base
				var d = angular.copy($scope.disciplina);
				d.especialistas = d.especialistas.map(function(a){return a.id});
				evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').put(d)
			}

			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Especialistas salvos com sucesso.')
				.position('bottom left')
				.hideDelay(5000)
			);

		})
		.error(function(error){
			// Esconde o carregando
			$scope.root.carregando = false;

			// Escrevendo erro no console
			console.warn(error);

			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Não foi possível completar a ação. ' + error.msg)
				.position('bottom left')
				.hideDelay(5000)
			);
		})
	}
}

function ValidadoresController($scope,GDoksFactory,$mdToast){

	// Copiando vetor de validadores para comportamento de interface
	$scope.$watch('disciplina',function(){
		if($scope.disciplina != undefined){
			$scope.validadores = angular.copy($scope.disciplina.validadores);
		}
	})

	// Função que filtra opções de especialista ao digitar
	$scope.filtrarTexto = function(search){
		// filtrando quanto ao texto
		return $scope.usuarios.filter(
			function(a){
				return a.nome.toLowerCase().indexOf(this.toLowerCase()) != -1;
			},search);
	}

	// Função que salva vetor de validadores
	$scope.salvar = function(){
		// Mostrando o carregando
		$scope.root.carregando = true;

		// limpando vetor para enviar só os ids dos validadores
		var ids = $scope.validadores.map(function(a){return a.id});

		// Enviando informações para salvamento
		GDoksFactory.salvarValidadores($scope.disciplina.id,ids)
		.success(function(response){
			// Esconde o carregando
			$scope.root.carregando = false;

			// Salvando validadores no scope.
			$scope.disciplina.validadores = $scope.validadores;

			// Salvando na base local
			indexedDB.open('gdoks').onsuccess = function(evt){
				// clonando disciplina a ser salva na base
				var d = angular.copy($scope.disciplina);
				d.validadores = d.validadores.map(function(a){return a.id});
				evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').put(d)
			}

			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Validadores salvos com sucesso.')
				.position('bottom left')
				.hideDelay(5000)
			);

		})
		.error(function(error){
			// Esconde o carregando
			$scope.root.carregando = false;

			// Escrevendo erro no console
			console.warn(error);

			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Não foi possível completar a ação. ' + error.msg)
				.position('bottom left')
				.hideDelay(5000)
			);
		})
	}
}


function OldDisciplinaController($scope,$routeParams,GDoksFactory){
	

	// definindo função que remove subdisciplina
	$scope.removerSubdisciplina = function(id){
		if(confirm("Tem certeza que deseja excluir a subdisciplina? A ação não poderá ser desfeita.")){
			var sub = $scope.disciplina.subs.find(function(a){return a.id == this},id);
			sub.id_disciplina = $scope.disciplina.id;
			GDoksFactory.removerSubdisciplina(sub)
				.success(
					function(response){
						$scope.disciplina.subs = $scope.disciplina.subs.filter(function(a){return a.id!=this},id);

						// Atualizando na base local
						var openReq = indexedDB.open('gdoks');
						openReq.onsuccess = function(){
							var db = openReq.result;
							db.transaction('disciplinas','readwrite').objectStore('disciplinas').put($scope.disciplina);
						}
					}
				)
				.error(
					function(error){
						$scope.erroEmOperacaoDeSubdisciplina = error.msg;
					}
				);
		}
	}

	// definindo função que edita subdisciplina
	$scope.editarSubdisciplina = function(id){
		if(id != 0){
			$scope.subdisciplinaEditada = angular.copy($scope.disciplina.subs.filter(function(a){return a.id == this},id)[0]);
			$scope.subdisciplinaEditada.id_disciplina = $scope.disciplina.id;
			setTimeout(function(){document.getElementById("nome_"+id).focus()},10);
		} else {
			$scope.subdisciplinaEditada = {};
			$scope.subdisciplinaEditada.id = 0;
			$scope.subdisciplinaEditada.id_disciplina = $scope.disciplina.id;
			$scope.subdisciplinaEditada.nome = "";
			$scope.subdisciplinaEditada.sigla = "";
			$scope.subdisciplinaEditada.ativa = true;
			$scope.disciplina.subs.push($scope.subdisciplinaEditada);
			setTimeout(function(){document.getElementById("nome_0").focus()},10);
		}
	}

	// definindo função que cancela alterações em subdisciplina
	$scope.cancelarAlteracoesEmSubdisciplina = function(){
		if($scope.subdisciplinaEditada.id == 0){
			$scope.disciplina.subs = $scope.disciplina.subs.filter(function(a){return a.id!=0});
		}
		$scope.subdisciplinaEditada = null;
	}

	// definindo função que salva alterações em subdisciplinas
	$scope.salvarSubdisciplina = function(){
		if($scope.subdisciplinaEditada != null){
			if($scope.subdisciplinaEditada.id != 0){
				GDoksFactory.atualizarSubdisciplina($scope.subdisciplinaEditada)
					.success(
						function(response){
							var sub = $scope.disciplina.subs.find(function(a){return a.id == this},$scope.subdisciplinaEditada.id);
							sub.nome = $scope.subdisciplinaEditada.nome;
							sub.sigla = $scope.subdisciplinaEditada.sigla;
							sub.ativa = $scope.subdisciplinaEditada.ativa;
							$scope.subdisciplinaEditada = null;
							$scope.erroEmOperacaoDeSubdisciplina = null;

							// atualizar na base local
							var openReq = indexedDB.open('gdoks');
							openReq.onsuccess = function(){
								var db = openReq.result;
								db.transaction('disciplinas','readwrite').objectStore('disciplinas').put($scope.disciplina)
							}
						}
					)
					.error(
						function(error){
							$scope.erroEmOperacaoDeSubdisciplina = error.msg;
						}
					);
			} else {
				GDoksFactory.adicionarSubdisciplina($scope.subdisciplinaEditada)
					.success(
						function(response){
							$scope.subdisciplinaEditada.id = response.newId;
							$scope.subdisciplinaEditada = null;

							// atualizar na base local
							var openReq = indexedDB.open('gdoks');
							openReq.onsuccess = function(){
								var db = openReq.result;
								db.transaction('disciplinas','readwrite').objectStore('disciplinas').put($scope.disciplina);
							}
						}
					)
					.error(
						function(error){
							$scope.erroEmOperacaoDeSubdisciplina = error.msg;
						}
					);
			}
		}
	}

	$scope.adicionarNovoEspecialista = function(){
		// Criando objeto data que irá conter dados para o select de possíveis especialistas
		$scope.data = {};

		// levantando usuários na base de dados local
		var openReq = indexedDB.open('gdoks');
		openReq.onsuccess = function(evt){
			var db = openReq.result;
			db.transaction('usuarios').objectStore('usuarios').getAll().onsuccess = function(evt){
				$scope.$apply(function(){
					$scope.data.possiveisEspecialistas = evt.target.result;

					// removendo os usuários que já são especialistas da disciplina
					for (var i = $scope.disciplina.especialistas.length - 1; i >= 0; i--) {
						$scope.data.possiveisEspecialistas = $scope.data.possiveisEspecialistas.filter(function(a){return a.id != this},$scope.disciplina.especialistas[i]);
					};

					// Criando especialista vazio
					var especialistaVazio = {"nome":"Selecione um usuário...","id":0};

					// adicionando o especialista vazio ao grupo de possiveis especialistas
					$scope.data.possiveisEspecialistas.unshift(especialistaVazio);
					
					// Marcando o item defalr		
					$scope.data.selecionado = especialistaVazio;

					// marcando flag para exibir campo de insersão de novo especialista
					$scope.inserindoNovoEspecialista = true;
				})
			}
		}
	}

	// definindo função que remove especialista
	$scope.removerEspecialista = function(id_especialista){
		if(confirm("Tem certeza que deseja remover o especialista da disciplina?")){
			GDoksFactory.removerEspecialista($scope.disciplina.id,id_especialista)
				.success(
					function(response){
						$scope.disciplina.especialistas = $scope.disciplina.especialistas.filter(function(a){return a != this},id_especialista);

						// salvando especialista na base local
						indexedDB.open('gdoks').onsuccess = function(evt){
							$scope.$apply(function(){
								evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').put($scope.disciplina);
							})
						}
						$scope.especialistas = $scope.especialistas.filter(function(a){return a.id != this},id_especialista);
					}
				)
				.error(
					function(error){
						
					}
				);
		}
	}

	// definindo função que cancela alterações em subdisciplina
	$scope.cancelarAlteracoesEmNovoEspecialista = function(){
		$scope.inserindoNovoEspecialista = false;
	}

	// definindo função que salva alterações em subdisciplinas
	$scope.salvarEspecialista = function(){
		GDoksFactory.adicionarEspecialista($scope.disciplina.id,$scope.data.selecionado.id)
			.success(
				function(response){
					$scope.disciplina.especialistas.push($scope.data.selecionado.id);
					
					// Capturando o especialista selecionado e adicionando a vetor de especialistas
					var openReq = indexedDB.open('gdoks');
					openReq.onsuccess = function(evt){
						var transaction = openReq.result.transaction(['usuarios','disciplinas'],'readwrite');
						transaction.objectStore('usuarios').get($scope.data.selecionado.id).onsuccess = function(evt){
							$scope.$apply(function(){
								$scope.especialistas.push(evt.target.result);
								$scope.inserindoNovoEspecialista = false;
							})
						}
						transaction.objectStore('disciplinas').put($scope.disciplina);
					}
				}
			)
			.error(
				function(error){
					
				}
			);
	}

	$scope.adicionarNovoValidador = function(){
		// Criando objeto data que irá conter dados para o select de possíveis validadores
		$scope.dataValidadores = {};

		// Levantando os possíveis validadores desta disciplina na base local
		var openReq = indexedDB.open('gdoks');
		openReq.onsuccess = function(evt){
			var db = evt.target.result;
			db.transaction('usuarios').objectStore('usuarios').getAll().onsuccess = function(evt){
				$scope.$apply(function(){
					$scope.dataValidadores.possiveisValidadores = evt.target.result;

					// removendo os usuários que já são validadores da disciplina
					for (var i = $scope.disciplina.validadores.length - 1; i >= 0; i--) {
						$scope.dataValidadores.possiveisValidadores = $scope.dataValidadores.possiveisValidadores.filter(function(a){return a.id != this},$scope.disciplina.validadores[i].id);
					};

					// Criando validador vazio
					var validadorVazio = {"nome":"Selecione um usuário...","id":0,"tipo":1};

					// adicionando o validador vazio ao grupo de possiveis validadores
					$scope.dataValidadores.possiveisValidadores.unshift(validadorVazio);
					
					// Marcando o item defalr		
					$scope.dataValidadores.selecionado = validadorVazio;

					// marcando flag para exibir campo de insersão de novo validador
					$scope.inserindoNovoValidador = true;
				})		
			}
		}
	}

	// definindo função que remove validador
	$scope.removerValidador = function(id_validador){
		if(confirm("Tem certeza que deseja remover o validador da disciplina?")){
			GDoksFactory.removerValidador($scope.disciplina.id,id_validador)
				.success(
					function(response){
						$scope.disciplina.validadores = $scope.disciplina.validadores.filter(function(a){return a.id != this},id_validador);
						$scope.validadores = $scope.validadores.filter(function(a){return a.id != this},id_validador);

						// salvando remoção na base de dados
						indexedDB.open('gdoks').onsuccess = function(evt){
							evt.target.result.transaction('disciplinas','readwrite').objectStore('disciplinas').put($scope.disciplina);
						}
					}
				)
				.error(
					function(error){
						
					}
				);
		}
	}

	// definindo função que cancela alterações em subdisciplina
	$scope.cancelarAlteracoesEmNovoValidador = function(){
		$scope.inserindoNovoValidador = false;
	}

	// definindo função que salva alterações em subdisciplinas
	$scope.salvarValidador = function(){
		GDoksFactory.adicionarValidador($scope.disciplina.id,$scope.dataValidadores.selecionado.id,$scope.tiposDeValidadores.selecionado.id)
			.success(
				function(response){
					// Alterando validador no scope
					$scope.disciplina.validadores.push({"id":$scope.dataValidadores.selecionado.id,"tipo":$scope.tiposDeValidadores.selecionado.id});

					// Alterando o validador na base
					indexedDB.open('gdoks').onsuccess = function(evt){
						// salvando disciplina alterada na base local
						var transaction = evt.target.result.transaction(['disciplinas','usuarios'],'readwrite');
						transaction.objectStore('disciplinas').put($scope.disciplina);

						// alterando o scope.validadores para consistencia da interface
						transaction.objectStore('usuarios').get($scope.dataValidadores.selecionado.id).onsuccess = function(evt){
							var validador = evt.target.result;
							$scope.$apply(function(){
								$scope.validadores.push(validador);
								$scope.inserindoNovoValidador = false;			
							})
						}
					}
				}
			)
			.error(
				function(error){
					
				}
			);
	}
};;(function(){
	// Criando o módulo
	var GrdsModule = angular.module('Grds',[]);

	// Criando função controller de Grds
	var GrdsController = function($scope, $location,GDoksFactory){

		// Iniciando as variáveis
		$scope.clientes = [];
		$scope.projetosListados = [];
		var projetos = [];
		$scope.nPaginas = 0;
		$scope.q = {
			id_cliente:0,
			id_projeto:0,
			enviada:2,
			pagAtual:1
		};

		$scope.qEsq = {
			id_area:undefined,
			id_disciplina:undefined
		};

		// Carregando dados
		loadClientes();
		loadProjetos();

		// FUNÇÕES DE COMUNICAÇÃO COM O SERVIDOR = = = = = = = = = = = = = = = = = = = = = = = =
		function buscar(q){
			$scope.root.carregando = true;
			GDoksFactory.buscarGRD(q).success(function(response){
				$scope.root.carregando = false;
				$scope.resultados = response.result;
				$scope.nPaginas = response.nPaginas;

				// Parsing datas
				var r;
				for (var i = $scope.resultados.length - 1; i >= 0; i--) {
					r = $scope.resultados[i];
					r.datahora_registro = new Date(r.datahora_registro);
					r.datahora_enviada = r.datahora_enviada==null?null:new Date(r.datahora_enviada);
				}
			})
		}

		function goToGrd(id){
			$location.url('/grds/'+id);
		}

		// FUNÇÕES DE RESPOSTA A INTERFACE = = = = = = = = = = = = = = = = = = = = = = = = = = =
		$scope.onNovaClick = function(){
			$location.url('/grds/0');
		}

		$scope.onClienteChange = function(){
			$scope.projetosListados = projetos.filter(
				function(a){
					return (this==0?true:a.id_cliente == this);
				},$scope.q.id_cliente
			);
		}

		$scope.onFormSubmit = function(){
			$scope.q.pagAtual = 1;
			buscar($scope.q);
		}

		$scope.onBuscarClick = function(){
			$scope.q.pagAtual = 1;
			buscar($scope.q);
		}

		$scope.onPreviousPageClick = function(){
			if($scope.q.pagAtual > 1){
				$scope.q.pagAtual--;
				buscar($scope.q);
			}
		}

		$scope.onNextPageClick = function(){
			if($scope.q.pagAtual < $scope.nPaginas){
				$scope.q.pagAtual++;
				buscar($scope.q);
			}
		}

		$scope.onFirstPageClick = function(){
			if($scope.q.pagAtual > 1){
				$scope.q.pagAtual=1;
				buscar($scope.q);
			}	
		}

		$scope.onLastPageClick = function(){
			if($scope.q.pagAtual < $scope.nPaginas){
				$scope.q.pagAtual=$scope.nPaginas;
				buscar($scope.q);
			}	
		}

		$scope.onResultadoClick = function(id){
			goToGrd(id);
		}

		// FUNÇÕES DE CARGA DE DADOS = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
		// função que carrega clientes da base local
		function loadClientes(){
			indexedDB.open('gdoks').onsuccess= function(evt){
				evt.target.result.transaction('clientes').objectStore('clientes').getAll().onsuccess = function(evt){
					$scope.clientes = evt.target.result;
				}
			}
		}

		// função que carrega projetos da base local
		function loadProjetos(){
			indexedDB.open('gdoks').onsuccess= function(evt){
				evt.target.result.transaction('projetos').objectStore('projetos').getAll().onsuccess = function(evt){
					projetos = evt.target.result;
					$scope.projetosListados = projetos;
					$scope.onClienteChange();
					$scope.$apply();
				}
			}
		}



		// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
	}

	// Criando função controller de Grds
	var GrdController = function($scope,$location,GDoksFactory,$routeParams,$mdToast,$mdDialog){

		// Lendo id da url
		var id_grd = $routeParams.id;

		// definindo flag que indica se os codigos emi e os tipos de documento foram carregados
		var codigosEmiCarregados = false;
		var tiposDeDocumentoCarregados = false;
		var grdCarregada = false;

		// Carregando grd
		$scope.grd = null;

		// Definindo e carregando disciplinas
		$scope.disciplinas = [];
		loadDisciplinas();

		// Definindo códigos emis
		$scope.codigosEmi = [];
		loadCodigosEmi();

		// Definindo tipos de documento
		$scope.tiposDeDocumento = [];
		loadTiposDeDocumento();

		// definindo projetos
		$scope.projetos = [];

		// definindo documentos
		$scope.documentos = [];

		// Carregando clientes
		$scope.clientes = [];
		indexedDB.open('gdoks').onsuccess = function(evt){
			evt.target.result.transaction('clientes').objectStore('clientes').getAll().onsuccess = function(evt){
				$scope.clientes = evt.target.result;

				// atribuindo cliente da grd  caso ela tenha sido carregada primeiro
				if($scope.grd != null){
					$scope.grd.cliente = $scope.clientes.find(function(a){return a.id==this},$scope.grd.id_cliente);
				}
			}
		}

		// Define função a ser executada quando o cliente é alterado
		$scope.onClienteChange = function(){
			// Carrega os projetos daquele cliente
			indexedDB.open('gdoks').onsuccess = function(evt){
				evt.target.result.transaction('projetos').objectStore('projetos').getAll().onsuccess = function(evt){
					$scope.projetos = evt.target.result.filter(function(a){return a.id_cliente==this},$scope.grd.cliente.id);
				}
			}
			// Anula o projeto do cliente selecionado
			$scope.grd.projeto = null;
			$scope.grd.alterada = true;
		}

		// Define função a ser executada quando o projeto muda
		$scope.onProjetoChange = function(){
			loadDocumentosDeProjeto($scope.grd.projeto.id);
			loadAreasDeProjeto($scope.grd.projeto.id);
			$scope.grd.alterada = true;
		}

		// Função que leva para a busca de grds
		$scope.goToGrds = function(){
			$location.url('/grds');
		}

		// Função que salva grd
		$scope.salvar = function(){
			// Mostra carregando
			$scope.root.carregando = true;
			
			// Fazendo cópia de grd
			var grd = angular.copy($scope.grd);

			// Aplicando filtro e mapeamento nos documentos para um vetor de dados a ser enviado. 
			grd.docs = ($scope.documentos.filter(function(a){return a.added})).map(function(a){
				var result = {};
				result.id_codEMI = a.codEMI.id;
				result.id_tipo = a.tipo.id;
				result.nFolhas = a.nFolhas;
				result.nVias = a.nVias;
				result.rev_id = a.rev_id;
				return result;
			})

			grd.id_projeto = grd.projeto.id;
			
			// removendo dados desnecessários
			delete grd.cliente;
			delete grd.projeto;

			if($scope.grd.id == undefined || $scope.grd.id==0){
				GDoksFactory.adicionarGrd(grd)
				.success(function(response){
					// Esconde carregando
					$scope.root.carregando = false;

					// Atribuindo id da grd recém criada
					$scope.grd.id = response.newId;

					// Alterando url para coerência
					$location.url('/grds/'+$scope.grd.id);

					// Atribuindo-se a data de registro
					$scope.grd.datahora_registro = new Date();

					// Mudando o tab para o próximo... TODO
					// TODO: Fazer mudar para tab de documentos depois de salvar GRD

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('GRD criada com sucesso!')
						.position('bottom left')
						.hideDelay(5000)
					);
					
				})
				.error(function(error){
					// Esconde carregando
					$scope.root.carregando = false;
				});
			} else {
				GDoksFactory.atualizarGrd(grd)
				.success(function(response){
					// Esconde carregando
					$scope.root.carregando = false;

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('GRD atualizada com sucesso!')
						.position('bottom left')
						.hideDelay(5000)
					);
				})
				.error(function(error){
					// Esconde carregando
					$scope.root.carregando = false;

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Falha ao alterar GRD: ' + error.msg)
						.position('bottom left')
						.hideDelay(5000)
					);

					// imprimindo mensagem no console
					console.warn(error);
				});
			}
		}
		
		// Função que adiciona todos os completados
		$scope.selecionarTodos = function(){
			for (var i = $scope.documentos.length - 1; i >= 0; i--) {
				if($scope.documentos[i].progresso==100){
					$scope.documentos[i].added = true;
					$scope.grd.alterada = true;
				}
			}
		}

		// Vai para a página de um documento
		$scope.goToDoc = function(id_doc){
			$location.url('/documentos/'+id_doc);
		}

		// Baixa o pda mais atual do documento
		$scope.baixarPda = function(id_pda){
			GDoksFactory.baixarPDA(id_pda);
		}

		// Baixa último pda de uma revisão
		$scope.baixarRevisaoAtualizada = function(id_revisao){
			GDoksFactory.baixarRevisaoAtualizada(id_revisao);
		}

		// Função que abre diálogo para alterar observações de uma grd
		$scope.openObservacaoDeGRD = function(evt,obs){
			if(obs==undefined){
				obs = {
					id:0,
					arquivos:[]
				}
			}
			
			$mdDialog.show(
				{
					controller: observacaoDeGrdDialogController,
					locals:{
						obs:angular.copy(obs),
						documentos:$scope.documentos.filter(function(a){return a.added}),
						parentObs:obs,
						parentScope:$scope,
					},
					templateUrl: './app/modules/Grds/observacoesDeGrd.dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose:false
				}
			);
		}

		function observacaoDeGrdDialogController($scope, $route, $filter, $mdDialog,obs,documentos,parentScope,parentObs,Upload,$cookies){
			
			// Passando obs para o scope local
			$scope.obs = obs;
			delete obs;
			$scope.obs.alterada = false;

			// Passando documentos para o scope
			$scope.documentos = documentos;
			delete documentos;
			if($scope.obs.doc_id){
				$scope.obs.doc = $scope.documentos.find(function(d){return d.id==this},$scope.obs.doc_id);
			}

			// Passando grd para scope local
			$scope.grd = parentScope.grd;

			// Definindo hoje
			$scope.hoje = new Date();

			// Definindo vetor de novos arquivos
			$scope.novos_arquivos = [];

			// Definindo função que fecha o dialogo
			$scope.cancelar = function(){
				$mdDialog.hide();
			}

			// Definindo função que remove anexo da observação
			$scope.desanexar = function(index){
				$scope.obs.arquivos.splice(index,1);
				$scope.obs.alterada = true;
			}

			// Definindo função que remove anexo da observação
			$scope.desanexarDosNovos = function(index){
				$scope.novos_arquivos.splice(index,1);
			}

			// Definindo função que salva observação
			$scope.salvar = function () {
				if ($scope.obs.id!=0) {
					atualizar();
				} else {
					inserir();
				}
			}

			// Definindo função que atualiza observação
			function atualizar(){
				// mostrando barra de progresso de upload
				parentScope.root.carregando = true;
				
				// Criando pacote a enviar
				var packToSend = [];
				for (var i = $scope.novos_arquivos.length - 1; i >= 0; i--) {
					packToSend.push({file:$scope.novos_arquivos[i]});
				};

				var data = {
					id:$scope.obs.id,
					id_grd:parentScope.grd.id,
					id_revisao:$scope.obs.doc.rev_id,
					data_recebida:$filter('date')($scope.obs.data_recebida,'yyyy-MM-dd'),
					obs:$scope.obs.obs,
					cc:$scope.obs.cc,
					arquivos:$scope.obs.arquivos.map(function(a){return a.id})
				};

				// Enviando pacote
				Upload.upload(
					{
	                	url: API_ROOT+'/grds/'+$scope.grd.id+'/obs',
	                	method: 'POST',
	                	data: {profiles: packToSend, obs:data},
	                	headers: {'Authorization':$cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}
	            	}
	            ).then(
	            	function(response){
	            		if(response.status == 200){
	            			
	            			// Escondendo o carregando
	            			parentScope.root.carregando = false;

	            			// Configurando a obs do scope pai
	            			parentObs.obs = $scope.obs.obs;
	            			parentObs.cc = $scope.obs.cc;
	            			parentObs.datahora_registrada =  new Date(response.data.datahora_registrada);
	            			parentObs.data_recebida = $scope.obs.data_recebida;
	            			parentObs.idu = $cookies.getObject('user').id;
	            			parentObs.arquivos = $scope.obs.arquivos;
	            			if($scope.obs.id == 0){
	            				parentObs.id = response.data.newId;
	            			}

	            			var escondeDialogo = true;
	            			// tratando arquivos de uploads
	            			for(i in response.data.uploads){
	            				if(response.data.uploads[i].err == 0){
	            					parentObs.arquivos.push({id:response.data.uploads[i].newId,nome_cliente:response.data.uploads[i].file});
	            					
	            					// removendo o arquivo adicionado do vetor de novos arquivos
	            					$scope.novos_arquivos.splice($scope.novos_arquivos.findIndex(function(a){return a.name==this},response.data.uploads[i].file),1);
	            				} else {
	            					// Marcando para sumir como diálogo
	            					escondeDialogo = false;

	            					// Retornando Toast para o usuário
	            					$mdToast.show(
	            						$mdToast.simple()
	            						.textContent('Upload do arquivo '+response.data.uploads[i].file+' falhou: ' + response.data.uploads[i].msg)
	            						.position('bottom left')
	            						.hideDelay(5000)
	            					);
	            				}
	            			}

	            			// Escondendo diálogo se for o caso
	            			if(escondeDialogo){
	            				$mdDialog.hide();
	            			}
	            		}
	            	},
	            	function(error){
	            		
	            		// Escondendo o carregando
	            		parentScope.root.carregando = false;

	            		// Imprimindo erro no console
	            		console.warn(error);

	            		// Retornando Toast para o usuário
	            		$mdToast.show(
	            			$mdToast.simple()
	            			.textContent(error.statusText + ' ' + error.status)
	            			.position('bottom left')
	            			.hideDelay(5000)
	            		);
	            	},
	            	function (evt) {
						$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
					}
	            );
			}

			// Definindo função que insere observação
			function inserir(){

				// mostrando barra de progresso de upload
				parentScope.root.carregando = true;
				
				// Criando pacote a enviar
				var packToSend = [];
				for (var i = $scope.novos_arquivos.length - 1; i >= 0; i--) {
					packToSend.push({file:$scope.novos_arquivos[i]});
				};

				var data = {
					id:0,
					id_grd:parentScope.grd.id,
					id_revisao:$scope.obs.doc.rev_id,
					data_recebida:$filter('date')($scope.obs.data_recebida,'yyyy-MM-dd'),
					obs:$scope.obs.obs,
					cc:$scope.obs.cc,
					arquivos:$scope.obs.arquivos.map(function(a){return a.id})
				};

				// Enviando pacote
				Upload.upload(
					{
	                	url: API_ROOT+'/grds/'+$scope.grd.id+'/obs',
	                	method: 'POST',
	                	data: {profiles: packToSend, obs:data},
	                	headers: {'Authorization':$cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}
	            	}
	            ).then(
	            	function(response){

	            		if(response.status == 200){
	            			
	            			// Escondendo o carregando
	            			parentScope.root.carregando = false;

	            			// Configurando a obs do scope pai

	            			parentObs.id = response.data.newId;
	            			parentObs.obs = $scope.obs.obs;
	            			parentObs.cc = $scope.obs.cc;
	            			parentObs.datahora_registrada =  new Date(response.data.datahora_registrada);
	            			parentObs.data_recebida = $scope.obs.data_recebida;
	            			parentObs.idu = $cookies.getObject('user').id;
	            			parentObs.arquivos = $scope.obs.arquivos;
	            			
	            			var escondeDialogo = true;
	            			// tratando arquivos de uploads
	            			for(i in response.data.uploads){
	            				if(response.data.uploads[i].err == 0){
	            					parentObs.arquivos.push({id:response.data.uploads[i].newId,nome_cliente:response.data.uploads[i].file});
	            					
	            					// removendo o arquivo adicionado do vetor de novos arquivos
	            					$scope.novos_arquivos.splice($scope.novos_arquivos.findIndex(function(a){return a.name==this},response.data.uploads[i].file),1);
	            				} else {
	            					// Marcando para sumir como diálogo
	            					escondeDialogo = false;

	            					// Retornando Toast para o usuário
	            					$mdToast.show(
	            						$mdToast.simple()
	            						.textContent('Upload do arquivo '+response.data.uploads[i].file+' falhou: ' + response.data.uploads[i].msg)
	            						.position('bottom left')
	            						.hideDelay(5000)
	            					);
	            				}
	            			}
							
	            			// Escondendo diálogo se for o caso
	            			$mdDialog.hide();

	            			// Retornando Toast para o usuário
        					$mdToast.show(
        						$mdToast.simple()
        						.textContent('Observação cadastrada com sucesso.')
        						.position('bottom left')
        						.hideDelay(5000)
        					);

        					// recarregando a view
        					$route.reload();
	            		}
	            		
	            	},
	            	function(error){
	            		
	            		// Escondendo o carregando
	            		parentScope.root.carregando = false;

	            		// Imprimindo erro no console
	            		console.warn(error);

	            		// Retornando Toast para o usuário
	            		$mdToast.show(
	            			$mdToast.simple()
	            			.textContent(error.statusText + ' ' + error.status)
	            			.position('bottom left')
	            			.hideDelay(5000)
	            		);
	            	},
	            	function (evt) {
						$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
					}
	            );
			}
		}

		// Função que abre diálogo para alterar oções de documento de grd
		$scope.openOpcoesDeDocumentoDialog = function(evt,doc){
			// Mostra diálogo somente se grd não foi enviada ainda.
			if($scope.grd.datahora_enviada==null){
				$mdDialog.show(
					{
						controller: opcoesDeDocumentoDialogController,
						locals:{
							doc:angular.copy(doc),
							parentDoc:doc,
							parentScope:$scope,
						},
						templateUrl: './app/modules/Grds/grddoc.dialog.tmpl.html',
						parent: angular.element(document.body),
						targetEvent: evt,
						clickOutsideToClose:true
					})
					.then(function(answer) {
					$scope.status = 'You said the information was "' + answer + '".';
					}, function() {
					$scope.status = 'You cancelled the dialog.';
					});
			}
		}

		// Função controller da caixa de diálogo de opções de um documento de grd
		function opcoesDeDocumentoDialogController($scope,doc,parentDoc,parentScope){
			
			$scope.doc = doc;
			$scope.codigosEmi = parentScope.codigosEmi;
			$scope.tiposDeDocumento = parentScope.tiposDeDocumento;
			$scope.doc.codEMI = $scope.codigosEmi.find(function(a){return 1*a.id==1*this}, doc.codEMI.id);
			$scope.doc.tipo = $scope.tiposDeDocumento.find(function(a){return a.id==this}, doc.tipo.id);

			$scope.cancelar = function(){
				$mdDialog.hide();
			}

			$scope.salvar = function(){
				parentDoc.codEMI = $scope.doc.codEMI;
				parentDoc.tipo = $scope.doc.tipo;
				parentDoc.nVias = $scope.doc.nVias;
				parentDoc.nFolhas = $scope.doc.nFolhas;
				parentScope.grd.alterada = true;
				
				// Escondendo caixa de dialogo
				$mdDialog.hide();
			}
		}

		// Função que abre diálogo para alterar endereço físico do documento/revisão
		$scope.openEndFisicoDialog = function(evt,doc){
			$mdDialog.show(
				{
					controller: endFisicoDialogController,
					locals:{
						doc:angular.copy(doc),
						parentDoc:doc,
						parentScope:$scope
					},
					templateUrl: './app/modules/Grds/endfisico.dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose:true
				})
				.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
				}, function() {
				$scope.status = 'You cancelled the dialog.';
				});
		}

		// Função controller do diálogo para alterar endereço físico
		function endFisicoDialogController($scope,parentScope,parentDoc,doc){
			$scope.doc = doc;

			$scope.cancelar = function(){
				$mdDialog.hide();
			}

			$scope.salvar = function(){

				// Mostra carregando
				parentScope.root.carregando = true;

				// Fazendo requisição
				GDoksFactory.updateEndFisico(doc)
				.success(function(response){
					// Escondendo carregando
					parentScope.root.carregando = false;

					// Alterando o endereço físico no documento
					if(doc.end_fisico == null || doc.end_fisico.trim()==''){
						parentDoc.end_fisico = null;
					} else {
						parentDoc.end_fisico = doc.end_fisico;
					}					

					// Escondendo caixa de diálogo
					$mdDialog.hide();

				})
				.error(function(error){
					// Escondendo carregando
					parentScope.root.carregando = false;

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Não foi possível alterar endereço físico.')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Imprimindo erro no console
					console.warn(error)

				});
			}
		}

		// Função executada quando se clica no burão para visualizar o GRD
		$scope.onVisualizarGrdClick = function(){
			GDoksFactory.viewGRD($scope.grd.id);
		}

		$scope.onBaixarGrdEmZipClick = function(){
			GDoksFactory.downloadGRD($scope.grd.id);
		}

		$scope.confirmFtpUploadController = function(evt){
			var confirm = $mdDialog.confirm()
				.title('Enviar GRD via FTP')
				.textContent('Deseja enviar a GRD e seus arquivos para o servidor FTP do cliente?')
				.ariaLabel('Enviar via FTP')
				.targetEvent(evt)
				.ok('Sim')
				.cancel('Não');
			$mdDialog.show(confirm)
			.then(
				function() {
					// Mostra carregando
					$scope.root.carregando = true;

					// Fazendo requisição de envio
					GDoksFactory.ftpGRD($scope.grd.id)
					.success(function(response){
						// Esconde carregando
						$scope.root.carregando = false;

						// Marcando a grd como enviada
						$scope.grd.datahora_enviada = new Date(response.datahora_enviada);

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('GRD foi enviada com sucesso para o servidor do cliente.')
							.position('bottom left')
							.hideDelay(5000)
						);
					})
					.error(function(error){
						// Esconde carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent(error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);

						// Imprimindo erro no console
						console.warn(error);
					})
				}
			);
		}

		$scope.confirmPublicarController = function(evt){
			var confirm = $mdDialog.confirm()
				.title('Publicar GRD na área do cliente')
				.textContent('Tem certeza que deseja Publicar a GRD na área do cliente?')
				.ariaLabel('Publicar GRD na área do cliente')
				.targetEvent(evt)
				.ok('Sim')
				.cancel('Não');
			$mdDialog.show(confirm)
			.then(
				function() {
					// Mostra carregando
					$scope.root.carregando = true;

					// Fazendo requisição de envio
					GDoksFactory.publicarGRD($scope.grd.id)
					.success(function(response){
						// Esconde carregando
						$scope.root.carregando = false;

						// Marcando a grd como enviada
						$scope.grd.datahora_enviada = new Date(response.datahora_enviada);

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('GRD foi publicada com sucesso.')
							.position('bottom left')
							.hideDelay(5000)
						);
					})
					.error(function(error){
						// Esconde carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent(error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);

						// Imprimindo erro no console
						console.warn(error);
					})
				}
			);
		}

		$scope.openDialogDeEnviarLinkPorEmail = function(evt){
			$mdDialog.show(
				{
					controller: enviarLinkViaEmailDialogController,
					locals:{
						parentScope:$scope,
					},
					templateUrl: './app/modules/Grds/enviarLinkViaEmail.dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose:false
				});
		}

		function enviarLinkViaEmailDialogController($scope,parentScope,GDoksFactory){
			// Amarrando a grd deste scope com o parentScope
			$scope.grd = parentScope.grd;

			// Definindo mensagem
			$scope.mail = {
				destinatarios:[
					{
						nome:$scope.grd.cliente.contato_nome,
						email:$scope.grd.cliente.contato_email
					}
				],
				assunto:'Link para '+$scope.grd.codigo,
				msg:'Faça o download da [link]'+$scope.grd.codigo+'[/link]'
			}

			// Definindo função que adiciona um destinatário
			$scope.addDestinatario = function(){
				$scope.mail.destinatarios.push({nome:'','email':''});
			}

			$scope.removeDestinatario = function(index){
				$scope.mail.destinatarios.splice(index,1);	
			}

			// Função que fecha caixa de diálogo.
			$scope.cancelar = function(){
				$mdDialog.hide();
			}

			$scope.enviar = function(){
				
				// mostra carregando
				parentScope.root.carregando == true;

				GDoksFactory.mailLinkGRD($scope.grd.id,$scope.mail)
				.success(function(response){
					// Esconde carregando
					parentScope.root.carregando = false;

					// Verificando se tem algum erro no envio
					if(response.error == 0){
						// Atualizando a datahora de envio da grd
						parentScope.grd.datahora_enviada = new Date(response.datahora_enviada);

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('GRD enviada com successo!')
							.position('bottom left')
							.hideDelay(5000)
						);
					} else {
						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Falha no envio. Tente novamente mais tarde.')
							.position('bottom left')
							.hideDelay(5000)
						);

						// Imprimindo erro no console
						console.warn(response.msg);
					}

					// Escondendo dialogo
					$mdDialog.hide();
				})
				.error(function(error){
					// Esconde carregando
					parentScope.root.carregando = false;

					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Falha no envio da GRD')
						.position('bottom left')
						.hideDelay(5000)
					);

					// imprimindo erro no console
					console.warn(error);
				});
			}

			// Verificando se a mensagem tem a pseudotag link
			$scope.msgTemLink = function(){
				var re = /\[link\].+\[\/link\]/;
				return $scope.mail.msg.match(re)!=null;
			}
		}

		// FUNÇÕES DE CARGA DE DADOS = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

			// Função que carrega códigos EMI
			function loadCodigosEmi(){
				GDoksFactory.getCodigosEmi()
				.success(function(response){
					// Setando codigos emi no scope
					$scope.codigosEmi = response.codigosEmi;

					// Definindo código EMI padrão
					$scope.codigoEmiPadrao = $scope.codigosEmi[1];

					// Marcando como carregado
					codigosEmiCarregados = true;

					// tentando carregar grd
					loadGrd(id_grd);
				})
				.error(function(error){
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Não foi possível carregar Códigos EMI.')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Imprimindo erro no console
					console.warn(error);
				});
			}

			// Função que carrega Tipos de Documento
			function loadTiposDeDocumento(){
				GDoksFactory.getTiposDeDocumento()
				.success(function(response){
					// Setando codigos emi no scope
					$scope.tiposDeDocumento = response.tiposDeDocumento;

					// Definindo código EMI padrão
					$scope.tipoDeDocumentoPadrao = $scope.tiposDeDocumento[0];

					// Marcando como carregado
					tiposDeDocumentoCarregados = true;

					// tentando carregar grd
					loadGrd(id_grd);

				})
				.error(function(error){
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Não foi possível carregar tipos de documento.')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Imprimindo erro no console
					console.warn(error);
				});
			}

			// Função que carrega a GRD
			function loadGrd(id){
				if(id == 0){
					$scope.grd = {
						id: 0,
						alterada:false,
						projeto_ativo:true
					};
				} else {
					// verificando se tipos de documento e codigos emi estão carregados
					if(codigosEmiCarregados && tiposDeDocumentoCarregados){

						// Mostra carregando
						$scope.root.carregado = true;

						// Carregando GRD do servidor
						GDoksFactory.getGrd(id)
						.success(function(response){

							// Esconde carregando
							$scope.root.carregando = false;

							// Settando GRD no scope
							$scope.grd = response.grd;
							$scope.grd.alterada = false;

							// Carregando CodigosEMI, Tipos de documento e documentos do projeto desta grd
							loadDocumentosDeProjeto($scope.grd.id_projeto);

							// parsing datas
							$scope.grd.datahora_enviada = ($scope.grd.datahora_enviada!=null) ? new Date($scope.grd.datahora_enviada) : null;
							$scope.grd.datahora_registro = new Date($scope.grd.datahora_registro);

							// Se a grd já foi enviada para o cliente, tenta carregar
							if($scope.grd.datahora_enviada!=null){
								loadObservacoes();
							}

							// Verificando se a grd é de um projeto ativo;
							if($scope.grd.projeto_ativo == 1) {
								// Projeto ativo. Carregando o projeto da base local
								indexedDB.open('gdoks').onsuccess = function(evt){
									evt.target.result.transaction('projetos').objectStore('projetos').getAll().onsuccess = function(evt){
										// Levantando os projetos do cliente
										$scope.projetos = evt.target.result.filter(function(a){return a.id_cliente==this},$scope.grd.id_cliente);

										// atribuindo projeto a grd
										$scope.grd.projeto = $scope.projetos.find(function(a){return a.id==this}, $scope.grd.id_projeto);

										// apagando propriedade id_projeto
										delete $scope.grd.id_projeto;
										delete $scope.grd.id_cliente;
									}
								}
							} else {
								// Projeto da GRD é inativo. As informações do projeto já estão carregadas na GRD.
								// Push o projeto da GRD no $scope.projetos
								$scope.projetos.push($scope.grd.projeto);
							}

							// Mostrando alerta caso a GRD seja de um projeto inativo
							if($scope.grd.projeto_ativo == 0){
								$mdDialog.show(
								$mdDialog.alert()
									.clickOutsideToClose(false)
									.title('Essa GRD é de um projeto inativo!')
									.textContent('Algumas informações dela não poderão ser alteradas. Ela não poderá ser enviada para o cliente.')
									.ariaLabel('GRD de projeto inativo')
									.ok('OK')
								);
							}

							// atribuindo o cliente
							$scope.grd.cliente = $scope.clientes.find(function(a){return a.id==this},$scope.grd.projeto.id_cliente);

							// Carregando áreas do projeto
							loadAreasDeProjeto($scope.grd.projeto.id);
						})
						.error(function(error){
							// Esconde carregando
							$scope.root.carregando = false;

							// Retornando Toast para o usuário
							$mdToast.show(
								$mdToast.simple()
								.textContent('Falha ao tentar carregar GRD: '+error.msg)
								.position('bottom left')
								.hideDelay(5000)
							);

							// Imprimindo erro no console
							console.warn(error);
						});
					}
				}
			}

			// Função que carrega documentos de um projeto e põe no scope.
			// Só funciona direito se códigos emi e tipos de documento já tiverem sido carregados
			function loadDocumentosDeProjeto(id_projeto){
				GDoksFactory.getDocumentosDoProjeto(id_projeto)
				.success(function(response){
					
					// Declarando variáveis locais
					var documentos = response.documentos;
					var doc;
					
					// Parsing documentos
					for (var i = documentos.length - 1; i >= 0; i--) {

						// Lendo o documento da vez para a variável doc
						doc = documentos[i];

						//verificando se documento está adicionado a grd
						if($scope.grd.docs != undefined){

							// Buscando o documento na GRD
							var grdDoc = $scope.grd.docs.find(function(a){return a.id_documento==this},doc.id);

							if(grdDoc == undefined){
								// Documento não foi adicionado a grd. Mantendo valores padrão
								doc.added = false;
								doc.nVias = 1;
								doc.nFolhas = 1;
								doc.tipo = $scope.tipoDeDocumentoPadrao;
								doc.codEMI = $scope.codigoEmiPadrao;
							} else {
								// Documento já foi adicionado a grd. Carregando os valores dele
								doc.added = true;
								doc.rev_id = grdDoc.id_revisao;
								doc.rev_serial = grdDoc.serial_revisao;
								doc.nVias = grdDoc.nVias;
								doc.nFolhas = grdDoc.nFolhas;
								doc.tipo = $scope.tiposDeDocumento.find(function(a){return a.id == this},grdDoc.id_tipo);
								doc.codEMI = $scope.codigosEmi.find(function(a){return a.id == this},grdDoc.id_codEMI);
							}
						} else {
							// Nenhum documento não foi adicionado a grd. Mantendo valores padrão
							doc.added = false;
							doc.nVias = 1;
							doc.nFolhas = 1;
							doc.tipo = $scope.tipoDeDocumentoPadrao;
							doc.codEMI = $scope.codigoEmiPadrao;
						}
					}
					$scope.documentos = documentos;
				})
			}

			// Função que carrega disciplinas
			function loadDisciplinas(){
				GDoksFactory.getDisciplinas()
				.success(function(response){
					$scope.disciplinas = response.disciplinas;
				})
				.error(function(error){
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Erro ao carregar disciplinas')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Imprimindo erro no console
					console.warn(error);
				})
			}

			// Função que carrega áreas do projeto
			function loadAreasDeProjeto(id_projeto){
				GDoksFactory.getAreas(id_projeto)
				.success(function(response){
					$scope.areas = response.areas;
				})
				.error(function(response){
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Falha ao tentar carregar áreas do projeto')
						.position('bottom left')
						.hideDelay(5000)
					)

					// Imprimindo erro no console
					console.warn(error);
				});
			}

			function loadObservacoes(){
				GDoksFactory.loadObservacoesDeGRD($scope.grd.id)
				.success(function(response){
					$scope.grd.observacoes = response.observacoes;

					// Parsing datas e documentos
					var obs;
					for (var i = $scope.grd.observacoes.length - 1; i >= 0; i--) {
						obs = $scope.grd.observacoes[i];
						obs.data_recebida = new Date(obs.data_recebida+' 00:00:00');
						obs.datahora_registrada = new Date(obs.datahora_registrada);
						obs.doc = $scope.documentos.find(function(a){return a.id==this},obs.doc_id);
					}

					// Parsing nomes dos usuários
					indexedDB.open('gdoks').onsuccess = function(evt){
						var os = evt.target.result.transaction('usuarios').objectStore('usuarios');
						var obs;
						for (var i = $scope.grd.observacoes.length - 1; i >= 0; i--) {
							obs = $scope.grd.observacoes[i];
							os.get(obs.idu).onsuccess = function(evt){
								obs.nome_usuario = evt.target.result.nome;
							}
						}
					}
				})
				.error(function(error){
					
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Não foi possível carregar obvservacoes da grd')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Imprimindo erro no console
					console.warn(error);
				});
			}
		// FIM DE FUNÇÕES DE CARGA DE DADOS = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
	}

	// Atribuindo função controller ao módulo
	GrdsModule.controller('GrdsController',GrdsController);
	GrdsModule.controller('GrdController',GrdController);

})();angular.module('Nav',[]).controller('NavController',NavController);

function NavController($scope){
	// variável que controla o estado de Nav (se deve ser expanded ou não)
	$scope.menuExpanded = false;

	// Função que altera o item do menu selecionado
	$scope.itemClicked = function(index){
		$scope.root.itemSelecionadoDoMenu = index;
		$scope.menuExpanded = false;
	}


	$scope.expandMenu = function(){
		$scope.menuExpanded = true;
	}

	$scope.contractMenu = function(){
		$scope.menuExpanded = false;
	}
};angular.module('Log',[])
.controller('LogController',function($scope,$cookies,GDoksFactory){
	// Definindo logs
	$scope.logs = [];

	// Levantando usuários da base
	$scope.usuarios = [];
	$scope.dicUsuarios = [];
	indexedDB.open("gdoks").onsuccess = function(evt){
		evt.target.result.transaction("usuarios").objectStore("usuarios").getAll().onsuccess = function(evt){
			$scope.$apply(function(){
				$scope.usuarios = evt.target.result;
				$scope.q.uid = $cookies.getObject('user').id;
				$scope.usuariosCarregados = true;

				// criando dicionário de usuários
				for (var i = $scope.usuarios.length - 1; i >= 0; i--) {
					$scope.dicUsuarios[$scope.usuarios[i].id] = $scope.usuarios[i];
				}
			});
		}
	}
	// Levantando ações
	$scope.acoes = [];
	$scope.dicAcoes = [];
	GDoksFactory.getAcoes().success(function(response){
		$scope.acoes = response.acoes;
		$scope.acoesCarregadas = true;
		$scope.q.aid = 0;
		// criando dicionário de acoes
		for (var i = $scope.acoes.length - 1; i >= 0; i--) {
			$scope.dicAcoes[$scope.acoes[i].id] = $scope.acoes[i];
		}
	})

	// Definindo valores padrão para parâmetros de busca
	$scope.q = {
					de:(new Date()),
					ate:(new Date()),
					uid:$cookies.getObject('user').id,
					aid:0
				};
	// Flags de controle
	$scope.usuariosCarregados = false;
	$scope.acoesCarregadas = false;

	// Definindo função que faz a consulta ao log
	$scope.getLogs = function(){
		GDoksFactory.getLogs($scope.q).success(function(response){
			$scope.logs = response.logs;
			for (var i = $scope.logs.length - 1; i >= 0; i--) {
				$scope.logs[i].data = new Date($scope.logs[i].data);
			}
		});
	}

	// Chamando a função logo quando carrega a tela
	$scope.getLogs();

}).filter('logDescreveAcao',function(){
	return function(log,dicAcoes){
		var descricao = '';

		if(log.parametros == null){
			descricao = dicAcoes[log.id_acao].descricao;
		} else {
			var parametros = log.parametros.split(',');
			descricao = dicAcoes[log.id_acao].descricao;
			for (var i = parametros.length - 1; i >= 0; i--) {
				descricao = descricao.replace('$'+(i+1),parametros[i]);
			}
		}
		return descricao;
	}
}).filter('logUsername',function(){
	return function(log,dicUsuarios){
		// verificando se os usuários já foram carregados da base local e o dicionário foi criado
		if(dicUsuarios[log.id_usuario] == undefined){
			// Ainda não carregou dados da base, retornando string vazia
			return '';
		} else {
			// Carregou dados da base. Dois primeiros nomes do usuário.
			return(dicUsuarios[log.id_usuario].nome.split(' ').splice(0,2).join(' '));
		}
	}
})
;angular.module('Opcoes',[])
.controller('OpcoesController',function($scope,$cookies,$location){
	$scope.onTrocarSenhaClick  = function(){
		$location.url("/senha");
	}
	$scope.logout = function(){
		$cookies.remove('user',{path:'/'});
		indexedDB.deleteDatabase('gdoks');
		window.location = '/';
	}
});;(function(){
	angular.module('Projetos',['ngFileUpload','ngTagsInput'])
	.controller('ProjetosController',ProjetosController)
	.controller('ProjetoController',ProjetoController)
	.controller('DashProjetoController',DashProjetoController);

	function ProjetosController($scope,GDoksFactory,$location){

		// Definindo o valor mínimo para que a busca de projeto seja executada
		$scope.minBusca = 3;
		$scope.q = {'nome':''};

		// Definindo a variável de scopo 'projetos'
		$scope.projetos = null;
		$scope.historico = null;

		// Definindo variável local auxiliar ids_historico
		var ids_projetos = null;

		// Definindo critério padrão de ordem
		$scope.o = 'nome';

		// Definindo valor padrão para mostrar inativos ou não
		$scope.mostrarInativos = false;
		
		// Carregando projetos sem listar os inativos
		getProjetos($scope.mostrarInativos);
		

		// Carregando histórico de projetos carregados
		GDoksFactory.getHistProjetos()
		.success(function(response){
			ids_projetos = response.historico;
			parseHistorico();
		})
		.error(function(error){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent('Falha ao tentar carregar histórico de projetos')
				.position('bottom left')
				.hideDelay(5000)
			);

			// Imprimindo erro no console
			console.warn(error);
		});

		// Definindo função que cria vetor de histórico de projetos
		function parseHistorico(){
			if($scope.projetos != null && ids_projetos != null){

				// Definindo o histórico como um vetor vazio
				$scope.historico = [];

				// Construindo vetor de histórico
				for (var i = 0; i < ids_projetos.length; i++) {
					$scope.historico.push($scope.projetos.find(function(a){return a.id == this},ids_projetos[i].id_projeto))
				}
			}
		}


		// Definindo função que carrega projetos
		function getProjetos(listarInativos){

			// Mostrar carregando
			$scope.root.carregando = true;

			GDoksFactory.getProjetosDetalhados(listarInativos)
			.success(function(response){
				// Escondendo carregando
				$scope.root.carregando = false;

				// Lendo response para o scope
				$scope.projetos = response.projetos;

				// Parsing histórico
				parseHistorico();
			})
			.error(function(error){

				// Esconde Carregando
				$scope.root.carregando = false;
				
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Não foi possível carregar os projetos do servidor.')
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);
			});

		}
			
		// Definindo função que será executada ao clicar no botão de listar projetos
		$scope.onListarProjetosClick = function(){

			// Trocando o valor de mostrarInativos
			$scope.mostrarInativos = !$scope.mostrarInativos;

			// Recarregando projetos
			getProjetos($scope.mostrarInativos);
		}	

		// função que leva para a tela de adicionar projeto
		$scope.goToAddProjeto = function(){
			$location.url('/projetos/0');
		}

		// Função que leva a tela de edição de projeto
		$scope.editProjeto = function(id,evt){
			evt.stopPropagation();
			$location.url('/projetos/'+id);
		}

		// Função que leva a dashboard do projeto
		$scope.gotoProjeto = function(id){
			$location.url('/projetos/'+id+'/dashboard');
		}

		// Função que altera a ordem de exibição dos projetos
		$scope.setOrderBy = function(ordem){
			if($scope.o == ordem){
				$scope.o = '-' + ordem;
			} else {
				$scope.o = ordem;
			}
		}

	};

	function ProjetoController($scope,$routeParams,$timeout,$cookies,Upload,GDoksFactory,$mdToast,$location){

		// Variáveis de controle sobre o conteúdo de clientes e usuários (se info já foi carregada da base);
		var clientesCarregados = false;
		var usuariosCarregados = false;
		var disciplinasCarregadas = false;
		var cargosCarregados = false;
		var documentosCarregados = false;

		// Carregando clientes da base local
		$scope.clientes = {};
		$scope.clientes.dados = [];
		GDoksFactory.getClientes()
		.success(function(response){
			$scope.clientes.dados = response.clientes;
			clientesCarregados = true;
	 		carregaProjeto();
		})
		.error(function(error){});

		// Carregando usuarios da base local
		$scope.usuarios = {};
		$scope.usuarios.dados = [];
		GDoksFactory.loadUsuarios()
		.success(function(response){
				// Carregando usuários
				$scope.usuarios.dados = response.usuarios;
				usuariosCarregados = true;
				carregaProjeto();
			}
		)
		.error(function(error){});


		// Carregando disciplinas da base local
		$scope.disciplinas = [];
		GDoksFactory.getDisciplinas()
		.success(function(response){
			$scope.disciplinas = response.disciplinas;
			disciplinasCarregadas = true;
			carregaProjeto();
		})
		.error(function(error){});

		// Carregando cargos do servidor
		$scope.cargos = [];
		GDoksFactory.getCargos().success(function(response){
			$scope.cargos = response.cargos;
			cargosCarregados = true;
			carregaProjeto();
		});

		// Função a ser executada depois de carregados clientes e usuários da base
		function carregaProjeto(){
			// Só executa quando clientes e usuários foram carregados.
			if(clientesCarregados && usuariosCarregados && disciplinasCarregadas && cargosCarregados){
				$scope.projeto = {};
				$scope.projeto.id = $routeParams.id;
				
				// Criando o projeto em questão
				if($scope.projeto.id == 0 || $scope.projeto.id == undefined) {
					// Projeto novo
					$scope.projeto.id = 0
					$scope.projeto.nome = '';
					$scope.projeto.codigo = '';
					$scope.projeto.id_cliente = 0;
					$scope.projeto.id_responsavel = 0;
					$scope.projeto.data_inicio_p = new Date();
					$scope.projeto.data_final_p = new Date();
					$scope.projeto.ativo = true;
					$scope.projeto.daos = [];
					$scope.projeto.areas = [];
					$scope.projeto.subareas = [];
					$scope.projeto.documentos = [];
					$scope.inicialmenteAtivo = true;
				} else {
					GDoksFactory.getProjeto($scope.projeto.id)
					.success(function(response){
						$scope.projeto = response.projeto;
						$scope.projeto.id_responsavel = ($scope.projeto.id_responsavel==null)?0:$scope.projeto.id_responsavel;
						$scope.projeto.id_cliente = ($scope.projeto.id_cliente==null)?0:$scope.projeto.id_cliente;
						$scope.clientes.selecionado = $scope.clientes.dados.filter(function(a){return a.id==this},$scope.projeto.id_cliente)[0];
						$scope.usuarios.selecionado = $scope.usuarios.dados.filter(function(a){return a.id==this},$scope.projeto.id_responsavel)[0];
						$scope.projeto.ativo = ($scope.projeto.ativo == 1);
						$scope.inicialmenteAtivo = $scope.projeto.ativo;

						// parsing dates
						if($scope.projeto.data_inicio_p != null){
							$scope.projeto.data_inicio_p = new Date($scope.projeto.data_inicio_p);
							$scope.projeto.data_inicio_p.setTime($scope.projeto.data_inicio_p.getTime() + (3*60*60*1000)) // ajustando para horário local do Brasil
						}
						if($scope.projeto.data_final_p != null){
							$scope.projeto.data_final_p = new Date($scope.projeto.data_final_p);
							$scope.projeto.data_final_p.setTime($scope.projeto.data_final_p.getTime() + (3*60*60*1000)) // ajustando para horário local do Brasil
						}

						// parsing subareas
						var area;
						for (var i = $scope.projeto.subareas.length - 1; i >= 0; i--) {
							$scope.projeto.subareas[i].area = $scope.projeto.areas.find(function(a){return a.id==this},$scope.projeto.subareas[i].id_area);
							delete $scope.projeto.subareas[i].id_area;
						}

						// Carrega documentos
						carregaDocumentos();
						
					})
					.error(function(error){
					})
				}
			}
		}

		function carregaDocumentos(){
			if ($scope.projeto.id != 0) {
				GDoksFactory.getDocumentosDoProjeto($scope.projeto.id)
				.success(function(response){
					var docs = response.documentos;
					var achouSub,j,k;
					for (var i = docs.length - 1; i >= 0; i--) {
						// parsing data_limite
						docs[i].data_limite = new Date(docs[i].data_limite+'T00:00:00');

						// Corrigindo fuso
						docs[i].data_limite.setMinutes(docs[i].data_limite.getMinutes() + docs[i].data_limite.getTimezoneOffset());
						
						// parsing subarea
						docs[i].subarea = $scope.projeto.subareas.find(function(a){return a.id == this},docs[i].id_subarea);
						delete docs[i].id_subarea;

						// parsing subdisciplinas
						achouSub = false;
						j = 0;
						while(j<$scope.disciplinas.length && !achouSub){
							k = 0;
							while(k<$scope.disciplinas[j].subs.length && !achouSub){
								achouSub = ($scope.disciplinas[j].subs[k].id == docs[i].id_subdisciplina);
								if(achouSub){
									docs[i].subdisciplina = $scope.disciplinas[j].subs[k];
									docs[i].subdisciplina.disciplina = $scope.disciplinas[j];
									delete docs[i].id_subdisciplina;
								}
								k++;
							}
							j++;
						}

						// parsing dependências
						for (var j = docs[i].dependencias.length - 1; j >= 0; j--) {
							docs[i].dependencias[j] = docs.find(function(a){return a.id==this},docs[i].dependencias[j]);
						}

						// Parsing data_limite
						if(docs[i].data_limite != null){
							docs[i].data_limite = new Date(docs[i].data_limite);
							docs[i].data_limite.setTime(docs[i].data_limite.getTime() + (3*60*60*1000)); // ajustando para o horário local do brasil!
						}
						
						// Parsing HHs
						for (var j = docs[i].hhs.length - 1; j >= 0; j--) {
							docs[i].hhs[j].cargo = $scope.cargos.find(function(a){return a.id == this},docs[i].hhs[j].id_cargo);
							delete docs[i].hhs[j].id_cargo;
						}
					}
					$scope.projeto.documentos = docs;
				})
				.error(function(err){});
			}
		}

		// definindo função Cancel
		$scope.cancel = function(){
			window.location = '/webapp/WebGDoks.php#/projetos';
		}

		// Definindo função que salva o projeto
		$scope.salvarProjeto = function(){

			// Mostra carregando
			$scope.root.carregando = true;+'T00:00:00'

			// copiando o objeto projeto
			var projeto = angular.copy($scope.projeto);
			projeto.id_cliente = $scope.clientes.selecionado.id;
			projeto.id_responsavel = $scope.usuarios.selecionado.id;
			
			// removendo campos que não serão enviados
			delete projeto.daos;
			delete projeto.areas;
			delete projeto.documentos;
			delete projeto.subareas;

			if(projeto.id == 0){
				GDoksFactory.adicionarProjeto(projeto)
				.success(
					function(response){

						// Esconde Carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Dados do projeto inseridos com sucesso!')
							.position('bottom left')
							.hideDelay(5000)
						);

						$scope.projeto.id = 1*response.newId;
						projeto.id = response.newId;

						// Adicionando projeto na base local
						indexedDB.open('gdoks').onsuccess = function(evt){
							// limpando dados para armazenamento na base local.
							delete projeto.id_responsavel;
							delete projeto.data_inicio_p;
							delete projeto.data_final_p;

							// armazenando
							var reqAdd = evt.target.result.transaction('projetos','readwrite').objectStore('projetos').add(projeto);
							reqAdd.onsuccess = function(evt){}
							reqAdd.onerror = function(evt){}
						}

						// Alterando url para que fique condizente com o do id do projeto recém criado
						$location.url('/projetos/'+$scope.projeto.id);
					}
				)
				.error(
					function(error){
						// Esconde Carregando
						$scope.root.carregando = false;

						// Exibindo mensagem de erro no console
						console.warn(error);

						// Retornando Toast para usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Não foi possível completar ação.')
							.position('bottom left')
							.hideDelay(5000)
						);
					}
				);
			} else {
				GDoksFactory.atualizarProjeto(projeto)
				.success(
					function(response){
						// Esconde Carregando
						$scope.root.carregando = false;

						// Retornando toast para usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Dados do projeto alterados com sucesso!')
							.position('bottom left')
							.hideDelay(5000)
						);

						// Atualizando projeto na base local
						indexedDB.open('gdoks').onsuccess = function(evt){
							// limpando dados para armazenamento.
							delete projeto.id_responsavel;
							delete projeto.data_inicio_p;
							delete projeto.data_final_p;

							// armazenando.
							evt.target.result.transaction('projetos','readwrite').objectStore('projetos').put(projeto);
						}
					}
				)
				.error(
					function(error){
						// Esconde Carregando
						$scope.root.carregando = false;

						// Exibindo mensagem de erro no console
						console.warn(error);

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Não foi possível completar a ação!')
							.position('bottom left')
							.hideDelay(5000)
						);
					}
				);
			}
		}
	};

	function DashProjetoController($scope,GDoksFactory,$location,$routeParams){
		
		// Definindo variável projeto
		$scope.projeto = {};
		$scope.documentos = [];
		$scope.grds = [];

		// Carregando projeto	
		GDoksFactory.getProjeto($routeParams.id)
		.success(function(response){
			if(response.error == 0){
				// Parsing datas do projeto
				response.projeto.data_inicio_p = new Date(response.projeto.data_inicio_p+'T00:00:00');
				response.projeto.data_final_p = new Date(response.projeto.data_final_p+'T00:00:00');
				$scope.projeto = response.projeto;
			} else {
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao tentar carregar dados do projeto: ' + response.msg)
					.position('bottom left')
					.hideDelay(5000)
				);
			}
		})
		.error(function(err){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent(err.msg)
				.position('bottom left')
				.hideDelay(5000)
			);

			// Imprimindo erro no console
			console.warn(err);
		})

		// Carregando documentos do projeto
		GDoksFactory.getDocumentosDoProjeto($routeParams.id)
		.success(function(response){
			if(response.error == 0){
				// parsing datas limites dos documentos
				response.documentos.data_limite = new Date(response.documentos.data_limite+'T00:00:00');
				$scope.documentos = response.documentos;
			} else {
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao tentar carregar documentos do projeto: ' + response.msg)
					.position('bottom left')
					.hideDelay(5000)
				);
			}
		})
		.error(function(err){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent(err.msg)
				.position('bottom left')
				.hideDelay(5000)
			);

			// Imprimindo erro no console
			console.warn(err);
		});

		// Carregando GRDs do projeto
		GDoksFactory.getGrdsDoProjeto($routeParams.id)
		.success(function(response){
			if(response.error == 0){
				// Parsing datahora
				var grd;
				for (var i = response.grds.length - 1; i >= 0; i--) {
					grd = response.grds[i];
					grd.datahora_registro = new Date(grd.datahora_registro);
					grd.datahora_enviada = (grd.datahora_enviada==null?null:(new Date(grd.datahora_enviada)));
				}
				$scope.grds = response.grds;
			} else {
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao tentar carregar GRDs do projeto: ' + response.msg)
					.position('bottom left')
					.hideDelay(5000)
				);
			}
		})
		.error(function(err){
			// Retornando Toast para o usuário
			$mdToast.show(
				$mdToast.simple()
				.textContent(err.msg)
				.position('bottom left')
				.hideDelay(5000)
			);

			// Imprimindo erro no console
			console.warn(err);
		});

		// Função que leva a página do documento
		$scope.goToDoc = function(idDoc){
			$location.url('/documentos/'+idDoc);
		}

		// Função que leva a página da GRD
		$scope.goToGrd = function(idGrd){
			$location.url('/grds/'+idGrd);
		}
	};

})();;angular.module('Projetos').controller('ProjetosAreasController',ProjetosAreasController);
function ProjetosAreasController($scope,GDoksFactory,$mdDialog,$mdToast){
	
	$scope.openAreaDialog = function(ev,idArea){
		// Declarando o objeto area clicado
		var areaClicada;

		// Definindo o objeto area clicado
		if(idArea == 0) {
			areaClicada = {id:0,nome:null,codigo:null};
		} else {
			areaClicada = $scope.projeto.areas.find(function(a){return a.id == this},idArea);
		}
		areaClicada.id_projeto = $scope.projeto.id;

		$mdDialog.show(
			{
				controller: function($scope,area,parentArea,parentAreas){
					
					$scope.area = area;
					$scope.salvar = function(area){
						if(area.id == 0){
							GDoksFactory.adicionarArea(area)
							.success(function(response){
								area.id = response.newId;
								parentAreas.push(area);
								$mdToast.show(
									$mdToast.simple()
									.textContent('Nova área inserida com sucesso!')
									.position('bottom left')
									.hideDelay(5000)
								);
							})
							.error(function(err){
								console.dir(err);
								$mdToast.show(
									$mdToast.simple()
									.textContent('Um erro ocorreu. Não foi possível completar ação!')
									.position('bottom left')
									.hideDelay(5000)
								);
							});
						} else {
							GDoksFactory.atualizarArea(area)
							.success(function(response){
								parentArea.nome = area.nome;
								parentArea.codigo = area.codigo;
								$mdToast.show(
									$mdToast.simple()
									.textContent('Área alterada com sucesso!')
									.position('bottom left')
									.hideDelay(5000)
								);
							})
							.error(function(err){
								console.dir(err);
								$mdToast.show(
									$mdToast.simple()
									.textContent('Um erro ocorreu. Não foi possível completar ação!')
									.position('bottom left')
									.hideDelay(5000)
								);
							});
						}

						// Escondendo o dialog.
						$mdDialog.hide(area);
					};
					
					$scope.cancelar = function(area){
						$mdDialog.hide(area);
					}
					
				},
				locals:{
					area:angular.copy(areaClicada),
					parentArea:areaClicada,
					parentAreas:$scope.projeto.areas
				},
				templateUrl: './app/modules/Projetos/area-dialog.tmpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true
			})
			.then(function(answer) {
			$scope.status = 'You said the information was "' + answer + '".';
			}, function() {
			$scope.status = 'You cancelled the dialog.';
			}
		);
	}

	$scope.openConfirm = function(ev,idArea) {
		// Appending dialog to document.body to cover sidenav in docs app
		var confirm = $mdDialog.confirm()
			.title('Tem certeza que deseja remover esta área?')
			.textContent('A ação não poderá ser desfeita.')
			.ariaLabel('Deseja remover a área?')
			.targetEvent(ev)
			.ok('Sim')
			.cancel('Não');

		$mdDialog.show(confirm).then(
			function() {
				var area = $scope.projeto.areas.find(function(a){return a.id==this},idArea);
				area.id_projeto = $scope.projeto.id;
				GDoksFactory.removerArea(area)
				.success(function(response){
					$scope.projeto.areas = $scope.projeto.areas.filter(function(a){return a.id!= this},idArea);
					$mdToast.show(
						$mdToast.simple()
						.textContent('Área removida!')
						.position('bottom left')
						.hideDelay(5000)
					);
				})
				.error(function(err){
					console.log(err);
					$mdToast.show(
						$mdToast.simple()
						.textContent('Falha ao tentar remover a área.')
						.position('bottom left')
						.hideDelay(5000)
					);
				});
			}
		);
	};
};(function(){

	// carregando o módulo projetos
	var mod = angular.module('Projetos');

	// Atribuindo controller ao módulo
	mod.controller('ProjetosSubareasController',ProjetosSubareasController);
	
	// Definindo controller
	function ProjetosSubareasController($scope,GDoksFactory,$mdDialog,$mdToast){
			$scope.openDialog = function(ev,idSubarea){
				
				// Declarando o objeto area clicado
				var subareaClicada;

				// Definindo o objeto area clicado
				if(idSubarea == 0) {
					subareaClicada = {id:0,nome:null,codigo:null,area:null};
				} else {
					subareaClicada = $scope.projeto.subareas.find(function(a){return a.id == this},idSubarea);
				}
				subareaClicada.id_projeto = $scope.projeto.id;
				
				$mdDialog.show(
					{
						controller: function($scope,subarea,parentSubarea,parentSubareas,areas){
							$scope.areas = areas;
							$scope.subarea = subarea;
							$scope.subarea.area = ($scope.subarea.area==null?null:$scope.areas.find(function(a){return a.id==this},$scope.subarea.area.id));

							$scope.salvar = function(subarea){
								if(subarea.id == 0){
									GDoksFactory.adicionarSubarea(subarea)
									.success(function(response){
										// Atribuindo novo id para a subárea recém criada
										subarea.id = response.newId;

										// Adicionando a subárea ao vetor de subáreas. Caso vetor não exista, cria-se
										parentSubareas = (parentSubareas == undefined ? [] : parentSubareas);
										parentSubareas.push(subarea);

										// Retornando Toast para usuário
										$mdToast.show(
											$mdToast.simple()
											.textContent('Nova Sub-área inserida com sucesso!')
											.position('bottom left')
											.hideDelay(5000)
										);
									})
									.error(function(err){
										console.warn(err);
										$mdToast.show(
											$mdToast.simple()
											.textContent('Um erro ocorreu. Não foi possível completar ação!')
											.position('bottom left')
											.hideDelay(5000)
										);
									});
								} else {
									GDoksFactory.atualizarSubarea(subarea)
									.success(function(response){
										parentSubarea.nome = subarea.nome;
										parentSubarea.codigo = subarea.codigo;
										parentSubarea.area = subarea.area;

										$mdToast.show(
											$mdToast.simple()
											.textContent('Sub-área alterada com sucesso!')
											.position('bottom left')
											.hideDelay(5000)
										);
									})
									.error(function(err){
										console.warn(err);
										$mdToast.show(
											$mdToast.simple()
											.textContent('Um erro ocorreu. Não foi possível completar ação!')
											.position('bottom left')
											.hideDelay(5000)
										);
									});
								}

								// Escondendo o dialog.
								$mdDialog.hide(subarea);
							};
							
							$scope.cancelar = function(subarea){
								$mdDialog.hide(subarea);
							}
							
						},
						locals:{
							subarea:angular.copy(subareaClicada),
							parentSubarea:subareaClicada,
							parentSubareas:$scope.projeto.subareas,
							areas:$scope.projeto.areas
						},
						templateUrl: './app/modules/Projetos/subarea-dialog.tmpl.html',
						parent: angular.element(document.body),
						targetEvent: ev,
						clickOutsideToClose:true
					})
					.then(function(answer) {
					$scope.status = 'You said the information was "' + answer + '".';
					}, function() {
					$scope.status = 'You cancelled the dialog.';
					}
				);
			}

			
			$scope.openConfirm = function(ev,idSubarea) {
				// Appending dialog to document.body to cover sidenav in docs app
				var confirm = $mdDialog.confirm()
					.title('Tem certeza que deseja remover esta sub-área?')
					.textContent('A ação não poderá ser desfeita.')
					.ariaLabel('Deseja remover a sub-área?')
					.targetEvent(ev)
					.ok('Sim')
					.cancel('Não');

				$mdDialog.show(confirm).then(
					function() {
						var subarea = $scope.projeto.subareas.find(function(a){return a.id==this},idSubarea);
						GDoksFactory.removerSubarea(subarea)
						.success(function(response){
							$scope.projeto.subareas = $scope.projeto.subareas.filter(function(a){return a.id!= this},idSubarea);
							$mdToast.show(
								$mdToast.simple()
								.textContent('Sub-área removida!')
								.position('bottom left')
								.hideDelay(5000)
							);
						})
						.error(function(err){
							console.log(err);
							$mdToast.show(
								$mdToast.simple()
								.textContent('Falha ao tentar remover a sub-área.')
								.position('bottom left')
								.hideDelay(5000)
							);
						});
					}
				);
			};
			
	}

})();
;(function(){
	var modProjetos = angular.module('Projetos');

	var ProjetosDAOsController = function($scope,Upload,$cookies,GDoksFactory,$mdToast,$mdDialog){

		// Arquivos de documentos de abertura de operações
		$scope.daoFiles = [];

		// Nomes dos documentos
		$scope.daoNames = [];

		// Exibição de mensagem de erro em operação de DAO
		$scope.erroEmOperacaoDeDao = null;

		// Controla a exibição do prograsso do upload
		$scope.mostrarProgressoUploadDaos = false;

		// Vetor de erros no upload
		$scope.errosNoUploadDeDaos = [];

		// Remove o DAOFile na posição indicada
		$scope.removerDaoFile = function(pos){
			$scope.daoFiles.splice(pos,1);
			$scope.daoNames.splice(pos,1);
		}

		// Upload de DaoFiles
		$scope.uploadDaoFiles = function (files) {
			// Verificando se files está definido e se seu tamanho é maior que zero.
			if (files && files.length) {

				// mostrando barra de progresso de upload
				$scope.mostrarProgressoUploadDaos = true;
				
				// Criando pacote a enviar
				var packToSend = [];
				for (var i = files.length - 1; i >= 0; i--) {
					packToSend.push({file:files[i], nome:$scope.daoNames[i]});
				};

				// Enviando pacote
				Upload.upload(
					{
	                	url: API_ROOT+'/projetos/'+$scope.projeto.id+'/daos/',
	                	data: {profiles: packToSend},
	                	headers: {'Authorization':$cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}
	            	}
	            ).then(
	            	function(response){
	            		if(response.status == 200){
	            			// Upload Concluído com sucesso!
	            			var result = response.data;

	            			// Escondendo o carregando
	            			$scope.mostrarProgressoUploadDaos = false;

	            			// Tratando resposta
							if(result.error == 0){
								var tr; // variável da linha da tabela que exibe os campos dos arquivos que vão subir
								for (var i = result.sucessos.length - 1; i >= 0; i--) {
									$scope.projeto.daos.push(result.sucessos[i]);

									// removendo da daoFiles que obtiveram sucesso.
									for (var j = $scope.daoFiles.length - 1; j >= 0; j--) {
										if($scope.daoFiles[j].name == result.sucessos[i].nome_cliente){
											$scope.daoFiles.splice(j,1);
											$scope.daoNames.splice(j,1);
										}
									}

								};
								for (var i = result.erros.length - 1; i >= 0; i--) {
									// switch de erros de códigos conhecidos
									switch(result.erros[i].codigo){
										case 3:
											$scope.errosNoUploadDeDaos[result.erros[i].arquivo] = 'Um arquivo já foi cadastrado com este nome';
											break;

										default:
											$scope.errosNoUploadDeDaos[result.erros[i].arquivo] = result.erros[i].msg;
											break;
									}
								};
								
							} else {
								// Retornando Toast para o usuário
								$mdToast.show(
									$mdToast.simple()
									.textContent(result.msg)
									.position('bottom left')
									.hideDelay(5000)
								);

								// imprimindo mensagem no console
								console.warn(result.msg);
							}
	            		}
	            	},
	            	function(error){
	            		// Imprimindo erro no console
	            		console.warn(error);

	            		// Retornando Toast para o usuário
	            		$mdToast.show(
	            			$mdToast.simple()
	            			.textContent(error.statusText + ' ' + error.status)
	            			.position('bottom left')
	            			.hideDelay(5000)
	            		);

	            		// Esconde o carregando
	            		$scope.mostrarProgressoUploadDaos = false;
	            	},
	            	function (evt) {
						$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
					}
	            )
			}
		}

		// Abrir dialog para confirmar Remoção de DAO
		$scope.openConfirmRemoveDAO = function(ev,idDao) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Tem certeza que deseja remover este documento?')
				.textContent('A ação não poderá ser desfeita.')
				.ariaLabel('Deseja remover o documento')
				.targetEvent(ev)
				.ok('Sim')
				.cancel('Não');

			$mdDialog.show(confirm).then(
				function() {
					// Mostra carregando
					$scope.root.carregando = true;

					// Ajeitando dao a ser removida
					var dao = $scope.projeto.daos.find(function(a){return a.id == this},idDao);
					dao.id_projeto = $scope.projeto.id;
					GDoksFactory.removerDAO(dao)
					.success(function(response){
						// Esconde carregando
						$scope.root.carregando = false;

						// removendo dao do vetor local
						$scope.projeto.daos = $scope.projeto.daos.filter(function(a){return a.id!=this},idDao);

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Documento removido com sucesso')
							.position('bottom left')
							.hideDelay(5000)
						);
					})
					.error(function(error){
						// Esconde carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent(error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);

						// Imprimindo erro no console
						console.warn(error.msg);
					});
				}
			);
		};
	}

	modProjetos.controller('ProjetosDAOsController',ProjetosDAOsController);
})();;(function(){

	// Atribuindo o controller para o módulo 'ProjetosDocumentosController'
	angular.module('Projetos').controller('ProjetosDocumentosController',ProjetosDocumentosController);
	
	// Definindo o controller
	function ProjetosDocumentosController($scope,GDoksFactory,$mdExpansionPanel,$mdDialog,$mdToast){
		
		$scope.collapsePanel = function(index){
			$mdExpansionPanel('panel_'+index).collapse();
		}

		$scope.openDocumentoDialog = function(evt,idDoc){

			// Definindo o objeto documento que foi clicado
			if(idDoc == 0) {
				$scope.docSelecionado = {
					id:0,
					nome:null,
					codigo:null,
					codigo_cliente:null,
					codigo_alternativo:null,
					dependencias:[],
					hhs: [],
					subdisciplina:null,
					subarea:null,
					data_limite:null
				};
			} else {
				$scope.docSelecionado = $scope.projeto.documentos.find(function(d){return d.id == this},idDoc);
			}

			// Atribuindo o id_projeto ao documento
			$scope.docSelecionado.id_projeto = $scope.projeto.id;

			$mdDialog.show(
				{
					controller: dialogController,
					locals:{
						disciplinas: angular.copy($scope.disciplinas),
						areas: angular.copy($scope.projeto.areas),
						subareas: angular.copy($scope.projeto.subareas),
						doc: angular.copy($scope.docSelecionado),
						documentos: angular.copy($scope.projeto.documentos),
						cargos:$scope.cargos,
						parentScope:$scope
					},
					templateUrl: './app/modules/Documentos/doc-dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose:false
				}
			)
			.then(function(answer) {
				//console.log(answer + "<<");
				//$scope.status = 'You said the information was "' + answer + '".';
			}, function(answer) {
				//$scope.status = 'You cancelled the dialog.';
				console.log(answer + "<<<<");
			});
		}

		$scope.openRemoverConfirm = function(ev,documento) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Tem certeza que deseja remover o cadastro deste documento?')
				.textContent('A ação não poderá ser desfeita.')
				.ariaLabel('Deseja remover cadastro de documento?')
				.targetEvent(ev)
				.ok('Sim')
				.cancel('Não');

			$mdDialog.show(confirm).then(
				function() {
					documento.id_projeto = $scope.projeto.id;
					GDoksFactory.removerDocumento(documento)
					.success(function(response){
						
						// Localizando o index do documento excluído do projeto
						var pos = $scope.projeto.documentos.findIndex(function(a){return a.id==this},documento.id);

						// Removendo o documento do vetor de documentos do projeto
						$scope.projeto.documentos.splice(pos,1);

						// Retornando Toast para usuário!
						$mdToast.show(
							$mdToast.simple()
							.textContent('Documento removido com sucesso!')
							.position('bottom left')
							.hideDelay(5000)
						);
					})
				}
			);
		};

		function dialogController($scope,disciplinas,areas,subareas,doc,documentos,cargos,parentScope){
			
			// Copiando doc para o scope
			$scope.doc = doc;
			delete doc;

			// Copiando as disciplinas para o scope
			$scope.disciplinas = disciplinas;
			delete disciplinas;

			// Copiando áreas para scope
			$scope.areas = areas;
			delete areas;

			// Copiando subareas para o scope
			$scope.subareas = subareas;
			delete subareas;

			// Copiando cargos para o scope
			$scope.cargos = cargos;
			delete cargos;

			// inserindo um objeto hh ao final do vetor de hh's
			$scope.doc.hhs.push({cargo:null,hh:1});

			// Determinando o valor da disciplina selecionada
			$scope.disciplinaSelecionada = (doc.id==0 ? null : $scope.disciplinas.find(
																					function(a){
																						return a.id == this
																					},
																					$scope.doc.subdisciplina.disciplina.id
																				 ));
			// Linkando doc.subdisciplina a um elemento de disciplinaSelecionada.subs
			$scope.doc.subdisciplina = (doc.id==0 ? null : $scope.disciplinaSelecionada.subs.find(
																			function(a){
																				return a.id==this;
																			},$scope.doc.subdisciplina.id
																		));


			// Determinando o valor da area selecionada
			$scope.areaSelecionada = (doc.id==0 ? null : $scope.areas.find(
													function(a){
														return a.id == this
													}, $scope.doc.subarea.area.id));
			

			// Construindo vertor de subareas de area selecionada
			$scope.subareasDeAreaSelecionada = [{}];
			$scope.setSubareasDeAreaSelecionada = function(){
				if($scope.areaSelecionada != null){
					$scope.subareasDeAreaSelecionada = $scope.subareas.filter(function(a){return a.area.id==this},$scope.areaSelecionada.id);
				} else {
					$scope.subareasDeAreaSelecionada = [];
				}
			}
			$scope.setSubareasDeAreaSelecionada();

			// Linkando doc.subarea com um elemento de subareasDeAreaSelecionada
			$scope.doc.subarea = ($scope.doc.subarea==null ? null : $scope.subareasDeAreaSelecionada.find(
													function(a){
														return a.id == this
													},$scope.doc.subarea.id
			));

			// Determinando quais documentos são dependencias possíveis
			$scope.dependenciasPossiveis = getDependenciasPossiveis($scope.doc);

			// Linkando atuais dependencias às dependencias possíveis
			for (var i = $scope.doc.dependencias.length - 1; i >= 0; i--) {
				$scope.doc.dependencias[i] = $scope.dependenciasPossiveis.find(function(a){return a.id==this},$scope.doc.dependencias[i].id);
			}

			// Determinando lista de possíveis dependentes
			function getDependenciasPossiveis(doc){
				var result = documentos.filter(
					function(d){
						// calculando condicao de nao ser ancestral
						//var naoEAncestral = ancestraisDeDoc(this).indexOf(d.id) == -1;

						// calculando condição de não ser descendente
						var naoEDescendente = descendentesDeDoc(this).indexOf(d.id) == -1;

						// calculando condicao de evitar documento próprio
						var docDiferente = d.id != this.id;

						return naoEDescendente && docDiferente;
					},doc);
				return result;
			}

			// Função que retorna vetor com todos os ancestrais de um documento (dependências)
			function ancestraisDeDoc(doc){
				if(doc.dependencias.length == 0){
					return [];
				} else {
					var dep = doc.dependencias.map(function(d){return d.id});
					for (var i = doc.dependencias.length - 1; i >= 0; i--) {
						dep = dep.concat(ancestraisDeDoc(doc.dependencias[i]));
					}
					return dep;
				}
			}

			function docEhAncestralDeFilho(pai,filho){
				return ancestraisDeDoc(filho).indexOf(pai.id) != -1
			}

			function descendentesDeDoc(doc){
				return documentos.filter(function(filho){
					return docEhAncestralDeFilho(this,filho)
				},doc).map(function(a){return a.id});
			}

			// Linkando Cargos das HHs com os elementos do vetor de cargos
			for (var i = $scope.doc.hhs.length - 1; i >= 0; i--) {
				if($scope.doc.hhs[i].cargo!=null){
					$scope.doc.hhs[i].cargo = $scope.cargos.find(function(a){return a.id==this},$scope.doc.hhs[i].cargo.id);
				}
			}

			// Função que cancela e esconde o dialog
			$scope.cancelar = function(){
				$mdDialog.hide();
			}

			$scope.salvar = function(documento){
				// Mostrando carregando
				parentScope.root.carregando = true;

				// Fazendo cópia do objeto documento
				doc = angular.copy(documento);

				// Removendo campos desnecessários
				doc.id_subdisciplina = doc.subdisciplina.id;
				delete doc.subdisciplina;

				doc.id_subarea = doc.subarea.id;
				delete doc.subarea;

				doc.dependencias = doc.dependencias.map(function(a){return a.id});

				doc.hhs = doc.hhs.filter(function(a){
					return a.cargo != null;
				});

				doc.hhs = doc.hhs.map(function(a){
					a.id_cargo = a.cargo.id;
					delete a.cargo;
					return a;
				});

				// Limpando HHs de cargo nulo do documento
				documento.hhs = documento.hhs.filter(function(a){
					return a.cargo != null;
				});				

				// Verificando se é inserção de documento ou atualização pelo id
				if(doc.id == 0){
					// Inserir novo documento
					GDoksFactory.adicionarDocumento(doc)
					.success(function(response){
						// Esconde carregando
						parentScope.root.carregando = false;

						// Atribuindo id ao novo documento
						documento.id = response.newId;
						documento.rev_serial = 1;

						// Parsing subdisciplina do documento
						var achouSub = false;
						var j = 0;
						while(j<$scope.disciplinas.length && !achouSub){
							k = 0;
							while(k<$scope.disciplinas[j].subs.length && !achouSub){
								achouSub = ($scope.disciplinas[j].subs[k].id == documento.subdisciplina.id);
								if(achouSub){
									documento.subdisciplina.disciplina = $scope.disciplinas[j];
								}
								k++;
							}
							j++;
						}

						// Adicionando novo documento ao vetor de documentos do projeto
						parentScope.projeto.documentos.push(documento)

						// Fechando caixa de diálogo
						$mdDialog.hide();

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Documento cadastrado com sucesso!')
							.position('bottom left')
							.hideDelay(5000)
						);

					})
					.error(function(err){

						// Mostrando erro no console
						console.warn(err);

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Não foi possível completar a ação.')
							.position('bottom left')
							.hideDelay(5000)
						);

						// Esconde carregando
						parentScope.root.carregando = false;
					});
				} else {
					// Atualizar documento existente
					GDoksFactory.alterarDocumento(doc)
					.success(function(response){
						// Esconde carregando
						parentScope.root.carregando = false;
						
						// Determinando a posição do objeto atual
						var pos = parentScope.projeto.documentos.findIndex(function(a){return a.id == this},documento.id);

						// Substituindo o objeto antigo pelo atualizado agora
						parentScope.projeto.documentos.splice(pos,1,documento);

						// Fechando caixa de diálogo
						$mdDialog.hide();

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Cadastro do documento alterado com sucesso!')
							.position('bottom left')
							.hideDelay(5000)
						);

						// Esconde carregando
						parentScope.root.carregando = false;
						
					})
					.error(function(err){

						// Mostrando o erro no console
						console.warn(err);

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Não foi possível completar a ação.')
							.position('bottom left')
							.hideDelay(5000)
						);

						// Esconde carregando
						parentScope.root.carregando = false;
					});
				}				
			}

			$scope.addNewHH = function(){
				$scope.doc.hhs.push({cargo:null,hh:1});
			}

			$scope.removeHH = function(pos){
				$scope.doc.hhs.splice(pos,1);
			}
		}

	}
})();angular.module('Senha',[]).controller('SenhaController',SenhaController)

function SenhaController($scope,$mdToast,GDoksFactory){
	// Inicializando o objeto data;
	$scope.data = {};
	$scope.data.login = '';
	$scope.data.senha1 = '';
	$scope.data.senha2 = '';

	$scope.mudaLoginSenha = function(novoLogin,novaSenha){
		GDoksFactory.mudaLoginSenha(novoLogin,novaSenha)
			.success(
				function(response){
					$mdToast.show(
						$mdToast.simple()
						.textContent('Alterações realizadas com sucesso!')
						.position('bottom left')
						.hideDelay(5000)
					);
				}
			)
			.error(
				function(error){
					$mdToast.show(
						$mdToast.simple()
						.textContent(error.msg)
						.position('bottom left')
						.hideDelay(5000)
					);
				}
			);
	}

	$scope.cancel = function(){
		window.location = "WebGDoks.php#/home";
	}
};angular.module('Topo',[])
.controller('TopoController',function($scope){
	$scope.toggleOpcoesMenu = function(){
		$scope.mostrandoOpcoes = !$scope.mostrandoOpcoes;
		if($scope.mostrandoOpcoes){
			document.getElementById("opcoes").style.top = "36px";
		} else {
			document.getElementById("opcoes").style.top = "-85px";
		}	
	}
});;(function(){

	// Definindo o módulo
	var usuarioModulo = angular.module('Usuarios',[]);

	// Atribuindo controllers para o módulo
	usuarioModulo.controller('UsuariosController',UsuariosController);
	usuarioModulo.controller('UsuarioController',UsuarioController);
	usuarioModulo.controller('PermissoesController',PermissoesController);

	// Definindo controller para os usuários
	function UsuariosController($scope,GDoksFactory,$location){

		// Declarando vetor de usuários
		$scope.usuarios = [];

		// Carregando usuarios da base local
		var openReq = indexedDB.open("gdoks");
		openReq.onsuccess = function(){
			var db = openReq.result;
			db.transaction('usuarios').objectStore('usuarios').getAll().onsuccess = function(evt){
				$scope.$apply(function(){$scope.usuarios = evt.target.result;});
			}
		}

		// função que leva para a tela de adicionar usuário
		$scope.goToAddUsuario = function(){
			$location.url('/usuarios/0');
		}
	};

	// Definindo controller para usuário
	function UsuarioController($scope,$routeParams,GDoksFactory,$mdToast,$location){
		// Capturando o id passado na url
		var id = $routeParams.id;

		// se id== 0, adicionar um novo usuário. se não carregar o usuario de id passado
		if(id == 0) {
			// Criando um usuário vazio.
			$scope.usuario = {};
			$scope.usuario.id = 0;
			$scope.usuario.nome = '';
			$scope.usuario.email = '';
			$scope.usuario.login = '';
			$scope.usuario.sigla = '';
			$scope.usuario.ativo = true;
			$scope.inicialmenteAtivo = true;
		} else {
			// Carregando usuário da base
			var openReq = indexedDB.open('gdoks');
			openReq.onsuccess = function(evt){
				var db = openReq.result;
				db.transaction('usuarios').objectStore('usuarios').get(id*1).onsuccess = function(evt){
					$scope.$apply(function(){
						$scope.usuario = evt.target.result;
						$scope.inicialmenteAtivo = ($scope.usuario.ativo == true);
					});
				}
			}
		}
		

		// Definindo função que cancela as alterações
		$scope.cancel = function(){
			$location.url("/usuarios");
		}

		$scope.salvarUsuario = function(){

			// Mostra Carregando
			$scope.root.carregando =true;
			
			if($scope.usuario.id == 0){
				GDoksFactory.adicionarUsuario($scope.usuario)
				.success(
					function(response){

						// Esconde Carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.action('FECHAR')
							.textContent('Usuário criado com sucesso. Agora, adicione permissões!')
							.position('bottom left')
							.hideDelay(0)
							.highlightAction(true)
      						.highlightClass('md-accent')
						);

						// Aribuindo nova id para usuário recém criado
						$scope.usuario.id = response.newId;

						// Removendo informações que não serão gravadas na BD
						delete($scope.usuario.senha1);
						delete($scope.usuario.senha2);

						// Salvando usuário na base
						var openReq = indexedDB.open('gdoks');
						openReq.onsuccess = function(evt){
							var db = evt.target.result;
							db.transaction('usuarios','readwrite').objectStore('usuarios').add($scope.usuario);
						}

						// mudando a url para que se fique de acordo
						$location.url('/usuarios/'+$scope.usuario.id);

					}
				)
				.error(
					function(error){
						// Esconde Carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Não foi possível adicionar usuário: ' + error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);

						// Imprimindo erro no log
						console.warn('Não foi possível alterar usuário: ' + response.msg);
					}
				);
			} else {
				GDoksFactory.atualizarUsuario($scope.usuario)
				.success(
					function(response){
						// Esconde Carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Dados do usuário alterados com sucesso')
							.position('bottom left')
							.hideDelay(5000)
						);

						// Removendo informações que não serão gravadas na BD
						delete($scope.usuario.senha1);
						delete($scope.usuario.senha2);
						
						// Atualizando usuário na base
						var openReq = indexedDB.open('gdoks');
						openReq.onsuccess = function(evt){
							var db = evt.target.result;
							db.transaction('usuarios','readwrite').objectStore('usuarios').put($scope.usuario);
						}

						// Voltando para a tela de usuários depois de  4s
						$location.url("/usuarios");
					}
				)
				.error(
					function(error){
						// Esconde Carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Não foi possível alterar dados do usuário.')
							.position('bottom left')
							.hideDelay(5000)
						);

						// imprimindo erro detalhado no console
						console.warn('' + error.msg);
						
						$scope.msg = error.msg;
					}
				);
			}
		}
	};

	// Definindo controller para permissões
	function PermissoesController($scope,$cookies,GDoksFactory,$mdToast,$routeParams){
		// Lendo id do usuário na url
		var id_usuario = $routeParams.id;

		// Definindo variaveis de controle de interfase
		$scope.restaurarDisponivel = false;

		// Definindo flags de carregamento
		var telasDoUsuarioCarregadas = false;
		var telasCarregadas = false;

		// Definindo vetor de telas
		$scope.telas = [];
		loadTelas();
		
		// Carregando as telas atualmente disponíveis para o usuário
		telasDoUsuario = [];
		if(id_usuario != 0){
			loadTelasDoUsuario();
		} else {
			telasDoUsuarioCarregadas = true;
		}


		// Definindo variável de controle para uma tela selecionada na interface
		$scope.telaSelecionada = null;
		
		// FUNÇÕES ON = = = = = = = = = = = = = = = = = = = = = = = = = = = =

		// Executada quando clica em um checkbox - - - - - - - - - -
		$scope.onTelaCheckChange = function(evt,tela){
			if(tela.autorizada){
				$scope.telaSelecionada = tela;
			} else {
				$scope.telaSelecionada = null;
			}

			// Habilita o restaurar
			$scope.restaurarDisponivel = true;
		}

		$scope.onOpcoesClick = function(evt,tela){
			$scope.telaSelecionada = tela;
		}

		$scope.onRestaurarClick = function(){
			marcarTelasAutorizadas();
		}

		$scope.onSalvarClick = function(){
			salvar();
		}
		$scope.onOpcoesChange = function(){
			$scope.restaurarDisponivel = true;
		}

		// FUNÇÕES AUXILIARES = = = = = = = = = = = = = = = = = = = = = = = =
		function marcarTelasAutorizadas(){
			// definindo algumas variáveis antes dos loops
			var opcoes;
			var opcoesDeUsuario;
			var telaDeUsuario;
			var opcao;

			// Parsing telas. Marcando como autorizadas ou não, de acordo com as permissoes do usuário
			for (var i = $scope.telas.length - 1; i >= 0; i--) {
				telaDeUsuario = telasDoUsuario.find(function(a){
					return a.id==this;
				},$scope.telas[i].id);
				$scope.telas[i].autorizada = (telaDeUsuario != undefined);
				if($scope.telas[i].autorizada){
					opcoes = $scope.telas[i].opcoes;
					for (var j = opcoes.length - 1; j >= 0; j--) {
						opcao = telaDeUsuario.opcoes.find(function(a){return a.id==this;},opcoes[j].id);
						opcoes[j].autorizada = (opcao!=undefined && opcao.valor==1);
					}
				}
			}
		}

		function salvar(){
			// Selecionando somente telas salvas
			var telas = $scope.telas.filter(function(a){return a.autorizada});

			// Mapeando vetor de telas com uma função que remove informações desnecessárias
			telas = telas.map(function(tela){
				var b = {};
				b.id = tela.id;
				b.opcoes = tela.opcoes.filter(function(o){return o.autorizada});
				b.opcoes = b.opcoes.map(function(o){return {id:o.id,valor:1};});
				return b;
			})

			// Mostra carregando
			$scope.root.carregando = true;

			// Enviando para o servidor
			GDoksFactory.salvarTelasDeUsuario(id_usuario,telas)
			.success(function(response){
				// Esconde carregando
				$scope.root.carregando = false;

				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Permissões de usuário salvas com sucesso!')
					.position('bottom left')
					.hideDelay(5000)
				);

				// Alterando valor local
				telasDoUsuario = telas;

				// Desabilita o restaurar
				$scope.restaurarDisponivel = false;
			})
			.error(function(error){
				// Esconde carregando
				$scope.root.carregando = false;
				
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao tentar alterar permissões de usuário.')
					.position('bottom left')
					.hideDelay(5000)
				);

				// Imprimindo erro no console
				console.warn(error);
			});
		}

		// FUNÇÕES DE CARGA DE DADOS = = = = = = = = = = = = = = = = = = = =
		function loadTelas(){
			indexedDB.open('gdoks').onsuccess = function(evt){
				var db = evt.target.result;
				db.transaction('telas').objectStore('telas').getAll().onsuccess = function(evt){

					// Colocando telas no scope
					$scope.telas = evt.target.result;
					telasCarregadas = true;
					marcarTelasAutorizadas();			
				}
			}
		}

		function loadTelasDoUsuario(){
			// Mostra carregando
			$scope.root.carregando = true;

			// Fazendo requisição ao servidor
			GDoksFactory.getTelasDeUsuario(id_usuario)
			.success(function(response){

				// Esconde carregando
				$scope.root.carregando = false;

				telasDoUsuario = response.telas;
				telasDoUsuarioCarregadas = true;
				marcarTelasAutorizadas();
			})
			.error(function(error){
				// esconde carregando
				$scope.root.carregando = false;

				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Falha ao carregar telas do usuário.')
					.position('bottom left')
					.hideDelay(5000)
				);

				// imprimindo erro no console
				console.warn(error);
			});
		}
	}

})();
;angular.module('VisaoGeral',[])
.controller('VisaoGeralController',function($scope){});
;(function(){
	// Definindo módulo
	var module = angular.module('Validacao',[]);

	// Definindo a função controller
	var ValidacaoController = function($scope,GDoksFactory,$mdToast,$location){

		// Iniciando variáveis do escopo
		$scope.documentos = [];
		$scope.todosSelecionados = true;

		// Função que carrega documentos a validar do usuário atual
		(function(){
			GDoksFactory.getDocumentosParaValidar()
			.success(function(response){
				$scope.documentos = response.documentos.map(function(d){
					d.validar=true;
					return d;
				});
				$scope.todosSelecionados = true;
			})
			.error(function(response){
				if(response.error == 1){
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Token expirou. Faça o login novamente.')
						.position('bottom left')
						.hideDelay(5000)
					);
				} else {
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
						.textContent('Um erro ocorreu. Não foi possível levantar documentos.')
						.position('bottom left')
						.hideDelay(5000)
					);

					// Imprimindo erro no console
					console.warn(response);
				}
			});
		})();

		$scope.goToDoc = function(idDoc){
			$location.url('/documentos/'+idDoc);
		}

		$scope.baixarPDA = function(idPDA){
			GDoksFactory.baixarPDA(idPDA);
		}

		$scope.toggleSelecionados = function(){
			for (var i = $scope.documentos.length - 1; i >= 0; i--) {
				$scope.documentos[i].validar = !$scope.todosSelecionados;
			}
		}

		$scope.setTodosSelecionados = function(){
			setTimeout(function(){
				$scope.todosSelecionados = true;
				for (var i = $scope.documentos.length - 1; i >= 0; i--) {
					$scope.todosSelecionados = $scope.todosSelecionados && $scope.documentos[i].validar;
				}
				$scope.$apply();
			},10);
		}

		$scope.validar = function(){
			// Mostrar carregando
			$scope.root.carregando = true;

			// Filtrando documentos que serão validados
			var docsParaValidar = angular.copy($scope.documentos.filter(function(a){return a.validar}));

			// Removendo informações inúteis
			docsParaValidar = docsParaValidar.map(function(doc){
				delete doc.id_disciplina;
				delete doc.nome_disciplina;
				delete doc.sigla_disciplina;
				delete doc.id_subdisciplina;
				delete doc.nome_subdisciplina;
				delete doc.codigo;
				delete doc.nome;
				delete doc.id_especialista;
				delete doc.sigla_especialista;
				delete doc.validar;
				return doc;
			})

			// Requisitando validação
			GDoksFactory.validarProgressos(docsParaValidar)
			.success(function(response){
				// Escondendo o carregando
				$scope.root.carregando = false;

				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Progressos validados com sucesso!')
					.position('bottom left')
					.hideDelay(5000)
				);

				// Removendo os validados
				$scope.documentos = $scope.documentos.filter(function(a){return !a.validar});
			})
			.error(function(err){
				// Escondendo o carregando
				$scope.root.carregando = false;

				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
					.textContent('Ocorreu uma falha ao tentar realizar validação')
					.position('bottom left')
					.hideDelay(5000)
				);

				// imprimindo erro no console
				console.warn(err);
			})
		}
	}

	// Definindo controller do módulo
	module.controller('ValidacaoController',ValidacaoController);

})();


;var API_ROOT = '../api/v1';
var TOKEN_REFRESH_IN = 600000; //10 MINUTOS
var DURACAO_DA_BUSCA = 1800000; //30 MINUTOS
var HISTORICO_MAX_SIZE = 5;
var COOKIE_KEY_HISTORICO = 'historico';

// Constantes de status de documento;
var DOCSTATUS_INVALIDO = 'invalido';
var DOCSTATUS_VIRGEM = 'virgem';
var DOCSTATUS_CHECKOUT = 'checkout';
var DOCSTATUS_AGUARDANDO_VALIDACAO = 'paravalidacao';
var DOCSTATUS_VALIDADO = 'validado';
var DOCSTATUS_CONCLUIDO = 'concluido';;// Definindo Module WebGDoks
var WebGDoks = angular.module('WebGDoks',
								['ngRoute',
								'ngCookies',
								'ng-currency',
								'ngLocale',
								'ngAnimate',
								'ngMaterial',
								'ngMaterialSidemenu',
								'material.components.expansionPanels',
								'ngFileUpload',
								'ui.mask',
								'angular-click-outside',
								'Cargos',
								'Clientes',
								'Configuracoes',
								'Disciplinas',
								'Documentos',
								'Grds',
								'Log',
								'Nav',
								'Opcoes',
								'Historico',
								'Projetos',
								'Senha',
								'Topo',
								'Usuarios',
								'VisaoGeral',
								'Validacao']);

// Definindo Rotas
WebGDoks.config(
	function ($routeProvider){
		$routeProvider
		.when(
			'/senha',
			{
				controller: 'SenhaController',
				templateUrl: 'app/modules/Senha/senha.html'
			}
		)
		.when(
			'/visaogeral',
			{
				controller: 'VisaoGeralController',
				templateUrl: 'app/modules/VisaoGeral/visaogeral.php'
			}
		)
		.when(
			'/ua',
			{
				controller: 'UAController',
				templateUrl: 'app/modules/UA/ua.php'
			}
		)
		.when(
			'/projetos',
			{
				controller: 'ProjetosController',
				templateUrl: 'app/modules/Projetos/projetos.php'
			}
		)
		.when(
			'/projetos/:id',
			{
				controller: 'ProjetoController',
				templateUrl: 'app/modules/Projetos/projeto.php'
			}
		)
		.when(
			'/projetos/:id/dashboard',
			{
				controller: 'DashProjetoController',
				templateUrl: 'app/modules/Projetos/dash_projeto.html'
			}
		)
		.when(
			'/usuarios',
			{
				controller: 'UsuariosController',
				templateUrl: 'app/modules/Usuarios/usuarios.html'
			}
		)

		.when(
			'/usuarios/:id',
			{
				controller: 'UsuarioController',
				templateUrl: 'app/modules/Usuarios/usuario.html'
			}
		)
		.when(
			'/cargos',
			{
				controller: 'CargosController',
				templateUrl: 'app/modules/Cargos/cargos.html'
			}
		)
		.when(
			'/grds/:id',
			{
				controller: 'GrdController',
				templateUrl: 'app/modules/Grds/grd.html'
			}
		)
		.when(
			'/grds',
			{
				controller: 'GrdsController',
				templateUrl: 'app/modules/Grds/grds.html'
			}
		)
		.when(
			'/documentos',
			{
				controller: 'DocumentosController',
				templateUrl: 'app/modules/Documentos/documentos.html'
			}
		)
		.when(
			'/documentos/:id',
			{
				controller: 'DocumentoController',
				templateUrl: 'app/modules/Documentos/Documento.html'
			}
		)
		.when(
			'/dpvs',
			{
				controller: 'DocumentosParaValidacaoController',
				templateUrl: 'app/modules/DocumentosParaValidacao/DocumentosParaValidacao.html'
			}
		)
		.when(
			'/disciplinas',
			{
				controller: 'DisciplinasController',
				templateUrl: 'app/modules/Disciplinas/disciplinas.html'
			}
		)
		.when(
			'/disciplinas/:id',
			{
				controller: 'DisciplinaController',
				templateUrl: 'app/modules/Disciplinas/disciplina.html'
			}
		)
		.when(
			'/clientes',
			{
				controller: 'ClientesController',
				templateUrl: 'app/modules/Clientes/clientes.html'
			}
		)
		.when(
			'/clientes/:id',
			{
				controller: 'ClienteController',
				templateUrl: 'app/modules/Clientes/cliente.html'
			}
		)
		.when(
			'/log',
			{
				controller: 'LogController',
				templateUrl: 'app/modules/Log/log.html'
			}
		)
		.when(
			'/configuracoes',
			{
				controller: 'ConfiguracoesController',
				templateUrl: 'app/modules/Configuracoes/configuracoes.php'
			}
		)
		.when(
			'/validacao',
			{
				controller: 'ValidacaoController',
				templateUrl: 'app/modules/Validacao/validacao.php'
			}
		)
		.otherwise({redirectTo:'/visaogeral'});
	}
)

// Configurando o Locale do DatePicker
WebGDoks.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
    	if(date){
    		var d = date.getDate();
			var m = date.getMonth()+1;
			var y = date.getFullYear();
			d = d<10?'0'+d:d;
			m =  m<10?'0'+m:m;
			return d+'/'+m+'/'+y;
       	} else {
       		return '';
       	}

    };

    // Brazilian localization.
    $mdDateLocaleProvider.months = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
    $mdDateLocaleProvider.shortMonths = ['jan','fev','mar', 'abr','mai','jun','jul','ago','set','out','nov','dez'];
    $mdDateLocaleProvider.days = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
    $mdDateLocaleProvider.shortDays = ['D','S','T','Q','Q','S','S'];
    $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
      return 'Semana ' + weekNumber;
    };
    $mdDateLocaleProvider.msgCalendar = 'Calendário';
    $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendário';
});

// Configurando cores
WebGDoks.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange',{'default':'800'});
})

// Definindo próprio controller
WebGDoks.controller('RootController',RootController);
function RootController($scope,$interval,$cookies,GDoksFactory,$mdSidenav,$mdMenu){

	// definindo o objeto root.
	$scope.root = {};

	// atribuindo telas
	$scope.root.telasDoUsuario = $cookies.getObject('user').telas;

	// Carregando cookie de histórico se ele existir. Se não existir, cria com vetor vazio.
	$scope.root.historico = $cookies.getObject(COOKIE_KEY_HISTORICO);
	if($scope.root.historico == undefined){
		$cookies.putObject(COOKIE_KEY_HISTORICO,[]);
		$scope.root.historico = [];
	}

	// Flag para mostrar se está carregando ou não
	$scope.root.carregando = false;

	// Definindo função que carrega usuários do servidor
	$scope.root.loadUsuarios = function(){
		GDoksFactory.loadUsuarios()
			.success(
				function(response){
					// Carregando usuários
					var usuarios = response.usuarios;

					// Conectando-se a base de dados
					var reqOpen = indexedDB.open("gdoks");
					
					reqOpen.onsuccess = function(evt){
						// Capturando a conexão com a base
						var db = evt.target.result;

						// Conectando-se a ObjectStore "usuarios"
						var os_usuarios = db.transaction('usuarios','readwrite').objectStore('usuarios');

						// limpando a tabela de usuários
						var reqClear = os_usuarios.clear();
						reqClear.onsuccess = function(evt){
							// Adicionando os usuários	
							var addRequest;
							for (var i = usuarios.length - 1; i >= 0; i--) {
								// Normalizando o valor da propriedade ativo para boolean
								usuarios[i].ativo = (usuarios[i].ativo==1);
								
								// adicionando usuários
								addRequest = os_usuarios.add(usuarios[i]);
								addRequest.onerror = function(evt){
									console.error("Impossível adicionar usuário a base.");
								}
							}
						}
					}
				}
			)
			.error(
				function(error){
				}
			);
	};

	// Definindo função que carrega clientes do servidor
	$scope.root.loadClientes = function(){
		GDoksFactory.getClientes()
			.success(
				function(response){
					// Carregando usuários
					var clientes = response.clientes;

					// Conectando-se a base de dados
					var reqOpen = indexedDB.open("gdoks");
					
					reqOpen.onsuccess = function(evt){
						// Capturando a conexão com a base
						var db = evt.target.result;

						// Conectando-se a ObjectStore "clientes"
						var os_clientes = db.transaction('clientes','readwrite').objectStore('clientes');

						// limpando a tabela de usuários
						var reqClear = os_clientes.clear();
						reqClear.onsuccess = function(evt){
							// Adicionando os usuários	
							var addRequest;
							for (var i = clientes.length - 1; i >= 0; i--) {
								// adicionando usuários
								addRequest = os_clientes.add(clientes[i]);
								addRequest.onerror = function(evt){
									console.error("Impossível adicionar cliente a base.");
								}
							}
						}
					}
				}
			)
			.error(
				function(error){
				}
			);
	};

	// Definindo função que carrega projetos do servidor
	$scope.root.loadProjetos = function(){
		GDoksFactory.getProjetos()
		.success(
			function(response){
				// Carregando projetos
				var projetos = response.projetos;

				// Conectando-se a base de dados
				var reqOpen = indexedDB.open("gdoks");
				
				reqOpen.onsuccess = function(evt){
					// Capturando a conexão com a base
					var db = evt.target.result;

					// Conectando-se a ObjectStore "projetos"
					var os_projetos = db.transaction('projetos','readwrite').objectStore('projetos');

					// limpando a tabela de projetos
					var reqClear = os_projetos.clear();
					reqClear.onsuccess = function(evt){
						// Adicionando os projetos	
						var addRequest;
						for (var i = projetos.length - 1; i >= 0; i--) {
							// Normalizando o valor da propriedade ativo para boolean
							projetos[i].ativo = (projetos[i].ativo==1);
							
							// adicionando projetos
							addRequest = os_projetos.add(projetos[i]);
							addRequest.onerror = function(evt){
								console.error("Impossível adicionar projeto a base.");
							}
						}
					}
				}
			}
		)
		.error(
			function(error){
			}
		);
	}

	// Definindo função que carrega disciplinas do servidor
	$scope.root.loadDisciplinas = function(){
		GDoksFactory.getDisciplinas()
		.success(
			function(response){
				// Carregando disciplinas
				var disciplinas = response.disciplinas;

				// Conectando-se a base de dados
				var reqOpen = indexedDB.open("gdoks");
				
				reqOpen.onsuccess = function(evt){
					// Capturando a conexão com a base
					var db = evt.target.result;

					// Conectando-se a ObjectStore "disciplinas"
					var os_disciplinas = db.transaction('disciplinas','readwrite').objectStore('disciplinas');

					// limpando a tabela de disciplinas
					var reqClear = os_disciplinas.clear();
					reqClear.onsuccess = function(evt){
						// Adicionando os disciplinas	
						var addRequest;
						for (var i = disciplinas.length - 1; i >= 0; i--) {
							// Normalizando o valor da propriedade ativo para boolean
							disciplinas[i].ativa = (disciplinas[i].ativa==1);

							// normalizando o valor da propriedade ativa para boolean nas subs
							for (var j = disciplinas[i].subs.length - 1; j >= 0; j--) {
								disciplinas[i].subs[j].ativa = (disciplinas[i].subs[j].ativa == 1);
							};
							
							// adicionando disciplinas
							addRequest = os_disciplinas.add(disciplinas[i]);
							addRequest.onerror = function(evt){
								console.error("Impossível adicionar disciplina a base.");
							}
						}
					}
				}
			}
		)
		.error(
			function(error){
			}
		);
	}

	// Definindo função que carrega telas do servidor
	$scope.root.loadTelas = function(){
		GDoksFactory.getTelas()
		.success(function(response){
			// abrindo db local
			indexedDB.open('gdoks').onsuccess = function(evt){
				// Pondo telas na tabela
				var telas = response.telas;
				for (var i = telas.length - 1; i >= 0; i--) {
					evt.target.result.transaction('telas','readwrite').objectStore('telas').add(telas[i]);
				}				
			}

			// atribuindo telas no scope.root também
			$scope.root.telas = response.telas;		})
	}

	// Criando base de dados.
	var reqOpen = indexedDB.open("gdoks");
	
	reqOpen.onerror = function(e){
		console.log("Falha na abertura da base.");
		console.dir(e);
	}

	reqOpen.onblocked = function(e){
		console.log("Acesso a base bloqueado.");
		console.dir(e);
	}

	reqOpen.onupgradeneeded = function(e){
		// Criando ObjectStores da base de dados
		var db = e.target.result;

		// Criando ObjectStore de usuários
		var os_usuarios = db.createObjectStore("usuarios",{keyPath: "id"});
		os_usuarios.createIndex("idx_nome","nome",{'unique':false});
		os_usuarios.transaction.addEventListener('complete',function(){
			$scope.root.loadUsuarios();
		})

		// Criando ObjectStore de disciplinas
		var os_disciplinas = db.createObjectStore("disciplinas",{keyPath: "id"});
		os_disciplinas.createIndex("idx_nome","nome",{'sigla':true});
		os_disciplinas.transaction.addEventListener('complete',function(){
			$scope.root.loadDisciplinas();
		})

		// Criando ObjectStore de projetos
		var os_projetos = db.createObjectStore("projetos",{keyPath: "id"});
		os_projetos.createIndex("idx_nome","nome",{'sigla':true});
		os_projetos.transaction.addEventListener('complete',function(){
			$scope.root.loadProjetos();
		})

		// Criando ObjectStore de clientes
		var os_clientes = db.createObjectStore("clientes",{keyPath: "id"});
		os_clientes.createIndex("idx_nome","nome",{'sigla':true});
		os_clientes.transaction.addEventListener('complete',function(){
			$scope.root.loadClientes();
		})

		// Criando ObjectStore de telas
		var os_telas = db.createObjectStore("telas",{keyPath: "id"});
		os_clientes.createIndex("idx_titulo","titulo");
		os_clientes.transaction.addEventListener('complete',function(){
			$scope.root.loadTelas();
		})
	}

	// Definindo funções que renovam o token
	var refreshToken = function(){
		GDoksFactory.refreshToken()
		.success(
			function(response){
				var user = $cookies.getObject('user');
				user.token = response.token;
				$cookies.putObject('user',user,{path:'/'});
			}
		)
		.error(
			function(error){
				console.warn('Token não foi renovado!');
				console.warn(error);
				$cookies.remove('user',{path:'/'});
				indexedDB.deleteDatabase('gdoks');
				window.location="/";
			}
		);
	}

	// Acionando timer que renova o token de tempo em tempo
	$interval(refreshToken,TOKEN_REFRESH_IN);
	
	$scope.toggleMenu = function(){
		$mdSidenav('menu_principal').toggle();
	}

	$scope.root.addDocumentoAoHistorico = function(documento){
		//Executando ações dentro de um timeout para que as movimentações não sejam exibidas no menu
		setTimeout(function(){			
			// separando somente dados de interesse para manter no histórico
			var doc = {'i':documento.id, 'c':documento.codigo};

			// Carregando histórico do cookie
			$scope.root.historico = $cookies.getObject(COOKIE_KEY_HISTORICO);

			// buscando se o doc em questão já está no vetor histórico
			var pos = $scope.root.historico.findIndex(function(a){return a.i == this},doc.i);
			if(pos > -1){
				// doc está no histórico na posição pos. Reposicionando ele a frente
				$scope.root.historico.unshift($scope.root.historico.splice(pos,1)[0]);
			} else {
				// doc não está no histórico. Adicionando ele a frente
				$scope.root.historico.unshift(doc);
			}
			
			// Removendo o último se o tamanho do histórico for maior que o máximo
			if($scope.root.historico.length > HISTORICO_MAX_SIZE){
				$scope.root.historico.pop();
			}
			
			// Atualizando o cookie para uso futuro
			$cookies.putObject(COOKIE_KEY_HISTORICO,$scope.root.historico);
		},500);
	}
}
;WebGDoks.factory('GDoksFactory',
	[
		'$http','$cookies',
		function($http,$cookies){
			var GDoksFactory = {};

			// Função auxiliar que retorna headers baseada no cooke user = = = = = = = = = = = = = = = = = = = = = = = = =
			var buildHeaders = function(){
				return {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}};
			}

			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para mudar login e senha
			GDoksFactory.mudaLoginSenha = function(novoLogin,novaSenha){
				return $http.post(API_ROOT+'/mudaLoginSenha',{'novoLogin':novoLogin,'novaSenha':novaSenha},buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.refreshToken = function(){
				return $http.get(API_ROOT+'/refresh',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.loadUsuarios = function(){
				return $http.get(API_ROOT+'/usuarios',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para atualizar o usuario enviado
			GDoksFactory.atualizarUsuario = function(usuario){
				return $http.put(API_ROOT+'/usuarios/'+usuario.id,usuario,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para adicionar novo usuario enviado
			GDoksFactory.adicionarUsuario = function(usuario){
				return $http.post(API_ROOT+'/usuarios',usuario,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getTelasDeUsuario = function(id_usuario){
				return $http.get(API_ROOT+'/usuarios/'+id_usuario+'/telas',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.salvarTelasDeUsuario = function(id_usuario,telas){
				return $http.put(API_ROOT+'/usuarios/'+id_usuario+'/telas',telas,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDisciplinas = function(){
				return $http.get(API_ROOT+'/disciplinas',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDisciplina = function(id_disciplina){
				return $http.get(API_ROOT+'/disciplinas/'+id_disciplina,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para atualizar o usuario enviado
			GDoksFactory.atualizarDisciplina = function(disciplina){
				return $http.put(API_ROOT+'/disciplinas/'+disciplina.id,disciplina,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para adicionar nova disciplina
			GDoksFactory.adicionarDisciplina = function(disciplina){
				return $http.post(API_ROOT+'/disciplinas',disciplina,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarSubdisciplina = function(subdisciplina){
				return $http.put(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/'+subdisciplina.id,subdisciplina,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarSubdisciplina = function(subdisciplina){
				return $http.post(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/',subdisciplina,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerSubdisciplina = function(subdisciplina){
				return $http.delete(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/'+subdisciplina.id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.salvarEspecialistas = function(id_disciplina,ids_especialistas){
				return $http.put(API_ROOT+'/disciplinas/'+id_disciplina+'/especialistas/',ids_especialistas,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarValidador = function(id_disciplina,id_usuario,tipo){
				return $http.post(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/',{"idu":id_usuario,"tipo":tipo},buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerValidador = function(id_disciplina,id_usuario){
				return $http.delete(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/'+id_usuario,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.salvarValidadores = function(id_disciplina,ids_validadores){
				return $http.put(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/',ids_validadores,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getProjetos = function(){
				return $http.get(API_ROOT+'/projetos',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getProjetosDetalhados = function(listarInativos){
				var i = (listarInativos === true)?1:0;
				return $http.get(API_ROOT+'/projetos/detalhados?i='+i,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getProjeto = function(id){
				return $http.get(API_ROOT+'/projetos/'+id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarProjeto = function(projeto){
				return $http.put(API_ROOT+'/projetos/'+projeto.id,projeto,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarProjeto = function(projeto){
				return $http.post(API_ROOT+'/projetos',projeto,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarArea = function(area){
				return $http.post(API_ROOT+'/projetos/'+area.id_projeto+'/areas/',area,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarArea = function(area){
				return $http.put(API_ROOT+'/projetos/'+area.id_projeto+'/areas/'+area.id,area,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerArea = function(area){
				return $http.delete(API_ROOT+'/projetos/'+area.id_projeto+'/areas/'+area.id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getAreas = function(id_projeto){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/areas',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarSubarea = function(subarea){
				return $http.post(API_ROOT+'/subareas/',subarea,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarSubarea = function(subarea){
				return $http.put(API_ROOT+'/subareas/'+subarea.id,subarea,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerSubarea = function(subarea){
				return $http.delete(API_ROOT+'/subareas/'+subarea.id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getSubareas = function(id_projeto,id_area){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/areas/'+id_area+'/subareas',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.salvarDAOs = function(){
				// implementada em ProjetoDAOsControlller
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerDAO = function(dao){
				return $http.delete(API_ROOT+'/projetos/'+dao.id_projeto+'/daos/'+dao.id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.alterarDocumento = function(documento){
				return $http.put(API_ROOT+'/projetos/'+documento.id_projeto+'/documentos/'+documento.id,documento,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarDocumento = function(documento){
				return $http.post(API_ROOT+'/projetos/'+documento.id_projeto+'/documentos/',documento,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerDocumento = function(documento){
				return $http.delete(API_ROOT+'/projetos/'+documento.id_projeto+'/documentos/'+documento.id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getClientes = function(){
				return $http.get(API_ROOT+'/clientes',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getCliente = function(id){
				return $http.get(API_ROOT+'/clientes/'+id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarCliente = function(cliente){
				return $http.put(API_ROOT+'/clientes/'+cliente.id,cliente,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarCliente = function(cliente){
				return $http.post(API_ROOT+'/clientes',cliente,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumentosParaValidar = function(){
				return $http.get(API_ROOT+'/documentos/paraValidar',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumentosDoProjeto = function(id_projeto){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/documentos/',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getGrdsDoProjeto = function(id_projeto){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/grds/',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumentos = function(id_projeto){
				return $http.get(API_ROOT+'/documentos',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getDocumento = function(id_documento){
				return $http.get(API_ROOT+'/documentos/'+id_documento,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.downloadArquivo = function(idArquivo){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT+'/arquivos/'+idArquivo);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');

				// criando o campo para o token
				var input = document.createElement('input');
				input.setAttribute('name','token');
				input.setAttribute('value',$cookies.getObject('user').token);

				// adicionando input ao form
				form.appendChild(input);

				// adicionando form a dom
				document.body.appendChild(form);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.validarProgresso = function(idDocumento,progresso){
				return $http.post(API_ROOT+'/documentos/'+idDocumento+'/validacaoDeProgresso', progresso,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.validarProgressos = function(progressos){
				return $http.post(API_ROOT+'/documentos/validarProgressos', progressos,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.lockDoc = function(idDoc){
				return $http.get(API_ROOT+'/documentos/'+idDoc+'/lock',buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.delockDoc = function(idDoc){
				return $http.get(API_ROOT+'/documentos/'+idDoc+'/delock',buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getAcoes = function(){
				return $http.get(API_ROOT+'/acoes',buildHeaders());		
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getTelas = function(){
				return $http.get(API_ROOT+'/telas',buildHeaders());		
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getLogs = function(q){
				var query = [];
				if(!isNaN(q.uid)){query.push(q.uid)};
				if(!isNaN(q.aid)){query.push(q.aid)};
				query.push(q.de.toJSON().substr(0,10));
				query.push(q.ate.toJSON().substr(0,10));
				return $http.get(API_ROOT+'/logs/'+query.join('/'),buildHeaders());		
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getCargos = function(){
				return $http.get(API_ROOT+'/cargos',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarCargo = function(cargo){
				return $http.put(API_ROOT+'/cargos/'+cargo.id,cargo,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.inserirCargo = function(cargo){
				return $http.post(API_ROOT+'/cargos',cargo,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.removerCargo = function(idCargo){
				return $http.delete(API_ROOT+'/cargos/'+idCargo,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getTamanhosDePapel = function(){
				return $http.get(API_ROOT+'/tamanhosDePapel',buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.baixarPDA = function(id_pda){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT+'/pdas/'+id_pda);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');

				// adicionando form a dom
				document.body.appendChild(form);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.baixarPDAParaRevisao = function(id_pda){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT+'/pdas/checkout/'+id_pda);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');

				// Criando um input field do tipo hidden com um token
				var token = Math.round(Math.pow(10,10)*Math.random());
				var input = document.createElement("input");
				input.setAttribute('name','downloadToken');
				input.setAttribute('type','hidden');
				input.setAttribute('value',token);

				// Adicionando input no form
				form.appendChild(input);

				// adicionando form a dom
				document.body.appendChild(form);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);

				return token;
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.bloquearDocumentoParaRevisao = function(id_doc){
				return $http.post(API_ROOT+'/documentos/'+id_doc+'/checkout',null,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.baixarRevisaoAtualizada = function(id_revisao){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT+'/revisoes/'+id_revisao);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');

				// adicionando form a dom
				document.body.appendChild(form);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.adicionarGrd = function(grd){
				return $http.post(API_ROOT+'/grds', grd,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.atualizarGrd = function(grd){
				return $http.put(API_ROOT+'/grds/'+grd.id, grd,buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getGrd = function(id_grd){
				return $http.get(API_ROOT+'/grds/'+id_grd,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getCodigosEmi = function(){
				return $http.get(API_ROOT+'/emis',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getTiposDeDocumento = function(){
				return $http.get(API_ROOT+'/tiposDeDocumento',buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.viewGRD = function(id_grd){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT + '/grds/' + id_grd);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');
				form.setAttribute('target','_blank');

				// adicionando campo
				var input = document.createElement('input');
				input.setAttribute('name','view');
				input.setAttribute('value','pdf');


				// adicionando form a dom
				document.body.appendChild(form);
				form.appendChild(input);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.downloadGRD = function(id_grd){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT + '/grds/' + id_grd);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');

				// adicionando campo
				var input = document.createElement('input');
				input.setAttribute('name','view');
				input.setAttribute('value','zip');


				// adicionando form a dom
				document.body.appendChild(form);
				form.appendChild(input);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.buscarGRD = function(query){
				
				// Montando a query string com base no objeto query
				var queryString = '';
				for(var i in query){

					// Verificando se é do tipo Date
					if(query[i] instanceof Date){
						
						// Propriedade é do tipo data. Transformando em string
						queryString += i+'='+(query[i].toJSON().substr(0,10))+'&';
					
					} else {

						// Propriedade não é Date. emendando na string
						queryString += i+'='+query[i]+'&';
					}
					
				}

				// removendo o derradeiro &;
				queryString = queryString.substr(0,queryString.length-1);

				// Retornando promise da requisição de busca
				return $http.get(API_ROOT+'/grds/search/q?'+queryString,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.mailGRD = function(id_grd,mail){
				return $http.post(API_ROOT+'/grds/'+id_grd+'/mail',mail,buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.mailLinkGRD = function(id_grd,mail){
				return $http.post(API_ROOT+'/grds/'+id_grd+'/link',mail,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.loadObservacoesDeGRD = function(id_grd){
				return $http.get(API_ROOT+'/grds/'+id_grd+'/obs',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.ftpGRD = function(id_grd){
				return $http.post(API_ROOT+'/grds/'+id_grd+'/ftp',null,buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.publicarGRD = function(id_grd){
				return $http.post(API_ROOT+'/grds/'+id_grd+'/publicar',null,buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.buscarDocumentos = function(query){
				// Montando a query string com base no objeto query
				var queryString = '';
				for(var i in query){
					queryString += i+'='+query[i]+'&';
				}

				// removendo o derradeiro &;
				queryString = queryString.substr(0,queryString.length-1);

				// Retornando promise da requisição de busca
				return $http.get(API_ROOT+'/documentos/search/q?'+queryString,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.updateEndFisico = function(doc){
				return $http.put(API_ROOT+'/documentos/'+doc.id+'/revisoes/'+doc.rev_id+'/enderecoFisico', doc.end_fisico,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.avancarRevisao = function(doc){
				return $http.get(API_ROOT+'/documentos/'+doc.id+'/avancarRevisao',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GDoksFactory.getHistProjetos = function(){
			 	return $http.get(API_ROOT+'/historico/projetos',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			return GDoksFactory;
		}
	]
);WebGDoks.directive('focus', function(){
	return function(scope, element){
		element[0].focus();
	};
});

WebGDoks.directive('format', ['$filter', function ($filter) {
	return {
		require: '?ngModel',
		link: function (scope, elem, attrs, ctrl) {
			if (!ctrl) return;

			ctrl.$formatters.unshift(function (a) {
				return $filter(attrs.format)(ctrl.$modelValue)
			});

			ctrl.$parsers.unshift(function (viewValue) {
							  
		  elem.priceFormat({
			prefix: '',
			centsSeparator: ',',
			thousandsSeparator: '.'
		});                
				return elem[0].value;
			});
		}
	};
}]);

WebGDoks.directive('ngFileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var model = $parse(attrs.ngFileModel);
			var isMultiple = attrs.multiple;
			var modelSetter = model.assign;
			element.bind('change', function () {
				var values = [];
				angular.forEach(element[0].files, function (item) {
					var value = {
					   // File Name 
						name: item.name,
						//File Size 
						size: item.size,
						//File URL to view 
						url: URL.createObjectURL(item),
						// File Input Value 
						_file: item
					};
					values.push(value);
				});
				scope.$apply(function () {
					if (isMultiple) {
						modelSetter(scope, values);
					} else {
						modelSetter(scope, values[0]);
					}
				});
			});
		}
	};
}]);

WebGDoks.directive('capitalize', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
          if (inputValue == undefined) inputValue = '';
          var capitalized = inputValue.toUpperCase();
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize(scope[attrs.ngModel]); // capitalize initial value
      }
    };
  });

WebGDoks.directive("progresso", function (){
		return {
			restrict: 'E',
			scope: {
				progress: '=',
				width: '=',
				height:'=',
				colors:'=',
				fcolors:'='
			},
			template: "<canvas />",
			link: function(scope, element, attrs) {
				scope.canvas = element.find('canvas')[0];
				scope.context = scope.canvas.getContext('2d');
				scope.$watch('progress', function(values) {
					
					// determinando dimensões do canvas
					scope.canvas.width = attrs.width;
					scope.canvas.height = attrs.height;

					// Pintando o fundo
					scope.context.fillStyle = "#DDD";
					scope.context.fillRect(0, 0, scope.canvas.width, scope.canvas.height);

					// Lendo as cores
					var colors = eval(attrs.colors);
					var fcolors = eval(attrs.fcolors);

					// Preparando para pintar barras
					var barWidth;
					var text;
					var nextX = 0;
					var previousX = 0;

					// determinando fonte da numeração
					scope.context.font = '12px sans-serif';
					scope.context.textBaseline = 'middle';
					for (var i = 0;i < values.length; i++) {
						// Desenhando a barra
						barWidth = Math.ceil(values[i] / 100 * scope.canvas.width);
						scope.context.fillStyle = colors[i];
						scope.context.fillRect(nextX, 0, barWidth, scope.canvas.height);
						previousX = nextX;
						nextX += barWidth;

						// Desenhando o texto
						scope.context.fillStyle = fcolors[i];
						text = values[i]+'%';
						textX = nextX - scope.context.measureText(text).width - 3;
						if(textX>previousX){
							scope.context.fillText(text,textX,scope.canvas.height/2);
						}
					}
				});
			}        
		}
	});/*global angular, navigator*/

(function() {
    'use strict';

    angular
        .module('angular-click-outside', [])
        .directive('clickOutside', [
            '$document', '$parse', '$timeout',
            clickOutside
        ]);
    
    /**
     * @ngdoc directive
     * @name angular-click-outside.directive:clickOutside
     * @description Directive to add click outside capabilities to DOM elements
     * @requires $document
     * @requires $parse
     * @requires $timeout
     **/
    function clickOutside($document, $parse, $timeout) {
        return {
            restrict: 'A',
            link: function($scope, elem, attr) {

                // postpone linking to next digest to allow for unique id generation
                $timeout(function() {
                    var classList = (attr.outsideIfNot !== undefined) ? attr.outsideIfNot.split(/[ ,]+/) : [],
                        fn;

                    function eventHandler(e) {
                        var i,
                            element,
                            r,
                            id,
                            classNames,
                            l;

                        // check if our element already hidden and abort if so
                        if (angular.element(elem).hasClass("ng-hide")) {
                            return;
                        }

                        // if there is no click target, no point going on
                        if (!e || !e.target) {
                            return;
                        }

                        // loop through the available elements, looking for classes in the class list that might match and so will eat
                        for (element = e.target; element; element = element.parentNode) {
                            // check if the element is the same element the directive is attached to and exit if so (props @CosticaPuntaru)
                            if (element === elem[0]) {
                                return;
                            }
                            
                            // now we have done the initial checks, start gathering id's and classes
                            id = element.id,
                            classNames = element.className,
                            l = classList.length;

                            // Unwrap SVGAnimatedString classes
                            if (classNames && classNames.baseVal !== undefined) {
                                classNames = classNames.baseVal;
                            }

                            // if there are no class names on the element clicked, skip the check
                            if (classNames || id) {

                                // loop through the elements id's and classnames looking for exceptions
                                for (i = 0; i < l; i++) {
                                    //prepare regex for class word matching
                                    r = new RegExp('\\b' + classList[i] + '\\b');

                                    // check for exact matches on id's or classes, but only if they exist in the first place
                                    if ((id !== undefined && id === classList[i]) || (classNames && r.test(classNames))) {
                                        // now let's exit out as it is an element that has been defined as being ignored for clicking outside
                                        return;
                                    }
                                }
                            }
                        }

                        // if we have got this far, then we are good to go with processing the command passed in via the click-outside attribute
                        $timeout(function() {
                            fn = $parse(attr['clickOutside']);
                            fn($scope, { event: e });
                        });
                    }

                    // if the devices has a touchscreen, listen for this event
                    if (_hasTouch()) {
                        $document.on('touchstart', eventHandler);
                    }

                    // still listen for the click event even if there is touch to cater for touchscreen laptops
                    $document.on('click', eventHandler);

                    // when the scope is destroyed, clean up the documents event handlers as we don't want it hanging around
                    $scope.$on('$destroy', function() {
                        if (_hasTouch()) {
                            $document.off('touchstart', eventHandler);
                        }

                        $document.off('click', eventHandler);
                    });

                    /**
                     * @description Private function to attempt to figure out if we are on a touch device
                     * @private
                     **/
                    function _hasTouch() {
                        // works on most browsers, IE10/11 and Surface
                        return 'ontouchstart' in window || navigator.maxTouchPoints;
                    };
                });
            }
        };
    }
})();;(function(){
	angular.module('Historico',[])
	.controller('HistoricoController',HistoricoController);

	// Defininfo função controller
	function HistoricoController($scope,$cookies,$location){
		$scope.goToDoc = function(idDoc){
			$location.url('/documentos/'+idDoc);
		}
	}
})();
//# sourceMappingURL=scripts.js.map