// Mengambil informasi dari package.json
const Sansline = require('./package.json');
const version = Sansline.version;
const name = Sansline.name;

// Mencetak informasi proyek ke konsol
console.log(`\x1b[32m%s\x1b[0m`, `➣ Name Project : ${name}`);
console.log(`\x1b[32m%s\x1b[0m`, `➣ version : ${version}`);
console.log("\x1b[33m%s\x1b[0m", "➣ Owner : sansline");
console.log("\x1b[33m%s\x1b[0m", "➣ Youtube : sansline");
console.log("\x1b[33m%s\x1b[0m", "➣ Contact : t.me/sansline");
console.log("\x1b[31m%s\x1b[0m", "➣ NOTE: Rest Api Automatic Sistem");

// Memuat modul app
module.exports = require('./app');
