document.addEventListener("DOMContentLoaded", async function() {
  const apiKey = '21281ea7c62b9064284d6b1f71ae90bf';
  const baseUrl = "https://api.themoviedb.org/3";

  //const titleElements = document.querySelectorAll(".textContent h2");
  //const imageElements = document.querySelectorAll(".textContent img");
  //const descriptionElements = document.querySelectorAll(".movieDescription");
  const movieInfoContainer = document.querySelector(".textContent")

  // Set up the API URL
  const apiUrl = `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  try {
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    const movieInfo = responseData.results;
    
    for(let i = 0; i < movieInfo.length; i++) {
      const movieHeader = document.createElement("h2")
      const movieImg = document.createElement("img")
      const movieDescription = document.createElement("p")
      movieHeader.innerHTML = movieInfo[i].title;
      movieImg.setAttribute("src", `https://image.tmdb.org/t/p/w300${movieInfo[i].poster_path}`)
      movieImg.setAttribute("alt", movieInfo[i].title)
      movieDescription.innerHTML = movieInfo[i].overview
      movieInfoContainer.append(movieHeader)
      movieInfoContainer.append(movieImg)
      movieInfoContainer.append(movieDescription)
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
});

// Load YouTube Player API asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
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

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// the player should play for six seconds and then stop.
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

document.getElementById('changeVideoButton').addEventListener('click', function () {
  player.loadVideoById('NEW_VIDEO_ID');
});