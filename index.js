const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = this.getVoices();
  const voiceOptions = voices
    // .filter(voice => voice.lang.inclucdes('en'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
  voicesDropdown.innerHTML = voiceOptions;

}

function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toogle();
}

function toogle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOptions() {
  msg[this.name] = this.value;
  toogle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices); voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOptions));
speakButton.addEventListener('click', toogle);
stopButton.addEventListener('click', toogle.bind(null, false));