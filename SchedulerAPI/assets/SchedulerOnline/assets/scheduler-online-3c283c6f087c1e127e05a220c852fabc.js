define("scheduler-online/app",["ember","ember/resolver","ember/load-initializers","scheduler-online/config/environment","exports"],function(e,t,n,s,r){"use strict";var a=e["default"],o=t["default"],i=n["default"],l=s["default"];a.MODEL_FACTORY_INJECTIONS=!0;var u=a.Application.extend({modulePrefix:l.modulePrefix,podModulePrefix:l.podModulePrefix,Resolver:o});i(u,l.modulePrefix),r["default"]=u}),define("scheduler-online/components/day-period",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Component.extend({classNameBindings:["isEmpty:empty-event"],isEmpty:function(){return this.get("period").empty}.property("period"),height:function(){var e=2.2*moment.duration(this.get("period").endTime).subtract(moment.duration(this.get("period").startTime)).as("minutes");return"height: "+e.toString()+"px"}.property("period")})}),define("scheduler-online/components/day-view",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Component.extend({classNameBindings:["isElapsed:day-container-disabled"],display:function(){return this.get("day").periods.length<1?!1:!0}.property("day"),isElapsed:function(){return this.get("day").elapsed}.property("day")})}),define("scheduler-online/components/side-bar",["ember","scheduler-online/config/environment","scheduler-online/utils/login-utils","exports"],function(e,t,n,s){"use strict";{var r=e["default"];t["default"],n["default"]}s["default"]=r.Component.extend(r.TargetActionSupport,{actions:{login:function(){this.sendAction("login")},about:function(){this.sendAction("about")},settings:function(){this.sendAction("settings")},logout:function(){this.sendAction("logout")},toggle:function(){$(".nav-menu").offcanvas("toggle")}}})}),define("scheduler-online/utils/login-utils",["scheduler-online/config/environment","exports"],function(e,t){"use strict";var n=e["default"];t["default"]={localStorageKey:"currentSession-IKF93N572H312YE43A3",checkLogin:function(){var e=this.localStorageKey;return new Ember.RSVP.Promise(function(t,s){if(JSON.parse(localStorage.getItem(e))){var r=n.routeLocation+"/api/isAuthenticated",a={tokenId:JSON.parse(localStorage.getItem(e)).token.id};Ember.$.ajax({url:r,data:a,success:function(){t(!0)},error:function(e){"OK"===e.responseText?t(!0):s(!1)}})}else s(!1)})},logout:function(){var e=this.localStorageKey;return new Ember.RSVP.Promise(function(t,s){if(JSON.parse(localStorage.getItem(e))){var r=n.routeLocation+"/api/logout",a={userId:JSON.parse(localStorage.getItem(e)).user.id};Ember.$.ajax({url:r,type:"POST",data:JSON.stringify(a),headers:{Accept:"application/json; charset=utf-8","Content-Type":"application/json; charset=utf-8"},success:function(){localStorage.removeItem(e),t(!0)},error:function(n){"OK"===n.responseText?(localStorage.removeItem(e),t(!0)):s(!1)}})}else t(!0)})},checkLocalStorage:function(){try{return localStorage.setItem("localStorageTest-E9FJSNWN209DS0AM2","E9FJSNWN209DS0AM2"),localStorage.removeItem("localStorageTest-E9FJSNWN209DS0AM2"),!0}catch(e){return!1}},getToken:function(){return JSON.parse(localStorage.getItem(this.localStorageKey)).token.token},getTokenId:function(){return JSON.parse(localStorage.getItem(this.localStorageKey)).token.id},getTokenObject:function(){return JSON.parse(localStorage.getItem(this.localStorageKey)).token},localStorageAlert:"We're having trouble processing your request. You're either using Safari in Private Mode or an older, unsupported browser. Please disable Private Mode on Safari or use another compatible browser, in order to continue."}}),define("scheduler-online/components/winjs-view",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Component.extend({setup:function(){WinJS.UI.processAll()}.on("didInsertElement")})}),define("scheduler-online/controllers/index",["ember","scheduler-online/mixins/standard-actions","exports"],function(e,t,n){"use strict";var s=e["default"],r=t["default"];n["default"]=s.Controller.extend(r,{})}),define("scheduler-online/mixins/standard-actions",["ember","scheduler-online/config/environment","scheduler-online/utils/login-utils","exports"],function(e,t,n,s){"use strict";var r=e["default"],a=(t["default"],n["default"]);s["default"]=r.Mixin.create({actions:{login:function(){this.transitionToRoute("login")},logout:function(){var e=this;a.logout().then(function(){e.transitionToRoute("index")},function(){})},settings:function(){this.transitionToRoute("settings")},about:function(){this.transitionToRoute("about")}}})}),define("scheduler-online/controllers/login",["ember","scheduler-online/utils/login-utils","scheduler-online/config/environment","exports"],function(e,t,n,s){"use strict";var r=e["default"],a=t["default"],o=n["default"];s["default"]=r.Controller.extend({loginError:!1,actions:{login:function(){var e=this;if(!a.checkLocalStorage())return void alert(a.localStorageAlert);var t={username:this.get("username"),password:this.get("password")};r.$.ajax({type:"POST",url:o.routeLocation+"/api/login",headers:{Accept:"application/json; charset=utf-8","Content-Type":"application/json; charset=utf-8"},data:JSON.stringify(t),success:function(t){t.token?(localStorage.setItem(a.localStorageKey,JSON.stringify(t)),e.transitionToRoute("index")):e.set("loginError",!0)},error:function(){e.set("loginError",!0)}})},close:function(){this.set("loginError",!1)},signUp:function(){this.transitionToRoute("sign-up")},forgotPassword:function(){this.transitionToRoute("forgot-password")},resend:function(){this.transitionToRoute("resend-verification")}}})}),define("scheduler-online/controllers/sign-up",["ember","scheduler-online/config/environment","scheduler-online/utils/login-utils","exports"],function(e,t,n,s){"use strict";{var r=e["default"],a=t["default"];n["default"]}s["default"]=r.Controller.extend({error:!1,actions:{closeError:function(){this.set("error",!1)},signUp:function(){this.set("buttonPressed",!0);var e=this.get("password"),t=this.get("confirmPassword"),n=this;if(e==t)if(e.length>=6&&e.length<=20){var s={firstName:this.get("firstName"),lastName:this.get("lastName"),email:this.get("email"),password:e};for(var o in s)if(s.hasOwnProperty(o)&&!s[o])return this.set("error",!0),void this.set("buttonPressed",!1);r.$.ajax({url:a.routeLocation+"/api/user",data:JSON.stringify(s),headers:{Accept:"application/json; charset=utf-8","Content-Type":"application/json; charset=utf-8"},type:"POST",success:function(){n.set("success",!0),n.set("buttonPressed",!0),setTimeout(function(){n.transitionToRoute("login")},6e3)},error:function(e){"EMAIL_IN_USE"===e.response?(n.set("error",!0),n.set("buttonPressed",!1)):(n.set("error",!0),n.set("buttonPressed",!1))}})}else this.set("error",!0),this.set("buttonPressed",!1);else this.set("error",!0),this.set("buttonPressed",!1)}}})}),define("scheduler-online/controllers/verify",["ember","scheduler-online/utils/login-utils","scheduler-online/config/environment","exports"],function(e,t,n,s){"use strict";var r=e["default"],a=(t["default"],n["default"]);s["default"]=r.Controller.extend({verifyError:!1,actions:{verify:function(){var e=this,t={email:this.get("username"),token:this.get("token")};r.$.ajax({type:"POST",headers:{Accept:"application/json; charset=utf-8","Content-Type":"application/json; charset=utf-8"},url:a.routeLocation+"/api/user/verify",data:JSON.stringify(t),success:function(){e.set("verifySuccess",!0),setTimeout(function(){e.transitionToRoute("login")},3e3)},error:function(){e.set("verifyError",!0)}})},close:function(){this.set("verifyError",!1)}}})}),define("scheduler-online/initializers/export-application-global",["ember","scheduler-online/config/environment","exports"],function(e,t,n){"use strict";function s(e,t){var n=r.String.classify(a.modulePrefix);a.exportApplicationGlobal&&(window[n]=t)}var r=e["default"],a=t["default"];n.initialize=s,n["default"]={name:"export-application-global",initialize:s}}),define("scheduler-online/mixins/authenticated-route",["ember","scheduler-online/config/environment","scheduler-online/utils/login-utils","exports"],function(e,t,n,s){"use strict";var r=e["default"],a=(t["default"],n["default"]);s["default"]=r.Mixin.create({beforeModel:function(){var e=this;return a.checkLogin().then(function(){},function(){e.transitionTo("login")})}})}),define("scheduler-online/mixins/session-route",["ember","scheduler-online/config/environment","scheduler-online/utils/login-utils","exports"],function(e,t,n,s){"use strict";var r=e["default"],a=(t["default"],n["default"]);s["default"]=r.Mixin.create({beforeModel:function(){this._super();var e=this;return a.checkLogin().then(function(){e.set("isAuthenticated",!0)},function(){e.set("isAuthenticated",!1)})}})}),define("scheduler-online/mixins/unauthenticated-route",["ember","scheduler-online/config/environment","scheduler-online/utils/login-utils","exports"],function(e,t,n,s){"use strict";var r=e["default"],a=(t["default"],n["default"]);s["default"]=r.Mixin.create({beforeModel:function(){var e=this;a.checkLogin().then(function(){e.transitionTo("index")},function(){e.set("isAuthenticated",!1)})}})}),define("scheduler-online/router",["ember","scheduler-online/config/environment","exports"],function(e,t,n){"use strict";var s=e["default"],r=t["default"],a=s.Router.extend({location:r.locationType});a.map(function(){this.route("login",{path:"/app/login"}),this.route("sign-up",{path:"/app/sign-up"}),this.route("verify",{path:"/app/verify"})}),n["default"]=a}),define("scheduler-online/routes/index",["ember","scheduler-online/config/environment","scheduler-online/utils/login-utils","scheduler-online/mixins/authenticated-route","exports"],function(e,t,n,s,r){"use strict";var a=e["default"],o=t["default"],i=n["default"],l=s["default"];r["default"]=a.Route.extend(l,{model:function(){return a.RSVP.hash({week:a.$.getJSON(o.routeLocation+"/api/week",{token:i.getToken(),tokenId:i.getTokenId()}),nextWeek:a.$.getJSON(o.routeLocation+"/api/nextWeek",{token:i.getToken(),tokenId:i.getTokenId()})})},setupController:function(e,t){e.set("nextWeek",t.nextWeek),e.set("week",t.week),e.set("isAuthenticated",this.get("isAuthenticated"))}})}),define("scheduler-online/routes/login",["ember","scheduler-online/config/environment","scheduler-online/mixins/unauthenticated-route","exports"],function(e,t,n,s){"use strict";var r=e["default"],a=(t["default"],n["default"]);s["default"]=r.Route.extend(a,{})}),define("scheduler-online/routes/sign-up",["ember","scheduler-online/config/environment","scheduler-online/mixins/unauthenticated-route","exports"],function(e,t,n,s){"use strict";var r=e["default"],a=(t["default"],n["default"]);s["default"]=r.Route.extend(a,{})}),define("scheduler-online/routes/verify",["ember","scheduler-online/config/environment","scheduler-online/mixins/unauthenticated-route","exports"],function(e,t,n,s){"use strict";var r=e["default"],a=(t["default"],n["default"]);s["default"]=r.Route.extend(a,{})}),define("scheduler-online/templates/application",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,s,r,a){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,n.Handlebars.helpers),a=a||{};var o,i="";return o=s._triageMustache.call(t,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:a}),(o||0===o)&&a.buffer.push(o),a.buffer.push("\r\n"),i})}),define("scheduler-online/templates/components/day-period",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,s,r,a){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,n.Handlebars.helpers),a=a||{};var o,i="",l=this.escapeExpression;return a.buffer.push('<div class="period" '),a.buffer.push(l(s["bind-attr"].call(t,{hash:{style:"height"},hashTypes:{style:"ID"},hashContexts:{style:t},contexts:[],types:[],data:a}))),a.buffer.push('>\r\n    <p class="start-time">'),o=s._triageMustache.call(t,"period.startTime",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:a}),(o||0===o)&&a.buffer.push(o),a.buffer.push('</p>\r\n    <p class="event-title">'),o=s._triageMustache.call(t,"period.title",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:a}),(o||0===o)&&a.buffer.push(o),a.buffer.push('</p>\r\n    <p class="end-time">'),o=s._triageMustache.call(t,"period.endTime",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:a}),(o||0===o)&&a.buffer.push(o),a.buffer.push("</p>\r\n</div>"),i})}),define("scheduler-online/templates/components/day-view",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,s,r,a){function o(e,t){var n,r="";return t.buffer.push('\r\n<div class="day-container">\r\n    <div class="day-title">\r\n        <p class="day-title-text">'),n=s._triageMustache.call(e,"day.title",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(n||0===n)&&t.buffer.push(n),t.buffer.push('</p>\r\n    </div>\r\n    <div class="day">\r\n        '),n=s.each.call(e,"period","in","day.periods",{hash:{},hashTypes:{},hashContexts:{},inverse:h.noop,fn:h.program(2,i,t),contexts:[e,e,e],types:["ID","ID","ID"],data:t}),(n||0===n)&&t.buffer.push(n),t.buffer.push("\r\n    </div>\r\n</div> \r\n"),r}function i(e,t){var n,r,a="";return t.buffer.push("\r\n            "),t.buffer.push(c((n=s["day-period"]||e&&e["day-period"],r={hash:{period:"period"},hashTypes:{period:"ID"},hashContexts:{period:e},contexts:[],types:[],data:t},n?n.call(e,r):u.call(e,"day-period",r)))),t.buffer.push("\r\n        "),a}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,n.Handlebars.helpers),a=a||{};var l,u=s.helperMissing,c=this.escapeExpression,h=this;l=s["if"].call(t,"display",{hash:{},hashTypes:{},hashContexts:{},inverse:h.noop,fn:h.program(1,o,a),contexts:[t],types:["ID"],data:a}),a.buffer.push(l||0===l?l:"")})}),define("scheduler-online/templates/components/side-bar",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,s,r,a){function o(e,t){var n="";return t.buffer.push('\r\n            <button type="button" class="btn btn-default btn-lg btn-block btn-sidemenu" '),t.buffer.push(c(s.action.call(e,"settings",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t}))),t.buffer.push('>SETTINGS</button>\r\n            <button type="button" class="btn btn-default btn-lg btn-block btn-sidemenu" '),t.buffer.push(c(s.action.call(e,"logout",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t}))),t.buffer.push(">LOGOUT</button>\r\n        "),n}function i(e,t){var n="";return t.buffer.push('\r\n            <button type="button" class="btn btn-default btn-lg btn-block btn-sidemenu" '),t.buffer.push(c(s.action.call(e,"login",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t}))),t.buffer.push(">LOGIN</button>\r\n        "),n}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,n.Handlebars.helpers),a=a||{};var l,u="",c=this.escapeExpression,h=this;return a.buffer.push('<nav class="nav-menu navmenu navmenu-default navmenu-fixed-right offcanvas" role="navigation">\r\n    <div class="nav-menu-content">\r\n        <button class="btn btn-default btn-lg btn-block btn-sidemenu" '),a.buffer.push(c(s.action.call(t,"toggle",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:a}))),a.buffer.push(">CLOSE</button>\r\n        "),l=s["if"].call(t,"isAuthenticated",{hash:{},hashTypes:{},hashContexts:{},inverse:h.program(3,i,a),fn:h.program(1,o,a),contexts:[t],types:["ID"],data:a}),(l||0===l)&&a.buffer.push(l),a.buffer.push('\r\n        <button type="button" class="btn btn-default btn-lg btn-block btn-sidemenu" '),a.buffer.push(c(s.action.call(t,"about",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:a}))),a.buffer.push(">ABOUT</button>\r\n    </div>\r\n</nav>"),u})}),define("scheduler-online/templates/components/winjs-view",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,s,r,a){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,n.Handlebars.helpers),a=a||{};var o;o=s._triageMustache.call(t,"yield",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:a}),a.buffer.push(o||0===o?o:"")})}),define("scheduler-online/templates/error",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,s,r,a){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,n.Handlebars.helpers),a=a||{},a.buffer.push('<nav class="navbar navbar-default">\r\n    <div class="container-fluid navbar-container">\r\n        <div class="navbar-header">\r\n            <a class="navbar-brand" href="#">\r\n                SCHEDULER\r\n            </a>\r\n        </div>\r\n    </div>\r\n</nav>\r\n\r\n<div class="container">\r\n    <h2>Something went wrong there.</h2>\r\n</div>\r\n')})}),define("scheduler-online/templates/index",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,s,r,a){function o(e,t){var n,r="";return t.buffer.push('\r\n    <div class="week-pivot" class="wide" data-win-control="WinJS.UI.Pivot">\r\n        <div class="week-pivot-item" data-win-control="WinJS.UI.PivotItem" data-win-options="{ \'header\': \'This Week\' }">\r\n            <div class="schedule-container">\r\n                '),n=s.each.call(e,"day","in","week",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(2,i,t),contexts:[e,e,e],types:["ID","ID","ID"],data:t}),(n||0===n)&&t.buffer.push(n),t.buffer.push('\r\n            </div>\r\n        </div>\r\n        <div class="week-pivot-item" data-win-control="WinJS.UI.PivotItem" data-win-options="{ \'header\': \'Next Week\' }">\r\n            <div class="schedule-container">\r\n                '),n=s.each.call(e,"day","in","nextWeek",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(2,i,t),contexts:[e,e,e],types:["ID","ID","ID"],data:t}),(n||0===n)&&t.buffer.push(n),t.buffer.push("\r\n            </div>\r\n        </div>\r\n    </div>\r\n    "),r}function i(e,t){var n,r,a="";return t.buffer.push(" \r\n                    "),t.buffer.push(d((n=s["day-view"]||e&&e["day-view"],r={hash:{day:"day"},hashTypes:{day:"ID"},hashContexts:{day:e},contexts:[],types:[],data:t},n?n.call(e,r):f.call(e,"day-view",r)))),t.buffer.push("\r\n                "),a}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,n.Handlebars.helpers),a=a||{};var l,u,c,h="",f=s.helperMissing,d=this.escapeExpression,p=this,b="function",v=s.blockHelperMissing;return a.buffer.push('<nav class="navbar">\r\n    <div class="container-fluid navbar-container">\r\n        <div class="navbar-float">\r\n            '),a.buffer.push(d(s.view.call(t,"navbar-toggle",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:a}))),a.buffer.push('\r\n        </div>\r\n        <div class="navbar-header">\r\n            <a class="navbar-brand" href="/">\r\n                SCHEDULER\r\n            </a>\r\n        </div>\r\n    </div>\r\n</nav>\r\n\r\n'),a.buffer.push(d((u=s["side-bar"]||t&&t["side-bar"],c={hash:{checkout:"checkout",login:"login",profile:"profile",logout:"logout",isAuthenticated:"isAuthenticated"},hashTypes:{checkout:"STRING",login:"STRING",profile:"STRING",logout:"STRING",isAuthenticated:"ID"},hashContexts:{checkout:t,login:t,profile:t,logout:t,isAuthenticated:t},contexts:[],types:[],data:a},u?u.call(t,c):f.call(t,"side-bar",c)))),a.buffer.push('\r\n\r\n<div class="container-fluid">\r\n    '),c={hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(1,o,a),contexts:[],types:[],data:a},(u=s["winjs-view"])?l=u.call(t,c):(u=t&&t["winjs-view"],l=typeof u===b?u.call(t,c):u),s["winjs-view"]||(l=v.call(t,"winjs-view",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(1,o,a),contexts:[],types:[],data:a})),(l||0===l)&&a.buffer.push(l),a.buffer.push("\r\n</div>"),h})}),define("scheduler-online/templates/login",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,s,r,a){function o(e,t){var n="";return t.buffer.push('\r\n            <div class="alert alert-dismissable alert-danger">\r\n                <button class="close" type="button" '),t.buffer.push(h(s.action.call(e,"close",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t}))),t.buffer.push(">×</button>\r\n                <strong>Oh snap!</strong> We didn't recognize your username and password. Please try again. Make sure you've verified your account.\r\n            </div>\r\n            "),n}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,n.Handlebars.helpers),a=a||{};var i,l,u,c="",h=this.escapeExpression,f=this,d=s.helperMissing;return a.buffer.push('<nav class="navbar" role="navigation">\r\n    <div class="container-fluid">\r\n        <div class="top-bar"></div>\r\n        <div class="navbar-header"></div>\r\n        <a class="navbar-brand" href="/">SCHEDULER</a>\r\n    </div>\r\n</nav>\r\n\r\n<div class="container">\r\n    <form class="login-form" '),a.buffer.push(h(s.action.call(t,"login",{hash:{on:"submit"},hashTypes:{on:"STRING"},hashContexts:{on:t},contexts:[t],types:["STRING"],data:a}))),a.buffer.push('>\r\n        <fieldset>\r\n            <h2 class="centered-text">Login to your Scheduler Account</h2>\r\n            '),i=s["if"].call(t,"loginError",{hash:{},hashTypes:{},hashContexts:{},inverse:f.noop,fn:f.program(1,o,a),contexts:[t],types:["ID"],data:a}),(i||0===i)&&a.buffer.push(i),a.buffer.push("\r\n            <div>\r\n                "),a.buffer.push(h((l=s.input||t&&t.input,u={hash:{"class":"form-control",value:"username",type:"text",placeholder:"Email"},hashTypes:{"class":"STRING",value:"ID",type:"STRING",placeholder:"STRING"},hashContexts:{"class":t,value:t,type:t,placeholder:t},contexts:[],types:[],data:a},l?l.call(t,u):d.call(t,"input",u)))),a.buffer.push("\r\n                "),a.buffer.push(h((l=s.input||t&&t.input,u={hash:{"class":"form-control",value:"password",type:"password",placeholder:"Password"},hashTypes:{"class":"STRING",value:"ID",type:"STRING",placeholder:"STRING"},hashContexts:{"class":t,value:t,type:t,placeholder:t},contexts:[],types:[],data:a},l?l.call(t,u):d.call(t,"input",u)))),a.buffer.push('\r\n            </div>\r\n            \r\n            <ul class="quick-link-container">\r\n                <li><a class="quick-link" href="#" '),a.buffer.push(h(s.action.call(t,"signUp",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:a}))),a.buffer.push('>Sign Up</a></li>\r\n                <li><a class="quick-link" href="#" '),a.buffer.push(h(s.action.call(t,"forgotPassword",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:a}))),a.buffer.push('>Forgot Password</a></li>\r\n                <li><a class="quick-link" href="#" '),a.buffer.push(h(s.action.call(t,"resend",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:a}))),a.buffer.push('>Resend Verification Email</a></li>\r\n            </ul>\r\n            <button class="btn btn-standard btn-float" type="submit">LOGIN</button>\r\n        </fieldset>\r\n    </form>\r\n</div>\r\n'),c})}),define("scheduler-online/templates/navbar-toggle",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,s,r,a){this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,n.Handlebars.helpers),a=a||{},a.buffer.push('<button type="button" class="navbar-toggle">\r\n    <span class="sr-only">Toggle navigation</span>\r\n    <span class="icon-bar"></span>\r\n    <span class="icon-bar"></span>\r\n    <span class="icon-bar"></span>\r\n</button>\r\n')})}),define("scheduler-online/templates/sign-up",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,s,r,a){function o(e,t){var n="";return t.buffer.push('\r\n            <div class="alert alert-dismissable alert-danger">\r\n                <button class="close" type="button" '),t.buffer.push(d(s.action.call(e,"closeError",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t}))),t.buffer.push(">×</button>\r\n                <strong>Oh snap!</strong> Check that your passwords match and that you've filled out all required fields. Remember that your password needs to be between 6 and 20 characters in length, inclusive.\r\n            </div>\r\n            "),n}function i(e,t){t.buffer.push('\r\n            <div class="alert alert-success">\r\n                <strong>Awesome!</strong> We just sent a confirmation email to your email address. You\'ll need to verify your account before you login.\r\n            </div>  \r\n            ')}function l(e,t){t.buffer.push('\r\n            <button class="btn btn-standard btn-float" type="submit">Sign Up</button>     \r\n            ')}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,n.Handlebars.helpers),a=a||{};var u,c,h,f="",d=this.escapeExpression,p=this,b=s.helperMissing;return a.buffer.push('<nav class="navbar" role="navigation">\r\n    <div class="container-fluid">\r\n        <div class="top-bar"></div>\r\n        <div class="navbar-header"></div>\r\n        <a class="navbar-brand" href="/">SCHEDULER</a>\r\n    </div>\r\n</nav>\r\n\r\n<div class="container">\r\n    <form class="login-form" '),a.buffer.push(d(s.action.call(t,"signUp",{hash:{on:"submit"},hashTypes:{on:"STRING"},hashContexts:{on:t},contexts:[t],types:["STRING"],data:a}))),a.buffer.push('>\r\n        <fieldset>\r\n            <h2 class="centered-text">Sign Up</h2>\r\n            '),u=s["if"].call(t,"error",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(1,o,a),contexts:[t],types:["ID"],data:a}),(u||0===u)&&a.buffer.push(u),a.buffer.push("\r\n            "),u=s["if"].call(t,"success",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(3,i,a),contexts:[t],types:["ID"],data:a}),(u||0===u)&&a.buffer.push(u),a.buffer.push("\r\n            <div>\r\n                "),a.buffer.push(d((c=s.input||t&&t.input,h={hash:{"class":"form-control",value:"firstName",type:"text",placeholder:"First Name"},hashTypes:{"class":"STRING",value:"ID",type:"STRING",placeholder:"STRING"},hashContexts:{"class":t,value:t,type:t,placeholder:t},contexts:[],types:[],data:a},c?c.call(t,h):b.call(t,"input",h)))),a.buffer.push("\r\n                "),a.buffer.push(d((c=s.input||t&&t.input,h={hash:{"class":"form-control",value:"lastName",type:"text",placeholder:"Last Name"},hashTypes:{"class":"STRING",value:"ID",type:"STRING",placeholder:"STRING"},hashContexts:{"class":t,value:t,type:t,placeholder:t},contexts:[],types:[],data:a},c?c.call(t,h):b.call(t,"input",h)))),a.buffer.push("\r\n                "),a.buffer.push(d((c=s.input||t&&t.input,h={hash:{"class":"form-control",value:"email",type:"text",placeholder:"Exeter Email Address"},hashTypes:{"class":"STRING",value:"ID",type:"STRING",placeholder:"STRING"},hashContexts:{"class":t,value:t,type:t,placeholder:t},contexts:[],types:[],data:a},c?c.call(t,h):b.call(t,"input",h)))),a.buffer.push("\r\n                "),a.buffer.push(d((c=s.input||t&&t.input,h={hash:{"class":"form-control",value:"password",type:"password",placeholder:"Password"},hashTypes:{"class":"STRING",value:"ID",type:"STRING",placeholder:"STRING"},hashContexts:{"class":t,value:t,type:t,placeholder:t},contexts:[],types:[],data:a},c?c.call(t,h):b.call(t,"input",h)))),a.buffer.push("\r\n                "),a.buffer.push(d((c=s.input||t&&t.input,h={hash:{"class":"form-control",value:"confirmPassword",type:"password",placeholder:"Confirm Password"},hashTypes:{"class":"STRING",value:"ID",type:"STRING",placeholder:"STRING"},hashContexts:{"class":t,value:t,type:t,placeholder:t},contexts:[],types:[],data:a},c?c.call(t,h):b.call(t,"input",h)))),a.buffer.push("\r\n            </div>\r\n            "),u=s.unless.call(t,"buttonPressed",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(5,l,a),contexts:[t],types:["ID"],data:a}),(u||0===u)&&a.buffer.push(u),a.buffer.push("\r\n        </fieldset>\r\n    </form>\r\n</div>\r\n"),f})}),define("scheduler-online/templates/verify",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.Handlebars.template(function(e,t,s,r,a){function o(e,t){var n="";return t.buffer.push('\r\n            <div class="alert alert-dismissable alert-danger">\r\n                <button class="close" type="button" '),t.buffer.push(f(s.action.call(e,"close",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t}))),t.buffer.push(">×</button>\r\n                <strong>Oh snap!</strong> Your token doesn't seem to be valid for the given email address.\r\n            </div>\r\n            "),n}function i(e,t){t.buffer.push('\r\n                <div class="alert alert-success">\r\n                    <strong>Great!</strong> Your account has been verified.\r\n                </div>\r\n            ')}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,n.Handlebars.helpers),a=a||{};var l,u,c,h="",f=this.escapeExpression,d=this,p=s.helperMissing;return a.buffer.push('<nav class="navbar" role="navigation">\r\n    <div class="container-fluid">\r\n        <div class="top-bar"></div>\r\n        <div class="navbar-header"></div>\r\n        <a class="navbar-brand" href="/">SCHEDULER</a>\r\n    </div>\r\n</nav>\r\n\r\n<div class="container">\r\n    <form class="login-form" '),a.buffer.push(f(s.action.call(t,"verify",{hash:{on:"submit"},hashTypes:{on:"STRING"},hashContexts:{on:t},contexts:[t],types:["STRING"],data:a}))),a.buffer.push('>\r\n        <fieldset>\r\n            <h2 class="centered-text">Verify your Scheduler Account</h2>\r\n            '),l=s["if"].call(t,"verifyError",{hash:{},hashTypes:{},hashContexts:{},inverse:d.noop,fn:d.program(1,o,a),contexts:[t],types:["ID"],data:a}),(l||0===l)&&a.buffer.push(l),a.buffer.push("\r\n            "),l=s["if"].call(t,"verifySuccess",{hash:{},hashTypes:{},hashContexts:{},inverse:d.noop,fn:d.program(3,i,a),contexts:[t],types:["ID"],data:a}),(l||0===l)&&a.buffer.push(l),a.buffer.push("\r\n            <div>\r\n                "),a.buffer.push(f((u=s.input||t&&t.input,c={hash:{"class":"form-control",value:"username",type:"text",placeholder:"Email"},hashTypes:{"class":"STRING",value:"ID",type:"STRING",placeholder:"STRING"},hashContexts:{"class":t,value:t,type:t,placeholder:t},contexts:[],types:[],data:a},u?u.call(t,c):p.call(t,"input",c)))),a.buffer.push("\r\n                "),a.buffer.push(f((u=s.input||t&&t.input,c={hash:{"class":"form-control",value:"token",type:"text",placeholder:"Token"},hashTypes:{"class":"STRING",value:"ID",type:"STRING",placeholder:"STRING"},hashContexts:{"class":t,value:t,type:t,placeholder:t},contexts:[],types:[],data:a},u?u.call(t,c):p.call(t,"input",c)))),a.buffer.push('\r\n            </div>\r\n            <button class="btn btn-standard btn-float" type="submit">SUBMIT</button>\r\n        </fieldset>\r\n    </form>\r\n</div>'),h})}),define("scheduler-online/views/navbar-toggle",["ember","exports"],function(e,t){"use strict";var n=e["default"];t["default"]=n.View.extend({templateName:"navbar-toggle",click:function(){$(".nav-menu").offcanvas("toggle")}})}),define("scheduler-online/config/environment",["ember"],function(e){var t="scheduler-online";try{var n=t+"/config/environment",s=e["default"].$('meta[name="'+n+'"]').attr("content"),r=JSON.parse(unescape(s));return{"default":r}}catch(a){throw new Error('Could not read config from meta tag with name "'+n+'".')}}),runningTests?require("scheduler-online/tests/test-helper"):require("scheduler-online/app")["default"].create({});