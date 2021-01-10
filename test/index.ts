var fs = require('fs');
var path = require('path');
var files = fs.readdirSync(__dirname + '/dialects');

for (var i = 0, file; file = files[i]; i++)
{
    var filePath = path.join(__dirname + '/dialects', file);
    if (path.extname(file) === '.ts')
    {
        require(filePath);
    }
}
