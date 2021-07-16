const http = require("http");

const app_port = process.env.APP_PORT || 3000;

http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end(`Hello World at ${new Date().toISOString()}\n`);
}).listen(app_port);

process.stdout.write(`Listening on port ${app_port}\n`);
