import React, { useState, useEffect } from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Login(props) {
    console.log(props)

    const [newUser, setNewUser] = useState({})

    // const [role, setRole] = useState("")

    const handleChange = (event) => {
        const user = {...newUser}
        user[event.target.name] = event.target.value
        console.log(user)
        setNewUser(user)
    }

    const loginHandler = () => {
        console.log(newUser)
        props.login(newUser)
    }


  return (
    <div className='login-container'>
        <h1>Log In</h1>
        <Container>
            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control name="emailAddress" onChange={handleChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" onClick={loginHandler}>Log In</Button>
        </Container>

        <div className='not-a-user'>
            <p>Not signed up? <Link to='/signup'>Create an account!</Link> </p>
        </div>
    </div>
  )
}
