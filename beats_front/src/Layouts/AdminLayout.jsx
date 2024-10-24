import React from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, Outlet } from 'react-router-dom'

const AdminLayout = () => {

  const [cookie, setCookie, removeCookie] = useCookies(['sessionID', 'role'])

  if(localStorage.getItem('sessionID') == null || !cookie['sessionID']) {
    return <Navigate to= '/login'/>

  }else if(localStorage.getItem('sessionID') && cookie['sessionID'] && cookie['role'] != 'admin') {

    if(cookie['role'] === 'teacher'){
      return <Navigate to= '/teacher-dashboard'/>

    }else if(cookie['role'] === 'student') {
      return <Navigate to= '/home'/>
    }
  }


  return (
    <div>
        <Outlet/>
    </div>
  )
}



export default AdminLayout