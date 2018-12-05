var C = ["G4", "E4", "C4", "C1", "G0", "E0","C0"];
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
// var CHRISTMAS = [C, C7, F, Dm7b5];
// key: c major 
// 
 


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
  var basic_chords = [C,C, F, F, F, F, F7, F7, G, G, G,G,C, C];
  var progression = [];
  for (var i=0; i<53; i++) {
    // var rand_chord_idx = Math.floor(Math.random() * basic_chords.length);
    rand_chord_idx = i % basic_chords.length;
    progression.push(basic_chords[rand_chord_idx]);
  }
  return progression;

}

//--------------------------- INSTRUMENTS -----------------------------------------------// 
var synth = new Tone.PolySynth(7, Tone.Synth).toMaster();
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

  

var piano = SampleLibrary.load({
  instruments:"piano",
}).toMaster();

var flute = SampleLibrary.load({
  instruments:"flute",
}
).toMaster();

var saxophone = SampleLibrary.load({
  instruments:"saxophone",
}).toMaster();

var guitar_electric=SampleLibrary.load({
  instruments:"guitar-electric",
}).toMaster();  

var xylophone = SampleLibrary.load({
  instruments:"xylophone",
}).toMaster();  


var human_voice = new Tone.Sampler({
  'C4' :'assets/project4/tonejs-instruments/samples/Alesis-Sanctuary-QCard-Choir-Aah-C4.wav'
},
{"fadeOut" : "64n" }

).toMaster();


//---------------------------------------------------------------------------------------------// 
// Instrument pre-set 
const TR808 = [kick, lowtom, midtom, snare, closed_hihat, hitom, cymbol]; 
// const JAZZ_INST = [kick, contrabass, contrabass, contrabass, saxophone, saxophone, saxophone];
const PIANO = [piano, piano, piano, piano, piano, piano, piano];
const GUITAR = [guitar_electric, guitar_electric, guitar_electric, guitar_electric, guitar_electric, guitar_electric, guitar_electric];
const SAX = [saxophone, saxophone,saxophone,saxophone,saxophone,saxophone,saxophone];
// const CONTRABASS = [contrabass, contrabass,contrabass,contrabass,contrabass,contrabass,contrabass];
const FLUTE = [flute, flute, flute,flute, flute, flute, flute];
const XYLOPHONE = [xylophone, xylophone, xylophone, xylophone, xylophone, xylophone, xylophone];
// const CHRISTMAS = [];
const CHOIR = [human_voice, human_voice, human_voice, human_voice, human_voice, human_voice, human_voice];


const GREEN =  ['rgb(198, 227, 143)', 'rgb(126, 199, 115)', 'rgb(42,153,64)', 'rgb(29, 96, 41)'];
const PINK = [];
const REDYELLOW = [ 'rgb(222,215,0)', 'rgb(233,124,0)', 'rgb(216, 46, 8)', 'rgb(216, 46, 8)'];
const REDGREEN = ['rgb(225,32,44)', 'rgb(23, 160,81)', 'rgb(207,44,45)', 'rgb(33,146,76)'];

// GLOBAL VARIABLES TO CHANGE OVERALL SETTINGS 
var synthPart;
var current_progression = basic_progression();
var current_instrument_set = PIANO;
var current_colors = GREEN;

// USER SETTING INST AND CHORDS 
function set_piano() { 
  console.log("setting inst to piano");

  if (current_instrument_set == TR808) {
    current_progression = basic_progression();
  }
  current_instrument_set = PIANO;
  current_colors = GREEN;
  colorSequencer();
}

function set_percussion(){
  console.log("setting inst to percussion");
  current_instrument_set = TR808;
  var noChord = ["E3", "E3", "E3", "E3", "E3", "E3", "E3"];
  var progression = [];
  for (var i=0; i<53; i++) {
    progression.push(noChord);
  }
  current_progression = progression ;

  current_colors = REDYELLOW;
  colorSequencer();
}

function set_flute(){
  console.log("setting inst to flute");
  if (current_instrument_set == TR808) {
    current_progression = basic_progression();
  }
  current_instrument_set = FLUTE;
  current_colors = GREEN;
  colorSequencer();
}

function set_xylophone(){

  if (current_instrument_set == TR808) {
    current_progression = basic_progression();
  }
  current_instrument_set = XYLOPHONE;
  current_colors = GREEN;
  colorSequencer();
}

function set_cmajor() { 
  console.log("setting chord to c maj");
  current_progression =  basic_progression();
  // resetChords(binary_contribs);
}

