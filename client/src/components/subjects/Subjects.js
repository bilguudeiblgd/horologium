import React, { Component } from 'react'
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Service from "../../services/SubjectService.js"
import { ReactComponent as WorkImg } from "../../images/icon-work.svg";
import { Button } from "react-bootstrap";
export default class Subjects extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }

    
    
    render() {
        const { item, index } = this.props;
        let studied = item.studied
        let hour = parseInt(studied / 3600);
        studied = studied % 3600;
        let minute = parseInt(studied / 60);
        return (
            <div className="card-container">
                <WorkImg className="icon" />

                <div className="card-inside-container">
                    <div className="card-header">
                        <h6 className="card-header-text">{item.subjectname}</h6>
                        <BiDotsHorizontalRounded style={{ fontSize: "1.5rem", marginRight: "1rem" }} />
                    </div>
                    <div className="card-body">
                        <h1 className="card-body-text">{hour}hrs</h1>
                        <p className="card-body-text-min">{minute}min</p>
                    </div>
                    <div className="card-footer">
                        <p>Last week - 32hrs</p>
                    </div>
                    <Button name={item.subjectname} className="delete-icon-container" onClick={() => this.props.deleteSubject(item.subjectname)}>
                        <MdDelete className="delete-icon" />
                    </Button>
                </div>
            </div>

        )
    }
}
