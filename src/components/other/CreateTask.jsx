import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = ({setShowCreateForm}) => {
  const [userData, setUserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [asignTo, setAsignTo] = useState("");
  const [category, setCategory] = useState("");

  const [newTask, setNewTask] = useState({});
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    // Basic validation using if-else
    if (
      taskTitle.trim() === "" ||
      taskDescription.trim() === "" ||
      taskDate.trim() === "" ||
      asignTo.trim() === "" ||
      category.trim() === ""
    ) {
      setError("Please fill in all fields before submitting.");
    } else {
      setError("");

      const createdTask = {
        id: Date.now(),
        taskTitle,
        taskDescription,
        taskDate,
        category,
        asignTo,
        active: false,
        newTask: true,
        failed: false,
        completed: false,
      };

      const updatedData = userData.map((elem) => {
        if (asignTo === elem.firstName) {
          return {
            ...elem,
            tasks: [...elem.tasks, createdTask],
            taskCounts: {
              ...elem.taskCounts,
              newTask: elem.taskCounts.newTask + 1,
            },
          };
        }
        return elem;
      });

      setUserData(updatedData);
      localStorage.setItem('employees', JSON.stringify(updatedData));

      setTaskTitle("");
      setCategory("");
      setAsignTo("");
      setTaskDate("");
      setTaskDescription("");
    }
  };

  return (
    <div className="p-5 bg-[#1c1c1c] mt-5 rounded relative">
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap w-full items-start justify-between"
      >
        <div className="w-1/2">
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Make a UI design"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="date"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Asign to</h3>
            <input
              value={asignTo}
              onChange={(e) => setAsignTo(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="employee name"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="design, dev, etc"
            />
          </div>
        </div>

        <div className="w-2/5 flex flex-col items-start">
          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button className="bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full">
            Create Task
          </button>
        </div>
      </form>
      <button 
       class="absolute top-0 right-0 text-white-800 hover:text-gray-700 text-lg font-bold" 
       aria-label="Close"
       onClick={()=>setShowCreateForm(false)}
      >
        &times;
      </button>
    </div>
  );
};

export default CreateTask;
