(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueGridLayout"] = factory(require("vue"));
	else
		root["VueGridLayout"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "07e3":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1156":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("ad20");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("c1ec597e", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "18d2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Resize detection strategy that injects objects to elements in order to detect resize events.
 * Heavily inspired by: http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
 */



var browserDetector = __webpack_require__("18e9");

module.exports = function(options) {
    options             = options || {};
    var reporter        = options.reporter;
    var batchProcessor  = options.batchProcessor;
    var getState        = options.stateHandler.getState;

    if(!reporter) {
        throw new Error("Missing required dependency: reporter.");
    }

    /**
     * Adds a resize event listener to the element.
     * @public
     * @param {element} element The element that should have the listener added.
     * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
     */
    function addListener(element, listener) {
        function listenerProxy() {
            listener(element);
        }

        if(browserDetector.isIE(8)) {
            //IE 8 does not support object, but supports the resize event directly on elements.
            getState(element).object = {
                proxy: listenerProxy
            };
            element.attachEvent("onresize", listenerProxy);
        } else {
            var object = getObject(element);

            if(!object) {
                throw new Error("Element is not detectable by this strategy.");
            }

            object.contentDocument.defaultView.addEventListener("resize", listenerProxy);
        }
    }

    function buildCssTextString(rules) {
        var seperator = options.important ? " !important; " : "; ";

        return (rules.join(seperator) + seperator).trim();
    }

    /**
     * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
     * @private
     * @param {object} options Optional options object.
     * @param {element} element The element to make detectable
     * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
     */
    function makeDetectable(options, element, callback) {
        if (!callback) {
            callback = element;
            element = options;
            options = null;
        }

        options = options || {};
        var debug = options.debug;

        function injectObject(element, callback) {
            var OBJECT_STYLE = buildCssTextString(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]);

            //The target element needs to be positioned (everything except static) so the absolute positioned object will be positioned relative to the target element.

            // Position altering may be performed directly or on object load, depending on if style resolution is possible directly or not.
            var positionCheckPerformed = false;

            // The element may not yet be attached to the DOM, and therefore the style object may be empty in some browsers.
            // Since the style object is a reference, it will be updated as soon as the element is attached to the DOM.
            var style = window.getComputedStyle(element);
            var width = element.offsetWidth;
            var height = element.offsetHeight;

            getState(element).startSize = {
                width: width,
                height: height
            };

            function mutateDom() {
                function alterPositionStyles() {
                    if(style.position === "static") {
                        element.style.setProperty("position", "relative", options.important ? "important" : "");

                        var removeRelativeStyles = function(reporter, element, style, property) {
                            function getNumericalValue(value) {
                                return value.replace(/[^-\d\.]/g, "");
                            }

                            var value = style[property];

                            if(value !== "auto" && getNumericalValue(value) !== "0") {
                                reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element);
                                element.style.setProperty(property, "0", options.important ? "important" : "");
                            }
                        };

                        //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
                        //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).
                        removeRelativeStyles(reporter, element, style, "top");
                        removeRelativeStyles(reporter, element, style, "right");
                        removeRelativeStyles(reporter, element, style, "bottom");
                        removeRelativeStyles(reporter, element, style, "left");
                    }
                }

                function onObjectLoad() {
                    // The object has been loaded, which means that the element now is guaranteed to be attached to the DOM.
                    if (!positionCheckPerformed) {
                        alterPositionStyles();
                    }

                    /*jshint validthis: true */

                    function getDocument(element, callback) {
                        //Opera 12 seem to call the object.onload before the actual document has been created.
                        //So if it is not present, poll it with an timeout until it is present.
                        //TODO: Could maybe be handled better with object.onreadystatechange or similar.
                        if(!element.contentDocument) {
                            var state = getState(element);
                            if (state.checkForObjectDocumentTimeoutId) {
                                window.clearTimeout(state.checkForObjectDocumentTimeoutId);
                            }
                            state.checkForObjectDocumentTimeoutId = setTimeout(function checkForObjectDocument() {
                                state.checkForObjectDocumentTimeoutId = 0;
                                getDocument(element, callback);
                            }, 100);

                            return;
                        }

                        callback(element.contentDocument);
                    }

                    //Mutating the object element here seems to fire another load event.
                    //Mutating the inner document of the object element is fine though.
                    var objectElement = this;

                    //Create the style element to be added to the object.
                    getDocument(objectElement, function onObjectDocumentReady(objectDocument) {
                        //Notify that the element is ready to be listened to.
                        callback(element);
                    });
                }

                // The element may be detached from the DOM, and some browsers does not support style resolving of detached elements.
                // The alterPositionStyles needs to be delayed until we know the element has been attached to the DOM (which we are sure of when the onObjectLoad has been fired), if style resolution is not possible.
                if (style.position !== "") {
                    alterPositionStyles(style);
                    positionCheckPerformed = true;
                }

                //Add an object element as a child to the target element that will be listened to for resize events.
                var object = document.createElement("object");
                object.style.cssText = OBJECT_STYLE;
                object.tabIndex = -1;
                object.type = "text/html";
                object.setAttribute("aria-hidden", "true");
                object.onload = onObjectLoad;

                //Safari: This must occur before adding the object to the DOM.
                //IE: Does not like that this happens before, even if it is also added after.
                if(!browserDetector.isIE()) {
                    object.data = "about:blank";
                }

                if (!getState(element)) {
                    // The element has been uninstalled before the actual loading happened.
                    return;
                }

                element.appendChild(object);
                getState(element).object = object;

                //IE: This must occur after adding the object to the DOM.
                if(browserDetector.isIE()) {
                    object.data = "about:blank";
                }
            }

            if(batchProcessor) {
                batchProcessor.add(mutateDom);
            } else {
                mutateDom();
            }
        }

        if(browserDetector.isIE(8)) {
            //IE 8 does not support objects properly. Luckily they do support the resize event.
            //So do not inject the object and notify that the element is already ready to be listened to.
            //The event handler for the resize event is attached in the utils.addListener instead.
            callback(element);
        } else {
            injectObject(element, callback);
        }
    }

    /**
     * Returns the child object of the target element.
     * @private
     * @param {element} element The target element.
     * @returns The object element of the target.
     */
    function getObject(element) {
        return getState(element).object;
    }

    function uninstall(element) {
        if (!getState(element)) {
            return;
        }

        var object = getObject(element);

        if (!object) {
            return;
        }

        if (browserDetector.isIE(8)) {
            element.detachEvent("onresize", object.proxy);
        } else {
            element.removeChild(object);
        }

        if (getState(element).checkForObjectDocumentTimeoutId) {
            window.clearTimeout(getState(element).checkForObjectDocumentTimeoutId);
        }

        delete getState(element).object;
    }

    return {
        makeDetectable: makeDetectable,
        addListener: addListener,
        uninstall: uninstall
    };
};


/***/ }),

/***/ "18e9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var detector = module.exports = {};

detector.isIE = function(version) {
    function isAnyIeVersion() {
        var agent = navigator.userAgent.toLowerCase();
        return agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1 || agent.indexOf(" edge/") !== -1;
    }

    if(!isAnyIeVersion()) {
        return false;
    }

    if(!version) {
        return true;
    }

    //Shamelessly stolen from https://gist.github.com/padolsey/527683
    var ieVersion = (function(){
        var undef,
            v = 3,
            div = document.createElement("div"),
            all = div.getElementsByTagName("i");

        do {
            div.innerHTML = "<!--[if gt IE " + (++v) + "]><i></i><![endif]-->";
        }
        while (all[0]);

        return v > 4 ? v : undef;
    }());

    return version === ieVersion;
};

detector.isLegacyOpera = function() {
    return !!window.opera;
};


/***/ }),

/***/ "1bc3":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("f772");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "1ec9":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
var document = __webpack_require__("e53d").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2350":
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

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "294c":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2cef":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function() {
    var idCount = 1;

    /**
     * Generates a new unique id in the context.
     * @public
     * @returns {number} A unique id in the context.
     */
    function generate() {
        return idCount++;
    }

    return {
        generate: generate
    };
};


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2f21":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("79e5");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "35e8":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var createDesc = __webpack_require__("aebd");
module.exports = __webpack_require__("8e60") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "454f":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("46a7");
var $Object = __webpack_require__("584a").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "46a7":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("63b6");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("8e60"), 'Object', { defineProperty: __webpack_require__("d9f6").f });


/***/ }),

/***/ "4917":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");

