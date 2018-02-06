# Based on https://github.com/triss/ChordSymbol/blob/master/classes/ChordSymbol.sc

class ChordSymbol:
    def __init__(self, root, shape='major', inversion=0, octave=4):
        if root not in notes:
            raise ValueError('invalid chord root')
        self.root = root
        self.root_val = notes[root]

        if shape not in shapes:
            raise ValueError('invalid chord shape')
        self.shape = shape
        self.shape_val = shapes[shape]

        if not 0 <= inversion <= 4:
            raise ValueError('invalid inversion number')
        self.inversion = inversion

        self.octave = octave

    def as_notes(self):
        notes = [ note + self.root_val + 12 * (self.octave-4)
                for note in self.shape_val ]

        for _ in range(self.inversion):
            note = notes.pop(0)
            notes.append(note + 12)

        return tuple(notes)

notes = { 'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11 }

# Add sharps and flats
def _init_notes():
    for note_name, note_val in list(notes.items()):
        notes[note_name + '#'] = note_val+1
        notes[note_name + 'b'] = note_val-1
_init_notes()

shapes = {
        'major':        (0, 4, 7),
        'minor':        (0, 3, 7),
        'major7':       (0, 4, 7, 11),
        'dom7':         (0, 4, 7, 10),
        'minor7':       (0, 3, 7, 10),
        'aug':          (0, 4, 8),
        'dim':          (0, 3, 6),
        'dim7':         (0, 3, 6, 9),
        '1':            (0),
        '5':            (0, 7),
        'plus':         (0, 4, 8),
        'sharp5':       (0, 4, 8),
        'msharp5':      (0, 3, 8),
        'sus2':         (0, 2, 7),
        'sus4':         (0, 5, 7),
        '6':            (0, 4, 7, 9),
        'm6':           (0, 3, 7, 9),
        '7sus2':        (0, 2, 7, 10),
        '7sus4':        (0, 5, 7, 10),
        '7flat5':       (0, 4, 6, 10),
        'm7flat5':      (0, 3, 6, 10),
        '7sharp5':      (0, 4, 8, 10),
        'm7sharp5':     (0, 3, 8, 10),
        '9':            (0, 4, 7, 10, 14),
        'm9':           (0, 3, 7, 10, 14),
        'm7sharp9':     (0, 3, 7, 10, 14),
        'maj9':         (0, 4, 7, 11, 14),
        '9sus4':        (0, 5, 7, 10, 14),
        '6by9':         (0, 4, 7, 9, 14),
        'm6by9':        (0, 3, 9, 7, 14),
        '7flat9':       (0, 4, 7, 10, 13),
        'm7flat9':      (0, 3, 7, 10, 13),
        '7flat10':      (0, 4, 7, 10, 15),
        '9sharp5':      (0, 1, 13),
        'm9sharp5':     (0, 1, 14),
        '7sharp5flat9': (0, 4, 8, 10, 13),
        'm7sharp5flat9':  (0, 3, 8, 10, 13),
        '11':           (0, 4, 7, 10, 14, 17),
        'm11':          (0, 3, 7, 10, 14, 17),
        'maj11':        (0, 4, 7, 11, 14, 17),
        '11sharp':      (0, 4, 7, 10, 14, 18),
        'm11sharp':     (0, 3, 7, 10, 14, 18),
        '13':           (0, 4, 7, 10, 14, 17, 21),
        'm13':          (0, 3, 7, 10, 14, 17, 21)
        }

# Aliases
def _init_shapes():
    shapes['m'] = shapes['minor']
    shapes['M'] = shapes['major']
    shapes['7'] = shapes['dom7']
    shapes['M7'] = shapes['major7']
    shapes['m7'] = shapes['minor7']
    shapes['augmented'] = shapes['aug']
    shapes['diminished'] = shapes['dim']
    shapes['diminished7'] = shapes['dim7']
_init_shapes()

Scale.default([0,1,2,3,4,5,6,7,8,9,10,11])
c1 = ChordSymbol('C', octave=4)
c2 = ChordSymbol('A', 'm', octave=3)
c3 = ChordSymbol('F', octave=3)
c4 = ChordSymbol('G', octave=3)
chords = [ c.as_notes() for c in [ c1,c2,c3,c4 ] ]

v1 >> viola(chords, dur=4)

