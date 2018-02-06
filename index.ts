import TonePiano, { Piano } from 'tone-piano';
import Tone, { Buffer, Master, Part, Transport } from 'tone';
import * as Tonal from 'tonal';

// Tone.js
// TonePiano
// tonal: https://github.com/danigb/tonal

// https://github.com/tambien/Piano/blob/master/Demo.js
// https://github.com/PAIR-code/deeplearnjs/blob/master/demos/performance_rnn/performance_rnn.ts

const SALAMANDER_URL = 'https://storage.googleapis.com/learnjs-data/' +
    'Piano/Salamander/';
const CHECKPOINT_URL = 'https://storage.googleapis.com/learnjs-data/' +
    'checkpoint_zoo/performance_rnn_v2';

const piano = new Piano([21, 108], 5).toMaster();

piano.load(SALAMANDER_URL)
	.then(() => {
		console.log('piano loaded!');
	})

// TODO refactor
Piano.prototype.playNote = function(note: string | number) {
	this.keyDown(note, this.now());
	this.keyUp(note, this.now() + 1);
}

// TODO delay, zip array
Piano.prototype.playNoteSeq = function(notes: string[] | number[]) {
	const delay = 0.5;
	for (let i = 0; i < notes.length; i++) {
		let note = notes[i];
		this.keyDown(note, this.now() + delay * i);
		this.keyUp(note, this.now() + delay * i + 1);
	}
}

Piano.prototype.playChord = function(chord: string[] | number[]) {
	for (let note of chord) {
		this.playNote(note);
	}
}

// Globals
window['piano'] = piano;
window['Tonal'] = Tonal;
