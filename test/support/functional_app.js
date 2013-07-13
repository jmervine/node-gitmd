var GitMD = require('../../gitmd');
var gdown = new GitMD({
    // required
    user: 'jmervine',
    project: 'node-gitmd'
});

var http = require('http');

var head = '<html><body>';
var foot = '</body></html>';

var http = require('http');
http.createServer(function (req, res) {
    gdown.fetch(req.url, function (err, mdown, bm) {
        foot += '<!-- benchmark ' + bm + ' -->';
        if (err !== null) {
            res.writeHead(err.statusCode, { 'Content-Type': 'text/html' });
            res.end('GitMD couldn\'t find: ' + err.url + '\n');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(head+mdown+foot+'\n');
    });
}).listen(8000);

console.log('functional_app.js starting on 8000');
process.send({app:'connect'});

