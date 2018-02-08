// import * as Tone from 'tone-piano/node_modules/tone';
import * as Tone from 'tone';

import { Piano } from 'tone-piano';
import * as Tonal from 'tonal';

import Midi from './Midi';
import * as MidiConvert from 'midiconvert'

import './view';

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
Piano.prototype.playNote = function(note: string | number, dur: Tone.Time = '4n', time: Tone.Time = Tone.now()) {
	dur = Tone.Transport.toSeconds(dur);
	this.keyDown(note, time);
	this.keyUp(note, time + dur);
}

Piano.prototype.playNoteSeq = function(notes: string[] | number[], durs: Tone.Time[] = [], startTime: Tone.Time = Tone.now()) {
	let time = startTime;
	for (let i = 0; i < notes.length; i++) {
		let note = notes[i];
		let dur = Tone.Transport.toSeconds(durs[i] || '4n');
		if (note) {
			this.keyDown(note, time);
			this.keyUp(note, time + dur);
		}
		time += dur;
	}
}

Piano.prototype.playChord = function(chord: string[] | number[], dur: Tone.Time = '4n', time: Tone.Time = Tone.now()) {
	for (let note of chord) {
		this.playNote(note, dur, time);
	}
}

const midi = new Midi();
midi.on('keyDown', (note, velocity) => {
	piano.keyDown(note, Tone.now(), velocity);
})

midi.on('keyUp', (note, velocity) => {
	piano.keyUp(note, Tone.now(), velocity);
})

midi.on('pedalDown', () => {
	piano.pedalDown();
})

midi.on('pedalUp', () => {
	piano.pedalUp();
})

// Globals
// TODO refactor
window['piano'] = piano;
window['Tone'] = Tone;
window['playMidiFile'] = playMidiFile;
