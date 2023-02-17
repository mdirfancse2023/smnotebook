import React,{useContext, useEffect} from 'react'
import Notecontext from '../context/notes/Notecontext'
const About = () => {
  let a = useContext(Notecontext);
  useEffect(()=>{
    a.update();
  },[])
  return (
    <div>
      This is About {a.state.name}
    </div>
  )
}

export default About
