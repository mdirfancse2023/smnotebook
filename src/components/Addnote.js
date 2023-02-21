import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const click = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added Successfully", "success");
    //console.log(note)
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    //console.log(note)
  };
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
            name="title"
            id="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.title}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            value={note.description}
            className="form-control"
            name="description"
            id="description"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            value={note.tag}
            className="form-control"
            name="tag"
            id="tag"
            onChange={onChange}
          />
        </div>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          onClick={click}
          className="btn btn-outline-dark"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
