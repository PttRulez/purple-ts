"use strict";
class Post {
    constructor(id, date, title) {
        this.id = id;
        this.date = date;
        this.title = title;
    }
}
var Sort;
(function (Sort) {
    Sort["Asc"] = "ASC";
    Sort["Desc"] = "DESC";
})(Sort || (Sort = {}));
class PostList {
    constructor() {
        this._posts = [];
    }
    sortById(direction = Sort.Asc) {
        this._posts = this._posts.sort((a, b) => {
            if (a.id > b.id) {
                return direction === Sort.Asc ? 1 : -1;
            }
            else if (a.id < b.id) {
                return direction === Sort.Asc ? -1 : 1;
            }
            else {
                return 0;
            }
        });
    }
    sortByDate(direction = Sort.Asc) {
        this._posts = this._posts.sort((a, b) => {
            const date1 = Date.parse(a.date);
            const date2 = Date.parse(b.date);
            if (date1 > date2) {
                return direction === Sort.Asc ? 1 : -1;
            }
            else if (date1 < date2) {
                return direction === Sort.Asc ? -1 : 1;
            }
            else {
                return 0;
            }
        });
    }
    addPost(post) {
        this._posts.push(post);
    }
    getPosts() {
        return this._posts;
    }
    count() {
        return this._posts.length;
    }
    getIdIterator(direction = Sort.Asc) {
        return new IDPostIterator(this, direction);
    }
    getDateIterator(direction = Sort.Asc) {
        return new DatePostIterator(this, direction);
    }
}
class PostIterator {
    constructor(postList, direction = Sort.Asc) {
        this._position = 0;
        this._postList = postList;
    }
    current() {
        return this._postList.getPosts()[this._position];
    }
    next() {
        this._position += 1;
        return this._postList.getPosts()[this._position];
    }
    prev() {
        this._position -= 1;
        return this._postList.getPosts()[this._position];
    }
    index() {
        return this._position;
    }
}
class DatePostIterator extends PostIterator {
    constructor(postList, direction = Sort.Asc) {
        postList.sortByDate(direction);
        super(postList, direction);
    }
}
class IDPostIterator extends PostIterator {
    constructor(postList, direction = Sort.Asc) {
        postList.sortById(direction);
        super(postList, direction);
    }
}
const postList = new PostList();
postList.addPost({ id: 1, date: '01-01-2023', title: 'Первый' });
postList.addPost({ id: 2, date: '03-01-2023', title: 'Второй' });
postList.addPost({ id: 3, date: '02-01-2023', title: 'Третий' });
const dateIterator = postList.getDateIterator(Sort.Desc);
console.log(postList);
console.log(dateIterator.index());
console.log(dateIterator.current());
console.log(dateIterator.next());
console.log(dateIterator.next());
console.log(dateIterator.prev());
console.log(dateIterator.index());
const dateIterator2 = postList.getDateIterator(Sort.Asc);
console.log(postList);
console.log(dateIterator2.index());
console.log(dateIterator2.current());
console.log(dateIterator2.next());
console.log(dateIterator2.next());
console.log(dateIterator2.prev());
console.log(dateIterator2.index());
const idIterator = postList.getIdIterator(Sort.Desc);
console.log(postList);
console.log(idIterator.index());
console.log(idIterator.current());
console.log(idIterator.next());
console.log(idIterator.next());
console.log(idIterator.prev());
console.log(idIterator.index());
const idIterator2 = postList.getIdIterator(Sort.Asc);
console.log(postList);
console.log(idIterator2.index());
console.log(idIterator2.current());
console.log(idIterator2.next());
console.log(idIterator2.next());
console.log(idIterator2.prev());
console.log(idIterator2.index());
