import React from "react"
import { useState } from "react"

function NoteCreation(props){
  const {notepads, index} = props

  // New note initializes with an empty string for name and content.
  const [noteName, setNoteName] = useState('')
  const [noteContent, setNoteContent] = useState('')
  
  return(
    <div className="notepad__head new-note">
      {/* Sets title and content to current respective inputs, does not save until update button is pressed and set in localStorage */}
      <input className="notepad__input" value={noteName} maxLength="255" onChange={e => setNoteName(e.target.value)} placeholder="Enter Note Title..."/>
      <textarea className="notepad__input text-input" maxLength="1000" value={noteContent} onChange={e => setNoteContent(e.target.value)} placeholder="Enter Note..."/>
      <button className="notepad__button add-button"
      onClick={(e) => {
        e.preventDefault()
        /*
          Alerts user if input is valid or not.
          Input is valid if note name and title aren't blank, and if the note name isn't already being used in the current notepad.
          Should requirements be met, note object is pushed to current notepad with saved title and content attributes.
        */
        if (noteName.trim() === '' || noteContent.trim() === ''){
          alert("Note title and content cannot be blank.")
        } 
        else if(notepads[index].notes.some(note => note.title === noteName)){
          alert("A note with that title already exists in this Notepad.")
        }
        else{
          alert("Note added! Click the Save button to save changes.")
          notepads[index].notes.push({title: noteName, content: noteContent})
        }
      }}
      >Add</button>
    </div>
  )
}

export default NoteCreation