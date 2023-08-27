class ListNode {
	constructor (public key: string, public value: any, public next: ListNode | null = null) {}

	addNode(key: string, value: string) {
		if (!this.next) {
			this.next = new ListNode(key, value)
		} else {
			this.next.addNode(key, value);
		}
	}

	getValueByKey(key: string): any {
		if (this.key === key) {
			return this.value;
		} else {
			return this.next?.getValueByKey(key);
		}
	}
}

class Bucket {
	constructor (private firstNode: ListNode | null = null) {}

	addItem(key: string, value: string): this {
		if (!this.firstNode) {
			this.firstNode = new ListNode(key, value);
		} else {
			this.firstNode.addNode(key, value);
		}
		return this;
	}

	getItem(key: string) {
		if (!this.firstNode) {
			return null
		}

		let cur: ListNode | null = this.firstNode;
		while (cur) {
			if (cur.key === key) {
				return cur.value;
			}
			cur = cur.next;
		}
		return null
	}

	deleteItem(key: string) {
		if (!this.firstNode) {
			return false
		}
		if (this.firstNode.key === key) {
			this.firstNode = this.firstNode.next;
			return true;
		} else {
			let cur = this.firstNode;
			while (cur.next) {
				if (cur.next.key === key) {
					cur.next = cur.next.next
					return true;
				}
				cur = cur.next;
			}
		}
		return false
	}
}

class HashMap {
	private _items: Record<number, Bucket>;

	constructor () {
		this._items = {};
	}
	
	set(key: string, value: any) {
		const hash = this._makeHash(key);
		if (this._items[hash]) {
			this._items[hash].addItem(key, value)
		} else {
			this._items[hash] = new Bucket().addItem(key, value);
		}
	}

	delete(key: string) {
		const hash = this._makeHash(key);

		if (this._items[hash]) {
			this._items[hash].deleteItem(key)
		} else {
			return false
		}
	}

	get(key: string) {
		const hash = this._makeHash(key);

		if (this._items[hash]) {
			return this._items[hash].getItem(key)
		} else {
			return null
		}
	}

	clear() {
		this._items = {};
	}

	private _makeHash(key: string): number {
    let hash = 0,
      i, chr;
    if (key.length === 0) return hash;
    for (i = 0; i < key.length; i++) {
      chr = key.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
}
const map = new HashMap();
map.set('London', 20);
console.log(map.get('London'))
console.log(map.delete('London'))
console.log(map.get('London'))
