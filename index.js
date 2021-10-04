const http = require("http");

function env(prop, defValue) {
	return (prop in process.env) ? process.env[prop] : defValue;
}

const app_port = env('APP_PORT', 3000);
const db_client = env('DATABASE_CLIENT');

const sql = !!db_client ? require(db_client) : null;

function connectDb(config, cb) {
	if (sql) {
		//console.log(config);
		var dbConn = sql.createConnection(config);
		dbConn.connect(function(err) {
			if (err) {
				console.error("Database connection failed!", err);
				cb(err);
			}
			else {
				console.log("Database connected successfully!", dbConn);
				dbConn.destroy();
				cb(err);
			}
		});
	}
	else {
		console.log(`No DB configuration. Skipping...`);
		cb();
	}
}

var config = {
	host:       env('DATABASE_HOST', 'localhost'),
	port:       env('DATABASE_PORT', 3306),
	database:   env('DATABASE_NAME', 'somedb'),
	user:       env('DATABASE_USERNAME', 'username'),
	password:   env('DATABASE_PASSWORD', 'password')
};

connectDb(config, function (err, res) {
	if (err) {
		console.error(`Bootstrapping failed. Shutting down HTTP server...`);
		return;
	}

	console.log(`Bootstrapping succeeded. Starting HTTP server...`);
	http.createServer(function (request, response) {
		// Send the HTTP header 
		// HTTP Status: 200 : OK
		// Content Type: text/plain
		response.writeHead(200, {'Content-Type': 'text/plain'});

		// Send the response body as "Hello World"
		response.end(`Hello World at ${new Date().toISOString()}\n`);
	}).listen(app_port);

	process.stdout.write(`Listening on port ${app_port}\n`);
});
