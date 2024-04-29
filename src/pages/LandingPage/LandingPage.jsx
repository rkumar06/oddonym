import React from 'react'
import './LandingPage.css'

import oddleLogo from './../../../public/oddle.svg'
import Button from '../../components/Button'

function LandingPage() {
  return (
    <div className='LandingPageDiv'>
      {/* these link tags allow us to use external fonts from Google API */}
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
      <link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet"></link>
      <img src={oddleLogo} className="logo-react button-emoji" alt="React logo"/>
      <div className='wavy'>
        <span style={{ '--i': '1'}}>O</span>
        <span style={{ '--i': '2'}}>d</span>
        <span style={{ '--i': '3'}}>d</span>
        <span style={{ '--i': '4'}}>l</span>
        <span style={{ '--i': '5'}}>e</span>
        {/* <span style={{ '--i': '6'}}>!</span> */}
      </div>
      <div className='description'>
        <p className='desc'>Given X words, select the odd word out.</p>
      </div>
      <Button textInButton="Play Oddle" color="normal" size="normal" linkTo="/Game" />
      <br></br>
      <h4>April 11, 2024</h4>
      <h4>No. 0</h4>
      <h4 className="button-emoji">Edited by Rahl</h4>
    </div>
  )
}

export default LandingPage