import React, { useEffect, useState } from "react";
import NoteContext from "../Context/notes/ContextNotes";
//import NoteItem from "./NoteItem";
import NoteCard from "./NoteItem";
import AddNote from "./addNote";
import { Navigate } from "react-router-dom";
function Notes(props) {
  const context = React.useContext(NoteContext);
  const { notes, GetNotes, editNote } = context;
  //const navigate = useNavigate();
  const [Redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      //console.log("ID:"+localStorage.getItem('token'))
      GetNotes();
    } else {
      setRedirect(true);
    }
    // eslint-disable-next-line
  }, []);
  const ref = React.useRef(null);
  const refClose = React.useRef(null);
  const [note, setnote] = React.useState({
    Edittitle: "",
    Editdescription: "",
    Edittag: "",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({
      id: currentNote._id,
      Edittitle: currentNote.title,
      Editdescription: currentNote.description,
      Edittag: currentNote.tag,
    });
  };
  const handleClick = () => {
    editNote(note.id, note.Edittitle, note.Editdescription, note.Edittag);
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  if (Redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        type="button"
        ref={ref}
        className="btn d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="mb-2">
                  <label htmlFor="Edittitle" className="form-label">
                    Title
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Title"
                    id="Edittitle"
                    name="Edittitle"
                    aria-label="default input example"
                    value={note.Edittitle}
                    onChange={onchange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="Editdescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="Editdescription"
                    rows="3"
                    name="Editdescription"
                    value={note.Editdescription}
                    onChange={onchange}
                    required
                  ></textarea>
                </div>
                <div className="mb-2">
                  <label htmlFor="Edittag" className="form-label">
                    Tag
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Tags"
                    id="Edittag"
                    name="Edittag"
                    aria-label="default input example"
                    onChange={onchange}
                    value={note.Edittag}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={
                  note.Edittitle.length < 1 || note.Edittitle.length < 3
                }
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3 mx-2">
        <h3 className="mt-4">Notes</h3>
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard
              key={note._id}
              updateNote={updateNote}
              note={note}
              showAlert={props.showAlert}
            />
          ))
        ) : (
          <p>No notes found</p>
        )}
      </div>
    </>
  );
}

export default Notes;
