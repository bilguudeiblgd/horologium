import React, { Component } from "react";

import { Link } from "react-router-dom";

import { RiTimer2Line, RiDashboardLine } from "react-icons/ri";
import { BsListNested } from 'react-icons/bs';
import { FaReact } from 'react-icons/fa';
import { FaRegUserCircle } from 'react-icons/fa';
import {isMobile} from 'react-device-detect';


import "./Navbar.css"
export default class Navbar extends Component {

  render() {

    return (
      <div className="all-navbar-container">
        {isMobile ? <div className="mobile-nav-container">
          
          <ul>
            
            <li class="mobile-list-container">
              <Link to="/" className="list-container"><div>
                <RiTimer2Line className="nav-icons" />
              </div>
                </Link>
            </li>
            <li class="mobile-list-container">
              <Link to="/subjects" className="list-container"><div>
                <BsListNested className="nav-icons" />
              </div>
                </Link>
            </li>
            <li class="mobile-list-container">
              <Link to="/subjects/add" className="list-container"><div><RiDashboardLine className="nav-icons" /></div></Link>
            </li>
          </ul>
          <div className="login" style={{display: 'flex', flexDirection: 'column'}}>
            <button onClick={this.props.login} style={{ display: 'flex', flexDirection: 'column', 'alignItems': 'center', outline: 'none', backgroundColor: 'transparent', border: 'none' }}>
              {/* <p style={{ color: "white" }}>{this.props.username}</p> */}
              
              {
                this.props.loggedIn ? <div style={{width: "50px", height: "50px", border: "1px white solid", borderRadius: '8px'}}><img src={`https://avatars.dicebear.com/api/human/${this.props.username}.svg`}  alt ="Your sprite"/></div>
              :
              <FaRegUserCircle className="mobile-login-icon" />
            }
            </button>
            {this.props.loggedIn ?
              <button style={{ marginTop: '8px', background: 'transparent', color: 'grey', outline: 'none', border: 'none' }} onClick={this.props.logout}>
                Logout
              </button>
              : ''}

          </div>
        </div> 
        // Desktop
        :
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
          <div className="login" style={{display: 'flex', flexDirection: 'column'}}>
            <button onClick={this.props.login} style={{ display: 'flex', flexDirection: 'column', 'alignItems': 'center', outline: 'none', backgroundColor: 'transparent', border: 'none' }}>
              <p style={{ color: "white" }}>{this.props.username}</p>
              
              {
                this.props.loggedIn ? <div style={{width: "50px", height: "50px", border: "1px white solid", borderRadius: '8px'}}><img src={`https://avatars.dicebear.com/api/human/${this.props.username}.svg`}  alt ="Your sprite"/></div>
              :
              <FaRegUserCircle className="login-icon" />
            }
            </button>
            {this.props.loggedIn ?
              <button style={{ marginTop: '8px', background: 'transparent', color: 'grey', outline: 'none', border: 'none' }} onClick={this.props.logout}>
                Logout
              </button>
              : ''}

          </div>
        </div>
  }
      </div>

    );
  }
}


