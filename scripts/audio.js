let currentAudioElement;

export function createAutoplayLoopAudio(source) {
  // Stop the current audio if it exists
  if (currentAudioElement) {
    currentAudioElement.pause();
    currentAudioElement.remove();
  }

  const audioElement = document.createElement("audio");
  audioElement.autoplay = true;
  audioElement.loop = true;

  const sourceElement = document.createElement("source");
  sourceElement.src = source;
  sourceElement.type = "audio/mpeg";

  audioElement.appendChild(sourceElement);
  document.body.appendChild(audioElement);

  currentAudioElement = audioElement;
}

//button sound
export function buttonSound(source) {
  let audio = new Audio(source);
  audio.play();
}
