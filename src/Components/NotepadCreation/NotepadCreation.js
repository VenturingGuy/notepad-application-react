import React from "react"
import { useState } from "react"

const NotepadCreation = (props) => {
  const [notepads, setNotepads] = props.functions
  const [notepadName, setNotepadName] = useState('')
  const [noteName, setNoteName] = useState('')
  const [noteText, setNoteText] = useState('')

  return(
    <section className="notepad__creation">
    <form 
      className="notepad__form"
    >
      <div className="notepad__head new-notepad-title">
        <label className="notepad__label" id="user-notepad" value="Notepad Title (Required)">
          <h4>Notepad Title (Required)</h4>
          <input
            className="notepad__input title-input"
            type="text"
            maxLength="255"
            placeholder="My notepad title..."
            value={notepadName}
            onChange={e => setNotepadName(e.target.value)}
            required
          />
        </label>
        <button 
          type="button"
          className="notepad__button save-button"
          onClick={() => {
            notepads.push({title: notepadName, notes: [{title: noteName, content: noteText}]})
            setNotepadName("")
            setNoteName("")
            setNoteText("")
            localStorage.setItem("Notepads", JSON.stringify(notepads))
            setNotepads(JSON.parse(localStorage.getItem("Notepads")))
            }
          }
        >Save</button>
      </div>
      <div className="notepad__head new-note">
        <label className="notepad__label">
          <h4>New Note(Required)</h4>
          <input
            className="notepad__input"
            type="text"
            maxLength="255"
            placeholder="Enter note title..."
            value={noteName}
            onChange={e => setNoteName(e.target.value)}
            required
          />
          <input
            className="notepad__input"
            maxLength="1000"
            placeholder="Enter note text..."
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            required
          />
        </label>   
      </div>
    </form>
  </section>
  )
}

export default NotepadCreation