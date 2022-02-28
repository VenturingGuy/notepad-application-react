import React from "react"
import { useState } from "react"

const NoteCreation = () =>{
  return(
    <div className="notepad__head new-note">
      <input className="notepad__input" placeholder="Enter Note Title..."/>
      <input className="notepad__input text-input" placeholder="Enter Note..."/>
      <button className="notepad__button add-button">{"Add"}</button>
    </div>
  )
}

export default NoteCreation