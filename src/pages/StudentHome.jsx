import React,{useEffect} from 'react'
import { useAuth } from '../context/contextapi'

const StudentHome = () => {
   const {userStudentdata ,user}=useAuth();
   useEffect(() => {
    userStudentdata();
   }, []);
   
  return (
    <div className='text-3xl items-center flex justify-center h-screen content-center m-auto'>
    my name {user.username}
    </div>
  )
}

export default StudentHome
