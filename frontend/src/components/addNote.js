import React from "react";
import NoteContext from "../Context/notes/ContextNotes";
import './addNote.css';

function AddNote(props) {
  const context = React.useContext(NoteContext);
  const [note, setnote] = React.useState({title:"",description:"",tag:""})
  const {addNote } = context;
  const added = (e) => {
    e.preventDefault();
    addNote(note.title,note.description,note.tag)
    setnote({title:"",description:"",tag:""})
    props.showAlert("Added successfully","success");
  };
  const onchange = (e) => {
    setnote({...note,[e.target.name]:e.target.value});

  };
  return (
    <div className="containers my-2">
      <h4> Add Note</h4>
      <div className="mb-2">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          className="form-control"
          type="text"
          placeholder="Title"
          id="title"
          name="title"
          aria-label="default input example"
          onChange={onchange}
          value={note.title}
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          name="description"
          onChange={onchange}
          value={note.description}
          required
        ></textarea>
      </div>
      <div className="mb-2">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          className="form-control"
          type="text"
          placeholder="Tags"
          id="tag"
          name="tag"
          aria-label="default input example"
          onChange={onchange}
          value={note.tag}
          required
        />
      </div>
      <button disabled={note.title.length<3 || note.title.length<3} type="submit" className="btn btn-info" onClick={added}>
        Add
      </button>
    </div>
  );
}

export default AddNote;
