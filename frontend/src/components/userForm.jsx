import { useEffect } from "react"
import { useState } from "react";

const inputClasses =
  "mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

function UserForm(props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (props.editUser) {
      setName(props.editUser.name);
      setEmail(props.editUser.email);
    } else {
      clearValues();
    }
  }, [props.editUser])

  const clearValues = () => {
    setName("");
    setEmail("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var req = props.handleSave(
      {...(props.editUser ? {id: props.editUser.id} : {}), name: name, email: email }
    );

    if (req)
      clearValues()
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {props.editUser && <input defaultValue={props.editUser.id} type="hidden" name="id"></input>}
      <label htmlFor="name" className="block text-sm font-medium text-slate-700">
        Name
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClasses}
          placeholder="Enter full name"></input>
      </label>
      <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className={inputClasses}
          placeholder="name@example.com"
          required></input>
      </label>

      <div className="flex flex-wrap gap-3 pt-2">
        <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50">
          {props.saving ? "Saving..." : props.editUser ? "Update" : "Create"}
        </button>
      </div>
    </form> 
  );
}

export default UserForm;