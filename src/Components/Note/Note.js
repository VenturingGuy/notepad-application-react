import { useState } from "react"

function Note(props) {
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)
  const {notepad, notepads, index} = props
  console.log(notepad)
  return(
      <div className="notepad__head edit-note">
        <input className="notepad__input" value={title} onChange={e => setTitle(e.target.value)}/>
        <textarea className="notepad__input" value={content} onChange={e => setContent(e.target.value)}/>
        <div className="notepad__container button-container update-delete-button">
          <button className="notepad__button update-button">{"Update"}</button>
          <button className="notepad__button delete-button" onClick={() =>{
            notepad.notes.splice(index, 1)
            localStorage.setItem("Notepads", JSON.stringify(notepads))
          }}>{"Delete"}</button>
        </div>
      </div>
      )
}

export default Note