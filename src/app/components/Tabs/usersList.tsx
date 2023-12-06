// pages/admin/UsersList.tsx
import axios from "axios";
import { useEffect, useState } from "react";

import DeleteUserModal from "../Modals/DeleteUserModal";
import AddUserModal from "../Modals/AddUserModal";
import ChangePasswordModal from "../Modals/ChangePasswordModal";

const UsersList: React.FC = () => {
  const [allUsers, setAllUsers] = useState<any[]>([]);

  async function getAllUsers() {
    axios
      .get("https://lnmiit-inventory-backend.onrender.com/admin/users")
      .then((res) => {
        setAllUsers(res.data.users);
        console.log(res.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  function addUser(newUser: any) {
    setAllUsers((prevUsers) => {
      return [...prevUsers, newUser];
    });
  }

  function deleteUser(userNamefromProps: any) {
    setAllUsers((prevUsers) => {
      return prevUsers.filter((user) => {
        return user.username !== userNamefromProps;
      });
    });
  }

  function passwordChange(passwordFromprops: any) {
    alert("Password changed successfully");
    setAllUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user.password === passwordFromprops
          ? { ...user, password: passwordFromprops }
          : user
      );
    });
  }

  const notDeletion = (user: { username: string; }) => {
    if (user.username !== "admin") {
      return <DeleteUserModal username={user.username} onDelete={deleteUser} />;
    }
  };
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Users List</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Serial Number</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, i) => (
            <tr key={user["id"]} className="text-center">
              <td className="justify-center py-2 px-4 border-b">{i + 1}</td>
              <td className="justify-center py-2 px-4 border-b">{user["username"]}</td>
              <td className="justify-center py-2 px-4 border-b">
                <span className="badge badge-warning text-uppercase">
                  {user["name"]}
                </span>
              </td>
              <td className="flex justify-center py-2 px-4 border-b">
                <ChangePasswordModal
                  username={user["username"]}
                  department={user["department"]}
                  name={user["name"]}
                  onChange={passwordChange}
                />
                {notDeletion(user)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-[30px]">
        <AddUserModal onAdd={addUser} />
      </div>
    </div>
  );
};

export default UsersList;
