const crypto = require('crypto');

const generarClaveSecreta = () => {
    return crypto.randomBytes(32).toString('hex');
};

console.log(generarClaveSecreta());