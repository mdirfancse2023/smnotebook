import React,{useEffect} from "react";
import { Link, useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom"
const Navbar = () => {
  let location = useLocation();
  let history = useNavigate();
  const logout = ()=>{
    localStorage.removeItem('token');
    history("/inotebook/login")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/inotebook">
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/inotebook'?"active":""}`} aria-current="page" to="/inotebook">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/inotebook/about'?"active":""}`} to="/inotebook/about">
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token')?<form className="d-flex" role="search">
          <Link className="btn btn-outline-light mx-1" to="/inotebook/login" role="button">Login</Link>
          <Link className="btn btn-outline-light mx-1" to="/inotebook/signup" role="button">Signup</Link>
          </form>:<button onClick={logout} className="btn btn-outline-light">Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
