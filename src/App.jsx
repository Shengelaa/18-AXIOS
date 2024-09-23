import { useState, useEffect } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const base = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(base);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("This is my error:", error);
      }
    };

    fetchUsers();
  }, []);

  const fetchUserById = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setUser(data);
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

export default App;
