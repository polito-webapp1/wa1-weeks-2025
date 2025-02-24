'use strict'; 

const name1 = '   Luigi   De   Russis  '

console.log(name1) ;

const parts = name1.split(' ')

console.log(parts)

let initials = ''

// for (let i=0; i<parts.length; i++)

for (const part of parts) {
    if (part) {
        initials += part[0].toUpperCase()
    }
}

console.log(initials)
