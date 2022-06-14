let song, buttton, fft;
let space_between_lines;
function toggleSong() {
  if(song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('audio/the-alphabeat.mp3'); 
}

function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
  angleMode(DEGREES); // Change the mode to DEGREES
  buttton = createButton('Toggle Play');
  buttton.mousePressed(toggleSong);
  song.play();  
  fft = new p5.FFT(0.9, 128);
}

function draw() {
  background(0);
  space_between_lines = width / 128;
  let spectrum = fft.analyze();
  console.log(spectrum);
  for (let i = 0; i < spectrum.length; i++) {
    stroke(255);
    let amp = spectrum[i];
    let y = map(amp, 0, 256, height, 0);
    fill(i,255,255); //remove stroke(255);
    rect(width - (i * space_between_lines), y, space_between_lines, height - y/2);

}
}

// Chrome 70 will require user gestures to enable web audio api
// Click on the web page to start audio
function touchStarted() {
  getAudioContext().resume();
}