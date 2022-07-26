import React from 'react'
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Cart from './Cart'
import { Route, Routes, Link } from 'react-router-dom'
import CardDetailsForm from './CardDetailsForm'
import OrderAddressForm from './OrderAddressForm'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'


export default function Checkout(props) {
    
    let getTotalPrice = 0

    useEffect(() => {
        setCheckoutItems(Array.from(new Set(props.cart)))
        
    }, [props.cart])
    
    // const getTotalPrice = () => {
    //     pro
    // }
    const handlePriceCalc = () => {
        props.cart.forEach(item => {
            console.log(item.productPrice)
            getTotalPrice += item.productPrice
        })
        return getTotalPrice
    }
    // handlePriceCalc()

    console.log(handlePriceCalc())

    console.log("at checkout")
    const [checkoutItems, setCheckoutItems] = useState([])
    const [orderForm, setorderForm] = useState({"cart":props.cart})
    const [newOrder, setNewOrder] = useState({})
    const [newShippingAddress, setNewShippingAddress] = useState({})
    const [newBillingAddress, setNewBillingAddress] = useState({})
    const [newPaymentDetails, setNewPaymentDetails] = useState({})
    // setCheckoutItems(Array.from(new Set(props.cart)))
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    // console.log(props.cart)
    // console.log(checkoutItems)

    const handleChange = (e) => {
        console.log(e.target)
        const attrToChange = e.target.name
        const newValue = e.target.value
        const paymentDetails = {...newPaymentDetails}
        // const order = {...newOrder}
        paymentDetails[attrToChange] = newValue
        // setNewOrder(paymentDetails)
        setNewPaymentDetails(paymentDetails)
    }

    const handleShippingChange = (e) => {
        const attrToChange = e.target.name
        const newValue = e.target.value
        const shippingAddress = {...newShippingAddress}
        shippingAddress[attrToChange] = newValue
        console.log(shippingAddress)
        setNewShippingAddress(shippingAddress)
    }

    const handleBillingChange = (e) => {
        const attrToChange = e.target.name
        const newValue = e.target.value
        const billingAddress = {...newBillingAddress}
        billingAddress[attrToChange] = newValue
        console.log(billingAddress)
        setNewBillingAddress(billingAddress)
    }

    const addOrder = (order) => {
        console.log("adding order to db")
        console.log(order)
        order.paymentDetails = newPaymentDetails
        order.shippingAddress = newShippingAddress
        order.billingAddress = newBillingAddress
        order.cart = props.cart
        order.user = props.user.user.id
        order.orderRef = 1234
        order.totalPrice = getTotalPrice
        console.log(order)
        Axios.post("/checkout", order)
        .then(response => {
            console.log(response)
            console.log("ordere added successfully")
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const order = {...newOrder}
        addOrder(order)
    }

    const checkoutList = checkoutItems.map((item, key) => (

        <Card key={key}>
            <Card.Img src={item.productImageUrl} alt="" style={{width: '5rem'}} />
            <Card.Body>
            <Card.Title> {item.productName} </Card.Title>
            <Card.Text> Quantity: {countOccurrences(props.cart, item)} </Card.Text>
            <Card.Text> Subtotal: £{countOccurrences(props.cart, item) * item.productPrice} </Card.Text>
            </Card.Body>
        </Card>
    ));


    // const handleOrderSubmit = (e) => {
    //     e.preventDefault();

    // }
  return (
    <div>
        <h2>Checkout:</h2>

        {checkoutList}
        <div>Total: £{getTotalPrice} </div> 
        <br></br>
        <CardDetailsForm orderForm={orderForm} setorderForm={setorderForm} handleChange={handleChange} />
        <OrderAddressForm  handleBillingChange={handleBillingChange} handleShippingChange={handleShippingChange} />
        <Button onClick={(e) => {handleSubmit(e)}}> Submit Order</Button>
    </div>
  )
}