// @@match logic
__webpack_require__("214f")('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "499e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesClient; });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "49ad":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(idHandler) {
    var eventListeners = {};

    /**
     * Gets all listeners for the given element.
     * @public
     * @param {element} element The element to get all listeners for.
     * @returns All listeners for the given element.
     */
    function getListeners(element) {
        var id = idHandler.get(element);

        if (id === undefined) {
            return [];
        }

        return eventListeners[id] || [];
    }

    /**
     * Stores the given listener for the given element. Will not actually add the listener to the element.
     * @public
     * @param {element} element The element that should have the listener added.
     * @param {function} listener The callback that the element has added.
     */
    function addListener(element, listener) {
        var id = idHandler.get(element);

        if(!eventListeners[id]) {
            eventListeners[id] = [];
        }

        eventListeners[id].push(listener);
    }

    function removeListener(element, listener) {
        var listeners = getListeners(element);
        for (var i = 0, len = listeners.length; i < len; ++i) {
            if (listeners[i] === listener) {
              listeners.splice(i, 1);
              break;
            }
        }
    }

    function removeAllListeners(element) {
      var listeners = getListeners(element);
      if (!listeners) { return; }
      listeners.length = 0;
    }

    return {
        get: getListeners,
        add: addListener,
        removeListener: removeListener,
        removeAllListeners: removeAllListeners
    };
};


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "5014":
/***/ (function(module, exports, __webpack_require__) {

/* interact.js 1.9.10 | https://raw.github.com/taye/interact.js/master/LICENSE */
!function(t){if(true)module.exports=t();else {}}(function(){function t(e){var n;return function(t){return n||e(n={exports:{},parent:t},n.exports),n.exports}}var k=t(function(t,e){"use strict";function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.Interactable=void 0;var i=r(ot),c=m({}),u=n(z),l=r(_t),s=r(We),f=r(K),p=n(w),d=r(Z);function v(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return v=function(){return t},t}function n(t){if(t&&t.__esModule)return t;if(null===t||"object"!==a(t)&&"function"!=typeof t)return{default:t};var e=v();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function y(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}function h(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var g=function(){function o(t,e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),h(this,"options",void 0),h(this,"_actions",void 0),h(this,"target",void 0),h(this,"events",new i.default),h(this,"_context",void 0),h(this,"_win",void 0),h(this,"_doc",void 0),h(this,"_scopeEvents",void 0),this._actions=e.actions,this.target=t,this._context=e.context||n,this._win=(0,O.getWindow)((0,Dt.trySelector)(t)?this._context:t),this._doc=this._win.document,this._scopeEvents=r,this.set(e)}return y(o,[{key:"_defaults",get:function(){return{base:{},perAction:{},actions:{}}}}]),y(o,[{key:"setOnEvents",value:function(t,e){return p.func(e.onstart)&&this.on("".concat(t,"start"),e.onstart),p.func(e.onmove)&&this.on("".concat(t,"move"),e.onmove),p.func(e.onend)&&this.on("".concat(t,"end"),e.onend),p.func(e.oninertiastart)&&this.on("".concat(t,"inertiastart"),e.oninertiastart),this}},{key:"updatePerActionListeners",value:function(t,e,n){(p.array(e)||p.object(e))&&this.off(t,e),(p.array(n)||p.object(n))&&this.on(t,n)}},{key:"setPerAction",value:function(t,e){var n=this._defaults;for(var r in e){var o=r,i=this.options[t],a=e[o];"listeners"===o&&this.updatePerActionListeners(t,i.listeners,a),p.array(a)?i[o]=u.from(a):p.plainObject(a)?(i[o]=(0,f.default)(i[o]||{},(0,s.default)(a)),p.object(n.perAction[o])&&"enabled"in n.perAction[o]&&(i[o].enabled=!1!==a.enabled)):p.bool(a)&&p.object(n.perAction[o])?i[o].enabled=a:i[o]=a}}},{key:"getRect",value:function(t){return t=t||(p.element(this.target)?this.target:null),p.string(this.target)&&(t=t||this._context.querySelector(this.target)),(0,Dt.getElementRect)(t)}},{key:"rectChecker",value:function(t){return p.func(t)?(this.getRect=t,this):null===t?(delete this.getRect,this):this.getRect}},{key:"_backCompatOption",value:function(t,e){if((0,Dt.trySelector)(e)||p.object(e)){for(var n in this.options[t]=e,this._actions.map)this.options[n][t]=e;return this}return this.options[t]}},{key:"origin",value:function(t){return this._backCompatOption("origin",t)}},{key:"deltaSource",value:function(t){return"page"===t||"client"===t?(this.options.deltaSource=t,this):this.options.deltaSource}},{key:"context",value:function(){return this._context}},{key:"inContext",value:function(t){return this._context===t.ownerDocument||(0,Dt.nodeContains)(this._context,t)}},{key:"testIgnoreAllow",value:function(t,e,n){return!this.testIgnore(t.ignoreFrom,e,n)&&this.testAllow(t.allowFrom,e,n)}},{key:"testAllow",value:function(t,e,n){return!t||!!p.element(n)&&(p.string(t)?(0,Dt.matchesUpTo)(n,t,e):!!p.element(t)&&(0,Dt.nodeContains)(t,n))}},{key:"testIgnore",value:function(t,e,n){return!(!t||!p.element(n))&&(p.string(t)?(0,Dt.matchesUpTo)(n,t,e):!!p.element(t)&&(0,Dt.nodeContains)(t,n))}},{key:"fire",value:function(t){return this.events.fire(t),this}},{key:"_onOff",value:function(t,e,n,r){p.object(e)&&!p.array(e)&&(r=n,n=null);var o="on"===t?"add":"remove",i=(0,d.default)(e,n);for(var a in i){"wheel"===a&&(a=l.default.wheelEvent);for(var u=0;u<i[a].length;u++){var s=i[a][u];(0,c.isNonNativeEvent)(a,this._actions)?this.events[t](a,s):p.string(this.target)?this._scopeEvents["".concat(o,"Delegate")](this.target,this._context,a,s,r):this._scopeEvents[o](this.target,a,s,r)}}return this}},{key:"on",value:function(t,e,n){return this._onOff("on",t,e,n)}},{key:"off",value:function(t,e,n){return this._onOff("off",t,e,n)}},{key:"set",value:function(t){var e=this._defaults;for(var n in p.object(t)||(t={}),this.options=(0,s.default)(e.base),this._actions.methodDict){var r=n,o=this._actions.methodDict[r];this.options[r]={},this.setPerAction(r,(0,f.default)((0,f.default)({},e.perAction),e.actions[r])),this[o](t[r])}for(var i in t)p.func(this[i])&&this[i](t[i]);return this}},{key:"unset",value:function(){if(p.string(this.target))for(var t in this._scopeEvents.delegatedEvents)for(var e=this._scopeEvents.delegatedEvents[t],n=e.length-1;0<=n;n--){var r=e[n],o=r.selector,i=r.context,a=r.listeners;o===this.target&&i===this._context&&e.splice(n,1);for(var u=a.length-1;0<=u;u--)this._scopeEvents.removeDelegate(this.target,this._context,t,a[u][0],a[u][1])}else this._scopeEvents.remove(this.target,"all")}}]),o}(),b=e.Interactable=g;e.default=b}),m=t(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isNonNativeEvent=function(t,e){if(e.phaselessTypes[t])return!0;for(var n in e.map)if(0===t.indexOf(n)&&t.substr(n.length)in e.phases)return!0;return!1},e.initScope=M,e.Scope=e.default=void 0;var r=d(ot),o=d(ee),i=d(T({})),a=d(k({})),u=d(dn),s=d(yt),n=d(Sn),c=d(E({})),l=d(bt),f=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==v(t)&&"function"!=typeof t)return{default:t};var e=p();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}($e);function p(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return p=function(){return t},t}function d(t){return t&&t.__esModule?t:{default:t}}function v(t){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function y(t,e,n){return(y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=b(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function h(t,e){return(h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function g(i){return function(){var t,e,n,r=b(i);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return;if(Reflect.construct.sham)return;if("function"==typeof Proxy)return 1;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),1}catch(t){return}}()){var o=b(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return e=this,!(n=t)||"object"!==v(n)&&"function"!=typeof n?function(t){if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):n}}function b(t){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function m(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function O(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function w(t,e,n){return e&&O(t.prototype,e),n&&O(t,n),t}function _(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var P=f.win,x=f.browser,S=f.raf,j=function(){function t(){var e=this;m(this,t),_(this,"id","__interact_scope_".concat(Math.floor(100*Math.random()))),_(this,"isInitialized",!1),_(this,"listenerMaps",[]),_(this,"browser",x),_(this,"utils",f),_(this,"defaults",f.clone(s.default)),_(this,"Eventable",r.default),_(this,"actions",{map:{},phases:{start:!0,move:!0,end:!0},methodDict:{},phaselessTypes:{}}),_(this,"interactStatic",new i.default(this)),_(this,"InteractEvent",o.default),_(this,"Interactable",void 0),_(this,"interactables",new u.default(this)),_(this,"_win",void 0),_(this,"document",void 0),_(this,"window",void 0),_(this,"documents",[]),_(this,"_plugins",{list:[],map:{}}),_(this,"onWindowUnload",function(t){return e.removeDocument(t.target)});var n=this;this.Interactable=function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&h(t,e)}(e,a["default"]);var t=g(e);function e(){return m(this,e),t.apply(this,arguments)}return w(e,[{key:"set",value:function(t){return y(b(e.prototype),"set",this).call(this,t),n.fire("interactable:set",{options:t,interactable:this}),this}},{key:"unset",value:function(){y(b(e.prototype),"unset",this).call(this),n.interactables.list.splice(n.interactables.list.indexOf(this),1),n.fire("interactable:unset",{interactable:this})}},{key:"_defaults",get:function(){return n.defaults}}]),e}()}return w(t,[{key:"addListeners",value:function(t,e){this.listenerMaps.push({id:e,map:t})}},{key:"fire",value:function(t,e){for(var n=0;n<this.listenerMaps.length;n++){var r=this.listenerMaps[n].map[t];if(r&&!1===r(e,this,t))return!1}}},{key:"init",value:function(t){return this.isInitialized?this:M(this,t)}},{key:"pluginIsInstalled",value:function(t){return this._plugins.map[t.id]||-1!==this._plugins.list.indexOf(t)}},{key:"usePlugin",value:function(t,e){if(!this.isInitialized)return this;if(this.pluginIsInstalled(t))return this;if(t.id&&(this._plugins.map[t.id]=t),this._plugins.list.push(t),t.install&&t.install(this,e),t.listeners&&t.before){for(var n=0,r=this.listenerMaps.length,o=t.before.reduce(function(t,e){return t[e]=!0,t},{});n<r;n++){if(o[this.listenerMaps[n].id])break}this.listenerMaps.splice(n,0,{id:t.id,map:t.listeners})}else t.listeners&&this.listenerMaps.push({id:t.id,map:t.listeners});return this}},{key:"addDocument",value:function(t,e){if(-1!==this.getDocIndex(t))return!1;var n=P.getWindow(t);e=e?f.extend({},e):{},this.documents.push({doc:t,options:e}),this.events.documents.push(t),t!==this.document&&this.events.add(n,"unload",this.onWindowUnload),this.fire("scope:add-document",{doc:t,window:n,scope:this,options:e})}},{key:"removeDocument",value:function(t){var e=this.getDocIndex(t),n=P.getWindow(t),r=this.documents[e].options;this.events.remove(n,"unload",this.onWindowUnload),this.documents.splice(e,1),this.events.documents.splice(e,1),this.fire("scope:remove-document",{doc:t,window:n,scope:this,options:r})}},{key:"getDocIndex",value:function(t){for(var e=0;e<this.documents.length;e++)if(this.documents[e].doc===t)return e;return-1}},{key:"getDocOptions",value:function(t){var e=this.getDocIndex(t);return-1===e?null:this.documents[e].options}},{key:"now",value:function(){return(this.window.Date||Date).now()}}]),t}();function M(t,e){return t.isInitialized=!0,P.init(e),l.default.init(e),x.init(e),S.init(e),t.window=e,t.document=e.document,t.usePlugin(c.default),t.usePlugin(n.default),t}e.Scope=e.default=j}),E=t(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=n(Gn),s=n(lr),o=n(br),_=(n(m({})),n(_t)),c=n(bt),P=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==l(t)&&"function"!=typeof t)return{default:t};var e=a();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(Oe);function a(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return a=function(){return t},t}function n(t){return t&&t.__esModule?t:{default:t}}function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function x(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function d(i){return function(){var t,e,n,r=v(i);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return;if(Reflect.construct.sham)return;if("function"==typeof Proxy)return 1;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),1}catch(t){return}}()){var o=v(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return e=this,!(n=t)||"object"!==l(n)&&"function"!=typeof n?function(t){if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):n}}function v(t){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var y=["pointerDown","pointerMove","pointerUp","updatePointer","removePointer","windowBlur"];function h(O,w){return function(t){var e=w.interactions.list,n=P.getPointerType(t),r=x(P.getEventTargets(t),2),o=r[0],i=r[1],a=[];if(/^touch/.test(t.type)){w.prevTouchTime=w.now();for(var u=0;u<t.changedTouches.length;u++){s=t.changedTouches[u];var s,c={pointer:s,pointerId:P.getPointerId(s),pointerType:n,eventType:t.type,eventTarget:o,curEventTarget:i,scope:w},l=S(c);a.push([c.pointer,c.eventTarget,c.curEventTarget,l])}}else{var f=!1;if(!_.default.supportsPointerEvent&&/mouse/.test(t.type)){for(var p=0;p<e.length&&!f;p++)f="mouse"!==e[p].pointerType&&e[p].pointerIsDown;f=f||w.now()-w.prevTouchTime<500||0===t.timeStamp}if(!f){var d={pointer:t,pointerId:P.getPointerId(t),pointerType:n,eventType:t.type,curEventTarget:i,eventTarget:o,scope:w},v=S(d);a.push([d.pointer,d.eventTarget,d.curEventTarget,v])}}for(var y=0;y<a.length;y++){var h=x(a[y],4),g=h[0],b=h[1],m=h[2];h[3][O](g,t,b,m)}}}function S(t){var e=t.pointerType,n=t.scope,r={interaction:o.default.search(t),searchDetails:t};return n.fire("interactions:find",r),r.interaction||n.interactions.new({pointerType:e})}function i(t,e){var n=t.doc,r=t.scope,o=t.options,i=r.interactions.docEvents,a=r.events,u=a[e];for(var s in r.browser.isIOS&&!o.events&&(o.events={passive:!1}),a.delegatedEvents)u(n,s,a.delegateListener),u(n,s,a.delegateUseCapture,!0);for(var c=o&&o.events,l=0;l<i.length;l++){var f;f=i[l];u(n,f.type,f.listener,c)}}var g={id:"core/interactions",install:function(i){for(var t={},e=0;e<y.length;e++){var n;n=y[e];t[n]=h(n,i)}var r,o=_.default.pEventTypes;function a(){for(var t=0;t<i.interactions.list.length;t++){var e=i.interactions.list[t];if(e.pointerIsDown&&"touch"===e.pointerType&&!e._interacting)for(var n=function(){var n=e.pointers[r];i.documents.some(function(t){var e=t.doc;return(0,Dt.nodeContains)(e,n.downTarget)})||e.removePointer(n.pointer,n.event)},r=0;r<e.pointers.length;r++){n()}}}(r=c.default.PointerEvent?[{type:o.down,listener:a},{type:o.down,listener:t.pointerDown},{type:o.move,listener:t.pointerMove},{type:o.up,listener:t.pointerUp},{type:o.cancel,listener:t.pointerUp}]:[{type:"mousedown",listener:t.pointerDown},{type:"mousemove",listener:t.pointerMove},{type:"mouseup",listener:t.pointerUp},{type:"touchstart",listener:a},{type:"touchstart",listener:t.pointerDown},{type:"touchmove",listener:t.pointerMove},{type:"touchend",listener:t.pointerUp},{type:"touchcancel",listener:t.pointerUp}]).push({type:"blur",listener:function(t){for(var e=0;e<i.interactions.list.length;e++){i.interactions.list[e].documentBlur(t)}}}),i.prevTouchTime=0,i.Interaction=function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}(o,u["default"]);var t,e,n,r=d(o);function o(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),r.apply(this,arguments)}return t=o,(e=[{key:"_now",value:function(){return i.now()}},{key:"pointerMoveTolerance",get:function(){return i.interactions.pointerMoveTolerance},set:function(t){i.interactions.pointerMoveTolerance=t}}])&&f(t.prototype,e),n&&f(t,n),o}(),i.interactions={list:[],new:function(t){t.scopeFire=function(t,e){return i.fire(t,e)};var e=new i.Interaction(t);return i.interactions.list.push(e),e},listeners:t,docEvents:r,pointerMoveTolerance:1},i.usePlugin(s.default)},listeners:{"scope:add-document":function(t){return i(t,"add")},"scope:remove-document":function(t){return i(t,"remove")},"interactable:unset":function(t,e){for(var n=t.interactable,r=e.interactions.list.length-1;0<=r;r--){var o=e.interactions.list[r];o.interactable===n&&(o.stop(),e.fire("interactions:destroy",{interaction:o}),o.destroy(),2<e.interactions.list.length&&e.interactions.list.splice(r,1))}}},onDocSignal:i,doOnInteractions:h,methodNames:y};e.default=g}),T=t(function(t,e){"use strict";function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.InteractStatic=void 0;var n,u=m({}),r=(n=_t)&&n.__esModule?n:{default:n},s=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==a(t)&&"function"!=typeof t)return{default:t};var e=c();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}($e);function c(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return c=function(){return t},t}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var i=function(){function a(r){var o=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),l(this,"getPointerAverage",s.pointer.pointerAverage),l(this,"getTouchBBox",s.pointer.touchBBox),l(this,"getTouchDistance",s.pointer.touchDistance),l(this,"getTouchAngle",s.pointer.touchAngle),l(this,"getElementRect",s.dom.getElementRect),l(this,"getElementClientRect",s.dom.getElementClientRect),l(this,"matchesSelector",s.dom.matchesSelector),l(this,"closest",s.dom.closest),l(this,"globalEvents",{}),l(this,"dynamicDrop",void 0),l(this,"version","1.9.10"),l(this,"interact",void 0),l(this,"scope",void 0),this.scope=r;for(var t=this.constructor.prototype,e=function(t,e){var n=r.interactables.get(t,e);return n||((n=r.interactables.new(t,e)).events.global=o.globalEvents),n},n=0;n<Object.getOwnPropertyNames(this.constructor.prototype).length;n++){var i;i=Object.getOwnPropertyNames(this.constructor.prototype)[n];e[i]=t[i]}return s.extend(e,this),e.constructor=this.constructor,this.interact=e}var t,e,n;return t=a,(e=[{key:"use",value:function(t,e){return this.scope.usePlugin(t,e),this}},{key:"isSet",value:function(t,e){return!!this.scope.interactables.get(t,e&&e.context)}},{key:"on",value:function(t,e,n){if(s.is.string(t)&&-1!==t.search(" ")&&(t=t.trim().split(/ +/)),s.is.array(t)){for(var r=0;r<t.length;r++){var o=t[r];this.on(o,e,n)}return this}if(s.is.object(t)){for(var i in t)this.on(i,t[i],e);return this}return(0,u.isNonNativeEvent)(t,this.scope.actions)?this.globalEvents[t]?this.globalEvents[t].push(e):this.globalEvents[t]=[e]:this.scope.events.add(this.scope.document,t,e,{options:n}),this}},{key:"off",value:function(t,e,n){if(s.is.string(t)&&-1!==t.search(" ")&&(t=t.trim().split(/ +/)),s.is.array(t)){for(var r=0;r<t.length;r++){var o=t[r];this.off(o,e,n)}return this}if(s.is.object(t)){for(var i in t)this.off(i,t[i],e);return this}var a;(0,u.isNonNativeEvent)(t,this.scope.actions)?t in this.globalEvents&&-1!==(a=this.globalEvents[t].indexOf(e))&&this.globalEvents[t].splice(a,1):this.scope.events.remove(this.scope.document,t,e,n);return this}},{key:"debug",value:function(){return this.scope}},{key:"supportsTouch",value:function(){return r.default.supportsTouch}},{key:"supportsPointerEvent",value:function(){return r.default.supportsPointerEvent}},{key:"stop",value:function(){for(var t=0;t<this.scope.interactions.list.length;t++){this.scope.interactions.list[t].stop()}return this}},{key:"pointerMoveTolerance",value:function(t){return s.is.number(t)?(this.scope.interactions.pointerMoveTolerance=t,this):this.scope.interactions.pointerMoveTolerance}},{key:"addDocument",value:function(t,e){this.scope.addDocument(t,e)}},{key:"removeDocument",value:function(t){this.scope.removeDocument(t)}}])&&o(t.prototype,e),n&&o(t,n),a}(),f=e.InteractStatic=i;e.default=f}),e={};Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default=function(t){return!(!t||!t.Window)&&t instanceof t.Window};var O={};Object.defineProperty(O,"__esModule",{value:!0}),O.init=i,O.getWindow=a,O.default=void 0;var n,r=(n=e)&&n.__esModule?n:{default:n};var o={realWindow:void 0,window:void 0,getWindow:a,init:i};function i(t){var e=(o.realWindow=t).document.createTextNode("");e.ownerDocument!==t.document&&"function"==typeof t.wrap&&t.wrap(e)===e&&(t=t.wrap(t)),o.window=t}function a(t){return(0,r.default)(t)?t:(t.ownerDocument||t).defaultView||o.window}"undefined"==typeof window?(o.window=void 0,o.realWindow=void 0):i(window),o.init=i;var u=o;O.default=u;var w={};Object.defineProperty(w,"__esModule",{value:!0}),w.array=w.plainObject=w.element=w.string=w.bool=w.number=w.func=w.object=w.docFrag=w.window=void 0;var s=l(e),c=l(O);function l(t){return t&&t.__esModule?t:{default:t}}function f(t){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}w.window=function(t){return t===c.default.window||(0,s.default)(t)};w.docFrag=function(t){return p(t)&&11===t.nodeType};var p=function(t){return!!t&&"object"===f(t)};w.object=p;function d(t){return"function"==typeof t}w.func=d;w.number=function(t){return"number"==typeof t};w.bool=function(t){return"boolean"==typeof t};w.string=function(t){return"string"==typeof t};w.element=function(t){if(!t||"object"!==f(t))return!1;var e=c.default.getWindow(t)||c.default.window;return/object|function/.test(f(e.Element))?t instanceof e.Element:1===t.nodeType&&"string"==typeof t.nodeName};w.plainObject=function(t){return p(t)&&!!t.constructor&&/function Object\b/.test(t.constructor.toString())};w.array=function(t){return p(t)&&void 0!==t.length&&d(t.splice)};var v={};function y(t){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(v,"__esModule",{value:!0}),v.default=void 0;var h=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==y(t)&&"function"!=typeof t)return{default:t};var e=g();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w);function g(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return g=function(){return t},t}function b(t){var e=t.interaction;if("drag"===e.prepared.name){var n=e.prepared.axis;"x"===n?(e.coords.cur.page.y=e.coords.start.page.y,e.coords.cur.client.y=e.coords.start.client.y,e.coords.velocity.client.y=0,e.coords.velocity.page.y=0):"y"===n&&(e.coords.cur.page.x=e.coords.start.page.x,e.coords.cur.client.x=e.coords.start.client.x,e.coords.velocity.client.x=0,e.coords.velocity.page.x=0)}}function _(t){var e=t.iEvent,n=t.interaction;if("drag"===n.prepared.name){var r=n.prepared.axis;if("x"===r||"y"===r){var o="x"===r?"y":"x";e.page[o]=n.coords.start.page[o],e.client[o]=n.coords.start.client[o],e.delta[o]=0}}}var P={id:"actions/drag",install:function(t){var e=t.actions,n=t.Interactable,r=t.defaults;n.prototype.draggable=P.draggable,e.map.drag=P,e.methodDict.drag="draggable",r.actions.drag=P.defaults},listeners:{"interactions:before-action-move":b,"interactions:action-resume":b,"interactions:action-move":_,"auto-start:check":function(t){var e=t.interaction,n=t.interactable,r=t.buttons,o=n.options.drag;if(o&&o.enabled&&(!e.pointerIsDown||!/mouse|pointer/.test(e.pointerType)||0!=(r&n.options.drag.mouseButtons)))return!(t.action={name:"drag",axis:"start"===o.lockAxis?o.startAxis:o.lockAxis})}},draggable:function(t){return h.object(t)?(this.options.drag.enabled=!1!==t.enabled,this.setPerAction("drag",t),this.setOnEvents("drag",t),/^(xy|x|y|start)$/.test(t.lockAxis)&&(this.options.drag.lockAxis=t.lockAxis),/^(xy|x|y)$/.test(t.startAxis)&&(this.options.drag.startAxis=t.startAxis),this):h.bool(t)?(this.options.drag.enabled=t,this):this.options.drag},beforeMove:b,move:_,defaults:{startAxis:"xy",lockAxis:"xy"},getCursor:function(){return"move"}},x=P;v.default=x;var S={};function j(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function M(t,e,n){return e&&j(t.prototype,e),n&&j(t,n),t}function D(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(S,"__esModule",{value:!0}),S.default=S.BaseEvent=void 0;var I=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),D(this,"type",void 0),D(this,"target",void 0),D(this,"currentTarget",void 0),D(this,"interactable",void 0),D(this,"_interaction",void 0),D(this,"timeStamp",void 0),D(this,"immediatePropagationStopped",!1),D(this,"propagationStopped",!1),this._interaction=t}return M(e,[{key:"interaction",get:function(){return this._interaction._proxy}}]),M(e,[{key:"preventDefault",value:function(){}},{key:"stopPropagation",value:function(){this.propagationStopped=!0}},{key:"stopImmediatePropagation",value:function(){this.immediatePropagationStopped=this.propagationStopped=!0}}]),e}(),A=S.BaseEvent=I;S.default=A;var z={};Object.defineProperty(z,"__esModule",{value:!0}),z.find=z.findIndex=z.from=z.merge=z.remove=z.contains=void 0;z.contains=function(t,e){return-1!==t.indexOf(e)};z.remove=function(t,e){return t.splice(t.indexOf(e),1)};function R(t,e){for(var n=0;n<e.length;n++){var r=e[n];t.push(r)}return t}z.merge=R;z.from=function(t){return R([],t)};function C(t,e){for(var n=0;n<t.length;n++)if(e(t[n],n,t))return n;return-1}z.findIndex=C;z.find=function(t,e){return t[C(t,e)]};var W={};Object.defineProperty(W,"__esModule",{value:!0}),W.default=void 0;var F,X=(F=S)&&F.__esModule?F:{default:F},Y=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==L(t)&&"function"!=typeof t)return{default:t};var e=N();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(z);function N(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return N=function(){return t},t}function L(t){return(L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function B(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function U(t,e){return(U=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function V(i){return function(){var t,e,n,r=G(i);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return;if(Reflect.construct.sham)return;if("function"==typeof Proxy)return 1;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),1}catch(t){return}}()){var o=G(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return e=this,!(n=t)||"object"!==L(n)&&"function"!=typeof n?q(e):n}}function q(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function G(t){return(G=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function $(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var H=function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&U(t,e)}(s,X["default"]);var t,e,n,u=V(s);function s(t,e,n){var r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,s),$(q(r=u.call(this,e._interaction)),"target",void 0),$(q(r),"dropzone",void 0),$(q(r),"dragEvent",void 0),$(q(r),"relatedTarget",void 0),$(q(r),"draggable",void 0),$(q(r),"timeStamp",void 0),$(q(r),"propagationStopped",!1),$(q(r),"immediatePropagationStopped",!1);var o="dragleave"===n?t.prev:t.cur,i=o.element,a=o.dropzone;return r.type=n,r.target=i,r.currentTarget=i,r.dropzone=a,r.dragEvent=e,r.relatedTarget=e.target,r.draggable=e.interactable,r.timeStamp=e.timeStamp,r}return t=s,(e=[{key:"reject",value:function(){var r=this,t=this._interaction.dropState;if("dropactivate"===this.type||this.dropzone&&t.cur.dropzone===this.dropzone&&t.cur.element===this.target)if(t.prev.dropzone=this.dropzone,t.prev.element=this.target,t.rejected=!0,t.events.enter=null,this.stopImmediatePropagation(),"dropactivate"===this.type){var e=t.activeDrops,n=Y.findIndex(e,function(t){var e=t.dropzone,n=t.element;return e===r.dropzone&&n===r.target});t.activeDrops.splice(n,1);var o=new s(t,this.dragEvent,"dropdeactivate");o.dropzone=this.dropzone,o.target=this.target,this.dropzone.fire(o)}else this.dropzone.fire(new s(t,this.dragEvent,"dragleave"))}},{key:"preventDefault",value:function(){}},{key:"stopPropagation",value:function(){this.propagationStopped=!0}},{key:"stopImmediatePropagation",value:function(){this.immediatePropagationStopped=this.propagationStopped=!0}}])&&B(t.prototype,e),n&&B(t,n),s}();W.default=H;var K={};Object.defineProperty(K,"__esModule",{value:!0}),K.default=function(t,e){for(var n in e)t[n]=e[n];return t};var Z={};function J(t){return(J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Z,"__esModule",{value:!0}),Z.default=function n(e,r,o){o=o||{};et.string(e)&&-1!==e.search(" ")&&(e=rt(e));if(et.array(e))return e.reduce(function(t,e){return(0,tt.default)(t,n(e,r,o))},o);et.object(e)&&(r=e,e="");if(et.func(r))o[e]=o[e]||[],o[e].push(r);else if(et.array(r))for(var t=0;t<r.length;t++){var i=r[t];n(e,i,o)}else if(et.object(r))for(var a in r){var u=rt(a).map(function(t){return"".concat(e).concat(t)});n(u,r[a],o)}return o};var Q,tt=(Q=K)&&Q.__esModule?Q:{default:Q},et=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==J(t)&&"function"!=typeof t)return{default:t};var e=nt();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w);function nt(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return nt=function(){return t},t}function rt(t){return t.trim().split(/ +/)}var ot={};function it(t){return(it="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(ot,"__esModule",{value:!0}),ot.default=void 0;var at=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==it(t)&&"function"!=typeof t)return{default:t};var e=lt();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(z),ut=ct(K),st=ct(Z);function ct(t){return t&&t.__esModule?t:{default:t}}function lt(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return lt=function(){return t},t}function ft(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function pt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function dt(t,e){for(var n=0;n<e.length;n++){var r=e[n];if(t.immediatePropagationStopped)break;r(t)}}var vt=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),pt(this,"options",void 0),pt(this,"types",{}),pt(this,"propagationStopped",!1),pt(this,"immediatePropagationStopped",!1),pt(this,"global",void 0),this.options=(0,ut.default)({},t||{})}var t,n,r;return t=e,(n=[{key:"fire",value:function(t){var e,n=this.global;(e=this.types[t.type])&&dt(t,e),!t.propagationStopped&&n&&(e=n[t.type])&&dt(t,e)}},{key:"on",value:function(t,e){var n=(0,st.default)(t,e);for(t in n)this.types[t]=at.merge(this.types[t]||[],n[t])}},{key:"off",value:function(t,e){var n=(0,st.default)(t,e);for(t in n){var r=this.types[t];if(r&&r.length)for(var o=0;o<n[t].length;o++){var i=n[t][o],a=r.indexOf(i);-1!==a&&r.splice(a,1)}}}},{key:"getRect",value:function(){return null}}])&&ft(t.prototype,n),r&&ft(t,r),e}();ot.default=vt;var yt={};Object.defineProperty(yt,"__esModule",{value:!0}),yt.default=yt.defaults=void 0;var ht={base:{preventDefault:"auto",deltaSource:"page"},perAction:{enabled:!1,origin:{x:0,y:0}},actions:{}},gt=yt.defaults=ht;yt.default=gt;var bt={};Object.defineProperty(bt,"__esModule",{value:!0}),bt.default=void 0;var mt={init:function(t){var e=t;mt.document=e.document,mt.DocumentFragment=e.DocumentFragment||Ot,mt.SVGElement=e.SVGElement||Ot,mt.SVGSVGElement=e.SVGSVGElement||Ot,mt.SVGElementInstance=e.SVGElementInstance||Ot,mt.Element=e.Element||Ot,mt.HTMLElement=e.HTMLElement||mt.Element,mt.Event=e.Event,mt.Touch=e.Touch||Ot,mt.PointerEvent=e.PointerEvent||e.MSPointerEvent},document:null,DocumentFragment:null,SVGElement:null,SVGSVGElement:null,SVGElementInstance:null,Element:null,HTMLElement:null,Event:null,Touch:null,PointerEvent:null};function Ot(){}var wt=mt;bt.default=wt;var _t={};function Pt(t){return(Pt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(_t,"__esModule",{value:!0}),_t.default=void 0;var xt=kt(bt),St=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Pt(t)&&"function"!=typeof t)return{default:t};var e=Mt();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w),jt=kt(O);function Mt(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Mt=function(){return t},t}function kt(t){return t&&t.__esModule?t:{default:t}}var Et={init:function(t){var e=xt.default.Element,n=jt.default.window.navigator;Et.supportsTouch="ontouchstart"in t||St.func(t.DocumentTouch)&&xt.default.document instanceof t.DocumentTouch,Et.supportsPointerEvent=!1!==n.pointerEnabled&&!!xt.default.PointerEvent,Et.isIOS=/iP(hone|od|ad)/.test(n.platform),Et.isIOS7=/iP(hone|od|ad)/.test(n.platform)&&/OS 7[^\d]/.test(n.appVersion),Et.isIe9=/MSIE 9/.test(n.userAgent),Et.isOperaMobile="Opera"===n.appName&&Et.supportsTouch&&/Presto/.test(n.userAgent),Et.prefixedMatchesSelector="matches"in e.prototype?"matches":"webkitMatchesSelector"in e.prototype?"webkitMatchesSelector":"mozMatchesSelector"in e.prototype?"mozMatchesSelector":"oMatchesSelector"in e.prototype?"oMatchesSelector":"msMatchesSelector",Et.pEventTypes=Et.supportsPointerEvent?xt.default.PointerEvent===t.MSPointerEvent?{up:"MSPointerUp",down:"MSPointerDown",over:"mouseover",out:"mouseout",move:"MSPointerMove",cancel:"MSPointerCancel"}:{up:"pointerup",down:"pointerdown",over:"pointerover",out:"pointerout",move:"pointermove",cancel:"pointercancel"}:null,Et.wheelEvent="onmousewheel"in xt.default.document?"mousewheel":"wheel"},supportsTouch:null,supportsPointerEvent:null,isIOS7:null,isIOS:null,isIe9:null,isOperaMobile:null,prefixedMatchesSelector:null,pEventTypes:null,wheelEvent:null};var Tt=Et;_t.default=Tt;var Dt={};function It(t){return(It="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Dt,"__esModule",{value:!0}),Dt.nodeContains=function(t,e){for(;e;){if(e===t)return!0;e=e.parentNode}return!1},Dt.closest=function(t,e){for(;Rt.element(t);){if(Nt(t,e))return t;t=Yt(t)}return null},Dt.parentNode=Yt,Dt.matchesSelector=Nt,Dt.indexOfDeepestElement=function(t){var e,n,r=[],o=t[0],i=o?0:-1;for(e=1;e<t.length;e++){var a=t[e];if(a&&a!==o)if(o){if(a.parentNode!==a.ownerDocument)if(o.parentNode!==a.ownerDocument)if(a.parentNode!==o.parentNode){if(!r.length)for(var u=o,s=void 0;(s=Lt(u))&&s!==u.ownerDocument;)r.unshift(u),u=s;var c=void 0;if(o instanceof zt.default.HTMLElement&&a instanceof zt.default.SVGElement&&!(a instanceof zt.default.SVGSVGElement)){if(a===o.parentNode)continue;c=a.ownerSVGElement}else c=a;for(var l=[];c.parentNode!==c.ownerDocument;)l.unshift(c),c=Lt(c);for(n=0;l[n]&&l[n]===r[n];)n++;for(var f=[l[n-1],l[n],r[n]],p=f[0].lastChild;p;){if(p===f[1]){o=a,i=e,r=l;break}if(p===f[2])break;p=p.previousSibling}}else{var d=parseInt((0,Ct.getWindow)(o).getComputedStyle(o).zIndex,10)||0,v=parseInt((0,Ct.getWindow)(a).getComputedStyle(a).zIndex,10)||0;d<=v&&(o=a,i=e)}else o=a,i=e}else o=a,i=e}return i},Dt.matchesUpTo=function(t,e,n){for(;Rt.element(t);){if(Nt(t,e))return!0;if((t=Yt(t))===n)return Nt(t,e)}return!1},Dt.getActualElement=function(t){return t instanceof zt.default.SVGElementInstance?t.correspondingUseElement:t},Dt.getScrollXY=Bt,Dt.getElementClientRect=Ut,Dt.getElementRect=function(t){var e=Ut(t);if(!At.default.isIOS7&&e){var n=Bt(Ct.default.getWindow(t));e.left+=n.x,e.right+=n.x,e.top+=n.y,e.bottom+=n.y}return e},Dt.getPath=function(t){var e=[];for(;t;)e.push(t),t=Yt(t);return e},Dt.trySelector=function(t){return!!Rt.string(t)&&(zt.default.document.querySelector(t),!0)};var At=Xt(_t),zt=Xt(bt),Rt=Ft(w),Ct=Ft(O);function Wt(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Wt=function(){return t},t}function Ft(t){if(t&&t.__esModule)return t;if(null===t||"object"!==It(t)&&"function"!=typeof t)return{default:t};var e=Wt();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function Xt(t){return t&&t.__esModule?t:{default:t}}function Yt(t){var e=t.parentNode;if(Rt.docFrag(e)){for(;(e=e.host)&&Rt.docFrag(e););return e}return e}function Nt(t,e){return Ct.default.window!==Ct.default.realWindow&&(e=e.replace(/\/deep\//g," ")),t[At.default.prefixedMatchesSelector](e)}var Lt=function(t){return t.parentNode?t.parentNode:t.host};function Bt(t){return{x:(t=t||Ct.default.window).scrollX||t.document.documentElement.scrollLeft,y:t.scrollY||t.document.documentElement.scrollTop}}function Ut(t){var e=t instanceof zt.default.SVGElement?t.getBoundingClientRect():t.getClientRects()[0];return e&&{left:e.left,right:e.right,top:e.top,bottom:e.bottom,width:e.width||e.right-e.left,height:e.height||e.bottom-e.top}}var Vt={};function qt(t){return(qt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Vt,"__esModule",{value:!0}),Vt.getStringOptionResult=Jt,Vt.resolveRectLike=function(t,e,n,r){var o=t;Ht.string(o)?o=Jt(o,e,n):Ht.func(o)&&(o=o.apply(void 0,function(t){return function(t){if(Array.isArray(t))return Zt(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return Zt(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Zt(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(r)));Ht.element(o)&&(o=(0,Dt.getElementRect)(o));return o},Vt.rectToXY=function(t){return t&&{x:"x"in t?t.x:t.left,y:"y"in t?t.y:t.top}},Vt.xywhToTlbr=function(t){!t||"left"in t&&"top"in t||((t=(0,$t.default)({},t)).left=t.x||0,t.top=t.y||0,t.right=t.right||t.left+t.width,t.bottom=t.bottom||t.top+t.height);return t},Vt.tlbrToXywh=function(t){!t||"x"in t&&"y"in t||((t=(0,$t.default)({},t)).x=t.left||0,t.y=t.top||0,t.width=t.width||t.right||0-t.x,t.height=t.height||t.bottom||0-t.y);return t},Vt.addEdges=function(t,e,n){t.left&&(e.left+=n.x);t.right&&(e.right+=n.x);t.top&&(e.top+=n.y);t.bottom&&(e.bottom+=n.y);e.width=e.right-e.left,e.height=e.bottom-e.top};var Gt,$t=(Gt=K)&&Gt.__esModule?Gt:{default:Gt},Ht=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==qt(t)&&"function"!=typeof t)return{default:t};var e=Kt();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w);function Kt(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Kt=function(){return t},t}function Zt(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function Jt(t,e,n){return"parent"===t?(0,Dt.parentNode)(n):"self"===t?e.getRect(n):(0,Dt.closest)(n,t)}var Qt={};Object.defineProperty(Qt,"__esModule",{value:!0}),Qt.default=function(t,e,n){var r=t.options[n],o=r&&r.origin||t.options.origin,i=(0,Vt.resolveRectLike)(o,t,e,[t&&e]);return(0,Vt.rectToXY)(i)||{x:0,y:0}};var te={};Object.defineProperty(te,"__esModule",{value:!0}),te.default=void 0;te.default=function(t,e){return Math.sqrt(t*t+e*e)};var ee={};Object.defineProperty(ee,"__esModule",{value:!0}),ee.default=ee.InteractEvent=void 0;var ne=ue(S),re=ue(yt),oe=ue(K),ie=ue(Qt),ae=ue(te);function ue(t){return t&&t.__esModule?t:{default:t}}function se(t){return(se="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function ce(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function le(t,e){return(le=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function fe(i){return function(){var t,e,n,r=de(i);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return;if(Reflect.construct.sham)return;if("function"==typeof Proxy)return 1;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),1}catch(t){return}}()){var o=de(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return e=this,!(n=t)||"object"!==se(n)&&"function"!=typeof n?pe(e):n}}function pe(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function de(t){return(de=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function ve(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var ye=function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&le(t,e)}(h,ne["default"]);var t,e,n,y=fe(h);function h(t,e,n,r,o,i,a){var u;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,h),ve(pe(u=y.call(this,t)),"target",void 0),ve(pe(u),"currentTarget",void 0),ve(pe(u),"relatedTarget",null),ve(pe(u),"screenX",void 0),ve(pe(u),"screenY",void 0),ve(pe(u),"button",void 0),ve(pe(u),"buttons",void 0),ve(pe(u),"ctrlKey",void 0),ve(pe(u),"shiftKey",void 0),ve(pe(u),"altKey",void 0),ve(pe(u),"metaKey",void 0),ve(pe(u),"page",void 0),ve(pe(u),"client",void 0),ve(pe(u),"delta",void 0),ve(pe(u),"rect",void 0),ve(pe(u),"x0",void 0),ve(pe(u),"y0",void 0),ve(pe(u),"t0",void 0),ve(pe(u),"dt",void 0),ve(pe(u),"duration",void 0),ve(pe(u),"clientX0",void 0),ve(pe(u),"clientY0",void 0),ve(pe(u),"velocity",void 0),ve(pe(u),"speed",void 0),ve(pe(u),"swipe",void 0),ve(pe(u),"timeStamp",void 0),ve(pe(u),"dragEnter",void 0),ve(pe(u),"dragLeave",void 0),ve(pe(u),"axes",void 0),ve(pe(u),"preEnd",void 0),o=o||t.element;var s=t.interactable,c=(s&&s.options||re.default).deltaSource,l=(0,ie.default)(s,o,n),f="start"===r,p="end"===r,d=f?pe(u):t.prevEvent,v=f?t.coords.start:p?{page:d.page,client:d.client,timeStamp:t.coords.cur.timeStamp}:t.coords.cur;return u.page=(0,oe.default)({},v.page),u.client=(0,oe.default)({},v.client),u.rect=(0,oe.default)({},t.rect),u.timeStamp=v.timeStamp,p||(u.page.x-=l.x,u.page.y-=l.y,u.client.x-=l.x,u.client.y-=l.y),u.ctrlKey=e.ctrlKey,u.altKey=e.altKey,u.shiftKey=e.shiftKey,u.metaKey=e.metaKey,u.button=e.button,u.buttons=e.buttons,u.target=o,u.currentTarget=o,u.preEnd=i,u.type=a||n+(r||""),u.interactable=s,u.t0=f?t.pointers[t.pointers.length-1].downTime:d.t0,u.x0=t.coords.start.page.x-l.x,u.y0=t.coords.start.page.y-l.y,u.clientX0=t.coords.start.client.x-l.x,u.clientY0=t.coords.start.client.y-l.y,u.delta=f||p?{x:0,y:0}:{x:u[c].x-d[c].x,y:u[c].y-d[c].y},u.dt=t.coords.delta.timeStamp,u.duration=u.timeStamp-u.t0,u.velocity=(0,oe.default)({},t.coords.velocity[c]),u.speed=(0,ae.default)(u.velocity.x,u.velocity.y),u.swipe=p||"inertiastart"===r?u.getSwipe():null,u}return t=h,(e=[{key:"getSwipe",value:function(){var t=this._interaction;if(t.prevEvent.speed<600||150<this.timeStamp-t.prevEvent.timeStamp)return null;var e=180*Math.atan2(t.prevEvent.velocityY,t.prevEvent.velocityX)/Math.PI;e<0&&(e+=360);var n=112.5<=e&&e<247.5,r=202.5<=e&&e<337.5;return{up:r,down:!r&&22.5<=e&&e<157.5,left:n,right:!n&&(292.5<=e||e<67.5),angle:e,speed:t.prevEvent.speed,velocity:{x:t.prevEvent.velocityX,y:t.prevEvent.velocityY}}}},{key:"preventDefault",value:function(){}},{key:"stopImmediatePropagation",value:function(){this.immediatePropagationStopped=this.propagationStopped=!0}},{key:"stopPropagation",value:function(){this.propagationStopped=!0}},{key:"pageX",get:function(){return this.page.x},set:function(t){this.page.x=t}},{key:"pageY",get:function(){return this.page.y},set:function(t){this.page.y=t}},{key:"clientX",get:function(){return this.client.x},set:function(t){this.client.x=t}},{key:"clientY",get:function(){return this.client.y},set:function(t){this.client.y=t}},{key:"dx",get:function(){return this.delta.x},set:function(t){this.delta.x=t}},{key:"dy",get:function(){return this.delta.y},set:function(t){this.delta.y=t}},{key:"velocityX",get:function(){return this.velocity.x},set:function(t){this.velocity.x=t}},{key:"velocityY",get:function(){return this.velocity.y},set:function(t){this.velocity.y=t}}])&&ce(t.prototype,e),n&&ce(t,n),h}(),he=ee.InteractEvent=ye;ee.default=he;var ge={};function be(t,e){for(var n in e){var r=be.prefixedPropREs,o=!1;for(var i in r)if(0===n.indexOf(i)&&r[i].test(n)){o=!0;break}o||"function"==typeof e[n]||(t[n]=e[n])}return t}Object.defineProperty(ge,"__esModule",{value:!0}),ge.default=void 0,be.prefixedPropREs={webkit:/(Movement[XY]|Radius[XY]|RotationAngle|Force)$/,moz:/(Pressure)$/};var me=be;ge.default=me;var Oe={};function we(t){return(we="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Oe,"__esModule",{value:!0}),Oe.copyCoords=function(t,e){t.page=t.page||{},t.page.x=e.page.x,t.page.y=e.page.y,t.client=t.client||{},t.client.x=e.client.x,t.client.y=e.client.y,t.timeStamp=e.timeStamp},Oe.setCoordDeltas=function(t,e,n){t.page.x=n.page.x-e.page.x,t.page.y=n.page.y-e.page.y,t.client.x=n.client.x-e.client.x,t.client.y=n.client.y-e.client.y,t.timeStamp=n.timeStamp-e.timeStamp},Oe.setCoordVelocity=function(t,e){var n=Math.max(e.timeStamp/1e3,.001);t.page.x=e.page.x/n,t.page.y=e.page.y/n,t.client.x=e.client.x/n,t.client.y=e.client.y/n,t.timeStamp=n},Oe.setZeroCoords=function(t){t.page.x=0,t.page.y=0,t.client.x=0,t.client.y=0},Oe.isNativePointer=De,Oe.getXY=Ie,Oe.getPageXY=Ae,Oe.getClientXY=ze,Oe.getPointerId=function(t){return je.number(t.pointerId)?t.pointerId:t.identifier},Oe.setCoords=function(t,e,n){var r=1<e.length?Ce(e):e[0],o={};Ae(r,o),t.page.x=o.x,t.page.y=o.y,ze(r,o),t.client.x=o.x,t.client.y=o.y,t.timeStamp=n},Oe.getTouchPair=Re,Oe.pointerAverage=Ce,Oe.touchBBox=function(t){if(!(t.length||t.touches&&1<t.touches.length))return null;var e=Re(t),n=Math.min(e[0].pageX,e[1].pageX),r=Math.min(e[0].pageY,e[1].pageY),o=Math.max(e[0].pageX,e[1].pageX),i=Math.max(e[0].pageY,e[1].pageY);return{x:n,y:r,left:n,top:r,right:o,bottom:i,width:o-n,height:i-r}},Oe.touchDistance=function(t,e){var n=e+"X",r=e+"Y",o=Re(t),i=o[0][n]-o[1][n],a=o[0][r]-o[1][r];return(0,Se.default)(i,a)},Oe.touchAngle=function(t,e){var n=e+"X",r=e+"Y",o=Re(t),i=o[1][n]-o[0][n],a=o[1][r]-o[0][r];return 180*Math.atan2(a,i)/Math.PI},Oe.getPointerType=function(t){return je.string(t.pointerType)?t.pointerType:je.number(t.pointerType)?[void 0,void 0,"touch","pen","mouse"][t.pointerType]:/touch/.test(t.type)||t instanceof Pe.default.Touch?"touch":"mouse"},Oe.getEventTargets=function(t){var e=je.func(t.composedPath)?t.composedPath():t.path;return[xe.getActualElement(e?e[0]:t.target),xe.getActualElement(t.currentTarget)]},Oe.newCoords=function(){return{page:{x:0,y:0},client:{x:0,y:0},timeStamp:0}},Oe.coordsToEvent=function(t){return{coords:t,get page(){return this.coords.page},get client(){return this.coords.client},get timeStamp(){return this.coords.timeStamp},get pageX(){return this.coords.page.x},get pageY(){return this.coords.page.y},get clientX(){return this.coords.client.x},get clientY(){return this.coords.client.y},get pointerId(){return this.coords.pointerId},get target(){return this.coords.target},get type(){return this.coords.type},get pointerType(){return this.coords.pointerType},get buttons(){return this.coords.buttons},preventDefault:function(){}}},Object.defineProperty(Oe,"pointerExtend",{enumerable:!0,get:function(){return Me.default}});var _e=Te(_t),Pe=Te(bt),xe=Ee(Dt),Se=Te(te),je=Ee(w),Me=Te(ge);function ke(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return ke=function(){return t},t}function Ee(t){if(t&&t.__esModule)return t;if(null===t||"object"!==we(t)&&"function"!=typeof t)return{default:t};var e=ke();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function Te(t){return t&&t.__esModule?t:{default:t}}function De(t){return t instanceof Pe.default.Event||t instanceof Pe.default.Touch}function Ie(t,e,n){return(n=n||{}).x=e[(t=t||"page")+"X"],n.y=e[t+"Y"],n}function Ae(t,e){return e=e||{x:0,y:0},_e.default.isOperaMobile&&De(t)?(Ie("screen",t,e),e.x+=window.scrollX,e.y+=window.scrollY):Ie("page",t,e),e}function ze(t,e){return e=e||{},_e.default.isOperaMobile&&De(t)?Ie("screen",t,e):Ie("client",t,e),e}function Re(t){var e=[];return je.array(t)?(e[0]=t[0],e[1]=t[1]):"touchend"===t.type?1===t.touches.length?(e[0]=t.touches[0],e[1]=t.changedTouches[0]):0===t.touches.length&&(e[0]=t.changedTouches[0],e[1]=t.changedTouches[1]):(e[0]=t.touches[0],e[1]=t.touches[1]),e}function Ce(t){for(var e={pageX:0,pageY:0,clientX:0,clientY:0,screenX:0,screenY:0},n=0;n<t.length;n++){var r=t[n];for(var o in e)e[o]+=r[o]}for(var i in e)e[i]/=t.length;return e}var We={};function Fe(t){return(Fe="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(We,"__esModule",{value:!0}),We.default=function t(e){var n={};for(var r in e){var o=e[r];Ye.plainObject(o)?n[r]=t(o):Ye.array(o)?n[r]=Xe.from(o):n[r]=o}return n};var Xe=Le(z),Ye=Le(w);function Ne(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Ne=function(){return t},t}function Le(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Fe(t)&&"function"!=typeof t)return{default:t};var e=Ne();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}var Be={};Object.defineProperty(Be,"__esModule",{value:!0}),Be.default=void 0;var Ue,Ve,qe=0;var Ge={request:function(t){return Ue(t)},cancel:function(t){return Ve(t)},init:function(t){if(Ue=t.requestAnimationFrame,Ve=t.cancelAnimationFrame,!Ue)for(var e=["ms","moz","webkit","o"],n=0;n<e.length;n++){var r=e[n];Ue=t["".concat(r,"RequestAnimationFrame")],Ve=t["".concat(r,"CancelAnimationFrame")]||t["".concat(r,"CancelRequestAnimationFrame")]}Ue||(Ue=function(t){var e=Date.now(),n=Math.max(0,16-(e-qe)),r=setTimeout(function(){t(e+n)},n);return qe=e+n,r},Ve=function(t){return clearTimeout(t)})}};Be.default=Ge;var $e={};function He(t){return(He="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty($e,"__esModule",{value:!0}),$e.warnOnce=function(t,e){var n=!1;return function(){return n||(en.default.window.console.warn(e),n=!0),t.apply(this,arguments)}},$e.copyAction=function(t,e){return t.name=e.name,t.axis=e.axis,t.edges=e.edges,t},Object.defineProperty($e,"win",{enumerable:!0,get:function(){return en.default}}),Object.defineProperty($e,"browser",{enumerable:!0,get:function(){return nn.default}}),Object.defineProperty($e,"clone",{enumerable:!0,get:function(){return rn.default}}),Object.defineProperty($e,"extend",{enumerable:!0,get:function(){return on.default}}),Object.defineProperty($e,"getOriginXY",{enumerable:!0,get:function(){return an.default}}),Object.defineProperty($e,"hypot",{enumerable:!0,get:function(){return un.default}}),Object.defineProperty($e,"normalizeListeners",{enumerable:!0,get:function(){return sn.default}}),Object.defineProperty($e,"raf",{enumerable:!0,get:function(){return cn.default}}),$e.rect=$e.pointer=$e.is=$e.dom=$e.arr=void 0;var Ke=pn(z);$e.arr=Ke;var Ze=pn(Dt);$e.dom=Ze;var Je=pn(w);$e.is=Je;var Qe=pn(Oe);$e.pointer=Qe;var tn=pn(Vt);$e.rect=tn;var en=ln(O),nn=ln(_t),rn=ln(We),on=ln(K),an=ln(Qt),un=ln(te),sn=ln(Z),cn=ln(Be);function ln(t){return t&&t.__esModule?t:{default:t}}function fn(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return fn=function(){return t},t}function pn(t){if(t&&t.__esModule)return t;if(null===t||"object"!==He(t)&&"function"!=typeof t)return{default:t};var e=fn();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}var dn={};function vn(t){return(vn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(dn,"__esModule",{value:!0}),dn.default=void 0;var yn,hn=wn(z),gn=wn(Dt),bn=(yn=K)&&yn.__esModule?yn:{default:yn},mn=wn(w);function On(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return On=function(){return t},t}function wn(t){if(t&&t.__esModule)return t;if(null===t||"object"!==vn(t)&&"function"!=typeof t)return{default:t};var e=On();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function _n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Pn(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var xn=function(){function e(t){var a=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),Pn(this,"list",[]),Pn(this,"selectorMap",{}),Pn(this,"scope",void 0),(this.scope=t).addListeners({"interactable:unset":function(t){var e=t.interactable,n=e.target,r=e._context,o=mn.string(n)?a.selectorMap[n]:n[a.scope.id],i=o.findIndex(function(t){return t.context===r});o[i]&&(o[i].context=null,o[i].interactable=null),o.splice(i,1)}})}var t,n,r;return t=e,(n=[{key:"new",value:function(t,e){e=(0,bn.default)(e||{},{actions:this.scope.actions});var n=new this.scope.Interactable(t,e,this.scope.document,this.scope.events),r={context:n._context,interactable:n};return this.scope.addDocument(n._doc),this.list.push(n),mn.string(t)?(this.selectorMap[t]||(this.selectorMap[t]=[]),this.selectorMap[t].push(r)):(n.target[this.scope.id]||Object.defineProperty(t,this.scope.id,{value:[],configurable:!0}),t[this.scope.id].push(r)),this.scope.fire("interactable:new",{target:t,options:e,interactable:n,win:this.scope._win}),n}},{key:"get",value:function(e,t){var n=t&&t.context||this.scope.document,r=mn.string(e),o=r?this.selectorMap[e]:e[this.scope.id];if(!o)return null;var i=hn.find(o,function(t){return t.context===n&&(r||t.interactable.inContext(e))});return i&&i.interactable}},{key:"forEachMatch",value:function(t,e){for(var n=0;n<this.list.length;n++){var r=this.list[n],o=void 0;if((mn.string(r.target)?mn.element(t)&&gn.matchesSelector(t,r.target):t===r.target)&&r.inContext(t)&&(o=e(r)),void 0!==o)return o}}}])&&_n(t.prototype,n),r&&_n(t,r),e}();dn.default=xn;var Sn={};function jn(t){return(jn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Sn,"__esModule",{value:!0}),Sn.default=Sn.FakeEvent=void 0;var Mn=Rn(z),kn=Rn(Dt),En=An(K),Tn=Rn(w),Dn=An(ge),In=Rn(Oe);function An(t){return t&&t.__esModule?t:{default:t}}function zn(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return zn=function(){return t},t}function Rn(t){if(t&&t.__esModule)return t;if(null===t||"object"!==jn(t)&&"function"!=typeof t)return{default:t};var e=zn();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function Cn(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Wn(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Fn(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return Xn(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Xn(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Xn(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var Yn=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),Wn(this,"currentTarget",void 0),Wn(this,"originalEvent",void 0),this.originalEvent=t,(0,Dn.default)(this,t)}var t,n,r;return t=e,(n=[{key:"preventOriginalDefault",value:function(){this.originalEvent.preventDefault()}},{key:"stopPropagation",value:function(){this.originalEvent.stopPropagation()}},{key:"stopImmediatePropagation",value:function(){this.originalEvent.stopImmediatePropagation()}}])&&Cn(t.prototype,n),r&&Cn(t,r),e}();function Nn(t){if(!Tn.object(t))return{capture:!!t,passive:!1};var e=(0,En.default)({},t);return e.capture=!!t.capture,e.passive=!!t.passive,e}Sn.FakeEvent=Yn;var Ln={id:"events",install:function(t){var f=[],b={},l=[],p={add:d,remove:g,addDelegate:function(e,n,t,r,o){var i=Nn(o);if(!b[t]){b[t]=[];for(var a=0;a<l.length;a++){var u=l[a];d(u,t,m),d(u,t,O,!0)}}var s=b[t],c=Mn.find(s,function(t){return t.selector===e&&t.context===n});c||(c={selector:e,context:n,listeners:[]},s.push(c));c.listeners.push([r,i])},removeDelegate:function(t,e,n,r,o){var i,a=Nn(o),u=b[n],s=!1;if(!u)return;for(i=u.length-1;0<=i;i--){var c=u[i];if(c.selector===t&&c.context===e){for(var l=c.listeners,f=l.length-1;0<=f;f--){var p=Fn(l[f],2),d=p[0],v=p[1],y=v.capture,h=v.passive;if(d===r&&y===a.capture&&h===a.passive){l.splice(f,1),l.length||(u.splice(i,1),g(e,n,m),g(e,n,O,!0)),s=!0;break}}if(s)break}}},delegateListener:m,delegateUseCapture:O,delegatedEvents:b,documents:l,targets:f,supportsOptions:!1,supportsPassive:!1};function d(e,t,n,r){var o=Nn(r),i=Mn.find(f,function(t){return t.eventTarget===e});i||(i={eventTarget:e,events:{}},f.push(i)),i.events[t]||(i.events[t]=[]),e.addEventListener&&!Mn.contains(i.events[t],n)&&(e.addEventListener(t,n,p.supportsOptions?o:o.capture),i.events[t].push(n))}function g(e,t,n,r){var o=Nn(r),i=Mn.findIndex(f,function(t){return t.eventTarget===e}),a=f[i];if(a&&a.events)if("all"!==t){var u=!1,s=a.events[t];if(s){if("all"===n){for(var c=s.length-1;0<=c;c--)g(e,t,s[c],o);return}for(var l=0;l<s.length;l++)if(s[l]===n){e.removeEventListener(t,n,p.supportsOptions?o:o.capture),s.splice(l,1),0===s.length&&(delete a.events[t],u=!0);break}}u&&!Object.keys(a.events).length&&f.splice(i,1)}else for(t in a.events)a.events.hasOwnProperty(t)&&g(e,t,"all")}function m(t,e){for(var n=Nn(e),r=new Yn(t),o=b[t.type],i=Fn(In.getEventTargets(t),1)[0],a=i;Tn.element(a);){for(var u=0;u<o.length;u++){var s=o[u],c=s.selector,l=s.context;if(kn.matchesSelector(a,c)&&kn.nodeContains(l,i)&&kn.nodeContains(l,a)){var f=s.listeners;r.currentTarget=a;for(var p=0;p<f.length;p++){var d=Fn(f[p],2),v=d[0],y=d[1],h=y.capture,g=y.passive;h===n.capture&&g===n.passive&&v(r)}}}a=kn.parentNode(a)}}function O(t){return m.call(this,t,!0)}return t.document.createElement("div").addEventListener("test",null,{get capture(){return p.supportsOptions=!0},get passive(){return p.supportsPassive=!0}}),t.events=p}};Sn.default=Ln;var Bn={};function Un(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(Bn,"__esModule",{value:!0}),Bn.default=Bn.PointerInfo=void 0;function Vn(t,e,n,r,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,Vn),Un(this,"id",void 0),Un(this,"pointer",void 0),Un(this,"event",void 0),Un(this,"downTime",void 0),Un(this,"downTarget",void 0),this.id=t,this.pointer=e,this.event=n,this.downTime=r,this.downTarget=o}var qn=Bn.PointerInfo=Vn;Bn.default=qn;var Gn={};function $n(t){return($n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Gn,"__esModule",{value:!0}),Object.defineProperty(Gn,"PointerInfo",{enumerable:!0,get:function(){return tr.default}}),Gn.default=Gn.Interaction=Gn._ProxyMethods=Gn._ProxyValues=void 0;var Hn,Kn,Zn,Jn,Qn=rr(ee),tr=rr(Bn),er=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==$n(t)&&"function"!=typeof t)return{default:t};var e=nr();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}($e);function nr(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return nr=function(){return t},t}function rr(t){return t&&t.__esModule?t:{default:t}}function or(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function ir(t,e,n){return e&&or(t.prototype,e),n&&or(t,n),t}function ar(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Gn._ProxyValues=Hn,(Kn=Hn||(Gn._ProxyValues=Hn={})).interactable="",Kn.element="",Kn.prepared="",Kn.pointerIsDown="",Kn.pointerWasMoved="",Kn._proxy="",Gn._ProxyMethods=Zn,(Jn=Zn||(Gn._ProxyMethods=Zn={})).start="",Jn.move="",Jn.end="",Jn.stop="",Jn.interacting="";var ur=0,sr=function(){function c(t){var e=this,n=t.pointerType,r=t.scopeFire;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),ar(this,"interactable",null),ar(this,"element",null),ar(this,"rect",void 0),ar(this,"_rects",void 0),ar(this,"edges",void 0),ar(this,"_scopeFire",void 0),ar(this,"prepared",{name:null,axis:null,edges:null}),ar(this,"pointerType",void 0),ar(this,"pointers",[]),ar(this,"downEvent",null),ar(this,"downPointer",{}),ar(this,"_latestPointer",{pointer:null,event:null,eventTarget:null}),ar(this,"prevEvent",null),ar(this,"pointerIsDown",!1),ar(this,"pointerWasMoved",!1),ar(this,"_interacting",!1),ar(this,"_ending",!1),ar(this,"_stopped",!0),ar(this,"_proxy",null),ar(this,"simulation",null),ar(this,"doMove",er.warnOnce(function(t){this.move(t)},"The interaction.doMove() method has been renamed to interaction.move()")),ar(this,"coords",{start:er.pointer.newCoords(),prev:er.pointer.newCoords(),cur:er.pointer.newCoords(),delta:er.pointer.newCoords(),velocity:er.pointer.newCoords()}),ar(this,"_id",ur++),this._scopeFire=r,this.pointerType=n;var o=this;this._proxy={};function i(t){Object.defineProperty(e._proxy,t,{get:function(){return o[t]}})}for(var a in Hn)i(a);function u(t){Object.defineProperty(e._proxy,t,{value:function(){return o[t].apply(o,arguments)}})}for(var s in Zn)u(s);this._scopeFire("interactions:new",{interaction:this})}return ir(c,[{key:"pointerMoveTolerance",get:function(){return 1}}]),ir(c,[{key:"pointerDown",value:function(t,e,n){var r=this.updatePointer(t,e,n,!0),o=this.pointers[r];this._scopeFire("interactions:down",{pointer:t,event:e,eventTarget:n,pointerIndex:r,pointerInfo:o,type:"down",interaction:this})}},{key:"start",value:function(t,e,n){return!(this.interacting()||!this.pointerIsDown||this.pointers.length<("gesture"===t.name?2:1)||!e.options[t.name].enabled)&&(er.copyAction(this.prepared,t),this.interactable=e,this.element=n,this.rect=e.getRect(n),this.edges=this.prepared.edges?er.extend({},this.prepared.edges):{left:!0,right:!0,top:!0,bottom:!0},this._stopped=!1,this._interacting=this._doPhase({interaction:this,event:this.downEvent,phase:"start"})&&!this._stopped,this._interacting)}},{key:"pointerMove",value:function(t,e,n){this.simulation||this.modification&&this.modification.endResult||this.updatePointer(t,e,n,!1);var r,o,i=this.coords.cur.page.x===this.coords.prev.page.x&&this.coords.cur.page.y===this.coords.prev.page.y&&this.coords.cur.client.x===this.coords.prev.client.x&&this.coords.cur.client.y===this.coords.prev.client.y;this.pointerIsDown&&!this.pointerWasMoved&&(r=this.coords.cur.client.x-this.coords.start.client.x,o=this.coords.cur.client.y-this.coords.start.client.y,this.pointerWasMoved=er.hypot(r,o)>this.pointerMoveTolerance);var a=this.getPointerIndex(t),u={pointer:t,pointerIndex:a,pointerInfo:this.pointers[a],event:e,type:"move",eventTarget:n,dx:r,dy:o,duplicate:i,interaction:this};i||er.pointer.setCoordVelocity(this.coords.velocity,this.coords.delta),this._scopeFire("interactions:move",u),i||this.simulation||(this.interacting()&&(u.type=null,this.move(u)),this.pointerWasMoved&&er.pointer.copyCoords(this.coords.prev,this.coords.cur))}},{key:"move",value:function(t){t&&t.event||er.pointer.setZeroCoords(this.coords.delta),(t=er.extend({pointer:this._latestPointer.pointer,event:this._latestPointer.event,eventTarget:this._latestPointer.eventTarget,interaction:this},t||{})).phase="move",this._doPhase(t)}},{key:"pointerUp",value:function(t,e,n,r){var o=this.getPointerIndex(t);-1===o&&(o=this.updatePointer(t,e,n,!1));var i=/cancel$/i.test(e.type)?"cancel":"up";this._scopeFire("interactions:".concat(i),{pointer:t,pointerIndex:o,pointerInfo:this.pointers[o],event:e,eventTarget:n,type:i,curEventTarget:r,interaction:this}),this.simulation||this.end(e),this.pointerIsDown=!1,this.removePointer(t,e)}},{key:"documentBlur",value:function(t){this.end(t),this._scopeFire("interactions:blur",{event:t,type:"blur",interaction:this})}},{key:"end",value:function(t){var e;this._ending=!0,t=t||this._latestPointer.event,this.interacting()&&(e=this._doPhase({event:t,interaction:this,phase:"end"})),!(this._ending=!1)===e&&this.stop()}},{key:"currentAction",value:function(){return this._interacting?this.prepared.name:null}},{key:"interacting",value:function(){return this._interacting}},{key:"stop",value:function(){this._scopeFire("interactions:stop",{interaction:this}),this.interactable=this.element=null,this._interacting=!1,this._stopped=!0,this.prepared.name=this.prevEvent=null}},{key:"getPointerIndex",value:function(t){var e=er.pointer.getPointerId(t);return"mouse"===this.pointerType||"pen"===this.pointerType?this.pointers.length-1:er.arr.findIndex(this.pointers,function(t){return t.id===e})}},{key:"getPointerInfo",value:function(t){return this.pointers[this.getPointerIndex(t)]}},{key:"updatePointer",value:function(t,e,n,r){var o=er.pointer.getPointerId(t),i=this.getPointerIndex(t),a=this.pointers[i];return r=!1!==r&&(r||/(down|start)$/i.test(e.type)),a?a.pointer=t:(a=new tr.default(o,t,e,null,null),i=this.pointers.length,this.pointers.push(a)),er.pointer.setCoords(this.coords.cur,this.pointers.map(function(t){return t.pointer}),this._now()),er.pointer.setCoordDeltas(this.coords.delta,this.coords.prev,this.coords.cur),r&&(this.pointerIsDown=!0,a.downTime=this.coords.cur.timeStamp,a.downTarget=n,er.pointer.pointerExtend(this.downPointer,t),this.interacting()||(er.pointer.copyCoords(this.coords.start,this.coords.cur),er.pointer.copyCoords(this.coords.prev,this.coords.cur),this.downEvent=e,this.pointerWasMoved=!1)),this._updateLatestPointer(t,e,n),this._scopeFire("interactions:update-pointer",{pointer:t,event:e,eventTarget:n,down:r,pointerInfo:a,pointerIndex:i,interaction:this}),i}},{key:"removePointer",value:function(t,e){var n=this.getPointerIndex(t);if(-1!==n){var r=this.pointers[n];this._scopeFire("interactions:remove-pointer",{pointer:t,event:e,eventTarget:null,pointerIndex:n,pointerInfo:r,interaction:this}),this.pointers.splice(n,1)}}},{key:"_updateLatestPointer",value:function(t,e,n){this._latestPointer.pointer=t,this._latestPointer.event=e,this._latestPointer.eventTarget=n}},{key:"destroy",value:function(){this._latestPointer.pointer=null,this._latestPointer.event=null,this._latestPointer.eventTarget=null}},{key:"_createPreparedEvent",value:function(t,e,n,r){return new Qn.default(this,t,this.prepared.name,e,this.element,n,r)}},{key:"_fireEvent",value:function(t){this.interactable.fire(t),(!this.prevEvent||t.timeStamp>=this.prevEvent.timeStamp)&&(this.prevEvent=t)}},{key:"_doPhase",value:function(t){var e=t.event,n=t.phase,r=t.preEnd,o=t.type,i=this.rect;if(i&&"move"===n&&(er.rect.addEdges(this.edges,i,this.coords.delta[this.interactable.options.deltaSource]),i.width=i.right-i.left,i.height=i.bottom-i.top),!1===this._scopeFire("interactions:before-action-".concat(n),t))return!1;var a=t.iEvent=this._createPreparedEvent(e,n,r,o);return this._scopeFire("interactions:action-".concat(n),t),"start"===n&&(this.prevEvent=a),this._fireEvent(a),this._scopeFire("interactions:after-action-".concat(n),t),!0}},{key:"_now",value:function(){return Date.now()}}]),c}(),cr=Gn.Interaction=sr;Gn.default=cr;var lr={};function fr(t){return(fr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(lr,"__esModule",{value:!0}),lr.install=hr,lr.default=void 0;var pr=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==fr(t)&&"function"!=typeof t)return{default:t};var e=dr();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w);function dr(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return dr=function(){return t},t}function vr(t){return/^(always|never|auto)$/.test(t)?(this.options.preventDefault=t,this):pr.bool(t)?(this.options.preventDefault=t?"always":"never",this):this.options.preventDefault}function yr(t){var e=t.interaction,n=t.event;e.interactable&&e.interactable.checkAndPreventDefault(n)}function hr(r){var t=r.Interactable;t.prototype.preventDefault=vr,t.prototype.checkAndPreventDefault=function(t){return function(t,e,n){var r=t.options.preventDefault;if("never"!==r)if("always"!==r){if(e.events.supportsPassive&&/^touch(start|move)$/.test(n.type)){var o=(0,O.getWindow)(n.target).document,i=e.getDocOptions(o);if(!i||!i.events||!1!==i.events.passive)return}/^(mouse|pointer|touch)*(down|start)/i.test(n.type)||pr.element(n.target)&&(0,Dt.matchesSelector)(n.target,"input,select,textarea,[contenteditable=true],[contenteditable=true] *")||n.preventDefault()}else n.preventDefault()}(this,r,t)},r.interactions.docEvents.push({type:"dragstart",listener:function(t){for(var e=0;e<r.interactions.list.length;e++){var n=r.interactions.list[e];if(n.element&&(n.element===t.target||(0,Dt.nodeContains)(n.element,t.target)))return void n.interactable.checkAndPreventDefault(t)}}})}var gr={id:"core/interactablePreventDefault",install:hr,listeners:["down","move","up","cancel"].reduce(function(t,e){return t["interactions:".concat(e)]=yr,t},{})};lr.default=gr;var br={};function mr(t){return(mr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(br,"__esModule",{value:!0}),br.default=void 0;var Or=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==mr(t)&&"function"!=typeof t)return{default:t};var e=wr();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(Dt);function wr(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return wr=function(){return t},t}var _r={methodOrder:["simulationResume","mouseOrPen","hasPointer","idle"],search:function(t){for(var e=0;e<_r.methodOrder.length;e++){var n;n=_r.methodOrder[e];var r=_r[n](t);if(r)return r}return null},simulationResume:function(t){var e=t.pointerType,n=t.eventType,r=t.eventTarget,o=t.scope;if(!/down|start/i.test(n))return null;for(var i=0;i<o.interactions.list.length;i++){var a=o.interactions.list[i],u=r;if(a.simulation&&a.simulation.allowResume&&a.pointerType===e)for(;u;){if(u===a.element)return a;u=Or.parentNode(u)}}return null},mouseOrPen:function(t){var e,n=t.pointerId,r=t.pointerType,o=t.eventType,i=t.scope;if("mouse"!==r&&"pen"!==r)return null;for(var a=0;a<i.interactions.list.length;a++){var u=i.interactions.list[a];if(u.pointerType===r){if(u.simulation&&!Pr(u,n))continue;if(u.interacting())return u;e=e||u}}if(e)return e;for(var s=0;s<i.interactions.list.length;s++){var c=i.interactions.list[s];if(!(c.pointerType!==r||/down/i.test(o)&&c.simulation))return c}return null},hasPointer:function(t){for(var e=t.pointerId,n=t.scope,r=0;r<n.interactions.list.length;r++){var o=n.interactions.list[r];if(Pr(o,e))return o}return null},idle:function(t){for(var e=t.pointerType,n=t.scope,r=0;r<n.interactions.list.length;r++){var o=n.interactions.list[r];if(1===o.pointers.length){var i=o.interactable;if(i&&(!i.options.gesture||!i.options.gesture.enabled))continue}else if(2<=o.pointers.length)continue;if(!o.interacting()&&e===o.pointerType)return o}return null}};function Pr(t,e){return t.pointers.some(function(t){return t.id===e})}var xr=_r;br.default=xr;var Sr={};function jr(t){return(jr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Sr,"__esModule",{value:!0}),Sr.default=void 0;var Mr=Dr(v),kr=Dr(W),Er=(Dr(k({})),Dr(m({})),function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==jr(t)&&"function"!=typeof t)return{default:t};var e=Tr();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}($e));function Tr(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Tr=function(){return t},t}function Dr(t){return t&&t.__esModule?t:{default:t}}function Ir(t,e){for(var n=0;n<t.slice().length;n++){r=t.slice()[n];var r,o=r.dropzone,i=r.element;e.dropzone=o,e.target=i,o.fire(e),e.propagationStopped=e.immediatePropagationStopped=!1}}function Ar(t,e){for(var n=function(t,e){for(var n=t.interactables,r=[],o=0;o<n.list.length;o++){var i=n.list[o];if(i.options.drop.enabled){var a=i.options.drop.accept;if(!(Er.is.element(a)&&a!==e||Er.is.string(a)&&!Er.dom.matchesSelector(e,a)||Er.is.func(a)&&!a({dropzone:i,draggableElement:e})))for(var u=Er.is.string(i.target)?i._context.querySelectorAll(i.target):Er.is.array(i.target)?i.target:[i.target],s=0;s<u.length;s++){var c;c=u[s];c!==e&&r.push({dropzone:i,element:c})}}}return r}(t,e),r=0;r<n.length;r++){var o;o=n[r];o.rect=o.dropzone.getRect(o.element)}return n}function zr(t,e,n){for(var r=t.dropState,o=t.interactable,i=t.element,a=[],u=0;u<r.activeDrops.length;u++){s=r.activeDrops[u];var s,c=s.dropzone,l=s.element,f=s.rect;a.push(c.dropCheck(e,n,o,i,l,f)?l:null)}var p=Er.dom.indexOfDeepestElement(a);return r.activeDrops[p]||null}function Rr(t,e,n){var r=t.dropState,o={enter:null,leave:null,activate:null,deactivate:null,move:null,drop:null};return"dragstart"===n.type&&(o.activate=new kr.default(r,n,"dropactivate"),o.activate.target=null,o.activate.dropzone=null),"dragend"===n.type&&(o.deactivate=new kr.default(r,n,"dropdeactivate"),o.deactivate.target=null,o.deactivate.dropzone=null),r.rejected||(r.cur.element!==r.prev.element&&(r.prev.dropzone&&(o.leave=new kr.default(r,n,"dragleave"),n.dragLeave=o.leave.target=r.prev.element,n.prevDropzone=o.leave.dropzone=r.prev.dropzone),r.cur.dropzone&&(o.enter=new kr.default(r,n,"dragenter"),n.dragEnter=r.cur.element,n.dropzone=r.cur.dropzone)),"dragend"===n.type&&r.cur.dropzone&&(o.drop=new kr.default(r,n,"drop"),n.dropzone=r.cur.dropzone,n.relatedTarget=r.cur.element),"dragmove"===n.type&&r.cur.dropzone&&(o.move=new kr.default(r,n,"dropmove"),(o.move.dragmove=n).dropzone=r.cur.dropzone)),o}function Cr(t,e){var n=t.dropState,r=n.activeDrops,o=n.cur,i=n.prev;e.leave&&i.dropzone.fire(e.leave),e.move&&o.dropzone.fire(e.move),e.enter&&o.dropzone.fire(e.enter),e.drop&&o.dropzone.fire(e.drop),e.deactivate&&Ir(r,e.deactivate),n.prev.dropzone=o.dropzone,n.prev.element=o.element}function Wr(t,e){var n=t.interaction,r=t.iEvent,o=t.event;if("dragmove"===r.type||"dragend"===r.type){var i=n.dropState;e.dynamicDrop&&(i.activeDrops=Ar(e,n.element));var a=r,u=zr(n,a,o);i.rejected=i.rejected&&!!u&&u.dropzone===i.cur.dropzone&&u.element===i.cur.element,i.cur.dropzone=u&&u.dropzone,i.cur.element=u&&u.element,i.events=Rr(n,0,a)}}var Fr={id:"actions/drop",install:function(e){var t=e.actions,n=e.interactStatic,r=e.Interactable,o=e.defaults;e.usePlugin(Mr.default),r.prototype.dropzone=function(t){return function(t,e){if(Er.is.object(e)){if(t.options.drop.enabled=!1!==e.enabled,e.listeners){var n=Er.normalizeListeners(e.listeners),r=Object.keys(n).reduce(function(t,e){return t[/^(enter|leave)/.test(e)?"drag".concat(e):/^(activate|deactivate|move)/.test(e)?"drop".concat(e):e]=n[e],t},{});t.off(t.options.drop.listeners),t.on(r),t.options.drop.listeners=r}return Er.is.func(e.ondrop)&&t.on("drop",e.ondrop),Er.is.func(e.ondropactivate)&&t.on("dropactivate",e.ondropactivate),Er.is.func(e.ondropdeactivate)&&t.on("dropdeactivate",e.ondropdeactivate),Er.is.func(e.ondragenter)&&t.on("dragenter",e.ondragenter),Er.is.func(e.ondragleave)&&t.on("dragleave",e.ondragleave),Er.is.func(e.ondropmove)&&t.on("dropmove",e.ondropmove),/^(pointer|center)$/.test(e.overlap)?t.options.drop.overlap=e.overlap:Er.is.number(e.overlap)&&(t.options.drop.overlap=Math.max(Math.min(1,e.overlap),0)),"accept"in e&&(t.options.drop.accept=e.accept),"checker"in e&&(t.options.drop.checker=e.checker),t}if(Er.is.bool(e))return t.options.drop.enabled=e,t;return t.options.drop}(this,t)},r.prototype.dropCheck=function(t,e,n,r,o,i){return function(t,e,n,r,o,i,a){var u=!1;if(!(a=a||t.getRect(i)))return!!t.options.drop.checker&&t.options.drop.checker(e,n,u,t,i,r,o);var s=t.options.drop.overlap;if("pointer"===s){var c=Er.getOriginXY(r,o,"drag"),l=Er.pointer.getPageXY(e);l.x+=c.x,l.y+=c.y;var f=l.x>a.left&&l.x<a.right,p=l.y>a.top&&l.y<a.bottom;u=f&&p}var d=r.getRect(o);if(d&&"center"===s){var v=d.left+d.width/2,y=d.top+d.height/2;u=v>=a.left&&v<=a.right&&y>=a.top&&y<=a.bottom}if(d&&Er.is.number(s)){var h=Math.max(0,Math.min(a.right,d.right)-Math.max(a.left,d.left))*Math.max(0,Math.min(a.bottom,d.bottom)-Math.max(a.top,d.top))/(d.width*d.height);u=s<=h}t.options.drop.checker&&(u=t.options.drop.checker(e,n,u,t,i,r,o));return u}(this,t,e,n,r,o,i)},n.dynamicDrop=function(t){return Er.is.bool(t)?(e.dynamicDrop=t,n):e.dynamicDrop},Er.extend(t.phaselessTypes,{dragenter:!0,dragleave:!0,dropactivate:!0,dropdeactivate:!0,dropmove:!0,drop:!0}),t.methodDict.drop="dropzone",e.dynamicDrop=!1,o.actions.drop=Fr.defaults},listeners:{"interactions:before-action-start":function(t){var e=t.interaction;"drag"===e.prepared.name&&(e.dropState={cur:{dropzone:null,element:null},prev:{dropzone:null,element:null},rejected:null,events:null,activeDrops:[]})},"interactions:after-action-start":function(t,e){var n=t.interaction,r=(t.event,t.iEvent);if("drag"===n.prepared.name){var o=n.dropState;o.activeDrops=null,o.events=null,o.activeDrops=Ar(e,n.element),o.events=Rr(n,0,r),o.events.activate&&(Ir(o.activeDrops,o.events.activate),e.fire("actions/drop:start",{interaction:n,dragEvent:r}))}},"interactions:action-move":Wr,"interactions:action-end":Wr,"interactions:after-action-move":function(t,e){var n=t.interaction,r=t.iEvent;"drag"===n.prepared.name&&(Cr(n,n.dropState.events),e.fire("actions/drop:move",{interaction:n,dragEvent:r}),n.dropState.events={})},"interactions:after-action-end":function(t,e){var n=t.interaction,r=t.iEvent;"drag"===n.prepared.name&&(Cr(n,n.dropState.events),e.fire("actions/drop:end",{interaction:n,dragEvent:r}))},"interactions:stop":function(t){var e=t.interaction;if("drag"===e.prepared.name){var n=e.dropState;n&&(n.activeDrops=null,n.events=null,n.cur.dropzone=null,n.cur.element=null,n.prev.dropzone=null,n.prev.element=null,n.rejected=!1)}}},getActiveDrops:Ar,getDrop:zr,getDropEvents:Rr,fireDropEvents:Cr,defaults:{enabled:!1,accept:null,overlap:"pointer"}},Xr=Fr;Sr.default=Xr;var Yr={};function Nr(t){return(Nr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Yr,"__esModule",{value:!0}),Yr.default=void 0;var Lr=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Nr(t)&&"function"!=typeof t)return{default:t};var e=Br();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}($e);function Br(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Br=function(){return t},t}function Ur(t){var e=t.interaction,n=t.iEvent,r=t.phase;if("gesture"===e.prepared.name){var o=e.pointers.map(function(t){return t.pointer}),i="start"===r,a="end"===r,u=e.interactable.options.deltaSource;if(n.touches=[o[0],o[1]],i)n.distance=Lr.pointer.touchDistance(o,u),n.box=Lr.pointer.touchBBox(o),n.scale=1,n.ds=0,n.angle=Lr.pointer.touchAngle(o,u),n.da=0,e.gesture.startDistance=n.distance,e.gesture.startAngle=n.angle;else if(a){var s=e.prevEvent;n.distance=s.distance,n.box=s.box,n.scale=s.scale,n.ds=0,n.angle=s.angle,n.da=0}else n.distance=Lr.pointer.touchDistance(o,u),n.box=Lr.pointer.touchBBox(o),n.scale=n.distance/e.gesture.startDistance,n.angle=Lr.pointer.touchAngle(o,u),n.ds=n.scale-e.gesture.scale,n.da=n.angle-e.gesture.angle;e.gesture.distance=n.distance,e.gesture.angle=n.angle,Lr.is.number(n.scale)&&n.scale!==1/0&&!isNaN(n.scale)&&(e.gesture.scale=n.scale)}}var Vr={id:"actions/gesture",before:["actions/drag","actions/resize"],install:function(t){var e=t.actions,n=t.Interactable,r=t.defaults;n.prototype.gesturable=function(t){return Lr.is.object(t)?(this.options.gesture.enabled=!1!==t.enabled,this.setPerAction("gesture",t),this.setOnEvents("gesture",t),this):Lr.is.bool(t)?(this.options.gesture.enabled=t,this):this.options.gesture},e.map.gesture=Vr,e.methodDict.gesture="gesturable",r.actions.gesture=Vr.defaults},listeners:{"interactions:action-start":Ur,"interactions:action-move":Ur,"interactions:action-end":Ur,"interactions:new":function(t){t.interaction.gesture={angle:0,distance:0,scale:1,startAngle:0,startDistance:0}},"auto-start:check":function(t){if(!(t.interaction.pointers.length<2)){var e=t.interactable.options.gesture;if(e&&e.enabled)return!(t.action={name:"gesture"})}}},defaults:{},getCursor:function(){return""}},qr=Vr;Yr.default=qr;var Gr={};function $r(t){return($r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Gr,"__esModule",{value:!0}),Gr.default=void 0;var Hr,Kr=to(Dt),Zr=(Hr=K)&&Hr.__esModule?Hr:{default:Hr},Jr=to(w);function Qr(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Qr=function(){return t},t}function to(t){if(t&&t.__esModule)return t;if(null===t||"object"!==$r(t)&&"function"!=typeof t)return{default:t};var e=Qr();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function eo(t,e,n,r,o,i,a){if(!e)return!1;if(!0===e){var u=Jr.number(i.width)?i.width:i.right-i.left,s=Jr.number(i.height)?i.height:i.bottom-i.top;if(a=Math.min(a,("left"===t||"right"===t?u:s)/2),u<0&&("left"===t?t="right":"right"===t&&(t="left")),s<0&&("top"===t?t="bottom":"bottom"===t&&(t="top")),"left"===t)return n.x<(0<=u?i.left:i.right)+a;if("top"===t)return n.y<(0<=s?i.top:i.bottom)+a;if("right"===t)return n.x>(0<=u?i.right:i.left)-a;if("bottom"===t)return n.y>(0<=s?i.bottom:i.top)-a}return!!Jr.element(r)&&(Jr.element(e)?e===r:Kr.matchesUpTo(r,e,o))}function no(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.resizeAxes){var r=e;n.interactable.options.resize.square?("y"===n.resizeAxes?r.delta.x=r.delta.y:r.delta.y=r.delta.x,r.axes="xy"):(r.axes=n.resizeAxes,"x"===n.resizeAxes?r.delta.y=0:"y"===n.resizeAxes&&(r.delta.x=0))}}var ro={id:"actions/resize",before:["actions/drag"],install:function(e){var t=e.actions,n=e.browser,r=e.Interactable,o=e.defaults;ro.cursors=n.isIe9?{x:"e-resize",y:"s-resize",xy:"se-resize",top:"n-resize",left:"w-resize",bottom:"s-resize",right:"e-resize",topleft:"se-resize",bottomright:"se-resize",topright:"ne-resize",bottomleft:"ne-resize"}:{x:"ew-resize",y:"ns-resize",xy:"nwse-resize",top:"ns-resize",left:"ew-resize",bottom:"ns-resize",right:"ew-resize",topleft:"nwse-resize",bottomright:"nwse-resize",topright:"nesw-resize",bottomleft:"nesw-resize"},ro.defaultMargin=n.supportsTouch||n.supportsPointerEvent?20:10,r.prototype.resizable=function(t){return function(t,e,n){if(Jr.object(e))return t.options.resize.enabled=!1!==e.enabled,t.setPerAction("resize",e),t.setOnEvents("resize",e),Jr.string(e.axis)&&/^x$|^y$|^xy$/.test(e.axis)?t.options.resize.axis=e.axis:null===e.axis&&(t.options.resize.axis=n.defaults.actions.resize.axis),Jr.bool(e.preserveAspectRatio)?t.options.resize.preserveAspectRatio=e.preserveAspectRatio:Jr.bool(e.square)&&(t.options.resize.square=e.square),t;if(Jr.bool(e))return t.options.resize.enabled=e,t;return t.options.resize}(this,t,e)},t.map.resize=ro,t.methodDict.resize="resizable",o.actions.resize=ro.defaults},listeners:{"interactions:new":function(t){t.interaction.resizeAxes="xy"},"interactions:action-start":function(t){!function(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.prepared.edges){var r=e,o=n.rect;n._rects={start:(0,Zr.default)({},o),corrected:(0,Zr.default)({},o),previous:(0,Zr.default)({},o),delta:{left:0,right:0,width:0,top:0,bottom:0,height:0}},r.edges=n.prepared.edges,r.rect=n._rects.corrected,r.deltaRect=n._rects.delta}}(t),no(t)},"interactions:action-move":function(t){!function(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.prepared.edges){var r=e,o=n.interactable.options.resize.invert,i="reposition"===o||"negate"===o,a=n.rect,u=n._rects,s=u.start,c=u.corrected,l=u.delta,f=u.previous;if((0,Zr.default)(f,c),i){if((0,Zr.default)(c,a),"reposition"===o){if(c.top>c.bottom){var p=c.top;c.top=c.bottom,c.bottom=p}if(c.left>c.right){var d=c.left;c.left=c.right,c.right=d}}}else c.top=Math.min(a.top,s.bottom),c.bottom=Math.max(a.bottom,s.top),c.left=Math.min(a.left,s.right),c.right=Math.max(a.right,s.left);for(var v in c.width=c.right-c.left,c.height=c.bottom-c.top,c)l[v]=c[v]-f[v];r.edges=n.prepared.edges,r.rect=c,r.deltaRect=l}}(t),no(t)},"interactions:action-end":function(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.prepared.edges){var r=e;r.edges=n.prepared.edges,r.rect=n._rects.corrected,r.deltaRect=n._rects.delta}},"auto-start:check":function(t){var e=t.interaction,n=t.interactable,r=t.element,o=t.rect,i=t.buttons;if(o){var a=(0,Zr.default)({},e.coords.cur.page),u=n.options.resize;if(u&&u.enabled&&(!e.pointerIsDown||!/mouse|pointer/.test(e.pointerType)||0!=(i&u.mouseButtons))){if(Jr.object(u.edges)){var s={left:!1,right:!1,top:!1,bottom:!1};for(var c in s)s[c]=eo(c,u.edges[c],a,e._latestPointer.eventTarget,r,o,u.margin||ro.defaultMargin);s.left=s.left&&!s.right,s.top=s.top&&!s.bottom,(s.left||s.right||s.top||s.bottom)&&(t.action={name:"resize",edges:s})}else{var l="y"!==u.axis&&a.x>o.right-ro.defaultMargin,f="x"!==u.axis&&a.y>o.bottom-ro.defaultMargin;(l||f)&&(t.action={name:"resize",axes:(l?"x":"")+(f?"y":"")})}return!t.action&&void 0}}}},defaults:{square:!1,preserveAspectRatio:!1,axis:"xy",margin:NaN,edges:null,invert:"none"},cursors:null,getCursor:function(t){var e=t.edges,n=t.axis,r=t.name,o=ro.cursors,i=null;if(n)i=o[r+n];else if(e){for(var a="",u=["top","bottom","left","right"],s=0;s<u.length;s++){var c=u[s];e[c]&&(a+=c)}i=o[a]}return i},defaultMargin:null},oo=ro;Gr.default=oo;var io={};Object.defineProperty(io,"__esModule",{value:!0}),Object.defineProperty(io,"drag",{enumerable:!0,get:function(){return ao.default}}),Object.defineProperty(io,"drop",{enumerable:!0,get:function(){return uo.default}}),Object.defineProperty(io,"gesture",{enumerable:!0,get:function(){return so.default}}),Object.defineProperty(io,"resize",{enumerable:!0,get:function(){return co.default}}),io.default=void 0;var ao=lo(v),uo=lo(Sr),so=lo(Yr),co=lo(Gr);function lo(t){return t&&t.__esModule?t:{default:t}}var fo={id:"actions",install:function(t){t.usePlugin(so.default),t.usePlugin(co.default),t.usePlugin(ao.default),t.usePlugin(uo.default)}};io.default=fo;var po={};Object.defineProperty(po,"__esModule",{value:!0}),po.default=void 0;po.default={};var vo={};function yo(t){return(yo="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(vo,"__esModule",{value:!0}),vo.getContainer=Po,vo.getScroll=xo,vo.getScrollSize=function(t){bo.window(t)&&(t=window.document.body);return{x:t.scrollWidth,y:t.scrollHeight}},vo.getScrollSizeDelta=function(t,e){var n=t.interaction,r=t.element,o=n&&n.interactable.options[n.prepared.name].autoScroll;if(!o||!o.enabled)return e(),{x:0,y:0};var i=Po(o.container,n.interactable,r),a=xo(i);e();var u=xo(i);return{x:u.x-a.x,y:u.y-a.y}},vo.default=void 0;var ho,go=wo(Dt),bo=wo(w),mo=(ho=Be)&&ho.__esModule?ho:{default:ho};function Oo(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Oo=function(){return t},t}function wo(t){if(t&&t.__esModule)return t;if(null===t||"object"!==yo(t)&&"function"!=typeof t)return{default:t};var e=Oo();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}var _o={defaults:{enabled:!1,margin:60,container:null,speed:300},now:Date.now,interaction:null,i:0,x:0,y:0,isScrolling:!1,prevTime:0,margin:0,speed:0,start:function(t){_o.isScrolling=!0,mo.default.cancel(_o.i),(t.autoScroll=_o).interaction=t,_o.prevTime=_o.now(),_o.i=mo.default.request(_o.scroll)},stop:function(){_o.isScrolling=!1,_o.interaction&&(_o.interaction.autoScroll=null),mo.default.cancel(_o.i)},scroll:function(){var t=_o.interaction,e=t.interactable,n=t.element,r=t.prepared.name,o=e.options[r].autoScroll,i=Po(o.container,e,n),a=_o.now(),u=(a-_o.prevTime)/1e3,s=o.speed*u;if(1<=s){var c={x:_o.x*s,y:_o.y*s};if(c.x||c.y){var l=xo(i);bo.window(i)?i.scrollBy(c.x,c.y):i&&(i.scrollLeft+=c.x,i.scrollTop+=c.y);var f=xo(i),p={x:f.x-l.x,y:f.y-l.y};(p.x||p.y)&&e.fire({type:"autoscroll",target:n,interactable:e,delta:p,interaction:t,container:i})}_o.prevTime=a}_o.isScrolling&&(mo.default.cancel(_o.i),_o.i=mo.default.request(_o.scroll))},check:function(t,e){var n=t.options;return n[e].autoScroll&&n[e].autoScroll.enabled},onInteractionMove:function(t){var e=t.interaction,n=t.pointer;if(e.interacting()&&_o.check(e.interactable,e.prepared.name))if(e.simulation)_o.x=_o.y=0;else{var r,o,i,a,u=e.interactable,s=e.element,c=e.prepared.name,l=u.options[c].autoScroll,f=Po(l.container,u,s);if(bo.window(f))a=n.clientX<_o.margin,r=n.clientY<_o.margin,o=n.clientX>f.innerWidth-_o.margin,i=n.clientY>f.innerHeight-_o.margin;else{var p=go.getElementClientRect(f);a=n.clientX<p.left+_o.margin,r=n.clientY<p.top+_o.margin,o=n.clientX>p.right-_o.margin,i=n.clientY>p.bottom-_o.margin}_o.x=o?1:a?-1:0,_o.y=i?1:r?-1:0,_o.isScrolling||(_o.margin=l.margin,_o.speed=l.speed,_o.start(e))}}};function Po(t,e,n){return(bo.string(t)?(0,Vt.getStringOptionResult)(t,e,n):t)||(0,O.getWindow)(n)}function xo(t){return bo.window(t)&&(t=window.document.body),{x:t.scrollLeft,y:t.scrollTop}}var So={id:"auto-scroll",install:function(t){var e=t.defaults,n=t.actions;(t.autoScroll=_o).now=function(){return t.now()},n.phaselessTypes.autoscroll=!0,e.perAction.autoScroll=_o.defaults},listeners:{"interactions:new":function(t){t.interaction.autoScroll=null},"interactions:destroy":function(t){t.interaction.autoScroll=null,_o.stop(),_o.interaction&&(_o.interaction=null)},"interactions:stop":_o.stop,"interactions:action-move":function(t){return _o.onInteractionMove(t)}}};vo.default=So;var jo={};function Mo(t){return(Mo="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(jo,"__esModule",{value:!0}),jo.default=void 0;var ko=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Mo(t)&&"function"!=typeof t)return{default:t};var e=Eo();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w);function Eo(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Eo=function(){return t},t}function To(t){return ko.bool(t)?(this.options.styleCursor=t,this):null===t?(delete this.options.styleCursor,this):this.options.styleCursor}function Do(t){return ko.func(t)?(this.options.actionChecker=t,this):null===t?(delete this.options.actionChecker,this):this.options.actionChecker}var Io={id:"auto-start/interactableMethods",install:function(d){var t=d.Interactable;t.prototype.getAction=function(t,e,n,r){var o,i,a,u,s,c,l,f,p=(i=e,a=n,u=r,s=d,c=(o=this).getRect(u),l=i.buttons||{0:1,1:4,3:8,4:16}[i.button],f={action:null,interactable:o,interaction:a,element:u,rect:c,buttons:l},s.fire("auto-start:check",f),f.action);return this.options.actionChecker?this.options.actionChecker(t,e,p,this,r,n):p},t.prototype.ignoreFrom=(0,$e.warnOnce)(function(t){return this._backCompatOption("ignoreFrom",t)},"Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."),t.prototype.allowFrom=(0,$e.warnOnce)(function(t){return this._backCompatOption("allowFrom",t)},"Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."),t.prototype.actionChecker=Do,t.prototype.styleCursor=To}};jo.default=Io;var Ao={};function zo(t){return(zo="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Ao,"__esModule",{value:!0}),Ao.default=void 0;var Ro,Co=(Ro=jo)&&Ro.__esModule?Ro:{default:Ro},Wo=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==zo(t)&&"function"!=typeof t)return{default:t};var e=Fo();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}($e);function Fo(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Fo=function(){return t},t}function Xo(t,e,n,r,o){return e.testIgnoreAllow(e.options[t.name],n,r)&&e.options[t.name].enabled&&Bo(e,n,t,o)?t:null}function Yo(t,e,n,r,o,i,a){for(var u=0,s=r.length;u<s;u++){var c=r[u],l=o[u],f=c.getAction(e,n,t,l);if(f){var p=Xo(f,c,l,i,a);if(p)return{action:p,interactable:c,element:l}}}return{action:null,interactable:null,element:null}}function No(t,e,n,r,o){var i=[],a=[],u=r;function s(t){i.push(t),a.push(u)}for(;Wo.is.element(u);){i=[],a=[],o.interactables.forEachMatch(u,s);var c=Yo(t,e,n,i,a,r,o);if(c.action&&!c.interactable.options[c.action.name].manualStart)return c;u=Wo.dom.parentNode(u)}return{action:null,interactable:null,element:null}}function Lo(t,e,n){var r=e.action,o=e.interactable,i=e.element;r=r||{name:null},t.interactable=o,t.element=i,Wo.copyAction(t.prepared,r),t.rect=o&&r.name?o.getRect(i):null,qo(t,n),n.fire("autoStart:prepared",{interaction:t})}function Bo(t,e,n,r){var o=t.options,i=o[n.name].max,a=o[n.name].maxPerElement,u=r.autoStart.maxInteractions,s=0,c=0,l=0;if(!(i&&a&&u))return!1;for(var f=0;f<r.interactions.list.length;f++){var p=r.interactions.list[f],d=p.prepared.name;if(p.interacting()){if(u<=++s)return!1;if(p.interactable===t){if(i<=(c+=d===n.name?1:0))return!1;if(p.element===e&&(l++,d===n.name&&a<=l))return!1}}}return 0<u}function Uo(t,e){return Wo.is.number(t)?(e.autoStart.maxInteractions=t,this):e.autoStart.maxInteractions}function Vo(t,e,n){var r=n.autoStart.cursorElement;r&&r!==t&&(r.style.cursor=""),t.ownerDocument.documentElement.style.cursor=e,t.style.cursor=e,n.autoStart.cursorElement=e?t:null}function qo(t,e){var n=t.interactable,r=t.element,o=t.prepared;if("mouse"===t.pointerType&&n&&n.options.styleCursor){var i="";if(o.name){var a=n.options[o.name].cursorChecker;i=Wo.is.func(a)?a(o,n,r,t._interacting):e.actions.map[o.name].getCursor(o)}Vo(t.element,i||"",e)}else e.autoStart.cursorElement&&Vo(e.autoStart.cursorElement,"",e)}var Go={id:"auto-start/base",before:["actions","actions/drag","actions/resize","actions/gesture"],install:function(e){var t=e.interactStatic,n=e.defaults;e.usePlugin(Co.default),n.base.actionChecker=null,n.base.styleCursor=!0,Wo.extend(n.perAction,{manualStart:!1,max:1/0,maxPerElement:1,allowFrom:null,ignoreFrom:null,mouseButtons:1}),t.maxInteractions=function(t){return Uo(t,e)},e.autoStart={maxInteractions:1/0,withinInteractionLimit:Bo,cursorElement:null}},listeners:{"interactions:down":function(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget;n.interacting()||Lo(n,No(n,r,o,i,e),e)},"interactions:move":function(t,e){var n,r,o,i,a,u;r=e,o=(n=t).interaction,i=n.pointer,a=n.event,u=n.eventTarget,"mouse"!==o.pointerType||o.pointerIsDown||o.interacting()||Lo(o,No(o,i,a,u,r),r),function(t,e){var n=t.interaction;if(n.pointerIsDown&&!n.interacting()&&n.pointerWasMoved&&n.prepared.name){e.fire("autoStart:before-start",t);var r=n.interactable,o=n.prepared.name;o&&r&&(r.options[o].manualStart||!Bo(r,n.element,n.prepared,e)?n.stop():(n.start(n.prepared,r,n.element),qo(n,e)))}}(t,e)},"interactions:stop":function(t,e){var n=t.interaction,r=n.interactable;r&&r.options.styleCursor&&Vo(n.element,"",e)}},maxInteractions:Uo,withinInteractionLimit:Bo,validateAction:Xo};Ao.default=Go;var $o={};function Ho(t){return(Ho="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty($o,"__esModule",{value:!0}),$o.default=void 0;var Ko,Zo=(Ko=Ao)&&Ko.__esModule?Ko:{default:Ko},Jo=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Ho(t)&&"function"!=typeof t)return{default:t};var e=Qo();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w);function Qo(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Qo=function(){return t},t}var ti={id:"auto-start/dragAxis",listeners:{"autoStart:before-start":function(t,r){var o=t.interaction,i=t.eventTarget,e=t.dx,n=t.dy;if("drag"===o.prepared.name){var a=Math.abs(e),u=Math.abs(n),s=o.interactable.options.drag,c=s.startAxis,l=u<a?"x":a<u?"y":"xy";if(o.prepared.axis="start"===s.lockAxis?l[0]:s.lockAxis,"xy"!=l&&"xy"!==c&&c!==l){o.prepared.name=null;function f(t){if(t!==o.interactable){var e=o.interactable.options.drag;if(!e.manualStart&&t.testIgnoreAllow(e,p,i)){var n=t.getAction(o.downPointer,o.downEvent,o,p);if(n&&"drag"===n.name&&function(t,e){if(!e)return;var n=e.options.drag.startAxis;return"xy"===t||"xy"===n||n===t}(l,t)&&Zo.default.validateAction(n,t,p,i,r))return t}}}for(var p=i;Jo.element(p);){var d=r.interactables.forEachMatch(p,f);if(d){o.prepared.name="drag",o.interactable=d,o.element=p;break}p=(0,Dt.parentNode)(p)}}}}}};$o.default=ti;var ei={};Object.defineProperty(ei,"__esModule",{value:!0}),ei.default=void 0;var ni,ri=(ni=Ao)&&ni.__esModule?ni:{default:ni};function oi(t){var e=t.prepared&&t.prepared.name;if(!e)return null;var n=t.interactable.options;return n[e].hold||n[e].delay}var ii={id:"auto-start/hold",install:function(t){var e=t.defaults;t.usePlugin(ri.default),e.perAction.hold=0,e.perAction.delay=0},listeners:{"interactions:new":function(t){t.interaction.autoStartHoldTimer=null},"autoStart:prepared":function(t){var e=t.interaction,n=oi(e);0<n&&(e.autoStartHoldTimer=setTimeout(function(){e.start(e.prepared,e.interactable,e.element)},n))},"interactions:move":function(t){var e=t.interaction,n=t.duplicate;e.pointerWasMoved&&!n&&clearTimeout(e.autoStartHoldTimer)},"autoStart:before-start":function(t){var e=t.interaction;0<oi(e)&&(e.prepared.name=null)}},getHoldDuration:oi};ei.default=ii;var ai={};Object.defineProperty(ai,"__esModule",{value:!0}),Object.defineProperty(ai,"autoStart",{enumerable:!0,get:function(){return ui.default}}),Object.defineProperty(ai,"dragAxis",{enumerable:!0,get:function(){return si.default}}),Object.defineProperty(ai,"hold",{enumerable:!0,get:function(){return ci.default}}),ai.default=void 0;var ui=li(Ao),si=li($o),ci=li(ei);function li(t){return t&&t.__esModule?t:{default:t}}var fi={id:"auto-start",install:function(t){t.usePlugin(ui.default),t.usePlugin(ci.default),t.usePlugin(si.default)}};ai.default=fi;var pi={};Object.defineProperty(pi,"__esModule",{value:!0}),pi.default=void 0;pi.default={};var di={};Object.defineProperty(di,"__esModule",{value:!0}),di.default=void 0;di.default={};var vi={};function yi(t){return(yi="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(vi,"__esModule",{value:!0}),vi.default=void 0;var hi,gi,bi=_i(bt),mi=(_i(K),function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==yi(t)&&"function"!=typeof t)return{default:t};var e=wi();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w)),Oi=_i(O);function wi(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return wi=function(){return t},t}function _i(t){return t&&t.__esModule?t:{default:t}}(gi=hi=hi||{}).touchAction="touchAction",gi.boxSizing="boxSizing",gi.noListeners="noListeners";var Pi={touchAction:"https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action",boxSizing:"https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing"};hi.touchAction,hi.boxSizing,hi.noListeners;function xi(t,e,n){return n.test(t.style[e]||Oi.default.window.getComputedStyle(t)[e])}var Si="dev-tools",ji={id:Si,install:function(){}};vi.default=ji;var Mi={};Object.defineProperty(Mi,"__esModule",{value:!0}),Mi.default=void 0;Mi.default={};var ki={};function Ei(t){return(Ei="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(ki,"__esModule",{value:!0}),ki.getRectOffset=Ni,ki.default=void 0;var Ti=zi(We),Di=zi(K),Ii=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Ei(t)&&"function"!=typeof t)return{default:t};var e=Ai();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(Vt);function Ai(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Ai=function(){return t},t}function zi(t){return t&&t.__esModule?t:{default:t}}function Ri(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return Ci(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Ci(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Ci(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function Wi(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Fi(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Xi=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),Fi(this,"states",[]),Fi(this,"startOffset",{left:0,right:0,top:0,bottom:0}),Fi(this,"startDelta",null),Fi(this,"result",null),Fi(this,"endResult",null),Fi(this,"edges",void 0),Fi(this,"interaction",void 0),this.interaction=t,this.result=Yi()}var t,n,r;return t=e,(n=[{key:"start",value:function(t,e){var n=t.phase,r=this.interaction,o=function(t){var n=t.interactable.options[t.prepared.name],e=n.modifiers;if(e&&e.length)return e.filter(function(t){return!t.options||!1!==t.options.enabled});return["snap","snapSize","snapEdges","restrict","restrictEdges","restrictSize"].map(function(t){var e=n[t];return e&&e.enabled&&{options:e,methods:e._methods}}).filter(function(t){return!!t})}(r);this.prepareStates(o),this.edges=(0,Di.default)({},r.edges),this.startOffset=Ni(r.rect,e);var i={phase:n,pageCoords:e,preEnd:!(this.startDelta={x:0,y:0})};return this.result=Yi(),this.startAll(i),this.result=this.setAll(i)}},{key:"fillArg",value:function(t){var e=this.interaction;t.interaction=e,t.interactable=e.interactable,t.element=e.element,t.rect=t.rect||e.rect,t.edges=this.edges,t.startOffset=this.startOffset}},{key:"startAll",value:function(t){this.fillArg(t);for(var e=0;e<this.states.length;e++){var n=this.states[e];n.methods.start&&(t.state=n).methods.start(t)}}},{key:"setAll",value:function(t){this.fillArg(t);var e=t.phase,n=t.preEnd,r=t.skipModifiers,o=t.rect;t.coords=(0,Di.default)({},t.pageCoords),t.rect=(0,Di.default)({},o);for(var i=r?this.states.slice(r):this.states,a=Yi(t.coords,t.rect),u=0;u<i.length;u++){var s=i[u],c=s.options,l=(0,Di.default)({},t.coords),f=null;s.methods.set&&this.shouldDo(c,n,e)&&(f=(t.state=s).methods.set(t),Ii.addEdges(this.interaction.edges,t.rect,{x:t.coords.x-l.x,y:t.coords.y-l.y})),a.eventProps.push(f)}a.delta.x=t.coords.x-t.pageCoords.x,a.delta.y=t.coords.y-t.pageCoords.y,a.rectDelta.left=t.rect.left-o.left,a.rectDelta.right=t.rect.right-o.right,a.rectDelta.top=t.rect.top-o.top,a.rectDelta.bottom=t.rect.bottom-o.bottom;var p=this.result.coords,d=this.result.rect;if(p&&d){var v=a.rect.left!==d.left||a.rect.right!==d.right||a.rect.top!==d.top||a.rect.bottom!==d.bottom;a.changed=v||p.x!==a.coords.x||p.y!==a.coords.y}return a}},{key:"applyToInteraction",value:function(t){var e=this.interaction,n=t.phase,r=e.coords.cur,o=e.coords.start,i=this.result,a=this.startDelta,u=i.delta;"start"===n&&(0,Di.default)(this.startDelta,i.delta);for(var s=0;s<[[o,a],[r,u]].length;s++){var c=Ri([[o,a],[r,u]][s],2),l=c[0],f=c[1];l.page.x+=f.x,l.page.y+=f.y,l.client.x+=f.x,l.client.y+=f.y}var p=this.result.rectDelta,d=t.rect||e.rect;d.left+=p.left,d.right+=p.right,d.top+=p.top,d.bottom+=p.bottom,d.width=d.right-d.left,d.height=d.bottom-d.top}},{key:"setAndApply",value:function(t){var e=this.interaction,n=t.phase,r=t.preEnd,o=t.skipModifiers,i=this.setAll({preEnd:r,phase:n,pageCoords:t.modifiedCoords||e.coords.cur.page});if(!(this.result=i).changed&&(!o||o<this.states.length)&&e.interacting())return!1;if(t.modifiedCoords){var a=e.coords.cur.page,u=t.modifiedCoords.x-a.x,s=t.modifiedCoords.y-a.y;i.coords.x+=u,i.coords.y+=s,i.delta.x+=u,i.delta.y+=s}this.applyToInteraction(t)}},{key:"beforeEnd",value:function(t){var e=t.interaction,n=t.event,r=this.states;if(r&&r.length){for(var o=!1,i=0;i<r.length;i++){var a=r[i],u=(t.state=a).options,s=a.methods,c=s.beforeEnd&&s.beforeEnd(t);if(c)return this.endResult=c,!1;o=o||!o&&this.shouldDo(u,!0,t.phase,!0)}o&&e.move({event:n,preEnd:!0})}}},{key:"stop",value:function(t){var e=t.interaction;if(this.states&&this.states.length){var n=(0,Di.default)({states:this.states,interactable:e.interactable,element:e.element,rect:null},t);this.fillArg(n);for(var r=0;r<this.states.length;r++){var o=this.states[r];(n.state=o).methods.stop&&o.methods.stop(n)}this.states=null,this.endResult=null}}},{key:"prepareStates",value:function(t){this.states=[];for(var e=0;e<t.length;e++){var n=t[e],r=n.options,o=n.methods,i=n.name;r&&!1===r.enabled||this.states.push({options:r,methods:o,index:e,name:i})}return this.states}},{key:"restoreInteractionCoords",value:function(t){var e=t.interaction,n=e.coords,r=e.rect,o=e.modification;if(o.result){for(var i=o.startDelta,a=o.result,u=a.delta,s=a.rectDelta,c=[[n.start,i],[n.cur,u]],l=0;l<c.length;l++){var f=Ri(c[l],2),p=f[0],d=f[1];p.page.x-=d.x,p.page.y-=d.y,p.client.x-=d.x,p.client.y-=d.y}r.left-=s.left,r.right-=s.right,r.top-=s.top,r.bottom-=s.bottom}}},{key:"shouldDo",value:function(t,e,n,r){return!(!t||!1===t.enabled||r&&!t.endOnly||t.endOnly&&!e||"start"===n&&!t.setStart)}},{key:"copyFrom",value:function(t){this.startOffset=t.startOffset,this.startDelta=t.startDelta,this.edges=t.edges,this.states=t.states.map(function(t){return(0,Ti.default)(t)}),this.result=Yi((0,Di.default)({},t.result.coords),(0,Di.default)({},t.result.rect))}},{key:"destroy",value:function(){for(var t in this)this[t]=null}}])&&Wi(t.prototype,n),r&&Wi(t,r),e}();function Yi(t,e){return{rect:e,coords:t,delta:{x:0,y:0},rectDelta:{left:0,right:0,top:0,bottom:0},eventProps:[],changed:!0}}function Ni(t,e){return t?{left:e.x-t.left,top:e.y-t.top,right:t.right-e.x,bottom:t.bottom-e.y}:{left:0,top:0,right:0,bottom:0}}ki.default=Xi;var Li={};Object.defineProperty(Li,"__esModule",{value:!0}),Li.makeModifier=function(t,r){function e(t){var e=t||{};for(var n in e.enabled=!1!==e.enabled,o)n in e||(e[n]=o[n]);return{options:e,methods:i,name:r}}var o=t.defaults,i={start:t.start,set:t.set,beforeEnd:t.beforeEnd,stop:t.stop};r&&"string"==typeof r&&(e._defaults=o,e._methods=i);return e},Li.addEventModifiers=Vi,Li.default=void 0;var Bi,Ui=(Bi=ki)&&Bi.__esModule?Bi:{default:Bi};function Vi(t){var e=t.iEvent,n=t.interaction.modification.result;n&&(e.modifiers=n.eventProps)}var qi={id:"modifiers/base",install:function(t){t.defaults.perAction.modifiers=[]},listeners:{"interactions:new":function(t){var e=t.interaction;e.modification=new Ui.default(e)},"interactions:before-action-start":function(t){var e=t.interaction.modification;e.start(t,t.interaction.coords.start.page),t.interaction.edges=e.edges,e.applyToInteraction(t)},"interactions:before-action-move":function(t){return t.interaction.modification.setAndApply(t)},"interactions:before-action-end":function(t){return t.interaction.modification.beforeEnd(t)},"interactions:action-start":Vi,"interactions:action-move":Vi,"interactions:action-end":Vi,"interactions:after-action-start":function(t){return t.interaction.modification.restoreInteractionCoords(t)},"interactions:after-action-move":function(t){return t.interaction.modification.restoreInteractionCoords(t)},"interactions:stop":function(t){return t.interaction.modification.stop(t)}},before:["actions","action/drag","actions/resize","actions/gesture"]};Li.default=qi;var Gi={};function $i(t){return($i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Gi,"__esModule",{value:!0}),Gi.addTotal=Zi,Gi.applyPending=Qi,Gi.default=void 0;var Hi=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==$i(t)&&"function"!=typeof t)return{default:t};var e=Ki();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(Vt);function Ki(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Ki=function(){return t},t}function Zi(t){t.pointerIsDown&&(ea(t.coords.cur,t.offset.total),t.offset.pending.x=0,t.offset.pending.y=0)}function Ji(t){Qi(t.interaction)}function Qi(t){if(!(e=t).offset.pending.x&&!e.offset.pending.y)return!1;var e,n=t.offset.pending;return ea(t.coords.cur,n),ea(t.coords.delta,n),Hi.addEdges(t.edges,t.rect,n),n.x=0,!(n.y=0)}function ta(t){var e=t.x,n=t.y;this.offset.pending.x+=e,this.offset.pending.y+=n,this.offset.total.x+=e,this.offset.total.y+=n}function ea(t,e){var n=t.page,r=t.client,o=e.x,i=e.y;n.x+=o,n.y+=i,r.x+=o,r.y+=i}Gn._ProxyMethods.offsetBy="";var na={id:"offset",install:function(t){t.Interaction.prototype.offsetBy=ta},listeners:{"interactions:new":function(t){t.interaction.offset={total:{x:0,y:0},pending:{x:0,y:0}}},"interactions:update-pointer":function(t){return Zi(t.interaction)},"interactions:before-action-start":Ji,"interactions:before-action-move":Ji,"interactions:before-action-end":function(t){var e=t.interaction;if(Qi(e))return e.move({offset:!0}),e.end(),!1},"interactions:stop":function(t){var e=t.interaction;e.offset.total.x=0,e.offset.total.y=0,e.offset.pending.x=0,e.offset.pending.y=0}}};Gi.default=na;var ra={};function oa(t){return(oa="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(ra,"__esModule",{value:!0}),ra.default=ra.InertiaState=void 0;var ia=va(ki),aa=da(Li),ua=va(Gi),sa=da(Dt),ca=va(te),la=da(w),fa=va(Be);function pa(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return pa=function(){return t},t}function da(t){if(t&&t.__esModule)return t;if(null===t||"object"!==oa(t)&&"function"!=typeof t)return{default:t};var e=pa();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function va(t){return t&&t.__esModule?t:{default:t}}function ya(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function ha(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var ga=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),ha(this,"active",!1),ha(this,"isModified",!1),ha(this,"smoothEnd",!1),ha(this,"allowResume",!1),ha(this,"modification",null),ha(this,"modifierCount",0),ha(this,"modifierArg",null),ha(this,"startCoords",null),ha(this,"t0",0),ha(this,"v0",0),ha(this,"te",0),ha(this,"targetOffset",null),ha(this,"modifiedOffset",null),ha(this,"currentOffset",null),ha(this,"lambda_v0",0),ha(this,"one_ve_v0",0),ha(this,"timeout",null),ha(this,"interaction",void 0),this.interaction=t}var t,n,r;return t=e,(n=[{key:"start",value:function(t){var e=this.interaction,n=ba(e);if(!n||!n.enabled)return!1;var r=e.coords.velocity.client,o=(0,ca.default)(r.x,r.y),i=this.modification||(this.modification=new ia.default(e));if(i.copyFrom(e.modification),this.t0=e._now(),this.allowResume=n.allowResume,this.v0=o,this.currentOffset={x:0,y:0},this.startCoords=e.coords.cur.page,this.modifierArg={interaction:e,interactable:e.interactable,element:e.element,rect:e.rect,edges:e.edges,pageCoords:this.startCoords,preEnd:!0,phase:"inertiastart"},this.t0-e.coords.cur.timeStamp<50&&o>n.minSpeed&&o>n.endSpeed)this.startInertia();else{if(i.result=i.setAll(this.modifierArg),!i.result.changed)return!1;this.startSmoothEnd()}return e.modification.result.rect=null,e.offsetBy(this.targetOffset),e._doPhase({interaction:e,event:t,phase:"inertiastart"}),e.offsetBy({x:-this.targetOffset.x,y:-this.targetOffset.y}),e.modification.result.rect=null,this.active=!0,e.simulation=this,!0}},{key:"startInertia",value:function(){var t=this,e=this.interaction.coords.velocity.client,n=ba(this.interaction),r=n.resistance,o=-Math.log(n.endSpeed/this.v0)/r;this.targetOffset={x:(e.x-o)/r,y:(e.y-o)/r},this.te=o,this.lambda_v0=r/this.v0,this.one_ve_v0=1-n.endSpeed/this.v0;var i=this.modification,a=this.modifierArg;a.pageCoords={x:this.startCoords.x+this.targetOffset.x,y:this.startCoords.y+this.targetOffset.y},i.result=i.setAll(a),i.result.changed&&(this.isModified=!0,this.modifiedOffset={x:this.targetOffset.x+i.result.delta.x,y:this.targetOffset.y+i.result.delta.y}),this.timeout=fa.default.request(function(){return t.inertiaTick()})}},{key:"startSmoothEnd",value:function(){var t=this;this.smoothEnd=!0,this.isModified=!0,this.targetOffset={x:this.modification.result.delta.x,y:this.modification.result.delta.y},this.timeout=fa.default.request(function(){return t.smoothEndTick()})}},{key:"inertiaTick",value:function(){var t,e,n,r,o,i,a,u=this,s=this.interaction,c=ba(s).resistance,l=(s._now()-this.t0)/1e3;if(l<this.te){var f,p=1-(Math.exp(-c*l)-this.lambda_v0)/this.one_ve_v0,d={x:(f=this.isModified?(e=t=0,n=this.targetOffset.x,r=this.targetOffset.y,o=this.modifiedOffset.x,i=this.modifiedOffset.y,{x:ma(a=p,t,n,o),y:ma(a,e,r,i)}):{x:this.targetOffset.x*p,y:this.targetOffset.y*p}).x-this.currentOffset.x,y:f.y-this.currentOffset.y};this.currentOffset.x+=d.x,this.currentOffset.y+=d.y,s.offsetBy(d),s.move(),this.timeout=fa.default.request(function(){return u.inertiaTick()})}else s.offsetBy({x:this.modifiedOffset.x-this.currentOffset.x,y:this.modifiedOffset.y-this.currentOffset.y}),this.end()}},{key:"smoothEndTick",value:function(){var t=this,e=this.interaction,n=e._now()-this.t0,r=ba(e).smoothEndDuration;if(n<r){var o=Oa(n,0,this.targetOffset.x,r),i=Oa(n,0,this.targetOffset.y,r),a={x:o-this.currentOffset.x,y:i-this.currentOffset.y};this.currentOffset.x+=a.x,this.currentOffset.y+=a.y,e.offsetBy(a),e.move({skipModifiers:this.modifierCount}),this.timeout=fa.default.request(function(){return t.smoothEndTick()})}else e.offsetBy({x:this.targetOffset.x-this.currentOffset.x,y:this.targetOffset.y-this.currentOffset.y}),this.end()}},{key:"resume",value:function(t){var e=t.pointer,n=t.event,r=t.eventTarget,o=this.interaction;o.offsetBy({x:-this.currentOffset.x,y:-this.currentOffset.y}),o.updatePointer(e,n,r,!0),o._doPhase({interaction:o,event:n,phase:"resume"}),(0,Oe.copyCoords)(o.coords.prev,o.coords.cur),this.stop()}},{key:"end",value:function(){this.interaction.move(),this.interaction.end(),this.stop()}},{key:"stop",value:function(){this.active=this.smoothEnd=!1,this.interaction.simulation=null,fa.default.cancel(this.timeout)}}])&&ya(t.prototype,n),r&&ya(t,r),e}();function ba(t){var e=t.interactable,n=t.prepared;return e&&e.options&&n.name&&e.options[n.name].inertia}function ma(t,e,n,r){var o=1-t;return o*o*e+2*o*t*n+t*t*r}function Oa(t,e,n,r){return-n*(t/=r)*(t-2)+e}ra.InertiaState=ga;var wa={id:"inertia",before:["modifiers/base"],install:function(t){var e=t.defaults;t.usePlugin(ua.default),t.usePlugin(aa.default),t.actions.phases.inertiastart=!0,t.actions.phases.resume=!0,e.perAction.inertia={enabled:!1,resistance:10,minSpeed:100,endSpeed:10,allowResume:!0,smoothEndDuration:300}},listeners:{"interactions:new":function(t){var e=t.interaction;e.inertia=new ga(e)},"interactions:before-action-end":function(t){var e=t.interaction,n=t.event;return(!e._interacting||e.simulation||!e.inertia.start(n))&&null},"interactions:down":function(t){var e=t.interaction,n=t.eventTarget,r=e.inertia;if(r.active)for(var o=n;la.element(o);){if(o===e.element){r.resume(t);break}o=sa.parentNode(o)}},"interactions:stop":function(t){var e=t.interaction.inertia;e.active&&e.stop()},"interactions:before-action-resume":function(t){var e=t.interaction.modification;e.stop(t),e.start(t,t.interaction.coords.cur.page),e.applyToInteraction(t)},"interactions:before-action-inertiastart":function(t){return t.interaction.modification.setAndApply(t)},"interactions:action-resume":aa.addEventModifiers,"interactions:action-inertiastart":aa.addEventModifiers,"interactions:after-action-inertiastart":function(t){return t.interaction.modification.restoreInteractionCoords(t)},"interactions:after-action-resume":function(t){return t.interaction.modification.restoreInteractionCoords(t)}}};ra.default=wa;var _a,Pa={};function xa(t){return(xa="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Pa,"__esModule",{value:!0}),Pa.init=Pa.default=void 0;var Sa=new(((_a=m({}))&&_a.__esModule?_a:{default:_a}).default),ja=Sa.interactStatic;Pa.default=ja;function Ma(t){return Sa.init(t)}Pa.init=Ma,"object"===("undefined"==typeof window?"undefined":xa(window))&&window&&Ma(window);var ka={};Object.defineProperty(ka,"__esModule",{value:!0}),ka.aspectRatio=ka.default=void 0;var Ea=Da(K),Ta=Da(ki);function Da(t){return t&&t.__esModule?t:{default:t}}function Ia(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Aa(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ia(Object(n),!0).forEach(function(t){za(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ia(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function za(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Ra={start:function(t){var e=t.state,n=t.rect,r=t.edges,o=t.pageCoords,i=e.options.ratio,a=e.options,u=a.equalDelta,s=a.modifiers;"preserve"===i&&(i=n.width/n.height),e.startCoords=(0,Ea.default)({},o),e.startRect=(0,Ea.default)({},n),e.ratio=i,e.equalDelta=u;var c=e.linkedEdges={top:r.top||r.left&&!r.bottom,left:r.left||r.top&&!r.right,bottom:r.bottom||r.right&&!r.top,right:r.right||r.bottom&&!r.left};if(e.xIsPrimaryAxis=!(!r.left&&!r.right),e.equalDelta)e.edgeSign=(c.left?1:-1)*(c.top?1:-1);else{var l=e.xIsPrimaryAxis?c.top:c.left;e.edgeSign=l?-1:1}if((0,Ea.default)(t.edges,c),s&&s.length){var f=new Ta.default(t.interaction);f.copyFrom(t.interaction.modification),f.prepareStates(s),(e.subModification=f).startAll(Aa({},t))}},set:function(t){var e=t.state,n=t.rect,r=t.coords,o=(0,Ea.default)({},r),i=e.equalDelta?Ca:Wa;if(i(e,e.xIsPrimaryAxis,r,n),!e.subModification)return null;var a=(0,Ea.default)({},n);(0,Vt.addEdges)(e.linkedEdges,a,{x:r.x-o.x,y:r.y-o.y});var u=e.subModification.setAll(Aa({},t,{rect:a,edges:e.linkedEdges,pageCoords:r,prevCoords:r,prevRect:a})),s=u.delta;u.changed&&(i(e,Math.abs(s.x)>Math.abs(s.y),u.coords,u.rect),(0,Ea.default)(r,u.coords));return u.eventProps},defaults:{ratio:"preserve",equalDelta:!1,modifiers:[],enabled:!1}};function Ca(t,e,n){var r=t.startCoords,o=t.edgeSign;e?n.y=r.y+(n.x-r.x)*o:n.x=r.x+(n.y-r.y)*o}function Wa(t,e,n,r){var o=t.startRect,i=t.startCoords,a=t.ratio,u=t.edgeSign;if(e){var s=r.width/a;n.y=i.y+(s-o.height)*u}else{var c=r.height*a;n.x=i.x+(c-o.width)*u}}ka.aspectRatio=Ra;var Fa=(0,Li.makeModifier)(Ra,"aspectRatio");ka.default=Fa;var Xa={};Object.defineProperty(Xa,"__esModule",{value:!0}),Xa.default=void 0;function Ya(){}Ya._defaults={};var Na=Ya;Xa.default=Na;var La={};function Ba(t){return(Ba="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(La,"__esModule",{value:!0}),La.getRestrictionRect=Ka,La.restrict=La.default=void 0;var Ua,Va=(Ua=K)&&Ua.__esModule?Ua:{default:Ua},qa=Ha(w),Ga=Ha(Vt);function $a(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return $a=function(){return t},t}function Ha(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Ba(t)&&"function"!=typeof t)return{default:t};var e=$a();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function Ka(t,e,n){return qa.func(t)?Ga.resolveRectLike(t,e.interactable,e.element,[n.x,n.y,e]):Ga.resolveRectLike(t,e.interactable,e.element)}var Za={start:function(t){var e=t.rect,n=t.startOffset,r=t.state,o=t.interaction,i=t.pageCoords,a=r.options,u=a.elementRect,s=(0,Va.default)({left:0,top:0,right:0,bottom:0},a.offset||{});if(e&&u){var c=Ka(a.restriction,o,i);if(c){var l=c.right-c.left-e.width,f=c.bottom-c.top-e.height;l<0&&(s.left+=l,s.right+=l),f<0&&(s.top+=f,s.bottom+=f)}s.left+=n.left-e.width*u.left,s.top+=n.top-e.height*u.top,s.right+=n.right-e.width*(1-u.right),s.bottom+=n.bottom-e.height*(1-u.bottom)}r.offset=s},set:function(t){var e=t.coords,n=t.interaction,r=t.state,o=r.options,i=r.offset,a=Ka(o.restriction,n,e);if(a){var u=Ga.xywhToTlbr(a);e.x=Math.max(Math.min(u.right-i.right,e.x),u.left+i.left),e.y=Math.max(Math.min(u.bottom-i.bottom,e.y),u.top+i.top)}},defaults:{restriction:null,elementRect:null,offset:null,endOnly:!1,enabled:!1}};La.restrict=Za;var Ja=(0,Li.makeModifier)(Za,"restrict");La.default=Ja;var Qa={};function tu(t){return(tu="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Qa,"__esModule",{value:!0}),Qa.restrictEdges=Qa.default=void 0;var eu,nu=(eu=K)&&eu.__esModule?eu:{default:eu},ru=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==tu(t)&&"function"!=typeof t)return{default:t};var e=ou();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(Vt);function ou(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return ou=function(){return t},t}var iu={top:1/0,left:1/0,bottom:-1/0,right:-1/0},au={top:-1/0,left:-1/0,bottom:1/0,right:1/0};function uu(t,e){for(var n=["top","left","bottom","right"],r=0;r<n.length;r++){var o=n[r];o in t||(t[o]=e[o])}return t}var su={noInner:iu,noOuter:au,start:function(t){var e,n=t.interaction,r=t.startOffset,o=t.state,i=o.options;if(i){var a=(0,La.getRestrictionRect)(i.offset,n,n.coords.start.page);e=ru.rectToXY(a)}e=e||{x:0,y:0},o.offset={top:e.y+r.top,left:e.x+r.left,bottom:e.y-r.bottom,right:e.x-r.right}},set:function(t){var e=t.coords,n=t.edges,r=t.interaction,o=t.state,i=o.offset,a=o.options;if(n){var u=(0,nu.default)({},e),s=(0,La.getRestrictionRect)(a.inner,r,u)||{},c=(0,La.getRestrictionRect)(a.outer,r,u)||{};uu(s,iu),uu(c,au),n.top?e.y=Math.min(Math.max(c.top+i.top,u.y),s.top+i.top):n.bottom&&(e.y=Math.max(Math.min(c.bottom+i.bottom,u.y),s.bottom+i.bottom)),n.left?e.x=Math.min(Math.max(c.left+i.left,u.x),s.left+i.left):n.right&&(e.x=Math.max(Math.min(c.right+i.right,u.x),s.right+i.right))}},defaults:{inner:null,outer:null,offset:null,endOnly:!1,enabled:!1}};Qa.restrictEdges=su;var cu=(0,Li.makeModifier)(su,"restrictEdges");Qa.default=cu;var lu,fu={};Object.defineProperty(fu,"__esModule",{value:!0}),fu.restrictRect=fu.default=void 0;var pu=(0,((lu=K)&&lu.__esModule?lu:{default:lu}).default)({get elementRect(){return{top:0,left:0,bottom:1,right:1}},set elementRect(t){}},La.restrict.defaults),du={start:La.restrict.start,set:La.restrict.set,defaults:pu};fu.restrictRect=du;var vu=(0,Li.makeModifier)(du,"restrictRect");fu.default=vu;var yu={};function hu(t){return(hu="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(yu,"__esModule",{value:!0}),yu.restrictSize=yu.default=void 0;var gu,bu=(gu=K)&&gu.__esModule?gu:{default:gu},mu=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==hu(t)&&"function"!=typeof t)return{default:t};var e=Ou();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(Vt);function Ou(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Ou=function(){return t},t}var wu={width:-1/0,height:-1/0},_u={width:1/0,height:1/0};var Pu={start:function(t){return Qa.restrictEdges.start(t)},set:function(t){var e=t.interaction,n=t.state,r=t.rect,o=t.edges,i=n.options;if(o){var a=mu.tlbrToXywh((0,La.getRestrictionRect)(i.min,e,t.coords))||wu,u=mu.tlbrToXywh((0,La.getRestrictionRect)(i.max,e,t.coords))||_u;n.options={endOnly:i.endOnly,inner:(0,bu.default)({},Qa.restrictEdges.noInner),outer:(0,bu.default)({},Qa.restrictEdges.noOuter)},o.top?(n.options.inner.top=r.bottom-a.height,n.options.outer.top=r.bottom-u.height):o.bottom&&(n.options.inner.bottom=r.top+a.height,n.options.outer.bottom=r.top+u.height),o.left?(n.options.inner.left=r.right-a.width,n.options.outer.left=r.right-u.width):o.right&&(n.options.inner.right=r.left+a.width,n.options.outer.right=r.left+u.width),Qa.restrictEdges.set(t),n.options=i}},defaults:{min:null,max:null,endOnly:!1,enabled:!1}};yu.restrictSize=Pu;var xu=(0,Li.makeModifier)(Pu,"restrictSize");yu.default=xu;var Su={};Object.defineProperty(Su,"__esModule",{value:!0}),Su.default=void 0;function ju(){}ju._defaults={};var Mu=ju;Su.default=Mu;var ku={};function Eu(t){return(Eu="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(ku,"__esModule",{value:!0}),ku.snap=ku.default=void 0;var Tu=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Eu(t)&&"function"!=typeof t)return{default:t};var e=Du();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}($e);function Du(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Du=function(){return t},t}var Iu={start:function(t){var e,n,r,o=t.interaction,i=t.interactable,a=t.element,u=t.rect,s=t.state,c=t.startOffset,l=s.options,f=l.offsetWithOrigin?(n=(e=t).interaction.element,Tu.rect.rectToXY(Tu.rect.resolveRectLike(e.state.options.origin,null,null,[n]))||Tu.getOriginXY(e.interactable,n,e.interaction.prepared.name)):{x:0,y:0};if("startCoords"===l.offset)r={x:o.coords.start.page.x,y:o.coords.start.page.y};else{var p=Tu.rect.resolveRectLike(l.offset,i,a,[o]);(r=Tu.rect.rectToXY(p)||{x:0,y:0}).x+=f.x,r.y+=f.y}var d=l.relativePoints;s.offsets=u&&d&&d.length?d.map(function(t,e){return{index:e,relativePoint:t,x:c.left-u.width*t.x+r.x,y:c.top-u.height*t.y+r.y}}):[Tu.extend({index:0,relativePoint:null},r)]},set:function(t){var e=t.interaction,n=t.coords,r=t.state,o=r.options,i=r.offsets,a=Tu.getOriginXY(e.interactable,e.element,e.prepared.name),u=Tu.extend({},n),s=[];o.offsetWithOrigin||(u.x-=a.x,u.y-=a.y);for(var c=0;c<i.length;c++)for(var l=i[c],f=u.x-l.x,p=u.y-l.y,d=0,v=o.targets.length;d<v;d++){var y=o.targets[d],h=void 0;(h=Tu.is.func(y)?y(f,p,e,l,d):y)&&s.push({x:(Tu.is.number(h.x)?h.x:f)+l.x,y:(Tu.is.number(h.y)?h.y:p)+l.y,range:Tu.is.number(h.range)?h.range:o.range,source:y,index:d,offset:l})}for(var g={target:null,inRange:!1,distance:0,range:0,delta:{x:0,y:0}},b=0;b<s.length;b++){var m=s[b],O=m.range,w=m.x-u.x,_=m.y-u.y,P=Tu.hypot(w,_),x=P<=O;O===1/0&&g.inRange&&g.range!==1/0&&(x=!1),g.target&&!(x?g.inRange&&O!==1/0?P/O<g.distance/g.range:O===1/0&&g.range!==1/0||P<g.distance:!g.inRange&&P<g.distance)||(g.target=m,g.distance=P,g.range=O,g.inRange=x,g.delta.x=w,g.delta.y=_)}return g.inRange&&(n.x=g.target.x,n.y=g.target.y),r.closest=g},defaults:{range:1/0,targets:null,offset:null,offsetWithOrigin:!0,origin:null,relativePoints:null,endOnly:!1,enabled:!1}};ku.snap=Iu;var Au=(0,Li.makeModifier)(Iu,"snap");ku.default=Au;var zu={};function Ru(t){return(Ru="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(zu,"__esModule",{value:!0}),zu.snapSize=zu.default=void 0;var Cu,Wu=(Cu=K)&&Cu.__esModule?Cu:{default:Cu},Fu=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Ru(t)&&"function"!=typeof t)return{default:t};var e=Xu();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w);function Xu(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Xu=function(){return t},t}function Yu(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return Nu(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Nu(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Nu(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var Lu={start:function(t){var e=t.state,n=t.edges,r=e.options;if(!n)return null;t.state={options:{targets:null,relativePoints:[{x:n.left?0:1,y:n.top?0:1}],offset:r.offset||"self",origin:{x:0,y:0},range:r.range}},e.targetFields=e.targetFields||[["width","height"],["x","y"]],ku.snap.start(t),e.offsets=t.state.offsets,t.state=e},set:function(t){var e=t.interaction,n=t.state,r=t.coords,o=n.options,i=n.offsets,a={x:r.x-i[0].x,y:r.y-i[0].y};n.options=(0,Wu.default)({},o),n.options.targets=[];for(var u=0;u<(o.targets||[]).length;u++){var s=(o.targets||[])[u],c=void 0;if(c=Fu.func(s)?s(a.x,a.y,e):s){for(var l=0;l<n.targetFields.length;l++){var f=Yu(n.targetFields[l],2),p=f[0],d=f[1];if(p in c||d in c){c.x=c[p],c.y=c[d];break}}n.options.targets.push(c)}}var v=ku.snap.set(t);return n.options=o,v},defaults:{range:1/0,targets:null,offset:null,endOnly:!1,enabled:!1}};zu.snapSize=Lu;var Bu=(0,Li.makeModifier)(Lu,"snapSize");zu.default=Bu;var Uu={};Object.defineProperty(Uu,"__esModule",{value:!0}),Uu.snapEdges=Uu.default=void 0;var Vu=Gu(We),qu=Gu(K);function Gu(t){return t&&t.__esModule?t:{default:t}}var $u={start:function(t){var e=t.edges;return e?(t.state.targetFields=t.state.targetFields||[[e.left?"left":"right",e.top?"top":"bottom"]],zu.snapSize.start(t)):null},set:zu.snapSize.set,defaults:(0,qu.default)((0,Vu.default)(zu.snapSize.defaults),{targets:null,range:null,offset:{x:0,y:0}})};Uu.snapEdges=$u;var Hu=(0,Li.makeModifier)($u,"snapEdges");Uu.default=Hu;var Ku={};Object.defineProperty(Ku,"__esModule",{value:!0}),Ku.default=void 0;function Zu(){}Zu._defaults={};var Ju=Zu;Ku.default=Ju;var Qu={};Object.defineProperty(Qu,"__esModule",{value:!0}),Qu.default=void 0;function ts(){}ts._defaults={};var es=ts;Qu.default=es;var ns={};Object.defineProperty(ns,"__esModule",{value:!0}),ns.default=void 0;var rs=ys(ka),os=ys(Xa),is=ys(Qa),as=ys(La),us=ys(fu),ss=ys(yu),cs=ys(Su),ls=ys(Uu),fs=ys(ku),ps=ys(zu),ds=ys(Ku),vs=ys(Qu);function ys(t){return t&&t.__esModule?t:{default:t}}var hs={aspectRatio:rs.default,restrictEdges:is.default,restrict:as.default,restrictRect:us.default,restrictSize:ss.default,snapEdges:ls.default,snap:fs.default,snapSize:ps.default,spring:ds.default,avoid:os.default,transform:vs.default,rubberband:cs.default};ns.default=hs;var gs={};Object.defineProperty(gs,"__esModule",{value:!0}),gs.default=void 0;gs.default={};var bs={};Object.defineProperty(bs,"__esModule",{value:!0}),bs.default=void 0;bs.default={};var ms={};function Os(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return ws(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ws(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ws(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}Object.defineProperty(ms,"__esModule",{value:!0}),ms.default=void 0;ms.default=function(v){function t(t,e){for(var n=v.range,r=v.limits,o=void 0===r?{left:-1/0,right:1/0,top:-1/0,bottom:1/0}:r,i=v.offset,a=void 0===i?{x:0,y:0}:i,u={range:n,grid:v,x:null,y:null},s=0;s<y.length;s++){var c=Os(y[s],2),l=c[0],f=c[1],p=Math.round((t-a.x)/v[l]),d=Math.round((e-a.y)/v[f]);u[l]=Math.max(o.left,Math.min(o.right,p*v[l]+a.x)),u[f]=Math.max(o.top,Math.min(o.bottom,d*v[f]+a.y))}return u}var y=[["x","y"],["left","top"],["right","bottom"],["width","height"]].filter(function(t){var e=Os(t,2),n=e[0],r=e[1];return n in v||r in v});return t.grid=v,t.coordFields=y,t};var _s={};Object.defineProperty(_s,"__esModule",{value:!0}),Object.defineProperty(_s,"edgeTarget",{enumerable:!0,get:function(){return Ps.default}}),Object.defineProperty(_s,"elements",{enumerable:!0,get:function(){return xs.default}}),Object.defineProperty(_s,"grid",{enumerable:!0,get:function(){return Ss.default}});var Ps=js(gs),xs=js(bs),Ss=js(ms);function js(t){return t&&t.__esModule?t:{default:t}}var Ms={};function ks(t){return(ks="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Ms,"__esModule",{value:!0}),Ms.default=void 0;var Es,Ts=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==ks(t)&&"function"!=typeof t)return{default:t};var e=Is();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(_s),Ds=(Es=K)&&Es.__esModule?Es:{default:Es};function Is(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Is=function(){return t},t}var As={id:"snappers",install:function(t){var e=t.interactStatic;e.snappers=(0,Ds.default)(e.snappers||{},Ts),e.createSnapGrid=e.snappers.grid}};Ms.default=As;var zs={};Object.defineProperty(zs,"__esModule",{value:!0}),zs.default=void 0;var Rs=Fs(ns),Cs=Fs(Li),Ws=Fs(Ms);function Fs(t){return t&&t.__esModule?t:{default:t}}var Xs={id:"modifiers",install:function(t){var e=t.interactStatic;for(var n in t.usePlugin(Cs.default),t.usePlugin(Ws.default),e.modifiers=Rs.default,Rs.default){var r=Rs.default[n],o=r._defaults,i=r._methods;o._methods=i,t.defaults.perAction[n]=o}}};zs.default=Xs;var Ys={};Object.defineProperty(Ys,"__esModule",{value:!0}),Ys.default=void 0;Ys.default={};var Ns={};Object.defineProperty(Ns,"__esModule",{value:!0}),Ns.PointerEvent=Ns.default=void 0;var Ls,Bs=(Ls=S)&&Ls.__esModule?Ls:{default:Ls},Us=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==qs(t)&&"function"!=typeof t)return{default:t};var e=Vs();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(Oe);function Vs(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Vs=function(){return t},t}function qs(t){return(qs="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function Gs(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function $s(t,e){return($s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function Hs(i){return function(){var t,e,n,r=Zs(i);if(function(){if("undefined"==typeof Reflect||!Reflect.construct)return;if(Reflect.construct.sham)return;if("function"==typeof Proxy)return 1;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),1}catch(t){return}}()){var o=Zs(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return e=this,!(n=t)||"object"!==qs(n)&&"function"!=typeof n?Ks(e):n}}function Ks(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function Zs(t){return(Zs=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function Js(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Qs=function(){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&$s(t,e)}(l,Bs["default"]);var t,e,n,c=Hs(l);function l(t,e,n,r,o,i){var a;if(!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,l),Js(Ks(a=c.call(this,o)),"type",void 0),Js(Ks(a),"originalEvent",void 0),Js(Ks(a),"pointerId",void 0),Js(Ks(a),"pointerType",void 0),Js(Ks(a),"double",void 0),Js(Ks(a),"pageX",void 0),Js(Ks(a),"pageY",void 0),Js(Ks(a),"clientX",void 0),Js(Ks(a),"clientY",void 0),Js(Ks(a),"dt",void 0),Js(Ks(a),"eventable",void 0),Us.pointerExtend(Ks(a),n),n!==e&&Us.pointerExtend(Ks(a),e),a.timeStamp=i,a.originalEvent=n,a.type=t,a.pointerId=Us.getPointerId(e),a.pointerType=Us.getPointerType(e),a.target=r,a.currentTarget=null,"tap"===t){var u=o.getPointerIndex(e);a.dt=a.timeStamp-o.pointers[u].downTime;var s=a.timeStamp-o.tapTime;a.double=!!(o.prevTap&&"doubletap"!==o.prevTap.type&&o.prevTap.target===a.target&&s<500)}else"doubletap"===t&&(a.dt=e.timeStamp-o.tapTime);return a}return t=l,(e=[{key:"_subtractOrigin",value:function(t){var e=t.x,n=t.y;return this.pageX-=e,this.pageY-=n,this.clientX-=e,this.clientY-=n,this}},{key:"_addOrigin",value:function(t){var e=t.x,n=t.y;return this.pageX+=e,this.pageY+=n,this.clientX+=e,this.clientY+=n,this}},{key:"preventDefault",value:function(){this.originalEvent.preventDefault()}}])&&Gs(t.prototype,e),n&&Gs(t,n),l}();Ns.PointerEvent=Ns.default=Qs;var tc={};function ec(t){return(ec="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(tc,"__esModule",{value:!0}),tc.default=void 0;var nc=ic(Ns),rc=(ic(Gn),ic(m({})),function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==ec(t)&&"function"!=typeof t)return{default:t};var e=oc();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}($e));function oc(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return oc=function(){return t},t}function ic(t){return t&&t.__esModule?t:{default:t}}var ac={id:"pointer-events/base",install:function(t){t.pointerEvents=ac,t.defaults.actions.pointerEvents=ac.defaults,rc.extend(t.actions.phaselessTypes,ac.types)},listeners:{"interactions:new":function(t){var e=t.interaction;e.prevTap=null,e.tapTime=0},"interactions:update-pointer":function(t){var e=t.down,n=t.pointerInfo;if(!e&&n.hold)return;n.hold={duration:1/0,timeout:null}},"interactions:move":function(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget,a=t.duplicate,u=n.getPointerIndex(r);a||n.pointerIsDown&&!n.pointerWasMoved||(n.pointerIsDown&&clearTimeout(n.pointers[u].hold.timeout),uc({interaction:n,pointer:r,event:o,eventTarget:i,type:"move"},e))},"interactions:down":function(t,e){!function(t,e){for(var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget,a=t.pointerIndex,u=n.pointers[a].hold,s=rc.dom.getPath(i),c={interaction:n,pointer:r,event:o,eventTarget:i,type:"hold",targets:[],path:s,node:null},l=0;l<s.length;l++){var f=s[l];c.node=f,e.fire("pointerEvents:collect-targets",c)}if(!c.targets.length)return;for(var p=1/0,d=0;d<c.targets.length;d++){var v=c.targets[d].eventable.options.holdDuration;v<p&&(p=v)}u.duration=p,u.timeout=setTimeout(function(){uc({interaction:n,eventTarget:i,pointer:r,event:o,type:"hold"},e)},p)}(t,e),uc(t,e)},"interactions:up":function(t,e){var n,r,o,i,a,u;cc(t),uc(t,e),r=e,o=(n=t).interaction,i=n.pointer,a=n.event,u=n.eventTarget,o.pointerWasMoved||uc({interaction:o,eventTarget:u,pointer:i,event:a,type:"tap"},r)},"interactions:cancel":function(t,e){cc(t),uc(t,e)}},PointerEvent:nc.default,fire:uc,collectEventTargets:sc,defaults:{holdDuration:600,ignoreFrom:null,allowFrom:null,origin:{x:0,y:0}},types:{down:!0,move:!0,up:!0,cancel:!0,tap:!0,doubletap:!0,hold:!0}};function uc(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget,a=t.type,u=t.targets,s=void 0===u?sc(t,e):u,c=new nc.default(a,r,o,i,n,e.now());e.fire("pointerEvents:new",{pointerEvent:c});for(var l={interaction:n,pointer:r,event:o,eventTarget:i,targets:s,type:a,pointerEvent:c},f=0;f<s.length;f++){var p=s[f];for(var d in p.props||{})c[d]=p.props[d];var v=rc.getOriginXY(p.eventable,p.node);if(c._subtractOrigin(v),c.eventable=p.eventable,c.currentTarget=p.node,p.eventable.fire(c),c._addOrigin(v),c.immediatePropagationStopped||c.propagationStopped&&f+1<s.length&&s[f+1].node!==c.currentTarget)break}if(e.fire("pointerEvents:fired",l),"tap"===a){var y=c.double?uc({interaction:n,pointer:r,event:o,eventTarget:i,type:"doubletap"},e):c;n.prevTap=y,n.tapTime=y.timeStamp}return c}function sc(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget,a=t.type,u=n.getPointerIndex(r),s=n.pointers[u];if("tap"===a&&(n.pointerWasMoved||!s||s.downTarget!==i))return[];for(var c=rc.dom.getPath(i),l={interaction:n,pointer:r,event:o,eventTarget:i,type:a,path:c,targets:[],node:null},f=0;f<c.length;f++){var p=c[f];l.node=p,e.fire("pointerEvents:collect-targets",l)}return"hold"===a&&(l.targets=l.targets.filter(function(t){return t.eventable.options.holdDuration===n.pointers[u].hold.duration})),l.targets}function cc(t){var e=t.interaction,n=t.pointerIndex;e.pointers[n].hold&&clearTimeout(e.pointers[n].hold.timeout)}var lc=ac;tc.default=lc;var fc={};Object.defineProperty(fc,"__esModule",{value:!0}),fc.default=void 0;dc(Ns);var pc=dc(tc);function dc(t){return t&&t.__esModule?t:{default:t}}function vc(t){var e=t.interaction;e.holdIntervalHandle&&(clearInterval(e.holdIntervalHandle),e.holdIntervalHandle=null)}var yc={id:"pointer-events/holdRepeat",install:function(t){t.usePlugin(pc.default);var e=t.pointerEvents;e.defaults.holdRepeatInterval=0,e.types.holdrepeat=t.actions.phaselessTypes.holdrepeat=!0},listeners:["move","up","cancel","endall"].reduce(function(t,e){return t["pointerEvents:".concat(e)]=vc,t},{"pointerEvents:new":function(t){var e=t.pointerEvent;"hold"===e.type&&(e.count=(e.count||0)+1)},"pointerEvents:fired":function(t,e){var n=t.interaction,r=t.pointerEvent,o=t.eventTarget,i=t.targets;if("hold"===r.type&&i.length){var a=i[0].eventable.options.holdRepeatInterval;a<=0||(n.holdIntervalHandle=setTimeout(function(){e.pointerEvents.fire({interaction:n,eventTarget:o,type:"hold",pointer:r,event:r},e)},a))}}})};fc.default=yc;var hc={};Object.defineProperty(hc,"__esModule",{value:!0}),hc.default=void 0;var gc,bc=(gc=K)&&gc.__esModule?gc:{default:gc};function mc(t){return(0,bc.default)(this.events.options,t),this}var Oc={id:"pointer-events/interactableTargets",install:function(t){var e=t.Interactable;e.prototype.pointerEvents=mc;var r=e.prototype._backCompatOption;e.prototype._backCompatOption=function(t,e){var n=r.call(this,t,e);return n===this&&(this.events.options[t]=e),n}},listeners:{"pointerEvents:collect-targets":function(t,e){var r=t.targets,o=t.node,i=t.type,a=t.eventTarget;e.interactables.forEachMatch(o,function(t){var e=t.events,n=e.options;e.types[i]&&e.types[i].length&&t.testIgnoreAllow(n,o,a)&&r.push({node:o,eventable:e,props:{interactable:t}})})},"interactable:new":function(t){var e=t.interactable;e.events.getRect=function(t){return e.getRect(t)}},"interactable:set":function(t,e){var n=t.interactable,r=t.options;(0,bc.default)(n.events.options,e.pointerEvents.defaults),(0,bc.default)(n.events.options,r.pointerEvents||{})}}};hc.default=Oc;var wc={};function _c(t){return(_c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(wc,"__esModule",{value:!0}),Object.defineProperty(wc,"holdRepeat",{enumerable:!0,get:function(){return xc.default}}),Object.defineProperty(wc,"interactableTargets",{enumerable:!0,get:function(){return Sc.default}}),wc.pointerEvents=wc.default=void 0;var Pc=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==_c(t)&&"function"!=typeof t)return{default:t};var e=Mc();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(tc);wc.pointerEvents=Pc;var xc=jc(fc),Sc=jc(hc);function jc(t){return t&&t.__esModule?t:{default:t}}function Mc(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Mc=function(){return t},t}var kc={id:"pointer-events",install:function(t){t.usePlugin(Pc),t.usePlugin(xc.default),t.usePlugin(Sc.default)}};wc.default=kc;var Ec={};Object.defineProperty(Ec,"__esModule",{value:!0}),Ec.install=Dc,Ec.default=void 0;var Tc;(Tc=k({}))&&Tc.__esModule;function Dc(e){var t=e.Interactable;e.actions.phases.reflow=!0,t.prototype.reflow=function(t){return function(u,s,c){function t(){var e=l[d],t=u.getRect(e);if(!t)return"break";var n=$e.arr.find(c.interactions.list,function(t){return t.interacting()&&t.interactable===u&&t.element===e&&t.prepared.name===s.name}),r=void 0;if(n)n.move(),p&&(r=n._reflowPromise||new f(function(t){n._reflowResolve=t}));else{var o=$e.rect.tlbrToXywh(t),i={page:{x:o.x,y:o.y},client:{x:o.x,y:o.y},timeStamp:c.now()},a=$e.pointer.coordsToEvent(i);r=function(t,e,n,r,o){var i=t.interactions.new({pointerType:"reflow"}),a={interaction:i,event:o,pointer:o,eventTarget:n,phase:"reflow"};i.interactable=e,i.element=n,i.prepared=(0,$e.extend)({},r),i.prevEvent=o,i.updatePointer(o,o,n,!0),i._doPhase(a);var u=$e.win.window.Promise?new $e.win.window.Promise(function(t){i._reflowResolve=t}):null;i._reflowPromise=u,i.start(r,e,n),i._interacting?(i.move(a),i.end(o)):i.stop();return i.removePointer(o,o),i.pointerIsDown=!1,u}(c,u,e,s,a)}p&&p.push(r)}for(var l=$e.is.string(u.target)?$e.arr.from(u._context.querySelectorAll(u.target)):[u.target],f=$e.win.window.Promise,p=f?[]:null,d=0;d<l.length;d++){if("break"===t())break}return p&&f.all(p).then(function(){return u})}(this,t,e)}}var Ic={id:"reflow",install:Dc,listeners:{"interactions:stop":function(t,e){var n=t.interaction;"reflow"===n.pointerType&&(n._reflowResolve&&n._reflowResolve(),$e.arr.remove(e.interactions.list,n))}}};Ec.default=Ic;var Ac={};Object.defineProperty(Ac,"__esModule",{value:!0}),Ac.default=void 0;Ac.default={};var zc={};Object.defineProperty(zc,"__esModule",{value:!0}),zc.exchange=void 0;zc.exchange={};var Rc={};Object.defineProperty(Rc,"__esModule",{value:!0}),Rc.default=void 0;Rc.default={};var Cc={};function Wc(t){return(Wc="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Cc,"__esModule",{value:!0}),Cc.default=void 0;var Fc=ol(io),Xc=ol(po),Yc=ol(vo),Nc=ol(ai),Lc=ol(pi),Bc=ol(di),Uc=ol(lr),Vc=(ol(vi),ol(Mi)),qc=ol(ra),Gc=ol(Pa),$c=ol(zs),Hc=ol(Ys),Kc=ol(Gi),Zc=ol(wc),Jc=ol(Ec),Qc=rl(Ac),tl=rl(Oe),el=rl(Rc);function nl(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return nl=function(){return t},t}function rl(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Wc(t)&&"function"!=typeof t)return{default:t};var e=nl();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function ol(t){return t&&t.__esModule?t:{default:t}}Gc.default.use(Hc.default),Gc.default.use(Uc.default),Gc.default.use(Kc.default),Gc.default.use(Lc.default),Gc.default.use(Xc.default),Gc.default.use(Zc.default),Gc.default.use(qc.default),Gc.default.use($c.default),Gc.default.use(Nc.default),Gc.default.use(Fc.default),Gc.default.use(Yc.default),Gc.default.use(Jc.default),Gc.default.use(Vc.default),Gc.default.use(Bc.default),Gc.default.vue={components:el},Gc.default.__utils={exchange:zc.exchange,displace:Qc,pointer:tl};var il=Gc.default;Cc.default=il;var al={exports:{}};Object.defineProperty(al.exports,"__esModule",{value:!0}),al.exports.default=void 0;var ul,sl=(ul=Cc)&&ul.__esModule?ul:{default:ul};function cl(t){return(cl="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}if("object"===cl(al)&&al)try{al.exports=sl.default}catch(t){}sl.default.default=sl.default;var ll=sl.default;return al.exports.default=ll,al=al.exports});

//# sourceMappingURL=interact.min.js.map


/***/ }),

/***/ "5058":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(options) {
    var idGenerator     = options.idGenerator;
    var getState        = options.stateHandler.getState;

    /**
     * Gets the resize detector id of the element.
     * @public
     * @param {element} element The target element to get the id of.
     * @returns {string|number|null} The id of the element. Null if it has no id.
     */
    function getId(element) {
        var state = getState(element);

        if (state && state.id !== undefined) {
            return state.id;
        }

        return null;
    }

    /**
     * Sets the resize detector id of the element. Requires the element to have a resize detector state initialized.
     * @public
     * @param {element} element The target element to set the id of.
     * @returns {string|number|null} The id of the element.
     */
    function setId(element) {
        var state = getState(element);

        if (!state) {
            throw new Error("setId required the element to have a resize detection state.");
        }

        var id = idGenerator.generate();

        state.id = id;

        return id;
    }

    return {
        get: getId,
        set: setId
    };
};


/***/ }),

/***/ "50bf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = module.exports = {};

utils.getOption = getOption;

function getOption(options, name, defaultValue) {
    var value = options[name];

    if((value === undefined || value === null) && defaultValue !== undefined) {
        return defaultValue;
    }

    return value;
}


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "55dd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var aFunction = __webpack_require__("d8e8");
var toObject = __webpack_require__("4bf8");
var fails = __webpack_require__("79e5");
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__("2f21")($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ "584a":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "5be5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(options) {
    var getState = options.stateHandler.getState;

    /**
     * Tells if the element has been made detectable and ready to be listened for resize events.
     * @public
     * @param {element} The element to check.
     * @returns {boolean} True or false depending on if the element is detectable or not.
     */
    function isDetectable(element) {
        var state = getState(element);
        return state && !!state.isDetectable;
    }

    /**
     * Marks the element that it has been made detectable and ready to be listened for resize events.
     * @public
     * @param {element} The element to mark.
     */
    function markAsDetectable(element) {
        getState(element).isDetectable = true;
    }

    /**
     * Tells if the element is busy or not.
     * @public
     * @param {element} The element to check.
     * @returns {boolean} True or false depending on if the element is busy or not.
     */
    function isBusy(element) {
        return !!getState(element).busy;
    }

    /**
     * Marks the object is busy and should not be made detectable.
     * @public
     * @param {element} element The element to mark.
     * @param {boolean} busy If the element is busy or not.
     */
    function markBusy(element, busy) {
        getState(element).busy = !!busy;
    }

    return {
        isDetectable: isDetectable,
        markAsDetectable: markAsDetectable,
        isBusy: isBusy,
        markBusy: markBusy
    };
};


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5ed4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GridItem_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6e21");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GridItem_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GridItem_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GridItem_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "63b6":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var ctx = __webpack_require__("d864");
var hide = __webpack_require__("35e8");
var has = __webpack_require__("07e3");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6e21":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("9cbe");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("3cbd0c21", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "7333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__("9e1e");
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("79e5")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "794b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("8e60") && !__webpack_require__("294c")(function () {
  return Object.defineProperty(__webpack_require__("1ec9")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "79aa":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "85f2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("454f");

/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "8e60":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("294c")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "8e6e":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__("5ca1");
var ownKeys = __webpack_require__("990b");
var toIObject = __webpack_require__("6821");
var gOPD = __webpack_require__("11e9");
var createProperty = __webpack_require__("f1ae");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "990b":
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__("9093");
var gOPS = __webpack_require__("2621");
var anObject = __webpack_require__("cb7c");
var Reflect = __webpack_require__("7726").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9cbe":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".vue-grid-item{-webkit-transition:all .2s ease;transition:all .2s ease;-webkit-transition-property:left,top,right;transition-property:left,top,right}.vue-grid-item.no-touch{-ms-touch-action:none;touch-action:none}.vue-grid-item.cssTransforms{-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;left:0;right:auto}.vue-grid-item.cssTransforms.render-rtl{left:auto;right:0}.vue-grid-item.resizing{opacity:.6;z-index:3}.vue-grid-item.vue-draggable-dragging{-webkit-transition:none;transition:none;z-index:3}.vue-grid-item.vue-grid-placeholder{background:red;opacity:.2;-webkit-transition-duration:.1s;transition-duration:.1s;z-index:2;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}.vue-grid-item>.vue-resizable-handle{position:absolute;width:20px;height:20px;bottom:0;right:0;background:url(\"data:image/svg+xml;base64,PHN2ZyBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjYiIGhlaWdodD0iNiI+PHBhdGggZD0iTTYgNkgwVjQuMmg0LjJWMEg2djZ6IiBvcGFjaXR5PSIuMzAyIi8+PC9zdmc+\");background-position:100% 100%;padding:0 3px 3px 0;background-repeat:no-repeat;background-origin:content-box;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:se-resize}.vue-grid-item>.vue-rtl-resizable-handle{bottom:0;left:0;background:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTS0xLTFoMTJ2MTJILTF6Ii8+PGc+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InVuZGVmaW5lZCIgc3Ryb2tlLWxpbmVqb2luPSJ1bmRlZmluZWQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2U9IiMwMDAiIGZpbGw9Im5vbmUiIGQ9Ik0xNDQuODIxLTM4LjM5M2wtMjAuMzU3LTMxLjc4NSIvPjxwYXRoIHN0cm9rZT0iIzY2NiIgc3Ryb2tlLWxpbmVjYXA9InVuZGVmaW5lZCIgc3Ryb2tlLWxpbmVqb2luPSJ1bmRlZmluZWQiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgZD0iTS45NDctLjAxOHY5LjEyNU0tLjY1NiA5aDEwLjczIi8+PC9nPjwvc3ZnPg==);background-position:0 100%;padding-left:3px;background-repeat:no-repeat;background-origin:content-box;cursor:sw-resize;right:auto}.vue-grid-item.disable-userselect{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}", ""]);

// exports


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "abb4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global console: false */

/**
 * Reporter that handles the reporting of logs, warnings and errors.
 * @public
 * @param {boolean} quiet Tells if the reporter should be quiet or not.
 */
module.exports = function(quiet) {
    function noop() {
        //Does nothing.
    }

    var reporter = {
        log: noop,
        warn: noop,
        error: noop
    };

    if(!quiet && window.console) {
        var attachFunction = function(reporter, name) {
            //The proxy is needed to be able to call the method with the console context,
            //since we cannot use bind.
            reporter[name] = function reporterProxy() {
                var f = console[name];
                if (f.apply) { //IE9 does not support console.log.apply :)
                    f.apply(console, arguments);
                } else {
                    for (var i = 0; i < arguments.length; i++) {
                        f(arguments[i]);
                    }
                }
            };
        };

        attachFunction(reporter, "log");
        attachFunction(reporter, "warn");
        attachFunction(reporter, "error");
    }

    return reporter;
};

/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "ad20":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, ".vue-grid-layout{position:relative;-webkit-transition:height .2s ease;transition:height .2s ease}", ""]);

// exports


/***/ }),

/***/ "aebd":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b770":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = module.exports = {};

/**
 * Loops through the collection and calls the callback for each element. if the callback returns truthy, the loop is broken and returns the same value.
 * @public
 * @param {*} collection The collection to loop through. Needs to have a length property set and have indices set from 0 to length - 1.
 * @param {function} callback The callback to be called for each element. The element will be given as a parameter to the callback. If this callback returns truthy, the loop is broken and the same value is returned.
 * @returns {*} The value that a callback has returned (if truthy). Otherwise nothing.
 */
utils.forEach = function(collection, callback) {
    for(var i = 0; i < collection.length; i++) {
        var result = callback(collection[i]);
        if(result) {
            return result;
        }
    }
};


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c274":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("50bf");

module.exports = function batchProcessorMaker(options) {
    options             = options || {};
    var reporter        = options.reporter;
    var asyncProcess    = utils.getOption(options, "async", true);
    var autoProcess     = utils.getOption(options, "auto", true);

    if(autoProcess && !asyncProcess) {
        reporter && reporter.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true.");
        asyncProcess = true;
    }

    var batch = Batch();
    var asyncFrameHandler;
    var isProcessing = false;

    function addFunction(level, fn) {
        if(!isProcessing && autoProcess && asyncProcess && batch.size() === 0) {
            // Since this is async, it is guaranteed to be executed after that the fn is added to the batch.
            // This needs to be done before, since we're checking the size of the batch to be 0.
            processBatchAsync();
        }

        batch.add(level, fn);
    }

    function processBatch() {
        // Save the current batch, and create a new batch so that incoming functions are not added into the currently processing batch.
        // Continue processing until the top-level batch is empty (functions may be added to the new batch while processing, and so on).
        isProcessing = true;
        while (batch.size()) {
            var processingBatch = batch;
            batch = Batch();
            processingBatch.process();
        }
        isProcessing = false;
    }

    function forceProcessBatch(localAsyncProcess) {
        if (isProcessing) {
            return;
        }

        if(localAsyncProcess === undefined) {
            localAsyncProcess = asyncProcess;
        }

        if(asyncFrameHandler) {
            cancelFrame(asyncFrameHandler);
            asyncFrameHandler = null;
        }

        if(localAsyncProcess) {
            processBatchAsync();
        } else {
            processBatch();
        }
    }

    function processBatchAsync() {
        asyncFrameHandler = requestFrame(processBatch);
    }

    function clearBatch() {
        batch           = {};
        batchSize       = 0;
        topLevel        = 0;
        bottomLevel     = 0;
    }

    function cancelFrame(listener) {
        // var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
        var cancel = clearTimeout;
        return cancel(listener);
    }

    function requestFrame(callback) {
        // var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) { return window.setTimeout(fn, 20); };
        var raf = function(fn) { return setTimeout(fn, 0); };
        return raf(callback);
    }

    return {
        add: addFunction,
        force: forceProcessBatch
    };
};

function Batch() {
    var batch       = {};
    var size        = 0;
    var topLevel    = 0;
    var bottomLevel = 0;

    function add(level, fn) {
        if(!fn) {
            fn = level;
            level = 0;
        }

        if(level > topLevel) {
            topLevel = level;
        } else if(level < bottomLevel) {
            bottomLevel = level;
        }

        if(!batch[level]) {
            batch[level] = [];
        }

        batch[level].push(fn);
        size++;
    }

    function process() {
        for(var level = bottomLevel; level <= topLevel; level++) {
            var fns = batch[level];

            for(var i = 0; i < fns.length; i++) {
                var fn = fns[i];
                fn();
            }
        }
    }

    function getSize() {
        return size;
    }

    return {
        add: add,
        process: process,
        size: getSize
    };
}


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c946":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Resize detection strategy that injects divs to elements in order to detect resize events on scroll events.
 * Heavily inspired by: https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
 */



var forEach = __webpack_require__("b770").forEach;

module.exports = function(options) {
    options             = options || {};
    var reporter        = options.reporter;
    var batchProcessor  = options.batchProcessor;
    var getState        = options.stateHandler.getState;
    var hasState        = options.stateHandler.hasState;
    var idHandler       = options.idHandler;

    if (!batchProcessor) {
        throw new Error("Missing required dependency: batchProcessor");
    }

    if (!reporter) {
        throw new Error("Missing required dependency: reporter.");
    }

    //TODO: Could this perhaps be done at installation time?
    var scrollbarSizes = getScrollbarSizes();

    var styleId = "erd_scroll_detection_scrollbar_style";
    var detectionContainerClass = "erd_scroll_detection_container";

    function initDocument(targetDocument) {
        // Inject the scrollbar styling that prevents them from appearing sometimes in Chrome.
        // The injected container needs to have a class, so that it may be styled with CSS (pseudo elements).
        injectScrollStyle(targetDocument, styleId, detectionContainerClass);
    }

    initDocument(window.document);

    function buildCssTextString(rules) {
        var seperator = options.important ? " !important; " : "; ";

        return (rules.join(seperator) + seperator).trim();
    }

    function getScrollbarSizes() {
        var width = 500;
        var height = 500;

        var child = document.createElement("div");
        child.style.cssText = buildCssTextString(["position: absolute", "width: " + width*2 + "px", "height: " + height*2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);

        var container = document.createElement("div");
        container.style.cssText = buildCssTextString(["position: absolute", "width: " + width + "px", "height: " + height + "px", "overflow: scroll", "visibility: none", "top: " + -width*3 + "px", "left: " + -height*3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);

        container.appendChild(child);

        document.body.insertBefore(container, document.body.firstChild);

        var widthSize = width - container.clientWidth;
        var heightSize = height - container.clientHeight;

        document.body.removeChild(container);

        return {
            width: widthSize,
            height: heightSize
        };
    }

    function injectScrollStyle(targetDocument, styleId, containerClass) {
        function injectStyle(style, method) {
            method = method || function (element) {
                targetDocument.head.appendChild(element);
            };

            var styleElement = targetDocument.createElement("style");
            styleElement.innerHTML = style;
            styleElement.id = styleId;
            method(styleElement);
            return styleElement;
        }

        if (!targetDocument.getElementById(styleId)) {
            var containerAnimationClass = containerClass + "_animation";
            var containerAnimationActiveClass = containerClass + "_animation_active";
            var style = "/* Created by the element-resize-detector library. */\n";
            style += "." + containerClass + " > div::-webkit-scrollbar { " + buildCssTextString(["display: none"]) + " }\n\n";
            style += "." + containerAnimationActiveClass + " { " + buildCssTextString(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + containerAnimationClass, "animation-name: " + containerAnimationClass]) + " }\n";
            style += "@-webkit-keyframes " + containerAnimationClass +  " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n";
            style += "@keyframes " + containerAnimationClass +          " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }";
            injectStyle(style);
        }
    }

    function addAnimationClass(element) {
        element.className += " " + detectionContainerClass + "_animation_active";
    }

    function addEvent(el, name, cb) {
        if (el.addEventListener) {
            el.addEventListener(name, cb);
        } else if(el.attachEvent) {
            el.attachEvent("on" + name, cb);
        } else {
            return reporter.error("[scroll] Don't know how to add event listeners.");
        }
    }

    function removeEvent(el, name, cb) {
        if (el.removeEventListener) {
            el.removeEventListener(name, cb);
        } else if(el.detachEvent) {
            el.detachEvent("on" + name, cb);
        } else {
            return reporter.error("[scroll] Don't know how to remove event listeners.");
        }
    }

    function getExpandElement(element) {
        return getState(element).container.childNodes[0].childNodes[0].childNodes[0];
    }

    function getShrinkElement(element) {
        return getState(element).container.childNodes[0].childNodes[0].childNodes[1];
    }

    /**
     * Adds a resize event listener to the element.
     * @public
     * @param {element} element The element that should have the listener added.
     * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
     */
    function addListener(element, listener) {
        var listeners = getState(element).listeners;

        if (!listeners.push) {
            throw new Error("Cannot add listener to an element that is not detectable.");
        }

        getState(element).listeners.push(listener);
    }

    /**
     * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
     * @private
     * @param {object} options Optional options object.
     * @param {element} element The element to make detectable
     * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
     */
    function makeDetectable(options, element, callback) {
        if (!callback) {
            callback = element;
            element = options;
            options = null;
        }

        options = options || {};

        function debug() {
            if (options.debug) {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(idHandler.get(element), "Scroll: ");
                if (reporter.log.apply) {
                    reporter.log.apply(null, args);
                } else {
                    for (var i = 0; i < args.length; i++) {
                        reporter.log(args[i]);
                    }
                }
            }
        }

        function isDetached(element) {
            function isInDocument(element) {
                return element === element.ownerDocument.body || element.ownerDocument.body.contains(element);
            }

            if (!isInDocument(element)) {
                return true;
            }

            // FireFox returns null style in hidden iframes. See https://github.com/wnr/element-resize-detector/issues/68 and https://bugzilla.mozilla.org/show_bug.cgi?id=795520
            if (window.getComputedStyle(element) === null) {
                return true;
            }

            return false;
        }

        function isUnrendered(element) {
            // Check the absolute positioned container since the top level container is display: inline.
            var container = getState(element).container.childNodes[0];
            var style = window.getComputedStyle(container);
            return !style.width || style.width.indexOf("px") === -1; //Can only compute pixel value when rendered.
        }

        function getStyle() {
            // Some browsers only force layouts when actually reading the style properties of the style object, so make sure that they are all read here,
            // so that the user of the function can be sure that it will perform the layout here, instead of later (important for batching).
            var elementStyle            = window.getComputedStyle(element);
            var style                   = {};
            style.position              = elementStyle.position;
            style.width                 = element.offsetWidth;
            style.height                = element.offsetHeight;
            style.top                   = elementStyle.top;
            style.right                 = elementStyle.right;
            style.bottom                = elementStyle.bottom;
            style.left                  = elementStyle.left;
            style.widthCSS              = elementStyle.width;
            style.heightCSS             = elementStyle.height;
            return style;
        }

        function storeStartSize() {
            var style = getStyle();
            getState(element).startSize = {
                width: style.width,
                height: style.height
            };
            debug("Element start size", getState(element).startSize);
        }

        function initListeners() {
            getState(element).listeners = [];
        }

        function storeStyle() {
            debug("storeStyle invoked.");
            if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
            }

            var style = getStyle();
            getState(element).style = style;
        }

        function storeCurrentSize(element, width, height) {
            getState(element).lastWidth = width;
            getState(element).lastHeight  = height;
        }

        function getExpandChildElement(element) {
            return getExpandElement(element).childNodes[0];
        }

        function getWidthOffset() {
            return 2 * scrollbarSizes.width + 1;
        }

        function getHeightOffset() {
            return 2 * scrollbarSizes.height + 1;
        }

        function getExpandWidth(width) {
            return width + 10 + getWidthOffset();
        }

        function getExpandHeight(height) {
            return height + 10 + getHeightOffset();
        }

        function getShrinkWidth(width) {
            return width * 2 + getWidthOffset();
        }

        function getShrinkHeight(height) {
            return height * 2 + getHeightOffset();
        }

        function positionScrollbars(element, width, height) {
            var expand          = getExpandElement(element);
            var shrink          = getShrinkElement(element);
            var expandWidth     = getExpandWidth(width);
            var expandHeight    = getExpandHeight(height);
            var shrinkWidth     = getShrinkWidth(width);
            var shrinkHeight    = getShrinkHeight(height);
            expand.scrollLeft   = expandWidth;
            expand.scrollTop    = expandHeight;
            shrink.scrollLeft   = shrinkWidth;
            shrink.scrollTop    = shrinkHeight;
        }

        function injectContainerElement() {
            var container = getState(element).container;

            if (!container) {
                container                   = document.createElement("div");
                container.className         = detectionContainerClass;
                container.style.cssText     = buildCssTextString(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]);
                getState(element).container = container;
                addAnimationClass(container);
                element.appendChild(container);

                var onAnimationStart = function () {
                    getState(element).onRendered && getState(element).onRendered();
                };

                addEvent(container, "animationstart", onAnimationStart);

                // Store the event handler here so that they may be removed when uninstall is called.
                // See uninstall function for an explanation why it is needed.
                getState(element).onAnimationStart = onAnimationStart;
            }

            return container;
        }

        function injectScrollElements() {
            function alterPositionStyles() {
                var style = getState(element).style;

                if(style.position === "static") {
                    element.style.setProperty("position", "relative",options.important ? "important" : "");

                    var removeRelativeStyles = function(reporter, element, style, property) {
                        function getNumericalValue(value) {
                            return value.replace(/[^-\d\.]/g, "");
                        }

                        var value = style[property];

                        if(value !== "auto" && getNumericalValue(value) !== "0") {
                            reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element);
                            element.style[property] = 0;
                        }
                    };

                    //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
                    //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).
                    removeRelativeStyles(reporter, element, style, "top");
                    removeRelativeStyles(reporter, element, style, "right");
                    removeRelativeStyles(reporter, element, style, "bottom");
                    removeRelativeStyles(reporter, element, style, "left");
                }
            }

            function getLeftTopBottomRightCssText(left, top, bottom, right) {
                left = (!left ? "0" : (left + "px"));
                top = (!top ? "0" : (top + "px"));
                bottom = (!bottom ? "0" : (bottom + "px"));
                right = (!right ? "0" : (right + "px"));

                return ["left: " + left, "top: " + top, "right: " + right, "bottom: " + bottom];
            }

            debug("Injecting elements");

            if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
            }

            alterPositionStyles();

            var rootContainer = getState(element).container;

            if (!rootContainer) {
                rootContainer = injectContainerElement();
            }

            // Due to this WebKit bug https://bugs.webkit.org/show_bug.cgi?id=80808 (currently fixed in Blink, but still present in WebKit browsers such as Safari),
            // we need to inject two containers, one that is width/height 100% and another that is left/top -1px so that the final container always is 1x1 pixels bigger than
            // the targeted element.
            // When the bug is resolved, "containerContainer" may be removed.

            // The outer container can occasionally be less wide than the targeted when inside inline elements element in WebKit (see https://bugs.webkit.org/show_bug.cgi?id=152980).
            // This should be no problem since the inner container either way makes sure the injected scroll elements are at least 1x1 px.

            var scrollbarWidth          = scrollbarSizes.width;
            var scrollbarHeight         = scrollbarSizes.height;
            var containerContainerStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]);
            var containerStyle          = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat(getLeftTopBottomRightCssText(-(1 + scrollbarWidth), -(1 + scrollbarHeight), -scrollbarHeight, -scrollbarWidth)));
            var expandStyle             = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
            var shrinkStyle             = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
            var expandChildStyle        = buildCssTextString(["position: absolute", "left: 0", "top: 0"]);
            var shrinkChildStyle        = buildCssTextString(["position: absolute", "width: 200%", "height: 200%"]);

            var containerContainer      = document.createElement("div");
            var container               = document.createElement("div");
            var expand                  = document.createElement("div");
            var expandChild             = document.createElement("div");
            var shrink                  = document.createElement("div");
            var shrinkChild             = document.createElement("div");

            // Some browsers choke on the resize system being rtl, so force it to ltr. https://github.com/wnr/element-resize-detector/issues/56
            // However, dir should not be set on the top level container as it alters the dimensions of the target element in some browsers.
            containerContainer.dir              = "ltr";

            containerContainer.style.cssText    = containerContainerStyle;
            containerContainer.className        = detectionContainerClass;
            container.className                 = detectionContainerClass;
            container.style.cssText             = containerStyle;
            expand.style.cssText                = expandStyle;
            expandChild.style.cssText           = expandChildStyle;
            shrink.style.cssText                = shrinkStyle;
            shrinkChild.style.cssText           = shrinkChildStyle;

            expand.appendChild(expandChild);
            shrink.appendChild(shrinkChild);
            container.appendChild(expand);
            container.appendChild(shrink);
            containerContainer.appendChild(container);
            rootContainer.appendChild(containerContainer);

            function onExpandScroll() {
                getState(element).onExpand && getState(element).onExpand();
            }

            function onShrinkScroll() {
                getState(element).onShrink && getState(element).onShrink();
            }

            addEvent(expand, "scroll", onExpandScroll);
            addEvent(shrink, "scroll", onShrinkScroll);

            // Store the event handlers here so that they may be removed when uninstall is called.
            // See uninstall function for an explanation why it is needed.
            getState(element).onExpandScroll = onExpandScroll;
            getState(element).onShrinkScroll = onShrinkScroll;
        }

        function registerListenersAndPositionElements() {
            function updateChildSizes(element, width, height) {
                var expandChild             = getExpandChildElement(element);
                var expandWidth             = getExpandWidth(width);
                var expandHeight            = getExpandHeight(height);
                expandChild.style.setProperty("width", expandWidth + "px", options.important ? "important" : "");
                expandChild.style.setProperty("height", expandHeight + "px", options.important ? "important" : "");
            }

            function updateDetectorElements(done) {
                var width           = element.offsetWidth;
                var height          = element.offsetHeight;

                // Check whether the size has actually changed since last time the algorithm ran. If not, some steps may be skipped.
                var sizeChanged = width !== getState(element).lastWidth || height !== getState(element).lastHeight;

                debug("Storing current size", width, height);

                // Store the size of the element sync here, so that multiple scroll events may be ignored in the event listeners.
                // Otherwise the if-check in handleScroll is useless.
                storeCurrentSize(element, width, height);

                // Since we delay the processing of the batch, there is a risk that uninstall has been called before the batch gets to execute.
                // Since there is no way to cancel the fn executions, we need to add an uninstall guard to all fns of the batch.

                batchProcessor.add(0, function performUpdateChildSizes() {
                    if (!sizeChanged) {
                        return;
                    }

                    if (!getState(element)) {
                        debug("Aborting because element has been uninstalled");
                        return;
                    }

                    if (!areElementsInjected()) {
                        debug("Aborting because element container has not been initialized");
                        return;
                    }

                    if (options.debug) {
                        var w = element.offsetWidth;
                        var h = element.offsetHeight;

                        if (w !== width || h !== height) {
                            reporter.warn(idHandler.get(element), "Scroll: Size changed before updating detector elements.");
                        }
                    }

                    updateChildSizes(element, width, height);
                });

                batchProcessor.add(1, function updateScrollbars() {
                    // This function needs to be invoked event though the size is unchanged. The element could have been resized very quickly and then
                    // been restored to the original size, which will have changed the scrollbar positions.

                    if (!getState(element)) {
                        debug("Aborting because element has been uninstalled");
                        return;
                    }

                    if (!areElementsInjected()) {
                        debug("Aborting because element container has not been initialized");
                        return;
                    }

                    positionScrollbars(element, width, height);
                });

                if (sizeChanged && done) {
                    batchProcessor.add(2, function () {
                        if (!getState(element)) {
                            debug("Aborting because element has been uninstalled");
                            return;
                        }

                        if (!areElementsInjected()) {
                          debug("Aborting because element container has not been initialized");
                          return;
                        }

                        done();
                    });
                }
            }

            function areElementsInjected() {
                return !!getState(element).container;
            }

            function notifyListenersIfNeeded() {
                function isFirstNotify() {
                    return getState(element).lastNotifiedWidth === undefined;
                }

                debug("notifyListenersIfNeeded invoked");

                var state = getState(element);

                // Don't notify if the current size is the start size, and this is the first notification.
                if (isFirstNotify() && state.lastWidth === state.startSize.width && state.lastHeight === state.startSize.height) {
                    return debug("Not notifying: Size is the same as the start size, and there has been no notification yet.");
                }

                // Don't notify if the size already has been notified.
                if (state.lastWidth === state.lastNotifiedWidth && state.lastHeight === state.lastNotifiedHeight) {
                    return debug("Not notifying: Size already notified");
                }


                debug("Current size not notified, notifying...");
                state.lastNotifiedWidth = state.lastWidth;
                state.lastNotifiedHeight = state.lastHeight;
                forEach(getState(element).listeners, function (listener) {
                    listener(element);
                });
            }

            function handleRender() {
                debug("startanimation triggered.");

                if (isUnrendered(element)) {
                    debug("Ignoring since element is still unrendered...");
                    return;
                }

                debug("Element rendered.");
                var expand = getExpandElement(element);
                var shrink = getShrinkElement(element);
                if (expand.scrollLeft === 0 || expand.scrollTop === 0 || shrink.scrollLeft === 0 || shrink.scrollTop === 0) {
                    debug("Scrollbars out of sync. Updating detector elements...");
                    updateDetectorElements(notifyListenersIfNeeded);
                }
            }

            function handleScroll() {
                debug("Scroll detected.");

                if (isUnrendered(element)) {
                    // Element is still unrendered. Skip this scroll event.
                    debug("Scroll event fired while unrendered. Ignoring...");
                    return;
                }

                updateDetectorElements(notifyListenersIfNeeded);
            }

            debug("registerListenersAndPositionElements invoked.");

            if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
            }

            getState(element).onRendered = handleRender;
            getState(element).onExpand = handleScroll;
            getState(element).onShrink = handleScroll;

            var style = getState(element).style;
            updateChildSizes(element, style.width, style.height);
        }

        function finalizeDomMutation() {
            debug("finalizeDomMutation invoked.");

            if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
            }

            var style = getState(element).style;
            storeCurrentSize(element, style.width, style.height);
            positionScrollbars(element, style.width, style.height);
        }

        function ready() {
            callback(element);
        }

        function install() {
            debug("Installing...");
            initListeners();
            storeStartSize();

            batchProcessor.add(0, storeStyle);
            batchProcessor.add(1, injectScrollElements);
            batchProcessor.add(2, registerListenersAndPositionElements);
            batchProcessor.add(3, finalizeDomMutation);
            batchProcessor.add(4, ready);
        }

        debug("Making detectable...");

        if (isDetached(element)) {
            debug("Element is detached");

            injectContainerElement();

            debug("Waiting until element is attached...");

            getState(element).onRendered = function () {
                debug("Element is now attached");
                install();
            };
        } else {
            install();
        }
    }

    function uninstall(element) {
        var state = getState(element);

        if (!state) {
            // Uninstall has been called on a non-erd element.
            return;
        }

        // Uninstall may have been called in the following scenarios:
        // (1) Right between the sync code and async batch (here state.busy = true, but nothing have been registered or injected).
        // (2) In the ready callback of the last level of the batch by another element (here, state.busy = true, but all the stuff has been injected).
        // (3) After the installation process (here, state.busy = false and all the stuff has been injected).
        // So to be on the safe side, let's check for each thing before removing.

        // We need to remove the event listeners, because otherwise the event might fire on an uninstall element which results in an error when trying to get the state of the element.
        state.onExpandScroll && removeEvent(getExpandElement(element), "scroll", state.onExpandScroll);
        state.onShrinkScroll && removeEvent(getShrinkElement(element), "scroll", state.onShrinkScroll);
        state.onAnimationStart && removeEvent(state.container, "animationstart", state.onAnimationStart);

        state.container && element.removeChild(state.container);
    }

    return {
        makeDetectable: makeDetectable,
        addListener: addListener,
        uninstall: uninstall,
        initDocument: initDocument
    };
};


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d6eb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var prop = "_erd";

