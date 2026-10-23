// list all user records

function UserList(props) {

  if (props.users.length === 0) {
    return <p>No users found. Add your first user</p>;
  }

  return (
    <div className="user-list">
      {
          props.users.map((user) => {
            return (
              <div className="user-row" key={user.id}>
                <div>
                  <strong>{user.name}</strong>
                  <p>{user.email}</p>
                </div>

                <div className="actions">
                  <button type="button"> Edit </button>
                  <button type="button" className="danger" onClick={() => props.handleDelete(user.id)}> Delete </button>
                </div>
              </div>
            )
          })
      }
    </div>
  );
}

export default UserList;