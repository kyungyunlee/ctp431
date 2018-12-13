var C = ["G4", "E4", "C4", "G3", "E3", "C3","G4"];
var C7 = ["Bb4", "G4", "E4", "C4", "G3", "E3", "C3"];
var D7 = ["D4", "F#4", "A4", "C4", "D3", "F#3", "A3"];
var Dm7 = ["F4", "D4", "C4", "A3", "F3", "C3", "D3"];
var F = ["F2", "C4", "A4", "F4", "C3", "A3", "F3"];
var Fm = ["F5", "C4", "Ab4", "F4", "C3", "Ab3", "F3"];
var F_sharp_dim = ["F#4", "D#4", "C4", "A3", "F#3", "D#3", "C3"];
var F7 = ["C4", "A4", "F4", "E3", "C3", "A3","F3"];
var E7 = ["D4", "B4","G#4", "E4","B3","G#3","E3"];
var Em7 = ["D4", "B4","G4", "E4","B3","G3","E3"];
var G = ["G5", "D4", "B4", "G4", "D3", "B3","G3"];
var G7b9 = ["E5", "B4", "G#4", "F4", "B3", "G#3", "F3"];
var A = ["C#4", "E4", "A4", "C#3", "E3","A3", "A2"]
var Am = ["A5", "E4", "C4", "A4", "E3", "C3", "A3"];
var Am7 = ["E4", "C4", "A4", "G3", "E3", "B3", "A3"];
var A7 = ["E4", "C#4", "A4", "G3", "E3", "C#3","A3"];
var Ab = ["Ab5", "Ab4", "Eb4", "C4", "Ab3", "Eb3", "C3"]
var A7b9 = ["A4", "G4", "E4", "C#4", "Bb3", "A3", "E3"];
var B = ["B3", "D#3", "F#3", "B4", "D#4", "F#4", "B2"];
var Bb = ["D5", "Bb4", "F4", "D4", "Bb3", "F3", "D3"];
var Dm7b5 = ["C4", "G#4", "F4", "D4", "G#3", "F3", "D3"];

var BASIC_C_MAJOR = [ C, F, G, C];


function jazzy_chord_progression(){
  // var JAZZY_CHORDS = [C7, F_sharp_dim, C, A7b9, Dm7];
  var JAZZY_CHORDS = [C, G, F, C];
  var jazzy_progression = [];
  for (var i=0; i<53; i++) {
    // var rand_chord_idx = Math.floor(Math.random() * JAZZY_CHORDS.length);
    rand_chord_idx = i % JAZZY_CHORDS.length;
    jazzy_progression.push(JAZZY_CHORDS[rand_chord_idx]);
  }
  console.log("jazzy progression", jazzy_progression);
  return jazzy_progression;
}

function basic_progression(){
  var basic_chords = [C, C, F, F, F, F, F7, F7, G, G, G, G, C, C];
  var progression = [];
  for (var i=0; i<53; i++) {
    // var rand_chord_idx = Math.floor(Math.random() * basic_chords.length);
    rand_chord_idx = i % basic_chords.length;
    progression.push(basic_chords[rand_chord_idx]);
  }
  return progression;
}
//----------------------------- COMMIT PATTERN SUGGESTIONS -----------------------------------------------// 

