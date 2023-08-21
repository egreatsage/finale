import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Tenant from './pages/Tenant'
import Booking from './pages/Booking'
import AddEditBooking from './pages/AddEditBooking'


function App() {
  
  return (
  <>
   <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/tenant' element={<Tenant/>}/>
    <Route path='/booking' element={<Booking/>}/>
    <Route path='/addeditbooking:id' element={<AddEditBooking  />}/>
  
  </Routes>
  </>
  )
}

export default App
