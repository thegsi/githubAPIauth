var https = require('https');
var http = require('http');
var port = process.env.PORT || 8000;
//var env = require('env2')('./config.env');
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/index.html');

function handler(req, res) {
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(index);
  } else if (req.url.indexOf('/username') > -1) {
    var username = req.url.split("/")[2];
    var password = req.url.split("/")[3];
    console.log("In back end", password, username);

    var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

    var postData = JSON.stringify({
      'msg': 'Hello World!'
    });

    var options = {
      hostname: 'api.github.com',
      path: '/repos/kat4/meow/issues',
      method: 'POST',
      headers: {
        'user-agent': 'matt is nice',
        'Authorization': auth
      }
    };

    var req = https.request(options, function(res) {
      var body = '';
      console.log('in body', body)
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        console.log(body);
      });
    });

    req.on('error', function(e) {
      console.log(e);
    });

    // write data to request body
    req.write(postData);
    req.end();

  } else {
    var ext = req.url.split('.')[1];
    fs.readFile(__dirname + req.url, function(err, file) {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text' + ext
        });
        res.end();
      } else {
        res.writeHead(200, {
          'Content-Type': 'text' + ext
        });
        res.end(file);
      }
    });
  }
}



http.createServer(handler).listen(port);
console.log('listening on port 8000');
