var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'plain/text' });
    res.end('# Hello Test!\n');
}).listen(8000);

process.send({app:'connect'});