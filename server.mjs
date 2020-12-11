import http from 'http';
import fs from 'fs';
import path from 'path';

const mimeTypes = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.png': 'image/png',
	'.jpg': 'image/jpg',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.wav': 'audio/wav',
	'.mp4': 'video/mp4',
	'.woff': 'application/font-woff',
	'.ttf': 'application/font-ttf',
	'.eot': 'application/vnd.ms-fontobject',
	'.otf': 'application/font-otf',
	'.wasm': 'application/wasm'
};

http.createServer((request, response) => {
	console.log('Request ', request.url);

	const url = request.url === '/' ? '/index.html' : request.url;
	const filePath = `./www${url}`;
	const extname = String(path.extname(filePath)).toLowerCase();
	const contentType = mimeTypes[extname] || 'application/octet-stream';

	fs.readFile(filePath, (error, content) => {
		if (error) {
			if (error.code == 'ENOENT') {
				response.writeHead(404, { 'Content-Type': 'text/plain' });
				response.end('404 not found', 'utf-8');

				return;
			}

			response.writeHead(500, { 'Content-Type': 'text/plain' });
			response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');

			return;
		}

		response.writeHead(200, { 'Content-Type': contentType });
		response.end(content, 'utf-8');
	});
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');
