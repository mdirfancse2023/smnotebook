import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
const Login = (props) => {
    const [cred,setCred] = useState({email:"",password:""});
    let history = useNavigate();
    const Submit =async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:cred.email,password:cred.password})
          });
          const json = await response.json();
          //console.log(json);
          if(json.success){
            localStorage.setItem('token',json.authToken);
            history("/inotebook")
            props.showAlert("Login Success","success")
          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }
    }
    const onChange = (e)=>{
        setCred({...cred,[e.target.name]:e.target.value})
    }
  return (
    <div>
        <h5>Login to iNoteBook</h5>
      <form onSubmit={Submit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={cred.email}
            onChange={onChange}
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
          value={cred.password}
          onChange={onChange}
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <button type="submit"  className="btn btn-outline-dark">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
