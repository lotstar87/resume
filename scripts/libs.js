!function(a) {
  if ("object" == typeof exports && "undefined" != typeof module)
      module.exports = a();
  else if ("function" == typeof define && define.amd)
      define([], a);
  else {
      var b;
      b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
      b.Raven = a()
  }
}(function() {
  return function a(b, c, d) {
      function e(g, h) {
          if (!c[g]) {
              if (!b[g]) {
                  var i = "function" == typeof require && require;
                  if (!h && i)
                      return i(g, !0);
                  if (f)
                      return f(g, !0);
                  var j = new Error("Cannot find module '" + g + "'");
                  throw j.code = "MODULE_NOT_FOUND", j
              }
              var k = c[g] = {
                  exports: {}
              };
              b[g][0].call(k.exports, function(a) {
                  var c = b[g][1][a];
                  return e(c ? c : a)
              }, k, k.exports, a, b, c, d)
          }
          return c[g].exports
      }
      for (var f = "function" == typeof require && require, g = 0; d.length > g; g++)
          e(d[g]);
      return e
  }({
      1: [function(a, b, c) {
          function d(a, b, c, d) {
              return JSON.stringify(a, e(b, d), c)
          }
          function e(a, b) {
              var c = [],
                  d = [];
              return null == b && (b = function(a, b) {
                  return c[0] === b ? "[Circular ~]" : "[Circular ~." + d.slice(0, c.indexOf(b)).join(".") + "]"
              }), function(e, f) {
                  if (c.length > 0) {
                      var g = c.indexOf(this);
                      ~g ? c.splice(g + 1) : c.push(this),
                      ~g ? d.splice(g, 1 / 0, e) : d.push(e),
                      ~c.indexOf(f) && (f = b.call(this, e, f))
                  } else
                      c.push(f);
                  return null == a ? f : a.call(this, e, f)
              }
          }
          c = b.exports = d,
          c.getSerialize = e
      }, {}],
      2: [function(a, b, c) {
          "use strict";
          function d(a) {
              this.name = "RavenConfigError",
              this.message = a
          }
          d.prototype = new Error,
          d.prototype.constructor = d,
          b.exports = d
      }, {}],
      3: [function(a, b, c) {
          "use strict";
          var d = function(a, b, c) {
              var d = a[b],
                  e = a;
              if (b in a) {
                  var f = "warn" === b ? "warning" : b;
                  a[b] = function() {
                      var a = [].slice.call(arguments),
                          b = "" + a.join(" "),
                          g = {
                              level: f,
                              logger: "console",
                              extra: {
                                  arguments: a
                              }
                          };
                      c && c(b, g),
                      d && Function.prototype.apply.call(d, e, a)
                  }
              }
          };
          b.exports = {
              wrapMethod: d
          }
      }, {}],
      4: [function(a, b, c) {
          "use strict";
          function d() {
              return +new Date
          }
          function e() {
              this.a = !("object" != typeof JSON || !JSON.stringify),
              this.b = "undefined" != typeof document,
              this.c = null,
              this.d = null,
              this.e = null,
              this.f = null,
              this.g = null,
              this.h = {},
              this.i = {
                  logger: "javascript",
                  ignoreErrors: [],
                  ignoreUrls: [],
                  whitelistUrls: [],
                  includePaths: [],
                  crossOrigin: "anonymous",
                  collectWindowErrors: !0,
                  maxMessageLength: 0,
                  stackTraceLimit: 50
              },
              this.j = 0,
              this.k = !1,
              this.l = Error.stackTraceLimit,
              this.m = window.console || {},
              this.n = {},
              this.o = [],
              this.p = d(),
              this.q = [],
              this.r = [],
              this.s = 20,
              this.t = null,
              this.u = window.location,
              this.v = this.u && this.u.href;
              for (var a in this.m)
                  this.n[a] = this.m[a]
          }
          var f = a(7),
              g = a(2),
              h = a(6),
              i = a(1),
              j = h.isFunction,
              k = h.isUndefined,
              l = h.isError,
              m = h.isEmptyObject,
              n = h.hasKey,
              o = h.joinRegExp,
              p = h.each,
              q = h.objectMerge,
              r = h.truncate,
              s = h.urlencode,
              t = h.uuid4,
              u = h.htmlTreeAsString,
              v = h.parseUrl,
              w = h.isString,
              x = a(3).wrapMethod,
              y = "source protocol user pass host port path".split(" "),
              z = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;
          e.prototype = {
              VERSION: "3.3.0",
              debug: !1,
              TraceKit: f,
              config: function(a, b) {
                  var c = this;
                  if (this.e)
                      return this.w("error", "Error: Raven has already been configured"), this;
                  if (!a)
                      return this;
                  b && p(b, function(a, b) {
                      "tags" === a || "extra" === a ? c.h[a] = b : c.i[a] = b
                  });
                  var d = this.x(a),
                      e = d.path.lastIndexOf("/"),
                      g = d.path.substr(1, e);
                  return this.y = a, this.i.ignoreErrors.push(/^Script error\.?$/), this.i.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/), this.i.ignoreErrors = o(this.i.ignoreErrors), this.i.ignoreUrls = this.i.ignoreUrls.length ? o(this.i.ignoreUrls) : !1, this.i.whitelistUrls = this.i.whitelistUrls.length ? o(this.i.whitelistUrls) : !1, this.i.includePaths = o(this.i.includePaths), this.f = d.user, this.z = d.pass && d.pass.substr(1), this.g = d.path.substr(e + 1), this.e = this.A(d), this.B = this.e + "/" + g + "api/" + this.g + "/store/", f.collectWindowErrors = !!this.i.collectWindowErrors, this
              },
              install: function() {
                  var a = this;
                  return this.isSetup() && !this.k && (f.report.subscribe(function() {
                      a.C.apply(a, arguments)
                  }), this.D(), this.E(), this.k = !0), Error.stackTraceLimit = this.i.stackTraceLimit, this
              },
              context: function(a, b, c) {
                  return j(a) && (c = b || [], b = a, a = void 0), this.wrap(a, b).apply(this, c)
              },
              wrap: function(a, b, c) {
                  function d() {
                      var d = [],
                          f = arguments.length,
                          g = !a || a && a.deep !== !1;
                      for (c && j(c) && c.apply(this, arguments); f--;)
                          d[f] = g ? e.wrap(a, arguments[f]) : arguments[f];
                      try {
                          return b.apply(this, d)
                      } catch (h) {
                          throw e.F(), e.captureException(h, a), h
                      }
                  }
                  var e = this;
                  if (k(b) && !j(a))
                      return a;
                  if (j(a) && (b = a, a = void 0), !j(b))
                      return b;
                  try {
                      if (b.G)
                          return b
                  } catch (f) {
                      return b
                  }
                  if (b.H)
                      return b.H;
                  for (var g in b)
                      n(b, g) && (d[g] = b[g]);
                  return d.prototype = b.prototype, b.H = d, d.G = !0, d.I = b, d
              },
              uninstall: function() {
                  return f.report.uninstall(), this.J(), Error.stackTraceLimit = this.l, this.k = !1, this
              },
              captureException: function(a, b) {
                  if (!l(a))
                      return this.captureMessage(a, b);
                  this.c = a;
                  try {
                      var c = f.computeStackTrace(a);
                      this.K(c, b)
                  } catch (d) {
                      if (a !== d)
                          throw d
                  }
                  return this
              },
              captureMessage: function(a, b) {
                  return this.i.ignoreErrors.test && this.i.ignoreErrors.test(a) ? void 0 : (this.L(q({
                      message: a + ""
                  }, b)), this)
              },
              captureBreadcrumb: function(a) {
                  var b = q({
                      timestamp: d() / 1e3
                  }, a);
                  this.r.push(b),
                  this.r.length > this.s && this.r.shift()
              },
              addPlugin: function(a) {
                  var b = Array.prototype.slice.call(arguments, 1);
                  return this.o.push([a, b]), this.k && this.E(), this
              },
              setUserContext: function(a) {
                  return this.h.user = a, this
              },
              setExtraContext: function(a) {
                  return this.M("extra", a), this
              },
              setTagsContext: function(a) {
                  return this.M("tags", a), this
              },
              clearContext: function() {
                  return this.h = {}, this
              },
              getContext: function() {
                  return JSON.parse(i(this.h))
              },
              setEnvironment: function(a) {
                  return this.i.environment = a, this
              },
              setRelease: function(a) {
                  return this.i.release = a, this
              },
              setDataCallback: function(a) {
                  var b = this.i.dataCallback;
                  return this.i.dataCallback = j(a) ? function(c) {
                      return a(c, b)
                  } : a, this
              },
              setShouldSendCallback: function(a) {
                  var b = this.i.shouldSendCallback;
                  return this.i.shouldSendCallback = j(a) ? function(c) {
                      return a(c, b)
                  } : a, this
              },
              setTransport: function(a) {
                  return this.i.transport = a, this
              },
              lastException: function() {
                  return this.c
              },
              lastEventId: function() {
                  return this.d
              },
              isSetup: function() {
                  return this.a ? this.e ? !0 : (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0, this.w("error", "Error: Raven has not been configured.")), !1) : !1
              },
              afterLoad: function() {
                  var a = window.RavenConfig;
                  a && this.config(a.dsn, a.config).install()
              },
              showReportDialog: function(a) {
                  if (window.document) {
                      a = a || {};
                      var b = a.eventId || this.lastEventId();
                      if (!b)
                          throw new g("Missing eventId");
                      var c = a.dsn || this.y;
                      if (!c)
                          throw new g("Missing DSN");
                      var d = encodeURIComponent,
                          e = "";
                      e += "?eventId=" + d(b),
                      e += "&dsn=" + d(c);
                      var f = a.user || this.h.user;
                      f && (f.name && (e += "&name=" + d(f.name)), f.email && (e += "&email=" + d(f.email)));
                      var h = this.A(this.x(c)),
                          i = document.createElement("script");
                      i.async = !0,
                      i.src = h + "/api/embed/error-page/" + e,
                      (document.head || document.body).appendChild(i)
                  }
              },
              F: function() {
                  var a = this;
                  this.j += 1,
                  setTimeout(function() {
                      a.j -= 1
                  })
              },
              N: function(a, b) {
                  var c,
                      d;
                  if (this.b) {
                      b = b || {},
                      a = "raven" + a.substr(0, 1).toUpperCase() + a.substr(1),
                      document.createEvent ? (c = document.createEvent("HTMLEvents"), c.initEvent(a, !0, !0)) : (c = document.createEventObject(), c.eventType = a);
                      for (d in b)
                          n(b, d) && (c[d] = b[d]);
                      if (document.createEvent)
                          document.dispatchEvent(c);
                      else
                          try {
                              document.fireEvent("on" + c.eventType.toLowerCase(), c)
                          } catch (e) {}
                  }
              },
              O: function(a) {
                  var b = this;
                  return function(c) {
                      if (b.P = null, b.t !== c) {
                          b.t = c;
                          var d,
                              e = c.target;
                          try {
                              d = u(e)
                          } catch (f) {
                              d = "<unknown>"
                          }
                          b.captureBreadcrumb({
                              category: "ui." + a,
                              message: d
                          })
                      }
                  }
              },
              Q: function() {
                  var a = this,
                      b = 1e3;
                  return function(c) {
                      var d = c.target,
                          e = d && d.tagName;
                      if (e && ("INPUT" === e || "TEXTAREA" === e)) {
                          var f = a.P;
                          f || a.O("input")(c),
                          clearTimeout(f),
                          a.P = setTimeout(function() {
                              a.P = null
                          }, b)
                      }
                  }
              },
              R: function(a, b) {
                  var c = v(this.u.href),
                      d = v(b),
                      e = v(a);
                  this.v = b,
                  c.protocol === d.protocol && c.host === d.host && (b = d.relative),
                  c.protocol === e.protocol && c.host === e.host && (a = e.relative),
                  this.captureBreadcrumb({
                      category: "navigation",
                      data: {
                          to: b,
                          from: a
                      }
                  })
              },
              D: function() {
                  function a(a, b, c, d) {
                      var f = a[b];
                      a[b] = c(f),
                      d || e.q.push([a, b, f])
                  }
                  function b(a) {
                      return function(b, c) {
                          for (var d = new Array(arguments.length), f = 0; d.length > f; ++f)
                              d[f] = arguments[f];
                          var g = d[0];
                          return j(g) && (d[0] = e.wrap(g)), a.apply ? a.apply(this, d) : a(d[0], d[1])
                      }
                  }
                  function c(b) {
                      var c = window[b] && window[b].prototype;
                      c && c.hasOwnProperty && c.hasOwnProperty("addEventListener") && (a(c, "addEventListener", function(a) {
                          return function(c, d, f, g) {
                              try {
                                  d && d.handleEvent && (d.handleEvent = e.wrap(d.handleEvent))
                              } catch (h) {}
                              var i;
                              return ("EventTarget" === b || "Node" === b) && ("click" === c ? i = e.O(c) : "keypress" === c && (i = e.Q())), a.call(this, c, e.wrap(d, void 0, i), f, g)
                          }
                      }), a(c, "removeEventListener", function(a) {
                          return function(b, c, d, e) {
                              return c = c && (c.H ? c.H : c), a.call(this, b, c, d, e)
                          }
                      }))
                  }
                  function d(b, c) {
                      b in c && j(c[b]) && a(c, b, function(a) {
                          return e.wrap(a)
                      }, !0)
                  }
                  var e = this;
                  a(window, "setTimeout", b),
                  a(window, "setInterval", b),
                  window.requestAnimationFrame && a(window, "requestAnimationFrame", function(a) {
                      return function(b) {
                          return a(e.wrap(b))
                      }
                  }),
                  this.b && (document.addEventListener ? (document.addEventListener("click", e.O("click"), !1), document.addEventListener("keypress", e.Q(), !1)) : (document.attachEvent("onclick", e.O("click")), document.attachEvent("onkeypress", e.Q())));
                  for (var f = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], g = 0; f.length > g; g++)
                      c(f[g]);
                  if ("XMLHttpRequest" in window) {
                      var h = XMLHttpRequest.prototype;
                      a(h, "open", function(a) {
                          return function(b, c) {
                              return w(c) && -1 === c.indexOf(e.f) && (this.S = {
                                  method: b,
                                  url: c,
                                  status_code: null
                              }), a.apply(this, arguments)
                          }
                      }),
                      a(h, "send", function(b) {
                          return function(c) {
                              function f() {
                                  if (g.S && (1 === g.readyState || 4 === g.readyState)) {
                                      try {
                                          g.S.status_code = g.status
                                      } catch (a) {}
                                      e.captureBreadcrumb({
                                          type: "http",
                                          category: "xhr",
                                          data: g.S
                                      })
                                  }
                              }
                              for (var g = this, h = ["onload", "onerror", "onprogress"], i = 0; h.length > i; i++)
                                  d(h[i], g);
                              return "onreadystatechange" in g && j(g.onreadystatechange) ? a(g, "onreadystatechange", function(a) {
                                  return e.wrap(a, void 0, f)
                              }, !0) : g.onreadystatechange = f, b.apply(this, arguments)
                          }
                      })
                  }
                  var i = window.chrome,
                      k = i && i.app && i.app.runtime,
                      l = !k && window.history && history.pushState;
                  if (l) {
                      var m = window.onpopstate;
                      window.onpopstate = function() {
                          var a = e.u.href;
                          return e.R(e.v, a), m ? m.apply(this, arguments) : void 0
                      },
                      a(history, "pushState", function(a) {
                          return function() {
                              var b = arguments.length > 2 ? arguments[2] : void 0;
                              return b && e.R(e.v, b + ""), a.apply(this, arguments)
                          }
                      })
                  }
                  var n = function(a, b) {
                      e.captureBreadcrumb({
                          message: a,
                          level: b.level,
                          category: "console"
                      })
                  };
                  "console" in window && console.log && p(["debug", "info", "warn", "error", "log"], function(a, b) {
                      x(console, b, n)
                  });
                  var o = window.jQuery || window.$;
                  o && o.fn && o.fn.ready && a(o.fn, "ready", function(a) {
                      return function(b) {
                          return a.call(this, e.wrap(b))
                      }
                  })
              },
              J: function() {
                  for (var a; this.q.length;) {
                      a = this.q.shift();
                      var b = a[0],
                          c = a[1],
                          d = a[2];
                      b[c] = d
                  }
              },
              E: function() {
                  var a = this;
                  p(this.o, function(b, c) {
                      var d = c[0],
                          e = c[1];
                      d.apply(a, [a].concat(e))
                  })
              },
              x: function(a) {
                  var b = z.exec(a),
                      c = {},
                      d = 7;
                  try {
                      for (; d--;)
                          c[y[d]] = b[d] || ""
                  } catch (e) {
                      throw new g("Invalid DSN: " + a)
                  }
                  if (c.pass && !this.i.allowSecretKey)
                      throw new g("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
                  return c
              },
              A: function(a) {
                  var b = "//" + a.host + (a.port ? ":" + a.port : "");
                  return a.protocol && (b = a.protocol + ":" + b), b
              },
              C: function() {
                  this.j || this.K.apply(this, arguments)
              },
              K: function(a, b) {
                  var c = this,
                      d = [];
                  a.stack && a.stack.length && p(a.stack, function(a, b) {
                      var e = c.T(b);
                      e && d.push(e)
                  }),
                  this.N("handle", {
                      stackInfo: a,
                      options: b
                  }),
                  this.U(a.name, a.message, a.url, a.lineno, d.slice(0, this.i.stackTraceLimit), b)
              },
              T: function(a) {
                  if (a.url) {
                      var b = {
                          filename: a.url,
                          lineno: a.line,
                          colno: a.column,
                          "function": a.func || "?"
                      };
                      return b.in_app = !(this.i.includePaths.test && !this.i.includePaths.test(b.filename) || /(Raven|TraceKit)\./.test(b["function"]) || /raven\.(min\.)?js$/.test(b.filename)), b
                  }
              },
              U: function(a, b, c, d, e, f) {
                  var g;
                  if ((!this.i.ignoreErrors.test || !this.i.ignoreErrors.test(b)) && (b += "", e && e.length ? (c = e[0].filename || c, e.reverse(), g = {
                      frames: e
                  }) : c && (g = {
                      frames: [{
                          filename: c,
                          lineno: d,
                          in_app: !0
                      }]
                  }), (!this.i.ignoreUrls.test || !this.i.ignoreUrls.test(c)) && (!this.i.whitelistUrls.test || this.i.whitelistUrls.test(c)))) {
                      var h = q({
                          exception: {
                              values: [{
                                  type: a,
                                  value: b,
                                  stacktrace: g
                              }]
                          },
                          culprit: c
                      }, f);
                      this.L(h)
                  }
              },
              V: function(a) {
                  var b = this.i.maxMessageLength;
                  if (a.message && (a.message = r(a.message, b)), a.exception) {
                      var c = a.exception.values[0];
                      c.value = r(c.value, b)
                  }
                  return a
              },
              W: function() {
                  if (this.b && document.location && document.location.href) {
                      var a = {
                          headers: {
                              "User-Agent": navigator.userAgent
                          }
                      };
                      return a.url = document.location.href, document.referrer && (a.headers.Referer = document.referrer), a
                  }
              },
              L: function(a) {
                  var b = this,
                      c = this.i,
                      e = {
                          project: this.g,
                          logger: c.logger,
                          platform: "javascript"
                      },
                      f = this.W();
                  if (f && (e.request = f), a = q(e, a), a.tags = q(q({}, this.h.tags), a.tags), a.extra = q(q({}, this.h.extra), a.extra), a.extra["session:duration"] = d() - this.p, this.r && this.r.length > 0 && (a.breadcrumbs = {
                      values: [].slice.call(this.r, 0)
                  }), m(a.tags) && delete a.tags, this.h.user && (a.user = this.h.user), c.environment && (a.environment = c.environment), c.release && (a.release = c.release), c.serverName && (a.server_name = c.serverName), j(c.dataCallback) && (a = c.dataCallback(a) || a), a && !m(a) && (!j(c.shouldSendCallback) || c.shouldSendCallback(a)) && (this.d = a.event_id || (a.event_id = t()), a = this.V(a), this.w("debug", "Raven about to send:", a), this.isSetup())) {
                      var g = {
                          sentry_version: "7",
                          sentry_client: "raven-js/" + this.VERSION,
                          sentry_key: this.f
                      };
                      this.z && (g.sentry_secret = this.z);
                      var h = a.exception && a.exception.values[0];
                      this.captureBreadcrumb({
                          category: "sentry",
                          message: h ? (h.type ? h.type + ": " : "") + h.message : a.message,
                          event_id: a.event_id,
                          level: a.level || "error"
                      });
                      var i = this.B;
                      (c.transport || this.X).call(this, {
                          url: i,
                          auth: g,
                          data: a,
                          options: c,
                          onSuccess: function() {
                              b.N("success", {
                                  data: a,
                                  src: i
                              })
                          },
                          onError: function() {
                              b.N("failure", {
                                  data: a,
                                  src: i
                              })
                          }
                      })
                  }
              },
              X: function(a) {
                  function b() {
                      200 === c.status ? a.onSuccess && a.onSuccess() : a.onError && a.onError()
                  }
                  var c = new XMLHttpRequest,
                      d = "withCredentials" in c || "undefined" != typeof XDomainRequest;
                  if (d) {
                      var e = a.url;
                      "withCredentials" in c ? c.onreadystatechange = function() {
                          4 === c.readyState && b()
                      } : (c = new XDomainRequest, e = e.replace(/^https?:/, ""), c.onload = b),
                      c.open("POST", e + "?" + s(a.auth)),
                      c.send(i(a.data))
                  }
              },
              w: function(a) {
                  this.n[a] && this.debug && Function.prototype.apply.call(this.n[a], this.m, [].slice.call(arguments, 1))
              },
              M: function(a, b) {
                  k(b) ? delete this.h[a] : this.h[a] = q(this.h[a] || {}, b)
              }
          },
          e.prototype.setUser = e.prototype.setUserContext,
          e.prototype.setReleaseContext = e.prototype.setRelease,
          b.exports = e
      }, {
          1: 1,
          2: 2,
          3: 3,
          6: 6,
          7: 7
      }],
      5: [function(a, b, c) {
          "use strict";
          var d = a(4),
              e = window.Raven,
              f = new d;
          f.noConflict = function() {
              return window.Raven = e, f
          },
          f.afterLoad(),
          b.exports = f
      }, {
          4: 4
      }],
      6: [function(a, b, c) {
          "use strict";
          function d(a) {
              return void 0 === a
          }
          function e(a) {
              return "function" == typeof a
          }
          function f(a) {
              return "[object String]" === t.toString.call(a)
          }
          function g(a) {
              return "object" == typeof a && null !== a
          }
          function h(a) {
              for (var b in a)
                  return !1;
              return !0
          }
          function i(a) {
              var b = t.toString.call(a);
              return g(a) && "[object Error]" === b || "[object Exception]" === b || a instanceof Error
          }
          function j(a, b) {
              var c,
                  e;
              if (d(a.length))
                  for (c in a)
                      m(a, c) && b.call(null, c, a[c]);
              else if (e = a.length)
                  for (c = 0; e > c; c++)
                      b.call(null, c, a[c])
          }
          function k(a, b) {
              return b ? (j(b, function(b, c) {
                  a[b] = c
              }), a) : a
          }
          function l(a, b) {
              return !b || b >= a.length ? a : a.substr(0, b) + "…"
          }
          function m(a, b) {
              return t.hasOwnProperty.call(a, b)
          }
          function n(a) {
              for (var b, c = [], d = 0, e = a.length; e > d; d++)
                  b = a[d],
                  f(b) ? c.push(b.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : b && b.source && c.push(b.source);
              return new RegExp(c.join("|"), "i")
          }
          function o(a) {
              var b = [];
              return j(a, function(a, c) {
                  b.push(encodeURIComponent(a) + "=" + encodeURIComponent(c))
              }), b.join("&")
          }
          function p(a) {
              var b = a.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
              if (!b)
                  return {};
              var c = b[6] || "",
                  d = b[8] || "";
              return {
                  protocol: b[2],
                  host: b[4],
                  path: b[5],
                  relative: b[5] + c + d
              }
          }
          function q() {
              var a = window.crypto || window.msCrypto;
              if (!d(a) && a.getRandomValues) {
                  var b = new Uint16Array(8);
                  a.getRandomValues(b),
                  b[3] = 4095 & b[3] | 16384,
                  b[4] = 16383 & b[4] | 32768;
                  var c = function(a) {
                      for (var b = a.toString(16); 4 > b.length;)
                          b = "0" + b;
                      return b
                  };
                  return c(b[0]) + c(b[1]) + c(b[2]) + c(b[3]) + c(b[4]) + c(b[5]) + c(b[6]) + c(b[7])
              }
              return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                  var b = 16 * Math.random() | 0,
                      c = "x" === a ? b : 3 & b | 8;
                  return c.toString(16)
              })
          }
          function r(a) {
              for (var b, c = 5, d = 80, e = [], f = 0, g = 0, h = " > ", i = h.length; a && f++ < c && (b = s(a), !("html" === b || f > 1 && g + e.length * i + b.length >= d));)
                  e.push(b),
                  g += b.length,
                  a = a.parentNode;
              return e.reverse().join(h)
          }
          function s(a) {
              var b,
                  c,
                  d,
                  e,
                  g,
                  h = [];
              if (!a || !a.tagName)
                  return "";
              if (h.push(a.tagName.toLowerCase()), a.id && h.push("#" + a.id), b = a.className, b && f(b))
                  for (c = b.split(" "), g = 0; c.length > g; g++)
                      h.push("." + c[g]);
              var i = ["type", "name", "title", "alt"];
              for (g = 0; i.length > g; g++)
                  d = i[g],
                  e = a.getAttribute(d),
                  e && h.push("[" + d + '="' + e + '"]');
              return h.join("")
          }
          var t = Object.prototype;
          b.exports = {
              isUndefined: d,
              isFunction: e,
              isString: f,
              isObject: g,
              isEmptyObject: h,
              isError: i,
              each: j,
              objectMerge: k,
              truncate: l,
              hasKey: m,
              joinRegExp: n,
              urlencode: o,
              uuid4: q,
              htmlTreeAsString: r,
              htmlElementAsString: s,
              parseUrl: p
          }
      }, {}],
      7: [function(a, b, c) {
          "use strict";
          function d() {
              return "undefined" == typeof document ? "" : document.location.href
          }
          var e = a(6),
              f = e.hasKey,
              g = e.isString,
              h = e.isUndefined,
              i = {
                  collectWindowErrors: !0,
                  debug: !1
              },
              j = [].slice,
              k = "?",
              l = /^(?:Uncaught (?:exception: )?)?((?:Eval|Internal|Range|Reference|Syntax|Type|URI)Error): ?(.*)$/;
          i.report = function() {
              function a(a) {
                  m(),
                  s.push(a)
              }
              function b(a) {
                  for (var b = s.length - 1; b >= 0; --b)
                      s[b] === a && s.splice(b, 1)
              }
              function c() {
                  n(),
                  s = []
              }
              function e(a, b) {
                  var c = null;
                  if (!b || i.collectWindowErrors) {
                      for (var d in s)
                          if (f(s, d))
                              try {
                                  s[d].apply(null, [a].concat(j.call(arguments, 2)))
                              } catch (e) {
                                  c = e
                              }
                      if (c)
                          throw c
                  }
              }
              function h(a, b, c, f, h) {
                  var j = null;
                  if (v)
                      i.computeStackTrace.augmentStackTraceWithInitialElement(v, b, c, a),
                      o();
                  else if (h)
                      j = i.computeStackTrace(h),
                      e(j, !0);
                  else {
                      var m,
                          n = {
                              url: b,
                              line: c,
                              column: f
                          },
                          p = void 0,
                          r = a;
                      if (g(a)) {
                          var m = a.match(l);
                          m && (p = m[1], r = m[2])
                      }
                      n.func = k,
                      j = {
                          name: p,
                          message: r,
                          url: d(),
                          stack: [n]
                      },
                      e(j, !0)
                  }
                  return q ? q.apply(this, arguments) : !1
              }
              function m() {
                  r || (q = window.onerror, window.onerror = h, r = !0)
              }
              function n() {
                  r && (window.onerror = q, r = !1, q = void 0)
              }
              function o() {
                  var a = v,
                      b = t;
                  t = null,
                  v = null,
                  u = null,
                  e.apply(null, [a, !1].concat(b))
              }
              function p(a, b) {
                  var c = j.call(arguments, 1);
                  if (v) {
                      if (u === a)
                          return;
                      o()
                  }
                  var d = i.computeStackTrace(a);
                  if (v = d, u = a, t = c, window.setTimeout(function() {
                      u === a && o()
                  }, d.incomplete ? 2e3 : 0), b !== !1)
                      throw a
              }
              var q,
                  r,
                  s = [],
                  t = null,
                  u = null,
                  v = null;
              return p.subscribe = a, p.unsubscribe = b, p.uninstall = c, p
          }(),
          i.computeStackTrace = function() {
              function a(a) {
                  if (!h(a.stack) && a.stack) {
                      for (var b, c, e = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|<anonymous>).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, f = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|\[native).*?)(?::(\d+))?(?::(\d+))?\s*$/i, g = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, i = a.stack.split("\n"), j = [], l = (/^(.*) is undefined$/.exec(a.message), 0), m = i.length; m > l; ++l) {
                          if (b = e.exec(i[l])) {
                              var n = b[2] && -1 !== b[2].indexOf("native");
                              c = {
                                  url: n ? null : b[2],
                                  func: b[1] || k,
                                  args: n ? [b[2]] : [],
                                  line: b[3] ? +b[3] : null,
                                  column: b[4] ? +b[4] : null
                              }
                          } else if (b = g.exec(i[l]))
                              c = {
                                  url: b[2],
                                  func: b[1] || k,
                                  args: [],
                                  line: +b[3],
                                  column: b[4] ? +b[4] : null
                              };
                          else {
                              if (!(b = f.exec(i[l])))
                                  continue;
                              c = {
                                  url: b[3],
                                  func: b[1] || k,
                                  args: b[2] ? b[2].split(",") : [],
                                  line: b[4] ? +b[4] : null,
                                  column: b[5] ? +b[5] : null
                              }
                          }
                          !c.func && c.line && (c.func = k),
                          j.push(c)
                      }
                      return j.length ? (j[0].column || h(a.columnNumber) || (j[0].column = a.columnNumber + 1), {
                          name: a.name,
                          message: a.message,
                          url: d(),
                          stack: j
                      }) : null
                  }
              }
              function b(a) {
                  var b = a.stacktrace;
                  if (!h(a.stacktrace) && a.stacktrace) {
                      for (var c, e = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, f = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i, g = b.split("\n"), i = [], j = 0; g.length > j; j += 2) {
                          var l = null;
                          (c = e.exec(g[j])) ? l = {
                              url: c[2],
                              line: +c[1],
                              column: null,
                              func: c[3],
                              args: []
                          } : (c = f.exec(g[j])) && (l = {
                              url: c[6],
                              line: +c[1],
                              column: +c[2],
                              func: c[3] || c[4],
                              args: c[5] ? c[5].split(",") : []
                          }),
                          l && (!l.func && l.line && (l.func = k), i.push(l))
                      }
                      return i.length ? {
                          name: a.name,
                          message: a.message,
                          url: d(),
                          stack: i
                      } : null
                  }
              }
              function c(a) {
                  var b = a.message.split("\n");
                  if (4 > b.length)
                      return null;
                  for (var c, e = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i, f = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i, g = /^\s*Line (\d+) of function script\s*$/i, h = [], i = (document.getElementsByTagName("script"), 2); b.length > i; i += 2) {
                      var j = null;
                      if (c = e.exec(b[i]))
                          j = {
                              url: c[2],
                              func: c[3],
                              args: [],
                              line: +c[1],
                              column: null
                          };
                      else if (c = f.exec(b[i])) {
                          j = {
                              url: c[3],
                              func: c[4],
                              args: [],
                              line: +c[1],
                              column: null
                          }
                      } else if (c = g.exec(b[i])) {
                          var l = window.location.href.replace(/#.*$/, "");
                          j = {
                              url: l,
                              func: "",
                              args: [],
                              line: c[1],
                              column: null
                          }
                      }
                      j && (j.func || (j.func = k), h.push(j))
                  }
                  return h.length ? {
                      name: a.name,
                      message: b[0],
                      url: d(),
                      stack: h
                  } : null
              }
              function e(a, b, c, d) {
                  var e = {
                      url: b,
                      line: c
                  };
                  if (e.url && e.line) {
                      if (a.incomplete = !1, e.func || (e.func = k), a.stack.length > 0 && a.stack[0].url === e.url) {
                          if (a.stack[0].line === e.line)
                              return !1;
                          if (!a.stack[0].line && a.stack[0].func === e.func)
                              return a.stack[0].line = e.line, !1
                      }
                      return a.stack.unshift(e), a.partial = !0, !0
                  }
                  return a.incomplete = !0, !1
              }
              function f(a, b) {
                  for (var c, h, j = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, l = [], m = {}, n = !1, o = f.caller; o && !n; o = o.caller)
                      if (o !== g && o !== i.report) {
                          if (h = {
                              url: null,
                              func: k,
                              line: null,
                              column: null
                          }, o.name ? h.func = o.name : (c = j.exec(o.toString())) && (h.func = c[1]), "undefined" == typeof h.func)
                              try {
                                  h.func = c.input.substring(0, c.input.indexOf("{"))
                              } catch (p) {}
                          m["" + o] ? n = !0 : m["" + o] = !0,
                          l.push(h)
                      }
                  b && l.splice(0, b);
                  var q = {
                      name: a.name,
                      message: a.message,
                      url: d(),
                      stack: l
                  };
                  return e(q, a.sourceURL || a.fileName, a.line || a.lineNumber, a.message || a.description), q
              }
              function g(e, g) {
                  var h = null;
                  g = null == g ? 0 : +g;
                  try {
                      if (h = b(e))
                          return h
                  } catch (j) {
                      if (i.debug)
                          throw j
                  }
                  try {
                      if (h = a(e))
                          return h
                  } catch (j) {
                      if (i.debug)
                          throw j
                  }
                  try {
                      if (h = c(e))
                          return h
                  } catch (j) {
                      if (i.debug)
                          throw j
                  }
                  try {
                      if (h = f(e, g + 1))
                          return h
                  } catch (j) {
                      if (i.debug)
                          throw j
                  }
                  return {
                      name: e.name,
                      message: e.message,
                      url: d()
                  }
              }
              return g.augmentStackTraceWithInitialElement = e, g.computeStackTraceFromStackProp = a, g
          }(),
          b.exports = i
      }, {
          6: 6
      }]
  }, {}, [5])(5)
});

!function(a, b) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
      if (!a.document)
          throw new Error("jQuery requires a window with a document");
      return b(a)
  } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
  var c = [],
      d = c.slice,
      e = c.concat,
      f = c.push,
      g = c.indexOf,
      h = {},
      i = h.toString,
      j = h.hasOwnProperty,
      k = {},
      l = "1.11.3",
      m = function(a, b) {
          return new m.fn.init(a, b)
      },
      n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      o = /^-ms-/,
      p = /-([\da-z])/gi,
      q = function(a, b) {
          return b.toUpperCase()
      };
  m.fn = m.prototype = {
      jquery: l,
      constructor: m,
      selector: "",
      length: 0,
      toArray: function() {
          return d.call(this)
      },
      get: function(a) {
          return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
      },
      pushStack: function(a) {
          var b = m.merge(this.constructor(), a);
          return b.prevObject = this, b.context = this.context, b
      },
      each: function(a, b) {
          return m.each(this, a, b)
      },
      map: function(a) {
          return this.pushStack(m.map(this, function(b, c) {
              return a.call(b, c, b)
          }))
      },
      slice: function() {
          return this.pushStack(d.apply(this, arguments))
      },
      first: function() {
          return this.eq(0)
      },
      last: function() {
          return this.eq(-1)
      },
      eq: function(a) {
          var b = this.length,
              c = +a + (0 > a ? b : 0);
          return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
      },
      end: function() {
          return this.prevObject || this.constructor(null)
      },
      push: f,
      sort: c.sort,
      splice: c.splice
  },
  m.extend = m.fn.extend = function() {
      var a,
          b,
          c,
          d,
          e,
          f,
          g = arguments[0] || {},
          h = 1,
          i = arguments.length,
          j = !1;
      for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || m.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
          if (null != (e = arguments[h]))
              for (d in e)
                  a = g[d],
                  c = e[d],
                  g !== c && (j && c && (m.isPlainObject(c) || (b = m.isArray(c))) ? (b ? (b = !1, f = a && m.isArray(a) ? a : []) : f = a && m.isPlainObject(a) ? a : {}, g[d] = m.extend(j, f, c)) : void 0 !== c && (g[d] = c));
      return g
  },
  m.extend({
      expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function(a) {
          throw new Error(a)
      },
      noop: function() {},
      isFunction: function(a) {
          return "function" === m.type(a)
      },
      isArray: Array.isArray || function(a) {
          return "array" === m.type(a)
      },
      isWindow: function(a) {
          return null != a && a == a.window
      },
      isNumeric: function(a) {
          return !m.isArray(a) && a - parseFloat(a) + 1 >= 0
      },
      isEmptyObject: function(a) {
          var b;
          for (b in a)
              return !1;
          return !0
      },
      isPlainObject: function(a) {
          var b;
          if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a))
              return !1;
          try {
              if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf"))
                  return !1
          } catch (c) {
              return !1
          }
          if (k.ownLast)
              for (b in a)
                  return j.call(a, b);
          for (b in a)
              ;
          return void 0 === b || j.call(a, b)
      },
      type: function(a) {
          return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a
      },
      globalEval: function(b) {
          b && m.trim(b) && (a.execScript || function(b) {
              a.eval.call(a, b)
          })(b)
      },
      camelCase: function(a) {
          return a.replace(o, "ms-").replace(p, q)
      },
      nodeName: function(a, b) {
          return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
      },
      each: function(a, b, c) {
          var d,
              e = 0,
              f = a.length,
              g = r(a);
          if (c) {
              if (g) {
                  for (; f > e; e++)
                      if (d = b.apply(a[e], c), d === !1)
                          break
              } else
                  for (e in a)
                      if (d = b.apply(a[e], c), d === !1)
                          break
          } else if (g) {
              for (; f > e; e++)
                  if (d = b.call(a[e], e, a[e]), d === !1)
                      break
          } else
              for (e in a)
                  if (d = b.call(a[e], e, a[e]), d === !1)
                      break;
          return a
      },
      trim: function(a) {
          return null == a ? "" : (a + "").replace(n, "")
      },
      makeArray: function(a, b) {
          var c = b || [];
          return null != a && (r(Object(a)) ? m.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
      },
      inArray: function(a, b, c) {
          var d;
          if (b) {
              if (g)
                  return g.call(b, a, c);
              for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                  if (c in b && b[c] === a)
                      return c
          }
          return -1
      },
      merge: function(a, b) {
          var c = +b.length,
              d = 0,
              e = a.length;
          while (c > d)
              a[e++] = b[d++];
          if (c !== c)
              while (void 0 !== b[d])
                  a[e++] = b[d++];
          return a.length = e, a
      },
      grep: function(a, b, c) {
          for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)
              d = !b(a[f], f),
              d !== h && e.push(a[f]);
          return e
      },
      map: function(a, b, c) {
          var d,
              f = 0,
              g = a.length,
              h = r(a),
              i = [];
          if (h)
              for (; g > f; f++)
                  d = b(a[f], f, c),
                  null != d && i.push(d);
          else
              for (f in a)
                  d = b(a[f], f, c),
                  null != d && i.push(d);
          return e.apply([], i)
      },
      guid: 1,
      proxy: function(a, b) {
          var c,
              e,
              f;
          return "string" == typeof b && (f = a[b], b = a, a = f), m.isFunction(a) ? (c = d.call(arguments, 2), e = function() {
              return a.apply(b || this, c.concat(d.call(arguments)))
          }, e.guid = a.guid = a.guid || m.guid++, e) : void 0
      },
      now: function() {
          return +new Date
      },
      support: k
  }),
  m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
      h["[object " + b + "]"] = b.toLowerCase()
  });
  function r(a) {
      var b = "length" in a && a.length,
          c = m.type(a);
      return "function" === c || m.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
  }
  var s = function(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s,
          t,
          u = "sizzle" + 1 * new Date,
          v = a.document,
          w = 0,
          x = 0,
          y = ha(),
          z = ha(),
          A = ha(),
          B = function(a, b) {
              return a === b && (l = !0), 0
          },
          C = 1 << 31,
          D = {}.hasOwnProperty,
          E = [],
          F = E.pop,
          G = E.push,
          H = E.push,
          I = E.slice,
          J = function(a, b) {
              for (var c = 0, d = a.length; d > c; c++)
                  if (a[c] === b)
                      return c;
              return -1
          },
          K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
          L = "[\\x20\\t\\r\\n\\f]",
          M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
          N = M.replace("w", "w#"),
          O = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + N + "))|)" + L + "*\\]",
          P = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + O + ")*)|.*)\\)|)",
          Q = new RegExp(L + "+", "g"),
          R = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
          S = new RegExp("^" + L + "*," + L + "*"),
          T = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
          U = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
          V = new RegExp(P),
          W = new RegExp("^" + N + "$"),
          X = {
              ID: new RegExp("^#(" + M + ")"),
              CLASS: new RegExp("^\\.(" + M + ")"),
              TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
              ATTR: new RegExp("^" + O),
              PSEUDO: new RegExp("^" + P),
              CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
              bool: new RegExp("^(?:" + K + ")$", "i"),
              needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
          },
          Y = /^(?:input|select|textarea|button)$/i,
          Z = /^h\d$/i,
          $ = /^[^{]+\{\s*\[native \w/,
          _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
          aa = /[+~]/,
          ba = /'|\\/g,
          ca = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
          da = function(a, b, c) {
              var d = "0x" + b - 65536;
              return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
          },
          ea = function() {
              m()
          };
      try {
          H.apply(E = I.call(v.childNodes), v.childNodes),
          E[v.childNodes.length].nodeType
      } catch (fa) {
          H = {
              apply: E.length ? function(a, b) {
                  G.apply(a, I.call(b))
              } : function(a, b) {
                  var c = a.length,
                      d = 0;
                  while (a[c++] = b[d++])
                      ;
                  a.length = c - 1
              }
          }
      }
      function ga(a, b, d, e) {
          var f,
              h,
              j,
              k,
              l,
              o,
              r,
              s,
              w,
              x;
          if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], k = b.nodeType, "string" != typeof a || !a || 1 !== k && 9 !== k && 11 !== k)
              return d;
          if (!e && p) {
              if (11 !== k && (f = _.exec(a)))
                  if (j = f[1]) {
                      if (9 === k) {
                          if (h = b.getElementById(j), !h || !h.parentNode)
                              return d;
                          if (h.id === j)
                              return d.push(h), d
                      } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j)
                          return d.push(h), d
                  } else {
                      if (f[2])
                          return H.apply(d, b.getElementsByTagName(a)), d;
                      if ((j = f[3]) && c.getElementsByClassName)
                          return H.apply(d, b.getElementsByClassName(j)), d
                  }
              if (c.qsa && (!q || !q.test(a))) {
                  if (s = r = u, w = b, x = 1 !== k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
                      o = g(a),
                      (r = b.getAttribute("id")) ? s = r.replace(ba, "\\$&") : b.setAttribute("id", s),
                      s = "[id='" + s + "'] ",
                      l = o.length;
                      while (l--)
                          o[l] = s + ra(o[l]);
                      w = aa.test(a) && pa(b.parentNode) || b,
                      x = o.join(",")
                  }
                  if (x)
                      try {
                          return H.apply(d, w.querySelectorAll(x)), d
                      } catch (y) {} finally {
                          r || b.removeAttribute("id")
                      }
              }
          }
          return i(a.replace(R, "$1"), b, d, e)
      }
      function ha() {
          var a = [];
          function b(c, e) {
              return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
          }
          return b
      }
      function ia(a) {
          return a[u] = !0, a
      }
      function ja(a) {
          var b = n.createElement("div");
          try {
              return !!a(b)
          } catch (c) {
              return !1
          } finally {
              b.parentNode && b.parentNode.removeChild(b),
              b = null
          }
      }
      function ka(a, b) {
          var c = a.split("|"),
              e = a.length;
          while (e--)
              d.attrHandle[c[e]] = b
      }
      function la(a, b) {
          var c = b && a,
              d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
          if (d)
              return d;
          if (c)
              while (c = c.nextSibling)
                  if (c === b)
                      return -1;
          return a ? 1 : -1
      }
      function ma(a) {
          return function(b) {
              var c = b.nodeName.toLowerCase();
              return "input" === c && b.type === a
          }
      }
      function na(a) {
          return function(b) {
              var c = b.nodeName.toLowerCase();
              return ("input" === c || "button" === c) && b.type === a
          }
      }
      function oa(a) {
          return ia(function(b) {
              return b = +b, ia(function(c, d) {
                  var e,
                      f = a([], c.length, b),
                      g = f.length;
                  while (g--)
                      c[e = f[g]] && (c[e] = !(d[e] = c[e]))
              })
          })
      }
      function pa(a) {
          return a && "undefined" != typeof a.getElementsByTagName && a
      }
      c = ga.support = {},
      f = ga.isXML = function(a) {
          var b = a && (a.ownerDocument || a).documentElement;
          return b ? "HTML" !== b.nodeName : !1
      },
      m = ga.setDocument = function(a) {
          var b,
              e,
              g = a ? a.ownerDocument || a : v;
          return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = g.documentElement, e = g.defaultView, e && e !== e.top && (e.addEventListener ? e.addEventListener("unload", ea, !1) : e.attachEvent && e.attachEvent("onunload", ea)), p = !f(g), c.attributes = ja(function(a) {
              return a.className = "i", !a.getAttribute("className")
          }), c.getElementsByTagName = ja(function(a) {
              return a.appendChild(g.createComment("")), !a.getElementsByTagName("*").length
          }), c.getElementsByClassName = $.test(g.getElementsByClassName), c.getById = ja(function(a) {
              return o.appendChild(a).id = u, !g.getElementsByName || !g.getElementsByName(u).length
          }), c.getById ? (d.find.ID = function(a, b) {
              if ("undefined" != typeof b.getElementById && p) {
                  var c = b.getElementById(a);
                  return c && c.parentNode ? [c] : []
              }
          }, d.filter.ID = function(a) {
              var b = a.replace(ca, da);
              return function(a) {
                  return a.getAttribute("id") === b
              }
          }) : (delete d.find.ID, d.filter.ID = function(a) {
              var b = a.replace(ca, da);
              return function(a) {
                  var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                  return c && c.value === b
              }
          }), d.find.TAG = c.getElementsByTagName ? function(a, b) {
              return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
          } : function(a, b) {
              var c,
                  d = [],
                  e = 0,
                  f = b.getElementsByTagName(a);
              if ("*" === a) {
                  while (c = f[e++])
                      1 === c.nodeType && d.push(c);
                  return d
              }
              return f
          }, d.find.CLASS = c.getElementsByClassName && function(a, b) {
              return p ? b.getElementsByClassName(a) : void 0
          }, r = [], q = [], (c.qsa = $.test(g.querySelectorAll)) && (ja(function(a) {
              o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\f]' msallowcapture=''><option selected=''></option></select>",
              a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"),
              a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"),
              a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="),
              a.querySelectorAll(":checked").length || q.push(":checked"),
              a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
          }), ja(function(a) {
              var b = g.createElement("input");
              b.setAttribute("type", "hidden"),
              a.appendChild(b).setAttribute("name", "D"),
              a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="),
              a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"),
              a.querySelectorAll("*,:x"),
              q.push(",.*:")
          })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function(a) {
              c.disconnectedMatch = s.call(a, "div"),
              s.call(a, "[s!='']:x"),
              r.push("!=", P)
          }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function(a, b) {
              var c = 9 === a.nodeType ? a.documentElement : a,
                  d = b && b.parentNode;
              return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
          } : function(a, b) {
              if (b)
                  while (b = b.parentNode)
                      if (b === a)
                          return !0;
              return !1
          }, B = b ? function(a, b) {
              if (a === b)
                  return l = !0, 0;
              var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
              return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === g || a.ownerDocument === v && t(v, a) ? -1 : b === g || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1)
          } : function(a, b) {
              if (a === b)
                  return l = !0, 0;
              var c,
                  d = 0,
                  e = a.parentNode,
                  f = b.parentNode,
                  h = [a],
                  i = [b];
              if (!e || !f)
                  return a === g ? -1 : b === g ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
              if (e === f)
                  return la(a, b);
              c = a;
              while (c = c.parentNode)
                  h.unshift(c);
              c = b;
              while (c = c.parentNode)
                  i.unshift(c);
              while (h[d] === i[d])
                  d++;
              return d ? la(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0
          }, g) : n
      },
      ga.matches = function(a, b) {
          return ga(a, null, null, b)
      },
      ga.matchesSelector = function(a, b) {
          if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b)))
              try {
                  var d = s.call(a, b);
                  if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType)
                      return d
              } catch (e) {}
          return ga(b, n, null, [a]).length > 0
      },
      ga.contains = function(a, b) {
          return (a.ownerDocument || a) !== n && m(a), t(a, b)
      },
      ga.attr = function(a, b) {
          (a.ownerDocument || a) !== n && m(a);
          var e = d.attrHandle[b.toLowerCase()],
              f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
          return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
      },
      ga.error = function(a) {
          throw new Error("Syntax error, unrecognized expression: " + a)
      },
      ga.uniqueSort = function(a) {
          var b,
              d = [],
              e = 0,
              f = 0;
          if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
              while (b = a[f++])
                  b === a[f] && (e = d.push(f));
              while (e--)
                  a.splice(d[e], 1)
          }
          return k = null, a
      },
      e = ga.getText = function(a) {
          var b,
              c = "",
              d = 0,
              f = a.nodeType;
          if (f) {
              if (1 === f || 9 === f || 11 === f) {
                  if ("string" == typeof a.textContent)
                      return a.textContent;
                  for (a = a.firstChild; a; a = a.nextSibling)
                      c += e(a)
              } else if (3 === f || 4 === f)
                  return a.nodeValue
          } else
              while (b = a[d++])
                  c += e(b);
          return c
      },
      d = ga.selectors = {
          cacheLength: 50,
          createPseudo: ia,
          match: X,
          attrHandle: {},
          find: {},
          relative: {
              ">": {
                  dir: "parentNode",
                  first: !0
              },
              " ": {
                  dir: "parentNode"
              },
              "+": {
                  dir: "previousSibling",
                  first: !0
              },
              "~": {
                  dir: "previousSibling"
              }
          },
          preFilter: {
              ATTR: function(a) {
                  return a[1] = a[1].replace(ca, da), a[3] = (a[3] || a[4] || a[5] || "").replace(ca, da), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
              },
              CHILD: function(a) {
                  return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a
              },
              PSEUDO: function(a) {
                  var b,
                      c = !a[6] && a[2];
                  return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
              }
          },
          filter: {
              TAG: function(a) {
                  var b = a.replace(ca, da).toLowerCase();
                  return "*" === a ? function() {
                      return !0
                  } : function(a) {
                      return a.nodeName && a.nodeName.toLowerCase() === b
                  }
              },
              CLASS: function(a) {
                  var b = y[a + " "];
                  return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function(a) {
                          return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                      })
              },
              ATTR: function(a, b, c) {
                  return function(d) {
                      var e = ga.attr(d, a);
                      return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(Q, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                  }
              },
              CHILD: function(a, b, c, d, e) {
                  var f = "nth" !== a.slice(0, 3),
                      g = "last" !== a.slice(-4),
                      h = "of-type" === b;
                  return 1 === d && 0 === e ? function(a) {
                      return !!a.parentNode
                  } : function(b, c, i) {
                      var j,
                          k,
                          l,
                          m,
                          n,
                          o,
                          p = f !== g ? "nextSibling" : "previousSibling",
                          q = b.parentNode,
                          r = h && b.nodeName.toLowerCase(),
                          s = !i && !h;
                      if (q) {
                          if (f) {
                              while (p) {
                                  l = b;
                                  while (l = l[p])
                                      if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)
                                          return !1;
                                  o = p = "only" === a && !o && "nextSibling"
                              }
                              return !0
                          }
                          if (o = [g ? q.firstChild : q.lastChild], g && s) {
                              k = q[u] || (q[u] = {}),
                              j = k[a] || [],
                              n = j[0] === w && j[1],
                              m = j[0] === w && j[2],
                              l = n && q.childNodes[n];
                              while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                  if (1 === l.nodeType && ++m && l === b) {
                                      k[a] = [w, n, m];
                                      break
                                  }
                          } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w)
                              m = j[1];
                          else
                              while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                  if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b))
                                      break;
                          return m -= e, m === d || m % d === 0 && m / d >= 0
                      }
                  }
              },
              PSEUDO: function(a, b) {
                  var c,
                      e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);
                  return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function(a, c) {
                      var d,
                          f = e(a, b),
                          g = f.length;
                      while (g--)
                          d = J(a, f[g]),
                          a[d] = !(c[d] = f[g])
                  }) : function(a) {
                      return e(a, 0, c)
                  }) : e
              }
          },
          pseudos: {
              not: ia(function(a) {
                  var b = [],
                      c = [],
                      d = h(a.replace(R, "$1"));
                  return d[u] ? ia(function(a, b, c, e) {
                      var f,
                          g = d(a, null, e, []),
                          h = a.length;
                      while (h--)
                          (f = g[h]) && (a[h] = !(b[h] = f))
                  }) : function(a, e, f) {
                      return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
                  }
              }),
              has: ia(function(a) {
                  return function(b) {
                      return ga(a, b).length > 0
                  }
              }),
              contains: ia(function(a) {
                  return a = a.replace(ca, da), function(b) {
                      return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                  }
              }),
              lang: ia(function(a) {
                  return W.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(ca, da).toLowerCase(), function(b) {
                      var c;
                      do if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))
                          return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
                      while ((b = b.parentNode) && 1 === b.nodeType);
                      return !1
                  }
              }),
              target: function(b) {
                  var c = a.location && a.location.hash;
                  return c && c.slice(1) === b.id
              },
              root: function(a) {
                  return a === o
              },
              focus: function(a) {
                  return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
              },
              enabled: function(a) {
                  return a.disabled === !1
              },
              disabled: function(a) {
                  return a.disabled === !0
              },
              checked: function(a) {
                  var b = a.nodeName.toLowerCase();
                  return "input" === b && !!a.checked || "option" === b && !!a.selected
              },
              selected: function(a) {
                  return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
              },
              empty: function(a) {
                  for (a = a.firstChild; a; a = a.nextSibling)
                      if (a.nodeType < 6)
                          return !1;
                  return !0
              },
              parent: function(a) {
                  return !d.pseudos.empty(a)
              },
              header: function(a) {
                  return Z.test(a.nodeName)
              },
              input: function(a) {
                  return Y.test(a.nodeName)
              },
              button: function(a) {
                  var b = a.nodeName.toLowerCase();
                  return "input" === b && "button" === a.type || "button" === b
              },
              text: function(a) {
                  var b;
                  return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
              },
              first: oa(function() {
                  return [0]
              }),
              last: oa(function(a, b) {
                  return [b - 1]
              }),
              eq: oa(function(a, b, c) {
                  return [0 > c ? c + b : c]
              }),
              even: oa(function(a, b) {
                  for (var c = 0; b > c; c += 2)
                      a.push(c);
                  return a
              }),
              odd: oa(function(a, b) {
                  for (var c = 1; b > c; c += 2)
                      a.push(c);
                  return a
              }),
              lt: oa(function(a, b, c) {
                  for (var d = 0 > c ? c + b : c; --d >= 0;)
                      a.push(d);
                  return a
              }),
              gt: oa(function(a, b, c) {
                  for (var d = 0 > c ? c + b : c; ++d < b;)
                      a.push(d);
                  return a
              })
          }
      },
      d.pseudos.nth = d.pseudos.eq;
      for (b in {
          radio: !0,
          checkbox: !0,
          file: !0,
          password: !0,
          image: !0
      })
          d.pseudos[b] = ma(b);
      for (b in {
          submit: !0,
          reset: !0
      })
          d.pseudos[b] = na(b);
      function qa() {}
      qa.prototype = d.filters = d.pseudos,
      d.setFilters = new qa,
      g = ga.tokenize = function(a, b) {
          var c,
              e,
              f,
              g,
              h,
              i,
              j,
              k = z[a + " "];
          if (k)
              return b ? 0 : k.slice(0);
          h = a,
          i = [],
          j = d.preFilter;
          while (h) {
              (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])),
              c = !1,
              (e = T.exec(h)) && (c = e.shift(), f.push({
                  value: c,
                  type: e[0].replace(R, " ")
              }), h = h.slice(c.length));
              for (g in d.filter)
                  !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                      value: c,
                      type: g,
                      matches: e
                  }), h = h.slice(c.length));
              if (!c)
                  break
          }
          return b ? h.length : h ? ga.error(a) : z(a, i).slice(0)
      };
      function ra(a) {
          for (var b = 0, c = a.length, d = ""; c > b; b++)
              d += a[b].value;
          return d
      }
      function sa(a, b, c) {
          var d = b.dir,
              e = c && "parentNode" === d,
              f = x++;
          return b.first ? function(b, c, f) {
              while (b = b[d])
                  if (1 === b.nodeType || e)
                      return a(b, c, f)
          } : function(b, c, g) {
              var h,
                  i,
                  j = [w, f];
              if (g) {
                  while (b = b[d])
                      if ((1 === b.nodeType || e) && a(b, c, g))
                          return !0
              } else
                  while (b = b[d])
                      if (1 === b.nodeType || e) {
                          if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f)
                              return j[2] = h[2];
                          if (i[d] = j, j[2] = a(b, c, g))
                              return !0
                      }
          }
      }
      function ta(a) {
          return a.length > 1 ? function(b, c, d) {
              var e = a.length;
              while (e--)
                  if (!a[e](b, c, d))
                      return !1;
              return !0
          } : a[0]
      }
      function ua(a, b, c) {
          for (var d = 0, e = b.length; e > d; d++)
              ga(a, b[d], c);
          return c
      }
      function va(a, b, c, d, e) {
          for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
              (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
          return g
      }
      function wa(a, b, c, d, e, f) {
          return d && !d[u] && (d = wa(d)), e && !e[u] && (e = wa(e, f)), ia(function(f, g, h, i) {
              var j,
                  k,
                  l,
                  m = [],
                  n = [],
                  o = g.length,
                  p = f || ua(b || "*", h.nodeType ? [h] : h, []),
                  q = !a || !f && b ? p : va(p, m, a, h, i),
                  r = c ? e || (f ? a : o || d) ? [] : g : q;
              if (c && c(q, r, h, i), d) {
                  j = va(r, n),
                  d(j, [], h, i),
                  k = j.length;
                  while (k--)
                      (l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
              }
              if (f) {
                  if (e || a) {
                      if (e) {
                          j = [],
                          k = r.length;
                          while (k--)
                              (l = r[k]) && j.push(q[k] = l);
                          e(null, r = [], j, i)
                      }
                      k = r.length;
                      while (k--)
                          (l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                  }
              } else
                  r = va(r === g ? r.splice(o, r.length) : r),
                  e ? e(null, g, r, i) : H.apply(g, r)
          })
      }
      function xa(a) {
          for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = sa(function(a) {
                  return a === b
              }, h, !0), l = sa(function(a) {
                  return J(b, a) > -1
              }, h, !0), m = [function(a, c, d) {
                  var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                  return b = null, e
              }]; f > i; i++)
              if (c = d.relative[a[i].type])
                  m = [sa(ta(m), c)];
              else {
                  if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                      for (e = ++i; f > e; e++)
                          if (d.relative[a[e].type])
                              break;
                      return wa(i > 1 && ta(m), i > 1 && ra(a.slice(0, i - 1).concat({
                          value: " " === a[i - 2].type ? "*" : ""
                      })).replace(R, "$1"), c, e > i && xa(a.slice(i, e)), f > e && xa(a = a.slice(e)), f > e && ra(a))
                  }
                  m.push(c)
              }
          return ta(m)
      }
      function ya(a, b) {
          var c = b.length > 0,
              e = a.length > 0,
              f = function(f, g, h, i, k) {
                  var l,
                      m,
                      o,
                      p = 0,
                      q = "0",
                      r = f && [],
                      s = [],
                      t = j,
                      u = f || e && d.find.TAG("*", k),
                      v = w += null == t ? 1 : Math.random() || .1,
                      x = u.length;
                  for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
                      if (e && l) {
                          m = 0;
                          while (o = a[m++])
                              if (o(l, g, h)) {
                                  i.push(l);
                                  break
                              }
                          k && (w = v)
                      }
                      c && ((l = !o && l) && p--, f && r.push(l))
                  }
                  if (p += q, c && q !== p) {
                      m = 0;
                      while (o = b[m++])
                          o(r, s, g, h);
                      if (f) {
                          if (p > 0)
                              while (q--)
                                  r[q] || s[q] || (s[q] = F.call(i));
                          s = va(s)
                      }
                      H.apply(i, s),
                      k && !f && s.length > 0 && p + b.length > 1 && ga.uniqueSort(i)
                  }
                  return k && (w = v, j = t), r
              };
          return c ? ia(f) : f
      }
      return h = ga.compile = function(a, b) {
          var c,
              d = [],
              e = [],
              f = A[a + " "];
          if (!f) {
              b || (b = g(a)),
              c = b.length;
              while (c--)
                  f = xa(b[c]),
                  f[u] ? d.push(f) : e.push(f);
              f = A(a, ya(e, d)),
              f.selector = a
          }
          return f
      }, i = ga.select = function(a, b, e, f) {
          var i,
              j,
              k,
              l,
              m,
              n = "function" == typeof a && a,
              o = !f && g(a = n.selector || a);
          if (e = e || [], 1 === o.length) {
              if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                  if (b = (d.find.ID(k.matches[0].replace(ca, da), b) || [])[0], !b)
                      return e;
                  n && (b = b.parentNode),
                  a = a.slice(j.shift().value.length)
              }
              i = X.needsContext.test(a) ? 0 : j.length;
              while (i--) {
                  if (k = j[i], d.relative[l = k.type])
                      break;
                  if ((m = d.find[l]) && (f = m(k.matches[0].replace(ca, da), aa.test(j[0].type) && pa(b.parentNode) || b))) {
                      if (j.splice(i, 1), a = f.length && ra(j), !a)
                          return H.apply(e, f), e;
                      break
                  }
              }
          }
          return (n || h(a, o))(f, b, !p, e, aa.test(a) && pa(b.parentNode) || b), e
      }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function(a) {
          return 1 & a.compareDocumentPosition(n.createElement("div"))
      }), ja(function(a) {
          return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
      }) || ka("type|href|height|width", function(a, b, c) {
          return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
      }), c.attributes && ja(function(a) {
          return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
      }) || ka("value", function(a, b, c) {
          return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
      }), ja(function(a) {
          return null == a.getAttribute("disabled")
      }) || ka(K, function(a, b, c) {
          var d;
          return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
      }), ga
  }(a);
  m.find = s,
  m.expr = s.selectors,
  m.expr[":"] = m.expr.pseudos,
  m.unique = s.uniqueSort,
  m.text = s.getText,
  m.isXMLDoc = s.isXML,
  m.contains = s.contains;
  var t = m.expr.match.needsContext,
      u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      v = /^.[^:#\[\.,]*$/;
  function w(a, b, c) {
      if (m.isFunction(b))
          return m.grep(a, function(a, d) {
              return !!b.call(a, d, a) !== c
          });
      if (b.nodeType)
          return m.grep(a, function(a) {
              return a === b !== c
          });
      if ("string" == typeof b) {
          if (v.test(b))
              return m.filter(b, a, c);
          b = m.filter(b, a)
      }
      return m.grep(a, function(a) {
          return m.inArray(a, b) >= 0 !== c
      })
  }
  m.filter = function(a, b, c) {
      var d = b[0];
      return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? m.find.matchesSelector(d, a) ? [d] : [] : m.find.matches(a, m.grep(b, function(a) {
          return 1 === a.nodeType
      }))
  },
  m.fn.extend({
      find: function(a) {
          var b,
              c = [],
              d = this,
              e = d.length;
          if ("string" != typeof a)
              return this.pushStack(m(a).filter(function() {
                  for (b = 0; e > b; b++)
                      if (m.contains(d[b], this))
                          return !0
              }));
          for (b = 0; e > b; b++)
              m.find(a, d[b], c);
          return c = this.pushStack(e > 1 ? m.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
      },
      filter: function(a) {
          return this.pushStack(w(this, a || [], !1))
      },
      not: function(a) {
          return this.pushStack(w(this, a || [], !0))
      },
      is: function(a) {
          return !!w(this, "string" == typeof a && t.test(a) ? m(a) : a || [], !1).length
      }
  });
  var x,
      y = a.document,
      z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      A = m.fn.init = function(a, b) {
          var c,
              d;
          if (!a)
              return this;
          if ("string" == typeof a) {
              if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b)
                  return !b || b.jquery ? (b || x).find(a) : this.constructor(b).find(a);
              if (c[1]) {
                  if (b = b instanceof m ? b[0] : b, m.merge(this, m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)), u.test(c[1]) && m.isPlainObject(b))
                      for (c in b)
                          m.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                  return this
              }
              if (d = y.getElementById(c[2]), d && d.parentNode) {
                  if (d.id !== c[2])
                      return x.find(a);
                  this.length = 1,
                  this[0] = d
              }
              return this.context = y, this.selector = a, this
          }
          return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : m.isFunction(a) ? "undefined" != typeof x.ready ? x.ready(a) : a(m) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), m.makeArray(a, this))
      };
  A.prototype = m.fn,
  x = m(y);
  var B = /^(?:parents|prev(?:Until|All))/,
      C = {
          children: !0,
          contents: !0,
          next: !0,
          prev: !0
      };
  m.extend({
      dir: function(a, b, c) {
          var d = [],
              e = a[b];
          while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !m(e).is(c)))
              1 === e.nodeType && d.push(e),
              e = e[b];
          return d
      },
      sibling: function(a, b) {
          for (var c = []; a; a = a.nextSibling)
              1 === a.nodeType && a !== b && c.push(a);
          return c
      }
  }),
  m.fn.extend({
      has: function(a) {
          var b,
              c = m(a, this),
              d = c.length;
          return this.filter(function() {
              for (b = 0; d > b; b++)
                  if (m.contains(this, c[b]))
                      return !0
          })
      },
      closest: function(a, b) {
          for (var c, d = 0, e = this.length, f = [], g = t.test(a) || "string" != typeof a ? m(a, b || this.context) : 0; e > d; d++)
              for (c = this[d]; c && c !== b; c = c.parentNode)
                  if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && m.find.matchesSelector(c, a))) {
                      f.push(c);
                      break
                  }
          return this.pushStack(f.length > 1 ? m.unique(f) : f)
      },
      index: function(a) {
          return a ? "string" == typeof a ? m.inArray(this[0], m(a)) : m.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
      },
      add: function(a, b) {
          return this.pushStack(m.unique(m.merge(this.get(), m(a, b))))
      },
      addBack: function(a) {
          return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
      }
  });
  function D(a, b) {
      do a = a[b];
      while (a && 1 !== a.nodeType);
      return a
  }
  m.each({
      parent: function(a) {
          var b = a.parentNode;
          return b && 11 !== b.nodeType ? b : null
      },
      parents: function(a) {
          return m.dir(a, "parentNode")
      },
      parentsUntil: function(a, b, c) {
          return m.dir(a, "parentNode", c)
      },
      next: function(a) {
          return D(a, "nextSibling")
      },
      prev: function(a) {
          return D(a, "previousSibling")
      },
      nextAll: function(a) {
          return m.dir(a, "nextSibling")
      },
      prevAll: function(a) {
          return m.dir(a, "previousSibling")
      },
      nextUntil: function(a, b, c) {
          return m.dir(a, "nextSibling", c)
      },
      prevUntil: function(a, b, c) {
          return m.dir(a, "previousSibling", c)
      },
      siblings: function(a) {
          return m.sibling((a.parentNode || {}).firstChild, a)
      },
      children: function(a) {
          return m.sibling(a.firstChild)
      },
      contents: function(a) {
          return m.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : m.merge([], a.childNodes)
      }
  }, function(a, b) {
      m.fn[a] = function(c, d) {
          var e = m.map(this, b, c);
          return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = m.filter(d, e)), this.length > 1 && (C[a] || (e = m.unique(e)), B.test(a) && (e = e.reverse())), this.pushStack(e)
      }
  });
  var E = /\S+/g,
      F = {};
  function G(a) {
      var b = F[a] = {};
      return m.each(a.match(E) || [], function(a, c) {
          b[c] = !0
      }), b
  }
  m.Callbacks = function(a) {
      a = "string" == typeof a ? F[a] || G(a) : m.extend({}, a);
      var b,
          c,
          d,
          e,
          f,
          g,
          h = [],
          i = !a.once && [],
          j = function(l) {
              for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++)
                  if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                      c = !1;
                      break
                  }
              b = !1,
              h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable())
          },
          k = {
              add: function() {
                  if (h) {
                      var d = h.length;
                      !function f(b) {
                          m.each(b, function(b, c) {
                              var d = m.type(c);
                              "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && f(c)
                          })
                      }(arguments),
                      b ? e = h.length : c && (g = d, j(c))
                  }
                  return this
              },
              remove: function() {
                  return h && m.each(arguments, function(a, c) {
                      var d;
                      while ((d = m.inArray(c, h, d)) > -1)
                          h.splice(d, 1),
                          b && (e >= d && e--, f >= d && f--)
                  }), this
              },
              has: function(a) {
                  return a ? m.inArray(a, h) > -1 : !(!h || !h.length)
              },
              empty: function() {
                  return h = [], e = 0, this
              },
              disable: function() {
                  return h = i = c = void 0, this
              },
              disabled: function() {
                  return !h
              },
              lock: function() {
                  return i = void 0, c || k.disable(), this
              },
              locked: function() {
                  return !i
              },
              fireWith: function(a, c) {
                  return !h || d && !i || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? i.push(c) : j(c)), this
              },
              fire: function() {
                  return k.fireWith(this, arguments), this
              },
              fired: function() {
                  return !!d
              }
          };
      return k
  },
  m.extend({
      Deferred: function(a) {
          var b = [["resolve", "done", m.Callbacks("once memory"), "resolved"], ["reject", "fail", m.Callbacks("once memory"), "rejected"], ["notify", "progress", m.Callbacks("memory")]],
              c = "pending",
              d = {
                  state: function() {
                      return c
                  },
                  always: function() {
                      return e.done(arguments).fail(arguments), this
                  },
                  then: function() {
                      var a = arguments;
                      return m.Deferred(function(c) {
                          m.each(b, function(b, f) {
                              var g = m.isFunction(a[b]) && a[b];
                              e[f[1]](function() {
                                  var a = g && g.apply(this, arguments);
                                  a && m.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                              })
                          }),
                          a = null
                      }).promise()
                  },
                  promise: function(a) {
                      return null != a ? m.extend(a, d) : d
                  }
              },
              e = {};
          return d.pipe = d.then, m.each(b, function(a, f) {
              var g = f[2],
                  h = f[3];
              d[f[1]] = g.add,
              h && g.add(function() {
                  c = h
              }, b[1 ^ a][2].disable, b[2][2].lock),
              e[f[0]] = function() {
                  return e[f[0] + "With"](this === e ? d : this, arguments), this
              },
              e[f[0] + "With"] = g.fireWith
          }), d.promise(e), a && a.call(e, e), e
      },
      when: function(a) {
          var b = 0,
              c = d.call(arguments),
              e = c.length,
              f = 1 !== e || a && m.isFunction(a.promise) ? e : 0,
              g = 1 === f ? a : m.Deferred(),
              h = function(a, b, c) {
                  return function(e) {
                      b[a] = this,
                      c[a] = arguments.length > 1 ? d.call(arguments) : e,
                      c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                  }
              },
              i,
              j,
              k;
          if (e > 1)
              for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++)
                  c[b] && m.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
          return f || g.resolveWith(k, c), g.promise()
      }
  });
  var H;
  m.fn.ready = function(a) {
      return m.ready.promise().done(a), this
  },
  m.extend({
      isReady: !1,
      readyWait: 1,
      holdReady: function(a) {
          a ? m.readyWait++ : m.ready(!0)
      },
      ready: function(a) {
          if (a === !0 ? !--m.readyWait : !m.isReady) {
              if (!y.body)
                  return setTimeout(m.ready);
              m.isReady = !0,
              a !== !0 && --m.readyWait > 0 || (H.resolveWith(y, [m]), m.fn.triggerHandler && (m(y).triggerHandler("ready"), m(y).off("ready")))
          }
      }
  });
  function I() {
      y.addEventListener ? (y.removeEventListener("DOMContentLoaded", J, !1), a.removeEventListener("load", J, !1)) : (y.detachEvent("onreadystatechange", J), a.detachEvent("onload", J))
  }
  function J() {
      (y.addEventListener || "load" === event.type || "complete" === y.readyState) && (I(), m.ready())
  }
  m.ready.promise = function(b) {
      if (!H)
          if (H = m.Deferred(), "complete" === y.readyState)
              setTimeout(m.ready);
          else if (y.addEventListener)
              y.addEventListener("DOMContentLoaded", J, !1),
              a.addEventListener("load", J, !1);
          else {
              y.attachEvent("onreadystatechange", J),
              a.attachEvent("onload", J);
              var c = !1;
              try {
                  c = null == a.frameElement && y.documentElement
              } catch (d) {}
              c && c.doScroll && !function e() {
                  if (!m.isReady) {
                      try {
                          c.doScroll("left")
                      } catch (a) {
                          return setTimeout(e, 50)
                      }
                      I(),
                      m.ready()
                  }
              }()
          }
      return H.promise(b)
  };
  var K = "undefined",
      L;
  for (L in m(k))
      break;
  k.ownLast = "0" !== L,
  k.inlineBlockNeedsLayout = !1,
  m(function() {
      var a,
          b,
          c,
          d;
      c = y.getElementsByTagName("body")[0],
      c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", k.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
  }),
  function() {
      var a = y.createElement("div");
      if (null == k.deleteExpando) {
          k.deleteExpando = !0;
          try {
              delete a.test
          } catch (b) {
              k.deleteExpando = !1
          }
      }
      a = null
  }(),
  m.acceptData = function(a) {
      var b = m.noData[(a.nodeName + " ").toLowerCase()],
          c = +a.nodeType || 1;
      return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
  };
  var M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      N = /([A-Z])/g;
  function O(a, b, c) {
      if (void 0 === c && 1 === a.nodeType) {
          var d = "data-" + b.replace(N, "-$1").toLowerCase();
          if (c = a.getAttribute(d), "string" == typeof c) {
              try {
                  c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : M.test(c) ? m.parseJSON(c) : c
              } catch (e) {}
              m.data(a, b, c)
          } else
              c = void 0
      }
      return c
  }
  function P(a) {
      var b;
      for (b in a)
          if (("data" !== b || !m.isEmptyObject(a[b])) && "toJSON" !== b)
              return !1;
      return !0
  }
  function Q(a, b, d, e) {
      if (m.acceptData(a)) {
          var f,
              g,
              h = m.expando,
              i = a.nodeType,
              j = i ? m.cache : a,
              k = i ? a[h] : a[h] && h;
          if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b)
              return k || (k = i ? a[h] = c.pop() || m.guid++ : h), j[k] || (j[k] = i ? {} : {
                  toJSON: m.noop
              }), ("object" == typeof b || "function" == typeof b) && (e ? j[k] = m.extend(j[k], b) : j[k].data = m.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[m.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[m.camelCase(b)])) : f = g, f
      }
  }
  function R(a, b, c) {
      if (m.acceptData(a)) {
          var d,
              e,
              f = a.nodeType,
              g = f ? m.cache : a,
              h = f ? a[m.expando] : m.expando;
          if (g[h]) {
              if (b && (d = c ? g[h] : g[h].data)) {
                  m.isArray(b) ? b = b.concat(m.map(b, m.camelCase)) : b in d ? b = [b] : (b = m.camelCase(b), b = b in d ? [b] : b.split(" ")),
                  e = b.length;
                  while (e--)
                      delete d[b[e]];
                  if (c ? !P(d) : !m.isEmptyObject(d))
                      return
              }
              (c || (delete g[h].data, P(g[h]))) && (f ? m.cleanData([a], !0) : k.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
          }
      }
  }
  m.extend({
      cache: {},
      noData: {
          "applet ": !0,
          "embed ": !0,
          "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
      },
      hasData: function(a) {
          return a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando], !!a && !P(a)
      },
      data: function(a, b, c) {
          return Q(a, b, c)
      },
      removeData: function(a, b) {
          return R(a, b)
      },
      _data: function(a, b, c) {
          return Q(a, b, c, !0)
      },
      _removeData: function(a, b) {
          return R(a, b, !0)
      }
  }),
  m.fn.extend({
      data: function(a, b) {
          var c,
              d,
              e,
              f = this[0],
              g = f && f.attributes;
          if (void 0 === a) {
              if (this.length && (e = m.data(f), 1 === f.nodeType && !m._data(f, "parsedAttrs"))) {
                  c = g.length;
                  while (c--)
                      g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = m.camelCase(d.slice(5)), O(f, d, e[d])));
                  m._data(f, "parsedAttrs", !0)
              }
              return e
          }
          return "object" == typeof a ? this.each(function() {
              m.data(this, a)
          }) : arguments.length > 1 ? this.each(function() {
              m.data(this, a, b)
          }) : f ? O(f, a, m.data(f, a)) : void 0
      },
      removeData: function(a) {
          return this.each(function() {
              m.removeData(this, a)
          })
      }
  }),
  m.extend({
      queue: function(a, b, c) {
          var d;
          return a ? (b = (b || "fx") + "queue", d = m._data(a, b), c && (!d || m.isArray(c) ? d = m._data(a, b, m.makeArray(c)) : d.push(c)), d || []) : void 0
      },
      dequeue: function(a, b) {
          b = b || "fx";
          var c = m.queue(a, b),
              d = c.length,
              e = c.shift(),
              f = m._queueHooks(a, b),
              g = function() {
                  m.dequeue(a, b)
              };
          "inprogress" === e && (e = c.shift(), d--),
          e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)),
          !d && f && f.empty.fire()
      },
      _queueHooks: function(a, b) {
          var c = b + "queueHooks";
          return m._data(a, c) || m._data(a, c, {
                  empty: m.Callbacks("once memory").add(function() {
                      m._removeData(a, b + "queue"),
                      m._removeData(a, c)
                  })
              })
      }
  }),
  m.fn.extend({
      queue: function(a, b) {
          var c = 2;
          return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? m.queue(this[0], a) : void 0 === b ? this : this.each(function() {
              var c = m.queue(this, a, b);
              m._queueHooks(this, a),
              "fx" === a && "inprogress" !== c[0] && m.dequeue(this, a)
          })
      },
      dequeue: function(a) {
          return this.each(function() {
              m.dequeue(this, a)
          })
      },
      clearQueue: function(a) {
          return this.queue(a || "fx", [])
      },
      promise: function(a, b) {
          var c,
              d = 1,
              e = m.Deferred(),
              f = this,
              g = this.length,
              h = function() {
                  --d || e.resolveWith(f, [f])
              };
          "string" != typeof a && (b = a, a = void 0),
          a = a || "fx";
          while (g--)
              c = m._data(f[g], a + "queueHooks"),
              c && c.empty && (d++, c.empty.add(h));
          return h(), e.promise(b)
      }
  });
  var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      T = ["Top", "Right", "Bottom", "Left"],
      U = function(a, b) {
          return a = b || a, "none" === m.css(a, "display") || !m.contains(a.ownerDocument, a)
      },
      V = m.access = function(a, b, c, d, e, f, g) {
          var h = 0,
              i = a.length,
              j = null == c;
          if ("object" === m.type(c)) {
              e = !0;
              for (h in c)
                  m.access(a, b, h, c[h], !0, f, g)
          } else if (void 0 !== d && (e = !0, m.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
              return j.call(m(a), c)
          })), b))
              for (; i > h; h++)
                  b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
          return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
      },
      W = /^(?:checkbox|radio)$/i;
  !function() {
      var a = y.createElement("input"),
          b = y.createElement("div"),
          c = y.createDocumentFragment();
      if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", k.leadingWhitespace = 3 === b.firstChild.nodeType, k.tbody = !b.getElementsByTagName("tbody").length, k.htmlSerialize = !!b.getElementsByTagName("link").length, k.html5Clone = "<:nav></:nav>" !== y.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), k.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, k.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function() {
          k.noCloneEvent = !1
      }), b.cloneNode(!0).click()), null == k.deleteExpando) {
          k.deleteExpando = !0;
          try {
              delete b.test
          } catch (d) {
              k.deleteExpando = !1
          }
      }
  }(),
  function() {
      var b,
          c,
          d = y.createElement("div");
      for (b in {
          submit: !0,
          change: !0,
          focusin: !0
      })
          c = "on" + b,
          (k[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), k[b + "Bubbles"] = d.attributes[c].expando === !1);
      d = null
  }();
  var X = /^(?:input|select|textarea)$/i,
      Y = /^key/,
      Z = /^(?:mouse|pointer|contextmenu)|click/,
      $ = /^(?:focusinfocus|focusoutblur)$/,
      _ = /^([^.]*)(?:\.(.+)|)$/;
  function aa() {
      return !0
  }
  function ba() {
      return !1
  }
  function ca() {
      try {
          return y.activeElement
      } catch (a) {}
  }
  m.event = {
      global: {},
      add: function(a, b, c, d, e) {
          var f,
              g,
              h,
              i,
              j,
              k,
              l,
              n,
              o,
              p,
              q,
              r = m._data(a);
          if (r) {
              c.handler && (i = c, c = i.handler, e = i.selector),
              c.guid || (c.guid = m.guid++),
              (g = r.events) || (g = r.events = {}),
              (k = r.handle) || (k = r.handle = function(a) {
                  return typeof m === K || a && m.event.triggered === a.type ? void 0 : m.event.dispatch.apply(k.elem, arguments)
              }, k.elem = a),
              b = (b || "").match(E) || [""],
              h = b.length;
              while (h--)
                  f = _.exec(b[h]) || [],
                  o = q = f[1],
                  p = (f[2] || "").split(".").sort(),
                  o && (j = m.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = m.event.special[o] || {}, l = m.extend({
                      type: o,
                      origType: q,
                      data: d,
                      handler: c,
                      guid: c.guid,
                      selector: e,
                      needsContext: e && m.expr.match.needsContext.test(e),
                      namespace: p.join(".")
                  }, i), (n = g[o]) || (n = g[o] = [], n.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? n.splice(n.delegateCount++, 0, l) : n.push(l), m.event.global[o] = !0);
              a = null
          }
      },
      remove: function(a, b, c, d, e) {
          var f,
              g,
              h,
              i,
              j,
              k,
              l,
              n,
              o,
              p,
              q,
              r = m.hasData(a) && m._data(a);
          if (r && (k = r.events)) {
              b = (b || "").match(E) || [""],
              j = b.length;
              while (j--)
                  if (h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                      l = m.event.special[o] || {},
                      o = (d ? l.delegateType : l.bindType) || o,
                      n = k[o] || [],
                      h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                      i = f = n.length;
                      while (f--)
                          g = n[f],
                          !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (n.splice(f, 1), g.selector && n.delegateCount--, l.remove && l.remove.call(a, g));
                      i && !n.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || m.removeEvent(a, o, r.handle), delete k[o])
                  } else
                      for (o in k)
                          m.event.remove(a, o + b[j], c, d, !0);
              m.isEmptyObject(k) && (delete r.handle, m._removeData(a, "events"))
          }
      },
      trigger: function(b, c, d, e) {
          var f,
              g,
              h,
              i,
              k,
              l,
              n,
              o = [d || y],
              p = j.call(b, "type") ? b.type : b,
              q = j.call(b, "namespace") ? b.namespace.split(".") : [];
          if (h = l = d = d || y, 3 !== d.nodeType && 8 !== d.nodeType && !$.test(p + m.event.triggered) && (p.indexOf(".") >= 0 && (q = p.split("."), p = q.shift(), q.sort()), g = p.indexOf(":") < 0 && "on" + p, b = b[m.expando] ? b : new m.Event(p, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : m.makeArray(c, [b]), k = m.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
              if (!e && !k.noBubble && !m.isWindow(d)) {
                  for (i = k.delegateType || p, $.test(i + p) || (h = h.parentNode); h; h = h.parentNode)
                      o.push(h),
                      l = h;
                  l === (d.ownerDocument || y) && o.push(l.defaultView || l.parentWindow || a)
              }
              n = 0;
              while ((h = o[n++]) && !b.isPropagationStopped())
                  b.type = n > 1 ? i : k.bindType || p,
                  f = (m._data(h, "events") || {})[b.type] && m._data(h, "handle"),
                  f && f.apply(h, c),
                  f = g && h[g],
                  f && f.apply && m.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
              if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && m.acceptData(d) && g && d[p] && !m.isWindow(d)) {
                  l = d[g],
                  l && (d[g] = null),
                  m.event.triggered = p;
                  try {
                      d[p]()
                  } catch (r) {}
                  m.event.triggered = void 0,
                  l && (d[g] = l)
              }
              return b.result
          }
      },
      dispatch: function(a) {
          a = m.event.fix(a);
          var b,
              c,
              e,
              f,
              g,
              h = [],
              i = d.call(arguments),
              j = (m._data(this, "events") || {})[a.type] || [],
              k = m.event.special[a.type] || {};
          if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
              h = m.event.handlers.call(this, a, j),
              b = 0;
              while ((f = h[b++]) && !a.isPropagationStopped()) {
                  a.currentTarget = f.elem,
                  g = 0;
                  while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped())
                      (!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((m.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()))
              }
              return k.postDispatch && k.postDispatch.call(this, a), a.result
          }
      },
      handlers: function(a, b) {
          var c,
              d,
              e,
              f,
              g = [],
              h = b.delegateCount,
              i = a.target;
          if (h && i.nodeType && (!a.button || "click" !== a.type))
              for (; i != this; i = i.parentNode || this)
                  if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                      for (e = [], f = 0; h > f; f++)
                          d = b[f],
                          c = d.selector + " ",
                          void 0 === e[c] && (e[c] = d.needsContext ? m(c, this).index(i) >= 0 : m.find(c, this, null, [i]).length),
                          e[c] && e.push(d);
                      e.length && g.push({
                          elem: i,
                          handlers: e
                      })
                  }
          return h < b.length && g.push({
              elem: this,
              handlers: b.slice(h)
          }), g
      },
      fix: function(a) {
          if (a[m.expando])
              return a;
          var b,
              c,
              d,
              e = a.type,
              f = a,
              g = this.fixHooks[e];
          g || (this.fixHooks[e] = g = Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {}),
          d = g.props ? this.props.concat(g.props) : this.props,
          a = new m.Event(f),
          b = d.length;
          while (b--)
              c = d[b],
              a[c] = f[c];
          return a.target || (a.target = f.srcElement || y), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
      },
      props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
      fixHooks: {},
      keyHooks: {
          props: "char charCode key keyCode".split(" "),
          filter: function(a, b) {
              return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
          }
      },
      mouseHooks: {
          props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
          filter: function(a, b) {
              var c,
                  d,
                  e,
                  f = b.button,
                  g = b.fromElement;
              return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || y, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
          }
      },
      special: {
          load: {
              noBubble: !0
          },
          focus: {
              trigger: function() {
                  if (this !== ca() && this.focus)
                      try {
                          return this.focus(), !1
                      } catch (a) {}
              },
              delegateType: "focusin"
          },
          blur: {
              trigger: function() {
                  return this === ca() && this.blur ? (this.blur(), !1) : void 0
              },
              delegateType: "focusout"
          },
          click: {
              trigger: function() {
                  return m.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
              },
              _default: function(a) {
                  return m.nodeName(a.target, "a")
              }
          },
          beforeunload: {
              postDispatch: function(a) {
                  void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
              }
          }
      },
      simulate: function(a, b, c, d) {
          var e = m.extend(new m.Event, c, {
              type: a,
              isSimulated: !0,
              originalEvent: {}
          });
          d ? m.event.trigger(e, null, b) : m.event.dispatch.call(b, e),
          e.isDefaultPrevented() && c.preventDefault()
      }
  },
  m.removeEvent = y.removeEventListener ? function(a, b, c) {
      a.removeEventListener && a.removeEventListener(b, c, !1)
  } : function(a, b, c) {
      var d = "on" + b;
      a.detachEvent && (typeof a[d] === K && (a[d] = null), a.detachEvent(d, c))
  },
  m.Event = function(a, b) {
      return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? aa : ba) : this.type = a, b && m.extend(this, b), this.timeStamp = a && a.timeStamp || m.now(), void (this[m.expando] = !0)) : new m.Event(a, b)
  },
  m.Event.prototype = {
      isDefaultPrevented: ba,
      isPropagationStopped: ba,
      isImmediatePropagationStopped: ba,
      preventDefault: function() {
          var a = this.originalEvent;
          this.isDefaultPrevented = aa,
          a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
      },
      stopPropagation: function() {
          var a = this.originalEvent;
          this.isPropagationStopped = aa,
          a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
      },
      stopImmediatePropagation: function() {
          var a = this.originalEvent;
          this.isImmediatePropagationStopped = aa,
          a && a.stopImmediatePropagation && a.stopImmediatePropagation(),
          this.stopPropagation()
      }
  },
  m.each({
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout"
  }, function(a, b) {
      m.event.special[a] = {
          delegateType: b,
          bindType: b,
          handle: function(a) {
              var c,
                  d = this,
                  e = a.relatedTarget,
                  f = a.handleObj;
              return (!e || e !== d && !m.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
          }
      }
  }),
  k.submitBubbles || (m.event.special.submit = {
      setup: function() {
          return m.nodeName(this, "form") ? !1 : void m.event.add(this, "click._submit keypress._submit", function(a) {
              var b = a.target,
                  c = m.nodeName(b, "input") || m.nodeName(b, "button") ? b.form : void 0;
              c && !m._data(c, "submitBubbles") && (m.event.add(c, "submit._submit", function(a) {
                  a._submit_bubble = !0
              }), m._data(c, "submitBubbles", !0))
          })
      },
      postDispatch: function(a) {
          a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && m.event.simulate("submit", this.parentNode, a, !0))
      },
      teardown: function() {
          return m.nodeName(this, "form") ? !1 : void m.event.remove(this, "._submit")
      }
  }),
  k.changeBubbles || (m.event.special.change = {
      setup: function() {
          return X.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (m.event.add(this, "propertychange._change", function(a) {
              "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
          }), m.event.add(this, "click._change", function(a) {
              this._just_changed && !a.isTrigger && (this._just_changed = !1),
              m.event.simulate("change", this, a, !0)
          })), !1) : void m.event.add(this, "beforeactivate._change", function(a) {
              var b = a.target;
              X.test(b.nodeName) && !m._data(b, "changeBubbles") && (m.event.add(b, "change._change", function(a) {
                  !this.parentNode || a.isSimulated || a.isTrigger || m.event.simulate("change", this.parentNode, a, !0)
              }), m._data(b, "changeBubbles", !0))
          })
      },
      handle: function(a) {
          var b = a.target;
          return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
      },
      teardown: function() {
          return m.event.remove(this, "._change"), !X.test(this.nodeName)
      }
  }),
  k.focusinBubbles || m.each({
      focus: "focusin",
      blur: "focusout"
  }, function(a, b) {
      var c = function(a) {
          m.event.simulate(b, a.target, m.event.fix(a), !0)
      };
      m.event.special[b] = {
          setup: function() {
              var d = this.ownerDocument || this,
                  e = m._data(d, b);
              e || d.addEventListener(a, c, !0),
              m._data(d, b, (e || 0) + 1)
          },
          teardown: function() {
              var d = this.ownerDocument || this,
                  e = m._data(d, b) - 1;
              e ? m._data(d, b, e) : (d.removeEventListener(a, c, !0), m._removeData(d, b))
          }
      }
  }),
  m.fn.extend({
      on: function(a, b, c, d, e) {
          var f,
              g;
          if ("object" == typeof a) {
              "string" != typeof b && (c = c || b, b = void 0);
              for (f in a)
                  this.on(f, b, c, a[f], e);
              return this
          }
          if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1)
              d = ba;
          else if (!d)
              return this;
          return 1 === e && (g = d, d = function(a) {
              return m().off(a), g.apply(this, arguments)
          }, d.guid = g.guid || (g.guid = m.guid++)), this.each(function() {
              m.event.add(this, a, d, c, b)
          })
      },
      one: function(a, b, c, d) {
          return this.on(a, b, c, d, 1)
      },
      off: function(a, b, c) {
          var d,
              e;
          if (a && a.preventDefault && a.handleObj)
              return d = a.handleObj, m(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
          if ("object" == typeof a) {
              for (e in a)
                  this.off(e, b, a[e]);
              return this
          }
          return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = ba), this.each(function() {
              m.event.remove(this, a, c, b)
          })
      },
      trigger: function(a, b) {
          return this.each(function() {
              m.event.trigger(a, b, this)
          })
      },
      triggerHandler: function(a, b) {
          var c = this[0];
          return c ? m.event.trigger(a, b, c, !0) : void 0
      }
  });
  function da(a) {
      var b = ea.split("|"),
          c = a.createDocumentFragment();
      if (c.createElement)
          while (b.length)
              c.createElement(b.pop());
      return c
  }
  var ea = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
      fa = / jQuery\d+="(?:null|\d+)"/g,
      ga = new RegExp("<(?:" + ea + ")[\\s/>]", "i"),
      ha = /^\s+/,
      ia = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      ja = /<([\w:]+)/,
      ka = /<tbody/i,
      la = /<|&#?\w+;/,
      ma = /<(?:script|style|link)/i,
      na = /checked\s*(?:[^=]|=\s*.checked.)/i,
      oa = /^$|\/(?:java|ecma)script/i,
      pa = /^true\/(.*)/,
      qa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      ra = {
          option: [1, "<select multiple='multiple'>", "</select>"],
          legend: [1, "<fieldset>", "</fieldset>"],
          area: [1, "<map>", "</map>"],
          param: [1, "<object>", "</object>"],
          thead: [1, "<table>", "</table>"],
          tr: [2, "<table><tbody>", "</tbody></table>"],
          col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
          td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          _default: k.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
      },
      sa = da(y),
      ta = sa.appendChild(y.createElement("div"));
  ra.optgroup = ra.option,
  ra.tbody = ra.tfoot = ra.colgroup = ra.caption = ra.thead,
  ra.th = ra.td;
  function ua(a, b) {
      var c,
          d,
          e = 0,
          f = typeof a.getElementsByTagName !== K ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== K ? a.querySelectorAll(b || "*") : void 0;
      if (!f)
          for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)
              !b || m.nodeName(d, b) ? f.push(d) : m.merge(f, ua(d, b));
      return void 0 === b || b && m.nodeName(a, b) ? m.merge([a], f) : f
  }
  function va(a) {
      W.test(a.type) && (a.defaultChecked = a.checked)
  }
  function wa(a, b) {
      return m.nodeName(a, "table") && m.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
  }
  function xa(a) {
      return a.type = (null !== m.find.attr(a, "type")) + "/" + a.type, a
  }
  function ya(a) {
      var b = pa.exec(a.type);
      return b ? a.type = b[1] : a.removeAttribute("type"), a
  }
  function za(a, b) {
      for (var c, d = 0; null != (c = a[d]); d++)
          m._data(c, "globalEval", !b || m._data(b[d], "globalEval"))
  }
  function Aa(a, b) {
      if (1 === b.nodeType && m.hasData(a)) {
          var c,
              d,
              e,
              f = m._data(a),
              g = m._data(b, f),
              h = f.events;
          if (h) {
              delete g.handle,
              g.events = {};
              for (c in h)
                  for (d = 0, e = h[c].length; e > d; d++)
                      m.event.add(b, c, h[c][d])
          }
          g.data && (g.data = m.extend({}, g.data))
      }
  }
  function Ba(a, b) {
      var c,
          d,
          e;
      if (1 === b.nodeType) {
          if (c = b.nodeName.toLowerCase(), !k.noCloneEvent && b[m.expando]) {
              e = m._data(b);
              for (d in e.events)
                  m.removeEvent(b, d, e.handle);
              b.removeAttribute(m.expando)
          }
          "script" === c && b.text !== a.text ? (xa(b).text = a.text, ya(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), k.html5Clone && a.innerHTML && !m.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && W.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
      }
  }
  m.extend({
      clone: function(a, b, c) {
          var d,
              e,
              f,
              g,
              h,
              i = m.contains(a.ownerDocument, a);
          if (k.html5Clone || m.isXMLDoc(a) || !ga.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (ta.innerHTML = a.outerHTML, ta.removeChild(f = ta.firstChild)), !(k.noCloneEvent && k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || m.isXMLDoc(a)))
              for (d = ua(f), h = ua(a), g = 0; null != (e = h[g]); ++g)
                  d[g] && Ba(e, d[g]);
          if (b)
              if (c)
                  for (h = h || ua(a), d = d || ua(f), g = 0; null != (e = h[g]); g++)
                      Aa(e, d[g]);
              else
                  Aa(a, f);
          return d = ua(f, "script"), d.length > 0 && za(d, !i && ua(a, "script")), d = h = e = null, f
      },
      buildFragment: function(a, b, c, d) {
          for (var e, f, g, h, i, j, l, n = a.length, o = da(b), p = [], q = 0; n > q; q++)
              if (f = a[q], f || 0 === f)
                  if ("object" === m.type(f))
                      m.merge(p, f.nodeType ? [f] : f);
                  else if (la.test(f)) {
                      h = h || o.appendChild(b.createElement("div")),
                      i = (ja.exec(f) || ["", ""])[1].toLowerCase(),
                      l = ra[i] || ra._default,
                      h.innerHTML = l[1] + f.replace(ia, "<$1></$2>") + l[2],
                      e = l[0];
                      while (e--)
                          h = h.lastChild;
                      if (!k.leadingWhitespace && ha.test(f) && p.push(b.createTextNode(ha.exec(f)[0])), !k.tbody) {
                          f = "table" !== i || ka.test(f) ? "<table>" !== l[1] || ka.test(f) ? 0 : h : h.firstChild,
                          e = f && f.childNodes.length;
                          while (e--)
                              m.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j)
                      }
                      m.merge(p, h.childNodes),
                      h.textContent = "";
                      while (h.firstChild)
                          h.removeChild(h.firstChild);
                      h = o.lastChild
                  } else
                      p.push(b.createTextNode(f));
          h && o.removeChild(h),
          k.appendChecked || m.grep(ua(p, "input"), va),
          q = 0;
          while (f = p[q++])
              if ((!d || -1 === m.inArray(f, d)) && (g = m.contains(f.ownerDocument, f), h = ua(o.appendChild(f), "script"), g && za(h), c)) {
                  e = 0;
                  while (f = h[e++])
                      oa.test(f.type || "") && c.push(f)
              }
          return h = null, o
      },
      cleanData: function(a, b) {
          for (var d, e, f, g, h = 0, i = m.expando, j = m.cache, l = k.deleteExpando, n = m.event.special; null != (d = a[h]); h++)
              if ((b || m.acceptData(d)) && (f = d[i], g = f && j[f])) {
                  if (g.events)
                      for (e in g.events)
                          n[e] ? m.event.remove(d, e) : m.removeEvent(d, e, g.handle);
                  j[f] && (delete j[f], l ? delete d[i] : typeof d.removeAttribute !== K ? d.removeAttribute(i) : d[i] = null, c.push(f))
              }
      }
  }),
  m.fn.extend({
      text: function(a) {
          return V(this, function(a) {
              return void 0 === a ? m.text(this) : this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(a))
          }, null, a, arguments.length)
      },
      append: function() {
          return this.domManip(arguments, function(a) {
              if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                  var b = wa(this, a);
                  b.appendChild(a)
              }
          })
      },
      prepend: function() {
          return this.domManip(arguments, function(a) {
              if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                  var b = wa(this, a);
                  b.insertBefore(a, b.firstChild)
              }
          })
      },
      before: function() {
          return this.domManip(arguments, function(a) {
              this.parentNode && this.parentNode.insertBefore(a, this)
          })
      },
      after: function() {
          return this.domManip(arguments, function(a) {
              this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
          })
      },
      remove: function(a, b) {
          for (var c, d = a ? m.filter(a, this) : this, e = 0; null != (c = d[e]); e++)
              b || 1 !== c.nodeType || m.cleanData(ua(c)),
              c.parentNode && (b && m.contains(c.ownerDocument, c) && za(ua(c, "script")), c.parentNode.removeChild(c));
          return this
      },
      empty: function() {
          for (var a, b = 0; null != (a = this[b]); b++) {
              1 === a.nodeType && m.cleanData(ua(a, !1));
              while (a.firstChild)
                  a.removeChild(a.firstChild);
              a.options && m.nodeName(a, "select") && (a.options.length = 0)
          }
          return this
      },
      clone: function(a, b) {
          return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
              return m.clone(this, a, b)
          })
      },
      html: function(a) {
          return V(this, function(a) {
              var b = this[0] || {},
                  c = 0,
                  d = this.length;
              if (void 0 === a)
                  return 1 === b.nodeType ? b.innerHTML.replace(fa, "") : void 0;
              if (!("string" != typeof a || ma.test(a) || !k.htmlSerialize && ga.test(a) || !k.leadingWhitespace && ha.test(a) || ra[(ja.exec(a) || ["", ""])[1].toLowerCase()])) {
                  a = a.replace(ia, "<$1></$2>");
                  try {
                      for (; d > c; c++)
                          b = this[c] || {},
                          1 === b.nodeType && (m.cleanData(ua(b, !1)), b.innerHTML = a);
                      b = 0
                  } catch (e) {}
              }
              b && this.empty().append(a)
          }, null, a, arguments.length)
      },
      replaceWith: function() {
          var a = arguments[0];
          return this.domManip(arguments, function(b) {
              a = this.parentNode,
              m.cleanData(ua(this)),
              a && a.replaceChild(b, this)
          }), a && (a.length || a.nodeType) ? this : this.remove()
      },
      detach: function(a) {
          return this.remove(a, !0)
      },
      domManip: function(a, b) {
          a = e.apply([], a);
          var c,
              d,
              f,
              g,
              h,
              i,
              j = 0,
              l = this.length,
              n = this,
              o = l - 1,
              p = a[0],
              q = m.isFunction(p);
          if (q || l > 1 && "string" == typeof p && !k.checkClone && na.test(p))
              return this.each(function(c) {
                  var d = n.eq(c);
                  q && (a[0] = p.call(this, c, d.html())),
                  d.domManip(a, b)
              });
          if (l && (i = m.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes.length && (i = c), c)) {
              for (g = m.map(ua(i, "script"), xa), f = g.length; l > j; j++)
                  d = i,
                  j !== o && (d = m.clone(d, !0, !0), f && m.merge(g, ua(d, "script"))),
                  b.call(this[j], d, j);
              if (f)
                  for (h = g[g.length - 1].ownerDocument, m.map(g, ya), j = 0; f > j; j++)
                      d = g[j],
                      oa.test(d.type || "") && !m._data(d, "globalEval") && m.contains(h, d) && (d.src ? m._evalUrl && m._evalUrl(d.src) : m.globalEval((d.text || d.textContent || d.innerHTML || "").replace(qa, "")));
              i = c = null
          }
          return this
      }
  }),
  m.each({
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
  }, function(a, b) {
      m.fn[a] = function(a) {
          for (var c, d = 0, e = [], g = m(a), h = g.length - 1; h >= d; d++)
              c = d === h ? this : this.clone(!0),
              m(g[d])[b](c),
              f.apply(e, c.get());
          return this.pushStack(e)
      }
  });
  var Ca,
      Da = {};
  function Ea(b, c) {
      var d,
          e = m(c.createElement(b)).appendTo(c.body),
          f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : m.css(e[0], "display");
      return e.detach(), f
  }
  function Fa(a) {
      var b = y,
          c = Da[a];
      return c || (c = Ea(a, b), "none" !== c && c || (Ca = (Ca || m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Ca[0].contentWindow || Ca[0].contentDocument).document, b.write(), b.close(), c = Ea(a, b), Ca.detach()), Da[a] = c), c
  }
  !function() {
      var a;
      k.shrinkWrapBlocks = function() {
          if (null != a)
              return a;
          a = !1;
          var b,
              c,
              d;
          return c = y.getElementsByTagName("body")[0], c && c.style ? (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(y.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0
      }
  }();
  var Ga = /^margin/,
      Ha = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"),
      Ia,
      Ja,
      Ka = /^(top|right|bottom|left)$/;
  a.getComputedStyle ? (Ia = function(b) {
      return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null)
  }, Ja = function(a, b, c) {
      var d,
          e,
          f,
          g,
          h = a.style;
      return c = c || Ia(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || m.contains(a.ownerDocument, a) || (g = m.style(a, b)), Ha.test(g) && Ga.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
  }) : y.documentElement.currentStyle && (Ia = function(a) {
      return a.currentStyle
  }, Ja = function(a, b, c) {
      var d,
          e,
          f,
          g,
          h = a.style;
      return c = c || Ia(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Ha.test(g) && !Ka.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
  });
  function La(a, b) {
      return {
          get: function() {
              var c = a();
              if (null != c)
                  return c ? void delete this.get : (this.get = b).apply(this, arguments)
          }
      }
  }
  !function() {
      var b,
          c,
          d,
          e,
          f,
          g,
          h;
      if (b = y.createElement("div"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = d && d.style) {
          c.cssText = "float:left;opacity:.5",
          k.opacity = "0.5" === c.opacity,
          k.cssFloat = !!c.cssFloat,
          b.style.backgroundClip = "content-box",
          b.cloneNode(!0).style.backgroundClip = "",
          k.clearCloneStyle = "content-box" === b.style.backgroundClip,
          k.boxSizing = "" === c.boxSizing || "" === c.MozBoxSizing || "" === c.WebkitBoxSizing,
          m.extend(k, {
              reliableHiddenOffsets: function() {
                  return null == g && i(), g
              },
              boxSizingReliable: function() {
                  return null == f && i(), f
              },
              pixelPosition: function() {
                  return null == e && i(), e
              },
              reliableMarginRight: function() {
                  return null == h && i(), h
              }
          });
          function i() {
              var b,
                  c,
                  d,
                  i;
              c = y.getElementsByTagName("body")[0],
              c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", e = f = !1, h = !0, a.getComputedStyle && (e = "1%" !== (a.getComputedStyle(b, null) || {}).top, f = "4px" === (a.getComputedStyle(b, null) || {
                  width: "4px"
              }).width, i = b.appendChild(y.createElement("div")), i.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", b.style.width = "1px", h = !parseFloat((a.getComputedStyle(i, null) || {}).marginRight), b.removeChild(i)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = b.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", g = 0 === i[0].offsetHeight, g && (i[0].style.display = "", i[1].style.display = "none", g = 0 === i[0].offsetHeight), c.removeChild(d))
          }
      }
  }(),
  m.swap = function(a, b, c, d) {
      var e,
          f,
          g = {};
      for (f in b)
          g[f] = a.style[f],
          a.style[f] = b[f];
      e = c.apply(a, d || []);
      for (f in b)
          a.style[f] = g[f];
      return e
  };
  var Ma = /alpha\([^)]*\)/i,
      Na = /opacity\s*=\s*([^)]*)/,
      Oa = /^(none|table(?!-c[ea]).+)/,
      Pa = new RegExp("^(" + S + ")(.*)$", "i"),
      Qa = new RegExp("^([+-])=(" + S + ")", "i"),
      Ra = {
          position: "absolute",
          visibility: "hidden",
          display: "block"
      },
      Sa = {
          letterSpacing: "0",
          fontWeight: "400"
      },
      Ta = ["Webkit", "O", "Moz", "ms"];
  function Ua(a, b) {
      if (b in a)
          return b;
      var c = b.charAt(0).toUpperCase() + b.slice(1),
          d = b,
          e = Ta.length;
      while (e--)
          if (b = Ta[e] + c, b in a)
              return b;
      return d
  }
  function Va(a, b) {
      for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
          d = a[g],
          d.style && (f[g] = m._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && U(d) && (f[g] = m._data(d, "olddisplay", Fa(d.nodeName)))) : (e = U(d), (c && "none" !== c || !e) && m._data(d, "olddisplay", e ? c : m.css(d, "display"))));
      for (g = 0; h > g; g++)
          d = a[g],
          d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
      return a
  }
  function Wa(a, b, c) {
      var d = Pa.exec(b);
      return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
  }
  function Xa(a, b, c, d, e) {
      for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)
          "margin" === c && (g += m.css(a, c + T[f], !0, e)),
          d ? ("content" === c && (g -= m.css(a, "padding" + T[f], !0, e)), "margin" !== c && (g -= m.css(a, "border" + T[f] + "Width", !0, e))) : (g += m.css(a, "padding" + T[f], !0, e), "padding" !== c && (g += m.css(a, "border" + T[f] + "Width", !0, e)));
      return g
  }
  function Ya(a, b, c) {
      var d = !0,
          e = "width" === b ? a.offsetWidth : a.offsetHeight,
          f = Ia(a),
          g = k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, f);
      if (0 >= e || null == e) {
          if (e = Ja(a, b, f), (0 > e || null == e) && (e = a.style[b]), Ha.test(e))
              return e;
          d = g && (k.boxSizingReliable() || e === a.style[b]),
          e = parseFloat(e) || 0
      }
      return e + Xa(a, b, c || (g ? "border" : "content"), d, f) + "px"
  }
  m.extend({
      cssHooks: {
          opacity: {
              get: function(a, b) {
                  if (b) {
                      var c = Ja(a, "opacity");
                      return "" === c ? "1" : c
                  }
              }
          }
      },
      cssNumber: {
          columnCount: !0,
          fillOpacity: !0,
          flexGrow: !0,
          flexShrink: !0,
          fontWeight: !0,
          lineHeight: !0,
          opacity: !0,
          order: !0,
          orphans: !0,
          widows: !0,
          zIndex: !0,
          zoom: !0
      },
      cssProps: {
          "float": k.cssFloat ? "cssFloat" : "styleFloat"
      },
      style: function(a, b, c, d) {
          if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
              var e,
                  f,
                  g,
                  h = m.camelCase(b),
                  i = a.style;
              if (b = m.cssProps[h] || (m.cssProps[h] = Ua(i, h)), g = m.cssHooks[b] || m.cssHooks[h], void 0 === c)
                  return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
              if (f = typeof c, "string" === f && (e = Qa.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(m.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || m.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d)))))
                  try {
                      i[b] = c
                  } catch (j) {}
          }
      },
      css: function(a, b, c, d) {
          var e,
              f,
              g,
              h = m.camelCase(b);
          return b = m.cssProps[h] || (m.cssProps[h] = Ua(a.style, h)), g = m.cssHooks[b] || m.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Ja(a, b, d)), "normal" === f && b in Sa && (f = Sa[b]), "" === c || c ? (e = parseFloat(f), c === !0 || m.isNumeric(e) ? e || 0 : f) : f
      }
  }),
  m.each(["height", "width"], function(a, b) {
      m.cssHooks[b] = {
          get: function(a, c, d) {
              return c ? Oa.test(m.css(a, "display")) && 0 === a.offsetWidth ? m.swap(a, Ra, function() {
                  return Ya(a, b, d)
              }) : Ya(a, b, d) : void 0
          },
          set: function(a, c, d) {
              var e = d && Ia(a);
              return Wa(a, c, d ? Xa(a, b, d, k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, e), e) : 0)
          }
      }
  }),
  k.opacity || (m.cssHooks.opacity = {
      get: function(a, b) {
          return Na.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
      },
      set: function(a, b) {
          var c = a.style,
              d = a.currentStyle,
              e = m.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
              f = d && d.filter || c.filter || "";
          c.zoom = 1,
          (b >= 1 || "" === b) && "" === m.trim(f.replace(Ma, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = Ma.test(f) ? f.replace(Ma, e) : f + " " + e)
      }
  }),
  m.cssHooks.marginRight = La(k.reliableMarginRight, function(a, b) {
      return b ? m.swap(a, {
          display: "inline-block"
      }, Ja, [a, "marginRight"]) : void 0
  }),
  m.each({
      margin: "",
      padding: "",
      border: "Width"
  }, function(a, b) {
      m.cssHooks[a + b] = {
          expand: function(c) {
              for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)
                  e[a + T[d] + b] = f[d] || f[d - 2] || f[0];
              return e
          }
      },
      Ga.test(a) || (m.cssHooks[a + b].set = Wa)
  }),
  m.fn.extend({
      css: function(a, b) {
          return V(this, function(a, b, c) {
              var d,
                  e,
                  f = {},
                  g = 0;
              if (m.isArray(b)) {
                  for (d = Ia(a), e = b.length; e > g; g++)
                      f[b[g]] = m.css(a, b[g], !1, d);
                  return f
              }
              return void 0 !== c ? m.style(a, b, c) : m.css(a, b)
          }, a, b, arguments.length > 1)
      },
      show: function() {
          return Va(this, !0)
      },
      hide: function() {
          return Va(this)
      },
      toggle: function(a) {
          return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
              U(this) ? m(this).show() : m(this).hide()
          })
      }
  });
  function Za(a, b, c, d, e) {
      return new Za.prototype.init(a, b, c, d, e)
  }
  m.Tween = Za,
  Za.prototype = {
      constructor: Za,
      init: function(a, b, c, d, e, f) {
          this.elem = a,
          this.prop = c,
          this.easing = e || "swing",
          this.options = b,
          this.start = this.now = this.cur(),
          this.end = d,
          this.unit = f || (m.cssNumber[c] ? "" : "px")
      },
      cur: function() {
          var a = Za.propHooks[this.prop];
          return a && a.get ? a.get(this) : Za.propHooks._default.get(this)
      },
      run: function(a) {
          var b,
              c = Za.propHooks[this.prop];
          return this.options.duration ? this.pos = b = m.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Za.propHooks._default.set(this), this
      }
  },
  Za.prototype.init.prototype = Za.prototype,
  Za.propHooks = {
      _default: {
          get: function(a) {
              var b;
              return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = m.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
          },
          set: function(a) {
              m.fx.step[a.prop] ? m.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[m.cssProps[a.prop]] || m.cssHooks[a.prop]) ? m.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
          }
      }
  },
  Za.propHooks.scrollTop = Za.propHooks.scrollLeft = {
      set: function(a) {
          a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
      }
  },
  m.easing = {
      linear: function(a) {
          return a
      },
      swing: function(a) {
          return .5 - Math.cos(a * Math.PI) / 2
      }
  },
  m.fx = Za.prototype.init,
  m.fx.step = {};
  var $a,
      _a,
      ab = /^(?:toggle|show|hide)$/,
      bb = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"),
      cb = /queueHooks$/,
      db = [ib],
      eb = {
          "*": [function(a, b) {
              var c = this.createTween(a, b),
                  d = c.cur(),
                  e = bb.exec(b),
                  f = e && e[3] || (m.cssNumber[a] ? "" : "px"),
                  g = (m.cssNumber[a] || "px" !== f && +d) && bb.exec(m.css(c.elem, a)),
                  h = 1,
                  i = 20;
              if (g && g[3] !== f) {
                  f = f || g[3],
                  e = e || [],
                  g = +d || 1;
                  do h = h || ".5",
                  g /= h,
                  m.style(c.elem, a, g + f);
                  while (h !== (h = c.cur() / d) && 1 !== h && --i)
              }
              return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
          }]
      };
  function fb() {
      return setTimeout(function() {
          $a = void 0
      }), $a = m.now()
  }
  function gb(a, b) {
      var c,
          d = {
              height: a
          },
          e = 0;
      for (b = b ? 1 : 0; 4 > e; e += 2 - b)
          c = T[e],
          d["margin" + c] = d["padding" + c] = a;
      return b && (d.opacity = d.width = a), d
  }
  function hb(a, b, c) {
      for (var d, e = (eb[b] || []).concat(eb["*"]), f = 0, g = e.length; g > f; f++)
          if (d = e[f].call(c, b, a))
              return d
  }
  function ib(a, b, c) {
      var d,
          e,
          f,
          g,
          h,
          i,
          j,
          l,
          n = this,
          o = {},
          p = a.style,
          q = a.nodeType && U(a),
          r = m._data(a, "fxshow");
      c.queue || (h = m._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
          h.unqueued || i()
      }), h.unqueued++, n.always(function() {
          n.always(function() {
              h.unqueued--,
              m.queue(a, "fx").length || h.empty.fire()
          })
      })),
      1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY], j = m.css(a, "display"), l = "none" === j ? m._data(a, "olddisplay") || Fa(a.nodeName) : j, "inline" === l && "none" === m.css(a, "float") && (k.inlineBlockNeedsLayout && "inline" !== Fa(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")),
      c.overflow && (p.overflow = "hidden", k.shrinkWrapBlocks() || n.always(function() {
          p.overflow = c.overflow[0],
          p.overflowX = c.overflow[1],
          p.overflowY = c.overflow[2]
      }));
      for (d in b)
          if (e = b[d], ab.exec(e)) {
              if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                  if ("show" !== e || !r || void 0 === r[d])
                      continue;
                  q = !0
              }
              o[d] = r && r[d] || m.style(a, d)
          } else
              j = void 0;
      if (m.isEmptyObject(o))
          "inline" === ("none" === j ? Fa(a.nodeName) : j) && (p.display = j);
      else {
          r ? "hidden" in r && (q = r.hidden) : r = m._data(a, "fxshow", {}),
          f && (r.hidden = !q),
          q ? m(a).show() : n.done(function() {
              m(a).hide()
          }),
          n.done(function() {
              var b;
              m._removeData(a, "fxshow");
              for (b in o)
                  m.style(a, b, o[b])
          });
          for (d in o)
              g = hb(q ? r[d] : 0, d, n),
              d in r || (r[d] = g.start, q && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
      }
  }
  function jb(a, b) {
      var c,
          d,
          e,
          f,
          g;
      for (c in a)
          if (d = m.camelCase(c), e = b[d], f = a[c], m.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = m.cssHooks[d], g && "expand" in g) {
              f = g.expand(f),
              delete a[d];
              for (c in f)
                  c in a || (a[c] = f[c], b[c] = e)
          } else
              b[d] = e
  }
  function kb(a, b, c) {
      var d,
          e,
          f = 0,
          g = db.length,
          h = m.Deferred().always(function() {
              delete i.elem
          }),
          i = function() {
              if (e)
                  return !1;
              for (var b = $a || fb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)
                  j.tweens[g].run(f);
              return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
          },
          j = h.promise({
              elem: a,
              props: m.extend({}, b),
              opts: m.extend(!0, {
                  specialEasing: {}
              }, c),
              originalProperties: b,
              originalOptions: c,
              startTime: $a || fb(),
              duration: c.duration,
              tweens: [],
              createTween: function(b, c) {
                  var d = m.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                  return j.tweens.push(d), d
              },
              stop: function(b) {
                  var c = 0,
                      d = b ? j.tweens.length : 0;
                  if (e)
                      return this;
                  for (e = !0; d > c; c++)
                      j.tweens[c].run(1);
                  return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
              }
          }),
          k = j.props;
      for (jb(k, j.opts.specialEasing); g > f; f++)
          if (d = db[f].call(j, a, k, j.opts))
              return d;
      return m.map(k, hb, j), m.isFunction(j.opts.start) && j.opts.start.call(a, j), m.fx.timer(m.extend(i, {
          elem: a,
          anim: j,
          queue: j.opts.queue
      })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
  }
  m.Animation = m.extend(kb, {
      tweener: function(a, b) {
          m.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
          for (var c, d = 0, e = a.length; e > d; d++)
              c = a[d],
              eb[c] = eb[c] || [],
              eb[c].unshift(b)
      },
      prefilter: function(a, b) {
          b ? db.unshift(a) : db.push(a)
      }
  }),
  m.speed = function(a, b, c) {
      var d = a && "object" == typeof a ? m.extend({}, a) : {
          complete: c || !c && b || m.isFunction(a) && a,
          duration: a,
          easing: c && b || b && !m.isFunction(b) && b
      };
      return d.duration = m.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in m.fx.speeds ? m.fx.speeds[d.duration] : m.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
          m.isFunction(d.old) && d.old.call(this),
          d.queue && m.dequeue(this, d.queue)
      }, d
  },
  m.fn.extend({
      fadeTo: function(a, b, c, d) {
          return this.filter(U).css("opacity", 0).show().end().animate({
              opacity: b
          }, a, c, d)
      },
      animate: function(a, b, c, d) {
          var e = m.isEmptyObject(a),
              f = m.speed(b, c, d),
              g = function() {
                  var b = kb(this, m.extend({}, a), f);
                  (e || m._data(this, "finish")) && b.stop(!0)
              };
          return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
      },
      stop: function(a, b, c) {
          var d = function(a) {
              var b = a.stop;
              delete a.stop,
              b(c)
          };
          return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
              var b = !0,
                  e = null != a && a + "queueHooks",
                  f = m.timers,
                  g = m._data(this);
              if (e)
                  g[e] && g[e].stop && d(g[e]);
              else
                  for (e in g)
                      g[e] && g[e].stop && cb.test(e) && d(g[e]);
              for (e = f.length; e--;)
                  f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
              (b || !c) && m.dequeue(this, a)
          })
      },
      finish: function(a) {
          return a !== !1 && (a = a || "fx"), this.each(function() {
              var b,
                  c = m._data(this),
                  d = c[a + "queue"],
                  e = c[a + "queueHooks"],
                  f = m.timers,
                  g = d ? d.length : 0;
              for (c.finish = !0, m.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;)
                  f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
              for (b = 0; g > b; b++)
                  d[b] && d[b].finish && d[b].finish.call(this);
              delete c.finish
          })
      }
  }),
  m.each(["toggle", "show", "hide"], function(a, b) {
      var c = m.fn[b];
      m.fn[b] = function(a, d, e) {
          return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gb(b, !0), a, d, e)
      }
  }),
  m.each({
      slideDown: gb("show"),
      slideUp: gb("hide"),
      slideToggle: gb("toggle"),
      fadeIn: {
          opacity: "show"
      },
      fadeOut: {
          opacity: "hide"
      },
      fadeToggle: {
          opacity: "toggle"
      }
  }, function(a, b) {
      m.fn[a] = function(a, c, d) {
          return this.animate(b, a, c, d)
      }
  }),
  m.timers = [],
  m.fx.tick = function() {
      var a,
          b = m.timers,
          c = 0;
      for ($a = m.now(); c < b.length; c++)
          a = b[c],
          a() || b[c] !== a || b.splice(c--, 1);
      b.length || m.fx.stop(),
      $a = void 0
  },
  m.fx.timer = function(a) {
      m.timers.push(a),
      a() ? m.fx.start() : m.timers.pop()
  },
  m.fx.interval = 13,
  m.fx.start = function() {
      _a || (_a = setInterval(m.fx.tick, m.fx.interval))
  },
  m.fx.stop = function() {
      clearInterval(_a),
      _a = null
  },
  m.fx.speeds = {
      slow: 600,
      fast: 200,
      _default: 400
  },
  m.fn.delay = function(a, b) {
      return a = m.fx ? m.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
          var d = setTimeout(b, a);
          c.stop = function() {
              clearTimeout(d)
          }
      })
  },
  function() {
      var a,
          b,
          c,
          d,
          e;
      b = y.createElement("div"),
      b.setAttribute("className", "t"),
      b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
      d = b.getElementsByTagName("a")[0],
      c = y.createElement("select"),
      e = c.appendChild(y.createElement("option")),
      a = b.getElementsByTagName("input")[0],
      d.style.cssText = "top:1px",
      k.getSetAttribute = "t" !== b.className,
      k.style = /top/.test(d.getAttribute("style")),
      k.hrefNormalized = "/a" === d.getAttribute("href"),
      k.checkOn = !!a.value,
      k.optSelected = e.selected,
      k.enctype = !!y.createElement("form").enctype,
      c.disabled = !0,
      k.optDisabled = !e.disabled,
      a = y.createElement("input"),
      a.setAttribute("value", ""),
      k.input = "" === a.getAttribute("value"),
      a.value = "t",
      a.setAttribute("type", "radio"),
      k.radioValue = "t" === a.value
  }();
  var lb = /\r/g;
  m.fn.extend({
      val: function(a) {
          var b,
              c,
              d,
              e = this[0];
          {
              if (arguments.length)
                  return d = m.isFunction(a), this.each(function(c) {
                      var e;
                      1 === this.nodeType && (e = d ? a.call(this, c, m(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : m.isArray(e) && (e = m.map(e, function(a) {
                          return null == a ? "" : a + ""
                      })), b = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                  });
              if (e)
                  return b = m.valHooks[e.type] || m.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(lb, "") : null == c ? "" : c)
          }
      }
  }),
  m.extend({
      valHooks: {
          option: {
              get: function(a) {
                  var b = m.find.attr(a, "value");
                  return null != b ? b : m.trim(m.text(a))
              }
          },
          select: {
              get: function(a) {
                  for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                      if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && m.nodeName(c.parentNode, "optgroup"))) {
                          if (b = m(c).val(), f)
                              return b;
                          g.push(b)
                      }
                  return g
              },
              set: function(a, b) {
                  var c,
                      d,
                      e = a.options,
                      f = m.makeArray(b),
                      g = e.length;
                  while (g--)
                      if (d = e[g], m.inArray(m.valHooks.option.get(d), f) >= 0)
                          try {
                              d.selected = c = !0
                          } catch (h) {
                              d.scrollHeight
                          }
                      else
                          d.selected = !1;
                  return c || (a.selectedIndex = -1), e
              }
          }
      }
  }),
  m.each(["radio", "checkbox"], function() {
      m.valHooks[this] = {
          set: function(a, b) {
              return m.isArray(b) ? a.checked = m.inArray(m(a).val(), b) >= 0 : void 0
          }
      },
      k.checkOn || (m.valHooks[this].get = function(a) {
          return null === a.getAttribute("value") ? "on" : a.value
      })
  });
  var mb,
      nb,
      ob = m.expr.attrHandle,
      pb = /^(?:checked|selected)$/i,
      qb = k.getSetAttribute,
      rb = k.input;
  m.fn.extend({
      attr: function(a, b) {
          return V(this, m.attr, a, b, arguments.length > 1)
      },
      removeAttr: function(a) {
          return this.each(function() {
              m.removeAttr(this, a)
          })
      }
  }),
  m.extend({
      attr: function(a, b, c) {
          var d,
              e,
              f = a.nodeType;
          if (a && 3 !== f && 8 !== f && 2 !== f)
              return typeof a.getAttribute === K ? m.prop(a, b, c) : (1 === f && m.isXMLDoc(a) || (b = b.toLowerCase(), d = m.attrHooks[b] || (m.expr.match.bool.test(b) ? nb : mb)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = m.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void m.removeAttr(a, b))
      },
      removeAttr: function(a, b) {
          var c,
              d,
              e = 0,
              f = b && b.match(E);
          if (f && 1 === a.nodeType)
              while (c = f[e++])
                  d = m.propFix[c] || c,
                  m.expr.match.bool.test(c) ? rb && qb || !pb.test(c) ? a[d] = !1 : a[m.camelCase("default-" + c)] = a[d] = !1 : m.attr(a, c, ""),
                  a.removeAttribute(qb ? c : d)
      },
      attrHooks: {
          type: {
              set: function(a, b) {
                  if (!k.radioValue && "radio" === b && m.nodeName(a, "input")) {
                      var c = a.value;
                      return a.setAttribute("type", b), c && (a.value = c), b
                  }
              }
          }
      }
  }),
  nb = {
      set: function(a, b, c) {
          return b === !1 ? m.removeAttr(a, c) : rb && qb || !pb.test(c) ? a.setAttribute(!qb && m.propFix[c] || c, c) : a[m.camelCase("default-" + c)] = a[c] = !0, c
      }
  },
  m.each(m.expr.match.bool.source.match(/\w+/g), function(a, b) {
      var c = ob[b] || m.find.attr;
      ob[b] = rb && qb || !pb.test(b) ? function(a, b, d) {
          var e,
              f;
          return d || (f = ob[b], ob[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, ob[b] = f), e
      } : function(a, b, c) {
          return c ? void 0 : a[m.camelCase("default-" + b)] ? b.toLowerCase() : null
      }
  }),
  rb && qb || (m.attrHooks.value = {
      set: function(a, b, c) {
          return m.nodeName(a, "input") ? void (a.defaultValue = b) : mb && mb.set(a, b, c)
      }
  }),
  qb || (mb = {
      set: function(a, b, c) {
          var d = a.getAttributeNode(c);
          return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
      }
  }, ob.id = ob.name = ob.coords = function(a, b, c) {
      var d;
      return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
  }, m.valHooks.button = {
      get: function(a, b) {
          var c = a.getAttributeNode(b);
          return c && c.specified ? c.value : void 0
      },
      set: mb.set
  }, m.attrHooks.contenteditable = {
      set: function(a, b, c) {
          mb.set(a, "" === b ? !1 : b, c)
      }
  }, m.each(["width", "height"], function(a, b) {
      m.attrHooks[b] = {
          set: function(a, c) {
              return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
          }
      }
  })),
  k.style || (m.attrHooks.style = {
      get: function(a) {
          return a.style.cssText || void 0
      },
      set: function(a, b) {
          return a.style.cssText = b + ""
      }
  });
  var sb = /^(?:input|select|textarea|button|object)$/i,
      tb = /^(?:a|area)$/i;
  m.fn.extend({
      prop: function(a, b) {
          return V(this, m.prop, a, b, arguments.length > 1)
      },
      removeProp: function(a) {
          return a = m.propFix[a] || a, this.each(function() {
              try {
                  this[a] = void 0,
                  delete this[a]
              } catch (b) {}
          })
      }
  }),
  m.extend({
      propFix: {
          "for": "htmlFor",
          "class": "className"
      },
      prop: function(a, b, c) {
          var d,
              e,
              f,
              g = a.nodeType;
          if (a && 3 !== g && 8 !== g && 2 !== g)
              return f = 1 !== g || !m.isXMLDoc(a), f && (b = m.propFix[b] || b, e = m.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
      },
      propHooks: {
          tabIndex: {
              get: function(a) {
                  var b = m.find.attr(a, "tabindex");
                  return b ? parseInt(b, 10) : sb.test(a.nodeName) || tb.test(a.nodeName) && a.href ? 0 : -1
              }
          }
      }
  }),
  k.hrefNormalized || m.each(["href", "src"], function(a, b) {
      m.propHooks[b] = {
          get: function(a) {
              return a.getAttribute(b, 4)
          }
      }
  }),
  k.optSelected || (m.propHooks.selected = {
      get: function(a) {
          var b = a.parentNode;
          return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
      }
  }),
  m.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
      m.propFix[this.toLowerCase()] = this
  }),
  k.enctype || (m.propFix.enctype = "encoding");
  var ub = /[\t\r\n\f]/g;
  m.fn.extend({
      addClass: function(a) {
          var b,
              c,
              d,
              e,
              f,
              g,
              h = 0,
              i = this.length,
              j = "string" == typeof a && a;
          if (m.isFunction(a))
              return this.each(function(b) {
                  m(this).addClass(a.call(this, b, this.className))
              });
          if (j)
              for (b = (a || "").match(E) || []; i > h; h++)
                  if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ub, " ") : " ")) {
                      f = 0;
                      while (e = b[f++])
                          d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                      g = m.trim(d),
                      c.className !== g && (c.className = g)
                  }
          return this
      },
      removeClass: function(a) {
          var b,
              c,
              d,
              e,
              f,
              g,
              h = 0,
              i = this.length,
              j = 0 === arguments.length || "string" == typeof a && a;
          if (m.isFunction(a))
              return this.each(function(b) {
                  m(this).removeClass(a.call(this, b, this.className))
              });
          if (j)
              for (b = (a || "").match(E) || []; i > h; h++)
                  if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ub, " ") : "")) {
                      f = 0;
                      while (e = b[f++])
                          while (d.indexOf(" " + e + " ") >= 0)
                              d = d.replace(" " + e + " ", " ");
                      g = a ? m.trim(d) : "",
                      c.className !== g && (c.className = g)
                  }
          return this
      },
      toggleClass: function(a, b) {
          var c = typeof a;
          return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(m.isFunction(a) ? function(c) {
              m(this).toggleClass(a.call(this, c, this.className, b), b)
          } : function() {
              if ("string" === c) {
                  var b,
                      d = 0,
                      e = m(this),
                      f = a.match(E) || [];
                  while (b = f[d++])
                      e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
              } else
                  (c === K || "boolean" === c) && (this.className && m._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : m._data(this, "__className__") || "")
          })
      },
      hasClass: function(a) {
          for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
              if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ub, " ").indexOf(b) >= 0)
                  return !0;
          return !1
      }
  }),
  m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
      m.fn[b] = function(a, c) {
          return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
      }
  }),
  m.fn.extend({
      hover: function(a, b) {
          return this.mouseenter(a).mouseleave(b || a)
      },
      bind: function(a, b, c) {
          return this.on(a, null, b, c)
      },
      unbind: function(a, b) {
          return this.off(a, null, b)
      },
      delegate: function(a, b, c, d) {
          return this.on(b, a, c, d)
      },
      undelegate: function(a, b, c) {
          return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
      }
  });
  var vb = m.now(),
      wb = /\?/,
      xb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  m.parseJSON = function(b) {
      if (a.JSON && a.JSON.parse)
          return a.JSON.parse(b + "");
      var c,
          d = null,
          e = m.trim(b + "");
      return e && !m.trim(e.replace(xb, function(a, b, e, f) {
          return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
      })) ? Function("return " + e)() : m.error("Invalid JSON: " + b)
  },
  m.parseXML = function(b) {
      var c,
          d;
      if (!b || "string" != typeof b)
          return null;
      try {
          a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
      } catch (e) {
          c = void 0
      }
      return c && c.documentElement && !c.getElementsByTagName("parsererror").length || m.error("Invalid XML: " + b), c
  };
  var yb,
      zb,
      Ab = /#.*$/,
      Bb = /([?&])_=[^&]*/,
      Cb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
      Db = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      Eb = /^(?:GET|HEAD)$/,
      Fb = /^\/\//,
      Gb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
      Hb = {},
      Ib = {},
      Jb = "*/".concat("*");
  try {
      zb = location.href
  } catch (Kb) {
      zb = y.createElement("a"),
      zb.href = "",
      zb = zb.href
  }
  yb = Gb.exec(zb.toLowerCase()) || [];
  function Lb(a) {
      return function(b, c) {
          "string" != typeof b && (c = b, b = "*");
          var d,
              e = 0,
              f = b.toLowerCase().match(E) || [];
          if (m.isFunction(c))
              while (d = f[e++])
                  "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
      }
  }
  function Mb(a, b, c, d) {
      var e = {},
          f = a === Ib;
      function g(h) {
          var i;
          return e[h] = !0, m.each(a[h] || [], function(a, h) {
              var j = h(b, c, d);
              return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
          }), i
      }
      return g(b.dataTypes[0]) || !e["*"] && g("*")
  }
  function Nb(a, b) {
      var c,
          d,
          e = m.ajaxSettings.flatOptions || {};
      for (d in b)
          void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
      return c && m.extend(!0, a, c), a
  }
  function Ob(a, b, c) {
      var d,
          e,
          f,
          g,
          h = a.contents,
          i = a.dataTypes;
      while ("*" === i[0])
          i.shift(),
          void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
      if (e)
          for (g in h)
              if (h[g] && h[g].test(e)) {
                  i.unshift(g);
                  break
              }
      if (i[0] in c)
          f = i[0];
      else {
          for (g in c) {
              if (!i[0] || a.converters[g + " " + i[0]]) {
                  f = g;
                  break
              }
              d || (d = g)
          }
          f = f || d
      }
      return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
  }
  function Pb(a, b, c, d) {
      var e,
          f,
          g,
          h,
          i,
          j = {},
          k = a.dataTypes.slice();
      if (k[1])
          for (g in a.converters)
              j[g.toLowerCase()] = a.converters[g];
      f = k.shift();
      while (f)
          if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
              if ("*" === f)
                  f = i;
              else if ("*" !== i && i !== f) {
                  if (g = j[i + " " + f] || j["* " + f], !g)
                      for (e in j)
                          if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                              g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                              break
                          }
                  if (g !== !0)
                      if (g && a["throws"])
                          b = g(b);
                      else
                          try {
                              b = g(b)
                          } catch (l) {
                              return {
                                  state: "parsererror",
                                  error: g ? l : "No conversion from " + i + " to " + f
                              }
                          }
              }
      return {
          state: "success",
          data: b
      }
  }
  m.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
          url: zb,
          type: "GET",
          isLocal: Db.test(yb[1]),
          global: !0,
          processData: !0,
          async: !0,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          accepts: {
              "*": Jb,
              text: "text/plain",
              html: "text/html",
              xml: "application/xml, text/xml",
              json: "application/json, text/javascript"
          },
          contents: {
              xml: /xml/,
              html: /html/,
              json: /json/
          },
          responseFields: {
              xml: "responseXML",
              text: "responseText",
              json: "responseJSON"
          },
          converters: {
              "* text": String,
              "text html": !0,
              "text json": m.parseJSON,
              "text xml": m.parseXML
          },
          flatOptions: {
              url: !0,
              context: !0
          }
      },
      ajaxSetup: function(a, b) {
          return b ? Nb(Nb(a, m.ajaxSettings), b) : Nb(m.ajaxSettings, a)
      },
      ajaxPrefilter: Lb(Hb),
      ajaxTransport: Lb(Ib),
      ajax: function(a, b) {
          "object" == typeof a && (b = a, a = void 0),
          b = b || {};
          var c,
              d,
              e,
              f,
              g,
              h,
              i,
              j,
              k = m.ajaxSetup({}, b),
              l = k.context || k,
              n = k.context && (l.nodeType || l.jquery) ? m(l) : m.event,
              o = m.Deferred(),
              p = m.Callbacks("once memory"),
              q = k.statusCode || {},
              r = {},
              s = {},
              t = 0,
              u = "canceled",
              v = {
                  readyState: 0,
                  getResponseHeader: function(a) {
                      var b;
                      if (2 === t) {
                          if (!j) {
                              j = {};
                              while (b = Cb.exec(f))
                                  j[b[1].toLowerCase()] = b[2]
                          }
                          b = j[a.toLowerCase()]
                      }
                      return null == b ? null : b
                  },
                  getAllResponseHeaders: function() {
                      return 2 === t ? f : null
                  },
                  setRequestHeader: function(a, b) {
                      var c = a.toLowerCase();
                      return t || (a = s[c] = s[c] || a, r[a] = b), this
                  },
                  overrideMimeType: function(a) {
                      return t || (k.mimeType = a), this
                  },
                  statusCode: function(a) {
                      var b;
                      if (a)
                          if (2 > t)
                              for (b in a)
                                  q[b] = [q[b], a[b]];
                          else
                              v.always(a[v.status]);
                      return this
                  },
                  abort: function(a) {
                      var b = a || u;
                      return i && i.abort(b), x(0, b), this
                  }
              };
          if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || zb) + "").replace(Ab, "").replace(Fb, yb[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = m.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (c = Gb.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === yb[1] && c[2] === yb[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (yb[3] || ("http:" === yb[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = m.param(k.data, k.traditional)), Mb(Hb, k, b, v), 2 === t)
              return v;
          h = m.event && k.global,
          h && 0 === m.active++ && m.event.trigger("ajaxStart"),
          k.type = k.type.toUpperCase(),
          k.hasContent = !Eb.test(k.type),
          e = k.url,
          k.hasContent || (k.data && (e = k.url += (wb.test(e) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = Bb.test(e) ? e.replace(Bb, "$1_=" + vb++) : e + (wb.test(e) ? "&" : "?") + "_=" + vb++)),
          k.ifModified && (m.lastModified[e] && v.setRequestHeader("If-Modified-Since", m.lastModified[e]), m.etag[e] && v.setRequestHeader("If-None-Match", m.etag[e])),
          (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType),
          v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + Jb + "; q=0.01" : "") : k.accepts["*"]);
          for (d in k.headers)
              v.setRequestHeader(d, k.headers[d]);
          if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t))
              return v.abort();
          u = "abort";
          for (d in {
              success: 1,
              error: 1,
              complete: 1
          })
              v[d](k[d]);
          if (i = Mb(Ib, k, b, v)) {
              v.readyState = 1,
              h && n.trigger("ajaxSend", [v, k]),
              k.async && k.timeout > 0 && (g = setTimeout(function() {
                  v.abort("timeout")
              }, k.timeout));
              try {
                  t = 1,
                  i.send(r, x)
              } catch (w) {
                  if (!(2 > t))
                      throw w;
                  x(-1, w)
              }
          } else
              x(-1, "No Transport");
          function x(a, b, c, d) {
              var j,
                  r,
                  s,
                  u,
                  w,
                  x = b;
              2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = Ob(k, v, c)), u = Pb(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (m.lastModified[e] = w), w = v.getResponseHeader("etag"), w && (m.etag[e] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, h && n.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), h && (n.trigger("ajaxComplete", [v, k]), --m.active || m.event.trigger("ajaxStop")))
          }
          return v
      },
      getJSON: function(a, b, c) {
          return m.get(a, b, c, "json")
      },
      getScript: function(a, b) {
          return m.get(a, void 0, b, "script")
      }
  }),
  m.each(["get", "post"], function(a, b) {
      m[b] = function(a, c, d, e) {
          return m.isFunction(c) && (e = e || d, d = c, c = void 0), m.ajax({
              url: a,
              type: b,
              dataType: e,
              data: c,
              success: d
          })
      }
  }),
  m._evalUrl = function(a) {
      return m.ajax({
          url: a,
          type: "GET",
          dataType: "script",
          async: !1,
          global: !1,
          "throws": !0
      })
  },
  m.fn.extend({
      wrapAll: function(a) {
          if (m.isFunction(a))
              return this.each(function(b) {
                  m(this).wrapAll(a.call(this, b))
              });
          if (this[0]) {
              var b = m(a, this[0].ownerDocument).eq(0).clone(!0);
              this[0].parentNode && b.insertBefore(this[0]),
              b.map(function() {
                  var a = this;
                  while (a.firstChild && 1 === a.firstChild.nodeType)
                      a = a.firstChild;
                  return a
              }).append(this)
          }
          return this
      },
      wrapInner: function(a) {
          return this.each(m.isFunction(a) ? function(b) {
              m(this).wrapInner(a.call(this, b))
          } : function() {
              var b = m(this),
                  c = b.contents();
              c.length ? c.wrapAll(a) : b.append(a)
          })
      },
      wrap: function(a) {
          var b = m.isFunction(a);
          return this.each(function(c) {
              m(this).wrapAll(b ? a.call(this, c) : a)
          })
      },
      unwrap: function() {
          return this.parent().each(function() {
              m.nodeName(this, "body") || m(this).replaceWith(this.childNodes)
          }).end()
      }
  }),
  m.expr.filters.hidden = function(a) {
      return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !k.reliableHiddenOffsets() && "none" === (a.style && a.style.display || m.css(a, "display"))
  },
  m.expr.filters.visible = function(a) {
      return !m.expr.filters.hidden(a)
  };
  var Qb = /%20/g,
      Rb = /\[\]$/,
      Sb = /\r?\n/g,
      Tb = /^(?:submit|button|image|reset|file)$/i,
      Ub = /^(?:input|select|textarea|keygen)/i;
  function Vb(a, b, c, d) {
      var e;
      if (m.isArray(b))
          m.each(b, function(b, e) {
              c || Rb.test(a) ? d(a, e) : Vb(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
          });
      else if (c || "object" !== m.type(b))
          d(a, b);
      else
          for (e in b)
              Vb(a + "[" + e + "]", b[e], c, d)
  }
  m.param = function(a, b) {
      var c,
          d = [],
          e = function(a, b) {
              b = m.isFunction(b) ? b() : null == b ? "" : b,
              d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
          };
      if (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.jquery && !m.isPlainObject(a))
          m.each(a, function() {
              e(this.name, this.value)
          });
      else
          for (c in a)
              Vb(c, a[c], b, e);
      return d.join("&").replace(Qb, "+")
  },
  m.fn.extend({
      serialize: function() {
          return m.param(this.serializeArray())
      },
      serializeArray: function() {
          return this.map(function() {
              var a = m.prop(this, "elements");
              return a ? m.makeArray(a) : this
          }).filter(function() {
              var a = this.type;
              return this.name && !m(this).is(":disabled") && Ub.test(this.nodeName) && !Tb.test(a) && (this.checked || !W.test(a))
          }).map(function(a, b) {
              var c = m(this).val();
              return null == c ? null : m.isArray(c) ? m.map(c, function(a) {
                  return {
                      name: b.name,
                      value: a.replace(Sb, "\r\n")
                  }
              }) : {
                  name: b.name,
                  value: c.replace(Sb, "\r\n")
              }
          }).get()
      }
  }),
  m.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
      return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Zb() || $b()
  } : Zb;
  var Wb = 0,
      Xb = {},
      Yb = m.ajaxSettings.xhr();
  a.attachEvent && a.attachEvent("onunload", function() {
      for (var a in Xb)
          Xb[a](void 0, !0)
  }),
  k.cors = !!Yb && "withCredentials" in Yb,
  Yb = k.ajax = !!Yb,
  Yb && m.ajaxTransport(function(a) {
      if (!a.crossDomain || k.cors) {
          var b;
          return {
              send: function(c, d) {
                  var e,
                      f = a.xhr(),
                      g = ++Wb;
                  if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                      for (e in a.xhrFields)
                          f[e] = a.xhrFields[e];
                  a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType),
                  a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                  for (e in c)
                      void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                  f.send(a.hasContent && a.data || null),
                  b = function(c, e) {
                      var h,
                          i,
                          j;
                      if (b && (e || 4 === f.readyState))
                          if (delete Xb[g], b = void 0, f.onreadystatechange = m.noop, e)
                              4 !== f.readyState && f.abort();
                          else {
                              j = {},
                              h = f.status,
                              "string" == typeof f.responseText && (j.text = f.responseText);
                              try {
                                  i = f.statusText
                              } catch (k) {
                                  i = ""
                              }
                              h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
                          }
                      j && d(h, i, j, f.getAllResponseHeaders())
                  },
                  a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = Xb[g] = b : b()
              },
              abort: function() {
                  b && b(void 0, !0)
              }
          }
      }
  });
  function Zb() {
      try {
          return new a.XMLHttpRequest
      } catch (b) {}
  }
  function $b() {
      try {
          return new a.ActiveXObject("Microsoft.XMLHTTP")
      } catch (b) {}
  }
  m.ajaxSetup({
      accepts: {
          script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
      },
      contents: {
          script: /(?:java|ecma)script/
      },
      converters: {
          "text script": function(a) {
              return m.globalEval(a), a
          }
      }
  }),
  m.ajaxPrefilter("script", function(a) {
      void 0 === a.cache && (a.cache = !1),
      a.crossDomain && (a.type = "GET", a.global = !1)
  }),
  m.ajaxTransport("script", function(a) {
      if (a.crossDomain) {
          var b,
              c = y.head || m("head")[0] || y.documentElement;
          return {
              send: function(d, e) {
                  b = y.createElement("script"),
                  b.async = !0,
                  a.scriptCharset && (b.charset = a.scriptCharset),
                  b.src = a.url,
                  b.onload = b.onreadystatechange = function(a, c) {
                      (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
                  },
                  c.insertBefore(b, c.firstChild)
              },
              abort: function() {
                  b && b.onload(void 0, !0)
              }
          }
      }
  });
  var _b = [],
      ac = /(=)\?(?=&|$)|\?\?/;
  m.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function() {
          var a = _b.pop() || m.expando + "_" + vb++;
          return this[a] = !0, a
      }
  }),
  m.ajaxPrefilter("json jsonp", function(b, c, d) {
      var e,
          f,
          g,
          h = b.jsonp !== !1 && (ac.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && ac.test(b.data) && "data");
      return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = m.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(ac, "$1" + e) : b.jsonp !== !1 && (b.url += (wb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
          return g || m.error(e + " was not called"), g[0]
      }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
          g = arguments
      }, d.always(function() {
          a[e] = f,
          b[e] && (b.jsonpCallback = c.jsonpCallback, _b.push(e)),
          g && m.isFunction(f) && f(g[0]),
          g = f = void 0
      }), "script") : void 0
  }),
  m.parseHTML = function(a, b, c) {
      if (!a || "string" != typeof a)
          return null;
      "boolean" == typeof b && (c = b, b = !1),
      b = b || y;
      var d = u.exec(a),
          e = !c && [];
      return d ? [b.createElement(d[1])] : (d = m.buildFragment([a], b, e), e && e.length && m(e).remove(), m.merge([], d.childNodes))
  };
  var bc = m.fn.load;
  m.fn.load = function(a, b, c) {
      if ("string" != typeof a && bc)
          return bc.apply(this, arguments);
      var d,
          e,
          f,
          g = this,
          h = a.indexOf(" ");
      return h >= 0 && (d = m.trim(a.slice(h, a.length)), a = a.slice(0, h)), m.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && m.ajax({
          url: a,
          type: f,
          dataType: "html",
          data: b
      }).done(function(a) {
          e = arguments,
          g.html(d ? m("<div>").append(m.parseHTML(a)).find(d) : a)
      }).complete(c && function(a, b) {
          g.each(c, e || [a.responseText, b, a])
      }), this
  },
  m.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
      m.fn[b] = function(a) {
          return this.on(b, a)
      }
  }),
  m.expr.filters.animated = function(a) {
      return m.grep(m.timers, function(b) {
          return a === b.elem
      }).length
  };
  var cc = a.document.documentElement;
  function dc(a) {
      return m.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
  }
  m.offset = {
      setOffset: function(a, b, c) {
          var d,
              e,
              f,
              g,
              h,
              i,
              j,
              k = m.css(a, "position"),
              l = m(a),
              n = {};
          "static" === k && (a.style.position = "relative"),
          h = l.offset(),
          f = m.css(a, "top"),
          i = m.css(a, "left"),
          j = ("absolute" === k || "fixed" === k) && m.inArray("auto", [f, i]) > -1,
          j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0),
          m.isFunction(b) && (b = b.call(a, c, h)),
          null != b.top && (n.top = b.top - h.top + g),
          null != b.left && (n.left = b.left - h.left + e),
          "using" in b ? b.using.call(a, n) : l.css(n)
      }
  },
  m.fn.extend({
      offset: function(a) {
          if (arguments.length)
              return void 0 === a ? this : this.each(function(b) {
                  m.offset.setOffset(this, a, b)
              });
          var b,
              c,
              d = {
                  top: 0,
                  left: 0
              },
              e = this[0],
              f = e && e.ownerDocument;
          if (f)
              return b = f.documentElement, m.contains(b, e) ? (typeof e.getBoundingClientRect !== K && (d = e.getBoundingClientRect()), c = dc(f), {
                  top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                  left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
              }) : d
      },
      position: function() {
          if (this[0]) {
              var a,
                  b,
                  c = {
                      top: 0,
                      left: 0
                  },
                  d = this[0];
              return "fixed" === m.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), m.nodeName(a[0], "html") || (c = a.offset()), c.top += m.css(a[0], "borderTopWidth", !0), c.left += m.css(a[0], "borderLeftWidth", !0)), {
                  top: b.top - c.top - m.css(d, "marginTop", !0),
                  left: b.left - c.left - m.css(d, "marginLeft", !0)
              }
          }
      },
      offsetParent: function() {
          return this.map(function() {
              var a = this.offsetParent || cc;
              while (a && !m.nodeName(a, "html") && "static" === m.css(a, "position"))
                  a = a.offsetParent;
              return a || cc
          })
      }
  }),
  m.each({
      scrollLeft: "pageXOffset",
      scrollTop: "pageYOffset"
  }, function(a, b) {
      var c = /Y/.test(b);
      m.fn[a] = function(d) {
          return V(this, function(a, d, e) {
              var f = dc(a);
              return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? m(f).scrollLeft() : e, c ? e : m(f).scrollTop()) : a[d] = e)
          }, a, d, arguments.length, null)
      }
  }),
  m.each(["top", "left"], function(a, b) {
      m.cssHooks[b] = La(k.pixelPosition, function(a, c) {
          return c ? (c = Ja(a, b), Ha.test(c) ? m(a).position()[b] + "px" : c) : void 0
      })
  }),
  m.each({
      Height: "height",
      Width: "width"
  }, function(a, b) {
      m.each({
          padding: "inner" + a,
          content: b,
          "": "outer" + a
      }, function(c, d) {
          m.fn[d] = function(d, e) {
              var f = arguments.length && (c || "boolean" != typeof d),
                  g = c || (d === !0 || e === !0 ? "margin" : "border");
              return V(this, function(b, c, d) {
                  var e;
                  return m.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? m.css(b, c, g) : m.style(b, c, d, g)
              }, b, f ? d : void 0, f, null)
          }
      })
  }),
  m.fn.size = function() {
      return this.length
  },
  m.fn.andSelf = m.fn.addBack,
  "function" == typeof define && define.amd && define("jquery", [], function() {
      return m
  });
  var ec = a.jQuery,
      fc = a.$;
  return m.noConflict = function(b) {
      return a.$ === m && (a.$ = fc), b && a.jQuery === m && (a.jQuery = ec), m
  }, typeof b === K && (a.jQuery = a.$ = m), m
});

(function() {
  function n(n) {
      function t(t, r, e, u, i, o) {
          for (; i >= 0 && o > i; i += n) {
              var a = u ? u[i] : i;
              e = r(e, t[a], a, t)
          }
          return e
      }
      return function(r, e, u, i) {
          e = b(e, i, 4);
          var o = !k(r) && m.keys(r),
              a = (o || r).length,
              c = n > 0 ? 0 : a - 1;
          return arguments.length < 3 && (u = r[o ? o[c] : c], c += n), t(r, e, u, o, c, a)
      }
  }
  function t(n) {
      return function(t, r, e) {
          r = x(r, e);
          for (var u = O(t), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n)
              if (r(t[i], i, t))
                  return i;
          return -1
      }
  }
  function r(n, t, r) {
      return function(e, u, i) {
          var o = 0,
              a = O(e);
          if ("number" == typeof i)
              n > 0 ? o = i >= 0 ? i : Math.max(i + a, o) : a = i >= 0 ? Math.min(i + 1, a) : i + a + 1;
          else if (r && i && a)
              return i = r(e, u), e[i] === u ? i : -1;
          if (u !== u)
              return i = t(l.call(e, o, a), m.isNaN), i >= 0 ? i + o : -1;
          for (i = n > 0 ? o : a - 1; i >= 0 && a > i; i += n)
              if (e[i] === u)
                  return i;
          return -1
      }
  }
  function e(n, t) {
      var r = I.length,
          e = n.constructor,
          u = m.isFunction(e) && e.prototype || a,
          i = "constructor";
      for (m.has(n, i) && !m.contains(t, i) && t.push(i); r--;)
          i = I[r],
          i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i)
  }
  var u = this,
      i = u._,
      o = Array.prototype,
      a = Object.prototype,
      c = Function.prototype,
      f = o.push,
      l = o.slice,
      s = a.toString,
      p = a.hasOwnProperty,
      h = Array.isArray,
      v = Object.keys,
      g = c.bind,
      y = Object.create,
      d = function() {},
      m = function(n) {
          return n instanceof m ? n : this instanceof m ? void (this._wrapped = n) : new m(n)
      };
  "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m), exports._ = m) : u._ = m,
  m.VERSION = "1.8.3";
  var b = function(n, t, r) {
          if (t === void 0)
              return n;
          switch (null == r ? 3 : r) {
          case 1:
              return function(r) {
                  return n.call(t, r)
              };
          case 2:
              return function(r, e) {
                  return n.call(t, r, e)
              };
          case 3:
              return function(r, e, u) {
                  return n.call(t, r, e, u)
              };
          case 4:
              return function(r, e, u, i) {
                  return n.call(t, r, e, u, i)
              }
          }
          return function() {
              return n.apply(t, arguments)
          }
      },
      x = function(n, t, r) {
          return null == n ? m.identity : m.isFunction(n) ? b(n, t, r) : m.isObject(n) ? m.matcher(n) : m.property(n)
      };
  m.iteratee = function(n, t) {
      return x(n, t, 1 / 0)
  };
  var _ = function(n, t) {
          return function(r) {
              var e = arguments.length;
              if (2 > e || null == r)
                  return r;
              for (var u = 1; e > u; u++)
                  for (var i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) {
                      var f = o[c];
                      t && r[f] !== void 0 || (r[f] = i[f])
                  }
              return r
          }
      },
      j = function(n) {
          if (!m.isObject(n))
              return {};
          if (y)
              return y(n);
          d.prototype = n;
          var t = new d;
          return d.prototype = null, t
      },
      w = function(n) {
          return function(t) {
              return null == t ? void 0 : t[n]
          }
      },
      A = Math.pow(2, 53) - 1,
      O = w("length"),
      k = function(n) {
          var t = O(n);
          return "number" == typeof t && t >= 0 && A >= t
      };
  m.each = m.forEach = function(n, t, r) {
      t = b(t, r);
      var e,
          u;
      if (k(n))
          for (e = 0, u = n.length; u > e; e++)
              t(n[e], e, n);
      else {
          var i = m.keys(n);
          for (e = 0, u = i.length; u > e; e++)
              t(n[i[e]], i[e], n)
      }
      return n
  },
  m.map = m.collect = function(n, t, r) {
      t = x(t, r);
      for (var e = !k(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0; u > o; o++) {
          var a = e ? e[o] : o;
          i[o] = t(n[a], a, n)
      }
      return i
  },
  m.reduce = m.foldl = m.inject = n(1),
  m.reduceRight = m.foldr = n(-1),
  m.find = m.detect = function(n, t, r) {
      var e;
      return e = k(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r), e !== void 0 && e !== -1 ? n[e] : void 0
  },
  m.filter = m.select = function(n, t, r) {
      var e = [];
      return t = x(t, r), m.each(n, function(n, r, u) {
          t(n, r, u) && e.push(n)
      }), e
  },
  m.reject = function(n, t, r) {
      return m.filter(n, m.negate(x(t)), r)
  },
  m.every = m.all = function(n, t, r) {
      t = x(t, r);
      for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
          var o = e ? e[i] : i;
          if (!t(n[o], o, n))
              return !1
      }
      return !0
  },
  m.some = m.any = function(n, t, r) {
      t = x(t, r);
      for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
          var o = e ? e[i] : i;
          if (t(n[o], o, n))
              return !0
      }
      return !1
  },
  m.contains = m.includes = m.include = function(n, t, r, e) {
      return k(n) || (n = m.values(n)), ("number" != typeof r || e) && (r = 0), m.indexOf(n, t, r) >= 0
  },
  m.invoke = function(n, t) {
      var r = l.call(arguments, 2),
          e = m.isFunction(t);
      return m.map(n, function(n) {
          var u = e ? t : n[t];
          return null == u ? u : u.apply(n, r)
      })
  },
  m.pluck = function(n, t) {
      return m.map(n, m.property(t))
  },
  m.where = function(n, t) {
      return m.filter(n, m.matcher(t))
  },
  m.findWhere = function(n, t) {
      return m.find(n, m.matcher(t))
  },
  m.max = function(n, t, r) {
      var e,
          u,
          i = -1 / 0,
          o = -1 / 0;
      if (null == t && null != n) {
          n = k(n) ? n : m.values(n);
          for (var a = 0, c = n.length; c > a; a++)
              e = n[a],
              e > i && (i = e)
      } else
          t = x(t, r),
          m.each(n, function(n, r, e) {
              u = t(n, r, e),
              (u > o || u === -1 / 0 && i === -1 / 0) && (i = n, o = u)
          });
      return i
  },
  m.min = function(n, t, r) {
      var e,
          u,
          i = 1 / 0,
          o = 1 / 0;
      if (null == t && null != n) {
          n = k(n) ? n : m.values(n);
          for (var a = 0, c = n.length; c > a; a++)
              e = n[a],
              i > e && (i = e)
      } else
          t = x(t, r),
          m.each(n, function(n, r, e) {
              u = t(n, r, e),
              (o > u || 1 / 0 === u && 1 / 0 === i) && (i = n, o = u)
          });
      return i
  },
  m.shuffle = function(n) {
      for (var t, r = k(n) ? n : m.values(n), e = r.length, u = Array(e), i = 0; e > i; i++)
          t = m.random(0, i),
          t !== i && (u[i] = u[t]),
          u[t] = r[i];
      return u
  },
  m.sample = function(n, t, r) {
      return null == t || r ? (k(n) || (n = m.values(n)), n[m.random(n.length - 1)]) : m.shuffle(n).slice(0, Math.max(0, t))
  },
  m.sortBy = function(n, t, r) {
      return t = x(t, r), m.pluck(m.map(n, function(n, r, e) {
          return {
              value: n,
              index: r,
              criteria: t(n, r, e)
          }
      }).sort(function(n, t) {
          var r = n.criteria,
              e = t.criteria;
          if (r !== e) {
              if (r > e || r === void 0)
                  return 1;
              if (e > r || e === void 0)
                  return -1
          }
          return n.index - t.index
      }), "value")
  };
  var F = function(n) {
      return function(t, r, e) {
          var u = {};
          return r = x(r, e), m.each(t, function(e, i) {
              var o = r(e, i, t);
              n(u, e, o)
          }), u
      }
  };
  m.groupBy = F(function(n, t, r) {
      m.has(n, r) ? n[r].push(t) : n[r] = [t]
  }),
  m.indexBy = F(function(n, t, r) {
      n[r] = t
  }),
  m.countBy = F(function(n, t, r) {
      m.has(n, r) ? n[r]++ : n[r] = 1
  }),
  m.toArray = function(n) {
      return n ? m.isArray(n) ? l.call(n) : k(n) ? m.map(n, m.identity) : m.values(n) : []
  },
  m.size = function(n) {
      return null == n ? 0 : k(n) ? n.length : m.keys(n).length
  },
  m.partition = function(n, t, r) {
      t = x(t, r);
      var e = [],
          u = [];
      return m.each(n, function(n, r, i) {
          (t(n, r, i) ? e : u).push(n)
      }), [e, u]
  },
  m.first = m.head = m.take = function(n, t, r) {
      return null == n ? void 0 : null == t || r ? n[0] : m.initial(n, n.length - t)
  },
  m.initial = function(n, t, r) {
      return l.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
  },
  m.last = function(n, t, r) {
      return null == n ? void 0 : null == t || r ? n[n.length - 1] : m.rest(n, Math.max(0, n.length - t))
  },
  m.rest = m.tail = m.drop = function(n, t, r) {
      return l.call(n, null == t || r ? 1 : t)
  },
  m.compact = function(n) {
      return m.filter(n, m.identity)
  };
  var S = function(n, t, r, e) {
      for (var u = [], i = 0, o = e || 0, a = O(n); a > o; o++) {
          var c = n[o];
          if (k(c) && (m.isArray(c) || m.isArguments(c))) {
              t || (c = S(c, t, r));
              var f = 0,
                  l = c.length;
              for (u.length += l; l > f;)
                  u[i++] = c[f++]
          } else
              r || (u[i++] = c)
      }
      return u
  };
  m.flatten = function(n, t) {
      return S(n, t, !1)
  },
  m.without = function(n) {
      return m.difference(n, l.call(arguments, 1))
  },
  m.uniq = m.unique = function(n, t, r, e) {
      m.isBoolean(t) || (e = r, r = t, t = !1),
      null != r && (r = x(r, e));
      for (var u = [], i = [], o = 0, a = O(n); a > o; o++) {
          var c = n[o],
              f = r ? r(c, o, n) : c;
          t ? (o && i === f || u.push(c), i = f) : r ? m.contains(i, f) || (i.push(f), u.push(c)) : m.contains(u, c) || u.push(c)
      }
      return u
  },
  m.union = function() {
      return m.uniq(S(arguments, !0, !0))
  },
  m.intersection = function(n) {
      for (var t = [], r = arguments.length, e = 0, u = O(n); u > e; e++) {
          var i = n[e];
          if (!m.contains(t, i)) {
              for (var o = 1; r > o && m.contains(arguments[o], i); o++)
                  ;
              o === r && t.push(i)
          }
      }
      return t
  },
  m.difference = function(n) {
      var t = S(arguments, !0, !0, 1);
      return m.filter(n, function(n) {
          return !m.contains(t, n)
      })
  },
  m.zip = function() {
      return m.unzip(arguments)
  },
  m.unzip = function(n) {
      for (var t = n && m.max(n, O).length || 0, r = Array(t), e = 0; t > e; e++)
          r[e] = m.pluck(n, e);
      return r
  },
  m.object = function(n, t) {
      for (var r = {}, e = 0, u = O(n); u > e; e++)
          t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
      return r
  },
  m.findIndex = t(1),
  m.findLastIndex = t(-1),
  m.sortedIndex = function(n, t, r, e) {
      r = x(r, e, 1);
      for (var u = r(t), i = 0, o = O(n); o > i;) {
          var a = Math.floor((i + o) / 2);
          r(n[a]) < u ? i = a + 1 : o = a
      }
      return i
  },
  m.indexOf = r(1, m.findIndex, m.sortedIndex),
  m.lastIndexOf = r(-1, m.findLastIndex),
  m.range = function(n, t, r) {
      null == t && (t = n || 0, n = 0),
      r = r || 1;
      for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r)
          u[i] = n;
      return u
  };
  var E = function(n, t, r, e, u) {
      if (!(e instanceof t))
          return n.apply(r, u);
      var i = j(n.prototype),
          o = n.apply(i, u);
      return m.isObject(o) ? o : i
  };
  m.bind = function(n, t) {
      if (g && n.bind === g)
          return g.apply(n, l.call(arguments, 1));
      if (!m.isFunction(n))
          throw new TypeError("Bind must be called on a function");
      var r = l.call(arguments, 2),
          e = function() {
              return E(n, e, t, this, r.concat(l.call(arguments)))
          };
      return e
  },
  m.partial = function(n) {
      var t = l.call(arguments, 1),
          r = function() {
              for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++)
                  i[o] = t[o] === m ? arguments[e++] : t[o];
              for (; e < arguments.length;)
                  i.push(arguments[e++]);
              return E(n, r, this, this, i)
          };
      return r
  },
  m.bindAll = function(n) {
      var t,
          r,
          e = arguments.length;
      if (1 >= e)
          throw new Error("bindAll must be passed function names");
      for (t = 1; e > t; t++)
          r = arguments[t],
          n[r] = m.bind(n[r], n);
      return n
  },
  m.memoize = function(n, t) {
      var r = function(e) {
          var u = r.cache,
              i = "" + (t ? t.apply(this, arguments) : e);
          return m.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
      };
      return r.cache = {}, r
  },
  m.delay = function(n, t) {
      var r = l.call(arguments, 2);
      return setTimeout(function() {
          return n.apply(null, r)
      }, t)
  },
  m.defer = m.partial(m.delay, m, 1),
  m.throttle = function(n, t, r) {
      var e,
          u,
          i,
          o = null,
          a = 0;
      r || (r = {});
      var c = function() {
          a = r.leading === !1 ? 0 : m.now(),
          o = null,
          i = n.apply(e, u),
          o || (e = u = null)
      };
      return function() {
          var f = m.now();
          a || r.leading !== !1 || (a = f);
          var l = t - (f - a);
          return e = this, u = arguments, 0 >= l || l > t ? (o && (clearTimeout(o), o = null), a = f, i = n.apply(e, u), o || (e = u = null)) : o || r.trailing === !1 || (o = setTimeout(c, l)), i
      }
  },
  m.debounce = function(n, t, r) {
      var e,
          u,
          i,
          o,
          a,
          c = function() {
              var f = m.now() - o;
              t > f && f >= 0 ? e = setTimeout(c, t - f) : (e = null, r || (a = n.apply(i, u), e || (i = u = null)))
          };
      return function() {
          i = this,
          u = arguments,
          o = m.now();
          var f = r && !e;
          return e || (e = setTimeout(c, t)), f && (a = n.apply(i, u), i = u = null), a
      }
  },
  m.wrap = function(n, t) {
      return m.partial(t, n)
  },
  m.negate = function(n) {
      return function() {
          return !n.apply(this, arguments)
      }
  },
  m.compose = function() {
      var n = arguments,
          t = n.length - 1;
      return function() {
          for (var r = t, e = n[t].apply(this, arguments); r--;)
              e = n[r].call(this, e);
          return e
      }
  },
  m.after = function(n, t) {
      return function() {
          return --n < 1 ? t.apply(this, arguments) : void 0
      }
  },
  m.before = function(n, t) {
      var r;
      return function() {
          return --n > 0 && (r = t.apply(this, arguments)), 1 >= n && (t = null), r
      }
  },
  m.once = m.partial(m.before, 2);
  var M = !{
          toString: null
      }.propertyIsEnumerable("toString"),
      I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
  m.keys = function(n) {
      if (!m.isObject(n))
          return [];
      if (v)
          return v(n);
      var t = [];
      for (var r in n)
          m.has(n, r) && t.push(r);
      return M && e(n, t), t
  },
  m.allKeys = function(n) {
      if (!m.isObject(n))
          return [];
      var t = [];
      for (var r in n)
          t.push(r);
      return M && e(n, t), t
  },
  m.values = function(n) {
      for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++)
          e[u] = n[t[u]];
      return e
  },
  m.mapObject = function(n, t, r) {
      t = x(t, r);
      for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++)
          e = u[a],
          o[e] = t(n[e], e, n);
      return o
  },
  m.pairs = function(n) {
      for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++)
          e[u] = [t[u], n[t[u]]];
      return e
  },
  m.invert = function(n) {
      for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++)
          t[n[r[e]]] = r[e];
      return t
  },
  m.functions = m.methods = function(n) {
      var t = [];
      for (var r in n)
          m.isFunction(n[r]) && t.push(r);
      return t.sort()
  },
  m.extend = _(m.allKeys),
  m.extendOwn = m.assign = _(m.keys),
  m.findKey = function(n, t, r) {
      t = x(t, r);
      for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++)
          if (e = u[i], t(n[e], e, n))
              return e
  },
  m.pick = function(n, t, r) {
      var e,
          u,
          i = {},
          o = n;
      if (null == o)
          return i;
      m.isFunction(t) ? (u = m.allKeys(o), e = b(t, r)) : (u = S(arguments, !1, !1, 1), e = function(n, t, r) {
          return t in r
      }, o = Object(o));
      for (var a = 0, c = u.length; c > a; a++) {
          var f = u[a],
              l = o[f];
          e(l, f, o) && (i[f] = l)
      }
      return i
  },
  m.omit = function(n, t, r) {
      if (m.isFunction(t))
          t = m.negate(t);
      else {
          var e = m.map(S(arguments, !1, !1, 1), String);
          t = function(n, t) {
              return !m.contains(e, t)
          }
      }
      return m.pick(n, t, r)
  },
  m.defaults = _(m.allKeys, !0),
  m.create = function(n, t) {
      var r = j(n);
      return t && m.extendOwn(r, t), r
  },
  m.clone = function(n) {
      return m.isObject(n) ? m.isArray(n) ? n.slice() : m.extend({}, n) : n
  },
  m.tap = function(n, t) {
      return t(n), n
  },
  m.isMatch = function(n, t) {
      var r = m.keys(t),
          e = r.length;
      if (null == n)
          return !e;
      for (var u = Object(n), i = 0; e > i; i++) {
          var o = r[i];
          if (t[o] !== u[o] || !(o in u))
              return !1
      }
      return !0
  };
  var N = function(n, t, r, e) {
      if (n === t)
          return 0 !== n || 1 / n === 1 / t;
      if (null == n || null == t)
          return n === t;
      n instanceof m && (n = n._wrapped),
      t instanceof m && (t = t._wrapped);
      var u = s.call(n);
      if (u !== s.call(t))
          return !1;
      switch (u) {
      case "[object RegExp]":
      case "[object String]":
          return "" + n == "" + t;
      case "[object Number]":
          return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;
      case "[object Date]":
      case "[object Boolean]":
          return +n === +t
      }
      var i = "[object Array]" === u;
      if (!i) {
          if ("object" != typeof n || "object" != typeof t)
              return !1;
          var o = n.constructor,
              a = t.constructor;
          if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor" in n && "constructor" in t)
              return !1
      }
      r = r || [],
      e = e || [];
      for (var c = r.length; c--;)
          if (r[c] === n)
              return e[c] === t;
      if (r.push(n), e.push(t), i) {
          if (c = n.length, c !== t.length)
              return !1;
          for (; c--;)
              if (!N(n[c], t[c], r, e))
                  return !1
      } else {
          var f,
              l = m.keys(n);
          if (c = l.length, m.keys(t).length !== c)
              return !1;
          for (; c--;)
              if (f = l[c], !m.has(t, f) || !N(n[f], t[f], r, e))
                  return !1
      }
      return r.pop(), e.pop(), !0
  };
  m.isEqual = function(n, t) {
      return N(n, t)
  },
  m.isEmpty = function(n) {
      return null == n ? !0 : k(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n)) ? 0 === n.length : 0 === m.keys(n).length
  },
  m.isElement = function(n) {
      return !(!n || 1 !== n.nodeType)
  },
  m.isArray = h || function(n) {
      return "[object Array]" === s.call(n)
  },
  m.isObject = function(n) {
      var t = typeof n;
      return "function" === t || "object" === t && !!n
  },
  m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(n) {
      m["is" + n] = function(t) {
          return s.call(t) === "[object " + n + "]"
      }
  }),
  m.isArguments(arguments) || (m.isArguments = function(n) {
      return m.has(n, "callee")
  }),
  "function" != typeof /./ && "object" != typeof Int8Array && (m.isFunction = function(n) {
      return "function" == typeof n || !1
  }),
  m.isFinite = function(n) {
      return isFinite(n) && !isNaN(parseFloat(n))
  },
  m.isNaN = function(n) {
      return m.isNumber(n) && n !== +n
  },
  m.isBoolean = function(n) {
      return n === !0 || n === !1 || "[object Boolean]" === s.call(n)
  },
  m.isNull = function(n) {
      return null === n
  },
  m.isUndefined = function(n) {
      return n === void 0
  },
  m.has = function(n, t) {
      return null != n && p.call(n, t)
  },
  m.noConflict = function() {
      return u._ = i, this
  },
  m.identity = function(n) {
      return n
  },
  m.constant = function(n) {
      return function() {
          return n
      }
  },
  m.noop = function() {},
  m.property = w,
  m.propertyOf = function(n) {
      return null == n ? function() {} : function(t) {
          return n[t]
      }
  },
  m.matcher = m.matches = function(n) {
      return n = m.extendOwn({}, n), function(t) {
          return m.isMatch(t, n)
      }
  },
  m.times = function(n, t, r) {
      var e = Array(Math.max(0, n));
      t = b(t, r, 1);
      for (var u = 0; n > u; u++)
          e[u] = t(u);
      return e
  },
  m.random = function(n, t) {
      return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
  },
  m.now = Date.now || function() {
      return (new Date).getTime()
  };
  var B = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#x27;",
          "`": "&#x60;"
      },
      T = m.invert(B),
      R = function(n) {
          var t = function(t) {
                  return n[t]
              },
              r = "(?:" + m.keys(n).join("|") + ")",
              e = RegExp(r),
              u = RegExp(r, "g");
          return function(n) {
              return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n
          }
      };
  m.escape = R(B),
  m.unescape = R(T),
  m.result = function(n, t, r) {
      var e = null == n ? void 0 : n[t];
      return e === void 0 && (e = r), m.isFunction(e) ? e.call(n) : e
  };
  var q = 0;
  m.uniqueId = function(n) {
      var t = ++q + "";
      return n ? n + t : t
  },
  m.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
  };
  var K = /(.)^/,
      z = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029"
      },
      D = /\\|'|\r|\n|\u2028|\u2029/g,
      L = function(n) {
          return "\\" + z[n]
      };
  m.template = function(n, t, r) {
      !t && r && (t = r),
      t = m.defaults({}, t, m.templateSettings);
      var e = RegExp([(t.escape || K).source, (t.interpolate || K).source, (t.evaluate || K).source].join("|") + "|$", "g"),
          u = 0,
          i = "__p+='";
      n.replace(e, function(t, r, e, o, a) {
          return i += n.slice(u, a).replace(D, L), u = a + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"), t
      }),
      i += "';\n",
      t.variable || (i = "with(obj||{}){\n" + i + "}\n"),
      i = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
      try {
          var o = new Function(t.variable || "obj", "_", i)
      } catch (a) {
          throw a.source = i, a
      }
      var c = function(n) {
              return o.call(this, n, m)
          },
          f = t.variable || "obj";
      return c.source = "function(" + f + "){\n" + i + "}", c
  },
  m.chain = function(n) {
      var t = m(n);
      return t._chain = !0, t
  };
  var P = function(n, t) {
      return n._chain ? m(t).chain() : t
  };
  m.mixin = function(n) {
      m.each(m.functions(n), function(t) {
          var r = m[t] = n[t];
          m.prototype[t] = function() {
              var n = [this._wrapped];
              return f.apply(n, arguments), P(this, r.apply(m, n))
          }
      })
  },
  m.mixin(m),
  m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
      var t = o[n];
      m.prototype[n] = function() {
          var r = this._wrapped;
          return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], P(this, r)
      }
  }),
  m.each(["concat", "join", "slice"], function(n) {
      var t = o[n];
      m.prototype[n] = function() {
          return P(this, t.apply(this._wrapped, arguments))
      }
  }),
  m.prototype.value = function() {
      return this._wrapped
  },
  m.prototype.valueOf = m.prototype.toJSON = m.prototype.value,
  m.prototype.toString = function() {
      return "" + this._wrapped
  },
  "function" == typeof define && define.amd && define("underscore", [], function() {
      return m
  })
}).call(this);

(function(t) {
  var e = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global;
  if (typeof define === "function" && define.amd) {
      define(["underscore", "jquery", "exports"], function(i, r, n) {
          e.Backbone = t(e, n, i, r)
      })
  } else if (typeof exports !== "undefined") {
      var i = require("underscore"),
          r;
      try {
          r = require("jquery")
      } catch (n) {}
      t(e, exports, i, r)
  } else {
      e.Backbone = t(e, {}, e._, e.jQuery || e.Zepto || e.ender || e.$)
  }
})(function(t, e, i, r) {
  var n = t.Backbone;
  var s = Array.prototype.slice;
  e.VERSION = "1.3.3";
  e.$ = r;
  e.noConflict = function() {
      t.Backbone = n;
      return this
  };
  e.emulateHTTP = false;
  e.emulateJSON = false;
  var a = function(t, e, r) {
      switch (t) {
      case 1:
          return function() {
              return i[e](this[r])
          };
      case 2:
          return function(t) {
              return i[e](this[r], t)
          };
      case 3:
          return function(t, n) {
              return i[e](this[r], o(t, this), n)
          };
      case 4:
          return function(t, n, s) {
              return i[e](this[r], o(t, this), n, s)
          };
      default:
          return function() {
              var t = s.call(arguments);
              t.unshift(this[r]);
              return i[e].apply(i, t)
          }
      }
  };
  var h = function(t, e, r) {
      i.each(e, function(e, n) {
          if (i[n])
              t.prototype[n] = a(e, n, r)
      })
  };
  var o = function(t, e) {
      if (i.isFunction(t))
          return t;
      if (i.isObject(t) && !e._isModel(t))
          return l(t);
      if (i.isString(t))
          return function(e) {
              return e.get(t)
          };
      return t
  };
  var l = function(t) {
      var e = i.matches(t);
      return function(t) {
          return e(t.attributes)
      }
  };
  var u = e.Events = {};
  var c = /\s+/;
  var f = function(t, e, r, n, s) {
      var a = 0,
          h;
      if (r && typeof r === "object") {
          if (n !== void 0 && "context" in s && s.context === void 0)
              s.context = n;
          for (h = i.keys(r); a < h.length; a++) {
              e = f(t, e, h[a], r[h[a]], s)
          }
      } else if (r && c.test(r)) {
          for (h = r.split(c); a < h.length; a++) {
              e = t(e, h[a], n, s)
          }
      } else {
          e = t(e, r, n, s)
      }
      return e
  };
  u.on = function(t, e, i) {
      return d(this, t, e, i)
  };
  var d = function(t, e, i, r, n) {
      t._events = f(v, t._events || {}, e, i, {
          context: r,
          ctx: t,
          listening: n
      });
      if (n) {
          var s = t._listeners || (t._listeners = {});
          s[n.id] = n
      }
      return t
  };
  u.listenTo = function(t, e, r) {
      if (!t)
          return this;
      var n = t._listenId || (t._listenId = i.uniqueId("l"));
      var s = this._listeningTo || (this._listeningTo = {});
      var a = s[n];
      if (!a) {
          var h = this._listenId || (this._listenId = i.uniqueId("l"));
          a = s[n] = {
              obj: t,
              objId: n,
              id: h,
              listeningTo: s,
              count: 0
          }
      }
      d(t, e, r, this, a);
      return this
  };
  var v = function(t, e, i, r) {
      if (i) {
          var n = t[e] || (t[e] = []);
          var s = r.context,
              a = r.ctx,
              h = r.listening;
          if (h)
              h.count++;
          n.push({
              callback: i,
              context: s,
              ctx: s || a,
              listening: h
          })
      }
      return t
  };
  u.off = function(t, e, i) {
      if (!this._events)
          return this;
      this._events = f(g, this._events, t, e, {
          context: i,
          listeners: this._listeners
      });
      return this
  };
  u.stopListening = function(t, e, r) {
      var n = this._listeningTo;
      if (!n)
          return this;
      var s = t ? [t._listenId] : i.keys(n);
      for (var a = 0; a < s.length; a++) {
          var h = n[s[a]];
          if (!h)
              break;
          h.obj.off(e, r, this)
      }
      return this
  };
  var g = function(t, e, r, n) {
      if (!t)
          return;
      var s = 0,
          a;
      var h = n.context,
          o = n.listeners;
      if (!e && !r && !h) {
          var l = i.keys(o);
          for (; s < l.length; s++) {
              a = o[l[s]];
              delete o[a.id];
              delete a.listeningTo[a.objId]
          }
          return
      }
      var u = e ? [e] : i.keys(t);
      for (; s < u.length; s++) {
          e = u[s];
          var c = t[e];
          if (!c)
              break;
          var f = [];
          for (var d = 0; d < c.length; d++) {
              var v = c[d];
              if (r && r !== v.callback && r !== v.callback._callback || h && h !== v.context) {
                  f.push(v)
              } else {
                  a = v.listening;
                  if (a && --a.count === 0) {
                      delete o[a.id];
                      delete a.listeningTo[a.objId]
                  }
              }
          }
          if (f.length) {
              t[e] = f
          } else {
              delete t[e]
          }
      }
      return t
  };
  u.once = function(t, e, r) {
      var n = f(p, {}, t, e, i.bind(this.off, this));
      if (typeof t === "string" && r == null)
          e = void 0;
      return this.on(n, e, r)
  };
  u.listenToOnce = function(t, e, r) {
      var n = f(p, {}, e, r, i.bind(this.stopListening, this, t));
      return this.listenTo(t, n)
  };
  var p = function(t, e, r, n) {
      if (r) {
          var s = t[e] = i.once(function() {
              n(e, s);
              r.apply(this, arguments)
          });
          s._callback = r
      }
      return t
  };
  u.trigger = function(t) {
      if (!this._events)
          return this;
      var e = Math.max(0, arguments.length - 1);
      var i = Array(e);
      for (var r = 0; r < e; r++)
          i[r] = arguments[r + 1];
      f(m, this._events, t, void 0, i);
      return this
  };
  var m = function(t, e, i, r) {
      if (t) {
          var n = t[e];
          var s = t.all;
          if (n && s)
              s = s.slice();
          if (n)
              _(n, r);
          if (s)
              _(s, [e].concat(r))
      }
      return t
  };
  var _ = function(t, e) {
      var i,
          r = -1,
          n = t.length,
          s = e[0],
          a = e[1],
          h = e[2];
      switch (e.length) {
      case 0:
          while (++r < n)
              (i = t[r]).callback.call(i.ctx);
          return;
      case 1:
          while (++r < n)
              (i = t[r]).callback.call(i.ctx, s);
          return;
      case 2:
          while (++r < n)
              (i = t[r]).callback.call(i.ctx, s, a);
          return;
      case 3:
          while (++r < n)
              (i = t[r]).callback.call(i.ctx, s, a, h);
          return;
      default:
          while (++r < n)
              (i = t[r]).callback.apply(i.ctx, e);
          return
      }
  };
  u.bind = u.on;
  u.unbind = u.off;
  i.extend(e, u);
  var y = e.Model = function(t, e) {
      var r = t || {};
      e || (e = {});
      this.cid = i.uniqueId(this.cidPrefix);
      this.attributes = {};
      if (e.collection)
          this.collection = e.collection;
      if (e.parse)
          r = this.parse(r, e) || {};
      var n = i.result(this, "defaults");
      r = i.defaults(i.extend({}, n, r), n);
      this.set(r, e);
      this.changed = {};
      this.initialize.apply(this, arguments)
  };
  i.extend(y.prototype, u, {
      changed: null,
      validationError: null,
      idAttribute: "id",
      cidPrefix: "c",
      initialize: function() {},
      toJSON: function(t) {
          return i.clone(this.attributes)
      },
      sync: function() {
          return e.sync.apply(this, arguments)
      },
      get: function(t) {
          return this.attributes[t]
      },
      escape: function(t) {
          return i.escape(this.get(t))
      },
      has: function(t) {
          return this.get(t) != null
      },
      matches: function(t) {
          return !!i.iteratee(t, this)(this.attributes)
      },
      set: function(t, e, r) {
          if (t == null)
              return this;
          var n;
          if (typeof t === "object") {
              n = t;
              r = e
          } else {
              (n = {})[t] = e
          }
          r || (r = {});
          if (!this._validate(n, r))
              return false;
          var s = r.unset;
          var a = r.silent;
          var h = [];
          var o = this._changing;
          this._changing = true;
          if (!o) {
              this._previousAttributes = i.clone(this.attributes);
              this.changed = {}
          }
          var l = this.attributes;
          var u = this.changed;
          var c = this._previousAttributes;
          for (var f in n) {
              e = n[f];
              if (!i.isEqual(l[f], e))
                  h.push(f);
              if (!i.isEqual(c[f], e)) {
                  u[f] = e
              } else {
                  delete u[f]
              }
              s ? delete l[f] : l[f] = e
          }
          if (this.idAttribute in n)
              this.id = this.get(this.idAttribute);
          if (!a) {
              if (h.length)
                  this._pending = r;
              for (var d = 0; d < h.length; d++) {
                  this.trigger("change:" + h[d], this, l[h[d]], r)
              }
          }
          if (o)
              return this;
          if (!a) {
              while (this._pending) {
                  r = this._pending;
                  this._pending = false;
                  this.trigger("change", this, r)
              }
          }
          this._pending = false;
          this._changing = false;
          return this
      },
      unset: function(t, e) {
          return this.set(t, void 0, i.extend({}, e, {
              unset: true
          }))
      },
      clear: function(t) {
          var e = {};
          for (var r in this.attributes)
              e[r] = void 0;
          return this.set(e, i.extend({}, t, {
              unset: true
          }))
      },
      hasChanged: function(t) {
          if (t == null)
              return !i.isEmpty(this.changed);
          return i.has(this.changed, t)
      },
      changedAttributes: function(t) {
          if (!t)
              return this.hasChanged() ? i.clone(this.changed) : false;
          var e = this._changing ? this._previousAttributes : this.attributes;
          var r = {};
          for (var n in t) {
              var s = t[n];
              if (i.isEqual(e[n], s))
                  continue;
              r[n] = s
          }
          return i.size(r) ? r : false
      },
      previous: function(t) {
          if (t == null || !this._previousAttributes)
              return null;
          return this._previousAttributes[t]
      },
      previousAttributes: function() {
          return i.clone(this._previousAttributes)
      },
      fetch: function(t) {
          t = i.extend({
              parse: true
          }, t);
          var e = this;
          var r = t.success;
          t.success = function(i) {
              var n = t.parse ? e.parse(i, t) : i;
              if (!e.set(n, t))
                  return false;
              if (r)
                  r.call(t.context, e, i, t);
              e.trigger("sync", e, i, t)
          };
          B(this, t);
          return this.sync("read", this, t)
      },
      save: function(t, e, r) {
          var n;
          if (t == null || typeof t === "object") {
              n = t;
              r = e
          } else {
              (n = {})[t] = e
          }
          r = i.extend({
              validate: true,
              parse: true
          }, r);
          var s = r.wait;
          if (n && !s) {
              if (!this.set(n, r))
                  return false
          } else if (!this._validate(n, r)) {
              return false
          }
          var a = this;
          var h = r.success;
          var o = this.attributes;
          r.success = function(t) {
              a.attributes = o;
              var e = r.parse ? a.parse(t, r) : t;
              if (s)
                  e = i.extend({}, n, e);
              if (e && !a.set(e, r))
                  return false;
              if (h)
                  h.call(r.context, a, t, r);
              a.trigger("sync", a, t, r)
          };
          B(this, r);
          if (n && s)
              this.attributes = i.extend({}, o, n);
          var l = this.isNew() ? "create" : r.patch ? "patch" : "update";
          if (l === "patch" && !r.attrs)
              r.attrs = n;
          var u = this.sync(l, this, r);
          this.attributes = o;
          return u
      },
      destroy: function(t) {
          t = t ? i.clone(t) : {};
          var e = this;
          var r = t.success;
          var n = t.wait;
          var s = function() {
              e.stopListening();
              e.trigger("destroy", e, e.collection, t)
          };
          t.success = function(i) {
              if (n)
                  s();
              if (r)
                  r.call(t.context, e, i, t);
              if (!e.isNew())
                  e.trigger("sync", e, i, t)
          };
          var a = false;
          if (this.isNew()) {
              i.defer(t.success)
          } else {
              B(this, t);
              a = this.sync("delete", this, t)
          }
          if (!n)
              s();
          return a
      },
      url: function() {
          var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || F();
          if (this.isNew())
              return t;
          var e = this.get(this.idAttribute);
          return t.replace(/[^\/]$/, "$&/") + encodeURIComponent(e)
      },
      parse: function(t, e) {
          return t
      },
      clone: function() {
          return new this.constructor(this.attributes)
      },
      isNew: function() {
          return !this.has(this.idAttribute)
      },
      isValid: function(t) {
          return this._validate({}, i.extend({}, t, {
              validate: true
          }))
      },
      _validate: function(t, e) {
          if (!e.validate || !this.validate)
              return true;
          t = i.extend({}, this.attributes, t);
          var r = this.validationError = this.validate(t, e) || null;
          if (!r)
              return true;
          this.trigger("invalid", this, r, i.extend(e, {
              validationError: r
          }));
          return false
      }
  });
  var b = {
      keys: 1,
      values: 1,
      pairs: 1,
      invert: 1,
      pick: 0,
      omit: 0,
      chain: 1,
      isEmpty: 1
  };
  h(y, b, "attributes");
  var x = e.Collection = function(t, e) {
      e || (e = {});
      if (e.model)
          this.model = e.model;
      if (e.comparator !== void 0)
          this.comparator = e.comparator;
      this._reset();
      this.initialize.apply(this, arguments);
      if (t)
          this.reset(t, i.extend({
              silent: true
          }, e))
  };
  var w = {
      add: true,
      remove: true,
      merge: true
  };
  var E = {
      add: true,
      remove: false
  };
  var I = function(t, e, i) {
      i = Math.min(Math.max(i, 0), t.length);
      var r = Array(t.length - i);
      var n = e.length;
      var s;
      for (s = 0; s < r.length; s++)
          r[s] = t[s + i];
      for (s = 0; s < n; s++)
          t[s + i] = e[s];
      for (s = 0; s < r.length; s++)
          t[s + n + i] = r[s]
  };
  i.extend(x.prototype, u, {
      model: y,
      initialize: function() {},
      toJSON: function(t) {
          return this.map(function(e) {
              return e.toJSON(t)
          })
      },
      sync: function() {
          return e.sync.apply(this, arguments)
      },
      add: function(t, e) {
          return this.set(t, i.extend({
              merge: false
          }, e, E))
      },
      remove: function(t, e) {
          e = i.extend({}, e);
          var r = !i.isArray(t);
          t = r ? [t] : t.slice();
          var n = this._removeModels(t, e);
          if (!e.silent && n.length) {
              e.changes = {
                  added: [],
                  merged: [],
                  removed: n
              };
              this.trigger("update", this, e)
          }
          return r ? n[0] : n
      },
      set: function(t, e) {
          if (t == null)
              return;
          e = i.extend({}, w, e);
          if (e.parse && !this._isModel(t)) {
              t = this.parse(t, e) || []
          }
          var r = !i.isArray(t);
          t = r ? [t] : t.slice();
          var n = e.at;
          if (n != null)
              n = +n;
          if (n > this.length)
              n = this.length;
          if (n < 0)
              n += this.length + 1;
          var s = [];
          var a = [];
          var h = [];
          var o = [];
          var l = {};
          var u = e.add;
          var c = e.merge;
          var f = e.remove;
          var d = false;
          var v = this.comparator && n == null && e.sort !== false;
          var g = i.isString(this.comparator) ? this.comparator : null;
          var p,
              m;
          for (m = 0; m < t.length; m++) {
              p = t[m];
              var _ = this.get(p);
              if (_) {
                  if (c && p !== _) {
                      var y = this._isModel(p) ? p.attributes : p;
                      if (e.parse)
                          y = _.parse(y, e);
                      _.set(y, e);
                      h.push(_);
                      if (v && !d)
                          d = _.hasChanged(g)
                  }
                  if (!l[_.cid]) {
                      l[_.cid] = true;
                      s.push(_)
                  }
                  t[m] = _
              } else if (u) {
                  p = t[m] = this._prepareModel(p, e);
                  if (p) {
                      a.push(p);
                      this._addReference(p, e);
                      l[p.cid] = true;
                      s.push(p)
                  }
              }
          }
          if (f) {
              for (m = 0; m < this.length; m++) {
                  p = this.models[m];
                  if (!l[p.cid])
                      o.push(p)
              }
              if (o.length)
                  this._removeModels(o, e)
          }
          var b = false;
          var x = !v && u && f;
          if (s.length && x) {
              b = this.length !== s.length || i.some(this.models, function(t, e) {
                  return t !== s[e]
              });
              this.models.length = 0;
              I(this.models, s, 0);
              this.length = this.models.length
          } else if (a.length) {
              if (v)
                  d = true;
              I(this.models, a, n == null ? this.length : n);
              this.length = this.models.length
          }
          if (d)
              this.sort({
                  silent: true
              });
          if (!e.silent) {
              for (m = 0; m < a.length; m++) {
                  if (n != null)
                      e.index = n + m;
                  p = a[m];
                  p.trigger("add", p, this, e)
              }
              if (d || b)
                  this.trigger("sort", this, e);
              if (a.length || o.length || h.length) {
                  e.changes = {
                      added: a,
                      removed: o,
                      merged: h
                  };
                  this.trigger("update", this, e)
              }
          }
          return r ? t[0] : t
      },
      reset: function(t, e) {
          e = e ? i.clone(e) : {};
          for (var r = 0; r < this.models.length; r++) {
              this._removeReference(this.models[r], e)
          }
          e.previousModels = this.models;
          this._reset();
          t = this.add(t, i.extend({
              silent: true
          }, e));
          if (!e.silent)
              this.trigger("reset", this, e);
          return t
      },
      push: function(t, e) {
          return this.add(t, i.extend({
              at: this.length
          }, e))
      },
      pop: function(t) {
          var e = this.at(this.length - 1);
          return this.remove(e, t)
      },
      unshift: function(t, e) {
          return this.add(t, i.extend({
              at: 0
          }, e))
      },
      shift: function(t) {
          var e = this.at(0);
          return this.remove(e, t)
      },
      slice: function() {
          return s.apply(this.models, arguments)
      },
      get: function(t) {
          if (t == null)
              return void 0;
          return this._byId[t] || this._byId[this.modelId(t.attributes || t)] || t.cid && this._byId[t.cid]
      },
      has: function(t) {
          return this.get(t) != null
      },
      at: function(t) {
          if (t < 0)
              t += this.length;
          return this.models[t]
      },
      where: function(t, e) {
          return this[e ? "find" : "filter"](t)
      },
      findWhere: function(t) {
          return this.where(t, true)
      },
      sort: function(t) {
          var e = this.comparator;
          if (!e)
              throw new Error("Cannot sort a set without a comparator");
          t || (t = {});
          var r = e.length;
          if (i.isFunction(e))
              e = i.bind(e, this);
          if (r === 1 || i.isString(e)) {
              this.models = this.sortBy(e)
          } else {
              this.models.sort(e)
          }
          if (!t.silent)
              this.trigger("sort", this, t);
          return this
      },
      pluck: function(t) {
          return this.map(t + "")
      },
      fetch: function(t) {
          t = i.extend({
              parse: true
          }, t);
          var e = t.success;
          var r = this;
          t.success = function(i) {
              var n = t.reset ? "reset" : "set";
              r[n](i, t);
              if (e)
                  e.call(t.context, r, i, t);
              r.trigger("sync", r, i, t)
          };
          B(this, t);
          return this.sync("read", this, t)
      },
      create: function(t, e) {
          e = e ? i.clone(e) : {};
          var r = e.wait;
          t = this._prepareModel(t, e);
          if (!t)
              return false;
          if (!r)
              this.add(t, e);
          var n = this;
          var s = e.success;
          e.success = function(t, e, i) {
              if (r)
                  n.add(t, i);
              if (s)
                  s.call(i.context, t, e, i)
          };
          t.save(null, e);
          return t
      },
      parse: function(t, e) {
          return t
      },
      clone: function() {
          return new this.constructor(this.models, {
              model: this.model,
              comparator: this.comparator
          })
      },
      modelId: function(t) {
          return t[this.model.prototype.idAttribute || "id"]
      },
      _reset: function() {
          this.length = 0;
          this.models = [];
          this._byId = {}
      },
      _prepareModel: function(t, e) {
          if (this._isModel(t)) {
              if (!t.collection)
                  t.collection = this;
              return t
          }
          e = e ? i.clone(e) : {};
          e.collection = this;
          var r = new this.model(t, e);
          if (!r.validationError)
              return r;
          this.trigger("invalid", this, r.validationError, e);
          return false
      },
      _removeModels: function(t, e) {
          var i = [];
          for (var r = 0; r < t.length; r++) {
              var n = this.get(t[r]);
              if (!n)
                  continue;
              var s = this.indexOf(n);
              this.models.splice(s, 1);
              this.length--;
              delete this._byId[n.cid];
              var a = this.modelId(n.attributes);
              if (a != null)
                  delete this._byId[a];
              if (!e.silent) {
                  e.index = s;
                  n.trigger("remove", n, this, e)
              }
              i.push(n);
              this._removeReference(n, e)
          }
          return i
      },
      _isModel: function(t) {
          return t instanceof y
      },
      _addReference: function(t, e) {
          this._byId[t.cid] = t;
          var i = this.modelId(t.attributes);
          if (i != null)
              this._byId[i] = t;
          t.on("all", this._onModelEvent, this)
      },
      _removeReference: function(t, e) {
          delete this._byId[t.cid];
          var i = this.modelId(t.attributes);
          if (i != null)
              delete this._byId[i];
          if (this === t.collection)
              delete t.collection;
          t.off("all", this._onModelEvent, this)
      },
      _onModelEvent: function(t, e, i, r) {
          if (e) {
              if ((t === "add" || t === "remove") && i !== this)
                  return;
              if (t === "destroy")
                  this.remove(e, r);
              if (t === "change") {
                  var n = this.modelId(e.previousAttributes());
                  var s = this.modelId(e.attributes);
                  if (n !== s) {
                      if (n != null)
                          delete this._byId[n];
                      if (s != null)
                          this._byId[s] = e
                  }
              }
          }
          this.trigger.apply(this, arguments)
      }
  });
  var S = {
      forEach: 3,
      each: 3,
      map: 3,
      collect: 3,
      reduce: 0,
      foldl: 0,
      inject: 0,
      reduceRight: 0,
      foldr: 0,
      find: 3,
      detect: 3,
      filter: 3,
      select: 3,
      reject: 3,
      every: 3,
      all: 3,
      some: 3,
      any: 3,
      include: 3,
      includes: 3,
      contains: 3,
      invoke: 0,
      max: 3,
      min: 3,
      toArray: 1,
      size: 1,
      first: 3,
      head: 3,
      take: 3,
      initial: 3,
      rest: 3,
      tail: 3,
      drop: 3,
      last: 3,
      without: 0,
      difference: 0,
      indexOf: 3,
      shuffle: 1,
      lastIndexOf: 3,
      isEmpty: 1,
      chain: 1,
      sample: 3,
      partition: 3,
      groupBy: 3,
      countBy: 3,
      sortBy: 3,
      indexBy: 3,
      findIndex: 3,
      findLastIndex: 3
  };
  h(x, S, "models");
  var k = e.View = function(t) {
      this.cid = i.uniqueId("view");
      i.extend(this, i.pick(t, P));
      this._ensureElement();
      this.initialize.apply(this, arguments)
  };
  var T = /^(\S+)\s*(.*)$/;
  var P = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
  i.extend(k.prototype, u, {
      tagName: "div",
      $: function(t) {
          return this.$el.find(t)
      },
      initialize: function() {},
      render: function() {
          return this
      },
      remove: function() {
          this._removeElement();
          this.stopListening();
          return this
      },
      _removeElement: function() {
          this.$el.remove()
      },
      setElement: function(t) {
          this.undelegateEvents();
          this._setElement(t);
          this.delegateEvents();
          return this
      },
      _setElement: function(t) {
          this.$el = t instanceof e.$ ? t : e.$(t);
          this.el = this.$el[0]
      },
      delegateEvents: function(t) {
          t || (t = i.result(this, "events"));
          if (!t)
              return this;
          this.undelegateEvents();
          for (var e in t) {
              var r = t[e];
              if (!i.isFunction(r))
                  r = this[r];
              if (!r)
                  continue;
              var n = e.match(T);
              this.delegate(n[1], n[2], i.bind(r, this))
          }
          return this
      },
      delegate: function(t, e, i) {
          this.$el.on(t + ".delegateEvents" + this.cid, e, i);
          return this
      },
      undelegateEvents: function() {
          if (this.$el)
              this.$el.off(".delegateEvents" + this.cid);
          return this
      },
      undelegate: function(t, e, i) {
          this.$el.off(t + ".delegateEvents" + this.cid, e, i);
          return this
      },
      _createElement: function(t) {
          return document.createElement(t)
      },
      _ensureElement: function() {
          if (!this.el) {
              var t = i.extend({}, i.result(this, "attributes"));
              if (this.id)
                  t.id = i.result(this, "id");
              if (this.className)
                  t["class"] = i.result(this, "className");
              this.setElement(this._createElement(i.result(this, "tagName")));
              this._setAttributes(t)
          } else {
              this.setElement(i.result(this, "el"))
          }
      },
      _setAttributes: function(t) {
          this.$el.attr(t)
      }
  });
  e.sync = function(t, r, n) {
      var s = H[t];
      i.defaults(n || (n = {}), {
          emulateHTTP: e.emulateHTTP,
          emulateJSON: e.emulateJSON
      });
      var a = {
          type: s,
          dataType: "json"
      };
      if (!n.url) {
          a.url = i.result(r, "url") || F()
      }
      if (n.data == null && r && (t === "create" || t === "update" || t === "patch")) {
          a.contentType = "application/json";
          a.data = JSON.stringify(n.attrs || r.toJSON(n))
      }
      if (n.emulateJSON) {
          a.contentType = "application/x-www-form-urlencoded";
          a.data = a.data ? {
              model: a.data
          } : {}
      }
      if (n.emulateHTTP && (s === "PUT" || s === "DELETE" || s === "PATCH")) {
          a.type = "POST";
          if (n.emulateJSON)
              a.data._method = s;
          var h = n.beforeSend;
          n.beforeSend = function(t) {
              t.setRequestHeader("X-HTTP-Method-Override", s);
              if (h)
                  return h.apply(this, arguments)
          }
      }
      if (a.type !== "GET" && !n.emulateJSON) {
          a.processData = false
      }
      var o = n.error;
      n.error = function(t, e, i) {
          n.textStatus = e;
          n.errorThrown = i;
          if (o)
              o.call(n.context, t, e, i)
      };
      var l = n.xhr = e.ajax(i.extend(a, n));
      r.trigger("request", r, l, n);
      return l
  };
  var H = {
      create: "POST",
      update: "PUT",
      patch: "PATCH",
      "delete": "DELETE",
      read: "GET"
  };
  e.ajax = function() {
      return e.$.ajax.apply(e.$, arguments)
  };
  var $ = e.Router = function(t) {
      t || (t = {});
      if (t.routes)
          this.routes = t.routes;
      this._bindRoutes();
      this.initialize.apply(this, arguments)
  };
  var A = /\((.*?)\)/g;
  var C = /(\(\?)?:\w+/g;
  var R = /\*\w+/g;
  var j = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  i.extend($.prototype, u, {
      initialize: function() {},
      route: function(t, r, n) {
          if (!i.isRegExp(t))
              t = this._routeToRegExp(t);
          if (i.isFunction(r)) {
              n = r;
              r = ""
          }
          if (!n)
              n = this[r];
          var s = this;
          e.history.route(t, function(i) {
              var a = s._extractParameters(t, i);
              if (s.execute(n, a, r) !== false) {
                  s.trigger.apply(s, ["route:" + r].concat(a));
                  s.trigger("route", r, a);
                  e.history.trigger("route", s, r, a)
              }
          });
          return this
      },
      execute: function(t, e, i) {
          if (t)
              t.apply(this, e)
      },
      navigate: function(t, i) {
          e.history.navigate(t, i);
          return this
      },
      _bindRoutes: function() {
          if (!this.routes)
              return;
          this.routes = i.result(this, "routes");
          var t,
              e = i.keys(this.routes);
          while ((t = e.pop()) != null) {
              this.route(t, this.routes[t])
          }
      },
      _routeToRegExp: function(t) {
          t = t.replace(j, "\\$&").replace(A, "(?:$1)?").replace(C, function(t, e) {
              return e ? t : "([^/?]+)"
          }).replace(R, "([^?]*?)");
          return new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
      },
      _extractParameters: function(t, e) {
          var r = t.exec(e).slice(1);
          return i.map(r, function(t, e) {
              if (e === r.length - 1)
                  return t || null;
              return t ? decodeURIComponent(t) : null
          })
      }
  });
  var N = e.History = function() {
      this.handlers = [];
      this.checkUrl = i.bind(this.checkUrl, this);
      if (typeof window !== "undefined") {
          this.location = window.location;
          this.history = window.history
      }
  };
  var M = /^[#\/]|\s+$/g;
  var O = /^\/+|\/+$/g;
  var U = /#.*$/;
  N.started = false;
  i.extend(N.prototype, u, {
      interval: 50,
      atRoot: function() {
          var t = this.location.pathname.replace(/[^\/]$/, "$&/");
          return t === this.root && !this.getSearch()
      },
      matchRoot: function() {
          var t = this.decodeFragment(this.location.pathname);
          var e = t.slice(0, this.root.length - 1) + "/";
          return e === this.root
      },
      decodeFragment: function(t) {
          return decodeURI(t.replace(/%25/g, "%2525"))
      },
      getSearch: function() {
          var t = this.location.href.replace(/#.*/, "").match(/\?.+/);
          return t ? t[0] : ""
      },
      getHash: function(t) {
          var e = (t || this).location.href.match(/#(.*)$/);
          return e ? e[1] : ""
      },
      getPath: function() {
          var t = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
          return t.charAt(0) === "/" ? t.slice(1) : t
      },
      getFragment: function(t) {
          if (t == null) {
              if (this._usePushState || !this._wantsHashChange) {
                  t = this.getPath()
              } else {
                  t = this.getHash()
              }
          }
          return t.replace(M, "")
      },
      start: function(t) {
          if (N.started)
              throw new Error("Backbone.history has already been started");
          N.started = true;
          this.options = i.extend({
              root: "/"
          }, this.options, t);
          this.root = this.options.root;
          this._wantsHashChange = this.options.hashChange !== false;
          this._hasHashChange = "onhashchange" in window && (document.documentMode === void 0 || document.documentMode > 7);
          this._useHashChange = this._wantsHashChange && this._hasHashChange;
          this._wantsPushState = !!this.options.pushState;
          this._hasPushState = !!(this.history && this.history.pushState);
          this._usePushState = this._wantsPushState && this._hasPushState;
          this.fragment = this.getFragment();
          this.root = ("/" + this.root + "/").replace(O, "/");
          if (this._wantsHashChange && this._wantsPushState) {
              if (!this._hasPushState && !this.atRoot()) {
                  var e = this.root.slice(0, -1) || "/";
                  this.location.replace(e + "#" + this.getPath());
                  return true
              } else if (this._hasPushState && this.atRoot()) {
                  this.navigate(this.getHash(), {
                      replace: true
                  })
              }
          }
          if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
              this.iframe = document.createElement("iframe");
              this.iframe.src = "javascript:0";
              this.iframe.style.display = "none";
              this.iframe.tabIndex = -1;
              var r = document.body;
              var n = r.insertBefore(this.iframe, r.firstChild).contentWindow;
              n.document.open();
              n.document.close();
              n.location.hash = "#" + this.fragment
          }
          var s = window.addEventListener || function(t, e) {
              return attachEvent("on" + t, e)
          };
          if (this._usePushState) {
              s("popstate", this.checkUrl, false)
          } else if (this._useHashChange && !this.iframe) {
              s("hashchange", this.checkUrl, false)
          } else if (this._wantsHashChange) {
              this._checkUrlInterval = setInterval(this.checkUrl, this.interval)
          }
          if (!this.options.silent)
              return this.loadUrl()
      },
      stop: function() {
          var t = window.removeEventListener || function(t, e) {
              return detachEvent("on" + t, e)
          };
          if (this._usePushState) {
              t("popstate", this.checkUrl, false)
          } else if (this._useHashChange && !this.iframe) {
              t("hashchange", this.checkUrl, false)
          }
          if (this.iframe) {
              document.body.removeChild(this.iframe);
              this.iframe = null
          }
          if (this._checkUrlInterval)
              clearInterval(this._checkUrlInterval);
          N.started = false
      },
      route: function(t, e) {
          this.handlers.unshift({
              route: t,
              callback: e
          })
      },
      checkUrl: function(t) {
          var e = this.getFragment();
          if (e === this.fragment && this.iframe) {
              e = this.getHash(this.iframe.contentWindow)
          }
          if (e === this.fragment)
              return false;
          if (this.iframe)
              this.navigate(e);
          this.loadUrl()
      },
      loadUrl: function(t) {
          if (!this.matchRoot())
              return false;
          t = this.fragment = this.getFragment(t);
          return i.some(this.handlers, function(e) {
              if (e.route.test(t)) {
                  e.callback(t);
                  return true
              }
          })
      },
      navigate: function(t, e) {
          if (!N.started)
              return false;
          if (!e || e === true)
              e = {
                  trigger: !!e
              };
          t = this.getFragment(t || "");
          var i = this.root;
          if (t === "" || t.charAt(0) === "?") {
              i = i.slice(0, -1) || "/"
          }
          var r = i + t;
          t = this.decodeFragment(t.replace(U, ""));
          if (this.fragment === t)
              return;
          this.fragment = t;
          if (this._usePushState) {
              this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, r)
          } else if (this._wantsHashChange) {
              this._updateHash(this.location, t, e.replace);
              if (this.iframe && t !== this.getHash(this.iframe.contentWindow)) {
                  var n = this.iframe.contentWindow;
                  if (!e.replace) {
                      n.document.open();
                      n.document.close()
                  }
                  this._updateHash(n.location, t, e.replace)
              }
          } else {
              return this.location.assign(r)
          }
          if (e.trigger)
              return this.loadUrl(t)
      },
      _updateHash: function(t, e, i) {
          if (i) {
              var r = t.href.replace(/(javascript:|#).*$/, "");
              t.replace(r + "#" + e)
          } else {
              t.hash = "#" + e
          }
      }
  });
  e.history = new N;
  var q = function(t, e) {
      var r = this;
      var n;
      if (t && i.has(t, "constructor")) {
          n = t.constructor
      } else {
          n = function() {
              return r.apply(this, arguments)
          }
      }
      i.extend(n, r, e);
      n.prototype = i.create(r.prototype, t);
      n.prototype.constructor = n;
      n.__super__ = r.prototype;
      return n
  };
  y.extend = x.extend = $.extend = k.extend = N.extend = q;
  var F = function() {
      throw new Error('A "url" property or function must be specified')
  };
  var B = function(t, e) {
      var i = e.error;
      e.error = function(r) {
          if (i)
              i.call(e.context, t, r, e);
          t.trigger("error", t, r, e)
      }
  };
  return e
});

(function($) {
  $.i18n = {};
  $.i18n.map = {};
  $.i18n.properties = function(settings) {
      var defaults = {
          name: 'Messages',
          language: '',
          path: '',
          mode: 'vars',
          cache: false,
          encoding: 'UTF-8',
          async: false,
          checkAvailableLanguages: false,
          callback: null
      };
      settings = $.extend(defaults, settings);
      settings.language = this.normaliseLanguageCode(settings.language);
      var languagesFileLoadedCallback = function(languages) {
          settings.totalFiles = 0;
          settings.filesLoaded = 0;
          var files = getFiles(settings.name);
          if (settings.async) {
              for (var i = 0, j = files.length; i < j; i++) {
                  settings.totalFiles += 1;
                  var shortCode = settings.language.substring(0, 2);
                  if (languages.length == 0 || $.inArray(shortCode, languages) != -1) {
                      settings.totalFiles += 1;
                  }
                  if (settings.language.length >= 5) {
                      var longCode = settings.language.substring(0, 5);
                      if (languages.length == 0 || $.inArray(longCode, languages) != -1) {
                          settings.totalFiles += 1;
                      }
                  }
              }
          }
          for (var k = 0, m = files.length; k < m; k++) {
              loadAndParseFile(settings.path + files[k] + '.properties', settings);
              var shortCode = settings.language.substring(0, 2);
              if (languages.length == 0 || $.inArray(shortCode, languages) != -1) {
                  loadAndParseFile(settings.path + files[k] + '_' + shortCode + '.properties', settings);
              }
              if (settings.language.length >= 5) {
                  var longCode = settings.language.substring(0, 5);
                  if (languages.length == 0 || $.inArray(longCode, languages) != -1) {
                      loadAndParseFile(settings.path + files[k] + '_' + longCode + '.properties', settings);
                  }
              }
          }
          if (settings.callback && !settings.async) {
              settings.callback();
          }
      };
      if (settings.checkAvailableLanguages) {
          $.ajax({
              url: settings.path + 'languages.json',
              async: settings.async,
              cache: false,
              success: function(data, textStatus, jqXHR) {
                  languagesFileLoadedCallback(data.languages || []);
              }
          });
      } else {
          languagesFileLoadedCallback([]);
      }
  };
  $.i18n.prop = function(key) {
      var value = $.i18n.map[key];
      if (value == null)
          return '[' + key + ']';
      var phvList;
      if (arguments.length == 2 && $.isArray(arguments[1]))
          phvList = arguments[1];
      var i;
      if (typeof (value) == 'string') {
          i = 0;
          while ((i = value.indexOf('\\', i)) != -1) {
              if (value.charAt(i + 1) == 't')
                  value = value.substring(0, i) + '\t' + value.substring((i++) + 2);
              else if (value.charAt(i + 1) == 'r')
                  value = value.substring(0, i) + '\r' + value.substring((i++) + 2);
              else if (value.charAt(i + 1) == 'n')
                  value = value.substring(0, i) + '\n' + value.substring((i++) + 2);
              else if (value.charAt(i + 1) == 'f')
                  value = value.substring(0, i) + '\f' + value.substring((i++) + 2);
              else if (value.charAt(i + 1) == '\\')
                  value = value.substring(0, i) + '\\' + value.substring((i++) + 2);
              else
                  value = value.substring(0, i) + value.substring(i + 1);
          }
          var arr = [],
              j,
              index;
          i = 0;
          while (i < value.length) {
              if (value.charAt(i) == '\'') {
                  if (i == value.length - 1)
                      value = value.substring(0, i);
                  else if (value.charAt(i + 1) == '\'')
                      value = value.substring(0, i) + value.substring(++i);
                  else {
                      j = i + 2;
                      while ((j = value.indexOf('\'', j)) != -1) {
                          if (j == value.length - 1 || value.charAt(j + 1) != '\'') {
                              value = value.substring(0, i) + value.substring(i + 1, j) + value.substring(j + 1);
                              i = j - 1;
                              break;
                          }
                          else {
                              value = value.substring(0, j) + value.substring(++j);
                          }
                      }
                      if (j == -1) {
                          value = value.substring(0, i) + value.substring(i + 1);
                      }
                  }
              }
              else if (value.charAt(i) == '{') {
                  j = value.indexOf('}', i + 1);
                  if (j == -1)
                      i++;
                  else {
                      index = parseInt(value.substring(i + 1, j));
                      if (!isNaN(index) && index >= 0) {
                          var s = value.substring(0, i);
                          if (s != "")
                              arr.push(s);
                          arr.push(index);
                          i = 0;
                          value = value.substring(j + 1);
                      }
                      else
                          i = j + 1;
                  }
              }
              else
                  i++;
          }
          if (value != "")
              arr.push(value);
          value = arr;
          $.i18n.map[key] = arr;
      }
      if (value.length == 0)
          return "";
      if (value.length == 1 && typeof (value[0]) == "string")
          return value[0];
      var str = "";
      for (i = 0; i < value.length; i++) {
          if (typeof (value[i]) == "string")
              str += value[i];
          else if (phvList && value[i] < phvList.length)
              str += phvList[value[i]];
          else if (!phvList && value[i] + 1 < arguments.length)
              str += arguments[value[i] + 1];
          else
              str += "{" + value[i] + "}";
      }
      return str;
  };
  function callbackIfComplete(settings) {
      if (settings.async) {
          settings.filesLoaded += 1;
          if (settings.filesLoaded === settings.totalFiles) {
              if (settings.callback) {
                  settings.callback();
              }
          }
      }
  }
  function loadAndParseFile(filename, settings) {
      $.ajax({
          url: filename,
          async: settings.async,
          cache: settings.cache,
          dataType: 'text',
          success: function(data, status) {
              parseData(data, settings.mode);
              callbackIfComplete(settings);
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.log('Failed to download or parse ' + filename);
              callbackIfComplete(settings);
          }
      });
  }
  function parseData(data, mode) {
      var parsed = '';
      var parameters = data.split(/\n/);
      var regPlaceHolder = /(\{\d+})/g;
      var regRepPlaceHolder = /\{(\d+)}/g;
      var unicodeRE = /(\\u.{4})/ig;
      for (var i = 0; i < parameters.length; i++) {
          parameters[i] = parameters[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
          if (parameters[i].length > 0 && parameters[i].match("^#") != "#") {
              var pair = parameters[i].split('=');
              if (pair.length > 0) {
                  var name = decodeURI(pair[0]).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                  var value = pair.length == 1 ? "" : pair[1];
                  while (value.match(/\\$/) == "\\") {
                      value = value.substring(0, value.length - 1);
                      value += parameters[++i].replace(/\s\s*$/, '');
                  }
                  for (var s = 2; s < pair.length; s++) {
                      value += '=' + pair[s];
                  }
                  value = value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                  if (mode == 'map' || mode == 'both') {
                      var unicodeMatches = value.match(unicodeRE);
                      if (unicodeMatches) {
                          for (var u = 0; u < unicodeMatches.length; u++) {
                              value = value.replace(unicodeMatches[u], unescapeUnicode(unicodeMatches[u]));
                          }
                      }
                      $.i18n.map[name] = value;
                  }
                  if (mode == 'vars' || mode == 'both') {
                      value = value.replace(/"/g, '\\"');
                      checkKeyNamespace(name);
                      if (regPlaceHolder.test(value)) {
                          var parts = value.split(regPlaceHolder);
                          var first = true;
                          var fnArgs = '';
                          var usedArgs = [];
                          for (var p = 0; p < parts.length; p++) {
                              if (regPlaceHolder.test(parts[p]) && (usedArgs.length == 0 || usedArgs.indexOf(parts[p]) == -1)) {
                                  if (!first) {
                                      fnArgs += ',';
                                  }
                                  fnArgs += parts[p].replace(regRepPlaceHolder, 'v$1');
                                  usedArgs.push(parts[p]);
                                  first = false;
                              }
                          }
                          parsed += name + '=function(' + fnArgs + '){';
                          var fnExpr = '"' + value.replace(regRepPlaceHolder, '"+v$1+"') + '"';
                          parsed += 'return ' + fnExpr + ';' + '};';
                      } else {
                          parsed += name + '="' + value + '";';
                      }
                  }
              }
          }
      }
      eval(parsed);
  }
  function checkKeyNamespace(key) {
      var regDot = /\./;
      if (regDot.test(key)) {
          var fullname = '';
          var names = key.split(/\./);
          for (var i = 0; i < names.length; i++) {
              if (i > 0) {
                  fullname += '.';
              }
              fullname += names[i];
              if (eval('typeof ' + fullname + ' == "undefined"')) {
                  eval(fullname + '={};');
              }
          }
      }
  }
  function getFiles(names) {
      return (names && names.constructor == Array) ? names : [names];
  }
  $.i18n.normaliseLanguageCode = function(lang) {
      if (!lang || lang.length < 2) {
          lang = (navigator.languages) ? navigator.languages[0] : (navigator.language || navigator.userLanguage || 'en');
      }
      lang = lang.toLowerCase();
      lang = lang.replace(/-/, "_");
      if (lang.length > 3) {
          lang = lang.substring(0, 3) + lang.substring(3).toUpperCase();
      }
      return lang;
  };
  function unescapeUnicode(str) {
      var codes = [];
      var code = parseInt(str.substr(2), 16);
      if (code >= 0 && code < Math.pow(2, 16)) {
          codes.push(code);
      }
      var unescaped = '';
      for (var i = 0; i < codes.length; ++i) {
          unescaped += String.fromCharCode(codes[i]);
      }
      return unescaped;
  }
  var cbSplit;
  if (!cbSplit) {
      cbSplit = function(str, separator, limit) {
          if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
              if (typeof cbSplit._nativeSplit == "undefined")
                  return str.split(separator, limit);
              else
                  return cbSplit._nativeSplit.call(str, separator, limit);
          }
          var output = [],
              lastLastIndex = 0,
              flags = (separator.ignoreCase ? "i" : "") +
              (separator.multiline ? "m" : "") +
              (separator.sticky ? "y" : ""),
              separator = new RegExp(separator.source, flags + "g"),
              separator2,
              match,
              lastIndex,
              lastLength;
          str = str + "";
          if (!cbSplit._compliantExecNpcg) {
              separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
          }
          if (limit === undefined || +limit < 0) {
              limit = Infinity;
          } else {
              limit = Math.floor(+limit);
              if (!limit) {
                  return [];
              }
          }
          while (match = separator.exec(str)) {
              lastIndex = match.index + match[0].length;
              if (lastIndex > lastLastIndex) {
                  output.push(str.slice(lastLastIndex, match.index));
                  if (!cbSplit._compliantExecNpcg && match.length > 1) {
                      match[0].replace(separator2, function() {
                          for (var i = 1; i < arguments.length - 2; i++) {
                              if (arguments[i] === undefined) {
                                  match[i] = undefined;
                              }
                          }
                      });
                  }
                  if (match.length > 1 && match.index < str.length) {
                      Array.prototype.push.apply(output, match.slice(1));
                  }
                  lastLength = match[0].length;
                  lastLastIndex = lastIndex;
                  if (output.length >= limit) {
                      break;
                  }
              }
              if (separator.lastIndex === match.index) {
                  separator.lastIndex++;
              }
          }
          if (lastLastIndex === str.length) {
              if (lastLength || !separator.test("")) {
                  output.push("");
              }
          } else {
              output.push(str.slice(lastLastIndex));
          }
          return output.length > limit ? output.slice(0, limit) : output;
      };
      cbSplit._compliantExecNpcg = /()??/.exec("")[1] === undefined;
      cbSplit._nativeSplit = String.prototype.split;
  }
  String.prototype.split = function(separator, limit) {
      return cbSplit(this, separator, limit);
  };
})(jQuery);

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.Vue = factory());
}(this, function() {
  'use strict';
  var emptyObject = Object.freeze({});
  function isUndef(v) {
      return v === undefined || v === null
  }
  function isDef(v) {
      return v !== undefined && v !== null
  }
  function isTrue(v) {
      return v === true
  }
  function isFalse(v) {
      return v === false
  }
  function isPrimitive(value) {
      return ( typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol' || typeof value === 'boolean')
  }
  function isObject(obj) {
      return obj !== null && typeof obj === 'object'
  }
  var _toString = Object.prototype.toString;
  function toRawType(value) {
      return _toString.call(value).slice(8, -1)
  }
  function isPlainObject(obj) {
      return _toString.call(obj) === '[object Object]'
  }
  function isRegExp(v) {
      return _toString.call(v) === '[object RegExp]'
  }
  function isValidArrayIndex(val) {
      var n = parseFloat(String(val));
      return n >= 0 && Math.floor(n) === n && isFinite(val)
  }
  function isPromise(val) {
      return ( isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function')
  }
  function toString(val) {
      return val == null ? '' : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString) ? JSON.stringify(val, null, 2) : String(val)
  }
  function toNumber(val) {
      var n = parseFloat(val);
      return isNaN(n) ? val : n
  }
  function makeMap(str, expectsLowerCase) {
      var map = Object.create(null);
      var list = str.split(',');
      for (var i = 0; i < list.length; i++) {
          map[list[i]] = true;
      }
      return expectsLowerCase ? function(val) {
          return map[val.toLowerCase()];
      } : function(val) {
          return map[val];
      }
  }
  var isBuiltInTag = makeMap('slot,component', true);
  var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
  function remove(arr, item) {
      if (arr.length) {
          var index = arr.indexOf(item);
          if (index > -1) {
              return arr.splice(index, 1)
          }
      }
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key)
  }
  function cached(fn) {
      var cache = Object.create(null);
      return ( function cachedFn(str) {
          var hit = cache[str];
          return hit || (cache[str] = fn(str))
      })
  }
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function(str) {
      return str.replace(camelizeRE, function(_, c) {
          return c ? c.toUpperCase() : '';
      })
  });
  var capitalize = cached(function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cached(function(str) {
      return str.replace(hyphenateRE, '-$1').toLowerCase()
  });
  function polyfillBind(fn, ctx) {
      function boundFn(a) {
          var l = arguments.length;
          return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx)
      }
      boundFn._length = fn.length;
      return boundFn
  }
  function nativeBind(fn, ctx) {
      return fn.bind(ctx)
  }
  var bind = Function.prototype.bind ? nativeBind : polyfillBind;
  function toArray(list, start) {
      start = start || 0;
      var i = list.length - start;
      var ret = new Array(i);
      while (i--) {
          ret[i] = list[i + start];
      }
      return ret
  }
  function extend(to, _from) {
      for (var key in _from) {
          to[key] = _from[key];
      }
      return to
  }
  function toObject(arr) {
      var res = {};
      for (var i = 0; i < arr.length; i++) {
          if (arr[i]) {
              extend(res, arr[i]);
          }
      }
      return res
  }
  function noop(a, b, c) {}
  var no = function(a, b, c) {
      return false;
  };
  var identity = function(_) {
      return _;
  };
  function genStaticKeys(modules) {
      return modules.reduce(function(keys, m) {
          return keys.concat(m.staticKeys || [])
      }, []).join(',')
  }
  function looseEqual(a, b) {
      if (a === b) {
          return true
      }
      var isObjectA = isObject(a);
      var isObjectB = isObject(b);
      if (isObjectA && isObjectB) {
          try {
              var isArrayA = Array.isArray(a);
              var isArrayB = Array.isArray(b);
              if (isArrayA && isArrayB) {
                  return a.length === b.length && a.every(function(e, i) {
                          return looseEqual(e, b[i])
                      })
              } else if (a instanceof Date && b instanceof Date) {
                  return a.getTime() === b.getTime()
              } else if (!isArrayA && !isArrayB) {
                  var keysA = Object.keys(a);
                  var keysB = Object.keys(b);
                  return keysA.length === keysB.length && keysA.every(function(key) {
                          return looseEqual(a[key], b[key])
                      })
              } else {
                  return false
              }
          } catch (e) {
              return false
          }
      } else if (!isObjectA && !isObjectB) {
          return String(a) === String(b)
      } else {
          return false
      }
  }
  function looseIndexOf(arr, val) {
      for (var i = 0; i < arr.length; i++) {
          if (looseEqual(arr[i], val)) {
              return i
          }
      }
      return -1
  }
  function once(fn) {
      var called = false;
      return function() {
          if (!called) {
              called = true;
              fn.apply(this, arguments);
          }
      }
  }
  var SSR_ATTR = 'data-server-rendered';
  var ASSET_TYPES = ['component', 'directive', 'filter'];
  var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
  var config = ({
      optionMergeStrategies: Object.create(null),
      silent: false,
      productionTip: "development" !== 'production',
      devtools: "development" !== 'production',
      performance: false,
      errorHandler: null,
      warnHandler: null,
      ignoredElements: [],
      keyCodes: Object.create(null),
      isReservedTag: no,
      isReservedAttr: no,
      isUnknownElement: no,
      getTagNamespace: noop,
      parsePlatformTagName: identity,
      mustUseProp: no,
      async: true,
      _lifecycleHooks: LIFECYCLE_HOOKS
  });
  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
  function isReserved(str) {
      var c = (str + '').charCodeAt(0);
      return c === 0x24 || c === 0x5F
  }
  function def(obj, key, val, enumerable) {
      Object.defineProperty(obj, key, {
          value: val,
          enumerable: !!enumerable,
          writable: true,
          configurable: true
      });
  }
  var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
  function parsePath(path) {
      if (bailRE.test(path)) {
          return
      }
      var segments = path.split('.');
      return function(obj) {
          for (var i = 0; i < segments.length; i++) {
              if (!obj) {
                  return
              }
              obj = obj[segments[i]];
          }
          return obj
      }
  }
  var hasProto = '__proto__' in {};
  var inBrowser = typeof window !== 'undefined';
  var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
  var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
  var isEdge = UA && UA.indexOf('edge/') > 0;
  var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
  var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
  var isPhantomJS = UA && /phantomjs/.test(UA);
  var isFF = UA && UA.match(/firefox\/(\d+)/);
  var nativeWatch = ({}).watch;
  var supportsPassive = false;
  if (inBrowser) {
      try {
          var opts = {};
          Object.defineProperty(opts, 'passive', ({
              get: function get() {
                  supportsPassive = true;
              }
          }));
          window.addEventListener('test-passive', null, opts);
      } catch (e) {}
  }
  var _isServer;
  var isServerRendering = function() {
      if (_isServer === undefined) {
          if (!inBrowser && !inWeex && typeof global !== 'undefined') {
              _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
          } else {
              _isServer = false;
          }
      }
      return _isServer
  };
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
  function isNative(Ctor) {
      return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
  }
  var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
  var _Set;
  if (typeof Set !== 'undefined' && isNative(Set)) {
      _Set = Set;
  } else {
      _Set = (function() {
          function Set() {
              this.set = Object.create(null);
          }
          Set.prototype.has = function has(key) {
              return this.set[key] === true
          };
          Set.prototype.add = function add(key) {
              this.set[key] = true;
          };
          Set.prototype.clear = function clear() {
              this.set = Object.create(null);
          };
          return Set;
      }());
  }
  var warn = noop;
  var tip = noop;
  var generateComponentTrace = (noop);
  var formatComponentName = (noop);
  {
      var hasConsole = typeof console !== 'undefined';
      var classifyRE = /(?:^|[-_])(\w)/g;
      var classify = function(str) {
          return str.replace(classifyRE, function(c) {
              return c.toUpperCase();
          }).replace(/[-_]/g, '');
      };
      warn = function(msg, vm) {
          var trace = vm ? generateComponentTrace(vm) : '';
          if (config.warnHandler) {
              config.warnHandler.call(null, msg, vm, trace);
          } else if (hasConsole && (!config.silent)) {
              console.error(("[Vue warn]: " + msg + trace));
          }
      };
      tip = function(msg, vm) {
          if (hasConsole && (!config.silent)) {
              console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
          }
      };
      formatComponentName = function(vm, includeFile) {
          if (vm.$root === vm) {
              return '<Root>'
          }
          var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
          var name = options.name || options._componentTag;
          var file = options.__file;
          if (!name && file) {
              var match = file.match(/([^/\\]+)\.vue$/);
              name = match && match[1];
          }
          return ( (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
          (file && includeFile !== false ? (" at " + file) : ''))
      };
      var repeat = function(str, n) {
          var res = '';
          while (n) {
              if (n % 2 === 1) {
                  res += str;
              }
              if (n > 1) {
                  str += str;
              }
              n >>= 1;
          }
          return res
      };
      generateComponentTrace = function(vm) {
          if (vm._isVue && vm.$parent) {
              var tree = [];
              var currentRecursiveSequence = 0;
              while (vm) {
                  if (tree.length > 0) {
                      var last = tree[tree.length - 1];
                      if (last.constructor === vm.constructor) {
                          currentRecursiveSequence++;
                          vm = vm.$parent;
                          continue
                      } else if (currentRecursiveSequence > 0) {
                          tree[tree.length - 1] = [last, currentRecursiveSequence];
                          currentRecursiveSequence = 0;
                      }
                  }
                  tree.push(vm);
                  vm = vm.$parent;
              }
              return '\n\nfound in\n\n' + tree.map(function(vm, i) {
                  return ( "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)") : formatComponentName(vm))) ;
              }).join('\n')
          } else {
              return ( "\n\n(found in " + (formatComponentName(vm)) + ")")
          }
      };
  }
  var uid = 0;
  var Dep = function Dep() {
      this.id = uid++;
      this.subs = [];
  };
  Dep.prototype.addSub = function addSub(sub) {
      this.subs.push(sub);
  };
  Dep.prototype.removeSub = function removeSub(sub) {
      remove(this.subs, sub);
  };
  Dep.prototype.depend = function depend() {
      if (Dep.target) {
          Dep.target.addDep(this);
      }
  };
  Dep.prototype.notify = function notify() {
      var subs = this.subs.slice();
      if (!config.async) {
          subs.sort(function(a, b) {
              return a.id - b.id;
          });
      }
      for (var i = 0, l = subs.length; i < l; i++) {
          subs[i].update();
      }
  };
  Dep.target = null;
  var targetStack = [];
  function pushTarget(target) {
      targetStack.push(target);
      Dep.target = target;
  }
  function popTarget() {
      targetStack.pop();
      Dep.target = targetStack[targetStack.length - 1];
  }
  var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
      this.tag = tag;
      this.data = data;
      this.children = children;
      this.text = text;
      this.elm = elm;
      this.ns = undefined;
      this.context = context;
      this.fnContext = undefined;
      this.fnOptions = undefined;
      this.fnScopeId = undefined;
      this.key = data && data.key;
      this.componentOptions = componentOptions;
      this.componentInstance = undefined;
      this.parent = undefined;
      this.raw = false;
      this.isStatic = false;
      this.isRootInsert = true;
      this.isComment = false;
      this.isCloned = false;
      this.isOnce = false;
      this.asyncFactory = asyncFactory;
      this.asyncMeta = undefined;
      this.isAsyncPlaceholder = false;
  };
  var prototypeAccessors = {
      child: {
          configurable: true
      }
  };
  prototypeAccessors.child.get = function() {
      return this.componentInstance
  };
  Object.defineProperties(VNode.prototype, prototypeAccessors);
  var createEmptyVNode = function(text) {
      if (text === void 0)
          text = '';
      var node = new VNode();
      node.text = text;
      node.isComment = true;
      return node
  };
  function createTextVNode(val) {
      return new VNode(undefined, undefined, undefined, String(val))
  }
  function cloneVNode(vnode) {
      var cloned = new VNode(vnode.tag, vnode.data, vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
      cloned.ns = vnode.ns;
      cloned.isStatic = vnode.isStatic;
      cloned.key = vnode.key;
      cloned.isComment = vnode.isComment;
      cloned.fnContext = vnode.fnContext;
      cloned.fnOptions = vnode.fnOptions;
      cloned.fnScopeId = vnode.fnScopeId;
      cloned.asyncMeta = vnode.asyncMeta;
      cloned.isCloned = true;
      return cloned
  }
  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);
  var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
  methodsToPatch.forEach(function(method) {
      var original = arrayProto[method];
      def(arrayMethods, method, function mutator() {
          var args = [],
              len = arguments.length;
          while (len--)
              args[len] = arguments[len];
          var result = original.apply(this, args);
          var ob = this.__ob__;
          var inserted;
          switch (method) {
          case 'push':
          case 'unshift':
              inserted = args;
              break
          case 'splice':
              inserted = args.slice(2);
              break
          }
          if (inserted) {
              ob.observeArray(inserted);
          }
          ob.dep.notify();
          return result
      });
  });
  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
  var shouldObserve = true;
  function toggleObserving(value) {
      shouldObserve = value;
  }
  var Observer = function Observer(value) {
      this.value = value;
      this.dep = new Dep();
      this.vmCount = 0;
      def(value, '__ob__', this);
      if (Array.isArray(value)) {
          if (hasProto) {
              protoAugment(value, arrayMethods);
          } else {
              copyAugment(value, arrayMethods, arrayKeys);
          }
          this.observeArray(value);
      } else {
          this.walk(value);
      }
  };
  Observer.prototype.walk = function walk(obj) {
      var keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
          defineReactive$$1(obj, keys[i]);
      }
  };
  Observer.prototype.observeArray = function observeArray(items) {
      for (var i = 0, l = items.length; i < l; i++) {
          observe(items[i]);
      }
  };
  function protoAugment(target, src) {
      target.__proto__ = src;
  }
  function copyAugment(target, src, keys) {
      for (var i = 0, l = keys.length; i < l; i++) {
          var key = keys[i];
          def(target, key, src[key]);
      }
  }
  function observe(value, asRootData) {
      if (!isObject(value) || value instanceof VNode) {
          return
      }
      var ob;
      if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
          ob = value.__ob__;
      } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
          ob = new Observer(value);
      }
      if (asRootData && ob) {
          ob.vmCount++;
      }
      return ob
  }
  function defineReactive$$1(obj, key, val, customSetter, shallow) {
      var dep = new Dep();
      var property = Object.getOwnPropertyDescriptor(obj, key);
      if (property && property.configurable === false) {
          return
      }
      var getter = property && property.get;
      var setter = property && property.set;
      if ((!getter || setter) && arguments.length === 2) {
          val = obj[key];
      }
      var childOb = !shallow && observe(val);
      Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: true,
          get: function reactiveGetter() {
              var value = getter ? getter.call(obj) : val;
              if (Dep.target) {
                  dep.depend();
                  if (childOb) {
                      childOb.dep.depend();
                      if (Array.isArray(value)) {
                          dependArray(value);
                      }
                  }
              }
              return value
          },
          set: function reactiveSetter(newVal) {
              var value = getter ? getter.call(obj) : val;
              if (newVal === value || (newVal !== newVal && value !== value)) {
                  return
              }
              if (customSetter) {
                  customSetter();
              }
              if (getter && !setter) {
                  return
              }
              if (setter) {
                  setter.call(obj, newVal);
              } else {
                  val = newVal;
              }
              childOb = !shallow && observe(newVal);
              dep.notify();
          }
      });
  }
  function set(target, key, val) {
      if (isUndef(target) || isPrimitive(target)) {
          warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
      }
      if (Array.isArray(target) && isValidArrayIndex(key)) {
          target.length = Math.max(target.length, key);
          target.splice(key, 1, val);
          return val
      }
      if (key in target && !(key in Object.prototype)) {
          target[key] = val;
          return val
      }
      var ob = (target).__ob__;
      if (target._isVue || (ob && ob.vmCount)) {
          warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
          return val
      }
      if (!ob) {
          target[key] = val;
          return val
      }
      defineReactive$$1(ob.value, key, val);
      ob.dep.notify();
      return val
  }
  function del(target, key) {
      if (isUndef(target) || isPrimitive(target)) {
          warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
      }
      if (Array.isArray(target) && isValidArrayIndex(key)) {
          target.splice(key, 1);
          return
      }
      var ob = (target).__ob__;
      if (target._isVue || (ob && ob.vmCount)) {
          warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
          return
      }
      if (!hasOwn(target, key)) {
          return
      }
      delete target[key];
      if (!ob) {
          return
      }
      ob.dep.notify();
  }
  function dependArray(value) {
      for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
          e = value[i];
          e && e.__ob__ && e.__ob__.dep.depend();
          if (Array.isArray(e)) {
              dependArray(e);
          }
      }
  }
  var strats = config.optionMergeStrategies;
  {
      strats.el = strats.propsData = function(parent, child, vm, key) {
          if (!vm) {
              warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
          }
          return defaultStrat(parent, child)
      };
  }
  function mergeData(to, from) {
      if (!from) {
          return to
      }
      var key,
          toVal,
          fromVal;
      var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
      for (var i = 0; i < keys.length; i++) {
          key = keys[i];
          if (key === '__ob__') {
              continue
          }
          toVal = to[key];
          fromVal = from[key];
          if (!hasOwn(to, key)) {
              set(to, key, fromVal);
          } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
              mergeData(toVal, fromVal);
          }
      }
      return to
  }
  function mergeDataOrFn(parentVal, childVal, vm) {
      if (!vm) {
          if (!childVal) {
              return parentVal
          }
          if (!parentVal) {
              return childVal
          }
          return function mergedDataFn() {
              return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal)
          }
      } else {
          return function mergedInstanceDataFn() {
              var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
              var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;
              if (instanceData) {
                  return mergeData(instanceData, defaultData)
              } else {
                  return defaultData
              }
          }
      }
  }
  strats.data = function(parentVal, childVal, vm) {
      if (!vm) {
          if (childVal && typeof childVal !== 'function') {
              warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
              return parentVal
          }
          return mergeDataOrFn(parentVal, childVal)
      }
      return mergeDataOrFn(parentVal, childVal, vm)
  };
  function mergeHook(parentVal, childVal) {
      var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
      return res ? dedupeHooks(res) : res
  }
  function dedupeHooks(hooks) {
      var res = [];
      for (var i = 0; i < hooks.length; i++) {
          if (res.indexOf(hooks[i]) === -1) {
              res.push(hooks[i]);
          }
      }
      return res
  }
  LIFECYCLE_HOOKS.forEach(function(hook) {
      strats[hook] = mergeHook;
  });
  function mergeAssets(parentVal, childVal, vm, key) {
      var res = Object.create(parentVal || null);
      if (childVal) {
          assertObjectType(key, childVal, vm);
          return extend(res, childVal)
      } else {
          return res
      }
  }
  ASSET_TYPES.forEach(function(type) {
      strats[type + 's'] = mergeAssets;
  });
  strats.watch = function(parentVal, childVal, vm, key) {
      if (parentVal === nativeWatch) {
          parentVal = undefined;
      }
      if (childVal === nativeWatch) {
          childVal = undefined;
      }
      if (!childVal) {
          return Object.create(parentVal || null)
      }
      {
          assertObjectType(key, childVal, vm);
      }
      if (!parentVal) {
          return childVal
      }
      var ret = {};
      extend(ret, parentVal);
      for (var key$1 in childVal) {
          var parent = ret[key$1];
          var child = childVal[key$1];
          if (parent && !Array.isArray(parent)) {
              parent = [parent];
          }
          ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
      }
      return ret
  };
  strats.props = strats.methods = strats.inject = strats.computed = function(parentVal, childVal, vm, key) {
      if (childVal && "development" !== 'production') {
          assertObjectType(key, childVal, vm);
      }
      if (!parentVal) {
          return childVal
      }
      var ret = Object.create(null);
      extend(ret, parentVal);
      if (childVal) {
          extend(ret, childVal);
      }
      return ret
  };
  strats.provide = mergeDataOrFn;
  var defaultStrat = function(parentVal, childVal) {
      return childVal === undefined ? parentVal : childVal
  };
  function checkComponents(options) {
      for (var key in options.components) {
          validateComponentName(key);
      }
  }
  function validateComponentName(name) {
      if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
          warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
      }
      if (isBuiltInTag(name) || config.isReservedTag(name)) {
          warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
      }
  }
  function normalizeProps(options, vm) {
      var props = options.props;
      if (!props) {
          return
      }
      var res = {};
      var i,
          val,
          name;
      if (Array.isArray(props)) {
          i = props.length;
          while (i--) {
              val = props[i];
              if (typeof val === 'string') {
                  name = camelize(val);
                  res[name] = {
                      type: null
                  };
              } else {
                  warn('props must be strings when using array syntax.');
              }
          }
      } else if (isPlainObject(props)) {
          for (var key in props) {
              val = props[key];
              name = camelize(key);
              res[name] = isPlainObject(val) ? val : {
                  type: val
              };
          }
      } else {
          warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + (toRawType(props)) + ".", vm);
      }
      options.props = res;
  }
  function normalizeInject(options, vm) {
      var inject = options.inject;
      if (!inject) {
          return
      }
      var normalized = options.inject = {};
      if (Array.isArray(inject)) {
          for (var i = 0; i < inject.length; i++) {
              normalized[inject[i]] = {
                  from: inject[i]
              };
          }
      } else if (isPlainObject(inject)) {
          for (var key in inject) {
              var val = inject[key];
              normalized[key] = isPlainObject(val) ? extend({
                  from: key
              }, val) : {
                  from: val
              };
          }
      } else {
          warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + (toRawType(inject)) + ".", vm);
      }
  }
  function normalizeDirectives(options) {
      var dirs = options.directives;
      if (dirs) {
          for (var key in dirs) {
              var def$$1 = dirs[key];
              if (typeof def$$1 === 'function') {
                  dirs[key] = {
                      bind: def$$1,
                      update: def$$1
                  };
              }
          }
      }
  }
  function assertObjectType(name, value, vm) {
      if (!isPlainObject(value)) {
          warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + (toRawType(value)) + ".", vm);
      }
  }
  function mergeOptions(parent, child, vm) {
      {
          checkComponents(child);
      }
      if (typeof child === 'function') {
          child = child.options;
      }
      normalizeProps(child, vm);
      normalizeInject(child, vm);
      normalizeDirectives(child);
      if (!child._base) {
          if (child.extends) {
              parent = mergeOptions(parent, child.extends, vm);
          }
          if (child.mixins) {
              for (var i = 0, l = child.mixins.length; i < l; i++) {
                  parent = mergeOptions(parent, child.mixins[i], vm);
              }
          }
      }
      var options = {};
      var key;
      for (key in parent) {
          mergeField(key);
      }
      for (key in child) {
          if (!hasOwn(parent, key)) {
              mergeField(key);
          }
      }
      function mergeField(key) {
          var strat = strats[key] || defaultStrat;
          options[key] = strat(parent[key], child[key], vm, key);
      }
      return options
  }
  function resolveAsset(options, type, id, warnMissing) {
      if (typeof id !== 'string') {
          return
      }
      var assets = options[type];
      if (hasOwn(assets, id)) {
          return assets[id]
      }
      var camelizedId = camelize(id);
      if (hasOwn(assets, camelizedId)) {
          return assets[camelizedId]
      }
      var PascalCaseId = capitalize(camelizedId);
      if (hasOwn(assets, PascalCaseId)) {
          return assets[PascalCaseId]
      }
      var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
      if (warnMissing && !res) {
          warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
      }
      return res
  }
  function validateProp(key, propOptions, propsData, vm) {
      var prop = propOptions[key];
      var absent = !hasOwn(propsData, key);
      var value = propsData[key];
      var booleanIndex = getTypeIndex(Boolean, prop.type);
      if (booleanIndex > -1) {
          if (absent && !hasOwn(prop, 'default')) {
              value = false;
          } else if (value === '' || value === hyphenate(key)) {
              var stringIndex = getTypeIndex(String, prop.type);
              if (stringIndex < 0 || booleanIndex < stringIndex) {
                  value = true;
              }
          }
      }
      if (value === undefined) {
          value = getPropDefaultValue(vm, prop, key);
          var prevShouldObserve = shouldObserve;
          toggleObserving(true);
          observe(value);
          toggleObserving(prevShouldObserve);
      }
      {
          assertProp(prop, key, value, vm, absent);
      }
      return value
  }
  function getPropDefaultValue(vm, prop, key) {
      if (!hasOwn(prop, 'default')) {
          return undefined
      }
      var def = prop.default;
      if (isObject(def)) {
          warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
      }
      if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
          return vm._props[key]
      }
      return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def
  }
  function assertProp(prop, name, value, vm, absent) {
      if (prop.required && absent) {
          warn('Missing required prop: "' + name + '"', vm);
          return
      }
      if (value == null && !prop.required) {
          return
      }
      var type = prop.type;
      var valid = !type || type === true;
      var expectedTypes = [];
      if (type) {
          if (!Array.isArray(type)) {
              type = [type];
          }
          for (var i = 0; i < type.length && !valid; i++) {
              var assertedType = assertType(value, type[i]);
              expectedTypes.push(assertedType.expectedType || '');
              valid = assertedType.valid;
          }
      }
      if (!valid) {
          warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
          return
      }
      var validator = prop.validator;
      if (validator) {
          if (!validator(value)) {
              warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
          }
      }
  }
  var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;
  function assertType(value, type) {
      var valid;
      var expectedType = getType(type);
      if (simpleCheckRE.test(expectedType)) {
          var t = typeof value;
          valid = t === expectedType.toLowerCase();
          if (!valid && t === 'object') {
              valid = value instanceof type;
          }
      } else if (expectedType === 'Object') {
          valid = isPlainObject(value);
      } else if (expectedType === 'Array') {
          valid = Array.isArray(value);
      } else {
          valid = value instanceof type;
      }
      return {
          valid: valid,
          expectedType: expectedType
      }
  }
  function getType(fn) {
      var match = fn && fn.toString().match(/^\s*function (\w+)/);
      return match ? match[1] : ''
  }
  function isSameType(a, b) {
      return getType(a) === getType(b)
  }
  function getTypeIndex(type, expectedTypes) {
      if (!Array.isArray(expectedTypes)) {
          return isSameType(expectedTypes, type) ? 0 : -1
      }
      for (var i = 0, len = expectedTypes.length; i < len; i++) {
          if (isSameType(expectedTypes[i], type)) {
              return i
          }
      }
      return -1
  }
  function getInvalidTypeMessage(name, value, expectedTypes) {
      var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + (expectedTypes.map(capitalize).join(', '));
      var expectedType = expectedTypes[0];
      var receivedType = toRawType(value);
      var expectedValue = styleValue(value, expectedType);
      var receivedValue = styleValue(value, receivedType);
      if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
          message += " with value " + expectedValue;
      }
      message += ", got " + receivedType + " ";
      if (isExplicable(receivedType)) {
          message += "with value " + receivedValue + ".";
      }
      return message
  }
  function styleValue(value, type) {
      if (type === 'String') {
          return ( "\"" + value + "\"")
      } else if (type === 'Number') {
          return ( "" + (Number(value)))
      } else {
          return ( "" + value)
      }
  }
  function isExplicable(value) {
      var explicitTypes = ['string', 'number', 'boolean'];
      return explicitTypes.some(function(elem) {
          return value.toLowerCase() === elem;
      })
  }
  function isBoolean() {
      var args = [],
          len = arguments.length;
      while (len--)
          args[len] = arguments[len];
      return args.some(function(elem) {
          return elem.toLowerCase() === 'boolean';
      })
  }
  function handleError(err, vm, info) {
      pushTarget();
      try {
          if (vm) {
              var cur = vm;
              while ((cur = cur.$parent)) {
                  var hooks = cur.$options.errorCaptured;
                  if (hooks) {
                      for (var i = 0; i < hooks.length; i++) {
                          try {
                              var capture = hooks[i].call(cur, err, vm, info) === false;
                              if (capture) {
                                  return
                              }
                          } catch (e) {
                              globalHandleError(e, cur, 'errorCaptured hook');
                          }
                      }
                  }
              }
          }
          globalHandleError(err, vm, info);
      } finally {
          popTarget();
      }
  }
  function invokeWithErrorHandling(handler, context, args, vm, info) {
      var res;
      try {
          res = args ? handler.apply(context, args) : handler.call(context);
          if (res && !res._isVue && isPromise(res) && !res._handled) {
              res.catch(function(e) {
                  return handleError(e, vm, info + " (Promise/async)");
              });
              res._handled = true;
          }
      } catch (e) {
          handleError(e, vm, info);
      }
      return res
  }
  function globalHandleError(err, vm, info) {
      if (config.errorHandler) {
          try {
              return config.errorHandler.call(null, err, vm, info)
          } catch (e) {
              if (e !== err) {
                  logError(e, null, 'config.errorHandler');
              }
          }
      }
      logError(err, vm, info);
  }
  function logError(err, vm, info) {
      {
          warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
      }
      if ((inBrowser || inWeex) && typeof console !== 'undefined') {
          console.error(err);
      } else {
          throw err
      }
  }
  var isUsingMicroTask = false;
  var callbacks = [];
  var pending = false;
  function flushCallbacks() {
      pending = false;
      var copies = callbacks.slice(0);
      callbacks.length = 0;
      for (var i = 0; i < copies.length; i++) {
          copies[i]();
      }
  }
  var timerFunc;
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
      var p = Promise.resolve();
      timerFunc = function() {
          p.then(flushCallbacks);
          if (isIOS) {
              setTimeout(noop);
          }
      };
      isUsingMicroTask = true;
  } else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]')) {
      var counter = 1;
      var observer = new MutationObserver(flushCallbacks);
      var textNode = document.createTextNode(String(counter));
      observer.observe(textNode, {
          characterData: true
      });
      timerFunc = function() {
          counter = (counter + 1) % 2;
          textNode.data = String(counter);
      };
      isUsingMicroTask = true;
  } else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
      timerFunc = function() {
          setImmediate(flushCallbacks);
      };
  } else {
      timerFunc = function() {
          setTimeout(flushCallbacks, 0);
      };
  }
  function nextTick(cb, ctx) {
      var _resolve;
      callbacks.push(function() {
          if (cb) {
              try {
                  cb.call(ctx);
              } catch (e) {
                  handleError(e, ctx, 'nextTick');
              }
          } else if (_resolve) {
              _resolve(ctx);
          }
      });
      if (!pending) {
          pending = true;
          timerFunc();
      }
      if (!cb && typeof Promise !== 'undefined') {
          return new Promise(function(resolve) {
              _resolve = resolve;
          })
      }
  }
  var mark;
  var measure;
  {
      var perf = inBrowser && window.performance;
      if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
          mark = function(tag) {
              return perf.mark(tag);
          };
          measure = function(name, startTag, endTag) {
              perf.measure(name, startTag, endTag);
              perf.clearMarks(startTag);
              perf.clearMarks(endTag);
          };
      }
  }
  var initProxy;
  {
      var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require');
      var warnNonPresent = function(target, key) {
          warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
      };
      var warnReservedPrefix = function(target, key) {
          warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals' + 'See: https://vuejs.org/v2/api/#data', target);
      };
      var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);
      if (hasProxy) {
          var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
          config.keyCodes = new Proxy(config.keyCodes, {
              set: function set(target, key, value) {
                  if (isBuiltInModifier(key)) {
                      warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
                      return false
                  } else {
                      target[key] = value;
                      return true
                  }
              }
          });
      }
      var hasHandler = {
          has: function has(target, key) {
              var has = key in target;
              var isAllowed = allowedGlobals(key) || (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
              if (!has && !isAllowed) {
                  if (key in target.$data) {
                      warnReservedPrefix(target, key);
                  }
                  else {
                      warnNonPresent(target, key);
                  }
              }
              return has || !isAllowed
          }
      };
      var getHandler = {
          get: function get(target, key) {
              if (typeof key === 'string' && !(key in target)) {
                  if (key in target.$data) {
                      warnReservedPrefix(target, key);
                  }
                  else {
                      warnNonPresent(target, key);
                  }
              }
              return target[key]
          }
      };
      initProxy = function initProxy(vm) {
          if (hasProxy) {
              var options = vm.$options;
              var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
              vm._renderProxy = new Proxy(vm, handlers);
          } else {
              vm._renderProxy = vm;
          }
      };
  }
  var seenObjects = new _Set();
  function traverse(val) {
      _traverse(val, seenObjects);
      seenObjects.clear();
  }
  function _traverse(val, seen) {
      var i,
          keys;
      var isA = Array.isArray(val);
      if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
          return
      }
      if (val.__ob__) {
          var depId = val.__ob__.dep.id;
          if (seen.has(depId)) {
              return
          }
          seen.add(depId);
      }
      if (isA) {
          i = val.length;
          while (i--) {
              _traverse(val[i], seen);
          }
      } else {
          keys = Object.keys(val);
          i = keys.length;
          while (i--) {
              _traverse(val[keys[i]], seen);
          }
      }
  }
  var normalizeEvent = cached(function(name) {
      var passive = name.charAt(0) === '&';
      name = passive ? name.slice(1) : name;
      var once$$1 = name.charAt(0) === '~';
      name = once$$1 ? name.slice(1) : name;
      var capture = name.charAt(0) === '!';
      name = capture ? name.slice(1) : name;
      return {
          name: name,
          once: once$$1,
          capture: capture,
          passive: passive
      }
  });
  function createFnInvoker(fns, vm) {
      function invoker() {
          var arguments$1 = arguments;
          var fns = invoker.fns;
          if (Array.isArray(fns)) {
              var cloned = fns.slice();
              for (var i = 0; i < cloned.length; i++) {
                  invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
              }
          } else {
              return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
          }
      }
      invoker.fns = fns;
      return invoker
  }
  function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
      var name,
          def$$1,
          cur,
          old,
          event;
      for (name in on) {
          def$$1 = cur = on[name];
          old = oldOn[name];
          event = normalizeEvent(name);
          if (isUndef(cur)) {
              warn("Invalid handler for event \"" + (event.name) + "\": got " + String(cur), vm);
          } else if (isUndef(old)) {
              if (isUndef(cur.fns)) {
                  cur = on[name] = createFnInvoker(cur, vm);
              }
              if (isTrue(event.once)) {
                  cur = on[name] = createOnceHandler(event.name, cur, event.capture);
              }
              add(event.name, cur, event.capture, event.passive, event.params);
          } else if (cur !== old) {
              old.fns = cur;
              on[name] = old;
          }
      }
      for (name in oldOn) {
          if (isUndef(on[name])) {
              event = normalizeEvent(name);
              remove$$1(event.name, oldOn[name], event.capture);
          }
      }
  }
  function mergeVNodeHook(def, hookKey, hook) {
      if (def instanceof VNode) {
          def = def.data.hook || (def.data.hook = {});
      }
      var invoker;
      var oldHook = def[hookKey];
      function wrappedHook() {
          hook.apply(this, arguments);
          remove(invoker.fns, wrappedHook);
      }
      if (isUndef(oldHook)) {
          invoker = createFnInvoker([wrappedHook]);
      } else {
          if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
              invoker = oldHook;
              invoker.fns.push(wrappedHook);
          } else {
              invoker = createFnInvoker([oldHook, wrappedHook]);
          }
      }
      invoker.merged = true;
      def[hookKey] = invoker;
  }
  function extractPropsFromVNodeData(data, Ctor, tag) {
      var propOptions = Ctor.options.props;
      if (isUndef(propOptions)) {
          return
      }
      var res = {};
      var attrs = data.attrs;
      var props = data.props;
      if (isDef(attrs) || isDef(props)) {
          for (var key in propOptions) {
              var altKey = hyphenate(key);
              {
                  var keyInLowerCase = key.toLowerCase();
                  if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
                      tip("Prop \"" + keyInLowerCase + "\" is passed to component " +
                      (formatComponentName(tag || Ctor)) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
                  }
              }
              checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
          }
      }
      return res
  }
  function checkProp(res, hash, key, altKey, preserve) {
      if (isDef(hash)) {
          if (hasOwn(hash, key)) {
              res[key] = hash[key];
              if (!preserve) {
                  delete hash[key];
              }
              return true
          } else if (hasOwn(hash, altKey)) {
              res[key] = hash[altKey];
              if (!preserve) {
                  delete hash[altKey];
              }
              return true
          }
      }
      return false
  }
  function simpleNormalizeChildren(children) {
      for (var i = 0; i < children.length; i++) {
          if (Array.isArray(children[i])) {
              return Array.prototype.concat.apply([], children)
          }
      }
      return children
  }
  function normalizeChildren(children) {
      return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined
  }
  function isTextNode(node) {
      return isDef(node) && isDef(node.text) && isFalse(node.isComment)
  }
  function normalizeArrayChildren(children, nestedIndex) {
      var res = [];
      var i,
          c,
          lastIndex,
          last;
      for (i = 0; i < children.length; i++) {
          c = children[i];
          if (isUndef(c) || typeof c === 'boolean') {
              continue
          }
          lastIndex = res.length - 1;
          last = res[lastIndex];
          if (Array.isArray(c)) {
              if (c.length > 0) {
                  c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
                  if (isTextNode(c[0]) && isTextNode(last)) {
                      res[lastIndex] = createTextVNode(last.text + (c[0]).text);
                      c.shift();
                  }
                  res.push.apply(res, c);
              }
          } else if (isPrimitive(c)) {
              if (isTextNode(last)) {
                  res[lastIndex] = createTextVNode(last.text + c);
              } else if (c !== '') {
                  res.push(createTextVNode(c));
              }
          } else {
              if (isTextNode(c) && isTextNode(last)) {
                  res[lastIndex] = createTextVNode(last.text + c.text);
              } else {
                  if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
                      c.key = "__vlist" + nestedIndex + "_" + i + "__";
                  }
                  res.push(c);
              }
          }
      }
      return res
  }
  function initProvide(vm) {
      var provide = vm.$options.provide;
      if (provide) {
          vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
      }
  }
  function initInjections(vm) {
      var result = resolveInject(vm.$options.inject, vm);
      if (result) {
          toggleObserving(false);
          Object.keys(result).forEach(function(key) {
              {
                  defineReactive$$1(vm, key, result[key], function() {
                      warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
                  });
              }
          });
          toggleObserving(true);
      }
  }
  function resolveInject(inject, vm) {
      if (inject) {
          var result = Object.create(null);
          var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);
          for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key === '__ob__') {
                  continue
              }
              var provideKey = inject[key].from;
              var source = vm;
              while (source) {
                  if (source._provided && hasOwn(source._provided, provideKey)) {
                      result[key] = source._provided[provideKey];
                      break
                  }
                  source = source.$parent;
              }
              if (!source) {
                  if ('default' in inject[key]) {
                      var provideDefault = inject[key].default;
                      result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
                  } else {
                      warn(("Injection \"" + key + "\" not found"), vm);
                  }
              }
          }
          return result
      }
  }
  function resolveSlots(children, context) {
      if (!children || !children.length) {
          return {}
      }
      var slots = {};
      for (var i = 0, l = children.length; i < l; i++) {
          var child = children[i];
          var data = child.data;
          if (data && data.attrs && data.attrs.slot) {
              delete data.attrs.slot;
          }
          if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
              var name = data.slot;
              var slot = (slots[name] || (slots[name] = []));
              if (child.tag === 'template') {
                  slot.push.apply(slot, child.children || []);
              } else {
                  slot.push(child);
              }
          } else {
              (slots.default || (slots.default = [])).push(child);
          }
      }
      for (var name$1 in slots) {
          if (slots[name$1].every(isWhitespace)) {
              delete slots[name$1];
          }
      }
      return slots
  }
  function isWhitespace(node) {
      return (node.isComment && !node.asyncFactory) || node.text === ' '
  }
  function normalizeScopedSlots(slots, normalSlots, prevSlots) {
      var res;
      var hasNormalSlots = Object.keys(normalSlots).length > 0;
      var isStable = slots ? !!slots.$stable : !hasNormalSlots;
      var key = slots && slots.$key;
      if (!slots) {
          res = {};
      } else if (slots._normalized) {
          return slots._normalized
      } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
          return prevSlots
      } else {
          res = {};
          for (var key$1 in slots) {
              if (slots[key$1] && key$1[0] !== '$') {
                  res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
              }
          }
      }
      for (var key$2 in normalSlots) {
          if (!(key$2 in res)) {
              res[key$2] = proxyNormalSlot(normalSlots, key$2);
          }
      }
      if (slots && Object.isExtensible(slots)) {
          (slots)._normalized = res;
      }
      def(res, '$stable', isStable);
      def(res, '$key', key);
      def(res, '$hasNormal', hasNormalSlots);
      return res
  }
  function normalizeScopedSlot(normalSlots, key, fn) {
      var normalized = function() {
          var res = arguments.length ? fn.apply(null, arguments) : fn({});
          res = res && typeof res === 'object' && !Array.isArray(res) ? [res] : normalizeChildren(res);
          return res && (res.length === 0 || (res.length === 1 && res[0].isComment)) ? undefined : res
      };
      if (fn.proxy) {
          Object.defineProperty(normalSlots, key, {
              get: normalized,
              enumerable: true,
              configurable: true
          });
      }
      return normalized
  }
  function proxyNormalSlot(slots, key) {
      return function() {
          return slots[key];
      }
  }
  function renderList(val, render) {
      var ret,
          i,
          l,
          keys,
          key;
      if (Array.isArray(val) || typeof val === 'string') {
          ret = new Array(val.length);
          for (i = 0, l = val.length; i < l; i++) {
              ret[i] = render(val[i], i);
          }
      } else if (typeof val === 'number') {
          ret = new Array(val);
          for (i = 0; i < val; i++) {
              ret[i] = render(i + 1, i);
          }
      } else if (isObject(val)) {
          if (hasSymbol && val[Symbol.iterator]) {
              ret = [];
              var iterator = val[Symbol.iterator]();
              var result = iterator.next();
              while (!result.done) {
                  ret.push(render(result.value, ret.length));
                  result = iterator.next();
              }
          } else {
              keys = Object.keys(val);
              ret = new Array(keys.length);
              for (i = 0, l = keys.length; i < l; i++) {
                  key = keys[i];
                  ret[i] = render(val[key], key, i);
              }
          }
      }
      if (!isDef(ret)) {
          ret = [];
      }
      (ret)._isVList = true;
      return ret
  }
  function renderSlot(name, fallback, props, bindObject) {
      var scopedSlotFn = this.$scopedSlots[name];
      var nodes;
      if (scopedSlotFn) {
          props = props || {};
          if (bindObject) {
              if (!isObject(bindObject)) {
                  warn('slot v-bind without argument expects an Object', this);
              }
              props = extend(extend({}, bindObject), props);
          }
          nodes = scopedSlotFn(props) || fallback;
      } else {
          nodes = this.$slots[name] || fallback;
      }
      var target = props && props.slot;
      if (target) {
          return this.$createElement('template', {
              slot: target
          }, nodes)
      } else {
          return nodes
      }
  }
  function resolveFilter(id) {
      return resolveAsset(this.$options, 'filters', id, true) || identity
  }
  function isKeyNotMatch(expect, actual) {
      if (Array.isArray(expect)) {
          return expect.indexOf(actual) === -1
      } else {
          return expect !== actual
      }
  }
  function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
      var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
      if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
          return isKeyNotMatch(builtInKeyName, eventKeyName)
      } else if (mappedKeyCode) {
          return isKeyNotMatch(mappedKeyCode, eventKeyCode)
      } else if (eventKeyName) {
          return hyphenate(eventKeyName) !== key
      }
  }
  function bindObjectProps(data, tag, value, asProp, isSync) {
      if (value) {
          if (!isObject(value)) {
              warn('v-bind without argument expects an Object or Array value', this);
          } else {
              if (Array.isArray(value)) {
                  value = toObject(value);
              }
              var hash;
              var loop = function(key) {
                  if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
                      hash = data;
                  } else {
                      var type = data.attrs && data.attrs.type;
                      hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
                  }
                  var camelizedKey = camelize(key);
                  var hyphenatedKey = hyphenate(key);
                  if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
                      hash[key] = value[key];
                      if (isSync) {
                          var on = data.on || (data.on = {});
                          on[("update:" + key)] = function($event) {
                              value[key] = $event;
                          };
                      }
                  }
              };
              for (var key in value)
                  loop(key);
          }
      }
      return data
  }
  function renderStatic(index, isInFor) {
      var cached = this._staticTrees || (this._staticTrees = []);
      var tree = cached[index];
      if (tree && !isInFor) {
          return tree
      }
      tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this);
      markStatic(tree, ("__static__" + index), false);
      return tree
  }
  function markOnce(tree, index, key) {
      markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
      return tree
  }
  function markStatic(tree, key, isOnce) {
      if (Array.isArray(tree)) {
          for (var i = 0; i < tree.length; i++) {
              if (tree[i] && typeof tree[i] !== 'string') {
                  markStaticNode(tree[i], (key + "_" + i), isOnce);
              }
          }
      } else {
          markStaticNode(tree, key, isOnce);
      }
  }
  function markStaticNode(node, key, isOnce) {
      node.isStatic = true;
      node.key = key;
      node.isOnce = isOnce;
  }
  function bindObjectListeners(data, value) {
      if (value) {
          if (!isPlainObject(value)) {
              warn('v-on without argument expects an Object value', this);
          } else {
              var on = data.on = data.on ? extend({}, data.on) : {};
              for (var key in value) {
                  var existing = on[key];
                  var ours = value[key];
                  on[key] = existing ? [].concat(existing, ours) : ours;
              }
          }
      }
      return data
  }
  function resolveScopedSlots(fns, res, hasDynamicKeys, contentHashKey) {
      res = res || {
          $stable: !hasDynamicKeys
      };
      for (var i = 0; i < fns.length; i++) {
          var slot = fns[i];
          if (Array.isArray(slot)) {
              resolveScopedSlots(slot, res, hasDynamicKeys);
          } else if (slot) {
              if (slot.proxy) {
                  slot.fn.proxy = true;
              }
              res[slot.key] = slot.fn;
          }
      }
      if (contentHashKey) {
          (res).$key = contentHashKey;
      }
      return res
  }
  function bindDynamicKeys(baseObj, values) {
      for (var i = 0; i < values.length; i += 2) {
          var key = values[i];
          if (typeof key === 'string' && key) {
              baseObj[values[i]] = values[i + 1];
          } else if (key !== '' && key !== null) {
              warn(("Invalid value for dynamic directive argument (expected string or null): " + key), this);
          }
      }
      return baseObj
  }
  function prependModifier(value, symbol) {
      return typeof value === 'string' ? symbol + value : value
  }
  function installRenderHelpers(target) {
      target._o = markOnce;
      target._n = toNumber;
      target._s = toString;
      target._l = renderList;
      target._t = renderSlot;
      target._q = looseEqual;
      target._i = looseIndexOf;
      target._m = renderStatic;
      target._f = resolveFilter;
      target._k = checkKeyCodes;
      target._b = bindObjectProps;
      target._v = createTextVNode;
      target._e = createEmptyVNode;
      target._u = resolveScopedSlots;
      target._g = bindObjectListeners;
      target._d = bindDynamicKeys;
      target._p = prependModifier;
  }
  function FunctionalRenderContext(data, props, children, parent, Ctor) {
      var this$1 = this;
      var options = Ctor.options;
      var contextVm;
      if (hasOwn(parent, '_uid')) {
          contextVm = Object.create(parent);
          contextVm._original = parent;
      } else {
          contextVm = parent;
          parent = parent._original;
      }
      var isCompiled = isTrue(options._compiled);
      var needNormalization = !isCompiled;
      this.data = data;
      this.props = props;
      this.children = children;
      this.parent = parent;
      this.listeners = data.on || emptyObject;
      this.injections = resolveInject(options.inject, parent);
      this.slots = function() {
          if (!this$1.$slots) {
              normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
          }
          return this$1.$slots
      };
      Object.defineProperty(this, 'scopedSlots', ({
          enumerable: true,
          get: function get() {
              return normalizeScopedSlots(data.scopedSlots, this.slots())
          }
      }));
      if (isCompiled) {
          this.$options = options;
          this.$slots = this.slots();
          this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
      }
      if (options._scopeId) {
          this._c = function(a, b, c, d) {
              var vnode = createElement(contextVm, a, b, c, d, needNormalization);
              if (vnode && !Array.isArray(vnode)) {
                  vnode.fnScopeId = options._scopeId;
                  vnode.fnContext = parent;
              }
              return vnode
          };
      } else {
          this._c = function(a, b, c, d) {
              return createElement(contextVm, a, b, c, d, needNormalization);
          };
      }
  }
  installRenderHelpers(FunctionalRenderContext.prototype);
  function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
      var options = Ctor.options;
      var props = {};
      var propOptions = options.props;
      if (isDef(propOptions)) {
          for (var key in propOptions) {
              props[key] = validateProp(key, propOptions, propsData || emptyObject);
          }
      } else {
          if (isDef(data.attrs)) {
              mergeProps(props, data.attrs);
          }
          if (isDef(data.props)) {
              mergeProps(props, data.props);
          }
      }
      var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
      var vnode = options.render.call(null, renderContext._c, renderContext);
      if (vnode instanceof VNode) {
          return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
      } else if (Array.isArray(vnode)) {
          var vnodes = normalizeChildren(vnode) || [];
          var res = new Array(vnodes.length);
          for (var i = 0; i < vnodes.length; i++) {
              res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
          }
          return res
      }
  }
  function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
      var clone = cloneVNode(vnode);
      clone.fnContext = contextVm;
      clone.fnOptions = options;
      {
          (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
      }
      if (data.slot) {
          (clone.data || (clone.data = {})).slot = data.slot;
      }
      return clone
  }
  function mergeProps(to, from) {
      for (var key in from) {
          to[camelize(key)] = from[key];
      }
  }
  var componentVNodeHooks = {
      init: function init(vnode, hydrating) {
          if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
              var mountedNode = vnode;
              componentVNodeHooks.prepatch(mountedNode, mountedNode);
          } else {
              var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
              child.$mount(hydrating ? vnode.elm : undefined, hydrating);
          }
      },
      prepatch: function prepatch(oldVnode, vnode) {
          var options = vnode.componentOptions;
          var child = vnode.componentInstance = oldVnode.componentInstance;
          updateChildComponent(child, options.propsData, options.listeners, vnode, options.children);
      },
      insert: function insert(vnode) {
          var context = vnode.context;
          var componentInstance = vnode.componentInstance;
          if (!componentInstance._isMounted) {
              componentInstance._isMounted = true;
              callHook(componentInstance, 'mounted');
          }
          if (vnode.data.keepAlive) {
              if (context._isMounted) {
                  queueActivatedComponent(componentInstance);
              } else {
                  activateChildComponent(componentInstance, true);
              }
          }
      },
      destroy: function destroy(vnode) {
          var componentInstance = vnode.componentInstance;
          if (!componentInstance._isDestroyed) {
              if (!vnode.data.keepAlive) {
                  componentInstance.$destroy();
              } else {
                  deactivateChildComponent(componentInstance, true);
              }
          }
      }
  };
  var hooksToMerge = Object.keys(componentVNodeHooks);
  function createComponent(Ctor, data, context, children, tag) {
      if (isUndef(Ctor)) {
          return
      }
      var baseCtor = context.$options._base;
      if (isObject(Ctor)) {
          Ctor = baseCtor.extend(Ctor);
      }
      if (typeof Ctor !== 'function') {
          {
              warn(("Invalid Component definition: " + (String(Ctor))), context);
          }
          return
      }
      var asyncFactory;
      if (isUndef(Ctor.cid)) {
          asyncFactory = Ctor;
          Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
          if (Ctor === undefined) {
              return createAsyncPlaceholder(asyncFactory, data, context, children, tag)
          }
      }
      data = data || {};
      resolveConstructorOptions(Ctor);
      if (isDef(data.model)) {
          transformModel(Ctor.options, data);
      }
      var propsData = extractPropsFromVNodeData(data, Ctor, tag);
      if (isTrue(Ctor.options.functional)) {
          return createFunctionalComponent(Ctor, propsData, data, context, children)
      }
      var listeners = data.on;
      data.on = data.nativeOn;
      if (isTrue(Ctor.options.abstract)) {
          var slot = data.slot;
          data = {};
          if (slot) {
              data.slot = slot;
          }
      }
      installComponentHooks(data);
      var name = Ctor.options.name || tag;
      var vnode = new VNode(("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')), data, undefined, undefined, undefined, context, {
          Ctor: Ctor,
          propsData: propsData,
          listeners: listeners,
          tag: tag,
          children: children
      }, asyncFactory);
      return vnode
  }
  function createComponentInstanceForVnode(vnode, parent) {
      var options = {
          _isComponent: true,
          _parentVnode: vnode,
          parent: parent
      };
      var inlineTemplate = vnode.data.inlineTemplate;
      if (isDef(inlineTemplate)) {
          options.render = inlineTemplate.render;
          options.staticRenderFns = inlineTemplate.staticRenderFns;
      }
      return new vnode.componentOptions.Ctor(options)
  }
  function installComponentHooks(data) {
      var hooks = data.hook || (data.hook = {});
      for (var i = 0; i < hooksToMerge.length; i++) {
          var key = hooksToMerge[i];
          var existing = hooks[key];
          var toMerge = componentVNodeHooks[key];
          if (existing !== toMerge && !(existing && existing._merged)) {
              hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
          }
      }
  }
  function mergeHook$1(f1, f2) {
      var merged = function(a, b) {
          f1(a, b);
          f2(a, b);
      };
      merged._merged = true;
      return merged
  }
  function transformModel(options, data) {
      var prop = (options.model && options.model.prop) || 'value';
      var event = (options.model && options.model.event) || 'input';
      (data.attrs || (data.attrs = {}))[prop] = data.model.value;
      var on = data.on || (data.on = {});
      var existing = on[event];
      var callback = data.model.callback;
      if (isDef(existing)) {
          if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
              on[event] = [callback].concat(existing);
          }
      } else {
          on[event] = callback;
      }
  }
  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;
  function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
      if (Array.isArray(data) || isPrimitive(data)) {
          normalizationType = children;
          children = data;
          data = undefined;
      }
      if (isTrue(alwaysNormalize)) {
          normalizationType = ALWAYS_NORMALIZE;
      }
      return _createElement(context, tag, data, children, normalizationType)
  }
  function _createElement(context, tag, data, children, normalizationType) {
      if (isDef(data) && isDef((data).__ob__)) {
          warn("Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" + 'Always create fresh vnode data objects in each render!', context);
          return createEmptyVNode()
      }
      if (isDef(data) && isDef(data.is)) {
          tag = data.is;
      }
      if (!tag) {
          return createEmptyVNode()
      }
      if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
          {
              warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
          }
      }
      if (Array.isArray(children) && typeof children[0] === 'function') {
          data = data || {};
          data.scopedSlots = {
              default: children[0]
          };
          children.length = 0;
      }
      if (normalizationType === ALWAYS_NORMALIZE) {
          children = normalizeChildren(children);
      } else if (normalizationType === SIMPLE_NORMALIZE) {
          children = simpleNormalizeChildren(children);
      }
      var vnode,
          ns;
      if (typeof tag === 'string') {
          var Ctor;
          ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
          if (config.isReservedTag(tag)) {
              vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
          } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
              vnode = createComponent(Ctor, data, context, children, tag);
          } else {
              vnode = new VNode(tag, data, children, undefined, undefined, context);
          }
      } else {
          vnode = createComponent(tag, data, context, children);
      }
      if (Array.isArray(vnode)) {
          return vnode
      } else if (isDef(vnode)) {
          if (isDef(ns)) {
              applyNS(vnode, ns);
          }
          if (isDef(data)) {
              registerDeepBindings(data);
          }
          return vnode
      } else {
          return createEmptyVNode()
      }
  }
  function applyNS(vnode, ns, force) {
      vnode.ns = ns;
      if (vnode.tag === 'foreignObject') {
          ns = undefined;
          force = true;
      }
      if (isDef(vnode.children)) {
          for (var i = 0, l = vnode.children.length; i < l; i++) {
              var child = vnode.children[i];
              if (isDef(child.tag) && (isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
                  applyNS(child, ns, force);
              }
          }
      }
  }
  function registerDeepBindings(data) {
      if (isObject(data.style)) {
          traverse(data.style);
      }
      if (isObject(data.class)) {
          traverse(data.class);
      }
  }
  function initRender(vm) {
      vm._vnode = null;
      vm._staticTrees = null;
      var options = vm.$options;
      var parentVnode = vm.$vnode = options._parentVnode;
      var renderContext = parentVnode && parentVnode.context;
      vm.$slots = resolveSlots(options._renderChildren, renderContext);
      vm.$scopedSlots = emptyObject;
      vm._c = function(a, b, c, d) {
          return createElement(vm, a, b, c, d, false);
      };
      vm.$createElement = function(a, b, c, d) {
          return createElement(vm, a, b, c, d, true);
      };
      var parentData = parentVnode && parentVnode.data;
      {
          defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function() {
              !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
          }, true);
          defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function() {
              !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
          }, true);
      }
  }
  var currentRenderingInstance = null;
  function renderMixin(Vue) {
      installRenderHelpers(Vue.prototype);
      Vue.prototype.$nextTick = function(fn) {
          return nextTick(fn, this)
      };
      Vue.prototype._render = function() {
          var vm = this;
          var ref = vm.$options;
          var render = ref.render;
          var _parentVnode = ref._parentVnode;
          if (_parentVnode) {
              vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
          }
          vm.$vnode = _parentVnode;
          var vnode;
          try {
              currentRenderingInstance = vm;
              vnode = render.call(vm._renderProxy, vm.$createElement);
          } catch (e) {
              handleError(e, vm, "render");
              if (vm.$options.renderError) {
                  try {
                      vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
                  } catch (e) {
                      handleError(e, vm, "renderError");
                      vnode = vm._vnode;
                  }
              } else {
                  vnode = vm._vnode;
              }
          } finally {
              currentRenderingInstance = null;
          }
          if (Array.isArray(vnode) && vnode.length === 1) {
              vnode = vnode[0];
          }
          if (!(vnode instanceof VNode)) {
              if (Array.isArray(vnode)) {
                  warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
              }
              vnode = createEmptyVNode();
          }
          vnode.parent = _parentVnode;
          return vnode
      };
  }
  function ensureCtor(comp, base) {
      if (comp.__esModule || (hasSymbol && comp[Symbol.toStringTag] === 'Module')) {
          comp = comp.default;
      }
      return isObject(comp) ? base.extend(comp) : comp
  }
  function createAsyncPlaceholder(factory, data, context, children, tag) {
      var node = createEmptyVNode();
      node.asyncFactory = factory;
      node.asyncMeta = {
          data: data,
          context: context,
          children: children,
          tag: tag
      };
      return node
  }
  function resolveAsyncComponent(factory, baseCtor) {
      if (isTrue(factory.error) && isDef(factory.errorComp)) {
          return factory.errorComp
      }
      if (isDef(factory.resolved)) {
          return factory.resolved
      }
      var owner = currentRenderingInstance;
      if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
          factory.owners.push(owner);
      }
      if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
          return factory.loadingComp
      }
      if (owner && !isDef(factory.owners)) {
          var owners = factory.owners = [owner];
          var sync = true;
          var timerLoading = null;
          var timerTimeout = null;
          (owner).$on('hook:destroyed', function() {
              return remove(owners, owner);
          });
          var forceRender = function(renderCompleted) {
              for (var i = 0, l = owners.length; i < l; i++) {
                  (owners[i]).$forceUpdate();
              }
              if (renderCompleted) {
                  owners.length = 0;
                  if (timerLoading !== null) {
                      clearTimeout(timerLoading);
                      timerLoading = null;
                  }
                  if (timerTimeout !== null) {
                      clearTimeout(timerTimeout);
                      timerTimeout = null;
                  }
              }
          };
          var resolve = once(function(res) {
              factory.resolved = ensureCtor(res, baseCtor);
              if (!sync) {
                  forceRender(true);
              } else {
                  owners.length = 0;
              }
          });
          var reject = once(function(reason) {
              warn("Failed to resolve async component: " + (String(factory)) +
              (reason ? ("\nReason: " + reason) : ''));
              if (isDef(factory.errorComp)) {
                  factory.error = true;
                  forceRender(true);
              }
          });
          var res = factory(resolve, reject);
          if (isObject(res)) {
              if (isPromise(res)) {
                  if (isUndef(factory.resolved)) {
                      res.then(resolve, reject);
                  }
              } else if (isPromise(res.component)) {
                  res.component.then(resolve, reject);
                  if (isDef(res.error)) {
                      factory.errorComp = ensureCtor(res.error, baseCtor);
                  }
                  if (isDef(res.loading)) {
                      factory.loadingComp = ensureCtor(res.loading, baseCtor);
                      if (res.delay === 0) {
                          factory.loading = true;
                      } else {
                          timerLoading = setTimeout(function() {
                              timerLoading = null;
                              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                                  factory.loading = true;
                                  forceRender(false);
                              }
                          }, res.delay || 200);
                      }
                  }
                  if (isDef(res.timeout)) {
                      timerTimeout = setTimeout(function() {
                          timerTimeout = null;
                          if (isUndef(factory.resolved)) {
                              reject("timeout (" + (res.timeout) + "ms)");
                          }
                      }, res.timeout);
                  }
              }
          }
          sync = false;
          return factory.loading ? factory.loadingComp : factory.resolved
      }
  }
  function isAsyncPlaceholder(node) {
      return node.isComment && node.asyncFactory
  }
  function getFirstComponentChild(children) {
      if (Array.isArray(children)) {
          for (var i = 0; i < children.length; i++) {
              var c = children[i];
              if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
                  return c
              }
          }
      }
  }
  function initEvents(vm) {
      vm._events = Object.create(null);
      vm._hasHookEvent = false;
      var listeners = vm.$options._parentListeners;
      if (listeners) {
          updateComponentListeners(vm, listeners);
      }
  }
  var target;
  function add(event, fn) {
      target.$on(event, fn);
  }
  function remove$1(event, fn) {
      target.$off(event, fn);
  }
  function createOnceHandler(event, fn) {
      var _target = target;
      return function onceHandler() {
          var res = fn.apply(null, arguments);
          if (res !== null) {
              _target.$off(event, onceHandler);
          }
      }
  }
  function updateComponentListeners(vm, listeners, oldListeners) {
      target = vm;
      updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
      target = undefined;
  }
  function eventsMixin(Vue) {
      var hookRE = /^hook:/;
      Vue.prototype.$on = function(event, fn) {
          var vm = this;
          if (Array.isArray(event)) {
              for (var i = 0, l = event.length; i < l; i++) {
                  vm.$on(event[i], fn);
              }
          } else {
              (vm._events[event] || (vm._events[event] = [])).push(fn);
              if (hookRE.test(event)) {
                  vm._hasHookEvent = true;
              }
          }
          return vm
      };
      Vue.prototype.$once = function(event, fn) {
          var vm = this;
          function on() {
              vm.$off(event, on);
              fn.apply(vm, arguments);
          }
          on.fn = fn;
          vm.$on(event, on);
          return vm
      };
      Vue.prototype.$off = function(event, fn) {
          var vm = this;
          if (!arguments.length) {
              vm._events = Object.create(null);
              return vm
          }
          if (Array.isArray(event)) {
              for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
                  vm.$off(event[i$1], fn);
              }
              return vm
          }
          var cbs = vm._events[event];
          if (!cbs) {
              return vm
          }
          if (!fn) {
              vm._events[event] = null;
              return vm
          }
          var cb;
          var i = cbs.length;
          while (i--) {
              cb = cbs[i];
              if (cb === fn || cb.fn === fn) {
                  cbs.splice(i, 1);
                  break
              }
          }
          return vm
      };
      Vue.prototype.$emit = function(event) {
          var vm = this;
          {
              var lowerCaseEvent = event.toLowerCase();
              if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
                  tip("Event \"" + lowerCaseEvent + "\" is emitted in component " +
                  (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\".");
              }
          }
          var cbs = vm._events[event];
          if (cbs) {
              cbs = cbs.length > 1 ? toArray(cbs) : cbs;
              var args = toArray(arguments, 1);
              var info = "event handler for \"" + event + "\"";
              for (var i = 0, l = cbs.length; i < l; i++) {
                  invokeWithErrorHandling(cbs[i], vm, args, vm, info);
              }
          }
          return vm
      };
  }
  var activeInstance = null;
  var isUpdatingChildComponent = false;
  function setActiveInstance(vm) {
      var prevActiveInstance = activeInstance;
      activeInstance = vm;
      return function() {
          activeInstance = prevActiveInstance;
      }
  }
  function initLifecycle(vm) {
      var options = vm.$options;
      var parent = options.parent;
      if (parent && !options.abstract) {
          while (parent.$options.abstract && parent.$parent) {
              parent = parent.$parent;
          }
          parent.$children.push(vm);
      }
      vm.$parent = parent;
      vm.$root = parent ? parent.$root : vm;
      vm.$children = [];
      vm.$refs = {};
      vm._watcher = null;
      vm._inactive = null;
      vm._directInactive = false;
      vm._isMounted = false;
      vm._isDestroyed = false;
      vm._isBeingDestroyed = false;
  }
  function lifecycleMixin(Vue) {
      Vue.prototype._update = function(vnode, hydrating) {
          var vm = this;
          var prevEl = vm.$el;
          var prevVnode = vm._vnode;
          var restoreActiveInstance = setActiveInstance(vm);
          vm._vnode = vnode;
          if (!prevVnode) {
              vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
          } else {
              vm.$el = vm.__patch__(prevVnode, vnode);
          }
          restoreActiveInstance();
          if (prevEl) {
              prevEl.__vue__ = null;
          }
          if (vm.$el) {
              vm.$el.__vue__ = vm;
          }
          if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
              vm.$parent.$el = vm.$el;
          }
      };
      Vue.prototype.$forceUpdate = function() {
          var vm = this;
          if (vm._watcher) {
              vm._watcher.update();
          }
      };
      Vue.prototype.$destroy = function() {
          var vm = this;
          if (vm._isBeingDestroyed) {
              return
          }
          callHook(vm, 'beforeDestroy');
          vm._isBeingDestroyed = true;
          var parent = vm.$parent;
          if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
              remove(parent.$children, vm);
          }
          if (vm._watcher) {
              vm._watcher.teardown();
          }
          var i = vm._watchers.length;
          while (i--) {
              vm._watchers[i].teardown();
          }
          if (vm._data.__ob__) {
              vm._data.__ob__.vmCount--;
          }
          vm._isDestroyed = true;
          vm.__patch__(vm._vnode, null);
          callHook(vm, 'destroyed');
          vm.$off();
          if (vm.$el) {
              vm.$el.__vue__ = null;
          }
          if (vm.$vnode) {
              vm.$vnode.parent = null;
          }
      };
  }
  function mountComponent(vm, el, hydrating) {
      vm.$el = el;
      if (!vm.$options.render) {
          vm.$options.render = createEmptyVNode;
          {
              if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') || vm.$options.el || el) {
                  warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
              } else {
                  warn('Failed to mount component: template or render function not defined.', vm);
              }
          }
      }
      callHook(vm, 'beforeMount');
      var updateComponent;
      if (config.performance && mark) {
          updateComponent = function() {
              var name = vm._name;
              var id = vm._uid;
              var startTag = "vue-perf-start:" + id;
              var endTag = "vue-perf-end:" + id;
              mark(startTag);
              var vnode = vm._render();
              mark(endTag);
              measure(("vue " + name + " render"), startTag, endTag);
              mark(startTag);
              vm._update(vnode, hydrating);
              mark(endTag);
              measure(("vue " + name + " patch"), startTag, endTag);
          };
      } else {
          updateComponent = function() {
              vm._update(vm._render(), hydrating);
          };
      }
      new Watcher(vm, updateComponent, noop, {
          before: function before() {
              if (vm._isMounted && !vm._isDestroyed) {
                  callHook(vm, 'beforeUpdate');
              }
          }
      }, true);
      hydrating = false;
      if (vm.$vnode == null) {
          vm._isMounted = true;
          callHook(vm, 'mounted');
      }
      return vm
  }
  function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
      {
          isUpdatingChildComponent = true;
      }
      var newScopedSlots = parentVnode.data.scopedSlots;
      var oldScopedSlots = vm.$scopedSlots;
      var hasDynamicScopedSlot = !!((newScopedSlots && !newScopedSlots.$stable) || (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) || (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key));
      var needsForceUpdate = !!(renderChildren || vm.$options._renderChildren || hasDynamicScopedSlot);
      vm.$options._parentVnode = parentVnode;
      vm.$vnode = parentVnode;
      if (vm._vnode) {
          vm._vnode.parent = parentVnode;
      }
      vm.$options._renderChildren = renderChildren;
      vm.$attrs = parentVnode.data.attrs || emptyObject;
      vm.$listeners = listeners || emptyObject;
      if (propsData && vm.$options.props) {
          toggleObserving(false);
          var props = vm._props;
          var propKeys = vm.$options._propKeys || [];
          for (var i = 0; i < propKeys.length; i++) {
              var key = propKeys[i];
              var propOptions = vm.$options.props;
              props[key] = validateProp(key, propOptions, propsData, vm);
          }
          toggleObserving(true);
          vm.$options.propsData = propsData;
      }
      listeners = listeners || emptyObject;
      var oldListeners = vm.$options._parentListeners;
      vm.$options._parentListeners = listeners;
      updateComponentListeners(vm, listeners, oldListeners);
      if (needsForceUpdate) {
          vm.$slots = resolveSlots(renderChildren, parentVnode.context);
          vm.$forceUpdate();
      }
      {
          isUpdatingChildComponent = false;
      }
  }
  function isInInactiveTree(vm) {
      while (vm && (vm = vm.$parent)) {
          if (vm._inactive) {
              return true
          }
      }
      return false
  }
  function activateChildComponent(vm, direct) {
      if (direct) {
          vm._directInactive = false;
          if (isInInactiveTree(vm)) {
              return
          }
      } else if (vm._directInactive) {
          return
      }
      if (vm._inactive || vm._inactive === null) {
          vm._inactive = false;
          for (var i = 0; i < vm.$children.length; i++) {
              activateChildComponent(vm.$children[i]);
          }
          callHook(vm, 'activated');
      }
  }
  function deactivateChildComponent(vm, direct) {
      if (direct) {
          vm._directInactive = true;
          if (isInInactiveTree(vm)) {
              return
          }
      }
      if (!vm._inactive) {
          vm._inactive = true;
          for (var i = 0; i < vm.$children.length; i++) {
              deactivateChildComponent(vm.$children[i]);
          }
          callHook(vm, 'deactivated');
      }
  }
  function callHook(vm, hook) {
      pushTarget();
      var handlers = vm.$options[hook];
      var info = hook + " hook";
      if (handlers) {
          for (var i = 0, j = handlers.length; i < j; i++) {
              invokeWithErrorHandling(handlers[i], vm, null, vm, info);
          }
      }
      if (vm._hasHookEvent) {
          vm.$emit('hook:' + hook);
      }
      popTarget();
  }
  var MAX_UPDATE_COUNT = 100;
  var queue = [];
  var activatedChildren = [];
  var has = {};
  var circular = {};
  var waiting = false;
  var flushing = false;
  var index = 0;
  function resetSchedulerState() {
      index = queue.length = activatedChildren.length = 0;
      has = {};
      {
          circular = {};
      }
      waiting = flushing = false;
  }
  var currentFlushTimestamp = 0;
  var getNow = Date.now;
  if (inBrowser && !isIE) {
      var performance = window.performance;
      if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
          getNow = function() {
              return performance.now();
          };
      }
  }
  function flushSchedulerQueue() {
      currentFlushTimestamp = getNow();
      flushing = true;
      var watcher,
          id;
      queue.sort(function(a, b) {
          return a.id - b.id;
      });
      for (index = 0; index < queue.length; index++) {
          watcher = queue[index];
          if (watcher.before) {
              watcher.before();
          }
          id = watcher.id;
          has[id] = null;
          watcher.run();
          if (has[id] != null) {
              circular[id] = (circular[id] || 0) + 1;
              if (circular[id] > MAX_UPDATE_COUNT) {
                  warn('You may have an infinite update loop ' + (watcher.user ? ("in watcher with expression \"" + (watcher.expression) + "\"") : "in a component render function."), watcher.vm);
                  break
              }
          }
      }
      var activatedQueue = activatedChildren.slice();
      var updatedQueue = queue.slice();
      resetSchedulerState();
      callActivatedHooks(activatedQueue);
      callUpdatedHooks(updatedQueue);
      if (devtools && config.devtools) {
          devtools.emit('flush');
      }
  }
  function callUpdatedHooks(queue) {
      var i = queue.length;
      while (i--) {
          var watcher = queue[i];
          var vm = watcher.vm;
          if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
              callHook(vm, 'updated');
          }
      }
  }
  function queueActivatedComponent(vm) {
      vm._inactive = false;
      activatedChildren.push(vm);
  }
  function callActivatedHooks(queue) {
      for (var i = 0; i < queue.length; i++) {
          queue[i]._inactive = true;
          activateChildComponent(queue[i], true);
      }
  }
  function queueWatcher(watcher) {
      var id = watcher.id;
      if (has[id] == null) {
          has[id] = true;
          if (!flushing) {
              queue.push(watcher);
          } else {
              var i = queue.length - 1;
              while (i > index && queue[i].id > watcher.id) {
                  i--;
              }
              queue.splice(i + 1, 0, watcher);
          }
          if (!waiting) {
              waiting = true;
              if (!config.async) {
                  flushSchedulerQueue();
                  return
              }
              nextTick(flushSchedulerQueue);
          }
      }
  }
  var uid$2 = 0;
  var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
      this.vm = vm;
      if (isRenderWatcher) {
          vm._watcher = this;
      }
      vm._watchers.push(this);
      if (options) {
          this.deep = !!options.deep;
          this.user = !!options.user;
          this.lazy = !!options.lazy;
          this.sync = !!options.sync;
          this.before = options.before;
      } else {
          this.deep = this.user = this.lazy = this.sync = false;
      }
      this.cb = cb;
      this.id = ++uid$2;
      this.active = true;
      this.dirty = this.lazy;
      this.deps = [];
      this.newDeps = [];
      this.depIds = new _Set();
      this.newDepIds = new _Set();
      this.expression = expOrFn.toString();
      if (typeof expOrFn === 'function') {
          this.getter = expOrFn;
      } else {
          this.getter = parsePath(expOrFn);
          if (!this.getter) {
              this.getter = noop;
              warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
          }
      }
      this.value = this.lazy ? undefined : this.get();
  };
  Watcher.prototype.get = function get() {
      pushTarget(this);
      var value;
      var vm = this.vm;
      try {
          value = this.getter.call(vm, vm);
      } catch (e) {
          if (this.user) {
              handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
          } else {
              throw e
          }
      } finally {
          if (this.deep) {
              traverse(value);
          }
          popTarget();
          this.cleanupDeps();
      }
      return value
  };
  Watcher.prototype.addDep = function addDep(dep) {
      var id = dep.id;
      if (!this.newDepIds.has(id)) {
          this.newDepIds.add(id);
          this.newDeps.push(dep);
          if (!this.depIds.has(id)) {
              dep.addSub(this);
          }
      }
  };
  Watcher.prototype.cleanupDeps = function cleanupDeps() {
      var i = this.deps.length;
      while (i--) {
          var dep = this.deps[i];
          if (!this.newDepIds.has(dep.id)) {
              dep.removeSub(this);
          }
      }
      var tmp = this.depIds;
      this.depIds = this.newDepIds;
      this.newDepIds = tmp;
      this.newDepIds.clear();
      tmp = this.deps;
      this.deps = this.newDeps;
      this.newDeps = tmp;
      this.newDeps.length = 0;
  };
  Watcher.prototype.update = function update() {
      if (this.lazy) {
          this.dirty = true;
      } else if (this.sync) {
          this.run();
      } else {
          queueWatcher(this);
      }
  };
  Watcher.prototype.run = function run() {
      if (this.active) {
          var value = this.get();
          if (value !== this.value || isObject(value) || this.deep) {
              var oldValue = this.value;
              this.value = value;
              if (this.user) {
                  try {
                      this.cb.call(this.vm, value, oldValue);
                  } catch (e) {
                      handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
                  }
              } else {
                  this.cb.call(this.vm, value, oldValue);
              }
          }
      }
  };
  Watcher.prototype.evaluate = function evaluate() {
      this.value = this.get();
      this.dirty = false;
  };
  Watcher.prototype.depend = function depend() {
      var i = this.deps.length;
      while (i--) {
          this.deps[i].depend();
      }
  };
  Watcher.prototype.teardown = function teardown() {
      if (this.active) {
          if (!this.vm._isBeingDestroyed) {
              remove(this.vm._watchers, this);
          }
          var i = this.deps.length;
          while (i--) {
              this.deps[i].removeSub(this);
          }
          this.active = false;
      }
  };
  var sharedPropertyDefinition = {
      enumerable: true,
      configurable: true,
      get: noop,
      set: noop
  };
  function proxy(target, sourceKey, key) {
      sharedPropertyDefinition.get = function proxyGetter() {
          return this[sourceKey][key]
      };
      sharedPropertyDefinition.set = function proxySetter(val) {
          this[sourceKey][key] = val;
      };
      Object.defineProperty(target, key, sharedPropertyDefinition);
  }
  function initState(vm) {
      vm._watchers = [];
      var opts = vm.$options;
      if (opts.props) {
          initProps(vm, opts.props);
      }
      if (opts.methods) {
          initMethods(vm, opts.methods);
      }
      if (opts.data) {
          initData(vm);
      } else {
          observe(vm._data = {}, true);
      }
      if (opts.computed) {
          initComputed(vm, opts.computed);
      }
      if (opts.watch && opts.watch !== nativeWatch) {
          initWatch(vm, opts.watch);
      }
  }
  function initProps(vm, propsOptions) {
      var propsData = vm.$options.propsData || {};
      var props = vm._props = {};
      var keys = vm.$options._propKeys = [];
      var isRoot = !vm.$parent;
      if (!isRoot) {
          toggleObserving(false);
      }
      var loop = function(key) {
          keys.push(key);
          var value = validateProp(key, propsOptions, propsData, vm);
          {
              var hyphenatedKey = hyphenate(key);
              if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
                  warn(("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."), vm);
              }
              defineReactive$$1(props, key, value, function() {
                  if (!isRoot && !isUpdatingChildComponent) {
                      warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
                  }
              });
          }
          if (!(key in vm)) {
              proxy(vm, "_props", key);
          }
      };
      for (var key in propsOptions)
          loop(key);
      toggleObserving(true);
  }
  function initData(vm) {
      var data = vm.$options.data;
      data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};
      if (!isPlainObject(data)) {
          data = {};
          warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
      }
      var keys = Object.keys(data);
      var props = vm.$options.props;
      var methods = vm.$options.methods;
      var i = keys.length;
      while (i--) {
          var key = keys[i];
          {
              if (methods && hasOwn(methods, key)) {
                  warn(("Method \"" + key + "\" has already been defined as a data property."), vm);
              }
          }
          if (props && hasOwn(props, key)) {
              warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
          } else if (!isReserved(key)) {
              proxy(vm, "_data", key);
          }
      }
      observe(data, true);
  }
  function getData(data, vm) {
      pushTarget();
      try {
          return data.call(vm, vm)
      } catch (e) {
          handleError(e, vm, "data()");
          return {}
      } finally {
          popTarget();
      }
  }
  var computedWatcherOptions = {
      lazy: true
  };
  function initComputed(vm, computed) {
      var watchers = vm._computedWatchers = Object.create(null);
      var isSSR = isServerRendering();
      for (var key in computed) {
          var userDef = computed[key];
          var getter = typeof userDef === 'function' ? userDef : userDef.get;
          if (getter == null) {
              warn(("Getter is missing for computed property \"" + key + "\"."), vm);
          }
          if (!isSSR) {
              watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
          }
          if (!(key in vm)) {
              defineComputed(vm, key, userDef);
          } else {
              if (key in vm.$data) {
                  warn(("The computed property \"" + key + "\" is already defined in data."), vm);
              } else if (vm.$options.props && key in vm.$options.props) {
                  warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
              }
          }
      }
  }
  function defineComputed(target, key, userDef) {
      var shouldCache = !isServerRendering();
      if (typeof userDef === 'function') {
          sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
          sharedPropertyDefinition.set = noop;
      } else {
          sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
          sharedPropertyDefinition.set = userDef.set || noop;
      }
      if (sharedPropertyDefinition.set === noop) {
          sharedPropertyDefinition.set = function() {
              warn(("Computed property \"" + key + "\" was assigned to but it has no setter."), this);
          };
      }
      Object.defineProperty(target, key, sharedPropertyDefinition);
  }
  function createComputedGetter(key) {
      return function computedGetter() {
          var watcher = this._computedWatchers && this._computedWatchers[key];
          if (watcher) {
              if (watcher.dirty) {
                  watcher.evaluate();
              }
              if (Dep.target) {
                  watcher.depend();
              }
              return watcher.value
          }
      }
  }
  function createGetterInvoker(fn) {
      return function computedGetter() {
          return fn.call(this, this)
      }
  }
  function initMethods(vm, methods) {
      var props = vm.$options.props;
      for (var key in methods) {
          {
              if (typeof methods[key] !== 'function') {
                  warn("Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " + "Did you reference the function correctly?", vm);
              }
              if (props && hasOwn(props, key)) {
                  warn(("Method \"" + key + "\" has already been defined as a prop."), vm);
              }
              if ((key in vm) && isReserved(key)) {
                  warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
              }
          }
          vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
      }
  }
  function initWatch(vm, watch) {
      for (var key in watch) {
          var handler = watch[key];
          if (Array.isArray(handler)) {
              for (var i = 0; i < handler.length; i++) {
                  createWatcher(vm, key, handler[i]);
              }
          } else {
              createWatcher(vm, key, handler);
          }
      }
  }
  function createWatcher(vm, expOrFn, handler, options) {
      if (isPlainObject(handler)) {
          options = handler;
          handler = handler.handler;
      }
      if (typeof handler === 'string') {
          handler = vm[handler];
      }
      return vm.$watch(expOrFn, handler, options)
  }
  function stateMixin(Vue) {
      var dataDef = {};
      dataDef.get = function() {
          return this._data
      };
      var propsDef = {};
      propsDef.get = function() {
          return this._props
      };
      {
          dataDef.set = function() {
              warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
          };
          propsDef.set = function() {
              warn("$props is readonly.", this);
          };
      }
      Object.defineProperty(Vue.prototype, '$data', dataDef);
      Object.defineProperty(Vue.prototype, '$props', propsDef);
      Vue.prototype.$set = set;
      Vue.prototype.$delete = del;
      Vue.prototype.$watch = function(expOrFn, cb, options) {
          var vm = this;
          if (isPlainObject(cb)) {
              return createWatcher(vm, expOrFn, cb, options)
          }
          options = options || {};
          options.user = true;
          var watcher = new Watcher(vm, expOrFn, cb, options);
          if (options.immediate) {
              try {
                  cb.call(vm, watcher.value);
              } catch (error) {
                  handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
              }
          }
          return function unwatchFn() {
              watcher.teardown();
          }
      };
  }
  var uid$3 = 0;
  function initMixin(Vue) {
      Vue.prototype._init = function(options) {
          var vm = this;
          vm._uid = uid$3++;
          var startTag,
              endTag;
          if (config.performance && mark) {
              startTag = "vue-perf-start:" + (vm._uid);
              endTag = "vue-perf-end:" + (vm._uid);
              mark(startTag);
          }
          vm._isVue = true;
          if (options && options._isComponent) {
              initInternalComponent(vm, options);
          } else {
              vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
          }
          {
              initProxy(vm);
          }
          vm._self = vm;
          initLifecycle(vm);
          initEvents(vm);
          initRender(vm);
          callHook(vm, 'beforeCreate');
          initInjections(vm);
          initState(vm);
          initProvide(vm);
          callHook(vm, 'created');
          if (config.performance && mark) {
              vm._name = formatComponentName(vm, false);
              mark(endTag);
              measure(("vue " + (vm._name) + " init"), startTag, endTag);
          }
          if (vm.$options.el) {
              vm.$mount(vm.$options.el);
          }
      };
  }
  function initInternalComponent(vm, options) {
      var opts = vm.$options = Object.create(vm.constructor.options);
      var parentVnode = options._parentVnode;
      opts.parent = options.parent;
      opts._parentVnode = parentVnode;
      var vnodeComponentOptions = parentVnode.componentOptions;
      opts.propsData = vnodeComponentOptions.propsData;
      opts._parentListeners = vnodeComponentOptions.listeners;
      opts._renderChildren = vnodeComponentOptions.children;
      opts._componentTag = vnodeComponentOptions.tag;
      if (options.render) {
          opts.render = options.render;
          opts.staticRenderFns = options.staticRenderFns;
      }
  }
  function resolveConstructorOptions(Ctor) {
      var options = Ctor.options;
      if (Ctor.super) {
          var superOptions = resolveConstructorOptions(Ctor.super);
          var cachedSuperOptions = Ctor.superOptions;
          if (superOptions !== cachedSuperOptions) {
              Ctor.superOptions = superOptions;
              var modifiedOptions = resolveModifiedOptions(Ctor);
              if (modifiedOptions) {
                  extend(Ctor.extendOptions, modifiedOptions);
              }
              options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
              if (options.name) {
                  options.components[options.name] = Ctor;
              }
          }
      }
      return options
  }
  function resolveModifiedOptions(Ctor) {
      var modified;
      var latest = Ctor.options;
      var sealed = Ctor.sealedOptions;
      for (var key in latest) {
          if (latest[key] !== sealed[key]) {
              if (!modified) {
                  modified = {};
              }
              modified[key] = latest[key];
          }
      }
      return modified
  }
  function Vue(options) {
      if (!(this instanceof Vue)) {
          warn('Vue is a constructor and should be called with the `new` keyword');
      }
      this._init(options);
  }
  initMixin(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);
  function initUse(Vue) {
      Vue.use = function(plugin) {
          var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
          if (installedPlugins.indexOf(plugin) > -1) {
              return this
          }
          var args = toArray(arguments, 1);
          args.unshift(this);
          if (typeof plugin.install === 'function') {
              plugin.install.apply(plugin, args);
          } else if (typeof plugin === 'function') {
              plugin.apply(null, args);
          }
          installedPlugins.push(plugin);
          return this
      };
  }
  function initMixin$1(Vue) {
      Vue.mixin = function(mixin) {
          this.options = mergeOptions(this.options, mixin);
          return this
      };
  }
  function initExtend(Vue) {
      Vue.cid = 0;
      var cid = 1;
      Vue.extend = function(extendOptions) {
          extendOptions = extendOptions || {};
          var Super = this;
          var SuperId = Super.cid;
          var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
          if (cachedCtors[SuperId]) {
              return cachedCtors[SuperId]
          }
          var name = extendOptions.name || Super.options.name;
          if (name) {
              validateComponentName(name);
          }
          var Sub = function VueComponent(options) {
              this._init(options);
          };
          Sub.prototype = Object.create(Super.prototype);
          Sub.prototype.constructor = Sub;
          Sub.cid = cid++;
          Sub.options = mergeOptions(Super.options, extendOptions);
          Sub['super'] = Super;
          if (Sub.options.props) {
              initProps$1(Sub);
          }
          if (Sub.options.computed) {
              initComputed$1(Sub);
          }
          Sub.extend = Super.extend;
          Sub.mixin = Super.mixin;
          Sub.use = Super.use;
          ASSET_TYPES.forEach(function(type) {
              Sub[type] = Super[type];
          });
          if (name) {
              Sub.options.components[name] = Sub;
          }
          Sub.superOptions = Super.options;
          Sub.extendOptions = extendOptions;
          Sub.sealedOptions = extend({}, Sub.options);
          cachedCtors[SuperId] = Sub;
          return Sub
      };
  }
  function initProps$1(Comp) {
      var props = Comp.options.props;
      for (var key in props) {
          proxy(Comp.prototype, "_props", key);
      }
  }
  function initComputed$1(Comp) {
      var computed = Comp.options.computed;
      for (var key in computed) {
          defineComputed(Comp.prototype, key, computed[key]);
      }
  }
  function initAssetRegisters(Vue) {
      ASSET_TYPES.forEach(function(type) {
          Vue[type] = function(id, definition) {
              if (!definition) {
                  return this.options[type + 's'][id]
              } else {
                  if (type === 'component') {
                      validateComponentName(id);
                  }
                  if (type === 'component' && isPlainObject(definition)) {
                      definition.name = definition.name || id;
                      definition = this.options._base.extend(definition);
                  }
                  if (type === 'directive' && typeof definition === 'function') {
                      definition = {
                          bind: definition,
                          update: definition
                      };
                  }
                  this.options[type + 's'][id] = definition;
                  return definition
              }
          };
      });
  }
  function getComponentName(opts) {
      return opts && (opts.Ctor.options.name || opts.tag)
  }
  function matches(pattern, name) {
      if (Array.isArray(pattern)) {
          return pattern.indexOf(name) > -1
      } else if (typeof pattern === 'string') {
          return pattern.split(',').indexOf(name) > -1
      } else if (isRegExp(pattern)) {
          return pattern.test(name)
      }
      return false
  }
  function pruneCache(keepAliveInstance, filter) {
      var cache = keepAliveInstance.cache;
      var keys = keepAliveInstance.keys;
      var _vnode = keepAliveInstance._vnode;
      for (var key in cache) {
          var cachedNode = cache[key];
          if (cachedNode) {
              var name = getComponentName(cachedNode.componentOptions);
              if (name && !filter(name)) {
                  pruneCacheEntry(cache, key, keys, _vnode);
              }
          }
      }
  }
  function pruneCacheEntry(cache, key, keys, current) {
      var cached$$1 = cache[key];
      if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
          cached$$1.componentInstance.$destroy();
      }
      cache[key] = null;
      remove(keys, key);
  }
  var patternTypes = [String, RegExp, Array];
  var KeepAlive = {
      name: 'keep-alive',
      abstract: true,
      props: {
          include: patternTypes,
          exclude: patternTypes,
          max: [String, Number]
      },
      created: function created() {
          this.cache = Object.create(null);
          this.keys = [];
      },
      destroyed: function destroyed() {
          for (var key in this.cache) {
              pruneCacheEntry(this.cache, key, this.keys);
          }
      },
      mounted: function mounted() {
          var this$1 = this;
          this.$watch('include', function(val) {
              pruneCache(this$1, function(name) {
                  return matches(val, name);
              });
          });
          this.$watch('exclude', function(val) {
              pruneCache(this$1, function(name) {
                  return !matches(val, name);
              });
          });
      },
      render: function render() {
          var slot = this.$slots.default;
          var vnode = getFirstComponentChild(slot);
          var componentOptions = vnode && vnode.componentOptions;
          if (componentOptions) {
              var name = getComponentName(componentOptions);
              var ref = this;
              var include = ref.include;
              var exclude = ref.exclude;
              if ((include && (!name || !matches(include, name))) || (exclude && name && matches(exclude, name))) {
                  return vnode
              }
              var ref$1 = this;
              var cache = ref$1.cache;
              var keys = ref$1.keys;
              var key = vnode.key == null ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '') : vnode.key;
              if (cache[key]) {
                  vnode.componentInstance = cache[key].componentInstance;
                  remove(keys, key);
                  keys.push(key);
              } else {
                  cache[key] = vnode;
                  keys.push(key);
                  if (this.max && keys.length > parseInt(this.max)) {
                      pruneCacheEntry(cache, keys[0], keys, this._vnode);
                  }
              }
              vnode.data.keepAlive = true;
          }
          return vnode || (slot && slot[0])
      }
  };
  var builtInComponents = {
      KeepAlive: KeepAlive
  };
  function initGlobalAPI(Vue) {
      var configDef = {};
      configDef.get = function() {
          return config;
      };
      {
          configDef.set = function() {
              warn('Do not replace the Vue.config object, set individual fields instead.');
          };
      }
      Object.defineProperty(Vue, 'config', configDef);
      Vue.util = {
          warn: warn,
          extend: extend,
          mergeOptions: mergeOptions,
          defineReactive: defineReactive$$1
      };
      Vue.set = set;
      Vue.delete = del;
      Vue.nextTick = nextTick;
      Vue.observable = function(obj) {
          observe(obj);
          return obj
      };
      Vue.options = Object.create(null);
      ASSET_TYPES.forEach(function(type) {
          Vue.options[type + 's'] = Object.create(null);
      });
      Vue.options._base = Vue;
      extend(Vue.options.components, builtInComponents);
      initUse(Vue);
      initMixin$1(Vue);
      initExtend(Vue);
      initAssetRegisters(Vue);
  }
  initGlobalAPI(Vue);
  Object.defineProperty(Vue.prototype, '$isServer', {
      get: isServerRendering
  });
  Object.defineProperty(Vue.prototype, '$ssrContext', {
      get: function get() {
          return this.$vnode && this.$vnode.ssrContext
      }
  });
  Object.defineProperty(Vue, 'FunctionalRenderContext', {
      value: FunctionalRenderContext
  });
  Vue.version = '2.6.10';
  var isReservedAttr = makeMap('style,class');
  var acceptValue = makeMap('input,textarea,option,select,progress');
  var mustUseProp = function(tag, type, attr) {
      return ( (attr === 'value' && acceptValue(tag)) && type !== 'button' || (attr === 'selected' && tag === 'option') || (attr === 'checked' && tag === 'input') || (attr === 'muted' && tag === 'video'))
  };
  var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
  var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');
  var convertEnumeratedValue = function(key, value) {
      return isFalsyAttrValue(value) || value === 'false' ? 'false' : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true'
  };
  var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
  var xlinkNS = 'http://www.w3.org/1999/xlink';
  var isXlink = function(name) {
      return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
  };
  var getXlinkProp = function(name) {
      return isXlink(name) ? name.slice(6, name.length) : ''
  };
  var isFalsyAttrValue = function(val) {
      return val == null || val === false
  };
  function genClassForVnode(vnode) {
      var data = vnode.data;
      var parentNode = vnode;
      var childNode = vnode;
      while (isDef(childNode.componentInstance)) {
          childNode = childNode.componentInstance._vnode;
          if (childNode && childNode.data) {
              data = mergeClassData(childNode.data, data);
          }
      }
      while (isDef(parentNode = parentNode.parent)) {
          if (parentNode && parentNode.data) {
              data = mergeClassData(data, parentNode.data);
          }
      }
      return renderClass(data.staticClass, data.class)
  }
  function mergeClassData(child, parent) {
      return {
          staticClass: concat(child.staticClass, parent.staticClass),
          class: isDef(child.class) ? [child.class, parent.class] : parent.class
      }
  }
  function renderClass(staticClass, dynamicClass) {
      if (isDef(staticClass) || isDef(dynamicClass)) {
          return concat(staticClass, stringifyClass(dynamicClass))
      }
      return ''
  }
  function concat(a, b) {
      return a ? b ? (a + ' ' + b) : a : (b || '')
  }
  function stringifyClass(value) {
      if (Array.isArray(value)) {
          return stringifyArray(value)
      }
      if (isObject(value)) {
          return stringifyObject(value)
      }
      if (typeof value === 'string') {
          return value
      }
      return ''
  }
  function stringifyArray(value) {
      var res = '';
      var stringified;
      for (var i = 0, l = value.length; i < l; i++) {
          if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
              if (res) {
                  res += ' ';
              }
              res += stringified;
          }
      }
      return res
  }
  function stringifyObject(value) {
      var res = '';
      for (var key in value) {
          if (value[key]) {
              if (res) {
                  res += ' ';
              }
              res += key;
          }
      }
      return res
  }
  var namespaceMap = {
      svg: 'http://www.w3.org/2000/svg',
      math: 'http://www.w3.org/1998/Math/MathML'
  };
  var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot');
  var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);
  var isPreTag = function(tag) {
      return tag === 'pre';
  };
  var isReservedTag = function(tag) {
      return isHTMLTag(tag) || isSVG(tag)
  };
  function getTagNamespace(tag) {
      if (isSVG(tag)) {
          return 'svg'
      }
      if (tag === 'math') {
          return 'math'
      }
  }
  var unknownElementCache = Object.create(null);
  function isUnknownElement(tag) {
      if (!inBrowser) {
          return true
      }
      if (isReservedTag(tag)) {
          return false
      }
      tag = tag.toLowerCase();
      if (unknownElementCache[tag] != null) {
          return unknownElementCache[tag]
      }
      var el = document.createElement(tag);
      if (tag.indexOf('-') > -1) {
          return ( unknownElementCache[tag] = (el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement))
      } else {
          return ( unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
      }
  }
  var isTextInputType = makeMap('text,number,password,search,email,tel,url');
  function query(el) {
      if (typeof el === 'string') {
          var selected = document.querySelector(el);
          if (!selected) {
              warn('Cannot find element: ' + el);
              return document.createElement('div')
          }
          return selected
      } else {
          return el
      }
  }
  function createElement$1(tagName, vnode) {
      var elm = document.createElement(tagName);
      if (tagName !== 'select') {
          return elm
      }
      if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
          elm.setAttribute('multiple', 'multiple');
      }
      return elm
  }
  function createElementNS(namespace, tagName) {
      return document.createElementNS(namespaceMap[namespace], tagName)
  }
  function createTextNode(text) {
      return document.createTextNode(text)
  }
  function createComment(text) {
      return document.createComment(text)
  }
  function insertBefore(parentNode, newNode, referenceNode) {
      parentNode.insertBefore(newNode, referenceNode);
  }
  function removeChild(node, child) {
      node.removeChild(child);
  }
  function appendChild(node, child) {
      node.appendChild(child);
  }
  function parentNode(node) {
      return node.parentNode
  }
  function nextSibling(node) {
      return node.nextSibling
  }
  function tagName(node) {
      return node.tagName
  }
  function setTextContent(node, text) {
      node.textContent = text;
  }
  function setStyleScope(node, scopeId) {
      node.setAttribute(scopeId, '');
  }
  var nodeOps = Object.freeze({
      createElement: createElement$1,
      createElementNS: createElementNS,
      createTextNode: createTextNode,
      createComment: createComment,
      insertBefore: insertBefore,
      removeChild: removeChild,
      appendChild: appendChild,
      parentNode: parentNode,
      nextSibling: nextSibling,
      tagName: tagName,
      setTextContent: setTextContent,
      setStyleScope: setStyleScope
  });
  var ref = {
      create: function create(_, vnode) {
          registerRef(vnode);
      },
      update: function update(oldVnode, vnode) {
          if (oldVnode.data.ref !== vnode.data.ref) {
              registerRef(oldVnode, true);
              registerRef(vnode);
          }
      },
      destroy: function destroy(vnode) {
          registerRef(vnode, true);
      }
  };
  function registerRef(vnode, isRemoval) {
      var key = vnode.data.ref;
      if (!isDef(key)) {
          return
      }
      var vm = vnode.context;
      var ref = vnode.componentInstance || vnode.elm;
      var refs = vm.$refs;
      if (isRemoval) {
          if (Array.isArray(refs[key])) {
              remove(refs[key], ref);
          } else if (refs[key] === ref) {
              refs[key] = undefined;
          }
      } else {
          if (vnode.data.refInFor) {
              if (!Array.isArray(refs[key])) {
                  refs[key] = [ref];
              } else if (refs[key].indexOf(ref) < 0) {
                  refs[key].push(ref);
              }
          } else {
              refs[key] = ref;
          }
      }
  }
  var emptyNode = new VNode('', {}, []);
  var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];
  function sameVnode(a, b) {
      return ( a.key === b.key && ((a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b)) || (isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error))))
  }
  function sameInputType(a, b) {
      if (a.tag !== 'input') {
          return true
      }
      var i;
      var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
      var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
      return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
  }
  function createKeyToOldIdx(children, beginIdx, endIdx) {
      var i,
          key;
      var map = {};
      for (i = beginIdx; i <= endIdx; ++i) {
          key = children[i].key;
          if (isDef(key)) {
              map[key] = i;
          }
      }
      return map
  }
  function createPatchFunction(backend) {
      var i,
          j;
      var cbs = {};
      var modules = backend.modules;
      var nodeOps = backend.nodeOps;
      for (i = 0; i < hooks.length; ++i) {
          cbs[hooks[i]] = [];
          for (j = 0; j < modules.length; ++j) {
              if (isDef(modules[j][hooks[i]])) {
                  cbs[hooks[i]].push(modules[j][hooks[i]]);
              }
          }
      }
      function emptyNodeAt(elm) {
          return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
      }
      function createRmCb(childElm, listeners) {
          function remove$$1() {
              if (--remove$$1.listeners === 0) {
                  removeNode(childElm);
              }
          }
          remove$$1.listeners = listeners;
          return remove$$1
      }
      function removeNode(el) {
          var parent = nodeOps.parentNode(el);
          if (isDef(parent)) {
              nodeOps.removeChild(parent, el);
          }
      }
      function isUnknownElement$$1(vnode, inVPre) {
          return ( !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function(ignore) {
                  return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag
              })) && config.isUnknownElement(vnode.tag))
      }
      var creatingElmInVPre = 0;
      function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
          if (isDef(vnode.elm) && isDef(ownerArray)) {
              vnode = ownerArray[index] = cloneVNode(vnode);
          }
          vnode.isRootInsert = !nested;
          if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
              return
          }
          var data = vnode.data;
          var children = vnode.children;
          var tag = vnode.tag;
          if (isDef(tag)) {
              {
                  if (data && data.pre) {
                      creatingElmInVPre++;
                  }
                  if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
                      warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
                  }
              }
              vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
              setScope(vnode);
              {
                  createChildren(vnode, children, insertedVnodeQueue);
                  if (isDef(data)) {
                      invokeCreateHooks(vnode, insertedVnodeQueue);
                  }
                  insert(parentElm, vnode.elm, refElm);
              }
              if (data && data.pre) {
                  creatingElmInVPre--;
              }
          } else if (isTrue(vnode.isComment)) {
              vnode.elm = nodeOps.createComment(vnode.text);
              insert(parentElm, vnode.elm, refElm);
          } else {
              vnode.elm = nodeOps.createTextNode(vnode.text);
              insert(parentElm, vnode.elm, refElm);
          }
      }
      function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
          var i = vnode.data;
          if (isDef(i)) {
              var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
              if (isDef(i = i.hook) && isDef(i = i.init)) {
                  i(vnode, false);
              }
              if (isDef(vnode.componentInstance)) {
                  initComponent(vnode, insertedVnodeQueue);
                  insert(parentElm, vnode.elm, refElm);
                  if (isTrue(isReactivated)) {
                      reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
                  }
                  return true
              }
          }
      }
      function initComponent(vnode, insertedVnodeQueue) {
          if (isDef(vnode.data.pendingInsert)) {
              insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
              vnode.data.pendingInsert = null;
          }
          vnode.elm = vnode.componentInstance.$el;
          if (isPatchable(vnode)) {
              invokeCreateHooks(vnode, insertedVnodeQueue);
              setScope(vnode);
          } else {
              registerRef(vnode);
              insertedVnodeQueue.push(vnode);
          }
      }
      function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
          var i;
          var innerNode = vnode;
          while (innerNode.componentInstance) {
              innerNode = innerNode.componentInstance._vnode;
              if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
                  for (i = 0; i < cbs.activate.length; ++i) {
                      cbs.activate[i](emptyNode, innerNode);
                  }
                  insertedVnodeQueue.push(innerNode);
                  break
              }
          }
          insert(parentElm, vnode.elm, refElm);
      }
      function insert(parent, elm, ref$$1) {
          if (isDef(parent)) {
              if (isDef(ref$$1)) {
                  if (nodeOps.parentNode(ref$$1) === parent) {
                      nodeOps.insertBefore(parent, elm, ref$$1);
                  }
              } else {
                  nodeOps.appendChild(parent, elm);
              }
          }
      }
      function createChildren(vnode, children, insertedVnodeQueue) {
          if (Array.isArray(children)) {
              {
                  checkDuplicateKeys(children);
              }
              for (var i = 0; i < children.length; ++i) {
                  createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
              }
          } else if (isPrimitive(vnode.text)) {
              nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
          }
      }
      function isPatchable(vnode) {
          while (vnode.componentInstance) {
              vnode = vnode.componentInstance._vnode;
          }
          return isDef(vnode.tag)
      }
      function invokeCreateHooks(vnode, insertedVnodeQueue) {
          for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
              cbs.create[i$1](emptyNode, vnode);
          }
          i = vnode.data.hook;
          if (isDef(i)) {
              if (isDef(i.create)) {
                  i.create(emptyNode, vnode);
              }
              if (isDef(i.insert)) {
                  insertedVnodeQueue.push(vnode);
              }
          }
      }
      function setScope(vnode) {
          var i;
          if (isDef(i = vnode.fnScopeId)) {
              nodeOps.setStyleScope(vnode.elm, i);
          } else {
              var ancestor = vnode;
              while (ancestor) {
                  if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
                      nodeOps.setStyleScope(vnode.elm, i);
                  }
                  ancestor = ancestor.parent;
              }
          }
          if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
              nodeOps.setStyleScope(vnode.elm, i);
          }
      }
      function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
          for (; startIdx <= endIdx; ++startIdx) {
              createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
          }
      }
      function invokeDestroyHook(vnode) {
          var i,
              j;
          var data = vnode.data;
          if (isDef(data)) {
              if (isDef(i = data.hook) && isDef(i = i.destroy)) {
                  i(vnode);
              }
              for (i = 0; i < cbs.destroy.length; ++i) {
                  cbs.destroy[i](vnode);
              }
          }
          if (isDef(i = vnode.children)) {
              for (j = 0; j < vnode.children.length; ++j) {
                  invokeDestroyHook(vnode.children[j]);
              }
          }
      }
      function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
          for (; startIdx <= endIdx; ++startIdx) {
              var ch = vnodes[startIdx];
              if (isDef(ch)) {
                  if (isDef(ch.tag)) {
                      removeAndInvokeRemoveHook(ch);
                      invokeDestroyHook(ch);
                  } else {
                      removeNode(ch.elm);
                  }
              }
          }
      }
      function removeAndInvokeRemoveHook(vnode, rm) {
          if (isDef(rm) || isDef(vnode.data)) {
              var i;
              var listeners = cbs.remove.length + 1;
              if (isDef(rm)) {
                  rm.listeners += listeners;
              } else {
                  rm = createRmCb(vnode.elm, listeners);
              }
              if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
                  removeAndInvokeRemoveHook(i, rm);
              }
              for (i = 0; i < cbs.remove.length; ++i) {
                  cbs.remove[i](vnode, rm);
              }
              if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
                  i(vnode, rm);
              } else {
                  rm();
              }
          } else {
              removeNode(vnode.elm);
          }
      }
      function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
          var oldStartIdx = 0;
          var newStartIdx = 0;
          var oldEndIdx = oldCh.length - 1;
          var oldStartVnode = oldCh[0];
          var oldEndVnode = oldCh[oldEndIdx];
          var newEndIdx = newCh.length - 1;
          var newStartVnode = newCh[0];
          var newEndVnode = newCh[newEndIdx];
          var oldKeyToIdx,
              idxInOld,
              vnodeToMove,
              refElm;
          var canMove = !removeOnly;
          {
              checkDuplicateKeys(newCh);
          }
          while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
              if (isUndef(oldStartVnode)) {
                  oldStartVnode = oldCh[++oldStartIdx];
              } else if (isUndef(oldEndVnode)) {
                  oldEndVnode = oldCh[--oldEndIdx];
              } else if (sameVnode(oldStartVnode, newStartVnode)) {
                  patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                  oldStartVnode = oldCh[++oldStartIdx];
                  newStartVnode = newCh[++newStartIdx];
              } else if (sameVnode(oldEndVnode, newEndVnode)) {
                  patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
                  oldEndVnode = oldCh[--oldEndIdx];
                  newEndVnode = newCh[--newEndIdx];
              } else if (sameVnode(oldStartVnode, newEndVnode)) {
                  patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
                  canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
                  oldStartVnode = oldCh[++oldStartIdx];
                  newEndVnode = newCh[--newEndIdx];
              } else if (sameVnode(oldEndVnode, newStartVnode)) {
                  patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                  canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                  oldEndVnode = oldCh[--oldEndIdx];
                  newStartVnode = newCh[++newStartIdx];
              } else {
                  if (isUndef(oldKeyToIdx)) {
                      oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                  }
                  idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
                  if (isUndef(idxInOld)) {
                      createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
                  } else {
                      vnodeToMove = oldCh[idxInOld];
                      if (sameVnode(vnodeToMove, newStartVnode)) {
                          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                          oldCh[idxInOld] = undefined;
                          canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
                      } else {
                          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
                      }
                  }
                  newStartVnode = newCh[++newStartIdx];
              }
          }
          if (oldStartIdx > oldEndIdx) {
              refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
              addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
          } else if (newStartIdx > newEndIdx) {
              removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
          }
      }
      function checkDuplicateKeys(children) {
          var seenKeys = {};
          for (var i = 0; i < children.length; i++) {
              var vnode = children[i];
              var key = vnode.key;
              if (isDef(key)) {
                  if (seenKeys[key]) {
                      warn(("Duplicate keys detected: '" + key + "'. This may cause an update error."), vnode.context);
                  } else {
                      seenKeys[key] = true;
                  }
              }
          }
      }
      function findIdxInOld(node, oldCh, start, end) {
          for (var i = start; i < end; i++) {
              var c = oldCh[i];
              if (isDef(c) && sameVnode(node, c)) {
                  return i
              }
          }
      }
      function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
          if (oldVnode === vnode) {
              return
          }
          if (isDef(vnode.elm) && isDef(ownerArray)) {
              vnode = ownerArray[index] = cloneVNode(vnode);
          }
          var elm = vnode.elm = oldVnode.elm;
          if (isTrue(oldVnode.isAsyncPlaceholder)) {
              if (isDef(vnode.asyncFactory.resolved)) {
                  hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
              } else {
                  vnode.isAsyncPlaceholder = true;
              }
              return
          }
          if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
              vnode.componentInstance = oldVnode.componentInstance;
              return
          }
          var i;
          var data = vnode.data;
          if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
              i(oldVnode, vnode);
          }
          var oldCh = oldVnode.children;
          var ch = vnode.children;
          if (isDef(data) && isPatchable(vnode)) {
              for (i = 0; i < cbs.update.length; ++i) {
                  cbs.update[i](oldVnode, vnode);
              }
              if (isDef(i = data.hook) && isDef(i = i.update)) {
                  i(oldVnode, vnode);
              }
          }
          if (isUndef(vnode.text)) {
              if (isDef(oldCh) && isDef(ch)) {
                  if (oldCh !== ch) {
                      updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
                  }
              } else if (isDef(ch)) {
                  {
                      checkDuplicateKeys(ch);
                  }
                  if (isDef(oldVnode.text)) {
                      nodeOps.setTextContent(elm, '');
                  }
                  addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
              } else if (isDef(oldCh)) {
                  removeVnodes(elm, oldCh, 0, oldCh.length - 1);
              } else if (isDef(oldVnode.text)) {
                  nodeOps.setTextContent(elm, '');
              }
          } else if (oldVnode.text !== vnode.text) {
              nodeOps.setTextContent(elm, vnode.text);
          }
          if (isDef(data)) {
              if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
                  i(oldVnode, vnode);
              }
          }
      }
      function invokeInsertHook(vnode, queue, initial) {
          if (isTrue(initial) && isDef(vnode.parent)) {
              vnode.parent.data.pendingInsert = queue;
          } else {
              for (var i = 0; i < queue.length; ++i) {
                  queue[i].data.hook.insert(queue[i]);
              }
          }
      }
      var hydrationBailed = false;
      var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');
      function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
          var i;
          var tag = vnode.tag;
          var data = vnode.data;
          var children = vnode.children;
          inVPre = inVPre || (data && data.pre);
          vnode.elm = elm;
          if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
              vnode.isAsyncPlaceholder = true;
              return true
          }
          {
              if (!assertNodeMatch(elm, vnode, inVPre)) {
                  return false
              }
          }
          if (isDef(data)) {
              if (isDef(i = data.hook) && isDef(i = i.init)) {
                  i(vnode, true);
              }
              if (isDef(i = vnode.componentInstance)) {
                  initComponent(vnode, insertedVnodeQueue);
                  return true
              }
          }
          if (isDef(tag)) {
              if (isDef(children)) {
                  if (!elm.hasChildNodes()) {
                      createChildren(vnode, children, insertedVnodeQueue);
                  } else {
                      if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
                          if (i !== elm.innerHTML) {
                              if (typeof console !== 'undefined' && !hydrationBailed) {
                                  hydrationBailed = true;
                                  console.warn('Parent: ', elm);
                                  console.warn('server innerHTML: ', i);
                                  console.warn('client innerHTML: ', elm.innerHTML);
                              }
                              return false
                          }
                      } else {
                          var childrenMatch = true;
                          var childNode = elm.firstChild;
                          for (var i$1 = 0; i$1 < children.length; i$1++) {
                              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                                  childrenMatch = false;
                                  break
                              }
                              childNode = childNode.nextSibling;
                          }
                          if (!childrenMatch || childNode) {
                              if (typeof console !== 'undefined' && !hydrationBailed) {
                                  hydrationBailed = true;
                                  console.warn('Parent: ', elm);
                                  console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
                              }
                              return false
                          }
                      }
                  }
              }
              if (isDef(data)) {
                  var fullInvoke = false;
                  for (var key in data) {
                      if (!isRenderedModule(key)) {
                          fullInvoke = true;
                          invokeCreateHooks(vnode, insertedVnodeQueue);
                          break
                      }
                  }
                  if (!fullInvoke && data['class']) {
                      traverse(data['class']);
                  }
              }
          } else if (elm.data !== vnode.text) {
              elm.data = vnode.text;
          }
          return true
      }
      function assertNodeMatch(node, vnode, inVPre) {
          if (isDef(vnode.tag)) {
              return vnode.tag.indexOf('vue-component') === 0 || (!isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase()))
          } else {
              return node.nodeType === (vnode.isComment ? 8 : 3)
          }
      }
      return function patch(oldVnode, vnode, hydrating, removeOnly) {
          if (isUndef(vnode)) {
              if (isDef(oldVnode)) {
                  invokeDestroyHook(oldVnode);
              }
              return
          }
          var isInitialPatch = false;
          var insertedVnodeQueue = [];
          if (isUndef(oldVnode)) {
              isInitialPatch = true;
              createElm(vnode, insertedVnodeQueue);
          } else {
              var isRealElement = isDef(oldVnode.nodeType);
              if (!isRealElement && sameVnode(oldVnode, vnode)) {
                  patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
              } else {
                  if (isRealElement) {
                      if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                          oldVnode.removeAttribute(SSR_ATTR);
                          hydrating = true;
                      }
                      if (isTrue(hydrating)) {
                          if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                              invokeInsertHook(vnode, insertedVnodeQueue, true);
                              return oldVnode
                          } else {
                              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
                          }
                      }
                      oldVnode = emptyNodeAt(oldVnode);
                  }
                  var oldElm = oldVnode.elm;
                  var parentElm = nodeOps.parentNode(oldElm);
                  createElm(vnode, insertedVnodeQueue, oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm));
                  if (isDef(vnode.parent)) {
                      var ancestor = vnode.parent;
                      var patchable = isPatchable(vnode);
                      while (ancestor) {
                          for (var i = 0; i < cbs.destroy.length; ++i) {
                              cbs.destroy[i](ancestor);
                          }
                          ancestor.elm = vnode.elm;
                          if (patchable) {
                              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                                  cbs.create[i$1](emptyNode, ancestor);
                              }
                              var insert = ancestor.data.hook.insert;
                              if (insert.merged) {
                                  for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                                      insert.fns[i$2]();
                                  }
                              }
                          } else {
                              registerRef(ancestor);
                          }
                          ancestor = ancestor.parent;
                      }
                  }
                  if (isDef(parentElm)) {
                      removeVnodes(parentElm, [oldVnode], 0, 0);
                  } else if (isDef(oldVnode.tag)) {
                      invokeDestroyHook(oldVnode);
                  }
              }
          }
          invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
          return vnode.elm
      }
  }
  var directives = {
      create: updateDirectives,
      update: updateDirectives,
      destroy: function unbindDirectives(vnode) {
          updateDirectives(vnode, emptyNode);
      }
  };
  function updateDirectives(oldVnode, vnode) {
      if (oldVnode.data.directives || vnode.data.directives) {
          _update(oldVnode, vnode);
      }
  }
  function _update(oldVnode, vnode) {
      var isCreate = oldVnode === emptyNode;
      var isDestroy = vnode === emptyNode;
      var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
      var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
      var dirsWithInsert = [];
      var dirsWithPostpatch = [];
      var key,
          oldDir,
          dir;
      for (key in newDirs) {
          oldDir = oldDirs[key];
          dir = newDirs[key];
          if (!oldDir) {
              callHook$1(dir, 'bind', vnode, oldVnode);
              if (dir.def && dir.def.inserted) {
                  dirsWithInsert.push(dir);
              }
          } else {
              dir.oldValue = oldDir.value;
              dir.oldArg = oldDir.arg;
              callHook$1(dir, 'update', vnode, oldVnode);
              if (dir.def && dir.def.componentUpdated) {
                  dirsWithPostpatch.push(dir);
              }
          }
      }
      if (dirsWithInsert.length) {
          var callInsert = function() {
              for (var i = 0; i < dirsWithInsert.length; i++) {
                  callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
              }
          };
          if (isCreate) {
              mergeVNodeHook(vnode, 'insert', callInsert);
          } else {
              callInsert();
          }
      }
      if (dirsWithPostpatch.length) {
          mergeVNodeHook(vnode, 'postpatch', function() {
              for (var i = 0; i < dirsWithPostpatch.length; i++) {
                  callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
              }
          });
      }
      if (!isCreate) {
          for (key in oldDirs) {
              if (!newDirs[key]) {
                  callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
              }
          }
      }
  }
  var emptyModifiers = Object.create(null);
  function normalizeDirectives$1(dirs, vm) {
      var res = Object.create(null);
      if (!dirs) {
          return res
      }
      var i,
          dir;
      for (i = 0; i < dirs.length; i++) {
          dir = dirs[i];
          if (!dir.modifiers) {
              dir.modifiers = emptyModifiers;
          }
          res[getRawDirName(dir)] = dir;
          dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
      }
      return res
  }
  function getRawDirName(dir) {
      return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
  }
  function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
      var fn = dir.def && dir.def[hook];
      if (fn) {
          try {
              fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
          } catch (e) {
              handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
          }
      }
  }
  var baseModules = [ref, directives];
  function updateAttrs(oldVnode, vnode) {
      var opts = vnode.componentOptions;
      if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
          return
      }
      if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
          return
      }
      var key,
          cur,
          old;
      var elm = vnode.elm;
      var oldAttrs = oldVnode.data.attrs || {};
      var attrs = vnode.data.attrs || {};
      if (isDef(attrs.__ob__)) {
          attrs = vnode.data.attrs = extend({}, attrs);
      }
      for (key in attrs) {
          cur = attrs[key];
          old = oldAttrs[key];
          if (old !== cur) {
              setAttr(elm, key, cur);
          }
      }
      if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
          setAttr(elm, 'value', attrs.value);
      }
      for (key in oldAttrs) {
          if (isUndef(attrs[key])) {
              if (isXlink(key)) {
                  elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
              } else if (!isEnumeratedAttr(key)) {
                  elm.removeAttribute(key);
              }
          }
      }
  }
  function setAttr(el, key, value) {
      if (el.tagName.indexOf('-') > -1) {
          baseSetAttr(el, key, value);
      } else if (isBooleanAttr(key)) {
          if (isFalsyAttrValue(value)) {
              el.removeAttribute(key);
          } else {
              value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
              el.setAttribute(key, value);
          }
      } else if (isEnumeratedAttr(key)) {
          el.setAttribute(key, convertEnumeratedValue(key, value));
      } else if (isXlink(key)) {
          if (isFalsyAttrValue(value)) {
              el.removeAttributeNS(xlinkNS, getXlinkProp(key));
          } else {
              el.setAttributeNS(xlinkNS, key, value);
          }
      } else {
          baseSetAttr(el, key, value);
      }
  }
  function baseSetAttr(el, key, value) {
      if (isFalsyAttrValue(value)) {
          el.removeAttribute(key);
      } else {
          if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
              var blocker = function(e) {
                  e.stopImmediatePropagation();
                  el.removeEventListener('input', blocker);
              };
              el.addEventListener('input', blocker);
              el.__ieph = true;
          }
          el.setAttribute(key, value);
      }
  }
  var attrs = {
      create: updateAttrs,
      update: updateAttrs
  };
  function updateClass(oldVnode, vnode) {
      var el = vnode.elm;
      var data = vnode.data;
      var oldData = oldVnode.data;
      if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || (isUndef(oldData.staticClass) && isUndef(oldData.class)))) {
          return
      }
      var cls = genClassForVnode(vnode);
      var transitionClass = el._transitionClasses;
      if (isDef(transitionClass)) {
          cls = concat(cls, stringifyClass(transitionClass));
      }
      if (cls !== el._prevClass) {
          el.setAttribute('class', cls);
          el._prevClass = cls;
      }
  }
  var klass = {
      create: updateClass,
      update: updateClass
  };
  var validDivisionCharRE = /[\w).+\-_$\]]/;
  function parseFilters(exp) {
      var inSingle = false;
      var inDouble = false;
      var inTemplateString = false;
      var inRegex = false;
      var curly = 0;
      var square = 0;
      var paren = 0;
      var lastFilterIndex = 0;
      var c,
          prev,
          i,
          expression,
          filters;
      for (i = 0; i < exp.length; i++) {
          prev = c;
          c = exp.charCodeAt(i);
          if (inSingle) {
              if (c === 0x27 && prev !== 0x5C) {
                  inSingle = false;
              }
          } else if (inDouble) {
              if (c === 0x22 && prev !== 0x5C) {
                  inDouble = false;
              }
          } else if (inTemplateString) {
              if (c === 0x60 && prev !== 0x5C) {
                  inTemplateString = false;
              }
          } else if (inRegex) {
              if (c === 0x2f && prev !== 0x5C) {
                  inRegex = false;
              }
          } else if (c === 0x7C && exp.charCodeAt(i + 1) !== 0x7C && exp.charCodeAt(i - 1) !== 0x7C && !curly && !square && !paren) {
              if (expression === undefined) {
                  lastFilterIndex = i + 1;
                  expression = exp.slice(0, i).trim();
              } else {
                  pushFilter();
              }
          } else {
              switch (c) {
              case 0x22:
                  inDouble = true;
                  break
              case 0x27:
                  inSingle = true;
                  break
              case 0x60:
                  inTemplateString = true;
                  break
              case 0x28:
                  paren++;
                  break
              case 0x29:
                  paren--;
                  break
              case 0x5B:
                  square++;
                  break
              case 0x5D:
                  square--;
                  break
              case 0x7B:
                  curly++;
                  break
              case 0x7D:
                  curly--;
                  break
              }
              if (c === 0x2f) {
                  var j = i - 1;
                  var p = (void 0);
                  for (; j >= 0; j--) {
                      p = exp.charAt(j);
                      if (p !== ' ') {
                          break
                      }
                  }
                  if (!p || !validDivisionCharRE.test(p)) {
                      inRegex = true;
                  }
              }
          }
      }
      if (expression === undefined) {
          expression = exp.slice(0, i).trim();
      } else if (lastFilterIndex !== 0) {
          pushFilter();
      }
      function pushFilter() {
          (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
          lastFilterIndex = i + 1;
      }
      if (filters) {
          for (i = 0; i < filters.length; i++) {
              expression = wrapFilter(expression, filters[i]);
          }
      }
      return expression
  }
  function wrapFilter(exp, filter) {
      var i = filter.indexOf('(');
      if (i < 0) {
          return ( "_f(\"" + filter + "\")(" + exp + ")")
      } else {
          var name = filter.slice(0, i);
          var args = filter.slice(i + 1);
          return ( "_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
      }
  }
  function baseWarn(msg, range) {
      console.error(("[Vue compiler]: " + msg));
  }
  function pluckModuleFunction(modules, key) {
      return modules ? modules.map(function(m) {
          return m[key];
      }).filter(function(_) {
          return _;
      }) : []
  }
  function addProp(el, name, value, range, dynamic) {
      (el.props || (el.props = [])).push(rangeSetItem({
          name: name,
          value: value,
          dynamic: dynamic
      }, range));
      el.plain = false;
  }
  function addAttr(el, name, value, range, dynamic) {
      var attrs = dynamic ? (el.dynamicAttrs || (el.dynamicAttrs = [])) : (el.attrs || (el.attrs = []));
      attrs.push(rangeSetItem({
          name: name,
          value: value,
          dynamic: dynamic
      }, range));
      el.plain = false;
  }
  function addRawAttr(el, name, value, range) {
      el.attrsMap[name] = value;
      el.attrsList.push(rangeSetItem({
          name: name,
          value: value
      }, range));
  }
  function addDirective(el, name, rawName, value, arg, isDynamicArg, modifiers, range) {
      (el.directives || (el.directives = [])).push(rangeSetItem({
          name: name,
          rawName: rawName,
          value: value,
          arg: arg,
          isDynamicArg: isDynamicArg,
          modifiers: modifiers
      }, range));
      el.plain = false;
  }
  function prependModifierMarker(symbol, name, dynamic) {
      return dynamic ? ("_p(" + name + ",\"" + symbol + "\")") : symbol + name
  }
  function addHandler(el, name, value, modifiers, important, warn, range, dynamic) {
      modifiers = modifiers || emptyObject;
      if (warn && modifiers.prevent && modifiers.passive) {
          warn('passive and prevent can\'t be used together. ' + 'Passive handler can\'t prevent default event.', range);
      }
      if (modifiers.right) {
          if (dynamic) {
              name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
          } else if (name === 'click') {
              name = 'contextmenu';
              delete modifiers.right;
          }
      } else if (modifiers.middle) {
          if (dynamic) {
              name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
          } else if (name === 'click') {
              name = 'mouseup';
          }
      }
      if (modifiers.capture) {
          delete modifiers.capture;
          name = prependModifierMarker('!', name, dynamic);
      }
      if (modifiers.once) {
          delete modifiers.once;
          name = prependModifierMarker('~', name, dynamic);
      }
      if (modifiers.passive) {
          delete modifiers.passive;
          name = prependModifierMarker('&', name, dynamic);
      }
      var events;
      if (modifiers.native) {
          delete modifiers.native;
          events = el.nativeEvents || (el.nativeEvents = {});
      } else {
          events = el.events || (el.events = {});
      }
      var newHandler = rangeSetItem({
          value: value.trim(),
          dynamic: dynamic
      }, range);
      if (modifiers !== emptyObject) {
          newHandler.modifiers = modifiers;
      }
      var handlers = events[name];
      if (Array.isArray(handlers)) {
          important ? handlers.unshift(newHandler) : handlers.push(newHandler);
      } else if (handlers) {
          events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
      } else {
          events[name] = newHandler;
      }
      el.plain = false;
  }
  function getRawBindingAttr(el, name) {
      return el.rawAttrsMap[':' + name] || el.rawAttrsMap['v-bind:' + name] || el.rawAttrsMap[name]
  }
  function getBindingAttr(el, name, getStatic) {
      var dynamicValue = getAndRemoveAttr(el, ':' + name) || getAndRemoveAttr(el, 'v-bind:' + name);
      if (dynamicValue != null) {
          return parseFilters(dynamicValue)
      } else if (getStatic !== false) {
          var staticValue = getAndRemoveAttr(el, name);
          if (staticValue != null) {
              return JSON.stringify(staticValue)
          }
      }
  }
  function getAndRemoveAttr(el, name, removeFromMap) {
      var val;
      if ((val = el.attrsMap[name]) != null) {
          var list = el.attrsList;
          for (var i = 0, l = list.length; i < l; i++) {
              if (list[i].name === name) {
                  list.splice(i, 1);
                  break
              }
          }
      }
      if (removeFromMap) {
          delete el.attrsMap[name];
      }
      return val
  }
  function getAndRemoveAttrByRegex(el, name) {
      var list = el.attrsList;
      for (var i = 0, l = list.length; i < l; i++) {
          var attr = list[i];
          if (name.test(attr.name)) {
              list.splice(i, 1);
              return attr
          }
      }
  }
  function rangeSetItem(item, range) {
      if (range) {
          if (range.start != null) {
              item.start = range.start;
          }
          if (range.end != null) {
              item.end = range.end;
          }
      }
      return item
  }
  function genComponentModel(el, value, modifiers) {
      var ref = modifiers || {};
      var number = ref.number;
      var trim = ref.trim;
      var baseValueExpression = '$$v';
      var valueExpression = baseValueExpression;
      if (trim) {
          valueExpression = "(typeof " + baseValueExpression + " === 'string'" + "? " + baseValueExpression + ".trim()" + ": " + baseValueExpression + ")";
      }
      if (number) {
          valueExpression = "_n(" + valueExpression + ")";
      }
      var assignment = genAssignmentCode(value, valueExpression);
      el.model = {
          value: ("(" + value + ")"),
          expression: JSON.stringify(value),
          callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
      };
  }
  function genAssignmentCode(value, assignment) {
      var res = parseModel(value);
      if (res.key === null) {
          return ( value + "=" + assignment)
      } else {
          return ( "$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
      }
  }
  var len,
      str,
      chr,
      index$1,
      expressionPos,
      expressionEndPos;
  function parseModel(val) {
      val = val.trim();
      len = val.length;
      if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
          index$1 = val.lastIndexOf('.');
          if (index$1 > -1) {
              return {
                  exp: val.slice(0, index$1),
                  key: '"' + val.slice(index$1 + 1) + '"'
              }
          } else {
              return {
                  exp: val,
                  key: null
              }
          }
      }
      str = val;
      index$1 = expressionPos = expressionEndPos = 0;
      while (!eof()) {
          chr = next();
          if (isStringStart(chr)) {
              parseString(chr);
          } else if (chr === 0x5B) {
              parseBracket(chr);
          }
      }
      return {
          exp: val.slice(0, expressionPos),
          key: val.slice(expressionPos + 1, expressionEndPos)
      }
  }
  function next() {
      return str.charCodeAt(++index$1)
  }
  function eof() {
      return index$1 >= len
  }
  function isStringStart(chr) {
      return chr === 0x22 || chr === 0x27
  }
  function parseBracket(chr) {
      var inBracket = 1;
      expressionPos = index$1;
      while (!eof()) {
          chr = next();
          if (isStringStart(chr)) {
              parseString(chr);
              continue
          }
          if (chr === 0x5B) {
              inBracket++;
          }
          if (chr === 0x5D) {
              inBracket--;
          }
          if (inBracket === 0) {
              expressionEndPos = index$1;
              break
          }
      }
  }
  function parseString(chr) {
      var stringQuote = chr;
      while (!eof()) {
          chr = next();
          if (chr === stringQuote) {
              break
          }
      }
  }
  var warn$1;
  var RANGE_TOKEN = '__r';
  var CHECKBOX_RADIO_TOKEN = '__c';
  function model(el, dir, _warn) {
      warn$1 = _warn;
      var value = dir.value;
      var modifiers = dir.modifiers;
      var tag = el.tag;
      var type = el.attrsMap.type;
      {
          if (tag === 'input' && type === 'file') {
              warn$1("<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" + "File inputs are read only. Use a v-on:change listener instead.", el.rawAttrsMap['v-model']);
          }
      }
      if (el.component) {
          genComponentModel(el, value, modifiers);
          return false
      } else if (tag === 'select') {
          genSelect(el, value, modifiers);
      } else if (tag === 'input' && type === 'checkbox') {
          genCheckboxModel(el, value, modifiers);
      } else if (tag === 'input' && type === 'radio') {
          genRadioModel(el, value, modifiers);
      } else if (tag === 'input' || tag === 'textarea') {
          genDefaultModel(el, value, modifiers);
      } else if (!config.isReservedTag(tag)) {
          genComponentModel(el, value, modifiers);
          return false
      } else {
          warn$1("<" + (el.tag) + " v-model=\"" + value + "\">: " + "v-model is not supported on this element type. " + 'If you are working with contenteditable, it\'s recommended to ' + 'wrap a library dedicated for that purpose inside a custom component.', el.rawAttrsMap['v-model']);
      }
      return true
  }
  function genCheckboxModel(el, value, modifiers) {
      var number = modifiers && modifiers.number;
      var valueBinding = getBindingAttr(el, 'value') || 'null';
      var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
      var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
      addProp(el, 'checked', "Array.isArray(" + value + ")" + "?_i(" + value + "," + valueBinding + ")>-1" + (trueValueBinding === 'true' ? (":(" + value + ")") : (":_q(" + value + "," + trueValueBinding + ")")));
      addHandler(el, 'change', "var $$a=" + value + "," + '$$el=$event.target,' + "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" + 'if(Array.isArray($$a)){' + "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," + '$$i=_i($$a,$$v);' + "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" + "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" + "}else{" + (genAssignmentCode(value, '$$c')) + "}", null, true);
  }
  function genRadioModel(el, value, modifiers) {
      var number = modifiers && modifiers.number;
      var valueBinding = getBindingAttr(el, 'value') || 'null';
      valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
      addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
      addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
  }
  function genSelect(el, value, modifiers) {
      var number = modifiers && modifiers.number;
      var selectedVal = "Array.prototype.filter" + ".call($event.target.options,function(o){return o.selected})" + ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" + "return " + (number ? '_n(val)' : 'val') + "})";
      var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
      var code = "var $$selectedVal = " + selectedVal + ";";
      code = code + " " + (genAssignmentCode(value, assignment));
      addHandler(el, 'change', code, null, true);
  }
  function genDefaultModel(el, value, modifiers) {
      var type = el.attrsMap.type;
      {
          var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
          var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
          if (value$1 && !typeBinding) {
              var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
              warn$1(binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " + 'because the latter already expands to a value binding internally', el.rawAttrsMap[binding]);
          }
      }
      var ref = modifiers || {};
      var lazy = ref.lazy;
      var number = ref.number;
      var trim = ref.trim;
      var needCompositionGuard = !lazy && type !== 'range';
      var event = lazy ? 'change' : type === 'range' ? RANGE_TOKEN : 'input';
      var valueExpression = '$event.target.value';
      if (trim) {
          valueExpression = "$event.target.value.trim()";
      }
      if (number) {
          valueExpression = "_n(" + valueExpression + ")";
      }
      var code = genAssignmentCode(value, valueExpression);
      if (needCompositionGuard) {
          code = "if($event.target.composing)return;" + code;
      }
      addProp(el, 'value', ("(" + value + ")"));
      addHandler(el, event, code, null, true);
      if (trim || number) {
          addHandler(el, 'blur', '$forceUpdate()');
      }
  }
  function normalizeEvents(on) {
      if (isDef(on[RANGE_TOKEN])) {
          var event = isIE ? 'change' : 'input';
          on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
          delete on[RANGE_TOKEN];
      }
      if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
          on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
          delete on[CHECKBOX_RADIO_TOKEN];
      }
  }
  var target$1;
  function createOnceHandler$1(event, handler, capture) {
      var _target = target$1;
      return function onceHandler() {
          var res = handler.apply(null, arguments);
          if (res !== null) {
              remove$2(event, onceHandler, capture, _target);
          }
      }
  }
  var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
  function add$1(name, handler, capture, passive) {
      if (useMicrotaskFix) {
          var attachedTimestamp = currentFlushTimestamp;
          var original = handler;
          handler = original._wrapper = function(e) {
              if (e.target === e.currentTarget || e.timeStamp >= attachedTimestamp || e.timeStamp <= 0 || e.target.ownerDocument !== document) {
                  return original.apply(this, arguments)
              }
          };
      }
      target$1.addEventListener(name, handler, supportsPassive ? {
          capture: capture,
          passive: passive
      } : capture);
  }
  function remove$2(name, handler, capture, _target) {
      (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
  }
  function updateDOMListeners(oldVnode, vnode) {
      if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
          return
      }
      var on = vnode.data.on || {};
      var oldOn = oldVnode.data.on || {};
      target$1 = vnode.elm;
      normalizeEvents(on);
      updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
      target$1 = undefined;
  }
  var events = {
      create: updateDOMListeners,
      update: updateDOMListeners
  };
  var svgContainer;
  function updateDOMProps(oldVnode, vnode) {
      if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
          return
      }
      var key,
          cur;
      var elm = vnode.elm;
      var oldProps = oldVnode.data.domProps || {};
      var props = vnode.data.domProps || {};
      if (isDef(props.__ob__)) {
          props = vnode.data.domProps = extend({}, props);
      }
      for (key in oldProps) {
          if (!(key in props)) {
              elm[key] = '';
          }
      }
      for (key in props) {
          cur = props[key];
          if (key === 'textContent' || key === 'innerHTML') {
              if (vnode.children) {
                  vnode.children.length = 0;
              }
              if (cur === oldProps[key]) {
                  continue
              }
              if (elm.childNodes.length === 1) {
                  elm.removeChild(elm.childNodes[0]);
              }
          }
          if (key === 'value' && elm.tagName !== 'PROGRESS') {
              elm._value = cur;
              var strCur = isUndef(cur) ? '' : String(cur);
              if (shouldUpdateValue(elm, strCur)) {
                  elm.value = strCur;
              }
          } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
              svgContainer = svgContainer || document.createElement('div');
              svgContainer.innerHTML = "<svg>" + cur + "</svg>";
              var svg = svgContainer.firstChild;
              while (elm.firstChild) {
                  elm.removeChild(elm.firstChild);
              }
              while (svg.firstChild) {
                  elm.appendChild(svg.firstChild);
              }
          } else if (cur !== oldProps[key]) {
              try {
                  elm[key] = cur;
              } catch (e) {}
          }
      }
  }
  function shouldUpdateValue(elm, checkVal) {
      return ( !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal)))
  }
  function isNotInFocusAndDirty(elm, checkVal) {
      var notInFocus = true;
      try {
          notInFocus = document.activeElement !== elm;
      } catch (e) {}
      return notInFocus && elm.value !== checkVal
  }
  function isDirtyWithModifiers(elm, newVal) {
      var value = elm.value;
      var modifiers = elm._vModifiers;
      if (isDef(modifiers)) {
          if (modifiers.number) {
              return toNumber(value) !== toNumber(newVal)
          }
          if (modifiers.trim) {
              return value.trim() !== newVal.trim()
          }
      }
      return value !== newVal
  }
  var domProps = {
      create: updateDOMProps,
      update: updateDOMProps
  };
  var parseStyleText = cached(function(cssText) {
      var res = {};
      var listDelimiter = /;(?![^(]*\))/g;
      var propertyDelimiter = /:(.+)/;
      cssText.split(listDelimiter).forEach(function(item) {
          if (item) {
              var tmp = item.split(propertyDelimiter);
              tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
          }
      });
      return res
  });
  function normalizeStyleData(data) {
      var style = normalizeStyleBinding(data.style);
      return data.staticStyle ? extend(data.staticStyle, style) : style
  }
  function normalizeStyleBinding(bindingStyle) {
      if (Array.isArray(bindingStyle)) {
          return toObject(bindingStyle)
      }
      if (typeof bindingStyle === 'string') {
          return parseStyleText(bindingStyle)
      }
      return bindingStyle
  }
  function getStyle(vnode, checkChild) {
      var res = {};
      var styleData;
      if (checkChild) {
          var childNode = vnode;
          while (childNode.componentInstance) {
              childNode = childNode.componentInstance._vnode;
              if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
                  extend(res, styleData);
              }
          }
      }
      if ((styleData = normalizeStyleData(vnode.data))) {
          extend(res, styleData);
      }
      var parentNode = vnode;
      while ((parentNode = parentNode.parent)) {
          if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
              extend(res, styleData);
          }
      }
      return res
  }
  var cssVarRE = /^--/;
  var importantRE = /\s*!important$/;
  var setProp = function(el, name, val) {
      if (cssVarRE.test(name)) {
          el.style.setProperty(name, val);
      } else if (importantRE.test(val)) {
          el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
      } else {
          var normalizedName = normalize(name);
          if (Array.isArray(val)) {
              for (var i = 0, len = val.length; i < len; i++) {
                  el.style[normalizedName] = val[i];
              }
          } else {
              el.style[normalizedName] = val;
          }
      }
  };
  var vendorNames = ['Webkit', 'Moz', 'ms'];
  var emptyStyle;
  var normalize = cached(function(prop) {
      emptyStyle = emptyStyle || document.createElement('div').style;
      prop = camelize(prop);
      if (prop !== 'filter' && (prop in emptyStyle)) {
          return prop
      }
      var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
      for (var i = 0; i < vendorNames.length; i++) {
          var name = vendorNames[i] + capName;
          if (name in emptyStyle) {
              return name
          }
      }
  });
  function updateStyle(oldVnode, vnode) {
      var data = vnode.data;
      var oldData = oldVnode.data;
      if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
          return
      }
      var cur,
          name;
      var el = vnode.elm;
      var oldStaticStyle = oldData.staticStyle;
      var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
      var oldStyle = oldStaticStyle || oldStyleBinding;
      var style = normalizeStyleBinding(vnode.data.style) || {};
      vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
      var newStyle = getStyle(vnode, true);
      for (name in oldStyle) {
          if (isUndef(newStyle[name])) {
              setProp(el, name, '');
          }
      }
      for (name in newStyle) {
          cur = newStyle[name];
          if (cur !== oldStyle[name]) {
              setProp(el, name, cur == null ? '' : cur);
          }
      }
  }
  var style = {
      create: updateStyle,
      update: updateStyle
  };
  var whitespaceRE = /\s+/;
  function addClass(el, cls) {
      if (!cls || !(cls = cls.trim())) {
          return
      }
      if (el.classList) {
          if (cls.indexOf(' ') > -1) {
              cls.split(whitespaceRE).forEach(function(c) {
                  return el.classList.add(c);
              });
          } else {
              el.classList.add(cls);
          }
      } else {
          var cur = " " + (el.getAttribute('class') || '') + " ";
          if (cur.indexOf(' ' + cls + ' ') < 0) {
              el.setAttribute('class', (cur + cls).trim());
          }
      }
  }
  function removeClass(el, cls) {
      if (!cls || !(cls = cls.trim())) {
          return
      }
      if (el.classList) {
          if (cls.indexOf(' ') > -1) {
              cls.split(whitespaceRE).forEach(function(c) {
                  return el.classList.remove(c);
              });
          } else {
              el.classList.remove(cls);
          }
          if (!el.classList.length) {
              el.removeAttribute('class');
          }
      } else {
          var cur = " " + (el.getAttribute('class') || '') + " ";
          var tar = ' ' + cls + ' ';
          while (cur.indexOf(tar) >= 0) {
              cur = cur.replace(tar, ' ');
          }
          cur = cur.trim();
          if (cur) {
              el.setAttribute('class', cur);
          } else {
              el.removeAttribute('class');
          }
      }
  }
  function resolveTransition(def$$1) {
      if (!def$$1) {
          return
      }
      if (typeof def$$1 === 'object') {
          var res = {};
          if (def$$1.css !== false) {
              extend(res, autoCssTransition(def$$1.name || 'v'));
          }
          extend(res, def$$1);
          return res
      } else if (typeof def$$1 === 'string') {
          return autoCssTransition(def$$1)
      }
  }
  var autoCssTransition = cached(function(name) {
      return {
          enterClass: (name + "-enter"),
          enterToClass: (name + "-enter-to"),
          enterActiveClass: (name + "-enter-active"),
          leaveClass: (name + "-leave"),
          leaveToClass: (name + "-leave-to"),
          leaveActiveClass: (name + "-leave-active")
      }
  });
  var hasTransition = inBrowser && !isIE9;
  var TRANSITION = 'transition';
  var ANIMATION = 'animation';
  var transitionProp = 'transition';
  var transitionEndEvent = 'transitionend';
  var animationProp = 'animation';
  var animationEndEvent = 'animationend';
  if (hasTransition) {
      if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
          transitionProp = 'WebkitTransition';
          transitionEndEvent = 'webkitTransitionEnd';
      }
      if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
          animationProp = 'WebkitAnimation';
          animationEndEvent = 'webkitAnimationEnd';
      }
  }
  var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function(fn) {
      return fn();
  };
  function nextFrame(fn) {
      raf(function() {
          raf(fn);
      });
  }
  function addTransitionClass(el, cls) {
      var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
      if (transitionClasses.indexOf(cls) < 0) {
          transitionClasses.push(cls);
          addClass(el, cls);
      }
  }
  function removeTransitionClass(el, cls) {
      if (el._transitionClasses) {
          remove(el._transitionClasses, cls);
      }
      removeClass(el, cls);
  }
  function whenTransitionEnds(el, expectedType, cb) {
      var ref = getTransitionInfo(el, expectedType);
      var type = ref.type;
      var timeout = ref.timeout;
      var propCount = ref.propCount;
      if (!type) {
          return cb()
      }
      var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
      var ended = 0;
      var end = function() {
          el.removeEventListener(event, onEnd);
          cb();
      };
      var onEnd = function(e) {
          if (e.target === el) {
              if (++ended >= propCount) {
                  end();
              }
          }
      };
      setTimeout(function() {
          if (ended < propCount) {
              end();
          }
      }, timeout + 1);
      el.addEventListener(event, onEnd);
  }
  var transformRE = /\b(transform|all)(,|$)/;
  function getTransitionInfo(el, expectedType) {
      var styles = window.getComputedStyle(el);
      var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
      var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
      var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
      var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
      var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
      var animationTimeout = getTimeout(animationDelays, animationDurations);
      var type;
      var timeout = 0;
      var propCount = 0;
      if (expectedType === TRANSITION) {
          if (transitionTimeout > 0) {
              type = TRANSITION;
              timeout = transitionTimeout;
              propCount = transitionDurations.length;
          }
      } else if (expectedType === ANIMATION) {
          if (animationTimeout > 0) {
              type = ANIMATION;
              timeout = animationTimeout;
              propCount = animationDurations.length;
          }
      } else {
          timeout = Math.max(transitionTimeout, animationTimeout);
          type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
          propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
      }
      var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
      return {
          type: type,
          timeout: timeout,
          propCount: propCount,
          hasTransform: hasTransform
      }
  }
  function getTimeout(delays, durations) {
      while (delays.length < durations.length) {
          delays = delays.concat(delays);
      }
      return Math.max.apply(null, durations.map(function(d, i) {
          return toMs(d) + toMs(delays[i])
      }))
  }
  function toMs(s) {
      return Number(s.slice(0, -1).replace(',', '.')) * 1000
  }
  function enter(vnode, toggleDisplay) {
      var el = vnode.elm;
      if (isDef(el._leaveCb)) {
          el._leaveCb.cancelled = true;
          el._leaveCb();
      }
      var data = resolveTransition(vnode.data.transition);
      if (isUndef(data)) {
          return
      }
      if (isDef(el._enterCb) || el.nodeType !== 1) {
          return
      }
      var css = data.css;
      var type = data.type;
      var enterClass = data.enterClass;
      var enterToClass = data.enterToClass;
      var enterActiveClass = data.enterActiveClass;
      var appearClass = data.appearClass;
      var appearToClass = data.appearToClass;
      var appearActiveClass = data.appearActiveClass;
      var beforeEnter = data.beforeEnter;
      var enter = data.enter;
      var afterEnter = data.afterEnter;
      var enterCancelled = data.enterCancelled;
      var beforeAppear = data.beforeAppear;
      var appear = data.appear;
      var afterAppear = data.afterAppear;
      var appearCancelled = data.appearCancelled;
      var duration = data.duration;
      var context = activeInstance;
      var transitionNode = activeInstance.$vnode;
      while (transitionNode && transitionNode.parent) {
          context = transitionNode.context;
          transitionNode = transitionNode.parent;
      }
      var isAppear = !context._isMounted || !vnode.isRootInsert;
      if (isAppear && !appear && appear !== '') {
          return
      }
      var startClass = isAppear && appearClass ? appearClass : enterClass;
      var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
      var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
      var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter;
      var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter;
      var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter;
      var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled;
      var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);
      if (explicitEnterDuration != null) {
          checkDuration(explicitEnterDuration, 'enter', vnode);
      }
      var expectsCSS = css !== false && !isIE9;
      var userWantsControl = getHookArgumentsLength(enterHook);
      var cb = el._enterCb = once(function() {
          if (expectsCSS) {
              removeTransitionClass(el, toClass);
              removeTransitionClass(el, activeClass);
          }
          if (cb.cancelled) {
              if (expectsCSS) {
                  removeTransitionClass(el, startClass);
              }
              enterCancelledHook && enterCancelledHook(el);
          } else {
              afterEnterHook && afterEnterHook(el);
          }
          el._enterCb = null;
      });
      if (!vnode.data.show) {
          mergeVNodeHook(vnode, 'insert', function() {
              var parent = el.parentNode;
              var pendingNode = parent && parent._pending && parent._pending[vnode.key];
              if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
                  pendingNode.elm._leaveCb();
              }
              enterHook && enterHook(el, cb);
          });
      }
      beforeEnterHook && beforeEnterHook(el);
      if (expectsCSS) {
          addTransitionClass(el, startClass);
          addTransitionClass(el, activeClass);
          nextFrame(function() {
              removeTransitionClass(el, startClass);
              if (!cb.cancelled) {
                  addTransitionClass(el, toClass);
                  if (!userWantsControl) {
                      if (isValidDuration(explicitEnterDuration)) {
                          setTimeout(cb, explicitEnterDuration);
                      } else {
                          whenTransitionEnds(el, type, cb);
                      }
                  }
              }
          });
      }
      if (vnode.data.show) {
          toggleDisplay && toggleDisplay();
          enterHook && enterHook(el, cb);
      }
      if (!expectsCSS && !userWantsControl) {
          cb();
      }
  }
  function leave(vnode, rm) {
      var el = vnode.elm;
      if (isDef(el._enterCb)) {
          el._enterCb.cancelled = true;
          el._enterCb();
      }
      var data = resolveTransition(vnode.data.transition);
      if (isUndef(data) || el.nodeType !== 1) {
          return rm()
      }
      if (isDef(el._leaveCb)) {
          return
      }
      var css = data.css;
      var type = data.type;
      var leaveClass = data.leaveClass;
      var leaveToClass = data.leaveToClass;
      var leaveActiveClass = data.leaveActiveClass;
      var beforeLeave = data.beforeLeave;
      var leave = data.leave;
      var afterLeave = data.afterLeave;
      var leaveCancelled = data.leaveCancelled;
      var delayLeave = data.delayLeave;
      var duration = data.duration;
      var expectsCSS = css !== false && !isIE9;
      var userWantsControl = getHookArgumentsLength(leave);
      var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);
      if (isDef(explicitLeaveDuration)) {
          checkDuration(explicitLeaveDuration, 'leave', vnode);
      }
      var cb = el._leaveCb = once(function() {
          if (el.parentNode && el.parentNode._pending) {
              el.parentNode._pending[vnode.key] = null;
          }
          if (expectsCSS) {
              removeTransitionClass(el, leaveToClass);
              removeTransitionClass(el, leaveActiveClass);
          }
          if (cb.cancelled) {
              if (expectsCSS) {
                  removeTransitionClass(el, leaveClass);
              }
              leaveCancelled && leaveCancelled(el);
          } else {
              rm();
              afterLeave && afterLeave(el);
          }
          el._leaveCb = null;
      });
      if (delayLeave) {
          delayLeave(performLeave);
      } else {
          performLeave();
      }
      function performLeave() {
          if (cb.cancelled) {
              return
          }
          if (!vnode.data.show && el.parentNode) {
              (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
          }
          beforeLeave && beforeLeave(el);
          if (expectsCSS) {
              addTransitionClass(el, leaveClass);
              addTransitionClass(el, leaveActiveClass);
              nextFrame(function() {
                  removeTransitionClass(el, leaveClass);
                  if (!cb.cancelled) {
                      addTransitionClass(el, leaveToClass);
                      if (!userWantsControl) {
                          if (isValidDuration(explicitLeaveDuration)) {
                              setTimeout(cb, explicitLeaveDuration);
                          } else {
                              whenTransitionEnds(el, type, cb);
                          }
                      }
                  }
              });
          }
          leave && leave(el, cb);
          if (!expectsCSS && !userWantsControl) {
              cb();
          }
      }
  }
  function checkDuration(val, name, vnode) {
      if (typeof val !== 'number') {
          warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + (JSON.stringify(val)) + ".", vnode.context);
      } else if (isNaN(val)) {
          warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
      }
  }
  function isValidDuration(val) {
      return typeof val === 'number' && !isNaN(val)
  }
  function getHookArgumentsLength(fn) {
      if (isUndef(fn)) {
          return false
      }
      var invokerFns = fn.fns;
      if (isDef(invokerFns)) {
          return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns)
      } else {
          return (fn._length || fn.length) > 1
      }
  }
  function _enter(_, vnode) {
      if (vnode.data.show !== true) {
          enter(vnode);
      }
  }
  var transition = inBrowser ? {
      create: _enter,
      activate: _enter,
      remove: function remove$$1(vnode, rm) {
          if (vnode.data.show !== true) {
              leave(vnode, rm);
          } else {
              rm();
          }
      }
  } : {};
  var platformModules = [attrs, klass, events, domProps, style, transition];
  var modules = platformModules.concat(baseModules);
  var patch = createPatchFunction({
      nodeOps: nodeOps,
      modules: modules
  });
  if (isIE9) {
      document.addEventListener('selectionchange', function() {
          var el = document.activeElement;
          if (el && el.vmodel) {
              trigger(el, 'input');
          }
      });
  }
  var directive = {
      inserted: function inserted(el, binding, vnode, oldVnode) {
          if (vnode.tag === 'select') {
              if (oldVnode.elm && !oldVnode.elm._vOptions) {
                  mergeVNodeHook(vnode, 'postpatch', function() {
                      directive.componentUpdated(el, binding, vnode);
                  });
              } else {
                  setSelected(el, binding, vnode.context);
              }
              el._vOptions = [].map.call(el.options, getValue);
          } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
              el._vModifiers = binding.modifiers;
              if (!binding.modifiers.lazy) {
                  el.addEventListener('compositionstart', onCompositionStart);
                  el.addEventListener('compositionend', onCompositionEnd);
                  el.addEventListener('change', onCompositionEnd);
                  if (isIE9) {
                      el.vmodel = true;
                  }
              }
          }
      },
      componentUpdated: function componentUpdated(el, binding, vnode) {
          if (vnode.tag === 'select') {
              setSelected(el, binding, vnode.context);
              var prevOptions = el._vOptions;
              var curOptions = el._vOptions = [].map.call(el.options, getValue);
              if (curOptions.some(function(o, i) {
                  return !looseEqual(o, prevOptions[i]);
              })) {
                  var needReset = el.multiple ? binding.value.some(function(v) {
                      return hasNoMatchingOption(v, curOptions);
                  }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
                  if (needReset) {
                      trigger(el, 'change');
                  }
              }
          }
      }
  };
  function setSelected(el, binding, vm) {
      actuallySetSelected(el, binding, vm);
      if (isIE || isEdge) {
          setTimeout(function() {
              actuallySetSelected(el, binding, vm);
          }, 0);
      }
  }
  function actuallySetSelected(el, binding, vm) {
      var value = binding.value;
      var isMultiple = el.multiple;
      if (isMultiple && !Array.isArray(value)) {
          warn("<select multiple v-model=\"" + (binding.expression) + "\"> " + "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)), vm);
          return
      }
      var selected,
          option;
      for (var i = 0, l = el.options.length; i < l; i++) {
          option = el.options[i];
          if (isMultiple) {
              selected = looseIndexOf(value, getValue(option)) > -1;
              if (option.selected !== selected) {
                  option.selected = selected;
              }
          } else {
              if (looseEqual(getValue(option), value)) {
                  if (el.selectedIndex !== i) {
                      el.selectedIndex = i;
                  }
                  return
              }
          }
      }
      if (!isMultiple) {
          el.selectedIndex = -1;
      }
  }
  function hasNoMatchingOption(value, options) {
      return options.every(function(o) {
          return !looseEqual(o, value);
      })
  }
  function getValue(option) {
      return '_value' in option ? option._value : option.value
  }
  function onCompositionStart(e) {
      e.target.composing = true;
  }
  function onCompositionEnd(e) {
      if (!e.target.composing) {
          return
      }
      e.target.composing = false;
      trigger(e.target, 'input');
  }
  function trigger(el, type) {
      var e = document.createEvent('HTMLEvents');
      e.initEvent(type, true, true);
      el.dispatchEvent(e);
  }
  function locateNode(vnode) {
      return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode
  }
  var show = {
      bind: function bind(el, ref, vnode) {
          var value = ref.value;
          vnode = locateNode(vnode);
          var transition$$1 = vnode.data && vnode.data.transition;
          var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
          if (value && transition$$1) {
              vnode.data.show = true;
              enter(vnode, function() {
                  el.style.display = originalDisplay;
              });
          } else {
              el.style.display = value ? originalDisplay : 'none';
          }
      },
      update: function update(el, ref, vnode) {
          var value = ref.value;
          var oldValue = ref.oldValue;
          if (!value === !oldValue) {
              return
          }
          vnode = locateNode(vnode);
          var transition$$1 = vnode.data && vnode.data.transition;
          if (transition$$1) {
              vnode.data.show = true;
              if (value) {
                  enter(vnode, function() {
                      el.style.display = el.__vOriginalDisplay;
                  });
              } else {
                  leave(vnode, function() {
                      el.style.display = 'none';
                  });
              }
          } else {
              el.style.display = value ? el.__vOriginalDisplay : 'none';
          }
      },
      unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
          if (!isDestroy) {
              el.style.display = el.__vOriginalDisplay;
          }
      }
  };
  var platformDirectives = {
      model: directive,
      show: show
  };
  var transitionProps = {
      name: String,
      appear: Boolean,
      css: Boolean,
      mode: String,
      type: String,
      enterClass: String,
      leaveClass: String,
      enterToClass: String,
      leaveToClass: String,
      enterActiveClass: String,
      leaveActiveClass: String,
      appearClass: String,
      appearActiveClass: String,
      appearToClass: String,
      duration: [Number, String, Object]
  };
  function getRealChild(vnode) {
      var compOptions = vnode && vnode.componentOptions;
      if (compOptions && compOptions.Ctor.options.abstract) {
          return getRealChild(getFirstComponentChild(compOptions.children))
      } else {
          return vnode
      }
  }
  function extractTransitionData(comp) {
      var data = {};
      var options = comp.$options;
      for (var key in options.propsData) {
          data[key] = comp[key];
      }
      var listeners = options._parentListeners;
      for (var key$1 in listeners) {
          data[camelize(key$1)] = listeners[key$1];
      }
      return data
  }
  function placeholder(h, rawChild) {
      if (/\d-keep-alive$/.test(rawChild.tag)) {
          return h('keep-alive', {
              props: rawChild.componentOptions.propsData
          })
      }
  }
  function hasParentTransition(vnode) {
      while ((vnode = vnode.parent)) {
          if (vnode.data.transition) {
              return true
          }
      }
  }
  function isSameChild(child, oldChild) {
      return oldChild.key === child.key && oldChild.tag === child.tag
  }
  var isNotTextNode = function(c) {
      return c.tag || isAsyncPlaceholder(c);
  };
  var isVShowDirective = function(d) {
      return d.name === 'show';
  };
  var Transition = {
      name: 'transition',
      props: transitionProps,
      abstract: true,
      render: function render(h) {
          var this$1 = this;
          var children = this.$slots.default;
          if (!children) {
              return
          }
          children = children.filter(isNotTextNode);
          if (!children.length) {
              return
          }
          if (children.length > 1) {
              warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
          }
          var mode = this.mode;
          if (mode && mode !== 'in-out' && mode !== 'out-in') {
              warn('invalid <transition> mode: ' + mode, this.$parent);
          }
          var rawChild = children[0];
          if (hasParentTransition(this.$vnode)) {
              return rawChild
          }
          var child = getRealChild(rawChild);
          if (!child) {
              return rawChild
          }
          if (this._leaving) {
              return placeholder(h, rawChild)
          }
          var id = "__transition-" + (this._uid) + "-";
          child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key) : child.key;
          var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
          var oldRawChild = this._vnode;
          var oldChild = getRealChild(oldRawChild);
          if (child.data.directives && child.data.directives.some(isVShowDirective)) {
              child.data.show = true;
          }
          if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
              var oldData = oldChild.data.transition = extend({}, data);
              if (mode === 'out-in') {
                  this._leaving = true;
                  mergeVNodeHook(oldData, 'afterLeave', function() {
                      this$1._leaving = false;
                      this$1.$forceUpdate();
                  });
                  return placeholder(h, rawChild)
              } else if (mode === 'in-out') {
                  if (isAsyncPlaceholder(child)) {
                      return oldRawChild
                  }
                  var delayedLeave;
                  var performLeave = function() {
                      delayedLeave();
                  };
                  mergeVNodeHook(data, 'afterEnter', performLeave);
                  mergeVNodeHook(data, 'enterCancelled', performLeave);
                  mergeVNodeHook(oldData, 'delayLeave', function(leave) {
                      delayedLeave = leave;
                  });
              }
          }
          return rawChild
      }
  };
  var props = extend({
      tag: String,
      moveClass: String
  }, transitionProps);
  delete props.mode;
  var TransitionGroup = {
      props: props,
      beforeMount: function beforeMount() {
          var this$1 = this;
          var update = this._update;
          this._update = function(vnode, hydrating) {
              var restoreActiveInstance = setActiveInstance(this$1);
              this$1.__patch__(this$1._vnode, this$1.kept, false, true);
              this$1._vnode = this$1.kept;
              restoreActiveInstance();
              update.call(this$1, vnode, hydrating);
          };
      },
      render: function render(h) {
          var tag = this.tag || this.$vnode.data.tag || 'span';
          var map = Object.create(null);
          var prevChildren = this.prevChildren = this.children;
          var rawChildren = this.$slots.default || [];
          var children = this.children = [];
          var transitionData = extractTransitionData(this);
          for (var i = 0; i < rawChildren.length; i++) {
              var c = rawChildren[i];
              if (c.tag) {
                  if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
                      children.push(c);
                      map[c.key] = c;
                      (c.data || (c.data = {})).transition = transitionData;
                  } else {
                      var opts = c.componentOptions;
                      var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
                      warn(("<transition-group> children must be keyed: <" + name + ">"));
                  }
              }
          }
          if (prevChildren) {
              var kept = [];
              var removed = [];
              for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
                  var c$1 = prevChildren[i$1];
                  c$1.data.transition = transitionData;
                  c$1.data.pos = c$1.elm.getBoundingClientRect();
                  if (map[c$1.key]) {
                      kept.push(c$1);
                  } else {
                      removed.push(c$1);
                  }
              }
              this.kept = h(tag, null, kept);
              this.removed = removed;
          }
          return h(tag, null, children)
      },
      updated: function updated() {
          var children = this.prevChildren;
          var moveClass = this.moveClass || ((this.name || 'v') + '-move');
          if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
              return
          }
          children.forEach(callPendingCbs);
          children.forEach(recordPosition);
          children.forEach(applyTranslation);
          this._reflow = document.body.offsetHeight;
          children.forEach(function(c) {
              if (c.data.moved) {
                  var el = c.elm;
                  var s = el.style;
                  addTransitionClass(el, moveClass);
                  s.transform = s.WebkitTransform = s.transitionDuration = '';
                  el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
                      if (e && e.target !== el) {
                          return
                      }
                      if (!e || /transform$/.test(e.propertyName)) {
                          el.removeEventListener(transitionEndEvent, cb);
                          el._moveCb = null;
                          removeTransitionClass(el, moveClass);
                      }
                  });
              }
          });
      },
      methods: {
          hasMove: function hasMove(el, moveClass) {
              if (!hasTransition) {
                  return false
              }
              if (this._hasMove) {
                  return this._hasMove
              }
              var clone = el.cloneNode();
              if (el._transitionClasses) {
                  el._transitionClasses.forEach(function(cls) {
                      removeClass(clone, cls);
                  });
              }
              addClass(clone, moveClass);
              clone.style.display = 'none';
              this.$el.appendChild(clone);
              var info = getTransitionInfo(clone);
              this.$el.removeChild(clone);
              return ( this._hasMove = info.hasTransform)
          }
      }
  };
  function callPendingCbs(c) {
      if (c.elm._moveCb) {
          c.elm._moveCb();
      }
      if (c.elm._enterCb) {
          c.elm._enterCb();
      }
  }
  function recordPosition(c) {
      c.data.newPos = c.elm.getBoundingClientRect();
  }
  function applyTranslation(c) {
      var oldPos = c.data.pos;
      var newPos = c.data.newPos;
      var dx = oldPos.left - newPos.left;
      var dy = oldPos.top - newPos.top;
      if (dx || dy) {
          c.data.moved = true;
          var s = c.elm.style;
          s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
          s.transitionDuration = '0s';
      }
  }
  var platformComponents = {
      Transition: Transition,
      TransitionGroup: TransitionGroup
  };
  Vue.config.mustUseProp = mustUseProp;
  Vue.config.isReservedTag = isReservedTag;
  Vue.config.isReservedAttr = isReservedAttr;
  Vue.config.getTagNamespace = getTagNamespace;
  Vue.config.isUnknownElement = isUnknownElement;
  extend(Vue.options.directives, platformDirectives);
  extend(Vue.options.components, platformComponents);
  Vue.prototype.__patch__ = inBrowser ? patch : noop;
  Vue.prototype.$mount = function(el, hydrating) {
      el = el && inBrowser ? query(el) : undefined;
      return mountComponent(this, el, hydrating)
  };
  if (inBrowser) {
      setTimeout(function() {
          if (config.devtools) {
              if (devtools) {
                  devtools.emit('init', Vue);
              } else {
                  console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
              }
          }
          if (config.productionTip !== false && typeof console !== 'undefined') {
              console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
          }
      }, 0);
  }
  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
  var buildRegex = cached(function(delimiters) {
      var open = delimiters[0].replace(regexEscapeRE, '\\$&');
      var close = delimiters[1].replace(regexEscapeRE, '\\$&');
      return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
  });
  function parseText(text, delimiters) {
      var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
      if (!tagRE.test(text)) {
          return
      }
      var tokens = [];
      var rawTokens = [];
      var lastIndex = tagRE.lastIndex = 0;
      var match,
          index,
          tokenValue;
      while ((match = tagRE.exec(text))) {
          index = match.index;
          if (index > lastIndex) {
              rawTokens.push(tokenValue = text.slice(lastIndex, index));
              tokens.push(JSON.stringify(tokenValue));
          }
          var exp = parseFilters(match[1].trim());
          tokens.push(("_s(" + exp + ")"));
          rawTokens.push({
              '@binding': exp
          });
          lastIndex = index + match[0].length;
      }
      if (lastIndex < text.length) {
          rawTokens.push(tokenValue = text.slice(lastIndex));
          tokens.push(JSON.stringify(tokenValue));
      }
      return {
          expression: tokens.join('+'),
          tokens: rawTokens
      }
  }
  function transformNode(el, options) {
      var warn = options.warn || baseWarn;
      var staticClass = getAndRemoveAttr(el, 'class');
      if (staticClass) {
          var res = parseText(staticClass, options.delimiters);
          if (res) {
              warn("class=\"" + staticClass + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div class="{{ val }}">, use <div :class="val">.', el.rawAttrsMap['class']);
          }
      }
      if (staticClass) {
          el.staticClass = JSON.stringify(staticClass);
      }
      var classBinding = getBindingAttr(el, 'class', false);
      if (classBinding) {
          el.classBinding = classBinding;
      }
  }
  function genData(el) {
      var data = '';
      if (el.staticClass) {
          data += "staticClass:" + (el.staticClass) + ",";
      }
      if (el.classBinding) {
          data += "class:" + (el.classBinding) + ",";
      }
      return data
  }
  var klass$1 = {
      staticKeys: ['staticClass'],
      transformNode: transformNode,
      genData: genData
  };
  function transformNode$1(el, options) {
      var warn = options.warn || baseWarn;
      var staticStyle = getAndRemoveAttr(el, 'style');
      if (staticStyle) {
          {
              var res = parseText(staticStyle, options.delimiters);
              if (res) {
                  warn("style=\"" + staticStyle + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div style="{{ val }}">, use <div :style="val">.', el.rawAttrsMap['style']);
              }
          }
          el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
      }
      var styleBinding = getBindingAttr(el, 'style', false);
      if (styleBinding) {
          el.styleBinding = styleBinding;
      }
  }
  function genData$1(el) {
      var data = '';
      if (el.staticStyle) {
          data += "staticStyle:" + (el.staticStyle) + ",";
      }
      if (el.styleBinding) {
          data += "style:(" + (el.styleBinding) + "),";
      }
      return data
  }
  var style$1 = {
      staticKeys: ['staticStyle'],
      transformNode: transformNode$1,
      genData: genData$1
  };
  var decoder;
  var he = {
      decode: function decode(html) {
          decoder = decoder || document.createElement('div');
          decoder.innerHTML = html;
          return decoder.textContent
      }
  };
  var isUnaryTag = makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' + 'link,meta,param,source,track,wbr');
  var canBeLeftOpenTag = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');
  var isNonPhrasingTag = makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' + 'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' + 'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' + 'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' + 'title,tr,track');
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
  var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
  var startTagOpen = new RegExp(("^<" + qnameCapture));
  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
  var doctype = /^<!DOCTYPE [^>]+>/i;
  var comment = /^<!\--/;
  var conditionalComment = /^<!\[/;
  var isPlainTextElement = makeMap('script,style,textarea', true);
  var reCache = {};
  var decodingMap = {
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&amp;': '&',
      '&#10;': '\n',
      '&#9;': '\t',
      '&#39;': "'"
  };
  var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
  var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;
  var isIgnoreNewlineTag = makeMap('pre,textarea', true);
  var shouldIgnoreFirstNewline = function(tag, html) {
      return tag && isIgnoreNewlineTag(tag) && html[0] === '\n';
  };
  function decodeAttr(value, shouldDecodeNewlines) {
      var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
      return value.replace(re, function(match) {
          return decodingMap[match];
      })
  }
  function parseHTML(html, options) {
      var stack = [];
      var expectHTML = options.expectHTML;
      var isUnaryTag$$1 = options.isUnaryTag || no;
      var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
      var index = 0;
      var last,
          lastTag;
      while (html) {
          last = html;
          if (!lastTag || !isPlainTextElement(lastTag)) {
              var textEnd = html.indexOf('<');
              if (textEnd === 0) {
                  if (comment.test(html)) {
                      var commentEnd = html.indexOf('-->');
                      if (commentEnd >= 0) {
                          if (options.shouldKeepComment) {
                              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
                          }
                          advance(commentEnd + 3);
                          continue
                      }
                  }
                  if (conditionalComment.test(html)) {
                      var conditionalEnd = html.indexOf(']>');
                      if (conditionalEnd >= 0) {
                          advance(conditionalEnd + 2);
                          continue
                      }
                  }
                  var doctypeMatch = html.match(doctype);
                  if (doctypeMatch) {
                      advance(doctypeMatch[0].length);
                      continue
                  }
                  var endTagMatch = html.match(endTag);
                  if (endTagMatch) {
                      var curIndex = index;
                      advance(endTagMatch[0].length);
                      parseEndTag(endTagMatch[1], curIndex, index);
                      continue
                  }
                  var startTagMatch = parseStartTag();
                  if (startTagMatch) {
                      handleStartTag(startTagMatch);
                      if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
                          advance(1);
                      }
                      continue
                  }
              }
              var text = (void 0),
                  rest = (void 0),
                  next = (void 0);
              if (textEnd >= 0) {
                  rest = html.slice(textEnd);
                  while (!endTag.test(rest) && !startTagOpen.test(rest) && !comment.test(rest) && !conditionalComment.test(rest)) {
                      next = rest.indexOf('<', 1);
                      if (next < 0) {
                          break
                      }
                      textEnd += next;
                      rest = html.slice(textEnd);
                  }
                  text = html.substring(0, textEnd);
              }
              if (textEnd < 0) {
                  text = html;
              }
              if (text) {
                  advance(text.length);
              }
              if (options.chars && text) {
                  options.chars(text, index - text.length, index);
              }
          } else {
              var endTagLength = 0;
              var stackedTag = lastTag.toLowerCase();
              var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
              var rest$1 = html.replace(reStackedTag, function(all, text, endTag) {
                  endTagLength = endTag.length;
                  if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
                      text = text.replace(/<!\--([\s\S]*?)-->/g, '$1').replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
                  }
                  if (shouldIgnoreFirstNewline(stackedTag, text)) {
                      text = text.slice(1);
                  }
                  if (options.chars) {
                      options.chars(text);
                  }
                  return ''
              });
              index += html.length - rest$1.length;
              html = rest$1;
              parseEndTag(stackedTag, index - endTagLength, index);
          }
          if (html === last) {
              options.chars && options.chars(html);
              if (!stack.length && options.warn) {
                  options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), {
                      start: index + html.length
                  });
              }
              break
          }
      }
      parseEndTag();
      function advance(n) {
          index += n;
          html = html.substring(n);
      }
      function parseStartTag() {
          var start = html.match(startTagOpen);
          if (start) {
              var match = {
                  tagName: start[1],
                  attrs: [],
                  start: index
              };
              advance(start[0].length);
              var end,
                  attr;
              while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
                  attr.start = index;
                  advance(attr[0].length);
                  attr.end = index;
                  match.attrs.push(attr);
              }
              if (end) {
                  match.unarySlash = end[1];
                  advance(end[0].length);
                  match.end = index;
                  return match
              }
          }
      }
      function handleStartTag(match) {
          var tagName = match.tagName;
          var unarySlash = match.unarySlash;
          if (expectHTML) {
              if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
                  parseEndTag(lastTag);
              }
              if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
                  parseEndTag(tagName);
              }
          }
          var unary = isUnaryTag$$1(tagName) || !!unarySlash;
          var l = match.attrs.length;
          var attrs = new Array(l);
          for (var i = 0; i < l; i++) {
              var args = match.attrs[i];
              var value = args[3] || args[4] || args[5] || '';
              var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href' ? options.shouldDecodeNewlinesForHref : options.shouldDecodeNewlines;
              attrs[i] = {
                  name: args[1],
                  value: decodeAttr(value, shouldDecodeNewlines)
              };
              if (options.outputSourceRange) {
                  attrs[i].start = args.start + args[0].match(/^\s*/).length;
                  attrs[i].end = args.end;
              }
          }
          if (!unary) {
              stack.push({
                  tag: tagName,
                  lowerCasedTag: tagName.toLowerCase(),
                  attrs: attrs,
                  start: match.start,
                  end: match.end
              });
              lastTag = tagName;
          }
          if (options.start) {
              options.start(tagName, attrs, unary, match.start, match.end);
          }
      }
      function parseEndTag(tagName, start, end) {
          var pos,
              lowerCasedTagName;
          if (start == null) {
              start = index;
          }
          if (end == null) {
              end = index;
          }
          if (tagName) {
              lowerCasedTagName = tagName.toLowerCase();
              for (pos = stack.length - 1; pos >= 0; pos--) {
                  if (stack[pos].lowerCasedTag === lowerCasedTagName) {
                      break
                  }
              }
          } else {
              pos = 0;
          }
          if (pos >= 0) {
              for (var i = stack.length - 1; i >= pos; i--) {
                  if (i > pos || !tagName && options.warn) {
                      options.warn(("tag <" + (stack[i].tag) + "> has no matching end tag."), {
                          start: stack[i].start,
                          end: stack[i].end
                      });
                  }
                  if (options.end) {
                      options.end(stack[i].tag, start, end);
                  }
              }
              stack.length = pos;
              lastTag = pos && stack[pos - 1].tag;
          } else if (lowerCasedTagName === 'br') {
              if (options.start) {
                  options.start(tagName, [], true, start, end);
              }
          } else if (lowerCasedTagName === 'p') {
              if (options.start) {
                  options.start(tagName, [], false, start, end);
              }
              if (options.end) {
                  options.end(tagName, start, end);
              }
          }
      }
  }
  var onRE = /^@|^v-on:/;
  var dirRE = /^v-|^@|^:/;
  var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
  var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  var stripParensRE = /^\(|\)$/g;
  var dynamicArgRE = /^\[.*\]$/;
  var argRE = /:(.*)$/;
  var bindRE = /^:|^\.|^v-bind:/;
  var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;
  var slotRE = /^v-slot(:|$)|^#/;
  var lineBreakRE = /[\r\n]/;
  var whitespaceRE$1 = /\s+/g;
  var invalidAttributeRE = /[\s"'<>\/=]/;
  var decodeHTMLCached = cached(he.decode);
  var emptySlotScopeToken = "_empty_";
  var warn$2;
  var delimiters;
  var transforms;
  var preTransforms;
  var postTransforms;
  var platformIsPreTag;
  var platformMustUseProp;
  var platformGetTagNamespace;
  var maybeComponent;
  function createASTElement(tag, attrs, parent) {
      return {
          type: 1,
          tag: tag,
          attrsList: attrs,
          attrsMap: makeAttrsMap(attrs),
          rawAttrsMap: {},
          parent: parent,
          children: []
      }
  }
  function parse(template, options) {
      warn$2 = options.warn || baseWarn;
      platformIsPreTag = options.isPreTag || no;
      platformMustUseProp = options.mustUseProp || no;
      platformGetTagNamespace = options.getTagNamespace || no;
      var isReservedTag = options.isReservedTag || no;
      maybeComponent = function(el) {
          return !!el.component || !isReservedTag(el.tag);
      };
      transforms = pluckModuleFunction(options.modules, 'transformNode');
      preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
      postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
      delimiters = options.delimiters;
      var stack = [];
      var preserveWhitespace = options.preserveWhitespace !== false;
      var whitespaceOption = options.whitespace;
      var root;
      var currentParent;
      var inVPre = false;
      var inPre = false;
      var warned = false;
      function warnOnce(msg, range) {
          if (!warned) {
              warned = true;
              warn$2(msg, range);
          }
      }
      function closeElement(element) {
          trimEndingWhitespace(element);
          if (!inVPre && !element.processed) {
              element = processElement(element, options);
          }
          if (!stack.length && element !== root) {
              if (root.if && (element.elseif || element.else)) {
                  {
                      checkRootConstraints(element);
                  }
                  addIfCondition(root, {
                      exp: element.elseif,
                      block: element
                  });
              } else {
                  warnOnce("Component template should contain exactly one root element. " + "If you are using v-if on multiple elements, " + "use v-else-if to chain them instead.", {
                      start: element.start
                  });
              }
          }
          if (currentParent && !element.forbidden) {
              if (element.elseif || element.else) {
                  processIfConditions(element, currentParent);
              } else {
                  if (element.slotScope) {
                      var name = element.slotTarget || '"default"';
                      (currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
                  }
                  currentParent.children.push(element);
                  element.parent = currentParent;
              }
          }
          element.children = element.children.filter(function(c) {
              return !(c).slotScope;
          });
          trimEndingWhitespace(element);
          if (element.pre) {
              inVPre = false;
          }
          if (platformIsPreTag(element.tag)) {
              inPre = false;
          }
          for (var i = 0; i < postTransforms.length; i++) {
              postTransforms[i](element, options);
          }
      }
      function trimEndingWhitespace(el) {
          if (!inPre) {
              var lastNode;
              while ((lastNode = el.children[el.children.length - 1]) && lastNode.type === 3 && lastNode.text === ' ') {
                  el.children.pop();
              }
          }
      }
      function checkRootConstraints(el) {
          if (el.tag === 'slot' || el.tag === 'template') {
              warnOnce("Cannot use <" + (el.tag) + "> as component root element because it may " + 'contain multiple nodes.', {
                  start: el.start
              });
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
              warnOnce('Cannot use v-for on stateful component root element because ' + 'it renders multiple elements.', el.rawAttrsMap['v-for']);
          }
      }
      parseHTML(template, {
          warn: warn$2,
          expectHTML: options.expectHTML,
          isUnaryTag: options.isUnaryTag,
          canBeLeftOpenTag: options.canBeLeftOpenTag,
          shouldDecodeNewlines: options.shouldDecodeNewlines,
          shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
          shouldKeepComment: options.comments,
          outputSourceRange: options.outputSourceRange,
          start: function start(tag, attrs, unary, start$1, end) {
              var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);
              if (isIE && ns === 'svg') {
                  attrs = guardIESVGBug(attrs);
              }
              var element = createASTElement(tag, attrs, currentParent);
              if (ns) {
                  element.ns = ns;
              }
              {
                  if (options.outputSourceRange) {
                      element.start = start$1;
                      element.end = end;
                      element.rawAttrsMap = element.attrsList.reduce(function(cumulated, attr) {
                          cumulated[attr.name] = attr;
                          return cumulated
                      }, {});
                  }
                  attrs.forEach(function(attr) {
                      if (invalidAttributeRE.test(attr.name)) {
                          warn$2("Invalid dynamic argument expression: attribute names cannot contain " + "spaces, quotes, <, >, / or =.", {
                              start: attr.start + attr.name.indexOf("["),
                              end: attr.start + attr.name.length
                          });
                      }
                  });
              }
              if (isForbiddenTag(element) && !isServerRendering()) {
                  element.forbidden = true;
                  warn$2('Templates should only be responsible for mapping the state to the ' + 'UI. Avoid placing tags with side-effects in your templates, such as ' + "<" + tag + ">" + ', as they will not be parsed.', {
                      start: element.start
                  });
              }
              for (var i = 0; i < preTransforms.length; i++) {
                  element = preTransforms[i](element, options) || element;
              }
              if (!inVPre) {
                  processPre(element);
                  if (element.pre) {
                      inVPre = true;
                  }
              }
              if (platformIsPreTag(element.tag)) {
                  inPre = true;
              }
              if (inVPre) {
                  processRawAttrs(element);
              } else if (!element.processed) {
                  processFor(element);
                  processIf(element);
                  processOnce(element);
              }
              if (!root) {
                  root = element;
                  {
                      checkRootConstraints(root);
                  }
              }
              if (!unary) {
                  currentParent = element;
                  stack.push(element);
              } else {
                  closeElement(element);
              }
          },
          end: function end(tag, start, end$1) {
              var element = stack[stack.length - 1];
              stack.length -= 1;
              currentParent = stack[stack.length - 1];
              if (options.outputSourceRange) {
                  element.end = end$1;
              }
              closeElement(element);
          },
          chars: function chars(text, start, end) {
              if (!currentParent) {
                  {
                      if (text === template) {
                          warnOnce('Component template requires a root element, rather than just text.', {
                              start: start
                          });
                      } else if ((text = text.trim())) {
                          warnOnce(("text \"" + text + "\" outside root element will be ignored."), {
                              start: start
                          });
                      }
                  }
                  return
              }
              if (isIE && currentParent.tag === 'textarea' && currentParent.attrsMap.placeholder === text) {
                  return
              }
              var children = currentParent.children;
              if (inPre || text.trim()) {
                  text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
              } else if (!children.length) {
                  text = '';
              } else if (whitespaceOption) {
                  if (whitespaceOption === 'condense') {
                      text = lineBreakRE.test(text) ? '' : ' ';
                  } else {
                      text = ' ';
                  }
              } else {
                  text = preserveWhitespace ? ' ' : '';
              }
              if (text) {
                  if (!inPre && whitespaceOption === 'condense') {
                      text = text.replace(whitespaceRE$1, ' ');
                  }
                  var res;
                  var child;
                  if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
                      child = {
                          type: 2,
                          expression: res.expression,
                          tokens: res.tokens,
                          text: text
                      };
                  } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
                      child = {
                          type: 3,
                          text: text
                      };
                  }
                  if (child) {
                      if (options.outputSourceRange) {
                          child.start = start;
                          child.end = end;
                      }
                      children.push(child);
                  }
              }
          },
          comment: function comment(text, start, end) {
              if (currentParent) {
                  var child = {
                      type: 3,
                      text: text,
                      isComment: true
                  };
                  if (options.outputSourceRange) {
                      child.start = start;
                      child.end = end;
                  }
                  currentParent.children.push(child);
              }
          }
      });
      return root
  }
  function processPre(el) {
      if (getAndRemoveAttr(el, 'v-pre') != null) {
          el.pre = true;
      }
  }
  function processRawAttrs(el) {
      var list = el.attrsList;
      var len = list.length;
      if (len) {
          var attrs = el.attrs = new Array(len);
          for (var i = 0; i < len; i++) {
              attrs[i] = {
                  name: list[i].name,
                  value: JSON.stringify(list[i].value)
              };
              if (list[i].start != null) {
                  attrs[i].start = list[i].start;
                  attrs[i].end = list[i].end;
              }
          }
      } else if (!el.pre) {
          el.plain = true;
      }
  }
  function processElement(element, options) {
      processKey(element);
      element.plain = (!element.key && !element.scopedSlots && !element.attrsList.length);
      processRef(element);
      processSlotContent(element);
      processSlotOutlet(element);
      processComponent(element);
      for (var i = 0; i < transforms.length; i++) {
          element = transforms[i](element, options) || element;
      }
      processAttrs(element);
      return element
  }
  function processKey(el) {
      var exp = getBindingAttr(el, 'key');
      if (exp) {
          {
              if (el.tag === 'template') {
                  warn$2("<template> cannot be keyed. Place the key on real elements instead.", getRawBindingAttr(el, 'key'));
              }
              if (el.for) {
                  var iterator = el.iterator2 || el.iterator1;
                  var parent = el.parent;
                  if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
                      warn$2("Do not use v-for index as key on <transition-group> children, " + "this is the same as not using keys.", getRawBindingAttr(el, 'key'), true);
                  }
              }
          }
          el.key = exp;
      }
  }
  function processRef(el) {
      var ref = getBindingAttr(el, 'ref');
      if (ref) {
          el.ref = ref;
          el.refInFor = checkInFor(el);
      }
  }
  function processFor(el) {
      var exp;
      if ((exp = getAndRemoveAttr(el, 'v-for'))) {
          var res = parseFor(exp);
          if (res) {
              extend(el, res);
          } else {
              warn$2(("Invalid v-for expression: " + exp), el.rawAttrsMap['v-for']);
          }
      }
  }
  function parseFor(exp) {
      var inMatch = exp.match(forAliasRE);
      if (!inMatch) {
          return
      }
      var res = {};
      res.for = inMatch[2].trim();
      var alias = inMatch[1].trim().replace(stripParensRE, '');
      var iteratorMatch = alias.match(forIteratorRE);
      if (iteratorMatch) {
          res.alias = alias.replace(forIteratorRE, '').trim();
          res.iterator1 = iteratorMatch[1].trim();
          if (iteratorMatch[2]) {
              res.iterator2 = iteratorMatch[2].trim();
          }
      } else {
          res.alias = alias;
      }
      return res
  }
  function processIf(el) {
      var exp = getAndRemoveAttr(el, 'v-if');
      if (exp) {
          el.if = exp;
          addIfCondition(el, {
              exp: exp,
              block: el
          });
      } else {
          if (getAndRemoveAttr(el, 'v-else') != null) {
              el.else = true;
          }
          var elseif = getAndRemoveAttr(el, 'v-else-if');
          if (elseif) {
              el.elseif = elseif;
          }
      }
  }
  function processIfConditions(el, parent) {
      var prev = findPrevElement(parent.children);
      if (prev && prev.if) {
          addIfCondition(prev, {
              exp: el.elseif,
              block: el
          });
      } else {
          warn$2("v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " + "used on element <" + (el.tag) + "> without corresponding v-if.", el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']);
      }
  }
  function findPrevElement(children) {
      var i = children.length;
      while (i--) {
          if (children[i].type === 1) {
              return children[i]
          } else {
              if (children[i].text !== ' ') {
                  warn$2("text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " + "will be ignored.", children[i]);
              }
              children.pop();
          }
      }
  }
  function addIfCondition(el, condition) {
      if (!el.ifConditions) {
          el.ifConditions = [];
      }
      el.ifConditions.push(condition);
  }
  function processOnce(el) {
      var once$$1 = getAndRemoveAttr(el, 'v-once');
      if (once$$1 != null) {
          el.once = true;
      }
  }
  function processSlotContent(el) {
      var slotScope;
      if (el.tag === 'template') {
          slotScope = getAndRemoveAttr(el, 'scope');
          if (slotScope) {
              warn$2("the \"scope\" attribute for scoped slots have been deprecated and " + "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " + "can also be used on plain elements in addition to <template> to " + "denote scoped slots.", el.rawAttrsMap['scope'], true);
          }
          el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
      } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
          if (el.attrsMap['v-for']) {
              warn$2("Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " + "(v-for takes higher priority). Use a wrapper <template> for the " + "scoped slot to make it clearer.", el.rawAttrsMap['slot-scope'], true);
          }
          el.slotScope = slotScope;
      }
      var slotTarget = getBindingAttr(el, 'slot');
      if (slotTarget) {
          el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
          el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
          if (el.tag !== 'template' && !el.slotScope) {
              addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
          }
      }
      {
          if (el.tag === 'template') {
              var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
              if (slotBinding) {
                  {
                      if (el.slotTarget || el.slotScope) {
                          warn$2("Unexpected mixed usage of different slot syntaxes.", el);
                      }
                      if (el.parent && !maybeComponent(el.parent)) {
                          warn$2("<template v-slot> can only appear at the root level inside " + "the receiving the component", el);
                      }
                  }
                  var ref = getSlotName(slotBinding);
                  var name = ref.name;
                  var dynamic = ref.dynamic;
                  el.slotTarget = name;
                  el.slotTargetDynamic = dynamic;
                  el.slotScope = slotBinding.value || emptySlotScopeToken;
              }
          } else {
              var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
              if (slotBinding$1) {
                  {
                      if (!maybeComponent(el)) {
                          warn$2("v-slot can only be used on components or <template>.", slotBinding$1);
                      }
                      if (el.slotScope || el.slotTarget) {
                          warn$2("Unexpected mixed usage of different slot syntaxes.", el);
                      }
                      if (el.scopedSlots) {
                          warn$2("To avoid scope ambiguity, the default slot should also use " + "<template> syntax when there are other named slots.", slotBinding$1);
                      }
                  }
                  var slots = el.scopedSlots || (el.scopedSlots = {});
                  var ref$1 = getSlotName(slotBinding$1);
                  var name$1 = ref$1.name;
                  var dynamic$1 = ref$1.dynamic;
                  var slotContainer = slots[name$1] = createASTElement('template', [], el);
                  slotContainer.slotTarget = name$1;
                  slotContainer.slotTargetDynamic = dynamic$1;
                  slotContainer.children = el.children.filter(function(c) {
                      if (!c.slotScope) {
                          c.parent = slotContainer;
                          return true
                      }
                  });
                  slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
                  el.children = [];
                  el.plain = false;
              }
          }
      }
  }
  function getSlotName(binding) {
      var name = binding.name.replace(slotRE, '');
      if (!name) {
          if (binding.name[0] !== '#') {
              name = 'default';
          } else {
              warn$2("v-slot shorthand syntax requires a slot name.", binding);
          }
      }
      return dynamicArgRE.test(name) ? {
          name: name.slice(1, -1),
          dynamic: true
      } : {
          name: ("\"" + name + "\""),
          dynamic: false
      }
  }
  function processSlotOutlet(el) {
      if (el.tag === 'slot') {
          el.slotName = getBindingAttr(el, 'name');
          if (el.key) {
              warn$2("`key` does not work on <slot> because slots are abstract outlets " + "and can possibly expand into multiple elements. " + "Use the key on a wrapping element instead.", getRawBindingAttr(el, 'key'));
          }
      }
  }
  function processComponent(el) {
      var binding;
      if ((binding = getBindingAttr(el, 'is'))) {
          el.component = binding;
      }
      if (getAndRemoveAttr(el, 'inline-template') != null) {
          el.inlineTemplate = true;
      }
  }
  function processAttrs(el) {
      var list = el.attrsList;
      var i,
          l,
          name,
          rawName,
          value,
          modifiers,
          syncGen,
          isDynamic;
      for (i = 0, l = list.length; i < l; i++) {
          name = rawName = list[i].name;
          value = list[i].value;
          if (dirRE.test(name)) {
              el.hasBindings = true;
              modifiers = parseModifiers(name.replace(dirRE, ''));
              if (modifiers) {
                  name = name.replace(modifierRE, '');
              }
              if (bindRE.test(name)) {
                  name = name.replace(bindRE, '');
                  value = parseFilters(value);
                  isDynamic = dynamicArgRE.test(name);
                  if (isDynamic) {
                      name = name.slice(1, -1);
                  }
                  if (value.trim().length === 0) {
                      warn$2(("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\""));
                  }
                  if (modifiers) {
                      if (modifiers.prop && !isDynamic) {
                          name = camelize(name);
                          if (name === 'innerHtml') {
                              name = 'innerHTML';
                          }
                      }
                      if (modifiers.camel && !isDynamic) {
                          name = camelize(name);
                      }
                      if (modifiers.sync) {
                          syncGen = genAssignmentCode(value, "$event");
                          if (!isDynamic) {
                              addHandler(el, ("update:" + (camelize(name))), syncGen, null, false, warn$2, list[i]);
                              if (hyphenate(name) !== camelize(name)) {
                                  addHandler(el, ("update:" + (hyphenate(name))), syncGen, null, false, warn$2, list[i]);
                              }
                          } else {
                              addHandler(el, ("\"update:\"+(" + name + ")"), syncGen, null, false, warn$2, list[i], true);
                          }
                      }
                  }
                  if ((modifiers && modifiers.prop) || (!el.component && platformMustUseProp(el.tag, el.attrsMap.type, name))) {
                      addProp(el, name, value, list[i], isDynamic);
                  } else {
                      addAttr(el, name, value, list[i], isDynamic);
                  }
              } else if (onRE.test(name)) {
                  name = name.replace(onRE, '');
                  isDynamic = dynamicArgRE.test(name);
                  if (isDynamic) {
                      name = name.slice(1, -1);
                  }
                  addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
              } else {
                  name = name.replace(dirRE, '');
                  var argMatch = name.match(argRE);
                  var arg = argMatch && argMatch[1];
                  isDynamic = false;
                  if (arg) {
                      name = name.slice(0, -(arg.length + 1));
                      if (dynamicArgRE.test(arg)) {
                          arg = arg.slice(1, -1);
                          isDynamic = true;
                      }
                  }
                  addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
                  if (name === 'model') {
                      checkForAliasModel(el, value);
                  }
              }
          } else {
              {
                  var res = parseText(value, delimiters);
                  if (res) {
                      warn$2(name + "=\"" + value + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div id="{{ val }}">, use <div :id="val">.', list[i]);
                  }
              }
              addAttr(el, name, JSON.stringify(value), list[i]);
              if (!el.component && name === 'muted' && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
                  addProp(el, name, 'true', list[i]);
              }
          }
      }
  }
  function checkInFor(el) {
      var parent = el;
      while (parent) {
          if (parent.for !== undefined) {
              return true
          }
          parent = parent.parent;
      }
      return false
  }
  function parseModifiers(name) {
      var match = name.match(modifierRE);
      if (match) {
          var ret = {};
          match.forEach(function(m) {
              ret[m.slice(1)] = true;
          });
          return ret
      }
  }
  function makeAttrsMap(attrs) {
      var map = {};
      for (var i = 0, l = attrs.length; i < l; i++) {
          if (map[attrs[i].name] && !isIE && !isEdge) {
              warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
          }
          map[attrs[i].name] = attrs[i].value;
      }
      return map
  }
  function isTextTag(el) {
      return el.tag === 'script' || el.tag === 'style'
  }
  function isForbiddenTag(el) {
      return ( el.tag === 'style' || (el.tag === 'script' && (!el.attrsMap.type || el.attrsMap.type === 'text/javascript')))
  }
  var ieNSBug = /^xmlns:NS\d+/;
  var ieNSPrefix = /^NS\d+:/;
  function guardIESVGBug(attrs) {
      var res = [];
      for (var i = 0; i < attrs.length; i++) {
          var attr = attrs[i];
          if (!ieNSBug.test(attr.name)) {
              attr.name = attr.name.replace(ieNSPrefix, '');
              res.push(attr);
          }
      }
      return res
  }
  function checkForAliasModel(el, value) {
      var _el = el;
      while (_el) {
          if (_el.for && _el.alias === value) {
              warn$2("<" + (el.tag) + " v-model=\"" + value + "\">: " + "You are binding v-model directly to a v-for iteration alias. " + "This will not be able to modify the v-for source array because " + "writing to the alias is like modifying a function local variable. " + "Consider using an array of objects and use v-model on an object property instead.", el.rawAttrsMap['v-model']);
          }
          _el = _el.parent;
      }
  }
  function preTransformNode(el, options) {
      if (el.tag === 'input') {
          var map = el.attrsMap;
          if (!map['v-model']) {
              return
          }
          var typeBinding;
          if (map[':type'] || map['v-bind:type']) {
              typeBinding = getBindingAttr(el, 'type');
          }
          if (!map.type && !typeBinding && map['v-bind']) {
              typeBinding = "(" + (map['v-bind']) + ").type";
          }
          if (typeBinding) {
              var ifCondition = getAndRemoveAttr(el, 'v-if', true);
              var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
              var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
              var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
              var branch0 = cloneASTElement(el);
              processFor(branch0);
              addRawAttr(branch0, 'type', 'checkbox');
              processElement(branch0, options);
              branch0.processed = true;
              branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
              addIfCondition(branch0, {
                  exp: branch0.if,
                  block: branch0
              });
              var branch1 = cloneASTElement(el);
              getAndRemoveAttr(branch1, 'v-for', true);
              addRawAttr(branch1, 'type', 'radio');
              processElement(branch1, options);
              addIfCondition(branch0, {
                  exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
                  block: branch1
              });
              var branch2 = cloneASTElement(el);
              getAndRemoveAttr(branch2, 'v-for', true);
              addRawAttr(branch2, ':type', typeBinding);
              processElement(branch2, options);
              addIfCondition(branch0, {
                  exp: ifCondition,
                  block: branch2
              });
              if (hasElse) {
                  branch0.else = true;
              } else if (elseIfCondition) {
                  branch0.elseif = elseIfCondition;
              }
              return branch0
          }
      }
  }
  function cloneASTElement(el) {
      return createASTElement(el.tag, el.attrsList.slice(), el.parent)
  }
  var model$1 = {
      preTransformNode: preTransformNode
  };
  var modules$1 = [klass$1, style$1, model$1];
  function text(el, dir) {
      if (dir.value) {
          addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
      }
  }
  function html(el, dir) {
      if (dir.value) {
          addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
      }
  }
  var directives$1 = {
      model: model,
      text: text,
      html: html
  };
  var baseOptions = {
      expectHTML: true,
      modules: modules$1,
      directives: directives$1,
      isPreTag: isPreTag,
      isUnaryTag: isUnaryTag,
      mustUseProp: mustUseProp,
      canBeLeftOpenTag: canBeLeftOpenTag,
      isReservedTag: isReservedTag,
      getTagNamespace: getTagNamespace,
      staticKeys: genStaticKeys(modules$1)
  };
  var isStaticKey;
  var isPlatformReservedTag;
  var genStaticKeysCached = cached(genStaticKeys$1);
  function optimize(root, options) {
      if (!root) {
          return
      }
      isStaticKey = genStaticKeysCached(options.staticKeys || '');
      isPlatformReservedTag = options.isReservedTag || no;
      markStatic$1(root);
      markStaticRoots(root, false);
  }
  function genStaticKeys$1(keys) {
      return makeMap('type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
      (keys ? ',' + keys : ''))
  }
  function markStatic$1(node) {
      node.static = isStatic(node);
      if (node.type === 1) {
          if (!isPlatformReservedTag(node.tag) && node.tag !== 'slot' && node.attrsMap['inline-template'] == null) {
              return
          }
          for (var i = 0, l = node.children.length; i < l; i++) {
              var child = node.children[i];
              markStatic$1(child);
              if (!child.static) {
                  node.static = false;
              }
          }
          if (node.ifConditions) {
              for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
                  var block = node.ifConditions[i$1].block;
                  markStatic$1(block);
                  if (!block.static) {
                      node.static = false;
                  }
              }
          }
      }
  }
  function markStaticRoots(node, isInFor) {
      if (node.type === 1) {
          if (node.static || node.once) {
              node.staticInFor = isInFor;
          }
          if (node.static && node.children.length && !(node.children.length === 1 && node.children[0].type === 3)) {
              node.staticRoot = true;
              return
          } else {
              node.staticRoot = false;
          }
          if (node.children) {
              for (var i = 0, l = node.children.length; i < l; i++) {
                  markStaticRoots(node.children[i], isInFor || !!node.for);
              }
          }
          if (node.ifConditions) {
              for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
                  markStaticRoots(node.ifConditions[i$1].block, isInFor);
              }
          }
      }
  }
  function isStatic(node) {
      if (node.type === 2) {
          return false
      }
      if (node.type === 3) {
          return true
      }
      return !!(node.pre || (!node.hasBindings && !node.if && !node.for && !isBuiltInTag(node.tag) && isPlatformReservedTag(node.tag) && !isDirectChildOfTemplateFor(node) && Object.keys(node).every(isStaticKey)))
  }
  function isDirectChildOfTemplateFor(node) {
      while (node.parent) {
          node = node.parent;
          if (node.tag !== 'template') {
              return false
          }
          if (node.for) {
              return true
          }
      }
      return false
  }
  var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*(?:[\w$]+)?\s*\(/;
  var fnInvokeRE = /\([^)]*?\);*$/;
  var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;
  var keyCodes = {
      esc: 27,
      tab: 9,
      enter: 13,
      space: 32,
      up: 38,
      left: 37,
      right: 39,
      down: 40,
      'delete': [8, 46]
  };
  var keyNames = {
      esc: ['Esc', 'Escape'],
      tab: 'Tab',
      enter: 'Enter',
      space: [' ', 'Spacebar'],
      up: ['Up', 'ArrowUp'],
      left: ['Left', 'ArrowLeft'],
      right: ['Right', 'ArrowRight'],
      down: ['Down', 'ArrowDown'],
      'delete': ['Backspace', 'Delete', 'Del']
  };
  var genGuard = function(condition) {
      return ( "if(" + condition + ")return null;") ;
  };
  var modifierCode = {
      stop: '$event.stopPropagation();',
      prevent: '$event.preventDefault();',
      self: genGuard("$event.target !== $event.currentTarget"),
      ctrl: genGuard("!$event.ctrlKey"),
      shift: genGuard("!$event.shiftKey"),
      alt: genGuard("!$event.altKey"),
      meta: genGuard("!$event.metaKey"),
      left: genGuard("'button' in $event && $event.button !== 0"),
      middle: genGuard("'button' in $event && $event.button !== 1"),
      right: genGuard("'button' in $event && $event.button !== 2")
  };
  function genHandlers(events, isNative) {
      var prefix = isNative ? 'nativeOn:' : 'on:';
      var staticHandlers = "";
      var dynamicHandlers = "";
      for (var name in events) {
          var handlerCode = genHandler(events[name]);
          if (events[name] && events[name].dynamic) {
              dynamicHandlers += name + "," + handlerCode + ",";
          } else {
              staticHandlers += "\"" + name + "\":" + handlerCode + ",";
          }
      }
      staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
      if (dynamicHandlers) {
          return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
      } else {
          return prefix + staticHandlers
      }
  }
  function genHandler(handler) {
      if (!handler) {
          return 'function(){}'
      }
      if (Array.isArray(handler)) {
          return ( "[" + (handler.map(function(handler) {
              return genHandler(handler);
          }).join(',')) + "]")
      }
      var isMethodPath = simplePathRE.test(handler.value);
      var isFunctionExpression = fnExpRE.test(handler.value);
      var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));
      if (!handler.modifiers) {
          if (isMethodPath || isFunctionExpression) {
              return handler.value
          }
          return ( "function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}")
      } else {
          var code = '';
          var genModifierCode = '';
          var keys = [];
          for (var key in handler.modifiers) {
              if (modifierCode[key]) {
                  genModifierCode += modifierCode[key];
                  if (keyCodes[key]) {
                      keys.push(key);
                  }
              } else if (key === 'exact') {
                  var modifiers = (handler.modifiers);
                  genModifierCode += genGuard(['ctrl', 'shift', 'alt', 'meta'].filter(function(keyModifier) {
                      return !modifiers[keyModifier];
                  }).map(function(keyModifier) {
                      return ( "$event." + keyModifier + "Key") ;
                  }).join('||'));
              } else {
                  keys.push(key);
              }
          }
          if (keys.length) {
              code += genKeyFilter(keys);
          }
          if (genModifierCode) {
              code += genModifierCode;
          }
          var handlerCode = isMethodPath ? ("return " + (handler.value) + "($event)") : isFunctionExpression ? ("return (" + (handler.value) + ")($event)") : isFunctionInvocation ? ("return " + (handler.value)) : handler.value;
          return ( "function($event){" + code + handlerCode + "}")
      }
  }
  function genKeyFilter(keys) {
      return ( "if(!$event.type.indexOf('key')&&" +
      (keys.map(genFilterCode).join('&&')) + ")return null;")
  }
  function genFilterCode(key) {
      var keyVal = parseInt(key, 10);
      if (keyVal) {
          return ( "$event.keyCode!==" + keyVal)
      }
      var keyCode = keyCodes[key];
      var keyName = keyNames[key];
      return ( "_k($event.keyCode," +
      (JSON.stringify(key)) + "," +
      (JSON.stringify(keyCode)) + "," + "$event.key," + "" + (JSON.stringify(keyName)) + ")")
  }
  function on(el, dir) {
      if (dir.modifiers) {
          warn("v-on without argument does not support modifiers.");
      }
      el.wrapListeners = function(code) {
          return ( "_g(" + code + "," + (dir.value) + ")") ;
      };
  }
  function bind$1(el, dir) {
      el.wrapData = function(code) {
          return ( "_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
      };
  }
  var baseDirectives = {
      on: on,
      bind: bind$1,
      cloak: noop
  };
  var CodegenState = function CodegenState(options) {
      this.options = options;
      this.warn = options.warn || baseWarn;
      this.transforms = pluckModuleFunction(options.modules, 'transformCode');
      this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
      this.directives = extend(extend({}, baseDirectives), options.directives);
      var isReservedTag = options.isReservedTag || no;
      this.maybeComponent = function(el) {
          return !!el.component || !isReservedTag(el.tag);
      };
      this.onceId = 0;
      this.staticRenderFns = [];
      this.pre = false;
  };
  function generate(ast, options) {
      var state = new CodegenState(options);
      var code = ast ? genElement(ast, state) : '_c("div")';
      return {
          render: ("with(this){return " + code + "}"),
          staticRenderFns: state.staticRenderFns
      }
  }
  function genElement(el, state) {
      if (el.parent) {
          el.pre = el.pre || el.parent.pre;
      }
      if (el.staticRoot && !el.staticProcessed) {
          return genStatic(el, state)
      } else if (el.once && !el.onceProcessed) {
          return genOnce(el, state)
      } else if (el.for && !el.forProcessed) {
          return genFor(el, state)
      } else if (el.if && !el.ifProcessed) {
          return genIf(el, state)
      } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
          return genChildren(el, state) || 'void 0'
      } else if (el.tag === 'slot') {
          return genSlot(el, state)
      } else {
          var code;
          if (el.component) {
              code = genComponent(el.component, el, state);
          } else {
              var data;
              if (!el.plain || (el.pre && state.maybeComponent(el))) {
                  data = genData$2(el, state);
              }
              var children = el.inlineTemplate ? null : genChildren(el, state, true);
              code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
          }
          for (var i = 0; i < state.transforms.length; i++) {
              code = state.transforms[i](el, code);
          }
          return code
      }
  }
  function genStatic(el, state) {
      el.staticProcessed = true;
      var originalPreState = state.pre;
      if (el.pre) {
          state.pre = el.pre;
      }
      state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
      state.pre = originalPreState;
      return ( "_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
  }
  function genOnce(el, state) {
      el.onceProcessed = true;
      if (el.if && !el.ifProcessed) {
          return genIf(el, state)
      } else if (el.staticInFor) {
          var key = '';
          var parent = el.parent;
          while (parent) {
              if (parent.for) {
                  key = parent.key;
                  break
              }
              parent = parent.parent;
          }
          if (!key) {
              state.warn("v-once can only be used inside v-for that is keyed. ", el.rawAttrsMap['v-once']);
              return genElement(el, state)
          }
          return ( "_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
      } else {
          return genStatic(el, state)
      }
  }
  function genIf(el, state, altGen, altEmpty) {
      el.ifProcessed = true;
      return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
  }
  function genIfConditions(conditions, state, altGen, altEmpty) {
      if (!conditions.length) {
          return altEmpty || '_e()'
      }
      var condition = conditions.shift();
      if (condition.exp) {
          return ( "(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
      } else {
          return ( "" + (genTernaryExp(condition.block)))
      }
      function genTernaryExp(el) {
          return altGen ? altGen(el, state) : el.once ? genOnce(el, state) : genElement(el, state)
      }
  }
  function genFor(el, state, altGen, altHelper) {
      var exp = el.for;
      var alias = el.alias;
      var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
      var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
      if (state.maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key) {
          state.warn("<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " + "v-for should have explicit keys. " + "See https://vuejs.org/guide/list.html#key for more info.", el.rawAttrsMap['v-for'], true);
      }
      el.forProcessed = true;
      return (altHelper || '_l') + "((" + exp + ")," + "function(" + alias + iterator1 + iterator2 + "){" + "return " + ((altGen || genElement)(el, state)) + '})'
  }
  function genData$2(el, state) {
      var data = '{';
      var dirs = genDirectives(el, state);
      if (dirs) {
          data += dirs + ',';
      }
      if (el.key) {
          data += "key:" + (el.key) + ",";
      }
      if (el.ref) {
          data += "ref:" + (el.ref) + ",";
      }
      if (el.refInFor) {
          data += "refInFor:true,";
      }
      if (el.pre) {
          data += "pre:true,";
      }
      if (el.component) {
          data += "tag:\"" + (el.tag) + "\",";
      }
      for (var i = 0; i < state.dataGenFns.length; i++) {
          data += state.dataGenFns[i](el);
      }
      if (el.attrs) {
          data += "attrs:" + (genProps(el.attrs)) + ",";
      }
      if (el.props) {
          data += "domProps:" + (genProps(el.props)) + ",";
      }
      if (el.events) {
          data += (genHandlers(el.events, false)) + ",";
      }
      if (el.nativeEvents) {
          data += (genHandlers(el.nativeEvents, true)) + ",";
      }
      if (el.slotTarget && !el.slotScope) {
          data += "slot:" + (el.slotTarget) + ",";
      }
      if (el.scopedSlots) {
          data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
      }
      if (el.model) {
          data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
      }
      if (el.inlineTemplate) {
          var inlineTemplate = genInlineTemplate(el, state);
          if (inlineTemplate) {
              data += inlineTemplate + ",";
          }
      }
      data = data.replace(/,$/, '') + '}';
      if (el.dynamicAttrs) {
          data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
      }
      if (el.wrapData) {
          data = el.wrapData(data);
      }
      if (el.wrapListeners) {
          data = el.wrapListeners(data);
      }
      return data
  }
  function genDirectives(el, state) {
      var dirs = el.directives;
      if (!dirs) {
          return
      }
      var res = 'directives:[';
      var hasRuntime = false;
      var i,
          l,
          dir,
          needRuntime;
      for (i = 0, l = dirs.length; i < l; i++) {
          dir = dirs[i];
          needRuntime = true;
          var gen = state.directives[dir.name];
          if (gen) {
              needRuntime = !!gen(el, dir, state.warn);
          }
          if (needRuntime) {
              hasRuntime = true;
              res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
          }
      }
      if (hasRuntime) {
          return res.slice(0, -1) + ']'
      }
  }
  function genInlineTemplate(el, state) {
      var ast = el.children[0];
      if (el.children.length !== 1 || ast.type !== 1) {
          state.warn('Inline-template components must have exactly one child element.', {
              start: el.start
          });
      }
      if (ast && ast.type === 1) {
          var inlineRenderFns = generate(ast, state.options);
          return ( "inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function(code) {
              return ( "function(){" + code + "}") ;
          }).join(',')) + "]}")
      }
  }
  function genScopedSlots(el, slots, state) {
      var needsForceUpdate = el.for || Object.keys(slots).some(function(key) {
          var slot = slots[key];
          return ( slot.slotTargetDynamic || slot.if || slot.for || containsSlotChild(slot))
      });
      var needsKey = !!el.if;
      if (!needsForceUpdate) {
          var parent = el.parent;
          while (parent) {
              if ((parent.slotScope && parent.slotScope !== emptySlotScopeToken) || parent.for) {
                  needsForceUpdate = true;
                  break
              }
              if (parent.if) {
                  needsKey = true;
              }
              parent = parent.parent;
          }
      }
      var generatedSlots = Object.keys(slots).map(function(key) {
          return genScopedSlot(slots[key], state);
      }).join(',');
      return ( "scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
  }
  function hash(str) {
      var hash = 5381;
      var i = str.length;
      while (i) {
          hash = (hash * 33) ^ str.charCodeAt(--i);
      }
      return hash >>> 0
  }
  function containsSlotChild(el) {
      if (el.type === 1) {
          if (el.tag === 'slot') {
              return true
          }
          return el.children.some(containsSlotChild)
      }
      return false
  }
  function genScopedSlot(el, state) {
      var isLegacySyntax = el.attrsMap['slot-scope'];
      if (el.if && !el.ifProcessed && !isLegacySyntax) {
          return genIf(el, state, genScopedSlot, "null")
      }
      if (el.for && !el.forProcessed) {
          return genFor(el, state, genScopedSlot)
      }
      var slotScope = el.slotScope === emptySlotScopeToken ? "" : String(el.slotScope);
      var fn = "function(" + slotScope + "){" + "return " + (el.tag === 'template' ? el.if && isLegacySyntax ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined") : genChildren(el, state) || 'undefined' : genElement(el, state)) + "}";
      var reverseProxy = slotScope ? "" : ",proxy:true";
      return ( "{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
  }
  function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
      var children = el.children;
      if (children.length) {
          var el$1 = children[0];
          if (children.length === 1 && el$1.for && el$1.tag !== 'template' && el$1.tag !== 'slot') {
              var normalizationType = checkSkip ? state.maybeComponent(el$1) ? ",1" : ",0" : "";
              return ( "" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
          }
          var normalizationType$1 = checkSkip ? getNormalizationType(children, state.maybeComponent) : 0;
          var gen = altGenNode || genNode;
          return ( "[" + (children.map(function(c) {
              return gen(c, state);
          }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
      }
  }
  function getNormalizationType(children, maybeComponent) {
      var res = 0;
      for (var i = 0; i < children.length; i++) {
          var el = children[i];
          if (el.type !== 1) {
              continue
          }
          if (needsNormalization(el) || (el.ifConditions && el.ifConditions.some(function(c) {
              return needsNormalization(c.block);
          }))) {
              res = 2;
              break
          }
          if (maybeComponent(el) || (el.ifConditions && el.ifConditions.some(function(c) {
              return maybeComponent(c.block);
          }))) {
              res = 1;
          }
      }
      return res
  }
  function needsNormalization(el) {
      return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
  }
  function genNode(node, state) {
      if (node.type === 1) {
          return genElement(node, state)
      } else if (node.type === 3 && node.isComment) {
          return genComment(node)
      } else {
          return genText(node)
      }
  }
  function genText(text) {
      return ( "_v(" + (text.type === 2 ? text.expression : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
  }
  function genComment(comment) {
      return ( "_e(" + (JSON.stringify(comment.text)) + ")")
  }
  function genSlot(el, state) {
      var slotName = el.slotName || '"default"';
      var children = genChildren(el, state);
      var res = "_t(" + slotName + (children ? ("," + children) : '');
      var attrs = el.attrs || el.dynamicAttrs ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function(attr) {
          return ( {
              name: camelize(attr.name),
              value: attr.value,
              dynamic: attr.dynamic
          }) ;
      })) : null;
      var bind$$1 = el.attrsMap['v-bind'];
      if ((attrs || bind$$1) && !children) {
          res += ",null";
      }
      if (attrs) {
          res += "," + attrs;
      }
      if (bind$$1) {
          res += (attrs ? '' : ',null') + "," + bind$$1;
      }
      return res + ')'
  }
  function genComponent(componentName, el, state) {
      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      return ( "_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
  }
  function genProps(props) {
      var staticProps = "";
      var dynamicProps = "";
      for (var i = 0; i < props.length; i++) {
          var prop = props[i];
          var value = transformSpecialNewlines(prop.value);
          if (prop.dynamic) {
              dynamicProps += (prop.name) + "," + value + ",";
          } else {
              staticProps += "\"" + (prop.name) + "\":" + value + ",";
          }
      }
      staticProps = "{" + (staticProps.slice(0, -1)) + "}";
      if (dynamicProps) {
          return ( "_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
      } else {
          return staticProps
      }
  }
  function transformSpecialNewlines(text) {
      return text.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
  }
  var prohibitedKeywordRE = new RegExp('\\b' + ('do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' + 'super,throw,while,yield,delete,export,import,return,switch,default,' + 'extends,finally,continue,debugger,function,arguments').split(',').join('\\b|\\b') + '\\b');
  var unaryOperatorsRE = new RegExp('\\b' + ('delete,typeof,void').split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');
  var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
  function detectErrors(ast, warn) {
      if (ast) {
          checkNode(ast, warn);
      }
  }
  function checkNode(node, warn) {
      if (node.type === 1) {
          for (var name in node.attrsMap) {
              if (dirRE.test(name)) {
                  var value = node.attrsMap[name];
                  if (value) {
                      var range = node.rawAttrsMap[name];
                      if (name === 'v-for') {
                          checkFor(node, ("v-for=\"" + value + "\""), warn, range);
                      } else if (onRE.test(name)) {
                          checkEvent(value, (name + "=\"" + value + "\""), warn, range);
                      } else {
                          checkExpression(value, (name + "=\"" + value + "\""), warn, range);
                      }
                  }
              }
          }
          if (node.children) {
              for (var i = 0; i < node.children.length; i++) {
                  checkNode(node.children[i], warn);
              }
          }
      } else if (node.type === 2) {
          checkExpression(node.expression, node.text, warn, node);
      }
  }
  function checkEvent(exp, text, warn, range) {
      var stipped = exp.replace(stripStringRE, '');
      var keywordMatch = stipped.match(unaryOperatorsRE);
      if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
          warn("avoid using JavaScript unary operator as property name: " + "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()), range);
      }
      checkExpression(exp, text, warn, range);
  }
  function checkFor(node, text, warn, range) {
      checkExpression(node.for || '', text, warn, range);
      checkIdentifier(node.alias, 'v-for alias', text, warn, range);
      checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
      checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
  }
  function checkIdentifier(ident, type, text, warn, range) {
      if (typeof ident === 'string') {
          try {
              new Function(("var " + ident + "=_"));
          } catch (e) {
              warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
          }
      }
  }
  function checkExpression(exp, text, warn, range) {
      try {
          new Function(("return " + exp));
      } catch (e) {
          var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
          if (keywordMatch) {
              warn("avoid using JavaScript keyword as property name: " + "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()), range);
          } else {
              warn("invalid expression: " + (e.message) + " in\n\n" + "    " + exp + "\n\n" + "  Raw expression: " + (text.trim()) + "\n", range);
          }
      }
  }
  var range = 2;
  function generateCodeFrame(source, start, end) {
      if (start === void 0)
          start = 0;
      if (end === void 0)
          end = source.length;
      var lines = source.split(/\r?\n/);
      var count = 0;
      var res = [];
      for (var i = 0; i < lines.length; i++) {
          count += lines[i].length + 1;
          if (count >= start) {
              for (var j = i - range; j <= i + range || end > count; j++) {
                  if (j < 0 || j >= lines.length) {
                      continue
                  }
                  res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
                  var lineLength = lines[j].length;
                  if (j === i) {
                      var pad = start - (count - lineLength) + 1;
                      var length = end > count ? lineLength - pad : end - start;
                      res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
                  } else if (j > i) {
                      if (end > count) {
                          var length$1 = Math.min(end - count, lineLength);
                          res.push("   |  " + repeat$1("^", length$1));
                      }
                      count += lineLength + 1;
                  }
              }
              break
          }
      }
      return res.join('\n')
  }
  function repeat$1(str, n) {
      var result = '';
      if (n > 0) {
          while (true) {
              if (n & 1) {
                  result += str;
              }
              n >>>= 1;
              if (n <= 0) {
                  break
              }
              str += str;
          }
      }
      return result
  }
  function createFunction(code, errors) {
      try {
          return new Function(code)
      } catch (err) {
          errors.push({
              err: err,
              code: code
          });
          return noop
      }
  }
  function createCompileToFunctionFn(compile) {
      var cache = Object.create(null);
      return function compileToFunctions(template, options, vm) {
          options = extend({}, options);
          var warn$$1 = options.warn || warn;
          delete options.warn;
          {
              try {
                  new Function('return 1');
              } catch (e) {
                  if (e.toString().match(/unsafe-eval|CSP/)) {
                      warn$$1('It seems you are using the standalone build of Vue.js in an ' + 'environment with Content Security Policy that prohibits unsafe-eval. ' + 'The template compiler cannot work in this environment. Consider ' + 'relaxing the policy to allow unsafe-eval or pre-compiling your ' + 'templates into render functions.');
                  }
              }
          }
          var key = options.delimiters ? String(options.delimiters) + template : template;
          if (cache[key]) {
              return cache[key]
          }
          var compiled = compile(template, options);
          {
              if (compiled.errors && compiled.errors.length) {
                  if (options.outputSourceRange) {
                      compiled.errors.forEach(function(e) {
                          warn$$1("Error compiling template:\n\n" + (e.msg) + "\n\n" +
                          generateCodeFrame(template, e.start, e.end), vm);
                      });
                  } else {
                      warn$$1("Error compiling template:\n\n" + template + "\n\n" +
                      compiled.errors.map(function(e) {
                          return ( "- " + e) ;
                      }).join('\n') + '\n', vm);
                  }
              }
              if (compiled.tips && compiled.tips.length) {
                  if (options.outputSourceRange) {
                      compiled.tips.forEach(function(e) {
                          return tip(e.msg, vm);
                      });
                  } else {
                      compiled.tips.forEach(function(msg) {
                          return tip(msg, vm);
                      });
                  }
              }
          }
          var res = {};
          var fnGenErrors = [];
          res.render = createFunction(compiled.render, fnGenErrors);
          res.staticRenderFns = compiled.staticRenderFns.map(function(code) {
              return createFunction(code, fnGenErrors)
          });
          {
              if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
                  warn$$1("Failed to generate render function:\n\n" +
                  fnGenErrors.map(function(ref) {
                      var err = ref.err;
                      var code = ref.code;
                      return ( (err.toString()) + " in\n\n" + code + "\n") ;
                  }).join('\n'), vm);
              }
          }
          return ( cache[key] = res)
      }
  }
  function createCompilerCreator(baseCompile) {
      return function createCompiler(baseOptions) {
          function compile(template, options) {
              var finalOptions = Object.create(baseOptions);
              var errors = [];
              var tips = [];
              var warn = function(msg, range, tip) {
                  (tip ? tips : errors).push(msg);
              };
              if (options) {
                  if (options.outputSourceRange) {
                      var leadingSpaceLength = template.match(/^\s*/)[0].length;
                      warn = function(msg, range, tip) {
                          var data = {
                              msg: msg
                          };
                          if (range) {
                              if (range.start != null) {
                                  data.start = range.start + leadingSpaceLength;
                              }
                              if (range.end != null) {
                                  data.end = range.end + leadingSpaceLength;
                              }
                          }
                          (tip ? tips : errors).push(data);
                      };
                  }
                  if (options.modules) {
                      finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
                  }
                  if (options.directives) {
                      finalOptions.directives = extend(Object.create(baseOptions.directives || null), options.directives);
                  }
                  for (var key in options) {
                      if (key !== 'modules' && key !== 'directives') {
                          finalOptions[key] = options[key];
                      }
                  }
              }
              finalOptions.warn = warn;
              var compiled = baseCompile(template.trim(), finalOptions);
              {
                  detectErrors(compiled.ast, warn);
              }
              compiled.errors = errors;
              compiled.tips = tips;
              return compiled
          }
          return {
              compile: compile,
              compileToFunctions: createCompileToFunctionFn(compile)
          }
      }
  }
  var createCompiler = createCompilerCreator(function baseCompile(template, options) {
      var ast = parse(template.trim(), options);
      if (options.optimize !== false) {
          optimize(ast, options);
      }
      var code = generate(ast, options);
      return {
          ast: ast,
          render: code.render,
          staticRenderFns: code.staticRenderFns
      }
  });
  var ref$1 = createCompiler(baseOptions);
  var compile = ref$1.compile;
  var compileToFunctions = ref$1.compileToFunctions;
  var div;
  function getShouldDecode(href) {
      div = div || document.createElement('div');
      div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
      return div.innerHTML.indexOf('&#10;') > 0
  }
  var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
  var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;
  var idToTemplate = cached(function(id) {
      var el = query(id);
      return el && el.innerHTML
  });
  var mount = Vue.prototype.$mount;
  Vue.prototype.$mount = function(el, hydrating) {
      el = el && query(el);
      if (el === document.body || el === document.documentElement) {
          warn("Do not mount Vue to <html> or <body> - mount to normal elements instead.");
          return this
      }
      var options = this.$options;
      if (!options.render) {
          var template = options.template;
          if (template) {
              if (typeof template === 'string') {
                  if (template.charAt(0) === '#') {
                      template = idToTemplate(template);
                      if (!template) {
                          warn(("Template element not found or is empty: " + (options.template)), this);
                      }
                  }
              } else if (template.nodeType) {
                  template = template.innerHTML;
              } else {
                  {
                      warn('invalid template option:' + template, this);
                  }
                  return this
              }
          } else if (el) {
              template = getOuterHTML(el);
          }
          if (template) {
              if (config.performance && mark) {
                  mark('compile');
              }
              var ref = compileToFunctions(template, {
                  outputSourceRange: "development" !== 'production',
                  shouldDecodeNewlines: shouldDecodeNewlines,
                  shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
                  delimiters: options.delimiters,
                  comments: options.comments
              }, this);
              var render = ref.render;
              var staticRenderFns = ref.staticRenderFns;
              options.render = render;
              options.staticRenderFns = staticRenderFns;
              if (config.performance && mark) {
                  mark('compile end');
                  measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
              }
          }
      }
      return mount.call(this, el, hydrating)
  };
  function getOuterHTML(el) {
      if (el.outerHTML) {
          return el.outerHTML
      } else {
          var container = document.createElement('div');
          container.appendChild(el.cloneNode(true));
          return container.innerHTML
      }
  }
  Vue.compile = compileToFunctions;
  return Vue;
}));

