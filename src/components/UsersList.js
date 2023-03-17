import React, { useEffect } from "react";
import { useUsersContext } from "../store/UsersContext";
import Loading from "../UI/Loading";
import User from "./User";
import "./UsersList.css";

const UsersList = () => {
  const { users, fetchUsers, isLoading, error, page } = useUsersContext();

  useEffect(() => {
    fetchUsers();
  }, [page]);
  return (
    <div className="container">
      <div className="headerWrapper">
        <div className="list">
          {users.length > 0 &&
            users.map((user) => (
              <User
                key={user.id}
                id={user.id}
                name={user.name}
                lastName={user.lastName}
                prefix={user.prefix}
                title={user.title}
                imageUrl={user.imageUrl}
              />
            ))}
        </div>
      </div>
      {error && <p>{error}</p>}
      {isLoading && <Loading />}
    </div>
  );
};

export default UsersList;
