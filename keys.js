//newline
console.log("");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var twitterKeys = new Twitter(
{

  consumer_key: 'Fk1zgn31cZgBNhmEKpJQy6BnC',
  consumer_secret: 'xa6lzSG9TzE5wsGraCXLRxR3a2bfK2GBPP4hRZpKEg8AAFnyr3',
  access_token_key: '910628705969377280-O1mf0ZKO53HNpj2CEbujDm6TA97Qzxl',
  access_token_secret: '8PaP1R8pTlKTUmrAt0Dd6B2wPxZS8BhiMFt6ORLyypGCE'
});


var spotifyKeys = new Spotify(
{
  id: "2929e2adebf44298ada840e0e595734c",
  secret: "d3d2059dfa3a49728b6dbad1d106c40e"
});

/*
module.exports = essentials;
module.exports = twitterKeys;
module.exports = spotifyKeys;
*/
//exports
module.exports = 
{
	twitterKeys: twitterKeys,
	spotifyKeys: spotifyKeys

};
