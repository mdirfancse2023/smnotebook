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
        const json =  response.json();


        let note  = {
          "_id": "61322f19553781a8ca8d0e08",
          "user": "6131dc5e3e4037cd4734a066",
          "title": title,
          "description": description,
          "tag": "default",
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }

      //Delete a Note
      const deleteNote = (id)=>{
        const newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote)
      }

      //Edit a Note
      const editNote = async (id,title,description,tag)=>{
        let url = `${host}/note/updatenotes/63ec6d7c95e79d5b5cd543ea`
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYzQ2ZGM4N2I5YmU0YjNmNDVmZWU0In0sImlhdCI6MTY3NjQzNjM5OH0.BqG0ioysngleD1wDlSmMy4X0-fpZ6hvQQsxgRHd0XTU"
          },
          body: JSON.stringify({title,description,tag})
        });

        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id===id){
            element.title=title;
            element.description=description;
            element.tag=tag;
          }
          
        }
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
        console.log(json);
        setNotes(json)
      }
    
    return (
        <NoteContext.Provider value={{notes, addNote,deleteNote,editNote,getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;