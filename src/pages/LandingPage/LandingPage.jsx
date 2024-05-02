import React from 'react'
import './LandingPage.css'

import oddonymLogo from './../../../public/oddonym.svg'
import Button from '../../components/Button'

function LandingPage() {
  return (
    <div className='oddonym-container'>
      <img src={oddonymLogo} className='oddonym-logo' alt="React logo"/>
      <h1 className='oddonym-title'>Oddle</h1>
      <div className='rules-wrapper'>
        <p className='oddonym-rules'>Given X words, select the odd word out.</p>
      </div>
      <Button textInButton="Play Now" color="normal" size="normal" linkTo="/Game" />
      <h4 className="bio">By Riya Kumar and Alicia Shanahan</h4>
    </div>
  )
}

export default LandingPage