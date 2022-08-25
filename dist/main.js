/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".css";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "todo-list:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		var createStylesheet = (chunkId, fullhref, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			document.head.appendChild(linkTag);
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// object to store loaded CSS chunks
/******/ 		var installedCssChunks = {
/******/ 			179: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.miniCss = (chunkId, promises) => {
/******/ 			var cssChunks = {"632":1};
/******/ 			if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 			else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 				promises.push(installedCssChunks[chunkId] = loadStylesheet(chunkId).then(() => {
/******/ 					installedCssChunks[chunkId] = 0;
/******/ 				}, (e) => {
/******/ 					delete installedCssChunks[chunkId];
/******/ 					throw e;
/******/ 				}));
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no hmr
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			179: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./assets/js/refactor/utils-refactor.js


// todo.day ISO
const CONST_GET_M = ['DDMMYYYY', 'YYYYMMDD', 'YYMMDD', 'DDMMMYY', 'DMMMMYYYY', 'DDMMYY', 'YYMMMDD', 'YYYYMMMDD', 'DDMMMYYYY', 'DDMMMMYYYY'];
const CONST_GET_D = ['MDYYYY', 'MDYY', 'MMDDYY', 'MMDDYYYY', 'MMMMDYYYY', 'MMMDDYYYY', 'MMMDDYY']
const CONST_WEEK_DAY_NAME = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const CONST_MONTH_31DAY = [1, 3, 5, 7, 8, 10, 12];
const CONST_MONTH_28DAY = 2;
const CONST_MONTH_30DAY = [4, 6, 9, 11];
const CONST_DAYS_OF_MONTHS = (/* unused pure expression or super */ null && ([0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])); // NOT leap year
// get time zone (date.getTimezoneOffset() / -60)

function formatDate(format, input = new Date) {
    let seperate1;
    let seperate2;
    const rgexD_M_Y1 = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    const rgexD_M_Y2 = /^([0-2][0-9]|(3)[0-1])(.)(((0)[0-9])|((1)[0-2]))(.)\d{4}$/i;
    const rgexD_M_Y3 = /^([0-2][0-9]|(3)[0-1])(,)(((0)[0-9])|((1)[0-2]))(,)\d{4}$/i;
    const rgexD_M_Y4 = /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/i;

    if (rgexD_M_Y1.test(input) || rgexD_M_Y2.test(input) || rgexD_M_Y3.test(input) || rgexD_M_Y4.test(input)) {
        if (input.includes('/'))
            input = input.split('/').reverse().join('-');

        else if (input.includes(','))
            input = input.split(',').reverse().join('-');

        else if (input.includes('.'))
            input = input.split('.').reverse().join('-');

        else if (input.includes('-'))
            input = input.split('-').reverse().join('-');

        else if (input.includes(' '))
            input = input.split(' ').reverse().join('-');
    }
    else {
        if (input.includes('/'))
            input = input.split('/').join('-');

        else if (input.includes(','))
            input = input.split(',').join('-');

        else if (input.includes('.'))
            input = input.split('.').join('-');

        else if (input.includes('-'))
            input = input.split('-').join('-');

        else if (input.includes(' '))
            input = input.split(' ').join('-');
    }

    let index;
    let formatD = '';
    let formatM = '';
    let formatY = '';

    let resultD = '';
    let resultM = '';
    let resultY = '';

    let numD;
    let numM;
    let numY;

    let arr1 = format.split('').map(item => {
        return item.toUpperCase();
    });

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === 'D') {
            numD = i;
            formatD += arr1[i];
        } else if (arr1[i] === 'M') {
            numM = i;
            formatM += arr1[i];
        } else if (arr1[i] === 'Y') {
            numY = i;
            formatY += arr1[i];
        }
    } // for

    format = arr1.filter(item => {
        return item !== '/' && item !== '.' && item !== ',' && item !== '-' && item !== ' ';
    }).join('').toUpperCase();

    const mLength = CONST_GET_M.length;
    const dLength = CONST_GET_D.length;

    for (let i = 0; i < mLength; i++) {
        if (format === CONST_GET_M[i])
            index = arr1.indexOf('M');
    }
    for (let i = 0; i < dLength; i++) {
        if (format === CONST_GET_D[i])
            index = arr1.indexOf('D');
    }

    const arr2 = arr1.slice(index);

    arr1 = arr1.splice(0, index);

    seperate1 = arr1.filter(item => {
        return item === '/' || item === '.' || item === ',' || item === '-' || item === ' ';
    }).join('');

    seperate2 = arr2.filter(item => {
        return item === ' ' || item === '-' || item === '/' || item === ',' || item === '.';
    }).join('');

    const time = new Date(input);
    const yearLong = time.getFullYear();
    const yearShort = yearLong.toString().slice(2);
    const month = time.getMonth() + 1;
    const monthString = month.toString().padStart(2, 0);
    const date = time.getDate();
    const dateString = date.toString().padStart(2, 0);
    const nameMonthShort = time.toLocaleDateString('en-US', { month: 'short' });
    const nameMonthLong = time.toLocaleDateString('en-US', { month: 'long' });

    if (formatD === 'D') {
        resultD = date;
    } else if (formatD === 'DD') {
        resultD = dateString;
    } else if (formatD === 'DDD') {

    } else if (formatD === 'DDDD') {

    }

    if (formatM === 'M') {
        resultM = month;
    } else if (formatM === 'MM') {
        resultM = monthString;
    } else if (formatM === 'MMM') {
        resultM = nameMonthShort;
    } else if (formatM === 'MMMM') {
        resultM = nameMonthLong;
    }

    if (formatY === 'YY') {
        resultY = yearShort;
    } else if (formatY === 'YYYY') {
        resultY = yearLong;
    }

    if (numD < numM && numD < numY)
        return `${resultD}${seperate1}${resultM}${seperate2}${resultY}`;

    else if (numD > numM && numD > numY)
        return `${resultY}${seperate1}${resultM}${seperate2}${resultD}`;

    else if (numM < numD && numM < numY)
        return `${resultM}${seperate1}${resultD}${seperate2}${resultY}`;

    // part/ portion
} // formatDate

