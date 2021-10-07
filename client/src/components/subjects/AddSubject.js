import React, { Component } from 'react'

export default class AddSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            errmsg: '',
        }

    }
    onWriteHandler = (e) => {
        this.setState({ title: e.target.value });
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        this.validateSubject();
    }
    validateSubject = () => {
        let duplicateExists = false;
        if (this.state.title.length === 0) {
            this.setState({ errmsg: "it's empty dude" })
            return;
        };

        this.props.subjects.forEach(subject => {
            if (subject.subjectname === this.state.title) {
                this.setState({ errmsg: "it exists" })
                duplicateExists = true;
            };
        })
        if (duplicateExists) return;

        this.props.addSubject(this.state.title);
        this.setState({ title: '' });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandler} style={form}>
                    <div style={addSubjectContainer}>

                        <div style={inputAreaContainer}>
                            <input type="text" style={inputArea} onChange={this.onWriteHandler} value={this.state.title} placeholder="Type something..." id="subjectname" />

                        </div>
                        <button type="submit" style={addSubjectButton} onClick={this.addSubject}>Add</button>
                    </div>

                </form>
                <p style={{color: 'red'}}>  {this.state.errmsg}
                </p>

            </div>
        )
    }
}
const addSubjectContainer = {
    display: 'flex',
    flexDirection: 'row',
    border: '1px black solid',
    borderRadius: '24px',
    overflow: 'hidden',
    height: '48px'
}
const form = {
    display: 'flex',
    flexDirection: 'row',
}
const inputAreaContainer = {
    

}
const inputArea = {
    height: '100%',
    padding: '10px',
    outline: 'none',
    border: 'none'
}
const addSubjectButton = {
    height: "100%",
    outline: 'none',
    border: 'none',
    color: 'white',
    backgroundColor: '#27273f',
    padding: '0px 1.4rem',
    borderRadius: '24px'
}