function initState(element) {
    element[prop] = {};
    return getState(element);
}

function getState(element) {
    return element[prop];
}

function cleanState(element) {
    delete element[prop];
}

module.exports = {
    initState: initState,
    getState: getState,
    cleanState: cleanState
};


/***/ }),

/***/ "d864":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("79aa");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "d9f6":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var IE8_DOM_DEFINE = __webpack_require__("794b");
var toPrimitive = __webpack_require__("1bc3");
var dP = Object.defineProperty;

exports.f = __webpack_require__("8e60") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e279":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GridLayout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1156");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GridLayout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GridLayout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GridLayout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e4ae":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "e53d":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "eec4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach                 = __webpack_require__("b770").forEach;
var elementUtilsMaker       = __webpack_require__("5be5");
var listenerHandlerMaker    = __webpack_require__("49ad");
var idGeneratorMaker        = __webpack_require__("2cef");
var idHandlerMaker          = __webpack_require__("5058");
var reporterMaker           = __webpack_require__("abb4");
var browserDetector         = __webpack_require__("18e9");
var batchProcessorMaker     = __webpack_require__("c274");
var stateHandler            = __webpack_require__("d6eb");

//Detection strategies.
var objectStrategyMaker     = __webpack_require__("18d2");
var scrollStrategyMaker     = __webpack_require__("c946");

