import React from 'react'
import '../style/Selection.css'
import {Link} from 'react-router-dom'
// import * as core from '@material-ui/core';
import {Card} from "react-bootstrap";

export default function Selection() {
    return (
        <div className="row">
            <div className="challengesCol selection">
                <div className="container-fluid">
                    <div className="row flexWrap">
                        <div className="col-lg-4 col-md-6">
                            <Link to={'/play/ciphers/caesar-cipher'}>
                                <Card>
                                    <Card.Img variant="null" src="challenges/c001.jpg" alt="thumb" class="mw-100"/>
                                    <Card.Body className="p-0">
                                    <Card.Text className="text-center">
                                        Caesar Cipher
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>               
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <Link to={'./play/ciphers/letter-to-number'}>
                                <Card>
                                    <Card.Img variant="null" src="challenges/c002.jpg" alt="thumb" class="mw-100"/>
                                    <Card.Body className="p-0">
                                    <Card.Text className="text-center">
                                    Letter to Number Cipher
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <Link to={'./play/ciphers/morse-code'}>
                                <Card>
                                    <Card.Img variant="null" src="challenges/c003.jpg" alt="thumb" class="mw-100"/>
                                    <Card.Body className="p-0">
                                        <Card.Text className="text-center">
                                        Morse Code Cipher
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <Link to={'./play/ciphers/reverse-cipher'}>
                                <Card>
                                    <Card.Img variant="null" src="challenges/c004.jpg" alt="thumb" class="mw-100"/>
                                    <Card.Body className="p-0">
                                    <Card.Text className="text-center">
                                    Reverse Cipher
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <Link to={'./play/ciphers/comprehensive-challenge'}>
                                <Card>
                                    <Card.Img variant="null" src="challenges/c003.jpg" alt="thumb" class="mw-100"/>
                                    <Card.Body className="p-0">
                                    <Card.Text className="text-center">
                                    Comprehensive Cipher
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>
                        {/* <div className="col-lg-4 col-md-6">
                            <Link to={'./directory-traversal'}>
                                <Card>
                                    <Card.Img variant="null" src="challenges/c001.jpg" alt="thumb" class="mw-100"/>
                                    <Card.Body className="p-0">
                                    <Card.Text className="text-center">
                                    Directory Traversal
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <Link to={'./web-structure'}>
                                <Card>
                                    <Card.Img variant="null" src="challenges/thumb03.jpg" alt="thumb" class="mw-100"/>
                                    <Card.Body className="p-0">
                                    <Card.Text className="text-center">
                                    Web Structure
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
