import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNote] = useState(notesInitial)

  // Get all Notes
  const getNote = async () => {
    // API Call 
    const response = await fetch(`${host}/note/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYzQ2ZGM4N2I5YmU0YjNmNDVmZWU0In0sImlhdCI6MTY3NjQzNjM5OH0.BqG0ioysngleD1wDlSmMy4X0-fpZ6hvQQsxgRHd0XTU"
      }
    });
    const json = await response.json()
    setNote(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/note/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYzQ2ZGM4N2I5YmU0YjNmNDVmZWU0In0sImlhdCI6MTY3NjQzNjM5OH0.BqG0ioysngleD1wDlSmMy4X0-fpZ6hvQQsxgRHd0XTU"
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNote(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/note/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYzQ2ZGM4N2I5YmU0YjNmNDVmZWU0In0sImlhdCI6MTY3NjQzNjM5OH0.BqG0ioysngleD1wDlSmMy4X0-fpZ6hvQQsxgRHd0XTU"
      }
    });
    const json = response.json();

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNote(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/note/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYzQ2ZGM4N2I5YmU0YjNmNDVmZWU0In0sImlhdCI6MTY3NjQzNjM5OH0.BqG0ioysngleD1wDlSmMy4X0-fpZ6hvQQsxgRHd0XTU"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNote(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;