function isCollection(obj) {
    return Array.isArray(obj) || obj.length !== undefined;
}

function toArray(collection) {
    if (!Array.isArray(collection)) {
        var array = [];
        forEach(collection, function (obj) {
            array.push(obj);
        });
        return array;
    } else {
        return collection;
    }
}

function isElement(obj) {
    return obj && obj.nodeType === 1;
}

/**
 * @typedef idHandler
 * @type {object}
 * @property {function} get Gets the resize detector id of the element.
 * @property {function} set Generate and sets the resize detector id of the element.
 */

/**
 * @typedef Options
 * @type {object}
 * @property {boolean} callOnAdd    Determines if listeners should be called when they are getting added.
                                    Default is true. If true, the listener is guaranteed to be called when it has been added.
                                    If false, the listener will not be guarenteed to be called when it has been added (does not prevent it from being called).
 * @property {idHandler} idHandler  A custom id handler that is responsible for generating, setting and retrieving id's for elements.
                                    If not provided, a default id handler will be used.
 * @property {reporter} reporter    A custom reporter that handles reporting logs, warnings and errors.
                                    If not provided, a default id handler will be used.
                                    If set to false, then nothing will be reported.
 * @property {boolean} debug        If set to true, the the system will report debug messages as default for the listenTo method.
 */

