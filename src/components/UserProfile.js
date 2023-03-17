import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUsersContext } from "../store/UsersContext";
import Friends from "./Friends";
import "./UserProfile.css";

const UserProfile = () => {
  const { setIsLoading, setError } = useUsersContext();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userFriends, setUserFriends] = useState([])

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();

        setUser(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchUserFriends = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/1/20`
          );
          if (!response.ok) {
            throw new Error("Something went wrong!");
          }
          const data = await response.json();

          const usersInfo = data.list.map((userInfo) => {
            return {
              id: userInfo.id,
              name: userInfo.name,
              lastName: userInfo.lastName,
              prefix: userInfo.prefix,
              title: userInfo.title,
              imageUrl: userInfo.imageUrl,
            };
          });
    
          setUserFriends(usersInfo);
          setIsLoading(false);
        } catch (error) {
          setError(error.message);
        }
      };

    fetchUserProfile();
    fetchUserFriends()
  }, [id, setIsLoading, setError]);

  

  return (
    <div className="container">
      {user && (
        <div className="headerWrapper">
          <div className="header">
            <img src={user.imageUrl} alt={user.name} />
            <fieldset>
              <legend>info</legend>
              <div>
                <strong>
                  {user.prefix} {user.name} {user.lastName}
                </strong>
              </div>
              <div>
                <i>{user.title}</i>
              </div>
              <br></br>
              <div>
                <span>Email: {user.email}</span>
              </div>
              <div>
                <span>Ip Address: {user.ip}</span>
              </div>
              <div>
                <span>Job Area: {user.jobArea}</span>
              </div>
              <div>
                <span>Job type: {user.jobType}</span>
              </div>
            </fieldset>
            <fieldset>
              <legend>Address</legend>
              <div>
                <strong>
                  {user.company.name} {user.company.suffix}
                </strong>
              </div>
              <div>
                <span>City: {user.address?.city}</span>
              </div>
              <div>
                <span>Country: {user.address?.country}</span>
              </div>
              <div>
                <span>State: {user.address?.state}</span>
              </div>
              <div>
                <span>Street Address: {user.address?.streetAddress}</span>
              </div>
              <div>
                <span>ZIP: {user.address?.zipCode}</span>
              </div>
            </fieldset>
          </div>
          <div className="breadcrumbs">
            <a href="">breadcrumbs</a>
          </div>
          <h1 className="friends">Friends:</h1>
          <div className="divwrapper">
          {userFriends.map((user) => (
              <Friends
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
      )}
    </div>
  );
};

export default UserProfile;
