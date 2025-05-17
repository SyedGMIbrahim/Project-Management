

export const setLocalStorage = () => {
    const data = localStorage.getItem("data");
    if (!data) {
      localStorage.setItem(
        "data",
        JSON.stringify({
          employees: [
            { username: "admin", password: "adminpassword", role: "admin" },
            { username: "emp1", password: "emp123", role: "employee" },
          ],
          tasks: [],
        })
      );
    }
  };
  
  export const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("data")) || {};
  };
  