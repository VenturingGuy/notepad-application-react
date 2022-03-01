import React from "react"
import { useState } from "react"

const NoteCreation = (props) =>{
  const index = props.index
  const notepads = props.notepads
  const [noteName, setNoteName] = useState('')
  const [noteContent, setNoteContent] = useState('')

  return(
    <div className="notepad__head new-note">
      <input className="notepad__input" value={noteName} onChange={e => setNoteName(e.target.value)} placeholder="Enter Note Title..."/>
      <input className="notepad__input text-input" value={noteContent} onChange={e => setNoteContent(e.target.value)} placeholder="Enter Note..."/>
      <button className="notepad__button add-button"
      onClick={() => {
        notepads[index].notes.push({title: noteName, content: noteContent})
        localStorage.setItem("Notepads", JSON.stringify(notepads))
      }}
      >{"Add"}</button>
    </div>
  )
}

export default NoteCreation