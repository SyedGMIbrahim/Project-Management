import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {

   const [userData,setUserData] =  useContext(AuthContext)

   
  return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
        <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
            <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
            <h3 className='text-lg font-medium w-1/5'>New Task</h3>
            <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
            <h5 className='text-lg font-medium w-1/5'>Completed</h5>
            <h5 className='text-lg font-medium w-1/5'>Failed</h5>
        </div>
        <div className=''>
        {userData.map(function(elem,idx){
          const newTasks = elem.tasks.filter((i)=>i.newTask===true);
          const active = elem.tasks.filter((i)=>i.active===true);
          const completed = elem.tasks.filter((i)=>i.completed===true);
          const failed = elem.tasks.filter((i)=>i.failed===true);
            return <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
            <h2 className='text-lg font-medium  w-1/5'>{elem.firstName}</h2>
            <div className='text-lg font-medium w-1/5 text-blue-400'>
              {newTasks.map((i)=><h3 className='border-2 mb-2 py-2 px-4 rounded w-50'>{i.taskTitle}</h3>)}
            </div>
            <div className='text-lg font-medium w-1/5 text-yellow-600'>
              {active.map((i)=><h5 className='border-2 mb-2 py-2 px-4 rounded w-50'>{i.taskTitle}</h5>)}
            </div>
            <div className='text-lg font-medium w-1/5 text-green-600'>
              {completed.map((i)=><h5 className='border-2 mb-2 py-2 px-4 rounded w-50'>{i.taskTitle}</h5>)}
            </div>
            <div className='text-lg font-medium w-1/5 text-red-600'>
              {failed.map((i)=><h5 className='border-2 mb-2 py-2 px-4 rounded w-50'>{i.taskTitle}</h5>)}
            </div>  
        </div>
        })}
        </div>
        
        
    </div>
  )
}

export default AllTask