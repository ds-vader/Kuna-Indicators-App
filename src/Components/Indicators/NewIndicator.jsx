import React, { useState } from 'react'
import { Button, Modal, Form, Col } from 'react-bootstrap'
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import { getCurrentPrice } from '../../API/api'

const NewIndicator = (props) => {
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //hooks for get input values
    const [pair, setPair] = useState('BTC - USDT');
    const [type, setType] = useState(true);
    const [start, setStart] = useState(0)
    const [now, setNow] = useState(0)
    const [marker, setMarker] = useState(0);

    //get start price from for some currency pair
    if (show === true) {
        getCurrentPrice(pair)
            .then(response => {
                setStart(response)
                setNow(response)
            })
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add indicator
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Adding new indicator</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        {/*
                            input pair
                        */}
                        <Form.Group controlId="formPairInput">
                            <Form.Label>Choice pair</Form.Label>
                            <Form.Control as="select" custom
                                value={pair}
                                onChange={e => {
                                    setPair(e.target.value);

                                }}>
                                {
                                    props.pairs.map((value) => {
                                        return <option value={value}>{value}</option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Row>
                            {/*
                            input type
                            */}
                            <Form.Group as={Col} controlId="formTypeInput">
                                <Form.Label>Type</Form.Label>
                                <Form.Control as="select" custom
                                    value={type}
                                    onChange={e => { setType(JSON.parse(e.target.value)) }}>

                                    <option value={true}>More</option><ArrowUp />
                                    <option value={false}>Less</option><ArrowDown />
                                </Form.Control>
                            </Form.Group>

                            {/*
                            input marker
                            */}
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Marker</Form.Label>
                                <Form.Control type="number" placeholder="Your market"
                                    value={marker}
                                    onChange={e => { setMarker(parseFloat(e.target.value)) }} />
                            </Form.Group>
                        </Form.Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {

                        props.addNewIndicator(
                            {
                                date: props.currentData(),
                                pair,
                                start,
                                now,
                                marker,
                                type
                            }
                        );
                        handleClose();
                    }}>

                        Add indicator
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewIndicator