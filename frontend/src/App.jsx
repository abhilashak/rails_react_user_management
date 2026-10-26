// frontend/src/App.jsx

import { useEffect, useState } from "react";
import UserForm from "./components/userForm";
import UserList from "./components/userList";
import { userApi } from "./api/users"

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() =>{
      fetch("/api/users")
        .then(response => response.json())
        .then(data => setUsers(data))
    }, []
  );

  async function handleSave(attrs) {
    setSaving(true);

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
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if(window.confirm("Are you sure?")) {
      try {
        await userApi.delete(id);
        setUsers(
          users.filter((user) => user.id !== id)
        );

        return true;
      } catch (error) {
        console.log(error);
      } finally {}
    } else {
      return null;
    }
  }

  function handleEdit(user) {
    setEditUser(user);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              User Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your users from one place.
            </p>
          </div>

          <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            {users.length} users
          </span>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[340px_1fr]">
        <section className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            {editUser ? "Edit user" : "Add a user"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {editUser
              ? "Update the user's details."
              : "Enter the details to create a user."}
          </p>

          <div className="mt-6">
            <UserForm handleSave={handleSave} editUser={editUser} saving={saving} />
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                All users
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                View and manage registered users.
              </p>
            </div>
          </div>

          <UserList users={users} handleDelete={handleDelete} handleEdit={handleEdit} />
        </section>
      </main>
    </div>
  )
}

export default App;
