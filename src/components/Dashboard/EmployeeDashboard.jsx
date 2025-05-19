import React from 'react';
import Header from '../other/Header';
import TaskListNumbers from '../other/TaskListNumbers';
import TaskList from '../TaskList/TaskList'


const style = {
  dashboard: {
    padding: '40px',
    width: '100%',
    backgroundColor: '#1C1C1C',
    height: '100vh',
    color: 'white',
  },
};

const EmployeeDashboard = (props) => {
  console.log("EmployeeDashboard data", props.data);
  return (
    <div style={style.dashboard}>
      <Header changeUser={props.changeUser} data={props.data}/>
      <TaskListNumbers data={props.data} />
      <TaskList data={props.data} />
    </div>
  );
};

export default EmployeeDashboard;
