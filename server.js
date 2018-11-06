
// NOTES FOR GIT AND GITHUB
/*
	Step 1. Run 'git init' in the terminal from inside the project directory. This creates the hidden .git file
	Step 2. Run 'ls -a' in the terminal. This lists files in the project directory and I can confirm that the .git file was created
	Step 3: Run 'git status' to see a list of folders/files that git sees.
	Step 4: Use 'git add <<file or folder>>' to add.
*/







// REQUIRE
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');



// SETUP EXPRESS AS SERVER
var app = express();



// EXPRESS PARTIALS - register the use of partials with express. a partial is a chunk of code that we use everywhere (head, footer, css, etc.)
hbs.registerPartials(__dirname + '/views/partials');



// EXPRESS MIDDLEWARE (extends function of express)

// EXPRESS MIDDLEWARE VIEW ENGINE - uses handlebars to inject dynamic data and setup html templates
app.set('view engine', 'hbs');

// EXPRESS MIDDLEWARE REQUEST LOGGING
app.use((request, response, next) => {
	var now = new Date().toString();
	var log = `${now}: ${request.method} ${request.url}`;

	console.log(log);
	fs.appendFile('server.log',log + '\n',(err) => {
		if (err) {
			console.log('Unable to append to server.log file.');
		}
	});
	next(); // without next, the app will stop and not ever complete loading
});

// EXPRESS MIDDLEWARE MAINTENANCE (TAKE SITE DOWN)
app.use( (request, response, next) => {
	response.render('maintenance.hbs');
});

// EXPRESS MIDDLEWARE RENDER STATIC DIRECTORY
app.use(express.static(__dirname + '/public')); // serves a static directory


// REGISTER HELPERS
// helpers are basically global functions
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});


// ROUTES
app.get('/',(request, response) => {
	response.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to our website!'
	});
});

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad',(request, response) => {
	response.send({
		errorMessage: 'Unable to handle request'
	});
});

// START SERVER ON PORT XXXX
app.listen(3000, () => {
	console.log('Server is up on port 3000.')
});