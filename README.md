IMDB-Bulk-Lookup
================

A Node.js program that you pass in a file containing movie titles and it looks them up on 
IMDB and brings back the rating and other stuff. Uses the imdbapi.org API to perform the search.

It ain't perfect but it doesn't do a bad job. Give it good titles and it will do a better job.

Run it like this:

	> node imdb-bulk-lookup sample_movies.txt

And it will respond with this:

	Star Wars A New Hope, Star Wars, 8.8, PG, Action,Adventure,Fantasy,Sci-Fi
	404: Film not found: This title doesn't exist
	28 days later, 28 Days Later..., 7.6, R, Horror,Sci-Fi,Thriller

The colunmns it returns are

	The name you searched for, the title it found, the score, the rating, a list of genres.

I'm open to suggestions for new features so feel free to submit pulls.

Enjoy,
Simon Raik-Allen.
