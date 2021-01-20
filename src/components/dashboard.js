import React, { useState, useEffect } from 'react'
import ModalComponent from './modal'
import { Card, Col, Row, Table, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
const Dashboard = () => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        async function fetchMyApi() {
            let response = await fetch('http://localhost:3000/user')
            response = await response.json()
            setData(response)
        }
        fetchMyApi()
    }, [data])
    return (
        <Card style={{ height: '80vh' }}>
            <Row>
                <Col>
                    <h1 style={{ textAlign: 'center' }}>Dashboard</h1>
                </Col>
                <Col style={{ padding: '5px' }}>
                    <Button variant='danger' onClick={handleShow}>Add an expense</Button>
                </Col>
            </Row>
            <Table border='light' striped bordered hover style={{ margin: '0px' }}>
                <tbody>
                    {data.map(p => {
                        if (p.id == localStorage.getItem('userid')) {
                            {
                                var owe = 0
                                var owed = 0
                                const duplicate = { ...p }
                                duplicate.friends.map(x => {
                                    x.calculation.map(y => {
                                        owe = owe + parseInt(y.owe)
                                        owed = owed + parseInt(y.owed)
                                    })
                                })
                            }
                            return (
                                <tr style={{ textAlign: 'center', borderBottom: 'none' }}>
                                    <td><h6>total balance ${owe - owed}</h6></td>
                                    <td><h6>you owe ${owe}</h6></td>
                                    <td><h6>you are owed ${owed}</h6> </td>
                                </tr>)
                        }
                    })}
                </tbody>
            </Table>
            <Table striped bordered hover style={{ marginTop: '0px' }}>
                <tbody>
                    <tr >
                        <h5 style={{ opacity: 0.4, width: '130px' }}>YOU OWE</h5>
                        {data.map(p => {
                            if (p.id == localStorage.getItem('userid')) {
                                const m = []
                                {
                                    const duplicate = { ...p }
                                    duplicate.friends.map(x => {
                                        var owe = 0
                                        var owed = 0
                                        var i = 0
                                        x.calculation.map(y => {
                                            owe = owe + parseInt(y.owe)
                                            owed = owed + parseInt(y.owed)
                                        })
                                        if (owe > owed) {
                                            m.push({ name: x.name, amount: owe - owed })
                                        }
                                    })
                                }
                                return (
                                    m.map(p => {
                                        return (
                                            <ListGroup>
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col style={{fontFamily:' serif',fontSize:'20px'}}><b>{p.name}</b></Col>
                                                        <Col style={{fontFamily:' serif',fontSize:'20px'}}><b>{p.amount}</b></Col>
                                                    </Row>
                                                </ListGroupItem>
                                            </ListGroup>
                                        )
                                    })
                                )
                            }
                        })
                        }
                        <td >
                            <h5 style={{ opacity: 0.4, textAlign: 'right' }}>YOU ARE OWED</h5>
                            {data.map(p => {
                                if (p.id == localStorage.getItem('userid')) {
                                    const m = []
                                    {
                                        const duplicate = { ...p }
                                        duplicate.friends.map(x => {
                                            var owe = 0
                                            var owed = 0
                                            x.calculation.map(y => {
                                                owe = owe + parseInt(y.owe)
                                                owed = owed + parseInt(y.owed)
                                            })
                                            if (owe < owed) {
                                                m.push({ name: x.name, amount: owed - owe })


                                            }
                                        })
                                    }
                                    return (
                                        m.map(p => {
                                            return (
                                                <ListGroup>
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col style={{fontFamily:' serif',fontSize:'20px'}}><b>{p.name}</b></Col>
                                                        <Col style={{fontFamily:' serif',fontSize:'20px'}}><b>{p.amount}</b></Col>
                                                    </Row>
                                                </ListGroupItem>
                                            </ListGroup>
                                            )
                                        })

                                    )
                                }
                            })
                            }
                        </td>
                    </tr>
                </tbody>
            </Table>
            <ModalComponent show={show} setShow={setShow} />
        </Card>
    )
}
export default Dashboard