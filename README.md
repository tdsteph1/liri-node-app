# liri-node-app

In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI will display your latest tweets. As we do not want to display your personal account, or its keys, please make an alias account and add a few tweets to it!
Make a new GitHub repository called liri-node-app and clone it to your computer.
To retrieve the data that will power this app, you'll need to send requests to the Twitter, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.

* Twitter
* Spotify
* Request
        * You'll use Request to grab data from the OMDB API.
 
 
 We will use a switch statement where user will type in an argument and the switch will determine which api function to execute.
 
 ## node liri.js movie-this
![Img1](https://github.com/tdsteph1/liri-node-app/blob/master/public/images/img1.png)
We use the omdb API to display movies. Since there are no arguments after *movie-this* the default movie will display *Mr.Nobody*

## node liri.js movie-this Terminator 2
![Img2](https://github.com/tdsteph1/liri-node-app/blob/master/public/images/img2.png)
This time we provide the argument *Terminator2* and the API searches for movie and displays the results in JSON Format.

 ## node liri.js my-tweets
![Img3](https://github.com/tdsteph1/liri-node-app/blob/master/public/images/img3.png)
The twitter api searches my user account and displays tweets i've made on twitter.

 ## node liri.js spotify-this-song 
![Img4](https://github.com/tdsteph1/liri-node-app/blob/master/public/images/img4.png)
Spotify will return songs info. Since there are no arguments after *spotify-this-song* the default song is * The Sign* by *Ace Of Bace *

 ## node liri.js spofify-this-song Magical Mystery Tour
![Img5](https://github.com/tdsteph1/liri-node-app/blob/master/public/images/img5.png)
This time we pass in an argument * Magical Mystery Tour * and Spotify API returns data that pertains to The Beatles song.



