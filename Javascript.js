const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPause");
const progressBar = document.getElementById("progress");
const timeDisplay = document.getElementById("time");
const volumeControl = document.getElementById("volume");
const videoUploadInput = document.getElementById("videoUpload");
const photoUploadInput = document.getElementById("photoUpload");
const photoGallery = document.getElementById("photoGallery");
const videoFileNameDisplay = document.getElementById("videoFileName");
const photoFileNameDisplay = document.getElementById("photoFileName");

// Função para formatar o tempo em minutos e segundos
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
}

// Função para atualizar o progresso do vídeo
function updateProgress() {
  progressBar.value = (video.currentTime / video.duration) * 100;
  timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
}

// Controle de play/pause do vídeo
playPauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    video.pause();
    playPauseBtn.textContent = "▶️";
  }
});

// Atualizar progresso ao mover o slider
progressBar.addEventListener("input", () => {
  video.currentTime = (progressBar.value / 100) * video.duration;
});

// Atualizar a barra de progresso durante a reprodução
video.addEventListener("timeupdate", updateProgress);

// Controle de volume
volumeControl.addEventListener("input", () => {
  video.volume = volumeControl.value;
});

// Inicializar o tempo do vídeo quando o metadado for carregado
video.addEventListener("loadedmetadata", () => {
  timeDisplay.textContent = `0:00 / ${formatTime(video.duration)}`;
});

// Função para lidar com o upload de vídeos
videoUploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  
  // Verificar se o arquivo é um vídeo
  if (file && file.type.startsWith("video")) {
    const videoURL = URL.createObjectURL(file);
    video.src = videoURL;
    video.load();
    video.play();
    playPauseBtn.textContent = "⏸️";
    videoFileNameDisplay.textContent = `Arquivo de vídeo: ${file.name}`;
  } else {
    alert("Por favor, selecione um arquivo de vídeo válido.");
    videoFileNameDisplay.textContent = "Nenhum vídeo selecionado";
  }
});

// Função para lidar com o upload de fotos
photoUploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  
  // Verificar se o arquivo é uma imagem
  if (file && file.type.startsWith("image")) {
    const photoURL = URL.createObjectURL(file);
    const imgElement = document.createElement("img");
    imgElement.src = photoURL;
    imgElement.classList.add("photo");
    photoGallery.appendChild(imgElement);
    photoFileNameDisplay.textContent = `Foto selecionada: ${file.name}`;
  } else {
    alert("Por favor, selecione um arquivo de imagem válido.");
    photoFileNameDisplay.textContent = "Nenhuma foto selecionada";
  }
});


