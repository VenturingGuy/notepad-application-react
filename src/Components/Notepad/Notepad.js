import { useState } from "react"
import NoteCreation from "../NoteCreation/NoteCreation"
import Note from "../Note/Note"
import Graph from "../Graph/Graph"
import _ from 'underscore';

function Notepad(props) {
  const { title, notes, index, notepad, notepads, gists } = props
  const [showNotepad, setShowNotepad] = useState(false)
  const [notepadName, setNotepadName] = useState(title)
  

  const [buckets, setBuckets] = useState([])
  const [data, setData] = useState(false)
  const [graph, setGraph] = useState(false)

  function pushBuckets(initTime){
    const bucketSetup = buckets
    for (let i=0; i<8; i+=1){
      bucketSetup.push( {
        date: new Date(initTime.getTime() + 5000 * i),
        time: initTime.getTime() + 5000 * i,
        count: 0,
        files: 0
      })
    }
    setBuckets(bucketSetup)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setShowNotepad(!showNotepad)
    const initTime = new Date(buckets.length > 1 ?  buckets[buckets.length - 1].date : gists[0].created_at)
   
    if (buckets.length < 1){
      pushBuckets(initTime)
      console.log(buckets)
      for (let i=0; i<buckets.length; i+=1){
        for (let j=0; j<gists.length; j+=1){
         
          if (new Date(gists[j].created_at).getTime() - buckets[i].time >= 5000){
            break
          }
          else{
            
            buckets[i].count += 1
            buckets[i].files += parseInt(_.size(gists[j].files))
          }
        }
      }
      setData(buckets)
      
      }
  }

  function handleFunction(e){
    e.preventDefault()
    setGraph(!graph)
  }

  return(
    <div className="notepad__entry">
       
      <h3 onClick={(e) => handleSubmit(e)}>{title}</h3>
      {showNotepad && 
        <section className="notepad__current">
          <form className="notepad__edit">
            {graph && <Graph data={data}/>}
            <h5 className="notepad__label">Notepad Title</h5>
            <div className="notepad__head notepad-name">
              <input className="notepad__input title-input" value={notepadName} maxLength="255" onChange={e => setNotepadName(e.target.value)}/>
              <div className="notepad__container button-container">
                <button className="notepad__button view-stats" onClick={e => handleFunction(e)}>{graph ? "Close Stats" : "Show Stats"}</button>
                <button className="notepad__button save-button"
                  onClick={(e) =>{
                    if (notepadName.trim() === ""){
                      e.preventDefault()
                      alert("Notepad Title cannot be blank.")
                    }
                    else {
                      notepads[index] = {title: notepadName, notes: notes}
                      localStorage.setItem("Notepads", JSON.stringify(notepads))
                    }
                  }}
                >Save</button>
                <button className="notepad__button delete-button"
                  onClick={() => {
                    notepads.splice(index, 1)
                    localStorage.setItem("Notepads", JSON.stringify(notepads))
                  }}
                >Delete</button>
              </div>
            </div>
            <h4>My Notes</h4>
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
      }
    </div>
  )
}

export default Notepad