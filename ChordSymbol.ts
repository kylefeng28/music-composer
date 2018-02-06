import * as Tonal from 'tonal';

// TODO get from python

export default class ChordSymbol {
	rootNote: string;
	quality: string;
	inversion: number;
	octave: number;

	constructor(rootNote: string, quality: string, inversion: number = 0, octave: number = 4) {
		// TODO make setters and getters; throw exceptions
		this.rootNote = rootNote;
		this.quality = quality;
		this.inversion = inversion;
		this.octave = octave;
	}

	toNotes(): string {
		return Tonal.chord(this.quality).map(Tonal.transpose(this.rootNote + this.octave));
	}

}
