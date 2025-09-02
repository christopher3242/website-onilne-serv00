// List of songs with external URLs
const songs = [
    {
        title: "Tonp",
        src: "https://file.garden/Zyu3f9V1JUxg3Fw-/webiste%20%20onilne%20(Github)/Photo%20Slideshow%20with%20Music/Tonp.mp3"
    },
    {
        title: "Music Ro",
        src: "https://file.garden/Zyu3f9V1JUxg3Fw-/webiste%20%20onilne%20(Github)/Photo%20Slideshow%20with%20Music/Music%20Ro.mp3"
    }
];

let currentSongIndex = 0;

const audioPlayer = document.getElementById('audio-player');
const songTitle = document.getElementById('song-title');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const exitBtn = document.getElementById('exit-btn');
const downloadBtn = document.getElementById('download-btn');
const volumeSlider = document.getElementById('volume-slider');

// Load initial song
loadSong(currentSongIndex);

// Load song based on index
function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title;
    audioPlayer.src = song.src;
    // Reset play button text
    playPauseBtn.textContent = 'Play';
}

// Play or pause the audio
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused || audioPlayer.ended) {
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    }
});

// Update button text when audio ends
audioPlayer.addEventListener('ended', () => {
    playPauseBtn.textContent = 'Play';
});

// Previous song
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = 'Pause';
});

// Next song
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = 'Pause';
});

// Exit button
exitBtn.addEventListener('click', () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    playPauseBtn.textContent = 'Play';
});

// Download current song
downloadBtn.addEventListener('click', () => {
    const currentSong = songs[currentSongIndex];
    const link = document.createElement('a');
    link.href = currentSong.src;
    link.download = currentSong.src.split('/').pop();  // filename from URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Volume control
volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value / 100;
});

// Set initial volume
audioPlayer.volume = volumeSlider.value / 100;