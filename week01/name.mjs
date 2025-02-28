"use strict" ;

function greeter(name) {
    
    const hello = function () {
        return "Hello " + name ;
    }

    return hello ;
}

const helloTom = greeter("Tom") ;
const helloJerry = greeter("Jerry") ;

console.log(helloTom()) ;
console.log(helloJerry()) ;
