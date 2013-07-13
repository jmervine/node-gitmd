# node-gitmd

Get and parse markdown from github.

Tests status is: [![Build Status](https://travis-ci.org/jmervine/node-gitmd.png?branch=master)](https://travis-ci.org/jmervine/node-gitmd)
On:
- 0.8
- 0.10

## Install

> Node: still under development, going to publish an npm once complete and in
> real world use.

    $ npm isntall github jmervine/node-gitmd

## Usage Example

    var GitMD = require('gitmd');
    var gdown = new GitMD({
        // required
        user: 'jmervine',
        project: 'node-gitmd',

        // optional
        ext: 'md',              // default
        protocol: 'https',      // default
        host: 'raw.github.com', // default
        branch: 'master',       // default

        //root: 'content/pages',  // default is ''
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
    console.log('starting on 8000');

