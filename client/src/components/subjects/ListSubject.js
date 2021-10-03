import React, { Component } from 'react'
import "./ListSubject.css";
import { Button, Container, Row, Col } from 'react-bootstrap';


import Subjects from './Subjects.js';
import Service from "../../services/SubjectService.js"
import AddSubject from './AddSubject.js'
import Loading from '../Loading.js'

export default class ListSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            loading: false,
        }
        this.addSubject = this.addSubject.bind(this);
        this.deleteSubject = this.deleteSubject.bind(this);
    }
    componentDidMount() {
        Service.callSubjects(this.props.currentUser)
            .then((subject) => {
                console.log(String(subject));
                if(String(subject).startsWith("Error")) return;
                this.setState({ subjects: [...subject] });

            })
            .catch(err => {
                console.log(err);
            })
    }
    addSubject(subject) {
        this.setState({ loading: true })
        Service.addSubjects(this.props.currentUser, subject)
            .then(subjects => {
                this.setState({ subjects })
                this.setState({ loading: false })
            })
            .catch(err => {
                console.log(err);
            })

        // this.setState()
    }
    deleteSubject(name) {
        this.setState({ loading: true });
        Service.delSubjects(this.props.currentUser, name)
            .then(subjects => {
                console.log("deleting", subjects);
                this.setState({ subjects });
                this.setState({ loading: false })
            })

    }

    render() {
        const blur = {
            filter: 'blur(1px)',
        }
        return (
            <div className="subject-container">

                <Container className="" style={this.state.loading ? blur : {}}>
                    <div className="content pt-4">
                        <h1 className="big-header">Subjects</h1>
                        <div className="add-subject">
                            <AddSubject subjects={this.state.subjects} addSubject={this.addSubject} />
                        </div>
                        {this.state.subjects.length === 0 ? <h1>You have to add a subject</h1>
                            :
                            <Row>

                                {(this.state.subjects).map((item, index) => {

                                    return (<Col sm={3}><Subjects item={item} key={index} deleteSubject={this.deleteSubject} /></Col>)

                                })}
                            </Row>
                        }
                    </div>


                    {/* <ReactLoading type={"balls"} color={"black"} height={667} width={375} /> */}

                </Container>

            </div>


        )
    }
}
