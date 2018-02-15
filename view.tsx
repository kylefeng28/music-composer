import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ChordSymbol from './ChordSymbol';

interface AppState {
	chordSymbols: ChordSymbol[];
	notesDurs: string;
}

const Seitz4th = 
`D4 2n;
A3 2n;
F#4 4n.;
E4 8n;
D4 4n;
A3 4n;
D4 4n;
E4 4n;
F#4 4n;
A4 8n;
G4 8n;
F#4 2n;
E4 4n;
r 4n`;

const rowRowRow = 
`
C4 4n; C4 4n; C4 8n.; D4 16n; E4 4n;
E4 8n.; D4 16n; E4 8n.; F4 16n.; G4 2n;
C5 8t; C5 8t; C5 8t;
G4 8t; G4 8t; G4 8t;
E4 8t; E4 8t; E4 8t;
C4 8t; C4 8t; C4 8t;
G4 8n.;
F4 16n;
E4 8n.;
D4 16n;
C4 2n;
`;

const canonChords = [
	new ChordSymbol('D', 'M', 4),
	new ChordSymbol('A', 'M', 3),
	new ChordSymbol('B', 'm', 3),
	new ChordSymbol('F#', 'm', 3),
	new ChordSymbol('G', 'M', 3),
	new ChordSymbol('D', 'M', 3),
	new ChordSymbol('G', 'M', 3),
	new ChordSymbol('A', 'M', 3),
]

export class App extends React.Component<any, AppState> {
	constructor(props) {
		super(props);

		this.state = {
			chordSymbols: canonChords,
			notesDurs: rowRowRow
		}

	}

	render() {

		return (
			<div className="container" onDragOver={ ev => ev.preventDefault() } onDrop={ ev => this.dropMidi(ev) }>

				Drop a MIDI file on this page to play.

				{/*Chords*/}
				<button className="btn btn-link" onClick={() => {
					window['piano'].playChordSeq(this.state.chordSymbols.map((x) => x.toNotes()));
				}}>
					Play all
				</button>

				<div>
					{ this.state.chordSymbols.map((chordSymbol, i) => (
						<div className="row" style={{display: 'inline-block'}}>
							<ChordSymbolView key={i} symbol={chordSymbol}
							setRoot={ (root) => { this.state.chordSymbols[i].rootNote = root; this.setState({chordSymbols: this.state.chordSymbols}); } }
							setQuality={ (quality) => { this.state.chordSymbols[i].quality = quality; this.setState({chordSymbols: this.state.chordSymbols}); } }
							setOctave={ (octave) => { this.state.chordSymbols[i].octave = octave; this.setState({chordSymbols: this.state.chordSymbols}); } }
							setInversion={ (inversion) => { this.state.chordSymbols[i].inversion = inversion; this.setState({chordSymbols: this.state.chordSymbols}); } }
							removeChord={this.removeChord.bind(this, i)}
						/>
						</div>
					)
					
					) }
				</div>
				<button type="button" className="btn btn-link" onClick={this.addChord.bind(this)}>
					Add chord
				</button>

				{/* Notes */}
				<form className="form">
					<label>Notes</label>
					<textarea className="form-control" defaultValue={this.state.notesDurs} onChange={ev => this.setState({notesDurs: ev.target.value})}>
					</textarea>

					<button type="button" className="btn btn-link" onClick={this.playNotesDurs.bind(this, this.state.notesDurs.replace(/;\s/g, '\n').split('\n'))}>
						Play notes
					</button>
				</form>

				{/* Notes */}
				<form className="form">
					<label>Notes</label>
					<textarea className="form-control" defaultValue={this.state.notesDurs} onChange={ev => this.setState({notesDurs: ev.target.value})}>
					</textarea>

					<button type="button" className="btn btn-link" onClick={this.playNotesDurs.bind(this, this.state.notesDurs.replace(/;\s/g, '\n').split('\n'))}>
						Play notes
					</button>
				</form>

			</div>
		)
	}

	dropMidi(ev) {
		ev.preventDefault();
		const file = ev.dataTransfer.files[0];
		const url = window.URL.createObjectURL(file);
		console.log('Playing midi file: ' + file.name);
		window['piano'].playMidiFile(url);
	}

	addChord() {
		this.setState({ chordSymbols: this.state.chordSymbols.concat([ new ChordSymbol('D', 'M') ]) });
	}

	removeChord(i: number) {
		const chordSymbols = this.state.chordSymbols.concat([]);
		chordSymbols.splice(i, 1);
		this.setState({ chordSymbols: chordSymbols });
	}

	// TODO refactor into something more sensible
	playNotesDurs(notesDurs: string[]) {
		const notes = [];
		const durs = [];
		for (let noteDur of notesDurs) {
			let [ note, dur ] = noteDur.split(/\s/);
			notes.push(note);
			durs.push(dur);
		}

		// TODO
		window['notes'] = notes;
		window['durs'] = durs;
		window['piano'].playNoteSeq(notes, durs);
	}

}

interface ChordSymbolViewProps {
	symbol: ChordSymbol;
	setRoot: (string) => void;
	setQuality: (string) => void;
	setOctave: (string) => void;
	setInversion: (string) => void;
	removeChord: () => void;
}

export class ChordSymbolView extends React.Component<ChordSymbolViewProps, any> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="col-6">
				<form className="form-inline">
					<button aria-label="Remove chord" className="btn btn-sm btn-danger" onClick={() => this.props.removeChord()}>
						x
					</button>

					<label className="sr-only">Root:</label>
					<input title="Root note" className="form-control form-control-sm col-1" type="text" defaultValue={this.props.symbol.rootNote} onChange={ev => this.props.setRoot(ev.target.value)} />
					<label className="sr-only">Quality:</label>
					<input className="form-control form-control-sm col-1" type="text" defaultValue={this.props.symbol.quality} onChange={ev => this.props.setQuality(ev.target.value)} />
					<label aria-label="Octave">oct</label>
					<input className="form-control form-control-sm col-1" type="text" defaultValue={this.props.symbol.octave+''} onChange={ev => this.props.setOctave(parseInt(ev.target.value))} />
					<label aria-label="Inversion">inv</label>
					<input className="form-control form-control-sm col-1" type="text" defaultValue={this.props.symbol.inversion+''} onChange={ev => this.props.setInversion(parseInt(ev.target.value))} />
				</form>

					<label>Notes:</label>
					<span className="col-1">{this.props.symbol.toNotes().join(', ')}</span>

					<br/>
	
					<button className="btn btn-link" onClick={() => window['piano'].playChord(this.props.symbol.toNotes())}>Play chord</button>
					<button className="btn btn-link" onClick={() => window['piano'].playNoteSeq(this.props.symbol.toNotes())}>Play arpeggio</button>
			</div>
		);
	}

}

ReactDOM.render(<App/>, document.getElementById('root'));
