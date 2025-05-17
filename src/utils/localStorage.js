

export const setLocalStorage = () => {
    const data = localStorage.getItem("data");
    if (!data) {
      localStorage.setItem(
        "data",
        JSON.stringify({
          employees: [
            { username: "admin", password: "dummyPass", role: "admin" },
            { username: "emp1", password: "dummyPass", role: "employee" },
          ],
          tasks: [],
        })
      );
    }
  };
  
  export const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("data")) || {};
  };
  