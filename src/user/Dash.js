import React, { useEffect, useState } from 'react'
import OrderHistory from './OrderHistory'
import Axios from 'axios'
import ProductCreateForm from '../product/ProductCreateForm'
import { Button } from 'react-bootstrap'
import Modal from 'react-modal'
import './Dash.css'

export default function Dash(props) {
    useEffect(() => {
        props.loadProductList()
    }, [])

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
    
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }

    

  return (
    <div className="dash-container">
        {props.role === "seller" ? (
        <>


            <div id='add-modal'>
            <Modal isOpen={modalIsOpen} ariaHideApp={false}>
        
            <Button onClick={setModalIsOpenToFalse}>x</Button>
            <ProductCreateForm loadProductList={props.loadProductList} closeModal={setModalIsOpenToFalse} success={props.sucMessage} setSuccess={props.setSuccess} error={props.errMessage} setError={props.setError} />

            </Modal>
            </div>

            <h1 className='dash-title'>Dashboard</h1>

            <div className='dash-contents'>
                <div className='order-table'>
                    <h4>Customer Orders</h4>
                    <OrderHistory allOrders={props.allOrders} setAllOrders={props.setAllOrders} products={props.products} user={props.user}/>
                </div>
            
                <div>
                    <h4>Product inventory</h4>
                    <Button onClick={setModalIsOpenToTrue}>Add new product to inventory</Button>
                    <div className='inventory-list scroll'>
                    {props.allStock}
                    </div>
                </div>
            </div>
        
        </>
        ) : (
            <div className='order-table'>
                <h4>Customer Orders</h4>
                <OrderHistory allOrders={props.allOrders} setAllOrders={props.setAllOrders} products={props.products} user={props.user}/>
            </div>
        )
        }
    </div>
  )
}
