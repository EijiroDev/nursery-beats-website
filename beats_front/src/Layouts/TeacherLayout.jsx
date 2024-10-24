import React from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, Outlet } from 'react-router-dom'

const TeacherLayout = () => {

  const [cookie, setCookie, removeCookie] = useCookies(['sessionID', 'role'])

  if(localStorage.getItem('sessionID') == null || !cookie['sessionID']) {
    return <Navigate to= '/login'/>

  }else if(localStorage.getItem('sessionID') && cookie['sessionID'] && cookie['role'] != 'teacher') {

    if(cookie['role'] === 'admin'){
      return <Navigate to= '/admin-dashboard'/>

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

export default TeacherLayout