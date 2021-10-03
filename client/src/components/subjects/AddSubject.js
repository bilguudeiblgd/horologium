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
            this.setState({errmsg: "it's empty dude"})
            return;
        };
        
        this.props.subjects.forEach(subject => {
            if (subject.subjectname === this.state.title){
                this.setState({errmsg: "it exists"})
                duplicateExists = true;
            };
        })
        if(duplicateExists) return;
      
        this.props.addSubject(this.state.title);
        this.setState({title: ''});
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandler} style={form}>
                    <div style={inputArea}>
                        <input type="text" onChange={this.onWriteHandler} value={this.state.title} placeholder="Type something..." id="subjectname" />
                        {this.state.errmsg}
                    </div>
                    <button type="submit" onClick={this.addSubject}>Add Subject</button>
                </form>
            </div>
        )
    }
}

const form = {
    display: 'flex',
    flexDirection: 'row',
}
const inputArea = {
    display: 'flex',
    flexDirection: 'column'
}