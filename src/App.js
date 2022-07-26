import React, { useState, useEffect } from 'react'
import Signup from './user/Signup'
import Login from './user/Login'
import Dash from './user/Dash'
import Cart from './cart/Cart'
import {Route, Routes, Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'
import ProductList from './product/ProductList'
import Product from './product/Product'
import jwt_decode from 'jwt-decode'
import Home from './home/Home'
import ProductMetrics from './product/ProductMetrics'
import {BsCart4} from 'react-icons/bs'
import Badge from 'react-bootstrap/Badge'
import {Alert} from 'react-bootstrap'
import Modal from 'react-modal'
import Footer from './footer/Footer'
import NewsLetter from './footer/NewsLetter'
import Checkout from './cart/Checkout' 




import 'bootstrap/dist/css/bootstrap.min.css';


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';






export default function App() {
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)


  const navigation = useNavigate()

  useEffect(() => {
    console.log("useEffect triggered")
    setCartCount(cart.length)
    console.log(cartCount)
    let token = localStorage.getItem("token")


    if(token != null){
      let user = jwt_decode(token)
      console.log("USER NAME:", user.user.name)
      console.log("USER ROLE:", user.user.role)
      console.log(user.user)

      if(user){
        setIsAuth(true)
        setUser(user)
        setUserRole(user.user.role)
      }
      else if (!user){
        localStorage.removeItem("token");
        setIsAuth(false)
      }
    }
    
  }, [cart, cartCount])

  

  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState({})
  // 
  const [products, setProducts] = useState([])
  const [userRole, setUserRole] = useState("")
  // const [cart, setCart] = useState([])
  // const [cartCount, setCartCount] = useState(0)
  const [productQuantity, setProductQuantity] = useState(1)
  // const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [productToEdit, setProductToEdit] = useState("")
  // const [cartItemQuant, setCartItemQuant] = useState({})
  // const [cartDisplayArr, setCartDisplayArr] = useState([])


  // Product Detail
  // const [currentProduct, setCurrentProduct] = useState()
  // const [isDetail, setIsDetail] = useState(false)

  const addNewsletterEmail = (email) => {
    // The url is the api and the recipe post comma is the body 
    Axios.post("newsletter", email)
    .then(response => {
        console.log("Recipe Add Fine")
    })
    .catch(error => {
        console.log("There's an error")
        console.log(error)
    })

}

  
  const registerHandler = (user) => {
    Axios.post("auth/signup", user)
    .then(response => {
      if(response.data.message.slice(0, 6) === "Failed"){
        setErrorMessage("User registration failed.")
      } else {
      console.log(response)
      console.log("Signed up successfully!")
      console.log(user)
      setSuccessMessage("User signup has been successful")
      navigation("/login")
      }
    })
    .catch(error => {
      console.log(error)
      setErrorMessage("User registration failed!")
    })
  }

  // const increaseQuantity = (e) => {
  //   console.log("increment button clicked")
  //   setProductQuantity(productQuantity + 1)
  // }
  // const decreaseQuantity = (e) => {
  //   console.log("decrement button clicked")
  //   if(productQuantity > 1){
  //     setProductQuantity(productQuantity - 1)
  //   }
  // }

  const handleProductQuantity = (quantity) => {
    console.log("hello")
    console.log(quantity)
    setProductQuantity(quantity)
    // console.log(productQuantity)
  }

  
  const addToCart = (product) => {
    console.log("button clicked")
    console.log(product)
    console.log(productQuantity)
    // setCartItemQuant(cartItemQuant[product._id]=productQuantity)
    // console.log(cartItemQuant[product._id])
    // let tempCart = []
    for (let i = 1; i <= productQuantity; i++){
      setCart(cart => [...cart, product])
    }
    // setCart(cart.concat(product))
    // setCart(cart => [...cart, product])
    setCartCount(cart.length)
    setProductQuantity(1)
    console.log(cart)
    console.log(cartCount)
  }
  const handleRemoveFromCart = (deletedItem) => {
    console.log(deletedItem._id)
    const updatedCart = cart.filter(element => element._id !== deletedItem._id)
    // setCartDisplayArr(cartDisplayArr.filter(element => element._id !== deletedItem._id))
    console.log(updatedCart)
    setCart(updatedCart)
}

  const loadProductList = () => {
    Axios.get("product/index")
    .then((response) => {
        console.log(response)
        // Setting state here:
        setProducts(response.data.product)
    })
    .catch((error) => {
        console.log(error)
    })
  }

  const handleDelete = (id) => {
    console.log(id)
    console.log("clicked")
    
    Axios.delete(`product/delete?id=${id}`)
    .then((response) => {
        console.log(response)
        console.log("Product record successfully deleted.")
        loadProductList()
    })
    .catch((error) => {
        console.log("Error deleting product record:")
        console.log(error)
    })
}

const editGet = (id) => {
  console.log("Edit GET MAIN")
  console.log(id)
  Axios.get(`product/edit?id=${id}`)
  .then(response => {
    var product = response.data.product
    console.log("GET PRODUCT", product)
    setProductToEdit(product)
  })
  .catch((error) => {
    console.log("Error loading product information:", error)
  })
}

  // const loadCartArray = (cartItems) => {
  //   // console.log("cart clicked")
  //   // console.log(cart)
  //   console.log(cartItems)
  // //   Axios.get("cart", cartItems)
  // //   .then(response => {
  // //     console.log(response)
  // //   })
  // //   .catch(error => {
  // //     console.log(error)
  // //   })
  // }

  const makeCart = (cartItems) => {
    // e.preventDefault()
    console.log(cartItems)
    console.log("makecart working")
    let idArr = []
    cartItems.forEach(element => {
      idArr.push(element._id)
    });
    console.log(idArr)
    var dataObj = {user : user.user.id, status : "active", product : idArr }
    console.log(dataObj)
    Axios.post("cart", dataObj)
    .then(response => {
      console.log(response)
      navigation("/checkout")
    })
    .catch(error => {
      console.log(error)
    })
  }



  const allProducts = products.map((products, index) => (
    
    <div key={index}>

      <Product  products={products} addToCart={addToCart} productQuantity={productQuantity} handleProductQuantity={handleProductQuantity} />
      
    </div>

  ))

  const allStock = products.map((product, index) => (

    <div key={index}>

        <ProductMetrics product={product} setProducts={setProducts} handleDelete={handleDelete} editGet={editGet} productId={productToEdit._id} productToEdit={productToEdit} setProductToEdit={setProductToEdit} loadProductList={loadProductList}/>

    </div>

  ))

  const loginHandler = (cred) => {
    console.log(cred)
    Axios.post("auth/login", cred)
    .then(response => {
      console.log(response.data.token)
      if(Object.keys(response.data.token).length){
        localStorage.setItem("token", response.data.token);
        let user = jwt_decode(response.data.token)
        setIsAuth(true)
        setUser(user)
        console.log(user.user.role)
        setUserRole(user.user.role)
        user.user.role === "seller" ? navigation("/manage") : navigation("/index")
        console.log("User successfully logged in.")
        setSuccessMessage("User successfully logged in.")
        setTimeout(() => {
          setSuccessMessage(null);
          }, 3000);
      } else {
        console.log("test")
      }
    })
    .catch(error => {
      console.log(error)
      setErrorMessage("User has failed to login.")
      setTimeout(() => {
        setErrorMessage(null);
        }, 3000);
    })
  }

  const onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false)
    setUser(null)
    setUserRole("")
    console.log("User successfully logged out.")
    setSuccessMessage("User successfully logged out.")
    navigation("/")

    setTimeout(() => {
      setSuccessMessage(null);
      }, 3000);
  }

