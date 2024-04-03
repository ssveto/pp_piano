
import "./index.scss";
import { useState } from "react";
import elise from "./elise.png"
import godfather from "./godfather.png"
import clocks from "./clocks.png"
import braveheart from "./braveheart.png"
import bbking from "./bbking.png"
import entertainer from "./entertainer.png"
import PianoInstrument from "./piano-instrument.jsx";

function Sheet({ sheet }) {
  return (
    <img src={sheet} className="note-image"></img>
  )
}

function App() {

  const [state, setState] = useState(false)
  const [nextSong, setNextSong] = useState(0)

  const sheetArray = [clocks, bbking, elise, braveheart, godfather, entertainer]

  return (
      <div className="container">
        {state ? <Sheet sheet={sheetArray[nextSong]}/> : null}
        {state ? <button onClick={() => {
          if ( nextSong > 4 ) {
            alert( "That's it, no more songs :)" );
            setTimeout( () => {
              setNextSong( 0 )
            }, 500 )


          } else {
            setNextSong( nextSong + 1 )
          }
        }}>Next Song</button> : null}


        <div id="piano">
          <div className="wanna-play">
            <p>You wanna {state ? 'hide sheet' : 'try to play something'}?</p>
            <button onClick={() => setState( !state )}>Click here!</button>
          </div>

          <PianoInstrument />
        </div>
      </div>
  );
}


export default App;
