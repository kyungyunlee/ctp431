// 3 ways of analyzing music
// 1. from server mp3
// 2. from local mp3
// 3. from youtube/mic input 

// 1, from server mp3 
var song;
var button; // play mp3 song button
var fft, amplitude, level;
var mysongs = ['vulfpeck_birds_of_a_feather.mp3', 'vulfpeck_animalspirit.mp3', 'vulfpeck_deantown.mp3', 'vulfpeck_softparade.mp3'];
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
var default_display_letter = 8;
var num_letters = 10;
var myletters = [];
var startingheight;
var color_list;
var letter_colors = [];

// textfield parameters 
var textfield;
var submit;
var curr_word;

// freq level histories
var arraysForFreqLevel = [];
var arraysForLetters = [];
for (var i = 0; i < default_display_letter; i++) {
    arraysForLetters.push(new Array(num_letters));
    arraysForFreqLevel.push(0);
}

var bass_amp = 2.5; // amplifier for letter height
var energy_threshold = 40;


function preload() {
    soundFormats('mp3', 'ogg');

    // dropdown menu for song selection
    sel = createSelect();
    sel.parent("select-song");

    for (var s = 0; s < mysongs.length; s++) {
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


function setup() {
    var canv = createCanvas(windowWidth, windowHeight);
    canv.parent("canvasContainer");

    textAlign(CENTER, BASELINE);
    rectMode(CORNERS);

    // input four letters
    textfield = select("#fourletters");
    curr_word = textfield.value();
    submit = select("#submit");
    submit.mousePressed(newText);

    // audio analyzer 
    fft = new p5.FFT();
    amplitude = new p5.Amplitude();
    fft.setInput(song);
    amplitude.setInput(song);

    // mic input && audio link
    mic = new p5.AudioIn();
    // youtubelink = select("#youtube-link");
    // curr_link = youtubelink.value();
    // console.log(curr_link);
    // submitlink = select("#submit-link");
    // submitlink.mousePressed(newlink);

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


    // set base heights for eight letters 
    startingheight = windowHeight - energy_threshold;
    for (var i = 0; i < default_display_letter; i++) {
        arraysForLetters[i].fill(startingheight);
    }

    // random colors for each letter
    color_list = [color(249, 115, 117), color(254, 234, 110), color(104, 185, 252), color(204, 235, 140), color(142, 189, 109), color(78, 176, 167), color(250, 152, 66), color(191, 126, 181), color(171, 202, 206), color(183, 200, 41)];
    for (var i = 0; i < default_display_letter; i++) {
        letter_colors.push(random(color_list));
    }
}


function draw() {
    background(235, 202, 193);

    // analyze frequency
    var spectrum = fft.analyze();
    // divide the frequency range into number of input letters
    var freq_range = (log(14000) - log(20)) / curr_word.length;
    for (var i = 0; i < curr_word.length; i++) {
        var lower_freq = exp(log(20) + (freq_range * i));
        var higher_freq = exp(log(20) + (freq_range * (i + 1)));
        var freq_level = fft.getEnergy(lower_freq, higher_freq);
        arraysForFreqLevel[i] = freq_level;
    }

    // rectangle on the floor
    push();
    noStroke();
    fill(color(253, 239, 231));
    rect(0, 0, windowWidth, windowHeight / 4 * 3.5); // floor rectangle
    pop();

    // remove if more than 20 histories accumulate
    for (var i = 0; i < arraysForLetters.length; i++) {
        if (arraysForLetters[i].length > num_letters) {
            arraysForLetters[i].splice(0, 1);
        }
    }

    // add the frequency level into the arraysForLetters(height of the letters)
    for (var i = 0; i < arraysForFreqLevel.length; i++) {
        if (arraysForFreqLevel[i] > energy_threshold) {
            arraysForLetters[i].push(arraysForFreqLevel[i]);
        } else {
            arraysForLetters[i].push(energy_threshold);
        }
    }

    // letter stuff
    stroke(0);
    strokeWeight(4);
    var base_fontsize = windowWidth / (curr_word.length * 2.3);
    var words = split(curr_word, '');

    var startingWidth = windowWidth / 2 - (curr_word.length - 1) * ((windowWidth * 0.3) / (curr_word.length));
    var gap = base_fontsize * 1.6;

    var xpos = [];
    var ypos = [];
    for (var i = 0; i < curr_word.length; i++) {
        xpos.push(startingWidth + gap * i);
        ypos.push(arraysForLetters[i]);
    }
    textFont("Arial Black");
    for (var c = num_letters - 1; c >= 0; c--) {
        textSize(base_fontsize + (c * 10));
        for (var w = 0; w < words.length; w++) {
            fill(letter_colors[w]);
            var diff_h = map(ypos[w][num_letters - 1 - c], energy_threshold, 255, energy_threshold, windowHeight / 4);
            text(words[w], xpos[w], startingheight - diff_h * bass_amp);
        }
        translate(5, 5);
    }

    // frontmost text 
    textSize(base_fontsize);
    for (var w = 0; w < words.length; w++) {
        fill(letter_colors[w]);
        var diff_h = map(ypos[w][num_letters - 1], energy_threshold, 255, energy_threshold, windowHeight / 4);
        text(words[w], xpos[w], startingheight - diff_h * bass_amp);
    }

    // add frequency descriptions at the bottom
    var ranges = [];
    for (var i = 0; i < curr_word.length; i++) {
        var lower_freq = int(exp(log(20) + (freq_range * i)));
        var higher_freq = int(exp(log(20) + (freq_range * (i + 1))));
        ranges.push(str(lower_freq) + '~' + str(higher_freq));
    }

    textFont("Helvetica");
    noStroke();
    textSize(12);
    fill(color(0));
    textAlign(LEFT, BASELINE);
    if (mouseY > (windowHeight - energy_threshold) * 0.9) {
        text("Frequency \n range(hz): ", xpos[0] - gap, windowHeight * 0.855);
        for (var i = 0; i < words.length; i++) {
            textSize(12)
            text(ranges[i], xpos[i], windowHeight * 0.865);
        }
    }
}


/***** function for handling new four letter input *****/
function newText() {
    curr_word = textfield.value();
    console.log(curr_word, curr_word.length);

    // reset all the arrays with the new input word length 
    arraysForLetters = [];
    arraysForFreqLevel = [];
    letter_colors = [];
    for (var i = 0; i < curr_word.length; i++) {
        arraysForLetters.push(new Array(num_letters));
        arraysForFreqLevel.push(0);
        letter_colors.push(random(color_list));
    }
}


/***** function for handling new youtube link *****/
/** 
function newlink() {
    if (is_youtube_on) {
        closeYoutube();
    }
    curr_link = youtubelink.value();
    // handle in case user inputs "watch" link instead of "/embed"
    if (match(curr_link, "watch")) {
        var link_id = split(curr_link, "=")[1];
        curr_link = "https://www.youtube.com/embed/" + link_id;
    }
    console.log("curr link " + curr_link);
    if (song.isPlaying()) {
        stopmp3();
    }
    // create iframe
    iframe = createElement('iframe');
    iframe.parent("youtube-vid");
    iframe.attribute("id", "my-yt");
    iframe.attribute("src", curr_link);
    iframe.attribute("width", 200);
    iframe.attribute("height", 120);
    iframe.attribute("allow", "autoplay; encrypted-media");
    // iframe.attribute("onerror", "check_valid_yt()")
    startmic();
    is_youtube_on = true;
}


function closeYoutube() {
    iframe.remove();
    stopmic();
    is_youtube_on = false;
}
**/ 

/***** functions for handling user's local mp3 file *****/
function handleFile(file) {
    console.log(file);
    usersong = loadSound(file, successCallback, errorCallback, whileLoading);
    fft.setInput(usersong);
    amplitude.setInput(usersong);
}


function getUserFile() {
    is_user_song = true;
    usersongButton.html("loading..please wait")
}


/***** functions for handling and loading new sound file  *****/
function mySelectEvent() {
    if (song && song.isPlaying()) {
        stopmp3();
    } else if (usersong && usersong.isPlaying()) {
        stopUserMp3();
    }
    button.html("loading..please wait")
    song_name = sel.value();
    song = loadSound('assets/project2/' + song_name, successCallback, errorCallback, whileLoading);

    // connect input to new song
    fft.setInput(song);
    amplitude.setInput(song);
}


function successCallback() {
    if (is_user_song) {
        usersongButton.html("play!");
    } else {
        button.html("play!");
    }
    console.log("loaded");
}


function errorCallback() {}


function whileLoading(total) {
    console.log(total);
    button.html("loading.." + nf(total * 100, 2, 0) + "%");

}


/*****  Play,stop functions for mp3 and mic  ****/
function stopmp3() {
    song.stop();
    console.log("Song stopped");
    button.html("play!");

    /*
    var currentAudioTitle = select("#currentAudioTitle");
    currentAudioTitle.remove();
    */

}


function playmp3() {
    fft.setInput(song);
    amplitude.setInput(song);

    song.play();
    console.log("Song playing " + song.url);
    button.html("pause");

    /*
    var currentAudioTitle = createP(song.url);
    currentAudioTitle.attribute("id", "currentAudioTitle");
    var placeholder = select("#current-audio-file");
    currentAudioTitle.parent(placeholder);
    */
}


function playUserMp3() {
    fft.setInput(usersong);
    amplitude.setInput(usersong);

    usersong.play();
    console.log("User Song playing");
    usersongButton.html("pause");

    is_user_song = true;

    /*
    var currentAudioTitle = createP(usersong.url);
    var placeholder = select("#current-audio-file");
    currentAudioTitle.parent(placeholder);
    */
}


function stopUserMp3() {
    usersong.stop();
    console.log("User Song stopped");
    usersongButton.html("play!");
    is_user_song = false;
}


function startmic() {
    fft.setInput(mic);
    amplitude.setInput(mic);

    mic.start();
    console.log("mic on");
    micbutton.html("mic off");
    is_mic_on = true;
}


function stopmic() {
    mic.stop();
    console.log("mic off");
    micbutton.html("mic on");
    is_mic_on = false;
}


function togglePlaying() {
    // turn off youtube, mic if they were on 
    if (is_youtube_on) {
        closeYoutube();
    }
    if (is_mic_on) {
        stopmic();
    }
    if (usersong && usersong.isPlaying()) {
        stopUserMp3();
    }

    if (song.isPlaying()) {
        stopmp3();
    } else {
        playmp3();
    }
}


function toggleUserSongPlaying() {
    if (is_youtube_on) {
        closeYoutube();
    }
    if (is_mic_on) {
        stopmic();
    }
    if (song.isPlaying()) {
        stopmp3();
    }

    if (usersong.isPlaying()) {
        stopUserMp3();
    } else {
        playUserMp3();
    }
}


function micTogglePlaying() {
    // turn of youtube, mp3 if they were on
    if (song.isPlaying()) {
        stopmp3();
    }
    if (usersong && usersong.isPlaying()) {
        stopUserMp3();
    }
    if (is_youtube_on) {
        closeYoutube();
    }

    if (is_mic_on) {
        stopmic();
    } else {
        startmic();
    }
}