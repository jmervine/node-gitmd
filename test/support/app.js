var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'plain/text' });
    res.end('# Hello Test!\n');
}).listen(8008);

try {
    process.send({app:'connect'});
} catch(e) {
    console.log('app.js starting on 8002');
}
