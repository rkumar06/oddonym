import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {Link } from "react-router-dom";

import './Style.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Link to='/LandingPage'>
          <button>
            Landing Page
          </button>
        </Link>

        <Link to='/Game'>
          <button>
            Game
          </button>
        </Link>
        
        <Link to='/GameFrontEnd'>
          <button>
            GameFrontEnd
          </button>
        </Link>
      </div>
    </>
  )
}

export default App
