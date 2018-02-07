import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ChordSymbol from './ChordSymbol';

interface AppState {
	chordSymbols: ChordSymbol[];
}

export class App extends React.Component<any, AppState> {
	constructor(props) {
		super(props);

		this.state = {
			chordSymbols: [ new ChordSymbol('C', 'M') ]
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
