import React from "react"
import { useState } from "react"

const NoteCreation = (props) =>{
  const index = props.index
  const notepads = props.notepads
  const [noteName, setNoteName] = useState('')
  const [noteContent, setNoteContent] = useState('')

  return(
    <div className="notepad__head new-note">
      <input className="notepad__input" value={noteName} maxLength="255" onChange={e => setNoteName(e.target.value)} placeholder="Enter Note Title..."/>
      <textarea className="notepad__input text-input" maxLength="1000" value={noteContent} onChange={e => setNoteContent(e.target.value)} placeholder="Enter Note..."/>
      <button className="notepad__button add-button"
      onClick={(e) => {
        e.preventDefault()
        if (noteName.trim() === '' || noteContent.trim() === ''){
          alert("Note title and content cannot be blank.")
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