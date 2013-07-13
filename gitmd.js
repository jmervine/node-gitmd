var Markdown = require('node-markdown').Markdown;
var http;

function GitMD(opts) {
    if (!opts) { throw new Error('missing user and project'); }
    if (!opts.user) { throw new Error('missing user'); }
    if (!opts.project) { throw new Error('missing project'); }

    this.user     = opts.user;
    this.project  = opts.project;

    this.host     = opts.host     || 'raw.github.com';
    this.protocol = opts.protocol || 'https';
    this.branch   = opts.branch   || 'master';
    this.root     = opts.root     || '';
    this.ext      = opts.ext      || 'md';

    http = require(this.protocol);
}

GitMD.prototype = {
    gitpath: function (path) {
        if (!path) {
            throw new Error('path required');
        }
        var uri = [
            this.host,
            this.user,
            this.project,
            this.branch
        ];
        if (this.root) {
            uri.push(this.root);
        }
        uri.push(path);
        return this.protocol + '://' + uri.join('/') + '.' + this.ext;
    },

    fetch: function (path, callback) {
        var mdown = '';
        var time = Date.now();
        var mark = function () {
            return Date.now() - time;
        };

        http.get(this.gitpath(path), function (res) {
           res.setEncoding('utf8');
           res.on('data', function (chunk) {
               mdown += chunk;
           });
           res.on('error', function (error) {
               res.end();
               callback(error, null, null);
           });
           return res.on('end', function () {
               var bm = mark();
               callback(null, Markdown(mdown), bm);
           });
        }).on('error', function (error) {
           callback(error, null, null);
        });
    }
};

module.exports = GitMD;
