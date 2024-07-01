const songsList = [
    {
        name: "MUNDO",
        artist: "IV of Spades",
        src: "Mundo.mp3",
        cover: "ALBUM.jpg"
    },

    {
        name: "SWEET SHADOW",
        artist: "IV of Spades",
        src: "Sweet.mp3",
        cover: "ALBUM.jpg"
    },

    {
        name: "BATA, DAHAN DAHAN",
        artist: "IV of Spades",
        src: "Bata.mp3",
        cover: "ALBUM.jpg"
    },

    {
        name: "BAWA'T KALULUWA",
        artist: "IV of Spades",
        src: "Kaluluwa.mp3",
        cover: "ALBUM.jpg"
    },

    {
        name: "NOT MY ENERGY",
        artist: "IV of Spades",
        src: "Energy.mp3",
        cover: "ALBUM.jpg"
    },

    {
        name: "COME INSIDE OF MY HEART",
        artist: "IV of Spades",
        src: "Inside.mp3",
        cover: "ALBUM.jpg"
    },

    {
        name: "DULO NG HANGGANAN",
        artist: "IV of Spades",
        src: "Dulo.mp3",
        cover: "ALBUM.jpg"
    },

    {
        name: "IN MY PRISON",
        artist: "IV of Spades",
        src: "Prison.mp3",
        cover: "ALBUM.jpg"
    },

    {
        name: "I AIN'T PERFECT",
        artist: "IV of Spades",
        src: "Perfect.mp3",
        cover: "ALBUM.jpg"
    },

    {
        name: "CAPTIVATED",
        artist: "IV of Spades",
        src: "Capti.mp3",
        cover: "ALBUM.jpg"
    },

];


const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;

    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}