var keys = require("./keys.js")
var req = require("request")
var moment = require('moment');
var Spotify = require("node-spotify-api")
moment().format();
var fs = require("fs")

var spotify = new Spotify(keys.spotify)

var command = process.argv[2]
var query = process.argv.slice(3).join(" ");

if (command == "concert-this") {
    req("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp", function(err, response, body) {
        var data = JSON.parse(body)[0]
        var venue = data.venue.name
        var city = data.venue.city
        var date = data.datetime
        console.log(venue)
        console.log(city)
        console.log(date)
    })
}

else if (command == "spotify-this-song") {
    spotifyCall()
}

else if (command == "movie-this") {
    req("http://www.omdbapi.com/?t="+ query + "&apikey=trilogy", function(err, response, body) {
        var data = JSON.parse(body)
        //console.log(data)
        var title = data.Title
        var year = data.Year
        var iRating = data.imdbRating
        var rRating = data.Ratings[0].Value
        var country = data.Country
        var lang = data.Language
        var plot = data.Plot
        var actors = data.Actors
        console.log(title)
        console.log(year)
        console.log(iRating)
        console.log(rRating)
        console.log(country)
        console.log(lang)
        console.log(plot)
        console.log(actors)
    })
}

else if (command == "do-what-it-says") {
    fs.readFile(function(err, response) {
        if (err) throw err
        query = response
        spotifyCall()

    })
}

else {
    console.log("That is not a valid command.")
}

function spotifyCall() {
    if (query.trim() == "") {
        query = "The Sign Ace of Base"
    }
    spotify.search({type: "track", query: query}).then(function(response) {
        var data = response.tracks.items[0]
        //console.log(data)
        var artist = data.album.artists[0].name
        var song = data.name
        var link = data.album.external_urls.spotify
        var album = data.album.name
        console.log(artist)
        console.log(song)
        console.log(link)
        console.log(album)
    }).catch(function(err) {
        console.log(err)
    })
}