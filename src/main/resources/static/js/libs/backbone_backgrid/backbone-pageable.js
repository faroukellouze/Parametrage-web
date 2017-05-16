(function (e) {
    if (typeof exports == "object") {
        module.exports = e(require("underscore"), require("backbone"))
    } else if (typeof define == "function" && define.amd) {
        define(["underscore", "backbone"], e)
    } else if (typeof _ !== "undefined" && typeof Backbone !== "undefined") {
        var t = Backbone.PageableCollection;
        var n = Backbone.PageableCollection = e(_, Backbone);
        Backbone.PageableCollection.noConflict = function () {
            Backbone.PageableCollection = t;
            return n
        }
    }
})(function (e, t) {
    "use strict";
    function g(t, n) {
        t *= 1;
        if (!e.isNumber(t) || e.isNaN(t) || !e.isFinite(t) || ~~t !== t) {
            throw new TypeError("`" + n + "` must be a finite integer")
        }
        return t
    }

    function y(e) {
        var t, n, r, i, s = {}, o = decodeURIComponent;
        var u = e.split("&");
        for (var a = 0, f = u.length; a < f; a++) {
            var l = u[a];
            t = l.split("="), n = t[0], r = t[1] || true;
            n = o(n), i = s[n];
            if (c(i))
                i.push(r);
            else if (i)
                s[n] = [i, r];
            else
                s[n] = r
        }
        return s
    }

    function b() {
        var t = arguments[0];
        var n = e.toArray(arguments).slice(1);
        var r = t.comparator;
        t.comparator = null;
        try {
            t.reset.apply(t, n)
        } finally {
            t.comparator = r;
            if (r)
                t.sort()
        }
        return t
    }

    var n = e.extend;
    var r = e.omit;
    var i = e.clone;
    var s = e.each;
    var o = e.pick;
    var u = e.contains;
    var a = e.isEmpty;
    var f = e.pairs;
    var l = e.invert;
    var c = e.isArray;
    var h = e.isFunction;
    var p = e.keys;
    var d = e.isUndefined;
    var v = Math.ceil;
    var m = t.Collection.prototype;
    var w = /[\s'"]/g;
    var E = /[<>\s'"]/g;
    var S = t.Collection.extend({
        state: {
            firstPage: 1,
            lastPage: null,
            currentPage: null,
            pageSize: 25,
            totalPages: null,
            totalRecords: null,
            sortKey: null,
            order: -1
        },
        mode: "server",
        queryParams: {
            currentPage: "page",
            pageSize: "per_page",
            totalPages: "total_pages",
            totalRecords: "total_entries",
            sortKey: "sort_by",
            order: "order",
            directions: {"-1": "asc", 1: "desc"}
        },
        initialize: function (e, t) {
            t = t || {};
            var r = this.mode = t.mode || this.mode || x.mode;
            var s = n({}, x.queryParams, this.queryParams, t.queryParams || {});
            s.directions = n({}, x.queryParams.directions, this.queryParams.directions, s.directions || {});
            this.queryParams = s;
            var o = this.state = n({}, x.state, this.state, t.state || {});
            o.currentPage = o.currentPage == null ? o.firstPage : o.currentPage;
            if (r != "server" && o.totalRecords == null && !a(e)) {
                o.totalRecords = e.length
            }
            this.switchMode(r, n({fetch: false, resetState: false, models: e}, t));
            var u = t.comparator;
            if (o.sortKey && !u) {
                this.setSorting(o.sortKey, o.order, t)
            }
            if (r != "server") {
                if (u && t.full) {
                    delete this.comparator;
                    var f = this.fullCollection;
                    f.comparator = u;
                    f.sort()
                }
                if (e && !a(e)) {
                    this.getPage(o.currentPage);
                    e.splice.apply(e, [0, e.length].concat(this.models))
                }
            }
            this._initState = i(this.state)
        },
        _makeFullCollection: function (e, n) {
            var r = ["url", "model", "sync", "comparator"];
            var i = this.constructor.prototype;
            var s, o, u;
            var a = {};
            for (s = 0, o = r.length; s < o; s++) {
                u = r[s];
                if (!d(i[u])) {
                    a[u] = i[u]
                }
            }
            var f = new (t.Collection.extend(a))(e, n);
            for (s = 0, o = r.length; s < o; s++) {
                u = r[s];
                if (this[u] !== i[u]) {
                    f[u] = u
                }
            }
            return f
        },
        _makeCollectionEventHandler: function (e, t) {
            return function (o, u, a, f) {
                var l = e._handlers;
                s(p(l), function (n) {
                    var r = l[n];
                    e.off(n, r);
                    t.off(n, r)
                });
                var c = i(e.state);
                var h = c.firstPage;
                var m = h === 0 ? c.currentPage : c.currentPage - 1;
                var g = c.pageSize;
                var y = m * g, w = y + g;
                if (o == "add") {
                    var E, S, x, T, f = f || {};
                    if (a == t) {
                        S = t.indexOf(u);
                        if (S >= y && S < w) {
                            T = e;
                            E = x = S - y
                        }
                    } else {
                        E = e.indexOf(u);
                        S = y + E;
                        T = t;
                        var x = !d(f.at) ? f.at + y : S
                    }
                    ++c.totalRecords;
                    e.state = e._checkState(c);
                    if (T) {
                        T.add(u, n({}, f || {}, {at: x}));
                        var N = E >= g ? u : !d(f.at) && x < w && e.length > g ? e.at(g) : null;
                        if (N) {
                            var C = a._events.add, k = {onAdd: true};
                            if (C.length) {
                                var L = C[C.length - 1];
                                var A = L.callback;
                                L.callback = function () {
                                    try {
                                        A.apply(this, arguments);
                                        e.remove(N, k)
                                    } finally {
                                        L.callback = A
                                    }
                                }
                            } else
                                e.remove(N, k)
                        }
                    }
                }
                if (o == "remove") {
                    if (!f.onAdd) {
                        if (!--c.totalRecords) {
                            c.totalRecords = null;
                            c.totalPages = null
                        } else {
                            var O = c.totalPages = v(c.totalRecords / g);
                            c.lastPage = h === 0 ? O - 1 : O;
                            if (c.currentPage > O)
                                c.currentPage = c.lastPage
                        }
                        e.state = e._checkState(c);
                        var M, _ = f.index;
                        if (a == e) {
                            if (M = t.at(w))
                                e.push(M);
                            t.remove(u)
                        } else if (_ >= y && _ < w) {
                            e.remove(u);
                            M = t.at(m * (g + _));
                            if (M)
                                e.push(M)
                        }
                    } else
                        delete f.onAdd
                }
                if (o == "reset" || o == "sort") {
                    f = a;
                    a = u;
                    if (a == e && o == "reset") {
                        var D = t.models.slice(0, y);
                        var P = t.models.slice(y + e.models.length);
                        f = n(f, {silent: true});
                        b(t, D.concat(e.models).concat(P), f)
                    }
                    if (o == "reset" || a == t) {
                        if (!(c.totalRecords = t.models.length)) {
                            c.totalRecords = null;
                            c.totalPages = null;
                            c.lastPage = c.currentPage = c.firstPage
                        }
                        e.state = e._checkState(c);
                        if (a == e)
                            t.trigger(o, t, f);
                        b(e, t.models.slice(y, w), f)
                    }
                }
                s(p(l), function (n) {
                    var r = l[n];
                    s([e, t], function (e) {
                        e.on(n, r);
                        var t = e._events[n];
                        t.unshift(t.pop())
                    })
                })
            }
        },
        _checkState: function (e) {
            var t = this.mode;
            var n = this.links;
            var r = e.totalRecords;
            var i = e.pageSize;
            var s = e.currentPage;
            var o = e.firstPage;
            var u = e.totalPages;
            if (r != null && i != null && s != null && o != null && (t == "infinite" ? n : true)) {
                r = g(r, "totalRecords");
                i = g(i, "pageSize");
                s = g(s, "currentPage");
                o = g(o, "firstPage");
                if (i < 1) {
                    throw new RangeError("`pageSize` must be >= 1")
                }
                u = e.totalPages = v(r / i);
                if (o < 0 || o > 1) {
                    throw new RangeError("`firstPage must be 0 or 1`")
                }
                e.lastPage = o === 0 ? u - 1 : u;
                if (t == "infinite") {
                    if (!n[s + ""]) {
                        throw new RangeError("No link found for page " + s)
                    }
                } else {
                    if (o === 0 && (s < o || s >= u)) {
                        throw new RangeError("`currentPage` must be firstPage <= currentPage < totalPages if 0-based. Got " + s + ".")
                    } else if (o === 1 && (s < o || s > u)) {
                        throw new RangeError("`currentPage` must be firstPage <= currentPage <= totalPages if 1-based. Got " + s + ".")
                    }
                }
            }
            return e
        },
        setPageSize: function (e, t) {
            e = g(e, "pageSize");
            t = t || {};
            this.state = this._checkState(n({}, this.state, {pageSize: e, totalPages: v(this.state.totalRecords / e)}));
            return this.getPage(this.state.currentPage, t)
        },
        switchMode: function (t, o) {
            if (!u(["server", "client", "infinite"], t)) {
                throw new TypeError('`mode` must be one of "server", "client" or "infinite"')
            }
            o = o || {fetch: true, resetState: true};
            var a = this.state = o.resetState ? i(this._initState) : this._checkState(n({}, this.state));
            this.mode = t;
            var f = this;
            var l = this.fullCollection;
            var c = this._handlers = this._handlers || {}, h;
            if (t != "server" && !l) {
                l = this._makeFullCollection(o.models || []);
                l.pageableCollection = this;
                this.fullCollection = l;
                var d = this._makeCollectionEventHandler(this, l);
                s(["add", "remove", "reset", "sort"], function (t) {
                    c[t] = h = e.bind(d, {}, t);
                    f.on(t, h);
                    l.on(t, h)
                });
                l.comparator = this._fullComparator
            } else if (t == "server" && l) {
                s(p(c), function (e) {
                    h = c[e];
                    f.off(e, h);
                    l.off(e, h)
                });
                delete this._handlers;
                this._fullComparator = l.comparator;
                delete this.fullCollection
            }
            if (t == "infinite") {
                var m = this.links = {};
                var g = a.firstPage;
                var y = v(a.totalRecords / a.pageSize);
                var b = g === 0 ? y - 1 : y || g;
                for (var w = a.firstPage; w <= b; w++) {
                    m[w] = this.url
                }
            } else if (this.links)
                delete this.links;
            return o.fetch ? this.fetch(r(o, "fetch", "resetState")) : this
        },
        hasPrevious: function () {
            var e = this.state;
            var t = e.currentPage;
            if (this.mode != "infinite")
                return t > e.firstPage;
            return !!this.links[t - 1]
        },
        hasNext: function () {
            var e = this.state;
            var t = this.state.currentPage;
            if (this.mode != "infinite")
                return t < e.lastPage;
            return !!this.links[t + 1]
        },
        getFirstPage: function (e) {
            return this.getPage("first", e)
        },
        getPreviousPage: function (e) {
            return this.getPage("prev", e)
        },
        getNextPage: function (e) {
            return this.getPage("next", e)
        },
        getLastPage: function (e) {
            return this.getPage("last", e)
        },
        getPage: function (e, t) {
            var i = this.mode, s = this.fullCollection;
            t = t || {fetch: false};
            var o = this.state, u = o.firstPage, f = o.currentPage, l = o.lastPage, c = o.pageSize;
            var h = e;
            switch (e) {
                case"first":
                    h = u;
                    break;
                case"prev":
                    h = f - 1;
                    break;
                case"next":
                    h = f + 1;
                    break;
                case"last":
                    h = l;
                    break;
                default:
                    h = g(e, "index")
            }
            this.state = this._checkState(n({}, o, {currentPage: h}));
            var p = (u === 0 ? h : h - 1) * c;
            var d = s && s.length ? s.models.slice(p, p + c) : [];
            if ((i == "client" || i == "infinite" && !a(d)) && !t.fetch) {
                return b(this, d, r(t, "fetch"))
            }
            if (i == "infinite")
                t.url = this.links[h];
            return this.fetch(r(t, "fetch"))
        },
        sync: function (e, r, i) {
            var s = this;
            if (s.mode == "infinite") {
                var o = i.success;
                var u = s.state.currentPage;
                i.success = function (e, t, r) {
                    var a = s.links;
                    var f = s.parseLinks(e, n({xhr: r}, i));
                    if (f.first)
                        a[s.state.firstPage] = f.first;
                    if (f.prev)
                        a[u - 1] = f.prev;
                    if (f.next)
                        a[u + 1] = f.next;
                    if (o)
                        o(e, t, r)
                }
            }
            return (m.sync || t.sync).call(s, e, r, i)
        },
        parseLinks: function (e, t) {
            var n = t.xhr.getResponseHeader("Link");
            var r = ["first", "prev", "previous", "next", "last"];
            var o = {};
            s(n.split(","), function (e) {
                var t = e.split(";");
                var n = t[0].replace(E, "");
                var i = t.slice(1);
                s(i, function (e) {
                    var t = e.split("=");
                    var i = t[0].replace(w, "");
                    var s = t[1].replace(w, "");
                    if (i == "rel" && u(r, s)) {
                        if (s == "previous")
                            o.prev = n;
                        else
                            o[s] = n
                    }
                })
            });
            var a = o.last || "", f, l;
            if (l = (f = a.indexOf("?")) ? a.slice(f + 1) : "") {
                var c = y(l);
                var h = i(this.state);
                var p = this.queryParams;
                var d = h.pageSize;
                var v = c[p.totalRecords] * 1;
                var m = c[p.currentPage] * 1;
                var g = c[p.totalPages];
                if (!v) {
                    if (m)
                        v = (h.firstPage === 0 ? m + 1 : m) * d;
                    else if (g)
                        v = g * d
                }
                if (v)
                    h.totalRecords = v;
                this.state = this._checkState(h)
            }
            delete o.last;
            return o
        },
        parse: function (t) {
            if (!c(t)) {
                return new TypeError("The server response must be an array")
            }
            if (t.length === 2 && e.isObject(t[0]) && c(t[1])) {
                var n = this.queryParams;
                var o = i(this.state);
                var u = t[0];
                s(f(r(n, "directions")), function (e) {
                    var t = e[0], n = e[1];
                    o[t] = u[n]
                });
                if (u.order) {
                    o.order = l(n.directions)[u.order] * 1
                }
                this.state = this._checkState(o);
                return t[1]
            }
            return t
        },
        fetch: function (t) {
            t = t || {};
            var s = this._checkState(this.state);
            var u = this.mode;
            if (u == "infinite" && !t.url) {
                t.url = this.links[s.currentPage]
            }
            var a = t.data || {};
            var l = t.url || e.result(this, "url") || "";
            var c = l.indexOf("?");
            if (c != -1) {
                n(a, y(l.slice(c + 1)));
                l = l.slice(0, c)
            }
            t.url = l;
            t.data = a;
            var v = this.mode == "client" ? o(this.queryParams, "sortKey", "order") : r(o(this.queryParams, p(x.queryParams)), "directions");
            var g, w, E, S, T = f(v), N = i(this);
            for (g = 0; g < T.length; g++) {
                w = T[g], E = w[0], S = w[1];
                S = h(S) ? S.call(N) : S;
                if (s[E] != null && S != null) {
                    a[S] = s[E]
                }
            }
            if (s.sortKey && s.order) {
                a[v.order] = this.queryParams.directions[s.order + ""]
            } else if (!s.sortKey)
                delete a[v.order];
            var C = f(r(this.queryParams, p(x.queryParams)));
            for (g = 0; g < C.length; g++) {
                w = C[g];
                S = w[1];
                S = h(S) ? S.call(N) : S;
                a[w[0]] = S
            }
            var k = this.fullCollection, L = this.links;
            if (u != "server") {
                var A = this;
                var O = t.success;
                t.success = function (e, r, i) {
                    i = i || {};
                    if (d(t.silent))
                        delete i.silent;
                    else
                        i.silent = t.silent;
                    var o = e.models;
                    var a = s.currentPage;
                    if (u == "client")
                        b(k, o, i);
                    else if (L[a]) {
                        var f = s.pageSize;
                        var l = (s.firstPage === 0 ? a : a - 1) * f;
                        var c = k.models;
                        var h = c.slice(0, l);
                        var p = c.slice(l + f);
                        c = h.concat(o).concat(p);
                        k.update(c, n({silent: true, sort: false}, i));
                        if (k.comparator)
                            k.sort();
                        k.trigger("reset", k, i)
                    } else {
                        k.add(o, n({at: k.length, silent: true}, i));
                        k.trigger("reset", k, i)
                    }
                    if (O)
                        O(e, r, i)
                };
                return m.fetch.call(A, n({}, t, {silent: true}))
            }
            return m.fetch.call(this, t)
        },
        _makeComparator: function (e, t) {
            var n = this.state;
            e = e || n.sortKey;
            t = t || n.order;
            if (!e || !t)
                return;
            return function (n, r) {
                if (typeof n.get(e) === "string")
                    var i = n.get(e).toLowerCase(), s = r.get(e).toLowerCase(), o;//Hassen: j'ai ajouter toLowerCase() pour que la comparaison ne devient pas sensible à la casse 
                else
                    var i = n.get(e), s = r.get(e), o;//Hassen: j'ai ajouter toLowerCase() pour que la comparaison ne devient pas sensible à la casse  
                if (t === 1)
                    o = i, i = s, s = o;
                if (i === s)
                    return 0;
                else if (i < s)
                    return -1;
                return 1
            }
        },
        setSorting: function (e, t, r) {
            var i = this.state;
            i.sortKey = e;
            i.order = t = t || i.order;
            var s = this.fullCollection;
            var o = false, u = false;
            if (!e)
                o = u = true;
            var a = this.mode;
            r = n({side: a == "client" ? a : "server", full: true}, r);
            var f = this._makeComparator(e, t);
            var l = r.full, c = r.side;
            if (c == "client") {
                if (l) {
                    if (s)
                        s.comparator = f;
                    o = true
                } else {
                    this.comparator = f;
                    u = true
                }
            } else if (c == "server" && !l) {
                this.comparator = f
            }
            if (o)
                delete this.comparator;
            if (u && s)
                delete s.comparator;
            return this
        }
    });
    var x = S.prototype;
    return S
})