function set_christmas(){
  current_instrument_set = PIANO;
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


//---------------------------------------------------------------------------------------------//

const arrayColumn = (arr, n) => arr.map(x => x[n]);

// var chords_to_play = []; // contain chord progressions (53 in total)

function githubCommitProcessor(binaryContrib, numContrib){
  // Called once when new user name is received
  console.log("binary contribution matrix", binaryContrib.length, binaryContrib[0].length);

  // UPDATE SEQUENCER WITH MY DATA ! 
  colorSequencer();

  make_play_button();
}


function make_play_button(){
  var playbutton = document.getElementById("play_button");
  playbutton.innerHTML = "play";
  playbutton.isPlaying = false;
  playbutton.addEventListener('click', function () {
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
  })

}

var range = [];
for (var i = 0; i < 53; i++) {
    range.push(i);
}

function playAll() { 
  var idx = -1;
  var moment = 0;
  //chords_to_play
  synthPart = new Tone.Sequence(function(time, chordidx) { 
    var col = arrayColumn(binary_contribs, chordidx);
    var chord = current_progression[chordidx];
    // console.log(time, chords_to_play[chordidx]);
    var vel = Math.random() * 0.5 + 0.5;

    if (current_instrument_set == TR808) {
      if (col[0] == 1) { current_instrument_set[0].start(time, 0, '8n', 0, vel);};
      if (col[1] == 1) { current_instrument_set[1].start(time, 0, '8n', 0, vel);};
      if (col[2] == 1) { current_instrument_set[2].start(time, 0, '8n', 0, vel);};
      if (col[3] == 1) { current_instrument_set[3].start(time, 0, '8n', 0, vel);};
      if (col[4] == 1) { current_instrument_set[4].start(time, 0, '8n', 0, vel);};
      if (col[5] == 1) { current_instrument_set[5].start(time, 0, '8n', 0, vel);};
      if (col[6] == 1) { current_instrument_set[6].start(time, 0, '8n', 0, vel);};
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

    // schedule updates to the GUI
    Tone.Draw.schedule(function () { 
      $('#current_chord').text(chord);
      if (moment != time) { 
        idx++;
        console.log(idx, time);
        current_col = arrayColumn(rects, idx);
        for (var i=0; i<7; i++) {
            rects[i][idx].stroke = 'rgb(210,210,210)';
            rects[i][idx].linewidth = 2;
        }
        two.update();
      }
    })



  }, range, '8n').start();

  synthPart.loop = false;
//   // synthPart.humanize = true;

  // Tone.Transport.bpm.value = current_bpm;
  Tone.Transport.swing=  0.2;
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
  var username = document.getElementById("username").value;
  console.log("recieved", username);
  var url = 'https://github-contributions-api.now.sh/v1/' + username;
  httpGetAsync(url, parse_my_contributions);
}



//--------------------------- SEQUENCER DRAWER  -----------------------------------------------// 

var elem;
var two;
var rects = [];
// Make an instance of two and place it on the page.
window.onload = function () { 
  elem = document.getElementById("sequencer");
  var params = { width: 1000, height:150 };
  two = new Two(params).appendTo(elem);
  var rect_size = 13;
  var gap_size = 3;

// two has convenience methods to create shapes.
for (var i = 0; i<7; i++){
  var row = [];
  for (var j=0; j<53; j++) {
    var rect = two.makeRectangle( rect_size/2 + j * (rect_size + gap_size), rect_size /2 + i *(rect_size + gap_size),rect_size, rect_size);
    rect.fill = 'rgb(230, 230, 230)';
    rect.opacity = 0.75;
    rect.noStroke();
    row.push(rect);
  }
  rects.push(row);
}
  two.update();


/// BPM slider 
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
// output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    Tone.Transport.bpm.value = this.value;
}

}

function colorSequencer() {
  // console.log(binaryContrib);
  for (var i=0; i < binary_contribs.length; i++ ) { // 7 
    for (var j=0; j <binary_contribs[i].length; j++ ){ // 53
        if (binary_contribs[i][j] == 1 ){
          if (num_contribs[i][j] == 1 ) { rects[i][j].fill = current_colors[0];}
          else if (num_contribs[i][j] <3 ) {rects[i][j].fill = current_colors[1];}
          else if (num_contribs[i][j] <7 ) {rects[i][j].fill = current_colors[2];}
          else { rects[i][j].fill = current_colors[3];}
        }
        rects[i][j].noStroke();
    }
  }
  two.update();
}


