import { useState, useEffect } from 'react'
import { Row, Container, Modal } from "react-bootstrap";
import './ProductList.css'





export default function ProductList(props) {

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        loadProductList()
    }, [])


    // const loadProductList = () => {

    //     Axios.get("product/index")
    //     .then((response) => {
    //         console.log(response)
    //         // Setting state here:
    //         props.setProducts(response.data.product)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }

    const loadProductList = () => {

        props.loadProductList()
        
    }

    const onDetailClick = () => {
      !showModal ? setShowModal(true) : setShowModal(false)
    }



  return (
    <div >
        <h1>Product Index</h1>

        <Container className="d-flex"  >
          <Row  className="m-auto align-self-center" xs={1} sm={2} md={3} lg={4} xl={5}>
            
            {props.allProducts}
            
          </Row> 
        </Container>
       




    
    
    
    </div>
  )
}
