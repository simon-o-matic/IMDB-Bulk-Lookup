// IMDB Bulk Lookup 
// By Simon Raik-Allen

var fs = require('fs');
var http = require('http');

var SEND_PAUSE = 1200;		// time to wait between sending lookup requests

var options = {
  host: 'imdbapi.org',
  path: '/'
};

var fileName = process.argv[2];
if (!fileName) {
	console.log("Usage: node " + process.argv[1] + " <filename>")
	process.exit(1);
}

// Get the movie names from file
var movieNames;
try {
	movieNames = fs.readFileSync(fileName).toString().split("\n");
	movieNames.pop(); // no idea why there is an extra line at the end
} catch (e) {
	console.log(e.message);
	process.exit(1);
}

// step through the list
function processMovieName(i) {
	if (i >= movieNames.length) return;

    options.path = "/?limit=5&q=" + encodeURIComponent(movieNames[i]);

    // ask IMDB to search for the title
	http.get(options, processResponse(movieNames[i])).on('error', function(e) {
  		console.log('ERROR: ' + movieNames[i] + "::" + e.message);
	});

	// pause a little before sending so we don't blow the API throttling limit
	setTimeout(next(i+1), SEND_PAUSE);
}

function next(i) {
	var i = i;
	return function () {
		processMovieName(i);
	}
}

function processResponse(name) {
	var movieName = name;

	return function(response) {
  		if (response.statusCode == 200) {
			var body = '';
	  		response.on('data', function (chunk) {
	    		body += chunk;
	  		});
	  		response.on('end', function () {
	  			body = JSON.parse(body);

	  			if (body.code) {
	  				console.log(body.code + ": " + body.error + ": " + movieName);
	  			} else {
	  				// loop over each of the possible 5 results
	  				var theMovie = body[0];
	  				if (body.length > 1) {
		  				for (j in body) {
		  					if (body[j].title == movieName) {
		  						theMovie = body[j];
		  					}
		    			}
					}
					// we now have the movie
    				console.log(movieName + ", " +theMovie.title + ", " + theMovie.rating + ", " + theMovie.rated + ", " + theMovie.genres);
	    		}
	  		});
	  	} else {
	  		console.log("ERROR: " + response.statusCode);
	  	}
	}
}

// start
processMovieName(0);

