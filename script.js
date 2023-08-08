// Import the 'node-fetch' module if you're using Node.js
// const fetch = require('node-fetch');

// Replace with an actual series ID
const seriesId = 'your_actual_series_id';
const url = `https://moviesdatabase.p.rapidapi.com/titles/series/${seriesId}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4735d31250msh2b8b785e5128f79p19e220jsn494a51118e18',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

async function fetchSeriesData() {
	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

// Call the asynchronous function
fetchSeriesData();

 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
	 height: '390',
	 width: '640',
	 videoId: 'M7lc1UVf-VE',
	 playerVars: {
	   'playsinline': 1
	 },
	 events: {
	   'onReady': onPlayerReady,
	   'onStateChange': onPlayerStateChange
	 }
   });
 }

 // 4. The API will call this function when the video player is ready.
 function onPlayerReady(event) {
   event.target.playVideo();
 }

 // 5. The API calls this function when the player's state changes.
 //    The function indicates that when playing a video (state=1),
 //    the player should play for six seconds and then stop.
 var done = false;
 function onPlayerStateChange(event) {
   if (event.data == YT.PlayerState.PLAYING && !done) {
	 setTimeout(stopVideo, 6000);
	 done = true;
   }
 }
 function stopVideo() {
   player.stopVideo();
 }