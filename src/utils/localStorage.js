const initialData = {
    employees: [
      {
        id: 1,
        username: "admin",
        password: "adminpassword",
        role: "admin",
        name: "Admin User"
      },
      {
        id: 2,
        username: "employee1",
        password: "emp123",
        role: "employee",
        name: "Employee One"
      }
    ],
    currentUser: null,
  };
  
  export function getLocalStorage() {
    const data = localStorage.getItem("data");
    if (!data) {
     
      localStorage.setItem("data", JSON.stringify(initialData));
      return initialData;
    }
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return initialData;
    }
  }
  
  export function setLocalStorage(data) {
    try {
      localStorage.setItem("data", JSON.stringify(data));
    } catch (error) {
      console.error("Error setting localStorage data:", error);
    }
  }
  
