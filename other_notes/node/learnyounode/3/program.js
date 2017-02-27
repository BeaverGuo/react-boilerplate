//print new line number in a file


var fs = require('fs');

function print_lines(fileName) {
    fs.readFile(fileName, 'utf-8', function(err, data_str) {
        if(!err) {
            var line_number = data_str.split('\n').length - 1;
            console.log(line_number);
        }
        else {
            console.log(err, "there is an error!!");
        }
    });
}

print_lines(process.argv[2]);