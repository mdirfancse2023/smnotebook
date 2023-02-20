import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const notesInitial = []

      const [notes, setNotes] = useState(notesInitial)

      //Add a Note
      const addNote = async (title,description,tag)=>{
        let url = `${host}/note/addnotes`
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYzQ2ZGM4N2I5YmU0YjNmNDVmZWU0In0sImlhdCI6MTY3NjQzNjM5OH0.BqG0ioysngleD1wDlSmMy4X0-fpZ6hvQQsxgRHd0XTU"
          },
          body: JSON.stringify({title,description,tag})
        });
        const note =  await response.json();
        setNotes(notes.concat(note))
      }

      //Delete a Note
      const deleteNote = async(id)=>{
        let url = `${host}/note/deletenotes/${id}`
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYzQ2ZGM4N2I5YmU0YjNmNDVmZWU0In0sImlhdCI6MTY3NjQzNjM5OH0.BqG0ioysngleD1wDlSmMy4X0-fpZ6hvQQsxgRHd0XTU"
          }
        });
        const json = await response.json();
        const newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote)
      }

      //Edit a Note
      const editNote = async (id,title,description,tag)=>{
        let url = `${host}/note/updatenotes/${id}`
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYzQ2ZGM4N2I5YmU0YjNmNDVmZWU0In0sImlhdCI6MTY3NjQzNjM5OH0.BqG0ioysngleD1wDlSmMy4X0-fpZ6hvQQsxgRHd0XTU"
          },
          body: JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
          if(notes[index]._id===id){
            notes[index].title=title;
            notes[index].description=description;
            notes[index].tag=tag;
            break;
          }
        }
        //console.log(newNotes);
        setNotes(newNotes);
      }

      //Get a Note
      const getNote = async ()=>{
        let url = `${host}/note/fetchnotes`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYzQ2ZGM4N2I5YmU0YjNmNDVmZWU0In0sImlhdCI6MTY3NjQzNjM5OH0.BqG0ioysngleD1wDlSmMy4X0-fpZ6hvQQsxgRHd0XTU"
          }
        });
        const json = await response.json();
        setNotes(json)
      }
    
    return (
        <NoteContext.Provider value={{notes, addNote,deleteNote,editNote,getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;