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
exports.push([module.i, "/* You can add global styles to this file, and also import other style files */\n\n/* Variables */\n:root{\n  --color0        : #f2f3f8;\n  --color1        : #d6c7e8;\n  --color2        : rgb(248, 242, 255);\n  --color3        : #36a3f7;\n  --color4        : #716aca;\n  --color5        : #34bfa3;\n  --color5Text    : white;\n  --color4Text    : white;\n  --color3Text    : white;\n  --button-color1 : #3b548c;\n  --button-color2 : #F44336;\n  --button-color3 : #4CAF50;\n  --small-font    : 10px;\n  --medium-font   : 12px;\n  --large-font    : 14px;\n  --extralg-font  : 16px;\n}\n\n/* end of variables  */\nbody{\n  background: var(--color0);\n}\n.padding10{\n  padding:10px;\n}\n.margin-1{\n  margin:-1px;\n}\n.height-100{\n  min-height:100px;\n}\n.background-2{\n  background: var(--color2);\n  color: var(--color2Text);\n}\n.background-3{\n  background: var(--color3);\n  color: var(--color3Text);\n}\n.background-4{\n  background: var(--color4);\n  color: var(--color4Text);\n}\n.background-5{\n  background: var(--color5) !important;\n  color: var(--color5Text) !important;\n}\n.header-background{\n  background: var(--color1);\n}\n.body-background{\n  background: var(--color2);\n}\n/* FLexbox */\n.nopadding {\n  padding: 0px !important;\n}\n\n.d-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.innerFlex {\n  margin: -1px;\n}\n\n.border {\n  border: 1px solid var(--color1);\n}\n\n.p-2 {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding: 5px;\n}\n\n.p-3 {\n  -webkit-box-flex: 2;\n      -ms-flex: 2;\n          flex: 2;\n}\n\n.p-4 {\n  -webkit-box-flex: 3;\n      -ms-flex: 3;\n          flex: 3;\n}\np-5{\n  -webkit-box-flex: 4;\n      -ms-flex: 4;\n          flex: 4;\n}\np-6{\n  -webkit-box-flex: 5;\n      -ms-flex: 5;\n          flex: 5;\n}\np-7{\n  -webkit-box-flex: 6;\n      -ms-flex: 6;\n          flex: 6;\n}\np-8{\n  -webkit-box-flex: 7;\n      -ms-flex: 7;\n          flex: 7;\n}\np-9{\n  -webkit-box-flex: 8;\n      -ms-flex: 8;\n          flex: 8;\n}\n.p-3 span {\n  padding: 5px;\n}\n\n.w-50 {\n  width: 50% !important;\n}\n\n.w-75 {\n  width: 75% !important;\n}\n\n.flex-header {\n  padding: 10px !important;\n  font-size: var (--large-font);\n  background: var(--color1);\n  font-weight:bold;\n  text-align:center;\n}\n\nol,\nul {\n  margin-top: 0;\n  margin-bottom: 0px;\n}\n\n.initiative {\n  padding: 15px;\n}\n\n.btn-del,\n.btn-edit {\n  color: var(--button-color1);\n}\n\n.btn-del:hover {\n  color: var(--button-color2);\n}\n\n.btn-edit:hover {\n  color: var(--button-color3);\n}\n\n.border-left {\n  border-left: 1px solid var(--color1);\n  margin-left: -1px;\n}\n\n.border-right {\n  border-right: 1px solid var(--color1);\n}\n/* End of flexbox  ========================================================================== */\n\n\n\n/* Loader */\nbody{\npadding-top: 55px;\n}\n.ctooltip {\nposition: relative;\ndisplay: inline-block;\n}\n\n.ctooltip .ctooltiptext {\nvisibility: hidden;\nwidth: 120px;\nbackground-color: #616161;\ncolor: #fff;\ntext-align: center;\nborder-radius: 6px;\npadding: 5px 0;\nposition: absolute;\nz-index: 1;\nmargin: -60px 0px 0px -100px;\n}\n\n.tooltip-width{\nwidth:150px !important;\n}   \n\n.ctooltip:hover .ctooltiptext {\nvisibility: visible;\n}\n\n/*loader css  */\n.bookshelf_wrapper {\nposition: relative;\ntop: 60%;\nleft: 50%;\n-webkit-transform: translate(-50%, -50%);\ntransform: translate(-50%, -50%);\nmargin-top: 19%;\n}\n\n.books_list {\nmargin: 0 auto;\nwidth: 300px;\npadding: 0;\n}\n\n.book_item {\nposition: absolute;\ntop: -120px;\nbox-sizing: border-box;\nlist-style: none;\nwidth: 40px;\nheight: 120px;\nopacity: 0;\nbackground-color: #1e6cc7;\nborder: 5px solid white;\n-webkit-transform-origin: bottom left;\n  transform-origin: bottom left;\n-webkit-transform: translateX(300px);\n  transform: translateX(300px);\n-webkit-animation: travel 2500ms linear infinite;\n  animation: travel 2500ms linear infinite;\n}\n.book_item.first {\ntop: -140px;\nheight: 140px;\n}\n.book_item.first:before, .book_item.first:after {\ncontent: '';\nposition: absolute;\ntop: 10px;\nleft: 0;\nwidth: 100%;\nheight: 5px;\nbackground-color: white;\n}\n.book_item.first:after {\ntop: initial;\nbottom: 10px;\n}\n.book_item.second:before, .book_item.second:after, .book_item.fifth:before, .book_item.fifth:after {\nbox-sizing: border-box;\ncontent: '';\nposition: absolute;\ntop: 10px;\nleft: 0;\nwidth: 100%;\nheight: 17.5px;\nborder-top: 5px solid white;\nborder-bottom: 5px solid white;\n}\n.book_item.second:after, .book_item.fifth:after {\ntop: initial;\nbottom: 10px;\n}\n.book_item.third:before, .book_item.third:after {\nbox-sizing: border-box;\ncontent: '';\nposition: absolute;\ntop: 10px;\nleft: 9px;\nwidth: 12px;\nheight: 12px;\nborder-radius: 50%;\nborder: 5px solid white;\n}\n.book_item.third:after {\ntop: initial;\nbottom: 10px;\n}\n.book_item.fourth {\ntop: -130px;\nheight: 130px;\n}\n.book_item.fourth:before {\nbox-sizing: border-box;\ncontent: '';\nposition: absolute;\ntop: 46px;\nleft: 0;\nwidth: 100%;\nheight: 17.5px;\nborder-top: 5px solid white;\nborder-bottom: 5px solid white;\n}\n.book_item.fifth {\ntop: -100px;\nheight: 100px;\n}\n.book_item.sixth {\ntop: -140px;\nheight: 140px;\n}\n.book_item.sixth:before {\nbox-sizing: border-box;\ncontent: '';\nposition: absolute;\nbottom: 31px;\nleft: 0px;\nwidth: 100%;\nheight: 5px;\nbackground-color: white;\n}\n.book_item.sixth:after {\nbox-sizing: border-box;\ncontent: '';\nposition: absolute;\nbottom: 10px;\nleft: 9px;\nwidth: 12px;\nheight: 12px;\nborder-radius: 50%;\nborder: 5px solid white;\n}\n.book_item:nth-child(2) {\n-webkit-animation-delay: 416.66667ms;\n  animation-delay: 416.66667ms;\n}\n.book_item:nth-child(3) {\n-webkit-animation-delay: 833.33333ms;\n  animation-delay: 833.33333ms;\n}\n.book_item:nth-child(4) {\n-webkit-animation-delay: 1250ms;\n  animation-delay: 1250ms;\n}\n.book_item:nth-child(5) {\n-webkit-animation-delay: 1666.66667ms;\n  animation-delay: 1666.66667ms;\n}\n.book_item:nth-child(6) {\n-webkit-animation-delay: 2083.33333ms;\n  animation-delay: 2083.33333ms;\n}\n\n.shelf {\nwidth: 300px;\nheight: 5px;\nmargin: 0 auto;\nbackground-color: white;\nposition: relative;\n}\n.shelf:before, .shelf:after {\ncontent: '';\nposition: absolute;\nwidth: 100%;\nheight: 100%;\nbackground: #1e6cc7;\nbackground-image: radial-gradient(rgba(255, 255, 255, 0.5) 30%, rgba(0, 0, 0, 0) 0%);\nbackground-size: 10px 10px;\nbackground-position: 0 -2.5px;\ntop: 200%;\nleft: 5%;\n-webkit-animation: move 250ms linear infinite;\n  animation: move 250ms linear infinite;\n}\n.shelf:after {\ntop: 400%;\nleft: 7.5%;\n}\n\n@-webkit-keyframes move {\nfrom {\nbackground-position-x: 0;\n}\nto {\nbackground-position-x: 10px;\n}\n}\n\n@keyframes move {\nfrom {\nbackground-position-x: 0;\n}\nto {\nbackground-position-x: 10px;\n}\n}\n@-webkit-keyframes travel {\n0% {\nopacity: 0;\n-webkit-transform: translateX(300px) rotateZ(0deg) scaleY(1);\n  transform: translateX(300px) rotateZ(0deg) scaleY(1);\n}\n6.5% {\n-webkit-transform: translateX(279.5px) rotateZ(0deg) scaleY(1.1);\n  transform: translateX(279.5px) rotateZ(0deg) scaleY(1.1);\n}\n8.8% {\n-webkit-transform: translateX(273.6px) rotateZ(0deg) scaleY(1);\n  transform: translateX(273.6px) rotateZ(0deg) scaleY(1);\n}\n10% {\nopacity: 1;\n-webkit-transform: translateX(270px) rotateZ(0deg);\n  transform: translateX(270px) rotateZ(0deg);\n}\n17.6% {\n-webkit-transform: translateX(247.2px) rotateZ(-30deg);\n  transform: translateX(247.2px) rotateZ(-30deg);\n}\n45% {\n-webkit-transform: translateX(165px) rotateZ(-30deg);\n  transform: translateX(165px) rotateZ(-30deg);\n}\n49.5% {\n-webkit-transform: translateX(151.5px) rotateZ(-45deg);\n  transform: translateX(151.5px) rotateZ(-45deg);\n}\n61.5% {\n-webkit-transform: translateX(115.5px) rotateZ(-45deg);\n  transform: translateX(115.5px) rotateZ(-45deg);\n}\n67% {\n-webkit-transform: translateX(99px) rotateZ(-60deg);\n  transform: translateX(99px) rotateZ(-60deg);\n}\n76% {\n-webkit-transform: translateX(72px) rotateZ(-60deg);\n  transform: translateX(72px) rotateZ(-60deg);\n}\n83.5% {\nopacity: 1;\n-webkit-transform: translateX(49.5px) rotateZ(-90deg);\n  transform: translateX(49.5px) rotateZ(-90deg);\n}\n90% {\nopacity: 0;\n}\n100% {\nopacity: 0;\n-webkit-transform: translateX(0px) rotateZ(-90deg);\n  transform: translateX(0px) rotateZ(-90deg);\n}\n}\n@keyframes travel {\n0% {\nopacity: 0;\n-webkit-transform: translateX(300px) rotateZ(0deg) scaleY(1);\n  transform: translateX(300px) rotateZ(0deg) scaleY(1);\n}\n6.5% {\n-webkit-transform: translateX(279.5px) rotateZ(0deg) scaleY(1.1);\n  transform: translateX(279.5px) rotateZ(0deg) scaleY(1.1);\n}\n8.8% {\n-webkit-transform: translateX(273.6px) rotateZ(0deg) scaleY(1);\n  transform: translateX(273.6px) rotateZ(0deg) scaleY(1);\n}\n10% {\nopacity: 1;\n-webkit-transform: translateX(270px) rotateZ(0deg);\n  transform: translateX(270px) rotateZ(0deg);\n}\n17.6% {\n-webkit-transform: translateX(247.2px) rotateZ(-30deg);\n  transform: translateX(247.2px) rotateZ(-30deg);\n}\n45% {\n-webkit-transform: translateX(165px) rotateZ(-30deg);\n  transform: translateX(165px) rotateZ(-30deg);\n}\n49.5% {\n-webkit-transform: translateX(151.5px) rotateZ(-45deg);\n  transform: translateX(151.5px) rotateZ(-45deg);\n}\n61.5% {\n-webkit-transform: translateX(115.5px) rotateZ(-45deg);\n  transform: translateX(115.5px) rotateZ(-45deg);\n}\n67% {\n-webkit-transform: translateX(99px) rotateZ(-60deg);\n  transform: translateX(99px) rotateZ(-60deg);\n}\n76% {\n-webkit-transform: translateX(72px) rotateZ(-60deg);\n  transform: translateX(72px) rotateZ(-60deg);\n}\n83.5% {\nopacity: 1;\n-webkit-transform: translateX(49.5px) rotateZ(-90deg);\n  transform: translateX(49.5px) rotateZ(-90deg);\n}\n90% {\nopacity: 0;\n}\n100% {\nopacity: 0;\n-webkit-transform: translateX(0px) rotateZ(-90deg);\n  transform: translateX(0px) rotateZ(-90deg);\n}\n}\n\n.text-load{\n  text-align: center;\n  font-size: 34px;\n  margin-top: 23px;\n  color: #1e6cc7;\n  margin-left: 99px;\n}\n/* end of loader ========================================================================== */\n\n\n/* navigation loader*/\n\n.loading-outer-overlay{\n  height: 100vh;\n  width: 100vw;\n  background: #08080887;\n  display: list-item;\n  position: fixed;\n  z-index: 1;\n}\n.loading-overlay{\n  position: absolute;\n  top: 50% !important;\n  left: 50% !important;\n  -webkit-transform: translate(-50%,-50%);\n  transform: translate(-50%,-50%);\n}\n.loader {\n  border: 16px solid #8e8576;\n  border-radius: 50%;\n  border-top: 16px solid blue;\n  border-right: 16px solid green;\n  border-bottom: 16px solid red;\n  width: 120px;\n  height: 120px;\n  -webkit-animation: spin 2s linear infinite;\n  animation: spin 2s linear infinite;\n}\n\n@-webkit-keyframes spin {\n  0% { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes spin {\n  0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }\n}\n", ""]);

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