function tr808_pattern1(){
  var warning = document.getElementById("username_warning");
  warning.innerHTML = "";

  playbutton = document.getElementById("play_button");
  if (playbutton.isPlaying) { 
    playbutton.isPlaying = false;
    synthPart.stop();
    playbutton.innerHTML = "play";
  }
  change_bg_color("dark");
  num_contribs = new Array(7).fill(0).map(() => new Array(53).fill(0));
  
  binary_contribs = [[1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1, 1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1, 1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1, 1,0,1,1,1], //closed hihat
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0],
                     [1,0,1,0,1,0,1,1,0,1,0,1,1,0,1,0, 1,0,1,0,1,0,1,1,0,1,0,1,1,0,1,0, 1,0,1,0,1,0,1,1,0,1,0,1,1,0,1,0, 1,0,1,0,1], // cowbell
                     [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0, 0,0,0,0,1], // maracas , snare
                     [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0, 0,0,0,0,1], // maracas , snare
                     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0],
                     [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0, 1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0, 1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0, 1,0,0,0,0]]; // bass
  for (var i=0;i<7;i++){
    for (var j=0;j<53;j++){
      if (binary_contribs[i][j] == 1) {  
        if ((j+1)%16 < 5 ) {
          num_contribs[i][j] = 10;
        }
        else if ((j+1)%16 < 9){
          num_contribs[i][j] = 6;
        }
        else if ((j+1)%16 < 13){
          num_contribs[i][j] = 2;
        }
        else if ((j+1)%16 < 16){
          num_contribs[i][j] = 1;
        }

        if (j == 15 || j == 31 || j == 47){
          num_contribs[i][j] = 1;
        }
      }
    }
  }
  console.log(num_contribs);
  console.log(binary_contribs);
  current_instrument_set = TR808;
  current_colors = REDYELLOW;
  set_tempo(148);
  colorSequencer();
  make_play_button(); 

}


function twinkletwinkle() {
  var warning = document.getElementById("username_warning");
  warning.innerHTML = "";
  playbutton = document.getElementById("play_button");
  if (playbutton.isPlaying) {  
    playbutton.isPlaying = false;
    synthPart.stop();
    playbutton.innerHTML = "play";
  }

  change_bg_color("default");
  C = ["C4", "G3","E3","C3","G2","E2","C2"];
  F = [ "A3","F3","F3","C3", "A2","F2","C2"];
  G7 = ["B3","G3","F3","D3","G2","F2","B1"];
  
  current_progression = [C,C,C,C, F,F,C,C, F,F,C,C, G7,G7,C,C, C,C,F,F, C,C,G7,G7, 
                         C,C,F,F, C,C,G7,G7, C,C,C,C, F,F,C,C, F,F,C,C, G7,G7,C,C,
                         C,C, G7,G7,C];


  num_contribs = new Array(7).fill(0).map(() => new Array(53).fill(0));
  
  binary_contribs = [[0,0,0,0,1,1,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,1,1,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0], //closed hihat
                     [0,0,1,1,0,0,1,0, 0,0,0,0,0,0,0,0, 1,1,0,0,0,0,0,0, 1,1,0,0,0,0,0,0, 0,0,1,1,0,0,1,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0],
                     [0,0,0,0,0,0,0,0, 1,1,1,1,0,0,0,0, 0,0,1,1,1,1,0,0, 0,0,1,1,1,1,0,0, 0,0,0,0,0,0,0,0, 1,1,1,1,0,0,0,0, 1,1,0,0,0], // cowbell
                     [1,1,0,0,0,0,0,0, 0,0,0,0,1,1,1,0, 0,0,0,0,0,0,1,0, 0,0,0,0,0,0,1,0, 1,1,0,0,0,0,0,0, 0,0,0,0,1,1,1,0, 0,0,1,1,1], // maracas , snare
                     [1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1], // maracas , snare
                     [1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1],
                     [1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1,0,1,0, 1,0,1,0,1]]; // bass

  for (var i=0;i<7;i++){
    for (var j=0;j<53;j++){
      if (binary_contribs[i][j] == 1) {  
        if (i < 4) { 
          num_contribs[i][j] = 1;
        }
        else{
          console.log(current_progression[j] == G7);
            if (current_progression[j] == C) {
              num_contribs[i][j] = 2;
            }
            else if (current_progression[j] == F){ 
              num_contribs[i][j] = 6;
            }
            else if (current_progression[j] == G7){ 
              num_contribs[i][j] = 10;
            }
        }
      }
    }
  }

  current_instrument_set = PIANO;
  current_colors = MELODY;
  set_tempo(100);
  colorSequencer();
  make_play_button();

} 

