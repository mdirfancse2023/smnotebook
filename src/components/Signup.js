import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

const Signup = (props) => {
  const [cred,setCred] = useState({name:"",email:"",password:"",cpassword:""});
  let history = useNavigate();
  const Submit = async (e) => {
    e.preventDefault();
    const {name,email,password} = cred;
    const response = await fetch("http://localhost:5000/auth/signup", {
        
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password}),
    });
    const json = await response.json();
    //console.log(json);
    if(json.success){
        localStorage.setItem('token',json.authToken);
        history("/inotebook")
        props.showAlert("Account Created","success")
      }
      else{
        props.showAlert("Invalid Datas","danger")
      }
  };
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  return (
    <div>
        <h5>Signup to iNoteBook</h5>
      <form onSubmit={Submit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Enter your name
          </label>
          <input
            
            onChange={onChange}
            type="text"
            className="form-control"
            id="name"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            
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
             minLength={5}
             required
            onChange={onChange}
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            minLength={5}
            required
            onChange={onChange}
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
          />
        </div>
        <button type="submit" className="btn btn-outline-dark">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
