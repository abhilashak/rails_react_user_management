import { useEffect } from "react"
import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="user-form">
      {props.editUser && <input defaultValue={props.editUser.id} type="hidden" name="id"></input>}
      <label>Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required></input>
      </label>
      <label>Email
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email" required></input>
      </label>

      <div className="actions">
        <button type="submit">{props.editUser ? "Update" : "Create"}</button>
      </div>
    </form> 
  );
}

export default UserForm;