import * as Tonal from 'tonal';

// TODO get from python

export default class ChordSymbol {
	rootNote: string;
	quality: string;
	octave: number;
	inversion: number;

	constructor(rootNote: string, quality: string, octave: number = 4, inversion: number = 0) {
		// TODO make setters and getters; throw exceptions
		this.rootNote = rootNote;
		this.quality = quality;
		this.octave = octave;
		this.inversion = inversion;
	}

	toNotes(): string[] {
		// Get intervals
		let chord = Tonal.chord(this.quality);

		// Find inversion
		for (let i = 0; i < this.inversion; i++) {
			chord.push(Tonal.Distance.add(chord.shift(), 'P8'));
		}

		return chord.map(Tonal.transpose(this.rootNote + this.octave));
	}

}
