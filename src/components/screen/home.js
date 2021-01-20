import React, { useEffect, useState } from 'react'
import SideNav from '../sidenav'
import Dashboard from '../dashboard'
import Nav from '../nav'
import Friends from '../screen/friends'
import { Col, Container, Row } from 'react-bootstrap'
const Home = () => {
    const [render,setRender]=useState()
    const [user,setUser]=useState() 
    const [ind,setInd]=useState() 
    useEffect(()=>{  
       handleParent(render,user,ind);
    })
    const handleParent=(data,p,index)=>{
        setRender(data) 
        setUser(p)
        setInd(index)
    }
    return (
        <div>
            <Nav />
            <Container>
                <Row >
                    <Col xs={3}>
                        <SideNav  parent={handleParent}/>
                    </Col>
                    <Col xs={8}>
                       {render=="friend"?<Friends render={render} user={user} ind={ind}/>:<Dashboard/>}
                    </Col>
                </Row>
            </Container>
        </div>


    )
}
export default Home