function getWeekdayName(input = new Date) {
    const time = new Date(input);
    const day = time.getDay();

    return CONST_WEEK_DAY_NAME[day];
} // getWeekdayName

function checkEnvironment() {
    const { userAgent } = navigator;
    const userAgentUppercased = userAgent.toUpperCase();

    // OS 
    let os = 'Other';
    if (userAgentUppercased.indexOf("WIN") != -1)
        os = "Windows";
    else if (userAgentUppercased.indexOf("MAC") != -1)
        os = "Mac";
    else if (userAgentUppercased.indexOf("ANDROID") != -1)
        os = "Android";
    else if (userAgentUppercased.indexOf("LIKE MAC") != -1)
        os = "iOS";
    else if (userAgentUppercased.indexOf("LINUX") != -1)
        os = "Linux";
    else os;
    // Browser
    let browser = 'Other'; // opera // coc coc
    if (userAgentUppercased.includes('FIREFOX/'))
        browser = 'Firefox';
    else if (userAgentUppercased.includes('EDG/'))
        browser = 'Edg';
    else if (userAgentUppercased.includes('CHROME/'))
        browser = 'Chrome';
    else if (userAgentUppercased.includes('SAFARI/'))
        browser = 'Safari';
    else browser;

    return {
        os,
        browser
    }
} // checkEnvironment

function getCurrentTime_ISOformat() {
    const newTime = new Date();
    const minutes = newTime.getMinutes();
    const hours = newTime.getHours();
    const date = newTime.getDate();
    const month = newTime.getMonth() + 1;
    const year = newTime.getFullYear();
    const second = newTime.getSeconds();
    const help = item => item.toString().padStart(2, '0');

    return `${help(year)}-${help(month)}-${date}T${help(hours)}:${help(minutes)}:${help(second)}`;
} // getCurrentTime_ISOformat

// getDateParts
function getDateParts(input = new Date()) {
    const newTime = new Date(input);
    const day = newTime.getDate();
    const month = newTime.getMonth() + 1;
    const year = newTime.getFullYear();

    return {
        year,
        month,
        day
    }

} // getDateParts

function getTotalDaysDifferent(fromDate, toDate) {
    const secondsInADay = 24 * 60 * 60;
    const stampOfToday = (new Date(formatDate('YYYY-MM-DD', fromDate))).getTime();
    const stampOfInput = (new Date(formatDate('YYYY-MM-DD', toDate))).getTime();
    const deltaInSeconds = (stampOfInput - stampOfToday) / 1000;

    return Math.ceil(deltaInSeconds / secondsInADay);
} // getTotalDaysDifferent


// getDeadline = getDateDifferent(input)
// moment, date-fns

function foo(date1, date2) {
    const { year: y1, month: m1, day: d1 } = date1;
    const { year: y2, month: m2, day: d2 } = date2;

    const diffTeller = (part, diff) => (
        diff > 1 ?
            `${diff}${part}s` :
            diff === 1 ?
                `${diff}${part}` :
                ''
    ) // diffTeller

    let diffY = y2 - y1;
    let diffM = m2 - m1;
    let diffD = d2 - d1;

    if (m2 < m1 || d2 < d1) {
        diffY = Math.max(0, diffy - 1);
        diffM = m2 + 12 - m1;
    } // if

    return `${diffTeller('year', diffY)} ${diffTeller('month', diffM)} ${diffTeller('day', diffD)}`;
}

function getDateDifferent(input) {
    // { age, name } = user; // obj destructor
    // arr = [1, 2, 3, 4, 5, 6]
    // const [a, b, c] = arr; // arr destructor
    // a = arr[0]
    // b = arr[1]
    // c= arr[2]
    // a = 1, b = 2

    const { day: inputD, month: inputM, year: inputY } = getDateParts(formatDate('YYYY-MM-DD', input));
    const { day: todayD, month: todayM, year: todayY } = getDateParts(); // property alias

    // totalDaysDifferent
    let diffYears;
    let diffMonths;
    let diffDays;

    //#region count year, month, day.
    diffYears = (inputY - todayY);

    if (inputM >= todayM)
        diffMonths = inputM - todayM;
    else {
        diffMonths = 12 + inputM - todayM;
        diffYears -= 1;
    }

    diffDays = inputD - todayD;

    if (inputD - todayD < 0 && inputM == todayM) {
        diffYears -= 1;
        diffMonths += 11;

        CONST_MONTH_31DAY.forEach(item => {

            if (inputM == item)
                diffDays += 31;

            else if (inputM == CONST_MONTH_28DAY) {
                diffDays += 28;
            }
        }); // forEach

        CONST_MONTH_30DAY.forEach(item => {
            if (inputM == item) {
                diffDays += 30;
            }
        }); //forEach

    } else if (inputD - todayD >= 0)
        diffDays = inputD - todayD;
    else {
        CONST_MONTH_31DAY.forEach(item => {
            if (todayM == item) {
                diffDays += 31;

                if (diffMonths <= 0) {
                    diffMonths += 11;
                    diffYears -= 1;
                } else
                    diffMonths -= 1;

            } else if (todayM == CONST_MONTH_28DAY) {
                diffDays += 28;
                diffMonths -= 1;
            }
        }); // forEach
        CONST_MONTH_30DAY.forEach(item => {
            if (todayM == item) {
                diffDays += 30;
                diffMonths -= 1;
            }
        }); //forEach
    } // else 
    // #endregion count year, month, day.

    const diffDaysTotal = getTotalDaysDifferent(getCurrentTime_ISOformat(), `${inputY}-${inputM}-${inputD}`);

    const text =
        diffDaysTotal == -1 ?
            'Yesterday' :
            diffDaysTotal == 0 ?
                '' :
                diffDaysTotal == 1 ?
                    'Tomorrow' :
                    diffDaysTotal <= 6 ?
                        `${diffDaysTotal} day` :
                        diffDaysTotal == 7 ?
                            `Next ${getWeekdayName()}` :
                            `${diffYears <= 0 ? '' : `${diffYears} year`} ${diffMonths <= 0 ? '' : `${diffMonths} month`} ${diffDays <= 0 ? '' : `${diffDays} day`}`

    return {
        totalDays: diffDaysTotal,
        text
    }
} // getDeadline 