/**
 * Creates an element resize detector instance.
 * @public
 * @param {Options?} options Optional global options object that will decide how this instance will work.
 */
module.exports = function(options) {
    options = options || {};

    //idHandler is currently not an option to the listenTo function, so it should not be added to globalOptions.
    var idHandler;

    if (options.idHandler) {
        // To maintain compatability with idHandler.get(element, readonly), make sure to wrap the given idHandler
        // so that readonly flag always is true when it's used here. This may be removed next major version bump.
        idHandler = {
            get: function (element) { return options.idHandler.get(element, true); },
            set: options.idHandler.set
        };
    } else {
        var idGenerator = idGeneratorMaker();
        var defaultIdHandler = idHandlerMaker({
            idGenerator: idGenerator,
            stateHandler: stateHandler
        });
        idHandler = defaultIdHandler;
    }

    //reporter is currently not an option to the listenTo function, so it should not be added to globalOptions.
    var reporter = options.reporter;

    if(!reporter) {
        //If options.reporter is false, then the reporter should be quiet.
        var quiet = reporter === false;
        reporter = reporterMaker(quiet);
    }

    //batchProcessor is currently not an option to the listenTo function, so it should not be added to globalOptions.
    var batchProcessor = getOption(options, "batchProcessor", batchProcessorMaker({ reporter: reporter }));

    //Options to be used as default for the listenTo function.
    var globalOptions = {};
    globalOptions.callOnAdd     = !!getOption(options, "callOnAdd", true);
    globalOptions.debug         = !!getOption(options, "debug", false);

    var eventListenerHandler    = listenerHandlerMaker(idHandler);
    var elementUtils            = elementUtilsMaker({
        stateHandler: stateHandler
    });

    //The detection strategy to be used.
    var detectionStrategy;
    var desiredStrategy = getOption(options, "strategy", "object");
    var importantCssRules = getOption(options, "important", false);
    var strategyOptions = {
        reporter: reporter,
        batchProcessor: batchProcessor,
        stateHandler: stateHandler,
        idHandler: idHandler,
        important: importantCssRules
    };

    if(desiredStrategy === "scroll") {
        if (browserDetector.isLegacyOpera()) {
            reporter.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy.");
            desiredStrategy = "object";
        } else if (browserDetector.isIE(9)) {
            reporter.warn("Scroll strategy is not supported on IE9. Changing to object strategy.");
            desiredStrategy = "object";
        }
    }

    if(desiredStrategy === "scroll") {
        detectionStrategy = scrollStrategyMaker(strategyOptions);
    } else if(desiredStrategy === "object") {
        detectionStrategy = objectStrategyMaker(strategyOptions);
    } else {
        throw new Error("Invalid strategy name: " + desiredStrategy);
    }

    //Calls can be made to listenTo with elements that are still being installed.
    //Also, same elements can occur in the elements list in the listenTo function.
    //With this map, the ready callbacks can be synchronized between the calls
    //so that the ready callback can always be called when an element is ready - even if
    //it wasn't installed from the function itself.
    var onReadyCallbacks = {};

    /**
     * Makes the given elements resize-detectable and starts listening to resize events on the elements. Calls the event callback for each event for each element.
     * @public
     * @param {Options?} options Optional options object. These options will override the global options. Some options may not be overriden, such as idHandler.
     * @param {element[]|element} elements The given array of elements to detect resize events of. Single element is also valid.
     * @param {function} listener The callback to be executed for each resize event for each element.
     */
    function listenTo(options, elements, listener) {
        function onResizeCallback(element) {
            var listeners = eventListenerHandler.get(element);
            forEach(listeners, function callListenerProxy(listener) {
                listener(element);
            });
        }

        function addListener(callOnAdd, element, listener) {
            eventListenerHandler.add(element, listener);

            if(callOnAdd) {
                listener(element);
            }
        }

        //Options object may be omitted.
        if(!listener) {
            listener = elements;
            elements = options;
            options = {};
        }

        if(!elements) {
            throw new Error("At least one element required.");
        }

        if(!listener) {
            throw new Error("Listener required.");
        }

        if (isElement(elements)) {
            // A single element has been passed in.
            elements = [elements];
        } else if (isCollection(elements)) {
            // Convert collection to array for plugins.
            // TODO: May want to check so that all the elements in the collection are valid elements.
            elements = toArray(elements);
        } else {
            return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
        }

        var elementsReady = 0;

        var callOnAdd = getOption(options, "callOnAdd", globalOptions.callOnAdd);
        var onReadyCallback = getOption(options, "onReady", function noop() {});
        var debug = getOption(options, "debug", globalOptions.debug);

        forEach(elements, function attachListenerToElement(element) {
            if (!stateHandler.getState(element)) {
                stateHandler.initState(element);
                idHandler.set(element);
            }

            var id = idHandler.get(element);

            debug && reporter.log("Attaching listener to element", id, element);

            if(!elementUtils.isDetectable(element)) {
                debug && reporter.log(id, "Not detectable.");
                if(elementUtils.isBusy(element)) {
                    debug && reporter.log(id, "System busy making it detectable");

                    //The element is being prepared to be detectable. Do not make it detectable.
                    //Just add the listener, because the element will soon be detectable.
                    addListener(callOnAdd, element, listener);
                    onReadyCallbacks[id] = onReadyCallbacks[id] || [];
                    onReadyCallbacks[id].push(function onReady() {
                        elementsReady++;

                        if(elementsReady === elements.length) {
                            onReadyCallback();
                        }
                    });
                    return;
                }

                debug && reporter.log(id, "Making detectable...");
                //The element is not prepared to be detectable, so do prepare it and add a listener to it.
                elementUtils.markBusy(element, true);
                return detectionStrategy.makeDetectable({ debug: debug, important: importantCssRules }, element, function onElementDetectable(element) {
                    debug && reporter.log(id, "onElementDetectable");

                    if (stateHandler.getState(element)) {
                        elementUtils.markAsDetectable(element);
                        elementUtils.markBusy(element, false);
                        detectionStrategy.addListener(element, onResizeCallback);
                        addListener(callOnAdd, element, listener);

                        // Since the element size might have changed since the call to "listenTo", we need to check for this change,
                        // so that a resize event may be emitted.
                        // Having the startSize object is optional (since it does not make sense in some cases such as unrendered elements), so check for its existance before.
                        // Also, check the state existance before since the element may have been uninstalled in the installation process.
                        var state = stateHandler.getState(element);
                        if (state && state.startSize) {
                            var width = element.offsetWidth;
                            var height = element.offsetHeight;
                            if (state.startSize.width !== width || state.startSize.height !== height) {
                                onResizeCallback(element);
                            }
                        }

                        if(onReadyCallbacks[id]) {
                            forEach(onReadyCallbacks[id], function(callback) {
                                callback();
                            });
                        }
                    } else {
                        // The element has been unisntalled before being detectable.
                        debug && reporter.log(id, "Element uninstalled before being detectable.");
                    }

                    delete onReadyCallbacks[id];

                    elementsReady++;
                    if(elementsReady === elements.length) {
                        onReadyCallback();
                    }
                });
            }

            debug && reporter.log(id, "Already detecable, adding listener.");

            //The element has been prepared to be detectable and is ready to be listened to.
            addListener(callOnAdd, element, listener);
            elementsReady++;
        });

        if(elementsReady === elements.length) {
            onReadyCallback();
        }
    }

    function uninstall(elements) {
        if(!elements) {
            return reporter.error("At least one element is required.");
        }

        if (isElement(elements)) {
            // A single element has been passed in.
            elements = [elements];
        } else if (isCollection(elements)) {
            // Convert collection to array for plugins.
            // TODO: May want to check so that all the elements in the collection are valid elements.
            elements = toArray(elements);
        } else {
            return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
        }

        forEach(elements, function (element) {
            eventListenerHandler.removeAllListeners(element);
            detectionStrategy.uninstall(element);
            stateHandler.cleanState(element);
        });
    }

    function initDocument(targetDocument) {
        detectionStrategy.initDocument && detectionStrategy.initDocument(targetDocument);
    }

    return {
        listenTo: listenTo,
        removeListener: eventListenerHandler.removeListener,
        removeAllListeners: eventListenerHandler.removeAllListeners,
        uninstall: uninstall,
        initDocument: initDocument
    };
};

