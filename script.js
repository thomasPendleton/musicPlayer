const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progress_container = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song titles
const songs = ["hey", "summer", "ukulele", "Avicii - Levels"];

// Keep track of song
let songIndex = 2;

// Initially load song details into dom
loadSong(songs[songIndex]);

// Play songs
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);

  setTimeout(function () {
    playSong();
  }, 500);
}

// update progress bar
function updateprogress(e) {
  const { duration, currentTime } = e.srcElement;
  // console.log(duration, currentTime)
  const progressPercent = (currentTime / duration) * 100;
  // console.log(progressPercent)
  progress.style.width = `${progressPercent}%`;
}

//
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  console.log(duration);

  audio.currentTime = (clickX / width) * duration;
}

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `Images/${song}.jpg`;
}

// Play button
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update

audio.addEventListener("timeupdate", updateprogress);

// click on progress bar

progress_container.addEventListener("click", setProgress);

// song ends
audio.addEventListener("ended", nextSong);
