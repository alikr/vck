const fs = require('fs');
const path = require("path");
const uglify = require('uglify-js');
const rollup = require('rollup');
const config = require('./rollup.build.config.js');
const banner = require('./banner.js');
const zlib = require('zlib');
var minify = false;
var outname = config.output.file;
const format = process.argv.slice(2)[0];
config.output.format = format;
if (format === 'iife') {
  minify = true;
  outname = outname.replace(/\.js/,'.min.js');
}

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}
const input = {
    input: config.input,
    plugins: config.plugins
}
rollup.rollup(input)
    .then(bundle => bundle.generate(config.output))
    .then(({ code }) => {
        var outcode = banner + (minify ? uglify.minify(code).code : code);
        write(outname, outcode);
    })
    .catch(err => {
        console.log(err)
    });

function write (dest, code) {
    return new Promise((resolve, reject) => {
    fs.writeFile(dest, code, err => {
        if (err) return reject(err);
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err);
        })
    })
    })
}