function randomize(){
  var warning = document.getElementById("username_warning");
  warning.innerHTML = "";
  playbutton = document.getElementById("play_button");
  if (playbutton.isPlaying) {  
    playbutton.isPlaying = false;
    synthPart.stop();
    playbutton.innerHTML = "play";
  }
  change_bg_color("default");

  current_progression = basic_progression();
  num_contribs = new Array(7).fill(0).map(() => new Array(53).fill(0));
  binary_contribs = new Array(7).fill(0).map(() => new Array(53).fill(0));
  for (var i=0;i<7;i++){
    for (var j=0;j<53;j++){
      if (Math.random() >= 0.7){
        binary_contribs[i][j] =1;
        num_contribs[i][j] = Math.random() * 10;
      }
    }
  }

  current_instrument_set = PIANO;
  current_colors = GREEN;
  set_tempo(Math.random() * 150);
  colorSequencer();
  make_play_button();

}


//----------------------------- INSTRUMENTS -----------------------------------------------// 
var synth = new Tone.PolySynth(7, Tone.Synth).toMaster();

var reverb = new Tone.Reverb({delay:0.01,}).toMaster();
// synth.set("detune", -1200);

var kick =  new Tone.Player({
      url: 'assets/project4/tonejs-instruments/samples/drumset/BD0000.WAV',
  }).toMaster()

var snare =  new Tone.Player({
    url: 'assets/project4/tonejs-instruments/samples/drumset/SD0010.WAV',
  }).toMaster()

var closed_hihat =  new Tone.Player({
    url: 'assets/project4/tonejs-instruments/samples/drumset/CH.WAV'
  }).toMaster()

var  cymbol =  new Tone.Player({
    url: 'assets/project4/tonejs-instruments/samples/drumset/CY0000.WAV'

  }).toMaster()

  var lowtom =  new Tone.Player({
    url: 'assets/project4/tonejs-instruments/samples/drumset/LT00.WAV'

  }).toMaster()
  
  var midtom =  new Tone.Player({
    url: 'assets/project4/tonejs-instruments/samples/drumset/MT00.WAV'

  }).toMaster()
  
  var hitom =  new Tone.Player({
    url: 'assets/project4/tonejs-instruments/samples/drumset/HT00.WAV'

  }).toMaster()
 
  var cowbell =  new Tone.Player({
    url: 'assets/project4/tonejs-instruments/samples/drumset/CB.WAV',
}).toMaster()

var handclap =  new Tone.Player({
  url: 'assets/project4/tonejs-instruments/samples/drumset/CP.WAV',
}).toMaster()

var piano = SampleLibrary.load({
  instruments:"piano",
}).toMaster();

var flute = SampleLibrary.load({
  instruments:"flute",
}).toMaster();

var saxophone = SampleLibrary.load({
  instruments:"saxophone",
}).toMaster();

var guitar_electric=SampleLibrary.load({
  instruments:"guitar-electric",
}).toMaster();  

var xylophone = SampleLibrary.load({
  instruments:"xylophone",
}).toMaster();  



var bell = new Tone.MetalSynth({
  "harmonicity" : 12,
  "resonance" : 800,
  "modulationIndex" : 20,
  "envelope" : {
    "decay" : 2,
  },
  "volume" : -20
}).toMaster();

var conga = new Tone.MembraneSynth({
  "pitchDecay" : 0.008,
  "octaves" : 2,
  "envelope" : {
    "attack" : 0.0006,
    "decay" : 0.5,
    "sustain" : 0
  }
}).toMaster();


