
var fs =  require('fs'),
path = require('path');

function filter_files( fileName, type ) {
    fs.readdir(fileName, function(err, data) {
        if(!err) {
            var res = data.filter(function(item){
                if(path.extname(item) == '.' + type){
                    console.log(item);
                    return true;
                }
                return false;
            });
            
        }
        else {
            console.log(err, 'there is an error!!');
        }
    })
}


filter_files(process.argv[2], process.argv[3]);