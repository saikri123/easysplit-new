import React,{useState} from 'react'
import axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap'
const Signup = () => {
    const [form,setForm]=useState({firstName:'',lastName:'',password:'',email:''})
    const handleForm=(e)=>{
        const duplicate={...form}
        duplicate[e.currentTarget.name]=e.currentTarget.value
        setForm(duplicate)
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(form);
        axios.post('http://localhost:3000/user',{
            firstname:form.firstName,
            lastname:form.lastName,
            password:form.password,
            email:form.email,
            friends:[]
        })
        window.location.pathname="/signin"
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control value={form.firstName} onChange={handleForm} name="firstName" type="text" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control value={form.lastName} onChange={handleForm} name="lastName" type="text" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={form.password} onChange={handleForm} name="password" type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={form.email} onChange={handleForm} name="email" type="email" placeholder="Enter email" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
            </Button>
            </Form>
        </Container>
    )

}
export default Signup