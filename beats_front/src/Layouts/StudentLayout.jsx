import React from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, Outlet } from 'react-router-dom'

const StudentLayout = () => {

  const [cookie, setCookie, removeCookie] = useCookies(['sessionID', 'role'])

  if(localStorage.getItem('sessionID') == null || !cookie['sessionID']) {
    return <Navigate to= '/login'/>

  }else if(localStorage.getItem('sessionID') && cookie['sessionID'] && cookie['role'] != 'student') {

    if(cookie['role'] === 'admin'){
      return <Navigate to= '/admin-dashboard'/>

    }else if(cookie['role'] === 'teacher') {
      return <Navigate to= '/teacher-dashboard'/>
    }
  }


  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default StudentLayout