function getOption(options, name, defaultValue) {
    var value = options[name];

    if((value === undefined || value === null) && defaultValue !== undefined) {
        return defaultValue;
    }

    return value;
}


/***/ }),

/***/ "f1ae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f751":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


/***/ }),

/***/ "f772":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "GridLayout", function() { return /* reexport */ GridLayout; });
__webpack_require__.d(__webpack_exports__, "GridItem", function() { return /* reexport */ GridItem; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"407b6f88-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GridItem.vue?vue&type=template&id=c806aad8&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"item",staticClass:"vue-grid-item",class:_vm.classObj,style:(_vm.style)},[_vm._t("default"),(_vm.resizableAndNotStatic)?_c('span',{ref:"handle",class:_vm.resizableHandleClass}):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/GridItem.vue?vue&type=template&id=c806aad8&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__("4917");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.sort.js
var es6_array_sort = __webpack_require__("55dd");

// CONCATENATED MODULE: ./src/helpers/utils.js




// @flow

/*:: export type LayoutItemRequired = {w: number, h: number, x: number, y: number, i: string};*/

/*:: export type LayoutItem = LayoutItemRequired &
                         {minW?: number, minH?: number, maxW?: number, maxH?: number,
                          moved?: boolean, static?: boolean,
                          isDraggable?: ?boolean, isResizable?: ?boolean};*/

// export type Position = {left: number, top: number, width: number, height: number};

/*
export type DragCallbackData = {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number
};
*/
// export type DragEvent = {e: Event} & DragCallbackData;

/*:: export type Layout = Array<LayoutItem>;*/

// export type ResizeEvent = {e: Event, node: HTMLElement, size: Size};
// const isProduction = process.env.NODE_ENV === 'production';

/**
 * Return the bottom coordinate of the layout.
 *
 * @param  {Array} layout Layout array.
 * @return {Number}       Bottom coordinate.
 */

/*:: export type Size = {width: number, height: number};*/

function bottom(layout
/*: Layout*/
)
/*: number*/
{
  var max = 0,
      bottomY;

  for (var i = 0, len = layout.length; i < len; i++) {
    bottomY = layout[i].y + layout[i].h;
    if (bottomY > max) max = bottomY;
  }

  return max;
}
function cloneLayout(layout
/*: Layout*/
)
/*: Layout*/
{
  var newLayout = Array(layout.length);

  for (var i = 0, len = layout.length; i < len; i++) {
    newLayout[i] = cloneLayoutItem(layout[i]);
  }

  return newLayout;
} // Fast path to cloning, since this is monomorphic

function cloneLayoutItem(layoutItem
/*: LayoutItem*/
)
/*: LayoutItem*/
{
  /*return {
    w: layoutItem.w, h: layoutItem.h, x: layoutItem.x, y: layoutItem.y, i: layoutItem.i,
    minW: layoutItem.minW, maxW: layoutItem.maxW, minH: layoutItem.minH, maxH: layoutItem.maxH,
    moved: Boolean(layoutItem.moved), static: Boolean(layoutItem.static),
    // These can be null
    isDraggable: layoutItem.isDraggable, isResizable: layoutItem.isResizable
  };*/
  return JSON.parse(JSON.stringify(layoutItem));
}
/**
 * Given two layoutitems, check if they collide.
 *
 * @return {Boolean}   True if colliding.
 */

function collides(l1
/*: LayoutItem*/
, l2
/*: LayoutItem*/
)
/*: boolean*/
{
  if (l1 === l2) return false; // same element

  if (l1.x + l1.w <= l2.x) return false; // l1 is left of l2

  if (l1.x >= l2.x + l2.w) return false; // l1 is right of l2

  if (l1.y + l1.h <= l2.y) return false; // l1 is above l2

  if (l1.y >= l2.y + l2.h) return false; // l1 is below l2

  return true; // boxes overlap
}
/**
 * Given a layout, compact it. This involves going down each y coordinate and removing gaps
 * between items.
 *
 * @param  {Array} layout Layout.
 * @param  {Boolean} verticalCompact Whether or not to compact the layout
 *   vertically.
 * @return {Array}       Compacted Layout.
 */

function compact(layout
/*: Layout*/
, verticalCompact
/*: Boolean*/
)
/*: Layout*/
{
  // Statics go in the compareWith array right away so items flow around them.
  var compareWith = getStatics(layout); // We go through the items by row and column.

  var sorted = sortLayoutItemsByRowCol(layout); // Holding for new items.

  var out = Array(layout.length);

  for (var i = 0, len = sorted.length; i < len; i++) {
    var l = sorted[i]; // Don't move static elements

    if (!l.static) {
      l = compactItem(compareWith, l, verticalCompact); // Add to comparison array. We only collide with items before this one.
      // Statics are already in this array.

      compareWith.push(l);
    } // Add to output array to make sure they still come out in the right order.


    out[layout.indexOf(l)] = l; // Clear moved flag, if it exists.

    l.moved = false;
  }

  return out;
}
/**
 * Compact an item in the layout.
 */

function compactItem(compareWith
/*: Layout*/
, l
/*: LayoutItem*/
, verticalCompact
/*: boolean*/
)
/*: LayoutItem*/
{
  if (verticalCompact) {
    // Move the element up as far as it can go without colliding.
    while (l.y > 0 && !getFirstCollision(compareWith, l)) {
      l.y--;
    }
  } // Move it down, and keep moving it down if it's colliding.


  var collides;

  while (collides = getFirstCollision(compareWith, l)) {
    l.y = collides.y + collides.h;
  }

  return l;
}
/**
 * Given a layout, make sure all elements fit within its bounds.
 *
 * @param  {Array} layout Layout array.
 * @param  {Number} bounds Number of columns.
 */

function correctBounds(layout
/*: Layout*/
, bounds
/*: {cols: number}*/
)
/*: Layout*/
{
  var collidesWith = getStatics(layout);

  for (var i = 0, len = layout.length; i < len; i++) {
    var l = layout[i]; // Overflows right

    if (l.x + l.w > bounds.cols) l.x = bounds.cols - l.w; // Overflows left

    if (l.x < 0) {
      l.x = 0;
      l.w = bounds.cols;
    }

    if (!l.static) collidesWith.push(l);else {
      // If this is static and collides with other statics, we must move it down.
      // We have to do something nicer than just letting them overlap.
      while (getFirstCollision(collidesWith, l)) {
        l.y++;
      }
    }
  }

  return layout;
}
/**
 * Get a layout item by ID. Used so we can override later on if necessary.
 *
 * @param  {Array}  layout Layout array.
 * @param  {String} id     ID
 * @return {LayoutItem}    Item at ID.
 */

function getLayoutItem(layout
/*: Layout*/
, id
/*: string*/
)
/*: ?LayoutItem*/
{
  for (var i = 0, len = layout.length; i < len; i++) {
    if (layout[i].i === id) return layout[i];
  }
}
/**
 * Returns the first item this layout collides with.
 * It doesn't appear to matter which order we approach this from, although
 * perhaps that is the wrong thing to do.
 *
 * @param  {Object} layoutItem Layout item.
 * @return {Object|undefined}  A colliding layout item, or undefined.
 */

function getFirstCollision(layout
/*: Layout*/
, layoutItem
/*: LayoutItem*/
)
/*: ?LayoutItem*/
{
  for (var i = 0, len = layout.length; i < len; i++) {
    if (collides(layout[i], layoutItem)) return layout[i];
  }
}
function getAllCollisions(layout
/*: Layout*/
, layoutItem
/*: LayoutItem*/
)
/*: Array<LayoutItem>*/
{
  return layout.filter(function (l) {
    return collides(l, layoutItem);
  });
}
/**
 * Get all static elements.
 * @param  {Array} layout Array of layout objects.
 * @return {Array}        Array of static layout items..
 */

function getStatics(layout
/*: Layout*/
)
/*: Array<LayoutItem>*/
{
  //return [];
  return layout.filter(function (l) {
    return l.static;
  });
}
/**
 * Move an element. Responsible for doing cascading movements of other elements.
 *
 * @param  {Array}      layout Full layout to modify.
 * @param  {LayoutItem} l      element to move.
 * @param  {Number}     [x]    X position in grid units.
 * @param  {Number}     [y]    Y position in grid units.
 * @param  {Boolean}    [isUserAction] If true, designates that the item we're moving is
 *                                     being dragged/resized by th euser.
 */

function moveElement(layout
/*: Layout*/
, l
/*: LayoutItem*/
, x
/*: Number*/
, y
/*: Number*/
, isUserAction
/*: Boolean*/
, preventCollision
/*: Boolean*/
)
/*: Layout*/
{
  if (l.static) return layout; // Short-circuit if nothing to do.
  //if (l.y === y && l.x === x) return layout;

  var oldX = l.x;
  var oldY = l.y;
  var movingUp = y && l.y > y; // This is quite a bit faster than extending the object

  if (typeof x === 'number') l.x = x;
  if (typeof y === 'number') l.y = y;
  l.moved = true; // If this collides with anything, move it.
  // When doing this comparison, we have to sort the items we compare with
  // to ensure, in the case of multiple collisions, that we're getting the
  // nearest collision.

  var sorted = sortLayoutItemsByRowCol(layout);
  if (movingUp) sorted = sorted.reverse();
  var collisions = getAllCollisions(sorted, l);

  if (preventCollision && collisions.length) {
    l.x = oldX;
    l.y = oldY;
    l.moved = false;
    return layout;
  } // Move each item that collides away from this element.


  for (var i = 0, len = collisions.length; i < len; i++) {
    var collision = collisions[i]; // console.log('resolving collision between', l.i, 'at', l.y, 'and', collision.i, 'at', collision.y);
    // Short circuit so we can't infinite loop

    if (collision.moved) continue; // This makes it feel a bit more precise by waiting to swap for just a bit when moving up.

    if (l.y > collision.y && l.y - collision.y > collision.h / 4) continue; // Don't move static items - we have to move *this* element away

    if (collision.static) {
      layout = moveElementAwayFromCollision(layout, collision, l, isUserAction);
    } else {
      layout = moveElementAwayFromCollision(layout, l, collision, isUserAction);
    }
  }

  return layout;
}
/**
 * This is where the magic needs to happen - given a collision, move an element away from the collision.
 * We attempt to move it up if there's room, otherwise it goes below.
 *
 * @param  {Array} layout            Full layout to modify.
 * @param  {LayoutItem} collidesWith Layout item we're colliding with.
 * @param  {LayoutItem} itemToMove   Layout item we're moving.
 * @param  {Boolean} [isUserAction]  If true, designates that the item we're moving is being dragged/resized
 *                                   by the user.
 */

function moveElementAwayFromCollision(layout
/*: Layout*/
, collidesWith
/*: LayoutItem*/
, itemToMove
/*: LayoutItem*/
, isUserAction
/*: ?boolean*/
)
/*: Layout*/
{
  var preventCollision = false; // we're already colliding
  // If there is enough space above the collision to put this element, move it there.
  // We only do this on the main collision as this can get funky in cascades and cause
  // unwanted swapping behavior.

  if (isUserAction) {
    // Make a mock item so we don't modify the item here, only modify in moveElement.
    var fakeItem
    /*: LayoutItem*/
    = {
      x: itemToMove.x,
      y: itemToMove.y,
      w: itemToMove.w,
      h: itemToMove.h,
      i: '-1'
    };
    fakeItem.y = Math.max(collidesWith.y - itemToMove.h, 0);

    if (!getFirstCollision(layout, fakeItem)) {
      return moveElement(layout, itemToMove, undefined, fakeItem.y, preventCollision);
    }
  } // Previously this was optimized to move below the collision directly, but this can cause problems
  // with cascading moves, as an item may actually leapflog a collision and cause a reversal in order.


  return moveElement(layout, itemToMove, undefined, itemToMove.y + 1, preventCollision);
}
/**
 * Helper to convert a number to a percentage string.
 *
 * @param  {Number} num Any number
 * @return {String}     That number as a percentage.
 */

function perc(num
/*: number*/
)
/*: string*/
{
  return num * 100 + '%';
}
function setTransform(top, left, width, height)
/*: Object*/
{
  // Replace unitless items with px
  var translate = "translate3d(" + left + "px," + top + "px, 0)";
  return {
    transform: translate,
    WebkitTransform: translate,
    MozTransform: translate,
    msTransform: translate,
    OTransform: translate,
    width: width + "px",
    height: height + "px",
    position: 'absolute'
  };
}
/**
 * Just like the setTransform method, but instead it will return a negative value of right.
 *
 * @param top
 * @param right
 * @param width
 * @param height
 * @returns {{transform: string, WebkitTransform: string, MozTransform: string, msTransform: string, OTransform: string, width: string, height: string, position: string}}
 */

function setTransformRtl(top, right, width, height)
/*: Object*/
{
  // Replace unitless items with px
  var translate = "translate3d(" + right * -1 + "px," + top + "px, 0)";
  return {
    transform: translate,
    WebkitTransform: translate,
    MozTransform: translate,
    msTransform: translate,
    OTransform: translate,
    width: width + "px",
    height: height + "px",
    position: 'absolute'
  };
}
function setTopLeft(top, left, width, height)
/*: Object*/
{
  return {
    top: top + "px",
    left: left + "px",
    width: width + "px",
    height: height + "px",
    position: 'absolute'
  };
}
/**
 * Just like the setTopLeft method, but instead, it will return a right property instead of left.
 *
 * @param top
 * @param right
 * @param width
 * @param height
 * @returns {{top: string, right: string, width: string, height: string, position: string}}
 */

function setTopRight(top, right, width, height)
/*: Object*/
{
  return {
    top: top + "px",
    right: right + "px",
    width: width + "px",
    height: height + "px",
    position: 'absolute'
  };
}
/**
 * Get layout items sorted from top left to right and down.
 *
 * @return {Array} Array of layout objects.
 * @return {Array}        Layout, sorted static items first.
 */

function sortLayoutItemsByRowCol(layout
/*: Layout*/
)
/*: Layout*/
{
  return [].concat(layout).sort(function (a, b) {
    if (a.y > b.y || a.y === b.y && a.x > b.x) {
      return 1;
    }

    return -1;
  });
}
/**
 * Generate a layout using the initialLayout and children as a template.
 * Missing entries will be added, extraneous ones will be truncated.
 *
 * @param  {Array}  initialLayout Layout passed in through props.
 * @param  {String} breakpoint    Current responsive breakpoint.
 * @param  {Boolean} verticalCompact Whether or not to compact the layout vertically.
 * @return {Array}                Working layout.
 */

/*
export function synchronizeLayoutWithChildren(initialLayout: Layout, children: Array<React.Element>|React.Element,
                                              cols: number, verticalCompact: boolean): Layout {
  // ensure 'children' is always an array
  if (!Array.isArray(children)) {
    children = [children];
  }
  initialLayout = initialLayout || [];

  // Generate one layout item per child.
  let layout: Layout = [];
  for (let i = 0, len = children.length; i < len; i++) {
    let newItem;
    const child = children[i];

    // Don't overwrite if it already exists.
    const exists = getLayoutItem(initialLayout, child.key || "1" /!* FIXME satisfies Flow *!/);
    if (exists) {
      newItem = exists;
    } else {
      const g = child.props._grid;

      // Hey, this item has a _grid property, use it.
      if (g) {
        if (!isProduction) {
          validateLayout([g], 'ReactGridLayout.children');
        }
        // Validated; add it to the layout. Bottom 'y' possible is the bottom of the layout.
        // This allows you to do nice stuff like specify {y: Infinity}
        if (verticalCompact) {
          newItem = cloneLayoutItem({...g, y: Math.min(bottom(layout), g.y), i: child.key});
        } else {
          newItem = cloneLayoutItem({...g, y: g.y, i: child.key});
        }
      }
      // Nothing provided: ensure this is added to the bottom
      else {
        newItem = cloneLayoutItem({w: 1, h: 1, x: 0, y: bottom(layout), i: child.key || "1"});
      }
    }
    layout[i] = newItem;
  }

  // Correct the layout.
  layout = correctBounds(layout, {cols: cols});
  layout = compact(layout, verticalCompact);

  return layout;
}
*/

/**
 * Validate a layout. Throws errors.
 *
 * @param  {Array}  layout        Array of layout items.
 * @param  {String} [contextName] Context name for errors.
 * @throw  {Error}                Validation error.
 */

function validateLayout(layout
/*: Layout*/
, contextName
/*: string*/
)
/*: void*/
{
  contextName = contextName || "Layout";
  var subProps = ['x', 'y', 'w', 'h'];
  if (!Array.isArray(layout)) throw new Error(contextName + " must be an array!");

  for (var i = 0, len = layout.length; i < len; i++) {
    var item = layout[i];

    for (var j = 0; j < subProps.length; j++) {
      if (typeof item[subProps[j]] !== 'number') {
        throw new Error('VueGridLayout: ' + contextName + '[' + i + '].' + subProps[j] + ' must be a number!');
      }
    }

    if (item.i && typeof item.i !== 'string') {// number is also ok, so comment the error
      // TODO confirm if commenting the line below doesn't cause unexpected problems
      // throw new Error('VueGridLayout: ' + contextName + '[' + i + '].i must be a string!');
    }

    if (item.static !== undefined && typeof item.static !== 'boolean') {
      throw new Error('VueGridLayout: ' + contextName + '[' + i + '].static must be a boolean!');
    }
  }
} // Flow can't really figure this out, so we just use Object

function autoBindHandlers(el
/*: Object*/
, fns
/*: Array<string>*/
)
/*: void*/
{
  fns.forEach(function (key) {
    return el[key] = el[key].bind(el);
  });
}
/**
 * Convert a JS object to CSS string. Similar to React's output of CSS.
 * @param obj
 * @returns {string}
 */

function createMarkup(obj) {
  var keys = Object.keys(obj);
  if (!keys.length) return '';
  var i,
      len = keys.length;
  var result = '';

  for (i = 0; i < len; i++) {
    var key = keys[i];
    var val = obj[key];
    result += hyphenate(key) + ':' + addPx(key, val) + ';';
  }

  return result;
}
/* The following list is defined in React's core */

var IS_UNITLESS = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};
/**
 * Will add px to the end of style values which are Numbers.
 * @param name
 * @param value
 * @returns {*}
 */

function addPx(name, value) {
  if (typeof value === 'number' && !IS_UNITLESS[name]) {
    return value + 'px';
  } else {
    return value;
  }
}
/**
 * Hyphenate a camelCase string.
 *
 * @param {String} str
 * @return {String}
 */

var hyphenateRE = /([a-z\d])([A-Z])/g;
function hyphenate(str) {
  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
}
function findItemInArray(array, property, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][property] == value) return true;
  }

  return false;
}
function findAndRemove(array, property, value) {
  array.forEach(function (result, index) {
    if (result[property] === value) {
      //Remove from array
      array.splice(index, 1);
    }
  });
}
// CONCATENATED MODULE: ./src/helpers/draggableUtils.js
// Get {x, y} positions from event.
function getControlPosition(e) {
  return offsetXYFromParentOf(e);
} // Get from offsetParent

