const nowPlaying = document.getElementById('nowPlaying');
const image = document.getElementById('image');
const track = document.getElementById('track');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('playBtn');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const leftTime = document.getElementById('leftTime');
const rightTime = document.getElementById('rightTime');
const time = document.getElementById('time');
const vol = document.getElementById('volume');
const audio = document.getElementById('audio');
const warning = document.getElementById('warning');
const musicBox = document.getElementById('musicBox');
const messge = document.getElementById('messge');
const volLow = document.getElementById('volLow');
const timeRange = document.getElementById('timeRange');

///////////////////////////////////////////////////////////////

const songList = [
  {
    artist: 'Duncan Laurence',
    track: 'Arcade',
    img: './img/arcade.jpg',
  },
  {
    artist: 'Imagine Dragons',
    track: 'beliver',
    img: './img/beliver.jpg',
  },
  {
    artist: 'Adel',
    track: 'EasyOnMe',
    img: './img/albamC.jpg',
  },
  {
    artist: 'Alec benjamin',
    track: 'LetMeDown',
    img: './img/alice.jpg',
  },
  {
    artist: 'Billi Eilish',
    track: 'Lovely',
    img: './img/billiEilish.jpg',
  },
  {
    artist: 'Sia',
    track: 'Unstoppable',
    img: './img/sia.jpg',
  },
];

let songIndex = 0;

//load song
function loadTrack(song) {
  nowPlaying.innerHTML = song.track;
  track.innerText = song.track;
  artist.innerText = song.artist;
  image.innerHTML = `<img class="w-full h-full rounded-2xl" src="${song.img}" alt="" />`;
  audio.src = `./music/${song.track}.mp3`;
  vol.value = 0.8;
}
loadTrack(songList[songIndex]);

//change voliume

function changeVolume(value) {
  console.log(value);
  audio.volume = value;
  if (vol.value == 0) {
    volLow.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    volLow.style.color = '#F96666';
  } else {
    volLow.innerHTML = '<i class="fa-solid fa-volume-low">';
    volLow.style.color = '#C8C6C6';
  }
  if (vol.value == 1) {
    warning.style.color = '#F96666';
    messge.classList.remove('hidden');
  } else {
    warning.style.color = '#C8C6C6';
    messge.classList.add('hidden');
  }
}

//playSong
function playSongs() {
  musicBox.classList.add('play');
  pause.classList.remove('hidden');
  play.classList.add('hidden');
  audio.play();
}

//pause song
function pauseSong() {
  musicBox.classList.remove('play');
  pause.classList.add('hidden');
  play.classList.remove('hidden');
  audio.pause();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songList.length - 1) {
    songIndex = 0;
  } else {
    loadTrack(songList[songIndex]);
    playSongs();
  }
}

// Prev: Song
function prevSong() {
  if (songIndex == 0) {
    return;
  } else {
    songIndex--;
    loadTrack(songList[songIndex]);
    playSongs();
  }
}

function setDuration(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
  console.log(clickX / width);
}

// update duration

function updateSelectedDuration(e) {
  const { duration, currentTime } = e.srcElement;
  const calcDuration = (currentTime / duration) * 100;
  time.value = calcDuration;
}

//Live update song Duration
function liveDuration(e) {
  const { duration, currentTime } = e.srcElement;
  let min = currentTime === null ? 0 : Math.floor(currentTime / 60);
  min = min < 10 ? '0' + min : min;
  let sec = currentTime === null ? 0 : Math.floor(currentTime % 60);
  sec = sec < 10 ? '0' + sec : sec;
  console.log(sec);
  leftTime.innerText = `${min}:${sec}`;
  console.log(min);
  console.log(sec);
  const totalDur = (duration / 60).toFixed(2);
  if (totalDur == 'NaN') {
    rightTime.innerText = '00:00';
  } else {
    rightTime.innerText = totalDur;
  }
  console.log(totalDur);
}

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
playBtn.addEventListener('click', () => {
  let isPlaying = musicBox.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSongs();
  }
});
audio.addEventListener('timeupdate', updateSelectedDuration);
time.addEventListener('click', setDuration);
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', liveDuration);
