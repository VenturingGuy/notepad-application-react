import NotepadCreation from './Components/NotepadCreation/NotepadCreation';
import Notepad from './Components/Notepad/Notepad';

import './Styles/css/style.css'
import { useState, useEffect } from 'react';


import { Octokit } from "@octokit/rest"



const octokit = new Octokit({
  auth: process.env.REACT_APP_GH
})



function App() {
  const [notepads, setNotepads] = useState(JSON.parse(localStorage.getItem("Notepads")) || [])
  const [showNewForm, setShowNewForm] = useState(false)
  
  const [gists, setGists] = useState(false)
  const [buckets, setBuckets] = useState([])

  function bucketCreation() {
    const initTime = new Date(gists[gists.length].created_at)
    console.log(initTime)
    for (let i=0; i<8; i+=1){
      setBuckets([...buckets, {
        date: new Date(initTime.getTime() + 5000 * i),
        time: initTime.getTime() + 5000 * i,
        count: 0,
        files: 0
      }])
    }
  }
  

  useEffect(() =>{
    async function onLoad(){
      const res = await octokit.request('GET /gists/public')
      setGists(res.data.reverse())
    }

   
    onLoad()
      .catch(console.error)
  }, [])
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>Notepad Application</h1>
      </header>
      <main>
        {gists ? 
          <div className="notepad">
            <section className="notepad__savednotepads">
              <h2>My Notepads</h2>
              
              {notepads.map((notepad, index) =>(
                <Notepad
                  title={notepad.title}
                  notepad={notepad}
                  notes={notepads[index].notes}
                  notepads={notepads}
                  key={index}
                  index={index}
                  gists={gists}
                />
              ))}
            </section>
            <button className="notepad__button notepad-creation" onClick={() => setShowNewForm(!showNewForm)}>{showNewForm ? "Cancel" : "New Notepad"}</button>
            {showNewForm && 
              <NotepadCreation
                functions={[notepads, setNotepads]}
              />
            }
          </div>
          : <h1>Loading...</h1>}
      </main>
    </div>
  );
}

export default App;
