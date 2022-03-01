import { useState } from "react"
import NoteCreation from "../NoteCreation/NoteCreation"
import Note from "../Note/Note"

function Notepad(props) {
  const { title, notes, index, notepad, notepads } = props
  console.log(notes)
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
              <input className="notepad__input title-input" value={notepadName} maxLength="255" onChange={e => setNotepadName(e.target.value)}/>
              <div className="notepad__container button-container">
                <button className="notepad__button view-stats">{"View Stats"}</button>
                <button className="notepad__button save-button"
                  onClick={() =>{
                    notepads[index] = {title: notepadName, notes: notes}
                    localStorage.setItem("Notepads", JSON.stringify(notepads))
                  }}
                >{"Save"}</button>
                <button className="notepad__button delete-button"
                  onClick={() => {
                    notepads.splice(index, 1)
                    localStorage.setItem("Notepads", JSON.stringify(notepads))
                  }}
                >{"Delete"}</button>
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
                notepad={notepad}
                notepads = {notepads}
                index={index}
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