/**
 * Angular Dynamic Locale - 0.1.27
 * https://github.com/lgalfaso/angular-dynamic-locale
 * License: MIT
 */

!function(a,b){"function"==typeof define&&define.amd?define([],function(){return b()}):"object"==typeof exports?module.exports=b():b()}(this,function(){"use strict";return angular.module("tmh.dynamicLocale",[]).config(["$provide",function(a){function b(a){return a.$stateful=!0,a}a.decorator("dateFilter",["$delegate",b]),a.decorator("numberFilter",["$delegate",b]),a.decorator("currencyFilter",["$delegate",b])}]).constant("tmhDynamicLocale.STORAGE_KEY","tmhDynamicLocale.locale").provider("tmhDynamicLocale",["tmhDynamicLocale.STORAGE_KEY",function(a){function b(a,b,c,d){var e=document.createElement("script"),f=document.getElementsByTagName("body")[0],g=!1;e.type="text/javascript",e.readyState?e.onreadystatechange=function(){("complete"===e.readyState||"loaded"===e.readyState)&&(e.onreadystatechange=null,d(function(){g||(g=!0,f.removeChild(e),b())},30,!1))}:(e.onload=function(){g||(g=!0,f.removeChild(e),b())},e.onerror=function(){g||(g=!0,f.removeChild(e),c())}),e.src=a,e.async=!1,f.appendChild(e)}function c(a,c,d,g,h,k,l){function m(a,b){f===d&&(angular.forEach(a,function(c,d){b[d]?angular.isArray(b[d])&&(a[d].length=b[d].length):delete a[d]}),angular.forEach(b,function(c,d){angular.isArray(b[d])||angular.isObject(b[d])?(a[d]||(a[d]=angular.isArray(b[d])?[]:{}),m(a[d],b[d])):a[d]=b[d]}))}if(j[d])return j[d];var n,o=h.defer();return d===f?o.resolve(c):(n=k.get(d))?(f=d,g.$evalAsync(function(){m(c,n),e.put(i,d),g.$broadcast("$localeChangeSuccess",d,c),o.resolve(c)})):(f=d,j[d]=o.promise,b(a,function(){var a=angular.injector(["ngLocale"]),b=a.get("$locale");m(c,b),k.put(d,b),delete j[d],g.$apply(function(){e.put(i,d),g.$broadcast("$localeChangeSuccess",d,c),o.resolve(c)})},function(){delete j[d],g.$apply(function(){f===d&&(f=c.id),g.$broadcast("$localeChangeError",d),o.reject(d)})},l)),o.promise}var d,e,f,g="angular/i18n/angular-locale_{{locale}}.js",h="tmhDynamicLocaleStorageCache",i=a,j={};this.localeLocationPattern=function(a){return a?(g=a,this):g},this.useStorage=function(a){h=a},this.useCookieStorage=function(){this.useStorage("$cookieStore")},this.defaultLocale=function(a){d=a},this.storageKey=function(a){return a?(i=a,this):i},this.$get=["$rootScope","$injector","$interpolate","$locale","$q","tmhDynamicLocaleCache","$timeout",function(a,b,j,k,l,m,n){function o(b){return c(p({locale:b}),k,b,a,l,m,n)}var p=j(g);return e=b.get(h),a.$evalAsync(function(){var a;(a=e.get(i)||d)&&o(a)}),{set:o,get:function(){return f}}}]}]).provider("tmhDynamicLocaleCache",function(){this.$get=["$cacheFactory",function(a){return a("tmh.dynamicLocales")}]}).provider("tmhDynamicLocaleStorageCache",function(){this.$get=["$cacheFactory",function(a){return a("tmh.dynamicLocales.store")}]}).run(["tmhDynamicLocale",angular.noop]),"tmh.dynamicLocale"});
//# sourceMappingURL=tmhDynamicLocale.min.js.map