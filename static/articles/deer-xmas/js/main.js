(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var timeout = require("fz/utils/timeout");
var Emitter = require("fz/events/Emitter");

var Stage = (function (_Emitter) {
  _inherits(Stage, _Emitter);

  function Stage() {
    _classCallCheck(this, Stage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Stage).call(this));

    _this.width = 0;
    _this.height = 0;

    _this.resolution = window.devicePixelRatio;

    _this._binds = {};
    _this._binds.onResize = _this._onResize.bind(_this);
    _this._binds.update = _this._update.bind(_this);
    return _this;
  }

  _createClass(Stage, [{
    key: "_onResize",
    value: function _onResize() {
      timeout(this._binds.update, 10);
    }
  }, {
    key: "init",
    value: function init() {
      var andDispatch = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      window.addEventListener("resize", this._binds.onResize, false);
      window.addEventListener("orientationchange", this._binds.onResize, false);

      if (andDispatch) {
        this._update();
      }
    }
  }, {
    key: "_update",
    value: function _update() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.emit("resize");
    }
  }, {
    key: "forceResize",
    value: function forceResize() {
      var withDelay = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      if (withDelay) {
        this._onResize();
        return;
      }
      this._update();
    }
  }]);

  return Stage;
})(Emitter);

module.exports = new Stage();

},{"fz/events/Emitter":2,"fz/utils/timeout":7}],2:[function(require,module,exports){
'use strict';

/**
 * Expose `Emitter`.
 */

// module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function (event, fn) {
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1),
      callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};

