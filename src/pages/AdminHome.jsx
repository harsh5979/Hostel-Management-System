import React ,{useEffect}from 'react'
import { useAuth } from '../context/contextapi'


const AdminHome = () => {
    const {user ,userdata}=useAuth();
    useEffect(() => {
     
      userdata()
    }, []);
    
  return (
    <div className='h-screen m-auto text-center flex justify-center w-full content-center items-center'>
      home page {user.username}
    </div> 
  )
}

export default AdminHome
