'use strict';

var http = require('http');
const execSync = require('child_process').execSync;
const deployOptions = require('./deploy.json');
const PORT = deployOptions.port; 

function handleRequest(req, resp) {
	const site = findSite(req.url);

	if (site === undefined) {
		responseError(resp, 404, '404: Not found');
		return;
	}

	resp.writeHead(200, { "Content-Type": "text/html" });

	try {
		const output = deploy(site);
		output.forEach(o => {
			resp.write('<p>');
			resp.write(o.toString().replace(/\n/ig, '<br/>'));
			resp.write('</p>');
		});
	} catch (err) {
		responseError(resp, 500, err);
		return;
	}

    resp.end();
}

function responseError(resp, code, msg) {
	resp.writeHead(code, { "Content-Type": "text/plain" });
	resp.write(msg)
	resp.end();
}

function findSite(url) {
	const sites = deployOptions.sites;
	for (let i = 0, len = sites.length; i < len; i++) {
		const site = sites[i];
		if (site.url.toLowerCase() === url.toLowerCase()) {
			return site;
		}
	}
	return undefined;
}


function deploy(site) {
	const url = site.url;
	const workingDir = site.workingDir;	
	const scripts = site.scripts || [];

	const processOptions = {};	
	if (workingDir) {
		processOptions.cwd = workingDir;
	}

	const output = [];
	let hasError = false;
	try {
		// print out the url of the deployment
		output.push(execSync(`echo "deploying: ${url}"`, processOptions));

		scripts.forEach(script => {
			output.push(execSync(script, processOptions));			
		})
	} catch (err) {
		hasError = true;		
		output.push(err);
	}

	return output;
}

//Create a server
var server = http.createServer(handleRequest);
server.listen(PORT, function(){
    console.log("Server listening on port: %s", PORT);
});
