import NotepadCreation from './Components/NotepadCreation/NotepadCreation';
import Notepad from './Components/Notepad/Notepad';

import './Styles/css/style.css'
import { useState } from 'react';

function App() {
  const [notepads, setNotepads] = useState(JSON.parse(localStorage.getItem("Notepads")) || [])
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>Notepad Application</h1>
      </header>
      <main>
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
            />
          ))}
        </section>
        <NotepadCreation
          functions={[notepads, setNotepads]}
        />
      </div>
      </main>
    </div>
  );
}

export default App;
