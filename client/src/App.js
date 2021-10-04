import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ListSubject from "./components/subjects/ListSubject.js";

import Timer from "./components/Timer";
import Dashboard from "./components/Dashboard"
import Service from "./services/SubjectService.js";
import LoginPopUp from './components/LoginPopUp.js';
import Auth from './services/auth.service.js'
class App extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      username: "",
      subjects: [],
      popOpen: false,
      loggedIn: false,
    }
    this.login = this.login.bind(this);
    this.loginClose = this.loginClose.bind(this);
    this.logout = this.logout.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  getUserData() {
    this.setState({ userid: Auth.getCurrentUser().id, username: Auth.getCurrentUser().email });
  }
  logout() {
    Auth.logout();
    this.setState({ loggedIn: false, popOpen: false, userid: "", username: "" });

  }
  login() {
    this.setState({ popOpen: true });
  }
  loginClose() {
    this.setState({ popOpen: false });
    if (!Auth.getCurrentUser()) return;
    this.setState({ loggedIn: true });
    if (!this.state.loggedIn) return;
    this.setState({ popOpen: false, userid: Auth.getCurrentUser().id, username: Auth.getCurrentUser().email });

  }
  componentDidMount() {
    window.addEventListener("focus", this.onFocus);
    window.addEventListener("blur", this.onBlur);
    this._isMounted = true;
    // this.setState({ subjects: [...data.subjects] });
    if (!this.state.loggedIn) return;
    Service.callSubjects(this.state.userid)
      .then((subject) => {
        this.setState({ subjects: [...subject] });
        return;
      })
      .catch(err => {
        console.log(err);
        return;
      });
  }
  onFocus() {
    // console.log("tab is active")
  }
  onBlur() {
    // console.log("tab is not active");
  }
  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("focus", this.onFocus);
    window.removeEventListener("blur", this.onBlur);
  }
  render() {
    const blur = {
      filter: 'blur(1px)'
    }
    return (

      <div className="overall">
        <div className="login-pop-up">
          {this.state.popOpen ? <LoginPopUp loginClose={this.loginClose} /> : ""}
        </div>
        <div className="pages" style={this.state.popOpen ? blur : {}}>
          <Router>
            <div className="custom-container">

              <Navbar login={this.login} username={this.state.username} logout={this.logout} loggedIn={this.state.loggedIn} />

              <Route path="/" exact render={props => <Timer userid={this.state.userid} logged={this.state.loggedIn} login={this.login} />} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/subjects" exact render={props => <ListSubject currentUser={this.state.userid} subjects={this.state.subjects} />} />

            </div>
          </Router>
        </div>


      </div>
    );
  }

}

export default App;
