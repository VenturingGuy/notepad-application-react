import { useState } from "react"
import NoteCreation from "../NoteCreation/NoteCreation"
import Note from "../Note/Note"
import Graph from "../Graph/Graph"
import _ from 'underscore';

function Notepad(props) {
  const { title, notes, index, notepad, notepads, gists } = props

  const [showNotepad, setShowNotepad] = useState(false) // Conditional display of the notepad, affected by handleSubmit below.
  const [graph, setGraph] = useState(false)             // Conditional display of the graphs, affected by handleFunction below.
  const [notepadName, setNotepadName] = useState(title) // Notepad's name affected by passed down title prop.
  
  const [data, setData] = useState([])
  const [buckets, setBuckets] = useState([])

  console.log(gists)
  
  function handleSubmit(e) {
    // prevents default button behavior and toggles notepad display
    e.preventDefault()
    if (buckets.length < 1){
      secretSetup(e)
    }
    setShowNotepad(!showNotepad)

    
  }

  function secretSetup(e) {
    e.preventDefault()
    /* 
      initTime refers to the first time that will be used as a reference for the graph.
      Currently, the idea is that it will start at the earliest created_at time in the gists data.
      buckets.length > 1 assumes that this function has already been called, and that it will instead
      use the last time in the current set of data displayed as a starting point.
      (i.e when you click load more, it will start from there and add more times. **still in progress)
    */
      const initTime = new Date(buckets.length > 1 ?  buckets[buckets.length - 1].date.getTime() + 5000 : gists[0].created_at)
      /*
        This if statement is currently here to cover my tracks - will need to determine a more effective way to handle this.
        As is, the if statement prevents the logic from creating more buckets that will eventually not accurately display
        the data we want shown.
        Currently, it's attached to the same h3 that toggles the title. This will need to change if we want it to use pagination.
        Possibly, we have it call a separate function the first time to start from 0, and use the "Load More" to call it subsequently.
      */
      // 
        // refer to pushBuckets comment below for functionality
        pushBuckets(initTime)
        // Iterates through each bucket (inits at 8, adds 8 every time buckets gets updates)
        let count = 0
        let files = 0
        for (let i=0; i<buckets.length; i+=1){
          /*
            The current intention is that each of the gists created_at attribute is compared to the bucket time (both compared in milliseconds).
            For example, created_at of 10:23:15 to bucket time of 10:23:09.
            In this scenario, the second for loop breaks as the difference in time is greater than (non-negative) 5 seconds, so we move on to the next bucket.
            **Furthermore, if the difference in time is less than 0 (negative), the gist for loop moves on to the next gist rather than continuously add to count.
            Otherwise, it's "recorded" by increasing the count (referring to the number of gists created in this span of 5 seconds).
            Additionally, the number of files in each gist is added to that bucket.
          */
          for (let j=0; j<gists.length; j+=1){
            if (new Date(gists[j].created_at).getTime() - buckets[i].time >= 5000){
              break
            }
            else if (new Date(gists[j].created_at).getTime() - buckets[i].time < 0){
              continue
            }  
            count +=1
            // The underscore input allows us to conveniently get the number of file objects in the object.
            files += parseInt(_.size(gists[j].files))
          }
          buckets[i].count = count
          buckets[i].files = files
          count = 0
          files = 0
        }
        setData(buckets)
        /*
          This is probably not the way I'd go about this, but...
          This will very quickly refresh the state of the graph so that more data will appear on it.
        */
        if (graph){
          setGraph(false)
          setTimeout(() => {setGraph(true)}, 10)
        }
  }

  /*
    Currently creates a variable equal to the current buckets state.
    Pushes time attributes with a difference of 5 seconds (both as a date for graph labels and milliseconds).
    Pushes count and file attributes that start at 0, manipulated by handleSubmit function above.
    Sets buckets to said variable. **There's probably a better way to handle it, keeping it simple and working for now.
  */
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

  // Toggles graph display.
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
            {graph && <Graph data={data} secretSetup={secretSetup}/>}
            <h5 className="notepad__label">Notepad Title</h5>
            <div className="notepad__head notepad-name">
              {/* Changes notepad name independently of the title, will not save until saved to local storage. */}
              <input className="notepad__input title-input" value={notepadName} maxLength="255" onChange={e => setNotepadName(e.target.value)}/>
              <div className="notepad__container button-container">
                <button className="notepad__button view-stats" onClick={e => handleFunction(e)}>{graph ? "Close Stats" : "Show Stats"}</button>
                <button className="notepad__button save-button"
                  // Input validation for blank/non-blank titles. **This doesn't catch everything, such as "  doublespace title".
                  onClick={(e) =>{
                    if (notepadName.trim() === ""){
                      e.preventDefault()
                      alert("Notepad Title cannot be blank.")
                    }
                    // If the title is valid, saves the current notepad's title and notes to localStorage.
                    else {
                      notepads[index] = {title: notepadName, notes: notes}
                      localStorage.setItem("Notepads", JSON.stringify(notepads))
                    }
                  }}
                >Save</button>
                {/* Deletes notepad from the notepads array, then saves current array to localStorage. **Maybe include a confirm prompt? */}
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
            {/* Renders every note object currently saved to the Notepad. */}
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