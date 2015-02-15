(function() {
  "use strict";

  /**
   * ErrorTracking by André Tarnowsky - https://github.com/lotterfriends/ErrorTracking
   *
   * MIT licensed
   *
   * Copyright (C) 2015
   *
   * @description Wraps JavaScript Errors with an try/catch so you got a stacktrace.
   *  Also you can send your errors to Google Analytics.
   * @constructor
   * @param {object} options - configure ErrorTracking
   *  @param {boolean} [options.debug=false] - print to console if the error cause
   *  @param {boolean} [options.throwErrors=true] - throw the error
   *  @param {boolean} [options.pushToAnalytic=false] - push errors to google analytics
   */
  function ErrorTracking(options) {
    options = (typeof options === 'undefined') ? {} : options;
    this.debug = (typeof options.debug !== 'undefined') ? options.debug : false;
    this.throwErrors = (typeof options.throwErrors !== 'undefined') ? options.throwErrors : true;
    // error array
    this.errorStack = [];
    // window functions we want to track
    this.functionsToTrack = ['addEventListener', 'alert', 'atob', 'back', 'blur',
      'btoa', 'captureEvents', 'clearInterval', 'clearTimeout', 'close', 'confirm',
      'createBlobURL', 'dispatchEvent', 'enableExternalCapture', 'escape', 'find',
      'focus', 'forward', 'getSelection', 'moveBy', 'moveTo', 'mozRequestAnimationFrame',
      'requestAnimationFrame', 'webkitRequestAnimationFrame', 'open', 'postMessage',
      'prompt', 'releaseEvents', 'removeEventListener', 'resizeBy', 'resizeTo',
      'revokeBlobURL', 'routeEvent', 'scroll', 'scrollBy', 'scrollByLines',
      'scrollByPages', 'scrollTo', 'setInterval', 'setTimeout', 'sizeToContent',
      'stop', 'unescape'];
    this.wrapFunctions();

    // browsers not ready yet :(
    // this.attacheErrorEvent();

    this.pushToAnalytic = (typeof options.pushToAnalytics !== 'undefined') ? options.pushToAnalytics : false;
  }

  /**
   * create a error obj for internal use
   * @param {string} message - error message
   * @param {string} stack - the error stack trace incleing line breaks
   * @returns {object} error object with properties message and stack
   */
  ErrorTracking.prototype.createError = function(message, stack) {
    return { message: message, stack: stack };
  };  

  /**
   * pushes the error to the error stack and print the error to console
   * if debug is enabled
   * @param {object} error an error object created by ErrorTracking.createError()
   */
  ErrorTracking.prototype.handleError = function(error) {
    this.errorStack.push(error);
    if (this.debug) {
      this.printError(error);
    }
    if (this.pushToAnalytics && typeof _gaq !== 'undefined') {
     _gaq.push(['_trackEvent', 'JavaScript Error', error.message, error.stack, true]);
    }
  };

  /**
   * wraps all functions frim ErrorTracking.functionsToTrack with try/catch
   */
  ErrorTracking.prototype.wrapFunctions = function() {
    var errorTracking = this;

    for (var i in errorTracking.functionsToTrack) {
      errorTracking.wrapFunction(errorTracking.functionsToTrack[i]);
    }

    // error tracking for all - not recommended
    // Object.getOwnPropertyNames(window).forEach(function(name, i) {
    //  if (typeof window[name] === 'function') {
    //      errorTracking.wrapFunction(name);
    //  }
    // });

  };

  /**
   * change the reverence of the given function to the function with the
   * try/catch wrapper
   * @param {string} func function name of the window function to wrap
   */
  ErrorTracking.prototype.wrapFunction = function(func) {
    if (typeof window.EventTarget === 'undefined' || window.EventTarget.prototype[func] === 'undefined') {
      return;
    }
    var errorTracking = this;
    var funcRef = window.EventTarget.prototype[func];
    window.EventTarget.prototype[func] = function (event, callback, bubble) {
      funcRef.call(this, event, errorTracking.errorCatcher(callback), bubble);
    };
  };

  /**
   * wraps one function with a try/catch, create an error object and pass it to ErrorTracking.handleError()
   * @param {function} func the function to to wrap
   * @return {function} wrapper function
   */
  ErrorTracking.prototype.errorCatcher = function(func) {
    var errorTracking = this;
    if (!func._wrapped) {
        func._wrapped = function () {
          try{
            func.apply(this, arguments);
          } catch(e) {
          errorTracking.handleError(errorTracking.createError(e.message, e.stack));
          if (errorTracking.throwErrors) {
            throw e;
          }
        }
      };  
    }
    return func._wrapped;
  };

  /**
   * In near future blink will support an error object with message and stack,
   * at the moment no browser throw a usable error object.
   * This function may used in the future .
   */
  ErrorTracking.prototype.attacheErrorEvent = function() {
    var errorTracking = this;
    window.onerror = function (message, file, line, col, error) {
      errorTracking.handleError(errorTracking.createError(message, error.stack));
    };

    window.addEventListener("error", function (e) {
      errorTracking.handleError(errorTracking.createError(e.error.message, e.error.stack));
    });
  };

  /**
   * print all errors from ErrorTracking.errorStack to console grouped by the message
   */
  ErrorTracking.prototype.printErrors = function() {
    for (var i in this.errorStack) {
      this.printError(this.errorStack[i]);
    }
  };

  /**
   * print one error object, created by ErrorTracking.createError() to console
   */
  ErrorTracking.prototype.printError = function(error) {
    if (typeof console.groupCollapsed !== 'undefined') {
        console.groupCollapsed(error.message);
    } else {
      console.group(error.message);
    }
    console.error(error.stack);
    console.groupEnd(error.message);
  };

  ErrorTracking.prototype.clearErrorStack = function() {
    this.errorStack = [];
  };

  window.ErrorTracking = ErrorTracking;

}).call();
