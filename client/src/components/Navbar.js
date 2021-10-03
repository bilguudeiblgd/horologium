import React, { Component } from "react";

import { Link } from "react-router-dom";

import { RiTimer2Line, RiDashboardLine } from "react-icons/ri";
import { BsListNested } from 'react-icons/bs';
import { FaReact } from 'react-icons/fa';
import { FaRegUserCircle } from 'react-icons/fa';


import "./Navbar.css"
export default class Navbar extends Component {
  constructor(props){
    super(props);
  
  }
  
  render() {

    return (
      <div className="all-navbar-container">

        <div className="nav-container">
          <ul>
            <li style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <FaReact style={{ fontSize: "75px", marginBottom: "10pxtc", color: "white" }} />
            </li>
            <li>
              <Link to="/" className="list-container"><div>
                <RiTimer2Line className="nav-icons" />
              </div>
                <div>
                  Home
              </div></Link>
            </li>
            <li>
              <Link to="/subjects" className="list-container"><div>
                <BsListNested className="nav-icons" />
              </div>
                <div>
                  ListSubject</div></Link>
            </li>
            <li>
              <Link to="/subjects/add" className="list-container"><div><RiDashboardLine className="nav-icons" /></div><div>Dashboard</div></Link>
            </li>
          </ul>
          <div className="login">
            <a onClick={this.props.login} style={{display: 'flex', flexDirection: 'column', 'alignItems':'center'}}>
              <p style={{color: "white"}}>{this.props.username}</p>
              <FaRegUserCircle className="login-icon" /> 
              {this.props.loggedIn ? 
              <button style={{marginTop: '8px'}} onClick={this.props.logout}>
                  Logout
              </button> 
  : ''}
            </a>

          </div>
        </div>
        
      </div>

    );
  }
}


