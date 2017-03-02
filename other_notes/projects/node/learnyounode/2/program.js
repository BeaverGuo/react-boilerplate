//print new line number in a file


var fs = require('fs');

function print_lines(fileName) {
    var buf = fs.readFileSync(fileName),
    str = buf.toString();

    var line_number = str.split('\n').length - 1;
    console.log(line_number);
}

print_lines(process.argv[2]);