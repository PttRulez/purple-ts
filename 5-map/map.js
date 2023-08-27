"use strict";
class ListNode {
    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
    addNode(key, value) {
        if (!this.next) {
            this.next = new ListNode(key, value);
        }
        else {
            this.next.addNode(key, value);
        }
    }
    getValueByKey(key) {
        var _a;
        if (this.key === key) {
            return this.value;
        }
        else {
            return (_a = this.next) === null || _a === void 0 ? void 0 : _a.getValueByKey(key);
        }
    }
}
class Bucket {
    constructor(firstNode = null) {
        this.firstNode = firstNode;
    }
    addItem(key, value) {
        if (!this.firstNode) {
            this.firstNode = new ListNode(key, value);
        }
        else {
            this.firstNode.addNode(key, value);
        }
        return this;
    }
    getItem(key) {
        if (!this.firstNode) {
            throw new Error('Нет элемента с таким ключом');
        }
        let cur = this.firstNode;
        while (cur) {
            if (cur.key === key) {
                return cur.value;
            }
            cur = cur.next;
        }
        throw new Error('Нет элемента с таким ключом');
    }
    deleteItem(key) {
        if (!this.firstNode) {
            throw new Error('Нет элемента с таким ключом');
        }
        if (this.firstNode.key === key) {
            this.firstNode = this.firstNode.next;
            return true;
        }
        else {
            let cur = this.firstNode;
            while (cur.next) {
                if (cur.next.key === key) {
                    cur.next = cur.next.next;
                    return true;
                }
                cur = cur.next;
            }
        }
        throw new Error('Нет элемента с таким ключом');
    }
}
class HashMap {
    constructor() {
        this._items = {};
    }
    set(key, value) {
        const hash = this._makeHash(key);
        if (this._items[hash]) {
            this._items[hash].addItem(key, value);
        }
        else {
            this._items[hash] = new Bucket().addItem(key, value);
        }
    }
    delete(key) {
        const hash = this._makeHash(key);
        if (this._items[hash]) {
            this._items[hash].deleteItem(key);
        }
        else {
            throw new Error('Нет элемента с таким ключом');
        }
    }
    get(key) {
        const hash = this._makeHash(key);
        if (this._items[hash]) {
            return this._items[hash].getItem(key);
        }
        else {
            throw new Error('Нет элемента с таким ключом');
        }
    }
    clear() {
        this._items = {};
    }
    _makeHash(key) {
        let hash = 0, i, chr;
        if (key.length === 0)
            return hash;
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
console.log(map.get('London'));
console.log(map.delete('London'));
console.log(map.get('London'));
