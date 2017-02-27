
var fs =  require('fs');
var path = require('path');

var filter_files = function ( fileName, type, callback ) {
    fs.readdir(fileName, function(err, data) {
        if(err){
            callback(err);
        }
        else{
            data = data.filter(function (file) {
                return path.extname(file) === '.' + type;
            });

            callback(null, data);
        }
    });
};


module.exports = filter_files;