//------------------------------   INSTRUMENT PRESET --------------------------------------------------// 
const TR808 = [closed_hihat, lowtom, cowbell, snare, snare, hitom, kick];
const PIANO = [piano, piano, piano, piano, piano, piano, piano];
const FLUTE = [flute, flute, flute,flute, flute, flute, flute];
const XYLOPHONE = [xylophone, xylophone, xylophone, xylophone, xylophone, xylophone, xylophone];
const CHRISTMAS_INST = [xylophone, xylophone, xylophone, xylophone, xylophone, xylophone, xylophone];
const HORROR = [conga, conga, conga, bell, conga, bell, conga];



//------------------------------   SEQUENCER COLOR PRESET --------------------------------------------------// 

const GREEN =  ['rgb(198, 227, 143)', 'rgb(126, 199, 115)', 'rgb(42,153,64)', 'rgb(29, 96, 41)'];
const REDYELLOW = ['rgb(229,232,191)','rgb(222,219,48)', 'rgb(240,115,32)','rgb(220,32,23)'];
const REDGREEN = ['rgb(225,32,44)', 'rgb(23, 160,81)', 'rgb(207,44,45)', 'rgb(33,146,76)'];
const ORANGEBLACK = ['rgb(253,153,39)', 'rgb(50,50,50)','rgb(252,78,30)', 'rgb(5,5,5)'];
const PURPLEBLUE = ['rgb(167,54,168)', 'rgb(86,185,203)','rgb(68,121,168)' ,'rgb(250,80,62)'];
// const PURPLEBLUE = ['rgb(73, 172,182)','rgb(197, 71,96)','rgb(62, 167, 182)','rgb(199,73,96)']
const MELODY = ['rgb(246,215,81)',  'rgb(86, 131,227)','rgb(153,201,83)', 'rgb(239,97,118)'];

// GLOBAL VARIABLES TO CHANGE OVERALL SETTINGS 
var synthPart;
var current_progression = basic_progression();
var current_instrument_set = PIANO;
var current_colors = GREEN;
var current_bpm;

// tempo dial from html
var tempodial;
var temponum;
function initialize_tempo_dial() { 
  tempodial = tempo_dial; 
  temponum = tempo_number;
}

function set_tempo(tmp){
  tempodial.value = tmp;
  temponum.value = tmp;
  current_bpm = tmp;
  Tone.Transport.bpm.value = tmp;
}
console.log("hi from js");
//------------------------------   INSTRUMENT & CHORD SETTERS --------------------------------------------------// 

// USER SETTING INST AND CHORDS 


function change_bg_color (type) {
  if (type == "default" ){
    var bg = document.getElementById("body");
    bg.style.backgroundColor = "white";
    bg.style.color = "black";
    var playbutton = document.getElementById("play_button");
    playbutton.style.backgroundColor = "#555555";
    playbutton.style.color = "white"; 
  }
  else if (type =="dark") {
    var bg = document.getElementById("body");
    bg.style.backgroundColor = "rgb(60,60,60)";
    bg.style.color = "white";
    var playbutton = document.getElementById("play_button");
    playbutton.style.backgroundColor = "white";
    playbutton.style.color = "black";

  } else if (type =="christmas"){
    var bg = document.getElementById("body");
    bg.style.backgroundColor = "rgb(216,234,248)";
    bg.style.color = "black";
    var playbutton = document.getElementById("play_button");
    playbutton.style.backgroundColor = "#555555";
    playbutton.style.color = "white";
  } 
  else if (type =="horror") {
    var bg = document.getElementById("body");
    bg.style.backgroundColor = "rgb(0,0,0)";
    bg.style.color = "white";
    var playbutton = document.getElementById("play_button");
    playbutton.style.backgroundColor = "white";
    playbutton.style.color = "black";
  }
}

function set_piano() { 
  change_bg_color("default");
  console.log("setting inst to piano");

  if (current_instrument_set == TR808 || current_instrument_set == HORROR || current_instrument_set == CHRISTMAS_INST) {
    current_progression = basic_progression();
  }
  current_instrument_set = PIANO;
  current_colors = GREEN;
  set_tempo(80);
  colorSequencer();
}

