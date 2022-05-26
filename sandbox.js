var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("12345", salt);

console.log(hash);

console.log(bcrypt.compareSync("123456", hash)); // true
console.log(bcrypt.compareSync("not_bacon", hash)); // false