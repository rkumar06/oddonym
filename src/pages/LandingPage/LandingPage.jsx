import React from 'react'
import './LandingPage.css'

import oddonymLogo from './../../../public/oddonym.svg'
import Button from '../../components/Button'

function LandingPage() {
  return (
    <div className='oddonym-container'>
      {/* <img src={oddonymLogo} className='oddonym-logo' alt="React logo"/> */}
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="374" zoomAndPan="magnify" viewBox="0 0 280.5 61.499998" height="82" preserveAspectRatio="xMidYMid meet" version="1.0">
        <defs>
          <clipPath id="c48b69cbc4">
              <path d="M 0.882812 0 L 61.574219 0 L 61.574219 60.691406 L 0.882812 60.691406 Z M 0.882812 0 " clip-rule="nonzero"/>
          </clipPath>
          <clipPath id="962cd7c991">
              <path d="M 31.226562 0 C 14.46875 0 0.882812 13.585938 0.882812 30.34375 C 0.882812 47.105469 14.46875 60.691406 31.226562 60.691406 C 47.988281 60.691406 61.574219 47.105469 61.574219 30.34375 C 61.574219 13.585938 47.988281 0 31.226562 0 Z M 31.226562 0 " clip-rule="nonzero"/>
          </clipPath>
          <clipPath id="6ddfadf0d4">
              <path d="M 73.476562 0 L 134.167969 0 L 134.167969 60.691406 L 73.476562 60.691406 Z M 73.476562 0 " clip-rule="nonzero"/>
          </clipPath>
          <clipPath id="2cac3dde7d">
              <path d="M 103.820312 0 C 87.0625 0 73.476562 13.585938 73.476562 30.34375 C 73.476562 47.105469 87.0625 60.691406 103.820312 60.691406 C 120.582031 60.691406 134.167969 47.105469 134.167969 30.34375 C 134.167969 13.585938 120.582031 0 103.820312 0 Z M 103.820312 0 " clip-rule="nonzero"/>
          </clipPath>
          <clipPath id="ecf85c7d4d">
              <path d="M 218.078125 0 L 278.765625 0 L 278.765625 60.691406 L 218.078125 60.691406 Z M 218.078125 0 " clip-rule="nonzero"/>
          </clipPath>
          <clipPath id="c466a22fb9">
              <path d="M 248.421875 0 C 231.664062 0 218.078125 13.585938 218.078125 30.34375 C 218.078125 47.105469 231.664062 60.691406 248.421875 60.691406 C 265.179688 60.691406 278.765625 47.105469 278.765625 30.34375 C 278.765625 13.585938 265.179688 0 248.421875 0 Z M 248.421875 0 " clip-rule="nonzero"/>
          </clipPath>
          <clipPath id="afc13c1611">
              <path d="M 145.777344 0 L 206.46875 0 L 206.46875 60.691406 L 145.777344 60.691406 Z M 145.777344 0 " clip-rule="nonzero"/>
          </clipPath>
          <clipPath id="65df5f186f">
              <path d="M 176.121094 0 C 159.363281 0 145.777344 13.585938 145.777344 30.34375 C 145.777344 47.105469 159.363281 60.691406 176.121094 60.691406 C 192.882812 60.691406 206.46875 47.105469 206.46875 30.34375 C 206.46875 13.585938 192.882812 0 176.121094 0 Z M 176.121094 0 " clip-rule="nonzero"/>
          </clipPath>
        </defs>
        <g clip-path="url(#c48b69cbc4)">
          <g clip-path="url(#962cd7c991)">
            <path fill="#b9c8e4" d="M 0.882812 0 L 61.574219 0 L 61.574219 60.691406 L 0.882812 60.691406 Z M 0.882812 0 " fill-opacity="1" fill-rule="nonzero"/>
          </g>
        </g>
        <g clip-path="url(#6ddfadf0d4)">
          <g clip-path="url(#2cac3dde7d)">
            <path fill="#b9c8e4" d="M 73.476562 0 L 134.167969 0 L 134.167969 60.691406 L 73.476562 60.691406 Z M 73.476562 0 " fill-opacity="1" fill-rule="nonzero"/>
          </g>
        </g>
        <g clip-path="url(#ecf85c7d4d)">
          <g clip-path="url(#c466a22fb9)">
            <path fill="#b9c8e4" d="M 218.078125 0 L 278.765625 0 L 278.765625 60.691406 L 218.078125 60.691406 Z M 218.078125 0 " fill-opacity="1" fill-rule="nonzero"/>
          </g>
        </g>
        <g clip-path="url(#afc13c1611)">
          <g clip-path="url(#65df5f186f)">
            <path id="color-fade" fill="#1e57be" d="M 145.777344 0 L 206.46875 0 L 206.46875 60.691406 L 145.777344 60.691406 Z M 145.777344 0 " fill-opacity="1" fill-rule="nonzero"/>
          </g>
        </g>
      </svg>
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