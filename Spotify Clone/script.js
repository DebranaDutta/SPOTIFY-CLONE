console.log("Welcome to spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
gif.style.opacity = 0;
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");

let songs = [
  {
    songname: "IT ALWAYS BLUE",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  { songname: "TRAP", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songname: "THEY MAD", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  {
    songname: "RICK THE KID",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songname: "ARTIST NAME",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songname: "SAFETY DANCE",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songname: "BACK IT UP",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  { songname: "UNKOWN", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songname: "CLAY", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  {
    songname: "TRUE LOVE",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

songItems.forEach((element, i) => {
  //console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
});
//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif.style.opacity = 0;
  }
});

//Lsiten to Events
audioElement.addEventListener("timeupdate", () => {
  //console.log("timeupdate");
  //Upadte Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  //console.log(progress);
  myProgressBar.value = progress;
});
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause");
      element.classList.add("fa-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      console.log(songIndex);
      masterSongName.innerText = songs[songIndex].songname;
      e.target.classList.remove("fa-play");
      e.target.classList.add("fa-pause");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove("fa-play");
      masterPlay.classList.add("fa-pause");
      gif.style.opacity = 1;
    });
  }
);

document.getElementById("backward").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex = songIndex - 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songname;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});

document.getElementById("forward").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songname;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});
