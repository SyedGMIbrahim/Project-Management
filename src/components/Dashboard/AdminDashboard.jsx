import React, { useState } from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
const AdminDashboard = (props) => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    return (
        <div className='h-screen w-full p-7'>
            <Header changeUser={props.changeUser} />
            <button
              onClick={()=>setShowCreateForm(true)}
              className="bg-green-600 text-white px-5 py-2 rounded-sm absolute right-35 top-25"
            > Create Task </button>
            {showCreateForm ? <CreateTask setShowCreateForm={setShowCreateForm}/> :
            <AllTask />}
        </div>
    )
}

export default AdminDashboard