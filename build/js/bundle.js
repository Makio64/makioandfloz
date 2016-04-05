/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + {"1":"a372d8bc0be477855529"}[chunkId] + ".bundle.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var LoadingScene, Preloader, SceneTraveler, Stage;

	Stage = __webpack_require__(1);

	SceneTraveler = __webpack_require__(3);

	LoadingScene = __webpack_require__(4);

	Preloader = (function() {
	  function Preloader() {}

	  Preloader.percent = 0;

	  Preloader.fakeLoad = function(dt) {
	    return Preloader.percent += 0.0005 * dt / 16;
	  };

	  Preloader.init = function() {
	    SceneTraveler.to(new LoadingScene());
	    document.removeEventListener('DOMContentLoaded', Preloader.init);
	    __webpack_require__.e/* nsure */(1, function(require) {
	      var Main, main;
	      Main = __webpack_require__(6);
	      return main = new Main(Preloader.onLoad);
	    });
	  };

	  Preloader.onLoad = function(percent) {};

	  document.addEventListener('DOMContentLoaded', Preloader.init);

	  return Preloader;

	})();

	module.exports = Preloader;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Signal, StageRenderer;

	Signal = __webpack_require__(2);

	StageRenderer = (function() {
	  function StageRenderer() {}

	  StageRenderer.lastTime = 0;

	  StageRenderer.pause = false;

	  StageRenderer.canSkip = false;

	  StageRenderer.skipLimit = 32;

	  StageRenderer.onResize = new Signal();

	  StageRenderer.onUpdate = new Signal();

	  StageRenderer.width = window.innerWidth;

	  StageRenderer.height = window.innerHeight;

	  StageRenderer.init = function() {
	    this.pause = false;
	    window.onresize = (function(_this) {
	      return function() {
	        _this.width = window.innerWidth;
	        _this.height = window.innerHeight;
	        _this.onResize.dispatch();
	      };
	    })(this);
	    this.lastTime = Date.now();
	    requestAnimationFrame(this.update);
	    document.addEventListener('touchstart', this.goFullScreen, true);
	  };

	  StageRenderer.fullScreen = function() {
	    var doc, docEl, requestFullScreen;
	    doc = window.document;
	    docEl = doc.documentElement;
	    requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
	      return requestFullScreen.call(docEl);
	    }
	  };

	  StageRenderer.update = function() {
	    var dt, t;
	    t = Date.now();
	    dt = t - StageRenderer.lastTime;
	    StageRenderer.lastTime = t;
	    if (StageRenderer.pause) {
	      return;
	    }
	    if (StageRenderer.canSkip && dt > StageRenderer.skipLimit) {
	      return;
	    }
	    StageRenderer.onUpdate.dispatch(dt);
	    requestAnimationFrame(StageRenderer.update);
	  };

	  StageRenderer.init();

	  return StageRenderer;

	})();

	module.exports = StageRenderer;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*jslint onevar:true, undef:true, newcap:true, regexp:true, bitwise:true, maxerr:50, indent:4, white:false, nomen:false, plusplus:false */
	/*global define:false, require:false, exports:false, module:false, signals:false */

	/** @license
	 * JS Signals <http://millermedeiros.github.com/js-signals/>
	 * Released under the MIT license
	 * Author: Miller Medeiros
	 * Version: 1.0.0 - Build: 268 (2012/11/29 05:48 PM)
	 */

	(function(global){

	    // SignalBinding -------------------------------------------------
	    //================================================================

	    /**
	     * Object that represents a binding between a Signal and a listener function.
	     * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
	     * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
	     * @author Miller Medeiros
	     * @constructor
	     * @internal
	     * @name SignalBinding
	     * @param {Signal} signal Reference to Signal object that listener is currently bound to.
	     * @param {Function} listener Handler function bound to the signal.
	     * @param {boolean} isOnce If binding should be executed just once.
	     * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
	     * @param {Number} [priority] The priority level of the event listener. (default = 0).
	     */
	    function SignalBinding(signal, listener, isOnce, listenerContext, priority) {

	        /**
	         * Handler function bound to the signal.
	         * @type Function
	         * @private
	         */
	        this._listener = listener;

	        /**
	         * If binding should be executed just once.
	         * @type boolean
	         * @private
	         */
	        this._isOnce = isOnce;

	        /**
	         * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
	         * @memberOf SignalBinding.prototype
	         * @name context
	         * @type Object|undefined|null
	         */
	        this.context = listenerContext;

	        /**
	         * Reference to Signal object that listener is currently bound to.
	         * @type Signal
	         * @private
	         */
	        this._signal = signal;

	        /**
	         * Listener priority
	         * @type Number
	         * @private
	         */
	        this._priority = priority || 0;
	    }

	    SignalBinding.prototype = {

	        /**
	         * If binding is active and should be executed.
	         * @type boolean
	         */
	        active : true,

	        /**
	         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
	         * @type Array|null
	         */
	        params : null,

	        /**
	         * Call listener passing arbitrary parameters.
	         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
	         * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
	         * @return {*} Value returned by the listener.
	         */
	        execute : function (paramsArr) {
	            var handlerReturn, params;
	            if (this.active && !!this._listener) {
	                params = this.params? this.params.concat(paramsArr) : paramsArr;
	                handlerReturn = this._listener.apply(this.context, params);
	                if (this._isOnce) {
	                    this.detach();
	                }
	            }
	            return handlerReturn;
	        },

	        /**
	         * Detach binding from signal.
	         * - alias to: mySignal.remove(myBinding.getListener());
	         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
	         */
	        detach : function () {
	            return this.isBound()? this._signal.remove(this._listener, this.context) : null;
	        },

	        /**
	         * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
	         */
	        isBound : function () {
	            return (!!this._signal && !!this._listener);
	        },

	        /**
	         * @return {boolean} If SignalBinding will only be executed once.
	         */
	        isOnce : function () {
	            return this._isOnce;
	        },

	        /**
	         * @return {Function} Handler function bound to the signal.
	         */
	        getListener : function () {
	            return this._listener;
	        },

	        /**
	         * @return {Signal} Signal that listener is currently bound to.
	         */
	        getSignal : function () {
	            return this._signal;
	        },

	        /**
	         * Delete instance properties
	         * @private
	         */
	        _destroy : function () {
	            delete this._signal;
	            delete this._listener;
	            delete this.context;
	        },

	        /**
	         * @return {string} String representation of the object.
	         */
	        toString : function () {
	            return '[SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
	        }

	    };


	/*global SignalBinding:false*/

	    // Signal --------------------------------------------------------
	    //================================================================

	    function validateListener(listener, fnName) {
	        if (typeof listener !== 'function') {
	            throw new Error( 'listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName) );
	        }
	    }

	    /**
	     * Custom event broadcaster
	     * <br />- inspired by Robert Penner's AS3 Signals.
	     * @name Signal
	     * @author Miller Medeiros
	     * @constructor
	     */
	    function Signal() {
	        /**
	         * @type Array.<SignalBinding>
	         * @private
	         */
	        this._bindings = [];
	        this._prevParams = null;

	        // enforce dispatch to aways work on same context (#47)
	        var self = this;
	        this.dispatch = function(){
	            Signal.prototype.dispatch.apply(self, arguments);
	        };
	    }

	    Signal.prototype = {

	        /**
	         * Signals Version Number
	         * @type String
	         * @const
	         */
	        VERSION : '1.0.0',

	        /**
	         * If Signal should keep record of previously dispatched parameters and
	         * automatically execute listener during `add()`/`addOnce()` if Signal was
	         * already dispatched before.
	         * @type boolean
	         */
	        memorize : false,

	        /**
	         * @type boolean
	         * @private
	         */
	        _shouldPropagate : true,

	        /**
	         * If Signal is active and should broadcast events.
	         * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
	         * @type boolean
	         */
	        active : true,

	        /**
	         * @param {Function} listener
	         * @param {boolean} isOnce
	         * @param {Object} [listenerContext]
	         * @param {Number} [priority]
	         * @return {SignalBinding}
	         * @private
	         */
	        _registerListener : function (listener, isOnce, listenerContext, priority) {

	            var prevIndex = this._indexOfListener(listener, listenerContext),
	                binding;

	            if (prevIndex !== -1) {
	                binding = this._bindings[prevIndex];
	                if (binding.isOnce() !== isOnce) {
	                    throw new Error('You cannot add'+ (isOnce? '' : 'Once') +'() then add'+ (!isOnce? '' : 'Once') +'() the same listener without removing the relationship first.');
	                }
	            } else {
	                binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
	                this._addBinding(binding);
	            }

	            if(this.memorize && this._prevParams){
	                binding.execute(this._prevParams);
	            }

	            return binding;
	        },

	        /**
	         * @param {SignalBinding} binding
	         * @private
	         */
	        _addBinding : function (binding) {
	            //simplified insertion sort
	            var n = this._bindings.length;
	            do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
	            this._bindings.splice(n + 1, 0, binding);
	        },

	        /**
	         * @param {Function} listener
	         * @return {number}
	         * @private
	         */
	        _indexOfListener : function (listener, context) {
	            var n = this._bindings.length,
	                cur;
	            while (n--) {
	                cur = this._bindings[n];
	                if (cur._listener === listener && cur.context === context) {
	                    return n;
	                }
	            }
	            return -1;
	        },

	        /**
	         * Check if listener was attached to Signal.
	         * @param {Function} listener
	         * @param {Object} [context]
	         * @return {boolean} if Signal has the specified listener.
	         */
	        has : function (listener, context) {
	            return this._indexOfListener(listener, context) !== -1;
	        },

	        /**
	         * Add a listener to the signal.
	         * @param {Function} listener Signal handler function.
	         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
	         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
	         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
	         */
	        add : function (listener, listenerContext, priority) {
	            validateListener(listener, 'add');
	            return this._registerListener(listener, false, listenerContext, priority);
	        },

	        /**
	         * Add listener to the signal that should be removed after first execution (will be executed only once).
	         * @param {Function} listener Signal handler function.
	         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
	         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
	         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
	         */
	        addOnce : function (listener, listenerContext, priority) {
	            validateListener(listener, 'addOnce');
	            return this._registerListener(listener, true, listenerContext, priority);
	        },

	        /**
	         * Remove a single listener from the dispatch queue.
	         * @param {Function} listener Handler function that should be removed.
	         * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
	         * @return {Function} Listener handler function.
	         */
	        remove : function (listener, context) {
	            validateListener(listener, 'remove');

	            var i = this._indexOfListener(listener, context);
	            if (i !== -1) {
	                this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
	                this._bindings.splice(i, 1);
	            }
	            return listener;
	        },

	        /**
	         * Remove all listeners from the Signal.
	         */
	        removeAll : function () {
	            var n = this._bindings.length;
	            while (n--) {
	                this._bindings[n]._destroy();
	            }
	            this._bindings.length = 0;
	        },

	        /**
	         * @return {number} Number of listeners attached to the Signal.
	         */
	        getNumListeners : function () {
	            return this._bindings.length;
	        },

	        /**
	         * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
	         * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
	         * @see Signal.prototype.disable
	         */
	        halt : function () {
	            this._shouldPropagate = false;
	        },

	        /**
	         * Dispatch/Broadcast Signal to all listeners added to the queue.
	         * @param {...*} [params] Parameters that should be passed to each handler.
	         */
	        dispatch : function (params) {
	            if (! this.active) {
	                return;
	            }

	            var paramsArr = Array.prototype.slice.call(arguments),
	                n = this._bindings.length,
	                bindings;

	            if (this.memorize) {
	                this._prevParams = paramsArr;
	            }

	            if (! n) {
	                //should come after memorize
	                return;
	            }

	            bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
	            this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

	            //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
	            //reverse loop since listeners with higher priority will be added at the end of the list
	            do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
	        },

	        /**
	         * Forget memorized arguments.
	         * @see Signal.memorize
	         */
	        forget : function(){
	            this._prevParams = null;
	        },

	        /**
	         * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
	         * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
	         */
	        dispose : function () {
	            this.removeAll();
	            delete this._bindings;
	            delete this._prevParams;
	        },

	        /**
	         * @return {string} String representation of the object.
	         */
	        toString : function () {
	            return '[Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';
	        }

	    };


	    // Namespace -----------------------------------------------------
	    //================================================================

	    /**
	     * Signals namespace
	     * @namespace
	     * @name signals
	     */
	    var signals = Signal;

	    /**
	     * Custom event broadcaster
	     * @see Signal
	     */
	    // alias for backwards compatibility (see #gh-44)
	    signals.Signal = Signal;



	    //exports to multiple environments
	    if(true){ //AMD
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return signals; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module.exports){ //node
	        module.exports = signals;
	    } else { //browser
	        //use string because of Google closure compiler ADVANCED_MODE
	        /*jslint sub:true */
	        global['signals'] = signals;
	    }

	}(this));


/***/ },
/* 3 */
/***/ function(module, exports) {

	var SceneTraveler;

	SceneTraveler = (function() {
	  function SceneTraveler() {}

	  SceneTraveler.currentScene = null;

	  SceneTraveler.nextScene = null;

	  SceneTraveler.isInit = false;

	  SceneTraveler.isModule = true;

	  SceneTraveler.init = function() {
	    SceneTraveler.isInit = true;
	  };

	  SceneTraveler.to = function(scene) {
	    SceneTraveler.nextScene = scene;
	    if (SceneTraveler.currentScene) {
	      SceneTraveler.currentScene.transitionOut();
	    } else {
	      SceneTraveler.onTransitionOutComplete();
	    }
	  };

	  SceneTraveler.update = function(dt) {
	    if (SceneTraveler.currentScene) {
	      SceneTraveler.currentScene.update(dt);
	    }
	  };

	  SceneTraveler.onTransitionOutComplete = function() {
	    SceneTraveler.currentScene = SceneTraveler.nextScene;
	    console.log('travel to :', SceneTraveler.currentScene.name);
	    SceneTraveler.currentScene.transitionIn();
	  };

	  SceneTraveler.resize = function() {
	    if (SceneTraveler.currentScene) {
	      SceneTraveler.currentScene.resize();
	    }
	    if (SceneTraveler.nextScene) {
	      SceneTraveler.nextScene.resize();
	    }
	  };

	  return SceneTraveler;

	})();

	module.exports = SceneTraveler;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var LoadingScene, Scene,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Scene = __webpack_require__(5);

	LoadingScene = (function(superClass) {
	  extend(LoadingScene, superClass);

	  function LoadingScene() {
	    LoadingScene.__super__.constructor.call(this, "Loading");
	    return;
	  }

	  return LoadingScene;

	})(Scene);

	module.exports = LoadingScene;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Scene, SceneTraveler,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	SceneTraveler = __webpack_require__(3);

	Scene = (function() {
	  function Scene(name) {
	    this.name = name;
	    this.onTransitionOutComplete = bind(this.onTransitionOutComplete, this);
	    this.onTransitionInComplete = bind(this.onTransitionInComplete, this);
	    this.transitionOut = bind(this.transitionOut, this);
	    this.transitionIn = bind(this.transitionIn, this);
	    this.states = [];
	    this.startTime = 0;
	    this.lastTimeCheck = -1;
	    return;
	  }

	  Scene.prototype.update = function(dt) {};

	  Scene.prototype.transitionIn = function() {
	    this.onTransitionInComplete();
	  };

	  Scene.prototype.transitionOut = function() {
	    document.querySelector('#mask').className = 'transitionIn';
	    setTimeout((function(_this) {
	      return function() {
	        setTimeout(function() {
	          return document.querySelector('#mask').className = 'transitionOut';
	        }, 64);
	        return _this.onTransitionOutComplete();
	      };
	    })(this), 510);
	  };

	  Scene.prototype.onTransitionInComplete = function() {};

	  Scene.prototype.onTransitionOutComplete = function() {
	    this.dispose();
	    SceneTraveler.onTransitionOutComplete();
	  };

	  Scene.prototype.resize = function() {};

	  Scene.prototype.dispose = function() {};

	  return Scene;

	})();

	module.exports = Scene;


/***/ }
/******/ ]);