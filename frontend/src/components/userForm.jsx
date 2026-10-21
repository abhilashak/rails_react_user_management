import { useState } from "react";

function UserForm(props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const clearValues = () => {
    setName("");
    setEmail("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let req = props.handleSave({name: name, email: email});
    if (req)
      clearValues()
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <label>Name
        <input value={name} onChange={(e) => setName(e.target.value)} required></input>
      </label>
      <label>Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required></input>
      </label>

      <div className="actions">
        <button type="submit">Create</button>
      </div>
    </form> 
  );
}

export default UserForm;