function moveItem(arr, fromIndex, toIndex) {
    const item = arr.at(fromIndex);

    // remove item from current location
    arr.splice(fromIndex, 1);
    // insert toIndex
    arr.splice(toIndex, 0, item);

    return arr;
} // moveItem


// function getDateDifferent(date1, date2 = new Date) {
//     return {
//         diffDayTotals: 400,
//         diffYears: 1,
//         diffMonths: 2,
//         diffDays: 0,
//     }
// }

;// CONCATENATED MODULE: ./assets/js/refactor/main-refactor.js


__webpack_require__.e(/* import() */ 632).then(__webpack_require__.bind(__webpack_require__, 632))

// console.log(window.matchMedia('(max-width: 500px)').matches)

//#region app node 
const app = document.querySelector('app');
const formAddNote = app.querySelector('add-note');
const formInputNote = app.querySelector('.input-note');
const formBtnAddNote = app.querySelector('.btn-add');
const listPin = app.querySelector('list-pin');
const listNote = app.querySelector('list-note');
//#endregion app node 

//#region Secondary indicator
const indicator1 = app.querySelector('#indicator1');
const indicator2 = app.querySelector('#indicator2');
//#endregion Secondary indicator

//#region anvanced edit node
const overlay = document.querySelector('overlay');
const detailsEditHeader = overlay.querySelector('header');
const detailsEditPinIcon = overlay.querySelector('.icon-pin');
const detailsEditText = overlay.querySelector('content');
const detailsTimeDeadline = overlay.querySelector('deadline');
const detailsTimeCreate = overlay.querySelector('time-create');
const detailsInputDeadline = overlay.querySelector('.input-deadline');
const detailsInputColor = overlay.querySelector('.input-color');
const detailsTabColor = overlay.querySelector('tab');
const detailsBtnCancel = overlay.querySelector('.btn-cancel');
const detailsSubmitColor = overlay.querySelector('.btn-submit-color');
const detailsIconCopy = overlay.querySelector('.icon-copy');
const detailsIconRecycleBin = overlay.querySelector('.icon-recycle-bin');
const detailsEditClose = overlay.querySelector('close');
//#endregion anvanced edit node

const cloneElmDrag = document.querySelector('.item-drag');
const CONST_LS_KEY = 'TODO-LIST';
const CONST_TODO_STATUS = { // enumeration
    PENDING: 0,
    DOING: 1,
    COMPLETED: 2,
    CANCELED: -1,
}
const COLOR_DEFAULT = 'var(--app-color-1)';

//#endregion declare const