function set_percussion(){
  change_bg_color("dark");

  console.log("setting inst to percussion");
  current_instrument_set = TR808;
  var noChord = ["E3", "E3", "E3", "E3", "E3", "E3", "E3"];
  
  var progression = [];
  for (var i=0; i<53; i++) {
    progression.push(noChord);
  }
  current_progression = progression ;
  current_colors = REDYELLOW;
  set_tempo(140);
  colorSequencer();
}

function set_flute(){
  change_bg_color("default");
  console.log("setting inst to flute");

  if (current_instrument_set == TR808 || current_instrument_set == HORROR || current_instrument_set == CHRISTMAS_INST) {
    current_progression = basic_progression();
  }
  current_instrument_set = FLUTE;
  current_colors = GREEN;
  set_tempo(80);
  colorSequencer();
}

function set_xylophone(){
  change_bg_color("default");

  if (current_instrument_set == TR808 || current_instrument_set == HORROR || current_instrument_set == CHRISTMAS_INST) {
    current_progression = basic_progression();
  }
  current_instrument_set = XYLOPHONE;
  current_colors = GREEN;
  set_tempo(80);
  colorSequencer();
}

function set_cmajor() { 
  console.log("setting chord to c maj");
  current_progression =  basic_progression();
  // resetChords(binary_contribs);
  if (current_instrument_set == TR808 || current_instrument_set == HORROR || current_instrument_set == CHRISTMAS_INST) {
    current_instrument_set = PIANO;
    change_bg_color("default");
  }
  current_colors = GREEN;
  set_tempo(80);
  colorSequencer();

}

function set_aminor(){
  console.log("setting to a minor");

  var CHORDS = [A7, A7, A7, A7, D7, D7, A7, A7, E7, D7, A7, E7]; 
  var progression = [];
  for (var i=0; i<53; i++) {
    var rand_chord_idx = Math.floor(Math.random() * CHORDS.length);
    // var rand_chord_idx = i % CHORDS.length;
    progression.push(CHORDS[rand_chord_idx]);
  }
  current_progression = progression ;
  if (current_instrument_set == TR808 || current_instrument_set == HORROR || current_instrument_set == CHRISTMAS_INST) {
    current_instrument_set = PIANO;
    change_bg_color("default");
  }
  current_colors = GREEN;
  set_tempo(80);
  colorSequencer();

}

function set_christmas(){
  change_bg_color("christmas");
  current_instrument_set = CHRISTMAS_INST;
  var C = ["C4", "E4", "G4", "B4", "C3", "E3", "G3"];
  var G = ["G4", "B4", "D4", "F4", "G3", "B3", "D3"];
  var Am = ["A5", "E4", "C4", "A4", "E3", "C3", "A3"];
  var D = ["D4","F4","A4", "C4","D3","F3", "A3"];
  var D7 = ["D4", "F#4", "A4", "C4", "D3", "F#3", "A3"];
  var CHORDS = [C, C, C, C, C7, C7, C7, C7, F, F, F, F, Dm7b5, Dm7b5, Dm7b5, Dm7b5, F, F, F, F];
  // var CHORDS = [G, G, G, C, C, C , Am,  Am, Am, D7, D7, D7];
  var progression = [];
  for (var i=0; i<53; i++) {
    var rand_chord_idx = Math.floor(Math.random() * CHORDS.length);
    // rand_chord_idx = i % CHORDS.length;
    progression.push(CHORDS[rand_chord_idx]);
  }

  current_progression = progression;
  current_colors = REDGREEN;
  colorSequencer();
  // resetChords(binary_contribs);
}

function set_horror() {
  change_bg_color("horror");
  current_instrument_set = HORROR;
  var noChord = ["G3", "C4", "E3", 200 , "C3", 300, "G3"];
  var progression = [];
  for (var i=0; i<53; i++) {
    progression.push(noChord);
  }
  current_progression = progression ;
  set_tempo(160);
  current_colors = PURPLEBLUE;
  colorSequencer();
}




