var listOfKeys = require("./keys.js");	//twitter & spotify
var request = 	 require("request");	//OMDB

//get filestream request
var fs = require("fs");

var glob = "bob";
//Twitter
//Store Twitter credentials of particualr user
var client = listOfKeys.twitterKeys;

//Spotify
//Store Spotify credentials of a particular user
var spotify = listOfKeys.spotifyKeys;

//Store all the arguments into array
var nodeArgs = process.argv;

//create 3 empty variables, depending on the third command-line arg
//(	1) my-tweets, 2)spotify-this-song 3) movie-this) we use one of 
//these variables to stroe the entire commandline-arg starting from 
//arg3[2] to arg4[3]
var movieName = "";

var songName = "";



//Use switch-stmt to determine which function to execute by
//checking 3rd Argument(process.argv[2])
switch(process.argv[2])
{
	//OMDB
	case "movie-this":
	omdb();
	break;

	//Twitter
	case "my-tweets":
	twitter();
	break;

	//Spotify
	case "spotify-this-song":
	spotifyy();
	break;

	case "do-what-it-says":
	doWhatItSays();
	break;

}

//Check to see at the very beginning if the argument is a read file(do-what-it-says)
//command so we can read the file and know which command in (random.txt) we will execute
//which is one of the 3 commands inside switch-stmt
function doWhatItSays()
{
	
		//read the content of a file.
		//NOTE: changing a global variable inside fs.readfile function
		//      will not be recognized outside of that functions.
		fs.readFile("random.txt", "utf8", function(err, data)
		{
			var dataArr = data.split(",")

			//Error Handler
			if(err)
			{
				return console.log(err);
			}

			//parse the textfile and store each command inside nodeArgs array in order
			//to determine which function in switch to execute and which song.

			//Change third argument to first element inside text file so that the switch
			//knows which function to execute
			var thirdArg = dataArr[0]

			//since nodeArgs[3](4th Argument) is currently blank store the second element
			//of random.txt aka data[1] inside nodeArgs[3] so that it can search for a song
			// or movie depending on the command(data[0]).
			nodeArgs[3] = dataArr[1];

			if(thirdArg === "spotify-this-song")
			{
				spotifyy();
			}
			else if(thirdArg === "movie-this")
			{
				omdb();
			}
			else if(thirdArg === "my-tweets")
			{
				twitter();
			}	
		
		});
	
}


//OMDB function
function omdb()
{
	//if-else stmt check to see if user enters a movie title. 
	//(process.argv[3]) is the fourth argument we use to check.
	if(process.argv[3] == undefined)
	{
		//Execute default movie (Mr.Nobody)
		default_movie();
	}
	else
	{
		
		//Loop through all the movie arguments and if there is a 
		//space between movie title workds then add "+" between them.
		for(var i = 3; i < nodeArgs.length; i++)
		{
			if(i > 3 && i < nodeArgs.length)
			{
				movieName = movieName + "+" + nodeArgs[i];		//EX: The Heat = The+Heat
			}
			else
			{
				movieName = movieName + nodeArgs[i];
			}

		}
		

		//Then run a request to the OMDB API with the movie specified
		var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

		request(queryUrl, function(error, response, body)
		{
			//if the request is successful(i.e. if the response status code 200)
			if(!error && response.statusCode === 200)
			{
				
				//Parse the body of site and recover the Title, Year, rating, etc
				console.log("The Title: " + JSON.parse(body).Title);
				console.log("Year Released: " + JSON.parse(body).Year);
				console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
				console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
				console.log("Country: " + JSON.parse(body).Country);
				console.log("Language: " + JSON.parse(body).Language);
				console.log("Plot: " + JSON.parse(body).Plot);
				console.log("Actors: " + JSON.parse(body).Actors);
				
			}
		});
	}
}

