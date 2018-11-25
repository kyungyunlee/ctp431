

var keys = new Tone.Players({
  "A" : "assets/audio/A1.[mp3|ogg]",
  "C#" : "assets/audio/Cs2.[mp3|ogg]",
  "E" : "assets/audio/E2.[mp3|ogg]",
  "F#" : "assets/audio/Fs2.[mp3|ogg]",
  "F#" : "assets/audio/Fs2.[mp3|ogg]",
  "F#" : "assets/audio/Fs2.[mp3|ogg]",
  "F#" : "assets/audio/Fs2.[mp3|ogg]",
}, {
  "volume" : -10,
  "fadeOut" : "64n",
}).toMaster();


var noteNames = ["F#", "F#", "F#", "F#", "E", "C#", "A"];
		var loop = new Tone.Sequence(function(time, col){
			var column = matrix1.matrix[col];
			for (var i = 0; i < 7; i++){
				if (column[i] === 1){
					//slightly randomized velocities
					var vel = Math.random() * 0.5 + 0.5;
					keys.get(noteNames[i]).start(time, 0, "32n", 0, vel);
				}
			}
		}, [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");
    Tone.Transport.start();
    


