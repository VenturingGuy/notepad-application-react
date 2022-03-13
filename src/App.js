import NotepadCreation from './Components/NotepadCreation/NotepadCreation';
import Notepad from './Components/Notepad/Notepad';
import './Styles/css/style.css'

import { useState, useEffect } from 'react';

import { Octokit } from "@octokit/rest"

// Octokit import uses a unique authorization token saved in .env file
const octokit = new Octokit({
  auth: process.env.REACT_APP_GH
})

function App() {
  // Notepads begins as blank array, later saved to local storage and sets itself to whatever is stored in localStorage.
  const [notepads, setNotepads] = useState(JSON.parse(localStorage.getItem("Notepads")) || [])

  // gists initializes to null (this affects conditional rendering below), async function onLoad sets gists to an array
  const [gists, setGists] = useState(null)

  // affected by notepad-creation button, false by default, toggles new notepad form display
  const [showNewForm, setShowNewForm] = useState(false)
  
  /* 
    On page load, this function will perform a call using the github gists API.
    By default, gists returns 30 gist objects, with the most relevant attribute being created_at.
    gists is set to the reverse of the response data because the octokit request returns the gists from latest to earliest.
    The way this code is set up, we want it organized from earliest to latest, thus reverse.
  */
    
  useEffect(() => {
    async function onLoad(){
      const res = await octokit.request('GET /gists/public', {per_page: 30})
      
      setGists(res.data.reverse())
    }
    onLoad()
      .catch(console.error)
  }, [])

  console.log(gists)
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>Notepad Application</h1>
      </header>
      <main>
        {/* main content will display as loading until async function resolves */}
        {gists ? 
          <div className="notepad">
            <section className="notepad__savednotepads">
              <h2>My Notepads</h2>
              {/* renders a Notepad for every notepad currently stored */}
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
            {/* button toggles new notepad form display */}
            <button className="notepad__button notepad-creation" onClick={() => {setShowNewForm(!showNewForm)}}>{showNewForm ? "Cancel" : "New Notepad"}</button>
            {showNewForm && 
              <NotepadCreation
                functions={[notepads, setNotepads]}
              />
            }
          </div>
          : <h1>Loading...</h1>}
      </main>
    </div>
  )
}

export default App;
