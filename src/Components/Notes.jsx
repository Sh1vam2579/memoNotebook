import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const {notes, getNote, editNote} = context;
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});
    let navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem('token')){
        getNote();
      }
      else{
        navigate("/login");
      }
      // elint-disable-next-line
    }, []);
    
    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
      // ref.toggle();
      ref.current.click();
      setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.edescription, etag: currentNote.tag});
      props.showAlert("Updated Successfully !", "success");
    }

    const handleClick = (e) => {
      editNote(note.id, note.etitle, note.edescription, note.etag);
      refClose.current.click();
      // console.log("Updating the note...", note);
      // e.preventDefault();
      // props.showAlert("Deleted Successfully !", "danger");

    }

    const onChange = (e) => {
      setNote({...note, [e.target.name]: e.target.value});
    }


    return (
    <>
    <AddNote showAlert={props.showAlert}/>

    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className='my-3'>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag}/>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" onClick={handleClick} className="btn btn-primary">Update</button>
          </div>
        </div>
      </div>
    </div>

    <div className="row my-3">
      <h1>Your Notes</h1>
      <div className="container mx-2">
      {notes.length===0 && '-> No Notes to Display <-'}
      </div>
      {notes.map((note) => {
        return <NoteItem  key={note._id} showAlert={props.showAlert} updateNote={updateNote} note = {note}/> // <-- key={note._id}
        } ) }
    </div>
    </>
  )
}

export default Notes

// {notes && notes.length > 0 ? (
//   notes.map((note) => {
// return <NoteItem key={note._id} note={note} />;
// })
// ) : (
// <p>No notes available</p>
// )}