// frontend/src/App.jsx

import { useEffect, useState } from "react";
import UserForm from "./components/userForm";
import UserList from "./components/userList";
import { userApi } from "./api/users"

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() =>{
      fetch("/api/users")
        .then(response => response.json())
        .then(data => setUsers(data))
    }, []
  );

  async function handleSave(attrs) {
    // console.log(attrs.name);
    // console.log(attrs.email);

    try {
      // Edit form
      if (attrs.id) {
        // console.log("editing....");
        var savedUser = await userApi.update(attrs, attrs.id);
        const updatedUsers = users.map((user) => {
          return (user.id === savedUser.id ? savedUser : user)
        });
        setUsers(updatedUsers);
        setEditUser(null);
      } else { // Create form
        var savedUser = await userApi.create(attrs);
        setUsers([...users, savedUser])
      }

      return true;
    } catch (error) {
      console.log(error);
    } finally {}
  }

  async function handleDelete(id) {
    console.log(id);

    try {
      await userApi.delete(id);
      setUsers(
        users.filter((user) => user.id !== id)
      );

      return true;
    } catch (error) {
      console.log(error);
    } finally {}
  }

  function handleEdit(user) {
    setEditUser(user);
  }

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <h1>User Management</h1>
          <p>Manage users with React and Rails API.</p>
        </div>

        <span>{users.length} users</span>
      </header>

      <section className="card">
        <UserForm handleSave={handleSave} editUser={editUser} />
      </section>

      <section className="card">
        <UserList users={users} handleDelete={handleDelete} handleEdit={handleEdit} />
      </section>
    </main>
  )
}

export default App;