module.exports = Emitter;

},{}],3:[function(require,module,exports){
"use strict";

var browsers = require("fz/utils/browsers");

var downs = {};
var moves = {};
var ups = {};
var clicks = {};
var overs = {};
var outs = {};

var interactions = [downs, moves, ups, clicks];

var isTouchDevice = browsers.mobile || browsers.tablet;

function getEvent(action) {
  var evt = "";
  if (isTouchDevice) {

    if (window.navigator.msPointerEnabled) {
      switch (action) {
        case "down":
          evt = "MSPointerDown";break;
        case "move":
          evt = "MSPointerMove";break;
        case "up":
          evt = "MSPointerUp";break;
        case "click":
          evt = "MSPointerUp";break;
      }

      //console.log("evt", evt, action);
    } else {
        switch (action) {
          case "down":
            evt = "touchstart";break;
          case "move":
            evt = "touchmove";break;
          case "up":
            evt = "touchend";break;
          case "click":
            evt = "touchstart";break;
        }
      }
  } else {
    switch (action) {
      case "down":
        evt = "mousedown";break;
      case "move":
        evt = "mousemove";break;
      case "up":
        evt = "mouseup";break;
      case "click":
        evt = "click";break;
      case "over":
        evt = browsers.safari ? "mouseover" : "mouseenter";break;
      case "out":
        evt = browsers.safari ? "mouseout" : "mouseleave";break;
    }
  }
  return evt;
}

function getObj(action) {
  switch (action) {
    case "down":
      return downs;
    case "move":
      return moves;
    case "up":
      return ups;
    case "click":
      return clicks;
    case "over":
      return overs;
    case "out":
      return outs;
  }
}

function find(cb, datas) {
  var data = null;
  for (var i = 0, n = datas.length; i < n; i++) {
    data = datas[i];
    if (data.cb == cb) {
      return { data: data, idx: i };
    }
  }
  return null;
}

module.exports.on = function (elt, action, cb) {
  var evt = getEvent(action);
  if (evt == "") {
    return;
  }

  var obj = getObj(action);
  if (!obj[elt]) {
    obj[elt] = [];
  }

  var isOver = false;

  function proxy(e) {
    e = { x: 0, y: 0, origin: e };

    if (isTouchDevice) {

      if (window.navigator.msPointerEnabled) {
        // mspointerevents
        e.x = e.origin.clientX;
        e.y = e.origin.clientY;
      } else {
        var touch = e.origin.touches[0];
        if (touch) {
          e.x = touch.clientX;
          e.y = touch.clientY;
        }
      }
    } else {
      e.x = e.origin.clientX;
      e.y = e.origin.clientY;
    }

    cb.call(this, e);
  }

  obj[elt].push({ cb: cb, proxy: proxy });
  elt.addEventListener(evt, proxy, false);
};

module.exports.off = function (elt, action, cb) {
  var evt = getEvent(action);
  if (evt == "") {
    return;
  }

  var obj = getObj(action);
  if (!obj[elt]) {
    return;
  }

  var datas = obj[elt];
  if (cb) {
    var result = find(cb, datas);
    if (!result) {
      return;
    }
    elt.removeEventListener(evt, result.data.proxy, false);
    obj[elt].splice(result.idx, 1);
  } else {
    var data = null;
    for (var i = 0, n = datas.length; i < n; i++) {
      data = datas[i];
      elt.removeEventListener(evt, data.proxy, false);
    }
    obj[elt] = null;
    delete obj[elt];
  }
};

module.exports.has = function (elt, action, cb) {
  var evt = getEvent(action);
  if (evt == "") {
    return;
  }

  var obj = getObj(action);
  if (!obj[elt]) {
    return;
  }

  var datas = obj[elt];
  if (cb) {
    return true;
  }
  return false;
};

module.exports.unbind = function (elt) {
  for (var i = 0, n = interactions.length; i < n; i++) {
    interactions[i][elt] = null;
    delete interactions[i][elt];
  }
};

},{"fz/utils/browsers":4}],4:[function(require,module,exports){
'use strict';

/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!(function (name, definition) {
    if (typeof module != 'undefined' && module.exports) module.exports = definition();else if (typeof define == 'function' && define.amd) define(definition);else this[name] = definition();
})('bowser', function () {
    /**
     * See useragents.js for examples of navigator.userAgent
     */

    var t = true;

    function detect(ua) {

        function getFirstMatch(regex) {
            var match = ua.match(regex);
            return match && match.length > 1 && match[1] || '';
        }

        function getSecondMatch(regex) {
            var match = ua.match(regex);
            return match && match.length > 1 && match[2] || '';
        }

        var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase(),
            likeAndroid = /like android/i.test(ua),
            android = !likeAndroid && /android/i.test(ua),
            chromeBook = /CrOS/.test(ua),
            edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i),
            versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i),
            tablet = /tablet/i.test(ua),
            mobile = !tablet && /[^-]mobi/i.test(ua),
            result;

        if (/opera|opr/i.test(ua)) {
            result = {
                name: 'Opera',
                opera: t,
                version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
            };
        } else if (/yabrowser/i.test(ua)) {
            result = {
                name: 'Yandex Browser',
                yandexbrowser: t,
                version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
            };
        } else if (/windows phone/i.test(ua)) {
            result = {
                name: 'Windows Phone',
                windowsphone: t
            };
            if (edgeVersion) {
                result.msedge = t;
                result.version = edgeVersion;
            } else {
                result.msie = t;
                result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i);
            }
        } else if (/msie|trident/i.test(ua)) {
            result = {
                name: 'Internet Explorer',
                msie: t,
                version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
            };
        } else if (chromeBook) {
            result = {
                name: 'Chrome',
                chromeBook: t,
                chrome: t,
                version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
            };
        } else if (/chrome.+? edge/i.test(ua)) {
            result = {
                name: 'Microsoft Edge',
                msedge: t,
                version: edgeVersion
            };
        } else if (/chrome|crios|crmo/i.test(ua)) {
            result = {
                name: 'Chrome',
                chrome: t,
                version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
            };
        } else if (iosdevice) {
            result = {
                name: iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
            };
            // WTF: version is not part of user agent in web apps
            if (versionIdentifier) {
                result.version = versionIdentifier;
            }
        } else if (/sailfish/i.test(ua)) {
            result = {
                name: 'Sailfish',
                sailfish: t,
                version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
            };
        } else if (/seamonkey\//i.test(ua)) {
            result = {
                name: 'SeaMonkey',
                seamonkey: t,
                version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
            };
        } else if (/firefox|iceweasel/i.test(ua)) {
            result = {
                name: 'Firefox',
                firefox: t,
                version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
            };
            if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
                result.firefoxos = t;
            }
        } else if (/silk/i.test(ua)) {
            result = {
                name: 'Amazon Silk',
                silk: t,
                version: getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
            };
        } else if (android) {
            result = {
                name: 'Android',
                version: versionIdentifier
            };
        } else if (/phantom/i.test(ua)) {
            result = {
                name: 'PhantomJS',
                phantom: t,
                version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
            };
        } else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
            result = {
                name: 'BlackBerry',
                blackberry: t,
                version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
            };
        } else if (/(web|hpw)os/i.test(ua)) {
            result = {
                name: 'WebOS',
                webos: t,
                version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
            };
            /touchpad\//i.test(ua) && (result.touchpad = t);
        } else if (/bada/i.test(ua)) {
            result = {
                name: 'Bada',
                bada: t,
                version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
            };
        } else if (/tizen/i.test(ua)) {
            result = {
                name: 'Tizen',
                tizen: t,
                version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
            };
        } else if (/safari/i.test(ua)) {
            result = {
                name: 'Safari',
                safari: t,
                version: versionIdentifier
            };
        } else {
            result = {
                name: getFirstMatch(/^(.*)\/(.*) /),
                version: getSecondMatch(/^(.*)\/(.*) /)
            };
        }

        // set webkit or gecko flag for browsers based on these engines
        if (!result.msedge && /(apple)?webkit/i.test(ua)) {
            result.name = result.name || "Webkit";
            result.webkit = t;
            if (!result.version && versionIdentifier) {
                result.version = versionIdentifier;
            }
        } else if (!result.opera && /gecko\//i.test(ua)) {
            result.name = result.name || "Gecko";
            result.gecko = t;
            result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i);
        }

        // set OS flags for platforms that have multiple browsers
        if (!result.msedge && (android || result.silk)) {
            result.android = t;
        } else if (iosdevice) {
            result[iosdevice] = t;
            result.ios = t;
        }

        // OS version extraction
        var osVersion = '';
        if (result.windowsphone) {
            osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
        } else if (iosdevice) {
            osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
            osVersion = osVersion.replace(/[_\s]/g, '.');
        } else if (android) {
            osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
        } else if (result.webos) {
            osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
        } else if (result.blackberry) {
            osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
        } else if (result.bada) {
            osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
        } else if (result.tizen) {
            osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
        }
        if (osVersion) {
            result.osversion = osVersion;
        }

        // device type extraction
        var osMajorVersion = osVersion.split('.')[0];
        if (tablet || iosdevice == 'ipad' || android && (osMajorVersion == 3 || osMajorVersion == 4 && !mobile) || result.silk) {
            result.tablet = t;
        } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
            result.mobile = t;
        }

        // Graded Browser Support
        // http://developer.yahoo.com/yui/articles/gbs
        if (result.msedge || result.msie && result.version >= 10 || result.yandexbrowser && result.version >= 15 || result.chrome && result.version >= 20 || result.firefox && result.version >= 20.0 || result.safari && result.version >= 6 || result.opera && result.version >= 10.0 || result.ios && result.osversion && result.osversion.split(".")[0] >= 6 || result.blackberry && result.version >= 10.1) {
            result.a = t;
        } else if (result.msie && result.version < 10 || result.chrome && result.version < 20 || result.firefox && result.version < 20.0 || result.safari && result.version < 6 || result.opera && result.version < 10.0 || result.ios && result.osversion && result.osversion.split(".")[0] < 6) {
            result.c = t;
        } else result.x = t;

        return result;
    }

    var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '');

    bowser.test = function (browserList) {
        for (var i = 0; i < browserList.length; ++i) {
            var browserItem = browserList[i];
            if (typeof browserItem === 'string') {
                if (browserItem in bowser) {
                    return true;
                }
            }
        }
        return false;
    };

    /*
     * Set our detect method to the main bowser object so we can
     * reuse it to test other user agents.
     * This is needed to implement future tests.
     */
    bowser._detect = detect;

    return bowser;
});

},{}],5:[function(require,module,exports){
"use strict";

module.exports.fit = function (wImg, hImg, wHolder, hHolder) {
  var sw = wImg / wHolder;
  var sh = hImg / hHolder;

  var ratio = 0;
  if (sw > sh) {
    ratio = sh;
  } else {
    ratio = sw;
  }
  ratio = 1 / ratio;

  var w = wImg * ratio;
  var h = hImg * ratio;
  var x = wHolder - w >> 1;
  var y = hHolder - h >> 1;

  return { x: x, y: y, width: w, height: h };
};

},{}],6:[function(require,module,exports){
"use strict";

module.exports = (function () {

  var perf = window && window.performance;
  if (perf && perf.now) {
    return perf.now.bind(perf);
  } else {
    return function () {
      return new Date().getTime();
    };
  }
})();

},{}],7:[function(require,module,exports){
"use strict";

// bigup kewah

var now = require("fz/utils/now");

module.exports = function (fn, delay) {
  var start = now();

  function lp() {
    if (now() - start >= delay) {
      fn.call();
    } else {
      data.id = requestAnimationFrame(lp);
    }
  }

  var data = {};
  data.id = requestAnimationFrame(lp);

  return data;
};

module.exports.clear = function (data) {
  if (data) {
    cancelAnimationFrame(data.id);
  }
};

},{"fz/utils/now":6}],8:[function(require,module,exports){
"use strict";

hljs.initHighlightingOnLoad();

var stage = require("fz/core/stage");
var uImage = require("fz/utils/images");

//

var domContainer = document.querySelector(".dx-container");
var wDomContainer = domContainer.offsetWidth;
var domImgHolder = document.querySelector(".dx-img");
var hDomImgHolder = domImgHolder.offsetHeight;

var img = null;
var domImgs = document.querySelectorAll(".dx-img img");
var countImgs = domImgs.length;
for (var i = 0; i < countImgs; i++) {
  img = domImgs[i];
  img.addEventListener("load", function (e) {
    resizeImg(e.target);
    TweenLite.to(e.target, .8, {
      css: {
        alpha: 1
      },
      ease: Quad.easeOut
    });
  }, false);
  img.src = img.getAttribute("data-src");
}

stage.on("resize", function () {
  wDomContainer = domContainer.offsetWidth;

  var data = null;
  var domImg = null;
  for (var i = 0; i < countImgs; i++) {
    domImg = domImgs[i];
    resizeImg(domImg);
  }
});
stage.init();

function resizeImg(domImg) {
  var data = uImage.fit(domImg.getAttribute("data-width"), domImg.getAttribute("data-height"), wDomContainer, hDomImgHolder);
  domImg.style.left = (data.x >> 0) + "px";
  domImg.style.top = (data.y >> 0) + "px";
  domImg.width = data.width >> 0;
  domImg.height = data.height >> 0;
}

var title = encodeURIComponent("Deer Xmas - Case study");
var desc = encodeURIComponent("Case study of the creation of Deer Xmas.");
var url = "http://makioandfloz.com/articles/deerxmas/";
var urlEncoded = encodeURIComponent(url);
var urlImgTwitter = encodeURIComponent(url + "twitter.jpg");

var interactions = require("fz/events/interactions");
interactions.on(document.querySelector(".dx-shares-icon--facebook"), "click", function (e) {
  e.origin.preventDefault();
  FB.ui({
    method: 'feed',
    href: urlEncoded,
    name: title,
    picture: "./facebook.jpg",
    description: desc
  }, function (res) {});
});
interactions.on(document.querySelector(".dx-shares-icon--twitter"), "click", function (e) {
  e.origin.preventDefault();
  var url = "https://twitter.com/intent/tweet?text=" + desc + " " + urlImgTwitter + " " + urlEncoded;
  window.open(url, title, "width=640,height=400");
});

},{"fz/core/stage":1,"fz/events/interactions":3,"fz/utils/images":5}]},{},[8]);