function offsetXYFromParentOf(evt) {
  var offsetParent = evt.target.offsetParent || document.body;
  var offsetParentRect = evt.offsetParent === document.body ? {
    left: 0,
    top: 0
  } : offsetParent.getBoundingClientRect();
  var x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
  var y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;
  /*const x = Math.round(evt.clientX + offsetParent.scrollLeft - offsetParentRect.left);
  const y = Math.round(evt.clientY + offsetParent.scrollTop - offsetParentRect.top);*/

  return {
    x: x,
    y: y
  };
} // Create an data object exposed by <DraggableCore>'s events

function createCoreData(lastX, lastY, x, y) {
  // State changes are often (but not always!) async. We want the latest value.
  var isStart = !isNum(lastX);

  if (isStart) {
    // If this is our first move, use the x and y as last coords.
    return {
      deltaX: 0,
      deltaY: 0,
      lastX: x,
      lastY: y,
      x: x,
      y: y
    };
  } else {
    // Otherwise calculate proper values.
    return {
      deltaX: x - lastX,
      deltaY: y - lastY,
      lastX: lastX,
      lastY: lastY,
      x: x,
      y: y
    };
  }
}

function isNum(num) {
  return typeof num === 'number' && !isNaN(num);
}
// CONCATENATED MODULE: ./src/helpers/DOM.js
var currentDir
/*: "ltr" | "rtl" | "auto"*/
= "auto"; // let currentDir = "auto";

function hasDocument() {
  return typeof document !== "undefined";
}

function hasWindow() {
  return typeof window !== "undefined";
}

