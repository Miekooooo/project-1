document.addEventListener("DOMContentLoaded", async function() {
  const apiKey = '4735d31250msh2b8b785e5128f79p19e220jsn494a51118e18';
  const baseUrl = "https://moviesdatabase.p.rapidapi.com";

  const titleElements = document.querySelectorAll(".textContent h2");
  const descriptionElements = document.querySelectorAll(".movieDescription");
  const imageElements = document.querySelectorAll("img");

  const listQueryParam = "popular"; // Replace with your desired list from Utils - Titles Lists
  const apiUrl = `${baseUrl}/titles?list=${listQueryParam}`;
  const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': '4735d31250msh2b8b785e5128f79p19e220jsn494a51118e18',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
  };

  try {
    const response = await fetch(apiUrl, options);
    const responseData = await response.json();
  
    console.log(responseData); // Log the API response for debugging
  
    if (responseData && responseData.titles && responseData.titles.length > 0) {
      const titlesData = responseData.titles;
      titlesData.forEach(async (movieInfo, index) => {
        if (index < titleElements.length) {
          titleElements[index].textContent = movieInfo.title;
          descriptionElements[index].textContent = movieInfo.description;
          imageElements[index].src = movieInfo.poster_url;
        }
      });
    } else {
      descriptionElements.forEach(descriptionElement => {
        descriptionElement.textContent = "No movie titles found.";
      });
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    descriptionElements.forEach(descriptionElement => {
      descriptionElement.textContent = "Error fetching movie data.";
    })
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
