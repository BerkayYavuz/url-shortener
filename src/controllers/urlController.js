const { encodeBase62, generateRandomCode } = require('../utils/shortCodeGenerator');

console.log("Random:", generateRandomCode());
console.log("Base62 of 123456:", encodeBase62(123456));
