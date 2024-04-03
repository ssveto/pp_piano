import c from "./piano/C4.mp3";
import db from "./piano/Db4.mp3";
import d from "./piano/D4.mp3";
import eb from "./piano/Eb4.mp3";
import e from "./piano/E4.mp3";
import f from "./piano/F4.mp3";
import gb from "./piano/Gb4.mp3";
import g from "./piano/G4.mp3";
import ab from "./piano/Ab4.mp3";
import a from "./piano/A4.mp3";
import bb from "./piano/Bb4.mp3";
import b from "./piano/B4.mp3";
import c2 from "./piano/C5.mp3";
import db2 from "./piano/Db5.mp3";
import d2 from "./piano/D5.mp3";
import eb2 from "./piano/Eb5.mp3";
import e2 from "./piano/E5.mp3";
import useSound from "use-sound";
import { useEffect, useState } from "react";

const allNotesFiles = { c, db, d, eb, e, f, gb, g, ab, a, bb, b, c2, db2, d2, eb2, e2 };

const keyToNote = {
  q: 'c',
  w: 'db',
  e: 'd',
  a: 'eb',
  s: 'e',
  d: 'f',
  z: 'gb',
  x: 'g',
  c: 'ab',
  v: 'a',
  b: 'bb',
  n: 'b',
  k: 'c2',
  i: 'db2',
  l: 'd2',
  o: 'eb2',
  ';': 'e2',
}

export default function PianoInstrument({ onPlay }) {
  const [activeNote, setActiveNote] = useState(null);

  // player: keys = note ; value = play function
  const player = {};
  Object.keys(allNotesFiles)
      .forEach((note) => {
        player[note] = useSound( allNotesFiles[note] )[0];
      });

  let deactivateTimeout = null;
  const playNote = (note) => {
    if (player[note]) {
      player[note]();

      setActiveNote(note);
      if (deactivateTimeout) {
        clearTimeout(deactivateTimeout);
      }
      deactivateTimeout = setTimeout(() => setActiveNote(null), 150);

      onPlay && onPlay(note);
    }
  };

  // play on keyboard press
  const handleKeyPress = ({ key }) => {
    const note = keyToNote[key] || null;
    playNote(note);
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <div className="keys">
      {
        Object.keys(allNotesFiles)
          .map((note) => {
            const classes = ['key'];
            if (note.match(/^[degab]b([0-9]*)$/g)) {
              classes.push('black');
            }
            if (activeNote === note) {
              classes.push('active');
            }

            const key = Object.keys(keyToNote).find((k) => note === keyToNote[k]);
            return (
                <div
                    key={note}
                    className={classes.join(' ')}
                    onClick={() => playNote(note)}
                >
                  <span>{key}</span>
                </div>
            );
          })
      }
    </div>
  );
}
