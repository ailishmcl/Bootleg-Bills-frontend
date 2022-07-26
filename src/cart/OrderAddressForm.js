import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'


export default function OrderAddressForm(props) {

    const handleSubmit = () => {
        console.log("addresses added")
    }
    
  return (
    <div>
        <h2> Address Details </h2>
        <Container>
        <h3> Enter Billing Address: </h3>
            <Form.Group>
                <Form.Label> Address Line 1: </Form.Label>
                <Form.Control name="lineOne" onChange={props.handleBillingChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> Address Line 2: </Form.Label>
                <Form.Control name="lineTwo" onChange={props.handleBillingChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> City: </Form.Label>
                <Form.Control name="city" onChange={props.handleBillingChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> Country: </Form.Label>
                <Form.Control name="country" onChange={props.handleBillingChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> Postcode: </Form.Label>
                <Form.Control name="postcode" onChange={props.handleBillingChange}/> 
            </Form.Group>
            <h3> Enter Shipping Address: </h3>

            <Form.Group>
                <Form.Label> Address Line 1: </Form.Label>
                <Form.Control name="lineOne" onChange={props.handleShippingChange} /> 
            </Form.Group>

            <Form.Group>
                <Form.Label> Address Line 2: </Form.Label>
                <Form.Control name="lineTwo" onChange={props.handleShippingChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> City: </Form.Label>
                <Form.Control name="city" onChange={props.handleShippingChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> Country: </Form.Label>
                <Form.Control name="country" onChange={props.handleShippingChange}/> 
            </Form.Group>

            <Form.Group>
                <Form.Label> Postcode: </Form.Label>
                <Form.Control name="postcode" onChange={props.handleShippingChange}/> 
            </Form.Group>

            <Button variant="primary" onClick={(e) => handleSubmit(e)}> Submit Address Details </Button>
        </Container>
    </div>
  )
}
