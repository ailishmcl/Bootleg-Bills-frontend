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
        <hr></hr>
        <a href="">Careers</a>
        <a href="">Terms of Service</a>
        <a href="">FAQs</a>
      </div>
      <div className="footer-heading footer-3">
        <h2>Products</h2>
        <hr></hr>
        <a href="">Movies</a>
        <a href="">Music</a>
        <a href="">All</a>
      </div>
      <div className="footer-heading footer-3">
        <h2>Social Media</h2>
        <hr></hr>
        <a href="">Instagram</a>
        <a href="">Facebook</a>
        <a href="">Twitter</a>
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