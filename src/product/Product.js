import React, {useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import ProductDetail from './ProductDetail';
import Button from 'react-bootstrap/Button';
import {
  Row,
  Container,
  Col,
  Modal
} from "react-bootstrap";
import {BsCart4} from 'react-icons/bs'




// import audio from './audio/30_Seconds_of_Bowling_Sounds.mp3'

// import audio from './audio/30_Seconds_of_Bowling_Sounds.mp3'


 


export default function Product(props) {


  const numberInput = useRef(null)

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalOpen =()=>{
    !modalIsOpen ? setModalIsOpen(true) : setModalIsOpen(false)
  }

  // const handleInputChange = (e) => {
  //   console.log(e.target.value)
  //   props.handleProductQuantity(e.target.value)
  // }

  const handleNumber = (e) => {
    let number = numberInput.current
    console.log(number.value)
    number.focus();
    let inputInt = parseInt(number.value)
    console.log(inputInt)
    e.target.innerText === "+" ? inputInt += 1 : (inputInt > 1 ? inputInt -= 1 : inputInt = 1)
    number.value = inputInt
    console.log(number.value)
    props.handleProductQuantity(number.value)
  }

  const handleChange = (e) => {
    console.log("test")
    console.log(numberInput.current.value)
  }

  let productQuantity = props.products.productStock
  const divStyle ={
    color: 'black',
  }

  if (productQuantity === 0){
    productQuantity = "OUT OF STOCK"
    divStyle.color = 'red'


  } else if (productQuantity <= 10 ){
    productQuantity = `ONLY ${productQuantity} LEFT`
    divStyle.color = 'orange'

  } else if (productQuantity > 10) {
    productQuantity = "IN STOCK"
    divStyle.color = 'green'

  }


  return (
    <><Col style={{marginBottom: '20px'}} >
        <Card >

          
            <Card.Img variant="top" src={props.products.productImageUrls[0]} />
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
  
                    <ProductDetail products={props.products} addToCart={props.addToCart} handleProductQuantity={props.handleProductQuantity} handleNumber={handleNumber} handleChange={handleChange} numberInput={numberInput} />

                  </Modal.Body>
                </Modal>

                {/* <Button variant="primary" onClick={() => {props.addToCart(props.products)}}> Add to Cart </Button> &nbsp; */}
                <Button variant='secondary' onClick={(e) => handleNumber(e)}> - </Button>
                  <input className='numInput' type="text" inputMode='numeric' ref={numberInput} defaultValue={1} min={1} onChange={(e) => handleChange(e)} ></input>
                <Button variant='secondary' onClick={(e) => handleNumber(e)}> + </Button> &nbsp;
                <BsCart4 size={28} style={{ cursor: 'pointer'}} onClick={() => {props.addToCart(props.products)}}> </BsCart4>&nbsp;
                {/* <Button onClick={(e) => {props.increaseQuantity(e)}}> + </Button> */}
                {/* <input type="number" name={props.products.name} placeholder="1" min={1}  onChange={(e) => handleInputChange(e)}></input> */}
                {/* <Button onClick={(e) => {props.decreaseQuantity(e)}}> - </Button> */}


            </Card.Body>

        </Card>
        </Col>
    </>
  )
}
