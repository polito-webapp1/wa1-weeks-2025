function Person (name, age){
    this.name = name;

    this.age = age;

    this.greet = function(){
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old`);
    };
}

const person1 = new Person('Francesca', 18);

person1.greet();

const person2 = new Person('Fulvio', 20);

person2.greet();
