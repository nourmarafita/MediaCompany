// var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("12345", salt);

// console.log(hash);

// console.log(bcrypt.compareSync("123456", hash)); // true
// console.log(bcrypt.compareSync("not_bacon", hash)); // false

// var filter = new Filter({ regex: /\*|\.|$/gi });

// var filter = new Filter({ replaceRegex:  /[A-Za-z0-9가-힣_]/g }); 
//multilingual support for word filtering

var Filter = require('bad-words'),
    filter = new Filter();

console.log(filter.clean("Don't be an fuck damn")); //Don't be an ******

let kata = "Ade"

let kataDepan = kata[0]

let pembanding = kata[0].toLowerCase()

console.log(kataDepan === pembanding);