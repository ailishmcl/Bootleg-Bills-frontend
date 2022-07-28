import React, { useEffect, useState } from 'react'
import Axios from 'axios'

export default function OrderDetailCard(props) {

    console.log(props.currentOrder)

    const [thisProduct, setThisProduct] = useState()

    const prod = props.id

    console.log(prod)

    useEffect(() => {
        verifyProduct(prod)
    }, [prod])

    const verifyProduct = (id) => {
        Axios.get(`product/detail?id=${id}`)
        .then((response) => {
            console.log(response.data.product.productName)
            setThisProduct(response.data.product.productName)
            })
        .catch((error) => {
            console.log(error)
        })
    }

  return (
    <div>
        <p>{thisProduct}</p>
        <p>Quantity: {props.getQuantity(prod)}</p>
        {/* <button onClick={props.currentOrder.status !== 'closed' ? (e) => closeOrder(e) : (e) => console.log("Order already closed.")}>Close Order</button> */}
    </div>
  )
}
