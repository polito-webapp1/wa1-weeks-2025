function volume( height, base ) {

    const pi = 3.14

    // b: base side
    const vol = (b) => height * b * b * pi;

    // const vol = function (b) {
    //     return height * b * b 
    // }

    // const result = vol(base/2)

    return vol ;

}


const vol = volume(1, 2)

const value = vol(3)