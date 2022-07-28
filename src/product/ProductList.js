import { useState, useEffect } from 'react'
import { Row, Container, Modal } from "react-bootstrap";
import './ProductList.css'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'





export default function ProductList(props) {

    const [showModal, setShowModal] = useState(false)
    const [filter, setFilter] = useState("all")

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


    console.log(props.products, "ProductList Test")

    const handleFilterClick = (e) => {
      console.log(e.target.name)
      setFilter(e.target.name)
    }


  return (
    <div >
          <ButtonGroup id="shopFilter">
          <Button variant="primary" name="All" onClick={(e) => {handleFilterClick(e)}}>All</Button>
          <Button variant="primary" name="Film/TV" onClick={(e) => {handleFilterClick(e)}}>Film/TV</Button>
          <Button variant="primary" name="Video Game" onClick={(e) => {handleFilterClick(e)}}>Video Game</Button>
          <Button variant="primary" name="Original Work" onClick={(e) => {handleFilterClick(e)}}>Original Work</Button>
          </ButtonGroup>
        &nbsp;
        <Container className="d-flex"  >


          <Row  className="m-auto align-self-center" xs={1} sm={2} md={3} lg={4} xl={5}>

            {(filter === "Original Work" ? props.originalProducts : (filter === "Video Game" ? props.videoProducts : (filter === "Film/TV" ? props.filmProducts : props.allProducts ) ) )}
            {/* {props.filmProuducts} */}
            
          </Row> 
        </Container>
       




    
    
    
    </div>
  )
}