//   function detailView(id){
//     console.log("it's me over here!")
//     Axios.get(`product/detail?id=${id}`)
//     .then(response => {
  

  

  // const addProduct = (product) => {
  //   console.log("Add Product")
  //   Axios.post("product/add", product)
  //   .then(response => {
  //     console.log(response.data)
  //     console.log("Product added successfully.")
  //     // loadProductList();
  //   })
  //   .catch((error) => {
  //     console.log("Error adding product.")
  //     console.log(error)
  //   })
  // }

//   return (
//     <div>
//       <Router>
//         <nav>
//           { isAuth ? (
//             <div>
//               {user ? `Welcome, ${user.user.name}!` : "null"} &nbsp;
//               <Link to="/manage">{userRole === "seller" ? "Seller Dashboard" : "My Orders"}</Link> &nbsp;
//               <Link to="/">Home</Link> &nbsp;
//               <Link to="/index">Products</Link> &nbsp;
//               <Link to="/logout" onClick={onLogoutHandler}>Log Out</Link> &nbsp;
//               <Link to="/cart" onClick={loadCartArray}> <BsCart4> </BsCart4> </Link> <Badge bg="secondary"> {cartCount} </Badge> &nbsp;
//             </div>
//           ):(
//             <div>
//               <Link to="/">Home</Link> &nbsp;
//               <Link to="/index">Products</Link> &nbsp;
//               <Link to="/signup">Sign Up</Link> &nbsp;
//               <Link to="/login">Log In</Link> &nbsp;
//               <Link to="/cart" onClick={() => {loadCartArray(cart)}}> <BsCart4> </BsCart4> </Link> <Badge bg="secondary"> {cartCount} </Badge> &nbsp;

