import * as WebMidi from 'webmidi'
import * as events from 'events'

export default class Midi extends events.EventEmitter {
	_isEnabled: boolean;

	constructor() {
		super();

		this._isEnabled = false;

		WebMidi.enable((err) => {
			if (!err) {
				this._isEnabled = true;
				if (WebMidi.inputs) {
					WebMidi.inputs.forEach((input) => this._bindInput(input));
				}
				WebMidi.addListener('connected', (device) => {
					if (device.input) {
						console.log('midi input connected!');
						this._bindInput(device.input);
					}
				})
			}
		})
	}

	_bindInput(inputDevice) {
		if (this._isEnabled) {
			WebMidi.addListener('disconnected', (device) => {
				if (device.input) {
					console.log('midi input disconnected!');
					device.input.removeListener('noteOn');
					device.input.removeListener('noteOff');
				}
			})
			inputDevice.addListener('noteon', 'all', (event) => {
				this.emit('keyDown', event.note.number, event.velocity);
			})
			inputDevice.addListener('noteoff', 'all',  (event) => {
				this.emit('keyUp', event.note.number, event.velocity);
			})

			inputDevice.addListener('controlchange', "all", (event) => {
				if (event.controller.name === 'holdpedal') {
					this.emit(event.value ? 'pedalDown' : 'pedalUp');
				}
			})
		}
	}
}
