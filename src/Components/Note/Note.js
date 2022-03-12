import { useState } from "react"

function Note(props) {
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)
  const {notepad, notepads, index} = props
  
  return(
    <div className="notepad__head edit-note">
      <input className="notepad__input" value={title} maxLength="255" onChange={e => setTitle(e.target.value)}/>
      <textarea className="notepad__input" value={content} maxLength="1000" onChange={e => setContent(e.target.value)}/>
      <div className="notepad__container button-container update-delete-button">
        <button
          className="notepad__button update-button"
          onClick={(e) =>{
            e.preventDefault()
            if (title.trim() === '' || content.trim() === ''){
              alert("Note title and content cannot be blank.")
            }
            else{
              alert("Note updated! Click the save button to save changes.")
              notepad.notes[index] = {title: title, content: content}
            }
          }
        }
        >Update</button>
        <button className="notepad__button delete-button"
          onClick={() =>{
            notepad.notes.splice(index, 1)
            localStorage.setItem("Notepads", JSON.stringify(notepads))
          }}
        >Delete</button>
      </div>
    </div>
  )
}

export default Note