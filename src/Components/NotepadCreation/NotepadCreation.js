import React from "react"
import { useState } from "react"

function NotepadCreation(props){
  const [notepads, setNotepads] = props.functions

  // New notepad initializes with an empty string for notepad name, note name and content.
  const [notepadName, setNotepadName] = useState('')
  const [noteName, setNoteName] = useState('')
  const [noteText, setNoteText] = useState('')

  return(
    <section className="notepad__creation">
      <form className="notepad__form">
      <div className="notepad__head new-notepad-title">
        <label className="notepad__label" id="user-notepad" value="Notepad Title (Required)">
          <h4>Notepad Title (Required)</h4>
          {/* Sets notepad name to input, doesn't save until save button saves to localStorage. */}
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
            /*
              Alerts user if input is valid or not.
              Input is valid if notepad name, note name, and note content aren't blank. (Each notepad must have one note on creation.) **Consider unique notepad names?
              Should requirements be met, notepad object is pushed to array of notepads with saved notepad title and note attributes.
              Notepad is saved to localStorage, inputs are set to blank on submission.
            */
            if (notepadName.trim() === "" || noteName.trim() === "" || noteText.trim() === ""){
              alert("Notepad must have a non-blank name, note title, and note content.")
            }
            else{
              notepads.push({title: notepadName, notes: [{title: noteName, content: noteText}]})
              setNotepadName("")
              setNoteName("")
              setNoteText("")
              localStorage.setItem("Notepads", JSON.stringify(notepads))
              setNotepads(JSON.parse(localStorage.getItem("Notepads")))
            }
            }
          }
        >Save</button>
      </div>
      <div className="notepad__head new-note">
        {/* Sets New Notepad's note name and content to respective input values, not saved until save button validates input and stores in localStorage. */}
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
          <textarea
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