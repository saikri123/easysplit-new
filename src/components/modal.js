import React, { useEffect, useState } from 'react'
import { Col, Row, Button, Modal, Form, Alert } from 'react-bootstrap'
import NewUser from './alert'
import Payers from './dropdown'
import axios from 'axios'
const ModalComponent = (props) => {
    const [account, setAccount] = useState({ mail: "", desc: "", amount: 0 })
    const [data, setData] = useState([])
    const [owe, setOwe] = useState(0)
    const [owed, setOwed] = useState(0)
    var [show, setShow] = useState(false)
    const handleClose = () => props.setShow(false);
    const handleChange = (e) => {
        const duplicate = { ...account }
        duplicate[e.currentTarget.name] = e.currentTarget.value
        setAccount(duplicate)
    }
    const handleOwe = (owe) => {
        if (owe != 'you') {
            setOwed(account.amount)
            setOwe(0)
        }
        else {
            setOwed(0)
            setOwe(account.amount)
        }
    }
    const handleSave = () => {
        axios.get('http://localhost:3000/user')
            .then(res => {
                setData(res.data)
                data.map(p => {
                    if (p.id == localStorage.getItem('userid')) {
                        const patchData = { ...data[p.id - 1] }
                        var count = 0
                        patchData.friends.map(f => {
                            if (f.name == account.mail) {
                                f.calculation.push({ discription: account.desc, owe: owe, owed: owed })
                            }
                            else {
                                count++
                            }
                        })
                        if (patchData.friends.length == count)
                        {
                            setShow(true);   
                        }
                            
                        else {
                            axios.patch(`http://localhost:3000/user/${p.id}`, patchData)
                            handleClose();
                        }
                    }
                })
            })
    }
    return (
        <div>
            <Modal show={props.show} onHide={handleClose} >
                <Modal.Header closeButton style={{ backgroundColor: '#5cc5a7' }}>
                    <Modal.Title style={{ color: 'white' }}><b>Add an expense</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Email
                    </Form.Label>
                            <Col sm="10">
                                <Form.Control type="email" name="mail" value={account.mail} onChange={handleChange} style={{ textAlign: 'center' }} placeholder="email@example.com" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                discription
                    </Form.Label>
                            <Col sm="10">
                                <Form.Control name="desc" value={account.desc} onChange={handleChange} style={{ textAlign: 'center' }} type="text" placeholder="eg:movie" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Amount
                    </Form.Label>
                            <Col sm="10">
                                <Form.Control name="amount" value={account.amount} onChange={handleChange} style={{ textAlign: 'center' }} type="number" placeholder="0.0 rs" />
                            </Col>
                        </Form.Group>
                        <Payers name={account.mail} parent={handleOwe} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                 </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                </Button>
                </Modal.Footer>
                <NewUser show={show} handleChange={() => setShow(false)} name={account.mail} desc={account.desc} owe={owe} owed={owed} data={data} parent={handleClose} />
            </Modal>
        </div>
    )
}
export default ModalComponent