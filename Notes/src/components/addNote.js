import React from "react";
import NoteContext from "../Context/notes/ContextNotes";
import "./addNote.css";

function AddNote(props) {
  const context = React.useContext(NoteContext);
  const [note, setnote] = React.useState({
    title: "",
    description: "",
    tag: "",
  });
  const { addNote } = context;
  const added = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag: "" });
    props.showAlert("Added successfully", "success");
  };
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    // <div className="containers m-2">
    //   <h4> Add Note</h4>
    //   <div className="mb-2">
    //     <label htmlFor="title" className="form-label">
    //       Title
    //     </label>
    //     <input
    //       className="form-control"
    //       type="text"
    //       placeholder="Title"
    //       id="title"
    //       name="title"
    //       aria-label="default input example"
    //       onChange={onchange}
    //       value={note.title}
    //       required
    //       style={{ backgroundColor: "#9db1e1" }}
    //     />
    //   </div>
    //   <div className="mb-2">
    //     <label htmlFor="description" className="form-label">
    //       Description
    //     </label>
    //     <textarea
    //       className="form-control"
    //       id="description"
    //       rows="3"
    //       name="description"
    //       onChange={onchange}
    //       value={note.description}
    //       required
    //       style={{ backgroundColor: "#9db1e1" }}
    //     ></textarea>
    //   </div>
    //   <div className="mb-2">
    //     <label htmlFor="tag" className="form-label">
    //       Tag
    //     </label>
    //     <input
    //       className="form-control"
    //       type="text"
    //       placeholder="Tags"
    //       id="tag"
    //       name="tag"
    //       aria-label="default input example"
    //       onChange={onchange}
    //       value={note.tag}
    //       required
    //       style={{ backgroundColor: "#9db1e1" }}
    //     />
    //   </div>
    //   <button
    //     disabled={note.title.length < 3 || note.title.length < 3}
    //     type="submit"
    //     className="btn btn-primary px-4"
    //     onClick={added}
    //   >
    //     Add
    //   </button>
    // </div>
    <div className="container">
      <div className="row justify-content-center m-2">
        <div
          className="col-md-6 p-4"
          style={{
            backgroundColor: "#9db1e1",
            border: "1px solid #9db1e1",
            boxShadow: "15px 15px 0px #394e74",
          }}
        >
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
              style={{ backgroundColor: "#9db1e1" }}
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
              style={{ backgroundColor: "#9db1e1" }}
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
              style={{ backgroundColor: "#9db1e1" }}
            />
          </div>
          <div className="text-center">
            <button
              disabled={note.title.length < 3 || note.title.length < 3}
              type="submit"
              className="btn btn-primary px-4"
              onClick={added}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
