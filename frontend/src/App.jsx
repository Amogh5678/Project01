import React from 'react'
import {Route, Routes} from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import Start from './pages/Start'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import Home from './pages/Home'


export const App = () => {

  return (
    <div>
      <Routes>
       <Route path='/Start' element={<Start/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignUp/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignUp/>}/>
        <Route  path='/home' element={<Home/>}/>




      </Routes>


    </div>
  )
}


export default App;