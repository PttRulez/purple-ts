class Post {
	constructor(
		public id: number,
		public date: string,
		public title: string
	) {}
}

enum Sort {
	Asc = 'ASC',
	Desc = 'DESC'
}

class PostList {
	private _posts: Post[] = [];

	public sortById(direction: Sort = Sort.Asc) {
		this._posts = this._posts.sort((a, b) => {
			if (a.id > b.id) {
				return direction === Sort.Asc ? 1 : -1;
			} else if (a.id < b.id) {
				return direction === Sort.Asc ? -1 : 1;
			} else {
				return 0;
			}
		})
	}

	public sortByDate(direction: Sort = Sort.Asc) {
		this._posts = this._posts.sort((a, b) => {
			const date1 = Date.parse(a.date);
			const date2 = Date.parse(b.date);
			
			if (date1 > date2) {
				return direction === Sort.Asc ? 1 : -1;
			} else if (date1 < date2) {
				return direction === Sort.Asc ? -1 : 1;
			} else {
				return 0;
			}
		});
	}

	public addPost(post: Post) {
		this._posts.push(post);
	}

	public getPosts() {
		return this._posts;
	}

	public count() {
		return this._posts.length;
	}

	public getIdIterator(direction: Sort = Sort.Asc) {
		return new IDPostIterator(this, direction);
	}

	public getDateIterator(direction: Sort = Sort.Asc) {
		return new DatePostIterator(this, direction);
	}
}

interface IIterator<T> {
	current(): T | undefined;
	next(): T | undefined;
	prev(): T | undefined;
	index(): number;
}

abstract class PostIterator implements IIterator<Post> {
	private _position: number = 0;
	private _postList: PostList;

	constructor(postList: PostList, direction: Sort = Sort.Asc) {
		this._postList = postList;
	}

	current(): Post | undefined {
		return this._postList.getPosts()[this._position];
	}
	next(): Post | undefined {
		this._position += 1;
		return this._postList.getPosts()[this._position];
	}
	prev(): Post | undefined {
		this._position -= 1;
		return this._postList.getPosts()[this._position];
	}
	index(): number {
		return this._position;
	}
}

class DatePostIterator extends PostIterator {
	constructor(postList: PostList, direction: Sort  = Sort.Asc) {
		postList.sortByDate(direction)
		super(postList, direction);
	}
}

class IDPostIterator extends PostIterator {
	constructor(postList: PostList, direction: Sort  = Sort.Asc) {
		postList.sortById(direction)
		super(postList, direction);
	}
}

const postList = new PostList();
postList.addPost({ id: 1, date: '01-01-2023', title: 'Первый' });
postList.addPost({ id: 2, date: '03-01-2023', title: 'Второй' });
postList.addPost({ id: 3, date: '02-01-2023', title: 'Третий' });

const dateIterator = postList.getDateIterator(Sort.Desc);
console.log(postList)
console.log(dateIterator.index());
console.log(dateIterator.current());
console.log(dateIterator.next());
console.log(dateIterator.next());
console.log(dateIterator.prev());
console.log(dateIterator.index());

const dateIterator2 = postList.getDateIterator(Sort.Asc);
console.log(postList)
console.log(dateIterator2.index());
console.log(dateIterator2.current());
console.log(dateIterator2.next());
console.log(dateIterator2.next());
console.log(dateIterator2.prev());
console.log(dateIterator2.index());

const idIterator = postList.getIdIterator(Sort.Desc);
console.log(postList)
console.log(idIterator.index());
console.log(idIterator.current());
console.log(idIterator.next());
console.log(idIterator.next());
console.log(idIterator.prev());
console.log(idIterator.index());

const idIterator2 = postList.getIdIterator(Sort.Asc);
console.log(postList)
console.log(idIterator2.index());
console.log(idIterator2.current());
console.log(idIterator2.next());
console.log(idIterator2.next());
console.log(idIterator2.prev());
console.log(idIterator2.index());