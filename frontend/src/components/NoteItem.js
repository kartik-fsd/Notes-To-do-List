import React from 'react';
import NoteContext from '../Context/notes/ContextNotes';

function NoteItem(props) {
  const context = React.useContext(NoteContext);
  const {deleteNote} = context
    const {note,updateNote}  = props
  return (

    <>
    <div className="col-md-3" >
  <div className="card my-3">
    <div className='card-body'>
    <h5 className="card-title">{note.title}</h5>


    <p className="card-text"> {note.description} </p>
    <div className='d-flex ' style={{border:"solid 2px", padding:"7px 5px"}}>
    <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id); props.showAlert("deleted successfully","success")}}></i>
    <i className="fa-sharp fa-solid fa-file-pen mx-3" onClick={()=>{updateNote(note)}} ></i>
    </div>
    </div>
  </div>
</div>
</>
  )
}

export default NoteItem