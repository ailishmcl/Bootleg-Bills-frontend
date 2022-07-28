import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrderDetailCard from './OrderDetailCard'
import './Dash.css'
import { Form } from 'react-bootstrap'

export default function OrderDetails(props) {
  const [currentUser, setCurrentUser] = useState({})
  const [currentProducts, setCurrentProducts] = useState([])

  useEffect(() => {
    getOrderUser(props.user)
    console.log(currentProducts)
  }, [currentProducts])

  console.log(props)

  const orderSet = [...new Set(props.cart)]

  console.log(orderSet)

  const userProducts = []

  const getQuantity = (id) => {
    return props.cart.filter(x => x===id).length
  }

  // console.log("Occurrences of The Dude's mix:", props.cart.filter(x => x==='62d95f258e8bb8f9d7eda87a').length)

  const mappedProducts = orderSet?.map((product, index) => (
    
    <div className='order-card' key={index}>
      <OrderDetailCard currentOrder={props.currentOrder} id={product} getQuantity={getQuantity} />
    </div>

))

  const getOrderUser = (id) => {
    Axios.get(`auth/users/detail?id=${id}`)
    .then((response) => {
        console.log(response.data.user)
        setCurrentUser(response.data.user)
    })
    .catch((error) => {
        console.log(error)
        console.log("Couldn't get order ID.")
    })
    }

    const handleStatus = (e) => {
      console.log(e.target.value)
      console.log("props:", props)
      console.log("currentOrder:", props.currentOrder)
      console.log(props.currentOrder.status)
      const newStatus = {"_id": props.currentOrder._id, "status": e.target.value }
      console.log(newStatus)
      Axios.put(`orders/update`, newStatus)
      .then(response => {
            console.log(response.data)
            props.setCurrentOrder(response.data.product)
          })
        .catch((error) => {
            console.log("Error updating order:", error)
        })
    }

  return (
    <div className='order-details'>

      
      <div className='delivery-details'>
        <h3>Delivery Details</h3>
        <h4>Customer</h4>
        <p>Full Name: <span className='orderDetail'>{currentUser.firstName} {currentUser.lastName}</span></p>
        <p>Email Address: <span className='orderDetail'>{currentUser.emailAddress}</span></p>
        
        <h4>Shipping Address</h4>
        <p>Address Line 1: <span className='orderDetail'>{props.currentOrder.shippingAddress.lineOne}</span></p>
        <p>Address Line 2: <span className='orderDetail'>{props.currentOrder.shippingAddress.lineTwo}</span></p>
        <p>City: <span className='orderDetail'>{props.currentOrder.shippingAddress.city}</span></p>
        <p>Post Code: <span className='orderDetail'>{props.currentOrder.shippingAddress.postcode}</span></p>

        <h4>Billing Address</h4>
        <p>Address Line 1: <span className='orderDetail'>{props.currentOrder.billingAddress.lineOne}</span></p>
        <p>Address Line 2: <span className='orderDetail'>{props.currentOrder.billingAddress.lineTwo}</span></p>
        <p>City: <span className='orderDetail'>{props.currentOrder.billingAddress.city}</span></p>
        <p>Post Code: <span className='orderDetail'>{props.currentOrder.billingAddress.postcode}</span></p>
      </div>

      <div className='vr'></div>

      <div className='product-details scroll'>
        <h3>Order Details</h3>
        <div>
          <div className='ref-status'>
            <h4>Order Ref: {props.currentOrder.orderRef}</h4>
            {/* <h4>Order Status: <span className={props.status}>{props.status}</span></h4> */}
            <Form.Select id="status-dropdown" defaultValue={props.currentOrder.status} aria-label="Default select example" onChange={(e) => handleStatus(e)}>
              <option value="open">Open</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="returned">Returned</option>
              <option value="closed">Closed</option>
            </Form.Select>
          </div>
        </div>
        {mappedProducts}
      </div>

    </div>
  )
}
