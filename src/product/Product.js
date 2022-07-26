import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import ProductDetail from './ProductDetail';
import Button from 'react-bootstrap/Button';

import {
  Row,
  Container,
  Col,
  Modal
} from "react-bootstrap";


export default function Product(props) {


  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalOpen =()=>{
    !modalIsOpen ? setModalIsOpen(true) : setModalIsOpen(false)
  }

  const handleInputChange = (e) => {
    console.log(e.target.value)
    props.handleProductQuantity(e.target.value)
  }


  // const increaseQuantity = () => {
  //   props.productQuantity += 1
  // }



  let productQuantity = props.products.productStock
  const divStyle ={
    color: 'black',
  }

  if (productQuantity === 0){
    productQuantity = "OUT OF STOCK"
    divStyle.color = 'red'


  } else if (productQuantity <= 10 ){
    productQuantity = "LOW STOCK"
    divStyle.color = 'orange'

  } else if (productQuantity > 10) {
    productQuantity = `${productQuantity} AVAILABLE`
    divStyle.color = 'green'

  }

  // document.getElementById("stock").style.color = color;

  return (
    <><Col style={{marginBottom: '20px'}} >
        <Card >
            <Card.Img variant="top" src={props.products.productImageUrl} />
            <Card.Body>
                <Card.Text style={divStyle}>{productQuantity}</Card.Text>
                <Card.Title>{props.products.productName}</Card.Title> 
                <Card.Text>£{props.products.productPrice}</Card.Text>

                <Button onClick={() => setModalOpen()}>Product Details</Button> &nbsp;

                <Modal size="xl" centered show={modalIsOpen} onHide={() => setModalOpen()}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      More about this product...
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ProductDetail {...props.products} />
                  </Modal.Body>
                </Modal>

                <Button variant="primary" onClick={() => {props.addToCart(props.products)}}> Add to Cart </Button> &nbsp;
                {/* <Button onClick={(e) => {props.increaseQuantity(e)}}> + </Button> */}
                <input type="number" name={props.products.name} placeholder="1" min={1}  onChange={(e) => handleInputChange(e)}></input>
                {/* <Button onClick={(e) => {props.decreaseQuantity(e)}}> - </Button> */}
            </Card.Body>

        </Card>
        </Col>
    </>
  )
}
