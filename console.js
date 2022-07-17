const readline = require("readline-sync");
const numToWords = require("./func");

console.log("Masukkan angka :");
const res = numToWords(readline.question());
console.log("Hasil :");
console.log(res);