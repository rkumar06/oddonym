import React from 'react'
import './LandingPage.css'

import oddonymLogo from './../../../public/oddonym.svg'
import Button from '../../components/Button'

function LandingPage() {
  return (
    <div className='LandingPageDiv'>
      {/* these link tags allow us to use external fonts from Google API */}
      {/* <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"></link> */}
      <img src={oddonymLogo} className="logo-react button-emoji" alt="React logo"/>
      <div className='wavy'>
       <h1 className='oddonym-title'>Oddonym</h1>
      </div>
      <div className='description'>
        <p className='desc oddonym-rules'>Given X words, select the odd word out.</p>
      </div>
      <Button textInButton="Play Now" color="normal" size="normal" linkTo="/Game" />
      <br></br>
      <h4 className="font">By Riya Kumar and Alicia Shanahan</h4>
    </div>
  )
}

export default LandingPage