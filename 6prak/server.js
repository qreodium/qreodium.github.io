let http = require('http');
let fs = require('fs');
let url = require('url');
let qs = require('querystring');

let auth = false;

function authorization(request, response)
{
  let body = '';
	request.on('data', function (data) {
        body += data;
    });
	request.on('end', function () {
        let post = qs.parse(body);
		    verify(post['login'], post['password'], response);
    });
};

function verify(login, pass, response)
{
	let found = false;
	fs.readFile("users.json", function(err, file){
		let data = JSON.parse(file);
		for (let i = 0; i < data.users.length; i++) {
			if (data.users[i].login == login && data.users[i].password == pass)
			{
				console.log("(Вход выполнен!)");
				auth = true;
				response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
				fs.createReadStream(__dirname + '/register.html').pipe(response);
				found = true;
				return;
			}
		}
		if (found == false)
		{
			console.log("(Ошибка входа!)");
			response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			fs.createReadStream(__dirname + '/auth.html').pipe(response);
		}
	});
}

let server = http.createServer(function (request, response) {
	console.log(request.url);
	switch (request.url) {
		case '/index':
			response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			fs.createReadStream(__dirname + '/index.html').pipe(response);
			break;
		case '/text':
			response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
			response.end("Привет, мир!");
			break;
		case '/':
			response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			fs.createReadStream(__dirname + '/index.html').pipe(response);
			break;
		case '/json':
			response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
			fs.createReadStream(__dirname + '/users.json').pipe(response);
			break;
		case '/auth':
			if (auth == false) {
				if (request.method == 'POST')
					authorization(request, response);
				else
				{
					response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
					fs.createReadStream(__dirname + '/auth.html').pipe(response);
				}
			}
			else {
				response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
				fs.createReadStream(__dirname + '/register.html').pipe(response);
			}
			break;
		case '/image':
			response.writeHead(200, {'Content-Type': 'image/jpeg; charset=utf-8'});
			fs.readFile("./image.jpg", function(err, image){response.end(image);});
			break;
		default:
			response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
			fs.createReadStream(__dirname + '/404.html').pipe(response);
			break;
	}
});
let ip = 'localhost';
let port = 8000;
server.listen(port, ip);
console.log(`Server listen on: http://${ip}:${port}/`);
console.log("Open URI log:");
