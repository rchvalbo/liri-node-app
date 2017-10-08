var Request = require('request');
var Client = require('./keys');
var Commands = require('./commands');
var fs = require('fs');

var command = process.argv[2];

//Execute API searches only if request matches viable LIRI command
if (command === "my-tweets") {

    var handle = process.argv[3];
    var numTweets;

    if (isNaN(parseInt(process.argv[4]))) {
        numTweets = 20;
    } else {
        numTweets = parseInt(process.argv[4]);
    }

    /*
     * Here we use the 'getTweets' method from the Commands.js module
     */
    Commands.getsTweets(handle, numTweets);

} else if (command === "spotify-this-song") {

    var thisObj = new Object();
    var songName;

    //default to 'The Sign'
    if (typeof process.argv[3] === 'undefined') {
        console.log("No Song Entered! Reverting to defaults...");
        songName = "The Sign";
    } else {
        songName = process.argv[3];
    }

    /*
     * Here we use the 'spotifyThis' method from the Commands.js module
     */
    Commands.spotifyThis(songName);

} else if (command === "movie-this") {

    var movieTitle;

    //default to 'Mr. Nobody'
    if (typeof process.argv[3] === 'undefined') {
        console.log("No Movie Entered! Reverting to defaults...\n");
        movieTitle = "Mr.Nobody";
    } else {
        movieTitle = process.argv[3];
        movieTitle.split(' ').join('+');
    }

    /*
     * Here we use the 'movieThis' method from the Commands.js module
     */
    Commands.movieThis(movieTitle);

} else if (command === "do-what-it-says") {

    // Asynchronous read
    fs.readFile('random.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }

        var dataString = data.toString();
        var dataArray = dataString.split(',');
        console.log("Command: " + dataArray[0] + "\nValue: " + dataArray[1]);

        if (dataArray[0] == "my-tweets") {

            var handle = dataArray[1];
            var numTweets;

            if (dataArray[2] === undefined) {
                numTweets = 20;
            } else {
                numTweets = parseInt(dataArray[2]);
            }

            /*
             * Here we use the 'getTweets' method from the Commands.js module
             */
            Commands.getsTweets(handle, numTweets);

        } else if (dataArray[0] == "spotify-this-song") {
            var thisObj = new Object();
            var songName;

            //default to 'The Sign'
            if (dataArray[1] === 'undefined') {
                console.log("No Song Entered! Reverting to defaults...");
                songName = "The Sign";
            } else {
                songName = dataArray[1];
            }

            /*
             * Here we use the 'spotifyThis' method from the Commands.js module
             */
            Commands.spotifyThis(songName);

        } else if (dataArray[0] == "movie-this") {

            var movieTitle;

            //default to 'Mr. Nobody'
            if (dataArray[1] === 'undefined') {
                console.log("No Movie Entered! Reverting to defaults...\n");
                movieTitle = "Mr.Nobody";
            } else {
                movieTitle = dataArray[1];
                movieTitle.split(' ').join('+');
            }

            /*
             * Here we use the 'movieThis' method from the Commands.js module
             */
            Commands.movieThis(movieTitle);

        }

    });

} else {
    console.log("LIRI: hmmm, I don't think I understand what you want.");
}
