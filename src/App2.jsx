import { useState, useEffect } from "react";
import axios from "axios";
import api from "./api";

const App2 = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const base = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("This is my error:", error);
      }
    };

    fetchUsers();
  }, []);

  const fetchUserById = async (id) => {
    try {
      const response = await api.get(`/users/${id}`);

      setUser(response.data);
    } catch (error) {
      console.error("This is my error:", error);
    }
  };

  return (
    <>
      <div>
        <h1>Users List</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => fetchUserById(user.id)}>
              {user.name}
            </li>
          ))}
        </ul>
        {user && (
          <div>
            <h1>User Data</h1>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Address:</strong> {user.address.city},{" "}
              {user.address.street}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default App2;