//OMDB default Mr.Nobody function
function default_movie()
{
	//Then run a request to the OMDB API with the default movie Mr.Nobody
	var queryUrl = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body)
	{
			//if the request is successful(i.e. if the response status code 200)
			if(!error && response.statusCode === 200)
			{
				//Parse the body of site and recover the Title, Year, rating, etc
				console.log("The Title: " + JSON.parse(body).Title);
				console.log("Year Released: " + JSON.parse(body).Year);
				console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
				console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
				console.log("Country: " + JSON.parse(body).Country);
				console.log("Language: " + JSON.parse(body).Language);
				console.log("Plot: " + JSON.parse(body).Plot);
				console.log("Actors: " + JSON.parse(body).Actors);
			}
	});
}

//Twitter
function twitter()
{
	var params = 
	{
		q: 'JoeASU1',	//Query term: username(JoeASU1) NOTE: this displays every tweet related to this term
		count: 20		//number of tweets we want to display

	}; 					//this is the param variable which will have key and value,
						//the key is the keyword which we are interested in searching 
						//and count is the count of it


	client.get('search/tweets', params, searchedData); // get is the function to search the tweet which three paramaters 'search/tweets',params and a callback function.

	function searchedData(err, data, response) 
	{
		var tweets = data.statuses;

		//Try: console.log(data) to understand how we reach a certain property value or key

		for(var i = 0; i < tweets.length; i++)
		{
			//Display when particular tweet was created
			console.log(tweets[i].created_at);

			//Display Tweet
			console.log(tweets[i].text);

			//Create a newline so it looks neater
			console.log("");
		}


	} // searchedData function is a callback function which returns the data when we make a search
}

//Spotify functions
function spotifyy()
{
	//console.log(nodeArgs[2]);
	//if-else stmt check to see if user enters a movie title. 
	if(process.argv[3] == undefined)
	{
		//Execute default song ("The Sign" by Ace of Bace)
		default_song();
	}
	else
	{
		
		//Loop through all the movie arguments and if there the argument size is args[4] or greater
		//then add a space between each argument word of song title: EX; AllTheSmallThings = All The Small Things
		for(var i = 3; i < nodeArgs.length; i++)
		{
			
			if(i > 3 && i < nodeArgs.length)
			{
				songName = songName + " " + nodeArgs[i];		//EX: The Heat = The+Heat
			}
			else
			{
				songName = songName + nodeArgs[i];
			}
			
		}
		
		
		//Then run a request to the Spotify API with the song name specified
		spotify.search(
		{ 
			type: 'track', 
			query: songName
		})
		.then(function(response) 
		{
			//Try console.log(JSON.stringify(response, null, 2)); to see how we reach a certain property value or key.
			
			
			//The Artist Name
			
    		//console.log(JSON.stringify("Artist Name: " + response.tracks.items[0].album.artists[0].name, null, 2));
    		console.log(JSON.stringify("Artist Name: " + response.tracks.items[0].artists[0].name, null, 2));

    		//Song Name
    		console.log(JSON.stringify("Song Name: " + response.tracks.items[0].name, null, 2));

    		//Preview Link
    		console.log("Preview Link: " + JSON.stringify(response.tracks.items[0].album.artists[0].external_urls.spotify, null, 2));

    		//The Album of the song
    		console.log("Album: " + JSON.stringify(response.tracks.items[0].album.name, null, 2));

    		//newline
    		console.log("");
    	
			
		})
		.catch(function(err) 
		{
    		console.log(err);
		});
		
	}
}

function default_song()
{
		//Then run a request to the Spotify API with the defaul song name specified
		spotify.search(
		{ 
			type: 'track', 
			query: "The Sign(US Album)"
		})
		.then(function(response) 
		{
			//Try console.log(JSON.stringify(response, null, 2)) to see how we reach a certain property value or key.
			
			//The Artist Name
    		console.log(JSON.stringify("Artist Name: " + response.tracks.items[0].album.artists[0].name, null, 2));

    		//Song Name
    		console.log(JSON.stringify("Song Name: " + response.tracks.items[0].name, null, 2));

    		//Preview Link
    		console.log("Preview Link: " + JSON.stringify(response.tracks.items[0].album.artists[0].external_urls.spotify, null, 2));

    		//The Album of the song
    		console.log("Album: " + JSON.stringify(response.tracks.items[0].album.name, null, 2));

    		//newline
    		console.log("");

		})
		.catch(function(err) 
		{
    		console.log(err);
		})
}