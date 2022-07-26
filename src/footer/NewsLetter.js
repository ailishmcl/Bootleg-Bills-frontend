import React, { useState } from 'react'

export default function NewsLetter(props) {
  const [newSignup, setNewSignup] = useState({});



  const handleChange = (event) => {

    const attributeToChange = event.target.name
    const newValue = event.target.value  

    // make a copy of the new recipe state 
    const email = {...newSignup}
    email[attributeToChange] = newValue
    console.log(email)
    setNewSignup(email)
}

    const handleClick = (event) => {
      event.preventDefault()
      props.addNewsletterEmail(newSignup)
      document.getElementById("clear-form").reset();

    }


  return (
    <div>
      
    <form onSubmit={handleClick} id="clear-form">

        <div>
            <input type="text" name="emailAddress" placeholder="Newsletter Sign Up" onChange={handleChange}></input>
        </div>

        <input type="submit" value="Signup" onClick={(e) => {handleClick(e)}}></input>
    
    </form>
    
    </div>
  )
}
