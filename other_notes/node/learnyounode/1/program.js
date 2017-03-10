//console.log(process.argv);

var sum = 0;
for (var i = 2, len = process.argv.length; i < len; i++) {
    sum += ~~process.argv[i];
}

console.log(sum);