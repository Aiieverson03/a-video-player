const videoContainer = document.querySelector('.video-player');
const video = document.querySelector('.video');
const progressBar = document.querySelector('.progress-bar');
const displayBar = document.querySelector('.display');
const progress = document.querySelector('.progress');
const controls = document.querySelector('.controls');
const playButton = document.querySelector('.play');
const mute = document.querySelector('.mute');
const volume = document.querySelector('.volume');
const currentTime = document.querySelector('.current-time');
const durationTime = document.querySelector('.duration-time');
const fullscreenButton = document.querySelector('.fullscreen-button');


function toFullScreen () {
  if (document.fullscreenElement) {
    displayBar.classList.add('active');
    document.exitFullscreen();
    
  } else {
    displayBar.classList.remove('active');
    console.log('test');
    videoContainer.requestFullscreen();
    
   
  }
}

document.addEventListener('click', () => {
  displayBar.style.display = 'block';
});

videoContainer.addEventListener('dblclick', toFullScreen);

fullscreenButton.addEventListener('click', toFullScreen);


video.addEventListener('loadedmetadata', () => {
    console.log('video loaded');
    const duration = video.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    durationTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  });


  playButton.addEventListener('click', () => {
    if (video.paused) {
        playButton.firstChild.src = "ressources/pause.svg";
      video.play();
    } else {    
        video.pause();
        playButton.firstChild.src = "ressources/play.svg";
    }
  });

  mute.addEventListener('click', () => {
    if (video.muted) {
      video.muted = false;
      mute.firstChild.src = "ressources/unmute.svg";
    } else {
      video.muted = true;
      mute.firstChild.src = "ressources/mute.svg";
    }
  });
 
  volume.addEventListener('input', (e)=> {
      video.volume = e.target.value;  
      if (video.volume === 0) {
        mute.firstChild.src = "ressources/mute.svg";
      } else {
        mute.firstChild.src = "ressources/unmute.svg";}
         
  })

  video.addEventListener('timeupdate', () => {
    const current = video.currentTime;
  const minutes = Math.trunc(current / 60);
  const seconds = Math.trunc(current % 60);
  currentTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  progress.style.transform = `scaleX(${video.currentTime / video.duration})`;
  if (video.ended) {
    playButton.firstChild.src = "ressources/play.svg";
  }

  }); 

progressBar.addEventListener('click', (e) => {
  console.log(e);
  const x = e.offsetX;
  const coordonate = progressBar.getBoundingClientRect();
  pourcentage = 100*x / (coordonate.right - coordonate.left);

  video.currentTime = video.duration * pourcentage / 100;
  progress.style.transform = `scaleX(1)`;
  progress.style.transform = `scaleX(${pourcentage/100})`;

  video.addEventListener('timeupdate', () => {
    const current = video.currentTime;
  const minutes = Math.trunc(current / 60);
  const seconds = Math.trunc(current % 60);
  currentTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  

  }); 
});

let hideToTheBottom;
document.addEventListener('mousemove', () => {
  clearInterval(hideToTheBottom);
  if(document.fullscreenElement) {
    displayBar.style.transform = 'translateY(0)';
      hideToTheBottom = setTimeout(() => {
      displayBar.style.transform = 'translateY(100%)';}, 3000)
    
  } else {
    if (!displayBar.classList.contains('active')) {
      displayBar.classList.add('active');
    }



  }
});



  
