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
class BuilderProxy {
    constructor(builder, productId) {
        this.builder = builder;
        this.productId = productId;
    }
    exec() {
        if (this.productId > 10) {
            return new Error('productId не может быть больше 10');
        }
        return this.builder.url(`https://dummyjson.com/products/${this.productId}`).exec();
    }
}
async function run() {
    const proxy = new BuilderProxy(new RequestBuilder(), 2);
    try {
        const a = await proxy.exec();
        console.log(a);
        // proxy.exec().then(a => console.log(a));
    }
    catch (e) {
        console.log(e);
    }
    const proxy2 = new BuilderProxy(new RequestBuilder(), 11);
    try {
        const a = await proxy2.exec();
        console.log(a);
        // proxy2.exec().then(a => console.log(a));
    }
    catch (e) {
        console.log(e);
    }
}
run();
