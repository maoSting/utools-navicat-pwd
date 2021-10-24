const crypto = require('crypto')

window.services = {
    decode: (string) => {
        return crypto.decode(string).toString();
    }
}