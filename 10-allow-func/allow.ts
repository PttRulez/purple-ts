function allowFunc(checkFunc: (a: number) => boolean) {
	return (
		target: Object,
		propertyKey: string | symbol,
	) => {
		let value: number;

		const set = function (newValue: number) {
			if (checkFunc(newValue)) {
				value = newValue;
			} else {
				console.log('Свойство не отвечает декоратору');
			}
		}

		const get = function () {
			return value;
		}

		Object.defineProperty(target, propertyKey, { get, set });
	}
}

class User {
	@allowFunc((a) => a > 10)
	age: number = 30;
}

const person = new User();
console.log(person.age);

person.age = 0;
console.log(person.age);

person.age = 20;
console.log(person.age);


