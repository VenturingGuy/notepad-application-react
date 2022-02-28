import { useState } from "react"

function Notepad(props) {
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)
  return(
    <div className="notepad__editnote">
      <div className="notepad__edit">
        <input className="notepad__input" value={title} onChange={e => setTitle(e)}/>
        <input className="notepad__input" value={content} onChange={e => setContent(e)}/>
        <div className="notepad__container button-container">
          <button>{"Update"}</button>
          <button>{"Delete"}</button>
        </div>
      </div>
    </div>
  )
}

export default Notepad