//-------------------------------------- AUDIO PLAY RELATED CODE -----------------------------------------//

const arrayColumn = (arr, n) => arr.map(x => x[n]);
var playbutton; 

// var chords_to_play = []; // contain chord progressions (53 in total)

function githubCommitProcessor(binaryContrib, numContrib){
  // Called once when new user name is received
  console.log("binary contribution matrix", binaryContrib.length, binaryContrib[0].length);

  // UPDATE SEQUENCER WITH MY DATA ! 
  set_piano();
  current_progression = basic_progression(); 
  colorSequencer();

  make_play_button();
}


function make_play_button(){
  playbutton = document.getElementById("play_button");
  playbutton.innerHTML = "play";
  playbutton.isPlaying = false;
}

function click_playbutton(){
  console.log("playbutton clicked");
    if (playbutton.isPlaying == false) {
      console.log("play");
      playbutton.isPlaying = true;
      playbutton.innerHTML = "stop";
      playAll();
    }
    else {
      console.log("stop");
      playbutton.isPlaying = false;
      playbutton.innerHTML = "play";
      synthPart.stop(); 
      colorSequencer(); // undo coloring
    }

}

var range = [];
for (var i = 0; i < 53; i++) {
    range.push(i);
}

function playAll() { 
  var idx = 0;
  var moment = 0;
  //chords_to_play
  synthPart = new Tone.Sequence(function(time, chordidx) { 
    var col = arrayColumn(binary_contribs, chordidx);
    var chord = current_progression[chordidx];
    // console.log(time, chords_to_play[chordidx]);
    var vel = Math.random() ;
    console.log(vel);

    if (current_instrument_set == TR808) {
      if (col[0] == 1) { current_instrument_set[0].start(time, 0, '8n');};
      if (col[1] == 1) { current_instrument_set[1].start(time, 0, '8n');};
      if (col[2] == 1) { current_instrument_set[2].start(time, 0, '8n');};
      if (col[3] == 1) { current_instrument_set[3].start(time, 0, '8n');};
      if (col[4] == 1) { current_instrument_set[4].start(time, 0, '8n');};
      if (col[5] == 1) { current_instrument_set[5].start(time, 0, '8n');};
      if (col[6] == 1) { current_instrument_set[6].start(time, 0, '8n');};
    } 
    else if (current_instrument_set == HORROR ){
      if (col[0] == 1) {
        current_instrument_set[0].triggerAttack(chord[0], time, vel);};
      if (col[1] == 1) { 
        current_instrument_set[1].triggerAttack(chord[1],time, vel);};
      if (col[2] == 1) { 
        current_instrument_set[2].triggerAttack(chord[2], time, vel);};
      if (col[3] == 1) { 
        current_instrument_set[3].frequency.setValueAtTime(chord[3], time, Math.random()*0.5 + 0.5); 
        current_instrument_set[3].triggerAttack(time, vel);};
      if (col[4] == 1) { 
        current_instrument_set[4].triggerAttack(chord[4], time, vel);};
      if (col[5] == 1) { 
        current_instrument_set[5].frequency.setValueAtTime(chord[5], time, Math.random()*0.5 + 0.5); 
        current_instrument_set[5].triggerAttack(time, vel);};
      if (col[6] == 1) { 
        current_instrument_set[6].triggerAttack(chord[6], time, vel);};
    }
    else { 
      if (col[0] == 1) { current_instrument_set[0].triggerAttackRelease(chord[0], '8n', time, vel);};
      if (col[1] == 1) { current_instrument_set[1].triggerAttackRelease(chord[1], '8n', time, vel);};
      if (col[2] == 1) {current_instrument_set[2].triggerAttackRelease(chord[2], '8n', time, vel);};
      if (col[3] == 1) {current_instrument_set[3].triggerAttackRelease(chord[3], '8n', time, vel);};
      if (col[4] == 1) {current_instrument_set[4].triggerAttackRelease(chord[4], '8n', time, vel);};
      if (col[5] == 1) {current_instrument_set[5].triggerAttackRelease(chord[5], '8n', time, vel);};
      if (col[6] == 1) {current_instrument_set[6].triggerAttackRelease(chord[6], '8n', time, vel);};
    }
    // synth.triggerAttackRelease(chords_to_play[chordidx], '8n', time);

    context = elem.getContext('2d');

    if (current_instrument_set == TR808 || current_instrument_set == HORROR) { 
      strokec = "rgb(100,100,100)"
    }
    else {
      strokec = "rgb(210,210,210)"
    }


    // schedule updates to the GUI
    Tone.Draw.schedule(function () { 
      if (idx > 52) {
        idx = 0;
        clear_redraw();
      }
      $('#current_chord').text(chord);
      if (moment != time) { 
        console.log(idx, time);
        current_col = arrayColumn(rects, idx);
        for (var i=0; i<7; i++) {

            oRec = rects[i][idx];
            context.strokeStyle =strokec; 
            context.lineWidth = 1.5;
            context.strokeRect(oRec.x,oRec.y, oRec.w, oRec.h);
            
        }
        idx++;
      }
    })
  }, range, '8n').start();

  synthPart.loop = true;
//   // synthPart.humanize = true;
  console.log("setting bpm to ", current_bpm);
  Tone.Transport.bpm.value = current_bpm;
  Tone.Transport.swing=  0.8;
  Tone.Transport.swingSubdivision = '16n';
  Tone.Transport.start("+01");
}



