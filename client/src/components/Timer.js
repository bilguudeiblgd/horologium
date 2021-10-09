import React, { Component } from "react";
import { Container, Dropdown, DropdownButton, Button } from "react-bootstrap";
import "./Timer.css";

import Service from '../services/SubjectService.js';


const pauseColor = {
  backgroundColor: '#000',
  color: 'white',
  transition: '0.2s',
}
const startColor = {
  backgroundColor: '#000',
  color: 'white',
  transition: '0.2s',
}
const normal = {
  backgroundColor: 'white',
}
export default class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timer_started: false,
      userid: this.props.userid,
      paused: false,
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
      currentTimeHour: 0,
      subjectname: [],
      subjectchosen: "CHOOSE A SUBJECT",
      hovering: false,
      hoverColor: {},
      userOnPage: true,
      leftDate: "",
    };
    this.startTimer = this.startTimer.bind(this);
    this.changeDropdown = this.changeDropdown.bind(this);
    this.endTimer = this.endTimer.bind(this);
    this.onHoverEnter = this.onHoverEnter.bind(this);
    this.onHoverLeave = this.onHoverLeave.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  componentDidMount() {
    window.addEventListener("focus", this.onFocus);
    window.addEventListener("blur", this.onBlur);
    if (!this.state.userid) return;
    this.fetchData();

  }
  componentWillUnmount() {
    window.removeEventListener("focus", this.onFocus);
    window.removeEventListener("blur", this.onBlur);
  }
  onFocus() {
    if (this.state.userOnPage || this.state.paused) return;
    this.setState({ userOnPage: true });
    if (this.state.timer_started) {
      let dateNow = new Date();
      let missingFor = dateNow.getTime() - this.state.leftDate.getTime();

      let missingHour = parseInt(missingFor / 3600000);
      missingFor %= 3600000;
      let missingMin = parseInt(missingFor / 60000);
      missingFor %= 60000;
      let missingSec = parseInt(missingFor / 1000);
      missingFor %= 1000;
      let missingMs = parseInt(missingFor);

      this.setState({
        currentTimeHour: this.state.currentTimeHour + missingHour,
        currentTimeMin: this.state.currentTimeMin + missingMin,
        currentTimeSec: this.state.currentTimeSec + missingSec,
        currentTimeMs: this.state.currentTimeMs + missingMs
      });
    }
  }
  onBlur() {
    this.setState({ userOnPage: false });
    if (this.state.timer_started) {
      this.setState({ leftDate: new Date() });
    }
  }
  fetchData() {
    Service.callSubjects(this.props.userid)
      .then((subject) => {
        if (String(subject).startsWith("Error")) {
          console.log('error subject');
          return;
        };
        this.setState({ subjectname: [...subject] });

      })
      .catch(err => {
        console.log(err);
      })
  }
  changeDropdown(props) {
    if(!this.state.subjectchosen.startsWith("CHOOSE A SUBJECT")) {alert("you can't change your subject since the timer is started"); return;}
    this.setState({ subjectchosen: props.target.innerText })
  }
  startTimer() {
    if (this.state.subjectchosen.startsWith('CHOOSE A SUBJECT')) { alert("please choose a subject first"); return; }
    if (this.state.timer_started) {
      this.setState({ paused: true });
    }
    if (this.state.paused) {
      this.setState({ paused: false });
    }
    if (!this.state.timer_started) {
      this.setState({ timer_started: true });
      this.watch = setInterval(() => this.pace(), 10)
    }
    this.setState({ hoverColor: normal });
  }
  endTimer() {

    this.sendTime();

    this.setState({ timer_started: false });
    this.setState({ paused: false });
    this.setState({ currentTimeMs: 0 });
    this.setState({ currentTimeSec: 0 });
    this.setState({ currentTimeMin: 0 });
    this.setState({ currentTimeHour: 0 });
    clearInterval(this.watch);

  }
  async sendTime() {
    const chosenSubject = this.state.subjectchosen;
    const userid = this.state.userid;
    const totalStudyTime = { studyadd: this.state.currentTimeHour * 3600 + this.state.currentTimeMin * 60 + this.state.currentTimeSec };
    console.log(totalStudyTime);
    await fetch(`https://horologium.herokuapp.com/users/subjects/${userid}/${chosenSubject}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(totalStudyTime)
    }).then(response => response.json());
    // hopefully sent the data
  }
  pace() {
    if (this.state.paused || !this.state.timer_started) {
      return;
    }
    this.setState({ currentTimeMs: this.state.currentTimeMs + 10 });
    if (this.state.currentTimeMs >= 1000) {
      this.setState({ currentTimeSec: this.state.currentTimeSec + 1 });
      this.setState({ currentTimeMs: 0 });
    }
    if (this.state.currentTimeSec >= 60) {
      this.setState({ currentTimeMin: this.state.currentTimeMin + 1 });
      this.setState({ currentTimeSec: 0 });
    }
    if (this.state.currentTimeMin >= 60) {
      this.setState({ currentTimeHour: this.state.currentTimeHour + 1 });
      this.setState({ currentTimeMin: 0 });
    }
  };
  onHoverEnter() {
    this.setState({ hovering: true });
    if (this.state.timer_started) {
      this.setState({ hoverColor: pauseColor });
    }
    else {
      this.setState({ hoverColor: startColor });
    }
  }
  onHoverLeave() {
    this.setState({ hovering: false });
    this.setState({ hoverColor: normal });

  }

  render() {

    return (
      <Container fluid>
        <div className="timer-container">
          <div className="center">
            <DropdownButton onClick={this.fetchData} variant="transparent" className="mb-4 subject-button" id="dropdown-variants-secondary" title={this.state.subjectchosen}>
              {this.state.subjectname.map((item, index) => {
                return (<Dropdown.Item disabled={this.state.timer_started ? true : false} key={index} style={dropdownItem} onClick={this.changeDropdown} href={`#/action-${index}`}>{item.subjectname}</Dropdown.Item>);
              })}

            </DropdownButton>
            <div style={circle}>
              <button onClick={this.startTimer} style={this.state.hoverColor} className="inner-circle" onMouseEnter={this.onHoverEnter}
                onMouseLeave={this.onHoverLeave}>
                {this.state.timer_started
                  ?
                  <div>
                    <h1 style={this.state.currentTimeHour === 0 ? { fontSize: "3.4rem" } : { fontSize: "2.8rem" }} className="circle-content">
                      {this.state.currentTimeHour === 0 ? <span></span> : <span>{this.state.currentTimeHour}:</span>}
                      {this.state.currentTimeMin === 0 ? <span>00:</span> : <span>{this.state.currentTimeMin < 10 ? `0${this.state.currentTimeMin}` : this.state.currentTimeMin}:</span>}
                      <span>{this.state.currentTimeSec < 10 ? '0' + this.state.currentTimeSec : this.state.currentTimeSec}</span>
                    </h1>
                    <p style={{ position: 'absolute', left: '33%', top: '70%', letterSpacing: '4px' }}>{this.state.paused ? "START" : "PAUSE"}</p>
                  </div>
                  :
                  <div>
                    <h3 className="circle-content">START</h3>
                  </div>
                }
              </button>
            </div>

            {this.state.timer_started
              ?
              <Button onClick={this.endTimer} style={endButton} variant="dark" className="d-flex align-items-center justify-content-center timer-button my-2" >
                <div style={{ fontSize: "1rem" }}>End</div>
              </Button>
              : ''
            }
          </div>
        </div>
      </Container>
    );
  }
}

const dropdownItem = {
  fontWeight: 100,
}
const endButton = {
  fontWeight: 100,
  background: 'transparent',
  border: 'none',
  color: '#27273f',
  paddingTop: '1rem',
}

const circle = {
  backgroundColor: '#27273f',
  height: '15rem',
  width: '15rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
}
