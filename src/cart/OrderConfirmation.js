import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderConfirmation(props) {
  return (
    <div>
        <h3> Success! </h3>
        <div> Your order has gone through. Please check your email for confirmation. </div>
        <div> Your order reference number is: {props.orderRef}</div>
        <div> See your past <Link to="/manage"> orders </Link>  or continue <Link to="/index"> shopping </Link>.</div>
    </div>
  )
}