//---------------------------GITHUB DATA GETTER -----------------------------------------------// 

var num_contribs;
var binary_contribs;

// retrieve and parse your github contribution data
function parse_my_contributions(res, callback){
  var today = new Date();
  var dd = ("0" + today.getDate()).slice(-2); // 2 digits 
  var mm = ("0" + (today.getMonth() + 1).toString()).slice(-2); // 2 digits 
  var yyyy = today.getFullYear();
  var day = today.getDay();
  var today_date = yyyy + '-' + mm + '-' + dd;

  var total_days_to_retrieve = 371 - (7-day);
  
  var contribs;
  res = JSON.parse(res);
  for (var i=0; i < res["contributions"].length; i++) {
    if ((res["contributions"][i]["date"]) == today_date) {
        console.log(res["contributions"][i]);
        contribs = res["contributions"].slice(i , i+total_days_to_retrieve);
        console.log(contribs.length);
        break
    }
  }
  console.log(today_date, day);

  var warning = document.getElementById("username_warning");
  if (!contribs){
    warning.innerHTML = "Nooooo user name is incorrect. Try again or check out the buttons at the very bottom!";
  } else { 
    warning.innerHTML = "";
  }

  // fill in your contribution into the sequencer
  num_contribs = new Array(7).fill(0).map(() => new Array(53).fill(0));
  binary_contribs = new Array(7).fill(0).map(() => new Array(53).fill(0));
  var curr_cell_row = day;
  var curr_cell_col = 52;
  for (var i=0; i < total_days_to_retrieve; i++){
    // console.log(contribs[i]["count"])
    num_contribs[curr_cell_row][curr_cell_col] = contribs[i]["count"];
    if (contribs[i]["count"] > 0){
      binary_contribs[curr_cell_row][curr_cell_col] = 1;
    } else {
      binary_contribs[curr_cell_row][curr_cell_col] = 0;
    }

    if (curr_cell_row == 0) { 
      curr_cell_row =  6;
      curr_cell_col = curr_cell_col -1;
    } else { 
      curr_cell_row = curr_cell_row - 1;
    }
  }
  console.log("Success");
  // Now call the gitCommitProcessor to update sequencer UI and make chord progression
  githubCommitProcessor(binary_contribs, num_contribs);
}


