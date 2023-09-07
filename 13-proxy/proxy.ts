enum Methods {
	Post = 'POST',
	Get = 'GET',
	Put = 'PUT',
	Patch = 'PATCH',
	Delete = 'DELETE',
	Head = 'HEAD',
	Connect = 'CONNECT',
	Options = 'OPTIONS',
	Trace = 'TRACE'
}

interface IBuilder {
	method: (m: Methods) => IBuilder;
	body: (b: string) => IBuilder;
	url: (u: string) => IBuilder;
	addHeaders: (headers: Record<string, string>) => IBuilder;
}

interface IExec {
	exec: <T>() => Promise<T> | Error;
}

class RequestBuilder implements IBuilder, IExec {
	private _method: Methods = Methods.Get;
	private _body: string;
	private _headers: Record<string, string>;
	private _url: string;

	method(m: Methods): this {
		this._method = m;
		return this;
	}

	body(b: string) {
		this._body = b;
		return this;
	}

	url(u: string) {
		this._url = u;
		return this;
	}

	addHeaders(obj: Record<string, string>) {
		for (const key of Object.keys(obj)) {
				this._headers[key] = obj[key]
		}
		return this;
	}

	async exec<K extends any>(): Promise<K> {
		if (!this._url) {
			throw new Error('Укажите урл');
		}

		const res = await fetch(this._url, {
			method: this._method,
			body: this._body,
			headers: this._headers
		 });
		const data = await res.json()
		return data;
	}
}

class BuilderProxy implements IExec {
	constructor (private builder: RequestBuilder, private productId: number) {}
	
	exec<K extends any>(): Promise<K> | Error {
		if (this.productId > 10) {
			return new Error('productId не может быть больше 10')
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
	} catch (e) {
		console.log(e);
	}

	const proxy2 = new BuilderProxy(new RequestBuilder(), 11);
	try {
		const a = await proxy2.exec();
		console.log(a);
		// proxy2.exec().then(a => console.log(a));
	} catch (e) {
		console.log(e);
	}
}

run();
