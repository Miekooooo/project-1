document.addEventListener("DOMContentLoaded", async function() {
  const apiKey = '21281ea7c62b9064284d6b1f71ae90bf';
  const baseUrl = "https://api.themoviedb.org/3";
  var player;

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
      const movieCard = document.createElement("div")
      movieCard.setAttribute("class", "movieCard")
      movieCard.setAttribute("data-movie-id", movieInfo[i].id)
      const movieImg = document.createElement("img")
      const movieHeader = document.createElement("h2")
      const movieDescription = document.createElement("p")
      movieDescription.setAttribute("class", "hide")
      movieImg.setAttribute("src", `https://image.tmdb.org/t/p/w300${movieInfo[i].poster_path}`)
      movieImg.setAttribute("alt", movieInfo[i].title)
      movieImg.setAttribute("class", "moviePoster")
      movieHeader.innerHTML = movieInfo[i].title;
      movieDescription.innerHTML = movieInfo[i].overview
      movieCard.append(movieImg)
      movieCard.append(movieHeader)
      movieCard.append(movieDescription)
      movieInfoContainer.append(movieCard)
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }

  // Function to fetch movie details and trailer
  async function fetchMovieDetails(movieId, callback) {
    const detailsUrl = `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`;
    try {
      const response = await fetch(detailsUrl);
      const movieDetails = await response.json();
      console.log(movieDetails)
      // Check if the movie has videos (trailers)
      if (movieDetails.results && movieDetails.results.length > 0) {
        let trailerKey;
        for(let i = 0; i < movieDetails.results.length; i++){
          if(movieDetails.results[i].type === "Trailer"){
            trailerKey = movieDetails.results[i].key;
          }
        }
        
        // Assuming the first video is the trailer
        callback(trailerKey); // Call the callback with the video ID
      } else {
        console.log("No trailers found for this movie.");
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }
  // Attach click event listeners to movie cards
  movieInfoContainer.addEventListener('click', (event) => {
    const clickedMovieCard = event.target.closest('.movieCard');

    if (clickedMovieCard) {
      var player = document.getElementById("youtube-section");
      player.classList.remove("hide");
      window.scrollTo(0, 0);
      const movieId = clickedMovieCard.getAttribute('data-movie-id');
      // Update the player with the trailer of the clicked movie
      fetchMovieDetails(movieId, (trailerKey) => {
        updatePlayer(trailerKey);
      });
    }
  });


  const movieCards = document.querySelectorAll('.movieCard');

  const searchInput = document.getElementById('search-input'); // Define searchInput here
  
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
  
    movieCards.forEach(movieCard => {
      const movieTitle = movieCard.querySelector('.moviePoster').getAttribute('alt').toLowerCase();
      if (movieTitle.includes(searchTerm)) {
        movieCard.style.display = 'block';
      } else {
        movieCard.style.display = 'none';
      }
    });
  });
});

// Load YouTube Player API asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
function onYouTubeIframeAPIReady(trailerKey) {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'of-fPvDLsVE',
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function updatePlayer(trailerKey) {
  player.loadVideoById(trailerKey);
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
    setTimeout(stopVideo, 600000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}

function reload() {
  window.location.reload();
}


//document.getElementById('changeVideoButton').addEventListener('click', function () {
  //player.loadVideoById('NEW_VIDEO_ID');
//});
