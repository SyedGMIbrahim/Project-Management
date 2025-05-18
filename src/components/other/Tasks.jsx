import React, { useEffect, useState, useContext } from "react";
import { getLocalStorage } from "../../utils/localStorage";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employees, setEmployees] = useState([]);
  const [userData] = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
 
    if (!userData) {
      navigate("/login");
      return;
    }

    const data = getLocalStorage();
    if (data) {
      if (data.tasks) {
        setTasks(data.tasks);
      }
    
      if (data.employees) {
        setEmployees(data.employees.filter(emp => emp.role === 'employee'));
      }
    }
  }, [userData, navigate]);

  useEffect(() => {
    const data = getLocalStorage();
    if (data) {
      data.tasks = tasks;
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      alert("Please enter a task title");
      return;
    }
    if (userData.role === 'admin' && !selectedEmployee) {
      alert("Please select an employee to assign the task");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: newTaskTitle,
      completed: false,
      assignedTo: userData.role === 'admin' ? selectedEmployee : userData.username,
      createdBy: userData.username,
      createdAt: new Date().toISOString()
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setSelectedEmployee("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Tasks Management</h2>
        <button
          onClick={() => navigate(userData.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard')}
          style={{
            backgroundColor: '#666',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none'
          }}
        >
          Back to Dashboard
        </button>
      </div>

      <form onSubmit={addTask} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '4px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter task title"
            style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
          />
          {userData.role === 'admin' && (
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              style={{ padding: '8px', width: '100%' }}
            >
              <option value="">Select employee to assign</option>
              {employees.map(emp => (
                <option key={emp.username} value={emp.username}>
                  {emp.username}
                </option>
              ))}
            </select>
          )}
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none'
          }}
        >
          Add Task
        </button>
      </form>

      <div>
        {tasks
          .filter(task => 
            userData.role === 'admin' || task.assignedTo === userData.username
          )
          .map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              style={{
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: task.completed ? '#f0f0f0' : 'white',
                textDecoration: task.completed ? 'line-through' : 'none'
              }}
            >
              <div>{task.text}</div>
              <div style={{ fontSize: '0.8em', color: '#666' }}>
                Assigned to: {task.assignedTo} | Created by: {task.createdBy}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tasks;
