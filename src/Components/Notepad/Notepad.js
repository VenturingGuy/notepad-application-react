import { useState } from "react"
import NoteCreation from "../NoteCreation/NoteCreation"
import Note from "../Note/Note"

function Notepad(props) {
  const { title, notes, index, notepads } = props
  const [showNotepad, setShowNotepad] = useState(false)
  const [notepadName, setNotepadName] = useState(title)
  return(
    <div className="notepad__entry">
      <h3 onClick={() => setShowNotepad(!showNotepad)}>{title}</h3>
      {showNotepad ? 
        <section className="notepad__current">
          <form className="notepad__edit">
            <h5 className="notepad__label">Notepad Title</h5>
            <div className="notepad__head notepad-name">
              <input className="notepad__input title-input" value={notepadName} onChange={e => setNotepadName(e.target.value)}/>
              <div className="notepad__container button-container">
                <button>{"View Stats"}</button>
                <button>{"Save"}</button>
                <button>{"Delete"}</button>
              </div>
            </div>
            <h4>{"My Notes"}</h4>
            <NoteCreation
              notepads={notepads}
              index={index}
            />
            {notes.map((note, index) =>(
              <Note
                title={note.title}
                content={note.content}
                key={index}
              />
            ))}
          </form>
        </section>
      : null
      }
    </div>
  )
}

export default Notepad