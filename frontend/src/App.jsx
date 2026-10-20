// frontend/src/App.jsx

import { useEffect, useState } from "react";
import UserForm from "./components/userForm";
import UserList from "./components/userList";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() =>{
      fetch("/api/users")
        .then(response => response.json())
        .then(data => setUsers(data))
    }, []
  );

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
        <UserForm />
      </section>

      <section className="card">
        <UserList users={users} />
      </section>
    </main>
  )
}

export default App;
