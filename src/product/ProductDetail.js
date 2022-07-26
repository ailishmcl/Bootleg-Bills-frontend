import React, { useRef, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import './ProductDetail.css'


export default function ProductDetail(props) {
  let altText = props.productName.replace(/ /g, '').toLowerCase()

  const numberInput = useRef(null)
  
  const [currentlySelected, setCurrentlySelected] = useState("")
  
  useEffect(()=>{
    setCurrentlySelected(document.getElementById("thumb-0"))
    var defaultImg = document.getElementById("thumb-0")
    defaultImg.className = "selected-img"
  },[])

  const handleNumber = (e) => {
    let number = numberInput.current
    number.focus();
    let inputInt = parseInt(number.value)
    e.target.innerText === "+" ? inputInt += 1 : (inputInt > 1 ? inputInt -= 1 : inputInt = 1)
    number.value = inputInt
    console.log(number.value)
  }

  const handleChange = (e) => {
    console.log(numberInput.current.value)
  }

  const handleSelect = (e) => {
    console.log(e.target)
    if(currentlySelected === e.target){
      console.log("Currently selected")
      console.log(currentlySelected.src)
      
    } else {
      const idSlice = e.target.id.slice(0, 5)
      let doClassIdMatch = (idSlice === e.target.className)
      let newClass = doClassIdMatch ? "selected-img" : e.target.className
      if(currentlySelected){
        currentlySelected.className = "thumb"
      }
      e.target.className = newClass
      setCurrentlySelected(e.target)
    }
  }
  
  const imgThumbs = props.productImageUrls.map((url, index) =>
    <div key={index} className={`div-thumb`} id={`div-${index}`} onClick={(e) => handleSelect(e)}>
      <img className='thumb' id={`thumb-${index}`} src={props.productImageUrls[index]} alt={`thumb-${index}`} />
    </div>
  );


  return (
    <div className='detailModalFlex'>

      <div className='images'>

        <div className='mainImg'>
          <img className='detailImg' src={currentlySelected.src} alt={`${altText}_img`}/>
        </div>
        
        <div className='img-thumbs'>
          {imgThumbs}
        </div>
      </div>
      

      <div className='vr'></div>
    
      <div className='detailsInfo'>
        <h3>{props.productName}</h3>
        <p>{props.productSourceType!=="Original Work" ? "from" : "by"} {props.productSource}</p>
        <h5>£{props.productPrice}</h5>
        <p>{props.productDescription}</p>

        <div className='audioPlayer'>
          <div className='player'>
            <div className='playButton'>
              <div className='arrow'></div>
            </div>
            <div className='seekBar'>
              <div className='elapsed'></div>
            </div>
          </div>
          <p className="timeCount"><span>0:19</span> / <span>0:30</span></p>

          <div className='quantityCounter'>
            <Button variant='secondary' onClick={(e) => handleNumber(e)}> - </Button>
              <input className='numInput' type="text" inputMode='numeric' ref={numberInput} value={1} min={1} onChange={(e) => handleChange(e)} ></input>
            <Button variant='secondary' onClick={(e) => handleNumber(e)}> + </Button> &nbsp;
            <Button variant="primary"> Add to Cart </Button> &nbsp;
          </div>

        </div>
      </div>
   
    </div>
  )
}