function getDocumentDir() {
  if (!hasDocument()) {
    return currentDir;
  }

  var direction = typeof document.dir !== "undefined" ? document.dir : document.getElementsByTagName("html")[0].getAttribute("dir");
  return direction;
}
function setDocumentDir(dir
/*: "ltr" | "rtl" | "auto"*/
) {
  // export function setDocumentDir(dir){
  if (!hasDocument) {
    currentDir = dir;
    return;
  }

  var html = document.getElementsByTagName("html")[0];
  html.setAttribute("dir", dir);
}
function addWindowEventListener(event
/*:string*/
, callback
/*: () => mixed*/
) {
  if (!hasWindow) {
    callback();
    return;
  }

  window.addEventListener(event, callback);
}
function removeWindowEventListener(event
/*:string*/
, callback
/*: () => mixed*/
) {
  if (!hasWindow) {
    return;
  }

  window.removeEventListener(event, callback);
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GridItem.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


 //    var eventBus = require('./eventBus');

var interact = __webpack_require__("5014");

/* harmony default export */ var GridItemvue_type_script_lang_js_ = ({
  name: "GridItem",
  props: {
    /*cols: {
     type: Number,
     required: true
     },*/

    /*containerWidth: {
     type: Number,
     required: true
      },
     rowHeight: {
     type: Number,
     required: true
     },
     margin: {
     type: Array,
     required: true
     },
     maxRows: {
     type: Number,
     required: true
     },*/
    isDraggable: {
      type: Boolean,
      required: false,
      default: null
    },
    isResizable: {
      type: Boolean,
      required: false,
      default: null
    },

    /*useCssTransforms: {
     type: Boolean,
     required: true
     },
     */
    static: {
      type: Boolean,
      required: false,
      default: false
    },
    minH: {
      type: Number,
      required: false,
      default: 1
    },
    minW: {
      type: Number,
      required: false,
      default: 1
    },
    maxH: {
      type: Number,
      required: false,
      default: Infinity
    },
    maxW: {
      type: Number,
      required: false,
      default: Infinity
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    w: {
      type: Number,
      required: true
    },
    h: {
      type: Number,
      required: true
    },
    i: {
      required: true
    },
    dragIgnoreFrom: {
      type: String,
      required: false,
      default: 'a, button'
    },
    dragAllowFrom: {
      type: String,
      required: false,
      default: null
    },
    resizeIgnoreFrom: {
      type: String,
      required: false,
      default: 'a, button'
    }
  },
  inject: ["eventBus"],
  data: function data() {
    return {
      cols: 1,
      containerWidth: 100,
      rowHeight: 30,
      margin: [10, 10],
      maxRows: Infinity,
      draggable: null,
      resizable: null,
      useCssTransforms: true,
      isDragging: false,
      dragging: null,
      isResizing: false,
      resizing: null,
      lastX: NaN,
      lastY: NaN,
      lastW: NaN,
      lastH: NaN,
      style: {},
      rtl: false,
      dragEventSet: false,
      resizeEventSet: false,
      previousW: null,
      previousH: null,
      previousX: null,
      previousY: null,
      innerX: this.x,
      innerY: this.y,
      innerW: this.w,
      innerH: this.h
    };
  },
  created: function created() {
    var _this = this;

    var self = this; // Accessible refernces of functions for removing in beforeDestroy

    self.updateWidthHandler = function (width) {
      self.updateWidth(width);
    };

    self.compactHandler = function (layout) {
      self.compact(layout);
    };

    self.setDraggableHandler = function (isDraggable) {
      if (self.isDraggable === null) {
        self.draggable = isDraggable;
      }
    };

    self.setResizableHandler = function (isResizable) {
      if (self.isResizable === null) {
        self.resizable = isResizable;
      }
    };

    self.setRowHeightHandler = function (rowHeight) {
      self.rowHeight = rowHeight;
    };

    self.setMaxRowsHandler = function (maxRows) {
      self.maxRows = maxRows;
    };

    self.directionchangeHandler = function () {
      _this.rtl = getDocumentDir() === 'rtl';

      _this.compact();
    };

    self.setColNum = function (colNum) {
      self.cols = parseInt(colNum);
    };

    this.eventBus.$on('updateWidth', self.updateWidthHandler);
    this.eventBus.$on('compact', self.compactHandler);
    this.eventBus.$on('setDraggable', self.setDraggableHandler);
    this.eventBus.$on('setResizable', self.setResizableHandler);
    this.eventBus.$on('setRowHeight', self.setRowHeightHandler);
    this.eventBus.$on('setMaxRows', self.setMaxRowsHandler);
    this.eventBus.$on('directionchange', self.directionchangeHandler);
    this.eventBus.$on('setColNum', self.setColNum);
    this.rtl = getDocumentDir() === 'rtl';
  },
  beforeDestroy: function beforeDestroy() {
    var self = this; //Remove listeners

    this.eventBus.$off('updateWidth', self.updateWidthHandler);
    this.eventBus.$off('compact', self.compactHandler);
    this.eventBus.$off('setDraggable', self.setDraggableHandler);
    this.eventBus.$off('setResizable', self.setResizableHandler);
    this.eventBus.$off('setRowHeight', self.setRowHeightHandler);
    this.eventBus.$off('setMaxRows', self.setMaxRowsHandler);
    this.eventBus.$off('directionchange', self.directionchangeHandler);
    this.eventBus.$off('setColNum', self.setColNum);
    this.interactObj.unset(); // destroy interact intance
  },
  mounted: function mounted() {
    this.cols = this.$parent.colNum;
    this.rowHeight = this.$parent.rowHeight;
    this.containerWidth = this.$parent.width !== null ? this.$parent.width : 100;
    this.margin = this.$parent.margin !== undefined ? this.$parent.margin : [10, 10];
    this.maxRows = this.$parent.maxRows;

    if (this.isDraggable === null) {
      this.draggable = this.$parent.isDraggable;
    } else {
      this.draggable = this.isDraggable;
    }

    if (this.isResizable === null) {
      this.resizable = this.$parent.isResizable;
    } else {
      this.resizable = this.isResizable;
    }

    this.useCssTransforms = this.$parent.useCssTransforms;
    this.createStyle();
  },
  watch: {
    isDraggable: function isDraggable() {
      this.draggable = this.isDraggable;
    },
    static: function _static() {
      this.tryMakeDraggable();
      this.tryMakeResizable();
    },
    draggable: function draggable() {
      this.tryMakeDraggable();
    },
    isResizable: function isResizable() {
      this.resizable = this.isResizable;
    },
    resizable: function resizable() {
      this.tryMakeResizable();
    },
    rowHeight: function rowHeight() {
      this.createStyle();
      this.emitContainerResized();
    },
    cols: function cols() {
      this.tryMakeResizable();
      this.createStyle();
      this.emitContainerResized();
    },
    containerWidth: function containerWidth() {
      this.tryMakeResizable();
      this.createStyle();
      this.emitContainerResized();
    },
    x: function x(newVal) {
      this.innerX = newVal;
      this.createStyle();
    },
    y: function y(newVal) {
      this.innerY = newVal;
      this.createStyle();
    },
    h: function h(newVal) {
      this.innerH = newVal;
      this.createStyle(); // this.emitContainerResized();
    },
    w: function w(newVal) {
      this.innerW = newVal;
      this.createStyle(); // this.emitContainerResized();
    },
    renderRtl: function renderRtl() {
      // console.log("### renderRtl");
      this.tryMakeResizable();
      this.createStyle();
    },
    minH: function minH() {
      this.tryMakeResizable();
    },
    maxH: function maxH() {
      this.tryMakeResizable();
    },
    minW: function minW() {
      this.tryMakeResizable();
    },
    maxW: function maxW() {
      this.tryMakeResizable();
    }
  },
  computed: {
    classObj: function classObj() {
      return {
        'vue-resizable': this.resizableAndNotStatic,
        'static': this.static,
        'resizing': this.isResizing,
        'vue-draggable-dragging': this.isDragging,
        'cssTransforms': this.useCssTransforms,
        'render-rtl': this.renderRtl,
        'disable-userselect': this.isDragging,
        'no-touch': this.isAndroid && this.draggableOrResizableAndNotStatic
      };
    },
    resizableAndNotStatic: function resizableAndNotStatic() {
      return this.resizable && !this.static;
    },
    draggableOrResizableAndNotStatic: function draggableOrResizableAndNotStatic() {
      return (this.draggable || this.resizable) && !this.static;
    },
    isAndroid: function isAndroid() {
      return navigator.userAgent.toLowerCase().indexOf("android") !== -1;
    },
    renderRtl: function renderRtl() {
      return this.$parent.isMirrored ? !this.rtl : this.rtl;
    },
    resizableHandleClass: function resizableHandleClass() {
      if (this.renderRtl) {
        return 'vue-resizable-handle vue-rtl-resizable-handle';
      } else {
        return 'vue-resizable-handle';
      }
    }
  },
  methods: {
    createStyle: function createStyle() {
      if (this.x + this.w > this.cols) {
        this.innerX = 0;
        this.innerW = this.w > this.cols ? this.cols : this.w;
      } else {
        this.innerX = this.x;
        this.innerW = this.w;
      }

      var pos = this.calcPosition(this.innerX, this.innerY, this.innerW, this.innerH);

      if (this.isDragging) {
        pos.top = this.dragging.top; //                    Add rtl support

        if (this.renderRtl) {
          pos.right = this.dragging.left;
        } else {
          pos.left = this.dragging.left;
        }
      }

      if (this.isResizing) {
        pos.width = this.resizing.width;
        pos.height = this.resizing.height;
      }

      var style; // CSS Transforms support (default)

      if (this.useCssTransforms) {
        //                    Add rtl support
        if (this.renderRtl) {
          style = setTransformRtl(pos.top, pos.right, pos.width, pos.height);
        } else {
          style = setTransform(pos.top, pos.left, pos.width, pos.height);
        }
      } else {
        // top,left (slow)
        //                    Add rtl support
        if (this.renderRtl) {
          style = setTopRight(pos.top, pos.right, pos.width, pos.height);
        } else {
          style = setTopLeft(pos.top, pos.left, pos.width, pos.height);
        }
      }

      this.style = style;
    },
    emitContainerResized: function emitContainerResized() {
      // this.style has width and height with trailing 'px'. The
      // resized event is without them
      var styleProps = {};

      for (var _i = 0, _arr = ['width', 'height']; _i < _arr.length; _i++) {
        var prop = _arr[_i];
        var val = this.style[prop];
        var matches = val.match(/^(\d+)px$/);
        if (!matches) return;
        styleProps[prop] = matches[1];
      }

      this.$emit("container-resized", this.i, this.h, this.w, styleProps.height, styleProps.width);
    },
    handleResize: function handleResize(event) {
      if (this.static) return;
      var position = getControlPosition(event); // Get the current drag point from the event. This is used as the offset.

      if (position == null) return; // not possible but satisfies flow

      var x = position.x,
          y = position.y;
      var newSize = {
        width: 0,
        height: 0
      };
      var pos;

      switch (event.type) {
        case "resizestart":
          {
            this.previousW = this.innerW;
            this.previousH = this.innerH;
            pos = this.calcPosition(this.innerX, this.innerY, this.innerW, this.innerH);
            newSize.width = pos.width;
            newSize.height = pos.height;
            this.resizing = newSize;
            this.isResizing = true;
            break;
          }

        case "resizemove":
          {
            //                        console.log("### resize => " + event.type + ", lastW=" + this.lastW + ", lastH=" + this.lastH);
            var coreEvent = createCoreData(this.lastW, this.lastH, x, y);

            if (this.renderRtl) {
              newSize.width = this.resizing.width - coreEvent.deltaX;
            } else {
              newSize.width = this.resizing.width + coreEvent.deltaX;
            }

            newSize.height = this.resizing.height + coreEvent.deltaY; ///console.log("### resize => " + event.type + ", deltaX=" + coreEvent.deltaX + ", deltaY=" + coreEvent.deltaY);

            this.resizing = newSize;
            break;
          }

        case "resizeend":
          {
            //console.log("### resize end => x=" +this.innerX + " y=" + this.innerY + " w=" + this.innerW + " h=" + this.innerH);
            pos = this.calcPosition(this.innerX, this.innerY, this.innerW, this.innerH);
            newSize.width = pos.width;
            newSize.height = pos.height; //                        console.log("### resize end => " + JSON.stringify(newSize));

            this.resizing = null;
            this.isResizing = false;
            break;
          }
      } // Get new WH


      pos = this.calcWH(newSize.height, newSize.width);

      if (pos.w < this.minW) {
        pos.w = this.minW;
      }

      if (pos.w > this.maxW) {
        pos.w = this.maxW;
      }

      if (pos.h < this.minH) {
        pos.h = this.minH;
      }

      if (pos.h > this.maxH) {
        pos.h = this.maxH;
      }

      if (pos.h < 1) {
        pos.h = 1;
      }

      if (pos.w < 1) {
        pos.w = 1;
      }

      this.lastW = x;
      this.lastH = y;

      if (this.innerW !== pos.w || this.innerH !== pos.h) {
        this.$emit("resize", this.i, pos.h, pos.w, newSize.height, newSize.width);
      }

      if (event.type === "resizeend" && (this.previousW !== this.innerW || this.previousH !== this.innerH)) {
        this.$emit("resized", this.i, pos.h, pos.w, newSize.height, newSize.width);
      }

      this.eventBus.$emit("resizeEvent", event.type, this.i, this.innerX, this.innerY, pos.h, pos.w);
    },
    handleDrag: function handleDrag(event) {
      if (this.static) return;
      if (this.isResizing) return;
      var position = getControlPosition(event); // Get the current drag point from the event. This is used as the offset.

      if (position === null) return; // not possible but satisfies flow

      var x = position.x,
          y = position.y; // let shouldUpdate = false;

      var newPosition = {
        top: 0,
        left: 0
      };

      switch (event.type) {
        case "dragstart":
          {
            this.previousX = this.innerX;
            this.previousY = this.innerY;
            var parentRect = event.target.offsetParent.getBoundingClientRect();
            var clientRect = event.target.getBoundingClientRect();

            if (this.renderRtl) {
              newPosition.left = (clientRect.right - parentRect.right) * -1;
            } else {
              newPosition.left = clientRect.left - parentRect.left;
            }

            newPosition.top = clientRect.top - parentRect.top;
            this.dragging = newPosition;
            this.isDragging = true;
            break;
          }

        case "dragend":
          {
            if (!this.isDragging) return;

            var _parentRect = event.target.offsetParent.getBoundingClientRect();

            var _clientRect = event.target.getBoundingClientRect(); //                        Add rtl support


            if (this.renderRtl) {
              newPosition.left = (_clientRect.right - _parentRect.right) * -1;
            } else {
              newPosition.left = _clientRect.left - _parentRect.left;
            }

            newPosition.top = _clientRect.top - _parentRect.top; //                        console.log("### drag end => " + JSON.stringify(newPosition));
            //                        console.log("### DROP: " + JSON.stringify(newPosition));

            this.dragging = null;
            this.isDragging = false; // shouldUpdate = true;

            break;
          }

        case "dragmove":
          {
            var coreEvent = createCoreData(this.lastX, this.lastY, x, y); //                        Add rtl support

            if (this.renderRtl) {
              newPosition.left = this.dragging.left - coreEvent.deltaX;
            } else {
              newPosition.left = this.dragging.left + coreEvent.deltaX;
            }

            newPosition.top = this.dragging.top + coreEvent.deltaY; //                        console.log("### drag => " + event.type + ", x=" + x + ", y=" + y);
            //                        console.log("### drag => " + event.type + ", deltaX=" + coreEvent.deltaX + ", deltaY=" + coreEvent.deltaY);
            //                        console.log("### drag end => " + JSON.stringify(newPosition));

            this.dragging = newPosition;
            break;
          }
      } // Get new XY


      var pos;

      if (this.renderRtl) {
        pos = this.calcXY(newPosition.top, newPosition.left);
      } else {
        pos = this.calcXY(newPosition.top, newPosition.left);
      }

      this.lastX = x;
      this.lastY = y;

      if (this.innerX !== pos.x || this.innerY !== pos.y) {
        this.$emit("move", this.i, pos.x, pos.y);
      }

      if (event.type === "dragend" && (this.previousX !== this.innerX || this.previousY !== this.innerY)) {
        this.$emit("moved", this.i, pos.x, pos.y);
      }

      this.eventBus.$emit("dragEvent", event.type, this.i, pos.x, pos.y, this.innerH, this.innerW);
    },
    calcPosition: function calcPosition(x, y, w, h) {
      var colWidth = this.calcColWidth(); // add rtl support

      var out;

      if (this.renderRtl) {
        out = {
          right: Math.round(colWidth * x + (x + 1) * this.margin[0]),
          top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1]),
          // 0 * Infinity === NaN, which causes problems with resize constriants;
          // Fix this if it occurs.
          // Note we do it here rather than later because Math.round(Infinity) causes deopt
          width: w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * this.margin[0]),
          height: h === Infinity ? h : Math.round(this.rowHeight * h + Math.max(0, h - 1) * this.margin[1])
        };
      } else {
        out = {
          left: Math.round(colWidth * x + (x + 1) * this.margin[0]),
          top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1]),
          // 0 * Infinity === NaN, which causes problems with resize constriants;
          // Fix this if it occurs.
          // Note we do it here rather than later because Math.round(Infinity) causes deopt
          width: w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * this.margin[0]),
          height: h === Infinity ? h : Math.round(this.rowHeight * h + Math.max(0, h - 1) * this.margin[1])
        };
      }

      return out;
    },

    /**
     * Translate x and y coordinates from pixels to grid units.
     * @param  {Number} top  Top position (relative to parent) in pixels.
     * @param  {Number} left Left position (relative to parent) in pixels.
     * @return {Object} x and y in grid units.
     */
    // TODO check if this function needs change in order to support rtl.
    calcXY: function calcXY(top, left) {
      var colWidth = this.calcColWidth(); // left = colWidth * x + margin * (x + 1)
      // l = cx + m(x+1)
      // l = cx + mx + m
      // l - m = cx + mx
      // l - m = x(c + m)
      // (l - m) / (c + m) = x
      // x = (left - margin) / (coldWidth + margin)

      var x = Math.round((left - this.margin[0]) / (colWidth + this.margin[0]));
      var y = Math.round((top - this.margin[1]) / (this.rowHeight + this.margin[1])); // Capping

      x = Math.max(Math.min(x, this.cols - this.innerW), 0);
      y = Math.max(Math.min(y, this.maxRows - this.innerH), 0);
      return {
        x: x,
        y: y
      };
    },
    // Helper for generating column width
    calcColWidth: function calcColWidth() {
      var colWidth = (this.containerWidth - this.margin[0] * (this.cols + 1)) / this.cols; // console.log("### COLS=" + this.cols + " COL WIDTH=" + colWidth + " MARGIN " + this.margin[0]);

      return colWidth;
    },

    /**
     * Given a height and width in pixel values, calculate grid units.
     * @param  {Number} height Height in pixels.
     * @param  {Number} width  Width in pixels.
     * @return {Object} w, h as grid units.
     */
    calcWH: function calcWH(height, width) {
      var colWidth = this.calcColWidth(); // width = colWidth * w - (margin * (w - 1))
      // ...
      // w = (width + margin) / (colWidth + margin)

      var w = Math.round((width + this.margin[0]) / (colWidth + this.margin[0]));
      var h = Math.round((height + this.margin[1]) / (this.rowHeight + this.margin[1])); // Capping

      w = Math.max(Math.min(w, this.cols - this.innerX), 0);
      h = Math.max(Math.min(h, this.maxRows - this.innerY), 0);
      return {
        w: w,
        h: h
      };
    },
    updateWidth: function updateWidth(width, colNum) {
      this.containerWidth = width;

      if (colNum !== undefined && colNum !== null) {
        this.cols = colNum;
      }
    },
    compact: function compact() {
      this.createStyle();
    },
    tryMakeDraggable: function tryMakeDraggable() {
      var self = this;

      if (this.interactObj === null || this.interactObj === undefined) {
        this.interactObj = interact(this.$refs.item);
      }

      if (this.draggable && !this.static) {
        var opts = {
          ignoreFrom: this.dragIgnoreFrom,
          allowFrom: this.dragAllowFrom
        };
        this.interactObj.draggable(opts);
        /*this.interactObj.draggable({allowFrom: '.vue-draggable-handle'});*/

        if (!this.dragEventSet) {
          this.dragEventSet = true;
          this.interactObj.on('dragstart dragmove dragend', function (event) {
            self.handleDrag(event);
          });
        }
      } else {
        this.interactObj.draggable({
          enabled: false
        });
      }
    },
    tryMakeResizable: function tryMakeResizable() {
      var self = this;

      if (this.interactObj === null || this.interactObj === undefined) {
        this.interactObj = interact(this.$refs.item);
      }

      if (this.resizable && !this.static) {
        var maximum = this.calcPosition(0, 0, this.maxW, this.maxH);
        var minimum = this.calcPosition(0, 0, this.minW, this.minH); // console.log("### MAX " + JSON.stringify(maximum));
        // console.log("### MIN " + JSON.stringify(minimum));

        var opts = {
          preserveAspectRatio: true,
          // allowFrom: "." + this.resizableHandleClass,
          edges: {
            left: false,
            right: "." + this.resizableHandleClass,
            bottom: "." + this.resizableHandleClass,
            top: false
          },
          ignoreFrom: this.resizeIgnoreFrom,
          restrictSize: {
            min: {
              height: minimum.height,
              width: minimum.width
            },
            max: {
              height: maximum.height,
              width: maximum.width
            }
          }
        };
        this.interactObj.resizable(opts);

        if (!this.resizeEventSet) {
          this.resizeEventSet = true;
          this.interactObj.on('resizestart resizemove resizeend', function (event) {
            self.handleResize(event);
          });
        }
      } else {
        this.interactObj.resizable({
          enabled: false
        });
      }
    },
    autoSize: function autoSize() {
      // ok here we want to calculate if a resize is needed
      this.previousW = this.innerW;
      this.previousH = this.innerH;
      var newSize = this.$slots.default[0].elm.getBoundingClientRect();
      var pos = this.calcWH(newSize.height, newSize.width);

      if (pos.w < this.minW) {
        pos.w = this.minW;
      }

      if (pos.w > this.maxW) {
        pos.w = this.maxW;
      }

      if (pos.h < this.minH) {
        pos.h = this.minH;
      }

      if (pos.h > this.maxH) {
        pos.h = this.maxH;
      }

      if (pos.h < 1) {
        pos.h = 1;
      }

      if (pos.w < 1) {
        pos.w = 1;
      } // this.lastW = x; // basically, this is copied from resizehandler, but shouldn't be needed
      // this.lastH = y;


      if (this.innerW !== pos.w || this.innerH !== pos.h) {
        this.$emit("resize", this.i, pos.h, pos.w, newSize.height, newSize.width);
      }

      if (this.previousW !== pos.w || this.previousH !== pos.h) {
        this.$emit("resized", this.i, pos.h, pos.w, newSize.height, newSize.width);
        this.eventBus.$emit("resizeEvent", "resizeend", this.i, this.innerX, this.innerY, pos.h, pos.w);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/GridItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_GridItemvue_type_script_lang_js_ = (GridItemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/GridItem.vue?vue&type=style&index=0&lang=css&
var GridItemvue_type_style_index_0_lang_css_ = __webpack_require__("5ed4");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/GridItem.vue






/* normalize component */

var component = normalizeComponent(
  components_GridItemvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var GridItem = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"407b6f88-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GridLayout.vue?vue&type=template&id=2d4dae64&
var GridLayoutvue_type_template_id_2d4dae64_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"item",staticClass:"vue-grid-layout",style:(_vm.mergedStyle)},[_vm._t("default"),_c('grid-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.isDragging),expression:"isDragging"}],staticClass:"vue-grid-placeholder",attrs:{"x":_vm.placeholder.x,"y":_vm.placeholder.y,"w":_vm.placeholder.w,"h":_vm.placeholder.h,"i":_vm.placeholder.i}})],2)}
var GridLayoutvue_type_template_id_2d4dae64_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/GridLayout.vue?vue&type=template&id=2d4dae64&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js
var es7_object_get_own_property_descriptors = __webpack_require__("8e6e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.is-finite.js
var es6_number_is_finite = __webpack_require__("fca0");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js
var define_property = __webpack_require__("85f2");
var define_property_default = /*#__PURE__*/__webpack_require__.n(define_property);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js

function _defineProperty(obj, key, value) {
  if (key in obj) {
    define_property_default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./src/helpers/responsiveUtils.js



// @flow


/*:: import type {Layout} from './utils';*/

/*:: export type ResponsiveLayout = {lg?: Layout, md?: Layout, sm?: Layout, xs?: Layout, xxs?: Layout};*/

/*:: type Breakpoint = string;*/

/**
 * Given a width, find the highest breakpoint that matches is valid for it (width > breakpoint).
 *
 * @param  {Object} breakpoints Breakpoints object (e.g. {lg: 1200, md: 960, ...})
 * @param  {Number} width Screen width.
 * @return {String}       Highest breakpoint that is less than width.
 */

/*:: type Breakpoints = {lg?: number, md?: number, sm?: number, xs?: number, xxs?: number};*/

function getBreakpointFromWidth(breakpoints
/*: Breakpoints*/
, width
/*: number*/
)
/*: Breakpoint*/
{
  var sorted = sortBreakpoints(breakpoints);
  var matching = sorted[0];

  for (var i = 1, len = sorted.length; i < len; i++) {
    var breakpointName = sorted[i];
    if (width > breakpoints[breakpointName]) matching = breakpointName;
  }

  return matching;
}
/**
 * Given a breakpoint, get the # of cols set for it.
 * @param  {String} breakpoint Breakpoint name.
 * @param  {Object} cols       Map of breakpoints to cols.
 * @return {Number}            Number of cols.
 */

function getColsFromBreakpoint(breakpoint
/*: Breakpoint*/
, cols
/*: Breakpoints*/
)
/*: number*/
{
  if (!cols[breakpoint]) {
    throw new Error("ResponsiveGridLayout: `cols` entry for breakpoint " + breakpoint + " is missing!");
  }

  return cols[breakpoint];
}
/**
 * Given existing layouts and a new breakpoint, find or generate a new layout.
 *
 * This finds the layout above the new one and generates from it, if it exists.
 *
 * @param  {Array} orgLayout     Original layout.
 * @param  {Object} layouts     Existing layouts.
 * @param  {Array} breakpoints All breakpoints.
 * @param  {String} breakpoint New breakpoint.
 * @param  {String} breakpoint Last breakpoint (for fallback).
 * @param  {Number} cols       Column count at new breakpoint.
 * @param  {Boolean} verticalCompact Whether or not to compact the layout
 *   vertically.
 * @return {Array}             New layout.
 */

function findOrGenerateResponsiveLayout(orgLayout
/*: Layout*/
, layouts
/*: ResponsiveLayout*/
, breakpoints
/*: Breakpoints*/
, breakpoint
/*: Breakpoint*/
, lastBreakpoint
/*: Breakpoint*/
, cols
/*: number*/
, verticalCompact
/*: boolean*/
)
/*: Layout*/
{
  // If it already exists, just return it.
  if (layouts[breakpoint]) return cloneLayout(layouts[breakpoint]); // Find or generate the next layout

  var layout = orgLayout;
  var breakpointsSorted = sortBreakpoints(breakpoints);
  var breakpointsAbove = breakpointsSorted.slice(breakpointsSorted.indexOf(breakpoint));

  for (var i = 0, len = breakpointsAbove.length; i < len; i++) {
    var b = breakpointsAbove[i];

    if (layouts[b]) {
      layout = layouts[b];
      break;
    }
  }

  layout = cloneLayout(layout || []); // clone layout so we don't modify existing items

  return compact(correctBounds(layout, {
    cols: cols
  }), verticalCompact);
}
function generateResponsiveLayout(layout
/*: Layout*/
, breakpoints
/*: Breakpoints*/
, breakpoint
/*: Breakpoint*/
, lastBreakpoint
/*: Breakpoint*/
, cols
/*: number*/
, verticalCompact
/*: boolean*/
)
/*: Layout*/
{
  // If it already exists, just return it.

  /*if (layouts[breakpoint]) return cloneLayout(layouts[breakpoint]);
  // Find or generate the next layout
  let layout = layouts[lastBreakpoint];*/

  /*const breakpointsSorted = sortBreakpoints(breakpoints);
  const breakpointsAbove = breakpointsSorted.slice(breakpointsSorted.indexOf(breakpoint));
  for (let i = 0, len = breakpointsAbove.length; i < len; i++) {
  const b = breakpointsAbove[i];
  if (layouts[b]) {
    layout = layouts[b];
    break;
  }
  }*/
  layout = cloneLayout(layout || []); // clone layout so we don't modify existing items

  return compact(correctBounds(layout, {
    cols: cols
  }), verticalCompact);
}
/**
 * Given breakpoints, return an array of breakpoints sorted by width. This is usually
 * e.g. ['xxs', 'xs', 'sm', ...]
 *
 * @param  {Object} breakpoints Key/value pair of breakpoint names to widths.
 * @return {Array}              Sorted breakpoints.
 */

function sortBreakpoints(breakpoints
/*: Breakpoints*/
)
/*: Array<Breakpoint>*/
{
  var keys
  /*: Array<string>*/
  = Object.keys(breakpoints);
  return keys.sort(function (a, b) {
    return breakpoints[a] - breakpoints[b];
  });
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GridLayout.vue?vue&type=script&lang=js&









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var elementResizeDetectorMaker = __webpack_require__("eec4");


 //var eventBus = require('./eventBus');



/* harmony default export */ var GridLayoutvue_type_script_lang_js_ = ({
  name: "GridLayout",
  provide: function provide() {
    return {
      eventBus: null
    };
  },
  components: {
    GridItem: GridItem
  },
  props: {
    // If true, the container height swells and contracts to fit contents
    autoSize: {
      type: Boolean,
      default: true
    },
    colNum: {
      type: Number,
      default: 12
    },
    rowHeight: {
      type: Number,
      default: 150
    },
    maxRows: {
      type: Number,
      default: Infinity
    },
    margin: {
      type: Array,
      default: function _default() {
        return [10, 10];
      }
    },
    isDraggable: {
      type: Boolean,
      default: true
    },
    isResizable: {
      type: Boolean,
      default: true
    },
    isMirrored: {
      type: Boolean,
      default: false
    },
    useCssTransforms: {
      type: Boolean,
      default: true
    },
    verticalCompact: {
      type: Boolean,
      default: true
    },
    layout: {
      type: Array,
      required: true
    },
    responsive: {
      type: Boolean,
      default: false
    },
    responsiveLayouts: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    breakpoints: {
      type: Object,
      default: function _default() {
        return {
          lg: 1200,
          md: 996,
          sm: 768,
          xs: 480,
          xxs: 0
        };
      }
    },
    cols: {
      type: Object,
      default: function _default() {
        return {
          lg: 12,
          md: 10,
          sm: 6,
          xs: 4,
          xxs: 2
        };
      }
    },
    preventCollision: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      width: null,
      mergedStyle: {},
      lastLayoutLength: 0,
      isDragging: false,
      placeholder: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        i: -1
      },
      layouts: {},
      // array to store all layouts from different breakpoints
      lastBreakpoint: null,
      // store last active breakpoint
      originalLayout: null // store original Layout

    };
  },
  created: function created() {
    var self = this; // Accessible refernces of functions for removing in beforeDestroy

    self.resizeEventHandler = function (eventType, i, x, y, h, w) {
      self.resizeEvent(eventType, i, x, y, h, w);
    };

    self.dragEventHandler = function (eventType, i, x, y, h, w) {
      self.dragEvent(eventType, i, x, y, h, w);
    };

    self._provided.eventBus = new external_commonjs_vue_commonjs2_vue_root_Vue_default.a();
    self.eventBus = self._provided.eventBus;
    self.eventBus.$on('resizeEvent', self.resizeEventHandler);
    self.eventBus.$on('dragEvent', self.dragEventHandler);
    self.$emit('layout-created', self.layout);
  },
  beforeDestroy: function beforeDestroy() {
    //Remove listeners
    this.eventBus.$off('resizeEvent', this.resizeEventHandler);
    this.eventBus.$off('dragEvent', this.dragEventHandler);
    this.eventBus.$destroy();
    removeWindowEventListener("resize", this.onWindowResize);
    this.erd.uninstall(this.$refs.item);
  },
  beforeMount: function beforeMount() {
    this.$emit('layout-before-mount', this.layout);
  },
  mounted: function mounted() {
    this.$emit('layout-mounted', this.layout);
    this.$nextTick(function () {
      validateLayout(this.layout);
      this.originalLayout = this.layout;
      var self = this;
      this.$nextTick(function () {
        self.onWindowResize();
        self.initResponsiveFeatures(); //self.width = self.$el.offsetWidth;

        addWindowEventListener('resize', self.onWindowResize);
        compact(self.layout, self.verticalCompact);
        self.updateHeight();
        self.$nextTick(function () {
          this.erd = elementResizeDetectorMaker({
            strategy: "scroll",
            //<- For ultra performance.
            // See https://github.com/wnr/element-resize-detector/issues/110 about callOnAdd.
            callOnAdd: false
          });
          this.erd.listenTo(self.$refs.item, function () {
            self.onWindowResize();
          });
        });
      });
    });
  },
  watch: {
    width: function width(newval, oldval) {
      var self = this;
      this.$nextTick(function () {
        var _this = this;

        //this.$broadcast("updateWidth", this.width);
        this.eventBus.$emit("updateWidth", this.width);

        if (oldval === null) {
          /*
              If oldval == null is when the width has never been
              set before. That only occurs when mouting is
              finished, and onWindowResize has been called and
              this.width has been changed the first time after it
              got set to null in the constructor. It is now time
              to issue layout-ready events as the GridItems have
              their sizes configured properly.
               The reason for emitting the layout-ready events on
              the next tick is to allow for the newly-emitted
              updateWidth event (above) to have reached the
              children GridItem-s and had their effect, so we're
              sure that they have the final size before we emit
              layout-ready (for this GridLayout) and
              item-layout-ready (for the GridItem-s).
               This way any client event handlers can reliably
              invistigate stable sizes of GridItem-s.
          */
          this.$nextTick(function () {
            _this.$emit('layout-ready', self.layout);
          });
        }

        this.updateHeight();
      });
    },
    layout: function layout() {
      this.layoutUpdate();
    },
    // responsiveLayouts: function () {
    //     let newBreakpoint = getBreakpointFromWidth(this.breakpoints, this.width);
    //     console.log("calculated breakpoint: ", newBreakpoint, " : ", this.breakpoints, " : ", this.width)
    //     if(newBreakpoint !== "xxs" && this.responsiveLayouts[newBreakpoint] !== undefined && this.responsiveLayouts[newBreakpoint] !== null) {
    //         this.$emit('update:layout', this.responsiveLayouts[newBreakpoint]);
    //         this.layoutUpdate();
    //     }
    // },
    colNum: function colNum(val) {
      this.eventBus.$emit("setColNum", val);
    },
    rowHeight: function rowHeight() {
      this.eventBus.$emit("setRowHeight", this.rowHeight);
    },
    isDraggable: function isDraggable() {
      this.eventBus.$emit("setDraggable", this.isDraggable);
    },
    isResizable: function isResizable() {
      this.eventBus.$emit("setResizable", this.isResizable);
    },
    responsive: function responsive() {
      if (!this.responsive) {
        this.$emit('update:layout', this.originalLayout);
        this.eventBus.$emit("setColNum", this.colNum);
      }

      this.onWindowResize();
    },
    maxRows: function maxRows() {
      this.eventBus.$emit("setMaxRows", this.maxRows);
    }
  },
  methods: {
    layoutUpdate: function layoutUpdate() {
      if (this.layout !== undefined && this.originalLayout !== null) {
        if (this.layout.length !== this.originalLayout.length) {
          // console.log("### LAYOUT UPDATE!", this.layout.length, this.originalLayout.length);
          var diff = this.findDifference(this.layout, this.originalLayout);

          if (diff.length > 0) {
            // console.log(diff);
            if (this.layout.length > this.originalLayout.length) {
              this.originalLayout = this.originalLayout.concat(diff);
            } else {
              this.originalLayout = this.originalLayout.filter(function (obj) {
                return !diff.some(function (obj2) {
                  return obj.i === obj2.i;
                });
              });
            }
          }

          this.lastLayoutLength = this.layout.length;
          this.initResponsiveFeatures();
        }

        compact(this.layout, this.verticalCompact);
        this.eventBus.$emit("updateWidth", this.width);
        this.updateHeight();
      }
    },
    updateHeight: function updateHeight() {
      this.mergedStyle = {
        height: this.containerHeight()
      };
    },
    onWindowResize: function onWindowResize() {
      if (this.$refs !== null && this.$refs.item !== null && this.$refs.item !== undefined) {
        this.width = this.$refs.item.offsetWidth;
      }

      this.eventBus.$emit("resizeEvent");
    },
    containerHeight: function containerHeight() {
      if (!this.autoSize) return;
      return bottom(this.layout) * (this.rowHeight + this.margin[1]) + this.margin[1] + 'px';
    },
    dragEvent: function dragEvent(eventName, id, x, y, h, w) {
      //console.log(eventName + " id=" + id + ", x=" + x + ", y=" + y);
      var l = getLayoutItem(this.layout, id); //GetLayoutItem sometimes returns null object

      if (l === undefined || l === null) {
        l = {
          x: 0,
          y: 0
        };
      }

      if (eventName === "dragmove" || eventName === "dragstart") {
        this.placeholder.i = id;
        this.placeholder.x = l.x;
        this.placeholder.y = l.y;
        this.placeholder.w = w;
        this.placeholder.h = h;
        this.$nextTick(function () {
          this.isDragging = true;
        }); //this.$broadcast("updateWidth", this.width);

        this.eventBus.$emit("updateWidth", this.width);
      } else {
        this.$nextTick(function () {
          this.isDragging = false;
        });
      } // Move the element to the dragged location.


      this.layout = moveElement(this.layout, l, x, y, true, this.preventCollision);
      compact(this.layout, this.verticalCompact); // needed because vue can't detect changes on array element properties

      this.eventBus.$emit("compact");
      this.updateHeight();
      if (eventName === 'dragend') this.$emit('layout-updated', this.layout);
    },
    resizeEvent: function resizeEvent(eventName, id, x, y, h, w) {
      var l = getLayoutItem(this.layout, id); //GetLayoutItem sometimes return null object

      if (l === undefined || l === null) {
        l = {
          h: 0,
          w: 0
        };
      }

      var hasCollisions;

      if (this.preventCollision) {
        var collisions = getAllCollisions(this.layout, _objectSpread({}, l, {
          w: w,
          h: h
        })).filter(function (layoutItem) {
          return layoutItem.i !== l.i;
        });
        hasCollisions = collisions.length > 0; // If we're colliding, we need adjust the placeholder.

        if (hasCollisions) {
          // adjust w && h to maximum allowed space
          var leastX = Infinity,
              leastY = Infinity;
          collisions.forEach(function (layoutItem) {
            if (layoutItem.x > l.x) leastX = Math.min(leastX, layoutItem.x);
            if (layoutItem.y > l.y) leastY = Math.min(leastY, layoutItem.y);
          });
          if (Number.isFinite(leastX)) l.w = leastX - l.x;
          if (Number.isFinite(leastY)) l.h = leastY - l.y;
        }
      }

      if (!hasCollisions) {
        // Set new width and height.
        l.w = w;
        l.h = h;
      }

      if (eventName === "resizestart" || eventName === "resizemove") {
        this.placeholder.i = id;
        this.placeholder.x = x;
        this.placeholder.y = y;
        this.placeholder.w = l.w;
        this.placeholder.h = l.h;
        this.$nextTick(function () {
          this.isDragging = true;
        }); //this.$broadcast("updateWidth", this.width);

        this.eventBus.$emit("updateWidth", this.width);
      } else {
        this.$nextTick(function () {
          this.isDragging = false;
        });
      }

      if (this.responsive) this.responsiveGridLayout();
      compact(this.layout, this.verticalCompact);
      this.eventBus.$emit("compact");
      this.updateHeight();
      if (eventName === 'resizeend') this.$emit('layout-updated', this.layout);
    },
    // finds or generates new layouts for set breakpoints
    responsiveGridLayout: function responsiveGridLayout() {
      var newBreakpoint = getBreakpointFromWidth(this.breakpoints, this.width);
      var newCols = getColsFromBreakpoint(newBreakpoint, this.cols); // save actual layout in layouts

      if (this.lastBreakpoint != null && !this.layouts[this.lastBreakpoint]) this.layouts[this.lastBreakpoint] = cloneLayout(this.layout); // Find or generate a new layout.

      var layout = findOrGenerateResponsiveLayout(this.originalLayout, this.layouts, this.breakpoints, newBreakpoint, this.lastBreakpoint, newCols, this.verticalCompact); // Store the new layout.

      this.layouts[newBreakpoint] = layout;

      if (this.lastBreakpoint !== newBreakpoint) {
        this.$emit('breakpoint-changed', newBreakpoint, layout);
      } // new prop sync


      this.$emit('update:layout', layout);
      this.lastBreakpoint = newBreakpoint;
      this.eventBus.$emit("setColNum", getColsFromBreakpoint(newBreakpoint, this.cols));
    },
    // clear all responsive layouts
    initResponsiveFeatures: function initResponsiveFeatures() {
      // clear layouts
      console.log("initializing responsive features");
      this.layouts = Object.assign({}, this.responsiveLayouts);
    },
    // find difference in layouts
    findDifference: function findDifference(layout, originalLayout) {
      //Find values that are in result1 but not in result2
      var uniqueResultOne = layout.filter(function (obj) {
        return !originalLayout.some(function (obj2) {
          return obj.i === obj2.i;
        });
      }); //Find values that are in result2 but not in result1

      var uniqueResultTwo = originalLayout.filter(function (obj) {
        return !layout.some(function (obj2) {
          return obj.i === obj2.i;
        });
      }); //Combine the two arrays of unique entries#

      return uniqueResultOne.concat(uniqueResultTwo);
    }
  }
});
// CONCATENATED MODULE: ./src/components/GridLayout.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_GridLayoutvue_type_script_lang_js_ = (GridLayoutvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/GridLayout.vue?vue&type=style&index=0&lang=css&
var GridLayoutvue_type_style_index_0_lang_css_ = __webpack_require__("e279");

// CONCATENATED MODULE: ./src/components/GridLayout.vue






/* normalize component */

var GridLayout_component = normalizeComponent(
  components_GridLayoutvue_type_script_lang_js_,
  GridLayoutvue_type_template_id_2d4dae64_render,
  GridLayoutvue_type_template_id_2d4dae64_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var GridLayout = (GridLayout_component.exports);
// CONCATENATED MODULE: ./src/components/index.js






 // import ResponsiveGridLayout from './ResponsiveGridLayout.vue';

var VueGridLayout = {
  // ResponsiveGridLayout,
  GridLayout: GridLayout,
  GridItem: GridItem
}; // module.exports = VueGridLayout;

Object.keys(VueGridLayout).forEach(function (name) {
  external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component(name, VueGridLayout[name]);
});
/* harmony default export */ var components = (VueGridLayout);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (components);



/***/ }),

/***/ "fca0":
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__("5ca1");
var _isFinite = __webpack_require__("7726").isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vue-grid-layout.umd.js.map