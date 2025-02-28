const scores = [ -2, 5, 2, 3, -1, -3, 4, 0, 4, 2, 5 ]

let better_scores = []
for ( const s of scores ) {
    if(s >= 0) {
        better_scores.push(s)
    }
}
// FILTER

const NN = scores.length - better_scores.length

console.log(NN)
console.log(better_scores)

// WARNING: only works if better_scores has at least 3 elements

// for (let c = 0; c<2; c++) {
//     let min_value = Math.min(...better_scores)
//     let min_pos = better_scores.indexOf(min_value)
//     better_scores.splice(min_pos,1)
// }

// function diff(a, b) {
//     let d = a - b
//     return d
// }

let diff = (a,b) => a-b

better_scores.sort(diff)
// better_scores.splice(0,2)

better_scores = better_scores.slice(2)


let sum = 0.0
for( const s of better_scores)
    sum += s
const avg = Math.round( sum / better_scores.length )
// REDUCE

for (let c = 0; c<NN+2; c++)
    better_scores.push(avg)

console.log(better_scores)