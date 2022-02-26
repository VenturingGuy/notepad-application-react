import React from 'react';
import NotepadCreation from '../NotepadCreation/NotepadCreation.js';
const Display = () => {
  return(
    <div className="notepad">
      <section className="notepad__savednotepads">
        {/* saved notepad elements will be inserted here via the displayNotepads function --> */}
      </section>
      <NotepadCreation />
    </div>
  )
}

export default Display;