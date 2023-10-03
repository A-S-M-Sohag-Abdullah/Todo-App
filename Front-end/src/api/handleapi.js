import axios from "axios";

axios.defaults.withCredentials = true;

const baseurl = "http://localhost:8000/";

/* const login = async ({ email, password }) => {
  let authorized = false;
  axios
    .post(`${baseurl}login`, { email, password })
    .then((response) => {
      authorized = response.data;
      console.log(authorized);
      return authorized;
    })
    .catch((err) => {
      console.log(err);
    });
}; */
const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${baseurl}login`, { email, password });
    return response.data;
  } catch (err) {
    console.log(err);
    // throw err; // You can choose to handle errors differently if needed
  }
};

const signup = async ({ username, email, password }) => {
  try {
    const response = await axios.post(`${baseurl}signup`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

/* const login = ({ email, password }) => {
  return axios
    .post(`${baseurl}login`, { email, password })
    .then((response) => {
      const authorized = response.data;
      console.log(authorized);
      return authorized;
    })
    .catch((err) => {
      console.log(err);
      throw err; // You can choose to handle errors differently if needed
    });
}; */

const getAllTodos = (setTodos) => {
  axios
    .get(`${baseurl}todos`)
    .then(({ data }) => {
      //console.log(data);
      setTodos(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const saveTodo = (todo, setTodos) => {
  axios
    .post(`${baseurl}savetodo`, todo)
    .then(({ data }) => {
      console.log(data);
      getAllTodos(setTodos);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateTodo = (id, updateData, setTodos) => {
  console.log(id);
  axios
    .put(`${baseurl}savetodo/${id}`, updateData)
    .then(({ data }) => {
      console.log(data);
      getAllTodos(setTodos);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const deleteTodo = (id, setTodos) => {
  const url = baseurl + "deletetodo/" + id;
  axios
    .delete(url)
    .then((response) => {
      // Handle the response here (e.g., check response.status)
      console.log("DELETE request successful");
      getAllTodos(setTodos);
      console.log(response.data); // The response data, if any
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error:", error);
    });
};

const logout = async (getLoggedIn) => {
  await axios.get("http://localhost:8000/logout");
  getLoggedIn();
};

export { getAllTodos, saveTodo, updateTodo, deleteTodo, login, signup, logout };
