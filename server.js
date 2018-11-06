
// NOTES FOR GIT (GIT runs locally as a piece of software. this DOES NOT push anything to github)
/*
	Step 1. Run 'git init' in the terminal from inside the project directory. This creates the hidden .git file
	Step 2. Run 'ls -a' in the terminal. This lists files in the project directory and I can confirm that the .git file was created
	Step 3: Run 'git status' to see a list of folders/files that git sees.
	Step 4: Use 'git add <<file or folder>>' to add.
	Step 5: Create a .gitignore file in root of project. Add all files or folders we want to ignore and not have tracked by git
	Step 6: Add .gitignore to list of tracked files by git (see step 4)
*/

/*
	NOTES FOR HEROKU
	1. Add "start": "node server.js" to scripts in package.json file. This servers 2 purposes: 1. It allows heroku to start the app. 2. Instead of us running node <<filename>> to start our app, we can run npm start
*/







// REQUIRE
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// FOR HEROKU, THEY SET THE PORT DYNAMICALLY. SO WE NEED TO SET A VARIABLE TO SET THE PORT, OR USE 3000 IF IT DOESN'T EXIST
const port = process.env.PORT || 3000;

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
// app.use( (request, response, next) => {
	// response.render('maintenance.hbs');
// });

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
app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});