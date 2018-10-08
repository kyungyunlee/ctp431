var song;
var button;
var fft, amplitude, level;
var mysongs = ['vulfpeck_birds_of_a_feather.mp3', 'vulfpeck_deantown.mp3', 'vulfpeck_softparade.mp3'];
var sel; 

// text parameters
var num_letters = 15;
var myletters = [];
var startingheight; 

// energy level histories
var bass_level_history = new Array(num_letters);
var low_mid_level_history = new Array(num_letters);
var mid_level_history = new Array(num_letters);
var high_mid_level_history = new Array(num_letters);
var treble_level_history = new Array(num_letters);

var bass_amp = 2.5;
var energy_threshold=40;

// textfield parameters 
var textfield;
var submit;
var curr_word; 


function preload() {
    soundFormats('mp3', 'ogg');

    // dropdown menu for song selection
    sel = createSelect();
    sel.parent("right-column");

    for (var s=0; s<mysongs.length;s++){
        sel.option(mysongs[s]);
    }
    song = loadSound('assets/project2/' + mysongs[0], successCallback, errorCallback, whileLoading);
    sel.changed(mySelectEvent);

    // play/pause button
    button = createButton("play");
    button.mousePressed(togglePlaying);
    button.parent("right-column");
 }


function setup(){
    createCanvas(windowWidth, windowHeight);
    // pixelDensity(1);

    textAlign(CENTER,BASELINE);
    rectMode(CORNERS);

    // input text
    textfield = select("#fourletters");
    curr_word = textfield.value();
    console.log(curr_word);
    submit = select("#submit");
    submit.mousePressed(newText);

    // audio analyzer 
    fft = new p5.FFT();
    amplitude = new p5.Amplitude();
    fft.setInput(song);
    amplitude.setInput(song);
    //analyzer.smooth(0.9);

    // set base heights for text
    startingheight = windowHeight - energy_threshold;
    bass_level_history.fill(startingheight);
    low_mid_level_history.fill(startingheight);
    mid_level_history.fill(startingheight);
    high_mid_level_history.fill(startingheight);
    treble_level_history.fill(startingheight);
}


function draw(){
    var spectrum = fft.analyze();
    bass_level = fft.getEnergy('bass');
    low_mid_level = fft.getEnergy('lowMid');
    mid_level = fft.getEnergy('mid');
    high_mid_level = fft.getEnergy('highMid');
    treble_level = fft.getEnergy(2600, 14000); // high-mid + treble
    
    background(235, 202, 193);
    push ();
    noStroke();
    fill (color(253, 239,231));
    rect (0,0, windowWidth, windowHeight/4*3.5); // floor rectangle
    pop ();

    // remove if more than 20 histories 
    if (bass_level_history.length > num_letters){
        bass_level_history.splice(0,1);
    } 
    if (low_mid_level_history.length>num_letters){
        low_mid_level_history.splice(0,1);
    }
    if (mid_level_history.length>num_letters){
        mid_level_history.splice(0,1);
    }
    if (high_mid_level_history.length>num_letters){
        high_mid_level_history.splice(0,1);
    }
    if (treble_level_history.length>num_letters){
        treble_level_history.splice(0,1);
    }
    
    // threshold for the energy value 
    if (bass_level > energy_threshold){ 
        bass_level_history.push(bass_level);
    }
    else {
        bass_level_history.push(energy_threshold);
    }

    if (low_mid_level > energy_threshold){ 
        low_mid_level_history.push(low_mid_level);
    }
    else {
        low_mid_level_history.push(energy_threshold);
    }

    if (mid_level > energy_threshold){ 
        mid_level_history.push(mid_level);
    }
    else {
        mid_level_history.push(energy_threshold);
    }

    if (high_mid_level > energy_threshold){ 
        high_mid_level_history.push(high_mid_level);
    }
    else {
        high_mid_level_history.push(energy_threshold);
    }
    if (treble_level > energy_threshold){ 
        treble_level_history.push(treble_level);
    }
    else {
        treble_level_history.push(energy_threshold);
    }

    stroke(0);
    strokeWeight(4);
    
    // text stuff
    var base_fontsize = windowWidth/10;
    var words = split(curr_word, '') ;
    if (words.length != 4){
        console.log("wrong input");
        words = ['v', 'u', 'l', 'f'];
    }
    
    // text stuff 
    var startingWidth = windowWidth/4;
    var gap = base_fontsize *1.6 ;
    var letter_colors = [color(249, 115 ,117), color(254,234,110), color(104, 185, 252), color(107, 253, 165)];
    var xpos = [startingWidth, startingWidth+gap, startingWidth+gap*2, startingWidth+gap*3];
    var ypos = [bass_level_history, low_mid_level_history, mid_level_history, treble_level_history];

    textFont("Arial Black");
    for (var c=num_letters-1; c>=0;c--){
        textSize(base_fontsize + (c*12));
        for (var w=0; w<words.length;w++){
            fill (letter_colors[w]);
            var diff_h = map(ypos[w][num_letters-1-c], energy_threshold, 255, energy_threshold, windowHeight /4);
            text (words[w], xpos[w], startingheight - diff_h*bass_amp);
        }
        translate(5,5);
    }

    // frontmost text 
    textSize(base_fontsize);

    for (var w=0; w<words.length;w++){
        fill (letter_colors[w]);
        var diff_h = map(ypos[w][num_letters-1], energy_threshold, 255, energy_threshold, windowHeight /4);
        text (words[w], xpos[w], startingheight - diff_h*bass_amp);
    }

    // add frequency descriptions at the bottom
    var freq_range = ['Bass: 20~140hz', 'Low-mid: 140~400hz', 'Mid: 400~2600hz', 'High: 2600hz~']
    textFont("Helvetica");
    noStroke();
    textSize(13);
    fill (color(0));
    textAlign(LEFT, BASELINE);
    // text ("put your mouse here for \nfrequency descriptions of each letter", 0 , windowHeight*0.84);
    if (mouseY > windowHeight/4*3.5) {
        for (var i=0;i<words.length;i++){
            textSize(13)
            text (freq_range[i],xpos[i], windowHeight*0.87);
        }
    } 
 
}


function newText(){
    curr_word = textfield.value();
    console.log(curr_word);
}


function mySelectEvent (){
    if (song && song.isPlaying()){
        song.stop();
        curr_segment=0;
    }
    button.html("loading..please wait");
    song_name = sel.value();
    song = loadSound('assets/project2/' + song_name, successCallback, errorCallback, whileLoading);

    // connect input to new song
    fft.setInput(song);
    amplitude.setInput(song);
}


function successCallback(){
    button.html("play!");
    console.log("loaded");
}


function errorCallback(){
}


function whileLoading(total){
    console.log(total);
    button.html("loading.." + nf(total*100,2,0)+"%");
}


function togglePlaying(){
    if (song.isPlaying()){
        song.stop();
        console.log("Song stopped");
        curr_segment = 0;
        button.html("play!");
    }
    else {
        song.play();
        console.log("Song playing");
        curr_segment=0;
        button.html("pause");
    }
}