// API for getting github data
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
       
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function submit_username() { 
  playbutton = document.getElementById("play_button");
  playbutton.innerHTML = "Please wait a bit.."; 
  playbutton.isPlaying = false;
  clear_data();
  var username = document.getElementById("username").value;
  console.log("recieved", username);
  var url = 'https://github-contributions-api.now.sh/v1/' + username;
  httpGetAsync(url, parse_my_contributions);
}

function clear_data(){
  num_contribs = new Array(7).fill(0).map(() => new Array(53).fill(0));
  binary_contribs = new Array(7).fill(0).map(() => new Array(53).fill(0));

}

//---------------------------------- GUI DRAWER  -----------------------------------------------// 

var elem;
var rects = []; // html canvas rectangles for sequencer

function Shape(x,y, w, h, fill){
  this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fill = fill;
}

// Make an instance of two and place it on the page.
window.onload = function () { 
  elem = document.getElementById("myCanvas");
  var params = { width: elem.width, height:elem.height };
  // two = new Two(params).appendTo(elem);
  var rect_size = 13;
  var gap_size = 3;

// two has convenience methods to create shapes.
for (var i = 0; i<7; i++){
  var row = [];
  for (var j=0; j<53; j++) {
    row.push(new Shape(rect_size/2 + j * (rect_size + gap_size), rect_size /2 + i *(rect_size + gap_size), rect_size, rect_size, "rgb(230,230,230)"));
  }
  rects.push(row);
}
  context = elem.getContext('2d');
  for (var i=0; i < 7; i++ ) { // 7 
    for (var j=0; j < 53; j++ ){ // 53
        oRec = rects[i][j];
        context.fillStyle = rects[i][j].fill;
        context.fillRect(oRec.x, oRec.y, oRec.w, oRec.h);

    }
  }

}

function colorSequencer() {
  clear_redraw();
  context = elem.getContext('2d');
  for (var i=0; i < binary_contribs.length; i++ ) { // 7 
    for (var j=0; j <binary_contribs[i].length; j++ ){ // 53
        if (binary_contribs[i][j] == 1 ){
          if (num_contribs[i][j] == 1 ) { 
            rects[i][j].fill = current_colors[0];
          }
          else if (num_contribs[i][j] <3 ) {
            rects[i][j].fill = current_colors[1];
          }
          else if (num_contribs[i][j] <7 ) {
            rects[i][j].fill = current_colors[2];
          }
          else { 
            rects[i][j].fill = current_colors[3];
          }
          oRec = rects[i][j];
          context.fillStyle = oRec.fill;
          context.lineWidth = 0;
          // context.strokeRect(oRec.x, oRec.y, oRec.w, oRec.h);
          context.fillRect(oRec.x, oRec.y, oRec.w, oRec.h);
        }
    }
  }
}


function clear_redraw(){
  if (current_instrument_set == TR808 || current_instrument_set == HORROR) { 
    rectc = "rgb(70,70,70)"
  }
  else {
    rectc = "rgb(230,230,230)"
  }
     context = elem.getContext('2d');
      context.clearRect(0,0, elem.width, elem.height);
      for (var i=0; i < 7; i++ ) { // 7 
        for (var j=0; j < 53; j++ ){ // 53
            oRec = rects[i][j];
          if (binary_contribs[i][j] ==0 ){ 
            context.fillStyle =rectc;
            context.fillRect(oRec.x, oRec.y, oRec.w, oRec.h);
          } else {
            context.fillStyle =oRec.fill;
            context.fillRect(oRec.x, oRec.y, oRec.w, oRec.h);
          } 
        }
      }
}


function notify_change_in_bpm(new_bpm){
  console.log("change in bpm to ", new_bpm);
  Tone.Transport.bpm.value = new_bpm;
  current_bpm = new_bpm;
}

