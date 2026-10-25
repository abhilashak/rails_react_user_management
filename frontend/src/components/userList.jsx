// list all user records

function UserList(props) {

  if (props.users.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 px-4 py-12 text-center">
        <p className="font-medium text-slate-700">No users found</p>
        <p className="mt-1 text-sm text-slate-500">
          Create your first user using the form.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100">
      {
          props.users.map((user) => {
            return (
              <div key={user.id} className="flex flex-col gap-4 py-5 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-slate-900">
                      {user.name}
                    </h3>

                    <p className="mt-1 break-all text-sm text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={() => props.handleEdit(user)}className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                    Edit
                  </button>
                  <button type="button" onClick={() => props.handleDelete(user.id)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">
                    Delete
                  </button>
                </div>
              </div>
            )
          })
      }
    </div>
  );
}

export default UserList;