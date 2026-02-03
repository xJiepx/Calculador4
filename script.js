const tracks = [
  {
    title: "Neón en calma",
    artist: "Luz Marina",
    cover:
      "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=400&q=80",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Aurora Lila",
    artist: "Cosmo Pulse",
    cover:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=400&q=80",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Cristal urbano",
    artist: "Violeta Nova",
    cover:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

const audio = document.getElementById("audio");
const trackList = document.getElementById("track-list");
const nowCover = document.getElementById("now-cover");
const nowTitle = document.getElementById("now-title");
const nowArtist = document.getElementById("now-artist");
const playerCover = document.getElementById("player-cover");
const playerTitle = document.getElementById("player-title");
const playerArtist = document.getElementById("player-artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

let currentIndex = 0;
let isPlaying = false;

const formatTime = (time) => {
  if (Number.isNaN(time)) {
    return "0:00";
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const setActiveTrack = (index) => {
  currentIndex = index;
  const track = tracks[index];
  audio.src = track.src;
  nowCover.src = track.cover;
  nowTitle.textContent = track.title;
  nowArtist.textContent = track.artist;
  playerCover.src = track.cover;
  playerTitle.textContent = track.title;
  playerArtist.textContent = track.artist;

  document.querySelectorAll(".track").forEach((item, idx) => {
    item.classList.toggle("active", idx === index);
  });
};

const togglePlay = () => {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
};

const renderTracks = () => {
  trackList.innerHTML = "";
  tracks.forEach((track, index) => {
    const card = document.createElement("div");
    card.className = "track";
    card.innerHTML = `
      <img src="${track.cover}" alt="${track.title}" />
      <div class="track-meta">
        <h4>${track.title}</h4>
        <p>${track.artist}</p>
      </div>
      <span class="track-duration">3:45</span>
    `;
    card.addEventListener("click", () => {
      setActiveTrack(index);
      audio.play();
    });
    trackList.appendChild(card);
  });
};

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => {
  const nextIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  setActiveTrack(nextIndex);
  audio.play();
});
nextBtn.addEventListener("click", () => {
  const nextIndex = (currentIndex + 1) % tracks.length;
  setActiveTrack(nextIndex);
  audio.play();
});

progress.addEventListener("input", (event) => {
  const value = Number(event.target.value);
  if (audio.duration) {
    audio.currentTime = (value / 100) * audio.duration;
  }
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
  currentTime.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("play", () => {
  isPlaying = true;
  playBtn.textContent = "⏸";
});

audio.addEventListener("pause", () => {
  isPlaying = false;
  playBtn.textContent = "▶";
});

renderTracks();
setActiveTrack(0);
