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
`

export class App extends React.Component<any, AppState> {
	constructor(props) {
		super(props);

		this.state = {
			chordSymbols: [ new ChordSymbol('C', 'M') ],
			notesDurs: rowRowRow
		}

	}

	render() {

		return (
			<div className="container">
				{/*Chords*/}
				<div>
					{ this.state.chordSymbols.map((chordSymbol, i) => (
						<div>
							<ChordSymbolView key={i} symbol={chordSymbol} />
							<button onClick={this.removeChord.bind(this, i)}>
								x
							</button>
						</div>
					)
					
					) }
				</div>
				<button onClick={this.addChord.bind(this)}>
					Add chord
				</button>

				<br/>
				<label>Notes</label>
				<textarea defaultValue={this.state.notesDurs} onChange={(e) => this.setState({notesDurs: e.target.value})}>
				</textarea>

				<button onClick={this.playNotesDurs.bind(this, this.state.notesDurs.replace(/;\s/g, '\n').split('\n'))}>
					Play notes
				</button>

			</div>
		)
	}

	addChord() {
		this.setState({ chordSymbols: this.state.chordSymbols.concat([ new ChordSymbol('C', 'M') ]) });
	}

	removeChord(i: number) {
		const chordSymbols = this.state.chordSymbols.concat([]);
		chordSymbols.splice(i, 1);
		this.setState({ chordSymbols: chordSymbols });
	}

	playNotesDurs(notesDurs: string[]) {
		const notes = [];
		const durs = [];
		for (let noteDur of notesDurs) {
			let [ note, dur ] = noteDur.split(/\s/);
			notes.push(note);
			durs.push(dur);
		}
		window['notes'] = notes;
		window['durs'] = durs;
		window['piano'].playNoteSeq(notes, durs);
	}

}

interface ChordSymbolViewProps {
	symbol: ChordSymbol;
}

export class ChordSymbolView extends React.Component<ChordSymbolViewProps, any> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			Root: <input type="text" defaultValue={this.props.symbol.rootNote} onChange={e => this.props.symbol.rootNote=e.target.value} />
			Quality: <input type="text" defaultValue={this.props.symbol.quality} onChange={e => this.props.symbol.quality=e.target.value} />
			Inversion: <input type="text" defaultValue={this.props.symbol.inversion+''} onChange={e => this.props.symbol.inversion=parseInt(e.target.value)} />
			Octave: <input type="text" defaultValue={this.props.symbol.octave+''} onChange={e => this.props.symbol.octave=parseInt(e.target.value)} />
			<button onClick={() => window['piano'].playChord(this.props.symbol.toNotes())}>Play chord</button>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