const appOOP = {
    //#region declare
    onEdit: false, // Flag

    // Data note 
    dataTodos: [],
    _data: [], // private property // accessed via GETTER / SETTER

    //#region DOM collection
    listNoteUnpin: [],
    listNotePin: [],
    itemMove: [],
    //#endregion DOM collection

    //#region from & to index note
    toIndex: 0,
    fromIndex: 0,
    //#endregion from & to index note

    //#region coordinate & size
    topUnpin: 0,
    topPin: 0,
    heightNote: 0,
    itemOffsetY: 0,
    mouseDownPageY: 0,
    //#endregion coordinate & size
    //#endregion declare

    //#region getter, setter
    get data() {
        return this._data
    }, // getter
    set data(value) {
        this._data = value;

        // do stuff
        this.sortData();
        this.render();
        this.handleEvents();
        this.localSet();
    }, // setter
    //#endregion getter, setter

    //#region localStorage
    localSet: function () {
        localStorage.setItem(CONST_LS_KEY, JSON.stringify(appOOP.dataTodos));
    }, // localSet

    localGet: function () {
        const cached = localStorage.getItem(CONST_LS_KEY);
        if (cached)
            return JSON.parse(cached);

        return [];
    }, // localGet
    // #endregion localStorage

    //#region helping func
    inputValueLength: function () {
        return formInputNote.value.length;
    }, // inputValueLength
    //#endregion Helping func

    //#region sort data
    sortData: function () {
        const arrPin = appOOP.dataTodos.filter(elm => {
            return elm.pin == true;
        });

        const arrUnpin = appOOP.dataTodos.filter(elm => {
            return elm.pin == false;
        });

        appOOP.dataTodos = arrPin.concat(arrUnpin);
    }, // sortData

    sortDataDeadline: function () {
        let time = getDateParts();
        time = [
            time.day.toString().padStart(2, 0),
            time.month.toString().padStart(2, 0),
            time.year
        ];
        const todayTxt = time.reverse().toString().replace(/,/g, '-');

        function compareDate(a, b) {
            const deadlineProcessedA = a.deadline.split('-').reverse().join('-');
            const deadlineProcessedB = b.deadline.split('-').reverse().join('-');

            return (
                deadlineProcessedA < deadlineProcessedB ?
                    -1 :
                    deadlineProcessedA > deadlineProcessedB ?
                        1 :
                        0
            );
        } // compare

        let expiredTodos = [], notExpiredTodos = [];
        appOOP.dataTodos.forEach(item => {
            const deadlineProcessed = item.deadline.split('-').reverse();

            if (item.deadline == '' || deadlineProcessed.join('-') >= todayTxt) notExpiredTodos.push(item);
            else expiredTodos.push(item);
        }); // forEach

        const expiredTodosSorted = expiredTodos.sort(compareDate);
        appOOP.dataTodos = [...expiredTodosSorted, ...notExpiredTodos];
        appOOP.data = [...appOOP.dataTodos];
    }, // sortDataDeadline
    //#endregion sort data

    //#region render
    render: function () {
        const dataPin = this.dataTodos.filter(item => item.pin);
        const dataPinLength = dataPin.length;
        const dataUnPin = this.dataTodos.slice(dataPinLength);
        const htmlsTodos = dataUnPin.map((item) => {
            return `   
                <li style="border-color: ${item.color};" class="item-note ${item.status == 2 ? 'strikethrough' : ''}" data-index="${item.id}" >
                    <up-down draggable="true">
                        <i class="icon-drag fa-solid fa-grip-vertical"></i>
                    </up-down>
                    <input class="checkbox-hide" type="checkbox" ${item.status == 2 ? 'checked' : ''}>
                    <span style="border-color: ${item.color};" class="checkbox-complete"></span>
                    <span ${getTotalDaysDifferent(getCurrentTime_ISOformat(), item.date) < 0 ? 'style="color:red;"' : ''} class="item-text">${item.text}</span>
                    <button class="btn-delete">x</button>
                    <i class="icon-save"></i>
                    <i id="icon-details" class="fa-solid fa-expand"></i>
                    <div class="indicator-drag"></div>
                </li>
                    `;
        }).join('');

        if (dataPinLength > 0) {
            listPin.classList.remove('hide');
            const htmlPin = dataPin.map((item) => {
                return `
                    <li style="border-color: ${item.color};" class="item-note ${item.status == 2 ? 'strikethrough' : ''}" data-index="${item.id}" >
                        <up-down draggable="true">
                            <i class="icon-drag fa-solid fa-grip-vertical"></i>
                        </up-down>
                        <input class="checkbox-hide" type="checkbox" ${item.status == 2 ? 'checked' : ''}>
                        <span style="border-color: ${item.color};" class="checkbox-complete"></span>
                        <span  ${getTotalDaysDifferent(getCurrentTime_ISOformat(), item.date) < 0 ? 'style="color:red;"' : ''} class="item-text">${item.text}</span>
                        <button class="btn-delete">x</button>
                        <i class="icon-save"></i>
                        <i id="icon-details" class="fa-solid fa-expand"></i>
                        <div class="indicator-drag"></div>
                    </li>
                        `;
            }).join('');
            listPin.innerHTML = `
                <h3 class="title-pin">List Pin Note</h3>
            ${htmlPin}
            `;
        } else
            listPin.classList.add('hide');

        listNote.innerHTML = htmlsTodos;
    }, // render

    renderDetails: function (e) {
        const outerId = e.target.parentNode.dataset.index;
        const todo = appOOP.dataTodos.find(entry => entry.id === outerId);

        const htmlContent = `
                <li class="item-note bla ${todo.status == 2 ? 'strikethrough2' : ''}" data-index="${outerId}" >
                    <input class="checkbox-hide" type="checkbox" onclick="appOOP.strikethroughItem(appOOP)" ${todo.status == 2 ? 'checked' : ''}>
                    <span style="border-color: ${todo.color};" class="checkbox-complete"></span>
                    <span contenteditable="true" ${getTotalDaysDifferent(getCurrentTime_ISOformat(), todo.date) < 0 ? 'style="color:red;"' : ''} class="item-text">${todo.text}</span>
                    <i class="show icon-save" id="icon-save-inner" onclick="appOOP.submitText(appOOP)"></i>
                </li>
                `;
        detailsTimeCreate.innerText = todo.date;
        detailsTimeDeadline.innerText = todo.deadline == '' ? '' : getDateDifferent(todo.deadline).text;

        detailsEditText.innerHTML = htmlContent;
    }, // renderDetails
    //#endregion render

    //#region add/edit/delete note
    createNote: function () {
        const id = `${Date.now()}`;
        let item, itemText, checkboxHide, checkboxShow, btnDelete, iconSave, fullIcon, upDown, dragIcon, indicatorDrag;

        // Create item
        item = document.createElement("li");
        indicatorDrag = document.createElement("div");
        fullIcon = document.createElement("i");
        itemText = document.createElement("span");
        checkboxHide = document.createElement("input");
        checkboxShow = document.createElement("span");
        btnDelete = document.createElement("button");
        iconSave = document.createElement('i');
        upDown = document.createElement('up-down');
        dragIcon = document.createElement('i');
        dragIcon.setAttribute('class', 'icon-drag fa-solid fa-grip-vertical');
        upDown.appendChild(dragIcon);

        // Add attribute
        item.className = 'item-note';
        indicatorDrag.className = 'indicator-drag';
        fullIcon.className = 'fa-solid fa-expand';
        itemText.className = 'item-text';
        btnDelete.className = 'btn-delete';
        checkboxHide.className = 'checkbox-hide';
        checkboxShow.className = 'checkbox-complete';
        iconSave.className = 'icon-save';
        item.setAttribute("draggable", "true");
        checkboxHide.setAttribute("type", "checkbox");
        item.setAttribute("data-index", id);
        fullIcon.setAttribute('id', 'icon-details');

        // Add text
        itemText.innerText = formInputNote.value;
        btnDelete.appendChild(document.createTextNode("x"));

        // Assign element to item
        item.appendChild(checkboxHide);
        item.appendChild(checkboxShow);
        item.appendChild(fullIcon);
        item.appendChild(indicatorDrag);
        item.appendChild(upDown);
        item.appendChild(itemText);
        item.appendChild(btnDelete);
        item.appendChild(iconSave);
        listNote.appendChild(item);

        formInputNote.value = "";
        upDown.ontouchstart = (e) => appOOP.todo = appOOP.getElmWhenMouseDown(e);
        upDown.ontouchmove = (e) => {
            e.preventDefault();
            appOOP.useDisplayIndicator(e, 'MOBILE');
        }
        upDown.ontouchend = (e) => appOOP.dropElm(e);
        item.ondragstart = (e) => appOOP.todo = appOOP.getElmWhenMouseDown(e);
        item.ondragenter = (e) => appOOP.useDisplayIndicator(e, 'PC');
        item.ondragend = (e) => appOOP.dropElm(e);

        btnDelete.onclick = appOOP.deleteTodo;
        checkboxHide.onclick = (e) => appOOP.strikethroughItem(e.target);
        iconSave.onclick = (e) => appOOP.updateText(e.target);
        iconSave.onclick = appOOP.clickIconTick;
        itemText.onclick = appOOP.clickItem;
        fullIcon.onclick = appOOP.clickIconFull;

        appOOP.addTodo(id, itemText.innerText);
    }, // createNote

    statusOnEdit: function (boolean) {
        if (boolean) {
            appOOP.onEdit = true;
            formInputNote.setAttribute('disabled', true);
            formBtnAddNote.setAttribute('disabled', true);
        } else {
            appOOP.onEdit = false;
            formInputNote.removeAttribute('disabled');
            formBtnAddNote.removeAttribute('disabled');
        }
    }, // statusOnEdit

    addTodo: function (id, todoText) {
        appOOP.dataTodos.push({
            id,
            text: todoText,
            date: getCurrentTime_ISOformat(),
            pin: false,
            deadline: '',
            color: COLOR_DEFAULT,
            status: CONST_TODO_STATUS.DOING,
        });
        appOOP.localSet();
    }, // addTodo

    submitText: function (elm) {
        const ElmText = elm.parentNode.querySelector('.item-text');
        const newText = ElmText.textContent;
        const id = elm.parentNode.dataset.index;

        if (newText.trim().length < 1) {
            alert('Không được để note trống');
            return setTimeout(() => {
                ElmText.click(); // trigger
            }, 100);
        }

        appOOP.statusOnEdit(false);
        appOOP.updateTodo(id, 'text', newText);
        appOOP.data = [...appOOP.dataTodos];
    }, // submitText

    updateTodo: function (id, property, value) {
        appOOP.dataTodos = appOOP.dataTodos.map((item) => {
            if (item.id !== id)
                return item;
            else
                return {
                    ...item,
                    [property]: value
                } // return
        }); // map
    }, // updateTodo

    deleteTodo: function (e) {
        if (appOOP.onEdit)
            return;

        const listElement = e.target.parentNode;
        const id = listElement.dataset.index;
        listElement.parentNode.removeChild(listElement);

        if (listPin.children.length === 1)
            listPin.classList.add('hide');
        else
            listPin.classList.remove('hide');

        appOOP.dataTodos = appOOP.dataTodos.filter(item => item.id !== id);
        appOOP.localSet();
    }, // deleteTodo
    //#endregion add/edit/delete note

    //#region work with notes
    strikethroughItem: function (elm) {
        if (elm.hasAttribute('checked')) {
            elm.parentNode.classList.remove('strikethrough');
            elm.removeAttribute('checked');
        } else {
            elm.parentNode.classList.add('strikethrough');
            elm.setAttribute('checked', '');
        }
        appOOP.todoStatus(elm);
        appOOP.localSet();
    }, // strikethroughItem

    todoStatus: function (elm) {
        const id = elm.parentNode.dataset.index;
        const hasAtr = elm.parentNode.querySelector('.checkbox-hide').hasAttribute('checked');

        if (hasAtr)
            appOOP.updateTodo(id, 'status', CONST_TODO_STATUS.COMPLETED);
        else
            appOOP.updateTodo(id, 'status', CONST_TODO_STATUS.DOING);

        appOOP.submitText(elm);
        appOOP.localSet();
    }, // todoStatus

    focusNote: function (e) {
        const btnDelete = e.target.parentNode.querySelector('.btn-delete');
        const btnSave = e.target.parentNode.querySelector('.icon-save');
        const idOuter = e.target.parentNode.dataset.index;

        if (appOOP.onEdit)
            return;

        Array.from(listNote.children).forEach((item) => {
            const btnDelete = item.querySelector('.btn-delete');
            const tick = item.querySelector('.checkbox-complete');
            const idInner = item.dataset.index;
            const fullIcon = item.querySelector('#icon-details');
            const upDown = item.querySelector('up-down');

            if (idInner !== idOuter) {
                tick.classList.add('lock-checkbox');
                btnDelete.classList.add('hide');
                fullIcon.classList.add('hide');
                upDown.classList.add('hide');
            }
        });

        appOOP.statusOnEdit(true);

        e.target.setAttribute('contenteditable', true);

        setTimeout(() => {
            e.target.focus();
        }, 50);

        e.target.parentNode.classList.add('focus-item');
        btnDelete.classList.add('hide');
        btnSave.classList.add('show');

    }, // clickItem

    clickIconSave: function (e) {
        const listElement = e.target.parentNode;
        const idOuter = e.target.parentNode.dataset.index;
        const btnDelete = listElement.querySelector('.btn-delete');
        const itemText = listElement.querySelector('.item-text');
        const iconSave = listElement.querySelector('.icon-save');

        itemText.removeAttribute('contenteditable');

        listElement.classList.remove('focus-item');
        btnDelete.classList.remove('hide');

        appOOP.submitText(e.target);
        iconSave.classList.remove('show');

        Array.from(listNote.children).forEach((item) => {
            const btnDelete = item.querySelector('.btn-delete');
            const checkboxShow = item.querySelector('.checkbox-complete');
            const fullIcon = item.querySelector('#icon-details');
            const idInner = item.dataset.index;

            if (idInner !== idOuter) {
                checkboxShow.classList.remove('lock-checkbox');
                btnDelete.classList.remove('hide');
                fullIcon.classList.remove('hide');
            }
        });

        appOOP.onEdit = false;
    }, // clickIconSave

    showDetails: function (e) {
        const note = e.target.parentNode;
        const id = note.dataset.index;

        appOOP.dataTodos.forEach(item => {
            if (item.id == id) {
                detailsEditHeader.style.background = `linear-gradient(to bottom, ${item.color},  white`;
                if (item.pin == true) {
                    detailsEditPinIcon.classList.add('pin-item');
                } else {
                    detailsEditPinIcon.classList.remove('pin-item');
                }
            }
        }); // forEach

        overlay.classList.remove('hide');
        appOOP.submitText(e.target);
        appOOP.renderDetails(e);
    }, // showDetails
    //#endregion work with notes

    //#region event drag drop
    getElmWhenMouseDown: function (e) {
        const item = e.target.closest('.item-note');
        const text = item.querySelector('.item-text').textContent;
        const id = item.dataset.index;
        const todo = appOOP.dataTodos.find(item => {
            return item.id === id;
        });

        const dragItem = document.querySelector('.item-drag');
        const dragText = dragItem.querySelector('.text-drag');
        const checkboxDrag = dragItem.querySelector('.checkbox-hide');
        const checkboxShowDrag = dragItem.querySelector('.checkbox-complete');

        app.querySelectorAll('.item-note').forEach(item => {
            if (item.dataset.index == id) {
                dragItem.style.borderColor = todo.color;
                checkboxShowDrag.style.borderColor = todo.color;
            }
        });

        dragText.innerText = text;
        if (todo.status == 2) {
            dragItem.classList.add('strikethrough');
            checkboxDrag.setAttribute('checked', '');
        }
        else {
            dragItem.classList.remove('strikethrough');
            checkboxDrag.removeAttribute('checked');
        }
        appOOP.fromIndex = appOOP.dataTodos.indexOf(todo);
        cloneElmDrag.classList.remove('hide');
        appOOP.mouseDownPageY = e.pageY || e.targetTouches[0].pageY;
        item.classList.add('blur');

        // get height last child list pin and list unpin
        const pinLastItem = Array.from(listPin.children).at(-1);
        const unpinFirstItem = Array.from(listNote.children)[0];

        if (listNote.childElementCount > 0) {
            appOOP.topUnpin = unpinFirstItem.getBoundingClientRect().y - item.offsetHeight + 5;
        }
        // indicator1 offsetHeight
        appOOP.heightNote = item.offsetHeight;
        appOOP.topPin = pinLastItem.getBoundingClientRect().y + 5;

        return todo;
    }, // getElmWhenMouseDown

    displayIndicator: function (e, index, device) {
        const item = e.target.closest('.item-note');
        const titlePin = app.querySelector('.title-pin');
        appOOP.listNotePin = Array.from(listPin.children);
        appOOP.listNotePin.shift();
        appOOP.listNoteUnpin = Array.from(listNote.children);
        const listAllNote = appOOP.listNotePin.concat(appOOP.listNoteUnpin);
        const computedAddNote = formAddNote.offsetHeight + Number(getComputedStyle(formAddNote).marginTop.replace('px', ''));
        const computedPin = listPin.offsetHeight + Number(getComputedStyle(listPin).marginTop.replace('px', '')) + Number(getComputedStyle(listPin).marginBottom.replace('px', ''));
        const computedTitlePin = titlePin.offsetHeight + Number(getComputedStyle(titlePin).marginTop.replace('px', '')) + Number(getComputedStyle(titlePin).marginBottom.replace('px', ''));
        const checkDeviceY = device == 'PC' ? e.pageY : e.targetTouches[0].pageY;
        const checkDeviceX = device == 'PC' ? e.pageX : e.targetTouches[0].pageX;

        if (listPin.className === 'hide') {
            indicator1.style.top = computedAddNote + 5;  // indicator1.offsetHeight 
        } else {
            indicator1.style.top = computedAddNote + computedPin - 5;
        }

        listAllNote.forEach(elm => {
            try {
                const nodeIndicatorDown = listAllNote[index];
                const nodeIndicatorUp = listAllNote[index - 1];
                if (checkDeviceY < appOOP.mouseDownPageY) {
                    elm.classList.remove('ondrag');
                    indicator1.style.display = 'none';

                    if (elm == nodeIndicatorUp && index !== listPin.childElementCount - 1)
                        elm.classList.add('ondrag');

                    else if (index == listPin.childElementCount - 1)
                        indicator1.style.display = 'block';

                    else if (index == 0 && listPin.className !== 'hide') {
                        indicator1.style.display = 'block';
                        indicator1.style.top = computedAddNote + computedTitlePin - 5;
                    }
                } else {
                    elm.classList.remove('ondrag');
                    indicator1.style.display = 'none';

                    if (elm == nodeIndicatorDown)
                        elm.classList.add('ondrag');
                }
            } catch { }

            if (appOOP.fromIndex < appOOP.listNotePin.length && index === appOOP.listNotePin.length && e.offsetY < appOOP.heightNote / 2) {
                elm.classList.remove('ondrag');
                indicator2.style.display = 'block';
                indicator2.style.top = appOOP.topUnpin + window.scrollY;
            }
            else if (item === appOOP.listNotePin.at(-1) && index === appOOP.listNotePin.length - 1 && e.offsetY > appOOP.heightNote / 2) {
                elm.classList.remove('ondrag');
                indicator2.style.display = 'block';
                indicator2.style.top = appOOP.topPin + window.scrollY;
                indicator1.style.display = 'none';
            } else {
                indicator2.style.display = 'none';
            }
        }); // forEach

        appOOP.itemMove = item;
        appOOP.itemOffsetY = e.offsetY;
        cloneElmDrag.style.top = checkDeviceY;
        cloneElmDrag.style.left = checkDeviceX;
    }, // indicatorDrag

    dropElm: function (e) {
        const item = e.target.closest('.item-note');
        const id = item.dataset.index;

        cloneElmDrag.classList.add('hide');
        item.classList.add('blur');
        indicator1.style.display = 'none';
        indicator2.style.display = 'none';

        if (appOOP.toIndex < listPin.childElementCount - 1) {
            appOOP.dataTodos = appOOP.dataTodos.map(elm => {
                if (elm.id !== id)
                    return elm;

                return {
                    ...elm,
                    pin: true
                }
            }) // map
        } else {
            appOOP.dataTodos = appOOP.dataTodos.map(elm => {
                if (elm.id !== id)
                    return elm;

                return {
                    ...elm,
                    pin: false
                }
            }) // map
        }
        let toIndex2;

        if (appOOP.fromIndex > appOOP.listNotePin.length - 1 && appOOP.itemMove === appOOP.listNotePin.at(-1) && appOOP.itemOffsetY > appOOP.heightNote / 2)
            toIndex2 = appOOP.fromIndex + 1;
        else if (appOOP.fromIndex <= appOOP.listNotePin.length && appOOP.itemMove === appOOP.listNoteUnpin.at(0) && appOOP.itemOffsetY < appOOP.heightNote / 2) {
            toIndex2 = appOOP.toIndex - 1;
        }
        else toIndex2 = appOOP.toIndex;

        if (toIndex2 === -1) {
            toIndex2 = 0;
        }

        moveItem(appOOP.dataTodos, appOOP.fromIndex, toIndex2);

        appOOP.data = [...appOOP.dataTodos];
    }, // dropElm

    useDisplayIndicator: function (e, device) {
        // PC
        if (device === 'PC') {
            const itemPC = e.target.closest('.item-note');
            const idPC = itemPC.dataset.index;
            const todoPC = appOOP.dataTodos.find(elm => {
                return elm.id === idPC;
            });

            const indexTodoPc = appOOP.dataTodos.indexOf(todoPC);

            appOOP.displayIndicator(e, indexTodoPc, 'PC');

            appOOP.toIndex = appOOP.dataTodos.indexOf(todoPC);
        } else {
            // Mobile
            const itemMb = document.elementFromPoint(e.targetTouches[0].pageX, e.targetTouches[0].pageY).closest('.item-note');
            const idMb = itemMb.dataset.index;
            const todoMb = appOOP.dataTodos.find(elm => {
                return elm.id === idMb;
            });

            const indexTodoMb = appOOP.dataTodos.indexOf(todoMb);
            appOOP.displayIndicator(e, indexTodoMb, 'MOBILE');
            appOOP.toIndex = appOOP.dataTodos.indexOf(todoMb);
        }
    }, // useDisplayIndicator
    //#endregion event drag drop

    handleEvents: function () {
        //#region event form add note
        formBtnAddNote.onclick = () => {
            const OS = checkEnvironment().os;

            if (appOOP.inputValueLength() > 0) {
                appOOP.createNote();
            }

            if (OS === 'Linux' || OS === 'Android' || OS === 'iOS') {
                app.querySelectorAll('up-down').forEach(item => {
                    item.innerHTML = '<i class="icon-up-down fa-solid fa-grip-vertical"></i>';
                });
            }
        } // btnAddNote.onclick

        formInputNote.onkeypress = function (e) {
            if (appOOP.inputValueLength() > 0 && e.charCode === 13) {
                appOOP.createNote();
            }
        } // enterKey
        //#endregion event form add note

        //#region event details
        detailsEditClose.onclick = () => {
            overlay.classList.add('hide');
        } // closeAnvanceEdit.

        detailsIconRecycleBin.onclick = (e) => {
            const id = e.target.closest('advanced-edit').querySelector('.item-note').dataset.index;

            appOOP.dataTodos = appOOP.dataTodos.filter((item) => item.id !== id);
            appOOP.localSet();

            overlay.classList.add('hide');

            Array.from(listNote.children).forEach((item) => {
                if (item.dataset.index === id) {
                    item.remove();
                }
            });
        } // iconRecycleBin

        detailsEditPinIcon.onclick = (e) => {
            const id = e.target.closest('advanced-edit').querySelector('.item-note').dataset.index;

            detailsEditPinIcon.classList.toggle('pin-item');

            appOOP.dataTodos = appOOP.dataTodos.map(todo => {
                if (todo.id !== id)
                    return todo;
                return {
                    ...todo,
                    pin: !todo.pin
                }
            }) // map

            appOOP.sortDataDeadline();
            appOOP.data = [...appOOP.dataTodos];
        } // iconPin

        detailsIconCopy.onclick = (e) => {
            const id = e.target.closest('advanced-edit').querySelector('.item-note').dataset.index;
            let todoCopy = appOOP.dataTodos.find(item => item.id === id);
            const dataCopyId = todoCopy.id;

            todoCopy = {
                ...todoCopy,
                id: `${Date.now()}`,
                date: getCurrentTime_ISOformat()
            }

            appOOP.dataTodos.push(todoCopy);

            overlay.classList.add('hide');

            appOOP.data = [...appOOP.dataTodos];
            Array.from(listNote.children).forEach((item) => {
                const textItem = item.querySelector('.item-text');

                if (dataCopyId == item.dataset.index) {
                    textItem.click();
                }
            });
            appOOP.sortData();
        } // iconCopy

        detailsInputColor.onclick = (e) => {
            e.stopPropagation();
            detailsTabColor.classList.add('show');
        } // inputColor

        detailsBtnCancel.onclick = () => {
            detailsTabColor.classList.remove('show');
        } // tabBtnCancel

        detailsSubmitColor.onclick = (e) => {
            const id = e.target.closest('advanced-edit').querySelector('.item-note').dataset.index;

            appOOP.updateTodo(id, 'color', detailsInputColor.value);

            app.querySelectorAll('.item-note').forEach(item => {
                if (item.dataset.index == id) {
                    item.querySelector('.checkbox-complete').style.borderColor = detailsInputColor.value;
                    item.style.borderColor = detailsInputColor.value;
                }
            });

            detailsEditHeader.style.background = `linear-gradient(to bottom, ${detailsInputColor.value}, white`;
            detailsTabColor.classList.remove('show');

            appOOP.localSet();
        } // tabBtnSubmitColor

        detailsInputDeadline.onchange = (e) => {
            const wrapper = e.target.closest('advanced-edit');
            const textItem = wrapper.querySelector('.item-text');
            const id = wrapper.querySelector('.item-note').dataset.index;
            const { totalDays, text } = getDateDifferent(detailsInputDeadline.value);

            detailsTimeDeadline.innerText = text;

            appOOP.updateTodo(id, 'deadline', detailsInputDeadline.value);

            if (getTotalDaysDifferent(getCurrentTime_ISOformat(), detailsInputDeadline.value) < 0) {
                textItem.style.color = 'red';

                Array.from(listNote.children).forEach(item => {
                    if (item.dataset.index == id) {
                        item.querySelector('.item-text').style.color = 'red';
                    }
                }); // Array.from
            } else {
                textItem.style.color = 'var(--color-black-1)';

                Array.from(listNote.children).forEach(item => {
                    if (item.dataset.index == id) {
                        item.querySelector('.item-text').style.color = 'var(--color-white-1)';
                    }
                }); // Array.from
            } // else

            if (totalDays < 0)
                appOOP.sortDataDeadline();

            appOOP.sortData();
            appOOP.localSet();
        } // inputDeadline

        overlay.onclick = () => {
            detailsTabColor.classList.remove('show');
        } // overlay
        //#endregion event details

        //#region event notes
        app.querySelectorAll('.item-note').forEach(item => {
            item.ondragstart = (e) => appOOP.getElmWhenMouseDown(e);
            item.ondragenter = (e) => appOOP.useDisplayIndicator(e, 'PC');
            item.ondragend = (e) => appOOP.dropElm(e);
        });

        app.querySelectorAll('up-down').forEach(item => {
            item.ontouchstart = (e) => {
                appOOP.getElmWhenMouseDown(e);
            };
            item.ontouchmove = (e) => {
                e.preventDefault();
                appOOP.useDisplayIndicator(e, 'MOBILE');
            }
            item.ontouchend = (e) => appOOP.dropElm(e);
        });

        app.querySelectorAll('.btn-delete').forEach(btn => {
            btn.onclick = (e) => appOOP.deleteTodo(e);
        });

        app.querySelectorAll('.checkbox-hide').forEach(checkbox => {
            checkbox.onclick = (e) => appOOP.strikethroughItem(e.target);
        });

        app.querySelectorAll('.item-text').forEach(text => {
            text.onclick = (e) => appOOP.focusNote(e);
        });

        app.querySelectorAll('.icon-save').forEach(icon => {
            icon.onclick = (e) => appOOP.clickIconSave(e);
        });

        app.querySelectorAll('#icon-details').forEach(icon => {
            icon.onclick = (e) => appOOP.showDetails(e);
        });
        //#endregion event notes
    }, // handleEvents

    start() {
        this.dataTodos = this.localGet();

        setTimeout(() => {
            this.render();
            this.handleEvents();
        }, 1_000); // wait for reading ls in 1 seconds
    }, // start
} // appOOP

appOOP.start();
/******/ })()
;