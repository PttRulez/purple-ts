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
	exec: <T>() => Promise<T>; 
}

class RequestBuilder implements IBuilder {
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

new RequestBuilder()
		.method(Methods.Get)
		.url('https://jsonplaceholder.typicode.com/posts')
		.exec()
		.then(data => console.log(data))
