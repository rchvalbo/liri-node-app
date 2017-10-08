var Spotify = require('node-spotify-api');
var Request = require('request');
var Twitter = require('twitter');
var Client = require('./keys');

/*
 * 'spotifyThis' method can be called when searching for song data.
 */
var spotifyThis = function (songName) {

    var thisObj = new Object();
    var spotify = new Spotify(Client.spotifyKeys);

    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var tracksFound = data.tracks.items;

        tracksFound.forEach(function (thisTrack) {

            var artistList = thisTrack.artists;
            var artists;
            artistList.forEach(function (thisArtist) {
                thisObj.artists = [];
                thisObj.artists.push(thisArtist.name);
            })
            thisObj.songName = thisTrack.name;
            thisObj.songLink = thisTrack.href;
            thisObj.album = thisTrack.album.name;

            console.log(thisObj);

        })

    });
}

/*
 * 'getTweets' method can be called when gathering user tweets
 * Includes all userName mentions
 * Required: twitterHandle and number of tweets to return
 */
var getTweets = function (handle, numTweets) {

    var params = {
        screen_name: handle,
        count: numTweets
    };

    var twitter = new Twitter(Client.twitterKeys);

    twitter.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            tweets.forEach(function (tweet) {
                console.log("Date/Time Posted: " + tweet.created_at + "\n" + tweet.text + "\n\n");
            })
        } else {
            console.log(error);
        }
    });
}

/*
 * 'movieThis' method can be called when searching for movie data.
 */
var movieThis = function (movieTitle) {
    
    var searchURL = 'http://www.omdbapi.com/?' + 't=' + encodeURIComponent(movieTitle) + '&apikey=40e9cece';
    
    Request(searchURL, function (error, response, body) {

        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {

            // Then we print out the JSON Information we need...
            console.log("The movie's title is: " + JSON.parse(body).Title + "\nDate released: " + JSON.parse(body).Year + "\nIMDB rating: " + JSON.parse(body).Ratings[0].Value + "\nRotten Tomatos: " + JSON.parse(body).Ratings[1].Value + "\nCountries where they filmed: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\n");
            
        }
    });
}


exports.movieThis = movieThis;
exports.getTweets = getTweets;
exports.spotifyThis = spotifyThis;
