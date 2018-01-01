webpackJsonp(["styles"],{

/***/ "../../../../../src/styles.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/index.js?{\"ident\":\"postcss\"}!../../../../../src/styles.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__("../../../../style-loader/addStyles.js")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--8-1!../node_modules/postcss-loader/index.js??postcss!./styles.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--8-1!../node_modules/postcss-loader/index.js??postcss!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/index.js?{\"ident\":\"postcss\"}!../../../../../src/styles.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* You can add global styles to this file, and also import other style files */\r\n\r\n/* Variables */\r\n:root{\r\n  --color0        : #f2f3f8;\r\n  --color1        : #d6c7e8;\r\n  --color2        : rgb(248, 242, 255);\r\n  --color3        : #36a3f7;\r\n  --color4        : #716aca;\r\n  --color5        : #34bfa3;\r\n  --color5Text    : white;\r\n  --color4Text    : white;\r\n  --color3Text    : white;\r\n  --button-color1 : #3b548c;\r\n  --button-color2 : #F44336;\r\n  --button-color3 : #4CAF50;\r\n  --small-font    : 10px;\r\n  --medium-font   : 12px;\r\n  --large-font    : 14px;\r\n  --extralg-font  : 16px;\r\n}\r\n\r\n/* end of variables  */\r\nbody{\r\n  background: var(--color0);\r\n}\r\n.padding10{\r\n  padding:10px;\r\n}\r\n.margin-1{\r\n  margin:-1px;\r\n}\r\n.height-100{\r\n  min-height:100px;\r\n}\r\n.background-2{\r\n  background: var(--color2);\r\n  color: var(--color2Text);\r\n}\r\n.background-3{\r\n  background: var(--color3);\r\n  color: var(--color3Text);\r\n}\r\n.background-4{\r\n  background: var(--color4);\r\n  color: var(--color4Text);\r\n}\r\n.background-5{\r\n  background: var(--color5) !important;\r\n  color: var(--color5Text) !important;\r\n}\r\n.header-background{\r\n  background: cyan;\r\n  color: brown;\r\n}\r\n.body-background{\r\n  background: var(--color2);\r\n}\r\n/* FLexbox */\r\n.nopadding {\r\n  padding: 0px !important;\r\n}\r\n\r\n.d-flex {\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n}\r\n\r\n.innerFlex {\r\n  margin: -1px;\r\n}\r\n\r\n.border {\r\n  border: 1px solid var(--color1);\r\n}\r\n\r\n.p-2 {\r\n  -webkit-box-flex: 1;\r\n      -ms-flex: 1;\r\n          flex: 1;\r\n  padding: 5px;\r\n}\r\n\r\n.p-3 {\r\n  -webkit-box-flex: 2;\r\n      -ms-flex: 2;\r\n          flex: 2;\r\n}\r\n\r\n.p-4 {\r\n  -webkit-box-flex: 3;\r\n      -ms-flex: 3;\r\n          flex: 3;\r\n}\r\np-5{\r\n  -webkit-box-flex: 4;\r\n      -ms-flex: 4;\r\n          flex: 4;\r\n}\r\np-6{\r\n  -webkit-box-flex: 5;\r\n      -ms-flex: 5;\r\n          flex: 5;\r\n}\r\np-7{\r\n  -webkit-box-flex: 6;\r\n      -ms-flex: 6;\r\n          flex: 6;\r\n}\r\np-8{\r\n  -webkit-box-flex: 7;\r\n      -ms-flex: 7;\r\n          flex: 7;\r\n}\r\np-9{\r\n  -webkit-box-flex: 8;\r\n      -ms-flex: 8;\r\n          flex: 8;\r\n}\r\n.p-3 span {\r\n  padding: 5px;\r\n}\r\n\r\n.w-50 {\r\n  width: 50% !important;\r\n}\r\n\r\n.w-75 {\r\n  width: 75% !important;\r\n}\r\n\r\n.flex-header {\r\n  padding: 10px !important;\r\n  background: aliceblue;\r\n  font-weight:bold;\r\n  text-align:center;\r\n}\r\n\r\nol,\r\nul {\r\n  margin-top: 0;\r\n  margin-bottom: 0px;\r\n}\r\n\r\n.initiative {\r\n  padding: 15px;\r\n}\r\n\r\n.btn-del,\r\n.btn-edit {\r\n  color: var(--button-color1);\r\n}\r\n\r\n.btn-del:hover {\r\n  color: var(--button-color2);\r\n}\r\n\r\n.btn-edit:hover {\r\n  color: var(--button-color3);\r\n}\r\n\r\n.border-left {\r\n  border-left: 1px solid var(--color1);\r\n  margin-left: -1px;\r\n}\r\n\r\n.border-right {\r\n  border-right: 1px solid var(--color1);\r\n}\r\n/* End of flexbox  ========================================================================== */\r\n\r\n\r\n\r\n/* Loader */\r\nbody{\r\npadding-top: 55px;\r\n}\r\n.ctooltip {\r\nposition: relative;\r\ndisplay: inline-block;\r\n}\r\n\r\n.ctooltip .ctooltiptext {\r\nvisibility: hidden;\r\nwidth: 120px;\r\nbackground-color: #616161;\r\ncolor: #fff;\r\ntext-align: center;\r\nborder-radius: 6px;\r\npadding: 5px 0;\r\nposition: absolute;\r\nz-index: 1;\r\nmargin: -60px 0px 0px -100px;\r\n}\r\n\r\n.tooltip-width{\r\nwidth:150px !important;\r\n}   \r\n\r\n.ctooltip:hover .ctooltiptext {\r\nvisibility: visible;\r\n}\r\n\r\n/*loader css  */\r\n.bookshelf_wrapper {\r\nposition: relative;\r\ntop: 60%;\r\nleft: 50%;\r\n-webkit-transform: translate(-50%, -50%);\r\ntransform: translate(-50%, -50%);\r\nmargin-top: 19%;\r\n}\r\n\r\n.books_list {\r\nmargin: 0 auto;\r\nwidth: 300px;\r\npadding: 0;\r\n}\r\n\r\n.book_item {\r\nposition: absolute;\r\ntop: -120px;\r\nbox-sizing: border-box;\r\nlist-style: none;\r\nwidth: 40px;\r\nheight: 120px;\r\nopacity: 0;\r\nbackground-color: #1e6cc7;\r\nborder: 5px solid white;\r\n-webkit-transform-origin: bottom left;\r\n  transform-origin: bottom left;\r\n-webkit-transform: translateX(300px);\r\n  transform: translateX(300px);\r\n-webkit-animation: travel 2500ms linear infinite;\r\n  animation: travel 2500ms linear infinite;\r\n}\r\n.book_item.first {\r\ntop: -140px;\r\nheight: 140px;\r\n}\r\n.book_item.first:before, .book_item.first:after {\r\ncontent: '';\r\nposition: absolute;\r\ntop: 10px;\r\nleft: 0;\r\nwidth: 100%;\r\nheight: 5px;\r\nbackground-color: white;\r\n}\r\n.book_item.first:after {\r\ntop: initial;\r\nbottom: 10px;\r\n}\r\n.book_item.second:before, .book_item.second:after, .book_item.fifth:before, .book_item.fifth:after {\r\nbox-sizing: border-box;\r\ncontent: '';\r\nposition: absolute;\r\ntop: 10px;\r\nleft: 0;\r\nwidth: 100%;\r\nheight: 17.5px;\r\nborder-top: 5px solid white;\r\nborder-bottom: 5px solid white;\r\n}\r\n.book_item.second:after, .book_item.fifth:after {\r\ntop: initial;\r\nbottom: 10px;\r\n}\r\n.book_item.third:before, .book_item.third:after {\r\nbox-sizing: border-box;\r\ncontent: '';\r\nposition: absolute;\r\ntop: 10px;\r\nleft: 9px;\r\nwidth: 12px;\r\nheight: 12px;\r\nborder-radius: 50%;\r\nborder: 5px solid white;\r\n}\r\n.book_item.third:after {\r\ntop: initial;\r\nbottom: 10px;\r\n}\r\n.book_item.fourth {\r\ntop: -130px;\r\nheight: 130px;\r\n}\r\n.book_item.fourth:before {\r\nbox-sizing: border-box;\r\ncontent: '';\r\nposition: absolute;\r\ntop: 46px;\r\nleft: 0;\r\nwidth: 100%;\r\nheight: 17.5px;\r\nborder-top: 5px solid white;\r\nborder-bottom: 5px solid white;\r\n}\r\n.book_item.fifth {\r\ntop: -100px;\r\nheight: 100px;\r\n}\r\n.book_item.sixth {\r\ntop: -140px;\r\nheight: 140px;\r\n}\r\n.book_item.sixth:before {\r\nbox-sizing: border-box;\r\ncontent: '';\r\nposition: absolute;\r\nbottom: 31px;\r\nleft: 0px;\r\nwidth: 100%;\r\nheight: 5px;\r\nbackground-color: white;\r\n}\r\n.book_item.sixth:after {\r\nbox-sizing: border-box;\r\ncontent: '';\r\nposition: absolute;\r\nbottom: 10px;\r\nleft: 9px;\r\nwidth: 12px;\r\nheight: 12px;\r\nborder-radius: 50%;\r\nborder: 5px solid white;\r\n}\r\n.book_item:nth-child(2) {\r\n-webkit-animation-delay: 416.66667ms;\r\n  animation-delay: 416.66667ms;\r\n}\r\n.book_item:nth-child(3) {\r\n-webkit-animation-delay: 833.33333ms;\r\n  animation-delay: 833.33333ms;\r\n}\r\n.book_item:nth-child(4) {\r\n-webkit-animation-delay: 1250ms;\r\n  animation-delay: 1250ms;\r\n}\r\n.book_item:nth-child(5) {\r\n-webkit-animation-delay: 1666.66667ms;\r\n  animation-delay: 1666.66667ms;\r\n}\r\n.book_item:nth-child(6) {\r\n-webkit-animation-delay: 2083.33333ms;\r\n  animation-delay: 2083.33333ms;\r\n}\r\n\r\n.shelf {\r\nwidth: 300px;\r\nheight: 5px;\r\nmargin: 0 auto;\r\nbackground-color: white;\r\nposition: relative;\r\n}\r\n.shelf:before, .shelf:after {\r\ncontent: '';\r\nposition: absolute;\r\nwidth: 100%;\r\nheight: 100%;\r\nbackground: #1e6cc7;\r\nbackground-image: radial-gradient(rgba(255, 255, 255, 0.5) 30%, rgba(0, 0, 0, 0) 0%);\r\nbackground-size: 10px 10px;\r\nbackground-position: 0 -2.5px;\r\ntop: 200%;\r\nleft: 5%;\r\n-webkit-animation: move 250ms linear infinite;\r\n  animation: move 250ms linear infinite;\r\n}\r\n.shelf:after {\r\ntop: 400%;\r\nleft: 7.5%;\r\n}\r\n\r\n@-webkit-keyframes move {\r\nfrom {\r\nbackground-position-x: 0;\r\n}\r\nto {\r\nbackground-position-x: 10px;\r\n}\r\n}\r\n\r\n@keyframes move {\r\nfrom {\r\nbackground-position-x: 0;\r\n}\r\nto {\r\nbackground-position-x: 10px;\r\n}\r\n}\r\n@-webkit-keyframes travel {\r\n0% {\r\nopacity: 0;\r\n-webkit-transform: translateX(300px) rotateZ(0deg) scaleY(1);\r\n  transform: translateX(300px) rotateZ(0deg) scaleY(1);\r\n}\r\n6.5% {\r\n-webkit-transform: translateX(279.5px) rotateZ(0deg) scaleY(1.1);\r\n  transform: translateX(279.5px) rotateZ(0deg) scaleY(1.1);\r\n}\r\n8.8% {\r\n-webkit-transform: translateX(273.6px) rotateZ(0deg) scaleY(1);\r\n  transform: translateX(273.6px) rotateZ(0deg) scaleY(1);\r\n}\r\n10% {\r\nopacity: 1;\r\n-webkit-transform: translateX(270px) rotateZ(0deg);\r\n  transform: translateX(270px) rotateZ(0deg);\r\n}\r\n17.6% {\r\n-webkit-transform: translateX(247.2px) rotateZ(-30deg);\r\n  transform: translateX(247.2px) rotateZ(-30deg);\r\n}\r\n45% {\r\n-webkit-transform: translateX(165px) rotateZ(-30deg);\r\n  transform: translateX(165px) rotateZ(-30deg);\r\n}\r\n49.5% {\r\n-webkit-transform: translateX(151.5px) rotateZ(-45deg);\r\n  transform: translateX(151.5px) rotateZ(-45deg);\r\n}\r\n61.5% {\r\n-webkit-transform: translateX(115.5px) rotateZ(-45deg);\r\n  transform: translateX(115.5px) rotateZ(-45deg);\r\n}\r\n67% {\r\n-webkit-transform: translateX(99px) rotateZ(-60deg);\r\n  transform: translateX(99px) rotateZ(-60deg);\r\n}\r\n76% {\r\n-webkit-transform: translateX(72px) rotateZ(-60deg);\r\n  transform: translateX(72px) rotateZ(-60deg);\r\n}\r\n83.5% {\r\nopacity: 1;\r\n-webkit-transform: translateX(49.5px) rotateZ(-90deg);\r\n  transform: translateX(49.5px) rotateZ(-90deg);\r\n}\r\n90% {\r\nopacity: 0;\r\n}\r\n100% {\r\nopacity: 0;\r\n-webkit-transform: translateX(0px) rotateZ(-90deg);\r\n  transform: translateX(0px) rotateZ(-90deg);\r\n}\r\n}\r\n@keyframes travel {\r\n0% {\r\nopacity: 0;\r\n-webkit-transform: translateX(300px) rotateZ(0deg) scaleY(1);\r\n  transform: translateX(300px) rotateZ(0deg) scaleY(1);\r\n}\r\n6.5% {\r\n-webkit-transform: translateX(279.5px) rotateZ(0deg) scaleY(1.1);\r\n  transform: translateX(279.5px) rotateZ(0deg) scaleY(1.1);\r\n}\r\n8.8% {\r\n-webkit-transform: translateX(273.6px) rotateZ(0deg) scaleY(1);\r\n  transform: translateX(273.6px) rotateZ(0deg) scaleY(1);\r\n}\r\n10% {\r\nopacity: 1;\r\n-webkit-transform: translateX(270px) rotateZ(0deg);\r\n  transform: translateX(270px) rotateZ(0deg);\r\n}\r\n17.6% {\r\n-webkit-transform: translateX(247.2px) rotateZ(-30deg);\r\n  transform: translateX(247.2px) rotateZ(-30deg);\r\n}\r\n45% {\r\n-webkit-transform: translateX(165px) rotateZ(-30deg);\r\n  transform: translateX(165px) rotateZ(-30deg);\r\n}\r\n49.5% {\r\n-webkit-transform: translateX(151.5px) rotateZ(-45deg);\r\n  transform: translateX(151.5px) rotateZ(-45deg);\r\n}\r\n61.5% {\r\n-webkit-transform: translateX(115.5px) rotateZ(-45deg);\r\n  transform: translateX(115.5px) rotateZ(-45deg);\r\n}\r\n67% {\r\n-webkit-transform: translateX(99px) rotateZ(-60deg);\r\n  transform: translateX(99px) rotateZ(-60deg);\r\n}\r\n76% {\r\n-webkit-transform: translateX(72px) rotateZ(-60deg);\r\n  transform: translateX(72px) rotateZ(-60deg);\r\n}\r\n83.5% {\r\nopacity: 1;\r\n-webkit-transform: translateX(49.5px) rotateZ(-90deg);\r\n  transform: translateX(49.5px) rotateZ(-90deg);\r\n}\r\n90% {\r\nopacity: 0;\r\n}\r\n100% {\r\nopacity: 0;\r\n-webkit-transform: translateX(0px) rotateZ(-90deg);\r\n  transform: translateX(0px) rotateZ(-90deg);\r\n}\r\n}\r\n\r\n.text-load{\r\n  text-align: center;\r\n  font-size: 34px;\r\n  margin-top: 23px;\r\n  color: #1e6cc7;\r\n  margin-left: 99px;\r\n}\r\n/* end of loader ========================================================================== */\r\n\r\n\r\n/* navigation loader*/\r\n\r\n.loading-outer-overlay{\r\n  height: 100vh;\r\n  width: 100vw;\r\n  background: #08080887;\r\n  display: list-item;\r\n  position: fixed;\r\n  z-index: 1;\r\n}\r\n.loading-overlay{\r\n  position: absolute;\r\n  top: 50% !important;\r\n  left: 50% !important;\r\n  -webkit-transform: translate(-50%,-50%);\r\n  transform: translate(-50%,-50%);\r\n}\r\n.loader {\r\n  border: 16px solid #8e8576;\r\n  border-radius: 50%;\r\n  border-top: 16px solid blue;\r\n  border-right: 16px solid green;\r\n  border-bottom: 16px solid red;\r\n  width: 120px;\r\n  height: 120px;\r\n  -webkit-animation: spin 2s linear infinite;\r\n  animation: spin 2s linear infinite;\r\n}\r\n\r\n@-webkit-keyframes spin {\r\n  0% { -webkit-transform: rotate(0deg); }\r\n  100% { -webkit-transform: rotate(360deg); }\r\n}\r\n\r\n@keyframes spin {\r\n  0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\r\n  100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }\r\n}\r\n\r\n/* panel-css */\r\n.panel{\r\n  margin-right: 20px!important;\r\n  margin-left: 20px!important;\r\n}\r\n\r\n\r\n.add-plan .panel-heading{\r\n  color: white;\r\n  background-color: #cf3238;\r\n  border-color: #cf3238;\r\n  border-bottom: 3px solid black;\r\n}\r\n\r\n.add-plan .panel-footer{\r\n  background-color: #f5f5f500;\r\n  border-top: 1px solid  #c125bd;\r\n}\r\n\r\n.detail-plan .panel-heading{\r\n  color: white;\r\n  background-color: #293f53;\r\n  border-bottom: 3px solid #cf3238;\r\n}\r\n.btn-default:focus {\r\n  color: white;\r\n  background-color: #259be5;\r\n  border-color: #259be5;\r\n}\r\n.btn-empty{\r\n    border-radius: 50%;\r\n    width: 62px;\r\n    height: 62px;\r\n    color: #ffffff;\r\n    background-color: #259be5;\r\n    border-color: #1ea5e9;\r\n  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2), 0 13px 24px -11px rgba(233, 30, 99, 0.6)\r\n}\r\n\r\n.btn-empty:hover{\r\n  color:white;\r\n  background-color: #cf3238;\r\n}\r\n\r\n.btn:active:focus, .btn:focus {\r\n  outline: 0px auto -webkit-focus-ring-color;\r\n  outline-offset: 0px;\r\n}\r\n\r\n.btn:focus{\r\noutline: 0px auto -webkit-focus-ring-color;\r\noutline-offset: 0px;\r\n}\r\n\r\n\r\n.btn-green{\r\n  color: #293f53;\r\n  background-color: #fff;\r\n  border-color: #4cae4c;\r\n}\r\n\r\n.btn-green:hover{\r\n  color: white;\r\n  background-color: #4cae4c;\r\n  border-color: #4cae4c;\r\n}\r\n\r\n\r\n.btn-add{\r\n  background-color: #cf3238;\r\n  border-color: #cf3238;\r\n}\r\n\r\n.search input[type=text]{\r\n padding: 8px!important;\r\n}\r\n\r\n.search input[type=text]:focus {\r\n  border-color: #293f53;\r\n  box-shadow: 0 0 0 3px rgba(121,82,179,.25);\r\n}\r\n\r\n\r\n\r\n\r\n/* panel-css */", ""]);

// exports


/***/ }),

/***/ "../../../../css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../../../../style-loader/addStyles.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/styles.css");


/***/ })

},[2]);
//# sourceMappingURL=styles.bundle.js.map