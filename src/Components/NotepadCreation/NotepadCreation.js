const NotepadCreation = () => {
  const storeNotepad = (e) => {
    e.preventDefault();
  };
  return(
    <section className="notepad__creation">
    <form 
      onSubmit={storeNotepad}
      className="notepad__form"
      >
      <div className="notepad__head new-notepad-title">
        <label
          className="notepad__label"
          id="user-notepad"
          htmlFor="new-notepad-title"
          value="Notepad Title (Required)"
          />
        <input
          className="notepad__input title-input"
          type="text"
          name="new-notepad-title"
          id="new-notepad-title"
          maxLength="255"
          placeholder="My notepad title..."
          required
          />
        <button className="notepad__button save-button" id="save-notepad">Save</button>
      </div>
      <div className="notepad__head new-note-title">
        <label
          className="notepad__label"
          htmlFor="note-title"
          value="New Note (Required)"
          />
        <input
          className="notepad__input"
          type="text"
          name="note-title"
          id="new-note-title"
          maxLength="255"
          placeholder="Enter note title..."
          required
          />
      </div>
      <div className="notepad__head new-note-text">
        <input
          className="notepad__input"
          htmlFor="note-content"
          name="note-text"
          id="new-note-text"
          maxLength="1000"
          placeholder="Enter note text..."
          required
          />
      </div>
    </form>
  </section>
  )
}

export default NotepadCreation;