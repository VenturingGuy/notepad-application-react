import { useState } from "react"

function Notepad(props) {
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)
  return(
      <div className="notepad__head edit-note">
        <input className="notepad__input" value={title} onChange={e => setTitle(e)}/>
        <textarea className="notepad__input" value={content} onChange={e => setContent(e)}/>
        <div className="notepad__container button-container update-delete-button">
          <button className="notepad__button update-button">{"Update"}</button>
          <button className="notepad__button delete-button">{"Delete"}</button>
        </div>
      </div>
      )
}

export default Notepad