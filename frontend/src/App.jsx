import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Start from './pages/Start'
import UserSignUp from './pages/UserSignUp'
import UserLogin from './pages/UserLogin'
import UserLogout from './pages/UserLogout'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import Home from './pages/Home'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'


export const App = () => {

  return (
    <div>
      <Routes>
       <Route path='/' element={<Start/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignUp/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignUp/>}/>
        <Route  path='/home' element =
        {
          <UserProtectedWrapper>
            <Home/>
          </UserProtectedWrapper>
          }/>
          
        <Route  path='/user-logout' element =
        {
          <UserProtectedWrapper>
            <UserLogout/>
          </UserProtectedWrapper>
          } > </Route>

<Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>

        } />
        <Route path='/captain-logout' element={
          <CaptainProtectedWrapper>
            <CaptainLogout />
          </CaptainProtectedWrapper>
        } />
      </Routes>

      

      


    </div>
  )
}


export default App;