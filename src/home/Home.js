import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './home.css'
// import ReactAudioPlayer from 'react-audio-player';

import img1 from "./assets/kirk.jpg";
import img2 from "./assets/truth-alt.jpg";
import img3 from "./assets/floral.jpg"
import Axios from 'axios';
import Image from 'react-bootstrap/Image'
import bigLogo from './assets/big_logo.png'


// import track1 from "./assets/30_Seconds_of_Bowling_Sounds.mp3"
// import track1 from "./assets/30_Seconds_of_Bowling_Sounds.mp3"


const options = {
  showArrows: false,
  showStatus: false,
  showIndicators: false,
  showThumbs: false,
  autoPlay: true,
  infiniteLoop: true,
  stopOnHover: false,
  swipeable: false,
  animationHandler: 'fade',
};

export default function Home(props) {

    const [popular, setPopular] = useState({})

    const [getOrderState, setGetOrderState] = useState([])

    const getOrder = async () => {
      const data = await Axios.get('orders/index');
      return data.data
    }
    
    useEffect(()=>{
      getOrder().then(response => setGetOrderState(response));
      console.log(getOrderState)      
    },[])
    

    const getPopular = () => {
      
      var popularities = {}

      const mapIds = props.products ? props.products.map(product => product._id) : []
  
      console.log(mapIds)
  
  
      mapIds.forEach(prodId => {
        let totalOrdered = 0
        const productId = prodId
        
        const getProduct = () => {
          return Axios.get(`product/detail?id=${productId}`);
        }
        
        
        Promise.all([getProduct()])
          .then(function (responses) {
            const popProduct = responses[0].data.product

            console.log('GET ORDER', getOrderState)

            getOrderState.forEach(order => {
              if(order.cart.includes(productId)){
                totalOrdered += order.cart.filter(x => x===productId).length
              } else {
                console.log("Order does not include product")
              }
            })
            
            popularities = {...popularities, [productId]: {product: popProduct, popularity: totalOrdered}}
            console.log(`This product has been ordered ${totalOrdered} times.`)
            console.log(popularities)
            setPopular(popularities) 
            
          });
        }); 
    }

    useEffect(() => {
      if(props.products.length > 0){
      getPopular()
      }
    }, [props.products])

    if(!props.products.length){
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    const top3Products = !!Object.keys(popular).length ? Object.keys(popular).map((key) => popular[key]).sort((a,b) => b.popularity - a.popularity).slice(0,3) : [];
    console.log(top3Products, "PRODUCTS")



    
    if(top3Products.length === 3) {
    
    return (
      
        
      <>
      <div className="best-seller">
        <h2> Our Best Sellers: </h2>
      </div>

      <Carousel className='main-slide'>
        {top3Products.map(popProduct => (
            <div key={popProduct.product._id}>
              <div className="type">{popProduct.product.productName}</div>
              <img alt="" src={popProduct.product.productImageUrls[popProduct.product.productImageUrls.length -1]}/>
            </div>
        ))}
      </Carousel>
        <div className='homepage-logo'> 
        <Image src={bigLogo} alt="" height={500}/>
        <div className="homepage-about">
          <h3>About Us: </h3>
          <p> Bootleg Bill's Unofficial Rarities.... SOme more content here....</p>
        </div>
        </div>

        {/* <div className="test">
  
        <input className="search" id="search" placeholder="Enter Post Title" onChange={event => setQuery(event.target.value)} />
          <div className="results">
            {test}
          </div>
        </div> */}


     </>
    )
  } 
    
      // return (
      //   <Carousel className='main-slide'>
      //   {top3Products.map(popProduct => (
      //       <div key={popProduct.product._id}>
      //         <div className="type">{popProduct.product.productName}</div>
      //         <img alt="" src={popProduct.product.productImageUrls[popProduct.product.productImageUrls.length -1]}/>
      //       </div>
      //   ))}
      // </Carousel>
      // )
  }

