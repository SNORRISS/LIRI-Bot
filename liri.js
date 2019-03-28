require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");


var spotify = new Spotify(keys.spotify);

var searchType = process.argv[2];

var query = process.argv;
query.shift();
query.shift();
query.shift();

query = query.join(" ");

function concert(){

    axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp").then(
        function(response){
            console.log("Concerts for " + query);

            for(var i = 0; i < response.data.length; i++){
                console.log("--------------------------");
                console.log("Venue: " + response.data[i].venue.name);
                console.log("City: " + response.data[i].venue.city);
                console.log("Date: " + response.data[i].datetime);
                //console.log("--------------------------");

            }
            
        }
    );



}

function spotifySearch(){

    spotify.search({ type: 'track', query: query }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log("Artist: " + data.tracks.items[0].artists[0].name); 
      console.log("Song: " + data.tracks.items[0].name); 
      console.log("Preview: " + data.tracks.items[0].preview_url); 
      console.log("Album: " + data.tracks.items[0].album.name); 



      });

}

function movie(){

    axios.get("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
          // Then we print out the imdbRating
          console.log("Title: " + response.data.Title);
          console.log("Year: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.Ratings[0].Value);
          console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
          console.log("Country: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
      
      
        }
      );

}

if(searchType == "concert-this"){
   concert();

}else if(searchType == "spotify-this-song"){

    spotifySearch();

}else if(searchType == "movie-this"){

    movie();

}else if(searchType == "do-what-it-says"){

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);
      
      });

}else{

    console.log("please enter a valid command");

}
