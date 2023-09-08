"use strict";
var Methods;
(function (Methods) {
    Methods["Post"] = "POST";
    Methods["Get"] = "GET";
    Methods["Put"] = "PUT";
    Methods["Patch"] = "PATCH";
    Methods["Delete"] = "DELETE";
    Methods["Head"] = "HEAD";
    Methods["Connect"] = "CONNECT";
    Methods["Options"] = "OPTIONS";
    Methods["Trace"] = "TRACE";
})(Methods || (Methods = {}));
class RequestBuilder {
    constructor() {
        this._method = Methods.Get;
    }
    method(m) {
        this._method = m;
        return this;
    }
    body(b) {
        this._body = b;
        return this;
    }
    url(u) {
        this._url = u;
        return this;
    }
    addHeaders(obj) {
        for (const key of Object.keys(obj)) {
            this._headers[key] = obj[key];
        }
        return this;
    }
    async exec() {
        if (!this._url) {
            throw new Error('Укажите урл');
        }
        const res = await fetch(this._url, {
            method: this._method,
            body: this._body,
            headers: this._headers
        });
        const data = await res.json();
        return data;
    }
}
new RequestBuilder()
    .method(Methods.Get)
    .url('https://jsonplaceholder.typicode.com/posts')
    .exec()
    .then(data => console.log(data));
