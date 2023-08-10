document.addEventListener("DOMContentLoaded", async function() {
    const movieSections = document.querySelectorAll("section");

    const apiKey = "YOUR_API_KEY"; "4735d31250msh2b8b785e5128f79p19e220jsn494a51118e18"
    const baseUrl = "https://moviesdatabase.p.rapidapi.com";

    movieSections.forEach(async section => {
        const titleElement = section.querySelector("h2");
        const movieTitle = titleElement.textContent;

        const apiUrl = `${baseUrl}/search?title=${encodeURIComponent(movieTitle)}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4735d31250msh2b8b785e5128f79p19e220jsn494a51118e18'
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(apiUrl, options);
            const data = await response.json();

            // Assuming the API returns an array of movie results, and we take the first result
            const movieInfo = data[0];

            // Update the DOM with movie information
            titleElement.textContent = movieInfo.title;
            section.querySelector("img").src = movieInfo.poster_url;
            section.querySelector("p").textContent = movieInfo.description;
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    });
});
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

 function onPlayerReady(event) {
	document.getElementById('changeVideoButton').addEventListener('click', function () {
		player.loadVideoById('NEW_VIDEO_ID');
	});
}
