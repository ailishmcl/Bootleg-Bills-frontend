import React from 'react'
import { Col, Row, Container, Navbar, Form} from "react-bootstrap";
import './footer.css'

import NewsLetter from './NewsLetter';

export default function Footer(props) {
  return (

    <>
    <div className="clear"></div>
    <div className="footer-container fixed-bottom d-flex justify-content-center m-auto" >


<div className="footer"> 
      <div className="footer-heading footer-2">
        <h2>About Us</h2>

      </div>
      <div className="footer-heading footer-3">
        <h2>Products</h2>

      </div>
      <div className="footer-heading footer-3">
        <h2>Social Media</h2>

      </div>
      
      <NewsLetter addNewsletterEmail={props.addNewsletterEmail}/>
      </div>
    
    </div>

    </>
  )
}


{/* <div className="fixed-bottom d-flex justify-content-center footer-container" >


<NewsLetter addNewsletterEmail={props.addNewsletterEmail}/>


</div> */}