import { useState } from "react";
import Notecontext from "./Notecontext";

const Notestate =(props) =>{
    const s1 = {
        "name":"Irfan",
        "class":"5b"
    }
    const [state,setstate] = useState(s1);
    const update = ()=>{
        setTimeout(() => {
            setstate({
                "name":"Asif",
                "class":"5c"
            })
        }, 1000);
    }
    return(
        <Notecontext.Provider value={{state,update}}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default Notestate;