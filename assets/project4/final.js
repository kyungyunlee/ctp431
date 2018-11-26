
var C = ["G4", "E4", "C4", "G3", "E3", "C3","C2"];
var C7 = ["Bb4", "G4", "E4", "C4", "G3", "E3", "C3"];
var Dm7 = ["F4", "D4", "C4", "A3", "F3", "C3", "D3"];
var F = ["F2", "C4", "A4", "F4", "C3", "A3", "F3"];
var Fm = ["F5", "C4", "Ab4", "F4", "C3", "Ab3", "F3"];
var F_sharp_dim = ["F#4", "D#4", "C4", "A3", "F#3", "D#3", "C3"];
var F7 = ["C4", "A4", "F4", "E3", "C3", "A3","F3"];
var E7 = ["D4", "B4","G#4", "E4","B3","G#3","E3"];
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
var CHRISTMAS = [C, C7, F, Dm7b5];
// var TEST = [F7, E7, Am, C7];
var TEST = [C, B, Bb, A];

class Christmas {
  constructor() {
    this.chords = [C, C7, F, Dm7b5];
    this.instruments = [];
  }

  get_chord_progression(){
    var christmas_progression = [];
    for (var i=0; i<53; i++) {
      var rand_chord_idx = Math.floor(Math.random() * this.chords.length);
      christmas_progression.push(this.chords[rand_chord_idx]);
    }
    return christmas_progression
  }
}

class Jazzy {
  constructor() {
    this.chords = [C, C7, F, F_sharp_dim, C, A7b9, Dm7, G7b9];
    this.instruments = [];
  }

  get_chord_progression(){
    var christmas_progression = [];
    for (var i=0; i<53; i++) {
      var rand_chord_idx = Math.floor(Math.random() * this.chords.length);
      christmas_progression.push(this.chords[rand_chord_idx]);
    }
    return christmas_progression
  }
}

class Percussion {
  
}

function jazzy_chord_progression(){
  // var JAZZY_CHORDS = [C, C7, F, F_sharp_dim, C, A7b9, Dm7, G7b9];
  var JAZZY_CHORDS = CHRISTMAS;
  var jazzy_progression = [];
  for (var i=0; i<53; i++) {
    var rand_chord_idx = Math.floor(Math.random() * JAZZY_CHORDS.length);
    jazzy_progression.push(JAZZY_CHORDS[rand_chord_idx]);
  }
  return jazzy_progression;
}



var synth = new Tone.PolySynth(4, Tone.Synth, {
  "volume" : -8,
  "oscillator" : {
      "partials" : [1, 2, 5],
  },
  "portamento" : 0.005
}).toMaster()


var progression_tracker = 0;
var current_progression = jazzy_chord_progression();

function play_notes(v) { 
  var now = Tone.now();
  console.log(v);
  var current_chord = current_progression[progression_tracker];
  var new_chord = [];
  if (v[0] ==1) {
      new_chord.push(current_chord[0]);
  }
  if (v[1] == 1) {
    new_chord.push(current_chord[1]); 
  } 
  if (v[2]==1){
    new_chord.push(current_chord[2]); 
  }
  if (v[3] ==1){
    new_chord.push(current_chord[3]);  
  }
  if (v[4] ==1){
    new_chord.push(current_chord[4]);  
  }
  if (v[5] ==1){
    new_chord.push(current_chord[5]);  
  }
  if (v[6] ==1){
    new_chord.push(current_chord[6]);  
  }
  console.log(new_chord);
 
  // var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();

  synth.triggerAttackRelease(new_chord, '8n');

  progression_tracker ++;
 
}