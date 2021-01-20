import React, { useEffect, useState } from 'react'
import { Card, ListGroup, ListGroupItem, Col, Row, Button } from 'react-bootstrap'
import axios from 'axios'
const Friends = (props) => {
    const [data, setData] = useState([])
    useEffect(() => {
        async function fetchMyApi() {
            let response = await fetch('http://localhost:3000/user')
            response = await response.json()
            setData(response)
        }
        fetchMyApi()
    }, [data])
    const handleDelete = (dis, owe, owed, index) => {
        var duplicate = {}
        var k = []
        data.map(p => {
            if (p.id == localStorage.getItem('userid')) {
                duplicate = { ...p }
                p.friends.map((f) => {
                    if (f.name == props.user.name) {
                        k = f.calculation.filter((s, index) => s.owe != owe && owed != s.owed && dis != s.discription)
                    }
                })
            }
        })
        console.log("props.index",props.ind);
        duplicate.friends[props.ind].calculation = k;
        console.log("duplicate",duplicate.friends[props.ind].calculation)
        axios.patch(`http://localhost:3000/user/${localStorage.getItem('userid')}`, duplicate)
    }
    return (
        <Card>
            <ListGroup>
            <Card><h1 style={{textAlign:'center'}}>{props.user}</h1></Card>
                {
                    data.map(p => {
                        
                        if (p.id == localStorage.getItem('userid')) {
                            
                            if (p.friends[props.ind].calculation.length > 0) {
                                return p.friends[props.ind].calculation.map((x, index) => {
                                    console.log("entered");
                                    console.log("x", p.friends[props.ind].calculation.length);
                                    return (
                                        <ListGroupItem>
                                            <Row>
                                                <Col xs={4}><h5>{x.discription}</h5></Col>
                                                <Col xs={4}><h5>{x.owe ? "owe  $" : "owed $"}{x.owe || x.owed}</h5></Col>
                                                <Col xs={4} style={{textAlign:'right'}}><Button onClick={() => handleDelete(x.discription, x.owe, x.owed)}>X</Button></Col>
                                            </Row>
                                        </ListGroupItem>
                                    )

                                })
                            }
                            if (p.friends[props.ind].calculation.length <= 0) {
                                return <h1 style={{ textAlign: 'center' }}>Amout is settled</h1>

                            }
                        }
                    })
                }
            </ListGroup>
        </Card>
    )
}
export default Friends