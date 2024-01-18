const audioContext = new AudioContext()

const NOTE_DETAILS = [
  { note: "C", key: "Z", frequency: 261.626, active:false },
  { note: "Db", key: "S", frequency: 277.183, active:false},
  { note: "D", key: "X", frequency: 293.665,active:false },
  { note: "Eb", key: "D", frequency: 311.127,active:false },
  { note: "E", key: "C", frequency: 329.628 ,active:false},
  { note: "F", key: "V", frequency: 349.228 ,active:false},
  { note: "Gb", key: "G", frequency: 369.994 ,active:false},
  { note: "G", key: "B", frequency: 391.995 ,active:false},
  { note: "Ab", key: "H", frequency: 415.305 ,active:false},
  { note: "A", key: "N", frequency: 440 ,active:false},
  { note: "Bb", key: "J", frequency: 466.164 ,active:false},
  { note: "B", key: "M", frequency: 493.883 ,active:false},
];

document.addEventListener("keydown", (e) => {
  if (e.repeat) {
    return;
  }
  let keypressed = e.code;
  // console.log(keypressed);   //KeyD
  let note_detail = checkthekey(keypressed);
  console.log(note_detail);
  if (note_detail == null) {
    return;
  }
  note_detail.active = true;
  playNotes()
});
document.addEventListener("keyup", (e) => {
  if (e.repeat) {
    return;
  }
  let keypressed = e.code;
  let note_detail = checkthekey(keypressed);
  console.log(note_detail);
  if (note_detail == null) {
    return;
  }
  note_detail.active = false;
  playNotes()
});

function checkthekey(keypressed) {
  return NOTE_DETAILS.find((n) => `Key${n.key}` === keypressed);
}

function playNotes(){
  console.log("play notes");
  NOTE_DETAILS.forEach(n => {
    let selec1 = document.querySelector(`[data-note="${n.note}"]`)
    selec1.classList.toggle('active',n.active)
    if (n.oscilllator!= null) {
      n.oscilllator.disconnect()
    }

  });
  const activeNotes = NOTE_DETAILS.filter(n => n.active)
  const gain = 1/activeNotes.length
  activeNotes.forEach(n=> {

    startNote(n,gain)
  })

}

function startNote(notedetail,gain)
{
  const gainNode = audioContext.createGain()
  gainNode.gain.value = gain
  const oscilllator = audioContext.createOscillator()
  oscilllator.frequency.value = notedetail.frequency
  oscilllator.type = 'sine'
  oscilllator.connect(gainNode).connect(audioContext.destination)
  oscilllator.start()
  notedetail.oscilllator = oscilllator
}