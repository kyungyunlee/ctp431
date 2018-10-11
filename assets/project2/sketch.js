// 3 ways of analyzing music
// 1. from server mp3
// 2. from local mp3
// 3. from youtube/mic input 

var audio;
var currently_playing;
// 1, from server mp3 
var song;
var button; // play mp3 song button
var fft, amplitude, level;
var mysongs = ['vulfpeck_birds_of_a_feather.mp3', 'vulfpeck_animalspirit.mp3','vulfpeck_deantown.mp3', 'vulfpeck_softparade.mp3'];
// var mysongs = ['https://www.youtube.com/embed/qTUnDV3MgVQ']
var sel; 

// 2. from local mp3
var usersong;
var usersonglink;
var usersongButton;
var is_user_song = false;

// 3. from mic input 
var mic;
var micbutton; // mic input on/off button
var is_mic_on = false;
var iframe;
var youtubelink;
var submitlink;
var curr_link;
var is_youtube_on = false;


// text parameters
var num_letters = 15;
var myletters = [];
var startingheight; 
// textfield parameters 
var textfield;
var submit;
var curr_word; 

// energy level histories
var bass_level_history = new Array(num_letters);
var low_mid_level_history = new Array(num_letters);
var mid_level_history = new Array(num_letters);
var high_mid_level_history = new Array(num_letters);
var treble_level_history = new Array(num_letters);

var bass_amp = 2.5;
var energy_threshold=40;


function preload() {
    soundFormats('mp3', 'ogg');

    // dropdown menu for song selection
    sel = createSelect();
    sel.parent("select-song");

    for (var s=0; s<mysongs.length;s++){
        sel.option(mysongs[s]);
    }
    // preload with default song
    song = loadSound('assets/project2/' + mysongs[0], successCallback, errorCallback, whileLoading);

    sel.changed(mySelectEvent);

    // mp3 play/pause button
    button = createButton("play");
    button.mousePressed(togglePlaying);
    button.parent("select-song");
 }


