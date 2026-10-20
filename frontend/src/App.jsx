// frontend/src/App.jsx

import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() =>{
      fetch("/api/users")
        .then(response => response.json())
        .then(data => setUsers(data))
    }, []
  );

  return (
    <div>
      <h1>Users</h1>

      {
        users.map((user) => {
          return (<div key={user.id}>
            {user.name} - {user.email}
          </div>)
        })
      }
    </div>
  )
}

export default App;
