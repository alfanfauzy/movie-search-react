import React, { Fragment } from 'react'
import {Button, Modal, Container, Row, Col, Table} from 'react-bootstrap'

import "./Modal.css";

const PopUpModal = (props) => {
    return (
        <Fragment>
            <Modal
                {...props}
                size="xl"
                centered
            >   
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col xs={12}>
                            <img className="p-2 mt-2" src={props.movieByID.Poster} alt={props.movieByID.Poster}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                            <Table striped borderless hover size="lg" className="mt-3">
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: 'center'}} colSpan="2"><h3>{props.movieByID.Title}</h3></td>
                                    </tr>
                                    <tr>
                                        <td><h6>Released</h6></td>
                                        <td><p>{props.movieByID.Released}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h6>Director</h6></td>
                                        <td><p>{props.movieByID.Director}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h6>Actors</h6></td>
                                        <td><p>{props.movieByID.Actors}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h6>Plot</h6></td>
                                        <td><p>{props.movieByID.Plot}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h6>Awards</h6></td>
                                        <td><p>{props.movieByID.Awards}</p></td>
                                    </tr>
                                    <tr>
                                        <td><h6>Genre</h6></td>
                                        <td><p>{props.movieByID.Genre}</p></td>
                                    </tr>
                                </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.close}>Close</Button>
                </Modal.Footer> 
            </Modal>
        </Fragment>
    )
}

export default PopUpModal
