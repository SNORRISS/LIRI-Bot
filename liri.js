require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");

var spotify = new Spotify(keys.spotify);

var searchType = process.argv[2];

var query = process.argv;
query.shift();
query.shift();
query.shift();

query = query.join(" ");

if(searchType == "concert-this"){
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


}else if(searchType == "spotify-this-song"){

    spotify.search({ type: 'track', query: query }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log("Artist: " + data.tracks.items[0].artists[0].name); 
      console.log("Song: " + data.tracks.items[0].name); 
      console.log("Preview: " + data.tracks.items[0].preview_url); 
      console.log("Album: " + data.tracks.items[0].album.name); 



      });

}else if(searchType == "movie-this"){

}else if(searchType == "do-what-it-says"){

}else{

    console.log("please enter a valid command");

}
