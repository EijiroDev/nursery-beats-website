import React from 'react'
import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom'

const LoginLayout = () => {

  const [cookie, setCookie, removeCookie] = useCookies(['sessionID', "role"]); 
  if(localStorage.getItem('sessionID') && cookie['sessionID'] && cookie['role'] === "admin") {
    return <Navigate to= '/admin-dashboard'/>
  }else if(localStorage.getItem('sessionID') &&  cookie['sessionID'] && cookie['role'] === "teacher") {
    return <Navigate to= '/teacher-dashboard'/>
  }else if( localStorage.getItem('sessionID') &&  cookie['sessionID'] && cookie['role'] === "student") {
    return <Navigate to= '/home'/>
  }

  return (
    <div>

        <Outlet/>

    </div>
  )
}

export default LoginLayout