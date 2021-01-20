import React,{useState} from 'react'
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap'
const Signin = () => {
    const [signin,setSignin]=useState({email:'',password:''})
    const handleChange=(e)=>{
        const duplicate={...signin}
        duplicate[e.currentTarget.name]=e.currentTarget.value
        setSignin(duplicate)
    }
    const  handleSubmit=(e)=>{
        e.preventDefault();
        axios.get('http://localhost:3000/user')
        .then(resp => {
            const data = resp.data;
            data.forEach(e => {
               if(signin.email==e.email && signin.password==e.password){
                   localStorage.setItem('userid',e.id)
                   console.log(localStorage.getItem('userid'));
                  window.location.pathname="/home"
               }
            });
        })
        .catch(error => {
            console.log(error);
        });    
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" value={signin.email} onChange={handleChange} type="email" placeholder="Enter email" />
                   
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" value={signin.password} onChange={handleChange} type="password" placeholder="Password" />
                </Form.Group>
              
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </Container>
    )
}
export default Signin