function setup(){
    var canv = createCanvas(windowWidth, windowHeight);
    canv.parent("canvasContainer");
    // pixelDensity(1);

    textAlign(CENTER,BASELINE);
    rectMode(CORNERS);

    // input four letters
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

    // mic input && audio link
    mic = new p5.AudioIn();
    youtubelink = select("#youtube-link");
    curr_link = youtubelink.value();
    console.log(curr_link);
    submitlink = select("#submit-link");
    submitlink.mousePressed(newlink);

    // mic on/off button
    micbutton = createButton("use mic");
    micbutton.mousePressed(micTogglePlaying);
    micbutton.parent("mic");

    // user song input button
    usersonglink = createFileInput(handleFile);
    usersonglink.parent("user-mp3");
    usersonglink.changed(getUserFile);
    usersongButton = createButton("play");
    usersongButton.parent("user-mp3");
    usersongButton.mousePressed(toggleUserSongPlaying);
    

    // set base heights for four letters 
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
    // rectangle on the floor
    push ();
    noStroke();
    fill (color(253, 239,231));
    rect (0,0, windowWidth, windowHeight/4*3.5); // floor rectangle
    pop ();

    // remove if more than 20 histories accumulate
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
    } else {
        bass_level_history.push(energy_threshold);
    }

    if (low_mid_level > energy_threshold){ 
        low_mid_level_history.push(low_mid_level);
    } else {
        low_mid_level_history.push(energy_threshold);
    }

    if (mid_level > energy_threshold){ 
        mid_level_history.push(mid_level);
    } else {
        mid_level_history.push(energy_threshold);
    }

    if (high_mid_level > energy_threshold){ 
        high_mid_level_history.push(high_mid_level);
    } else {
        high_mid_level_history.push(energy_threshold);
    }

    if (treble_level > energy_threshold){ 
        treble_level_history.push(treble_level);
    } else {
        treble_level_history.push(energy_threshold);
    }

    
    // four letter stuff
    stroke(0);
    strokeWeight(4);
    var base_fontsize = windowWidth/10;
    var words = split(curr_word, '') ;
    if (words.length != 4){
        console.log("wrong input");
        words = ['v', 'u', 'l', 'f'];
    }
    
    var startingWidth = windowWidth/4;
    var gap = base_fontsize *1.6 ;
    var letter_colors = [color(249, 115 ,117), color(254,234,110), color(104, 185, 252), color(107, 253, 165)];
    var xpos = [startingWidth, startingWidth+gap, startingWidth+gap*2, startingWidth+gap*3];
    var ypos = [bass_level_history, low_mid_level_history, mid_level_history, treble_level_history];

    textFont("Arial Black");
    for (var c=num_letters-1; c>=0;c--){
        textSize(base_fontsize + (c*11));
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

/***** function for handling new four letter input *****/
function newText(){
    curr_word = textfield.value();
    console.log(curr_word);
}

/***** function for handling new youtube link *****/
function newlink(){
    if (is_youtube_on) {
        closeYoutube();
    }
    curr_link = youtubelink.value();
    // handle in case user inputs "watch" link instead of "/embed"
    if (match(curr_link, "watch")){
       var link_id = split(curr_link, "=")[1];
       curr_link = "https://www.youtube.com/embed/" + link_id;
    }
    console.log("curr link " + curr_link);
    if (song.isPlaying()){
        stopmp3();
    }
    // create iframe
    iframe = createElement('iframe');
    iframe.parent("youtube-vid");
    iframe.attribute("id", "my-yt");
    iframe.attribute("src", curr_link);
    iframe.attribute("width", 250);
    iframe.attribute("height", 150);
    iframe.attribute("allow", "autoplay; encrypted-media");
    // iframe.attribute("onerror", "check_valid_yt()")
    startmic();
    is_youtube_on = true;
    // check_valid_yt(curr_link);
}

function closeYoutube(){
    iframe.remove();
    stopmic();
    is_youtube_on = false;
}

/***** functions for handling user's local mp3 file *****/
function handleFile(file){
    console.log(file);
    usersong = loadSound(file, successCallback, errorCallback, whileLoading);
    fft.setInput(usersong);
    amplitude.setInput(usersong);
}

function getUserFile(){
    is_user_song = true;
    usersongButton.html("loading..please wait")
}

/***** functions for handling and loading new sound file  *****/

function mySelectEvent (){
    if (song && song.isPlaying()){
        stopmp3();
    } else if (usersong && usersong.isPlaying()){
        stopUserMp3();
    }
    button.html("loading..please wait")
    song_name = sel.value();
    song = loadSound('assets/project2/' + song_name, successCallback, errorCallback, whileLoading);

    // connect input to new song
    fft.setInput(song);
    amplitude.setInput(song);
}


function successCallback(){
    if (is_user_song) { 
        usersongButton.html("play!");
    } else { 
        button.html("play!");
    }
    console.log("loaded");
}

function errorCallback(){}


function whileLoading(total){
    console.log(total);
    button.html("loading.." + nf(total*100,2,0)+"%");

}


/*****  Play,stop functions for mp3 and mic  ****/
function stopmp3(){
    song.stop();
    console.log("Song stopped");
    button.html("play!");


    var currentAudioTitle = select("#currentAudioTitle");
    currentAudioTitle.remove();

}

function playmp3(){
    fft.setInput(song);
    amplitude.setInput(song);

    song.play();
    console.log("Song playing " + song.url);
    button.html("pause");
    
    var currentAudioTitle = createP(song.url);
    currentAudioTitle.attribute("id", "currentAudioTitle");
    var placeholder = select("#current-audio-file");
    currentAudioTitle.parent(placeholder);
}

function playUserMp3(){
    fft.setInput(usersong);
    amplitude.setInput(usersong);

    usersong.play();
    console.log("User Song playing");
    usersongButton.html("pause");

    is_user_song = true;

    var currentAudioTitle = createP(usersong.url);
    var placeholder = select("#current-audio-file");
    currentAudioTitle.parent(placeholder);
}

function stopUserMp3(){
    usersong.stop();
    console.log("User Song stopped");
    usersongButton.html("play!");
    is_user_song = false;
}

function startmic(){
    fft.setInput(mic);
    amplitude.setInput(mic);

    mic.start();
    console.log("mic on");
    micbutton.html("mic off");
    is_mic_on = true;
}

function stopmic(){
    mic.stop();
    console.log("mic off");
    micbutton.html("mic on");
    is_mic_on = false;
}

function togglePlaying(){
    // turn off youtube, mic if they were on 
    if (is_youtube_on){ closeYoutube(); }
    if (is_mic_on){ stopmic();}
    if (usersong && usersong.isPlaying()) { stopUserMp3(); }
    
    if (song.isPlaying()){ stopmp3(); } 
    else { playmp3(); }
}

function toggleUserSongPlaying(){
    if (is_youtube_on) { closeYoutube(); }
    if (is_mic_on) { stopmic(); }
    if (song.isPlaying()) { stopmp3(); }

    if (usersong.isPlaying()) { stopUserMp3(); }
    else { playUserMp3(); }
}

function micTogglePlaying(){
    // turn of youtube, mp3 if they were on
    if (song.isPlaying()){ stopmp3();}
    if (usersong && usersong.isPlaying()) { stopUserMp3(); }
    if (is_youtube_on){ closeYoutube(); } 

    if (is_mic_on){ stopmic();} 
    else { startmic(); }
}
