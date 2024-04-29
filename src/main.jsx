import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from './pages/LandingPage/LandingPage.jsx'
import Game from './pages/Game/Game.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/Game' element={<Game />} />
      </Routes>
    </Router>
    
  // </React.StrictMode> 
)
