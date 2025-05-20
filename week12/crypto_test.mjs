import crypto from 'crypto';
// https://nodejs.org/api/crypto.html

const salt = 'ac75f8c3081ffd7a'
const database_hash = '03a2d302d1a390bcc40755650bd773af2686a078a14beef74a67dcc1c3ab06d0';
const password = 'passwor';

crypto.scrypt(password, salt, 32, (err, computed_hash) => {
    console.log(computed_hash) ;
    const equal = crypto.timingSafeEqual(computed_hash, Buffer.from(database_hash, 'hex'));
    console.log(equal);
});