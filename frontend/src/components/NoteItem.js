import React, { useState } from "react";
import NoteContext from "../Context/notes/ContextNotes";

function NoteItem({ note, updateNote, showAlert }) {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const context = React.useContext(NoteContext);
  const { deleteNote } = context;
  const handleExpand = () => {
    if (note.description.length > 100) {
      setModalOpen(true);
    } else {
      setExpanded(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>

          <p className="card-text">
            {expanded ? note.description : truncateText(note.description, 100)}
          </p>

          {note.description.length > 100 && (
            <button className="btn btn-link" onClick={handleExpand}>
              Read More
            </button>
          )}

          <div
            className="d-flex "
            style={{
              border: "solid 2px",
              padding: "7px 5px",
              width: "fit-content",
            }}
          >
            <i
              className="fa-solid fa-trash mx-3"
              onClick={() => {
                deleteNote(note?._id);
                showAlert("deleted successfully", "success");
              }}
            ></i>
            <i
              className="fa-sharp fa-solid fa-file-pen mx-3"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "4px",
              position: "relative",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={closeModal}
            >
              &times;
            </span>
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteItem;