// //         console.log(response.data)
// //         var productDetail = response.data
// //         setIsDetail(true)
// //         setCurrentProduct(productDetail)
// //     })
// //     .catch(error => {
//         console.log(error)
//         console.log("Error loading recipe information")
//     })
// }


  const sucMessage = successMessage ? (
    <Alert id="box" variant="success" onClose={() => setSuccessMessage(null)} dismissible>{successMessage}</Alert>
  ): null;

  const errMessage = errorMessage ? (
    <Alert id="box" variant="danger" onClose={() => setErrorMessage(null)} dismissible>{errorMessage}</Alert>
    
  ): null;






  return (
    

    
    <div>



    
      {/* React Bootstrap Nav Bar*/}
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>



        
        <Navbar.Brand href="#home">Bootleg Tapes</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse className="justify-content-end" >
        <Nav>
          { isAuth ? (
          <>          
          <Nav.Link as={Link} to="/"> Home</Nav.Link>
          <Nav.Link as={Link} to="/index"> Products</Nav.Link>
          <Nav.Link as={Link} to="/logout" onClick={onLogoutHandler}>Logout</Nav.Link>
          <Nav.Link as={Link} to="/manage"> 
          <Navbar.Text>
          {userRole === "seller" ? "Seller Dashboard" : "My Orders"}
          </Navbar.Text>
          </Nav.Link>
          <Navbar.Text>{`Signed in as: ${user.user.name}!`}</Navbar.Text>
          <Nav.Link as={Link} to="/cart"><BsCart4> </BsCart4> <Badge bg="secondary"> {cartCount} </Badge></Nav.Link>
          </>
          ):(
          <>
          <Nav.Link as={Link} to="/login"> Login</Nav.Link>
          <Nav.Link as={Link} to="/"> Home</Nav.Link>
          <Nav.Link as={Link} to="/signup"> Signup</Nav.Link>
          <Nav.Link as={Link} to="/index"> Products</Nav.Link>
          <Nav.Link as={Link} to="/cart"><BsCart4> </BsCart4> <Badge bg="secondary"> {cartCount} </Badge></Nav.Link>
          </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
     {sucMessage}
     {errMessage}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup register={registerHandler} />} />
            <Route path="/index" element={<ProductList allProducts={allProducts} setProducts={setProducts} addToCart={addToCart} loadProductList={loadProductList}/>} />
            <Route path="/login" element={<Login login={loginHandler} role={userRole}/>} />
            <Route path="/manage" element={<Dash role={userRole} allStock={allStock} products={products} setProducts={setProducts} loadProductList={loadProductList} sucMessage={sucMessage} setSuccess={setSuccessMessage} error={errMessage} setError={setErrorMessage}/>} />
            <Route path="/cart" element={<Cart cart={cart} makeCart={makeCart} productQuantity={productQuantity} addToCart={addToCart} handleRemoveFromCart={handleRemoveFromCart} handleProductQuantity={handleProductQuantity}/>} />
            <Route path="/checkout" element={<Checkout cart={cart} user={user} />} />
          </Routes>
        </div>


        <Footer addNewsletterEmail={addNewsletterEmail}/>
        
      

  
    </div>

  )
  
}
