import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"
const Addnote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note,setNote] = useState({title:"", description:"", tag:""})
    const click = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }
    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <h3>Add a Note</h3>
      <form>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            name='title'
            id="title"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name='description'
            id="description"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" onClick={click} className="btn btn-primary">
          Add Note
        </button>
      </form>
    </div>
  )
}

export default Addnote
