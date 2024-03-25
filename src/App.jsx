import { useState } from 'react'
import './App.scss'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/'>
            <Route index element={<Home/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
