// Instantiate the model by loading the desired checkpoint.
const model = new mm.MusicVAE(
    'https://storage.googleapis.com/download.magenta.tensorflow.org/' +
    'tfjs_checkpoints/music_vae/trio_4bar_lokl_small_q1');
const player = new mm.Player();

DRUMS = {
  notes: [
      { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
      { pitch: 38, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
      { pitch: 42, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
      { pitch: 46, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
      { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
      { pitch: 42, quantizedStartStep: 3, quantizedEndStep: 4, isDrum: true },
      { pitch: 42, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
      { pitch: 50, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
      { pitch: 36, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
      { pitch: 38, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
      { pitch: 42, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
      { pitch: 45, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
      { pitch: 36, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
      { pitch: 42, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
      { pitch: 46, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
      { pitch: 42, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
      { pitch: 48, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
      { pitch: 50, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  tempos: [{time: 0, qpm: 120}],
  totalQuantizedSteps: 11
  };

  config = {
    noteHeight: 6,
    pixelsPerTimeStep: 30,  // like a note width
    noteSpacing: 1,
    noteRGB: '8, 41, 64',
    activeNoteRGB: '240, 84, 119',
  }

//   const start = () => {
//     document.getElementById("start").style.display = "none";
//     // Resume AudioContext on user action to enable audio.
//     mm.Player.tone.context.resume();
//     model.initialize().then(
//       // Endlessly sample and play back the result.
//       function sampleAndPlay() {
//         return model.sample(1)
//             .then((samples) => player.start(samples[0]))
//             .then(sampleAndPlay);
//       })};

//   let viz = new mm.Visualizer(DRUMS, document.getElementById('canvas'), config);
//   let vizPlayer = new mm.Player(false, {
//       run: (note) => viz.redraw(note),
//       stop: () => {console.log('done');}
//       });
  
//   vizPlayer.start(DRUMS);
 // player.stop();


 // Initialize the model.
music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/drum_kit_rnn');
music_rnn.initialize();

// Create a player to play the sequence we'll get from the model.
rnnPlayer = new mm.Player();

function play() {
  if (rnnPlayer.isPlaying()) {
    rnnPlayer.stop();
    return;
  }
      
  // The model expects a quantized sequence, and ours was unquantized:
  const qns = mm.sequences.quantizeNoteSequence(DRUMS, 4);
  music_rnn
  .continueSequence(qns, rnn_steps, rnn_temperature)
  .then((sample) => rnnPlayer.start(sample));
}
// rnnPlayer.start();